#!/usr/bin/env node
// ============================================================================
// ENGINE 0830 — THE @43 ARITHMETIC CEILING: the K-30 natal march with every
// path that leaves 2^53 at W = 43# promoted to exact BigInt, gated against the
// record at @7..@37 and against the @41 progress ticks, and the @43 march
// priced from a measured slice   (2026-08-30; TODO item 1)
// ============================================================================
//
// THE OBJECT. beta(x) = S(x)/E(x): S(x) is the exact count of natal positions
// r = 11, 17 (mod 30) in [0, W), W = x#, that survive every strike r = 0, -2
// (mod p) for 7 <= p <= x (the mids) and every strike by the scour primes
// x < q <= floor sqrt W; E(x) = (2/30) W prod(1-2/p) prod(1-2/q) is the
// independence value. The record engine is research/natal-cap-37-at41-march.js
// (the K-30 engine), whose PART 0 audit lists fourteen arithmetic paths and
// finds every one exact in a double at @41 because W < 2^53, and finds that
// at @43 W = 43# = 1.3083e16 = 1.45 x 2^53, so the CRT anchoring product
// c0 = ((a-b) mod q) * inv30(q), bounded by q^2 <= W, leaves the exact range.
//
// WHAT THIS FILE DOES. It is a NEW producer, since the record engine may not be
// edited. The march kernel (wheel prefix, strike loop, SWAR census, sampling)
// is copied from the record engine unchanged. What changes is the arithmetic
// AROUND the kernel, path by path, in the record's own lettering:
//   A  W = x#                      BigInt; the double copy is checked exact
//   B  sqrt bracket                BigInt integer square root
//   C  y-depth assert q^2 <= W+1   BigInt
//   F  CRT anchor c0               BigInt product mod q, stored as a double
//                                  (the result is < q < 2^31, exact)
//   M  position rebuild 30k + b    BigInt for every position that leaves the
//                                  march (first, sampled, last survivors)
// Paths D, E, G..L, N stay doubles, and PART 0 prints their @43 worst cases
// so the reader can see they remain below 2^53 (E's extended-Euclid
// coefficients are bounded by the modulus, not by its square).
//
// CUSTODY. PART 1 re-runs the record's gates on this code path: @7..@29 and
// @31 serially, @37 through eight shards, every S, N, E, beta, scour census,
// y, first and last survivor against the record; then a SLICE of @41 (the
// first 6000 blocks of shard 0) against the three progress ticks the record
// embeds, and @41's first five survivors. The full @41 march is 6.035 h of
// eight cores in the record and is NOT re-run here.
//
// COST. PART 3 marches equal spans of @41 and @43 back to back, interleaved,
// and prints the strike budgets 4 M sum 1/q for both levels on stdout. Every
// wall-clock figure goes to STDERR only; the embed captures both streams.
//
//   node research/history/staging/engine-0830-at43-bigint.js           (full, the embedded run)
//   node research/history/staging/engine-0830-at43-bigint.js quick                 (@7..@29 only)
//   node research/history/staging/engine-0830-at43-bigint.js probe x lg nblocks    (one serial span; rate on stderr)
//   node research/history/staging/engine-0830-at43-bigint.js shard x i n [dir] [sampleEvery] [prog]
//   node research/history/staging/engine-0830-at43-bigint.js combine x n [dir]
// ============================================================================
'use strict';
const fs=require('fs'), os=require('os'), path=require('path');

const T00=Date.now();
const prog=s=>process.stderr.write(s+'\n');
function assert(c,m){if(!c)throw new Error('ASSERT FAIL: '+m)}
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const GAMMA=0.5772156649015329, LIMITC=Math.exp(2*GAMMA)/4;
const TWO53=2**53, TWO53B=2n**53n;
const SCRATCH='/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/0f608a0e-7eed-4c6c-97b0-cc359d83448b/scratchpad/at43';

// ---- the level ladder (BigInt primorials; the record's table is the check) --
const LEVELS=[7,11,13,17,19,23,29,31,37,41,43,47];
const REC_PRIMORIAL={7:210,11:2310,13:30030,17:510510,19:9699690,23:223092870,
  29:6469693230,31:200560490130,37:7420738134810,41:304250263527210};   // natal-cap-37 PRIMORIAL table
function isqrtBig(n){if(n<2n)return n;let x=BigInt(Math.floor(Math.sqrt(Number(n))));
  while(x*x>n)x--;while((x+1n)*(x+1n)<=n)x++;return x}

let PR=null,PRLIM=0;
function primeTable(lim){if(!PR||PRLIM<lim){const t=Date.now();PR=primesUpTo(lim);PRLIM=lim;
  prog(`[prime table to ${lim}: ${PR.length} primes, ${((Date.now()-t)/1000).toFixed(2)}s]`)}return PR}

// ---- modular helpers ---------------------------------------------------------
// invMod(30,q): every coefficient s_i of the extended Euclid satisfies
// |s_i| <= q, and each product q_i*s_i is bounded by |s_{i+1}| + |s_{i-1}|
// <= 2q, so the whole routine stays below 2^53 for q < 2^52. Exact.
function invMod(a,m){let r0=((a%m)+m)%m,r1=m,s0=1,s1=0;
  while(r1){const q=Math.floor(r0/r1);const t0=r0-q*r1;r0=r1;r1=t0;const t1=s0-q*s1;s0=s1;s1=t1}
  assert(r0===1,'invMod: not coprime');return((s0%m)+m)%m}
// PATH F, promoted: the CRT anchor ((a-b) mod q) * inv30(q) mod q in BigInt.
function anchorClass(a,b,q,iv){const qb=BigInt(q);
  const r=(((BigInt(a)-BigInt(b))%qb)+qb)%qb;return Number(r*BigInt(iv)%qb)}

// ---- Miller-Rabin, 13 bases, deterministic for n < 3.317e24 (record engine) --
const MRB=[2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n,41n];
function mpow(b,e,n){let r=1n;b%=n;while(e>0n){if(e&1n)r=r*b%n;b=b*b%n;e>>=1n}return r}
function mrCore(n){let d=n-1n,s=0;while((d&1n)===0n){d>>=1n;s++}
  outer:for(const a of MRB){let y=mpow(a,d,n);if(y===1n||y===n-1n)continue;
    for(let i=1;i<s;i++){y=y*y%n;if(y===n-1n)continue outer}return false}
  return true}
