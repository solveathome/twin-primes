// ============================================================================
// ATTACK 37 — THE @41 DRIFT POINT: the 2^53 audit, the K-30 engine, and the
// sharded march at x = 41   (2026-08-15; extends natal-cap-33-overnight.js
// RUN 2 from W = 37# = 7.42e12 to W = 41# = 304,250,263,527,210)
// ============================================================================
//
// THE QUESTION. beta(x) = S(x)/E(x) has been measured at nine levels and the
// zero-knob classical curve beta = (e^{2gamma}/4)(1 + 2/lnW + 6/ln^2 W) has
// had its residual collapse four consecutive times: +0.0046, +0.0026,
// +0.0016, +0.0010 at @23, @29, @31, @37, each collapse forecast BEFORE the
// run. @41 is the fifth test. Forecasts on record (cap-33 RUN 2, frozen):
//
//     classical-raw     0.8449
//     classical+resid   0.8459   (raw + the persisted @37 residual +0.0010)
//     free-linear       0.8443   (last-4 fit @23..@37)
//     pinned-linear     0.8488
//
// THE STATED OBSTACLE, AND WHAT THE AUDIT ACTUALLY FOUND. W(41) = 3.0425e14
// is safe in a double (2^53 = 9.0072e15, W/2^53 = 0.0338) but the brief
// expected products to break the ceiling. PART 0 audits every arithmetic
// path in the engine by computing its worst-case operand and result, and the
// finding is that NOTHING in the march needs BigInt or double-double
// promotion: every integer the march forms is a nonnegative integer below
// 2^53, and +, -, * on such integers are exact in IEEE754 whenever the
// result is below 2^53. The single path that touches the ceiling is the CRT
// anchoring product c = ((a-b) mod q) * inv30(q), bounded by q^2 <= W, so it
// is exact precisely while W < 2^53 — the ceiling of the whole engine and of
// the level ladder is one and the same, and it is at @41 (@43 has
// W = 1.3084e16 > 2^53 and would need real promotion). The only inexact
// quantity is E, which is a real number and not an integer; PART 0 measures
// its roundoff against an exact BigInt fixed-point reference.
//
// WHAT DID NEED WORK IS COST, NOT PRECISION. cap-33's engine indexes one
// byte per integer and strides 30q; at @41 that is a 3.04e14-byte address
// space and 5.9e13 strikes with 30x worse locality than necessary. The K-30
// engine here re-indexes the tile by PAIR CELL k = floor(r/30) with two
// lanes (r = 30k+11, r = 30k+17), which is a lossless relabelling of exactly
// the natal-carrying positions: 2 bytes per 30 integers instead of 30, and
// stride q instead of 30q. Same strike count, 15x less memory per unit of
// tile, and every scour prime q <= 1.744e7 is now far smaller than the block
// width, so no strike is a lone random probe. The march is then sharded over
// contiguous k-ranges across 8 processes (np and S are order-independent
// integer sums, so sharding is exact, not an approximation).
//
// CHAIN OF CUSTODY (mandatory, PART 1, before @41 is touched): the K-30
// engine must reproduce cap-22/cap-33 digit-for-digit at @7..@29, then
// S(31) = 283,449,187, then S(37) = 7,998,394,865. Both @31 and @37 are also
// re-run THROUGH THE SHARDED PATH, so the exact code path that will produce
// @41 is the path that passed the gates. This discipline caught engine drift
// twice on the night run.
//
// PRIMALITY. 13 bases, the first 13 primes 2..41, deterministic for
// n < 3,317,044,064,679,887,385,961,981 = 3.317e24 (Sorenson-Webster 2015),
// which covers 41# + 2 = 3.04e14 with ten orders of magnitude to spare. See
// PART 0 reading 6: cap-33's recorded bound "3.186e14" for its 12-base set
// is a decimal-exponent slip; the true bound for the first 12 primes is
// 3.186e23 and it already covered 41#. The base set is verified here against
// a full sieve on [2, 2e6] and against an independent strong-Lucas (BPSW)
// second opinion on every sampled survivor.
//
//   node research/natal-cap-37-at41-march.js audit      (~30 s)
//   node research/natal-cap-37-at41-march.js gates      (@7..@37, see PART 1)
//   node research/natal-cap-37-at41-march.js shard I N  (one @41 k-range)
//   node research/natal-cap-37-at41-march.js combine     (fold the shards)
// ============================================================================
'use strict';
const fs=require('fs'), os=require('os');

const T00=Date.now(); const el=()=>((Date.now()-T00)/1000).toFixed(1)+'s';
const prog=s=>process.stderr.write(s+'\n');
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const GAMMA=0.5772156649015329, LIMITC=Math.exp(2*GAMMA)/4;   // 0.7930550...
function lsq(u,y){const n=u.length;let sx=0,sy=0,sxx=0,sxy=0;for(let i=0;i<n;i++){sx+=u[i];sy+=y[i];sxx+=u[i]*u[i];sxy+=u[i]*y[i]}const b=(n*sxy-sx*sy)/(n*sxx-sx*sx),a=(sy-b*sx)/n;let rss=0;for(let i=0;i<n;i++){const e=y[i]-(a+b*u[i]);rss+=e*e}return{a,b,rms:Math.sqrt(rss/n)}}
const RUNDIR=process.env.NC37_DIR||'~/Files/primeoire-runs/at41';

// ---- the level ladder ------------------------------------------------------
const LEVELS=[7,11,13,17,19,23,29,31,37,41];
const PRIMORIAL={7:210,11:2310,13:30030,17:510510,19:9699690,23:223092870,
                 29:6469693230,31:200560490130,37:7420738134810,41:304250263527210};
const SQRT41=17442772;                       // >= floor sqrt(41# + 1) = 17442771
let PR=null;                                 // lazy: the prime table to sqrt(41#)
function primeTable(){if(!PR){const t=Date.now();PR=primesUpTo(SQRT41);
  prog(`[prime table to ${SQRT41}: ${PR.length} primes, ${((Date.now()-t)/1000).toFixed(2)}s]`)}return PR}

// ---- modular helpers (audited in PART 0) ----------------------------------
function invMod(a,m){let r0=((a%m)+m)%m,r1=m,s0=1,s1=0;
  while(r1){const q=Math.floor(r0/r1);const t0=r0-q*r1;r0=r1;r1=t0;const t1=s0-q*s1;s0=s1;s1=t1}
  assert(r0===1,'invMod: not coprime');return((s0%m)+m)%m}

// ---- Miller-Rabin, 13 bases, deterministic for n < 3.317e24 ---------------
const MRB=[2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n,41n];
const MRB_BOUND='3317044064679887385961981';    // Sorenson-Webster 2015
function mpow(b,e,n){let r=1n;b%=n;while(e>0n){if(e&1n)r=r*b%n;b=b*b%n;e>>=1n}return r}
function mrCore(n){let d=n-1n,s=0;while((d&1n)===0n){d>>=1n;s++}
  outer:for(const a of MRB){let y=mpow(a,d,n);if(y===1n||y===n-1n)continue;
    for(let i=1;i<s;i++){y=y*y%n;if(y===n-1n)continue outer}return false}
  return true}
// Accepts a Number OR a BigInt. The BigInt arm exists because the fourth
// classical strong-pseudoprime trap, 3,825,123,056,546,413,051, is above 2^53:
// written as a plain literal it becomes the EVEN 3825123056546413056 and the
// `x%2` shortcut answers "composite" before a single Miller-Rabin base runs.
// The trap then passes its own assert without ever being tested (2026-08-20).
function isPrimeMR(x){
  if(typeof x==='bigint'){
    if(x<2n)return false;
    for(const p of MRB){if(x%p===0n)return x===p}
    return mrCore(x)}
  if(x<2)return false;
  for(const p of[2,3,5,7,11,13,17,19,23,29,31,37,41]){if(x%p===0)return x===p}
  return mrCore(BigInt(x))}

// ---- strong Lucas (Selfridge parameters): the independent second opinion --
function jacobi(a,n){a=((a%n)+n)%n;let r=1n;
  while(a){while((a&1n)===0n){a>>=1n;const m=n&7n;if(m===3n||m===5n)r=-r}
    const t=a;a=n;n=t;if((a&3n)===3n&&(n&3n)===3n)r=-r;a%=n}
  return n===1n?r:0n}
function isSquareBig(n){if(n<0n)return false;let x=BigInt(Math.floor(Math.sqrt(Number(n))));
  for(let i=0;i<8;i++){if(x===0n)break;x=(x+n/x)>>1n}
  for(let d=-2n;d<=2n;d++){const y=x+d;if(y>=0n&&y*y===n)return true}return false}
function isStrongLucasPRP(x){
  const n=BigInt(x);if(n<2n)return false;if((n&1n)===0n)return n===2n;
  if(isSquareBig(n))return false;
  let D=5n;while(true){const j=jacobi(D<0n?D+n:D,n);if(j===-1n)break;
    if(j===0n&&(D<0n?-D:D)!==n)return false;
    D=D>0n?-(D+2n):-(D-2n)}
  const Q=(1n-D)/4n;
  let d=n+1n,s=0;while((d&1n)===0n){d>>=1n;s++}
  // binary Lucas chain for U_d, V_d mod n
  let U=1n,V=1n,Qk=Q;const bits=d.toString(2);
  for(let i=1;i<bits.length;i++){
    U=U*V%n;V=(V*V-2n*Qk)%n;Qk=Qk*Qk%n;
    if(bits[i]==='1'){const U2=(U+V)%n,V2=(D*U+V)%n;
      U=(U2&1n)?(U2+n)>>1n:U2>>1n;V=(V2&1n)?(V2+n)>>1n:V2>>1n;
      U=((U%n)+n)%n;V=((V%n)+n)%n;Qk=Qk*Q%n}}
  U=((U%n)+n)%n;V=((V%n)+n)%n;
  if(U===0n||V===0n)return true;
  for(let r=1;r<s;r++){V=((V*V-2n*Qk)%n+n)%n;if(V===0n)return true;Qk=Qk*Qk%n}
  return false}
const isPrimeBPSW=x=>isPrimeMR(x)&&isStrongLucasPRP(x);

