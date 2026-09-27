// ============================================================================
// NATAL-CAP-36 — THE NAMED DOOR, OPENED AND MEASURED: what equidistribution of
// ⌈W/q⌉ mod 30 over the scour primes actually buys, and what it does not.
// (2026-08-15. Companion prose: natal-cap-36-skeleton-door.md. Successor to
// natal-cap-30-skeleton-bound.js, whose Prop C named this door.)
// ============================================================================
// SETTING (cap-26 / cap-30): level x, W = x#, natal N̄ = 2∏(p−2), δ = N̄/W;
// scour prime q (q > x, q² ≤ W), k = ⌊W/q⌋, lA = ⌈W/q⌉ = k+1, lB = ⌊(W+1)/q⌋
// (= k except when a = 1), L = lA+lB, a = q·lA − W ∈ [1, q−1]; C(m) the natal
// autocorrelation, P(m) its 30-free part, g = C/W − δ²; branch ledger over
// T ⊆ {30, 7..x} with φ_M = f_M − m̄_M; SKELETON G30(q) = Σ_{30∈T} dev_T,
// dev_T = [(L/2)B1_T + B2_T]/(V_A+V_B). Branch modulus M_T = 30∏_{p∈T}p | W;
// branch kernel Φ_T(m) = ∏_{M∈T}φ_M(m)·∏_{M∉T}m̄_M, EVEN and MEAN-ZERO mod M_T.
// Write Snum_T := L(Φ_T(0) + 2Σ_{0<d<lA}Φ_T(qd)) + 4Σ_{0≤e<lB}(lB−e)Φ_T(a+qe),
// so that dev_T = Snum_T/(2(V_A+V_B)) and Σ_{T∋30} Snum_T = NUMsk/(15W).
//
// WHAT THIS SCRIPT ESTABLISHES:
//  P0 CHAIN OF CUSTODY, AND ONE NEW LEVEL. Cap-30's five certified BigInt
//     levels are recomputed here from the same exact pass: G30_agg = 0.2132 /
//     0.1113 / 0.1011 / 0.1259 / 0.0945 at @11..@23, every one CERTIFIED as an
//     integer inequality. The branch decomposition below is checked against
//     them: Σ_q Σ_T Snum_T = Σ_q NUMsk(q)/(15W) to 5 digits at @13 and @17.
//     P6 (flag --at29) adds @29: G30_agg = 0.1176, CERTIFIED, 7,863 primes,
//     so leg (iii) is a THEOREM at every x ≤ 29.
//  P1 TRAPEZOID CANCELLATION (proven — all x, all q, all branches). For any
//     M | W and any EVEN MEAN-ZERO F on Z/M, with G(v) = F(qv mod M),
//       Snum(F) = 2·Pa·(lA − lB + 2R) + 4·B,   R = lB mod M,  ℓ = lA mod M,
//       Pa = Σ_{v<ℓ} G(v) − G(0)/2,   B = Σ_{j<R}(R−j)·G(ℓ+j).
//     The window length L cancels identically. Hence |Snum(F)| ≤ 8M·σ(F),
//     σ(F) = Σ_{u mod M}|F(u)| — a bound UNIFORM IN q AND FREE OF L. Verified
//     against the direct sum on 340 (q, branch) pairs at @11..@19.
//  P2 THE OLD REASON FOR VACUITY IS WRONG; THE BOUND IS STILL VACUOUS. Cap-30
//     Prop C(a) held that "every per-branch triangle bound is Θ(L/Vg)". P1
//     refutes that: the per-branch bound is Θ(1/Vg), L-free, and for the
//     whole skeleton reads |G30(q)| ≤ 28.8·∏_p[(8p−24)/p + m̄_p]/(V_A+V_B),
//     uniformly in q. It still certifies 0 primes at every level, for two
//     measured reasons: the branch-count constant grows like 8^{π(x)}, and
//     the calm denominator Σ(V_A+V_B)/Σ(Lδ) itself decays (0.235 → 0.008
//     over @11..@23, slope −0.29 per unit ln W).
//  P3 THE DOOR, STATED EXACTLY, AND MEASURED. By P1 a branch's contribution
//     depends on the kernel ONLY through two partial-sum lengths, ℓ = lA mod
//     M_T and R = lB mod M_T. Since a ≡ q·lA (mod M_T) and lA = k+1, the
//     whole per-branch aggregate is a sum over scour primes of an explicit
//     bounded function of the PAIR (q mod M_T, ⌊W/q⌋ mod M_T); and
//     ⌊W/q⌋ ≡ ⌊M·{W/(Mq)}⌋ (mod M), so the door is the equidistribution of
//     the fractional parts {W/(Mq)} over primes q. MEASURED at M = 30: χ² on
//     the 240 admissible cells is 280/220/276/251/174/242 at @17..@37 (df
//     239) — uniform. MEASURED per branch: |Σ_q Snum_T| / Σ_q|Snum_T| sits at
//     or below K^{−1/2} for M_T ≤ 2310 — square-root cancellation over q.
//  P4 THE DOOR IS NOT THE BLOCKER (the load-bearing measurement). Splitting
//     the exact branch ledger by whether M_T ≤ lB — the condition under which
//     P1 gives an L-free bound and under which the door is a FIXED-modulus
//     question — puts 91% / 101% / 111% / 95% of the whole skeleton mass at
//     @13/@17/@19/@23 in the branches with M_T > lB, concentrated at the
//     depth where M_T first exceeds the window. Those branches are the same
//     question at moduli up to W itself, which is the hard regime, not the
//     fixed-modulus one.
//  P5 THE DECAY-LAW SHORTCUT FAILS. G30_agg = 0.2132, 0.1113, 0.1011, 0.1259,
//     0.0945, 0.1176 is non-monotone twice and, after @11, flat within its own
//     spread (mean 0.1101, spread 0.0313). Adding @29 makes the fits WORSE,
//     R² 0.44 / 0.26 / 0.33 against ln ln W / x / ln K. No decay law is
//     supported; and a fit is PREDICTED, not proven, so it could not have
//     closed all x even if it had fitted.
// Runtime 56 s (plus 11.3 min for --at29, measured 2026-08-17; an earlier run of
// the same pass took 18.5 min on a loaded machine). Do NOT commit (moratorium).
// ============================================================================
'use strict';
const T00=Date.now();
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const f=(v,d=4)=>Number.isFinite(v)?v.toFixed(d):String(v);
function meta(x){
  const mids=primesUpTo(x).filter(p=>p>=7);
  const W=30*mids.reduce((a,b)=>a*b,1);
  const N=2*mids.reduce((a,p)=>a*(p-2),1);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  return{x,mids,W,N,qs};
}
// anchored lengths from one division:  k = ⌊W/q⌋, a = q − (W mod q)
function lens(W,q){const wm=W%q,k=(W-wm)/q,a=q-wm,lA=k+1,lB=(a===1)?lA:k;return{k,a,lA,lB,L:lA+lB};}

