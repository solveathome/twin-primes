// ============================================================================
// ATTACK 14 — THE DISCREPANCY LEMMA: exact per-step laws for the Scour march,
// and the honest price of the e^-311 hinge
// (natal-cap series, TODO item 6, 2026-08-14)
// ============================================================================
// TARGET (natal-cap-07, reading 7). The empirical-Freedman ceiling e^-311 at
// @17 hangs on ONE unproven statement: "along every ensemble path, the alive
// set stays equidistributed enough mod each upcoming q that pair-class counts
// deviate from 2*alive/q by only O(sqrt(alive/q))-scale." This file attacks
// that lemma with the corrected factored spectrum (natal-cap-02) and exact
// pair-correlation machinery (natal5-variance / cap-05).
//
// SETTING. W = x#, natal set N in Z/W (|N| = N), scour primes
// x < q_1 < ... < q_K <= sqrt(W). Rotation ensemble: independent uniform
// strike classes c_j in Z/q_j; step j removes alive members r with
// r == c_j or c_j - 2 (mod q_j). Anchored tile = the member c_j = 0 for all j.
// A_k = alive set BEFORE step k+1; X_c = #{r in A : r == c (mod q)};
// Y_c = X_c + X_{c-2} (pair-class count); x_c = X_c - |A|/q.
//
// WHAT IS PROVEN HERE (each verified to machine precision below):
//
// LEMMA 1 (exact conditional variance). Conditioned on the past (A fixed,
//   c_q uniform, independent -- q has not acted):
//     E[fresh | A]   = (2/q)|A|                          (cap-07, re-verified)
//     Var[fresh | A] = (1/q) sum_c (Y_c - 2|A|/q)^2  =  (2/q) (D2 + R2),
//   where D2 = sum_c x_c^2 (the l2 class discrepancy) and
//   R2 = sum_c x_c x_{c+2} (the shift-2 autocorrelation). |R2| <= D2, so
//     Var[fresh | A] <= (4/q) D2 :
//   the discrepancy lemma IS a statement about D2 of the evolved alive set.
//
// LEMMA 2 (deterministic bridge). Pathwise, |e_q| = |fresh - 2|A|/q| =
//   |Y_{c_q} - 2|A|/q| <= sqrt( q * Var[fresh|A] ), because max^2 <= sum of
//   squares. So the PREDICTABLE quantity v_q controls both the conditional
//   variance AND the realized increment -- exactly what Freedman consumes.
//   (The bridge costs a sqrt(q) factor over the true l-infinity deviation;
//   that loss is priced in section D and turns out to be the second wall.)
//
// LEMMA 3 (step-1 Parseval + certificate). For A = natal set (deterministic):
//     D2(N,q) = (1/q) sum_{a=1}^{q-1} |G(a)|^2,   G(a) = sum_{r in N} e(ar/q).
//   Since q does not divide W, class counts mod q are WINDOW counts in
//   Z/(Wq): G(a) = (1/W) sum_{k in Z/W} S(k) D_W(kq - aW), with S(k) the
//   corrected factored spectrum (cap-02, CRT twist included) and D_W the
//   window-W Dirichlet kernel on Z/(Wq), |D_W(m)| = |sin(pi m/q)| /
//   |sin(pi m/(Wq))| <= W; the numerator |sin(pi a W/q)| is CONSTANT in k.
//   Triangle inequality gives certified l2/l-infinity bounds from |S| alone.
//   (No clean subgroup Parseval collapse exists in the frequency domain
//   because q does not divide W; the EXACT collapse lives in the DIFFERENCE
//   domain instead -- next lemma.)
//
// LEMMA 4 (difference-domain factorization). The cyclic autocorrelation of
//   the natal set factors exactly (J5 comb):
//     C(d) = #{r: r, r+d mod W in N} = c30(d) * prod_{7<=p<=x} (p-4+rho_p(d)),
//     c30 = 2/1/0 for d == 0/+-6/other (mod 30),
//     rho_p(d) = 2 if p|d; 1 if d == +-2 (mod p); 0 otherwise;
//   and C(d) = lin(d) + lin(W-d) where lin(d) = ordered pairs at integer
//   difference d. Then D2(A,q) = #{(r,r') in A^2 : q | r-r'} - |A|^2/q turns
//   the l2 discrepancy into pure pair-counting.
//
// THEOREM 5 (evolution law -- the main positive result). Over the rotation
//   ensemble, survival probabilities are EXACT products (c_j independent;
//   the pair's kill classes at q_j number 4 - rho_{q_j}(r-r')):
//     P(r in A_k)      = prod_{j<=k} (1 - 2/q_j)                 (every r!)
//     P(r,r' in A_k)   = prod_{j<=k} (1 - (4 - rho_{q_j}(r-r'))/q_j).
//   Hence, with P2_k(d) that product and P1_k = prod(1-2/q_j):
//     E[D2_k(q)]  = P1_k N (1 - 1/q) + 2 sum_{d>0} lin(d) P2_k(d) (1[q|d] - 1/q)
//     E[XX2_k(q)] = sum_{d>0} lin(d) P2_k(d) (1[d==2 (q)] + 1[d==-2 (q)])
//     E[A_k^2]    = P1_k N + 2 sum_{d>0} lin(d) P2_k(d)
//     E[v_k]      = (2/q) ( E[D2_k] + E[XX2_k] - E[A_k^2]/q ).
//   Every step's mean discrepancy and mean conditional variance in closed
//   form. COROLLARY (exact): Var(S) = sum_k f_k^2 E[v_k], f_k = prod_{j>k}
//   (1 - 2/q_j) -- the trajectory noise budget closes to the last digit.
//   SIDE DISCOVERY: this Var(S) is the variance of the STRIKE-CLASS ensemble
//   (wheel anchored); it is NOT the natal5-variance number (full window
//   rotation, wheel primes rotating too). The two are close but distinct --
//   cap-07 mixed them; the gap is quantified below.
//
// PROPOSITION 6 (the Markov-union-Freedman chain -- rigorous, and priced).
//   For any predictable thresholds tau_k: with T = first k with v_k > tau_k
//   (a stopping time since v_k is F_{k-1}-measurable), Freedman on the
//   stopped martingale sum e_k f_k gives, for the zero-survivor event,
//     P(S=0) <= exp( -E^2 / (2(V* + M* E/3)) ) + sum_k E[v_k]/tau_k,
//     V* = sum f_k^2 tau_k,  M* = max_k f_k sqrt(q_k tau_k)   (Lemma 2).
//   Section D computes the OPTIMAL thresholds against the exact E[v_k]:
//   the chain is unconditionally valid and unconditionally USELESS -- see
//   readings -- and the computation shows exactly which ingredient (moment
//   order, then l-infinity control) buys which exponent.
//
// HONEST FRAME. Everything probabilistic is over the rotation ensemble.
//   Nothing here touches the anchored tile's escape (reading 8 of cap-07
//   stands unchanged); the anchored march appears only as one measured path.
// ============================================================================

'use strict';
const T0 = Date.now();
const TAU = 2 * Math.PI;

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
function modinv(a,m){a=((a%m)+m)%m;const[g,x]=egcd(a,m);if(g!==1)throw new Error('no inverse');return((x%m)+m)%m;}
function mulberry32(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296;};}
const f2=v=>v.toFixed(2),f3=v=>v.toFixed(3),f4=v=>v.toFixed(4),ex2=v=>v.toExponential(2);
let CHECKS=0;
function assert(cond,msg){if(!cond)throw new Error('CHECK FAIL: '+msg);CHECKS++;}
function assertClose(a,b,tol,msg){if(Math.abs(a-b)>tol*Math.max(1,Math.abs(a),Math.abs(b)))throw new Error(`CHECK FAIL ${msg}: ${a} vs ${b}`);CHECKS++;}
const FACT=[1];for(let m=1;m<=20;m++)FACT[m]=FACT[m-1]*m;

function buildLevel(x){
  const mids=primesUpTo(x).filter(p=>p>=7);
  const W=30*mids.reduce((a,b)=>a*b,1);
  const natal=[];
  for(const c of [11,17])for(let r=c;r<W;r+=30){
    let ok=true;for(const p of mids){const u=r%p;if(u===0||u===p-2){ok=false;break;}}
    if(ok)natal.push(r);
  }
  natal.sort((a,b)=>a-b);
  const scour=primesUpTo(Math.floor(Math.sqrt(W))).filter(q=>q>x);
  return {x,mids,W,natal,N:natal.length,scour};
}

