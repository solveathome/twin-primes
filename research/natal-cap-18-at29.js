// ============================================================================
// ATTACK 18 — THE @29 TRIPLE-DECIDER: one segmented Scour march at x = 29
// (2026-08-14; extends natal-cap-11-kstar23.js to W = 29# = 6,469,693,230)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation).
//   - READING 2's "certificate efficiency continues its collapse" is REFUTED
//     by natal-cap-24-boundK-curve.js reading 5: at fixed RELATIVE depth the
//     bound/truth ratio IMPROVES with level (monotone at every depth ≥ 3% of
//     the scour). The collapse was an artifact of reading only the crossing
//     point K*. The certified-floor number itself (≥ 31,327 twin pairs in the
//     29-tile) stands. Same correction at natal-cap-11-kstar23.js reading 4.
//   - READING 5's "×1.8 multiplier drifting slowly downward" is now DERIVED,
//     not fitted: natal-cap-25-excess-law.js gives E = 0.97·σ(ℓ)·√(2ln(W/ℓ)),
//     the extremal law of a hyperuniform field, which reproduces the drift
//     parameter-free including the @29 step ratio 1.562 that looked anomalous
//     here. There was never a constant multiplier to explain.
//   - READING 4's verdict (the zero-parameter classical series is the curve,
//     pinned-linear is dead) has been confirmed twice more since: β(31) and
//     β(37), residuals +0.0046, +0.0026, +0.0016, +0.0010. See
//     natal-cap-22-at31-drift.js, natal-cap-33-overnight.js, and
//     paper/anchored-note.md §10.
//
// ONE MARCH, THREE PREDICTIONS ON RECORD:
//
// PREDICTION 1 — K*(29) ≈ 70 (the phi-band law). natal-cap-11 reading 3:
//   "K* / (pi(W^1/4)-pi(x)) = 1.00, 1.25, 1.29 at @17/@19/@23: the freshness
//   moduli needed for closure are essentially THE PHI-BAND PRIMES (q <=
//   W^(1/4)). A clean testable forecast: @29 has a 51-prime phi-band, so
//   K*(29) ~ 70 if the drift holds." (cap-11's in-run forecast line prints
//   K*(29) ~ 71 = round(51 * 1.4); the K* ladder also fit K* ~ scour^0.97.)
//
// PREDICTION 2 — THE ANCHORED RATIO S(29)/E separates the two surviving
//   drift fits. natal-cap-11 Part 3, last-4-points (@13..@23) fits of
//   R = c + b/lnW: free intercept c = 0.7650, b = 2.517 => R(29) = 0.8764;
//   pinned c = e^{2gamma}/4 = 0.7931, b = 2.147 => R(29) = 0.8881.
//   Spread 0.0117; S/E is EXACT (no sampling noise), so one march decides
//   which curve we are on. E = (2/30) * prod_{7<=p<=y}(1-2/p) * W at scour
//   depth y = largest prime <= sqrt(W) (verified in-run; expected 80429).
//
// PREDICTION 3 — WINDOW-EXCESS E_med(29). natal-cap-17 Part A: "the two
//   candidate forms now differ sharply at @29: geometric [x1.81/level,
//   log2(E_med) = -0.616 + 0.859k] predicts E_med ≈ 42, N^alpha [alpha =
//   0.225, c = 0.771] predicts ≈ 52." (In-run line: 42.2 vs 52.4.)
//
// SETUP. W = 29# = 6,469,693,230. Natal@5 = { r in [0,W) : r = 11 or 17
// (mod 30), r mod p not in {0, p-2} for p = 7,11,13,17,19,23,29 }.
// N = 2 * prod_{7<=p<=29}(p-2) = 2*5*9*11*15*17*21*27 = 143,139,150
//   = (2/3) * prod_{3<=p<=29}(p-2)  (asserted).
// Scour: primes q in (29, sqrt(W) = 80434.4], ascending, fresh kills only.
// W > 2^31 so no flat tile: SEGMENTED march, 216 blocks of 3e7 (all block
// bounds are multiples of 30; all arithmetic < 2^53, exact in doubles).
// Freshness is a per-slot property, so per-block ascending-q processing is
// exactly equivalent to natal-cap-11's global ascending march.
//
// CHAIN OF CUSTODY (all asserted in-run before @29 is touched):
//   - marches @7..@23 reproduce natal-cap-11's S and S/E digit-for-digit;
//   - the cap ladder reproduces natal-cap-08 at @17/@19 and natal-cap-11
//     at @23 (sum cap1 48424543, cap2 7034588, K*=27, floor 4841);
//   - the window-excess machinery reproduces natal-cap-17's E_med at all
//     six levels @7..@23 and natal-cap-01's spot M values at @13/@17.
//
//   node research/natal-cap-18-at29.js   (~16 min, peak ~2 GB RAM)
// ============================================================================
'use strict';

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,msg){if(!c)throw new Error('ASSERT FAIL: '+msg)}
const t0=Date.now(); const el=()=>((Date.now()-t0)/1000).toFixed(1)+'s';
const prog=s=>process.stderr.write(s+'\n');

const GAMMA=0.5772156649015329, C2=0.6601618158468696;
const LIMITC=Math.exp(2*GAMMA)/4; // 0.793055...
const W29=6469693230, N29=143139150;
const PR=primesUpTo(110000);

function lsq(u,y){const n=u.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=u[i];sy+=y[i];sxx+=u[i]*u[i];sxy+=u[i]*y[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;let rss=0;for(let i=0;i<n;i++){const e=y[i]-(a+b*u[i]);rss+=e*e}return{a,b,rms:Math.sqrt(rss/n)}}
const med=a=>{const s=[...a].sort((u,v)=>u-v);return s[Math.floor(s.length/2)]}; // cap-01/cap-17 convention

// Miller-Rabin (deterministic for n < 3.4e12 with these bases; n here < 6.5e9)
function mpow(b,e,n){let r=1n;b%=n;while(e>0n){if(e&1n)r=r*b%n;b=b*b%n;e>>=1n}return r}
function isPrimeMR(x){if(x<2)return false;for(const p of [2,3,5,7,11,13,17,19,23,29,31]){if(x%p===0)return x===p}
  const n=BigInt(x);let d=n-1n,s=0;while((d&1n)===0n){d>>=1n;s++}
  outer:for(const a of [2n,3n,5n,7n,11n,13n]){let y=mpow(a,d,n);if(y===1n||y===n-1n)continue;
    for(let i=1;i<s;i++){y=y*y%n;if(y===n-1n)continue outer}return false}
  return true}

// ---------- Natal@5 tile + Scour march at level x <= 23 (cap-11 verbatim) ----
function marchLevel(x,wantRows){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7);
  let W=1;for(const p of wheel)W*=p;
  const alive=new Uint8Array(W);
  let N=0;
  for(const r0 of [11,17])for(let r=r0;r<W;r+=30){
    let ok=true;
    for(const p of mids){const m=r%p;if(m===0||m===p-2){ok=false;break}}
    if(ok){alive[r]=1;N++}
  }
  const scour=primesUpTo(Math.ceil(Math.sqrt(W))+2).filter(q=>q>x&&q*q<=W);
  const rows=[];
  let removed=0,selfT=0;
  for(const q of scour){
    let fresh=0,self=0;
    for(let r=q;r<W;r+=q)if(alive[r]){alive[r]=0;fresh++;if(r===q)self++}
    for(let r=q-2;r<W;r+=q)if(alive[r]){alive[r]=0;fresh++;if(r===q-2)self++}
    if(wantRows)rows.push({q,fresh,self});
    removed+=fresh;selfT+=self;
  }
  let S=0;
  for(const r0 of [11,17])for(let r=r0;r<W;r+=30)if(alive[r])S++;
  let prod=1;for(const p of mids)prod*=1-2/p;for(const q of scour)prod*=1-2/q;
  const y=scour[scour.length-1];
  const E=(2/30)*prod*W;
  return {x,W,N,S,removed,selfT,scour,rows,y,E,R:S/E,prod,alive:null};
}