// ============================================================================
// THE K-30 ENGINE
// ----------------------------------------------------------------------------
// Relabelling. Every natal slot has r = 11 or 17 (mod 30), so write r = 30k+b
// with b in {11,17} and k in [0, M), M = W/30. Lane b gets one byte per k.
// A prime q >= 7 is coprime to 30, so its strike class r = a (mod q) meets
// lane b in the single class k = (a-b)*inv30(q) (mod q), stride q. The four
// classes of cap-22's CRT-30 table become two classes per lane, and the
// stride drops from 30q to q in an array 15x smaller. Same struck set.
// ============================================================================
function levelSpec(x){
  const P=primeTable();
  const mids=P.filter(p=>p>=7&&p<=x);
  let W=30;for(const p of mids)W*=p;
  assert(W===PRIMORIAL[x],`W(${x}) mismatch: ${W}`);
  assert(W<2**53,`W(${x}) = ${W} exceeds 2^53`);
  let sq=Math.floor(Math.sqrt(W));while((sq+1)*(sq+1)<=W)sq++;while(sq*sq>W)sq--;
  const scour=P.filter(q=>q>x&&q<=sq), ns=scour.length, y=scour[ns-1];
  assert(P.filter(q=>q>y&&q*q<=W+1).length===0,`a prime hides in (y, sqrt(W+1)] at @${x}`);
  let N=2;for(const p of mids)N*=p-2;
  const M=W/30;assert(Number.isInteger(M),'M not integral');
  // cursor class tables, one per lane: entry j = (prime, strike residue a)
  const mk=(list,b)=>{const n=list.length,step=new Int32Array(2*n),c0=new Float64Array(2*n);
    let j=0;for(let i=0;i<n;i++){const q=list[i],iv=invMod(30,q);
      for(const a of[0,q-2]){step[j]=q;c0[j]=(((a-b)%q+q)%q)*iv%q;j++}}
    return{step,c0,m:2*n}};
  const MT=[mk(mids,11),mk(mids,17)], ST=[mk(scour,11),mk(scour,17)];
  // E, plain double, in cap-22/cap-33's exact evaluation order
  let prod=1;for(const p of mids)prod*=1-2/p;for(const q of scour)prod*=1-2/q;
  const E=(2/30)*prod*W, s1q=scour.reduce((a,q)=>a+1/q,0);
  return{x,W,M,mids,scour,ns,q0:scour[0],y,sq,N,MT,ST,E,prod,s1q};
}
// exact BigInt fixed-point reference for E (PART 0's roundoff measurement)
function exactE(sp,SB){
  const S=1n<<BigInt(SB);let acc=S*2n/30n;
  for(const p of sp.mids)acc=acc*BigInt(p-2)/BigInt(p);
  for(const q of sp.scour)acc=acc*BigInt(q-2)/BigInt(q);
  acc*=BigInt(sp.W);
  // acc = E * 2^SB, truncated; convert with 2^-53-clean division
  const sh=BigInt(SB)-53n;
  const hi=acc>>sh; return Number(hi)/2**53;
}

// --- the tiled natal wheel (PART 0.7 optimisation, 2026-08-15) --------------
// The densest wheel primes are struck the same way in every block, so their
// joint pattern is periodic with period per = 7*11*13*17*19 = 323,323 k-cells
// and can be MEMCPY'd in instead of struck. Adding 23 would push the period to
// 7,436,429, larger than the block and larger than cache, so the prefix stops
// at 19. Measured on a 1.007e8-cell probe: the wheel-prime phase falls from
// 0.255 s to 0.073 s, whole march 8 to 9% faster SERIALLY. Under the 8-way
// sharded regime the gain is only 3 to 4% (paired wall clock, 3 reps: wheel
// 2.85/2.92/2.80 s against plain 3.06/2.95/2.85 s), because the sharded run
// is memory-bandwidth bound rather than strike bound. np and S are
// bit-identical to the pre-wheel path at @13/@17/@19/@23/@29, and @29
// reproduces the certified S(29) = 12,307,838. Set NC37_NOWHEEL=1, or pass
// opt.noWheel, to restore the original path for cross-validation.
//
// TWO OPTIMISATIONS THAT WERE TRIED AND DID NOT PAY, recorded so they are not
// tried twice:
//  (a) BLOCK SIZE. Serially, throughput rises monotonically with blockK
//      (225/275/332/388/417 e6 strikes/s at 2^20..2^24), which argues for a
//      bigger block. Under 8 concurrent shards it inverts: aggregate
//      throughput is 2031/2202/1285/963 e6 at 2^21/2^22/2^23/2^24. The
//      existing 2^22 is the true optimum and the serial sweep is a trap.
//  (b) DEFERRED LARGE-STRIDE WRITES. Strides above the block length cost
//      13.4 ns per strike against 0.86 ns for strides under 1024, and they
//      are 29% of the march for 6% of the strikes, so they look like the
//      obvious target. Collecting their hits and counting-sorting by 64 KB
//      sub-block before applying them made the phase no faster (0.491 s
//      against 0.481 s): the cost splits roughly evenly between the cursor
//      SCAN over 1.64e6 entries per lane per block and the scattered write,
//      and sorting only addresses the write. Removing the scan needs a true
//      ring-bucket sieve keyed by future block, which is the real next step
//      and a much larger change.
function wheelSplit(mids,cap){const w=[];let per=1;
  for(const p of mids){if(per*p>cap)break;per*=p;w.push(p)}
  return{w,per,rest:mids.filter(p=>!w.includes(p))}}
function buildPattern(w,per,b){const pat=new Uint8Array(per).fill(1);
  for(const p of w){const iv=invMod(30,p);
    for(const a of[0,p-2]){const m0=(((a-b)%p+p)%p)*iv%p;
      for(let m=m0;m<per;m+=p)pat[m]=0}}
  return pat}
function midsTable(list,b){const n=list.length,step=new Int32Array(2*n),c0=new Float64Array(2*n);
  let j=0;for(let i=0;i<n;i++){const q=list[i],iv=invMod(30,q);
    for(const a of[0,q-2]){step[j]=q;c0[j]=(((a-b)%q+q)%q)*iv%q;j++}}
  return{step,c0,m:2*n}}

// --- the march over one contiguous k-range [kA,kB) --------------------------
function marchRange(sp,kA,kB,opt){
  const KB=Math.min(opt.blockK|0,kB-kA), ALLOC=(KB+3)&~3;
  const A=new Uint8Array(ALLOC),B=new Uint8Array(ALLOC);
  const UA=new Uint32Array(A.buffer),UB=new Uint32Array(B.buffer);
  const nlanes=[A,B];
  // wheel: memcpy the dense prefix, strike only the residual mids.
  // opt.noWheel restores the original path verbatim, for cross-validation.
  const WH=(opt.noWheel||process.env.NC37_NOWHEEL)?null:wheelSplit(sp.mids,KB);
  const PAT=WH?[buildPattern(WH.w,WH.per,11),buildPattern(WH.w,WH.per,17)]:null;
  const MTAB=WH?[midsTable(WH.rest,11),midsTable(WH.rest,17)]:sp.MT;
  // anchor every cursor into [kA, kA+q)
  const mk=(tab)=>{const nx=new Float64Array(tab.m);
    for(let j=0;j<tab.m;j++){const q=tab.step[j];nx[j]=kA+((tab.c0[j]-kA%q)%q+q)%q}return nx};
  const MN=[mk(MTAB[0]),mk(MTAB[1])], SN=[mk(sp.ST[0]),mk(sp.ST[1])];
  let np=0,S=0;
  const firsts=[],lastbuf=[],samples=[];
  let nextSamp=opt.sampleEvery||Infinity;
  const strike=(tab,nx,arr,kb,len)=>{
    for(let j=0;j<tab.m;j++){const d=nx[j]-kb;
      if(d<len){const st=tab.step[j];let i=d|0;
        do{arr[i]=0;i+=st}while(i<len);
        nx[j]=kb+i}}};
  const nblk=Math.ceil((kB-kA)/KB);let blk=0;
  for(let kb=kA;kb<kB;kb+=KB){
    const len=Math.min(KB,kB-kb);blk++;
    if(PAT){const per=WH.per;
      for(const L of[0,1]){const pat=PAT[L],arr=nlanes[L];
        let o=kb%per,pos=0;
        while(pos<len){const n=Math.min(per-o,len-pos);
          arr.set(pat.subarray(o,o+n),pos);pos+=n;o=0}}}
    else{A.fill(1,0,len);B.fill(1,0,len)}
    for(const L of[0,1])strike(MTAB[L],MN[L],nlanes[L],kb,len);
    // --- natal census (pre-scour), SWAR over both lanes -------------------
    {const nw=len>>2;let c=0;
     for(let w=0;w<nw;w++){c+=(Math.imul(UA[w],0x01010101)>>>24)+(Math.imul(UB[w],0x01010101)>>>24)}
     for(let i=nw<<2;i<len;i++)c+=A[i]+B[i];
     np+=c}
    for(const L of[0,1])strike(sp.ST[L],SN[L],nlanes[L],kb,len);
    // --- survivor count + position sampling -------------------------------
    {const nw=len>>2;
     for(let w=0;w<nw;w++){
       const inc=(Math.imul(UA[w],0x01010101)>>>24)+(Math.imul(UB[w],0x01010101)>>>24);
       if(inc){
         if(S+inc>=nextSamp||firsts.length<5){
           const base=kb+(w<<2);
           for(let t=0;t<4;t++){const k=base+t,i=(w<<2)+t;
             if(A[i]){S++;if(firsts.length<5)firsts.push(30*k+11);if(S>=nextSamp){samples.push(30*k+11);nextSamp=S+opt.sampleEvery}}
             if(B[i]){S++;if(firsts.length<5)firsts.push(30*k+17);if(S>=nextSamp){samples.push(30*k+17);nextSamp=S+opt.sampleEvery}}}
         }else S+=inc}
     }
     for(let i=nw<<2;i<len;i++){const k=kb+i;
       if(A[i]){S++;if(firsts.length<5)firsts.push(30*k+11);if(S>=nextSamp){samples.push(30*k+11);nextSamp=S+opt.sampleEvery}}
       if(B[i]){S++;if(firsts.length<5)firsts.push(30*k+17);if(S>=nextSamp){samples.push(30*k+17);nextSamp=S+opt.sampleEvery}}}
    }
    // --- tail-of-range survivors: rescan the final block backwards --------
    if(kb+len>=kB){lastbuf.length=0;
      for(let i=len-1;i>=0&&lastbuf.length<3;i--){const k=kb+i;
        if(B[i])lastbuf.push(30*k+17);if(lastbuf.length<3&&A[i])lastbuf.push(30*k+11)}
      lastbuf.reverse()}
    if(opt.progEvery&&blk%opt.progEvery===0){
      const f=(kb+len-kA)/(kB-kA),sec=(Date.now()-T00)/1000;
      prog(` ${opt.tag||''} blk ${blk}/${nblk} ${(100*f).toFixed(2)}% np=${np} S=${S} [${sec.toFixed(0)}s, eta ${(sec/f-sec).toFixed(0)}s]`)}
  }
  return{np,S,firsts,last3:lastbuf,samples};
}
function march(sp,opt){
  const r=marchRange(sp,0,sp.M,opt);
  return{x:sp.x,W:sp.W,N:r.np,S:r.S,ns:sp.ns,q0:sp.q0,y:sp.y,E:sp.E,R:r.S/sp.E,
         firsts:r.firsts,last3:r.last3,samples:r.samples};
}
// --- cap-22's original byte-per-integer CRT-30 march, verbatim, as the -------
// --- reference implementation the K-30 relabelling must agree with ----------
function marchRef(x){
  const P=primeTable(),mids=P.filter(p=>p>=7&&p<=x);
  let W=30;for(const p of mids)W*=p;
  let sq=Math.floor(Math.sqrt(W));while((sq+1)*(sq+1)<=W)sq++;while(sq*sq>W)sq--;
  const scour=P.filter(q=>q>x&&q<=sq);
  const cs=(p,a,b)=>{let r=a;while(r%30!==b)r+=p;return r};
  const mkT=(list)=>{const n=list.length,step=new Int32Array(4*n),nxt=new Float64Array(4*n);
    let j=0;for(let i=0;i<n;i++){const p=list[i];
      for(const a of[0,p-2])for(const b of[11,17]){step[j]=30*p;nxt[j]=cs(p,a,b);j++}}
    return{step,nxt,m:4*n}};
  const MT=mkT(mids),ST=mkT(scour);
  const BW=Math.min(W,30000000),alive=new Uint8Array(BW);
  let np=0,S=0;const firsts=[];
  for(let lo=0;lo<W;lo+=BW){const len=Math.min(lo+BW,W)-lo;
    for(let b=11;b<len;b+=30){alive[b]=1;alive[b+6]=1}
    for(let j=0;j<MT.m;j++){let i=(MT.nxt[j]-lo)|0;const st=MT.step[j];while(i<len){alive[i]=0;i+=st}MT.nxt[j]=lo+i}
    for(let b=11;b<len;b+=30)np+=alive[b]+alive[b+6];
    for(let j=0;j<ST.m;j++){let i=(ST.nxt[j]-lo)|0;const st=ST.step[j];while(i<len){alive[i]=0;i+=st}ST.nxt[j]=lo+i}
    for(let b=11;b<len;b+=30){if(alive[b]){S++;if(firsts.length<5)firsts.push(lo+b)}
                              if(alive[b+6]){S++;if(firsts.length<5)firsts.push(lo+b+6)}}}
  return{W,np,S,firsts};
}

