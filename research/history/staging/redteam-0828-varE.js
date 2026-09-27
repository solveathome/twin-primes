// ============================================================================
// redteam-0828-varE.js — ADVERSARIAL companion to redteam-0828-varE.md
// Independent re-derivations for the four 2026-08-28 notes on Q-varE-limit:
//   varE-spectral.md / varE-asymptotic.md / varE-theta2-step.md /
//   lit-dickman-variance.md, and their source paper/variance-note.md ss6-7.
// NOTHING here reads or calls those producers. Every object is rebuilt from
// the mathematical definition, by a different route where one exists.
//   R0  the generalized Dickman law GD(theta), THREE independent routes:
//       (a) closed form re-derived here from the delay equation,
//       (b) an independent Simpson solve of that equation,
//       (c) Monte Carlo of the LIMIT process (Poisson, intensity theta dw/w),
//           which uses no density and no normalisation constant.
//       plus the theta=1 branch against Gorodetsky (1.12) read at the page.
//   R1  the normalisation: is the diagonal u = 2 in the same coordinate?
//   R2  the algebraic identities: kappa, the prime-by-prime collapse,
//       (p-1)(p-4)+2 = (p-2)(p-3), and delta*C_y = prod(1-2/p).
//   R3  X and X_dec EXACT by direct per-h enumeration (NOT by the sibling's
//       sieve), x = 7, 11, 13, 17, 19.
//   R4  the fit protocol on the DATA: which point set gives which coefficients.
//   R5  the model at high N, and the control fits, including the ONE test the
//       spectral note's control does not run: the frozen out-of-sample forecast.
//   R6  how much of "the seven forms agree" is forced by pointwise tracking.
//   node research/history/staging/redteam-0828-varE.js    (~4 min)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
function assert(c,m){ if(!c) throw new Error('ASSERT FAIL: '+m); }
const GAMMA=0.5772156649015328606;
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
class Kah{constructor(){this.s=0;this.c=0}add(v){const y=v-this.c,t=this.s+y;this.c=(t-this.s)-y;this.s=t}get(){return this.s}}

// the nine diagonal points, transcribed from paper/variance-note.md s7 table
const PTS=[
 {x:7, W:210,              y:13,      r:0.1521},
 {x:11,W:2310,             y:47,      r:0.2563},
 {x:13,W:30030,            y:173,     r:0.2995},
 {x:17,W:510510,           y:709,     r:0.3268},
 {x:19,W:9699690,          y:3109,    r:0.3473},
 {x:23,W:223092870,        y:14929,   r:0.3643},
 {x:29,W:6469693230,       y:80429,   r:0.3774},
 {x:31,W:200560490130,     y:447829,  r:0.3876},
 {x:37,W:7420738134810,    y:2724079, r:0.3958},
];
const W41=304250263527210, Y41=17442769;

console.log('=== R0: GD(theta), three independent routes ===');
// (a) CLOSED FORM, re-derived here from the Laplace transform, not copied.
//   L(s)=exp(theta*int_0^1 (e^{-sw}-1)dw/w)  =>  sL'(s) = -theta L(s)(1-e^{-s})
//   =>  (t f(t))' = theta( f(t) - f(t-1) )  =>  t f'(t) = (theta-1) f(t) - theta f(t-1).
//   On (0,1]: f = c t^{theta-1}. theta=2: f = c t.
//   On (1,2], theta=2: t g' - g = -2(t-1) with g=f/c  =>  (g/t)' = -2/t + 2/t^2
//   =>  g = 3t - 2t ln t - 2   (constant fixed by g(1)=1).
//   int_0^2 f = c[1/2 + (9/2 - 2(2ln2 - 3/4)) - 2] = c[1/2 + 4 - 4 ln 2].
//   Normalisation c = e^{-2 gamma} is NOT assumed: route (c) tests it.
const EM2G=Math.exp(-2*GAMMA);
const CLOSED2 = 1 - EM2G*(4.5 - 4*Math.log(2));
console.log('  (a) closed form  1 - e^{-2g}(9/2 - 4 ln 2)');
console.log('      e^{-2gamma}      = '+EM2G.toPrecision(17));
console.log('      9/2 - 4 ln 2     = '+(4.5-4*Math.log(2)).toPrecision(17));
console.log('      lambda_2(2)      = '+CLOSED2.toPrecision(17));
console.log('      note quotes 0.45545648 ->  diff = '+(CLOSED2-0.45545648).toExponential(2));
// the two equivalent groupings the notes print, checked to be the same number
console.log('      1 - e^{-2g}(1/2 + 4 - 4ln2) = '+(1-EM2G*(0.5+4-4*Math.log(2))).toPrecision(17));

