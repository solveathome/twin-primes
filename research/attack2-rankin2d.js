// ============================================================================
// ATTACK2 — RANKIN-2D: how far can TWO classes per prime actually cover?
// (2026-08-14; the constructive/adversary side of covering-dive.md Q4)
// ============================================================================
// THREE ADVERSARIES, one target: cover EVERY integer in [1, m], the covered m
// measuring the constructible gap between twin-viable positions (the
// constructive counterpart of G2 = the wall measured from the other side).
//
//   FREE      per prime p in {5..p_n}: ANY pair of classes {a_p, b_p}.
//             This is OEIS A072753 (Ziller-Morack; exact ILP optima by Resta/
//             Morack to n=21): 2,4,10,24,31,42,60,74,94,117,148,173,213,236,
//             275,316,364,409,436.  A288815 (paired Jacobsthal at the
//             primorial) = 6*A072753 + 6; ZM Conjecture 6 is the ceiling
//             h2(n) < p_n^2 - p_n. NOTE the definition: the two classes are
//             UNCONSTRAINED — the twin shape enters only via the 6a+6 bridge.
//   PAIRED    the pair must be {a_p, a_p - 2}: the twin-shaped adversary of
//             Q4. CRT COLLAPSE: choosing all shifts a_p independently is the
//             same as sliding ONE window over the {5..p_n}-product tile, so
//             paired-max-m = the longest all-killed run in that tile (the
//             twin-Jacobsthal object for the 2,3-free tile). No OEIS entry;
//             computed exactly here (new data).
//   UNSHIFTED a_q = 0 forced — classes {0,-2 mod q}, q in (x, y]: the REAL
//             Scour (the removers' strike pattern is the tile's own holes
//             re-scaled; it cannot shift). Its reach is measured where it
//             matters: n in (y, y^2], the pre-frontier territory.
//
// ENGINES.
//  (A) Exact branch-and-bound: each prime carries 2 class-tokens (FREE) or 1
//      pair-token (PAIRED); every assigned class must contain the current
//      smallest uncovered position (canonical order, no permutation dupes);
//      pruning by best-pair capacity over the full range AND a 40-window.
//  (B) Resta's published optimum certificates (OEIS comments) re-verified.
//  (C) CRT cross-check: segmented scan of the full product period must
//      reproduce the PAIRED optima as longest-run values. (It does, exactly.)
//  (D) WalkSAT-style repair heuristic (min-conflicts with forced-position
//      moves, warm-started m-ramping) for lower bounds at larger n.
//  (E) Segmented divisor scans for the unshifted Scour + shifted lower bounds
//      on the same prime windows for the free-vs-real comparison.
//  (F) Log-log growth fits vs the zone (p^2) and the Rankin scale (p ln^2 p).
//
// Run: node attack2-rankin2d.js [--deep]
// --deep adds FREE n=10 exact (~10 min), PAIRED n=13 exact (~20 min).
// Both deep results were computed and are recorded in OUTPUT below.
// ============================================================================

const DEEP = process.argv.includes('--deep');

// ---------------------------------------------------------------- utilities
function primesUpTo(n){const s=new Uint8Array(n+1);const out=[];for(let i=2;i<=n;i++){if(!s[i]){out.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return out;}
const ALLP = primesUpTo(50000).filter(p=>p>=5);
function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;}}
function fitLoglog(pts){ // least-squares slope of ln(m) on ln(p); pts=[[p,m],..]
  let sx=0,sy=0,sxx=0,sxy=0;const n=pts.length;
  for(const[p,m]of pts){const x=Math.log(p),y=Math.log(m);sx+=x;sy+=y;sxx+=x*x;sxy+=x*y;}
  const b=(n*sxy-sx*sy)/(n*sxx-sx*sx);
  return {slope:b, c:Math.exp((sy-b*sx)/n)};
}
const OEIS072753=[2,4,10,24,31,42,60,74,94,117,148,173,213,236,275,316,364,409,436]; // n=3..21

// ------------------------------------------- (A) exact token branch-and-bound
// mode 'free': 2 tokens/prime, a token = one class; mode 'twin': 1 token = a
// {a, a-2} pair. Every assigned class must contain the smallest uncovered u.
function feasible(m, primes, mode, nodeBudget){
  const k=primes.length;
  const cover=new Int8Array(m+2);
  let uncovered=m, nodes=0, incomplete=false;
  const tokens=new Int8Array(k); tokens.fill(mode==='free'?2:1);
  const cnt=new Int32Array(primes[k-1]);
  const undoPos=new Int32Array(4*(m+4)*(k+2)); let undoTop=0;
  const WIN=40;
  function addClass(p,r){let nc=0;for(let pos=(r===0?p:r);pos<=m;pos+=p){if(cover[pos]===0)nc++;cover[pos]++;undoPos[undoTop++]=pos;}return nc;}
  function undoTo(from){for(let i=undoTop-1;i>=from;i--){const pos=undoPos[i];if(--cover[pos]===0)uncovered++;}undoTop=from;}
  function capOK(u){
    const wHi=Math.min(m,u+WIN);
    let uncW=0; for(let pos=u;pos<=wHi;pos++) if(cover[pos]===0) uncW++;
    let capF=0,capW=0,needF=true,needW=true;
    for(let i=0;i<k&&(needF||needW);i++){
      const t=tokens[i]; if(!t) continue;
      const p=primes[i];
      if(needF){
        cnt.fill(0,0,p);
        for(let pos=u;pos<=m;pos++) if(cover[pos]===0) cnt[pos%p]++;
        if(mode==='free'){let b1=0,b2=0;for(let r=0;r<p;r++){const c=cnt[r];if(c>b1){b2=b1;b1=c;}else if(c>b2)b2=c;}capF+=t===2?b1+b2:b1;}
        else {let best=0;for(let r=0;r<p;r++){const c=cnt[r]+cnt[(r+p-2)%p];if(c>best)best=c;}capF+=best;}
        if(capF>=uncovered) needF=false;
      }
      if(needW){
        cnt.fill(0,0,p);
        for(let pos=u;pos<=wHi;pos++) if(cover[pos]===0) cnt[pos%p]++;
        if(mode==='free'){let b1=0,b2=0;for(let r=0;r<p;r++){const c=cnt[r];if(c>b1){b2=b1;b1=c;}else if(c>b2)b2=c;}capW+=t===2?b1+b2:b1;}
        else {let best=0;for(let r=0;r<p;r++){const c=cnt[r]+cnt[(r+p-2)%p];if(c>best)best=c;}capW+=best;}
        if(capW>=uncW) needW=false;
      }
    }
    return !needF && !needW;
  }
  function dfs(u0){
    if(uncovered===0) return true;
    if(nodes++>nodeBudget){incomplete=true;return false;}
    let u=u0; while(u<=m&&cover[u]>0)u++;
    if(!capOK(u)) return false;
    const order=[];
    for(let i=0;i<k;i++){
      if(!tokens[i]) continue;
      const p=primes[i];
      let sc=0; for(let pos=u;pos<=m;pos+=p) if(cover[pos]===0) sc++;
      order.push({i,sc});
    }
    order.sort((x,y)=>y.sc-x.sc);
    for(const {i} of order){
      const p=primes[i], a=u%p;
      tokens[i]--;
      if(mode==='free'){
        const from=undoTop;
        uncovered-=addClass(p,a);
        if(dfs(u)) return true;
        undoTo(from);
        if(incomplete){tokens[i]++;return false;}
      } else {
        for(const A of [a,(a+2)%p]){
          const from=undoTop;
          let nc=addClass(p,A); const c2=(A+p-2)%p; if(c2!==A) nc+=addClass(p,c2);
          uncovered-=nc;
          if(dfs(u)) return true;
          undoTo(from);
          if(incomplete){tokens[i]++;return false;}
        }
      }
      tokens[i]++;
    }
    return false;
  }
  const sat=dfs(1);
  return {sat,complete:!incomplete,nodes};
}
function exactMax(primes,mode,start,nodeBudget){
  let m=Math.max(1,start);
  for(;;){const r=feasible(m,primes,mode,nodeBudget);if(!r.complete)return{m:m-1,exact:false};if(r.sat)break;m--;if(!m)return{m:0,exact:true};}
  for(;;){const r=feasible(m+1,primes,mode,nodeBudget);if(!r.complete)return{m,exact:false,nodes:r.nodes};if(!r.sat)return{m,exact:true,nodes:r.nodes};m++;}
}

