// PRIME DISPERSION — regrouping, exact second moments and composite completion.
// Companion: prime-dispersion.md. Finite checks do not prove asymptotic bounds.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);console.log(`input: data-reuse/factor-windows.json sha256=${sourceSha256}`);
function factor(n){const f=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let a=0;do{n/=p;a++;}while(n%p===0);f.push([p,a]);}if(n>1)f.push([n,1]);return f;}
const mu=n=>{const f=factor(n);return f.some(([,a])=>a>1)?0:(-1)**f.length;};
const tau=n=>factor(n).reduce((s,[,a])=>s*(a+1),1);
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;}
const mod=(a,c)=>((a%c)+c)%c;
function inv(a,c){if(c===1)return 0;let b=c,u=1,v=0;while(b){const k=Math.floor(a/b);[a,b]=[b,a-k*b];[u,v]=[v,u-k*v];}assert.equal(a,1);return mod(u,c);}
const plus=(a,b)=>[a[0]+b[0],a[1]+b[1]],times=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const scale=(a,s)=>[a[0]*s,a[1]*s],minus=(a,b)=>plus(a,scale(b,-1)),conj=a=>[a[0],-a[1]],abs2=a=>a[0]**2+a[1]**2;
const phase=(a,c=1)=>{const v=2*Math.PI*mod(a,c)/c;return[Math.cos(v),Math.sin(v)];};
function near(a,b,mass=1){assert(Math.abs(a-b)<=2e-9*Math.max(1,mass),`${a} != ${b}`);}
const close=(a,b,mass=1)=>{near(a[0],b[0],mass);near(a[1],b[1],mass);};
const inside=(n,D)=>D<n&&n<=2*D;
function vaaler(h,T){const v=h/(T+1),W=Math.PI*v*(1-v)/Math.tan(Math.PI*v)+v;return[0,W/(2*Math.PI*h)];}
function phi(h,q,e,m,g,x,z){const c=g*m*e*q;return minus(phase(h*x/2,c),phase(h*z,c));}