function isPrimeMR(x){const n=BigInt(x);if(n<2n)return false;
  for(const p of MRB){if(n%p===0n)return n===p}return mrCore(n)}
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
// LEVEL SPEC — paths A, B, C, F in BigInt; everything else as the record
// ============================================================================
function levelSpec(x){
  // A: the primorial, exact
  const smallP=[7,11,13,17,19,23,29,31,37,41,43,47].filter(p=>p<=x);
  let WB=30n;for(const p of smallP)WB*=BigInt(p);
  if(REC_PRIMORIAL[x]!==undefined)assert(BigInt(REC_PRIMORIAL[x])===WB,`W(${x}) disagrees with the record table`);
  const W=Number(WB), wExact=(BigInt(W)===WB);
  // B: the square-root bracket, exact
  const sqB=isqrtBig(WB), sq=Number(sqB);assert(sq<TWO53,'sqrt W exceeds 2^53');
  const P=primeTable(sq+1);
  const mids=P.filter(p=>p>=7&&p<=x);assert(mids.length===smallP.length,'mids');
  const scour=P.filter(q=>q>x&&q<=sq), ns=scour.length, y=scour[ns-1];
  // C: no prime hides in (y, sqrt(W+1)] — in BigInt
  {const above=P.filter(q=>q>y);for(const q of above)assert(BigInt(q)*BigInt(q)>WB+1n,`prime ${q} hides in (y, sqrt(W+1)] at @${x}`);
   assert((sqB+1n)*(sqB+1n)>WB+1n,'bracket');}
  let N=2;for(const p of mids)N*=p-2;assert(N<TWO53,'N exceeds 2^53');
  assert(WB%30n===0n,'W not a multiple of 30');const M=Number(WB/30n);assert(M<TWO53,'M exceeds 2^53');
  // F: the class tables, anchors in BigInt
  const mk=(list,b)=>{const n=list.length,step=new Int32Array(2*n),c0=new Float64Array(2*n);
    let j=0;for(let i=0;i<n;i++){const q=list[i],iv=invMod(30,q);
      assert((30*iv)%q===1,'inv30 wrong');                 // 30*iv < 2^53: an exact check
      for(const a of[0,q-2]){step[j]=q;c0[j]=anchorClass(a,b,q,iv);j++}}
    return{step,c0,m:2*n}};
  const t=Date.now();
  const MT=[mk(mids,11),mk(mids,17)], ST=[mk(scour,11),mk(scour,17)];
  prog(`[@${x} class tables: ${2*(MT[0].m+ST[0].m)} entries in BigInt, ${((Date.now()-t)/1000).toFixed(2)}s]`);
  // E: plain double in the record's exact evaluation order
  let prod=1;for(const p of mids)prod*=1-2/p;for(const q of scour)prod*=1-2/q;
  const E=(2/30)*prod*W, s1q=scour.reduce((a,q)=>a+1/q,0);
  return{x,W,WB,wExact,M,mids,scour,ns,q0:scour[0],y,sq,N,MT,ST,E,prod,s1q};
}
function exactE(sp,SB){const S=1n<<BigInt(SB);let acc=S*2n/30n;
  for(const p of sp.mids)acc=acc*BigInt(p-2)/BigInt(p);
  for(const q of sp.scour)acc=acc*BigInt(q-2)/BigInt(q);
  acc*=sp.WB;const sh=BigInt(SB)-53n;const hi=acc>>sh;return Number(hi)/2**53}

// ---- the tiled natal wheel (record engine PART 0.7, verbatim) --------------
function wheelSplit(mids,cap){const w=[];let per=1;
  for(const p of mids){if(per*p>cap)break;per*=p;w.push(p)}
  return{w,per,rest:mids.filter(p=>!w.includes(p))}}
function buildPattern(w,per,b){const pat=new Uint8Array(per).fill(1);
  for(const p of w){const iv=invMod(30,p);
    for(const a of[0,p-2]){const m0=anchorClass(a,b,p,iv);
      for(let m=m0;m<per;m+=p)pat[m]=0}}
  return pat}
function midsTable(list,b){const n=list.length,step=new Int32Array(2*n),c0=new Float64Array(2*n);
  let j=0;for(let i=0;i<n;i++){const q=list[i],iv=invMod(30,q);
    for(const a of[0,q-2]){step[j]=q;c0[j]=anchorClass(a,b,q,iv);j++}}
  return{step,c0,m:2*n}}
// PATH M, promoted: a position that leaves the march is a BigInt
const pos=(k,b)=>30n*BigInt(k)+BigInt(b);

// --- the march over one contiguous k-range [kA,kB): the record's kernel ------
function marchRange(sp,kA,kB,opt){
  const KB=Math.min(opt.blockK|0,kB-kA), ALLOC=(KB+3)&~3;
  const A=new Uint8Array(ALLOC),B=new Uint8Array(ALLOC);
  const UA=new Uint32Array(A.buffer),UB=new Uint32Array(B.buffer);
  const nlanes=[A,B];
  const WH=opt.noWheel?null:wheelSplit(sp.mids,KB);
  const PAT=WH?[buildPattern(WH.w,WH.per,11),buildPattern(WH.w,WH.per,17)]:null;
  const MTAB=WH?[midsTable(WH.rest,11),midsTable(WH.rest,17)]:sp.MT;
  // G: kA % q with kA < M < 2^53 is an exact IEEE remainder
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
        let o=kb%per,pos_=0;
        while(pos_<len){const n=Math.min(per-o,len-pos_);
          arr.set(pat.subarray(o,o+n),pos_);pos_+=n;o=0}}}
    else{A.fill(1,0,len);B.fill(1,0,len)}
    for(const L of[0,1])strike(MTAB[L],MN[L],nlanes[L],kb,len);
    {const nw=len>>2;let c=0;
     for(let w=0;w<nw;w++){c+=(Math.imul(UA[w],0x01010101)>>>24)+(Math.imul(UB[w],0x01010101)>>>24)}
     for(let i=nw<<2;i<len;i++)c+=A[i]+B[i];
     np+=c}
    for(const L of[0,1])strike(sp.ST[L],SN[L],nlanes[L],kb,len);
    {const nw=len>>2;
     for(let w=0;w<nw;w++){
       const inc=(Math.imul(UA[w],0x01010101)>>>24)+(Math.imul(UB[w],0x01010101)>>>24);
       if(inc){
         if(S+inc>=nextSamp||firsts.length<5){
           const base=kb+(w<<2);
           for(let t=0;t<4;t++){const k=base+t,i=(w<<2)+t;
             if(A[i]){S++;if(firsts.length<5)firsts.push(pos(k,11));if(S>=nextSamp){samples.push(pos(k,11));nextSamp=S+opt.sampleEvery}}
             if(B[i]){S++;if(firsts.length<5)firsts.push(pos(k,17));if(S>=nextSamp){samples.push(pos(k,17));nextSamp=S+opt.sampleEvery}}}
         }else S+=inc}
     }
     for(let i=nw<<2;i<len;i++){const k=kb+i;
       if(A[i]){S++;if(firsts.length<5)firsts.push(pos(k,11));if(S>=nextSamp){samples.push(pos(k,11));nextSamp=S+opt.sampleEvery}}
       if(B[i]){S++;if(firsts.length<5)firsts.push(pos(k,17));if(S>=nextSamp){samples.push(pos(k,17));nextSamp=S+opt.sampleEvery}}}
    }
    if(kb+len>=kB){lastbuf.length=0;
      for(let i=len-1;i>=0&&lastbuf.length<3;i--){const k=kb+i;
        if(B[i])lastbuf.push(pos(k,17));if(lastbuf.length<3&&A[i])lastbuf.push(pos(k,11))}
      lastbuf.reverse()}
    if(opt.onTick&&opt.tickEvery&&blk%opt.tickEvery===0)opt.onTick(blk,np,S);
    if(opt.progEvery&&blk%opt.progEvery===0){
      const f=(kb+len-kA)/(kB-kA),sec=(Date.now()-T00)/1000;
      prog(` ${opt.tag||''} blk ${blk}/${nblk} ${(100*f).toFixed(2)}% np=${np} S=${S} [${sec.toFixed(0)}s, eta ${(sec/f-sec).toFixed(0)}s]`)}
  }
  return{np,S,firsts,last3:lastbuf,samples};
}
function march(sp,opt){const r=marchRange(sp,0,sp.M,opt);
  return{x:sp.x,W:sp.W,N:r.np,S:r.S,ns:sp.ns,q0:sp.q0,y:sp.y,E:sp.E,R:r.S/sp.E,firsts:r.firsts,last3:r.last3,samples:r.samples}}
