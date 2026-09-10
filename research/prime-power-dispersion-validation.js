// PRIME POWER DISPERSION — exact decomposition, integer kernels and moment budgets.
// Companion: prime-power-dispersion.md. Finite checks do not establish asymptotic rates.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const started=Date.now(),budget=()=>assert(Date.now()-started<180000,'three-minute computation cap reached');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);console.log(`input: data-reuse/factor-windows.json sha256=${sourceSha256}`);
const limit=1048576,spf=new Uint32Array(limit+1),mus=new Int8Array(limit+1);mus[1]=1;
for(const p of saved.basePrimes){if(p*p>limit)break;for(let n=p*p;n<=limit;n+=p)if(!spf[n])spf[n]=p;}
for(let n=2;n<=limit;n++){if(!spf[n])spf[n]=n;const p=spf[n],m=n/p;mus[n]=m%p===0?0:-mus[m];}
function factors(n){assert(Number.isSafeInteger(n)&&n>0);const out=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let k=0;do{n/=p;k++;}while(n%p===0);out.push([p,k]);}if(n>1)out.push([n,1]);return out;}
function smallFactors(n){const out=[];while(n>1){const p=spf[n];let k=0;do{n/=p;k++;}while(n>1&&spf[n]===p);out.push([p,k]);}return out;}
const mu=n=>n<=limit?mus[n]:(factors(n).some(([,k])=>k>1)?0:(-1)**factors(n).length);
const inside=(n,D)=>D<n&&n<=2*D;
function conv(D,W){const a=new Float64Array(2*D*W+1);for(let d=D+1;d<=2*D;d++)if(mus[d]){
 a[d]-=mus[d]*Math.log(d);for(const p of saved.basePrimes){if(p>W)break;for(let r=p;r<=W;r*=p)a[d*r]-=mus[d]*Math.log(p);}
}return a;}
function split(l,D,W){const f=l<=limit?smallFactors(l):factors(l),rep=f.filter(([,k])=>k>1);if(rep.length!==1)return{exc:0,core:0,k:0,p:0};
 const[p,k]=rep[0],m=l/p**k,first=p**(k-1)<=W&&inside(p*m,D)?mu(m)*Math.log(p):0;
 const second=p**k<=W&&inside(m,D)?-mu(m)*Math.log(p):0;
 return{exc:first+(p===2?second:0),core:p===2?0:second,k,p};
}
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-8*Math.max(1,mass),`${a} != ${b}`);}
let decompositionChecks=0,exceptionCount=0,coreCount=0;const coefficientRows=[];
for(const D of [12,32,128,512])for(const W of [16,81,256,1024]){
 const a=conv(D,W),counts={exc:0,core:0},energies={exc:0,core:0},powers={};let maxExc=0;
 for(let l=1;l<a.length;l++){
  const s=split(l,D,W),B=mus[l]===0?a[l]:0;near(B,s.exc+s.core,Math.log(2*D*W));decompositionChecks++;
  for(const key of ['exc','core'])if(s[key]){counts[key]++;energies[key]+=s[key]**2;}
  if(s.exc)maxExc=l;if(s.core)powers[s.k]=(powers[s.k]||0)+1;
 }
 const L=Math.floor(Math.log2(W))+1,supportBound=3*D*L*(1+Math.log(2*D))+D*L;
 assert(counts.exc<=supportBound);assert(energies.exc<=supportBound*Math.log(2*D*W)**2);
 exceptionCount+=counts.exc;coreCount+=counts.core;coefficientRows.push({D,W,counts,energies,powers,maxExc,supportBound});budget();
}
assert(exceptionCount>0&&coreCount>0);console.log(`decomposition: ${decompositionChecks} B identities through ${limit}; ${exceptionCount} exceptional and ${coreCount} odd-power nonzero entries`);

