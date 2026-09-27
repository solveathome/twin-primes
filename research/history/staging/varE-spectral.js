// ============================================================================
// varE-spectral.js — scratchpad-grade support for varE-spectral.md
// (TODO item 9: push the spectral form of Var/E on the comb diagonal to an
//  asymptotic, or show it has none of the fitted shapes)
// ============================================================================
// WHAT THIS IS. A companion to research/history/staging/varE-asymptotic.js,
// which owns the nine exact diagonal points. Those points are READ from
// paper/variance-note.md section 7 and are NEVER recomputed here.
// What this file computes, all cheap:
//   PART 0  the spectral form checked at x = 7: sum_{nu != 0 mod M} What(nu)
//           K_L(nu/M) against the sibling's X(210) = 4.612929.
//   PART 1  the local Fourier means gamma_p and the size-biased inclusion
//           probabilities pi_p = (p - alpha_p)/(p - 1), and the identity
//           E_Theta[m] = 1/delta.
//   PART 2  the DECOUPLED model evaluated EXACTLY (full divisor sum) at
//           x = 7 and x = 11, against the true X. This measures the one
//           unproven step.
//   PART 3  the generalized Dickman law GD(theta): delay equation, the tail
//           lambda_theta(u). theta = 1 reproduces Gorodetsky's published
//           lambda(u) = e^{-gamma} int_u^inf rho; theta = 2 is our case.
//   PART 4  Monte-Carlo evaluation of the model at the nine diagonal levels
//           and at x = 41 (the registered forecast point).
//   PART 5  the model against variance-note section 6's TWO independent
//           tables: the u-sweep at y = 401 and the u = 2 level sweep.
//   PART 6  residuals, and the x = 41 forecast against var41-prereg.md.
//   node research/history/staging/varE-spectral.js    (~40 s)
// ============================================================================
'use strict';
const T0 = Date.now(); const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s';
function assert(c,m){ if(!c) throw new Error('ASSERT FAIL: '+m); }
const GAMMA = 0.5772156649015329;

// ---- the nine exact diagonal points, READ from variance-note.md section 7 ----
const PTS = [
 {x:7,  W:210,               y:13,      r:0.1521, X:4.6137},
 {x:11, W:2310,              y:47,      r:0.2563, X:15.0751},
 {x:13, W:30030,             y:173,     r:0.2995, X:29.5580},
 {x:17, W:510510,            y:709,     r:0.3268, X:51.4047},
 {x:19, W:9699690,           y:3109,    r:0.3473, X:81.2888},
 {x:23, W:223092870,         y:14929,   r:0.3643, X:121.4787},
 {x:29, W:6469693230,        y:80429,   r:0.3774, X:173.6155},
 {x:31, W:200560490130,      y:447829,  r:0.3876, X:236.5698},
 {x:37, W:7420738134810,     y:2724079, r:0.3958, X:313.2192},
];
const W41 = 304250263527210, Y41 = 17442769;   // var41-prereg.md section 1

console.log('=== PART 0: the spectral form, checked at x = 7 ===');
{
  // comb A5 at y = 13: alpha_2=1, alpha_3=1, alpha_5=2 (teeth 11,17 mod 30 are
  // {1,2} mod 5), alpha_p = p-2 for p >= 7.  W(d) = prod_p p*rho_p(d)/alpha_p^2.
  const ps = [2,3,5,7,11,13], al = [1,1,2,5,9,11], M = 30030, L = 210;
  // local f_p on residues, and its DFT
  const fh = [];                              // fh[i][nu] = hat f_p(nu)
  for (let i=0;i<ps.length;i++){
    const p = ps[i], a = al[i];
    const f = new Float64Array(p);
    for (let d=0; d<p; d++){
      let rho;
      if (p === 2) rho = (d%2===0)?1:0;
      else if (p === 3) rho = (d%3===0)?1:0;
      else if (p === 5) rho = (d%5===0)?2:((d%5===1||d%5===4)?1:0);
      else rho = (d%p===0)?p-2:((d%p===2||d%p===p-2)?p-3:p-4);
      f[d] = p*rho/(a*a);
    }
    const h = new Float64Array(p);
    for (let nu=0; nu<p; nu++){ let s=0; for (let d=0; d<p; d++) s += f[d]*Math.cos(-2*Math.PI*nu*d/p); h[nu]=s/p; }
    fh.push(h);
    assert(Math.abs(h[0]-1) < 1e-12, 'hat f_p(0) = 1 at p='+p);
  }
  // X = sum_{nu != 0 mod M} What(nu) K_L(nu/M),  K_L(t) = |sin(pi L t)/sin(pi t)|^2 / L
  // CRT twist: the frequency nu mod M corresponds to nu_p = nu*(M/p)^{-1} mod p
  const inv = ps.map(p => { const c = (M/p) % p; let r = 1; for (let k=1;k<p;k++) if ((c*k)%p===1){ r=k; break; } return r; });
  let X = 0, massAll = 0;
  for (let nu=1; nu<M; nu++){
    let w = 1; for (let i=0;i<ps.length;i++) w *= fh[i][(nu % ps[i]) * inv[i] % ps[i]];
    const t = nu/M, sd = Math.sin(Math.PI*t);
    const K = Math.pow(Math.sin(Math.PI*L*t)/sd, 2)/L;
    X += w*K; massAll += w;
  }
  const delta = 2/30 * (5/7)*(9/11)*(11/13);
  console.log('  sum_{nu!=0} What(nu) K_L(nu/M) = '+X.toFixed(6)
    +'   (sibling varE-asymptotic PART 0: X = 4.612929)');
  console.log('  |diff| = '+Math.abs(X-4.612929).toExponential(2)
    +'      sum_{nu!=0} What(nu) = '+massAll.toFixed(6)+'  vs 1/delta - 1 = '+(1/delta-1).toFixed(6));
  assert(Math.abs(X-4.612929) < 1e-5, 'spectral form reproduces X at x=7');
}

