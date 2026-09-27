// ============================================================================
// RED TEAM 2026-08-28 — independent re-derivations for redteam-0828-engine.md
// ----------------------------------------------------------------------------
// Adversarial verifier's own producer. Shares NO code with the five target
// scripts (thm-mod30-tail.js, thm-capK-bv.js, thm-buchstab-transfer-shallow.js,
// thm-sharp-sieve-range.js, comb-discrepancy-tight.js). Everything below is
// written from the DEFINITIONS in paper/staircase-note.md §1/§7 and
// research/natal-cap-28-analytic-certificate.js RESULT 1, not from the notes.
//
// SCRATCHPAD-GRADE. This script carries no embedded OUTPUT block and is not
// qc-gated; nothing it prints may be quoted outside redteam-0828-engine.md.
//   node research/history/staging/redteam-0828-engine.js        (~60 s)
//   node research/history/staging/redteam-0828-engine.js A17    (single section)
// ============================================================================
'use strict';
const EG = 0.5772156649015328606;
const eg = Math.exp(EG);
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function ok(c,m){if(!c)throw new Error('ASSERT FAIL: '+m); }
const f=(v,d)=>Number(v).toFixed(d);

// ---- level furniture --------------------------------------------------------
function level(x){
  const P=primesUpTo(x), mids=P.filter(p=>p>=7);
  let W=1; for(const p of P)W*=p;
  let N=2; for(const p of mids)N*=(p-2);
  const k=mids.length;
  const root=Math.floor(Math.sqrt(W));
  const scour=primesUpTo(root).filter(q=>q>x);
  return {x,W,N,mids,k,scour,root,lnW:P.reduce((a,p)=>a+Math.log(p),0)};
}
const cbrt=w=>Math.round(Math.cbrt(w)*1e9)/1e9;

// ============================================================================
// SEC A — the ONE-CLASS freshness factor, re-derived and re-measured
// Object (staircase-note §7, prime regime): for each prime-regime scour prime q,
// A-side admissible prime cofactors m with q<=m<=A, qm = 11 or 17 (mod 30),
// and for i<=K:  qm !== 0 (mod q_i)  and  qm !== -2 (mod q_i).
// Predictors: base(K=0) * PROD(1-1/(q_i-1))   vs   base * PROD(1-2/(q_i-1)).
// ============================================================================
function secA(x, Ks){
  const L=level(x), W=L.W;
  const lim=Math.floor((W+1)/(L.scour[0]));
  const sieve=new Uint8Array(lim+1); // 1 = composite
  for(let i=2;i*i<=lim;i++) if(!sieve[i]) for(let j=i*i;j<=lim;j+=i) sieve[j]=1;
  const isP=n=>n>=2&&!sieve[n];
  const c3=Math.cbrt(W+1);
  const tail=L.scour.filter(q=>q>c3);
  const q1=L.scour;                       // freshness primes = first K scour primes
  const maxK=Math.max(...Ks);
  const rows=[];
  // exact counts, K=0 and each K in Ks
  const exact=new Array(maxK+1).fill(0);
  for(const q of tail){
    const A=Math.floor((W-1)/q);
    for(let m=q;m<=A;m++){
      if(!isP(m))continue;
      const v=q*m, t=v%30;
      if(t!==11&&t!==17)continue;
      exact[0]++;
      for(let K=1;K<=maxK;K++){
        let good=true;
        for(let i=0;i<K;i++){const r=v%q1[i]; if(r===0||r===q1[i]-2){good=false;break}}
        if(good)exact[K]++; else break;   // monotone in K
      }
    }
  }
  const out={x,tailPrimes:tail.length,base:exact[0],rows:[]};
  for(const K of Ks){
    let p1=1,p2=1;
    for(let i=0;i<K;i++){p1*=(1-1/(q1[i]-1)); p2*=(1-2/(q1[i]-1));}
    out.rows.push({K,exact:exact[K],pred1:exact[0]*p1,pred2:exact[0]*p2,
                   r1:exact[K]/(exact[0]*p1), r2:exact[K]/(exact[0]*p2)});
  }
  return out;
}

