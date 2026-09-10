// ============================================================================
// TWO-CLASS LOWER BOUNDS: how large can G2(x#) be FORCED?
// (2026-08-17. Search repaired 2026-08-18. Companion to
//  research/two-class-lower-bounds.md.)
// ============================================================================
//
// *** CORRECTION, 2026-08-18. THE Y2 LADDER THIS SCRIPT PRINTED ON 2026-08-17
// *** WAS UNDER-SEARCHED AT EVERY LEVEL AND ALL SIXTEEN VALUES ARE SUPERSEDED.
// *** Three independent defects, all in the SEARCH, none in the greedy itself:
// ***
// *** (1) `maxM` binary-searched on `greedy covers [1,m]` as though feasibility
// ***     were monotone in m. It is not. Enlarging the target changes every
// ***     gain and hence the whole choice sequence, so the greedy can fail at m
// ***     and succeed at m+1. Measured below: at x = 31 the published 233 is
// ***     exactly the length of the unbroken feasible prefix, while the same
// ***     deterministic greedy covers 305; there are 34 infeasible values of m
// ***     below its real reach and the bisection cannot see past the first one.
// *** (2) Tie-breaking was deterministic (two fixed rules). Seeded randomised
// ***     restarts recover the rest.
// *** (3) The bisection seeded each level from the previous level's answer, so
// ***     the ladder depended on the order it was run in and did not reproduce.
// ***     The seed is now a closed form in x alone.
// ***
// *** The old code is KEPT below, as `oldMaxM`, and §1b runs it, because a
// *** pasted output is a custody record: the superseded numbers have to be
// *** reproducible from this file or the correction cannot be checked.
// ============================================================================
//
// THE OBJECT, and why a construction is even possible.
//
// G2(x#) is the largest gap between consecutive twin slots of T_x. Write the
// gap as a covered interval: positions s+1 .. s+G-1 are all non-twin-slots,
// i.e. for each of them either it or it+2 shares a factor with x#. Shifting the
// origin to s, position j is killed by prime p exactly when j = a_p or
// j = a_p - 2 (mod p), where a_p = -s mod p. By CRT the vector (a_p)_{p<=x}
// ranges over ALL of prod Z/pZ as s ranges over Z/x#. So
//
//    G2(x#) - 1  =  max length of [1,m] coverable by choosing, for each prime
//                   p <= x, the residue pair {a_p, a_p - 2} mod p.
//
// G2 IS an adversarial covering problem. The only constraint is that the two
// classes sit at distance exactly 2. (This CRT collapse is already recorded in
// research/attack2-rankin2d.js under the name PAIRED; it is his, not new here.)
//
// That identity is also what makes the repaired search TERMINATE: any m the
// greedy fully covers exhibits a legal (a_p), so m <= G2(x#) - 1 < infinity.
// The search below never assumes monotonicity anywhere; it relies only on this
// finite ceiling.
//
// Consequences used below:
//   Y1(x)  <=  G2(x#) - 1  <=  h2(x#)/6-ish
//   where Y1(x) = Jacobsthal g(x#) - 1 is the one-class problem (add the second
//   class to any one-class covering) and h2 is Ziller-Morack's free-choice
//   paired Jacobsthal, OEIS A288815.
//
// WHAT THIS SCRIPT DOES
//   1. custody: brute-force G2(x#) for x <= 17 against the repo ladder; the
//      SUPERSEDED 2026-08-17 ladder reproduced from the old bisecting search;
//      the repaired search scored against ALL THIRTEEN exact G2 terms (the
//      pre-registered oracle test); the budget-scaling measurement that says
//      what that test does and does not license; free-choice greedy against
//      Resta's ILP optima A072753.
//   2. the certificate ladder: repaired search producing an explicit choice of
//      (a_p) covering [1,m], INDEPENDENTLY re-verified.
//   3. the matched one-class control, whose true exponent is 1, run through the
//      identical (repaired) estimator.
//   4. the Poisson-extremes law max ~ c * (exact mean gap) * ln(#gaps), tested
//      on 46 exact one-class terms and 17 exact two-class terms.
//
// RUN
//   node research/two-class-lower-bounds.js                            S1 + ladder to x = 229
//   node research/two-class-lower-bounds.js --full                     ladder to x = 4001
//   node research/two-class-lower-bounds.js --ladder-only --levels=5003   one rung
// Measured on a 10-core machine under a load average of 250-300, so upper
// bounds: S1 about 10 min; the sixteen ladder levels 235 min in total, of which
// x = 4001 alone is 71; the x = 5003 rung 94 min on its own. Every level is
// independent of every other, so --levels shards the ladder across processes
// and the run costs the longest rung rather than the sum.
// Everything random here is seeded from SEED_BASE and reproduces exactly.
// ============================================================================

const FULL = process.argv.includes('--full');
const SEED_BASE = 20260818;
// Removing the level chaining made every ladder level independent of every
// other, so the ladder can be sharded across processes and stitched, and each
// row still reproduces on its own. --levels picks the rows, --ladder-only skips
// §1 and §4. Neither changes any number; that is the point of them.
const LADDER_ONLY = process.argv.includes('--ladder-only');
const LEVARG = (process.argv.find(a=>a.startsWith('--levels='))||'').slice(9);

function primesTo(N){const s=new Uint8Array(N+1),P=[];for(let i=2;i<=N;i++){if(!s[i]){P.push(i);for(let j=i*i;j<=N;j+=i)s[j]=1}}return P}
const ALLP = primesTo(6100);   // headroom so --levels can extend past 4001

// ---------------------------------------------------------------- known data
const A048670=[2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,190,200,216,234,258,264,282,300,312,330,354,378,388,414,432,450,476,492,510,538,550,574,600,616,642,660,686,718,742,762]; // Jacobsthal g(p_n#), n=1..50
const A288815=[2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,1902,2190,2460,2622];   // Ziller-Morack h2(p_n#), n=1..21
const A072753=[2,4,10,24,31,42,60,74,94,117,148,173,213,236,275,316,364,409,436];                        // free 2-class, primes 5..p_n, n=3..21
// this repo's exact ladder, all THIRTEEN terms. x=41 added 2026-08-18
// (r = 3,784,200,788,231, survivors = D_41 = 8,499,244,879,125).
// 43:618 added 2026-08-18. Measured twice on disjoint natal masks (wheel 19 and
// wheel 23), agreeing on value, multiplicity 8, least position
// 830,330,079,152,051 and survivor count = D_43 exactly. The lower half needs
// no enumeration: that position is a slot mod 43# whose next slot is 618 above,
// by trial division. See history/staging/phase1-T2b-exact-ladder.md.
const G2EXACT={2:2,3:6,5:12,7:30,11:42,13:66,17:108,19:150,23:204,29:258,31:348,37:528,41:546,43:618,
// x = 47..79 are NOT ours. They are OEIS A144311 a(15)-a(22) plus one, added
// 2026-08-18: a(8)-a(16) Max Alekseyev 2009, a(17)-a(22) Jinyuan Wang 2024.
// Exhaustive enumeration at x = 79 would cost 2.8e10 years at our measured 43#
// rate, so these can never be reproduced by the method that produced ours.
// They are kept in a SEPARATE list below so no scoring silently mixes the two.
               47:708,53:870,59:966,61:1080,67:1284,71:1398,73:1530,79:1710};
const EXACTX=[2,3,5,7,11,13,17,19,23,29,31,37,41,43];
// Published-only levels. The pre-registered oracle rule was written when EXACTX
// ended at 41 and must keep being scored on terms we measured ourselves; these
// are reported as a separate fidelity table, never folded into that verdict.
const PUBX=[47,53,59,61,67,71,73,79];
// the SUPERSEDED 2026-08-17 ladder, kept so §1b can check it still reproduces
const OLDY2={37:355,73:1211,113:2501,167:4210,229:6748,313:10469,421:16453,571:25469,
             773:39277,1009:56213,1301:81986,1699:118367,2003:144712,2503:191927,3001:245270,4001:356711};

// ---------------------------------------------------------------- seeded PRNG
// mulberry32. Deterministic, and every stream below is derived from SEED_BASE,
// so a pasted output is reproducible. The repo has twice shipped a script
// drawing from an unseeded Math.random(); there is none here.
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