function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
function bgcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
let harmonicChecks=0,collisionChecks=0;const harmonicRows=[];
for(const p of [3,5,17,31])for(let k=1;k<=8;k++)for(const A of [1,4,16,64,256,1024])for(const alpha of [.5,1]){
 const power=p**k;assert(Number.isSafeInteger(power));let direct=0,divisor=0,same=0;
 for(let h=A;h<2*A;h++)direct+=gcd(h,power)**alpha;
 for(let j=0;j<=k;j++){const s=p**j,weight=s**alpha-(j?p**((j-1)*alpha):0);divisor+=weight*(Math.floor((2*A-1)/s)-Math.floor((A-1)/s));}
 for(let h=1;h<A;h++)same+=2*(A-h)*gcd(h,power)**alpha;
 near(direct,divisor,direct);assert(direct<=2*A*(k+1));assert(same<=4*A*A*(k+1));harmonicChecks+=3;
 if(A===1024&&alpha===1)harmonicRows.push({p,k,A,direct,same,firstBound:2*A*(k+1),sameBound:4*A*A*(k+1)});
}
const configs=[{k:1,ps:[5,7]},{k:2,ps:[17,19]},{k:3,ps:[11,13]},{k:4,ps:[29,31]},{k:8,ps:[29,31]}];
for(const {k,ps}of configs){const u=ps[0]**k,v=ps[1]**k,R=u;assert(v<2*R);
 for(const scale of [.25,1,4]){const A=Math.max(1,Math.floor(R*scale)),lo=Math.max(Math.ceil(A/u),Math.ceil(A/v)),hi=Math.min(Math.floor((2*A-1)/u),Math.floor((2*A-1)/v));let count=0;
  for(let j=1;j<=Math.ceil(2*A/R);j++)if(j*u>=A&&j*u<2*A&&j*v>=A&&j*v<2*A)count++;
  assert.equal(count,Math.max(0,hi-lo+1));assert(count<=3*A/R);collisionChecks++;
 }
}
assert.equal(25*49,49*25);assert.equal(gcd(25,25),25);assert.notEqual(gcd(25,25),gcd(25,5));
console.log(`harmonics: ${harmonicChecks} prime-power gcd/counting checks; ${collisionChecks} distinct-prime collision counts; powers through 8`);

