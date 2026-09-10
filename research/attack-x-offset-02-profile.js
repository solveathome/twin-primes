// ============================================================================
// ATTACK-X-OFFSET 02 — WHERE THE OFFSET LIVES: LINE, CONTROL, MARGINALS, BINS
// (2026-08-20 — TODO item X: the ~3.8 law's −0.45% offset needs a mechanism)
// ============================================================================
// WHY. `research/attack-x-offset-01-terms.js` prices the candidate corrections
// to 1 − J = 4S₂ against the two sharp residuals (Δ = 1.20e−4 at @29, 1.18e−4
// at @31, both positive = formula high) and finds the family {no correction,
// −S₃, −2S₃, multiplicative, absolute, ∝S₂/lnW} alive and degenerate at the
// measured levels. Degenerate families are separated by mechanisms, not fits.
// This file measures five things the aggregate census cannot say, at the same
// levels, with the same segmented instrument (adapted from
// `research/xchan-at29-01-segmented.js`, whose embedded OUTPUT is this file's
// validation gate):
//
//   (1) THE LINE. The same mixed super-W census on the WHOLE 11/17 (mod 30)
//       line, natal sieve off. J_line − 1 measures the pure lattice/
//       equidistribution bias of the CRT solution points against the cut at
//       W — a bias that would contaminate the natal J identically and is NOT
//       natal structure. If J_line carries a stable negative offset of the
//       natal residual's size, the offset is the line's, not the sieve's.
//   (2) THE CONTROL, truth known in the same pass. A seeded random mask on
//       the line at the natal density (sfc32, seeds in-file; the house record
//       on LCGs is why it is not an LCG). Each control draw is an unbiased
//       subsample of the line, so its TRUTH is J_line of the same level:
//       (J_ctrl − J_line) must sit at 0 within the slot-clustered σ the
//       estimator itself reports. This calibrates both the instrument (no
//       manufactured offset) and the σ scale that the @31 detection
//       z = −2.32 rests on. Several seeds per level.
//   (3) THE MARGINALS. n_q^L = #{natal r: q | r} and n_q^R likewise for r+2,
//       accumulated exactly during marking; then the marginal-corrected
//       denominator CRT' = N̄·Σ_{i<j<k, super}[∏(u_L+u_R) − ∏u_L − ∏u_R],
//       u = n/N̄, by the same monotone-pointer tail pass. J_marg = obs/CRT'
//       answers: how much of the offset is marginal discrepancy (the per-prime
//       strike counts not being exactly N̄/q over one period)?
//   (4) Q1-BINS. The deficit decomposed by the triple's SMALLEST prime, in
//       NB geometric bands: obs_b, CRT_b and a slot-clustered σ_b per band.
//       An S₃-type correction is a smallest-prime story; the profile is the
//       constraint any future derivation must fit.
//   (5) ∏Q-BINS. The deficit decomposed by the octave of ∏Q/W: bin m holds
//       ∏Q ∈ (2^m·W, 2^{m+1}·W]. The numerator and the denominator use the
//       SAME exact integer U-tests (∏Q > 2^m·W ⟺ q₁q₂ > ⌊2^m·W/q₃⌋, the
//       census's own exactness lever), so no float log ever decides a bin.
//       This asks directly whether the deficit — and the offset — is a
//       boundary layer at ∏Q ≈ W.
//
// REGISTERED EXPECTATIONS, written before any new number below existed
// (the @19 shakedown of an earlier revision of this file, which had no ∏Q
// bins, is disclosed: it showed the natal q₁-profile peaked near W^{1/3} and
// extreme-bin surpluses shared with the line; that sighting is what added
// measurement (5), and @19 is therefore not blind for (4)):
//   E1 the natal gate reproduces xchan's embedded obs/CRT/J/σ at every level.
//   E2 every control draw sits within 3σ_slot(ctrl) of its own line value —
//      else the σ that carries the @31 detection is miscalibrated and the
//      offset's evidence grade falls with it.
//   E3 P1 (aligned super-W ≡ 0) holds on the line and on every control draw
//      (it is a theorem about ∏Q > W, not about the sieve).
//   E4 no expectation is registered for J_line, J_marg or either profile at
//      the sharp levels: they are the measurement.
//
// UNITS. Everything is in J-units (dimensionless count ratios), as in
// attack-x-offset-01. σ is always the slot-clustered floor of the pooled-floor
// fix (defect-repairs.md item 3). The offset d stays σ-free.
//
//   node --max-old-space-size=8192 research/attack-x-offset-02-profile.js
//   optional args: levels, e.g. `-- 19 23` (default 19 23 29 31)
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const ex = (v, d = 4) => Number.isFinite(v) ? v.toExponential(d) : String(v);
const el = () => ((Date.now() - T00) / 1000).toFixed(1) + 's';
const say = (s) => process.stderr.write(s + '\n');

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function inv(a,m){let r0=a%m;if(r0<0)r0+=m;let r1=m,s0=1,s1=0;
  while(r1!==0){const q=Math.floor(r0/r1),t=r0-q*r1,u=s0-q*s1;r0=r1;r1=t;s0=s1;s1=u;}
  let s=s0%m;if(s<0)s+=m;return s;}
const C3=(n)=>n<3?0:n*(n-1)*(n-2)/6, C2=(n)=>n<2?0:n*(n-1)/2;
function sfc32(a,b,c,d){return function(){
  a>>>=0;b>>>=0;c>>>=0;d>>>=0;
  let t=(a+b)|0;a=b^b>>>9;b=c+(c<<3)|0;c=(c<<21|c>>>11);d=d+1|0;t=t+d|0;c=c+t|0;
  return (t>>>0)/4294967296;};}

// ---------------------------------------------------------------------------
// THE GATE — research/xchan-at29-01-segmented.js, embedded OUTPUT, verbatim:
// mixed super-W obs, CRT (2 dp), J (6 dp), σ_slot (6 dp), N̄.
// ---------------------------------------------------------------------------
const GATE = {
  19:{N:252450,     supMx:74065,      CRT:77162.70,      J:0.959855, sSlot:0.007107},
  23:{N:5301450,    supMx:1807665,    CRT:1871421.20,    J:0.965932, sSlot:0.001493},
  29:{N:143139150,  supMx:53660192,   CRT:55252747.16,   J:0.971177, sSlot:0.000279},
  31:{N:4151035350, supMx:1653241687, CRT:1695051393.52, J:0.975334, sSlot:0.000051},
};
const NB=8;                                   // geometric smallest-prime bins
const NQ=12;                                  // ∏Q/W octave bins
const SEEDS={19:[1],23:[1,2,3],29:[1,2,3],31:[]}; // control draws per level

function level(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const Nbar=2*basePs.reduce((a,p)=>a*(p-2),1);
  const K=qs.length;
  // U2[m*K+k] = ⌊2^m·W/q_k⌋, integer-corrected; m = 0 is the census's own U
  if(W*2**(NQ-1)>=2**53)throw new Error('2^(NQ-1)·W exceeds 2^53');
  const U2=new Float64Array(NQ*K);
  for(let m=0;m<NQ;m++){const WM=W*2**m;
    for(let k=0;k<K;k++){let u=Math.floor(WM/qs[k]);
      while(u*qs[k]>WM)u--; while((u+1)*qs[k]<=WM)u++; U2[m*K+k]=u;}}
  const q0=qs[0],qK=qs[K-1],binOf=new Uint8Array(K);
  const lw=Math.log(qK/q0)+1e-12;
  for(let m=0;m<K;m++){let b=Math.floor(NB*Math.log(qs[m]/q0)/lw);
    if(b>=NB)b=NB-1;binOf[m]=b;}
  let S2=0,S3=0;for(const q of qs){S2+=1/(q*q);S3+=1/(q*q*q);}
  return {x,W,basePs,qs,K,U2,Nbar,binOf,S2,S3,y:qK};
}