// ------------------------------------------- greedy, difference-2 form
// opt = {tieLarge} deterministic, or {topK, rnd} randomised: within a prime the
// argmax is drawn uniformly among ties, and the round's move is drawn uniformly
// among the topK (prime, pair) candidates by gain. With opt={} this is
// bit-identical to the 2026-08-17 routine (checked, 4288 calls, 0 differences).
// Every call also returns `prefix`, the length of the covered run starting at 1,
// which is itself a certificate: a failure at m still certifies [1, prefix].
function greedyD2(m, plist, opt){
  opt=opt||{};
  const tieLarge=opt.tieLarge||false, rnd=opt.rnd||null, topK=opt.topK||1;
  const np=plist.length;
  const cnt=new Array(np);
  for(let i=0;i<np;i++){const p=plist[i],c=new Int32Array(p);
    c[0]=Math.floor(m/p);
    for(let r=1;r<p;r++) c[r]=(m>=r)?Math.floor((m-r)/p)+1:0;
    cnt[i]=c}
  const alive=new Uint8Array(np).fill(1);
  const cov=new Uint8Array(m+2); let nUncov=m; const chosen=[];
  const cg=new Int32Array(np), ci=new Int32Array(np), ca=new Int32Array(np);
  const newly=new Int32Array(m+2);
  for(let round=0;round<np&&nUncov>0;round++){
    let nc=0;
    for(let i=0;i<np;i++){
      if(!alive[i])continue;
      const p=plist[i],c=cnt[i]; let bg=-1,ba=-1,ties=0;
      if(p===2){ if(c[1]>c[0]){bg=c[1];ba=1} else {bg=c[0];ba=0} }
      else for(let a=0;a<p;a++){let b=a-2; if(b<0)b+=p; const g=c[a]+c[b];
        if(g>bg){bg=g;ba=a;ties=1} else if(g===bg){ties++; if(rnd&&rnd()*ties<1)ba=a}}
      cg[nc]=bg;ci[nc]=i;ca[nc]=ba;nc++;
    }
    if(nc===0)break;
    let pick;
    if(rnd&&topK>1){
      const idx=new Array(nc);for(let j=0;j<nc;j++)idx[j]=j;
      for(let j=nc-1;j>0;j--){const k=(rnd()*(j+1))|0;const t=idx[j];idx[j]=idx[k];idx[k]=t}
      idx.sort((u,v)=>cg[v]-cg[u]);
      pick=idx[(rnd()*Math.min(topK,nc))|0];
    } else { let bi=0;
      for(let j=1;j<nc;j++) if(cg[j]>cg[bi]||(cg[j]===cg[bi]&&tieLarge&&ci[j]>ci[bi])) bi=j;
      pick=bi }
    const bG=cg[pick],bI=ci[pick],bA=ca[pick];
    if(bG<=0)break;
    const p=plist[bI],b=((bA-2)%p+p)%p, cls=(b===bA)?[bA]:[bA,b];
    let nn=0;
    for(const r of cls) for(let n=(r===0?p:r);n<=m;n+=p){ if(!cov[n]){cov[n]=1;newly[nn++]=n} }
    nUncov-=nn; alive[bI]=0; chosen.push([p,bA]);
    if(nUncov>0) for(let j=0;j<np;j++){ if(!alive[j])continue; const q=plist[j],c=cnt[j];
      for(let t=0;t<nn;t++) c[newly[t]%q]-- }
  }
  let pre=0; while(pre<m&&cov[pre+1])pre++;
  return {ok:nUncov===0,uncov:nUncov,chosen,prefix:pre};
}
// generic k-classes-per-prime greedy (k=1 is the one-class control)
function greedyK(m, plist, k, opt){
  opt=opt||{};
  const tieLarge=opt.tieLarge||false, rnd=opt.rnd||null, topK=opt.topK||1;
  const np=plist.length;
  const cnt=new Array(np);
  for(let i=0;i<np;i++){const p=plist[i],c=new Int32Array(p);
    c[0]=Math.floor(m/p); for(let r=1;r<p;r++)c[r]=(m>=r)?Math.floor((m-r)/p)+1:0; cnt[i]=c}
  const alive=new Uint8Array(np).fill(1);
  const cov=new Uint8Array(m+2); let nUncov=m; const chosen=[];
  const cg=new Int32Array(np), ci=new Int32Array(np);
  const newly=new Int32Array(m+2);
  for(let round=0;round<np&&nUncov>0;round++){
    let nc=0;
    for(let i=0;i<np;i++){
      if(!alive[i])continue;
      const p=plist[i],c=cnt[i]; const top=[];
      for(let r=0;r<p;r++){const v=c[r];
        if(top.length<k){top.push(v);top.sort((a,b)=>a-b)} else if(v>top[0]){top[0]=v;top.sort((a,b)=>a-b)}}
      let g=0;for(const v of top)g+=v;
      cg[nc]=g;ci[nc]=i;nc++;
    }
    if(nc===0)break;
    let pick;
    if(rnd&&topK>1){
      const idx=new Array(nc);for(let j=0;j<nc;j++)idx[j]=j;
      for(let j=nc-1;j>0;j--){const kk=(rnd()*(j+1))|0;const t=idx[j];idx[j]=idx[kk];idx[kk]=t}
      idx.sort((u,v)=>cg[v]-cg[u]);
      pick=idx[(rnd()*Math.min(topK,nc))|0];
    } else { let bi=0;
      for(let j=1;j<nc;j++) if(cg[j]>cg[bi]||(cg[j]===cg[bi]&&tieLarge&&ci[j]>ci[bi])) bi=j;
      pick=bi }
    const bG=cg[pick],bI=ci[pick];
    if(bG<=0)break;
    const p=plist[bI],c=cnt[bI];
    const idx2=[];for(let r=0;r<p;r++)idx2.push(r);
    if(rnd) for(let j=idx2.length-1;j>0;j--){const kk=(rnd()*(j+1))|0;const t=idx2[j];idx2[j]=idx2[kk];idx2[kk]=t}
    idx2.sort((a,b)=>c[b]-c[a]);
    const sel=idx2.slice(0,Math.min(k,p));
    let nn=0;
    for(const r of sel) for(let n=(r===0?p:r);n<=m;n+=p){ if(!cov[n]){cov[n]=1;newly[nn++]=n} }
    nUncov-=nn; alive[bI]=0; chosen.push([p,sel.slice()]);
    if(nUncov>0) for(let j=0;j<np;j++){ if(!alive[j])continue; const q=plist[j],cc=cnt[j];
      for(let t=0;t<nn;t++) cc[newly[t]%q]-- }
  }
  let pre=0; while(pre<m&&cov[pre+1])pre++;
  return {ok:nUncov===0,uncov:nUncov,chosen,prefix:pre};
}
// INDEPENDENT verifiers: replay the emitted (p, a_p) from scratch, and reject a
// prime used twice, a prime outside the allowed list, or a class out of range.
function verifyD2(m, chosen, plist){
  const hit=new Uint8Array(m+2), used=new Set(), allow=new Set(plist||[]);
  for(const [p,a] of chosen){
    if(used.has(p)) return {bad:-1,err:'prime '+p+' used twice'};
    if(plist&&!allow.has(p)) return {bad:-1,err:'prime '+p+' not in the allowed list'};
    if(!(a>=0&&a<p)) return {bad:-1,err:'class '+a+' out of range mod '+p};
    used.add(p); const b=((a-2)%p+p)%p;
    for(const r of new Set([a,b])) for(let n=(r===0?p:r);n<=m;n+=p) hit[n]=1;
  }
  let bad=0; for(let n=1;n<=m;n++) if(!hit[n]) bad++;
  return {bad,err:null};
}
function verifyK(m, chosen, k, plist){
  const hit=new Uint8Array(m+2), used=new Set(), allow=new Set(plist||[]);
  for(const [p,sel] of chosen){
    if(used.has(p)) return {bad:-1,err:'prime '+p+' used twice'};
    if(plist&&!allow.has(p)) return {bad:-1,err:'prime '+p+' not in the allowed list'};
    if(sel.length>k) return {bad:-1,err:'prime '+p+' uses '+sel.length+' classes > '+k};
    used.add(p);
    for(const r of new Set(sel)) for(let n=(r===0?p:r);n<=m;n+=p) hit[n]=1;
  }
  let bad=0; for(let n=1;n<=m;n++) if(!hit[n]) bad++;
  return {bad,err:null};
}

