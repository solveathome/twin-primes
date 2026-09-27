// SPARSE DISPERSION — finite collision, gcd, endpoint and coefficient checks.
// The companion note owns the asymptotic argument; these are not rate measurements.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);console.log(`input: data-reuse/factor-windows.json sha256=${sourceSha256}`);
function factor(n){const out=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let a=0;do{n/=p;a++;}while(n%p===0);out.push([p,a]);}if(n>1)out.push([n,1]);return out;}
const mu=n=>{const f=factor(n);return f.some(([,a])=>a>1)?0:(-1)**f.length;};
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
const mod=(a,c)=>((a%c)+c)%c;
function inv(a,c){let b=c,u=1,v=0;while(b){const k=Math.floor(a/b);[a,b]=[b,a-k*b];[u,v]=[v,u-k*v];}assert.equal(a,1);return mod(u,c);}
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],scale=(a,t)=>[a[0]*t,a[1]*t],sub=(a,b)=>add(a,scale(b,-1));
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],conj=a=>[a[0],-a[1]],norm=a=>a[0]**2+a[1]**2;
const phase=(n,c=1)=>{const z=2*Math.PI*mod(n,c)/c;return[Math.cos(z),Math.sin(z)];};
function near(a,b,mass=1){assert(Math.abs(a-b)<2e-8*Math.max(1,mass),`${a} != ${b}`);}
function close(a,b,mass=1){near(a[0],b[0],mass);near(a[1],b[1],mass);}
const inside=(n,D)=>D<n&&n<=2*D;
function cH(h,T){const v=h/(T+1),W=Math.PI*v*(1-v)/Math.tan(Math.PI*v)+v;return[0,W/(2*Math.PI*h)];}
function phi(h,m,n,g,x,z){return sub(phase(h*x/2,g*m*n),phase(h*z,g*m*n));}
function Bconvolution(l,D,W){if(mu(l))return 0;let sum=0;for(const p of saved.basePrimes){if(p>W)break;for(let r=p;r<=W;r*=p)if(l%r===0&&inside(l/r,D))sum-=mu(l/r)*Math.log(p);}return sum;}
function Bformula(l,D,W){const f=factor(l),repeated=f.filter(([,a])=>a>1);if(repeated.length!==1)return 0;const[p,a]=repeated[0],m=l/p**a;return mu(m)*Math.log(p)*((p**(a-1)<=W&&inside(p*m,D)?1:0)-(p**a<=W&&inside(m,D)?1:0));}
let coefficientChecks=0,bNonzero=0;
for(const D of [5,12,24,48])for(const W of [4,13,32])for(let l=1;l<=2*D*W;l++){
 const b=Bconvolution(l,D,W);near(b,Bformula(l,D,W));coefficientChecks++;if(b)bNonzero++;
}
near(Bformula(132,24,13),-Math.log(2));

let harmonicChecks=0,weightedGcdChecks=0,zeroPairs=0,distinguishedFactors=0;
const harmonicExamples=[];
for(const Q of [2,4,8,16])for(const A of [1,2,4,8,16,32,64]){
 const ps=saved.basePrimes.filter(p=>p>Q&&p<=2*Q&&p!==2),hs=Array.from({length:A},(_,i)=>A+1+i);let zeros=0,maxHalf=0,maxFirst=0;
 for(const p of ps)for(const q of ps){let half=0,first=0;
  for(const h of hs)for(const k of hs){const r=p===q?k-h:k*p-h*q;
   if(r===0){zeros++;continue;}
   const H=p===q?gcd(k-h,p):gcd(h,p)*gcd(k,q);if(H>1)distinguishedFactors++;
   half+=Math.sqrt(H);first+=H;
   for(const e of [6,7,12,25])if(e%p&&e%q)for(const theta of [1,2]){
    assert.equal(gcd(theta*r,e*(p===q?p:p*q)),gcd(theta*r,e)*H);weightedGcdChecks++;
   }
  }
  assert(half<=9*A*A);assert(first<=9*A*A);harmonicChecks+=2;maxHalf=Math.max(maxHalf,half/A**2);maxFirst=Math.max(maxFirst,first/A**2);
 }
 assert(zeros<=12*Q*A);harmonicChecks++;zeroPairs+=zeros;harmonicExamples.push({Q,A,primes:ps,zeros,maxHalf,maxFirst});
}
assert.equal(5*7-7*5,0);assert.equal(gcd(10-5,6*5),5);assert.equal(gcd(10-5,6),1);
assert(distinguishedFactors>0&&zeroPairs>0);
console.log(`coefficients: ${coefficientChecks} independent B identities, ${bNonzero} nonzero values; even reduced divisor witness retained`);
console.log(`harmonics: ${harmonicChecks} counting/average checks, ${weightedGcdChecks} exact gcd factorizations; ${zeroPairs} zero pairs, ${distinguishedFactors} nontrivial distinguished-prime factors`);