let coefficientChecks=0,parityZeros=0,phaseChecks=0,momentChecks=0,regroupChecks=0,nonunitExclusions=0;
const pairCounts={diagonal:0,samePrime:0,crossPrime:0};const examples=[];
for(const g of [1,2])for(const box of [0,1])for(const endpoint of [1,.75]){
  const D=24,E=24,M=g===1?1024:512,N=(g===1?256:128)*2**box,x=262144,z=x*endpoint,T=8;
  const ps=[31,37],qs=[11,13],hs=[2,3,4],alpha=new Map();
  for(let m=M+1;m<=2*M;m++){
    let a=0,b=0;for(const p of ps)if(m%p===0&&inside(g*m/p,D)){
      b-=mu(g*m)*Math.log(p);if((m/p)%p)a+=mu(g*m/p)*Math.log(p);
    }
    near(a,b);assert(Math.abs(a)<=Math.log(m)+1e-10);coefficientChecks++;
    if(g===2&&m%2===0){near(a,0);parityZeros++;}alpha.set(m,a);
  }
  const norm=[...alpha.values()].reduce((s,v)=>s+v*v,0);assert(norm<=M*Math.log(2*M)**2);
  let grouped=[0,0],ungrouped=[0,0],outerBound=0,totalMoment=0;const moments=[];
  for(let e=Math.floor(E/g)+1;e<=Math.floor(2*E/g);e++)if(mu(g*e)){
    const Q=qs.filter(q=>gcd(e,q)===1&&inside(e*q,N));if(!Q.length)continue;
    const indices=Q.flatMap(q=>hs.map(h=>({q,h,w:scale(vaaler(h,T),Math.log(q))})));
    const diagonal=[0,0],same=[0,0],cross=[0,0];let direct=0,B=[0,0],mass=0;
    for(let m=M+1;m<=2*M;m++){
      const entries=indices.map(({q,h,w})=>{
        if(gcd(m,e*q)!==1){nonunitExclusions++;return[0,0];}
        return times(w,times(phase(-(2/g)*h*inv(m,e*q),e*q),phi(h,q,e,m,g,x,z)));
      });
      const Y=entries.reduce(plus,[0,0]);direct+=abs2(Y);B=plus(B,scale(Y,alpha.get(m)));
      mass+=entries.reduce((s,v)=>s+Math.sqrt(abs2(v)),0)**2;
      for(let i=0;i<indices.length;i++)for(let j=0;j<indices.length;j++){
        const a=indices[i],b=indices[j],sameQ=a.q===b.q,c=e*(sameQ?a.q:a.q*b.q);
        if(gcd(m,c)!==1)continue;
        const numerator=(2/g)*(sameQ?b.h-a.h:b.h*a.q-a.h*b.q),G=gcd(numerator,c);
        const old=mod(-(2/g)*a.h*inv(m,e*a.q)*(c/(e*a.q))+(2/g)*b.h*inv(m,e*b.q)*(c/(e*b.q)),c);
        assert.equal(old,mod(numerator*inv(m,c),c));phaseChecks++;
        assert.equal(numerator===0,sameQ&&a.h===b.h);
        if(numerator!==0){assert(G<c);if(sameQ){assert.equal(gcd(numerator,a.q),1);assert(G<=2*Math.max(...hs));}
          else{assert.equal(gcd(numerator,a.q*b.q),1);assert.equal(G,gcd(numerator,e));}}
        const F=times(phi(a.h,a.q,e,m,g,x,z),conj(phi(b.h,b.q,e,m,g,x,z)));
        const term=times(times(a.w,conj(b.w)),times(phase(numerator*inv(m,c),c),F));
        close(term,times(entries[i],conj(entries[j])),1);
        const kind=sameQ?(a.h===b.h?'diagonal':'samePrime'):'crossPrime';pairCounts[kind]++;
        const target=kind==='diagonal'?diagonal:kind==='samePrime'?same:cross;
        target[0]+=term[0];target[1]+=term[1];
      }
    }
    const expanded=plus(plus(diagonal,same),cross);close(expanded,[direct,0],mass);momentChecks++;
    assert(abs2(B)<=norm*direct+1e-8*Math.max(1,norm*direct));
    grouped=plus(grouped,scale(B,mu(g*e)));outerBound+=Math.sqrt(norm*direct);totalMoment+=direct;
    moments.push({e,Q,direct,diagonal:diagonal[0],samePrime:same[0],crossPrime:cross[0]});
    // Independent original p,d loops, retaining each prime weight and restriction.
    for(const p of ps)for(let d=Math.floor(D/g)+1;d<=Math.floor(2*D/g);d++){
      const m=d*p;if(!inside(m,M)||d%p===0||!mu(g*d))continue;
      for(const q of Q)if(gcd(m,e*q)===1)for(const h of hs){
        const term=times(vaaler(h,T),times(phase(-(2/g)*h*inv(m,e*q),e*q),phi(h,q,e,m,g,x,z)));
        ungrouped=plus(ungrouped,scale(term,mu(g*d)*mu(g*e)*Math.log(p)*Math.log(q)));
      }
    }
  }
  assert(moments.length>0);close(grouped,ungrouped,outerBound);assert(Math.sqrt(abs2(grouped))<=outerBound+1e-8);regroupChecks++;
  examples.push({g,D,E,M,N,x,z,T,ps,qs,hs,grouped,ungrouped,outerBound,totalMoment,moments});
}
assert(parityZeros>0&&nonunitExclusions>0&&Object.values(pairCounts).every(n=>n>0));
console.log(`aggregation: ${coefficientChecks} coefficient identities, ${parityZeros} parity zeros, ${regroupChecks} original-versus-grouped endpoint polynomials`);
console.log(`second moments: ${momentChecks} identities with actual endpoint weights; ${phaseChecks} exact modulus comparisons; ${nonunitExclusions} nonunit exclusions`);
console.log(`ordered unit pairs: diagonal=${pairCounts.diagonal}, same-prime different-h=${pairCounts.samePrime}, cross-prime=${pairCounts.crossPrime}`);

