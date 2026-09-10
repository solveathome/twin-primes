#!/usr/bin/env node
'use strict';
// Question: do the source-profile constants, weakened smallest-prime
// envelope and exact prime-filter identity survive finite controls?
// All arithmetic below is rational/integer. Logarithms use ordered
// integer proxies; no finite test validates an asymptotic theorem.
const assert = require('node:assert/strict');
const gcd = (a,b) => b === 0n ? a : gcd(b,a%b);
const add = ([a,b],[c,d]) => { const g=gcd(a*d+c*b,b*d); return [(a*d+c*b)/g,b*d/g]; };
const fact = n => { let r=1n; for(let j=2n;j<=n;j++)r*=j; return r; };
const density=[0n,0n,0n,140n,-420n,420n,-140n];
let integral=[0n,1n];
for(let i=0;i<density.length;i++)for(let j=0;j<density.length;j++)
  integral=add(integral,[density[i]*density[j],BigInt(i+j+1)]);
assert.deepEqual(integral,[700n,429n]);
assert.equal(integral[0]*fact(13n),integral[1]*19600n*fact(6n)**2n);
assert(integral[0]>integral[1]);
const N=4096;
const pf=Array.from({length:N+1},()=>[]);
for(let p=2;p<=N;p++)if(pf[p].length===0)for(let m=p;m<=N;m+=p)pf[m].push(p);
let growth=0,suppression=0,powers=0;
const data = (n,T) => {
  // Distinct primes are ordered first; missing slots have value one.
  const l=pf[n].slice(0,3).map(p=>BigInt(Math.min(Number(T),p)));
  while(l.length<3)l.push(T);
  const scale=4n**BigInt(pf[n].length);
  return {v:scale*l[0]*l[1]**2n*l[2]**2n,
    w:scale*l[0]**2n*l[1]**2n*l[2]**2n,first:l[0]};
};
for(const T of [8n,32n,128n]) {
  const values=Array.from({length:N+1},(_,n)=>data(n,T));
  for(let a=1;a<=N;a++)for(let b=1;a*b<=N;b++) {
    if(gcd(BigInt(a),BigInt(b))!==1n)continue;
    assert(values[a*b].v<=4n**BigInt(pf[a].length)*values[b].v);
    growth++;
  }
  for(let n=1;n<=N;n++) {
    const {v,w,first}=values[n];
    assert.equal(w,first*v);
    assert(w<=T*v);
    for(const D of [1n,2n,4n,8n,16n,32n,64n])if(D<=T&&n>1&&first<=D) {
      assert(w<=D*v); suppression++;
    }
    if(pf[n].some(p=>n%(p*p)===0))powers++;
  }
}
// Active control: exponent 1-sigma must be positive. With sigma=3/2,
// T=2 and raw prime proxies 1 and 2, adding the smaller prime increases
// the ordered factor product: V(6)^2=32 > 4*V(3)^2=16.
const badSigmaSquared = raw => {
  const r=raw.length, l=[...raw].sort((a,b)=>Number(a-b));
  while(l.length<3)l.push(2n);
  return [4n**BigInt(r)*l[1]**2n*l[2]**2n,8n*l[0]];
};
const [badNum,badDen]=badSigmaSquared([1n,2n]);
const [baseNum,baseDen]=badSigmaSquared([2n]);
assert(badNum*baseDen>4n*baseNum*badDen);
// The cubic smoothness source permits second and fourth moments, but
// its strict A>binomial(2k,k)/(2k) condition does not permit the sixth.
const choose=(n,k)=>fact(n)/(fact(k)*fact(n-k));
assert(3n*2n>choose(2n,1n));
assert(3n*4n>choose(4n,2n));
assert(!(3n*6n>choose(6n,3n)));
const primeFixture=[2n,3n,5n];
for(const symmetric of [true,false]) {
  let ordered=[0n,1n],distinct=[0n,1n];
  for(const p of primeFixture)for(const q of primeFixture)if(p!==q) {
    const term=[symmetric?1n:q-p,(p-1n)*(q-1n)];
    distinct=add(distinct,term);
    if(p<q)ordered=add(ordered,term);
  }
  const equal=2n*ordered[0]*distinct[1]===distinct[0]*ordered[1];
  assert.equal(equal,symmetric);
  if(!symmetric) { assert(ordered[0]>0n); assert.equal(distinct[0],0n); }
}
let identities=0,omittedPrimePairFailures=0;
for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)
for(const p of [0,1])for(const q of [0,1]) {
  // A_i equals the prime log on prime inputs. Outside them its value
  // is unrestricted; this includes opposite signs and zeros.
  const A=BigInt(p?5:a),B=BigInt(q?7:b),P=BigInt(5*p),Q=BigInt(7*q);
  const filtered=BigInt((1-p)*(1-q))*A*B;
  assert.equal(filtered,A*B-P*B-Q*A+P*Q);
  if(filtered!==A*B-P*B-Q*A)omittedPrimePairFailures++;
  identities++;
}
assert(omittedPrimePairFailures>0);
console.log('Profile derivative energy: 700/429, checked by polynomial and beta integrals.');
console.log('Squared-envelope coprime growth checks: '+growth);
console.log('Small-prime suppression checks: '+suppression+'; squareful inputs: '+powers);
console.log('Prime-filter identities: '+identities+'; omitted twin-term controls: '+omittedPrimePairFailures);
console.log('Scope controls: sigma above one and C3 sixth-moment import rejected.');
console.log('Ordered-prime controls: symmetric cube reduction passes; antisymmetric reduction fails.');
console.log('PASS. Finite algebra only; harmonic asymptotics and source theorems require the written proof.');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/smooth-sieve-literature-validation.js
//   invocation:  node research/smooth-sieve-literature-validation.js
//   code-sha256: 5372bfc6baf244a1a7800dd8ce1246b08d50638964d42019795b3aaf47fe67e0
//   out-sha256:  8cff520aec03423dcf04d5370dccca2489d635d4fd22718ddc1916da6893528e
//   body-lines:  7
//   forced:      2026-09-06, 0 of 6 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Profile derivative energy: 700/429, checked by polynomial and beta integrals.
// Squared-envelope coprime growth checks: 71859
// Small-prime suppression checks: 42496; squareful inputs: 4815
// Prime-filter identities: 196; omitted twin-term controls: 49
// Scope controls: sigma above one and C3 sixth-moment import rejected.
// Ordered-prime controls: symmetric cube reduction passes; antisymmetric reduction fails.
// PASS. Finite algebra only; harmonic asymptotics and source theorems require the written proof.
// ============================================================================
// READINGS
// Exact proxies check algebra and uniform-growth interfaces, not the
// asymptotic localization bound or any twin-prime lower margin.
