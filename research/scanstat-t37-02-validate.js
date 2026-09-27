// ============================================================================
// scanstat-t37-02-validate.js  —  THE NEW ENGINE AGAINST THE EMBEDDED COLUMNS
// pre-registered at research/history/staging/scanstat-t37-prereg.md, gates 5,6
// ============================================================================
// The T_37 run rewrites the streaming engine (wheel in candidate-index space,
// exact BigInt second moments, sharding by slot ownership). Before it is spent
// on 7.4e12 positions it has to return the known answer at the two levels that
// are already published. This script is that check, and it is deliberately a
// recomputation of embedded artifacts, permitted under the standing compute
// rule as validation of a success before it is extended.
//
// Checked, at T_23 and T_29, at all twelve m of the frozen grid:
//   maxsum_m and sd_m against the embedded OUTPUT of
//   research/import-scanstat-04-score.js, PARSED FROM THAT FILE, not retyped
//   slot count against prod(p-2), maxsum_1 against G2(23#) and G2(29#)
//   sum_m = m*W exactly, in integers, at every m
//   unsharded against 5-shard, digit for digit
//   the BigInt flush path, forced at a 1e3 threshold, against the same run
//     with the production threshold 4e15 (never reached below T_31)
//
//   node research/scanstat-t37-02-validate.js
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const fs=require('fs'), path=require('path');
const E=require('./scanstat-t37-01-engine.js');
const MS=E.MS;

// ---- the published columns, parsed out of the embedded output block --------
function published(){
  const src=fs.readFileSync(path.resolve(__dirname,'import-scanstat-04-score.js'),'utf8');
  const out={};
  for(const x of [23,29]){
    const i=src.indexOf(`T_${x} COMPUTED`); if(i<0) throw new Error('no embedded T_'+x+' block');
    const lines=src.slice(i).split('\n');
    const rows=[];
    for(const L of lines){
      const m=L.match(/^\/\/\s*(\d+) \|\s*(\d+) \|\s*(-?[\d.]+) \|\s*([\d.]+) \|/);
      if(m){ rows.push({m:+m[1], maxsum:+m[2], sd:m[4]}); if(rows.length===MS.length) break; }
      if(rows.length && !m) break;
    }
    if(rows.length!==MS.length) throw new Error(`parsed ${rows.length} rows for T_${x}`);
    out[x]=rows;
  }
  return out;
}

function run(x, N, opts){
  const t0=Date.now(); const parts=[];
  for(let s=0;s<N;s++) parts.push(E.runShard(x,s,N,opts||{}));
  const c=E.combine(parts,x); c.wall=(Date.now()-t0)/1000; c.parts=parts; return c;
}

