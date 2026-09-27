// STRUCTURAL LITERATURE — finite checks of the derived kernel dictionary.
// Companion: structural-literature-audit.md. Does not prove the proposed moment.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const started=Date.now();
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;}
const mod=(a,c)=>(a%c+c)%c;
function inv(a,c){if(c===1n)return 0n;let b=c,s=1n,t=0n;while(b){const q=a/b;[a,b]=[b,a-q*b];[s,t]=[t,s-q*t];}assert.equal(a,1n);return mod(s,c);}
function mu(n){let sign=1;for(let p=2;p*p<=n;p++){if(n%p)continue;n/=p;sign=-sign;if(n%p===0)return 0;}return n>1?-sign:sign;}
function tau(n){let out=1;for(let p=2;p*p<=n;p++){let k=0;while(n%p===0){n/=p;k++;}out*=k+1;}return n>1?2*out:out;}
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],scale=(a,k)=>[a[0]*k,a[1]*k];
const mul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]],conj=a=>[a[0],-a[1]];
function phase(a,c){const t=2*Math.PI*Number(mod(a,c))/Number(c);return[Math.cos(t),Math.sin(t)];}
let maxFourierError=0;
function close(a,b,mass){const error=Math.hypot(a[0]-b[0],a[1]-b[1]);maxFourierError=Math.max(maxFourierError,error);assert(error<1e-9*Math.max(1,mass));}
let phaseChecks=0,collisionChecks=0,gcdChecks=0,signChecks=0,originalSignChecks=0;
const controls={wrongProductModulus:0,missingTheta:0,nonsquarefreeSign:0};
for(let uu=1;uu<=36;uu++)for(let vv=1;vv<=36;vv++){
 const u=BigInt(uu),v=BigInt(vv),j=gcd(u,v),l1=u/j,l2=v/j,c=j*l1*l2;
 assert.equal(c,u*v/j);assert.equal(gcd(l1,l2),1n);
 if(mu(uu)&&mu(vv)){assert.equal(mu(uu)*mu(vv),mu(Number(l1))*mu(Number(l2)));signChecks++;}
 else if(mu(uu)*mu(vv)!==mu(Number(l1))*mu(Number(l2)))controls.nonsquarefreeSign++;
 for(const h1 of [1n,2n,5n,11n])for(const h2 of [1n,2n,5n,11n]){
  const R=h1*l2-h2*l1;
  assert.equal(R===0n,h1%l1===0n&&h2%l2===0n&&h1/l1===h2/l2);collisionChecks++;
  for(const theta of [1n,2n]){
   const r=-theta*R;
   if(R!==0n){assert(gcd(r,c)<=2n*gcd(R,j)*gcd(h1,l1)*gcd(h2,l2));gcdChecks++;}
   for(const m of [1n,7n,13n,25n,43n]){if(gcd(m,c)!==1n)continue;
    const original=mod(-theta*h1*inv(m,u)*(c/u)+theta*h2*inv(m,v)*(c/v),c);
    assert.equal(original,mod(r*inv(m,c),c));phaseChecks++;
    if(theta===2n&&original!==mod(-R*inv(m,c),c))controls.missingTheta++;
    const product=u*v;
    if(mod(original*(product/c)-r*inv(m,product),product)!==0n)controls.wrongProductModulus++;
   }
  }
 }
}
for(const g of [1,2])for(let e1=1;e1<=32;e1++)for(let e2=1;e2<=32;e2++)for(const q1 of [3,5,7])for(const q2 of [3,5,7]){
 if(!mu(g*e1)||!mu(g*e2)||e1%q1===0||e2%q2===0)continue;
 const u=e1*q1,v=e2*q2,j=Number(gcd(BigInt(u),BigInt(v)));
 assert.equal(mu(g*e1)*mu(g*e2),mu(u/j)*mu(v/j));originalSignChecks++;
}
console.log(`kernel dictionary: ${phaseChecks} exact phase checks, ${collisionChecks} collision classifications, ${gcdChecks} gcd inequalities`);
console.log(`Mobius signs: ${signChecks} squarefree pairs, ${originalSignChecks} original g/e/q checks`);