// class statistics of a set mod q: D2 (l2 X-discrepancy), R2 (shift-2 corr),
// v = exact conditional variance of fresh, maxdev = l-inf pair-class dev.
function stepStats(alive,q){
  const hist=new Int32Array(q);
  for(let i=0;i<alive.length;i++)hist[alive[i]%q]++;
  const A=alive.length,mX=A/q,mY=2*A/q;
  let D2=0,R2=0,v=0,maxdev=0,maxXdev=0;
  for(let c=0;c<q;c++){
    const xc=hist[c]-mX;
    D2+=xc*xc;
    R2+=xc*(hist[(c+2)%q]-mX);
    const dy=hist[c]+hist[(c+q-2)%q]-mY;
    v+=dy*dy;
    const ad=Math.abs(dy);if(ad>maxdev)maxdev=ad;
    const ax=Math.abs(xc);if(ax>maxXdev)maxXdev=ax;
  }
  return {hist,A,D2,R2,v:v/q,maxdev,maxXdev,fresh:hist[0]+hist[q-2]};
}

// ---------------------------- section A --------------------------------------
function anchoredMarch(L,f){
  let alive=L.natal.slice();
  const rows=[];let maxIdErr=0,maxBridge=0,Memp=0;
  L.scour.forEach((q,k)=>{
    const s=stepStats(alive,q);
    const vId=(2/q)*(s.D2+s.R2);                     // Lemma 1
    const err=Math.abs(vId-s.v)/Math.max(1e-12,s.v);
    if(err>maxIdErr)maxIdErr=err;
    assert(s.D2+s.R2>=-1e-9,'D2+R2>=0');
    const e=s.fresh-2*s.A/q;
    const br=s.v>0?Math.abs(e)/Math.sqrt(q*s.v):0;   // Lemma 2
    if(br>maxBridge)maxBridge=br;
    assert(br<=1+1e-9,'bridge |e|<=sqrt(qv)');
    if(f[k]*s.maxdev>Memp)Memp=f[k]*s.maxdev;
    rows.push({q,A:s.A,fresh:s.fresh,e,v:s.v,D2:s.D2,R2:s.R2,maxdev:s.maxdev});
    alive=alive.filter(r=>{const m=r%q;return m!==0&&m!==q-2;});
  });
  return {rows,final:alive.length,maxIdErr,maxBridge,Memp};
}

// ---------------------------- section B --------------------------------------
function buildAbsS(L){     // corrected factored |S(k)| with CRT twist (cap-02)
  const {W,mids}=L;
  const y30=modinv(W/30,30);
  const c30=new Float64Array(30);
  for(let t=0;t<30;t++)c30[t]=Math.hypot(Math.cos(TAU*11*t/30)+Math.cos(TAU*17*t/30),
                                         Math.sin(TAU*11*t/30)+Math.sin(TAU*17*t/30));
  const cp={},yp={};
  for(const p of mids){yp[p]=modinv(W/p,p);const a=new Float64Array(p);a[0]=p-2;
    for(let t=1;t<p;t++)a[t]=Math.abs(2*Math.cos(TAU*t/p));cp[p]=a;}
  const absS=new Float64Array(W);
  for(let k=0;k<W;k++){
    let v=c30[(k*y30)%30];
    for(const p of mids)v*=cp[p][(k*yp[p])%p];
    absS[k]=v;
  }
  return absS;
}

function d2ViaDFT(natal,q){  // direct (1/q) sum_{a!=0} |G(a)|^2
  const rm=natal.map(r=>r%q);
  let tot=0;
  for(let a=1;a<q;a++){
    const co=new Float64Array(q),si=new Float64Array(q);
    for(let t=0;t<q;t++){const th=TAU*((a*t)%q)/q;co[t]=Math.cos(th);si[t]=Math.sin(th);}
    let re=0,im=0;
    for(let i=0;i<rm.length;i++){re+=co[rm[i]];im+=si[rm[i]];}
    tot+=re*re+im*im;
  }
  return tot/q;
}

function certBound(L,absS,q){ // Lemma 3 certificate from the factored spectrum
  const {W}=L,Wq=W*q;
  let sum2=0,sumAbs=0;
  for(let a=1;a<q;a++){
    const sA=Math.abs(Math.sin(Math.PI*((a*W)%q)/q)); // |sin(pi aW/q)|, const in k
    let acc=0;
    for(let k=0;k<W;k++){
      let m=(k*q-a*W)%Wq; if(m<0)m+=Wq; if(2*m>Wq)m-=Wq;      // minimal residue
      const den=Math.abs(Math.sin(Math.PI*m/Wq));
      acc+=absS[k]*(den>0?Math.min(W,sA/den):W);
    }
    const b=acc/W;
    sum2+=b*b;sumAbs+=b;
  }
  return {l2:sum2/q,linf:sumAbs/q};
}

function checkCd(L){         // Lemma 4: full check of the factored C(d)
  const {W,mids,natal}=L;
  const ind=new Uint8Array(W);for(const r of natal)ind[r]=1;
  let maxErr=0;
  for(let d=0;d<W;d++){
    let c=0;for(let i=0;i<natal.length;i++)c+=ind[(natal[i]+d)%W];
    const m30=d%30;
    let g=(m30===0)?2:((m30===6||m30===24)?1:0);
    if(g>0)for(const p of mids){const dm=d%p;const rho=(dm===0)?2:((dm===2||dm===p-2)?1:0);g*=(p-4+rho);}
    if(Math.abs(c-g)>maxErr)maxErr=Math.abs(c-g);
  }
  return maxErr;
}

// ---------------------------- section C --------------------------------------
function evolutionLaw(L,f){
  const {W,N,natal,mids,scour}=L;
  const nat=Int32Array.from(natal);
  const lin=new Int32Array(W);
  for(let i=0;i<N;i++){const ri=nat[i];for(let j=i+1;j<N;j++)lin[nat[j]-ri]++;}
  let nAct=0;for(let d=1;d<W;d++)if(lin[d])nAct++;
  const dArr=new Int32Array(nAct),cnt=new Float64Array(nAct);
  {let i=0;for(let d=1;d<W;d++)if(lin[d]){dArr[i]=d;cnt[i]=lin[d];i++;}}
  let sc=0;for(let i=0;i<nAct;i++)sc+=cnt[i];
  assert(2*sc+N===N*N,'ordered-pair total = N^2');
  // Lemma 4 spot check: lin(d)+lin(W-d) = factored C(d), 500 pseudo-random d
  for(let t=0;t<500;t++){
    const d=1+(Math.imul(t+1,2654435761)>>>0)%(W-1);
    const m30=d%30;
    let g=(m30===0)?2:((m30===6||m30===24)?1:0);
    if(g>0)for(const p of mids){const dm=d%p;const rho=(dm===0)?2:((dm===2||dm===p-2)?1:0);g*=(p-4+rho);}
    assert(lin[d]+lin[W-d]===g,`C(d) split d=${d}`);
  }
  const K=scour.length,rows=[];
  const P2=new Float64Array(nAct).fill(1);
  let P1=1;
  for(let k=0;k<K;k++){
    const q=scour[k];
    let sQ=0,sAll=0,sPM2=0;
    for(let i=0;i<nAct;i++){
      const w=cnt[i]*P2[i];sAll+=w;
      const dm=dArr[i]%q;
      if(dm===0)sQ+=w;else if(dm===2||dm===q-2)sPM2+=w;
    }
    const EA=P1*N,EA2=EA+2*sAll;
    const ED2=EA*(1-1/q)+2*(sQ-sAll/q);
    const Ev=(2/q)*(ED2+sPM2-EA2/q);
    rows.push({q,EA,ED2,Ev,vbin:EA*(2/q)*(1-2/q)});
    P1*=1-2/q;
    for(let i=0;i<nAct;i++){
      const dm=dArr[i]%q;
      const rho=(dm===0)?2:((dm===2||dm===q-2)?1:0);
      P2[i]*=1-(4-rho)/q;
    }
  }
  let sAllK=0;for(let i=0;i<nAct;i++)sAllK+=cnt[i]*P2[i];
  const EAK=P1*N;
  const VarS=EAK+2*sAllK-EAK*EAK;                     // endpoint pair formula
  const VarSum=rows.reduce((a,r,k)=>a+f[k]*f[k]*r.Ev,0); // trajectory formula
  return {rows,EAK,VarS,VarSum,nAct};
}

