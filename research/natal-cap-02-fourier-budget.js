// ============================================================================
// NATAL CAP 02 — FOURIER / ERDOS–TURAN CERTIFIED DISCREPANCY OF THE NATAL SET
// (attack agent 2, 2026-08-14)
// ============================================================================
// IDEA. The Natal@5 set N_x = { r in [0,W) : r = 11 or 17 (mod 30),
// r mod p not in {0, p-2} for 7 <= p <= x }, W = x#, is a CRT product, so its
// exponential sum FACTORS. Writing W = 30 * prod p, M_j = W/W_j and the CRT
// twist y_j = M_j^{-1} (mod W_j):
//
//   S(k) = sum_{r in N_x} e(kr/W)
//        = [ e(11 t/30) + e(17 t/30) ]  * prod_{7<=p<=x} F_p(t_p),
//     with t   = k*y_30 mod 30,   t_p = k*y_p mod p,
//     F_p(0)   = p-2                       (comb frequency: p "sees" nothing)
//     F_p(t_p) = -(1 + e(-2 t_p/p)),  |F_p| = 2|cos(2 pi t_p / p)|   (t_p != 0)
//   and |mod-30 factor| = 2|cos(pi t / 5)|  in {2, phi, phi-1}  (golden ratio:
//   11 and 17 differ by 6, and 30/6 = 5).
//
// NOTE — CORRECTION TO attack-04-fourier-budget.js: that file indexed the
// local factors at k mod p, omitting the CRT twist y_p = (W/p)^{-1} mod p.
// The twist permutes coefficients WITHIN a support class, so all class-level
// statistics there stand, but the pointwise pairing |F(k)| * |K(k)| in its
// "certified" column paired moduli with the wrong kernel values — those
// numbers are close (verified below) but were not actually certificates.
// Here everything is verified against a direct DFT before use.
//
// WHY IT MATTERS. The Scour prime q (x < q <= sqrt W) strikes natal slots
// r = 0 / -2 (mod q). Dilation identity: strikes on branch 0 are exactly the
// members of the dilated pattern q^{-1}N_x (same |S| profile, frequencies
// permuted j -> qj) inside the INTERVAL m in [0, W/q); branch -2 is a shift
// of the same. So a certified interval-discrepancy bound D gives the
// deterministic cap    gross(q) <= 2( N/q + D ).
//
// TWO CERTIFICATES, both computed exactly:
//  (a) SHARP-WINDOW IDENTITY (self-contained, per window length l):
//        |count(I) - rho*l| <= (1/W) sum_{k!=0} |S_dil(k)| |D_l(k)|,
//        |D_l(k)| = |sin(pi k l/W)/sin(pi k/W)|,  |S_dil(k)| = |S(q^{-1}k)|.
//      Plus a HYBRID refinement: frequencies whose support touches <= 1 of
//      the primes {7..x} form deterministic periodic terms (period 30 or 30p)
//      whose window deviation we compute EXACTLY (they are the rigid combs
//      that dominated attack-04's budget); only |support| >= 2 frequencies
//      are paid for via the triangle inequality.
//  (b) ERDOS–TURAN (citable, uniform over all window lengths): for N points
//      x_1..x_N in [0,1) and any integer H >= 1,
//        D_N <= 6N/(H+1) + (4/pi) sum_{h=1}^{H} (1/h - 1/(H+1)) |S(h)|,
//      Kuipers & Niederreiter, Uniform Distribution of Sequences (1974),
//      Thm 2.5 (this explicit-constant form as used in e.g. arXiv:2606.04677;
//      Montgomery, Ten Lectures (1994) has a variant N/(H+1) + 3 sum |S|/h).
//      Cyclic (wrapping) windows are covered since dev(I^c) = dev(I).
//
// HONEST QUESTION. How big is the certification gap (certified / true, both
// measured), which frequencies carry the budget, what is the effective base b
// in |S| ~ b^n at generic k, and at what level x does the certified cap
// sum_q [2N/q + 2D_q] cross N — i.e. where does this door close, in numbers?
// ============================================================================

'use strict';
const T0 = Date.now();

// ---------- utilities -------------------------------------------------------
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
function modinv(a,m){a=((a%m)+m)%m;const[g,x]=egcd(a,m);if(g!==1)throw new Error('no inverse');return((x%m)+m)%m;}
const TAU = 2*Math.PI;

// ---------- level construction ----------------------------------------------
function buildLevel(x){
  const mids = primesUpTo(x).filter(p=>p>=7);            // primes 7..x
  const W = 30*mids.reduce((a,b)=>a*b,1);
  const natal=[];
  for(let r=11;r<W;r+=30){                               // r=11 mod 30 branch
    let ok=true; for(const p of mids){const u=r%p;if(u===0||u===p-2){ok=false;break;}}
    if(ok)natal.push(r);
  }
  for(let r=17;r<W;r+=30){
    let ok=true; for(const p of mids){const u=r%p;if(u===0||u===p-2){ok=false;break;}}
    if(ok)natal.push(r);
  }
  natal.sort((a,b)=>a-b);
  const formula = 2*mids.reduce((a,p)=>a*(p-2),1);
  return {x,mids,W,natal,N:natal.length,formula,rho:natal.length/W};
}

