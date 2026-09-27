'use strict';
// EXPONENT-CONTROL — the exponent of G2(x#), calibrated against a control whose answer is known
// (the control is the one-class Jacobsthal h(p#), A048670, 64 terms carried,
//  fits pinned to the first 58, true exponent 1 + o(1))
/* =====================================================================
   exponent-control.js  (2026-08-17)

   QUESTION
   What is the true growth exponent of the two-class maximum twin-slot gap
   G2(x#)?  THE-DIALS section 2 prices the whole Zone Postulate route on it:
   exponent 2 means the margin against the window x'^2 is a constant forever,
   exponent below 2 means the margin grows like a power of x.

   METHOD, and it is the only new thing here
   The ordinary Jacobsthal h(p#) is the same object one dimension down and we
   KNOW its answer.  Iwaniec 1978 proves exponent <= 2; Maier and Pomerance
   conjecture p*(log p)^{2+o(1)}, i.e. exponent 1 + o(1); Erdos 1962 is the
   ancestor.  So h is a CONTROL: run every estimator we would run on G2 on
   58 terms of an object whose answer is known, and see what the estimator
   says.  Whatever it gets wrong there, it gets wrong here.

   HONEST DOUBT, recorded before the numbers
   The briefing's proposal is a "bias transfer": measure the control's error
   (+0.19 over p in [5,37]) and subtract it from the two-class reading (1.801),
   landing at about 1.6.  Three things could kill that.  (a) the bias may not
   be constant across ranges.  (b) a log-log slope may be the wrong estimator
   entirely.  (c) the two objects have different sieve dimension, so there is
   no reason a priori for their biases to match.  Also: ten to twelve points
   is very few, and this repo has twice been burned by fitting laws to short
   ladders (TODO 0b, the "flat 1.43 multiplier" scare).  "This data cannot
   distinguish the models" is an allowed and possibly correct answer.

   PRIOR ART (research/PRIOR-ART.md).  h(p#) is A048670 and is Jacobsthal's,
   Erdos's, Iwaniec's, Maier-Pomerance's.  h2 is Ziller and Morack's paired
   Jacobsthal, A288815, and the reduction "h2(n) < p_n^2 - p_n implies TPC" is
   theirs, 2017.  Nothing here re-derives any of it.  The only thing being
   measured that is ours is G2, the difference-2 twin-slot spacing.

   DATA
   A048670   64 terms, h(p_n#), one omitted class per prime.  The entry
             face carries 58; a(59)..a(64) = 978..1110 (p = 277..311) are the
             b-file tail (Andrzej Bozek, single-witness), adopted 2026-08-20
             under the series rule after an exact 58/58 overlap check
             (external-data-audit.md M1).  EVERY fit and window below is
             index-pinned to the first 58 terms, the dataset all quoted
             figures were calibrated on; the 64-term refresh is queued with
             the 22-term G2 refit.
   A288815   21 terms, h2(p_n#), two omitted classes, adversarial choice.
   G2        12 terms, ours, the arithmetic choice {0,-2}.  G2 <= h2 pointwise.
   ===================================================================== */

const H = [2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,190,
  200,216,234,258,264,282,300,312,330,354,378,388,414,432,450,476,492,510,538,
  550,574,600,616,642,660,686,718,742,762,798,810,834,858,876,908,926,954,
  978,1002,1030,1058,1098,1110];  // <- b-file tail, unused by the pinned fits
const G2 = [2,6,12,30,42,66,108,150,204,258,348,528];
const H2 = [2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,
  1902,2190,2460,2622];

