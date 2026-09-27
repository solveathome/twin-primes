// ============================================================================
// ATTACK MULTIPLICITY-3 — THE m ≥ 3 INSTRUMENT, AND WHAT IT BUYS AT THE ANCHOR
// (2026-08-26 — the m = 3 instrument the corpus says it never built)
// ============================================================================
// WHY. `paper/wall-note.md` §2 Face 2 states, as measurement, that the anchored
// overlap deficit "lives in multiplicity m ≥ 3": at @17, in the DIAGONAL strike
// ensemble, the anchored pair statistic P2 reads z = −0.30 against the
// X-channel's z = −2.71, so pair-based methods see the deficit dimly. The
// corpus carries the m-SPECTRUM (`natal-cap-35-x-multiplicity.js`, per-cell z)
// and the anchored TRIPLE CENSUS (`natal-cap-39-triple-census.js`, B_3 and the
// super-W joint deficit J), but it carries no statistic B_3(t) read as a random
// variable over the ensemble, no certificate built at multiplicity 3, and no
// placement of either against the campaign's certified ensemble bounds. This
// file builds those three and reports where they die.
//
// TWO Z-SCALES THAT ARE NOT COMPARABLE, carried as a warning per
// `natal-cap-31-calm-vs-kill.md`'s closing caveat. Three ensembles appear in
// this corpus and they have different means, different variances and different
// CARDINALITIES:
//   (E1) DIAGONAL rotation ensemble. t uniform on [0,W); scour prime q strikes
//        the classes {t, t−2} mod q. Exactly W members, the anchor is t = 0.
//        @17: S̄ = 3614.93, anchored z(S) = −2.49.
//   (E2) INDEPENDENT strike ensemble. c_q uniform on Z/q, independent over q.
//        ∏_q q members. Mean = N̄·∏(1−2/q) = S_CRT. This is cap-14/cap-21's.
//   (E3) WINDOW ensemble. a length-W window dropped at a uniform phase of the
//        DEEP tile, period ∏_{p≤y} p. Mean = S_CRT too; Var in closed form from
//        the pair correlation J₅ (`natal5-variance.js`). @17: z = −4.50.
//        Cardinality ∏_{p≤y} p = exp(θ(y)).
// Face 1's Proposition 1 pairs ε from (E3) with the cardinality W of (E1). This
// file computes each ensemble's ε against ITS OWN cardinality and prints both,
// so the counting argument is self-consistent for the first time. It does not
// mix them, and it does not compare a z from one against a z from another.
//
// OBJECTS. Level x, tile W = x#, Natal@5 comb N (|N| = N̄), scour primes
// x < q ≤ √W (K of them). m_r(t) = #{q : q strikes r at t}; n_k(t) = #{r ∈ N :
// m_r(t) = k}. Then, per rotation t:
//   S  = n_0                            survivors
//   M  = Σ_k k·n_k = B_1                strikes with multiplicity
//   X  = Σ_k (k−1)⁺ n_k                 OVERLAP CREDIT (the X-channel)
//   B_j = Σ_k C(k,j)·n_k                the j-th coincidence census
//   X   = X₂ + X≥₃,  X₂ = n_2,  X≥₃ = Σ_{k≥3}(k−1)n_k
// B_2 is cap-12's S₂ = cap-31's P2 (the PAIR channel); B_3 is the TRIPLE term
// of the inclusion–exclusion, which is the m = 3 instrument proper.
// Exact identity (cap-35's I2): S = Σ_{j≥0} (−1)^j B_j with B_0 = N̄, and the
// series TERMINATES at j = max_r m_r(t).
//
// THE MOVES.
//  PART 0  CUSTODY. Full diagonal sweep at @11/@13/@17 (2,310 / 30,030 /
//          510,510 rotations, exhaustive), gated against cap-31's and cap-35's
//          embedded anchored figures. A FAIL here is an instrument fault.
//  PART 1  THE m = 3 INSTRUMENT. B_3(t), X≥₃(t) and X₂(t) as ensemble random
//          variables: mean, sd, corr with S, and the ANCHOR's z — all in E1,
//          all exact by full enumeration, so B_3 sits beside B_2's −0.30 and
//          X's −2.71 on one scale.
//  PART 2  THE BONFERRONI DEPTH LADDER AT THE ANCHOR. Bonferroni truncation of
//          the identity above gives, at every ODD depth J, a deterministic
//          survivor FLOOR  S(0) ≥ Σ_{j≤J} (−1)^j B_j(0).  Depth 1 is the pure
//          strike ledger ("capacity"), depth 3 is the first depth that uses
//          multiplicity 3. Computed exactly at @11..@23 from the anchored
//          spectrum, beside the same ladder at the ensemble mean. Reported with
//          J*(x) = the first odd depth with a positive floor, and with the
//          census price C(K,J*) that a NON-circular evaluation of that depth
//          would cost. This is Brun's sieve at depth J with exact coincidence
//          counts instead of estimated ones (Brun 1919/1920); nothing in it is
//          new, and `paper/wall-note.md` Doors 1 and 4 already name the
//          territory. What is new here is only the measurement of where it dies.
//  PART 3  THE CERTIFICATE LADDER, EXACT, IN E1. From the enumerated ensemble,
//          the optimal certificate on moments 1..d for P(S = 0), for every
//          degree d. On [0,N̄] the Markov–Lukács form makes this a Christoffel
//          function, so the optimum is exact and numerically stable:
//            even d = 2m : p = q(s)²,           bound λ_m  = 1/K_m(0,0)  [dμ]
//            odd  d = 2m+1: p = (1−s)q(s)²,     bound λ̃_m = 1/K̃_m(0,0) [(1−s)dμ]
//          with s = S/N̄ ∈ [0,1] and q(0) = 1. The odd-degree family is exactly
//          the "moments through multiplicity 3" certificate at d = 3: it is the
//          best bound obtainable from E[S], E[S²], E[S³] and nothing else.
//          (The parts of a Lukács certificate that vanish at s = 0 — s·σ₀ at
//          odd degree, s(1−s)σ₁ at even — can only add nonnegative mass, so
//          dropping them costs nothing and these two ladders are the optima.)
//  PART 4  THE ANCHOR. ε·(ensemble cardinality) < 1 is the exact counting
//          condition under which a measure bound decides the anchor. Printed
//          for E1 with its own exact moments and its own cardinality W, and for
//          E3 with its closed-form J₅ variance and its own cardinality
//          exp(θ(y)). Face 1's "factor of 81" is recomputed in both readings.
//  PART 5  THE CAMPAIGN'S OWN CERTIFIED BOUNDS (cap-21's 80× and 4190× at @11,
//          cap-27's 513× at @13), cited from their embedded tails and placed
//          against E2's own cardinality ∏_q q, which is what their counting
//          argument has to beat.
//
// PRE-REGISTERED, written before the file was first executed:
//   R1 B_3's anchored z will land BELOW X's in magnitude at @17, because
//      cap-35's per-cell z at @17 is −4.43 at k = 3 but +1.90 at k = 4 and
//      +10.11 at k = 6, and B_3 sums those cells with weights C(k,3) = 1, 4, 20
//      that favour the POSITIVE cells. Predicted: z(B_3) > 0 at @17.
//   R2 The depth-3 Bonferroni floor is positive at @11, @13 and @17 and turns
//      NEGATIVE at @19, from the @19 spectrum already on record in cap-39.
//      J* = 1, 3, 3, 5, 5 at @11..@23.
//   R3 The degree-3 certificate will not beat the degree-2 one by an order of
//      magnitude: μ₃ of S is small and the third moment enters only through the
//      (1−s) weight. Predicted ratio degree-2/degree-3 below 10 at every level.
//   R4 εW in E1, computed with E1's own variance, will be LARGER than Face 1's
//      81 — the cross-ensemble pairing flatters the gap.
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const pad = (s, n) => String(s).padStart(n);
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function msd(a){const n=a.length;let s=0;for(let i=0;i<n;i++)s+=a[i];const m=s/n;
  let v=0;for(let i=0;i<n;i++){const d=a[i]-m;v+=d*d;}return[m,Math.sqrt(Math.max(0,v/n))];}
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
  let N=0;for(let r=0;r<W;r++)if(A[r])N++;
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const H=qs.reduce((a,q)=>a+2/q,0);
  return {x,W,A,N,qs,K:qs.length,H,basePs,y:qs[qs.length-1]};
}
const rho_of=(L)=>{const o=[];for(let r=0;r<L.W;r++)if(L.A[r])o.push(r);return o;};