const energyRows=[];
for(const N of [2,5,10,20,40])for(const A of [1,3,7,16,50]){
 const frequencies=new Map();
 for(let u=N+1;u<=2*N;u++)for(let h=A+1;h<=2*A;h++){
  const d=Number(gcd(BigInt(h),BigInt(u))),key=`${h/d}/${u/d}`;
  frequencies.set(key,(frequencies.get(key)||0)+1);
 }
 const energy=[...frequencies.values()].reduce((s,n)=>s+n*n,0);
 let parametrized=0,largeGcdChecks=0;
 const stop=2*Math.min(N,A);
 for(let l1=1;l1<=stop;l1++)for(let l2=1;l2<=stop;l2++){
  if(gcd(BigInt(l1),BigInt(l2))!==1n)continue;
  const jlo=Math.max(Math.floor(N/l1),Math.floor(N/l2))+1,jhi=Math.min(Math.floor(2*N/l1),Math.floor(2*N/l2));
  const tlo=Math.max(Math.floor(A/l1),Math.floor(A/l2))+1,thi=Math.min(Math.floor(2*A/l1),Math.floor(2*A/l2));
  if(jhi<jlo||thi<tlo)continue;
  assert(jlo>N/(2*A));largeGcdChecks++;
  parametrized+=(jhi-jlo+1)*(thi-tlo+1);
 }
 assert.equal(energy,parametrized);
 let harmonic=0;for(let k=1;k<=stop;k++)harmonic+=1/k;
 const bound=8*N*A*harmonic;assert(energy<=bound);
 energyRows.push({N,A,energy,parametrized,largeGcdChecks,bound});
}
let gcdAverageChecks=0;
for(let R=1;R<=120;R++)for(const J of [1,2,7,20])for(const sigma of [.5,1]){
 let sum=0;for(let j=J+1;j<=2*J;j++)sum+=Number(gcd(BigInt(R),BigInt(j)))**sigma;
 assert(sum<=2*J*tau(R)+1e-9);gcdAverageChecks++;
}
console.log(`counting: ${energyRows.length} independently parametrized energies; ${gcdAverageChecks} nonzero common-factor averages`);

const fourierRows=[];
for(const [uu,vv] of [[1,1],[6,10],[12,18],[8,20],[15,21],[9,27],[5,7]])for(const gg of [1,2])for(const [hh1,hh2] of [[3,5],[1,2],[7,11]]){
 const u=BigInt(uu),v=BigInt(vv),j=gcd(u,v),c=u*v/j,g=BigInt(gg),theta=2n/g,h1=BigInt(hh1),h2=BigInt(hh2);
 const r=-theta*(h1*(v/j)-h2*(u/j));
 function F(m){const p1=sub(phase(h1*64n,g*m*u),phase(h1*97n,g*m*u)),p2=sub(phase(h2*64n,g*m*v),phase(h2*97n,g*m*v));
  return mul([Math.sin(Number(m)/3),Math.cos(Number(m)/5)],mul(p1,conj(p2)));
 }
 let direct=[0,0],completed=[0,0],mass=0;
 for(let m=7n;m<=19n;m++)if(gcd(m,c)===1n){direct=add(direct,mul(F(m),phase(r*inv(m,c),c)));mass+=Math.hypot(...F(m));}
 for(let t=0n;t<c;t++){
  let hat=[0,0],S=[0,0];
  for(let m=7n;m<=19n;m++)hat=add(hat,mul(F(m),phase(-t*m,c)));
  for(let a=0n;a<c;a++)if(gcd(a,c)===1n)S=add(S,phase(t*a+r*inv(a,c),c));
  completed=add(completed,scale(mul(hat,S),1/Number(c)));
 }
 close(direct,completed,mass);fourierRows.push({u:uu,v:vv,g:gg,h1:hh1,h2:hh2,c:String(c),r:String(r)});
}
console.log(`completion: ${fourierRows.length} endpoint-weighted Fourier identities (relative tolerance 1e-9)`);