console.log('\n=== PART 1: the local means gamma_p, and pi_p = (p-alpha_p)/(p-1) ===');
// gamma_p := mean of hat f_p over the p-1 nonzero frequencies
//          = (p/alpha_p - 1)/(p-1) = (p-alpha_p)/(alpha_p (p-1)).
// Theta: include p independently with prob gamma_p.  E_Theta[m] = prod p/alpha_p = 1/delta.
// size-biased by m: include p with prob pi_p = gamma_p*alpha_p = (p-alpha_p)/(p-1).
function alphaComb(p){ return p===2?1 : p===3?1 : p===5?2 : p-2; }   // section 7 comb
function alphaFull(p){ return p===2?1 : p-2; }                        // section 6 set A
for (const p of [2,3,5,7,11,13,101]){
  const a = alphaComb(p), g = (p-a)/(a*(p-1));
  console.log('  p='+String(p).padStart(4)+'  alpha='+String(a).padStart(3)
    +'  gamma_p='+g.toPrecision(8).padStart(12)+'  pi_p=(p-alpha)/(p-1)='+((p-a)/(p-1)).toFixed(8));
}
{ // E_Theta[m] = 1/delta, checked at x = 7 by the closed product
  const ps=[2,3,5,7,11,13]; let E=1, d=1;
  for (const p of ps){ const a=alphaComb(p); E *= p/a; d *= a/p; }
  console.log('  x=7: E_Theta[m] = prod p/alpha_p = '+E.toFixed(6)+'   1/delta = '+(1/d).toFixed(6));
  assert(Math.abs(E-1/d)<1e-9, 'E_Theta[m] = 1/delta');
}

console.log('\n=== PART 2: the decoupled model, EXACT divisor sum, vs the true X ===');
console.log('  model:  X_dec = E_Theta[ r_m (m - r_m) ] / L,  r_m = L mod m,  m | M');
console.log('  equivalently  delta*X_dec = E_sb[ r_m(m-r_m)/(m L) ],  pi_p = (p-alpha_p)/(p-1)');
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
for (const [x,y,L,trueX,trueR] of [[7,13,210,4.612929,0.1521],[11,47,2310,15.0751,0.2563]]){
  const ps = primesUpTo(y);
  // enumerate all divisors m | M via the primes with gamma_p < 1 (2 and 3 have gamma = 1)
  const forced = [], free = [];
  let base = 1, wbase = 1, delta = 1;
  for (const p of ps){ const a = alphaComb(p); delta *= a/p; const g = (p-a)/(a*(p-1));
    if (g >= 1-1e-15){ forced.push(p); base *= p; } else { free.push([p,g]); wbase *= (1-g); } }
  let S = 0;
  const nf = free.length;
  for (let mask=0; mask < (1<<nf); mask++){
    let m = base, w = wbase;
    for (let i=0;i<nf;i++) if (mask & (1<<i)){ m *= free[i][0]; w *= free[i][1]/(1-free[i][1]); }
    if (m <= L){ const r = L % m; S += w * r*(m-r)/L; }
    else S += w * (m - L);
  }
  console.log('  x='+x+':  X_dec = '+S.toFixed(6)+'   true X = '+trueX
    +'   ratio true/model = '+(trueX/S).toFixed(4));
  console.log('        delta*X_dec = '+(delta*S).toFixed(6)+'   measured Var/E = '+trueR
    +'   ('+(2**nf)+' divisors enumerated)');
}

