// ============================================================================
// NATAL-CAP 35 — THE MULTIPLICITY SPECTRUM OF THE ANCHORED OVERLAP CREDIT
// (2026-08-15 — brief W7-3, successor to natal-cap-31-calm-vs-kill)
// ============================================================================
// WHY. cap-31 localised the whole anchored survivor fluctuation in the overlap
// credit X = Σ_r (m_r − 1)⁺ (corr(X,S) = 0.99, corr(VR,S) ≈ 0), proved the
// X-limitation theorem (strikes alone cannot annihilate at any loudness),
// which is proven PER LEVEL at the four levels where the ensemble maximum of
// VR is enumerated: @11, @13, @17 and @19. (@19 corrected 2026-08-18: cap-19
// PART A enumerates all 9,699,690 rotations and returns V̄ = 8944.60 with
// max VR = 2.293 at t = W/2, rank-from-top 0; against K = 435 and the
// S̄ = 49,238.76 this file computes below, √(K·V̄·VRmax) = 2987 < S̄, so the
// per-level inequality holds. natal-cap-38-loudness-driver.js states it as
// the threshold S̄²/(K·V̄) = 623.1 vs max VR 2.293, margin ×271.7. The earlier
// "and nowhere else" here was a false absence claim.) The theorem is still
// proven at no level above @19: "from @13 upward" remains an extrapolation
// off measured trends, not the theorem. It
// left Assumption A restated as: the anchored overlap-credit
// deficit stays below (1−ε)·S̄. It also left a warning: the anchored deficit
// is invisible to pair statistics (anchored P2 reads z = −0.30 while X reads
// z = −2.71), so it must live in multiplicity structure m ≥ 3. This file opens
// the multiplicity m itself: the spectrum n_k = #{r : m_r = k}, anchored
// against ensemble against the CRT/independent model, exactly, at four levels.
//
// OBJECTS. Level x, tile W = x#, natal comb N (|N| = N̄), scour primes
// x < q ≤ √W (K of them), rotation t ∈ [0,W); q strikes r iff r ≡ t or t−2
// (mod q). m_r(t) = #{q : q strikes r at t}; n_k(t) = #{r ∈ N : m_r(t) = k}.
//   S = n_0,  M = Σ_k k·n_k,  X = Σ_k (k−1)⁺ n_k,  P2 = Σ_k C(k,2) n_k.
// Three laws in this file, all exact, all verified against brute force:
//
//   (I1) THE u-FORM. Put μ(v) = #{q : q | v or q | v+2} for v ∈ Z. Then
//        m_r(t) = μ(r − t), so the ANCHOR reads μ on the natal set itself and
//        the ENSEMBLE reads μ on the whole integer line with a triangular
//        weight:  E[n_k] = (1/W)·Σ_{|v|<W} w(v)·[μ(v) = k],
//        w(v) = #{r ∈ N : v ≤ r ≤ v+W−1}, Σ_v w(v) = N̄·W, and μ(v) = μ(−v−2).
//        Anchored and ensemble spectra are then two readings of ONE arithmetic
//        function. Cost drops from O(W·N̄) to O(W log log W): the @19 ensemble
//        (9.7M rotations × 252k slots) becomes a five-second computation.
//   (I2) THE ALTERNATING SUM.  X = Σ_{j≥2} (−1)^j B_j,  B_j = Σ_r C(m_r, j)
//        = Σ_{|Q|=j} Σ_{ε∈{0,2}^Q} c(Q,ε), c(Q,ε) = #{r ∈ N : r ≡ −ε_q (q)}.
//        Overlap credit is the Bonferroni tail of the coincidence census; the
//        pair term B_2 is cap-12's S₂ = P2.
//   (I3) THE COFACTOR TRICHOTOMY. For natal r, every prime factor of r(r+2)
//        exceeds x, so r = A·c with A the scour-smooth part and c = 1 or a
//        single prime > y (two primes > y would exceed W). Hence
//        m_r(0) = ω_s(r) + ω_s(r+2) with the hard support cap
//        m_r(0) ≤ 2·log W / log(x+1) — a cap the CRT model does not have.
//
// PREDICTIONS ON RECORD (formed on the @11/@13 pilot, before the @17/@19 runs
// and before any coincidence census was computed):
//   P1 [proven before measuring] For any set Q of scour primes with ∏Q ≥ W+2,
//      the two ALIGNED patterns (all q | r, or all q | r+2) contribute exactly
//      zero to the anchored census, because the only multiple of ∏Q in [0,W)
//      is 0 and 0 is not natal. Every pair has ∏Q < W (q₁ < q₂ ≤ √W), so this
//      exclusion is a pure m ≥ 3 phenomenon. Predicted consequence: the
//      anchored aligned census at j = 3 runs far below the CRT value, and the
//      shortfall over super-W triples is exactly the aligned share.
//   P2 The anchored count of slots with ω_s(r) = i is p_nat·Π_i to a few
//      percent for i ≥ 2, where Π_i = #{n < W : n is a product of scour primes
//      with exactly i distinct ones} and p_nat = (1/4)·∏_{7≤p≤x}(p−2)/(p−1)
//      is the natal probability of a scour product (roughness comes free).
//   P3 The coincidence enhancement is a function of the two cofactor RANGES
//      W/d₁, W/d₂ and not of the aligned/mixed distinction: short cofactor
//      range ⇒ enhancement (a small multiplier is automatically rough),
//      long range ⇒ CRT. So the brief's "aligned coincidences are dense at
//      the origin" should hold for sub-W products and be swamped by P1.
//   P4 The m = 2 cell carries the sign change of X(0) − X̄ across the crossing,
//      and the m ≥ 3 cells carry large individual gaps that mostly cancel.
//   P5 The anchored X-deficit does NOT stay a fixed fraction of X̄: since
//      X̄/S̄ grows like the overlap capacity, X(0)/X̄ must flatten back toward 1
//      even while β keeps descending. Predicted: the "descending through 1"
//      reading of X(0)/X̄ = 1.45, 0.991, 0.948 breaks at @19.
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function inv(a,m){let r0=((a%m)+m)%m,r1=m,s0=1,s1=0;
  while(r1!==0){const q=Math.floor(r0/r1);[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];}
  return ((s0%m)+m)%m;}
function msd(a){const n=a.length;let s=0,s2=0;for(let i=0;i<n;i++){s+=a[i];s2+=a[i]*a[i];}
  const m=s/n;return[m,Math.sqrt(Math.max(0,s2/n-m*m))];}
function corr(x,y){const n=x.length;let sx=0,sy=0;for(let i=0;i<n;i++){sx+=x[i];sy+=y[i];}
  const mx=sx/n,my=sy/n;let A=0,B=0,C=0;
  for(let i=0;i<n;i++){const dx=x[i]-mx,dy=y[i]-my;A+=dx*dy;B+=dx*dx;C+=dy*dy;}
  return A/Math.sqrt(B*C);}

// ---------------------------------------------------------------- level data
function level(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const A=new Uint8Array(W);
  for(let r=11;r<W;r+=30)A[r]=1;
  for(let r=17;r<W;r+=30)A[r]=1;
  for(const p of basePs){for(let j=0;j<W;j+=p)A[j]=0;for(let j=p-2;j<W;j+=p)A[j]=0;}
  const rho=[];for(let r=0;r<W;r++)if(A[r])rho.push(r);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const H=qs.reduce((a,q)=>a+2/q,0);
  return {x,W,A,rho,N:rho.length,qs,K:qs.length,H,basePs,y:qs[qs.length-1]};
}
// CRT / independent-strike model: Poisson-binomial with p_q = 2/q
function crtSpectrum(L){
  let poly=[1];
  for(const q of L.qs){const p=2/q,np=new Array(poly.length+1).fill(0);
    for(let i=0;i<poly.length;i++){np[i]+=poly[i]*(1-p);np[i+1]+=poly[i]*p;}poly=np;}
  return poly.map(v=>v*L.N);
}

// ============================================================================
// PART 0 — CHAIN OF CUSTODY: reproduce cap-31 by its own method (full sweep of
// the rotation ensemble), and carry the per-cell spectrum moments out of it.
// ============================================================================
const CAP31={11:{vr:0.344,S:45,X:28,Xbar:19.26,P2:30,zX:2.25,zP2:0.45,cXS:0.481,ratio:1.4541},
             13:{vr:0.623,S:307,X:452,Xbar:456.18,P2:601,zX:-0.16,zP2:-0.16,cXS:0.908,ratio:0.9908},
             17:{vr:0.553,S:3099,X:10381,Xbar:10947.70,P2:15770,zX:-2.71,zP2:-0.30,cXS:0.987,ratio:0.9482}};
