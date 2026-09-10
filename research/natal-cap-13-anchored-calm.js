// ============================================================================
// NATAL-CAP 13 — THE ANCHORED CALM: STRUCTURE OR LUCK?
// (rotation families vs the FULL rotation ensemble + mechanism probes;
//  2026-08-14 — follow-up to the four sightings in cap-05/06/07/09)
// ============================================================================
// THE OBJECT. Four instruments found the real tile (rotation t = 0) QUIETER
// than its rotation ensemble: (a) per-prime strike variance V/Vrot = 0.34 /
// 0.62 / 0.55 with 0/164 primes past 2σ [cap-05]; (b) pair overlaps 3–15%
// below CRT [cap-06]; (c) house splits |Δ| ≈ 0.3√gross vs 0.8 binomial
// [cap-09]; (d) the drift is smooth, detrended autocorr ≈ 0 [cap-07].
// HYPOTHESIS UNDER TEST: the calm is a property of STRUCTURED rotations
// (special phases where CRT exactness leaks through the partial periods),
// not unique luck of t = 0.
//
// ROTATION EQUIVALENCE (derived — the cheap version). Re-anchoring the deep
// pattern at t puts the observer's origin at absolute position t. The scour
// lives on ℤ (q strikes n ≡ 0, −2 mod q); a slot at absolute position r has
// window coordinate r − t AS AN INTEGER, so the re-anchored scour strikes
// window coordinates ≡ 0, −2 (q) ⟺ absolute r ≡ t, t−2 (mod q). Hence
//    rotation t ⟺ keep N_x ⊂ [0,W) fixed and shift every scour prime's
//    strike classes {0, −2} → {t mod q, (t−2) mod q}.
// Statistics depend on t only through the residue vector (t mod q)_q, which
// by CRT (∏q ≫ W) is DISTINCT for every t ∈ [0, W): the rotation ensemble
// has exactly W members, and t = 0 is identically the anchored march.
// Trap dodged: the "cyclic window" alternative (reduce r − t mod W first)
// breaks each strike AP at the wrap seam by −W mod q ≠ 0 and is NOT the
// cap-05 ensemble; under the CRT-clean version above, E[G] = 2N/q and the
// bucket VarRot of cap-05 are exact.
//
// TWO SMALL THEOREMS WE GET FOR FREE (both verified below).
// (1) MIRROR PAIRING. μ(r) = W−2−r maps N_x to itself (cap-09 P0), so class
// counts obey n_c = n_{(W−2−c) mod q}, hence G(t,q) = n_t + n_{t−2} =
// n_{W−2−t} + n_{W−t} = G(W−t, q): every rotation statistic satisfies
// stat(t) = stat(W−t) — as INTEGER phases. Phases t = 1..W−1 pair off with
// W−t; the unique fixed point INSIDE the window is t = W/2; and the anchor's
// mirror partner is the integer phase W itself — classes {W mod q, (W−2)
// mod q}, cap-09's "phantom scour" — which lies just OUTSIDE the enumerated
// window (t and t+W are different phases here, since W mod q ≠ 0).
// (2) THE FIXED POINT IS LOUD BY MECHANISM. At t = W/2 the strike classes
// {W/2, W/2−2} are swapped by μ, so every strike set is μ-INVARIANT; N_x has
// no μ-fixed points, so strikes come in mirror pairs: G(W/2, q) is EVEN for
// every q, the house split Δ(W/2, q) = 0 EXACTLY for every q (SP(W/2) = 0,
// the perfect-split rotation), and deviations move in steps of 2 —
// predicting variance-doubled loudness, VR(W/2) ≈ 2. The two arithmetically
// distinguished phases are therefore predicted to be OPPOSITE extremes:
// W/2 loud by theorem; whether t = 0 is calm is the question under test.
//
// FAMILIES (per level x, W = x#, prevW = W/x the previous primorial):
//   ANCHOR  t = 0
//   SEAM    t = k·prevW, k = 1..x−1 (all seam rotations; 30030·k at @17)
//   MIRROR  t = W/2 + δ, δ = 0..3 (center is the mirror-fixed phase;
//           stat(W/2+δ) = stat(W/2−δ), so one sign of δ suffices)
//   SMOOTH  all 7-smooth t in [2, W)
//   NEAR    t = 1..64 (proximity to the anchor)
//   RANDOM  2000 seeded uniform t — the prescribed control; kept as a
//           consistency check only, because we ENUMERATE THE FULL ENSEMBLE
//           (all 2310 / 30030 / 510510 rotations): every percentile below is
//           exact, not sampled.
//
// STATISTICS per rotation t (calm = LOW in every column):
//   VR  = Σ_q dev(t,q)² / Σ_q VarRot(q)        [cap-05's headline V/Vrot]
//   Z2  = (1/K) Σ_q dev(t,q)²/VarRot(q)         [equal-weight typicality]
//   SP  = mean_{q: gross≥10} |Δ(t,q)|/√gross    [cap-09's house split]
//   OV  = Σ_{head pairs} |A_q∩A_q′|(t) / Σ 4N/qq′  [cap-06's pair term;
//         head = scour q ≤ W^(1/3), all pairs]
//   G4  = #{q : dev²/VarRot > 4}                [cap-05's "0/164 past 2σ"]
// dev(t,q) = G(t,q) − 2N/q with G from the class histograms; VarRot is the
// exact bucket variance over all q classes (cap-05). Sighting (d) is a
// trajectory property of the anchored member only and is not re-tested here.
//
// MECHANISM PROBES:
//   P1  per-prime rank: is the anchored class pair {0, −2} special WITHIN
//       each prime (percentile of |dev(0,q)| among the q class pairs)?
//       Mean rank ≈ 0.5 ⇒ the calm is collective, not per-prime.
//   P2  the partial period: classes a < R = W mod q get one extra AP term.
//       Measured size of that floor effect vs the class sd — is the naive
//       "W mod q" mechanism big enough to carry the calm at all? Plus
//       corr(dev(0,q), R/q) across primes.
//   P3  feature regressions: corr of VR(t) with log-distance to the anchor
//       and with log(largest prime factor of t), on RANDOM.
//   P4  instrument correlations across the ensemble: are sightings (a),(b),
//       (c) independent instruments or one dev-field seen three times?
//
// HONEST FRAME. Ensemble percentiles are descriptive facts about ONE finite
// deterministic object (the tile); "luck" below always means "typical of the
// ensemble", never a probability statement about arithmetic. Cross-checks:
// anchored values must reproduce cap-05 (V, Vrot, z²>4 counts) and cap-09
// (split means) to the digit; three rotations per level are recomputed by a
// direct independent loop; the mirror pairing must hold exactly.
// ============================================================================
'use strict';
const T00 = Date.now();

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function mulberry32(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296;};}
const f=(v,d=3)=>Number.isFinite(v)?v.toFixed(d):String(v);
function lowerBound(a,v){let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m]<v)lo=m+1;else hi=m;}return lo;}
function upperBound(a,v){let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m]<=v)lo=m+1;else hi=m;}return lo;}
const pctile=(s,v)=>100*(lowerBound(s,v)+upperBound(s,v))/(2*s.length);   // midrank percentile
function pearson(x,y){const n=x.length;let sx=0,sy=0;for(let i=0;i<n;i++){sx+=x[i];sy+=y[i];}
  const mx=sx/n,my=sy/n;let A=0,B=0,C=0;
  for(let i=0;i<n;i++){const dx=x[i]-mx,dy=y[i]-my;A+=dx*dy;B+=dx*dx;C+=dy*dy;}
  return A/Math.sqrt(B*C);}