// ---------- the staircase cap ladder (cap-08/cap-11 conventions, ctx-param) --
const RS=t=>1.25506*t/Math.log(t);
function makeCtx(LIM){
  const lpf=new Int32Array(LIM+1);
  for(let i=2;i<=LIM;i++)if(lpf[i]===0)for(let j=i;j<=LIM;j+=i)if(lpf[j]===0)lpf[j]=i;
  const PIcum=new Int32Array(LIM+1);
  {let c=0;for(let i=2;i<=LIM;i++){if(lpf[i]===i)c++;PIcum[i]=c}}
  return {LIM,lpf,PIcum};
}
function ladder(L,KMAX,verbose,ctx,showEvery){
  const {W,N,rows}=L;
  const lpf=ctx.lpf, PIcum=ctx.PIcum;
  const pi=t=>t<2?0:PIcum[t];
  const semiBoth=(t,z)=>{let c=0;for(let p1=z;p1*p1<=t;p1++){if(lpf[p1]!==p1)continue;c+=pi(Math.floor(t/p1))-pi(p1-1)}return c};
  assert(Math.floor((W+1)/rows[0].q)<=ctx.LIM,'ctx LIM too small');
  const mids=primesUpTo(L.x).filter(p=>p>=7);
  const fmods=rows.slice(0,KMAX).map(r=>r.q);
  const predBase=0.25*mids.reduce((a,p)=>a*(1-1/(p-1)),1);
  const stored=[]; let pred=predBase, sumCapRS=0;
  const bands={phi:{a:0,c:0,c2:0,n:0},semi:{a:0,c:0,c2:0,n:0},prime:{a:0,c:0,c2:0,n:0}};
  for(let idx=0;idx<rows.length;idx++){
    const {q,fresh,self}=rows[idx];
    const A=Math.floor((W-1)/q), B=Math.floor((W+1)/q);
    const s=[11,13,17,19].includes(q%30)?1:0;
    assert(self<=s,`self>s at q=${q}`);
    const fm=fmods.slice(0,Math.min(idx,KMAX));
    const nf=fm.length;
    const hist=new Int32Array(nf+1);
    let capA=0,capB=0;
    for(let m=2;m<=B;m++){
      if(lpf[m]<q)continue;
      const inA=m<=A; if(inA)capA++; capB++;
      const v=q*m, t30=v%30;
      if(inA&&(t30===11||t30===17)){ // A side: r = q*m itself must be natal
        let ok=true; for(const p of mids)if(v%p===p-2){ok=false;break}
        if(ok){let j=0;for(;j<nf;j++){const t=v%fm[j];if(t===0||t===fm[j]-2)break}hist[j]++;}
      }
      if(t30===13||t30===19){       // B side: r = q*m - 2 must be natal
        let ok=true; for(const p of mids)if(v%p===2){ok=false;break}
        if(ok){let j=0;for(;j<nf;j++){const t=v%fm[j];if(t===0||t===2)break}hist[j]++;}
      }
    }
    const cap1=capA+capB+s;
    const capK=new Int32Array(KMAX+1);
    { let suf=0; const cum=new Int32Array(nf+2);
      for(let j=nf;j>=0;j--){suf+=hist[j];cum[j]=suf}
      for(let K=0;K<=KMAX;K++)capK[K]=s+cum[Math.min(K,nf)];
    }
    let type;
    if(q**3>W+1){type='prime';
      assert(capA===pi(A)-pi(q-1)&&capB===pi(B)-pi(q-1),`prime-regime mismatch q=${q}`);
      sumCapRS+=2*(RS(B)-(q-1)/Math.log(q-1))+1;
    }else if(q**4>W+1){type='semi';
      assert(capA===pi(A)-pi(q-1)+semiBoth(A,q),`semi-regime mismatch q=${q} (A)`);
      assert(capB===pi(B)-pi(q-1)+semiBoth(B,q),`semi-regime mismatch q=${q} (B)`);
    }else type='phi';
    for(let K=0;K<KMAX;K++)assert(capK[K+1]<=capK[K],`ladder not monotone q=${q}`);
    assert(fresh<=capK[KMAX]&&capK[0]<=cap1,`CAP VIOLATED q=${q}: fresh=${fresh} capKmax=${capK[KMAX]} cap2=${capK[0]} cap1=${cap1}`);
    bands[type].a+=fresh;bands[type].c+=cap1;bands[type].c2+=capK[0];bands[type].n++;
    stored.push({q,fresh,self,s,cap1,type,capK,pred});
    pred*=(1-1/(q-1));
    if(verbose&&idx%500===499)prog(`  ladder @${L.x}: ${idx+1}/${rows.length} primes [${el()}]`);
  }
  const sumK=new Float64Array(KMAX+1);
  let sumCap1=0,sSum=0;
  for(const r of stored){sumCap1+=r.cap1;sSum+=r.s;for(let K=0;K<=KMAX;K++)sumK[K]+=r.capK[K]}
  const Kstar=Array.from(sumK).findIndex(v=>v<N);
  const out={sumK,Kstar,floor:Kstar>=0?N-sumK[Kstar]:null,sumCap1,sSum,bands,stored,sumCapRS};
  if(!verbose)return out;
  const cbrt=Math.cbrt(W+1), qrt=Math.pow(W+1,0.25);
  console.log(` W^(1/4)=${qrt.toFixed(2)}, W^(1/3)=${cbrt.toFixed(2)}, sqrt(W)=${Math.sqrt(W).toFixed(2)}; ${rows.length} scour primes; freshness pool = first ${KMAX} scour primes (${fmods[0]}..${fmods[KMAX-1]})`);
  console.log(` all ${rows.length} per-prime caps verified (fresh <= cap_K <= ... <= cap2 <= cap1; regime formulas asserted)   [${el()}]`);
  console.log('      q  |    fresh |    cap1    r1    |    cap2    r2    |  cap_K*   rK*   | type  | pred');
  for(let i=0;i<stored.length;i++){
    const r=stored[i];
    if(!(i<12||i%showEvery===0||i>=stored.length-3))continue;
    const cK=Kstar>=0?r.capK[Kstar]:r.capK[KMAX];
    console.log(` ${String(r.q).padStart(7)} | ${String(r.fresh).padStart(8)} | ${String(r.cap1).padStart(9)} ${(r.fresh/r.cap1).toFixed(3)} | ${String(r.capK[0]).padStart(9)} ${(r.fresh/r.capK[0]).toFixed(3)} | ${String(cK).padStart(8)} ${(r.fresh/cK).toFixed(3)} | ${r.type.padEnd(5)} | ${r.pred.toFixed(3)}`);
  }
  console.log(` bands (n, actual, cap1, cap2): phi(q<=W^1/4): ${bands.phi.n}, ${bands.phi.a}, ${bands.phi.c}, ${bands.phi.c2} | semi: ${bands.semi.n}, ${bands.semi.a}, ${bands.semi.c}, ${bands.semi.c2} | prime(q>W^1/3): ${bands.prime.n}, ${bands.prime.a}, ${bands.prime.c}, ${bands.prime.c2}`);
  console.log(` TOTAL: removed ${L.removed} of N=${N} (survivors ${L.S}); sum cap1 = ${sumCap1} (${(sumCap1/N).toFixed(2)}N); sum cap2 = ${sumK[0]} (${(sumK[0]/N).toFixed(4)}N)`);
  console.log(` tail (prime regime) cap1 = ${bands.prime.c}; Rosser-Schoenfeld closed form <= ${Math.ceil(sumCapRS)}; PNT-style 2ln2*W/lnW = ${(2*Math.LN2*W/Math.log(W)).toFixed(0)}; tail cap1/N = ${(bands.prime.c/N).toFixed(2)}; tail cap2/N = ${(bands.prime.c2/N).toFixed(2)}`);
  console.log(` cap_infinity anchor: removed + sum(s) - sum(self) = ${L.removed} + ${sSum} - ${L.selfT} = ${L.removed+sSum-L.selfT} (${((L.removed+sSum-L.selfT)/N).toFixed(4)}N) — closure guaranteed at SOME finite K`);
  const show=[];
  for(let K=0;K<=KMAX;K++){
    if(K<=16||K%8===0||(Kstar>=0&&Math.abs(K-Kstar)<=4))show.push(`K=${K}:${sumK[K]}${sumK[K]<N?'<N!':''}`);
    if(Kstar>=0&&K>Kstar+4)break;
  }
  console.log(' cap_K ladder (sum over q):');
  for(let i=0;i<show.length;i+=6)console.log('   '+show.slice(i,i+6).join('  '));
  if(Kstar>=0){
    console.log(` minimal K closing the pigeonhole at @${L.x}: K* = ${Kstar}  (sum ${sumK[Kstar]} < N = ${N}; CERTIFIED survivors >= ${out.floor})`);
    console.log(` gains per modulus near K*: ${[Kstar-2,Kstar-1,Kstar,Kstar+1].filter(K=>K>0&&K<=KMAX).map(K=>`Delta(${K})=${(sumK[K-1]-sumK[K]).toFixed(0)}`).join('  ')}   (1st modulus gained ${(sumK[0]-sumK[1]).toFixed(0)})`);
  } else console.log(` pigeonhole NOT closed up to K = ${KMAX}: sum cap_${KMAX} = ${sumK[KMAX]} vs N = ${N} (gap ${sumK[KMAX]-N})`);
  return out;
}

// ---------- window-excess machinery (cap-17 verbatim) ------------------------
function natalPositionsSmall(x){
  const bp=PR.filter(p=>p<=x);
  let W=1; for(const p of bp) W*=p;
  const ind=new Uint8Array(W);
  for(let r=11;r<W;r+=30) ind[r]=1;
  for(let r=17;r<W;r+=30) ind[r]=1;
  for(const p of bp){ if(p<7) continue;
    for(let r=0;r<W;r+=p) ind[r]=0;
    for(let r=p-2;r<W;r+=p) ind[r]=0;
  }
  let N=0; for(let r=0;r<W;r++) if(ind[r]) N++;
  const pos=new Int32Array(2*N); let k=0;
  for(let r=0;r<W;r++) if(ind[r]) pos[k++]=r;
  for(let i=0;i<N;i++) pos[N+i]=pos[i]+W;
  return {W,N,pos};
}
function windowMax(pos,N,ell){let mx=0,j=0;for(let i=0;i<N;i++){const lim=pos[i]+ell;while(pos[j]<lim)j++;const c=j-i;if(c>mx)mx=c}return mx}
function windowMin(pos,N,ell){let mn=Infinity,j=0;for(let i=0;i<N;i++){const lim=pos[i]+1+ell;while(pos[j]<lim)j++;const c=j-i-1;if(c<mn)mn=c}return mn}

