// ============================================================================
// ATTACK 28 — THE CERTIFICATE ENGINE: one proven head theorem, two unproven ingredients, and the deep-level predictions they condition
// (2026-08-14. Companion prose: certificate-engine.md.
//  Executes natal-cap-24's named next steps (ii)+(iii): close the
// two numerical dependencies of bound_pred(K) — cap2's closed form and the
// stable -3-4% deep-K deviation — then evaluate the certificate at levels no
// march can reach. Composes cap-08 (cap2 definition, §7), cap-12 (Window
// Dilation Lemma L1), cap-24 (bound(K) machinery, verbatim), cap-25 (2·3^k
// discrepancy lemma).)
// ============================================================================
//
// RESULT 1 — CERTIFIED-HEAD THEOREM (cap2 closed form, PROVEN for the head).
// cap2(q) = s(q) + #{2<=m<=A: qm in comb_A} + #{2<=m<=B: qm in comb_B}, where
// comb_A = {v: v=11,17 (30), v != -2 (p), 7<=p<=x}, comb_B = {v: v=13,19 (30),
// v != 2 (p)}, A=(W-1)/q, B=(W+1)/q (floors), plus lpf(m)>=q. In m-coordinates
// each side is a NATAL-TYPE comb (2 unit classes mod 30, 2 forbidden classes
// mod each mid: c_p = -/+2·q^{-1} and 0 — distinct since q invertible), of
// density exactly N/W (cap-12 L1: dilation preserves comb type and census).
// THEOREM. Let j = idx(q) = #scour primes < q, P_j = their product. Then
//   | cap2(q) - s - (A+B)·(N/W)·PROD_{i<j}(1-1/q_i) + [1 in comb_A] + [1 in
//     comb_B] |  <=  2^{j+1} · (2·3^k + 1),   k = #mids.
// PROOF. Legendre over the j primes: the lpf condition on mids is already in
// the comb; for d | P_j squarefree, {m<=T, d|m, m in comb} = {m'<=T/d, m' in
// dilated comb} (L1), and every dilated comb is again natal-type with the SAME
// density N/W, so by cap-25's discrepancy lemma each of the 2^j terms is off
// its share (floor(T/d)+1)·N/W by at most 2·3^k; collecting floors costs one
// more unit per term; m=0 is never in a comb; m=1 is subtracted exactly. QED.
// Verified below: coverage asserted at every certified prime, all levels; the
// certified head carries 20-30% of Sigma cap2 at @23 and its share GROWS with
// x (N ~ W·prod(1-2/p) explodes past 3^k).
// TAIL (q^3 > W+1, m prime): cap2(q) ~ s + d(x)·(pi(A)+pi(B)-2·pi(q-1)),
// d(x) = (1/4)·PROD_{7<=p<=x}(1-1/(p-1)) — cap-08's pred factor. UNPROVEN
// equidistribution: the combined modulus is 30·(mids product) = W itself and
// the range is W/q < W, so Brun–Titchmarsh is vacuous here; we deliver the
// main term + measured envelope (aggregate |err| ~ 0.0-1.1% of tail mass,
// per-prime granularity at the deep tail where cap2 is O(1)). Li-based flavor
// (fully computation-free) adds the classical Li-vs-pi offset (~2-5% at these
// small ranges, shrinking with x). MIDDLE (x < q <= W^{1/3}): Buchstab,
// cap2 ~ s + d(x)·((w(u)T - q)/ln q per side), u = ln T/ln q.
//
// RESULT 2 — THE DEEP-K DEVIATION IS NOT PAIR CORRELATION; IT IS BUCHSTAB.
// Refutation first (measured in-run): expand exact violation statistics per
// admissible cofactor m into X1 (marginal excess), X2 (pair excess vs
// independence), X3 (triple): the brief's second-order inclusion–exclusion
// with cap-12 pair terms FAILS — X2 is small and sign-varying, X3 is as large
// as X2 (in-run columns); a resummation with exact measured marginals and
// exponentiated pair excess (side prototype, not re-run here) still left
// -3.4% at @23 full depth. The deviation lives at ALL orders simultaneously.
// THE PRICED LAW. A fresh victim is n = q·m (A side: n+2 rough; B side: n-2
// rough at the mids) — the freshness conditions ask that the PARTNER integer
// n±2, of size ~W and x-rough by the comb, stay q_K-rough as K deepens. The
// count of y-rough integers at size n is w(ln n/ln y)·n/ln y (Buchstab), and
// the sharp-cutoff independence product misses exactly the w-oscillation:
// true survival / product  =  B(q,K) = <w(ln n/ln y_K)> / <w(ln n/ln x)>,
// averaged over n in [q^2, W] with the cofactor weight 1/ln(n/q); y_K = the
// largest enforced modulus. B -> w(2)/w(inf) = 0.5·e^gamma = 0.890 as
// y -> sqrt(n): an 11% all-orders deficit at the tail — the -3-4%; and B > 1
// around u~3 (w(3) = (1+ln2)/3 > e^{-gamma}) — the +1-2% mid-curve bump.
// One function prices the whole error signature. Corrected predictor:
//   bound_pred2(K) = N - SUM_q [ s + (cap2(q)-s)·PROD_{j<K'}(1-1/(q_j-1))
//                                · B(q,K') ],   K' = min(K, idx(q)).
// Measured below: max |err| over the whole curve drops 3.4% -> 0.2% at @23,
// 4.1% -> 0.9% at @19, 3.4% -> 0.6% at @17 — the deviation is PRICED (the
// residual shrinks with x; w itself is a theorem, the transfer to this
// conditioned ensemble is heuristic + measured envelope).
//
// RESULT 3 — THE ENGINE: bound_pred2 from (x, W, K) alone, no sieve, no
// march. Sums -> Li integrals (scour index K <-> depth y via K = Li(y)-Li(x)),
// cap2 -> Result 1 main terms, product -> exp INT ln(1-1/(v-1)) dLi(v), B ->
// w-ratio. Validated against the exact curves at @13/17/19/23, then run at
// @37/@41/@53/@97 (W up to ~2.3e36, scour ~4e16 primes) — K*, the floor at
// K = 10% of the scour, K(0.9·truth), with truth's stand-in S_pred = the
// engine's own ceiling bound(full) (exact ceiling = truth - (Sigma s - Sigma
// self), a 0.1-0.2% understatement at deep levels, cap-24 anchor).
//
//   node research/natal-cap-28-analytic-certificate.js   (~12 s, ~500 MB)
// ============================================================================
'use strict';
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
const t0=Date.now(), el=()=>((Date.now()-t0)/1000).toFixed(1)+'s';

// ---- Buchstab w on a grid (w(u)=1/u on [1,2]; (u w)' = w(u-1)) --------------
const H=1/4096, UMAX=24, NG=Math.round((UMAX-1)/H), OM=new Float64Array(NG+1);
{ for(let i=0;i<=NG;i++){const u=1+i*H; OM[i]=u<=2?1/u:0}
  const i2=Math.round(1/H); let g=2*OM[i2];
  for(let i=i2+1;i<=NG;i++){ g+=H*(OM[i-1-i2]+OM[i-i2])/2; OM[i]=g/(1+i*H); } }
const EMG=0.5614594836; // e^{-gamma}
function omega(u){ if(u<=1)return 0; if(u>=UMAX)return EMG; const t=(u-1)/H, i=Math.floor(t), f=t-i; return i>=NG?OM[NG]:OM[i]*(1-f)+OM[i+1]*f }
// ---- Li: offset logarithmic integral — cumulative grid + asymptotic tail ----
const LIG={lo:Math.log(2),hi:46,n:36000,c:new Float64Array(36001)};
{const h=(LIG.hi-LIG.lo)/LIG.n, f=w=>Math.exp(w)/w; let a=0;
 for(let i=1;i<=LIG.n;i++){const w1=LIG.lo+(i-1)*h;a+=h*(f(w1)+f(w1+h))/2;LIG.c[i]=a}}
