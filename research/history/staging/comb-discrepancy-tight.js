// ============================================================================
// COMB DISCREPANCY, TIGHTENED — TODO item 8(c), "tighten 2*3^k (~30x slack)"
// (2026-08-28. Companion prose: comb-discrepancy-tight.md. SCRATCHPAD-GRADE:
//  this file has no embedded OUTPUT block and is not a custody artifact; every
//  number it prints is a measurement of a finite deterministic quantity, and
//  the .md quotes it as such, with this command.)
// ============================================================================
//
// THE OBJECT. The Comb Discrepancy Lemma (PROVEN, natal-cap-25-excess-law.js
// header, certificate-engine.md table row): for the natal comb
//   C_x = {r : r = 11 or 17 (mod 30), r != 0 and r != p-2 (mod p), 7<=p<=x},
// of density rho = N/W, W = x#, N = 2*prod(p-2), and for every integer window
// [s, s+l),  |#(C_x cap [s,s+l)) - rho*l| <= 2*3^k,  k = #mids = pi(x)-3.
// PROOF (as producer-stated): expand prod_p (1 - [r=0] - [r=p-2]) into 3^k
// signed terms; each term times each of the 2 unit classes mod 30 is a single
// AP by CRT, so 2*3^k APs; an AP count in an interval is off its share by < 1;
// the shares sum to rho*l exactly. The 2 is the mod-30 pair, NOT the two
// excluded classes; the 3 is (1, -[=0], -[=p-2]) per mid.
//
// WHAT THIS FILE ADDS.
//  (1) The constant is not merely improvable, it has an exact optimum. With
//      G(u) = #(C cap [0,u)) - rho*u (periodic, G(0)=G(W)=0),
//        sup over integer s,l of |#(C cap [s,s+l)) - rho*l| = max G - min G,
//      attained. Call it D_x. Computed exactly at @7..@29.
//  (2) BLOCKED LEGENDRE BOUND (new here, PROVEN, computable at any level).
//      Group the expansion by divisor d: for fixed d all 2^w(d) class terms
//      carry the same sign (-1)^w(d) and their supports are disjoint residues
//      mod d, so they merge into ONE periodic set A_d (period 30d, exactly
//      2^{w(d)+1} points). Hence D_x <= sum_{d | M} range(A_d). Bounding each
//      range by its point count 2^{w(d)+1} returns 2*3^k exactly: the standing
//      lemma IS the trivial per-block bound. Computing the ranges instead
//      costs 2*3^k point-operations, not W. Refinement: keep a set Y of mids
//      unexpanded, giving sum over d | M\Y of range(A_{d,Y}), N_Y*3^{k-|Y|}
//      point-ops, exact when Y = all mids.
//  (3) The same construction, maximised over the dilation family (which is
//      what the certificate engine needs), LOSES to the standing seeded
//      transfer of level-ledger-tight.md. Reported as a negative.
//  (4) Erdos-Turan with exact Fourier coefficients on the natal comb: worse
//      than 2*3^k up to @17, x1.22 better at @19. Also a negative, and the
//      natal-object analogue of level-ledger-tight.md §4(c).
//  (5) What it buys the certificate engine (natal-cap-28 RESULT 1), whose
//      error term is 2^{j+1}*(2*3^k + 1): per-dilation blocked bounds at the
//      dilations the engine actually uses, and the resulting certified count
//      and certified share against cap-28's embedded anchors.
//
// CITED, NOT RECOMPUTED (standing compute rule): cap-25's measured maxE rows,
// cap-28's K0 = Sigma cap2 and its certified counts/shares, level-ledger-tight
// §6c's R*_natal ladder.
//
//   node research/history/staging/comb-discrepancy-tight.js    (~35 s)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR=primesUpTo(40000);
function inv(a,m){a=((a%m)+m)%m;let g=m,x=0,x1=1,a1=a;while(a1){const q=Math.floor(g/a1);const t=g-q*a1;g=a1;a1=t;const u=x-q*x1;x=x1;x1=u}assert(g===1,'inv gcd');return ((x%m)+m)%m}
const midsOf=x=>PR.filter(p=>p>=7&&p<=x);
const Wof=x=>PR.filter(p=>p<=x).reduce((a,p)=>a*p,1);
const Nof=x=>midsOf(x).reduce((a,p)=>a*(p-2),2);