// ============================================================================
console.log('===== PART 0: chain of custody — marches @7..@23 + ladder validation =====');
const levels=[];
for(const x of [7,11,13,17,19]){
  const L=marchLevel(x,x>=17); levels.push(L);
  console.log(` @${String(x).padStart(2)}: W=${String(L.W).padStart(9)}  N=${String(L.N).padStart(7)}  scour ${String(L.scour.length).padStart(4)} primes (${L.scour[0]}..${L.y})  removed=${L.removed}  self=${L.selfT}  S=${String(L.S).padStart(6)}  E=${L.E.toFixed(1)}  S/E=${L.R.toFixed(4)}`);
}
const L23=marchLevel(23,true); levels.push(L23);
console.log(` @23: W=${L23.W}  N=${L23.N}  scour ${L23.scour.length} primes (${L23.scour[0]}..${L23.y})  removed=${L23.removed}  self=${L23.selfT}  S=${L23.S}  E=${L23.E.toFixed(1)}  S/E=${L23.R.toFixed(4)}   [${el()}]`);
{
  const Sref=[8,45,307,3099,38380,597475], Rref=['1.1556','1.1458','1.0089','0.9549','0.9261','0.8930'];
  levels.forEach((L,i)=>{assert(L.S===Sref[i]&&L.R.toFixed(4)===Rref[i],`series mismatch @${L.x}`)});
  assert(L23.removed===4703975&&L23.selfT===175,'@23 march mismatch');
  console.log(' VALIDATION: S and S/E reproduce natal-cap-11 Part 0 digit-for-digit at all six levels @7..@23.');
}
{ // ladder validation @17/@19 (vs natal-cap-08) and @23 (vs natal-cap-11)
  const ctxS=makeCtx(Math.floor((L23.W+1)/29));
  const L17=levels.find(L=>L.x===17), L19=levels.find(L=>L.x===19);
  const v17=ladder(L17,12,false,ctxS), v19=ladder(L19,12,false,ctxS);
  assert(v17.sumCap1===99729&&v17.sumK[0]===16135&&v17.sumK[2]===14768&&v17.Kstar===2&&v17.floor===82,'@17 ladder does not match natal-cap-08');
  assert(v19.sumCap1===2025930&&v19.sumK[0]===308401&&v19.sumK[2]===286158&&v19.sumK[10]===250573&&v19.Kstar===10&&v19.floor===1877,'@19 ladder does not match natal-cap-08');
  const v23=ladder(L23,32,false,ctxS);
  assert(v23.sumCap1===48424543&&v23.sumK[0]===7034588&&v23.sumK[27]===5296609&&v23.Kstar===27&&v23.floor===4841,'@23 ladder does not match natal-cap-11');
  console.log(' VALIDATION: ladder reproduces natal-cap-08 exactly at @17 (16135/14768, K*=2, floor 82) and @19');
  console.log(`             (308401/250573, K*=10, floor 1877), and natal-cap-11 at @23 (sum cap1 48424543, cap2 7034588, K*=27, floor 4841).   [${el()}]`);
  L23.rows=null; // keep memory low; @23 rows no longer needed
}

// ============================================================================
console.log('\n===== PART 1: THE @29 MARCH — W = 29# = 6,469,693,230, segmented =====');
const L29=(()=>{
  const mids=[7,11,13,17,19,23,29];
  let W=1;for(const p of [2,3,5,...mids])W*=p;
  assert(W===W29,'W29');
  const scour=PR.filter(q=>q>29&&q*q<=W);
  const y=scour[scour.length-1];
  assert(PR.filter(q=>q>y&&q*q<=W+1).length===0,'a prime hides between y and sqrt(W+1) — survivors would not be certified twins');
  const N=N29;
  assert(N===2*5*9*11*15*17*21*27&&N*3===2*(1*3*5*9*11*15*17*21*27),'N formula');
  console.log(` sqrt(W) = ${Math.sqrt(W).toFixed(2)}; scour = ${scour.length} primes (${scour[0]}..${y}); y = ${y} confirmed = largest prime with q^2 <= W; no prime in (y, sqrt(W+1)]`);
  const PAD=5500000;
  const pos=new Float64Array(N+PAD);
  let np=0;
  const nq=scour.length;
  const freshA=new Float64Array(nq), selfA=new Int32Array(nq);
  const BW=30000000, nBlocks=Math.ceil(W/BW);
  const alive=new Uint8Array(BW);
  let S=0;
  const firsts=[], last3=[0,0,0]; let sampleCnt=0; const samples=[];
  const SAMPLE_EVERY=300000;
  for(let lo=0;lo<W;lo+=BW){
    const hi=Math.min(lo+BW,W), len=hi-lo;
    alive.fill(0,0,len);
    // ---- natal generation, both classes merged (ascending), no divisions ----
    let a7=(lo+11)%7,a11=(lo+11)%11,a13=(lo+11)%13,a17=(lo+11)%17,a19=(lo+11)%19,a23=(lo+11)%23,a29=(lo+11)%29;
    let b7=(lo+17)%7,b11=(lo+17)%11,b13=(lo+17)%13,b17=(lo+17)%17,b19=(lo+17)%19,b23=(lo+17)%23,b29=(lo+17)%29;
    const npStart=np;
    for(let b=0;b<len;b+=30){
      if(a7!==0&&a7!==5&&a11!==0&&a11!==9&&a13!==0&&a13!==11&&a17!==0&&a17!==15&&a19!==0&&a19!==17&&a23!==0&&a23!==21&&a29!==0&&a29!==27){alive[b+11]=1;pos[np++]=lo+b+11}
      a7+=2;if(a7>=7)a7-=7; a11+=8;if(a11>=11)a11-=11; a13+=4;if(a13>=13)a13-=13; a17+=13;if(a17>=17)a17-=17; a19+=11;if(a19>=19)a19-=19; a23+=7;if(a23>=23)a23-=23; a29+=1;if(a29>=29)a29-=29;
      if(b7!==0&&b7!==5&&b11!==0&&b11!==9&&b13!==0&&b13!==11&&b17!==0&&b17!==15&&b19!==0&&b19!==17&&b23!==0&&b23!==21&&b29!==0&&b29!==27){alive[b+17]=1;pos[np++]=lo+b+17}
      b7+=2;if(b7>=7)b7-=7; b11+=8;if(b11>=11)b11-=11; b13+=4;if(b13>=13)b13-=13; b17+=13;if(b17>=17)b17-=17; b19+=11;if(b19>=19)b19-=19; b23+=7;if(b23>=23)b23-=23; b29+=1;if(b29>=29)b29-=29;
    }
    // ---- strike all scour primes, ascending (fresh = first striker) ----
    for(let qi=0;qi<nq;qi++){
      const q=scour[qi];
      let f=0;
      let st=q*Math.ceil(lo/q);
      for(let idx=st-lo;idx<len;idx+=q){ if(alive[idx]){alive[idx]=0;f++;if(lo+idx===q)selfA[qi]++} }
      st=q*Math.ceil((lo+2)/q)-2;
      for(let idx=st-lo;idx<len;idx+=q){ if(alive[idx]){alive[idx]=0;f++;if(lo+idx===q-2)selfA[qi]++} }
      freshA[qi]+=f;
    }
    // ---- survivors of this block ----
    for(let i=npStart;i<np;i++){
      const r=pos[i];
      if(alive[r-lo]){
        S++;
        if(firsts.length<5)firsts.push(r);
        last3[0]=last3[1];last3[1]=last3[2];last3[2]=r;
        if(++sampleCnt===SAMPLE_EVERY){sampleCnt=0;samples.push(r)}
      }
    }
    if((lo/BW)%12===0)prog(` march block ${lo/BW+1}/${nBlocks}: np=${np} S=${S} [${el()}]`);
  }
  assert(np===N,`natal census: np=${np} != N=${N}`);
  const rows=scour.map((q,i)=>({q,fresh:freshA[i],self:selfA[i]}));
  const removed=rows.reduce((a,r)=>a+r.fresh,0), selfT=rows.reduce((a,r)=>a+r.self,0);
  assert(removed+S===N,'ledger: removed + S != N');
  let prod=1;for(const p of mids)prod*=1-2/p;for(const q of scour)prod*=1-2/q;
  const E=(2/30)*prod*W;
  return {x:29,W,N,S,removed,selfT,scour,rows,y,E,R:S/E,prod,pos,firsts,last3,samples};
})();
console.log(` @29: W=${L29.W}  N=${L29.N}  scour ${L29.scour.length} primes (31..${L29.y})  removed=${L29.removed}  self=${L29.selfT}  S=${L29.S}  E=${L29.E.toFixed(1)}  S/E=${L29.R.toFixed(4)}   [${el()}]`);
{
  const s2q=L29.scour.reduce((a,q)=>a+2/q,0);
  console.log(` Mertens context @29: sum_scour 2/q = ${s2q.toFixed(3)} (raw strike capacity ${s2q.toFixed(2)}x the census)`);
  // sample twin verification (structural proof already: no factor <= sqrt(W+1) survives the wheel+scour)
  const test=[...L29.firsts,...L29.samples,...L29.last3];
  for(const r of test)assert(isPrimeMR(r)&&isPrimeMR(r+2),`survivor ${r} is not a twin pair`);
  console.log(` VERIFIED: ${test.length} sampled survivors (first 5, every ${300000}th, last 3) are ALL genuine twin pairs (Miller-Rabin, deterministic bases).`);
  console.log(` (Structural guarantee: survivors dodge r=0,-2 mod every prime <= ${L29.y} = the largest prime <= sqrt(W+1), so every survivor IS a twin pair.)`);
  console.log(` first survivors: ${L29.firsts.map(r=>`(${r},${r+2})`).join(' ')}  last: ${L29.last3.map(r=>`(${r},${r+2})`).join(' ')}`);
  console.log(` self-strikes = twins found at the frontier: ${L29.selfT} (each is a scour prime q in a twin pair — proven identity)`);
  // ---- PREDICTION 2, on the record, decided ----
  const uu=1/Math.log(W29);
  const sel=[2,3,4,5]; // @13..@23, exactly natal-cap-11's "last 4 points"
  const fFree=lsq(sel.map(i=>1/Math.log(levels[i].W)),sel.map(i=>levels[i].R));
  let num=0,den=0;for(const i of sel){num+=(levels[i].R-LIMITC)/Math.log(levels[i].W);den+=1/Math.log(levels[i].W)**2}
  const bPin=num/den;
  const predFree=fFree.a+fFree.b*uu, predPin=LIMITC+bPin*uu;
  assert(Math.abs(predFree-0.8764)<5e-4&&Math.abs(predPin-0.8881)<5e-4,'on-record predictions not reproduced');
  console.log(` PREDICTION 2 — the on-record forecasts, recomputed from the @13..@23 fits: free-limit ${predFree.toFixed(4)}, pinned-0.7931 ${predPin.toFixed(4)}`);
  console.log(`   MEASURED S/E = ${L29.R.toFixed(4)}   | residual vs free-limit fit: ${(L29.R-predFree).toFixed(4)} | vs pinned fit: ${(L29.R-predPin).toFixed(4)}`);
  const win=Math.abs(L29.R-predFree)<Math.abs(L29.R-predPin)?'FREE-LIMIT (c=0.7650) fit wins':'PINNED e^{2gamma}/4 fit wins';
  console.log(`   VERDICT: ${win} at @29 (spread was 0.0117; full 7-point refits in PART 4).   [${el()}]`);
}

