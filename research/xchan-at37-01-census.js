// ============================================================================
// THE @37 X-CHANNEL CENSUS — THE PRE-REGISTERED BLIND TEST OF THE OFFSET FAMILY
//
// Question: which of {no correction | shrinking S3-scale | constant absolute}
// does the @37 natal census pick for the ~3.8 law's offset? The predictions,
// sigma model, scoring rule and verdict consequences are SEALED in
// research/history/staging/xchan-at37-offset-prereg.md (committed alone at
// 21fca9f, before any @37 number of any kind existed). This file is the
// dedicated producer: the kernel is xchan-at29-01-segmented.js's, verbatim;
// default levels are [23, 31, 37]: 23 is a REFERENCE level so the validation
// gate actually fires (prereg section 5), 31 is the blind-tested level
// runs in the same pass. Run protocol (Chris, 2026-08-20): launched detached
// at bedtime via embed.js, token-silent; the NEXT session scores the prereg.
//
// Honest doubt: @37 is priced only by extrapolation ("an overnight run");
// the sigma at @31 is NOT calibrated at @31 (red team, redteam-0820-
// empirical.md) — the prereg's projection band carries that caveat.
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const el = () => ((Date.now() - T00) / 1000).toFixed(1) + 's';
const say = (s) => process.stderr.write(s + '\n');

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function inv(a,m){let r0=a%m;if(r0<0)r0+=m;let r1=m,s0=1,s1=0;
  while(r1!==0){const q=Math.floor(r0/r1),t=r0-q*r1,u=s0-q*s1;r0=r1;r1=t;s0=s1;s1=u;}
  let s=s0%m;if(s<0)s+=m;return s;}
const C3=(n)=>n<3?0:n*(n-1)*(n-2)/6, C2=(n)=>n<2?0:n*(n-1)/2;

// ---------------------------------------------------------------------------
// REFERENCE TABLE — natal-cap-39-triple-census.js, embedded OUTPUT, verbatim.
// [B3(3,0), B3(2,1), B3(1,2), B3(0,3)] ; sub = ∏Q<W ; sup = ∏Q>W
// ---------------------------------------------------------------------------
const REF = {
  11:{W:2310,      N:90,      K:10,  B3:[0,2,0,0],                    miss:0.006909, nSub:0,       subAl:0,       subMx:0,       supMx:2,       o21:2,      o12:0,      CRT:3.73,       J:0.5361},
  13:{W:30030,     N:990,     K:34,  B3:[12,89,70,11],                miss:0.023518, nSub:71,      subAl:23,      subMx:16,      supMx:143,     o21:77,     o12:66,     CRT:139.70,     J:1.0236},
  17:{W:510510,    N:14850,   K:120, B3:[848,2729,2713,847],          miss:0.039784, nSub:5246,    subAl:1695,    subMx:2243,    supMx:3199,    o21:1622,   o12:1577,   CRT:3544.79,    J:0.9025},
  19:{W:9699690,   N:252450,  K:435, B3:[27377,85713,85449,27391],    miss:0.050943, nSub:162982,  subAl:54768,   subMx:97097,   supMx:74065,   o21:37139,  o12:36926,  CRT:77162.70,   J:0.9599},
  23:{W:223092870, N:5301450, K:1739,B3:[879225,2779604,2779107,879385],miss:0.058834,nSub:4517592,subAl:1758610, subMx:3751046, supMx:1807665, o21:904409, o12:903256, CRT:1871421.20, J:0.9659},
};
// PRE-REGISTERED BLIND PREDICTIONS — import-stein.md §3.2, adopted verbatim.
const PRED = {29:{oneMinusJ:0.028943, ratio:3.8399, F:0.007537, K:7863, y:80429},
              31:{oneMinusJ:0.024784, ratio:3.8612, F:0.006419, K:37534, y:447829}};
// the two rivals of prereg §4, also fixed before the run
const RIVAL = {29:{n2:0.029145, n3:0.028990}, 31:{n2:0.024818, n3:0.025165}};
const T1=(z)=>Math.abs(z)<=3?'HIT':Math.abs(z)<=6?'MARGINAL':'MISS';
const T2=(d)=>Math.abs(d)<=0.0125?'TIGHT':Math.abs(d)<=0.025?'CONSISTENT':Math.abs(d)<=0.05?'DRIFTING':'REFUTED AS THE CONSTANT';

// ---------------------------------------------------------------------------
// LEVEL DATA
// ---------------------------------------------------------------------------
function level(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const Nbar=2*basePs.reduce((a,p)=>a*(p-2),1);
  // U[m] = floor(W/qs[m]), integer-corrected: the division is not trusted
  const K=qs.length, U=new Float64Array(K);
  for(let m=0;m<K;m++){let u=Math.floor(W/qs[m]);
    while(u*qs[m]>W)u--; while((u+1)*qs[m]<=W)u++; U[m]=u;}
  return {x,W,basePs,qs,K,U,Nbar,y:qs[K-1]};
}

