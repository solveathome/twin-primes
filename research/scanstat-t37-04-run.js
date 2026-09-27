// ============================================================================
// scanstat-t37-04-run.js  —  DRIVER, COMBINER AND ADJUDICATOR FOR T_37
// pre-registered at research/history/staging/scanstat-t37-prereg.md
// ============================================================================
// Forks the shards, waits, combines their partial moments, runs the custody
// gates, and scores the frozen predictions. The custody refit is done FIRST and
// aborts on any mismatch with the sealed file, exactly as
// research/import-scanstat-04-score.js does, and its inputs are PARSED out of
// the embedded output blocks of research/import-scanstat-03-prereg.js and
// research/import-scanstat-04-score.js rather than retyped here.
//
//   node research/scanstat-t37-04-run.js [--level 37] [--shards 5]
//                                        [--outdir DIR] [--combine-only]
//                                        [--h31 <measured H(T_31)>]
//
// --combine-only skips the compute and reads the shard JSON already on disk, so
// the adjudication can be re-run, and re-embedded, without repeating the run.
// --h31 supplies the sibling pass's measured T_31 exponent; with it the driver
// also prints the POST-HOC six-level prediction, which the pre-registration
// requires to be labelled as post-hoc and never used as the criterion.
// ============================================================================
'use strict';
const fs=require('fs'), path=require('path'), cp=require('child_process');
const E=require('./scanstat-t37-01-engine.js');
const MS=E.MS;

const argv=process.argv.slice(2);
const arg=(k,d)=>{ const i=argv.indexOf('--'+k); return i<0?d:argv[i+1]; };
const has=k=>argv.includes('--'+k);
const LEVEL=+arg('level',37), NSH=+arg('shards',5);
const OUTDIR=arg('outdir', path.join(require('os').tmpdir(),'scanstat-t37-out'));
const H31=arg('h31',null);
const t3=3.182446;                                  // t_{0.975,3}, five points, three df

const stamp=()=>new Date().toISOString().replace('T',' ').slice(0,19);
function ols(xs,ys){ const n=xs.length, mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; const res=[];
  for(let i=0;i<n;i++){ const e=ys[i]-a-b*xs[i]; res.push(e); ss+=e*e; }
  const s=n>2?Math.sqrt(ss/(n-2)):NaN;
  return {a,b,s,sxx,mx,n,res,se:s/Math.sqrt(sxx)}; }
function band(f,x0){ const y=f.a+f.b*x0, sem=f.s*Math.sqrt(1/f.n+(x0-f.mx)**2/f.sxx),
  sep=f.s*Math.sqrt(1+1/f.n+(x0-f.mx)**2/f.sxx);
  return {y,sem,sep,lo:y-t3*sem,hi:y+t3*sem,plo:y-t3*sep,phi:y+t3*sep}; }
function lnrms(actual,pred){ let s=0,mr=0; for(let i=0;i<actual.length;i++){ const r=Math.log(pred[i]/actual[i]); s+=r*r;
  const rel=Math.abs(pred[i]/actual[i]-1); if(rel>mr) mr=rel; } return {rms:Math.sqrt(s/actual.length), maxrel:mr}; }

// ---- the published inputs, parsed from the embedded output blocks -----------
function publishedLevels(){
  const p3=fs.readFileSync(path.resolve(__dirname,'import-scanstat-03-prereg.js'),'utf8');
  const p4=fs.readFileSync(path.resolve(__dirname,'import-scanstat-04-score.js'),'utf8');
  const rows=[];
  for(const L of p3.split('\n')){
    const m=L.match(/^\/\/\s+T_(\d+) \|\s*(\d+) \| ([\d.]+) \|\s*([\d.]+) \|\s*([\d.]+) \| ([\d.]+) \+\/-/);
    if(m){ const {Dn}=E.tileDW(+m[1]);
      if(Dn!==+m[2]) throw new Error(`embedded D for T_${m[1]} is ${m[2]}, prod(p-2) is ${Dn}`);
      // lnD is recomputed exactly from prod(p-2); the four decimals printed in the
      // embedded block would move the sixth decimal of every extrapolation
      rows.push({x:+m[1], D:Dn, lnD:Math.log(Dn), sd1:+m[4], lnc:+m[5], H:+m[6]}); }
  }
  if(rows.length!==3) throw new Error('parsed '+rows.length+' fit levels from import-scanstat-03-prereg.js');
  for(const x of [23,29]){
    const i=p4.indexOf(`T_${x} COMPUTED`); if(i<0) throw new Error('no embedded T_'+x);
    const chunk=p4.slice(i, i+4000);
    const h=chunk.match(new RegExp(`measured exponent H\\(T_${x}\\) = ([\\d.]+) \\+\\/- ([\\d.]+)\\s+exact sd_1 = ([\\d.]+)`));
    if(!h) throw new Error('no exponent line for T_'+x);
    const sds=[];
    for(const L of chunk.split('\n')){
      const m=L.match(/^\/\/\s*(\d+) \|\s*(\d+) \|\s*(-?[\d.]+) \|\s*([\d.]+) \|/);
      if(m){ sds.push(+m[4]); if(sds.length===MS.length) break; }
    }
    if(sds.length!==MS.length) throw new Error('parsed '+sds.length+' sd values for T_'+x);
    const f=ols(MS.map(Math.log), sds.map(Math.log));
    const {Dn}=E.tileDW(x);
    rows.push({x, D:Dn, lnD:Math.log(Dn), sd1:+h[3], lnc:f.a, H:+h[1], se:+h[2]});
  }
  return rows;
}