// ---- integer-u range of G for a sorted integer point set of size n mod m ----
// G(u) = #{pts < u} - (n/m)u on integer u in [0,m]; range = max G - min G.
function rangeInt(a,n,m){const rho=n/m;let mx=0,mn=0;
  for(let i=0;i<n;i++){const p=a[i],lo=i-rho*p,hi=(i+1)-rho*(p+1);
    if(hi>mx)mx=hi; if(lo>mx)mx=lo; if(hi<mn)mn=hi; if(lo<mn)mn=lo;}
  return mx-mn;}

// ============================================================================
// PART 1 — the exact sharp constant D_x for the alpha = 1 natal comb
// ============================================================================
// One ascending pass over the 2W/30 candidates with incremental residues.
function exactD(x){
  const mids=midsOf(x),W=Wof(x),N=Nof(x),rho=N/W,nm=mids.length;
  const P=Int32Array.from(mids),tg=new Int32Array(nm),s6=new Int32Array(nm),s24=new Int32Array(nm),res=new Int32Array(nm);
  for(let t=0;t<nm;t++){tg[t]=P[t]-2;s6[t]=6%P[t];s24[t]=24%P[t];res[t]=11%P[t]}
  let i=0,mx=0,mn=0,prev=-1,gmax=0,first=-1,last=-1,r=11,si=0;
  while(r<W){
    let ok=true;
    for(let t=0;t<nm;t++){const v=res[t];if(v===0||v===tg[t]){ok=false;break}}
    if(ok){const lo=i-rho*r,hi=(i+1)-rho*(r+1);
      if(hi>mx)mx=hi; if(lo>mx)mx=lo; if(hi<mn)mn=hi; if(lo<mn)mn=lo;
      if(first<0)first=r; if(prev>=0&&r-prev>gmax)gmax=r-prev; prev=r; last=r; i++;}
    const sm=si?s24:s6,st=si?24:6; si^=1; r+=st;
    for(let t=0;t<nm;t++){let v=res[t]+sm[t]; if(v>=P[t])v-=P[t]; res[t]=v}
  }
  assert(i===N,`census @${x}`);
  const wrap=(W-last)+first; if(wrap>gmax)gmax=wrap;
  return {x,W,N,k:nm,rho,D:mx-mn,H:Math.max(mx,-mn),gmax};
}
console.log('=== PART 1: the exact sharp constant (alpha = 1 natal comb) ===');
console.log(' The window discrepancy sup over ALL integer s and l equals range(G) exactly,');
console.log(' so no bound of this shape can go below D_x. cap-25 maxE is a grid max, hence a floor.');
console.log('   x |         W |         N | k |      D_x |  sup|G| | maxgap | rho*maxgap | 2*3^k | 2*3^k/D | cap25 maxE');
const MAXE={7:1.2,11:2.7,13:5.9,17:10.1,19:21.5,23:34.4}; // cap-25 OUTPUT block, PART 0
const P1={};
for(const x of [7,11,13,17,19,23,29]){
  const s=exactD(x); P1[x]=s; const led=2*Math.pow(3,s.k);
  if(MAXE[x]!==undefined)assert(MAXE[x]<=s.D+1e-9,`cap-25 maxE exceeds D at @${x}`);
  console.log(` @${String(x).padStart(2)} | ${String(s.W).padStart(9)} | ${String(s.N).padStart(9)} | ${s.k} | ${s.D.toFixed(4).padStart(8)} | ${s.H.toFixed(4).padStart(7)} | ${String(s.gmax).padStart(6)} | ${(s.rho*s.gmax).toFixed(3).padStart(10)} | ${String(led).padStart(5)} | ${(led/s.D).toFixed(2).padStart(7)} | ${MAXE[x]!==undefined?MAXE[x]:'  (none)'}  [${el()}]`);
}
{const xs=[7,11,13,17,19,23,29],st=[];
 for(let i=1;i<xs.length;i++)st.push((P1[xs[i]].D/P1[xs[i-1]].D).toFixed(3));
 console.log(` per-fold step of D_x: ${st.join(', ')}   geometric mean ${Math.pow(P1[29].D/P1[7].D,1/6).toFixed(4)}  (sqrt3 = 1.7321)`);
 console.log(` sup|G| / D_x: ${xs.map(x=>(P1[x].H/P1[x].D).toFixed(4)).join(', ')}  (the anchored channel is half the two-endpoint one, measured)`);}

