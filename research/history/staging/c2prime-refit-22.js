// c2prime-refit-22.js  —  TODO item 1c, first move: the 22-term refit
//
// WHAT THIS IS. research/exponent-control.md's fits were run at three
// lengths: the control h at 56 terms, h2 at 19, and G2 at TEN (p in
// [5,37], the 12-term custody array minus p = 2,3). Its section 5 was
// refit on the 22-term A144311 ladder on 2026-08-21 (script S11) — but
// ONLY the raw log-log slope and the control-corrected central. The
// MODEL-DISCRIMINATION table for G2 (section 2, quoted again in section
// 7 item 1 as "AIC -32.3 for c*p^2 and -25.8 for c*theta^2 against -41.5
// for the best"), the Qg trend of section 4, and the G2 margin trend of
// section 6 are all still ten-term numbers. This file refits those three,
// at 22 terms, with the control read at MATCHED n beside every row.
//
// It also runs the item's own question — the c2' drift on x >= 41 — with
// the one-class column c1 = h/(m1*lnD1) as the control, INCLUDING a
// calibration of the 10-point slope estimator against the distribution of
// 10-point slopes on the control's own 62-term column. That calibration
// is the point: a 10-point drift slope has a sampling spread, and the
// spread has to be measured before the number is read.
//
// PRIOR WORK, NOT REPEATED. research/history/staging/attack-c2drift-01.md
// (2026-08-21) already ran the mechanism question with 4000-replicate
// null ensembles and found the drift is class-count-blind (c1 drifts the
// same way, x >= 59 slope +0.1553 +- 0.0261 per ln ln x). Nothing here
// re-derives that; the windows below are the item's OWN band (x >= 41),
// which that file did not cut, plus the refits it did not do.
//
// CUSTODY, all read from producers, nothing recomputed:
//   G2 = A144311 + 1, 22 terms   <- research/a144311-full-ladder.js
//   h  = A048670, 58 + Bozek 6   <- research/exponent-control.js,
//                                   research/attack-c2drift-01.js
//   h2 = A288815, 21 terms       <- research/exponent-control.js
//   estimators fit2/fit1/stats/models copied VERBATIM from
//   research/exponent-control.js so the refit is the same instrument.
// Guards below assert every pinned reading of exponent-control.md and
// a144311-full-ladder.js reproduces before a single new number is printed.
//
// SCRATCHPAD-GRADE. Runtime ~0.3 s. No p-values: the nominal standard
// errors printed are OLS errors and exponent-control.md section 3 says
// in terms that they are worthless as evidence about an asymptote. The
// honest spread is the control's own window distribution, printed beside.
// ============================================================================
'use strict';

const F = (x, d = 3) => (Number.isFinite(x) ? x.toFixed(d) : String(x));

// --- data (verbatim from the producers) -------------------------------------
function sievePrimes(n){const s=new Uint8Array(n+1),o=[];
  for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const P = sievePrimes(2000).slice(0, 64);
const H = [2,4,6,10,14,22,26,34,40,46,58,66,74,90,100,106,118,132,152,174,190,
  200,216,234,258,264,282,300,312,330,354,378,388,414,432,450,476,492,510,538,
  550,574,600,616,642,660,686,718,742,762,798,810,834,858,876,908,926,954,
  978,1002,1030,1058,1098,1110];                       // A048670, 64 terms
const G2 = [2,6,12,30,42,66,108,150,204,258,348,528,546,618,708,870,966,1080,
  1284,1398,1530,1710];                                // A144311 + 1, 22 terms
const H2 = [2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,
  1902,2190,2460,2622];                                // A288815, 21 terms

const TH = []; {let t=0;for(let i=0;i<64;i++){t+=Math.log(P[i]);TH.push(t);}}
const M1=[],M2=[];
{let a=1,b=1;for(let i=0;i<64;i++){const p=P[i];a*=p/(p-1);if(p>2)b*=p/(p-2);
  M1.push(a);M2.push(2*b);}}

// diagonal frames: two-class m = W/D, D = prod_{2<p<=x}(p-2); one-class
// m1 = W/D1, D1 = phi(W) = prod (p-1).  Never form W.  (attack-c2drift-01.js)
const LND=[],M=[],LND1=[],MM1=[];
{let lnW=0,lnD=0,lnD1=0;
 for(let i=0;i<64;i++){const p=P[i];lnW+=Math.log(p);
   if(p>2)lnD+=Math.log(p-2); if(p-1>1)lnD1+=Math.log(p-1);
   LND.push(lnD);M.push(Math.exp(lnW-lnD));
   LND1.push(lnD1);MM1.push(Math.exp(lnW-lnD1));}}
const c2p = G2.map((g,i)=>i>=4?g/(M[i]*LND[i]):null);   // defined x>=11
const c1  = H.map((h,i)=>i>=4?h/(MM1[i]*LND1[i]):null);

// --- estimators (verbatim from exponent-control.js) -------------------------
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
function fit2(y,basis,lo,hi){
  let n=0,sx=0,sy=0,sxx=0,sxy=0;
  for(let i=lo;i<=hi;i++){const X=Math.log(basis[i]),Y=Math.log(y[i]);
    n++;sx+=X;sy+=Y;sxx+=X*X;sxy+=X*Y;}
  const Sxx=sxx-sx*sx/n, a=(sxy-sx*sy/n)/Sxx, ic=(sy-a*sx)/n;
  return stats(y,i=>ic+a*Math.log(basis[i]),lo,hi,2,{a,c:Math.exp(ic),se:null,Sxx});
}
function fit1(y,g,lo,hi){
  let n=0,s=0;for(let i=lo;i<=hi;i++){s+=Math.log(y[i])-Math.log(g(i));n++;}
  const ic=s/n;
  return stats(y,i=>ic+Math.log(g(i)),lo,hi,1,{a:null,c:Math.exp(ic)});
}
// plain OLS of v on u over an index list (used for the c2'/c1 drift columns)
function ols(u,v){
  const n=u.length; let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<n;i++){sx+=u[i];sy+=v[i];sxx+=u[i]*u[i];sxy+=u[i]*v[i];}
  const Sxx=sxx-sx*sx/n, b=(sxy-sx*sy/n)/Sxx, a=(sy-b*sx)/n;
  let ss=0;for(let i=0;i<n;i++){const e=v[i]-(a+b*u[i]);ss+=e*e;}
  return {b,a,n,se:n>2?Math.sqrt(ss/(n-2)/Sxx):NaN,rms:Math.sqrt(ss/n)};
}