const pair=r=>`(${r},${r+2n})`;

// ============================================================================
// SHARDS (for the box: shard x i n [dir]; combine x n [dir])
// ============================================================================
const BLOCKK=1<<22;
function shardRange(M,i,n){return[Math.floor(M*i/n),Math.floor(M*(i+1)/n)]}
function shardFile(dir,x,n,i){return path.join(dir,`e0830-x${x}-of${n}-${i}.json`)}
function runShard(x,i,n,dir,sampleEvery,progEvery){
  fs.mkdirSync(dir,{recursive:true});
  const sp=levelSpec(x),[kA,kB]=shardRange(sp.M,i,n),t=Date.now();
  const r=marchRange(sp,kA,kB,{blockK:BLOCKK,sampleEvery,progEvery,tag:`@${x} shard${i}`});
  const secs=(Date.now()-t)/1000;
  fs.writeFileSync(shardFile(dir,x,n,i),JSON.stringify({x,n,i,kA,kB,np:r.np,S:r.S,
    firsts:r.firsts.map(String),last3:r.last3.map(String),samples:r.samples.map(String),secs,
    node:process.version,cpu:os.cpus()[0].model}));
  prog(` shard ${i}/${n} @${x} k[${kA},${kB}) np=${r.np} S=${r.S} in ${secs.toFixed(1)}s`);
  return r}
function foldShards(x,n,dir){
  const sp=levelSpec(x);let np=0,S=0,secs=0;const parts=[];
  for(let i=0;i<n;i++){const p=JSON.parse(fs.readFileSync(shardFile(dir,x,n,i),'utf8'));
    assert(p.x===x&&p.i===i&&p.n===n,'shard file identity');
    const[a,b]=shardRange(sp.M,i,n);assert(p.kA===a&&p.kB===b,`shard ${i} range drift`);
    np+=p.np;S+=p.S;secs=Math.max(secs,p.secs);parts.push(p)}
  assert(np<TWO53&&S<TWO53,'fold exceeds 2^53');
  const samples=[].concat(...parts.map(p=>p.samples.map(BigInt)));
  return{x,W:sp.W,N:np,S,ns:sp.ns,q0:sp.q0,y:sp.y,E:sp.E,R:S/sp.E,sp,
         firsts:parts[0].firsts.map(BigInt),last3:parts[n-1].last3.map(BigInt),samples,secs,parts}}
function spawnShards(x,n,dir,sampleEvery){
  const{spawn}=require('child_process');
  return new Promise((res,rej)=>{let done=0,bad=0;
    for(let i=0;i<n;i++){
      const c=spawn(process.execPath,[__filename,'shard',String(x),String(i),String(n),dir,String(sampleEvery)],
                    {stdio:['ignore','ignore','inherit']});
      c.on('exit',code=>{if(code!==0)bad++;if(++done===n)bad?rej(new Error(`${bad} shard(s) failed at @${x}`)):res()})}})}
function combineReport(x,n,dir){
  console.log(`\n===== THE @${x} POINT — folding ${n} shards from ${dir} =====`);
  const L=foldShards(x,n,dir),sp=L.sp;
  let nn=2;for(const p of sp.mids)nn*=p-2;assert(L.N===nn,`natal census ${L.N} != 2*prod(p-2) = ${nn}`);
  console.log(` W = ${sp.WB}; sqrt W = ${sp.sq}; scour = ${L.ns} primes (${L.q0}..${L.y}); no prime in (y, sqrt(W+1)] (BigInt)`);
  console.log(` @${x}: N = ${L.N} = 2*prod(p-2) exact;  S = ${L.S};  E = ${L.E.toFixed(1)};  S/E = beta(${x}) = ${L.R.toFixed(4)}`);
  const Ex=exactE(sp,256);
  console.log(` E cross-check: BigInt 2^256 fixed point gives ${Ex.toFixed(1)} (relative ${(Math.abs(sp.E-Ex)/Ex).toExponential(2)}); beta on that E = ${(L.S/Ex).toFixed(4)}`);
  const test=[...L.firsts,...L.samples,...L.last3];
  for(const r of test)assert(isPrimeBPSW(r)&&isPrimeBPSW(r+2n),`survivor ${r} is not a twin pair`);
  console.log(` VERIFIED: ${test.length} sampled survivors are all twin pairs (13-base MR + strong Lucas), positions in BigInt`);
  console.log(` first survivors: ${L.firsts.map(pair).join(' ')}`);
  console.log(` last survivors:  ${L.last3.map(pair).join(' ')}`);
  prog(` per-shard wall (s): ${L.parts.map(p=>p.secs.toFixed(0)).join(' ')}`);
  if(x===43)score43(L.R);
  return L}

// ---- the @43 forecast on record, re-derived from its formula ---------------
const REC_BETA={7:1.1556,11:1.1458,13:1.0089,17:0.9549,19:0.9261,23:0.8930,29:0.8752,31:0.8626,37:0.8530};
const REC_S41=256725962834;      // natal-cap-37-at41-march.js OUTPUT [R], the @41 fold
function classical(WB){const l=Math.log(Number(WB));return LIMITC*(1+2/l+6/(l*l))}
function forecast43(){
  const sp41=levelSpec(41);const b41=REC_S41/sp41.E, c41=classical(sp41.WB);
  let W43=sp41.WB*43n;const c43=classical(W43);
  return{b41,c41,c43,persist:c43+b41-c41,W43,E41:sp41.E}}