function sweep(L,KMAX){
  const {W,rho,N,qs,K}=L;
  const Pidx=[],Pst=[],Pcd1=[],Pcd2=[];let Vbar=0;
  for(const q of qs){
    const n=new Int32Array(q);for(const r of rho)n[r%q]++;
    const st=new Int32Array(q+1);for(let a=0;a<q;a++)st[a+1]=st[a]+n[a];
    const idx=new Int32Array(N),pos=st.slice(0,q);
    for(let i=0;i<N;i++){const a=rho[i]%q;idx[pos[a]++]=i;}
    const mu=2*N/q,cd1=new Float64Array(q),cd2=new Float64Array(q);let ss=0;
    for(let a=0;a<q;a++){const a2=(a+q-2)%q,dev=n[a]+n[a2]-mu;cd1[a]=dev;cd2[a]=dev*dev;ss+=dev*dev;}
    Vbar+=ss/q;Pidx.push(idx);Pst.push(st);Pcd1.push(cd1);Pcd2.push(cd2);
  }
  const S=new Float64Array(W),Xa=new Float64Array(W),P2=new Float64Array(W),VR=new Float64Array(W),D=new Float64Array(W);
  const sum=new Float64Array(KMAX+2),sq=new Float64Array(KMAX+2);
  const mult=new Int32Array(N),touched=new Int32Array(N),cls=new Int32Array(K),h=new Float64Array(KMAX+2);
  let anch=null;
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
    h.fill(0);h[0]=N-cv;
    let p2=0;
    for(let i=0;i<cv;i++){const u=touched[i],m=mult[u];p2+=(m*(m-1))/2;h[Math.min(m,KMAX+1)]++;mult[u]=0;}
    S[t]=N-cv;Xa[t]=M-cv;P2[t]=p2;VR[t]=vr/Vbar;D[t]=dd;
    for(let k=0;k<=KMAX+1;k++){sum[k]+=h[k];sq[k]+=h[k]*h[k];}
    if(t===0)anch=Float64Array.from(h);
  }
  const mean=new Float64Array(KMAX+2),sd=new Float64Array(KMAX+2);
  for(let k=0;k<=KMAX+1;k++){mean[k]=sum[k]/W;sd[k]=Math.sqrt(Math.max(0,sq[k]/W-mean[k]*mean[k]));}
  const [mX,sX]=msd(Xa),[mP,sP]=msd(P2),[mS,sS]=msd(S);
  return {S,Xa,P2,VR,D,mean,sd,anch,Vbar,mX,sX,mP,sP,mS,sS};
}
function part0(L){
  const c=CAP31[L.x];if(!c)return null;
  const sw=sweep(L,Math.min(L.K,20));
  const zX=(sw.Xa[0]-sw.mX)/sw.sX, zP2=(sw.P2[0]-sw.mP)/sw.sP, cXS=corr(sw.Xa,sw.S);
  const ok=(a,b,tol)=>Math.abs(a-b)<=tol?'PASS':'FAIL';
  console.log(`CUSTODY @${L.x}: VR(0)=${f(sw.VR[0])} [${c.vr} ${ok(sw.VR[0],c.vr,0.002)}]  S(0)=${sw.S[0]} [${c.S} ${ok(sw.S[0],c.S,0)}]  X(0)=${sw.Xa[0]} [${c.X} ${ok(sw.Xa[0],c.X,0)}]  X̄=${f(sw.mX,2)} [${c.Xbar} ${ok(sw.mX,c.Xbar,0.02)}]  X(0)/X̄=${f(sw.Xa[0]/sw.mX,4)} [${c.ratio} ${ok(sw.Xa[0]/sw.mX,c.ratio,0.0005)}]`);
  console.log(`          P2(0)=${sw.P2[0]} [${c.P2} ${ok(sw.P2[0],c.P2,0)}]  z(X)=${f(zX,2)} [${c.zX} ${ok(zX,c.zX,0.01)}]  z(P2)=${f(zP2,2)} [${c.zP2} ${ok(zP2,c.zP2,0.01)}]  corr(X,S)=${f(cXS)} [${c.cXS} ${ok(cXS,c.cXS,0.001)}]  corr(VR,S)=${f(corr(sw.VR,sw.S))}`);
  return sw;
}

// ============================================================================
// PART 1 — THE u-FORM (I1): one arithmetic function, two readings.
// a(v) = #{q : q | v}, b(v) = #{q : q | v+2}, μ = a + b.
// Anchored spectrum: μ read on N. Ensemble spectrum: μ read on (−W, W) with
// the triangular weight w(v). Verified against the PART 0 sweep.
// ============================================================================
function uform(L){
  const {W,A,rho,N,qs,K}=L;
  const a=new Uint16Array(W),b=new Uint16Array(W);
  for(const q of qs){for(let j=0;j<W;j+=q)a[j]++;for(let j=q-2;j<W;j+=q)b[j]++;}
  const C=new Int32Array(W);{let c=0;for(let z=0;z<W;z++){if(A[z])c++;C[z]=c;}}
  const ens=new Float64Array(K+2),anc=new Float64Array(K+2);
  const ensA=new Float64Array(K+2),ancA=new Float64Array(K+2); // one-sided ω_s
  let tot=0;
  for(let v=0;v<W;v++){
    const wp=N-(v>0?C[v-1]:0), wm=(W-3-v)>=0?C[W-3-v]:0, w=wp+wm;
    tot+=w;ens[a[v]+b[v]]+=w;
    ensA[a[v]]+=wp;ensA[b[v]]+=wm;         // the two orientations of the u-line
  }
  tot+=N;ens[0]+=N;ensA[0]+=N;             // the self-mirrored point v = −1
  for(let k=0;k<=K+1;k++)ens[k]/=W;
  for(let k=0;k<=K+1;k++)ensA[k]/=W;
  for(const r of rho){anc[a[r]+b[r]]++;ancA[a[r]]+=0.5;ancA[b[r]]+=0.5;}
  return {a,b,C,ens,anc,ensA,ancA,totOK:tot===N*W};
}
const Xof=(h)=>{let s=0;for(let k=2;k<h.length;k++)s+=(k-1)*h[k];return s;};
const Bof=(h,j)=>{let s=0;for(let k=j;k<h.length;k++){let c=1;for(let i=0;i<j;i++)c=c*(k-i)/(i+1);s+=c*h[k];}return s;};

// ============================================================================
// PART 2 — THE SPECTRUM, THREE WAYS, AND THE X-ATTRIBUTION PER CELL.
// ============================================================================
function part2(L,U,sw){
  const {N,K,W,H}=L;
  const crt=crtSpectrum(L);
  const Xa=Xof(U.anc),Xe=Xof(U.ens),Xc=Xof(crt);
  const Sa=U.anc[0],Se=U.ens[0],Sc=crt[0];
  let chk='';
  if(sw){let bad=0;for(let k=0;k<=Math.min(K,20);k++){if(Math.abs(sw.mean[k]-U.ens[k])>1e-9)bad++;if(sw.anch[k]!==U.anc[k])bad++;}
    chk=`  [u-form vs sweep: ${bad===0?'PASS':'FAIL('+bad+')'}]`;}
  console.log(`\n===== @${L.x}: W=${W} N̄=${N} K=${K} (${L.qs[0]}..${L.y}) H=${f(H,4)}  weight identity ΣW=N̄W ${U.totOK?'PASS':'FAIL'}${chk}`);
  console.log(`  S(0)=${Sa} S̄=${f(Se,2)} S_CRT=${f(Sc,2)} | X(0)=${Xa} X̄=${f(Xe,2)} X_CRT=${f(Xc,2)} | X(0)/X̄=${f(Xa/Xe,4)} S(0)/S̄=${f(Sa/Se,4)} β=S(0)/S_CRT=${f(Sa/Sc,4)}`);
  console.log(`  identity X = Σ_{j≥2}(−1)^j B_j : anchored ${f(Xa,0)} vs ${f([2,3,4,5,6,7,8,9,10].reduce((s,j)=>s+(j%2?-1:1)*Bof(U.anc,j),0),3)}  ${Math.abs(Xa-[2,3,4,5,6,7,8,9,10].reduce((s,j)=>s+(j%2?-1:1)*Bof(U.anc,j),0))<1e-6?'PASS':'FAIL'}`);
  console.log('   k |  anchored |  ensemble |    CRT    |   z(anch) | (k−1)·[A−E] | (k−1)·[A−C] | (k−1)·[E−C]');
  let c2=0,c3=0,c2e=0,c3e=0;
  for(let k=0;k<=K+1;k++){
    if(U.anc[k]===0&&U.ens[k]<1e-9&&(crt[k]||0)<1e-9)continue;
    const kk=Math.max(0,k-1),cA=crt[k]||0;
    const z=(sw&&k<sw.sd.length&&sw.sd[k]>0)?(U.anc[k]-sw.mean[k])/sw.sd[k]:NaN;
    if(k===2){c2=kk*U.anc[k];c2e=kk*U.ens[k];}
    if(k>=3){c3+=kk*U.anc[k];c3e+=kk*U.ens[k];}
    console.log(`  ${String(k).padStart(2)} | ${f(U.anc[k],0).padStart(9)} | ${f(U.ens[k],2).padStart(9)} | ${f(cA,2).padStart(9)} | ${f(z,2).padStart(9)} | ${f(kk*(U.anc[k]-U.ens[k]),2).padStart(11)} | ${f(kk*(U.anc[k]-cA),2).padStart(11)} | ${f(kk*(U.ens[k]-cA),2).padStart(11)}`);
  }
  console.log(`  CHANNELS  X-gap anchored−ensemble = ${f(Xa-Xe,2)}  =  m=2 cell ${f(c2-c2e,2)}  +  m≥3 cells ${f(c3-c3e,2)}`);
  console.log(`  DEFICIT NORMALISED FOR THE X-FLOOR:  (X̄−X(0))/S̄ = ${f((Xe-Xa)/Se,4)}   [Assumption A: stays below 1−ε]`);
  return {crt,Xa,Xe,Xc,Sa,Se,Sc};
}

