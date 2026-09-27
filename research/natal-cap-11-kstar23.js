// ============================================================================
// ATTACK 11 — K*(23) AND THE ANCHORED DRIFT: the Scour march at x = 23
// (2026-08-14; extends natal-cap-08-staircase.js to W = 23# = 223,092,870)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation). READING 4 below
// ("what K* buys is collapsing … certificate EFFICIENCY dying") is REFUTED
// as a statement about the technology. natal-cap-24-boundK-curve.js reading 5
// measured bound/truth at FIXED RELATIVE DEPTH and found it IMPROVES with
// level: at K/scour = 10/25/50% the ratios run 0.65→0.71→0.79, 0.88→0.91→0.94,
// 0.97→0.98→0.99 across @17→@19→@23, monotone at every depth ≥ 3%. The
// collapse reading was an artifact of looking only at the crossing point K*,
// where the bound is still climbing out of negative territory. The honest
// statement: the wall's fingerprint on this technology is confined to the
// crossing (the K* floors do catch a vanishing sliver of truth, 0.36/0.026/
// 0.049/0.0081), while the curve beyond the crossing steepens as x grows.
// Certificate depth is not where this campaign dies. The same correction
// applies to natal-cap-18-at29.js reading 2. Readings 1, 2, 3, 5, 6, 7 here
// stand; reading 3's phi-band law was confirmed at @29 (K* = 69 vs ~70).
//
// TWO QUESTIONS, one march.
//
// QUESTION 1 — K*(23). natal-cap-08's refined ladder: per-prime HISTORY-BLIND
// hard caps on fresh Scour kills (cap1 = divisibility skeleton via Phi*;
// cap2 = + the deterministic natal residue system on the cofactor v = q*m;
// cap_K = + the 2 forbidden freshness residues mod the first K scour primes;
// s(q) = the self-strike allowance, 1 iff q mod 30 in {11,13,17,19}).
// K* = smallest K with sum_q cap_K(q) < N — the pigeonhole then CERTIFIES
// survivors >= N - sum cap_K > 0, an elementary counting proof of twin pairs
// in the tile. Measured so far: K* = 0, 0, 2, 10 at @11, @13, @17, @19.
// Deliverable: K*(23), the certified floor, and the five-point K*(x) curve
// with a growth diagnosis (ln K* vs x and vs the scour length pi(sqrt W)).
// COMPARABILITY GUARD: this file's ladder is re-validated against the exact
// natal-cap-08 sums at @17 and @19 (asserted digit-for-digit) before @23 runs.
//
// QUESTION 2 — ANCHORED DRIFT. The march's final survivor count S(23) (every
// survivor is a genuine twin pair — verified here EXHAUSTIVELY by a full
// Eratosthenes cross-sieve, not just spot-checked), the ensemble mean
// E = (2/30) * prod_{7<=p<=y} (1-2/p) * W at scour depth y = largest prime
// <= sqrt(W), and the anchored ratio S/E. Existing points: 1.156, 1.146,
// 1.009, 0.955, 0.926 at x = 7..19 (recomputed in-run below, same machinery).
// Predicted limit e^{2gamma}/4 = 0.793055 (the Unification-Law zone-edge
// trough; the campaign memo's "0.79325" is a rounding slip). Does @23
// continue the descent, and does the data discriminate the limit yet? Fit
// the approach against 1/lnW, 1/ln^2 W, and the finite-Mertens correction.
//
// SETUP. W = 23# = 223,092,870. Natal@5 = { r in [0,W) : r = 11 or 17
// (mod 30), r mod p not in {0, p-2} for p = 7,11,13,17,19,23 }.
// N = 2 * prod_{7<=p<=23}(p-2) = 2*5*9*11*15*17*21 = 5,301,450
//   = (2/3) * prod_{3<=p<=23}(p-2)  (asserted).
// Scour: primes q in (23, sqrt(W) = 14936.02], ascending, fresh kills only.
// Tile held as a flat Uint8Array (223 MB); march is strided r = 0, -2 (mod q)
// with an alive check — ~5e8 touches, seconds.
//
//   node research/natal-cap-11-kstar23.js     (~7 s, ~600 MB RAM)
// ============================================================================
'use strict';

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,msg){if(!c)throw new Error('ASSERT FAIL: '+msg)}
const t0=Date.now(); const el=()=>((Date.now()-t0)/1000).toFixed(1)+'s';

const GAMMA=0.5772156649015329, C2=0.6601618158468696;
const LIMIT=Math.exp(2*GAMMA)/4; // 0.793055...

// ---------- Natal@5 tile + Scour march at level x (flat-array tree march) ----
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
    for(let r=q;r<W;r+=q)if(alive[r]){alive[r]=0;fresh++;if(r===q)self++}     // q | r
    for(let r=q-2;r<W;r+=q)if(alive[r]){alive[r]=0;fresh++;if(r===q-2)self++} // q | r+2
    if(wantRows)rows.push({q,fresh,self});
    removed+=fresh;selfT+=self;
  }
  let S=0;
  for(const r0 of [11,17])for(let r=r0;r<W;r+=30)if(alive[r])S++;
  let prod=1;for(const p of mids)prod*=1-2/p;for(const q of scour)prod*=1-2/q; // prod_{7<=p<=y}(1-2/p)
  const y=scour[scour.length-1];
  const E=(2/30)*prod*W;
  return {x,W,N,S,removed,selfT,scour,rows,y,E,R:S/E,prod,alive};
}