function score43(beta43){const f=forecast43();
  console.log(`\n FORECASTS ON RECORD for @43 (natal-cap-37-at41-march.js OUTPUT [R], last line): classical-raw ${f.c43.toFixed(4)} | persisted ${f.persist.toFixed(4)}; no band was registered`);
  console.log(` MEASURED beta(43) = ${beta43.toFixed(4)}; misses: raw ${(beta43-f.c43>=0?'+':'')+(beta43-f.c43).toFixed(4)} | persisted ${(beta43-f.persist>=0?'+':'')+(beta43-f.persist).toFixed(4)}; residual on the classical curve ${(beta43-f.c43>=0?'+':'')+(beta43-f.c43).toFixed(4)}`)}

// ============================================================================
// PART 0 — the 2^53 audit at @43, in BigInt
// ============================================================================
function audit43(){
  console.log('===== PART 0: the 2^53 audit at @43, worst cases in BigInt =====');
  const sp=levelSpec(43);const q=sp.y,qB=BigInt(q),M=sp.M;
  console.log(` 2^53 = ${TWO53B};  W(43) = 43# = ${sp.WB} = ${(Number(sp.WB)/TWO53).toFixed(4)} x 2^53;  double(W) exact: ${sp.wExact?'YES':'NO'} (43# is even and below 2^54)`);
  console.log(` M = W/30 = ${M} = ${(M/TWO53).toExponential(2)} x 2^53;  floor sqrt W = ${sp.sq};  scour ${sp.ns} primes (${sp.q0}..${sp.y});  N = ${sp.N}`);
  const rows=[
   ['A  W = 43#',                             sp.WB,                        'BigInt'],
   ['B  sqrt bracket (sq+1)^2',               (BigInt(sp.sq)+1n)**2n,       'BigInt'],
   ['C  y-depth  q*q <= W+1',                 qB*qB,                        'BigInt'],
   ['D  N = 2*prod(p-2)',                     BigInt(sp.N),                 'double'],
   ['E  invMod(30,q): q_i*s_i <= 2q',         2n*qB,                        'double'],
   ['F  CRT anchor ((a-b) mod q)*inv30(q)',   (qB-1n)*(qB-1n),              'BigInt, result < q stored as double'],
   ['G  shard anchor kA % q',                 BigInt(M),                    'double'],
   ['H  absolute cursor kb + i',              BigInt(M)+qB,                 'double'],
   ['I  block offset (nx-kb)|0 < blockK+q',   BigInt(BLOCKK)+qB,            'Int32'],
   ['J  stride step[j] = q',                  qB,                           'Int32'],
   ['K  natal census np',                     BigInt(sp.N),                 'double'],
   ['L  survivor accumulator S (<= N)',       BigInt(sp.N),                 'double'],
   ['M  position 30k + 17',                   sp.WB-13n,                    'BigInt'],
   ['N  SWAR byte count',                     4n,                           'double']];
  console.log('\n path                                     | worst result          | /2^53    | fits double | held as');
  for(const[n,r,how]of rows)
    console.log(` ${n.padEnd(41)}| ${String(r).padStart(21)} | ${(Number(r)/TWO53).toExponential(1).padStart(8)} | ${r<TWO53B?'YES':'NO '}         | ${how}`);
  console.log(` Int32 paths against 2^31 = ${2**31}: I ${BLOCKK+q} (${((BLOCKK+q)/2**31*100).toFixed(1)}%), J ${q} (${(q/2**31*100).toFixed(1)}%)`);
  console.log(` paths leaving 2^53 at @43: A, B, C, F, M — all held in BigInt above; every double path stays below 2^53.`);
  // F re-derived for every scour class in the record engine's own double formula, both lanes
  {let bad=0,first=null,over=0,tot=0;
   for(const L of[0,1]){const b=L?17:11,tab=sp.ST[L];
     for(let j=0;j<tab.m;j++){const qq=tab.step[j],iv=invMod(30,qq),a=(j&1)?qq-2:0;
       const r=((a-b)%qq+qq)%qq;tot++;if(r*iv>=TWO53)over++;
       const dbl=r*iv%qq;                                  // the record's path F in doubles
       if(dbl!==tab.c0[j]){bad++;if(first===null)first=qq}}}
   console.log(` path F in the record's double arithmetic, all ${tot} scour classes at @43: ${over} products exceed 2^53, ${bad} disagree with BigInt${bad?` (first at q = ${first})`:''}`);
   console.log(`   (a-b is q-11, q-13, q-17 or q-19, even for every odd q, so each product is an EVEN integer below 2^54 = ${2n**54n} and is exactly representable:`);
   console.log(`   the record's path F is exact at @43 by parity, not by magnitude; 47# = ${sp.WB*47n} exceeds 2^54 and the accident ends there)`);}
  // M: an odd position above 2^53 is not representable in a double
  {const k0=Math.ceil((TWO53-17)/30);const ex=30n*BigInt(k0)+17n,dbl=30*k0+17;
   console.log(` path M in doubles: positions 30k+17 exceed 2^53 from k = ${k0} on, ${((M-k0)/M*100).toFixed(1)}% of the @43 tile; e.g. k = ${k0}: BigInt ${ex}, double ${BigInt(dbl)} (off by ${ex-BigInt(dbl)}) — every sampled survivor there would be misreported and fail its twin check`);}
  // E: the double product against the exact reference
  const Ex=exactE(sp,256);
  console.log(` E(43): double ${sp.E.toFixed(1)}  exact 2^256 fixed point ${Ex.toFixed(1)}  relative ${(Math.abs(sp.E-Ex)/Ex).toExponential(2)}`);
  return sp}

// ============================================================================
// PART 1 — custody gates on this code path
// ============================================================================
const REF=[
 {x:7, S:8,        N:10,        R:'1.1556', ns:2,    q0:11, y:13},
 {x:11,S:45,       N:90,        R:'1.1458', ns:10,   q0:13, y:47},
 {x:13,S:307,      N:990,       R:'1.0089', ns:34,   q0:17, y:173},
 {x:17,S:3099,     N:14850,     R:'0.9549', ns:120,  q0:19, y:709},
 {x:19,S:38380,    N:252450,    R:'0.9261', ns:435,  q0:23, y:3109},
 {x:23,S:597475,   N:5301450,   R:'0.8930', ns:1739, q0:29, y:14929},
 {x:29,S:12307838, N:143139150, R:'0.8752', ns:7863, q0:31, y:80429}];