// tail pass: miss aggregate, per smallest-prime bin, per ∏Q-octave bin, and
// the marginal-corrected super-W mixed expectation per unit N
function tails(L,uL,uR){
  const {qs,K,U2,binOf}=L;
  const T=new Float64Array(K+1);
  for(let m=K-1;m>=0;m--)T[m]=T[m+1]+1/qs[m];
  let TB=null,TL=null,TR=null;
  if(uL){TB=new Float64Array(K+1);TL=new Float64Array(K+1);TR=new Float64Array(K+1);
    for(let m=K-1;m>=0;m--){TB[m]=TB[m+1]+uL[m]+uR[m];TL[m]=TL[m+1]+uL[m];TR[m]=TR[m+1]+uR[m];}}
  let miss=0,marg=0;
  const missB=new Float64Array(NB),missQ=new Float64Array(NQ);
  const pm=new Int32Array(NQ),stm=new Int32Array(NQ);
  for(let i=0;i<K;i++){
    const qi=qs[i],bi=binOf[i];pm.fill(K);
    for(let j=i+1;j<K;j++){
      const t=qi*qs[j];
      for(let m=0;m<NQ;m++){let p=pm[m];const base=m*K;
        while(p>0&&t>U2[base+p-1])p--;pm[m]=p;
        stm[m]=p>j+1?p:j+1;}
      const rt=1/t,m0=T[stm[0]]*rt;
      miss+=m0;missB[bi]+=m0;
      for(let m=0;m<NQ-1;m++)missQ[m]+=(T[stm[m]]-T[stm[m+1]])*rt;
      missQ[NQ-1]+=T[stm[NQ-1]]*rt;
      if(uL)marg+=(uL[i]+uR[i])*(uL[j]+uR[j])*TB[stm[0]]-uL[i]*uL[j]*TL[stm[0]]-uR[i]*uR[j]*TR[stm[0]];
    }
    if(K>20000&&i%Math.ceil(K/12)===0)say(`      tails @${L.x}: i=${i}/${K}  [${el()}]`);
  }
  return {miss,missB,missQ,marg};
}

// ---------------------------------------------------------------------------
// THE SEGMENTED CENSUS — xchan-at29-01's kernel with three masks and bins.
// mode: 'natal' | 'line' | seed number (control)
// ---------------------------------------------------------------------------
const LC=7;
function census(L,SEGK,mode){
  const {W,basePs,qs,K,U2,binOf}=L;
  const lgW=Math.log2(W);
  const kmax=W/30,nSeg=Math.ceil(kmax/SEGK),MS=2*SEGK;
  const A=new Uint8Array(MS),a=new Uint8Array(MS),b=new Uint8Array(MS);
  // la/lb store the INDEX into qs (read back as qv[ia[i]] and U[ia[k]]), not the
  // prime. These were Uint16Array, which silently wraps an index mod 65536: safe
  // at every level this file has run — @19 (K=435), @23 (K=1739), @29 (K=7863),
  // @31 (K=37534, 1.75x under the cap) — and ALIASING from @37 up (K=198274),
  // where two thirds of the indices would read back as a different and always
  // smaller scour prime. This is the identical mechanism, in the identical role,
  // as the xchan-at37-01-census.js defect of 2026-08-21, which cost five hours of
  // compute and read as a clean refutation of a pre-registered law. It was masked
  // here only by the UNRELATED 2^53 octave guard at the head of level(), which
  // happens to throw first at @37 — accidental, not designed, and one lowered NQ
  // away from being gone. Widened to Uint32Array 2026-08-21 with the throw below.
  // Every internal identity in this file is a COUNT identity and would have
  // stayed PASS throughout, which is why only the value would have looked wrong.
  if(K>0xFFFFFFFF)throw new Error(`scour index ${K} exceeds the la/lb container width at @${L.x}`);
  const la=new Uint32Array(LC*MS),lb=new Uint32Array(LC*MS);
  const cls=[11,17];
  const baseR=[];
  for(const p of basePs){const i30=inv(30%p,p),row=[];
    for(let t=0;t<2;t++)for(const z of [0,(p-2)%p]){
      let d=(z-cls[t])%p;if(d<0)d+=p;row.push(cls[t]+30*((d*i30)%p));}
    baseR.push({p,row});}
  const Ra=new Float64Array(2*K),Rb=new Float64Array(2*K);
  for(let m=0;m<K;m++){const q=qs[m],i30=inv(30%q,q);
    for(let t=0;t<2;t++){
      let d=(0-cls[t])%q;if(d<0)d+=q;Ra[2*m+t]=cls[t]+30*((d*i30)%q);
      let e2=(q-2-cls[t])%q;if(e2<0)e2+=q;Rb[2*m+t]=cls[t]+30*((e2*i30)%q);}}
  const isNatal=mode==='natal',isLine=mode==='line';
  const rng=(typeof mode==='number')?sfc32(0x9E3779B9^L.x,0xC0FFEE,0x20260820|0,mode):null;
  const P=L.Nbar/(W/15);
  let Nc=0;
  const B3=[0,0,0,0],sub=[0,0,0,0],sup=[0,0,0,0];
  let SX=0,SX2=0,maxA=0,maxB=0;
  const nL=new Float64Array(K),nR=new Float64Array(K);
  const supB=new Float64Array(NB),SXb=new Float64Array(NB),SX2b=new Float64Array(NB),xsb=new Float64Array(NB);
  const supQ=new Float64Array(NQ),SXq=new Float64Array(NQ),SX2q=new Float64Array(NQ),xsq=new Float64Array(NQ);
  const lg2q=Float64Array.from(qs,q=>Math.log2(q));
  const ia=new Int32Array(LC),ib=new Int32Array(LC);
  const qv=Float64Array.from(qs);
  // ∏Q-octave of the super triple (t = q_i·q_j exact, k = third index):
  // guess by float log, fix by the exact integer tests. Returns m with
  // ∏Q ∈ (2^m·W, 2^{m+1}·W]; caller guarantees ∏Q > W (m ≥ 0 exists).
  function qbin(t,k){
    let m=Math.floor(Math.log2(t)+lg2q[k]-lgW);
    if(m<0)m=0;if(m>=NQ)m=NQ-1;
    while(m+1<NQ&&t>U2[(m+1)*K+k])m++;
    while(m>0&&t<=U2[m*K+k])m--;
    return m;
  }
  const tick=Math.max(1,Math.ceil(nSeg/24));
  for(let seg=0;seg<nSeg;seg++){
    const k0=seg*SEGK,k1=Math.min(kmax,k0+SEGK),Ms=2*(k1-k0),V0=30*k0;
    a.fill(0,0,Ms);b.fill(0,0,Ms);
    if(isLine)A.fill(1,0,Ms);
    else if(isNatal){A.fill(1,0,Ms);
      for(const {p,row} of baseR){const m30=30*p;
        for(let c=0;c<4;c++){const t=c>>1,R=row[c];
          let v=R+m30*Math.ceil((V0-R)/m30);
          while(v<V0)v+=m30; while(v-m30>=V0)v-=m30;
          for(let idx=2*((v-cls[t])/30-k0)+t;idx<Ms;idx+=2*p)A[idx]=0;}}}
    else{for(let idx=0;idx<Ms;idx++)A[idx]=rng()<P?1:0;}
    for(let m=0;m<K;m++){const q=qs[m],m30=30*q,st=2*q;
      for(let t=0;t<2;t++){
        let v=Ra[2*m+t];v=v+m30*Math.ceil((V0-v)/m30);
        while(v<V0)v+=m30; while(v-m30>=V0)v-=m30;
        for(let idx=2*((v-cls[t])/30-k0)+t;idx<Ms;idx+=st)
          if(A[idx]){const c=a[idx]++;if(c<LC)la[LC*idx+c]=m;if(isNatal)nL[m]++;}
        let w=Rb[2*m+t];w=w+m30*Math.ceil((V0-w)/m30);
        while(w<V0)w+=m30; while(w-m30>=V0)w-=m30;
        for(let idx=2*((w-cls[t])/30-k0)+t;idx<Ms;idx+=st)
          if(A[idx]){const c=b[idx]++;if(c<LC)lb[LC*idx+c]=m;if(isNatal)nR[m]++;}}}
    for(let idx=0;idx<Ms;idx++){
      if(!A[idx])continue;
      const av=a[idx],bv=b[idx];Nc++;
      if(av>maxA)maxA=av; if(bv>maxB)maxB=bv;
      B3[3]+=C3(av);B3[2]+=C2(av)*bv;B3[1]+=av*C2(bv);B3[0]+=C3(bv);
      if(av+bv<3)continue;
      if(av>=LC||bv>=LC)throw new Error(`divisor list capacity ${LC} exceeded: a=${av} b=${bv}`);
      const base=LC*idx;
      const mx0=sup[2]+sup[1];
      xsb.fill(0);xsq.fill(0);
      for(let i=0;i<av;i++)ia[i]=la[base+i];
      for(let i=0;i<bv;i++)ib[i]=lb[base+i];
      const U=U2;                              // m = 0 slice is the plain U
      for(let i=0;i<av;i++)for(let j=i+1;j<av;j++){
        const t=qv[ia[i]]*qv[ia[j]];
        for(let k=j+1;k<av;k++){if(t>U[ia[k]])sup[3]++;else sub[3]++;}
        for(let k=0;k<bv;k++){if(t>U[ib[k]]){sup[2]++;
            xsb[binOf[Math.min(ia[i],ib[k])]]++;xsq[qbin(t,ib[k])]++;}
          else sub[2]++;}}
      for(let i=0;i<bv;i++)for(let j=i+1;j<bv;j++){
        const t=qv[ib[i]]*qv[ib[j]];
        for(let k=j+1;k<bv;k++){if(t>U[ib[k]])sup[0]++;else sub[0]++;}
        for(let k=0;k<av;k++){if(t>U[ia[k]]){sup[1]++;
            xsb[binOf[Math.min(ib[i],ia[k])]]++;xsq[qbin(t,ia[k])]++;}
          else sub[1]++;}}
      const xs=sup[2]+sup[1]-mx0;SX+=xs;SX2+=xs*xs;
      if(xs>0){
        for(let bq=0;bq<NB;bq++){const v=xsb[bq];if(v>0){supB[bq]+=v;SXb[bq]+=v;SX2b[bq]+=v*v;}}
        for(let mq=0;mq<NQ;mq++){const v=xsq[mq];if(v>0){supQ[mq]+=v;SXq[mq]+=v;SX2q[mq]+=v*v;}}
      }
    }
    if(nSeg>=8&&seg%tick===0)say(`      ${mode} seg ${seg+1}/${nSeg}  [${el()}]`);
  }
  return {Nc,B3,sub,sup,maxA,maxB,SX,SX2,nL,nR,supB,SXb,SX2b,supQ,SXq,SX2q};
}