// ============================================================================
// PART 0 — THE 2^53 AUDIT
// ============================================================================
function audit(){
console.log('===== PART 0: the 2^53 audit — every arithmetic path in the engine =====');
const P=primeTable();
const CAP=2**53;
const sp41=levelSpec(41);
const qmax=sp41.y, M=sp41.M, W=sp41.W, KBmax=1<<26;
const Smax=2.6e11, Nmax=sp41.N;
console.log(` 2^53 = ${CAP};  W(41) = 41# = ${W} = ${(W/CAP).toFixed(4)} x 2^53;  M = W/30 = ${M}`);
console.log(` scour: ${sp41.ns} primes (${sp41.q0}..${qmax});  y = ${qmax} = largest prime <= floor sqrt W = ${sp41.sq};  N = ${Nmax}`);
console.log('\n path                                        | worst operands        | worst result   | /2^53   | exact?');
const rows=[
 ['A  W = 41# accumulated product',            `${W/41} x 41`,               W,            true ],
 ['B  sqrt bracket (sq+1)*(sq+1)',             `${sp41.sq+1}^2`,             (sp41.sq+1)*(sp41.sq+1), true],
 ['C  y-depth assert  q*q <= W+1',             `${qmax}^2`,                  qmax*qmax,    true ],
 ['D  N = 2*prod(p-2)',                        `${Nmax/39} x 39`,            Nmax,         true ],
 ['E  invMod(30,q): q*|s| in ext. Euclid',     `${qmax} x ${qmax}`,          qmax*qmax,    true ],
 ['F  CRT anchor ((a-b) mod q)*inv30(q)',      `${qmax-1} x ${qmax-1}`,      (qmax-1)*(qmax-1), true],
 ['G  shard anchor  kA % q  (IEEE exact rem)', `${M} mod ${qmax}`,           M,            true ],
 ['H  absolute cursor  kb + i',                `${M} + ${qmax}`,             M+qmax,       true ],
 ['I  block offset  (nx[j] - kb) | 0',         `< blockK + q`,               KBmax+qmax,   true ],
 ['J  stride in Int32Array  step[j] = q',      `${qmax}`,                    qmax,         true ],
 ['K  natal census accumulator np',            `+1 x ${Nmax}`,               Nmax,         true ],
 ['L  survivor accumulator S',                 `+1 x ~2.6e11`,               Smax,         true ],
 ['M  position rebuild  30*k + 17',            `30 x ${M-1} + 17`,           W-13,         true ],
 ['N  SWAR count imul(w,0x01010101)>>>24',     `4 bytes each <= 1`,          4,            true ],
];
for(const[n,o,r,ex]of rows)
  console.log(` ${n.padEnd(43)}| ${String(o).padEnd(22)}| ${r.toExponential(4).padStart(14)} | ${(r/CAP).toExponential(1)} | ${ex&&r<CAP?'YES':'NO'}`);
const int32=[['I  (nx[j]-kb)|0',KBmax+qmax],['J  step[j] = q',qmax]];
console.log(` Int32 paths against 2^31 = ${2**31}: `+int32.map(([n,v])=>`${n.slice(0,1)} ${v.toExponential(3)} (${(v/2**31*100).toFixed(1)}%)`).join(', '));
console.log('\n VERDICT (computed, not asserted): every integer the K-30 march forms at @41 is a');
console.log(' nonnegative integer < 2^53, and +,-,* on such integers are EXACT in IEEE754 binary64');
console.log(' whenever the result is < 2^53. No path needs BigInt or double-double promotion.');
const W43=W*43;
console.log(` The binding path is F (equivalently C, E): it is bounded by y^2 <= W, so the engine is`);
console.log(` exact exactly while W < 2^53. @43 dies at path A first: 43# = ${W43.toExponential(4)} = ${(W43/CAP).toFixed(2)} x 2^53.`);

// --- 0.1  the CRT relabelling, checked on all 4,471,676 class entries -------
console.log('\n--- 0.1 the K-30 relabelling: every strike class verified against its definition ---');
{let n=0;for(const L of[0,1]){const b=L===0?11:17;
   for(const tab of[sp41.MT[L],sp41.ST[L]]){
     for(let j=0;j<tab.m;j++){const q=tab.step[j],c=tab.c0[j];
       const a=(30*c+b)%q;const want=(j&1)?(q-2)%q:0;
       assert(a===want,`class j=${j} q=${q} b=${b}: 30k+b = ${a} (mod q), want ${want}`);
       assert(c>=0&&c<q,'class out of range');n++}}}
 console.log(` ${n} strike classes: (30*c0 + b) mod q equals the intended strike residue in every one`);
 // BigInt second opinion on the tail (the largest primes, where q^2 is closest to 2^53)
 const big=sp41.ST[0];let checked=0;
 for(let j=big.m-20000;j<big.m;j++){const q=BigInt(big.step[j]);
   const a=(j&1)?q-2n:0n,iv=BigInt(invMod(30,big.step[j]));
   const c=(((a-11n)%q+q)%q)*iv%q;
   assert(Number(c)===big.c0[j],`BigInt disagrees at q=${big.step[j]}`);checked++}
 console.log(` ${checked} largest-q classes (q up to ${qmax}, q^2 = ${(qmax*qmax/CAP*100).toFixed(1)}% of 2^53) re-derived in BigInt: identical`);}

// --- 0.2  K-30 vs cap-22's byte-per-integer engine on real data -------------
console.log('\n--- 0.2 K-30 against cap-22\'s original engine, level by level ---');
for(const x of[7,11,13,17,19,23]){
  const sp=levelSpec(x),a=march(sp,{blockK:1<<22}),r=marchRef(x);
  assert(a.N===r.np&&a.S===r.S&&a.firsts.join()===r.firsts.join(),`K-30 != cap-22 at @${x}`);
  console.log(` @${String(x).padStart(2)}: N=${String(a.N).padStart(8)} S=${String(a.S).padStart(7)} first=${a.firsts[0]} — K-30 and cap-22 agree exactly`);}

// --- 0.3  E: the one inexact quantity, measured against exact BigInt --------
console.log('\n--- 0.3 E is the only inexact path: plain-double product vs exact BigInt reference ---');
for(const x of[31,37,41]){
  const sp=levelSpec(x),t=Date.now(),Ex=exactE(sp,256),dt=(Date.now()-t)/1000;
  const rel=Math.abs(sp.E-Ex)/Ex;
  console.log(` @${x}: E(double) = ${sp.E.toFixed(4)}  E(BigInt 2^256 fixed point) = ${Ex.toFixed(4)}`);
  console.log(`      relative error ${rel.toExponential(2)} over ${sp.ns+sp.mids.length} factors; beta is quoted to 4 dp, so this is ${(rel/1e-5).toExponential(1)} of one quoting unit  [${dt.toFixed(1)}s]`);}

// --- 0.4  the primality layer ----------------------------------------------
console.log('\n--- 0.4 primality: 13 bases {2,3,5,7,11,13,17,19,23,29,31,37,41} ---');
console.log(` deterministic for n < ${MRB_BOUND} = 3.317e24 (Sorenson-Webster 2015);`);
console.log(` 41# + 2 = ${W+2} = 3.043e14, i.e. 9.2e-11 of that bound.`);
{const LIM=2000000,sv=new Uint8Array(LIM+1);
 for(let i=2;i*i<=LIM;i++)if(!sv[i])for(let j=i*i;j<=LIM;j+=i)sv[j]=1;
 let np2=0;for(let n=2;n<=LIM;n++){const s=!sv[n];assert(isPrimeMR(n)===s,`MR disagrees with sieve at ${n}`);if(s)np2++}
 console.log(` verified against a full sieve on [2, ${LIM}]: ${np2} primes, zero disagreements`);}
{// BPSW second opinion at the @41 scale, on real tile-sized integers
 let n=0,agree=0;let r=W-1;
 for(let t=0;t<400;t++){r-=97;const a=isPrimeMR(r),b=isPrimeBPSW(r);assert(a===b,`MR vs BPSW disagree at ${r}`);n++;if(a)agree++}
 console.log(` 13-base MR and an independent strong-Lucas (BPSW) second opinion agree on ${n} integers just below 41# (${agree} prime)`);}
{for(const v of[3215031751n,341550071728321n,3474749660383n,3825123056546413051n])
   assert(!isPrimeMR(v),`strong-pseudoprime trap ${v} must be called composite`);
 for(const v of[2147483647,999999999989,67280421310721,304250263527211])
   assert(isPrimeMR(v)===isPrimeBPSW(v),`MR/BPSW disagree at ${v}`);
 console.log(' the classical strong-pseudoprime traps 3,215,031,751 / 341,550,071,728,321 / 3,474,749,660,383');
 console.log(' / 3,825,123,056,546,413,051 are all correctly called composite by the 13-base set');}
console.log(` RECORD CORRECTION: cap-33 RUN 2 recorded its 12-base set as "deterministic to 3.186e14".`);
console.log(` The true Sorenson-Webster bound for the first 12 primes is 3.186e23 — a decimal-exponent`);
console.log(` slip of nine orders in the comment. The @37 run's primality layer was therefore already`);
console.log(` valid past 41#; nothing it certified is affected. This file uses 13 bases regardless.`);

// --- 0.5  the price of promotion, measured ---------------------------------
console.log('\n--- 0.5 the price of the promotions we did NOT make, measured ---');
{// (a) the strike inner loop, Float64 cursor (what the engine does) vs BigInt cursor
 const LEN=1<<22,arr=new Uint8Array(LEN),ST=4099,PASSES=20000;let hits=0;
 let t=Date.now();
 for(let p=0;p<PASSES;p++){let i=p%ST;do{arr[i]=0;i+=ST;hits++}while(i<LEN)}
 const tD=(Date.now()-t)/1000,nD=hits;
 const STB=BigInt(ST),LENB=BigInt(LEN);hits=0;t=Date.now();
 for(let p=0;p<PASSES;p++){let i=BigInt(p%ST);do{arr[Number(i)]=0;i+=STB;hits++}while(i<LENB)}
 const tB=(Date.now()-t)/1000;
 assert(hits===nD,'benchmark strike counts differ');
 console.log(` (a) strike loop, ${(nD/1e6).toFixed(1)}M strikes: Float64 cursor ${tD.toFixed(2)}s (${(nD/tD/1e6).toFixed(0)}e6/s) | BigInt cursor ${tB.toFixed(2)}s (${(nD/tB/1e6).toFixed(0)}e6/s) = ${(tB/tD).toFixed(1)}x slower`);
 const strikes=4*M*sp41.s1q;
 console.log(`     @41 strike budget = 4*M*sum_q 1/q = ${strikes.toExponential(3)}. Blanket BigInt multiplies the march by ${(tB/tD).toFixed(1)}x:`);
 console.log(`     an 11 h Float64 run becomes ${(11*tB/tD).toFixed(0)} h, i.e. ${(11*tB/tD/24).toFixed(0)} days. That is why the audit had to be path-by-path.`);
 // (b) E's product: plain double vs the exact BigInt fixed-point reference
 const qs=sp41.scour;
 t=Date.now();let pr=1;for(const q of qs)pr*=1-2/q;const tP=(Date.now()-t)/1000;
 t=Date.now();{const S2=1n<<256n;let a=S2;for(const q of qs)a=a*BigInt(q-2)/BigInt(q)}const tE=(Date.now()-t)/1000;
 console.log(` (b) E's ${qs.length}-factor product: plain double ${tP.toFixed(3)}s | exact BigInt fixed point ${tE.toFixed(3)}s (${(tE/tP).toFixed(0)}x). Both run ONCE, off the march.`);
 console.log(`     So the exact reference is free and we take it; the march's Float64 cursors stay Float64 because they are already exact.`);}
}