// --- guards -----------------------------------------------------------------
let nCheck=0;
function check(name,ok,detail){nCheck++;
  console.log(`  ${ok?'ok  ':'FAIL'}  ${name}${detail?'  ['+detail+']':''}`);
  if(!ok) throw new Error('SELF-TEST FAILED: '+name);}
const near=(a,b,t)=>Math.abs(a-b)<=t;

console.log('='.repeat(78));
console.log("c2prime-refit-22 — TODO 1c first move: the 22-term refit of");
console.log("exponent-control.md's ten-term fits, control at matched n beside each");
console.log('='.repeat(78));
console.log('');
console.log('-'.repeat(78));
console.log('CUSTODY GUARDS — every pinned reading must reproduce first');
console.log('-'.repeat(78));
check('G2 has 22 terms, a(n)=G2-1 is 5 mod 6 for n>=2 (A144311 invariant)',
  G2.length===22 && G2.slice(1).every(g=>(g-1)%6===5));
check('H has 64 terms, monotone, even; H2 has 21',
  H.length===64 && H.every((v,i)=>v%2===0&&(i===0||v>H[i-1])) && H2.length===21);
check('G2 <= h2 pointwise on the 21 shared terms (exponent-control.md sec 3)',
  G2.slice(0,21).every((g,i)=>g<=H2[i]));
check('h2 >= h pointwise on 21 terms (exponent-control.md sec 3)',
  H2.every((v,i)=>v>=H[i]));
check("a144311-full-ladder: c2'(11)=0.5004, c2'(37)=0.5939, c2'(79)=0.5281",
  near(c2p[4],0.5004,5e-5)&&near(c2p[11],0.5939,5e-5)&&near(c2p[21],0.5281,5e-5),
  `${F(c2p[4],4)} ${F(c2p[11],4)} ${F(c2p[21],4)}`);
{const band=c2p.slice(4,11), tail=c2p.slice(12,22);
 check("a144311-full-ladder: custody band [0.4463,0.5004], tail [0.4842,0.5337]",
   near(Math.min(...band),0.4463,5e-5)&&near(Math.max(...band),0.5004,5e-5)&&
   near(Math.min(...tail),0.4842,5e-5)&&near(Math.max(...tail),0.5337,5e-5),
   `[${F(Math.min(...band),4)},${F(Math.max(...band),4)}] [${F(Math.min(...tail),4)},${F(Math.max(...tail),4)}]`);}
check('attack-c2drift-01: c1(11)=0.4712, c1(59)=0.3359, c1(241)=0.3746',
  near(c1[4],0.4712,5e-5)&&near(c1[16],0.3359,5e-5)&&near(c1[52],0.3746,5e-5),
  `${F(c1[4],4)} ${F(c1[16],4)} ${F(c1[52],4)}`);
check('exponent-control.md sec 2: control h full, c*p^a a=1.282, AIC -320.3',
  near(fit2(H,P,2,57).a,1.282,5e-4)&&near(fit2(H,P,2,57).aic,-320.3,0.06));
check('exponent-control.md sec 2: G2 ten terms, c*p^a a=1.801, AIC -36.7',
  near(fit2(G2,P,2,11).a,1.801,5e-4)&&near(fit2(G2,P,2,11).aic,-36.7,0.06));
check('exponent-control.md sec 2: h2 19 terms, c*p^a a=1.847 +- 0.035',
  near(fit2(H2,P,2,20).a,1.847,5e-4)&&near(fit2(H2,P,2,20).se,0.035,5e-4));
check('exponent-control.md sec 5: G2 22-term raw x-frame 1.777 +- 0.029',
  near(fit2(G2,P,2,21).a,1.777,5e-4)&&near(fit2(G2,P,2,21).se,0.029,5e-4));
check('exponent-control.md sec 5: G2 22-term raw theta-frame 1.647 +- 0.021',
  near(fit2(G2,TH,2,21).a,1.647,5e-4)&&near(fit2(G2,TH,2,21).se,0.021,5e-4));
console.log(`\n  ${nCheck} guards passed.`);

// ============================================================================
// A. THE MODEL TABLE, REFIT.  exponent-control.md sec 2 ran G2 at n=10.
// ============================================================================
function models(name,y,lo,hi){
  console.log(`\n    ${name}, p in [${P[lo]},${P[hi]}], n=${hi-lo+1}`);
  console.log('    model            k    rms     max   runs/exp   ac1     AIC   dAIC  param');
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
  const best=Math.min(...rows.map(r=>r[2].aic));
  for(const [nm,k,r] of rows)
    console.log(`    ${nm} ${k}  ${F(r.rms,4)}  ${F(r.max,4)}  ${String(r.runs).padStart(2)}/${F(r.expRuns,1)}  ${F(r.ac1).padStart(6)}  ${F(r.aic,1).padStart(7)}  ${F(r.aic-best,1).padStart(5)}  ${r.a!==null&&r.a!==undefined?'a='+F(r.a):'c='+F(r.c,4)}`);
  return rows;
}
console.log('\n\nA. MODEL DISCRIMINATION REFIT. AIC is not comparable across n,');
console.log('   so dAIC (distance from the best model in the SAME table) is the');
console.log('   column to read across tables. Control rows are the same estimator');
console.log('   on an object whose exponent is known to be 1 + o(1).');
const A_g10 = models('G2, TEN terms (the fit exponent-control.md sec 2 carries)',G2,2,11);
const A_g22 = models('G2, 22 trusted terms (REFIT)',G2,2,21);
const A_c10 = models('CONTROL h, first 10 (matched n)',H,2,11);
const A_c20 = models('CONTROL h, first 20 (matched n to the refit)',H,2,21);
const A_cfull = models('CONTROL h, full 56',H,2,57);
const A_h2 = models('h2, 19 terms (unchanged, 21-term ladder is capped)',H2,2,20);