// ============================================================================
// PART 0 — FULL DIAGONAL SWEEP (E1). Every rotation, every statistic, exact.
// ============================================================================
function sweep(L){
  const rho=rho_of(L),{W,N,qs,K}=L;
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
  const S=new Float64Array(W),Xa=new Float64Array(W),X2=new Float64Array(W),X3=new Float64Array(W),
        B2=new Float64Array(W),B3=new Float64Array(W),VR=new Float64Array(W),D=new Float64Array(W);
  const mult=new Int32Array(N),touched=new Int32Array(N),cls=new Int32Array(K),h=new Int32Array(K+2);
  const hist=new Float64Array(N+2);          // histogram of S over the ensemble
  let anchH=null,maxm=0;
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
    let hi=0;
    for(let i=0;i<cv;i++){const u=touched[i],m=mult[u];h[m]++;if(m>hi)hi=m;mult[u]=0;}
    h[0]=N-cv;if(hi>maxm)maxm=hi;
    let b2=0,b3=0,x2=0,x3=0;
    for(let k=2;k<=hi;k++){const c=h[k];if(!c)continue;
      b2+=c*k*(k-1)/2;b3+=c*k*(k-1)*(k-2)/6;
      if(k===2)x2+=c;else x3+=c*(k-1);}
    S[t]=N-cv;Xa[t]=M-cv;X2[t]=x2;X3[t]=x3;B2[t]=b2;B3[t]=b3;VR[t]=vr/Vbar;D[t]=dd;
    hist[N-cv]++;
    if(t===0){anchH=Int32Array.from(h.subarray(0,K+2));}
    h.fill(0,0,hi+1);
  }
  return {S,Xa,X2,X3,B2,B3,VR,D,hist,anchH,Vbar,maxm};
}

// cap-31 / cap-35 embedded anchored figures, cited as artifacts (standing
// compute rule: cite embedded artifacts, do not re-derive). Gates, not inputs.
const CUSTODY={
  11:{VR0:0.344,S0:45,X0:28,Xbar:19.26,P20:30,zX:2.25,zP2:0.45,cXS:0.481,ratio:1.4541},
  13:{VR0:0.623,S0:307,X0:452,Xbar:456.18,P20:601,zX:-0.16,zP2:-0.16,cXS:0.908,ratio:0.9908},
  17:{VR0:0.553,S0:3099,X0:10381,Xbar:10947.70,P20:15770,zX:-2.71,zP2:-0.30,cXS:0.987,ratio:0.9482}};

// ============================================================================
// PART 2 helpers — the anchored / ensemble multiplicity spectrum by the u-form.
// mu(v) = #{q : q | v or q | v+2};  m_r(0) = mu(r);  ensemble reads mu on the
// u-line with the triangular weight w(v) (cap-35 I1). O(W log log W).
// ============================================================================
function uform(L){
  const {W,A,N,qs,K}=L;
  const a=new Uint16Array(W),b=new Uint16Array(W);
  for(const q of qs){for(let j=0;j<W;j+=q)a[j]++;for(let j=q-2;j<W;j+=q)b[j]++;}
  const ens=new Float64Array(K+2),anc=new Float64Array(K+2);
  let wp=N,wm=0,tot=0;
  for(let z=0;z<=W-3;z++)if(A[z])wm++;
  for(let v=0;v<W;v++){
    const w=wp+wm;tot+=w;ens[a[v]+b[v]]+=w;
    if(A[v])anc[a[v]+b[v]]++;
    wp-=A[v];const z=W-3-v;if(z>=0)wm-=A[z];
  }
  tot+=N;ens[0]+=N;
  for(let k=0;k<=K+1;k++)ens[k]/=W;
  return {ens,anc,totOK:tot===N*W};
}
// B_j = Sum_k C(k,j) n_k, computed in floating point with exact small binomials
function Bof(h,j){let s=0;for(let k=j;k<h.length;k++){const c=h[k];if(!c)continue;
  let b=1;for(let i=0;i<j;i++)b=b*(k-i)/(i+1);s+=b*c;}return s;}
// Bonferroni partial sums Sum_{j<=J} (-1)^j B_j, J = 0..JMAX
function bonf(h,JMAX){const out=[];let acc=0;
  for(let j=0;j<=JMAX;j++){acc+=(j%2?-1:1)*Bof(h,j);out.push(acc);}return out;}
const logC=(n,k)=>{let s=0;for(let i=0;i<k;i++)s+=Math.log(n-i)-Math.log(i+1);return s;};

// ============================================================================
// PART 3 helpers — the exact optimal moment certificate, as a Christoffel
// function of the empirical measure. Discrete Stieltjes on the atoms of S/N̄.
// lam[m] = min{ Integral p^2 dnu : deg p <= m, p(0) = 1 } = 1 / Sum_{j<=m} pi_j(0)^2/nrm_j.
// With dnu = dmu this bounds P(S=0) at polynomial degree 2m; with
// dnu = (1-s)dmu it bounds it at degree 2m+1.
// ============================================================================
function christoffel(xs,ws,MMAX){
  const n=xs.length;
  let pPrev=new Float64Array(n),pCur=new Float64Array(n).fill(1);
  let nrmPrev=1,nrm=0;for(let i=0;i<n;i++)nrm+=ws[i];
  if(!(nrm>0))return [];
  const lam=[];let acc=1/nrm;                       // pi_0(0)=1
  lam.push(1/acc);
  let p0Prev=0,p0Cur=1;
  for(let m=1;m<=MMAX;m++){
    let al=0;for(let i=0;i<n;i++)al+=ws[i]*xs[i]*pCur[i]*pCur[i];al/=nrm;
    const be=m===1?0:nrm/nrmPrev;
    const pNext=new Float64Array(n);
    for(let i=0;i<n;i++)pNext[i]=(xs[i]-al)*pCur[i]-be*pPrev[i];
    const p0Next=(0-al)*p0Cur-be*p0Prev;
    let nrmNext=0;for(let i=0;i<n;i++)nrmNext+=ws[i]*pNext[i]*pNext[i];
    if(!(nrmNext>0)||!Number.isFinite(nrmNext))break;
    acc+=p0Next*p0Next/nrmNext;
    lam.push(1/acc);
    pPrev=pCur;pCur=pNext;nrmPrev=nrm;nrm=nrmNext;p0Prev=p0Cur;p0Cur=p0Next;
  }
  return lam;
}

