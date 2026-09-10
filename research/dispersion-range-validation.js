// DISPERSION RANGE — reciprocal endpoints, averaged gcd and full coefficient scope.
// Finite algebra and rational budgets; the companion owns the asymptotic proof.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);console.log(`input: data-reuse/factor-windows.json sha256=${sourceSha256}`);
function factor(n){assert(n>0);const out=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let a=0;do{n/=p;a++;}while(n%p===0);out.push([p,a]);}if(n>1)out.push([n,1]);return out;}
const mu=n=>{const f=factor(n);return f.some(([,a])=>a>1)?0:(-1)**f.length;},tau=n=>factor(n).reduce((s,[,a])=>s*(a+1),1);
function divisors(n){let ds=[1];for(const[p,a]of factor(n)){const old=ds.slice();let q=1;for(let j=0;j<a;j++){q*=p;ds.push(...old.map(d=>d*q));}}return ds;}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
const mod=(a,c)=>((a%c)+c)%c;
function inv(a,c){if(c===1)return 0;let b=c,u=1,v=0;while(b){const k=Math.floor(a/b);[a,b]=[b,a-k*b];[u,v]=[v,u-k*v];}assert.equal(a,1);return mod(u,c);}
const plus=(a,b)=>[a[0]+b[0],a[1]+b[1]],times=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const scale=(a,s)=>[a[0]*s,a[1]*s],minus=(a,b)=>plus(a,scale(b,-1)),conj=a=>[a[0],-a[1]],abs2=a=>a[0]**2+a[1]**2;
const phase=(a,c=1)=>{const v=2*Math.PI*mod(a,c)/c;return[Math.cos(v),Math.sin(v)];};
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-9*Math.max(1,mass),`${a} != ${b}`);}
const close=(a,b,mass=1)=>{near(a[0],b[0],mass);near(a[1],b[1],mass);},inside=(n,D)=>D<n&&n<=2*D;
function vaaler(h,T){const v=h/(T+1),W=Math.PI*v*(1-v)/Math.tan(Math.PI*v)+v;return[0,W/(2*Math.PI*h)];}
function phi(h,m,n,g,x,z,shift){const c=g*m*n;return minus(phase(h*(x/2-shift),c),phase(h*(z-shift),c));}

let gcdChecks=0,nontrivialGcd=0;const gcdExamples=[];
for(const D of [1,2,7,24,64,257])for(const r of [...Array.from({length:300},(_,i)=>i+1),2310,30030,510510,9699690]){
  let first=0,half=0,majorant=0;const ds=divisors(r);
  for(let d=D+1;d<=2*D;d++){const G=gcd(r,d);first+=G;half+=Math.sqrt(G);if(G>1)nontrivialGcd++;}
  for(const s of ds)if(s<=2*D)majorant+=Math.sqrt(s)*(Math.floor(2*D/s)-Math.floor(D/s));
  assert(half<=majorant+1e-8);assert(majorant<=3*D*tau(r)+1e-8);assert(first<=3*D*tau(r));gcdChecks+=3;
  if(r===30030)gcdExamples.push({D,r,half,first,majorant,bound:3*D*tau(r)});
}
const zeroRatios=[64,128].map(D=>{let s=0;for(let d=D+1;d<=2*D;d++)s+=gcd(0,d);return s/D;});
assert.deepEqual(zeroRatios,[96.5,192.5]);assert(nontrivialGcd>0);
console.log(`gcd average: ${gcdChecks} inequalities; ${nontrivialGcd} nontrivial gcd terms; r=0 control has sum(gcd)/D=${zeroRatios.join(',')}`);

