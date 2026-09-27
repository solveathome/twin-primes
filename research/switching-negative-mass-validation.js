#!/usr/bin/env node
'use strict';
// Switching negative mass: exact constant, factor and density controls.
// The asymptotic sieve application is proved in switching-negative-mass.md;
// these finite checks cannot establish it or an effective starting scale.
const assert = require('node:assert/strict');
const gcd = (a,b) => b===0n ? (a<0n?-a:a) : gcd(b,a%b);
const Q=(a,b=1n)=>{a=BigInt(a);b=BigInt(b);const g=gcd(a,b);return [a/g,b/g];};
const add=([a,b],[c,d])=>Q(a*d+c*b,b*d);
const mul=([a,b],[c,d])=>Q(a*c,b*d);
const sub=(a,[c,d])=>add(a,[-c,d]);
const gt=([a,b],[c,d])=>a*d>c*b;
const logLower=(a,b=1)=>{
  const w=Q(a-b,a+b),w2=mul(w,w);let term=w,sum=Q(0);
  for(let j=0;j<12;j++){sum=add(sum,mul(Q(2,2*j+1),term));term=mul(term,w2);}
  return sum;
};
const I0=[mul(Q(1,2),mul(logLower(11,6),logLower(11,6))),
  mul(logLower(3),logLower(11,10)),mul(logLower(2),logLower(10,9)),
  mul(logLower(3,2),logLower(9,8))].reduce(add,Q(0));
assert(gt(I0,Q(2,5)));
assert(gt(logLower(3),Q(219,200)));
const multiplier=sub(mul(Q(10),logLower(3)),Q(36,5));
assert(gt(multiplier,Q(15,4)));
assert(gt(mul(multiplier,I0),Q(3,2)));
assert.deepEqual(sub(Q(7,25),Q(5,18)),Q(1,450));
assert(gt(Q(5,18),Q(1,5)));
assert.deepEqual(mul(Q(5,36),Q(2)),Q(5,18));
// Region inclusions are rational, with boundary equalities allowed.
const rects=[[[1,25],[3,25],[1,5],[11,50]],
  [[3,50],[3,25],[9,50],[1,5]],[[2,25],[3,25],[4,25],[9,50]]];
const ge=(a,b)=>!gt(b,a);
for(const rect of rects){
  const [u0,u1,v0,v1]=rect.map(([a,b])=>Q(a,b));
  assert(ge(add(u0,v0),Q(6,25)));assert(ge(v0,u1));
  assert(ge(Q(11,50),v1));assert(gt(u1,u0));assert(gt(v1,v0));
}
assert.deepEqual(add(Q(3,25),Q(3,25)),Q(6,25));
// Direct Mobius/divisor convolution, retaining the full prime-power beta.
const factors=n=>{const out=[];for(let p=2;p*p<=n;p++)if(n%p===0){
  let k=0;while(n%p===0){n/=p;k++;}out.push([p,k]);}
  if(n>1)out.push([n,1]);return out;};
const prime=n=>n>1&&factors(n).length===1&&factors(n)[0][1]===1;
const divisors=n=>{let out=[1];for(const [p,k] of factors(n)){
  const base=[...out];let power=1;for(let j=1;j<=k;j++){power*=p;out.push(...base.map(d=>d*power));}}
  return out;};