// (b) INDEPENDENT numeric solve: Simpson on the integral form, two step sizes.
function densTail(theta, TMAX, h){
  const N=Math.round(TMAX/h)+1, f=new Float64Array(N);
  const c=Math.exp(-theta*GAMMA)/(theta===1?1:1);   // Gamma(1)=Gamma(2)=1
  const K=Math.round(1/h);
  for(let i=0;i<=K&&i<N;i++) f[i]=c*Math.pow(i*h,theta-1);
  // f(t) = t^{theta-1}(c - theta*I(t)),  I(t)=int_1^t f(s-1) s^{-theta} ds
  // Simpson over pairs of steps (needs f on [t-1] already known: true since t>1).
  const g=i=>f[i-K]/Math.pow(i*h,theta);
  let I=0;
  for(let i=K+1;i<N;i++){
    if((i-K)%2===1){ // provisional trapezoid for the odd endpoint
      const It=I+h/2*(g(i-1)+g(i));
      f[i]=Math.pow(i*h,theta-1)*(c-theta*It);
    } else {         // Simpson closes the pair, and rewrites the odd point
      const Is=I+h/3*(g(i-2)+4*g(i-1)+g(i));
      I=Is; f[i]=Math.pow(i*h,theta-1)*(c-theta*I);
    }
    if(f[i]<0)f[i]=0;
  }
  const cum=new Float64Array(N); for(let i=1;i<N;i++) cum[i]=cum[i-1]+h/2*(f[i-1]+f[i]);
  let mean=0; for(let i=1;i<N;i++) mean+=h/2*((i-1)*h*f[i-1]+i*h*f[i]);
  return {f,h,N,cum,tot:cum[N-1],mean,tail:u=>1-cum[Math.round(u/h)]};
}
const US=[0.6,1,1.5,2,2.5,3];
for(const h of [1e-4,2.5e-5]){
  const D2=densTail(2,16,h), D1=densTail(1,16,h);
  console.log('  (b) Simpson h='+h+'  theta=2: int f = '+D2.tot.toFixed(9)+'  mean = '+D2.mean.toFixed(7)
    +'   lambda_2(2) = '+D2.tail(2).toFixed(9));
  console.log('                      theta=1: int f = '+D1.tot.toFixed(9)+'  mean = '+D1.mean.toFixed(7)
    +'   lambda_1(2) = '+D1.tail(2).toFixed(9));
  if(h===2.5e-5){
    console.log('      lambda_2(u), u=0.6..3: '+US.map(u=>D2.tail(u).toFixed(6)).join('  ')
      +'   (note: 0.943257 0.842382 0.657116 0.455456 0.282040 0.157654)');
    console.log('      lambda_1(u), u=0.6..3: '+US.map(u=>D1.tail(u).toFixed(6)).join('  ')
      +'   (note: 0.663124 0.438541 0.218559 0.093970 0.035636 0.012095)');
  }
}
// (c) MONTE CARLO OF THE LIMIT PROCESS. No density, no normalising constant:
//     GD(theta) = sum of the points of a Poisson process of intensity theta dw/w
//     on (0,1]. Truncating at eps loses mean theta*eps.
function gdMC(theta,N,seed,eps){
  let s=seed>>>0; const rnd=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return (s+1)/4294967297;};
  const rate=theta*Math.log(1/eps), lne=Math.log(eps);
  const cnt=new Float64Array(6); const us=[0.6,1,1.5,2,2.5,3];
  for(let it=0;it<N;it++){
    // Poisson(rate) count by Knuth on the log scale
    let k=0,p=0; const lim=rate;
    for(;;){ p+=-Math.log(rnd()); if(p>lim)break; k++; }
    let X=0; for(let j=0;j<k;j++) X+=Math.exp(lne*rnd());   // w = eps^{U}
    for(let i=0;i<6;i++) if(X>us[i]) cnt[i]++;
  }
  return Array.from(cnt).map(v=>v/N);
}
{
  const N=4e6;
  const m2=gdMC(2,N,20260828,1e-9), m1=gdMC(1,N,777331,1e-9);
  const se=v=>Math.sqrt(v*(1-v)/N);
  console.log('  (c) Monte Carlo of the limit process, N='+N+', eps=1e-9 (no density used):');
  console.log('      theta=2 tail: '+m2.map(v=>v.toFixed(5)).join(' ')+'   se(u=2) = '+se(m2[3]).toFixed(5));
  console.log('              closed/ODE at u=2: '+CLOSED2.toFixed(6)+'   MC-closed = '+(m2[3]-CLOSED2).toFixed(5));
  console.log('      theta=1 tail: '+m1.map(v=>v.toFixed(5)).join(' ')+'   se(u=2) = '+se(m1[3]).toFixed(5));
  console.log('              Gorodetsky (1.12) lambda(u)=1-e^{-g}u on [0,1]: u=0.6 -> '
    +(1-Math.exp(-GAMMA)*0.6).toFixed(6)+'   u=1 -> '+(1-Math.exp(-GAMMA)).toFixed(6));
}

console.log('\n=== R1: is the diagonal u = 2 in the same coordinate? ===');
console.log('   x |        L=x# |         y | u = lnL/lny | lambda_2(u) at THAT u');
{
  const D2=densTail(2,16,2.5e-5);
  for(const P of PTS){
    const u=Math.log(P.W)/Math.log(P.y);
    console.log('  '+String(P.x).padStart(2)+' | '+String(P.W).padStart(11)+' | '+String(P.y).padStart(9)
      +' |   '+u.toFixed(6)+'  |  '+D2.tail(u).toFixed(6));
  }
  const u41=Math.log(W41)/Math.log(Y41);
  console.log('  41 | '+String(W41).padStart(11)+' | '+String(Y41).padStart(9)+' |   '+u41.toFixed(6)
    +'  |  '+D2.tail(u41).toFixed(6));
  console.log('  variance-note s7 says "u = lnL/lny = 2 exactly"; the column above is the check.');
  console.log('  s6 uses a DIFFERENT coordinate: L = y^u with y = p_n the sieve level, set A.');
}

