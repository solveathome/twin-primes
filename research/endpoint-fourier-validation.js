// ENDPOINT FOURIER — aggregated divisor coefficients, Vaaler tails and exponents.
// Companion: research/endpoint-fourier.md. Finite checks do not test asymptotics.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const bytes = fs.readFileSync(path.join(__dirname, 'data-reuse/factor-windows.json'));
const saved = JSON.parse(bytes);
const hash = crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema, 1);
console.log(`input: data-reuse/factor-windows.json sha256=${hash}`);

function factor(n) {
  const out = [];
  for (const p of saved.basePrimes) {
    if (p*p > n) break;
    if (n%p) continue;
    let a=0; do { n/=p; a++; } while (n%p===0);
    out.push([p,a]);
  }
  if (n>1) out.push([n,1]);
  return out;
}
function divisors(f) {
  let ds=[1];
  for (const [p,a] of f) {
    const base=ds.slice(); let power=1;
    for(let j=1;j<=a;j++) { power*=p; ds.push(...base.map(d=>d*power)); }
  }
  return ds;
}
const mu = n => { const f=factor(n); return f.some(([,a])=>a>1)?0:(-1)**f.length; };
function add(dst,src,c=1) {
  for(const [p,v] of src) { const w=(dst.get(p)||0)+c*v; if(w)dst.set(p,w);else dst.delete(p); }
}
const logVector = n => new Map(factor(n));
function betaVector(n,W) {
  const v=new Map();
  for(const [p,a] of factor(n)) {
    let power=1;
    for(let j=1;j<=a;j++) { power*=p; if(power>W)v.set(p,(v.get(p)||0)+1); }
  }
  return v;
}
const value = v => [...v].reduce((s,[p,c])=>s+c*Math.log(p),0);
const sorted = v => [...v].sort((a,b)=>a[0]-b[0]);
function coefficients(lo,hi,W) {
  const C=Array.from({length:hi*W+1},()=>({zero:0,one:new Map()}));
  for(let d=lo+1;d<=hi;d++) {
    const md=mu(d); C[d].zero=md; add(C[d].one,logVector(d),-md);
    for(const p of saved.basePrimes) {
      if(p>W)break;
      for(let r=p;r<=W;r*=p) add(C[d*r].one,new Map([[p,1]]),-md);
    }
  }
  for(let a=2;a<C.length;a++) {
    const l1=[...C[a].one].reduce((s,[p,c])=>s+Math.abs(c)*Math.log(p),0);
    assert(l1<=2*Math.log(a)+1e-12,'aggregated coefficient norm');
  }
  return C;
}
let aggregationChecks=0;
for(const [lo,hi,W] of [[1,11,1],[7,24,6],[12,48,4],[23,65,16]]) {
  const C=coefficients(lo,hi,W);
  for(let n=2;n<=4096;n++) {
    const original=new Map(), contracted=new Map(), ds=divisors(factor(n));
    for(const d of ds) if(d>lo&&d<=hi) add(original,betaVector(n/d,W),mu(d));
    for(const a of ds) if(a<C.length) {
      add(contracted,logVector(n),C[a].zero); add(contracted,C[a].one);
    }
    assert.deepEqual(sorted(original),sorted(contracted),`coefficient identity n=${n}`);
    aggregationChecks++;
  }
}
console.log(`aggregation: ${aggregationChecks} exact log-prime coefficient identities; prime powers and cutoff zeros included`);

