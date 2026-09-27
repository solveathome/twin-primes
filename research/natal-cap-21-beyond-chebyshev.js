// ============================================================================
// ATTACK 21 — BEYOND CHEBYSHEV: the first unconditional ensemble bound past
// the second moment, and the exact step-1 l-infinity ledger
// (natal-cap series, 2026-08-14; executes natal-cap-14's two named next steps)
// ============================================================================
// SETTING (cap-14). W = x#, natal set N in Z/W (|N| = N), scour primes
// x < q_1 < ... < q_K <= sqrt(W). Rotation ensemble: independent uniform
// strike classes c_j in Z/q_j; step j kills alive r with r == c_j or c_j - 2
// (mod q_j), i.e. slot r dies at step j iff c_j in K_j(r) = {r, r+2} mod q_j.
// S = |A_K| = survivors. Chebyshev endpoint (cap-14, exact Var):
//   @11 6.24e-3, @13 9.74e-4, @17 1.01e-4. Target: beat it unconditionally.
//
// ROUTE A — THE ENDPOINT MOMENT LADDER (the theorem).
//   m-point survival is an EXACT product (c_j independent):
//     P(B alive at end) = prod_j (1 - |F_j(B)|/q_j),
//     F_j(B) = U_{r in B} {r, r+2} mod q_j, |F_j| in {2..2|B|}.
//   E[S^m] = Stirling assembly of subset sums T_m = sum_{m-subsets} P(B alive):
//     E[S^2] = 2T2+T1;  E[S^3] = 6T3+6T2+T1;  E[S^4] = 24T4+36T3+14T2+T1;
//     E[S^5] = 120T5+240T4+150T3+30T2+T1;
//     E[S^6] = 720T6+1800T5+1560T4+540T3+62T2+T1    (m! S(m,k) coefficients).
//   At @11 (N = 90, K = 10) T2..T6 are DIRECTLY SUMMABLE (C(90,6) = 622.6M
//   sextuples; per-prime strike-class bitmask + popcount). Unconditionally,
//     P(S=0) <= mu4/mu^4 (quartic Markov), <= mu6/mu^6 (sextic), and the
//   optimal poly-square bounds 1 - b^T G^{-1} b from raw moment matrices.
//   RESULT: e^-9.5 (quartic) and e^-13.4 (sextic) vs Chebyshev e^-5.1 -- the
//   ladder pays ~e^-4 per two moment orders, exactly as the Gaussian shape
//   predicts (kurt 2.988, mu6/15sigma^6 = 0.989: sub-Gaussian at every rung).
//   BONUS (@11 only): ensemble kill-capacity sum_q max_c Y_c = 91 = N+1, so
//   S=0 forces total deficit <= 1 from per-prime max classes; exhaustive
//   march of that whole feasible set (1.63M rotations) leaves >= 18 survivors
//   => P(S=0) = 0 EXACTLY at @11. The capacity door is structurally closed
//   at @13+ (H = 2 sum 1/q > 1, cap-05 reading 6); the moment ladder is the
//   route that generalizes.
//   At @13/@17 the T4 sum is 4.0e10 / 4.9e16 terms; cancellation in mu4
//   needs ~1e-7 RELATIVE accuracy in T4 (truncated cluster expansions are
//   useless), and the 4-point linear correlation has NO CRT closed form (the
//   d <-> W-d wrap obstruction of Lemma 4, one level up). @13 T4 is ~2 h of
//   single-thread compute (measured rate 2.4e8 prime-visits/s) -- feasible
//   offline, not here. Blocker quantified in the .md.
//   FORWARD POINTER (2026-08-17 script sweep). "Not here" has since been read
//   as "not anywhere", so both blockers are graded here. natal-cap-27 summed
//   @13's T4 over all 39,782,707,965 quadruples (8 workers, 24.9 min wall as
//   cap-27's tail now prints it; 15.4 min on the unshared machine that first
//   ran it, per that file's 2026-08-19 traceability note) and returned
//   P(S=0) <= 1.898e-6, a factor 513 below Chebyshev;
//   the pre-run estimate ~3Var^2/mu^4 ~ 2.9e-6 was borne out at 2.85e-6 on
//   the quartic Markov leg. natal-cap-32 then found the 4-point wrap identity
//   (the wrap obstruction never appears if the counts are taken from residue
//   histograms) and computed T4@17 = 4.61685e12 +- 4e-4 rel, the first values
//   ever at that level. So @17 is RUN but NOT CERTIFIABLE: mu4 cancels ~7
//   orders there, Chebyshev 1.0086e-4 stays the best PROVEN @17 bound, and
//   the identity needs ~3e-9 relative before the quartic rung can be claimed.
//
// ROUTE A' — THE CHAIN WITH EXACT E[v_k^2] (the refutation made exact).
//   E[v_k^2] computed EXACTLY over histories by DFS-DP for k <= 6 (@11) and
//   k <= 5 (@13) (history space prod q_j small there), deterministic bound
//   v_k <= (2N/q) Ymax(N,q) beyond; per-step second-moment Markov tails
//   P(v_k > tau) <= E[v_k^2]/tau^2 + Freedman (Prop 6 of cap-14). Verdict
//   computed at its optimum: still LOSES to Chebyshev at every level -- the
//   union-over-K + sqrt(q) bridge cannot be rescued by exact second moments.
//
// ROUTE B — STEP-1 LEDGER (deterministic natal set, fully certified).
//   For every scour prime q at @11..@19: exact l2 sum q*v1 = 2(D2+R2)
//   (BDH identity, cap-05), certified l-inf <= sqrt(q*v1), true l-inf,
//   the exact constant C1(x) = max_q maxdev/sqrt(N/q). ONE propagation step:
//   conditioned on c_1, class counts of A_1 mod q_2 are exact natal
//   joint-class counts mod q_1 q_2 (set algebra, J5-type object one modulus
//   up); verified for ALL c_1 at @11/@13, and E_{c1}[D2(A_1,q_2)] matches
//   Theorem 5's closed form. Step-3+ blocker measured (3 lines).
//
// HONESTY. Everything here is over the rotation ensemble (says nothing about
// the anchored tile). Moratorium: not for circulation. No commits.
// ============================================================================
'use strict';
const T0 = Date.now();
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function mulberry32(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296;};}
const f1=v=>v.toFixed(1),f2=v=>v.toFixed(2),f3=v=>v.toFixed(3),f4=v=>v.toFixed(4),ex2=v=>v.toExponential(2);
let CHECKS=0;
function assert(c,m){if(!c)throw new Error('CHECK FAIL: '+m);CHECKS++;}
function assertClose(a,b,tol,m){if(Math.abs(a-b)>tol*Math.max(1,Math.abs(a),Math.abs(b)))throw new Error(`CHECK FAIL ${m}: ${a} vs ${b}`);CHECKS++;}

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
  return {x,mids,W,natal:Int32Array.from(natal),N:natal.length,scour};
}
// v-statistics of a set mod q (cap-14 stepStats, compact)
function stepStats(alive,n,q){
  const hist=new Int32Array(q);
  for(let i=0;i<n;i++)hist[alive[i]%q]++;
  const mY=2*n/q;let v=0,maxdev=0;
  for(let c=0;c<q;c++){
    const dy=hist[c]+hist[(c+q-2)%q]-mY;v+=dy*dy;
    const ad=Math.abs(dy);if(ad>maxdev)maxdev=ad;
  }
  return {v:v/q,maxdev};
}
// ---------------- section A: exact endpoint moments 1..4 at @11 --------------
// T_m = sum over m-subsets of prod_j (1 - |F_j|/q_j); |F_j| counted directly
// as the number of distinct values among {r_i, r_i+2 mod q_j}.
function exactMoments11(L){
  const {natal,N,scour}=L,K=scour.length;
  const R=scour.map(q=>{const a=new Int32Array(N);for(let i=0;i<N;i++)a[i]=natal[i]%q;return a;});
  const inv=scour.map(q=>1/q);
  // T1, T2 (also exact via Theorem 5 pair machinery -- cross-checked by caller)
  let P1=1;for(const q of scour)P1*=1-2/q;
  const T1=N*P1;
  let T2=0;
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
    let p=1;
    for(let k=0;k<K;k++){const q=scour[k],d=(R[k][i]-R[k][j]+q)%q;
      const rho=(d===0)?2:((d===2||d===q-2)?1:0);p*=1-(4-rho)*inv[k];}
    T2+=p;
  }
  // T3
  let T3=0;
  const buf=new Int32Array(8);
  const distinct=(m)=>{let u=0;outer:for(let t=0;t<m;t++){const v=buf[t];for(let s=0;s<t;s++)if(buf[s]===v)continue outer;u++;}return u;};
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++)for(let l=j+1;l<N;l++){
    let p=1;
    for(let k=0;k<K;k++){const q=scour[k],Rk=R[k];
      const a=Rk[i],b=Rk[j],c=Rk[l];
      buf[0]=a;buf[1]=(a+2)%q;buf[2]=b;buf[3]=(b+2)%q;buf[4]=c;buf[5]=(c+2)%q;
      p*=1-distinct(6)*inv[k];}
    T3+=p;
  }
  // T4 (2.56M quadruples x 10 primes) with Kahan summation
  let T4=0,T4c=0;
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++)for(let l=j+1;l<N;l++)for(let m=l+1;m<N;m++){
    let p=1;
    for(let k=0;k<K;k++){const q=scour[k],Rk=R[k];
      const a=Rk[i],b=Rk[j],c=Rk[l],e=Rk[m];
      buf[0]=a;buf[1]=(a+2)%q;buf[2]=b;buf[3]=(b+2)%q;
      buf[4]=c;buf[5]=(c+2)%q;buf[6]=e;buf[7]=(e+2)%q;
      p*=1-distinct(8)*inv[k];}
    const y=p-T4c,t=T4+y;T4c=(t-T4)-y;T4=t;
  }
  return {T1,T2,T3,T4};
}
function endpointBounds(x,T){
  const {T1,T2,T3,T4}=T;
  const M1=T1,M2=2*T2+T1,M3=6*T3+6*T2+T1,M4=24*T4+36*T3+14*T2+T1;
  const mu=M1,Var=M2-mu*mu;
  const mu3=M3-3*mu*M2+2*mu**3;
  const mu4=M4-4*mu*M3+6*mu*mu*M2-3*mu**4;
  const cheb=Var/(mu*mu),cant=Var/(Var+mu*mu);
  const quart=mu4/mu**4;
  // optimal quartic-square bound: 1 - [M1 M2] G^{-1} [M1;M2]
  const det=M2*M4-M3*M3;
  const sos=1-(M1*(M4*M1-M3*M2)+M2*(M2*M2-M3*M1))/det;
  return {mu,Var,mu3,mu4,kurt:mu4/(Var*Var),skew:mu3/Var**1.5,cheb,cant,quart,sos};
}
// MC verification of central moments + zero count
function mcEndpoint(L,nRuns,seed){
  const {natal,N,scour}=L,K=scour.length,rng=mulberry32(seed);
  let s1=0,s2=0,s3=0,s4=0,zeros=0,minS=Infinity;const Sv=new Float64Array(nRuns);
  const cur=new Int32Array(N);
  for(let it=0;it<nRuns;it++){
    let n=N;cur.set(natal);
    for(let k=0;k<K;k++){const q=scour[k],a=Math.floor(rng()*q),b=(a+q-2)%q;
      let w=0;for(let i=0;i<n;i++){const mm=cur[i]%q;if(mm!==a&&mm!==b)cur[w++]=cur[i];}n=w;}
    Sv[it]=n;s1+=n;if(n===0)zeros++;if(n<minS)minS=n;
  }
  const mu=s1/nRuns;let s5=0,s6=0;
  for(let it=0;it<nRuns;it++){const d=Sv[it]-mu,d2=d*d;s2+=d2;s3+=d2*d;s4+=d2*d2;s5+=d2*d2*d;s6+=d2*d2*d2;}
  return {mu,m2:s2/nRuns,m3:s3/nRuns,m4:s4/nRuns,m5:s5/nRuns,m6:s6/nRuns,zeros,minS,nRuns};
}
// T5, T6 at @11 by DFS with per-prime strike-class bitmasks (q <= 47 < 64):
// state per prime = 64-bit mask of struck classes; |F| = popcount. Innermost
// depth is a tight loop; T4 recomputed as a cross-check of the direct loop.
function pop32(x){x-=(x>>1)&0x55555555;x=(x&0x33333333)+((x>>2)&0x33333333);x=(x+(x>>4))&0x0f0f0f0f;return Math.imul(x,0x01010101)>>24;}
function exactMoments56(L){
  const {natal,N,scour}=L,K=scour.length;
  const BLo=[],BHi=[];
  for(let k=0;k<K;k++){
    const q=scour[k],lo=new Int32Array(N),hi=new Int32Array(N);
    // Executable, not prose. The residue mask is a two-word (lo, hi) pair, so
    // q <= 64 and no further. Safe today because exactMoments56 is called once,
    // at @11, where the scour primes stop at 47 — a fact that lived only in a
    // comment until 2026-08-20. At @13 the scour primes run to 173 and this
    // would alias silently; natal-cap-27-t4-at13.js avoids the mask entirely.
    assert(q<=64,'exactMoments56 needs q<=64 for the two-word residue mask (q='+q+')');
    for(let i=0;i<N;i++){const a=natal[i]%q,b=(a+2)%q;
      if(a<32)lo[i]|=1<<a;else hi[i]|=1<<(a-32);
      if(b<32)lo[i]|=1<<b;else hi[i]|=1<<(b-32);}
    BLo.push(lo);BHi.push(hi);
  }
  const FAC=new Float64Array(K*16);
  for(let k=0;k<K;k++)for(let c=0;c<16;c++)FAC[k*16+c]=1-c/scour[k];
  const sLo=new Int32Array(7*K),sHi=new Int32Array(7*K),sCn=new Int32Array(7*K);
  let T4=0,T4c=0,T5=0,T5c=0,T6=0,T6c=0;
  function prodAt(d){let p=1;for(let k=0;k<K;k++)p*=FAC[k*16+sCn[d*K+k]];return p;}
  (function rec(d,start){
    // d slots chosen so far, state in row d
    if(d===5){
      const base=5*K;let acc=0,accC=0;
      for(let t=start;t<N;t++){
        let p=1;
        for(let k=0;k<K;k++){
          const c=pop32(sLo[base+k]|BLo[k][t])+pop32(sHi[base+k]|BHi[k][t]);
          p*=FAC[k*16+c];
        }
        const y=p-accC,s=acc+y;accC=(s-acc)-y;acc=s;
      }
      const y=acc-T6c,s=T6+y;T6c=(s-T6)-y;T6=s;
      return;
    }
    for(let t=start;t<N;t++){
      const b0=d*K,b1=(d+1)*K;
      for(let k=0;k<K;k++){
        const lo=sLo[b0+k]|BLo[k][t],hi=sHi[b0+k]|BHi[k][t];
        sLo[b1+k]=lo;sHi[b1+k]=hi;sCn[b1+k]=pop32(lo)+pop32(hi);
      }
      const nd=d+1;
      if(nd===4){const p=prodAt(4),y=p-T4c,s=T4+y;T4c=(s-T4)-y;T4=s;}
      else if(nd===5){const p=prodAt(5),y=p-T5c,s=T5+y;T5c=(s-T5)-y;T5=s;}
      rec(nd,t+1);
    }
  })(0,0);
  return {T4,T5,T6};
}
function sexticBounds(T,T56){
  const {T1,T2,T3}=T,{T4,T5,T6}=T56;
  const M=[1,T1,2*T2+T1,6*T3+6*T2+T1,24*T4+36*T3+14*T2+T1,
    120*T5+240*T4+150*T3+30*T2+T1,
    720*T6+1800*T5+1560*T4+540*T3+62*T2+T1];
  const mu=M[1];
  const bin=[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1]];
  const cm=m=>{let s=0;for(let k=0;k<=m;k++)s+=bin[m][k]*Math.pow(-mu,k)*M[m-k];return s;};
  const mu6=cm(6);
  // optimal cubic-square: 1 - b^T G^{-1} b, b=[M1,M2,M3], G=[[M2..M4],[M3..M5],[M4..M6]]
  const G=[[M[2],M[3],M[4]],[M[3],M[4],M[5]],[M[4],M[5],M[6]]],b=[M[1],M[2],M[3]];
  // solve G z = b (Gaussian elimination, 3x3)
  const A=G.map((row,i)=>[...row,b[i]]);
  for(let c=0;c<3;c++){let pv=c;for(let r=c+1;r<3;r++)if(Math.abs(A[r][c])>Math.abs(A[pv][c]))pv=r;
    [A[c],A[pv]]=[A[pv],A[c]];
    for(let r=0;r<3;r++)if(r!==c){const f=A[r][c]/A[c][c];for(let cc=c;cc<4;cc++)A[r][cc]-=f*A[c][cc];}}
  const z=[A[0][3]/A[0][0],A[1][3]/A[1][1],A[2][3]/A[2][2]];
  const sos6=1-(b[0]*z[0]+b[1]*z[1]+b[2]*z[2]);
  return {mu6,sextic:mu6/Math.pow(mu,6),sos6};
}