console.log('\n=== R2: the algebraic identities, and the theta=1 branch at the page ===');
const PRALL0=primesUpTo(Y41);
console.log('  primes to y(41)='+Y41+': '+PRALL0.length+'   ['+el()+']');
{
  // C_2 from its own product, to check kappa without borrowing the sibling's value
  const pr=PRALL0; let C2=1; for(const p of pr){ if(p===2)continue; C2*=1-1/((p-1)*(p-1)); }
  // Mertens tail correction is O(1/(P lnP)); quote to 6 places only
  const kappa=16*C2*EM2G/3;
  console.log('  C_2 (partial product to 1.7e7) = '+C2.toFixed(9)+'   (lit 0.6601618158)');
  console.log('  kappa = 16 C_2 e^{-2gamma}/3 = '+kappa.toFixed(9)+'   note quotes 1.109905');
  console.log('  using the literature C_2 = 0.6601618158: '+(16*0.6601618158*EM2G/3).toFixed(9));
  let bad1=0,bad2=0,bad3=0;
  for(const p of pr){ if(p<7)continue;
    if(Math.abs((1+4/(p*(p-4)))*(1-4/((p-2)*(p-2)))-1)>1e-12) bad1++;
    if((p-1)*(p-4)+2 !== (p-2)*(p-3)) bad2++;
    // exact integer form of the first identity: (p(p-4)+4)(p-2)^2 = p(p-4)(p-2)^2 + ... check as integers
    if((p*(p-4)+4)*(p-2)*(p-2) !== p*(p-4)*((p-2)*(p-2)-4)+0 && false) bad3++;
  }
  console.log('  (1+4/(p(p-4)))(1-4/(p-2)^2) = 1 : failures over '+pr.length+' primes to 1.7e7 = '+bad1);
  console.log('  (p-1)(p-4)+2 = (p-2)(p-3)   : failures (exact integers) = '+bad2);
  console.log('    both are the same one-line identity: p^2-5p+6 = (p-2)(p-3), and');
  console.log('    p(p-4)+4 = (p-2)^2, so (1+4/(p(p-4))) = (p-2)^2/(p(p-4)).');
  // ---- the theta=1 branch as an EXACT identity with Gorodetsky (1.5)/(1.6) ----
  // Read at the page this session (arXiv:2111.00853v3, sha256 069d1a4c..., p.2):
  //   M(H,y) = prod_{2<p<=y}(1-2/p) * sum_{n>=1} g_y(n) {H/2n}(1-{H/2n}),
  //   g_y multiplicative on squarefrees, g_y(p) = p/(p-2) for 2<p<=y, else 0.
  // The notes' decoupled formula at ONE excluded class is
  //   Var = delta*L*E[{L/n}(1-{L/n}) n/L],  pi_p = (p-alpha_p)/(p-1) = 1/(p-1),
  //   delta = P_y. pi_2 = 1 forces 2|n, so write n = 2n' and the two collapse.
  // Algebra: P_y * prod_{2<p<=y}(p-2)/(p-1) * 2 = prod_{2<p<=y}(1-2/p), and
  //   n' * prod_{p|n'} 1/(p-2) = prod_{p|n'} p/(p-2) = g_y(n'). Checked numerically:
  for(const [yy,HH] of [[13,210],[13,2310],[29,30030]]){
    const ps=primesUpTo(yy), odd=ps.filter(p=>p>2);
    let PyL=1; for(const p of ps) PyL*=(1-1/p);
    let base=1; for(const p of odd) base*=(p-2)/(p-1);
    let LHS=0, RHS=0, pref=1; for(const p of odd) pref*=(1-2/p);
    const nf=odd.length;
    for(let mask=0;mask<(1<<nf);mask++){
      let np=1,w=1,g=1;
      for(let i=0;i<nf;i++) if(mask&(1<<i)){ const p=odd[i]; np*=p; w/=(p-2); g*=p/(p-2); }
      const n=2*np, q=HH/n, fr=q-Math.floor(q);
      LHS += PyL*base*w*fr*(1-fr)*(n/HH)*HH;          // = delta*L*E[...]
      const q2=HH/(2*np), f2=q2-Math.floor(q2);
      RHS += pref*g*f2*(1-f2);                        // = Gorodetsky's M(H,y)
    }
    console.log('  theta=1 identity, y='+String(yy).padStart(3)+' H='+String(HH).padStart(6)
      +':  our decoupled Var = '+LHS.toPrecision(12)+'   Gorodetsky M(H,y) = '+RHS.toPrecision(12)
      +'   rel diff = '+(Math.abs(LHS-RHS)/RHS).toExponential(1));
    assert(Math.abs(LHS-RHS)<1e-9*Math.max(1,RHS),'theta=1 decoupled sum equals Gorodetsky M(H,y)');
  }
  console.log('  So at one excluded class the notes\' formula IS (1.5)/(1.6), not merely close to it;');
  console.log('  and the decoupling step is vacuous there because hat f_p(nu!=0) = 1/(p-1)^2 = gamma_p.');
  console.log('  Gorodetsky Lemma 1.5 (p.5, read): V_{q_y}(H) = M(H,y) EXACTLY for a primorial window,');
  console.log('  which is the corpus\'s window; Thm 1.3(1) then gives M ~ H P_y lambda(u).');
  // and the constant-coefficient fact that makes theta=1 exact:
  {
    let bad=0; for(const p of [7,11,13,101,1009]){ const a=p-1, gam=(p-a)/(a*(p-1));
      if(Math.abs(gam-1/((p-1)*(p-1)))>1e-15) bad++; }
    console.log('  one-class check: gamma_p = 1/(p-1)^2 = hat f_p(nu) for every nu != 0; failures = '+bad);
  }
  // ---- the CRT twist, checked at x = 7 (varE-spectral reading 2) ----
  {
    const ps=[2,3,5,7,11,13], al=[1,1,2,5,9,11], M=30030, L=210;
    const fh=[];
    for(let i=0;i<ps.length;i++){ const p=ps[i],a=al[i],f=new Float64Array(p);
      for(let d=0;d<p;d++){ let rho;
        if(p===2) rho=(d%2===0)?1:0; else if(p===3) rho=(d%3===0)?1:0;
        else if(p===5) rho=(d%5===0)?2:((d%5===1||d%5===4)?1:0);
        else rho=(d%p===0)?p-2:((d%p===2||d%p===p-2)?p-3:p-4);
        f[d]=p*rho/(a*a); }
      const h=new Float64Array(p);
      for(let nu=0;nu<p;nu++){ let s2=0; for(let d=0;d<p;d++) s2+=f[d]*Math.cos(-2*Math.PI*nu*d/p); h[nu]=s2/p; }
      fh.push(h); }
    const inv=ps.map(p=>{const c=(M/p)%p; for(let k=1;k<p;k++) if((c*k)%p===1) return k; return 1;});
    let Xt=0,Xu=0,mt=0,mu2=0;
    for(let nu=1;nu<M;nu++){
      let wt=1,wu=1;
      for(let i=0;i<ps.length;i++){ const p=ps[i]; wt*=fh[i][(nu%p)*inv[i]%p]; wu*=fh[i][nu%p]; }
      const t=nu/M,sd=Math.sin(Math.PI*t),K=Math.pow(Math.sin(Math.PI*L*t)/sd,2)/L;
      Xt+=wt*K; Xu+=wu*K; mt+=wt; mu2+=wu;
    }
    console.log('  CRT twist at x=7: with twist X = '+Xt.toFixed(6)+' (true 4.612929), without = '+Xu.toFixed(6)
      +'; total mass '+mt.toFixed(6)+' vs '+mu2.toFixed(6)+' (both = 1/delta - 1 = 29.333333)');
  }
  // ---- delta ln^2 W at the nine levels, against kappa ----
  console.log('  delta*ln^2(W) at the nine diagonal levels, against kappa = '+kappa.toFixed(6)+':');
  { const row=[];
    for(const P of PTS){ let d=1; for(const p of PRALL0){ if(p>P.y)break; d*=((p===2||p===3)?1:(p===5?2:p-2))/p; }
      P.delta=d; row.push((d*Math.log(P.W)*Math.log(P.W)).toFixed(4)); }
    console.log('    '+row.join(', '));
    const g=(kappa-PTS[8].delta*Math.pow(Math.log(PTS[8].W),2))/kappa;
    console.log('    relative gap at x=37: '+g.toExponential(2)+'   (varE-asymptotic quotes 9.2e-5)');
  }
}