// A control against dropping the common divisor e from the cross-prime modulus.
const conductor={e:5,q1:11,q2:13,h1:1,h2:1,theta:1,c:715,a:-2,m1:1,m2:144};
const r1=mod(conductor.a*inv(conductor.m1,715),715),r2=mod(conductor.a*inv(conductor.m2,715),715);
assert.equal(conductor.m1%143,conductor.m2%143);assert.notEqual(r1,r2);assert.equal(gcd(conductor.a,715),1);
console.log(`conductor control: modulus=715, numerator=-2; m=1,144 agree modulo 143 but phase numerators are ${r1},${r2} modulo 715`);

// Finite Fourier completion on translated intervals, also longer than c.
function kloosterman(t,a,c){let out=[0,0];for(let u=0;u<c;u++)if(gcd(u,c)===1)out=plus(out,phase(t*u+a*inv(u,c),c));return out;}
let weilChecks=0,completionChecks=0,longIntervals=0,ramanujanChecks=0;const completed=[];
for(const c of [15,21,35,77,143])for(const a of [0,1,2,5,7,c]){
  const G=gcd(a,c),sums=Array.from({length:c},(_,t)=>kloosterman(t,a,c));
  assert(Math.sqrt(abs2(sums[0]))<=G+1e-8);ramanujanChecks++;
  for(let t=0;t<c;t++){assert(Math.sqrt(abs2(sums[t]))<=tau(c)*Math.sqrt(c*gcd(gcd(t,a),c))+1e-8);weilChecks++;}
  for(const [start,length]of [[3,Math.floor(c/3)],[-7,c-1],[5,3*c+7]]){
    let direct=[0,0],via=[0,0];const counts=Array(c).fill(0);
    for(let m=start;m<start+length;m++){counts[mod(m,c)]++;if(gcd(m,c)===1)direct=plus(direct,phase(a*inv(mod(m,c),c),c));}
    for(let t=0;t<c;t++){
      let hat=[0,0];for(let u=0;u<c;u++)if(counts[u])hat=plus(hat,scale(phase(-t*u,c),counts[u]));
      via=plus(via,times(sums[t],hat));
    }
    via=scale(via,1/c);close(direct,via,length);completionChecks++;if(length>c)longIntervals++;
    const bound=(length/c)*G+tau(c)*Math.sqrt(c*G)*(2+Math.log(c));
    assert(Math.sqrt(abs2(direct))<=bound+1e-8);completed.push({c,a,start,length,direct,via,bound});
  }
}
assert(longIntervals>0);console.log(`classical input controls: ${weilChecks} complete Weil bounds, ${ramanujanChecks} Ramanujan bounds; ${completionChecks} exact interval completions (${longIntervals} longer than the modulus)`);