// natal-cap-37-at41-march.js OUTPUT [R]: the eight @37 shard lines, shard order 0..7
const REC37={S:7998394865,N:145286237250,E:'9377228928.8',B:'0.8530',ns:198274,y:2724079,
  np:[18160779684,18160779575,18160779735,18160779630,18160779631,18160779736,18160779575,18160779684],
  Ssh:[1163355201,1045856786,1007715878,984039173,966970305,953722322,942960670,933774530],
  first:'2725001',last:'7420738134527'};
const REC31={S:283449187,N:4151035350,E:'328601798.6',B:'0.8626',ns:37534,y:447829,first:'448157',last:'200560488827'};
// natal-cap-37-at41-march.js OUTPUT [R]: shard-0 progress ticks at @41 (blockK 2^22, kA = 0)
const REC41_TICKS=[[2000,4686722957,349203305],[4000,9373445779,661452618],[6000,14060168660,961752168]];
const REC41_FIRST=['17442827','17443091','17443301','17443661','17443961'];
async function gates(){
  console.log('\n===== PART 1: CUSTODY GATES — the BigInt-promoted path must reproduce the record =====');
  console.log('--- gate 0: @7..@29 serial, digit for digit ---');
  for(const r of REF){const sp=levelSpec(r.x),L=march(sp,{blockK:BLOCKK});
    console.log(` @${String(r.x).padStart(2)}: W=${String(L.W).padStart(10)} N=${String(L.N).padStart(9)} scour ${String(L.ns).padStart(4)} (${L.q0}..${L.y}) S=${String(L.S).padStart(8)} E=${L.E.toFixed(1)} beta=${L.R.toFixed(4)}`);
    assert(L.S===r.S&&L.N===r.N&&L.R.toFixed(4)===r.R&&L.ns===r.ns&&L.q0===r.q0&&L.y===r.y,`custody mismatch @${r.x}`)}
  console.log(' GATE 0 PASSED: seven levels, S / N / E / beta / scour census / y all match the record');
  console.log('\n--- gate 1: @31 serial ---');
  {const t=Date.now();const sp=levelSpec(31),L=march(sp,{blockK:BLOCKK,sampleEvery:1e7});prog(`[gate 1 @31 serial ${((Date.now()-t)/1000).toFixed(1)}s]`);
   console.log(` @31: N=${L.N}  S=${L.S}  E=${L.E.toFixed(1)}  beta=${L.R.toFixed(4)}  scour ${L.ns} (${L.q0}..${L.y})  first ${L.firsts[0]}  last ${L.last3[2]}`);
   assert(L.S===REC31.S&&L.N===REC31.N&&L.E.toFixed(1)===REC31.E&&L.R.toFixed(4)===REC31.B&&L.ns===REC31.ns&&L.y===REC31.y&&String(L.firsts[0])===REC31.first&&String(L.last3[2])===REC31.last,'GATE 1 FAILED');
   for(const r of[...L.firsts,...L.samples,...L.last3])assert(isPrimeBPSW(r)&&isPrimeBPSW(r+2n),'@31 survivor not a twin');
   console.log(` GATE 1 PASSED: S(31) = ${L.S} exactly; N, E, beta, scour, y, first and last survivor match; ${L.firsts.length+L.samples.length+L.last3.length} sampled survivors are twins`)}
  console.log('\n--- gate 2: @37 through the sharded path (8 shards), per-shard np and S against the record ---');
  {const dir=path.join(SCRATCH,'gates');const t=Date.now();await spawnShards(37,8,dir,1e8);prog(`[gate 2 @37 8 shards wall ${((Date.now()-t)/1000).toFixed(1)}s]`);
   const L=foldShards(37,8,dir);
   for(let i=0;i<8;i++){const p=L.parts[i];console.log(` shard ${i}: k[${p.kA},${p.kB}) np=${p.np} S=${p.S}  record np=${REC37.np[i]} S=${REC37.Ssh[i]}  ${p.np===REC37.np[i]&&p.S===REC37.Ssh[i]?'match':'MISMATCH'}`);
     assert(p.np===REC37.np[i]&&p.S===REC37.Ssh[i],`@37 shard ${i} differs from the record`)}
   console.log(` @37: N=${L.N}  S=${L.S}  E=${L.E.toFixed(1)}  beta=${L.R.toFixed(4)}  scour ${L.ns} (${L.q0}..${L.y})  first ${L.firsts[0]}  last ${L.last3[2]}`);
   assert(L.S===REC37.S&&L.N===REC37.N&&L.E.toFixed(1)===REC37.E&&L.R.toFixed(4)===REC37.B&&L.ns===REC37.ns&&L.y===REC37.y&&String(L.firsts[0])===REC37.first&&String(L.last3[2])===REC37.last,'GATE 2 FAILED');
   for(const r of[...L.firsts,...L.samples,...L.last3])assert(isPrimeBPSW(r)&&isPrimeBPSW(r+2n),'@37 survivor not a twin');
   console.log(` GATE 2 PASSED: S(37) = ${L.S} exactly through the sharded path; ${L.firsts.length+L.samples.length+L.last3.length} sampled survivors are twins`)}
  console.log('\n--- gate 3: a SLICE of @41 — shard 0, blocks 1..6000 of 302246, against the record\'s progress ticks ---');
  {const sp=levelSpec(41);const t=Date.now();const ticks=[];
   const r=marchRange(sp,0,6000*BLOCKK,{blockK:BLOCKK,tickEvery:2000,onTick:(b,np,S)=>ticks.push([b,np,S])});
   prog(`[gate 3 @41 slice 6000 blocks serial ${((Date.now()-t)/1000).toFixed(1)}s]`);
   for(let i=0;i<3;i++){const[b,np,S]=ticks[i],[rb,rnp,rS]=REC41_TICKS[i];
     console.log(` blk ${b}: np=${np} S=${S}   record blk ${rb}: np=${rnp} S=${rS}   ${b===rb&&np===rnp&&S===rS?'match':'MISMATCH'}`);
     assert(b===rb&&np===rnp&&S===rS,'GATE 3 FAILED: @41 tick differs')}
   console.log(` first survivors: ${r.firsts.map(pair).join(' ')}`);
   assert(r.firsts.map(String).join()===REC41_FIRST.join(),'GATE 3 FAILED: @41 first survivors differ');
   console.log(` GATE 3 PASSED: np and S agree with the record at all three ticks (${(6000*BLOCKK/sp.M*100).toFixed(3)}% of the @41 tile), and the first five survivors match`)}
}