// Exact rational arithmetic for diagnostics, NOT evidence for an analytic bound.
function rat(n,d=1){n=BigInt(n);d=BigInt(d);const q=gcd(n,d);return[n/q,d/q];}
const ra=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const rm=(a,b)=>rat(a[0]*b[0],a[1]*b[1]);
const rs=(a,b)=>ra(a,[-b[0],b[1]]);
const cmp=(a,b)=>a[0]*b[1]<b[0]*a[1]?-1:a[0]*b[1]>b[0]*a[1]?1:0;
const mx=(...v)=>v.reduce((a,b)=>cmp(a,b)>=0?a:b),str=a=>`${a[0]}/${a[1]}`;
const spectralRows=[],H=rat(9,100),zero=rat(0);
for(const Jexp of [rat(0),rat(1,10),rat(27,100),rat(3,10),rat(9,25),rat(2,5)]){
 const L=rs(rat(9,20),Jexp),K=ra(H,L),q=rm(rat(2),L);
 const generic=mx(zero,rs(q,K),rs(rm(rat(2),q),rm(rat(3),K)));
 const extra=mx(zero,rs(rs(ra(K,H),mx(H,L)),L));
 const structured=ra(mx(zero,rs(q,K)),extra);
 if(cmp(Jexp,rat(27,100))<=0){assert.equal(str(extra),'0/1');assert.equal(str(structured),str(generic));}
 spectralRows.push({commonFactorExponent:str(Jexp),L:str(L),H:str(H),generic:str(generic),structured:str(structured),extra:str(extra)});
}
const a=rat(16,25),b=rat(9,20),conditionalBudgets=[rm(rat(1,2),ra(rat(1),a)),ra(rm(rat(1,2),a),rm(rat(3,2),b)),a].map(str);
assert.deepEqual(conditionalBudgets,['41/50','199/200','16/25']);
const hypotheticalSaving=rm(rat(9,10),rat(1,32)),oldDeficit=rat(1,25);
assert(cmp(hypotheticalSaving,oldDeficit)<0);
for(const count of Object.values(controls))assert(count>0);
assert(Date.now()-started<180000,'three-minute cap');
console.log(`rational budgets: ${spectralRows.length} spectral rows; conditional block ${conditionalBudgets.join(', ')}; hypothetical ${str(hypotheticalSaving)} < required ${str(oldDeficit)}`);
console.log(`negative controls detected: product modulus=${controls.wrongProductModulus}; missing theta=${controls.missingTheta}; nonsquarefree sign=${controls.nonsquarefreeSign}`);
const out={schema:1,scope:'Finite identities and rational diagnostics only. The full moment is proved separately in grouped-divisor-moment.md; the global twin margin remains OPEN.',phaseChecks,collisionChecks,gcdChecks,signChecks,originalSignChecks,gcdAverageChecks,controls,energyRows,fourierRows,spectralRows,conditionalBudgets,hypotheticalSaving:str(hypotheticalSaving),oldDeficit:str(oldDeficit)};
fs.writeFileSync(path.join(__dirname,'structural-literature-validation.json'),JSON.stringify(out,null,2)+'\n');
console.log('PASS: exact kernel dictionary and finite diagnostics; no asymptotic claim');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/structural-literature-validation.js
//   invocation:  node research/structural-literature-validation.js
//   code-sha256: 0ceb7c745e027e4414e18603beb2904dc98dde7a5d234c2ff01f3475f1ba8cd9
//   out-sha256:  94b53d86386152d113f505a07f37331b18904b9f93d4ff79c0b79a97b018eb0a
//   body-lines:  7
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// kernel dictionary: 177600 exact phase checks, 20736 collision classifications, 41020 gcd inequalities
// Mobius signs: 529 squarefree pairs, 3328 original g/e/q checks
// counting: 25 independently parametrized energies; 960 nonzero common-factor averages
// completion: 42 endpoint-weighted Fourier identities (relative tolerance 1e-9)
// rational budgets: 6 spectral rows; conditional block 41/50, 199/200, 16/25; hypothetical 9/320 < required 1/25
// negative controls detected: product modulus=67742; missing theta=87428; nonsquarefree sign=165
// PASS: exact kernel dictionary and finite diagnostics; no asymptotic claim
// ============================================================================
// READINGS
// Finite identities and rational diagnostics only; no asymptotic rate inferred.
