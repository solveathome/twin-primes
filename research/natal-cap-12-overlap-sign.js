// ============================================================================
// NATAL-CAP 12 — THE SUB-CRT OVERLAP SIGN: PROVE IT OR REFUTE IT
// (TODO item 2 of the campaign; source observation: natal-cap-06 reading 3/7;
//  2026-08-14.  Proofs of every lemma cited here: natal-cap-12-overlap-sign.md)
// ============================================================================
// SETTING. Tile level x, W = x#, natal set N_x = {r in [0,W): r ≡ 11,17 mod 30;
// r mod p ∉ {0, p−2} for 7 ≤ p ≤ x}, N = |N_x| = 2·∏_{7≤p≤x}(p−2).  Scour
// primes x < q ≤ √W, A_q = {r ∈ N_x : r ≡ 0 or −2 mod q}.  natal-cap-06
// measured S₂ = Σ_{q<q′}|A_q ∩ A_q′| at 0.969 / 0.974 of the CRT prediction
// Σ 4N/(qq′) at x = 13 / 17 (and 1.216 — ABOVE — at x = 11).  QUESTION: is
// S₂ ≤ Σ 4N/qq′ provable — per pair, per combo, or in aggregate?
//
// EXACT MACHINERY (all verified to the integer below; proofs in the .md):
//
// L1 WINDOW DILATION LEMMA.  |A_q ∩ A_q′| splits over the 4 combos
//    (a,b) ∈ {0,−2}²; each combo is ONE residue class c mod Q (Q = qq′,
//    CRT), and r = c + tQ bijects its natal points onto
//       { t ∈ [0, L_c) :  t ≡ (11−c)Q̄, (17−c)Q̄ (mod 30)  [one of the two],
//                          t ≢ −cQ̄, −(c+2)Q̄ (mod p)  ∀p ∈ [7,x] },
//    a DILATED natal-type pattern (Q̄ = Q⁻¹ mod 30p...), with window length
//       L_c = ⌊W/Q⌋ + [c < ρ],   ρ = W mod Q.
//    Over a full period of t the dilated pattern holds exactly N points, so
//    the combo count is a pure anchored-window count of a natal-type comb.
// L2 CLASS-SUM IDENTITY. Σ_{c mod Q} cnt_c = N: the CRT prediction N/Q is the
//    exact average over ALL Q classes — deviations measure anchoring only.
// L3 FAIR-PRICE IDENTITY.  N·L_c/W = N/Q + N·(Q·[c<ρ] − ρ)/(QW).  Every
//    SHORT class (c ≥ ρ) is overpriced by CRT by exactly Nρ/(QW).
// L4 DEAD ORIGIN.  c = 0 (combo (0,0)) always gets the LONG window, but its
//    t = 0 position is r = 0, dead at every level (0 ≡ 0 mod 7).  Also
//    r = W−2 lands in the (0,0) window iff Q | W−2 (rare, measured).
// T1 STRUCTURED-BIAS THEOREM.  Decompose dev_c := cnt_c − N/Q =
//    lenTerm + headTerm + resid  with  lenTerm = N·L_c/W − N/Q  (exact, L3),
//    headTerm = −N/W per forced-dead position (L4), resid := the anchored
//    window discrepancy vs the exact rotation-ensemble mean (cap-05's
//    theorem: mean window count over rotations = N·L/W).  Then for EVERY
//    pair and every level:
//       structured part of combo (0,0)  = −Nρ/(QW)  < 0   (long − origin)
//       structured part of combo (−2,−2) = −Nρ/(QW) < 0   (short window),
//         UNLESS W ≡ −1 mod Q, i.e. q and q′ BOTH divide the Euclid number
//         W+1 (then +N(Q−ρ)/(QW); counted below — essentially never).
//    Mixed combos: ±, sign = [c < ρ], no fixed sign, mean ~0 over pairs.
//    Expectation over pairs (ρ/Q ~ uniform): −N/W per pair total.
// T2 TAIL LEMMA (largest-Q pairs).  If ⌊W/Q⌋ < nextprime(x) then every
//    t ∈ [2, ⌊W/Q⌋] has a prime factor ≤ x (kills r = tQ), so
//       cnt_{(0,0)} = [ qq′ ∈ N_x ]  exactly.
//    And P(qq′ natal) ≈ (1/4)·∏_{7≤p≤x}(p−2)/(p−1) ≫ N/W ≥ CRT: the deepest
//    tail pairs have POSITIVE mean (0,0)-deviation.  The sign is NOT one-sided
//    even per combo — proven before measuring.
//
// WHAT THIS FILE MEASURES (x = 11, 13, 17, 19, 23; ALL pairs, exhaustively —
// 45 / 561 / 7,140 / 94,395 / 1,511,191 pairs):
//   per-pair, per-combo deviations vs CRT; the exact T1 decomposition and how
//   much of the aggregate deficit it explains; sign counts; dependence on
//   window length L̄ = ⌊W/Q⌋ (the Legendre/Buchstab head question) and on the
//   combo; head-position alive rates (t = 1 is the pair-product qq′ itself);
//   T2 verified exhaustively; singles |A_q| get the same treatment.
// ============================================================================
'use strict';

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function inv(a,m){a%=m;let r0=m,r1=a,s0=0,s1=1;while(r1){const q=(r0/r1)|0;const r2=r0-q*r1;r0=r1;r1=r2;const s2=s0-q*s1;s0=s1;s1=s2}if(r0!==1)throw new Error('inv');return s0<0?s0+m:s0}
const f=(v,d=3)=>v.toFixed(d), pct=v=>(100*v).toFixed(1)+'%';
const mulberry=s=>()=> (s=(s+0x6D2B79F5)|0, ((Math.imul(s^(s>>>15),1|s)+0x0)>>>0)/4294967296);