console.log('=== (A) EXACT optima: FREE pairs (=A072753) and PAIRED {a,a-2} (new) ===');
const freeExact=[], twinExact=[];
{
  const hiFree = DEEP?10:9, hiTwin = DEEP?13:12;
  let prev=1;
  for(let n=3;n<=hiFree;n++){
    const primes=ALLP.slice(0,n-2), t0=Date.now();
    const r=exactMax(primes,'free',prev,2e9);
    freeExact.push([primes[primes.length-1],r.m]);
    console.log(`FREE  n=${n} p=${primes[primes.length-1]}: m=${r.m} exact=${r.exact} nodes=${r.nodes} A072753=${OEIS072753[n-3]} match=${r.m===OEIS072753[n-3]} ${Date.now()-t0}ms`);
    prev=r.m;
  }
  prev=1;
  for(let n=3;n<=hiTwin;n++){
    const primes=ALLP.slice(0,n-2), t0=Date.now();
    const r=exactMax(primes,'twin',prev,2e9);
    twinExact.push([primes[primes.length-1],r.m]);
    console.log(`PAIR  n=${n} p=${primes[primes.length-1]}: m=${r.m} exact=${r.exact} nodes=${r.nodes} (free=${OEIS072753[n-3]}, ratio ${(r.m/OEIS072753[n-3]).toFixed(2)}) ${Date.now()-t0}ms`);
    prev=r.m;
  }
}

// --------------------------------------- (B) Resta certificates (from OEIS)
console.log('\n=== (B) Resta ILP optimum certificates re-verified ===');
{
  const certs={
    148:[[5,1,3],[7,4,5],[11,2,4],[13,9,10],[17,1,12],[19,1,15],[23,4,7],[29,7,26],[31,11,14],[37,17,21],[41,3,23]],
    173:[[5,1,3],[7,1,2],[11,5,7],[13,2,4],[17,1,8],[19,7,14],[23,1,20],[29,10,19],[31,1,12],[37,13,18],[41,29,34],[43,1,36]],
    213:[[5,1,3],[7,1,2],[11,7,9],[13,1,11],[17,2,9],[19,4,14],[23,3,9],[29,16,25],[31,4,5],[37,10,34],[41,17,28],[43,36,39],[47,12,14]],
    236:[[5,1,3],[7,3,5],[11,4,5],[13,4,9],[17,5,14],[19,7,10],[23,11,17],[29,3,26],[31,3,19],[37,5,25],[41,2,31],[43,1,34],[47,3,41],[53,20,32]]};
  for(const [mStr,pairs] of Object.entries(certs)){
    const m=+mStr, cov=new Uint8Array(m+2);
    for(const [p,a,b] of pairs){for(let pos=a===0?p:a;pos<=m;pos+=p)cov[pos]=1;for(let pos=b===0?p:b;pos<=m;pos+=p)cov[pos]=1;}
    let hole=-1; for(let pos=1;pos<=m;pos++) if(!cov[pos]){hole=pos;break;}
    console.log(`cert m=${m}: covers [1,${m}] = ${hole<0}${hole<0?'':' FIRST HOLE '+hole}`);
  }
}

// ------------------------- (C) CRT collapse cross-check for PAIRED (period scan)
console.log('\n=== (C) CRT check: longest all-killed run in the {5..p_n}-tile ===');
{
  for(let n=3;n<=9;n++){
    const primes=ALLP.slice(0,n-2);
    let per=1; for(const p of primes) per*=p;
    const SEG=1<<22, seg=new Uint8Array(SEG);
    let run=0,best=0;
    for(let base=0;base<per;base+=SEG){
      const len=Math.min(SEG,per-base);
      seg.fill(0,0,len);
      for(const p of primes){
        let s=(p-(base%p))%p; for(let j=s;j<len;j+=p) seg[j]=1;
        s=(((p-2)-(base%p))%p+p)%p; for(let j=s;j<len;j+=p) seg[j]=1;
      }
      for(let j=0;j<len;j++){ if(seg[j]){run++;if(run>best)best=run;} else run=0; }
    }
    // cyclic wrap
    if(run>0){
      const len=Math.min(SEG,per); seg.fill(0,0,len);
      for(const p of primes){ for(let j=0;j<len;j+=p) seg[j]=1; for(let j=(p-2)%p;j<len;j+=p) seg[j]=1; }
      for(let j=0;j<len&&seg[j];j++){run++;if(run>best)best=run;}
    }
    const te=twinExact[n-3];
    console.log(`n=${n} p=${primes[primes.length-1]} period=${per}: longest run=${best}  exact PAIRED m=${te?te[1]:'?'}  match=${te?best===te[1]:'?'}`);
  }
}