// G2(x#) from the ladder table of research/exact-g2-ladder.js, parsed not retyped
function g2FromLadder(x){
  const src=fs.readFileSync(path.resolve(__dirname,'exact-g2-ladder.js'),'utf8');
  const m=src.match(new RegExp(`\\{ x: ${x}, g: (\\d+),`));
  if(!m) throw new Error('no ladder entry for x = '+x);
  return +m[1];
}

function custody(){
  const lv=publishedLevels();
  const lnD=lv.map(r=>r.lnD);
  const fH=ols(lnD, lv.map(r=>r.H)), fC=ols(lnD, lv.map(r=>r.lnc)), fS=ols(lnD, lv.map(r=>Math.log(r.sd1)));
  const {Dn:D37, Wn:W37}=E.tileDW(37);
  const x0=Math.log(D37), mbar=W37/D37, tail=Math.sqrt(2*x0);
  const bH=band(fH,x0), bC=band(fC,x0), bS=band(fS,x0);
  const frozen=fs.readFileSync(path.resolve(__dirname,'history','staging','scanstat-t37-prereg.md'),'utf8');
  const want=[`H = ${fH.a.toFixed(6)} + ${fH.b.toFixed(6)} * lnD`,
              `= ${bH.y.toFixed(6)}`,
              `[${bH.lo.toFixed(6)}, ${bH.hi.toFixed(6)}]`,
              `ln c*(T37)    = ${bC.y.toFixed(6)}`,
              `ln sd_1*(T37) = ${bS.y.toFixed(6)}`];
  for(const m of MS){ const sdA=Math.exp(bC.y)*Math.pow(m,bH.y), sdB=Math.exp(bS.y)*Math.sqrt(m);
    want.push(`| ${m} | ${sdA.toFixed(3)} | ${(m*mbar+sdA*tail).toFixed(1)} | ${sdB.toFixed(3)} | ${(m*mbar+sdB*tail).toFixed(1)} |`); }
  const miss=want.filter(w=>!frozen.includes(w));
  if(miss.length){ console.log('CUSTODY MISMATCH against the sealed pre-registration:'); miss.forEach(w=>console.log('   '+w)); throw new Error(`${miss.length} pre-registered strings do not reproduce`); }
  console.log(`(0) CUSTODY: all ${want.length} sealed strings reproduce from the embedded inputs, refit here.`);
  console.log(`    five-level law  H = ${fH.a.toFixed(6)} + ${fH.b.toFixed(6)} * lnD   ->   H*_5(T_37) = ${bH.y.toFixed(6)}   band [${bH.lo.toFixed(6)}, ${bH.hi.toFixed(6)}]`);
  return {lv, fH, fC, fS, bH, bC, bS, x0, mbar, tail, D37, W37};
}

// ---- the run ---------------------------------------------------------------
function partPath(s){ return path.join(OUTDIR, `t37-shard-${LEVEL}-${s}-of-${NSH}.json`); }