// ============================================================================
// PART 2 — the blocked Legendre bound (PROVEN), alpha = 1
// ============================================================================
// D_x <= sum_{d | M_EX} range(A_{d,Y}),  A_{d,Y} periodic mod 30*W_Y*d with
// N_Y*2^{w(d)} points. Y = mids <= Ymax kept unexpanded. Y = all mids gives D_x.
// pair = the two unit classes mod 30; eMid[p] = the second forbidden class mod p.
function blocked(mids,Ymax,pair,eMid){
  const Y=mids.filter(p=>p<=Ymax),EX=mids.filter(p=>p>Ymax);
  let WY=30;for(const p of Y)WY*=p;
  const yp=[];
  for(let blk=0;blk<WY;blk+=30)for(const b of pair){const r=blk+b;if(r>=WY)continue;
    let ok=true;for(const p of Y){const m=r%p;if(m===0||m===eMid[p]){ok=false;break}}if(ok)yp.push(r)}
  const ny=yp.length,nex=EX.length,buf=new Float64Array(ny*(1<<nex));
  let tot=0;
  for(let mask=0;mask<(1<<nex);mask++){
    const sel=[];let d=1;for(let i=0;i<nex;i++)if(mask&(1<<i)){sel.push(EX[i]);d*=EX[i]}
    const ns=sel.length,nc=1<<ns,m=WY*d,iv=d===1?0:inv(WY%d,d);
    let z=0;
    for(let cm=0;cm<nc;cm++){
      let c=0,mod=1;
      for(let i=0;i<ns;i++){const p=sel[i],want=(cm&(1<<i))?eMid[p]:0;
        const t=((want-c)%p+p)%p; c=c+mod*((t*inv(mod%p,p))%p); mod*=p}
      for(let q=0;q<ny;q++){const r=yp[q];
        if(d===1){buf[z++]=r}else{const t=((c-r)%d+d)%d; buf[z++]=r+WY*((t*iv)%d)}}
    }
    const sub=buf.subarray(0,z); sub.sort();
    tot+=rangeInt(sub,z,m);
  }
  return tot;
}
const natalE=mids=>{const e={};for(const p of mids)e[p]=p-2;return e};
console.log('\n=== PART 2: the blocked Legendre bound, alpha = 1 (PROVEN) ===');
console.log(' Y = kept mids. Y = none is the standing lemma with exact block ranges; Y = all mids reproduces D_x.');
{const XS=[7,11,13,17,19,23,29,31,37];
 const YS=[5,7,11,13,17,19];
 console.log('   x | k |   2*3^k |'+YS.map(y=>`  Y<=${String(y).padStart(2)}`).join('')+' |    D_x (exact)');
 for(const x of XS){const mids=midsOf(x),k=mids.length,e=natalE(mids);
   const cells=YS.map(y=>{if(y>x)return '     -';const v=blocked(mids,y,[11,17],e);return v.toFixed(1).padStart(6)});
   const ex=P1[x]?P1[x].D.toFixed(3):'  (out of reach)';
   if(P1[x]&&x<=23){const v=blocked(mids,x,[11,17],e);assert(Math.abs(v-P1[x].D)<1e-9,`blocked Y=all != D_x @${x}`)}
   console.log(` @${String(x).padStart(2)} | ${String(k).padStart(1)} | ${String(2*Math.pow(3,k)).padStart(7)} |`+cells.join('')+` | ${ex}  [${el()}]`);}
 console.log(' consistency: blocked with Y = all mids equals D_x to 1e-9 at @7..@23 (asserted); @29 is not re-derived that way.');}