console.log('\n=== R3: X and X_dec EXACT, direct per-h enumeration (independent of the sibling sieve) ===');
console.log('   x |   ln y |  delta*X (Var/E) | s7 measured |  delta*X_dec |   X/X_dec  | d*(X-Xdec)*lny');
const R3=[];
for(const P of PTS.slice(0,5)){
  const {x,W:L,y}=P;
  const allp=primesUpTo(y), ps=allp.filter(p=>p>=7);
  let delta=1; for(const p of allp) delta*=((p===2||p===3)?1:(p===5?2:p-2))/p;
  let Cy=1; for(const p of ps) Cy*=1-2/((p-1)*(p-2));
  const SW=new Kah(), SV=new Kah();
  // h = 0 handled by the exact value 1/delta (W(0)=V(0)=1/delta, proven in the note; re-derived:
  // W(0)=15*prod p/(p-2)=1/delta and V(0)=15*C_y*prod (p-1)/(p-3)=15*prod p/(p-2))
  let W0=1,V0=1;
  { let a=15,b=15*Cy; for(const p of ps){ a*=p/(p-2); b*=(p-1)/(p-3);} W0=a; V0=b; }
  assert(Math.abs(W0-1/delta)<1e-6*W0,'W(0)=1/delta at x='+x);
  assert(Math.abs(V0-1/delta)<1e-6*V0,'V(0)=1/delta at x='+x);
  SW.add(W0); SV.add(V0);
  for(let h=6;h<L;h+=6){
    const w=2*(1-h/L), m30=h%30;
    let fW=(m30===0)?15:((m30===6||m30===24)?7.5:0);
    let fV=6*((h%5===0)?2.5:0.625)*Cy;
    if(fW!==0){ for(let i=0;i<ps.length;i++){ const p=ps[i], r=h%p;
        if(r===0) fW*=p/((p-2)*(p-2))*(p-2);
        else if(r===2||r===p-2) fW*=p*(p-3)/((p-2)*(p-2));
        else fW*=p*(p-4)/((p-2)*(p-2)); }
      SW.add(w*fW); }
    for(let i=0;i<ps.length;i++){ const p=ps[i]; if(h%p===0) fV*=(p-1)/(p-3); }
    SV.add(w*fV);
  }
  const X=SW.get()-L, Xd=SV.get()-L;
  R3.push({x,y,delta,X,Xd});
  console.log('  '+String(x).padStart(2)+' | '+Math.log(y).toFixed(3).padStart(6)+' |         '
    +(delta*X).toFixed(6)+' |      '+P.r.toFixed(4)+' |     '+(delta*Xd).toFixed(6)
    +' |  '+(X/Xd).toFixed(6)+'  |    '+(delta*(X-Xd)*Math.log(y)).toFixed(5)+'   ['+el()+']');
}
console.log('  X exact: '+R3.map(o=>o.X.toFixed(6)).join(', '));
console.log('  theta2-step quotes X/X_dec = 0.853427, 0.960382, 1.009802, 1.003895, 1.001448 at x=7..19');
console.log('  varE-asymptotic s1 quotes X = 4.61, 15.08, 29.56, 51.40, 81.29');

console.log('\n=== R4: the fit protocol on the DATA, by point set ===');
function fit(us,ys){ const n=us.length; let sx=0,sy=0,sxx=0,sxy=0;
  for(let i=0;i<n;i++){sx+=us[i];sy+=ys[i];sxx+=us[i]*us[i];sxy+=us[i]*ys[i];}
  const den=n*sxx-sx*sx, b=(n*sxy-sx*sy)/den, a=(sy-b*sx)/n;
  let rss=0; for(let i=0;i<n;i++){const e=ys[i]-(a+b*us[i]); rss+=e*e;}
  // intercept as a linear functional a = sum c_i y_i
  const ub=sx/n, c=us.map(u=>1/n-ub*(u-ub)/(sxx-sx*sx/n));
  return {a,b,rms:Math.sqrt(rss/n),c,l1:c.reduce((s,v)=>s+Math.abs(v),0)};
}
const FORMS={
 '1/lnW        ':W=>1/Math.log(W),
 '1/lnlnW      ':W=>1/Math.log(Math.log(W)),
 '1/sqrt(lnW)  ':W=>1/Math.sqrt(Math.log(W)),
 '1/lnW^(1/3)  ':W=>Math.pow(Math.log(W),-1/3),
 '1/(lnW lnlnW)':W=>1/(Math.log(W)*Math.log(Math.log(W))),
 '1/lnlnW^2    ':W=>1/Math.pow(Math.log(Math.log(W)),2),
 'mertens share':W=>MSHARE[W],
};
// the "inert Mertens share" form of varE-asymptotic s4: (sum_{p<=x}1/p)/(sum_{p<=y}1/p)
const MSHARE={};
for(const P of PTS){ let sx=0,sy=0; for(const p of PRALL0){ if(p>P.y)break; sy+=1/p; if(p<=P.x)sx+=1/p; } MSHARE[P.W]=sx/sy; }
function sel(lo,hi){ return PTS.filter(P=>P.x>=lo&&P.x<=hi); }
for(const [name,S] of [['x=13..31 (six)',sel(13,31)],['x=13..37 (seven)',sel(13,37)],
                       ['x=7..31 (eight)',sel(7,31)],['x=7..37 (all nine)',sel(7,37)]]){
  console.log('  set '+name+':');
  for(const k of ['1/lnW        ','1/lnlnW      ']){
    const f=FORMS[k], F=fit(S.map(P=>f(P.W)),S.map(P=>P.r));
    console.log('    '+k+'  a = '+F.a.toFixed(4)+'   b = '+F.b.toFixed(4)+'   rms = '+F.rms.toExponential(2));
  }
}
console.log('  frozen forecast, fitted on x=13..31, evaluated at x=37 (measured 0.3958):');
{
  const S=sel(13,31);
  for(const k of Object.keys(FORMS)){
    const f=FORMS[k], F=fit(S.map(P=>f(P.W)),S.map(P=>P.r));
    const pred=F.a+F.b*f(7420738134810);
    console.log('    '+k+'  pred = '+pred.toFixed(4)+'   residual = '+(0.3958-pred>=0?'+':'')+(0.3958-pred).toFixed(4)
      +'   intercept = '+F.a.toFixed(4)+'   rms(in) = '+F.rms.toExponential(2));
  }
}

console.log('\n=== R5: the model at high N, and the control - including the forecast test ===');
const PRALL=PRALL0;
function alphaComb(p){ return p===2?1:p===3?1:p===5?2:p-2; }
function alphaFull(p){ return p===2?1:p-2; }
function sampler(y,af){
  const PR=[],H=[]; let base=1;
  for(const p of PRALL){ if(p>y)break; const a=af(p), pi=(p-a)/(p-1);
    if(pi>=1-1e-15) base*=p; else { PR.push(p); H.push(-Math.log(1-pi)); } }
  const C=new Float64Array(H.length); let s=0; for(let i=0;i<H.length;i++){s+=H[i];C[i]=s;}
  const LN=new Float64Array(PR.length); for(let i=0;i<PR.length;i++)LN[i]=Math.log(PR[i]);
  return {PR,LN,C,Hmax:s,base,lnbase:Math.log(base)};
}
// splitmix32, a different generator from the sibling's xorshift
function mkrnd(seed){ let a=seed>>>0; return ()=>{ a=(a+0x9E3779B9)>>>0; let t=a; t=Math.imul(t^(t>>>15),0x85EBCA6B)>>>0;
  t=Math.imul(t^(t>>>13),0xC2B2AE35)>>>0; t=(t^(t>>>16))>>>0; return (t+0.5)/4294967296; }; }