// ------------------------------------ (D) WalkSAT repair heuristic (both modes)
function makeState(primes,mode,M){
  return {primes,mode,M,k:primes.length,cover:new Int16Array(M+2),assign:new Array(primes.length).fill(null),m:0,holes:[],holeIdx:new Int32Array(M+2).fill(-1)};
}
function holeAdd(S,pos){if(S.holeIdx[pos]<0){S.holeIdx[pos]=S.holes.length;S.holes.push(pos);}}
function holeDel(S,pos){const i=S.holeIdx[pos];if(i>=0){const last=S.holes.pop();if(i<S.holes.length){S.holes[i]=last;S.holeIdx[last]=i;}S.holeIdx[pos]=-1;}}
function addC(S,p,r){for(let pos=(r===0?p:r);pos<=S.m;pos+=p){if(++S.cover[pos]===1)holeDel(S,pos);}}
function delC(S,p,r){for(let pos=(r===0?p:r);pos<=S.m;pos+=p){if(--S.cover[pos]===0)holeAdd(S,pos);}}
function setPair(S,i,a,b){
  const p=S.primes[i];
  if(S.assign[i]){const[oa,ob]=S.assign[i];delC(S,p,oa);if(ob!==oa)delC(S,p,ob);}
  S.assign[i]=[a,b];
  addC(S,p,a); if(b!==a) addC(S,p,b);
}
function solveM(S,stepBudget,rng,scratch){
  let steps=0,stagnation=0,bestCost=S.holes.length;
  while(S.holes.length>0){
    if(steps++>stepBudget) return false;
    const u=S.holes[Math.floor(rng()*S.holes.length)];
    let chosenI=-1,chosenPair=null,bestDelta=Infinity;
    const samples=1+Math.min(S.k-1,3);
    for(let s=0;s<samples;s++){
      const i=Math.floor(rng()*S.k), p=S.primes[i];
      let lost=0;
      {const[a,b]=S.assign[i];
        for(let pos=(a===0?p:a);pos<=S.m;pos+=p) if(S.cover[pos]===1) lost++;
        if(b!==a) for(let pos=(b===0?p:b);pos<=S.m;pos+=p) if(S.cover[pos]===1) lost++;}
      const cnt=scratch; cnt.fill(0,0,p);
      for(let j=0;j<S.holes.length;j++) cnt[S.holes[j]%p]++;
      let gain,pair;
      if(S.mode==='free'){
        const a=u%p; let bb=a,bc=-1;
        for(let r=0;r<p;r++){if(r===a)continue;if(cnt[r]>bc){bc=cnt[r];bb=r;}}
        gain=cnt[a]+(bb!==a?bc:0); pair=[a,bb];
      } else {
        const o1=u%p,o2=(u+2)%p;
        const s1=cnt[o1]+cnt[(o1+p-2)%p], s2=cnt[o2]+cnt[(o2+p-2)%p];
        if(s1>=s2){gain=s1;pair=[o1,(o1+p-2)%p];}else{gain=s2;pair=[o2,(o2+p-2)%p];}
      }
      const d=lost-gain;
      if(d<bestDelta){bestDelta=d;chosenI=i;chosenPair=pair;}
    }
    if(rng()<0.15){ // noise move
      const i=Math.floor(rng()*S.k), p=S.primes[i];
      const cnt=scratch; cnt.fill(0,0,p);
      for(let j=0;j<S.holes.length;j++) cnt[S.holes[j]%p]++;
      if(S.mode==='free'){
        const a=u%p; let bb=a,bc=-1;
        for(let r=0;r<p;r++){if(r===a)continue;if(cnt[r]>bc){bc=cnt[r];bb=r;}}
        setPair(S,i,a,bb);
      } else {
        const a=u%p; setPair(S,i,a,(a+p-2)%p);
      }
    } else setPair(S,chosenI,chosenPair[0],chosenPair[1]);
    if(S.holes.length<bestCost){bestCost=S.holes.length;stagnation=0;} else stagnation++;
    if(stagnation>4000){
      for(let t=0;t<2;t++){
        const i=Math.floor(rng()*S.k), p=S.primes[i];
        const a=Math.floor(rng()*p);
        setPair(S,i,a,S.mode==='twin'?(a+p-2)%p:Math.floor(rng()*p));
      }
      stagnation=0; bestCost=S.holes.length;
    }
  }
  return true;
}
function rampLadder(primes,mode,mCap,stepBudget,rng){
  const S=makeState(primes,mode,mCap);
  const scratch=new Int32Array(primes[primes.length-1]);
  S.m=1;
  for(let i=0;i<S.k;i++){const p=primes[i];setPair(S,i,1%p,mode==='twin'?(1+p-2)%p:3%p);}
  S.holes.length=0; S.holeIdx.fill(-1,0,S.m+2);
  for(let pos=1;pos<=S.m;pos++) if(S.cover[pos]===0){S.holeIdx[pos]=S.holes.length;S.holes.push(pos);}
  let lastGood=0;
  while(S.m<=mCap){
    if(!solveM(S,stepBudget,rng,scratch)) break;
    lastGood=S.m;
    S.m++;
    if(S.m>mCap) break;
    let c=0;
    for(let i=0;i<S.k;i++){const p=primes[i];const[a,b]=S.assign[i];const r=S.m%p;if(r===a||r===b)c++;}
    S.cover[S.m]=c;
    if(c===0) holeAdd(S,S.m);
  }
  return {m:lastGood, capped:lastGood===mCap};
}
function walksatBest(primes,mode,mCap,stepBudget,restarts,seed){
  let best=0,capped=false;
  for(let R=0;R<restarts;R++){
    const rng=mulberry32(seed+R*7919);
    const r=rampLadder(primes,mode,mCap,stepBudget,rng);
    if(r.m>best){best=r.m;capped=r.capped;}
  }
  return {m:best,capped};
}

