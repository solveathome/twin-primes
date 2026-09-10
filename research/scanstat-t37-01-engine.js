// ============================================================================
// scanstat-t37-01-engine.js  —  THE T_37 MOVING-SUM ENGINE (module, no output)
// pre-registered at research/history/staging/scanstat-t37-prereg.md
// ============================================================================
// Same statistic as research/import-scanstat-04-score.js: on the cyclic word of
// twin-admissible slots mod x#, with D = prod_{5<=p<=x}(p-2) slots and
// W = x# positions,
//
//   v_m(i) = slot[(i+m) mod D] - slot[i]   (+W on wrap),   i = 0 .. D-1
//   maxsum_m, minsum_m, mean_m, sd_m  over all D windows, for m in MS
//
// THREE CHANGES from the T_29 lever, all registered in advance (prereg S5):
//
//  1. WHEEL, NOT SIEVE, for p <= 13. The 1485 offsets of the T_13 tile inside
//     one 30030-position block are precomputed once. Only those offsets are
//     ever examined, and the primes 17..x are struck directly in CANDIDATE
//     INDEX SPACE: for prime p and block class c = (blockStart mod p), the set
//     of candidate indices w with (c + off[w]) = 0 or p-2 (mod p) is a fixed
//     list, precomputed for all p classes. So one 30030-block costs a 1485-byte
//     clear, ~739 marks and 1485 tests, entirely in L1, against 30030 bytes of
//     memset plus ~15000 strided marks plus 30030 tests for the position-space
//     sieve. No byte array the size of W is ever touched.
//
//  2. EXACT MOMENTS. sum_m stays below 2^53 (m*W = 4.75e14 at m = 64) and is
//     therefore an exact Float64 integer sum. sum of v^2 reaches 1.0e18 at
//     T_37, which is 114 times 2^53, so it is carried as a Float64 partial that
//     is flushed into a BigInt whenever it passes 4e15; every partial is an
//     integer below 2^53, so every addition is exact. Variance is recovered as
//     (D*S2 - S*S)/D^2 in BigInt, so sd_m carries no accumulated rounding.
//
//  3. SHARDING BY SLOT OWNERSHIP. Shard s owns the windows whose starting slot
//     lies in [startPos_s, endPos_s), boundaries on multiples of 30030. Every
//     window is owned exactly once. A window of m <= 64 slots reaches at most
//     64 slots past its start, so the shard streams on past its end until it
//     has emitted exactly 64 further slots, and scores only what it owns. The
//     overlap is counted in SLOTS, not positions, so it needs no bound on
//     maxsum_64, which is the quantity being measured. The last shard's
//     continuation wraps to position 0 with W added, which is the cyclic
//     completion the unsharded engine performs with its head array.
//
// Combination across shards: max by max, min by min, sum and sum-of-squares by
// addition, slot counts by addition. Gate: sum_m = m*W exactly, for every m.
// ============================================================================
'use strict';

const MS = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64];
const MMAX = 64, RING = 128, MASK = 127;
const WHEEL = 30030;                      // 13# = 2*3*5*7*11*13
const WHEEL_PRIMES = [2, 3, 5, 7, 11, 13];
const FLUSH = 4e15;                       // Float64 -> BigInt flush level for sum v^2

function primesTo(n){ const s=[]; for(let i=2;i<=n;i++){ let p=true; for(let j=2;j*j<=i;j++) if(i%j===0){p=false;break;} if(p) s.push(i);} return s; }

// D = prod_{5<=p<=x}(p-2), W = x# ; both exact as BigInt, and as Number below 2^53
function tileDW(x){ let D=1n, W=6n; for(const p of primesTo(x)) if(p>=5){ D*=BigInt(p-2); W*=BigInt(p); } return {D, W, Dn:Number(D), Wn:Number(W)}; }

// the 1485 twin-admissible offsets of one 30030-block
function wheelOffsets(){
  const kill = new Uint8Array(WHEEL);
  for(const p of WHEEL_PRIMES){ const rs = p===2?[0]:[0,p-2];
    for(const r of rs) for(let k=r;k<WHEEL;k+=p) kill[k]=1; }
  const off=[]; for(let i=0;i<WHEEL;i++) if(!kill[i]) off.push(i);
  return Int32Array.from(off);
}