// ---- cap-30's exact per-q pass (verbatim behaviour), for P0 and P2 ---------
function scan(lv,q){
  const{mids,W,N}=lv,nm=mids.length;
  const{lA,lB,L}=lens(W,q);
  const rp=new Int32Array(nm),sp=new Int32Array(nm),ps=new Int32Array(nm);
  for(let i=0;i<nm;i++){ps[i]=mids[i];sp[i]=q%mids[i];rp[i]=0;}
  let r30=0;const s30=q%30,FL=4.5e15;
  let aJ=0,bJ=0n,aA=0,bA=0n,aB=0,bB=0n,a1=0,b1=0n,a2=0,b2=0n;
  for(let d=1;d<L;d++){
    r30+=s30;if(r30>=30)r30-=30;
    let P=1;
    for(let i=0;i<nm;i++){let u=rp[i]+sp[i];const p=ps[i];if(u>=p)u-=p;rp[i]=u;
      P*=u===0?p-2:(u===2||u===p-2)?p-3:p-4;}
    const c30=r30===0?2:(r30===6||r30===24)?1:0;
    const C=c30*P,K=15*C-2*P;
    if(C){aJ+=Math.min(d,lA,lB,L-d)*C;if(aJ>FL){bJ+=BigInt(aJ);aJ=0;}
      if(d<lA){aA+=(lA-d)*C;if(aA>FL){bA+=BigInt(aA);aA=0;}}
      if(d<lB){aB+=(lB-d)*C;if(aB>FL){bB+=BigInt(aB);aB=0;}}}
    if(d<lA){a1+=K;if(a1>FL||a1<-FL){b1+=BigInt(a1);a1=0;}}
    else{const w=L-d;a2+=w*K;if(a2>FL||a2<-FL){b2+=BigInt(a2);a2=0;}}
  }
  const SwJ=bJ+BigInt(aJ),TA2=bA+BigInt(aA),TB2=bB+BigInt(aB);
  const SB1K=b1+BigInt(a1),SB2K=b2+BigInt(a2);
  const WB=BigInt(W),NB=BigInt(N),NB2=NB*NB,lAB=BigInt(lA),lBB=BigInt(lB),LB=BigInt(L);
  const IVA=WB*(lAB*NB+2n*TA2)-NB2*lAB*lAB,IVB=WB*(lBB*NB+2n*TB2)-NB2*lBB*lBB;
  return{q,lA,lB,L,IVA,IVB,IC:WB*SwJ-NB2*lAB*lBB,NUM:LB*(14n*NB+2n*SB1K)+4n*SB2K};
}

// ---- branch kernels: Φ_T on Z/M_T ------------------------------------------
function phiTab(M){
  const mbar=M===30?4/900:((M-2)/M)**2,t=new Float64Array(M);
  for(let u=0;u<M;u++){const c=M===30?(u===0?2:(u===6||u===24)?1:0):(u===0?M-2:(u===2||u===M-2)?M-3:M-4);t[u]=c/M-mbar;}
  return{t,mbar};
}
function branch(mids,S){                     // S a bitmask over mids
  const t30=phiTab(30),tp=mids.map(p=>phiTab(p));
  let M=30,out=1;const idx=[];
  for(let i=0;i<mids.length;i++){if(S&(1<<i)){M*=mids[i];idx.push(i);}else out*=tp[i].mbar;}
  const F=new Float64Array(M);
  for(let m=0;m<M;m++){let v=t30.t[m%30]*out;for(const i of idx)v*=tp[i].t[m%mids[i]];F[m]=v;}
  let sig=0;for(let m=0;m<M;m++)sig+=Math.abs(F[m]);
  return{M,F,sig,dep:idx.length};
}
// direct evaluation of Snum (the definition)
function snumDirect(F,M,q,lA,lB,a){
  const L=lA+lB,qm=q%M;let s1=0,c=0;
  for(let d=1;d<lA;d++){c+=qm;if(c>=M)c-=M;s1+=F[c];}
  let s2=0;c=a%M;
  for(let e=0;e<lB;e++){s2+=(lB-e)*F[c];c+=qm;if(c>=M)c-=M;}
  return L*(F[0]+2*s1)+4*s2;
}
// P1's closed form: two partial sums, at lengths ℓ = lA mod M and R = lB mod M
function snumClosed(F,M,q,lA,lB){
  const qm=q%M,R=lB%M,l=lA%M;let Pa=-F[0]/2,B=0,c=0;
  for(let v=0;v<l;v++){Pa+=F[c];c+=qm;if(c>=M)c-=M;}
  c=(qm*l)%M;
  for(let j=0;j<R;j++){B+=(R-j)*F[c];c+=qm;if(c>=M)c-=M;}
  return 2*Pa*(lA-lB+2*R)+4*B;
}