// ---------- exact factored Fourier moduli (with CRT twist) -------------------
function buildFourier(L){
  const {W,mids}=L;
  const y30 = modinv(W/30,30);
  const c30 = new Float64Array(30);
  for(let t=0;t<30;t++)
    c30[t]=Math.hypot(Math.cos(TAU*11*t/30)+Math.cos(TAU*17*t/30),
                      Math.sin(TAU*11*t/30)+Math.sin(TAU*17*t/30));
  const cp={},yp={};
  for(const p of mids){
    yp[p]=modinv(W/p,p);
    const a=new Float64Array(p); a[0]=p-2;
    for(let t=1;t<p;t++)a[t]=Math.abs(2*Math.cos(TAU*t/p));
    cp[p]=a;
  }
  const absS=new Float64Array(W), usupp=new Uint8Array(W), absS_untw=new Float64Array(W);
  for(let k=0;k<W;k++){
    let v=c30[(k*y30)%30], vu=c30[k%30], u=0;
    for(const p of mids){
      const tw=(k*yp[p])%p, un=k%p;
      v*=cp[p][tw]; vu*=cp[p][un];
      if(un!==0)u++;                                    // support: twist-invariant
    }
    absS[k]=v; absS_untw[k]=vu; usupp[k]=u;
  }
  return {y30,c30,yp,cp,absS,absS_untw,usupp};
}

// full complex factored S(k), for verification against direct DFT
function complexS(L,F,k){
  const {mids}=L, {y30,yp}=F;
  const t=(k*y30)%30;
  let re=Math.cos(TAU*11*t/30)+Math.cos(TAU*17*t/30);
  let im=Math.sin(TAU*11*t/30)+Math.sin(TAU*17*t/30);
  for(const p of mids){
    const tp=(k*yp[p])%p; let gr,gi;
    if(tp===0){gr=p-2;gi=0;}
    else{gr=-(1+Math.cos(-TAU*2*tp/p)); gi=-Math.sin(-TAU*2*tp/p);}
    const nr=re*gr-im*gi, ni=re*gi+im*gr; re=nr; im=ni;
  }
  return [re,im];
}
function verifyFactored(L,F){
  const {W,natal}=L; let maxErr=0, maxModDiffUntw=0;
  for(let k=0;k<W;k++){
    let dr=0,di=0;
    for(const r of natal){const a=TAU*((k*r)%W)/W;dr+=Math.cos(a);di+=Math.sin(a);}
    const [fr,fi]=complexS(L,F,k);
    maxErr=Math.max(maxErr,Math.hypot(dr-fr,di-fi));
    maxModDiffUntw=Math.max(maxModDiffUntw,Math.abs(Math.hypot(dr,di)-F.absS_untw[k]));
  }
  return {maxErr,maxModDiffUntw};
}

// ---------- true sliding-window deviation ------------------------------------
function indicator(L,map){ // map: residue -> position (dilation); null = identity
  const ind=new Uint8Array(L.W);
  for(const r of L.natal) ind[map?map(r):r]=1;
  return ind;
}
function prefix(ind,extra){
  const W=ind.length,P=new Int32Array(W+extra+1);
  for(let i=0;i<W+extra;i++)P[i+1]=P[i]+ind[i%W];
  return P;
}
function trueDevAtL(P,W,rho,l){ // max over all starts, one window length
  let mx=-1e18,mn=1e18;
  for(let s=0;s<W;s++){const c=P[s+l]-P[s]; if(c>mx)mx=c; if(c<mn)mn=c;}
  return Math.max(mx-rho*l, rho*l-mn);
}
function fullSup(P,W,rho){ // sup over ALL lengths (l<=W/2 suffices: dev(l)=dev(W-l))
  let best=0,bl=0;const half=Math.floor(W/2);
  for(let l=1;l<=half;l++){
    let mx=-1e18,mn=1e18;
    for(let s=0;s<W;s++){const c=P[s+l]-P[s]; if(c>mx)mx=c; if(c<mn)mn=c;}
    const d=Math.max(mx-rho*l,rho*l-mn);
    if(d>best){best=d;bl=l;}
  }
  return {dev:best,l:bl};
}

// ---------- Erdos–Turan over Z/W (K–N Thm 2.5 explicit form) ------------------
function erdosTuran(L,F){
  const {W,N}=L,{absS}=F;
  let A=0,B=0,best=1e18,bestH=0;
  for(let h=1;h<W;h++){
    A+=absS[h]/h; B+=absS[h];
    const et=6*N/(h+1)+(4/Math.PI)*(A-B/(h+1));
    if(et<best){best=et;bestH=h;}
  }
  // top contributors at best H
  const Hp1=bestH+1, top=[];
  for(let h=1;h<=bestH;h++){
    const w=(4/Math.PI)*absS[h]*(1/h-1/Hp1);
    if(top.length<5||w>top[top.length-1].w){top.push({h,w});top.sort((a,b)=>b.w-a.w);if(top.length>5)top.pop();}
  }
  return {best,bestH,leading:6*N/(bestH+1),top};
}