function mcVerify(L,law,f,nRuns,seed,momMax){
  const {natal,scour}=L,K=scour.length,rng=mulberry32(seed);
  const sumV=new Float64Array(K),sumD2=new Float64Array(K);
  const mom=[];for(let k=0;k<K;k++)mom.push(new Float64Array(momMax+1));
  let maxRatio=0,maxRatioK=-1,maxLemma=0,maxfDev=0;
  let sumS=0,sumS2=0,zeros=0,minS=Infinity;
  for(let it=0;it<nRuns;it++){
    let alive=natal;
    for(let k=0;k<K;k++){
      const q=scour[k];
      const s=stepStats(alive,q);
      sumV[k]+=s.v;sumD2[k]+=s.D2;
      const rat=s.v/law.rows[k].Ev;
      if(rat>maxRatio){maxRatio=rat;maxRatioK=k;}
      if(s.A>0){const lem=s.maxdev/Math.sqrt(s.A/q);if(lem>maxLemma)maxLemma=lem;}
      if(f[k]*s.maxdev>maxfDev)maxfDev=f[k]*s.maxdev;
      let t=1;const mk=mom[k];
      for(let m=1;m<=momMax;m++){t*=rat;mk[m]+=t;}
      const a=Math.floor(rng()*q),b=(a+q-2)%q;
      const next=[];
      for(let i=0;i<alive.length;i++){const r=alive[i],mm=r%q;if(mm!==a&&mm!==b)next.push(r);}
      alive=next;
    }
    const S=alive.length;
    sumS+=S;sumS2+=S*S;if(S===0)zeros++;if(S<minS)minS=S;
  }
  // per-step stats
  let maxAbsZ=0,maxRel=0,cMax=0,cMaxK=-1,sMax=0;
  const cArr=new Float64Array(K),m1Arr=new Float64Array(K),sArr=new Float64Array(K);
  const rMom=[];for(let k=0;k<K;k++)rMom.push(new Float64Array(momMax+1));
  for(let k=0;k<K;k++){
    const Ev=law.rows[k].Ev,mean=sumV[k]/nRuns;
    for(let m=1;m<=momMax;m++)rMom[k][m]=mom[k][m]/nRuns;
    const m1=rMom[k][1],m2=rMom[k][2];
    m1Arr[k]=m1;sArr[k]=Math.sqrt(Math.max(0,m2-m1*m1));
    if(sArr[k]>sMax)sMax=sArr[k];
    const sd=sArr[k]*Ev;
    const z=sd>0?(mean-Ev)/(sd/Math.sqrt(nRuns)):0;
    if(Math.abs(z)>maxAbsZ)maxAbsZ=Math.abs(z);
    const rel=Math.abs(mean/Ev-1);if(rel>maxRel)maxRel=rel;
    let ck=0;
    for(let m=2;m<=momMax;m++){const r=Math.pow(rMom[k][m]/FACT[m],1/m);if(r>ck)ck=r;}
    cArr[k]=ck;if(ck>cMax){cMax=ck;cMaxK=k;}
  }
  const meanS=sumS/nRuns,varS=sumS2/nRuns-meanS*meanS;
  return {nRuns,momMax,sumV,rMom,m1Arr,sArr,sMax,maxAbsZ,maxRel,cArr,cMax,cMaxK,
          maxRatio,maxRatioK,maxLemma,maxfDev,meanS,varS,zeros,minS};
}

// ---------------------------- section D --------------------------------------
function chainAnalysis(L,law,f,anch,mc,cUse){
  const rows=law.rows,K=rows.length,E=law.EAK,VarS=law.VarS;
  const cheb=VarS/(E*E);
  const mA=Math.max(...rows.map((r,k)=>f[k]*Math.sqrt(r.q*r.Ev)));
  const S1=rows.reduce((a,r,k)=>a+f[k]*Math.sqrt(r.Ev),0);
  const mB=Math.max(...rows.map((r,k)=>Math.sqrt(r.q*f[k]*Math.sqrt(r.Ev))));
  const freedman=(V,M)=>Math.exp(-E*E/(2*(V+M*E/3)));
  // Route A: uniform theta, first-moment Markov (fully rigorous TODAY)
  let bestA=null;
  for(let i=0;i<=300;i++){const th=Math.pow(10,i/20);
    const tot=freedman(th*VarS,Math.sqrt(th)*mA)+Math.min(1,K/th);
    if(!bestA||tot<bestA.tot)bestA={tot,th};}
  // Route B: variance-optimal allocation tau_k ~ sqrt(E v_k)/f_k (rigorous)
  let bestB=null;
  for(let i=0;i<=300;i++){const V=VarS*Math.pow(10,i/20);
    const M=Math.sqrt(V/S1)*mB;
    const tot=freedman(V,M)+Math.min(1,S1*S1/V);
    if(!bestB||tot<bestB.tot)bestB={tot,V};}
  // moment ladder: per-step tails E[(v/Ev)^m] <= m! c^m assumed to order mMax
  function bestL(c,mMax){
    let best=-Infinity,bTh=0;
    for(let i=0;i<=440;i++){const th=Math.pow(10,i/40);
      let term=1,mn=1;
      for(let m=1;m<=mMax;m++){term*=m*c/th;if(term<mn)mn=term;if(term>1e9)break;}
      const tot=freedman(th*VarS,Math.sqrt(th)*mA)+Math.min(1,K*mn);
      const Lx=-Math.log(tot);
      if(Lx>best){best=Lx;bTh=th;}}
    return {L:best,th:bTh};
  }
  console.log(`D. the chain at @${L.x}:  E=${f2(E)}  Var(S)=${f2(VarS)}  Chebyshev=${ex2(cheb)}`);
  console.log(`   bridge scales: mA=max f*sqrt(q*Ev)=${f2(mA)}  (vs anchored M_emp=max f*maxdev=${f2(anch.Memp)}, MC ensemble max f*maxdev=${f2(mc.maxfDev)})`);
  const ceil=E*E/(2*(VarS+mA*E/3));
  console.log(`   L2-BRIDGE CEILING (theta=1, PERFECT l2 concentration): e^-${ceil.toFixed(1)} -- no l2-only lemma can beat this`);
  console.log(`   UNCONDITIONAL (1st-moment Markov + union + Freedman):`);
  console.log(`     route A (uniform theta): best total=${ex2(bestA.tot)} at theta=${f2(bestA.th)}`);
  console.log(`     route B (optimal alloc): best total=${ex2(bestB.tot)} at V*=${f2(bestB.V)}`);
  console.log(`     verdict vs Chebyshev ${ex2(cheb)}: ${Math.min(bestA.tot,bestB.tot)<cheb?'BEATS':'LOSES'} (factor ${(Math.min(bestA.tot,bestB.tot)/cheb).toExponential(1)})`);
  const ladder=[2,4,8,16,32,1000].map(mM=>({mM,r:bestL(cUse,mM)}));
  console.log(`   MOMENT LADDER (if E[(v_k/Ev_k)^m] <= m! c^m held ensemble-wide, c=${f3(cUse)} = measured):`);
  console.log(`     `+ladder.map(o=>`m<=${o.mM===1000?'inf':o.mM}: e^-${o.r.L.toFixed(1)}`).join('  '));
  // measured-tail variants (calibration models, not theorems):
  // (a) raw measured moments per step, orders 2..momMax
  {let best=-Infinity,bTh=0;
   for(let i=0;i<=440;i++){const th=Math.pow(10,i/40);
     let fail=0;
     for(let k=0;k<K;k++){
       let mn=1;for(let m=2;m<=mc.momMax;m++){const t=mc.rMom[k][m]/Math.pow(th,m);if(t<mn)mn=t;}
       fail+=mn;}
     const tot=freedman(th*VarS,Math.sqrt(th)*mA)+Math.min(1,fail);
     const Lx=-Math.log(tot);if(Lx>best){best=Lx;bTh=th;}}
   console.log(`   MEASURED-MOMENT ladder (raw MC moments m<=${mc.momMax}, per step): e^-${best.toFixed(1)} at theta=${f2(bTh)}`);}
  // (b) sub-Gaussian model with measured per-step relative sd s_k
  {let best=-Infinity,bTh=0;
   for(let i=0;i<=440;i++){const th=Math.pow(10,i/40);
     let fail=0;
     for(let k=0;k<K;k++){
       const t=th-mc.m1Arr[k],s=mc.sArr[k];
       if(s<=1e-9){fail+=(t>0?0:1);continue;}          // deterministic step (k=1)
       fail+=(t<=0)?1:Math.exp(-t*t/(2*s*s));}
     const tot=freedman(th*VarS,Math.sqrt(th)*mA)+Math.min(1,fail);
     const Lx=-Math.log(tot);if(Lx>best){best=Lx;bTh=th;}}
   console.log(`   SUB-GAUSSIAN model (measured s_k, max s=${f3(mc.sMax)}): e^-${best.toFixed(1)} at theta=${f2(bTh)}  (if P(v>th*Ev)<=exp(-(th-1)^2/2s^2) held)`);}
  // what c would e^-50 / e^-311 need (full sub-exponential ladder)
  const need=[50,100,311].map(tgt=>{
    let cN=null;
    for(let i=0;i<=120;i++){const c=Math.pow(10,-i/15);
      if(bestL(c,2000).L>=tgt){cN=c;break;}}
    return {tgt,cN};
  });
  console.log(`   required Gamma-scale c for target exponents: `+
    need.map(o=>`e^-${o.tgt}: c<=${o.cN?o.cN.toExponential(1):'unreachable (above L2 ceiling)'}`).join('  '));
  // the l-infinity dividend: hypothetical Freedman with true maxdev-scale M
  const Ms=[anch.Memp,2*anch.Memp];
  const lines=[];
  for(const th of [1,2,4])for(const M of Ms)
    lines.push(`th=${th},M=${f2(M)}: e^-${(E*E/(2*(th*VarS+M*E/3))).toFixed(1)}`);
  console.log(`   L-INFINITY DIVIDEND (NOT a theorem -- exponent if v_k<=th*E[v_k] AND f*maxdev<=M held):`);
  console.log(`     `+lines.join('  '));
  return {cheb,bestA,bestB,mA};
}