// ---- P1: the identity, against the definition ------------------------------
function P1(x,nq){
  const lv=meta(x),{mids,W}=lv;let worst=0,n=0,slack=1e9;
  for(const q of lv.qs.slice(0,nq)){
    const{lA,lB,a}=lens(W,q);
    for(let S=0;S<(1<<mids.length);S++){
      const b=branch(mids,S);if(b.M>2e6)continue;
      const d1=snumDirect(b.F,b.M,q,lA,lB,a),d2=snumClosed(b.F,b.M,q,lA,lB);
      worst=Math.max(worst,Math.abs(d1-d2)/Math.max(1e-300,Math.abs(d1),Math.abs(d2)));
      slack=Math.min(slack,8*b.M*b.sig/Math.max(1e-300,Math.abs(d1)));n++;
    }
  }
  console.log(`P1 @${x}: ${n} (q,branch) pairs — closed form vs definition, max relerr ${worst.toExponential(1)}; min slack in |Snum| ≤ 8Mσ: ${slack.toFixed(1)}×`);
}

// ---- P0 + P2: the certified levels, and the two uniform bounds -------------
function P02(x){
  const lv=meta(x),{mids,W,N,qs}=lv,delta=N/W;
  const mbar=mids.map(p=>((p-2)/p)**2),sp=mids.map(p=>(8*p-24)/(p*p)),s30=216/900;
  const ASK=s30*mids.reduce((a,_,i)=>a*(mbar[i]+sp[i]),1);              // cap-26 Abel
  const TRAP=4*30*s30*mids.reduce((a,p,i)=>a*(p*sp[i]+mbar[i]),1);      // P1, 4ΣM_Tσ_T
  let SV=0n,SNUM=0n,SIC=0n,SLd=0,SL=0,nA=0,nT=0,bestT=1e18,bestA=1e18;
  for(const q of qs){
    const r=scan(lv,q),V=Number(r.IVA+r.IVB)/(W*W);
    SV+=r.IVA+r.IVB;SNUM+=r.NUM;SIC+=r.IC;SLd+=r.L*delta;SL+=r.L;
    const ab=ASK*(r.L/4+r.lB/2)/V,tr=TRAP/V;
    if(ab<0.5)nA++;if(tr<0.5)nT++;bestT=Math.min(bestT,tr);bestA=Math.min(bestA,ab);
  }
  const Vg=Number(SV)/(W*W),G=Number(BigInt(W)*SNUM)/(2*Number(15n*SV));
  console.log(`P0 @${x}: W=${W} K=${qs.length}  W·ΣNUMsk < 15·ΣV: ${BigInt(W)*SNUM<15n*SV?'CERTIFIED':'FALSE'}  G30_agg=${f(G)}  ΣCov<0: ${SIC<0n?'YES':'NO'}`);
  console.log(`P2 @${x}: calm ΣV/ΣLδ = ${f(Vg/SLd)};  Abel(cap-26) agg ${(ASK*SL/2/Vg).toExponential(3)} best-q ${bestA.toExponential(2)} certified ${nA}/${qs.length};  trapezoid agg ${(qs.length*TRAP/Vg).toExponential(3)} best-q ${bestT.toExponential(2)} certified ${nT}/${qs.length}`);
  return{x,K:qs.length,G,Vg,SLd,SNUM,W};
}

// ---- P3: the door measured — (q, ⌊W/q⌋) mod 30, and cancellation over q ----
function P3(x,masks){
  const lv=meta(x),{mids,W,qs}=lv,K=qs.length;
  const br=masks.map(S=>branch(mids,S));
  const sum=new Float64Array(br.length),abs=new Float64Array(br.length);
  const cell=new Float64Array(900);
  for(const q of qs){
    const{k,lA,lB}=lens(W,q);
    cell[(q%30)*30+(k%30)]++;
    for(let i=0;i<br.length;i++){const v=snumClosed(br[i].F,br[i].M,q,lA,lB);sum[i]+=v;abs[i]+=Math.abs(v);}
  }
  const units=[...Array(30).keys()].filter(u=>u%2&&u%3&&u%5);
  let chi=0;for(const u of units)for(let j=0;j<30;j++)chi+=(cell[u*30+j]-K/240)**2/(K/240);
  console.log(`P3 @${x}: K=${K}  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = ${chi.toFixed(1)}  ` +
    br.map((b,i)=>`| M=${b.M}: |Σ|/Σ|·| = ${(Math.abs(sum[i])/abs[i]).toExponential(2)}`).join(' ') +
    `  (K^−1/2 = ${(1/Math.sqrt(K)).toExponential(2)})`);
}