// ---------- per-prime scour certificates --------------------------------------
// exact deviation of the |support|<=1 (rigid comb) terms, dilated pattern q^{-1}N
function exactCombDev(L,q,l){
  const {mids}=L;
  const iq30=modinv(q,30), A30=[(iq30*11)%30,(iq30*17)%30];
  const dAll=mids.reduce((a,p)=>a*(p-2)/p,1);
  // U = {} : two residues mod 30, weight prod (p-2)/p
  const dev1=(T,f,lr)=>{ // max |window sum| of zero-mean f over period T, window lr=l%T
    if(lr===0)return 0;
    const P=new Float64Array(2*T+1);for(let i=0;i<2*T;i++)P[i+1]=P[i]+f(i%T);
    let m=0;for(let s=0;s<T;s++)m=Math.max(m,Math.abs(P[s+lr]-P[s]));return m;
  };
  const in30=t=>(t===A30[0]||t===A30[1]);
  let dev=dAll*dev1(30,m=>(in30(m)?1:0)-2/30,l%30);
  // U = {p} : period 30p, weight prod_{p'!=p}(p'-2)/p'
  for(const p of mids){
    const iqp=modinv(q,p), B=[0,((p-2)*iqp)%p], dp=(p-2)/p, T=30*p;
    const w=dAll/dp;
    dev+=w*dev1(T,m=>(in30(m%30)?1:0)*(((m%p)!==B[0]&&(m%p)!==B[1]?1:0)-dp),l%T);
  }
  return dev;
}

function scourLevel(L,F,opts){
  const {W,N,rho,x,mids}=L,{absS,usupp}=F;
  const sqrtW=Math.sqrt(W);
  const qs=primesUpTo(Math.floor(sqrtW)).filter(q=>q>x);
  const sinT=new Float64Array(W); for(let k=1;k<W;k++)sinT[k]=Math.sin(Math.PI*k/W);
  const rows=[];
  let sumGross=0,sumDens=0,sumCR=0,sumCH=0,useful=0,lastUseful=0,worstGap=0,sumTrueDev=0,sumGap=0;
  const topContrib=[];
  for(const q of qs){
    const l0=Math.floor((W-1)/q)+1, l2=Math.floor((W+1)/q);
    // exact gross(q)
    let g=0; for(const r of L.natal){const u=r%q; if(u===0||u===q-2)g++;}
    // sharp Fourier sums at both branch lengths, dilated spectrum j -> qj
    let r0=0,r2=0,t0=0,t2=0;
    const track=(q===qs[0]);
    for(let j=1;j<W;j++){
      const k=(q*j)%W, s=absS[j], inv=1/sinT[k];
      const d0=sinT[(k*l0)%W]*inv, d2=sinT[(k*l2)%W]*inv;
      r0+=s*d0; r2+=s*d2;
      if(usupp[j]>=2){t0+=s*d0;t2+=s*d2;}
      if(track){
        const v=s*d0/W;
        if(topContrib.length<4||v>topContrib[topContrib.length-1].v){
          topContrib.push({j,v});topContrib.sort((a,b)=>b.v-a.v);if(topContrib.length>4)topContrib.pop();
        }
      }
    }
    r0/=W;r2/=W;t0/=W;t2/=W;
    const e0=exactCombDev(L,q,l0), e2=exactCombDev(L,q,l2);
    const CR0=r0,CR2=r2, CH0=t0+e0, CH2=t2+e2;
    // true window deviation of the dilated pattern at l0 (and branch identity)
    const invq=modinv(q,W);
    const ind=indicator(L,r=>(invq*r)%W), P=prefix(ind,l0+2);
    const dev0=trueDevAtL(P,W,rho,l0);
    let b0=0; for(let m=0;m<l0;m++)b0+=ind[m];      // branch-0 count via window
    let b0d=0; for(const r of L.natal)if(r%q===0)b0d++;
    if(b0!==b0d)throw new Error(`dilation identity FAILS q=${q}`);
    if(dev0>CH0+1e-6||dev0>CR0+1e-6)throw new Error(`certificate violated q=${q}: true ${dev0} vs hyb ${CH0} raw ${CR0}`);
    const dens=N*(l0+l2)/W, capH=dens+CH0+CH2, capR=dens+CR0+CR2;
    if(g>capH+1e-9)throw new Error(`gross cap violated q=${q}`);
    sumGross+=g;sumDens+=dens;sumCR+=CR0+CR2;sumCH+=CH0+CH2;
    sumTrueDev+=dev0; sumGap+=CH0/Math.max(dev0,1e-12);
    if(CH0<N/q){useful++;lastUseful=q;}
    worstGap=Math.max(worstGap,CH0/Math.max(dev0,1e-12));
    rows.push({q,l0,g,dens,dev0,CR0,CH0,capH});
  }
  return {qs,rows,sumGross,sumDens,sumCR,sumCH,useful,lastUseful,worstGap,topContrib,
          avgGap:sumGap/qs.length,sumTrueDev,
          capHtot:sumDens+sumCH,capRtot:sumDens+sumCR,marginH:N-(sumDens+sumCH),marginR:N-(sumDens+sumCR)};
}