// ================================== RUN =======================================
const NATAL5={11:{E:39.27,V:10.06},13:{E:304.28,V:91.13},17:{E:3245.51,V:1060.54}}; // full window-rotation ensemble (natal5-variance.txt)
const MCCFG={11:{n:200000,mom:8},13:{n:10000,mom:8},17:{n:400,mom:4}};

for(const x of [11,13,17]){
  const L=buildLevel(x);
  const {W,N,scour}=L;
  const K=scour.length;
  const f=new Array(K);{let acc=1;for(let k=K-1;k>=0;k--){f[k]=acc;acc*=1-2/scour[k];}}
  console.log('='.repeat(78));
  console.log(`@${x}: W=${W}  N=${N}  scour ${scour[0]}..${scour[K-1]} (${K} primes)`);

  // ---- A
  const anch=anchoredMarch(L,f);
  console.log(`A. LEMMA 1 identity v=(2/q)(D2+R2): max rel err ${anch.maxIdErr.toExponential(1)} over ${K} anchored steps`);
  console.log(`   LEMMA 2 bridge |e|<=sqrt(q v): holds at every step; max |e|/sqrt(qv)=${f3(anch.maxBridge)} (how much of the budget the anchored path ever uses)`);
  console.log(`   anchored final=${anch.final}; anchored M_emp=max f*maxdev=${f2(anch.Memp)}`);

  // ---- B
  const rowsB=scour.map(q=>{const s=stepStats(L.natal,q);
    return {q,D2:s.D2,R2:s.R2,v1:(2/q)*(s.D2+s.R2),maxXdev:s.maxXdev};});
  const dftQ=x===11?scour:(x===13?[17,53,173]:[19,101,709]);
  for(const q of dftQ){
    const d2=d2ViaDFT(L.natal,q);
    assertClose(d2,rowsB.find(r=>r.q===q).D2,1e-8,`Parseval q=${q}`);
  }
  console.log(`B. LEMMA 3 Parseval D2=(1/q)sum|G|^2 verified at q in {${dftQ.join(',')}}`);
  if(x<=13){
    const err=checkCd(L);
    assert(err===0,'C(d) factorization');
    console.log(`   LEMMA 4 J5 factorization C(d)=c30*prod(p-4+rho): verified for ALL ${W} lags (max err 0)`);
  }
  const absS=buildAbsS(L);
  const certQ=x===17?[19,23,29,101]:scour;
  const certRows=[];
  for(const q of certQ){
    const c=certBound(L,absS,q);
    const rb=rowsB.find(r=>r.q===q);
    assert(c.l2>=rb.D2-1e-6,`cert l2 valid q=${q}`);
    assert(c.linf>=rb.maxXdev-1e-9,`cert linf valid q=${q}`);
    certRows.push({q,D2:rb.D2,cert:c.l2,linf:rb.maxXdev,certInf:c.linf});
  }
  console.log(`   step-1 discrepancy of the NATAL set (flatness = D2/(N(1-1/q)); multinomial=1):`);
  console.log(`     q   |   D2     flat  |  v1/vbin |  certL2/D2  certLinf/trueLinf`);
  const showB=certRows.filter((r,i)=>i<4||i===certRows.length-1);
  for(const r of showB){
    const rb=rowsB.find(z=>z.q===r.q);
    const vbin=N*(2/r.q)*(1-2/r.q);
    console.log(`   ${String(r.q).padStart(4)} | ${r.D2.toFixed(1).padStart(7)}  ${f3(r.D2/(N*(1-1/r.q)))} |  ${f3(rb.v1/vbin)}   |  ${f2(r.cert/r.D2).padStart(7)}      ${f2(r.certInf/Math.max(r.linf,1e-9))}`);
  }
  const flatAll=rowsB.map(r=>r.D2/(N*(1-1/r.q)));
  console.log(`   flatness over ALL ${K} scour q: min=${f3(Math.min(...flatAll))} max=${f3(Math.max(...flatAll))}  (natal set is sub-multinomial-flat at every q)`);

  // ---- C
  const law=evolutionLaw(L,f);
  assertClose(law.rows[0].ED2,rowsB[0].D2,1e-9,'law k=1 D2');
  assertClose(law.rows[0].Ev,rowsB[0].v1,1e-9,'law k=1 v');
  assertClose(law.VarS,law.VarSum,1e-8,'Var(S) pair-formula = trajectory formula');
  console.log(`C. THEOREM 5 evolution law (${law.nAct} active lags): k=1 matches exact natal values;`);
  console.log(`   Var(S): endpoint pair formula ${law.VarS.toFixed(4)} = trajectory sum f^2 E[v] ${law.VarSum.toFixed(4)}  (identity to ${(Math.abs(law.VarS-law.VarSum)).toExponential(1)})`);
  console.log(`   STRIKE-ensemble Var(S)=${f2(law.VarS)} vs full window-rotation Var=${f2(NATAL5[x].V)} (natal5-variance): ratio ${f4(law.VarS/NATAL5[x].V)} -- distinct ensembles (cap-07 note)`);
  console.log(`   E[S]=${f2(law.EAK)} (must equal N*prod(1-2/q)=${f2(NATAL5[x].E)})  strike-Chebyshev=${ex2(law.VarS/(law.EAK*law.EAK))}`);
  const cfg=MCCFG[x];
  const mc=mcVerify(L,law,f,cfg.n,20260814+x,cfg.mom);
  console.log(`   MC over ${cfg.n} random-rotation marches: mean S=${f2(mc.meanS)} (law ${f2(law.EAK)})  var S=${f2(mc.varS)} (law ${f2(law.VarS)})  min S=${mc.minS}  zeros=${mc.zeros}`);
  console.log(`   per-step E[v_k] law vs MC: max |mean/law-1|=${f4(mc.maxRel)}  max sampling z=${f2(mc.maxAbsZ)}  (${K} steps)`);
  console.log(`      k    q  |    E[A]    E[D2]  D2/A |   E[v]   /vbin | anch v  anch/E[v] | c_k`);
  const show=k=>x===11?true:(x===13?(k<8||k%5===0||k>=K-2):(k<8||k%10===0||k>=K-2));
  for(let k=0;k<K;k++){
    if(!show(k))continue;
    const r=law.rows[k],a=anch.rows[k];
    console.log(`   ${String(k+1).padStart(4)} ${String(r.q).padStart(4)} | ${r.EA.toFixed(1).padStart(8)} ${r.ED2.toFixed(1).padStart(8)}  ${f3(r.ED2/r.EA)} | ${r.Ev.toFixed(2).padStart(7)}  ${f3(r.Ev/r.vbin)} | ${a.v.toFixed(2).padStart(7)}  ${f3(a.v/r.Ev).padStart(6)} | ${f3(mc.cArr[k])}`);
  }
  const anchRatios=law.rows.map((r,k)=>anch.rows[k].v/r.Ev);
  console.log(`   anchored quietness: anch v / E[v] mean=${f3(anchRatios.reduce((a,b)=>a+b,0)/K)} min=${f3(Math.min(...anchRatios))} max=${f3(Math.max(...anchRatios))}`);
  console.log(`   ensemble path extremes over ALL MC steps: max v/E[v]=${f2(mc.maxRatio)} (step ${mc.maxRatioK+1}); max pair-class dev / sqrt(A/q) = ${f2(mc.maxLemma)}`);
  console.log(`   measured Gamma-scale c (E[(v/Ev)^m]<=m!c^m fit, m<=${cfg.mom}): max over steps = ${f3(mc.cMax)} (step ${mc.cMaxK+1})`);

  // ---- D
  chainAnalysis(L,law,f,anch,mc,Math.max(mc.cMax,0.3));
  console.log(`[t=${((Date.now()-T0)/1000).toFixed(1)}s]  cumulative machine checks passed: ${CHECKS}`);
}
console.log('\nALL CHECKS PASSED: '+CHECKS);
console.log('DONE.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-14-discrepancy-lemma.js
//   invocation:  node research/natal-cap-14-discrepancy-lemma.js
//   code-sha256: a9f137adb13e35850b4a3a636434c498e8446370e40a6c7a310cb51f91e80e6e
//   out-sha256:  825a18b2b8eb22a1f399a93c998ee6e9c1bc71a81977b1aa56d0d2519bf90e12
//   body-lines:  167
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     7.2 s
// ============================================================================
// ==============================================================================
// @11: W=2310  N=90  scour 13..47 (10 primes)
// A. LEMMA 1 identity v=(2/q)(D2+R2): max rel err 9.2e-16 over 10 anchored steps
//    LEMMA 2 bridge |e|<=sqrt(q v): holds at every step; max |e|/sqrt(qv)=0.228 (how much of the budget the anchored path ever uses)
//    anchored final=45; anchored M_emp=max f*maxdev=3.05
// B. LEMMA 3 Parseval D2=(1/q)sum|G|^2 verified at q in {13,17,19,23,29,31,37,41,43,47}
//    LEMMA 4 J5 factorization C(d)=c30*prod(p-4+rho): verified for ALL 2310 lags (max err 0)
//    step-1 discrepancy of the NATAL set (flatness = D2/(N(1-1/q)); multinomial=1):
//      q   |   D2     flat  |  v1/vbin |  certL2/D2  certLinf/trueLinf
//      13 |     6.9  0.083 |  0.129   |    36.07      13.69
//      17 |    13.5  0.160 |  0.076   |    21.24      8.92
//      19 |    17.7  0.207 |  0.315   |    16.54      8.82
//      23 |    11.8  0.137 |  0.081   |    24.09      8.07
//      47 |    29.7  0.337 |  0.433   |    10.64      7.74
//    flatness over ALL 10 scour q: min=0.083 max=0.542  (natal set is sub-multinomial-flat at every q)
// C. THEOREM 5 evolution law (224 active lags): k=1 matches exact natal values;
//    Var(S): endpoint pair formula 9.6305 = trajectory sum f^2 E[v] 9.6305  (identity to 1.9e-12)
//    STRIKE-ensemble Var(S)=9.63 vs full window-rotation Var=10.06 (natal5-variance): ratio 0.9573 -- distinct ensembles (cap-07 note)
//    E[S]=39.27 (must equal N*prod(1-2/q)=39.27)  strike-Chebyshev=6.24e-3
//    MC over 200000 random-rotation marches: mean S=39.27 (law 39.27)  var S=9.63 (law 9.63)  min S=25  zeros=0
//    per-step E[v_k] law vs MC: max |mean/law-1|=0.0006  max sampling z=0.99  (10 steps)
//       k    q  |    E[A]    E[D2]  D2/A |   E[v]   /vbin | anch v  anch/E[v] | c_k
//       1   13 |     90.0      6.9  0.077 |    1.51  0.129 |    1.51   1.000 | 0.707
//       2   17 |     76.2     15.5  0.204 |    1.29  0.163 |    1.11   0.867 | 0.749
//       3   19 |     67.2     22.1  0.328 |    2.56  0.405 |    2.13   0.833 | 0.742
//       4   23 |     60.1     21.9  0.364 |    1.82  0.381 |    1.13   0.620 | 0.748
//       5   29 |     54.9     23.8  0.433 |    1.59  0.451 |    1.47   0.928 | 0.742
//       6   31 |     51.1     27.1  0.530 |    1.70  0.550 |    1.88   1.109 | 0.734
//       7   37 |     47.8     26.0  0.545 |    1.36  0.556 |    1.42   1.043 | 0.729
//       8   41 |     45.2     28.0  0.619 |    1.34  0.638 |    0.86   0.641 | 0.726
//       9   43 |     43.0     32.6  0.757 |    1.50  0.788 |    1.59   1.060 | 0.720
//      10   47 |     41.0     26.8  0.654 |    1.16  0.696 |    1.44   1.243 | 0.722
//    anchored quietness: anch v / E[v] mean=0.934 min=0.620 max=1.243
//    ensemble path extremes over ALL MC steps: max v/E[v]=2.51 (step 5); max pair-class dev / sqrt(A/q) = 5.76
//    measured Gamma-scale c (E[(v/Ev)^m]<=m!c^m fit, m<=8): max over steps = 0.749 (step 2)
// D. the chain at @11:  E=39.27  Var(S)=9.63  Chebyshev=6.24e-3
//    bridge scales: mA=max f*sqrt(q*Ev)=7.70  (vs anchored M_emp=max f*maxdev=3.05, MC ensemble max f*maxdev=4.70)
//    L2-BRIDGE CEILING (theta=1, PERFECT l2 concentration): e^-7.0 -- no l2-only lemma can beat this
//    UNCONDITIONAL (1st-moment Markov + union + Freedman):
//      route A (uniform theta): best total=7.20e-1 at theta=39.81
//      route B (optimal alloc): best total=6.95e-1 at V*=383.40
//      verdict vs Chebyshev 6.24e-3: LOSES (factor 1.1e+2)
//    MOMENT LADDER (if E[(v_k/Ev_k)^m] <= m! c^m held ensemble-wide, c=0.749 = measured):
//      m<=2: e^-1.3  m<=4: e^-2.0  m<=8: e^-2.3  m<=16: e^-2.3  m<=32: e^-2.3  m<=inf: e^-2.3
//    MEASURED-MOMENT ladder (raw MC moments m<=8, per step): e^-3.5 at theta=3.16
//    SUB-GAUSSIAN model (measured s_k, max s=0.349): e^-4.3 at theta=2.37  (if P(v>th*Ev)<=exp(-(th-1)^2/2s^2) held)
//    required Gamma-scale c for target exponents: e^-50: c<=unreachable (above L2 ceiling)  e^-100: c<=unreachable (above L2 ceiling)  e^-311: c<=unreachable (above L2 ceiling)
//    L-INFINITY DIVIDEND (NOT a theorem -- exponent if v_k<=th*E[v_k] AND f*maxdev<=M held):
//      th=1,M=3.05: e^-15.6  th=1,M=6.09: e^-8.6  th=2,M=3.05: e^-13.0  th=2,M=6.09: e^-7.8  th=4,M=3.05: e^-9.8  th=4,M=6.09: e^-6.5
// [t=1.6s]  cumulative machine checks passed: 555
// ==============================================================================
// @13: W=30030  N=990  scour 17..173 (34 primes)
// A. LEMMA 1 identity v=(2/q)(D2+R2): max rel err 2.7e-15 over 34 anchored steps
//    LEMMA 2 bridge |e|<=sqrt(q v): holds at every step; max |e|/sqrt(qv)=0.422 (how much of the budget the anchored path ever uses)
//    anchored final=307; anchored M_emp=max f*maxdev=5.92
// B. LEMMA 3 Parseval D2=(1/q)sum|G|^2 verified at q in {17,53,173}
//    LEMMA 4 J5 factorization C(d)=c30*prod(p-4+rho): verified for ALL 30030 lags (max err 0)
//    step-1 discrepancy of the NATAL set (flatness = D2/(N(1-1/q)); multinomial=1):
//      q   |   D2     flat  |  v1/vbin |  certL2/D2  certLinf/trueLinf
//      17 |    85.1  0.091 |  0.070   |    19.80      8.60
//      19 |    35.8  0.038 |  0.063   |    42.20      16.81
//      23 |    51.0  0.054 |  0.040   |    36.59      12.44
//      29 |    71.4  0.075 |  0.068   |    25.13      9.15
//     173 |   158.7  0.161 |  0.152   |    12.80      12.33
//    flatness over ALL 34 scour q: min=0.038 max=0.274  (natal set is sub-multinomial-flat at every q)
// C. THEOREM 5 evolution law (2992 active lags): k=1 matches exact natal values;
//    Var(S): endpoint pair formula 90.1995 = trajectory sum f^2 E[v] 90.1995  (identity to 1.9e-10)
//    STRIKE-ensemble Var(S)=90.20 vs full window-rotation Var=91.13 (natal5-variance): ratio 0.9898 -- distinct ensembles (cap-07 note)
//    E[S]=304.28 (must equal N*prod(1-2/q)=304.28)  strike-Chebyshev=9.74e-4
//    MC over 10000 random-rotation marches: mean S=304.29 (law 304.28)  var S=91.19 (law 90.20)  min S=267  zeros=0
//    per-step E[v_k] law vs MC: max |mean/law-1|=0.0050  max sampling z=2.30  (34 steps)
//       k    q  |    E[A]    E[D2]  D2/A |   E[v]   /vbin | anch v  anch/E[v] | c_k
//       1   17 |    990.0     85.1  0.086 |    7.19  0.070 |    7.19   1.000 | 0.707
//       2   19 |    873.5     98.7  0.113 |   16.51  0.201 |   22.09   1.339 | 0.784
//       3   23 |    781.6     89.2  0.114 |    5.95  0.096 |    4.98   0.837 | 0.735
//       4   29 |    713.6    111.0  0.156 |    7.06  0.154 |    8.39   1.187 | 0.737
//       5   31 |    664.4    145.3  0.219 |    9.01  0.225 |    7.94   0.881 | 0.743
//       6   37 |    621.5    167.0  0.269 |    8.73  0.275 |    7.82   0.896 | 0.734
//       7   41 |    587.9    160.3  0.273 |    7.67  0.281 |    5.81   0.758 | 0.730
//       8   43 |    559.3    197.2  0.353 |    9.13  0.368 |   12.76   1.398 | 0.728
//      11   59 |    491.3    223.7  0.455 |    7.51  0.467 |    6.89   0.918 | 0.722
//      16   79 |    421.0    213.1  0.506 |    5.33  0.513 |    4.81   0.902 | 0.721
//      21  103 |    375.8    225.4  0.600 |    4.36  0.610 |    4.87   1.117 | 0.717
//      26  131 |    343.2    217.1  0.633 |    3.19  0.618 |    4.04   1.267 | 0.716
//      31  157 |    319.5    221.9  0.695 |    2.78  0.692 |    2.84   1.021 | 0.713
//      33  167 |    311.6    217.4  0.698 |    2.60  0.705 |    2.96   1.138 | 0.714
//      34  173 |    307.8    214.0  0.695 |    2.49  0.708 |    2.08   0.837 | 0.712
//    anchored quietness: anch v / E[v] mean=0.986 min=0.691 max=1.398
//    ensemble path extremes over ALL MC steps: max v/E[v]=2.91 (step 6); max pair-class dev / sqrt(A/q) = 6.46
//    measured Gamma-scale c (E[(v/Ev)^m]<=m!c^m fit, m<=8): max over steps = 0.784 (step 2)
// D. the chain at @13:  E=304.28  Var(S)=90.20  Chebyshev=9.74e-4
//    bridge scales: mA=max f*sqrt(q*Ev)=20.75  (vs anchored M_emp=max f*maxdev=5.92, MC ensemble max f*maxdev=9.17)
//    L2-BRIDGE CEILING (theta=1, PERFECT l2 concentration): e^-21.1 -- no l2-only lemma can beat this
//    UNCONDITIONAL (1st-moment Markov + union + Freedman):
//      route A (uniform theta): best total=5.34e-1 at theta=141.25
//      route B (optimal alloc): best total=5.35e-1 at V*=12741.02
//      verdict vs Chebyshev 9.74e-4: LOSES (factor 5.5e+2)
//    MOMENT LADDER (if E[(v_k/Ev_k)^m] <= m! c^m held ensemble-wide, c=0.784 = measured):
//      m<=2: e^-2.5  m<=4: e^-4.3  m<=8: e^-5.5  m<=16: e^-5.8  m<=32: e^-5.8  m<=inf: e^-5.8
//    MEASURED-MOMENT ladder (raw MC moments m<=8, per step): e^-8.0 at theta=5.62
//    SUB-GAUSSIAN model (measured s_k, max s=0.489): e^-10.7 at theta=3.55  (if P(v>th*Ev)<=exp(-(th-1)^2/2s^2) held)
//    required Gamma-scale c for target exponents: e^-50: c<=unreachable (above L2 ceiling)  e^-100: c<=unreachable (above L2 ceiling)  e^-311: c<=unreachable (above L2 ceiling)
//    L-INFINITY DIVIDEND (NOT a theorem -- exponent if v_k<=th*E[v_k] AND f*maxdev<=M held):
//      th=1,M=5.92: e^-67.0  th=1,M=11.85: e^-35.8  th=2,M=5.92: e^-59.3  th=2,M=11.85: e^-33.5  th=4,M=5.92: e^-48.1  th=4,M=11.85: e^-29.6
// [t=4.2s]  cumulative machine checks passed: 1199
// ==============================================================================
// @17: W=510510  N=14850  scour 19..709 (120 primes)
// A. LEMMA 1 identity v=(2/q)(D2+R2): max rel err 6.2e-15 over 120 anchored steps
//    LEMMA 2 bridge |e|<=sqrt(q v): holds at every step; max |e|/sqrt(qv)=0.326 (how much of the budget the anchored path ever uses)
//    anchored final=3099; anchored M_emp=max f*maxdev=14.67
// B. LEMMA 3 Parseval D2=(1/q)sum|G|^2 verified at q in {19,101,709}
//    step-1 discrepancy of the NATAL set (flatness = D2/(N(1-1/q)); multinomial=1):
//      q   |   D2     flat  |  v1/vbin |  certL2/D2  certLinf/trueLinf
//      19 |   226.6  0.016 |  0.030   |    40.08      15.34
//      23 |   511.2  0.036 |  0.005   |    20.83      12.37
//      29 |   243.9  0.017 |  0.027   |    40.27      17.59
//     101 |   712.9  0.048 |  0.052   |    16.18      15.99
//    flatness over ALL 120 scour q: min=0.015 max=0.222  (natal set is sub-multinomial-flat at every q)
// C. THEOREM 5 evolution law (51032 active lags): k=1 matches exact natal values;
//    Var(S): endpoint pair formula 1062.3544 = trajectory sum f^2 E[v] 1062.3544  (identity to 4.4e-8)
//    STRIKE-ensemble Var(S)=1062.35 vs full window-rotation Var=1060.54 (natal5-variance): ratio 1.0017 -- distinct ensembles (cap-07 note)
//    E[S]=3245.51 (must equal N*prod(1-2/q)=3245.51)  strike-Chebyshev=1.01e-4
//    MC over 400 random-rotation marches: mean S=3244.38 (law 3245.51)  var S=988.45 (law 1062.35)  min S=3145  zeros=0
//    per-step E[v_k] law vs MC: max |mean/law-1|=0.0255  max sampling z=2.85  (120 steps)
//       k    q  |    E[A]    E[D2]  D2/A |   E[v]   /vbin | anch v  anch/E[v] | c_k
//       1   19 |  14850.0    226.6  0.015 |   41.71  0.030 |   41.71   1.000 | 0.707
//       2   23 |  13286.8    554.2  0.042 |   17.76  0.017 |   17.80   1.002 | 0.712
//       3   29 |  12131.5    521.7  0.043 |   47.69  0.061 |   32.04   0.672 | 0.760
//       4   31 |  11294.8    656.4  0.058 |   28.63  0.042 |   20.61   0.720 | 0.733
//       5   37 |  10566.1    863.4  0.082 |   42.73  0.079 |   44.40   1.039 | 0.739
//       6   41 |   9995.0    971.6  0.097 |   46.67  0.101 |   52.13   1.117 | 0.722
//       7   43 |   9507.4   1132.4  0.119 |   43.63  0.103 |   56.74   1.300 | 0.729
//       8   47 |   9065.2   1310.2  0.145 |   59.00  0.160 |   58.42   0.990 | 0.723
//      11   61 |   8068.8   1638.2  0.203 |   52.27  0.204 |   56.64   1.084 | 0.735
//      21  107 |   6263.9   2161.9  0.345 |   40.44  0.352 |   40.55   1.003 | 0.716
//      31  163 |   5362.5   2428.4  0.453 |   30.46  0.469 |   35.94   1.180 | 0.711
//      41  223 |   4808.1   2509.9  0.522 |   22.24  0.520 |   23.42   1.053 | 0.710
//      51  271 |   4425.6   2528.2  0.571 |   18.70  0.577 |   18.71   1.001 | 0.710
//      61  337 |   4136.6   2531.7  0.612 |   14.97  0.613 |   13.47   0.900 | 0.708
//      71  397 |   3914.2   2588.2  0.661 |   13.14  0.670 |   12.88   0.980 | 0.710
//      81  457 |   3733.2   2469.2  0.661 |   10.78  0.662 |    9.78   0.908 | 0.712
//      91  521 |   3580.8   2491.4  0.696 |    9.74  0.711 |    8.53   0.876 | 0.707
//     101  593 |   3453.8   2517.8  0.729 |    8.49  0.732 |    7.55   0.888 | 0.707
//     111  647 |   3343.3   2432.8  0.728 |    7.61  0.738 |    7.66   1.006 | 0.709
//     119  701 |   3264.0   2428.9  0.744 |    6.85  0.738 |    7.42   1.082 | 0.711
//     120  709 |   3254.7   2367.9  0.728 |    6.61  0.722 |    6.35   0.960 | 0.705
//    anchored quietness: anch v / E[v] mean=0.981 min=0.672 max=1.408
//    ensemble path extremes over ALL MC steps: max v/E[v]=1.99 (step 3); max pair-class dev / sqrt(A/q) = 7.34
//    measured Gamma-scale c (E[(v/Ev)^m]<=m!c^m fit, m<=4): max over steps = 0.760 (step 3)
// D. the chain at @17:  E=3245.51  Var(S)=1062.35  Chebyshev=1.01e-4
//    bridge scales: mA=max f*sqrt(q*Ev)=70.01  (vs anchored M_emp=max f*maxdev=14.67, MC ensemble max f*maxdev=17.32)
//    L2-BRIDGE CEILING (theta=1, PERFECT l2 concentration): e^-68.6 -- no l2-only lemma can beat this
//    UNCONDITIONAL (1st-moment Markov + union + Freedman):
//      route A (uniform theta): best total=3.19e-1 at theta=707.95
//      route B (optimal alloc): best total=3.28e-1 at V*=670300.31
//      verdict vs Chebyshev 1.01e-4: LOSES (factor 3.2e+3)
//    MOMENT LADDER (if E[(v_k/Ev_k)^m] <= m! c^m held ensemble-wide, c=0.760 = measured):
//      m<=2: e^-4.3  m<=4: e^-8.2  m<=8: e^-12.1  m<=16: e^-14.7  m<=32: e^-15.1  m<=inf: e^-15.1
//    MEASURED-MOMENT ladder (raw MC moments m<=4, per step): e^-9.3 at theta=39.81
//    SUB-GAUSSIAN model (measured s_k, max s=0.322): e^-34.6 at theta=3.76  (if P(v>th*Ev)<=exp(-(th-1)^2/2s^2) held)
//    required Gamma-scale c for target exponents: e^-50: c<=2.9e-2  e^-100: c<=unreachable (above L2 ceiling)  e^-311: c<=unreachable (above L2 ceiling)
//    L-INFINITY DIVIDEND (NOT a theorem -- exponent if v_k<=th*E[v_k] AND f*maxdev<=M held):
//      th=1,M=14.67: e^-311.1  th=1,M=29.33: e^-160.6  th=2,M=14.67: e^-292.7  th=2,M=29.33: e^-155.6  th=4,M=14.67: e^-261.8  th=4,M=29.33: e^-146.4
// [t=7.1s]  cumulative machine checks passed: 1954
//
// ALL CHECKS PASSED: 1954
// DONE.
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. THE LEMMA IS NOW AN IDENTITY PLUS A TAIL. Lemma 1 (proven, one line,
//    verified to 1e-14 at all 164 anchored steps): the conditional variance
//    of a Scour step is EXACTLY (2/q)(D2 + R2) — a pure l2-flatness
//    functional of the alive set mod the upcoming prime. Lemma 2 (proven):
//    the realized increment is pathwise bounded by the PREDICTABLE quantity
//    sqrt(q*v_q) — max^2 <= sum-of-squares, nothing more. So "discrepancy
//    lemma" questions split cleanly into (i) the LAW of v_q (solved below,
//    in mean), (ii) its upper TAIL (the open part), and (iii) the l-infinity
//    loss inside Lemma 2's bridge (the surprise cost, reading 7).
//
// 2. THEOREM 5 CLOSES THE MEAN-SQUARE QUESTION EXACTLY — the session's main
//    positive result. Over the rotation ensemble every single-slot survival
//    is exactly prod(1-2/q_j) — no genericity conditions — and every pair
//    survival is exactly prod(1-(4-rho)/q_j) with the SAME rho = 2/1/0 comb
//    (d = 0 / +-2 / other mod q_j) that natal5-variance uses mod the wheel
//    primes. Feeding the natal difference histogram (Lemma 4's factored
//    C(d), verified at ALL 32,340 lags across @11/@13) through these
//    products gives E[D2_k] and E[v_k] IN CLOSED FORM at every step of the
//    march. Verified three independent ways: (a) k=1 reproduces the exact
//    natal-set values to 1e-9; (b) 210,400 Monte-Carlo marches match all
//    164 per-step means (max |MC/law - 1| = 0.0006/0.005/0.026, max sampling
//    z = 2.85 — pure noise); (c) the trajectory sum f_k^2 E[v_k] equals the
//    endpoint pair-formula Var(S) to 4e-8. The noise budget of the march is
//    no longer a measurement; it is a theorem with the census plugged in.
//
// 3. CORRECTION TO OUR OWN RECORD (house rule). cap-07 labeled 10.06 / 91.13
//    / 1060.54 "exact rotation-ensemble endpoint moments (same ensemble)".
//    They are NOT the march's ensemble: natal5-variance rotates the WHOLE
//    window (wheel primes included); the march rotates only the strike
//    classes over the anchored natal set. The strike-ensemble variances are
//    9.6305 / 90.1995 / 1062.3544 — ratios 0.957 / 0.990 / 1.0017, converging
//    to 1 and crossing it at @17. All of cap-07's qualitative readings
//    survive; its @11 "near-uncorrelated check" gap (Vrecon 9.10 vs "10.06")
//    was half ensemble-mismatch (correct target: 9.63). Means agree exactly
//    in both ensembles, so no E or z-drift conclusion changes.
//
// 4. THE ALIVE SET RANDOMIZES ON SCHEDULE, AND THE LAW SAYS HOW FAST. The
//    natal set starts CRT-flat mod every scour prime (flatness D2/A =
//    0.015-0.22 at @17 — up to 60x flatter than multinomial), and the march
//    erodes that flatness monotonically toward the multinomial plateau:
//    E[D2]/E[A] climbs 0.015 -> 0.73 at @17 (0.08 -> 0.65 @11, 0.09 -> 0.70
//    @13), i.e. v/vbin rises exactly as cap-07 observed (0.017 -> 0.85) — but
//    now as a computed law, not a mystery. Structure decays into generic
//    noise at the rate the pair products dictate; by the tail of the march
//    the alive set is statistically indistinguishable from a random subset,
//    THE reason overlap credit (47% of strikes) behaves so CRT-honestly.
//
// 5. ANCHORED QUIETNESS, THIRD SIGHTING, WEAKENED. At the level of evolved
//    per-step conditional variances the anchored path is ensemble-TYPICAL:
//    anch v / E[v] has mean 0.93 / 0.99 / 0.98 (range 0.62-1.41) across the
//    three levels. The strong quietness cap-05 saw (0.34-0.62x) is a
//    statement about a different statistic (natal-set pair counts per
//    prime); the evolved alive set shows only a whisper of it. Consistent
//    with cap-07 reading 3: the anchored anomaly is DRIFT in e_k, not
//    suppressed noise in v_k.
//
// 6. CERTIFICATION (Lemma 3): the frequency door stays closed. The exact
//    Parseval identity D2 = (1/q) sum |G(a)|^2 holds (verified), and the
//    factored-spectrum certificate through the Z/(Wq) window kernel is
//    VALID at every tested (q, a) — but loose: certL2/D2 = 10.6-42x, growing
//    with level; l-infinity certificates 7.7-17.6x. Same disease as cap-02
//    (L1 mass ~ N^0.45 vs true ~ N^0.23). The exact collapse lives in the
//    DIFFERENCE domain (Lemma 4), which is what Theorem 5 exploits — the
//    lesson of cap-02 reading 6 ("credit the overlaps") repeated one level
//    up: count pairs, do not bound frequencies.
//
// 7. THE CHAIN, PRICED — THREE REFUTATIONS AND A RELOCATION.
//    (a) UNCONDITIONAL (Markov on the exact means + union + Freedman,
//        Prop 6 — a genuine theorem valid today): best possible totals
//        0.72 / 0.53 / 0.32. LOSES to endpoint Chebyshev by 1e2-3e3x. The
//        first-moment route is dead — Freedman's exponent degrades linearly
//        in the threshold while Markov failure improves only linearly.
//    (b) ANY FIXED MOMENT ORDER is dead too: with the measured Gamma scale
//        (c ~ 0.75) exact 2nd moments would yield e^-4.3 at @17 (worse than
//        Chebyshev's e^-9.2!), order-8 e^-12, and the FULL sub-exponential
//        ladder saturates at e^-15. Measured-tail models agree: raw MC
//        moments e^-9.3, sub-Gaussian model e^-34.6.
//    (c) THE CEILING NOBODY NOTICED: even a PERFECT l2 lemma — v_k <=
//        E[v_k] on every path, deterministically — gives only e^-68.6 at
//        @17 (e^-7.0 @11, e^-21.1 @13), because Lemma 2's bridge pays
//        sqrt(q): the increment bound becomes max f sqrt(q E[v]) = 70 where
//        the TRUE increment scale is max f*maxdev ~ 15-17. An l2-only
//        discrepancy lemma can buy at most e^-69, NOT e^-311. cap-07's
//        reading 7 must be sharpened: the hinge was never an l2 statement.
//
// 8. THE REAL HINGE IS l-INFINITY, AND IT IS MEASURED, UNIVERSAL, UNPROVEN.
//    Reconstructing cap-07's ceiling: v_k <= E[v_k] AND f*maxdev <= 14.67
//    gives e^-311.1 (their 311.37, now from the corrected ensemble variance
//    — the machinery agrees to 0.1%). The e^-311 factorizes as
//        [l2 flatness, worth <= e^-69] x [l-inf increment control, the rest].
//    The lemma, CORRECTLY STATED: on every path, every class pair satisfies
//    |Y_c - 2A/q| <= C * sqrt(A/q). Measured over ~2.4M MC step-samples:
//    C never exceeded 5.76 / 6.46 / 7.34 (@11/@13/@17) — zero violations
//    ever observed, slow growth consistent with a sqrt(log q) extreme-value
//    factor. Prove THAT (an l-infinity bound on windowed CRT patterns under
//    random dilation strikes) and Freedman delivers e^-150 to e^-300 grade;
//    prove only exponential l2 tails and the honest yield is the e^-35-69
//    zone — still a 4-7 order upgrade of the ensemble theorem's exponent
//    over Chebyshev, and perhaps fully provable: E[v_k] is now exact, so
//    only the tail of a single scalar per step is missing. (Footnote: the
//    c_k ~ 0.707 column is dominated by the m=2 term (1/2!)^(1/2) — the fit
//    measures concentration, not deep tails; sd(v/Ev) <= 0.49 everywhere.)
//
// 9. WHAT NONE OF THIS GIVES (said plainly, cap-07 reading 8 unchanged).
//    Every probability here is over the rotation ensemble; the anchored
//    tile is ONE member, measurably atypical (z = -4.5 at @17, -25.5 at
//    @19, Mertens drift toward 0.793E). Theorem 5, the corrected variances,
//    and any future e^-300 ensemble bound say NOTHING about the anchored
//    escape. What this file adds to the ANCHORED story is only structural:
//    the march's noise laws are exactly known, the anchored path obeys them
//    typically (reading 5), so the anchored problem remains 100% drift —
//    the Mertens/2C2 wall, untouched.
//
// NEXT STEP. Two concrete provable targets, in order: (i) exact E[v_k^2]
//    via 4-point correlations restricted to the q|d classes (the quadruple
//    sum collapses by CRT the same way the pair sum did; gives rigorous
//    per-step Chebyshev tails and an unconditional e^-few theorem); (ii)
//    the l-infinity lemma for the FIRST step only (natal set, deterministic
//    — max_c |Y_c - 2N/q| <= 7 sqrt(N/q) is a finite verified fact at three
//    levels; find the proof mechanism there, where there is no randomness,
//    then propagate it with the same stopping-time scaffold as Prop 6).
//
// FORWARD POINTER (2026-08-17 script sweep). Both targets were executed by
//    natal-cap-21, whose own header records that it does so. (i) E[v_k^2] is
//    now EXACT over all histories, k <= 6 at @11 and k <= 5 at @13, by DFS-DP
//    over the history space; the answer is a REFUTATION. Fed into the Prop-6
//    stopped-Freedman chain at its own optimum it still LOSES to endpoint
//    Chebyshev by 43x to 3600x at every level and in every variant, so the
//    union over K steps plus the sqrt(q) bridge is structural exactly as
//    reading 7(c) priced it, and exact second moments do not rescue it.
//    (ii) The step-1 ledger is done for every scour prime at @11..@19: the
//    true constant is C1 = 2.893 / 2.299 / 2.488 / 2.011, well inside the 7
//    quoted above and with no growth in level, while the certified
//    l2 -> l-infinity route still pays sqrt(q). Where the beyond-Chebyshev
//    gain actually lives is the ENDPOINT moment ladder (cap-21 Theorem 2 at
//    @11, natal-cap-27 at @13), not in the per-step chain.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.0255 at @17 -> the third entry 0.026 of reading 2's MC/law triple.
//   flatness max=0.222 at @17 -> the 0.22 top of reading 4's range 0.015-0.22.
//   anchored quietness min=0.620 at @11 and max=1.408 at @17 -> the range
//     0.62-1.41 of reading 5.
//   certLinf/trueLinf min 7.74 at @11 and max 17.59 at @17 -> the 7.7-17.6x
//     of reading 6.
//   sub-Gaussian max s=0.489 at @13 -> the sd(v/Ev) <= 0.49 of reading 8.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   164 anchored steps is 10 + 34 + 120, the three per-level step counts.
//   32,340 lags is 2310 at @11 plus 30030 at @13.
//   210,400 Monte-Carlo marches is 200000 + 10000 + 400.
//   The "e^-150 to e^-300 grade" of reading 8 is a rounded band over the @17
//     L-infinity dividend rows, which print e^-160.6 at M=29.33 and e^-311.1
//     at M=14.67.
//   CORRECTED 2026-08-20 (mismatch adjudication #16): reading 1 said the
//     Lemma 1 identity is "verified to 1e-15 at all 164 anchored steps" and
//     now says 1e-14 (old -> new: 1e-15 -> 1e-14). The three printed Lemma 1
//     maxima are 9.2e-16 (10 steps), 2.7e-15 (34 steps) and 6.2e-15 (120
//     steps); 10 + 34 + 120 = 164, and the worst of the three is 6.2e-15, so
//     1e-15 was a UNIFORM claim two of the three levels break. 1e-14 is the
//     uniform statement the block supports. The lemma is unaffected: it is an
//     exact identity and these are float-roundoff residuals.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   CORRECTED 2026-08-20 (mismatch adjudication #5): reading 4's "cap-07
//     observed (0.03 -> 0.85)" now reads (0.017 -> 0.85). The high end is
//     natal-cap-07-trajectory.js's "v_true/v_bin ratio: mean=0.573 min=0.017
//     max=0.853" and checks out; the low end does not. That file prints three
//     ratio rows -- min=0.129, min=0.070, min=0.017 -- and NO row has 0.03.
//     0.030 is this file's own @17 step-1 /vbin entry, which is the likely
//     source of the slip: a local figure pasted into a borrowed pair. The
//     reading's point, that v/vbin climbs across the march, is strengthened by
//     the wider true range.
//   0.34-0.62x in reading 5 is natal-cap-05-second-moment.js's V/Vrot = 0.344
//     at @11 and 0.623 at @13.
//   311.37 in reading 8 is natal-cap-07-trajectory.js, "V_emp=1047.89,
//     M_emp=14.67; exponent = 311.37".
//   -25.5 in reading 9 is natal5-variance.js's z = -25.52 at @19.
//   43x to 3600x in the forward pointer is natal-cap-21-beyond-chebyshev.js's
//     LOSES factors, printed there as x4.3e+1 and x3.6e+3.
//   C1 = 2.893 / 2.299 / 2.488 / 2.011 is that same file's step-1 ledger at
//     @11, @13, @17 and @19.
//   N^0.45 and N^0.23 in reading 6 are NATAL-CAP-CAMPAIGN.md's row for
//     natal-cap-02-fourier-budget.js. They are midpoints: cap-02 itself states
//     the ranges N^{0.4-0.5} and N^{0.2-0.26}, and no OUTPUT block prints
//     either exponent.
//
// DEFINITION / LITERATURE constants: 0.793 in reading 9 is e^{2 gamma}/4 =
//   0.79305, the Unification Law value, printed to five places by
//   natal-cap-18-at29.js.
// ---------------------------------------------------------------------------