const mod=(n,q)=>((n%q)+q)%q;
function gcd(a,b) { while(b)[a,b]=[b,a%b]; return a; }
function inv(a,q) {
  if(q===1)return 0;
  let r=a,s=q,u=1,v=0;
  while(s) { const z=Math.floor(r/s); [r,s]=[s,r-z*s]; [u,v]=[v,u-z*v]; }
  assert.equal(r,1); return mod(u,q);
}
function crt(a,b) {
  const g=gcd(a,b); if(2%g)return null;
  const m=a/g,n=b/g,j=mod((2/g)*inv(m,n),n);
  return {g,m,n,q:g*m*n,origin:a*j};
}
function near(a,b,scale=1) { assert(Math.abs(a-b)<=2e-10*Math.max(1,scale),`${a} != ${b}`); }
function W(t) { return Math.PI*t*(1-t)/Math.tan(Math.PI*t)+t; }
function vaaler(num,q,H) {
  const u=mod(num,q)/q;
  let approx=0,poly=1;
  for(let h=1;h<=H;h++) {
    const angle=2*Math.PI*mod(h*mod(num,q),q)/q;
    approx-=W(h/(H+1))*Math.sin(angle)/(Math.PI*h);
    poly+=2*(1-h/(H+1))*Math.cos(angle);
  }
  const delta=u===0?0.5:0.5*(Math.sin(Math.PI*(H+1)*u)/((H+1)*Math.sin(Math.PI*u)))**2;
  near(poly/(2*(H+1)),delta);
  const actual=u-0.5;
  assert(Math.abs(actual-approx)<=delta+2e-11,'Vaaler endpoint bound');
  return {approx,delta,actual};
}
let vaalerChecks=0;
for(const H of [1,2,4,8,16,64]) for(let q=1;q<=64;q++) for(let k=0;k<2*q;k++) {
  vaaler(k,2*q,H); vaalerChecks++;
}
let phaseChecks=0,g2=0;
for(let a=1;a<=64;a++)for(let b=1;b<=64;b++) {
  const c=crt(a,b); if(!c)continue;
  if(c.g===2)g2++;
  assert.equal(c.origin%a,0); assert.equal(mod(c.origin-2,b),0);
  for(const t of [0,17,64,128]) {
    const direct=BigInt(t-c.origin), separated=BigInt(t)-2n*BigInt(c.m)*BigInt(inv(c.m,c.n));
    assert.equal((direct-separated)%BigInt(c.q),0n); phaseChecks++;
    const count=Math.floor((t-c.origin)/c.q)-Math.floor(-c.origin/c.q);
    assert.equal(c.q*count-t,mod(-c.origin,c.q)-mod(t-c.origin,c.q));
  }
}
console.log(`Vaaler: ${vaalerChecks} endpoint tests including integers; CRT: ${phaseChecks} exact phase tests, ${g2} gcd=2 cells`);

// A finite witness against dropping every nonconstant term of the majorant.
const witness=crt(5,7),wa=vaaler(29-witness.origin,witness.q,4),wb=vaaler(30-witness.origin,witness.q,4);
const witnessError=Math.abs((wa.actual-wb.actual)-(wa.approx-wb.approx));
assert(witnessError>1/5); assert(witnessError<=wa.delta+wb.delta+1e-12);
console.log(`tail witness a=5 b=7 interval=(29,30] H=4: actual truncation error=${witnessError.toFixed(9)} > zero-mode-only allowance=0.200000000; full majorant=${(wa.delta+wb.delta).toFixed(9)}`);