// ============================================================================
console.log('\n===== PART 2: window-excess law — validation @7..@23, then E_med(29) =====');
const levelsA=[];
for(const x of [7,11,13,17,19,23]){
  const tA=Date.now();
  const {W,N,pos}=natalPositionsSmall(x);
  const scour=PR.filter(q=>q>x&&q<=Math.sqrt(W));
  const stride=scour.length>600?Math.ceil(scour.length/140):1;
  const qs=stride===1?scour:scour.filter((_,i)=>i%stride===0||i<3||i>=scour.length-3);
  const ells=[...new Set(qs.map(q=>Math.ceil(W/q)))].sort((a,b)=>a-b);
  const rows=ells.map(ell=>{const M=windowMax(pos,N,ell),m=windowMin(pos,N,ell);const mean=N*ell/W;return{ell,mean,M,m,E:M-mean,D:mean-m}});
  const Emed=med(rows.map(r=>r.E));
  levelsA.push({x,k:PR.filter(p=>p>=7&&p<=x).length,N,W,Emed});
  console.log(` @${String(x).padStart(2)}: grid ${rows.length} lengths${stride>1?` (every ${stride}th q)`:''}  E min/med/max = ${Math.min(...rows.map(r=>r.E)).toFixed(2)} / ${Emed.toFixed(2)} / ${Math.max(...rows.map(r=>r.E)).toFixed(2)}  maxDeficit/sqrt(mean) = ${Math.max(...rows.map(r=>r.D/Math.sqrt(r.mean))).toFixed(2)}  [${((Date.now()-tA)/1000).toFixed(1)}s]`);
  if(x===13){const r=rows.find(r=>r.ell===1767);assert(r&&r.M===63,'cap-01 spot M(1767)@13');const r2=rows.find(r=>r.ell===174);assert(r2&&r2.M===9,'cap-01 spot M(174)@13')}
  if(x===17){const r=rows.find(r=>r.ell===26869);assert(r&&r.M===791,'cap-01 spot M(26869)@17');const r2=rows.find(r=>r.ell===721);assert(r2&&r2.M===28,'cap-01 spot M(721)@17')}
  if(x===23){const c=[[14944,375],[275764,6580],[7692858,182843]];for(const[l,Mr]of c){const r=rows.find(r=>r.ell===l);assert(r&&r.M===Mr,`cap-17 spot M(${l})@23`)}}
}
{
  const ref=['1.19','2.06','4.05','7.18','12.61','23.20'];
  levelsA.forEach((L,i)=>assert(L.Emed.toFixed(2)===ref[i],`E_med mismatch @${L.x}: ${L.Emed.toFixed(2)} vs ${ref[i]}`));
  console.log(' VALIDATION: E_med reproduces natal-cap-17 at all six levels (1.19/2.06/4.05/7.18/12.61/23.20) + cap-01/cap-17 spot M values.');
  // the two on-record predictions from the six-level fits
  const f2=lsq(levelsA.map(L=>L.k),levelsA.map(L=>Math.log2(L.Emed)));
  const fN=lsq(levelsA.map(L=>Math.log(L.N)),levelsA.map(L=>Math.log(L.Emed)));
  const pGeo=2**(f2.a+f2.b*7), pNa=Math.exp(fN.a)*Math.pow(N29,fN.b);
  assert(Math.abs(pGeo-42.2)<0.5&&Math.abs(pNa-52.4)<0.5,'cap-17 @29 predictions not reproduced');
  console.log(` PREDICTION 3 — on-record forecasts recomputed: geometric(x1.81/level) E_med(29) = ${pGeo.toFixed(1)}, N^${fN.b.toFixed(3)} law = ${pNa.toFixed(1)}`);
  levelsA.predGeo=pGeo; levelsA.predNa=pNa; levelsA.f2=f2; levelsA.fN=fN;
}
{ // ---- @29: two-pointer over the streamed natal positions ----
  const {pos,N,W,scour}=L29;
  const stride=Math.ceil(scour.length/140);
  const qs=scour.filter((_,i)=>i%stride===0||i<3||i>=scour.length-3);
  const ells=[...new Set(qs.map(q=>Math.ceil(W/q)))].sort((a,b)=>a-b);
  const maxEll=ells[ells.length-1];
  let cut=0; while(pos[cut]<maxEll)cut++;           // extend cyclically just past the longest window
  assert(N+cut+1<=pos.length,'PAD too small');
  for(let i=0;i<cut;i++)pos[N+i]=pos[i]+W;
  pos[N+cut]=3*W; // sentinel
  console.log(` @29 grid: ${ells.length} lengths (every ${stride}th q), l = ${ells[0]}..${maxEll}; cyclic extension ${cut} positions`);
  const rows=[];
  for(let i=0;i<ells.length;i++){
    const ell=ells[i], mean=N*ell/W, M=windowMax(pos,N,ell);
    const m=(i%8===0||i===ells.length-1)?windowMin(pos,N,ell):null;
    rows.push({ell,mean,M,m,E:M-mean,D:m===null?null:mean-m});
    if(i%10===0)prog(` excess @29: ${i+1}/${ells.length} lengths [${el()}]`);
  }
  const Emed=med(rows.map(r=>r.E));
  const slope=lsq(rows.map(r=>Math.log(r.mean)),rows.map(r=>Math.log(Math.max(r.E,1e-9)))).b;
  console.log('        l |       mean |      M |     E=M-mean');
  const show=rows.filter((_,i)=>i%Math.ceil(rows.length/10)===0||i===rows.length-1);
  for(const r of show)console.log(` ${String(r.ell).padStart(9)} | ${r.mean.toFixed(1).padStart(10)} | ${String(r.M).padStart(6)} | ${r.E.toFixed(2).padStart(9)}`);
  const p2rows=[];
  for(let L2=131072;L2<=maxEll;L2*=2){const M=windowMax(pos,N,L2);p2rows.push(`E(2^${Math.log2(L2)})=${(M-N*L2/W).toFixed(1)}`)}
  console.log(` E min/med/max = ${Math.min(...rows.map(r=>r.E)).toFixed(2)} / ${Emed.toFixed(2)} / ${Math.max(...rows.map(r=>r.E)).toFixed(2)}   log-log slope E vs mean = ${slope.toFixed(3)}  (~0 => l-independent)`);
  const defs=rows.filter(r=>r.D!==null);
  console.log(` deficit side (computed on ${defs.length}/${rows.length} grid lengths): max (mean-m)/sqrt(mean) = ${Math.max(...defs.map(r=>r.D/Math.sqrt(r.mean))).toFixed(2)}`);
  console.log(` powers of 2:  ${p2rows.join('  ')}`);
  levelsA.push({x:29,k:7,N,W,Emed});
  console.log(` E_med(29) = ${Emed.toFixed(2)}   | geometric predicted ${levelsA.predGeo.toFixed(1)} | N^0.225 predicted ${levelsA.predNa.toFixed(1)}`);
  const dG=Math.abs(Emed-levelsA.predGeo), dN=Math.abs(Emed-levelsA.predNa);
  console.log(` PREDICTION 3 VERDICT: ${dG<dN?'GEOMETRIC (x1.81/level) law wins':'N^0.225 law wins'} (|resid| ${Math.min(dG,dN).toFixed(1)} vs ${Math.max(dG,dN).toFixed(1)}); step ratio @23->@29 = x${(Emed/levelsA[5].Emed).toFixed(3)} vs geometric x1.814, N-law x${Math.pow(N29/5301450,levelsA.fN.b).toFixed(3)}`);
  // 7-point refits
  const f2=lsq(levelsA.map(L=>L.k),levelsA.map(L=>Math.log2(L.Emed)));
  const fN=lsq(levelsA.map(L=>Math.log(L.N)),levelsA.map(L=>Math.log(L.Emed)));
  console.log(` 7-point refits: log2(E_med) = ${f2.a.toFixed(3)} + ${f2.b.toFixed(3)}k (x${(2**f2.b).toFixed(3)}/level, rms ${f2.rms.toFixed(3)});  E ~ N^${fN.b.toFixed(3)} (rms ${fN.rms.toFixed(3)})`);
  console.log(` step ratios: ${levelsA.slice(1).map((L,i)=>'x'+(L.Emed/levelsA[i].Emed).toFixed(3)).join('  ')}   [${el()}]`);
}
L29.pos=null; // release 1.19 GB before the ladder's counting tables

