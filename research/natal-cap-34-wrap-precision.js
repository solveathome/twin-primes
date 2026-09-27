// ============================================================================
// NATAL-CAP 34 — PRECISION-GRADING THE WRAP ENGINE: WHERE THE 3.5e-5 LIVES
// (natal-cap series, 2026-08-15; executes TODO item 6 / brief W7-2.)
// ============================================================================
// WHY.  cap-32 dissolved the wrap obstruction and computed T4@17 for the first
// time (4,616,850,623,332 +- 4e-4 rel).  The mu4 assembly cancels ~7 orders at
// @17, so the beyond-Chebyshev rung needs T4 to ~1e-9 relative.  cap-32's @13
// cross-check against cap-27's certified value missed by -3.5e-5.  This file
// asks the only question that matters next: WHICH LAYER carries that 3.5e-5,
// exactly, and what does each layer cost to make exact?
//
// PREDICTIONS ON RECORD (written before the runs).  GRADED 2026-08-18 in the
// READINGS block at the foot of this file, against six stages all re-run that
// day: P1 confirmed in its verdict and wrong in both of its numbers, P2
// confirmed, P3's arithmetic confirmed and its precondition NOT met.  (Until
// 2026-08-18 this header said the file carried no pasted output and no
// readings and pointed at TODO.md item 6 for the landed numbers.  It now
// carries both, produced here rather than imported from a document.)
//   P1. The exact @13 layer split will attribute the bulk of the -3.5e-5 to
//       the multi-prime layer (CAL4 = 0.87 calibration on a multi/G ~ 2e-4
//       term is a ~13% error on 2e-4 = ~2.6e-5), NOT to C2 order-3.
//   P2. Float rounding is NOT the obstruction: cap-27 certifies |dT4|/T4 <=
//       1e-14 with Kahan alone, five orders below the 1e-9 gate.  The gate is
//       a TRUNCATION problem end to end.
//   P3. If the gate is met, P(S=0) @17 by the quartic rung ~ 3Var^2/mu^4 =
//       3.05e-8, i.e. ~3000x below Chebyshev's 1.0086e-4.
//
// SETTING (cap-21/27/32, unchanged).  Natal set N at level x, scour primes
// x < q <= sqrt(W); T_m = SUM over m-subsets B of PROD_q (1 - |F_B(q)|/q).
// The cap-32 identity, restated in the exact form this file audits:
//   T4 = PROD_q(1 - 8/q) * G,  G = SUM_B w(B) * PROD_q (1 + kappa_q(B)),
//   w(B)      = PROD over the 6 pairs p of (1 + s_p),
//   s_p       = PROD_q (1 + e_p(q)/Q_q) - 1,   Q_q = q - 8,
//   1+kappa_q = (1 + c_B(q)/Q_q) / PROD_p (1 + e_p(q)/Q_q),
//   e_p(q)    = 2 if d_p == 0 (q), 1 if d_p == +-2 (q), else 0,
//   c_B(q)    = 8 - |F_B(q)|.
// PER-PRIME EXHAUSTION (proved by cases on 4 slots, checked in stage V):
//   kappa_q(B) != 0 in exactly three mutually exclusive configurations --
//   (C2) two disjoint 2-slot components, kappa = nu = -e1 e2/((Q+e1)(Q+e2));
//   (C1) one 3-slot component + a singleton, kappa = mu_3;
//   (C3) one 4-slot component, kappa = mu_4.
// So SUM_B w kappa_q splits EXACTLY into C1[q] + C2[q] + C3[q] with no
// within-prime cross terms, and G = A + Lin + Multi with
//   A     = SUM_B w(B),                       (the 10 K4 subgraph shapes)
//   Lin   = SUM_q (C1[q] + C2[q] + C3[q]),    (the per-prime layer)
//   Multi = SUM_B w (PROD_q(1+kappa) - 1 - SUM_q kappa).   (the joint layer)
//
// PLAN.
//   [V] custody: reproduce cap-27's T4@13 = 352253669.87624449 digit for
//       digit with an INDEPENDENT engine, and check the per-prime exhaustion.
//   [E] stage 'exact13': the exact decomposition over all C(990,4) =
//       39,782,707,965 quadruples -- A, C1[q], C2[q], C3[q], Multi, G, all
//       exact.  This is the truth every engine layer is then graded against.
//   [L] stage 'layers': cap-32's own engines (loaded from cap-32 unmodified)
//       vs that truth, layer by layer -- the split of the -3.5e-5.
//   [J] stage 'joint': the 2D class-histogram joint counts.  Cost measured
//       BEFORE committing, then exact 2-prime Multi if affordable.
//   [17] stage 'at17': only if the @13 gate (<= 1e-9 relative) is met.
// PLAN vs CODE, corrected 2026-08-18. The plan above is the plan as written,
// not the code as shipped. Two stages exist that it does not name -- [C2] (the
// factorised exact C2 layer) and [K] (mu4 = 3Var^2 + kappa4) -- and stage
// 'at17' WAS NEVER WRITTEN. `node natal-cap-34-wrap-precision.js at17` answers
// "unknown stage at17".
// GATE STATUS. The @13 gate is |T4_assembled - T4_certified| / T4_certified <=
// 1e-9 against cap-27's certified 352253669.87624449, and stage [L]'s best
// assembly MEETS it: REL -2.753038e-13, a margin of x3632. What closes it is
// [L] taking the K4 shape from cap-32's exact `k4direct` instead of a Monte
// Carlo; the same assembly with the MC at n = 2e8 lands at -1.021692e-9 and
// misses by 2%. What is left at -2.8e-13 is float noise in assembleA's
// non-compensated O(N^3) shape sums, not mathematics. Stage [E]'s own
// REL = 3.384189e-16 is a different object and must not be quoted as the gate:
// that is the EXACT C(990,4) march, the truth the gate is measured AGAINST, not
// a pipeline that could be re-run anywhere else. Read [17] as OPEN anyway, and
// read readings 5, 6, 13 and 14 before costing it: the T4 road at @17 is a
// LADDER, not a single tolerance, and meeting the @13 gate certifies nothing
// for @17 because the assembly that meets it borrows Multi from the march.
// MORATORIUM: no commits, no circulation.
// CLI (the real dispatch list, from STAGES):
//   node natal-cap-34-wrap-precision.js [verify|exact13|layers|c2|kurt|joint]
//   ('ework' is the worker entry point of exact13; do not call it by hand.)
// Env: NC34_WORKERS (default 10), NC34_DIR (worker scratch).
// ============================================================================
'use strict';
const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');
const Module=require('module');
const T0=Date.now();let CHECKS=0;
function assert(c,m){if(!c)throw new Error('CHECK FAIL: '+m);CHECKS++;}
function assertClose(a,b,tol,m){const d=Math.abs(a-b)/Math.max(1,Math.abs(a),Math.abs(b));
  if(!(d<=tol))throw new Error(`CHECK FAIL ${m}: ${a} vs ${b} (rel ${d.toExponential(2)})`);CHECKS++;}
const ex=v=>v.toExponential(6),ex3=v=>v.toExponential(3);
const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
function log(s){console.log(`[${el()}] ${s}`);}
const DIR=process.env.NC34_DIR||os.tmpdir();
const NW=+(process.env.NC34_WORKERS||10);
const STAGES={};                      // filled by the stage blocks below
// ---------------------------------------------------------------------------
// [0] CHAIN OF CUSTODY: cap-32's engine code is LOADED, not copied.  The file
// on disk is unmodified; we compile it with an appended export line so that
// every layer graded below is byte-identical to the layer cap-32 published.
// ---------------------------------------------------------------------------
const P32=path.join(__dirname,'natal-cap-32-wrap-identity.js');
const EXPORTS32=['buildLevel','subLevel','sMatrix','classesAt','forEachCollidingPair',
  'checkWrapFree','patternInfo','classEngine','blockEngine','shapeSums','assembleA',
  'C2aggregate','Pmatrix','k4MC','k4direct','AdirectT4','A3shapes','A3direct','thm5',
  'baseProd','bruteTG','bruteT4fast','BsemiDirect','B3semi','engineT','C2','C4',
  'V3PATTERNS','V4PATTERNS','CAL4','CAL3','T4KNOWN','T3KNOWN','mulberry32','Mvec','EtimesS',
  'forV4'];
function loadCap32(){
  const src=fs.readFileSync(P32,'utf8')+'\n;module.exports={'+EXPORTS32.join(',')+'};\n';
  const M=new Module(P32,module);
  M.filename=P32;M.paths=Module._nodeModulePaths(path.dirname(P32));
  M._compile(src,P32);
  return M.exports;
}
const C32=loadCap32();
const {buildLevel,subLevel,sMatrix,baseProd,thm5,C2:CH2,C4:CH4}=C32;
// certified anchors (cap-27 printed values, 1e-14 error budget)
const T4KNOWN=352253669.87624449,T3KNOWN=4662945.6578926444,T2KNOWN=46186.769663306746;
// ---------------------------------------------------------------------------
// [1] PRIMITIVES for the exact decomposition.
// eOf: the pair collision label at a prime, from residues (wrap-free: we read
// representatives mod q, never difference classes mod W).
// ---------------------------------------------------------------------------
function eOf(ra,rb,q){const d=ra-rb;
  if(d===0)return 2;
  if(d===2||d===-2||d===q-2||d===2-q)return 1;
  return 0;}
// per-quadruple c from the 8 tokens (r_i, r_i+2 mod q): c = 8 - #distinct
const TOKS=new Int32Array(8);
function cOf(r0,r1,r2,r3,q){
  TOKS[0]=r0;TOKS[1]=r0+2>=q?r0+2-q:r0+2;
  TOKS[2]=r1;TOKS[3]=r1+2>=q?r1+2-q:r1+2;
  TOKS[4]=r2;TOKS[5]=r2+2>=q?r2+2-q:r2+2;
  TOKS[6]=r3;TOKS[7]=r3+2>=q?r3+2-q:r3+2;
  let dis=0;
  outer:for(let a=0;a<8;a++){const v=TOKS[a];
    for(let b=0;b<a;b++)if(TOKS[b]===v)continue outer;
    dis++;}
  return 8-dis;}
// component signature of the 4-node labelled collision graph: returns
// 0 none, 2 two disjoint 2-components, 1 one 3-component, 3 one 4-component,
// 9 a single 2-component (kappa == 0).  Also fills SZ with component sizes.
const LAB=new Int32Array(4);
function componentKind(e01,e02,e03,e12,e13,e23){
  LAB[0]=0;LAB[1]=1;LAB[2]=2;LAB[3]=3;
  const un=(a,b)=>{const x=LAB[a],y=LAB[b];if(x!==y)for(let t=0;t<4;t++)if(LAB[t]===y)LAB[t]=x;};
  if(e01)un(0,1);if(e02)un(0,2);if(e03)un(0,3);
  if(e12)un(1,2);if(e13)un(1,3);if(e23)un(2,3);
  let big=0,nBig=0;
  for(let t=0;t<4;t++){let sz=0;for(let z=0;z<4;z++)if(LAB[z]===LAB[t])sz++;
    if(LAB[t]===t&&sz>1){nBig++;if(sz>big)big=sz;}}
  if(nBig===0)return 0;
  if(big===4)return 3;
  if(big===3)return 1;
  return nBig===2?2:9;}