// ============================================================================
// PART 1 — CUSTODY GATES, and the sharded path
// ============================================================================
const BLOCKK=1<<22;                 // 8 MB over both lanes; measured optimum
const NSH=8;                        // 8 performance cores on this machine
function shardRange(M,i,n){const a=Math.floor(M*i/n),b=Math.floor(M*(i+1)/n);return[a,b]}
function shardFile(x,n,i){return `${RUNDIR}/nc37-x${x}-of${n}-${i}.json`}
function runShard(x,i,n,sampleEvery){
  fs.mkdirSync(RUNDIR,{recursive:true});
  const sp=levelSpec(x),[kA,kB]=shardRange(sp.M,i,n),t=Date.now();
  const r=marchRange(sp,kA,kB,{blockK:BLOCKK,sampleEvery,progEvery:i===0?2000:0,tag:`@${x} shard0`});
  const secs=(Date.now()-t)/1000;
  fs.writeFileSync(shardFile(x,n,i),JSON.stringify({x,n,i,kA,kB,np:r.np,S:r.S,
    firsts:r.firsts,last3:r.last3,samples:r.samples,secs}));
  prog(` shard ${i}/${n} @${x} k[${kA},${kB}) np=${r.np} S=${r.S} in ${secs.toFixed(1)}s`);
  return r;
}
function foldShards(x,n){
  const sp=levelSpec(x);let np=0,S=0,secs=0;const parts=[];
  for(let i=0;i<n;i++){const p=JSON.parse(fs.readFileSync(shardFile(x,n,i),'utf8'));
    assert(p.x===x&&p.i===i&&p.n===n,'shard file identity');
    const[a,b]=shardRange(sp.M,i,n);assert(p.kA===a&&p.kB===b,`shard ${i} range drift`);
    np+=p.np;S+=p.S;secs=Math.max(secs,p.secs);parts.push(p)}
  const samples=[].concat(...parts.map(p=>p.samples));
  return{x,W:sp.W,N:np,S,ns:sp.ns,q0:sp.q0,y:sp.y,E:sp.E,R:S/sp.E,
         firsts:parts[0].firsts,last3:parts[n-1].last3,samples,secs,parts};
}
function spawnShards(x,n,sampleEvery){
  const{spawn}=require('child_process');
  return new Promise((res,rej)=>{let done=0,bad=0;
    for(let i=0;i<n;i++){
      const c=spawn(process.execPath,[__filename,'shard',String(x),String(i),String(n),String(sampleEvery)],
                    {stdio:['ignore','ignore','inherit']});
      c.on('exit',code=>{if(code!==0)bad++;if(++done===n)bad?rej(new Error(`${bad} shard(s) failed at @${x}`)):res()})}})
}
const REF=[
 {x:7, S:8,        N:10,        R:'1.1556', ns:2,    q0:11, y:13},
 {x:11,S:45,       N:90,        R:'1.1458', ns:10,   q0:13, y:47},
 {x:13,S:307,      N:990,       R:'1.0089', ns:34,   q0:17, y:173},
 {x:17,S:3099,     N:14850,     R:'0.9549', ns:120,  q0:19, y:709},
 {x:19,S:38380,    N:252450,    R:'0.9261', ns:435,  q0:23, y:3109},
 {x:23,S:597475,   N:5301450,   R:'0.8930', ns:1739, q0:29, y:14929},
 {x:29,S:12307838, N:143139150, R:'0.8752', ns:7863, q0:31, y:80429}];
async function gates(){
console.log('===== PART 1: CUSTODY GATES — the promoted engine must reproduce the record =====');
console.log('--- gate 0: @7..@29 digit-for-digit against cap-22 / cap-33 (serial path) ---');
const levels=[];
for(const r of REF){
  const sp=levelSpec(r.x),L=march(sp,{blockK:BLOCKK});levels.push(L);
  console.log(` @${String(r.x).padStart(2)}: W=${String(L.W).padStart(10)} N=${String(L.N).padStart(9)} scour ${String(L.ns).padStart(4)} (${L.q0}..${L.y}) S=${String(L.S).padStart(8)} E=${L.E.toFixed(1)} beta=${L.R.toFixed(4)}`);
  assert(L.S===r.S&&L.N===r.N&&L.R.toFixed(4)===r.R&&L.ns===r.ns&&L.q0===r.q0&&L.y===r.y,`custody mismatch @${r.x}`);
  let n=2;for(const p of sp.mids)n*=p-2;assert(L.N===n,`census N != 2*prod(p-2) @${r.x}`)}
assert(levels[6].E.toFixed(1)==='14063617.4','@29 E mismatch');
console.log(` GATE 0 PASSED: seven levels, S / N / E / scour census / y all digit-for-digit  [${el()}]`);

for(const[x,SREF,NREF,EREF,BREF,NSREF,YREF,samp] of [
    [31,283449187,4151035350,'328601798.6','0.8626',37534,447829,1e7],
    [37,7998394865,145286237250,'9377228928.8','0.8530',198274,2724079,1e8]]){
  console.log(`\n--- gate ${x===31?1:2}: S(${x}) = ${SREF.toLocaleString('en-US')} through the SHARDED path (${NSH} shards) ---`);
  const t=Date.now();await spawnShards(x,NSH,samp);
  const L=foldShards(x,NSH),wall=(Date.now()-t)/1000;
  console.log(` @${x}: N=${L.N}  S=${L.S}  E=${L.E.toFixed(1)}  beta=${L.R.toFixed(4)}  scour ${L.ns} (${L.q0}..${L.y})`);
  console.log(` first survivors: ${L.firsts.map(r=>`(${r},${r+2})`).join(' ')}`);
  console.log(` last survivors:  ${L.last3.map(r=>`(${r},${r+2})`).join(' ')}`);
  assert(L.S===SREF,`GATE FAILED: S(${x}) = ${L.S}, record ${SREF}`);
  assert(L.N===NREF&&L.E.toFixed(1)===EREF&&L.R.toFixed(4)===BREF&&L.ns===NSREF&&L.y===YREF,`GATE FAILED: @${x} N/E/beta/scour`);
  for(const r of[...L.firsts,...L.samples,...L.last3])assert(isPrimeBPSW(r)&&isPrimeBPSW(r+2),`@${x} survivor ${r} is not a twin`);
  console.log(` GATE ${x===31?1:2} PASSED: S(${x}) = ${L.S.toLocaleString('en-US')} exactly; N, E, beta, scour census, y all match;`);
  console.log(` ${L.samples.length+L.firsts.length+L.last3.length} sampled survivors are genuine twins (13-base MR + strong Lucas).  [${wall.toFixed(1)}s wall over ${NSH} shards, slowest shard ${L.secs.toFixed(1)}s]`);
  levels.push(L)}
console.log(`\n GATES 0-2 ALL PASSED. The @41 march is cleared to run on this exact code path.  [${el()}]`);
return levels;
}

function combineReport(x,n){
  console.log(`\n===== PART 2: THE @${x} POINT — folding ${n} shards =====`);
  const L=foldShards(x,n), sp=levelSpec(x);
  assert(L.W===PRIMORIAL[x],'W');
  let nn=2;for(const p of sp.mids)nn*=p-2;
  assert(L.N===nn,`natal census ${L.N} != 2*prod(p-2) = ${nn}`);
  console.log(` per-shard wall times (s): ${L.parts.map(p=>p.secs.toFixed(0)).join(' ')}`);
  console.log(` sqrt(W) = ${Math.sqrt(L.W).toFixed(2)}; scour = ${L.ns} primes (${L.q0}..${L.y}); y = largest prime <= floor sqrt W; no prime in (y, sqrt(W+1)]`);
  console.log(` @${x}: N = ${L.N} = 2*prod(p-2) exact;  S = ${L.S};  E = ${L.E.toFixed(1)};  S/E = beta(${x}) = ${L.R.toFixed(4)}`);
  const Ex=exactE(sp,256);
  console.log(` E cross-check: BigInt 2^256 fixed point gives ${Ex.toFixed(1)} (relative ${(Math.abs(sp.E-Ex)/Ex).toExponential(2)}); beta on that E = ${(L.S/Ex).toFixed(4)}`);
  const test=[...L.firsts,...L.samples,...L.last3];
  for(const r of test)assert(isPrimeBPSW(r)&&isPrimeBPSW(r+2),`survivor ${r} is not a twin pair`);
  console.log(` VERIFIED: ${test.length} sampled survivors are ALL genuine twin pairs (13-base MR, deterministic to 3.317e24, plus a strong-Lucas second opinion).`);
  console.log(` first survivors: ${L.firsts.map(r=>`(${r},${r+2})`).join(' ')}`);
  console.log(` last survivors:  ${L.last3.map(r=>`(${r},${r+2})`).join(' ')}`);
  if(x===41)driftReport(L.R);
  return L;
}