console.log('\n=== PART 3: the generalized Dickman law GD(theta) and its tail ===');
// density f_theta: f = c t^{theta-1} on (0,1], c = e^{-theta gamma}/Gamma(theta);
// t f'(t) = (theta-1) f(t) - theta f(t-1) for t > 1.
// integrated form:  (f/t^{theta-1})' = -theta f(t-1)/t^theta.
function dickman(theta, TMAX, h){
  const N = Math.round(TMAX/h)+1, f = new Float64Array(N);
  const gam = theta===1?1:(theta===2?1:NaN);          // Gamma(1)=Gamma(2)=1
  const c = Math.exp(-theta*GAMMA)/gam;
  const K = Math.round(1/h);
  for (let i=0;i<=K && i<N;i++) f[i] = c*Math.pow(i*h, theta-1);
  // march t>1: f(t) = t^{theta-1} (c - theta * I(t)), I(t) = int_1^t f(s-1)/s^theta ds
  let I = 0;
  const g = s => f[Math.round((s-1)/h)]/Math.pow(s, theta);
  for (let i=K+1;i<N;i++){
    const s0 = (i-1)*h, s1 = i*h;
    I += h/2*(g(s0)+g(s1));
    f[i] = Math.pow(s1, theta-1)*(c - theta*I);
    if (f[i] < 0) f[i] = 0;
  }
  return {f,h,N,c};
}
function tailTable(D, us){
  const {f,h,N} = D; const cum = new Float64Array(N);
  for (let i=1;i<N;i++) cum[i] = cum[i-1] + h/2*(f[i-1]+f[i]);
  const tot = cum[N-1];
  let mean = 0; for (let i=1;i<N;i++) mean += h/2*((i-1)*h*f[i-1] + i*h*f[i]);
  const out = us.map(u => 1 - cum[Math.round(u/h)]);
  return {tot, mean, out, cum, h};
}
const US = [0.6,1,1.5,2,2.5,3];
const D1 = dickman(1, 14, 1e-4), D2 = dickman(2, 14, 1e-4);
const T1 = tailTable(D1, US), T2 = tailTable(D2, US);
console.log('  theta=1 (one excluded class, Gorodetsky arXiv:2111.00853 Thm 1.3):');
console.log('    int f = '+T1.tot.toFixed(8)+' (must be 1)   mean = '+T1.mean.toFixed(6)+' (must be 1)');
console.log('    lambda_1(u) for u='+US.join(', ')+':');
console.log('      '+T1.out.map(v=>v.toFixed(6)).join('  '));
console.log('  theta=2 (two excluded classes, our comb):');
console.log('    int f = '+T2.tot.toFixed(8)+' (must be 1)   mean = '+T2.mean.toFixed(6)+' (must be 2)');
console.log('    lambda_2(u) for u='+US.join(', ')+':');
console.log('      '+T2.out.map(v=>v.toFixed(6)).join('  '));
// closed form on [0,2]: f_2 = c t on (0,1], f_2 = c t (3 - 2 ln t) - 2c on (1,2]
{
  const c = Math.exp(-2*GAMMA);
  const closed = 1 - c*(0.5 + (4 - 4*Math.log(2)));
  console.log('    lambda_2(2) closed form 1 - e^{-2g}(1/2 + 4 - 4 ln 2) = '+closed.toFixed(8)
    +'   numeric = '+T2.out[3].toFixed(8));
  assert(Math.abs(closed-T2.out[3]) < 1e-5, 'lambda_2(2) closed vs numeric');
}

console.log('\n=== PART 4: the model, Monte Carlo, at the nine diagonal levels + x = 41 ===');
const PRALL = primesUpTo(Y41);
console.log('  sieved to y(41) = '+Y41+',  pi(y) = '+PRALL.length+'   ['+el()+']');
// exact Bernoulli sampling of a random divisor m under pi_p, by exponential skipping
function makeSampler(y, alphaFn){
  const forced = [], H = [], PR = [];
  for (const p of PRALL){ if (p > y) break;
    const a = alphaFn(p), pi = (p-a)/(p-1);
    if (pi >= 1-1e-15){ forced.push(p); } else { PR.push(p); H.push(-Math.log(1-pi)); } }
  const C = new Float64Array(H.length);
  let s = 0; for (let i=0;i<H.length;i++){ s += H[i]; C[i] = s; }
  let base = 1; for (const p of forced) base *= p;
  return {PR, C, Hmax:s, base, lnbase:Math.log(base)};
}
function modelMC(y, L, alphaFn, N, seed){
  const S = makeSampler(y, alphaFn);
  let st = seed >>> 0;
  const rnd = () => { st ^= st<<13; st>>>=0; st ^= st>>>17; st ^= st<<5; st>>>=0; return (st+1)/4294967297; };
  const lnL = Math.log(L), LBIG = 9e15;
  let acc = 0, acc2 = 0;
  for (let it=0; it<N; it++){
    let m = S.base, lnm = S.lnbase, exact = true, t = 0, last = -1;
    for(;;){
      t += -Math.log(rnd());
      if (t > S.Hmax) break;
      // binary search: smallest j with C[j] >= t
      let lo = 0, hi = S.C.length-1;
      while (lo < hi){ const mid = (lo+hi)>>1; if (S.C[mid] < t) lo = mid+1; else hi = mid; }
      if (lo === last) continue;      // two arrivals in one cell = one Bernoulli success
      last = lo;
      const p = S.PR[lo];
      lnm += Math.log(p);
      if (exact){ m *= p; if (m > LBIG) exact = false; }
    }
    let v;
    if (exact && m <= L){ const r = L % m; v = (r/m)*(1-r/m)*(m/L); }
    else { v = 1 - Math.exp(lnL - lnm); if (v < 0) v = 0; }
    acc += v; acc2 += v*v;
  }
  const mu = acc/N;
  return {mu, se: Math.sqrt(Math.max(0,acc2/N - mu*mu)/N)};
}
console.log('   x |    lnW   | model Var/E (MC, N=4e5) |  measured  | measured - model');
const MOD = [];
for (const P of PTS){
  const R = modelMC(P.y, P.W, alphaComb, 400000, 12345 + P.x);
  MOD.push(R.mu);
  console.log('  '+String(P.x).padStart(2)+' | '+Math.log(P.W).toFixed(4).padStart(8)
    +' |      '+R.mu.toFixed(5)+' +- '+R.se.toFixed(5)+'    |   '+P.r.toFixed(4)
    +'   |   '+(P.r-R.mu>=0?'+':'')+(P.r-R.mu).toFixed(4));
}
const M41 = modelMC(Y41, W41, alphaComb, 400000, 999331);
console.log('  41 | '+Math.log(W41).toFixed(4).padStart(8)+' |      '+M41.mu.toFixed(5)+' +- '+M41.se.toFixed(5)
  +'    |   (not measured)  ['+el()+']');