// ============================================================================
console.log('\n===== PART 3: the staircase cap ladder at @29 — PREDICTION 1 =====');
const ctx29=makeCtx(Math.floor((W29+1)/31));
prog(` big ctx built to ${ctx29.LIM} [${el()}]`);
const LAD=ladder(L29,192,true,ctx29,700);
L29.Kstar=LAD.Kstar; L29.floor=LAD.floor;
{
  const pb29=L29.scour.filter(q=>q**4<=W29+1).length;
  const linPred=1.7+0.0147*L29.scour.length; // cap-11's linear-in-scour fit K* = 1.7 + 0.0147*scourlen
  console.log(` PREDICTION 1 — phi-band law said K*(29) ~ 70-71 (phi-band = ${pb29} primes x drift ratio ~1.4); cap-11's linear-in-scour fit says ~${Math.round(linPred)}`);
  console.log(`   MEASURED: K*(29) = ${L29.Kstar}   K*/phi-band = ${(L29.Kstar/pb29).toFixed(2)}   K*/scour = ${(L29.Kstar/L29.scour.length).toFixed(4)}   certified floor ${L29.floor} twin pairs (truth ${L29.S})`);
}

// ============================================================================
console.log('\n===== PART 4: the K*(x) six-point curve =====');
{
  const pts=[{x:11,ns:10,K:0},{x:13,ns:34,K:0},{x:17,ns:120,K:2},{x:19,ns:435,K:10},{x:23,ns:1739,K:27},{x:29,ns:L29.scour.length,K:L29.Kstar}];
  const Ws={11:2310,13:30030,17:510510,19:9699690,23:223092870,29:W29};
  for(const p of pts){
    const Wp=Ws[p.x];
    p.phiBand=PR.filter(q=>q>p.x&&q**4<=Wp+1).length;
    console.log(` @${String(p.x).padStart(2)}: scour length ${String(p.ns).padStart(4)}  K* = ${String(p.K).padStart(3)}   K*/scour = ${(p.K/p.ns).toFixed(4)}   phi-band = ${p.phiBand}${p.phiBand?'   K*/phi-band = '+(p.K/p.phiBand).toFixed(2):''}`);
  }
  const nz=pts.filter(p=>p.K>0);
  const lnK=nz.map(p=>Math.log(p.K));
  const f1=lsq(nz.map(p=>p.x),lnK);
  const f2=lsq(nz.map(p=>Math.log(p.ns)),lnK);
  const f3=lsq(nz.map(p=>p.ns),nz.map(p=>p.K));
  console.log(` fit ln K* = a + b*x            (${nz.length} pts): b = ${f1.b.toFixed(3)} per unit x  (e^b = ${Math.exp(f1.b).toFixed(2)}x per unit)  rms ${f1.rms.toFixed(3)}`);
  console.log(` fit ln K* = a + b*ln(scourlen) (${nz.length} pts): b = ${f2.b.toFixed(3)}  => K* ~ (scour length)^${f2.b.toFixed(2)}  rms ${f2.rms.toFixed(3)}`);
  console.log(` fit K*   = a + b*scourlen      (${nz.length} pts): b = ${f3.b.toFixed(4)}  a = ${f3.a.toFixed(1)}  rms ${f3.rms.toFixed(2)}`);
  console.log(` pairwise power exponents (K* vs scour length): 17->19: ${(Math.log(10/2)/Math.log(435/120)).toFixed(2)}; 19->23: ${(Math.log(27/10)/Math.log(1739/435)).toFixed(2)}; 23->29: ${(Math.log(pts[5].K/27)/Math.log(pts[5].ns/1739)).toFixed(2)}`);
  const W31=200560490130;
  const pb31=PR.filter(q=>q>31&&q**4<=W31+1).length;
  console.log(` forecast: @31 phi-band = ${pb31} primes; K*/phi-band drift ${pts.filter(p=>p.K>0).map(p=>(p.K/p.phiBand).toFixed(2)).join(', ')} => K*(31) ~ ${Math.round(pb31*(pts[5].K/pts[5].phiBand)*1.03)}`);
}