// ---------------------------------------------------------------------------
// THE DENOMINATOR — Σ_{∏Q>W} 1/∏Q as a TAIL, never as e₃ minus the sub-W sum,
// so no cancellation enters it. Monotone pointer over the third prime; the
// comparison is the exact U-test. Also returns the sub-W triple count and
// reciprocal sum, both of which the gate checks.
// ---------------------------------------------------------------------------
function tailMass(L){
  const {qs,K,U}=L;
  const T=new Float64Array(K+1);
  for(let m=K-1;m>=0;m--)T[m]=T[m+1]+1/qs[m];
  let miss=0,subRec=0,nSub=0,nSup=0;
  for(let i=0;i<K;i++){
    const qi=qs[i];let p=K;                       // smallest m with t > U[m]; non-increasing in j
    for(let j=i+1;j<K;j++){
      const t=qi*qs[j];
      while(p>0&&t>U[p-1])p--;
      const st=p>j+1?p:j+1;
      const rt=1/t;
      miss+=rt*T[st];
      subRec+=rt*(T[j+1]-T[st]);
      nSub+=st-(j+1);nSup+=K-st;
    }
  }
  return {miss,subRec,nSub,nSup};
}
// elementary symmetric e₃(1/q), an independent reading of miss+subRec
function e3of(qs){let e=[1,0,0,0];for(const q of qs){const p=1/q;
  e[3]+=e[2]*p;e[2]+=e[1]*p;e[1]+=e[0]*p;}return e[3];}