// ---------- PART 0: the march at every level (anchored series, one machinery)
console.log('===== PART 0: Natal@5 Scour march, x = 7..23 (anchored ratio series) =====');
const levels=[];
for(const x of [7,11,13,17,19]){
  const L=marchLevel(x,x>=17); L.alive=null; levels.push(L);
  console.log(` @${String(x).padStart(2)}: W=${String(L.W).padStart(9)}  N=${String(L.N).padStart(7)}  scour ${String(L.scour.length).padStart(4)} primes (${L.scour[0]}..${L.y})  removed=${L.removed}  self=${L.selfT}  S=${String(L.S).padStart(6)}  E=${L.E.toFixed(1)}  S/E=${L.R.toFixed(4)}`);
}
const L23=marchLevel(23,true); levels.push(L23);
{
  const L=L23;
  assert(L.N===5301450 && L.N===2*5*9*11*15*17*21,'N formula');
  assert(L.N*3===2*(1*3*5*9*11*15*17*21),'N = (2/3) prod_{3..23}(p-2)');
  console.log(` @23: W=${L.W}  N=${L.N}  scour ${L.scour.length} primes (${L.scour[0]}..${L.y})  removed=${L.removed}  self=${L.selfT}  S=${L.S}  E=${L.E.toFixed(1)}  S/E=${L.R.toFixed(4)}   [${el()}]`);
  const s2q=L.scour.reduce((a,q)=>a+2/q,0);
  console.log(` Mertens context @23: sum_scour 2/q = ${s2q.toFixed(3)} (raw strike capacity ${s2q.toFixed(2)}x the census; overlap credit pays the difference)`);
}

// ---------- exhaustive twin verification of the @23 survivors ----------------
{
  const W=L23.W, alive=L23.alive;
  const comp=new Uint8Array(W+2); comp[0]=1;comp[1]=1;
  for(let p=2;p*p<=W+1;p++)if(!comp[p])for(let j=p*p;j<=W+1;j+=p)comp[j]=1;
  let bad=0,tw1117=0,tw29=0,firsts=[],lasts=[];
  for(const r0 of [11,17])for(let r=r0;r<W;r+=30){
    const t=!comp[r]&&!comp[r+2];
    if(t&&r>23)tw1117++;
    if(alive[r]){ if(!t)bad++; if(firsts.length<5)firsts.push(r); }
  }
  for(let r=29;r<W;r+=30)if(!comp[r]&&!comp[r+2])tw29++;
  for(let r=W-1;r>0&&lasts.length<3;r--)if(alive[r])lasts.push(r);
  assert(bad===0,'a survivor is not a genuine twin pair');
  assert(tw1117===L23.S+L23.selfT,'twin ledger: twins(11/17, r>23) != S + self-strikes');
  console.log(` VERIFIED: all ${L23.S} survivors are genuine twin pairs (full Eratosthenes cross-sieve to W+1; 0 failures).`);
  console.log(` Twin ledger closes exactly: twins in classes 11/17 mod 30 with r>23 = ${tw1117} = S(${L23.S}) + self-strikes(${L23.selfT}).`);
  console.log(` (House 29 holds ${tw29} twins; tile total ${tw1117+tw29+3} counting (5,7),(11,13),(17,19).)`);
  console.log(` first survivors: ${firsts.map(r=>`(${r},${r+2})`).join(' ')}  last: ${lasts.reverse().map(r=>`(${r},${r+2})`).join(' ')}   [${el()}]`);
  L23.alive=null; // release 223 MB before the cap phase
}

// ---------- PART 1: the staircase cap ladder -------------------------------
// Conventions IDENTICAL to natal-cap-08: cap1 = Phi*(A,q)+Phi*(B,q)+s with
// A = floor((W-1)/q), B = floor((W+1)/q); cap2 = natal residue system on
// v = q*m (A side: v=11/17 mod 30, v != p-2 mod p; B side: v=13/19 mod 30,
// v != 2 mod p; v=0 mod p impossible since lpf(m)>=q>x); cap_K = + first K
// freshness moduli (A side forbids v=0,-2 mod q'; B side v=0,2 mod q').
console.log('\n===== PART 1: the staircase cap ladder =====');
const LIM=Math.floor((L23.W+1)/29);
const lpf=new Int32Array(LIM+1);
for(let i=2;i<=LIM;i++)if(lpf[i]===0)for(let j=i;j<=LIM;j+=i)if(lpf[j]===0)lpf[j]=i;
const isP=new Uint8Array(LIM+1), PIcum=new Int32Array(LIM+1);
{let c=0;for(let i=2;i<=LIM;i++){if(lpf[i]===i){isP[i]=1;c++}PIcum[i]=c}}
const pi=t=>t<2?0:PIcum[t];
const semiBoth=(t,z)=>{let c=0;for(let p1=z;p1*p1<=t;p1++){if(!isP[p1])continue;c+=pi(Math.floor(t/p1))-pi(p1-1)}return c};
const RS=t=>1.25506*t/Math.log(t);

