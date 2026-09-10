// ============================================================================
// import-scanstat-03-prereg.js  —  THE PRE-REGISTRATION, WRITTEN BEFORE T_23
// foreign-import experiment, IMPORT-MAP row 1 (scan statistics), part 3 of 4
// ============================================================================
// WHAT THIS IS. research/IMPORT-MAP.md row 1 pre-registers a kill criterion:
// a two-parameter law c*m^H, fitted BELOW the target level, must beat the
// incumbent sigma*sqrt(m) OUT OF SAMPLE at T_23, or the import's hole-fix
// fails. This script freezes both predictions to disk before part 4 computes
// anything at T_23 or T_29. It reads ONLY T_13, T_17, T_19.
//
// THE RULE, fixed here and not revisited:
//   grid          M = [1,2,3,4,6,8,12,16,24,32,48,64]  (import-chaining-03.js's)
//   per level     OLS of ln sd_m on ln m over M  ->  (a_l = ln c_l, H_l)
//                 sd_m is the exact s.d. of slot[i+m]-slot[i] over i in Z/D
//   extrapolate   OLS of a_l on ln D_l, and of H_l on ln D_l, over l = 13,17,19
//   MODEL A       ln sd_m = a* + H* ln m               (the import's fix)
//   MODEL B       ln sd_m = b* + 0.5 ln m              (TODO 0c's incumbent)
//                 b* = OLS extrapolation of ln sd_1(l) on ln D_l
//   both models   maxsum_m = m*mbar + sd_m * sqrt(2 ln D),  mbar = W/D
//   D, W          closed form: D = prod_{5<=p<=x}(p-2), W = 6 prod_{5<=p<=x} p
//   score         RMS of ln(pred/actual), over M, on sd_m and on
//                 excess_m = maxsum_m - m*mbar; and max |rel err|
//   KILL          Model A must beat Model B on ln-RMS of excess_m at T_23.
//
// Riders A' and B' are the same two laws ANCHORED at the target level's exact
// sd_1 instead of the extrapolated intercept; they are scored too, because the
// dispute in TODO 0c is about the EXPONENT and anchoring removes the intercept
// from the comparison. A' and B' differ in exactly one number, H* against 0.5.
//
// DISCLOSED LEAK, on the record. The T_23 exponent 0.3216 +/- 0.0096 and the
// T_23 column sd_m/(sd_1 sqrt m) are already published in this corpus, in the
// embedded OUTPUT of research/import-chaining-03.js (d). So T_23 is out of
// sample for the FIT but not blind to the author. T_29 has never been computed
// in this corpus for any moving-sum statistic, so T_29 is the blind level, and
// it is pre-registered here on the identical rule.
//
//   node research/import-scanstat-03-prereg.js
// ============================================================================
'use strict';
const fs=require('fs'), path=require('path');
const C2=require('./import-chaining-02.js');

const MS=[1,2,3,4,6,8,12,16,24,32,48,64];
const FIT=[13,17,19];
const TARGETS=[23,29];

function primesTo(n){ const s=[]; for(let i=2;i<=n;i++){ let p=true; for(let j=2;j*j<=i;j++) if(i%j===0){p=false;break;} if(p) s.push(i);} return s; }
function tileDW(x){ let D=1,W=6; for(const p of primesTo(x)) if(p>=5){ D*=(p-2); W*=p; } return {D,W}; }
function ols(xs,ys){ const n=xs.length; const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  const se=n>2?Math.sqrt(ss/(n-2)/sxx):NaN; return {a,b,se}; }

