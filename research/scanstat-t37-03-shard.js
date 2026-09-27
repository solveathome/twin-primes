// ============================================================================
// scanstat-t37-03-shard.js  —  ONE SHARD OF THE T_37 STREAM
// pre-registered at research/history/staging/scanstat-t37-prereg.md, S5
// ============================================================================
// Streams the slot positions of [startPos, endPos) of the tile mod x#, scores
// every moving-sum window whose STARTING slot lies in that range, and writes
// its partial moments to JSON. Windows are owned by exactly one shard; the 64
// slots of overlap past the end are streamed but only read, never owned. See
// the engine's header for the ownership argument.
//
//   node research/scanstat-t37-03-shard.js <shard> <nShards> <level> <outdir>
// ============================================================================
'use strict';
const fs=require('fs'), path=require('path');
const E=require('./scanstat-t37-01-engine.js');

const shard=+process.argv[2], N=+process.argv[3], x=+process.argv[4]||37;
const outdir=process.argv[5]||'.';
if(!Number.isInteger(shard)||!Number.isInteger(N)||shard<0||shard>=N) throw new Error('usage: <shard> <nShards> <level> <outdir>');
const out=path.join(outdir, `t37-shard-${x}-${shard}-of-${N}.json`);

const t0=Date.now();
const stamp=()=>new Date().toISOString().replace('T',' ').slice(0,19);
let last=0;
console.log(`[${stamp()}] shard ${shard}/${N} of T_${x} starting, pid ${process.pid}`);
const res=E.runShard(x, shard, N, {
  onProgress:(frac, done, tot)=>{
    const now=Date.now();
    if(now-last < 60000 && frac<1) return;      // one line a minute
    last=now;
    const s=(now-t0)/1000;
    console.log(`[${stamp()}] shard ${shard}/${N}  ${(frac*100).toFixed(2)}%  blocks ${done}/${tot}  ${(s/60).toFixed(1)} min elapsed  ETA ${(s/frac*(1-frac)/60).toFixed(1)} min`);
  }
});
fs.writeFileSync(out, JSON.stringify(res));
console.log(`[${stamp()}] shard ${shard}/${N} DONE  slots ${res.dOwn}  ${(res.elapsed/60).toFixed(2)} min  maxsum_1 ${res.rows[0].max}  -> ${out}`);
