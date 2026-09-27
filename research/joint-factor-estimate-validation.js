#!/usr/bin/env node
'use strict';
// Exact finite controls for joint-factor-estimate.md.
// Logarithms are formal prime-log vectors (Map prime -> BigInt); the profile
// is doubled so every coefficient is an integer. Section A checks the family
// identity R_F = sum_F G_L(n)[Lambda(n-2) - P_R(n-2)] by two independent
// orderings. Section B checks the witnesses and the ten-prime cell. Section C
// certifies the rational inequality behind the failed family bound. Section D
// is a floating MEASUREMENT of the twisted Mobius constant; it proves nothing
// asymptotic. No enumeration beyond N=12000 is performed.
const assert=require('node:assert/strict');
const N=12000;
const spf=Array(N+1).fill(0);
for(let p=2;p<=N;p++) if(!spf[p]) for(let n=p;n<=N;n+=p) if(!spf[n]) spf[n]=p;
function factors(n){const out=[];while(n>1){const p=spf[n];let e=0;
  do{n/=p;e++;}while(n>1&&spf[n]===p);out.push([p,e]);}return out;}
const fs=Array.from({length:N+1},(_,n)=>n?factors(n):[]);
const ds=Array.from({length:N+1},()=>[]);
for(let d=1;d<=N;d++)for(let n=d;n<=N;n+=d)ds[n].push(d);
const mu=n=>fs[n].some(([,e])=>e>1)?0:(-1)**fs[n].length;
const isPrime=n=>n>1&&fs[n].length===1&&fs[n][0][1]===1;
const add=(a,b,scale=1n)=>{const out=new Map(a);
  for(const [p,c] of b){const next=(out.get(p)||0n)+scale*c;
    if(next)out.set(p,next);else out.delete(p);}return out;};
const scaled=(a,c)=>add(new Map(),a,BigInt(c));
const logs=n=>new Map(fs[n].map(([p,e])=>[p,BigInt(e)]));
const lambda=n=>fs[n].length===1?new Map([[fs[n][0][0],1n]]):new Map();
const canonical=a=>[...a].sort(([p],[q])=>String(p).localeCompare(String(q)));
const same=(a,b)=>assert.deepEqual(canonical(a),canonical(b));
function product(a,b){let out=new Map();
  for(const [p,c] of a)for(const [q,d] of b){
    const key=[p,q].sort((x,y)=>x-y).join('*');out=add(out,new Map([[key,c*d]]));}
  return out;}
const pmax=n=>n===1?1:fs[n][fs[n].length-1][0];

// One side: doubled profile rho2 in {2,1,0}; A(d)=mu(d)rho2(d); B(e) as in
// joint-correction-source-audit (1); P2 = 2P, G2 = 2G by long convolution.
function makeSide(a,W){
  const rho2=d=>d<=a?2:d>=W?0:1;
  const A=Array.from({length:N+1},(_,d)=>d?BigInt(mu(d)*rho2(d)):0n);
  const F2=n=>ds[n].reduce((t,d)=>t+A[d],0n);          // 2F(n), complete subset sum
  const B=Array.from({length:N+1},()=>new Map());
  for(let e=1;e<=N;e++){B[e]=scaled(logs(e),-A[e]);
    for(const d of ds[e]){const q=e/d;if(q<=W)B[e]=add(B[e],lambda(q),-A[d]);}}
  const P2=h=>{let p=scaled(logs(h),F2(h));for(const e of ds[h])p=add(p,B[e]);return p;};
  const G2=n=>{let g=new Map();for(const d of ds[n]){let beta=new Map();
    for(const q of ds[n/d])if(q>W)beta=add(beta,lambda(q));
    g=add(g,beta,BigInt(mu(d)*(2-rho2(d))));}return g;};
  const E2=n=>{let e=new Map();for(const [q,k] of fs[n])if(q<=W)
    for(let j=2;j<=k;j++)if(q**j>W)e=add(e,new Map([[q,F2(n/q**j)]]));return e;};
  return {a,W,A,F2,P2,G2,E2};
}