function launch(){
  fs.mkdirSync(OUTDIR,{recursive:true});
  const todo=[];
  for(let s=0;s<NSH;s++){
    if(fs.existsSync(partPath(s))){ try{ JSON.parse(fs.readFileSync(partPath(s),'utf8')); console.log(`    shard ${s}: already on disk, reused`); continue; }catch(e){} }
    todo.push(s);
  }
  if(!todo.length) return Promise.resolve();
  console.log(`[${stamp()}] launching ${todo.length} shards of ${NSH} for T_${LEVEL}, outdir ${OUTDIR}`);
  return Promise.all(todo.map(s=>new Promise((res,rej)=>{
    const c=cp.spawn(process.execPath,[path.join(__dirname,'scanstat-t37-03-shard.js'),String(s),String(NSH),String(LEVEL),OUTDIR],
                     {stdio:['ignore','inherit','inherit']});
    c.on('exit',code=>code===0?res():rej(new Error(`shard ${s} exited ${code}`)));
  })));
}

function report(C){
  const parts=[]; for(let s=0;s<NSH;s++) parts.push(JSON.parse(fs.readFileSync(partPath(s),'utf8')));
  // shard coverage: contiguous, disjoint, and covering [0,W)
  parts.sort((a,b)=>a.b0-b.b0);
  let cov=true, pos=0;
  for(const p of parts){ if(p.startPos!==pos) cov=false; pos=p.endPos; }
  if(pos!==E.tileDW(LEVEL).Wn) cov=false;
  const t=E.combine(parts, LEVEL);
  const D=t.D, W=t.W, mbar=W/D, lnD=Math.log(D), tail=Math.sqrt(2*lnD);

  console.log(`\n(1) THE RUN.  T_${LEVEL}   ${NSH} shards   wall per shard ${parts.map(p=>(p.elapsed/60).toFixed(1)).join(' / ')} min`);
  console.log(`    slot counts ${parts.map(p=>p.dOwn).join(' + ')} = ${D}`);
  console.log(`    shard ranges cover [0, W) exactly, contiguous and disjoint: ${cov?'yes':'NO'}`);

  console.log(`\n(2) THE CUSTODY GATES`);
  const G2=g2FromLadder(LEVEL);
  const g2 = t.rows[0].maxsum===G2;
  let bad=t.gates.filter(q=>!q.ok).length + (cov?0:1) + (g2?0:1);
  console.log(`    slot count = prod(p-2)               ${D} vs ${E.tileDW(LEVEL).Dn}   ${D===E.tileDW(LEVEL).Dn?'PASS':'FAIL'}`);
  console.log(`    maxsum_1 = G2(${LEVEL}#)                     ${t.rows[0].maxsum} vs ${G2}   ${g2?'PASS':'FAIL'}`);
  console.log(`    sum_m = m*W, all twelve m            ${t.gates.filter(q=>q.name.startsWith('sum_')&&q.ok).length}/12 exact   ${t.gates.filter(q=>q.name.startsWith('sum_')).every(q=>q.ok)?'PASS':'FAIL'}`);
  console.log(`    mean_1 * D = W                       ${(t.rows[0].mean*D).toFixed(0)} vs ${W}   ${Math.round(t.rows[0].mean*D)===W?'PASS':'FAIL'}`);
  for(const q of t.gates) if(!q.ok) console.log(`    FAILED GATE ${q.name}: got ${q.got} want ${q.want}`);
  if(bad) throw new Error(`${bad} custody gates failed; a partial green is a defect`);
  console.log(`    all gates pass. maxsum_1 = ${G2} is an exhaustive maximality certificate for G2(${LEVEL}#),`);
  console.log(`    scanned over all ${D} gaps rather than inferred from the filter argument.`);

  const s1=t.rows[0].sd;
  const fit=E.ols(MS.map(Math.log), t.rows.map(r=>Math.log(r.sd)));
  console.log(`\n(3) T_${LEVEL} MEASURED.  D = ${D}   W = ${W}   mbar = ${mbar.toFixed(5)}   sqrt(2 lnD) = ${tail.toFixed(4)}   lnD = ${lnD.toFixed(6)}`);
  console.log(`    measured exponent H(T_${LEVEL}) = ${fit.b.toFixed(4)} +/- ${fit.se.toFixed(4)}     exact sd_1 = ${s1.toFixed(4)}`);
  console.log('    m |  maxsum_m | minsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m');
  for(const r of t.rows){ const exc=r.maxsum-r.m*mbar;
    console.log(`  ${String(r.m).padStart(3)} | ${String(r.maxsum).padStart(9)} | ${String(r.minsum).padStart(8)} | ${exc.toFixed(1).padStart(8)} | ${r.sd.toFixed(3).padStart(8)} |       ${(r.sd/(s1*Math.sqrt(r.m))).toFixed(4)}       |   ${(exc/r.sd).toFixed(3)}`); }
  console.log('    exact second moments, sum v^2 per m:');
  for(const r of t.rows) console.log(`      m = ${String(r.m).padStart(2)}   ${r.sumsq}`);

  console.log(`\n(4) THE PRE-REGISTERED VERDICT  (five committed levels, T_31 excluded by the seal)`);
  const inband = fit.b>=C.bH.lo && fit.b<=C.bH.hi;
  console.log(`    H*_5(T_37) = ${C.bH.y.toFixed(6)}   95% band on the line [${C.bH.lo.toFixed(6)}, ${C.bH.hi.toFixed(6)}]`);
  console.log(`    measured   = ${fit.b.toFixed(6)} +/- ${fit.se.toFixed(4)}   miss ${Math.abs(fit.b-C.bH.y).toFixed(6)} = ${(Math.abs(fit.b-C.bH.y)/fit.se).toFixed(2)} of its own s.e.`);
  console.log(`    VERDICT: ${inband?'INSIDE the band. The linear-in-lnD rule is a description holding over seven exact levels.'
                                    :'OUTSIDE the band. The linear form was a coincidence of a short ladder.'}`);
  const kill = fit.b+3*fit.se < 0.5;
  console.log(`    sqrt(m) kill: H + 3 se = ${(fit.b+3*fit.se).toFixed(4)} ${kill?'<':'>='} 0.5   ->   ${kill?('sqrt(m) REFUTED at T_'+LEVEL):'sqrt(m) not refuted here'}`);
  console.log(`    direction:    H(T_${LEVEL}) ${fit.b>0.3367?'>':'<='} H(T_29) = 0.3367   ->   ${fit.b>0.3367?'still rising, as registered':'BREAK: the series did not rise'}`);

  console.log(`\n(5) THE WEAK PREDICTIONS, registered as weak`);
  console.log(`    sd_1: predicted ${Math.exp(C.bS.y).toFixed(4)} band [${Math.exp(C.bS.lo).toFixed(4)}, ${Math.exp(C.bS.hi).toFixed(4)}]   measured ${s1.toFixed(4)}   ${s1>=Math.exp(C.bS.lo)&&s1<=Math.exp(C.bS.hi)?'inside':'OUTSIDE'}`);
  const cmeas=Math.exp(fit.a);
  console.log(`    c   : predicted ${Math.exp(C.bC.y).toFixed(4)} band [${Math.exp(C.bC.lo).toFixed(4)}, ${Math.exp(C.bC.hi).toFixed(4)}]   measured ${cmeas.toFixed(4)}   ${cmeas>=Math.exp(C.bC.lo)&&cmeas<=Math.exp(C.bC.hi)?'inside':'OUTSIDE'}`);

  console.log(`\n(6) THE MODEL SCORES on the frozen grid`);
  const actSd=t.rows.map(r=>r.sd), actEx=t.rows.map(r=>r.maxsum-r.m*mbar);
  const mk=(c,h)=>MS.map(m=>c*Math.pow(m,h));
  const cases=[['A  c* m^H*        ', mk(Math.exp(C.bC.y), C.bH.y)],
               ['B  sd_1* sqrt m   ', mk(Math.exp(C.bS.y), 0.5)],
               ["A' sd_1 m^H*      ", mk(s1, C.bH.y)],
               ["B' sd_1 sqrt m    ", mk(s1, 0.5)]];
  console.log('    model | sd_m ln-RMS | sd_m max rel | excess_m ln-RMS | excess_m max rel');
  const store={};
  for(const [name,sd] of cases){ const a=lnrms(actSd,sd), b=lnrms(actEx, sd.map(v=>v*tail)); store[name.trim().slice(0,2)]=b.rms;
    console.log(`    ${name} |   ${a.rms.toFixed(4)}    |    ${(a.maxrel*100).toFixed(1)}%     |     ${b.rms.toFixed(4)}      |     ${(b.maxrel*100).toFixed(1)}%`); }
  console.log(`    KILL CRITERION on excess_m: A' ${store["A'"].toFixed(4)} vs B' ${store["B'"].toFixed(4)}  ->  ${store["A'"]<store["B'"]?"A' WINS, the exponent beats sqrt(m)":"A' LOSES"}   (ratio B'/A' = ${(store["B'"]/store["A'"]).toFixed(2)})`);

  console.log(`\n(7) THE EXPONENT SERIES`);
  console.log('    level |   lnD    | H measured | source');
  for(const r of C.lv) console.log(`    T_${String(r.x).padStart(2)} | ${r.lnD.toFixed(6)} |   ${r.H.toFixed(4)}   | published, embedded`);
  if(H31) console.log(`    T_31 | 22.552089 |   ${(+H31).toFixed(4)}   | sibling pass, supplied with --h31`);
  console.log(`    T_${LEVEL} | ${lnD.toFixed(6)} |   ${fit.b.toFixed(4)}   | THIS RUN`);

  if(H31){
    const lnD6=C.lv.map(r=>r.lnD).concat([Math.log(E.tileDW(31).Dn)]);
    const H6=C.lv.map(r=>r.H).concat([+H31]);
    const f6=ols(lnD6,H6), b6=band(f6,C.x0);
    console.log(`\n(8) POST-HOC, LABELLED POST-HOC: the six-level refit including T_31`);
    console.log(`    computed after T_31 was known, and NOT the criterion of section 4.`);
    console.log(`    H = ${f6.a.toFixed(6)} + ${f6.b.toFixed(6)} * lnD   ->   H*_6(T_37) = ${b6.y.toFixed(6)}   band [${b6.lo.toFixed(6)}, ${b6.hi.toFixed(6)}]`);
    console.log(`    measured ${fit.b.toFixed(6)}, miss ${Math.abs(fit.b-b6.y).toFixed(6)} = ${(Math.abs(fit.b-b6.y)/fit.se).toFixed(2)} s.e.,  ${fit.b>=b6.lo&&fit.b<=b6.hi?'inside':'outside'} the post-hoc band`);
  } else {
    console.log(`\n(8) POST-HOC six-level refit NOT COMPUTED: no --h31 supplied. The pre-registration`);
    console.log(`    requires both the five-level criterion and the labelled post-hoc six-level number;`);
    console.log(`    re-run with --combine-only --h31 <measured H(T_31)> once the sibling pass lands.`);
  }
}