// ============================================================================
// SEC B — exhaustive S1(a) classification check + cap30 vs fresh, at @13/@17
// Marches N_x, finds each comb member's smallest scour striker, and for every
// non-self fresh victim of a PRIME-REGIME q asserts: q | v, v/q prime, >= q,
// and v mod 30 in the right pair. Also builds cap30 (sharp and survey-loose)
// and cap1 for the tail, and asserts fresh(q) <= cap30sharp(q).
// ============================================================================
function secB(x){
  const L=level(x), W=L.W, mids=L.mids, scour=L.scour;
  // comb N_x
  const comb=[];
  for(let r=11;r<W;r+=30){
    for(const rr of [r,r+6]){            // 11 and 17 mod 30
      if(rr>=W)continue;
      let good=true;
      for(const p of mids){const t=rr%p; if(t===0||t===p-2){good=false;break}}
      if(good)comb.push(rr);
    }
  }
  ok(comb.length===L.N,`census @${x}: ${comb.length} vs ${L.N}`);
  // smallest scour striker
  const idxOf=new Map(); scour.forEach((q,i)=>idxOf.set(q,i));
  const c3=Math.cbrt(W+1);
  const fresh=new Int32Array(scour.length), self=new Int32Array(scour.length);
  const victims=[];                       // {q,v,side}
  for(const r of comb){
    let first=-1, side=0;
    for(let i=0;i<scour.length;i++){
      const q=scour[i];
      if(r%q===0){first=i;side=1;break}
      if((r+2)%q===0){first=i;side=2;break}
    }
    if(first<0)continue;
    fresh[first]++;
    const q=scour[first], v=side===1?r:r+2;
    if(v===q){self[first]++; continue}
    if(q>c3)victims.push({q,v,side,i:first});
  }
  // primality for cofactors
  const lim=Math.floor((W+1)/scour[0]);
  const sv=new Uint8Array(lim+1);
  for(let i=2;i*i<=lim;i++) if(!sv[i]) for(let j=i*i;j<=lim;j+=i) sv[j]=1;
  const isP=n=>n>=2&&!sv[n];
  let viol=0;
  for(const V of victims){
    const {q,v,side}=V;
    if(v%q!==0){viol++;continue}
    const m=v/q;
    if(!isP(m)||m<q){viol++;continue}
    const t=v%30;
    if(side===1&&t!==11&&t!==17)viol++;
    if(side===2&&t!==13&&t!==19)viol++;
  }
  // cap30 sharp / loose, and cap1 (Theorem 3 skeleton cap) on the tail
  const PIc=new Int32Array(lim+1);{let c=0;for(let i=2;i<=lim;i++){if(isP(i))c++;PIc[i]=c}}
  const pi=t=>t<2?0:(t>lim?NaN:PIc[t]);
  // pi(T;30,a) tables computed on the fly per q (cheap: reuse a prefix by class)
  const cls=[1,7,11,13,17,19,23,29], ci=new Map(); cls.forEach((c,i)=>ci.set(c,i));
  const pref=[]; {let cnt=new Int32Array(8);
    for(let n=0;n<=lim;n++){ if(isP(n)&&n>5)cnt[ci.get(n%30)]++; if((n&1023)===0)pref.push([n,Int32Array.from(cnt)]); }
  }
  // simpler: full 8-class prefix arrays (memory ok at these levels)
  const PC=[]; for(let i=0;i<8;i++)PC.push(new Int32Array(lim+1));
  {const c=new Int32Array(8);
   for(let n=0;n<=lim;n++){ if(isP(n)&&n>5)c[ci.get(n%30)]++; for(let i=0;i<8;i++)PC[i][n]=c[i]; }}
  const piC=(T,a)=>{ if(T<2)return 0; const aa=((a%30)+30)%30; return PC[ci.get(aa)][Math.min(T,lim)] };
  const inv30=q=>{for(let i=1;i<30;i++)if((q*i)%30===1)return i; throw new Error('no inv')};
  let sumSharp=0,sumLoose=0,sumCap1=0,exceed=0,tailN=0,freshTail=0;
  for(let i=0;i<scour.length;i++){
    const q=scour[i]; if(q<=c3)continue; tailN++;
    const A=Math.floor((W-1)/q), B=Math.floor((W+1)/q);
    const s=[11,13,17,19].includes(q%30)?1:0;
    const qi=inv30(q);
    let sh=s, lo=s;
    for(const a of [11,17]){ const c=(qi*a)%30; sh+=piC(A,c)-piC(q-1,c); lo+=piC(A,c); }
    for(const a of [13,19]){ const c=(qi*a)%30; sh+=piC(B,c)-piC(q-1,c); lo+=piC(B,c); }
    // cap1 = Theorem 3 skeleton cap: s + (pi(A)-pi(q-1)) + (pi(B)-pi(q-1))
    const c1=s+(pi(A)-pi(q-1))+(pi(B)-pi(q-1));
    sumSharp+=sh; sumLoose+=lo; sumCap1+=c1; freshTail+=fresh[i];
    if(lo>c1)exceed++;
    ok(fresh[i]<=sh, `cap30 sharp fails at q=${q} @${x}: fresh=${fresh[i]} cap=${sh}`);
  }
  return {x,N:L.N,victims:victims.length,violations:viol,tailPrimes:tailN,
          sumSharp,sumLoose,sumCap1,ratioSharp:sumSharp/sumCap1,ratioLoose:sumLoose/sumCap1,
          exceed,freshOverCap1:freshTail/sumCap1};
}