// ---------- Section A: the family identity by two orderings ----------
const right=makeSide(3,7);
let identityChecks=0,primePartners=0,powerPartners=0,irregularLeft=0,nonroughPartners=0;
// (2) G_R(h) = Lambda(h) - P_R(h) for every h > W_R, including primes and powers.
for(let h=right.W+1;h<=N;h++){same(right.G2(h),add(scaled(lambda(h),2),right.P2(h),-1n));}
for(const [aL,WL] of [[11,17],[37,41]]){
  const left=makeSide(aL,WL);
  let lhs=new Map(),rhs=new Map(),members=0;
  for(let n=Math.floor(N/2)+1;n<=N;n++){
    const r=pmax(n);if(!(r>WL))continue;
    if(n%(r*r)===0)continue;                      // r must occur once
    const m=n/r;if(m===1)continue;                 // exclude primes
    if(pmax(m)>WL)continue;                        // exactly one prime above W_L
    // Ordering 1: direct long convolutions of both coefficients.
    lhs=add(lhs,product(left.G2(n),right.G2(n-2)));
    // Ordering 2: factorisation formula on the left, short approximant on the right.
    const gl=add(scaled(logs(r),-left.F2(m)),left.E2(n),-1n);   // -F(m)log r - E_L(n), doubled
    same(gl,left.G2(n));                                          // (1) exact
    const h=n-2;
    const gr=add(scaled(lambda(h),2),right.P2(h),-1n);
    rhs=add(rhs,product(gl,gr));
    members++;identityChecks++;
    if(isPrime(h))primePartners++;
    else if(fs[h].length===1)powerPartners++;
    if(left.E2(n).size)irregularLeft++;
    if(fs[h].some(([q])=>q<=right.W))nonroughPartners++;
  }
  same(lhs,rhs);assert(members>50);
}
assert(primePartners>0&&powerPartners>0&&irregularLeft>0&&nonroughPartners>0);
console.log('VERIFIED: family identity sum_F G_L(n)G_R(n-2) = sum_F G_L(n)[Lambda-P_R](n-2) on '+identityChecks+
  ' members (two left profiles); '+primePartners+' prime, '+powerPartners+' prime-power, '+
  nonroughPartners+' nonrough partners, '+irregularLeft+' irregular left inputs; all G_R = Lambda - P_R for h > W_R.');

// ---------- Section B: witnesses and signs ----------
const L=makeSide(37,41);
const M2=[],M3=[];
for(let m=2;m<=N;m++){const f=fs[m];if(f.some(([,e])=>e>1))continue;
  if(f.length===2){const [[p],[q]]=f;if(q<=37&&p*q>=41)M2.push(m);}
  if(f.length===3){const [[p],[q],[t]]=f;if(p*q<=37&&p*t<=37&&q*t<=37&&p*q*t>=41)M3.push(m);}}
assert(M2.length>5&&M3.length>=3);
for(const m of M2)assert.equal(L.F2(m),-2n);
for(const m of M3)assert.equal(L.F2(m),2n);
// Partner classes on regular inputs: the product sign is sign(F_L(m))*sign(F_R(t)),
// zero for a prime partner and for a W_R-smooth partner; proper powers are listed.
const regular=(n,W)=>fs[n].every(([q,k])=>q>W||q**k<=W);
let signs={roughM2:0,roughM3:0,flipM2:0,flipM3:0,prime:0,power:0,smooth:0};
const signOf=v=>{const vals=[...v.values()];assert(vals.length>0);
  assert(vals.every(c=>c>0n)||vals.every(c=>c<0n));return vals[0]>0n?1:-1;};
for(const m of [...M2,...M3])for(let r=43;m*r<=N;r++){if(!isPrime(r))continue;
  const n=m*r,h=n-2;if(!regular(n,41)||!regular(h,7))continue;
  const prod=product(L.G2(n),right.G2(h));const sL=M2.includes(m)?-1:1;
  if(isPrime(h)){assert.equal(prod.size,0);signs.prime++;continue;}
  if(fs[h].length===1){assert.equal(signOf(prod),sL);signs.power++;continue;}
  const t=fs[h].filter(([q])=>q<=7).reduce((acc,[q,e])=>acc*q**e,1);
  if(t===h){assert.equal(prod.size,0);signs.smooth++;continue;}
  const F2R=right.F2(t);
  if(F2R===0n){assert.equal(prod.size,0);continue;}
  const sR=F2R>0n?1:-1;assert.equal(signOf(prod),sL*sR);
  if(t===1){if(sL<0)signs.roughM2++;else signs.roughM3++;}
  else if(sR<0){if(sL<0)signs.flipM2++;else signs.flipM3++;}
}
assert(signs.roughM2>0&&signs.roughM3>0&&signs.flipM2>0&&signs.flipM3>0&&signs.prime>0&&signs.power>0);
console.log('VERIFIED: M2 coefficient -1 ('+M2.length+' m), M3 coefficient +1 ('+M3.length+' m); regular product signs: rough M2 '+
  signs.roughM2+' negative, rough M3 '+signs.roughM3+' positive, negative-F_R partners flip sign ('+signs.flipM2+'/'+signs.flipM3+
  '), prime partners zero ('+signs.prime+'), smooth partners zero ('+signs.smooth+'), proper powers '+signs.power+'.');