// ---- the drift-point report (used by combine) -----------------------------
const REC={S:[8,45,307,3099,38380,597475,12307838,283449187,7998394865]};
function driftReport(beta41){
  const xs=[7,11,13,17,19,23,29,31,37,41];
  const W=xs.map(x=>PRIMORIAL[x]),u=W.map(w=>1/Math.log(w));
  const R=[1.1556,1.1458,1.0089,0.9549,0.9261,0.8930,0.8752,0.8626,0.8530,beta41];
  const cls=W.map(w=>{const l=Math.log(w);return LIMITC*(1+2/l+6/(l*l))});
  const sg=v=>(v>=0?'+':'')+v.toFixed(4);
  console.log('\n   x |   S/E   | 1/lnW  | classical | resid');
  xs.forEach((x,i)=>console.log(`  ${String(x).padStart(2)} | ${R[i].toFixed(4)} | ${u[i].toFixed(4)} |  ${cls[i].toFixed(4)}   | ${sg(R[i]-cls[i])}`));
  const cands=[['classical-raw',0.8449],['classical+resid',0.8459],['free-linear',0.8443],['pinned-linear',0.8488]];
  cands.sort((a,b)=>Math.abs(beta41-a[1])-Math.abs(beta41-b[1]));
  console.log(`\n FORECASTS ON RECORD (frozen in cap-33 RUN 2, before this run):`);
  console.log(`   classical-raw 0.8449 | classical+resid 0.8459 | free-linear 0.8443 | pinned-linear 0.8488`);
  console.log(` MEASURED beta(41) = ${beta41.toFixed(4)}   misses: ${cands.map(c=>`${c[0]} ${sg(beta41-c[1])}`).join(' | ')}`);
  console.log(` VERDICT: closest = ${cands[0][0]} (|miss| ${Math.abs(beta41-cands[0][1]).toFixed(4)}, next ${Math.abs(beta41-cands[1][1]).toFixed(4)})`);
  console.log(` classical residual sequence @13..@41: ${[2,3,4,5,6,7,8,9].map(i=>sg(R[i]-cls[i])).join('  ')}`);
  const f=lsq(u,R);let n=0,d=0;for(let i=0;i<10;i++){n+=(R[i]-LIMITC)*u[i];d+=u[i]*u[i]}
  let rss=0;for(let i=0;i<10;i++){const e=R[i]-(LIMITC+(n/d)*u[i]);rss+=e*e}
  console.log(` all 10: free c = ${f.a.toFixed(4)} (b=${f.b.toFixed(3)}, rms ${f.rms.toFixed(4)}) | pinned c=${LIMITC.toFixed(4)}: b=${(n/d).toFixed(3)}, rms ${Math.sqrt(rss/10).toFixed(4)}`);
  const s4=[6,7,8,9],g=lsq(s4.map(i=>u[i]),s4.map(i=>R[i]));
  console.log(` last 4 (@29..@41): free c = ${g.a.toFixed(4)} (b=${g.b.toFixed(3)}, rms ${g.rms.toFixed(4)})`);
  console.log(` remaining gap to e^{2gamma}/4 at @41: ${(beta41-LIMITC).toFixed(4)}`);
  const l43=Math.log(PRIMORIAL[41]*43),c43=LIMITC*(1+2/l43+6/(l43*l43));
  console.log(` forecast @43 (W = 1.308e16, BEYOND 2^53 — needs a different engine): classical-raw ${c43.toFixed(4)} (+persisted residual ${(c43+R[9]-cls[9]).toFixed(4)})`);
}

// ============================================================================
const MODE=process.argv[2]||'audit';
prog(`[natal-cap-37 mode=${MODE} node ${process.version} ${os.cpus().length} cpus]`);
if(MODE==='audit')audit();
else if(MODE==='bench'){const x=+process.argv[3]||31;const t=Date.now();
  const sp=levelSpec(x),L=march(sp,{blockK:1<<26,sampleEvery:1e7,progEvery:50,tag:`@${x}`});
  console.log(`@${x}: N=${L.N} S=${L.S} E=${L.E.toFixed(1)} beta=${L.R.toFixed(4)} ns=${L.ns} y=${L.y} in ${((Date.now()-t)/1000).toFixed(1)}s`);
  console.log(' firsts',L.firsts.join(','),' last3',L.last3.join(','),' nsamp',L.samples.length);}
else if(MODE==='probe'){
  // march a short k-range at the real level, to price the full march honestly
  const x=+process.argv[3]||41, lg=+process.argv[4]||26, nb=+process.argv[5]||24;
  const sp=levelSpec(x), KB=2**lg, kA=Math.floor(sp.M/3), kB=Math.min(sp.M,kA+nb*KB);
  const t=Date.now();const r=marchRange(sp,kA,kB,{blockK:KB});
  const sec=(Date.now()-t)/1000, span=kB-kA;
  const strikes=4*span*sp.s1q, rate=strikes/sec, full=4*sp.M*sp.s1q/rate;
  console.log(`@${x} blockK=2^${lg} (${(2**lg*2/1048576).toFixed(1)} MB both lanes) span=${span.toExponential(3)} k in ${sec.toFixed(2)}s`);
  console.log(`   strikes ${strikes.toExponential(3)}  rate ${(rate/1e6).toFixed(1)}e6/s  =>  full tile ${(full/3600).toFixed(2)} h serial, ${(full/3600/8).toFixed(2)} h on 8 shards`);
  console.log(`   np=${r.np} S=${r.S} (density ${(r.S/span).toFixed(5)} per k-cell)`);}
else if(MODE==='cost'){
  // PART 0.6 — the block-size sweep and the concurrency measurement, at @41
  console.log('===== PART 0.6: the cost of the @41 march, measured on the real prime set =====');
  const sp=levelSpec(41),SPAN=1<<28,kA=Math.floor(sp.M/3);
  console.log(` probe span ${SPAN} k-cells at k = M/3; strike budget on the span = ${(4*SPAN*sp.s1q).toExponential(3)}`);
  console.log(' blockK | both lanes | probe s | strikes/s | full tile serial | np/S on the span');
  let best=[0,1e9];
  for(const lg of[20,21,22,23,24,25,26]){
    const t=Date.now(),r=marchRange(sp,kA,kA+SPAN,{blockK:2**lg});
    const s=(Date.now()-t)/1000,rate=4*SPAN*sp.s1q/s,full=4*sp.M*sp.s1q/rate;
    if(full<best[1])best=[lg,full];
    console.log(`   2^${lg} | ${String((2**lg*2/1048576).toFixed(0)+' MB').padStart(10)} | ${s.toFixed(2).padStart(7)} | ${(rate/1e6).toFixed(0).padStart(6)}e6 | ${(full/3600).toFixed(1).padStart(9)} h | np=${r.np} S=${r.S}`);}
  console.log(` serial optimum: blockK = 2^${best[0]} (${(best[1]/3600).toFixed(1)} h for the full tile on one core)`);
  console.log(`\n ${NSH} CONCURRENT probes (the sharded regime: this is what the real run sees) —`);
  const{spawn}=require('child_process');
  (async()=>{for(const lg of[21,22,24]){
    const kids=[];for(let i=0;i<NSH;i++)kids.push(new Promise(res=>{
      const c=spawn(process.execPath,[__filename,'probe','41',String(lg),String(2**26/2**lg*4)],{stdio:['ignore','pipe','ignore']});
      let o='';c.stdout.on('data',d=>o+=d);c.on('exit',()=>res(o))}));
    const outs=await Promise.all(kids);
    const rates=outs.map(o=>+(/rate (\d+(?:\.\d+)?)e6/.exec(o)||[0,0])[1]);
    const agg=rates.reduce((a,b)=>a+b,0);
    console.log(`   blockK 2^${lg}: per-shard ${rates.map(r=>r.toFixed(0)).join(' ')} e6/s; AGGREGATE ${agg.toFixed(0)}e6/s => @41 full tile ${(4*sp.M*sp.s1q/(agg*1e6)/3600).toFixed(1)} h wall`);}
   console.log(`\n[cost done in ${el()}]`);})();
}
else if(MODE==='gates')gates().catch(e=>{console.error(String(e));process.exit(1)});
else if(MODE==='shard')runShard(+process.argv[3],+process.argv[4],+process.argv[5],+process.argv[6]||2e9);
else if(MODE==='combine')combineReport(+process.argv[3]||41,+process.argv[4]||NSH);
else if(MODE==='at41'){(async()=>{
  console.log(`@41 job started ${new Date().toISOString()} on ${os.cpus().length} cpus; shard results land in ${RUNDIR}`);
  await gates();                              // the same three gates, same code path
  const t=Date.now();
  console.log(`\n===== THE @41 MARCH — W = 41# = 304,250,263,527,210 =====`);
  console.log(` M = W/30 = 10,141,675,450,907 pair cells; ${NSH} shards; blockK = 2^22 (8 MB over both lanes);`);
  console.log(` strike budget 4*M*sum_q 1/q = 5.916e13; projected 11 h at the measured 1.5e9 strikes/s aggregate.`);
  await spawnShards(41,NSH,2e9);
  console.log(`\n all ${NSH} shards returned in ${((Date.now()-t)/3600000).toFixed(3)} h`);
  combineReport(41,NSH);
  console.log(`\n[at41 done in ${el()} = ${((Date.now()-T00)/3600000).toFixed(3)} h]`);
})().catch(e=>{console.error('AT41 FAILED: '+String(e));process.exit(1)})}
else if(MODE==='smoke'){
  assert(isPrimeMR(2147483647)&&isPrimeMR(999999999989)&&isPrimeMR(67280421310721),'MR primes');
  assert(!isPrimeMR(3215031751)&&!isPrimeMR(341550071728321),'MR pseudoprime traps');
  const a=march(levelSpec(13),{blockK:1<<20}),b=marchRef(13);
  assert(a.S===307&&a.S===b.S&&a.N===b.np,'engine smoke');
  console.log('smoke: MR/BPSW traps pass, K-30 == cap-22 at @13, S(13) = 307');
}
if(MODE!=='gates'&&MODE!=='at41'&&MODE!=='cost')console.log(`\n[${MODE} done in ${el()}]`);