// ============================================================================
// PART 3 — the price of @43, from equal spans marched back to back
// ============================================================================
function cost(sp43){
  console.log('\n===== PART 3: the strike budgets, and equal spans of @41 and @43 marched back to back =====');
  const sp41=levelSpec(41);
  const bud=sp=>4*sp.M*sp.s1q;
  console.log(` @41: M = ${sp41.M}  scour ${sp41.ns} primes  sum 1/q = ${sp41.s1q.toFixed(6)}  strike budget 4 M sum 1/q = ${bud(sp41).toExponential(4)}`);
  console.log(` @43: M = ${sp43.M}  scour ${sp43.ns} primes  sum 1/q = ${sp43.s1q.toFixed(6)}  strike budget 4 M sum 1/q = ${bud(sp43).toExponential(4)}`);
  console.log(` ratio of strike budgets @43/@41 = ${(bud(sp43)/bud(sp41)).toFixed(3)};  ratio of tiles M43/M41 = ${(sp43.M/sp41.M).toFixed(3)};  TODO item 1 says "~13x"`);
  console.log(` cursor entries scanned per block per lane: @41 ${sp41.ST[0].m} (${(sp41.ST[0].m/BLOCKK).toFixed(2)} per cell)  @43 ${sp43.ST[0].m} (${(sp43.ST[0].m/BLOCKK).toFixed(2)} per cell)`);
  const SPAN=1<<27;const res={41:[],43:[]};
  for(let rep=0;rep<3;rep++)for(const sp of[sp41,sp43]){
    const kA=Math.floor(sp.M/3),t=Date.now();const r=marchRange(sp,kA,kA+SPAN,{blockK:BLOCKK});
    const s=(Date.now()-t)/1000;res[sp.x].push(s);
    if(rep===0)console.log(` @${sp.x} span ${SPAN} k-cells at k = M/3: np=${r.np} S=${r.S} (strikes on the span ${(4*SPAN*sp.s1q).toExponential(3)})`);
    prog(`[probe rep ${rep} @${sp.x} span 2^27 blockK 2^22: ${s.toFixed(2)}s = ${(4*SPAN*sp.s1q/s/1e6).toFixed(0)}e6 strikes/s]`)}
  const med=a=>[...a].sort((p,q)=>p-q)[1];
  const t41=med(res[41]),t43=med(res[43]),cellRatio=(t43/t41);
  const REC_H=6.035;                 // natal-cap-37 OUTPUT [R]: "all 8 shards returned in 6.035 h"
  const full43=REC_H*(sp43.M/sp41.M)*cellRatio;
  prog(`[median span time @41 ${t41.toFixed(2)}s, @43 ${t43.toFixed(2)}s; per-cell cost ratio @43/@41 = ${cellRatio.toFixed(3)}; per-strike ${(cellRatio*sp41.s1q/sp43.s1q).toFixed(3)}]`);
  prog(`[EXTRAPOLATION: @43 on this machine, 8 shards, = ${REC_H} h x ${(sp43.M/sp41.M).toFixed(2)} (tile) x ${cellRatio.toFixed(3)} (per-cell) = ${full43.toFixed(0)} h wall = ${(full43/24).toFixed(1)} days; x/13 of the @41 record would have been ${(REC_H*13).toFixed(0)} h]`);
  {const kA=Math.floor(sp43.M/3),t=Date.now();marchRange(sp43,kA,kA+SPAN,{blockK:1<<24});const s=(Date.now()-t)/1000;
   prog(`[@43 span 2^27 at blockK 2^24 serial: ${s.toFixed(2)}s against ${t43.toFixed(2)}s at 2^22]`)}
  prog(`[load average at probe time: ${os.loadavg().map(v=>v.toFixed(1)).join(' ')} on ${os.cpus().length} cpus; other agents share this machine]`);
}

// ============================================================================
const MODE=process.argv[2]||'full';
prog(`[engine-0830 mode=${MODE} node ${process.version} ${os.cpus().length} cpus ${os.cpus()[0].model}]`);
if(MODE==='shard')runShard(+process.argv[3],+process.argv[4],+process.argv[5],process.argv[6]||SCRATCH,+process.argv[7]||2e9,process.argv[8]==='prog'?2000:0);
else if(MODE==='quick'){for(const r of REF){const sp=levelSpec(r.x),L=march(sp,{blockK:BLOCKK});
  assert(L.S===r.S&&L.N===r.N&&L.R.toFixed(4)===r.R,`quick mismatch @${r.x}`);console.log(` @${r.x}: S=${L.S} N=${L.N} beta=${L.R.toFixed(4)} first ${L.firsts[0]} last ${L.last3[2]}`)}
  console.log('quick: @7..@29 reproduce the record on the BigInt-promoted path')}
else if(MODE==='combine')combineReport(+process.argv[3],+process.argv[4],process.argv[5]||SCRATCH);
else if(MODE==='full'){(async()=>{
  const sp43=audit43();
  await gates();
  cost(sp43);
  const f=forecast43();
  console.log('\n===== PART 4: the @43 forecast on record, re-derived =====');
  console.log(` beta(41) = S(41)/E(41) = ${REC_S41}/${f.E41.toFixed(1)} = ${f.b41.toFixed(4)};  classical(41) = ${f.c41.toFixed(4)};  residual ${(f.b41-f.c41>=0?'+':'')+(f.b41-f.c41).toFixed(4)}`);
  console.log(` classical(43) = (e^{2 gamma}/4)(1 + 2/lnW + 6/ln^2 W) at W = 43# = ${f.W43}: ${f.c43.toFixed(4)};  persisted = classical(43) + residual(41) = ${f.persist.toFixed(4)}`);
  console.log(` the two forecasts differ by ${(f.persist-f.c43).toFixed(4)}, i.e. ${((f.persist-f.c43)/1e-4).toFixed(1)} units of the fourth decimal in which beta is quoted; no band is registered for either`);
  const res=[7,11,13,17,19,23,29,31,37].map(x=>REC_BETA[x]-classical(BigInt(REC_PRIMORIAL[x])));
  console.log(` classical residuals @23..@41 from the record: ${res.slice(5).map(v=>(v>=0?'+':'')+v.toFixed(4)).join('  ')}  ${(f.b41-f.c41>=0?'+':'')+(f.b41-f.c41).toFixed(4)}`);
  console.log('\nDONE');
})().catch(e=>{console.error('FAILED: '+String(e));process.exit(1)})}
else if(MODE==='probe'){const x=+process.argv[3]||43,lg=+process.argv[4]||22,nb=+process.argv[5]||32;
  const sp=levelSpec(x),KB=2**lg,kA=Math.floor(sp.M/3),kB=Math.min(sp.M,kA+nb*KB);const t=Date.now();
  const r=marchRange(sp,kA,kB,{blockK:KB});const s=(Date.now()-t)/1000,span=kB-kA,rate=4*span*sp.s1q/s;
  console.log(`@${x} blockK=2^${lg} span=${span} np=${r.np} S=${r.S}`);
  prog(`[probe @${x} blockK 2^${lg}: ${s.toFixed(2)}s, ${(rate/1e6).toFixed(0)}e6 strikes/s, full tile serial ${(4*sp.M*sp.s1q/rate/3600).toFixed(1)} h]`)}