// ---------------------------------------------------------------------------
// [2] pair masks: for each unordered pair, a 64-bit (lo/hi Uint32) bitmask of
// the scour primes at which it collides.  Used to find, per quadruple, the
// primes at which at least TWO of the six pairs collide -- the only primes
// where kappa can be non-zero (per-prime exhaustion, stage V).
// ---------------------------------------------------------------------------
function pairMasks(L){
  const {N,scour}=L,K=scour.length;
  assert(K<=64,'pairMasks needs K<=64 (K='+K+')');
  const lo=new Uint32Array(N*N),hi=new Uint32Array(N*N);
  const R=new Int32Array(N*K);
  for(let s=0;s<N;s++)for(let k=0;k<K;k++)R[s*K+k]=L.natal[s]%scour[k];
  for(let k=0;k<K;k++){const q=scour[k];
    const bit=k<32?(1<<k)>>>0:(1<<(k-32))>>>0,tgt=k<32?lo:hi;
    for(let i=0;i<N;i++){const ri=R[i*K+k];
      for(let j=i+1;j<N;j++){if(eOf(ri,R[j*K+k],q)){tgt[i*N+j]|=bit;tgt[j*N+i]|=bit;}}}}
  return {lo,hi,R,K};
}
// ---------------------------------------------------------------------------
// [3] THE EXACT DECOMPOSITION.  One pass over every m-subset, accumulating the
// truth for all four layers at once:
//   A     = SUM_B w,            G = SUM_B w * PROD_q (1+kappa_q),
//   Cn[q] = SUM_B w * kappa_q restricted to configuration kind n,
//   Multi = SUM_B w * (PROD(1+kappa) - 1 - SUM kappa).
// Kahan on every accumulator.  Only primes carrying >= 2 colliding pairs are
// touched (bitmask filter), which is what makes the exact pass affordable.
// ---------------------------------------------------------------------------
function exactPass(L,S,PM,w0,NWk,n){
  const N=n||L.N,K=PM.K,{lo,hi,R}=PM,{scour}=L;
  const Qa=new Float64Array(K);for(let k=0;k<K;k++)Qa[k]=scour[k]-8;
  const C1=new Float64Array(K),C2=new Float64Array(K),C3=new Float64Array(K);
  const c1c=new Float64Array(K),c2c=new Float64Array(K),c3c=new Float64Array(K);
  let A=0,Ac=0,G=0,Gc=0,MU=0,MUc=0,quads=0,pairs=0,ctr=0,hits=0,pv=0;
  // joint-layer diagnostics: e2/e3 of the kappa list (the 2-prime and 3-prime
  // pieces of Multi), and the same sums with the pair weight w set to 1 --
  // which is exactly what a pure 2D class-histogram count would deliver.
  let MU2=0,MU2c=0,MU3=0,MU3c=0,MUw=0,MUwc=0,LINw=0,LINwc=0,maxK=0;
  const KAP=new Float64Array(16);
  const kadd=(arr,cmp,k,v)=>{const y=v-cmp[k],s=arr[k]+y;cmp[k]=(s-arr[k])-y;arr[k]=s;};
  for(let i=0;i<N;i++){const iN=i*N,iK=i*K;
    for(let j=i+1;j<N;j++){
      if(ctr++%NWk!==w0)continue;
      pairs++;
      const jN=j*N,jK=j*K,mijL=lo[iN+j],mijH=hi[iN+j],w2=1+S[iN+j];
      for(let l=j+1;l<N;l++){const lN=l*N,lK=l*K;
        const milL=lo[iN+l],milH=hi[iN+l],mjlL=lo[jN+l],mjlH=hi[jN+l];
        const o3L=mijL|milL|mjlL,o3H=mijH|milH|mjlH;
        const t3L=(mijL&milL)|(mijL&mjlL)|(milL&mjlL),
              t3H=(mijH&milH)|(mijH&mjlH)|(milH&mjlH);
        const w3=w2*(1+S[iN+l])*(1+S[jN+l]);
        for(let u=l+1;u<N;u++){
          const a=lo[iN+u],b=lo[jN+u],c=lo[lN+u];
          const tL=t3L|((a&b)|(a&c)|(b&c))|(o3L&(a|b|c));
          const ah=hi[iN+u],bh=hi[jN+u],ch=hi[lN+u];
          const tH=t3H|((ah&bh)|(ah&ch)|(bh&ch))|(o3H&(ah|bh|ch));
          const w=w3*(1+S[iN+u])*(1+S[jN+u])*(1+S[lN+u]);
          quads++;
          {const y=w-Ac,s=A+y;Ac=(s-A)-y;A=s;}
          if((tL|tH)===0){const y=w-Gc,s=G+y;Gc=(s-G)-y;G=s;continue;}
          hits++;
          let D=1,lin=0,nk=0;
          for(let word=0;word<2;word++){let t=word?tH:tL;const base=word?32:0;
            while(t){const b31=31-Math.clz32(t&-t);const k=base+b31;t&=t-1;pv++;
              const q=scour[k],Q=Qa[k];
              const r0=R[iK+k],r1=R[jK+k],r2=R[lK+k],r3=R[u*K+k];
              const e01=eOf(r0,r1,q),e02=eOf(r0,r2,q),e03=eOf(r0,r3,q),
                    e12=eOf(r1,r2,q),e13=eOf(r1,r3,q),e23=eOf(r2,r3,q);
              let den=1;
              if(e01)den*=1+e01/Q;if(e02)den*=1+e02/Q;if(e03)den*=1+e03/Q;
              if(e12)den*=1+e12/Q;if(e13)den*=1+e13/Q;if(e23)den*=1+e23/Q;
              const cc=cOf(r0,r1,r2,r3,q);
              const kap=(1+cc/Q)/den-1;
              const kind=componentKind(e01,e02,e03,e12,e13,e23);
              if(kind===1)kadd(C1,c1c,k,w*kap);
              else if(kind===2)kadd(C2,c2c,k,w*kap);
              else if(kind===3)kadd(C3,c3c,k,w*kap);
              else throw new Error('kind '+kind+' at q='+q+' with >=2 colliding pairs');
              D*=1+kap;lin+=kap;if(nk<16)KAP[nk]=kap;nk++;}}
          if(nk>maxK)maxK=nk;
          {const y=w*D-Gc,s=G+y;Gc=(s-G)-y;G=s;}
          {const y=w*(D-1-lin)-MUc,s=MU+y;MUc=(s-MU)-y;MU=s;}
          {const y=(D-1-lin)-MUwc,s=MUw+y;MUwc=(s-MUw)-y;MUw=s;}
          {const y=lin-LINwc,s=LINw+y;LINwc=(s-LINw)-y;LINw=s;}
          if(nk>1){ // elementary symmetric e2, e3 of the kappa list
            let e2=0,e3=0;
            for(let a=0;a<nk;a++)for(let b=a+1;b<nk;b++){e2+=KAP[a]*KAP[b];
              for(let c2=b+1;c2<nk;c2++)e3+=KAP[a]*KAP[b]*KAP[c2];}
            {const y=w*e2-MU2c,s=MU2+y;MU2c=(s-MU2)-y;MU2=s;}
            {const y=w*e3-MU3c,s=MU3+y;MU3c=(s-MU3)-y;MU3=s;}}
        }}}}
  return {A,Ac,G,Gc,MU,MUc,MU2,MU2c,MU3,MU3c,MUw,MUwc,LINw,LINwc,maxK,
          C1:Array.from(C1),C2:Array.from(C2),C3:Array.from(C3),quads,pairs,hits,pv};
}
function mergeExact(parts,K){
  const out={C1:new Float64Array(K),C2:new Float64Array(K),C3:new Float64Array(K),
             quads:0,pairs:0,hits:0,pv:0,maxK:0};
  const cmp={};for(const k of KEYS){out[k]=0;cmp[k]=0;}
  const kad=(key,v)=>{const y=v-cmp[key],s=out[key]+y;cmp[key]=(s-out[key])-y;out[key]=s;};
  for(const p of parts){                 // worker sums AND their compensations
    for(const k of KEYS)for(const v of [p[k],-p[k+'c']])kad(k,v); // true = S - comp
    for(let k=0;k<K;k++){out.C1[k]+=p.C1[k];out.C2[k]+=p.C2[k];out.C3[k]+=p.C3[k];}
    out.quads+=p.quads;out.pairs+=p.pairs;out.hits+=p.hits;out.pv+=p.pv;
    if(p.maxK>out.maxK)out.maxK=p.maxK;}
  return out;
}
const KEYS=['A','G','MU','MU2','MU3','MUw','LINw'];
const SUM=a=>{let s=0,c=0;for(const v of a){const y=v-c,t=s+y;c=(t-s)-y;s=t;}return s;};
// ---------------------------------------------------------------------------
// [V] VERIFICATION.  The exact pass is a NEW summation path (bitmask filter +
// per-prime kappa) and must agree with cap-32's brute force at @7 and @11 and
// with cap-32's bruteT4fast on the @13 subset, at the real moduli.  The
// per-prime exhaustion claim is enforced by construction: any prime carrying
// >= 2 colliding pairs that fails to land in kind 1/2/3 throws.
// ---------------------------------------------------------------------------
STAGES.verify=function(){
  log('--- [V] verification of the exact decomposition pass ---');
  // eOf / cOf against a naive distinct count over the 8 tokens
  {const L=buildLevel(11),{scour,natal,N}=L;
   for(const q of scour)for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
     const d=natal[j]-natal[i],dm=d%q,e=dm===0?2:(dm===2||dm===q-2)?1:0;
     assert(eOf(natal[i]%q,natal[j]%q,q)===e,`eOf q=${q}`);}
   const set=new Set();
   for(let i=0;i<20;i++)for(let j=i+1;j<20;j++)for(let l=j+1;l<20;l++)for(let u=l+1;u<20;u++)
     for(const q of scour){
       const rr=[natal[i]%q,natal[j]%q,natal[l]%q,natal[u]%q];
       for(const r of rr){set.add(r);set.add((r+2)%q);}
       assert(cOf(rr[0],rr[1],rr[2],rr[3],q)===8-set.size,'cOf');set.clear();}
   log(`eOf/cOf verified against naive distinct counts (${CHECKS} checks)`);}
  C32.checkWrapFree(buildLevel(7));C32.checkWrapFree(buildLevel(11));
  log('cap-32 checkWrapFree re-run at @7 and @11 (wrap-free counting, custody)');
  for(const x of [7,11]){
    const L=buildLevel(x),S=sMatrix(L,4),PM=pairMasks(L);
    const r=exactPass(L,S,PM,0,1);
    const bt=C32.bruteTG(L,4);
    assert(r.quads===CH4(L.N)&&r.pairs===CH2(L.N),`@${x} partition`);
    assertClose(r.G,bt.G,1e-13,`@${x} exact-pass G = cap-32 brute G`);
    assertClose(baseProd(L,4)*r.G,bt.T,1e-13,`@${x} exact-pass T4 = brute T4`);
    const Lin=SUM(r.C1)+SUM(r.C2)+SUM(r.C3);
    assertClose(r.A+Lin+r.MU,r.G,1e-13,`@${x} G = A + Lin + Multi`);
    const Ad=C32.AdirectT4(L,S);
    assertClose(r.A,Ad,1e-13,`@${x} A = cap-32 AdirectT4`);
    log(`@${x}: T4=${bt.T}  G=${r.G}  A=${r.A}  Lin=${ex(Lin)}  Multi=${ex(r.MU)}`);
    log(`@${x}: C1=${ex(SUM(r.C1))} C2=${ex(SUM(r.C2))} C3=${ex(SUM(r.C3))}  kappa-primes touched=${r.pv}`);
  }
  {const L=buildLevel(13),SB=subLevel(L,120),S=sMatrix(SB,4),PM=pairMasks(SB);
   const r=exactPass(SB,S,PM,0,1);
   const T=C32.bruteT4fast(SB);
   assert(r.quads===CH4(120),'@13[120] partition');
   assertClose(baseProd(SB,4)*r.G,T,1e-13,'@13[120] exact-pass T4 = cap-32 bruteT4fast');
   const bs=C32.BsemiDirect(SB,S,4);
   assertClose(SUM(r.C1),SUM(Array.from(bs.cls.C1)),1e-11,'@13[120] C1 = cap-32 semi-direct C1');
   assertClose(SUM(r.C3),SUM(Array.from(bs.cls.C3)),1e-11,'@13[120] C3 = cap-32 semi-direct C3');
   assertClose(SUM(r.C2),SUM(Array.from(bs.cls.C2)),1e-11,'@13[120] C2 = cap-32 semi-direct C2');
   assertClose(r.MU,bs.multi,1e-10,'@13[120] Multi = cap-32 semi-direct multi');
   log(`@13[120]: T4=${T}  exact-pass agrees with cap-32 on every layer`);}
  {const L=buildLevel(13),t=thm5(L);
   assertClose(t.T2,T2KNOWN,1e-13,'T2@13 = cap-27 certified');
   log(`@13 T2 = ${t.T2} = cap-27's printed value (independent Theorem-5 path)`);}
};
// ---------------------------------------------------------------------------
// [E] THE EXACT @13 DECOMPOSITION over all C(990,4) = 39,782,707,965
// quadruples.  Round-robin (i,j) split like cap-27, exact partition check.
// ---------------------------------------------------------------------------
function exact13Setup(){
  const L=buildLevel(13),S=sMatrix(L,4),PM=pairMasks(L);
  return {L,S,PM};
}
STAGES.ework=function(){
  const w=+process.argv[3],nw=+process.argv[4],out=process.argv[5];
  const {L,S,PM}=exact13Setup();
  const r=exactPass(L,S,PM,w,nw);
  fs.writeFileSync(out,JSON.stringify(r));
};
STAGES.exact13=async function(){
  log(`--- [E] exact @13 decomposition, ${NW} workers ---`);
  const L=buildLevel(13),K=L.scour.length;
  const outs=[],procs=[];
  for(let w=0;w<NW;w++){const out=path.join(DIR,`nc34-e${w}.json`);outs.push(out);
    try{fs.unlinkSync(out);}catch(e){}
    procs.push(new Promise((res,rej)=>{
      const p=cp.spawn(process.execPath,[__filename,'ework',String(w),String(NW),out],
        {stdio:['ignore','ignore','inherit']});
      p.on('exit',c=>c===0?res():rej(new Error('worker '+w+' exit '+c)));}));}
  await Promise.all(procs);
  const parts=outs.map(o=>JSON.parse(fs.readFileSync(o,'utf8')));
  const r=mergeExact(parts,K);
  const QTOT=Number(BigInt(L.N)*BigInt(L.N-1)*BigInt(L.N-2)*BigInt(L.N-3)/24n);
  assert(r.quads===QTOT,`partition = C(990,4) exactly: ${r.quads} vs ${QTOT}`);
  assert(r.pairs===CH2(L.N),'pair partition exact');
  const Lin=SUM(r.C1)+SUM(r.C2)+SUM(r.C3),T4=baseProd(L,4)*r.G;
  assertClose(r.A+Lin+r.MU,r.G,1e-13,'@13 G = A + Lin + Multi');
  log(`@13 EXACT: T4 = ${T4.toPrecision(17)}`);
  log(`@13 cap-27 certified:  ${T4KNOWN}   REL = ${ex((T4-T4KNOWN)/T4KNOWN)}`);
  assertClose(T4,T4KNOWN,5e-14,'CUSTODY: exact pass reproduces cap-27 T4@13');
  log(`@13 layers (exact):  A = ${r.A.toPrecision(17)}`);
  log(`  C1 = ${SUM(r.C1).toPrecision(17)}   (${ex(SUM(r.C1)/r.G)} of G)`);
  log(`  C2 = ${SUM(r.C2).toPrecision(17)}   (${ex(SUM(r.C2)/r.G)} of G)`);
  log(`  C3 = ${SUM(r.C3).toPrecision(17)}   (${ex(SUM(r.C3)/r.G)} of G)`);
  log(`  Multi = ${r.MU.toPrecision(17)}   (${ex(r.MU/r.G)} of G)`);
  log(`  G = ${r.G.toPrecision(17)}   quads=${r.quads.toLocaleString('en-US')}`);
  log(`  quadruples with a kappa-prime: ${r.hits.toLocaleString('en-US')} (${(100*r.hits/r.quads).toFixed(2)}%), kappa-prime visits ${r.pv.toLocaleString('en-US')}, max primes on one quadruple = ${r.maxK}`);
  log('@13 the JOINT layer, opened up (all exact):');
  log(`  Multi           = ${r.MU.toPrecision(15)}   (${ex(r.MU/r.G)} of G)`);
  log(`  2-prime part e2 = ${r.MU2.toPrecision(15)}   (${ex(r.MU2/r.G)} of G)`);
  log(`  3-prime part e3 = ${r.MU3.toPrecision(15)}   (${ex(r.MU3/r.G)} of G)`);
  log(`  4-prime and up  = ${(r.MU-r.MU2-r.MU3).toPrecision(15)}   (${ex((r.MU-r.MU2-r.MU3)/r.G)} of G)`);
  log(`  Multi with the pair weight w set to 1 (a pure class-histogram count):`);
  log(`    = ${r.MUw.toPrecision(15)}   error vs exact = ${ex((r.MUw-r.MU)/r.G)} of G  (${((r.MUw/r.MU-1)*100).toFixed(2)}% of the layer)`);
  log(`  Lin with w set to 1 = ${r.LINw.toPrecision(15)}  vs exact ${Lin.toPrecision(15)}  (${((r.LINw/Lin-1)*100).toFixed(2)}%)`);
  const dump={T4,G:r.G,A:r.A,MU:r.MU,MU2:r.MU2,MU3:r.MU3,MUw:r.MUw,LINw:r.LINw,
    C1:Array.from(r.C1),C2:Array.from(r.C2),C3:Array.from(r.C3),
    quads:r.quads,hits:r.hits,pv:r.pv,maxK:r.maxK,scour:Array.from(L.scour)};
  fs.writeFileSync(path.join(DIR,'nc34-exact13.json'),JSON.stringify(dump));
  log(`truth written to ${path.join(DIR,'nc34-exact13.json')}`);
};
// ---------------------------------------------------------------------------
// [L] THE LAYER SPLIT.  Every cap-32 engine layer is graded against the exact
// truth of stage E, and then swapped in one at a time so the contribution of
// each layer to the published -3.5e-5 is a MEASURED number, not an attribution.
// The K4 shape falls out for free: assembleA is exact O(N^3) shapes plus k4,
// so k4_exact = A_exact - assembleA(N, shapes, 0).
// ---------------------------------------------------------------------------
function loadTruth(){
  const f=path.join(DIR,'nc34-exact13.json');
  if(!fs.existsSync(f))throw new Error('run stage exact13 first (missing '+f+')');
  return JSON.parse(fs.readFileSync(f,'utf8'));
}
STAGES.layers=function(){
  const t=loadTruth(),L=buildLevel(13),K=L.scour.length,N=L.N;
  log(`--- [L] @13 layer split against the exact truth (G = ${t.G.toPrecision(17)}) ---`);
  const S=sMatrix(L,4);
  const sh=C32.shapeSums(L,S);log(`shapeSums done ${el()}`);
  const Ashapes=C32.assembleA(N,sh,0);
  const k4exact=t.A-Ashapes;
  log(`A: exact = ${t.A.toPrecision(17)}   O(N^3) shape part = ${Ashapes.toPrecision(17)}`);
  log(`k4 (the one Monte-Carlo shape): EXACT = ${k4exact.toPrecision(12)}  (${ex(k4exact/t.G)} of G)`);
  for(const ns of [2e6,2e7]){const mc=C32.k4MC(L,S,ns,12345);
    log(`  k4 MC n=${ns.toExponential(0)}: ${mc.k4.toFixed(0)} +- ${mc.err.toFixed(0)}  rel err vs exact = ${ex((mc.k4-k4exact)/k4exact)}  -> ${ex((mc.k4-k4exact)/t.G)} of G`);}
  const P=C32.Pmatrix(S,N);log(`Pmatrix done ${el()}`);
  const eng=C32.classEngine(L,S,P,4,{TP:true});log(`instance engine done ${el()}`);
  const blk=C32.blockEngine(L,S,4,{});log(`block engine done ${el()}`);
  const rows=[];
  for(const nm of ['C1','C2','C3']){
    const ex1=SUM(t[nm]),ei=SUM(Array.from(eng[nm])),eb=SUM(Array.from(blk[nm]));
    rows.push([nm,ex1,ei,eb]);
    log(`${nm}: exact = ${ex1.toPrecision(12)}  (${ex(ex1/t.G)} of G)`);
    log(`    instance engine ${ei.toPrecision(12)}  err ${ex((ei-ex1)/Math.abs(ex1))} rel-layer  -> ${ex((ei-ex1)/t.G)} of G`);
    log(`    block    engine ${eb.toPrecision(12)}  err ${ex((eb-ex1)/Math.abs(ex1))} rel-layer  -> ${ex((eb-ex1)/t.G)} of G`);}
  // multi-prime layer: cap-32's independence model x CAL4
  const Bq=[];for(let k=0;k<K;k++)Bq.push(t.C1[k]+t.C2[k]+t.C3[k]);
  let s1=0,s2=0;for(const v of Bq){s1+=v;s2+=v*v;}
  const modelRaw=(s1*s1-s2)/(2*t.A);
  log(`Multi: exact = ${t.MU.toPrecision(12)}  (${ex(t.MU/t.G)} of G)`);
  log(`    independence model (exact per-prime inputs) = ${modelRaw.toPrecision(12)}`);
  log(`    implied CAL4 = ${(t.MU/modelRaw).toFixed(6)}   (cap-32 used ${C32.CAL4})`);
  log(`    cap-32 model x CAL4 = ${(C32.CAL4*modelRaw).toPrecision(12)}  err ${ex((C32.CAL4*modelRaw-t.MU)/t.G)} of G`);
  // one-at-a-time swap: start from the all-exact G and degrade each layer
  const base=baseProd(L,4);
  const Lin=SUM(t.C1)+SUM(t.C2)+SUM(t.C3);
  const budget=[];
  const push=(name,dG)=>budget.push([name,dG,dG/t.G]);
  {const mc=C32.k4MC(L,S,2e7,777);push('A: k4 Monte Carlo',mc.k4-k4exact);}
  for(const [nm,ex1,ei,eb] of rows){push(`${nm}: instance engine`,ei-ex1);push(`${nm}: block engine`,eb-ex1);}
  push('Multi: model x CAL4=0.87',C32.CAL4*modelRaw-t.MU);
  push('Multi: model x 1 (raw)',modelRaw-t.MU);
  log('--- error budget, each layer alone, as a relative error on T4 ---');
  for(const [nm,dG,rel] of budget)log(`  ${nm.padEnd(28)} dG = ${dG.toExponential(4).padStart(12)}   rel(T4) = ${ex(rel)}`);
  // full cap-32 reconstruction from these parts (instance mode), for the record
  {const A32=Ashapes+C32.k4MC(L,S,2e7,12345).k4;
   const Bq32=[];for(let k=0;k<K;k++)Bq32.push(eng.C1[k]+eng.C2[k]+eng.C3[k]);
   let a=0,b=0;for(const v of Bq32){a+=v;b+=v*v;}
   const G32=A32+a+C32.CAL4*(a*a-b)/(2*A32),T32=base*G32;
   log(`cap-32 instance-engine T4@13 rebuilt here: ${T32.toPrecision(12)}  REL vs certified = ${ex((T32-T4KNOWN)/T4KNOWN)}`);
   log(`(cap-32's published @13 instance value: 352241335.08, REL -3.50e-5)`);}
  log(`exact G = A + Lin + Multi check: ${ex((t.A+Lin+t.MU-t.G)/t.G)}`);
  log(`exact T4 = ${(base*t.G).toPrecision(17)} vs cap-27 ${T4KNOWN}: REL ${ex((base*t.G-T4KNOWN)/T4KNOWN)}`);
  // the best assembly this file can build, and the same with Multi modelled:
  // isolates the joint layer as the single remaining obstruction.
  const c2e=c2Exact(L,S,4,{}),v4=c2V4Exclusion(L,S,4);
  const C2fac=SUM(Array.from(c2e.C2))+SUM(Array.from(v4));
  const k4best=C32.k4direct(L,S);   // EXACT K4 shape, Kahan over non-negative terms
  const Abest=Ashapes+k4best;
  const Lbest=SUM(Array.from(eng.C1))+C2fac+SUM(Array.from(eng.C3));
  log('--- best assembly available here ---');
  log(`  A(shapes + k4 EXACT, k4direct) + C1,C3(instance, exact) + C2(factorised, exact) + Multi(EXACT):`);
  const Gbest=Abest+Lbest+t.MU,Tbest=base*Gbest;
  log(`  T4 = ${Tbest.toPrecision(17)}   REL vs certified = ${ex((Tbest-T4KNOWN)/T4KNOWN)}   (k4 = ${k4best.toPrecision(17)}, vs A_exact-A_shapes ${ex((k4best-k4exact)/k4exact)})`);
  const GmodC=Abest+Lbest+C32.CAL4*modelRaw,GmodR=Abest+Lbest+modelRaw;
  log(`  same but Multi = model x CAL4: T4 = ${(base*GmodC).toPrecision(15)}  REL ${ex((base*GmodC-T4KNOWN)/T4KNOWN)}`);
  log(`  same but Multi = model raw:    T4 = ${(base*GmodR).toPrecision(15)}  REL ${ex((base*GmodR-T4KNOWN)/T4KNOWN)}`);
  log(`  GATE 1e-9: ${Math.abs((Tbest-T4KNOWN)/T4KNOWN)<=1e-9?'MET with Multi exact':'not met even with Multi exact'};`+
      ` with Multi modelled: ${Math.abs((base*GmodC-T4KNOWN)/T4KNOWN)<=1e-9?'MET':'NOT met'}`);
};
// ---------------------------------------------------------------------------
// [C2] THE C2 LAYER, EXACT AND CLOSED.  cap-32 expands the four CROSS factors
// (1+s_ik)(1+s_il)(1+s_jk)(1+s_jl) and truncates at order 2.  It does not have
// to: for a fixed outer pair P1 = (i,j) the cross product FACTORISES over the
// two slots of P2,
//     (1+s_ik)(1+s_jk) * (1+s_il)(1+s_jl) = g[k] * g[l],   g[x] = (1+s_ix)(1+s_jx),
// so the whole inner sum is SUM over colliding pairs (k,l) of (1+s_kl) g_k g_l
// -- one weighted quadratic form, all four cross orders included, no expansion
// at all.  Class sums make the (1+s_kl) -> 1 part O(N); the residual s_kl part
// is the only O(nnz) piece and is reported separately so its size is known
// before anyone pays for it at @17.
// ---------------------------------------------------------------------------
function c2Exact(L,S,m,opts){
  const {N,scour}=L,K=scour.length,noSK=!!(opts&&opts.noSK);
  const out=new Float64Array(K),skPart=new Float64Array(K);
  const g=new Float64Array(N);
  let nnzTot=0,workN=0,workNnz=0;
  for(let k=0;k<K;k++){
    const q=scour[k],Q=q-2*m,cl=C32.classesAt(L,q).map(a=>Int32Array.from(a));
    const clsOf=new Int32Array(N);for(let v=0;v<q;v++)for(const i of cl[v])clsOf[i]=v;
    // colliding-pair edge lists per e-class
    const EI=[null,[],[]],EJ=[null,[],[]],EV=[null,[],[]];
    for(let v=0;v<q;v++){const a=cl[v],b=cl[(v+2)%q];
      for(let x=0;x<a.length;x++)for(let y=x+1;y<a.length;y++){
        EI[2].push(a[x]);EJ[2].push(a[y]);EV[2].push(S[a[x]*N+a[y]]);}
      for(const s of a)for(const t of b){EI[1].push(s);EJ[1].push(t);EV[1].push(S[s*N+t]);}}
    const Ie=[null,Int32Array.from(EI[1]),Int32Array.from(EI[2])],
          Je=[null,Int32Array.from(EJ[1]),Int32Array.from(EJ[2])],
          Ve=[null,Float64Array.from(EV[1]),Float64Array.from(EV[2])];
    nnzTot+=Ie[1].length+Ie[2].length;
    // adjacency (for the "P2 touches i or j" exclusion) and the O(N) helpers
    const adjH=[null,new Map(),new Map()];
    for(const e of [1,2]){const M=adjH[e];
      for(let p=0;p<Ie[e].length;p++){const a=Ie[e][p],b=Je[e][p];
        if(!M.has(a))M.set(a,[]);if(!M.has(b))M.set(b,[]);
        M.get(a).push(p);M.get(b).push(p);}}
    const GA=new Float64Array(q),GB=new Float64Array(q); // class sums of g and g^2
    const nu=(e1,e2)=>-e1*e2/((Q+e1)*(Q+e2));
    let acc=0,accSK=0;
    for(const e1 of [1,2]){const I1=Ie[e1],J1=Je[e1],V1=Ve[e1];
      for(let p1=0;p1<I1.length;p1++){
        const i=I1[p1],j=J1[p1],W1=1+V1[p1],iN=i*N,jN=j*N;
        for(let x=0;x<N;x++)g[x]=(1+S[iN+x])*(1+S[jN+x]);
        GA.fill(0);GB.fill(0);
        for(let x=0;x<N;x++){const c=clsOf[x],gx=g[x];GA[c]+=gx;GB[c]+=gx*gx;}
        workN+=N;
        // inner sums per e2, "1" part via class sums (exact, O(N))
        let in1=0,in2=0;
        for(let v=0;v<q;v++){in2+=(GA[v]*GA[v]-GB[v])/2;in1+=GA[v]*GA[(v+2)%q];}
        // the s_kl part
        let sk1=0,sk2=0;
        if(!noSK){
          {const I=Ie[1],J=Je[1],V=Ve[1];for(let p=0;p<V.length;p++)sk1+=V[p]*g[I[p]]*g[J[p]];}
          {const I=Ie[2],J=Je[2],V=Ve[2];for(let p=0;p<V.length;p++)sk2+=V[p]*g[I[p]]*g[J[p]];}
          workNnz+=Ie[1].length+Ie[2].length;}
        // exclusion: P2 sharing a slot with P1 (g_i = g_j = W1 exactly)
        let bad1=0,bad2=0;
        for(const e2 of [1,2]){const I=Ie[e2],J=Je[e2],V=Ve[e2];let b=0;
          for(const src of [i,j]){const lst=adjH[e2].get(src);if(!lst)continue;
            for(const p of lst){const o=I[p]===src?J[p]:I[p];b+=(1+V[p])*W1*g[o];}}
          // the pair (i,j) itself lies in E_{e1} and was counted from both ends
          if(e1===e2)b-=W1*W1*W1;
          if(e2===1)bad1=b;else bad2=b;}
        const tot1=in1+sk1-bad1,tot2=in2+sk2-bad2;
        acc+=W1*(nu(e1,1)*tot1+nu(e1,2)*tot2);
        accSK+=W1*(nu(e1,1)*sk1+nu(e1,2)*sk2);
      }}
    out[k]=acc/2;skPart[k]=accSK/2;
  }
  return {C2:out,skPart,nnzTot,workN,workNnz};
}
// the V4 exclusion: quadruples that are CONNECTED at q but contain two
// disjoint colliding pairs.  cap-32's own forV4 / patternInfo, exact.
function c2V4Exclusion(L,S,m){
  const {N,scour}=L,K=scour.length,out=new Float64Array(K);
  for(let k=0;k<K;k++){
    const q=scour[k],Q=q-2*m,cl=C32.classesAt(L,q).map(a=>Int32Array.from(a));
    let acc=0;
    for(const parts of C32.V4PATTERNS){
      const pi=C32.patternInfo(parts,Q);if(!pi.nuExcl)continue;
      C32.forV4(cl,q,parts,(a,b,c,d)=>{
        acc-=pi.nuExcl*(1+S[a*N+b])*(1+S[a*N+c])*(1+S[a*N+d])
                      *(1+S[b*N+c])*(1+S[b*N+d])*(1+S[c*N+d]);});}
    out[k]=acc;}
  return out;
}
function c2Validate(){
  for(const spec of [[7,0],[11,0],[13,120]]){
    const L0=buildLevel(spec[0]),L=spec[1]?subLevel(L0,spec[1]):L0;
    const S=sMatrix(L,4),PM=pairMasks(L),r=exactPass(L,S,PM,0,1);
    const ex1=c2Exact(L,S,4,{}),v4=c2V4Exclusion(L,S,4);
    const got=SUM(Array.from(ex1.C2))+SUM(Array.from(v4)),want=SUM(r.C2);
    assertClose(got,want,1e-11,`@${spec[0]}${spec[1]?'['+spec[1]+']':''} c2Exact = exact C2`);
    log(`@${spec[0]}${spec[1]?'['+spec[1]+']':''} C2: factorised ${got.toPrecision(14)} = exact ${want.toPrecision(14)}  rel ${ex((got-want)/Math.abs(want))}`);}
}
STAGES.c2=function(){
  log('--- [C2] validation of the factorised exact C2 ---');
  c2Validate();
  const t=loadTruth(),L=buildLevel(13),K=L.scour.length;
  log('--- [C2] exact C2 layer at @13 vs the exact truth ---');
  const S=sMatrix(L,4);
  let t1=Date.now();
  const ex1=c2Exact(L,S,4,{});const tExact=(Date.now()-t1)/1000;
  t1=Date.now();
  const exNo=c2Exact(L,S,4,{noSK:true});const tNoSK=(Date.now()-t1)/1000;
  t1=Date.now();
  const v4=c2V4Exclusion(L,S,4);const tV4=(Date.now()-t1)/1000;
  const truth=SUM(t.C2),G=t.G;
  const full=SUM(Array.from(ex1.C2))+SUM(Array.from(v4));
  const noSK=SUM(Array.from(exNo.C2))+SUM(Array.from(v4));
  log(`C2 exact truth      = ${truth.toPrecision(15)}   (${ex(truth/G)} of G)`);
  log(`C2 factorised exact = ${full.toPrecision(15)}   err ${ex((full-truth)/G)} of G   [${tExact.toFixed(1)}s + ${tV4.toFixed(1)}s V4]`);
  log(`C2 without s_kl term= ${noSK.toPrecision(15)}   err ${ex((noSK-truth)/G)} of G   [${tNoSK.toFixed(1)}s]`);
  log(`  the dropped s_kl piece alone: ${SUM(Array.from(ex1.skPart)).toPrecision(8)}  (${ex(SUM(Array.from(ex1.skPart))/G)} of G)`);
  const blk=C32.blockEngine(L,S,4,{}),eng=C32.classEngine(L,S,C32.Pmatrix(S,L.N),4,{TP:true});
  log(`cap-32 instance C2  = ${SUM(Array.from(eng.C2)).toPrecision(15)}   err ${ex((SUM(Array.from(eng.C2))-truth)/G)} of G`);
  log(`cap-32 block    C2  = ${SUM(Array.from(blk.C2)).toPrecision(15)}   err ${ex((SUM(Array.from(blk.C2))-truth)/G)} of G`);
  log(`cost model: O(N) work = ${ex1.workN.toExponential(3)} slot-visits, O(nnz) work = ${ex1.workNnz.toExponential(3)}, edges = ${ex1.nnzTot.toLocaleString('en-US')}`);
  const {N}=L;let sc=0;for(const q of L.scour)sc+=1/q;
  log(`@13 scaling constants: N=${N}, SUM 1/q = ${sc.toFixed(4)}; predicted O(N) cost ~ 1.5 N^3 SUM(1/q) = ${(1.5*N**3*sc).toExponential(3)}`);
};
// ---------------------------------------------------------------------------
// [K] WHAT THE BOUND ACTUALLY NEEDS.  mu4 = 3Var^2 + kappa4, with Var exact and
// cheap at every level.  We measure kappa4 where T4 is certified (@11, @13) and
// price the @17 rung both ways: through T4 (the cap-32 road) and through
// kappa4 (which the 3Var^2 reference has been silently using all along).
// ---------------------------------------------------------------------------
function moments(T1,T2,T3,T4){
  const M2=2*T2+T1,M3=6*T3+6*T2+T1,M4=24*T4+36*T3+14*T2+T1,mu=T1;
  const Var=M2-mu*mu,mu3=M3-3*mu*M2+2*mu**3,mu4=M4-4*mu*M3+6*mu*mu*M2-3*mu**4;
  return {mu,Var,mu3,mu4,M2,M3,M4,T4,k4:mu4-3*Var*Var};
}
STAGES.kurt=function(){
  log('--- [K] mu4 = 3 Var^2 + kappa4: the measured size of kappa4 ---');
  const rows=[];
  {const L=buildLevel(11);let P1=1;for(const q of L.scour)P1*=1-2/q;
   const b4=C32.bruteTG(L,4),b3=C32.bruteTG(L,3),t=thm5(L);
   rows.push(['@11',moments(L.N*P1,t.T2,b3.T,b4.T)]);}
  {const L=buildLevel(13);let P1=1;for(const q of L.scour)P1*=1-2/q;
   rows.push(['@13',moments(L.N*P1,T2KNOWN,T3KNOWN,T4KNOWN)]);}
  for(const [nm,m] of rows){
    log(`${nm}: mu=${m.mu.toFixed(4)} Var=${m.Var.toFixed(4)} mu4=${m.mu4.toFixed(4)}`);
    log(`     3Var^2 = ${(3*m.Var*m.Var).toFixed(4)}   kappa4 = mu4 - 3Var^2 = ${m.k4.toFixed(4)}   (${ex(m.k4/m.mu4)} of mu4)`);
    log(`     quartic Markov mu4/mu^4 = ${ex(m.mu4/m.mu**4)};  using 3Var^2 alone = ${ex(3*m.Var*m.Var/m.mu**4)}`);
    log(`     assembly amplification 24 T4 / mu4 = ${ex(24*m.T4/m.mu4)}: relT4 = 1e-9 gives dmu4/mu4 = ${ex(24*m.T4*1e-9/m.mu4)}`);}
  // @17: exact mu and Var, and the precision price of each road
  const L=buildLevel(17),t=thm5(L),mu=t.T1,Var=2*t.T2+t.T1-t.T1*t.T1;
  const T4c=4616850623332.1,T3c=5693984348.13;   // cap-32's @17 values, +-4e-4/1e-4
  log(`@17 exact: mu = ${mu} Var = ${Var}  Chebyshev = ${ex(Var/(mu*mu))}`);
  log(`@17 3Var^2 = ${ex(3*Var*Var)};  PREDICTED quartic bound 3Var^2/mu^4 = ${ex(3*Var*Var/mu**4)}`);
  log(`@17 price of the T4 road: dmu4 = 24 T4 relT4 + (36+24mu) T3 relT3`);
  for(const tol of [1,0.1,0.03,0.01]){
    const rel4=tol*3*Var*Var/(24*T4c),rel3=tol*3*Var*Var/((36+24*mu)*T3c);
    log(`   mu4 to ${(100*tol).toFixed(0)}%  needs relT4 <= ${ex(rel4)} and relT3 <= ${ex(rel3)}`);}
  log(`@17 price of the kappa4 road: mu4 = 3Var^2 + kappa4 with Var EXACT;`);
  log(`   kappa4/mu4 measured ${ex(rows[0][1].k4/rows[0][1].mu4)} (@11), ${ex(rows[1][1].k4/rows[1][1].mu4)} (@13), both negative;`);
  log(`   at @17 a mere SIGN (kappa4 <= 0) would give P(S=0) <= 3Var^2/mu^4 = ${ex(3*Var*Var/mu**4)} outright.`);
};
// ---------------------------------------------------------------------------
// [J] THE 2D CLASS-HISTOGRAM JOINT COUNTS -- COST FIRST.
// The joint (2-prime) layer wants, for each prime pair, sums over quadruples
// carrying a kappa event at BOTH primes.  The table itself is H_{q,q'}(v,v') =
// #{slots == v mod q, == v' mod q'}: at most N non-zero cells, O(N) to build.
// The CONTRACTION is the cost.  Its dominant shape is the two-modulus 4-cycle
// (pairs (i,j),(k,l) colliding at q; (i,k),(j,l) colliding at q'), whose
// cheapest histogram form is
//     SUM_i SUM_{j ~q i} SUM_{k ~q' i} H_{q,q'}(class_q(k)+d, class_q'(j)+d')
// -- an O(1) table lookup per (i,j,k).  So the operation count is exactly
//     WJ = SUM_{q<q'} SUM_i deg_q(i) deg_q'(i),
// which we compute EXACTLY (no estimate) at @13, @17, @19 below.  Carrying the
// pair weight w = PROD(1+s) instead of w = 1 destroys the O(1) lookup (the
// weight needs the identity of the fourth slot), multiplying WJ by the mean
// number of admissible fourth slots, WJ4, also computed exactly.
// ---------------------------------------------------------------------------
function jointCost(L){
  const {N,scour}=L,K=scour.length;
  const T=new Float64Array(N),T2=new Float64Array(N);
  for(let k=0;k<K;k++){const q=scour[k],cnt=new Int32Array(q);
    for(let s=0;s<N;s++)cnt[L.natal[s]%q]++;
    for(let s=0;s<N;s++){const v=L.natal[s]%q;
      const d=cnt[v]-1+cnt[(v+2)%q]+cnt[(v+q-2)%q];T[s]+=d;T2[s]+=d*d;}}
  // WJ reaches 6.3 x 2^53 at @19 and the label on the printed line says `exact`.
  // In a plain double it was not: the accumulator returned 56898887621686610
  // against BigInt's 56898887621686874, off by 264. Every ADDEND is an exact
  // integer well inside the safe range (T is a sum of counts, and T^2 - T2 is
  // even because it is twice the sum over unordered pairs), so the fix is the
  // house BigInt-flush pattern from scanstat-t37-01-engine.js: carry a small
  // exact partial and empty it into a BigInt before it can reach 2^53. The five
  // printed digits do not move; the label becomes true. (2026-08-20.)
  let WJhi=0n,WJlo=0,sumDeg=0;
  for(let s=0;s<N;s++){
    WJlo+=(T[s]*T[s]-T2[s])/2;
    if(WJlo>4e15){WJhi+=BigInt(WJlo);WJlo=0;}
    sumDeg+=T[s];}
  WJhi+=BigInt(WJlo);
  const WJ=Number(WJhi);
  // mean number of admissible fourth slots: 9N/(q q') averaged over prime pairs
  let inv=0,inv2=0;for(const q of scour){inv+=1/q;inv2+=1/(q*q);}
  const pairsInv=(inv*inv-inv2)/2,nPairs=K*(K-1)/2;
  const meanL=9*N*pairsInv/nPairs;
  return {WJ,WJ4:WJ*9*N*pairsInv/nPairs,nPairs,meanL,tableCells:nPairs*N,
          meanDeg:sumDeg/(N*K)};
}
function build2D(L,k1,k2){ // the table itself: at most N non-zero cells
  const q=L.scour[k1],r=L.scour[k2],H=new Map();
  for(let s=0;s<L.N;s++){const key=(L.natal[s]%q)*r+(L.natal[s]%r);
    H.set(key,(H.get(key)||0)+1);}
  return H;
}
STAGES.joint=function(){
  log('--- [J] cost of the 2D class-histogram joint counts ---');
  for(const x of [13,17,19]){
    const L=buildLevel(x),K=L.scour.length;
    const t0=Date.now();const c=jointCost(L);const tCost=(Date.now()-t0)/1000;
    // time the tables themselves on a sample, then extrapolate to all pairs
    const t1=Date.now();let cells=0,ns=0;
    const step=Math.max(1,Math.floor(c.nPairs/200));
    for(let k1=0,seen=0;k1<K;k1++)for(let k2=k1+1;k2<K;k2++,seen++){
      if(seen%step)continue;cells+=build2D(L,k1,k2).size;ns++;}
    const tTab=(Date.now()-t1)/1000;
    const tAll=tTab*c.nPairs/ns;
    log(`@${x}: N=${L.N} K=${K} prime pairs=${c.nPairs.toLocaleString('en-US')} mean degree=${c.meanDeg.toFixed(1)}`);
    log(`   TABLE: ${(cells/ns).toFixed(0)} non-zero cells per pair (of N=${L.N}); all pairs built in ${tAll.toFixed(1)}s extrapolated from ${ns} samples in ${tTab.toFixed(2)}s`);
    log(`   CONTRACTION (w = 1, O(1) lookups): WJ = ${c.WJ.toExponential(4)} operations  [cost pass ${tCost.toFixed(2)}s, exact]`);
    log(`   CONTRACTION (w kept, fourth slot enumerated): WJ4 = ${c.WJ4.toExponential(4)}  (mean admissible fourth slots ${c.meanL.toFixed(2)})`);
  }
  // what the exact @13 run says the two variants are worth
  try{const t=loadTruth();
    log('--- what the exact @13 numbers say those operations would buy ---');
    log(`   Multi exact = ${t.MU.toPrecision(12)} (${ex(t.MU/t.G)} of G)`);
    log(`   2-prime part = ${t.MU2.toPrecision(12)} (${ex(t.MU2/t.G)} of G); 3-prime = ${t.MU3.toPrecision(12)} (${ex(t.MU3/t.G)} of G)`);
    log(`   4-prime and up = ${(t.MU-t.MU2-t.MU3).toPrecision(12)} (${ex((t.MU-t.MU2-t.MU3)/t.G)} of G)`);
    log(`   Multi with w = 1 (what a pure histogram count returns): ${t.MUw.toPrecision(12)}`);
    log(`   -> dropping w costs ${ex((t.MUw-t.MU)/t.G)} of G = ${((t.MUw/t.MU-1)*100).toFixed(2)}% of the layer`);
  }catch(e){log('(stage exact13 not run yet: '+e.message+')');}
};
// ---------------------------------------------------------------------------
// DISPATCH (stages are appended below in order V / E / L / J / 17)
// ---------------------------------------------------------------------------
const MODE=process.argv[2]||'verify';
if(require.main===module){
  const f=STAGES[MODE];
  if(!f){console.error('unknown stage '+MODE+'; have: '+Object.keys(STAGES).join(' '));process.exit(2);}
  Promise.resolve(f()).then(()=>log(`[${CHECKS} checks passed]`))
    .catch(e=>{console.error(e);process.exit(1);});
}

