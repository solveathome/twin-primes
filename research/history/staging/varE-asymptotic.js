// ============================================================================
// varE-asymptotic.js — scratchpad-grade support for varE-asymptotic.md
// (TODO item 9: the Var/E limit on the comb-restricted diagonal, analytically)
// ============================================================================
// WHAT THIS IS. Not a variance engine. The nine exact diagonal points are READ
// from paper/variance-note.md section 7 (produced by natal-cap-16 levels 7..31
// and natal-cap-33 level 37) and are never recomputed here. What this file does
// compute, all cheap:
//   PART 0  a brute-force check, at x = 7 only, of the exact restatement used
//           in the note: Var/E = delta * X with X = sum_{|d|<L}(1-|d|/L)(W(d)-1),
//           against the note's own Var(210) = 1.05282410.
//   PART 1  delta(x) from its definition (2/30)*prod_{7<=p<=y}(1-2/p), and the
//           Mertens constant kappa = 16*C2*exp(-2*gamma)/3 it converges to.
//   PART 2  X = (Var/E)/delta at the nine levels, and X/ln^2 W.
//   PART 3  two-parameter model comparison, note protocol and variants.
//   PART 4  the inert-prime share on the diagonal (all p <= x divide L = x#).
//   PART 5  the single-prime spectral identity sum_{nu!=0} K_L(nu/p) = r(p-r)/L.
//   node research/history/staging/varE-asymptotic.js   (~20 s)
// ============================================================================
'use strict';
const T0 = Date.now(); const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s';
function assert(c,m){ if(!c) throw new Error('ASSERT FAIL: '+m); }
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}

// ---- the nine exact diagonal points, READ from variance-note.md section 7 ----
// x, W = x#, y = maxprime <= sqrt(W), E[N_W], Var, Var/E   (quoted, not recomputed)
const PTS = [
 {x:7,  W:210,               y:13,      E:6.92,             V:1.05,          r:0.1521},
 {x:11, W:2310,              y:47,      E:39.27,            V:10.06,         r:0.2563},
 {x:13, W:30030,             y:173,     E:304.28,           V:91.13,         r:0.2995},
 {x:17, W:510510,            y:709,     E:3245.51,          V:1060.54,       r:0.3268},
 {x:19, W:9699690,           y:3109,    E:41441.19,         V:14392.59,      r:0.3473},
 {x:23, W:223092870,         y:14929,   E:669028.80,        V:243740.37,     r:0.3643},
 {x:29, W:6469693230,        y:80429,   E:14063617.40,      V:5307862.63,    r:0.3774},
 {x:31, W:200560490130,      y:447829,  E:328601798.62,     V:127363168.00,  r:0.3876},
 {x:37, W:7420738134810,     y:2724079, E:9377228928.76,    V:3711451136,    r:0.3958},
];

console.log('=== PART 0: exact restatement checked by brute force at x = 7 ===');
{
  // A5 mod M, M = 2*3*5*7*11*13 = 30030, L = W = 210, y = 13
  const M = 30030, L = 210, mids = [7,11,13];
  const inA = new Uint8Array(M);
  let cnt = 0;
  for (let r = 0; r < M; r++){
    const m30 = r % 30; if (m30 !== 11 && m30 !== 17) continue;
    let ok = true;
    for (const p of mids){ const a = r % p; if (a === 0 || a === p-2){ ok = false; break; } }
    if (ok){ inA[r] = 1; cnt++; }
  }
  assert(cnt === 2*5*9*11, 'census |A5| = 2*prod(p-2) = 990, got '+cnt);
  const delta = cnt / M;
  // brute Var over all M rotations
  let win = 0; for (let j = 0; j < L; j++) win += inA[j];
  let s1 = 0, s2 = 0;
  for (let t = 0; t < M; t++){
    s1 += win; s2 += win*win;
    win += inA[(t+L) % M] - inA[t];
  }
  const mean = s1/M, vbrute = s2/M - mean*mean;
  // pair correlation J5 from Corollary 3
  const J = new Float64Array(2*L);
  const rho30 = d => { const m = ((d%30)+30)%30; return m===0?2:(m===6||m===24?1:0); };
  const rhop = (d,p) => { const m = ((d%p)+p)%p; return m===0?p-2:((m===2||m===p-2)?p-3:p-4); };
  for (let d = 0; d < 2*L; d++){
    let v = rho30(d)/30; for (const p of mids) v *= rhop(d,p)/p;
    J[d] = v;
  }
  // direct J from the set, as an independent check
  for (let d = 0; d < 2*L; d++){
    let c = 0; for (let r = 0; r < M; r++) if (inA[r] && inA[(r+d)%M]) c++;
    assert(Math.abs(c/M - J[d]) < 1e-12, 'J5(d) formula vs count at d='+d);
  }
  // Theorem 2
  let vth = 0; for (let d = -(L-1); d <= L-1; d++){ const ad = Math.abs(d); vth += (L-ad)*(J[ad]-delta*delta); }
  // the restatement: Var/E = delta * X,  X = sum_{|d|<L}(1-|d|/L)(W(d)-1)
  let X = 0; for (let d = -(L-1); d <= L-1; d++){ const ad = Math.abs(d); X += (1-ad/L)*(J[ad]/(delta*delta) - 1); }
  const rBrute = vbrute/(delta*L);
  console.log('  delta = '+delta.toFixed(9)+'   E = '+(delta*L).toFixed(6));
  console.log('  Var brute      = '+vbrute.toFixed(8)+'   (note section 7 / natal-cap-16: 1.05282410)');
  console.log('  Var Theorem 2  = '+vth.toFixed(8)+'   |diff| = '+Math.abs(vth-vbrute).toExponential(2));
  console.log('  Var/E          = '+rBrute.toFixed(8)+'   delta*X = '+(delta*X).toFixed(8)
              +'   |diff| = '+Math.abs(delta*X-rBrute).toExponential(2));
  console.log('  X              = '+X.toFixed(6)+'   1/delta - 1 = '+(1/delta-1).toFixed(6)
              +'   T = X-(1/delta-1) = '+(X-(1/delta-1)).toFixed(6));
  assert(Math.abs(vth-vbrute) < 1e-9, 'Theorem 2 vs brute');
  assert(Math.abs(delta*X-rBrute) < 1e-12, 'restatement Var/E = delta*X');
}