// ============================================================================
// PART 4 helpers — the WINDOW ensemble (E3): exact closed-form variance from
// the pair correlation J5, as in natal5-variance.js. Cardinality exp(theta(y)).
// ============================================================================
function windowVar(L){
  const ps=primesUpTo(L.y).filter(p=>p>=7);
  let del=2/30;for(const p of ps)del*=(p-2)/p;
  const Wd=L.W;
  const J5=(d)=>{const m30=((d%30)+30)%30;let v;
    if(m30===0)v=2/30;else if(m30===6||m30===24)v=1/30;else return 0;
    for(const p of ps){const m=d%p;
      if(m===0)v*=(p-2)/p;else if(m===2||m===p-2)v*=(p-3)/p;else v*=(p-4)/p;}
    return v;};
  let Ssum=Wd*J5(0);
  for(const start of [6,24,30]){for(let d=start;d<Wd;d+=30)Ssum+=2*(Wd-d)*J5(d);}
  const E=del*Wd,Var=Ssum-del*del*Wd*Wd;
  let theta=0;for(const p of primesUpTo(L.y))theta+=Math.log(p);
  return {E,Var,theta,delta:del};
}

// ============================================================================
// DRIVER
// ============================================================================
const SWEEP_LEVELS=[11,13,17];
const SPEC_LEVELS=[11,13,17,19,23];
const ROWS={};

console.log('===== PART 0 — CUSTODY: the diagonal sweep reproduces cap-31 / cap-35 =====');
for(const x of SWEEP_LEVELS){
  const t0=Date.now();
  const L=level(x);
  const sw=sweep(L);
  const [mS,sS]=msd(sw.S),[mX,sX]=msd(sw.Xa),[mB2,sB2]=msd(sw.B2),[mB3,sB3]=msd(sw.B3),
        [mX2,sX2]=msd(sw.X2),[mX3,sX3]=msd(sw.X3);
  const c=CUSTODY[x],ok=(a,b,tol)=>Math.abs(a-b)<=tol?'PASS':'FAIL';
  const zX=(sw.Xa[0]-mX)/sX,zB2=(sw.B2[0]-mB2)/sB2,zB3=(sw.B3[0]-mB3)/sB3,
        zS=(sw.S[0]-mS)/sS,zX2=(sw.X2[0]-mX2)/sX2,zX3=(sw.X3[0]-mX3)/sX3;
  console.log(`@${x}: W=${L.W} N̄=${L.N} K=${L.K} (${L.qs[0]}..${L.y}) H=${f(L.H,4)}`);
  console.log(`  VR(0)=${f(sw.VR[0])} [${c.VR0} ${ok(sw.VR[0],c.VR0,0.002)}]  S(0)=${sw.S[0]} [${c.S0} ${ok(sw.S[0],c.S0,0)}]  X(0)=${sw.Xa[0]} [${c.X0} ${ok(sw.Xa[0],c.X0,0)}]  X̄=${f(mX,2)} [${c.Xbar} ${ok(mX,c.Xbar,0.02)}]  X(0)/X̄=${f(sw.Xa[0]/mX,4)} [${c.ratio} ${ok(sw.Xa[0]/mX,c.ratio,0.0005)}]`);
  console.log(`  B_2(0)=${sw.B2[0]} [P2 ${c.P20} ${ok(sw.B2[0],c.P20,0)}]  z(X)=${f(zX,2)} [${c.zX} ${ok(zX,c.zX,0.01)}]  z(B_2)=${f(zB2,2)} [${c.zP2} ${ok(zB2,c.zP2,0.01)}]  corr(X,S)=${f(corr(sw.Xa,sw.S))} [${c.cXS} ${ok(corr(sw.Xa,sw.S),c.cXS,0.001)}]`);
  ROWS[x]={L,sw,mS,sS,mX,sX,mB2,sB2,mB3,sB3,mX2,sX2,mX3,sX3,zS,zX,zX2,zX3,zB2,zB3};
  console.log(`  [level time ${(Date.now()-t0)/1000}s]`);
}

console.log('\n===== PART 1 — THE m = 3 INSTRUMENT, exact over the full E1 ensemble =====');
console.log('  Every column is one random variable on the SAME W-member diagonal ensemble,');
console.log('  so the z-scores below are comparable to each other and to nothing outside E1.');
console.log('  stat |  x  |     anchor |       mean |         sd |  z(anchor) | corr(·,S) | Var share of Var(S)');
for(const x of SWEEP_LEVELS){
  const R=ROWS[x],sw=R.sw;
  const varS=R.sS*R.sS;
  const row=(nm,arr,anch,mn,sd,z)=>{
    const cs=corr(arr,sw.S);
    console.log(`  ${nm.padEnd(4)} | ${pad(x,3)} | ${pad(f(anch,0),10)} | ${pad(f(mn,2),10)} | ${pad(f(sd,2),10)} | ${pad(f(z,2),10)} | ${pad(f(cs,3),9)} | ${f(sd*sd/varS,4)}`);
  };
  row('S',sw.S,sw.S[0],R.mS,R.sS,R.zS);
  row('X',sw.Xa,sw.Xa[0],R.mX,R.sX,R.zX);
  row('X2',sw.X2,sw.X2[0],R.mX2,R.sX2,R.zX2);
  row('X>=3',sw.X3,sw.X3[0],R.mX3,R.sX3,R.zX3);
  row('B_2',sw.B2,sw.B2[0],R.mB2,R.sB2,R.zB2);
  row('B_3',sw.B3,sw.B3[0],R.mB3,R.sB3,R.zB3);
  console.log(`       corr(B_2,B_3) = ${f(corr(sw.B2,sw.B3),4)}   corr(X≥3,S) = ${f(corr(sw.X3,sw.S),4)}   corr(B_3,X) = ${f(corr(sw.B3,sw.Xa),4)}   max_t max_r m_r = ${R.sw.maxm}`);
}
console.log('  R1 CHECK (pre-registered: z(B_3) > 0 at @17):',ROWS[17].zB3>0?'HELD':'BROKEN',` z(B_3)@17 = ${f(ROWS[17].zB3,2)}`);