let momentChecks=0,pairChecks=0,nonunits=0,primeExclusions=0,evenActive=0;
let resonantCross=0,nonzeroPrimeGcd=0,negativeCross=0,positiveCross=0,algebraMass=0;
const examples=[];
for(const g of [1,2])for(const N of [64,128])for(const A of [1,4,16])for(const x of [256,16384]){
 const D=24,W=13,E=24,M=64,T=32,z=3*x/4,ps=[5,7],hs=Array.from({length:A},(_,i)=>A+1+i),beta=new Map();let F2=0;
 for(let m=M+1;m<=2*M;m++){const B=Bformula(g*m,D,W);beta.set(m,B);F2+=B*B;if(g===2&&m%2===0&&B)evenActive++;}
 assert(F2>0);let direct=[0,0],grouped=[0,0],moment=0,mass=0,expanded=[0,0],cross=[0,0],same=[0,0],diagonal=[0,0],zero=[0,0];
 // Direct product-coefficient evaluation; sum right Q separately from the moment.
 for(let n=N+1;n<=2*N;n++){
  let Qcoef=0;for(const p of ps)if(n%p===0&&inside(g*n/p,E))Qcoef+=mu(g*n)*Math.log(p);
  if(!Qcoef)continue;
  for(let m=M+1;m<=2*M;m++)if(beta.get(m)&&gcd(m,n)===1)for(const h of hs){
   const value=mul(cH(h,T),mul(phase(-(2/g)*h*inv(m,n),n),phi(h,m,n,g,x,z)));
   direct=add(direct,scale(value,beta.get(m)*Qcoef));
  }
 }
 for(let e=E/g+1;e<=2*E/g;e++){
  const qs=ps.filter(q=>{if(e%q===0){primeExclusions++;return false;}return inside(e*q,N);});
  const indices=qs.flatMap(q=>hs.map(h=>({q,h,w:scale(cH(h,T),Math.log(q))})));
  for(let m=M+1;m<=2*M;m++){
   const entries=indices.map(({q,h,w})=>{if(gcd(m,e*q)!==1){nonunits++;return[0,0];}return mul(w,mul(phase(-(2/g)*h*inv(m,e*q),e*q),phi(h,m,e*q,g,x,z)));});
   const Y=entries.reduce(add,[0,0]);grouped=add(grouped,scale(Y,-mu(g*e)*beta.get(m)));moment+=norm(Y);
   mass+=entries.reduce((s,v)=>s+Math.sqrt(norm(v)),0)**2;
   for(let i=0;i<indices.length;i++)for(let j=0;j<indices.length;j++){
    const a=indices[i],b=indices[j],samePrime=a.q===b.q,c=e*(samePrime?a.q:a.q*b.q);if(gcd(m,c)!==1)continue;
    const r=(2/g)*(samePrime?b.h-a.h:b.h*a.q-a.h*b.q);
    const H=samePrime?gcd(b.h-a.h,a.q):gcd(a.h,a.q)*gcd(b.h,b.q);
    assert.equal(gcd(r,c),gcd(r,e)*H);if(r&&H>1)nonzeroPrimeGcd++;
    const f=mul(phi(a.h,m,e*a.q,g,x,z),conj(phi(b.h,m,e*b.q,g,x,z)));
    const term=mul(mul(a.w,conj(b.w)),mul(phase(r*inv(m,c),c),f));
    close(term,mul(entries[i],conj(entries[j])));expanded=add(expanded,term);pairChecks++;
    if(i===j)diagonal=add(diagonal,term);else if(samePrime)same=add(same,term);else cross=add(cross,term);
    if(!r){zero=add(zero,term);if(!samePrime)resonantCross++;}
   }
  }
 }
 close(direct,grouped,Math.sqrt(F2*(E/g)*moment));close(expanded,[moment,0],mass);close(add(add(diagonal,same),cross),expanded,mass);
 near(cross[1],0,mass);assert(norm(grouped)<=F2*(E/g)*moment+1e-8*Math.max(1,F2*(E/g)*moment));
 if(cross[0]<-1e-9)negativeCross++;if(cross[0]>1e-9)positiveCross++;
 momentChecks++;algebraMass+=mass;examples.push({g,D,W,E,M,N,A,x,z,T,F2,direct,grouped,moment,diagonal,same,cross,zero});
}
assert(resonantCross>0&&nonzeroPrimeGcd>0&&evenActive>0&&primeExclusions>0&&negativeCross>0&&positiveCross>0);
console.log(`moments: ${momentChecks} exact coefficient/Cauchy identities, ${pairChecks} pair phases; ${resonantCross} distinct-prime zero terms, ${nonzeroPrimeGcd} nonzero terms with prime gcd`);
console.log(`restrictions: ${nonunits} nonunit exclusions, ${primeExclusions} prime-divides-e exclusions, ${evenActive} active even reduced divisors; signed cross moments ${negativeCross} negative/${positiveCross} positive`);