async function main(){
  console.log(`scanstat-t37 / part 4 --- the seventh exact level of the moving-sum exponent\n`);
  const C=custody();
  if(!has('combine-only')){ const t0=Date.now(); await launch(); console.log(`[${stamp()}] all shards done in ${((Date.now()-t0)/3600000).toFixed(2)} h`); }
  report(C);
  console.log(`\n[${stamp()}] done`);
}
main().catch(e=>{ console.error('ABORT: '+e.message); process.exit(1); });

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/scanstat-t37-04-run.js -- --level 37 --shards 5 --outdir research/t37-partials --combine-only --h31 0.345957
//   invocation:  node research/scanstat-t37-04-run.js --level 37 --shards 5 --outdir research/t37-partials --combine-only --h31 0.345957
//   code-sha256: 3d9d8721c3cef1ec6d3f5282521c5e30954e33116832c9c225e7dda93bb721d0
//   out-sha256:  73f3c1bab236d6da0ffa394d58c92f7b40d5098e81d19c15aff83a9351120cf5
//   body-lines:  81
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// scanstat-t37 / part 4 --- the seventh exact level of the moving-sum exponent
//
// (0) CUSTODY: all 17 sealed strings reproduce from the embedded inputs, refit here.
//     five-level law  H = 0.220795 + 0.006146 * lnD   ->   H*_5(T_37) = 0.381254   band [0.369866, 0.392641]
//
// (1) THE RUN.  T_37   5 shards   wall per shard 35.2 / 35.2 / 35.2 / 35.2 / 35.2 min
//     slot counts 43585870802 + 43585870830 + 43585871729 + 43585870823 + 43585871691 = 217929355875
//     shard ranges cover [0, W) exactly, contiguous and disjoint: yes
//
// (2) THE CUSTODY GATES
//     slot count = prod(p-2)               217929355875 vs 217929355875   PASS
//     maxsum_1 = G2(37#)                     528 vs 528   PASS
//     sum_m = m*W, all twelve m            12/12 exact   PASS
//     mean_1 * D = W                       7420738134810 vs 7420738134810   PASS
//     all gates pass. maxsum_1 = 528 is an exhaustive maximality certificate for G2(37#),
//     scanned over all 217929355875 gaps rather than inferred from the filter argument.
//
// (3) T_37 MEASURED.  D = 217929355875   W = 7420738134810   mbar = 34.05112   sqrt(2 lnD) = 7.2260   lnD = 26.107437
//     measured exponent H(T_37) = 0.3565 +/- 0.0068     exact sd_1 = 25.1586
//     m |  maxsum_m | minsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m
//     1 |       528 |        6 |    493.9 |   25.159 |       1.0000       |   19.633
//     2 |       540 |       18 |    471.9 |   34.521 |       0.9703       |   13.670
//     3 |       582 |       30 |    479.8 |   40.435 |       0.9279       |   11.867
//     4 |       630 |       36 |    493.8 |   44.215 |       0.8787       |   11.168
//     6 |       720 |       60 |    515.7 |   50.579 |       0.8207       |   10.196
//     8 |       816 |      102 |    543.6 |   57.603 |       0.8095       |   9.437
//    12 |       960 |      180 |    551.4 |   66.127 |       0.7588       |   8.338
//    16 |      1170 |      264 |    625.2 |   73.844 |       0.7338       |   8.466
//    24 |      1500 |      420 |    682.8 |   84.106 |       0.6824       |   8.118
//    32 |      1788 |      636 |    698.4 |   91.885 |       0.6456       |   7.600
//    48 |      2388 |     1080 |    753.5 |  104.283 |       0.5983       |   7.226
//    64 |      2970 |     1542 |    790.7 |  112.632 |       0.5596       |   7.020
//     exact second moments, sum v^2 per m:
//       m =  1   390623697791964
//       m =  2   1270448240799600
//       m =  3   2630467627339644
//       m =  4   4468990259583360
//       m =  6   9654156214944408
//       m =  8   16894907883902232
//       m = 12   37339527850325352
//       m = 16   65875564509749136
//       m = 24   147087809083913904
//       m = 32   260588807002446768
//       m = 48   584554873562191368
//       m = 64   1037760036322547376
//
// (4) THE PRE-REGISTERED VERDICT  (five committed levels, T_31 excluded by the seal)
//     H*_5(T_37) = 0.381254   95% band on the line [0.369866, 0.392641]
//     measured   = 0.356548 +/- 0.0068   miss 0.024706 = 3.63 of its own s.e.
//     VERDICT: OUTSIDE the band. The linear form was a coincidence of a short ladder.
//     sqrt(m) kill: H + 3 se = 0.3770 < 0.5   ->   sqrt(m) REFUTED at T_37
//     direction:    H(T_37) > H(T_29) = 0.3367   ->   still rising, as registered
//
// (5) THE WEAK PREDICTIONS, registered as weak
//     sd_1: predicted 31.2105 band [25.2384, 38.5957]   measured 25.1586   OUTSIDE
//     c   : predicted 31.5966 band [26.7371, 37.3394]   measured 26.7315   OUTSIDE
//
// (6) THE MODEL SCORES on the frozen grid
//     model | sd_m ln-RMS | sd_m max rel | excess_m ln-RMS | excess_m max rel
//     A  c* m^H*         |   0.2265    |    37.0%     |     0.3233      |     53.8%
//     B  sd_1* sqrt m    |   0.5107    |    121.7%     |     0.4926      |     128.2%
//     A' sd_1 m^H*       |   0.0413    |    9.1%     |     0.4386      |     63.2%
//     B' sd_1 sqrt m     |   0.3185    |    78.7%     |     0.4619      |     83.9%
//     KILL CRITERION on excess_m: A' 0.4386 vs B' 0.4619  ->  A' WINS, the exponent beats sqrt(m)   (ratio B'/A' = 1.05)
//
// (7) THE EXPONENT SERIES
//     level |   lnD    | H measured | source
//     T_13 | 7.303170 |   0.2661   | published, embedded
//     T_17 | 10.011220 |   0.2804   | published, embedded
//     T_19 | 12.844434 |   0.3001   | published, embedded
//     T_23 | 15.888956 |   0.3216   | published, embedded
//     T_29 | 19.184793 |   0.3367   | published, embedded
//     T_31 | 22.552089 |   0.3460   | sibling pass, supplied with --h31
//     T_37 | 26.107437 |   0.3565   | THIS RUN
//
// (8) POST-HOC, LABELLED POST-HOC: the six-level refit including T_31
//     computed after T_31 was known, and NOT the criterion of section 4.
//     H = 0.228096 + 0.005494 * lnD   ->   H*_6(T_37) = 0.371528   band [0.355897, 0.387158]
//     measured 0.356548, miss 0.014979 = 2.20 s.e.,  inside the post-hoc band
//
// [2026-08-19 20:24:39] done
// ============================================================
// READINGS
// ============================================================