// ---------------------------------------------------------------------------
// THE SEGMENTED CENSUS. One pass over the compressed slot line s = 2k + t,
// r = 30k + (t ? 17 : 11), in segments of SEGK values of k.
// ---------------------------------------------------------------------------
const LC=10;                                  // divisor-list capacity per side.
// RAISED 7 -> 10 for @37 (2026-08-20). The guard below THROWS rather than
// truncating, and at @37 it fires: a slot value < W can carry seven scour
// primes (41*43*47*53*59*61*67 = 1.06e12 < 7.4e12 = 37#), where @31 admits at
// most six (37*...*59 = 9.6e9, and *61 overshoots 2.0e11 = 31#), which is why
// the parent instrument ran clean to @31 with LC=7 and dies at @37. Eight do
// not fit at @37 (*71 = 7.5e13 > 37#), so 10 carries margin through @41.
// Storage only: la/lb are LC*Ms slots; no computed value depends on LC.
function census(L,SEGK){
  const {W,basePs,qs,K,U}=L;
  const kmax=W/30, nSeg=Math.ceil(kmax/SEGK), MS=2*SEGK;
  const A=new Uint8Array(MS),a=new Uint8Array(MS),b=new Uint8Array(MS);
  // la/lb store the INDEX into qs (read back as qv[ia[i]]), not the prime. These
  // were Uint16Array, which silently wraps indices mod 65536: safe at @23
  // (K=1739) and @31 (K=37534), CORRUPTING from @37 up (K=198274), where two
  // thirds of the scour primes came back as the wrong prime and the mixed
  // super-W count read 18% low. Widened to Uint32Array 2026-08-21, with the
  // guard below so the container can never alias in silence again. Every
  // internal identity of this script is a COUNT identity and stayed PASS
  // throughout the corruption, which is why only the value looked wrong.
  if(K>0xFFFFFFFF)throw new Error(`scour index ${K} exceeds the la/lb container width`);
  const la=new Uint32Array(LC*MS),lb=new Uint32Array(LC*MS);
  // CRT residues mod 30·p, one per (prime, class, side), computed once
  const cls=[11,17];
  const baseR=[];                              // base primes: kill r ≡ 0 and ≡ −2
  for(const p of basePs){const i30=inv(30%p,p),row=[];
    for(let t=0;t<2;t++)for(const z of [0,(p-2)%p]){
      let d=(z-cls[t])%p;if(d<0)d+=p;row.push(cls[t]+30*((d*i30)%p));}
    baseR.push({p,row});}
  const Ra=new Float64Array(2*K),Rb=new Float64Array(2*K);
  for(let m=0;m<K;m++){const q=qs[m],i30=inv(30%q,q);
    for(let t=0;t<2;t++){
      let d=(0-cls[t])%q;if(d<0)d+=q;Ra[2*m+t]=cls[t]+30*((d*i30)%q);
      let e=(q-2-cls[t])%q;if(e<0)e+=q;Rb[2*m+t]=cls[t]+30*((e*i30)%q);}}
  let Nc=0;
  const B3=[0,0,0,0],sub=[0,0,0,0],sup=[0,0,0,0];
  // THE SAMPLE UNIT IS THE SLOT, NOT THE TRIPLE (added 2026-08-20).
  // supMx is not a count of independent events. This loop walks natal SLOTS and
  // at each one enumerates every triple among that slot's own a-side and b-side
  // divisor lists, so C(av,2)·bv + av·C(bv,2) counts leave one slot together and
  // are decided by which scour primes hit that one slot: perfectly correlated.
  // sqrt(supMx) therefore prices independence the code does not have, and it
  // understates. SX and SX2 are the per-slot mixed super-W subtotals, from which
  // sqrt(SX2 − SX²/N̄) is the exact slot-clustered standard error. It costs two
  // additions per slot. Slots that contribute nothing contribute an exact zero
  // and are counted in N̄, which is what makes the estimator right.
  let SX=0,SX2=0;
  let maxA=0,maxB=0;
  const ia=new Int32Array(LC),ib=new Int32Array(LC);
  const qv=Float64Array.from(qs);
  for(let seg=0;seg<nSeg;seg++){
    const k0=seg*SEGK,k1=Math.min(kmax,k0+SEGK),Ms=2*(k1-k0),V0=30*k0;
    A.fill(1,0,Ms);a.fill(0,0,Ms);b.fill(0,0,Ms);
    // --- natal sieve
    for(const {p,row} of baseR){const m30=30*p;
      for(let c=0;c<4;c++){const t=c>>1,R=row[c];
        let v=R+m30*Math.ceil((V0-R)/m30);
        while(v<V0)v+=m30; while(v-m30>=V0)v-=m30;
        for(let idx=2*((v-cls[t])/30-k0)+t;idx<Ms;idx+=2*p)A[idx]=0;}}
    // --- scour marking, a-side then b-side, natal slots only
    for(let m=0;m<K;m++){const q=qs[m],m30=30*q,st=2*q;
      for(let t=0;t<2;t++){
        let v=Ra[2*m+t];v=v+m30*Math.ceil((V0-v)/m30);
        while(v<V0)v+=m30; while(v-m30>=V0)v-=m30;
        for(let idx=2*((v-cls[t])/30-k0)+t;idx<Ms;idx+=st)
          if(A[idx]){const c=a[idx]++;if(c<LC)la[LC*idx+c]=m;}
        let w=Rb[2*m+t];w=w+m30*Math.ceil((V0-w)/m30);
        while(w<V0)w+=m30; while(w-m30>=V0)w-=m30;
        for(let idx=2*((w-cls[t])/30-k0)+t;idx<Ms;idx+=st)
          if(A[idx]){const c=b[idx]++;if(c<LC)lb[LC*idx+c]=m;}}}
    // --- the local census
    for(let idx=0;idx<Ms;idx++){
      if(!A[idx])continue;
      const av=a[idx],bv=b[idx];Nc++;
      if(av>maxA)maxA=av; if(bv>maxB)maxB=bv;
      B3[3]+=C3(av);B3[2]+=C2(av)*bv;B3[1]+=av*C2(bv);B3[0]+=C3(bv);
      if(av+bv<3)continue;
      if(av>=LC||bv>=LC)throw new Error(`divisor list capacity ${LC} exceeded: a=${av} b=${bv} at slot ${idx}`);
      const base=LC*idx;
      const mx0=sup[2]+sup[1];              // this slot's mixed super-W tally, before
      for(let i=0;i<av;i++)ia[i]=la[base+i];
      for(let i=0;i<bv;i++)ib[i]=lb[base+i];
      for(let i=0;i<av;i++)for(let j=i+1;j<av;j++){
        const t=qv[ia[i]]*qv[ia[j]];
        for(let k=j+1;k<av;k++){if(t>U[ia[k]])sup[3]++;else sub[3]++;}
        for(let k=0;k<bv;k++){if(t>U[ib[k]])sup[2]++;else sub[2]++;}}
      for(let i=0;i<bv;i++)for(let j=i+1;j<bv;j++){
        const t=qv[ib[i]]*qv[ib[j]];
        for(let k=j+1;k<bv;k++){if(t>U[ib[k]])sup[0]++;else sub[0]++;}
        for(let k=0;k<av;k++){if(t>U[ia[k]])sup[1]++;else sub[1]++;}}
      const xs=sup[2]+sup[1]-mx0;SX+=xs;SX2+=xs*xs;
    }
    if(nSeg>=16&&seg%Math.ceil(nSeg/16)===0)say(`      seg ${seg+1}/${nSeg}  [${el()}]`);
  }
  return {Nc,B3,sub,sup,nSeg,MS,maxA,maxB,SX,SX2,
          bytes:MS*(3+2*2*LC)};
}