console.log('\n=== (D) WalkSAT lower bounds: calibration (n<=21) + extension (p<=199) ===');
const freeWS=[], twinWS=[];
{
  for(let n=3;n<=21;n++){
    const primes=ALLP.slice(0,n-2), p=primes[primes.length-1];
    const rF=walksatBest(primes,'free',Math.round(0.15*p*p+120),2e5,3,999+n*104729);
    const rT=walksatBest(primes,'twin',Math.round(0.15*p*p+120),2e5,3,999+n*104729);
    const o=OEIS072753[n-3];
    const te=twinExact[n-3]?twinExact[n-3][1]:null;
    console.log(`n=${n} p=${p}: FREE ws=${rF.m} (exact ${o}, ${(rF.m/o).toFixed(2)})  PAIR ws=${rT.m}${te!==null?` (exact ${te}, ${(rT.m/te).toFixed(2)})`:''}`);
    freeWS.push([p,rF.m]); twinWS.push([p,rT.m]);
  }
  for(const n of [25,30,35,40,46]){
    const primes=ALLP.slice(0,n-2), p=primes[primes.length-1];
    const rF=walksatBest(primes,'free',Math.round(0.15*p*p+150),4e5,3,999+n*104729);
    const rT=walksatBest(primes,'twin',Math.round(0.15*p*p+150),4e5,3,999+n*104729);
    console.log(`n=${n} p=${p}: FREE ws>=${rF.m}  m/p^2=${(rF.m/(p*p)).toFixed(4)}  m/(p ln^2 p)=${(rF.m/(p*Math.log(p)**2)).toFixed(3)} | PAIR ws>=${rT.m}  m/p^2=${(rT.m/(p*p)).toFixed(4)}  m/(p ln^2 p)=${(rT.m/(p*Math.log(p)**2)).toFixed(3)}`);
    freeWS.push([p,rF.m]); twinWS.push([p,rT.m]);
  }
}

// ---------------------------- (E) the REAL Scour: unshifted {0,-2} in (x, y]
console.log('\n=== (E) UNSHIFTED Scour reach in (y, y^2] vs shifted twin adversary ===');
{
  const jobs=[[3,100],[3,300],[3,1000],[13,169],[31,200],[31,500],[31,961],[31,3000],[31,9000],[97,9409],[199,39601]];
  for(const [x,y] of jobs){
    const primes=primesUpTo(y).filter(q=>q>x);
    const Nlo=y, Nhi=y*y, SEG=1<<23, seg=new Uint8Array(SEG);
    let run=0,best=0,bestEnd=-1,covered=0;
    for(let base=Nlo+1;base<=Nhi;base+=SEG){
      const len=Math.min(SEG,Nhi-base+1);
      seg.fill(0,0,len);
      for(const q of primes){
        let s=(q-(base%q))%q; for(let j=s;j<len;j+=q) seg[j]=1;
        s=((q-2-(base%q))%q+q)%q; for(let j=s;j<len;j+=q) seg[j]=1;
      }
      for(let j=0;j<len;j++){
        if(seg[j]){covered++;run++;if(run>best){best=run;bestEnd=base+j;}}
        else run=0;
      }
    }
    const total=Nhi-Nlo, rho=covered/total;
    const pred=Math.log(total*(1-rho))/Math.log(1/rho);
    // shifted lower bound: twin walksat on the same primes
    const rS=walksatBest(primes,'twin',6*primes.length+600,1e5,3,4242);
    let lnTile=0; for(const q of primes) lnTile+=Math.log(q);
    console.log(`(x,y]=(${x},${y}] #q=${primes.length}: L_unshifted=${best} (ends ${bestEnd} = ${(bestEnd/y).toFixed(2)}y) rho=${rho.toFixed(3)} BernoulliPred=${pred.toFixed(1)} | shifted>=${rS.m}${rS.capped?' (cap)':''} | L/y^2=${(best/(y*y)).toExponential(2)} | tile=e^${lnTile.toFixed(0)} vs scan y^2=e^${Math.log(y*y).toFixed(1)}`);
  }
}

