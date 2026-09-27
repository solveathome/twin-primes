// h2-length-needed.js
//
// How long does a two-class ladder have to be before its growth exponent is
// readable to the precision that matters (1.5 versus 2)?
//
// We cannot answer that on h2, whose exponent is unknown.  We answer it on the
// one-class control A048670, where the answer is known to be 1 + o(1), by
// asking two questions of nested prefixes:
//
//   (a) STATISTICAL.  How fast does the sliding-window sd of the exponent
//       estimate shrink with window width?
//   (b) SYSTEMATIC.   At what prefix length does model selection start to
//       prefer the family that actually contains the truth (c*p*log^a p) over
//       the pure power law (c*p^a)?
//
// Data: A048670 (58 terms) and A288815 (21 terms), the same arrays
// research/exponent-control.js and research/maxgap-law.js carry.
//
// *** CORRECTION 2026-08-17. The H array below was NOT the array the header
// claimed it was. Its last SEVEN terms, n = 52..58, read 820, 838, 870, 884,
// 906, 924, 940 where A048670 has 810, 834, 858, 876, 908, 926, 954. Terms
// 1..51 were correct. Checked against oeis.org/A048670's DATA line, and against
// research/exponent-control.js line 46, research/maxgap-law.js line 63 and
// research/audit-numbers.js line 543, all three of which already held the right
// values; this file was the only copy out of step. Sections (a), (b) and (d)
// all read the tail, so their numbers move; the changes are recorded in the
// OUTPUT block at the foot of this file. ***

'use strict';

const H = [2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,190,
  200,216,234,258,264,282,300,312,330,354,378,388,414,432,450,476,492,510,538,
  550,574,600,616,642,660,686,718,742,762,798,810,834,858,876,908,926,954];
const H2=[2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,
  1902,2190,2460,2622];