// ---- P4: exact branch split by M_T ≤ lB (closable) vs M_T > lB (open) ------
function P4(x,step,SNUM){
  const lv=meta(x),{mids,W,qs}=lv,nm=mids.length;
  const br=[];for(let S=0;S<(1<<nm);S++)br.push(branch(mids,S));
  const sSh=new Float64Array(nm+1),sDp=new Float64Array(nm+1);
  let tot=0,sh=0,dp=0,nq=0;
  for(let i=0;i<qs.length;i+=step){
    const q=qs[i],{lA,lB}=lens(W,q);
    for(const b of br){const v=snumClosed(b.F,b.M,q,lA,lB);tot+=v;
      if(b.M<=lB){sh+=v;sSh[b.dep]+=v;}else{dp+=v;sDp[b.dep]+=v;}}
    nq++;
  }
  const chk=SNUM===undefined?'':`  [custody: Σ_q NUMsk/(15W) = ${(Number(SNUM)/(15*W)).toExponential(4)}]`;
  console.log(`P4 @${x} (${nq} primes, step ${step}): Σ_TΣ_q Snum_T = ${tot.toExponential(4)}${chk}`);
  console.log(`     M_T ≤ lB (P1 gives an L-free bound; door is fixed-modulus): ${sh.toExponential(3)} = ${f(100*sh/tot,1)}%`);
  console.log(`     M_T > lB (open; door is at modulus ~W):                     ${dp.toExponential(3)} = ${f(100*dp/tot,1)}%`);
  console.log(`     open mass by depth |T|−1: ${[...sDp].map(v=>v.toExponential(1)).join(' ')}`);
}

// ---- P5: the decay-law shortcut --------------------------------------------
function P5(R){
  const lg=R.map(r=>Math.log(r.G));
  const fit=(u)=>{const n=u.length,su=u.reduce((a,b)=>a+b,0),sv=lg.reduce((a,b)=>a+b,0),
    suu=u.reduce((a,b)=>a+b*b,0),suv=u.reduce((a,b,i)=>a+b*lg[i],0);
    const b=(n*suv-su*sv)/(n*suu-su*su),a=(sv-b*su)/n;
    const res=lg.map((y,i)=>y-(a+b*u[i])),ss=res.reduce((p,q)=>p+q*q,0),
      vv=lg.reduce((p,q)=>p+(q-sv/n)**2,0);
    return{b,R2:1-ss/vv,res};};
  console.log(`P5 G30_agg = ${R.map(r=>f(r.G)).join(', ')}   increments ${R.slice(1).map((r,i)=>f(r.G-R[i].G).replace('-','−')).join(' ')}`);
  for(const[nm,u]of[['ln ln W',R.map(r=>Math.log(Math.log(r.W)))],['x',R.map(r=>r.x)],['ln K',R.map(r=>Math.log(r.K))]]){
    const t=fit(u);console.log(`     fit ln G30 ~ b·(${nm}): b = ${f(t.b,3)}  R² = ${f(t.R2,3)}  residuals ${t.res.map(v=>f(v,3)).join(' ')}`);
  }
  const t=R.slice(1).map(r=>r.G);
  console.log(`     @${R[1].x}..@${R[R.length-1].x} mean ${f(t.reduce((a,b)=>a+b,0)/t.length)}, spread ${f(Math.max(...t)-Math.min(...t))} — flat within its own spread, and non-monotone twice`);
}

// ---- P6: the @29 exact aggregate (node natal-cap-36-skeleton-door.js --at29)
// Cap-30's scan loses exactness at @29: weights reach 2.1e8 while C reaches
// 1.4e8, so w·C overflows 2^53. Splitting w = 2^14·w_hi + w_lo keeps every
// partial product below 2^42. The pass reproduces @23 first, as a control.
const SHW=16384,FL6=4.0e15;
const mkAcc=()=>({hi:0,lo:0,Bhi:0n,Blo:0n});
function accAdd(A,w,V){const wh=(w/SHW)|0,wl=w-wh*SHW;
  A.hi+=wh*V;if(A.hi>FL6||A.hi<-FL6){A.Bhi+=BigInt(A.hi);A.hi=0;}
  A.lo+=wl*V;if(A.lo>FL6||A.lo<-FL6){A.Blo+=BigInt(A.lo);A.lo=0;}}