// ============================================================================
// SEC C — thm-capK-bv arithmetic: K_dim, the s-table, and the x=239 claim
// ============================================================================
function secC(){
  // K_dim = sup over 2<=w<=z1 of PROD_{w<=p<z1}(1-h(p))^{-1} / (ln z1/ln w), h(p)=1/(p-1) for p>=7
  const P=primesUpTo(200000);
  let best=0,bw=0,bz=0;
  for(let i=0;i<800;i++){
    const w=P[i]; let prod=1;
    for(let j=i;j<P.length&&P[j]<=100000;j++){
      const p=P[j]; if(p>=7)prod/= (1-1/(p-1));
      const z1=P[j]+1e-9;                 // z1 just above p, so p is included
      const r=prod/(Math.log(z1)/Math.log(w));
      if(r>best){best=r;bw=w;bz=p}
    }
  }
  const thr=d=>9*1+10*Math.log(1.2)+Math.log(1/d);   // kappa=1, K_dim=1.2
  // s = ln D / ln z, D = T^{1/2}, T = sqrt(W), z = x  (K=0)   => s = lnW/(4 ln x)
  const Pl=primesUpTo(2000); let th=0; const sAt={};
  const rows=[];
  for(const x of Pl){ th+=Math.log(x); const s=th/(4*Math.log(x)); sAt[x]=s;
    if([11,13,17,19,23,29,97,199,401,1009].includes(x))rows.push({x,s}); }
  let first10=null,first1082=null,firstThr=null;
  th=0; const T1082=thr(1);
  for(const x of Pl){ th+=Math.log(x); const s=th/(4*Math.log(x));
    if(first10===null&&s>=10)first10=x;
    if(first1082===null&&s>=10.8232)first1082=x;
  }
  return {Kdim:best,Kdim_w:bw,Kdim_z:bz,thr1:thr(1),thr05:thr(0.5),thr001:thr(0.01),
          rows,first10,first1082,s239:sAt[239],s283:sAt[283],s241:sAt[241],s251:sAt[251],s257:sAt[257]};
}

// ============================================================================
// SEC D — thm-buchstab arithmetic: K=7/5, s>=22.06, s_head, band emptiness
// ============================================================================
function secD(){
  const P=primesUpTo(200000);
  let best=0,bw=0,bz=0;
  for(let i=0;i<800;i++){
    const w=P[i]; let prod=1;
    for(let j=i;j<P.length&&P[j]<=100000;j++){
      const p=P[j]; if(p>=7)prod/=(1-2/p);
      const z1=P[j]+1e-9;
      const r=prod/Math.pow(Math.log(z1)/Math.log(w),2);
      if(r>best){best=r;bw=w;bz=p}
    }
  }
  const thr=d=>18+10*Math.log(7/5)+Math.log(1/d);
  const Pl=primesUpTo(20000); let th=0; const rows=[]; let bandFirst={};
  const want=[13,17,19,23,29,53,97,131,151,199,499,1009,10007];
  for(let i=0;i<Pl.length;i++){
    const x=Pl[i]; th+=Math.log(x); const q0=Pl[i+1]; if(!q0)break;
    const sHead=(th-Math.log(q0))/Math.log(q0);
    if(want.includes(x))rows.push({x,lnW:th,q0,sHead});
    for(const [nm,sv] of [['d50',thr(0.5)],['d01',thr(0.01)],['b2',4.26645028414864],['one',1]]){
      if(bandFirst[nm]===undefined && Math.log(q0)<=th/(1+sv)) bandFirst[nm]=x;
    }
  }
  // band coverage at selected levels, s*=beta2 and s*=22.0585
  const cov=[]; th=0;
  for(let i=0;i<Pl.length;i++){ const x=Pl[i]; th+=Math.log(x);
    if(![23,97].includes(x))continue;
    const lo=Math.log(x), hi=th/2;
    for(const sv of [thr(0.5),4.26645028414864]){
      const cut=th/(1+sv);
      cov.push({x,sStar:sv,frac:Math.max(0,(cut-lo))/(hi-lo)});
    }
  }
  return {K:best,K_w:bw,K_z:bz,thr05:thr(0.5),thr01:thr(0.1),thr001:thr(0.01),thr1:thr(1),rows,bandFirst,cov};
}