// ---------------------------------------------------------------------------
// DRIVER
// ---------------------------------------------------------------------------
const ARG=process.argv.slice(2).map(Number).filter(v=>v>0);
const LEVELS=ARG.length?ARG:[23,31,37];      // 23 fires the reference gate (prereg 5), 31 the blind-tested level, 37 the scored one
const SEGK=1<<20;                              // 2^21 slots per segment, 65 MB
console.log('XCHAN-AT37 — the segmented mixed super-W triple census, dedicated @37 producer');
console.log(`pre-registration: research/history/staging/xchan-at37-offset-prereg.md (sealed 21fca9f; kernel + gate from xchan-at29-prereg.md)   levels: ${LEVELS.join(', ')}   segment: 2^${Math.log2(2*SEGK)} slots\n`);
let gateFail=0,gateRun=0;
const ROWS=[];
let cSlot=null,cMark=null;                     // ns per slot / per mark, carried level to level
for(const x of LEVELS){
  const t0=Date.now();
  const L=level(x);
  const {W,qs,K,Nbar,y}=L;
  // price before the run, from the previous level's two fitted constants
  let sMark=0,S2=0,lg=0;
  for(const q of qs){sMark+=2/q;S2+=1/(q*q);lg+=2*Math.log(1-1/q)-Math.log(1-2/q);}
  const forced=Math.exp(lg)-1;
  const nSlot=W/15,nMark=nSlot*sMark;
  const price=(cSlot!==null)?`${f((nSlot*cSlot+nMark*cMark)/1e9,1)} s predicted`:'no calibration yet (first level)';
  console.log(`===== @${x}: W=${W} N̄(formula)=${Nbar} K=${K} (${qs[0]}..${y})`);
  console.log(`  WORK COUNTS (the code's own loop counts): ${nSlot} slots, ${f(nMark,0)} scour marks, ${Math.ceil((W/30)/SEGK)} segments`);
  console.log(`  CUSTODY on the record's own closed form: 4S₂ = 4·Σ_{x<q≤√W}q⁻² = ${f(4*S2,6)}   forced scale F = ∏(1+1/(q(q−2)))−1 over the same list = ${f(100*forced,4)}%`);
  console.log(`  PRICE BEFORE THE RUN, from the previous level's two constants: ${price}`);
  const tm=tailMass(L);
  const t1=Date.now();
  const C=census(L,SEGK);
  const t2=Date.now();
  if(t2>t1){cSlot=(t2-t1)*1e6/nSlot*0.5;cMark=(t2-t1)*1e6/nMark*0.5;}
  const N=C.Nc;
  const supMx=C.sup[2]+C.sup[1],subMx=C.sub[2]+C.sub[1];
  const supAl=C.sup[3]+C.sup[0],subAl=C.sub[3]+C.sub[0];
  const CRT=6*N*tm.miss, CRTal=2*N*tm.miss;
  const J=supMx/CRT, sJ=Math.sqrt(Math.max(supMx,0))/CRT;
  // The registered σ stands as registered (prereg §3); the corrected one is
  // reported beside it. Var of a sum over N̄ independent slots is
  // Σx² − (Σx)²/N̄, and Σx is supMx by construction, which is the check below.
  if(Math.abs(C.SX-supMx)>1e-6)throw new Error(`per-slot subtotals do not sum to supMx: ${C.SX} vs ${supMx}`);
  const varSlot=Math.max(C.SX2-C.SX*C.SX/N,0);
  const sJslot=Math.sqrt(varSlot)/CRT, infl=sJ>0?sJslot/sJ:NaN;
  const e3=e3of(qs);
  console.log(`  MEMORY: ${f(C.bytes/1048576,1)} MB of arrays, independent of the level   [census ${f((t2-t1)/1000,2)}s]`);
  console.log(`  N̄ counted = ${N}  (formula ${Nbar}: ${N===Nbar?'PASS':'FAIL'})   max |D_a| = ${C.maxA}, max |D_b| = ${C.maxB}`);
  console.log(`  B_3 FROM THE (a,b) COUNTS = ${f(C.B3[3]+C.B3[2]+C.B3[1]+C.B3[0],0)}   split (3,0)=${f(C.B3[3],0)} (2,1)=${f(C.B3[2],0)} (1,2)=${f(C.B3[1],0)} (0,3)=${f(C.B3[0],0)}`);
  let ident=0;
  for(let c=0;c<4;c++)if(Math.abs(C.sub[c]+C.sup[c]-C.B3[c])>1e-9)ident++;
  console.log(`  INTERNAL IDENTITY sub+sup = B_3 class by class: ${ident===0?'PASS':'FAIL ('+ident+' classes)'}`);
  console.log(`  SUB-W (∏Q<W): ${tm.nSub} triples, obs=${f(subAl+subMx,0)}  aligned ${f(subAl,0)} | mixed ${f(subMx,0)}`);
  console.log(`  MISSING MASS Σ_{∏Q>W}1/∏Q = ${f(tm.miss,6)}   (e₃ = miss + sub = ${f(tm.miss+tm.subRec,8)} vs esym ${f(e3,8)}; C(K,3) = ${tm.nSub+tm.nSup} vs ${K*(K-1)*(K-2)/6})`);
  console.log(`  SUPER-W (∏Q>W):`);
  console.log(`    ALIGNED obs = ${f(supAl,0)}  [P1 predicts exactly 0: ${supAl===0?'PASS':'FAIL'}]   CRT=${f(CRTal,2)}`);
  console.log(`    MIXED   obs = ${f(supMx,0)}  CRT=${f(CRT,2)}   by orientation (2,1) = ${f(C.sup[2],0)} and (1,2) = ${f(C.sup[1],0)} against ${f(CRT/2,2)} each`);
  console.log(`  >>> JOINT DEFICIT  J = ${f(J,6)}   1−J = ${f(1-J,6)}   σ_J = ${f(sJ,6)}  [as REGISTERED: Poisson on the triple count]`);
  console.log(`      σ_J SLOT-CLUSTERED (the sample unit is the slot) = ${f(sJslot,6)}   inflation ×${f(infl,3)}`);
  console.log(`      This is still a FLOOR. It prices within-slot correlation exactly and prices`);
  console.log(`      between-slot clustering not at all, so a disjoint-block estimate is larger`);
  console.log(`      again where it is affordable. An understated σ makes |z| too LARGE, so every`);
  console.log(`      z below is a ceiling on its own significance, not a floor.`);
  // ---- the gate
  const R=REF[x];
  if(R){
    gateRun++;
    const chk=[['W',W,R.W],['N̄',N,R.N],['K',K,R.K],
      ['B3(3,0)',C.B3[3],R.B3[0]],['B3(2,1)',C.B3[2],R.B3[1]],['B3(1,2)',C.B3[1],R.B3[2]],['B3(0,3)',C.B3[0],R.B3[3]],
      ['sub-W triples',tm.nSub,R.nSub],['sub-W aligned obs',subAl,R.subAl],['sub-W mixed obs',subMx,R.subMx],
      ['super-W aligned obs',supAl,0],['super-W mixed obs',supMx,R.supMx],['(2,1)',C.sup[2],R.o21],['(1,2)',C.sup[1],R.o12]];
    let bad=0,line='';
    for(const [nm,got,want] of chk){if(got!==want){bad++;line+=`\n      MISMATCH ${nm}: got ${got}, natal-cap-39 has ${want}`;}}
    // the two rounded reals from the record
    const rr=[['Σ_{∏Q>W}1/∏Q',Number(f(tm.miss,6)),R.miss],['CRT',Number(f(CRT,2)),R.CRT],['J',Number(f(J,4)),R.J]];
    for(const [nm,got,want] of rr){if(got!==want){bad++;line+=`\n      MISMATCH ${nm}: got ${got}, natal-cap-39 has ${want}`;}}
    gateFail+=bad;
    console.log(`  GATE vs natal-cap-39 embedded OUTPUT (${chk.length} integers + ${rr.length} rounded reals): ${bad===0?'ALL PASS':bad+' FAIL'}${line}`);
  }
  // ---- the blind score
  const P=PRED[x];
  if(P){
    if(gateFail>0){console.log('  SCORE WITHHELD: the validation gate failed, prereg §5 forbids reporting this level.');}
    else{
      const om=1-J,z=(om-P.oneMinusJ)/sJ,d=om/P.oneMinusJ-1;
      const V=RIVAL[x];
      console.log(`  ---- BLIND SCORE against import-stein.md §3.2, adopted verbatim in the prereg`);
      console.log(`    predicted 1−J = ${f(P.oneMinusJ,6)}   measured 1−J = ${f(om,6)}   σ_J = ${f(sJ,6)}`);
      console.log(`    TEST 1  z = ${f(z,2)}   ->  ${T1(z)}   [the REGISTERED verdict, on the registered σ]`);
      const zs=(om-P.oneMinusJ)/sJslot;
      console.log(`    TEST 1 on the slot-clustered σ: z = ${f(zs,2)}  ->  ${T1(zs)}   [reported beside the registered verdict, never in place of it]`);
      console.log(`    TEST 2  d = ${f(100*d,2)}%  ->  ${T2(d)}`);
      console.log(`    J-BAND CLAUSE (J < 0.94 or J > 1.00 ⇒ the object changed): J = ${f(J,6)} -> ${(J<0.94||J>1.00)?'FIRES':'does not fire'}`);
      console.log(`    RIVALS, fixed before the run: N2 constant·F ${f(V.n2,6)} (z=${f((om-V.n2)/sJ,2)}) | N3 ∝1/lnW ${f(V.n3,6)} (z=${f((om-V.n3)/sJ,2)})`);
      console.log(`      the same rivals on the slot-clustered σ: N2 z=${f((om-V.n2)/sJslot,2)} | N3 z=${f((om-V.n3)/sJslot,2)}`);
      console.log(`    ratio (1−J)/F with F from the record (${f(100*P.F,4)}%): measured ${f(om/P.F,4)} vs predicted ${f(P.ratio,4)}`);
      console.log(`    custody: 4S₂ recomputed here = ${f(4*S2,6)} vs the record's ${f(P.oneMinusJ,6)} (${Math.abs(4*S2-P.oneMinusJ)<5e-7?'agrees to the printed digit':'DISAGREES — the record is wrong'}); ratio on this file's own F (${f(100*forced,4)}%) = ${f(om/forced,4)}`);
    }
  }
  ROWS.push({x,lnW:Math.log(W),N,supMx,CRT,J,sJ,sJslot,infl,miss:tm.miss,nSub:tm.nSub,pred:P?P.oneMinusJ:null});
  console.log(`  [level time ${f((Date.now()-t0)/1000,2)}s]\n`);
}
console.log('===== SUMMARY — THE JOINT DEFICIT ACROSS LEVELS =====');
console.log('   x |   lnW  | mixed super-W obs |     CRT       |    J     |   1−J    | σ_J(reg) | σ_J(slot) | infl | predicted 1−J |  z(reg) | z(slot) |    d');
for(const r of ROWS){
  const om=1-r.J;
  console.log(`  ${String(r.x).padStart(2)} | ${f(r.lnW,3)} | ${f(r.supMx,0).padStart(17)} | ${f(r.CRT,2).padStart(13)} | ${f(r.J,6)} | ${f(om,6)} | ${f(r.sJ,6)} | ${f(r.sJslot,6).padStart(9)} | ${f(r.infl,2).padStart(4)} | ${(r.pred?f(r.pred,6):'—').padStart(13)} | ${(r.pred?f((om-r.pred)/r.sJ,2):'—').padStart(7)} | ${(r.pred?f((om-r.pred)/r.sJslot,2):'—').padStart(7)} | ${r.pred?f(100*(om/r.pred-1),2)+'%':'—'}`);
}
console.log('   σ_J(reg) is the pre-registered Poisson floor on the TRIPLE count, kept as registered.');
console.log('   σ_J(slot) prices the sample unit the census actually walks, the SLOT, exactly.');
console.log('   Both are floors: neither prices clustering BETWEEN slots. z(reg) is therefore an');
console.log('   upper bound on significance, and TEST 2\'s relative d has no σ in it at all.');
console.log(`\nGATE: ${gateRun} reference levels checked, ${gateFail} mismatches.`);
console.log(`[total ${f((Date.now()-T00)/1000,1)}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/xchan-at37-01-census.js
//   invocation:  node research/xchan-at37-01-census.js
//   code-sha256: bd110d39e18717ff6564a24af3e0a654c5cd02b434d735c9d2a16c9372a9eca5
//   out-sha256:  6d83c928c681539ea1ec6682ff7b1aa72ebe890787282d13169942978ff9546d
//   body-lines:  122
//   forced:      2026-08-21, 11 of 145 figures in the replaced block not reproduced (first: 86.0, 430105256595, 314821251328, 50213010189)
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     21354.0 s
// ============================================================================
// XCHAN-AT37 — the segmented mixed super-W triple census, dedicated @37 producer
// pre-registration: research/history/staging/xchan-at37-offset-prereg.md (sealed 21fca9f; kernel + gate from xchan-at29-prereg.md)   levels: 23, 31, 37   segment: 2^21 slots
//
// ===== @23: W=223092870 N̄(formula)=5301450 K=1739 (29..14929)
//   WORK COUNTS (the code's own loop counts): 14872858 slots, 30527907 scour marks, 8 segments
//   CUSTODY on the record's own closed form: 4S₂ = 4·Σ_{x<q≤√W}q⁻² = 0.033678   forced scale F = ∏(1+1/(q(q−2)))−1 over the same list = 0.8819%
//   PRICE BEFORE THE RUN, from the previous level's two constants: no calibration yet (first level)
//   MEMORY: 86.0 MB of arrays, independent of the level   [census 0.49s]
//   N̄ counted = 5301450  (formula 5301450: PASS)   max |D_a| = 5, max |D_b| = 5
//   B_3 FROM THE (a,b) COUNTS = 7317321   split (3,0)=879225 (2,1)=2779604 (1,2)=2779107 (0,3)=879385
//   INTERNAL IDENTITY sub+sup = B_3 class by class: PASS
//   SUB-W (∏Q<W): 4517592 triples, obs=5509656  aligned 1758610 | mixed 3751046
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.058834   (e₃ = miss + sub = 0.17590031 vs esym 0.17590031; C(K,3) = 874979589 vs 874979589)
//   SUPER-W (∏Q>W):
//     ALIGNED obs = 0  [P1 predicts exactly 0: PASS]   CRT=623807.07
//     MIXED   obs = 1807665  CRT=1871421.20   by orientation (2,1) = 904409 and (1,2) = 903256 against 935710.60 each
//   >>> JOINT DEFICIT  J = 0.965932   1−J = 0.034068   σ_J = 0.000718  [as REGISTERED: Poisson on the triple count]
//       σ_J SLOT-CLUSTERED (the sample unit is the slot) = 0.001493   inflation ×2.078
//       This is still a FLOOR. It prices within-slot correlation exactly and prices
//       between-slot clustering not at all, so a disjoint-block estimate is larger
//       again where it is affordable. An understated σ makes |z| too LARGE, so every
//       z below is a ceiling on its own significance, not a floor.
//   GATE vs natal-cap-39 embedded OUTPUT (14 integers + 3 rounded reals): ALL PASS
//   [level time 0.51s]
//
// ===== @31: W=200560490130 N̄(formula)=4151035350 K=37534 (37..447829)
//   WORK COUNTS (the code's own loop counts): 13370699342 slots, 33742377278 scour marks, 6376 segments
//   CUSTODY on the record's own closed form: 4S₂ = 4·Σ_{x<q≤√W}q⁻² = 0.024784   forced scale F = ∏(1+1/(q(q−2)))−1 over the same list = 0.6419%
//   PRICE BEFORE THE RUN, from the previous level's two constants: 492.1 s predicted
//   MEMORY: 86.0 MB of arrays, independent of the level   [census 418.83s]
//   N̄ counted = 4151035350  (formula 4151035350: PASS)   max |D_a| = 6, max |D_b| = 6
//   B_3 FROM THE (a,b) COUNTS = 10797244184   split (3,0)=1292716769 (2,1)=4105924814 (1,2)=4105896825 (0,3)=1292705776
//   INTERNAL IDENTITY sub+sup = B_3 class by class: PASS
//   SUB-W (∏Q<W): 4215696644 triples, obs=9144002497  aligned 2585422545 | mixed 6558579952
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.068057   (e₃ = miss + sub = 0.33095269 vs esym 0.33095269; C(K,3) = 8812286043484 vs 8812286043484)
//   SUPER-W (∏Q>W):
//     ALIGNED obs = 0  [P1 predicts exactly 0: PASS]   CRT=565017131.17
//     MIXED   obs = 1653241687  CRT=1695051393.52   by orientation (2,1) = 826645240 and (1,2) = 826596447 against 847525696.76 each
//   >>> JOINT DEFICIT  J = 0.975334   1−J = 0.024666   σ_J = 0.000024  [as REGISTERED: Poisson on the triple count]
//       σ_J SLOT-CLUSTERED (the sample unit is the slot) = 0.000051   inflation ×2.124
//       This is still a FLOOR. It prices within-slot correlation exactly and prices
//       between-slot clustering not at all, so a disjoint-block estimate is larger
//       again where it is affordable. An understated σ makes |z| too LARGE, so every
//       z below is a ceiling on its own significance, not a floor.
//   ---- BLIND SCORE against import-stein.md §3.2, adopted verbatim in the prereg
//     predicted 1−J = 0.024784   measured 1−J = 0.024666   σ_J = 0.000024
//     TEST 1  z = -4.93   ->  MARGINAL   [the REGISTERED verdict, on the registered σ]
//     TEST 1 on the slot-clustered σ: z = -2.32  ->  HIT   [reported beside the registered verdict, never in place of it]
//     TEST 2  d = -0.48%  ->  TIGHT
//     J-BAND CLAUSE (J < 0.94 or J > 1.00 ⇒ the object changed): J = 0.975334 -> does not fire
//     RIVALS, fixed before the run: N2 constant·F 0.024818 (z=-6.35) | N3 ∝1/lnW 0.025165 (z=-20.81)
//       the same rivals on the slot-clustered σ: N2 z=-2.99 | N3 z=-9.80
//     ratio (1−J)/F with F from the record (0.6419%): measured 3.8426 vs predicted 3.8612
//     custody: 4S₂ recomputed here = 0.024784 vs the record's 0.024784 (agrees to the printed digit); ratio on this file's own F (0.6419%) = 3.8427
//   [level time 426.03s]
//
// ===== @37: W=7420738134810 N̄(formula)=145286237250 K=198274 (41..2724079)
//   WORK COUNTS (the code's own loop counts): 494715875654 slots, 1350216514469 scour marks, 235899 segments
//   CUSTODY on the record's own closed form: 4S₂ = 4·Σ_{x<q≤√W}q⁻² = 0.021863   forced scale F = ∏(1+1/(q(q−2)))−1 over the same list = 0.5642%
//   PRICE BEFORE THE RUN, from the previous level's two constants: 16128.3 s predicted
//   MEMORY: 86.0 MB of arrays, independent of the level   [census 20838.99s]
//   N̄ counted = 145286237250  (formula 145286237250: PASS)   max |D_a| = 7, max |D_b| = 7
//   B_3 FROM THE (a,b) COUNTS = 480318266784   split (3,0)=57641980678 (2,1)=182517099586 (1,2)=182517161931 (0,3)=57642024589
//   INTERNAL IDENTITY sub+sup = B_3 class by class: PASS
//   SUB-W (∏Q<W): 149008891355 triples, obs=419929456947  aligned 115284005267 | mixed 304645451680
//   MISSING MASS Σ_{∏Q>W}1/∏Q = 0.070749   (e₃ = miss + sub = 0.41984342 vs esym 0.41984342; C(K,3) = 1299090727729024 vs 1299090727729024)
//   SUPER-W (∏Q>W):
//     ALIGNED obs = 0  [P1 predicts exactly 0: PASS]   CRT=20557674423.07
//     MIXED   obs = 60388809837  CRT=61673023269.22   by orientation (2,1) = 30194384326 and (1,2) = 30194425511 against 30836511634.61 each
//   >>> JOINT DEFICIT  J = 0.979177   1−J = 0.020823   σ_J = 0.000004  [as REGISTERED: Poisson on the triple count]
//       σ_J SLOT-CLUSTERED (the sample unit is the slot) = 0.000009   inflation ×2.136
//       This is still a FLOOR. It prices within-slot correlation exactly and prices
//       between-slot clustering not at all, so a disjoint-block estimate is larger
//       again where it is affordable. An understated σ makes |z| too LARGE, so every
//       z below is a ceiling on its own significance, not a floor.
//   [level time 20927.25s]
//
// ===== SUMMARY — THE JOINT DEFICIT ACROSS LEVELS =====
//    x |   lnW  | mixed super-W obs |     CRT       |    J     |   1−J    | σ_J(reg) | σ_J(slot) | infl | predicted 1−J |  z(reg) | z(slot) |    d
//   23 | 19.223 |           1807665 |    1871421.20 | 0.965932 | 0.034068 | 0.000718 |  0.001493 | 2.08 |             — |       — |       — | —
//   31 | 26.024 |        1653241687 | 1695051393.52 | 0.975334 | 0.024666 | 0.000024 |  0.000051 | 2.12 |      0.024784 |   -4.93 |   -2.32 | -0.48%
//   37 | 29.635 |       60388809837 | 61673023269.22 | 0.979177 | 0.020823 | 0.000004 |  0.000009 | 2.14 |             — |       — |       — | —
//    σ_J(reg) is the pre-registered Poisson floor on the TRIPLE count, kept as registered.
//    σ_J(slot) prices the sample unit the census actually walks, the SLOT, exactly.
//    Both are floors: neither prices clustering BETWEEN slots. z(reg) is therefore an
//    upper bound on significance, and TEST 2's relative d has no σ in it at all.
//
// GATE: 1 reference levels checked, 0 mismatches.
// [total 21353.8s]
// ───── stderr ─────
//       seg 1/6376  [7.8s]
//       seg 400/6376  [33.6s]
//       seg 799/6376  [59.3s]
//       seg 1198/6376  [85.1s]
//       seg 1597/6376  [110.8s]
//       seg 1996/6376  [136.7s]
//       seg 2395/6376  [162.9s]
//       seg 2794/6376  [188.9s]
//       seg 3193/6376  [215.2s]
//       seg 3592/6376  [242.3s]
//       seg 3991/6376  [268.8s]
//       seg 4390/6376  [295.3s]
//       seg 4789/6376  [321.7s]
//       seg 5188/6376  [348.2s]
//       seg 5587/6376  [374.6s]
//       seg 5986/6376  [400.9s]
//       seg 1/235899  [514.9s]
//       seg 14745/235899  [1770.8s]
//       seg 29489/235899  [3029.6s]
//       seg 44233/235899  [4343.1s]
//       seg 58977/235899  [5699.6s]
//       seg 73721/235899  [6968.1s]
//       seg 88465/235899  [8186.0s]
//       seg 103209/235899  [9442.4s]
//       seg 117953/235899  [10735.2s]
//       seg 132697/235899  [12004.9s]
//       seg 147441/235899  [13280.2s]
//       seg 162185/235899  [14601.1s]
//       seg 176929/235899  [16076.3s]
//       seg 191673/235899  [17519.2s]
//       seg 206417/235899  [18837.0s]
//       seg 221161/235899  [20055.3s]
// ============================================================================
// READINGS
//