else{console.error('modes: full | quick | probe x lg nblocks | shard x i n [dir] [sampleEvery] [prog] | combine x n [dir]');process.exit(2)}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/history/staging/engine-0830-at43-bigint.js
//   invocation:  node research/history/staging/engine-0830-at43-bigint.js
//   code-sha256: b4b645a7bd8db62c4787f9198158ff2af78b68c4fdd0c323cc59eddda5fd53a8
//   out-sha256:  5e40e2e4ced34dba046c736e659eb46c75fd565643f8a18cef412de93b52bec6
//   body-lines:  137
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     1621.4 s
// ============================================================================
// ===== PART 0: the 2^53 audit at @43, worst cases in BigInt =====
//  2^53 = 9007199254740992;  W(43) = 43# = 13082761331670030 = 1.4525 x 2^53;  double(W) exact: YES (43# is even and below 2^54)
//  M = W/30 = 436092044389001 = 4.84e-2 x 2^53;  floor sqrt W = 114379899;  scour 6539362 primes (47..114379879);  N = 232312693362750
//
//  path                                     | worst result          | /2^53    | fits double | held as
//  A  W = 43#                               |     13082761331670030 |   1.5e+0 | NO          | BigInt
//  B  sqrt bracket (sq+1)^2                 |     13082761524010000 |   1.5e+0 | NO          | BigInt
//  C  y-depth  q*q <= W+1                   |     13082756720054641 |   1.5e+0 | NO          | BigInt
//  D  N = 2*prod(p-2)                       |       232312693362750 |   2.6e-2 | YES         | double
//  E  invMod(30,q): q_i*s_i <= 2q           |             228759758 |   2.5e-8 | YES         | double
//  F  CRT anchor ((a-b) mod q)*inv30(q)     |     13082756491294884 |   1.5e+0 | NO          | BigInt, result < q stored as double
//  G  shard anchor kA % q                   |       436092044389001 |   4.8e-2 | YES         | double
//  H  absolute cursor kb + i                |       436092158768880 |   4.8e-2 | YES         | double
//  I  block offset (nx-kb)|0 < blockK+q     |             118574183 |   1.3e-8 | YES         | Int32
//  J  stride step[j] = q                    |             114379879 |   1.3e-8 | YES         | Int32
//  K  natal census np                       |       232312693362750 |   2.6e-2 | YES         | double
//  L  survivor accumulator S (<= N)         |       232312693362750 |   2.6e-2 | YES         | double
//  M  position 30k + 17                     |     13082761331670017 |   1.5e+0 | NO          | BigInt
//  N  SWAR byte count                       |                     4 |  4.4e-16 | YES         | double
//  Int32 paths against 2^31 = 2147483648: I 118574183 (5.5%), J 114379879 (5.3%)
//  paths leaving 2^53 at @43: A, B, C, F, M — all held in BigInt above; every double path stays below 2^53.
//  path F in the record's double arithmetic, all 26157448 scour classes at @43: 644256 products exceed 2^53, 0 disagree with BigInt
//    (a-b is q-11, q-13, q-17 or q-19, even for every odd q, so each product is an EVEN integer below 2^54 = 18014398509481984 and is exactly representable:
//    the record's path F is exact at @43 by parity, not by magnitude; 47# = 614889782588491410 exceeds 2^54 and the accident ends there)
//  path M in doubles: positions 30k+17 exceed 2^53 from k = 300239975158033 on, 31.2% of the @43 tile; e.g. k = 300239975158033: BigInt 9007199254741007, double 9007199254741008 (off by -1) — every sampled survivor there would be misreported and fail its twin check
//  E(43): double 10543790440546.1  exact 2^256 fixed point 10543790440547.8  relative 1.68e-13
//
// ===== PART 1: CUSTODY GATES — the BigInt-promoted path must reproduce the record =====
// --- gate 0: @7..@29 serial, digit for digit ---
//  @ 7: W=       210 N=       10 scour    2 (11..13) S=       8 E=6.9 beta=1.1556
//  @11: W=      2310 N=       90 scour   10 (13..47) S=      45 E=39.3 beta=1.1458
//  @13: W=     30030 N=      990 scour   34 (17..173) S=     307 E=304.3 beta=1.0089
//  @17: W=    510510 N=    14850 scour  120 (19..709) S=    3099 E=3245.5 beta=0.9549
//  @19: W=   9699690 N=   252450 scour  435 (23..3109) S=   38380 E=41441.2 beta=0.9261
//  @23: W= 223092870 N=  5301450 scour 1739 (29..14929) S=  597475 E=669028.8 beta=0.8930
//  @29: W=6469693230 N=143139150 scour 7863 (31..80429) S=12307838 E=14063617.4 beta=0.8752
//  GATE 0 PASSED: seven levels, S / N / E / beta / scour census / y all match the record
//
// --- gate 1: @31 serial ---
//  @31: N=4151035350  S=283449187  E=328601798.6  beta=0.8626  scour 37534 (37..447829)  first 448157  last 200560488827
//  GATE 1 PASSED: S(31) = 283449187 exactly; N, E, beta, scour, y, first and last survivor match; 36 sampled survivors are twins
//
// --- gate 2: @37 through the sharded path (8 shards), per-shard np and S against the record ---
//  shard 0: k[0,30919742228) np=18160779684 S=1163355201  record np=18160779684 S=1163355201  match
//  shard 1: k[30919742228,61839484456) np=18160779575 S=1045856786  record np=18160779575 S=1045856786  match
//  shard 2: k[61839484456,92759226685) np=18160779735 S=1007715878  record np=18160779735 S=1007715878  match
//  shard 3: k[92759226685,123678968913) np=18160779630 S=984039173  record np=18160779630 S=984039173  match
//  shard 4: k[123678968913,154598711141) np=18160779631 S=966970305  record np=18160779631 S=966970305  match
//  shard 5: k[154598711141,185518453370) np=18160779736 S=953722322  record np=18160779736 S=953722322  match
//  shard 6: k[185518453370,216438195598) np=18160779575 S=942960670  record np=18160779575 S=942960670  match
//  shard 7: k[216438195598,247357937827) np=18160779684 S=933774530  record np=18160779684 S=933774530  match
//  @37: N=145286237250  S=7998394865  E=9377228928.8  beta=0.8530  scour 198274 (41..2724079)  first 2725001  last 7420738134527
//  GATE 2 PASSED: S(37) = 7998394865 exactly through the sharded path; 84 sampled survivors are twins
//
// --- gate 3: a SLICE of @41 — shard 0, blocks 1..6000 of 302246, against the record's progress ticks ---
//  blk 2000: np=4686722957 S=349203305   record blk 2000: np=4686722957 S=349203305   match
//  blk 4000: np=9373445779 S=661452618   record blk 4000: np=9373445779 S=661452618   match
//  blk 6000: np=14060168660 S=961752168   record blk 6000: np=14060168660 S=961752168   match
//  first survivors: (17442827,17442829) (17443091,17443093) (17443301,17443303) (17443661,17443663) (17443961,17443963)
//  GATE 3 PASSED: np and S agree with the record at all three ticks (0.248% of the @41 tile), and the first five survivors match
//
// ===== PART 3: the strike budgets, and equal spans of @41 and @43 marched back to back =====
//  @41: M = 10141675450907  scour 1117909 primes  sum 1/q = 1.458276  strike budget 4 M sum 1/q = 5.9157e+13
//  @43: M = 436092044389001  scour 6539362 primes  sum 1/q = 1.541874  strike budget 4 M sum 1/q = 2.6896e+15
//  ratio of strike budgets @43/@41 = 45.465;  ratio of tiles M43/M41 = 43.000;  TODO item 1 says "~13x"
//  cursor entries scanned per block per lane: @41 2235818 (0.53 per cell)  @43 13078724 (3.12 per cell)
//  @41 span 134217728 k-cells at k = M/3: np=74987636 S=3410565 (strikes on the span 7.829e+8)
//  @43 span 134217728 k-cells at k = M/3: np=71499862 S=2735327 (strikes on the span 8.278e+8)
//
// ===== PART 4: the @43 forecast on record, re-derived =====
//  beta(41) = S(41)/E(41) = 256725962834/303627067641.7 = 0.8455;  classical(41) = 0.8449;  residual +0.0006
//  classical(43) = (e^{2 gamma}/4)(1 + 2/lnW + 6/ln^2 W) at W = 43# = 13082761331670030: 0.8393;  persisted = classical(43) + residual(41) = 0.8399
//  the two forecasts differ by 0.0006, i.e. 6.4 units of the fourth decimal in which beta is quoted; no band is registered for either
//  classical residuals @23..@41 from the record: +0.0046  +0.0026  +0.0016  +0.0010  +0.0006
//
// DONE
// ───── stderr ─────
// [engine-0830 mode=full node v22.21.0 10 cpus Apple M1 Max]
// [prime table to 114379900: 6539376 primes, 1.48s]
// [@43 class tables: 26157492 entries in BigInt, 6.41s]
// [@7 class tables: 12 entries in BigInt, 0.00s]
// [@11 class tables: 48 entries in BigInt, 0.00s]
// [@13 class tables: 148 entries in BigInt, 0.00s]
// [@17 class tables: 496 entries in BigInt, 0.00s]
// [@19 class tables: 1760 entries in BigInt, 0.00s]
// [@23 class tables: 6980 entries in BigInt, 0.04s]
// [@29 class tables: 31480 entries in BigInt, 0.01s]
// [@31 class tables: 150168 entries in BigInt, 0.06s]
// [gate 1 @31 serial 142.3s]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [prime table to 2724104: 198286 primes, 0.04s]
// [engine-0830 mode=shard node v22.21.0 10 cpus Apple M1 Max]
// [prime table to 2724104: 198286 primes, 0.06s]
// [prime table to 2724104: 198286 primes, 0.05s]
// [prime table to 2724104: 198286 primes, 0.05s]
// [prime table to 2724104: 198286 primes, 0.06s]
// [prime table to 2724104: 198286 primes, 0.03s]
// [prime table to 2724104: 198286 primes, 0.06s]
// [prime table to 2724104: 198286 primes, 0.11s]
// [@37 class tables: 793132 entries in BigInt, 0.27s]
// [@37 class tables: 793132 entries in BigInt, 0.34s]
// [@37 class tables: 793132 entries in BigInt, 0.32s]
// [@37 class tables: 793132 entries in BigInt, 0.34s]
// [@37 class tables: 793132 entries in BigInt, 0.35s]
// [@37 class tables: 793132 entries in BigInt, 0.37s]
// [@37 class tables: 793132 entries in BigInt, 0.43s]
// [@37 class tables: 793132 entries in BigInt, 0.40s]
//  shard 2/8 @37 k[61839484456,92759226685) np=18160779735 S=1007715878 in 987.7s
//  shard 3/8 @37 k[92759226685,123678968913) np=18160779630 S=984039173 in 989.1s
//  shard 7/8 @37 k[216438195598,247357937827) np=18160779684 S=933774530 in 989.9s
//  shard 6/8 @37 k[185518453370,216438195598) np=18160779575 S=942960670 in 992.3s
//  shard 4/8 @37 k[123678968913,154598711141) np=18160779631 S=966970305 in 994.2s
//  shard 1/8 @37 k[30919742228,61839484456) np=18160779575 S=1045856786 in 996.7s
//  shard 0/8 @37 k[0,30919742228) np=18160779684 S=1163355201 in 997.2s
//  shard 5/8 @37 k[154598711141,185518453370) np=18160779736 S=953722322 in 1002.8s
// [gate 2 @37 8 shards wall 1003.4s]
// [@37 class tables: 793132 entries in BigInt, 0.20s]
// [@41 class tables: 4471676 entries in BigInt, 0.94s]
// [gate 3 @41 slice 6000 blocks serial 418.0s]
// [@41 class tables: 4471676 entries in BigInt, 0.44s]
// [probe rep 0 @41 span 2^27 blockK 2^22: 2.33s = 336e6 strikes/s]
// [probe rep 0 @43 span 2^27 blockK 2^22: 5.24s = 158e6 strikes/s]
// [probe rep 1 @41 span 2^27 blockK 2^22: 2.19s = 357e6 strikes/s]
// [probe rep 1 @43 span 2^27 blockK 2^22: 4.89s = 169e6 strikes/s]
// [probe rep 2 @41 span 2^27 blockK 2^22: 2.17s = 360e6 strikes/s]
// [probe rep 2 @43 span 2^27 blockK 2^22: 4.87s = 170e6 strikes/s]
// [median span time @41 2.19s, @43 4.89s; per-cell cost ratio @43/@41 = 2.230; per-strike 2.109]
// [EXTRAPOLATION: @43 on this machine, 8 shards, = 6.035 h x 43.00 (tile) x 2.230 (per-cell) = 579 h wall = 24.1 days; x/13 of the @41 record would have been 78 h]
// [@43 span 2^27 at blockK 2^24 serial: 3.65s against 4.89s at 2^22]
// [load average at probe time: 7.6 66.9 124.9 on 10 cpus; other agents share this machine]
// [@41 class tables: 4471676 entries in BigInt, 0.44s]
// ============================================================================
// READINGS
// ============================================================================
// (written in engine-0830-at43-bigint.md after the embed; the script carries
//  none of its own so that no figure can precede its run)