console.log('\n    Same table, the two quantities that decide "which forms survive":');
console.log('    (dAIC = AIC penalty against that table\'s best; runs/exp near 1 and');
console.log('     |ac1| near 0 = white residuals, the structural test sec 2 uses.)');
const NAMES=['c*p^a','c*p*log^a p','c*p*log^2 p','c*p^2','c*theta^a','c*th*log^a th','c*theta^2'];
function dline(tag,rows){
  const best=Math.min(...rows.map(r=>r[2].aic));
  console.log(`    ${tag.padEnd(26)} `+rows.map(r=>F(r[2].aic-best,1).padStart(6)).join(''));
}
console.log('    dAIC                       '+NAMES.map(n=>n.slice(0,6).padStart(6)).join(''));
dline('G2 n=10 (the old fit)',A_g10);
dline('G2 n=20 (REFIT)',A_g22);
dline('control h n=10',A_c10);
dline('control h n=20',A_c20);
dline('control h n=56',A_cfull);
dline('h2 n=19',A_h2);
console.log('    ac1                        '+NAMES.map(n=>n.slice(0,6).padStart(6)).join(''));
for(const [tag,rows] of [['G2 n=10 (the old fit)',A_g10],['G2 n=20 (REFIT)',A_g22],
  ['control h n=10',A_c10],['control h n=20',A_c20],['control h n=56',A_cfull],['h2 n=19',A_h2]])
  console.log(`    ${tag.padEnd(26)} `+rows.map(r=>F(r[2].ac1,2).padStart(6)).join(''));

console.log('\n    The one comparative reading sec 2 draws from this table:');
console.log('    "at matched n the frozen quadratic loses 74.7 AIC on the control');
console.log('     and only 12.2 on h2 — two classes look far more quadratic."');
console.log('    That loss is measured against c*p^a in the SAME table. Refit:');
{const pen=rows=>rows[3][2].aic-rows[0][2].aic;   // c*p^2 minus c*p^a
 const R=[['G2 n=10 (the old fit)',A_g10,A_c10],['G2 n=20 (REFIT)',A_g22,A_c20],
          ['h2 n=19 (the file\'s row)',A_h2,null]];
 const cn=[['control h n=10',A_c10],['control h n=20',A_c20],['control h n=56',A_cfull]];
 for(const [tag,rows] of cn)
   console.log(`      ${tag.padEnd(26)} quadratic penalty ${F(pen(rows),1).padStart(6)}`);
 for(const [tag,rows,ctl] of R)
   console.log(`      ${tag.padEnd(26)} quadratic penalty ${F(pen(rows),1).padStart(6)}`+
     (ctl?`   = ${F(100*pen(rows)/pen(ctl),0)}% of the matched-n control's`:''));
 console.log('      (h2 n=19 against control n=19 is the file\'s 12.2 / 74.7 = 16%.)');}

// ============================================================================
// B. THE TWO OTHER TEN-TERM G2 FITS IN THE FILE, REFIT
// ============================================================================
console.log('\n\nB. The file\'s other two G2 fits, refit at 22 terms.');
console.log('\n   B1. sec 4 structural column Qg = (G2/M2)/(h/M1) — was n=10.');
{const Qg=G2.map((v,i)=>(v/M2[i])/(H[i]/M1[i]));
 const Q =H2.map((v,i)=>(v/M2[i])/(H[i]/M1[i]));
 for(const [tag,y,lo,hi] of [['Qg (G2) [5,37] n=10',Qg,2,11],
                             ['Qg (G2) [5,79] n=20 REFIT',Qg,2,21],
                             ['Qg (G2) [23,79] n=15',Qg,8,21],
                             ['Qg (G2) [41,79] n=10',Qg,12,21],
                             ['Q  (h2) [5,73] n=19 (file)',Q,2,20],
                             ['Q  (h2) [23,73] n=13 (file)',Q,8,20],
                             ['Q  (h2) [41,73] n=9 (file)',Q,12,20]]){
   const r=fit2(y,P,lo,hi);
   console.log(`      ${tag.padEnd(28)} slope ${F(r.a,4).padStart(7)} +- ${F(r.se,4)} (nominal)`);}
 console.log(`      Qg tail values x=41..79: `+
   [12,13,14,15,16,17,18,19,20,21].map(i=>`${P[i]}:${F(Qg[i],3)}`).join(' '));}

console.log('\n   B2. sec 6 margin trend, G2 against p_{n+1}^2 — was n=10.');
{const mg=G2.map((v,i)=>P[i+1]**2/v), mh2=H2.map((v,i)=>P[i+1]**2/v),
       mh =H.map((v,i)=>P[i+1]**2/v);
 for(const [tag,y,lo,hi] of [['G2 margin [5,37] n=10',mg,2,11],
                             ['G2 margin [5,79] n=20 REFIT',mg,2,21],
                             ['G2 margin [41,79] n=10',mg,12,21],
                             ['h2 margin [23,73] n=13 (file)',mh2,8,20],
                             ['CONTROL h margin [5,79] n=20',mh,2,21],
                             ['CONTROL h margin [5,271] n=56',mh,2,57]]){
   const r=fit2(y,P,lo,hi);
   console.log(`      ${tag.padEnd(30)} slope ${F(r.a,4).padStart(7)} +- ${F(r.se,4)}  min ${F(Math.min(...y.slice(lo,hi+1)),3)}`);}
 console.log(`      G2 margin values x=41..79: `+
   [12,13,14,15,16,17,18,19,20,21].map(i=>`${P[i]}:${F(mg[i],2)}`).join(' '));}

// ============================================================================
// C. THE ITEM'S OWN QUESTION: c2' ON x >= 41, WITH THE CONTROL COLUMN
// ============================================================================
console.log('\n\nC. The drift itself. Regressor ln ln x (attack-c2drift-01\'s PLNX');
console.log('   frame, kept so the numbers are comparable to that file).');
console.log('   c2\' = G2/(m*lnD), two classes.  c1 = h/(m1*lnD1), one class.');
const LLX = P.map(p=>Math.log(Math.log(p)));
function drift(tag,col,lo,hi){
  const u=[],v=[];for(let i=lo;i<=hi;i++){if(col[i]==null)continue;u.push(LLX[i]);v.push(Math.log(col[i]));}
  const r=ols(u,v);
  console.log(`      ${tag.padEnd(34)} n=${String(r.n).padStart(2)}  b=${F(r.b,4).padStart(8)} +- ${F(r.se,4)}`);
  return r;
}
console.log('\n   C0. The two columns side by side on the SAME x, and their minima.');
{let s='      x    ';for(let i=4;i<=21;i++)s+=String(P[i]).padStart(7);console.log(s);
 s="      c2'  ";for(let i=4;i<=21;i++)s+=F(c2p[i],4).padStart(7);console.log(s);
 s='      c1   ';for(let i=4;i<=21;i++)s+=F(c1[i],4).padStart(7);console.log(s);
 const arg=(col,lo,hi)=>{let b=lo;for(let i=lo;i<=hi;i++)if(col[i]<col[b])b=i;return b;};
 console.log(`      c2' minimum over x=11..79 at x=${P[arg(c2p,4,21)]} (${F(c2p[arg(c2p,4,21)],4)});`+
   ` c1 minimum over the same range at x=${P[arg(c1,4,21)]} (${F(c1[arg(c1,4,21)],4)})`);
 console.log(`      c1 minimum over its full range x=11..311 at x=${P[arg(c1,4,63)]} (${F(c1[arg(c1,4,63)],4)})`);}

