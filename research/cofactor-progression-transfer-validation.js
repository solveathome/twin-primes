#!/usr/bin/env node
'use strict';
// Finite falsifiers for cofactor-progression-transfer.md.
// Tests Euler modifications, coprime multiplicativity, the signed cofactor
// expansion, repeated-large-prime errors, exact remainder bookkeeping and
// progression-density sampling. No source theorem or asymptotic rate is tested.
const assert = require('node:assert/strict');
const X=32768;
const ds=Array.from({length:X+1},()=>[]);
for(let d=1;d<=X;d++) for(let n=d;n<=X;n+=d) ds[n].push(d);
const primes=[]; const mu=Array(X+1).fill(1);
for(let p=2;p<=X;p++) if(ds[p].length===2){
  primes.push(p);
  for(let n=p;n<=X;n+=p) mu[n]*=-1;
  for(let n=p*p;n<=X;n+=p*p) mu[n]=0;
}
const factors=n=>ds[n].filter(p=>ds[p].length===2);
const val=(n,p)=>{let a=0;while(n%p===0){n/=p;a++;}return a;};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const near=(a,b,label)=>assert(Math.abs(a-b)<1e-8*(1+Math.abs(a)+Math.abs(b)),`${label}: ${a} != ${b}`);
// F_a(p^v): 1 at v=0; on primes dividing a, shifted Mobius values
// at v=e,e+1 and zero at every other positive v; ordinary mu elsewhere.
const F=(a,n)=>{
  let ans=1;
  for(const p of factors(n)){
    const v=val(n,p),e=val(a,p);
    ans*=e===0 ? (v===1?-1:0) : (v===e?1:v===e+1?-1:0);
  }
  return ans;
};
let eulerChecks=0,nonsquarefreeWitnesses=0,multChecks=0;
for(let a=1;a<=32;a++) for(let n=1;n<=2048;n++){
  assert(Math.abs(F(a,n))<=1);
  if(n%a===0){
    assert.equal(F(a,n)||0,mu[n/a]||0); eulerChecks++;
    if(mu[n]===0 && F(a,n)!==0) nonsquarefreeWitnesses++;
  }
}
assert(nonsquarefreeWitnesses>0);
for(const a of [1,2,4,6,8,12,18,30]) for(let m=1;m<=60;m++) for(let n=1;n<=60;n++) if(gcd(m,n)===1){
  assert.equal(F(a,m*n)||0,(F(a,m)*F(a,n))||0); multChecks++;
}
// F_a is not the desired dilated coefficient away from a|n.
assert.equal(F(4,1),1); assert.equal(1%4===0?mu[1/4]:0,0);
// Band additive weights agree on n and n/a only when band primes avoid a.
let bandChecks=0;
const weight=n=>factors(n).filter(p=>p>31).reduce((s,p)=>s+Math.log(p),0);
for(let a=1;a<=16;a++) for(let n=a;n<=2048;n+=a){near(weight(n),weight(n/a),'band cofactor removal');bandChecks++;}
assert(Math.log(2)>0); // Explicit failing shared-prime case: a=n=2, band={2}.
assert.notEqual(factors(2).filter(p=>p===2).length,factors(1).filter(p=>p===2).length);