function main(){
console.log('IMPORT-MAP row 1 / part 3 --- PRE-REGISTRATION (reads T_13, T_17, T_19 only)\n');

// ---- the in-sample fits
console.log('(1) IN-SAMPLE FITS, one per level, on the frozen grid M');
console.log('  level |      D |   ln D  |   sd_1   |  ln c_l  |   H_l    +/- se');
const rows=[];
for(const x of FIT){
  const T=C2.tile(x); const st=C2.maxsumStats(T,MS);
  const f=ols(MS.map(Math.log), st.map(r=>Math.log(r.sd)));
  rows.push({x, D:T.D, lnD:Math.log(T.D), sd1:st[0].sd, a:f.a, H:f.b, se:f.se, st});
  console.log(`  T_${String(x).padStart(2)} | ${String(T.D).padStart(6)} | ${Math.log(T.D).toFixed(4)} | ${st[0].sd.toFixed(4).padStart(8)} | ${f.a.toFixed(5).padStart(8)} | ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)}`);
}
const fa=ols(rows.map(r=>r.lnD), rows.map(r=>r.a));
const fH=ols(rows.map(r=>r.lnD), rows.map(r=>r.H));
const fb=ols(rows.map(r=>r.lnD), rows.map(r=>Math.log(r.sd1)));
console.log('\n(2) THE EXTRAPOLATION LAWS, OLS in ln D over the three fit levels');
console.log(`  ln c(lnD) = ${fa.a.toFixed(6)} + ${fa.b.toFixed(6)} * lnD`);
console.log(`  H(lnD)    = ${fH.a.toFixed(6)} + ${fH.b.toFixed(6)} * lnD`);
console.log(`  ln sd_1   = ${fb.a.toFixed(6)} + ${fb.b.toFixed(6)} * lnD      (Model B's intercept)`);

const pre={rule:'OLS in lnD over T_13,T_17,T_19; grid '+MS.join(','), laws:{lnc:[fa.a,fa.b],H:[fH.a,fH.b],lnsd1:[fb.a,fb.b]}, targets:{}};

console.log('\n(3) THE FROZEN PREDICTIONS');
for(const x of TARGETS){
  const {D,W}=tileDW(x); const lnD=Math.log(D), mbar=W/D, tail=Math.sqrt(2*lnD);
  const astar=fa.a+fa.b*lnD, Hstar=fH.a+fH.b*lnD, bstar=fb.a+fb.b*lnD;
  console.log(`\n  T_${x}:  D = ${D}   W = ${W}   mbar = ${mbar.toFixed(5)}   sqrt(2 lnD) = ${tail.toFixed(4)}`);
  console.log(`         H* = ${Hstar.toFixed(4)}   ln c* = ${astar.toFixed(5)} (c* = ${Math.exp(astar).toFixed(4)})   Model B ln sd_1* = ${bstar.toFixed(5)} (sd_1* = ${Math.exp(bstar).toFixed(4)})`);
  console.log('    m |  A: sd_m   A: maxsum_m |  B: sd_m   B: maxsum_m |  A/B on excess');
  const tgt={D,W,mbar,tail,Hstar,astar,bstar,rows:[]};
  for(const m of MS){
    const sdA=Math.exp(astar)*Math.pow(m,Hstar), sdB=Math.exp(bstar)*Math.sqrt(m);
    const msA=m*mbar+sdA*tail, msB=m*mbar+sdB*tail;
    tgt.rows.push({m,sdA,sdB,msA,msB});
    console.log(`  ${String(m).padStart(3)} | ${sdA.toFixed(3).padStart(8)}  ${msA.toFixed(1).padStart(10)} | ${sdB.toFixed(3).padStart(8)}  ${msB.toFixed(1).padStart(10)} |  ${(sdA/sdB).toFixed(4)}`);
  }
  pre.targets['T_'+x]=tgt;
}

// ---- freeze to disk
const out=[];
out.push('# Pre-registration: IMPORT-MAP row 1, the maxsum exponent at T_23 and T_29');
out.push('');
out.push('**This file is machine-written by `research/import-scanstat-03-prereg.js` and is not');
out.push('hand-edited.** It exists so that part 4 of the experiment cannot be scored against a');
out.push('prediction chosen after the fact. Regenerate with `node research/import-scanstat-03-prereg.js`;');
out.push('the fit reads T_13, T_17 and T_19 only.');
out.push('');
out.push('Rule: '+pre.rule+'. Model A is `sd_m = c* m^H*`; Model B is `sd_m = sd_1* sqrt(m)`;');
out.push('both give `maxsum_m = m*mbar + sd_m*sqrt(2 ln D)`. Kill criterion: Model A must beat');
out.push('Model B on the ln-RMS of `excess_m = maxsum_m - m*mbar` at T_23.');
out.push('');
out.push('Extrapolation laws, OLS in `ln D`:');
out.push('');
out.push('```');
out.push(`ln c   = ${fa.a.toFixed(6)} + ${fa.b.toFixed(6)} * lnD`);
out.push(`H      = ${fH.a.toFixed(6)} + ${fH.b.toFixed(6)} * lnD`);
out.push(`ln sd_1= ${fb.a.toFixed(6)} + ${fb.b.toFixed(6)} * lnD`);
out.push('```');
for(const x of TARGETS){
  const t=pre.targets['T_'+x];
  out.push('');
  out.push(`## T_${x}   (D = ${t.D}, W = ${t.W}, mbar = ${t.mbar.toFixed(5)}, sqrt(2 lnD) = ${t.tail.toFixed(4)})`);
  out.push('');
  out.push(`H* = ${t.Hstar.toFixed(4)}, c* = ${Math.exp(t.astar).toFixed(4)}, Model B sd_1* = ${Math.exp(t.bstar).toFixed(4)}`);
  out.push('');
  out.push('| m | A: sd_m | A: maxsum_m | B: sd_m | B: maxsum_m |');
  out.push('|---|---|---|---|---|');
  for(const r of t.rows) out.push(`| ${r.m} | ${r.sdA.toFixed(3)} | ${r.msA.toFixed(1)} | ${r.sdB.toFixed(3)} | ${r.msB.toFixed(1)} |`);
}
out.push('');
out.push('Disclosed leak: the T_23 exponent and its `sd_m/(sd_1 sqrt m)` column are already');
out.push('published in the embedded output of `../../import-chaining-03.js`, so T_23 is out of');
out.push('sample for the fit and not blind to the author. T_29 has never been computed here for');
out.push('any moving-sum statistic and is the blind level.');
out.push('');
const dest=path.resolve(__dirname,'history','staging','import-scanstat-prereg.md');
fs.writeFileSync(dest, out.join('\n'));
console.log(`\nfrozen to research/history/staging/import-scanstat-prereg.md (${out.join('\n').length} bytes)`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-scanstat-03-prereg.js
//   invocation:  node research/import-scanstat-03-prereg.js
//   code-sha256: 36ccffb709dc0b420ef121b218bd42d871874e35e51642001cd56b5db916f590
//   out-sha256:  c416492ef8454061dd67c7b2b9df8f291967ff6c0b6a130c98fe168302c726d0
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.5 s
// ============================================================================
// IMPORT-MAP row 1 / part 3 --- PRE-REGISTRATION (reads T_13, T_17, T_19 only)
//
// (1) IN-SAMPLE FITS, one per level, on the frozen grid M
//   level |      D |   ln D  |   sd_1   |  ln c_l  |   H_l    +/- se
//   T_13 |   1485 | 7.3032 |  12.0326 |  2.64446 | 0.2661 +/- 0.0230
//   T_17 |  22275 | 10.0112 |  14.5863 |  2.81034 | 0.2804 +/- 0.0189
//   T_19 | 378675 | 12.8444 |  17.1618 |  2.93725 | 0.3001 +/- 0.0130
//
// (2) THE EXTRAPOLATION LAWS, OLS in ln D over the three fit levels
//   ln c(lnD) = 2.266792 + 0.052776 * lnD
//   H(lnD)    = 0.220511 + 0.006140 * lnD
//   ln sd_1   = 2.026484 + 0.064025 * lnD      (Model B's intercept)
//
// (3) THE FROZEN PREDICTIONS
//
//   T_23:  D = 7952175   W = 223092870   mbar = 28.05432   sqrt(2 lnD) = 5.6372
//          H* = 0.3181   ln c* = 3.10535 (c* = 22.3170)   Model B ln sd_1* = 3.04378 (sd_1* = 20.9845)
//     m |  A: sd_m   A: maxsum_m |  B: sd_m   B: maxsum_m |  A/B on excess
//     1 |   22.317       153.9 |   20.984       146.3 |  1.0635
//     2 |   27.822       212.9 |   29.677       223.4 |  0.9375
//     3 |   31.651       262.6 |   36.346       289.1 |  0.8708
//     4 |   34.684       307.7 |   41.969       348.8 |  0.8264
//     6 |   39.458       390.8 |   51.401       458.1 |  0.7677
//     8 |   43.239       468.2 |   59.353       559.0 |  0.7285
//    12 |   49.191       613.9 |   72.692       746.4 |  0.6767
//    16 |   53.904       752.7 |   83.938       922.0 |  0.6422
//    24 |   61.324      1019.0 |  102.802      1252.8 |  0.5965
//    32 |   67.200      1276.6 |  118.706      1566.9 |  0.5661
//    48 |   76.450      1777.6 |  145.385      2166.2 |  0.5258
//    64 |   83.775      2267.7 |  167.876      2741.8 |  0.4990
//
//   T_29:  D = 214708725   W = 6469693230   mbar = 30.13242   sqrt(2 lnD) = 6.1943
//          H* = 0.3383   ln c* = 3.27929 (c* = 26.5569)   Model B ln sd_1* = 3.25480 (sd_1* = 25.9144)
//     m |  A: sd_m   A: maxsum_m |  B: sd_m   B: maxsum_m |  A/B on excess
//     1 |   26.557       194.6 |   25.914       190.7 |  1.0248
//     2 |   33.575       268.2 |   36.649       287.3 |  0.9161
//     3 |   38.511       328.9 |   44.885       368.4 |  0.8580
//     4 |   42.448       383.5 |   51.829       441.6 |  0.8190
//     6 |   48.688       482.4 |   63.477       574.0 |  0.7670
//     8 |   53.665       573.5 |   73.297       695.1 |  0.7322
//    12 |   61.555       742.9 |   89.770       917.7 |  0.6857
//    16 |   67.847       902.4 |  103.658      1124.2 |  0.6545
//    24 |   77.822      1205.2 |  126.954      1509.6 |  0.6130
//    32 |   85.776      1495.6 |  146.594      1872.3 |  0.5851
//    48 |   98.387      2055.8 |  179.540      2558.5 |  0.5480
//    64 |  108.444      2600.2 |  207.315      3212.7 |  0.5231
//
// frozen to research/history/staging/import-scanstat-prereg.md (2542 bytes)
// ============================================================
// READINGS
// ============================================================
//
// 1. THE THREE IN-SAMPLE FITS. [MEASURED] H_l = 0.2661 +/- 0.0230,
//    0.2804 +/- 0.0189, 0.3001 +/- 0.0130 at T_13, T_17, T_19, reproducing
//    import-chaining-03.js (d) exactly from an independently written path, and
//    ln c_l = 2.64446, 2.81034, 2.93725. sd_1 is 12.0326, 14.5863, 17.1618.
//
// 2. THE EXTRAPOLATION LAWS, FROZEN. [MEASURED] H(lnD) = 0.220511 +
//    0.006140*lnD, ln c(lnD) = 2.266792 + 0.052776*lnD, and for the incumbent
//    ln sd_1 = 2.026484 + 0.064025*lnD. Three points, two parameters each: this
//    is a rule, not a theory, and it is written down before the test so that it
//    cannot become one afterwards.
//
// 3. THE PREDICTIONS THE EXPERIMENT WILL BE SCORED ON. [INFERRED] At T_23,
//    H* = 0.3181 and c* = 22.3170, giving maxsum_64 = 2267.7 against the
//    incumbent's 2741.8; at T_29, H* = 0.3383 and c* = 26.5569, giving
//    maxsum_64 = 2600.2 against 3212.7. The two laws disagree by a ratio 1.0635
//    at m = 1, in the incumbent's favour, and by 0.4990 at m = 64, so the test
//    has real power at the top of the grid and almost none at the bottom.
//
// 4. WHAT IS AND IS NOT BLIND. T_23's exponent is already in this corpus, in
//    the embedded output of import-chaining-03.js, so T_23 is out of sample for
//    the fit and not blind to the author; T_29 is blind to both. The pre-
//    registration covers both and the staging record scores both, marked.