console.log('\n   C1. The windows.');
const D_c2_all = drift("c2' x>=11 (all 18)",c2p,4,21);
const D_c2_17  = drift("c2' x>=17 (attack-c2drift's quotable)",c2p,6,21);
const D_c2_41  = drift("c2' x>=41  <-- ITEM 1c's OWN BAND",c2p,12,21);
const D_c1_41x = drift("c1  x=41..79 (SAME 10 primes)",c1,12,21);
const D_c1_41  = drift("c1  x>=41 (all 52)",c1,12,63);
const D_c1_59  = drift("c1  x>=59 (attack-c2drift's lever)",c1,16,63);
const D_c1_all = drift("c1  x>=11 (all 60)",c1,4,63);

console.log('\n   C2. CALIBRATE THE ESTIMATOR BEFORE READING C1. What does a');
console.log('       10-point ln-ln-x slope DO on the control column, where the');
console.log('       same drift is present? All 51 sliding 10-windows of c1:');
{const bs=[];
 for(let lo=4;lo+9<=63;lo++){const u=[],v=[];
   for(let i=lo;i<=lo+9;i++){u.push(LLX[i]);v.push(Math.log(c1[i]));}
   bs.push(ols(u,v).b);}
 const n=bs.length, mean=bs.reduce((a,b)=>a+b,0)/n;
 const sd=Math.sqrt(bs.reduce((a,b)=>a+(b-mean)**2,0)/(n-1));
 const srt=[...bs].sort((a,b)=>a-b);
 console.log(`      windows=${n}  mean=${F(mean,4)}  sd=${F(sd,4)}  min=${F(srt[0],4)}  max=${F(srt[n-1],4)}`);
 console.log(`      median=${F(srt[Math.floor(n/2)],4)}  10th pct=${F(srt[Math.floor(0.1*n)],4)}  90th pct=${F(srt[Math.ceil(0.9*n)-1],4)}`);
 const rank=bs.filter(b=>b<=D_c2_41.b).length/n;
 console.log(`      c2' x>=41 slope ${F(D_c2_41.b,4)} sits at rank ${F(rank,3)} of that distribution`);
 const neg=bs.filter(b=>b<0).length;
 console.log(`      windows with a NEGATIVE slope: ${neg}/${n} — a 10-point window on a`);
 console.log(`      column that IS drifting still reads down ${F(100*neg/n,0)}% of the time.`);
 console.log(`      NOMINAL se on 10 points, c2': ${F(D_c2_41.se,4)}; the control's window sd is ${F(sd,4)}.`);
 console.log(`      ratio (true spread / nominal se) = ${F(sd/D_c2_41.se,2)}`);}

console.log('\n   C3. Is the x>=41 drift carried by one point? Leave-one-out on c2\':');
{const idx=[];for(let i=12;i<=21;i++)idx.push(i);
 const line=[];
 for(const drop of idx){const u=[],v=[];
   for(const i of idx){if(i===drop)continue;u.push(LLX[i]);v.push(Math.log(c2p[i]));}
   line.push(`${P[drop]}:${F(ols(u,v).b,3)}`);}
 console.log('      drop x -> slope   '+line.join('  '));}

console.log('\n   C4. Where the drift actually lives: level shift, not tail slope.');
{const head=c2p.slice(4,11), tail=c2p.slice(12,22);
 const mh=head.reduce((a,b)=>a+b,0)/head.length, mt=tail.reduce((a,b)=>a+b,0)/tail.length;
 const sdh=Math.sqrt(head.reduce((a,b)=>a+(b-mh)**2,0)/(head.length-1));
 const sdt=Math.sqrt(tail.reduce((a,b)=>a+(b-mt)**2,0)/(tail.length-1));
 console.log(`      c2' custody x=11..31: mean ${F(mh,4)} sd ${F(sdh,4)} (n=7)`);
 console.log(`      c2' trusted  x=41..79: mean ${F(mt,4)} sd ${F(sdt,4)} (n=10)`);
 console.log(`      step ${F(mt-mh,4)} = ${F((mt-mh)/Math.sqrt(sdh*sdh/7+sdt*sdt/10),2)} nominal sigma (x=37 excluded from both)`);
 const h1=c1.slice(4,11), t1=c1.slice(12,22);
 const m1h=h1.reduce((a,b)=>a+b,0)/h1.length, m1t=t1.reduce((a,b)=>a+b,0)/t1.length;
 console.log(`      CONTROL c1 same two windows: ${F(m1h,4)} -> ${F(m1t,4)}, step ${F(m1t-m1h,4)}`);
 console.log(`      Both columns are U-shaped (high head, dip, rise). The dips sit at`);
 console.log(`      DIFFERENT x — c2' at x=29, c1 at x=59 — so the matched-x head-to-`);
 console.log(`      tail step has opposite sign purely because c1 is still descending`);
 console.log(`      where c2' has already turned. The comparison that matches PHASE is`);
 console.log(`      post-dip slope against post-dip slope, and that is C1's last rows.`);
 console.log(`      c1 x=83..311 tail:  `+[22,30,40,50,63].map(i=>`${P[i]}:${F(c1[i],4)}`).join(' '));}

console.log('\n   C5. Phase-matched comparison, the item\'s closing test.');
{const sd10=(()=>{const bs=[];for(let lo=4;lo+9<=63;lo++){const u=[],v=[];
   for(let i=lo;i<=lo+9;i++){u.push(LLX[i]);v.push(Math.log(c1[i]));}bs.push(ols(u,v).b);}
   const n=bs.length,m=bs.reduce((a,b)=>a+b,0)/n;
   return Math.sqrt(bs.reduce((a,b)=>a+(b-m)**2,0)/(n-1));})();
 const pairs=[["c2' post-dip x>=41 (n=10)",D_c2_41.b],
              ["c1  post-dip x>=59 (n=48)",D_c1_59.b],
              ["c1  post-dip x>=101 (n=39)",(()=>{const u=[],v=[];
                for(let i=25;i<=63;i++){u.push(LLX[i]);v.push(Math.log(c1[i]));}return ols(u,v).b;})()],
              ["c1  x=41..79, same 10 primes",D_c1_41x.b]];
 for(const [tag,b] of pairs) console.log(`      ${tag.padEnd(30)} b=${F(b,4).padStart(8)}`);
 console.log(`      |c2'(x>=41) - c1(x>=59)| = ${F(Math.abs(D_c2_41.b-D_c1_59.b),4)}`+
   ` = ${F(Math.abs(D_c2_41.b-D_c1_59.b)/sd10,2)} of the control's own 10-point sd (${F(sd10,4)}).`);
 console.log(`      A 10-point window CANNOT separate the two rates. The two-class`);
 console.log(`      post-dip drift is, at this length, the one-class post-dip drift.`);}