function binTable(tag,N,C,TM,Dagg,L){
  console.log(`  ${tag} Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = ${f(Dagg,6)}):`);
  console.log(`     b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b`);
  for(let bq=0;bq<NB;bq++){
    const lo=Math.ceil(L.qs[0]*Math.pow(L.y/L.qs[0],bq/NB)),hi=Math.floor(L.qs[0]*Math.pow(L.y/L.qs[0],(bq+1)/NB));
    const CRTb=6*N*TM.missB[bq];if(CRTb===0){console.log(`     ${bq} | (empty)`);continue;}
    const Db=1-C.supB[bq]/CRTb;
    const sb=Math.sqrt(Math.max(C.SX2b[bq]-C.SXb[bq]*C.SXb[bq]/N,0))/CRTb;
    console.log(`     ${bq} | ${String(lo).padStart(8)}..${String(hi).padEnd(8)} | ${f(TM.missB[bq]/TM.miss,4)}    | ${String(C.supB[bq]).padStart(13)} | ${f(Db,6).padStart(9)} | ${f(sb,6)} | ${f((Db-Dagg)/sb,2)}`);
  }
  console.log(`  ${tag} ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):`);
  console.log(`     m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m`);
  for(let mq=0;mq<NQ;mq++){
    const CRTm=6*N*TM.missQ[mq];if(CRTm===0){console.log(`     ${mq} | (empty)`);continue;}
    const Dm=1-C.supQ[mq]/CRTm;
    const sm=Math.sqrt(Math.max(C.SX2q[mq]-C.SXq[mq]*C.SXq[mq]/N,0))/CRTm;
    console.log(`     ${mq}${mq===NQ-1?'+':' '}| ${f(TM.missQ[mq]/TM.miss,4)}    | ${String(C.supQ[mq]).padStart(13)} | ${f(Dm,6).padStart(9)} | ${f(sm,6)} | ${f((Dm-Dagg)/sm,2)}`);
  }
}