console.log('\n=== PART 1: delta from its definition, and the Mertens constant ===');
const PR = primesUpTo(2800000);
const GAMMA = 0.5772156649015329;
// C2 = prod_{p>2} (1 - 1/(p-1)^2), the twin prime constant
let C2 = 1; for (const p of PR){ if (p === 2) continue; C2 *= 1 - 1/((p-1)*(p-1)); }
const KAPPA = 16*C2*Math.exp(-2*GAMMA)/3;
console.log('  C2 (partial product to 2.8e6) = '+C2.toFixed(9)+'   (literature 0.660161816)');
console.log('  kappa = 16*C2*exp(-2*gamma)/3 = '+KAPPA.toFixed(6));
console.log('   x |      y      |    delta (exact product)   | delta*ln^2 W | E_note/W');
for (const P of PTS){
  let d = 2/30; for (const p of PR){ if (p < 7) continue; if (p > P.y) break; d *= 1 - 2/p; }
  P.delta = d;
  const lw = Math.log(P.W);
  console.log('  '+String(P.x).padStart(2)+' | '+String(P.y).padStart(9)+' | '+d.toPrecision(12).padStart(18)
    +' | '+(d*lw*lw).toFixed(6).padStart(11)+' | '+(P.E/P.W).toPrecision(9));
}

console.log('\n=== PART 2: X = (Var/E)/delta, the object an asymptotic must produce ===');
console.log('   x |  lnW   | lnlnW  |      X       |  X/ln^2 W  | (Var/E)/kappa');
for (const P of PTS){
  const lw = Math.log(P.W), llw = Math.log(lw);
  P.lw = lw; P.llw = llw;
  P.X = P.r / P.delta;
  console.log('  '+String(P.x).padStart(2)+' | '+lw.toFixed(4).padStart(6)+' | '+llw.toFixed(4).padStart(6)
    +' | '+P.X.toFixed(4).padStart(12)+' | '+(P.X/(lw*lw)).toFixed(6).padStart(10)
    +' | '+(P.r/KAPPA).toFixed(6));
}
console.log('  If lim Var/E = 0.6106 then lim X/ln^2 W = 0.6106/kappa = '+(0.6106/KAPPA).toFixed(6));
console.log('  If lim Var/E = 0.4435 then lim X/ln^2 W = 0.4435/kappa = '+(0.4435/KAPPA).toFixed(6));