// ============================================================================
// THE REPAIRED SEARCH. Read this before quoting any Y2 below.
// ============================================================================
// The object wanted is the LARGEST m the greedy family can cover, and
// feasibility in m is NOT monotone, so neither a bisection nor an upward scan
// that halts at the first failure is correct. Both are the same bug. Three
// phases, none of which assumes monotonicity:
//
//   A  ANCHOR AND DOUBLE. Find one feasible target, then multiply by 1.6 until
//      a target fails. TERMINATES because a full cover of [1,t] exhibits a
//      legal (a_p), hence t <= G2(x#) - 1 < infinity, and t grows geometrically.
//   B  SCAN AND REFINE. Between the largest feasible lo and the failing hi, try
//      EVERY one of NG interior grid points. The scan does not stop at a
//      failure: lo moves to the LARGEST feasible point seen, so a hole is
//      stepped over, and hi moves to the smallest failure above that. Repeat
//      until hi - lo <= W. TERMINATES because hi - lo shrinks by a factor of at
//      least NG+1 per pass.
//   C  WINDOW POLISH. Scan m = best+1 .. best+W exhaustively. A failure does not
//      stop the scan. Any progress restarts the window. TERMINATES because best
//      strictly increases and best <= G2(x#) - 1.
//
// WHAT IS AND IS NOT PROVED. The result is exhaustive over (best, best+W] and
// best-effort below, so it is the exact maximum of the searched family PROVIDED
// no feasible target sits more than W above it. W is calibrated in §1c-2: at the
// budget used for the exact levels the longest run of consecutive infeasible m
// below the maximum measured 7, and W there is 200. At every level the reported
// number is a CERTIFIED LOWER BOUND on G2(x#) - 1 whatever the search missed,
// which is the only direction this quantity is ever used in.
function mkVariants(R, seedBase){
  const V=[()=>({tieLarge:false}),()=>({tieLarge:true})];
  const KS=[4,2,3,5];
  for(let s=0;s<R;s++){const K=KS[s%KS.length];
    const seed=(seedBase^Math.imul(s+1,2654435761))>>>0;
    V.push(()=>({topK:K,rnd:mulberry32(seed)}))}
  return V;
}
// MAXCALLS is a cap on greedy invocations, not on seconds: a wall-clock cutoff
// would make the output irreproducible, which is the defect this whole file is
// being repaired for. Hitting the cap can only make the answer smaller, and the
// answer is a lower bound, so the cap is safe in direction. It is printed.
function searchMax(runner, plist, V, opt){
  const W=Math.max(0,opt.window|0), NG=Math.max(2,opt.grid|0), start=Math.max(4,opt.start|0);
  const MAXCALLS=opt.maxCalls||Infinity;
  let calls=0, best=0, bestChosen=null, capped=false;
  const attempt=(m)=>{
    if(m<1)return null;
    if(calls>=MAXCALLS){capped=true;return null}
    for(const f of V){ calls++; const r=runner(m,plist,f());
      if(r.ok) return r.chosen;
      if(r.prefix>best){best=r.prefix;bestChosen=r.chosen} }     // failures certify a prefix
    return null;
  };
  const take=(m,ch)=>{ if(m>best){best=m;bestChosen=ch} };
  // A
  let t=start, anchored=false;
  while(t>=1){ const c=attempt(t); if(c){take(t,c);anchored=true;break} t=Math.floor(t/1.6) }
  if(!anchored) for(let m=1;;m++){ const c=attempt(m); if(!c)break; take(m,c) }
  let lo=best, hi=Math.max(best+2,Math.floor(best*1.6)+2);
  for(;;){ const c=attempt(hi); if(!c)break; lo=hi; take(hi,c); hi=Math.floor(hi*1.6)+2 }
  if(best>lo)lo=best;
  // B
  let refines=0;
  while(hi-lo>Math.max(W,1)){
    refines++;
    const step=Math.max(1,Math.ceil((hi-lo)/(NG+1)));
    const tried=[];
    for(let m=lo+step;m<hi;m+=step) tried.push([m,attempt(m)]);
    let nl=lo,nlc=null,nh=hi;
    for(const [m,c] of tried) if(c&&m>nl){nl=m;nlc=c}
    for(const [m,c] of tried) if(!c&&m>nl&&m<nh) nh=m;
    if(nl===lo&&nh===hi)break;
    if(nlc)take(nl,nlc);
    lo=Math.max(nl,best); hi=Math.max(nh,lo+1);
  }
  // C
  let rounds=0;
  for(;;){
    rounds++;
    const before=best, m0=best+1, m1=best+W;
    let found=0,fc=null;
    for(let m=m0;m<=m1;m++){ const c=attempt(m); if(c&&m>found){found=m;fc=c} }
    if(found)take(found,fc);
    if(best===before)break;
  }
  return {best,chosen:bestChosen,calls,refines,windowRounds:rounds,capped};
}
// level-independent closed-form bracket seed. The 2026-08-17 code chained the
// seed from the previous level, which made the ladder depend on the order it
// was run in; its own write-up recorded four values that moved between runs.
const startD2=(x)=>Math.max(8,Math.round(x*Math.log(x)**2));
const startK1=(x)=>Math.max(8,Math.round(x*Math.log(x)));
// search budget as an explicit function of the prime count, printed with every
// ladder row. Fidelity is measured only where the truth is known (x <= 41), and
// only at the np <= 15 budget; see §1c-3 for what that does and does not license.
// Above x = 229 the allocation deliberately shifts from restarts to window
// width: §1c-3 shows restarts stop paying long before the instance gets large,
// while the bisection defect the window repairs is worth 5 to 8 percent right
// across the ladder (§1b vs §2+3).
// --force-budget=N scores a level at the schedule row for N primes instead of
// its own. It exists for one experiment: the schedule DROPS 25x in maxCalls and
// 5.3x in restarts between np=15 and np=16, while 1c-3 measures the budget
// NEEDED to hold the ratio at 1.000 RISING 3.31x per added prime. Those move in
// opposite directions at exactly the boundary where the extension table's
// ratios fall off, so a degrading ratio there is what an under-budgeted search
// looks like, and cannot be read as evidence about the greedy rule itself.
const FORCEB=(process.argv.find(a=>a.startsWith('--force-budget='))||'').slice(15);
function budget(np){
  if(FORCEB) np=Number(FORCEB);
  if(np<=15) return {R:512,W:200,NG:24,maxCalls:3e6};
  if(np<=40) return {R:96, W:120,NG:20,maxCalls:1.2e5};
  if(np<=80) return {R:32, W:96, NG:18,maxCalls:4e4};
  if(np<=160)return {R:12, W:80, NG:16,maxCalls:9e3};
  if(np<=320)return {R:4,  W:64, NG:14,maxCalls:2.4e3};
  return             {R:2,  W:64, NG:12,maxCalls:1.2e3};
}
const bestD2=(plist,x,b)=>searchMax(greedyD2,plist,mkVariants(b.R,SEED_BASE),
                                    {window:b.W,grid:b.NG,start:startD2(x),maxCalls:b.maxCalls});
const bestK =(plist,x,k,b)=>searchMax((m,p,o)=>greedyK(m,p,k,o),plist,mkVariants(b.R,SEED_BASE),
                                    {window:b.W,grid:b.NG,start:k===1?startK1(x):startD2(x),maxCalls:b.maxCalls});

// THE SUPERSEDED SEARCH, kept verbatim so §1b can reproduce the old ladder.
function oldMaxM(fn, plist, start){
  let lo=1,hi=Math.max(4,start);
  while(fn(hi,plist).ok){lo=hi;hi=Math.floor(hi*1.6)+2}
  while(lo+1<hi){const mid=(lo+hi)>>1; if(fn(mid,plist).ok) lo=mid; else hi=mid}
  return lo;
}
const oldBestD2=(plist,start)=>Math.max(oldMaxM((m,p)=>greedyD2(m,p,{tieLarge:false}),plist,start),
                                        oldMaxM((m,p)=>greedyD2(m,p,{tieLarge:true }),plist,start));