// ============================================================================
// PART 3 — the dilation-uniform version, and why it loses
// ============================================================================
// The certificate engine prices DILATED combs, so it needs a bound uniform over
// the dilation family: 4 translation-inequivalent unit pairs mod 30 times
// prod(p-1) choices of the second forbidden class. Taking the per-block maximum
// over that family is a valid bound; it is worse than level-ledger-tight's
// seeded transfer 3^{k-4} * R*_natal(17) = 3^{k-4} * 26.682612 (gain 6.07).
const M30=[[11,17],[17,29],[1,7],[11,23]];
function blockedUnif(mids,Ymax){
  const Y=mids.filter(p=>p<=Ymax),EX=mids.filter(p=>p>Ymax);
  let WY=30;for(const p of Y)WY*=p;
  const cfgs=[];
  const rec=(i,acc)=>{if(i===Y.length){for(const pr of M30)cfgs.push({pr,e:Object.assign({},acc)});return}
    const p=Y[i];for(let v=1;v<p;v++){acc[p]=v;rec(i+1,acc)}};
  rec(0,{});
  let tot=0;
  for(let mask=0;mask<(1<<EX.length);mask++){
    const sel=[];for(let i=0;i<EX.length;i++)if(mask&(1<<i))sel.push(EX[i]);
    const tup=[];const rec2=(i,acc)=>{if(i===sel.length){tup.push(Object.assign({},acc));return}
      const p=sel[i];for(let v=1;v<p;v++){acc[p]=v;rec2(i+1,acc)}};
    rec2(0,{});
    let best=0;
    for(const cf of cfgs)for(const tp of tup){
      const e=Object.assign({},cf.e,tp);
      const v=blockOne(Y,WY,cf.pr,cf.e,sel,e); if(v>best)best=v;
    }
    tot+=best;
  }
  return tot;
}
function blockOne(Y,WY,pair,eY,sel,eAll){
  const yp=[];
  for(let blk=0;blk<WY;blk+=30)for(const b of pair){const r=blk+b;if(r>=WY)continue;
    let ok=true;for(const p of Y){const m=r%p;if(m===0||m===eY[p]){ok=false;break}}if(ok)yp.push(r)}
  let d=1;for(const p of sel)d*=p;
  const ns=sel.length,nc=1<<ns,m=WY*d,iv=d===1?0:inv(WY%d,d);
  const out=new Float64Array(yp.length*nc);let z=0;
  for(let cm=0;cm<nc;cm++){
    let c=0,mod=1;
    for(let i=0;i<ns;i++){const p=sel[i],want=(cm&(1<<i))?eAll[p]:0;
      const t=((want-c)%p+p)%p; c=c+mod*((t*inv(mod%p,p))%p); mod*=p}
    for(const r of yp){if(d===1){out[z++]=r}else{const t=((c-r)%d+d)%d; out[z++]=r+WY*((t*iv)%d)}}
  }
  out.sort();
  return rangeInt(out,z,m);
}
console.log('\n=== PART 3: dilation-uniform blocked bound (the engine channel) ===');
console.log(' standing best, PROVEN (level-ledger-tight.md §6c): 3^{k-4} * R*_natal(17) = 3^{k-4} * 26.682612');
console.log('   y | k |  2*3^k | uniform blocked Y=none | Y<=7 | transfer 3^{k-4}*26.682612');
for(const y of [7,11,13,17]){
  const mids=midsOf(y),k=mids.length;
  const b0=blockedUnif(mids,5), b7=k>1?blockedUnif(mids,7):NaN;
  const tr=26.682612*Math.pow(3,k-4);
  console.log(` @${String(y).padStart(2)} | ${k} | ${String(2*Math.pow(3,k)).padStart(6)} | ${b0.toFixed(4).padStart(22)} | ${isNaN(b7)?'   - ':b7.toFixed(4).padStart(5)} | ${tr.toFixed(4).padStart(10)}   [${el()}]`);
}
console.log(' READING: the blocked construction does NOT beat the seeded transfer once the maximum over');
console.log('   dilations is taken. The grouping gain is a property of the alpha = 1 classes, not of the family.');

