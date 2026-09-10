// SMALL-DIVISOR KERNEL — finite checks for the reciprocity separation of the
// j<=x^(1/20) kernel and exact rational pricing of the imported interfaces.
// Companion: small-divisor-kernel.md. Proves no asymptotic saving.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const started=Date.now();

// ---- exact rationals over BigInt -------------------------------------------
function g2(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function rat(n,d=1n){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=g2(n,d)||1n;return[n/g,d/g];}
const ra=(x,y)=>rat(x[0]*y[1]+y[0]*x[1],x[1]*y[1]);
const rs=(x,y)=>rat(x[0]*y[1]-y[0]*x[1],x[1]*y[1]);
const rm=(x,y)=>rat(x[0]*y[0],x[1]*y[1]);
const cmp=(x,y)=>{const l=x[0]*y[1],r=y[0]*x[1];return l<r?-1:l>r?1:0;};
const mx=(x,y)=>cmp(x,y)>=0?x:y;
const str=x=>`${x[0]}/${x[1]}`;
const num=x=>Number(x[0])/Number(x[1]);
const R0=rat(0n),R1=rat(1n),HALF=rat(1n,2n);

// ---- integer helpers --------------------------------------------------------
const mod=(a,c)=>(a%c+c)%c;
function inv(a,c){if(c===1n)return 0n;let b=c,s=1n,t=0n;a=mod(a,c);while(b){const q=a/b;[a,b]=[b,a-q*b];[s,t]=[t,s-q*t];}assert.equal(a,1n);return mod(s,c);}

// ============================================================================
// 1. Per-index reciprocity, as an exact integer identity.
//    bar(m)/u + bar(u)/m - 1/(mu) is an integer whenever (m,u)=1.
// ============================================================================
let recipChecks=0,pairSplitChecks=0,correctionSplitChecks=0;
const controls={recipWrongSign:0,splitWrongModulus:0,splitDroppedTheta:0,correctionProductForm:0};
for(let uu=1;uu<=60;uu++)for(let mm=1;mm<=60;mm++){
 const u=BigInt(uu),m=BigInt(mm);
 if(g2(u,m)!==1n)continue;
 const a=inv(m,u),b=inv(u,m);
 assert.equal(mod(a*m+b*u-1n,m*u),0n);recipChecks++;
 // negative control: the same statement with the reciprocal term unsigned.
 if(mod(a*m-b*u-1n,m*u)!==0n)controls.recipWrongSign++;
}

// ============================================================================
// 2. The pair kernel splits index by index modulo m.
//    R*bar(c) = h1*bar(u1) - h2*bar(u2)  (mod m),  c=j*l1*l2, R=h1*l2-h2*l1.
//    Correction phase: R/(m c) = h1/(m u1) - h2/(m u2), exactly.
// ============================================================================
for(const j of [1n,2n,3n,5n,6n,12n])for(let a1=1;a1<=14;a1++)for(let a2=1;a2<=14;a2++){
 const l1=BigInt(a1),l2=BigInt(a2);
 if(g2(l1,l2)!==1n)continue;
 const u1=j*l1,u2=j*l2,c=j*l1*l2;
 for(const h1 of [1n,2n,3n,7n,11n])for(const h2 of [1n,2n,3n,7n,11n]){
  const R=h1*l2-h2*l1;
  for(const theta of [1n,2n])for(const m of [5n,11n,13n,17n,23n,29n,31n,37n,41n,43n]){
   if(g2(m,c)!==1n)continue;
   const lhs=mod(theta*R*inv(c,m),m);
   const rhs=mod(theta*h1*inv(u1,m)-theta*h2*inv(u2,m),m);
   assert.equal(lhs,rhs);pairSplitChecks++;
   if(theta===2n&&lhs!==mod(R*inv(c,m),m))controls.splitDroppedTheta++;
   if(j>1n&&mod(theta*R*inv(u1*u2,m),m)!==lhs)controls.splitWrongModulus++;
   // exact rational split of the correction phase
   const left=rat(theta*R,m*c),right=rs(rat(theta*h1,m*u1),rat(theta*h2,m*u2));
   assert.equal(str(left),str(right));correctionSplitChecks++;
   if(str(left)!==str(ra(rat(theta*h1,m*u1),rat(theta*h2,m*u2)))&&R!==0n)controls.correctionProductForm++;
  }
 }
}
console.log(`reciprocity: ${recipChecks} integer identities, ${pairSplitChecks} pair splits mod m, ${correctionSplitChecks} exact correction splits`);

// ============================================================================
// 3. The complex identity actually used, numerically, and the endpoint swap.
//    e(theta*h*bar(m)/u) = e(theta*h/(m u)) * e(-theta*h*bar(u)/m).
// ============================================================================
let complexChecks=0,maxComplexError=0;
const cmul=(p,q)=>[p[0]*q[0]-p[1]*q[1],p[0]*q[1]+p[1]*q[0]];
const ph=t=>[Math.cos(2*Math.PI*t),Math.sin(2*Math.PI*t)];
for(const theta of [1,2])for(let uu=3;uu<=40;uu++)for(let mm=3;mm<=40;mm++){
 const u=BigInt(uu),m=BigInt(mm);if(g2(u,m)!==1n)continue;
 for(const h of [1,2,5,9]){
  const lhs=ph(theta*h*Number(inv(m,u))/uu);
  const rhs=cmul(ph(theta*h/(mm*uu)),ph(-theta*h*Number(inv(u,m))/mm));
  const err=Math.hypot(lhs[0]-rhs[0],lhs[1]-rhs[1]);
  maxComplexError=Math.max(maxComplexError,err);assert(err<1e-9);complexChecks++;
 }
}
// endpoint interchange: w = 2*sigma + z'
const X=1n<<20n,Z=(3n*X)/4n;
const nativeEnds=[X/2n,Z],recipEnds=[X/2n-2n,Z-2n];
assert.deepEqual(nativeEnds.map(z=>z+2n*(-1n)),recipEnds);
assert.deepEqual(recipEnds.map(z=>z+2n*(1n)),nativeEnds);
console.log(`complex phases: ${complexChecks} identities, max error ${maxComplexError.toExponential(2)}; endpoint swap exact both ways`);

// ============================================================================
// 4. Size and variation of the correction phase on the target box.
//    |theta*R/(m c)| and its m-variation are O(A/(M N)), i.e. O(1/x) here.
// ============================================================================
let seed=20260906;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
const XB=1e6,Mb=Math.pow(XB,14/25),Nb=Math.pow(XB,1/2),Ab=Math.pow(XB,3/50);
let maxCorr=0,maxCorrVar=0,corrSamples=0;
for(let s=0;s<20000;s++){
 const j=1+Math.floor(6*rnd());
 const l1=Math.max(1,Math.round((Nb/j)*(1+rnd()))),l2=Math.max(1,Math.round((Nb/j)*(1+rnd())));
 const h1=Math.round(Ab*(1+rnd())),h2=Math.round(Ab*(1+rnd()));
 const m=Math.round(Mb*(1+rnd())),c=j*l1*l2,Rv=h1*l2-h2*l1;
 if(Rv===0)continue;
 maxCorr=Math.max(maxCorr,Math.abs(2*Rv/(m*c)));
 maxCorrVar=Math.max(maxCorrVar,Math.abs(2*Rv/(m*c))*(Mb/m));// |d/dm| * M
 corrSamples++;
}
const corrBudget=64*Ab/(Mb*Nb);
assert(maxCorr<corrBudget,'correction phase within A/(MN) budget');
assert(maxCorrVar<corrBudget,'correction variation within A/(MN) budget');
console.log(`correction phase on x=1e6 box: ${corrSamples} samples, max |theta R/(mc)|=${maxCorr.toExponential(2)}, max m-variation=${maxCorrVar.toExponential(2)}, budget ${corrBudget.toExponential(2)}`);

// ============================================================================
// 5. Exact rational pricing of every interface at (delta,nu)=(8/25,9/20).
//    a=log_x M=14/25, b=log_x N=1/2, alpha=log_x A=3/50 (top band, v=1).
// ============================================================================
const a=rat(14n,25n),b=rat(1n,2n),alpha=rs(ra(a,b),R1);
assert.equal(str(alpha),'3/50');
const classical=[rm(HALF,ra(R1,a)),ra(rm(HALF,a),rm(rat(3n,2n),b)),a].map(str);
assert.deepEqual(classical,['39/50','103/100','14/25']);
const trivialBlock=ra(a,b);assert.equal(str(trivialBlock),'53/50');
// Bettin-Chandee Theorem 1, top band: norms*f contribute exactly 1/2.
const P=ra(alpha,ra(a,b)),MX=mx(a,b);
const normsAndF=ra(rm(HALF,rs(ra(a,b),alpha)),rs(ra(alpha,R1),ra(a,b)));
assert.equal(str(normsAndF),'1/2');
const t1=ra(rm(rat(7n,20n),P),rm(rat(1n,4n),MX));
const t2=ra(rm(rat(3n,8n),P),rm(rat(1n,8n),ra(alpha,MX)));
const bc1=ra(normsAndF,t1),bc2=ra(normsAndF,t2),bc=mx(bc1,bc2);
assert.deepEqual([str(t1),str(t2)],['133/250','199/400']);
assert.deepEqual([str(bc1),str(bc2)],['129/125','399/400']);
assert.equal(str(bc),'129/125');
assert(cmp(bc,R1)>0,'BC exceeds the required block exponent 1');
assert(cmp(bc,rat(103n,100n))>0,'BC is weaker than the classical Weil budget here');
const bcDeficit=rs(bc,R1);assert.equal(str(bcDeficit),'4/125');
// DFI (1.1), a fixed, summed trivially over the harmonic band.
const dfi=ra(ra(rm(HALF,ra(a,b)),rm(rat(3n,8n),ra(a,b))),rm(rat(11n,48n),MX));
assert.equal(str(dfi),'1267/1200');
assert(cmp(dfi,bc)>0,'DFI without the harmonic average is weaker than BC');
// Wright arXiv:2604.25177 Theorem 2.1 at R=1 (asymmetric variant; secondary reading).
const wBracket=[rs(R0,rm(rat(1n,8n),b)),rs(rm(rat(1n,8n),b),rm(rat(1n,4n),a)),
 rs(rs(rm(rat(1n,10n),a),rm(rat(3n,10n),alpha)),rm(rat(3n,20n),b)),
 rs(rs(rm(rat(3n,20n),b),rm(rat(3n,20n),alpha)),rm(rat(1n,5n),a)),
 rs(rm(rat(3n,8n),b),rm(HALF,a))];
const wMax=wBracket.reduce(mx,rs(R0,rat(9n,1n)));
const wright=ra(ra(rat(1n,2n),rm(HALF,P)),wMax);
assert.deepEqual([str(wMax),str(wright)],['-37/1000','1023/1000']);
assert(cmp(wright,R1)>0,'the asymmetric R=1 variant also exceeds 1');
// what would have to change, holding the other exponent fixed
const kappaMax=rm(rs(HALF,rm(rat(7n,20n),P)),rat(1n,1n));
const kappaThreshold=rat(kappaMax[0]*MX[1],kappaMax[1]*MX[0]);
const gammaMax=rs(HALF,rm(rat(1n,4n),MX));
const gammaThreshold=rat(gammaMax[0]*P[1],gammaMax[1]*P[0]);
assert.deepEqual([str(kappaThreshold),str(gammaThreshold)],['27/140','9/28']);
console.log(`block exponents at (8/25,9/20): classical ${classical.join(', ')}; trivial ${str(trivialBlock)}; BC ${str(bc)} (terms ${str(bc1)}, ${str(bc2)}); DFI ${str(dfi)}; Wright R=1 ${str(wright)}`);
console.log(`BC deficit ${str(bcDeficit)}; would need (M+N) exponent < ${str(kappaThreshold)} or (AMN) exponent < ${str(gammaThreshold)}`);

// ============================================================================
// 6. Band monotonicity: the top harmonic band binds both BC terms.
// ============================================================================
const bandRows=[];
for(const an of [0n,1n,2n,3n,4n,5n,6n]){
 const al=rat(an,100n);
 if(cmp(al,alpha)>0)continue;
 const f=rs(ra(al,R1),ra(a,b)); // log_x min(1, A x /(MN)), <=0
 const nf=ra(rm(HALF,rs(ra(a,b),al)),f);
 const Pb=ra(al,ra(a,b));
 const u1=ra(nf,ra(rm(rat(7n,20n),Pb),rm(rat(1n,4n),MX)));
 const u2=ra(nf,ra(rm(rat(3n,8n),Pb),rm(rat(1n,8n),ra(al,MX))));
 bandRows.push({alpha:str(al),term1:str(u1),term2:str(u2)});
}
for(let i=1;i<bandRows.length;i++){
 assert(cmp(rat(...bandRows[i].term1.split('/').map(BigInt)),rat(...bandRows[i-1].term1.split('/').map(BigInt)))>0);
 assert(cmp(rat(...bandRows[i].term2.split('/').map(BigInt)),rat(...bandRows[i-1].term2.split('/').map(BigInt)))>0);
}
console.log(`harmonic bands: ${bandRows.length} rows, both BC terms strictly increasing in the band exponent; top band binds at ${bandRows[bandRows.length-1].term1}`);

// ============================================================================
// 7. Region containment: every box BC controls is already controlled.
// ============================================================================
const inExisting=(d,n)=>cmp(ra(d,n),rat(19n,25n))<0
 ||cmp(ra(rm(rat(5n,1n),d),rm(rat(2n,1n),n)),rat(123n,50n))<0
 ||(cmp(d,rat(19n,25n))<0&&cmp(ra(d,rm(rat(3n,1n),n)),rat(161n,100n))<0);
const inBC=(d,n)=>{const A_=ra(d,rat(6n,25n)),B_=ra(n,rat(1n,20n)),Mx_=mx(A_,B_),S=ra(A_,B_);
 return cmp(ra(rm(rat(7n,10n),S),rm(rat(1n,4n),Mx_)),rat(17n,20n))<0
     && cmp(ra(rm(rat(7n,8n),S),rm(rat(1n,8n),Mx_)),R1)<0;};
let grid=0,bcPoints=0,existingPoints=0,existingOnly=0,violations=0,controlViolations=0;
for(let di=48;di<=152;di++)for(let ni=10;ni<=190;ni++){
 const d=rat(BigInt(di),200n),n=rat(BigInt(ni),200n);grid++;
 const eb=inExisting(d,n),bb=inBC(d,n);
 if(bb)bcPoints++;if(eb)existingPoints++;if(eb&&!bb)existingOnly++;
 if(bb&&!eb)violations++;
 // negative control: keep only one of the three existing conditions
 if(bb&&!(cmp(ra(rm(rat(5n,1n),d),rm(rat(2n,1n),n)),rat(123n,50n))<0))controlViolations++;
}
assert.equal(violations,0,'BC controls no box outside the existing region');
assert(controlViolations>0,'negative control must fail containment');
assert(existingOnly>0);
const tgt=[rat(8n,25n),rat(9n,20n)];
assert(!inExisting(tgt[0],tgt[1]),'the target box is outside the existing region');
assert(!inBC(tgt[0],tgt[1]),'the target box is outside the BC region');
console.log(`region grid: ${grid} points; BC ${bcPoints}; existing ${existingPoints}; existing-only ${existingOnly}; BC-outside-existing ${violations}; control violations ${controlViolations}`);

// ============================================================================
// 8. Spectral diagnostic (structural-literature-audit 3A) on the small-j range.
// ============================================================================
const specRows=[];
for(const Jn of [0n,1n,2n,3n,4n,5n,10n,20n,30n,38n,45n]){
 const J=rat(Jn,100n),L=rs(b,J),H=alpha;
 const extra=rs(rm(rat(2n,1n),H),L); // log_x of H^2/L
 const structured=cmp(extra,R0)>0?extra:R0;
 if(cmp(J,rat(38n,100n))<=0)assert.equal(str(structured),'0/1');
 specRows.push({j:str(J),L:str(L),H2overL:str(extra),factor:str(structured)});
}
console.log(`spectral diagnostic: ${specRows.length} rows; structured factor trivial for every common divisor up to x^(19/50), covering all j<=x^(1/20)`);

const out={schema:1,scope:'Finite identities and exact rational pricing only. No asymptotic saving is proved; the target (21) remains OPEN.',
 recipChecks,pairSplitChecks,correctionSplitChecks,complexChecks,maxComplexError,controls,corrSamples,
 maxCorr,maxCorrVar,corrBudget,classical,trivialBlock:str(trivialBlock),
 bc:{term1:str(bc1),term2:str(bc2),max:str(bc),deficit:str(bcDeficit)},dfi:str(dfi),wright:str(wright),
 kappaThreshold:str(kappaThreshold),gammaThreshold:str(gammaThreshold),bandRows,
 region:{grid,bcPoints,existingPoints,existingOnly,violations,controlViolations},specRows};
fs.writeFileSync(path.join(__dirname,'small-divisor-kernel-validation.json'),JSON.stringify(out,null,2)+'\n');
assert(Date.now()-started<180000,'three-minute cap');
console.log('PASS: exact separation identities and rational interface pricing; no saving established');


// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/small-divisor-kernel-validation.js
//   invocation:  node research/small-divisor-kernel-validation.js
//   code-sha256: 61dfc9fa6b7a54a9f19296079177dfef82cc8ef972b46b6640cc74d3d31a0037
//   out-sha256:  bd40b893694a9790198e351d61af428da6d1333daa3079b86aae7568622a64c5
//   body-lines:  9
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.5 s
// ============================================================================
// reciprocity: 2203 integer identities, 350050 pair splits mod m, 350050 exact correction splits
// complex phases: 6896 identities, max error 2.16e-14; endpoint swap exact both ways
// correction phase on x=1e6 box: 19956 samples, max |theta R/(mc)|=2.84e-6, max m-variation=2.78e-6, budget 6.40e-5
// block exponents at (8/25,9/20): classical 39/50, 103/100, 14/25; trivial 53/50; BC 129/125 (terms 129/125, 399/400); DFI 1267/1200; Wright R=1 1023/1000
// BC deficit 4/125; would need (M+N) exponent < 27/140 or (AMN) exponent < 9/28
// harmonic bands: 7 rows, both BC terms strictly increasing in the band exponent; top band binds at 129/125
// region grid: 19005 points; BC 3218; existing 7004; existing-only 3786; BC-outside-existing 0; control violations 722
// spectral diagnostic: 11 rows; structured factor trivial for every common divisor up to x^(19/50), covering all j<=x^(1/20)
// PASS: exact separation identities and rational interface pricing; no saving established
// ============================================================================
// READINGS
// Finite identities and exact rational pricing; no asymptotic rate is inferred.
// 1. Reciprocity separates the kernel index by index: 350050 pair splits mod m
//    confirm theta*R*inverse(c) = theta*h1*inverse(u1) - theta*h2*inverse(u2),
//    and 350050 exact rational checks confirm the correction phase splits the
//    same way. 2203 integer identities check the underlying reciprocity law.
// 2. The correction phase is negligible at the target scale: on the x=1e6 model
//    box its sampled maximum is 2.84e-6 and its m-variation 2.78e-6, inside the
//    A/(MN) budget 6.40e-5. This is a finite sample, not a uniform proof; the
//    uniform bound is derived in the note.
// 3. Bettin-Chandee Theorem 1 at this box prices to block exponent 129/125.
//    That exceeds the required 1 by 4/125 and is also weaker than the classical
//    budget 103/100. Its second term alone would give 399/400; only the first
//    term fails. DFI (1.1) without the harmonic average gives 1267/1200.
// 4. Closing the box inside this interface would need the (M+N) exponent below
//    27/140 (it is 1/4) or the (AMN) exponent below 9/28 (it is 7/20).
// 5. Over 19005 rational boxes, the 3218 that Bettin-Chandee would control are
//    all inside the 7004 already controlled; 0 lie outside, while 3786 already
//    controlled boxes lie outside BC. Dropping two of the three existing
//    conditions produces 722 control violations, so the test has teeth.
// 6. The audit's spectral diagnostic factor stays trivial for every common
//    divisor exponent up to 19/50, which contains the whole j<=x^(1/20) range.