function rightCoefficients(l,E,Z){
  const A0=inside(l,E)?mu(l):0,L1=-A0*Math.log(l);let A1=L1,Q=0;
  for(const p of saved.basePrimes){if(p>Z)break;
    for(let q=p;q<=Z;q*=p)if(l%q===0&&inside(l/q,E))A1-=mu(l/q)*Math.log(p);
    if(l>2*E&&l%p===0&&inside(l/p,E))Q+=mu(l)*Math.log(p);
  }
  const B=mu(l)===0?A1:0;near(A1,L1+Q+B);assert(Math.abs(A1)<=2*Math.log(l)+1e-9);
  return{A0,A1,L1,Q,B,beta:[A1+2*A0,A0]};
}
let reciprocityChecks=0,momentChecks=0,pairChecks=0,nonunitExclusions=0,primeDivisorExclusions=0,parityZeros=0,nontrivialPairGcd=0;
const sectorCounts={A0:0,L1:0,Q:0,B:0},pairCounts={diagonal:0,samePrime:0,crossPrime:0},examples=[];
let wrongShiftMax=0,coefficientChecks=0;
for(const g of [1,2])for(const baseN of [16,128,256])for(const endpoint of [1,.75]){
  const D=48,E=24,Z=13,M=g===1?1024:512,N=baseN/g,x=262144,z=endpoint*x,T=6,ps=[17,19],hs=[1,2,3];
  const beta=new Map();let norm=0;
  for(let n=N+1;n<=2*N;n++){const c=rightCoefficients(g*n,E,Z);coefficientChecks++;for(const key of Object.keys(sectorCounts))if(c[key])sectorCounts[key]++;beta.set(n,c.beta);norm+=abs2(c.beta);}
  if(g===2&&N===64){const witness=rightCoefficients(132,E,Z);near(witness.B,-Math.log(2));close(beta.get(66),[-Math.log(2),0]);}
  assert(norm>0);let original=[0,0],reversed=[0,0],totalMoment=0,expanded=[0,0],mass=0;const localCounts={diagonal:0,samePrime:0,crossPrime:0};
  const dCount=D/g;
  for(let d=D/g+1;d<=2*D/g;d++){
    if(g===2&&d%2===0){assert.equal(mu(g*d),0);parityZeros++;}
    const P=ps.filter(p=>{if(d%p===0){primeDivisorExclusions++;return false;}return inside(d*p,M);});
    const indices=P.flatMap(p=>hs.map(h=>({p,h,w:scale(vaaler(h,T),Math.log(p))})));
    for(let n=N+1;n<=2*N;n++){
      const entries=indices.map(({p,h,w})=>{
        const m=d*p;if(gcd(n,m)!==1){nonunitExclusions++;return[0,0];}
        const c=g*m*n,left=mod(-2*h*m*inv(m,n)+h*z,c),right=mod(2*h*n*inv(n,m)+h*(z-2),c);
        assert.equal(left,right);reciprocityChecks++;
        const old=times(phase(-(2/g)*h*inv(m,n),n),phi(h,m,n,g,x,z,0));
        const flipped=times(phase((2/g)*h*inv(n,m),m),phi(h,m,n,g,x,z,2));close(old,flipped);
        const wrong=times(phase((2/g)*h*inv(n,m),m),phi(h,m,n,g,x,z,0));wrongShiftMax=Math.max(wrongShiftMax,Math.sqrt(abs2(minus(old,wrong))));
        original=plus(original,scale(times(beta.get(n),times(w,old)),-mu(g*d)));
        return times(w,flipped);
      });
      const Y=entries.reduce(plus,[0,0]);reversed=plus(reversed,scale(times(beta.get(n),Y),-mu(g*d)));totalMoment+=abs2(Y);
      mass+=entries.reduce((s,v)=>s+Math.sqrt(abs2(v)),0)**2;
      for(let i=0;i<indices.length;i++)for(let j=0;j<indices.length;j++){
        const a=indices[i],b=indices[j],same=a.p===b.p,c=d*(same?a.p:a.p*b.p);if(gcd(n,c)!==1)continue;
        const r=(2/g)*(same?a.h-b.h:a.h*b.p-b.h*a.p),G=gcd(r,c),diagonal=same&&a.h===b.h;
        assert.equal(r===0,diagonal);if(!diagonal){assert.equal(G,gcd(r,d));assert.equal(gcd(r,same?a.p:a.p*b.p),1);if(G>1)nontrivialPairGcd++;}
        const old=mod((2/g)*a.h*inv(n,d*a.p)*(c/(d*a.p))-(2/g)*b.h*inv(n,d*b.p)*(c/(d*b.p)),c);
        assert.equal(old,mod(r*inv(n,c),c));pairChecks++;
        const F=times(phi(a.h,d*a.p,n,g,x,z,2),conj(phi(b.h,d*b.p,n,g,x,z,2)));
        const term=times(times(a.w,conj(b.w)),times(phase(r*inv(n,c),c),F));close(term,times(entries[i],conj(entries[j])));
        expanded=plus(expanded,term);const kind=diagonal?'diagonal':same?'samePrime':'crossPrime';pairCounts[kind]++;localCounts[kind]++;
      }
    }
  }
  close(original,reversed,Math.sqrt(norm*dCount*totalMoment));close(expanded,[totalMoment,0],mass);
  assert(abs2(reversed)<=norm*dCount*totalMoment+1e-8*Math.max(1,norm*dCount*totalMoment));momentChecks++;
  examples.push({g,D,E,Z,M,N,x,z,T,ps,hs,original,reversed,totalMoment,expanded,norm,dCount,pairCounts:localCounts});
}
assert(Object.values(sectorCounts).every(n=>n>0));assert(wrongShiftMax>1e-4&&nontrivialPairGcd>0&&primeDivisorExclusions>0&&parityZeros>0);
console.log(`coefficients: ${coefficientChecks} A1 decompositions; right sectors ${JSON.stringify(sectorCounts)}; ${parityZeros} gcd=2 parity zeros`);
console.log(`reciprocity: ${reciprocityChecks} shifted endpoint identities; omitted-shift maximum error=${wrongShiftMax.toFixed(9)}`);
console.log(`moments: ${momentChecks} endpoint-dependent identities, ${pairChecks} exact pair phases; pair classes=${JSON.stringify(pairCounts)}`);
console.log(`restrictions: ${nonunitExclusions} nonunit exclusions, ${primeDivisorExclusions} p-divides-d exclusions, ${nontrivialPairGcd} off-diagonal nontrivial gcd terms retained`);

