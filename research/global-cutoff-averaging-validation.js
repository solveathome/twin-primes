#!/usr/bin/env node
'use strict';
// Exact finite controls for global-cutoff-averaging.md. Each vector represents
// sum_p c_p log(p) with integer coefficients. Rational cutoff averages are
// stored by their integer numerator. No asymptotic estimate is tested.
const assert = require('node:assert/strict');
const N = 8192;
const divisors = Array.from({length:N+1},()=>[]);
for(let d=1;d<=N;d++) for(let n=d;n<=N;n+=d) divisors[n].push(d);
const primes = divisors.map((ds,n)=>ds.length===2?n:0).filter(Boolean);
const mu = Array(N+1).fill(1);
for(const p of primes){
  for(let n=p;n<=N;n+=p) mu[n]*=-1;
  for(let n=p*p;n<=N;n+=p*p) mu[n]=0;
}
const vec=()=>new Map();
const add=(a,b,k=1)=>{
  for(const [p,v] of b){
    const w=(a.get(p)||0)+k*v;
    assert(Number.isSafeInteger(w));
    if(w)a.set(p,w);else a.delete(p);
  }
  return a;
};
const equal=(a,b,label)=>assert.deepEqual([...a].sort((u,v)=>u[0]-v[0]),[...b].sort((u,v)=>u[0]-v[0]),label);
const value=a=>[...a].reduce((s,[p,v])=>s+v*Math.log(p),0);
const log=Array.from({length:N+1},vec);
const lambda=Array.from({length:N+1},vec);
let properPowers=0;
for(const p of primes)for(let q=p,e=1;q<=N;q*=p,e++){
  lambda[q].set(p,1);
  if(e>1)properPowers++;
}
for(let n=1;n<=N;n++)for(const d of divisors[n])add(log[n],lambda[d]);
const beta=W=>Array.from({length:N+1},(_,n)=>{
  const v=vec();for(const r of divisors[n])if(r>W)add(v,lambda[r]);return v;
});
const sides=[
  {W:11,cuts:[7,11,17],D:71},
  {W:5,cuts:[3,5,7,13],D:101}
];
let coefficientChecks=0,identityChecks=0,meanChecks=0,complementChecks=0;
let primePowerFailures=0,rEqualsNFailures=0,nonSquarefreeActive=0;
let positive=0,negative=0;
const families=sides.map(c=>{
  const b=beta(c.W),den=c.cuts.length;
  const rho=d=>c.cuts.filter(u=>d<=u).length;
  const sharp=c.cuts.map(u=>Array.from({length:N+1},(_,n)=>{
    const v=vec();for(const d of divisors[n])if(d>u)add(v,b[n/d],mu[d]);return v;
  }));
  const G=Array.from({length:N+1},vec),I=Array.from({length:N+1},vec);
  const corner=Array.from({length:N+1},vec),rest=Array.from({length:N+1},vec);
  for(let n=1;n<=N;n++){
    for(const d of divisors[n]){
      const h=den-rho(d);
      add(G[n],b[n/d],mu[d]*h);
      add(I[n],log[n/d],mu[d]*rho(d));
      for(const r of divisors[n/d])if(r<=c.W)add(I[n],lambda[r],-mu[d]*rho(d));
      if(d>c.D)add(corner[n],b[n/d],mu[d]*den);
      else add(rest[n],b[n/d],mu[d]*h);
    }
    if(n<=c.W)add(I[n],lambda[n],den);
    equal(add(add(vec(),G[n]),I[n]),add(vec(),lambda[n],den),'weighted Vaughan identity');
    identityChecks++;
    const mean=vec();for(const f of sharp)add(mean,f[n]);
    equal(G[n],mean,'independent cutoff average numerator');meanChecks++;
    equal(G[n],add(add(vec(),corner[n]),rest[n]),'complete corner complement');complementChecks++;
    // Independent mu*1 inversion, including its m=1 exclusion.
    const F=m=>{
      const v=divisors[m].reduce((s,d)=>s+mu[d]*rho(d),0);
      assert(Number.isSafeInteger(v));return v;
    };
    const inverted=vec(),primeOnly=vec(),badEndpoint=vec();
    for(const r of divisors[n])if(r>c.W){
      add(badEndpoint,lambda[r],-F(n/r));
      if(r<n){
        add(inverted,lambda[r],-F(n/r));
        if(divisors[r].length===2)add(primeOnly,lambda[r],-F(n/r));
      }
    }
    equal(G[n],inverted,'prime-power convolution inversion');coefficientChecks++;
    if(JSON.stringify([...inverted].sort())!==JSON.stringify([...primeOnly].sort()))primePowerFailures++;
    if(JSON.stringify([...inverted].sort())!==JSON.stringify([...badEndpoint].sort()))rEqualsNFailures++;
    if(mu[n]===0 && G[n].size)nonSquarefreeActive++;
    if(value(G[n])>1e-10)positive++;
    if(value(G[n])<-1e-10)negative++;
  }
  return {den,G,I,corner,rest,sharp};
});
assert(primePowerFailures>0 && rEqualsNFailures>0 && nonSquarefreeActive>0);
assert(positive>0 && negative>0);
// Products are formal quadratic polynomials in the prime logs, again exact.
const polynomial=()=>new Map();
const productAdd=(out,a,b,k=1)=>{
  for(const [p,v] of a)for(const [q,w] of b){
    const key=Math.min(p,q)*(N+1)+Math.max(p,q);
    const z=(out.get(key)||0)+k*v*w;
    assert(Number.isSafeInteger(key)&&Number.isSafeInteger(z));
    if(z)out.set(key,z);else out.delete(key);
  }
};
const [L,R]=families;
let productChecks=0,omittedComplements=0;
const full=polynomial(),cornerOnly=polynomial(),meanFull=polynomial();
for(let n=N/2+1;n<=N;n++){
  const actual=polynomial(),expanded=polynomial(),averaged=polynomial();
  productAdd(actual,lambda[n],lambda[n-2],L.den*R.den);
  productAdd(expanded,L.I[n],lambda[n-2],R.den);
  productAdd(expanded,L.G[n],R.I[n-2]);
  productAdd(expanded,L.G[n],R.G[n-2]);
  equal(actual,expanded,'complete two-expansion identity at shift 2');
  for(const l of L.sharp)for(const r of R.sharp)productAdd(averaged,l[n],r[n-2]);
  const grouped=polynomial();productAdd(grouped,L.G[n],R.G[n-2]);
  equal(grouped,averaged,'product of independent cutoff averages');productChecks++;
  productAdd(full,L.G[n],R.G[n-2]);
  productAdd(cornerOnly,L.corner[n],R.corner[n-2]);
  add(meanFull,averaged);
  const restProduct=polynomial();
  productAdd(restProduct,L.corner[n],R.rest[n-2]);
  productAdd(restProduct,L.rest[n],R.corner[n-2]);
  productAdd(restProduct,L.rest[n],R.rest[n-2]);
  if(restProduct.size)omittedComplements++;
  const all=polynomial();productAdd(all,L.corner[n],R.corner[n-2]);add(all,restProduct);
  equal(grouped,all,'all lower-divisor mixed pieces retained');
}
equal(full,meanFull,'summed independent average');
assert(omittedComplements>0);
assert.notDeepEqual([...full].sort(),[...cornerOnly].sort(),'dropping the outside changes the full polynomial');
console.log('Global cutoff averaging finite controls: PASS');
console.log('Coefficient inversions: '+coefficientChecks+'; weighted Vaughan identities: '+identityChecks+'; cutoff averages: '+meanChecks+'; complete coefficient splits: '+complementChecks);
console.log('Shifted product and independent-average checks: '+productChecks+'; active omitted-complement controls: '+omittedComplements);
console.log('Prime-power deletion failures: '+primePowerFailures+'; including r=n failures: '+rEqualsNFailures+'; non-squarefree active coefficients: '+nonSquarefreeActive);
console.log('Positive coefficient cases: '+positive+'; negative cases: '+negative+'; proper prime powers in fixture: '+properPowers);
console.log('All identities use exact integer prime-log coefficients. No BV estimate, mean-square asymptotic, signed saving or twin margin is tested.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/global-cutoff-averaging-validation.js
//   invocation:  node research/global-cutoff-averaging-validation.js
//   code-sha256: 074b70ec67534b6b2bcf28e0fca3010d8cc29e6d44f1f2e822680da26072f4c7
//   out-sha256:  368b47e8e0845e56cce4e06d0a78bf243aa76f47c337418951c6e992693e9c8d
//   body-lines:  6
//   forced:      2026-09-06, 0 of 8 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.3 s
// ============================================================================
// Global cutoff averaging finite controls: PASS
// Coefficient inversions: 16384; weighted Vaughan identities: 16384; cutoff averages: 16384; complete coefficient splits: 16384
// Shifted product and independent-average checks: 4096; active omitted-complement controls: 1424
// Prime-power deletion failures: 2827; including r=n failures: 2144; non-squarefree active coefficients: 4485
// Positive coefficient cases: 5525; negative cases: 3535; proper prime powers in fixture: 50
// All identities use exact integer prime-log coefficients. No BV estimate, mean-square asymptotic, signed saving or twin margin is tested.
// ============================================================================
// READINGS
// Rational finite cutoff averages test the algebra exactly. The asymptotic
// exponent ranges and logarithmic profile norms belong to the written proof.