// for each prime p in (13,x]: the candidate indices killed, indexed by block class
function sieveTables(x, OFF){
  const LP = primesTo(x).filter(p=>p>13);
  const tabs = [];
  for(const p of LP){
    const buckets = []; for(let c=0;c<p;c++) buckets.push([]);
    for(let w=0;w<OFF.length;w++){ const r = OFF[w] % p;
      for(let c=0;c<p;c++){ const t=(c+r)%p; if(t===0 || t===p-2) buckets[c].push(w); } }
    const start = new Int32Array(p+1); let tot=0;
    for(let c=0;c<p;c++){ start[c]=tot; tot+=buckets[c].length; } start[p]=tot;
    const list = new Int32Array(tot); let q=0;
    for(let c=0;c<p;c++) for(const w of buckets[c]) list[q++]=w;
    tabs.push({p, step: WHEEL % p, start, list});
  }
  return tabs;
}

// ---------------------------------------------------------------------------
// the two hot loops, at module level so every array reference is a stack local
// ---------------------------------------------------------------------------

// score the n slots held in st.slots. The fast path is the common case: the
// shard is deep inside its own range, so every window start index is in range
// and neither bound has to be tested.
function consume(st, n){
  const ring=st.ring, mx=st.mx, mn=st.mn, sm=st.sm, s2=st.s2, slots=st.slots, M=st.M, nM=st.nM;
  const lim=st.ownLimit;
  let j=st.j;
  if(j >= MMAX && j + n <= lim){
    for(let k=0;k<n;k++){
      const s=slots[k]; ring[j&MASK]=s;
      for(let t=0;t<nM;t++){
        const v = s - ring[(j-M[t])&MASK];
        if(v>mx[t]) mx[t]=v;
        if(v<mn[t]) mn[t]=v;
        sm[t]+=v; s2[t]+=v*v;
      }
      j++;
    }
  } else {
    for(let k=0;k<n;k++){
      const s=slots[k]; ring[j&MASK]=s;
      for(let t=0;t<nM;t++){
        const i=j-M[t];
        if(i>=0 && i<lim){
          const v = s - ring[i&MASK];
          if(v>mx[t]) mx[t]=v;
          if(v<mn[t]) mn[t]=v;
          sm[t]+=v; s2[t]+=v*v;
        }
      }
      j++;
    }
  }
  st.j=j;
}

// stream blocks [ba,bb) of the tile, adding `offset` to every slot position
function streamBlocks(st, ctx, ba, bb, offset, progress){
  const tabs=ctx.tabs, cls=ctx.cls, cand=ctx.cand, OFF=ctx.OFF, NW=ctx.NW;
  const slots=st.slots, s2=st.s2, big=ctx.big, nM=st.nM, nT=tabs.length, flush=ctx.flush;
  for(let ti=0; ti<nT; ti++) cls[ti] = (ba % tabs[ti].p) * tabs[ti].step % tabs[ti].p;
  const every = Math.max(1, Math.floor((bb-ba)/200));
  for(let b=ba; b<bb; b++){
    cand.fill(0);
    for(let ti=0; ti<nT; ti++){
      const tb=tabs[ti], c=cls[ti], stt=tb.start, ls=tb.list;
      for(let q=stt[c]; q<stt[c+1]; q++) cand[ls[q]]=1;
      let nc=c+tb.step; if(nc>=tb.p) nc-=tb.p; cls[ti]=nc;
    }
    const bp = b*WHEEL + offset;
    let n=0;
    for(let w=0; w<NW; w++) if(cand[w]===0) slots[n++] = bp + OFF[w];
    consume(st, n);
    for(let t=0;t<nM;t++) if(s2[t] > flush){ big[t] += BigInt(s2[t]); s2[t]=0; }
    if(progress && ((b-ba) % every === 0)) progress((b-ba+1)/(bb-ba), b-ba+1, bb-ba);
  }
}