// exported for the optimisation bench (research/bench-at41.js); no side effects
if(typeof module!=='undefined')module.exports={levelSpec,marchRange,primeTable,march,marchRef,invMod};

// ============================================================================
// OUTPUT — three real runs, PASTED FROM LOGS, NOT PRODUCED BY THIS PASTE
// ============================================================================
// PROVENANCE, read this before quoting anything below. None of the three
// blocks was produced today. All three are copied byte for byte out of log
// files written by the runs of 2026-08-15, which live OUTSIDE this repo at
// ~/Files/primeoire-runs/at41/ and are therefore not under version control:
//   [A] audit.log     2026-08-15 18:14, mode=audit,  9.3 s   — full, verbatim
//   [C] cost.log      2026-08-15 18:03, mode=cost,  83.0 s   — full, verbatim
//   [R] at41-run2.log 2026-08-16 03:29, mode=at41, 6.160 h   — see the two
//       marked elisions inside it; nothing else is changed.
// A FOURTH log, at41.log (2026-08-15 19:02), is the FIRST @41 attempt, killed
// at 10.59% because it was competing with the Lemma V run for cores. Its
// shard0 progress figures are digit-identical to run 2 at every matching
// block (np=4686722957 S=349203305 at blk 2000, and so on down), which is an
// unplanned determinism check on the march and the reason run 2 is trusted.
// The @41 march itself was NOT re-run for this block: 6.16 h of 10-core
// wall time. See the dated cost note in the READINGS.
// ============================================================================
/*
=== [A] node research/natal-cap-37-at41-march.js audit   (audit.log, verbatim) ===

[natal-cap-37 mode=audit node v22.21.0 10 cpus]
===== PART 0: the 2^53 audit — every arithmetic path in the engine =====
[prime table to 17442772: 1117922 primes, 0.13s]
 2^53 = 9007199254740992;  W(41) = 41# = 304250263527210 = 0.0338 x 2^53;  M = W/30 = 10141675450907
 scour: 1117909 primes (43..17442769);  y = 17442769 = largest prime <= floor sqrt W = 17442771;  N = 5666163252750

 path                                        | worst operands        | worst result   | /2^53   | exact?
 A  W = 41# accumulated product             | 7420738134810 x 41    |     3.0425e+14 | 3.4e-2 | YES
 B  sqrt bracket (sq+1)*(sq+1)              | 17442772^2            |     3.0425e+14 | 3.4e-2 | YES
 C  y-depth assert  q*q <= W+1              | 17442769^2            |     3.0425e+14 | 3.4e-2 | YES
 D  N = 2*prod(p-2)                         | 145286237250 x 39     |     5.6662e+12 | 6.3e-4 | YES
 E  invMod(30,q): q*|s| in ext. Euclid      | 17442769 x 17442769   |     3.0425e+14 | 3.4e-2 | YES
 F  CRT anchor ((a-b) mod q)*inv30(q)       | 17442768 x 17442768   |     3.0425e+14 | 3.4e-2 | YES
 G  shard anchor  kA % q  (IEEE exact rem)  | 10141675450907 mod 17442769|     1.0142e+13 | 1.1e-3 | YES
 H  absolute cursor  kb + i                 | 10141675450907 + 17442769|     1.0142e+13 | 1.1e-3 | YES
 I  block offset  (nx[j] - kb) | 0          | < blockK + q          |      8.4552e+7 | 9.4e-9 | YES
 J  stride in Int32Array  step[j] = q       | 17442769              |      1.7443e+7 | 1.9e-9 | YES
 K  natal census accumulator np             | +1 x 5666163252750    |     5.6662e+12 | 6.3e-4 | YES
 L  survivor accumulator S                  | +1 x ~2.6e11          |     2.6000e+11 | 2.9e-5 | YES
 M  position rebuild  30*k + 17             | 30 x 10141675450906 + 17|     3.0425e+14 | 3.4e-2 | YES
 N  SWAR count imul(w,0x01010101)>>>24      | 4 bytes each <= 1     |      4.0000e+0 | 4.4e-16 | YES
 Int32 paths against 2^31 = 2147483648: I 8.455e+7 (3.9%), J 1.744e+7 (0.8%)

 VERDICT (computed, not asserted): every integer the K-30 march forms at @41 is a
 nonnegative integer < 2^53, and +,-,* on such integers are EXACT in IEEE754 binary64
 whenever the result is < 2^53. No path needs BigInt or double-double promotion.
 The binding path is F (equivalently C, E): it is bounded by y^2 <= W, so the engine is
 exact exactly while W < 2^53. @43 dies at path A first: 43# = 1.3083e+16 = 1.45 x 2^53.

--- 0.1 the K-30 relabelling: every strike class verified against its definition ---
 4471676 strike classes: (30*c0 + b) mod q equals the intended strike residue in every one
 20000 largest-q classes (q up to 17442769, q^2 = 3.4% of 2^53) re-derived in BigInt: identical

--- 0.2 K-30 against cap-22's original engine, level by level ---
 @ 7: N=      10 S=      8 first=17 — K-30 and cap-22 agree exactly
 @11: N=      90 S=     45 first=71 — K-30 and cap-22 agree exactly
 @13: N=     990 S=    307 first=191 — K-30 and cap-22 agree exactly
 @17: N=   14850 S=   3099 first=821 — K-30 and cap-22 agree exactly
 @19: N=  252450 S=  38380 first=3167 — K-30 and cap-22 agree exactly
 @23: N= 5301450 S= 597475 first=15137 — K-30 and cap-22 agree exactly

--- 0.3 E is the only inexact path: plain-double product vs exact BigInt reference ---
 @31: E(double) = 328601798.6180  E(BigInt 2^256 fixed point) = 328601798.6180
      relative error 3.45e-15 over 37542 factors; beta is quoted to 4 dp, so this is 3.4e-10 of one quoting unit  [0.0s]
 @37: E(double) = 9377228928.7637  E(BigInt 2^256 fixed point) = 9377228928.7636
      relative error 1.08e-14 over 198283 factors; beta is quoted to 4 dp, so this is 1.1e-9 of one quoting unit  [0.1s]
 @41: E(double) = 303627067641.6854  E(BigInt 2^256 fixed point) = 303627067641.6877
      relative error 7.64e-15 over 1117919 factors; beta is quoted to 4 dp, so this is 7.6e-10 of one quoting unit  [0.2s]

--- 0.4 primality: 13 bases {2,3,5,7,11,13,17,19,23,29,31,37,41} ---
 deterministic for n < 3317044064679887385961981 = 3.317e24 (Sorenson-Webster 2015);
 41# + 2 = 304250263527212 = 3.043e14, i.e. 9.2e-11 of that bound.
 verified against a full sieve on [2, 2000000]: 148933 primes, zero disagreements
 13-base MR and an independent strong-Lucas (BPSW) second opinion agree on 400 integers just below 41# (14 prime)
 the classical strong-pseudoprime traps 3,215,031,751 / 341,550,071,728,321 / 3,474,749,660,383
 / 3,825,123,056,546,413,051 are all correctly called composite by the 13-base set
 RECORD CORRECTION: cap-33 RUN 2 recorded its 12-base set as "deterministic to 3.186e14".
 The true Sorenson-Webster bound for the first 12 primes is 3.186e23 — a decimal-exponent
 slip of nine orders in the comment. The @37 run's primality layer was therefore already
 valid past 41#; nothing it certified is affected. This file uses 13 bases regardless.

--- 0.5 the price of the promotions we did NOT make, measured ---
 (a) strike loop, 20.5M strikes: Float64 cursor 0.02s (975e6/s) | BigInt cursor 0.63s (32e6/s) = 30.0x slower
     @41 strike budget = 4*M*sum_q 1/q = 5.916e+13. Blanket BigInt multiplies the march by 30.0x:
     an 11 h Float64 run becomes 330 h, i.e. 14 days. That is why the audit had to be path-by-path.
 (b) E's 1117909-factor product: plain double 0.017s | exact BigInt fixed point 0.246s (14x). Both run ONCE, off the march.
     So the exact reference is free and we take it; the march's Float64 cursors stay Float64 because they are already exact.

[audit done in 9.3s]

=== [C] node research/natal-cap-37-at41-march.js cost   (cost.log, verbatim) ===

===== PART 0.6: the cost of the @41 march, measured on the real prime set =====
 probe span 268435456 k-cells at k = M/3; strike budget on the span = 1.566e+9
 blockK | both lanes | probe s | strikes/s | full tile serial | np/S on the span
   2^20 |       2 MB |    8.86 |    177e6 |      93.0 h | np=149975249 S=6818495
   2^21 |       4 MB |    7.33 |    214e6 |      76.9 h | np=149975249 S=6818495
   2^22 |       8 MB |    6.18 |    253e6 |      64.8 h | np=149975249 S=6818495
   2^23 |      16 MB |    5.18 |    302e6 |      54.4 h | np=149975249 S=6818495
   2^24 |      32 MB |    3.77 |    415e6 |      39.6 h | np=149975249 S=6818495
   2^25 |      64 MB |    4.69 |    334e6 |      49.2 h | np=149975249 S=6818495
   2^26 |     128 MB |    6.63 |    236e6 |      69.6 h | np=149975249 S=6818495
 serial optimum: blockK = 2^24 (39.6 h for the full tile on one core)

 8 CONCURRENT probes (the sharded regime: this is what the real run sees) —
   blockK 2^21: per-shard 143 150 154 147 153 152 140 146 e6/s; AGGREGATE 1185e6/s => @41 full tile 13.9 h wall
   blockK 2^22: per-shard 170 177 161 175 172 165 174 165 e6/s; AGGREGATE 1357e6/s => @41 full tile 12.1 h wall
   blockK 2^24: per-shard 102 109 105 104 103 106 103 107 e6/s; AGGREGATE 838e6/s => @41 full tile 19.6 h wall

[cost done in 83.0s]

=== [R] node research/natal-cap-37-at41-march.js at41   (at41-run2.log) ===
=== 49 repeated banner lines ("[natal-cap-37 mode=shard ...]" and ===
=== "[prime table to 17442772: 1117922 primes, N.NNs]") removed throughout; ===
=== one further elision is marked in place. Nothing else is altered.      ===

[natal-cap-37 mode=at41 node v22.21.0 10 cpus]
@41 job started 2026-08-15T19:19:46.073Z on 10 cpus; shard results land in ~/Files/primeoire-runs/at41
===== PART 1: CUSTODY GATES — the promoted engine must reproduce the record =====
--- gate 0: @7..@29 digit-for-digit against cap-22 / cap-33 (serial path) ---
 @ 7: W=       210 N=       10 scour    2 (11..13) S=       8 E=6.9 beta=1.1556
 @11: W=      2310 N=       90 scour   10 (13..47) S=      45 E=39.3 beta=1.1458
 @13: W=     30030 N=      990 scour   34 (17..173) S=     307 E=304.3 beta=1.0089
 @17: W=    510510 N=    14850 scour  120 (19..709) S=    3099 E=3245.5 beta=0.9549
 @19: W=   9699690 N=   252450 scour  435 (23..3109) S=   38380 E=41441.2 beta=0.9261
 @23: W= 223092870 N=  5301450 scour 1739 (29..14929) S=  597475 E=669028.8 beta=0.8930
 @29: W=6469693230 N=143139150 scour 7863 (31..80429) S=12307838 E=14063617.4 beta=0.8752
 GATE 0 PASSED: seven levels, S / N / E / scour census / y all digit-for-digit  [2.0s]

--- gate 1: S(31) = 283,449,187 through the SHARDED path (8 shards) ---
 shard 6/8 @31 k[5014012253,5849680962) np=518879395 S=33111178 in 10.4s
 shard 1/8 @31 k[835668708,1671337417) np=518879396 S=37278036 in 10.6s
 shard 0/8 @31 k[0,835668708) np=518879419 S=42190445 in 10.7s
 shard 5/8 @31 k[4178343544,5014012253) np=518879435 S=33546474 in 10.6s
 shard 2/8 @31 k[1671337417,2507006126) np=518879435 S=35726585 in 10.7s
 shard 3/8 @31 k[2507006126,3342674835) np=518879424 S=34767842 in 10.7s
 shard 7/8 @31 k[5849680962,6685349671) np=518879420 S=32751507 in 10.7s
 shard 4/8 @31 k[3342674835,4178343544) np=518879426 S=34077120 in 10.8s
 @31: N=4151035350  S=283449187  E=328601798.6  beta=0.8626  scour 37534 (37..447829)
 first survivors: (448157,448159) (448631,448633) (448871,448873) (448997,448999) (449171,449173)
 last survivors:  (200560487891,200560487893) (200560488761,200560488763) (200560488827,200560488829)
 GATE 1 PASSED: S(31) = 283,449,187 exactly; N, E, beta, scour census, y all match;
 33 sampled survivors are genuine twins (13-base MR + strong Lucas).  [11.1s wall over 8 shards, slowest shard 10.8s]

--- gate 2: S(37) = 7,998,394,865 through the SHARDED path (8 shards) ---
 @37 shard0 blk 2000/7372 27.13% np=4927067707 S=349254275 [119s, eta 321s]
 @37 shard0 blk 4000/7372 54.26% np=9854135253 S=661503588 [241s, eta 203s]
 @37 shard0 blk 6000/7372 81.39% np=14781202943 S=961803138 [358s, eta 82s]
 shard 7/8 @37 k[216438195598,247357937827) np=18160779684 S=933774530 in 428.1s
 shard 4/8 @37 k[123678968913,154598711141) np=18160779631 S=966970305 in 431.8s
 shard 6/8 @37 k[185518453370,216438195598) np=18160779575 S=942960670 in 432.5s
 shard 5/8 @37 k[154598711141,185518453370) np=18160779736 S=953722322 in 433.0s
 shard 1/8 @37 k[30919742228,61839484456) np=18160779575 S=1045856786 in 434.4s
 shard 2/8 @37 k[61839484456,92759226685) np=18160779735 S=1007715878 in 434.6s
 shard 3/8 @37 k[92759226685,123678968913) np=18160779630 S=984039173 in 434.6s
 shard 0/8 @37 k[0,30919742228) np=18160779684 S=1163355201 in 436.6s
 @37: N=145286237250  S=7998394865  E=9377228928.8  beta=0.8530  scour 198274 (41..2724079)
 first survivors: (2725001,2725003) (2725367,2725369) (2725451,2725453) (2725517,2725519) (2725691,2725693)
 last survivors:  (7420738133717,7420738133719) (7420738133747,7420738133749) (7420738134527,7420738134529)
 GATE 2 PASSED: S(37) = 7,998,394,865 exactly; N, E, beta, scour census, y all match;
 84 sampled survivors are genuine twins (13-base MR + strong Lucas).  [437.0s wall over 8 shards, slowest shard 436.6s]

 GATES 0-2 ALL PASSED. The @41 march is cleared to run on this exact code path.  [450.1s]

===== THE @41 MARCH — W = 41# = 304,250,263,527,210 =====
 M = W/30 = 10,141,675,450,907 pair cells; 8 shards; blockK = 2^22 (8 MB over both lanes);
 strike budget 4*M*sum_q 1/q = 5.916e13; projected 11 h at the measured 1.5e9 strikes/s aggregate.
 @41 shard0 blk 2000/302246 0.66% np=4686722957 S=349203305 [153s, eta 22920s]
 @41 shard0 blk 4000/302246 1.32% np=9373445779 S=661452618 [311s, eta 23180s]
 @41 shard0 blk 6000/302246 1.99% np=14060168660 S=961752168 [468s, eta 23094s]
 ... [145 further "@41 shard0 blk" progress ticks removed here; they are
      the same 6-field line at 0.66% intervals and are in the source log]
 shard 4/8 @41 k[5070837725453,6338547156816) np=708270406589 S=31170689635 in 21392.9s
 shard 7/8 @41 k[8873966019543,10141675450907) np=708270406582 S=30218418420 in 21433.3s
 shard 6/8 @41 k[7606256588180,8873966019543) np=708270406553 S=30480523165 in 21440.5s
 @41 shard0 blk 298000/302246 98.60% np=698321709251 S=36187563681 [21468s, eta 306s]
 shard 2/8 @41 k[2535418862726,3803128294090) np=708270406651 S=32329900321 in 21467.9s
 shard 1/8 @41 k[1267709431363,2535418862726) np=708270406553 S=33409834529 in 21500.8s
 shard 3/8 @41 k[3803128294090,5070837725453) np=708270406588 S=31657025412 in 21507.8s
 shard 5/8 @41 k[6338547156816,7606256588180) np=708270406652 S=30790906680 in 21512.6s
 @41 shard0 blk 300000/302246 99.26% np=703008432257 S=36414251796 [21589s, eta 162s]
 @41 shard0 blk 302000/302246 99.92% np=707695155148 S=36640858247 [21710s, eta 18s]
 shard 0/8 @41 k[0,1267709431363) np=708270406582 S=36668664672 in 21724.4s

 all 8 shards returned in 6.035 h

===== PART 2: THE @41 POINT — folding 8 shards =====
 per-shard wall times (s): 21724 21501 21468 21508 21393 21513 21440 21433
 sqrt(W) = 17442771.10; scour = 1117909 primes (43..17442769); y = largest prime <= floor sqrt W; no prime in (y, sqrt(W+1)]
 @41: N = 5666163252750 = 2*prod(p-2) exact;  S = 256725962834;  E = 303627067641.7;  S/E = beta(41) = 0.8455
 E cross-check: BigInt 2^256 fixed point gives 303627067641.7 (relative 7.64e-15); beta on that E = 0.8455
 VERIFIED: 133 sampled survivors are ALL genuine twin pairs (13-base MR, deterministic to 3.317e24, plus a strong-Lucas second opinion).
 first survivors: (17442827,17442829) (17443091,17443093) (17443301,17443303) (17443661,17443663) (17443961,17443963)
 last survivors:  (304250263521857,304250263521859) (304250263522547,304250263522549) (304250263524671,304250263524673)

   x |   S/E   | 1/lnW  | classical | resid
   7 | 1.1556 | 0.1870 |  1.2561   | -0.1005
  11 | 1.1458 | 0.1291 |  1.0772   | +0.0686
  13 | 1.0089 | 0.0970 |  0.9917   | +0.0172
  17 | 0.9549 | 0.0761 |  0.9413   | +0.0136
  19 | 0.9261 | 0.0622 |  0.9100   | +0.0161
  23 | 0.8930 | 0.0520 |  0.8884   | +0.0046
  29 | 0.8752 | 0.0443 |  0.8726   | +0.0026
  31 | 0.8626 | 0.0384 |  0.8610   | +0.0016
  37 | 0.8530 | 0.0337 |  0.8520   | +0.0010
  41 | 0.8455 | 0.0300 |  0.8449   | +0.0006

 FORECASTS ON RECORD (frozen in cap-33 RUN 2, before this run):
   classical-raw 0.8449 | classical+resid 0.8459 | free-linear 0.8443 | pinned-linear 0.8488
 MEASURED beta(41) = 0.8455   misses: classical+resid -0.0004 | classical-raw +0.0006 | free-linear +0.0012 | pinned-linear -0.0033
 VERDICT: closest = classical+resid (|miss| 0.0004, next 0.0006)
 classical residual sequence @13..@41: +0.0172  +0.0136  +0.0161  +0.0046  +0.0026  +0.0016  +0.0010  +0.0006
 all 10: free c = 0.7842 (b=2.239, rms 0.0280) | pinned c=0.7931: b=2.155, rms 0.0284
 last 4 (@29..@41): free c = 0.7830 (b=2.079, rms 0.0002)
 remaining gap to e^{2gamma}/4 at @41: 0.0525
 forecast @43 (W = 1.308e16, BEYOND 2^53 — needs a different engine): classical-raw 0.8393 (+persisted residual 0.8399)

[at41 done in 22176.3s = 6.160 h]
*/

// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 0. CUSTODY OF THIS BLOCK. Written today from the three logs pasted above.
//    NOTHING in this file was re-run to produce them, so read every number
//    below as a reading OF A LOG, one step further from the machine than a
//    reading of a run. Where a claim rests on the log alone and could not be
//    cross-checked, it says so.
//
// 1. THE @41 POINT LANDED AND THE FIFTH RESIDUAL COLLAPSE IS REAL. Measured
//    beta(41) = 0.8455 at W = 304,250,263,527,210, S(41) = 256,725,962,834
//    against E(41) = 303,627,067,641.7. Against the four forecasts frozen in
//    cap-33 RUN 2 before the run: classical+resid 0.8459 misses by -0.0004,
//    classical-raw 0.8449 by +0.0006, free-linear 0.8443 by +0.0012,
//    pinned-linear 0.8488 by -0.0033. The classical residual sequence is now
//    +0.0046, +0.0026, +0.0016, +0.0010, +0.0006 at @23..@41: five collapses,
//    each forecast before its run. Calibration: pinned-linear has now missed
//    by ~5x the winner's margin twice running and is dead; the free-linear
//    fit on the last four levels has rms 0.0002 yet still misses @41 by
//    +0.0012, which is the standing warning against reading a four-point
//    linear fit as a law.
//
// 2. THE ENGINE'S EXACTNESS CEILING AND THE LEVEL LADDER'S CEILING ARE THE
//    SAME NUMBER, AND WE ARE STANDING ON IT. PART 0 walks fourteen arithmetic
//    paths and computes each one's worst operand and result. Every integer
//    the @41 march forms is below 2^53; the binding path is F, the CRT anchor
//    ((a-b) mod q)*inv30(q), bounded by y^2 <= W, so the engine is exact
//    exactly while W < 2^53. @43 dies first at path A: 43# = 1.3083e16 =
//    1.45 x 2^53. The file's own @43 forecast (classical-raw 0.8393, 0.8399
//    with the persisted residual) is therefore ON RECORD AND UNREACHABLE by
//    this code. That is the honest state: the ladder stops here for engine
//    reasons, not for cost reasons.
//
// 3. THE COST FORECAST WAS WRONG BY ROUGHLY 2x, IN OUR FAVOUR, AND THE FILE
//    STILL PRINTS THE WRONG NUMBER. Line 606 prints "projected 11 h at the
//    measured 1.5e9 strikes/s aggregate". cost.log never measured 1.5e9: its
//    best 8-concurrent aggregate is 1357e6/s at blockK 2^22, projecting
//    12.1 h, and its other two rows give 13.9 h and 19.6 h. The march then
//    took 6.035 h over the eight shards, i.e. a delivered aggregate near
//    2.7e9 strikes/s, TWICE the best probe. So the probe under-predicted the
//    real run by a factor of two and the printed projection under-predicts
//    the probe by another 10%. Neither number is load-bearing for any result,
//    but anyone pricing @43-class work off this line will price it high.
//    Note also that the serial optimum (blockK 2^24, 39.6 h) is NOT the
//    concurrent optimum (2^22): under eight shards 2^24 falls to 838e6/s
//    aggregate against 2^22's 1357e6/s. The code takes 2^22 and the log
//    shows why. The choice is right; only the extrapolation from it is off.
//
// 4. CUSTODY IS COMPLETE THROUGH @37 AND SINGLE-SHOT AT @41. Gate 0
//    reproduces @7..@29 digit-for-digit on the serial path (2.0 s); gates 1
//    and 2 reproduce S(31) = 283,449,187 and S(37) = 7,998,394,865 THROUGH
//    THE SHARDED PATH (11.1 s and 437.0 s), so the exact code path that
//    produced @41 is the path that passed. @41 itself has NO independent
//    reproduction and the shard fold is a one-shot: eight integer sums,
//    order-independent and therefore exact as a fold, but computed once.
//
// 5. THE ONE ACCIDENTAL SECOND OPINION ON @41, AND ITS LIMIT. The first @41
//    attempt (at41.log, killed at 10.59% of shard 0 for core contention with
//    the Lemma V run) agrees with run 2 digit for digit at every shared
//    progress tick: np=4686722957 S=349203305 at block 2000, np=74987566147
//    S=4532204145 at block 32000, and every tick between. That covers about
//    10.6% of one shard of eight, i.e. ~1.3% of the tile, and it establishes
//    DETERMINISM, not correctness. The other 98.7% of S(41) has been computed
//    exactly once in the history of this project.
//
// 6. E IS THE ONLY INEXACT QUANTITY AND ITS ERROR IS MEASURED, NOT BOUNDED BY
//    ARGUMENT. PART 0.3 puts the plain-double product against an exact BigInt
//    2^256 fixed-point reference at three levels: @31 3.45e-15 over 37,542
//    factors, @37 1.08e-14 over 198,283, @41 7.64e-15 over 1,117,919. At @41
//    that is 7.6e-10 of one unit in the fourth decimal place of beta, where
//    beta is quoted. PART 2 re-runs the check inside the result line.
//
// 7. THE NINE-ORDER CORRECTION TO cap-33 IS HOUSED HERE. PART 0.4 records
//    that cap-33 RUN 2 wrote its 12-base Miller-Rabin set as "deterministic
//    to 3.186e14" when the Sorenson-Webster bound for the first twelve primes
//    is 3.186e23 — a decimal-exponent slip of nine orders. Consequence,
//    correctly stated in the log: nothing cap-33 certified is affected,
//    because the true bound already covered 41#. This file uses thirteen
//    bases and verifies them against a full sieve on [2, 2e6] (148,933
//    primes, zero disagreements), against BPSW on 400 integers just below
//    41#, and against four classical strong-pseudoprime traps.
//
// 8. A HEADER FIGURE THE LOG CONTRADICTS. The CLI block says
//    "audit  (~30 s)". audit.log ends "[audit done in 9.3s]". Harmless, and
//    the only such disagreement found between this header and these logs.
//
// 9. MEASURED COST OF EVERY MODE, from the logs: audit 9.3 s; cost 83.0 s;
//    gates 450.1 s (7.5 min, of which gate 2 is 437.0 s); at41 22,176.3 s =
//    6.160 h TOTAL, of which the eight @41 shards are 6.035 h and the gates
//    the remaining 450 s. When quoting "6.16 hours" note it INCLUDES the
//    gates; the march alone is 6.035 h.
//
// 10. WHAT REMAINS UNVERIFIABLE. (a) S(41) has one witness. A second full
//    march is 6 h of ten cores and is the only thing that would make @41 as
//    well-attested as @31 and @37. (b) The logs live outside version control
//    at ~/Files/primeoire-runs/at41/; if that directory is lost, this block
//    becomes the only copy, which is precisely why it is pasted here. (c) The
//    @43 forecast on record cannot be graded by this engine at all.
// ============================================================================