function fit(xs,ys){const n=xs.length;let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<n;i++){sx+=xs[i];sy+=ys[i];sxx+=xs[i]*xs[i];sxy+=xs[i]*ys[i]}
  const b=(n*sxy-sx*sy)/(n*sxx-sx*sx);return[Math.exp((sy-b*sx)/n),b]}

// ============================================================ 1. CUSTODY
if(!LADDER_ONLY){
console.log("=".repeat(78));
console.log("1. CUSTODY     (all randomness seeded from SEED_BASE = "+SEED_BASE+")");
console.log("=".repeat(78));
console.log("\n1a. brute-force G2(x#) from the tile itself, against the repo ladder");
for(const x of [5,7,11,13,17]){
  const ps=ALLP.filter(p=>p<=x); let W=1; for(const p of ps) W*=p;
  const hole=new Uint8Array(W+3).fill(1);
  for(const p of ps) for(let n=0;n<=W+2;n+=p) hole[n]=0;
  const slots=[]; for(let n=1;n<=W;n++) if(hole[n]&&hole[n+2]) slots.push(n);
  let mx=0; for(let i=1;i<slots.length;i++) mx=Math.max(mx,slots[i]-slots[i-1]);
  mx=Math.max(mx, slots[0]+W-slots[slots.length-1]);
  console.log(`   x=${String(x).padStart(2)}  brute force ${String(mx).padStart(4)}   repo ladder ${String(G2EXACT[x]).padStart(4)}   ${mx===G2EXACT[x]?'MATCH':'*** MISMATCH ***'}`);
}

console.log("\n1b. THE SUPERSEDED 2026-08-17 LADDER, reproduced from the old bisecting");
console.log("    search kept above. The old code chained its seed from the level below,");
console.log("    so only the first level is reproducible from a cold start; the rest are");
console.log("    shown chained, exactly as the 2026-08-17 run produced them.");
console.log("       x   published   old search (cold)   old search (chained)");
{
  let e2=8;
  for(const x of (FULL?[37,73,113,167,229]:[37,73,113,167,229])){
    const pl=ALLP.filter(p=>p<=x);
    const cold=oldBestD2(pl,8);
    const chain=oldBestD2(pl,e2); e2=Math.max(8,Math.floor(chain*1.05));
    const mark=(chain===OLDY2[x])?'MATCH':(cold===OLDY2[x]?'MATCH cold':'*** differs ***');
    console.log(`   ${String(x).padStart(5)}  ${String(OLDY2[x]).padStart(9)}  ${String(cold).padStart(17)}  ${String(chain).padStart(20)}   ${mark}`);
  }
}

console.log("\n1c-1. THE ORACLE TEST. Repaired search against ALL FOURTEEN exact G2 terms.");
console.log("      The comparison is greedy-achieved-run against G2(x#) - 1, which by the");
console.log("      CRT identity above IS the covering optimum. PRE-REGISTERED RULE:");
console.log("      PRE-REGISTERED at 13 levels, BEFORE 43# existed, and NOT rewritten:");
console.log("      ESTABLISHED if greedy = optimum at >= 12 of 13 and >= 0.99 at all 13;");
console.log("      DEAD if the ratio degrades with x. The 14th level arrived after");
console.log("      the rule; it is scored under the rule as written, and the count");
console.log("      below is out of 14 so the miss cannot hide in a denominator.");
console.log("      DEAD if the ratio degrades with x.");
console.log("       x   G2(x#)   optimum   old ladder   repaired   ratio   replay");
{
  const b={R:512,W:200,NG:24};
  let nOpt=0,minRatio=2; const ratios=[];
  for(const x of EXACTX){
    const pl=ALLP.filter(p=>p<=x), opt=G2EXACT[x]-1;
    const r=bestD2(pl,x,b), v=verifyD2(r.best,r.chosen,pl);
    const old=(x<=41)?oldBestD2(pl,8):null;
    const ratio=r.best/opt; ratios.push([x,ratio]);
    if(r.best===opt)nOpt++; if(ratio<minRatio)minRatio=ratio;
    console.log(`   ${String(x).padStart(5)} ${String(G2EXACT[x]).padStart(8)} ${String(opt).padStart(9)} ${String(old).padStart(12)} ${String(r.best).padStart(10)}   ${ratio.toFixed(3)}   ${v.bad===0?'OK':'FAIL '+(v.err||v.bad)}${r.best>opt?'  *** EXCEEDS THE OPTIMUM, IMPOSSIBLE ***':''}`);
  }
  const sub=ratios.filter(([x])=>x>=13);
  const [,sl]=fit(sub.map(r=>Math.log(r[0])),sub.map(r=>Math.log(r[1])));
  // Denominator is EXACTX.length, not the literal 13 it used to be. A level
  // added after a pre-registered rule must widen the denominator, or the first
  // miss is invisible: 13 of 13 and 13 of 14 print identically when the "13"
  // is hardcoded, and only one of them is a clean sweep.
  console.log(`\n      exact at ${nOpt} of ${EXACTX.length} levels; minimum ratio ${minRatio.toFixed(4)};`);
  if (nOpt < EXACTX.length) {
    const miss = EXACTX.filter(x => x >= 13).find(x => (ratios.find(r => r[0] === x) || [])[1] !== 1);
    console.log(`      NOT a clean sweep: first non-exact level is x = ${miss}.`);
    console.log('      Budget or structure is NOT settled by this run. 1c-3 measures the');
    console.log('      budget to hold 1.000 degrading by 3.31x per added prime, so a miss');
    console.log('      at the newest level is what the budget model already predicts.');
    console.log('      To separate them: re-run that level alone at a much larger budget.');
  }
  console.log(`      log-log slope of the ratio against x over x >= 13: ${sl.toFixed(4)}`);
  const est=(nOpt>=12&&minRatio>=0.99);
  console.log(`      VERDICT against the pre-registered rule: ${est?'ORACLE ESTABLISHED':(sl<-0.02?'ORACLE DEAD (ratio degrades)':'BETWEEN - report the fraction, do not round in the oracle\'s favour')}`);

  // ---------------------------------------------------------------------
  // 1c-1b. THE EXTENSION, on levels nobody here measured. This is the whole
  // operational value of A144311: eight more exact optima, free, at a range
  // where our own enumerator would need 2.8e10 years. It answers the
  // question the 43# miss raised -- whether the greedy's shortfall is budget
  // or structure -- because a shortfall that keeps growing with x is
  // structure and one that tracks the budget schedule is budget.
  //
  // Scored SEPARATELY and never folded into the verdict above. The
  // pre-registered rule was written against terms measured here, and these
  // are somebody else's, arrived at by a branch-and-bound over class choices
  // rather than by enumeration.
  // ---------------------------------------------------------------------
  console.log('\n1c-1b. EXTENSION to OEIS A144311 a(15)-a(22), levels NOT measured here.');
  console.log('       Alekseyev 2009 and Wang 2024, by branch-and-bound over class');
  console.log('       choices. Reported apart from the pre-registered verdict above.');
  console.log('        x   optimum   repaired   ratio   shortfall');
  const pubRatios=[];
  for(const x of PUBX){
    const pl=ALLP.filter(p=>p<=x), opt=G2EXACT[x]-1;
    const b=budget(pl.length), r=bestD2(pl,x,b);
    const ratio=r.best/opt; pubRatios.push([x,ratio]);
    console.log(`   ${String(x).padStart(6)} ${String(opt).padStart(9)} ${String(r.best).padStart(10)}   ${ratio.toFixed(3)}   ${String(opt-r.best).padStart(9)}`);
  }
  if(pubRatios.length){
    const [,ps]=fit(pubRatios.map(r=>Math.log(r[0])),pubRatios.map(r=>Math.log(r[1])));
    const pmin=Math.min(...pubRatios.map(r=>r[1]));
    console.log(`\n       minimum ratio over the eight: ${pmin.toFixed(4)}`);
    console.log(`       log-log slope of the ratio against x: ${ps.toFixed(4)}`);
    console.log(`       READING, and the first version of this line was WRONG. It said a`);
    console.log(`       negative slope means STRUCTURE. It does not, because the budget`);
    console.log(`       schedule is not flat across this range: maxCalls drops from 3e6 to`);
    console.log(`       1.2e5 and restarts from 512 to 96 at np=16, which is x=53, exactly`);
    console.log(`       where these ratios fall. x=47 is the ONLY extension level that`);
    console.log(`       keeps the np<=15 row, and it is the one that nearly hits exact.`);
    console.log(`       Meanwhile 1c-3 has the budget NEEDED rising 3.31x per added prime.`);
    console.log(`       Schedule falling and requirement rising at the same boundary means`);
    console.log(`       a degrading ratio here is what an under-budgeted search looks like.`);
    console.log(`       DISCRIMINATING TEST: --force-budget=15 on a level above 47.`);
  }
}

console.log("\n1c-2. IS FEASIBILITY REALLY NON-MONOTONE, AND HOW WIDE MUST THE WINDOW BE?");
console.log("      Exhaustive scan of every m up to the maximum, at the same budget.");
console.log("       x   max reached   #infeasible m below it   longest infeasible run");
for(const x of [13,17,19,23,29,31,37,41]){
  const pl=ALLP.filter(p=>p<=x), V=mkVariants(512,SEED_BASE);
  const b={R:512,W:200,NG:24}, top=bestD2(pl,x,b).best;
  const from=Math.max(1,top-260);
  let run=0,mx=0,nInf=0;
  for(let m=from;m<top;m++){
    let ok=false; for(const f of V) if(greedyD2(m,pl,f()).ok){ok=true;break}
    if(!ok){run++;nInf++;if(run>mx)mx=run} else run=0;
  }
  console.log(`   ${String(x).padStart(5)} ${String(top).padStart(13)} ${String(nInf).padStart(23)} (scanned from ${from}) ${String(mx).padStart(10)}`);
}

console.log("\n1c-3. WHAT THE ORACLE TEST DOES NOT LICENSE: the search BUDGET needed to");
console.log("      reach the optimum, at the optimum's own target, median over 25 seed");
console.log("      bases. This is the number that governs the ladder, not the ratio.");
console.log("       x   np   G2-1   median restarts to first hit   (25 bases, cap 30000)");
{
  const KS=[4,2,3,5], CAP=30000, TR=25; const pts=[];
  for(const x of [13,17,19,23,29,31,37,41]){
    const pl=ALLP.filter(p=>p<=x), M=G2EXACT[x]-1, hits=[];
    for(let tr=0;tr<TR;tr++){
      let n=CAP;
      for(let s=0;s<CAP;s++){
        const seed=((SEED_BASE+tr*104729)^Math.imul(s+1,2654435761))>>>0;
        if(greedyD2(M,pl,{topK:KS[s%4],rnd:mulberry32(seed)}).ok){n=s+1;break}
      }
      hits.push(n);
    }
    hits.sort((a,b)=>a-b);
    const med=hits[Math.floor(TR/2)], cens=hits.filter(h=>h>=CAP).length;
    pts.push([pl.length,med]);
    console.log(`   ${String(x).padStart(5)} ${String(pl.length).padStart(4)} ${String(M).padStart(6)}   ${String(med).padStart(8)}${cens?'   ('+cens+'/'+TR+' censored at the cap)':''}`);
  }
  let sx=0,sy=0,sxx=0,sxy=0;const n=pts.length;
  for(const [k,v] of pts){sx+=k;sy+=Math.log(v);sxx+=k*k;sxy+=k*Math.log(v)}
  const sl=(n*sxy-sx*sy)/(n*sxx-sx*sx);
  console.log(`\n      log(median restarts) grows by ${sl.toFixed(3)} per extra prime, i.e. a factor`);
  console.log(`      of ${Math.exp(sl).toFixed(2)} per prime. Extrapolated to x = 229 (50 primes) that is`);
  console.log(`      10^${(37*sl/Math.LN10).toFixed(0)} restarts. THE LADDER CANNOT BE ASSUMED TO INHERIT THE ORACLE`);
  console.log(`      PROPERTY. Every Y2 below is a LOWER BOUND on G2(x#) - 1 of unmeasured`);
  console.log(`      fidelity, and must be labelled one every time it is quoted.`);
}

console.log("\n1c-4. THE FIDELITY OF THE SAME ESTIMATOR WHERE TRUTH REACHES FURTHER UP.");
console.log("      G2 is known only to x = 41, but the ONE-CLASS problem is known exactly");
console.log("      to x = 229 (A048670, 50 terms), and §2+3 runs the identical repaired");
console.log("      search on it as the control. So the control measures its own fidelity");
console.log("      over a 100-fold range in x, which is the only direct evidence about");
console.log("      what the estimator does above x = 41 on ANY object.");
console.log("       n   p_n   g(p_n#)-1   repaired Y1   fidelity   replay");
{
  const pts=[];
  for(let n=1;n<=A048670.length;n++){
    const x=ALLP[n-1], plist=ALLP.filter(p=>p<=x), opt=A048670[n-1]-1;
    const b=budget(plist.length);
    const r=bestK(plist,x,1,b), v=verifyK(r.best,r.chosen,1,plist);
    const f=r.best/opt; pts.push([x,f]);
    if(n<=6||n%5===0||n===A048670.length)
      console.log(`   ${String(n).padStart(3)} ${String(x).padStart(5)} ${String(opt).padStart(11)} ${String(r.best).padStart(13)}   ${f.toFixed(4)}    ${v.bad===0?'OK':'FAIL'}${r.best>opt?'  *** EXCEEDS THE OPTIMUM, IMPOSSIBLE ***':''}`);
  }
  const sub=pts.filter(([x])=>x>=11);
  const [a,sl]=fit(sub.map(r=>Math.log(r[0])),sub.map(r=>Math.log(r[1])));
  const nOpt=pts.filter(([,f])=>f===1).length;
  console.log(`\n      exact at ${nOpt} of ${pts.length} terms. Fidelity ~ ${a.toFixed(3)} x^${sl.toFixed(4)} over x in [11,229].`);
  console.log(`      Extrapolated to x = 4001 that is ${(a*Math.pow(4001,sl)).toFixed(3)}, and to x = 41 it is ${(a*Math.pow(41,sl)).toFixed(3)}.`);
  console.log(`      THE ESTIMATOR'S FIDELITY DECAYS. On the two-class object it is 1.000 at`);
  console.log(`      every x where truth exists (x <= 41); on the one-class object, where`);
  console.log(`      truth reaches 5.6x further, it falls. Which of those the two-class`);
  console.log(`      ladder follows above x = 41 is NOT MEASURED by anything here.`);
}

console.log("\n1d. free-choice 2-class greedy against Resta/Morack ILP optima A072753 (primes 5..p_n)");
console.log("    The BUDGET-MATCHED comparison: n = 9..17 all run at the same R = 512 that");
console.log("    makes the difference-2 greedy exact at 13 of 13. Same rule, same budget,");
console.log("    different problem.");
console.log("     n   p_n   ILP opt   greedy   ratio   R");
{
  const pts=[];
  for(let n=3;n<=21;n++){
    const plist=ALLP.slice(2,n);
    const b=budget(plist.length);
    const Y=bestK(plist,ALLP[n-1],2,b).best, opt=A072753[n-3];
    if(n>=9&&n<=17)pts.push([ALLP[n-1],Y/opt]);
    console.log(`   ${String(n).padStart(3)}  ${String(ALLP[n-1]).padStart(4)}  ${String(opt).padStart(8)}  ${String(Y).padStart(7)}   ${(Y/opt).toFixed(3)}  ${String(b.R).padStart(4)}`);
  }
  const [a,sl]=fit(pts.map(r=>Math.log(r[0])),pts.map(r=>Math.log(r[1])));
  console.log(`\n      free-choice fidelity at CONSTANT R = 512, x in [${pts[0][0]},${pts[pts.length-1][0]}]:`);
  console.log(`      ${a.toFixed(3)} x^${sl.toFixed(4)}, mean ${(pts.reduce((t,r)=>t+r[1],0)/pts.length).toFixed(3)}, reading ${(a*Math.pow(41,sl)).toFixed(3)} at x = 41.`);
  console.log(`      SO AT THE SAME BUDGET AND THE SAME x = 41 THE GREEDY IS 1.000 ON THE`);
  console.log(`      DIFFERENCE-2 PROBLEM AND ${(a*Math.pow(41,sl)).toFixed(3)} ON THE FREE-CHOICE ONE. The exactness`);
  console.log(`      of §1c-1 belongs to the difference-2 structure, not to a large budget.`);
}
} // end !LADDER_ONLY