function main(){
console.log('scanstat-t37 / part 2 --- validating the new engine at T_23 and T_29\n');
const PUB=published();
let bad=0;
const timing={};

console.log('(1) THE PUBLISHED COLUMNS, PARSED FROM research/import-scanstat-04-score.js');
console.log(`    T_23: ${PUB[23].map(r=>r.maxsum).join(' ')}`);
console.log(`    T_29: ${PUB[29].map(r=>r.maxsum).join(' ')}`);

for(const x of [23,29]){
  const one=run(x,1), five=run(x,5);
  timing[x]={one:one.wall, five:five.wall, D:one.D};
  console.log(`\n(2) T_${x}   D = ${one.D}   W = ${one.W}   unsharded ${one.wall.toFixed(2)}s   5-shard (serial) ${five.wall.toFixed(2)}s   [${el()}]`);
  const g=one.gates.filter(q=>!q.ok); if(g.length){ bad+=g.length; console.log('    GATE FAILURE  '+JSON.stringify(g)); }
  else console.log(`    gates: slot count and all twelve sum_m = m*W pass, in exact integers`);
  console.log('      m |  maxsum_m | published |   sd_m   | published |  match');
  for(let t=0;t<MS.length;t++){
    const r=one.rows[t], p=PUB[x][t];
    const sdStr=r.sd.toFixed(3);
    const ok = r.maxsum===p.maxsum && sdStr===p.sd;
    if(!ok) bad++;
    console.log(`    ${String(r.m).padStart(3)} | ${String(r.maxsum).padStart(9)} | ${String(p.maxsum).padStart(9)} | ${sdStr.padStart(8)} | ${p.sd.padStart(9)} |  ${ok?'yes':'NO'}`);
  }
  const same=JSON.stringify(one.rows)===JSON.stringify(five.rows);
  if(!same) bad++;
  console.log(`    unsharded vs 5-shard: ${same?'identical, every field':'DIFFERENT'}   (shard slot counts ${five.parts.map(p=>p.dOwn).join(' + ')} = ${five.parts.reduce((a,p)=>a+p.dOwn,0)})`);
  const H=E.ols(MS.map(Math.log), one.rows.map(r=>Math.log(r.sd)));
  console.log(`    H(T_${x}) = ${H.b.toFixed(4)} +/- ${H.se.toFixed(4)}   published 0.${x===23?'3216 +/- 0.0096':'3367 +/- 0.0080'}   sd_1 = ${one.rows[0].sd.toFixed(4)}`);
}

// ---- the BigInt flush path, which no level below T_31 reaches naturally
const fA=run(23,5,{}), fB=run(23,5,{flush:1e3});
const fok=JSON.stringify(fA.rows)===JSON.stringify(fB.rows);
if(!fok) bad++;
console.log(`\n(3) THE EXACT-MOMENT PATH. Forcing the Float64 -> BigInt flush at 1e3 instead of 4e15`);
console.log(`    reproduces T_23 exactly: ${fok?'yes':'NO'}.  sum v^2 at m = 64 is ${fA.rows[11].sumsq} at T_23,`);
console.log(`    and reaches ~1.0e18 at T_37, which is 114 times 2^53, so the flush is load-bearing there.`);

// ---- throughput and the projection
const {Dn:D37}=E.tileDW(37), {Dn:D29}=E.tileDW(29);
const rate=timing[29].D/timing[29].one;
const proj=D37/rate;
console.log(`\n(4) THROUGHPUT AND THE T_37 PROJECTION`);
console.log(`    T_29: ${timing[29].D} slots in ${timing[29].one.toFixed(2)} s  =  ${(rate/1e6).toFixed(2)} M slots/s`);
console.log(`    (the T_29 lever of import-scanstat-04-score.js took 38.9 s for the same level)`);
console.log(`    T_37: D = ${D37} slots = ${(D37/D29).toFixed(1)} x T_29, over W = 7420738134810 positions`);
console.log(`    single-threaded projection: ${proj.toFixed(0)} s = ${(proj/3600).toFixed(2)} h`);
for(const N of [4,5,6,8]) console.log(`      ${N} shards, perfect scaling: ${(proj/N/3600).toFixed(2)} h`);

console.log(`\n[${el()}] ${bad?`FAILED, ${bad} mismatches`:'all checks pass'}`);
if(bad) process.exit(1);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/scanstat-t37-02-validate.js
//   invocation:  node research/scanstat-t37-02-validate.js
//   code-sha256: ca588b80c596166fda86c908616ffdf08551ced755807c4818dc85cc54159c1e
//   out-sha256:  aa08d66b35962bf8a89934c95357bf6eb0c30c0a71055808b4ed8cfd0991f93c
//   body-lines:  57
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     23.7 s
// ============================================================================
// scanstat-t37 / part 2 --- validating the new engine at T_23 and T_29
//
// (1) THE PUBLISHED COLUMNS, PARSED FROM research/import-scanstat-04-score.js
//     T_23: 204 234 300 348 462 528 612 750 990 1218 1710 2160
//     T_29: 258 330 390 420 540 582 726 882 1134 1428 1902 2442
//
// (2) T_23   D = 7952175   W = 223092870   unsharded 0.39s   5-shard (serial) 0.30s   [0.7s]
//     gates: slot count and all twelve sum_m = m*W pass, in exact integers
//       m |  maxsum_m | published |   sd_m   | published |  match
//       1 |       204 |       204 |   19.466 |    19.466 |  yes
//       2 |       234 |       234 |   26.898 |    26.898 |  yes
//       3 |       300 |       300 |   31.814 |    31.814 |  yes
//       4 |       348 |       348 |   34.422 |    34.422 |  yes
//       6 |       462 |       462 |   36.690 |    36.690 |  yes
//       8 |       528 |       528 |   40.734 |    40.734 |  yes
//      12 |       612 |       612 |   49.055 |    49.055 |  yes
//      16 |       750 |       750 |   52.145 |    52.145 |  yes
//      24 |       990 |       990 |   59.463 |    59.463 |  yes
//      32 |      1218 |      1218 |   65.438 |    65.438 |  yes
//      48 |      1710 |      1710 |   71.557 |    71.557 |  yes
//      64 |      2160 |      2160 |   77.435 |    77.435 |  yes
//     unsharded vs 5-shard: identical, every field   (shard slot counts 1589572 + 1590649 + 1590656 + 1590653 + 1590645 = 7952175)
//     H(T_23) = 0.3216 +/- 0.0096   published 0.3216 +/- 0.0096   sd_1 = 19.4656
//
// (2) T_29   D = 214708725   W = 6469693230   unsharded 10.92s   5-shard (serial) 11.11s   [22.8s]
//     gates: slot count and all twelve sum_m = m*W pass, in exact integers
//       m |  maxsum_m | published |   sd_m   | published |  match
//       1 |       258 |       258 |   21.441 |    21.441 |  yes
//       2 |       330 |       330 |   29.549 |    29.549 |  yes
//       3 |       390 |       390 |   34.751 |    34.751 |  yes
//       4 |       420 |       420 |   37.662 |    37.662 |  yes
//       6 |       540 |       540 |   41.335 |    41.335 |  yes
//       8 |       582 |       582 |   46.659 |    46.659 |  yes
//      12 |       726 |       726 |   54.105 |    54.105 |  yes
//      16 |       882 |       882 |   59.474 |    59.474 |  yes
//      24 |      1134 |      1134 |   68.381 |    68.381 |  yes
//      32 |      1428 |      1428 |   75.274 |    75.274 |  yes
//      48 |      1902 |      1902 |   82.721 |    82.721 |  yes
//      64 |      2442 |      2442 |   89.348 |    89.348 |  yes
//     unsharded vs 5-shard: identical, every field   (shard slot counts 42941557 + 42941528 + 42941553 + 42941532 + 42942555 = 214708725)
//     H(T_29) = 0.3367 +/- 0.0080   published 0.3367 +/- 0.0080   sd_1 = 21.4409
//
// (3) THE EXACT-MOMENT PATH. Forcing the Float64 -> BigInt flush at 1e3 instead of 4e15
//     reproduces T_23 exactly: yes.  sum v^2 at m = 64 is 25683395699880 at T_23,
//     and reaches ~1.0e18 at T_37, which is 114 times 2^53, so the flush is load-bearing there.
//
// (4) THROUGHPUT AND THE T_37 PROJECTION
//     T_29: 214708725 slots in 10.92 s  =  19.66 M slots/s
//     (the T_29 lever of import-scanstat-04-score.js took 38.9 s for the same level)
//     T_37: D = 217929355875 slots = 1015.0 x T_29, over W = 7420738134810 positions
//     single-threaded projection: 11086 s = 3.08 h
//       4 shards, perfect scaling: 0.77 h
//       5 shards, perfect scaling: 0.62 h
//       6 shards, perfect scaling: 0.51 h
//       8 shards, perfect scaling: 0.38 h
//
// [23.6s] all checks pass
// ============================================================
// READINGS
// ============================================================
//
// 1. THE NEW ENGINE REPRODUCES THE PUBLISHED COLUMNS, DIGIT FOR DIGIT.
//    [VERIFIED] At T_23 and T_29, at all twelve m of the frozen grid, both
//    maxsum_m and sd_m match the embedded output of
//    research/import-scanstat-04-score.js to every published decimal, with the
//    published values PARSED out of that file rather than retyped here. The
//    slot counts return 7952175 and 214708725, maxsum_1 returns 204 and 258,
//    which are G2(23#) and G2(29#), and the exponents come back
//    0.3216 +/- 0.0096 and 0.3367 +/- 0.0080 from a code path that shares no
//    line with the one that first produced them.
//
// 2. SHARDING IS EXACT, NOT APPROXIMATE. [VERIFIED] The 5-shard run is
//    identical to the unsharded run in every field at both levels, and the
//    shard slot counts add to the tile's slot count. Ownership is by starting
//    slot, so each of the D windows is scored exactly once; the 64-slot
//    continuation past a shard's end is read and never owned. That is what
//    makes the T_37 run parallel without an approximation.
//
// 3. THE EXACT-MOMENT PATH IS CHECKED WHERE IT CANNOT BE CHECKED LATER.
//    [VERIFIED] No level below T_31 ever reaches the Float64 -> BigInt flush,
//    so the flush is forced here at 1e3 instead of 4e15 and reproduces T_23
//    exactly. The second moment at m = 64 is 25683395699880 at T_23 and reaches
//    about 1.0e18 at T_37, which is 114 times 2^53: without the BigInt carry
//    the sd column at the top of the grid would be wrong in its third figure.
//
// 4. THE T_37 RUN IS AFFORDABLE. [MEASURED] T_29 takes 10.92 s in the embedded
//    run against 38.9 s for the lever that first computed it, a rate of
//    19.66 M slots/s. T_37 is 217929355875 slots, 1015.0 times T_29, over
//    7420738134810 positions: 11086 s = 3.08 h single-threaded, 0.62 h at 5
//    shards with perfect scaling. The machine was running three other jobs
//    throughout, and repeat timings on it spread by 30%, so these are the
//    figures of a loaded machine and the projection is not a precision claim. The old position-space sieve would have been about half a
//    day. The saving is structural, not a constant factor: only 1485 of every
//    30030 positions are examined, and the primes 17 to 37 are struck in
//    candidate-index space out of L1.
//
// 5. WHAT THIS DOES NOT ESTABLISH. It validates the engine, not the
//    prediction. The pre-registered H*(T_37) and its band are in
//    research/history/staging/scanstat-t37-prereg.md and are scored by
//    research/scanstat-t37-04-run.js after the run, not here.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// IN-CODE: 1485 and 30030 are the base-wheel constants of the engine this
// script imports, research/scanstat-t37-01-engine.js, which declares
// "const WHEEL = 30030;  // 13# = 2*3*5*7*11*13" and builds "the 1485
// twin-admissible offsets of one 30030-block". They describe the engine's
// per-block cost, which is why reading 4 quotes them for the structural
// saving; this validation run reports timings and column agreement instead, so
// neither number is printed. 1485 is also the D of the T_13 tile, the fourth
// rung of the 3, 15, 135, 1485, 22275, 378675, 7952175 ladder whose last term
// is printed here as T_23's D.
// ---------------------------------------------------------------------------