// ============================================================================
// SEC E — sharp sieve functions, independent DDE solve (kappa=1 and 2)
//  sigma: u^-k sigma(u) = (2e^g)^-k/Gamma(1+k) on (0,2];  d/du(u^-k sigma) = -k u^-k-1 sigma(u-2)
//  F = 1/sigma on (0,alpha];  f = 0 on (0,beta];  d/du(u^2 f) = 2 u F(u-1) for u>beta
// ============================================================================
const A2=5.35772744559446184227, B2=4.26645028414864191641;
const c2=1/(2*Math.pow(2*eg,2));                 // = sigma(u)/u^2 on (0,2]
function I24(u){ return Math.log(u)+4/u-2/(u*u) - (Math.log(2)+2-0.5); }
function sigma2(u){
  if(u<=2) return c2*u*u;
  if(u<=4) return u*u*c2*(1-2*I24(u));
  // u in (4,6]: g(u)=g(4)-2 int_4^u t^-3 sigma(t-2) dt with sigma from the (2,4] form
  const g4=c2*(1-2*I24(4));
  const n=200000,h=(u-4)/n; let s=0;
  for(let i=0;i<=n;i++){const t=4+i*h,w=(i===0||i===n)?0.5:1; s+=w*h*Math.pow(t,-3)*sigma2(t-2)}
  return u*u*(g4-2*s);
}
function F2f(u){ return 1/sigma2(u) }
function f2f(u){                                  // valid for beta2 < u <= alpha2
  if(u<=B2)return 0;
  const n=200000,h=(u-B2)/n; let s=0;
  for(let i=0;i<=n;i++){const t=B2+i*h,w=(i===0||i===n)?0.5:1; s+=w*h*t*F2f(t-1)}
  return 2*s/(u*u);
}
const F1f=u=>2*eg/u;                              // valid (0,3]
const f1f=u=>u<=2?0:2*eg*Math.log(u-1)/u;         // valid [2,4]
function secE(){
  const Pl=primesUpTo(1200); let th=0; const rows=[]; const want=[11,13,17,19,23,29,53,97];
  let V1=1;
  for(const x of Pl){ th+=Math.log(x); if(x>=7)V1*=(1-1/(x-1));
    if(!want.includes(x))continue;
    const s=th/(4*Math.log(x));
    rows.push({x,s,V:V1,F1:s<=3?F1f(s):1,VF1:V1*(s<=3?F1f(s):1),f1:f1f(s)});
  }
  // kappa=2 head rows
  th=0; let V2=1; const rows2=[];
  for(let i=0;i<Pl.length;i++){ const x=Pl[i]; th+=Math.log(x); if(x>=7)V2*=(1-2/x);
    const q0=Pl[i+1]; if(!q0)break;
    if(![13,17,19,23,29,53,97].includes(x))continue;
    const s=(th-Math.log(q0))/Math.log(q0);
    rows2.push({x,q0,s,V:V2,F2:s<=A2?F2f(s):1,VF2:V2*(s<=A2?F2f(s):1),f2:(s>B2&&s<=A2)?f2f(s):(s>A2?1:0)});
  }
  // bare-shape DH error factor
  const shape=(t,k)=>Math.pow(Math.log(t),2)/Math.pow(t,1/(2*k+2));
  const bare=[];
  {let th2=0; for(const x of Pl){ th2+=Math.log(x);
     if(![17,23,97].includes(x))continue;
     const lnD1=th2/4;                              // kappa=1: log y = ln D = lnW/4
     const j=Pl.indexOf(x), q0=Pl[j+1];
     const lnD2=th2-Math.log(q0);                   // kappa=2: log y = ln T at q0
     bare.push({x,lnD1,k1:shape(lnD1,1),lnD2,k2:shape(lnD2,2)});}}
  const peak=k=>({t:Math.exp(4*k+4),val:shape(Math.exp(4*k+4),k)});
  const cross=k=>{let lo=Math.exp(4*k+4),hi=1e40; for(let i=0;i<400;i++){const m=Math.sqrt(lo*hi); if(shape(m,k)>1)lo=m;else hi=m} return lo};
  return {rows,rows2,
    checks:{F2_1:F2f(1),F2_2:F2f(2),F2_1p7829:F2f(1.7829),F2_2p317:F2f(2.317),
            F2_4p7088:F2f(4.7088),f2_4p7088:f2f(4.7088),f2_4p5:f2f(4.5),f2_5p0:f2f(5.0),
            naive_2p317:2*Math.pow(2*eg/2.317,2),F1_1p6772:F1f(1.6772)},
    bare,peak1:peak(1),peak2:peak(2),cross1:cross(1),cross2:cross(2)};
}