const mu=n=>{const f=factors(n);return f.some(([,k])=>k>1)?0:(f.length%2?-1:1);};
const norm=v=>[...v.entries()].filter(([,c])=>c!==0).sort((a,b)=>a[0]-b[0]);
const bump=(v,p,c)=>v.set(p,(v.get(p)||0)+c);
function G2(n,a,b,mid){
  const out=new Map();
  for(const d of divisors(n)){
    const rho2=d<=a?2:d>=b?0:mid;
    const coefficient=mu(d)*(2-rho2);
    for(const [p,k] of factors(n/d)){
      let power=1;for(let j=1;j<=k;j++){power*=p;if(power>b)bump(out,p,coefficient);}
    }
  }
  return norm(out);
}
const ps=[3,5,7,11,13],rs=[];
for(let r=19;r<200;r++)if(prime(r))rs.push(r);
let fixtures=0,primeControls=0,powerControls=0,compositeControls=0;
for(const p of ps)for(const q of ps)if(p<q&&p*q>=17)for(const r of rs){
  const n=p*q*r,h=n-2,hf=factors(h);
  if(hf.some(([s])=>s<=3))continue;
  for(const mid of [0,1,2]){
    assert.deepEqual(G2(n,13,17,mid),[[r,2]]);
    const rhs=new Map(hf.map(([s,k])=>[s,-2*k]));
    if(hf.length===1)bump(rhs,hf[0][0],2);
    assert.deepEqual(G2(h,2,3,mid),norm(rhs));fixtures++;
  }
  const droppedCorrections=hf.map(([s,k])=>[s,-2*k]);
  if(prime(h)){
    assert.deepEqual(G2(h,2,3,1),[]);
    assert.notDeepEqual(droppedCorrections,G2(h,2,3,1));primeControls++;
  } else if(hf.length===1){
    assert.notDeepEqual(droppedCorrections,G2(h,2,3,1));powerControls++;
  } else {assert.deepEqual(droppedCorrections,G2(h,2,3,1));compositeControls++;}
}
assert(fixtures>0&&primeControls>0&&powerControls>0&&compositeControls>0);
// The proposed positive companion has all pair products below a and
// the triple product above b. This checks its sign, not its density.
let companions=0;
for(const r of rs)if(r>41)for(const mid of [0,1,2]){
  assert(3*5<=37&&3*7<=37&&5*7<=37&&3*5*7>=41);
  assert.deepEqual(G2(3*5*7*r,37,41,mid),[[r,-2]]);companions++;
}
// Nonzero residues for r: exactly one admissible root unless l divides 2pq.
let densities=0,badDensityControls=0;
for(const m of [21,33,35,55,65,77,91,143])for(let l=2;l<44;l++)if(prime(l)){
  let roots=0;for(let a=1;a<l;a++)if((m*a-2)%l===0)roots++;
  const expected=(2*m)%l===0?0:1;
  assert.equal(roots,expected);densities++;
  if(expected===0){assert.notEqual(roots,1);badDensityControls++;}
}
console.log('Exact certificate: I0 > 2/5; log(3) > 219/200; kappa > 3/2.');
console.log('Exponent certificate: 7/25 - 5/18 = 1/450; all region inclusions pass.');
console.log('Full prime-log coefficient fixtures: '+fixtures+' across three plateau profiles.');
console.log('Partner controls: '+primeControls+' primes, '+powerControls+' proper powers, '+compositeControls+' other composites.');
console.log('Local-density checks: '+densities+'; forbidden-class controls: '+badDensityControls+'.');
console.log('Positive-companion sign fixtures: '+companions+'; no density comparison asserted.');
console.log('PASS. Exact finite checks; no finite experiment proves the asymptotic sieve bounds.');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/switching-negative-mass-validation.js
//   invocation:  node research/switching-negative-mass-validation.js
//   code-sha256: 6a67f411646478c4c1bb0df7669297574a157f82fe1dbc50531f1fa4f8edaadb
//   out-sha256:  b72511342979fb2d944e16fa654b70f1f2bb6a967259dcf11fefb1f45a975c09
//   body-lines:  7
//   forced:      2026-09-06, 0 of 6 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Exact certificate: I0 > 2/5; log(3) > 219/200; kappa > 3/2.
// Exponent certificate: 7/25 - 5/18 = 1/450; all region inclusions pass.
// Full prime-log coefficient fixtures: 705 across three plateau profiles.
// Partner controls: 95 primes, 2 proper powers, 138 other composites.
// Local-density checks: 112; forbidden-class controls: 24.
// Positive-companion sign fixtures: 99; no density comparison asserted.
// PASS. Exact finite checks; no finite experiment proves the asymptotic sieve bounds.
// ============================================================================
// READINGS
// Constants and algebra only. The written argument owns the uniform
// Bombieri--Vinogradov transfer, sieve normalization and asymptotic scope.