function ladder(L,KMAX,verbose){
  const {W,N,rows}=L;
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
    const fm=fmods.slice(0,Math.min(idx,KMAX)); // freshness moduli strictly below q
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
    { // suffix sums: cap_K counts m whose first violated freshness modulus has index >= K
      let suf=0; const cum=new Int32Array(nf+2);
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
  console.log('     q  |  fresh |   cap1   r1    |   cap2   r2    | cap_K*  rK*   | type  | pred');
  for(let i=0;i<stored.length;i++){
    const r=stored[i];
    if(!(i<12||i%150===0||i>=stored.length-3))continue;
    const cK=Kstar>=0?r.capK[Kstar]:r.capK[KMAX];
    console.log(` ${String(r.q).padStart(6)} | ${String(r.fresh).padStart(6)} | ${String(r.cap1).padStart(7)} ${(r.fresh/r.cap1).toFixed(3)} | ${String(r.capK[0]).padStart(7)} ${(r.fresh/r.capK[0]).toFixed(3)} | ${String(cK).padStart(6)} ${(r.fresh/cK).toFixed(3)} | ${r.type.padEnd(5)} | ${r.pred.toFixed(3)}`);
  }
  console.log(` bands (n, actual, cap1, cap2): phi(q<=W^1/4): ${bands.phi.n}, ${bands.phi.a}, ${bands.phi.c}, ${bands.phi.c2} | semi: ${bands.semi.n}, ${bands.semi.a}, ${bands.semi.c}, ${bands.semi.c2} | prime(q>W^1/3): ${bands.prime.n}, ${bands.prime.a}, ${bands.prime.c}, ${bands.prime.c2}`);
  console.log(` TOTAL: removed ${L.removed} of N=${N} (survivors ${L.S}); sum cap1 = ${sumCap1} (${(sumCap1/N).toFixed(2)}N); sum cap2 = ${sumK[0]} (${(sumK[0]/N).toFixed(4)}N)`);
  console.log(` tail (prime regime) cap1 = ${bands.prime.c}; Rosser-Schoenfeld closed form <= ${Math.ceil(sumCapRS)}; PNT-style 2ln2*W/lnW = ${(2*Math.LN2*W/Math.log(W)).toFixed(0)}; tail cap1/N = ${(bands.prime.c/N).toFixed(2)}; tail cap2/N = ${(bands.prime.c2/N).toFixed(2)}`);
  console.log(` cap_infinity anchor (ALL freshness moduli = the march itself): sum = removed + sum(s) - sum(self) = ${L.removed} + ${sSum} - ${L.selfT} = ${L.removed+sSum-L.selfT} (${((L.removed+sSum-L.selfT)/N).toFixed(4)}N) — closure guaranteed at SOME finite K`);
  const show=[];
  for(let K=0;K<=KMAX;K++){
    if(K<=16||K%8===0||(Kstar>=0&&Math.abs(K-Kstar)<=4))show.push(`K=${K}:${sumK[K]}${sumK[K]<N?'<N!':''}`);
    if(Kstar>=0&&K>Kstar+4)break;
  }
  console.log(' cap_K ladder (sum over q):');
  for(let i=0;i<show.length;i+=8)console.log('   '+show.slice(i,i+8).join('  '));
  if(Kstar>=0){
    console.log(` minimal K closing the pigeonhole at @${L.x}: K* = ${Kstar}  (sum ${sumK[Kstar]} < N = ${N}; CERTIFIED survivors >= ${out.floor})`);
    console.log(` gains per modulus near K*: ${[Kstar-2,Kstar-1,Kstar,Kstar+1].filter(K=>K>0&&K<=KMAX).map(K=>`Delta(${K})=${(sumK[K-1]-sumK[K]).toFixed(0)}`).join('  ')}   (1st modulus gained ${(sumK[0]-sumK[1]).toFixed(0)})`);
  } else console.log(` pigeonhole NOT closed up to K = ${KMAX}: sum cap_${KMAX} = ${sumK[KMAX]} vs N = ${N} (gap ${sumK[KMAX]-N})`);
  return out;
}

// -- validation: reproduce natal-cap-08's ladder digit-for-digit at @17, @19 --
{
  const L17=levels.find(L=>L.x===17), L19=levels.find(L=>L.x===19);
  const v17=ladder(L17,12,false), v19=ladder(L19,12,false);
  assert(v17.sumCap1===99729&&v17.sumK[0]===16135&&v17.sumK[2]===14768&&v17.Kstar===2&&v17.floor===82,'@17 ladder does not match natal-cap-08');
  assert(v19.sumCap1===2025930&&v19.sumK[0]===308401&&v19.sumK[2]===286158&&v19.sumK[10]===250573&&v19.Kstar===10&&v19.floor===1877,'@19 ladder does not match natal-cap-08');
  console.log(' VALIDATION: this ladder reproduces natal-cap-08 exactly at @17 (sum cap1 99729, cap2 16135, K*=2, floor 82)');
  console.log('             and @19 (sum cap1 2025930, cap2 308401, cap_10 250573, K*=10, floor 1877). Conventions match.');
}
const LAD=ladder(L23,192,true);
L23.Kstar=LAD.Kstar; L23.floor=LAD.floor;

// ---------- PART 2: the K*(x) five-point curve -------------------------------
console.log('\n===== PART 2: the K*(x) curve and its growth =====');
{
  const pts=[{x:11,ns:10,K:0},{x:13,ns:34,K:0},{x:17,ns:120,K:2},{x:19,ns:435,K:10},{x:23,ns:L23.scour.length,K:L23.Kstar}];
  for(const p of pts){
    const L=levels.find(L=>L.x===p.x);
    p.phiBand=L?L.scour.filter(q=>q**4<=L.W+1).length:null;
    console.log(` @${String(p.x).padStart(2)}: scour length ${String(p.ns).padStart(4)}  K* = ${String(p.K).padStart(3)}   K*/scour = ${(p.K/p.ns).toFixed(4)}   phi-band pi(W^1/4)-pi(x) = ${p.phiBand===null?'-':p.phiBand}${p.phiBand?'   K*/phi-band = '+(p.K/p.phiBand).toFixed(2):''}`);
  }
  const nz=pts.filter(p=>p.K>0);
  function lsq(u,y){const n=u.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=u[i];sy+=y[i];sxx+=u[i]*u[i];sxy+=u[i]*y[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;let rss=0;for(let i=0;i<n;i++){const e=y[i]-(a+b*u[i]);rss+=e*e}return{a,b,rms:Math.sqrt(rss/n)}}
  const lnK=nz.map(p=>Math.log(p.K));
  const f1=lsq(nz.map(p=>p.x),lnK);
  const f2=lsq(nz.map(p=>Math.log(p.ns)),lnK);
  const f3=lsq(nz.map(p=>p.ns),nz.map(p=>p.K));
  console.log(` fit ln K* = a + b*x            (3 pts): b = ${f1.b.toFixed(3)} per unit x  (e^b = ${Math.exp(f1.b).toFixed(2)}x per unit)  rms ${f1.rms.toFixed(3)}`);
  console.log(` fit ln K* = a + b*ln(scourlen) (3 pts): b = ${f2.b.toFixed(3)}  => K* ~ (scour length)^${f2.b.toFixed(2)}  rms ${f2.rms.toFixed(3)}`);
  console.log(` fit K*   = a + b*scourlen      (3 pts): b = ${f3.b.toFixed(4)}  a = ${f3.a.toFixed(1)}  rms ${f3.rms.toFixed(2)}`);
  console.log(` pairwise power exponents (K* vs scour length): 17->19: ${((Math.log(10/2))/(Math.log(435/120))).toFixed(2)}; 19->23: ${((Math.log(pts[4].K/10))/(Math.log(pts[4].ns/435))).toFixed(2)}`);
  // forecast @29 from the phi-band tracking
  const P300=primesUpTo(300), W29=6469693230;
  const pb29=P300.filter(q=>q>29&&q**4<=W29+1).length;
  console.log(` forecast: @29 phi-band = ${pb29} primes; if K*/phi-band keeps its drift (1.00, 1.25, ${(pts[4].K/pts[4].phiBand).toFixed(2)}), K*(29) ~ ${Math.round(pb29*1.4)}`);
}

// ---------- PART 3: anchored drift fits --------------------------------------
console.log('\n===== PART 3: anchored ratio S/E — approach to e^{2gamma}/4 = '+LIMIT.toFixed(5)+' =====');
{
  console.log('   x |   S/E   | 1/lnW   | Mertens u(y)   (u = prod_{2<p<=y}(1-2/p) * e^{2g} ln^2 y / 4C2)');
  for(const L of levels){
    L.u=(L.prod/5)*Math.exp(2*GAMMA)*Math.log(L.y)**2/(4*C2);
    console.log(`  ${String(L.x).padStart(2)} | ${L.R.toFixed(4)} | ${(1/Math.log(L.W)).toFixed(4)}  | ${L.u.toFixed(4)}`);
  }
  function lsq(u,y){const n=u.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=u[i];sy+=y[i];sxx+=u[i]*u[i];sxy+=u[i]*y[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;let rss=0;for(let i=0;i<n;i++){const e=y[i]-(a+b*u[i]);rss+=e*e}return{a,b,rms:Math.sqrt(rss/n)}}
  const R=levels.map(L=>L.R);
  const preds={'1/lnW   ':levels.map(L=>1/Math.log(L.W)),'1/ln^2 W':levels.map(L=>1/Math.log(L.W)**2),'(u(y)-1)':levels.map(L=>L.u-1)};
  let fFree=null,bPin=null;
  for(const tag of ['all 6 points','last 4 points']){
    const sel=tag==='all 6 points'?[0,1,2,3,4,5]:[2,3,4,5];
    console.log(` --- ${tag} ---`);
    for(const [name,u] of Object.entries(preds)){
      const f=lsq(sel.map(i=>u[i]),sel.map(i=>R[i]));
      let num=0,den=0;for(const i of sel){num+=(R[i]-LIMIT)*u[i];den+=u[i]*u[i]}
      const a=num/den;let rss=0;for(const i of sel){const e=R[i]-(LIMIT+a*u[i]);rss+=e*e}
      console.log(`  R = c + b*${name}: free c = ${f.a.toFixed(4)} (b=${f.b.toFixed(3)}, rms ${f.rms.toFixed(4)}) | pinned c=${LIMIT.toFixed(4)}: b=${a.toFixed(3)}, rms ${Math.sqrt(rss/sel.length).toFixed(4)}`);
      if(tag==='last 4 points'&&name==='1/lnW   '){fFree=f;bPin=a}
    }
  }
  const drops=levels.slice(1).map((L,i)=>L.R-levels[i].R);
  console.log(` successive drops in S/E: ${drops.map(d=>d.toFixed(4)).join('  ')}`);
  console.log(` remaining gap to limit at @23: ${(L23.R-LIMIT).toFixed(4)} (${((L23.R-LIMIT)/(levels[0].R-LIMIT)*100).toFixed(0)}% of the @7 gap)`);
  console.log(' where the two live hypotheses separate (both fit @13..@23 to <0.007 rms):');
  for(const [x,Wn] of [[29,6469693230],[31,200560490130]]){
    const u=1/Math.log(Wn);
    console.log(`   forecast @${x}: free-limit fit (c=${fFree.a.toFixed(4)}) R = ${(fFree.a+fFree.b*u).toFixed(4)} vs pinned-${LIMIT.toFixed(4)} fit R = ${(LIMIT+bPin*u).toFixed(4)}   (spread ${Math.abs(fFree.a+fFree.b*u-LIMIT-bPin*u).toFixed(4)}; S/E is exact, so one march decides)`);
  }
  console.log('   [' + el() + ']');
}
console.log('\ndone in '+el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-11-kstar23.js
//   invocation:  node research/natal-cap-11-kstar23.js
//   code-sha256: b31ad64ef144190b748ce1345323cae6d23943957b65059aa832cb1682b4b496
//   out-sha256:  4642b1ffc4ccc6efde82cdb1fca6d61f7afae47c281dc6cfeabc82707824db7c
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     6.0 s
// ============================================================================
// ===== PART 0: Natal@5 Scour march, x = 7..23 (anchored ratio series) =====
//  @ 7: W=      210  N=     10  scour    2 primes (11..13)  removed=2  self=1  S=     8  E=6.9  S/E=1.1556
//  @11: W=     2310  N=     90  scour   10 primes (13..47)  removed=45  self=2  S=    45  E=39.3  S/E=1.1458
//  @13: W=    30030  N=    990  scour   34 primes (17..173)  removed=683  self=6  S=   307  E=304.3  S/E=1.0089
//  @17: W=   510510  N=  14850  scour  120 primes (19..709)  removed=11751  self=16  S=  3099  E=3245.5  S/E=0.9549
//  @19: W=  9699690  N= 252450  scour  435 primes (23..3109)  removed=214070  self=52  S= 38380  E=41441.2  S/E=0.9261
//  @23: W=223092870  N=5301450  scour 1739 primes (29..14929)  removed=4703975  self=175  S=597475  E=669028.8  S/E=0.8930   [3.2s]
//  Mertens context @23: sum_scour 2/q = 2.053 (raw strike capacity 2.05x the census; overlap credit pays the difference)
//  VERIFIED: all 597475 survivors are genuine twin pairs (full Eratosthenes cross-sieve to W+1; 0 failures).
//  Twin ledger closes exactly: twins in classes 11/17 mod 30 with r>23 = 597650 = S(597475) + self-strikes(175).
//  (House 29 holds 298408 twins; tile total 896061 counting (5,7),(11,13),(17,19).)
//  first survivors: (15581,15583) (15641,15643) (15731,15733) (15971,15973) (16061,16063)  last: (223091621,223091623) (223092047,223092049) (223092671,223092673)   [4.3s]
//
// ===== PART 1: the staircase cap ladder =====
//  VALIDATION: this ladder reproduces natal-cap-08 exactly at @17 (sum cap1 99729, cap2 16135, K*=2, floor 82)
//              and @19 (sum cap1 2025930, cap2 308401, cap_10 250573, K*=10, floor 1877). Conventions match.
//  W^(1/4)=122.21, W^(1/3)=606.50, sqrt(W)=14936.29; 1739 scour primes; freshness pool = first 192 scour primes (29..1229)
//  all 1739 per-prime caps verified (fresh <= cap_K <= ... <= cap2 <= cap1; regime formulas asserted)   [5.9s]
//      q  |  fresh |   cap1   r1    |   cap2   r2    | cap_K*  rK*   | type  | pred
//      29 | 365606 | 2516914 0.145 |  365606 1.000 | 365606 1.000 | phi   | 0.145
//      31 | 318450 | 2273358 0.140 |  330235 0.964 | 318450 1.000 | phi   | 0.140
//      37 | 249561 | 1843252 0.135 |  267736 0.932 | 249561 1.000 | phi   | 0.135
//      41 | 213075 | 1618449 0.132 |  235097 0.906 | 213075 1.000 | phi   | 0.132
//      43 | 193226 | 1505451 0.128 |  218679 0.884 | 193227 1.000 | phi   | 0.128
//      47 | 168500 | 1345243 0.125 |  195374 0.862 | 168501 1.000 | phi   | 0.125
//      53 | 143124 | 1167496 0.123 |  169621 0.844 | 143124 1.000 | phi   | 0.123
//      59 | 123726 | 1028960 0.120 |  149488 0.828 | 123726 1.000 | phi   | 0.120
//      61 | 115576 |  978416 0.118 |  142140 0.813 | 115576 1.000 | phi   | 0.118
//      67 | 101849 |  876338 0.116 |  127284 0.800 | 101849 1.000 | phi   | 0.116
//      71 |  93191 |  814763 0.114 |  118359 0.787 |  93191 1.000 | phi   | 0.114
//      73 |  88087 |  781469 0.113 |  113506 0.776 |  88088 1.000 | phi   | 0.113
//     941 |   2995 |   41661 0.072 |    6040 0.496 |   3989 0.751 | prime | 0.072
//    2053 |   1286 |   20047 0.064 |    2917 0.441 |   1949 0.660 | prime | 0.065
//    3257 |    740 |   12705 0.058 |    1858 0.398 |   1237 0.598 | prime | 0.061
//    4493 |    506 |    8980 0.056 |    1311 0.386 |    869 0.582 | prime | 0.059
//    5791 |    350 |    6600 0.053 |     945 0.370 |    646 0.542 | prime | 0.057
//    7103 |    275 |    4952 0.056 |     735 0.374 |    492 0.559 | prime | 0.056
//    8501 |    170 |    3649 0.047 |     504 0.337 |    331 0.514 | prime | 0.055
//    9811 |    137 |    2664 0.051 |     384 0.357 |    242 0.566 | prime | 0.054
//   11251 |     96 |    1768 0.054 |     264 0.364 |    182 0.527 | prime | 0.053
//   12641 |     40 |    1037 0.039 |     148 0.270 |     95 0.421 | prime | 0.052
//   14081 |     17 |     377 0.045 |      51 0.333 |     36 0.472 | prime | 0.052
//   14897 |      0 |      17 0.000 |       5 0.000 |      2 0.000 | prime | 0.051
//   14923 |      1 |       9 0.111 |       2 0.500 |      2 0.500 | prime | 0.051
//   14929 |      0 |       5 0.000 |       1 0.000 |      1 0.000 | prime | 0.051
//  bands (n, actual, cap1, cap2): phi(q<=W^1/4): 21, 2712383, 21794012, 3165800 | semi: 80, 1075076, 12030962, 1747497 | prime(q>W^1/3): 1638, 916516, 14599569, 2121291
//  TOTAL: removed 4703975 of N=5301450 (survivors 597475); sum cap1 = 48424543 (9.13N); sum cap2 = 7034588 (1.3269N)
//  tail (prime regime) cap1 = 14599569; Rosser-Schoenfeld closed form <= 17310921; PNT-style 2ln2*W/lnW = 16088581; tail cap1/N = 2.75; tail cap2/N = 0.40
//  cap_infinity anchor (ALL freshness moduli = the march itself): sum = removed + sum(s) - sum(self) = 4703975 + 868 - 175 = 4704668 (0.8874N) — closure guaranteed at SOME finite K
//  cap_K ladder (sum over q):
//    K=0:7034588  K=1:6796706  K=2:6592965  K=3:6436012  K=4:6303925  K=5:6186041  K=6:6084448  K=7:5999327
//    K=8:5926606  K=9:5859338  K=10:5800625  K=11:5747526  K=12:5697881  K=13:5653721  K=14:5613056  K=15:5576367
//    K=16:5543630  K=23:5365430  K=24:5346778  K=25:5328900  K=26:5312453  K=27:5296609<N!  K=28:5281604<N!  K=29:5267491<N!
//    K=30:5253924<N!  K=31:5241040<N!  K=32:5228824<N!
//  minimal K closing the pigeonhole at @23: K* = 27  (sum 5296609 < N = 5301450; CERTIFIED survivors >= 4841)
//  gains per modulus near K*: Delta(25)=17878  Delta(26)=16447  Delta(27)=15844  Delta(28)=15005   (1st modulus gained 237882)
//
// ===== PART 2: the K*(x) curve and its growth =====
//  @11: scour length   10  K* =   0   K*/scour = 0.0000   phi-band pi(W^1/4)-pi(x) = 0
//  @13: scour length   34  K* =   0   K*/scour = 0.0000   phi-band pi(W^1/4)-pi(x) = 0
//  @17: scour length  120  K* =   2   K*/scour = 0.0167   phi-band pi(W^1/4)-pi(x) = 2   K*/phi-band = 1.00
//  @19: scour length  435  K* =  10   K*/scour = 0.0230   phi-band pi(W^1/4)-pi(x) = 8   K*/phi-band = 1.25
//  @23: scour length 1739  K* =  27   K*/scour = 0.0155   phi-band pi(W^1/4)-pi(x) = 21   K*/phi-band = 1.29
//  fit ln K* = a + b*x            (3 pts): b = 0.407 per unit x  (e^b = 1.50x per unit)  rms 0.343
//  fit ln K* = a + b*ln(scourlen) (3 pts): b = 0.970  => K* ~ (scour length)^0.97  rms 0.168
//  fit K*   = a + b*scourlen      (3 pts): b = 0.0147  a = 1.7  rms 1.39
//  pairwise power exponents (K* vs scour length): 17->19: 1.25; 19->23: 0.72
//  forecast: @29 phi-band = 51 primes; if K*/phi-band keeps its drift (1.00, 1.25, 1.29), K*(29) ~ 71
//
// ===== PART 3: anchored ratio S/E — approach to e^{2gamma}/4 = 0.79305 =====
//    x |   S/E   | 1/lnW   | Mertens u(y)   (u = prod_{2<p<=y}(1-2/p) * e^{2g} ln^2 y / 4C2)
//    7 | 1.1556 | 0.1870  | 0.7816
//   11 | 1.1458 | 0.1291  | 0.9083
//   13 | 1.0089 | 0.0970  | 0.9698
//   17 | 0.9549 | 0.0761  | 0.9871
//   19 | 0.9261 | 0.0622  | 0.9958
//   23 | 0.8930 | 0.0520  | 0.9983
//  --- all 6 points ---
//   R = c + b*1/lnW   : free c = 0.8031 (b=2.098, rms 0.0347) | pinned c=0.7931: b=2.180, rms 0.0350
//   R = c + b*1/ln^2 W: free c = 0.9144 (b=8.147, rms 0.0478) | pinned c=0.7931: b=13.560, rms 0.0947
//   R = c + b*(u(y)-1): free c = 0.9445 (b=-1.162, rms 0.0501) | pinned c=0.7931: b=-2.113, rms 0.1297
//  --- last 4 points ---
//   R = c + b*1/lnW   : free c = 0.7650 (b=2.517, rms 0.0029) | pinned c=0.7931: b=2.147, rms 0.0070
//   R = c + b*1/ln^2 W: free c = 0.8554 (b=16.608, rms 0.0054) | pinned c=0.7931: b=26.009, rms 0.0269
//   R = c + b*(u(y)-1): free c = 0.9004 (b=-3.708, rms 0.0093) | pinned c=0.7931: b=-8.482, rms 0.0730
//  successive drops in S/E: -0.0097  -0.1369  -0.0541  -0.0287  -0.0331
//  remaining gap to limit at @23: 0.1000 (28% of the @7 gap)
//  where the two live hypotheses separate (both fit @13..@23 to <0.007 rms):
//    forecast @29: free-limit fit (c=0.7650) R = 0.8764 vs pinned-0.7931 fit R = 0.8881   (spread 0.0117; S/E is exact, so one march decides)
//    forecast @31: free-limit fit (c=0.7650) R = 0.8617 vs pinned-0.7931 fit R = 0.8755   (spread 0.0138; S/E is exact, so one march decides)
//    [5.9s]
//
// done in 5.9s
// ============================================================================
// READINGS (2026-08-14)
//
// 1. K*(23) = 27, CERTIFIED SURVIVORS >= 4841. The history-blind refined
//    ladder closes the pigeonhole at @23 with the first 27 freshness moduli
//    (the scour primes 29..151): sum cap_27 = 5,296,609 < N = 5,301,450 —
//    an elementary per-prime-cap proof of >= 4841 twin pairs in the 23-tile,
//    obtained without locating a single strike (truth: 597,475). Margin at
//    closure is razor thin: 4841 = 0.09% of N. Comparability is guaranteed,
//    not assumed: this file's ladder reproduces natal-cap-08's sums
//    digit-for-digit at @17 (16135/14768, K*=2, floor 82) and @19
//    (308401/250573, K*=10, floor 1877) before touching @23.
//
// 2. THE K* CURVE IS TAMER THAN FEARED — LINEAR IN THE SCOUR, NOT EXPLOSIVE.
//    Five points: K* = 0, 0, 2, 10, 27 against scour lengths 10, 34, 120,
//    435, 1739. Power fit: K* ~ (scour length)^0.97 (rms 0.17 in ln) — i.e.
//    K* grows LINEARLY with pi(sqrt W), at about 1.5-2.3% of the scour
//    (0.0167, 0.0230, 0.0155 — not escalating). The pairwise exponent
//    DROPPED from 1.25 (17->19) to 0.72 (19->23), so the @19 reading
//    "escalation" was the small-number head, not the asymptote; the naive
//    exponential read (ln K* ~ 0.41x, 1.5x per unit x) is an artifact of
//    3 points and is contradicted by the deceleration. natal-cap-08's
//    reading 7 is hereby refined: the moduli list does NOT race toward
//    "becoming the march" — it stays a fixed small fraction of it.
//
// 3. NEW OBJECT — K* TRACKS THE QUARTER-POWER BAND. K* / (pi(W^1/4)-pi(x))
//    = 1.00, 1.25, 1.29 at @17/@19/@23: the freshness moduli needed for
//    closure are essentially THE PHI-BAND PRIMES (q <= W^(1/4); at @23 the
//    27 moduli run 29..151 vs W^(1/4) = 122). A clean testable forecast:
//    @29 has a 51-prime phi-band, so K*(29) ~ 70 if the drift holds. If the
//    ratio saturates near ~1.3, "closure depth = quarter-power depth" is a
//    conjecturable law of the wall — pleasingly dual to the staircase itself
//    (whose regimes also switch at W^(1/4) and W^(1/3)).
//
// 4. WHAT K* BUYS IS COLLAPSING EVEN AS ITS PRICE STAYS LINEAR. Certified
//    floor / true survivors = 0.76, 0.36, 0.026, 0.049, 0.0081 at
//    @11..@23. The wall does not show up as K* exploding (it doesn't); it
//    shows up as certificate EFFICIENCY dying — each closure is a hair's
//    breadth (0.09% of N here), catching a vanishing sliver of the real
//    survivor mass. Gains per modulus at @23: 237,882 for the 1st, 15,844
//    for the 27th — still 3x the closing margin, so closure is not yet
//    scraping the bottom of the ladder; cap_infinity = 0.8874N confirms
//    the full freshness system would land at removed + (s - self), i.e.
//    the ladder's limit IS the march, with room to spare.
//
// 5. S(23) = 597,475, EVERY SURVIVOR A GENUINE TWIN PAIR — verified
//    exhaustively (full Eratosthenes cross-sieve to W+1, zero failures; not
//    a spot-check). The twin ledger closes to the integer: twins in houses
//    11/17 with r > 23 = 597,650 = S + 175 self-strikes — reconfirming at
//    scale that a self-strike IS a twin found (175 of them, (29,31) up to
//    the frontier). Bonus: house 29 holds 298,408 twins, and 597,650 /
//    298,408 = 2.0027 — the three houses' equal thirds, visible in the
//    finished tile. Practical note: at W = 223M no bitset was needed
//    (flat Uint8Array, 223 MB); the whole file runs in 5 seconds, so @29
//    (6.47 G) is a segmented-march job, not a supercomputer job.
//
// 6. THE ANCHORED DRIFT CONTINUES ON TREND: S/E = 1.1556, 1.1458, 1.0089,
//    0.9549, 0.9261, 0.8930. The @23 drop (-0.0331) is consistent with the
//    1/lnW cadence; gap to the predicted limit e^{2gamma}/4 = 0.793055 is
//    now 0.1000 (28% of the @7 gap remains). Of the three fitted forms the
//    1/lnW approach wins decisively (last-4 rms 0.0029 vs 0.0054 for
//    1/ln^2 W and 0.0093 for the finite-Mertens form).
//
// 7. HONEST CALIBRATION — THE DATA DOES NOT DISCRIMINATE THE LIMIT YET.
//    The free-intercept 1/lnW fit puts the limit at 0.765 (last 4 points)
//    or 0.803 (all 6); pinning 0.7931 costs only 2.4x in rms (0.0070, still
//    small). The local slope dR/d(1/lnW) is STEEPENING (2.1 -> 3.2 across
//    the last two steps), which is what drags the free intercept below the
//    predicted limit — but neglected O(1/ln^2 W) terms are ~0.045 here,
//    larger than every residual. Verdict: fully consistent with 0.793055,
//    equally consistent with any limit in roughly [0.74, 0.82]. The
//    discriminator is cheap and sharp: S/E is EXACT (no sampling noise),
//    and the two live fits separate by 0.0117 at @29 and 0.0138 at @31 —
//    one more march decides which curve we are on. Also corrected: the
//    campaign memo's "0.79325" is a rounding slip; e^{2gamma}/4 = 0.793055.
//
// 8. MERTENS CONTEXT, CONFIRMED AT SCALE: sum_scour 2/q = 2.053 at @23 —
//    the Scour's raw strike capacity is now 2.05x the census, and the tile
//    still keeps 11.3% of N alive: overlap credit (strikes on the already
//    dead) has grown to absorbing HALF of all strike capacity. The
//    first-order union bound is dead forever (as priced by attacks 1-10);
//    the freshness ladder above is exactly what "pricing the overlap of the
//    head primes" looks like in certificate form.
//
// 9. NEXT: @29 (W = 6,469,693,230). One segmented bit-packed march (~810 MB
//    as a bitset, or 16 segments of 405 MB flat) answers BOTH open reads at
//    once: K*(29) ~ 70? (phi-band law, reading 3) and S/E = 0.876 vs 0.888
//    (limit discrimination, reading 7). Estimated minutes, not hours.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed.
//
// DEFINITION constants, computed not measured: e^{2*gamma}/4 = 0.793055, which
//   is the correct six-place rounding of 0.7930547395 (recomputed 2026-08-20).
//   The reading's own note that the campaign memo's 0.79325 is a rounding slip
//   stands, and 0.79325 appears here only as the value being corrected.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.168 -> 0.17, 0.0478 -> 0.049, and the fit slope 0.398/0.421 -> 0.41.
//   The band [0.74, 0.82] is a stated interval, not a measured pair.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   14768 and the @17 custody pair 16135/14768 are in
//   research/natal-cap-08-staircase.js, research/natal-cap-18-at29.js and
//   research/natal-cap-24-boundK-curve.js; 2.0027 is in
//   research/attack-hm-basis.js. Both are quoted here as reproductions.
//
// DERIVED IN THIS READING: the memory estimates 810 MB, 405 MB and 6.47 G,
//   from the printed W = 6,469,693,230 (which is 29#, and is carried in the
//   code above the banner); the 11.3% of N still alive; the sum cap_27 =
//   5,296,609 comparison against N = 5,301,450.
//
// TOKENIZER ARTIFACT, not a figure: the twin "(29,31)" and the scour-prime
//   range "29..151" read as single numbers.
// ---------------------------------------------------------------------------