// ---------------------------------------------------------------------------
// runShard(x, shard, nShards, opts) -> partial result for this shard
//   opts.onProgress(fracDone, blocksDone, totalBlocks)  called every ~progressEvery blocks
// ---------------------------------------------------------------------------
function runShard(x, shard, nShards, opts){
  opts = opts || {};
  const {Dn, Wn, D:Dbig, W:Wbig} = tileDW(x);
  const OFF = wheelOffsets(), NW = OFF.length;
  const tabs = sieveTables(x, OFF);
  const nBlocksTotal = Wn / WHEEL;
  if(!Number.isInteger(nBlocksTotal)) throw new Error('W is not a multiple of 30030');
  const b0 = Math.floor(shard * nBlocksTotal / nShards);
  const b1 = Math.floor((shard+1) * nBlocksTotal / nShards);
  const startPos = b0 * WHEEL, endPos = b1 * WHEEL;

  const nM = MS.length;
  const M = Int32Array.from(MS);
  const mx = new Float64Array(nM).fill(-Infinity);
  const mn = new Float64Array(nM).fill(Infinity);
  const sm = new Float64Array(nM);          // exact: partials stay < 2^53
  const s2 = new Float64Array(nM);          // flushed into big[] below 2^53
  const big = new Array(nM).fill(0n);
  const ring = new Float64Array(RING);
  const cand = new Uint8Array(NW);
  const slots = new Float64Array(NW);
  const cls = new Int32Array(tabs.length);

  const st  = { ring, mx, mn, sm, s2, M, nM, slots, j:0, ownLimit:Infinity };
  const ctx = { tabs, cls, cand, OFF, NW, big, flush: opts.flush || FLUSH };

  const t0 = Date.now();
  streamBlocks(st, ctx, b0, b1, 0, opts.onProgress);
  const dOwn = st.j;
  st.ownLimit = st.j;
  // the 64-slot continuation: at least one block's worth of slots (~880 at T_37)
  let bpos = b1, offset = 0;
  while(st.j < dOwn + MMAX){
    if(bpos >= nBlocksTotal){ bpos = 0; offset = Wn; }
    const step = Math.min(64, nBlocksTotal - bpos);
    streamBlocks(st, ctx, bpos, bpos+step, offset, null);
    bpos += step;
  }
  for(let t=0;t<nM;t++){ big[t] += BigInt(s2[t]); s2[t] = 0; }

  return {
    x, shard, nShards, b0, b1, startPos, endPos, dOwn,
    elapsed: (Date.now()-t0)/1000,
    rows: MS.map((m,t)=>({ m, max: mx[t], min: mn[t], sum: sm[t], sumsq: big[t].toString() }))
  };
}

// ---------------------------------------------------------------------------
// combine(parts, x) -> { D, W, rows:[{m, maxsum, minsum, mean, sd}], gates }
// ---------------------------------------------------------------------------
function combine(parts, x){
  const {D:Dbig, W:Wbig, Dn, Wn} = tileDW(x);
  const nM = MS.length;
  const mx = new Float64Array(nM).fill(-Infinity);
  const mn = new Float64Array(nM).fill(Infinity);
  const sm = new Float64Array(nM);
  const S2 = new Array(nM).fill(0n);
  let D = 0;
  for(const p of parts){
    D += p.dOwn;
    p.rows.forEach((r,t)=>{
      if(r.m !== MS[t]) throw new Error('grid mismatch in a partial');
      if(r.max > mx[t]) mx[t] = r.max;
      if(r.min < mn[t]) mn[t] = r.min;
      sm[t] += r.sum; S2[t] += BigInt(r.sumsq);
    });
  }
  const gates = [];
  gates.push({name:'slot count = prod(p-2)', got:String(D), want:String(Dn), ok:D===Dn});
  const rows = MS.map((m,t)=>{
    const S = sm[t];
    // exact variance: (D*S2 - S^2)/D^2
    const Db = BigInt(D), Sb = BigInt(S);
    const num = Db*S2[t] - Sb*Sb;
    const varx = Number(num) / (Number(Db)*Number(Db));
    gates.push({name:`sum_${m} = ${m}*W`, got:String(S), want:String(m*Wn), ok:S===m*Wn});
    return { m, maxsum: mx[t], minsum: mn[t], mean: S/D, sd: Math.sqrt(Math.max(0,varx)), sumsq: S2[t].toString() };
  });
  return { x, D, W: Wn, Dexact: Dbig.toString(), Wexact: Wbig.toString(), rows, gates };
}

function ols(xs, ys){ const n=xs.length, mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0, sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  const se=n>2?Math.sqrt(ss/(n-2)/sxx):NaN; return {a,b,se}; }

module.exports = { MS, MMAX, WHEEL, primesTo, tileDW, wheelOffsets, sieveTables, runShard, combine, ols };