// A full rectangle: direct factor enumeration, compressed CRT counts, density,
// and all four weighted Abel identities. Neither density nor error is set to zero.
const x=512,lower=x/2,C=coefficients(7,24,6),D=coefficients(12,48,4);
let direct=0,absolute=0;
for(let n=lower+1;n<=x;n++) {
  let a=0,b=0;
  for(const d of divisors(factor(n)))if(d>7&&d<=24)a+=mu(d)*value(betaVector(n/d,6));
  for(const e of divisors(factor(n-2)))if(e>12&&e<=48)b+=mu(e)*value(betaVector((n-2)/e,4));
  direct+=a*b; absolute+=Math.abs(a*b);
}
let compressed=0,density=0,abel=0,cells=0;
const compressedParts=[0,0,0,0],densityParts=[0,0,0,0],abelParts=[0,0,0,0],partMass=[0,0,0,0];
const logs=Array.from({length:x+1},(_,n)=>n>=3?[Math.log(n),Math.log(n-2)]:[0,0]);
const moments=[0,0,0,0];
for(let n=lower+1;n<=x;n++)for(let i=0;i<2;i++)for(let j=0;j<2;j++)moments[2*i+j]+=logs[n][0]**i*logs[n][1]**j;
for(let a=1;a<C.length;a++)if(C[a].zero||C[a].one.size)for(let b=1;b<D.length;b++)if(D[b].zero||D[b].one.size) {
  const c=crt(a,b);if(!c)continue;cells++;
  const ca=[value(C[a].one),C[a].zero],cb=[value(D[b].one),D[b].zero];
  for(let n=c.origin+Math.ceil((lower+1-c.origin)/c.q)*c.q;n<=x;n+=c.q) {
    compressed+=(ca[0]+ca[1]*logs[n][0])*(cb[0]+cb[1]*logs[n][1]);
    for(let i=0;i<2;i++)for(let j=0;j<2;j++) {
      const term=ca[i]*cb[j]*logs[n][0]**i*logs[n][1]**j;
      compressedParts[2*i+j]+=term;partMass[2*i+j]+=Math.abs(term);
    }
  }
  for(let i=0;i<2;i++)for(let j=0;j<2;j++) {
    const coeff=ca[i]*cb[j]; if(!coeff)continue;
    density+=coeff*moments[2*i+j]/c.q;
    densityParts[2*i+j]+=coeff*moments[2*i+j]/c.q;
    const weight=n=>logs[n][0]**i*logs[n][1]**j;
    const delta=n=>(mod(lower-c.origin,c.q)-mod(n-c.origin,c.q))/c.q;
    let error=weight(x)*delta(x);
    for(let n=lower+1;n<x;n++) error-=delta(n)*(weight(n+1)-weight(n));
    abel+=coeff*error;
    abelParts[2*i+j]+=coeff*error;
  }
}
near(direct,compressed,absolute);near(compressed-density,abel,absolute+Math.abs(density));
for(let j=0;j<4;j++)near(compressedParts[j]-densityParts[j],abelParts[j],partMass[j]+Math.abs(densityParts[j]));
console.log(`compressed CRT rectangle x=${x}: ${cells} cells; direct=${direct.toFixed(9)} density=${density.toFixed(9)} endpoint=${abel.toFixed(9)}; four weighted Abel identities reproduced`);

function powFloor(n,a,b) {
  let r=Math.floor(n**(a/b)); const goal=BigInt(n)**BigInt(a);
  while(BigInt(r+1)**BigInt(b)<=goal)r++;
  while(BigInt(r)**BigInt(b)>goal)r--;
  return r;
}
const windows=[];
for(const w of saved.windows) {
  const {x}=w,loD=powFloor(x,27,100),loE=powFloor(x,46,100);
  const V=powFloor(x,6,25),Z=powFloor(x,1,20),L=powFloor(x,7,10);
  let signed=0,positive=0,negative=0,terms=0;
  const get=n=>w.primePowerFactors[n-w.factorStart];
  for(let n=w.lo;n<=w.hi;n++) {
    const ds=divisors(get(n)),es=divisors(get(n-2));
    for(const d of ds)if(d>loD&&d<=2*loD&&mu(d))for(const e of es)if(e>loE&&e<=2*loE&&mu(e)) {
      const weight=value(betaVector(n/d,V))*value(betaVector((n-2)/e,Z)); if(!weight)continue;
      assert(d*e>L);assert(d>V&&e>Z);assert(n/d>V&&(n-2)/e>Z);
      const sign=mu(d)*mu(e);signed+=sign*weight;if(sign>0)positive+=weight;else negative+=weight;terms++;
    }
  }
  near(signed,positive-negative,positive+negative);
  const partners=w.hi-w.lo+1;
  console.log(`archived q=${w.q} x=${x} d=(${loD},${2*loD}] e=(${loE},${2*loE}]: ${terms} active terms outside de<=L; signed/partner=${(signed/partners).toFixed(9)}`);
  windows.push({q:w.q,x,lo:w.lo,hi:w.hi,loD,hiD:2*loD,loE,hiE:2*loE,terms,signed,positive,negative,normalization:'per measured partner, not per x'});
}