const mod=(a,c)=>((a%c)+c)%c;
function inv(a,c){if(c===1n)return 0n;let b=c,u=1n,v=0n;while(b){const q=a/b;[a,b]=[b,a-q*b];[u,v]=[v,u-q*v];}assert.equal(a,1n);return mod(u,c);}
const plus=(a,b)=>[a[0]+b[0],a[1]+b[1]],scale=(a,t)=>[a[0]*t,a[1]*t],minus=(a,b)=>plus(a,scale(b,-1));
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],conj=a=>[a[0],-a[1]],norm=a=>a[0]**2+a[1]**2;
function phase(r,c){const angle=2*Math.PI*Number(mod(r,c))/Number(c);return[Math.cos(angle),Math.sin(angle)];}
function close(a,b,mass=1){near(a[0],b[0],mass);near(a[1],b[1],mass);}
function cH(h,T,A){const v=h/(T+1),W=Math.PI*v*(1-v)/Math.tan(Math.PI*v)+v;return[0,A*W/(2*Math.PI*h)];}
function phi(h,m,n,g,x,z,shift){const c=g*m*n;return minus(phase(h*(x/2n-shift),c),phase(h*(z-shift),c));}
function leftCoef(l,D,k,ps){const n=Number(l);assert(Number.isSafeInteger(n));if(k===1){let s=0;for(const p of ps)if(n%p===0&&inside(n/p,D))s+=mu(n)*Math.log(p);return s;}
 const f=factors(n),rep=f.filter(([,j])=>j>1);if(rep.length!==1)return 0;const[p,j]=rep[0];if(j!==k||!ps.includes(p))return 0;const m=n/p**j;
 return inside(m,D)?-mu(m)*Math.log(p):0;
}
const rightE=24,rightW=64,rightConv=conv(rightE,rightW);
let momentChecks=0,pairChecks=0,reciprocityChecks=0,zeroCross=0,primePowerGcd=0,largeModulus=0,numberFailures=0,primeExclusions=0,evenRight=0,nonunits=0;
const momentRows=[],sectors={L0:0,L1:0,Q:0,B:0};let maxWrongShift=0;
for(const {k,ps} of configs)for(const g0 of [1,2])for(const N0 of [16,64])for(const regime of ['low','high'])for(const phaseScale of [1/16,8]){
 const D=24,g=BigInt(g0),N=BigInt(N0),powers=ps.map(p=>BigInt(p)**BigInt(k)),R=powers[0],A=regime==='low'?4:Number(R),T=2*A;
 const hs=regime==='low'?[4,5,6,7]:[...new Set([A,A+1,A+ps[0],Number(powers[1]),Number(powers[1])+ps[1],2*A-1])].filter(h=>h>=A&&h<2*A);
 const M=BigInt(D/g0)*R,rawX=D*Number(R)*N0/A*phaseScale;assert(Number.isSafeInteger(D*Number(R)*N0));
 const x=BigInt(16*Math.max(1,Math.round(rawX/16))),z=3n*x/4n,beta=new Map();let F2=0;
 for(let n=N0+1;n<=2*N0;n++){const l=g0*n,A0=inside(l,rightE)?mu(l):0,A1=rightConv[l]||0,B=mu(l)===0?A1:0,L1=-A0*Math.log(l),Q=A1-L1-B;
  for(const [key,value]of Object.entries({L0:A0,L1,Q,B}))if(value)sectors[key]++;
  const value=[A1+2*A0,A0];beta.set(BigInt(n),value);F2+=norm(value);if(g0===2&&n%2===0&&B)evenRight++;
 }
 assert(F2>0);const ms=new Set();
 for(let d=D/g0+1;d<=2*D/g0;d++)for(let i=0;i<ps.length;i++){const m=BigInt(d)*powers[i];if(m>M&&m<=2n*M)ms.add(m.toString());}
 let direct=[0,0],grouped=[0,0],moment=0,expanded=[0,0],mass=0,diag=[0,0],same=[0,0],cross=[0,0];
 for(const key of ms){const m=BigInt(key),alpha=leftCoef(g*m,D,k,ps);if(!alpha)continue;
  for(let n=N+1n;n<=2n*N;n++)if(bgcd(m,n)===1n){const inverse=inv(m,n);
   for(const h0 of hs){const h=BigInt(h0),term=mul(cH(h0,T,A),mul(phase(-(2n/g)*h*inverse,n),phi(h,m,n,g,x,z,0n)));direct=plus(direct,scale(mul(beta.get(n),term),alpha));}
  }
 }
 for(let d0=D/g0+1;d0<=2*D/g0;d0++){
  const d=BigInt(d0),indices=[];
  for(let i=0;i<ps.length;i++){
   if(d0%ps[i]===0){primeExclusions++;continue;}const m=d*powers[i];if(m<=M||m>2n*M)continue;
   for(const h0 of hs)indices.push({p:ps[i],power:powers[i],h:BigInt(h0),m,w:scale(cH(h0,T,A),Math.log(ps[i]))});
  }
  for(let n=N+1n;n<=2n*N;n++){
   const entries=indices.map(({h,m,w})=>{
    if(bgcd(n,m)!==1n){nonunits++;return[0,0];}
    const flipped=mul(phase((2n/g)*h*inv(n,m),m),phi(h,m,n,g,x,z,2n));
    const original=mul(phase(-(2n/g)*h*inv(m,n),n),phi(h,m,n,g,x,z,0n));close(flipped,original);reciprocityChecks++;
    const wrong=mul(phase((2n/g)*h*inv(n,m),m),phi(h,m,n,g,x,z,0n));maxWrongShift=Math.max(maxWrongShift,Math.sqrt(norm(minus(flipped,wrong))));
    return mul(w,flipped);
   });
   const Y=entries.reduce(plus,[0,0]);grouped=plus(grouped,scale(mul(beta.get(n),Y),-mu(g0*d0)));moment+=norm(Y);mass+=entries.reduce((s,v)=>s+Math.sqrt(norm(v)),0)**2;
   const inverses=new Map();
   for(let i=0;i<indices.length;i++)for(let j=0;j<indices.length;j++){
    const a=indices[i],b=indices[j],samePrime=a.p===b.p,c=d*(samePrime?a.power:a.power*b.power);if(bgcd(n,c)!==1n)continue;
    const r=(2n/g)*(samePrime?a.h-b.h:a.h*b.power-b.h*a.power),H=samePrime?bgcd(a.h-b.h,a.power):bgcd(a.h,a.power)*bgcd(b.h,b.power);
    assert.equal(bgcd(r,c),bgcd(r,d)*H);if(r!==0n&&H>1n)primePowerGcd++;if(r===0n&&!samePrime)zeroCross++;
    const ck=c.toString();if(!inverses.has(ck))inverses.set(ck,inv(n,c));const inverted=inverses.get(ck),residue=mod(r*inverted,c);
    if(c>BigInt(Number.MAX_SAFE_INTEGER)){largeModulus++;if(Number.isFinite(Number(r)*Number(inverted))&&BigInt(Math.round(((Number(r)*Number(inverted))%Number(c)+Number(c))%Number(c)))!==residue)numberFailures++;}
    const f=mul(phi(a.h,a.m,n,g,x,z,2n),conj(phi(b.h,b.m,n,g,x,z,2n)));
    const term=mul(mul(a.w,conj(b.w)),mul(phase(residue,c),f));close(term,mul(entries[i],conj(entries[j])));expanded=plus(expanded,term);pairChecks++;
    if(i===j)diag=plus(diag,term);else if(samePrime)same=plus(same,term);else cross=plus(cross,term);
   }
  }
 }
 close(direct,grouped,Math.sqrt(F2*(D/g0)*moment));close(expanded,[moment,0],mass);close(plus(plus(diag,same),cross),expanded,mass);
 assert(norm(grouped)<=F2*(D/g0)*moment+2e-8*Math.max(1,F2*(D/g0)*moment));near(cross[1],0,mass);momentChecks++;
 momentRows.push({k,ps,g:g0,N:N0,regime,phaseScale,R:R.toString(),A,T,hs,x:x.toString(),F2,direct,grouped,moment,diag,same,cross,mass});budget();
}
assert(Object.values(sectors).every(n=>n>0));assert(zeroCross>0&&primePowerGcd>0&&largeModulus>0&&numberFailures>0&&evenRight>0&&primeExclusions>0&&maxWrongShift>1e-4);
console.log(`moments: ${momentChecks} coefficient/Cauchy identities, ${pairChecks} exact pair phases, ${reciprocityChecks} shifted endpoint checks`);
console.log(`retained cases: ${zeroCross} cross-prime zero terms, ${primePowerGcd} nonzero prime-power gcd terms, ${evenRight} active even right divisors; sectors=${JSON.stringify(sectors)}`);
console.log(`precision controls: ${largeModulus} kernels above safe integer range, ${numberFailures} failures of Number residue arithmetic; omitted-shift error=${maxWrongShift.toFixed(8)}`);