// ---------------- section A': Theorem 5 law + exact E[v_k^2] + the chain -----
function evolutionLaw(L){       // cap-14 Theorem 5, compact reimplementation
  const {W,N,natal,scour}=L,K=scour.length;
  const lin=new Int32Array(W);
  for(let i=0;i<N;i++){const ri=natal[i];for(let j=i+1;j<N;j++)lin[natal[j]-ri]++;}
  let nAct=0;for(let d=1;d<W;d++)if(lin[d])nAct++;
  const dArr=new Int32Array(nAct),cnt=new Float64Array(nAct);
  {let i=0;for(let d=1;d<W;d++)if(lin[d]){dArr[i]=d;cnt[i]=lin[d];i++;}}
  const rows=[];const P2=new Float64Array(nAct).fill(1);let P1=1;
  for(let k=0;k<K;k++){
    const q=scour[k];let sQ=0,sAll=0,sPM2=0;
    for(let i=0;i<nAct;i++){
      const w=cnt[i]*P2[i];sAll+=w;const dm=dArr[i]%q;
      if(dm===0)sQ+=w;else if(dm===2||dm===q-2)sPM2+=w;}
    const EA=P1*N,EA2=EA+2*sAll;
    const ED2=EA*(1-1/q)+2*(sQ-sAll/q);
    rows.push({q,EA,ED2,Ev:(2/q)*(ED2+sPM2-EA2/q)});
    P1*=1-2/q;
    for(let i=0;i<nAct;i++){const dm=dArr[i]%q;
      const rho=(dm===0)?2:((dm===2||dm===q-2)?1:0);P2[i]*=1-(4-rho)/q;}
  }
  let sAllK=0;for(let i=0;i<nAct;i++)sAllK+=cnt[i]*P2[i];
  const EAK=P1*N,VarS=EAK+2*sAllK-EAK*EAK;
  return {rows,EAK,VarS};
}
// exact E[v_k], E[v_k^2] over ALL histories, k = 1..kmax, by DFS
function dpVsq(L,kmax){
  const {natal,N,scour}=L;
  const Ev=new Float64Array(kmax),Ev2=new Float64Array(kmax);
  const bufs=[];for(let d=0;d<=kmax;d++)bufs.push(new Int32Array(N));
  bufs[0].set(natal);
  (function rec(depth,n,w){
    const q=scour[depth],s=stepStats(bufs[depth],n,q);
    Ev[depth]+=w*s.v;Ev2[depth]+=w*s.v*s.v;
    if(depth+1>=kmax)return;
    const cur=bufs[depth],nxt=bufs[depth+1],wq=w/q;
    for(let a=0;a<q;a++){
      const b=(a+q-2)%q;let m=0;
      for(let i=0;i<n;i++){const mm=cur[i]%q;if(mm!==a&&mm!==b)nxt[m++]=cur[i];}
      rec(depth+1,m,wq);
    }
  })(0,N,1);
  return {Ev,Ev2};
}
// MC relative sd of v_k per step (calibration only), + max f*maxdev
function mcVsq(L,f,nRuns,seed){
  const {natal,N,scour}=L,K=scour.length,rng=mulberry32(seed);
  const s1=new Float64Array(K),s2=new Float64Array(K);
  const cur=new Int32Array(N);let maxfdev=0;
  for(let it=0;it<nRuns;it++){
    let n=N;cur.set(natal);
    for(let k=0;k<K;k++){const q=scour[k];
      const st=stepStats(cur,n,q);s1[k]+=st.v;s2[k]+=st.v*st.v;
      if(f[k]*st.maxdev>maxfdev)maxfdev=f[k]*st.maxdev;
      const a=Math.floor(rng()*q),b=(a+q-2)%q;
      let w=0;for(let i=0;i<n;i++){const mm=cur[i]%q;if(mm!==a&&mm!==b)cur[w++]=cur[i];}n=w;}
  }
  return {m:Array.from(s1,v=>v/nRuns),m2:Array.from(s2,v=>v/nRuns),maxfdev};
}
// the Prop-6 chain with second-moment tails, at its optimum
function chain(L,law,f,Ev2,label){
  const rows=law.rows,K=rows.length,E=law.EAK,VarS=law.VarS;
  const cheb=VarS/(E*E);
  const mA=Math.max(...rows.map((r,k)=>f[k]*Math.sqrt(r.q*r.Ev)));
  const freed=(V,M)=>Math.exp(-E*E/(2*(V+M*E/3)));
  let best=null;
  for(let i=0;i<=400;i++){const th=Math.pow(10,i/40);
    let fail=0;for(let k=0;k<K;k++)fail+=Math.min(1,Ev2[k]/((th*rows[k].Ev)**2));
    const tot=freed(th*VarS,Math.sqrt(th)*mA)+Math.min(1,fail);
    if(!best||tot<best.tot)best={tot,th};}
  console.log(`   chain[${label}]: best total ${ex2(best.tot)} at theta=${f1(best.th)}  vs Chebyshev ${ex2(cheb)}  -> ${best.tot<cheb?'BEATS':'LOSES'} (x${(best.tot/cheb).toExponential(1)})`);
  return best;
}
// ---------------- section B: step-1 ledger @11..@19 + one propagation step ---
function step1Ledger(L){
  const {x,N,scour}=L,natal=L.natal;
  let C1=0,C1q=0,Ccert=0,Ccertq=0,worstRow=null,flatMin=1e9,flatMax=0;
  for(const q of scour){
    const hist=new Int32Array(q);
    for(let i=0;i<N;i++)hist[natal[i]%q]++;
    const mX=N/q,mY=2*N/q;
    let D2=0,R2=0,l2=0,maxdev=0;
    for(let c=0;c<q;c++){
      const xc=hist[c]-mX;D2+=xc*xc;R2+=xc*(hist[(c+2)%q]-mX);
      const dy=hist[c]+hist[(c+q-2)%q]-mY;l2+=dy*dy;
      const ad=Math.abs(dy);if(ad>maxdev)maxdev=ad;}
    assertClose(l2,2*(D2+R2),1e-9,`BDH q=${q}@${x}`);      // exact l2 identity
    const sc=Math.sqrt(N/q);
    const c1=maxdev/sc,cc=Math.sqrt(l2)/sc;
    if(c1>C1){C1=c1;C1q=q;worstRow={q,maxdev,cert:Math.sqrt(l2),sc};}
    if(cc>Ccert){Ccert=cc;Ccertq=q;}
    const fl=D2/(N*(1-1/q));if(fl<flatMin)flatMin=fl;if(fl>flatMax)flatMax=fl;
  }
  console.log(` @${x}: N=${N} #q=${scour.length}  C1 = ${f3(C1)} (at q=${C1q}: maxdev=${worstRow.q===C1q?f2(worstRow.maxdev):'?'} vs sqrt(N/q)=${f2(worstRow.sc)})`);
  console.log(`      certified-l2 C = ${f2(Ccert)} (at q=${Ccertq});  cert/trivial(=C1*sqrt(q)) beats by flatness: D2/N(1-1/q) in [${f3(flatMin)}, ${f3(flatMax)}]`);
  return {x,N,C1,C1q,Ccert,Ccertq,flatMin,flatMax};
}
function propagation(L,law){
  const {natal,N,scour}=L,q1=scour[0],q2=scour[1];
  let sumD2=0,minD2=1e18,maxD2=-1;
  // natal joint-class table mod q1*q2
  const J=new Int32Array(q1*q2);
  for(let i=0;i<N;i++)J[(natal[i]%q1)*q2+(natal[i]%q2)]++;
  const X0=new Int32Array(q2);for(let i=0;i<N;i++)X0[natal[i]%q2]++;
  for(let c1=0;c1<q1;c1++){
    const c1b=(c1+q1-2)%q1;
    // direct
    const alive=[];for(let i=0;i<N;i++){const m=natal[i]%q1;if(m!==c1&&m!==c1b)alive.push(natal[i]);}
    const A1=alive.length,h=new Int32Array(q2);
    for(const r of alive)h[r%q2]++;
    let D2d=0;for(let c=0;c<q2;c++){const e=h[c]-A1/q2;D2d+=e*e;}
    // reconstruction from natal joint classes mod q1 q2 (set algebra, exact)
    let D2r=0,A1r=N;
    for(let c=0;c<q2;c++)A1r-= J[c1*q2+c]+J[c1b*q2+c];
    assert(A1r===A1,`|A1| reconstruction c1=${c1}`);
    for(let c=0;c<q2;c++){const Xc=X0[c]-J[c1*q2+c]-J[c1b*q2+c];const e=Xc-A1/q2;D2r+=e*e;}
    assertClose(D2r,D2d,1e-12,`D2(A1,q2) reconstruction c1=${c1}`);
    sumD2+=D2d;if(D2d<minD2)minD2=D2d;if(D2d>maxD2)maxD2=D2d;
  }
  const E2=law.rows[1].ED2;
  assertClose(sumD2/q1,E2,1e-9,'E_{c1}[D2(A1,q2)] = Theorem-5 closed form');
  console.log(` @${L.x}: all ${q1} strike classes c1: D2(A1,${q2}) reconstructed EXACTLY from natal joint classes mod ${q1}*${q2}`);
  console.log(`      E_c1[D2] = ${f4(sumD2/q1)} = Thm5 closed form ${f4(E2)};  range over c1: [${f2(minD2)}, ${f2(maxD2)}]`);
}
function mcBlocker(L,law,ks,nRuns,seed){
  const {natal,N,scour}=L,rng=mulberry32(seed),K=scour.length;
  const acc={};for(const k of ks)acc[k]={s:0,s2:0};
  const cur=new Int32Array(N);
  for(let it=0;it<nRuns;it++){
    let n=N;cur.set(natal);
    for(let k=0;k<K;k++){
      if(acc[k]){const q=scour[k],h=new Int32Array(q);
        for(let i=0;i<n;i++)h[cur[i]%q]++;
        let D2=0;for(let c=0;c<q;c++){const e=h[c]-n/q;D2+=e*e;}
        acc[k].s+=D2;acc[k].s2+=D2*D2;}
      const q=scour[k],a=Math.floor(rng()*q),b=(a+q-2)%q;
      let w=0;for(let i=0;i<n;i++){const mm=cur[i]%q;if(mm!==a&&mm!==b)cur[w++]=cur[i];}n=w;
      if(k>=Math.max(...ks))break;
    }
  }
  console.log(` step-3+ blocker @${L.x} (MC ${nRuns} histories): exact description of A_k needs 3^k joint-class terms; the D2 LAW stays exact in mean but the VALUE randomizes:`);
  for(const k of ks){
    const m=acc[k].s/nRuns,sd=Math.sqrt(Math.max(0,acc[k].s2/nRuns-m*m));
    console.log(`   k=${k+1} (q=${scour[k]}): D2(A_k,q) = ${f1(m)} +- ${f1(sd)} (Thm5 mean ${f1(law.rows[k].ED2)}; rel spread ${f3(sd/m)}; terms 3^${k}=${Math.pow(3,k)})`);
  }
}
// ================================== RUN =======================================
const SEC=(process.argv[2]||'ABC');

