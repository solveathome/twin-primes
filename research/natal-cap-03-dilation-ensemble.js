// ============================================================================
// NATAL CAP 03 — THE DILATION ENSEMBLE
// (attack 3 of the natal-cap series, 2026-08-14)
// ============================================================================
// SETUP. Tile level x: width W = x# (210, 2310, 30030, 510510 for x = 7, 11,
// 13, 17). Natal@5 set N_x = { r in [0,W) : r ≡ 11 or 17 (mod 30), and
// r mod p ∉ {0, p−2} for every tile prime 7 ≤ p ≤ x }. |N_x| = 10, 90, 990,
// 14850. The Scour = primes q with x < q ≤ √W; q strikes r ≡ 0 or −2 (mod q);
// gross(q) = # natal slots struck.
//
// KEY IDENTITY (verified EXACTLY below for every scour prime, every level):
// write each strike as r = q·m (type A) or r+2 = q·m (type B). The cofactors
// m live in [1, ~W/q] and form a DILATED SIBLING of the natal pattern:
//   type A:  m ≡ q⁻¹·{11,17} (mod 30),  m mod p ∉ {0, p−d_p}
//   type B:  m ≡ q⁻¹·{13,19} (mod 30),  m mod p ∉ {0, d_p}
// with d_p = 2·q⁻¹ mod p and u30 = q⁻¹ mod 30. So gross(q) is an INTERVAL
// COUNT (length ℓ = W/q) of a dilated copy of the natal structure, and the
// whole dependence on q beyond ℓ is the tuple (u30, d_7, …, d_x) — i.e. a
// point in the unit group of Z/W. Because u mod 30 and u mod p are
// independent as u ranges over units, the space of possible dilations is the
// FULL product: 8 · Π_{7≤p≤x}(p−1) = φ(W) tuples (48, 480, 5760, 92160).
// Every tuple IS q⁻¹ for infinitely many primes q (Dirichlet) — just not
// necessarily for a prime inside the scour window x < q ≤ √W.
//
// THE QUESTION. Over the whole ensemble of dilations, how bad can gross get
// at a given ℓ? Where do the ACTUAL scour primes sit — typical, hot, cold?
// Is there any systematic bias? And what does a "conspiratorial" dilation
// (what a TPC-damaging prime would have to be) look like arithmetically?
// Honest stakes up front: this is per-prime, per-level empirics. Even a
// clean answer ("actual primes are ensemble-typical, worst case is only
// modestly above mean") is NOT a proof about all levels — the scour window
// holds only ~π(√W) primes against φ(W) dilation classes, and whether primes
// q ≤ √W equidistribute in classes mod W is exactly the large-moduli wall
// (beyond Bombieri–Vinogradov). We measure what can be measured.
//
// PLAN.
//  (1) exact gross(q) for every scour q at x = 11, 13 (and 17).
//  (2) the ensemble per q: EXACT enumeration of all φ(W) dilation tuples at
//      x ≤ 13 (the sampled "virtual dilation" ensemble of the brief is a
//      subsample of this; we do 10^4 samples/q anyway to calibrate sampling
//      against truth). At x = 17 exact enumeration of 92160 tuples per q is
//      too slow for all 120 q, so: 3000 samples/q everywhere + exact
//      enumeration for three benchmark q (19, 101, 709).
//  (3) percentile of the actual q inside its own ensemble; bias tests.
//  (4) structure hunt in the extreme tail: argmax tuples, marginals of d_p
//      among the top 1%, closeness-to-0 and clustering statistics, and a
//      first-order "marginal dodge" model (is the worst tuple just the one
//      whose forbidden classes dodge the interval's heavy residues
//      independently across p, or is there deeper CRT conspiracy?).
//      Plus: the coherent unit u behind each worst tuple, its killer class
//      q* = u⁻¹ mod W, and the smallest actual prime in that class — how far
//      beyond the scour window does the conspiratorial prime live?
//  (5) ensemble max vs true max at x = 7 (48 tuples) and x = 11 (480), per
//      the brief; our exact runs extend that to x = 13 and spot-checks at 17.
//  (6) side experiment (echo of attack-06: offsets matter beyond density):
//      dilation ensemble vs independent-ROTATION ensemble (forbidden pair
//      {c_p, c_p+2}, gap locked to 2) at the same density — same interval
//      statistics or not?
// ============================================================================
'use strict';
const T0 = Date.now();

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const SMALL = primesUpTo(100000);
function isPrime(n){if(n<2)return false;for(const p of SMALL){if(p*p>n)return true;if(n%p===0)return n===p;}throw new Error('isPrime range');}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
function modinv(a,m){a=((a%m)+m)%m;const[g,x]=egcd(a,m);if(g!==1)throw new Error('no inverse');return((x%m)+m)%m;}
function mulberry32(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const U30=[1,7,11,13,17,19,23,29];
const pad=(v,w)=>String(v).padStart(w);
const f1=(v,w)=>v.toFixed(1).padStart(w), f2=(v,w)=>v.toFixed(2).padStart(w);

function buildLevel(x){
  const tileP = primesUpTo(x).filter(p=>p>=7);
  let W = 30; for(const p of tileP) W *= p;
  const natal = [];
  for(let r=11;r<W;r+=30){
    for(const rr of [r, r+6]){
      let ok = true;
      for(const p of tileP){ const m = rr%p; if(m===0||m===p-2){ ok=false; break; } }
      if(ok) natal.push(rr);
    }
  }
  natal.sort((a,b)=>a-b);
  const scour = primesUpTo(Math.floor(Math.sqrt(W))).filter(q=>q>x);
  return {x, W, tileP, natal, scour, phi: 8*tileP.reduce((a,p)=>a*(p-1),1)};
}

function actualGross(natal,q){let g=0;for(const r of natal){const a=r%q;if(a===0||a===q-2)g++;}return g;}

// gross of a virtual dilation (u30, ds[]) on the interval pair (MA, MB)
function virtualGross(tileP,u30,ds,MA,MB){
  const np=tileP.length;
  let total=0;
  for(let pass=0;pass<2;pass++){
    const M = pass===0?MA:MB;
    const c1 = ((pass===0?11:13)*u30)%30, c2 = ((pass===0?17:19)*u30)%30;
    for(const a of [c1,c2]){
      for(let m=a; m<=M; m+=30){
        let ok=true;
        for(let i=0;i<np;i++){
          const p=tileP[i], r=m%p;
          const f = pass===0 ? p-ds[i] : ds[i];   // second forbidden class (0 always forbidden)
          if(r===0||r===f){ ok=false; break; }
        }
        if(ok) total++;
      }
    }
  }
  return total;
}

function decodeTuple(idx,tileP){
  const u30=U30[idx%8]; idx=Math.floor(idx/8);
  const ds=new Array(tileP.length);
  for(let i=0;i<tileP.length;i++){ const p=tileP[i]; ds[i]=1+(idx%(p-1)); idx=Math.floor(idx/(p-1)); }
  return {u30,ds};
}
function actualTuple(q,tileP){
  return {u30: modinv(q,30), ds: tileP.map(p=>(2*modinv(q,p))%p)};
}
function crt(rems,mods){ // small moduli, coprime
  let R=0, M=1;
  for(let i=0;i<mods.length;i++){
    const m=mods[i], r=rems[i];
    const k=((r-R)%m+m)%m * modinv(M%m,m) % m;
    R+=M*k; M*=m;
  }
  return R;
}
function coherentUnit(u30,ds,tileP){ // the u in (Z/W)* whose dilation this tuple is; killer class q* = u^{-1} mod W
  const rems=[u30], mods=[30];
  for(let i=0;i<tileP.length;i++){ rems.push(ds[i]*modinv(2,tileP[i])%tileP[i]); mods.push(tileP[i]); }
  const W=mods.reduce((a,b)=>a*b,1);
  const u=crt(rems,mods);
  return {u, qstar: modinv(u,W), W};
}
function smallestPrimeInClass(a,mod){ let n=a===1?1+mod:a; if(n%2===0)n+=mod; for(let k=0;k<50000;k++,n+=mod){ if(isPrime(n)) return n; } return -1; }

// ---------------------------------------------------------------------------
// MAIN: exact ensembles at x = 7, 11, 13
// ---------------------------------------------------------------------------
const SAMPLES = 10000, rng = mulberry32(20260814);
const allPct = [];   // pooled percentiles for bias test
const allZ = [];

for(const x of [7,11,13]){
  const L = buildLevel(x);
  const {W,tileP,natal,scour,phi} = L;
  console.log(`\n===== @${x}: W=${W}, |N|=${natal.length}, scour q in [${scour[0]},${scour[scour.length-1]}] (${scour.length} primes), dilation space phi(W)=${phi} =====`);
  console.log('  q |   l  | actual | exact ensemble: mean    sd   min  max |    z    pct%  | samp1e4: mean  max');
  let sumActual=0, sumMax=0, sumMean=0;
  const perQ=[];
  for(const q of scour){
    const MA=Math.floor((W-1)/q), MB=Math.floor((W+1)/q);
    const actual = actualGross(natal,q);
    // verify the key identity: actual tuple reproduces gross exactly
    const at = actualTuple(q,tileP);
    const v = virtualGross(tileP,at.u30,at.ds,MA,MB);
    if(v!==actual) throw new Error(`IDENTITY FAIL @${x} q=${q}: virtual ${v} vs actual ${actual}`);
    // exact enumeration of the full dilation space
    let sum=0,sum2=0,min=Infinity,max=-1,below=0,eq=0,argmax=null;
    const counts=new Int32Array(phi);
    for(let idx=0;idx<phi;idx++){
      const t=decodeTuple(idx,tileP);
      const c=virtualGross(tileP,t.u30,t.ds,MA,MB);
      counts[idx]=c; sum+=c; sum2+=c*c;
      if(c<min)min=c;
      if(c>max){max=c;argmax=t;}
      if(c<actual)below++; else if(c===actual)eq++;
    }
    const mean=sum/phi, sd=Math.sqrt(sum2/phi-mean*mean);
    const pct=100*(below+0.5*eq)/phi, z=(actual-mean)/sd;
    // sampling (calibration of the sampled ensemble against exact truth)
    let smax=-1,ssum=0;
    for(let s=0;s<SAMPLES;s++){
      const u30=U30[(rng()*8)|0];
      const ds=tileP.map(p=>1+((rng()*(p-1))|0));
      const c=virtualGross(tileP,u30,ds,MA,MB);
      ssum+=c; if(c>smax)smax=c;
    }
    console.log(`${pad(q,4)} |${pad(Math.round(W/q),5)} | ${pad(actual,5)}  |            ${f2(mean,7)} ${f2(sd,5)} ${pad(min,4)} ${pad(max,4)} | ${f2(z,6)} ${f1(pct,6)}  |         ${f1(ssum/SAMPLES,5)} ${pad(smax,4)}`);
    sumActual+=actual; sumMax+=max; sumMean+=mean;
    allPct.push(pct); allZ.push(z);
    perQ.push({q,MA,MB,actual,mean,sd,min,max,pct,z,counts,argmax});
  }
  console.log(`  SUM: actual=${sumActual}  ensemble-mean=${sumMean.toFixed(1)}  worst-case(sum of per-q max)=${sumMax}  vs |N|=${natal.length}`);
  console.log(`  worst/mean per q ranges ${Math.min(...perQ.map(r=>r.max/r.mean)).toFixed(3)}..${Math.max(...perQ.map(r=>r.max/r.mean)).toFixed(3)}; actual beyond 99th pct: ${perQ.filter(r=>r.pct>=99).map(r=>r.q).join(',')||'none'}; below 1st: ${perQ.filter(r=>r.pct<=1).map(r=>r.q).join(',')||'none'}`);

  // ---------------- structure hunt (x=13 only; richest space) ----------------
  if(x===13){
    console.log('\n  --- structure of the extreme tail @13 ---');
    // (a) argmax tuple per q + its coherent unit and killer class
    console.log('   q | max tuple (u30; d7,d11,d13) | coherent u | killer class q*=u^-1 mod 30030 | smallest prime in class');
    for(const r of perQ){
      const t=r.argmax, cu=coherentUnit(t.u30,t.ds,tileP);
      const sp=smallestPrimeInClass(cu.qstar,cu.W);
      console.log(`  ${pad(r.q,3)} | (${pad(t.u30,2)}; ${t.ds.join(',').padEnd(8)}) | ${pad(cu.u,5)} | ${pad(cu.qstar,5)} | ${pad(sp,8)}  (scour window ends at ${Math.floor(Math.sqrt(W))})`);
    }
    // (b) marginals of d_p among the top-1% tuples, pooled over q, vs uniform
    //     stats: closeness of forbidden pair to 0:  min(d,p-d)/(p/2) in (0,1]
    //     clustering across p: stdev of d_p/p within a tuple
    const gather=(sel)=>{
      const dHist=tileP.map(p=>new Array(p-1).fill(0)); const uHist=new Array(8).fill(0);
      let n=0,close=0,clus=0;
      for(const r of perQ){
        const idxs=[...r.counts.keys()].sort((a,b)=>sel*(r.counts[b]-r.counts[a])).slice(0,Math.ceil(phi*0.01));
        for(const idx of idxs){
          const t=decodeTuple(idx,tileP); n++;
          uHist[U30.indexOf(t.u30)]++;
          const fr=t.ds.map((d,i)=>d/tileP[i]);
          const m=fr.reduce((a,b)=>a+b,0)/fr.length;
          clus+=Math.sqrt(fr.reduce((a,b)=>a+(b-m)*(b-m),0)/fr.length);
          t.ds.forEach((d,i)=>{ dHist[i][d-1]++; close+=Math.min(d,tileP[i]-d)/(tileP[i]/2)/tileP.length; });
        }
      }
      return {n,close:close/n,clus:clus/n,dHist,uHist};
    };
    const top=gather(1), bot=gather(-1);
    // uniform expectations for the two scalar stats
    const closeU=tileP.map(p=>{let s=0;for(let d=1;d<p;d++)s+=Math.min(d,p-d)/(p/2);return s/(p-1);}).reduce((a,b)=>a+b,0)/tileP.length;
    // The clustering statistic's all-space baseline, by exact enumeration of
    // every tuple (d_p)_{p in tileP} with d_p in 1..p-1. Reading 4(b) compares
    // the top tail against this number and it was never printed, so the reading
    // had nothing to cite: added 2026-08-20 (mismatch adjudication #34). The
    // guard is there because the product grows fast; at the @13 tile it is 720.
    const clusU=(()=>{
      let tot=1; for(const p of tileP) tot*=(p-1);
      if(tot>5e6) return NaN;
      let sum=0,cnt=0; const fr=new Array(tileP.length);
      const rec=(i)=>{
        if(i===tileP.length){
          const m=fr.reduce((a,b)=>a+b,0)/fr.length;
          sum+=Math.sqrt(fr.reduce((a,b)=>a+(b-m)*(b-m),0)/fr.length); cnt++; return;
        }
        for(let d=1;d<tileP[i];d++){ fr[i]=d/tileP[i]; rec(i+1); }
      };
      rec(0);
      return sum/cnt;
    })();
    console.log(`  top-1% pooled (${top.n} tuples): closeness-to-0 stat=${top.close.toFixed(3)} (uniform=${closeU.toFixed(3)}), clustering sd(d_p/p)=${top.clus.toFixed(3)}`);
    console.log(`  bot-1% pooled (${bot.n} tuples): closeness-to-0 stat=${bot.close.toFixed(3)},  clustering sd(d_p/p)=${bot.clus.toFixed(3)}`);
    console.log(`  all-space baselines (exact enumeration of every (d_p) tuple): closeness-to-0 ${closeU.toFixed(3)}, clustering sd(d_p/p) ${clusU.toFixed(4)}`);
    for(let i=0;i<tileP.length;i++)
      console.log(`  d_${tileP[i]} histogram top-1%: [${top.dHist[i].join(',')}]  bottom-1%: [${bot.dHist[i].join(',')}]  (uniform ~${(top.n/(tileP[i]-1)).toFixed(0)} each)`);
    console.log(`  u30 histogram top-1%: [${top.uHist.join(',')}]  bottom-1%: [${bot.uHist.join(',')}]  (uniform ~${(top.n/8).toFixed(0)})`);

    // (c) first-order "marginal dodge" model: corr(exact count, sum over p of
    //     first-order struck comb positions) over all 5760 tuples, few q's
    console.log('  marginal-dodge model r (exact count vs first-order strike total):');
    for(const r of perQ.filter(r=>[17,61,173].includes(r.q))){
      // per pass, per u30, per p: class counts of comb positions
      const cls={}; // cls[pass][u30][i][class]
      for(let pass=0;pass<2;pass++){ for(const u30 of U30){
        const M=pass===0?r.MA:r.MB;
        const key=pass+'_'+u30;
        cls[key]=tileP.map(p=>new Array(p).fill(0));
        for(const base of [((pass===0?11:13)*u30)%30,((pass===0?17:19)*u30)%30])
          for(let m=base;m<=M;m+=30) for(let i=0;i<tileP.length;i++) cls[key][i][m%tileP[i]]++;
      }}
      let sx=0,sy=0,sxx=0,syy=0,sxy=0;
      for(let idx=0;idx<phi;idx++){
        const t=decodeTuple(idx,tileP);
        let struck=0;
        for(let pass=0;pass<2;pass++){
          const c=cls[pass+'_'+t.u30];
          for(let i=0;i<tileP.length;i++){
            const p=tileP[i], f=pass===0?p-t.ds[i]:t.ds[i];
            struck+=c[i][0]+c[i][f];
          }
        }
        const xv=struck, yv=r.counts[idx];
        sx+=xv;sy+=yv;sxx+=xv*xv;syy+=yv*yv;sxy+=xv*yv;
      }
      const n=phi, cov=sxy/n-sx*sy/n/n, vx=sxx/n-(sx/n)**2, vy=syy/n-(sy/n)**2;
      console.log(`   q=${r.q}: r = ${(cov/Math.sqrt(vx*vy)).toFixed(4)}`);
    }
  }
  console.log(`  [t=${((Date.now()-T0)/1000).toFixed(1)}s]`);
}

// ---------------------------------------------------------------------------
// x = 17: sampled ensemble everywhere (3000/q), exact at three benchmark q
// ---------------------------------------------------------------------------
{
  const x=17, L=buildLevel(x), {W,tileP,natal,scour,phi}=L;
  const NS=3000;
  console.log(`\n===== @17: W=${W}, |N|=${natal.length}, scour q in [${scour[0]},${scour[scour.length-1]}] (${scour.length} primes), phi(W)=${phi}; sampled ensemble ${NS}/q =====`);
  const rows=[];
  for(const q of scour){
    const MA=Math.floor((W-1)/q), MB=Math.floor((W+1)/q);
    const actual=actualGross(natal,q);
    const at=actualTuple(q,tileP);
    if(virtualGross(tileP,at.u30,at.ds,MA,MB)!==actual) throw new Error(`IDENTITY FAIL @17 q=${q}`);
    let sum=0,sum2=0,min=Infinity,max=-1,below=0,eq=0;
    for(let s=0;s<NS;s++){
      const u30=U30[(rng()*8)|0], ds=tileP.map(p=>1+((rng()*(p-1))|0));
      const c=virtualGross(tileP,u30,ds,MA,MB);
      sum+=c;sum2+=c*c; if(c<min)min=c; if(c>max)max=c;
      if(c<actual)below++; else if(c===actual)eq++;
    }
    const mean=sum/NS, sd=Math.sqrt(sum2/NS-mean*mean);
    rows.push({q,actual,mean,sd,min,max,pct:100*(below+0.5*eq)/NS,z:(actual-mean)/sd});
  }
  for(const r of rows){ allPct.push(r.pct); allZ.push(r.z); }
  const hot=rows.filter(r=>r.pct>=99), cold=rows.filter(r=>r.pct<=1);
  console.log(`  mean pct over ${rows.length} q: ${(rows.reduce((a,r)=>a+r.pct,0)/rows.length).toFixed(1)}; mean z: ${(rows.reduce((a,r)=>a+r.z,0)/rows.length).toFixed(3)}`);
  console.log(`  q at/above 99th pct: ${hot.map(r=>`${r.q}(${r.pct.toFixed(1)})`).join(' ')||'none'}; at/below 1st: ${cold.map(r=>`${r.q}(${r.pct.toFixed(1)})`).join(' ')||'none'}`);
  const showQ=[19,101,353,709];
  for(const r of rows.filter(r=>showQ.includes(r.q)))
    console.log(`  q=${pad(r.q,3)}: actual=${pad(r.actual,4)} sampled mean=${f1(r.mean,6)} sd=${f2(r.sd,5)} min=${r.min} max=${r.max} z=${f2(r.z,5)} pct=${f1(r.pct,5)}`);
  console.log(`  SUM actual=${rows.reduce((a,r)=>a+r.actual,0)} vs |N|=${natal.length}; sum of sampled means=${rows.reduce((a,r)=>a+r.mean,0).toFixed(0)}; sum of sampled maxes=${rows.reduce((a,r)=>a+r.max,0)}`);
  // exact enumeration at benchmark q: sampled max vs TRUE max over all 92160
  for(const q of [19,101,709]){
    const MA=Math.floor((W-1)/q), MB=Math.floor((W+1)/q);
    let sum=0,sum2=0,min=Infinity,max=-1,argmax=null;
    const actual=actualGross(natal,q); let below=0,eq=0;
    for(let idx=0;idx<phi;idx++){
      const t=decodeTuple(idx,tileP);
      const c=virtualGross(tileP,t.u30,t.ds,MA,MB);
      sum+=c;sum2+=c*c; if(c<min)min=c; if(c>max){max=c;argmax=t;}
      if(c<actual)below++; else if(c===actual)eq++;
    }
    const mean=sum/phi, sd=Math.sqrt(sum2/phi-mean*mean);
    const srow=rows.find(r=>r.q===q);
    const cu=coherentUnit(argmax.u30,argmax.ds,tileP), sp=smallestPrimeInClass(cu.qstar,cu.W);
    console.log(`  EXACT @17 q=${q}: mean=${mean.toFixed(2)} sd=${sd.toFixed(2)} min=${min} TRUE max=${max} (sampled-${NS} max was ${srow.max}); actual pct=${(100*(below+0.5*eq)/phi).toFixed(2)}; worst tuple (${argmax.u30}; ${argmax.ds}) killer class q*=${cu.qstar}, smallest prime in class ${sp} [t=${((Date.now()-T0)/1000).toFixed(1)}s]`);
  }
}

// ---------------------------------------------------------------------------
// pooled bias test over all levels
// ---------------------------------------------------------------------------
{
  const n=allPct.length;
  const mp=allPct.reduce((a,b)=>a+b,0)/n;
  const stouffer=allZ.reduce((a,b)=>a+b,0)/Math.sqrt(n);
  const hi=allPct.filter(p=>p>50).length, lo=allPct.filter(p=>p<50).length;
  console.log(`\n===== BIAS TEST, all levels pooled: ${n} scour primes =====`);
  console.log(`  mean percentile ${mp.toFixed(1)} (unbiased: 50); above/below median: ${hi}/${lo}; Stouffer Z = ${stouffer.toFixed(2)}`);
  console.log(`  (caveat: the ${n} gross values share one natal set per level, so they are not fully independent draws)`);
}

// ---------------------------------------------------------------------------
// side experiment: dilation ensemble vs rotation ensemble (gap-2 forbidden
// pair), same density, type-A pattern only, interval [1, MA] — attack-06 echo
// ---------------------------------------------------------------------------
{
  const L=buildLevel(13), {W,tileP}=L;
  console.log(`\n===== dilation vs rotation ensemble @13 (type-A count only, same density) =====`);
  const countA=(comb1,comb2,forb,M)=>{ // forb[i] = pair [f1,f2] mod p
    let tot=0;
    for(const a of [comb1,comb2]) for(let m=(a===0?30:a);m<=M;m+=30){
      let ok=true;
      for(let i=0;i<tileP.length;i++){const r=m%tileP[i];if(r===forb[i][0]||r===forb[i][1]){ok=false;break;}}
      if(ok)tot++;
    }
    return tot;
  };
  for(const q of [17,61,173]){
    const M=Math.floor((W-1)/q);
    // dilation space: u30 in U30, d_p in 1..p-1, forbidden {0, p-d}
    let ds_=[0,0,0], stats=(arr)=>{const n=arr.length,m=arr.reduce((a,b)=>a+b,0)/n;const v=arr.reduce((a,b)=>a+(b-m)*(b-m),0)/n;return{m,sd:Math.sqrt(v),min:Math.min(...arr),max:Math.max(...arr)};};
    const dil=[];
    for(const u30 of U30) for(let d7=1;d7<7;d7++) for(let d11=1;d11<11;d11++) for(let d13=1;d13<13;d13++)
      dil.push(countA((11*u30)%30,(17*u30)%30,[[0,7-d7],[0,11-d11],[0,13-d13]],M));
    // rotation space: t30 in 0..29 (comb {11+t,17+t}), c_p in 0..p-1, forbidden {c,c+2}
    const rot=[];
    for(let t=0;t<30;t++) for(let c7=0;c7<7;c7++) for(let c11=0;c11<11;c11++) for(let c13=0;c13<13;c13++)
      rot.push(countA((11+t)%30,(17+t)%30,[[c7,(c7+2)%7],[c11,(c11+2)%11],[c13,(c13+2)%13]],M));
    const a=stats(dil), b=stats(rot);
    console.log(`  q=${pad(q,3)} (M=${M}): dilation(${dil.length}) mean=${a.m.toFixed(2)} sd=${a.sd.toFixed(2)} min=${a.min} max=${a.max} | rotation(${rot.length}) mean=${b.m.toFixed(2)} sd=${b.sd.toFixed(2)} min=${b.min} max=${b.max}`);
  }
}

console.log(`\ntotal runtime ${((Date.now()-T0)/1000).toFixed(1)}s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-03-dilation-ensemble.js
//   invocation:  node research/natal-cap-03-dilation-ensemble.js
//   code-sha256: 6b1a3982c76ff85dcd159f5c5aa0cc6be3bd84dcbb9c815b0fb4ef8290cd1288
//   out-sha256:  c5a433616a27dc61e0da74eb83f5c9f0b7e1476d16d6232b83f91b540c8208ff
//   body-lines:  135
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     56.4 s
// ============================================================================
//
// ===== @7: W=210, |N|=10, scour q in [11,13] (2 primes), dilation space phi(W)=48 =====
//   q |   l  | actual | exact ensemble: mean    sd   min  max |    z    pct%  | samp1e4: mean  max
//   11 |   19 |     1  |               2.08  1.04    0    4 |  -1.04   18.8  |           2.1    4
//   13 |   16 |     2  |               1.25  0.60    0    2 |   1.26   83.3  |           1.3    2
//   SUM: actual=3  ensemble-mean=3.3  worst-case(sum of per-q max)=6  vs |N|=10
//   worst/mean per q ranges 1.600..1.920; actual beyond 99th pct: none; below 1st: none
//   [t=0.0s]
//
// ===== @11: W=2310, |N|=90, scour q in [13,47] (10 primes), dilation space phi(W)=480 =====
//   q |   l  | actual | exact ensemble: mean    sd   min  max |    z    pct%  | samp1e4: mean  max
//   13 |  178 |    13  |              13.88  0.93   11   16 |  -0.94   20.4  |          13.9   16
//   17 |  136 |    10  |              10.50  0.99    8   14 |  -0.50   33.8  |          10.5   14
//   19 |  122 |    10  |               9.75  0.81    8   12 |   0.31   60.4  |           9.8   12
//   23 |  100 |     8  |               7.88  1.11    5   10 |   0.11   54.0  |           7.9   10
//   29 |   80 |     7  |               6.75  0.92    4    9 |   0.27   58.5  |           6.8    9
//   31 |   75 |     6  |               6.38  1.10    4    9 |  -0.34   38.3  |           6.4    9
//   37 |   62 |     4  |               5.25  1.40    2    8 |  -0.89   22.5  |           5.3    8
//   41 |   56 |     5  |               4.50  0.96    2    7 |   0.52   67.9  |           4.5    7
//   43 |   54 |     5  |               4.50  0.96    2    7 |   0.52   67.9  |           4.5    7
//   47 |   49 |     5  |               4.13  1.14    1    7 |   0.76   76.3  |           4.1    7
//   SUM: actual=73  ensemble-mean=73.5  worst-case(sum of per-q max)=99  vs |N|=90
//   worst/mean per q ranges 1.153..1.697; actual beyond 99th pct: none; below 1st: none
//   [t=0.1s]
//
// ===== @13: W=30030, |N|=990, scour q in [17,173] (34 primes), dilation space phi(W)=5760 =====
//   q |   l  | actual | exact ensemble: mean    sd   min  max |    z    pct%  | samp1e4: mean  max
//   17 | 1766 |   115  |             116.88  1.59  112  123 |  -1.18   13.1  |         116.9  123
//   19 | 1581 |   102  |             104.16  1.85   99  110 |  -1.16   13.9  |         104.2  110
//   23 | 1306 |    87  |              86.28  1.57   81   92 |   0.46   66.5  |          86.3   92
//   29 | 1036 |    65  |              68.06  1.74   62   73 |  -1.76    4.5  |          68.1   73
//   31 |  969 |    61  |              63.25  1.78   57   69 |  -1.26   11.4  |          63.2   69
//   37 |  812 |    53  |              52.94  2.08   47   60 |   0.03   51.6  |          52.9   60
//   41 |  732 |    50  |              48.13  1.81   43   54 |   1.04   83.7  |          48.1   54
//   43 |  698 |    48  |              45.72  2.25   40   53 |   1.01   82.3  |          45.7   53
//   47 |  639 |    43  |              41.59  1.82   36   48 |   0.77   76.8  |          41.6   48
//   53 |  567 |    38  |              36.78  1.59   32   42 |   0.77   76.4  |          36.8   42
//   59 |  509 |    34  |              33.52  1.51   29   39 |   0.32   62.4  |          33.5   39
//   61 |  492 |    33  |              32.31  1.53   27   38 |   0.45   67.3  |          32.3   37
//   67 |  448 |    30  |              29.56  1.61   23   35 |   0.27   61.3  |          29.6   35
//   71 |  423 |    29  |              27.84  1.91   22   34 |   0.61   73.2  |          27.8   34
//   73 |  411 |    24  |              27.16  1.68   22   33 |  -1.88    3.4  |          27.1   33
//   79 |  380 |    26  |              25.09  1.52   20   31 |   0.59   73.1  |          25.1   31
//   83 |  362 |    23  |              24.06  1.66   18   30 |  -0.64   26.3  |          24.1   30
//   89 |  337 |    22  |              22.34  1.41   17   27 |  -0.24   40.4  |          22.3   27
//   97 |  310 |    19  |              20.28  1.36   16   26 |  -0.94   18.1  |          20.3   26
//  101 |  297 |    20  |              19.94  1.36   15   26 |   0.05   52.4  |          19.9   26
//  103 |  292 |    20  |              19.59  1.50   14   26 |   0.27   60.9  |          19.6   26
//  107 |  281 |    20  |              18.56  1.67   13   25 |   0.86   79.7  |          18.5   25
//  109 |  276 |    17  |              18.22  1.77   12   25 |  -0.69   25.6  |          18.2   25
//  113 |  266 |    15  |              17.53  1.48   12   23 |  -1.71    5.3  |          17.5   23
//  127 |  236 |    16  |              15.81  1.36   11   20 |   0.14   55.3  |          15.8   20
//  131 |  229 |    15  |              15.47  1.52   11   20 |  -0.31   40.8  |          15.5   20
//  137 |  219 |    14  |              14.44  1.15   11   18 |  -0.38   36.0  |          14.4   18
//  139 |  216 |    14  |              14.44  1.15   11   18 |  -0.38   36.0  |          14.5   18
//  149 |  202 |    14  |              14.09  1.12   11   18 |  -0.08   47.6  |          14.1   18
//  151 |  199 |    14  |              13.75  1.18   10   18 |   0.21   58.1  |          13.8   18
//  157 |  191 |    14  |              13.06  1.20    9   17 |   0.78   76.4  |          13.1   16
//  163 |  184 |    15  |              12.72  1.33    9   17 |   1.71   95.0  |          12.7   17
//  167 |  180 |    13  |              12.38  1.21    9   17 |   0.52   67.8  |          12.4   17
//  173 |  174 |    12  |              12.03  1.12    8   16 |  -0.03   48.2  |          12.0   16
//   SUM: actual=1135  ensemble-mean=1138.0  worst-case(sum of per-q max)=1321  vs |N|=990
//   worst/mean per q ranges 1.052..1.374; actual beyond 99th pct: none; below 1st: none
//
//   --- structure of the extreme tail @13 ---
//    q | max tuple (u30; d7,d11,d13) | coherent u | killer class q*=u^-1 mod 30030 | smallest prime in class
//    17 | (17; 1,10,6  ) |  2447 |  4013 |     4013  (scour window ends at 173)
//    19 | (17; 6,1,3   ) | 27737 | 28943 |    89003  (scour window ends at 173)
//    23 | (17; 1,10,6  ) |  2447 |  4013 |     4013  (scour window ends at 173)
//    29 | (19; 2,2,2   ) | 18019 | 18019 |    48049  (scour window ends at 173)
//    31 | (13; 2,5,5   ) |  1933 | 28057 |    28057  (scour window ends at 173)
//    37 | (11; 5,5,4   ) |    41 | 18311 |    18311  (scour window ends at 173)
//    41 | (23; 5,3,4   ) | 25703 | 10667 |    10667  (scour window ends at 173)
//    43 | (23; 5,3,4   ) | 25703 | 10667 |    10667  (scour window ends at 173)
//    47 | (23; 5,9,4   ) | 14783 | 13397 |    13397  (scour window ends at 173)
//    53 | (17; 4,5,3   ) |  4727 | 25043 |    55073  (scour window ends at 173)
//    59 | (11; 5,5,4   ) |    41 | 18311 |    18311  (scour window ends at 173)
//    61 | (11; 5,5,4   ) |    41 | 18311 |    18311  (scour window ends at 173)
//    67 | (11; 5,5,4   ) |    41 | 18311 |    18311  (scour window ends at 173)
//    71 | (11; 5,3,4   ) | 13691 |  4661 |   124781  (scour window ends at 173)
//    73 | (11; 5,8,4   ) | 24611 | 12851 |    72911  (scour window ends at 173)
//    79 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//    83 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//    89 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//    97 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   101 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   103 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   107 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   109 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   113 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   127 | ( 1; 1,2,1   ) | 28711 |  2641 |    62701  (scour window ends at 173)
//   131 | ( 1; 1,2,1   ) | 28711 |  2641 |    62701  (scour window ends at 173)
//   137 | ( 7; 6,1,1   ) |   787 | 18163 |    48193  (scour window ends at 173)
//   139 | ( 7; 6,1,1   ) |   787 | 18163 |    48193  (scour window ends at 173)
//   149 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   151 | ( 7; 1,2,1   ) |  4687 | 14653 |    14653  (scour window ends at 173)
//   157 | (23; 1,9,2   ) | 16433 | 19007 |    49037  (scour window ends at 173)
//   163 | (23; 1,9,2   ) | 16433 | 19007 |    49037  (scour window ends at 173)
//   167 | (23; 1,9,2   ) | 16433 | 19007 |    49037  (scour window ends at 173)
//   173 | (23; 1,9,2   ) | 16433 | 19007 |    49037  (scour window ends at 173)
//   top-1% pooled (1972 tuples): closeness-to-0 stat=0.475 (uniform=0.552), clustering sd(d_p/p)=0.192
//   bot-1% pooled (1972 tuples): closeness-to-0 stat=0.494,  clustering sd(d_p/p)=0.210
//   all-space baselines (exact enumeration of every (d_p) tuple): closeness-to-0 0.552, clustering sd(d_p/p) 0.1915
//   d_7 histogram top-1%: [491,426,127,125,413,390]  bottom-1%: [363,511,161,150,441,346]  (uniform ~329 each)
//   d_11 histogram top-1%: [209,367,146,113,170,182,113,138,333,201]  bottom-1%: [315,253,214,95,201,173,65,217,198,241]  (uniform ~197 each)
//   d_13 histogram top-1%: [404,319,195,275,145,60,53,110,173,70,79,89]  bottom-1%: [329,337,190,339,140,107,78,82,157,64,93,56]  (uniform ~164 each)
//   u30 histogram top-1%: [119,484,348,123,141,265,419,73]  bottom-1%: [291,129,55,452,432,92,120,401]  (uniform ~247)
//   marginal-dodge model r (exact count vs first-order strike total):
//    q=17: r = -0.0383
//    q=61: r = -0.2180
//    q=173: r = -0.5281
//   [t=2.4s]
//
// ===== @17: W=510510, |N|=14850, scour q in [19,709] (120 primes), phi(W)=92160; sampled ensemble 3000/q =====
//   mean pct over 120 q: 50.6; mean z: -0.003
//   q at/above 99th pct: 167(99.3); at/below 1st: 47(0.9) 59(0.9) 631(0.4)
//   q= 19: actual=1563 sampled mean=1563.7 sd= 3.11 min=1553 max=1573 z=-0.24 pct= 41.4
//   q=101: actual= 296 sampled mean= 293.9 sd= 2.54 min=284 max=303 z= 0.81 pct= 79.2
//   q=353: actual=  82 sampled mean=  82.8 sd= 2.16 min=75 max=90 z=-0.39 pct= 35.3
//   q=709: actual=  42 sampled mean=  41.8 sd= 2.04 min=36 max=48 z= 0.08 pct= 53.5
//   SUM actual=22132 vs |N|=14850; sum of sampled means=22135; sum of sampled maxes=23110
//   EXACT @17 q=19: mean=1563.79 sd=3.13 min=1551 TRUE max=1575 (sampled-3000 max was 1573); actual pct=40.64; worst tuple (13; 1,10,3,2) killer class q*=430747, smallest prime in class 430747 [t=50.1s]
//   EXACT @17 q=101: mean=293.91 sd=2.55 min=283 TRUE max=305 (sampled-3000 max was 303); actual pct=79.37; worst tuple (1; 2,7,4,4) killer class q*=137131, smallest prime in class 137131 [t=55.7s]
//   EXACT @17 q=709: mean=41.89 sd=2.04 min=35 TRUE max=50 (sampled-3000 max was 48); actual pct=52.76; worst tuple (11; 1,6,5,5) killer class q*=499151, smallest prime in class 499151 [t=56.2s]
//
// ===== BIAS TEST, all levels pooled: 166 scour primes =====
//   mean percentile 50.4 (unbiased: 50); above/below median: 94/72; Stouffer Z = -0.17
//   (caveat: the 166 gross values share one natal set per level, so they are not fully independent draws)
//
// ===== dilation vs rotation ensemble @13 (type-A count only, same density) =====
//   q= 17 (M=1766): dilation(5760) mean=58.44 sd=1.63 min=53 max=65 | rotation(30030) mean=58.22 sd=2.20 min=53 max=63
//   q= 61 (M=492): dilation(5760) mean=16.16 sd=1.38 min=11 max=22 | rotation(30030) mean=16.22 sd=1.68 min=12 max=21
//   q=173 (M=173): dilation(5760) mean=6.02 sd=0.98 min=2 max=8 | rotation(30030) mean=5.70 sd=1.09 min=3 max=9
//
// total runtime 56.4s
// ============================================================================
// READINGS
//
// 1. THE KEY IDENTITY IS EXACT, NOT APPROXIMATE. For all 166 scour primes
//    across all four levels, gross(q) equals the interval count of the
//    dilated sibling with tuple (q⁻¹ mod 30; 2q⁻¹ mod p) on [1, ~W/q] —
//    the script throws on any mismatch and none occurred. The ensemble of
//    "virtual dilations" is exactly the unit group (Z/W)*, φ(W) tuples,
//    and at x ≤ 13 we ENUMERATED it completely — the reported means, sds,
//    maxima and percentiles at 7/11/13 are exact, not sampled.
//
// 2. ACTUAL SCOUR PRIMES ARE ENSEMBLE-TYPICAL — A CLEAN NULL. Pooled over
//    166 primes: mean percentile 50.4 (unbiased = 50), Stouffer Z = −0.17,
//    94 above median vs 72 below. Not one prime at x ≤ 13 sits beyond the
//    99th percentile of its own exact ensemble (hottest: q=163 @13 at 95.0,
//    z=+1.71). At x=17, 1 of 120 exceeds the 99th (q=167, 99.3) and 3 sit
//    below the 1st — chance predicts ~1.2 on each side. Verdict: no
//    detectable conspiracy AND no protective bias. The primes' inverse
//    classes behave like random units at these levels. (Caveat: the 166
//    values share one natal set per level, so they are not iid draws.)
//
// 3. EVEN THE WORST POSSIBLE DILATION IS ONLY MODESTLY BAD, AND IT GETS
//    RELATIVELY TAMER AS LEVELS GROW. True max/mean over the FULL space:
//    @7: 1.60–1.92, @11: 1.15–1.70, @13: 1.05–1.37, @17 exact benchmarks:
//    q=19 → 1575/1563.8 = 1.007, q=101 → 1.038, q=709 → 1.19. These maxima
//    are UNCONDITIONAL per-position bounds: no prime of ANY residue class
//    in slot (q, ℓ=W/q) can strike more than the enumerated max. The scour
//    head (small q, long interval) is pinned to density — a maximally
//    conspiratorial prime at q=19 @17 beats the average by 0.7%. The
//    volatile end is the q ≈ √W tail (short intervals), and even its
//    worst/mean ratio shrinks level over level.
//
// 4. WHAT A CONSPIRATORIAL DILATION LOOKS LIKE — SUBTLER THAN EXPECTED.
//    (a) The brief's "forbidden classes aligned near 0" hypothesis is HALF
//    right: top-1% tuples have d_p strongly skewed to small values (d_7
//    hist [491,426,127,125,413,390] vs uniform 329; closeness stat 0.475
//    vs 0.552 uniform) — but so do the BOTTOM-1% tuples (0.494; d_7
//    [363,511,161,150,441,346]). Forbidden classes clustered near 0 buy
//    VARIANCE, not a guaranteed hot count: both extreme tails are built
//    from near-zero tuples, mid-range d_p (≈ p/2) is what makes a dilation
//    boring. (b) The "clustered classes" hypothesis fails: mean sd(d_p/p)
//    in the top tail is 0.192, against an all-space baseline of 0.1915
//    now printed beside it — no clustering at all;
//    the bottom tail is slightly LESS clustered (0.210). (c) The extremes
//    are a SECOND-ORDER effect: a first-order "marginal dodge" covariate
//    (total forbidden-class comb hits, the inclusion–exclusion head term)
//    correlates with the exact count at only r = −0.04 at ℓ=1766, −0.22 at
//    492, −0.53 at 173. At long intervals every class holds an almost
//    equal share, so the worst tuple wins via pairwise CRT interlock —
//    how strikes of different p land on each other — not by dodging heavy
//    classes one prime at a time. (d) The conspiracy is coarse, not tuned:
//    q = 79..113 and 149,151 @13 share the SAME argmax tuple (7; 1,2,1)
//    across a 2:1 range of interval lengths, and several argmax tuples are
//    near-coherent small-d (29 @13: d = (2,2,2), i.e. u ≡ 1 mod 1001).
//
// 5. THE CONSPIRATORIAL PRIME EXISTS — BEYOND THE TOOTH-LOSS THRESHOLD.
//    A scour prime q < W occupies dilation class q itself (q* = (q⁻¹)⁻¹ =
//    q mod W), so level-x scour reaches only the φ(W) classes that contain
//    a prime ≤ √W — i.e. ~π(√W) of them (34 of 5760 @13, 120 of 92160
//    @17). The worst tuples' killer classes @13 are 2641..28943 — every
//    one > √W = 173, so NO level-13 scour prime can realize its worst
//    dilation, by inspection. Dirichlet guarantees primes in each worst
//    class (4013, 10667, 14653, … @13; 137131, 430747, 499151 @17-spot),
//    but by the time they exist they are far past √W and toothless at this
//    level (self-strike only — and a self-strike is a twin FOUND). Honest
//    limit: this is inspection at four levels, not a theorem. Whether the
//    ~π(√W) small primes can avoid hot classes mod W forever is precisely
//    equidistribution at moduli larger than the prime range — the known
//    large-moduli wall (past Bombieri–Vinogradov), restated, not breached.
//
// 6. SAMPLING CALIBRATION (brief item 5). Sampled max = true max at every
//    q at x=7 (48 tuples) and x=11 (480). At x=13, 10^4 samples of the
//    5760-tuple space still missed the true max at q=61 (37 vs 38) and
//    q=157 (16 vs 17). At x=17, 3000 samples missed the exact max by 2 at
//    all three benchmarks (1573/1575, 303/305, 48/50). Moral: sampled
//    ensembles are reliable for mean/sd/percentile and mildly optimistic
//    about the extreme tail — worst-case claims need the enumeration.
//
// 7. DILATION ≠ ROTATION (attack-06 echo, now exact). Same density, same
//    interval, same class-count structure: the dilation family (forbidden
//    pair {0, d}) has sd 1.63 / 1.38 / 0.98 at M = 1766 / 492 / 173, the
//    gap-2 rotation family ({c, c+2}) has sd 2.20 / 1.68 / 1.09. The
//    family nature actually uses is measurably MORE concentrated than the
//    generic equal-density family — offsets matter beyond density, again,
//    and this time the arithmetic favors survival. Worth understanding
//    WHY {0,d} pairs tame the variance; unproven here.
//
// 8. WHAT THIS DOES NOT SHOW. Per-prime worst cases do not bound the JOINT
//    scour: Σ_q max gross already exceeds |N| at x=11 (99 vs 90) and @13
//    (1321 vs 990) — and even Σ actual gross @13 is 1135 > 990, yet
//    survivors exist because strikes overlap. Killing the tile is a
//    statement about the UNION, and this attack measured one prime at a
//    time. The live next question is joint: the tuples of the actual scour
//    primes are the classes of the small numbers q themselves — small
//    numbers are NOT independent random units (q and q' share no factor,
//    q⁻¹ mod p and q'⁻¹ mod p are algebraically linked through q'−q, …).
//    Measure the pairwise/joint correlation of strike overlaps between
//    consecutive scour primes against the product ensemble.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   the exact @17 q=19 ensemble mean 1563.79, quoted in reading 3 as 1563.8.
//   the three marginal-dodge correlations printed at the foot of the @13
//   section, r = -0.0383 at q=17, -0.2180 at q=61 and -0.5281 at q=173,
//   quoted in reading 4(c) as -0.04, -0.22 and -0.53.
// TOKENIZER ARTIFACT, not a figure:
//   "149,151" in reading 4(d) is a two-item list, not one number; both are
//   rows of the printed @13 argmax table and both carry the tuple (7; 1,2,1).
// DERIVED IN THIS READING by arithmetic over printed values:
//   the three max-over-mean ratios in reading 3 are the printed exact @17
//   benchmarks divided out: TRUE max 1575 over mean 1563.79 gives 1.007,
//   305 over 293.91 gives 1.038, and 50 over 41.89 gives 1.19.
//   1001 in reading 4(d) is the product of the three natal primes 7, 11 and
//   13; the printed coherent u for the q=29 row, 18019, is one more than a
//   multiple of it.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// RESOLVED 2026-08-20 (mismatch adjudication #34), by making the script print
// the baseline. Reading 4(b) said "mean sd(d_p/p) in the top tail is 0.192 =
// exactly the all-space baseline (0.192)". The 0.192 for the top tail is
// printed; the all-space baseline was not, anywhere in the run, and the figure
// advisory could not see the gap because 0.192 is present verbatim on the
// top-1% line. The claim turns out to be RIGHT: enumerating all 6 x 10 x 12 =
// 720 tuples (d_7, d_11, d_13) with d_p uniform on 1..p-1 gives a mean
// within-tuple sd(d_p/p) of 0.191545, which is 0.192 at the three decimals the
// reading used. The run now computes and prints it beside the closeness-to-0
// baseline it already printed, so the comparison has a source. Reading 4(b)
// now quotes the four-decimal 0.1915 rather than asserting an equality that
// three decimals happened to make exact.
// ---------------------------------------------------------------------------