console.log('\n===== PART 2 — THE BONFERRONI DEPTH LADDER AT THE ANCHOR =====');
console.log('  S(0) >= Sum_{j<=J} (-1)^j B_j(0) at every ODD J (Bonferroni). J = 1 is the');
console.log('  pure strike ledger N̄ − M; J = 3 is the first depth that uses multiplicity 3.');
console.log('  The same partial sums at the ensemble MEAN are printed beside them.');
const SPEC={};
for(const x of SPEC_LEVELS){
  const t0=Date.now();
  const L=level(x);
  const U=uform(L);
  const JMAX=Math.min(L.K,14);
  const bA=bonf(U.anc,JMAX),bE=bonf(U.ens,JMAX);
  let maxmA=0;for(let k=U.anc.length-1;k>=0;k--)if(U.anc[k]>0){maxmA=k;break;}
  let maxmE=0;for(let k=U.ens.length-1;k>=0;k--)if(U.ens[k]>1e-12){maxmE=k;break;}
  const S0=U.anc[0];
  let Jstar=null;
  for(let J=1;J<=JMAX;J+=2)if(bA[J]>0){Jstar=J;break;}
  let uGate='';
  if(ROWS[x]){let bad=0;const ah=ROWS[x].sw.anchH;
    for(let k=0;k<ah.length;k++)if(ah[k]!==U.anc[k])bad++;
    uGate=`  [u-form anchored spectrum vs sweep: ${bad===0?'PASS':'FAIL('+bad+')'}]`;}
  const big=(v)=>Math.abs(v)>=1e9?v.toExponential(3):f(v,2);
  console.log(`\n  @${x}: W=${L.W} N̄=${L.N} K=${L.K} S(0)=${S0}  weight identity ${U.totOK?'PASS':'FAIL'}  max m anchored=${maxmA} ensemble=${maxmE}${uGate}`);
  console.log(`     J |        B_J(0) |  anchored floor | floor/S(0) |   ensemble-mean floor |  census price C(K,J)`);
  for(let J=1;J<=Math.min(JMAX,9);J++){
    const tag=J%2?'floor':'(cap)';
    console.log(`    ${pad(J,2)} | ${pad(f(Bof(U.anc,J),0),13)} | ${pad(f(bA[J],0),15)} | ${pad(f(bA[J]/S0,4),10)} | ${pad(big(bE[J]),21)} | ${J<=L.K?'e^'+f(logC(L.K,J),2):'—'}   ${tag}`);
  }
  console.log(`    J*(${x}) = first odd depth with a positive anchored floor: ${Jstar===null?'none by J='+JMAX:Jstar}  ` +
              (Jstar!==null?`floor ${f(bA[Jstar],0)} = ${f(100*bA[Jstar]/S0,1)}% of truth, census price C(${L.K},${Jstar}) = e^${f(logC(L.K,Jstar),2)} = ${Math.exp(logC(L.K,Jstar)).toExponential(3)}`:''));
  SPEC[x]={L,U,bA,bE,Jstar,S0,maxmA,maxmE};
  console.log(`    [level time ${(Date.now()-t0)/1000}s]`);
}
console.log('\n  LADDER SUMMARY');
console.log('   x |  N̄        |  S(0)     | depth-1 floor | depth-3 floor | depth-3/S(0) |  J* | max m(0) | C(K,J*)');
for(const x of SPEC_LEVELS){const s=SPEC[x];
  console.log(`  ${pad(x,2)} | ${pad(s.L.N,9)} | ${pad(s.S0,9)} | ${pad(f(s.bA[1],0),13)} | ${pad(f(s.bA[3],0),13)} | ${pad(f(s.bA[3]/s.S0,4),12)} | ${pad(s.Jstar===null?'—':s.Jstar,3)} | ${pad(s.maxmA,8)} | ${s.Jstar===null?'—':Math.exp(logC(s.L.K,s.Jstar)).toExponential(3)}`);}
console.log('  R2 CHECK (pre-registered J* = 1,3,3,5,5 at @11..@23):',
  SPEC_LEVELS.map(x=>SPEC[x].Jstar).join(','),
  SPEC_LEVELS.map(x=>SPEC[x].Jstar).join(',')==='1,3,3,5,5'?'HELD':'BROKEN');

console.log('\n===== PART 3 — THE CERTIFICATE LADDER, EXACT, IN E1 =====');
console.log('  bound(d) = the OPTIMAL certificate on moments 1..d for P(S = 0) over the');
console.log('  W-member diagonal ensemble, by Markov–Lukács. Degree 2 is Chebyshev/Cantelli;');
console.log('  degree 3 is the multiplicity-3 (third-moment) certificate; degree 4 and 6 are');
console.log('  cap-21 territory. εW < 1 is the exact condition for deciding the anchor in E1.');
const CERT={};
for(const x of SWEEP_LEVELS){
  const R=ROWS[x],L=R.L,W=L.W,N=L.N;
  const xs=[],ws=[],wsB=[];
  for(let v=0;v<=N;v++){const c=R.sw.hist[v];if(!c)continue;const s=v/N;xs.push(s);ws.push(c/W);wsB.push((1-s)*c/W);}
  let minS=0;for(let v=0;v<=N;v++)if(R.sw.hist[v]){minS=v;break;}
  const MM=6;
  const lamE=christoffel(xs,ws,MM),lamO=christoffel(xs,wsB,MM);
  // moments, exact from the histogram (scaled, so no overflow)
  let m1=0,m2=0,m3=0;for(let i=0;i<xs.length;i++){m1+=ws[i]*xs[i];m2+=ws[i]*xs[i]*xs[i];m3+=ws[i]*xs[i]*xs[i]*xs[i];}
  const mu=m1,va=m2-m1*m1,mu3=m3-3*m1*m2+2*m1*m1*m1;
  console.log(`\n  @${x}: W=${W} N̄=${N}  S̄=${f(R.mS,2)} σ_S=${f(R.sS,2)} min S=${minS} (${f((minS-R.mS)/R.sS,2)}σ)  skew μ₃/σ³ = ${f(mu3/Math.pow(va,1.5),4)}`);
  console.log('    degree | family        | bound ε         |    ln ε |     εW     | vs Chebyshev | decides anchor in E1?');
  const rows=[];
  for(let d=1;d<=2*MM+1;d++){
    const m=Math.floor(d/2),v=(d%2)?(lamO[m]!==undefined?lamO[m]:NaN):(lamE[m]!==undefined?lamE[m]:NaN);
    if(!Number.isFinite(v)||v<=0)continue;
    rows.push({d,v,fam:(d%2)?'(1−s)·q(s)²':'q(s)²'});
  }
  const cheb=rows.find(r=>r.d===2);
  for(const r of rows){
    console.log(`      ${pad(r.d,4)} | ${r.fam.padEnd(13)} | ${pad(r.v.toExponential(4),15)} | ${pad(f(Math.log(r.v),2),7)} | ${pad((r.v*W).toExponential(3),10)} | ${pad(f(cheb.v/r.v,1)+'×',12)} | ${r.v*W<1?'YES':'no'}`);
  }
  const d3=rows.find(r=>r.d===3);
  const firstDecide=rows.find(r=>r.v*W<1);
  console.log(`    degree-2 / degree-3 ratio = ${f(cheb.v/d3.v,3)}   [R3 predicted < 10: ${cheb.v/d3.v<10?'HELD':'BROKEN'}]`);
  console.log(`    first degree with εW < 1 in E1: ${firstDecide?firstDecide.d:'none through degree '+(2*MM+1)}`);
  CERT[x]={rows,cheb,d3,firstDecide,minS};
}