console.log('\n=== PART 3: two-parameter model comparison (note protocol + variants) ===');
function fit(pts, f){
  const n = pts.length; let sx=0,sy=0,sxx=0,sxy=0;
  for (const P of pts){ const u=f(P), v=P.r; sx+=u; sy+=v; sxx+=u*u; sxy+=u*v; }
  const b=(n*sxy-sx*sy)/(n*sxx-sx*sx), a=(sy-b*sx)/n;
  let rss=0; for (const P of pts){ const e=P.r-(a+b*f(P)); rss+=e*e; }
  return {a,b,rms:Math.sqrt(rss/n)};
}
const FORMS = {
  '1/lnW          ': P => 1/P.lw,
  '1/lnlnW        ': P => 1/P.llw,
  '1/sqrt(lnW)    ': P => 1/Math.sqrt(P.lw),
  '1/lnW^(1/3)    ': P => Math.pow(P.lw,-1/3),
  'mertens share  ': P => P.share,
  'lnlnlnW/lnlnW  ': P => Math.log(P.llw)/P.llw,
  '1/(lnW*lnlnW)  ': P => 1/(P.lw*P.llw),
  '1/lnlnW^2      ': P => 1/(P.llw*P.llw),
};
// mertens share: sum_{p<=x} 1/p over sum_{p<=y} 1/p  (needs PART 4 quantity first)
for (const P of PTS){
  let sx=0, sy=0; for (const p of PR){ if (p > P.y) break; sy += 1/p; if (p <= P.x) sx += 1/p; }
  P.sx=sx; P.sy=sy; P.share = sx/sy;
}
const SETS = {
  'x=13..31 (6 pts, natal-cap-16 protocol, the fit the note publishes)': PTS.filter(P=>P.x>=13&&P.x<=31),
  'x=7..31  (8 pts, what note section 7 SAYS was fitted)':               PTS.filter(P=>P.x<=31),
  'x=13..37 (7 pts, the refit natal-cap-33 reports)':                    PTS.filter(P=>P.x>=13),
  'x=7..37  (9 pts, what note section 7 SAYS was refitted)':             PTS,
};
for (const [sn, set] of Object.entries(SETS)){
  console.log('  -- fitted on '+sn);
  for (const [fn, f] of Object.entries(FORMS)){
    const F = fit(set, f);
    const p37 = F.a + F.b*f(PTS[8]);
    const tail = set.length < 9 ? '   pred@37 = '+p37.toFixed(4)+'  resid = '+(0.3958-p37>=0?'+':'')+(0.3958-p37).toFixed(4) : '';
    console.log('     r = '+F.a.toFixed(4)+' + ('+F.b.toFixed(4)+')*'+fn+'  rms = '+F.rms.toExponential(2)+tail);
  }
}

console.log('\n  -- three-parameter 1/lnW family (the shape a log-power expansion of X gives):');
{
  // r = a + b/lnW + c/ln^2 W, least squares on the 6-pt and 9-pt sets
  for (const [sn,set] of [['x=13..31 (6 pts)',PTS.filter(P=>P.x>=13&&P.x<=31)],['x=7..37 (9 pts)',PTS]]){
    const n=set.length; const A=[], y=[];
    for (const P of set){ A.push([1,1/P.lw,1/(P.lw*P.lw)]); y.push(P.r); }
    // normal equations 3x3
    const M3=[[0,0,0],[0,0,0],[0,0,0]], v3=[0,0,0];
    for (let i=0;i<n;i++) for (let a=0;a<3;a++){ v3[a]+=A[i][a]*y[i]; for(let b=0;b<3;b++) M3[a][b]+=A[i][a]*A[i][b]; }
    // gaussian elimination
    const Mx=M3.map((r,i)=>[...r,v3[i]]);
    for (let c=0;c<3;c++){ let piv=c; for(let r2=c+1;r2<3;r2++) if(Math.abs(Mx[r2][c])>Math.abs(Mx[piv][c])) piv=r2;
      [Mx[c],Mx[piv]]=[Mx[piv],Mx[c]];
      for (let r2=0;r2<3;r2++){ if(r2===c) continue; const f=Mx[r2][c]/Mx[c][c]; for(let k=c;k<4;k++) Mx[r2][k]-=f*Mx[c][k]; } }
    const co=[Mx[0][3]/Mx[0][0],Mx[1][3]/Mx[1][1],Mx[2][3]/Mx[2][2]];
    let rss=0; for (let i=0;i<n;i++){ const e=y[i]-(co[0]+co[1]*A[i][1]+co[2]*A[i][2]); rss+=e*e; }
    console.log('     '+sn+':  r = '+co[0].toFixed(4)+' + ('+co[1].toFixed(3)+')/lnW + ('+co[2].toFixed(2)
      +')/ln^2 W   rms = '+Math.sqrt(rss/n).toExponential(2));
  }
}

console.log('\n  -- growth-rate diagnostics on X (does X/ln^k W settle?):');
console.log('   x |  X/lnW   | X/ln^2 W  | X/ln^3 W  | X/(ln^2 W*lnlnW)');
for (const P of PTS){
  console.log('  '+String(P.x).padStart(2)+' | '+(P.X/P.lw).toFixed(5).padStart(8)+' | '+(P.X/(P.lw**2)).toFixed(6).padStart(9)
   +' | '+(P.X/(P.lw**3)).toFixed(6).padStart(9)+' | '+(P.X/(P.lw*P.lw*P.llw)).toFixed(6).padStart(9));
}

console.log('\n=== PART 4: the diagonal makes every prime p <= x inert ===');
console.log('  On L = W = x#, every p <= x divides L exactly, so a conductor q | x#');
console.log('  has sin(pi*L*k/q) = 0 and contributes exactly 0 to the spectral variance.');
console.log('   x |  sum_{p<=x} 1/p | sum_{p<=y} 1/p | inert share | lnln x | lnln y');
for (const P of PTS){
  console.log('  '+String(P.x).padStart(2)+' | '+P.sx.toFixed(6).padStart(15)+' | '+P.sy.toFixed(6).padStart(14)
   +' | '+P.share.toFixed(6).padStart(11)+' | '+Math.log(Math.log(P.x)).toFixed(4).padStart(6)
   +' | '+Math.log(Math.log(P.y)).toFixed(4).padStart(6));
}

