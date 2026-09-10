// RESIDUAL COVERAGE — twisted coefficients, exceptional branch and exact masks.
// Companion: residual-coverage.md. Finite checks do not establish a rate.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const started=Date.now(),cap=()=>assert(Date.now()-started<180000,'three-minute cap');
const bytes=fs.readFileSync(path.join(__dirname,'data-reuse/factor-windows.json'));
const saved=JSON.parse(bytes),sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex');
assert.equal(saved.schema,1);
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],scale=(a,s)=>[a[0]*s,a[1]*s],sub=(a,b)=>add(a,scale(b,-1));
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],conj=a=>[a[0],-a[1]],norm=a=>a[0]**2+a[1]**2;
function near(a,b,mass=1){assert(Math.abs(a-b)<3e-8*Math.max(1,mass),`${a} != ${b}`);}
function close(a,b,mass=1){near(a[0],b[0],mass);near(a[1],b[1],mass);}
function factor(n){const f=[];for(const p of saved.basePrimes){if(p*p>n)break;if(n%p)continue;let k=0;do{n/=p;k++;}while(n%p===0);f.push([p,k]);}if(n>1)f.push([n,1]);return f;}
const mu=n=>{const f=factor(n);return f.some(([,k])=>k>1)?0:(-1)**f.length;};
const tw=(n,c,t)=>scale([Math.cos(t*Math.log(n)),-Math.sin(t*Math.log(n))],n**(-c));
const inside=(n,I)=>n>I[0]&&n<=I[1];
function convolution(I,W,c,t){const out=Array.from({length:I[1]*W+1},()=>[0,0]);
 for(let d=I[0]+1;d<=I[1];d++){const z=scale(tw(d,c,t),mu(d));out[d]=add(out[d],scale(z,-Math.log(d)));
  for(const p of saved.basePrimes){if(p>W)break;for(let r=p;r<=W;r*=p)out[d*r]=add(out[d*r],scale(z,-Math.log(p)));}
 }return out;
}
let coefficientChecks=0,firstBranch=0,twoReductionChecks=0;const coefficientRows=[];
for(const D of [8,16,32,64])for(const W of [4,9,27,64])for(const clipped of [false,true])for(const [c,t] of [[0,0],[.07,.7],[.02,7.3]]){
 const I=clipped?[D+Math.floor(D/4),2*D-3]:[D,2*D],actual=convolution(I,W,c,t);let nonzeroFirst=0;
 for(let l=1;l<actual.length;l++){
  let z=inside(l,I)?scale(tw(l,c,t),-mu(l)*Math.log(l)):[0,0];const f=factor(l),rep=f.filter(([,k])=>k>1);
  if(!rep.length){for(const[p]of f)if(p<=W&&inside(l/p,I))z=add(z,scale(tw(l/p,c,t),-mu(l/p)*Math.log(p)));}
  else if(rep.length===1){const[p,k]=rep[0],m=l/p**k;
   if(p**(k-1)<=W&&inside(p*m,I)){z=add(z,scale(tw(p*m,c,t),mu(m)*Math.log(p)));firstBranch++;nonzeroFirst++;
    for(const g of [1,2])if(l%g===0){if(p===2&&g===2){assert.equal(l/g,m*2**(k-1));assert.equal(m%2,1);twoReductionChecks++;}else{assert.equal(m%g,0);assert.equal(l/g,(m/g)*p**k);}}
   }
   if(p**k<=W&&inside(m,I))z=add(z,scale(tw(m,c,t),-mu(m)*Math.log(p)));
  }
  close(actual[l],z,Math.log(Math.max(2,l)));coefficientChecks++;
 }
 coefficientRows.push({I,W,c,t,nonzeroFirst});cap();
}
assert(firstBranch>0&&twoReductionChecks>0);
console.log(`input: factor-windows.json sha256=${sourceSha256}`);
console.log(`twisted decomposition: ${coefficientChecks} identities; ${firstBranch} first-branch entries; ${twoReductionChecks} p=2,g=2 reductions`);

