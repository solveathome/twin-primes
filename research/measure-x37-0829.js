'use strict';
// ============================================================================
// MEASURE-X37 — does anything WITHOUT G2(37#) in it flag x = 37?
//
// QUESTION (object-g2-read-0829.md section 8 Q4, label (i))
// G2-STATE.md section 2 records that three instruments single out x = 37:
// G2/h spikes to 8.00, c2' = 0.5939 sits at the top of its range, and
// h2/G2 = 1.341 is the low outlier against [1.63, 1.81] at x = 47..73.  All
// three are ratios carrying G2(37#) = 528, so ONE high draw of G2 at 37
// produces all three signs at once.  This script computes the instruments that
// do NOT contain G2(37#) and asks whether any of them also reads high at 37.
//
// HONEST DOUBT, recorded before the numbers
//  (a) n is tiny.  The one-class column reaches 64 terms but the two-class
//      columns reach 21 (h2) and 22 (G2).  A z of 2 on 20 points is one point
//      in twenty and is what an unstructured ladder produces routinely.
//  (b) There is no multiple-comparison correction applied below.  Nine
//      instruments are read; the family-wise threshold for |z| = 2 at nine
//      independent reads is about p = 0.4, which is why the pre-registered
//      falsifier is a threshold and not a p-value.
//  (c) c2' is known to DRIFT with x (Q-c2prime-drift, PARTIAL): the x >= 41
//      terms run [0.4842, 0.5337] above the custody band [0.4463, 0.5004].  A
//      blind forecast from trailing terms therefore under-predicts by
//      construction, so the same rolling forecast is run at EVERY level as its
//      own control rather than at 37 alone.
//  (d) The fold-L instruments at fold 37 are NOT recomputed here.  Q-frontier37
//      is ANSWERED and is cited.
//
// STANDARDISATION.  For each instrument the log-linear trend in ln x is fitted
// over all available levels EXCLUDING x = 37, and z = (residual at 37) / (rms
// residual of that leave-37-out fit).  Fitting without the point under test is
// what stops a single outlier from inflating its own denominator.
//
// DATA.  H = A048670 (one class), H2 = A288815 (free two classes, 21 terms),
// G2T = A144311 + 1 (22 trusted terms).  Census normalisers are exact:
// m1 = x#/phi(x#), lnD1 = sum ln(p-1); m2 = x#/prod(q-2), lnD2 = sum ln(q-2).
//
// Runs in about a second.
// ============================================================================

const H = [2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,190,
  200,216,234,258,264,282,300,312,330,354,378,388,414,432,450,476,492,510,538,
  550,574,600,616,642,660,686,718,742,762,798,810,834,858,876,908,926,954,
  978,1002,1030,1058,1098,1110];
const H2 = [2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,
  1902,2190,2460,2622];
const G2T = [2,6,12,30,42,66,108,150,204,258,348,528,546,618,708,870,966,1080,
  1284,1398,1530,1710];