if(SEC.includes('A')){
console.log('='.repeat(78));
console.log('A. ROUTE A -- exact endpoint moments 1..4 at @11 (2,555,190 quadruples)');
const L=buildLevel(11),law=evolutionLaw(L);
const T=exactMoments11(L);
assertClose(T.T1,law.EAK,1e-12,'T1 = N prod(1-2/q)');
assertClose(2*T.T2+T.T1,law.VarS+law.EAK*law.EAK,1e-9,'E[S^2] via T2 = Thm5 pair formula');
const B=endpointBounds(11,T);
console.log(`   mu=${f4(B.mu)}  Var=${f4(B.Var)}  mu3=${f3(B.mu3)} (skew ${f3(B.skew)})  mu4=${f2(B.mu4)} (kurtosis ${f4(B.kurt)})`);
const mc=mcEndpoint(L,200000,20260814);
console.log(`   MC 200k: mu=${f3(mc.mu)} m2=${f3(mc.m2)} m3=${f3(mc.m3)} m4=${f2(mc.m4)}  zeros=${mc.zeros}  minS=${mc.minS}`);
// ensemble kill-capacity certificate: if sum_q max_c Y_c(N,q) < N then P(S=0)=0
{let cap=0;for(const q of L.scour){const h=new Int32Array(q);
  for(let i=0;i<L.N;i++)h[L.natal[i]%q]++;
  let m=0;for(let c=0;c<q;c++){const y=h[c]+h[(c+q-2)%q];if(y>m)m=y;}cap+=m;}
 console.log(`   capacity certificate: sum_q max-strike = ${cap} vs N=${L.N} -> ${cap<L.N?'P(S=0)=0 EXACTLY':'slack '+(cap-L.N)+': exhaustive near-max search is decidable'}`);
 // S=0 forces sum_q Y_{c_q} >= N, i.e. total deficit from per-prime max <= cap-N.
 // Enumerate ALL class combos with sum of deficits <= cap-N; march each one.
 if(cap>=L.N&&cap-L.N<=2){
   const slack=cap-L.N,cand=[];
   for(const q of L.scour){const h=new Int32Array(q);
     for(let i=0;i<L.N;i++)h[L.natal[i]%q]++;
     let m=0;const Y=new Int32Array(q);
     for(let c=0;c<q;c++){Y[c]=h[c]+h[(c+q-2)%q];if(Y[c]>m)m=Y[c];}
     const byDef=[];for(let d=0;d<=slack;d++){const l=[];for(let c=0;c<q;c++)if(Y[c]===m-d)l.push(c);byDef.push(l);}
     cand.push(byDef);}
   let tested=0,minSurv=Infinity;
   const combo=new Int32Array(L.scour.length);
   (function rec(j,defLeft){
     if(j===L.scour.length){
       let n=L.N;const cur=Int32Array.from(L.natal);
       for(let k=0;k<L.scour.length;k++){const q=L.scour[k],a=combo[k],b=(a+q-2)%q;
         let w=0;for(let i=0;i<n;i++){const mm=cur[i]%q;if(mm!==a&&mm!==b)cur[w++]=cur[i];}n=w;}
       tested++;if(n<minSurv)minSurv=n;return;}
     for(let d=0;d<=defLeft;d++)for(const c of cand[j][d]){combo[j]=c;rec(j+1,defLeft-d);}
   })(0,slack);
   assert(minSurv>0,'no zero-survivor rotation in the deficit-feasible set');
   console.log(`   EXHAUSTIVE deficit-search: ${tested} feasible rotations marched, min survivors = ${minSurv} > 0`);
   console.log(`   => THEOREM: P(S=0) = 0 EXACTLY at @11 (every other rotation has sum Y < N).`);
 }}
assert(Math.abs(mc.m4-B.mu4)/B.mu4<0.05,'MC mu4 within 5%');
assert(Math.abs(mc.m3-B.mu3)<3.5*Math.sqrt(15)*Math.pow(B.Var,1.5)/Math.sqrt(mc.nRuns)+0.05*Math.abs(B.mu3),'MC mu3 consistent');
console.log(`   UNCONDITIONAL BOUNDS on P(S=0), rotation ensemble @11:`);
console.log(`     Chebyshev Var/mu^2        = ${ex2(B.cheb)}   (e^-${(-Math.log(B.cheb)).toFixed(2)})`);
console.log(`     Cantelli                  = ${ex2(B.cant)}   (e^-${(-Math.log(B.cant)).toFixed(2)})`);
console.log(`     quartic Markov mu4/mu^4   = ${ex2(B.quart)}   (e^-${(-Math.log(B.quart)).toFixed(2)})  BEATS Chebyshev x${f1(B.cheb/B.quart)}`);
console.log(`     optimal quartic-square    = ${ex2(B.sos)}   (e^-${(-Math.log(B.sos)).toFixed(2)})  BEATS Chebyshev x${f1(B.cheb/B.sos)}`);
console.log(`   pushing to the SIXTH moment (622.6M sextuples, bitmask DFS)...`);
const T56=exactMoments56(L);
assertClose(T56.T4,T.T4,1e-9,'T4: bitmask DFS = direct loop');
const B6=sexticBounds(T,T56);
console.log(`   mu6=${f1(B6.mu6)} (Gaussian ref 15 sigma^6 = ${f1(15*Math.pow(B.Var,3))});  MC mu5=${f1(mc.m5)} mu6=${f1(mc.m6)}`);
assert(Math.abs(mc.m6-B6.mu6)/B6.mu6<0.10,'MC mu6 within 10%');
console.log(`     sextic Markov mu6/mu^6    = ${ex2(B6.sextic)}   (e^-${(-Math.log(B6.sextic)).toFixed(2)})  BEATS Chebyshev x${f1(B.cheb/B6.sextic)}`);
console.log(`     optimal cubic-square      = ${ex2(B6.sos6)}   (e^-${(-Math.log(B6.sos6)).toFixed(2)})  BEATS Chebyshev x${(B.cheb/B6.sos6).toFixed(0)}`);
console.log(`   THEOREM (finite computation): P(S=0) <= ${ex2(B6.sos6)} at @11 by exact moments`);
console.log(`   1..6 + Markov -- the first beyond-Chebyshev unconditional ensemble bound.`);
console.log(`   (The truth at @11 is exactly 0 by the deficit search; the moment LADDER is`);
console.log(`    what survives to @13+, where the capacity door is structurally closed.)`);
}