// --------------------------------------------------------- (F) growth fits
console.log('\n=== (F) growth fits ===');
{
  const oe=OEIS072753.map((m,i)=>[ALLP[i],m]);
  const f1=fitLoglog(oe), f1b=fitLoglog(oe.filter(([p])=>p>=23));
  console.log(`FREE exact (A072753, p=5..73): slope=${f1.slope.toFixed(2)}; p>=23: slope=${f1b.slope.toFixed(2)}`);
  const f2=fitLoglog(twinExact.filter(([p])=>p>=13));
  console.log(`PAIRED exact (ours, p=13..${twinExact[twinExact.length-1][0]}): slope=${f2.slope.toFixed(2)}`);
  const f3=fitLoglog(freeWS.filter(([p])=>p>=97)), f4=fitLoglog(twinWS.filter(([p])=>p>=97));
  console.log(`FREE walksat LB (p=97..199): slope=${f3.slope.toFixed(2)};  PAIRED walksat LB: slope=${f4.slope.toFixed(2)}  (heuristic track only)`);
  console.log('\nzone margin, FREE exact: (6m+6)/(p^2-p)  [ZM Conjecture 6 ceiling]');
  for(const n of [3,6,10,15,18,21]){
    const p=ALLP[n-3], m=OEIS072753[n-3];
    console.log(`  n=${n} p=${p}: ${((6*m+6)/(p*p-p)).toFixed(3)}`);
  }
  console.log('normalized, FREE exact: m/p^2 and m/(p ln^2 p)');
  for(const n of [6,10,15,21]){
    const p=ALLP[n-3], m=OEIS072753[n-3];
    console.log(`  n=${n} p=${p}: m/p^2=${(m/(p*p)).toFixed(4)}  m/(p ln^2 p)=${(m/(p*Math.log(p)**2)).toFixed(3)}`);
  }
  console.log('normalized, PAIRED exact: m/p^2 and PAIRED/FREE ratio');
  for(const [p,m] of twinExact){
    const i=ALLP.indexOf(p), free=OEIS072753[i];
    console.log(`  p=${p}: m=${m}  m/p^2=${(m/(p*p)).toFixed(4)}  paired/free=${(m/free).toFixed(2)}`);
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack2-rankin2d.js
//   invocation:  node research/attack2-rankin2d.js
//   code-sha256: 2d07a9c81b25c988dd1c363856bdba53c4cc060f6cacdbdadf6f5097c11fffbb
//   out-sha256:  2f9135966c58b398dc090720b9568ef9aa60157a835788b92a47f3a23dbfcf36
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     168.3 s
// ============================================================================
// === (A) EXACT optima: FREE pairs (=A072753) and PAIRED {a,a-2} (new) ===
// FREE  n=3 p=5: m=2 exact=true nodes=1 A072753=2 match=true 1ms
// FREE  n=4 p=7: m=4 exact=true nodes=1 A072753=4 match=true 0ms
// FREE  n=5 p=11: m=10 exact=true nodes=10 A072753=10 match=true 0ms
// FREE  n=6 p=13: m=24 exact=true nodes=121 A072753=24 match=true 3ms
// FREE  n=7 p=17: m=31 exact=true nodes=5423 A072753=31 match=true 12ms
// FREE  n=8 p=19: m=42 exact=true nodes=175074 A072753=42 match=true 231ms
// FREE  n=9 p=23: m=60 exact=true nodes=5964939 A072753=60 match=true 10286ms
// PAIR  n=3 p=5: m=1 exact=true nodes=1 (free=2, ratio 0.50) 0ms
// PAIR  n=4 p=7: m=4 exact=true nodes=1 (free=4, ratio 1.00) 0ms
// PAIR  n=5 p=11: m=9 exact=true nodes=11 (free=10, ratio 0.90) 0ms
// PAIR  n=6 p=13: m=13 exact=true nodes=113 (free=24, ratio 0.54) 0ms
// PAIR  n=7 p=17: m=24 exact=true nodes=599 (free=31, ratio 0.77) 3ms
// PAIR  n=8 p=19: m=32 exact=true nodes=3685 (free=42, ratio 0.76) 6ms
// PAIR  n=9 p=23: m=39 exact=true nodes=44405 (free=60, ratio 0.65) 44ms
// PAIR  n=10 p=29: m=52 exact=true nodes=410845 (free=74, ratio 0.70) 501ms
// PAIR  n=11 p=31: m=64 exact=true nodes=4320001 (free=94, ratio 0.68) 5857ms
// PAIR  n=12 p=37: m=84 exact=true nodes=50844729 (free=117, ratio 0.72) 77266ms
//
// === (B) Resta ILP optimum certificates re-verified ===
// cert m=148: covers [1,148] = true
// cert m=173: covers [1,173] = true
// cert m=213: covers [1,213] = true
// cert m=236: covers [1,236] = true
//
// === (C) CRT check: longest all-killed run in the {5..p_n}-tile ===
// n=3 p=5 period=5: longest run=1  exact PAIRED m=1  match=true
// n=4 p=7 period=35: longest run=4  exact PAIRED m=4  match=true
// n=5 p=11 period=385: longest run=9  exact PAIRED m=9  match=true
// n=6 p=13 period=5005: longest run=13  exact PAIRED m=13  match=true
// n=7 p=17 period=85085: longest run=24  exact PAIRED m=24  match=true
// n=8 p=19 period=1616615: longest run=32  exact PAIRED m=32  match=true
// n=9 p=23 period=37182145: longest run=39  exact PAIRED m=39  match=true
//
// === (D) WalkSAT lower bounds: calibration (n<=21) + extension (p<=199) ===
// n=3 p=5: FREE ws=2 (exact 2, 1.00)  PAIR ws=1 (exact 1, 1.00)
// n=4 p=7: FREE ws=4 (exact 4, 1.00)  PAIR ws=4 (exact 4, 1.00)
// n=5 p=11: FREE ws=10 (exact 10, 1.00)  PAIR ws=9 (exact 9, 1.00)
// n=6 p=13: FREE ws=24 (exact 24, 1.00)  PAIR ws=13 (exact 13, 1.00)
// n=7 p=17: FREE ws=31 (exact 31, 1.00)  PAIR ws=24 (exact 24, 1.00)
// n=8 p=19: FREE ws=42 (exact 42, 1.00)  PAIR ws=32 (exact 32, 1.00)
// n=9 p=23: FREE ws=56 (exact 60, 0.93)  PAIR ws=39 (exact 39, 1.00)
// n=10 p=29: FREE ws=74 (exact 74, 1.00)  PAIR ws=52 (exact 52, 1.00)
// n=11 p=31: FREE ws=84 (exact 94, 0.89)  PAIR ws=64 (exact 64, 1.00)
// n=12 p=37: FREE ws=100 (exact 117, 0.85)  PAIR ws=84 (exact 84, 1.00)
// n=13 p=41: FREE ws=123 (exact 148, 0.83)  PAIR ws=100
// n=14 p=43: FREE ws=136 (exact 173, 0.79)  PAIR ws=118
// n=15 p=47: FREE ws=158 (exact 213, 0.74)  PAIR ws=132
// n=16 p=53: FREE ws=169 (exact 236, 0.72)  PAIR ws=147
// n=17 p=59: FREE ws=190 (exact 275, 0.69)  PAIR ws=164
// n=18 p=61: FREE ws=202 (exact 316, 0.64)  PAIR ws=179
// n=19 p=67: FREE ws=224 (exact 364, 0.62)  PAIR ws=198
// n=20 p=71: FREE ws=250 (exact 409, 0.61)  PAIR ws=209
// n=21 p=73: FREE ws=277 (exact 436, 0.64)  PAIR ws=226
// n=25 p=97: FREE ws>=371  m/p^2=0.0394  m/(p ln^2 p)=0.183 | PAIR ws>=300  m/p^2=0.0319  m/(p ln^2 p)=0.148
// n=30 p=113: FREE ws>=479  m/p^2=0.0375  m/(p ln^2 p)=0.190 | PAIR ws>=383  m/p^2=0.0300  m/(p ln^2 p)=0.152
// n=35 p=149: FREE ws>=623  m/p^2=0.0281  m/(p ln^2 p)=0.167 | PAIR ws>=486  m/p^2=0.0219  m/(p ln^2 p)=0.130
// n=40 p=173: FREE ws>=764  m/p^2=0.0255  m/(p ln^2 p)=0.166 | PAIR ws>=590  m/p^2=0.0197  m/(p ln^2 p)=0.128
// n=46 p=199: FREE ws>=911  m/p^2=0.0230  m/(p ln^2 p)=0.163 | PAIR ws>=718  m/p^2=0.0181  m/(p ln^2 p)=0.129
//
// === (E) UNSHIFTED Scour reach in (y, y^2] vs shifted twin adversary ===
// (x,y]=(3,100] #q=23: L_unshifted=38 (ends 9340 = 93.40y) rho=0.871 BernoulliPred=51.9 | shifted>=299 | L/y^2=3.80e-3 | tile=e^82 vs scan y^2=e^9.2
// (x,y]=(3,300] #q=60: L_unshifted=109 (ends 75901 = 253.00y) rho=0.914 BernoulliPred=99.3 | shifted>=960 (cap) | L/y^2=1.21e-3 | tile=e^275 vs scan y^2=e^11.4
// (x,y]=(3,1000] #q=166: L_unshifted=167 (ends 2548 = 2.55y) rho=0.942 BernoulliPred=182.6 | shifted>=1596 (cap) | L/y^2=1.67e-4 | tile=e^954 vs scan y^2=e^13.8
// (x,y]=(13,169] #q=33: L_unshifted=24 (ends 310 = 1.83y) rho=0.675 BernoulliPred=23.2 | shifted>=153 | L/y^2=8.40e-4 | tile=e^142 vs scan y^2=e^10.3
// (x,y]=(31,200] #q=35: L_unshifted=21 (ends 36582 = 182.91y) rho=0.540 BernoulliPred=15.9 | shifted>=91 | L/y^2=5.25e-4 | tile=e^163 vs scan y^2=e^10.6
// (x,y]=(31,500] #q=84: L_unshifted=34 (ends 5565 = 11.13y) rho=0.643 BernoulliPred=25.8 | shifted>=296 | L/y^2=1.36e-4 | tile=e^449 vs scan y^2=e^12.4
// (x,y]=(31,961] #q=151: L_unshifted=60 (ends 1858 = 1.93y) rho=0.694 BernoulliPred=34.4 | shifted>=625 | L/y^2=6.50e-5 | tile=e^889 vs scan y^2=e^13.7
// (x,y]=(31,3000] #q=419: L_unshifted=111 (ends 5412 = 1.80y) rho=0.762 BernoulliPred=53.6 | shifted>=2333 | L/y^2=1.23e-5 | tile=e^2906 vs scan y^2=e^16.0
// (x,y]=(31,9000] #q=1106: L_unshifted=183 (ends 13668 = 1.52y) rho=0.810 BernoulliPred=78.6 | shifted>=7236 (cap) | L/y^2=2.26e-6 | tile=e^8844 vs scan y^2=e^18.2
// (x,y]=(97,9409] #q=1138: L_unshifted=72 (ends 18687 = 1.99y) rho=0.711 BernoulliPred=50.0 | shifted>=4753 | L/y^2=8.13e-7 | tile=e^9206 vs scan y^2=e^18.3
// (x,y]=(199,39601] #q=4118: L_unshifted=136 (ends 66739 = 1.69y) rho=0.709 BernoulliPred=57.9 | shifted>=16900 | L/y^2=8.67e-8 | tile=e^39168 vs scan y^2=e^21.2
//
// === (F) growth fits ===
// FREE exact (A072753, p=5..73): slope=1.95; p>=23: slope=1.78
// PAIRED exact (ours, p=13..37): slope=1.69
// FREE walksat LB (p=97..199): slope=1.21;  PAIRED walksat LB: slope=1.16  (heuristic track only)
//
// zone margin, FREE exact: (6m+6)/(p^2-p)  [ZM Conjecture 6 ceiling]
//   n=3 p=5: 0.900
//   n=6 p=13: 0.962
//   n=10 p=29: 0.554
//   n=15 p=47: 0.594
//   n=18 p=61: 0.520
//   n=21 p=73: 0.499
// normalized, FREE exact: m/p^2 and m/(p ln^2 p)
//   n=6 p=13: m/p^2=0.1420  m/(p ln^2 p)=0.281
//   n=10 p=29: m/p^2=0.0880  m/(p ln^2 p)=0.225
//   n=15 p=47: m/p^2=0.0964  m/(p ln^2 p)=0.306
//   n=21 p=73: m/p^2=0.0818  m/(p ln^2 p)=0.324
// normalized, PAIRED exact: m/p^2 and PAIRED/FREE ratio
//   p=5: m=1  m/p^2=0.0400  paired/free=0.50
//   p=7: m=4  m/p^2=0.0816  paired/free=1.00
//   p=11: m=9  m/p^2=0.0744  paired/free=0.90
//   p=13: m=13  m/p^2=0.0769  paired/free=0.54
//   p=17: m=24  m/p^2=0.0830  paired/free=0.77
//   p=19: m=32  m/p^2=0.0886  paired/free=0.76
//   p=23: m=39  m/p^2=0.0737  paired/free=0.65
//   p=29: m=52  m/p^2=0.0618  paired/free=0.70
//   p=31: m=64  m/p^2=0.0666  paired/free=0.68
//   p=37: m=84  m/p^2=0.0614  paired/free=0.72
// READINGS
// 0. THE HAND-WRITTEN SUMMARY OF THE 2026-08-14 RUNS, kept verbatim.
//    It stood inside the OUTPUT region until 2026-08-19 and was the only
//    thing there: sections (A) to (F) are a reading of TWO invocations, the
//    default `node research/attack2-rankin2d.js` (2 m 42 s) and
//    `node research/attack2-rankin2d.js --deep` (FREE n = 10, 586 s, and
//    PAIRED n = 13, 20.5 min), and no single run prints them. The OUTPUT
//    block above is now the default invocation, recorded by qc/embed.js; the
//    figures below that it does not contain are the two --deep results
//    (FREE n = 10 nodes 3.49e8, PAIRED n = 13 m = 100 at 7.55e8 nodes) and
//    the arithmetic this summary does on printed columns.
//
//    "OUTPUT (default run of 2026-08-14, 2 m 42 s; --deep results recorded
//    from the deep runs of the same day):"
//
//    (A) EXACT.
//    FREE  (n=3..10, p=5..29): m = 2, 4, 10, 24, 31, 42, 60, 74
//      — all 8 match A072753 ab initio (no ILP, no OEIS input to the search).
//      nodes: 1, 1, 10, 121, 5.4e3, 1.75e5, 5.96e6 (10 s), 3.49e8 (n=10, 586 s,
//      --deep). n=11 projected ~10 h — beyond this engine; the four ILP-era
//      terms with published certificates are verified in (B) instead. The two
//      intermediate terms (94, 117) rest on the OEIS/ILP record alone.
//    PAIR  (n=3..13, p=5..41): m = 1, 4, 9, 13, 24, 32, 39, 52, 64, 84, 100
//      nodes at n=12: 5.08e7 (75 s); n=13: 7.55e8 (20.5 min, --deep). NEW DATA:
//      this ladder (twin-shaped two-class covering optimum) is in no OEIS entry.
//    (B) All four published Resta certificates (m=148, 173, 213, 236) cover
//      [1,m] exactly as claimed — the ILP-era terms verified.
//    (C) CRT check: tile longest-run = 1, 4, 9, 13, 24, 32, 39 for n=3..9 —
//      EQUALS the exact PAIRED optimum at every level (periods up to 3.7e7
//      scanned; the 1.08e9 period of n=10 was scanned separately (3.9 s) and
//      gave 52, again equal). The paired adversary's shift freedom is exactly one
//      window slide over the product tile; solver and tile agree.
//    (D) WalkSAT calibration: PAIRED — heuristic equals the exact optimum at
//      EVERY known level n=4..13 (incl. deep n=13: ws=100 = exact 100).
//      FREE — heuristic exact to n=8 and at n=10, then degrades: 0.85 at n=12,
//      0.61-0.64 at n=19..21 (the ILP optima carry deep structure local search
//      misses). Extension (lower bounds), p=97,113,149,173,199:
//        FREE >= 371, 479, 623, 764, 911;  PAIRED >= 300, 383, 486, 590, 718.
//      Both heuristic tracks sit on the RANKIN scale: m/(p ln^2 p) = 0.16-0.19
//      (FREE) and 0.13-0.15 (PAIRED), while m/p^2 declines 0.039 -> 0.023.
//    (E) UNSHIFTED Scour ((x,y], scanning (y, y^2]):
//      (3,100]     #q=23   L=38  ends 0.93y^2 rho=0.871 pred 51.9 | shifted>=299       | L/y^2=3.8e-3
//      (3,300]     #q=60   L=109 ends 0.84y^2 rho=0.914 pred 99.3 | shifted>=960 (cap) | 1.2e-3
//      (3,1000]    #q=166  L=167 ends 2.5y    rho=0.942 pred 183  | shifted>=1596 (cap)| 1.7e-4
//      (13,169]    #q=33   L=24  ends 1.8y    rho=0.675 pred 23.2 | shifted>=153       | 8.4e-4
//      (31,200]    #q=35   L=21  ends 0.91y^2 rho=0.540 pred 15.9 | shifted>=91        | 5.3e-4
//      (31,500]    #q=84   L=34  ends 11y     rho=0.643 pred 25.8 | shifted>=296       | 1.4e-4
//      (31,961]    #q=151  L=60  ends 1.9y    rho=0.694 pred 34.4 | shifted>=625       | 6.5e-5
//      (31,3000]   #q=419  L=111 ends 1.8y    rho=0.762 pred 53.6 | shifted>=2333      | 1.2e-5
//      (31,9000]   #q=1106 L=183 ends 1.5y    rho=0.810 pred 78.6 | shifted>=7236 (cap)| 2.3e-6
//      (97,9409]   #q=1138 L=72  ends 2.0y    rho=0.711 pred 50.0 | shifted>=4753      | 8.1e-7
//      (199,39601] #q=4118 L=136 ends 1.7y    rho=0.709 pred 57.9 | shifted>=16900     | 8.7e-8
//      ((cap) = walksat hit its ramp cap; true shifted optimum larger. Tile
//      widths for these windows are e^82..e^39168 against scans of e^9..e^21.)
//    (F) FITS.
//      FREE exact slope (p=5..73): 1.95 overall, 1.78 on p>=23; m/p^2 declines
//        0.142 -> 0.082 while m/(p ln^2 p) RISES 0.23 -> 0.32: the exact
//        optimum rides a p^2/(log-correction) track, NOT the Rankin track.
//      Zone margin (6m+6)/(p^2-p): 0.90, 0.96, 0.55, 0.59, 0.52, 0.499 at
//        n=3,6,10,15,18,21 — the free adversary holds HALF the ZM ceiling.
//      PAIRED exact slope: 1.69 (p=13..37, default); 1.68 incl. deep p=41.
//        Same track as FREE; the difference-2 constraint costs a CONSTANT:
//        paired/free = 0.54, 0.77, 0.76, 0.65, 0.70, 0.68, 0.72, 0.68
//        (p=13..41), mean ~0.70 from p=17 on.
//      Heuristic tracks (p=97..199): FREE slope 1.21, PAIRED slope 1.16 —
//        polynomial-time constructions collapse onto ~0.17 p ln^2 p (Rankin).
//
// 1. A072753 REPRODUCED — AND ITS ROLE IN OUR NOTES SHARPENED. The first 8
//    terms (2,4,10,24,31,42,60,74) were recomputed ab initio by branch-and-
//    bound; Resta's four published optimum certificates (148/173/213/236)
//    verify; only 94 and 117 rest on the ILP record without independent
//    check. Two definitional points that matter for Q4 bookkeeping:
//    (i) A072753's two classes per prime are UNCONSTRAINED pairs — the twin
//    difference-2 shape enters only through the h2 = 6a+6 bridge (A288815);
//    (ii) the twin-shaped ladder itself (pairs {a, a-2}) is a DIFFERENT,
//    smaller sequence, computed exactly here for the first time:
//    1, 4, 9, 13, 24, 32, 39, 52, 64, 84, 100 (p=5..41). OEIS-absent —
//    a candidate for the program's next submission.
// 2. THE TWO-CLASS OPTIMUM GROWS AT ZONE SCALE, NOT RANKIN SCALE. Exact free
//    optima fit slope 1.8-1.95 with m/(p ln^2 p) still RISING at p=73, and
//    hold ~50% of the Ziller-Morack ceiling p^2 - p through n=21. One class
//    per prime buys ~ y log y (Erdos-Rankin); the second class buys a
//    QUADRATIC jump, not a polylog factor. The adversary's constructible
//    reach is p^2/(small correction) — the wall (G2 < p^2, the p^2 rule)
//    keeps only that thin correction as margin against CONSTRUCTIONS that
//    already exist. ZM Conjecture 6 lives on a factor-2 cushion.
// 3. THE TWIN SHAPE COSTS A CONSTANT, NOT AN EXPONENT. Forcing the pair to
//    be {a, a-2} multiplies the optimum by ~0.70 (stable across p=17..41,
//    slope unchanged ~1.7-1.8). The CRT check makes the object concrete:
//    this IS the longest all-killed run in the {5..p_n}-tile — the paired
//    adversary is the tile's own worst window, sought over the whole tile.
//    (Same family as our G2 ladder in 05, which stacks 2 and 3 as well.)
// 4. WHERE THE HARDNESS LIVES. Exact optima ride the p^2 track, but every
//    polynomial-time construction tried here (greedy, LNS, WalkSAT repair)
//    plateaus on the Rankin track ~0.17 p ln^2 p — the FREE heuristic slope
//    is 1.2 against the exact 1.8. This matches FGKMT Remark 7 (their
//    machinery gains at most small factors in dimension 2): the quadratic
//    reach exists but is only exhibited by exhaustive optimization; no
//    constructive method known (to them or to us) produces it. That is the
//    precise shape of the two-class literature gap (Q4.2 [ABSENT]).
// PRECISE DEFINITIONS for readings 5-6 (do not paraphrase loosely).
//   Scan integers n in (y, y^2]. Call n COVERED (by this Scour window (x,y])
//   iff n ≡ 0 or n ≡ -2 (mod q) for some prime q in (x,y] — i.e. q | n or
//   q | n+2. Call n a SURVIVOR iff BOTH n and n+2 avoid every window prime.
//   A SURVIVOR IS NOT NECESSARILY A TWIN PRIME (n or n+2 may still be
//   divisible by a prime <= x or > y, which the scan does not test); it is a
//   pair coprime to the window primes only. Actual twin primes ARE a subset
//   of survivors. L below = the longest run of consecutive COVERED integers
//   (equivalently: the longest SURVIVOR-FREE / candidate-free stretch), NOT
//   "twin-free" (a strictly weaker, less informative property) and NOT
//   "prime-free". Reporting L as survivor-free is the honest, stronger claim:
//   the Scour fails to clear even the broad candidate set, a fortiori the
//   sparse actual twins.
// 5. THE REAL SCOUR IS LOG-SCALE, NOT POLYNOMIAL-SCALE. With classes frozen
//    at {0,-2}, the longest SURVIVOR-FREE run in (y, y^2] is 21..183 across
//    all windows tried — the Bernoulli longest-run length ln N/ln(1/rho)
//    times a structural factor 1.3-2.4 that grows slowly with y. Once the
//    window holds >~100 primes, the record run sits at 1.5-2.5y, where the
//    small multiples 2q, 3q of the window primes crowd — the kill image's
//    dense head, the same object that digs the stratum. Reach vs the zone:
//    L/y^2 collapses 3.8e-3 -> 8.7e-8.
// 6. FREE-CHOICE vs REALITY, QUANTIFIED. On identical prime windows the
//    shift-free adversary (free to choose each prime's two killed classes)
//    achieves a survivor-free run 4x to 124x longer than the anchored Scour
//    (classes fixed at {0,-2}): ((13,169]: 153 vs 24; (31,961]: >=625 vs 60;
//    (97,9409]: >=4753 vs 72; (199,39601]: >=16900 vs 136), the gap widening
//    with y. The CRT collapse says WHY both are true at once: the shifted
//    optimum does occur somewhere in the full product tile — but the tile is
//    e^{theta(y)} wide and the scanned territory (y, y^2] is an exponentially
//    vanishing sliver of it (e^21 inside e^39168 at y=39601). The adversary's
//    zone-scale coverings exist and are unreachable: anchoring costs
//    everything. This is the two-moire argument's sliver logic, with the
//    adversary's side
//    now measured.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). Reading 0
// already declares the two --deep results and the summary's own arithmetic.
// This block accounts for the remaining figures, and for two false-positive
// classes that make this file's advisory count look worse than it is. No
// number above was changed.
//
// COVERED BY READING 0: 3.49e8 and 7.55e8 (the two --deep node counts), 20.5
//   (the PAIRED n = 13 wall time), and 1.08e9 (the n = 10 period, scanned
//   separately). Only the `--deep` invocation produces them.
//
// TOKENIZER ARTIFACT, not a figure at all — a hyphenated RANGE, whose second
//   endpoint the figure scanner reads as a negative number:
//   "0.61-0.64" -> -0.64, "0.16-0.19" -> -0.19, "0.13-0.15" -> -0.15,
//   "1.8-1.95" -> -1.95. All four endpoints are printed above, unsigned.
//   Comma-separated LISTS are read as one number the same way:
//   "p=97,113,149,173,199", "n=3,6,10,15,18,21" and the A072753 terms
//   "(2,4,10,24,31,42,60,74)". Every element of all three lists is printed.
//
// SAME VALUE, DIFFERENT NOTATION: 3.8e-3 [printed 3.80e-3], 8.4e-4 [8.40e-4],
//   6.5e-5 [6.50e-5].
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed first):
//   5423 -> 5.4e3, 175074 -> 1.75e5, 5964939 -> 5.96e6, 50844729 -> 5.08e7,
//   37182145 -> 3.7e7; the L/y^2 column 1.21e-3 -> 1.2e-3, 1.67e-4 -> 1.7e-4,
//   5.25e-4 -> 5.3e-4, 1.36e-4 -> 1.4e-4, 1.23e-5 -> 1.2e-5,
//   2.26e-6 -> 2.3e-6, 8.13e-7 -> 8.1e-7, 8.67e-8 -> 8.7e-8; the ends column
//   "ends 93.40y" -> 0.93y^2 and the rest of that column; 0.0818 -> 0.082,
//   0.225 -> 0.23, 0.167 -> 0.17.
//
// IN-CODE: 288815 is A288815, named in the code above the banner.
//
// DERIVED IN THIS READING: the exact-optima slopes 1.69 and 1.68, and the
//   "4x to 124x longer" comparison, from printed columns.
// ---------------------------------------------------------------------------