function rat(n,d=1){n=BigInt(n);d=BigInt(d);const g=bgcd(n,d);return[n/g,d/g];}
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),times=(a,b)=>rat(a[0]*b[0],a[1]*b[1]),rs=(a,n,d=1)=>times(a,rat(n,d)),neg=a=>[-a[0],a[1]];
const sum=(...xs)=>xs.reduce(add,rat(0)),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],max=(a,b)=>cmp(a,b)>0n?a:b,fmt=a=>`${a[0]}/${a[1]}`;
const w=rat(6,25),v=rat(1,20),C=(a,b)=>sum(rat(3,20),rs(add(a,b),7,10),rs(max(a,b),1,4));
function bounds(a,b){const W=sum(rs(a,5,4),rs(b,1,2),rs(w,1,4));return [sum(C(a,b),rs(w,-1,2)),W,sum(rat(1,2),rs(add(a,b),1,2),rs(w,-1,2)),sum(b,rs(a,1,2),rs(w,-1,2)),sum(W,rs(w,-1,2)),sum(W,rs(w,-3,4)),sum(C(a,b),rs(w,-7,10))];}
const a=rat(487,1000),b=rat(331,500),exampleBounds=bounds(a,b),corner=[rat(816,1675),rat(1109,1675)],cornerBounds=bounds(...corner);
assert.deepEqual(exampleBounds,[rat(4999,5000),rat(3999,4000),rat(1909,2000),rat(1571,2000),rat(3519,4000),rat(3279,4000),rat(4759,5000)]);
assert.deepEqual(cornerBounds.slice(0,2),[rat(1),rat(1)]);for(const z of exampleBounds)assert(cmp(sum(z,rat(5,100000)),rat(1))<0n);
const productSup=sum(...corner,neg(w),neg(v));assert.deepEqual(productSup,rat(5757,6700));
assert.deepEqual(sum(rs(rat(14),3,67),rs(rat(5),5,67)),rat(1));assert.deepEqual(sum(rs(rat(19),3,67),rs(rat(2),5,67)),rat(1));
assert.deepEqual(sum(rs(rat(97,5),3,67),rs(rat(94,25),5,67)),rat(77,67));
// These identities verify the two nonlimiting terms using only W_L<1 and a>2w.
assert.deepEqual(sum(rat(2),rs(w,-7,2)),rat(29,25));assert.deepEqual(sum(rat(1,2),rs(rat(29,25),1,2),rs(w,-1,2)),rat(24,25));
assert.deepEqual(sum(rat(2),rs(w,-5)),rat(4,5));assert.deepEqual(sum(rs(sum(rat(28,25),rat(-3,20)),25,22),rs(w,-1,2)),rat(2161,2200));
let sectorChecks=0;const sectorRows=[];
const rightTypes=[{s:b,n:rs(b,1,2),name:'Q'},{s:b,n:sum(rs(b,1,2),rs(v,-1,4)),name:'B'},{s:sum(b,neg(v)),n:rs(sum(b,neg(v)),1,2),name:'L'}];
for(const left of [{s:a,n:rs(sum(a,neg(w)),1,2),name:'B_exc'},{s:sum(a,neg(w)),n:rs(sum(a,neg(w)),1,2),name:'L_or_Q2'}])for(const r of rightTypes){
 const first=sum(rat(3,20),left.n,r.n,rs(add(left.s,r.s),1,5),rs(max(left.s,r.s),1,4)),second=sum(left.n,r.n,rs(add(left.s,r.s),3,8),rs(max(left.s,r.s),1,8));
 assert(cmp(sum(first,rat(5,100000)),rat(1))<0n);assert(cmp(sum(second,rat(5,100000)),rat(1))<0n);sectorChecks+=2;sectorRows.push({left:left.name,right:r.name,first:fmt(first),second:fmt(second)});
}
const oldBB=sum(C(a,b),rs(sum(w,v),-1,4)),oldDiagonal=sum(a,b,rs(w,-1,2));assert(cmp(oldBB,rat(1))>0n);assert(cmp(oldDiagonal,rat(1))>0n);
console.log(`rational budgets: ${exampleBounds.map(fmt).join(',')}; ${sectorChecks} paired-sector checks; product supremum=${fmt(productSup)}`);
console.log(`old-bound controls: BB=${fmt(oldBB)}, unpaired diagonal=${fmt(oldDiagonal)}; these insufficient bounds are replaced, not assumed small`);
const artifact={schema:1,producer:'research/prime-power-dispersion-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256,limit,decompositionChecks,exceptionCount,coreCount,coefficientRows,harmonicChecks,collisionChecks,harmonicRows,momentChecks,pairChecks,reciprocityChecks,zeroCross,primePowerGcd,largeModulus,numberFailures,primeExclusions,evenRight,nonunits,sectors,maxWrongShift,momentRows,exampleBounds:exampleBounds.map(fmt),corner:corner.map(fmt),cornerBounds:cornerBounds.map(fmt),productSup:fmt(productSup),sectorChecks,sectorRows};
fs.writeFileSync(path.join(__dirname,'data-reuse/prime-power-dispersion.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/prime-power-dispersion.json. Finite identities only; no asymptotic rate or twin lower bound measured.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/prime-power-dispersion-validation.js
//   invocation:  node research/prime-power-dispersion-validation.js
//   code-sha256: 07d50465cb3a4a2ac71286fde921aca3019f7de9147250648ba7763bdd2d6bc8
//   out-sha256:  9479c95e7ed79b4c22b182bac1d8edf7d74f131fda14f5fa41fc0c21ac4d986f
//   body-lines:  9
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     3.3 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// decomposition: 1883736 B identities through 1048576; 14769 exceptional and 11120 odd-power nonzero entries
// harmonics: 1152 prime-power gcd/counting checks; 15 distinct-prime collision counts; powers through 8
// moments: 80 coefficient/Cauchy identities, 1434208 exact pair phases, 197736 shifted endpoint checks
// retained cases: 10612 cross-prime zero terms, 217616 nonzero prime-power gcd terms, 340 active even right divisors; sectors={"L0":160,"L1":160,"Q":480,"B":620}
// precision controls: 56368 kernels above safe integer range, 55284 failures of Number residue arithmetic; omitted-shift error=0.11336013
// rational budgets: 4999/5000,3999/4000,1909/2000,1571/2000,3519/4000,3279/4000,4759/5000; 12 paired-sector checks; product supremum=5757/6700
// old-bound controls: BB=10473/10000, unpaired diagonal=1029/1000; these insufficient bounds are replaced, not assumed small
// Saved data-reuse/prime-power-dispersion.json. Finite identities only; no asymptotic rate or twin lower bound measured.
// ============================================================================
// READINGS
// The script checks finite algebra and rational budgets. The companion note
// separately derives the asymptotic estimate from the named classical inputs.