console.log('\n=== PART 5: single-prime spectral identity, checked numerically ===');
console.log('  claim: sum_{nu != 0 mod p} K_L(nu/p) = r(p-r)/L with r = L mod p,');
console.log('  K_L(t) = (1/L)|sin(pi L t)/sin(pi t)|^2.   (=> conductor p | L contributes 0)');
for (const [L,p] of [[210,13],[210,11],[2310,47],[30030,173],[30030,7],[9699690,3109]]){
  let s = 0;
  for (let nu = 1; nu < p; nu++){
    const t = nu/p, sd = Math.sin(Math.PI*t);
    s += Math.pow(Math.sin(Math.PI*L*t)/sd, 2)/L;
  }
  const rr = L % p;
  console.log('  L='+String(L).padStart(8)+'  p='+String(p).padStart(5)+'  sum = '+s.toExponential(6)
    +'   r(p-r)/L = '+(rr*(p-rr)/L).toExponential(6));
}
// the resulting bound on the total single-prime (q = p) contribution at x = 37
{
  const P = PTS[8];
  let tot = 0;
  for (const p of PR){ if (p < 7) continue; if (p > P.y) break; const rr = P.W % p; tot += (2/((p-2)*(p-2)))*(rr*(p-rr)/P.W); }
  console.log('  x=37: delta * sum over conductors q = p of the mean weight 2/(p-2)^2 times');
  console.log('        r(p-r)/L  =  '+(P.delta*tot).toExponential(3)+'   against Var/E = '+P.r);
}

console.log('\n=== PART 6: forward values at x = 41, all forms fitted on x = 13..37 ===');
{
  const W41 = 304250263527210, y41 = 17442769;      // var41-prereg.md section 1
  const lw = Math.log(W41), llw = Math.log(lw);
  const PR41 = primesUpTo(y41);
  let sx=0, sy=0; for (const q of PR41){ sy += 1/q; if (q <= 41) sx += 1/q; }
  const P41 = {x:41, W:W41, y:y41, lw, llw, share:sx/sy, sx, sy, r:NaN};
  console.log('  W(41) = '+W41+'  y(41) = '+y41+'  lnW = '+lw.toFixed(5)+'  lnlnW = '+llw.toFixed(5));
  console.log('  inert Mertens share(41) = '+P41.share.toFixed(6)+'  (sum_{p<=41} 1/p = '+sx.toFixed(6)
    +', sum_{p<=y} 1/p = '+sy.toFixed(6)+')');
  const set = PTS.filter(P=>P.x>=13);
  for (const [fn,f] of Object.entries(FORMS)){
    const F = fit(set,f);
    console.log('     '+fn+' -> r(41) = '+(F.a+F.b*f(P41)).toFixed(5)+'   (intercept '+F.a.toFixed(4)+')');
  }
  {
    const n=set.length, A=[], yv=[];
    for (const P of set){ A.push([1,1/P.lw,1/(P.lw*P.lw)]); yv.push(P.r); }
    const M3=[[0,0,0],[0,0,0],[0,0,0]], v3=[0,0,0];
    for (let i=0;i<n;i++) for (let a=0;a<3;a++){ v3[a]+=A[i][a]*yv[i]; for(let b=0;b<3;b++) M3[a][b]+=A[i][a]*A[i][b]; }
    const Mx=M3.map((rw,i)=>[...rw,v3[i]]);
    for (let c=0;c<3;c++){ let piv=c; for(let r2=c+1;r2<3;r2++) if(Math.abs(Mx[r2][c])>Math.abs(Mx[piv][c])) piv=r2;
      [Mx[c],Mx[piv]]=[Mx[piv],Mx[c]];
      for (let r2=0;r2<3;r2++){ if(r2===c) continue; const fq=Mx[r2][c]/Mx[c][c]; for(let k=c;k<4;k++) Mx[r2][k]-=fq*Mx[c][k]; } }
    const co=[Mx[0][3]/Mx[0][0],Mx[1][3]/Mx[1][1],Mx[2][3]/Mx[2][2]];
    let rss=0; for (let i=0;i<n;i++){ const e=yv[i]-(co[0]+co[1]*A[i][1]+co[2]*A[i][2]); rss+=e*e; }
    console.log('     a+b/lnW+c/ln^2W  -> r(41) = '+(co[0]+co[1]/lw+co[2]/(lw*lw)).toFixed(5)
      +'   (intercept '+co[0].toFixed(4)+', rms '+Math.sqrt(rss/n).toExponential(2)+')');
  }
  console.log('  var41-prereg.md registers 0.4024, band [0.4013, 0.4040].');
}

