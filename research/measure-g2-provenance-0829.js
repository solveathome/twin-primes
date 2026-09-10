'use strict';
// ============================================================================
// MEASURE-G2-PROVENANCE — does the 1.50 headline depend on unreproduced terms?
//
// QUESTION (object-g2-read-0829.md section 6 C4 and section 8 Q6, label (i))
// The headline two-class exponent 1.50 +/- 0.05 (exponent-control.md section 5,
// G2-STATE.md sections 3a and 6.1) is fitted on 22 trusted terms of A144311 to
// x = 79.  Fourteen of those terms are custody-grade, reproduced here by exact
// enumeration (research/exact-g2-ladder.js, x = 2..43).  The other eight have
// never been reproduced in this repository.  Nobody has split the fit by
// provenance.  This script does it with exponent-control.js's OWN estimator and
// OWN control correction, changing nothing else.
//
// HONEST DOUBT, recorded before the numbers
//  (a) The estimator is known wrong here: on 58 terms of the one-class control,
//      true exponent 1, it reports 1.282.  Every "corrected" figure below is a
//      raw fit minus a measured bias whose systematic is unquantified.
//  (b) Shorter prefixes make the raw fit MOVE for reasons that have nothing to
//      do with provenance: the control's own raw fit rises with prefix length
//      (1.191 at 10 terms, 1.282 at 56).  A provenance block and a range are
//      confounded here and cannot be separated on 20 points.
//  (c) The control's sliding windows are CONTIGUOUS in p.  A leave-one-block-out
//      set is not.  For non-contiguous sets the correction is matched on the
//      point COUNT only, which is an approximation and is flagged in the output.
//  (d) n = 8 for the external-only fit.  Nothing read off eight points here is
//      more than an orientation.
//
// PROVENANCE, read at the A144311 entry and recorded in
// research/a144311-full-ladder.js:
//    a(1)-a(7)    Andrew Carter, Sep 17 2008
//    a(8)-a(16)   Max Alekseyev, Nov 18 2009
//    a(17)-a(22)  Jinyuan Wang, Nov 26 2024
// research/exact-g2-ladder.js independently covers a(1)-a(14) (x = 2..43) by
// exact enumeration here, the last four terms computed in this repository, so
// the split by WHAT THIS REPOSITORY HAS NOT REPRODUCED is
//    custody          14 terms  x = 2..43
//    Alekseyev-only    2 terms  x = 47, 53
//    Wang-only         6 terms  x = 59..79
// and not the "six and six" the briefing carried.  Both readings are printed.
//
// DATA.  H = A048670, 64 terms (58 entry-face + Bozek b-file tail), the control
// whose true exponent is 1 + o(1).  G2T = A144311 + 1, 22 trusted terms.  Both
// arrays are copied from research/exponent-control.js and research/
// a144311-full-ladder.js and are asserted against each other below.
//
// Runs in about a second.
// ============================================================================

const H = [2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,190,
  200,216,234,258,264,282,300,312,330,354,378,388,414,432,450,476,492,510,538,
  550,574,600,616,642,660,686,718,742,762,798,810,834,858,876,908,926,954,
  978,1002,1030,1058,1098,1110];
const G2T = [2,6,12,30,42,66,108,150,204,258,348,528,546,618,708,870,966,1080,
  1284,1398,1530,1710];
const CUSTODY = [2,6,12,30,42,66,108,150,204,258,348,528,546,618];  // exact-g2-ladder.js