function sieve(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const P = sieve(3000);

// ordinary least squares of y on x
function ols(x,y){
  const n=x.length; let sx=0,sy=0;
  for(let i=0;i<n;i++){sx+=x[i];sy+=y[i];}
  const mx=sx/n,my=sy/n; let sxy=0,sxx=0;
  for(let i=0;i<n;i++){sxy+=(x[i]-mx)*(y[i]-my);sxx+=(x[i]-mx)**2;}
  const a=sxy/sxx,b=my-a*mx;
  let rss=0; for(let i=0;i<n;i++){const r=y[i]-(a*x[i]+b); rss+=r*r;}
  const se=Math.sqrt(rss/(n-2)/sxx);
  return {a,b,rss,se,n};
}
const aic=(rss,n,k)=>n*Math.log(rss/n)+2*(k+1);

// h(p_n#) is H[n-1], attained at prime p_n.  Drop n=1,2 (p = 2, 3) as
// exponent-control.js does: the fits run over p in [5, 271].
function frame(vals, lo, hi){
  const x=[],y=[],p=[];
  for(let i=2;i<vals.length;i++){
    const pn=P[i];
    if(pn<lo||pn>hi) continue;
    p.push(pn); x.push(Math.log(pn)); y.push(Math.log(vals[i]));
  }
  return {p,x,y};
}

console.log('=== (a) statistical precision: sliding windows on the control, true exponent 1 ===');
console.log('width  windows   mean      sd        median-se   sd*width');
for(const w of [8,10,12,15,19,21,25,30,40]){
  const F=frame(H,5,271);
  if(w>F.p.length) continue;
  const as=[],ses=[];
  for(let s=0;s+w<=F.p.length;s++){
    const r=ols(F.x.slice(s,s+w),F.y.slice(s,s+w));
    as.push(r.a); ses.push(r.se);
  }
  const m=as.reduce((a,b)=>a+b,0)/as.length;
  const sd=Math.sqrt(as.reduce((a,b)=>a+(b-m)**2,0)/as.length);
  ses.sort((a,b)=>a-b);
  console.log(`${String(w).padEnd(6)} ${String(as.length).padEnd(9)} ${m.toFixed(4)}    ${sd.toFixed(4)}    ${ses[ses.length>>1].toFixed(4)}      ${(sd*w).toFixed(2)}`);
}

console.log('');
console.log('=== (b) does more data ever pick the right model? nested prefixes of the control ===');
console.log('terms  p-range      a(p^a)   AIC(p^a)   a(p log^a)  AIC(p log^a)   winner       dAIC');
const FA=frame(H,5,10000);
for(const nT of [10,15,19,21,25,30,35,40,45,50,56]){
  if(nT>FA.p.length) continue;
  const x=FA.x.slice(0,nT), y=FA.y.slice(0,nT), p=FA.p.slice(0,nT);
  const r1=ols(x,y);
  const ll=p.map(v=>Math.log(Math.log(v)));
  const y2=y.map((v,i)=>v-x[i]);            // log(h/p) = log c + a log log p
  const r2=ols(ll,y2);
  const a1=aic(r1.rss,nT,2), a2=aic(r2.rss,nT,2);
  const win=a1<a2?'p^a (WRONG)':'p log^a (right)';
  console.log(`${String(nT).padEnd(6)} [${p[0]},${p[nT-1]}]`.padEnd(20)+
    `${r1.a.toFixed(3).padEnd(8)} ${a1.toFixed(1).padEnd(10)} ${r2.a.toFixed(3).padEnd(11)} ${a2.toFixed(1).padEnd(14)} ${win.padEnd(15)} ${(a1-a2).toFixed(1)}`);
}

// The p = 2 convention, printed rather than described. Reading 1 quotes a
// triple from refitting the identical estimator on prefixes begun at p = 2
// instead of p = 5, and that refit was done in a side computation nobody kept
// (2026-08-20, mismatch adjudication #37). It costs one more loop, so it runs
// here and the reading cites the block.
console.log('');
console.log('=== (b2) the same fits with prefixes begun at p = 2, the convention reading 1 contrasts ===');
console.log('terms  p-range      a(p^a)   a from the p=5 prefix of the same length');
{
  // frame() starts its loop at index 2, i.e. it drops p = 2 and p = 3 by
  // construction, which is the convention reading 1 is about. This rebuilds
  // the same frame from index 0.
  const FB={p:[],x:[],y:[]};
  for(let i=0;i<H.length;i++){ FB.p.push(P[i]); FB.x.push(Math.log(P[i])); FB.y.push(Math.log(H[i])); }
  for(const nT of [10,19,45]){
    if(nT>FB.p.length||nT>FA.p.length) continue;
    const r2s=ols(FB.x.slice(0,nT),FB.y.slice(0,nT));
    const r5s=ols(FA.x.slice(0,nT),FA.y.slice(0,nT));
    console.log(`${String(nT).padEnd(6)} [${FB.p[0]},${FB.p[nT-1]}]`.padEnd(20)+
      `${r2s.a.toFixed(3).padEnd(8)} ${r5s.a.toFixed(3)}`);
  }
}

console.log('');
console.log('=== (c) the same two fits on h2, for reference (21 terms, p in [5,73]) ===');
{
  const F=frame(H2,5,73);
  const r1=ols(F.x,F.y);
  const ll=F.p.map(v=>Math.log(Math.log(v)));
  const r2=ols(ll,F.y.map((v,i)=>v-F.x[i]));
  console.log(`n=${F.p.length}  p^a: a=${r1.a.toFixed(3)} +- ${r1.se.toFixed(3)}, AIC=${aic(r1.rss,F.p.length,2).toFixed(1)}`);
  console.log(`      p*log^a p: a=${r2.a.toFixed(3)}, AIC=${aic(r2.rss,F.p.length,2).toFixed(1)}`);
}

console.log('');
console.log('=== (d) what a lower-bound ladder does to the exponent ===');
console.log('Take the control and shave each term by a shortfall that GROWS with n,');
console.log('which is what research/h2-lower-ladder.js measures on real data.');
console.log('shortfall at last term   fitted a (truth on this range = 1.282 measured)');
for(const s of [0,0.05,0.10,0.20,0.30,0.40]){
  const F=frame(H,5,271);
  const n=F.p.length;
  const y=F.y.map((v,i)=>v+Math.log(1-s*i/(n-1)));
  const r=ols(F.x,y);
  console.log(`  ${(100*s).toFixed(0).padStart(3)}%                   a=${r.a.toFixed(3)}   (shift ${(r.a-1.282).toFixed(3)})`);
}

// ----------------------------------------------------------------------------
// THE PRE-CORRECTION RUN, kept because it is the record of what was superseded.
// The block below is the run made after the A048670 correction recorded in the
// header banner. The pre-correction run differed only in the third decimal and
// changed no verdict: section (a)'s mean column read 1.2604, 1.2691, 1.2750,
// 1.2814, 1.2866, 1.2874, 1.2873, 1.2869, 1.2999 instead of the figures below,
// section (b)'s last two AIC pairs moved by 0.2 to 0.3 with the winner
// unchanged at every prefix length, and section (d)'s deep-shave rows moved by
// 0.001. The three prefix readings the corpus quotes, 1.191 at 10 terms, 1.238
// at 19 and 1.282 at 45 and beyond, sit in the corrupt-tail-free part of the
// ladder and did not move at all. This paragraph sat inside the OUTPUT region
// until 2026-08-19, where an embed would have overwritten it.
// ----------------------------------------------------------------------------

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/h2-length-needed.js
//   invocation:  node research/h2-length-needed.js
//   code-sha256: 06a2ca844ff82fd370e4049bf5417b5e8bf71dcf567f9bf0cf1292ae4a19a928
//   out-sha256:  5e242feea019cb1ade94732bf320139c36f96ffdeee084f0db9caf5096f3b63e
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// === (a) statistical precision: sliding windows on the control, true exponent 1 ===
// width  windows   mean      sd        median-se   sd*width
// 8      49        1.2568    0.1297    0.0895      1.04
// 10     47        1.2660    0.0942    0.0658      0.94
// 12     45        1.2720    0.0848    0.0512      1.02
// 15     42        1.2788    0.0739    0.0363      1.11
// 19     38        1.2846    0.0567    0.0262      1.08
// 21     36        1.2856    0.0517    0.0227      1.08
// 25     32        1.2859    0.0423    0.0191      1.06
// 30     27        1.2859    0.0359    0.0174      1.08
// 40     17        1.2991    0.0181    0.0124      0.72
//
// === (b) does more data ever pick the right model? nested prefixes of the control ===
// terms  p-range      a(p^a)   AIC(p^a)   a(p log^a)  AIC(p log^a)   winner       dAIC
// 10     [5,37]       1.191    -44.4      0.484       -44.8          p log^a (right) 0.5
// 15     [5,59]       1.205    -72.0      0.561       -71.4          p^a (WRONG)     -0.6
// 19     [5,73]       1.238    -90.2      0.671       -85.8          p^a (WRONG)     -4.4
// 21     [5,83]       1.251    -100.0     0.721       -93.5          p^a (WRONG)     -6.5
// 25     [5,103]      1.265    -122.4     0.788       -111.8         p^a (WRONG)     -10.6
// 30     [5,131]      1.277    -150.3     0.855       -134.3         p^a (WRONG)     -16.0
// 35     [5,157]      1.279    -181.3     0.893       -160.2         p^a (WRONG)     -21.1
// 40     [5,181]      1.280    -213.2     0.924       -186.5         p^a (WRONG)     -26.8
// 45     [5,211]      1.282    -245.4     0.954       -212.3         p^a (WRONG)     -33.1
// 50     [5,239]      1.282    -278.2     0.976       -239.2         p^a (WRONG)     -39.0
// 56     [5,271]      1.282    -318.3     1.000       -271.4         p^a (WRONG)     -46.9
//
// === (b2) the same fits with prefixes begun at p = 2, the convention reading 1 contrasts ===
// terms  p-range      a(p^a)   a from the p=5 prefix of the same length
// 10     [2,29]       1.176    1.191
// 19     [2,67]       1.198    1.238
// 45     [2,197]      1.258    1.282
//
// === (c) the same two fits on h2, for reference (21 terms, p in [5,73]) ===
// n=19  p^a: a=1.847 +- 0.035, AIC=-76.8
//       p*log^a p: a=2.448, AIC=-76.9
//
// === (d) what a lower-bound ladder does to the exponent ===
// Take the control and shave each term by a shortfall that GROWS with n,
// which is what research/h2-lower-ladder.js measures on real data.
// shortfall at last term   fitted a (truth on this range = 1.282 measured)
//     0%                   a=1.282   (shift -0.000)
//     5%                   a=1.268   (shift -0.014)
//    10%                   a=1.253   (shift -0.029)
//    20%                   a=1.220   (shift -0.062)
//    30%                   a=1.184   (shift -0.098)
//    40%                   a=1.143   (shift -0.139)
// ============================================================================
// READINGS
//
// 1. THE STARTING-PRIME CONVENTION IS p = 5, AND THIS FILE IS WHERE IT IS
//    VISIBLE. Section (b)'s p-range column is printed, not inferred: the ten-
//    term prefix is [5, 37] and the nineteen-term one is [5, 73], so the fits
//    drop p = 2 and p = 3 and start at the third prime. That reproduces
//    exponent-control section 1's nested prefix readings 1.191, 1.238, 1.282
//    exactly. Refitting the identical estimator on prefixes begun at p = 2
//    returns 1.176, 1.198, 1.258 instead — section (b2) above, added
//    2026-08-20 so this comparison is printed rather than described — so the
//    difference between the two sets is the convention and nothing else. Recorded because the convention was stated nowhere and the
//    mismatch it produced had been standing as an open question.
//    THE SECOND HALF OF THE CONVENTION, so the next reader does not find a
//    disagreement where there is none: exponent-control.js uses the p = 5 start
//    for its nested and pilot fits (fit2(H,P,2,·)) but the p = 2 start for its
//    sliding-window distribution (index 0, 49 windows at width 10). Section (a)
//    here slides over the p >= 5 frame, 47 windows at width 10, so its mean
//    column sits about 0.004 above exponent-control section 3's. Same
//    estimator, same data, two frames, and both files are internally right.
//
// 2. SECTION (c) AGREES WITH THE CONTROL FILE, DIGIT FOR DIGIT. The h2 x-frame
//    slope over the 19 terms of [5, 73] is 1.847 with SE 0.035, which is the
//    same 1.847 research/exponent-control.js prints for the same frame and the
//    same range. Two files, two code paths, one number.
//
// 3. THE ANSWER TO THE QUESTION ASKED. Distinguishing exponent 1.5 from 2 on a
//    log-log slope needs the sliding-window sd below about 0.25, which section
//    (a) reaches by width 8 already; but the ESTIMATE is biased, sitting at
//    1.26 to 1.30 where the truth is 1 + o(1), and the bias does not shrink
//    with width over this whole range. So length buys precision and does not
//    buy accuracy. Section (b) says the same thing from the model-selection
//    side and more sharply: the WRONG family, a pure power law, wins on AIC at
//    every prefix from 15 terms to 56, and its margin GROWS, reaching 47 AIC
//    units at the full ladder. On an object whose true law is p*log^a p, 56
//    terms are not enough to prefer the truth. Two-class ladders have 21 terms.
//
// 4. SECTION (d) IS THE WARNING FOR THE LOWER-BOUND LADDER. A shortfall that
//    grows linearly to 20% by the last term drags the fitted exponent down by
//    0.062, and to 40% drags it by 0.139. research/h2-lower-ladder.js measures
//    the real shortfall against the 19 known omega2 terms, and any exponent
//    read off a lower-bound ladder has to be corrected by that measurement
//    before it is comparable with a ladder of exact terms.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain verbatim
// actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   The "about 0.004" of reading 1 is the gap between section (a)'s mean column
//     and the x-frame rows of research/exponent-control.js S3. Width by width:
//     1.2660 against 1.262, 1.2720 against 1.267, 1.2846 against 1.280, 1.2856
//     against 1.282, 1.2859 against 1.283. The window counts printed on both
//     sides, 47 here and 49 there, are the visible sign of the two frames.
//
// DEFINITION / criterion set inside the reading:
//   0.25 in reading 3 is not measured. It is half the 1.5-to-2 separation the
//     reading asks to distinguish, used as the sd a slope estimate must fall
//     below. Section (a)'s width-8 sd of 0.1297 is what clears it.
//
// RESOLVED 2026-08-20 (mismatch adjudication #37), by making the script print
//   them. 1.176, 1.198 and 1.258 in reading 1 are the refit of the same
//   estimator on prefixes begun at p = 2. The reading said they were "computed
//   here", but the run printed only the p = 5 prefixes of section (b), whose
//   matching values are 1.191, 1.238 and 1.282, and no other script in
//   research/ printed the p = 2 triple. They entered with the readings in
//   296e54e from a side computation that was never declared. Section (b2) now
//   runs it: `frame()` drops p = 2 and p = 3 by construction (its loop starts
//   at index 2), so (b2) rebuilds the same frame from index 0 and fits the
//   same OLS at the same three prefix lengths. It returns 1.176 at [2,29],
//   1.198 at [2,67] and 1.258 at [2,197] against 1.191, 1.238 and 1.282 at the
//   p = 5 prefixes of the same lengths — the quoted triple to three decimals,
//   all three. The side computation was right; it is now a block.
// ---------------------------------------------------------------------------