// Ten-prime cell: subset sum and ordered divisor construction agree at -84.
const ten=[101,103,107,109,113,127,131,137,139,149];
const bigA=4000000,bigB=6000000;
const rhoBig=d=>d<=bigA?1:d>=bigB?0:NaN;
let fSubset=0;
for(let bits=0;bits<1024;bits++){let d=1,k=0;ten.forEach((p,i)=>{if(bits&(1<<i)){d*=p;k++;}});
  const rho=rhoBig(d);assert(!Number.isNaN(rho));fSubset+=(k%2?-1:1)*rho;}
let divs=[[1,0]];for(const p of ten){divs=divs.concat(divs.map(([d,k])=>[d*p,k+1]));}
const fOrdered=divs.reduce((t,[d,k])=>t+(k%2?-1:1)*rhoBig(d),0);
assert.equal(fSubset,-84);assert.equal(fOrdered,-84);
assert(ten.every(p=>{for(let q=2;q*q<=p;q++)if(p%q===0)return false;return true;}));
console.log('VERIFIED: ten-prime cell F=-84 by subset enumeration and by ordered divisor construction; G_L(s q)=+84 log q.');

// ---------- Section C: rational certificate of the failed family bound ----------
const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const Q=(a,b=1n)=>{a=BigInt(a);b=BigInt(b);const g=gcd(a,b);return [a/g,b/g];};
const qadd=([a,b],[c,d])=>Q(a*d+c*b,b*d),qmul=([a,b],[c,d])=>Q(a*c,b*d),qsub=(x,[c,d])=>qadd(x,[-c,d]);
const gt=([a,b],[c,d])=>a*d>c*b;
const logLower=(a,b=1)=>{const w=Q(a-b,a+b),w2=qmul(w,w);let term=w,sum=Q(0);
  for(let j=0;j<20;j++){sum=qadd(sum,qmul(Q(2,2*j+1),term));term=qmul(term,w2);}return sum;};
assert(gt(logLower(2),Q(693,1000)));                       // log 2 > 0.693
let f22=1n;for(let i=2n;i<=22n;i++)f22*=i;
assert(gt(Q(1,1000),Q(24,f22)));                            // 24/22! < 1/1000
const onePlusH=qadd(qsub(Q(1),logLower(2)),Q(24,f22));      // upper bound for 1+H_delta
assert(gt(Q(31,100),onePlusH));                             // 1+H_delta < 31/100
const sieveFloor=qmul(Q(40,9),Q(4,25));                     // (40/9) I_3 lower bound, I_3>4/25 retained
assert.deepEqual(sieveFloor,Q(32,45));
assert(gt(qsub(sieveFloor,Q(31,100)),Q(2,5)));              // deficit > 2/5
assert(gt(qmul(Q(2),Q(4,25)),Q(31,100)));                   // parity-limit factor 2 also fails
console.log('CERTIFIED: 1+H_delta < 31/100 < 32/45 <= (40/9)H^+; family deficit > 2/5; at sieve factor 2 the family bound needs H^abs < 1.');