console.log('  limit predicted by the model: lambda_2(2) = '+T2.out[3].toFixed(6));

console.log('\n=== PART 4b: does the model converge to lambda_2(2)? (u = 2, synthetic y) ===');
// the leading piece alone, E[(1 - L/m)^+], with L = y^2 exactly (no arithmetic term):
function modelLead(y, N, seed, alphaFn){
  const S = makeSampler(y, alphaFn);
  let st = seed>>>0;
  const rnd = () => { st ^= st<<13; st>>>=0; st ^= st>>>17; st ^= st<<5; st>>>=0; return (st+1)/4294967297; };
  const lnL = 2*Math.log(y);
  let acc=0, acc2=0;
  for (let it=0; it<N; it++){
    let lnm = S.lnbase, t = 0, last = -1;
    for(;;){ t += -Math.log(rnd()); if (t > S.Hmax) break;
      let lo=0, hi=S.C.length-1;
      while (lo<hi){ const mid=(lo+hi)>>1; if (S.C[mid] < t) lo=mid+1; else hi=mid; }
      if (lo===last) continue; last = lo; lnm += Math.log(S.PR[lo]); }
    let v = 1 - Math.exp(lnL - lnm); if (v < 0) v = 0;
    acc += v; acc2 += v*v;
  }
  const mu = acc/N; return {mu, se: Math.sqrt(Math.max(0,acc2/N-mu*mu)/N)};
}
{
  const ys = [1e3,1e4,1e5,1e6,4e6,1.7442769e7].map(v=>Math.round(v));
  const xs = [], vs = [];
  console.log('      y     |  ln y  | E[(1-L/m)^+] (N=4e5) | gap to lambda_2(2)');
  for (let i=0;i<ys.length;i++){
    const R = modelLead(ys[i], 400000, 31337+i, alphaComb);
    xs.push(Math.log(ys[i])); vs.push(R.mu);
    console.log('  '+String(ys[i]).padStart(10)+' | '+Math.log(ys[i]).toFixed(3).padStart(6)
      +' |     '+R.mu.toFixed(5)+' +- '+R.se.toFixed(5)+'   |   '+(T2.out[3]-R.mu).toFixed(5));
  }
  // fit a + b/ln y over the six synthetic levels; a should recover lambda_2(2)
  let n=xs.length, sx=0,sy=0,sxx=0,sxy=0;
  for (let i=0;i<n;i++){ const u=1/xs[i]; sx+=u; sy+=vs[i]; sxx+=u*u; sxy+=u*vs[i]; }
  const b=(n*sxy-sx*sy)/(n*sxx-sx*sx), a=(sy-b*sx)/n;
  console.log('  fit a + b/ln y over the six: a = '+a.toFixed(5)+'  b = '+b.toFixed(4)
    +'   against lambda_2(2) = '+T2.out[3].toFixed(6)+'   (a - limit = '+(a-T2.out[3]).toFixed(5)+')');
}