// ============================================================================
// PART 4 — Erdos-Turan with exact Fourier coefficients (avenue (b))
// ============================================================================
// |S(j)| = prod over p | W of the local factor; ET = (1/2) sum_{j!=0} |S(j)|/min(j,W-j).
function ET(x){
  const mids=midsOf(x),W=Wof(x);
  const tabs=[],mods=[];
  {const p=5,t=new Float64Array(p);for(let v=0;v<p;v++)t[v]=v===0?2:Math.abs(2*Math.cos(Math.PI*v/p));tabs.push(t);mods.push(p)}
  for(const p of mids){const t=new Float64Array(p);
    for(let v=0;v<p;v++)t[v]=v===0?(p-2):Math.abs(2*Math.cos(Math.PI*((v*(p-2))%p)/p));tabs.push(t);mods.push(p)}
  const nt=tabs.length,M=Int32Array.from(mods),res=new Int32Array(nt);
  {let chk=1;for(let t=0;t<nt;t++)chk*=tabs[t][0];assert(Math.abs(chk-Nof(x))<1e-6,`ET j=0 census @${x}`)}
  let S=0;
  for(let j=1;j<W;j++){
    for(let t=0;t<nt;t++){let v=res[t]+1;if(v===M[t])v=0;res[t]=v}
    let pr=1;for(let t=0;t<nt;t++){pr*=tabs[t][res[t]];if(pr<1e-14)break}
    if(pr>0)S+=pr/Math.min(j,W-j);
  }
  return S/2;
}
console.log('\n=== PART 4: Erdos-Turan on the natal comb (avenue (b)) ===');
console.log('   x | k |  2*3^k |     ET(x) | 2*3^k/ET | blocked Y<=13 | D_x');
for(const x of [7,11,13,17,19]){
  const k=midsOf(x).length,e=natalE(midsOf(x)),led=2*Math.pow(3,k),et=ET(x);
  const bl=blocked(midsOf(x),13,[11,17],e);
  console.log(` @${String(x).padStart(2)} | ${k} | ${String(led).padStart(6)} | ${et.toFixed(3).padStart(9)} | ${(led/et).toFixed(2).padStart(8)} | ${bl.toFixed(3).padStart(13)} | ${P1[x].D.toFixed(3)}   [${el()}]`);
}
console.log(' READING: ET is WORSE than the standing lemma up to @17 and only x1.22 better at @19; its per-fold');
console.log('   step is ~2.45 against 3, so it crosses late, and it costs O(W). Dominated on both axes.');