// ============================================================================
// SEC F — comb discrepancy: D_x = max G - min G, and the @17 certificate row
// ============================================================================
function combSet(x){
  const L=level(x), W=L.W, mids=L.mids;
  const inA=new Uint8Array(W);            // the natal comb N_x itself (both conditions)
  for(let r=11;r<W;r+=30) for(const rr of [r,r+6]){ if(rr>=W)continue;
    let g=1; for(const p of mids){const t=rr%p; if(t===0||t===p-2){g=0;break}} if(g)inA[rr]=1; }
  return {L,inA};
}
function Dx(x){
  const L=level(x), W=L.W, mids=L.mids, rho=L.N/W;
  let G=0,mx=0,mn=0,cnt=0,gap=0,run=0,mxAbs=0;
  for(let r=0;r<W;r++){
    let mem=0; const t=r%30;
    if(t===11||t===17){ mem=1; for(const p of mids){const u=r%p; if(u===0||u===p-2){mem=0;break}} }
    if(mem){cnt++; if(run>gap)gap=run; run=0} else run++;
    G+= mem-rho;
    if(G>mx)mx=G; if(G<mn)mn=G; if(Math.abs(G)>mxAbs)mxAbs=Math.abs(G);
  }
  if(run>gap)gap=run;
  ok(cnt===L.N,`census @${x} in Dx: ${cnt} vs ${L.N}`);
  ok(Math.abs(G)<1e-6,`G(W)!=0 @${x}: ${G}`);
  return {x,k:L.k,two3k:2*Math.pow(3,L.k),D:mx-mn,slack:2*Math.pow(3,L.k)/(mx-mn),
          rhoGap:rho*gap,supAbsOverD:mxAbs/(mx-mn)};
}
// dilated-comb sharp range B(alpha): range of G_alpha over integer u in [0,W]
function rangeDilated(inA,W,rho,alpha){
  let G=0,mx=0,mn=0,a=0;
  for(let m=0;m<W;m++){
    G+= (inA[a]?1:0)-rho;
    if(G>mx)mx=G; if(G<mn)mn=G;
    a+=alpha; if(a>=W)a-=W;
  }
  return mx-mn;
}
function secF17(){
  const x=17,{L,inA}=combSet(x), W=L.W, mids=L.mids, k=L.k, N=L.N, rho=N/W;
  const scour=L.scour, len=scour.length;
  // B-side comb = -A-side
  const inB=new Uint8Array(W); for(let r=0;r<W;r++) inB[(W-r)%W]=inA[r];
  const lim=Math.floor((W+1)/scour[0]);
  const sv=new Uint8Array(lim+1);
  for(let i=2;i*i<=lim;i++) if(!sv[i]) for(let j=i*i;j<=lim;j+=i) sv[j]=1;
  const lpf=new Int32Array(lim+1);
  for(let i=2;i<=lim;i++) if(lpf[i]===0) for(let j=i;j<=lim;j+=i) if(lpf[j]===0)lpf[j]=i;
  let NW=2/30; for(const p of mids)NW*=(1-2/p);
  const D3=2*Math.pow(3,k)+1;
  const Pj=new Float64Array(len+1); Pj[0]=1;
  for(let j=0;j<len;j++)Pj[j+1]=Pj[j]*(1-1/(scour[j]-1));
  let agg=0; const per=[];
  for(let idx=0;idx<len;idx++){
    const q=scour[idx];
    const A=Math.floor((W-1)/q), B=Math.floor((W+1)/q);
    const s=[11,13,17,19].includes(q%30)?1:0;
    let cA=0,cB=0;
    for(let m=2;m<=A;m++){ if(lpf[m]<q)continue; if(inA[(q*m)%W])cA++; }
    for(let m=2;m<=B;m++){ if(lpf[m]<q)continue; if(inB[(q*m)%W])cB++; }
    const cap2=s+cA+cB; agg+=cap2;
    const i1A=inA[q%W]?1:0, i1B=inB[q%W]?1:0;
    const main=s+(A+B)*NW*Pj[idx]-i1A-i1B;
    per.push({q,idx,cap2,main,s,errOld:Math.pow(2,idx+1)*D3});
  }
  // OLD certification
  let oldN=0,oldMass=0;
  for(const r of per){ if(r.errOld<=0.5*(r.main-r.s)){oldN++;oldMass+=r.cap2;
      ok(Math.abs(r.cap2-r.main)<=r.errOld,`coverage q=${r.q}`);} }
  // NEW certification: per-dilation sharp ranges, walking d | P_j
  let newN=0,newMass=0,maxTerm=0,usedMax=0; const detail=[];
  for(const r of per){
    const j=r.idx; if(j>6){break}                 // cost guard: 2*2^j walks of W
    const divs=[1]; for(let i=0;i<j;i++){const nd=[];for(const d of divs)nd.push(d*scour[i]);divs.push(...nd)}
    let bd=0;
    for(const d of divs){
      const al=(r.q*d)%W;
      const t1=rangeDilated(inA,W,rho,al), t2=rangeDilated(inB,W,rho,al);
      bd += t1+1+t2+1;
      if(t1>maxTerm)maxTerm=t1; if(t2>maxTerm)maxTerm=t2;
    }
    let mt=0; for(const d of divs){const al=(r.q*d)%W;
      mt=Math.max(mt,rangeDilated(inA,W,rho,al),rangeDilated(inB,W,rho,al));}
    detail.push({q:r.q,j,cap2:r.cap2,main:+r.main.toFixed(2),half:+(0.5*(r.main-r.s)).toFixed(2),
                 errOld:r.errOld,newErr:+bd.toFixed(2),maxDil:+mt.toFixed(3),
                 pass:bd<=0.5*(r.main-r.s)});
    if(bd<=0.5*(r.main-r.s)){newN++;newMass+=r.cap2;usedMax=Math.max(usedMax,mt);} else break;
  }
  return {x,agg,oldN,oldShare:100*oldMass/agg,newN,newMass,newShare:100*newMass/agg,
          maxTerm,usedMax,two3k:2*Math.pow(3,k),detail};
}

// ============================================================================
const which=process.argv[2]||'ALL';
function run(tag,fn){ if(which!=='ALL'&&which!==tag)return; const t=Date.now();
  console.log(`\n=== ${tag} ===`); const r=fn(); console.log(JSON.stringify(r,null,1));
  console.log(`  (${((Date.now()-t)/1000).toFixed(1)} s)`); }