function Li(t){ if(t<=2)return 0; const w=Math.log(t);
  if(w>=LIG.hi){let s=0,term=t/w;for(let k=0;k<16;k++){s+=term;term*=(k+1)/w}return s}
  const u=(w-LIG.lo)*LIG.n/(LIG.hi-LIG.lo), i=Math.floor(u);
  return LIG.c[i]+(u-i)*(LIG.c[i+1]-LIG.c[i]) }

// ---- Natal@5 tile + ascending scour march (cap-24 verbatim) -----------------
function marchLevel(x){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7);
  let W=1;for(const p of wheel)W*=p;
  const alive=new Uint8Array(W); let N=0;
  for(const r0 of [11,17])for(let r=r0;r<W;r+=30){
    let ok=true;
    for(const p of mids){const m=r%p;if(m===0||m===p-2){ok=false;break}}
    if(ok){alive[r]=1;N++}
  }
  const scour=primesUpTo(Math.ceil(Math.sqrt(W))+2).filter(q=>q>x&&q*q<=W);
  const rows=[]; let removed=0,selfT=0;
  for(const q of scour){
    let fresh=0,self=0;
    for(let r=q;r<W;r+=q)if(alive[r]){alive[r]=0;fresh++;if(r===q)self++}
    for(let r=q-2;r<W;r+=q)if(alive[r]){alive[r]=0;fresh++;if(r===q-2)self++}
    rows.push({q,fresh,self}); removed+=fresh; selfT+=self;
  }
  let S=0;
  for(const r0 of [11,17])for(let r=r0;r<W;r+=30)if(alive[r])S++;
  return {x,W,N,S,removed,selfT,rows,mids};
}
const EXPECT={13:307,17:3099,19:38380,23:597475};
const CHECK={13:{K0:880,Kstar:0,floor:110},17:{K0:16135,Kstar:2,floor:82},
  19:{K0:308401,Kstar:10,floor:1877},23:{K0:7034588,Kstar:27,floor:4841}};
const KLIST={13:[0,2,5,10,20,34],17:[0,2,5,10,20,40,80,120],
  19:[0,10,20,40,80,150,300,435],23:[0,27,60,100,150,250,500,1000,1739]};

// ---- the measured side: exact ladder + violation statistics + analytic cap2 -
function scanLevel(L){
  const {x,W,N,rows,mids}=L, len=rows.length, k=mids.length;
  const Q=Int32Array.from(rows.map(r=>r.q)), lnQ=Float64Array.from(Q,q=>Math.log(q));
  const LIM=Math.floor((W+1)/Q[0]), lnx=Math.log(x);
  const lpf=new Int32Array(LIM+1);
  for(let i=2;i<=LIM;i++)if(lpf[i]===0)for(let j=i;j<=LIM;j+=i)if(lpf[j]===0)lpf[j]=i;
  const PIc=new Int32Array(LIM+1);{let c=0;for(let i=2;i<=LIM;i++){if(lpf[i]===i)c++;PIc[i]=c}}
  const pi=t=>t<2?0:PIc[t];
  const dP=0.25*mids.reduce((a,p)=>a*(1-1/(p-1)),1);
  let NW=2/30; for(const p of mids)NW*=(1-2/p);
  const D3=2*Math.pow(3,k)+1;
  const F=Float64Array.from(Q,q=>1/(q-1));
  const P=new Float64Array(len+1), Sf=new Float64Array(len+1), F2=new Float64Array(len+1), F3=new Float64Array(len+1);
  P[0]=1;for(let j=0;j<len;j++){P[j+1]=P[j]*(1-F[j]);Sf[j+1]=Sf[j]+F[j];F2[j+1]=F2[j]+F[j]*Sf[j];F3[j+1]=F3[j]+F[j]*F2[j]}
  const sumK=new Float64Array(len+1), sumProd=new Float64Array(len+1),
        sumB=new Float64Array(len+1), sumBA=new Float64Array(len+1),
        X1G=new Float64Array(len+1), X2G=new Float64Array(len+1), X3G=new Float64Array(len+1);
  let sSum=0, agg=0, aggA=0, cert={n:0,mass:0,err:0,mx:0}, prm={eP:0,eL:0,mass:0,mxP:0}, mid={eO:0,mass:0,mxO:0};
  const vio=new Int32Array(256), NB=24;
  for(let idx=0;idx<len;idx++){
    const q=Q[idx], fresh=rows[idx].fresh, self=rows[idx].self;
    const A=Math.floor((W-1)/q), B=Math.floor((W+1)/q);
    const s=[11,13,17,19].includes(q%30)?1:0;
    const nf=idx, hist=new Int32Array(nf+1), V=new Float64Array(nf), PH=new Float64Array(nf), PH3=new Float64Array(nf);
    for(let m=2;m<=B;m++){
      if(lpf[m]<q)continue;
      const v=q*m, t30=v%30; let side=0;
      if(m<=A&&(t30===11||t30===17)){let ok=true;for(const p of mids)if(v%p===p-2){ok=false;break}if(ok)side=1}
      else if(t30===13||t30===19){let ok=true;for(const p of mids)if(v%p===2){ok=false;break}if(ok)side=2}
      if(!side)continue;
      let nv=0, first=nf;
      if(side===1){for(let j=0;j<nf;j++){const t=v%Q[j];if(t===0||t===Q[j]-2){vio[nv++]=j;if(first===nf)first=j}}}
      else{for(let j=0;j<nf;j++){const t=v%Q[j];if(t===0||t===2){vio[nv++]=j;if(first===nf)first=j}}}
      hist[first]++;
      for(let a=0;a<nv;a++){V[vio[a]]++;for(let b=a+1;b<nv;b++){PH[vio[b]]++;for(let c=b+1;c<nv;c++)PH3[vio[c]]++}}
    }
    const cum=new Int32Array(nf+2);
    for(let j=nf;j>=0;j--)cum[j]=cum[j+1]+hist[j];
    assert(cum[nf]===fresh-self,`cap_full anchor q=${q}`);
    const C=cum[0], cap2=s+C; sSum+=s; agg+=cap2;
    // -- analytic cap2, three regimes ----------------------------------------
    let i1A=(q%30===11||q%30===17)?1:0; if(i1A)for(const p of mids)if(q%p===p-2){i1A=0;break}
    let i1B=(q%30===13||q%30===19)?1:0; if(i1B)for(const p of mids)if(q%p===2){i1B=0;break}
    const mainC=s+(A+B)*NW*P[idx]-i1A-i1B, errC=Math.pow(2,idx+1)*D3;
    let cap2A;
    if(errC<=0.5*(mainC-s)){ // CERTIFIED HEAD
      assert(Math.abs(cap2-mainC)<=errC,`certificate coverage q=${q}`);
      cert.n++; cert.mass+=cap2; cert.err+=mainC-cap2;
      const e=Math.abs(cap2-mainC)/cap2; if(e>cert.mx)cert.mx=e;
      cap2A=mainC;
    } else if(q**3>W+1){ // PRIME REGIME
      const mP=s+dP*(pi(A)+pi(B)-2*pi(q-1)), mL=s+dP*(Li(A)+Li(B)-2*Li(q)+2);
      prm.eP+=mP-cap2; prm.eL+=mL-cap2; prm.mass+=cap2;
      const e=Math.abs(cap2-mP)/Math.max(cap2,1); if(cap2>=20&&e>prm.mxP)prm.mxP=e;
      cap2A=mL;
    } else { // MIDDLE: two-term Li (prime + semiprime) for u<=3, w-form beyond
      const F2T=T=>{const u=Math.log(T)/lnQ[idx];
        if(u>3)return (omega(u)*T-q)/lnQ[idx];
        let S2=Li(T)-Li(q)+1;
        const a=lnQ[idx], b2=Math.log(T)/2, nq=32, h2=(b2-a)/nq;
        for(let i2=0;i2<=nq;i2++){const w=a+i2*h2, v=Math.exp(w);
          S2+=(i2===0||i2===nq?0.5:1)*h2*(Li(T/v)-Li(v)+1)*v/w}
        return S2};
      const mO=s+dP*(F2T(A)+F2T(B));
      mid.eO+=mO-cap2; mid.mass+=cap2;
      const e=Math.abs(cap2-mO)/cap2; if(e>mid.mxO)mid.mxO=e;
      cap2A=mO;
    }
    aggA+=cap2A;
    // -- Buchstab correction B(q,k'): w-ratio, cofactor weight ---------------
    const lnn=new Float64Array(NB), wgt=new Float64Array(NB); let ws=0;
    const lo=q*q, span=W-lo;
    for(let b=0;b<NB;b++){const n=lo+span*(b+0.5)/NB;lnn[b]=Math.log(n);
      wgt[b]=1/Math.max(0.5,lnn[b]-lnQ[idx]);ws+=wgt[b]}
    const omAt=lny=>{let a=0;for(let b=0;b<NB;b++)a+=wgt[b]*omega(lnn[b]/lny);return a/ws};
    const om0=omAt(lnx), Bk=new Float64Array(nf+1); Bk[0]=1;
    for(let j=1;j<=nf;j++)Bk[j]=omAt(lnQ[j-1])/om0;
    // -- prefixes + fold into level curves -----------------------------------
    const pv=new Float64Array(nf+1), pp=new Float64Array(nf+1), pt=new Float64Array(nf+1);
    for(let j=0;j<nf;j++){pv[j+1]=pv[j]+V[j];pp[j+1]=pp[j]+PH[j];pt[j+1]=pt[j]+PH3[j]}
    for(let K=0;K<=len;K++){const j=K<nf?K:nf;
      sumK[K]+=s+cum[j]; sumProd[K]+=s+C*P[j];
      sumB[K]+=s+C*P[j]*Bk[j]; sumBA[K]+=s+(cap2A-s)*P[j]*Bk[j];
      X1G[K]+=pv[j]-C*Sf[j]; X2G[K]+=pp[j]-C*F2[j]; X3G[K]+=pt[j]-C*F3[j];
    }
  }
  return {sumK,sumProd,sumB,sumBA,X1G,X2G,X3G,sSum,agg,aggA,cert,prm,mid,len};
}