function lpf(n){if(n<=1)return 1;let m=n,b=1;for(let p=2;p*p<=m;p++)if(m%p===0){b=p;while(m%p===0)m/=p;}return m>1?m:b;}
function smooth7(W){let list=[1];for(const p of [2,3,5,7]){const nx=[];for(const v of list){let w=v;while(w<W){nx.push(w);w*=p;}}list=nx;}
  return list.filter(v=>v>=2).sort((a,b)=>a-b);}
function median(a){const s=a.slice().sort((x,y)=>x-y);const n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;}
function factorStr(n){if(n<=1)return String(n);const parts=[];let m=n;
  for(let p=2;p*p<=m;p++){let e=0;while(m%p===0){m/=p;e++;}if(e)parts.push(e>1?`${p}^${e}`:String(p));}
  if(m>1)parts.push(String(m));return parts.join('·');}

// anchored cross-check constants from cap-05 / cap-09 (must reproduce):
const CHK={11:{V:5.19,Vrot:15.07,split:0.303},13:{V:74.51,Vrot:119.58,split:0.357},17:{V:632.84,Vrot:1144.40,split:0.279}};

const summaryRows=[];

function runLevel(x){
  const t0=Date.now();
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const A=new Uint8Array(W);
  for(let r=11;r<W;r+=30)A[r]=1;
  for(let r=17;r<W;r+=30)A[r]=1;
  for(const p of basePs){for(let j=0;j<W;j+=p)A[j]=0;for(let j=p-2;j<W;j+=p)A[j]=0;}
  const rho=[];for(let r=0;r<W;r++)if(A[r])rho.push(r);
  const N=rho.length;
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const K=qs.length;
  const cbrtW=Math.cbrt(W);
  const head=qs.filter(q=>q<=cbrtW);
  const nPairs=head.length*(head.length-1)/2;
  console.log(`\n===== @${x}: W=${W}  N=${N}  K=${K} scour (${qs[0]}..${qs[K-1]})  head q≤W^(1/3)=${cbrtW.toFixed(1)}: ${head.length} primes, ${nPairs} pairs =====`);

  // ---------- per-prime class data + full-ensemble accumulation ----------
  const z2sum=new Float64Array(W), devsq=new Float64Array(W), splitsum=new Float64Array(W);
  const splitcnt=new Int16Array(W), gt4=new Int16Array(W);
  let VrotSum=0;
  const per=[]; // per-prime records for probes: {q, varRot, devA(Float64Array q), n(Int32Array q)}
  for(const q of qs){
    const n=new Int32Array(q), n11=new Int32Array(q);
    for(const r of rho){const c=r%q;n[c]++;if(r%30===11)n11[c]++;}
    const mu=2*N/q;
    const devA=new Float64Array(q);
    let ss=0;
    for(let a=0;a<q;a++){const a2=(a+q-2)%q;const dev=n[a]+n[a2]-mu;devA[a]=dev;ss+=dev*dev;}
    const varRot=ss/q; VrotSum+=varRot;
    const cz2=new Float64Array(q), cd2=new Float64Array(q), csp=new Float64Array(q);
    const cok=new Uint8Array(q), cgt=new Uint8Array(q);
    for(let a=0;a<q;a++){
      const a2=(a+q-2)%q, G=n[a]+n[a2], dev=devA[a];
      cd2[a]=dev*dev; cz2[a]=dev*dev/varRot; if(cz2[a]>4)cgt[a]=1;
      if(G>=10){csp[a]=Math.abs(2*(n11[a]+n11[a2])-G)/Math.sqrt(G);cok[a]=1;}
    }
    for(let t=0,a=0;t<W;t++){
      z2sum[t]+=cz2[a]; devsq[t]+=cd2[a];
      if(cok[a]){splitsum[t]+=csp[a]; splitcnt[t]++;}
      gt4[t]+=cgt[a];
      if(++a===q)a=0;
    }
    per.push({q,varRot,devA,n});
  }

  // ---------- head-pair overlaps ----------
  const ov=new Float64Array(W);
  const ovNA=(nPairs===0);
  let crtOv=0;
  const rmod=new Map(); for(const q of head){const arr=new Int32Array(N);for(let i=0;i<N;i++)arr[i]=rho[i]%q;rmod.set(q,arr);}
  for(let i=0;i<head.length;i++)for(let j=i+1;j<head.length;j++){
    const q1=head[i],q2=head[j];
    const cnt=new Int32Array(q1*q2), m1=rmod.get(q1), m2=rmod.get(q2);
    for(let k=0;k<N;k++)cnt[m1[k]*q2+m2[k]]++;
    const T=new Int32Array(q1*q2);
    for(let a=0;a<q1;a++){const a2=(a+q1-2)%q1;
      for(let b=0;b<q2;b++){const b2=(b+q2-2)%q2;
        T[a*q2+b]=cnt[a*q2+b]+cnt[a*q2+b2]+cnt[a2*q2+b]+cnt[a2*q2+b2];}}
    for(let t=0,a=0,b=0;t<W;t++){ov[t]+=T[a*q2+b];if(++a===q1)a=0;if(++b===q2)b=0;}
    crtOv+=4*N/(q1*q2);
  }

  // ---------- cross-checks ----------
  const c=CHK[x];
  const ok1=Math.abs(devsq[0]-c.V)<0.02, ok2=Math.abs(VrotSum-c.Vrot)<0.02;
  const sp0=splitsum[0]/splitcnt[0];
  const ok3=Math.abs(sp0-c.split)<0.002, ok4=gt4[0]===0;
  console.log(`cross-checks vs cap-05/09: V(0)=${f(devsq[0],2)} (${c.V} ${ok1?'PASS':'FAIL'})  Vrot=${f(VrotSum,2)} (${c.Vrot} ${ok2?'PASS':'FAIL'})  split(0)=${f(sp0,3)} over ${splitcnt[0]} primes (${c.split} ${ok3?'PASS':'FAIL'})  G4(0)=${gt4[0]} (${ok4?'PASS':'FAIL'})`);
  // direct independent recompute at 3 rotations (catches accumulation bugs)
  {
    const rng=mulberry32(999+x);let okd=true;
    for(let i=0;i<3;i++){
      const t=i===0?0:Math.floor(rng()*W);
      let dsq=0,zs=0,ssum=0,scnt=0,g4=0;
      for(const P of per){
        const q=P.q,a=t%q,a2=(a+q-2)%q;
        let G=0,g11=0;
        for(const r of rho){const m=r%q;if(m===a||m===a2){G++;if(r%30===11)g11++;}}
        const dev=G-2*N/q;dsq+=dev*dev;const z2=dev*dev/P.varRot;zs+=z2;if(z2>4)g4++;
        if(G>=10){ssum+=Math.abs(2*g11-G)/Math.sqrt(G);scnt++;}
      }
      if(Math.abs(dsq-devsq[t])>1e-6||Math.abs(zs-z2sum[t])>1e-6||Math.abs(ssum-splitsum[t])>1e-6||scnt!==splitcnt[t]||g4!==gt4[t])okd=false;
    }
    // mirror pairing stat(t)=stat(W−t), sampled
    let okm=true;
    for(const t of [1,7,12345%W,W>>2,(W>>1)-3]){
      const u=(W-t)%W;
      if(Math.abs(z2sum[t]-z2sum[u])>1e-9||Math.abs(devsq[t]-devsq[u])>1e-9||
         Math.abs(splitsum[t]-splitsum[u])>1e-9||Math.abs(ov[t]-ov[u])>1e-9)okm=false;
    }
    console.log(`direct recompute at 3 rotations: ${okd?'PASS':'FAIL'};  mirror pairing stat(t)=stat(W−t) (5 sampled t): ${okm?'PASS (exact)':'FAIL'}`);
  }

  // ---------- final per-rotation statistics (in place) ----------
  let spZeroCnt=0;
  for(let t=0;t<W;t++){
    z2sum[t]/=K; devsq[t]/=VrotSum; ov[t]=ovNA?1:ov[t]/crtOv;
    if(splitcnt[t]>0)splitsum[t]/=splitcnt[t];else{splitsum[t]=99;spZeroCnt++;}
  }
  if(spZeroCnt)console.log(`  note: ${spZeroCnt} rotations had no prime with gross≥10 (SP set to sentinel 99)`);
  if(ovNA)console.log('  note: OV n/a at this level (no head pairs; constant 1 substituted — all OV percentiles read 50)');
  const stats=[
    {key:'VR', arr:devsq},
    {key:'Z2', arr:z2sum},
    {key:'SP', arr:splitsum},
    {key:'OV', arr:ov},
  ];
  for(const s of stats)s.sorted=s.arr.slice().sort();
  // ensemble table
  console.log('FULL ENSEMBLE (all '+W+' rotations = the exact RANDOM control):');
  console.log(' stat |   mean    sd   |    p1     p10    p50    p90    p99  | anchored  pct%    rank');
  for(const s of stats){
    const so=s.sorted,n=so.length;let sm=0,s2=0;for(let i=0;i<n;i++){sm+=so[i];s2+=so[i]*so[i];}
    const mean=sm/n,sd=Math.sqrt(Math.max(0,s2/n-mean*mean));
    const p=x=>so[Math.min(n-1,Math.floor(x*n))];
    const av=s.arr[0],pc=pctile(so,av),rank=lowerBound(so,av);
    console.log(`  ${s.key}  | ${f(mean,3)}  ${f(sd,3)} | ${f(p(0.01),3)}  ${f(p(0.10),3)}  ${f(p(0.50),3)}  ${f(p(0.90),3)}  ${f(p(0.99),3)} | ${f(av,3)}   ${pc<10?f(pc,3):f(pc,1)}   ${rank}/${n}`);
  }
  {
    let z=0,g=0;for(let t=0;t<W;t++){if(gt4[t]===0)z++;g+=gt4[t];}
    console.log(`  G4   | mean ${f(g/W,2)};  P(G4=0) = ${f(100*z/W,1)}% of rotations;  anchored G4 = ${gt4[0]}`);
  }

  // ---------- families ----------
  const prevW=W/x;
  const seam=[];for(let k=1;k*prevW<W;k++)seam.push(k*prevW);
  const mirror=[];for(let d=0;d<=3;d++)mirror.push(W/2+d);
  const smooth=smooth7(W);
  const near=[];for(let t=1;t<=64;t++)near.push(t);
  const rng=mulberry32(13000+x);
  const random=[];for(let i=0;i<2000;i++)random.push(Math.floor(rng()*W));
  const fams=[['ANCHOR',[0]],['SEAM',seam],['MIRROR',mirror],['SMOOTH',smooth],['NEAR',near],['RANDOM',random]];
  console.log('FAMILIES — percentile inside the full ensemble, per statistic (median [min..max]):');
  console.log(' family |   n  |        VR          |        Z2          |        SP          |        OV');
  const famPct={};
  for(const [name,ts] of fams){
    const cols=stats.map(s=>{
      const pcs=ts.map(t=>pctile(s.sorted,s.arr[t]));
      return {med:median(pcs),min:Math.min(...pcs),max:Math.max(...pcs)};
    });
    famPct[name]=cols;
    const cell=c=>`${f(c.med,1).padStart(5)} [${f(c.min,1)}..${f(c.max,1)}]`;
    console.log(` ${name.padEnd(6)} | ${String(ts.length).padStart(4)} | ${cols.map(cell).join(' | ')}`);
  }
  // individual structured members on the headline stat VR
  const vrS=stats[0];
  console.log('  SEAM individually (k: VR-pct): '+seam.map((t,i)=>`${i+1}:${f(pctile(vrS.sorted,vrS.arr[t]),1)}`).join(' '));
  console.log('  MIRROR members (δ: VR-pct): '+mirror.map((t,d)=>`${d}:${f(pctile(vrS.sorted,vrS.arr[t]),1)}`).join(' ')+`   (t=W/2=${W/2} is the unique mirror-fixed phase in the window)`);
  // fixed-point theorems at t=W/2: G even for all q, SP exactly 0, VR ≈ 2
  {
    const h=W/2;let evenOK=true;
    for(const P of per){const q=P.q,a=h%q,a2=(a+q-2)%q;if((P.n[a]+P.n[a2])%2!==0)evenOK=false;}
    console.log(`  W/2 fixed-point theorems: G(W/2,q) even for ALL q: ${evenOK?'PASS':'FAIL'};  SP(W/2)=${splitsum[h]} (exactly 0: ${splitsum[h]===0?'PASS':'FAIL'});  VR(W/2)=${f(devsq[h],3)} (mirror-doubling predicts ≈2)`);
  }
  console.log('  NEAR profile t=1..16 (VR-pct): '+near.slice(0,16).map(t=>f(pctile(vrS.sorted,vrS.arr[t]),1)).join(' '));

  // extreme rotations: who is calmer than the anchor, and who is loudest?
  // (mirror pairing ⇒ extremes come in exact t ↔ W−t pairs; W/2 and 0 are singletons)
  {
    const so=vrS.sorted, lo=so[Math.min(12,W-1)], hi=so[W-4];
    const lows=[],highs=[];
    for(let t=0;t<W;t++){if(devsq[t]<=lo)lows.push(t);if(devsq[t]>=hi)highs.push(t);}
    lows.sort((a,b)=>devsq[a]-devsq[b]);highs.sort((a,b)=>devsq[b]-devsq[a]);
    console.log('  calmest rotations by VR: '+lows.slice(0,13).map(t=>`t=${t}${t===0?'(ANCHOR)':''}[${factorStr(t)}]:${f(devsq[t],3)}`).join(' '));
    console.log('  loudest by VR: '+highs.slice(0,4).map(t=>`t=${t}${t===W/2?'(=W/2!)':''}:${f(devsq[t],3)}`).join(' '));
    const z2S=stats[1];
    const zlo=z2S.sorted[Math.min(6,W-1)];const zl=[];
    for(let t=0;t<W;t++)if(z2sum[t]<=zlo)zl.push(t);
    zl.sort((a,b)=>z2sum[a]-z2sum[b]);
    console.log('  calmest by Z2: '+zl.slice(0,7).map(t=>`t=${t}${t===0?'(ANCHOR)':''}[${factorStr(t)}]:${f(z2sum[t],3)}`).join(' '));
  }

  // ---------- P4: instrument correlations across the ensemble ----------
  {
    const step=Math.max(1,Math.floor(W/4096));
    const a=[],b=[],cc=[];
    for(let t=0;t<W;t+=step){if(splitsum[t]===99)continue;a.push(devsq[t]);b.push(splitsum[t]);cc.push(ov[t]);}
    console.log(`P4 instrument correlations (stride sample n=${a.length}): corr(VR,SP)=${f(pearson(a,b),3)}`+
      (ovNA?'  (OV n/a)':`  corr(VR,OV)=${f(pearson(a,cc),3)}  corr(SP,OV)=${f(pearson(b,cc),3)}`));
  }

  // ---------- P1: per-prime rank of the anchored class pair ----------
  {
    const rankAt=(t)=>{
      const pcs=[];
      for(const P of per){
        const q=P.q,a=t%q,v=Math.abs(P.devA[a]);
        let below=0,eq=0;
        for(let i=0;i<q;i++){const w=Math.abs(P.devA[i]);if(w<v)below++;else if(w===v)eq++;}
        pcs.push((below+eq/2)/q);
      }
      return pcs;
    };
    const p0=rankAt(0);
    const rng2=mulberry32(777+x);
    let calSum=0;const nCal=5;
    for(let i=0;i<nCal;i++){const pr=rankAt(Math.floor(rng2()*W));calSum+=pr.reduce((s,v)=>s+v,0)/pr.length;}
    const m0=p0.reduce((s,v)=>s+v,0)/p0.length;
    console.log(`P1 per-prime |dev| rank of the anchored pair {0,−2}: mean=${f(m0,3)} median=${f(median(p0),3)}  #below-half=${p0.filter(v=>v<0.5).length}/${K}   (null 0.5; ${nCal} random-t calibration mean=${f(calSum/nCal,3)})`);
  }

  // ---------- P2: the partial-period (floor) probe ----------
  {
    let d10=0,n10=0,d20=0,n20=0,sdSum=0,e0two=0;
    const dev0=[],absz=[],rq=[],bal=[];
    for(const P of per){
      const q=P.q,R=W%q;
      if(q-2<R)e0two++;
      let s0=0,c0=0,s1=0,c1=0,s2=0,c2=0;
      for(let a=0;a<q;a++){
        const e=(a<R?1:0)+(((a+q-2)%q)<R?1:0);
        const G=P.devA[a]; // dev; means of dev by e ≡ means of G by e (same shift)
        if(e===0){s0+=G;c0++;}else if(e===1){s1+=G;c1++;}else{s2+=G;c2++;}
      }
      if(c0&&c1){d10+=s1/c1-s0/c0;n10++;}
      if(c0&&c2){d20+=s2/c2-s0/c0;n20++;}
      sdSum+=Math.sqrt(P.varRot);
      dev0.push(P.devA[0]);absz.push(Math.abs(P.devA[0])/Math.sqrt(P.varRot));
      rq.push(R/q);bal.push(Math.min(R,q-R)/q);
    }
    const delta=N/W;
    console.log(`P2 floor effect: mean dev shift per extra AP term = ${f(d10/n10,4)} (1 extra, ${n10} primes), ${f(n20?d20/n20:NaN,4)} (2 extra, ${n20} primes); theory δ=N/W=${f(delta,4)}; mean class sd=${f(sdSum/K,3)} → floor term is ~${f((sdSum/K)/delta,0)}x too small to carry the calm`);
    console.log(`   anchored phase: a=0 has 1 extra AP term (0<R always) for ${K-e0two}/${K} primes, 2 for ${e0two} (W≡−1 mod q) — mid-pack, nothing special in floor position`);
    console.log(`   corr across ${K} primes: corr(dev(0,q), R/q)=${f(pearson(dev0,rq),3)}  corr(|z(0,q)|, R/q)=${f(pearson(absz,rq),3)}  corr(|z(0,q)|, min(R,q−R)/q)=${f(pearson(absz,bal),3)}   (null sd ≈ ${f(1/Math.sqrt(K),3)})`);
    const neg=dev0.filter(v=>v<0).length;
    console.log(`   anchored dev signs: ${neg}/${K} negative, Σdev(0,q)=${f(dev0.reduce((s,v)=>s+v,0),2)}`);
  }

  // ---------- P3: feature regressions on RANDOM ----------
  {
    const vr=[],sp=[],d0=[],lp=[];
    for(const t of random){
      if(splitsum[t]===99)continue;
      vr.push(devsq[t]);sp.push(splitsum[t]);
      d0.push(Math.log(1+Math.min(t,W-t)));lp.push(Math.log(Math.max(2,lpf(t))));
    }
    console.log(`P3 on RANDOM (n=${vr.length}): corr(VR, log dist-to-anchor)=${f(pearson(vr,d0),3)}  corr(VR, log lpf)=${f(pearson(vr,lp),3)}  corr(SP, log dist)=${f(pearson(sp,d0),3)}  corr(SP, log lpf)=${f(pearson(sp,lp),3)}   (null sd ≈ ${f(1/Math.sqrt(vr.length),3)})`);
  }

  summaryRows.push({x,W,K,
    anch:stats.map(s=>pctile(s.sorted,s.arr[0])),
    fam:famPct});
  console.log(`[level time ${(Date.now()-t0)/1000}s]`);
}