console.log('\n===== PART 4 — DOES ANY OF IT REACH THE ANCHOR? =====');
console.log('  The counting condition is ε·|ensemble| < 1: a bound admitting an exceptional');
console.log('  fraction ε admits ε·|ensemble| exceptional members and names none of them.');
console.log('  E1 (diagonal) has exactly W members. E3 (window) has exp(θ(y)) members.');
console.log('  Face 1 quotes ε from E3 against the cardinality W of E1; both self-consistent');
console.log('  readings are printed here.');
console.log('\n   x |     W      | E3: E(x)   |  E3 Var  | E3 ε=Var/E² | E3 εW (Face 1 form) | θ(y)=ln|E3| | E3 ε·|E3| (ln) | E1 ε=Var/E² | E1 εW');
for(const x of [11,13,17,19]){
  const L=level(x);
  const wv=windowVar(L);
  const epsE3=wv.Var/(wv.E*wv.E);
  const R=ROWS[x];
  const e1=R?(R.sS*R.sS)/(R.mS*R.mS):NaN;
  console.log(`  ${pad(x,2)} | ${pad(L.W,10)} | ${pad(f(wv.E,2),10)} | ${pad(f(wv.Var,1),8)} | ${pad(epsE3.toExponential(3),11)} | ${pad(f(epsE3*L.W,2),19)} | ${pad(f(wv.theta,1),11)} | ${pad(f(Math.log(epsE3)+wv.theta,1),14)} | ${pad(Number.isFinite(e1)?e1.toExponential(3):'not enumerated',11)} | ${Number.isFinite(e1)?f(e1*L.W,1):'—'}`);
}
console.log('\n  R4 CHECK (pre-registered: E1 εW exceeds Face 1\'s 81):');
for(const x of SWEEP_LEVELS){const R=ROWS[x];const e1=(R.sS*R.sS)/(R.mS*R.mS);
  console.log(`    @${x}: E1 εW = ${f(e1*R.L.W,1)}`);}
console.log('\n  THE DECIDING DEGREE, both readings. From the measured E1 ladder decay rate');
console.log('  (ln ε per two degrees), the degree at which ε·|ensemble| would cross 1:');
for(const x of SWEEP_LEVELS){
  const C=CERT[x],L=ROWS[x].L,wv=windowVar(L);
  const r2=C.rows.find(r=>r.d===2),r6=C.rows.find(r=>r.d===6);
  const rate=r6?(Math.log(r2.v)-Math.log(r6.v))/2:NaN;   // nats gained per two degrees
  const needE1=Math.max(0,(Math.log(r2.v)+Math.log(L.W)))/rate*2+2;
  const needE3=Math.max(0,(Math.log(wv.Var/(wv.E*wv.E))+wv.theta))/rate*2+2;
  console.log(`    @${x}: ladder rate ${f(rate,3)} nats per two degrees | E1 (needs ε<1/W): degree ${C.firstDecide?C.firstDecide.d+' (measured)':f(needE1,0)+' (extrapolated)'} | E3 (needs ε<e^−θ(y)=e^−${f(wv.theta,1)}): degree ≈ ${f(needE3,0)} (extrapolated)`);
}

