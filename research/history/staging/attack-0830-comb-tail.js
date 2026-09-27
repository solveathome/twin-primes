#!/usr/bin/env node
'use strict';
// ============================================================================
// ATTACK 0830 COMB-TAIL — PRIME-COMB EQUIDISTRIBUTION IN THE TAIL REGIME,
// MEASURED EXACTLY AT @11..@29 AND PRICED BY THE COMB DISCREPANCY LEMMA'S
// OWN METHOD (TODO item 8, remaining part (b); companion prose:
// attack-0830-comb-tail.md)
// ============================================================================
// THE OBJECT (certificate-engine.md §2; natal-cap-28 RESULT 1 TAIL line 31;
// attack-0830-buchstab-deep.md §6). Level x, W = x#, mids 7 <= p <= x,
// k = #mids, scour primes x < q <= sqrt(W). Tail = q^3 > W+1, where every
// admissible cofactor m is prime, m >= q, and
//   cap2(q) - s(q) = #{m prime in [q,A]: qm in comb_A} + #{m prime in [q,B]: qm in comb_B},
//   comb_A = {v = 11,17 (30), v != -2 (p) all mids}, comb_B = {v = 13,19 (30), v != 2 (p)},
//   A = floor((W-1)/q), B = floor((W+1)/q).
// The engine's tail main term is  mP(q) = s + dP*(pi(A)+pi(B)-2 pi(q-1)),
//   dP = (1/4) prod_{mids}(1 - 1/(p-1)),
// and THE DEFECT measured here is  E(q) = cap2(q) - mP(q)  (signed, exact).
//
// THE LEMMA'S METHOD IN THE TAIL. In m-coordinates each side's comb is, for
// prime m, ONE forbidden class per mid (m != -2 q^{-1} resp. +2 q^{-1} mod p;
// m = 0 mod p is impossible) plus one of two unit classes c mod 30. Legendre
// over the mids gives, per (side, c), 2^k signed terms
//   (-1)^{|d|} * #{m prime in [q,T]: m = c (30), m = w_p (p) for p | d},  d | M,
// each a PRIME count in one AP to modulus 30d, against its share
// (pi(T)-pi(q-1))/phi(30d). The Comb Discrepancy Lemma's per-term bound
// "off its share by < 1" holds only where the AP has at most one integer in
// [q,T], i.e. 30d >= T-q+1 ("short" terms). The other terms are prime-in-AP
// discrepancies at moduli 30d < T ("long": BV range 30d <= sqrt(T), EH range
// sqrt(T) < 30d < T). This file computes every term exactly, sums them by
// range, and compares the signed defect E with the term-by-term L1 bound.
//
// CUSTODY FIRST. Sigma cap2 (natal-cap-08 / natal-cap-28 CHECK anchors), the
// tail prime counts and tail Sigma cap2 (cap-08 bands @11-@19, cap-11 @23,
// cap-18 @29), the certified-head counts and shares, the PRIME agg pi-form
// and maxrel figures (cap-28 embedded OUTPUT @13..@23, to the printed digit),
// the per-q tail cap2 rows @11 (cap-08), and the K* floors (cap-08/11/18)
// are all asserted before any new number is printed.
//
// No wall-clock figure is printed. Run:
//   node research/history/staging/attack-0830-comb-tail.js      (~2 min, ~200 MB)
// ============================================================================
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
const pct=(v,m)=>(100*v/m).toFixed(2);
const EG=Math.exp(0.5772156649015329);

// ---- anchors, all cited from embedded OUTPUT blocks (never recomputed there) --
const ANCH={
  N:{11:90,13:990,17:14850,19:252450,23:5301450,29:143139150},
  K0:{11:56,13:880,17:16135,19:308401,23:7034588},                 // cap-08 sums; cap-28 CHECK
  tail:{11:[9,42],13:[29,485],17:[105,6989],19:[396,110439],23:[1638,2121291],29:[7589,51660643]}, // bands "prime" n, cap2
  cert:{13:[0,'0.00'],17:[1,'9.69'],19:[3,'17.40'],23:[6,'22.93']},// cap-28 "CERT n= (..% of mass)"
  prm:{13:['-1.05','8.33'],17:['-0.49','15.26'],19:['0.01','26.31'],23:['0.01','26.59']}, // cap-28 "PRIME agg pi-form / maxrel"
  Kstar:{11:[0,34],13:[0,110],17:[2,82],19:[10,1877],23:[27,4841],29:[69,31327]},          // K*, floor
  q11:{17:9,19:10,23:7,29:5,31:3,37:2,41:2,43:2,47:2},              // cap-08 @11 per-q cap2, prime rows
};