// ================================================ 2+3. THE CERTIFICATE LADDER
console.log("\n"+"=".repeat(78));
console.log("2+3. CERTIFICATE LADDER (two classes at distance 2) and the ONE-CLASS CONTROL");
console.log("=".repeat(78));
console.log("EVERY Y2 IN THIS TABLE IS A LOWER BOUND ON G2(x#) - 1, NOT AN ESTIMATE OF IT.");
console.log("A falling Y2/x^2 does not prove that G2/x^2 falls (see 1c-3).");
const LEV = LEVARG ? LEVARG.split(',').map(Number)
          : FULL ? [37,73,113,167,229,313,421,571,773,1009,1301,1699,2003,2503,3001,4001]
                 : [37,73,113,167,229];
console.log("\n     x   R    W  calls  Y1(1class)  Y2(diff-2)  old Y2  new/old  Y2/Y1  (Y2/Y1)/lnx   Y2/x^2  Y2/(x ln^2x)  replay  secs");
const rows=[];
for(const x of LEV){
  const t=Date.now(); const plist=ALLP.filter(p=>p<=x); const b=budget(plist.length);
  const r1=bestK(plist,x,1,b), r2=bestD2(plist,x,b);
  const y1=r1.best, y2=r2.best;
  const v2=verifyD2(y2,r2.chosen,plist), v1=verifyK(y1,r1.chosen,1,plist);
  rows.push([x,y1,y2]);
  console.log([String(x).padStart(6),String(b.R).padStart(4),String(b.W).padStart(4),
    (String(r1.calls+r2.calls)+(r1.capped||r2.capped?'*':'')).padStart(7),
    String(y1).padStart(10),String(y2).padStart(11),String(OLDY2[x]).padStart(7),
    (y2/OLDY2[x]).toFixed(3).padStart(8),
    (y2/y1).toFixed(2).padStart(7),(y2/y1/Math.log(x)).toFixed(4).padStart(11),
    (y2/(x*x)).toFixed(5).padStart(9),(y2/(x*Math.log(x)**2)).toFixed(4).padStart(12),
    ((v2.bad===0&&v1.bad===0)?'  OK  ':' FAIL '+(v2.err||v1.err||'')).padStart(7),
    ((Date.now()-t)/1000).toFixed(1).padStart(6)].join(" "));
}
console.log("  (* = the call cap bound the search at that level, so the row is a weaker");
console.log("   lower bound than the budget schedule alone would suggest.)");
if(rows.length>=3){
console.log("\n  regressions, identical estimator on both objects:");
for(const s of [0,Math.floor(rows.length/2)]){
  const L=rows.slice(s), x=L.map(r=>Math.log(r[0])), xl=L.map(r=>Math.log(Math.log(r[0])));
  const [a1,b1]=fit(x,L.map(r=>Math.log(r[1]))), [a2,b2]=fit(x,L.map(r=>Math.log(r[2])));
  const [,d1]=fit(xl,L.map(r=>Math.log(r[1]/r[0]))), [,d2]=fit(xl,L.map(r=>Math.log(r[2]/r[0])));
  const [,dr]=fit(xl,L.map(r=>Math.log(r[2]/r[1])));
  console.log(`   x in [${L[0][0]},${L[L.length-1][0]}], ${L.length} pts`);
  console.log(`     one class : ${a1.toFixed(3)} x^${b1.toFixed(4)}   = c x (ln x)^${d1.toFixed(3)}    [TRUTH: exponent 1]`);
  console.log(`     two class : ${a2.toFixed(3)} x^${b2.toFixed(4)}   = c x (ln x)^${d2.toFixed(3)}`);
  console.log(`     excess apparent exponent ${(b2-b1).toFixed(4)} ;  Y2/Y1 ~ (ln x)^${dr.toFixed(3)}`);
}
}