// ---------------------------------------------------------------------------
// DRIVER
// ---------------------------------------------------------------------------
const ARG=process.argv.slice(2).map(Number).filter(v=>v>0);
const LEVELS=ARG.length?ARG:[19,23,29,31];
const SEGK=1<<20;
console.log('ATTACK-X-OFFSET 02 — line, control, marginals and bins for the ~3.8 law\'s offset');
console.log(`instrument: xchan-at29-01-segmented.js kernel, adapted; gate: its embedded OUTPUT   levels: ${LEVELS.join(', ')}   bins: ${NB} geometric in q1, ${NQ} octaves of ∏Q/W\n`);
let gateBad=0;
const SUMMARY=[];
for(const x of LEVELS){
  const L=level(x);
  const {W,qs,K,Nbar}=L;
  console.log(`===== @${x}: W=${W} K=${K} (${qs[0]}..${L.y})  4S2=${f(4*L.S2,6)}  S3=${ex(L.S3)}`);
  const CN=census(L,SEGK,'natal');
  const N=CN.Nc;
  const TM=tails(L,CN.nL.map((v)=>v/N),CN.nR.map((v)=>v/N));
  const supMx=CN.sup[2]+CN.sup[1],supAl=CN.sup[3]+CN.sup[0];
  const CRT=6*N*TM.miss,J=supMx/CRT;
  const sSlot=Math.sqrt(Math.max(CN.SX2-CN.SX*CN.SX/N,0))/CRT;
  let ident=0;for(let c=0;c<4;c++)if(Math.abs(CN.sub[c]+CN.sup[c]-CN.B3[c])>1e-9)ident++;
  let binSum=0,qSum=0,obsB=0,obsQ=0;
  for(let bq=0;bq<NB;bq++){binSum+=TM.missB[bq];obsB+=CN.supB[bq];}
  for(let mq=0;mq<NQ;mq++){qSum+=TM.missQ[mq];obsQ+=CN.supQ[mq];}
  console.log(`  NATAL: N̄=${N} (formula ${Nbar}: ${N===Nbar?'PASS':'FAIL'})  obs=${supMx}  CRT=${f(CRT,2)}  J=${f(J,6)}  σ_slot=${f(sSlot,6)}`);
  console.log(`    identities: sub+sup=B3 ${ident===0?'PASS':'FAIL'} | P1 aligned=0 ${supAl===0?'PASS':'FAIL'} | Σ_b miss_b − miss = ${ex(binSum-TM.miss,2)} | Σ_m missQ_m − miss = ${ex(qSum-TM.miss,2)} | Σ_b obs_b = obs ${obsB===supMx?'PASS':'FAIL'} | Σ_m obs_m = obs ${obsQ===supMx?'PASS':'FAIL'}`);
  const G=GATE[x];
  if(G){
    let bad=0,ln='';
    if(N!==G.N){bad++;ln+=` N̄`;} if(supMx!==G.supMx){bad++;ln+=` obs`;}
    if(Number(f(CRT,2))!==G.CRT){bad++;ln+=` CRT`;} if(Number(f(J,6))!==G.J){bad++;ln+=` J`;}
    if(Number(f(sSlot,6))!==G.sSlot){bad++;ln+=` σ`;}
    gateBad+=bad;
    console.log(`    GATE vs xchan-at29-01 embedded OUTPUT: ${bad===0?'ALL PASS':'FAIL:'+ln}`);
  }
  const CRTm=N*TM.marg,Jm=supMx/CRTm;
  const D=4*L.S2-(1-J),Dm=4*L.S2-(1-Jm);
  console.log(`  MARGINALS: CRT' = ${f(CRTm,2)}   CRT'/CRT − 1 = ${ex(CRTm/CRT-1,3)}`);
  console.log(`    J_marg=${f(Jm,6)}  1−J_marg=${f(1-Jm,6)}  Δ(smooth)=${ex(D,3)} → Δ(marginal)=${ex(Dm,3)}  moved ${f(100*(D-Dm)/D,1)}% of the residual`);
  binTable('NATAL',N,CN,TM,1-J,L);
  // ---- LINE
  const CL=census(L,SEGK,'line');
  const NL=CL.Nc,supMxL=CL.sup[2]+CL.sup[1],supAlL=CL.sup[3]+CL.sup[0];
  const CRTL=6*NL*TM.miss,JL=supMxL/CRTL;
  const sL=Math.sqrt(Math.max(CL.SX2-CL.SX*CL.SX/NL,0))/CRTL;
  console.log(`  LINE: N=${NL} (W/15 = ${W/15}: ${NL===W/15?'PASS':'FAIL'})  obs=${supMxL}  CRT=${f(CRTL,2)}  J_line=${f(JL,6)}`);
  console.log(`    J_line − 1 = ${ex(JL-1,3)}   σ_slot(line)=${f(sL,6)}   z vs 1 = ${f((JL-1)/sL,2)}   P1 aligned=0 ${supAlL===0?'PASS':'FAIL'}`);
  binTable('LINE',NL,CL,TM,1-JL,L);
  // ---- CONTROLS
  const ctr=[];
  for(const sd of SEEDS[x]||[]){
    const CC=census(L,SEGK,sd);
    const NC2=CC.Nc,supMxC=CC.sup[2]+CC.sup[1];
    const CRTC=6*NC2*TM.miss,JC=supMxC/CRTC;
    const sC=Math.sqrt(Math.max(CC.SX2-CC.SX*CC.SX/NC2,0))/CRTC;
    const zC=(JC-JL)/sC;
    ctr.push({sd,JC,sC,zC});
    console.log(`  CTRL seed ${sd}: N=${NC2} (expected ≈ ${Math.round(L.Nbar)})  J_ctrl=${f(JC,6)}  σ_slot=${f(sC,6)}  TRUTH J_line=${f(JL,6)}  z=(J_ctrl−J_line)/σ = ${f(zC,2)}  ${Math.abs(zC)<=3?'PASS':'FAIL'}  P1 ${CC.sup[3]+CC.sup[0]===0?'PASS':'FAIL'}`);
  }
  SUMMARY.push({x,J,sSlot,D,Dm,S3:L.S3,JL,sL,ctr});
  console.log(`  [level done ${el()}]\n`);
}
console.log('===== SUMMARY =====');
console.log('  x |  Δ = 4S2−(1−J) | Δ after marginal corr. |   S3     | J_line − 1 (z)      | ctrl draws z');
for(const r of SUMMARY){
  const cz=r.ctr.map(c=>f(c.zC,2)).join(', ');
  console.log(` ${String(r.x).padStart(2)} | ${ex(r.D,3).padStart(11)} | ${ex(r.Dm,3).padStart(11)}            | ${ex(r.S3,2)} | ${ex(r.JL-1,2).padStart(9)} (${f((r.JL-1)/r.sL,2)}) | ${cz||'—'}`);
}
console.log(`\nGATE vs xchan embedded OUTPUT: ${gateBad===0?'ALL LEVELS PASS':gateBad+' FAILURES'}`);
console.log(`[total ${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=8192 research/attack-x-offset-02-profile.js
//   invocation:  node --max-old-space-size=8192 research/attack-x-offset-02-profile.js
//   code-sha256: 3b3e3e0929b09c0d1fd740d77be6cd369cb2e2ee7220e67c7e70bb360413d301
//   out-sha256:  08eb11b53348c361914df6dd5a26e468692fc6d0b17cdbf4b01c379a97c91a47
//   body-lines:  467
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     2340.2 s
// ============================================================================
// ATTACK-X-OFFSET 02 — line, control, marginals and bins for the ~3.8 law's offset
// instrument: xchan-at29-01-segmented.js kernel, adapted; gate: its embedded OUTPUT   levels: 19, 23, 29, 31   bins: 8 geometric in q1, 12 octaves of ∏Q/W
//
// ===== @19: W=9699690 K=435 (23..3109)  4S2=0.041122  S3=2.5433e-4
//   NATAL: N̄=252450 (formula 252450: PASS)  obs=74065  CRT=77162.70  J=0.959855  σ_slot=0.007107
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | Σ_b miss_b − miss = 9.02e-17 | Σ_m missQ_m − miss = 9.02e-17 | Σ_b obs_b = obs PASS | Σ_m obs_m = obs PASS
//     GATE vs xchan-at29-01 embedded OUTPUT: ALL PASS
//   MARGINALS: CRT' = 77048.59   CRT'/CRT − 1 = -1.479e-3
//     J_marg=0.961277  1−J_marg=0.038723  Δ(smooth)=9.772e-4 → Δ(marginal)=2.399e-3  moved -145.5% of the residual
//   NATAL Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = 0.040145):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       23..42       | 0.1893    |         14517 |  0.005957 | 0.012390 | -2.76
//      1 |       43..78       | 0.2396    |         18339 |  0.008235 | 0.011583 | -2.76
//      2 |       79..144      | 0.2446    |         18516 |  0.018913 | 0.011480 | -1.85
//      3 |      145..267      | 0.1795    |         12377 |  0.106596 | 0.011533 | 5.76
//      4 |      268..493      | 0.0942    |          5619 |  0.227031 | 0.013969 | 13.38
//      5 |      494..911      | 0.0388    |          2710 |  0.095457 | 0.024850 | 2.23
//      6 |      912..1683     | 0.0124    |          1606 | -0.674011 | 0.062121 | -11.50
//      7 |     1684..3109     | 0.0015    |           381 | -2.284307 | 0.252857 | -9.19
//   NATAL ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.2297    |         17041 |  0.038512 | 0.009813 | -0.17
//      1 | 0.2054    |         14530 |  0.083172 | 0.009942 | 4.33
//      2 | 0.1742    |         12376 |  0.079306 | 0.010502 | 3.73
//      3 | 0.1382    |         10041 |  0.058355 | 0.011474 | 1.59
//      4 | 0.1000    |          7503 |  0.027176 | 0.013662 | -0.95
//      5 | 0.0664    |          4650 |  0.091833 | 0.015654 | 3.30
//      6 | 0.0419    |          2928 |  0.093551 | 0.018948 | 2.82
//      7 | 0.0246    |          2076 | -0.093817 | 0.027615 | -4.85
//      8 | 0.0128    |          1567 | -0.580906 | 0.047954 | -12.95
//      9 | 0.0054    |           940 | -1.247306 | 0.092917 | -13.86
//      10 | 0.0014    |           386 | -2.512634 | 0.242379 | -10.53
//      11+| 0.0001    |            27 | -3.990225 | 1.267045 | -3.18
//   LINE: N=646646 (W/15 = 646646: PASS)  obs=199603  CRT=197650.84  J_line=1.009877
//     J_line − 1 = 9.877e-3   σ_slot(line)=0.004310   z vs 1 = 2.29   P1 aligned=0 PASS
//   LINE Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = -0.009877):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       23..42       | 0.1893    |         37955 | -0.014626 | 0.007543 | -0.63
//      1 |       43..78       | 0.2396    |         47698 | -0.007030 | 0.007069 | 0.40
//      2 |       79..144      | 0.2446    |         48554 | -0.004371 | 0.007017 | 0.78
//      3 |      145..267      | 0.1795    |         35928 | -0.012451 | 0.007831 | -0.33
//      4 |      268..493      | 0.0942    |         18579 |  0.002221 | 0.010023 | 1.21
//      5 |      494..911      | 0.0388    |          7505 |  0.022044 | 0.014530 | 2.20
//      6 |      912..1683     | 0.0124    |          2768 | -0.126387 | 0.028040 | -4.16
//      7 |     1684..3109     | 0.0015    |           616 | -1.073043 | 0.111382 | -9.55
//   LINE ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.2297    |         45557 | -0.003489 | 0.006009 | 1.06
//      1 | 0.2054    |         40658 | -0.001560 | 0.006253 | 1.33
//      2 | 0.1742    |         33787 |  0.018719 | 0.006569 | 4.35
//      3 | 0.1382    |         27149 |  0.006031 | 0.007233 | 2.20
//      4 | 0.1000    |         20352 | -0.030185 | 0.008470 | -2.40
//      5 | 0.0664    |         13536 | -0.032077 | 0.010188 | -2.18
//      6 | 0.0419    |          8498 | -0.027065 | 0.012629 | -1.36
//      7 | 0.0246    |          5055 | -0.039794 | 0.016424 | -1.82
//      8 | 0.0128    |          2808 | -0.105969 | 0.023814 | -4.04
//      9 | 0.0054    |          1535 | -0.432688 | 0.043069 | -9.82
//      10 | 0.0014    |           622 | -1.209758 | 0.109235 | -10.98
//      11+| 0.0001    |            46 | -2.319120 | 0.586174 | -3.94
//   CTRL seed 1: N=252839 (expected ≈ 252450)  J_ctrl=1.009943  σ_slot=0.006871  TRUTH J_line=1.009877  z=(J_ctrl−J_line)/σ = 0.01  PASS  P1 PASS
//   [level done 0.3s]
//
// ===== @23: W=223092870 K=1739 (29..14929)  4S2=0.033678  S3=1.7214e-4
//   NATAL: N̄=5301450 (formula 5301450: PASS)  obs=1807665  CRT=1871421.20  J=0.965932  σ_slot=0.001493
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | Σ_b miss_b − miss = 4.02e-16 | Σ_m missQ_m − miss = 3.40e-16 | Σ_b obs_b = obs PASS | Σ_m obs_m = obs PASS
//     GATE vs xchan-at29-01 embedded OUTPUT: ALL PASS
//   MARGINALS: CRT' = 1873118.39   CRT'/CRT − 1 = 9.069e-4
//     J_marg=0.965056  1−J_marg=0.034944  Δ(smooth)=-3.902e-4 → Δ(marginal)=-1.265e-3  moved -224.3% of the residual
//   NATAL Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = 0.034068):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       29..63       | 0.1791    |        318617 |  0.049645 | 0.002528 | 6.16
//      1 |       64..138      | 0.2115    |        387241 |  0.021564 | 0.002447 | -5.11
//      2 |      139..301      | 0.2465    |        465574 | -0.009435 | 0.002399 | -18.13
//      3 |      302..657      | 0.1990    |        364948 |  0.020237 | 0.002489 | -5.56
//      4 |      658..1436     | 0.1033    |        165406 |  0.144700 | 0.002849 | 38.83
//      5 |     1437..3134     | 0.0451    |         62604 |  0.257520 | 0.003976 | 56.20
//      6 |     3135..6840     | 0.0138    |         34191 | -0.323975 | 0.010384 | -34.48
//      7 |     6841..14928    | 0.0017    |          9084 | -1.888706 | 0.045589 | -42.18
//   NATAL ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.2123    |        385194 |  0.030658 | 0.002033 | -1.68
//      1 | 0.1873    |        328318 |  0.063234 | 0.002093 | 13.93
//      2 | 0.1597    |        279057 |  0.066440 | 0.002215 | 14.62
//      3 | 0.1306    |        235320 |  0.037412 | 0.002413 | 1.39
//      4 | 0.1007    |        187899 |  0.003355 | 0.002738 | -11.22
//      5 | 0.0731    |        134669 |  0.015302 | 0.003148 | -5.96
//      6 | 0.0515    |         90168 |  0.064995 | 0.003546 | 8.72
//      7 | 0.0352    |         58198 |  0.116684 | 0.004095 | 20.18
//      8 | 0.0230    |         37279 |  0.132226 | 0.005007 | 19.61
//      9 | 0.0140    |         28058 | -0.071208 | 0.007228 | -14.57
//      10 | 0.0077    |         21482 | -0.490078 | 0.011829 | -44.31
//      11+| 0.0048    |         22023 | -1.447784 | 0.022498 | -65.87
//   LINE: N=14872858 (W/15 = 14872858: PASS)  obs=5289194  CRT=5250145.09  J_line=1.007438
//     J_line − 1 = 7.438e-3   σ_slot(line)=0.000858   z vs 1 = 8.67   P1 aligned=0 PASS
//   LINE Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = -0.007438):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       29..63       | 0.1791    |        953902 | -0.014194 | 0.001523 | -4.44
//      1 |       64..138      | 0.2115    |       1116920 | -0.005943 | 0.001438 | 1.04
//      2 |      139..301      | 0.2465    |       1300173 | -0.004826 | 0.001378 | 1.89
//      3 |      302..657      | 0.1990    |       1048574 | -0.003436 | 0.001483 | 2.70
//      4 |      658..1436     | 0.1033    |        546719 | -0.007701 | 0.001897 | -0.14
//      5 |     1437..3134     | 0.0451    |        234372 |  0.009195 | 0.002681 | 6.20
//      6 |     3135..6840     | 0.0138    |         72838 | -0.005370 | 0.004748 | 0.44
//      7 |     6841..14928    | 0.0017    |         15696 | -0.779162 | 0.018682 | -41.31
//   LINE ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.2123    |       1121666 | -0.006147 | 0.001198 | 1.08
//      1 | 0.1873    |        986022 | -0.002820 | 0.001251 | 3.69
//      2 | 0.1597    |        830500 |  0.009649 | 0.001321 | 12.94
//      3 | 0.1306    |        681403 |  0.006459 | 0.001434 | 9.69
//      4 | 0.1007    |        534646 | -0.010840 | 0.001618 | -2.10
//      5 | 0.0731    |        389705 | -0.015714 | 0.001859 | -4.45
//      6 | 0.0515    |        274480 | -0.014548 | 0.002177 | -3.27
//      7 | 0.0352    |        188659 | -0.020671 | 0.002619 | -5.05
//      8 | 0.0230    |        123948 | -0.028447 | 0.003247 | -6.47
//      9 | 0.0140    |         76854 | -0.045885 | 0.004201 | -9.15
//      10 | 0.0077    |         43224 | -0.068709 | 0.005735 | -10.68
//      11+| 0.0048    |         38087 | -0.508946 | 0.009539 | -52.58
//   CTRL seed 1: N=5303380 (expected ≈ 5301450)  J_ctrl=1.008494  σ_slot=0.001438  TRUTH J_line=1.007438  z=(J_ctrl−J_line)/σ = 0.73  PASS  P1 PASS
//   CTRL seed 2: N=5300996 (expected ≈ 5301450)  J_ctrl=1.007801  σ_slot=0.001438  TRUTH J_line=1.007438  z=(J_ctrl−J_line)/σ = 0.25  PASS  P1 PASS
//   CTRL seed 3: N=5298932 (expected ≈ 5301450)  J_ctrl=1.009607  σ_slot=0.001440  TRUTH J_line=1.007438  z=(J_ctrl−J_line)/σ = 1.51  PASS  P1 PASS
//   [level done 5.4s]
//
// ===== @29: W=6469693230 K=7863 (31..80429)  4S2=0.028943  S3=1.3114e-4
//   NATAL: N̄=143139150 (formula 143139150: PASS)  obs=53660192  CRT=55252747.16  J=0.971177  σ_slot=0.000279
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | Σ_b miss_b − miss = -1.11e-14 | Σ_m missQ_m − miss = -9.99e-15 | Σ_b obs_b = obs PASS | Σ_m obs_m = obs PASS
//     GATE vs xchan-at29-01 embedded OUTPUT: ALL PASS
//   MARGINALS: CRT' = 55260829.78   CRT'/CRT − 1 = 1.463e-4
//     J_marg=0.971035  1−J_marg=0.028965  Δ(smooth)=1.201e-4 → Δ(marginal)=-2.196e-5  moved 118.3% of the residual
//   NATAL Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = 0.028823):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       31..82       | 0.1403    |       7215544 |  0.069160 | 0.000515 | 78.39
//      1 |       83..221      | 0.1849    |       9780650 |  0.042622 | 0.000462 | 29.89
//      2 |      222..591      | 0.2488    |      13774337 | -0.001907 | 0.000440 | -69.77
//      3 |      592..1579     | 0.2288    |      12796639 | -0.012225 | 0.000454 | -90.41
//      4 |     1580..4218     | 0.1266    |       6701257 |  0.042136 | 0.000519 | 25.67
//      5 |     4219..11269    | 0.0527    |       2249507 |  0.226761 | 0.000670 | 295.56
//      6 |    11270..30106    | 0.0160    |        871171 |  0.012439 | 0.001464 | -11.19
//      7 |    30107..80429    | 0.0019    |        271087 | -1.523500 | 0.007054 | -220.05
//   NATAL ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.1944    |      10496248 |  0.023033 | 0.000382 | -15.14
//      1 | 0.1714    |       9000379 |  0.049820 | 0.000396 | 53.00
//      2 | 0.1477    |       7704134 |  0.055817 | 0.000419 | 64.38
//      3 | 0.1235    |       6556038 |  0.039504 | 0.000453 | 23.58
//      4 | 0.0994    |       5431885 |  0.010539 | 0.000502 | -36.45
//      5 | 0.0764    |       4216929 |  0.001456 | 0.000563 | -48.64
//      6 | 0.0577    |       3165387 |  0.006372 | 0.000640 | -35.08
//      7 | 0.0428    |       2308439 |  0.023425 | 0.000722 | -7.47
//      8 | 0.0310    |       1605449 |  0.063424 | 0.000814 | 42.49
//      9 | 0.0218    |       1060163 |  0.120978 | 0.000940 | 98.01
//      10 | 0.0148    |        683985 |  0.160760 | 0.001114 | 118.48
//      11+| 0.0191    |       1431156 | -0.357921 | 0.001512 | -255.84
//   LINE: N=431312882 (W/15 = 431312882: PASS)  obs=167385191  CRT=166489891.93  J_line=1.005377
//     J_line − 1 = 5.377e-3   σ_slot(line)=0.000155   z vs 1 = 34.73   P1 aligned=0 PASS
//   LINE Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = -0.005377):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       31..82       | 0.1403    |      23640635 | -0.012118 | 0.000302 | -22.35
//      1 |       83..221      | 0.1849    |      30952156 | -0.005478 | 0.000268 | -0.37
//      2 |      222..591      | 0.2488    |      41552996 | -0.003055 | 0.000244 | 9.50
//      3 |      592..1579     | 0.2288    |      38191210 | -0.002560 | 0.000252 | 11.19
//      4 |     1580..4218     | 0.1266    |      21145305 | -0.003062 | 0.000310 | 7.46
//      5 |     4219..11269    | 0.0527    |       8822600 | -0.006443 | 0.000452 | -2.36
//      6 |    11270..30106    | 0.0160    |       2596065 |  0.023343 | 0.000758 | 37.87
//      7 |    30107..80429    | 0.0019    |        484224 | -0.495915 | 0.002741 | -178.94
//   LINE ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.1944    |      32487540 | -0.003526 | 0.000218 | 8.50
//      1 | 0.1714    |      28611873 | -0.002438 | 0.000229 | 12.86
//      2 | 0.1477    |      24460195 |  0.005149 | 0.000242 | 43.56
//      3 | 0.1235    |      20441059 |  0.006144 | 0.000260 | 44.38
//      4 | 0.0994    |      16636832 | -0.005738 | 0.000287 | -1.26
//      5 | 0.0764    |      12856281 | -0.010305 | 0.000322 | -15.30
//      6 | 0.0577    |       9698711 | -0.010362 | 0.000364 | -13.68
//      7 | 0.0428    |       7204601 | -0.011493 | 0.000418 | -14.63
//      8 | 0.0310    |       5242365 | -0.014938 | 0.000488 | -19.61
//      9 | 0.0218    |       3703351 | -0.019032 | 0.000582 | -23.47
//      10 | 0.0148    |       2515950 | -0.024489 | 0.000709 | -26.97
//      11+| 0.0191    |       3526433 | -0.110425 | 0.000751 | -139.90
//   CTRL seed 1: N=143156081 (expected ≈ 143139150)  J_ctrl=1.005512  σ_slot=0.000269  TRUTH J_line=1.005377  z=(J_ctrl−J_line)/σ = 0.50  PASS  P1 PASS
//   CTRL seed 2: N=143128122 (expected ≈ 143139150)  J_ctrl=1.005882  σ_slot=0.000269  TRUTH J_line=1.005377  z=(J_ctrl−J_line)/σ = 1.88  PASS  P1 PASS
//   CTRL seed 3: N=143128607 (expected ≈ 143139150)  J_ctrl=1.005317  σ_slot=0.000269  TRUTH J_line=1.005377  z=(J_ctrl−J_line)/σ = -0.23  PASS  P1 PASS
//   [level done 150.7s]
//
// ===== @31: W=200560490130 K=37534 (37..447829)  4S2=0.024784  S3=9.7575e-5
//   NATAL: N̄=4151035350 (formula 4151035350: PASS)  obs=1653241687  CRT=1695051393.52  J=0.975334  σ_slot=0.000051
//     identities: sub+sup=B3 PASS | P1 aligned=0 PASS | Σ_b miss_b − miss = -3.18e-14 | Σ_m missQ_m − miss = -2.74e-14 | Σ_b obs_b = obs PASS | Σ_m obs_m = obs PASS
//     GATE vs xchan-at29-01 embedded OUTPUT: ALL PASS
//   MARGINALS: CRT' = 1694939179.95   CRT'/CRT − 1 = -6.620e-5
//     J_marg=0.975399  1−J_marg=0.024601  Δ(smooth)=1.185e-4 → Δ(marginal)=1.831e-4  moved -54.5% of the residual
//   NATAL Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = 0.024666):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       37..119      | 0.1347    |     212422084 |  0.069405 | 0.000096 | 465.00
//      1 |      120..388      | 0.1749    |     284799069 |  0.039375 | 0.000085 | 172.81
//      2 |      389..1256     | 0.2390    |     402396121 |  0.006612 | 0.000080 | -225.55
//      3 |     1257..4070     | 0.2345    |     401063354 | -0.009194 | 0.000082 | -415.25
//      4 |     4071..13183    | 0.1405    |     238343150 | -0.000831 | 0.000093 | -273.07
//      5 |    13184..42695    | 0.0573    |      82635060 |  0.148980 | 0.000123 | 1014.23
//      6 |    42696..138276   | 0.0172    |      23791720 |  0.181815 | 0.000221 | 711.24
//      7 |   138277..447829   | 0.0021    |       7791129 | -1.222953 | 0.001124 | -1109.54
//   NATAL ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.1780    |     296181784 |  0.018096 | 0.000071 | -92.64
//      1 | 0.1577    |     256633158 |  0.039943 | 0.000074 | 207.47
//      2 | 0.1373    |     221945206 |  0.046613 | 0.000078 | 282.64
//      3 | 0.1171    |     191183779 |  0.036417 | 0.000083 | 141.06
//      4 | 0.0970    |     162016924 |  0.014498 | 0.000091 | -111.43
//      5 | 0.0777    |     130794896 |  0.006413 | 0.000100 | -181.79
//      6 | 0.0612    |     102951306 |  0.007990 | 0.000111 | -150.39
//      7 | 0.0478    |      80491858 |  0.006884 | 0.000125 | -142.80
//      8 | 0.0369    |      61932102 |  0.008837 | 0.000140 | -113.19
//      9 | 0.0280    |      46278393 |  0.023496 | 0.000157 | -7.47
//      10 | 0.0208    |      33123767 |  0.059368 | 0.000178 | 195.10
//      11+| 0.0407    |      69708514 | -0.011228 | 0.000163 | -220.63
//   LINE: N=13370699342 (W/15 = 13370699342: PASS)  obs=5481871992  CRT=5459848120.06  J_line=1.004034
//     J_line − 1 = 4.034e-3   σ_slot(line)=0.000027   z vs 1 = 147.59   P1 aligned=0 PASS
//   LINE Q1-BINS (smallest prime; D_b = 1 − obs_b/CRT_b, aggregate D = -0.004034):
//      b |  q1 range        | CRT share |     obs_b     |   D_b      |  σ_b     | (D_b−D)/σ_b
//      0 |       37..119      | 0.1347    |     742668009 | -0.010086 | 0.000054 | -111.77
//      1 |      120..388      | 0.1749    |     958998757 | -0.004235 | 0.000048 | -4.18
//      2 |      389..1256     | 0.2390    |    1307691798 | -0.002243 | 0.000043 | 41.42
//      3 |     1257..4070     | 0.2345    |    1282163076 | -0.001630 | 0.000044 | 55.10
//      4 |     4071..13183    | 0.1405    |     768765579 | -0.002200 | 0.000052 | 35.13
//      5 |    13184..42695    | 0.0573    |     314604273 | -0.005872 | 0.000076 | -24.09
//      6 |    42696..138276   | 0.0172    |      92253176 |  0.015061 | 0.000128 | 148.98
//      7 |   138277..447829   | 0.0021    |      14727324 | -0.304536 | 0.000420 | -714.65
//   LINE ∏Q-BINS (octaves of ∏Q/W; bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]):
//      m | CRT share |     obs_m     |   D_m      |  σ_m     | (D_m−D)/σ_m
//      0 | 0.1780    |     973603161 | -0.002063 | 0.000039 | 50.45
//      1 | 0.1577    |     863011555 | -0.002312 | 0.000041 | 41.97
//      2 | 0.1373    |     747653200 |  0.002929 | 0.000043 | 160.78
//      3 | 0.1171    |     635465737 |  0.005666 | 0.000046 | 210.03
//      4 | 0.0970    |     530956198 | -0.002670 | 0.000050 | 27.13
//      5 | 0.0777    |     427139748 | -0.007367 | 0.000055 | -60.06
//      6 | 0.0612    |     336651501 | -0.007087 | 0.000062 | -49.57
//      7 | 0.0478    |     263149674 | -0.007983 | 0.000069 | -57.40
//      8 | 0.0369    |     203104212 | -0.009138 | 0.000078 | -65.74
//      9 | 0.0280    |     154236099 | -0.010379 | 0.000089 | -71.67
//      10 | 0.0208    |     114850414 | -0.012546 | 0.000103 | -82.89
//      11+| 0.0407    |     232050493 | -0.045077 | 0.000090 | -455.32
//   [level done 2340.1s]
//
// ===== SUMMARY =====
//   x |  Δ = 4S2−(1−J) | Δ after marginal corr. |   S3     | J_line − 1 (z)      | ctrl draws z
//  19 |    9.772e-4 |    2.399e-3            | 2.54e-4 |   9.88e-3 (2.29) | 0.01
//  23 |   -3.902e-4 |   -1.265e-3            | 1.72e-4 |   7.44e-3 (8.67) | 0.73, 0.25, 1.51
//  29 |    1.201e-4 |   -2.196e-5            | 1.31e-4 |   5.38e-3 (34.73) | 0.50, 1.88, -0.23
//  31 |    1.185e-4 |    1.831e-4            | 9.76e-5 |   4.03e-3 (147.59) | —
//
// GATE vs xchan embedded OUTPUT: ALL LEVELS PASS
// [total 2340.1s]
// ───── stderr ─────
//       natal seg 1/8  [0.5s]
//       natal seg 2/8  [0.6s]
//       natal seg 3/8  [0.7s]
//       natal seg 4/8  [0.8s]
//       natal seg 5/8  [0.9s]
//       natal seg 6/8  [1.0s]
//       natal seg 7/8  [1.0s]
//       natal seg 8/8  [1.0s]
//       line seg 1/8  [1.5s]
//       line seg 2/8  [1.6s]
//       line seg 3/8  [1.8s]
//       line seg 4/8  [2.0s]
//       line seg 5/8  [2.1s]
//       line seg 6/8  [2.3s]
//       line seg 7/8  [2.4s]
//       line seg 8/8  [2.4s]
//       1 seg 1/8  [2.6s]
//       1 seg 2/8  [2.8s]
//       1 seg 3/8  [2.9s]
//       1 seg 4/8  [3.0s]
//       1 seg 5/8  [3.2s]
//       1 seg 6/8  [3.3s]
//       1 seg 7/8  [3.5s]
//       1 seg 8/8  [3.5s]
//       2 seg 1/8  [3.6s]
//       2 seg 2/8  [3.8s]
//       2 seg 3/8  [3.9s]
//       2 seg 4/8  [4.0s]
//       2 seg 5/8  [4.1s]
//       2 seg 6/8  [4.3s]
//       2 seg 7/8  [4.4s]
//       2 seg 8/8  [4.4s]
//       3 seg 1/8  [4.5s]
//       3 seg 2/8  [4.7s]
//       3 seg 3/8  [4.8s]
//       3 seg 4/8  [4.9s]
//       3 seg 5/8  [5.1s]
//       3 seg 6/8  [5.2s]
//       3 seg 7/8  [5.3s]
//       3 seg 8/8  [5.4s]
//       natal seg 1/206  [5.5s]
//       natal seg 10/206  [6.3s]
//       natal seg 19/206  [7.2s]
//       natal seg 28/206  [8.0s]
//       natal seg 37/206  [8.8s]
//       natal seg 46/206  [9.6s]
//       natal seg 55/206  [10.5s]
//       natal seg 64/206  [11.3s]
//       natal seg 73/206  [12.2s]
//       natal seg 82/206  [13.0s]
//       natal seg 91/206  [13.8s]
//       natal seg 100/206  [14.7s]
//       natal seg 109/206  [15.5s]
//       natal seg 118/206  [16.3s]
//       natal seg 127/206  [17.1s]
//       natal seg 136/206  [17.9s]
//       natal seg 145/206  [18.7s]
//       natal seg 154/206  [19.5s]
//       natal seg 163/206  [20.4s]
//       natal seg 172/206  [21.2s]
//       natal seg 181/206  [22.0s]
//       natal seg 190/206  [22.8s]
//       natal seg 199/206  [23.6s]
//       line seg 1/206  [27.8s]
//       line seg 10/206  [29.5s]
//       line seg 19/206  [31.1s]
//       line seg 28/206  [32.7s]
//       line seg 37/206  [34.4s]
//       line seg 46/206  [36.0s]
//       line seg 55/206  [37.6s]
//       line seg 64/206  [39.3s]
//       line seg 73/206  [41.0s]
//       line seg 82/206  [42.6s]
//       line seg 91/206  [44.3s]
//       line seg 100/206  [45.9s]
//       line seg 109/206  [47.5s]
//       line seg 118/206  [49.1s]
//       line seg 127/206  [50.7s]
//       line seg 136/206  [52.3s]
//       line seg 145/206  [53.9s]
//       line seg 154/206  [55.4s]
//       line seg 163/206  [56.9s]
//       line seg 172/206  [58.3s]
//       line seg 181/206  [59.8s]
//       line seg 190/206  [61.3s]
//       line seg 199/206  [62.7s]
//       1 seg 1/206  [64.0s]
//       1 seg 10/206  [65.3s]
//       1 seg 19/206  [66.8s]
//       1 seg 28/206  [68.4s]
//       1 seg 37/206  [69.9s]
//       1 seg 46/206  [71.4s]
//       1 seg 55/206  [72.9s]
//       1 seg 64/206  [74.4s]
//       1 seg 73/206  [75.6s]
//       1 seg 82/206  [76.9s]
//       1 seg 91/206  [78.2s]
//       1 seg 100/206  [79.4s]
//       1 seg 109/206  [80.7s]
//       1 seg 118/206  [81.9s]
//       1 seg 127/206  [83.1s]
//       1 seg 136/206  [84.3s]
//       1 seg 145/206  [85.5s]
//       1 seg 154/206  [86.7s]
//       1 seg 163/206  [87.9s]
//       1 seg 172/206  [89.1s]
//       1 seg 181/206  [90.4s]
//       1 seg 190/206  [91.6s]
//       1 seg 199/206  [92.8s]
//       2 seg 1/206  [93.8s]
//       2 seg 10/206  [95.1s]
//       2 seg 19/206  [96.3s]
//       2 seg 28/206  [97.5s]
//       2 seg 37/206  [98.7s]
//       2 seg 46/206  [99.9s]
//       2 seg 55/206  [101.1s]
//       2 seg 64/206  [102.3s]
//       2 seg 73/206  [103.5s]
//       2 seg 82/206  [104.7s]
//       2 seg 91/206  [105.9s]
//       2 seg 100/206  [107.2s]
//       2 seg 109/206  [108.4s]
//       2 seg 118/206  [109.6s]
//       2 seg 127/206  [110.8s]
//       2 seg 136/206  [112.0s]
//       2 seg 145/206  [113.2s]
//       2 seg 154/206  [114.4s]
//       2 seg 163/206  [115.6s]
//       2 seg 172/206  [116.8s]
//       2 seg 181/206  [118.1s]
//       2 seg 190/206  [119.4s]
//       2 seg 199/206  [120.7s]
//       3 seg 1/206  [121.8s]
//       3 seg 10/206  [123.1s]
//       3 seg 19/206  [124.5s]
//       3 seg 28/206  [125.8s]
//       3 seg 37/206  [127.2s]
//       3 seg 46/206  [128.5s]
//       3 seg 55/206  [129.8s]
//       3 seg 64/206  [131.2s]
//       3 seg 73/206  [132.5s]
//       3 seg 82/206  [133.8s]
//       3 seg 91/206  [135.1s]
//       3 seg 100/206  [136.5s]
//       3 seg 109/206  [137.8s]
//       3 seg 118/206  [139.0s]
//       3 seg 127/206  [140.3s]
//       3 seg 136/206  [141.5s]
//       3 seg 145/206  [142.7s]
//       3 seg 154/206  [143.9s]
//       3 seg 163/206  [145.1s]
//       3 seg 172/206  [146.3s]
//       3 seg 181/206  [147.5s]
//       3 seg 190/206  [148.7s]
//       3 seg 199/206  [149.8s]
//       natal seg 1/6376  [150.9s]
//       natal seg 267/6376  [175.3s]
//       natal seg 533/6376  [200.0s]
//       natal seg 799/6376  [226.0s]
//       natal seg 1065/6376  [250.5s]
//       natal seg 1331/6376  [275.4s]
//       natal seg 1597/6376  [300.1s]
//       natal seg 1863/6376  [325.4s]
//       natal seg 2129/6376  [352.1s]
//       natal seg 2395/6376  [380.6s]
//       natal seg 2661/6376  [406.7s]
//       natal seg 2927/6376  [431.7s]
//       natal seg 3193/6376  [456.6s]
//       natal seg 3459/6376  [482.1s]
//       natal seg 3725/6376  [507.6s]
//       natal seg 3991/6376  [534.2s]
//       natal seg 4257/6376  [559.8s]
//       natal seg 4523/6376  [585.8s]
//       natal seg 4789/6376  [611.3s]
//       natal seg 5055/6376  [636.2s]
//       natal seg 5321/6376  [661.3s]
//       natal seg 5587/6376  [686.4s]
//       natal seg 5853/6376  [711.5s]
//       natal seg 6119/6376  [736.4s]
//       tails @31: i=0/37534  [760.4s]
//       tails @31: i=3128/37534  [772.1s]
//       tails @31: i=6256/37534  [781.3s]
//       tails @31: i=9384/37534  [789.2s]
//       tails @31: i=12512/37534  [796.1s]
//       tails @31: i=15640/37534  [802.3s]
//       tails @31: i=18768/37534  [807.9s]
//       tails @31: i=21896/37534  [812.8s]
//       tails @31: i=25024/37534  [817.1s]
//       tails @31: i=28152/37534  [820.8s]
//       tails @31: i=31280/37534  [823.9s]
//       tails @31: i=34408/37534  [826.4s]
//       line seg 1/6376  [828.5s]
//       line seg 267/6376  [889.3s]
//       line seg 533/6376  [950.2s]
//       line seg 799/6376  [1011.3s]
//       line seg 1065/6376  [1073.1s]
//       line seg 1331/6376  [1136.0s]
//       line seg 1597/6376  [1198.9s]
//       line seg 1863/6376  [1262.2s]
//       line seg 2129/6376  [1325.6s]
//       line seg 2395/6376  [1390.6s]
//       line seg 2661/6376  [1461.1s]
//       line seg 2927/6376  [1525.8s]
//       line seg 3193/6376  [1589.6s]
//       line seg 3459/6376  [1652.9s]
//       line seg 3725/6376  [1716.1s]
//       line seg 3991/6376  [1778.8s]
//       line seg 4257/6376  [1843.3s]
//       line seg 4523/6376  [1906.2s]
//       line seg 4789/6376  [1968.7s]
//       line seg 5055/6376  [2031.4s]
//       line seg 5321/6376  [2093.8s]
//       line seg 5587/6376  [2155.9s]
//       line seg 5853/6376  [2218.1s]
//       line seg 6119/6376  [2280.1s]
// ============================================================================
// READINGS
//
// 1. THE GATE AND THE CONTROLS BOTH PASS, SO THE σ BEHIND THE @31 DETECTION
//    IS CALIBRATED. The natal census reproduces xchan-at29-01's embedded
//    obs/CRT/J/σ at all four levels to the digit, and all seven known-truth
//    control draws (random masks at natal density, truth = their own level's
//    J_line) land inside 1.9σ of truth: z = 0.01 | 0.73, 0.25, 1.51 | 0.50,
//    1.88, −0.23. The instrument does not manufacture a −0.45%-scale offset,
//    and the slot-clustered σ is not understated at the scale these draws
//    can see.
//
// 2. THE LINE ITSELF IS BIASED, POSITIVE, DECAYING, AND NOW MEASURED AT
//    147σ. J_line − 1 = +9.88e−3, +7.44e−3, +5.38e−3, +4.03e−3 over
//    @19..@31 (z = 2.3, 8.7, 34.7, 147.6). The CRT solution points of the
//    mixed super-W triples land below the cut at W MORE often than the
//    smooth model says, before any natal sieving. The natal J is therefore
//    the NET of a positive lattice bias and a deeper sieve deficit: reading
//    the split multiplicatively, 1 − J/J_line = 0.03402 (@29) and 0.02859
//    (@31), i.e. 1.18× and 1.15× the 4S₂ the net fits to half a percent.
//    β's share of the deficit falls: β/4S₂ = 0.240, 0.221, 0.186, 0.163.
//    (Sighting, not a claim: β/S₃ reads 38.9, 43.2, 41.0, 41.3.)
//
// 3. THE MARGINAL MECHANISM DOES NOT EXPLAIN THE OFFSET. Re-basing the
//    denominator on the measured per-prime strike counts moves the residual
//    by −145%, −224%, +118%, −55% of itself at @19..@31: sign-erratic,
//    perfect only at @29. A mechanism that explains a stable +1.19e−4
//    residual must move it by ≈ +100% at BOTH sharp levels; this one
//    overshoots at one and reverses at the other. The empirical marginal
//    correction is itself fluctuation-dominated at these populations.
//
// 4. THE DEFICIT IS A STRUCTURED PROFILE, NOT A CONSTANT, AND ANY DERIVATION
//    MUST FIT IT. At @31 the ∏Q-octave deficits run 0.018 | 0.040 | 0.047 |
//    0.036 | 0.014 | 0.006..0.009 (octaves 5..8) | 0.023 | 0.059 | −0.011
//    (11+), each at 100–450σ from the aggregate 0.0247; the q₁-bins run
//    +0.069 (37..119) down to −1.22 (the near-√W bin, a 2.2× surplus). The
//    aggregate ~3.8 law is the CRT-mass-weighted net of factor-of-3
//    structure plus sign flips. The far-octave and near-√W surpluses are the
//    small-cofactor layers whose leading term attack-x-offset-03-cofactor.js
//    derives exactly (enrichment ∏_{p≤x} p/(p−1)); the same surplus
//    structure appears on the raw line (reading 2), natal-amplified as the
//    derived law predicts.
//
// 5. WHAT THIS LEAVES. The offset's stable description remains the
//    aggregate family of attack-x-offset-01-terms.js (best: 4S₂ − S₃,
//    POST HOC); the mechanisms tested here remove two candidates (marginal
//    discrepancy; instrument/σ artifact) and add one derived component (the
//    cofactor-layer surplus, shared with the line). @37 separates the
//    family: research/history/staging/xchan-at37-offset-prereg.md.