// ---------------------------------------------------------------------------
// PART 5 — THE CAMPAIGN'S OWN CERTIFIED BOUNDS, PLACED AGAINST THEIR OWN
// ENSEMBLE'S CARDINALITY. cap-21 and cap-27 certify over E2 (independent
// strike classes), whose cardinality is ∏_q q, not W. The ε values below are
// CITED ARTIFACTS from those files' embedded tails, not recomputed here
// (standing compute rule); only ln|E2| and the product are computed.
// ---------------------------------------------------------------------------
const PUBLISHED=[
  {x:11,name:'Chebyshev / Cantelli        [cap-21 Thm 2]',eps:6.24e-3},
  {x:11,name:'optimal quartic-square      [cap-21 Thm 2]',eps:7.80e-5},
  {x:11,name:'optimal moments 1..6        [cap-21 Thm 2]',eps:1.49e-6},
  {x:13,name:'Chebyshev / Cantelli        [cap-21 setting]',eps:9.74e-4},
  {x:13,name:'fourth moment, exact T4     [cap-27]',eps:1.898e-6},
  {x:17,name:'Chebyshev / Cantelli        [cap-21 setting]',eps:1.01e-4},
];
console.log('\n  THE CAMPAIGN\'S CERTIFIED ENSEMBLE BOUNDS, AGAINST E2\'S OWN CARDINALITY');
console.log('   x |  ln|E2| = Σ ln q | bound (cited)                                  |     ε      | ln(ε·|E2|) | decides anchor in E2?');
for(const P of PUBLISHED){
  const L=level(P.x);let lnE2=0;for(const q of L.qs)lnE2+=Math.log(q);
  const lg=Math.log(P.eps)+lnE2;
  console.log(`  ${pad(P.x,2)} | ${pad(f(lnE2,1),16)} | ${P.name.padEnd(46)} | ${pad(P.eps.toExponential(2),10)} | ${pad(f(lg,1),10)} | ${lg<0?'YES':'no'}`);
}
console.log(`\n[total ${(Date.now()-T00)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-multiplicity3-01.js
//   invocation:  node research/attack-multiplicity3-01.js
//   code-sha256: 394631043bac6d674ffad05be5531b79757f8d6881e46616110cf672f354a987
//   out-sha256:  d92d75fd2f7436ef39e4890420f4ed9924d98da0e6d9d377433ad0691ad9c7ab
//   body-lines:  219
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     61.7 s
// ============================================================================
// ===== PART 0 — CUSTODY: the diagonal sweep reproduces cap-31 / cap-35 =====
// @11: W=2310 N̄=90 K=10 (13..47) H=0.7891
//   VR(0)=0.344 [0.344 PASS]  S(0)=45 [45 PASS]  X(0)=28 [28 PASS]  X̄=19.26 [19.26 PASS]  X(0)/X̄=1.4541 [1.4541 PASS]
//   B_2(0)=30 [P2 30 PASS]  z(X)=2.25 [2.25 PASS]  z(B_2)=0.45 [0.45 PASS]  corr(X,S)=0.481 [0.481 PASS]
//   [level time 0.011s]
// @13: W=30030 N̄=990 K=34 (17..173) H=1.1468
//   VR(0)=0.623 [0.623 PASS]  S(0)=307 [307 PASS]  X(0)=452 [452 PASS]  X̄=456.18 [456.18 PASS]  X(0)/X̄=0.9908 [0.9908 PASS]
//   B_2(0)=601 [P2 601 PASS]  z(X)=-0.16 [-0.16 PASS]  z(B_2)=-0.16 [-0.16 PASS]  corr(X,S)=0.908 [0.908 PASS]
//   [level time 0.207s]
// @17: W=510510 N̄=14850 K=120 (19..709) H=1.4938
//   VR(0)=0.553 [0.553 PASS]  S(0)=3099 [3099 PASS]  X(0)=10381 [10381 PASS]  X̄=10947.70 [10947.7 PASS]  X(0)/X̄=0.9482 [0.9482 PASS]
//   B_2(0)=15770 [P2 15770 PASS]  z(X)=-2.71 [-2.71 PASS]  z(B_2)=-0.30 [-0.3 PASS]  corr(X,S)=0.987 [0.987 PASS]
//   [level time 56.594s]
//
// ===== PART 1 — THE m = 3 INSTRUMENT, exact over the full E1 ensemble =====
//   Every column is one random variable on the SAME W-member diagonal ensemble,
//   so the z-scores below are comparable to each other and to nothing outside E1.
//   stat |  x  |     anchor |       mean |         sd |  z(anchor) | corr(·,S) | Var share of Var(S)
//   S    |  11 |         45 |      38.24 |       3.70 |       1.83 |     1.000 | 1.0000
//   X    |  11 |         28 |      19.26 |       3.88 |       2.25 |     0.481 | 1.1009
//   X2   |  11 |         24 |      13.29 |       3.53 |       3.03 |     0.280 | 0.9109
//   X>=3 |  11 |          4 |       5.96 |       3.66 |      -0.54 |     0.241 | 0.9756
//   B_2  |  11 |         30 |      24.88 |      11.31 |       0.45 |     0.210 | 9.3274
//   B_3  |  11 |          2 |      12.29 |      31.92 |      -0.32 |     0.020 | 74.3642
//        corr(B_2,B_3) = 0.9166   corr(X≥3,S) = 0.2409   corr(B_3,X) = 0.2291   max_t max_r m_r = 10
//   S    |  13 |        307 |     310.88 |      25.03 |      -0.16 |     1.000 | 1.0000
//   X    |  13 |        452 |     456.18 |      25.86 |      -0.16 |     0.908 | 1.0678
//   X2   |  13 |        249 |     245.84 |      16.78 |       0.19 |     0.515 | 0.4495
//   X>=3 |  13 |        203 |     210.34 |      21.77 |      -0.34 |     0.682 | 0.7564
//   B_2  |  13 |        601 |     621.63 |     125.06 |      -0.16 |     0.049 | 24.9657
//   B_3  |  13 |        182 |     543.37 |    1473.61 |      -0.25 |    -0.262 | 3466.2417
//        corr(B_2,B_3) = 0.9404   corr(X≥3,S) = 0.6818   corr(B_3,X) = -0.2034   max_t max_r m_r = 34
//   S    |  17 |       3099 |    3614.93 |     207.53 |      -2.49 |     1.000 | 1.0000
//   X    |  17 |      10381 |   10947.70 |     208.93 |      -2.71 |     0.987 | 1.0136
//   X2   |  17 |       3820 |    4327.46 |     189.38 |      -2.68 |     0.135 | 0.8327
//   X>=3 |  17 |       6561 |    6620.24 |     261.96 |      -0.23 |     0.689 | 1.5933
//   B_2  |  17 |      15770 |   16201.25 |    1453.37 |      -0.30 |    -0.235 | 49.0451
//   B_3  |  17 |       7137 |   22341.04 |   65475.82 |      -0.23 |    -0.509 | 99541.4736
//        corr(B_2,B_3) = 0.9453   corr(X≥3,S) = 0.6893   corr(B_3,X) = -0.4919   max_t max_r m_r = 120
//   R1 CHECK (pre-registered: z(B_3) > 0 at @17): BROKEN  z(B_3)@17 = -0.23
//
// ===== PART 2 — THE BONFERRONI DEPTH LADDER AT THE ANCHOR =====
//   S(0) >= Sum_{j<=J} (-1)^j B_j(0) at every ODD J (Bonferroni). J = 1 is the
//   pure strike ledger N̄ − M; J = 3 is the first depth that uses multiplicity 3.
//   The same partial sums at the ensemble MEAN are printed beside them.
//
//   @11: W=2310 N̄=90 K=10 S(0)=45  weight identity PASS  max m anchored=3 ensemble=10  [u-form anchored spectrum vs sweep: PASS]
//      J |        B_J(0) |  anchored floor | floor/S(0) |   ensemble-mean floor |  census price C(K,J)
//      1 |            73 |              17 |     0.3778 |                 18.98 | e^2.30   floor
//      2 |            30 |              47 |     1.0444 |                 43.86 | e^3.81   (cap)
//      3 |             2 |              45 |     1.0000 |                 31.57 | e^4.79   floor
//      4 |             0 |              45 |     1.0000 |                 48.06 | e^5.35   (cap)
//      5 |             0 |              45 |     1.0000 |                 28.42 | e^5.53   floor
//      6 |             0 |              45 |     1.0000 |                 44.78 | e^5.35   (cap)
//      7 |             0 |              45 |     1.0000 |                 35.43 | e^4.79   floor
//      8 |             0 |              45 |     1.0000 |                 38.94 | e^3.81   (cap)
//      9 |             0 |              45 |     1.0000 |                 38.16 | e^2.30   floor
//     J*(11) = first odd depth with a positive anchored floor: 1  floor 17 = 37.8% of truth, census price C(10,1) = e^2.30 = 1.000e+1
//     [level time 0.001s]
//
//   @13: W=30030 N̄=990 K=34 S(0)=307  weight identity PASS  max m anchored=5 ensemble=34  [u-form anchored spectrum vs sweep: PASS]
//      J |        B_J(0) |  anchored floor | floor/S(0) |   ensemble-mean floor |  census price C(K,J)
//      1 |          1135 |            -145 |    -0.4723 |               -145.30 | e^3.53   floor
//      2 |           601 |             456 |     1.4853 |                476.33 | e^6.33   (cap)
//      3 |           182 |             274 |     0.8925 |                -67.03 | e^8.70   floor
//      4 |            34 |             308 |     1.0033 |               3009.27 | e^10.74   (cap)
//      5 |             1 |             307 |     1.0000 |             -15337.64 | e^12.54   floor
//      6 |             0 |             307 |     1.0000 |              73337.34 | e^14.11   (cap)
//      7 |             0 |             307 |     1.0000 |            -281362.61 | e^15.50   floor
//      8 |             0 |             307 |     1.0000 |             915749.74 | e^16.71   (cap)
//      9 |             0 |             307 |     1.0000 |           -2542574.83 | e^17.78   floor
//     J*(13) = first odd depth with a positive anchored floor: 3  floor 274 = 89.3% of truth, census price C(34,3) = e^8.70 = 5.984e+3
//     [level time 0.003s]
//
//   @17: W=510510 N̄=14850 K=120 S(0)=3099  weight identity PASS  max m anchored=6 ensemble=120  [u-form anchored spectrum vs sweep: PASS]
//      J |        B_J(0) |  anchored floor | floor/S(0) |   ensemble-mean floor |  census price C(K,J)
//      1 |         22132 |           -7282 |    -2.3498 |              -7332.77 | e^4.79   floor
//      2 |         15770 |            8488 |     2.7389 |               8868.48 | e^8.87   (cap)
//      3 |          7137 |            1351 |     0.4359 |             -13472.55 | e^12.55   floor
//      4 |          2056 |            3407 |     1.0994 |             465687.51 | e^15.92   (cap)
//      5 |           349 |            3058 |     0.9868 |          -10621698.02 | e^19.07   floor
//      6 |            41 |            3099 |     1.0000 |          201884504.93 | e^22.02   (cap)
//      7 |             0 |            3099 |     1.0000 |             -3.259e+9 | e^24.81   floor
//      8 |             0 |            3099 |     1.0000 |             4.563e+10 | e^27.46   (cap)
//      9 |             0 |            3099 |     1.0000 |            -5.627e+11 | e^29.98   floor
//     J*(17) = first odd depth with a positive anchored floor: 3  floor 1351 = 43.6% of truth, census price C(120,3) = e^12.55 = 2.808e+5
//     [level time 0.012s]
//
//   @19: W=9699690 N̄=252450 K=435 S(0)=38380  weight identity PASS  max m anchored=7 ensemble=435
//      J |        B_J(0) |  anchored floor | floor/S(0) |   ensemble-mean floor |  census price C(K,J)
//      1 |        450695 |         -198245 |    -5.1653 |            -198341.05 | e^6.08   floor
//      2 |        395426 |          197181 |     5.1376 |             199133.47 | e^11.46   (cap)
//      3 |        225930 |          -28749 |    -0.7491 |            -703495.21 | e^16.43   floor
//      4 |         84756 |           56007 |     1.4593 |           75945715.94 | e^21.11   (cap)
//      5 |         20689 |           35318 |     0.9202 |             -6.526e+9 | e^25.57   floor
//      6 |          3160 |           38478 |     1.0026 |             4.666e+11 | e^29.84   (cap)
//      7 |            98 |           38380 |     1.0000 |            -2.853e+13 | e^33.95   floor
//      8 |             0 |           38380 |     1.0000 |             1.523e+15 | e^37.93   (cap)
//      9 |             0 |           38380 |     1.0000 |            -7.208e+16 | e^41.79   floor
//     J*(19) = first odd depth with a positive anchored floor: 5  floor 35318 = 92.0% of truth, census price C(435,5) = e^25.57 = 1.268e+11
//     [level time 0.115s]
//
//   @23: W=223092870 N̄=5301450 K=1739 S(0)=597475  weight identity PASS  max m anchored=9 ensemble=1739
//      J |        B_J(0) |  anchored floor | floor/S(0) |   ensemble-mean floor |  census price C(K,J)
//      1 |      10883167 |        -5581717 |    -9.3422 |           -5580263.00 | e^7.46   floor
//      2 |      11044311 |         5462594 |     9.1428 |            5501038.86 | e^14.23   (cap)
//      3 |       7317321 |        -1854727 |    -3.1043 |          -42661050.46 | e^20.59   floor
//      4 |       3254871 |         1400144 |     2.3434 |             1.801e+10 | e^26.66   (cap)
//      5 |        975160 |          424984 |     0.7113 |            -6.245e+12 | e^32.51   floor
//      6 |        187599 |          612583 |     1.0253 |             1.804e+15 | e^38.18   (cap)
//      7 |         15517 |          597066 |     0.9993 |            -4.463e+17 | e^43.69   floor
//      8 |           411 |          597477 |     1.0000 |             9.656e+19 | e^49.07   (cap)
//      9 |             2 |          597475 |     1.0000 |            -1.856e+22 | e^54.33   floor
//     J*(23) = first odd depth with a positive anchored floor: 5  floor 424984 = 71.1% of truth, census price C(1739,5) = e^32.51 = 1.318e+14
//     [level time 3.719s]
//
//   LADDER SUMMARY
//    x |  N̄        |  S(0)     | depth-1 floor | depth-3 floor | depth-3/S(0) |  J* | max m(0) | C(K,J*)
//   11 |        90 |        45 |            17 |            45 |       1.0000 |   1 |        3 | 1.000e+1
//   13 |       990 |       307 |          -145 |           274 |       0.8925 |   3 |        5 | 5.984e+3
//   17 |     14850 |      3099 |         -7282 |          1351 |       0.4359 |   3 |        6 | 2.808e+5
//   19 |    252450 |     38380 |       -198245 |        -28749 |      -0.7491 |   5 |        7 | 1.268e+11
//   23 |   5301450 |    597475 |      -5581717 |      -1854727 |      -3.1043 |   5 |        9 | 1.318e+14
//   R2 CHECK (pre-registered J* = 1,3,3,5,5 at @11..@23): 1,3,3,5,5 HELD
//
// ===== PART 3 — THE CERTIFICATE LADDER, EXACT, IN E1 =====
//   bound(d) = the OPTIMAL certificate on moments 1..d for P(S = 0) over the
//   W-member diagonal ensemble, by Markov–Lukács. Degree 2 is Chebyshev/Cantelli;
//   degree 3 is the multiplicity-3 (third-moment) certificate; degree 4 and 6 are
//   cap-21 territory. εW < 1 is the exact condition for deciding the anchor in E1.
//
//   @11: W=2310 N̄=90  S̄=38.24 σ_S=3.70 min S=28 (-2.77σ)  skew μ₃/σ³ = 0.2125
//     degree | family        | bound ε         |    ln ε |     εW     | vs Chebyshev | decides anchor in E1?
//          1 | (1−s)·q(s)²   |       5.7513e-1 |   -0.55 |   1.329e+3 |         0.0× | no
//          2 | q(s)²         |       9.2862e-3 |   -4.68 |   2.145e+1 |         1.0× | no
//          3 | (1−s)·q(s)²   |       5.3058e-3 |   -5.24 |   1.226e+1 |         1.8× | no
//          4 | q(s)²         |       1.6055e-4 |   -8.74 |   3.709e-1 |        57.8× | YES
//          5 | (1−s)·q(s)²   |       9.2177e-5 |   -9.29 |   2.129e-1 |       100.7× | YES
//          6 | q(s)²         |       3.4045e-6 |  -12.59 |   7.864e-3 |      2727.7× | YES
//          7 | (1−s)·q(s)²   |       1.9339e-6 |  -13.16 |   4.467e-3 |      4801.9× | YES
//          8 | q(s)²         |       8.3315e-8 |  -16.30 |   1.925e-4 |    111458.5× | YES
//          9 | (1−s)·q(s)²   |       4.7575e-8 |  -16.86 |   1.099e-4 |    195189.9× | YES
//         10 | q(s)²         |       2.0029e-9 |  -20.03 |   4.627e-6 |   4636281.4× | YES
//         11 | (1−s)·q(s)²   |       1.1443e-9 |  -20.59 |   2.643e-6 |   8115061.1× | YES
//         12 | q(s)²         |      5.0840e-11 |  -23.70 |   1.174e-7 | 182655498.1× | YES
//         13 | (1−s)·q(s)²   |      2.9010e-11 |  -24.26 |   6.701e-8 | 320101428.4× | YES
//     degree-2 / degree-3 ratio = 1.750   [R3 predicted < 10: HELD]
//     first degree with εW < 1 in E1: 4
//
//   @13: W=30030 N̄=990  S̄=310.88 σ_S=25.03 min S=248 (-2.51σ)  skew μ₃/σ³ = -0.1433
//     degree | family        | bound ε         |    ln ε |     εW     | vs Chebyshev | decides anchor in E1?
//          1 | (1−s)·q(s)²   |       6.8598e-1 |   -0.38 |   2.060e+4 |         0.0× | no
//          2 | q(s)²         |       6.4403e-3 |   -5.05 |   1.934e+2 |         1.0× | no
//          3 | (1−s)·q(s)²   |       4.4614e-3 |   -5.41 |   1.340e+2 |         1.4× | no
//          4 | q(s)²         |       5.3689e-5 |   -9.83 |   1.612e+0 |       120.0× | no
//          5 | (1−s)·q(s)²   |       3.6911e-5 |  -10.21 |   1.108e+0 |       174.5× | no
//          6 | q(s)²         |       5.8195e-7 |  -14.36 |   1.748e-2 |     11066.6× | YES
//          7 | (1−s)·q(s)²   |       3.9777e-7 |  -14.74 |   1.194e-2 |     16191.0× | YES
//          8 | q(s)²         |       7.7009e-9 |  -18.68 |   2.313e-4 |    836300.6× | YES
//          9 | (1−s)·q(s)²   |       5.2426e-9 |  -19.07 |   1.574e-4 |   1228445.0× | YES
//         10 | q(s)²         |      1.1237e-10 |  -22.91 |   3.374e-6 |  57315385.1× | YES
//         11 | (1−s)·q(s)²   |      7.6357e-11 |  -23.30 |   2.293e-6 |  84344437.4× | YES
//         12 | q(s)²         |      1.6187e-12 |  -27.15 |   4.861e-8 | 3978739926.5× | YES
//         13 | (1−s)·q(s)²   |      1.1011e-12 |  -27.53 |   3.307e-8 | 5848862036.7× | YES
//     degree-2 / degree-3 ratio = 1.444   [R3 predicted < 10: HELD]
//     first degree with εW < 1 in E1: 6
//
//   @17: W=510510 N̄=14850  S̄=3614.93 σ_S=207.53 min S=3033 (-2.80σ)  skew μ₃/σ³ = -0.4920
//     degree | family        | bound ε         |    ln ε |     εW     | vs Chebyshev | decides anchor in E1?
//          1 | (1−s)·q(s)²   |       7.5657e-1 |   -0.28 |   3.862e+5 |         0.0× | no
//          2 | q(s)²         |       3.2850e-3 |   -5.72 |   1.677e+3 |         1.0× | no
//          3 | (1−s)·q(s)²   |       2.5123e-3 |   -5.99 |   1.283e+3 |         1.3× | no
//          4 | q(s)²         |       1.6897e-5 |  -10.99 |   8.626e+0 |       194.4× | no
//          5 | (1−s)·q(s)²   |       1.2856e-5 |  -11.26 |   6.563e+0 |       255.5× | no
//          6 | q(s)²         |       9.0313e-8 |  -16.22 |   4.611e-2 |     36372.8× | YES
//          7 | (1−s)·q(s)²   |       6.8545e-8 |  -16.50 |   3.499e-2 |     47923.9× | YES
//          8 | q(s)²         |      5.4895e-10 |  -21.32 |   2.802e-4 |   5984032.7× | YES
//          9 | (1−s)·q(s)²   |      4.1657e-10 |  -21.60 |   2.127e-4 |   7885739.5× | YES
//         10 | q(s)²         |      3.8574e-12 |  -26.28 |   1.969e-6 | 851608161.7× | YES
//         11 | (1−s)·q(s)²   |      2.9074e-12 |  -26.56 |   1.484e-6 | 1129869990.0× | YES
//         12 | q(s)²         |      2.9064e-14 |  -31.17 |   1.484e-8 | 113023020250.6× | YES
//         13 | (1−s)·q(s)²   |      2.1870e-14 |  -31.45 |   1.116e-8 | 150202143039.3× | YES
//     degree-2 / degree-3 ratio = 1.308   [R3 predicted < 10: HELD]
//     first degree with εW < 1 in E1: 6
//
// ===== PART 4 — DOES ANY OF IT REACH THE ANCHOR? =====
//   The counting condition is ε·|ensemble| < 1: a bound admitting an exceptional
//   fraction ε admits ε·|ensemble| exceptional members and names none of them.
//   E1 (diagonal) has exactly W members. E3 (window) has exp(θ(y)) members.
//   Face 1 quotes ε from E3 against the cardinality W of E1; both self-consistent
//   readings are printed here.
//
//    x |     W      | E3: E(x)   |  E3 Var  | E3 ε=Var/E² | E3 εW (Face 1 form) | θ(y)=ln|E3| | E3 ε·|E3| (ln) | E1 ε=Var/E² | E1 εW
//   11 |       2310 |      39.27 |     10.1 |    6.525e-3 |               15.07 |        41.0 |           35.9 |    9.373e-3 | 21.7
//   13 |      30030 |     304.28 |     91.1 |    9.843e-4 |               29.56 |       157.1 |          150.2 |    6.482e-3 | 194.7
//   17 |     510510 |    3245.51 |   1060.5 |    1.007e-4 |               51.40 |       679.6 |          670.4 |    3.296e-3 | 1682.5
//   19 |    9699690 |   41441.19 |  14392.6 |    8.381e-6 |               81.29 |      3036.7 |         3025.0 | not enumerated | —
//
//   R4 CHECK (pre-registered: E1 εW exceeds Face 1's 81):
//     @11: E1 εW = 21.7
//     @13: E1 εW = 194.7
//     @17: E1 εW = 1682.5
//
//   THE DECIDING DEGREE, both readings. From the measured E1 ladder decay rate
//   (ln ε per two degrees), the degree at which ε·|ensemble| would cross 1:
//     @11: ladder rate 3.956 nats per two degrees | E1 (needs ε<1/W): degree 4 (measured) | E3 (needs ε<e^−θ(y)=e^−41.0): degree ≈ 20 (extrapolated)
//     @13: ladder rate 4.656 nats per two degrees | E1 (needs ε<1/W): degree 6 (measured) | E3 (needs ε<e^−θ(y)=e^−157.1): degree ≈ 67 (extrapolated)
//     @17: ladder rate 5.251 nats per two degrees | E1 (needs ε<1/W): degree 6 (measured) | E3 (needs ε<e^−θ(y)=e^−679.6): degree ≈ 257 (extrapolated)
//
//   THE CAMPAIGN'S CERTIFIED ENSEMBLE BOUNDS, AGAINST E2'S OWN CARDINALITY
//    x |  ln|E2| = Σ ln q | bound (cited)                                  |     ε      | ln(ε·|E2|) | decides anchor in E2?
//   11 |             33.2 | Chebyshev / Cantelli        [cap-21 Thm 2]     |    6.24e-3 |       28.1 | no
//   11 |             33.2 | optimal quartic-square      [cap-21 Thm 2]     |    7.80e-5 |       23.8 | no
//   11 |             33.2 | optimal moments 1..6        [cap-21 Thm 2]     |    1.49e-6 |       19.8 | no
//   13 |            146.8 | Chebyshev / Cantelli        [cap-21 setting]   |    9.74e-4 |      139.8 | no
//   13 |            146.8 | fourth moment, exact T4     [cap-27]           |    1.90e-6 |      133.6 | no
//   17 |            666.4 | Chebyshev / Cantelli        [cap-21 setting]   |    1.01e-4 |      657.2 | no
//
// [total 61.566s]
// ============================================================================
// READINGS
//