run('A17',()=>secA(17,[1,2,4,8]));
run('A19',()=>secA(19,[1,2,4,8]));
run('B13',()=>secB(13));
run('B17',()=>secB(17));
run('C',secC);
run('D',secD);
run('E',secE);
run('F7',()=>[7,11,13,17,19].map(Dx));
run('F23',()=>[23].map(Dx));
run('F17cert',secF17);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-engine.js
//   invocation:  node research/history/staging/redteam-0828-engine.js
//   code-sha256: 90d074a4d3f6a3d0c5fa752852c050c728ec861f29ceb5ff72efbc7247097cf1
//   out-sha256:  6c53f79a27b6606bbe50fd97feeee29c9835160fa502a56a4b845601a254cc27
//   body-lines:  615
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     1.6 s
// ============================================================================
//
// === A17 ===
// {
//  "x": 17,
//  "tailPrimes": 105,
//  "base": 5336,
//  "rows": [
//   {
//    "K": 1,
//    "exact": 5037,
//    "pred1": 5039.555555555556,
//    "pred2": 4743.11111111111,
//    "r1": 0.9994929006085193,
//    "r2": 1.0619612068965518
//   },
//   {
//    "K": 2,
//    "exact": 4802,
//    "pred1": 4810.484848484848,
//    "pred2": 4311.919191919192,
//    "r1": 0.9982361760296323,
//    "r2": 1.1136572338830586
//   },
//   {
//    "K": 4,
//    "exact": 4474,
//    "pred1": 4484.059090909091,
//    "pred2": 3736.996632996633,
//    "r1": 0.9977566997434346,
//    "r2": 1.1972180976819284
//   },
//   {
//    "K": 8,
//    "exact": 4043,
//    "pred1": 4059.1091974431815,
//    "pred2": 3054.4166176758768,
//    "r1": 0.9960313466182854,
//    "r2": 1.323657020657628
//   }
//  ]
// }
//   (0.0 s)
//
// === A19 ===
// {
//  "x": 19,
//  "tailPrimes": 396,
//  "base": 90501,
//  "rows": [
//   {
//    "K": 1,
//    "exact": 86390,
//    "pred1": 86387.31818181819,
//    "pred2": 82273.63636363637,
//    "r1": 1.0000310441189546,
//    "r2": 1.0500325963249024
//   },
//   {
//    "K": 2,
//    "exact": 83313,
//    "pred1": 83302.05681818182,
//    "pred2": 76396.94805194804,
//    "r1": 1.0001313674864243,
//    "r2": 1.0905278564707743
//   },
//   {
//    "K": 4,
//    "exact": 78294,
//    "pred1": 78288.50710227274,
//    "pred2": 67342.49494949494,
//    "r1": 1.000070162248976,
//    "r2": 1.1626239874052542
//   },
//   {
//    "K": 8,
//    "exact": 71478,
//    "pred1": 71492.2076454615,
//    "pred2": 56038.30802852542,
//    "r1": 0.9998012700134823,
//    "r2": 1.275520309492843
//   }
//  ]
// }
//   (0.0 s)
//
// === B13 ===
// {
//  "x": 13,
//  "N": 990,
//  "victims": 312,
//  "violations": 0,
//  "tailPrimes": 29,
//  "sumSharp": 699,
//  "sumLoose": 1017,
//  "sumCap1": 2720,
//  "ratioSharp": 0.25698529411764703,
//  "ratioLoose": 0.3738970588235294,
//  "exceed": 5,
//  "freshOverCap1": 0.11654411764705883
// }
//   (0.0 s)
//
// === B17 ===
// {
//  "x": 17,
//  "N": 14850,
//  "victims": 3888,
//  "violations": 0,
//  "tailPrimes": 105,
//  "sumSharp": 10783,
//  "sumLoose": 14509,
//  "sumCap1": 42895,
//  "ratioSharp": 0.25138127986944864,
//  "ratioLoose": 0.33824455064692854,
//  "exceed": 16,
//  "freshOverCap1": 0.09096631309010374
// }
//   (0.0 s)
//
// === C ===
// {
//  "Kdim": 1.1999999999119029,
//  "Kdim_w": 7,
//  "Kdim_z": 7,
//  "thr1": 10.823215567939545,
//  "thr05": 11.51636274849949,
//  "thr001": 15.428385753927637,
//  "rows": [
//   {
//    "x": 11,
//    "s": 0.8074792601844256
//   },
//   {
//    "x": 13,
//    "s": 1.004888471870344
//   },
//   {
//    "x": 17,
//    "s": 1.1597401879924232
//   },
//   {
//    "x": 19,
//    "s": 1.3659312179696093
//   },
//   {
//    "x": 23,
//    "s": 1.5327008580075432
//   },
//   {
//    "x": 29,
//    "s": 1.6771911105154074
//   },
//   {
//    "x": 97,
//    "s": 4.575610939822458
//   },
//   {
//    "x": 199,
//    "s": 8.905755124414254
//   },
//   {
//    "x": 401,
//    "s": 15.712777736195648
//   },
//   {
//    "x": 1009,
//    "s": 34.81284024663966
//   }
//  ],
//  "first10": 239,
//  "first1082": 263,
//  "s239": 10.093589964868517,
//  "s283": 12.01609209979435,
//  "s241": 10.32825416711725,
//  "s251": 10.502259390886776,
//  "s257": 10.707549893190095
// }
//   (0.1 s)
//
// === D ===
// {
//  "K": 1.3999999997944403,
//  "K_w": 7,
//  "K_z": 7,
//  "thr05": 22.05786954677207,
//  "thr01": 23.667307459206175,
//  "thr001": 25.96989255220022,
//  "thr1": 21.364722366212128,
//  "rows": [
//   {
//    "x": 13,
//    "lnW": 10.309952160977376,
//    "q0": 17,
//    "sHead": 2.6389607519696927
//   },
//   {
//    "x": 17,
//    "lnW": 13.143165505033593,
//    "q0": 19,
//    "sHead": 3.4637248718784366
//   },
//   {
//    "x": 19,
//    "lnW": 16.087604484200035,
//    "q0": 23,
//    "sHead": 4.130803432030173
//   },
//   {
//    "x": 23,
//    "lnW": 19.223098700129185,
//    "q0": 29,
//    "sHead": 4.7087644420616295
//   },
//   {
//    "x": 29,
//    "lnW": 22.59039453011566,
//    "q0": 31,
//    "sHead": 5.578473705612602
//   },
//   {
//    "x": 53,
//    "lnW": 44.93051134490508,
//    "q0": 59,
//    "sHead": 10.019030962439878
//   },
//   {
//    "x": 97,
//    "lnW": 83.72839039906393,
//    "q0": 101,
//    "sHead": 17.142189373717674
//   },
//   {
//    "x": 131,
//    "lnW": 116.78918884919796,
//    "q0": 137,
//    "sHead": 22.737732037963163
//   },
//   {
//    "x": 151,
//    "lnW": 136.66486985091717,
//    "q0": 157,
//    "sHead": 26.028921281152545
//   },
//   {
//    "x": 199,
//    "lnW": 188.56350627150735,
//    "q0": 211,
//    "sHead": 34.23327815661551
//   },
//   {
//    "x": 499,
//    "lnW": 474.5544441546942,
//    "q0": 503,
//    "sHead": 75.28768833473646
//   },
//   {
//    "x": 1009,
//    "lnW": 963.1619801404125,
//    "q0": 1013,
//    "sHead": 138.17175227131005
//   },
//   {
//    "x": 10007,
//    "lnW": 9905.202419284073,
//    "q0": 10009,
//    "sHead": 1074.338657394089
//   }
//  ],
//  "bandFirst": {
//   "one": 7,
//   "b2": 23,
//   "d50": 131,
//   "d01": 151
//  },
//  "cov": [
//   {
//    "x": 23,
//    "sStar": 22.05786954677207,
//    "frac": 0
//   },
//   {
//    "x": 23,
//    "sStar": 4.26645028414864,
//    "frac": 0.07946368405404655
//   },
//   {
//    "x": 97,
//    "sStar": 22.05786954677207,
//    "frac": 0
//   },
//   {
//    "x": 97,
//    "sStar": 4.26645028414864,
//    "frac": 0.3036710776722325
//   }
//  ]
// }
//   (0.1 s)
//
// === E ===
// {
//  "rows": [
//   {
//    "x": 11,
//    "s": 0.8074792601844256,
//    "V": 0.75,
//    "F1": 4.411438177578472,
//    "VF1": 3.3085786331838545,
//    "f1": 0
//   },
//   {
//    "x": 13,
//    "s": 1.004888471870344,
//    "V": 0.6875,
//    "F1": 3.5448161021793503,
//    "VF1": 2.437061070248303,
//    "f1": 0
//   },
//   {
//    "x": 17,
//    "s": 1.1597401879924232,
//    "V": 0.64453125,
//    "F1": 3.0715024562067414,
//    "VF1": 1.9796793174770013,
//    "f1": 0
//   },
//   {
//    "x": 19,
//    "s": 1.3659312179696093,
//    "V": 0.6087239583333334,
//    "F1": 2.607850812045538,
//    "VF1": 1.5874612690511576,
//    "f1": 0
//   },
//   {
//    "x": 23,
//    "s": 1.5327008580075432,
//    "V": 0.5810546875000001,
//    "F1": 2.324096588952823,
//    "VF1": 1.3504272172137988,
//    "f1": 0
//   },
//   {
//    "x": 29,
//    "s": 1.6771911105154074,
//    "V": 0.5603027343750001,
//    "F1": 2.1238753375491806,
//    "VF1": 1.1900131591004321,
//    "f1": 0
//   },
//   {
//    "x": 53,
//    "s": 2.8291692602967107,
//    "V": 0.48086783160334057,
//    "F1": 1.2590780219373705,
//    "VF1": 0.6054501182284466,
//    "f1": 0.7603092562224476
//   },
//   {
//    "x": 97,
//    "s": 4.575610939822458,
//    "V": 0.4244005269062904,
//    "F1": 1,
//    "VF1": 0.4244005269062904,
//    "f1": 0.9919237505295805
//   }
//  ],
//  "rows2": [
//   {
//    "x": 13,
//    "q0": 17,
//    "s": 2.6389607519696927,
//    "V": 0.49450549450549447,
//    "F2": 3.686839365375123,
//    "VF2": 1.8231623235371486,
//    "f2": 0
//   },
//   {
//    "x": 17,
//    "q0": 19,
//    "s": 3.4637248718784366,
//    "V": 0.43632837750484804,
//    "F2": 2.28589458364423,
//    "VF2": 0.9974006748286071,
//    "f2": 0
//   },
//   {
//    "x": 19,
//    "q0": 23,
//    "s": 4.130803432030173,
//    "V": 0.3903990746096009,
//    "F2": 1.7556964533528525,
//    "VF2": 0.6854222706843119,
//    "f2": 0
//   },
//   {
//    "x": 23,
//    "q0": 29,
//    "s": 4.7087644420616295,
//    "V": 0.3564513289913747,
//    "F2": 1.487789938741469,
//    "VF2": 0.5303247009243927,
//    "f2": 0.40556562371089705
//   },
//   {
//    "x": 29,
//    "q0": 31,
//    "s": 5.578473705612602,
//    "V": 0.3318684787161075,
//    "F2": 1,
//    "VF2": 0.3318684787161075,
//    "f2": 1
//   },
//   {
//    "x": 53,
//    "q0": 59,
//    "s": 10.019030962439878,
//    "V": 0.2453995390709527,
//    "F2": 1,
//    "VF2": 0.2453995390709527,
//    "f2": 1
//   },
//   {
//    "x": 97,
//    "q0": 101,
//    "s": 17.142189373717674,
//    "V": 0.19148520552562373,
//    "F2": 1,
//    "VF2": 0.19148520552562373,
//    "f2": 1
//   }
//  ],
//  "checks": {
//   "F2_1": 25.377751665003604,
//   "F2_2": 6.344437916250901,
//   "F2_1p7829": 7.983607423250706,
//   "F2_2p317": 4.736186754007638,
//   "F2_4p7088": 1.4877769905284133,
//   "f2_4p7088": 0.40559050531208485,
//   "f2_4p5": 0.2402793975386595,
//   "f2_5p0": 0.5789967218691665,
//   "naive_2p317": 4.727168420202332,
//   "F1_1p6772": 2.1238640805988527
//  },
//  "bare": [
//   {
//    "x": 17,
//    "lnD1": 3.2857913762583983,
//    "k1": 1.0511081703772414,
//    "lnD2": 10.198726525867153,
//    "k2": 3.6621131839361665
//   },
//   {
//    "x": 23,
//    "lnD1": 4.805774675032296,
//    "k1": 1.6644007293378542,
//    "lnD2": 15.85580287014271,
//    "k2": 4.818354364162233
//   },
//   {
//    "x": 97,
//    "lnD1": 20.93209759976598,
//    "k1": 4.324249018303017,
//    "lnD2": 79.11326988222267,
//    "k2": 9.220681078035023
//   }
//  ],
//  "peak1": {
//   "t": 2980.9579870417283,
//   "val": 8.661458127143213
//  },
//  "peak2": {
//   "t": 162754.79141900392,
//   "val": 19.48828078607223
//  },
//  "cross1": 214910065295.76785,
//  "cross2": 87994213187313470000
// }
//   (0.1 s)
//
// === F7 ===
// [
//  {
//   "x": 7,
//   "k": 1,
//   "two3k": 6,
//   "D": 2.238095238095241,
//   "slack": 2.6808510638297838,
//   "rhoGap": 1.380952380952381,
//   "supAbsOverD": 0.5106382978723398
//  },
//  {
//   "x": 11,
//   "k": 2,
//   "two3k": 18,
//   "D": 4.194805194805183,
//   "slack": 4.291021671826638,
//   "rhoGap": 2.2987012987012987,
//   "supAbsOverD": 0.5046439628482984
//  },
//  {
//   "x": 13,
//   "k": 3,
//   "two3k": 54,
//   "D": 8.16483516483488,
//   "slack": 6.6137281292061525,
//   "rhoGap": 2.9340659340659343,
//   "supAbsOverD": 0.5020188425302436
//  },
//  {
//   "x": 17,
//   "k": 4,
//   "two3k": 162,
//   "D": 13.102133160977061,
//   "slack": 12.364398835641143,
//   "rhoGap": 4.508726567550097,
//   "supAbsOverD": 0.501110069565485
//  },
//  {
//   "x": 19,
//   "k": 5,
//   "two3k": 486,
//   "D": 29.61885482970152,
//   "slack": 16.408466930755324,
//   "rhoGap": 5.59572006940428,
//   "supAbsOverD": 0.5004393587444214
//  }
// ]
//   (0.1 s)
//
// === F23 ===
// [
//  {
//   "x": 23,
//   "k": 6,
//   "two3k": 1458,
//   "D": 50.295194511008745,
//   "slack": 28.98885299431279,
//   "rhoGap": 7.6755852842809364,
//   "supAbsOverD": 0.5002362393971568
//  }
// ]
//   (1.0 s)
//
// === F17cert ===
// {
//  "x": 17,
//  "agg": 16135,
//  "oldN": 1,
//  "oldShare": 9.69321351100093,
//  "newN": 4,
//  "newMass": 4552,
//  "newShare": 28.21196157421754,
//  "maxTerm": 18.455720749833986,
//  "usedMax": 18.36910148675015,
//  "two3k": 162,
//  "detail": [
//   {
//    "q": 19,
//    "j": 0,
//    "cap2": 1564,
//    "main": 1564.13,
//    "half": 781.57,
//    "errOld": 326,
//    "newErr": 32.34,
//    "maxDil": 15.171,
//    "pass": true
//   },
//   {
//    "q": 23,
//    "j": 1,
//    "cap2": 1227,
//    "main": 1219.56,
//    "half": 609.78,
//    "errOld": 652,
//    "newErr": 73.64,
//    "maxDil": 18.008,
//    "pass": true
//   },
//   {
//    "q": 29,
//    "j": 2,
//    "cap2": 926,
//    "main": 923.23,
//    "half": 461.62,
//    "errOld": 1304,
//    "newErr": 117.01,
//    "maxDil": 15.331,
//    "pass": true
//   },
//   {
//    "q": 31,
//    "j": 3,
//    "cap2": 835,
//    "main": 832.86,
//    "half": 416.43,
//    "errOld": 2608,
//    "newErr": 249.37,
//    "maxDil": 18.369,
//    "pass": true
//   },
//   {
//    "q": 37,
//    "j": 4,
//    "cap2": 676,
//    "main": 674.52,
//    "half": 337.26,
//    "errOld": 5216,
//    "newErr": 536.14,
//    "maxDil": 18.456,
//    "pass": false
//   }
//  ]
// }
//   (0.2 s)
// ============================================================================
// READINGS
// ============================================================================
