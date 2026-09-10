// ============================================================================
// scanstat2-02-crossover.js  —  THE TURNOVER THE DUALITY FORCES, MEASURED
// follow-up to the foreign import at IMPORT-MAP row 1, part 2 of 2
// ============================================================================
// research/history/staging/import-scanstat.md sec.1(e) proves the
// complementary-window duality on the cyclic tile word,
//
//     S_m(i) + S_{D-m}(i+m) = W    =>    maxsum_m + minsum_{D-m} = W,
//                                         sd_m = sd_{D-m},
//
// so sd_m is symmetric about m = D/2, vanishes at both ends, and the exponent
// H in sd_m ~ c m^H must fall to zero and then turn negative. That record
// carries one point of the turnover, the peak at m = 742 on T_13. It does not
// carry the curve. This file measures the whole curve, exactly, at T_13, where
// D = 1485 and every m from 1 to D-1 is affordable.
//
// WHY IT MATTERS BEYOND BEING PRETTY. The exponent series 0.2661 -> 0.3367 is
// fitted on a FIXED grid m <= 64. That grid is 4.3% of the circle at T_13 and
// 1.0e-8 of it at T_31. If the local exponent is already depressed at m = 64
// by the approach to the turnover, then part of the rise in H with level is a
// grid-fraction artifact and not a fact about D. The pre-registration
// (research/history/staging/scanstat2-prereg.md sec.4) registers that
// comparison in advance: refit H on the truncated grids m <= 16 and m <= 32 and
// compare with m <= 64, at every level that fits in memory.
//
//   node research/scanstat2-02-crossover.js       (~2 s)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const C2=require('./import-chaining-02.js');

const MS=[1,2,3,4,6,8,12,16,24,32,48,64];
const SUBGRIDS=[16,32,64];
const LEVELS=[13,17,19];

function ols(xs,ys){ const n=xs.length; const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  return {a,b,se:n>2?Math.sqrt(ss/(n-2)/sxx):NaN}; }

// exact family at EVERY m on one tile
function fullFamily(T){
  const {slots,W,D}=T, mbar=W/D;
  const at=(i)=>{ const q=Math.floor(i/D), r=i-q*D; return slots[r]+q*W; };
  const sd=new Float64Array(D), mxs=new Float64Array(D), mns=new Float64Array(D);
  for(let m=1;m<D;m++){
    let mx=-Infinity, mn=Infinity, s=0, s2=0;
    for(let i=0;i<D;i++){ const v=at(i+m)-slots[i];
      if(v>mx)mx=v; if(v<mn)mn=v; s+=v; s2+=v*v; }
    const mean=s/D; sd[m]=Math.sqrt(Math.max(0,s2/D-mean*mean)); mxs[m]=mx; mns[m]=mn;
  }
  return {sd,mxs,mns,D,W,mbar};
}