// Exact rational bookkeeping; test the uniform upper-bound vertices as well.
function bgcd(a,b){a=a<0n?-a:a;while(b)[a,b]=[b,a%b];return a;}
function r(n,d=1){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=bgcd(n,d);return[n/g,d/g];}
const add=(a,b)=>r(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),mul=(a,b)=>r(a[0]*b[0],a[1]*b[1]),sub=(a,b)=>add(a,[-b[0],b[1]]);
const rs=(a,n,d=1)=>mul(a,r(n,d)),sum=(...a)=>a.reduce(add,r(0)),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],fmt=a=>`${a[0]}/${a[1]}`;
const m=r(517,1000),e=r(467,1000),q=r(1,20),qmin=r(9,200),amin=r(29,1000),amax=r(171,5000),loss=r(1,10000);
function budgets(m,a,qlo=qmin){const outside=add(e,rs(m,1,2));return[
  sum(e,m,rs(sub(q,a),1,2)),
  sum(outside,rs(q,1,2),rs(sum(e,q,a),1,4),loss),
  sum(outside,rs(q,1,2),rs(sub(sum(m,a),sum(e,qlo)),1,2),loss),
  sum(outside,q,rs(sum(e,a,rs(q,3)),1,4),loss),
  sum(outside,q,rs(sub(sum(m,a,q),sum(e,rs(qlo,2))),1,2),loss)
];}
const upper=[budgets(m,amin)[0],...budgets(m,amax).slice(1)];
assert.deepEqual(upper,[r(1989,2000),r(2221,2500),r(3851,5000),r(1173,1250),r(7977,10000)]);
const target=r(199,200);assert(cmp(add(upper[0],r(1,4000)),target)<0n);assert(upper.every(v=>cmp(v,target)<0n));
let exponentChecks=0;for(const mi of [512,514,517])for(const ai of [r(29,1000),r(3,100),r(17,500),amax])for(const qi of [qmin,r(47,1000),q]){
  const actual=budgets(r(mi,1000),ai,qi);actual.forEach((v,i)=>{assert(cmp(v,upper[i])<=0n);exponentChecks++;});
}
const fixedPrimeTrivial=sum(r(6,25),e,r(277,1000),q);assert.deepEqual(fixedPrimeTrivial,r(517,500));
console.log(`exact final exponents: ${upper.map(fmt).join(',')}; target=${fmt(target)}; ${exponentChecks} uniform vertex checks`);
console.log(`placement control: fixing the left prime and using the trivial cross kernel gives exponent=${fmt(fixedPrimeTrivial)}, which is insufficient`);
const artifact={schema:1,producer:'research/prime-dispersion-validation.js',source:'research/data-reuse/factor-windows.json',sourceSha256,
  coefficientChecks,parityZeros,phaseChecks,momentChecks,regroupChecks,nonunitExclusions,pairCounts,examples,
  conductor:{...conductor,phaseNumerators:[r1,r2]},weilChecks,ramanujanChecks,completionChecks,longIntervals,completed,
  exponents:upper.map(fmt),target:fmt(target),exponentChecks,fixedPrimeTrivial:fmt(fixedPrimeTrivial)};
fs.writeFileSync(path.join(__dirname,'data-reuse/prime-dispersion.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/prime-dispersion.json. Finite algebra and exponent checks only; no asymptotic rate or twin lower bound measured.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/prime-dispersion-validation.js
//   invocation:  node research/prime-dispersion-validation.js
//   code-sha256: a9359a0077abe4065a7c4868c0c885cc750fe6bedf04999d2f95cc95a02c0ed4
//   out-sha256:  bbbad7d31b8311009dba118c0db5d5cb327be02196cc79d980c8c9f3966662c8
//   body-lines:  9
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     1.3 s
// ============================================================================
// input: data-reuse/factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// aggregation: 6144 coefficient identities, 1024 parity zeros, 8 original-versus-grouped endpoint polynomials
// second moments: 54 identities with actual endpoint weights; 606096 exact modulus comparisons; 69768 nonunit exclusions
// ordered unit pairs: diagonal=129912, same-prime different-h=259824, cross-prime=216360
// conductor control: modulus=715, numerator=-2; m=1,144 agree modulo 143 but phase numerators are 713,427 modulo 715
// classical input controls: 1746 complete Weil bounds, 30 Ramanujan bounds; 90 exact interval completions (30 longer than the modulus)
// exact final exponents: 1989/2000,2221/2500,3851/5000,1173/1250,7977/10000; target=199/200; 180 uniform vertex checks
// placement control: fixing the left prime and using the trivial cross kernel gives exponent=517/500, which is insufficient
// Saved data-reuse/prime-dispersion.json. Finite algebra and exponent checks only; no asymptotic rate or twin lower bound measured.
// ============================================================================
// READINGS
// Finite checks cover exact identities and rational bookkeeping. The companion
// argument uses classical asymptotic inputs and controls a specified rectangle.