// ---- PARTS 1+2: per level — custody, cap2 closed form, the priced curve -----
const RES=[];
for(const x of [13,17,19,23]){
  const L=marchLevel(x); assert(L.S===EXPECT[x],`truth @${x}`);
  const R=scanLevel(L), c=CHECK[x];
  assert(R.sumK[0]===c.K0,`cap2 sum @${x}`);
  const Kstar=Array.from(R.sumK).findIndex(v=>v<L.N);
  assert(Kstar===c.Kstar&&L.N-R.sumK[Kstar]===c.floor,`K*/floor @${x}`);
  console.log(`\n===== @${x}: N=${L.N} truth=${L.S} scour=${R.len}; anchors cap-08/24 exact (cap2 ${R.agg}, K*=${Kstar}, floor ${c.floor})  [${el()}]`);
  const pm=(v,m)=>(100*v/m).toFixed(2);
  console.log(` cap2 closed form: CERT n=${R.cert.n} (${pm(R.cert.mass,R.agg)}% of mass) maxrel ${pm(R.cert.mx,1)}% agg ${pm(R.cert.err,R.cert.mass)}% COVERED-BY-THEOREM;` +
    ` PRIME agg pi-form ${pm(R.prm.eP,R.prm.mass)}% / Li-form ${pm(R.prm.eL,R.prm.mass)}% (maxrel ${pm(R.prm.mxP,1)}% at cap2>=20); MID-w agg ${pm(R.mid.eO,R.mid.mass)}% maxrel ${pm(R.mid.mxO,1)}%`);
  console.log('    K |   meas   |  prod err/T% | -X1/T% +X2/T% -X3/T% |  pred2 err/T% | pred2A err/T%');
  for(const K of KLIST[x]){
    const bm=L.N-R.sumK[K], row=[L.N-R.sumProd[K],L.N-R.sumB[K],L.N-R.sumBA[K]];
    const pc=v=>(100*v/L.S).toFixed(2).padStart(6);
    console.log(` ${String(K).padStart(4)} | ${String(bm).padStart(8)} | ${row[0].toFixed(0).padStart(8)} ${pc(row[0]-bm)} | ${pc(-R.X1G[K])} ${pc(R.X2G[K])} ${pc(-R.X3G[K])} | ${row[1].toFixed(0).padStart(8)} ${pc(row[1]-bm)} | ${row[2].toFixed(0).padStart(8)} ${pc(row[2]-bm)}`);
  }
  let mxP=0,mxB=0,mxA=0;
  for(let K=Kstar;K<=R.len;K++){const f=v=>Math.abs(v)/L.S;
    mxP=Math.max(mxP,f(R.sumK[K]-R.sumProd[K]));mxB=Math.max(mxB,f(R.sumK[K]-R.sumB[K]));mxA=Math.max(mxA,f(R.sumK[K]-R.sumBA[K]))}
  console.log(` max|err| over K>=K*: prod ${(100*mxP).toFixed(2)}% -> pred2 ${(100*mxB).toFixed(2)}% (Buchstab prices the deviation); fully-analytic pred2A ${(100*mxA).toFixed(2)}%`);
  RES.push({x,L,R,Kstar});
}