if(SEC.includes('B')){
console.log('='.repeat(78));
console.log("A'. THE CHAIN WITH EXACT SECOND MOMENTS E[v_k^2] (per-step tails + Freedman)");
for(const x of [11,13,17]){
  const L=buildLevel(x),law=evolutionLaw(L),K=L.scour.length;
  const f=new Array(K);{let a=1;for(let k=K-1;k>=0;k--){f[k]=a;a*=1-2/L.scour[k];}}
  const kmax=x===11?6:(x===13?5:4);
  const dp=dpVsq(L,kmax);
  for(let k=0;k<kmax;k++)assertClose(dp.Ev[k],law.rows[k].Ev,1e-9,`DP E[v_${k+1}] = Thm5 @${x}`);
  const nMC=x===11?30000:(x===13?4000:400);
  const mc=mcVsq(L,f,nMC,7+x);
  // rigorous hybrid: exact E[v^2] for k<kmax, deterministic v<=2*N*Ymax/q beyond
  const Ymax=L.scour.map(q=>{const h=new Int32Array(q);for(let i=0;i<L.N;i++)h[L.natal[i]%q]++;
    let m=0;for(let c=0;c<q;c++){const y=h[c]+h[(c+q-2)%q];if(y>m)m=y;}return m;});
  const Ev2rig=law.rows.map((r,k)=>k<kmax?dp.Ev2[k]:(2*L.N*Ymax[k]/r.q)*r.Ev);
  const smax=Math.max(...law.rows.map((r,k)=>{const m=mc.m[k]/r.Ev,m2=mc.m2[k]/(r.Ev*r.Ev);return Math.sqrt(Math.max(0,m2-m*m));}));
  const Ev2cal=law.rows.map((r,k)=>(1+smax*smax)*r.Ev*r.Ev);
  const sExact=dp.Ev2.map((v2,k)=>Math.sqrt(Math.max(0,v2/(dp.Ev[k]*dp.Ev[k])-1)));
  console.log(` @${x}: exact rel-sd of v_k (k<=${kmax}): [${Array.from(sExact,v=>f3(v)).join(', ')}]  MC smax(all k)=${f3(smax)}`);
  chain(L,law,f,Ev2rig,'rigorous: exact E[v^2] k<='+kmax+' + det. bound');
  chain(L,law,f,Ev2cal,'calibrated s='+f3(smax)+' every step (NOT a theorem)');
}
console.log('   VERDICT: the per-step chain loses to endpoint Chebyshev at every level');
console.log('   even with EXACT second moments -- the union over K steps plus the sqrt(q)');
console.log('   bridge is structural. The endpoint moment route (section A) is the winner.');
}