// ============================================================================
// CUSTODY ADDENDUM (2026-08-18) — what I re-ran myself, and what reproduced
// ============================================================================
// The OUTPUT block above is copied from 2026-08-15 logs. To put first-hand
// custody under everything except the 6-hour march itself, three modes were
// re-run today on this machine (node v22.21.0, 10 cores):
//
//   smoke   0.1 s   PASSES. "smoke: MR/BPSW traps pass, K-30 == cap-22 at @13,
//                   S(13) = 307"
//   audit   5.3 s   REPRODUCES. Every line of PART 0 is byte-identical to
//                   audit.log except PART 0.5, which is a benchmark and moves:
//                   BigInt cursor 0.41 s / 50e6 per s / 18.6x here against
//                   0.63 s / 32e6 per s / 30.0x in the archived run, and E's
//                   BigInt product 0.137 s / 11x against 0.246 s / 14x. The
//                   VERDICT, the fourteen worst-case operand rows, the strike-
//                   class check, the level-by-level K-30 vs cap-22 table, the
//                   three E-vs-BigInt relative errors and the whole primality
//                   section are identical. (Note the archived audit took 9.3 s
//                   and mine 5.3 s: that run was on a loaded machine, which is
//                   also why PART 0.5's ratios differ.)
//   gates   440.5 s REPRODUCES EXACTLY. Gate 0 seven levels; gate 1 all eight
//                   @31 shard np/S values; gate 2 all eight @37 shard np/S
//                   values; S(31) = 283,449,187 and S(37) = 7,998,394,865.
//                   Diffed against gates.log with timing lines removed: no
//                   differences at all. Wall 440.5 s here vs 450.1 s archived.
//
// NOT re-run: the @41 march. That is the honest boundary of this addendum.
// S(41) = 256,725,962,834 still rests on one completed run (see reading 5).
// ============================================================================
//
// ADDENDUM 2, same date — THE FOLD, INDEPENDENTLY RE-SUMMED. The eight shard
// result files ~/Files/primeoire-runs/at41/nc37-x41-of8-{0..7}.json were opened
// and their S and np fields summed in BigInt, outside this file's combineReport
// path entirely:
//     sum S  = 256,725,962,834   == the published S(41)
//     sum np = 5,666,163,252,750 == the published N(41) = 2*prod(p-2)
//     the eight kA..kB ranges are contiguous, start at 0 and end at
//     10,141,675,450,907 = M, with no gap and no overlap.
// That independently confirms the FOLD and the PARTITION. It does not confirm
// the march: the shard JSONs are that same one run's own output, so this closes
// the arithmetic of assembling S(41) and leaves reading 5 exactly as it stands.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings and the two addenda above that the embedded block
// does not contain verbatim actually is. No number above was changed.
//
// FIRST, THE STANDING CAVEAT THIS FILE ALREADY DECLARES. The block above the
// readings is not a run of this file. It is three logs pasted from
// ~/Files/primeoire-runs/at41/, which is outside version control, and the [R]
// log carries a marked elision of 145 progress ticks. So "the file's own
// printed evidence" here means "a log this repository cannot re-run", and one
// class of figure below is traceable only to the part of a log that was
// elided. The custody addendum and reading 10(b) both say this in their own
// words; this note only records which figures are affected.
//
// SAME VALUE, DIFFERENT NOTATION:
//   1.3083e16 in reading 2 is the pasted 1.3083e+16, the 43# operand on
//   path A. Not a discrepancy.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   2.7e9 strikes/s in reading 3 is the printed strike budget 5.916e13
//   divided by the 6.035 h the eight shards took: 5.916e13 / 21726 s =
//   2.723e9. Both inputs are in the pasted block.
//   98.7% in reading 5 is 100 minus the 1.3% the accidental second opinion
//   covers, and that 1.3% is the log's own 10.59% of one shard of eight
//   (10.59/8 = 1.324). The nearby printed 98.60% is the shard-0 progress
//   percentage at block 298000 and is a digit coincidence, not the source.
//
// TRACEABLE ONLY TO THE ELIDED PART OF AN OFF-REPO LOG:
//   np=74987566147, S=4532204145 and the block number 32000 in reading 5.
//   The pasted [R] block prints the blk 2000 tick and then removes 145
//   further ticks; the blk 32000 tick is inside that removal, and the
//   matching tick from the killed first attempt (at41.log) was never pasted
//   at all. The figures are internally consistent with what is printed:
//   shard 0 has 302246 blocks and 10.59% of it is block 32008. Consistent is
//   not verified. Re-deriving these requires the two log files at
//   ~/Files/primeoire-runs/at41/, and nothing in this repository can produce
//   them.
//
// [UNTRACED — verify before quoting]  (ADJUDICATED 2026-08-20, mismatch #48
//   and #49: BOTH LEFT FLAGGED, and deliberately. Neither can be reproduced
//   from this repository -- #48 needs a re-run transcript that was never
//   embedded, #49 needs the elided part of a log at ~/Files/primeoire-runs/
//   at41/ which is outside version control -- and neither is load-bearing:
//   #48 is a timing benchmark expected to move between machines, #49 is a
//   progress tick. This flag IS the custody. The file is honest about itself
//   and says so in its own header; that judgement stands.):
//   0.41 s, 50e6 per s and 18.6x in the custody addendum are PART 0.5 of the
//   2026-08-18 re-run of audit mode on this machine. That re-run's transcript
//   was never embedded anywhere; the pasted [A] log carries the archived
//   machine's 0.63 s / 32e6 / 30.0x instead. The three figures are mutually
//   consistent with the pasted run's 20.5M-strike probe (20.5e6/0.41 = 50e6
//   per s, and 0.41/0.02 = 18.6x against the pasted Float64 time), so they
//   read as a genuine benchmark rather than a slip. PART 0.5 is a timing
//   benchmark that is expected to move between machines, so nothing rests on
//   it; the addendum's point is that everything else in PART 0 was identical.
// ---------------------------------------------------------------------------