// ================================================== 4. POISSON-EXTREMES LAW
if(!LADDER_ONLY){
console.log("\n"+"=".repeat(78));
console.log("4. THE POISSON-EXTREMES LAW  max ~ c * (exact mean gap) * ln(number of gaps)");
console.log("=".repeat(78));
function tileStats(x){let m1=1,m2=1,t=0;
  for(const p of ALLP){if(p>x)break; m1*=p/(p-1); m2*=(p===2)?2:p/(p-2); t+=Math.log(p)}
  return {m1,m2,t}}
console.log("\n   m1 = x#/phi(x#) is the exact mean hole gap, m2 = x#/prod(q-2) the exact");
console.log("   mean twin-slot gap, ln N = theta(x) - ln m the log of the gap count.\n");
console.log("    x    m1      m2     c1=g/(m1 lnN)   c2=h2/(m2 lnN)   c2'=G2/(m2 lnN)");
const c1=[],c2=[],c2p=[];
for(let i=0;i<A048670.length;i++){
  const p=ALLP[i], s=tileStats(p);
  const P1=s.m1*(s.t-Math.log(s.m1)), P2=s.m2*(s.t-Math.log(s.m2));
  const v1=A048670[i]/P1, v2=(A288815[i]!==undefined)?A288815[i]/P2:null, v3=(G2EXACT[p]!==undefined&&p>=5)?G2EXACT[p]/P2:null;
  if(p>=11){c1.push(v1); if(v2!==null)c2.push(v2); if(v3!==null)c2p.push(v3)}
  if(p<=73||p%50<3)
    console.log([String(p).padStart(5),s.m1.toFixed(2).padStart(6),s.m2.toFixed(1).padStart(7),
      v1.toFixed(4).padStart(14),(v2!==null?v2.toFixed(4):'-').padStart(16),(v3!==null?v3.toFixed(4):'-').padStart(17)].join(" "));
}
function summ(name,a){const n=a.length,mu=a.reduce((x,y)=>x+y,0)/n;
  const sd=Math.sqrt(a.reduce((x,y)=>x+(y-mu)**2,0)/(n-1));
  let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=i;sy+=Math.log(a[i]);sxx+=i*i;sxy+=i*Math.log(a[i])}
  const sl=(n*sxy-sx*sy)/(n*sxx-sx*sx);
  console.log(`  ${name}: n=${n} mean=${mu.toFixed(4)} sd=${sd.toFixed(4)} cv=${(sd/mu*100).toFixed(1)}% range [${Math.min(...a).toFixed(4)}, ${Math.max(...a).toFixed(4)}] trend/step=${sl.toFixed(5)}`)}
console.log();
summ("c1  one class,  exact, p in [11,229]", c1);
summ("c2  free 2class, exact, p in [11,73]", c2);
summ("c2' diff-2 G2,  exact, p in [11,41]", c2p);
console.log("\n  m2 -> e^{2gamma} ln^2 x / (2 C2) check:");
const C2=0.6601618158, GAM=0.5772156649;
for(const x of [37,229,1009,4001]){const s=tileStats(x);
  const f=Math.exp(2*GAM)*Math.log(x)**2/(2*C2);
  console.log(`    x=${String(x).padStart(4)}  m2=${s.m2.toFixed(2)}  formula=${f.toFixed(2)}  ratio=${(s.m2/f).toFixed(4)}`)}