console.log('\nDONE ['+el()+'].');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/varE-asymptotic.js
//   invocation:  node research/history/staging/varE-asymptotic.js
//   code-sha256: 082ad726c62849ee0570b053360c62b837ba5594cc79b77d3d307b2c10d57500
//   out-sha256:  5b00c282ab209453e0adb3e87e4dc1790eaaa87f75394302709da56d8861f1c6
//   body-lines:  130
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.2 s
// ============================================================================
// === PART 0: exact restatement checked by brute force at x = 7 ===
//   delta = 0.032967033   E = 6.923077
//   Var brute      = 1.05282410   (note section 7 / natal-cap-16: 1.05282410)
//   Var Theorem 2  = 1.05282410   |diff| = 2.22e-16
//   Var/E          = 0.15207459   delta*X = 0.15207459   |diff| = 1.94e-16
//   X              = 4.612929   1/delta - 1 = 29.333333   T = X-(1/delta-1) = -24.720404
//
// === PART 1: delta from its definition, and the Mertens constant ===
//   C2 (partial product to 2.8e6) = 0.660161831   (literature 0.660161816)
//   kappa = 16*C2*exp(-2*gamma)/3 = 1.109905
//    x |      y      |    delta (exact product)   | delta*ln^2 W | E_note/W
//    7 |        13 |    0.0329670329670 |    0.942579 | 0.0329523810
//   11 |        47 |    0.0170015366938 |    1.019838 | 0.0170000000
//   13 |       173 |    0.0101326054618 |    1.077046 | 0.0101325341
//   17 |       709 |   0.00635739287270 |    1.098194 | 0.00635738771
//   19 |      3109 |   0.00427242389051 |    1.105750 | 0.00427242417
//   23 |     14929 |   0.00299888023652 |    1.108169 | 0.00299888024
//   29 |     80429 |   0.00217376881725 |    1.109331 | 0.00217376882
//   31 |    447829 |   0.00163841740916 |    1.109648 | 0.00163841741
//   37 |   2724079 |   0.00126365177674 |    1.109803 | 0.00126365178
//
// === PART 2: X = (Var/E)/delta, the object an asymptotic must produce ===
//    x |  lnW   | lnlnW  |      X       |  X/ln^2 W  | (Var/E)/kappa
//    7 | 5.3471 | 1.6766 |       4.6137 |   0.161366 | 0.137039
//   11 | 7.7450 | 2.0470 |      15.0751 |   0.251314 | 0.230921
//   13 | 10.3100 | 2.3331 |      29.5580 |   0.278075 | 0.269843
//   17 | 13.1432 | 2.5759 |      51.4047 |   0.297580 | 0.294439
//   19 | 16.0876 | 2.7780 |      81.2888 |   0.314085 | 0.312910
//   23 | 19.2231 | 2.9561 |     121.4787 |   0.328741 | 0.328226
//   29 | 22.5904 | 3.1175 |     173.6155 |   0.340205 | 0.340029
//   31 | 26.0244 | 3.2590 |     236.5698 |   0.349300 | 0.349219
//   37 | 29.6353 | 3.3890 |     313.2192 |   0.356640 | 0.356607
//   If lim Var/E = 0.6106 then lim X/ln^2 W = 0.6106/kappa = 0.550137
//   If lim Var/E = 0.4435 then lim X/ln^2 W = 0.4435/kappa = 0.399584
//
// === PART 3: two-parameter model comparison (note protocol + variants) ===
//   -- fitted on x=13..31 (6 pts, natal-cap-16 protocol, the fit the note publishes)
//      r = 0.4435 + (-1.5085)*1/lnW            rms = 1.84e-3   pred@37 = 0.3926  resid = +0.0032
//      r = 0.6106 + (-0.7284)*1/lnlnW          rms = 8.10e-4   pred@37 = 0.3957  resid = +0.0001
//      r = 0.5387 + (-0.7678)*1/sqrt(lnW)      rms = 3.96e-4   pred@37 = 0.3977  resid = -0.0019
//      r = 0.6341 + (-0.7261)*1/lnW^(1/3)      rms = 9.65e-4   pred@37 = 0.3995  resid = -0.0037
//      r = 0.7219 + (-0.6037)*mertens share    rms = 6.67e-4   pred@37 = 0.3968  resid = -0.0010
//      r = 1.0108 + (-1.8073)*lnlnlnW/lnlnW    rms = 2.99e-2   pred@37 = 0.3599  resid = +0.0359
//      r = 0.4178 + (-2.9463)*1/(lnW*lnlnW)    rms = 3.64e-3   pred@37 = 0.3885  resid = +0.0073
//      r = 0.4781 + (-0.9875)*1/lnlnW^2        rms = 2.22e-3   pred@37 = 0.3921  resid = +0.0037
//   -- fitted on x=7..31  (8 pts, what note section 7 SAYS was fitted)
//      r = 0.4462 + (-1.5424)*1/lnW            rms = 4.22e-3   pred@37 = 0.3941  resid = +0.0017
//      r = 0.6347 + (-0.7951)*1/lnlnW          rms = 5.25e-3   pred@37 = 0.4001  resid = -0.0043
//      r = 0.5844 + (-0.9562)*1/sqrt(lnW)      rms = 1.07e-2   pred@37 = 0.4087  resid = -0.0129
//      r = 0.7231 + (-0.9567)*1/lnW^(1/3)      rms = 1.33e-2   pred@37 = 0.4139  resid = -0.0181
//      r = 0.7893 + (-0.7136)*mertens share    rms = 7.66e-3   pred@37 = 0.4050  resid = -0.0092
//      r = -0.9387 + (3.5157)*lnlnlnW/lnlnW    rms = 3.07e-2   pred@37 = 0.3275  resid = +0.0683
//      r = 0.4037 + (-2.3040)*1/(lnW*lnlnW)    rms = 6.81e-3   pred@37 = 0.3807  resid = +0.0151
//      r = 0.4655 + (-0.8852)*1/lnlnW^2        rms = 3.48e-3   pred@37 = 0.3884  resid = +0.0074
//   -- fitted on x=13..37 (7 pts, the refit natal-cap-33 reports)
//      r = 0.4454 + (-1.5336)*1/lnW            rms = 1.97e-3   pred@37 = 0.3937  resid = +0.0021
//      r = 0.6108 + (-0.7289)*1/lnlnW          rms = 7.51e-4   pred@37 = 0.3957  resid = +0.0001
//      r = 0.5366 + (-0.7598)*1/sqrt(lnW)      rms = 6.78e-4   pred@37 = 0.3970  resid = -0.0012
//      r = 0.6279 + (-0.7111)*1/lnW^(1/3)      rms = 1.42e-3   pred@37 = 0.3981  resid = -0.0023
//      r = 0.7198 + (-0.6005)*mertens share    rms = 6.85e-4   pred@37 = 0.3964  resid = -0.0006
//      r = 2.2268 + (-5.1282)*lnlnlnW/lnlnW    rms = 2.92e-2   pred@37 = 0.3799  resid = +0.0159
//      r = 0.4211 + (-3.0526)*1/(lnW*lnlnW)    rms = 4.09e-3   pred@37 = 0.3907  resid = +0.0051
//      r = 0.4809 + (-1.0062)*1/lnlnW^2        rms = 2.35e-3   pred@37 = 0.3933  resid = +0.0025
//   -- fitted on x=7..37  (9 pts, what note section 7 SAYS was refitted)
//      r = 0.4467 + (-1.5462)*1/lnW            rms = 4.01e-3
//      r = 0.6321 + (-0.7898)*1/lnlnW          rms = 5.10e-3
//      r = 0.5773 + (-0.9354)*1/sqrt(lnW)      rms = 1.08e-2
//      r = 0.7084 + (-0.9263)*1/lnW^(1/3)      rms = 1.36e-2
//      r = 0.7814 + (-0.7030)*mertens share    rms = 7.70e-3
//      r = -0.9601 + (3.5970)*lnlnlnW/lnlnW    rms = 3.60e-2
//      r = 0.4069 + (-2.3482)*1/(lnW*lnlnW)    rms = 7.86e-3
//      r = 0.4678 + (-0.8942)*1/lnlnW^2        rms = 3.95e-3
//
//   -- three-parameter 1/lnW family (the shape a log-power expansion of X gives):
//      x=13..31 (6 pts):  r = 0.4656 + (-2.231)/lnW + (5.34)/ln^2 W   rms = 1.80e-4
//      x=7..37 (9 pts):  r = 0.4386 + (-1.341)/lnW + (-0.96)/ln^2 W   rms = 3.45e-3
//
//   -- growth-rate diagnostics on X (does X/ln^k W settle?):
//    x |  X/lnW   | X/ln^2 W  | X/ln^3 W  | X/(ln^2 W*lnlnW)
//    7 |  0.86284 |  0.161366 |  0.030178 |  0.096248
//   11 |  1.94643 |  0.251314 |  0.032449 |  0.122769
//   13 |  2.86694 |  0.278075 |  0.026972 |  0.119187
//   17 |  3.91114 |  0.297580 |  0.022641 |  0.115524
//   19 |  5.05288 |  0.314085 |  0.019523 |  0.113060
//   23 |  6.31941 |  0.328741 |  0.017101 |  0.111207
//   29 |  7.68537 |  0.340205 |  0.015060 |  0.109127
//   31 |  9.09031 |  0.349300 |  0.013422 |  0.107179
//   37 | 10.56913 |  0.356640 |  0.012034 |  0.105236
//
// === PART 4: the diagonal makes every prime p <= x inert ===
//   On L = W = x#, every p <= x divides L exactly, so a conductor q | x#
//   has sin(pi*L*k/q) = 0 and contributes exactly 0 to the spectral variance.
//    x |  sum_{p<=x} 1/p | sum_{p<=y} 1/p | inert share | lnln x | lnln y
//    7 |        1.176190 |       1.344023 |    0.875127 | 0.6657 | 0.9419
//   11 |        1.267100 |       1.661647 |    0.762557 | 0.8746 | 1.3481
//   13 |        1.344023 |       1.917404 |    0.700959 | 0.9419 | 1.6396
//   17 |        1.402846 |       2.149741 |    0.652565 | 1.0414 | 1.8816
//   19 |        1.455478 |       2.348310 |    0.619798 | 1.0799 | 2.0847
//   23 |        1.498956 |       2.525252 |    0.593587 | 1.1428 | 2.2629
//   29 |        1.533439 |       2.686135 |    0.570872 | 1.2141 | 2.4244
//   31 |        1.565697 |       2.827500 |    0.553739 | 1.2337 | 2.5659
//   37 |        1.592724 |       2.957362 |    0.538562 | 1.2840 | 2.6958
//
// === PART 5: single-prime spectral identity, checked numerically ===
//   claim: sum_{nu != 0 mod p} K_L(nu/p) = r(p-r)/L with r = L mod p,
//   K_L(t) = (1/L)|sin(pi L t)/sin(pi t)|^2.   (=> conductor p | L contributes 0)
//   L=     210  p=   13  sum = 1.047619e-1   r(p-r)/L = 1.047619e-1
//   L=     210  p=   11  sum = 4.761905e-2   r(p-r)/L = 4.761905e-2
//   L=    2310  p=   47  sum = 1.212121e-1   r(p-r)/L = 1.212121e-1
//   L=   30030  p=  173  sum = 2.421578e-1   r(p-r)/L = 2.421578e-1
//   L=   30030  p=    7  sum = 6.879682e-26   r(p-r)/L = 0.000000e+0
//   L= 9699690  p= 3109  sum = 1.093241e-1   r(p-r)/L = 1.093241e-1
//   x=37: delta * sum over conductors q = p of the mean weight 2/(p-2)^2 times
//         r(p-r)/L  =  1.129e-11   against Var/E = 0.3958
//
// === PART 6: forward values at x = 41, all forms fitted on x = 13..37 ===
//   W(41) = 304250263527210  y(41) = 17442769  lnW = 33.34887  lnlnW = 3.50702
//   inert Mertens share(41) = 0.525824  (sum_{p<=41} 1/p = 1.617114, sum_{p<=y} 1/p = 3.075390)
//      1/lnW           -> r(41) = 0.39941   (intercept 0.4454)
//      1/lnlnW         -> r(41) = 0.40296   (intercept 0.6108)
//      1/sqrt(lnW)     -> r(41) = 0.40500   (intercept 0.5366)
//      1/lnW^(1/3)     -> r(41) = 0.40696   (intercept 0.6279)
//      mertens share   -> r(41) = 0.40408   (intercept 0.7198)
//      lnlnlnW/lnlnW   -> r(41) = 0.39195   (intercept 2.2268)
//      1/(lnW*lnlnW)   -> r(41) = 0.39497   (intercept 0.4211)
//      1/lnlnW^2       -> r(41) = 0.39913   (intercept 0.4809)
//      a+b/lnW+c/ln^2W  -> r(41) = 0.40309   (intercept 0.4642, rms 2.26e-4)
//   var41-prereg.md registers 0.4024, band [0.4013, 0.4040].
//
// DONE [0.2s].
// ============================================================================
// READINGS
// 1. THE RESTATEMENT IS EXACT. At x = 7, brute force over all 30030 rotations
//    gives Var = 1.05282410, matching natal-cap-16's PART 2d value, and both
//    Theorem 2 and the restatement Var/E = delta*X reproduce it to 2e-16. The
//    algebra Var/E = 1 - delta + delta*T = delta*X is therefore checked, not
//    asserted.
// 2. delta*ln^2 W CONVERGES TO 16*C2*exp(-2*gamma)/3 = 1.109905. Measured
//    1.109803 at x = 37, a relative gap of 9.2e-5, converging monotonically
//    from below (0.9426, 1.0198, 1.0770, 1.0982, 1.1058, 1.1082, 1.1093,
//    1.1096, 1.1098). This is Mertens plus the comb's 2,3,5 factors, and it
//    reduces the limit question to lim X/ln^2 W exactly.
// 3. THE PUBLISHED FIT SETS IN variance-note section 7 ARE MISDESCRIBED. The
//    published 0.4435/-1.509 (rms 1.8e-3) and 0.6106/-0.729 (rms 8.2e-4) are
//    reproduced here ONLY by the six points x = 13..31 (0.4435/-1.5085,
//    1.84e-3; 0.6106/-0.7284, 8.10e-4), which is natal-cap-16's stated set.
//    On the eight points x = 7..31 that section 7 says were used, the numbers
//    are 0.4462/-1.5424 (4.22e-3) and 0.6347/-0.7951 (5.25e-3), and the
//    lnlnW form is then the WORSE of the two. Same for the refit: the
//    reported 0.6108 with rms 7.6e-4 is the seven points x = 13..37 (7.51e-4
//    here), not nine (nine gives 0.6321, rms 5.10e-3).
// 4. TWO MORE TWO-PARAMETER FORMS FIT AT LEAST AS WELL, WITH OTHER
//    INTERCEPTS. On the same six points: a + b/sqrt(lnW) gives rms 3.96e-4
//    (intercept 0.5387) and a + b*(Mertens inert share) gives 6.67e-4
//    (0.7219), against 8.10e-4 for a + b/lnlnW (0.6106). On x = 13..37 the
//    three are 6.78e-4, 6.85e-4, 7.51e-4 with intercepts 0.5366, 0.7198,
//    0.6108. A three-parameter member of the 1/lnW family fits the six points
//    at rms 1.80e-4 with intercept 0.4656. The forecast test at x = 37 still
//    favours 1/lnlnW (+0.0001 against -0.0019 and -0.0010), so the ordering
//    depends on which test is used.
// 5. THE SHARP-CUTOFF HEURISTIC IS REFUTED BY THE DATA. Truncating the
//    conductor sum at q ~ L predicts X asymptotic to a constant times ln^3 W.
//    Measured X/ln^3 W falls from 0.0324 at x = 11 to 0.0120 at x = 37, a
//    factor 2.7 over the range and still falling. X/(ln^2 W * lnlnW) also
//    falls (0.1228 to 0.1052). X/ln^2 W rises (0.2513 to 0.3566) with a
//    decelerating increment. So X sits strictly between ln^2 W and
//    ln^2 W * lnlnW, and no cutoff model of this crudeness reaches it.
// 6. SINGLE-PRIME CONDUCTORS ARE NEGLIGIBLE AND SMALL PRIMES ARE INERT.
//    sum_{nu != 0} K_L(nu/p) = r(p-r)/L exactly (checked at six (L,p) pairs,
//    including L = 30030, p = 7 where p | L and the sum is 0 to 7e-26). The
//    whole q = p band is then 1.1e-11 at x = 37 against Var/E = 0.3958. On the
//    diagonal every p <= x divides L, so every conductor built only from them
//    contributes exactly 0, and those primes carry 0.5386 of the Mertens mass
//    at x = 37, falling like 0.875, 0.763, 0.701, 0.653, 0.620, 0.594, 0.571,
//    0.554, 0.539. That is the only lnln-flavoured mechanism this pass found.
// 7. x = 41 WILL NOT SEPARATE THE FAMILIES EITHER. Fitted on x = 13..37 and
//    evaluated at W(41) = 304250263527210, the forms predict 0.39941 (1/lnW),
//    0.40296 (1/lnlnW), 0.40500 (1/sqrt(lnW)), 0.40408 (Mertens share) and
//    0.40309 (a + b/lnW + c/ln^2 W, rms 2.26e-4, the best in-sample fit of
//    the pass). var41-prereg.md's registered band is [0.4013, 0.4040]. The
//    band excludes the one-term 1/lnW form and includes 1/lnlnW, the Mertens
//    share form and the two-term 1/lnW form. So the tenth point, if it is ever
//    run, retires exactly one of the five, and it is not the 1/lnW family:
//    that family survives at intercept 0.4642 as soon as it is allowed its own
//    second-order term.
// 8. NO CLOSED FORM. Nothing in this pass produces a candidate value for the
//    intercept. What it produces is the reduction lim Var/E = kappa * lim
//    X/ln^2 W with kappa proven, two exact structural facts about which
//    conductors can contribute, and the finding that the surviving intercepts
//    span 0.4642 to 0.7219 rather than sitting at 0.611.
//
// FIGURE PROVENANCE. Readings quote the block above with these roundings:
//   PART 1 delta*ln^2 W column 0.942579 -> 0.9426, 1.019838 -> 1.0198,
//     1.077046 -> 1.0770, 1.098194 -> 1.0982, 1.105750 -> 1.1058,
//     1.108169 -> 1.1082, 1.109331 -> 1.1093, 1.109648 -> 1.1096,
//     1.109803 -> 1.1098.
//   PART 4 inert-share column 0.875127 -> 0.875 and so on to 0.538562 -> 0.539.
//   PART 2/3 values quoted to four decimals as printed.
// DERIVED, not printed: the relative gap 1.109905 vs 1.109803 = 9.2e-5;
//   "2,3,5" names the comb's small primes, not a figure. The 0.4435/-1.509/
//   1.8e-3 and 0.6106/-0.729/8.2e-4 of reading 3 are quoted FROM
//   paper/variance-note.md section 7 and natal-cap-16-fast-variance.js, which
//   is the point of that reading; this file's own reproductions are printed.