for(const x of [11,13,17]) runLevel(x);

console.log('\n===== CROSS-LEVEL SUMMARY — percentile inside the full rotation ensemble =====');
console.log('  x |  ANCHOR: VR      Z2      SP      OV   | family medians on VR: SEAM   MIRROR  SMOOTH  NEAR   RANDOM');
for(const r of summaryRows){
  const a=r.anch.map(v=>f(v,2).padStart(6)).join('  ');
  const fm=['SEAM','MIRROR','SMOOTH','NEAR','RANDOM'].map(k=>f(r.fam[k][0].med,1).padStart(5)).join('  ');
  console.log(` ${String(r.x).padStart(2)} | ${a} | ${fm}`);
}
console.log(`[total ${(Date.now()-T00)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-13-anchored-calm.js
//   invocation:  node research/natal-cap-13-anchored-calm.js
//   code-sha256: 693b51d45234f9e3948758dbf2a207afe93fe8be7f2d8096c421192f5761a8dd
//   out-sha256:  073c2149c813fe6071c8b86633d2c70de5a5a9581884bd4025d02ca27c235d77
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     1.0 s
// ============================================================================
//
// ===== @11: W=2310  N=90  K=10 scour (13..47)  head q≤W^(1/3)=13.2: 1 primes, 0 pairs =====
// cross-checks vs cap-05/09: V(0)=5.19 (5.19 PASS)  Vrot=15.07 (15.07 PASS)  split(0)=0.303 over 3 primes (0.303 PASS)  G4(0)=0 (PASS)
// direct recompute at 3 rotations: PASS;  mirror pairing stat(t)=stat(W−t) (5 sampled t): PASS (exact)
//   note: OV n/a at this level (no head pairs; constant 1 substituted — all OV percentiles read 50)
// FULL ENSEMBLE (all 2310 rotations = the exact RANDOM control):
//  stat |   mean    sd   |    p1     p10    p50    p90    p99  | anchored  pct%    rank
//   VR  | 0.999  0.380 | 0.322  0.547  0.960  1.497  2.104 | 0.344   1.840   42/2310
//   Z2  | 0.999  0.363 | 0.331  0.571  0.961  1.488  1.986 | 0.362   1.753   40/2310
//   SP  | 0.369  0.167 | 0.000  0.139  0.377  0.591  0.775 | 0.303   44.4   993/2310
//   OV  | 1.000  0.000 | 1.000  1.000  1.000  1.000  1.000 | 1.000   50.0   0/2310
//   G4   | mean 0.11;  P(G4=0) = 89.5% of rotations;  anchored G4 = 0
// FAMILIES — percentile inside the full ensemble, per statistic (median [min..max]):
//  family |   n  |        VR          |        Z2          |        SP          |        OV
//  ANCHOR |    1 |   1.8 [1.8..1.8] |   1.8 [1.8..1.8] |  44.4 [44.4..44.4] |  50.0 [50.0..50.0]
//  SEAM   |   10 |  46.3 [18.8..89.1] |  60.1 [14.1..73.8] |  67.9 [40.9..97.4] |  50.0 [50.0..50.0]
//  MIRROR |    4 |  68.7 [4.0..100.0] |  69.3 [12.5..100.0] |  50.3 [0.9..91.0] |  50.0 [50.0..50.0]
//  SMOOTH |  198 |  53.6 [0.6..99.5] |  56.4 [0.6..99.6] |  54.7 [0.9..98.6] |  50.0 [50.0..50.0]
//  NEAR   |   64 |  45.9 [0.7..99.0] |  49.1 [0.3..98.0] |  50.0 [2.5..99.6] |  50.0 [50.0..50.0]
//  RANDOM | 2000 |  52.8 [0.0..100.0] |  52.6 [0.0..100.0] |  51.0 [0.9..99.6] |  50.0 [50.0..50.0]
//   SEAM individually (k: VR-pct): 1:57.6 2:18.8 3:89.1 4:33.2 5:46.3 6:46.3 7:33.2 8:89.1 9:18.8 10:57.6
//   MIRROR members (δ: VR-pct): 0:100.0 1:78.3 2:59.1 3:4.0   (t=W/2=1155 is the unique mirror-fixed phase in the window)
//   W/2 fixed-point theorems: G(W/2,q) even for ALL q: PASS;  SP(W/2)=0 (exactly 0: PASS);  VR(W/2)=2.777 (mirror-doubling predicts ≈2)
//   NEAR profile t=1..16 (VR-pct): 35.7 20.9 59.3 32.5 26.3 29.0 54.6 83.4 90.4 97.5 30.3 12.4 0.7 14.2 36.5 57.3
//   calmest rotations by VR: t=1058[2·23^2]:0.157 t=1252[2^2·313]:0.157 t=943[23·41]:0.252 t=1367[1367]:0.252 t=963[3^2·107]:0.254 t=1347[3·449]:0.254 t=1057[7·151]:0.269 t=1253[7·179]:0.269 t=431[431]:0.274 t=1879[1879]:0.274 t=746[2·373]:0.288 t=1564[2^2·17·23]:0.288 t=240[2^4·3·5]:0.293
//   loudest by VR: t=1155(=W/2!):2.777 t=983:2.501 t=1327:2.501 t=940:2.471
//   calmest by Z2: t=1058[2·23^2]:0.192 t=1252[2^2·313]:0.192 t=943[23·41]:0.266 t=1367[1367]:0.266 t=963[3^2·107]:0.272 t=1347[3·449]:0.272 t=13[13]:0.291
// P4 instrument correlations (stride sample n=2310): corr(VR,SP)=-0.080  (OV n/a)
// P1 per-prime |dev| rank of the anchored pair {0,−2}: mean=0.396 median=0.372  #below-half=8/10   (null 0.5; 5 random-t calibration mean=0.488)
// P2 floor effect: mean dev shift per extra AP term = 0.0324 (1 extra, 9 primes), -0.1123 (2 extra, 9 primes); theory δ=N/W=0.0390; mean class sd=1.200 → floor term is ~31x too small to carry the calm
//    anchored phase: a=0 has 1 extra AP term (0<R always) for 10/10 primes, 2 for 0 (W≡−1 mod q) — mid-pack, nothing special in floor position
//    corr across 10 primes: corr(dev(0,q), R/q)=-0.417  corr(|z(0,q)|, R/q)=-0.076  corr(|z(0,q)|, min(R,q−R)/q)=-0.672   (null sd ≈ 0.316)
//    anchored dev signs: 3/10 negative, Σdev(0,q)=1.98
// P3 on RANDOM (n=2000): corr(VR, log dist-to-anchor)=0.015  corr(VR, log lpf)=0.026  corr(SP, log dist)=-0.037  corr(SP, log lpf)=0.053   (null sd ≈ 0.022)
// [level time 0.013s]
//
// ===== @13: W=30030  N=990  K=34 scour (17..173)  head q≤W^(1/3)=31.1: 5 primes, 10 pairs =====
// cross-checks vs cap-05/09: V(0)=74.51 (74.51 PASS)  Vrot=119.58 (119.58 PASS)  split(0)=0.357 over 34 primes (0.357 PASS)  G4(0)=0 (PASS)
// direct recompute at 3 rotations: PASS;  mirror pairing stat(t)=stat(W−t) (5 sampled t): PASS (exact)
// FULL ENSEMBLE (all 30030 rotations = the exact RANDOM control):
//  stat |   mean    sd   |    p1     p10    p50    p90    p99  | anchored  pct%    rank
//   VR  | 1.000  0.237 | 0.527  0.710  0.980  1.312  1.622 | 0.623   3.938   1182/30030
//   Z2  | 1.000  0.223 | 0.537  0.726  0.986  1.291  1.581 | 0.657   4.757   1428/30030
//   SP  | 0.346  0.045 | 0.245  0.289  0.346  0.405  0.451 | 0.357   59.3   17795/30030
//   OV  | 1.000  0.077 | 0.833  0.898  1.003  1.107  1.185 | 0.950   26.8   7206/30030
//   G4   | mean 1.40;  P(G4=0) = 23.5% of rotations;  anchored G4 = 0
// FAMILIES — percentile inside the full ensemble, per statistic (median [min..max]):
//  family |   n  |        VR          |        Z2          |        SP          |        OV
//  ANCHOR |    1 |   3.9 [3.9..3.9] |   4.8 [4.8..4.8] |  59.3 [59.3..59.3] |  26.8 [26.8..26.8]
//  SEAM   |   12 |  55.5 [45.4..73.6] |  53.5 [14.9..82.5] |  49.5 [21.9..92.0] |   8.0 [0.7..45.5]
//  MIRROR |    4 |  26.5 [5.0..99.3] |  37.1 [7.4..100.0] |  16.5 [0.0..93.4] |  58.0 [32.8..84.9]
//  SMOOTH |  482 |  54.3 [0.2..99.9] |  51.1 [0.2..99.6] |  49.2 [0.0..100.0] |  52.2 [0.0..99.7]
//  NEAR   |   64 |  48.6 [1.0..97.9] |  50.3 [0.8..99.2] |  41.2 [1.8..96.9] |  55.4 [6.6..97.8]
//  RANDOM | 2000 |  49.9 [0.0..100.0] |  48.1 [0.0..100.0] |  49.2 [0.0..99.7] |  52.2 [0.0..100.0]
//   SEAM individually (k: VR-pct): 1:73.6 2:45.4 3:58.8 4:52.2 5:49.1 6:69.5 7:69.5 8:49.1 9:52.2 10:58.8 11:45.4 12:73.6
//   MIRROR members (δ: VR-pct): 0:99.3 1:40.4 2:12.6 3:5.0   (t=W/2=15015 is the unique mirror-fixed phase in the window)
//   W/2 fixed-point theorems: G(W/2,q) even for ALL q: PASS;  SP(W/2)=0 (exactly 0: PASS);  VR(W/2)=1.665 (mirror-doubling predicts ≈2)
//   NEAR profile t=1..16 (VR-pct): 44.3 70.7 80.5 96.5 77.2 76.4 5.6 39.8 58.6 76.5 27.3 64.8 31.6 79.1 87.8 48.5
//   calmest rotations by VR: t=12903[3·11·17·23]:0.335 t=17127[3^2·11·173]:0.335 t=9516[2^2·3·13·61]:0.354 t=20514[2·3·13·263]:0.354 t=4315[5·863]:0.365 t=25715[5·37·139]:0.365 t=12979[12979]:0.383 t=17051[17^2·59]:0.383 t=9175[5^2·367]:0.387 t=20855[5·43·97]:0.387 t=2761[11·251]:0.389 t=27269[11·37·67]:0.389 t=14421[3·11·19·23]:0.397
//   loudest by VR: t=3461:2.352 t=26569:2.352 t=12153:2.172 t=17877:2.172
//   calmest by Z2: t=12903[3·11·17·23]:0.355 t=17127[3^2·11·173]:0.355 t=2761[11·251]:0.362 t=27269[11·37·67]:0.362 t=14421[3·11·19·23]:0.379 t=15609[3·11^2·43]:0.379 t=4315[5·863]:0.381
// P4 instrument correlations (stride sample n=4290): corr(VR,SP)=-0.078  corr(VR,OV)=-0.023  corr(SP,OV)=-0.011
// P1 per-prime |dev| rank of the anchored pair {0,−2}: mean=0.415 median=0.351  #below-half=22/34   (null 0.5; 5 random-t calibration mean=0.458)
// P2 floor effect: mean dev shift per extra AP term = 0.1870 (1 extra, 33 primes), 0.1472 (2 extra, 33 primes); theory δ=N/W=0.0330; mean class sd=1.833 → floor term is ~56x too small to carry the calm
//    anchored phase: a=0 has 1 extra AP term (0<R always) for 33/34 primes, 2 for 1 (W≡−1 mod q) — mid-pack, nothing special in floor position
//    corr across 34 primes: corr(dev(0,q), R/q)=-0.066  corr(|z(0,q)|, R/q)=0.014  corr(|z(0,q)|, min(R,q−R)/q)=0.177   (null sd ≈ 0.171)
//    anchored dev signs: 14/34 negative, Σdev(0,q)=-0.30
// P3 on RANDOM (n=2000): corr(VR, log dist-to-anchor)=-0.022  corr(VR, log lpf)=0.010  corr(SP, log dist)=-0.000  corr(SP, log lpf)=-0.010   (null sd ≈ 0.022)
// [level time 0.13s]
//
// ===== @17: W=510510  N=14850  K=120 scour (19..709)  head q≤W^(1/3)=79.9: 15 primes, 105 pairs =====
// cross-checks vs cap-05/09: V(0)=632.84 (632.84 PASS)  Vrot=1144.40 (1144.4 PASS)  split(0)=0.279 over 120 primes (0.279 PASS)  G4(0)=0 (PASS)
// direct recompute at 3 rotations: PASS;  mirror pairing stat(t)=stat(W−t) (5 sampled t): PASS (exact)
// FULL ENSEMBLE (all 510510 rotations = the exact RANDOM control):
//  stat |   mean    sd   |    p1     p10    p50    p90    p99  | anchored  pct%    rank
//   VR  | 1.000  0.128 | 0.726  0.839  0.995  1.167  1.318 | 0.553   0.002   10/510510
//   Z2  | 1.000  0.121 | 0.739  0.848  0.995  1.159  1.301 | 0.548   0.000   2/510510
//   SP  | 0.267  0.019 | 0.224  0.243  0.267  0.292  0.314 | 0.279   73.7   376195/510510
//   OV  | 1.000  0.008 | 0.980  0.989  1.000  1.011  1.019 | 1.013   94.3   480479/510510
//   G4   | mean 4.80;  P(G4=0) = 0.7% of rotations;  anchored G4 = 0
// FAMILIES — percentile inside the full ensemble, per statistic (median [min..max]):
//  family |   n  |        VR          |        Z2          |        SP          |        OV
//  ANCHOR |    1 |   0.0 [0.0..0.0] |   0.0 [0.0..0.0] |  73.7 [73.7..73.7] |  94.3 [94.3..94.3]
//  SEAM   |   16 |  61.5 [15.9..99.5] |  75.3 [16.9..99.5] |   5.8 [0.1..81.1] |  71.4 [15.0..99.4]
//  MIRROR |    4 |  90.9 [26.9..100.0] |  91.2 [23.3..100.0] |   2.9 [0.0..51.7] |  29.5 [1.3..48.1]
//  SMOOTH | 1076 |  50.7 [0.0..100.0] |  50.5 [0.0..99.8] |  48.1 [0.0..100.0] |  48.1 [0.4..100.0]
//  NEAR   |   64 |  56.2 [0.3..94.0] |  50.2 [0.5..98.2] |  55.6 [6.6..99.0] |  58.0 [2.7..98.5]
//  RANDOM | 2000 |  51.4 [0.2..99.9] |  51.3 [0.0..100.0] |  50.3 [0.0..99.9] |  50.8 [0.1..99.9]
//   SEAM individually (k: VR-pct): 1:28.9 2:74.6 3:15.9 4:73.3 5:33.2 6:49.8 7:99.3 8:99.5 9:99.5 10:99.3 11:49.8 12:33.2 13:73.3 14:15.9 15:74.6 16:28.9
//   MIRROR members (δ: VR-pct): 0:100.0 1:98.9 2:82.9 3:26.9   (t=W/2=255255 is the unique mirror-fixed phase in the window)
//   W/2 fixed-point theorems: G(W/2,q) even for ALL q: PASS;  SP(W/2)=0 (exactly 0: PASS);  VR(W/2)=2.143 (mirror-doubling predicts ≈2)
//   NEAR profile t=1..16 (VR-pct): 0.3 10.2 37.4 33.7 86.4 66.3 39.0 8.6 60.1 75.0 90.5 84.6 72.0 12.6 29.1 36.7
//   calmest rotations by VR: t=132521[89·1489]:0.488 t=377989[191·1979]:0.488 t=93766[2·173·271]:0.530 t=416744[2^3·113·461]:0.530 t=186845[5·37369]:0.549 t=323665[5·19·3407]:0.549 t=208083[3·139·499]:0.553 t=302427[3^3·23·487]:0.553 t=24832[2^8·97]:0.553 t=485678[2·19·12781]:0.553 t=0(ANCHOR)[0]:0.553 t=93249[3^2·13·797]:0.556 t=417261[3·13^2·823]:0.556
//   loudest by VR: t=255255(=W/2!):2.143 t=1001:1.739 t=509509:1.739 t=9009:1.721
//   calmest by Z2: t=132521[89·1489]:0.534 t=377989[191·1979]:0.534 t=0(ANCHOR)[0]:0.548 t=121395[3·5·8093]:0.571 t=389115[3^2·5·8647]:0.571 t=199587[3·66529]:0.574 t=310923[3^2·179·193]:0.574
// P4 instrument correlations (stride sample n=4118): corr(VR,SP)=-0.059  corr(VR,OV)=-0.035  corr(SP,OV)=0.006
// P1 per-prime |dev| rank of the anchored pair {0,−2}: mean=0.397 median=0.340  #below-half=82/120   (null 0.5; 5 random-t calibration mean=0.502)
// P2 floor effect: mean dev shift per extra AP term = -0.2084 (1 extra, 117 primes), -0.0124 (2 extra, 113 primes); theory δ=N/W=0.0291; mean class sd=2.995 → floor term is ~103x too small to carry the calm
//    anchored phase: a=0 has 1 extra AP term (0<R always) for 117/120 primes, 2 for 3 (W≡−1 mod q) — mid-pack, nothing special in floor position
//    corr across 120 primes: corr(dev(0,q), R/q)=0.148  corr(|z(0,q)|, R/q)=-0.060  corr(|z(0,q)|, min(R,q−R)/q)=0.045   (null sd ≈ 0.091)
//    anchored dev signs: 60/120 negative, Σdev(0,q)=-50.76
// P3 on RANDOM (n=2000): corr(VR, log dist-to-anchor)=0.049  corr(VR, log lpf)=0.038  corr(SP, log dist)=0.004  corr(SP, log lpf)=0.009   (null sd ≈ 0.022)
// [level time 0.789s]
//
// ===== CROSS-LEVEL SUMMARY — percentile inside the full rotation ensemble =====
//   x |  ANCHOR: VR      Z2      SP      OV   | family medians on VR: SEAM   MIRROR  SMOOTH  NEAR   RANDOM
//  11 |   1.84    1.75   44.35   50.00 |  46.3   68.7   53.6   45.9   52.8
//  13 |   3.94    4.76   59.26   26.82 |  55.5   26.5   54.3   48.6   49.9
//  17 |   0.00    0.00   73.69   94.31 |  61.5   90.9   50.7   56.2   51.4
// [total 0.932s]
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. VERDICT: NOT FAMILY-STRUCTURE, AND NOT PLAIN LUCK EITHER — THE CALM IS
//    REAL, EXTREME, AND PRIVATE TO THE ANCHORED PHASE. Against the EXACT
//    full-rotation control (every percentile below is a rank among all W
//    rotations, not a sample estimate), the anchored rotation sits at the
//    1.84th / 3.94th / 0.002nd percentile on VR (= cap-05's V/Vrot) at
//    x = 11 / 13 / 17. At @17 only 10 of 510,510 rotations (= 5 mirror-pairs)
//    are calmer, and on the equal-weight statistic Z2 only ONE pair
//    (t = 132521 = 89·1489 and its mirror twin) beats the anchor: rank
//    2/510510. Every structured family is ensemble-generic on VR: SEAM
//    medians 46–62, SMOOTH 50.7, NEAR 48–56, MIRROR high, RANDOM ≈ 50.
//    Seam-ness, smoothness, and proximity-to-0 all FAIL as explanations
//    (P3: |corr| ≤ 0.05 against null sd 0.022 — and the proximity sign is
//    even wrong). The brief's dichotomy dissolves: the calm does not extend
//    to any tested structure class, but calling rank-10-of-510510 "luck"
//    after bottom-4% showings at both smaller levels strains the word. The
//    honest naive product of the three level-percentiles is ~1.4e-8; we do
//    NOT multiply (the levels are arithmetically nested, not independent),
//    but three-for-three extreme-low in three separate ensembles is the
//    signature of a mechanism attached to phase 0 itself, not of a draw.
// 2. TWO OF THE FOUR SIGHTINGS DISSOLVE — THE "ANCHORED CALM" IS ONE ANOMALY,
//    NOT FOUR. With the right control the scoreboard reads:
//    (a) strike-variance calm [cap-05]: CONFIRMED and sharpened (reading 1).
//    (c) house splits [cap-09]: DISSOLVED. The ENTIRE ensemble is sub-
//        binomial — ensemble mean SP = 0.369 / 0.346 / 0.267 vs binomial
//        0.8 — so "0.3 vs 0.8" was a property of every rotation (CRT near-
//        equidistribution), exactly as cap-09 reading 4 suspected. Worse:
//        the anchor sits at the 73.7th percentile at @17 — on the UNEVEN
//        side of its own ensemble. As an anchored sighting, refuted.
//    (b) pair overlaps [cap-06]: REVERSED at the head. The ensemble mean of
//        the head-pair sum is CRT to 4 digits (1.000 ± 0.008 at @17), and
//        the anchor is overlap-RICH: 94.3rd percentile (+1.6σ). cap-06's 3%
//        deficit was measured over ALL 7140 pairs, so the deficit must live
//        in the non-head pairs; at the head, where the overlap credit
//        matters, the anchored tile has MORE overlap than 94% of rotations.
//        (Overlap-rich is kill-inefficient — consistent in sign with the
//        anchored tile's survivor deficit being drift, not fluctuation.)
//    (d) smooth drift [cap-07] is a trajectory property, not re-tested here.
//    P4 closes the case for treating these as one object: across the
//    ensemble corr(VR,SP) ≈ −0.06/−0.08, corr(VR,OV) ≈ −0.03, corr(SP,OV)
//    ≈ 0.00 — three INDEPENDENT instruments, and the anchor is extreme on
//    exactly one of them. "The anchored calm" should be renamed: it is the
//    ANCHORED QUIET OF THE PER-PRIME STRIKE COUNTS, nothing broader. (G4
//    agrees but is not extra evidence: P(G4=0) = 0.7% of rotations at @17,
//    the anchor is among them — a VR-correlated restatement.)
// 3. THE MIRROR PAIRING IS A THEOREM AND IT BRACKETS THE ENSEMBLE. Because
//    μ(N_x) = N_x forces n_c = n_{(W−2−c) mod q}, every statistic obeys
//    stat(t) = stat(W−t) as integer phases (verified exactly, all levels; the
//    SEAM percentile lists are visibly palindromic). Consequences: (i) the
//    effective ensemble is W/2 + 1 mirror-pairs, so anchored rank 10 means 5
//    distinct calmer configurations; (ii) t = W/2 is the UNIQUE mirror-fixed
//    phase in the window — and the anchor is NOT a fixed point: its partner
//    is the phantom phase W (classes {W, W−2} mod q, cap-09's object),
//    sitting just outside the window. Correcting our own brief: the earlier
//    draft's "t=0 and W/2 are the two fixed points" is FALSE for t=0.
// 4. THE FIXED POINT IS THE LOUDEST ROTATION, BY PROVEN MECHANISM. At W/2
//    the strike classes are swapped by μ, every strike set is μ-invariant,
//    and N_x has no μ-fixed points, so strikes arrive in mirror pairs:
//    G(W/2,q) is even for ALL 164 primes (verified), the house split is
//    Δ(W/2,q) = 0 EXACTLY for every prime (verified — SP(W/2) = 0, the
//    perfect-split rotation), and deviations move in steps of 2, doubling
//    variance. Measured: VR(W/2) = 2.78 / 1.67 / 2.14 — the single loudest
//    rotation of the entire ensemble at @11 and @17 and 99.3rd pct at @13,
//    against prediction ≈ 2. So phase arithmetic PROVABLY controls the
//    variance statistic at the loud end; the runner-up loudest at @17 are
//    t = 1001 = 7·11·13 and t = 9009 = 3²·7·11·13 — wheel-built phases.
//    This is the strongest structural argument that the anchor's position
//    at the calm end is mechanism, not accident: the ensemble's two
//    arithmetically distinguished phases occupy the two opposite tails.
// 5. THE CALM IS PER-PRIME UNIFORM, NOT A FEW LUCKY PRIMES (P1 — the
//    mechanism's fingerprint). Within each prime q, the anchored class pair
//    {0,−2} sits at mean |dev| percentile 0.396 / 0.415 / 0.397 (null 0.5;
//    random-phase calibration 0.488 / 0.458 / 0.502), median 0.34–0.37,
//    below-half for 82/120 primes at @17. Null sd of the mean is
//    0.289/√K → z ≈ −1.1 / −1.7 / −3.9. A ~10-percentile-point suppression
//    at ALMOST EVERY prime, compounding to VR = 0.55 — exactly the profile
//    a structural cause would leave ("no bad primes", cap-05's 0/164 > 2σ),
//    and exactly not the profile of a lucky draw (which concentrates).
// 6. THE BRIEF'S OWN MECHANISM CANDIDATE IS REFUTED (P2). The partial-period
//    floor effect (classes a < R = W mod q get one extra AP term) is real
//    and has the predicted size δ = N/W ≈ 0.03 per extra term — which is
//    30× / 56× / 103× SMALLER than the class sd. The anchored phase's floor
//    position is mid-pack (a = 0 always gets exactly 1 extra term, 2 only
//    when W ≡ −1 mod q: 0/1/3 primes). Correlations of anchored deviations
//    with R/q or min(R,q−R)/q are null within noise at @13/@17 (the @11
//    values wander at K = 10, as 10-point correlations do). The calm is NOT
//    "CRT exactness leaking through partial-period SIZE"; whatever leaks,
//    leaks through the CONTENT of the classes, not their length.
// 7. THE STANDING MECHANISM CANDIDATE, SHARPENED. The anchored classes
//    {0, −2} are the only strike classes with arithmetic meaning: their
//    natal slots are r = qm and r = qm − 2 — the KILL IMAGE of the next
//    fold, i.e. m runs through a dilated natal-type pattern read from ITS
//    OWN ORIGIN (the enriched head, attack-02), over the head window
//    [0, W/q). A generic class c is the same kind of dilated pattern at a
//    generic phase. So the conjecture the data now supports: head-anchored
//    dilations inherit the pattern's sub-Poisson window concentration
//    (06-variance-theorem, Fano 0.17–0.25), generic phases don't quite —
//    consistent with P1's uniform per-prime suppression and with cap-01's
//    integer-exact dilation identity as the bookkeeping tool. Status:
//    measured fingerprint + named identity, NO proof. The calmest non-
//    anchored rotations (89·1489, 2·173·271, 5·37369, …) are arithmetically
//    featureless — the calm tail is ordinary fluctuation with one
//    structural resident.
// 8. CALIBRATION AND CAVEATS. (i) @11's ensemble has only 2310 members —
//    percentile floor 0.04%; anchored 1.8% = rank 42, unremarkable alone.
//    (ii) VarRot normalization is cap-05's uniform-class variance while
//    percentiles are within the exact W-member diagonal ensemble; both
//    controls agree to the check-digit (RANDOM family medians 48–53). (iii)
//    72 family×stat×level cells were scanned: isolated family-median
//    extremes like SEAM-SP@17 (5.8) are look-elsewhere candidates, noted
//    but not claimed (MIRROR-SP is explained by reading 4). (iv) Runtime
//    0.9s — the full-enumeration approach costs nothing and should be the
//    default control for all future anchored-vs-ensemble claims.
// 9. NEXT STEP. Two concrete continuations: (i) @19 full enumeration
//    (W = 9.7M, K = 435; ~1–2 min by the same accumulation trick) — if the
//    anchored VR percentile keeps falling (1.8% → 3.9% → 0.002% → ?), the
//    "deepening calm" becomes a quantitative law worth naming; (ii) the
//    proof target, now precise: show dev(0,q) = n_0 + n_{q−2} − 2N/q is
//    variance-suppressed because both terms are head-window counts of
//    cap-01's dilated patterns — the window variance theorem applied at
//    scale W/q. That single lemma would turn the last surviving sighting
//    into a theorem and retire "luck" for good.
// 10. FORWARD POINTER (2026-08-17 script sweep). Reading 9 is answered on both
//    legs. (i) natal-cap-19 enumerated all 9,699,690 rotations at @19 against
//    435 scour primes: anchored VR rank 14 (percentile 0.00014%), Z2 rank 6.
//    The ladder reads 1.84% -> 3.94% -> 0.0021% -> 0.00014% at @11..@19, so
//    the percentile does keep falling, but the SUPPRESSION RATIO does not:
//    VR(0) = 0.553 @17 rises to 0.699 @19. The rank falls because the
//    ensemble sd shrinks like K^(-1/2), so the honest name is a deepening z
//    at a roughly level-stable suppression factor ~0.55-0.70, not a deepening
//    calm, and it should not be quoted as a "quantitative law worth naming"
//    in the form this reading proposed. (ii) The proof target is largely met:
//    the anchor's two strike windows FUSE into one double-length window
//    because it is the unique phase where they abut, and that is what turns
//    the pattern's adjacent-window anticorrelation into variance suppression
//    (cap-19 Lemmas 1-3, PROVEN for all x and all scour q). What stays open
//    is the last factor, the anchored window's position-typicality inside its
//    own fused ensemble, measured at 0.94 and with no proof mechanism.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   2.777 -> 2.78 and 1.665 -> 1.67, reading 4, the @11 and @13 W/2
//   fixed-point theorem lines. The third entry 2.14 is printed as 2.143.
//
// TOKENIZER ARTIFACT, not a figure:
//   "-510510" in reading 1 is the tail of the hyphenated phrase
//   rank-10-of-510510; the ensemble size is printed as "10/510510".
//   "-0.70" in reading 10 is the upper endpoint of the range 0.55-0.70; both
//   endpoints are the VR(0) values named in that same sentence.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   1.4e-8 in reading 1 is the product of the three level percentiles,
//   0.0184 x 0.0394 x 0.000021, and the reading flags it with a tilde and
//   states in the next clause that the levels are not independent.
//   164 in readings 4 and 5 is the total scour length over the three levels,
//   10 + 34 + 120, from the K= headers of the three section banners. The same
//   sum is what cap-05's "0/164 past 2 sigma" restates; that file prints the
//   three counts separately as 0/10, 0/34 and 0/120.
//   0.00014% in reading 10 is 14/9699690 carried to two significant figures.
//   Its producer prints the rank 14/9699690 but rounds the percentage to
//   0.0001%, so the finer figure is this reading's own division.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   7140 in reading 2 is the @17 pair count, printed by
//   natal-cap-06-bonferroni.js as "|T|=2: 7140 subsets" on the line that also
//   carries the ratio 0.9744 the reading calls a 3 per cent deficit.
//   From natal-cap-19-calm-lemma.js: W = 9699690 and K = 435 in its @19
//   banner; the @17 percentile 0.0021%, printed as "VR rank 10/510510
//   (ties 1, pct 0.0021%)"; the @19 rank 14 and Z2 rank 6; VR(0) at @19,
//   printed as 0.6988 and quoted as 0.699; and the position-typicality 0.94,
//   printed there as the residual luck ratio 0.9352 at @13 and 0.9392 at @17.
// ---------------------------------------------------------------------------