const accVal=A=>(A.Bhi+BigInt(A.hi))*BigInt(SHW)+A.Blo+BigInt(A.lo);
function scanBig(lv,q){
  const{mids,W,N}=lv,nm=mids.length,{lA,lB,L}=lens(W,q);
  const rp=new Int32Array(nm),sp=new Int32Array(nm),ps=new Int32Array(nm);
  for(let i=0;i<nm;i++){ps[i]=mids[i];sp[i]=q%mids[i];rp[i]=0;}
  let r30=0;const s30=q%30,mn=Math.min(lA,lB);
  const AJ=mkAcc(),AA=mkAcc(),AB=mkAcc(),A2=mkAcc();let a1=0,b1=0n;
  for(let d=1;d<L;d++){
    r30+=s30;if(r30>=30)r30-=30;
    let P=1;
    for(let i=0;i<nm;i++){let u=rp[i]+sp[i];const p=ps[i];if(u>=p)u-=p;rp[i]=u;
      P*=u===0?p-2:(u===2||u===p-2)?p-3:p-4;}
    const c30=r30===0?2:(r30===6||r30===24)?1:0;
    if(c30){const C=c30*P,w=Math.min(d,mn,L-d);
      if(w>0)accAdd(AJ,w,C);
      if(d<lA)accAdd(AA,lA-d,C);
      if(d<lB)accAdd(AB,lB-d,C);}
    const K=15*(c30*P)-2*P;
    if(d<lA){a1+=K;if(a1>FL6||a1<-FL6){b1+=BigInt(a1);a1=0;}}else accAdd(A2,L-d,K);
  }
  const WB=BigInt(W),NB=BigInt(N),NB2=NB*NB,lAB=BigInt(lA),lBB=BigInt(lB),LB=BigInt(L);
  return{q,IC:WB*accVal(AJ)-NB2*lAB*lBB,
    IVA:WB*(lAB*NB+2n*accVal(AA))-NB2*lAB*lAB,
    IVB:WB*(lBB*NB+2n*accVal(AB))-NB2*lBB*lBB,
    NUM:LB*(14n*NB+2n*(b1+BigInt(a1)))+4n*accVal(A2)};
}
function P6(x){
  const t0=Date.now(),lv=meta(x),{W,qs}=lv;
  let SNUM=0n,SV=0n,SIC=0n,nPos=0;const exc=[];
  // max|no30| = max_q |dev(q) - G30(q)|, the per-prime residue the skeleton does
  // not carry. Cap-30 prints this column at @11..@23 and it was absent at @29,
  // which left one cell empty in a certified table. Both quantities were already
  // in this loop, so the column costs nothing beyond the pass itself.
  let maxNo30=0,argNo30=0;
  for(const q of qs){
    const r=scanBig(lv,q),V=r.IVA+r.IVB;
    SNUM+=r.NUM;SV+=V;SIC+=r.IC;if(r.IC>0n)nPos++;
    const sk=Number(BigInt(W)*r.NUM)/(30*Number(V));
    const dev=Number(4n*r.IC+V)/(2*Number(V));
    if(Math.abs(dev-sk)>maxNo30){maxNo30=Math.abs(dev-sk);argNo30=q;}
    if(BigInt(W)*r.NUM>15n*V)exc.push(`${q} (${f(sk,3)})`);
  }
  const G=Number(BigInt(W)*SNUM)/(2*Number(15n*SV));
  console.log(`P6 @${x}: W=${W} K=${qs.length}  W·ΣNUMsk < 15·ΣV: ${BigInt(W)*SNUM<15n*SV?'CERTIFIED':'FALSE'}  G30_agg=${f(G)}  margin ${f(0.5-G)}  dev_agg=${f(Number(4n*SIC+SV)/(2*Number(SV)))}  ΣCov<0: ${SIC<0n?'YES':'NO'}  Cov>0: ${nPos}/${qs.length}  max|no30| ${f(maxNo30,4)} (at q=${argNo30})  resonances: ${exc.join(', ')||'none'}  [${((Date.now()-t0)/1000).toFixed(0)}s]`);
}
if(process.argv.includes('--at29')){P6(23);P6(29);process.exit(0);}

// ---- driver ----------------------------------------------------------------
console.log('P1 — the trapezoid cancellation identity:');
[[11,10],[13,10],[17,6],[19,4]].forEach(([x,n])=>P1(x,n));
console.log('\nP0/P2 — chain of custody, and the two uniform bounds:');
const RES=[11,13,17,19,23].map(P02);
console.log('\nP3 — the door: equidistribution of (q mod 30, ⌊W/q⌋ mod 30), and cancellation over q:');
P3(17,[0,1,3,7]);P3(19,[0,1,3,7]);P3(23,[0,1,3,7]);P3(29,[0,1,3,7]);P3(31,[0,1,3]);P3(37,[0,1,3]);
console.log('\nP4 — where the skeleton mass actually sits:');
P4(13,1,RES[1].SNUM);P4(17,1,RES[2].SNUM);P4(19,11);P4(23,60);
console.log('\nP5 — the decay-law shortcut (the @29 row is the --at29 pass, P6):');
P5(RES.concat([{x:29,K:7863,G:0.1176,W:6469693230}]));
console.log(`\nTOTAL ${((Date.now()-T00)/1000).toFixed(1)}s`);