// ---------- Section D: measured trend of the twisted Mobius constant ----------
const M=1000000;const spf2=new Int32Array(M+1);
for(let p=2;p<=M;p++)if(!spf2[p])for(let n=p;n<=M;n+=p)if(!spf2[n])spf2[n]=p;
const muA=new Int8Array(M+1),phiA=new Float64Array(M+1);muA[1]=1;phiA[1]=1;
for(let n=2;n<=M;n++){const p=spf2[n],m=n/p;muA[n]=(m%p===0)?0:-muA[m];phiA[n]=phiA[m]*((m%p===0)?p:p-1);}
let C2=1;for(let p=3;p<=M;p++)if(spf2[p]===p)C2*=1-1/((p-1)*(p-1));
const twoC2=2*C2;
const rows=[];
for(const D of [1000,10000,100000,1000000]){let tw=0,un=0,plain=0;
  for(let d=1;d<=D;d++){if(!muA[d])continue;const w=Math.log(D/d);
    un+=muA[d]*w/d;if(d%2){tw+=muA[d]*w/phiA[d];plain+=muA[d]/phiA[d];}}
  rows.push([D,tw,un,plain]);}
console.log('MEASURED (finite, floating): C2 = '+C2.toFixed(6)+' from primes <= 1e6; 2C2 = '+twoC2.toFixed(4)+'.');
for(const [D,tw,un,plain] of rows)console.log('  D='+D+': sum_{d<=D odd} mu(d)log(D/d)/phi(d) = '+tw.toFixed(4)+
  ' (target 2C2); untwisted sum mu(d)log(D/d)/d = '+un.toFixed(4)+' (target 1); sum_{odd} mu(d)/phi(d) = '+plain.toFixed(4)+' (target 0).');
console.log('PASS. Exact identities, witnesses and rational certificates; the floating rows are measurements, not the asymptotic proof.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/joint-factor-estimate-validation.js
//   invocation:  node research/joint-factor-estimate-validation.js
//   code-sha256: 9e22997d6d26bb02361aa118ce5c4396d75b3384afe00eb4b5e2759a18a3d0a7
//   out-sha256:  34e8dce7e3df70dec45a090bbc9c879aad3344d472349e29408dff90a42ebeff
//   body-lines:  10
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-08
//   elapsed:     0.8 s
// ============================================================================
// VERIFIED: family identity sum_F G_L(n)G_R(n-2) = sum_F G_L(n)[Lambda-P_R](n-2) on 8131 members (two left profiles); 847 prime, 18 prime-power, 6369 nonrough partners, 357 irregular left inputs; all G_R = Lambda - P_R for h > W_R.
// VERIFIED: M2 coefficient -1 (54 m), M3 coefficient +1 (4 m); regular product signs: rough M2 92 negative, rough M3 9 positive, negative-F_R partners flip sign (35/14), prime partners zero (102), smooth partners zero (0), proper powers 4.
// VERIFIED: ten-prime cell F=-84 by subset enumeration and by ordered divisor construction; G_L(s q)=+84 log q.
// CERTIFIED: 1+H_delta < 31/100 < 32/45 <= (40/9)H^+; family deficit > 2/5; at sieve factor 2 the family bound needs H^abs < 1.
// MEASURED (finite, floating): C2 = 0.660162 from primes <= 1e6; 2C2 = 1.3203.
//   D=1000: sum_{d<=D odd} mu(d)log(D/d)/phi(d) = 1.3241 (target 2C2); untwisted sum mu(d)log(D/d)/d = 1.0004 (target 1); sum_{odd} mu(d)/phi(d) = -0.0025 (target 0).
//   D=10000: sum_{d<=D odd} mu(d)log(D/d)/phi(d) = 1.3203 (target 2C2); untwisted sum mu(d)log(D/d)/d = 1.0000 (target 1); sum_{odd} mu(d)/phi(d) = -0.0027 (target 0).
//   D=100000: sum_{d<=D odd} mu(d)log(D/d)/phi(d) = 1.3203 (target 2C2); untwisted sum mu(d)log(D/d)/d = 1.0000 (target 1); sum_{odd} mu(d)/phi(d) = -0.0004 (target 0).
//   D=1000000: sum_{d<=D odd} mu(d)log(D/d)/phi(d) = 1.3203 (target 2C2); untwisted sum mu(d)log(D/d)/d = 1.0000 (target 1); sum_{odd} mu(d)/phi(d) = 0.0002 (target 0).
// PASS. Exact identities, witnesses and rational certificates; the floating rows are measurements, not the asymptotic proof.
// ============================================================================
// READINGS
// Exact algebra, witnesses and rational certificates only. The written note
// owns the ordinary-BV Type I transfer, the twisted Mobius constant and the asymptotic
// scope; the floating rows are finite measurements, not that proof.