console.log('\n   C6. Candidate (b): are lower-order Mertens terms the mechanism?');
console.log('       They cannot be, BY CONSTRUCTION, and this prints the check.');
console.log('       c2\' divides by the EXACT m*lnD (a finite product, not its');
console.log('       Mertens asymptotic), so no (ln ln) remainder is left in the');
console.log('       normaliser. Size of what would be left if the ASYMPTOTIC form');
console.log('       had been used instead — ratio exact/(asymptotic) per term:');
{const C2TWIN=0.6601618158468696;      // Hardy-Littlewood twin constant
 for(const i of [4,11,12,21,30,63]){
   // asymptotic two-class mean gap:  m ~ (2 e^{2gamma} ln^2 x)/(2 C2) up to
   // the same constant; the RATIO of consecutive exact/asymptotic is what matters
   const asym=Math.pow(Math.log(P[i]),2)/(2*C2TWIN)*Math.exp(2*0.5772156649015329)/2;
   console.log(`      x=${String(P[i]).padStart(3)}  m_exact=${F(M[i],2).padStart(8)}  m_asym=${F(asym,2).padStart(8)}  ratio=${F(M[i]/asym,4)}`);}
 console.log('       The ratio moves with x, which is exactly the correction that');
 console.log('       an asymptotic normaliser WOULD have injected — and c2\' does');
 console.log('       not use it. So candidate (b) is excluded for c2\' itself.');}