// ============================================================================
// OUTPUT (2026-08-18) — ALL SIX STAGES, EVERY ONE RUN TODAY, full runs pasted
// ============================================================================
// PROVENANCE: produced by me, today, on this machine (10-core Apple Si,
// node v22.21.0), and re-produced end to end after the k4 substitution of
// reading 6. Six commands, in this order:
//   NC34_DIR=<scratch> NC34_WORKERS=10 node ... exact13    1466.0 s
//   NC34_DIR=<scratch> node ... layers                      341.3 s
//   NC34_DIR=<scratch> node ... c2                          246.1 s
//   node ... kurt                                             1.8 s
//   NC34_DIR=<scratch> node ... joint                         4.1 s
//   NC34_WORKERS=2 node ... verify                           23.2 s
// EVERY PRINTED DIGIT below is from those six runs. Only the [L] best-assembly
// block changes with the substitution; every other number in every other stage
// is bit-identical to the runs made before it, which is the check that the
// substitution touched one thing.
// WALL TIMES MOVE AND NOTHING ELSE DOES. exact13 read 876.1 s on an idle
// machine earlier the same day and 1466.0 s here with the box shared, against
// 1857.0 s in research/wave7-logs/cap34-exact13.log (2026-08-15, sharing with
// the @41 march) — all three digit-identical. [J]'s "all pairs built in Xs"
// figures are extrapolations from a timed sample and drift a few percent per
// run by construction.
// NOT COPIED FROM A LOG. The two archived logs are a reproduction target only:
//   research/wave7-logs/cap34-exact13.log (2026-08-15) — every printed digit
//     of the exact13 block below is IDENTICAL to it; the only differing lines
//     are the scratch path the truth JSON is written to and the wall time.
//   ~/Files/primeoire-runs/chain/cap34-verify.log (2026-08-15, 56.2 s,
//     88,520 checks) — reproduced by the verify block below.
// A THIRD archived log, research/wave7-logs/cap34-cap27-custody.log, is NOT
// cap-34 output at all despite its name: its format strings are printed by
// natal-cap-27-t4-at13.js:220/:255/:321. It is a re-run of the custody
// TARGET. It is deliberately not pasted here.
// ============================================================================
/*
=== node research/natal-cap-34-wrap-precision.js exact13 ===

[0.0s] --- [E] exact @13 decomposition, 10 workers ---
[1466.0s] @13 EXACT: T4 = 352253669.87624460
[1466.0s] @13 cap-27 certified:  352253669.8762445   REL = 3.384189e-16
[1466.0s] @13 layers (exact):  A = 68943985960.279144
[1466.0s]   C1 = -2294790388.9899592   (-3.479294e-2 of G)
[1466.0s]   C2 = -184829668.85234207   (-2.802333e-3 of G)
[1466.0s]   C3 = -553554086.94408917   (-8.392825e-3 of G)
[1466.0s]   Multi = 44821955.443329073   (6.795774e-4 of G)
[1466.0s]   G = 65955633770.936089   quads=39,782,707,965
[1466.1s]   quadruples with a kappa-prime: 26,845,968,566 (67.48%), kappa-prime visits 41,880,208,754, max primes on one quadruple = 12
[1466.1s] @13 the JOINT layer, opened up (all exact):
[1466.1s]   Multi           = 44821955.4433291   (6.795774e-4 of G)
[1466.1s]   2-prime part e2 = 45090019.6365043   (6.836417e-4 of G)
[1466.1s]   3-prime part e3 = -268718.409425233   (-4.074230e-6 of G)
[1466.1s]   4-prime and up  = 654.216249991616   (9.919035e-9 of G)
[1466.1s]   Multi with the pair weight w set to 1 (a pure class-histogram count):
[1466.1s]     = 15975541.2040702   error vs exact = -4.373609e-4 of G  (-64.36% of the layer)
[1466.1s]   Lin with w set to 1 = -1350912108.70099  vs exact -3033174144.78639  (-55.46%)
[1466.1s] truth written to /private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/43d455bc-6530-4df2-9970-05f6622affcb/scratchpad/nc34/nc34-exact13.json
[1466.1s] [4 checks passed]

=== node research/natal-cap-34-wrap-precision.js layers ===

[0.0s] --- [L] @13 layer split against the exact truth (G = 65955633770.936089) ---
[0.7s] shapeSums done 0.7s
[0.7s] A: exact = 68943985960.279144   O(N^3) shape part = 68943925725.774673
[0.7s] k4 (the one Monte-Carlo shape): EXACT = 60234.5044708  (9.132579e-7 of G)
[0.8s]   k4 MC n=2e+6: 60132 +- 547  rel err vs exact = -1.696678e-3  -> -1.549504e-9 of G
[2.9s]   k4 MC n=2e+7: 60315 +- 174  rel err vs exact = 1.343100e-3  -> 1.226597e-9 of G
[3.6s] Pmatrix done 3.6s
[117.1s] instance engine done 117.1s
[125.8s] block engine done 125.8s
[125.8s] C1: exact = -2294790388.99  (-3.479294e-2 of G)
[125.8s]     instance engine -2294790389.00  err -6.511759e-12 rel-layer  -> -2.265633e-13 of G
[125.8s]     block    engine -2306638232.81  err -5.162931e-3 rel-layer  -> -1.796335e-4 of G
[125.8s] C2: exact = -184829668.852  (-2.802333e-3 of G)
[125.8s]     instance engine -184133121.776  err 3.768589e-3 rel-layer  -> 1.056084e-5 of G
[125.8s]     block    engine -183146140.325  err 9.108541e-3 rel-layer  -> 2.552517e-5 of G
[125.8s] C3: exact = -553554086.944  (-8.392825e-3 of G)
[125.8s]     instance engine -553554086.940  err 8.007885e-12 rel-layer  -> 6.720878e-14 of G
[125.8s]     block    engine -561665283.224  err -1.465294e-2 rel-layer  -> -1.229796e-4 of G
[125.8s] Multi: exact = 44821955.4433  (6.795774e-4 of G)
[125.8s]     independence model (exact per-prime inputs) = 48083774.2789
[125.8s]     implied CAL4 = 0.932164   (cap-32 used 0.87)
[125.8s]     cap-32 model x CAL4 = 41832883.6226  err -4.531943e-5 of G
[127.8s] --- error budget, each layer alone, as a relative error on T4 ---
[127.8s]   A: k4 Monte Carlo            dG =   -1.0537e+2   rel(T4) = -1.597529e-9
[127.8s]   C1: instance engine          dG =   -1.4943e-2   rel(T4) = -2.265633e-13
[127.8s]   C1: block engine             dG =   -1.1848e+7   rel(T4) = -1.796335e-4
[127.8s]   C2: instance engine          dG =    6.9655e+5   rel(T4) = 1.056084e-5
[127.8s]   C2: block engine             dG =    1.6835e+6   rel(T4) = 2.552517e-5
[127.8s]   C3: instance engine          dG =    4.4328e-3   rel(T4) = 6.720878e-14
[127.8s]   C3: block engine             dG =   -8.1112e+6   rel(T4) = -1.229796e-4
[127.8s]   Multi: model x CAL4=0.87     dG =   -2.9891e+6   rel(T4) = -4.531943e-5
[127.8s]   Multi: model x 1 (raw)       dG =    3.2618e+6   rel(T4) = 4.945474e-5
[129.4s] cap-32 instance-engine T4@13 rebuilt here: 352241335.077  REL vs certified = -3.501681e-5
[129.4s] (cap-32's published @13 instance value: 352241335.08, REL -3.50e-5)
[129.4s] exact G = A + Lin + Multi check: -1.156746e-16
[129.4s] exact T4 = 352253669.87624460 vs cap-27 352253669.8762445: REL 3.384189e-16
[341.3s] --- best assembly available here ---
[341.3s]   A(shapes + k4 EXACT, k4direct) + C1,C3(instance, exact) + C2(factorised, exact) + Multi(EXACT):
[341.3s]   T4 = 352253669.87614751   REL vs certified = -2.753038e-13   (k4 = 60234.496774278130, vs A_exact-A_shapes -1.277764e-7)
[341.3s]   same but Multi = model x CAL4: T4 = 352237705.940117  REL -4.531943e-5
[341.3s]   same but Multi = model raw:    T4 = 352271090.490424  REL 4.945474e-5
[341.3s]   GATE 1e-9: MET with Multi exact; with Multi modelled: NOT met
[341.3s] [0 checks passed]

=== node research/natal-cap-34-wrap-precision.js c2 ===

[0.0s] --- [C2] validation of the factorised exact C2 ---
[0.0s] @7 C2: factorised -9.3748148148148 = exact -9.3748148148148  rel -9.474090e-16
[0.7s] @11 C2: factorised -40634.230516655 = exact -40634.230516654  rel -2.435213e-14
[2.2s] @13[120] C2: factorised -33474.512750471 = exact -33474.512750471  rel -4.564521e-15
[2.2s] --- [C2] exact C2 layer at @13 vs the exact truth ---
[115.3s] C2 exact truth      = -184829668.852342   (-2.802333e-3 of G)
[115.3s] C2 factorised exact = -184829668.852314   err 4.324244e-16 of G   [55.4s + 54.4s V4]
[115.3s] C2 without s_kl term= -139150881.841113   err 6.925684e-4 of G   [3.3s]
[115.3s]   the dropped s_kl piece alone: -45678787  (-6.925684e-4 of G)
[246.1s] cap-32 instance C2  = -184133121.776231   err 1.056084e-5 of G
[246.1s] cap-32 block    C2  = -183146140.324758   err 2.552517e-5 of G
[246.1s] cost model: O(N) work = 8.202e+8 slot-visits, O(nnz) work = 3.304e+10, edges = 828,450
[246.1s] @13 scaling constants: N=990, SUM 1/q = 0.5734; predicted O(N) cost ~ 1.5 N^3 SUM(1/q) = 8.345e+8
[246.1s] [6 checks passed]

=== node research/natal-cap-34-wrap-precision.js kurt ===

[0.0s] --- [K] mu4 = 3 Var^2 + kappa4: the measured size of kappa4 ---
[1.6s] @11: mu=39.2735 Var=9.6305 mu4=277.1352
[1.6s]      3Var^2 = 278.2415   kappa4 = mu4 - 3Var^2 = -1.1063   (-3.991908e-3 of mu4)
[1.6s]      quartic Markov mu4/mu^4 = 1.164907e-4;  using 3Var^2 alone = 1.169557e-4
[1.6s]      assembly amplification 24 T4 / mu4 = 7.630836e+3: relT4 = 1e-9 gives dmu4/mu4 = 7.630836e-6
[1.6s] @13: mu=304.2821 Var=90.1995 mu4=24407.3737
[1.6s]      3Var^2 = 24407.8586   kappa4 = mu4 - 3Var^2 = -0.4850   (-1.986992e-5 of mu4)
[1.6s]      quartic Markov mu4/mu^4 = 2.847182e-6;  using 3Var^2 alone = 2.847238e-6
[1.6s]      assembly amplification 24 T4 / mu4 = 3.463743e+5: relT4 = 1e-9 gives dmu4/mu4 = 3.463743e-4
[1.8s] @17 exact: mu = 3245.512635440701 Var = 1062.3544031865895  Chebyshev = 1.008562e-4
[1.8s] @17 3Var^2 = 3.385791e+6;  PREDICTED quartic bound 3Var^2/mu^4 = 3.051595e-8
[1.8s] @17 price of the T4 road: dmu4 = 24 T4 relT4 + (36+24mu) T3 relT3
[1.8s]    mu4 to 100%  needs relT4 <= 3.055646e-8 and relT3 <= 7.630423e-9
[1.8s]    mu4 to 10%  needs relT4 <= 3.055646e-9 and relT3 <= 7.630423e-10
[1.8s]    mu4 to 3%  needs relT4 <= 9.166938e-10 and relT3 <= 2.289127e-10
[1.8s]    mu4 to 1%  needs relT4 <= 3.055646e-10 and relT3 <= 7.630423e-11
[1.8s] @17 price of the kappa4 road: mu4 = 3Var^2 + kappa4 with Var EXACT;
[1.8s]    kappa4/mu4 measured -3.991908e-3 (@11), -1.986992e-5 (@13), both negative;
[1.8s]    at @17 a mere SIGN (kappa4 <= 0) would give P(S=0) <= 3Var^2/mu^4 = 3.051595e-8 outright.
[1.8s] [0 checks passed]

=== node research/natal-cap-34-wrap-precision.js joint ===

[0.0s] --- [J] cost of the 2D class-histogram joint counts ---
[0.0s] @13: N=990 K=34 prime pairs=561 mean degree=49.2
[0.0s]    TABLE: 951 non-zero cells per pair (of N=990); all pairs built in 0.0s extrapolated from 281 samples in 0.01s
[0.0s]    CONTRACTION (w = 1, O(1) lookups): WJ = 1.3198e+9 operations  [cost pass 0.00s, exact]
[0.0s]    CONTRACTION (w kept, fourth slot enumerated): WJ4 = 3.2818e+9  (mean admissible fourth slots 2.49)
[0.2s] @17: N=14850 K=120 prime pairs=7,140 mean degree=276.4
[0.2s]    TABLE: 13285 non-zero cells per pair (of N=14850); all pairs built in 5.7s extrapolated from 204 samples in 0.16s
[0.2s]    CONTRACTION (w = 1, O(1) lookups): WJ = 7.9777e+12 operations  [cost pass 0.01s, exact]
[0.2s]    CONTRACTION (w kept, fourth slot enumerated): WJ4 = 4.0689e+13  (mean admissible fourth slots 5.10)
[4.1s] @19: N=252450 K=435 prime pairs=94,395 mean degree=1553.5
[4.1s]    TABLE: 221030 non-zero cells per pair (of N=252450); all pairs built in 1477.9s extrapolated from 201 samples in 3.15s
[4.1s]    CONTRACTION (w = 1, O(1) lookups): WJ = 5.6899e+16 operations  [cost pass 0.68s, exact]
[4.1s]    CONTRACTION (w kept, fourth slot enumerated): WJ4 = 5.3882e+17  (mean admissible fourth slots 9.47)
[4.1s] --- what the exact @13 numbers say those operations would buy ---
[4.1s]    Multi exact = 44821955.4433 (6.795774e-4 of G)
[4.1s]    2-prime part = 45090019.6365 (6.836417e-4 of G); 3-prime = -268718.409425 (-4.074230e-6 of G)
[4.1s]    4-prime and up = 654.216249992 (9.919035e-9 of G)
[4.1s]    Multi with w = 1 (what a pure histogram count returns): 15975541.2041
[4.1s]    -> dropping w costs -4.373609e-4 of G = -64.36% of the layer
[4.1s] [0 checks passed]

=== node research/natal-cap-34-wrap-precision.js verify ===

[0.0s] --- [V] verification of the exact decomposition pass ---
[0.0s] eOf/cOf verified against naive distinct counts (88500 checks)
[0.0s] cap-32 checkWrapFree re-run at @7 and @11 (wrap-free counting, custody)
[0.0s] @7: T4=44.81118881118881  G=427.19999999999993  A=502.6590814814814  Lin=-7.890546e+1  Multi=3.446374e+0
[0.0s] @7: C1=-4.744223e+1 C2=-9.374815e+0 C3=-2.208841e+1  kappa-primes touched=152
[3.4s] @11: T4=88115.56637847052  G=5006679.093260853  A=5503626.674918943  Lin=-5.068604e+5  Multi=9.912859e+3
[3.4s] @11: C1=-3.390836e+5 C2=-4.063423e+4 C3=-1.271426e+5  kappa-primes touched=2814355
[23.2s] @13[120]: T4=70394.08535736395  exact-pass agrees with cap-32 on every layer
[23.2s] @13 T2 = 46186.769663306746 = cap-27's printed value (independent Theorem-5 path)
[23.2s] [88520 checks passed]

*/

// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 0. WHAT THIS BLOCK CLOSES. The header put three predictions on record and
//    the file then carried no output and no readings, so the header itself had
//    to say the predictions were ungraded and point at TODO.md. All three are
//    graded below, from the six stages run today. Two land; the third's
//    ARITHMETIC lands and its PRECONDITION does not.
//
// 1. P1 IS CONFIRMED IN ITS VERDICT AND WRONG IN BOTH OF ITS NUMBERS. P1 said
//    the -3.5e-5 would attribute to the MULTI-PRIME layer, not to C2 order-3.
//    Stage [L] gives the split as a measured budget, one layer degraded at a
//    time against the exact truth:
//      Multi (cap-32's model x CAL4 = 0.87)  -4.531943e-5 of T4   <- the bulk
//      C2   (instance engine)                +1.056084e-5
//      A    (k4 Monte Carlo, n = 2e7)        -1.597529e-9
//      C1   (instance engine)                -2.265633e-13
//      C3   (instance engine)                +6.720878e-14
//    Those sum to -3.48e-5 and the stage then rebuilds cap-32's whole instance
//    pipeline and lands on 352241335.077, REL -3.501681e-5 against the
//    certified value, reproducing cap-32's published -3.50e-5 to three digits.
//    So the answer is: the multi layer carries -4.53e-5 and C2 gives +1.06e-5
//    back, and the published -3.5e-5 is a partial cancellation of the two.
//    P1's reasoning was wrong twice in compensating directions: it assumed
//    multi/G ~ 2e-4 (measured 6.795774e-4, 3.4x larger) and a ~13% calibration
//    error (measured implied CAL4 = 0.932164 against cap-32's 0.87, a 6.7%
//    error). 3.4x larger times half the error is the same answer.
// 2. THE CALIBRATION CONSTANT IS THE WHOLE STORY AND IT IS NOW KNOWN EXACTLY.
//    cap-32 used CAL4 = 0.87. The exact truth implies 0.932164. Nothing else
//    in the multi layer is wrong: the independence model fed with exact
//    per-prime inputs returns 48083774.2789 against an exact 44821955.4433, so
//    the model's SHAPE is right to 7% and one constant carries the error.
// 3. P2 IS CONFIRMED AND WAS ALREADY THE ONE GRADED CLAIM. Float rounding is
//    not the obstruction. Stage [E] returns T4 = 352253669.87624460 against
//    cap-27's certified 352253669.8762445, REL 3.384189e-16, and stage [L]'s
//    G = A + Lin + Multi identity closes at -1.156746e-16. The gate is a
//    TRUNCATION problem end to end, exactly as predicted.
// 4. P3's ARITHMETIC IS RIGHT AND ITS PRECONDITION IS NOT MET. Stage [K]
//    returns @17 exact mu = 3245.512635440701, Var = 1062.3544031865895,
//    Chebyshev 1.008562e-4, and 3Var^2/mu^4 = 3.051595e-8. P3 said 3.05e-8 and
//    "~3000x below Chebyshev": the ratio is 3305x. But the bound only follows
//    if kappa4 <= 0 at @17, and kappa4 is MEASURED only at @11 (-1.1063,
//    -3.99e-3 of mu4) and @13 (-0.4850, -1.99e-5 of mu4). Both negative and
//    shrinking fast, which is suggestive and is not a proof at @17.
// 5. THE OTHER ROAD TO P3 IS SIX ORDERS AWAY *FOR P3's OWN TARGET*, AND [K]
//    PRICES THAT TARGET AND ONLY THAT TARGET. To get mu4 at @17 through T4
//    instead of through the kappa4 sign, [K] prints: mu4 to 100% needs
//    relT4 <= 3.055646e-8; to 10%, 3.055646e-9; to 1%, 3.055646e-10 (relT3
//    four times tighter still). cap-32's @17 T4 is +-4e-4 relative, so that is
//    six orders short of the 1% figure.
//    CORRECTED AND EXTENDED 2026-08-18 (W2), because this reading was being
//    quoted as "the @17 requirement is 3e-10" and that is not what it says.
//    (a) THE PRINTED PAIR DOUBLE-COUNTS. [K] sizes relT4 and relT3 so that EACH
//        term alone equals tol*3Var^2; meeting both gives dmu4 = 2*tol*3Var^2.
//        Carrying both legs, dmu4 = 24*T4*relT4 + |36-24mu|*T3*relT3 and with
//        relT3 = relT4/4 (cap-32's ratio) the sensitivity is 2.216326e+14 per
//        unit relT4. The honest single figure for [K]'s own 1% target is
//        relT4 <= 1.527659e-10, not 3.055646e-10.
//    (b) T3 IS NOT A FOOTNOTE. Per unit RELATIVE error T3 is 4x more damaging
//        than T4 (|36-24mu|*T3c = 4.43311e+14 against 24*T4c = 1.108044e+14),
//        and at the published bars the two legs are equal to three digits:
//        4.43218e+10 from T4 at 4e-4, 4.43311e+10 from T3 at 1e-4. Fixing T4
//        alone therefore caps the total gain at a factor of 2. README.md:101
//        and TODO.md:255 state the requirement in T4 only.
//    (c) THERE IS NO SINGLE REQUIREMENT. 3.06e-10 is the price of ONE quality
//        target (mu4 to 1%, i.e. landing on the 3.05e-8 shape reference to 1%).
//        The requirement is a ladder. Derived with mu exact from thm5, Var
//        exact, and cap-32's T3c/T4c, taking mu4_true at the 3Var^2 scale as it
//        is at @11 and @13, with relT3 = relT4/4 throughout:
//          certified P(S=0) @17     required relT4     factor from 4e-4
//          beat Chebyshev 1.0086e-4    5.047439e-5          7.9
//          1e-5  (10x Chebyshev)       4.990825e-6           80
//          1e-6  (100x)                4.853336e-7          824
//          1e-7  (1000x)               3.478442e-8        1.1e4
//          6.10e-8 (2x the reference)  1.527659e-8        2.6e4
//          3.36e-8 (reference +10%)    1.527659e-9        2.6e5
//          3.08e-8 (reference +1%)     1.527659e-10       2.6e6
//        The FIRST rung -- a beyond-Chebyshev bound at @17 at all -- is a
//        factor of 7.9, not six orders. Only the last three rungs are six
//        orders, and those are the ones the corpus quotes.
//    (d) mu3@17 AND mu4@17 ARE CURRENTLY NOISE, and cap-32 computed both and
//        printed neither. From cap-32's own T3c, T4c: mu4 = 3.396776e+9 against
//        3Var^2 = 3.385791e+6 (1003x), and mu3 = -9.686878e+5. But dmu4 at
//        (4e-4, 1e-4) is 8.865302e+10 = 26x that mu4, and dmu3 = 6*T3c*1e-4 =
//        3.416e+6 = 3.5x that mu3. Neither is distinguishable from zero, so the
//        central values carry no information. mu3 = -9.69e+5 is in fact
//        INCONSISTENT with mu4 = 3Var^2 (Cauchy-Schwarz needs |mu3| <=
//        sqrt(Var*mu4) = 5.998e+4), which is another way of saying the same
//        thing: at 4e-4 the @17 moment pair is not a moment pair yet.
// 6. THE BEST ASSEMBLY THIS FILE BUILDS MEETS THE 1e-9 GATE BY x3632, AND WHAT
//    CLOSES IT IS AN EXACT ROUTINE THAT WAS ALREADY IN THE REPOSITORY. Stage
//    [L]'s best assembly — A(shapes + k4 EXACT via `k4direct`) + C1,C3 instance
//    + C2 factorised-exact + Multi EXACT — returns T4 = 352253669.87614751,
//    REL -2.753038e-13 against the 1e-9 gate. Every layer in it is exact to
//    1e-13 or better and what is left is float noise in assembleA's
//    non-compensated O(N^3) shape sums, not mathematics. The same assembly with
//    the K4 shape estimated by Monte Carlo at n = 2e8 lands at -1.021692e-9 and
//    misses by 2%, so the single Monte-Carlo shape was the whole residual: not
//    the joint layer, not C2, not float.
//    (a) THE TWO ROUTINES COMPUTE THE SAME QUANTITY, PROVED BY ENUMERATION.
//        cap-32 ships both: `k4MC` (natal-cap-32:194-203) samples ordered
//        distinct 4-tuples and scales by C4(N); `k4direct` (natal-cap-32:280-285)
//        sums i<j<l<u exactly with Kahan. cap-32's own `small` stage already
//        exercises k4direct at @7 (N=10), @11 (N=90) and @13[120] with real @13
//        moduli. Verified 2026-08-18 before the substitution was made: at
//        N = 10, 14, 20 the MC's estimand EXHAUSTED over its own ordered-tuple
//        universe (rather than sampled) equals k4direct to 3.3e-14, and
//        assembleA(N, shapes, k4direct) reproduces AdirectT4 to 6.3e-15 at @7,
//        @11, @13[120], @13[240] and @13[500] — i.e. k4direct fills exactly the
//        slot the call site adds it into. Over 40 MC draws (5 levels x
//        {2e6,2e7} samples x 4 seeds) the mean z-score is 0.039 with sd 1.22;
//        at N = 990, 12 seeds give mean z 0.41 +- 0.24 with sd 0.84. Unbiased,
//        error bars honest. (At N = 10 the plug-in sigma is understated 2.4x —
//        a 49.6% rejection rate on a 210-quadruple population — which is a
//        small-N artifact of the ERROR BAR, not of the estimate.)
//    (b) MEASURED, not inferred: the same best assembly rebuilt with each k4,
//        everything else identical --
//          k4 EXACT (k4direct)       T4 = 352253669.87614751  REL -2.753038e-13  GATE MET
//          k4 by difference          T4 = 352253669.87618858  REL -1.587185e-13  GATE MET
//          k4 by MC n=2e8 seed 4242  T4 = 352253669.51634955  REL -1.021692e-9   not met
//    (c) THE EXACT ROUTE IS DEARER, NOT CHEAPER, AND THE x3632 IS AN ACCURACY
//        MARGIN, NOT A SPEEDUP. Measured on one core at @13, idle machine:
//        k4direct 93.5 s (three runs inside 0.8% of each other), k4MC at
//        n = 2e8 11.7 to 23.4 s over six runs (the answer is bit-identical every
//        time; the spread is core migration). So the substitution is a 4x to 8x
//        SLOWDOWN worth +75 s, and stage [L] goes from 266 s to 341 s. It buys
//        3600x in error for 28% in time, which is why it is worth making and
//        why nobody should quote it as a saving.
//    (d) k4direct IS THE MORE ACCURATE OF THE TWO EXACT ROUTES. It returns
//        60234.496774278130 against A_exact - A_shapes = 60234.5044708, a gap of
//        1.277764e-7 relative worth 1.2e-13 of G. The gap is float cancellation
//        in differencing two numbers of order 6.9e+10 to get 6e+4; k4direct is
//        Kahan over strictly non-negative terms and cancels nothing. Confirmed
//        on subsets: at @13[500], A_shapes + k4direct reproduces AdirectT4 to
//        5.6e-15 while A_direct - A_shapes disagrees with k4direct by 7.1e-9.
//        It also removes a circularity: A_exact - A_shapes needs the exact13
//        truth, and k4direct needs nothing but S.
//        Cost at @17, extrapolated from the measured 93.5 s by the n^3.92 fit
//        over five subset sizes: 44 days on one core, ~4.4 on ten (a pure N^4
//        gives 55 and 5.5). Not free, but the cheapest of the @17 exact legs.
//    (e) AND IT STILL DOES NOT HELP @17, BECAUSE THE ASSEMBLY BORROWS MORE
//        THAN k4. The same assembly takes Multi EXACT from stage [E], i.e.
//        from the C(990,4) march, and that borrow is far larger than the k4
//        one. What the scalable substitutes cost, from [E]'s own exact split:
//        2-prime joint only leaves e3+e4+ = -4.0643e-6 of G; 2-prime AND
//        3-prime leaves e4+ = 9.919035e-9 of G, still TEN TIMES the 1e-9 gate.
//        So a scalable pipeline has to be exact through FOUR-prime joint terms
//        to meet the gate at @13, and stage [J] prices only the 2-prime
//        contraction (WJ4 = 3.2818e+9 at @13, 4.0689e+13 at @17). Nobody has
//        priced e3 or e4 at any level. Conclusion: the k4 Monte Carlo was the
//        last obstruction of THIS assembly, not the last obstruction of any
//        assembly that could be run at @17.
// 7. THE INSTANCE ENGINE AND THE BLOCK ENGINE ARE NOT THE SAME QUALITY OF
//    OBJECT, BY FOUR TO ELEVEN ORDERS. Per-layer error as a relative error on
//    T4: C1 instance -2.27e-13 vs block -1.796335e-4; C3 instance +6.72e-14 vs
//    block -1.229796e-4; C2 instance +1.056084e-5 vs block +2.552517e-5. The
//    instance engine is EXACT on C1 and C3 to float noise. Anyone quoting a
//    cap-32 layer must say which engine produced it.
// 8. THE FACTORISED C2 IS EXACT, AND THE TERM cap-32 DROPS IS 25% OF THE
//    LAYER. Stage [C2]: factorised exact = -184829668.852314 against truth
//    -184829668.852342, error 4.324244e-16 of G, validated first at @7, @11
//    and @13[120] to 1e-14 or better. Drop the s_kl term and it becomes
//    -139150881.841113, an error of 6.925684e-4 of G — the dropped piece is
//    -45,678,787, which is 24.7% of the exact C2 layer and 25 times the whole
//    published -3.5e-5. Cost: 63.5 s plus 69.3 s for the V4 exclusion, against
//    5.6 s without s_kl. Exactness in C2 costs a factor of 24 in time.
// 9. THE JOINT ROAD DIES BETWEEN @17 AND @19, AND [J] SAYS WHERE. Exact
//    operation counts, not estimates: WJ (pair weight dropped, O(1) lookups)
//    = 1.3198e+9 at @13, 7.9777e+12 at @17, 5.6899e+16 at @19; WJ4 (pair
//    weight kept, fourth slot enumerated) = 3.2818e+9, 4.0689e+13, 5.3882e+17.
//    Building the tables alone at @19 is 1391.5 s extrapolated from 201
//    samples. And the cheap form is refuted by the exact numbers in the same
//    stage: setting w = 1 turns Multi's 44821955.4433 into 15975541.2041, an
//    error of -4.373609e-4 of G, i.e. -64.36% of the layer. The pair weight
//    cannot be dropped, so WJ4 is the real column, and 5.4e17 operations at
//    @19 is dead.
// 10. THE MULTI LAYER IS A TWO-PRIME OBJECT TO FOUR DIGITS. Exact:
//    Multi = 44821955.4433291, 2-prime part 45090019.6365043, 3-prime part
//    -268718.409425233, 4-prime and up 654.216249991616. The 3-prime term is
//    -0.6% of the layer and the 4-and-up term is 1.5e-5 of it. A 2-prime-only
//    joint computation would be right to 0.6% of a term that is itself
//    6.8e-4 of G, i.e. 4e-6 of G.
//    CORRECTED 2026-08-18 (W2). This reading used to end "— comfortably inside
//    the 1e-9 gate's needs only if the pair weight is carried". 4e-6 of G is
//    not inside a 1e-9 gate; it is four thousand times outside it. The pair
//    weight is indeed mandatory (reading 9), but carrying it does not buy the
//    gate. See reading 6(b) for the corrected ladder: 2-prime only leaves
//    4.0643e-6, 2-prime plus 3-prime leaves 9.919035e-9, and only exactness
//    through four-prime terms reaches 1e-9.
// 11. COST, MEASURED TODAY, AGAINST WHAT THE CORPUS BELIEVED. Wave 5 priced
//    this file at "hours". Measured on 10 cores: exact13 876.1 s (14.6 min,
//    the whole C(990,4) = 39,782,707,965-quadruple march); layers 348.2 s;
//    c2 265.8 s; verify 17.9 s; kurt 2.6 s; joint 3.8 s. Every stage in the
//    file, end to end, is about 25 minutes. The archived exact13 log reads
//    1857.0 s because that run shared the machine with the @41 march. The
//    "hours" price was wrong by a factor of at least four.
// 12. WHAT REMAINS OPEN. Stage 'at17' does not exist (see the PLAN vs CODE
//    note in the header), and the @13 gate that was supposed to trigger it is
//    now MET at -2.753038e-13 (reading 6). It should not trigger [17] anyway:
//    the assembly that meets it contains the march's Multi, so closing it left
//    @17 exactly where it was. The kappa4-sign road is the one to write, and it
//    is unattempted.
// ---------------------------------------------------------------------------
// ADDED 2026-08-18 (W2). Readings 13 and 14 are the two conclusions the six
// stages support that the first twelve did not draw.
// ---------------------------------------------------------------------------
// 13. CAL4 IS NOT A CONSTANT AND 0.932164 SHOULD NOT BE HARDCODED EITHER.
//    cap-32:724-727 adopts CAL4 = 0.87 "with +-0.05 uncertainty carried in the
//    error budget", extrapolated from its stage `cal` at subset sizes
//    N = 100/140/180/240. Reproduced today by two independent codes (cap-32's
//    BsemiDirect route and this file's exactPass), and extended:
//      N       100      140      180      240      320      400      500      990
//      CAL4  0.750232 0.804732 0.856591 0.873041 0.892792 0.900349 0.909235 0.932164
//    Monotone, no plateau, and the true endpoint 0.932164 sits OUTSIDE
//    cap-32's own +-0.05 band (upper edge 0.92). So 0.87 is wrong at @13 and
//    wrong in the direction its own drift predicted.
//    THE DRIFT IS IN N, NOT IN THE LEVEL. Implied CAL4 at FIXED subset size
//    across levels (BsemiDirect, today):
//      n=100:  @13 0.750232  @17 0.772365  @19 0.857381
//      n=140:  @13 0.804732  @17 0.819008  @19 0.837051
//      n=180:  @13 0.856591  @17 0.836656  @19 0.860460
//      full:   @7 (N=10) 1.605830   @11 (N=90) 0.786011
//    By n = 180 the three levels agree to +-0.012 while the drift with n over
//    the same range is 0.106. So CAL4 is a function of the SLOT COUNT, and
//    1 - CAL4 = k/sqrt(N) fits with k = 1.9943 (mean over N >= 180; spread
//    1.918..2.134, and the same k predicts 0.8514 at n = 180 against measured
//    0.837/0.857/0.860 at three different levels). Extrapolated by that fit:
//    CAL4 ~ 0.984 at @17 (N = 14850) and ~0.996 at @19 (N = 252450). Treat the
//    fit as a one-parameter extrapolation from one level's subsets, not as a
//    law: k is still drifting upward over the last three points.
//    But 0.932164 is not "the" value either, for three reasons:
//    (a) it is a FIT AT ONE LEVEL AND ONE N. The same fit at N = 100 gives
//        0.750, and the sqrt(N) extrapolation above puts @17 near 0.984.
//    (b) IT CONFLATES TWO DIFFERENT CORRECTIONS. The pure 2-prime correlation
//        defect is MU2/model = 0.937740; the fitted 0.932164 also absorbs the
//        3-prime term (e3/MU = -0.5995% at @13, and growing with N: -0.336% at
//        N=100, -0.542% at N=400). Transplanting 0.932164 to @17 transplants
//        @13's 3-prime term with it.
//    (c) IT IS NOT THE BINDING ERROR ANYWHERE. At @13, block mode, the layer
//        budget is C1 -1.796335e-4, C3 -1.229796e-4, C2 +2.552517e-5, Multi
//        -4.531943e-5: CAL4 is 14% of the total and the block engine's C1+C3
//        are 94%. At @17, moving CAL4 from 0.87 to anywhere in [0.932, 1.0]
//        moves T4 by +1.586e-5 to +3.317e-5 relative -- 4% to 8% of the
//        published +-4e-4 bar (at the fitted 0.984, 2.901e-5 = 7.3%). So the
//        drift IS worse at @17 than at @13, as suspected, and it is still not
//        the binding term at either level.
//    THE FIX IS NOT A BETTER CONSTANT. Stage [J] already identifies it: compute
//    the 2-prime joint layer exactly and delete the constant. At @13 that costs
//    WJ4 = 3.2818e+9 operations and leaves 4.0643e-6 of G; at @17, 4.0689e+13
//    operations and (extrapolating the 3-prime share, NOT measured) order
//    1e-6 to 3e-6 of G.
// 14. THE ROUTING: THE @13 GATE AND THE @17 RUNG ARE LARGELY INDEPENDENT.
//    Costed here rather than assumed. What the @13-gate-meeting assembly is
//    made of, and what each piece costs at @17:
//      Multi EXACT (from stage [E], the C(990,4) march): C(14850,4) =
//        2.025e+15 quadruples against @13's 3.978e+10 at 1048 s on ten cores
//        -> 513 DAYS on ten cores. Also structurally impossible in this code:
//        pairMasks asserts K <= 64 and @17 has K = 120. DEAD.
//      C1, C3 exact (instance engine): counted, not estimated -- V4 instances
//        1.7588e+9 at @13 against 6.0653e+13 at @17, and the useTP leg
//        (V3 x N) 3.1794e+10 against 1.3559e+15. Against @13's measured 126 s
//        that is order a week on ten cores, plus a 1.76 GB dense Pmatrix and
//        1.76 GB for S. EXPENSIVE, NOT DEAD.
//      C2 factorised exact: the O(N) leg scales 4.396e+3x (1.5 N^3 SUM 1/q),
//        so ~162 h from @13's 132.8 s, and the O(nnz) leg scales worse.
//        EXPENSIVE, NOT DEAD.
//      k4 exact (k4direct): ~4.4 days on ten cores (reading 6(d)). CHEAPEST,
//        and the only leg of the four already in the shipped assembly.
//    So the one layer that gets @13 to 1e-9 is the one that cannot exist at
//    @17, and the @13 gate certifies nothing about @17. Conversely the @17
//    rung does not need 1e-9: reading 5(c) prices the first beyond-Chebyshev
//    rung at relT4 <= 5.047439e-5, a factor of 7.9, and 94% of the @13
//    BLOCK-MODE budget -- which is where the @17 +-4e-4 comes from, it is not
//    an independent @17 measurement -- is the block engine's C1 and C3, exactly
//    the layers the instance engine already fixes at @13. THE @13 WORK IS
//    RELEVANT TO @17, BUT THROUGH THE ENGINE IT VALIDATES, NOT THROUGH THE GATE
//    IT MEETS, AND AT A TOLERANCE FIVE ORDERS LOOSER THAN THE ONE ON RECORD.
//    (Units warning: that 94% is a @13 share carried to @17 by the same
//    assumption that carries the +-4e-4. Nobody has measured the block engine's
//    layer split at @17.)
//    And the x3000 win is not on the T4 road at any price: it needs mu4 to
//    land on 3Var^2, i.e. kappa4@17 small, which is a statement about the
//    truth and not about precision. kappa4 = mu4 - 3Var^2 IS THE FOURTH
//    CUMULANT (the word appears nowhere in this corpus, checked by grep over
//    research/ and paper/), and a cumulant is exactly the object in which the
//    7-order cancellation that defeats the T4 road is done analytically rather
//    than numerically. That is where the unwritten stage [17] should go. Not
//    verified here: whether the T-layer decomposition A + Lin + Multi makes
//    kappa4 computable without T4 at full precision. Named as the direction,
//    not claimed as a result.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). Every
// figure in the readings above that the OUTPUT block does not contain
// verbatim, and what it is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value in
// brackets, and the printed one is the one to quote):
//   -3.5e-5 [-3.501681e-5, and it is also cap-32's published figure, reading 1]
//   -4.53e-5 [-4.531943e-5]      +1.06e-5 [+1.056084e-5]
//   3.05e-8 [3.051595e-8]        1.0086e-4 [1.008562e-4]
//   -3.99e-3 [-3.991908e-3]      -1.99e-5 [-1.986992e-5]
//   -2.27e-13 [-2.265633e-13]    +6.72e-14 [+6.720878e-14]
//   6.8e-4 [6.795774e-4]         5.4e17 [WJ4 = 5.3882e+17]
//   3.978e+10 [C(990,4) = 39,782,707,965]
//   6.9e+10 [A = 68943985960.279144, stage [E]]
//   3.06e-10 [3.055646e-10, and see reading 5(a): the printed pair
//     double-counts, so 1.527659e-10 is the honest single figure]
//
// IN-CODE constants, above the banner, where the code names their owner:
//   T4c = 4616850623332.1 and T3c = 5693984348.13 are line 596, declared there
//   as "cap-32's @17 values, +-4e-4/1e-4" — i.e. BORROWED from
//   natal-cap-32-wrap-identity.js and carried as literals, not printed here.
//   Every figure in readings 5(a), 5(b), 5(c) and 5(d) is arithmetic over
//   those two literals plus [K]'s printed mu and Var: 2.216326e+14,
//   1.527659e-10, 4.43311e+14, 1.108044e+14, 4.43218e+10, 4.43311e+10, the
//   whole required-relT4 ladder (5.047439e-5, 4.990825e-6, 4.853336e-7,
//   3.478442e-8, 1.527659e-8, 1.527659e-9, 1.527659e-10 and their factors),
//   mu4 = 3.396776e+9, 3Var^2 = 3.385791e+6, mu3 = -9.686878e+5,
//   dmu4 = 8.865302e+10, dmu3 = 3.416e+6, sqrt(Var*mu4) = 5.998e+4.
//   DERIVED IN THE READING, not printed. The inputs are printed or are line
//   596; the results are not, and a re-run of the six stages will not show
//   them.
//
// DERIVED IN THE READING from printed values, elsewhere: -3.48e-5 (the sum of
//   the five printed layer terms of reading 1), 3305x (the printed
//   1.008562e-4 over the printed 3.051595e-8), 24.7% and the -45,678,787 of
//   reading 8, the 1.5e-5 and 4e-6 of reading 10, the 513 days and ~4.4 days
//   and ~162 h extrapolations of reading 14.
//
// [UNTRACED — verify before quoting] — real measurements from the 2026-08-18
// W2 pass whose invocations were NOT pasted into the OUTPUT region, so no
// re-run of this file reproduces them and no other script's embedded OUTPUT
// carries them (checked against every embedded OUTPUT in research/):
//   reading 6(a): the exhaustive-vs-k4direct agreements 3.3e-14, 6.3e-15,
//     5.6e-15, 7.1e-9, the 40-draw z-score study (mean 0.039, sd 1.22; at
//     N = 990 mean 0.41 +- 0.24, sd 0.84; the 49.6% rejection rate).
//   reading 6(b): the three-assembly table's second and third rows —
//     352253669.87618858 / -1.587185e-13 (k4 by difference) and
//     352253669.51634955 / -1.021692e-9 (k4 by MC n = 2e8 seed 4242). Only
//     the first row, 352253669.87614751 / -2.753038e-13, is in [L] above.
//     PARTLY RECOVERED 2026-08-20 (mismatch adjudication #31): all THREE
//     relative-error entries are reproducible from the T4 values printed
//     beside them against natal-cap-27-t4-at13.js's certified
//     T4 = 352253669.87624449, which that file's embedded OUTPUT does print.
//     Recomputed here: (352253669.87614751 − T4)/T4 = −2.753038e-13,
//     (352253669.87618858 − T4)/T4 = −1.587185e-13, and
//     (352253669.51634955 − T4)/T4 = −1.021692e-9, all three to seven
//     figures. So the COLUMN is checkable; what remains untraced is the two
//     assembly values themselves, i.e. that the difference route and the
//     n = 2e8 MC really returned those digits.
//   reading 6(e): -4.0643e-6 and 9.919035e-9.
//   reading 13: the whole CAL4-vs-N table (0.750232, 0.804732, 0.856591,
//     0.873041, 0.892792, 0.900349, 0.909235 — the eighth entry, 0.932164, IS
//     printed by [L]), the fixed-n cross-level table (0.772365, 0.857381,
//     0.819008, 0.837051, 0.836656, 0.860460, 1.605830, 0.786011), the
//     k = 1.9943 fit and its 0.8514 prediction, MU2/model = 0.937740, the
//     e3/MU shares -0.5995%, -0.336%, -0.542%, and the CAL4-sensitivity
//     figures 1.586e-5, 3.317e-5, 2.901e-5.
//   reading 14: CORRECTED 2026-08-20 (mismatch adjudication #31) —
//     C(14850,4) read 2.026e+15 and now reads 2.025e+15. The binomial is
//     2,025,438,619,881,600 = 2.0254e15, recomputed here in BigInt; it is a
//     closed form, not a measurement, so it never belonged on this list.
//     Still untraced in the same reading: the V4/useTP instance counts
//     1.7588e+9, 6.0653e+13, 3.1794e+10, 1.3559e+15, and the 4.396e+3x C2
//     scaling.
//   These are not suspected wrong — the file's OUTPUT header is scrupulous
//   about what it did and did not run — but they are the one class here that
//   a reader cannot check in place, and they are the reason this file sits at
//   the top of the `readings-not-traceable` ranking.
//   ADJUDICATED 2026-08-20 (mismatch #31): this block is LEFT FLAGGED. Two
//   items came off it on inspection — reading 14's binomial, which is a closed
//   form and was wrong in the fourth digit, and reading 6(b)'s relative-error
//   column, which recomputes exactly against cap-27's printed T4. The rest is
//   ~40 figures from a W2 pass at @17 and @19 whose invocations were never
//   pasted; reproducing them means re-running that pass, which is hours of
//   multi-core compute and not something an adjudication can do in passing. It
//   is on the follow-up list. Until then this flag is the custody: quote
//   nothing from readings 6(a), 6(e), 13 or the instance counts of 14 without
//   re-running.
// ---------------------------------------------------------------------------