if(SEC.includes('C')){
console.log('='.repeat(78));
console.log('B. ROUTE B -- step-1 ledger: exact C1 and certified l2->linf, @11..@19');
const store={};
for(const x of [11,13,17,19]){const L=buildLevel(x);store[x]=L;step1Ledger(L);}
console.log('   propagation (one step, exact):');
for(const x of [11,13]){const L=store[x];propagation(L,evolutionLaw(L));}
mcBlocker(store[13],evolutionLaw(store[13]),[1,3,7],400,99);
}
console.log(`[${CHECKS} checks passed, ${(Date.now()-T0)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-21-beyond-chebyshev.js
//   invocation:  node research/natal-cap-21-beyond-chebyshev.js
//   code-sha256: da36deec1f99d9b72d836cccda9dcb2e7a766d91fdbefa17b17ee17f2489578b
//   out-sha256:  d0c79f2cc746f381776bd7ff9c76df00a953b627e91d07e9672834cb5af0fc1c
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     93.2 s
// ============================================================================
// ==============================================================================
// A. ROUTE A -- exact endpoint moments 1..4 at @11 (2,555,190 quadruples)
//    mu=39.2735  Var=9.6305  mu3=-1.561 (skew -0.052)  mu4=277.14 (kurtosis 2.9881)
//    MC 200k: mu=39.271 m2=9.604 m3=-1.752 m4=275.98  zeros=0  minS=25
//    capacity certificate: sum_q max-strike = 91 vs N=90 -> slack 1: exhaustive near-max search is decidable
//    EXHAUSTIVE deficit-search: 1630208 feasible rotations marched, min survivors = 18 > 0
//    => THEOREM: P(S=0) = 0 EXACTLY at @11 (every other rotation has sum Y < N).
//    UNCONDITIONAL BOUNDS on P(S=0), rotation ensemble @11:
//      Chebyshev Var/mu^2        = 6.24e-3   (e^-5.08)
//      Cantelli                  = 6.21e-3   (e^-5.08)
//      quartic Markov mu4/mu^4   = 1.16e-4   (e^-9.06)  BEATS Chebyshev x53.6
//      optimal quartic-square    = 7.80e-5   (e^-9.46)  BEATS Chebyshev x80.0
//    pushing to the SIXTH moment (622.6M sextuples, bitmask DFS)...
//    mu6=13255.8 (Gaussian ref 15 sigma^6 = 13398.1);  MC mu5=-167.9 mu6=13172.5
//      sextic Markov mu6/mu^6    = 3.61e-6   (e^-12.53)  BEATS Chebyshev x1728.4
//      optimal cubic-square      = 1.49e-6   (e^-13.42)  BEATS Chebyshev x4190
//    THEOREM (finite computation): P(S=0) <= 1.49e-6 at @11 by exact moments
//    1..6 + Markov -- the first beyond-Chebyshev unconditional ensemble bound.
//    (The truth at @11 is exactly 0 by the deficit search; the moment LADDER is
//     what survives to @13+, where the capacity door is structurally closed.)
// ==============================================================================
// A'. THE CHAIN WITH EXACT SECOND MOMENTS E[v_k^2] (per-step tails + Freedman)
//  @11: exact rel-sd of v_k (k<=6): [0.000, 0.348, 0.319, 0.348, 0.319, 0.274]  MC smax(all k)=0.351
//    chain[rigorous: exact E[v^2] k<=6 + det. bound]: best total 4.99e-1 at theta=26.6  vs Chebyshev 6.24e-3  -> LOSES (x8.0e+1)
//    chain[calibrated s=0.351 every step (NOT a theorem)]: best total 2.66e-1 at theta=11.2  vs Chebyshev 6.24e-3  -> LOSES (x4.3e+1)
//  @13: exact rel-sd of v_k (k<=5): [0.000, 0.488, 0.279, 0.287, 0.310]  MC smax(all k)=0.489
//    chain[rigorous: exact E[v^2] k<=5 + det. bound]: best total 4.73e-1 at theta=177.8  vs Chebyshev 9.74e-4  -> LOSES (x4.9e+2)
//    chain[calibrated s=0.489 every step (NOT a theorem)]: best total 8.49e-2 at theta=31.6  vs Chebyshev 9.74e-4  -> LOSES (x8.7e+1)
//  @17: exact rel-sd of v_k (k<=4): [0.000, 0.210, 0.307, 0.284]  MC smax(all k)=0.315
//    chain[rigorous: exact E[v^2] k<=4 + det. bound]: best total 3.62e-1 at theta=1122.0  vs Chebyshev 1.01e-4  -> LOSES (x3.6e+3)
//    chain[calibrated s=0.315 every step (NOT a theorem)]: best total 1.30e-2 at theta=133.4  vs Chebyshev 1.01e-4  -> LOSES (x1.3e+2)
//    VERDICT: the per-step chain loses to endpoint Chebyshev at every level
//    even with EXACT second moments -- the union over K steps plus the sqrt(q)
//    bridge is structural. The endpoint moment route (section A) is the winner.
// ==============================================================================
// B. ROUTE B -- step-1 ledger: exact C1 and certified l2->linf, @11..@19
//  @11: N=90 #q=10  C1 = 2.893 (at q=43: maxdev=4.19 vs sqrt(N/q)=1.45)
//       certified-l2 C = 6.86 (at q=43);  cert/trivial(=C1*sqrt(q)) beats by flatness: D2/N(1-1/q) in [0.083, 0.542]
//  @13: N=990 #q=34  C1 = 2.299 (at q=151: maxdev=5.89 vs sqrt(N/q)=2.56)
//       certified-l2 C = 9.95 (at q=167);  cert/trivial(=C1*sqrt(q)) beats by flatness: D2/N(1-1/q) in [0.038, 0.274]
//  @17: N=14850 #q=120  C1 = 2.488 (at q=631: maxdev=12.07 vs sqrt(N/q)=4.85)
//       certified-l2 C = 18.96 (at q=631);  cert/trivial(=C1*sqrt(q)) beats by flatness: D2/N(1-1/q) in [0.015, 0.222]
//  @19: N=252450 #q=435  C1 = 2.011 (at q=2039: maxdev=22.38 vs sqrt(N/q)=11.13)
//       certified-l2 C = 27.09 (at q=2917);  cert/trivial(=C1*sqrt(q)) beats by flatness: D2/N(1-1/q) in [0.001, 0.110]
//    propagation (one step, exact):
//  @11: all 13 strike classes c1: D2(A1,17) reconstructed EXACTLY from natal joint classes mod 13*17
//       E_c1[D2] = 15.5385 = Thm5 closed form 15.5385;  range over c1: [8.12, 23.88]
//  @13: all 17 strike classes c1: D2(A1,19) reconstructed EXACTLY from natal joint classes mod 17*19
//       E_c1[D2] = 98.6687 = Thm5 closed form 98.6687;  range over c1: [33.79, 159.68]
//  step-3+ blocker @13 (MC 400 histories): exact description of A_k needs 3^k joint-class terms; the D2 LAW stays exact in mean but the VALUE randomizes:
//    k=2 (q=19): D2(A_k,q) = 100.5 +- 41.1 (Thm5 mean 98.7; rel spread 0.409; terms 3^1=3)
//    k=4 (q=29): D2(A_k,q) = 109.2 +- 26.1 (Thm5 mean 111.0; rel spread 0.239; terms 3^3=27)
//    k=8 (q=43): D2(A_k,q) = 200.1 +- 39.4 (Thm5 mean 197.2; rel spread 0.197; terms 3^7=2187)
// [693 checks passed, 93.054s]
// ============================================================================
// READINGS
//