// ----------------------------------------------------------------------------
// NOT PRODUCED BY THE RUN EMBEDDED BELOW, and kept above the banner so that an
// embed cannot overwrite it. P6 is its own invocation,
// `node research/natal-cap-36-skeleton-door.js --at29`, which prints these two
// rows and exits. The @29 figure the embedded P5 row carries, G30_agg = 0.1176,
// comes from this pass and is hard-coded at line 295.
// P6 — the --at29 pass (11.3 min; it reproduces @23 first, as a control).
// Re-run 2026-08-17 with the max|no30| column added, to fill the cell cap-30's
// @29 row carried as absent. Every other figure on both rows reproduced exactly,
// and the @23 row's max|no30| 0.0039 matches cap-30's own @23 row, so the new
// column arrives with its control already passed.
// P6 @23: W=223092870 K=1739     W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.0945  margin 0.4055  dev_agg=0.0948  ΣCov<0: YES  Cov>0: 1/1739  max|no30| 0.0039 (at q=3847)  resonances: 2339 (0.575)   [20s]
// P6 @29: W=6469693230 K=7863    W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.1176  margin 0.3824  dev_agg=0.1180  ΣCov<0: YES  Cov>0: 1/7863  max|no30| 0.0054 (at q=1109)  resonances: 173 (0.511)   [658s]
// ----------------------------------------------------------------------------

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-36-skeleton-door.js
//   invocation:  node research/natal-cap-36-skeleton-door.js
//   code-sha256: 2d2e77deb3843f8656bb50889cdc76b49359c9dffa6817fc1f7d98a15c3f9aa1
//   out-sha256:  77e356097db4b3163be09caaf06e83b0887720543337f5a01a3881773de39a34
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     29.5 s
// ============================================================================
// P1 — the trapezoid cancellation identity:
// P1 @11: 40 (q,branch) pairs — closed form vs definition, max relerr 4.8e-13; min slack in |Snum| ≤ 8Mσ: 53.8×
// P1 @13: 80 (q,branch) pairs — closed form vs definition, max relerr 1.2e-10; min slack in |Snum| ≤ 8Mσ: 53.8×
// P1 @17: 96 (q,branch) pairs — closed form vs definition, max relerr 1.5e-8; min slack in |Snum| ≤ 8Mσ: 94.6×
// P1 @19: 124 (q,branch) pairs — closed form vs definition, max relerr 6.0e-6; min slack in |Snum| ≤ 8Mσ: 94.6×
//
// P0/P2 — chain of custody, and the two uniform bounds:
// P0 @11: W=2310 K=10  W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.2132  ΣCov<0: YES
// P2 @11: calm ΣV/ΣLδ = 0.2349;  Abel(cap-26) agg 1.828e+1 best-q 8.66e+0 certified 0/10;  trapezoid agg 5.695e+2 best-q 3.85e+2 certified 0/10
// P0 @13: W=30030 K=34  W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.1113  ΣCov<0: YES
// P2 @13: calm ΣV/ΣLδ = 0.1149;  Abel(cap-26) agg 5.254e+1 best-q 2.10e+1 certified 0/34;  trapezoid agg 1.701e+3 best-q 6.07e+2 certified 0/34
// P0 @17: W=510510 K=120  W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.1011  ΣCov<0: YES
// P2 @17: calm ΣV/ΣLδ = 0.0505;  Abel(cap-26) agg 1.579e+2 best-q 3.63e+1 certified 0/120;  trapezoid agg 5.146e+3 best-q 1.38e+3 certified 0/120
// P0 @19: W=9699690 K=435  W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.1259  ΣCov<0: YES
// P2 @19: calm ΣV/ΣLδ = 0.0198;  Abel(cap-26) agg 5.210e+2 best-q 9.31e+1 certified 0/435;  trapezoid agg 1.768e+4 best-q 4.72e+3 certified 0/435
// P0 @23: W=223092870 K=1739  W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.0945  ΣCov<0: YES
// P2 @23: calm ΣV/ΣLδ = 0.0080;  Abel(cap-26) agg 1.593e+3 best-q 1.57e+2 certified 0/1739;  trapezoid agg 5.605e+4 best-q 8.90e+3 certified 0/1739
//
// P3 — the door: equidistribution of (q mod 30, ⌊W/q⌋ mod 30), and cancellation over q:
// P3 @17: K=120  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = 280.0  | M=30: |Σ|/Σ|·| = 1.16e-1 | M=210: |Σ|/Σ|·| = 3.29e-2 | M=2310: |Σ|/Σ|·| = 3.89e-1 | M=30030: |Σ|/Σ|·| = 6.86e-1  (K^−1/2 = 9.13e-2)
// P3 @19: K=435  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = 219.9  | M=30: |Σ|/Σ|·| = 6.80e-2 | M=210: |Σ|/Σ|·| = 3.28e-2 | M=2310: |Σ|/Σ|·| = 7.71e-2 | M=30030: |Σ|/Σ|·| = 3.42e-1  (K^−1/2 = 4.79e-2)
// P3 @23: K=1739  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = 276.1  | M=30: |Σ|/Σ|·| = 6.10e-2 | M=210: |Σ|/Σ|·| = 1.08e-2 | M=2310: |Σ|/Σ|·| = 3.23e-2 | M=30030: |Σ|/Σ|·| = 1.63e-1  (K^−1/2 = 2.40e-2)
// P3 @29: K=7863  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = 250.8  | M=30: |Σ|/Σ|·| = 1.05e-2 | M=210: |Σ|/Σ|·| = 4.42e-4 | M=2310: |Σ|/Σ|·| = 5.50e-3 | M=30030: |Σ|/Σ|·| = 7.98e-2  (K^−1/2 = 1.13e-2)
// P3 @31: K=37534  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = 174.1  | M=30: |Σ|/Σ|·| = 1.56e-2 | M=210: |Σ|/Σ|·| = 9.04e-3 | M=2310: |Σ|/Σ|·| = 7.96e-3  (K^−1/2 = 5.16e-3)
// P3 @37: K=198274  χ²[(q, ⌊W/q⌋) mod 30, 240 cells, df 239] = 241.6  | M=30: |Σ|/Σ|·| = 1.68e-2 | M=210: |Σ|/Σ|·| = 3.09e-3 | M=2310: |Σ|/Σ|·| = 1.26e-3  (K^−1/2 = 2.25e-3)
//
// P4 — where the skeleton mass actually sits:
// P4 @13 (34 primes, step 1): Σ_TΣ_q Snum_T = 2.9021e+1  [custody: Σ_q NUMsk/(15W) = 2.9021e+1]
//      M_T ≤ lB (P1 gives an L-free bound; door is fixed-modulus): 2.667e+0 = 9.2%
//      M_T > lB (open; door is at modulus ~W):                     2.635e+1 = 90.8%
//      open mass by depth |T|−1: 0.0e+0 -2.3e+0 1.9e+1 9.5e+0
// P4 @17 (120 primes, step 1): Σ_TΣ_q Snum_T = 2.2650e+2  [custody: Σ_q NUMsk/(15W) = 2.2650e+2]
//      M_T ≤ lB (P1 gives an L-free bound; door is fixed-modulus): -2.004e+0 = -0.9%
//      M_T > lB (open; door is at modulus ~W):                     2.285e+2 = 100.9%
//      open mass by depth |T|−1: 0.0e+0 0.0e+0 -8.1e+0 2.2e+2 2.2e+1
// P4 @19 (40 primes, step 11): Σ_TΣ_q Snum_T = 1.8153e+2
//      M_T ≤ lB (P1 gives an L-free bound; door is fixed-modulus): -1.952e+1 = -10.8%
//      M_T > lB (open; door is at modulus ~W):                     2.010e+2 = 110.8%
//      open mass by depth |T|−1: 0.0e+0 0.0e+0 -8.2e+0 1.1e+2 9.9e+1 2.4e+0
// P4 @23 (29 primes, step 60): Σ_TΣ_q Snum_T = 3.8400e+2
//      M_T ≤ lB (P1 gives an L-free bound; door is fixed-modulus): 2.099e+1 = 5.5%
//      M_T > lB (open; door is at modulus ~W):                     3.630e+2 = 94.5%
//      open mass by depth |T|−1: 0.0e+0 0.0e+0 0.0e+0 9.5e+0 2.9e+2 5.5e+1 5.5e+0
//
// P5 — the decay-law shortcut (the @29 row is the --at29 pass, P6):
// P5 G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176   increments −0.1019 −0.0102 0.0248 −0.0313 0.0231
//      fit ln G30 ~ b·(ln ln W): b = -0.483  R² = 0.439  residuals 0.272 -0.240 -0.219 0.097 -0.103 0.193
//      fit ln G30 ~ b·(x): b = -0.022  R² = 0.261  residuals 0.383 -0.222 -0.228 0.036 -0.161 0.192
//      fit ln G30 ~ b·(ln K): b = -0.067  R² = 0.331  residuals 0.338 -0.229 -0.240 0.066 -0.127 0.193
//      @13..@29 mean 0.1101, spread 0.0313 — flat within its own spread, and non-monotone twice
//
// TOTAL 29.4s
// ============================================================================
// READINGS (2026-08-15) — honestly calibrated
// ============================================================================
// 1. THE TRAPEZOID IDENTITY [PROVEN, all x, all q, every branch]. For any
//    M | W and any EVEN MEAN-ZERO kernel F mod M, the branch numerator
//    collapses to Snum = 2·Pa·(lA − lB + 2R) + 4·B, where Pa and B are two
//    partial sums of F taken at the lengths ℓ = lA mod M and R = lB mod M.
//    The window length L cancels identically. The proof is four lines and
//    turns on one fact we already had and had not used: the natal
//    autocorrelation is EVEN, so Σ_v v·G(v) = −(M/2)·G(0) exactly, which is
//    the same pairing that gave cap-19 its mirror. Consequence:
//    |Snum| ≤ 8·M·σ(F) uniformly in q and free of L. Verified against the
//    definition on 340 (q, branch) pairs. The identity is also what makes the
//    branch ledger computable at large levels: it costs O(M_T) per branch per
//    prime instead of O(L), which is how P3 reaches @37 and 198,274 primes.
// 2. CAP-30 PROP C(a) IS WRONG AS STATED [REFUTED]. It held that "every
//    per-branch triangle bound is Θ(L/Vg) — vacuous exactly because the calm
//    is real". Reading 1 gives Θ(1/Vg) with an L-free constant. The window
//    length is not the obstruction. The bound is still vacuous, and P2 says
//    why in numbers: the sum over branches is dominated by the deepest one
//    (M_T = W), so the constant grows like 8^{π(x)}; and the denominator is
//    itself collapsing, ΣV/Σ(Lδ) = 0.2349 → 0.0080 over @11..@23, a loss of
//    0.29 per unit ln W. In aggregate the new bound is WORSE than cap-26's
//    Abel bound at every level (5.7e2 vs 1.8e1 @11; 5.6e4 vs 1.6e3 @23), and
//    both certify zero primes anywhere. Theorem A earns its keep as an
//    identity and a computational tool, not as a bound.
// 3. THE DOOR, WITH THE HAND-WAVING REMOVED [PROVEN reduction]. By reading 1
//    each branch's aggregate is Σ_q Ψ_M(q mod M, ⌊W/q⌋ mod M) for an explicit
//    Ψ_M bounded by 8Mσ_T: the two partial-sum lengths are lA = ⌊W/q⌋+1 and
//    lB = ⌊W/q⌋, and a ≡ q·lA (mod M) since M | W. The hyperbola form is
//    EXACT, not approximate: ⌊W/q⌋ ≡ ⌊M·{W/(Mq)}⌋ (mod M), so the door is the
//    equidistribution of the fractional parts {W/(Mq)} over primes q at
//    resolution 1/M, jointly with q mod M. At M = 30 this is what cap-30
//    named. The elementary route the brief asked us to check does NOT land:
//    q^{−1} mod 30 is only a change of variable inside the pair, and Dirichlet
//    on q alone says nothing about ⌊W/q⌋. Equivalent second face: fixing
//    k = ⌊W/q⌋ confines q to (W/(k+1), W/k] and turns the condition into a
//    congruence mod M, so the door is also "primes equidistribute in
//    progressions mod M across the ~√W hyperbola intervals". Those intervals
//    have mean length ≤ 1 for q ≤ √W, so no pointwise short-interval theorem
//    can touch it; the statement is irreducibly an averaged one.
// 4. THE DOOR IS OPEN, AS FAR AS WE CAN SEE IT [MEASURED, 6 levels]. χ² for
//    (q mod 30, ⌊W/q⌋ mod 30) on 240 cells (df 239) reads 280.0, 219.9,
//    276.1, 250.8, 174.1, 241.6 at @17..@37 — uniform at every level, the
//    largest deviation being @31 at −3σ. The branch sums cancel over q at
//    square-root strength: |Σ Snum_T|/Σ|Snum_T| lands at or below K^{−1/2}
//    for M = 30, 210, 2310 from @19 on (at @37, 1.7e−2 / 3.1e−3 / 1.3e−3
//    against K^{−1/2} = 2.3e−3). A separate census finds the same uniformity
//    through @41 with 1,117,909 scour primes.
// 5. THE DOOR IS NOT THE BLOCKER [MEASURED, and this is the load-bearing
//    result]. Theorem A is informative only when M_T ≲ L; for M_T > lB it
//    degenerates to Q = 0, R = lB and hands back the original incomplete sum
//    with its L intact. Splitting the exact branch ledger on that threshold
//    puts 90.8% / 100.9% / 110.8% / 94.5% of the whole skeleton mass at
//    @13/@17/@19/@23 ABOVE it, concentrated at the single depth where M_T
//    first passes the window (depth 3 at @17: 220 of 226; depth 4 at @23:
//    290 of 384). The branches for which the door is a FIXED-modulus question
//    contribute a few percent, of either sign, which is exactly the
//    square-root cancellation of reading 4. So proving the mod-30
//    equidistribution cap-30 named would move G30_agg by a few percent and
//    close nothing. The real requirement is the same statement at moduli that
//    grow with W, which is the hard regime.
// 6. THE DECAY-LAW SHORTCUT IS DEAD [REFUTED]. With @29 the ladder reads
//    0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176: non-monotone twice, and
//    after @11 flat within its own spread (mean 0.1101, spread 0.0313). The
//    six-point fits are worse than the five-point ones (R² 0.44 / 0.26 / 0.33
//    against ln ln W / x / ln K), which is what happens when a fit was
//    tracking one outlier. Cap-30's reading 3 needs the same correction it
//    applied to cap-26: @23 was a downward fluctuation, not a trend. Separate
//    and sufficient: a fitted law is PREDICTED, and an all-x theorem cannot
//    rest on it at any quality of fit.
// 7. @29 IS NEW, AND LEG (iii) IS NOW A THEOREM THROUGH x = 29. First exact
//    pass at W = 6,469,693,230 with 7,863 scour primes (11.3 min):
//    G30_agg = 0.1176 CERTIFIED as an integer inequality, margin 0.382,
//    dev_agg = 0.1180, ΣCov_adj < 0 exact, and exceptions rarer still —
//    1 of 7,863 (q = 173, skeleton 0.511) against 1 of 1,739 at @23. Cap-30's
//    scan silently loses exactness here (w·C exceeds 2^53); the split-weight
//    accumulator in P6 fixes it and reproduces @23 to all printed digits as
//    its control.
// 8. THE CLASSICAL INPUT, AND WHERE IT LIVES. [see the companion .md]
// 9. STATUS OF THE FUSED-WINDOW CALM LEMMA AFTER THIS FILE. (i), (ii) PROVEN
//    (cap-19), unchanged. (iii) THEOREM at x = 11..29 (cap-26 + cap-30 + P6
//    here), all-x still OPEN, but the open statement is now sharper and
//    smaller in one direction and honestly larger in another: sharper because
//    Theorem A reduces every branch to two partial sums indexed by
//    (q mod M_T, ⌊W/q⌋ mod M_T); larger because P4 shows the fixed-modulus
//    door cap-30 named carries almost none of the mass, so the target is the
//    same equidistribution at moduli growing with W. (iv) MEASURED 0.94,
//    untouched.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. The P6 note above the banner already declares the
// custody of the --at29 pass, whose two rows are the source of most of
// reading 7; this only says which figure came from where. No number was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   reading 2's four bound comparisons: trapezoid agg 5.695e+2 -> 5.7e2 and
//     Abel agg 1.828e+1 -> 1.8e1 at @11; trapezoid 5.605e+4 -> 5.6e4 and Abel
//     1.593e+3 -> 1.6e3 at @23.
//   226 in reading 5 is the @17 branch total 2.2650e+2.
//   reading 6's three fit qualities: R^2 = 0.439, 0.261, 0.331 -> 0.44 / 0.26 /
//     0.33 against ln ln W, x and ln K.
// SAME VALUE, DIFFERENT NOTATION: 220 and 290 in reading 5 are the printed
//   2.2e+2 (@17 depth 3) and 2.9e+2 (@23 depth 4) of the open-mass-by-depth
//   rows, and 384 is the @23 branch total 3.8400e+2.
// DERIVED IN THIS READING by arithmetic over printed values:
//   340 (q, branch) pairs in reading 1 is the sum of the four P1 lines,
//     40 + 80 + 96 + 124 at @11..@19. The same total is stated in the header.
//   0.29 per unit ln W in reading 2 is the decay rate of the printed
//     denominator: ln(0.2349/0.0080) = 3.38 over ln W from 7.745 at @11 to
//     19.223 at @23, that is 3.38/11.48 = 0.295.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   1,117,909 scour primes in reading 4 is `natal-cap-37-at41-march.js`, whose
//     block prints "scour: 1117909 primes (43..17442769)".
//   0.94 in reading 9 is `natal-cap-19-calm-lemma.js`, whose RESIDUAL lines
//     print sum dev0^2 / sum Vfused = 0.9352 and 0.9392.
// IN-CODE: reading 7's W = 6,469,693,230, the 7,863 scour primes, the margin
//   0.382 (recorded 0.3824), dev_agg 0.1180 and the exception q = 173 at
//   skeleton 0.511 are all on the P6 @29 row above the banner, which the note
//   there declares as a separate --at29 invocation the embed cannot overwrite.
// CORRECTED 2026-08-20 (mismatch adjudication #8): reading 7's "(18.5 min)"
//   for the @29 pass is now (11.3 min). The recorded P6 rows time it at 658 s
//   for @29 plus 20 s for the @23 control = 678 s = 11.3 min, and the P6 note
//   heads them with exactly that. The old figure is on record but not as this
//   pass's time: line 64 of this file's own header says "plus 11.3 min for
//   --at29, measured 2026-08-17; an earlier run of the same pass took 18.5 min
//   on a loaded machine". Reading 7 is dated 2026-08-15 and so quoted the
//   earlier, loaded-machine wall time against rows that are the 2026-08-17
//   re-run. Old -> new: 18.5 min -> 11.3 min; the header keeps both, with
//   which is which.
// ---------------------------------------------------------------------------