// Rational arithmetic makes the new window and theorem shortfall reproducible.
function rat(n,d=1n) { n=BigInt(n);d=BigInt(d);const g=gcdBig(n<0n?-n:n,d);return [n/g,d/g]; }
function gcdBig(a,b) {while(b)[a,b]=[b,a%b];return a;}
const plus=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const times=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const minus=(a,b)=>plus(a,[-b[0],b[1]]);
const fmt=a=>`${a[0]}/${a[1]}`;
const max=(a,b)=>a[0]*b[1]>=b[0]*a[1]?a:b;
const beta=(a,b)=>plus(times(rat(17,20),plus(a,b)),times(rat(1,4),max(a,b)));
const a=rat(51,100),b=rat(51,100),beta1=beta(a,b),beta2=plus(times(rat(7,8),plus(a,b)),times(rat(1,8),max(a,b)));
assert.deepEqual(beta1,rat(1989,2000));assert.deepEqual(beta2,rat(153,160));
const tau=rat(1,1000),withLoss=plus(beta1,times(rat(2),tau)),endpoint=minus(rat(1),tau);
assert(withLoss[0]*endpoint[1]<endpoint[0]*withLoss[1]);
const frontier=minus(rat(40,39),rat(29,100));assert.deepEqual(frontier,rat(2869,3900));
const separateLoss=times(rat(1,2),plus(rat(6,25),rat(1,20))),separateBudget=plus(beta1,separateLoss);
assert.deepEqual(separateLoss,rat(29,200));assert.deepEqual(separateBudget,rat(2279,2000));
console.log(`exact exponent budget: expanded a=b=${fmt(a)}; first=${fmt(beta1)} second=${fmt(beta2)}; first+2tau=${fmt(withLoss)} < ${fmt(endpoint)} for tau=${fmt(tau)}`);
console.log(`separate prime-power first budget=${fmt(separateBudget)}; avoidable norm exponent=${fmt(separateLoss)}`);
console.log(`balanced divisor-product frontier=${fmt(frontier)} (strict); full-support first exponent=${fmt(beta(rat(1),rat(1)))}, not a bound below scale x`);
const artifact={schema:1,producer:'research/endpoint-fourier-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256:hash,aggregationChecks,vaalerChecks,phaseChecks,g2,tailWitness:{error:witnessError,constantOnly:1/5,fullMajorant:wa.delta+wb.delta},rectangle:{x,direct,density,endpoint:abel,cells},exponents:{first:fmt(beta1),second:fmt(beta2),tau:fmt(tau),withLoss:fmt(withLoss),endpoint:fmt(endpoint),frontier:fmt(frontier),separateBudget:fmt(separateBudget),separateLoss:fmt(separateLoss)},windows};
fs.writeFileSync(path.join(__dirname,'data-reuse/endpoint-fourier.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/endpoint-fourier.json. Finite checks only; no asymptotic rate or twin lower bound tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/endpoint-fourier-validation.js
//   invocation:  node research/endpoint-fourier-validation.js
//   code-sha256: fe75f2318919b77b8c4614401ab780dd82813014b6c0a72e6a3b43c3876b7c60
//   out-sha256:  396f4a40cc41728b7720ac68eff45f063e01e10748e64d5930dcc77b73fd4b1b
//   body-lines:  12
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.2 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// aggregation: 16380 exact log-prime coefficient identities; prime powers and cutoff zeros included
// Vaaler: 24960 endpoint tests including integers; CRT: 12664 exact phase tests, 647 gcd=2 cells
// tail witness a=5 b=7 interval=(29,30] H=4: actual truncation error=0.859687064 > zero-mode-only allowance=0.200000000; full majorant=0.968575681
// compressed CRT rectangle x=512: 2148 cells; direct=-30.000208187 density=2.597294617 endpoint=-32.597502804; four weighted Abel identities reproduced
// archived q=97 x=16384 d=(13,26] e=(86,172]: 128 active terms outside de<=L; signed/partner=0.287243931
// archived q=997 x=1048576 d=(42,84] e=(588,1176]: 594 active terms outside de<=L; signed/partner=-0.309379721
// archived q=9973 x=134217728 d=(156,312] e=(5480,10960]: 635 active terms outside de<=L; signed/partner=0.298340976
// exact exponent budget: expanded a=b=51/100; first=1989/2000 second=153/160; first+2tau=1993/2000 < 999/1000 for tau=1/1000
// separate prime-power first budget=2279/2000; avoidable norm exponent=29/200
// balanced divisor-product frontier=2869/3900 (strict); full-support first exponent=39/20, not a bound below scale x
// Saved data-reuse/endpoint-fourier.json. Finite checks only; no asymptotic rate or twin lower bound tested.
// ============================================================================
// READINGS
//