// Analytic endpoint derivative versus independent finite differences, in both regimes.
let variationChecks=0,derivativeChecks=0;const variationExamples=[];
for(const x of [1,64,4096,262144])for(const A of [1,8,32]){
 const M=64,E=12,Q=4,g=2,e=17,q1=5,q2=7,h1=A,h2=2*A,z=3*x/4,R=A*x/(M*E*Q),f=Math.min(1,R);
 const smooth=m=>mul(phi(h1,m,e*q1,g,x,z),conj(phi(h2,m,e*q2,g,x,z)));
 const derivative=(h,q,m)=>{
  const terms=[x/2,z].map(t=>{const c=h*t/(g*e*q);return mul([0,-2*Math.PI*c/(m*m)],phase(c/m));});return sub(...terms);
 };
 const df=m=>add(mul(derivative(h1,q1,m),conj(phi(h2,m,e*q2,g,x,z))),mul(phi(h1,m,e*q1,g,x,z),conj(derivative(h2,q2,m))));
 let variation=0,maxAbs=0,previous=smooth(M);const steps=2048;
 for(let i=1;i<=steps;i++){const m=M+M*i/steps,current=smooth(m);variation+=Math.sqrt(norm(sub(current,previous)));maxAbs=Math.max(maxAbs,Math.sqrt(norm(current)));previous=current;}
 const bound=128*Math.PI**2*f*f*(1+R);assert(maxAbs+variation<=bound);variationChecks++;
 for(const m of [70,90,120]){
  const dx=1e-4,central=h=>scale(sub(smooth(m+h),smooth(m-h)),1/(2*h));
  // Richardson removes the visible second-order truncation error at high phase.
  const finite=scale(sub(scale(central(dx/2),4),central(dx)),1/3);
  close(df(m),finite,Math.max(1,Math.sqrt(norm(df(m)))));derivativeChecks++;
 }
 for(const h of [1,A,2*A])assert(Math.min(1,h*x/(M*E*Q))/Math.sqrt(h)<=Math.sqrt(x/(M*E*Q))+1e-12);
 variationExamples.push({x,A,R,f,maxAbs,variation,bound});
}
console.log(`endpoints: ${variationChecks} product-variation checks, ${derivativeChecks} derivative checks; paired diagonal envelope checked in small and large phase regimes`);