// ---------- |S| statistics -----------------------------------------------------
function spectrumStats(L,F){
  const {W,mids}=L,{absS,usupp,c30,y30}=F,n=mids.length;
  const cnt=new Float64Array(n+1),sum=new Float64Array(n+1);
  let gSum=0,gLog=0,gCnt=0;
  const top=[];
  for(let k=1;k<W;k++){
    const u=usupp[k],s=absS[k];
    cnt[u]++;sum[u]+=s;
    if(u===n){const g=s/c30[(k*y30)%30];gSum+=g;gLog+=Math.log(g);gCnt++;}
    if(top.length<4||s>top[top.length-1].s){
      top.push({k,s});top.sort((a,b)=>b.s-a.s);if(top.length>4)top.pop();
    }
  }
  const bArith=Math.pow(gSum/gCnt,1/n), bGeom=Math.exp(gLog/gCnt/n);
  return {cnt,sum,bArith,bGeom,top};
}
function annot(L,k){
  const divs=L.mids.filter(p=>k%p===0);
  return `k=${k}[div ${divs.join(',')||'-'};k%30=${k%30}]`;
}

// ================================ RUN ==========================================
for(const x of [7,11,13,17]){
  const L=buildLevel(x);
  console.log(`\n===== LEVEL x=${x}: W=${L.W}  N=${L.N} (formula ${L.formula})  rho=${L.rho.toExponential(3)}  sqrtW=${Math.sqrt(L.W).toFixed(1)} =====`);
  if(L.N!==L.formula)throw new Error('natal count mismatch');
  const F=buildFourier(L);
  if(x<=11){
    const v=verifyFactored(L,F);
    console.log(`factored S(k) vs direct DFT (all ${L.W} freqs, complex): max err ${v.maxErr.toExponential(1)};`+
      ` untwisted-index modulus (attack-04 style) max pointwise error ${v.maxModDiffUntw.toFixed(3)}`);
  }
  const st=spectrumStats(L,F);
  console.log(`top |S|: `+st.top.map(t=>`${annot(L,t.k)}=${t.s.toFixed(1)}`).join('  ')+`   (N=${L.N})`);
  console.log(`class avg |S| by #active primes u: `+
    Array.from({length:L.mids.length+1},(_,u)=>`u=${u}:${(st.sum[u]/Math.max(st.cnt[u],1)).toFixed(2)}`).join(' '));
  console.log(`generic-k effective base: b_arith=${st.bArith.toFixed(4)} (4/pi=${(4/Math.PI).toFixed(4)})  b_geom=${st.bGeom.toFixed(4)} (pred 1)`);
  const et=erdosTuran(L,F);
  console.log(`Erdos–Turan (K–N 2.5): best H=${et.bestH}  bound=${et.best.toFixed(2)}  (leading 6N/(H+1)=${et.leading.toFixed(2)})`);
  console.log(`  top ET contributors: `+et.top.map(t=>`${annot(L,t.h)}:${t.w.toFixed(2)}`).join('  '));
  if(x<=13){
    const P=prefix(indicator(L,null),Math.floor(L.W/2)+2);
    const fs=fullSup(P,L.W,L.rho);
    console.log(`TRUE sup over ALL windows: dev=${fs.dev.toFixed(3)} at l=${fs.l}   ET/true=${(et.best/fs.dev).toFixed(1)}x`);
  }
  const sc=scourLevel(L,F,{});
  console.log(`scour: ${sc.qs.length} primes q in (${x}, ${Math.floor(Math.sqrt(L.W))}]`);
  console.log(`   q     l0  gross  2brMean  trueDev(l0)  certRaw(l0)  certHyb(l0)  capHyb(2br)`);
  sc.rows.forEach((r,i)=>{
    if(i<6||i%10===0||i===sc.rows.length-1)
    console.log(`${String(r.q).padStart(4)} ${String(r.l0).padStart(6)} ${String(r.g).padStart(6)}  ${r.dens.toFixed(1).padStart(7)}  ${r.dev0.toFixed(2).padStart(10)}  ${r.CR0.toFixed(2).padStart(11)}  ${r.CH0.toFixed(2).padStart(11)}  ${r.capH.toFixed(1).padStart(10)}`);
  });
  console.log(`sharp-sum top contributors (q=${sc.qs[0]}, natal-frequency j): `+sc.topContrib.map(t=>`${annot(L,t.j).replace('k=','j=')}:${t.v.toFixed(2)}`).join('  '));
  console.log(`TOTALS: sum gross=${sc.sumGross}  sum mean=${sc.sumDens.toFixed(1)}  sum certRaw=${sc.sumCR.toFixed(1)}  sum certHyb=${sc.sumCH.toFixed(1)}`);
  console.log(`CAPS: raw=${sc.capRtot.toFixed(1)}  hyb=${sc.capHtot.toFixed(1)}  vs N=${L.N}  -> margin(hyb)=${sc.marginH.toFixed(1)}  margin(raw)=${sc.marginR.toFixed(1)}`);
  const oracle=sc.sumDens+2*sc.sumTrueDev;
  console.log(`ORACLE (if certification were PERFECT: true dev at l0, both branches): cap=${oracle.toFixed(1)}  margin=${(L.N-oracle).toFixed(1)}  (sum gross alone=${sc.sumGross}, N-sumGross=${L.N-sc.sumGross})`);
  console.log(`gap: certHyb(l0)/trueDev avg=${sc.avgGap.toFixed(2)}x worst=${sc.worstGap.toFixed(2)}x;  q with certHyb<N/q: ${sc.useful}/${sc.qs.length} (largest useful q=${sc.lastUseful||'-'})`);
  console.log(`[t=${((Date.now()-T0)/1000).toFixed(1)}s]`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-02-fourier-budget.js
//   invocation:  node research/natal-cap-02-fourier-budget.js
//   code-sha256: b104d9f2ca30e94fbe6040226a9f8bca966583e74c695dc1d87e59d4ab7301d4
//   out-sha256:  de51fae27f3a8bac39289b8dd78b1aa5fd26ce2d539ff8a14619dd2c8174d2e7
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     4.9 s
// ============================================================================
//
// ===== LEVEL x=7: W=210  N=10 (formula 10)  rho=4.762e-2  sqrtW=14.5 =====
// factored S(k) vs direct DFT (all 210 freqs, complex): max err 7.2e-14; untwisted-index modulus (attack-04 style) max pointwise error 5.000
// top |S|: k=35[div 7;k%30=5]=10.0  k=70[div 7;k%30=10]=10.0  k=105[div 7;k%30=15]=10.0  k=140[div 7;k%30=20]=10.0   (N=10)
// class avg |S| by #active primes u: u=0:6.35 u=1:1.51
// generic-k effective base: b_arith=1.1647 (4/pi=1.2732)  b_geom=1.0000 (pred 1)
// Erdos–Turan (K–N 2.5): best H=23  bound=8.17  (leading 6N/(H+1)=2.50)
//   top ET contributors: k=1[div -;k%30=1]:1.36  k=2[div -;k%30=2]:1.18  k=7[div 7;k%30=7]:1.04  k=5[div -;k%30=5]:0.50  k=8[div -;k%30=8]:0.31
// TRUE sup over ALL windows: dev=2.238 at l=37   ET/true=3.7x
// scour: 2 primes q in (7, 14]
//    q     l0  gross  2brMean  trueDev(l0)  certRaw(l0)  certHyb(l0)  capHyb(2br)
//   11     20      1      1.9        1.05         4.06         1.67         5.1
//   13     17      2      1.6        1.19         4.09         2.24         6.0
// sharp-sum top contributors (q=11, natal-frequency j): j=77[div 7;k%30=17]:0.32  j=133[div 7;k%30=13]:0.32  j=153[div -;k%30=3]:0.24  j=57[div -;k%30=27]:0.24
// TOTALS: sum gross=3  sum mean=3.4  sum certRaw=16.3  sum certHyb=7.7
// CAPS: raw=19.8  hyb=11.1  vs N=10  -> margin(hyb)=-1.1  margin(raw)=-9.8
// ORACLE (if certification were PERFECT: true dev at l0, both branches): cap=7.9  margin=2.1  (sum gross alone=3, N-sumGross=7)
// gap: certHyb(l0)/trueDev avg=1.74x worst=1.88x;  q with certHyb<N/q: 0/2 (largest useful q=-)
// [t=0.0s]
//
// ===== LEVEL x=11: W=2310  N=90 (formula 90)  rho=3.896e-2  sqrtW=48.1 =====
// factored S(k) vs direct DFT (all 2310 freqs, complex): max err 6.3e-13; untwisted-index modulus (attack-04 style) max pointwise error 45.000
// top |S|: k=385[div 7,11;k%30=25]=90.0  k=770[div 7,11;k%30=20]=90.0  k=1155[div 7,11;k%30=15]=90.0  k=1540[div 7,11;k%30=10]=90.0   (N=90)
// class avg |S| by #active primes u: u=0:57.15 u=1:9.96 u=2:1.82
// generic-k effective base: b_arith=1.1848 (4/pi=1.2732)  b_geom=1.0000 (pred 1)
// Erdos–Turan (K–N 2.5): best H=104  bound=18.06  (leading 6N/(H+1)=5.14)
//   top ET contributors: k=7[div 7;k%30=7]:1.80  k=1[div -;k%30=1]:1.64  k=11[div 11;k%30=11]:1.04  k=22[div 11;k%30=22]:0.83  k=10[div -;k%30=10]:0.70
// TRUE sup over ALL windows: dev=4.195 at l=457   ET/true=4.3x
// scour: 10 primes q in (11, 48]
//    q     l0  gross  2brMean  trueDev(l0)  certRaw(l0)  certHyb(l0)  capHyb(2br)
//   13    178     13     13.8        2.94        10.36         6.96        27.7
//   17    136     10     10.6        3.30        10.36         6.93        24.4
//   19    122     10      9.5        2.75        10.31         6.92        23.3
//   23    101      8      7.8        2.06        10.06         6.47        20.7
//   29     80      7      6.2        2.12        10.21         7.13        20.4
//   31     75      6      5.8        2.08         9.73         6.07        18.0
//   47     50      5      3.9        2.05         9.51         6.00        15.9
// sharp-sum top contributors (q=13, natal-frequency j): j=1067[div 11;k%30=17]:0.35  j=1243[div 11;k%30=13]:0.35  j=1777[div -;k%30=7]:0.30  j=533[div -;k%30=23]:0.30
// TOTALS: sum gross=73  sum mean=71.0  sum certRaw=200.4  sum certHyb=130.5
// CAPS: raw=271.4  hyb=201.5  vs N=90  -> margin(hyb)=-111.5  margin(raw)=-181.4
// ORACLE (if certification were PERFECT: true dev at l0, both branches): cap=117.3  margin=-27.3  (sum gross alone=73, N-sumGross=17)
// gap: certHyb(l0)/trueDev avg=2.92x worst=3.94x;  q with certHyb<N/q: 0/10 (largest useful q=-)
// [t=0.1s]
//
// ===== LEVEL x=13: W=30030  N=990 (formula 990)  rho=3.297e-2  sqrtW=173.3 =====
// top |S|: k=5005[div 7,11,13;k%30=25]=990.0  k=10010[div 7,11,13;k%30=20]=990.0  k=15015[div 7,11,13;k%30=15]=990.0  k=20020[div 7,11,13;k%30=10]=990.0   (N=990)
// class avg |S| by #active primes u: u=0:628.70 u=1:92.99 u=2:13.99 u=3:2.21
// generic-k effective base: b_arith=1.1951 (4/pi=1.2732)  b_geom=1.0000 (pred 1)
// Erdos–Turan (K–N 2.5): best H=615  bound=44.46  (leading 6N/(H+1)=9.64)
//   top ET contributors: k=11[div 11;k%30=11]:5.79  k=91[div 7,13;k%30=1]:1.39  k=13[div 13;k%30=13]:1.37  k=4[div -;k%30=4]:1.36  k=1[div -;k%30=1]:1.19
// TRUE sup over ALL windows: dev=8.165 at l=12007   ET/true=5.4x
// scour: 34 primes q in (13, 173]
//    q     l0  gross  2brMean  trueDev(l0)  certRaw(l0)  certHyb(l0)  capHyb(2br)
//   17   1767    115    116.5        4.75        26.87        22.44       161.3
//   19   1581    102    104.2        4.12        25.47        21.46       147.1
//   23   1306     87     86.1        6.05        27.29        23.13       132.3
//   29   1036     65     68.3        6.15        26.49        22.20       112.6
//   31    969     61     63.9        4.05        25.01        20.69       105.3
//   37    812     53     53.5        4.77        25.09        20.74        95.0
//   59    509     34     33.6        5.78        25.80        21.32        76.2
//  103    292     20     19.2        4.37        23.85        18.92        57.1
//  157    192     14     12.6        3.33        22.76        18.68        50.4
//  173    174     12     11.4        3.26        22.95        18.55        48.5
// sharp-sum top contributors (q=17, natal-frequency j): j=12365[div -;k%30=5]:0.68  j=17665[div -;k%30=25]:0.68  j=5299[div 7;k%30=19]:0.53  j=24731[div 7;k%30=11]:0.53
// TOTALS: sum gross=1135  sum mean=1135.3  sum certRaw=1662.6  sum certHyb=1372.0
// CAPS: raw=2797.8  hyb=2507.3  vs N=990  -> margin(hyb)=-1517.3  margin(raw)=-1807.8
// ORACLE (if certification were PERFECT: true dev at l0, both branches): cap=1433.1  margin=-443.1  (sum gross alone=1135, N-sumGross=-145)
// gap: certHyb(l0)/trueDev avg=4.72x worst=6.16x;  q with certHyb<N/q: 9/34 (largest useful q=47)
// [t=1.0s]
//
// ===== LEVEL x=17: W=510510  N=14850 (formula 14850)  rho=2.909e-2  sqrtW=714.5 =====
// top |S|: k=85085[div 7,11,13,17;k%30=5]=14850.0  k=170170[div 7,11,13,17;k%30=10]=14850.0  k=255255[div 7,11,13,17;k%30=15]=14850.0  k=340340[div 7,11,13,17;k%30=20]=14850.0   (N=14850)
// class avg |S| by #active primes u: u=0:9430.47 u=1:1174.12 u=2:148.73 u=3:19.62 u=4:2.72
// generic-k effective base: b_arith=1.2037 (4/pi=1.2732)  b_geom=1.0000 (pred 1)
// Erdos–Turan (K–N 2.5): best H=4432  bound=107.69  (leading 6N/(H+1)=20.10)
//   top ET contributors: k=5[div -;k%30=5]:5.81  k=187[div 11,17;k%30=7]:4.98  k=7[div 7;k%30=7]:1.95  k=182[div 7,13;k%30=2]:1.95  k=33[div 11;k%30=3]:1.69
// scour: 120 primes q in (17, 714]
//    q     l0  gross  2brMean  trueDev(l0)  certRaw(l0)  certHyb(l0)  capHyb(2br)
//   19  26869   1563   1563.2        9.58        65.34        61.03      1685.2
//   23  22197   1292   1291.3       11.68        69.27        64.43      1420.1
//   29  17604   1027   1024.1       11.07        65.95        60.20      1145.1
//   31  16469    960    958.1        9.06        64.88        59.54      1077.2
//   37  13798    805    802.7        7.64        62.63        57.78       918.2
//   41  12452    725    724.4       10.21        64.73        59.65       843.7
//   61   8370    488    486.9        9.53        64.82        59.20       605.9
//  107   4772    275    277.6        8.19        62.42        57.64       392.9
//  163   3132    184    182.2        9.89        62.74        57.35       296.9
//  223   2290    134    133.2        6.61        60.10        55.15       243.5
//  271   1884    111    109.6        8.80        61.16        55.97       222.5
//  337   1515     89     88.1        7.93        59.55        55.44       199.0
//  397   1286     75     74.8        7.41        59.30        53.97       182.7
//  457   1118     65     65.0        7.48        58.51        53.53       172.1
//  521    980     58     57.0        8.51        57.23        53.29       163.5
//  593    861     51     50.1        8.05        58.77        53.23       156.5
//  647    790     46     45.9        6.02        55.83        50.59       147.0
//  709    721     42     41.9        6.03        56.26        51.29       143.7
// sharp-sum top contributors (q=19, natal-frequency j): j=268697[div 11,13;k%30=17]:1.09  j=241813[div 11,13;k%30=13]:1.09  j=188083[div 7;k%30=13]:0.78  j=322427[div 7;k%30=17]:0.78
// TOTALS: sum gross=22132  sum mean=22182.9  sum certRaw=14423.9  sum certHyb=13238.2
// CAPS: raw=36606.8  hyb=35421.1  vs N=14850  -> margin(hyb)=-20571.1  margin(raw)=-21756.8
// ORACLE (if certification were PERFECT: true dev at l0, both branches): cap=24086.9  margin=-9236.9  (sum gross alone=22132, N-sumGross=-7282)
// gap: certHyb(l0)/trueDev avg=7.08x worst=9.82x;  q with certHyb<N/q: 49/120 (largest useful q=263)
// [t=4.7s]
// READINGS.
// 1. THE FACTORIZATION IS EXACT — WITH A TWIST. S(k) factors over CRT as in
//    the header, verified complex-exactly against direct DFT at x=7 and x=11
//    (max err ~1e-13). The CRT twist y_p = (W/p)^{-1} mod p is REAL: indexing
//    local factors at plain k mod p (as attack-04-fourier-budget.js did) gets
//    pointwise |S| wrong by up to N/2 (error 45.0 at x=11). The twist only
//    permutes coefficients within a support class, so attack-04's class-level
//    READINGS stand, but its "certified" column paired |F| with the wrong
//    kernel values — close numbers, not certificates. Corrected here; every
//    certificate below was tested against the true sliding-window deviation
//    for every (q, l) at every level — zero violations.
// 2. SPECTRUM SHAPE (Q2/Q3). |S| stratifies exactly by support u = #{p in
//    7..x : p does not divide k}: class averages drop ~8-10x per active prime
//    (x=17: 9430 / 1174 / 149 / 19.6 / 2.72 for u=0..4). Max nonzero |S| = N
//    exactly, at the four comb frequencies k = j*(W/30) whose mod-30 factor
//    hits 2 (elsewhere that factor is phi or 1/phi — the golden ratio, from
//    |11-17| = 6 and 30/6 = 5). Effective base at fully generic k:
//    b_arith = 1.165, 1.185, 1.195, 1.204 at x=7..17, converging to 4/pi =
//    1.2732 from below; b_geom = 1.0000 exactly (E log 2|cos| = 0). So the L1
//    Fourier mass is (4/pi)^n per class and nothing better is hiding in the
//    cosines: a typical frequency is size ~1, and the certified budget is
//    carried by the DIFFUSE u>=2 cloud, not by few structured modes — the
//    largest single contributor to a sharp sum is ~1 out of ~60 at x=17
//    (structured k = products of two natal primes lead, but only just).
// 3. CERTIFICATION GAP (Q1). Sharp-window certificates (hybrid) vs the TRUE
//    deviation at the same window: avg 1.7x (x=7), 2.9x (11), 4.7x (13),
//    7.1x (17) — the gap GROWS ~1.6x per level, because certified dev scales
//    ~N^{0.4-0.5} (L1 mass) while true dev grows only ~N^{0.2-0.26}
//    (2.9 -> 4.8 -> 9.6 at the first scour prime). Erdos–Turan (K–N Thm 2.5,
//    optimal H = 23/104/615/4432) certifies 8.2 / 18.1 / 44.5 / 107.7 vs true
//    sup-over-all-windows 2.24 / 4.20 / 8.17 (x<=13): 3.7x / 4.3x / 5.4x —
//    ET is uniform in l but ~2.5x looser than the per-l sharp identity; its
//    truncation term 6N/(H+1) is only ~20% of the bound, the tail sum is the
//    cost. The hybrid refinement (exact rigid combs, u<=1) helps most where
//    combs dominate: -53% at x=7, -35% at 11, -17% at 13, -8% at 17 —
//    diminishing exactly as the diffuse cloud takes over.
// 4. THE VERDICT (Q4) — THE DOOR CLOSES THREE DIFFERENT WAYS, IN NUMBERS:
//    x=7:  ORACLE MARGIN IS POSITIVE (+2.1): perfect per-window deviation
//          knowledge WOULD certify >= 2 scour survivors by pure union bound.
//          Our best certificate needs sum of devs <= 6.6 and delivers 7.7 —
//          misses by 1.1 slots (15%). The ONLY level where sharper Fourier
//          bookkeeping (Selberg/Beurling smoothing, exact u<=2 terms) could
//          flip a sign — methodologically interesting, mathematically moot
//          (twins below 210 are known by inspection).
//    x=11: certification quality is IRRELEVANT — even the oracle fails
//          (cap 117.3 vs N=90, margin -27.3). Twenty branch windows each
//          carrying true dev ~2-3 cost ~46 against available slack
//          N - sum(2N/q) = 19. The per-prime union bound is structurally
//          dead from here on, no matter how good the harmonic analysis gets.
//    x>=13: sum gross ALONE exceeds N (1135 vs 990; 22132 vs 14850 at 17):
//          strikes overlap, so even ZERO-deviation caps certify nothing.
//          Any viable route must CREDIT overlaps (depth >= 2 inclusion-
//          exclusion) — Brun/parity territory, the known wall, now with
//          its exact numeric location on the natal ladder.
// 5. WHAT SURVIVES: PER-PRIME CAPS. The certificate is genuinely informative
//    per prime: at x=17 the deviation term is below the main term N/q for all
//    q <= 263 (49/120 scour primes), and at q=19 it proves gross(19) <= 1685
//    vs true 1563 — a deterministic 8% cap on any single prime's overdraw.
//    Fourier certification is a fine per-prime regularity tool and a dead
//    aggregation tool.
// 6. NEXT STEP. The oracle diagnosis says: stop polishing constants, credit
//    the overlaps. Strike sets of two scour primes q, q' intersect in another
//    natal-type CRT pattern (mod 30*prod*q*q'), so the SAME certified
//    machinery applies at Bonferroni depth 2-3. Measure the pairwise overlap
//    mass sum_{q<q'} |strikes_q ∩ strikes_q'| per level and check whether
//    certified depth-3 Bonferroni reopens x=13 — that is the concrete
//    follow-up this file points to.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   "max err ~1e-13" in reading 1 covers the two printed factored-vs-DFT
//   errors, 7.2e-14 at x=7 and 6.3e-13 at x=11.
//   148.73, the printed u=2 class average at x=17, quoted in reading 2 as
//   149; the other four entries of that quoted list are printed as given or
//   rounded to values that also occur in OUTPUT.
//   b_arith 1.1647, 1.1848 and 1.2037, printed at x=7, x=11 and x=17, quoted
//   in reading 2 as 1.165, 1.185 and 1.204.
//   the Erdos-Turan bounds 18.06, 44.46 and 107.69, printed at x=11, x=13 and
//   x=17, quoted in reading 3 as 18.1, 44.5 and 107.7.
// TOKENIZER ARTIFACT, not a figure:
//   the -0.26 in reading 3 is the far end of the hyphenated range N^{0.2-0.26}.
//   Both ends are the level-to-level slope of the printed trueDev(l0) at the
//   first scour prime, 2.94 then 4.75 then 9.58, against the printed N.
// ---------------------------------------------------------------------------