// ---- PART 3: the hybrid engine — exact sieved head + dLi tail ---------------
// The scour head is DISCRETE and carries the heaviest caps; a pure dLi density
// misprices it (a first, fully-continuous engine missed bound(0) by 30-60%).
// Hybrid: enumerate scour primes to Y0 = min(sqrt(W), 2e7) — per-prime
// analytic cap2 (same three regimes as Part 1), bucketed — and integrate
// t > Y0 with the same integrand (only @53/@97 have a tail; it is Li-smooth).
// CALIBRATION (declared, the one measured-envelope scale): Sigma cap2A runs
// (Sigma cap2A - Sigma cap2)/Sigma cap2 = b(x) high; measured at @13..@23,
// b·ln^2(W) is near-constant (fit c ~ 2.5-3), so deep levels are reported raw
// AND bias-corrected with c = [min..max] envelope brackets.
const PRH=primesUpTo(2e7);
function engine(x,bias){
  const wheel=PRH.filter(p=>p<=x), mids=wheel.filter(p=>p>=7), k=mids.length;
  let lnW=0; for(const p of wheel)lnW+=Math.log(p);
  const W=Math.exp(lnW), lnx=Math.log(x), lnRt=lnW/2, rtW=Math.exp(lnRt);
  let N=2; for(const p of mids)N*=(p-2);
  const dPf=0.25*mids.reduce((a,p)=>a*(1-1/(p-1)),1);
  let NW=2/30; for(const p of mids)NW*=(1-2/p);
  const D3=2*Math.pow(3,k)+1;
  const PhiHat=(T,lnq)=>{const q=Math.exp(lnq), u=Math.log(T)/lnq;
    if(u<=2)return Li(T)-Li(q)+1;
    if(u>3)return (omega(u)*T-q)/lnq;
    let S2=Li(T)-Li(q)+1;
    const b2=Math.log(T)/2, nq=32, h2=(b2-lnq)/nq;
    for(let i=0;i<=nq;i++){const w=lnq+i*h2, v=Math.exp(w);
      S2+=(i===0||i===nq?0.5:1)*h2*(Li(T/v)-Li(v)+1)*v/w}
    return S2};
  // -- head: exact primes, per-prime cap2A, bucketed --------------------------
  const lnH=Math.min(Math.log(2e7),lnRt), NBK=3000, hb=(lnH-lnx)/NBK;
  const bm=new Float64Array(NBK), bw=new Float64Array(NBK);
  const cumK=new Float64Array(NBK+1), cumLP=new Float64Array(NBK+1);
  const ck=new Float64Array(NBK), cl=new Float64Array(NBK);
  let Pj=1, sHead=0, j=0;
  for(const q of PRH){
    if(q<=x)continue; if(Math.log(q)>lnH+1e-12)break; if(q*q>W)break;
    const lnq=Math.log(q), s=[11,13,17,19].includes(q%30)?1:0; sHead+=s;
    const A=(W-1)/q, B=(W+1)/q, errC=Math.pow(2,j+1)*D3, mainC=s+(A+B)*NW*Pj;
    const capA=(errC<=0.5*(mainC-s))?mainC:s+dPf*(PhiHat(A,lnq)+PhiHat(B,lnq));
    const bi=Math.max(0,Math.min(NBK-1,Math.floor((lnq-lnx)/hb)));
    const mass=(capA-s)*(1-bias);
    bm[bi]+=mass; bw[bi]+=mass*lnq; ck[bi]++; cl[bi]+=Math.log(1-1/(q-1));
    Pj*=(1-1/(q-1)); j++;
  }
  for(let i=0;i<NBK;i++){cumK[i+1]=cumK[i]+ck[i];cumLP[i+1]=cumLP[i]+cl[i]}
  // -- tail (t > Y0, only when lnH < lnRt): trapezoid grid on w = ln t --------
  const hasTail=lnH<lnRt-1e-9, MT=hasTail?1200:0, ht=hasTail?(lnRt-lnH)/MT:0;
  const tw=new Float64Array(MT+1), tphi=new Float64Array(MT+1),
        cumKT=new Float64Array(MT+1), cumLPT=new Float64Array(MT+1);
  for(let i=0;i<=MT;i++){const w=lnH+i*ht; tw[i]=w;
    const t=Math.exp(w), dLi=Math.exp(w)/w;
    tphi[i]=2*dPf*PhiHat(W/t,w)*(1-bias)*dLi;
    if(i>0){const w0=tw[i-1], d0=Math.exp(w0)/w0, d1=dLi;
      cumKT[i]=cumKT[i-1]+ht*(d0+d1)/2;
      cumLPT[i]=cumLPT[i-1]+ht*(Math.log(1-1/(Math.exp(w0)-1))*d0+Math.log(1-1/(t-1))*d1)/2}}
  const sTail=hasTail?cumKT[MT]/2:0, sSum=sHead+sTail;
  const lenK=cumK[NBK]+(hasTail?cumKT[MT]:0);
  const Kof=ly=>{ if(ly<=lnx)return 0;
    if(ly<=lnH){const u=(ly-lnx)/hb,i=Math.min(NBK-1,Math.floor(u));return cumK[i]+(u-i)*(cumK[i+1]-cumK[i])}
    const u=(ly-lnH)/ht,i=Math.min(MT-1,Math.floor(u));return cumK[NBK]+cumKT[i]+(u-i)*(cumKT[i+1]-cumKT[i])};
  const lnPof=ly=>{ if(ly<=lnx)return 0;
    if(ly<=lnH){const u=(ly-lnx)/hb,i=Math.min(NBK-1,Math.floor(u));return cumLP[i]+(u-i)*(cumLP[i+1]-cumLP[i])}
    const u=(ly-lnH)/ht,i=Math.min(MT-1,Math.floor(u));return cumLP[NBK]+cumLPT[i]+(u-i)*(cumLPT[i+1]-cumLPT[i])};
  // -- Buchstab-B machinery per head bucket and tail node ---------------------
  const NB=16, mkB=lnt=>{const t=Math.exp(lnt), lo=t*t, span=Math.max(W-lo,0);
    const lnn=new Float64Array(NB), wgt=new Float64Array(NB); let ws=0;
    for(let b=0;b<NB;b++){const n=lo+span*(b+0.5)/NB; lnn[b]=Math.log(n);
      wgt[b]=1/Math.max(0.5,lnn[b]-lnt); ws+=wgt[b]}
    const omAt=ly=>{let a=0;for(let b=0;b<NB;b++)a+=wgt[b]*omega(lnn[b]/ly);return a/ws};
    return {omAt,om0:omAt(lnx)}};
  // frozen-G case (y >= q) uses the EXACT bucket-start prefix, not the interp
  // (interpolating smears half of q's own factor into its own product).
  const hBK=[]; for(let i=0;i<NBK;i++)if(bm[i]>0){const lnq=bw[i]/bm[i];
    hBK.push({m:bm[i],lnq,pref:cumLP[i],B:mkB(lnq)})}
  const tND=[]; if(hasTail)for(let i=0;i<=MT;i++){const wS=(i===0||i===MT)?ht/2:ht;
    tND.push({w:tw[i],phiS:tphi[i]*wS,pref:cumLP[NBK]+cumLPT[i],B:mkB(tw[i])})}
  const bound=ly=>{let acc=0;
    for(const b of hBK){
      const G=ly>=b.lnq?Math.exp(b.pref)*(b.B.omAt(b.lnq)/b.B.om0)
        :(ly<=lnx?1:Math.exp(lnPof(ly))*(b.B.omAt(ly)/b.B.om0));
      acc+=b.m*G}
    for(const nd of tND){
      const G=ly>=nd.w?Math.exp(nd.pref)*(nd.B.omAt(nd.w)/nd.B.om0)
        :(ly<=lnx?1:Math.exp(lnPof(ly))*(nd.B.omAt(ly)/nd.B.om0));
      acc+=nd.phiS*G}
    return N-sSum-acc};
  const bis=(f,lo,hi)=>{let flo=f(lo);for(let it=0;it<60;it++){const m=(lo+hi)/2;((f(m)>0)===(flo>0)?lo=m:hi=m)}return (lo+hi)/2};
  const ceil_=bound(lnRt), b0=bound(lnx);
  const lyst=b0>=0?lnx:bis(ly=>bound(ly),lnx,lnRt), Kst=Kof(lyst);
  const ly10=bis(ly=>Kof(ly)-0.10*lenK,lnx,lnRt), f10=bound(ly10);
  const ly90=bis(ly=>bound(ly)-0.9*ceil_,lnx,lnRt), K90=Kof(ly90);
  return {x,W,N,lnW,lenK,sSum,b0,ceil_,Kst,yst:Math.exp(lyst),f10,K90};
}
// -- calibration from Part 1/2 + validation + the unreachable levels ----------
console.log('\n===== PART 3: hybrid engine — bias fit, validation @13-23, then @37/@41/@53/@97 =====');
const CS=[];
for(const R0 of RES){const b=(R0.R.aggA-R0.R.agg)/R0.R.agg, lnW=Math.log(R0.L.W);
  if(R0.x>=17)CS.push(b*Math.pow(lnW,3));
  console.log(` @${R0.x}: Sigma cap2A bias b = ${(100*b).toFixed(3)}%  b·ln^3(W) = ${(b*Math.pow(lnW,3)).toFixed(1)}${R0.x<17?' (excluded: 34-prime scour)':''}`)}