// Exact rational checks are independent of floating-point phase calculations.
function bgcd(a,b){a=a<0n?-a:a;while(b)[a,b]=[b,a%b];return a;}
function rat(n,d=1){n=BigInt(n);d=BigInt(d);const g=bgcd(n,d);return[n/g,d/g];}
const ra=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),rm=(a,b)=>rat(a[0]*b[0],a[1]*b[1]),rs=(a,n,d=1)=>rm(a,rat(n,d));
const neg=a=>[-a[0],a[1]],rr=(a,b)=>ra(a,neg(b)),sum=(...xs)=>xs.reduce(ra,rat(0)),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],mx=(a,b)=>cmp(a,b)>0n?a:b,fmt=a=>`${a[0]}/${a[1]}`;
const w=rat(6,25),v=rat(1,20),kappa=rat(3,25),tiny=rat(1,100000),C=(a,b)=>sum(rat(3,20),rs(ra(a,b),7,10),rs(mx(a,b),1,4));
function budgets(a,b){const t=ra(a,b);return [rr(C(a,b),rs(ra(w,v),1,4)),sum(rs(a,5,4),rs(b,1,2),rs(w,1,4)),C(ra(rr(a,w),kappa),b),rr(t,rs(w,1,2)),sum(rat(1,2),rs(t,1,2),rs(v,-1,2),rs(w,-1,4)),sum(rs(a,1,2),rs(b,5,4),rs(v,1,4),rs(w,-1,4)),sum(rs(a,1,2),rs(b,5,4),rs(v,-1,2),rs(w,-1,4)),sum(a,rs(b,1,2),rs(v,-1,2),rs(w,-1,4))];}
const a=rat(103,200),b=rat(591,1000),exampleBudgets=budgets(a,b);
assert.deepEqual(exampleBudgets,[rat(19989,20000),rat(3997,4000),rat(19759,20000),rat(493,500),rat(121,125),rat(759,800),rat(729,800),rat(1451,2000)]);
for(const z of exampleBudgets)assert(cmp(ra(z,rs(tiny,5)),rat(1))<0n);
assert.deepEqual(rr(C(a,b),rs(w,1,4)),rat(20239,20000));
assert.deepEqual(sum(a,b,neg(w),neg(v)),rat(102,125));assert(cmp(sum(a,b,rat(-1),rs(tiny,2)),kappa)<0n);
const corner=[rat(1727,3350),rat(3961,6700)],cornerBudgets=budgets(...corner);
assert.deepEqual(cornerBudgets.slice(0,2),[rat(1),rat(1)]);assert.deepEqual(cornerBudgets[2],rat(1977,2000));assert.deepEqual(cornerBudgets[5],rat(318,335));
for(const z of cornerBudgets.slice(2))assert(cmp(z,rat(1))<0n);assert(cmp(sum(...corner,rat(-1)),kappa)<0n);
const productSup=sum(...corner,neg(w),neg(v));assert.deepEqual(productSup,rat(1368,1675));
assert.deepEqual(sum(rs(rat(14),3,67),rs(rat(5),5,67)),rat(1));assert.deepEqual(sum(rs(rat(19),3,67),rs(rat(2),5,67)),rat(1));
assert.deepEqual(sum(rs(rat(369,20),3,67),rs(rat(94,25),5,67)),rat(1483,1340));
let sectorChecks=0;const sectorBudgets=[];
const types=(size,cut)=>[{type:'L0',s:rr(size,cut),n:rs(rr(size,cut),1,2)},{type:'L1',s:rr(size,cut),n:rs(rr(size,cut),1,2)},{type:'Q',s:size,n:rs(size,1,2)},{type:'B',s:size,n:rr(rs(size,1,2),rs(cut,1,4))}];
for(const l of types(a,w))for(const r of types(b,v)){
 if(l.type==='Q'||(l.type==='B'&&r.type==='Q'))continue;
 const first=sum(rat(3,20),l.n,r.n,rs(ra(l.s,r.s),1,5),rs(mx(l.s,r.s),1,4)),second=sum(l.n,r.n,rs(ra(l.s,r.s),3,8),rs(mx(l.s,r.s),1,8));
 assert(cmp(ra(first,rs(tiny,5)),rat(1))<0n);assert(cmp(ra(second,rs(tiny,5)),rat(1))<0n);sectorChecks+=2;sectorBudgets.push({left:l.type,right:r.type,first:fmt(first),second:fmt(second)});
}
console.log(`rational budgets: ${exampleBudgets.map(fmt).join(',')}; ${sectorChecks} paired-sector checks; old left-B first budget=${fmt(rr(C(a,b),rs(w,1,4)))}`);
console.log(`boundary certificate: a=${fmt(corner[0])}, b=${fmt(corner[1])}, product supremum=${fmt(productSup)}; BB and left-prime cross budgets both equal 1`);
const artifact={schema:1,producer:'research/sparse-dispersion-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256,coefficientChecks,bNonzero,harmonicChecks,weightedGcdChecks,zeroPairs,distinguishedFactors,harmonicExamples,momentChecks,pairChecks,nonunits,primeExclusions,evenActive,resonantCross,nonzeroPrimeGcd,negativeCross,positiveCross,algebraMass,examples,variationChecks,derivativeChecks,variationExamples,exampleBudgets:exampleBudgets.map(fmt),corner:corner.map(fmt),cornerBudgets:cornerBudgets.map(fmt),productSup:fmt(productSup),sectorChecks,sectorBudgets};
fs.writeFileSync(path.join(__dirname,'data-reuse/sparse-dispersion.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/sparse-dispersion.json. No asymptotic cancellation rate, uniform product cutoff or twin lower bound measured.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/sparse-dispersion-validation.js
//   invocation:  node research/sparse-dispersion-validation.js
//   code-sha256: 34c0a0522e73a18bd7ad997c8fe8517da164119777b84cd965cb59021a459668
//   out-sha256:  c0a4a366c60f28c3f53db9607cbb26fd4125a68e9e71630c1c713b46a860a99a
//   body-lines:  9
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     1.8 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// coefficients: 8722 independent B identities, 777 nonzero values; even reduced divisor witness retained
// harmonics: 504 counting/average checks, 1388040 exact gcd factorizations; 1386 zero pairs, 19162 nontrivial distinguished-prime factors
// moments: 24 exact coefficient/Cauchy identities, 1251432 pair phases; 2704 distinct-prime zero terms, 203980 nonzero terms with prime gcd
// restrictions: 63840 nonunit exclusions, 144 prime-divides-e exclusions, 180 active even reduced divisors; signed cross moments 6 negative/6 positive
// endpoints: 12 product-variation checks, 36 derivative checks; paired diagonal envelope checked in small and large phase regimes
// rational budgets: 19989/20000,3997/4000,19759/20000,493/500,121/125,759/800,729/800,1451/2000; 22 paired-sector checks; old left-B first budget=20239/20000
// boundary certificate: a=1727/3350, b=3961/6700, product supremum=1368/1675; BB and left-prime cross budgets both equal 1
// Saved data-reuse/sparse-dispersion.json. No asymptotic cancellation rate, uniform product cutoff or twin lower bound measured.
// ============================================================================
// READINGS
// Finite identities and exact rational budgets are checked separately from the
// companion note's classical-input asymptotic derivation.