function main(){
console.log('scanstat2 part 2 --- the turnover in sd_m that the complementary-window duality forces\n');

const T=C2.tile(13); const F=fullFamily(T); const D=F.D, W=F.W;
console.log(`(1) T_13 IN FULL.  D = ${D}   W = ${W}   mbar = ${F.mbar.toFixed(5)}   every m from 1 to ${D-1} computed exactly   [${el()}]`);

// --- the duality, checked at every m, not at twelve
let dsd=0, dms=0, bad=0;
for(let m=1;m<D;m++){ const k=D-m;
  const a=Math.abs(F.sd[m]-F.sd[k]); if(a>dsd) dsd=a;
  const b=Math.abs(F.mxs[m]+F.mns[k]-W); if(b>dms) dms=b; if(b>1e-9) bad++; }
console.log(`    duality sd_m = sd_{D-m}:            max |difference| over all ${D-1} values of m = ${dsd.toExponential(3)}`);
console.log(`    duality maxsum_m + minsum_{D-m} = W: max |difference| = ${dms.toExponential(3)}, exact at ${D-1-bad} of ${D-1} values of m`);
console.log('    (the record checked twelve values of m; this checks every one)');

// --- the peak
let pk=1; for(let m=1;m<D;m++) if(F.sd[m]>F.sd[pk]) pk=m;
console.log(`    peak: sd_m maximal at m = ${pk} and m = ${D-pk} (D/2 = ${(D/2).toFixed(1)}), sd = ${F.sd[pk].toFixed(4)} = ${(F.sd[pk]/F.sd[1]).toFixed(4)} x sd_1`);
console.log(`    ends: sd_1 = ${F.sd[1].toFixed(4)}, sd_{D-1} = ${F.sd[D-1].toFixed(4)}, maxsum_{D-1} = ${F.mxs[D-1]} = W - ${W-F.mxs[D-1]}`);

// --- the local exponent
// A two-point log derivative is unusable here: sd_m at T_13 is jagged at the
// few-percent level because D = 1485 is small, and neighbouring m differ by more
// than the trend does. The local exponent below is therefore an OLS of ln sd on
// ln m over the octave [m/2, 2m], with the r.m.s. residual of that same fit
// printed beside it so the reader can see how much of the wiggle is noise.
const LEfit=(m)=>{ const a=Math.max(1,Math.round(m/2)), b=Math.min(D-1,Math.round(2*m));
  if(b-a<3) return {b:NaN,rms:NaN};
  const xs=[],ys=[]; for(let k=a;k<=b;k++){ xs.push(Math.log(k)); ys.push(Math.log(F.sd[k])); }
  const f=ols(xs,ys); let ss=0; for(let i=0;i<xs.length;i++) ss+=(ys[i]-f.a-f.b*xs[i])**2;
  return {b:f.b, rms:Math.sqrt(ss/xs.length)}; };
const LE=(m)=>LEfit(m).b;
console.log('\n(2) THE CURVE.  local exponent = OLS slope of ln sd_m on ln m over the octave [m/2, 2m]');
console.log('       m |    m/D    |    sd_m   | sd_m/sd_1 | sd_m/(sd_1 sqrt m) | local exponent | fit resid');
const ladder=[1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,371,512,600,700,742,800,1000,1200,1400,1484];
for(const m of ladder){ if(m<1||m>=D) continue;
  const L=LEfit(m);
  console.log(`  ${String(m).padStart(6)} | ${(m/D).toFixed(6)}  | ${F.sd[m].toFixed(4).padStart(9)} |  ${(F.sd[m]/F.sd[1]).toFixed(4)}   |       ${(F.sd[m]/(F.sd[1]*Math.sqrt(m))).toFixed(4)}       |    ${isNaN(L.b)?'  --   ':(L.b>=0?' ':'')+L.b.toFixed(4)}     |  ${isNaN(L.rms)?'  --  ':L.rms.toFixed(4)}`); }

// --- where the exponent crosses
console.log('\n(3) WHERE THE LOCAL EXPONENT CROSSES EACH LEVEL, and at what fraction of the circle');
const first=(thr)=>{ for(let m=2;m<D-1;m++){ const e=LE(m); if(!isNaN(e)&&e<thr) return m; } return null; };
console.log('    (on the octave-window fit, so a single jagged sd_m cannot trip a crossing)');
for(const thr of [0.30,0.25,0.20,0.15,0.10,0.05,0.00,-0.25,-0.50]){
  const m=first(thr);
  console.log(`    local exponent first below ${thr.toFixed(2).padStart(5)} at m = ${m===null?' never':String(m).padStart(6)}${m===null?'':`   m/D = ${(m/D).toFixed(6)}   sd_m = ${F.sd[m].toFixed(4)}`}`);
}
console.log(`    for scale: the fitted grid tops out at m = 64, which is m/D = ${(64/1485).toFixed(6)} at T_13, ${(64/22275).toExponential(3)} at T_17, ${(64/378675).toExponential(3)} at T_19, ${(64/7952175).toExponential(3)} at T_23, ${(64/214708725).toExponential(3)} at T_29 and ${(64/6226553025).toExponential(3)} at T_31`);

// --- the plateau, which is what the curve actually is
function plateau(F,lbl,edge){
  const D=F.D; const band=[]; for(let m=edge;m<=D-edge;m++) band.push(F.sd[m]);
  const mu=band.reduce((a,b)=>a+b)/band.length;
  const sg=Math.sqrt(band.reduce((a,b)=>a+(b-mu)**2,0)/band.length);
  let mn=Infinity,mx=-Infinity; for(const v of band){ if(v<mn)mn=v; if(v>mx)mx=v; }
  let ramp=null; for(let m=1;m<D;m++) if(F.sd[m]>=0.9*mu){ ramp=m; break; }
  let ramp99=null; for(let m=1;m<D;m++) if(F.sd[m]>=0.99*mu){ ramp99=m; break; }
  return {lbl,D,mu,sg,mn,mx,ramp,ramp99,edge};
}
console.log('\n(3b) THE SHAPE IS NOT AN ARCH, IT IS A PLATEAU WITH MIRRORED RAMPS');
console.log('     sd_m over the middle band, and the m at which the rise is already over');
console.log('  level |    D    | band          |   mean sd |  s.d. of it | min    | max    | m at 0.9 mean | at 0.99 mean | sd_64/mean | sd_1/mean');
const T17=C2.tile(17); const F17=fullFamily(T17);
for(const [G,lbl] of [[F,'T_13'],[F17,'T_17']]){
  const P=plateau(G,lbl,Math.round(G.D/12));
  console.log(`  ${lbl} | ${String(G.D).padStart(7)} | [${P.edge}, ${G.D-P.edge}] | ${P.mu.toFixed(4).padStart(9)} |   ${P.sg.toFixed(4).padStart(7)}   | ${P.mn.toFixed(2).padStart(6)} | ${P.mx.toFixed(2).padStart(6)} |     ${String(P.ramp).padStart(5)}     |    ${String(P.ramp99).padStart(5)}     |   ${(G.sd[64]/P.mu).toFixed(4)}   |  ${(G.sd[1]/P.mu).toFixed(4)}`);
}
console.log(`  [${el()}]`);

// --- the same two numbers at a level too large for the full family
// sd_m at one m costs D, so a geometric ladder plus a mid-band sample reaches
// T_19 in well under a second, and puts the ramp scale on three levels.
function sdAt(T,m){ const {slots,W,D}=T; const at=(i)=>{ const q=Math.floor(i/D), r=i-q*D; return slots[r]+q*W; };
  let s=0,s2=0; for(let i=0;i<D;i++){ const v=at(i+m)-slots[i]; s+=v; s2+=v*v; }
  const mean=s/D; return Math.sqrt(Math.max(0,s2/D-mean*mean)); }
console.log('\n(3c) HOW FAR UP THE RAMP THE FROZEN GRID REACHES, on three levels');
console.log('  m_f is the smallest m with sd_m >= f x (plateau mean). The 0.9 crossing is a late point on a');
console.log('  slowly saturating ramp and is the least stable of the three; the 0.5 crossing is the useful scale.');
console.log('  level |    D    | plateau mean sd | sd_64/mean |   m_0.5 |   m_0.7 |   m_0.9 | m_0.5/D | 64/m_0.5 | the grid m <= 64');
for(const x of LEVELS){
  const Tx=C2.tile(x), Dx=Tx.D;
  const mid=[]; for(let k=0;k<24;k++) mid.push(Math.round(Dx/6+k*(2*Dx/3)/23));
  const mu=mid.map(m=>sdAt(Tx,m)).reduce((a,b)=>a+b)/mid.length;
  const lad=[]; for(let m=1;m<Dx/2;m=Math.max(m+1,Math.round(m*1.1))) lad.push(m);
  const cross=(f)=>{ for(const m of lad) if(sdAt(Tx,m)>=f*mu) return m; return null; };
  const m5=cross(0.5), m7=cross(0.7), m9=cross(0.9);
  console.log(`  T_${String(x).padStart(2)} | ${String(Dx).padStart(7)} |    ${mu.toFixed(4).padStart(9)}    |   ${(sdAt(Tx,64)/mu).toFixed(4)}   | ${String(m5).padStart(7)} | ${String(m7).padStart(7)} | ${String(m9).padStart(7)} | ${(m5/Dx).toExponential(3)} |  ${(64/m5).toFixed(4)}  | ${64>=m9?'runs PAST the plateau onset':(64>=m5?'reaches the middle of the ramp':'stays low on the ramp')}`);
}
console.log(`  [${el()}]`);

// --- the registered adversarial comparison
console.log('\n(4) THE PRE-REGISTERED GRID-FRACTION TEST (prereg sec.4)');
console.log('    H refitted on the truncated grids. If H(m<=16) exceeds H(m<=64) by more than one');
console.log('    regression s.e., the T_13 exponent is depressed by the approach to the turnover and');
console.log('    the rise of H with level is partly a grid artifact.');
console.log('  level |    D    |  H(m<=16)  +/- se |  H(m<=32)  +/- se |  H(m<=64)  +/- se | H(16)-H(64) | in s.e. of H(64)');
for(const x of LEVELS){
  const Tx=C2.tile(x); const st=C2.maxsumStats(Tx,MS);
  const f={};
  for(const g of SUBGRIDS){ const sub=st.filter(r=>r.m<=g);
    f[g]=ols(sub.map(r=>Math.log(r.m)), sub.map(r=>Math.log(r.sd))); }
  const d=f[16].b-f[64].b;
  console.log(`  T_${String(x).padStart(2)} | ${String(Tx.D).padStart(7)} |  ${f[16].b.toFixed(4)} +/- ${f[16].se.toFixed(4)} |  ${f[32].b.toFixed(4)} +/- ${f[32].se.toFixed(4)} |  ${f[64].b.toFixed(4)} +/- ${f[64].se.toFixed(4)} |   ${d>=0?'+':''}${d.toFixed(4)}   |   ${(d/f[64].se).toFixed(2)}`);
}
console.log('    (T_13, T_17, T_19 are the levels that fit in memory; the same grid is used at all six');
console.log('     levels, so any grid effect that is present here is present a fortiori at T_13, whose');
console.log('     m/D is five to eight orders of magnitude larger than the deep levels\')');

console.log(`\n[${el()}] done`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/scanstat2-02-crossover.js
//   invocation:  node research/scanstat2-02-crossover.js
//   code-sha256: eb5ae37cc4246856b1bc8da477efe1a9568f260a76c1f02e83e3ea9ccea9a60d
//   out-sha256:  6ee92e9667220883e6ada62effd5dc90ed565e553cc170c05af0abbbea03a99f
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     3.6 s
// ============================================================================
// scanstat2 part 2 --- the turnover in sd_m that the complementary-window duality forces
//
// (1) T_13 IN FULL.  D = 1485   W = 30030   mbar = 20.22222   every m from 1 to 1484 computed exactly   [0.0s]
//     duality sd_m = sd_{D-m}:            max |difference| over all 1484 values of m = 3.025e-9
//     duality maxsum_m + minsum_{D-m} = W: max |difference| = 0.000e+0, exact at 1484 of 1484 values of m
//     (the record checked twelve values of m; this checks every one)
//     peak: sd_m maximal at m = 742 and m = 743 (D/2 = 742.5), sd = 42.7673 = 3.5543 x sd_1
//     ends: sd_1 = 12.0326, sd_{D-1} = 12.0326, maxsum_{D-1} = 30024 = W - 6
//
// (2) THE CURVE.  local exponent = OLS slope of ln sd_m on ln m over the octave [m/2, 2m]
//        m |    m/D    |    sd_m   | sd_m/sd_1 | sd_m/(sd_1 sqrt m) | local exponent | fit resid
//        1 | 0.000673  |   12.0326 |  1.0000   |       1.0000       |      --        |    --
//        2 | 0.001347  |   16.4786 |  1.3695   |       0.9684       |     0.4968     |  0.0127
//        3 | 0.002020  |   20.8071 |  1.7292   |       0.9984       |     0.4074     |  0.0395
//        4 | 0.002694  |   23.8148 |  1.9792   |       0.9896       |     0.2452     |  0.0857
//        6 | 0.004040  |   25.3837 |  2.1096   |       0.8612       |    -0.0102     |  0.0750
//        8 | 0.005387  |   22.5990 |  1.8782   |       0.6640       |     0.1472     |  0.1135
//       12 | 0.008081  |   24.7463 |  2.0566   |       0.5937       |     0.2666     |  0.0891
//       16 | 0.010774  |   31.0986 |  2.5845   |       0.6461       |     0.3605     |  0.0682
//       24 | 0.016162  |   33.3433 |  2.7711   |       0.5656       |     0.2959     |  0.0463
//       32 | 0.021549  |   33.8529 |  2.8134   |       0.4974       |     0.2606     |  0.0433
//       48 | 0.032323  |   40.8078 |  3.3914   |       0.4895       |     0.0351     |  0.0638
//       64 | 0.043098  |   39.7762 |  3.3057   |       0.4132       |    -0.2071     |  0.0875
//       96 | 0.064646  |   35.3691 |  2.9394   |       0.3000       |    -0.0453     |  0.1254
//      128 | 0.086195  |   29.8670 |  2.4822   |       0.2194       |    -0.0419     |  0.1123
//      192 | 0.129293  |   40.0771 |  3.3307   |       0.2404       |     0.0963     |  0.0988
//      256 | 0.172391  |   35.0051 |  2.9092   |       0.1818       |     0.0152     |  0.0974
//      371 | 0.249832  |   37.4303 |  3.1108   |       0.1615       |    -0.0276     |  0.1147
//      512 | 0.344781  |   40.7714 |  3.3884   |       0.1497       |    -0.0437     |  0.1254
//      600 | 0.404040  |   34.2400 |  2.8456   |       0.1162       |    -0.0013     |  0.1210
//      700 | 0.471380  |   35.0809 |  2.9155   |       0.1102       |    -0.0020     |  0.1203
//      742 | 0.499663  |   42.7673 |  3.5543   |       0.1305       |    -0.0090     |  0.1330
//      800 | 0.538721  |   21.4333 |  1.7813   |       0.0630       |     0.0014     |  0.1342
//     1000 | 0.673401  |   37.6344 |  3.1277   |       0.0989       |    -0.0094     |  0.1378
//     1200 | 0.808081  |   40.9164 |  3.4005   |       0.0982       |    -0.0086     |  0.1402
//     1400 | 0.942761  |   35.9308 |  2.9861   |       0.0798       |    -0.0556     |  0.1343
//     1484 | 0.999327  |   12.0326 |  1.0000   |       0.0260       |    -0.0231     |  0.1362
//
// (3) WHERE THE LOCAL EXPONENT CROSSES EACH LEVEL, and at what fraction of the circle
//     (on the octave-window fit, so a single jagged sd_m cannot trip a crossing)
//     local exponent first below  0.30 at m =      4   m/D = 0.002694   sd_m = 23.8148
//     local exponent first below  0.25 at m =      4   m/D = 0.002694   sd_m = 23.8148
//     local exponent first below  0.20 at m =      5   m/D = 0.003367   sd_m = 25.2884
//     local exponent first below  0.15 at m =      5   m/D = 0.003367   sd_m = 25.2884
//     local exponent first below  0.10 at m =      5   m/D = 0.003367   sd_m = 25.2884
//     local exponent first below  0.05 at m =      5   m/D = 0.003367   sd_m = 25.2884
//     local exponent first below  0.00 at m =      5   m/D = 0.003367   sd_m = 25.2884
//     local exponent first below -0.25 at m =     68   m/D = 0.045791   sd_m = 41.9784
//     local exponent first below -0.50 at m =  never
//     for scale: the fitted grid tops out at m = 64, which is m/D = 0.043098 at T_13, 2.873e-3 at T_17, 1.690e-4 at T_19, 8.048e-6 at T_23, 2.981e-7 at T_29 and 1.028e-8 at T_31
//
// (3b) THE SHAPE IS NOT AN ARCH, IT IS A PLATEAU WITH MIRRORED RAMPS
//      sd_m over the middle band, and the m at which the rise is already over
//   level |    D    | band          |   mean sd |  s.d. of it | min    | max    | m at 0.9 mean | at 0.99 mean | sd_64/mean | sd_1/mean
//   T_13 |    1485 | [124, 1361] |   35.5355 |    4.0131   |  21.43 |  42.77 |        24     |       26     |   1.1193   |  0.3386
//   T_17 |   22275 | [1856, 20419] |   76.5992 |   12.5501   |  38.81 |  95.52 |       435     |     1133     |   0.6392   |  0.1904
//   [2.7s]
//
// (3c) HOW FAR UP THE RAMP THE FROZEN GRID REACHES, on three levels
//   m_f is the smallest m with sd_m >= f x (plateau mean). The 0.9 crossing is a late point on a
//   slowly saturating ramp and is the least stable of the three; the 0.5 crossing is the useful scale.
//   level |    D    | plateau mean sd | sd_64/mean |   m_0.5 |   m_0.7 |   m_0.9 | m_0.5/D | 64/m_0.5 | the grid m <= 64
//   T_13 |    1485 |      34.6869    |   1.1467   |       3 |       5 |      23 | 2.020e-3 |  21.3333  | runs PAST the plateau onset
//   T_17 |   22275 |      75.0275    |   0.6526   |      19 |     131 |     450 | 8.530e-4 |  3.3684  | reaches the middle of the ramp
//   T_19 |  378675 |     171.4357    |   0.3689   |     372 |    5917 |   77575 | 9.824e-4 |  0.1720  | stays low on the ramp
//   [3.0s]
//
// (4) THE PRE-REGISTERED GRID-FRACTION TEST (prereg sec.4)
//     H refitted on the truncated grids. If H(m<=16) exceeds H(m<=64) by more than one
//     regression s.e., the T_13 exponent is depressed by the approach to the turnover and
//     the rise of H with level is partly a grid artifact.
//   level |    D    |  H(m<=16)  +/- se |  H(m<=32)  +/- se |  H(m<=64)  +/- se | H(16)-H(64) | in s.e. of H(64)
//   T_13 |    1485 |  0.2921 +/- 0.0487 |  0.2739 +/- 0.0322 |  0.2661 +/- 0.0230 |   +0.0260   |   1.13
//   T_17 |   22275 |  0.3030 +/- 0.0368 |  0.3051 +/- 0.0235 |  0.2804 +/- 0.0189 |   +0.0226   |   1.19
//   T_19 |  378675 |  0.3097 +/- 0.0283 |  0.3093 +/- 0.0180 |  0.3001 +/- 0.0130 |   +0.0095   |   0.73
//     (T_13, T_17, T_19 are the levels that fit in memory; the same grid is used at all six
//      levels, so any grid effect that is present here is present a fortiori at T_13, whose
//      m/D is five to eight orders of magnitude larger than the deep levels')
//
// [3.5s] done
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE DUALITY HOLDS AT EVERY m, NOT AT TWELVE. [VERIFIED] max |sd_m -
//    sd_{D-m}| = 3.025e-9 over all 1484 values of m, floating point only, and
//    maxsum_m + minsum_{D-m} = W is exact at 1484 of 1484. The staging record
//    for the import checked twelve values; this checks the whole circle. The
//    endpoint case is the free bound it names: maxsum_{D-1} = 30024 = W - 6.
//
// 2. THE TURNOVER IS NOT AN ARCH. IT IS A PLATEAU WITH MIRRORED RAMPS.
//    [MEASURED] Over the middle band [124, 1361] at T_13, sd_m has mean
//    35.5355 with a standard deviation of 4.0131, a minimum of 21.43 and a
//    maximum of 42.77. The "peak at m = 742" is 42.7673, which is that
//    maximum: it is the top of the scatter on a flat stretch, not a summit. The
//    octave-window local exponent from m = 128 to m = 1400 reads -0.0419,
//    0.0963, 0.0152, -0.0276, -0.0437, -0.0013, -0.0020, -0.0090, 0.0014,
//    -0.0094, -0.0086, -0.0556, i.e. zero to within the fit residual of about
//    0.12 everywhere in between. sd_m rises, flattens for most of the circle,
//    and falls again only in the last stretch, where sd_{D-1} = sd_1 = 12.0326.
//
// 3. THE RAMP HAS A SCALE, AND IT IS NOT m <= 64. [MEASURED] The smallest m
//    reaching half the plateau is m_0.5 = 3 at T_13, 19 at T_17 and 372 at
//    T_19; nine tenths of it is reached at 23, 450 and 77575. In the same
//    units sd_64/mean is 1.1467, 0.6526 and 0.3689.
//
// 4. SO THE FROZEN GRID MEASURES A DIFFERENT PART OF THE CURVE AT EVERY LEVEL.
//    [MEASURED] 64/m_0.5 is 21.3333 at T_13, 3.3684 at T_17 and 0.1720 at
//    T_19. At T_13 the grid runs past the plateau onset entirely, which is what
//    sd_64/mean = 1.1467 says: the top of the fitted grid is already ON the
//    plateau, where the true local exponent is zero. At T_19 and below in m/D
//    the grid stays low on the ramp.
//
// 5. THE PRE-REGISTERED GRID-FRACTION TEST FIRES AT T_13, BUT NOT FOR THE
//    REASON IT WAS REGISTERED FOR. [MEASURED] The criterion sealed in
//    research/history/staging/scanstat2-prereg.md sec.4 was H(m<=16) exceeding
//    H(m<=64) at T_13 by more than one regression standard error. It does:
//    +0.0260, which is 1.13 s.e. The same difference is +0.0226 (1.19 s.e.) at
//    T_17 and +0.0095 (0.73 s.e.) at T_19. On these three levels alone that
//    reads as an effect decaying as the grid retreats down the ramp, which is
//    the turnover attribution this file registered. IT IS NOT. Section 5b of
//    research/scanstat2-01-t31.js carries the same comparison at T_23, T_29 and
//    T_31, where the difference is +0.0200, +0.0179 and +0.0177, flat in size
//    and rising in significance to 2.61 s.e., while 64/D falls to 1.028e-8. A
//    turnover effect cannot survive eight orders of magnitude of retreat. The
//    concavity is a small-m property of ln sd_m present at every level.
//
// 6. WHAT THAT COSTS THE EXPONENT SERIES. [INFERRED] H is a grid-dependent
//    summary of a curved function at every level, not only at T_13, so the
//    quantity being extrapolated in lnD is not the same quantity at each point
//    in a strict sense. This file's turnover measurement does not explain the
//    rise from 0.2661 upward; what it does establish is the outer boundary of
//    the fit's validity, since the true exponent must reach zero by the plateau
//    and the fitted grid at T_13 already sits on it.
//
// 7. WHAT IT DOES NOT COST. [MEASURED] Nothing here rescues sqrt(m). The
//    largest exponent any truncation produces at any level is 0.3097, at T_19
//    on m <= 16, and even at T_13 the least contaminated fit is 0.2921. The
//    refutation of 0.5 is untouched by the grid question; only the SHAPE of
//    H(ln D) is put in doubt by it.
//
// 8. A CAVEAT ON THE TWO PLATEAU MEANS. [MEASURED] Section 3b computes the T_13
//    plateau mean exactly over [124, 1361] and gets 35.5355; section 3c
//    estimates it from a 24-point sample of the middle band and gets 34.6869.
//    They differ by the scatter, 4.0131, divided by the sample size, and the
//    ramp scales in 3c are insensitive to that difference at the resolution of
//    the 1.1-ratio ladder they are found on.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// BORROWED, verified present in the named producer's embedded output: the
// +0.0179 and +0.0177 differences are research/scanstat2-01-t31.js section 5b,
// whose table rows read "T_29 | ... | +0.0179 | 2.25 | 2.981e-7" and
// "T_31 | ... | +0.0177 | 2.61 | 1.028e-8". The 2.61 s.e. and the 1.028e-8
// quoted in the same sentence come off the T_31 row of that same table. This
// run stops at T_19, which is the point the reading makes.
// ---------------------------------------------------------------------------
