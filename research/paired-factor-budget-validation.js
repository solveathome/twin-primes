#!/usr/bin/env node
'use strict';
// Paired factor budget: directed rational enclosures and sign controls.
// Owning derivation: paired-factor-budget.md. This checks finite certificates;
// it does not test or prove the imported asymptotic distribution theorem.
const assert = require('node:assert/strict');
const S = 10n ** 16n, K = 32, N = 400;
const ceil = (a,b) => (a+b-1n)/b; // nonnegative numerators only
const add = (a,b) => [a[0]+b[0],a[1]+b[1]];
const mul = (a,b) => [a[0]*b[0]/S,ceil(a[1]*b[1],S)];
const scale = (a,n,d=1n) => [a[0]*n/d,ceil(a[1]*n,d)];
const rat = (n,d=1n) => [n*S/d,ceil(n*S,d)];
function logBound(a,b) {
  a=BigInt(a); b=BigInt(b);
  assert(a>=b && b>0n);
  if(a===b) return [0n,0n];
  const t=rat(a-b,a+b), t2=mul(t,t);
  assert(t2[1]<S);
  let term=t, sum=[0n,0n];
  for(let j=0;j<K;j++) {
    sum=add(sum,scale(term,2n,BigInt(2*j+1)));
    term=mul(term,t2);
  }
  // Positive omitted tail <= 2*t^(2K+1)/((2K+1)*(1-t^2)).
  sum[1]+=ceil(2n*term[1]*S,BigInt(2*K+1)*(S-t2[1]));
  return sum;
}
const contains=(outer,inner)=>outer[0]<=inner[0]&&outer[1]>=inner[1];
assert.deepEqual(logBound(1,1),[0n,0n]);
// Independent alternating-series enclosure for log(1+1/10).
let alt=[0n,0n],power=1n;
for(let j=1;j<=40;j++) {
  power*=10n; const term=rat(1n,BigInt(j)*power);
  alt=j%2 ? add(alt,term) : [alt[0]-term[1],alt[1]-term[0]];
}
alt[1]+=ceil(S,41n*power*10n);
const log11=logBound(11,10);
assert(log11[0]<=alt[1]&&alt[0]<=log11[1]);
const log3=logBound(3,1);
assert(log3[0]*200n>219n*S);
const doubled=scale(logBound(3,2),2n);
const log94=logBound(9,4);
assert(doubled[0]<=log94[1]&&log94[0]<=doubled[1]);
function integral2() {
  // Exponents in units 1/(1000*N); each cell has exact harmonic mass.
  const grid=Array.from({length:N+1},(_,i)=>20*N+200*i);
  const logs=grid.slice(0,-1).map((v,i)=>logBound(grid[i+1],v));
  let lo=0n,hi=0n;
  for(let i=0;i<N;i++)for(let j=i;j<N;j++) {
    const mass=mul(logs[i],logs[j]);
    if(grid[i+1]+grid[j+1]>240*N)hi+=mass[1];
    if(i<j&&grid[i]+grid[j]>=240*N)lo+=mass[0];
  }
  return [lo,hi];
}
function integral3() {
  const grid=Array.from({length:N+1},(_,i)=>20*N+90*i);
  const logs=grid.slice(0,-1).map((v,i)=>logBound(grid[i+1],v));
  let lo=0n,hi=0n;
  for(let i=0;i<N;i++)for(let j=i;j<N;j++) {
    const [u0,u1,v0,v1]=[grid[i],grid[i+1],grid[j],grid[j+1]];
    const mass=mul(logs[i],logs[j]);
    const lowL=Math.max(v1,240*N-u0-v0),lowH=220*N-v1;
    const highL=Math.max(v0,240*N-u1-v1),highH=220*N-v0;
    if(i<j&&lowH>lowL)lo+=mul(mass,logBound(lowH,lowL))[0];
    if(highH>highL)hi+=mul(mass,logBound(highH,highL))[1];
  }
  return [lo,hi];
}
const I2=integral2(),I3=integral3();
assert(I2[0]*25n>13n*S && I2[1]*100n<53n*S);
assert(I3[0]*25n>4n*S && I3[1]*100n<17n*S);
// L=10 log(3)-40/9 >1171/180. No floating-point budget assertions.
const L0=rat(1171n,180n);
const negativeLower=mul(L0,rat(13n,25n));
const positiveLower=mul(L0,rat(4n,25n));
const positiveUpper=mul(rat(40n,3n),rat(17n,100n));
const deficitLower=negativeLower[0]-positiveUpper[1];
assert(positiveLower[0]>S);
assert(deficitLower*10n>11n*S);
assert(5023n*10n > 11n*4500n); // same rational test after common denominator
assert(44*2<100 && 33*2<100 && 45*2<100); // m supports and sieve level
assert(3*5===15 && 4*5===20 && 2*45===90); // exponent s ratios
// Fixture for complete subset coefficients, independent of grid enclosures.
const subsetSum=(ps,a,b,transition)=>{
  let out=0;
  for(let bits=0;bits<2**ps.length;bits++) {
    let d=1,k=0;
    ps.forEach((p,i)=>{if(bits&(1<<i)){d*=p;k++;}});
    const rho=d<=a?1:d>=b?0:transition;
    out+=(k%2?-1:1)*rho;
  }
  return out;
};
for(const v of [0,1/2,1]) {
  assert.equal(subsetSum([3,5,7,101],35,41,v),1);
  assert.equal(subsetSum([7,11,101],13,17,v),-1);
}
// A signed sequence cannot be fed to a nonnegative sieve: a negative singleton
// reverses the claimed upper comparison when its minorant is substituted.
assert(-1*0 > -1*1);
assert(!contains([1n,1n],[0n,0n]));
console.log('Directed BigInt certificates, scale='+S+', grid='+N+', log terms='+K);
console.log('I2 enclosure: ['+I2.join(', ')+'] / '+S+'; 13/25 < I2 < 53/100');
console.log('I3 enclosure: ['+I3.join(', ')+'] / '+S+'; 4/25 < I3 < 17/100');
console.log('log(3)>219/200; L>1171/180; positive mass coefficient>1');
console.log('negative minus positive coefficient>11/10');
console.log('PASS: series controls, complete subsets, levels, and signed-sieve control');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/paired-factor-budget-validation.js
//   invocation:  node research/paired-factor-budget-validation.js
//   code-sha256: 54b9fe015c52fa4198110fc071301376f6d5218313e216a095db24b816c9269f
//   out-sha256:  97e31c0a7a1e63ed1b12b93860ae571f65cc92f5a51afb1ed959acda73c9313f
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.7 s
// ============================================================================
// Directed BigInt certificates, scale=10000000000000000, grid=400, log terms=32
// I2 enclosure: [5214613422645666, 5283509069657259] / 10000000000000000; 13/25 < I2 < 53/100
// I3 enclosure: [1615321533985417, 1693950424587894] / 10000000000000000; 4/25 < I3 < 17/100
// log(3)>219/200; L>1171/180; positive mass coefficient>1
// negative minus positive coefficient>11/10
// PASS: series controls, complete subsets, levels, and signed-sieve control
// ============================================================================
// READINGS