const rho=(d,D,z)=>d<=D?1:d>=z?0:Math.log(z/d)/Math.log(z/D);
const profile=(d,c,type)=>type==='sharp'?(d>c.D?1:0):type==='transition'?(d>c.D&&d<c.z?rho(d,c.D,c.z):0):1-rho(d,c.D,c.z);
// Direct original divisor/cofactor expansion restricted to prime r and s<=H.
const raw=(n,c,type,H)=>{
  let sum=0;
  for(const d of ds[n]){
    const w=profile(d,c,type);if(!w||!mu[d])continue;
    const k=n/d;
    for(const p of factors(k)) if(p>c.W && k/p<=H) sum+=mu[d]*Math.log(p)*w;
  }
  return sum;
};
// Changed order, replacing mu(m/p) by -mu(m); the exceptional part is tested.
const lifted=(n,c,type,H)=>{
  let sum=0;
  for(const a of ds[n]) if(a<=H){
    const m=n/a;
    for(const p of factors(m)) if(p>c.W) sum-=mu[m]*Math.log(p)*profile(m/p,c,type);
  }
  return sum;
};
const repeated=(n,c)=>factors(n).some(p=>p>c.W&&n%(p*p)===0);
const sides=[{W:11,D:500,z:900},{W:7,D:800,z:1500}];
const H=3; let coefficientChecks=0,squareErrors=0,positiveSquareError=0,negativeSquareError=0;
const arrays={};
for(let side=0;side<2;side++) for(const type of ['sharp','transition','smooth']){
  const c=sides[side],b=side===0?0:2;
  assert(H<c.W && X/c.D<c.W*c.W);
  const vs=[],fs=[],full=[];
  for(let n=X/2-b+1;n<=X-b;n++){
    const a=raw(n,c,type,H),f=lifted(n,c,type,H);
    if(!repeated(n,c))near(a,f,'signed cofactor identity away from prime squares');
    if(Math.abs(a-f)>1e-8){assert(repeated(n,c));squareErrors++;if(a-f>0)positiveSquareError++;else negativeSquareError++;}
    vs[n]=a;fs[n]=f;full[n]=raw(n,c,type,Infinity);coefficientChecks++;
  }
  arrays[side+type]={raw:vs,lifted:fs,full};
}
assert(squareErrors>0 && positiveSquareError>0 && negativeSquareError>0);
let splitChecks=0,tailIdentityChecks=0,missingMixed=0;
for(let n=X/2+1;n<=X;n++){
  for(let side=0;side<2;side++){
    const m=n-(side===0?0:2);
    near(arrays[side+'sharp'].raw[m],arrays[side+'transition'].raw[m]+arrays[side+'smooth'].raw[m],'truncated four-piece split');splitChecks++;
  }
  for(const type of ['sharp','transition']){
    const L=arrays['0'+type],R=arrays['1'+type],a=L.raw[n],b=R.raw[n-2],u=L.full[n]-a,v=R.full[n-2]-b;
    near(L.full[n]*R.full[n-2]-a*b,a*v+u*b+u*v,'complete cofactor tail');tailIdentityChecks++;
    if(Math.abs(a*v+u*b)>1e-8)missingMixed++;
  }
}
assert(missingMixed>0);
// Exact cofactor CRT classes. These gcds are of a,b, not n,n-2 or d,e.
let crtChecks=0,evenClasses=0,incompatible=0;
for(let a=1;a<=12;a++)for(let b=1;b<=12;b++){
  const g=gcd(a,b),Q=a*b/g,res=[];
  for(let n=0;n<Q;n++)if(n%a===0 && ((n-2)%b+b)%b===0)res.push(n);
  if(2%g){assert.equal(res.length,0);incompatible++;continue;}
  assert.equal(res.length,1);if(g===2)evenClasses++;
  for(let n=3;n<=512;n++){
    assert.equal(n%a===0&&(n-2)%b===0,n%Q===res[0]);
    if(n%Q===res[0]){assert.equal(F(a,n)||0,mu[n/a]||0);assert.equal(F(b,n-2)||0,mu[(n-2)/b]||0);crtChecks++;}
  }
}
assert(evenClasses>0 && incompatible>0);
// An AP-supported bounded sum has stability O(h+Q/N) after normalization Q/N.
const avg=(N,Q,b)=>{
  let s=0;for(let n=Math.floor(N)+1;n<=Math.floor(2*N);n++)if(n%Q===b)s+=(n%3===0?-1:1);
  return Q*s/N;
};
let samplingChecks=0;
for(const N of [32,100,256])for(const Q of [1,2,7,16,64])for(const b of [0,1])for(const h of [.001,.03,.1]){
  assert(Math.abs(avg(N,Q,b)-avg((1+h)*N,Q,b))<=4*h+6*Q/N);samplingChecks++;
}
assert(Math.abs(avg(32,64,33)-avg(33.01,64,33))>4*(1.01/32));
console.log('Cofactor progression transfer finite controls: PASS');
console.log(`Euler identities: ${eulerChecks}; non-squarefree witnesses: ${nonsquarefreeWitnesses}; coprime multiplicativity checks: ${multChecks}; band-removal checks: ${bandChecks}`);
console.log(`Coefficient checks: ${coefficientChecks}; nonzero prime-square corrections: ${squareErrors} (positive ${positiveSquareError}, negative ${negativeSquareError})`);
console.log(`Pointwise profile splits: ${splitChecks}; complete tail identities: ${tailIdentityChecks}; omitted-mixed-term failures: ${missingMixed}`);
console.log(`CRT identities: ${crtChecks}; even cofactor classes: ${evenClasses}; incompatible pairs: ${incompatible}; AP sampling checks: ${samplingChecks}`);
console.log('Controls retain divisibility, prime powers, shared-prime restrictions, cofactor gcds, mixed tails and endpoint rounding. No analytic estimate or twin margin is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/cofactor-progression-transfer-validation.js
//   invocation:  node research/cofactor-progression-transfer-validation.js
//   code-sha256: 027c297ffde7d3a367f5a410a703228c62e3c9a76d524074cf9d548fc77a36d4
//   out-sha256:  aa18818266c902144987fdc0f1443ed94f896e07e9f68dc47a265ce8ba4389a7
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// Cofactor progression transfer finite controls: PASS
// Euler identities: 8299; non-squarefree witnesses: 1899; coprime multiplicativity checks: 17624; band-removal checks: 6918
// Coefficient checks: 98304; nonzero prime-square corrections: 1032 (positive 533, negative 499)
// Pointwise profile splits: 32768; complete tail identities: 32768; omitted-mixed-term failures: 37
// CRT identities: 5123; even cofactor classes: 23; incompatible pairs: 30; AP sampling checks: 90
// Controls retain divisibility, prime powers, shared-prime restrictions, cofactor gcds, mixed tails and endpoint rounding. No analytic estimate or twin margin is tested.
// ============================================================================
// READINGS
// The exact finite coefficient identities pass, with active counterexamples
// to omitting divisibility, shared-prime exclusions, repeated-prime corrections,
// mixed tails and endpoint rounding. These controls test the representation;
// they do not numerically test the correlation theorem or its asymptotic rate.