// ============================================================================
// PART 3 — WHERE THE CRT MODEL BREAKS: the one-sided product truncation.
// ω_s(v) = a(v) is a sum of K indicators with P(q | v) = 1/q, so the CRT model
// is Poisson-binomial. The truth differs, and the difference is exactly one
// thing: a set Q of scour primes can divide v < W only if ∏Q < W. Pairs always
// fit (q₁ < q₂ ≤ √W ⇒ q₁q₂ < W); triples generically do not. So the CRT model
// is right at j ≤ 2 and wrong from j = 3 on, by a computable missing mass.
// ============================================================================
function part3(L,U){
  const {W,qs,K,N}=L;
  const one=new Float64Array(K+2);for(let v=1;v<W;v++)one[U.a[v]]++;   // unweighted, v ∈ [1,W)
  let pb=[1];for(const q of qs){const p=1/q,np=new Array(pb.length+1).fill(0);
    for(let i=0;i<pb.length;i++){np[i]+=pb[i]*(1-p);np[i+1]+=pb[i]*p;}pb=np;}
  const JM=6;
  const sub=new Float64Array(JM+1),subCnt=new Float64Array(JM+1),subFloor=new Float64Array(JM+1);
  (function dfs(start,prod,cnt){
    if(cnt>0&&cnt<=JM){sub[cnt]+=1/prod;subCnt[cnt]++;subFloor[cnt]+=Math.floor((W-1)/prod);}
    for(let i=start;i<K;i++){const p=prod*qs[i];if(p>W-1)break;dfs(i+1,p,cnt+1);}
  })(0,1,0);
  let ej=[1];for(const q of qs){const p=1/q,np=new Array(ej.length+1).fill(0);
    for(let i=0;i<ej.length;i++){np[i]+=ej[i];np[i+1]+=ej[i]*p;}ej=np;}
  console.log('  ONE-SIDED ω_s over v ∈ [1,W)   (the ensemble\'s own arithmetic, no anchoring)');
  console.log('   j | Σ_v C(a,j) exact | Σ_{∏Q<W} ⌊(W−1)/∏Q⌋ | id | (W−1)·e_j(1/q) CRT | missing mass Σ_{∏Q>W} | #subsets ∏Q<W');
  for(let j=1;j<=Math.min(JM,5);j++){
    const lhs=Bof(one,j),rhs=subFloor[j],crtv=(W-1)*ej[j];
    console.log(`   ${j} | ${f(lhs,0).padStart(16)} | ${f(rhs,0).padStart(21)} | ${lhs===rhs?'PASS':'FAIL'} | ${f(crtv,1).padStart(18)} | ${f(ej[j]-sub[j],6).padStart(21)} | ${f(subCnt[j],0).padStart(14)}`);
  }
  const shape=(h,n)=>Array.from(h.slice(0,5)).map(v=>f(v/n,4)).join(' ');
  console.log(`  ω_s law k=0..4  truth ${shape(one,W-1)} | CRT ${pb.slice(0,5).map(v=>f(v,4)).join(' ')}`);
  // does the two-sided spectrum factor as the convolution of two one-sided ones?
  const p1=Array.from(U.ensA).map(v=>v/N),conv=new Float64Array(K+2);
  for(let i=0;i<=K;i++)for(let j2=0;j2+i<=K+1;j2++)conv[i+j2]+=p1[i]*p1[j2]*N;
  let worst=0,ws=0;for(let k=0;k<=6;k++){const d=Math.abs(conv[k]-U.ens[k]);if(d>worst){worst=d;ws=k;}}
  console.log(`  CONVOLUTION TEST (are the two sides independent?): max|conv−ens| = ${f(worst,1)} at k=${ws}; conv n_0=${f(conv[0],1)} vs exact S̄=${f(U.ens[0],1)} (${f(100*(conv[0]/U.ens[0]-1),2)}%)`);
  return {one,sub,ej,subCnt};
}

// ============================================================================
// PART 4 — THE ANCHORED SIDE: cofactor trichotomy (I3) and the closed form.
// Every natal r is A·c, A the scour-smooth part, c ∈ {1} ∪ {primes > y}.
// Closed form tested: #{r ∈ N : ω_s(r) = i} ≈ p_nat·[Π_i + Σ_{A∈S_i}(π(W/A)−π(y))],
// p_nat = (1/4)∏_{7≤p≤x}(p−2)/(p−1) = λ(x)·N̄/W, λ(x) = ∏_{p≤x}(1−1/p)^{−1}.
// ============================================================================
function part4(L,U){
  const {W,rho,N,qs,K,y,basePs}=L;
  const om=new Uint16Array(W),sp=new Float64Array(W);sp.fill(1);
  for(const q of qs){for(let j=q;j<W;j+=q){om[j]++;let m=j;while(m%q===0){sp[j]*=q;m/=q;}}}
  const isP=new Uint8Array(W);{const s=new Uint8Array(W);
    for(let i=2;i<W;i++){if(!s[i]){isP[i]=1;for(let j=i*i;j<W;j+=i)s[j]=1;}}}
  const piC=new Int32Array(W);{let c=0;for(let z=0;z<W;z++){if(isP[z])c++;piC[z]=c;}}
  const p_nat=0.25*basePs.reduce((a,p)=>a*(p-2)/(p-1),1);
  const lam=[2,3,5].concat(basePs).reduce((a,p)=>a*p/(p-1),1);
  const IM=6;
  const cof1=new Float64Array(IM+1),cofP=new Float64Array(IM+1),bad=new Float64Array(IM+1),tot=new Float64Array(IM+1);
  for(const r of rho){const i=Math.min(om[r],IM),c=r/sp[r];tot[i]++;
    if(c===1)cof1[i]++;else if(isP[c]&&c>y)cofP[i]++;else bad[i]++;}
  const Pi=new Float64Array(IM+1),primeRoom=new Float64Array(IM+1);
  for(let n=2;n<W;n++)if(sp[n]===n){const i=Math.min(om[n],IM);Pi[i]++;
    if(n<W)primeRoom[i]+=Math.max(0,piC[Math.floor((W-1)/n)]-piC[y]);}
  console.log(`  COFACTOR TRICHOTOMY: violations (c ∉ {1} ∪ primes>y) = ${f(bad.reduce((a,b)=>a+b,0),0)}  [I3 ${bad.reduce((a,b)=>a+b,0)===0?'PASS':'FAIL'}]   p_nat=${f(p_nat,5)}  λ=${f(lam,4)}  λN̄/W=${f(lam*N/W,5)}`);
  console.log('   i | #{ω_s(r)=i} | c=1 | c=prime>y | Π_i | p_nat·Π_i | prime room | p_nat·(Π_i+room) | ratio');
  for(let i=0;i<=4;i++){
    if(tot[i]===0&&Pi[i]===0)continue;
    const pred=p_nat*(Pi[i]+primeRoom[i]);
    const tail=i===0?'  n/a — the m=0 cell: r itself prime, no scour part':`${f(pred,1).padStart(16)} | ${f(tot[i]/pred,3)}`;
    console.log(`   ${i} | ${f(tot[i],0).padStart(11)} | ${f(cof1[i],0).padStart(5)} | ${f(cofP[i],0).padStart(9)} | ${f(Pi[i],0).padStart(7)} | ${f(p_nat*Pi[i],1).padStart(9)} | ${f(primeRoom[i],0).padStart(10)} | ${tail}`);
  }
  return {om,sp,Pi,p_nat};
}

// ============================================================================
// PART 5 — THE COINCIDENCE CENSUS: the brief's candidate mechanism, tested.
// c(Q,ε) = #{r ∈ N : r ≡ −ε_q (mod q) ∀q ∈ Q}, ε ∈ {0,2}^Q. ALIGNED = the two
// patterns all-0 (every q | r) and all-2 (every q | r+2); the rest are MIXED.
// CRT value N̄/∏Q. d₁ = ∏{q : ε_q = 0}, d₂ = ∏{q : ε_q = 2}: r = d₁s, r+2 = d₂t,
// so the cofactor ranges are W/d₁ and W/d₂ and the natal conditions fall on
// s and t. P1 says aligned + ∏Q > W ⇒ c = 0 exactly.
// ============================================================================
function coinc(L,Q,eps){
  const {W,A}=L;let a=0,m=1;
  for(let i=0;i<Q.length;i++){
    const q=Q[i],tgt=((-eps[i])%q+q)%q,need=((tgt-a)%q+q)%q;
    a=a+m*((need*inv(m%q,q))%q);m=m*q;
    if(a>=W)return 0;
  }
  let c=0;for(let r=a;r<W;r+=m)if(A[r])c++;
  return c;
}
function part5(L,U,J){
  const {W,N,qs,K}=L;
  const NB=5,lw=Math.log2(W);
  const bin=(z)=>Math.max(0,Math.min(NB-1,Math.floor(Math.log2(Math.max(1,z))/(lw/NB))));
  const obs=[],exp=[];for(let i=0;i<NB;i++){obs.push(new Float64Array(NB));exp.push(new Float64Array(NB));}
  let aO=0,aE=0,mO=0,mE=0,supO=0,supE=0,supAE=0,total=0,totalE=0;
  const idx=new Array(J).fill(0);
  (function rec(start,pos){
    if(pos===J){
      const Q=idx.map(i=>qs[i]),P=Q.reduce((p,q)=>p*q,1);
      for(let mask=0;mask<(1<<J);mask++){
        const eps=[];let d1=1,d2=1;
        for(let i=0;i<J;i++){if(mask&(1<<i)){eps.push(2);d2*=Q[i];}else{eps.push(0);d1*=Q[i];}}
        const c=coinc(L,Q,eps),e=N/P,al=(mask===0||mask===(1<<J)-1);
        obs[bin(W/d1)][bin(W/d2)]+=c;exp[bin(W/d1)][bin(W/d2)]+=e;
        total+=c;totalE+=e;
        if(al){aO+=c;aE+=e;}else{mO+=c;mE+=e;}
        if(P>W){supO+=c;supE+=e;if(al)supAE+=e;}
      }
      return;
    }
    for(let i=start;i<K;i++){idx[pos]=i;rec(i+1,pos+1);}
  })(0,0);
  const Bj=Bof(U.anc,J);
  console.log(`  CENSUS j=${J}: B_${J}(0) from census = ${f(total,0)}, from spectrum ΣC(k,${J})n_k = ${f(Bj,0)}  [I2 ${Math.abs(total-Bj)<1e-6?'PASS':'FAIL'}]  CRT N̄·e_${J}(2/q) = ${f(totalE,1)}  ratio ${f(total/totalE,3)}`);
  console.log(`    aligned  obs=${f(aO,0)} CRT=${f(aE,1)} ratio=${f(aO/aE,3)}   |   mixed  obs=${f(mO,0)} CRT=${f(mE,1)} ratio=${f(mO/mE,3)}`);
  console.log(`    ∏Q > W:  obs=${f(supO,0)} CRT=${f(supE,1)} ratio=${f(supO/supE,3)}  vs P1 prediction (aligned share removed) ${f(supE>0?(supE-supAE)/supE:NaN,3)}   sub-W aligned enhancement ${f((aO)/(aE-supAE),3)}`);
  let ln='    enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):';
  for(let i=0;i<NB;i++){ln+='\n      b'+i+' ';for(let j2=0;j2<NB;j2++)ln+=(exp[i][j2]>0?f(obs[i][j2]/exp[i][j2],2):'  ·  ').padStart(8);}
  console.log(ln);
}