const SUMMARY=[];
for(const x of [11,13,17,19,23,29]){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7), k=mids.length;
  let W=1;for(const p of wheel)W*=p;
  const N=mids.reduce((a,p)=>a*(p-2),2); assert(N===ANCH.N[x],`N @${x}`);
  const scour=primesUpTo(Math.floor(Math.sqrt(W))+2).filter(q=>q>x&&q*q<=W);
  const tailFrom=scour.findIndex(q=>q*q*q>W+1);
  const FULL=x<=23, LIM=Math.floor((W+1)/(FULL?scour[0]:scour[tailFrom]));
  const dP=0.25*mids.reduce((a,p)=>a*(1-1/(p-1)),1);
  let NW=2/30;for(const p of mids)NW*=(1-2/p);
  const D3=2*Math.pow(3,k)+1, [KS,FLOOR]=ANCH.Kstar[x];
  // lpf sieve, prime list, pi prefix
  const lpf=new Int32Array(LIM+1);
  for(let i=2;i<=LIM;i++)if(lpf[i]===0)for(let j=i;j<=LIM;j+=i)if(lpf[j]===0)lpf[j]=i;
  const PIc=new Int32Array(LIM+1), PL=[];{let c=0;for(let i=2;i<=LIM;i++){if(lpf[i]===i){c++;PL.push(i)}PIc[i]=c}}
  const pi=t=>t<2?0:PIc[t];
  const lower=t=>{let lo=0,hi=PL.length;while(lo<hi){const md=(lo+hi)>>1;if(PL[md]<t)lo=md+1;else hi=md}return lo};
  // subset tables over the mids
  const NS=1<<k, phiD=new Float64Array(NS), modD=new Float64Array(NS), sgn=new Int8Array(NS);
  for(let d=0;d<NS;d++){let ph=8,md=30,bits=0;for(let t=0;t<k;t++)if(d>>t&1){ph*=mids[t]-1;md*=mids[t];bits++}phiD[d]=ph;modD[d]=md;sgn[d]=bits&1?-1:1}
  // per-level accumulators
  let sumCap2=0, sumKS=0, agg={n:0,mass:0,mainMass:0,absDef:0,sgnDef:0,bound:0}, cert={n:0,mass:0}, mid={n:0,mass:0,mainMass:0,absDef:0,sgnDef:0};
  const tl={n:0,cap:0,main:0,E:0,absE:0,mxP:0,L1:0,capKS:0,mainKS:0,EKS:0,absEKS:0,prodKS:0,mainC:0,
            byR:{bv:{E:0,L1:0,n:0},eh:{E:0,L1:0,n:0},sh:{E:0,L1:0,n:0}},rows:[],pos:0,neg:0};
  const cnt=[[new Int32Array(NS),new Int32Array(NS)],[new Int32Array(NS),new Int32Array(NS)]];
  const sup=new Float64Array(NS);
  let Pj=1, deltaKS=dP; for(let i=0;i<KS;i++)deltaKS*=(1-1/(scour[i]-1));
  let PKS=1; for(let i=0;i<KS;i++)PKS*=(1-1/(scour[i]-1));
  for(let idx=0;idx<scour.length;idx++){
    const q=scour[idx], A=Math.floor((W-1)/q), B=Math.floor((W+1)/q), s=[11,13,17,19].includes(q%30)?1:0;
    const isTail=idx>=tailFrom, Kp=Math.min(KS,idx);
    if(!FULL&&!isTail){Pj*=(1-1/(q-1));continue}
    let i1A=(q%30===11||q%30===17)?1:0; if(i1A)for(const p of mids)if(q%p===p-2){i1A=0;break}
    let i1B=(q%30===13||q%30===19)?1:0; if(i1B)for(const p of mids)if(q%p===2){i1B=0;break}
    const mainC=s+(A+B)*NW*Pj-i1A-i1B, errC=Math.pow(2,idx+1)*D3;
    let C=0, CK=0;
    const fresh=(v,side)=>{for(let j=0;j<Kp;j++){const t=v%scour[j];if(t===0||t===(side===1?scour[j]-2:2))return false}return true};
    if(!isTail){ // head: every m <= B with lpf(m) >= q
      for(let m=2;m<=B;m++){ if(lpf[m]<q)continue; const v=q*m, t30=v%30; let side=0;
        if(m<=A&&(t30===11||t30===17)){let ok=true;for(const p of mids)if(v%p===p-2){ok=false;break}if(ok)side=1}
        else if(t30===13||t30===19){let ok=true;for(const p of mids)if(v%p===2){ok=false;break}if(ok)side=2}
        if(!side)continue; C++; if(fresh(v,side))CK++; }
      const cap2=s+C, def=cap2-mainC;
      sumCap2+=cap2; sumKS+=s+CK;
      agg.n++;agg.mass+=cap2;agg.mainMass+=mainC-s;agg.absDef+=Math.abs(def);agg.sgnDef+=def;agg.bound+=errC;
      if(errC<=0.5*(mainC-s)){assert(Math.abs(def)<=errC,`coverage q=${q}`);cert.n++;cert.mass+=cap2}
      else{mid.n++;mid.mass+=cap2;mid.mainMass+=mainC-s;mid.absDef+=Math.abs(def);mid.sgnDef+=def}
    } else { // tail: primes m in [q, B], Legendre masks over the mids
      for(const a of cnt)for(const c of a)c.fill(0);
      for(let i=lower(q);i<PL.length;i++){const m=PL[i]; if(m>B)break; const v=q*m, t30=v%30; let side=0,c=0;
        if(m<=A&&(t30===11||t30===17)){side=1;c=t30===17?1:0}
        else if(t30===13||t30===19){side=2;c=t30===19?1:0}
        if(!side)continue;
        let mask=0; if(side===1){for(let t=0;t<k;t++)if(v%mids[t]===mids[t]-2)mask|=1<<t}
        else{for(let t=0;t<k;t++)if(v%mids[t]===2)mask|=1<<t}
        cnt[side-1][c][mask]++;
        if(mask===0){C++; if(fresh(v,side))CK++}
      }
      const cap2=s+C, nPA=pi(A)-pi(q-1), nPB=pi(B)-pi(q-1), mP=s+dP*(nPA+nPB), E=cap2-mP;
      sumCap2+=cap2; sumKS+=s+CK; assert(errC>0.5*(mainC-s),`tail prime certified q=${q}`);
      tl.n++; tl.cap+=C; tl.main+=mP-s; tl.E+=E; tl.absE+=Math.abs(E); tl.mainC+=mainC-s;
      const rel=Math.abs(E)/Math.max(cap2,1); if(cap2>=20&&rel>tl.mxP)tl.mxP=rel;
      if(E>0)tl.pos++; else if(E<0)tl.neg++;
      const mKS=deltaKS*(nPA+nPB), EK=CK-mKS;
      tl.capKS+=CK; tl.mainKS+=mKS; tl.EKS+=EK; tl.absEKS+=Math.abs(EK); tl.prodKS+=C*PKS;
      // Legendre terms, by modulus range
      let Eq=0,L1=0,chk=0;
      for(let side=0;side<2;side++){const T=side?B:A, nP=side?nPB:nPA;
        for(let c=0;c<2;c++){const ct=cnt[side][c]; for(let d=0;d<NS;d++)sup[d]=ct[d];
          for(let t=0;t<k;t++)for(let d=0;d<NS;d++)if(!(d>>t&1))sup[d]+=sup[d|1<<t];
          for(let d=0;d<NS;d++){const dl=sup[d]-nP/phiD[d], r=modD[d]>=T-q+1?'sh':modD[d]*modD[d]<=T?'bv':'eh';
            Eq+=sgn[d]*dl; L1+=Math.abs(dl); chk+=sgn[d]*sup[d]; tl.byR[r].E+=sgn[d]*dl; tl.byR[r].L1+=Math.abs(dl); tl.byR[r].n++;
            if(r==='sh')assert(Math.abs(dl)<1,`short term not <1 q=${q}`);}}}
      assert(chk===C,`Legendre identity q=${q}`); assert(Math.abs(Eq-E)<1e-6,`E identity q=${q}`);
      tl.L1+=L1;
      const u=Math.log(B)/Math.log(q);
      tl.rows.push({q,cap2,mP,E,L1,u,ratio:C/(mainC-s),mratio:(mP-s)/(mainC-s),pred:EG*(1/u-q/B),CK,mKS,mainC:mainC-s});
      if(x===11)assert(cap2===ANCH.q11[q],`cap-08 @11 row q=${q}`);
    }
    Pj*=(1-1/(q-1));
  }
  // ---- custody ----
  const [tn,tc]=ANCH.tail[x]; assert(tl.n===tn,`tail count @${x}: ${tl.n} vs ${tn}`);
  const tailCap2=tl.rows.reduce((a,r)=>a+r.cap2,0); assert(tailCap2===tc,`tail Sigma cap2 @${x}: ${tailCap2} vs ${tc}`);
  if(FULL){assert(sumCap2===ANCH.K0[x],`K0 @${x}`); assert(N-sumKS===FLOOR,`floor @${x}: ${N-sumKS} vs ${FLOOR}`);}
  if(ANCH.cert[x]){assert(cert.n===ANCH.cert[x][0]&&pct(cert.mass,sumCap2)===ANCH.cert[x][1],`cert @${x}`);
    assert(pct(-tl.E,tailCap2)===ANCH.prm[x][0],`PRIME agg @${x}: ${pct(-tl.E,tailCap2)}`);
    assert(pct(tl.mxP,1)===ANCH.prm[x][1],`PRIME maxrel @${x}`);}
  const tailKS=tl.rows.reduce((a,r)=>a+r.CK,0)+tl.rows.filter(r=>[11,13,17,19].includes(r.q%30)).length;
  const sumKSref=FULL?sumKS:N-FLOOR;
  console.log(`\n===== @${x}: W=${W} N=${N} k=${k} scour=${scour.length} tail=${tl.n} (q >= ${scour[tailFrom]}) K*=${KS} dP=${dP.toFixed(6)} =====`);
  console.log(` custody: Sigma cap2 ${FULL?sumCap2:'(tail only)'}${FULL?' = anchor':''}; tail Sigma cap2 ${tailCap2} = anchor; `+
    (ANCH.cert[x]?`CERT n=${cert.n} (${pct(cert.mass,sumCap2)}% of mass) PRIME agg pi-form ${pct(-tl.E,tailCap2)}% maxrel ${pct(tl.mxP,1)}% = cap-28 digits; `:'')+
    `floor N - Sigma cap_K* = ${FULL?N-sumKS:'(cited)'} ${FULL?'= anchor':FLOOR}`);
  if(FULL)console.log(` head (q^3 <= W+1): n=${agg.n} Sigma(cap2-s)=${agg.mainMass.toFixed(0)} | certified n=${cert.n} | all-head Sigma|cap2-mainC|=${agg.absDef.toFixed(1)} (${pct(agg.absDef,agg.mainMass)}% of main), signed ${pct(agg.sgnDef,agg.mainMass)}%, lemma bound Sigma 2^(j+1)(2*3^k+1)=${agg.bound.toExponential(2)} (${(agg.bound/agg.mainMass).toExponential(2)} x main)`+
    (mid.n?` | uncertified head n=${mid.n} Sigma|def|=${pct(mid.absDef,mid.mainMass)}% of main`:''));
  console.log(` tail K=0: Sigma(cap2-s)=${tl.cap} share of Sigma cap2 ${FULL?pct(tailCap2,sumCap2)+'%':'(cited total) '+pct(tailCap2,ANCH.K0[x]||202133083)+'%'} | E signed ${tl.E.toFixed(1)} (${pct(tl.E,tl.main)}% of main) | Sigma|E| ${tl.absE.toFixed(1)} (${pct(tl.absE,tl.main)}%) | sign +${tl.pos}/-${tl.neg} | max|E|/cap2 at cap2>=20: ${pct(tl.mxP,1)}%`);
  console.log(` tail lemma-method: L1 = Sigma|terms| ${tl.L1.toFixed(1)} (${pct(tl.L1,tl.main)}% of main; ${(tl.L1/Math.max(tl.absE,1e-9)).toFixed(1)} x Sigma|E|) | by modulus range: `+
    ['bv','eh','sh'].map(r=>`${r}: n=${tl.byR[r].n} E=${tl.byR[r].E.toFixed(1)} L1=${tl.byR[r].L1.toFixed(1)}`).join(' | '));
  console.log(` tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = ${(tl.cap/tl.mainC).toFixed(4)}; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = ${(tl.main/tl.mainC).toFixed(4)}; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = ${(tl.rows.reduce((a,r)=>a+r.pred*r.mainC,0)/tl.mainC).toFixed(4)}; u = ln B/ln q runs ${tl.rows[0].u.toFixed(3)} .. ${tl.rows[tl.rows.length-1].u.toFixed(3)}`);
  console.log(` tail K=K*: Sigma(cap_K*-s)=${tl.capKS} vs delta_K* main ${tl.mainKS.toFixed(1)} (E_K signed ${pct(tl.EKS,tl.mainKS)}%, Sigma|E_K| ${pct(tl.absEKS,tl.mainKS)}%) vs engine product (cap2-s)*P_K* ${tl.prodKS.toFixed(1)} (B_tail = ${(tl.capKS/tl.prodKS).toFixed(4)}) | tail share of Sigma cap_K* = ${pct(tailKS,sumKSref)}% (Sigma cap_K* ${sumKSref}${FULL?'':' cited'})`);
  const show=tl.rows.length<=12?tl.rows:[...tl.rows.slice(0,3),null,...tl.rows.slice(Math.floor(tl.rows.length/2)-1,Math.floor(tl.rows.length/2)+1),null,...tl.rows.slice(-3)];
  console.log('      q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main');
  for(const r of show){ if(!r){console.log('    ...');continue}
    console.log(` ${String(r.q).padStart(6)} | ${String(r.cap2).padStart(5)} | ${r.mP.toFixed(1).padStart(7)} | ${r.E.toFixed(1).padStart(6)} | ${r.L1.toFixed(1).padStart(5)} | ${r.u.toFixed(3)} | ${r.ratio.toFixed(4).padStart(18)} | ${r.mratio.toFixed(4).padStart(16)} | ${r.pred.toFixed(4).padStart(12)} | ${String(r.CK).padStart(8)} | ${r.mKS.toFixed(1).padStart(8)}`);}
  SUMMARY.push({x,k,n:tl.n,share:FULL?100*tailCap2/sumCap2:100*tailCap2/202133083,E:100*tl.E/tl.main,absE:100*tl.absE/tl.main,L1:100*tl.L1/tl.main,
    bv:100*tl.byR.bv.L1/tl.main,eh:100*tl.byR.eh.L1/tl.main,sh:100*tl.byR.sh.L1/tl.main,mxP:100*tl.mxP,
    headAbs:FULL?100*agg.absDef/agg.mainMass:NaN,certN:cert.n,certShare:FULL?100*cert.mass/sumCap2:NaN,EK:100*tl.EKS/tl.mainKS,absEK:100*tl.absEKS/tl.mainKS,B:tl.capKS/tl.prodKS,ksShare:100*tailKS/sumKSref,ratio:tl.cap/tl.mainC});
}
console.log('\n===== SUMMARY (all percentages of the tail main term Sigma dP*(pi(A)+pi(B)-2pi(q-1)) unless said) =====');
console.log('   x | k | tail n | tail share of Sigma cap2 | E signed% | Sigma|E|% | L1% (bv / eh / short) | max|E|/cap2% | head Sigma|def|% | cert n, share% | K*: E_K% Sigma|E_K|% B_tail | tail share of Sigma cap_K*% | (cap2-s)/(mainC-s)');
for(const r of SUMMARY)console.log(` ${String(r.x).padStart(3)} | ${r.k} | ${String(r.n).padStart(6)} | ${r.share.toFixed(2).padStart(24)} | ${r.E.toFixed(2).padStart(9)} | ${r.absE.toFixed(2).padStart(9)} | ${r.L1.toFixed(2).padStart(6)} (${r.bv.toFixed(2)} / ${r.eh.toFixed(2)} / ${r.sh.toFixed(2)}) | ${r.mxP.toFixed(2).padStart(12)} | ${(isNaN(r.headAbs)?'n/a':r.headAbs.toFixed(3)).padStart(16)} | ${r.certN}, ${isNaN(r.certShare)?'n/a':r.certShare.toFixed(2)} | ${r.EK.toFixed(2)} ${r.absEK.toFixed(2)} ${r.B.toFixed(4)} | ${r.ksShare.toFixed(2).padStart(27)} | ${r.ratio.toFixed(4)}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-comb-tail.js
//   invocation:  node research/history/staging/attack-0830-comb-tail.js
//   code-sha256: 525ceb01116607c206c9b87b009f435c55887e5aa53b5cd949c836f9396061e9
//   out-sha256:  4ccf0fc4ae439fc84a2f9c856fec35d2590daa21e57c001be6a9bde8a5cab8f0
//   body-lines:  121
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     219.8 s
// ============================================================================
//
// ===== @11: W=2310 N=90 k=2 scour=10 tail=9 (q >= 17) K*=0 dP=0.187500 =====
//  custody: Sigma cap2 56 = anchor; tail Sigma cap2 42 = anchor; floor N - Sigma cap_K* = 34 = anchor
//  head (q^3 <= W+1): n=1 Sigma(cap2-s)=14 | certified n=0 | all-head Sigma|cap2-mainC|=0.8 (5.74% of main), signed -5.74%, lemma bound Sigma 2^(j+1)(2*3^k+1)=3.80e+1 (2.76e+0 x main) | uncertified head n=1 Sigma|def|=5.74% of main
//  tail K=0: Sigma(cap2-s)=37 share of Sigma cap2 75.00% | E signed -2.4 (-6.03% of main) | Sigma|E| 5.9 (14.92%) | sign +4/-5 | max|E|/cap2 at cap2>=20: 0.00%
//  tail lemma-method: L1 = Sigma|terms| 40.8 (103.59% of main; 6.9 x Sigma|E|) | by modulus range: bv: n=0 E=0.0 L1=0.0 | eh: n=20 E=-2.0 L1=12.3 | sh: n=124 E=-0.4 L1=28.5
//  tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = 0.9007; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = 0.9585; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = 0.6610; u = ln B/ln q runs 1.731 .. 1.011
//  tail K=K*: Sigma(cap_K*-s)=37 vs delta_K* main 39.4 (E_K signed -6.03%, Sigma|E_K| 14.92%) vs engine product (cap2-s)*P_K* 37.0 (B_tail = 1.0000) | tail share of Sigma cap_K* = 75.00% (Sigma cap_K* 56)
//       q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main
//      17 |     9 |    10.8 |   -1.8 |   7.1 | 1.731 |             0.9256 |           1.1281 |       0.8044 |        8 |      9.8
//      19 |    10 |     9.6 |    0.4 |   5.6 | 1.629 |             1.2671 |           1.2143 |       0.8138 |        9 |      8.6
//      23 |     7 |     6.4 |    0.6 |   7.5 | 1.469 |             1.1068 |           1.0080 |       0.8030 |        7 |      6.4
//      29 |     5 |     4.9 |    0.1 |   4.5 | 1.298 |             1.0484 |           1.0222 |       0.7188 |        5 |      4.9
//      31 |     3 |     4.1 |   -1.1 |   5.8 | 1.253 |             0.6964 |           0.9576 |       0.6749 |        3 |      4.1
//      37 |     2 |     2.6 |   -0.6 |   3.0 | 1.143 |             0.5732 |           0.7524 |       0.4954 |        2 |      2.6
//      41 |     2 |     2.5 |   -0.5 |   2.6 | 1.084 |             0.4846 |           0.7268 |       0.3391 |        1 |      1.5
//      43 |     2 |     2.1 |   -0.1 |   3.3 | 1.056 |             0.5473 |           0.6157 |       0.2423 |        1 |      1.1
//      47 |     2 |     1.4 |    0.6 |   1.4 | 1.011 |             0.3919 |           0.1470 |       0.0536 |        1 |      0.4
//
// ===== @13: W=30030 N=990 k=3 scour=34 tail=29 (q >= 37) K*=0 dP=0.171875 =====
//  custody: Sigma cap2 880 = anchor; tail Sigma cap2 485 = anchor; CERT n=0 (0.00% of mass) PRIME agg pi-form -1.05% maxrel 8.33% = cap-28 digits; floor N - Sigma cap_K* = 110 = anchor
//  head (q^3 <= W+1): n=5 Sigma(cap2-s)=398 | certified n=0 | all-head Sigma|cap2-mainC|=5.0 (1.25% of main), signed -1.25%, lemma bound Sigma 2^(j+1)(2*3^k+1)=3.41e+3 (8.57e+0 x main) | uncertified head n=5 Sigma|def|=1.25% of main
//  tail K=0: Sigma(cap2-s)=470 share of Sigma cap2 55.11% | E signed 5.1 (1.09% of main) | Sigma|E| 30.2 (6.50%) | sign +16/-13 | max|E|/cap2 at cap2>=20: 8.33%
//  tail lemma-method: L1 = Sigma|terms| 269.0 (57.86% of main; 8.9 x Sigma|E|) | by modulus range: bv: n=0 E=0.0 L1=0.0 | eh: n=228 E=4.8 L1=139.9 | sh: n=700 E=0.2 L1=129.0
//  tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = 1.0366; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = 1.0254; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = 0.8183; u = ln B/ln q runs 1.855 .. 1.000
//  tail K=K*: Sigma(cap_K*-s)=470 vs delta_K* main 464.9 (E_K signed 1.09%, Sigma|E_K| 6.50%) vs engine product (cap2-s)*P_K* 470.0 (B_tail = 1.0000) | tail share of Sigma cap_K* = 55.11% (Sigma cap_K* 880)
//       q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main
//      37 |    45 |    44.7 |    0.3 |  20.5 | 1.855 |             1.0682 |           1.0608 |       0.8789 |       45 |     44.7
//      41 |    41 |    41.2 |   -0.2 |  13.9 | 1.776 |             1.1121 |           1.1182 |       0.9030 |       40 |     40.2
//      43 |    43 |    39.5 |    3.5 |  15.4 | 1.741 |             1.2587 |           1.1538 |       0.9133 |       42 |     38.5
//     ...
//      97 |    11 |    13.4 |   -2.4 |   7.6 | 1.253 |             0.8655 |           1.0548 |       0.8620 |       11 |     13.4
//     101 |    14 |    13.7 |    0.3 |   8.7 | 1.234 |             1.1724 |           1.1470 |       0.8380 |       13 |     12.7
//     ...
//     163 |     4 |     2.7 |    1.3 |   3.3 | 1.024 |             0.4418 |           0.2531 |       0.1619 |        3 |      1.7
//     167 |     3 |     2.0 |    1.0 |   2.6 | 1.014 |             0.3046 |           0.1571 |       0.0956 |        2 |      1.0
//     173 |     1 |     0.3 |    0.7 |   1.4 | 1.000 |             0.1586 |           0.0545 |       0.0000 |        1 |      0.3
//
// ===== @17: W=510510 N=14850 k=4 scour=120 tail=105 (q >= 83) K*=2 dP=0.161133 =====
//  custody: Sigma cap2 16135 = anchor; tail Sigma cap2 6989 = anchor; CERT n=1 (9.69% of mass) PRIME agg pi-form -0.49% maxrel 15.26% = cap-28 digits; floor N - Sigma cap_K* = 82 = anchor
//  head (q^3 <= W+1): n=15 Sigma(cap2-s)=9162 | certified n=1 | all-head Sigma|cap2-mainC|=63.6 (0.69% of main), signed -0.25%, lemma bound Sigma 2^(j+1)(2*3^k+1)=1.07e+7 (1.17e+3 x main) | uncertified head n=14 Sigma|def|=0.84% of main
//  tail K=0: Sigma(cap2-s)=6938 share of Sigma cap2 43.32% | E signed 34.4 (0.50% of main) | Sigma|E| 196.6 (2.85%) | sign +54/-51 | max|E|/cap2 at cap2>=20: 15.26%
//  tail lemma-method: L1 = Sigma|terms| 2398.6 (34.74% of main; 12.2 x Sigma|E|) | by modulus range: bv: n=324 E=21.0 L1=393.3 | eh: n=1636 E=10.1 L1=1200.0 | sh: n=4760 E=3.3 L1=805.4
//  tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = 1.0878; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = 1.0824; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = 0.9172; u = ln B/ln q runs 1.974 .. 1.002
//  tail K=K*: Sigma(cap_K*-s)=6248 vs delta_K* main 6223.7 (E_K signed 0.39%, Sigma|E_K| 3.33%) vs engine product (cap2-s)*P_K* 6254.7 (B_tail = 0.9989) | tail share of Sigma cap_K* = 42.65% (Sigma cap_K* 14768)
//       q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main
//      83 |   252 |   251.0 |    1.0 |  48.8 | 1.974 |             1.0337 |           1.0298 |       0.8781 |      230 |    226.3
//      89 |   243 |   235.3 |    7.7 |  57.1 | 1.928 |             1.0819 |           1.0474 |       0.8961 |      218 |    212.1
//      97 |   221 |   217.2 |    3.8 |  40.7 | 1.873 |             1.0848 |           1.0662 |       0.9181 |      195 |    195.8
//     ...
//     373 |    44 |    48.1 |   -4.1 |  20.0 | 1.219 |             1.0484 |           1.1472 |       0.9749 |       39 |     42.4
//     379 |    47 |    47.1 |   -0.1 |  21.8 | 1.213 |             1.1430 |           1.1451 |       0.9663 |       41 |     41.5
//     ...
//     691 |     2 |     1.9 |    0.1 |   5.5 | 1.010 |             0.0999 |           0.0966 |       0.0957 |        2 |      1.7
//     701 |     3 |     2.3 |    0.7 |   3.0 | 1.006 |             0.1068 |           0.0689 |       0.0558 |        2 |      1.2
//     709 |     1 |     1.6 |   -0.6 |   2.9 | 1.002 |             0.0000 |           0.0331 |       0.0230 |        0 |      0.6
//
// ===== @19: W=9699690 N=252450 k=5 scour=435 tail=396 (q >= 223) K*=10 dP=0.152181 =====
//  custody: Sigma cap2 308401 = anchor; tail Sigma cap2 110439 = anchor; CERT n=3 (17.40% of mass) PRIME agg pi-form 0.01% maxrel 26.31% = cap-28 digits; floor N - Sigma cap_K* = 1877 = anchor
//  head (q^3 <= W+1): n=39 Sigma(cap2-s)=198404 | certified n=3 | all-head Sigma|cap2-mainC|=1807.5 (0.91% of main), signed -0.23%, lemma bound Sigma 2^(j+1)(2*3^k+1)=5.35e+14 (2.70e+9 x main) | uncertified head n=36 Sigma|def|=1.19% of main
//  tail K=0: Sigma(cap2-s)=110245 share of Sigma cap2 35.81% | E signed -13.6 (-0.01% of main) | Sigma|E| 1568.0 (1.42%) | sign +183/-213 | max|E|/cap2 at cap2>=20: 26.31%
//  tail lemma-method: L1 = Sigma|terms| 22477.0 (20.39% of main; 14.3 x Sigma|E|) | by modulus range: bv: n=1580 E=3.3 L1=3390.0 | eh: n=15360 E=13.1 L1=14368.8 | sh: n=33748 E=-30.0 L1=4718.1
//  tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = 1.1201; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = 1.1202; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = 0.9821; u = ln B/ln q runs 1.975 .. 1.000
//  tail K=K*: Sigma(cap_K*-s)=84015 vs delta_K* main 84171.6 (E_K signed -0.19%, Sigma|E_K| 2.42%) vs engine product (cap2-s)*P_K* 84161.2 (B_tail = 0.9983) | tail share of Sigma cap_K* = 33.61% (Sigma cap_K* 250573)
//       q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main
//     223 |  1376 |  1366.4 |    9.6 | 168.8 | 1.975 |             1.0147 |           1.0076 |       0.8926 |     1052 |   1042.3
//     227 |  1333 |  1346.3 |  -13.3 | 128.7 | 1.965 |             1.0059 |           1.0159 |       0.8967 |     1010 |   1027.0
//     229 |  1330 |  1333.5 |   -3.5 | 134.2 | 1.961 |             1.0170 |           1.0196 |       0.8988 |     1025 |   1017.2
//     ...
//    1553 |   173 |   172.6 |    0.4 |  55.2 | 1.189 |             1.2076 |           1.2046 |       1.0546 |      134 |    131.7
//    1559 |   168 |   172.0 |   -4.0 |  65.4 | 1.188 |             1.1780 |           1.2058 |       1.0526 |      135 |    131.3
//     ...
//    3083 |     1 |     1.8 |   -0.8 |   6.3 | 1.003 |             0.0151 |           0.0276 |       0.0312 |        1 |      1.4
//    3089 |     1 |     1.5 |   -0.5 |   4.2 | 1.002 |             0.0152 |           0.0231 |       0.0253 |        1 |      1.2
//    3109 |     1 |     1.6 |   -0.6 |   8.9 | 1.000 |             0.0000 |           0.0093 |       0.0050 |        0 |      0.5
//
// ===== @23: W=223092870 N=5301450 k=6 scour=1739 tail=1638 (q >= 607) K*=27 dP=0.145264 =====
//  custody: Sigma cap2 7034588 = anchor; tail Sigma cap2 2121291 = anchor; CERT n=6 (22.93% of mass) PRIME agg pi-form 0.01% maxrel 26.59% = cap-28 digits; floor N - Sigma cap_K* = 4841 = anchor
//  head (q^3 <= W+1): n=101 Sigma(cap2-s)=4922320 | certified n=6 | all-head Sigma|cap2-mainC|=49186.0 (1.00% of main), signed -0.18%, lemma bound Sigma 2^(j+1)(2*3^k+1)=7.40e+33 (1.50e+27 x main) | uncertified head n=95 Sigma|def|=1.38% of main
//  tail K=0: Sigma(cap2-s)=2120470 share of Sigma cap2 30.16% | E signed -197.7 (-0.01% of main) | Sigma|E| 12800.7 (0.60%) | sign +813/-825 | max|E|/cap2 at cap2>=20: 26.59%
//  tail lemma-method: L1 = Sigma|terms| 237490.9 (11.20% of main; 18.6 x Sigma|E|) | by modulus range: bv: n=10300 E=-1.3 L1=41767.2 | eh: n=139524 E=-305.4 L1=163756.9 | sh: n=269504 E=109.0 L1=31966.9
//  tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = 1.1442; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = 1.1443; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = 1.0262; u = ln B/ln q runs 2.000 .. 1.000
//  tail K=K*: Sigma(cap_K*-s)=1413605 vs delta_K* main 1413543.4 (E_K signed 0.00%, Sigma|E_K| 1.08%) vs engine product (cap2-s)*P_K* 1413411.6 (B_tail = 1.0001) | tail share of Sigma cap_K* = 26.70% (Sigma cap_K* 5296609)
//       q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main
//     607 |  9076 |  9074.3 |    1.7 | 355.6 | 2.000 |             0.9829 |           0.9827 |       0.8878 |     6049 |   6048.5
//     613 |  8980 |  8991.7 |  -11.7 | 447.5 | 1.995 |             0.9836 |           0.9849 |       0.8898 |     6000 |   5992.8
//     617 |  8951 |  8937.3 |   13.7 | 405.0 | 1.992 |             0.9886 |           0.9871 |       0.8911 |     5949 |   5956.6
//     ...
//    7283 |   676 |   690.0 |  -14.0 | 126.5 | 1.162 |             1.2152 |           1.2403 |       1.1099 |      452 |    459.9
//    7297 |   687 |   688.8 |   -1.8 | 139.8 | 1.161 |             1.2375 |           1.2408 |       1.1089 |      440 |    459.2
//     ...
//   14897 |     5 |     3.3 |    1.7 |   8.2 | 1.001 |             0.0160 |           0.0093 |       0.0083 |        1 |      1.5
//   14923 |     2 |     2.2 |   -0.2 |   6.1 | 1.000 |             0.0040 |           0.0046 |       0.0028 |        1 |      0.8
//   14929 |     1 |     1.6 |   -0.6 |   3.0 | 1.000 |             0.0000 |           0.0023 |       0.0015 |        0 |      0.4
//
// ===== @29: W=6469693230 N=143139150 k=7 scour=7863 tail=7589 (q >= 1867) K*=69 dP=0.140076 =====
//  custody: Sigma cap2 (tail only); tail Sigma cap2 51660643 = anchor; floor N - Sigma cap_K* = (cited) 31327
//  tail K=0: Sigma(cap2-s)=51656854 share of Sigma cap2 (cited total) 25.56% | E signed -519.9 (-0.00% of main) | Sigma|E| 127269.4 (0.25%) | sign +3772/-3817 | max|E|/cap2 at cap2>=20: 37.41%
//  tail lemma-method: L1 = Sigma|terms| 2929579.3 (5.67% of main; 23.0 x Sigma|E|) | by modulus range: bv: n=126368 E=-782.2 L1=825457.3 | eh: n=1335648 E=240.4 L1=1860772.1 | sh: n=2423552 E=21.8 L1=243349.9
//  tail lemma-main-term: Sigma(cap2-s)/Sigma(mainC-s) = 1.1623; exact main-term ratio Sigma(mP-s)/Sigma(mainC-s) = 1.1623; asymptotic form e^gamma*(1/u - q/T) weighted by (mainC-s) = 1.0607; u = ln B/ln q runs 1.999 .. 1.000
//  tail K=K*: Sigma(cap_K*-s)=30129475 vs delta_K* main 30149171.7 (E_K signed -0.07%, Sigma|E_K| 0.54%) vs engine product (cap2-s)*P_K* 30148868.3 (B_tail = 0.9994) | tail share of Sigma cap_K* = 21.06% (Sigma cap_K* 143107823 cited)
//       q |  cap2 |      mP |      E |    L1 |   u   | (cap2-s)/(mainC-s) | (mP-s)/(mainC-s) | e^g(1/u-q/T) | cap_K*-s | delta_K* main
//    1867 | 69364 | 69368.0 |   -4.0 | 1298.3 | 1.999 |             0.9675 |           0.9676 |       0.8899 |    40458 |  40485.8
//    1871 | 69337 | 69237.3 |   99.7 | 1235.2 | 1.998 |             0.9697 |           0.9683 |       0.8903 |    40537 |  40408.9
//    1873 | 69106 | 69167.3 |  -61.3 | 1379.9 | 1.998 |             0.9680 |           0.9689 |       0.8905 |    40349 |  40368.0
//     ...
//   38707 |  3154 |  3136.0 |   18.0 | 295.7 | 1.138 |             1.2773 |           1.2700 |       1.1520 |     1897 |   1830.3
//   38711 |  3114 |  3136.7 |  -22.7 | 302.7 | 1.138 |             1.2614 |           1.2706 |       1.1519 |     1810 |   1830.1
//     ...
//   80387 |     3 |     3.0 |    0.0 |   6.4 | 1.000 |             0.0018 |           0.0018 |       0.0019 |        2 |      1.1
//   80407 |     1 |     1.1 |   -0.1 |   4.3 | 1.000 |             0.0009 |           0.0010 |       0.0011 |        0 |      0.7
//   80429 |     0 |     0.3 |   -0.3 |   0.8 | 1.000 |             0.0000 |           0.0003 |       0.0002 |        0 |      0.2
//
// ===== SUMMARY (all percentages of the tail main term Sigma dP*(pi(A)+pi(B)-2pi(q-1)) unless said) =====
//    x | k | tail n | tail share of Sigma cap2 | E signed% | Sigma|E|% | L1% (bv / eh / short) | max|E|/cap2% | head Sigma|def|% | cert n, share% | K*: E_K% Sigma|E_K|% B_tail | tail share of Sigma cap_K*% | (cap2-s)/(mainC-s)
//   11 | 2 |      9 |                    75.00 |     -6.03 |     14.92 | 103.59 (0.00 / 31.11 / 72.48) |         0.00 |            5.744 | 0, 0.00 | -6.03 14.92 1.0000 |                       75.00 | 0.9007
//   13 | 3 |     29 |                    55.11 |      1.09 |      6.50 |  57.86 (0.00 / 30.10 / 27.76) |         8.33 |            1.252 | 0, 0.00 | 1.09 6.50 1.0000 |                       55.11 | 1.0366
//   17 | 4 |    105 |                    43.32 |      0.50 |      2.85 |  34.74 (5.70 / 17.38 / 11.67) |        15.26 |            0.694 | 1, 9.69 | 0.39 3.33 0.9989 |                       42.65 | 1.0878
//   19 | 5 |    396 |                    35.81 |     -0.01 |      1.42 |  20.39 (3.07 / 13.03 / 4.28) |        26.31 |            0.911 | 3, 17.40 | -0.19 2.42 0.9983 |                       33.61 | 1.1201
//   23 | 6 |   1638 |                    30.16 |     -0.01 |      0.60 |  11.20 (1.97 / 7.72 / 1.51) |        26.59 |            0.999 | 6, 22.93 | 0.00 1.08 1.0001 |                       26.70 | 1.1442
//   29 | 7 |   7589 |                    25.56 |     -0.00 |      0.25 |   5.67 (1.60 / 3.60 / 0.47) |        37.41 |              n/a | 0, n/a | -0.07 0.54 0.9994 |                       21.06 | 1.1623
// ============================================================================
// READINGS
// ============================================================
// 1. CUSTODY. Sigma cap2 = 56 / 880 / 16135 / 308401 / 7034588, the tail
//    (n, Sigma cap2) pairs at six levels, CERT n = 0/1/3/6 with 0.00 / 9.69 /
//    17.40 / 22.93%, PRIME agg pi-form -1.05 / -0.49 / 0.01 / 0.01% and maxrel
//    8.33 / 15.26 / 26.31 / 26.59%, and the floors 34 / 110 / 82 / 1877 / 4841
//    all reproduce their embedded sources; asserted, not read off.
// 2. THE TAIL DEFECT AT K = 0 (MEASURED, first per-prime record). Signed
//    -6.03 / 1.09 / 0.50 / -0.01 / -0.01 / -0.00% of the tail main term at
//    @11..@29; unsigned Sigma|E| 14.92 / 6.50 / 2.85 / 1.42 / 0.60 / 0.25%;
//    sign split even at every level. Per prime the worst relative error
//    grows (8.33% to 37.41% at cap2 >= 20); in aggregate the tail is below the
//    head's Sigma|cap2 - mainC| from @23 (0.60% against 0.999%).
// 3. THE LEMMA'S METHOD IN THE TAIL. Term-by-term L1 = 103.59 / 57.86 / 34.74
//    / 20.39 / 11.20 / 5.67% of main, 6.9x to 23.0x the unsigned defect; the
//    EH-range moduli carry the largest share from @17 on (17.38 / 13.03 / 7.72
//    / 3.60%), the short terms (each < 1, asserted) 11.67 / 4.28 / 1.51 /
//    0.47%. The lemma's own main term mainC is off by the exact ratio
//    Sigma(mP-s)/Sigma(mainC-s) = 0.9585 .. 1.1623 in aggregate and 0.9827
//    (q = 607) to 0.0093 (q = 14897) per prime at @23; the asymptotic form
//    e^gamma(1/u - q/T) reads 1.0262 at @23, 10-12% below the exact ratio.
// 4. AT K = K*. E_K signed 0.00% at @23 and -0.07% at @29, unsigned 1.08% and
//    0.54%; B_tail = 0.9983 .. 1.0001 at all six levels. The tail is 26.70% of
//    Sigma cap_K* at @23 and 21.06% at @29, falling.
// 5. No exponent moves; the finite-level table is the deliverable.