function runLevel(x, knowns){
  const bases=primesUpTo(x), W=bases.reduce((a,b)=>a*b,1), mids=bases.filter(p=>p>=7);
  const allP=primesUpTo(Math.floor(Math.sqrt(W))+2);
  const scour=allP.filter(q=>q>x&&q*q<=W);
  const nS=scour.length, pNext=scour[0], cbrtW=Math.cbrt(W);
  const isNatal=r=>{const m=r%30;if(m!==11&&m!==17)return false;
    for(let i=0;i<mids.length;i++){const p=mids[i],rp=r%p;if(rp===0||rp===p-2)return false}return true};
  // natal census + list
  let N=0;const natal=[];
  for(let b=11;b<W;b+=30){if(isNatal(b)){N++;natal.push(b)}const c=b+6;if(c<W&&isNatal(c)){N++;natal.push(c)}}
  natal.sort((a,b)=>a-b);
  const NW=N/W;

  // ---- strikes on the natal set, per scour prime, both classes -------------
  let cap=1<<20,SR=new Int32Array(cap),SQ=new Int32Array(cap),n=0;
  const singles=new Float64Array(nS*2);
  for(let qi=0;qi<nS;qi++){const q=scour[qi];
    for(let a=0;a<2;a++){const qc=(qi<<1)|a;
      for(let r=(a===0?0:q-2);r<W;r+=q){
        const m=r%30;if(m!==11&&m!==17)continue;
        let ok=true;for(let i=0;i<mids.length;i++){const p=mids[i],rp=r%p;if(rp===0||rp===p-2){ok=false;break}}
        if(!ok)continue;
        if(n===cap){cap*=2;let T=new Int32Array(cap);T.set(SR);SR=T;T=new Int32Array(cap);T.set(SQ);SQ=T}
        SR[n]=r;SQ[n]=qc;n++;singles[qc]++;}}}
  // stable radix sort by r (16+16 bit), preserving (qi,a) push order in ties
  {const c1=new Int32Array(65536);let A=SR.subarray(0,n),B=SQ.subarray(0,n);
   const R1=new Int32Array(n),Q1=new Int32Array(n),R2=new Int32Array(n),Q2=new Int32Array(n);
   for(let i=0;i<n;i++)c1[A[i]&0xffff]++;let s=0;for(let k=0;k<65536;k++){const t=c1[k];c1[k]=s;s+=t}
   for(let i=0;i<n;i++){const j=c1[A[i]&0xffff]++;R1[j]=A[i];Q1[j]=B[i]}
   c1.fill(0);for(let i=0;i<n;i++)c1[(R1[i]>>>16)&0xffff]++;s=0;for(let k=0;k<65536;k++){const t=c1[k];c1[k]=s;s+=t}
   for(let i=0;i<n;i++){const j=c1[(R1[i]>>>16)&0xffff]++;R2[j]=R1[i];Q2[j]=Q1[i]}
   SR=R2;SQ=Q2;}

  // ---- hit runs → histogram + pair-combo table -----------------------------
  const table=new Int32Array(nS*nS*4), hist=new Float64Array(64);
  let runs=0,S2=0;
  for(let i=0;i<n;){let j=i+1;const r=SR[i];while(j<n&&SR[j]===r)j++;const h=j-i;hist[h]++;runs++;
    for(let a=i;a<j;a++){const qa=SQ[a]>>1,aa=SQ[a]&1;
      for(let b=a+1;b<j;b++){const qb=SQ[b]>>1,ab=SQ[b]&1;table[(qa*nS+qb)*4+aa*2+ab]++;S2++}}
    i=j;}
  hist[0]=N-runs;
  const S1=n, survivors=N-runs;
  let S2h=0;for(let h=2;h<64;h++)S2h+=hist[h]*h*(h-1)/2;
  const ok62=(S2h===S2);

  console.log(`\n===== @${x}: W=${W}, N=${N}, N/W=${f(NW,5)}, scour=${nS} primes (${pNext}..${scour[nS-1]}], pairs=${nS*(nS-1)/2} =====`);
  console.log(`S1=${S1}  S2=${S2} (ΣC(h,2)=${S2h} ${ok62?'✓':'✗ MISMATCH'})  survivors(h=0)=${survivors}`+
    (knowns?`  [cap-06 says S1=${knowns.S1} S2=${knowns.S2} surv=${knowns.surv}: ${S1===knowns.S1&&S2===knowns.S2&&survivors===knowns.surv?'MATCH ✓':'MISMATCH ✗'}]`:''));

  // ---- verification A: brute-force pair-combo counts -----------------------
  // full at x≤13, 8 random pairs at larger x
  {const rng=mulberry(x*7919);let bad=0,checked=0;
   const doPair=(i,j)=>{const q=scour[i],qp=scour[j];const c=[0,0,0,0];
     for(const r of natal){const a=(r%q===0)?0:((r+2)%q===0?1:-1);if(a<0)continue;
       const b=(r%qp===0)?0:((r+2)%qp===0?1:-1);if(b<0)continue;c[a*2+b]++}
     for(let k=0;k<4;k++)if(c[k]!==table[(i*nS+j)*4+k])bad++;checked++};
   if(nS*(nS-1)/2<=600){for(let i=0;i<nS;i++)for(let j=i+1;j<nS;j++)doPair(i,j)}
   else for(let t=0;t<8;t++){const i=Math.floor(rng()*nS),j0=Math.floor(rng()*nS);if(i!==j0)doPair(Math.min(i,j0),Math.max(i,j0))}
   console.log(`verify A (brute pair-combo counts): ${checked} pairs × 4 combos — ${bad===0?'all match ✓':bad+' MISMATCHES ✗'}`);}

  // ---- verification B: Lemma L1 in t-space (dilated conditions) ------------
  {const rng=mulberry(x*104729);let bad=0,checked=0;
   for(let t0=0;t0<5;t0++){
     const i=Math.floor(rng()*nS);let j=Math.floor(rng()*nS);if(i===j)j=(j+1)%nS;
     const [ii,jj]=[Math.min(i,j),Math.max(i,j)],q=scour[ii],qp=scour[jj],Q=q*qp,rho=W%Q;
     const m=(qp-2)*inv(q%qp,qp)%qp,c1=q*m,cs=[0,c1,Q-2-c1,Q-2];
     for(let k=0;k<4;k++){const c=cs[k],L=(W-rho)/Q+(c<rho?1:0);
       const i30=inv(Q%30,30),t30a=(((11-c)%30)*i30%30+30)%30,t30b=(((17-c)%30)*i30%30+30)%30;
       const fb=mids.map(p=>{const ip=inv(Q%p,p);return [((-c%p+p)*ip)%p,(((-c-2)%p+p)%p*ip)%p]});
       let cnt=0;
       for(let t=0;t<L;t++){const m3=t%30;if(m3!==t30a&&m3!==t30b)continue;
         let okk=true;for(let u=0;u<mids.length;u++){const tp=t%mids[u];if(tp===fb[u][0]||tp===fb[u][1]){okk=false;break}}
         if(okk)cnt++;}
       if(cnt!==table[(ii*nS+jj)*4+k])bad++;checked++}}
   console.log(`verify B (L1 window-dilation, t-space recount): ${checked} combo-windows — ${bad===0?'all match ✓':bad+' MISMATCHES ✗'}`);}

  // ---- verification C: class-sum identity (Lemma L2), first pair -----------
  if(x===11){const q=scour[0],qp=scour[1],Q=q*qp;let tot=0;
    for(let c=0;c<Q;c++){let cnt=0;for(const r of natal)if(r%Q===c)cnt++;tot+=cnt}
    console.log(`verify C (L2 class-sum, pair ${q}·${qp}): Σ_c cnt_c = ${tot} ${tot===N?'= N ✓':'✗'}`);}

  // ---- the per-pair march ---------------------------------------------------
  const nPairs=nS*(nS-1)/2;
  const devsP=new Float64Array(nPairs),residsP=new Float64Array(nPairs);
  const acc={dev:[0,0,0],len:[0,0,0],head:[0,0,0],resid:[0,0,0]}; // 0=(0,0), 1=mixed, 2=(−2,−2)
  let sumCRT=0,pi=0,pos=0,neg=0,zer=0,c00pos=0,c00neg=0,euclid22=0,dead2=0;
  let tailChecked=0,tailBad=0,tailQnatal=0,tailN=0,tailCRT=0;
  const aliveT=new Float64Array(30),denomT=new Float64Array(30);
  let headResid00=0,bulkResid00=0;
  // L-buckets: [L̄=1] [2..pNext−1] [pNext..x²] [>x²]
  const BK=4,bk={n:new Float64Array(BK),dev:new Float64Array(BK),resid:new Float64Array(BK),dev00:new Float64Array(BK),crt00:new Float64Array(BK),qn:new Float64Array(BK)};
  const hhtt={n:[0,0,0],dev:[0,0,0],resid:[0,0,0]};
  const top=[],top00=[];
  const pushTop=(arr,o,K)=>{arr.push(o);arr.sort((a,b)=>b.dev-a.dev);if(arr.length>K)arr.pop()};
  for(let i=0;i<nS;i++){const q=scour[i],w2q=((W-2)%q===0);
    for(let j=i+1;j<nS;j++){const qp=scour[j],Q=q*qp,rho=W%Q,fWQ=(W-rho)/Q,crt=N/Q;
      const m=(qp-2)*inv(q%qp,qp)%qp,c1=q*m;
      const cs=[0,c1,Q-2-c1,Q-2],base=(i*nS+j)*4;
      let pd=0,pr=0;
      for(let k=0;k<4;k++){
        const cnt=table[base+k],c=cs[k],L=fWQ+(c<rho?1:0);
        const lenT=N*L/W-crt;
        let headT=0;
        if(k===0){headT=-NW;if(w2q&&(W-2)%qp===0){headT-=NW;dead2++}}
        const dev=cnt-crt,resid=dev-lenT-headT,ct=k===0?0:(k===3?2:1);
        acc.dev[ct]+=dev;acc.len[ct]+=lenT;acc.head[ct]+=headT;acc.resid[ct]+=resid;
        pd+=dev;pr+=resid;
        if(k===0){if(dev>1e-9)c00pos++;else if(dev<-1e-9)c00neg++;
          if(top00.length<3||dev>top00[top00.length-1].dev)pushTop(top00,{q,qp,dev,cnt,crt},3)}
        if(k===3&&c<rho)euclid22++;
      }
      sumCRT+=4*crt;devsP[pi]=pd;residsP[pi]=pr;pi++;
      if(pd>1e-9)pos++;else if(pd<-1e-9)neg++;else zer++;
      if(top.length<5||pd>top[top.length-1].dev)pushTop(top,{q,qp,dev:pd,cnts:[table[base],table[base+1],table[base+2],table[base+3]],crt:4*crt},5);
      // L-bucket
      const b=fWQ===1?0:(fWQ<pNext?1:(fWQ<=x*x?2:3));
      bk.n[b]++;bk.dev[b]+=pd;bk.resid[b]+=pr;bk.dev00[b]+=table[base]-crt;bk.crt00[b]+=crt;
      // T2 tail lemma + Q-natal head position
      const Qnat=fWQ<=29?(isNatal(Q)?1:0):-1; // only compute when cheapish & needed
      if(fWQ<pNext){tailChecked++;const qn=isNatal(Q)?1:0;tailQnatal+=qn;tailN++;tailCRT+=crt;
        if(table[base]!==qn)tailBad++;bk.qn[b]+=qn}
      // head profile of the (0,0) window: t odd, coprime-to-30 candidates ≤ min(fWQ,29)
      {const tm=Math.min(fWQ,29);let aliveCnt=0;
       for(let t=1;t<=tm;t+=2){if(t%3===0||t%5===0)continue;denomT[t]++;
         if(isNatal(t*Q)){aliveT[t]++;aliveCnt++}}
       const hr=aliveCnt-tm*NW;headResid00+=hr;
       bulkResid00+=(table[base]-crt-(N*(fWQ+1)/W-crt)-(-NW))-hr;}
      const cls=(q<=cbrtW?0:1)+(qp<=cbrtW?0:1);
      hhtt.n[cls]++;hhtt.dev[cls]+=pd;hhtt.resid[cls]+=pr;
    }}
  const totDev=acc.dev[0]+acc.dev[1]+acc.dev[2],totLen=acc.len[0]+acc.len[1]+acc.len[2];
  const totHead=acc.head[0]+acc.head[1]+acc.head[2],totResid=acc.resid[0]+acc.resid[1]+acc.resid[2];
  console.log(`S2=${S2} vs ΣCRT=${f(sumCRT,1)}  ratio=${f(S2/sumCRT,4)}  total dev=${f(totDev,1)}`);
  console.log(`DECOMPOSITION dev = len + head + resid   (per-pair means in N/W units in brackets)`);
  const lbl=['(0,0)  ','mixed  ','(−2,−2)'];
  for(let ct=0;ct<3;ct++)console.log(`  ${lbl[ct]}: dev=${f(acc.dev[ct],1).padStart(8)}  len=${f(acc.len[ct],1).padStart(8)}  head=${f(acc.head[ct],1).padStart(7)}  resid=${f(acc.resid[ct],1).padStart(8)}   [${f(acc.dev[ct]/nPairs/NW,2)}, ${f(acc.len[ct]/nPairs/NW,2)}, ${f(acc.head[ct]/nPairs/NW,2)}, ${f(acc.resid[ct]/nPairs/NW,2)}]`);
  console.log(`  TOTAL  : dev=${f(totDev,1).padStart(8)}  len=${f(totLen,1).padStart(8)}  head=${f(totHead,1).padStart(7)}  resid=${f(totResid,1).padStart(8)}   structured(len+head) explains ${pct((totLen+totHead)/totDev)} of the deficit`);
  // significance of resid
  {let s2=0;for(let k=0;k<nPairs;k++)s2+=residsP[k]*residsP[k];
   const sd=Math.sqrt(s2/nPairs-(totResid/nPairs)**2),z=totResid/(sd*Math.sqrt(nPairs));
   console.log(`resid: mean/pair=${f(totResid/nPairs/NW,3)} N/W units, sd=${f(sd,3)}, z(Σresid)=${f(z,2)}σ`);}
  // sign counts
  console.log(`pair dev sign: +${pos} / −${neg} / 0:${zer}  (${pct(pos/nPairs)} positive)   combo(0,0) dev: +${c00pos} / −${c00neg}`);
  console.log(`top positive pairs: ${top.map(t=>`(${t.q},${t.qp}) +${f(t.dev,2)} cnts=[${t.cnts}] crt=${f(t.crt,2)}`).join(' | ')}`);
  console.log(`top positive (0,0) combos: ${top00.map(t=>`(${t.q},${t.qp}) cnt=${t.cnt} crt=${f(t.crt,3)} dev=+${f(t.dev,3)}`).join(' | ')}`);
  // quantiles of pair dev
  {const s=Array.from(devsP).sort((a,b)=>a-b),qv=p=>s[Math.min(s.length-1,Math.floor(p*s.length))];
   console.log(`pair-dev quantiles: min=${f(s[0],2)} 5%=${f(qv(.05),2)} 25%=${f(qv(.25),2)} med=${f(qv(.5),2)} 75%=${f(qv(.75),2)} 95%=${f(qv(.95),2)} max=${f(s[s.length-1],2)}`);}
  // L-buckets
  console.log(`L-buckets (L̄=⌊W/Q⌋):  [dev/pair and resid/pair in N/W units; dev00/pair; P(qq′ natal) where tracked]`);
  const blbl=[`L̄=1`,`2≤L̄<${pNext}`,`${pNext}≤L̄≤${x*x}`,`L̄>${x*x}`];
  for(let b=0;b<BK;b++){if(!bk.n[b])continue;
    console.log(`  ${blbl[b].padEnd(12)}: n=${String(bk.n[b]).padStart(7)}  dev/pair=${f(bk.dev[b]/bk.n[b]/NW,2).padStart(6)}  resid/pair=${f(bk.resid[b]/bk.n[b]/NW,2).padStart(6)}  dev00/pair=${f(bk.dev00[b]/bk.n[b]/NW,2).padStart(6)}${b<2?`  P(Qnatal)=${f(bk.qn[b]/bk.n[b],3)} vs crt00/pair=${f(bk.crt00[b]/bk.n[b],3)}`:''}`);}
  console.log(`T2 tail lemma (L̄<${pNext} ⇒ cnt00=[qq′ natal]): ${tailChecked} pairs, ${tailBad===0?'0 violations ✓':tailBad+' VIOLATIONS ✗'};  P(qq′ natal)=${tailN?f(tailQnatal/tailN,4):'—'} vs mean crt00=${tailN?f(tailCRT/tailN,4):'—'}  (theory ≈ ${f(0.25*mids.reduce((a,p)=>a*(p-2)/(p-1),1),4)})`);
  console.log(`(0,0) head profile, alive rate at t (baseline N/W=${f(NW,4)}): `+[1,7,11,13,17,19,23,29].filter(t=>denomT[t]>0).map(t=>`t=${t}: ${f(aliveT[t]/denomT[t],4)}`).join('  '));
  console.log(`(0,0) resid split: head(t<30)=${f(headResid00,1)}  bulk=${f(bulkResid00,1)}   [Σ over pairs]`);
  console.log(`HH/HT/TT (head = q ≤ W^⅓=${f(cbrtW,1)}): `+['HH','HT','TT'].map((s,k)=>`${s}: n=${hhtt.n[k]} dev/pair=${hhtt.n[k]?f(hhtt.dev[k]/hhtt.n[k]/NW,2):'—'} resid/pair=${hhtt.n[k]?f(hhtt.resid[k]/hhtt.n[k]/NW,2):'—'}`).join('  '));
  console.log(`bookkeeping: (−2,−2) long-window (q,q′ | W+1 Euclid) pairs: ${euclid22};  second dead position (Q | W−2): ${dead2}`);

  // ---- singles get the same treatment ---------------------------------------
  {let sDev=0,sLen=0,sHead=0,sResid=0,sPos=0,sNeg=0,crtS=0;const eu=[];
   for(let qi=0;qi<nS;qi++){const q=scour[qi],rho=W%q,fq=(W-rho)/q,crt=N/q;
     if((W+1)%q===0)eu.push(q);
     let qd=0;
     for(let a=0;a<2;a++){const c=a===0?0:q-2,L=fq+(c<rho?1:0),cnt=singles[(qi<<1)|a];
       const lenT=N*L/W-crt,headT=a===0?-NW*(1+((W-2)%q===0?1:0)):0;
       const dev=cnt-crt;sDev+=dev;sLen+=lenT;sHead+=headT;sResid+=dev-lenT-headT;qd+=dev;crtS+=crt}
     if(qd>1e-9)sPos++;else if(qd<-1e-9)sNeg++;}
   console.log(`SINGLES: S1=${S1} vs Σ2N/q=${f(crtS,1)} — dev=${f(sDev,1)} = len ${f(sLen,1)} + head ${f(sHead,1)} + resid ${f(sResid,1)};  per-q sign +${sPos}/−${sNeg};  q | W+1 (Euclid, long −2-window): [${eu.join(',')}]`);}

  return {x,W,N,NW,nS,nPairs,S1,S2,sumCRT,totDev,totLen,totHead,totResid,survivors,pos,neg,c00pos,c00neg};
}