const cMid=CS.reduce((a,v)=>a+v,0)/CS.length, cLo=Math.min(...CS), cHi=Math.max(...CS);
console.log(` fit: b(x) ~ c/ln^3(W), c = ${cMid.toFixed(1)} [${cLo.toFixed(1)}..${cHi.toFixed(1)}] — declared measured-envelope calibration (@17/@19/@23)`);
for(const x of [13,17,19,23]){
  const lnW3=Math.pow(Math.log(RES.find(r=>r.x===x).L.W),3);
  const E0=engine(x,0), E1=engine(x,cMid/lnW3);
  const R0=RES.find(r=>r.x===x), {L,R,Kstar}=R0, len=R.len;
  const K10=Math.round(0.1*len), b10=L.N-R.sumK[K10];
  let K9=-1; for(let K=0;K<=len;K++)if(L.N-R.sumK[K]>=0.9*L.S){K9=K;break}
  console.log(` @${x}: engine raw K*=${E0.Kst.toFixed(0)} ceil=${E0.ceil_.toFixed(0)} | corrected K*=${E1.Kst.toFixed(0)} f10=${E1.f10.toFixed(0)} (${(E1.f10/E1.ceil_).toFixed(3)}) K0.9/len=${(E1.K90/E1.lenK).toFixed(3)} ceil=${E1.ceil_.toFixed(0)} || truth: K*=${Kstar} f10=${b10} (${(b10/L.S).toFixed(3)}) K0.9/len=${(K9/len).toFixed(3)} ceil=${L.N-R.sumK[len]}`);
}
console.log('\n    x |     N      |  scour len | K*/len [env]        |  q*(central) | f10/Spred [env]     | K0.9/len [env]      | Spred/N [env]');
for(const x of [29,31,37,41,53,97]){
  let lnW=0; for(const p of PRH){if(p>x)break;lnW+=Math.log(p)}
  const l3=Math.pow(lnW,3), bC=cMid/l3, bL=cLo/l3, bH=cHi/l3;
  const E=engine(x,bC), Ea=engine(x,bL), Eb=engine(x,bH), E0=engine(x,0);
  const sci=v=>v.toExponential(2);
  const rng=(f,dig)=>`${f(E).toFixed(dig)} [${Math.min(f(Ea),f(Eb)).toFixed(dig)}..${Math.max(f(Ea),f(Eb)).toFixed(dig)}]`;
  console.log(` ${String(x).padStart(4)} | ${sci(E.N).padStart(9)} | ${sci(E.lenK).padStart(9)} | ${rng(e=>e.Kst/e.lenK,4)} | ${E.yst.toPrecision(4).padStart(9)} | ${rng(e=>e.f10/e.ceil_,4)} | ${rng(e=>e.K90/e.lenK,4)} | ${rng(e=>e.ceil_/e.N,5)}`);
  console.log(`        central: K* = ${sci(E.Kst)} (q* ${sci(E.yst)}), K0.9 = ${sci(E.K90)}, Spred = ${sci(E.ceil_)}; raw (no calibration): K*/len ${(E0.Kst/E0.lenK).toFixed(4)}, f10/Spred ${(E0.f10/E0.ceil_).toFixed(4)}, K0.9/len ${(E0.K90/E0.lenK).toFixed(4)}, Spred/N ${(E0.ceil_/E0.N).toFixed(5)}`);
}
console.log('\ndone in '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/natal-cap-28-analytic-certificate.js
//   invocation:  node research/natal-cap-28-analytic-certificate.js
//   code-sha256: dde56561f31370a97d3d66528050f78e4485788dbf669496c4f11f23f1fc8b73
//   out-sha256:  13b452161507ddcb50a34630f508370cb630b571201a5c5006ac935d20267f8a
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     13.1 s
// ============================================================================
//
// ===== @13: N=990 truth=307 scour=34; anchors cap-08/24 exact (cap2 880, K*=0, floor 110)  [0.0s]
//  cap2 closed form: CERT n=0 (0.00% of mass) maxrel 0.00% agg NaN% COVERED-BY-THEOREM; PRIME agg pi-form -1.05% / Li-form 4.38% (maxrel 8.33% at cap2>=20); MID-w agg 6.89% maxrel 8.30%
//     K |   meas   |  prod err/T% | -X1/T% +X2/T% -X3/T% |  pred2 err/T% | pred2A err/T%
//     0 |      110 |      110   0.00 |   0.00   0.00   0.00 |      110   0.00 |       62 -15.78
//     2 |      186 |      191   1.57 |   1.66  -0.09   0.00 |      190   1.37 |      146 -13.04
//     5 |      237 |      243   1.81 |   2.81  -1.15   0.16 |      240   0.93 |      198 -12.72
//    10 |      274 |      274  -0.01 |   2.66  -2.58  -0.06 |      275   0.33 |      235 -12.72
//    20 |      294 |      288  -1.80 |   3.22  -5.39   0.45 |      295   0.31 |      256 -12.24
//    34 |      296 |      290  -1.88 |   3.53  -5.88   0.57 |      298   0.53 |      259 -12.04
//  max|err| over K>=K*: prod 2.54% -> pred2 1.67% (Buchstab prices the deviation); fully-analytic pred2A 15.78%
//
// ===== @17: N=14850 truth=3099 scour=120; anchors cap-08/24 exact (cap2 16135, K*=2, floor 82)  [0.1s]
//  cap2 closed form: CERT n=1 (9.69% of mass) maxrel 0.01% agg 0.01% COVERED-BY-THEOREM; PRIME agg pi-form -0.49% / Li-form 1.70% (maxrel 15.26% at cap2>=20); MID-w agg 3.00% maxrel 4.79%
//     K |   meas   |  prod err/T% | -X1/T% +X2/T% -X3/T% |  pred2 err/T% | pred2A err/T%
//     0 |    -1285 |    -1285   0.00 |   0.00   0.00   0.00 |    -1285   0.00 |    -1632 -11.19
//     2 |       82 |       92   0.31 |   0.24   0.08   0.00 |       92   0.33 |     -223  -9.83
//     5 |     1070 |     1077   0.23 |   0.69  -0.64   0.18 |     1076   0.19 |      781  -9.32
//    10 |     1832 |     1865   1.05 |   0.58   0.13   0.39 |     1840   0.24 |     1558  -8.84
//    20 |     2454 |     2480   0.85 |   0.46   1.04  -0.44 |     2447  -0.22 |     2177  -8.95
//    40 |     2871 |     2829  -1.36 |   0.70   0.53  -2.11 |     2863  -0.26 |     2602  -8.68
//    80 |     3049 |     2945  -3.36 |   0.25  -0.70  -2.21 |     3031  -0.58 |     2774  -8.88
//   120 |     3057 |     2952  -3.39 |   0.42  -0.97  -2.13 |     3043  -0.45 |     2786  -8.73
//  max|err| over K>=K*: prod 3.39% -> pred2 0.62% (Buchstab prices the deviation); fully-analytic pred2A 9.83%
//
// ===== @19: N=252450 truth=38380 scour=435; anchors cap-08/24 exact (cap2 308401, K*=10, floor 1877)  [0.2s]
//  cap2 closed form: CERT n=3 (17.40% of mass) maxrel 0.34% agg -0.16% COVERED-BY-THEOREM; PRIME agg pi-form 0.01% / Li-form 0.92% (maxrel 26.31% at cap2>=20); MID-w agg 1.82% maxrel 3.18%
//     K |   meas   |  prod err/T% | -X1/T% +X2/T% -X3/T% |  pred2 err/T% | pred2A err/T%
//     0 |   -55951 |   -55951   0.00 |   0.00   0.00   0.00 |   -55951   0.00 |   -59512  -9.28
//    10 |     1877 |     1672  -0.53 |  -0.36  -0.11  -0.07 |     1734  -0.37 |    -1058  -7.65
//    20 |    16370 |    16173  -0.51 |  -0.89   0.08  -0.01 |    16108  -0.68 |    13474  -7.55
//    40 |    26274 |    26545   0.71 |  -0.86   0.07   1.39 |    25964  -0.81 |    23419  -7.44
//    80 |    33023 |    32789  -0.61 |  -1.03   1.05  -0.08 |    32668  -0.92 |    30192  -7.38
//   150 |    36645 |    35601  -2.72 |  -1.35   1.63  -1.83 |    36295  -0.91 |    33865  -7.24
//   300 |    38124 |    36590  -4.00 |  -1.38   0.81  -1.90 |    37774  -0.91 |    35368  -7.18
//   435 |    38219 |    36640  -4.11 |  -1.44   0.79  -1.91 |    37860  -0.94 |    35457  -7.20
//  max|err| over K>=K*: prod 4.11% -> pred2 0.99% (Buchstab prices the deviation); fully-analytic pred2A 7.72%
//
// ===== @23: N=5301450 truth=597475 scour=1739; anchors cap-08/24 exact (cap2 7034588, K*=27, floor 4841)  [6.8s]
//  cap2 closed form: CERT n=6 (22.93% of mass) maxrel 0.40% agg -0.21% COVERED-BY-THEOREM; PRIME agg pi-form 0.01% / Li-form 0.34% (maxrel 26.59% at cap2>=20); MID-w agg 1.25% maxrel 2.40%
//     K |   meas   |  prod err/T% | -X1/T% +X2/T% -X3/T% |  pred2 err/T% | pred2A err/T%
//     0 | -1733138 | -1733138   0.00 |   0.00   0.00   0.00 | -1733138   0.00 | -1778139  -7.53
//    27 |     4841 |     4430  -0.07 |   0.16  -0.05  -0.07 |     5953   0.19 |   -26096  -5.18
//    60 |   272732 |   275881   0.53 |   0.10  -0.06  -0.24 |   272833   0.02 |   241914  -5.16
//   100 |   381799 |   391060   1.55 |   0.16  -0.24   0.73 |   381396  -0.07 |   350839  -5.18
//   150 |   449292 |   457602   1.39 |   0.13  -0.28   0.95 |   448378  -0.15 |   418058  -5.23
//   250 |   514452 |   515481   0.17 |   0.14   0.11   0.10 |   513345  -0.19 |   483278  -5.22
//   500 |   570772 |   558862  -1.99 |   0.09   0.42  -1.21 |   569664  -0.19 |   539837  -5.18
//  1000 |   593943 |   574655  -3.23 |   0.11  -0.20  -1.19 |   593306  -0.11 |   563590  -5.08
//  1739 |   596782 |   576405  -3.41 |   0.11  -0.36  -1.11 |   596218  -0.09 |   566514  -5.07
//  max|err| over K>=K*: prod 3.41% -> pred2 0.21% (Buchstab prices the deviation); fully-analytic pred2A 5.24%
//
// ===== PART 3: hybrid engine — bias fit, validation @13-23, then @37/@41/@53/@97 =====
//  @13: Sigma cap2A bias b = 5.505%  b·ln^3(W) = 60.3 (excluded: 34-prime scour)
//  @17: Sigma cap2A bias b = 2.149%  b·ln^3(W) = 48.8
//  @19: Sigma cap2A bias b = 1.155%  b·ln^3(W) = 48.1
//  @23: Sigma cap2A bias b = 0.640%  b·ln^3(W) = 45.4
//  fit: b(x) ~ c/ln^3(W), c = 47.4 [45.4..48.8] — declared measured-envelope calibration (@17/@19/@23)
//  @13: engine raw K*=0 ceil=260 | corrected K*=0 f10=208 (0.716) K0.9/len=0.265 ceil=291 || truth: K*=0 f10=209 (0.681) K0.9/len=0.353 ceil=296
//  @17: engine raw K*=3 ceil=2788 | corrected K*=2 f10=2002 (0.659) K0.9/len=0.260 ceil=3039 || truth: K*=2 f10=2019 (0.652) K0.9/len=0.283 ceil=3057
//  @19: engine raw K*=10 ceil=35455 | corrected K*=9 f10=26955 (0.711) K0.9/len=0.225 ceil=37924 || truth: K*=10 f10=27367 (0.713) K0.9/len=0.230 ceil=38219
//  @23: engine raw K*=29 ceil=566327 | corrected K*=26 f10=471314 (0.788) K0.9/len=0.181 ceil=597943 || truth: K*=27 f10=470320 (0.787) K0.9/len=0.182 ceil=596782
//
//     x |     N      |  scour len | K*/len [env]        |  q*(central) | f10/Spred [env]     | K0.9/len [env]      | Spred/N [env]
//    29 |   1.43e+8 |   7.86e+3 | 0.0088 [0.0088..0.0088] |     408.9 | 0.8492 [0.8488..0.8494] | 0.1417 [0.1416..0.1420] | 0.08505 [0.08489..0.08516]
//         central: K* = 6.94e+1 (q* 4.09e+2), K0.9 = 1.11e+3, Spred = 1.22e+7; raw (no calibration): K*/len 0.0095, f10/Spred 0.8415, K0.9/len 0.1473, Spred/N 0.08127
//    31 |   4.15e+9 |   3.75e+4 | 0.0046 [0.0045..0.0046] |      1092 | 0.8904 [0.8903..0.8906] | 0.1087 [0.1085..0.1088] | 0.06721 [0.06710..0.06728]
//         central: K* = 1.71e+2 (q* 1.09e+3), K0.9 = 4.08e+3, Spred = 2.79e+8; raw (no calibration): K*/len 0.0049, f10/Spred 0.8859, K0.9/len 0.1126, Spred/N 0.06469
//    37 |  1.45e+11 |   1.98e+5 | 0.0022 [0.0022..0.0022] |      3121 | 0.9182 [0.9181..0.9183] | 0.0821 [0.0821..0.0823] | 0.05383 [0.05376..0.05388]
//         central: K* = 4.31e+2 (q* 3.12e+3), K0.9 = 1.63e+4, Spred = 7.82e+9; raw (no calibration): K*/len 0.0023, f10/Spred 0.9153, K0.9/len 0.0851, Spred/N 0.05210
//    41 |  5.67e+12 |   1.12e+6 | 0.0010 [0.0010..0.0010] |      8854 | 0.9377 [0.9376..0.9377] | 0.0609 [0.0608..0.0610] | 0.04451 [0.04445..0.04454]
//         central: K* = 1.09e+3 (q* 8.85e+3), K0.9 = 6.81e+4, Spred = 2.52e+11; raw (no calibration): K*/len 0.0010, f10/Spred 0.9358, K0.9/len 0.0630, Spred/N 0.04328
//    53 |  5.33e+17 |   2.67e+8 | 0.0001 [0.0001..0.0001] |  2.440e+5 | 0.9672 [0.9672..0.9672] | 0.0250 [0.0250..0.0250] | 0.02706 [0.02704..0.02708]
//         central: K* = 2.15e+4 (q* 2.44e+5), K0.9 = 6.66e+6, Spred = 1.44e+16; raw (no calibration): K*/len 0.0001, f10/Spred 0.9665, K0.9/len 0.0258, Spred/N 0.02655
//    97 |  2.94e+34 |  3.72e+16 | 0.0000 [0.0000..0.0000] | 1.666e+10 | 0.9956 [0.9956..0.9956] | 0.0008 [0.0008..0.0008] | 0.00932 [0.00931..0.00932]
//         central: K* = 7.41e+8 (q* 1.67e+10), K0.9 = 2.98e+13, Spred = 2.74e+32; raw (no calibration): K*/len 0.0000, f10/Spred 0.9955, K0.9/len 0.0008, Spred/N 0.00924
//
// done in 13.0s
// ============================================================================
// READINGS (2026-08-14)
//
// 1. BOTH NUMERICAL DEPENDENCIES OF cap-24's LAW ARE CLOSED. (a) cap2 has a
//    closed form in three regimes, with the HEAD (the heaviest caps) covered
//    by an actual THEOREM: the Legendre-comb certificate holds with room at
//    every certified prime (n = 1/3/6 primes at @17/@19/@23 carrying 9.7/17.4/
//    22.9% of Sigma cap2, max rel err 0.01/0.34/0.40% — the certified share
//    GROWS with x because N explodes past 3^k). (b) The -3-4% deep-K deviation
//    is priced by one classical function (reading 3).
//
// 2. THE BRIEF'S PAIR-CORRECTION HYPOTHESIS IS REFUTED, MEASURED. Exact
//    violation statistics at all four levels: the pair excess X2 over the
//    independence product is small and SIGN-VARYING (+0.79%T at @19 full,
//    -0.36%T at @23 full), the triple excess X3 is as large as X2 (-1.9%T,
//    -1.1%T), and truncating inclusion-exclusion at any fixed order does not
//    converge (side prototype: even exact measured marginals + exponentiated
//    pair excess left -3.4%T). cap-12's structured bias is real but it is not
//    where the deep-K deficit lives: the deficit is an ALL-ORDERS correlation.
//
// 3. THE DEVIATION IS BUCHSTAB — THE MAIN RESULT. The freshness conditions
//    ask the victim's partner n+-2 (size ~W, x-rough) to stay y-rough as
//    y = q_K climbs; sharp-cutoff independence products miss exactly the
//    Buchstab oscillation, and the multiplicative correction B(q,K') =
//    <w(ln n/ln y)>/<w(ln n/ln x)> (n averaged over [q^2,W] with cofactor
//    weight) prices BOTH error lobes at once: the +1-2%T mid-curve bump
//    (w(u) > e^-gamma near u~3) and the -3-4%T deep deficit (w(2)/e^-gamma
//    = 0.890 as y -> sqrt n). Max |err| over the whole curve: 3.41 -> 0.21%T
//    at @23, 4.11 -> 0.99 @19, 3.39 -> 0.62 @17, 2.54 -> 1.67 @13 — residual
//    SHRINKING with level. The wall reads consistently: what the history-blind
//    ladder loses to the march is not pairwise interference but the same
//    all-orders sieve correlation that separates a product of local densities
//    from a true sifting function — parity's fingerprint, now priced to 0.2%.
//
// 4. THE FULLY ANALYTIC CHAIN COSTS ONE MORE PERCENT-CLASS ERROR. Swapping
//    exact cap2 for its closed form leaves a stable systematic overshoot
//    b = 2.1/1.2/0.64% of Sigma cap2 (@17/@19/@23) with b·ln^3 W flat at
//    47 +- 2 — declared as the engine's one measured-envelope calibration.
//    Unproven ingredients, named: prime equidistribution over the W-modulus
//    comb (Brun-Titchmarsh is vacuous there: modulus W, range W/q < W), and
//    the Buchstab transfer to this conditioned ensemble. Proven ingredients:
//    the staircase caps, the certified head, w itself, the exact anchors.
//
// 5. THE ENGINE REACHES TRUTH-GRADE AT KNOWN LEVELS. Hybrid (exact sieved
//    head + dLi tail; a purely continuous engine misprices the discrete head
//    by 30-60% of bound(0) — measured and discarded). Calibrated engine vs
//    truth: K* 2/9/26 vs 2/10/27; floor@10% 0.659/0.711/0.788 vs 0.652/
//    0.713/0.787 of truth (@23 within 0.2%); ceilings -0.6/-0.8/+0.2%;
//    K(0.9T)/len 0.260/0.225/0.181 vs 0.283/0.230/0.182. @13 remains rough
//    (34-prime scour) and is excluded from the fit.
//
// 6. THE UNREACHABLE LEVELS, PREDICTED. Two independent corroborations:
//    K*(29) = 69 — cap-11's extrapolated forecast was ~70; and K(0.9T)/len
//    continues cap-24's measured power law K_0.9 ~ scour^0.83 SIXTEEN orders
//    of magnitude out (@37: law gives 0.081, engine 0.082; @97: law 0.0010,
//    engine 0.0008). The certificate technology gets RELATIVELY CHEAPER
//    forever: K*/len 0.88% -> 0.002% and f10/Spred 0.85 -> 0.996 from @29 to
//    @97 — at @97, ten percent of the scour already certifies 99.6% of the
//    predicted 2.74e32 surviving twin slots, and bare positivity costs
//    K* = 7.4e8 of 3.7e16 moduli (2e-8 of the scour). No efficiency collapse
//    anywhere in the extrapolation — cap-24's verdict extends to W ~ 2.3e36.
//
// 7. HONEST LIMITS. Spred is the engine's own ceiling (exact ceiling = truth
//    - (Sig s - Sig self), a 0.1-0.2% understatement at deep levels). The
//    c-envelope brackets are tight because the correction itself shrinks like
//    ln^-3 W; the honest uncertainty is the MODEL (does b keep falling like
//    ln^-3 W? do the unproven equidistributions hold at 1e36?) — read the
//    raw-vs-central spread (<=1pp on f10/Spred, <=4% rel on K0.9/len) as the
//    band, and treat every deep number as measured-envelope, not theorem.
//    Nothing here approaches a twin-prime proof: the ladder still cannot beat
//    the march, it can only now be PRICED without running it.
//
// 8. NEXT. (i) March @29 (cap-18 machinery, ~6.5G tile) and check K* = 69,
//    K0.9/len = 0.142, ceiling/N = 0.0851 — the engine's first true
//    falsification test. (ii) Prove the Buchstab transfer for shifted rough
//    pairs (the B factor) — that single lemma would move reading 3 from
//    measured-envelope to theorem and make bound_pred2's residual the only
//    unproven scale. (iii) Tighten the certified head: cap-25's measured
//    discrepancy is ~30x below 2·3^k; a proven sub-3^k bound would push the
//    certified share of Sigma cap2 past 50% at @29+.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// 12.3 s (Apple Silicon, node v22). All asserts passed (march truths, cap-08/24
// digit anchors, cap_full anchor at all 2328 scour primes, certificate coverage
// at every certified prime). @13/@17 K-tables trimmed here; all regenerate.
//
// ===== @13: N=990 truth=307 scour=34 (cap2 880, K*=0, floor 110)
//  cap2: CERT n=0; PRIME agg pi -1.05% / Li +4.38%; MID-2term agg +6.89%
//     0 meas 110 | prod 110 0.00 | pred2 110 0.00 | pred2A 62 -15.78
//    20 meas 294 | prod 288 -1.80 | pred2 295 +0.31 | pred2A 256 -12.24
//    34 meas 296 | prod 290 -1.88 | pred2 298 +0.53 | pred2A 259 -12.04
//  max|err| K>=K*: prod 2.54% -> pred2 1.67%; pred2A 15.78% (34-prime scour)
// ===== @17: N=14850 truth=3099 scour=120 (cap2 16135, K*=2, floor 82)
//  cap2: CERT n=1 (9.69% of mass, maxrel 0.01%); PRIME pi -0.49% / Li +1.70%;
//  MID +3.00%.  K-curve: prod errs +0.31..-3.39%T -> pred2 +0.33..-0.45%T
//  (K=2: 92; K=40: 2863 vs meas 2871; K=120: 3043 vs 3057)
//  max|err| K>=K*: prod 3.39% -> pred2 0.62%; pred2A 9.83%
// ===== @19: N=252450 truth=38380 scour=435 (cap2 308401, K*=10, floor 1877)
//  cap2: CERT n=3 (17.40%, maxrel 0.34%, agg -0.16%); PRIME pi +0.01% /
//  Li +0.92%; MID +1.82% (maxrel 3.18%)
//     K |   meas  |  prod  err%T | -X1%T +X2%T -X3%T | pred2  err%T | pred2A err%T
//    10 |    1877 |   1672 -0.53 | -0.36 -0.11 -0.07 |  1734  -0.37 | -1058  -7.65
//    40 |   26274 |  26545 +0.71 | -0.86 +0.07 +1.39 | 25964  -0.81 | 23419  -7.44
//   150 |   36645 |  35601 -2.72 | -1.35 +1.63 -1.83 | 36295  -0.91 | 33865  -7.24
//   435 |   38219 |  36640 -4.11 | -1.44 +0.79 -1.91 | 37860  -0.94 | 35457  -7.20
//  max|err| K>=K*: prod 4.11% -> pred2 0.99%; pred2A 7.72%
// ===== @23: N=5301450 truth=597475 scour=1739 (cap2 7034588, K*=27, floor 4841)
//  cap2: CERT n=6 (22.93%, maxrel 0.40%, agg -0.21%); PRIME pi +0.01% /
//  Li +0.34%; MID +1.25% (maxrel 2.40%)
//     K |   meas   |   prod  err%T | -X1%T +X2%T -X3%T |  pred2  err%T | pred2A err%T
//     0 | -1733138 | -1733138 0.00 |  0.00  0.00  0.00 | -1733138 0.00 | -1778139 -7.53
//    27 |     4841 |    4430 -0.07 | +0.16 -0.05 -0.07 |    5953 +0.19 |  -26096 -5.18
//   100 |   381799 |  391060 +1.55 | +0.16 -0.24 +0.73 |  381396 -0.07 |  350839 -5.18
//   250 |   514452 |  515481 +0.17 | +0.14 +0.11 +0.10 |  513345 -0.19 |  483278 -5.22
//   500 |   570772 |  558862 -1.99 | +0.09 +0.42 -1.21 |  569664 -0.19 |  539837 -5.18
//  1000 |   593943 |  574655 -3.23 | +0.11 -0.20 -1.19 |  593306 -0.11 |  563590 -5.08
//  1739 |   596782 |  576405 -3.41 | +0.11 -0.36 -1.11 |  596218 -0.09 |  566514 -5.07
//  max|err| K>=K*: prod 3.41% -> pred2 0.21% (Buchstab prices the deviation);
//  fully-analytic pred2A 5.24%
// ===== PART 3: hybrid engine =====
//  bias b = (Sig cap2A - Sig cap2)/Sig cap2: 5.505% / 2.149% / 1.155% / 0.640%;
//  b·ln^3(W) = 60.3 (@13, excluded) / 48.8 / 48.1 / 45.4
//  fit b ~ c/ln^3 W, c = 47.4 [45.4..48.8] (declared calibration, @17-@23)
//  validation (corrected engine || truth):
//  @13: K* 0 f10 208 (0.716) K0.9/len 0.265 ceil 291 || 0, 209 (0.681), 0.353, 296
//  @17: K* 2 f10 2002 (0.659) K0.9/len 0.260 ceil 3039 || 2, 2019 (0.652), 0.283, 3057
//  @19: K* 9 f10 26955 (0.711) K0.9/len 0.225 ceil 37924 || 10, 27367 (0.713), 0.230, 38219
//  @23: K* 26 f10 471314 (0.788) K0.9/len 0.181 ceil 597943 || 27, 470320 (0.787), 0.182, 596782
//  (raw, no calibration: K* 0/3/10/29; ceilings 260/2788/35455/566327)
//    x |    N     | scour len | K*/len | q*      | f10/Spred | K0.9/len | Spred/N
//   29 | 1.43e+8  | 7.86e+3  | 0.0088 | 409     | 0.8492    | 0.1417   | 0.08505
//   31 | 4.15e+9  | 3.75e+4  | 0.0046 | 1092    | 0.8904    | 0.1087   | 0.06721
//   37 | 1.45e+11 | 1.98e+5  | 0.0022 | 3121    | 0.9182    | 0.0821   | 0.05383
//   41 | 5.67e+12 | 1.12e+6  | 0.0010 | 8854    | 0.9377    | 0.0609   | 0.04451
//   53 | 5.33e+17 | 2.67e+8  | 0.0001 | 2.44e+5 | 0.9672    | 0.0250   | 0.02706
//   97 | 2.94e+34 | 3.72e+16 | 2e-8   | 1.67e+10| 0.9956    | 0.0008   | 0.00932
//  central absolutes: K* = 69 / 171 / 431 / 1090 / 2.15e4 / 7.41e8;
//  K0.9 = 1.11e3 / 4.08e3 / 1.63e4 / 6.81e4 / 6.66e6 / 2.98e13;
//  Spred = 1.22e7 / 2.79e8 / 7.82e9 / 2.52e11 / 1.44e16 / 2.74e32
//  (c-envelope brackets are +-0.3% or less on every entry; raw-vs-central
//  spreads: f10/Spred -0.8/-0.5/-0.3/-0.2/-0.1/-0.01 pp, K0.9/len +4/+4/+4/
//  +3/+3/+2 %rel — read raw..central as the honest band)  done in 12.3 s
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed. Nineteen of the twenty-six are one class: the
// readings drop the `+` the run prints in its exponent.
//
// SAME VALUE, DIFFERENT NOTATION — printed with `e+`, quoted without:
//   the K* row 171 [1.71e+2], 431 [4.31e+2], 1090 [1.09e+3], 2.15e4 [2.15e+4],
//     7.41e8 [7.41e+8], and 409 [4.09e+2], which is the q* column;
//   the K0.9 row 1.11e3, 4.08e3, 1.63e4, 6.81e4, 6.66e6, 2.98e13;
//   the Spred row 1.22e7, 2.79e8, 7.82e9, 2.52e11, 1.44e16, 2.74e32.
//   Every one of these is printed on a `central:` line above, sign and all.
//
// ROUNDINGS of a printed value (printed first): 7.41e+8 -> 7.4e8,
//   3.72e+16 -> 3.7e16, 0.9956 -> 0.996 and 99.6%, 0.85 -> 0.83 in the power
//   law K_0.9 ~ scour^0.83, which is cap-24's fitted exponent quoted at two
//   places.
//
// IN-CODE: 2.3e36 (the extrapolation ceiling) and 409 both appear in the code
//   region above the banner; 2328 is the scour-prime count, printed there.
//
// DERIVED IN THIS READING: the 2e-8 of the scour, the ten-percent-certifies
//   99.6% statement, and the 1e36 in the caveat, all arithmetic on the
//   printed K* and moduli columns.
// ---------------------------------------------------------------------------