function bgcd(a,b){a=a<0n?-a:a;while(b)[a,b]=[b,a%b];return a;}
function r(n,d=1){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return[n/g,d/g];}
const add=(a,b)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),mul=(a,b)=>r(a[0]*b[0],a[1]*b[1]),sub=(a,b)=>add(a,[-b[0],b[1]]);
const rs=(a,n,d=1)=>mul(a,r(n,d)),sum=(...a)=>a.reduce(add,r(0)),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],fmt=a=>`${a[0]}/${a[1]}`,max=(a,b)=>cmp(a,b)>0n?a:b;
const C=(a,b)=>sum(r(3,20),rs(add(a,b),7,10),rs(max(a,b),1,4)),w=r(6,25),v=r(1,20),kappa=r(3,25),smallTau=r(1,100000);
function budgets(a,b){return [sub(C(a,b),rs(w,1,4)),C(add(sub(a,w),kappa),b),sub(add(a,b),rs(w,1,2)),
  sum(rs(a,5,4),rs(b,1,2),rs(w,1,4)),sum(rs(a,5,4),rs(b,1,2),rs(w,-1,2)),sum(b,rs(a,1,2),rs(w,-1,2))];}
const balanced=budgets(r(537,1000),r(537,1000)),unbalanced=budgets(r(261,500),r(143,250));
assert.deepEqual(balanced,[r(19521,20000),r(19041,20000),r(477,500),r(3999,4000),r(3279,4000),r(1371,2000)]);
assert.deepEqual(unbalanced,[r(2497,2500),r(2437,2500),r(487,500),r(1997,2000),r(1637,2000),r(713,1000)]);
for(const a of [r(537,1000),r(261,500)]){const b=a[0]===537n?a:r(143,250),T=sum(a,b,r(-1),rs(smallTau,2));assert(cmp(T,kappa)<0n);for(const x of budgets(a,b))assert(cmp(add(x,rs(smallTau,5)),r(1))<0n);}
const boundary=r(94,175),atBoundary=budgets(boundary,boundary);assert.deepEqual(atBoundary.slice(0,3),[r(3417,3500),r(3333,3500),r(167,175)]);assert.deepEqual(atBoundary[3],r(1));
assert.deepEqual(sub(rs(boundary,2),add(w,v)),r(549,700));assert.deepEqual(budgets(r(269,500),r(269,500))[3],r(2003,2000));
const corner=[r(876,1675),r(959,1675)],cornerBudgets=budgets(...corner);
assert.deepEqual(cornerBudgets[0],r(1));assert.deepEqual(cornerBudgets[3],r(1));assert.deepEqual(cornerBudgets[1],r(122,125));
const productSup=sub(add(...corner),add(w,v));assert.deepEqual(productSup,r(5397,6700));
// The linear-combination certificate bounds a+b; it does not enumerate integers.
assert.deepEqual(sum(rs(r(14),3,67),rs(r(5),5,67)),r(1));assert.deepEqual(sum(rs(r(19),3,67),rs(r(2),5,67)),r(1));
assert.deepEqual(sum(rs(r(91,5),3,67),rs(r(94,25),5,67)),r(367,335));
const oldBoundary=r(317,610),oldLow=s=>rs(sub(r(3),rs(s,5)),1,14),oldHigh=s=>sub(rs(s,4),r(41,20));
assert.deepEqual(oldLow(oldBoundary),oldHigh(oldBoundary));assert.deepEqual(sub(oldHigh(r(13,25)),oldLow(r(13,25))),r(1,700));
let sectorChecks=0;const sectorBudgets=[];
for(const [a,b]of [[r(537,1000),r(537,1000)],[r(261,500),r(143,250)]]){
  const delta=sub(a,w),nu=sub(b,v),types=(size,cut)=>[{label:'L0',s:sub(size,cut),n:rs(sub(size,cut),1,2)},{label:'L1',s:sub(size,cut),n:rs(sub(size,cut),1,2)},
    {label:'Q',s:size,n:rs(size,1,2)},{label:'B',s:size,n:sub(rs(size,1,2),rs(cut,1,4))}];
  for(const l of types(a,w))for(const z of types(b,v))if(l.label!=='Q'){
    const first=sum(r(3,20),l.n,z.n,rs(add(l.s,z.s),1,5),rs(max(l.s,z.s),1,4)),second=sum(l.n,z.n,rs(add(l.s,z.s),3,8),rs(max(l.s,z.s),1,8));
    assert(cmp(add(first,rs(smallTau,3)),r(1))<0n);assert(cmp(add(second,rs(smallTau,3)),r(1))<0n);sectorChecks+=2;
    sectorBudgets.push({delta:fmt(delta),nu:fmt(nu),left:l.label,right:z.label,first:fmt(first),second:fmt(second)});
  }
}
console.log(`rational budgets balanced: ${balanced.map(fmt).join(',')}; unbalanced: ${unbalanced.map(fmt).join(',')}; ${sectorChecks} non-Q sector checks`);
console.log(`boundaries: balanced s=${fmt(boundary)}, product=549/700; region product supremum=${fmt(productSup)}; old cutoff overlap ends at ${fmt(oldBoundary)}`);
console.log('scope controls: old split at s=0.52 has gap=1/700; new cross-prime budget at s=0.538 is 2003/2000; neither is an impossibility claim');
const artifact={schema:1,producer:'research/dispersion-range-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256,
  gcdChecks,nontrivialGcd,gcdExamples,zeroRatios,coefficientChecks,sectorCounts,reciprocityChecks,wrongShiftMax,momentChecks,pairChecks,pairCounts,nonunitExclusions,primeDivisorExclusions,parityZeros,nontrivialPairGcd,examples,
  budgets:{balanced:balanced.map(fmt),unbalanced:unbalanced.map(fmt),boundary:fmt(boundary),corner:corner.map(fmt),productSup:fmt(productSup),oldBoundary:fmt(oldBoundary)},sectorChecks,sectorBudgets};