function sievePrimes(n){const s=new Uint8Array(n+1),o=[];
  for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const P = sievePrimes(2000).slice(0,64);
const M1=[],M2=[],LD1=[],LD2=[],TH=[];
{let a=1,b=1,d1=0,d2=0,t=0;
 for(let i=0;i<64;i++){const p=P[i];
  a*=p/(p-1); d1+=Math.log(p-1); t+=Math.log(p);
  if(p>2){b*=p/(p-2); d2+=Math.log(p-2);}
  M1.push(a);M2.push(2*b);LD1.push(d1);LD2.push(d2);TH.push(t);}}
const I37 = P.indexOf(37);
const F=(x,d=4)=>x.toFixed(d);

// custody guard against a144311-full-ladder.js's own printed row for x = 37
{
  const c2p = G2T[I37]/(M2[I37]*LD2[I37]);
  if(Math.abs(c2p-0.5939)>5e-4) throw new Error('c2prime(37) does not reproduce 0.5939, got '+c2p);
  if(Math.abs(M2[I37]-34.05)>0.01||Math.abs(LD2[I37]-26.107)>0.01)
    throw new Error('m or lnD at x=37 does not reproduce the a144311 ladder row');
}

/* --- the leave-37-out standardiser ----------------------------------- */
// y[] indexed like P, defined on indices [lo,hi]; instrument read in logs.
function zAt(y,lo,hi,iTest,logY){
  const idx=[];for(let i=lo;i<=hi;i++) if(i!==iTest && y[i]!==null && isFinite(y[i])) idx.push(i);
  const T=v=>logY?Math.log(v):v;
  let n=0,sx=0,sy=0,sxx=0,sxy=0;
  for(const i of idx){const X=Math.log(P[i]),Y=T(y[i]);n++;sx+=X;sy+=Y;sxx+=X*X;sxy+=X*Y;}
  const Sxx=sxx-sx*sx/n,a=(sxy-sx*sy/n)/Sxx,ic=(sy-a*sx)/n;
  let ss=0;for(const i of idx){const r=T(y[i])-(ic+a*Math.log(P[i]));ss+=r*r;}
  const rms=Math.sqrt(ss/(n-2));
  const res=T(y[iTest])-(ic+a*Math.log(P[iTest]));
  return {n,slope:a,rms,res,z:res/rms};
}

/* --- S1. THE THREE INSTRUMENTS THAT DO CONTAIN G2(37#) --------------- */
console.log('S1. The three instruments G2-STATE section 2 already names.');
console.log('    Every one of them is a ratio carrying G2(37#) = 528.\n');
const G2H = P.map((_,i)=> i<22 ? G2T[i]/H[i] : null);
const C2P = P.map((_,i)=> i<22 ? G2T[i]/(M2[i]*LD2[i]) : null);
const H2G = P.map((_,i)=> i<21 ? H2[i]/G2T[i] : null);
console.log('    instrument              value at 37   leave-37-out fit n   rms     z');
const show=(nm,y,lo,hi,logY)=>{const r=zAt(y,lo,hi,I37,logY);
  console.log('    '+nm.padEnd(24)+F(y[I37]).padStart(9)+'      '+String(r.n).padStart(2)+
    '        '+F(r.rms).padStart(7)+'  '+(r.z>=0?'+':'')+F(r.z,2));return r;};
show('G2/h        (carries G2)',G2H,2,21,true);
show("c2'         (carries G2)",C2P,4,21,true);
show('h2/G2       (carries G2)',H2G,2,20,true);

/* --- S2. THE INSTRUMENTS FREE OF G2(37#) ----------------------------- */
console.log('\n\nS2. Instruments with no G2(37#) anywhere in them.\n');
const HH   = P.map((_,i)=>H[i]);
const HH2  = P.map((_,i)=> i<21 ? H2[i] : null);
const C1   = P.map((_,i)=> H[i]/(M1[i]*LD1[i]));
const C2   = P.map((_,i)=> i<21 ? H2[i]/(M2[i]*LD2[i]) : null);
const H2H  = P.map((_,i)=> i<21 ? H2[i]/H[i] : null);
console.log('    instrument                      value at 37   n   rms      z');
const rows=[
 ['h(37#) itself, x in [5,79]',HH,2,21,true],
 ['h(37#) itself, x in [5,311]',HH,2,63,true],
 ['h2(37#) itself, x in [5,73]',HH2,2,20,true],
 ['c1 = h/(m1 lnD1), x in [11,79]',C1,4,21,true],
 ['c1 = h/(m1 lnD1), x in [11,311]',C1,4,63,true],
 ['c2 = h2/(m2 lnD2), x in [11,73]',C2,4,20,true],
 ['h2/h, x in [5,73]',H2H,2,20,true],
];
let worst=0,worstNm='';
for(const [nm,y,lo,hi,lg] of rows){
  const r=zAt(y,lo,hi,I37,lg);
  console.log('    '+nm.padEnd(32)+F(y[I37]).padStart(9)+'    '+String(r.n).padStart(2)+
    '  '+F(r.rms).padStart(7)+'  '+(r.z>=0?'+':'')+F(r.z,2));
  if(Math.abs(r.z)>Math.abs(worst)){worst=r.z;worstNm=nm;}
}
console.log('\n    largest |z| among the G2-free instruments: '+(worst>=0?'+':'')+F(worst,2)+
  '  ('+worstNm.trim()+')');

/* --- S3. LOCAL STEP EXPONENTS, which use only neighbours -------------- */
console.log('\n\nS3. Local step exponents ln(y(p)/y(p_prev))/ln(p/p_prev).');
console.log('    A high draw at 37 shows as a high step INTO 37 and a low one out.\n');
const step=(y,i)=>Math.log(y[i]/y[i-1])/Math.log(P[i]/P[i-1]);
const cols=[['h',HH,2,21],['h2',HH2,2,20],['G2 (carries G2(37#))',G2T,2,21]];
for(const [nm,y,lo,hi] of cols){
  const v=[];for(let i=lo;i<=hi;i++) v.push({x:P[i],s:step(y,i)});
  const others=v.filter(o=>o.x!==37).map(o=>o.s);
  const m=others.reduce((a,b)=>a+b,0)/others.length;
  const sd=Math.sqrt(others.reduce((a,b)=>a+(b-m)**2,0)/(others.length-1));
  const at37=v.find(o=>o.x===37).s, at41=v.find(o=>o.x===41);
  console.log('    '+nm.padEnd(22)+' step 31->37 = '+F(at37,3)+
    '   others mean '+F(m,3)+' sd '+F(sd,3)+'   z = '+(at37-m>=0?'+':'')+F((at37-m)/sd,2)+
    (at41?'   step 37->41 = '+F(at41.s,3)+'  z = '+((at41.s-m)>=0?'+':'')+F((at41.s-m)/sd,2):''));
}

/* --- S4. THE BLIND POISSON FORECAST, run at every level as its own control */
console.log('\n\nS4. The extreme-value window of maxgap-law.md section 4, run BLIND:');
console.log('    forecast y(x) = cbar * m * lnD with cbar and its [min,max] taken');
console.log('    from the SEVEN trailing levels below x only.  That is the machinery');
console.log('    G2-STATE section 9 item 6 used at x = 41 (band 476 to 633, central 513),');
console.log('    reproduced below as custody, then run at every level of each ladder.\n');
function forecast(y,mm,ld,i,k){
  const c=[];for(let j=i-k;j<i;j++) c.push(y[j]/(mm[j]*ld[j]));
  const mean=c.reduce((a,b)=>a+b,0)/c.length;
  const sd=Math.sqrt(c.reduce((a,b)=>a+(b-mean)**2,0)/(c.length-1));
  const S=mm[i]*ld[i];
  return {lo:Math.min(...c)*S,hi:Math.max(...c)*S,cen:mean*S,
          act:y[i],inside:y[i]>=Math.min(...c)*S&&y[i]<=Math.max(...c)*S,
          z:(y[i]/S-mean)/sd};
}
{
  // custody: the x = 41 band on the eight-term c2' set x = 11..37
  const c=[];for(let j=4;j<=11;j++) c.push(G2T[j]/(M2[j]*LD2[j]));
  const S=M2[12]*LD2[12];
  console.log('    custody, x = 41 from the eight terms x = 11..37:');
  console.log('      band ['+Math.round(Math.min(...c)*S)+', '+Math.round(Math.max(...c)*S)+
    ']  central '+Math.round(c.reduce((a,b)=>a+b,0)/c.length*S)+
    '   (G2-STATE section 9 item 6: 476 to 633, central 513)   actual '+G2T[12]);
}
console.log('\n    rolling blind forecast, seven trailing levels, k = 7:');
console.log('    object  x    actual   band lo   band hi   central   inside?   z');
const objs=[['G2 ',G2T,M2,LD2,11,21],['h2 ',H2,M2,LD2,11,20],['h  ',H,M1,LD1,11,21]];
for(const [nm,y,mm,ld,lo,hi] of objs){
  const zs=[];
  for(let i=lo;i<=hi;i++){
    const f=forecast(y,mm,ld,i,7);
    zs.push({x:P[i],z:f.z,inside:f.inside});
    console.log('    '+nm+'  '+String(P[i]).padStart(2)+'  '+String(f.act).padStart(7)+
      '  '+String(Math.round(f.lo)).padStart(8)+'  '+String(Math.round(f.hi)).padStart(8)+
      '  '+String(Math.round(f.cen)).padStart(8)+'   '+(f.inside?'yes ':'NO  ')+
      '   '+(f.z>=0?'+':'')+F(f.z,2));
  }
  const out=zs.filter(o=>!o.inside).map(o=>o.x);
  const rank=zs.slice().sort((a,b)=>Math.abs(b.z)-Math.abs(a.z));
  console.log('    '+nm+' outside its own band at x = ['+out.join(', ')+
    ']   largest |z| at x = '+rank[0].x+' ('+(rank[0].z>=0?'+':'')+F(rank[0].z,2)+
    ')'+(P[lo]<=37?'   x=37 rank '+(rank.findIndex(o=>o.x===37)+1)+' of '+rank.length:'')+'\n');
}

/* --- S5. WHAT IS CITED, NOT RE-RUN ----------------------------------- */
console.log('S5. Cited, not re-run (Q-frontier37, ANSWERED,');
console.log('    research/history/staging/frontier37.md sections 2 and 4):');
console.log('      true L at fold 37 = 4, forced ceiling 6, forced/req 1.89 against the');
console.log('      census mean 1.47 over its eight cells, trueL/req 1.26.');
console.log('      transport ratio max N_new/RHS by fold:');
console.log('        11: 1.0000  13: 1.0000  17: 0.8881  19: 0.8975  23: 0.9180');
console.log('        29: 0.9324  31: 0.9348  37: 0.9477');
console.log('      Fold 37 sits at the top of a monotone rise from fold 17, +0.0119 per');
console.log('      step, and is not a departure from that trend.  No spike at 37.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-x37-0829.js
//   invocation:  node research/measure-x37-0829.js
//   code-sha256: b7d8352cf7d964df32ce6b3bbfa6c45d27fdbc891d870df4754761598000ce2b
//   out-sha256:  5c1fd5d0cb55d88a07eca71ef78679f207b30ca543c382e9a8390bdec51b3c50
//   body-lines:  89
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
// S1. The three instruments G2-STATE section 2 already names.
//     Every one of them is a ratio carrying G2(37#) = 528.
//
//     instrument              value at 37   leave-37-out fit n   rms     z
//     G2/h        (carries G2)   8.0000      19         0.0846  +3.01
//     c2'         (carries G2)   0.5939      17         0.0412  +4.57
//     h2/G2       (carries G2)   1.3409      18         0.1457  -1.65
//
//
// S2. Instruments with no G2(37#) anywhere in them.
//
//     instrument                      value at 37   n   rms      z
//     h(37#) itself, x in [5,79]        66.0000    19   0.0839  -1.08
//     h(37#) itself, x in [5,311]       66.0000    61   0.0520  -2.20
//     h2(37#) itself, x in [5,73]      708.0000    18   0.1220  -0.63
//     c1 = h/(m1 lnD1), x in [11,79]     0.3540    17   0.0689  -0.82
//     c1 = h/(m1 lnD1), x in [11,311]    0.3540    59   0.0557  -1.35
//     c2 = h2/(m2 lnD2), x in [11,73]    0.7964    16   0.0711  -0.98
//     h2/h, x in [5,73]                 10.7273    18   0.1103  +0.07
//
//     largest |z| among the G2-free instruments: -2.20  (h(37#) itself, x in [5,311])
//
//
// S3. Local step exponents ln(y(p)/y(p_prev))/ln(p/p_prev).
//     A high draw at 37 shows as a high step INTO 37 and a low one out.
//
//     h                      step 31->37 = 0.730   others mean 1.718 sd 1.163   z = -0.85   step 37->41 = 1.115  z = -0.52
//     h2                     step 31->37 = 1.225   others mean 2.236 sd 1.123   z = -0.90   step 37->41 = 2.272  z = +0.03
//     G2 (carries G2(37#))   step 31->37 = 2.356   others mean 1.994 sd 1.049   z = +0.35   step 37->41 = 0.327  z = -1.59
//
//
// S4. The extreme-value window of maxgap-law.md section 4, run BLIND:
//     forecast y(x) = cbar * m * lnD with cbar and its [min,max] taken
//     from the SEVEN trailing levels below x only.  That is the machinery
//     G2-STATE section 9 item 6 used at x = 41 (band 476 to 633, central 513),
//     reproduced below as custody, then run at every level of each ladder.
//
//     custody, x = 41 from the eight terms x = 11..37:
//       band [476, 633]  central 513   (G2-STATE section 9 item 6: 476 to 633, central 513)   actual 546
//
//     rolling blind forecast, seven trailing levels, k = 7:
//     object  x    actual   band lo   band hi   central   inside?   z
//     G2   37      528       397       445       414   NO     +6.58
//     G2   41      546       476       633       510   yes    +0.65
//     G2   43      618       561       747       613   yes    +0.07
//     G2   47      708       653       868       718   yes    -0.13
//     G2   53      870       750       998       832   yes    +0.47
//     G2   59      966       852      1134       962   yes    +0.05
//     G2   61     1080      1031      1278      1102   yes    -0.26
//     G2   67     1284      1165      1429      1240   yes    +0.50
//     G2   71     1398      1293      1426      1354   yes    +1.00
//     G2   73     1530      1428      1574      1499   yes    +0.59
//     G2   79     1710      1568      1728      1659   yes    +0.97
//     G2  outside its own band at x = [37]   largest |z| at x = 37 (+6.58)   x=37 rank 1 of 11
//
//     h2   37      708       692       903       738   yes    -0.39
//     h2   41      894       830      1082       886   yes    +0.09
//     h2   43     1044       979      1055      1013   yes    +0.95
//     h2   47     1284      1138      1227      1177   NO     +2.96
//     h2   53     1422      1308      1475      1375   yes    +0.81
//     h2   59     1656      1486      1677      1569   yes    +1.24
//     h2   61     1902      1689      1890      1796   NO     +1.43
//     h2   67     2190      1916      2126      2042   NO     +2.01
//     h2   71     2460      2218      2432      2311   NO     +1.97
//     h2   73     2622      2449      2716      2586   yes    +0.38
//     h2  outside its own band at x = [47, 61, 67, 71]   largest |z| at x = 47 (+2.96)   x=37 rank 8 of 10
//
//     h    37       66        65        91        76   yes    -1.07
//     h    41       74        76       106        85   NO     -1.07
//     h    43       90        85       102        92   yes    -0.35
//     h    47      100        96       114       103   yes    -0.45
//     h    53      106       108       119       113   NO     -1.96
//     h    59      118       118       129       124   NO     -1.51
//     h    61      132       130       143       136   yes    -0.83
//     h    67      152       143       155       148   yes    +0.91
//     h    71      174       156       169       162   NO     +2.40
//     h    73      190       170       189       178   NO     +1.64
//     h    79      200       184       206       193   yes    +0.71
//     h   outside its own band at x = [41, 53, 59, 71, 73]   largest |z| at x = 71 (+2.40)   x=37 rank 6 of 11
//
// S5. Cited, not re-run (Q-frontier37, ANSWERED,
//     research/history/staging/frontier37.md sections 2 and 4):
//       true L at fold 37 = 4, forced ceiling 6, forced/req 1.89 against the
//       census mean 1.47 over its eight cells, trueL/req 1.26.
//       transport ratio max N_new/RHS by fold:
//         11: 1.0000  13: 1.0000  17: 0.8881  19: 0.8975  23: 0.9180
//         29: 0.9324  31: 0.9348  37: 0.9477
//       Fold 37 sits at the top of a monotone rise from fold 17, +0.0119 per
//       step, and is not a departure from that trend.  No spike at 37.
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
// ============================================================================
//
// 1. MEASURED. The three instruments G2-STATE section 2 names read, against
//    leave-37-out log-linear fits, z = +3.01 (G2/h), +4.57 (c2') and -1.65
//    (h2/G2). All three carry G2(37#) = 528, so they are three views of at
//    most two facts.
//
// 2. MEASURED, and it is the pre-registered answer. Of the seven instruments
//    with no G2(37#) in them, the largest |z| is -2.20, and it is h(37#) = 66
//    reading LOW against the 61-term one-class ladder. Against the
//    range-matched ladder x in [5,79] the same reading is -1.08, so the 2.20
//    depends on which comparison range is chosen and is not stable. Nothing
//    G2-free reads high at 37: h2 -0.63, c1 -0.82 and -1.35, c2 -0.98, h2/h
//    +0.07. Nine instruments were read with no multiple-comparison correction.
//
// 3. MEASURED, and it changes how G2/h = 8.00 should be read. The spike is a
//    ratio with a low denominator as well as a high numerator: c2', which is
//    G2 against its own census normaliser, reads +4.57, and h against its own
//    normaliser reads -0.82 to -1.35. Calling 37 a G2-side anomaly on the
//    strength of G2/h alone overstates what the column shows.
//
// 4. MEASURED. At the neighbour scale nothing is discontinuous at 37. The step
//    exponents into 37 are 0.730 for h (z -0.85), 1.225 for h2 (z -0.90) and
//    2.356 for G2 (z +0.35), against ladder means of 1.718, 2.236 and 1.994.
//    This reproduces exponent-control.md section 7 item 2: 37 is an outlier in
//    the c2' column, not in the local exponent.
//
// 5. VERIFIED, custody on the Poisson machinery. The eight-term c2' set
//    x = 11..37 forecasts x = 41 at band [476, 633], central 513, which is
//    G2-STATE section 9 item 6's published band digit for digit, and the
//    actual 546 is inside it.
//
// 6. MEASURED, and it FALSIFIES the pre-registered prediction that the blind
//    window brackets 528. Run from the seven trailing levels only, the forecast
//    for G2(37#) is [397, 445] with central 414 against an actual 528, z =
//    +6.58. x = 37 is the only level of the 22-term G2 ladder outside its own
//    band and ranks 1 of 11 by |z|.
//
// 7. CONTROL on reading 6, and it is what stops that z being read as a
//    structural claim. The identical rolling forecast breaks its band at four
//    of ten levels on h2 and five of eleven on h, so the band is not
//    calibrated. What the controls do NOT produce is a residual anywhere near
//    +6.58: their largest are +2.96 (h2 at x = 47) and +2.40 (h at x = 71).
//    Two further effects push the same way and are not priced: c2' drifts
//    upward, visible in the post-37 G2 rows centring above zero (+0.65, +0.07,
//    -0.13, +0.47, +0.05, -0.26, +0.50, +1.00, +0.59, +0.97), and the trailing
//    windows for x = 41 through 61 contain 37 itself and are inflated by it.
//
// 8. The instrument in reading 6 is NOT independent of those in reading 1. Its
//    residual is G2(37#) measured against a census-normalised prediction, which
//    is the c2' spike with a sharper denominator, not a second witness.
//
// 9. CITED, not re-run (Q-frontier37, ANSWERED). Fold 37's transport ratio
//    0.9477 sits at the top of a monotone rise from 0.8881 at fold 17, about
//    +0.0119 per step, and is not a departure from that trend; true L at fold
//    37 is 4 with forced/req 1.89 against the census mean 1.47 over its eight
//    cells. No fold-L instrument flags 37.
//
// 10. VERDICT on the coincidence. MEASURED: one high draw of G2 at 37, seen
//     three ways, with a low h(37#) sharpening one of the three views. No
//     instrument free of G2(37#) flags 37 in the high direction, and the one
//     G2-free reading past |z| = 2 is negative and range-dependent. The
//     coincidence is a draw, not an arithmetic irregularity, at this
//     resolution; nothing here explains why the draw is as large as +6.58
//     against the extreme-value law, and that stays open.
// ============================================================================