function sievePrimes(n){const s=new Uint8Array(n+1),o=[];
  for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const P = sievePrimes(2000).slice(0,64);
const TH = []; {let t=0;for(let i=0;i<64;i++){t+=Math.log(P[i]);TH.push(t);}}

// hard transcription guards
for(let i=0;i<CUSTODY.length;i++)
  if(CUSTODY[i]!==G2T[i]) throw new Error('custody vs trusted ladder disagree at i='+i);
for(let n=1;n<22;n++)
  if((G2T[n]-1)%6!==5) throw new Error('A144311 5 mod 6 guard failed at n='+(n+1));

/* --- the estimator, copied verbatim from exponent-control.js --------- */
function fitIdx(y,basis,idx){
  let n=0,sx=0,sy=0,sxx=0,sxy=0;
  for(const i of idx){const X=Math.log(basis[i]),Y=Math.log(y[i]);
    n++;sx+=X;sy+=Y;sxx+=X*X;sxy+=X*Y;}
  const Sxx=sxx-sx*sx/n, a=(sxy-sx*sy/n)/Sxx, ic=(sy-a*sx)/n;
  let ss=0;for(const i of idx){const r=Math.log(y[i])-(ic+a*Math.log(basis[i]));ss+=r*r;}
  return {a,n,se:Math.sqrt(ss/(n-2)/Sxx)};
}
const range=(lo,hi)=>{const o=[];for(let i=lo;i<=hi;i++)o.push(i);return o;};
// control bias: every CONTIGUOUS sliding window of width w over the 64-term h
function controlWin(w,basis){
  const v=[];for(let a=0;a+w-1<=63;a++)v.push(fitIdx(H,basis,range(a,a+w-1)).a);
  const m=v.reduce((x,y)=>x+y,0)/v.length;
  const sd=Math.sqrt(v.reduce((x,y)=>x+(y-m)**2,0)/v.length);
  return {k:v.length,m,sd,bias:m-1,min:Math.min(...v),max:Math.max(...v)};
}
const F=(x,d=3)=>x.toFixed(d);

/* --- S1. CUSTODY: reproduce the headline digit for digit -------------- */
console.log('S1. CUSTODY. exponent-control.md sections 1, 5 and S11, reproduced.\n');
console.log('  pilot fits   h[5,37]=1.191  h[5,271]=1.282  G2[5,37]=1.801');
console.log('   ours       ',F(fitIdx(H,P,range(2,11)).a),' ',
  F(fitIdx(H,P,range(2,57)).a),' ',F(fitIdx(G2T,P,range(2,11)).a));
const S11raw=fitIdx(G2T,P,range(2,21)), S11rawT=fitIdx(G2T,TH,range(2,21));
console.log('  S11 raw fit, 22 terms, p in [5,79], n=20:');
console.log('   x-frame     1.777 +- 0.029   ours',F(S11raw.a),'+-',F(S11raw.se));
console.log('   theta-frame 1.647 +- 0.021   ours',F(S11rawT.a),'+-',F(S11rawT.se));
const c20=controlWin(20,P), c20t=controlWin(20,TH);
console.log('  S11 control at matched width 20 (64-term h), true exponent 1:');
console.log('   x-frame     45 windows mean 1.279 sd 0.052   ours',c20.k,'windows mean',
  F(c20.m),'sd',F(c20.sd));
console.log('   theta-frame 45 windows mean 1.218 sd 0.046   ours',c20t.k,'windows mean',
  F(c20t.m),'sd',F(c20t.sd));
console.log('  S11 corrected  x 1.498  theta 1.429   ours',F(S11raw.a-c20.bias),
  ' ',F(S11rawT.a-c20t.bias));
console.log('  S11 bracket [1.39, 1.78]   ours [',F(S11raw.a-c20.bias-2*c20.sd,2),',',F(S11raw.a,2),']');
console.log('  headline quoted as 1.50 +- 0.05 stat: rounds from',F(S11raw.a-c20.bias),
  'with window sd',F(c20.sd));

/* --- S2. THE PROVENANCE SPLIT ----------------------------------------- */
// index i corresponds to prime P[i]; every fit excludes p = 2 and p = 3 (i<2),
// exactly as every fit in exponent-control.js does.
const IDX_CUST = range(2,13);                       // x = 5..43,  14 terms of which 12 fitted
const IDX_ALEK = [14,15];                           // x = 47, 53
const IDX_WANG = range(16,21);                      // x = 59..79
const IDX_ALL  = range(2,21);
const minus=(A,B)=>A.filter(i=>!B.includes(i));
const SETS=[
 ['custody only            (x 5..43)',            IDX_CUST, true],
 ['custody + Alekseyev     (x 5..53)',            IDX_CUST.concat(IDX_ALEK), true],
 ['ALL 22 trusted          (x 5..79)  HEADLINE',  IDX_ALL, true],
 ['drop custody block      (x 47..79)',           IDX_ALEK.concat(IDX_WANG), true],
 ['drop Alekseyev block    (x 5..43,59..79)',     minus(IDX_ALL,IDX_ALEK), false],
 ['drop Wang block         (= custody+Alekseyev)',minus(IDX_ALL,IDX_WANG), true],
 ['drop x=61 only  (G-hat(64)=1080, Wang a(18))', minus(IDX_ALL,[17]), false],
 ['briefing split: drop last 6 (x 5..67)',        range(2,18), true],
];
console.log('\n\nS2. The provenance split, same estimator, same control correction.');
console.log('    corrected = raw - (control mean bias at MATCHED POINT COUNT).');
console.log('    contig = are the fitted points contiguous in p?  the control');
console.log('    windows always are, so a non-contiguous row is an approximation.\n');
console.log('    set                                          n  contig  raw a    se     ctrl bias  sd     CORRECTED  vs headline');
const HEAD=S11raw.a-c20.bias;
const rows=[];
for(const [nm,idx,contig] of SETS){
  const r=fitIdx(G2T,P,idx), c=controlWin(idx.length,P);
  const corr=r.a-c.bias;
  rows.push({nm,n:r.n,corr,raw:r.a});
  console.log('    '+nm.padEnd(45)+String(r.n).padStart(2)+'   '+(contig?'yes':'NO ')+
    '   '+F(r.a)+'  +-'+F(r.se)+'   +'+F(c.bias)+'    '+F(c.sd)+'   '+
    F(corr).padStart(7)+'   '+(corr-HEAD>=0?'+':'')+F(corr-HEAD));
}
console.log('\n    range-matched control instead of width-matched, contiguous sets only:');
console.log('    (the single control window over the SAME index range, which section 1');
console.log('     of exponent-control.md warns is a single draw and not the central)');
for(const [nm,idx,contig] of SETS){
  if(!contig) continue;
  const r=fitIdx(G2T,P,idx), c1=fitIdx(H,P,idx).a-1;
  console.log('    '+nm.padEnd(45)+' raw '+F(r.a)+'  single-window bias +'+F(c1)+
    '  -> '+F(r.a-c1));
}

/* --- S3. LEAVE-ONE-TERM-OUT, the per-term sensitivity ------------------ */
console.log('\n\nS3. Leave-one-term-out over all 20 fitted terms (corrected central).');
console.log('    matched control width 19 throughout.\n');
const c19=controlWin(19,P);
let worst={d:0,x:null}; const looLine=[];
for(const i of IDX_ALL){
  const idx=minus(IDX_ALL,[i]), r=fitIdx(G2T,P,idx), corr=r.a-c19.bias;
  looLine.push(`${P[i]}:${F(corr,3)}`);
  if(Math.abs(corr-HEAD)>Math.abs(worst.d)){worst={d:corr-HEAD,x:P[i]};}
}
console.log('    '+looLine.join('  '));
console.log('    control bias at width 19: +'+F(c19.bias)+'  sd '+F(c19.sd));
console.log('    largest single-term move from the headline '+F(HEAD)+': '+
  (worst.d>=0?'+':'')+F(worst.d)+' at x = '+worst.x);
const i61=IDX_ALL.indexOf(17);
const r61=fitIdx(G2T,P,minus(IDX_ALL,[17]));
console.log('    G-hat(64) = G2(61#) = '+G2T[17]+' dropped alone: corrected '+
  F(r61.a-c19.bias)+', move '+((r61.a-c19.bias-HEAD)>=0?'+':'')+F(r61.a-c19.bias-HEAD));

/* --- S4. THETA FRAME, the same split ---------------------------------- */
console.log('\n\nS4. The same split in the theta frame (NOT comparable to the');
console.log('    x-frame threshold 2; exponent-control.md section 6 forbids that).\n');
console.log('    set                                          n   raw a    ctrl bias  CORRECTED');
for(const [nm,idx] of SETS){
  const r=fitIdx(G2T,TH,idx), c=controlWin(idx.length,TH);
  console.log('    '+nm.padEnd(45)+String(r.n).padStart(2)+'   '+F(r.a)+'   +'+
    F(c.bias)+'     '+F(r.a-c.bias).padStart(7));
}

/* --- S5. WHAT THE RANGE ALONE DOES, on the control -------------------- */
console.log('\n\nS5. The confound, priced on the control: the same index sets run on h,');
console.log('    whose true exponent is 1.  A spread here is RANGE, not provenance.\n');
console.log('    set                                          n   h raw a   h corrected (should be ~1)');
for(const [nm,idx] of SETS){
  const r=fitIdx(H,P,idx), c=controlWin(idx.length,P);
  console.log('    '+nm.padEnd(45)+String(r.n).padStart(2)+'   '+F(r.a)+'     '+
    F(r.a-c.bias).padStart(7));
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-g2-provenance-0829.js
//   invocation:  node research/measure-g2-provenance-0829.js
//   code-sha256: f35264685b6c16df0f09752296bd752bb300a46557b362123ec09d6b8dc57db7
//   out-sha256:  29af4ad91b1a61ef8950a14e6fb327fc18842913d63cf0faa50c5697fc7c83eb
//   body-lines:  76
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
// S1. CUSTODY. exponent-control.md sections 1, 5 and S11, reproduced.
//
//   pilot fits   h[5,37]=1.191  h[5,271]=1.282  G2[5,37]=1.801
//    ours        1.191   1.282   1.801
//   S11 raw fit, 22 terms, p in [5,79], n=20:
//    x-frame     1.777 +- 0.029   ours 1.777 +- 0.029
//    theta-frame 1.647 +- 0.021   ours 1.647 +- 0.021
//   S11 control at matched width 20 (64-term h), true exponent 1:
//    x-frame     45 windows mean 1.279 sd 0.052   ours 45 windows mean 1.279 sd 0.052
//    theta-frame 45 windows mean 1.218 sd 0.046   ours 45 windows mean 1.218 sd 0.046
//   S11 corrected  x 1.498  theta 1.429   ours 1.498   1.429
//   S11 bracket [1.39, 1.78]   ours [ 1.39 , 1.78 ]
//   headline quoted as 1.50 +- 0.05 stat: rounds from 1.498 with window sd 0.052
//
//
// S2. The provenance split, same estimator, same control correction.
//     corrected = raw - (control mean bias at MATCHED POINT COUNT).
//     contig = are the fitted points contiguous in p?  the control
//     windows always are, so a non-contiguous row is an approximation.
//
//     set                                          n  contig  raw a    se     ctrl bias  sd     CORRECTED  vs headline
//     custody only            (x 5..43)            12   yes   1.801  +-0.056   +0.268    0.081     1.533   +0.035
//     custody + Alekseyev     (x 5..53)            14   yes   1.798  +-0.045   +0.273    0.076     1.525   +0.027
//     ALL 22 trusted          (x 5..79)  HEADLINE  20   yes   1.777  +-0.029   +0.279    0.052     1.498   +0.000
//     drop custody block      (x 47..79)            8   yes   1.725  +-0.067   +0.260    0.130     1.465   -0.033
//     drop Alekseyev block    (x 5..43,59..79)     18   NO    1.775  +-0.031   +0.278    0.058     1.498   -0.000
//     drop Wang block         (= custody+Alekseyev)14   yes   1.798  +-0.045   +0.273    0.076     1.525   +0.027
//     drop x=61 only  (G-hat(64)=1080, Wang a(18)) 19   NO    1.778  +-0.030   +0.278    0.055     1.500   +0.002
//     briefing split: drop last 6 (x 5..67)        17   yes   1.781  +-0.035   +0.278    0.062     1.503   +0.006
//
//     range-matched control instead of width-matched, contiguous sets only:
//     (the single control window over the SAME index range, which section 1
//      of exponent-control.md warns is a single draw and not the central)
//     custody only            (x 5..43)             raw 1.801  single-window bias +0.200  -> 1.601
//     custody + Alekseyev     (x 5..53)             raw 1.798  single-window bias +0.209  -> 1.589
//     ALL 22 trusted          (x 5..79)  HEADLINE   raw 1.777  single-window bias +0.245  -> 1.532
//     drop custody block      (x 47..79)            raw 1.725  single-window bias +0.493  -> 1.232
//     drop Wang block         (= custody+Alekseyev) raw 1.798  single-window bias +0.209  -> 1.589
//     briefing split: drop last 6 (x 5..67)         raw 1.781  single-window bias +0.215  -> 1.566
//
//
// S3. Leave-one-term-out over all 20 fitted terms (corrected central).
//     matched control width 19 throughout.
//
//     5:1.484  7:1.536  11:1.478  13:1.494  17:1.496  19:1.502  23:1.500  29:1.498  31:1.499  37:1.496  41:1.499  43:1.498  47:1.498  53:1.498  59:1.503  61:1.500  67:1.500  71:1.501  73:1.498  79:1.500
//     control bias at width 19: +0.278  sd 0.055
//     largest single-term move from the headline 1.498: +0.038 at x = 7
//     G-hat(64) = G2(61#) = 1080 dropped alone: corrected 1.500, move +0.002
//
//
// S4. The same split in the theta frame (NOT comparable to the
//     x-frame threshold 2; exponent-control.md section 6 forbids that).
//
//     set                                          n   raw a    ctrl bias  CORRECTED
//     custody only            (x 5..43)            12   1.666   +0.210       1.457
//     custody + Alekseyev     (x 5..53)            14   1.661   +0.212       1.450
//     ALL 22 trusted          (x 5..79)  HEADLINE  20   1.647   +0.218       1.429
//     drop custody block      (x 47..79)            8   1.596   +0.206       1.390
//     drop Alekseyev block    (x 5..43,59..79)     18   1.646   +0.217       1.430
//     drop Wang block         (= custody+Alekseyev)14   1.661   +0.212       1.450
//     drop x=61 only  (G-hat(64)=1080, Wang a(18)) 19   1.648   +0.217       1.431
//     briefing split: drop last 6 (x 5..67)        17   1.655   +0.215       1.439
//
//
// S5. The confound, priced on the control: the same index sets run on h,
//     whose true exponent is 1.  A spread here is RANGE, not provenance.
//
//     set                                          n   h raw a   h corrected (should be ~1)
//     custody only            (x 5..43)            12   1.200       0.932
//     custody + Alekseyev     (x 5..53)            14   1.209       0.936
//     ALL 22 trusted          (x 5..79)  HEADLINE  20   1.245       0.965
//     drop custody block      (x 47..79)            8   1.493       1.233
//     drop Alekseyev block    (x 5..43,59..79)     18   1.246       0.969
//     drop Wang block         (= custody+Alekseyev)14   1.209       0.936
//     drop x=61 only  (G-hat(64)=1080, Wang a(18)) 19   1.246       0.967
//     briefing split: drop last 6 (x 5..67)        17   1.215       0.938
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
// ============================================================================
//
// 1. VERIFIED. Custody holds on every figure exponent-control.md section 5 and
//    its S11 quote. The three pilot fits reproduce as 1.191, 1.282, 1.801; the
//    22-term raw fit as 1.777 +- 0.029 in x and 1.647 +- 0.021 in theta; the
//    matched-width control as 45 windows, mean 1.279 sd 0.052 in x and mean
//    1.218 sd 0.046 in theta; the corrected readings as 1.498 and 1.429; the
//    practical bracket as [1.39, 1.78]. The headline 1.50 is the rounding of
//    1.498 and the +- 0.05 is the rounding of the window sd 0.052.
//
// 2. MEASURED. The custody-only refit, on the twelve fitted terms this
//    repository enumerated itself, gives corrected 1.533 against the 22-term
//    headline 1.498, a move of +0.035. Custody plus Alekseyev gives 1.525,
//    +0.027. Both sit far inside the control's own bias of +0.279 at these
//    widths.
//
// 3. MEASURED, and this is the answer to the provenance question. No
//    leave-one-block-out variant moves the corrected central by more than
//    0.035. Dropping the Wang block gives +0.027, dropping the Alekseyev block
//    gives -0.000, and dropping the whole custody block and fitting only the
//    eight external terms gives -0.033. The headline does not depend on the
//    terms this repository has never reproduced, at the resolution this
//    estimator has.
//
// 4. MEASURED. G-hat(64) = G2(61#) = 1080, which rests on Wang's a(18) alone
//    and which carries item D's eventual-form trap window, moves the corrected
//    central by +0.002 when dropped alone. Over all twenty leave-one-term-out
//    fits the largest move is +0.038, and it is at x = 7, the bottom of the
//    ladder, not the top.
//
// 5. CAVEAT, and it limits every line above. The same eight index sets run on
//    the one-class control, whose true exponent is 1, return corrected values
//    from 0.932 to 1.233. The G2 rows return 1.465 to 1.533. The estimator's
//    own sensitivity to WHICH RANGE it is given is therefore larger than the
//    whole provenance effect measured here, so the honest statement is that no
//    provenance effect is visible above that floor, not that none exists.
//    Provenance block and fitted range are confounded on twenty points and
//    cannot be separated here.
//
// 6. MEASURED, and it is a convention cost rather than a finding. Correcting
//    with the single control window over the same index range instead of the
//    matched-width distribution mean gives 1.601 custody-only, 1.532 for the
//    headline set and 1.232 for the eight external terms. Section 1 of
//    exponent-control.md already rules that a single window is a draw from a
//    distribution and the distribution mean is the central, so the
//    width-matched column is the one quoted; the range-matched column is
//    printed to show the choice matters: at n = 8 it reads 1.232 where the
//    width-matched column reads 1.465.
//
// 7. DEFECT, small here. Two of the eight rows fit index sets that are not
//    contiguous in p while every control window is, so those two corrections
//    are matched on point count only. Both such rows land within 0.002 of the
//    headline, so nothing in readings 3 and 4 turns on the approximation.
//
// 8. Nothing here touches the exponent band. Every corrected reading in the
//    table, on every provenance block, runs from 1.465 to 1.533, inside the
//    practical bracket 1.3 to 1.8 that exponent-control.md section 5 already
//    carries, and the proven gap of G2-STATE section 3a is unchanged.
// ============================================================================