console.log("\n  So the law reads  G2(x#) ~ c * e^{2gamma}/(2 C2) * x ln^2 x  with c ~ 0.48,");
console.log("  i.e. about 1.2 x ln^2 x, against the Zone Postulate threshold x^2.");
// CAVEATS ADDED 2026-08-17, from the two documents that own this shorthand.
// Neither weakens the measurement; both bound what it may be quoted as.
console.log("\n  TWO CAVEATS ON THAT SHORTHAND, and neither is optional.");
console.log("  (a) IT IS A DESCRIPTION OF x <= 41, NOT AN ASYMPTOTIC. On the diagonal it");
console.log("      is safe; research/maxgap-law.js S8 shows the same form carried out to");
console.log("      1e50 is 3x too small once the ledger's drift is put back, and it must");
console.log("      not be used off the diagonal, where c runs 0.85 to 1.05 rather than");
console.log("      0.48 and itself moves with x.");
console.log("  (b) PREFER THE POISSON FORM c * m * (theta(x) - ln m). The 1.2 shorthand");
console.log("      replaces (theta(x) - ln m) by its asymptotic 2 ln x, which has not");
console.log("      arrived at reachable x: a finite-range fit of this same data gives 0.8,");
console.log("      not 1.2 (G2-STATE.md S6.2). Both are defensible and they are not the");
console.log("      same statement, so quote c with its coordinates or do not quote it.");
console.log("  The 2026-08-17 prediction G2(41#) in 476 to 633, central 513, is now settled");
console.log("  by the exact term: G2(41#) = 546, inside the band and above the central value.");
} // end !LADDER_ONLY

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/two-class-lower-bounds.js
//   invocation:  node research/two-class-lower-bounds.js
//   code-sha256: 726e5a4bef8f8241295d37b264ba575486cb5aaba76b37550c1d06d2004f4023
//   out-sha256:  d7e8fd77fe19c94efbad3d7b700388d00968fee268c87362c5271a6935584ba6
//   body-lines:  257
//   forced:      2026-08-20, 3 of 337 figures in the replaced block not reproduced (first: 12.8, 16.0, 32.3)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     520.4 s
// ============================================================================
// ==============================================================================
// 1. CUSTODY     (all randomness seeded from SEED_BASE = 20260818)
// ==============================================================================
//
// 1a. brute-force G2(x#) from the tile itself, against the repo ladder
//    x= 5  brute force   12   repo ladder   12   MATCH
//    x= 7  brute force   30   repo ladder   30   MATCH
//    x=11  brute force   42   repo ladder   42   MATCH
//    x=13  brute force   66   repo ladder   66   MATCH
//    x=17  brute force  108   repo ladder  108   MATCH
//
// 1b. THE SUPERSEDED 2026-08-17 LADDER, reproduced from the old bisecting
//     search kept above. The old code chained its seed from the level below,
//     so only the first level is reproducible from a cold start; the rest are
//     shown chained, exactly as the 2026-08-17 run produced them.
//        x   published   old search (cold)   old search (chained)
//       37        355                355                   355   MATCH
//       73       1211               1181                  1211   MATCH
//      113       2501               2471                  2501   MATCH
//      167       4210               4109                  4210   MATCH
//      229       6748               6569                  6748   MATCH
//
// 1c-1. THE ORACLE TEST. Repaired search against ALL FOURTEEN exact G2 terms.
//       The comparison is greedy-achieved-run against G2(x#) - 1, which by the
//       CRT identity above IS the covering optimum. PRE-REGISTERED RULE:
//       PRE-REGISTERED at 13 levels, BEFORE 43# existed, and NOT rewritten:
//       ESTABLISHED if greedy = optimum at >= 12 of 13 and >= 0.99 at all 13;
//       DEAD if the ratio degrades with x. The 14th level arrived after
//       the rule; it is scored under the rule as written, and the count
//       below is out of 14 so the miss cannot hide in a denominator.
//       DEAD if the ratio degrades with x.
//        x   G2(x#)   optimum   old ladder   repaired   ratio   replay
//        2        2         1            1          1   1.000   OK
//        3        6         5            5          5   1.000   OK
//        5       12        11           11         11   1.000   OK
//        7       30        29           29         29   1.000   OK
//       11       42        41           41         41   1.000   OK
//       13       66        65           56         65   1.000   OK
//       17      108       107          107        107   1.000   OK
//       19      150       149          137        149   1.000   OK
//       23      204       203          176        203   1.000   OK
//       29      258       257          211        257   1.000   OK
//       31      348       347          233        347   1.000   OK
//       37      528       527          355        527   1.000   OK
//       41      546       545          419        545   1.000   OK
//       43      618       617         null        611   0.990   OK
//
//       exact at 13 of 14 levels; minimum ratio 0.9903;
//       NOT a clean sweep: first non-exact level is x = 43.
//       Budget or structure is NOT settled by this run. 1c-3 measures the
//       budget to hold 1.000 degrading by 3.31x per added prime, so a miss
//       at the newest level is what the budget model already predicts.
//       To separate them: re-run that level alone at a much larger budget.
//       log-log slope of the ratio against x over x >= 13: -0.0035
//       VERDICT against the pre-registered rule: ORACLE ESTABLISHED
//
// 1c-1b. EXTENSION to OEIS A144311 a(15)-a(22), levels NOT measured here.
//        Alekseyev 2009 and Wang 2024, by branch-and-bound over class
//        choices. Reported apart from the pre-registered verdict above.
//         x   optimum   repaired   ratio   shortfall
//        47       707        701   0.992           6
//        53       869        833   0.959          36
//        59       965        948   0.982          17
//        61      1079       1019   0.944          60
//        67      1283       1154   0.899         129
//        71      1397       1281   0.917         116
//        73      1529       1440   0.942          89
//        79      1709       1601   0.937         108
//
//        minimum ratio over the eight: 0.8995
//        log-log slope of the ratio against x: -0.1328
//        READING, and the first version of this line was WRONG. It said a
//        negative slope means STRUCTURE. It does not, because the budget
//        schedule is not flat across this range: maxCalls drops from 3e6 to
//        1.2e5 and restarts from 512 to 96 at np=16, which is x=53, exactly
//        where these ratios fall. x=47 is the ONLY extension level that
//        keeps the np<=15 row, and it is the one that nearly hits exact.
//        Meanwhile 1c-3 has the budget NEEDED rising 3.31x per added prime.
//        Schedule falling and requirement rising at the same boundary means
//        a degrading ratio here is what an under-budgeted search looks like.
//        DISCRIMINATING TEST: --force-budget=15 on a level above 47.
//
// 1c-2. IS FEASIBILITY REALLY NON-MONOTONE, AND HOW WIDE MUST THE WINDOW BE?
//       Exhaustive scan of every m up to the maximum, at the same budget.
//        x   max reached   #infeasible m below it   longest infeasible run
//       13            65                       0 (scanned from 1)          0
//       17           107                       0 (scanned from 1)          0
//       19           149                       0 (scanned from 1)          0
//       23           203                       0 (scanned from 1)          0
//       29           257                       9 (scanned from 1)          2
//       31           347                      12 (scanned from 87)          7
//       37           527                      11 (scanned from 267)          1
//       41           545                       8 (scanned from 285)          5
//
// 1c-3. WHAT THE ORACLE TEST DOES NOT LICENSE: the search BUDGET needed to
//       reach the optimum, at the optimum's own target, median over 25 seed
//       bases. This is the number that governs the ladder, not the ratio.
//        x   np   G2-1   median restarts to first hit   (25 bases, cap 30000)
//       13    6     65          3
//       17    7    107          5
//       19    8    149          6
//       23    9    203         21
//       29   10    257       1100
//       31   11    347       1038
//       37   12    527        282
//       41   13    545      17999   (6/25 censored at the cap)
//
//       log(median restarts) grows by 1.196 per extra prime, i.e. a factor
//       of 3.31 per prime. Extrapolated to x = 229 (50 primes) that is
//       10^19 restarts. THE LADDER CANNOT BE ASSUMED TO INHERIT THE ORACLE
//       PROPERTY. Every Y2 below is a LOWER BOUND on G2(x#) - 1 of unmeasured
//       fidelity, and must be labelled one every time it is quoted.
//
// 1c-4. THE FIDELITY OF THE SAME ESTIMATOR WHERE TRUTH REACHES FURTHER UP.
//       G2 is known only to x = 41, but the ONE-CLASS problem is known exactly
//       to x = 229 (A048670, 50 terms), and §2+3 runs the identical repaired
//       search on it as the control. So the control measures its own fidelity
//       over a 100-fold range in x, which is the only direct evidence about
//       what the estimator does above x = 41 on ANY object.
//        n   p_n   g(p_n#)-1   repaired Y1   fidelity   replay
//      1     2           1             1   1.0000    OK
//      2     3           3             3   1.0000    OK
//      3     5           5             5   1.0000    OK
//      4     7           9             9   1.0000    OK
//      5    11          13            13   1.0000    OK
//      6    13          21            21   1.0000    OK
//     10    29          45            45   1.0000    OK
//     15    47          99            99   1.0000    OK
//     20    71         173           169   0.9769    OK
//     25    97         257           231   0.8988    OK
//     30   113         329           311   0.9453    OK
//     35   149         431           395   0.9165    OK
//     40   173         537           476   0.8864    OK
//     45   197         641           556   0.8674    OK
//     50   229         761           658   0.8647    OK
//
//       exact at 16 of 50 terms. Fidelity ~ 1.232 x^-0.0638 over x in [11,229].
//       Extrapolated to x = 4001 that is 0.725, and to x = 41 it is 0.972.
//       THE ESTIMATOR'S FIDELITY DECAYS. On the two-class object it is 1.000 at
//       every x where truth exists (x <= 41); on the one-class object, where
//       truth reaches 5.6x further, it falls. Which of those the two-class
//       ladder follows above x = 41 is NOT MEASURED by anything here.
//
// 1d. free-choice 2-class greedy against Resta/Morack ILP optima A072753 (primes 5..p_n)
//     The BUDGET-MATCHED comparison: n = 9..17 all run at the same R = 512 that
//     makes the difference-2 greedy exact at 13 of 13. Same rule, same budget,
//     different problem.
//      n   p_n   ILP opt   greedy   ratio   R
//      3     5         2        2   1.000   512
//      4     7         4        4   1.000   512
//      5    11        10       10   1.000   512
//      6    13        24       24   1.000   512
//      7    17        31       31   1.000   512
//      8    19        42       42   1.000   512
//      9    23        60       56   0.933   512
//     10    29        74       72   0.973   512
//     11    31        94       92   0.979   512
//     12    37       117      110   0.940   512
//     13    41       148      133   0.899   512
//     14    43       173      154   0.890   512
//     15    47       213      178   0.836   512
//     16    53       236      206   0.873   512
//     17    59       275      237   0.862   512
//     18    61       316      264   0.835    96
//     19    67       364      283   0.777    96
//     20    71       409      325   0.795    96
//     21    73       436      366   0.839    96
//
//       free-choice fidelity at CONSTANT R = 512, x in [23,59]:
//       1.538 x^-0.1440, mean 0.909, reading 0.901 at x = 41.
//       SO AT THE SAME BUDGET AND THE SAME x = 41 THE GREEDY IS 1.000 ON THE
//       DIFFERENCE-2 PROBLEM AND 0.901 ON THE FREE-CHOICE ONE. The exactness
//       of §1c-1 belongs to the difference-2 structure, not to a large budget.
//
// ==============================================================================
// 2+3. CERTIFICATE LADDER (two classes at distance 2) and the ONE-CLASS CONTROL
// ==============================================================================
// EVERY Y2 IN THIS TABLE IS A LOWER BOUND ON G2(x#) - 1, NOT AN ESTIMATE OF IT.
// A falling Y2/x^2 does not prove that G2/x^2 falls (see 1c-3).
//
//      x   R    W  calls  Y1(1class)  Y2(diff-2)  old Y2  new/old  Y2/Y1  (Y2/Y1)/lnx   Y2/x^2  Y2/(x ln^2x)  replay  secs
//     37  512  200  417332         65         527     355    1.485    8.11      2.2453   0.38495       1.0924    OK     11.6
//     73   96  120   44095        182        1440    1211    1.189    7.91      1.8441   0.27022       1.0716    OK      4.9
//    113   96  120   55178        311        2823    2501    1.129    9.08      1.9201   0.22108       1.1179    OK     15.2
//    167   96  120   60431        462        4728    4210    1.123   10.23      1.9996   0.16953       1.0808    OK     34.0
//    229   32   96   27076        658        7372    6748    1.092   11.20      2.0619   0.14058       1.0903    OK     30.8
//   (* = the call cap bound the search at that level, so the row is a weaker
//    lower bound than the budget schedule alone would suggest.)
//
//   regressions, identical estimator on both objects:
//    x in [37,229], 5 pts
//      one class : 0.748 x^1.2595   = c x (ln x)^1.183    [TRUTH: exponent 1]
//      two class : 2.859 x^1.4495   = c x (ln x)^2.005
//      excess apparent exponent 0.1900 ;  Y2/Y1 ~ (ln x)^0.822
//    x in [113,229], 3 pts
//      one class : 2.070 x^1.0591   = c x (ln x)^0.296    [TRUTH: exponent 1]
//      two class : 4.590 x^1.3575   = c x (ln x)^1.808
//      excess apparent exponent 0.2983 ;  Y2/Y1 ~ (ln x)^1.511
//
// ==============================================================================
// 4. THE POISSON-EXTREMES LAW  max ~ c * (exact mean gap) * ln(number of gaps)
// ==============================================================================
//
//    m1 = x#/phi(x#) is the exact mean hole gap, m2 = x#/prod(q-2) the exact
//    mean twin-slot gap, ln N = theta(x) - ln m the log of the gap count.
//
//     x    m1      m2     c1=g/(m1 lnN)   c2=h2/(m2 lnN)   c2'=G2/(m2 lnN)
//     2   2.00     2.0       Infinity         Infinity                 -
//     3   3.00     6.0         1.9236         Infinity                 -
//     5   3.75    10.0         0.7694           1.6384            1.0923
//     7   4.38    14.0         0.5904           0.7913            0.7913
//    11   4.81    17.1         0.4712           0.7863            0.5004
//    13   5.21    20.2         0.4873           1.0157            0.4469
//    17   5.54    22.9         0.4106           0.8368            0.4707
//    19   5.85    25.6         0.4060           0.7842            0.4559
//    23   6.11    28.1         0.3758           0.8211            0.4577
//    29   6.33    30.1         0.3502           0.7784            0.4463
//    31   6.54    32.2         0.3672           0.7847            0.4791
//    37   6.72    34.1         0.3540           0.7964            0.5939
//    41   6.89    35.8         0.3417           0.8389            0.5123
//    43   7.06    37.5         0.3628           0.8305            0.4916
//    47   7.21    39.2         0.3558           0.8781            0.4842
//    53   7.35    40.7         0.3360           0.8465            0.5179
//    59   7.47    42.2         0.3359           0.8673            0.5059
//    61   7.60    43.6         0.3400           0.8839            0.5019
//    67   7.71    45.0         0.3564           0.9103            0.5337
//    71   7.82    46.3         0.3735           0.9209            0.5233
//    73   7.93    47.6         0.3753           0.8890            0.5188
//   101   8.39    53.3         0.3648                -                 -
//   151   9.10    62.7         0.3678                -                 -
//
//   c1  one class,  exact, p in [11,229]: n=46 mean=0.3718 sd=0.0269 cv=7.2% range [0.3359, 0.4873] trend/step=-0.00104
//   c2  free 2class, exact, p in [11,73]: n=17 mean=0.8511 sd=0.0623 cv=7.3% range [0.7784, 1.0157] trend/step=0.00524
//   c2' diff-2 G2,  exact, p in [11,41]: n=18 mean=0.4983 sd=0.0369 cv=7.4% range [0.4463, 0.5939] trend/step=0.00796
//
//   m2 -> e^{2gamma} ln^2 x / (2 C2) check:
//     x=  37  m2=34.05  formula=31.33  ratio=1.0870
//     x= 229  m2=72.70  formula=70.94  ratio=1.0248
//     x=1009  m2=115.75  formula=114.94  ratio=1.0070
//     x=4001  m2=165.86  formula=165.29  ratio=1.0035
//
//   So the law reads  G2(x#) ~ c * e^{2gamma}/(2 C2) * x ln^2 x  with c ~ 0.48,
//   i.e. about 1.2 x ln^2 x, against the Zone Postulate threshold x^2.
//
//   TWO CAVEATS ON THAT SHORTHAND, and neither is optional.
//   (a) IT IS A DESCRIPTION OF x <= 41, NOT AN ASYMPTOTIC. On the diagonal it
//       is safe; research/maxgap-law.js S8 shows the same form carried out to
//       1e50 is 3x too small once the ledger's drift is put back, and it must
//       not be used off the diagonal, where c runs 0.85 to 1.05 rather than
//       0.48 and itself moves with x.
//   (b) PREFER THE POISSON FORM c * m * (theta(x) - ln m). The 1.2 shorthand
//       replaces (theta(x) - ln m) by its asymptotic 2 ln x, which has not
//       arrived at reachable x: a finite-range fit of this same data gives 0.8,
//       not 1.2 (G2-STATE.md S6.2). Both are defensible and they are not the
//       same statement, so quote c with its coordinates or do not quote it.
//   The 2026-08-17 prediction G2(41#) in 476 to 633, central 513, is now settled
//   by the exact term: G2(41#) = 546, inside the band and above the central value.
// ============================================================================
// READINGS
//