// ============================================================================
// DRIVER
// ============================================================================
const ROWS=[];
for(const x of [11,13,17,19,23]){
  const t0=Date.now();
  const L=level(x);
  const sw=part0(L);
  const U=uform(L);
  const R=part2(L,U,sw);
  part3(L,U);
  part4(L,U);
  part5(L,U,2);
  if(x<=17)part5(L,U,3);
  ROWS.push({x,lnW:Math.log(L.W),...R});
  console.log(`  [level time ${(Date.now()-t0)/1000}s]`);
}
console.log('\n===== PART 6 — THE CROSSING, FACTORED =====');
console.log('  S(0)/S̄ = β · (S_CRT/S̄):  β is the classical HL-vs-Mertens ratio (crosses 1 late),');
console.log('  S_CRT/S̄ is the m≥3 product-truncation factor of the rotation ensemble (falls monotonically).');
console.log('   x |   lnW  |  S(0)  |    S̄     |  S_CRT   |   β    | S_CRT/S̄ | S(0)/S̄ | X(0)/X̄ | (X̄−X(0))/S̄ | classical (e^2γ/4)(1+2/L+6/L²)');
for(const r of ROWS){
  const cl=0.7930547*(1+2/r.lnW+6/(r.lnW*r.lnW));
  console.log(`  ${String(r.x).padStart(2)} | ${f(r.lnW,3)} | ${f(r.Sa,0).padStart(6)} | ${f(r.Se,2).padStart(8)} | ${f(r.Sc,2).padStart(8)} | ${f(r.Sa/r.Sc,4)} | ${f(r.Sc/r.Se,4).padStart(7)} | ${f(r.Sa/r.Se,4).padStart(6)} | ${f(r.Xa/r.Xe,4).padStart(6)} | ${f((r.Xe-r.Xa)/r.Se,4).padStart(11)} | ${f(cl,4)}`);
}
console.log(`[total ${(Date.now()-T00)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/natal-cap-35-x-multiplicity.js
//   invocation:  node research/natal-cap-35-x-multiplicity.js
//   code-sha256: 23c7102472c66f2c5f07286211536d14316976f74ac88b35ea207cd109e72797
//   out-sha256:  c14ab734f8297682707d08878bd8388ce422c5db90994fa637359cdea9f25533
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     94.8 s
// ============================================================================
// CUSTODY @11: VR(0)=0.344 [0.344 PASS]  S(0)=45 [45 PASS]  X(0)=28 [28 PASS]  X̄=19.26 [19.26 PASS]  X(0)/X̄=1.4541 [1.4541 PASS]
//           P2(0)=30 [30 PASS]  z(X)=2.25 [2.25 PASS]  z(P2)=0.45 [0.45 PASS]  corr(X,S)=0.481 [0.481 PASS]  corr(VR,S)=0.088
//
// ===== @11: W=2310 N̄=90 K=10 (13..47) H=0.7891  weight identity ΣW=N̄W PASS  [u-form vs sweep: PASS]
//   S(0)=45 S̄=38.24 S_CRT=39.27 | X(0)=28 X̄=19.26 X_CRT=20.29 | X(0)/X̄=1.4541 S(0)/S̄=1.1768 β=S(0)/S_CRT=1.1458
//   identity X = Σ_{j≥2}(−1)^j B_j : anchored 28 vs 28.000  PASS
//    k |  anchored |  ensemble |    CRT    |   z(anch) | (k−1)·[A−E] | (k−1)·[A−C] | (k−1)·[E−C]
//    0 |        45 |     38.24 |     39.27 |      1.83 |        0.00 |        0.00 |        0.00
//    1 |        19 |     35.82 |     34.28 |     -2.81 |        0.00 |        0.00 |        0.00
//    2 |        24 |     13.29 |     13.11 |      3.03 |       10.71 |       10.89 |        0.19
//    3 |         2 |      2.44 |      2.89 |     -0.30 |       -0.89 |       -1.79 |       -0.90
//    4 |         0 |      0.12 |      0.41 |     -0.34 |       -0.37 |       -1.23 |       -0.85
//    5 |         0 |      0.00 |      0.04 |       NaN |        0.00 |       -0.16 |       -0.16
//    6 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.01 |       -0.01
//    7 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//    8 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//    9 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   10 |         0 |      0.08 |      0.00 |     -0.29 |       -0.70 |       -0.00 |        0.70
//   CHANNELS  X-gap anchored−ensemble = 8.74  =  m=2 cell 10.71  +  m≥3 cells -1.96
//   DEFICIT NORMALISED FOR THE X-FLOOR:  (X̄−X(0))/S̄ = -0.2287   [Assumption A: stays below 1−ε]
//   ONE-SIDED ω_s over v ∈ [1,W)   (the ensemble's own arithmetic, no anchoring)
//    j | Σ_v C(a,j) exact | Σ_{∏Q<W} ⌊(W−1)/∏Q⌋ | id | (W−1)·e_j(1/q) CRT | missing mass Σ_{∏Q>W} | #subsets ∏Q<W
//    1 |              906 |                   906 | PASS |              911.0 |              0.000000 |             10
//    2 |              136 |                   136 | PASS |              158.3 |             -0.000000 |             45
//    3 |                0 |                     0 | PASS |               16.0 |              0.006909 |              0
//    4 |                0 |                     0 | PASS |                1.0 |              0.000448 |              0
//    5 |                0 |                     0 | PASS |                0.0 |              0.000020 |              0
//   ω_s law k=0..4  truth 0.6665 0.2746 0.0589 0.0000 0.0000 | CRT 0.6675 0.2765 0.0503 0.0053 0.0004
//   CONVOLUTION TEST (are the two sides independent?): max|conv−ens| = 1.4 at k=1; conv n_0=39.2 vs exact S̄=38.2 (2.42%)
//   COFACTOR TRICHOTOMY: violations (c ∉ {1} ∪ primes>y) = 0  [I3 PASS]   p_nat=0.18750  λ=4.8125  λN̄/W=0.18750
//    i | #{ω_s(r)=i} | c=1 | c=prime>y | Π_i | p_nat·Π_i | prime room | p_nat·(Π_i+room) | ratio
//    0 |          62 |     0 |        62 |       0 |       0.0 |          0 |   n/a — the m=0 cell: r itself prime, no scour part
//    1 |          18 |     2 |        16 |      21 |       3.9 |         85 |             19.9 | 0.906
//    2 |          10 |    10 |         0 |      45 |       8.4 |          0 |              8.4 | 1.185
//   CENSUS j=2: B_2(0) from census = 30, from spectrum ΣC(k,2)n_k = 30  [I2 PASS]  CRT N̄·e_2(2/q) = 24.7  ratio 1.216
//     aligned  obs=19 CRT=12.3 ratio=1.540   |   mixed  obs=11 CRT=12.3 ratio=0.892
//     ∏Q > W:  obs=0 CRT=0.0 ratio=NaN  vs P1 prediction (aligned share removed) NaN   sub-W aligned enhancement 1.540
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·       ·       ·      1.88
//       b1      ·       ·       ·       ·      1.23
//       b2      ·       ·      0.62    1.43     ·
//       b3      ·       ·      0.57    0.95     ·
//       b4     2.14    0.41     ·       ·       ·
//   CENSUS j=3: B_3(0) from census = 2, from spectrum ΣC(k,3)n_k = 2  [I2 PASS]  CRT N̄·e_3(2/q) = 5.0  ratio 0.402
//     aligned  obs=0 CRT=1.2 ratio=0.000   |   mixed  obs=2 CRT=3.7 ratio=0.536
//     ∏Q > W:  obs=2 CRT=5.0 ratio=0.402  vs P1 prediction (aligned share removed) 0.750   sub-W aligned enhancement NaN
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·      1.63    1.74    0.00
//       b1      ·       ·      0.00    0.00     ·
//       b2     0.00    0.00     ·       ·       ·
//       b3     0.00    0.00     ·       ·       ·
//       b4     0.00     ·       ·       ·       ·
//   [level time 0.02s]
// CUSTODY @13: VR(0)=0.623 [0.623 PASS]  S(0)=307 [307 PASS]  X(0)=452 [452 PASS]  X̄=456.18 [456.18 PASS]  X(0)/X̄=0.9908 [0.9908 PASS]
//           P2(0)=601 [601 PASS]  z(X)=-0.16 [-0.16 PASS]  z(P2)=-0.16 [-0.16 PASS]  corr(X,S)=0.908 [0.908 PASS]  corr(VR,S)=0.004
//
// ===== @13: W=30030 N̄=990 K=34 (17..173) H=1.1468  weight identity ΣW=N̄W PASS  [u-form vs sweep: PASS]
//   S(0)=307 S̄=310.88 S_CRT=304.28 | X(0)=452 X̄=456.18 X_CRT=449.58 | X(0)/X̄=0.9908 S(0)/S̄=0.9875 β=S(0)/S_CRT=1.0089
//   identity X = Σ_{j≥2}(−1)^j B_j : anchored 452 vs 452.000  PASS
//    k |  anchored |  ensemble |    CRT    |   z(anch) | (k−1)·[A−E] | (k−1)·[A−C] | (k−1)·[E−C]
//    0 |       307 |    310.88 |    304.28 |     -0.16 |        0.00 |        0.00 |        0.00
//    1 |       348 |    337.86 |    369.58 |      0.25 |        0.00 |        0.00 |        0.00
//    2 |       249 |    245.84 |    213.23 |      0.19 |        3.16 |       35.77 |       32.60
//    3 |        56 |     78.25 |     77.91 |     -2.72 |      -44.50 |      -43.82 |        0.68
//    4 |        29 |     16.74 |     20.27 |      1.62 |       36.78 |       26.18 |      -10.60
//    5 |         1 |      0.36 |      4.01 |      0.89 |        2.56 |      -12.03 |      -14.59
//    6 |         0 |      0.00 |      0.63 |       NaN |        0.00 |       -3.13 |       -3.13
//    7 |         0 |      0.00 |      0.08 |       NaN |        0.00 |       -0.48 |       -0.48
//    8 |         0 |      0.00 |      0.01 |       NaN |        0.00 |       -0.06 |       -0.06
//    9 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.01 |       -0.01
//   10 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   11 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   12 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   13 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   34 |         0 |      0.07 |      0.00 |       NaN |       -2.18 |       -0.00 |        2.18
//   CHANNELS  X-gap anchored−ensemble = -4.18  =  m=2 cell 3.16  +  m≥3 cells -7.34
//   DEFICIT NORMALISED FOR THE X-FLOOR:  (X̄−X(0))/S̄ = 0.0134   [Assumption A: stays below 1−ε]
//   ONE-SIDED ω_s over v ∈ [1,W)   (the ensemble's own arithmetic, no anchoring)
//    j | Σ_v C(a,j) exact | Σ_{∏Q<W} ⌊(W−1)/∏Q⌋ | id | (W−1)·e_j(1/q) CRT | missing mass Σ_{∏Q>W} | #subsets ∏Q<W
//    1 |            17201 |                 17201 | PASS |            17218.1 |              0.000000 |             34
//    2 |             4420 |                  4420 | PASS |             4701.6 |             -0.000000 |            561
//    3 |               85 |                    85 | PASS |              814.9 |              0.023518 |             71
//    4 |                0 |                     0 | PASS |              100.8 |              0.003357 |              0
//    5 |                0 |                     0 | PASS |                9.5 |              0.000316 |              0
//   ω_s law k=0..4  truth 0.5715 0.2869 0.1387 0.0028 0.0000 | CRT 0.5591 0.3297 0.0925 0.0164 0.0021
//   CONVOLUTION TEST (are the two sides independent?): max|conv−ens| = 7.0 at k=2; conv n_0=316.0 vs exact S̄=310.9 (1.63%)
//   COFACTOR TRICHOTOMY: violations (c ∉ {1} ∪ primes>y) = 0  [I3 PASS]   p_nat=0.17188  λ=5.2135  λN̄/W=0.17188
//    i | #{ω_s(r)=i} | c=1 | c=prime>y | Π_i | p_nat·Π_i | prime room | p_nat·(Π_i+room) | ratio
//    0 |         558 |     0 |       558 |       0 |       0.0 |          0 |   n/a — the m=0 cell: r itself prime, no scour part
//    1 |         310 |     7 |       303 |      73 |      12.5 |       1790 |            320.2 | 0.968
//    2 |         110 |   110 |         0 |     617 |     106.0 |          0 |            106.0 | 1.037
//    3 |          12 |    12 |         0 |      71 |      12.2 |          0 |             12.2 | 0.983
//   CENSUS j=2: B_2(0) from census = 601, from spectrum ΣC(k,2)n_k = 601  [I2 PASS]  CRT N̄·e_2(2/q) = 620.0  ratio 0.969
//     aligned  obs=283 CRT=310.0 ratio=0.913   |   mixed  obs=318 CRT=310.0 ratio=1.026
//     ∏Q > W:  obs=0 CRT=0.0 ratio=NaN  vs P1 prediction (aligned share removed) NaN   sub-W aligned enhancement 0.913
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·       ·       ·      1.51
//       b1      ·       ·       ·       ·      0.66
//       b2      ·       ·      1.49    0.93    1.27
//       b3      ·       ·      1.06    0.92     ·
//       b4     1.44    0.64    0.76     ·       ·
//   CENSUS j=3: B_3(0) from census = 182, from spectrum ΣC(k,3)n_k = 182  [I2 PASS]  CRT N̄·e_3(2/q) = 214.9  ratio 0.847
//     aligned  obs=23 CRT=53.7 ratio=0.428   |   mixed  obs=159 CRT=161.2 ratio=0.986
//     ∏Q > W:  obs=143 CRT=186.3 ratio=0.768  vs P1 prediction (aligned share removed) 0.750   sub-W aligned enhancement 3.210
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·      2.99    1.47    0.45
//       b1      ·       ·      0.85    0.53     ·
//       b2     2.53    0.30    0.31    1.91     ·
//       b3     1.72    0.41    0.48     ·       ·
//       b4     0.41     ·       ·       ·       ·
//   [level time 0.313s]
// CUSTODY @17: VR(0)=0.553 [0.553 PASS]  S(0)=3099 [3099 PASS]  X(0)=10381 [10381 PASS]  X̄=10947.70 [10947.7 PASS]  X(0)/X̄=0.9482 [0.9482 PASS]
//           P2(0)=15770 [15770 PASS]  z(X)=-2.71 [-2.71 PASS]  z(P2)=-0.30 [-0.3 PASS]  corr(X,S)=0.987 [0.987 PASS]  corr(VR,S)=0.002
//
// ===== @17: W=510510 N̄=14850 K=120 (19..709) H=1.4938  weight identity ΣW=N̄W PASS  [u-form vs sweep: PASS]
//   S(0)=3099 S̄=3614.93 S_CRT=3245.51 | X(0)=10381 X̄=10947.70 X_CRT=10578.28 | X(0)/X̄=0.9482 S(0)/S̄=0.8573 β=S(0)/S_CRT=0.9549
//   identity X = Σ_{j≥2}(−1)^j B_j : anchored 10381 vs 10381.000  PASS
//    k |  anchored |  ensemble |    CRT    |   z(anch) | (k−1)·[A−E] | (k−1)·[A−C] | (k−1)·[E−C]
//    0 |      3099 |   3614.93 |   3245.51 |     -2.49 |        0.00 |        0.00 |        0.00
//    1 |      5278 |   4081.48 |   5026.88 |      4.00 |        0.00 |        0.00 |        0.00
//    2 |      3820 |   4327.46 |   3797.48 |     -2.68 |     -507.46 |       22.52 |      529.98
//    3 |      1583 |   1958.64 |   1866.42 |     -4.43 |     -751.28 |     -566.84 |      184.43
//    4 |       926 |    776.66 |    671.70 |      1.90 |      448.03 |      762.90 |      314.87
//    5 |       103 |     87.83 |    188.88 |      0.36 |       60.68 |     -343.53 |     -404.21
//    6 |        41 |      2.95 |     43.25 |     10.11 |      190.24 |      -11.23 |     -201.47
//    7 |         0 |      0.00 |      8.29 |       NaN |        0.00 |      -49.77 |      -49.77
//    8 |         0 |      0.00 |      1.36 |       NaN |        0.00 |       -9.53 |       -9.53
//    9 |         0 |      0.00 |      0.19 |       NaN |        0.00 |       -1.55 |       -1.55
//   10 |         0 |      0.00 |      0.02 |       NaN |        0.00 |       -0.22 |       -0.22
//   11 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.03 |       -0.03
//   12 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   13 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   14 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   15 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   16 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   120 |         0 |      0.06 |      0.00 |       NaN |       -6.92 |       -0.00 |        6.92
//   CHANNELS  X-gap anchored−ensemble = -566.70  =  m=2 cell -507.46  +  m≥3 cells -59.24
//   DEFICIT NORMALISED FOR THE X-FLOOR:  (X̄−X(0))/S̄ = 0.1568   [Assumption A: stays below 1−ε]
//   ONE-SIDED ω_s over v ∈ [1,W)   (the ensemble's own arithmetic, no anchoring)
//    j | Σ_v C(a,j) exact | Σ_{∏Q<W} ⌊(W−1)/∏Q⌋ | id | (W−1)·e_j(1/q) CRT | missing mass Σ_{∏Q>W} | #subsets ∏Q<W
//    1 |           381238 |                381238 | PASS |           381296.3 |              0.000000 |            120
//    2 |           135556 |                135556 | PASS |           139100.8 |              0.000000 |           7140
//    3 |            10661 |                 10661 | PASS |            33059.5 |              0.039784 |           5246
//    4 |                3 |                     3 | PASS |             5760.4 |              0.011277 |              3
//    5 |                0 |                     0 | PASS |              785.2 |              0.001538 |              0
//   ω_s law k=0..4  truth 0.4979 0.2783 0.2029 0.0209 0.0000 | CRT 0.4707 0.3579 0.1328 0.0321 0.0057
//   CONVOLUTION TEST (are the two sides independent?): max|conv−ens| = 70.5 at k=2; conv n_0=3664.4 vs exact S̄=3614.9 (1.37%)
//   COFACTOR TRICHOTOMY: violations (c ∉ {1} ∪ primes>y) = 0  [I3 PASS]   p_nat=0.16113  λ=5.5394  λN̄/W=0.16113
//    i | #{ω_s(r)=i} | c=1 | c=prime>y | Π_i | p_nat·Π_i | prime room | p_nat·(Π_i+room) | ratio
//    0 |        6813 |     0 |      6813 |       0 |       0.0 |          0 |   n/a — the m=0 cell: r itself prime, no scour part
//    1 |        5863 |    22 |      5841 |     257 |      41.4 |      36249 |           5882.3 | 0.997
//    2 |        1326 |  1309 |        17 |    8046 |    1296.5 |        127 |           1316.9 | 1.007
//    3 |         848 |   848 |         0 |    5273 |     849.7 |          0 |            849.7 | 0.998
//    4 |           0 |     0 |         0 |       3 |       0.5 |          0 |              0.5 | 0.000
//   CENSUS j=2: B_2(0) from census = 15770, from spectrum ΣC(k,2)n_k = 15770  [I2 PASS]  CRT N̄·e_2(2/q) = 16185.0  ratio 0.974
//     aligned  obs=7715 CRT=8092.5 ratio=0.953   |   mixed  obs=8055 CRT=8092.5 ratio=0.995
//     ∏Q > W:  obs=0 CRT=0.0 ratio=NaN  vs P1 prediction (aligned share removed) NaN   sub-W aligned enhancement 0.953
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·       ·       ·      1.11
//       b1      ·       ·       ·       ·      0.88
//       b2      ·       ·      0.99    0.99    1.03
//       b3      ·       ·      0.99    1.00     ·
//       b4     1.09    0.88    1.03     ·       ·
//   CENSUS j=3: B_3(0) from census = 7137, from spectrum ΣC(k,3)n_k = 7137  [I2 PASS]  CRT N̄·e_3(2/q) = 7693.2  ratio 0.928
//     aligned  obs=1695 CRT=1923.3 ratio=0.881   |   mixed  obs=5442 CRT=5769.9 ratio=0.943
//     ∏Q > W:  obs=3199 CRT=4726.4 ratio=0.677  vs P1 prediction (aligned share removed) 0.750   sub-W aligned enhancement 2.285
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·      1.11    1.20    0.89
//       b1      ·       ·      0.87    0.85    0.59
//       b2     1.08    0.82    0.94    1.04     ·
//       b3     1.05    0.89    1.05     ·       ·
//       b4     0.89    0.48     ·       ·       ·
//   [level time 74.258s]
//
// ===== @19: W=9699690 N̄=252450 K=435 (23..3109) H=1.7857  weight identity ΣW=N̄W PASS
//   S(0)=38380 S̄=49238.76 S_CRT=41441.19 | X(0)=236625 X̄=247579.81 X_CRT=239782.23 | X(0)/X̄=0.9558 S(0)/S̄=0.7795 β=S(0)/S_CRT=0.9261
//   identity X = Σ_{j≥2}(−1)^j B_j : anchored 236625 vs 236625.000  PASS
//    k |  anchored |  ensemble |    CRT    |   z(anch) | (k−1)·[A−E] | (k−1)·[A−C] | (k−1)·[E−C]
//    0 |     38380 |  49238.76 |  41441.19 |       NaN |        0.00 |        0.00 |        0.00
//    1 |     83780 |  59824.54 |  75794.25 |       NaN |        0.00 |        0.00 |        0.00
//    2 |     64624 |  73002.24 |  68367.12 |       NaN |    -8378.24 |    -3743.12 |     4635.12
//    3 |     34026 |  43097.56 |  40562.03 |       NaN |   -18143.12 |   -13072.06 |     5071.06
//    4 |     25281 |  21329.08 |  17812.15 |       NaN |    11855.76 |    22406.56 |    10550.80
//    5 |      3787 |   5422.39 |   6176.91 |       NaN |    -6541.55 |    -9559.63 |    -3018.08
//    6 |      2474 |    529.22 |   1762.44 |       NaN |     9723.89 |     3557.82 |    -6166.07
//    7 |        98 |      6.16 |    425.67 |       NaN |      551.04 |    -1966.03 |    -2517.07
//    8 |         0 |      0.00 |     88.86 |       NaN |        0.00 |     -622.01 |     -622.01
//    9 |         0 |      0.00 |     16.29 |       NaN |        0.00 |     -130.32 |     -130.32
//   10 |         0 |      0.00 |      2.66 |       NaN |        0.00 |      -23.90 |      -23.90
//   11 |         0 |      0.00 |      0.39 |       NaN |        0.00 |       -3.89 |       -3.89
//   12 |         0 |      0.00 |      0.05 |       NaN |        0.00 |       -0.57 |       -0.57
//   13 |         0 |      0.00 |      0.01 |       NaN |        0.00 |       -0.08 |       -0.08
//   14 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.01 |       -0.01
//   15 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   16 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   17 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   18 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   19 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   435 |         0 |      0.05 |      0.00 |       NaN |      -22.59 |        0.00 |       22.59
//   CHANNELS  X-gap anchored−ensemble = -10954.81  =  m=2 cell -8378.24  +  m≥3 cells -2576.56
//   DEFICIT NORMALISED FOR THE X-FLOOR:  (X̄−X(0))/S̄ = 0.2225   [Assumption A: stays below 1−ε]
//   ONE-SIDED ω_s over v ∈ [1,W)   (the ensemble's own arithmetic, no anchoring)
//    j | Σ_v C(a,j) exact | Σ_{∏Q<W} ⌊(W−1)/∏Q⌋ | id | (W−1)·e_j(1/q) CRT | missing mass Σ_{∏Q>W} | #subsets ∏Q<W
//    1 |          8659976 |               8659976 | PASS |          8660196.0 |              0.000000 |            435
//    2 |          3769311 |               3769311 | PASS |          3816192.4 |             -0.000000 |          94395
//    3 |           544464 |                544464 | PASS |          1106885.0 |              0.050943 |         162982
//    4 |             4946 |                  4946 | PASS |           237788.8 |              0.023876 |           3520
//    5 |                0 |                     0 | PASS |            40366.0 |              0.004162 |              0
//   ω_s law k=0..4  truth 0.4402 0.2820 0.2233 0.0541 0.0005 | CRT 0.4074 0.3680 0.1640 0.0481 0.0104
//   CONVOLUTION TEST (are the two sides independent?): max|conv−ens| = 662.2 at k=2; conv n_0=49733.9 vs exact S̄=49238.8 (1.01%)
//   COFACTOR TRICHOTOMY: violations (c ∉ {1} ∪ primes>y) = 0  [I3 PASS]   p_nat=0.15218  λ=5.8471  λN̄/W=0.15218
//    i | #{ω_s(r)=i} | c=1 | c=prime>y | Π_i | p_nat·Π_i | prime room | p_nat·(Π_i+room) | ratio
//    0 |       98340 |     0 |     98340 |       0 |       0.0 |          0 |   n/a — the m=0 cell: r itself prime, no scour part
//    1 |      109234 |    75 |    109159 |     918 |     139.7 |     717851 |         109383.0 | 0.999
//    2 |       19098 | 15778 |      3320 |  103331 |   15725.0 |      21737 |          19033.0 | 1.003
//    3 |       25245 | 25245 |         0 |  165936 |   25252.3 |          0 |          25252.3 | 1.000
//    4 |         533 |   533 |         0 |    3520 |     535.7 |          0 |            535.7 | 0.995
//   CENSUS j=2: B_2(0) from census = 395426, from spectrum ΣC(k,2)n_k = 395426  [I2 PASS]  CRT N̄·e_2(2/q) = 397290.2  ratio 0.995
//     aligned  obs=196092 CRT=198645.1 ratio=0.987   |   mixed  obs=199334 CRT=198645.1 ratio=1.003
//     ∏Q > W:  obs=0 CRT=0.0 ratio=NaN  vs P1 prediction (aligned share removed) NaN   sub-W aligned enhancement 0.987
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·       ·       ·      0.87
//       b1      ·       ·       ·       ·      1.01
//       b2      ·       ·      1.01    1.00    0.99
//       b3      ·       ·      1.01    1.00    1.01
//       b4     0.87    1.01    1.00    1.00     ·
//   [level time 0.625s]
//
// ===== @23: W=223092870 N̄=5301450 K=1739 (29..14929) H=2.0526  weight identity ΣW=N̄W PASS
//   S(0)=597475 S̄=815732.55 S_CRT=669028.80 | X(0)=6179192 X̄=6395995.55 X_CRT=6249291.79 | X(0)/X̄=0.9661 S(0)/S̄=0.7324 β=S(0)/S_CRT=0.8930
//   identity X = Σ_{j≥2}(−1)^j B_j : anchored 6179192 vs 6179192.000  PASS
//    k |  anchored |  ensemble |    CRT    |   z(anch) | (k−1)·[A−E] | (k−1)·[A−C] | (k−1)·[E−C]
//    0 |    597475 | 815732.55 | 669028.80 |       NaN |        0.00 |        0.00 |        0.00
//    1 |   1582579 | 1165582.82 | 1396746.38 |       NaN |        0.00 |        0.00 |        0.00
//    2 |   1369538 | 1410454.72 | 1445745.12 |       NaN |   -40916.72 |   -76207.12 |   -35290.40
//    3 |    817704 | 1063505.93 | 989395.88 |       NaN |  -491603.86 |  -343383.75 |   148220.10
//    4 |    678479 | 575779.43 | 503694.30 |       NaN |   308098.70 |   524354.11 |   216255.41
//    5 |    152659 | 223074.25 | 203503.13 |       NaN |  -281660.99 |  -203376.53 |    78284.45
//    6 |     90320 |  45135.78 |  67978.09 |       NaN |   225921.08 |   111709.56 |  -114211.52
//    7 |     12301 |   2159.12 |  19313.06 |       NaN |    60851.26 |   -42072.34 |  -102923.59
//    8 |       393 |     25.32 |   4764.60 |       NaN |     2573.79 |   -30601.19 |   -33174.98
//    9 |         2 |      0.03 |   1037.02 |       NaN |       15.79 |    -8280.15 |    -8295.95
//   10 |         0 |      0.00 |    201.64 |       NaN |        0.00 |    -1814.77 |    -1814.77
//   11 |         0 |      0.00 |     35.38 |       NaN |        0.00 |     -353.85 |     -353.85
//   12 |         0 |      0.00 |      5.65 |       NaN |        0.00 |      -62.16 |      -62.16
//   13 |         0 |      0.00 |      0.83 |       NaN |        0.00 |       -9.93 |       -9.93
//   14 |         0 |      0.00 |      0.11 |       NaN |        0.00 |       -1.45 |       -1.45
//   15 |         0 |      0.00 |      0.01 |       NaN |        0.00 |       -0.20 |       -0.20
//   16 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.02 |       -0.02
//   17 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   18 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   19 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   20 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   21 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   22 |         0 |      0.00 |      0.00 |       NaN |        0.00 |       -0.00 |       -0.00
//   1739 |         0 |      0.05 |      0.00 |       NaN |      -82.60 |        0.00 |       82.60
//   CHANNELS  X-gap anchored−ensemble = -216803.55  =  m=2 cell -40916.72  +  m≥3 cells -175886.83
//   DEFICIT NORMALISED FOR THE X-FLOOR:  (X̄−X(0))/S̄ = 0.2658   [Assumption A: stays below 1−ε]
//   ONE-SIDED ω_s over v ∈ [1,W)   (the ensemble's own arithmetic, no anchoring)
//    j | Σ_v C(a,j) exact | Σ_{∏Q<W} ⌊(W−1)/∏Q⌋ | id | (W−1)·e_j(1/q) CRT | missing mass Σ_{∏Q>W} | #subsets ∏Q<W
//    1 |        228958458 |             228958458 | PASS |        228959300.9 |              0.000000 |           1739
//    2 |        115800339 |             115800339 | PASS |        116550829.0 |             -0.000000 |        1511191
//    3 |         24187822 |              24187822 | PASS |         39242104.6 |              0.058834 |        4517592
//    4 |           762268 |                762268 | PASS |          9832783.2 |              0.040035 |         354792
//    5 |              546 |                   546 | PASS |          1956004.3 |              0.008765 |            503
//   ω_s law k=0..4  truth 0.3878 0.2998 0.2143 0.0948 0.0034 | CRT 0.3568 0.3693 0.1895 0.0643 0.0162
//   CONVOLUTION TEST (are the two sides independent?): max|conv−ens| = 10207.8 at k=2; conv n_0=822336.1 vs exact S̄=815732.6 (0.81%)
//   COFACTOR TRICHOTOMY: violations (c ∉ {1} ∪ primes>y) = 0  [I3 PASS]   p_nat=0.14526  λ=6.1129  λN̄/W=0.14526
//    i | #{ω_s(r)=i} | c=1 | c=prime>y | Π_i | p_nat·Π_i | prime room | p_nat·(Π_i+room) | ratio
//    0 |     1784710 |     0 |   1784710 |       0 |       0.0 |          0 |   n/a — the m=0 cell: r itself prime, no scour part
//    1 |     2367164 |   271 |   2366893 |    3605 |     523.7 |   16300210 |        2368352.0 | 0.999
//    2 |      426060 | 231837 |    194223 | 1594672 |  231647.9 |    1335212 |         425605.7 | 1.001
//    3 |      671769 | 671769 |         0 | 4622938 |  671544.9 |          0 |         671544.9 | 1.000
//    4 |       51669 | 51669 |         0 |  356436 |   51777.2 |          0 |          51777.2 | 0.998
//   CENSUS j=2: B_2(0) from census = 11044311, from spectrum ΣC(k,2)n_k = 11044311  [I2 PASS]  CRT N̄·e_2(2/q) = 11078586.2  ratio 0.997
//     aligned  obs=5503489 CRT=5539293.1 ratio=0.994   |   mixed  obs=5540822 CRT=5539293.1 ratio=1.000
//     ∏Q > W:  obs=0 CRT=0.0 ratio=NaN  vs P1 prediction (aligned share removed) NaN   sub-W aligned enhancement 0.994
//     enhancement obs/CRT by cofactor range, rows=bin(W/d₁) cols=bin(W/d₂):
//       b0      ·       ·       ·       ·      0.78
//       b1      ·       ·       ·       ·      1.04
//       b2      ·       ·      1.00    1.00    1.00
//       b3      ·       ·      1.00    1.00    1.00
//       b4     0.78    1.04    1.00    1.00    1.00
//   [level time 19.363s]
//
// ===== PART 6 — THE CROSSING, FACTORED =====
//   S(0)/S̄ = β · (S_CRT/S̄):  β is the classical HL-vs-Mertens ratio (crosses 1 late),
//   S_CRT/S̄ is the m≥3 product-truncation factor of the rotation ensemble (falls monotonically).
//    x |   lnW  |  S(0)  |    S̄     |  S_CRT   |   β    | S_CRT/S̄ | S(0)/S̄ | X(0)/X̄ | (X̄−X(0))/S̄ | classical (e^2γ/4)(1+2/L+6/L²)
//   11 | 7.745 |     45 |    38.24 |    39.27 | 1.1458 |  1.0271 | 1.1768 | 1.4541 |     -0.2287 | 1.0772
//   13 | 10.310 |    307 |   310.88 |   304.28 | 1.0089 |  0.9788 | 0.9875 | 0.9908 |      0.0134 | 0.9917
//   17 | 13.143 |   3099 |  3614.93 |  3245.51 | 0.9549 |  0.8978 | 0.8573 | 0.9482 |      0.1568 | 0.9413
//   19 | 16.088 |  38380 | 49238.76 | 41441.19 | 0.9261 |  0.8416 | 0.7795 | 0.9558 |      0.2225 | 0.9100
//   23 | 19.223 | 597475 | 815732.55 | 669028.80 | 0.8930 |  0.8202 | 0.7324 | 0.9661 |      0.2658 | 0.8884
// [total 94.579s]
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 0. WHAT THIS BLOCK CLOSES. The header put FIVE predictions on record and
//    then never graded them: until today this file carried no output and no
//    readings, and its results lived only in TODO.md item X. They are graded
//    below against the run pasted above. Two land, one lands in direction
//    only, one is unsupported, and one is REFUTED as stated.
//
// 1. P5 CONFIRMED, and it was the sharpest call. X(0)/X̄ = 1.4541, 0.9908,
//    0.9482, 0.9558: the "descending through 1" reading breaks at @19 exactly
//    as predicted, and breaks upward. The replacement statistic behaves: the
//    deficit normalised by S̄, (X̄−X(0))/S̄ = −0.2287, +0.0134, +0.1568,
//    +0.2225, rises monotonically at all four levels. Four points is a lead,
//    not a law, and nothing here forbids it turning over at @23.
//
// 2. P4 REFUTED IN ITS FIRST HALF, CONFIRMED IN ITS SECOND. P4 said the m = 2
//    cell carries the sign change of X(0) − X̄ across the crossing. It does
//    not. The total X-gap flips at @11 → @13 (+8.74 → −4.18) while the m = 2
//    cell stays POSITIVE across that flip (+10.71 → +3.16); the flip is
//    carried entirely by the m ≥ 3 cells (−1.96 → −7.34). The m = 2 cell only
//    turns negative one level later, at @17 (−507.46). So the crossing is an
//    m ≥ 3 event, which is the OPPOSITE of what P4 predicted and, awkwardly,
//    the same direction as the header's own warning that the anchored deficit
//    lives at m ≥ 3. P4's second half holds: at @17 the m ≥ 3 cells carry
//    −751.28, +448.03, +60.68, +190.24 individually and sum to −59.24, i.e.
//    large gaps that mostly cancel.
//
// 3. P1 CONFIRMED IN DIRECTION, WRONG ON SIZE, AND DECAYING WITH LEVEL. The
//    aligned j = 3 census does run below CRT while the mixed census sits near
//    it: aligned/mixed ratios are 0.000/n-a @11, 0.428/0.986 @13, 0.881/0.943
//    @17. But "far below" is only true at @11 and @13; by @17 the aligned
//    deficit is 12% against the mixed 6%, a separation of 6 points, not a
//    regime. The quantitative half — the super-W shortfall equals the aligned
//    share, i.e. 0.750 — reads 0.768 at @13 (2.4% out) and 0.677 at @17
//    (10% out, and in the other direction from the trend). P1 is a good
//    mechanism and not yet a formula.
//
// 4. P2 FAILS AT @11 AND THEN TIGHTENS MONOTONICALLY. The claim was p_nat·Π_i
//    "to a few percent for i ≥ 2". Measured ratios at i ≥ 2: 1.185 @11 (18.5%
//    out — not a few percent), 1.037/0.983 @13, 1.007/0.998 @17, 1.003/1.000/
//    0.995 @19. So P2 is false where it was formed and correct to 0.5% two
//    levels up. The one ugly cell, @17 i = 4 with ratio 0.000, is 0 observed
//    against an expectation of 0.5 and carries no weight.
//
// 5. P3 IS UNSUPPORTED BY THIS RUN. The enhancement matrices do not organise
//    by cofactor range in either direction: at @13 the j = 2 row b4 reads
//    1.44, 0.64, 0.76 and at @13 j = 3 the row b2 reads 2.53, 0.30, 0.31,
//    1.91, neither monotone nor short-range-favouring. What the matrices DO
//    show is a level effect the prediction did not name: the whole j = 2
//    spread collapses toward 1 as x rises — 0.41..2.14 @11, 0.64..1.51 @13,
//    0.88..1.11 @17, 0.87..1.01 @19. By @19 the pair channel is CRT to within
//    a few percent everywhere, and the departure from CRT has moved entirely
//    into j ≥ 3. That is a finding, but it is not P3.
//
// 6. THE THREE IDENTITIES PASS EVERYWHERE THEY ARE TESTED. I2 reproduces the
//    anchored X exactly at all four levels (28, 452, 10381, 236625, each
//    against its alternating sum). I3's cofactor trichotomy records ZERO
//    violations at all four. The ΣW = N̄W weight identity passes at all four.
//    I1's u-form is checked against the brute-force sweep at @11, @13 and
//    @17 only ("[u-form vs sweep: PASS]"); the @19 line carries no such tag
//    because the sweep is precisely what the u-form replaces there. The @19
//    ensemble column is therefore UNVERIFIED against brute force and rests on
//    the identity holding at the three levels below it.
//
// 7. THE @19 ROW IS A MEANS ROW, NOT A SIGNIFICANCE ROW. Every z(anch) entry
//    at @19 is NaN and there is no CUSTODY line for @19, because part0 runs
//    only where cap-31 published a reference (x ∈ {11,13,17}) and the u-form
//    returns ensemble MEANS, not per-rotation variances. So cap-31's headline
//    statistic — the anchored z(X) = −2.71 at @17 against z(P2) = −0.30, the
//    whole "pair statistics cannot see this" argument — is NOT extended to
//    @19 by this file. Anyone quoting @19 as a fourth point of that argument
//    is quoting a number that was never computed.
//
// 8. INDEPENDENCE OF THE TWO SIDES IS FALSE AT EVERY LEVEL, BY A SHRINKING
//    AND ONE-SIDED AMOUNT. The convolution test's n_0 against the exact S̄
//    reads 2.42%, 1.63%, 1.37%, 1.01% high at @11..@19. It errs high every
//    time: modelling r and r+2 as independent always over-counts survivors.
//
// 9. WHERE THE CRT MODEL ACTUALLY BREAKS, AND IT CROSSES. The ω_s law at
//    k = 3 reads truth/CRT 0.0000/0.0053, 0.0028/0.0164, 0.0209/0.0321,
//    0.0541/0.0481 — truth far below CRT at the small levels and ABOVE it at
//    @19, a crossing between @17 and @19 that no prediction anticipated. The
//    named mechanism is in the adjacent column: the missing mass over
//    super-W products, Σ_{∏Q>W}, grows 0.0069, 0.0235, 0.0398, 0.0509 at
//    j = 3, so the CRT model is losing exactly the subsets it has no room
//    for. That is P1's exclusion showing up as a global law.
//
// 10. COST, MEASURED, AND WHY THE NEXT LEVEL IS CHEAPER THAN IT LOOKS. Total
//    80.3 s, of which @17 alone is 79.0 s and @19 is 0.96 s. The whole cost
//    is the two things that are switched OFF above @17: the W-rotation
//    custody sweep (part0, x ∈ {11,13,17}) and the j = 3 census (part5(·,3),
//    x ≤ 17). The u-form path that produced the entire @19 row cost under a
//    second. ESTIMATE, NOT A MEASUREMENT: an @23 row through the same u-form
//    path scales as W (23x) on the O(W log log W) legs, i.e. tens of seconds,
//    not hours — while an @23 CUSTODY sweep is 2.2e8 rotations x 1739 primes
//    and is dead. TODO.md item X says "Price the run, not the plumbing"; the
//    price is the sweep, and the @23 row is affordable exactly because it
//    cannot have one.
// ============================================================================
// ============================================================================
// READINGS ADDENDUM (2026-08-19) — the @23 row
// ============================================================================
// The levels array became [11,13,17,19,23]. That is the only code change, and
// readings 0-9 above were written against a four-level block. Where they say
// "all four levels" or quote a four-term sequence, read them as statements
// about @11-@19 and take the fifth term from here. Full working, the price
// derivation and the pre-registration:
// research/history/staging/xchannel-at23.md
//
// A1. THE FIFTH POINT EXTENDS THE MONOTONE RISE, AND FASTER THAN THE FOUR
//     POINTS IMPLIED. (X̄−X(0))/S̄ = −0.2287, +0.0134, +0.1568, +0.2225,
//     +0.2658. Reading 1 said four points is a lead, not a law, and that
//     nothing forbade a turn at @23. No turn. But the increments are
//     +0.2421, +0.1434, +0.0657, +0.0433 and their ratios are 0.592, 0.458,
//     0.659, so the increment ratio is NOT monotone and no saturating law
//     fits five points. A geometric continuation of the four-point sequence
//     predicted 0.246 to 0.253; the measured 0.2658 sits above that window.
//     The lead is stronger than the trend, which is a different fact from
//     the lead continuing, and neither is a law.
//
// A2. X(0)/X̄ RISES FOR THE SECOND CONSECUTIVE LEVEL: 1.4541, 0.9908, 0.9482,
//     0.9558, 0.9661. P5 predicted exactly this flattening back toward 1 and
//     now has two rises rather than one. The "descending through 1" reading
//     is dead twice over, and the case for (X̄−X(0))/S̄ as the better
//     statistic is stronger than it was at four points.
//
// A3. THE m≥3 PRODUCT-TRUNCATION FACTOR KEEPS FALLING: S_CRT/S̄ = 1.0271,
//     0.9788, 0.8978, 0.8416, 0.8202. Monotone at five points, and the
//     factorisation closes: β·(S_CRT/S̄) = 0.8930 × 0.8202 = 0.7324 = S(0)/S̄.
//
// A4. THE @23 β LEG REPRODUCES TWO EXISTING RECORDS EXACTLY. S(0) = 597,475
//     and S_CRT = 669,028.80 and β = 0.8930 match paper/anchored-note.md's
//     §3 table row for @23 and research/OBSERVATIONS.md's exact-β table
//     (0.8930483 against classical 0.8884421, residual 4.606e−3; this file
//     prints 0.8930 and 0.8884). So the @23 row is not an unchecked new
//     computation: its survivor leg is a reproduction gate that passed. What
//     is NEW at @23 is the rotation-ensemble side, S̄ = 815,732.55 and
//     X̄ = 6,395,995.55, which no other instrument has computed.
//
// A5. THE DEFICIT HAS MIGRATED INTO m≥3 AND IS NOW DOMINANT THERE. The X-gap
//     against the ensemble splits −216,803.55 = m=2 −40,916.72 + m≥3
//     −175,886.83, so m≥3 carries 81.1%. Across the levels where both
//     channels share the gap's sign the share runs 10.5% @17, 23.5% @19,
//     81.1% @23. The header's warning that the anchored deficit lives at
//     m ≥ 3 was formed on @17 evidence where m=2 in fact carried 89.5% of
//     the gap; at @23 the warning is true of the gap itself for the first
//     time. P4's surviving half also fails here: the m≥3 cells were "large
//     gaps that mostly cancel" at @17 (−59.24 left of a −751.28 largest
//     cell, 8%), and at @23 they leave −175,804 of a −491,604 largest cell,
//     36%.
//
// A6. NO σ_X AND NO z-SCORES AT @23, FOR THE SAME REASON AS @19. part0 runs
//     only where cap-31 published a reference, x ∈ {11,13,17}. Every z(anch)
//     in the @23 table is NaN and there is no CUSTODY line. Reading 7's
//     warning now covers two levels: cap-31's z(X) = −2.71 against
//     z(P2) = −0.30 remains an @17-only measurement, and the @23 ensemble
//     column is unverified against brute force exactly as @19's is.
//
// A7. READING 10's PRICE ESTIMATE IS GRADED AND IT LANDS. It said an @23 row
//     through the u-form path costs "tens of seconds, not hours". Measured:
//     the @23 level took 18.878 s of the run's 94.6 s, peak RSS 5.69 GB. The
//     estimate was formed before the array was edited and is confirmed.
//     Its companion claim is also confirmed: an @23 custody sweep is
//     2.23e8 rotations × 1739 primes and is dead.
//
// A8. @23 IS THIS INSTRUMENT'S LAST LEVEL, AND THE BLOCKER IS MEMORY, NOT
//     TIME. The per-slot array inventory over the whole run is 25 bytes
//     (A 1, a and b 2 each, C 4, om 2, sp 8, isP and its sieve 2, piC 4), so
//     @23 needs 5.58 GB and measures 5.69 GB. At @29, W = 6,469,693,230 and
//     the same inventory is 162 GB. The CPU cost would be about ten minutes.
//     A sixth point needs a streaming or segmented rewrite, not a bigger
//     budget.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed.
//
// BORROWED, verified present in the named source on 2026-08-20:
//   0.8930483, 0.8884421 and the residual 4.606e-3 are research/OBSERVATIONS.md
//     line 515, its exact-beta table row for @23. The addendum names it. This
//     file prints the same two numbers to four places, 0.8930 and 0.8884, and
//     says so in the same sentence.
//   -175,804 and -491,604 are research/history/staging/xchannel-at23.md line
//     217, the m>=3 cancellation figure. The increments +0.2421, +0.1434,
//     +0.0657 and the ratios 0.592, 0.458 are that same report's line 130.
//     Only the fifth increment +0.0433 and the third ratio 0.659 are new here,
//     and both are arithmetic on the printed (X-bar - X(0))/S-bar row.
//   Neither source is an embedded script OUTPUT, so the custody is a document,
//     not a tail.
//
// DERIVED IN THIS READING by arithmetic over printed values: the increment row
//   and its ratios (above), the geometric-continuation window 0.246 to 0.253,
//   the shares 81.1%, 10.5%, 23.5%, 89.5%, 8%, 36%, the 18.5% of reading on
//   i >= 2, and the memory estimate 5.58 GB against the measured 5.69 GB.
//
// ROUNDINGS of a printed value: 223092870 -> 2.2e8 and -> 2.23e8 (the @23 W,
//   printed in the level header line); 0.039784 -> 0.0398.
//
// TOKENIZER ARTIFACT, not figures: the level lists "x in {11,13,17}" and
//   "[11,13,17,19,23]" read as single numbers. Both are in the code above the
//   banner.
//
// DEFINITION: W = 6,469,693,230 at @29 is the primorial 29#, stated as such.
// ---------------------------------------------------------------------------