function sievePrimes(n){const s=new Uint8Array(n+1),o=[];
  for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const P = sievePrimes(2000).slice(0,64);          // p_1 .. p_64
const TH = [];                                    // theta(p_n) = ln(p_n#)
{let t=0;for(let i=0;i<64;i++){t+=Math.log(P[i]);TH.push(t);}}
// exact mean gaps: one class p#/phi(p#), two classes p#/prod(q-2)
const M1=[],M2=[];
{let a=1,b=1;for(let i=0;i<64;i++){const p=P[i];a*=p/(p-1);if(p>2)b*=p/(p-2);M1.push(a);M2.push(2*b);}}

/* --- estimators ---------------------------------------------------- */
// two-parameter log-linear fit  ln y = ln c + a*ln(basis)
function fit2(y,basis,lo,hi){
  let n=0,sx=0,sy=0,sxx=0,sxy=0;
  for(let i=lo;i<=hi;i++){const X=Math.log(basis[i]),Y=Math.log(y[i]);
    n++;sx+=X;sy+=Y;sxx+=X*X;sxy+=X*Y;}
  const Sxx=sxx-sx*sx/n, a=(sxy-sx*sy/n)/Sxx, ic=(sy-a*sx)/n;
  return stats(y,i=>ic+a*Math.log(basis[i]),lo,hi,2,{a,c:Math.exp(ic),
    se:null,Sxx});
}
// one-parameter fit with the exponent frozen: ln y = ln c + ln g(i)
function fit1(y,g,lo,hi){
  let n=0,s=0;for(let i=lo;i<=hi;i++){s+=Math.log(y[i])-Math.log(g(i));n++;}
  const ic=s/n;
  return stats(y,i=>ic+Math.log(g(i)),lo,hi,1,{a:null,c:Math.exp(ic)});
}
// residual diagnostics: rms, max, sign runs, lag-1 autocorrelation, AIC
function stats(y,pred,lo,hi,k,extra){
  const r=[];for(let i=lo;i<=hi;i++)r.push(Math.log(y[i])-pred(i));
  const n=r.length, ss=r.reduce((u,v)=>u+v*v,0), m=r.reduce((u,v)=>u+v,0)/n;
  let runs=1,prev=null,num=0,den=0;
  for(let i=0;i<n;i++){const q=r[i]>=0?1:-1;if(prev!==null&&q!==prev)runs++;prev=q;
    den+=(r[i]-m)**2;if(i)num+=(r[i]-m)*(r[i-1]-m);}
  const o={...extra,n,rms:Math.sqrt(ss/n),max:Math.max(...r.map(Math.abs)),
    runs,expRuns:(n+1)/2,ac1:num/den,aic:n*Math.log(ss/n)+2*k,r};
  if(extra&&extra.Sxx)o.se=Math.sqrt(ss/(n-2)/extra.Sxx);
  return o;
}
const F=(x,d=3)=>x.toFixed(d);

/* --- S1. CUSTODY --------------------------------------------------- */
console.log('S1. CUSTODY. Reproduce three published tables digit for digit.\n');
console.log('  PRIOR-ART.md "what 1402.1970 gives us": h, G2, ratio');
let s='   ';for(let i=2;i<12;i++)s+=`${P[i]}:${H[i]}/${G2[i]}=${F(G2[i]/H[i],2)}  `;
console.log(s);
console.log('  U-FRAME 6a margin list h2 vs p_n^2 - p_n (their own statement)');
s='   ';for(let i=2;i<21;i++)s+=F((P[i]*P[i]-P[i])/H2[i],2)+' ';
console.log(s);
console.log('  THE-DIALS section 2 margin table, G2 vs x\'^2');
s='   ';for(let i=8;i<12;i++)s+=`x=${P[i]}: ${G2[i]}/${P[i+1]**2} m=${F(P[i+1]**2/G2[i],2)}  `;
console.log(s);
console.log('  A288815 = 6*A072753 + 6, shifted by 2');
const A072753=[2,4,10,24,31,42,60,74,94,117,148,173,213,236,275,316,364,409,436];
console.log('   check:',A072753.map((v,i)=>6*v+6===H2[i+2]).every(Boolean));
console.log('  briefing pilot: h[5,37]=1.191, h[5,271]=1.282, G2[5,37]=1.801');
console.log('   ours:',F(fit2(H,P,2,11).a),F(fit2(H,P,2,57).a),F(fit2(G2,P,2,11).a));

/* --- S2. IS THE BIAS CONSTANT ACROSS RANGES? ----------------------- */
console.log('\n\nS2. The control, h(p#), whose TRUE exponent is 1 + o(1).');
console.log('    Log-log slope over nested and disjoint ranges.\n');
console.log('    range          n   a(vs p)   a(vs theta)');
for(const [lo,hi] of [[2,11],[2,20],[2,57],[20,57],[40,57]]){
  const A=fit2(H,P,lo,hi),B=fit2(H,TH,lo,hi);
  console.log(`    [${P[lo]},${P[hi]}]`.padEnd(19)+`${String(A.n).padStart(2)}   ${F(A.a)}     ${F(B.a)}`);
}
console.log('\n    sliding windows of 12 consecutive terms (vs p):');
s='    ';for(let a=0;a+11<=57;a+=4)s+=`[${P[a]},${P[a+11]}]=${F(fit2(H,P,a,a+11).a,2)} `;
console.log(s);

/* --- S3. THE ESTIMATOR'S OWN DISTRIBUTION -------------------------- */
console.log('\n\nS3. The estimator run on 58 terms of a known answer.');
console.log('    Every sliding window of width w, true exponent = 1.\n');
console.log('    frame  w   windows   mean     sd     min     max    bias');
for(const [fr,bs] of [['x    ',P],['theta',TH]])
 for(const w of [10,12,19,21,30]){
  const v=[];for(let a=0;a+w-1<=57;a++)v.push(fit2(H,bs,a,a+w-1).a);
  const m=v.reduce((x,y)=>x+y,0)/v.length,
        sd=Math.sqrt(v.reduce((x,y)=>x+(y-m)**2,0)/v.length);
  console.log(`    ${fr} ${String(w).padStart(2)}     ${String(v.length).padStart(2)}    ${F(m)}  ${F(sd)}  ${F(Math.min(...v))}  ${F(Math.max(...v))}  +${F(m-1)}`);
 }

/* --- S4. MODEL DISCRIMINATION -------------------------------------- */
function models(name,y,lo,hi){
  console.log(`\n    ${name}, p in [${P[lo]},${P[hi]}], n=${hi-lo+1}`);
  console.log('    model            k    rms     max   runs/exp   ac1     AIC   param');
  const yp=y.map((v,i)=>v/P[i]), yt=y.map((v,i)=>v/TH[i]),
        LP=P.map(Math.log), LT=TH.map(Math.log);
  const rows=[
    ['c*p^a         ',2,fit2(y,P,lo,hi)],
    ['c*p*log^a p   ',2,fit2(yp,LP,lo,hi)],
    ['c*p*log^2 p   ',1,fit1(y,i=>P[i]*Math.log(P[i])**2,lo,hi)],
    ['c*p^2         ',1,fit1(y,i=>P[i]*P[i],lo,hi)],
    ['c*theta^a     ',2,fit2(y,TH,lo,hi)],
    ['c*th*log^a th ',2,fit2(yt,LT,lo,hi)],
    ['c*theta^2     ',1,fit1(y,i=>TH[i]*TH[i],lo,hi)]];
  for(const [nm,k,r] of rows)
    console.log(`    ${nm} ${k}  ${F(r.rms,4)}  ${F(r.max,4)}  ${String(r.runs).padStart(2)}/${F(r.expRuns,1)}  ${F(r.ac1).padStart(6)}  ${F(r.aic,1).padStart(7)}  ${r.a!==null&&r.a!==undefined?'a='+F(r.a):'c='+F(r.c,4)}`);
}
console.log('\n\nS4. Model discrimination. Residual STRUCTURE, not R^2.');
console.log('    runs = sign changes in the residual sequence; white noise gives (n+1)/2.');
console.log('    ac1  = lag-1 autocorrelation of residuals; white noise gives 0.');
models('CONTROL h, full',H,2,57);
models('CONTROL h, first 19 (matched to h2)',H,2,20);
models('CONTROL h, first 10 (matched to G2)',H,2,11);
models('G2 (ours)',G2,2,11);
models('h2 (Ziller-Morack)',H2,2,20);

/* --- S5. SYNTHETIC CONTROL: noiseless truths, same ranges ---------- */
console.log('\n\nS5. Fit c*p^a to EXACT noiseless candidate truths over our ranges.');
console.log('    This says what exponent each hypothesis WOULD report here.\n');
const truths={
 'p*log^2 p (Maier-Pomerance)': i=>P[i]*Math.log(P[i])**2,
 'p*log^3 p':                   i=>P[i]*Math.log(P[i])**3,
 'p*log p*llog3/llog2 (FGKMT)': i=>P[i]*Math.log(P[i])*Math.log(Math.log(Math.log(P[i])))/Math.log(Math.log(P[i])),
 'p^2':                         i=>P[i]*P[i],
 'p*log p':                     i=>P[i]*Math.log(P[i]),
};
const RS=[[2,11],[2,20],[2,57],[40,57]];
console.log('    truth'.padEnd(34)+RS.map(([a,b])=>`[${P[a]},${P[b]}]`.padStart(11)).join(''));
for(const [nm,f] of Object.entries(truths)){
  const y=P.map((_,i)=>f(i));
  console.log('    '+nm.padEnd(30)+RS.map(([a,b])=>F(fit2(y,P,a,b).a).padStart(11)).join(''));
}
console.log('    OBSERVED h(p#)'.padEnd(34)+RS.map(([a,b])=>F(fit2(H,P,a,b).a).padStart(11)).join(''));
console.log('    OBSERVED h2'.padEnd(34)+[[2,11],[2,20]].map(([a,b])=>F(fit2(H2,P,a,b).a).padStart(11)).join(''));
console.log('    OBSERVED G2'.padEnd(34)+F(fit2(G2,P,2,11).a).padStart(11));

/* --- S6. STRUCTURAL TRANSFER: divide out the exact densities ------- */
console.log('\n\nS6. The transfer done structurally instead of by subtracting a bias.');
console.log('    R1 = h/M1 and R2 = h2/M2, where M1 = p#/phi(p#) and M2 = p#/prod(q-2)');
console.log('    are the EXACT mean gaps.  Dividing them out removes the whole sieve-');
console.log('    dimension difference, since M1 ~ e^gamma*log p and M2 ~ c*log^2 p.');
console.log('    If Q = R2/R1 is bounded, h2 and h have the SAME power exponent.\n');
console.log('     n   p     M1      M2     R1=h/M1  R2=h2/M2   Q     Qg=(G2/M2)/R1');
for(let i=2;i<21;i++){
  const R1=H[i]/M1[i],R2=H2[i]/M2[i];
  console.log(`    ${String(i+1).padStart(2)} ${String(P[i]).padStart(4)} ${F(M1[i]).padStart(6)} ${F(M2[i],2).padStart(6)}  ${F(R1).padStart(8)} ${F(R2).padStart(9)}  ${F(R2/R1).padStart(6)}  ${(i<12?F((G2[i]/M2[i])/R1):'').padStart(8)}`);
}
const Q=H2.map((v,i)=>(v/M2[i])/(H[i]/M1[i]));
const Qg=G2.map((v,i)=>(v/M2[i])/(H[i]/M1[i]));
console.log('\n    log-log slope of Q over trailing ranges (0 would mean same exponent):');
for(const a of [2,6,8,10,12]) console.log(`      p in [${P[a]},73]  n=${21-a}  slope=${F(fit2(Q,P,a,20).a,4)} +- ${F(fit2(Q,P,a,20).se,4)}`);
console.log(`      Qg (our G2) p in [5,37]  n=10  slope=${F(fit2(Qg,P,2,11).a,4)} +- ${F(fit2(Qg,P,2,11).se,4)}`);
console.log('    control cross-check, slope of R1 itself (predicted 1 + 1/log p ~ 1.2):');
console.log(`      R1 [5,271] slope=${F(fit2(H.map((v,i)=>v/M1[i]),P,2,57).a,4)}`);

/* --- S7. THE THREE READINGS OF THE TWO-CLASS EXPONENT -------------- */
console.log('\n\nS7. Three defensible readings of the same data, side by side.\n');
console.log('    object  range     n   raw a   nominal se   (2-a)/se   equal-bias   proportional-bias');
for(const [nm,y,lo,hi] of [['G2',G2,2,11],['h2',H2,2,11],['h2',H2,2,20]]){
  const A=fit2(y,P,lo,hi), C=fit2(H,P,lo,hi);
  const w=hi-lo+1;
  const v=[];for(let a=0;a+w-1<=57;a++)v.push(fit2(H,P,a,a+w-1).a);
  const meanBias=v.reduce((x,z)=>x+z,0)/v.length-1;
  const sdBias=Math.sqrt(v.reduce((x,z)=>x+(z-(meanBias+1))**2,0)/v.length);
  // proportional: bias scales with the fitted effective log power a_eff
  const aeffC=fit2(H.map((u,i)=>u/P[i]),P.map(Math.log),lo,hi).a;
  const aeffY=fit2(y.map((u,i)=>u/P[i]),P.map(Math.log),lo,hi).a;
  console.log(`    ${nm.padEnd(6)} [${P[lo]},${P[hi]}]`.padEnd(20)+
    `${String(w).padStart(2)}  ${F(A.a)}   +-${F(A.se)}      ${F((2-A.a)/A.se,1).padStart(5)}     `+
    `${F(A.a-meanBias)}+-${F(sdBias,3)}    ${F(A.a-meanBias*aeffY/aeffC)}  (aeff ${F(aeffC,2)}->${F(aeffY,2)})`);
}
console.log('\n    equal-bias   = subtract the control\'s mean bias at the same window width');
console.log('    proportional = scale that bias by the ratio of fitted effective log powers');

/* --- S8. THE MARGIN, which is the thing THE-DIALS actually needs --- */
console.log('\n\nS8. Margin against the zone window.  Two conventions, and they differ.');
console.log('    Same-index  p_n^2 / y  has trend slope exactly 2 - a.');
console.log('    Next-prime  p_{n+1}^2 / y  is the true zone but its short-range trend');
console.log('    is contaminated: the OLS slope of log p_{n+1} on log p_n is 0.88, not 1,');
console.log('    because consecutive log-primes crowd together as n grows.\n');
console.log('      x    G2   margG2(p\')  h2   margH2(p\')  margH2(p_n)   control h margin(p\')');
for(let i=2;i<21;i++){
  const q=P[i+1]**2, qn=P[i]**2;
  console.log(`    ${String(P[i]).padStart(3)} ${String(i<12?G2[i]:'').padStart(5)}  ${(i<12?F(q/G2[i],2):'').padStart(8)}  ${String(H2[i]).padStart(5)}  ${F(q/H2[i],2).padStart(8)}   ${F(qn/H2[i],2).padStart(8)}      ${F(q/H[i],2).padStart(8)}`);
}
const mgN=P.map((p,i)=>P[i+1]**2), mh2n=H2.map((v,i)=>P[i]**2/v),
      mh2p=H2.map((v,i)=>P[i+1]**2/v), mg2p=G2.map((v,i)=>P[i+1]**2/v),
      mhc=H.map((v,i)=>P[i+1]**2/v);
console.log('\n    trend slopes of the margin (positive = margin growing):');
const T=(nm,y,lo,hi)=>{const r=fit2(y,P,lo,hi);console.log(`      ${nm.padEnd(28)} slope=${F(r.a,4)} +- ${F(r.se,4)}`);};
T('h2 vs p_n^2   [5,73]',mh2n,2,20);
T('h2 vs p_{n+1}^2 [5,73]',mh2p,2,20);
T('h2 vs p_{n+1}^2 [23,73]',mh2p,8,20);
T('G2 vs p_{n+1}^2 [5,37]',mg2p,2,11);
T('CONTROL h vs p_{n+1}^2 [5,73]',mhc,2,20);
T('CONTROL h vs p_{n+1}^2 [5,271]',mhc,2,57);
console.log(`    min margin h2 vs p_{n+1}^2 = ${F(Math.min(...mh2p.slice(2)),3)} at x = ${P[2+mh2p.slice(2).indexOf(Math.min(...mh2p.slice(2)))]}`);
console.log(`    last nine h2 margins: ${mh2p.slice(12).map(v=>F(v,2)).join(' ')}`);
console.log('\n    extrapolated margin p\'^2/h2, anchored at x=73 where it is '+F(mh2p[20],2)+':');
console.log('      x          a=1.847 (raw)   a=1.567 (corrected)   x/log^3 x (structural)');
for(const x of [1e2,1e3,1e4,1e6,1e9]){
  const A=mh2p[20]*Math.pow(x/73,2-1.847), B=mh2p[20]*Math.pow(x/73,2-1.567),
        C=mh2p[20]*(x/73)*Math.pow(Math.log(73)/Math.log(x),3);
  console.log(`      ${x.toExponential(0).padEnd(9)}  ${F(A,2).padStart(12)}   ${F(B,2).padStart(18)}   ${C.toExponential(2).padStart(20)}`);
}

/* --- S9. TWO HARD CHECKS ON THE READINGS --------------------------- */
console.log('\n\nS9. Two checks that constrain which reading can be right.\n');
console.log('    (a) h2 >= h pointwise?  The adversary choosing two classes can always');
console.log('        take one of them to be the one-class optimum, so h2 >= h must hold,');
console.log('        and therefore exponent(h2) >= exponent(h) = 1 + o(1).');
console.log('        checked at 21 terms:',H2.map((v,i)=>v>=H[i]).every(Boolean));
console.log('        => the proportional-bias reading (0.67 to 0.83) is REFUTED.');
console.log('    (b) G2 <= h2 pointwise?  checked at 12 terms:',G2.map((v,i)=>v<=H2[i]).every(Boolean));
console.log('        => any upper bound on h2\'s exponent is also one on G2\'s.');
console.log('\n    (c) frame audit.  U-FRAME 6a reports alpha = 1.653 on all 21 terms.');
console.log('        that is the THETA frame:  ours =',F(fit2(H2,TH,0,20).a,4));
console.log('        the same 21 terms in the X frame:',F(fit2(H2,P,0,20).a,4));
console.log('        the Zone Postulate threshold p_n^2 is an X-frame quantity, and the');
console.log('        control\'s bias differs by frame: +'+F(0.282,3)+' in x, +'+F(0.220,3)+' in theta.');
console.log('        theta-frame corrected h2 [5,73]:',F(fit2(H2,TH,2,20).a-0.219,3),
            '  x-frame corrected:',F(fit2(H2,P,2,20).a-0.280,3));
console.log('\n    (d) the deficit below 2 against the estimator\'s known bias:');
console.log('        2 - 1.847 = 0.153, and the control\'s bias at n=19 is +0.280.');
console.log('        The bias is positive in ALL 40 control windows (min 1.197 > 1), so');
console.log('        it is a one-sided artifact: the true exponent is BELOW the raw fit.');
console.log('        That, not the nominal se, is why exponent 2 is disfavoured.');

/* --- S10. TWO CLAIMS THE WRITE-UP MAKES, VERIFIED ------------------ */
console.log('\n\nS10. Two supporting claims, measured.\n');
const NXT=P.map((_,i)=>P[i+1]);
console.log('    (a) OLS slope of log p_{n+1} on log p_n:');
console.log('        [5,73] =',F(fit2(NXT,P,2,20).a,4),'  [5,271] =',F(fit2(NXT,P,2,57).a,4));
console.log('        This is why the p_{n+1}^2 and p_n^2 margin trends disagree in sign');
console.log('        on a 19-term ladder even though they agree asymptotically.');
{let s2=0,c=0,mx=0;
 for(let a=0;a+10<=57;a++){const d=Math.abs(fit2(H,P,a,a+10).a-fit2(H,P,a,a+9).a);s2+=d;c++;mx=Math.max(mx,d);}
 console.log('    (b) effect of one extra term on a ten-term fit, over',c,'control cases:');
 console.log('        mean |delta a| =',F(s2/c,4),'  max =',F(mx,4));
 console.log('        against a bias of +0.262. G2(41#) will not move this question.');}

/* --- S11. THE 22-TERM REFIT (2026-08-21) ---------------------------
   The trusted A144311 ladder (research/a144311-full-ladder.js, series rule
   of 2026-08-20) extends G2 from 12 to 22 terms, out to x = 79.  This
   section fits the two-class exponent on all 22 trusted terms with the SAME
   discipline as the pinned fits above: raw log-log slope with p = 2, 3
   excluded (as every fit above), the control's bias read off sliding
   windows of the MATCHED width on h, and the practical bracket derived as
   in S5/S7: lower edge = corrected central minus twice the control window
   sd, upper edge = the raw fit, rounded outward to one decimal.
   S1-S10 are the calibration record and are untouched: every fit there
   stays index-pinned to the first 58 h-terms and the <=37-term G2 set.
   The control here is the full 64-term h ladder (the 2026-08-21 refresh);
   the pinned 58-term windows are printed beside it and differ by 0.002. */
console.log('\n\nS11. The 22-term G2 refit, same discipline, trusted A144311 ladder.\n');
const G2T = [2,6,12,30,42,66,108,150,204,258,348,528,546,618,708,870,966,1080,
  1284,1398,1530,1710];   // G2 = A144311 + 1, trusted to x = 79
for(let i=0;i<12;i++)if(G2T[i]!==G2[i])throw new Error('22-term ladder disagrees with the pinned 12-term G2 at i='+i);
{
  const rx=fit2(G2T,P,2,21), rt=fit2(G2T,TH,2,21);   // p in [5,79], n=20
  console.log(`    raw fit, 22 terms, p in [${P[2]},${P[21]}], n=${rx.n}:`);
  console.log(`      x-frame     a = ${F(rx.a)} +- ${F(rx.se)} (nominal)`);
  console.log(`      theta-frame a = ${F(rt.a)} +- ${F(rt.se)} (nominal)`);
  const w=20, wins=(bs,N)=>{const v=[];for(let a=0;a+w-1<=N-1;a++)v.push(fit2(H,bs,a,a+w-1).a);return v;};
  const report=(nm,v)=>{const m=v.reduce((x,y)=>x+y,0)/v.length,
    sd=Math.sqrt(v.reduce((x,y)=>x+(y-m)**2,0)/v.length);
    console.log(`      ${nm}: ${v.length} windows  mean=${F(m)}  sd=${F(sd)}  min=${F(Math.min(...v))}  max=${F(Math.max(...v))}  bias=+${F(m-1)}`);
    return {m,sd};};
  console.log('\n    the control at the matched width (20 terms), true exponent 1:');
  const cx=report('x-frame,     64-term h', wins(P,64));
  const ct=report('theta-frame, 64-term h', wins(TH,64));
  const c58=report('x-frame,     58-term h (pinned set)', wins(P,58));
  const ax=rx.a-(cx.m-1), at=rt.a-(ct.m-1);
  console.log('\n    corrected readings (equal-bias transfer, as S5):');
  console.log(`      x-frame     ${F(rx.a)} - ${F(cx.m-1)} = ${F(ax)}`);
  console.log(`      theta-frame ${F(rt.a)} - ${F(ct.m-1)} = ${F(at)}`);
  console.log(`      (pinned 58-term control instead: ${F(rx.a-(c58.m-1))}; the choice moves it by ${F(Math.abs(c58.m-cx.m))})`);
  const lo=Math.floor((ax-2*cx.sd)*10)/10, hi=Math.ceil(rx.a*10)/10;
  console.log(`\n    practical bracket: [corrected - 2*sd, raw] = [${F(ax-2*cx.sd,2)}, ${F(rx.a,2)}] -> ${lo.toFixed(1)} to ${hi.toFixed(1)}`);
  console.log(`    old (<=37-term) reading for comparison: central 1.54 (G2, 10 terms) /`);
  console.log(`    1.57 (h2, 19 terms), bracket 1.3 to 1.9, control bias +0.262 at width 10.`);
  console.log(`    hard floor >= 1 (h2 >= h) and the one-sided bias argument are unchanged.`);
  console.log(`    Both moves push the corrected central DOWN: the raw fit fell (1.801 on`);
  console.log(`    10 terms -> ${F(rx.a)} on ${rx.n}) where the control's own raw fit RISES with`);
  console.log(`    prefix length (1.191 at 10 terms -> 1.238 at 19 -> 1.282 at 56), and the`);
  console.log(`    matched-width bias grew (+0.262 at width 10 -> +${F(cx.m-1)} at width 20).`);
}


// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/exponent-control.js
//   invocation:  node research/exponent-control.js
//   code-sha256: 09dc5c7f1a72eaf32fe73581ba40625e337c87a4d18bf1eac76b9e1de9ca9580
//   out-sha256:  2fa02e904d55970d2c7ceec275f5bc5cc578c69eeb1e121be331c350b2697487
//   body-lines:  267
//   forced:      2026-08-21, 0 of 545 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.1 s
// ============================================================================
// S1. CUSTODY. Reproduce three published tables digit for digit.
//
//   PRIOR-ART.md "what 1402.1970 gives us": h, G2, ratio
//    5:6/12=2.00  7:10/30=3.00  11:14/42=3.00  13:22/66=3.00  17:26/108=4.15  19:34/150=4.41  23:40/204=5.10  29:46/258=5.61  31:58/348=6.00  37:66/528=8.00
//   U-FRAME 6a margin list h2 vs p_n^2 - p_n (their own statement)
//    1.11 1.40 1.67 1.04 1.42 1.33 1.38 1.80 1.63 1.88 1.83 1.73 1.68 1.94 2.07 1.92 2.02 2.02 2.00
//   THE-DIALS section 2 margin table, G2 vs x'^2
//    x=23: 204/841 m=4.12  x=29: 258/961 m=3.72  x=31: 348/1369 m=3.93  x=37: 528/1681 m=3.18
//   A288815 = 6*A072753 + 6, shifted by 2
//    check: true
//   briefing pilot: h[5,37]=1.191, h[5,271]=1.282, G2[5,37]=1.801
//    ours: 1.191 1.282 1.801
//
//
// S2. The control, h(p#), whose TRUE exponent is 1 + o(1).
//     Log-log slope over nested and disjoint ranges.
//
//     range          n   a(vs p)   a(vs theta)
//     [5,37]         10   1.191     1.103
//     [5,73]         19   1.238     1.149
//     [5,271]        56   1.282     1.204
//     [73,271]       38   1.247     1.209
//     [179,271]      18   1.259     1.223
//
//     sliding windows of 12 consecutive terms (vs p):
//     [2,37]=1.18 [11,53]=1.22 [23,71]=1.30 [41,89]=1.44 [59,107]=1.44 [73,131]=1.22 [97,151]=1.20 [109,173]=1.17 [137,193]=1.28 [157,223]=1.25 [179,239]=1.25 [197,263]=1.21
//
//
// S3. The estimator run on 58 terms of a known answer.
//     Every sliding window of width w, true exponent = 1.
//
//     frame  w   windows   mean     sd     min     max    bias
//     x     10     49    1.262  0.094  1.126  1.549  +0.262
//     x     12     47    1.267  0.086  1.152  1.470  +0.267
//     x     19     40    1.280  0.058  1.197  1.415  +0.280
//     x     21     38    1.282  0.053  1.214  1.400  +0.282
//     x     30     29    1.283  0.036  1.236  1.349  +0.283
//     theta 10     49    1.212  0.085  0.934  1.430  +0.212
//     theta 12     47    1.215  0.075  0.961  1.370  +0.215
//     theta 19     40    1.219  0.051  1.020  1.289  +0.219
//     theta 21     38    1.220  0.047  1.039  1.284  +0.220
//     theta 30     29    1.221  0.037  1.086  1.264  +0.221
//
//
// S4. Model discrimination. Residual STRUCTURE, not R^2.
//     runs = sign changes in the residual sequence; white noise gives (n+1)/2.
//     ac1  = lag-1 autocorrelation of residuals; white noise gives 0.
//
//     CONTROL h, full, p in [5,271], n=56
//     model            k    rms     max   runs/exp   ac1     AIC   param
//     c*p^a          2  0.0552  0.1593  27/28.5   0.118   -320.3  a=1.282
//     c*p*log^a p    2  0.0840  0.2394  17/28.5   0.495   -273.4  a=1.000
//     c*p*log^2 p    1  0.2812  1.2388   6/28.5   0.751   -140.1  c=0.1342
//     c*p^2          1  0.7051  2.1412   2/28.5   0.891    -37.1  c=0.0282
//     c*theta^a      2  0.0442  0.1387  15/28.5   0.584   -345.4  a=1.204
//     c*th*log^a th  2  0.0807  0.3005   9/28.5   0.723   -277.9  a=0.653
//     c*theta^2      1  0.8303  2.6498   2/28.5   0.890    -18.8  c=0.0367
//
//     CONTROL h, first 19 (matched to h2), p in [5,73], n=19
//     model            k    rms     max   runs/exp   ac1     AIC   param
//     c*p^a          2  0.0796  0.1398  12/10.0  -0.160    -92.2  a=1.238
//     c*p*log^a p    2  0.0893  0.1706   9/10.0   0.019    -87.8  a=0.671
//     c*p*log^2 p    1  0.3693  0.9943   2/10.0   0.685    -35.9  c=0.1714
//     c*p^2          1  0.5997  1.3433   2/10.0   0.787    -17.4  c=0.0626
//     c*theta^a      2  0.0522  0.1016   9/10.0   0.292   -108.2  a=1.149
//     c*th*log^a th  2  0.0660  0.1348   7/10.0   0.433    -99.3  a=0.365
//     c*theta^2      1  0.7187  1.7067   2/10.0   0.792    -10.6  c=0.0941
//
//     CONTROL h, first 10 (matched to G2), p in [5,37], n=10
//     model            k    rms     max   runs/exp   ac1     AIC   param
//     c*p^a          2  0.0805  0.1383   9/5.5  -0.656    -46.4  a=1.191
//     c*p*log^a p    2  0.0787  0.1536   9/5.5  -0.683    -46.8  a=0.484
//     c*p*log^2 p    1  0.3840  0.7681   2/5.5   0.540    -17.1  c=0.2149
//     c*p^2          1  0.5101  0.9039   2/5.5   0.611    -11.5  c=0.0972
//     c*theta^a      2  0.0376  0.0767   7/5.5  -0.588    -61.6  a=1.103
//     c*th*log^a th  2  0.0390  0.0721   7/5.5  -0.529    -60.9  a=0.222
//     c*theta^2      1  0.6074  1.1771   2/5.5   0.661     -8.0  c=0.1598
//
//     G2 (ours), p in [5,37], n=10
//     model            k    rms     max   runs/exp   ac1     AIC   param
//     c*p^a          2  0.1308  0.2616   6/5.5  -0.344    -36.7  a=1.801
//     c*p*log^a p    2  0.1556  0.2862   5/5.5  -0.016    -33.2  a=1.983
//     c*p*log^2 p    1  0.1557  0.2841   5/5.5  -0.016    -35.2  c=0.8822
//     c*p^2          1  0.1800  0.4282   4/5.5   0.178    -32.3  c=0.3990
//     c*theta^a      2  0.1030  0.1990   3/5.5   0.061    -41.5  a=1.664
//     c*th*log^a th  2  0.1453  0.2954   3/5.5   0.342    -34.6  a=1.412
//     c*theta^2      1  0.2491  0.4695   2/5.5   0.648    -25.8  c=0.6561
//
//     h2 (Ziller-Morack), p in [5,73], n=19
//     model            k    rms     max   runs/exp   ac1     AIC   param
//     c*p^a          2  0.1133  0.3067   7/10.0   0.066    -78.8  a=1.847
//     c*p*log^a p    2  0.1129  0.2757   9/10.0  -0.174    -78.9  a=2.448
//     c*p*log^2 p    1  0.1655  0.4141   6/10.0   0.498    -66.4  c=1.5788
//     c*p^2          1  0.1648  0.4307   8/10.0   0.445    -66.5  c=0.5770
//     c*theta^a      2  0.0875  0.2467   8/10.0   0.122    -88.6  a=1.712
//     c*th*log^a th  2  0.1119  0.2978   5/10.0  -0.054    -79.2  a=1.831
//     c*theta^2      1  0.2575  0.5849   2/10.0   0.684    -49.6  c=0.8670
//
//
// S5. Fit c*p^a to EXACT noiseless candidate truths over our ranges.
//     This says what exponent each hypothesis WOULD report here.
//
//     truth                              [5,37]     [5,73]    [5,271]  [179,271]
//     p*log^2 p (Maier-Pomerance)         1.791      1.685      1.540      1.371
//     p*log^3 p                           2.187      2.027      1.811      1.556
//     p*log p*llog3/llog2 (FGKMT)           NaN        NaN        NaN      1.286
//     p^2                                 2.000      2.000      2.000      2.000
//     p*log p                             1.396      1.342      1.270      1.185
//     OBSERVED h(p#)                      1.191      1.238      1.282      1.259
//     OBSERVED h2                         1.898      1.847
//     OBSERVED G2                         1.801
//
//
// S6. The transfer done structurally instead of by subtracting a bias.
//     R1 = h/M1 and R2 = h2/M2, where M1 = p#/phi(p#) and M2 = p#/prod(q-2)
//     are the EXACT mean gaps.  Dividing them out removes the whole sieve-
//     dimension difference, since M1 ~ e^gamma*log p and M2 ~ c*log^2 p.
//     If Q = R2/R1 is bounded, h2 and h have the SAME power exponent.
//
//      n   p     M1      M2     R1=h/M1  R2=h2/M2   Q     Qg=(G2/M2)/R1
//      3    5  3.750  10.00     1.600     1.800   1.125     0.750
//      4    7  4.375  14.00     2.286     2.143   0.938     0.938
//      5   11  4.813  17.11     2.909     3.857   1.326     0.844
//      6   13  5.214  20.22     4.220     7.418   1.758     0.773
//      7   17  5.539  22.92     4.694     8.378   1.785     1.004
//      8   19  5.847  25.61     5.815    10.072   1.732     1.007
//      9   23  6.113  28.05     6.544    13.046   1.994     1.111
//     10   29  6.331  30.13     7.266    14.934   2.055     1.178
//     11   31  6.542  32.21     8.865    17.696   1.996     1.219
//     12   37  6.724  34.05     9.816    20.792   2.118     1.580
//     13   41  6.892  35.80    10.737    24.974   2.326
//     14   43  7.056  37.54    12.755    27.808   2.180
//     15   47  7.210  39.21    13.870    32.745   2.361
//     16   53  7.348  40.75    14.425    34.896   2.419
//     17   59  7.475  42.18    15.786    39.261   2.487
//     18   61  7.600  43.61    17.370    43.614   2.511
//     19   67  7.715  44.95    19.703    48.719   2.473
//     20   71  7.825  46.25    22.237    53.184   2.392
//     21   73  7.934  47.56    23.949    55.134   2.302
//
//     log-log slope of Q over trailing ranges (0 would mean same exponent):
//       p in [5,73]  n=19  slope=0.3289 +- 0.0282
//       p in [17,73]  n=15  slope=0.2339 +- 0.0249
//       p in [23,73]  n=13  slope=0.2000 +- 0.0334
//       p in [31,73]  n=11  slope=0.2038 +- 0.0522
//       p in [41,73]  n=9  slope=0.0999 +- 0.0688
//       Qg (our G2) p in [5,37]  n=10  slope=0.2978 +- 0.0627
//     control cross-check, slope of R1 itself (predicted 1 + 1/log p ~ 1.2):
//       R1 [5,271] slope=1.0558
//
//
// S7. Three defensible readings of the same data, side by side.
//
//     object  range     n   raw a   nominal se   (2-a)/se   equal-bias   proportional-bias
//     G2     [5,37]   10  1.801   +-0.074        2.7     1.539+-0.094    0.729  (aeff 0.48->1.98)
//     h2     [5,37]   10  1.898   +-0.083        1.2     1.636+-0.094    0.674  (aeff 0.48->2.26)
//     h2     [5,73]   19  1.847   +-0.035        4.4     1.566+-0.058    0.825  (aeff 0.67->2.45)
//
//     equal-bias   = subtract the control's mean bias at the same window width
//     proportional = scale that bias by the ratio of fitted effective log powers
//
//
// S8. Margin against the zone window.  Two conventions, and they differ.
//     Same-index  p_n^2 / y  has trend slope exactly 2 - a.
//     Next-prime  p_{n+1}^2 / y  is the true zone but its short-range trend
//     is contaminated: the OLS slope of log p_{n+1} on log p_n is 0.88, not 1,
//     because consecutive log-primes crowd together as n grows.
//
//       x    G2   margG2(p')  h2   margH2(p')  margH2(p_n)   control h margin(p')
//       5    12      4.08     18      2.72       1.39          8.17
//       7    30      4.03     30      4.03       1.63         12.10
//      11    42      4.02     66      2.56       1.83         12.07
//      13    66      4.38    150      1.93       1.13         13.14
//      17   108      3.34    192      1.88       1.51         13.88
//      19   150      3.53    258      2.05       1.40         15.56
//      23   204      4.12    366      2.30       1.45         21.02
//      29   258      3.72    450      2.14       1.87         20.89
//      31   348      3.93    570      2.40       1.69         23.60
//      37   528      3.18    708      2.37       1.93         25.47
//      41                    894      2.07       1.88         24.99
//      43                   1044      2.12       1.77         24.54
//      47                   1284      2.19       1.72         28.09
//      53                   1422      2.45       1.98         32.84
//      59                   1656      2.25       2.10         31.53
//      61                   1902      2.36       1.96         34.01
//      67                   2190      2.30       2.05         33.16
//      71                   2460      2.17       2.05         30.63
//      73                   2622      2.38       2.03         32.85
//
//     trend slopes of the margin (positive = margin growing):
//       h2 vs p_n^2   [5,73]         slope=0.1535 +- 0.0352
//       h2 vs p_{n+1}^2 [5,73]       slope=-0.0835 +- 0.0450
//       h2 vs p_{n+1}^2 [23,73]      slope=0.0175 +- 0.0446
//       G2 vs p_{n+1}^2 [5,37]       slope=-0.0806 +- 0.0469
//       CONTROL h vs p_{n+1}^2 [5,73] slope=0.5251 +- 0.0257
//       CONTROL h vs p_{n+1}^2 [5,271] slope=0.5715 +- 0.0094
//     min margin h2 vs p_{n+1}^2 = 1.880 at x = 17
//     last nine h2 margins: 2.07 2.12 2.19 2.45 2.25 2.36 2.30 2.17 2.38
//
//     extrapolated margin p'^2/h2, anchored at x=73 where it is 2.38:
//       x          a=1.847 (raw)   a=1.567 (corrected)   x/log^3 x (structural)
//       1e+2               2.50                 2.73                2.64e+0
//       1e+3               3.55                 7.39                7.81e+0
//       1e+4               5.05                20.04                3.30e+1
//       1e+6              10.22               147.16                9.77e+2
//       1e+9              29.41              2929.56                2.89e+5
//
//
// S9. Two checks that constrain which reading can be right.
//
//     (a) h2 >= h pointwise?  The adversary choosing two classes can always
//         take one of them to be the one-class optimum, so h2 >= h must hold,
//         and therefore exponent(h2) >= exponent(h) = 1 + o(1).
//         checked at 21 terms: true
//         => the proportional-bias reading (0.67 to 0.83) is REFUTED.
//     (b) G2 <= h2 pointwise?  checked at 12 terms: true
//         => any upper bound on h2's exponent is also one on G2's.
//
//     (c) frame audit.  U-FRAME 6a reports alpha = 1.653 on all 21 terms.
//         that is the THETA frame:  ours = 1.6526
//         the same 21 terms in the X frame: 1.9244
//         the Zone Postulate threshold p_n^2 is an X-frame quantity, and the
//         control's bias differs by frame: +0.282 in x, +0.220 in theta.
//         theta-frame corrected h2 [5,73]: 1.493   x-frame corrected: 1.567
//
//     (d) the deficit below 2 against the estimator's known bias:
//         2 - 1.847 = 0.153, and the control's bias at n=19 is +0.280.
//         The bias is positive in ALL 40 control windows (min 1.197 > 1), so
//         it is a one-sided artifact: the true exponent is BELOW the raw fit.
//         That, not the nominal se, is why exponent 2 is disfavoured.
//
//
// S10. Two supporting claims, measured.
//
//     (a) OLS slope of log p_{n+1} on log p_n:
//         [5,73] = 0.8815   [5,271] = 0.9267
//         This is why the p_{n+1}^2 and p_n^2 margin trends disagree in sign
//         on a 19-term ladder even though they agree asymptotically.
//     (b) effect of one extra term on a ten-term fit, over 48 control cases:
//         mean |delta a| = 0.0221   max = 0.0781
//         against a bias of +0.262. G2(41#) will not move this question.
//
//
// S11. The 22-term G2 refit, same discipline, trusted A144311 ladder.
//
//     raw fit, 22 terms, p in [5,79], n=20:
//       x-frame     a = 1.777 +- 0.029 (nominal)
//       theta-frame a = 1.647 +- 0.021 (nominal)
//
//     the control at the matched width (20 terms), true exponent 1:
//       x-frame,     64-term h: 45 windows  mean=1.279  sd=0.052  min=1.205  max=1.398  bias=+0.279
//       theta-frame, 64-term h: 45 windows  mean=1.218  sd=0.046  min=1.029  max=1.288  bias=+0.218
//       x-frame,     58-term h (pinned set): 39 windows  mean=1.281  sd=0.055  min=1.205  max=1.398  bias=+0.281
//
//     corrected readings (equal-bias transfer, as S5):
//       x-frame     1.777 - 0.279 = 1.498
//       theta-frame 1.647 - 0.218 = 1.429
//       (pinned 58-term control instead: 1.496; the choice moves it by 0.002)
//
//     practical bracket: [corrected - 2*sd, raw] = [1.39, 1.78] -> 1.3 to 1.8
//     old (<=37-term) reading for comparison: central 1.54 (G2, 10 terms) /
//     1.57 (h2, 19 terms), bracket 1.3 to 1.9, control bias +0.262 at width 10.
//     hard floor >= 1 (h2 >= h) and the one-sided bias argument are unchanged.
//     Both moves push the corrected central DOWN: the raw fit fell (1.801 on
//     10 terms -> 1.777 on 20) where the control's own raw fit RISES with
//     prefix length (1.191 at 10 terms -> 1.238 at 19 -> 1.282 at 56), and the
//     matched-width bias grew (+0.262 at width 10 -> +0.279 at width 20).
// ============================================================================
// READINGS
// ============================================================================
//
// 1. VERIFIED. Custody holds on four independent published tables. The h/G2
//    ratio row of PRIOR-ART.md, the nineteen U-FRAME 6a margins, the four
//    THE-DIALS section 2 margins, and A288815 = 6*A072753 + 6 all reproduce
//    digit for digit. The briefing's three pilot numbers reproduce exactly:
//    1.191, 1.282, 1.801.
//
// 2. REFUTED. The one-class bias is not constant, and it does not shrink with
//    more data. It GROWS: +0.191 on ten terms, +0.238 on nineteen, +0.282 on
//    fifty-six. The sliding-window means are +0.262, +0.267, +0.280, +0.282,
//    +0.283 at widths 10, 12, 19, 21, 30. The scatter collapses from sd 0.094
//    to sd 0.036 while the centre stays at 1.28. The estimator converges, and
//    it converges to the wrong number. Fifty-eight terms of an object whose
//    true exponent is 1 report 1.282 +- 0.008 and give no hint of the truth.
//
// 3. MEASURED, and this is the load-bearing one. The briefing's +0.19 is an
//    unlucky-low draw. The window [5,37] sits near the bottom of the width-10
//    distribution, whose min is 1.126 and mean 1.262. Using the distribution
//    mean instead of the single point moves the corrected G2 reading from
//    1.610 to 1.539.
//
// 4. REFUTED. Maier-Pomerance's p*(log p)^2 is not merely imprecise here, it
//    is the wrong shape on this range. Frozen at exponent 2 it has rms log
//    residual 0.281, max 1.239 (a factor of 3.5), six sign runs against 28.5
//    expected and lag-1 autocorrelation 0.751. As a noiseless truth it would
//    report exponent 1.540 over [5,271]; the data reports 1.282. The observed
//    h(p#) tracks p*log p (which would report 1.270) far better. So the o(1)
//    in the conjectured exponent is strongly negative below p = 271, and any
//    argument that plugs log^2 into a finite ladder is unsound.
//
// 5. REFUTED, and this kills the log-log slope as an asymptotic estimator.
//    On the full 56-term control the pure power law c*p^a beats the correct
//    functional family c*p*log^a p by 47 AIC units, with essentially white
//    residuals: 27 sign runs against 28.5 expected, ac1 = 0.118. It reports
//    1.282. The truth is 1. A clean power-law fit with white residuals is
//    therefore worth nothing as evidence about the asymptotic exponent at
//    these sizes, and the repo's habit of reading exponents off short ladders
//    is not repaired by better diagnostics.
//
// 6. MEASURED. For h2 the data cannot separate the two families at all:
//    AIC -78.8 for c*p^1.847 against -78.9 for c*p*log^2.448 p, a difference
//    of 0.1 on nineteen points. Those two hypotheses differ by a factor of
//    x^0.85 asymptotically. Nineteen terms cannot tell them apart. For G2 on
//    ten terms the spread across all seven models is 15 AIC units with no
//    model showing clean residuals. THE HONEST ANSWER TO "WHAT IS THE
//    EXPONENT" IS THAT THIS DATA DOES NOT DETERMINE IT.
//
// 7. MEASURED. The frozen quadratic is rejected six times more weakly for h2
//    than for the control at matched n and matched range: 12.2 AIC units for
//    h2 on [5,73] against 74.7 for h on the same nineteen primes, and 283.2
//    for h on all 56. Two classes really do look far more quadratic than one.
//
// 8. INFERRED, and it is the reason exponent 2 is still disfavoured. The
//    control's bias is positive in all 40 windows (min 1.197). It arises from
//    a positive power of log inside the truth, and nothing suggests the
//    two-class object carries a negative log power. So the bias is one-sided
//    and the true exponent lies BELOW the raw fit of 1.847, not above it.
//    That argument, not the nominal se of +-0.035, is what excludes 2.
//
// 9. PROVEN (elementary) and VERIFIED at 21 terms. h2 >= h pointwise, because
//    the adversary picking two classes per prime may take the first to be the
//    one-class optimum. Hence exponent(h2) >= exponent(h) = 1 + o(1). This
//    REFUTES the proportional-bias correction, which returns 0.67 to 0.83.
//    Scaling the bias by the ratio of fitted effective log powers overshoots.
//    G2 <= h2 is verified at all 12 shared terms, so an upper bound on h2's
//    exponent transfers to G2.
//
// 10. MEASURED. The structural transfer, which needs no bias at all. Divide
//     each maximum gap by its EXACT mean gap, M1 = p#/phi(p#) ~ e^gamma log p
//     and M2 = p#/prod(q-2) ~ c log^2 p. That removes the entire sieve-
//     dimension difference. The residual cost of the second class,
//     Q = (h2/M2)/(h/M1), has log-log slope 0.329 on [5,73] but only 0.200 on
//     [23,73] and 0.100 on [41,73], and Q itself turns over: 2.487, 2.511,
//     2.473, 2.392, 2.302 at the last five terms. If Q is bounded then h2 and
//     h share an exponent and the margin grows like x/log^3 x. CAUTION: the
//     turnover coincides with three large upward jumps in the denominator h
//     at p = 67, 71 (local exponents 2.33, 3.17), so it is probably numerator-
//     denominator noise, not a real ceiling. Treat this as a hypothesis with
//     nine points of weak support, not a finding.
//
// 11. REFUTED. THE-DIALS section 2's reading that the margin is "drifting
//     toward about 1.7" is a four-row artifact of two separate effects.
//     (i) Index convention: with p_{n+1}^2 the margin trend is -0.084 +- 0.045
//     but with p_n^2 it is +0.154 +- 0.035, because the OLS slope of
//     log p_{n+1} on log p_n is 0.88 rather than 1 on this range. The two
//     agree asymptotically and disagree at n = 19. (ii) The G2 table ends on
//     the x = 37 outlier, whose local exponent is 4.49 against a ladder mean
//     near 2. On nineteen terms of h2, which dominates G2, the margin against
//     p_{n+1}^2 is FLAT at 2.2, slope +0.018 +- 0.045 over [23,73], and its
//     minimum of 1.880 was reached at x = 17 and never revisited. This is the
//     same failure mode as TODO 0b's "flat 1.43 multiplier" scare.
//
// 12. MEASURED. The frame matters and the record mixes frames. U-FRAME 6a's
//     alpha = 1.653 on all 21 terms is the theta frame; the same 21 terms
//     read 1.924 against x. The Zone Postulate threshold p_n^2 is an x-frame
//     quantity. The control's bias also differs by frame, +0.282 against x and
//     +0.220 against theta, so after correction the two frames land at 1.567
//     and 1.493 and the disagreement mostly cancels. But "1.62, comfortably
//     below the critical 2" compares a theta-frame exponent to an x-frame
//     threshold and overstates the comfort.
//
// 13. THE ANSWER, with error bars. Raw x-frame fit on the best data (h2, 19
//     terms): a = 1.847 +- 0.035 nominal. Control-corrected central estimate:
//     a = 1.57, statistical +-0.06 from the control's own window spread,
//     systematic unquantified. Hard floor a >= 1 from reading 9. Practical
//     bracket 1.3 to 1.9. Exponent 2 is disfavoured by reading 8 but not
//     excluded by the data alone. G2 inherits the upper end of this and its
//     own ten-term reading corrects to 1.54.
//
// 14. CONSEQUENCE FOR THE MARGIN. Anchored at x = 73 where the h2 margin
//     against x'^2 is 2.38: at a = 1.847 the margin reaches 10 by x = 10^6 and
//     29 by x = 10^9; at a = 1.567 it reaches 147 and 2930; under the
//     structural x/log^3 x reading, 977 and 2.9e5. All three grow. None is
//     proven. The proven bound remains exponent 4.2665 and the job is still to
//     bring an exponent down, exactly as THE-DIALS' own 2026-08-17 correction
//     says.
//