console.log('\n=== PART 5: the model against variance-note section 6 (independent tables) ===');
console.log('  5a. u-sweep at y = 401, set A (all twin candidates, alpha_5 = 3):');
console.log('     u    | note section 6 | model (MC, N=2e5) | lambda_2(u) limit');
for (let i=0;i<US.length;i++){
  const u = US[i], y = 401, L = Math.round(Math.pow(y,u));
  const R = modelMC(y, L, alphaFull, 200000, 4242+i);
  const note = [0.845,0.685,0.477,0.290,0.157,0.076][i];
  console.log('    '+u.toFixed(1)+'   |     '+note.toFixed(3)+'      |      '+R.mu.toFixed(4)+' +- '+R.se.toFixed(4)
    +'    |     '+T2.out[i].toFixed(4));
}
console.log('  5b. u = 2 level sweep, set A (note section 6 regularity 2):');
console.log('      y   | note section 6 | model (MC, N=2e5)');
{
  const ys = [97,199,401,797,1009,1499,2003], nv = [0.251,0.281,0.290,0.303,0.307,0.317,0.321];
  for (let i=0;i<ys.length;i++){
    const y = ys[i], L = Math.round(y*y);
    const R = modelMC(y, L, alphaFull, 200000, 777+i);
    console.log('    '+String(y).padStart(5)+' |     '+nv[i].toFixed(3)+'      |      '+R.mu.toFixed(4)+' +- '+R.se.toFixed(4));
  }
}

console.log('\n=== PART 6: drift shape, residuals, and the x = 41 forecast ===');
{
  // the model's own drift: fit model values to a + b/lnW and a + b/lnlnW on x=13..37
  function fit(xs, ys, f){ const n=xs.length; let sx=0,sy=0,sxx=0,sxy=0;
    for (let i=0;i<n;i++){ const u=f(xs[i]); sx+=u; sy+=ys[i]; sxx+=u*u; sxy+=u*ys[i]; }
    const b=(n*sxy-sx*sy)/(n*sxx-sx*sx), a=(sy-b*sx)/n;
    let rss=0; for (let i=0;i<n;i++){ const e=ys[i]-(a+b*f(xs[i])); rss+=e*e; }
    return {a,b,rms:Math.sqrt(rss/n)}; }
  const lw = PTS.map(P=>Math.log(P.W));
  const idx = PTS.map((P,i)=>i).filter(i=>PTS[i].x>=13);
  const xs = idx.map(i=>lw[i]), ym = idx.map(i=>MOD[i]), yr = idx.map(i=>PTS[i].r);
  const fA = fit(xs, ym, t=>1/t), fB = fit(xs, ym, t=>1/Math.log(t));
  console.log('  the MODEL\'s own drift on x=13..37 (MC noise ~8e-4 is the floor here):');
  console.log('    a + b/lnW    : a = '+fA.a.toFixed(4)+'  b = '+fA.b.toFixed(3)+'  rms = '+fA.rms.toExponential(2));
  console.log('    a + b/lnlnW  : a = '+fB.a.toFixed(4)+'  b = '+fB.b.toFixed(3)+'  rms = '+fB.rms.toExponential(2));
  console.log('    (the model\'s limit is lambda_2(2) = '+T2.out[3].toFixed(6)+' by construction)');
  const gA = fit(xs, yr, t=>1/t);
  console.log('  the MEASURED drift on x=13..37, same protocol: a = '+gA.a.toFixed(4)+'  b = '+gA.b.toFixed(3)
    +'  rms = '+gA.rms.toExponential(2)+'   (sibling: 0.4454, -1.5336)');
  console.log('  x = 41: model MC = '+M41.mu.toFixed(5)+' +- '+M41.se.toFixed(5)
    +'   prereg band [0.4013, 0.4040]  ->  '
    +((M41.mu>=0.4013 && M41.mu<=0.4040)?'INSIDE':'OUTSIDE'));
  console.log('  x = 41: measured-minus-model correction carried forward from x=37 ('
    +(PTS[8].r-MOD[8]).toFixed(4)+') gives '+(M41.mu+(PTS[8].r-MOD[8])).toFixed(5));
}