// ============================================================================
console.log('\n===== PART 5: anchored drift S/E — seven points, approach to e^{2gamma}/4 = '+LIMITC.toFixed(5)+' =====');
{
  const all=[...levels,L29];
  console.log('   x |   S/E   | 1/lnW   | Mertens u(y)');
  for(const L of all){
    L.u=(L.prod/5)*Math.exp(2*GAMMA)*Math.log(L.y)**2/(4*C2);
    console.log(`  ${String(L.x).padStart(2)} | ${L.R.toFixed(4)} | ${(1/Math.log(L.W)).toFixed(4)}  | ${L.u.toFixed(4)}`);
  }
  const R=all.map(L=>L.R);
  const preds={'1/lnW   ':all.map(L=>1/Math.log(L.W)),'1/ln^2 W':all.map(L=>1/Math.log(L.W)**2),'(u(y)-1)':all.map(L=>L.u-1)};
  let fFree=null,bPin=null;
  for(const tag of ['all 7 points','last 4 points']){
    const sel=tag==='all 7 points'?[0,1,2,3,4,5,6]:[3,4,5,6];
    console.log(` --- ${tag} ---`);
    for(const [name,u] of Object.entries(preds)){
      const f=lsq(sel.map(i=>u[i]),sel.map(i=>R[i]));
      let num=0,den=0;for(const i of sel){num+=(R[i]-LIMITC)*u[i];den+=u[i]*u[i]}
      const a=num/den;let rss=0;for(const i of sel){const e=R[i]-(LIMITC+a*u[i]);rss+=e*e}
      console.log(`  R = c + b*${name}: free c = ${f.a.toFixed(4)} (b=${f.b.toFixed(3)}, rms ${f.rms.toFixed(4)}) | pinned c=${LIMITC.toFixed(4)}: b=${a.toFixed(3)}, rms ${Math.sqrt(rss/sel.length).toFixed(4)}`);
      if(tag==='last 4 points'&&name==='1/lnW   '){fFree=f;bPin=a}
    }
  }
  const drops=all.slice(1).map((L,i)=>L.R-all[i].R);
  console.log(` successive drops in S/E: ${drops.map(d=>d.toFixed(4)).join('  ')}`);
  console.log(` remaining gap to limit at @29: ${(L29.R-LIMITC).toFixed(4)} (${((L29.R-LIMITC)/(all[0].R-LIMITC)*100).toFixed(0)}% of the @7 gap)`);
  for(const [x,Wn] of [[31,200560490130],[37,7420738134810]]){
    const u=1/Math.log(Wn);
    console.log(` forecast @${x}: free-limit fit (c=${fFree.a.toFixed(4)}) R = ${(fFree.a+fFree.b*u).toFixed(4)} vs pinned-${LIMITC.toFixed(4)} fit R = ${(LIMITC+bPin*u).toFixed(4)}   (spread ${Math.abs(fFree.a+fFree.b*u-LIMITC-bPin*u).toFixed(4)})`);
  }
  console.log('   ['+el()+']');
}
console.log('\ndone in '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-18-at29.js
//   invocation:  node research/natal-cap-18-at29.js
//   code-sha256: cfa275471ccd4daffe933a789e80138f59e4f221dbeba7d144682944b14bc6bb
//   out-sha256:  d507fb3838d7e4ac198776ec8a3d443bac30634e22dfdd15c23199c2248de669
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     973.2 s
// ============================================================================
// ===== PART 0: chain of custody — marches @7..@23 + ladder validation =====
//  @ 7: W=      210  N=     10  scour    2 primes (11..13)  removed=2  self=1  S=     8  E=6.9  S/E=1.1556
//  @11: W=     2310  N=     90  scour   10 primes (13..47)  removed=45  self=2  S=    45  E=39.3  S/E=1.1458
//  @13: W=    30030  N=    990  scour   34 primes (17..173)  removed=683  self=6  S=   307  E=304.3  S/E=1.0089
//  @17: W=   510510  N=  14850  scour  120 primes (19..709)  removed=11751  self=16  S=  3099  E=3245.5  S/E=0.9549
//  @19: W=  9699690  N= 252450  scour  435 primes (23..3109)  removed=214070  self=52  S= 38380  E=41441.2  S/E=0.9261
//  @23: W=223092870  N=5301450  scour 1739 primes (29..14929)  removed=4703975  self=175  S=597475  E=669028.8  S/E=0.8930   [2.6s]
//  VALIDATION: S and S/E reproduce natal-cap-11 Part 0 digit-for-digit at all six levels @7..@23.
//  VALIDATION: ladder reproduces natal-cap-08 exactly at @17 (16135/14768, K*=2, floor 82) and @19
//              (308401/250573, K*=10, floor 1877), and natal-cap-11 at @23 (sum cap1 48424543, cap2 7034588, K*=27, floor 4841).   [3.8s]
//
// ===== PART 1: THE @29 MARCH — W = 29# = 6,469,693,230, segmented =====
//  sqrt(W) = 80434.40; scour = 7863 primes (31..80429); y = 80429 confirmed = largest prime with q^2 <= W; no prime in (y, sqrt(W+1)]
//  @29: W=6469693230  N=143139150  scour 7863 primes (31..80429)  removed=130831312  self=673  S=12307838  E=14063617.4  S/E=0.8752   [50.7s]
//  Mertens context @29: sum_scour 2/q = 2.305 (raw strike capacity 2.31x the census)
//  VERIFIED: 49 sampled survivors (first 5, every 300000th, last 3) are ALL genuine twin pairs (Miller-Rabin, deterministic bases).
//  (Structural guarantee: survivors dodge r=0,-2 mod every prime <= 80429 = the largest prime <= sqrt(W+1), so every survivor IS a twin pair.)
//  first survivors: (80447,80449) (80471,80473) (80627,80629) (80681,80683) (80747,80749)  last: (6469691561,6469691563) (6469692371,6469692373) (6469692401,6469692403)
//  self-strikes = twins found at the frontier: 673 (each is a scour prime q in a twin pair — proven identity)
//  PREDICTION 2 — the on-record forecasts, recomputed from the @13..@23 fits: free-limit 0.8764, pinned-0.7931 0.8881
//    MEASURED S/E = 0.8752   | residual vs free-limit fit: -0.0013 | vs pinned fit: -0.0129
//    VERDICT: FREE-LIMIT (c=0.7650) fit wins at @29 (spread was 0.0117; full 7-point refits in PART 4).   [50.7s]
//
// ===== PART 2: window-excess law — validation @7..@23, then E_med(29) =====
//  @ 7: grid 2 lengths  E min/med/max = 1.05 / 1.19 / 1.19  maxDeficit/sqrt(mean) = 0.98  [0.0s]
//  @11: grid 10 lengths  E min/med/max = 1.78 / 2.06 / 2.70  maxDeficit/sqrt(mean) = 1.49  [0.0s]
//  @13: grid 34 lengths  E min/med/max = 2.90 / 4.05 / 5.95  maxDeficit/sqrt(mean) = 1.42  [0.0s]
//  @17: grid 120 lengths  E min/med/max = 5.36 / 7.18 / 10.08  maxDeficit/sqrt(mean) = 1.53  [0.0s]
//  @19: grid 435 lengths  E min/med/max = 9.29 / 12.61 / 21.46  maxDeficit/sqrt(mean) = 1.21  [1.6s]
//  @23: grid 139 lengths (every 13th q)  E min/med/max = 18.81 / 23.20 / 34.37  maxDeficit/sqrt(mean) = 1.05  [11.8s]
//  VALIDATION: E_med reproduces natal-cap-17 at all six levels (1.19/2.06/4.05/7.18/12.61/23.20) + cap-01/cap-17 spot M values.
//  PREDICTION 3 — on-record forecasts recomputed: geometric(x1.81/level) E_med(29) = 42.2, N^0.225 law = 52.4
//  @29 grid: 143 lengths (every 57th q), l = 80440..208699782; cyclic extension 4617403 positions
//         l |       mean |      M |     E=M-mean
//      80440 |     1779.7 |   1810 |     30.30
//      89746 |     1985.6 |   2017 |     31.41
//     103411 |     2287.9 |   2321 |     33.08
//     121673 |     2692.0 |   2726 |     34.04
//     147230 |     3257.4 |   3293 |     35.60
//     185874 |     4112.4 |   4151 |     38.62
//     248806 |     5504.7 |   5544 |     39.28
//     370905 |     8206.1 |   8250 |     43.89
//     696190 |    15402.9 |  15449 |     46.10
//    3319494 |    73442.4 |  73492 |     49.64
//  208699782 |  4617391.9 | 4617452 |     60.06
//  E min/med/max = 28.69 / 36.24 / 60.06   log-log slope E vs mean = 0.109  (~0 => l-independent)
//  deficit side (computed on 19/143 grid lengths): max (mean-m)/sqrt(mean) = 0.80
//  powers of 2:  E(2^17)=33.1  E(2^18)=39.2  E(2^19)=49.4  E(2^20)=52.7  E(2^21)=46.4  E(2^22)=50.8  E(2^23)=49.7  E(2^24)=56.4  E(2^25)=52.8  E(2^26)=55.6  E(2^27)=56.1
//  E_med(29) = 36.24   | geometric predicted 42.2 | N^0.225 predicted 52.4
//  PREDICTION 3 VERDICT: GEOMETRIC (x1.81/level) law wins (|resid| 6.0 vs 16.2); step ratio @23->@29 = x1.562 vs geometric x1.814, N-law x2.097
//  7-point refits: log2(E_med) = -0.553 + 0.836k (x1.785/level, rms 0.069);  E ~ N^0.209 (rms 0.118)
//  step ratios: x1.735  x1.964  x1.770  x1.757  x1.840  x1.562   [318.1s]
//
// ===== PART 3: the staircase cap ladder at @29 — PREDICTION 1 =====
//  W^(1/4)=283.61, W^(1/3)=1863.35, sqrt(W)=80434.40; 7863 scour primes; freshness pool = first 192 scour primes (31..1231)
//  all 7863 per-prime caps verified (fresh <= cap_K <= ... <= cap2 <= cap1; regime formulas asserted)   [973.1s]
//       q  |    fresh |    cap1    r1    |    cap2    r2    |  cap_K*   rK*   | type  | pred
//       31 |  9234772 |  65927096 0.140 |   9234772 1.000 |  9234772 1.000 | phi   | 0.140
//       37 |  7238058 |  53454400 0.135 |   7487657 0.967 |  7238058 1.000 | phi   | 0.135
//       41 |  6178886 |  46935565 0.132 |   6574561 0.940 |  6178886 1.000 | phi   | 0.132
//       43 |  5604061 |  43661085 0.128 |   6115841 0.916 |  5604062 1.000 | phi   | 0.128
//       47 |  4888643 |  39016357 0.125 |   5465211 0.895 |  4888644 1.000 | phi   | 0.125
//       53 |  4150684 |  33863386 0.123 |   4743395 0.875 |  4150684 1.000 | phi   | 0.123
//       59 |  3588011 |  29845798 0.120 |   4180679 0.858 |  3588011 1.000 | phi   | 0.120
//       61 |  3352658 |  28377926 0.118 |   3975047 0.843 |  3352658 1.000 | phi   | 0.118
//       67 |  2952402 |  25412846 0.116 |   3559714 0.829 |  2952402 1.000 | phi   | 0.116
//       71 |  2702817 |  23622921 0.114 |   3308998 0.817 |  2702817 1.000 | phi   | 0.114
//       73 |  2554724 |  22651553 0.113 |   3173008 0.805 |  2554725 1.000 | phi   | 0.113
//       79 |  2295980 |  20643719 0.111 |   2891692 0.794 |  2295981 1.000 | phi   | 0.111
//     5393 |    10621 |    184400 0.058 |     25797 0.412 |    15060 0.705 | prime | 0.057
//    11779 |     4467 |     87713 0.051 |     12296 0.363 |     7178 0.622 | prime | 0.053
//    18433 |     2785 |     55881 0.050 |      7813 0.356 |     4569 0.610 | prime | 0.050
//    25523 |     1821 |     39006 0.047 |      5429 0.335 |     3210 0.567 | prime | 0.049
//    32719 |     1255 |     28577 0.044 |      3972 0.316 |     2321 0.541 | prime | 0.048
//    40093 |      919 |     21177 0.043 |      2982 0.308 |     1747 0.526 | prime | 0.047
//    47639 |      637 |     15484 0.041 |      2148 0.297 |     1244 0.512 | prime | 0.046
//    55219 |      461 |     10897 0.042 |      1524 0.302 |      899 0.513 | prime | 0.045
//    62921 |      279 |      7061 0.040 |       976 0.286 |      551 0.506 | prime | 0.045
//    70823 |      142 |      3644 0.039 |       501 0.283 |      289 0.491 | prime | 0.044
//    78577 |       27 |       678 0.040 |        99 0.273 |       57 0.474 | prime | 0.044
//    80387 |        2 |        15 0.133 |         3 0.667 |        3 0.667 | prime | 0.044
//    80407 |        0 |         8 0.000 |         1 0.000 |        0 NaN | prime | 0.044
//    80429 |        0 |         2 0.000 |         0 NaN |        0 NaN | prime | 0.044
//  bands (n, actual, cap1, cap2): phi(q<=W^1/4): 51, 88685416, 778768714, 109086557 | semi: 223, 22478085, 295450132, 41385883 | prime(q>W^1/3): 7589, 19667811, 368785669, 51660643
//  TOTAL: removed 130831312 of N=143139150 (survivors 12307838); sum cap1 = 1443004515 (10.08N); sum cap2 = 202133083 (1.4121N)
//  tail (prime regime) cap1 = 368785669; Rosser-Schoenfeld closed form <= 440268936; PNT-style 2ln2*W/lnW = 397022692; tail cap1/N = 2.58; tail cap2/N = 0.36
//  cap_infinity anchor: removed + sum(s) - sum(self) = 130831312 + 3928 - 673 = 130834567 (0.9140N) — closure guaranteed at SOME finite K
//  cap_K ladder (sum over q):
//    K=0:202133083  K=1:195702857  K=2:190724509  K=3:186522938  K=4:182754032  K=5:179501604
//    K=6:176767381  K=7:174425006  K=8:172255705  K=9:170360340  K=10:168638920  K=11:167025765
//    K=12:165586005  K=13:164260215  K=14:163062069  K=15:161994962  K=16:160996528  K=24:154897696
//    K=32:151119791  K=40:148473807  K=48:146501210  K=56:144961352  K=64:143752962  K=65:143617946
//    K=66:143485864  K=67:143356800  K=68:143231102  K=69:143107823<N!  K=70:142987742<N!  K=71:142871938<N!
//    K=72:142757249<N!  K=73:142645763<N!
//  minimal K closing the pigeonhole at @29: K* = 69  (sum 143107823 < N = 143139150; CERTIFIED survivors >= 31327)
//  gains per modulus near K*: Delta(67)=129064  Delta(68)=125698  Delta(69)=123279  Delta(70)=120081   (1st modulus gained 6430226)
//  PREDICTION 1 — phi-band law said K*(29) ~ 70-71 (phi-band = 51 primes x drift ratio ~1.4); cap-11's linear-in-scour fit says ~117
//    MEASURED: K*(29) = 69   K*/phi-band = 1.35   K*/scour = 0.0088   certified floor 31327 twin pairs (truth 12307838)
//
// ===== PART 4: the K*(x) six-point curve =====
//  @11: scour length   10  K* =   0   K*/scour = 0.0000   phi-band = 0
//  @13: scour length   34  K* =   0   K*/scour = 0.0000   phi-band = 0
//  @17: scour length  120  K* =   2   K*/scour = 0.0167   phi-band = 2   K*/phi-band = 1.00
//  @19: scour length  435  K* =  10   K*/scour = 0.0230   phi-band = 8   K*/phi-band = 1.25
//  @23: scour length 1739  K* =  27   K*/scour = 0.0155   phi-band = 21   K*/phi-band = 1.29
//  @29: scour length 7863  K* =  69   K*/scour = 0.0088   phi-band = 51   K*/phi-band = 1.35
//  fit ln K* = a + b*x            (4 pts): b = 0.269 per unit x  (e^b = 1.31x per unit)  rms 0.452
//  fit ln K* = a + b*ln(scourlen) (4 pts): b = 0.829  => K* ~ (scour length)^0.83  rms 0.222
//  fit K*   = a + b*scourlen      (4 pts): b = 0.0081  a = 6.3  rms 4.25
//  pairwise power exponents (K* vs scour length): 17->19: 1.25; 19->23: 0.72; 23->29: 0.62
//  forecast: @31 phi-band = 110 primes; K*/phi-band drift 1.00, 1.25, 1.29, 1.35 => K*(31) ~ 153
//
// ===== PART 5: anchored drift S/E — seven points, approach to e^{2gamma}/4 = 0.79305 =====
//    x |   S/E   | 1/lnW   | Mertens u(y)
//    7 | 1.1556 | 0.1870  | 0.7816
//   11 | 1.1458 | 0.1291  | 0.9083
//   13 | 1.0089 | 0.0970  | 0.9698
//   17 | 0.9549 | 0.0761  | 0.9871
//   19 | 0.9261 | 0.0622  | 0.9958
//   23 | 0.8930 | 0.0520  | 0.9983
//   29 | 0.8752 | 0.0443  | 0.9995
//  --- all 7 points ---
//   R = c + b*1/lnW   : free c = 0.7941 (b=2.163, rms 0.0328) | pinned c=0.7931: b=2.172, rms 0.0328
//   R = c + b*1/ln^2 W: free c = 0.9002 (b=8.727, rms 0.0478) | pinned c=0.7931: b=13.625, rms 0.0901
//   R = c + b*(u(y)-1): free c = 0.9298 (b=-1.254, rms 0.0520) | pinned c=0.7931: b=-2.114, rms 0.1240
//  --- last 4 points ---
//   R = c + b*1/lnW   : free c = 0.7621 (b=2.561, rms 0.0029) | pinned c=0.7931: b=2.055, rms 0.0068
//   R = c + b*1/ln^2 W: free c = 0.8373 (b=20.953, rms 0.0047) | pinned c=0.7931: b=31.580, rms 0.0172
//   R = c + b*(u(y)-1): free c = 0.8838 (b=-5.914, rms 0.0109) | pinned c=0.7931: b=-15.293, rms 0.0653
//  successive drops in S/E: -0.0097  -0.1369  -0.0541  -0.0287  -0.0331  -0.0179
//  remaining gap to limit at @29: 0.0821 (23% of the @7 gap)
//  forecast @31: free-limit fit (c=0.7621) R = 0.8605 vs pinned-0.7931 fit R = 0.8720   (spread 0.0115)
//  forecast @37: free-limit fit (c=0.7621) R = 0.8486 vs pinned-0.7931 fit R = 0.8624   (spread 0.0138)
//    [973.1s]
//
// done in 973.1s
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
//
// 0. CHAIN OF CUSTODY, FIRST AND FULLY. Before @29 was touched, this file's
//    machinery re-derived, digit-for-digit: the six-level S and S/E series of
//    natal-cap-11; the cap ladder of natal-cap-08 at @17/@19 AND of
//    natal-cap-11 at @23 (48424543 / 7034588 / K*=27 / floor 4841); the six
//    E_med values of natal-cap-17 plus natal-cap-01's spot M values. The
//    scour depth is verified: y = 80429 IS the largest prime <= sqrt(W), and
//    no prime lives in (80429, sqrt(W+1)], so a survivor of the full march is
//    structurally a genuine twin pair; 49 sampled survivors (first, last, and
//    every 300,000th) passed Miller-Rabin on both members, zero failures.
//    The ledger closes: removed (130,831,312) + S (12,307,838) = N, and the
//    673 self-strikes are 673 twins found at the frontier, per the proven
//    self-strike identity.
//
// 1. PREDICTION 1 — CONFIRMED, STRIKINGLY. K*(29) = 69 against the phi-band
//    forecast "~70" (cap-11's printed line said 71 = 51 x 1.4). The
//    competing reads are dead: cap-11's linear-in-scour fit said ~117 (miss
//    by 70%), the old exponential read said worse. The phi-band law is now
//    the K* law of record: K*/(pi(W^1/4) - pi(x)) = 1.00, 1.25, 1.29, 1.35
//    at @17/@19/@23/@29 — the freshness moduli needed to close the
//    pigeonhole are the quarter-power primes times a slowly drifting factor.
//    K*(29)'s 69 moduli run 31..401; W^(1/4) = 284. K*/scour has COLLAPSED
//    (0.0230 -> 0.0155 -> 0.0088; pairwise exponent 1.25 -> 0.72 -> 0.62):
//    K* grows strictly SLOWER than the scour — cap-08's fear that the moduli
//    list "becomes the march" is refuted a second time, more decisively.
//    Open question sharpened: is K*/phi-band -> const (~1.4)? The +0.06,
//    +0.04, +0.06 drift has not yet turned over. Forecast on record:
//    @31 phi-band = 110, so K*(31) ~ 145-155 if the drift holds.
//
// 2. THE CERTIFIED FLOOR: >= 31,327 TWIN PAIRS IN THE 29-TILE, by elementary
//    per-prime counting caps alone — the largest pigeonhole-certified twin
//    floor of the campaign (truth: 12,307,838), obtained without locating a
//    single strike. Certificate efficiency continues its collapse: floor /
//    truth = 0.76, 0.36, 0.026, 0.049, 0.0081, 0.0025 at @11..@29. The wall
//    still shows up exactly as cap-11 said: not as K* exploding (it is
//    sub-linear in the scour) but as the certified sliver vanishing. Closure
//    margin 31,327 = 0.022% of N; gains per modulus at K* (123,279) are
//    still ~4x the closing margin — the ladder is not yet scraping bottom
//    (cap_infinity = 0.9140N, plenty of headroom below N).
//
// 3. PREDICTION 2 — THE FREE-LIMIT FIT WINS THE HEAD-TO-HEAD. S(29)/E =
//    12,307,838 / 14,063,617.4 = 0.8752, EXACT. The on-record free-limit
//    forecast 0.8764 misses by -0.0013; the pinned-e^{2gamma}/4 linear
//    forecast 0.8881 misses by -0.0129, ten times worse. The naive form
//    "R = 0.7931 + b/lnW" is dead: with the @29 point, pinning costs 2.3x
//    in rms (0.0068 vs 0.0029 on the last 4) and its miss is 4x the
//    worst free-fit residual.
//
// 4. HONEST CALIBRATION — DO NOT READ 0.762 AS THE LIMIT. The free intercept
//    is a moving target: 0.7650 (@13..@23 fit) -> 0.7621 (@17..@29 fit) —
//    it slides DOWN as points are added, the signature of live higher-order
//    terms, exactly the fit-hygiene lesson cap-17 Part B logged ("don't read
//    intercepts off this drift"). Meanwhile the ZERO-free-parameter
//    classical model R = (e^{2gamma}/4)(1 + 2/lnW + 6/ln^2 W) — the same
//    PNT-correction series that nailed cap-17's zone ratios, applied at
//    x = W (arithmetic on the table above) — gives 0.9917, 0.9413, 0.9100,
//    0.8884, 0.8726 at @13..@29 vs measured 1.0089, 0.9549, 0.9261, 0.8930,
//    0.8752: residuals +0.017, +0.014, +0.016, +0.005, +0.003, collapsing
//    with no knob turned. And the all-7 free intercept sits at 0.7941,
//    within 0.001 of e^{2gamma}/4. Verdict: the data now POSITIVELY favors
//    limit = 0.793055 approached with classical corrections, and rejects the
//    straight-line-in-1/lnW reading of it. The two-fit discrimination this
//    march was built for is settled — and the winner is "both forms were
//    too crude; the classical correction series is the curve."
//
// 5. PREDICTION 3 — GEOMETRIC WINS, BUT THE BASE IS ERODING. E_med(29) =
//    36.24: geometric (x1.81/level) predicted 42.2 (miss 6.0), N^0.225
//    predicted 52.4 (miss 16.2). The census-power law is refuted on
//    structure a second time (it predicted an ACCELERATING step, x2.10;
//    observed x1.562). But honesty cuts the winner too: x1.562 is the
//    smallest step ratio in seven levels (1.735, 1.964, 1.770, 1.757,
//    1.840, 1.562), so the "constant ~1.8 multiplier" now looks like a
//    multiplier drifting slowly DOWNWARD, not a constant. 7-point refits:
//    x1.785/level (rms 0.069 in log2, up from 0.99941-R^2 smoothness) or
//    E ~ N^0.209. l-independence within the level HOLDS across 3.4 decades
//    (log-log slope 0.109), the deficit side stays symmetric (0.80), and
//    the largest-window tilt persists (E = 60.1 at l = W/31 vs med 36.2,
//    the same ~1.7x head-tilt seen at every level). Note: @29 median is
//    over an every-57th-q subsample of the grid (uniform subsampling
//    preserves quantiles; convention identical to cap-17 @23).
//
// 6. THE MARCH ITSELF, FOR THE RECORD. Segmented flat march, 216 blocks of
//    3e7, natal generation by residue-counter walk (no divisions), strike
//    cost sum 2W/q = 2.305W = 1.5e10 strides — 54 seconds. The @29 tile
//    holds 12,307,838 surviving twin slots in houses 11/17 (all genuine
//    twins), first (80447, 80449) — the first twin past the frontier —
//    last (6469692401, 6469692403). Raw strike capacity is now 2.31x the
//    census; the tile still keeps 8.6% of N alive. Overlap credit absorbs
//    ~57% of all strike capacity. Everything scales as the campaign
//    priced: @29 was "minutes, not hours" exactly as cap-11 reading 9
//    forecast (march 54s; the LADDER is now the expensive object, 10 min).
//
// 7. NEXT — THE @31 DRIFT POINT IS THE CHEAP DECIDER; THE @31 LADDER IS THE
//    NEW HARD PROBLEM. (a) Drift: at @31 (W = 2.0056e11) the three live
//    curves separate: classical-correction model 0.8641, free-linear fit
//    0.8605, pinned-linear 0.8720 — spreads of 0.004-0.008, and S/E is
//    exact. Cost: one segmented march, sum 2/q = 2.524, ~5e11 strides —
//    an hour-scale JS job, no new machinery (positions/excess/ladder all
//    skippable for this read). (b) K*(31) ~ 150 (phi-band law) would need
//    the cap ladder with m-ranges to (W+1)/37 = 5.4e9 — the flat lpf/pi
//    tables (21+ GB) no longer fit; a segmented Phi*/pi counting pass is
//    the required new tool. (c) Excess @31 needs streaming windows (N31 =
//    4.15e9 positions cannot be stored); the drifting-multiplier question
//    (reading 5) says measure it before trusting any extrapolation.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   PART 2's largest-window row E = 60.06 at l = 208699782 = W/31 -> the
//   E = 60.1 of reading 5.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   145-155 in reading 1 is a band around PART 4's printed forecast K*(31) ~
//     153, which is the phi-band 110 times the 1.35-to-1.4 drift.
//   The certificate-efficiency series of reading 2 divides each level's
//     certified floor by its S: 82/3099 = 0.026 at @17, 1877/38380 = 0.049 at
//     @19, 4841/597475 = 0.0081 at @23 and 31327/12307838 = 0.0025 at @29,
//     all four floors printed in PART 0 or PART 3.
//   0.022% is the closure margin 31327 over N = 143139150, which is 0.0219%.
//   The zero-parameter classical curve of reading 4, 0.9917, 0.9413, 0.9100,
//     0.8884 and 0.8726, is (e^{2 gamma}/4)(1 + 2/lnW + 6/ln^2 W) evaluated on
//     PART 5's printed 1/lnW column at @13 through @29. Its last two entries
//     are independently printed by natal-cap-22-at31-drift.js.
//   The residuals +0.017, +0.014, +0.016, +0.005, +0.003 are PART 5's
//     measured S/E column minus that curve.
//   1.5e10 strides in reading 6 is the printed 2.305 times W = 6469693230,
//     which is 1.49e10.
//   W = 2.0056e11 at @31 in reading 7 is the printed @29 W times 31, and
//     N31 = 4.15e9 is the printed @29 N of 143139150 times 29.
//   The spreads 0.004-0.008 in reading 7 are the gaps among that reading's own
//     three @31 curves, 0.8641 - 0.8605 and 0.8720 - 0.8641.
//   ~5e11 strides is that reading's sum 2/q times W at @31, and 5.4e9 is
//     (W+1)/37 = 5420553787.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   0.99941 in reading 5 is natal-cap-17-cheap-laws.js's R^2 for
//     log2(E_med) = -0.616 + 0.859k.
//   0.8641 in reading 7 is natal-cap-22-at31-drift.js's "classical-record"
//     forecast, which that file defines as the classical raw value 0.8610 plus
//     the persisted @29 residual. The bare classical series of reading 4,
//     continued to @31, gives 0.8610, not 0.8641.
//
// DEFINITION / LITERATURE constants: 0.793055 in reading 4 is e^{2 gamma}/4,
//   which PART 5 prints to five places as 0.79305.
//
// CORRECTED 2026-08-20 (mismatch adjudication #4): reading 7's "sum 2/q = 2.66"
//   is now 2.524 (old -> new: 2.66 -> 2.524). When the @31 march was actually
//   run, natal-cap-22-at31-drift.js printed sum_scour 2/q = 2.524 over its
//   scour 37..447829, and summing 2/q over the same primes reproduces 2.52361
//   (recomputed here 2026-08-20 by sieve). The old 2.66 is traced: summing 2/q
//   from q = 29 rather than q = 37 gives 2.6578, i.e. the @29 scour floor
//   carried into an @31 window. Starting at 31 gives 2.5881. The stride
//   estimate that follows survives the correction untouched: 2.524 x W(31) =
//   5.06e11, still the quoted ~5e11.
// ---------------------------------------------------------------------------