const mod=(a,q)=>(a%q+q)%q;
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
function inv(a,q){if(q===1n)return 0n;let b=q,u=1n,v=0n;while(b){const t=a/b;[a,b]=[b,a-t*b];[u,v]=[v,u-t*v];}assert.equal(a,1n);return mod(u,q);}
function phase(a,q){const z=2*Math.PI*Number(mod(a,q))/Number(q);return[Math.cos(z),Math.sin(z)];}
function phi(h,m,n,g,z0,z,shift){const q=g*m*n;return sub(phase(h*(z0-shift),q),phase(h*(z-shift),q));}
const ch=(h,T)=>{const v=h/(T+1),w=Math.PI*v*(1-v)/Math.tan(Math.PI*v)+v;return[0,w/(2*Math.PI*h)];};
let phaseChecks=0,wrongShift=0;
for(const gg of [1,2])for(let mm=1;mm<=80;mm++)for(let nn=1;nn<=80;nn++){
 const g=BigInt(gg),m=BigInt(mm),n=BigInt(nn);if(gcd(m,n)!==1n)continue;const theta=2n/g,q=g*m*n;
 for(const h of [1n,7n,29n])for(const z of [128n,257n]){
  const native=mod(-theta*h*inv(m,n)*g*m+h*z,q),reciprocal=mod(theta*h*inv(n,m)*g*n+h*(z-2n),q);
  assert.equal(native,reciprocal);phaseChecks++;if(mod(theta*h*inv(n,m)*g*n+h*z,q)!==native)wrongShift++;
 }
}
assert(wrongShift>0);
// First-branch moment: construct the direct coefficient from the ORIGINAL
// squarefree divisor and its convolution multiplier. Regroup independently
// by the smaller base d with p*d in the original interval.
let momentChecks=0,pairChecks=0;const momentRows=[];
const configurations=[{ps:[5,7],k:2},{ps:[11,13],k:3},{ps:[29,31],k:8},{ps:[2],k:5},{ps:[1],k:1,low:true}];
for(const config of configurations)for(const gg of [1,2])for(const orientation of ['left','right'])for(const [c,t]of [[0,0],[.03,2.7]]){
 const {ps,k,low=false}=config,D=128,I=[D,2*D],W=Math.max(...ps)**(k-1),g=BigInt(gg),theta=2n/g,N=24,T=12,hs=[1,2,3,5,7];
 const baseScale=ps[0]===2&&gg===2?1:gg,reducedPower=p=>p**k*baseScale/gg;
 const x=2n**BigInt(Math.ceil(Math.log2(D*Math.max(...ps)**(k-1)*N))),z0=x/2n,z=3n*x/4n;
 const coefficients=new Map();
 for(let original=D+1;original<=2*D;original++)for(const p of ps)if(original%p===0&&p**(k-1)<=W){
  const l=original*p**(k-1);if(mu(original)===0)continue;
  coefficients.set(l,add(coefficients.get(l)||[0,0],scale(tw(original,c,t),low?mu(original):-mu(original)*Math.log(p))));
 }
 const beta=n=>[Math.cos(n/3)+.25,Math.sin(n/5)],F2=Array.from({length:N},(_,j)=>norm(beta(N+j+1))).reduce((a,b)=>a+b,0);
 function kernel(base,p,h,n){const u=BigInt(base*reducedPower(p)),v=BigInt(n),hh=BigInt(h);
  // Left exceptional coefficient uses reciprocity; right exceptional
  // coefficient uses the native orientation (negative theta, no shift).
  return orientation==='left'?mul(phase(theta*hh*inv(v,u),u),phi(hh,u,v,g,z0,z,2n)):
    mul(phase(-theta*hh*inv(v,u),u),phi(hh,v,u,g,z0,z,0n));
 }
 let direct=[0,0],grouped=[0,0],moment=0,expanded=[0,0],mass=0;
 for(const[l,alpha]of coefficients){if(l%gg)continue;const u=BigInt(l/gg);
  for(let n=N+1;n<=2*N;n++){const v=BigInt(n);if(gcd(u,v)!==1n)continue;
   for(const hh of hs){const h=BigInt(hh),native=orientation==='left'?
    mul(phase(-theta*h*inv(u,v),v),phi(h,u,v,g,z0,z,0n)):
    mul(phase(-theta*h*inv(v,u),u),phi(h,v,u,g,z0,z,0n));
    direct=add(direct,mul(mul(alpha,beta(n)),mul(ch(hh,T),native)));
   }
  }
 }
 const lo=Math.floor(D/(baseScale*Math.max(...ps))),hi=Math.ceil(2*D/(baseScale*Math.min(...ps))),count=hi-lo;
 for(let d=lo+1;d<=hi;d++)for(let n=N+1;n<=2*N;n++){
  const entries=[];for(const p of ps)if(inside(baseScale*d*p,I)&&(low||d%p!==0)&&gcd(BigInt(d*reducedPower(p)),BigInt(n))===1n){
   for(const h of hs)entries.push(mul(scale(tw(p,c,t),low?1:Math.log(p)),mul(ch(h,T),kernel(d,p,h,n))));
  }
  const Y=entries.reduce(add,[0,0]);moment+=norm(Y);grouped=add(grouped,mul(mul(scale(tw(baseScale*d,c,t),mu(baseScale*d)),beta(n)),Y));
  for(const x of entries)for(const y of entries){expanded=add(expanded,mul(x,conj(y)));mass+=Math.sqrt(norm(x)*norm(y));pairChecks++;}
 }
 close(direct,grouped,mass);close(expanded,[moment,0],mass);assert(norm(grouped)<=F2*count*moment+3e-8*Math.max(1,mass));
 assert(moment>1e-10,'phase scale must make the moment check active');
 momentRows.push({ps,k,low,g:gg,orientation,c,t,x:x.toString(),count,F2,direct,grouped,moment});momentChecks++;
}
console.log(`orientations: ${phaseChecks} exact reciprocity residues; ${wrongShift} wrong-shift controls rejected`);
console.log(`first-branch/low moments: ${momentChecks} twisted coefficient/Cauchy checks; ${pairChecks} expanded pairs; powers through 8, p=2, and prime-free case`);