fs.writeFileSync(path.join(__dirname,'data-reuse/dispersion-range.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/dispersion-range.json. No asymptotic rate, uniform product cutoff or twin lower bound measured.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/dispersion-range-validation.js
//   invocation:  node research/dispersion-range-validation.js
//   code-sha256: 6dbd72cbc1802e4bb8153d7abffc5908ec6bd5ae3c3c0b460076562c91dc5a10
//   out-sha256:  8c204aee96b2a06b98d8ee0eef4d22033fd32a24e1de8717a559557823102544
//   body-lines:  10
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     1.5 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// gcd average: 5472 inequalities; 42976 nontrivial gcd terms; r=0 control has sum(gcd)/D=96.5,192.5
// coefficients: 1200 A1 decompositions; right sectors {"A0":12,"L1":12,"Q":134,"B":166}; 72 gcd=2 parity zeros
// reciprocity: 127068 shifted endpoint identities; omitted-shift maximum error=0.007859081
// moments: 12 endpoint-dependent identities, 693684 exact pair phases; pair classes={"diagonal":127068,"samePrime":254136,"crossPrime":312480}
// restrictions: 96132 nonunit exclusions, 48 p-divides-d exclusions, 199400 off-diagonal nontrivial gcd terms retained
// rational budgets balanced: 19521/20000,19041/20000,477/500,3999/4000,3279/4000,1371/2000; unbalanced: 2497/2500,2437/2500,487/500,1997/2000,1637/2000,713/1000; 48 non-Q sector checks
// boundaries: balanced s=94/175, product=549/700; region product supremum=5397/6700; old cutoff overlap ends at 317/610
// scope controls: old split at s=0.52 has gap=1/700; new cross-prime budget at s=0.538 is 2003/2000; neither is an impossibility claim
// Saved data-reuse/dispersion-range.json. No asymptotic rate, uniform product cutoff or twin lower bound measured.
// ============================================================================
// READINGS
// The checks validate finite identities and exact rational budgets. The bound
// for a region of rectangles is the separate classical-input derivation.