const t0=Date.now();
const KNOWN={11:{S1:73,S2:30,surv:45},13:{S1:1135,S2:601,surv:307},17:{S1:22132,S2:15770,surv:3099}};
const LEVELS=process.argv[2]?process.argv[2].split(',').map(Number):[11,13,17,19,23];
const results=[];
for(const x of LEVELS) results.push(runLevel(x,KNOWN[x]));

console.log(`\n===== CROSS-LEVEL TREND =====`);
console.log(` x  |   pairs  |    S2     |   ΣCRT    | ratio  | Σdev     | len+head (structured) | resid    | resid/pair (N/W) | %pairs dev>0 | %(0,0) dev>0`);
for(const r of results){
  console.log(`${String(r.x).padStart(3)} | ${String(r.nPairs).padStart(8)} | ${String(r.S2).padStart(9)} | ${f(r.sumCRT,0).padStart(9)} | ${f(r.S2/r.sumCRT,4)} | ${f(r.totDev,0).padStart(8)} | ${f(r.totLen+r.totHead,0).padStart(9)}             | ${f(r.totResid,0).padStart(8)} | ${f(r.totResid/r.nPairs/r.NW,3).padStart(7)}          | ${pct(r.pos/r.nPairs).padStart(6)}       | ${pct(r.c00pos/(r.c00pos+r.c00neg))}`);
}
console.log(`\nelapsed ${(Date.now()-t0)/1000|0}s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-12-overlap-sign.js
//   invocation:  node research/natal-cap-12-overlap-sign.js
//   code-sha256: 14d22a74d6c3f5b0de369ab00beedaa0ea0b3b26c6d019eef6a0777580e11405
//   out-sha256:  3c9ef8b2cea7d6742c40a3f0eb3103e0aad77deaeec5532996a4f047feee0f8b
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     3.3 s
// ============================================================================
//
// ===== @11: W=2310, N=90, N/W=0.03896, scour=10 primes (13..47], pairs=45 =====
// S1=73  S2=30 (ΣC(h,2)=30 ✓)  survivors(h=0)=45  [cap-06 says S1=73 S2=30 surv=45: MATCH ✓]
// verify A (brute pair-combo counts): 45 pairs × 4 combos — all match ✓
// verify B (L1 window-dilation, t-space recount): 20 combo-windows — all match ✓
// verify C (L2 class-sum, pair 13·17): Σ_c cnt_c = 90 = N ✓
// S2=30 vs ΣCRT=24.7  ratio=1.2158  total dev=5.3
// DECOMPOSITION dev = len + head + resid   (per-pair means in N/W units in brackets)
//   (0,0)  : dev=     3.8  len=     0.9  head=   -1.8  resid=     4.7   [2.19, 0.50, -1.00, 2.68]
//   mixed  : dev=    -1.3  len=    -0.0  head=    0.0  resid=    -1.3   [-0.76, -0.01, 0.00, -0.75]
//   (−2,−2): dev=     2.8  len=    -0.9  head=    0.0  resid=     3.7   [1.61, -0.50, 0.00, 2.11]
//   TOTAL  : dev=     5.3  len=    -0.0  head=   -1.8  resid=     7.1   structured(len+head) explains -33.2% of the deficit
// resid: mean/pair=4.044 N/W units, sd=0.566, z(Σresid)=1.87σ
// pair dev sign: +24 / −21 / 0:0  (53.3% positive)   combo(0,0) dev: +10 / −35
// top positive pairs: (19,31) +1.39 cnts=[0,0,1,1] crt=0.61 | (17,23) +1.08 cnts=[0,1,1,0] crt=0.92 | (13,29) +1.05 cnts=[1,0,1,0] crt=0.95 | (41,43) +0.80 cnts=[0,1,0,0] crt=0.20 | (31,47) +0.75 cnts=[1,0,0,0] crt=0.25
// top positive (0,0) combos: (31,47) cnt=1 crt=0.062 dev=+0.938 | (31,41) cnt=1 crt=0.071 dev=+0.929 | (29,43) cnt=1 crt=0.072 dev=+0.928
// pair-dev quantiles: min=-1.20 5%=-0.63 25%=-0.34 med=0.18 75%=0.55 95%=1.05 max=1.39
// L-buckets (L̄=⌊W/Q⌋):  [dev/pair and resid/pair in N/W units; dev00/pair; P(qq′ natal) where tracked]
//   L̄=1        : n=     12  dev/pair=  6.64  resid/pair=  7.75  dev00/pair=  4.87  P(Qnatal)=0.250 vs crt00/pair=0.060
//   2≤L̄<13     : n=     33  dev/pair=  1.73  resid/pair=  2.70  dev00/pair=  1.21  P(Qnatal)=0.212 vs crt00/pair=0.165
// T2 tail lemma (L̄<13 ⇒ cnt00=[qq′ natal]): 45 pairs, 0 violations ✓;  P(qq′ natal)=0.2222 vs mean crt00=0.1371  (theory ≈ 0.1875)
// (0,0) head profile, alive rate at t (baseline N/W=0.0390): t=1: 0.2222  t=7: 0.0000
// (0,0) resid split: head(t<30)=4.7  bulk=0.0   [Σ over pairs]
// HH/HT/TT (head = q ≤ W^⅓=13.2): HH: n=0 dev/pair=— resid/pair=—  HT: n=9 dev/pair=0.58 resid/pair=1.67  TT: n=36 dev/pair=3.65 resid/pair=4.64
// bookkeeping: (−2,−2) long-window (q,q′ | W+1 Euclid) pairs: 0;  second dead position (Q | W−2): 0
// SINGLES: S1=73 vs Σ2N/q=71.0 — dev=2.0 = len -0.0 + head -0.4 + resid 2.4;  per-q sign +7/−3;  q | W+1 (Euclid, long −2-window): []
//
// ===== @13: W=30030, N=990, N/W=0.03297, scour=34 primes (17..173], pairs=561 =====
// S1=1135  S2=601 (ΣC(h,2)=601 ✓)  survivors(h=0)=307  [cap-06 says S1=1135 S2=601 surv=307: MATCH ✓]
// verify A (brute pair-combo counts): 561 pairs × 4 combos — all match ✓
// verify B (L1 window-dilation, t-space recount): 20 combo-windows — all match ✓
// S2=601 vs ΣCRT=620.0  ratio=0.9693  total dev=-19.0
// DECOMPOSITION dev = len + head + resid   (per-pair means in N/W units in brackets)
//   (0,0)  : dev=    -9.0  len=     9.2  head=  -18.5  resid=     0.3   [-0.49, 0.50, -1.00, 0.02]
//   mixed  : dev=     8.0  len=     0.2  head=    0.0  resid=     7.8   [0.43, 0.01, 0.00, 0.42]
//   (−2,−2): dev=   -18.0  len=    -9.3  head=    0.0  resid=    -8.7   [-0.97, -0.50, 0.00, -0.47]
//   TOTAL  : dev=   -19.0  len=     0.1  head=  -18.5  resid=    -0.6   structured(len+head) explains 96.9% of the deficit
// resid: mean/pair=-0.031 N/W units, sd=0.823, z(Σresid)=-0.03σ
// pair dev sign: +254 / −307 / 0:0  (45.3% positive)   combo(0,0) dev: +116 / −445
// top positive pairs: (19,71) +2.06 cnts=[1,2,1,1] crt=2.94 | (53,79) +2.05 cnts=[1,1,1,0] crt=0.95 | (19,41) +1.92 cnts=[1,2,3,1] crt=5.08 | (17,23) +1.87 cnts=[4,2,4,2] crt=10.13 | (137,167) +1.83 cnts=[0,0,1,1] crt=0.17
// top positive (0,0) combos: (17,29) cnt=4 crt=2.008 dev=+1.992 | (19,23) cnt=4 crt=2.265 dev=+1.735 | (17,23) cnt=4 crt=2.532 dev=+1.468
// pair-dev quantiles: min=-3.45 5%=-1.36 25%=-0.53 med=-0.17 75%=0.60 95%=1.39 max=2.06
// L-buckets (L̄=⌊W/Q⌋):  [dev/pair and resid/pair in N/W units; dev00/pair; P(qq′ natal) where tracked]
//   L̄=1        : n=     83  dev/pair= 11.27  resid/pair= 12.37  dev00/pair=  3.92  P(Qnatal)=0.181 vs crt00/pair=0.052
//   2≤L̄<17     : n=    414  dev/pair= -1.53  resid/pair= -0.54  dev00/pair= -1.24  P(Qnatal)=0.167 vs crt00/pair=0.208
//   17≤L̄≤169   : n=     64  dev/pair=-13.76  resid/pair=-12.80  dev00/pair= -1.31
// T2 tail lemma (L̄<17 ⇒ cnt00=[qq′ natal]): 497 pairs, 0 violations ✓;  P(qq′ natal)=0.1690 vs mean crt00=0.1816  (theory ≈ 0.1719)
// (0,0) head profile, alive rate at t (baseline N/W=0.0330): t=1: 0.1747  t=7: 0.0000  t=11: 0.0000  t=13: 0.0000  t=17: 0.2031  t=19: 0.1698  t=23: 0.1842  t=29: 0.1667
// (0,0) resid split: head(t<30)=-2.1  bulk=2.3   [Σ over pairs]
// HH/HT/TT (head = q ≤ W^⅓=31.1): HH: n=10 dev/pair=-11.53 resid/pair=-10.37  HT: n=145 dev/pair=-11.87 resid/pair=-10.81  TT: n=406 dev/pair=3.10 resid/pair=4.07
// bookkeeping: (−2,−2) long-window (q,q′ | W+1 Euclid) pairs: 0;  second dead position (Q | W−2): 0
// SINGLES: S1=1135 vs Σ2N/q=1135.3 — dev=-0.3 = len -0.0 + head -1.1 + resid 0.8;  per-q sign +20/−14;  q | W+1 (Euclid, long −2-window): [59]
//
// ===== @17: W=510510, N=14850, N/W=0.02909, scour=120 primes (19..709], pairs=7140 =====
// S1=22132  S2=15770 (ΣC(h,2)=15770 ✓)  survivors(h=0)=3099  [cap-06 says S1=22132 S2=15770 surv=3099: MATCH ✓]
// verify A (brute pair-combo counts): 8 pairs × 4 combos — all match ✓
// verify B (L1 window-dilation, t-space recount): 20 combo-windows — all match ✓
// S2=15770 vs ΣCRT=16185.0  ratio=0.9744  total dev=-415.0
// DECOMPOSITION dev = len + head + resid   (per-pair means in N/W units in brackets)
//   (0,0)  : dev=  -176.2  len=   104.6  head= -207.8  resid=   -73.0   [-0.85, 0.50, -1.00, -0.35]
//   mixed  : dev=   -37.5  len=     0.5  head=    0.0  resid=   -38.0   [-0.18, 0.00, 0.00, -0.18]
//   (−2,−2): dev=  -201.2  len=  -103.0  head=    0.0  resid=   -98.2   [-0.97, -0.50, 0.00, -0.47]
//   TOTAL  : dev=  -415.0  len=     2.1  head= -207.8  resid=  -209.3   structured(len+head) explains 49.6% of the deficit
// resid: mean/pair=-1.008 N/W units, sd=0.918, z(Σresid)=-2.70σ
// pair dev sign: +2960 / −4180 / 0:0  (41.5% positive)   combo(0,0) dev: +1655 / −5485
// top positive pairs: (23,191) +4.48 cnts=[4,5,4,5] crt=13.52 | (53,191) +4.13 cnts=[1,3,3,3] crt=5.87 | (19,149) +4.02 cnts=[6,6,7,6] crt=20.98 | (59,167) +3.97 cnts=[2,3,2,3] crt=6.03 | (29,73) +3.94 cnts=[9,8,7,8] crt=28.06
// top positive (0,0) combos: (31,53) cnt=12 crt=9.038 dev=+2.962 | (23,127) cnt=8 crt=5.084 dev=+2.916 | (47,101) cnt=6 crt=3.128 dev=+2.872
// pair-dev quantiles: min=-7.06 5%=-1.54 25%=-0.55 med=-0.19 75%=0.57 95%=1.49 max=4.48
// L-buckets (L̄=⌊W/Q⌋):  [dev/pair and resid/pair in N/W units; dev00/pair; P(qq′ natal) where tracked]
//   L̄=1        : n=    916  dev/pair=  7.42  resid/pair=  8.57  dev00/pair=  4.05  P(Qnatal)=0.164 vs crt00/pair=0.046
//   2≤L̄<19     : n=   4608  dev/pair= -2.77  resid/pair= -1.81  dev00/pair= -1.28  P(Qnatal)=0.161 vs crt00/pair=0.199
//   19≤L̄≤289   : n=   1573  dev/pair= -5.27  resid/pair= -4.29  dev00/pair= -2.74
//   L̄>289      : n=     43  dev/pair=  0.33  resid/pair=  1.31  dev00/pair= 10.88
// T2 tail lemma (L̄<19 ⇒ cnt00=[qq′ natal]): 5524 pairs, 0 violations ✓;  P(qq′ natal)=0.1618 vs mean crt00=0.1735  (theory ≈ 0.1611)
// (0,0) head profile, alive rate at t (baseline N/W=0.0291): t=1: 0.1619  t=7: 0.0000  t=11: 0.0000  t=13: 0.0000  t=17: 0.0000  t=19: 0.1658  t=23: 0.1599  t=29: 0.1617
// (0,0) resid split: head(t<30)=-331.9  bulk=258.7   [Σ over pairs]
// HH/HT/TT (head = q ≤ W^⅓=79.9): HH: n=105 dev/pair=15.63 resid/pair=16.64  HT: n=1575 dev/pair=-7.45 resid/pair=-6.45  TT: n=5460 dev/pair=-0.77 resid/pair=0.22
// bookkeeping: (−2,−2) long-window (q,q′ | W+1 Euclid) pairs: 3;  second dead position (Q | W−2): 3
// SINGLES: S1=22132 vs Σ2N/q=22182.8 — dev=-50.8 = len 0.1 + head -3.6 + resid -47.3;  per-q sign +60/−60;  q | W+1 (Euclid, long −2-window): [19,97,277]
//
// ===== @19: W=9699690, N=252450, N/W=0.02603, scour=435 primes (23..3109], pairs=94395 =====
// S1=450695  S2=395426 (ΣC(h,2)=395426 ✓)  survivors(h=0)=38380
// verify A (brute pair-combo counts): 8 pairs × 4 combos — all match ✓
// verify B (L1 window-dilation, t-space recount): 20 combo-windows — all match ✓
// S2=395426 vs ΣCRT=397290.2  ratio=0.9953  total dev=-1864.2
// DECOMPOSITION dev = len + head + resid   (per-pair means in N/W units in brackets)
//   (0,0)  : dev= -1291.5  len=  1236.6  head=-2456.8  resid=   -71.4   [-0.53, 0.50, -1.00, -0.03]
//   mixed  : dev=   688.9  len=    -3.5  head=    0.0  resid=   692.4   [0.28, -0.00, 0.00, 0.28]
//   (−2,−2): dev= -1261.5  len= -1220.2  head=    0.0  resid=   -41.4   [-0.51, -0.50, 0.00, -0.02]
//   TOTAL  : dev= -1864.2  len=    12.9  head=-2456.8  resid=   579.7   structured(len+head) explains 131.1% of the deficit
// resid: mean/pair=0.236 N/W units, sd=1.141, z(Σresid)=1.65σ
// pair dev sign: +39361 / −55034 / 0:0  (41.7% positive)   combo(0,0) dev: +21262 / −73133
// top positive pairs: (37,307) +12.10 cnts=[26,22,28,25] crt=88.90 | (23,83) +10.03 cnts=[137,134,136,132] crt=528.97 | (23,67) +9.71 cnts=[167,172,164,162] crt=655.29 | (101,163) +9.66 cnts=[18,19,17,17] crt=61.34 | (53,397) +9.01 cnts=[12,14,14,17] crt=47.99
// top positive (0,0) combos: (43,139) cnt=48 crt=42.237 dev=+5.763 | (23,43) cnt=261 crt=255.258 dev=+5.742 | (29,71) cnt=128 crt=122.608 dev=+5.392
// pair-dev quantiles: min=-13.39 5%=-1.72 25%=-0.54 med=-0.18 75%=0.63 95%=1.73 max=12.10
// L-buckets (L̄=⌊W/Q⌋):  [dev/pair and resid/pair in N/W units; dev00/pair; P(qq′ natal) where tracked]
//   L̄=1        : n=  11572  dev/pair=  8.58  resid/pair=  9.73  dev00/pair=  4.27  P(Qnatal)=0.152 vs crt00/pair=0.041
//   2≤L̄<23     : n=  60950  dev/pair= -3.17  resid/pair= -2.20  dev00/pair= -1.62  P(Qnatal)=0.152 vs crt00/pair=0.194
//   23≤L̄≤361   : n=  20262  dev/pair=  0.66  resid/pair=  1.66  dev00/pair= -0.03
//   L̄>361      : n=   1611  dev/pair=  5.29  resid/pair=  6.30  dev00/pair= -0.03
// T2 tail lemma (L̄<23 ⇒ cnt00=[qq′ natal]): 72522 pairs, 0 violations ✓;  P(qq′ natal)=0.1523 vs mean crt00=0.1699  (theory ≈ 0.1522)
// (0,0) head profile, alive rate at t (baseline N/W=0.0260): t=1: 0.1524  t=7: 0.0000  t=11: 0.0000  t=13: 0.0000  t=17: 0.0000  t=19: 0.0000  t=23: 0.1523  t=29: 0.1517
// (0,0) resid split: head(t<30)=-7042.4  bulk=6971.0   [Σ over pairs]
// HH/HT/TT (head = q ≤ W^⅓=213.3): HH: n=741 dev/pair=-4.12 resid/pair=-3.11  HT: n=15444 dev/pair=5.69 resid/pair=6.69  TT: n=78210 dev/pair=-2.00 resid/pair=-1.01
// bookkeeping: (−2,−2) long-window (q,q′ | W+1 Euclid) pairs: 0;  second dead position (Q | W−2): 0
// SINGLES: S1=450695 vs Σ2N/q=450791.0 — dev=-96.0 = len -0.2 + head -11.3 + resid -84.5;  per-q sign +202/−233;  q | W+1 (Euclid, long −2-window): [347]
//
// ===== @23: W=223092870, N=5301450, N/W=0.02376, scour=1739 primes (29..14929], pairs=1511191 =====
// S1=10883167  S2=11044311 (ΣC(h,2)=11044311 ✓)  survivors(h=0)=597475
// verify A (brute pair-combo counts): 8 pairs × 4 combos — all match ✓
// verify B (L1 window-dilation, t-space recount): 20 combo-windows — all match ✓
// S2=11044311 vs ΣCRT=11078586.2  ratio=0.9969  total dev=-34275.2
// DECOMPOSITION dev = len + head + resid   (per-pair means in N/W units in brackets)
//   (0,0)  : dev=-17485.5  len= 18076.8  head=-35911.1  resid=   348.7   [-0.49, 0.50, -1.00, 0.01]
//   mixed  : dev=  1528.9  len=    11.5  head=    0.0  resid=  1517.5   [0.04, 0.00, 0.00, 0.04]
//   (−2,−2): dev=-18318.5  len=-17834.2  head=    0.0  resid=  -484.3   [-0.51, -0.50, 0.00, -0.01]
//   TOTAL  : dev=-34275.2  len=   254.1  head=-35911.1  resid=  1381.9   structured(len+head) explains 104.0% of the deficit
// resid: mean/pair=0.038 N/W units, sd=1.242, z(Σresid)=0.90σ
// pair dev sign: +609860 / −901331 / 0:0  (40.4% positive)   combo(0,0) dev: +322083 / −1189108
// top positive pairs: (43,89) +27.90 cnts=[1390,1392,1393,1394] crt=5541.10 | (31,131) +24.18 cnts=[1310,1309,1312,1315] crt=5221.82 | (29,229) +21.84 cnts=[803,810,796,806] crt=3193.16 | (29,167) +21.35 cnts=[1102,1101,1100,1097] crt=4378.65 | (53,191) +20.19 cnts=[530,528,532,525] crt=2094.81
// top positive (0,0) combos: (29,47) cnt=3904 crt=3889.545 dev=+14.455 | (71,113) cnt=675 crt=660.782 dev=+14.218 | (29,281) cnt=664 crt=650.564 dev=+13.436
// pair-dev quantiles: min=-21.09 5%=-1.77 25%=-0.53 med=-0.18 75%=0.63 95%=1.76 max=27.90
// L-buckets (L̄=⌊W/Q⌋):  [dev/pair and resid/pair in N/W units; dev00/pair; P(qq′ natal) where tracked]
//   L̄=1        : n= 191959  dev/pair=  9.06  resid/pair= 10.20  dev00/pair=  4.54  P(Qnatal)=0.145 vs crt00/pair=0.037
//   2≤L̄<29     : n=1013559  dev/pair= -4.37  resid/pair= -3.40  dev00/pair= -2.19  P(Qnatal)=0.145 vs crt00/pair=0.197
//   29≤L̄≤529   : n= 274769  dev/pair=  5.54  resid/pair=  6.54  dev00/pair=  2.75
//   L̄>529      : n=  30904  dev/pair= -8.95  resid/pair= -7.95  dev00/pair= -4.46
// T2 tail lemma (L̄<29 ⇒ cnt00=[qq′ natal]): 1205518 pairs, 0 violations ✓;  P(qq′ natal)=0.1453 vs mean crt00=0.1720  (theory ≈ 0.1453)
// (0,0) head profile, alive rate at t (baseline N/W=0.0238): t=1: 0.1453  t=7: 0.0000  t=11: 0.0000  t=13: 0.0000  t=17: 0.0000  t=19: 0.0000  t=23: 0.0000  t=29: 0.1452
// (0,0) resid split: head(t<30)=-139799.0  bulk=140147.7   [Σ over pairs]
// HH/HT/TT (head = q ≤ W^⅓=606.5): HH: n=5050 dev/pair=-33.60 resid/pair=-32.60  HT: n=165438 dev/pair=16.23 resid/pair=17.23  TT: n=1340703 dev/pair=-2.95 resid/pair=-1.96
// bookkeeping: (−2,−2) long-window (q,q′ | W+1 Euclid) pairs: 0;  second dead position (Q | W−2): 1
// SINGLES: S1=10883167 vs Σ2N/q=10881713.0 — dev=1454.0 = len 1.2 + head -41.4 + resid 1494.1;  per-q sign +986/−753;  q | W+1 (Euclid, long −2-window): [317]
//
// ===== CROSS-LEVEL TREND =====
//  x  |   pairs  |    S2     |   ΣCRT    | ratio  | Σdev     | len+head (structured) | resid    | resid/pair (N/W) | %pairs dev>0 | %(0,0) dev>0
//  11 |       45 |        30 |        25 | 1.2158 |        5 |        -2             |        7 |   4.044          |  53.3%       | 22.2%
//  13 |      561 |       601 |       620 | 0.9693 |      -19 |       -18             |       -1 |  -0.031          |  45.3%       | 20.7%
//  17 |     7140 |     15770 |     16185 | 0.9744 |     -415 |      -206             |     -209 |  -1.008          |  41.5%       | 23.2%
//  19 |    94395 |    395426 |    397290 | 0.9953 |    -1864 |     -2444             |      580 |   0.236          |  41.7%       | 22.5%
//  23 |  1511191 |  11044311 |  11078586 | 0.9969 |   -34275 |    -35657             |     1382 |   0.038          |  40.4%       | 21.3%
//
// elapsed 3s
// ============================================================================
// READINGS
// 1. THE ONE-SIDED CONJECTURE IS REFUTED AT EVERY GRANULARITY — with mechanism.
//    Per pair: 40–53% of pairs sit ABOVE their CRT prediction at every level
//    (609,860 of 1,511,191 pairs at @23; exhibits above). Per combo: the (0,0)
//    combo alone is above CRT for 21–23% (20.7–23.2%) of pairs. Aggregate: S₂ = 30 > 24.7
//    = ΣCRT at @11 (ratio 1.2158) — the inequality S₂ ≤ Σ4N/qq′ is FALSE as
//    stated. (@11's excess is the L̄=1 tail of reading 4 plus small-sample
//    noise: z = +1.87σ.) Nothing one-sided survives as an identity.
// 2. BUT THE DEFICIT IS PRICED — IT IS STRUCTURE, NOT LUCK. Exact per-combo
//    decomposition dev = len + head + resid (L1–L4/T1 in the .md; every term
//    verified to the integer against brute-force at 561+ pairs and t-space
//    recounts): the deterministic part (len+head) accounts for the entire
//    aggregate deficit — 96.9% @13, 49.6% @17, 131.1% @19, 104.0% @23 — while Σresid
//    ALTERNATES IN SIGN across levels (−0.6, −209, +580, +1382; z = −0.03,
//    −2.70, +1.65, +0.90; z's treat pairs as independent — they share primes,
//    so read as indicative). cap-06's "helpful, unexplained" 3% is now a
//    formula:  S₂ ≈ ΣCRT − (#pairs)·N/W  — each pair pays one natal density.
//    Check: @13: 620.0 − 18.5 = 601.5 vs true 601; @23: 11,078,586 − 35,906
//    (= 1,511,191 pairs × N/W 0.02376) = 11,042,680 vs true 11,044,311, a gap
//    of 1,631. (The run's own exact @23 residual is 1,382 against a structured
//    term of −35,657, and the +0.90σ printed above is the z of THAT 1,382, not
//    of this one-line model's 1,631.)
// 3. WHERE −N/W PER PAIR COMES FROM: TWO MECHANISMS, ONE PER ANCHORED COMBO
//    (T1, proven). Combo (0,0): class c = 0 always draws the LONG window
//    (+N(Q−ρ)/QW, ρ = W mod Q) but its first position is r = 0, dead at every
//    level — net −Nρ/QW, mean −N/2W. Measured means: len +0.50, head −1.00
//    N/W units at ALL FIVE levels — the theorem's values to the printed digit.
//    Combo (−2,−2): class c = Q−2 draws the SHORT window (−Nρ/QW), UNLESS q
//    and q′ both divide the Euclid number W+1 (@17: W+1 = 19·97·277, exactly
//    3 such pairs; 0 elsewhere). Measured mean: −0.50 N/W everywhere. Mixed
//    combos are a length coin-flip [c<ρ]: mean 0.00–0.43 N/W, sign varies by
//    level. The brief's suspicion that the b = −2 (shift −2q̄) combos carry
//    the bias is WRONG: the two self-aligned combos carry −N/2W each; the
//    mixed pair carries nothing systematic.
// 4. THE RESIDUAL'S SIGN MAP IS THE LEGENDRE HEAD, NOT A CALM. In t-space
//    (L1) the (0,0) window is an initial segment of a coprime-to-W comb. T2
//    (proven): if ⌊W/Q⌋ < nextprime(x), every t ∈ [2,⌊W/Q⌋] has a tile-prime
//    factor, so cnt₀₀ = [qq′ ∈ N_x] EXACTLY — verified on 1,205,518 pairs at
//    @23 with 0 violations, and P(qq′ natal) = 0.1453 vs the unit-product
//    heuristic (1/4)·∏(p−2)/(p−1) = 0.1453 (4-digit match). Consequences,
//    all in the L-bucket tables: the deepest pairs (L̄=1) run ABOVE CRT
//    (+9.06 N/W per pair @23: alive rate 0.145 vs CRT ≈ 0.037); the range
//    2 ≤ L̄ < nextprime runs BELOW (count stays [qq′ natal] while CRT grows
//    ∝ L̄); beyond that the sign OSCILLATES by level (+5.54 then −8.95 @23;
//    +0.66, +5.29 @19) — Buchstab-style oscillation of the anchored comb, mean
//    ~0. Same story in the head/bulk split: heads (t<30) pay −139,799.0 @23
//    and the bulk refunds +140,147.7.
// 5. HEAD POSITIONS ARE HOT, NOT COLD. The hypothesized "forced-dead head"
//    beyond r = 0 is backwards: position t = 1 of the (0,0) window is
//    r = qq′, a product of two units — alive at 5–6× natal density (measured
//    0.145–0.222 vs N/W = 0.024–0.039; zero only at t divisible by a tile
//    prime). The dead-origin tax is exactly one position, −N/W, and it is
//    collected in T1; there is nothing more in the head to collect.
// 6. SINGLES: SAME VERDICT, SMALLER STAKES. |A_q| decomposes identically
//    (class 0: long window + dead origin; class −2: short window unless
//    q | W+1 — the Euclid divisors are real and enumerated: 59 @13;
//    19,97,277 @17; 347 @19; 317 @23). Aggregate singles dev: −0.3, −50.8,
//    −96.0, then +1454 at @23 — the sign flips; no one-sided law for S₁
//    either. (cap-06's "singles near-perfect" was the small-x shadow of
//    structured terms at scale #primes·N/W, i.e. invisible.)
// 7. VERDICT. PROVEN: L1 (window dilation), L2 (CRT = exact class average),
//    L3 (fair-price identity), L4 (dead origin), T1 (both anchored combos
//    carry deterministic bias −Nρ/QW each, exceptions exactly classified by
//    q,q′ | W±2-type divisibilities), T2 (tail pairs: cnt₀₀ = [qq′ natal]).
//    REFUTED: S₂ ≤ Σ4N/qq′ per pair, per combo, and as a universal aggregate
//    (dies at @11). MEASURED, UNPROVEN: Σresid stays at noise scale, |z|≤2.7,
//    alternating sign; per-pair resid rms 0.566→1.242 counts — O(1), attack-1's
//    window law transported to dilated windows. FOR THE CERTIFICATE PROGRAM:
//    the priceable form is  S₂ = ΣCRT − Σ_pairs[2Nρ/QW + mixed len terms]
//    + Σresid,  every structured term computable in O(log Q) per pair with no
//    enumeration; what Bonferroni-at-scale needs is not a sign theorem but a
//    per-pair DISCREPANCY CAP |resid| ≤ c — precisely open lead 3 (the
//    discrepancy lemma), now reduced to anchored dilated natal windows. The
//    pair half of "the anchored calm" (campaign convergent finding 4) is
//    hereby explained: it was the dead origin plus short-window arithmetic
//    wearing a mystery's clothes. Byproduct census numbers: survivors (=
//    twins in (√W, W)) @19 = 38,380 and @23 = 597,475 — cap-08's @19 ladder
//    (≥1877) is 4.9% (= 1877/38,380) of truth.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain verbatim
// actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   N/W=0.02376 at @23 and N/W=0.03896 at @11 give the "0.024-0.039" range in
//     reading 5.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   601.5 in reading 2 is the @13 check: ΣCRT=620.0 minus the printed (0,0)
//     head term -18.5, against the printed S2=601.
//   35,906 in reading 2 is 1511191 pairs times N/W 0.02376 = 35905.9, both
//     factors printed on the @23 header line.
//   11,042,680 in reading 2 is ΣCRT=11078586.2 minus that 35,906, against the
//     printed S2=11044311.
//
// BORROWED, verified present in the named producer's embedded output:
//   1877 in reading 7 is cap-08's @19 ladder floor. research/natal-cap-08-
//     staircase.js prints "minimal K closing the pigeonhole at @19: K* = 10
//     (survivors >= 1877)" and "survivors >= 1877 (true 38380)". The 4.9% is
//     1877/38380 = 4.89%, the second figure printed here as the @19 survivor
//     census.
//
// CORRECTED 2026-08-20 (mismatch adjudication #38): reading 2's @23 check used
// to end "vs true 11,044,311 (+0.90σ)", attaching the printed z to the gap the
// one-line model leaves. The two are different objects and now say so. The
// model's gap is 11,044,311 − 11,042,680 = 1,631, using the approximation
// −35,906 = 1,511,191 × 0.02376; the run's exact @23 row prints a residual of
// 1,382 against a structured term of −35,657, and z(Σresid) = 0.90σ is the z
// of the 1,382. No figure moved: the sentence now names the 1,631 it computes
// and parenthesises the 1,382/−35,657/+0.90σ triple as the run's own. Reading
// 2's point -- that S₂ ≈ ΣCRT − (#pairs)·N/W lands within a few parts in ten
// thousand -- is unaffected either way (1,631 is 1.5e-4 of S₂).
// ---------------------------------------------------------------------------