// Exact rational certificates, with no floating-point boundary decisions.
function rat(n,d=1){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const h=gcd(n,d);return[n/h,d/h];}
const ra=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),rm=(a,b)=>rat(a[0]*b[0],a[1]*b[1]),rs=(a,n,d=1)=>rm(a,rat(n,d));
const sum=(...as)=>as.reduce(ra,rat(0)),cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],max=(a,b)=>cmp(a,b)>=0n?a:b,fmt=a=>`${a[0]}/${a[1]}`;
function budgets(delta,nu){const a=ra(delta,rat(6,25)),b=ra(nu,rat(1,20));return{
 left:[sum(rs(a,5,4),rs(b,1,2),rat(3,50)),sum(rat(1,2),rs(ra(a,b),1,2),rat(-3,25)),sum(b,rs(a,1,2),rat(-3,25))],
 right:[sum(rs(a,1,2),rs(b,5,4),rat(1,80)),sum(rat(1,2),rs(ra(a,b),1,2),rat(-1,40)),sum(a,rs(b,1,2),rat(-1,40))]};}
let gridChecks=0,oldInclusions=0;
for(let i=240;i<=760;i+=2)for(let j=50;j<=950;j+=2){const d=rat(i,1000),e=rat(j,1000),a=ra(d,rat(6,25)),b=ra(e,rat(1,20)),B=budgets(d,e);
 const left=B.left.every(v=>cmp(v,rat(1))<0n),right=B.right.every(v=>cmp(v,rat(1))<0n);
 assert.equal(left,cmp(sum(rs(d,5),rs(e,2)),rat(123,50))<0n);
 assert.equal(right,cmp(ra(d,e),rat(19,25))<0n);
 const C=sum(rat(3,20),rs(ra(a,b),7,10),rs(max(a,b),1,4));
 if(cmp(C,rat(1))<0n||(cmp(C,rat(28,25))<0n&&cmp(B.left[0],rat(1))<0n)){assert(left||right);oldInclusions++;}gridChecks++;
}
const witnesses={uniformEdge:budgets(rat(7,10),rat(1,20)),leftEdge:budgets(rat(6,25),rat(5,8)),openBalanced:budgets(rat(2,5),rat(2,5))};
assert.deepEqual(witnesses.openBalanced.right,[rat(179,200),rat(51,50),rat(21,25)]);
assert.deepEqual(sum(rat(123,100),rs(rat(6,25),-3,2)),rat(87,100));
assert.deepEqual(sum(rs(rat(47,150),5),rs(rat(67,150),2)),rat(123,50));
assert.deepEqual(sum(rat(47,150),rat(67,150)),rat(19,25));
// Power-band substitution for the first branch, for all k>=2:
// R <= const*P*W, P<=W, base length D/P.
assert.deepEqual(sum(rat(-5,4),rat(1),rat(1,2)),rat(1,4));
assert.deepEqual(sum(rat(-5,4),rat(1,2),rat(1,4)),rat(-1,2));
console.log(`coverage: ${gridChecks} exact rational grid checks; ${oldInclusions} prior-region inclusions; limiting product=87/100`);
console.log(`open d=e=x^(2/5): right cross/zero/period=${witnesses.openBalanced.right.map(fmt).join(',')}; required moment saving exceeds 1/25`);