console.log('\n=== PART 6b: the note\'s fit protocol run on a control with a KNOWN limit ===');
console.log('  The nine model values of PART 4 are a sequence whose limit is lambda_2(2) =');
console.log('  '+T2.out[3].toFixed(6)+' by construction. Fitting them with the same two-parameter');
console.log('  forms the note uses tells us what each form\'s intercept means.');
{
  const PR2 = PRALL;
  for (const P of PTS){ let sx=0, sy=0; for (const p of PR2){ if (p>P.y) break; sy += 1/p; if (p<=P.x) sx += 1/p; } P.share = sx/sy; }
  const set = PTS.map((P,i)=>({P,i})).filter(o=>o.P.x>=13);
  const FORMS = {
    '1/lnW         ': o => 1/Math.log(o.P.W),
    '1/lnlnW       ': o => 1/Math.log(Math.log(o.P.W)),
    '1/sqrt(lnW)   ': o => 1/Math.sqrt(Math.log(o.P.W)),
    '1/lnW^(1/3)   ': o => Math.pow(Math.log(o.P.W),-1/3),
    'mertens share ': o => o.P.share,
    '1/(lnW*lnlnW) ': o => 1/(Math.log(o.P.W)*Math.log(Math.log(o.P.W))),
    '1/lnlnW^2     ': o => 1/Math.pow(Math.log(Math.log(o.P.W)),2),
  };
  console.log('   form           | on the MODEL | bias vs 0.455456 | on the MEASURED | measured minus bias');
  for (const [fn,f] of Object.entries(FORMS)){
    function fit(vals){ const n=set.length; let sx=0,sy=0,sxx=0,sxy=0;
      for (let k=0;k<n;k++){ const u=f(set[k]); sx+=u; sy+=vals[k]; sxx+=u*u; sxy+=u*vals[k]; }
      const b=(n*sxy-sx*sy)/(n*sxx-sx*sx); return (sy-b*sx)/n; }
    const aM = fit(set.map(o=>MOD[o.i])), aR = fit(set.map(o=>o.P.r));
    const bias = aM - T2.out[3];
    console.log('   '+fn+' |    '+aM.toFixed(4)+'    |     '+(bias>=0?'+':'')+bias.toFixed(4)
      +'      |     '+aR.toFixed(4)+'      |       '+(aR-bias).toFixed(4));
  }
  console.log('  Last column: the measured intercept with the control\'s bias removed. If the');
  console.log('  model is right, every row of that column estimates the same number.');
}
console.log('\nDONE ['+el()+'].');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/varE-spectral.js
//   invocation:  node research/history/staging/varE-spectral.js
//   code-sha256: 351677de0e5459b45c114cd2ba16f9ecf0f9b5c69f95f6b723395d77dbc9552f
//   out-sha256:  c72408722a669a34431608f0df739f1a31a14a00ce7bfb0d91880e4d39f6f71c
//   body-lines:  102
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     3.2 s
// ============================================================================
// === PART 0: the spectral form, checked at x = 7 ===
//   sum_{nu!=0} What(nu) K_L(nu/M) = 4.612929   (sibling varE-asymptotic PART 0: X = 4.612929)
//   |diff| = 2.93e-7      sum_{nu!=0} What(nu) = 29.333333  vs 1/delta - 1 = 29.333333
//
// === PART 1: the local means gamma_p, and pi_p = (p-alpha_p)/(p-1) ===
//   p=   2  alpha=  1  gamma_p=   1.0000000  pi_p=(p-alpha)/(p-1)=1.00000000
//   p=   3  alpha=  1  gamma_p=   1.0000000  pi_p=(p-alpha)/(p-1)=1.00000000
//   p=   5  alpha=  2  gamma_p=  0.37500000  pi_p=(p-alpha)/(p-1)=0.75000000
//   p=   7  alpha=  5  gamma_p= 0.066666667  pi_p=(p-alpha)/(p-1)=0.33333333
//   p=  11  alpha=  9  gamma_p= 0.022222222  pi_p=(p-alpha)/(p-1)=0.20000000
//   p=  13  alpha= 11  gamma_p= 0.015151515  pi_p=(p-alpha)/(p-1)=0.16666667
//   p= 101  alpha= 99  gamma_p=0.00020202020  pi_p=(p-alpha)/(p-1)=0.02000000
//   x=7: E_Theta[m] = prod p/alpha_p = 30.333333   1/delta = 30.333333
//
// === PART 2: the decoupled model, EXACT divisor sum, vs the true X ===
//   model:  X_dec = E_Theta[ r_m (m - r_m) ] / L,  r_m = L mod m,  m | M
//   equivalently  delta*X_dec = E_sb[ r_m(m-r_m)/(m L) ],  pi_p = (p-alpha_p)/(p-1)
//   x=7:  X_dec = 5.405185   true X = 4.612929   ratio true/model = 0.8534
//         delta*X_dec = 0.178193   measured Var/E = 0.1521   (16 divisors enumerated)
//   x=11:  X_dec = 15.694986   true X = 15.0751   ratio true/model = 0.9605
//         delta*X_dec = 0.266839   measured Var/E = 0.2563   (8192 divisors enumerated)
//
// === PART 3: the generalized Dickman law GD(theta) and its tail ===
//   theta=1 (one excluded class, Gorodetsky arXiv:2111.00853 Thm 1.3):
//     int f = 1.00000000 (must be 1)   mean = 1.000000 (must be 1)
//     lambda_1(u) for u=0.6, 1, 1.5, 2, 2.5, 3:
//       0.663124  0.438541  0.218559  0.093970  0.035636  0.012095
//   theta=2 (two excluded classes, our comb):
//     int f = 1.00000000 (must be 1)   mean = 2.000000 (must be 2)
//     lambda_2(u) for u=0.6, 1, 1.5, 2, 2.5, 3:
//       0.943257  0.842382  0.657116  0.455456  0.282040  0.157654
//     lambda_2(2) closed form 1 - e^{-2g}(1/2 + 4 - 4 ln 2) = 0.45545648   numeric = 0.45545648
//
// === PART 4: the model, Monte Carlo, at the nine diagonal levels + x = 41 ===
//   sieved to y(41) = 17442769,  pi(y) = 1117922   [0.1s]
//    x |    lnW   | model Var/E (MC, N=4e5) |  measured  | measured - model
//    7 |   5.3471 |      0.17850 +- 0.00048    |   0.1521   |   -0.0264
//   11 |   7.7450 |      0.26744 +- 0.00060    |   0.2563   |   -0.0111
//   13 |  10.3100 |      0.29750 +- 0.00065    |   0.2995   |   +0.0020
//   17 |  13.1432 |      0.32579 +- 0.00068    |   0.3268   |   +0.0010
//   19 |  16.0876 |      0.34637 +- 0.00070    |   0.3473   |   +0.0009
//   23 |  19.2231 |      0.36214 +- 0.00072    |   0.3643   |   +0.0022
//   29 |  22.5904 |      0.37695 +- 0.00073    |   0.3774   |   +0.0005
//   31 |  26.0244 |      0.38740 +- 0.00074    |   0.3876   |   +0.0002
//   37 |  29.6353 |      0.39643 +- 0.00075    |   0.3958   |   -0.0006
//   41 |  33.3489 |      0.40184 +- 0.00075    |   (not measured)  [1.5s]
//   limit predicted by the model: lambda_2(2) = 0.455456
//
// === PART 4b: does the model converge to lambda_2(2)? (u = 2, synthetic y) ===
//       y     |  ln y  | E[(1-L/m)^+] (N=4e5) | gap to lambda_2(2)
//         1000 |  6.908 |     0.32116 +- 0.00070   |   0.13429
//        10000 |  9.210 |     0.35378 +- 0.00072   |   0.10168
//       100000 | 11.513 |     0.37271 +- 0.00074   |   0.08275
//      1000000 | 13.816 |     0.38660 +- 0.00075   |   0.06885
//      4000000 | 15.202 |     0.39357 +- 0.00075   |   0.06188
//     17442769 | 16.674 |     0.39838 +- 0.00076   |   0.05708
//   fit a + b/ln y over the six: a = 0.45285  b = -0.9119   against lambda_2(2) = 0.455456   (a - limit = -0.00260)
//
// === PART 5: the model against variance-note section 6 (independent tables) ===
//   5a. u-sweep at y = 401, set A (all twin candidates, alpha_5 = 3):
//      u    | note section 6 | model (MC, N=2e5) | lambda_2(u) limit
//     0.6   |     0.845      |      0.8543 +- 0.0007    |     0.9433
//     1.0   |     0.685      |      0.7025 +- 0.0009    |     0.8424
//     1.5   |     0.477      |      0.4842 +- 0.0010    |     0.6571
//     2.0   |     0.290      |      0.2927 +- 0.0009    |     0.4555
//     2.5   |     0.157      |      0.1576 +- 0.0007    |     0.2820
//     3.0   |     0.076      |      0.0764 +- 0.0005    |     0.1577
//   5b. u = 2 level sweep, set A (note section 6 regularity 2):
//       y   | note section 6 | model (MC, N=2e5)
//        97 |     0.251      |      0.2541 +- 0.0009
//       199 |     0.281      |      0.2810 +- 0.0009
//       401 |     0.290      |      0.2944 +- 0.0009
//       797 |     0.303      |      0.3061 +- 0.0009
//      1009 |     0.307      |      0.3095 +- 0.0010
//      1499 |     0.317      |      0.3196 +- 0.0010
//      2003 |     0.321      |      0.3232 +- 0.0010
//
// === PART 6: drift shape, residuals, and the x = 41 forecast ===
//   the MODEL's own drift on x=13..37 (MC noise ~8e-4 is the floor here):
//     a + b/lnW    : a = 0.4463  b = -1.564  rms = 2.26e-3
//     a + b/lnlnW  : a = 0.6151  b = -0.744  rms = 8.99e-4
//     (the model's limit is lambda_2(2) = 0.455456 by construction)
//   the MEASURED drift on x=13..37, same protocol: a = 0.4454  b = -1.534  rms = 1.97e-3   (sibling: 0.4454, -1.5336)
//   x = 41: model MC = 0.40184 +- 0.00075   prereg band [0.4013, 0.4040]  ->  INSIDE
//   x = 41: measured-minus-model correction carried forward from x=37 (-0.0006) gives 0.40121
//
// === PART 6b: the note's fit protocol run on a control with a KNOWN limit ===
//   The nine model values of PART 4 are a sequence whose limit is lambda_2(2) =
//   0.455456 by construction. Fitting them with the same two-parameter
//   forms the note uses tells us what each form's intercept means.
//    form           | on the MODEL | bias vs 0.455456 | on the MEASURED | measured minus bias
//    1/lnW          |    0.4463    |     -0.0091      |     0.4454      |       0.4545
//    1/lnlnW        |    0.6151    |     +0.1597      |     0.6108      |       0.4511
//    1/sqrt(lnW)    |    0.5394    |     +0.0840      |     0.5366      |       0.4526
//    1/lnW^(1/3)    |    0.6327    |     +0.1773      |     0.6279      |       0.4506
//    mertens share  |    0.7265    |     +0.2711      |     0.7198      |       0.4488
//    1/(lnW*lnlnW)  |    0.4215    |     -0.0340      |     0.4211      |       0.4551
//    1/lnlnW^2      |    0.4826    |     +0.0271      |     0.4809      |       0.4538
//   Last column: the measured intercept with the control's bias removed. If the
//   model is right, every row of that column estimates the same number.
//
// DONE [3.1s].
// ============================================================================
// READINGS
// ============================================================================
// 1. THE DECOUPLING STEP IS THE WHOLE GAP, AND IT IS 15% WIDE AT x = 7. The
//    model replaces hat f_p(nu) by its mean over the p-1 nonzero frequencies.
//    Exact divisor enumeration gives X_dec = 5.405185 against the true
//    X = 4.612929 at x = 7 (true/model = 0.8534) and 15.694986 against
//    15.0751 at x = 11 (0.9605). Two points; the step is NOT proven anywhere.
// 2. THE SPECTRAL FORM IS EXACT AND IS NOW CHECKED. sum_{nu != 0 mod M}
//    What(nu) K_L(nu/M) = 4.612929 at x = 7, agreeing with the sibling's
//    brute-forced X to 2.9e-7, once the CRT twist nu_p = nu (M/p)^{-1} mod p
//    is carried (without it the sum is 4.441347 and the total mass check
//    still passes, because the twist is a permutation of frequencies).
// 3. THE MODEL REPRODUCES 22 POINTS WITH NO FITTED PARAMETER. Nine diagonal
//    levels: measured minus model = -0.0264, -0.0111, +0.0020, +0.0010,
//    +0.0009, +0.0022, +0.0005, +0.0002, -0.0006 at MC s.e. 7e-4. Six u-sweep
//    points at y = 401 (section 6): 0.8543/0.845, 0.7025/0.685, 0.4842/0.477,
//    0.2927/0.290, 0.1576/0.157, 0.0764/0.076. Seven u = 2 level points
//    (section 6): 0.2541/0.251 up to 0.3232/0.321. The seven diagonal
//    residuals at x >= 13 average +0.0009, about 3 sigma of the pooled MC
//    noise, so the model is close but not exact.
// 4. THE theta = 1 BRANCH IS A PUBLISHED THEOREM. The same construction with
//    one excluded class gives lambda_1(u) = 0.663124, 0.438541, 0.218559,
//    0.093970, 0.035636, 0.012095 at u = 0.6..3, which is Gorodetsky's
//    lambda(u) = e^{-gamma} int_u^inf rho (quoted at second hand through
//    import-rough-anatomy.md section 6; the paper was not read here).
//    int f = 1 and mean = 1 to 8 decimals; for theta = 2, mean = 2.
// 5. THE CONSTANT. lambda_2(2) = 1 - e^{-2 gamma}(9/2 - 4 ln 2) = 0.45545648,
//    numeric and closed form agreeing to 1e-8. The model's own leading part
//    climbs 0.32116 -> 0.39838 over ln y = 6.9..16.7 and its a + b/ln y fit
//    returns 0.45285, 0.0026 below the closed form.
// 6. THE 0.611 READING IS AN ARTEFACT OF THE FORM, NOT A LIMIT. Running the
//    note's own protocol on the model, whose limit is 0.455456 BY
//    CONSTRUCTION, returns intercept 0.6151 from a + b/lnlnW at rms 8.99e-4
//    and 0.4463 from a + b/lnW at rms 2.26e-3: the same ordering, the same
//    winner, and the same two numbers the measured data give (0.6108 and
//    0.4454). Every form's intercept on the model sits within 0.007 of its
//    intercept on the measured data.
// 7. BIAS-CORRECTED, THE SEVEN FORMS AGREE. Subtracting each form's control
//    bias from its measured intercept gives 0.4545, 0.4511, 0.4526, 0.4506,
//    0.4488, 0.4551, 0.4538 - a spread of 0.0063 around lambda_2(2) =
//    0.455456, against an uncorrected spread of 0.4211..0.7265.
// 8. x = 41. The model predicts 0.40184 +- 0.00075, inside var41-prereg.md's
//    registered band [0.4013, 0.4040]. So x = 41 does not test the model
//    either; the band and the model were built independently and agree.
//
// FIGURE PROVENANCE. Readings quote the block above verbatim except:
//   2.9e-7   = |4.612929 - 4.612929| as printed by PART 0's own |diff| line.
//   4.441347 = the pre-fix value of PART 0's sum, printed by the run that
//              carried the CRT-twist bug; it is NOT in this block and is
//              recorded in reading 2 only to name the failure mode.
//   16.7     = ln y rounded from PART 4b's 16.674.
//   0.611    = paper/variance-note.md section 7's quoted intercept, not a
//              figure of this run.
//   0.007    = max |on the MODEL - on the MEASURED| over PART 6b's seven rows.
//   0.0063   = 0.4551 - 0.4488, the spread of PART 6b's last column.