// ============================================================================
// PART 5 — what it buys the certificate engine (natal-cap-28 RESULT 1)
// ============================================================================
// | cap2(q) - main | <= sum over the 2 sides and the 2^j divisors d | P_j of
// (B(alpha) + 1), alpha = (q*d)^{-1}; the standing theorem takes B = 2*3^k for
// every term. Here B(alpha) is the blocked bound for that dilation.
// Certified iff err <= 0.5 * (main - s), cap-28's own test, verbatim.
const K0={13:880,17:16135,19:308401,23:7034588};       // cap-28 CHECK, Sigma cap2
const OLDN={17:1,19:3,23:6}, OLDSH={17:9.69,19:17.40,23:22.93}; // cap-28 OUTPUT
function engineCut(x,Ymax,JCAP){
  const mids=midsOf(x),W=Wof(x),N=Nof(x),k=mids.length,NW=N/W;
  const scour=PR.filter(q=>q>x&&q*q<=W);
  const D3=2*Math.pow(3,k)+1;
  let Pj=1,oldN=0,newN=0,oldOK=true,newOK=true,massOld=0,massNew=0,rows=[];
  for(let j=0;j<scour.length;j++){
    const q=scour[j],A=Math.floor((W-1)/q),B=Math.floor((W+1)/q);
    const s=[11,13,17,19].includes(q%30)?1:0,main=(A+B)*NW*Pj,cap=main+s;
    const errOld=Math.pow(2,j+1)*D3;
    let errNew=Infinity;
    if(newOK&&j<=JCAP){
      errNew=0;
      for(const side of [0,1]){
        for(let mask=0;mask<(1<<j);mask++){
          let d30=q%30;const dp={};for(const p of mids)dp[p]=q%p;
          for(let i=0;i<j;i++)if(mask&(1<<i)){const r=scour[i];d30=(d30*r)%30;for(const p of mids)dp[p]=(dp[p]*r)%p}
          const a30=inv(d30,30);
          const pair=side===0?[(11*a30)%30,(17*a30)%30]:[(13*a30)%30,(19*a30)%30];
          const e={};for(const p of mids){const ap=inv(dp[p],p);e[p]=(((side===0?-2:2)*ap)%p+p)%p}
          errNew+=blocked(mids,Ymax,pair,e)+1;
        }
      }
    }
    if(oldOK&&errOld<=0.5*main){oldN++;massOld+=cap}else oldOK=false;
    if(newOK&&errNew<=0.5*main){newN++;massNew+=cap;rows.push({q,j,errOld,errNew,main})}else newOK=false;
    Pj*=(1-1/(q-1));
    if(!oldOK&&!newOK)break;
  }
  return {oldN,newN,massOld,massNew,rows,k,agg:K0[x]};
}
console.log('\n=== PART 5: the certificate engine, per-dilation constants ===');
console.log(' custody: old counts must reproduce cap-28 (1 / 3 / 6 at @17 / @19 / @23) and old shares 9.69 / 17.40 / 22.93%');
console.log('   x | old n | old share | new n | new share | per-term constant used (max over used dilations)');
for(const x of [17,19,23]){
  const Ymax=x===17?x:13, JCAP=x===23?11:9;
  const R=engineCut(x,Ymax,JCAP);
  assert(R.oldN===OLDN[x],`cap-28 old certified count @${x}: got ${R.oldN}`);
  const shOld=100*R.massOld/R.agg, shNew=100*R.massNew/R.agg;
  assert(Math.abs(shOld-OLDSH[x])<0.6,`cap-28 old share @${x}: got ${shOld.toFixed(2)}`);
  const mx=Math.max(...R.rows.map(r=>r.errNew/Math.pow(2,r.j+1)-1));
  console.log(` @${String(x).padStart(2)} | ${String(R.oldN).padStart(5)} | ${shOld.toFixed(2).padStart(8)}% | ${String(R.newN).padStart(5)} | ${shNew.toFixed(2).padStart(8)}% | ${mx.toFixed(1)} against 2*3^k = ${2*Math.pow(3,R.k)}   [${el()}]`);
}
console.log(' NOTE: the new counts are FLOORS, not optima. The per-dilation constant used is the blocked bound,');
console.log('   itself above the sharp per-dilation range (at @17 the two coincide, Ymax = all mids). JCAP was not');
console.log('   binding at any of the three levels: the walk stopped on a genuine certification failure.');
console.log('\ndone in '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/comb-discrepancy-tight.js
//   invocation:  node research/history/staging/comb-discrepancy-tight.js
//   code-sha256: 3000620235d537955a5301ce3712ae96b3ba115a2dcf710d8e994e89349b607f
//   out-sha256:  749450ed34a2da7c4024a47d5702833a328650a78fa5936bc388d547ee760d6a
//   body-lines:  59
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     34.4 s
// ============================================================================
// === PART 1: the exact sharp constant (alpha = 1 natal comb) ===
//  The window discrepancy sup over ALL integer s and l equals range(G) exactly,
//  so no bound of this shape can go below D_x. cap-25 maxE is a grid max, hence a floor.
//    x |         W |         N | k |      D_x |  sup|G| | maxgap | rho*maxgap | 2*3^k | 2*3^k/D | cap25 maxE
//  @ 7 |       210 |        10 | 1 |   2.2381 |  1.1429 |     30 |      1.429 |     6 |    2.68 | 1.2  [0.0s]
//  @11 |      2310 |        90 | 2 |   4.1948 |  2.1169 |     60 |      2.338 |    18 |    4.29 | 2.7  [0.0s]
//  @13 |     30030 |       990 | 3 |   8.1648 |  4.0989 |     90 |      2.967 |    54 |    6.61 | 5.9  [0.0s]
//  @17 |    510510 |     14850 | 4 |  13.1021 |  6.5656 |    156 |      4.538 |   162 |   12.36 | 10.1  [0.0s]
//  @19 |   9699690 |    252450 | 5 |  29.6189 | 14.8224 |    216 |      5.622 |   486 |   16.41 | 21.5  [0.0s]
//  @23 | 223092870 |   5301450 | 6 |  50.2952 | 25.1595 |    324 |      7.699 |  1458 |   28.99 | 34.4  [0.6s]
//  @29 | 6469693230 | 143139150 | 7 |  81.5492 | 40.7857 |    426 |      9.425 |  4374 |   53.64 |   (none)  [19.0s]
//  per-fold step of D_x: 1.874, 1.946, 1.605, 2.261, 1.698, 1.621   geometric mean 1.8208  (sqrt3 = 1.7321)
//  sup|G| / D_x: 0.5106, 0.5046, 0.5020, 0.5011, 0.5004, 0.5002, 0.5001  (the anchored channel is half the two-endpoint one, measured)
//
// === PART 2: the blocked Legendre bound, alpha = 1 (PROVEN) ===
//  Y = kept mids. Y = none is the standing lemma with exact block ranges; Y = all mids reproduces D_x.
//    x | k |   2*3^k |  Y<= 5  Y<= 7  Y<=11  Y<=13  Y<=17  Y<=19 |    D_x (exact)
//  @ 7 | 1 |       6 |   3.3   2.2     -     -     -     - | 2.238  [19.0s]
//  @11 | 2 |      18 |   7.4   5.5   4.2     -     -     - | 4.195  [19.0s]
//  @13 | 3 |      54 |  18.3  13.5  10.5   8.2     -     - | 8.165  [19.0s]
//  @17 | 4 |     162 |  41.0  30.2  23.8  17.1  13.1     - | 13.102  [19.0s]
//  @19 | 5 |     486 | 110.3  79.3  60.9  49.0  36.3  29.6 | 29.619  [19.0s]
//  @23 | 6 |    1458 | 247.7 173.2 136.5 110.1  82.8  61.2 | 50.295  [19.4s]
//  @29 | 7 |    4374 | 578.9 403.6 316.4 249.4 191.3 140.9 | 81.549  [19.8s]
//  @31 | 8 |   13122 |1333.0 917.5 716.9 555.6 426.7 328.8 |   (out of reach)  [21.1s]
//  @37 | 9 |   39366 |3246.52287.01781.91384.61080.7 832.5 |   (out of reach)  [25.4s]
//  consistency: blocked with Y = all mids equals D_x to 1e-9 at @7..@23 (asserted); @29 is not re-derived that way.
//
// === PART 3: dilation-uniform blocked bound (the engine channel) ===
//  standing best, PROVEN (level-ledger-tight.md §6c): 3^{k-4} * R*_natal(17) = 3^{k-4} * 26.682612
//    y | k |  2*3^k | uniform blocked Y=none | Y<=7 | transfer 3^{k-4}*26.682612
//  @ 7 | 1 |      6 |                 4.1429 |    -  |     0.9882   [25.4s]
//  @11 | 2 |     18 |                11.4935 | 7.8398 |     2.9647   [25.4s]
//  @13 | 3 |     54 |                32.3598 | 21.6234 |     8.8942   [25.5s]
//  @17 | 4 |    162 |                91.7882 | 62.3382 |    26.6826   [26.5s]
//  READING: the blocked construction does NOT beat the seeded transfer once the maximum over
//    dilations is taken. The grouping gain is a property of the alpha = 1 classes, not of the family.
//
// === PART 4: Erdos-Turan on the natal comb (avenue (b)) ===
//    x | k |  2*3^k |     ET(x) | 2*3^k/ET | blocked Y<=13 | D_x
//  @ 7 | 1 |      6 |     9.919 |     0.60 |         2.238 | 2.238   [26.5s]
//  @11 | 2 |     18 |    26.590 |     0.68 |         4.195 | 4.195   [26.5s]
//  @13 | 3 |     54 |    64.948 |     0.83 |         8.165 | 8.165   [26.5s]
//  @17 | 4 |    162 |   162.044 |     1.00 |        17.142 | 13.102   [26.6s]
//  @19 | 5 |    486 |   398.659 |     1.22 |        48.999 | 29.619   [26.8s]
//  READING: ET is WORSE than the standing lemma up to @17 and only x1.22 better at @19; its per-fold
//    step is ~2.45 against 3, so it crosses late, and it costs O(W). Dominated on both axes.
//
// === PART 5: the certificate engine, per-dilation constants ===
//  custody: old counts must reproduce cap-28 (1 / 3 / 6 at @17 / @19 / @23) and old shares 9.69 / 17.40 / 22.93%
//    x | old n | old share | new n | new share | per-term constant used (max over used dilations)
//  @17 |     1 |     9.69% |     4 |    28.14% | 17.4 against 2*3^k = 162   [26.9s]
//  @19 |     3 |    17.37% |     6 |    27.97% | 47.9 against 2*3^k = 486   [27.1s]
//  @23 |     6 |    22.88% |     9 |    29.40% | 112.1 against 2*3^k = 1458   [34.3s]
//  NOTE: the new counts are FLOORS, not optima. The per-dilation constant used is the blocked bound,
//    itself above the sharp per-dilation range (at @17 the two coincide, Ymax = all mids). JCAP was not
//    binding at any of the three levels: the walk stopped on a genuine certification failure.
//
// done in 34.3s
// ============================================================================
// READINGS
// ============================================================================