function iroot(n,k){let lo=0n,hi=1n;while(hi**k<=n)hi*=2n;while(hi-lo>1n){const m=(lo+hi)/2n;if(m**k<=n)lo=m;else hi=m;}return lo;}
const cut=(x,p,q)=>iroot(BigInt(x)**BigInt(p),BigInt(q));
function terms(n,f,A,W){let ds=[{d:1,sign:1,used:[]}];for(let i=0;i<f.length;i++){const old=ds.length;for(let j=0;j<old;j++)ds.push({d:ds[j].d*f[i][0],sign:-ds[j].sign,used:[...ds[j].used,i]});}
 const out=[];for(const u of ds){if(u.d<=A||n/u.d<=W)continue;let beta=0;for(let i=0;i<f.length;i++){const[p,k]=f[i];let r=1;for(let j=1;j<=k-Number(u.used.includes(i));j++){r*=p;if(r>W)beta+=Math.log(p);}}if(beta)out.push({...u,beta});}return out;
}
let maskChecks=0,bigMaskChecks=0;const windows=[];
for(const win of saved.windows){const{x,lo,hi,factorStart,primePowerFactors}=win,U=Number(cut(x,6,25)),Y=Number(cut(x,1,20)),L=cut(x,3,4),K=cut(x,49,20),sums=[0,0,0,0],counts=[0,0,0,0];let total=0,mass=0;
 for(let n=lo;n<=hi;n++){
  const left=terms(n,primePowerFactors[n-factorStart],U,U),right=terms(n-2,primePowerFactors[n-2-factorStart],Y,Y);
  for(const d of left)for(const e of right){const dd=BigInt(d.d),ee=BigInt(e.d),product=dd*ee,monomial=dd**5n*ee**2n;
   const low=product<=L,side=monomial<=K,group=low?(side?2:0):(side?1:3),value=d.sign*e.sign*d.beta*e.beta;
   assert.equal(low,dd<=L/ee);assert.equal(side,dd<=iroot(K/(ee**2n),5n));
   if(monomial>BigInt(Number.MAX_SAFE_INTEGER))bigMaskChecks++;
   sums[group]+=value;counts[group]++;total+=value;mass+=Math.abs(value);maskChecks++;
  }
 }near(sums.reduce((a,b)=>a+b,0),total,mass);
 const low=sums[0]+sums[2],side=sums[1]+sums[2],both=sums[2];near(low+side-both+sums[3],total,mass);
 assert(counts[2]>0&&counts[3]>0);assert(Math.abs(both)>1e-5,'double-counting control must be active');
 windows.push({x,lo,hi,U,Y,L:L.toString(),K:K.toString(),counts,sums,total,mass});cap();
}
assert(bigMaskChecks>0);
console.log(`archived masks: ${maskChecks} weighted divisor pairs; ${bigMaskChecks} monomials above safe integer range; ${windows.length} exact inclusion-exclusion partitions`);
const artifact={schema:1,producer:'residual-coverage-validation.js',source:'data-reuse/factor-windows.json',sourceSha256,
 coefficientChecks,firstBranch,twoReductionChecks,coefficientRows,phaseChecks,wrongShift,momentChecks,pairChecks,momentRows,gridChecks,oldInclusions,
 witnesses:Object.fromEntries(Object.entries(witnesses).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([s,z])=>[s,z.map(fmt)]))])),maskChecks,bigMaskChecks,windows};
fs.writeFileSync(path.join(__dirname,'data-reuse/residual-coverage.json'),JSON.stringify(artifact)+'\n');
console.log('Saved data-reuse/residual-coverage.json. Finite identities and budget checks only; no asymptotic rate measured.');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/residual-coverage-validation.js
//   invocation:  node research/residual-coverage-validation.js
//   code-sha256: 99254e5cd1ed4dc74d8576db7eaa13e49b952baacc5366389a3df35be216e519
//   out-sha256:  19b1c2f1316689b8e95e216fd8b63ac42e9d9ecf684cea87f348e0889f6d2f20
//   body-lines:  8
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   forced:      2026-09-06, 1 of 14 figures in the replaced block not reproduced (first: 47000)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     1.4 s
// ============================================================================
// input: factor-windows.json sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// twisted decomposition: 146016 identities; 3321 first-branch entries; 1710 p=2,g=2 reductions
// orientations: 47172 exact reciprocity residues; 47116 wrong-shift controls rejected
// first-branch/low moments: 40 twisted coefficient/Cauchy checks; 535900 expanded pairs; powers through 8, p=2, and prime-free case
// coverage: 117711 exact rational grid checks; 21433 prior-region inclusions; limiting product=87/100
// open d=e=x^(2/5): right cross/zero/period=179/200,51/50,21/25; required moment saving exceeds 1/25
// archived masks: 273177 weighted divisor pairs; 231071 monomials above safe integer range; 3 exact inclusion-exclusion partitions
// Saved data-reuse/residual-coverage.json. Finite identities and budget checks only; no asymptotic rate measured.
// ============================================================================
// READINGS
// The companion note derives the estimates. The archived windows test masks
// and signed reconstruction, not asymptotic coverage or a twin lower bound.