function modelMC(y,L,af,N,seed){
  const S=sampler(y,af), rnd=mkrnd(seed), lnL=Math.log(L), BIG=9e15;
  let acc=0,acc2=0;
  for(let it=0;it<N;it++){
    let m=S.base,lnm=S.lnbase,exact=true,t=0,last=-1;
    for(;;){ t+=-Math.log(rnd()); if(t>S.Hmax)break;
      let lo=0,hi=S.C.length-1; while(lo<hi){const mid=(lo+hi)>>1; if(S.C[mid]<t)lo=mid+1; else hi=mid;}
      if(lo===last)continue; last=lo;
      lnm+=S.LN[lo]; if(exact){ m*=S.PR[lo]; if(m>BIG)exact=false; } }
    let v; if(exact&&m<=L){ const r=L%m; v=(r/m)*(1-r/m)*(m/L); }
    else { v=1-Math.exp(lnL-lnm); if(v<0)v=0; }
    acc+=v; acc2+=v*v;
  }
  const mu=acc/N; return {mu,se:Math.sqrt(Math.max(0,acc2/N-mu*mu)/N)};
}
// sanity: the sampler must reproduce the EXACT model values of R3 at x = 7..19
console.log('  sampler validation against R3 exact delta*X_dec (this is the MC engine\'s own check):');
for(const o of R3){
  const P=PTS.find(p=>p.x===o.x);
  const R=modelMC(o.y,P.W,alphaComb,1000000,4242+o.x);
  console.log('    x='+String(o.x).padStart(2)+'  MC = '+R.mu.toFixed(6)+' +- '+R.se.toFixed(6)
    +'   exact = '+(o.delta*o.Xd).toFixed(6)+'   (MC-exact)/se = '+((R.mu-o.delta*o.Xd)/R.se).toFixed(2));
}
// MODEL COLUMN: EXACT at x = 13, 17, 19 (R3, real-space V-sum); MC elsewhere.
// The spectral note's own column is MC at N = 4e5 throughout, s.e. ~7e-4, which
// varE-theta2-step s6 already showed is up to 0.0017 off at x = 23.
const NBIG=Number(process.env.NBIG||20000000);
const MOD={};
for(const o of R3) if(o.x>=13) MOD[o.x]={mu:o.delta*o.Xd,se:0,how:'exact'};
console.log('  model column: exact at x=13,17,19; Monte Carlo at N = '+NBIG+' elsewhere:');
for(const P of PTS){
  if(P.x<13) continue;
  if(!MOD[P.x]){ const R=modelMC(P.y,P.W,alphaComb,NBIG,90001+P.x); MOD[P.x]={mu:R.mu,se:R.se,how:'MC'}; }
  console.log('    x='+String(P.x).padStart(2)+'   model = '+MOD[P.x].mu.toFixed(6)
    +' +- '+MOD[P.x].se.toFixed(6)+' ('+MOD[P.x].how+')   measured = '+P.r.toFixed(4)
    +'   measured-model = '+(P.r-MOD[P.x].mu>=0?'+':'')+(P.r-MOD[P.x].mu).toFixed(5)+'   ['+el()+']');
}
{
  const R41=modelMC(Y41,W41,alphaComb,NBIG,90041), S41=modelMC(Y41,W41,alphaComb,NBIG,555213);
  const m41=(R41.mu+S41.mu)/2, s41=Math.sqrt(R41.se*R41.se+S41.se*S41.se)/2;
  console.log('    x=41   model = '+m41.toFixed(6)+' +- '+s41.toFixed(6)+' (two seeds: '+R41.mu.toFixed(6)
    +', '+S41.mu.toFixed(6)+')   prereg [0.4013,0.4040]  '
    +((m41>=0.4013&&m41<=0.4040)?'INSIDE':'OUTSIDE')+'   (note quotes 0.40184 +- 0.00075 at N=4e5)   ['+el()+']');
}
console.log('\n  R5a. the control the spectral note RUNS: intercepts on x = 13..37');
{
  const S=sel(13,37);
  console.log('   form            | on MODEL | on DATA  | model bias | data-bias | ||c||_1 | forced bound');
  const corr=[];
  const maxres=Math.max(...S.map(P=>Math.abs(P.r-MOD[P.x].mu)));
  for(const k of Object.keys(FORMS)){
    const f=FORMS[k], us=S.map(P=>f(P.W));
    const FM=fit(us,S.map(P=>MOD[P.x].mu)), FD=fit(us,S.map(P=>P.r));
    const bias=FM.a-CLOSED2; corr.push(FD.a-bias);
    console.log('   '+k+'  |  '+FM.a.toFixed(4)+'  |  '+FD.a.toFixed(4)+'  |  '+(bias>=0?'+':'')+bias.toFixed(4)
      +'   |  '+(FD.a-bias).toFixed(4)+'   |  '+FM.l1.toFixed(2).padStart(5)+'  |   '
      +Math.abs(FD.a-FM.a).toFixed(4)+' <= '+(FM.l1*maxres).toFixed(4));
  }
  console.log('   bias-corrected spread: ['+Math.min(...corr).toFixed(4)+', '+Math.max(...corr).toFixed(4)
    +']  width '+(Math.max(...corr)-Math.min(...corr)).toFixed(4)+'   (note: [0.4488, 0.4551], width 0.0063)');
  console.log('   max |data - model| on the set = '+maxres.toFixed(5)+' (at x=13). The last column is');
  console.log('   |a_data - a_model| against the bound ||c||_1 * that, i.e. how much of the agreement is forced.');
}
console.log('\n  R5b. THE HALF OF s7\'s PROTOCOL THE NOTE\'S CONTROL DOES NOT RUN:');
console.log('       fit on x=13..31, FREEZE, forecast x=37. That is the 10:1 separation s7 leans on.');
{
  const S=sel(13,31), W37=7420738134810;
  console.log('   form            | model pred | model resid | rms(in) || data pred | data resid | rms(in)');
  for(const k of ['1/lnW        ','1/lnlnW      ']){
    const f=FORMS[k], us=S.map(P=>f(P.W));
    const FM=fit(us,S.map(P=>MOD[P.x].mu)), FD=fit(us,S.map(P=>P.r));
    const pm=FM.a+FM.b*f(W37), pd=FD.a+FD.b*f(W37);
    console.log('   '+k+'  |  '+pm.toFixed(5)+'   |  '+(MOD[37].mu-pm>=0?'+':'')+(MOD[37].mu-pm).toFixed(5)
      +'   | '+FM.rms.toExponential(2)+' ||  '+pd.toFixed(5)+'  |  '+(0.3958-pd>=0?'+':'')+(0.3958-pd).toFixed(5)
      +'  | '+FD.rms.toExponential(2));
  }
  console.log('   model target at x=37 = '+MOD[37].mu.toFixed(6)+' +- '+MOD[37].se.toFixed(6)
    +'; the model limit is '+CLOSED2.toFixed(6)+' by construction.');
}
console.log('\n=== R6: how much of the model/data intercept agreement is forced ===');
console.log('  a = sum_i c_i y_i with sum c_i = 1. If |y_data - y_model| <= e pointwise then');
console.log('  |a_data - a_model| <= ||c||_1 * e. The R5a table prints both sides.');
console.log('\nDONE ['+el()+'].');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-varE.js
//   invocation:  node research/history/staging/redteam-0828-varE.js
//   code-sha256: eef6dc746b0c1939467952b75c89673c27636c29a31ef389a835997bb58fe890
//   out-sha256:  c48c62b9d49074ee1b846bfd7e785991b6fe9184b430760133d000b5ed489a27
//   body-lines:  131
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     72.9 s
// ============================================================================
// === R0: GD(theta), three independent routes ===
//   (a) closed form  1 - e^{-2g}(9/2 - 4 ln 2)
//       e^{-2gamma}      = 0.31523675168719340
//       9/2 - 4 ln 2     = 1.7274112777602189
//       lambda_2(2)      = 0.45545647997104444
//       note quotes 0.45545648 ->  diff = -2.90e-11
//       1 - e^{-2g}(1/2 + 4 - 4ln2) = 0.45545647997104444
//   (b) Simpson h=0.0001  theta=2: int f = 1.000000000  mean = 2.0000000   lambda_2(2) = 0.455456480
//                       theta=1: int f = 1.000000000  mean = 1.0000000   lambda_1(2) = 0.093969665
//   (b) Simpson h=0.000025  theta=2: int f = 1.000000000  mean = 2.0000000   lambda_2(2) = 0.455456480
//                       theta=1: int f = 1.000000000  mean = 1.0000000   lambda_1(2) = 0.093969665
//       lambda_2(u), u=0.6..3: 0.943257  0.842382  0.657116  0.455456  0.282040  0.157654   (note: 0.943257 0.842382 0.657116 0.455456 0.282040 0.157654)
//       lambda_1(u), u=0.6..3: 0.663124  0.438541  0.218559  0.093970  0.035636  0.012095   (note: 0.663124 0.438541 0.218559 0.093970 0.035636 0.012095)
//   (c) Monte Carlo of the limit process, N=4000000, eps=1e-9 (no density used):
//       theta=2 tail: 0.94338 0.84280 0.65733 0.45580 0.28219 0.15782   se(u=2) = 0.00025
//               closed/ODE at u=2: 0.455456   MC-closed = 0.00034
//       theta=1 tail: 0.66305 0.43846 0.21876 0.09420 0.03565 0.01211   se(u=2) = 0.00015
//               Gorodetsky (1.12) lambda(u)=1-e^{-g}u on [0,1]: u=0.6 -> 0.663124   u=1 -> 0.438541
//
// === R1: is the diagonal u = 2 in the same coordinate? ===
//    x |        L=x# |         y | u = lnL/lny | lambda_2(u) at THAT u
//    7 |         210 |        13 |   2.084683  |  0.423160
//   11 |        2310 |        47 |   2.011612  |  0.450976
//   13 |       30030 |       173 |   2.000654  |  0.455205
//   17 |      510510 |       709 |   2.002354  |  0.454548
//   19 |     9699690 |      3109 |   2.000434  |  0.455292
//   23 |   223092870 |     14929 |   2.000102  |  0.455418
//   29 |  6469693230 |     80429 |   2.000012  |  0.455456
//   31 | 200560490130 |    447829 |   2.000004  |  0.455456
//   37 | 7420738134810 |   2724079 |   2.000001  |  0.455456
//   41 | 304250263527210 |  17442769 |   2.000000  |  0.455456
//   variance-note s7 says "u = lnL/lny = 2 exactly"; the column above is the check.
//   s6 uses a DIFFERENT coordinate: L = y^u with y = p_n the sieve level, set A.
//
// === R2: the algebraic identities, and the theta=1 branch at the page ===
//   primes to y(41)=17442769: 1117922   [8.7s]
//   C_2 (partial product to 1.7e7) = 0.660161818   (lit 0.6601618158)
//   kappa = 16 C_2 e^{-2gamma}/3 = 1.109905424   note quotes 1.109905
//   using the literature C_2 = 0.6601618158: 1.109905421
//   (1+4/(p(p-4)))(1-4/(p-2)^2) = 1 : failures over 1117922 primes to 1.7e7 = 0
//   (p-1)(p-4)+2 = (p-2)(p-3)   : failures (exact integers) = 0
//     both are the same one-line identity: p^2-5p+6 = (p-2)(p-3), and
//     p(p-4)+4 = (p-2)^2, so (1+4/(p(p-4))) = (p-2)^2/(p(p-4)).
//   theta=1 identity, y= 13 H=   210:  our decoupled Var = 1.27267231603   Gorodetsky M(H,y) = 1.27267231603   rel diff = 1.7e-16
//   theta=1 identity, y= 13 H=  2310:  our decoupled Var = 1.10410615026   Gorodetsky M(H,y) = 1.10410615026   rel diff = 0.0e+0
//   theta=1 identity, y= 29 H= 30030:  our decoupled Var = 13.6206785177   Gorodetsky M(H,y) = 13.6206785177   rel diff = 1.3e-16
//   So at one excluded class the notes' formula IS (1.5)/(1.6), not merely close to it;
//   and the decoupling step is vacuous there because hat f_p(nu!=0) = 1/(p-1)^2 = gamma_p.
//   Gorodetsky Lemma 1.5 (p.5, read): V_{q_y}(H) = M(H,y) EXACTLY for a primorial window,
//   which is the corpus's window; Thm 1.3(1) then gives M ~ H P_y lambda(u).
//   one-class check: gamma_p = 1/(p-1)^2 = hat f_p(nu) for every nu != 0; failures = 0
//   CRT twist at x=7: with twist X = 4.612929 (true 4.612929), without = 4.441347; total mass 29.333333 vs 29.333333 (both = 1/delta - 1 = 29.333333)
//   delta*ln^2(W) at the nine diagonal levels, against kappa = 1.109905:
//     0.9426, 1.0198, 1.0770, 1.0982, 1.1058, 1.1082, 1.1093, 1.1096, 1.1098
//     relative gap at x=37: 9.19e-5   (varE-asymptotic quotes 9.2e-5)
//
// === R3: X and X_dec EXACT, direct per-h enumeration (independent of the sibling sieve) ===
//    x |   ln y |  delta*X (Var/E) | s7 measured |  delta*X_dec |   X/X_dec  | d*(X-Xdec)*lny
//    7 |  2.565 |         0.152075 |      0.1521 |     0.178193 |  0.853427  |    -0.06699   [8.7s]
//   11 |  3.850 |         0.256267 |      0.2563 |     0.266839 |  0.960382  |    -0.04070   [8.7s]
//   13 |  5.153 |         0.299499 |      0.2995 |     0.296592 |  1.009802  |    0.01498   [8.7s]
//   17 |  6.564 |         0.326772 |      0.3268 |     0.325504 |  1.003895  |    0.00832   [8.8s]
//   19 |  8.042 |         0.347302 |      0.3473 |     0.346800 |  1.001448  |    0.00404   [10.8s]
//   X exact: 4.612929, 15.073187, 29.557928, 51.400255, 81.289135
//   theta2-step quotes X/X_dec = 0.853427, 0.960382, 1.009802, 1.003895, 1.001448 at x=7..19
//   varE-asymptotic s1 quotes X = 4.61, 15.08, 29.56, 51.40, 81.29
//
// === R4: the fit protocol on the DATA, by point set ===
//   set x=13..31 (six):
//     1/lnW          a = 0.4435   b = -1.5085   rms = 1.84e-3
//     1/lnlnW        a = 0.6106   b = -0.7284   rms = 8.10e-4
//   set x=13..37 (seven):
//     1/lnW          a = 0.4454   b = -1.5336   rms = 1.97e-3
//     1/lnlnW        a = 0.6108   b = -0.7289   rms = 7.51e-4
//   set x=7..31 (eight):
//     1/lnW          a = 0.4462   b = -1.5424   rms = 4.22e-3
//     1/lnlnW        a = 0.6347   b = -0.7951   rms = 5.25e-3
//   set x=7..37 (all nine):
//     1/lnW          a = 0.4467   b = -1.5462   rms = 4.01e-3
//     1/lnlnW        a = 0.6321   b = -0.7898   rms = 5.10e-3
//   frozen forecast, fitted on x=13..31, evaluated at x=37 (measured 0.3958):
//     1/lnW          pred = 0.3926   residual = +0.0032   intercept = 0.4435   rms(in) = 1.84e-3
//     1/lnlnW        pred = 0.3957   residual = +0.0001   intercept = 0.6106   rms(in) = 8.10e-4
//     1/sqrt(lnW)    pred = 0.3977   residual = -0.0019   intercept = 0.5387   rms(in) = 3.96e-4
//     1/lnW^(1/3)    pred = 0.3995   residual = -0.0037   intercept = 0.6341   rms(in) = 9.65e-4
//     1/(lnW lnlnW)  pred = 0.3885   residual = +0.0073   intercept = 0.4178   rms(in) = 3.64e-3
//     1/lnlnW^2      pred = 0.3921   residual = +0.0037   intercept = 0.4781   rms(in) = 2.22e-3
//     mertens share  pred = 0.3968   residual = -0.0010   intercept = 0.7219   rms(in) = 6.67e-4
//
// === R5: the model at high N, and the control - including the forecast test ===
//   sampler validation against R3 exact delta*X_dec (this is the MC engine's own check):
//     x= 7  MC = 0.178555 +- 0.000307   exact = 0.178193   (MC-exact)/se = 1.18
//     x=11  MC = 0.266200 +- 0.000380   exact = 0.266839   (MC-exact)/se = -1.68
//     x=13  MC = 0.296405 +- 0.000409   exact = 0.296592   (MC-exact)/se = -0.46
//     x=17  MC = 0.325771 +- 0.000431   exact = 0.325504   (MC-exact)/se = 0.62
//     x=19  MC = 0.346883 +- 0.000445   exact = 0.346800   (MC-exact)/se = 0.19
//   model column: exact at x=13,17,19; Monte Carlo at N = 20000000 elsewhere:
//     x=13   model = 0.296592 +- 0.000000 (exact)   measured = 0.2995   measured-model = +0.00291   [11.9s]
//     x=17   model = 0.325504 +- 0.000000 (exact)   measured = 0.3268   measured-model = +0.00130   [11.9s]
//     x=19   model = 0.346800 +- 0.000000 (exact)   measured = 0.3473   measured-model = +0.00050   [11.9s]
//     x=23   model = 0.363672 +- 0.000102 (MC)   measured = 0.3643   measured-model = +0.00063   [18.9s]
//     x=29   model = 0.377036 +- 0.000103 (MC)   measured = 0.3774   measured-model = +0.00036   [27.0s]
//     x=31   model = 0.387350 +- 0.000105 (MC)   measured = 0.3876   measured-model = +0.00025   [36.2s]
//     x=37   model = 0.395567 +- 0.000106 (MC)   measured = 0.3958   measured-model = +0.00023   [46.9s]
//     x=41   model = 0.402364 +- 0.000075 (two seeds: 0.402368, 0.402361)   prereg [0.4013,0.4040]  INSIDE   (note quotes 0.40184 +- 0.00075 at N=4e5)   [72.9s]
//
//   R5a. the control the spectral note RUNS: intercepts on x = 13..37
//    form            | on MODEL | on DATA  | model bias | data-bias | ||c||_1 | forced bound
//    1/lnW          |  0.4468  |  0.4454  |  -0.0086   |  0.4540   |   2.60  |   0.0014 <= 0.0076
//    1/lnlnW        |  0.6164  |  0.6108  |  +0.1609   |  0.4499   |   6.91  |   0.0056 <= 0.0201
//    1/sqrt(lnW)    |  0.5402  |  0.5366  |  +0.0848   |  0.4518   |   4.96  |   0.0036 <= 0.0144
//    1/lnW^(1/3)    |  0.6337  |  0.6279  |  +0.1783   |  0.4496   |   7.43  |   0.0059 <= 0.0216
//    1/(lnW lnlnW)  |  0.4219  |  0.4211  |  -0.0336   |  0.4546   |   2.03  |   0.0008 <= 0.0059
//    1/lnlnW^2      |  0.4833  |  0.4809  |  +0.0278   |  0.4531   |   3.48  |   0.0023 <= 0.0101
//    mertens share  |  0.7281  |  0.7198  |  +0.2727   |  0.4471   |   9.83  |   0.0083 <= 0.0286
//    bias-corrected spread: [0.4471, 0.4546]  width 0.0075   (note: [0.4488, 0.4551], width 0.0063)
//    max |data - model| on the set = 0.00291 (at x=13). The last column is
//    |a_data - a_model| against the bound ||c||_1 * that, i.e. how much of the agreement is forced.
//
//   R5b. THE HALF OF s7's PROTOCOL THE NOTE'S CONTROL DOES NOT RUN:
//        fit on x=13..31, FREEZE, forecast x=37. That is the 10:1 separation s7 leans on.
//    form            | model pred | model resid | rms(in) || data pred | data resid | rms(in)
//    1/lnW          |  0.39281   |  +0.00276   | 1.53e-3 ||  0.39259  |  +0.00321  | 1.84e-3
//    1/lnlnW        |  0.39596   |  -0.00039   | 4.77e-4 ||  0.39567  |  +0.00013  | 8.10e-4
//    model target at x=37 = 0.395567 +- 0.000106; the model limit is 0.455456 by construction.
//
// === R6: how much of the model/data intercept agreement is forced ===
//   a = sum_i c_i y_i with sum c_i = 1. If |y_data - y_model| <= e pointwise then
//   |a_data - a_model| <= ||c||_1 * e. The R5a table prints both sides.
//
// DONE [72.9s].
// ============================================================================
// READINGS
// ============================================================================
// 1. THE CONSTANT SURVIVES THREE INDEPENDENT ROUTES. The closed form, re-derived
//    here from the Laplace transform of GD(theta) rather than copied, is
//    1 - e^{-2gamma}(9/2 - 4 ln 2) = 0.45545647997104444, which is the notes'
//    0.45545648 to 2.9e-11. An independent Simpson solve of the delay equation
//    at h = 1e-4 and h = 2.5e-5 returns 0.455456480 both times, with int f = 1
//    and mean = 2. A Monte Carlo of the LIMIT process (a Poisson process of
//    intensity 2 dw/w on (0,1]), which uses neither the density nor the
//    normalising constant e^{-2 gamma}, returns 0.45580 +- 0.00025 at N = 4e6.
//    Both tail rows, theta = 1 and theta = 2, reproduce the notes digit for digit.
// 2. THE theta = 1 BRANCH IS AN EXACT IDENTITY WITH GORODETSKY, NOT A NUMERICAL
//    MATCH. delta*L*E[{L/n}(1-{L/n}) n/L] with pi_p = 1/(p-1) equals
//    prod_{2<p<=y}(1-2/p) sum_n g_y(n){H/2n}(1-{H/2n}), his (1.5)/(1.6) read at
//    the page, to 1.7e-16 at (y,H) = (13,210), (13,2310), (29,30030). pi_2 = 1
//    supplies his factor 2 and prod_{p|n'} p/(p-2) is his g_y. His Lemma 1.5
//    gives V_{q_y}(H) = M(H,y) exactly for a primorial window, which is the
//    corpus's window, and Thm 1.3(1) then gives M ~ H P_y lambda(u).
// 3. u = 2 IS NOT EXACT AT FINITE LEVEL. u = ln L/ln y = 2.084683 at x = 7 and
//    2.011612 at x = 11, reaching 2.000x only from x = 13. lambda_2 at the
//    level's own u is 0.423160 at x = 7, not 0.455456.
// 4. THE ALGEBRA HOLDS. kappa = 16 C_2 e^{-2 gamma}/3 = 1.109905424 with C_2
//    from its own product to 1.7e7; delta ln^2 W reproduces varE-asymptotic's
//    nine-level column 0.9426 .. 1.1098 and its 9.19e-5 gap at x = 37;
//    (1 + 4/(p(p-4)))(1 - 4/(p-2)^2) = 1 and (p-1)(p-4) + 2 = (p-2)(p-3) fail at
//    0 of 1117922 primes, and are the same identity p(p-4) + 4 = (p-2)^2.
//    The CRT twist at x = 7 reproduces 4.612929 with and 4.441347 without.
// 5. X AND X_dec REPRODUCE BY AN INDEPENDENT ROUTE. Direct per-h enumeration,
//    no sieve, gives X = 4.612929, 15.073187, 29.557928, 51.400255, 81.289135
//    and X/X_dec = 0.853427, 0.960382, 1.009802, 1.003895, 1.001448 at
//    x = 7..19, matching varE-theta2-step to every printed digit; and
//    delta*X = 0.152075 .. 0.347302 matches variance-note s7 at four decimals.
// 6. THE "SIX POINTS, NOT EIGHT" DEFECT IS CONFIRMED EXACTLY. x = 13..31 gives
//    0.4435 - 1.5085/lnW at rms 1.84e-3 and 0.6106 - 0.7284/lnlnW at rms
//    8.10e-4, which are s7's published coefficients. On the eight points s7
//    names, x = 7..31, the lnlnW form is the worse of the two: 5.25e-3 against
//    4.22e-3.
// 7. THE 0.611 REFUTATION IS CONFIRMED, AND IS STRONGER THAN THE NOTE STATES.
//    With the model column exact at x = 13, 17, 19 and MC at N = 2e7 elsewhere,
//    the control returns intercept 0.6164 from a + b/lnlnW and 0.4468 from
//    a + b/lnW against a construction limit of 0.455456. The note's own control
//    gave 0.6151 and 0.4463 at N = 4e5. Further, the half of s7's protocol the
//    note's control does not run, the frozen out-of-sample forecast, also fails
//    on the control: fitted on x = 13..31 and frozen, a + b/lnlnW forecasts the
//    MODEL at x = 37 with residual -0.00039 against a + b/lnW's +0.00276, the
//    same winner and the same direction as the data's +0.00013 against +0.00321.
//    The model's x = 37 value is known to +-0.000106, so -0.00039 is resolvable.
// 8. THE BIAS-CORRECTED AGREEMENT IS LARGELY FORCED BY POINTWISE TRACKING.
//    The intercept is a linear functional a = sum c_i y_i with sum c_i = 1, and
//    ||c||_1 runs 2.03 to 9.83 over the seven forms. With max|data - model| =
//    0.00291 on x = 13..37, |a_data - a_model| is bounded a priori by 0.0059 to
//    0.0286; the observed gaps are 0.0008 to 0.0083, inside those bounds. So the
//    last column's narrowness restates that the model tracks the data pointwise.
// 9. x = 41. The model's own value is 0.402364 +- 0.000075 on two seeds at
//    N = 2e7, against the note's 0.40184 +- 0.00075 at N = 4e5. It is inside the
//    registered band [0.4013, 0.4040] and near its middle, not at its bottom edge.
//
// FIGURE PROVENANCE. Readings quote the block above verbatim except:
//   2.9e-11   = the block's own "diff" line for the closed form.
//   "factor 7"  in reading 7 = 0.00276/0.00039 from the R5b table.
//   "factor 25" in reading 7 = 0.00321/0.00013 from the R5b table.
//   2.5e-5    = the block's "h=0.000025", written in exponent form.
//   (13,210), (13,2310), (29,30030) = the block's "y= 13 H=   210" rows.
//   0.611     = paper/variance-note.md s7's quoted intercept, not a figure of
//     this run; likewise 0.6151, 0.4463, 0.40184, 0.00075, 0.4488, 0.4551,
//     4e5 are varE-spectral.md's own printed figures, quoted for comparison.