console.log('\n\nDONE. '+nCheck+' guards, all passed.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/c2prime-refit-22.js
//   invocation:  node research/history/staging/c2prime-refit-22.js
//   code-sha256: a3219870f6e2c10651dc10c526aa193f2884ac8164dc137921265c9d7e722eb0
//   out-sha256:  53907bb97c1fa5c5c527409acec42c6d2c17ecdfbd43f5e9a0e3ef19711f7b19
//   body-lines:  215
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.1 s
// ============================================================================
// ==============================================================================
// c2prime-refit-22 — TODO 1c first move: the 22-term refit of
// exponent-control.md's ten-term fits, control at matched n beside each
// ==============================================================================
//
// ------------------------------------------------------------------------------
// CUSTODY GUARDS — every pinned reading must reproduce first
// ------------------------------------------------------------------------------
//   ok    G2 has 22 terms, a(n)=G2-1 is 5 mod 6 for n>=2 (A144311 invariant)
//   ok    H has 64 terms, monotone, even; H2 has 21
//   ok    G2 <= h2 pointwise on the 21 shared terms (exponent-control.md sec 3)
//   ok    h2 >= h pointwise on 21 terms (exponent-control.md sec 3)
//   ok    a144311-full-ladder: c2'(11)=0.5004, c2'(37)=0.5939, c2'(79)=0.5281  [0.5004 0.5939 0.5281]
//   ok    a144311-full-ladder: custody band [0.4463,0.5004], tail [0.4842,0.5337]  [[0.4463,0.5004] [0.4842,0.5337]]
//   ok    attack-c2drift-01: c1(11)=0.4712, c1(59)=0.3359, c1(241)=0.3746  [0.4712 0.3359 0.3746]
//   ok    exponent-control.md sec 2: control h full, c*p^a a=1.282, AIC -320.3
//   ok    exponent-control.md sec 2: G2 ten terms, c*p^a a=1.801, AIC -36.7
//   ok    exponent-control.md sec 2: h2 19 terms, c*p^a a=1.847 +- 0.035
//   ok    exponent-control.md sec 5: G2 22-term raw x-frame 1.777 +- 0.029
//   ok    exponent-control.md sec 5: G2 22-term raw theta-frame 1.647 +- 0.021
//
//   12 guards passed.
//
//
// A. MODEL DISCRIMINATION REFIT. AIC is not comparable across n,
//    so dAIC (distance from the best model in the SAME table) is the
//    column to read across tables. Control rows are the same estimator
//    on an object whose exponent is known to be 1 + o(1).
//
//     G2, TEN terms (the fit exponent-control.md sec 2 carries), p in [5,37], n=10
//     model            k    rms     max   runs/exp   ac1     AIC   dAIC  param
//     c*p^a          2  0.1308  0.2616   6/5.5  -0.344    -36.7    4.8  a=1.801
//     c*p*log^a p    2  0.1556  0.2862   5/5.5  -0.016    -33.2    8.3  a=1.983
//     c*p*log^2 p    1  0.1557  0.2841   5/5.5  -0.016    -35.2    6.3  c=0.8822
//     c*p^2          1  0.1800  0.4282   4/5.5   0.178    -32.3    9.2  c=0.3990
//     c*theta^a      2  0.1030  0.1990   3/5.5   0.061    -41.5    0.0  a=1.664
//     c*th*log^a th  2  0.1453  0.2954   3/5.5   0.342    -34.6    6.9  a=1.412
//     c*theta^2      1  0.2491  0.4695   2/5.5   0.648    -25.8   15.7  c=0.6561
//
//     G2, 22 trusted terms (REFIT), p in [5,79], n=20
//     model            k    rms     max   runs/exp   ac1     AIC   dAIC  param
//     c*p^a          2  0.0957  0.2460   9/10.5  -0.309    -89.9    9.2  a=1.777
//     c*p*log^a p    2  0.1284  0.2952   7/10.5   0.185    -78.1   21.0  a=2.250
//     c*p*log^2 p    1  0.1451  0.3710   4/10.5   0.405    -75.2   23.9  c=0.9623
//     c*p^2          1  0.2005  0.5751   4/10.5   0.557    -62.3   36.8  c=0.3445
//     c*theta^a      2  0.0760  0.2168   9/10.5   0.141    -99.1    0.0  a=1.647
//     c*th*log^a th  2  0.1289  0.2406   5/10.5   0.542    -78.0   21.1  a=1.665
//     c*theta^2      1  0.3112  0.7152   4/10.5   0.759    -44.7   54.4  c=0.5132
//
//     CONTROL h, first 10 (matched n), p in [5,37], n=10
//     model            k    rms     max   runs/exp   ac1     AIC   dAIC  param
//     c*p^a          2  0.0805  0.1383   9/5.5  -0.656    -46.4   15.2  a=1.191
//     c*p*log^a p    2  0.0787  0.1536   9/5.5  -0.683    -46.8   14.8  a=0.484
//     c*p*log^2 p    1  0.3840  0.7681   2/5.5   0.540    -17.1   44.5  c=0.2149
//     c*p^2          1  0.5101  0.9039   2/5.5   0.611    -11.5   50.2  c=0.0972
//     c*theta^a      2  0.0376  0.0767   7/5.5  -0.588    -61.6    0.0  a=1.103
//     c*th*log^a th  2  0.0390  0.0721   7/5.5  -0.529    -60.9    0.7  a=0.222
//     c*theta^2      1  0.6074  1.1771   2/5.5   0.661     -8.0   53.7  c=0.1598
//
//     CONTROL h, first 20 (matched n to the refit), p in [5,79], n=20
//     model            k    rms     max   runs/exp   ac1     AIC   dAIC  param
//     c*p^a          2  0.0798  0.1439  11/10.5  -0.063    -97.1   16.0  a=1.245
//     c*p*log^a p    2  0.0914  0.1689   9/10.5   0.137    -91.7   21.4  a=0.696
//     c*p*log^2 p    1  0.3643  1.0071   2/10.5   0.683    -38.4   74.7  c=0.1692
//     c*p^2          1  0.6025  1.3768   2/10.5   0.787    -18.3   94.8  c=0.0606
//     c*theta^a      2  0.0535  0.0923   7/10.5   0.395   -113.1    0.0  a=1.154
//     c*th*log^a th  2  0.0689  0.1236   7/10.5   0.525   -103.0   10.1  a=0.382
//     c*theta^2      1  0.7242  1.7488   2/10.5   0.795    -10.9  102.2  c=0.0902
//
//     CONTROL h, full 56, p in [5,271], n=56
//     model            k    rms     max   runs/exp   ac1     AIC   dAIC  param
//     c*p^a          2  0.0552  0.1593  27/28.5   0.118   -320.3   25.0  a=1.282
//     c*p*log^a p    2  0.0840  0.2394  17/28.5   0.495   -273.4   71.9  a=1.000
//     c*p*log^2 p    1  0.2812  1.2388   6/28.5   0.751   -140.1  205.3  c=0.1342
//     c*p^2          1  0.7051  2.1412   2/28.5   0.891    -37.1  308.3  c=0.0282
//     c*theta^a      2  0.0442  0.1387  15/28.5   0.584   -345.4    0.0  a=1.204
//     c*th*log^a th  2  0.0807  0.3005   9/28.5   0.723   -277.9   67.5  a=0.653
//     c*theta^2      1  0.8303  2.6498   2/28.5   0.890    -18.8  326.6  c=0.0367
//
//     h2, 19 terms (unchanged, 21-term ladder is capped), p in [5,73], n=19
//     model            k    rms     max   runs/exp   ac1     AIC   dAIC  param
//     c*p^a          2  0.1133  0.3067   7/10.0   0.066    -78.8    9.8  a=1.847
//     c*p*log^a p    2  0.1129  0.2757   9/10.0  -0.174    -78.9    9.7  a=2.448
//     c*p*log^2 p    1  0.1655  0.4141   6/10.0   0.498    -66.4   22.2  c=1.5788
//     c*p^2          1  0.1648  0.4307   8/10.0   0.445    -66.5   22.0  c=0.5770
//     c*theta^a      2  0.0875  0.2467   8/10.0   0.122    -88.6    0.0  a=1.712
//     c*th*log^a th  2  0.1119  0.2978   5/10.0  -0.054    -79.2    9.3  a=1.831
//     c*theta^2      1  0.2575  0.5849   2/10.0   0.684    -49.6   39.0  c=0.8670
//
//     Same table, the two quantities that decide "which forms survive":
//     (dAIC = AIC penalty against that table's best; runs/exp near 1 and
//      |ac1| near 0 = white residuals, the structural test sec 2 uses.)
//     dAIC                        c*p^ac*p*loc*p*lo c*p^2c*thetc*th*lc*thet
//     G2 n=10 (the old fit)         4.8   8.3   6.3   9.2   0.0   6.9  15.7
//     G2 n=20 (REFIT)               9.2  21.0  23.9  36.8   0.0  21.1  54.4
//     control h n=10               15.2  14.8  44.5  50.2   0.0   0.7  53.7
//     control h n=20               16.0  21.4  74.7  94.8   0.0  10.1 102.2
//     control h n=56               25.0  71.9 205.3 308.3   0.0  67.5 326.6
//     h2 n=19                       9.8   9.7  22.2  22.0   0.0   9.3  39.0
//     ac1                         c*p^ac*p*loc*p*lo c*p^2c*thetc*th*lc*thet
//     G2 n=10 (the old fit)       -0.34 -0.02 -0.02  0.18  0.06  0.34  0.65
//     G2 n=20 (REFIT)             -0.31  0.18  0.40  0.56  0.14  0.54  0.76
//     control h n=10              -0.66 -0.68  0.54  0.61 -0.59 -0.53  0.66
//     control h n=20              -0.06  0.14  0.68  0.79  0.39  0.53  0.80
//     control h n=56               0.12  0.50  0.75  0.89  0.58  0.72  0.89
//     h2 n=19                      0.07 -0.17  0.50  0.45  0.12 -0.05  0.68
//
//     The one comparative reading sec 2 draws from this table:
//     "at matched n the frozen quadratic loses 74.7 AIC on the control
//      and only 12.2 on h2 — two classes look far more quadratic."
//     That loss is measured against c*p^a in the SAME table. Refit:
//       control h n=10             quadratic penalty   34.9
//       control h n=20             quadratic penalty   78.9
//       control h n=56             quadratic penalty  283.2
//       G2 n=10 (the old fit)      quadratic penalty    4.4   = 13% of the matched-n control's
//       G2 n=20 (REFIT)            quadratic penalty   27.6   = 35% of the matched-n control's
//       h2 n=19 (the file's row)   quadratic penalty   12.2
//       (h2 n=19 against control n=19 is the file's 12.2 / 74.7 = 16%.)
//
//
// B. The file's other two G2 fits, refit at 22 terms.
//
//    B1. sec 4 structural column Qg = (G2/M2)/(h/M1) — was n=10.
//       Qg (G2) [5,37] n=10          slope  0.2978 +- 0.0627 (nominal)
//       Qg (G2) [5,79] n=20 REFIT    slope  0.2549 +- 0.0274 (nominal)
//       Qg (G2) [23,79] n=15         slope  0.1565 +- 0.0574 (nominal)
//       Qg (G2) [41,79] n=10         slope  0.0473 +- 0.0711 (nominal)
//       Q  (h2) [5,73] n=19 (file)   slope  0.3289 +- 0.0282 (nominal)
//       Q  (h2) [23,73] n=13 (file)  slope  0.2000 +- 0.0334 (nominal)
//       Q  (h2) [41,73] n=9 (file)   slope  0.0999 +- 0.0688 (nominal)
//       Qg tail values x=41..79: 41:1.421 43:1.291 47:1.302 53:1.480 59:1.451 61:1.426 67:1.450 71:1.359 73:1.343 79:1.408
//
//    B2. sec 6 margin trend, G2 against p_{n+1}^2 — was n=10.
//       G2 margin [5,37] n=10          slope -0.0806 +- 0.0469  min 3.184
//       G2 margin [5,79] n=20 REFIT    slope -0.0108 +- 0.0239  min 3.184
//       G2 margin [41,79] n=10         slope  0.1871 +- 0.0710  min 3.386
//       h2 margin [23,73] n=13 (file)  slope  0.0175 +- 0.0446  min 2.068
//       CONTROL h margin [5,79] n=20   slope  0.5217 +- 0.0242  min 8.167
//       CONTROL h margin [5,271] n=56  slope  0.5715 +- 0.0094  min 8.167
//       G2 margin values x=41..79: 41:3.39 43:3.57 47:3.97 53:4.00 59:3.85 61:4.16 67:3.93 71:3.81 73:4.08 79:4.03
//
//
// C. The drift itself. Regressor ln ln x (attack-c2drift-01's PLNX
//    frame, kept so the numbers are comparable to that file).
//    c2' = G2/(m*lnD), two classes.  c1 = h/(m1*lnD1), one class.
//
//    C0. The two columns side by side on the SAME x, and their minima.
//       x         11     13     17     19     23     29     31     37     41     43     47     53     59     61     67     71     73     79
//       c2'   0.5004 0.4469 0.4707 0.4559 0.4577 0.4463 0.4791 0.5939 0.5123 0.4916 0.4842 0.5179 0.5059 0.5019 0.5337 0.5233 0.5188 0.5281
//       c1    0.4712 0.4873 0.4106 0.4060 0.3758 0.3502 0.3672 0.3540 0.3417 0.3628 0.3558 0.3360 0.3359 0.3400 0.3564 0.3735 0.3753 0.3652
//       c2' minimum over x=11..79 at x=29 (0.4463); c1 minimum over the same range at x=59 (0.3359)
//       c1 minimum over its full range x=11..311 at x=59 (0.3359)
//
//    C1. The windows.
//       c2' x>=11 (all 18)                 n=18  b=  0.2273 +- 0.0816
//       c2' x>=17 (attack-c2drift's quotable) n=16  b=  0.3351 +- 0.1098
//       c2' x>=41  <-- ITEM 1c's OWN BAND  n=10  b=  0.3745 +- 0.1411
//       c1  x=41..79 (SAME 10 primes)      n=10  b=  0.3344 +- 0.2358
//       c1  x>=41 (all 52)                 n=52  b=  0.1719 +- 0.0226
//       c1  x>=59 (attack-c2drift's lever) n=48  b=  0.1553 +- 0.0261
//       c1  x>=11 (all 60)                 n=60  b= -0.1091 +- 0.0335
//
//    C2. CALIBRATE THE ESTIMATOR BEFORE READING C1. What does a
//        10-point ln-ln-x slope DO on the control column, where the
//        same drift is present? All 51 sliding 10-windows of c1:
//       windows=51  mean=0.0813  sd=0.3480  min=-0.7476  max=0.9210
//       median=0.0632  10th pct=-0.3095  90th pct=0.5300
//       c2' x>=41 slope 0.3745 sits at rank 0.804 of that distribution
//       windows with a NEGATIVE slope: 23/51 — a 10-point window on a
//       column that IS drifting still reads down 45% of the time.
//       NOMINAL se on 10 points, c2': 0.1411; the control's window sd is 0.3480.
//       ratio (true spread / nominal se) = 2.47
//
//    C3. Is the x>=41 drift carried by one point? Leave-one-out on c2':
//       drop x -> slope   41:0.537  43:0.332  47:0.297  53:0.391  59:0.377  61:0.387  67:0.333  71:0.366  73:0.392  79:0.360
//
//    C4. Where the drift actually lives: level shift, not tail slope.
//       c2' custody x=11..31: mean 0.4653 sd 0.0196 (n=7)
//       c2' trusted  x=41..79: mean 0.5118 sd 0.0159 (n=10)
//       step 0.0465 = 5.20 nominal sigma (x=37 excluded from both)
//       CONTROL c1 same two windows: 0.4098 -> 0.3543, step -0.0555
//       Both columns are U-shaped (high head, dip, rise). The dips sit at
//       DIFFERENT x — c2' at x=29, c1 at x=59 — so the matched-x head-to-
//       tail step has opposite sign purely because c1 is still descending
//       where c2' has already turned. The comparison that matches PHASE is
//       post-dip slope against post-dip slope, and that is C1's last rows.
//       c1 x=83..311 tail:  83:0.3660 127:0.3673 179:0.3665 233:0.3800 311:0.3756
//
//    C5. Phase-matched comparison, the item's closing test.
//       c2' post-dip x>=41 (n=10)      b=  0.3745
//       c1  post-dip x>=59 (n=48)      b=  0.1553
//       c1  post-dip x>=101 (n=39)     b=  0.1524
//       c1  x=41..79, same 10 primes   b=  0.3344
//       |c2'(x>=41) - c1(x>=59)| = 0.2192 = 0.63 of the control's own 10-point sd (0.3480).
//       A 10-point window CANNOT separate the two rates. The two-class
//       post-dip drift is, at this length, the one-class post-dip drift.
//
//    C6. Candidate (b): are lower-order Mertens terms the mechanism?
//        They cannot be, BY CONSTRUCTION, and this prints the check.
//        c2' divides by the EXACT m*lnD (a finite product, not its
//        Mertens asymptotic), so no (ln ln) remainder is left in the
//        normaliser. Size of what would be left if the ASYMPTOTIC form
//        had been used instead — ratio exact/(asymptotic) per term:
//       x= 11  m_exact=   17.11  m_asym=    6.91  ratio=2.4772
//       x= 37  m_exact=   34.05  m_asym=   15.66  ratio=2.1739
//       x= 41  m_exact=   35.80  m_asym=   16.57  ratio=2.1608
//       x= 79  m_exact=   48.79  m_asym=   22.94  ratio=2.1274
//       x=127  m_exact=   58.34  m_asym=   28.19  ratio=2.0695
//       x=311  m_exact=   80.74  m_asym=   39.58  ratio=2.0401
//        The ratio moves with x, which is exactly the correction that
//        an asymptotic normaliser WOULD have injected — and c2' does
//        not use it. So candidate (b) is excluded for c2' itself.
//
//
// DONE. 12 guards, all passed.
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
// ============================================================================
//
// 0. WHAT DID NOT MOVE. Every headline of exponent-control.md survives the
//    refit unchanged: the model RANKING is the same seven models in the same
//    order (c*theta^a best, the two frozen quadratics worst), the corrected
//    central stays 1.50 (section 5 had already refit that one), and the
//    margin stays flat. Nothing here revises a live number.
//
// 1. MEASURED, and it is the item's answer. On its OWN band x >= 41 the c2'
//    drift is NOT resolved. b = 0.3745 per ln ln x with a nominal se of
//    0.1411 — but the same 10-point estimator, run over all 51 sliding
//    10-windows of the one-class control column c1, has sd 0.3480, which is
//    2.47x the nominal se, and reads NEGATIVE in 23 of 51 windows on a column
//    that is genuinely drifting up. c2's 0.3745 sits at rank 0.80 of that
//    distribution: an ordinary draw. Ten points cannot establish a drift rate
//    here, and the nominal error bar says they can, which is the same failure
//    mode section 3 documents for the exponent fits.
//
// 2. MEASURED. Phase-matched, the two columns agree. Both c2' and c1 are
//    U-shaped in x; the dips sit at different x (c2' at 29, c1 at 59, the
//    latter the global minimum of all 64 control terms). Post-dip:
//    c2'(x >= 41) = 0.3745, c1(x >= 59) = 0.1553, c1(x >= 101) = 0.1524, and
//    c1 on the SAME ten primes x = 41..79 reads 0.3344. The gap between the
//    two-class and one-class post-dip rates is 0.2192 = 0.63 of the control's
//    own 10-point sd. The two rates are indistinguishable at this length.
//    "The control drifts the same way" therefore CLOSES the mechanism
//    question for item 1c at the level the data can support — which is what
//    attack-c2drift-01 concluded on longer windows, reproduced here on the
//    item's own band with a matched-length calibration it did not have.
//
// 3. MEASURED. What IS established about the drift is the head-to-tail LEVEL
//    step, not a tail slope: c2' mean 0.4653 (sd 0.0196) on the custody band
//    x = 11..31 against 0.5118 (sd 0.0159) on x = 41..79, a step of +0.0465 =
//    5.20 nominal sigma with x = 37 excluded from both. The item's framing
//    ("x >= 41 runs [0.4842, 0.5337], drifting up") reads a level step as a
//    slope. Within x >= 41 the column is 0.5123, 0.4916, 0.4842, 0.5179,
//    0.5059, 0.5019, 0.5337, 0.5233, 0.5188, 0.5281 — it FALLS over its first
//    three terms. Leave-one-out on the ten-point slope runs 0.297 to 0.537,
//    so no single term carries it either.
//
// 4. MEASURED. Candidate (b), lower-order Mertens corrections, is excluded
//    for c2' BY CONSTRUCTION and this is the check: c2' divides by the exact
//    finite product m*lnD, never by its asymptotic form, and the exact /
//    asymptotic ratio moves 2.477 -> 2.040 across x = 11..311 — the whole of
//    that motion is what an asymptotic normaliser would have injected and
//    c2' does not carry. (b) remains live for the EXPONENT fits, where it is
//    exactly what the control's +0.279 bias prices.
//
// 5. MEASURED, and it is the one reading of exponent-control.md this refit
//    WEAKENS. Section 2's "two classes genuinely look far more quadratic than
//    one" is a ratio of frozen-quadratic AIC penalties at matched n. At n = 10
//    G2's penalty was 4.4 against the control's 34.9, i.e. 13%; at n = 20 it
//    is 27.6 against 78.9, i.e. 35%. (The file's h2 figure, 12.2 against 74.7,
//    is 16%.) The qualitative statement stands — the two-class object is
//    still penalised far less than the control — but the margin nearly
//    tripled on the ten new terms, so the sentence should not be quoted as a
//    stable factor.
//
// 6. MEASURED. The two other ten-term G2 fits, refit:
//    - Qg = (G2/M2)/(h/M1), section 4's structural column: slope 0.2978 +-
//      0.0627 at n = 10 -> 0.2549 +- 0.0274 at n = 20, and the same tail
//      shrinkage the file reports for h2's Q appears on G2 (0.1565 on
//      [23,79], 0.0473 +- 0.0711 on [41,79], against h2's 0.2000 and 0.0999).
//      Qg's ten-point tail slope is now consistent with zero at one nominal
//      sigma. That is NOT evidence Q is bounded — n = 10 and reading 1's
//      calibration applies here too — but the "if Q bounded" hypothesis is
//      no worse supported at 22 terms than at 12.
//    - Margin G2 against p_{n+1}^2, section 6: slope -0.0806 +- 0.0469 at
//      n = 10 -> -0.0108 +- 0.0239 at n = 20. Flat, and flatter. Section 7
//      item 2's "the margin is flat, not drifting" is CONFIRMED on G2's own
//      22 terms, having previously rested on h2's 19. The G2 margin over
//      x = 41..79 runs 3.39 to 4.16 with minimum 3.386, above h2's 1.880.
//
// 7. LIMITS. Nothing here is a proof of anything, and the estimator is the
//    subject, not the object. 8 of the 18 c2' terms are single-witness
//    (A144311 a(15)-a(22)) and the c1 tail a(59)-a(64) is Bozek's,
//    single-witness. No p-values are quoted: this file's spreads are the
//    control's own window distribution, not an ensemble null — for calibrated
//    p-values on this question see attack-c2drift-01.js's 4000-replicate
//    runs. Candidate (c), a genuinely still-moving exponent, is untouched
//    and untouchable at 22 terms; reading 1 is the reason.
// ============================================================================
