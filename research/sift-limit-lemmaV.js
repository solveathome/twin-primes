// ============================================================================
// LEMMA V, THE MEAN SQUARE — brief W7-1 (2026-08-15)
// companion to research/sift-limit-attack.js / .md sec 4.5, and to the
// pair-correlation apparatus of research/natal5-variance.js
// ============================================================================
// THE OBJECT. The Brudern-Fouvry vector-sieve certificate on the two-class
// interval problem is
//   T(x) = sum_{x<r<=x+H} [ Lm(r)Lp(r+2) + Lp(r)Lm(r+2) - Lp(r)Lp(r+2) ],
// Lp/Lm the Rosser-Iwaniec linear-sieve weights of level D = z^s. Expanding
// each product over divisor pairs and counting each joint class in the window
// splits T EXACTLY into a position-free main term and a sawtooth remainder:
//
//   T(x) = H*M + R(x),
//   M    = sum_{(d1,d2)} w(d1,d2) / [d1,d2],
//   R(x) = sum_{(d1,d2)} w(d1,d2) * ( psi((x-c)/q) - psi((x+H-c)/q) ),
//
// where the sum runs over pairs d1,d2 | P(z) with gcd(d1,d2) | 2 (all other
// pairs have EMPTY joint class: r == 0 mod d1 and r == -2 mod d2 are
// incompatible at every odd common prime), q = [d1,d2], c = c(d1,d2) is the
// CRT class, w = eps*mu(d1)*mu(d2) over the three certificate blocks, and
// psi(t) = t - floor(t) - 1/2. Lemma V asks for R(x) = o(H*M) UNIFORMLY in x.
// This file asks the weaker mean-square question over the full period
// W = P(z), which is what the brief W7-1 puts on the table.
//
// WHAT IS COMPUTED HERE.
//  S0  CUSTODY. The pilot's five exhaustive rows, re-derived, digit for digit.
//  S1  The identity T = H*M + R, checked against the pilot's own arrays.
//  S2  The mean square in closed form. The h-sum of the sawtooth Fourier
//      series psi = -sum_h sin(2 pi h t)/(pi h) is RESUMMED exactly:
//        <B_q(y-c) B_q'(y-c')> = [ (g^2-1)/12 - dbar(g-dbar)/2 ] / (q q'),
//        g = gcd(q,q'), dbar = (c'-c) mod g,
//      giving <R^2> as a finite rational double sum over divisor-pair pairs,
//      checked against brute force over whole periods.
//  S3  The spectral form (the theory payload): <R^2> = sum over moduli e|P(z)
//      and primitive frequencies a/e of |Theta_e(a)|^2 * Fejer(a H / e), with
//      Theta_e(a) an exponential sum over the divisor-pair lattice. The phase
//      is shown to FACTOR (no Kloosterman inverse survives), which is what
//      makes the mean square tractable where the sup-norm is not.
//  S4  Ladders: exact full-period <R^2> against z at fixed (u,s), against u
//      at fixed (z,s), and at s = 3.0 where the main term is asymptotically
//      positive (s > 1+sqrt(e) = 2.6487).
//  S5  Sup norm against rms over full periods: the extreme-value bridge that
//      a worst-position (real Lemma V) proof would have to cross.
//  S6  The almost-all arithmetic, and the elementary control it must beat.
//
//   node research/sift-limit-lemmaV.js        (~5 min at defaults)
// ============================================================================
'use strict';
const T0 = Date.now(); const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s';
function primesBelow(n){ const s=new Uint8Array(n),o=[]; for(let i=2;i<n;i++){ if(!s[i]){o.push(i); for(let j=i*i;j<n;j+=i)s[j]=1; } } return o; }

// --- the pilot's own machinery, copied verbatim so custody is exact --------
function rosserSupport(z, D, upper){
  const ps = primesBelow(z).slice().sort((a,b)=>b-a);
  const out = [];
  (function rec(start, prod, m){
    out.push([prod, (m % 2 === 0) ? 1 : -1]);
    for(let i=start;i<ps.length;i++){
      const p = ps[i], m2 = m+1;
      if(prod*p > D) continue;
      const isCond = upper ? (m2 % 2 === 1) : (m2 % 2 === 0);
      if(isCond && prod*p*p*p > D) continue;
      rec(i+1, prod*p, m2);
    }
  })(0, 1, 0);
  return out;
}
function buildLam(L, supp){
  const A = new Int32Array(L);
  for(const [d, sg] of supp){ for(let n=0;n<L;n+=d) A[n] += sg; }
  return A;
}
function roughSet(z, L){
  const A = new Uint8Array(L).fill(1); A[0] = 0;
  for(const p of primesBelow(z)) for(let n=0;n<L;n+=p) A[n]=0;
  return A;
}

// --- divisor-pair term list ------------------------------------------------
function gcd(a,b){ while(b){ const t=a%b; a=b; b=t; } return a; }
function egcd(a,b){ if(b===0) return [a,1,0]; const [g,x,y]=egcd(b,a%b); return [g,y,x-Math.floor(a/b)*y]; }
// r == 0 (mod d1), r == -2 (mod d2). Solvable iff gcd(d1,d2) | 2.
function crtPair(d1,d2){
  const g = gcd(d1,d2); if(2 % g !== 0) return null;
  const q = d1/g*d2, d2g = d2/g, d1g = d1/g;
  const [,inv] = egcd(((d1g % d2g)+d2g)%d2g, d2g);
  let t = ((-2/g) % d2g) * inv % d2g; t = ((t % d2g)+d2g)%d2g;
  let c = (d1*t) % q; c = ((c % q)+q)%q;
  return [q,c];
}
function buildTerms(z, D){
  const ps = primesBelow(z);
  const sp = rosserSupport(z,D,true), sm = rosserSupport(z,D,false);
  const COMB = [[sm,sp,+1],[sp,sm,+1],[sp,sp,-1]];   // (-,+) (+,-) (+,+)
  const W_=[],Q=[],C=[],MK=[],D1=[],D2=[]; let M=0;
  const maskOf = (n)=>{ let m=0; for(let i=0;i<ps.length;i++) if(n%ps[i]===0) m|=(1<<i); return m; };
  for(const [S1,S2,eps] of COMB) for(const [d1,s1] of S1) for(const [d2,s2] of S2){
    const r = crtPair(d1,d2); if(!r) continue;
    const [q,c] = r, w = eps*s1*s2;
    W_.push(w); Q.push(q); C.push(c); MK.push(maskOf(q)); D1.push(d1); D2.push(d2);
    M += w/q;
  }
  return { w:Int8Array.from(W_), q:Float64Array.from(Q), c:Float64Array.from(C),
           mk:Int32Array.from(MK), d1:Int32Array.from(D1), d2:Int32Array.from(D2),
           M, np:sp.length, nm:sm.length, ps, n:W_.length };
}

// --- the exact mean square over the full period W = P(z) -------------------
// PROVEN identity (derivation in the header of S2 below, verified in S2):
//   <B_q(y-c) B_q'(y-c')>_y = [ (g^2-1)/12 - Pg(c'-c) ] / (q q'),
//   Pg(d) = dbar (g - dbar) / 2,  dbar = d mod g,  g = gcd(q,q').
// R is a DIFFERENCE psi(x-c) - psi(x+H-c), so the (g^2-1)/12 cancels and
//   <R^2> = sum_{i,j} w_i w_j * Psi_ij / (q_i q_j),
//   Psi_ij = Pg(delta - H) + Pg(delta + H) - 2 Pg(delta),  delta = c_j - c_i.
// Two structural facts, both used below:
//   (V1) g | H  =>  Psi = 0 identically. In particular every coprime pair
//        (g = 1) drops out. This is where all the cancellation lives.
//   (V2) |Psi| <= h(g-h) with h = H mod g, attained at delta = 0.
// Also returned: <rho^2>, where rho(y) = sum_j w_j psi((y-c_j)/q_j) is the
// H-FREE sawtooth potential. R(x) = rho(x) - rho(x+H), so <R^2> = 2<rho^2> -
// 2<rho(y)rho(y+H)> <= 4<rho^2>, and averaging over H gives exactly 2<rho^2>:
// the saturation plateau the mean square climbs to once H exceeds the
// correlation length of rho. Everything about Lemma V that does not depend on
// H lives in rho.
function meanSquare(t, H){
  const n=t.n, w=t.w, q=t.q, c=t.c, mk=t.mk;
  const PR = Float64Array.from(t.ps);
  let tot=0, diag=0, gcdb=0, s1=0, maxrat=0, sharp=0, rho2=0;
  for(let i=0;i<n;i++) s1 += 1/q[i];
  gcdb = s1*s1;                       // every pair contributes at least 1/(q q')
  for(let i=0;i<n;i++){
    const qi=q[i], ci=c[i], wi=w[i], mi=mk[i];
    { const g=qi, h=H%g, v=(h*(g-h))/(qi*qi);   // diagonal: delta = 0
      diag+=v; tot+=v; sharp+=v; gcdb += (g*g-1)/(qi*qi);
      rho2 += ((g*g-1)/12)/(qi*qi); }
    for(let j=i+1;j<n;j++){
      const qj=q[j];
      let m=mi&mk[j], g=1;
      while(m){ const b=m&(-m); g*=PR[31-Math.clz32(b)]; m^=b; }
      const inv=1/(qi*qj);
      if(g===1) continue;             // (V1): contributes to neither sum
      gcdb += 2*(g*g-1)*inv;
      let x=(c[j]-ci)%g; if(x<0) x+=g;
      rho2 += 2*wi*w[j]*((g*g-1)/12 - x*(g-x)/2)*inv;
      const h=H%g; if(h===0) continue;                       // (V1)
      let a=x-h; if(a<0) a+=g;
      let b2=x+h; if(b2>=g) b2-=g;
      const psi = (a*(g-a) + b2*(g-b2) - 2*x*(g-x))/2;
      const bnd = h*(g-h);
      const rat = Math.abs(psi)/bnd; if(rat>maxrat) maxrat=rat;   // (V2) check
      sharp += 2*bnd*inv;
      tot += 2*wi*w[j]*psi*inv;
    }
  }
  return { ms:tot, diag, gcdBound:gcdb/4, sharpBound:sharp, maxrat, rho2, plateau:2*rho2 };
}

// --- S0: custody. Reproduce the pilot's exhaustive rows, then correct them.
// The pilot slides its window with  T += c(x+H) - c(x)  but skips the slide at
// x = 1, where T still holds the window (0, H]. Unrolling, the pilot's T at
// loop index x equals the TRUE window sum over (x, x+H] minus the constant
// c(H+1) - c(1). So every pilot row is shifted by one fixed integer; minT,
// meanT and maxdev inherit that shift, sdT and the deviation exponent do not.
function custody(){
  console.log('S0 CUSTODY --- pilot rows re-derived (pilot slide) and corrected (true window)');
  const ROWS=[[13,2.80,2.60],[17,2.80,2.60],[19,2.80,2.60],[20,2.80,2.60],[20,2.20,2.60]];
  for(const [z,u,s] of ROWS){
    const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
    let W=1; for(const p of primesBelow(z)) W*=p;
    const L=W+H+10;
    const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
    const Lp=buildLam(L,sp), Lm=buildLam(L,sm), th=roughSet(z,L);
    for(let n=1;n<L;n++) if(!(Lm[n]<=th[n] && th[n]<=Lp[n])) throw new Error('sandwich fails n='+n);
    const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
    // pilot loop, verbatim in effect
    const nPos=L-H-3;
    let T=0, S=0; for(let r=1;r<=H;r++){ T+=cc(r); S+=th[r]&th[r+2]; }
    let minT=T, minS=S, nneg=0, sumT=0, sumT2=0;
    for(let x=1;x<=nPos;x++){
      if(x>1){ const g=x+H,l=x; T+=cc(g)-cc(l); S+=(th[g]&th[g+2])-(th[l]&th[l+2]); }
      if(T<minT) minT=T; if(T<=0) nneg++; if(S<minS) minS=S; sumT+=T; sumT2+=T*T;
    }
    const meanT=sumT/nPos, sdT=Math.sqrt(Math.max(0,sumT2/nPos-meanT*meanT));
    // true sliding window over one full period
    let T2=0; for(let r=1;r<=H;r++) T2+=cc(r);
    let minT2=T2, sum2=0, sup=0;
    const t=buildTerms(z,D), HM=H*t.M;
    for(let x=0;x<W;x++){
      if(x>0) T2 += cc(x+H)-cc(x);
      if(T2<minT2) minT2=T2; sum2+=T2;
      const dv=Math.abs(T2-HM); if(dv>sup) sup=dv;
    }
    console.log(`  z=${z} u=${u} s=${s} H=${H} D=${D} |D+|=${sp.length} |D-|=${sm.length} N=${t.n}`);
    console.log(`    pilot : minT=${minT}  T<=0: ${nneg}/${nPos}  meanT=${meanT.toFixed(1)}  sdT=${sdT.toFixed(1)}  minS=${minS}`);
    console.log(`    true  : minT=${minT2}  meanT=${(sum2/W).toFixed(6)}  H*M=${HM.toFixed(6)}  sup|R|=${sup}  offset c(1)-c(H+1)=${cc(1)-cc(H+1)}   [${el()}]`);
  }
}

// --- S1: the identity T(x) = H*M + R(x), against the pilot's arrays --------
function identityCheck(){
  console.log('S1 IDENTITY --- T(x) - H*M - R(x) over full periods');
  for(const [z,u,s,cap] of [[13,2.8,2.6,1e9],[17,2.8,2.6,1e9],[19,2.8,2.6,200000],[20,2.8,2.6,200000],[20,2.2,2.6,200000]]){
    const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
    let W=1; for(const p of primesBelow(z)) W*=p;
    const L=W+H+10;
    const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
    const Lp=buildLam(L,sp), Lm=buildLam(L,sm);
    const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
    const t=buildTerms(z,D), HM=H*t.M;
    let T=0; for(let r=1;r<=H;r++) T+=cc(r);
    let worst=0; const lim=Math.min(W,cap);
    for(let x=0;x<lim;x++){
      if(x>0) T += cc(x+H)-cc(x);
      let R=0;
      for(let i=0;i<t.n;i++){ const qi=t.q[i], ci=t.c[i];
        let a=(x-ci)%qi; if(a<0)a+=qi; let b=(x+H-ci)%qi; if(b<0)b+=qi;
        R += t.w[i]*((a-b)/qi); }
      const dv=Math.abs(T-(HM+R)); if(dv>worst) worst=dv;
    }
    console.log(`  z=${z} u=${u}: positions=${lim}${lim===W?' (FULL PERIOD)':' (sampled prefix)'}  N=${t.n}  max|T-(H*M+R)| = ${worst.toExponential(3)}   [${el()}]`);
  }
}

// --- brute force: <R^2> by walking the whole period -----------------------
function meanSquareBrute(t, H, W){
  const n=t.n, w=t.w, q=t.q, c=t.c;
  let s=0, sup=0;
  for(let x=0;x<W;x++){
    let R=0;
    for(let i=0;i<n;i++){ const qi=q[i], ci=c[i];
      let a=(x-ci)%qi; if(a<0)a+=qi; let b=(x+H-ci)%qi; if(b<0)b+=qi;
      R += w[i]*((a-b)/qi); }
    s += R*R; if(Math.abs(R)>sup) sup=Math.abs(R);
  }
  return { ms:s/W, sup };
}

// --- full-period walk through the pilot's arrays (R = T - H*M) -------------
function fullPeriodArray(z,u,s){
  const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
  let W=1, lnW=0; for(const p of primesBelow(z)){ W*=p; lnW+=Math.log(p); }
  const L=W+H+10;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=buildLam(L,sp), Lm=buildLam(L,sm);
  const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
  const t=buildTerms(z,D), HM=H*t.M;
  let T=0; for(let r=1;r<=H;r++) T+=cc(r);
  let s2=0, s4=0, s6=0, s8=0, sup=0, minT=T;
  for(let x=0;x<W;x++){
    if(x>0) T += cc(x+H)-cc(x);
    const R=T-HM, R2=R*R; s2+=R2; s4+=R2*R2; s6+=R2*R2*R2; s8+=R2*R2*R2*R2;
    if(Math.abs(R)>sup) sup=Math.abs(R); if(T<minT) minT=T;
  }
  const ms=s2/W;
  return { ms, sup, minT, H, D, W, lnW, HM, N:t.n, t,
           k4:(s4/W)/(ms*ms), k6:(s6/W)/(ms*ms*ms), k8:(s8/W)/(ms*ms*ms*ms) };
}

// --- S2: closed form against brute force ----------------------------------
function meanSquareCheck(){
  console.log('S2 MEAN SQUARE --- closed form against brute force over the FULL period');
  console.log('  (a) brute force by re-summing the divisor-pair terms at every x, independent of the pilot arrays:');
  for(const [z,u,s] of [[13,2.8,2.6],[17,2.8,2.6],[19,2.8,2.6],[17,3.2,3.0]]){
    const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
    let W=1; for(const p of primesBelow(z)) W*=p;
    const t=buildTerms(z,D);
    const cf=meanSquare(t,H), bf=meanSquareBrute(t,H,W);
    console.log(`    z=${z} u=${u} s=${s} N=${t.n} W=${W}: closed=${cf.ms.toFixed(9)}  brute=${bf.ms.toFixed(9)}  rel=${(Math.abs(cf.ms-bf.ms)/bf.ms).toExponential(2)}  max|Psi|/(h(g-h))=${cf.maxrat.toFixed(6)}   [${el()}]`);
  }
  console.log('  (b) brute force by walking the pilot arrays, R = T - H*M:');
  for(const [z,u,s] of [[20,2.8,2.6],[20,2.2,2.6],[19,3.2,3.0]]){
    const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
    const t=buildTerms(z,D), cf=meanSquare(t,H), fp=fullPeriodArray(z,u,s);
    console.log(`    z=${z} u=${u} s=${s} N=${t.n} W=${fp.W}: closed=${cf.ms.toFixed(9)}  brute=${fp.ms.toFixed(9)}  rel=${(Math.abs(cf.ms-fp.ms)/fp.ms).toExponential(2)}  max|Psi|/(h(g-h))=${cf.maxrat.toFixed(6)}   [${el()}]`);
  }
}

// --- S3: the spectral form ------------------------------------------------
// psi(t) = -sum_{h>=1} sin(2 pi h t)/(pi h) put into R and summed over h in
// closed form gives, on the full period,
//   <R^2> = sum_{e | P(z), e>1} sum_{a mod e, (a,e)=1}
//             |Theta_e(a)|^2 * sin^2(pi a H / e) / sin^2(pi a / e),
//   Theta_e(a) = sum_{(d1,d2): e | [d1,d2]}  w(d1,d2)/[d1,d2] * e(-a c/e).
// The Fejer factor is |sum_{m<H} e(am/e)|^2. The phase c mod e is shown below
// to depend on (d1,d2) ONLY through (e1,e2) = (gcd(e,d1), e/gcd(e,d1)):
// c == 0 mod e1 and c == -2 mod e2 forces it. So Theta_e(a) is a sum of
// 2^nu(e) terms, each a product of two one-dimensional linear-sieve sums with
// a congruence condition. No modular inverse (no Kloosterman sum) survives.
function divisorsOf(ps){ let ds=[1]; for(const p of ps) ds=ds.concat(ds.map(d=>d*p)); return ds.sort((a,b)=>a-b); }
function spectralCheck(){
  console.log('S3 SPECTRAL --- <R^2> as a sum over moduli e | P(z), and the phase factorisation');
  for(const [z,u,s] of [[13,2.8,2.6],[13,3.2,3.0],[17,2.8,2.6]]){
    const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
    let W=1; for(const p of primesBelow(z)) W*=p;
    const t=buildTerms(z,D), divs=divisorsOf(t.ps);
    let spec=0, maxTe=0, argmax='';
    for(const e of divs){ if(e===1) continue;
      let nu=0; for(const p of t.ps) if(e%p===0) nu++;
      for(let a=1;a<e;a++){ if(gcd(a,e)!==1) continue;
        let re=0, im=0;
        for(let i=0;i<t.n;i++){ if(t.q[i]%e!==0) continue;
          const ph=-2*Math.PI*a*(t.c[i]%e)/e;
          re += (t.w[i]/t.q[i])*Math.cos(ph); im += (t.w[i]/t.q[i])*Math.sin(ph); }
        const th2=re*re+im*im;
        const sc=Math.sqrt(th2)*e/Math.pow(2,nu); if(sc>maxTe){ maxTe=sc; argmax=`e=${e},a=${a}`; }
        const nm=Math.sin(Math.PI*a*(H%e)/e), dn=Math.sin(Math.PI*a/e);
        spec += th2*(nm*nm)/(dn*dn);
      } }
    // phase factorisation: c mod e is exactly CRT(0 mod e1, -2 mod e2),
    // e1 = gcd(e,d1), e2 = e/e1 -- so it depends on (d1,d2) only through
    // (e1,e2). Equivalently c/e == -2 * inverse(e1) / e2 (mod 1): an inverse
    // phase, the Kloosterman signature, but carried by only tau(e) terms.
    let bad=0, checked=0, badExplicit=0;
    for(const e of divs){ if(e===1) continue; const seen=new Map();
      for(let i=0;i<t.n;i++){ if(t.q[i]%e!==0) continue;
        const e1=gcd(e,t.d1[i]), e2=e/e1, key=e1+'|'+e2, v=t.c[i]%e; checked++;
        if(seen.has(key)){ if(seen.get(key)!==v) bad++; } else seen.set(key,v);
        const r2=crtPair(e1,e2); if(r2===null || r2[1]!==v) badExplicit++; } }
    const cf=meanSquare(t,H);
    console.log(`  z=${z} u=${u} s=${s}: spectral=${spec.toFixed(9)}  closed=${cf.ms.toFixed(9)}  rel=${(Math.abs(spec-cf.ms)/cf.ms).toExponential(2)}`);
    console.log(`     phase factorisation: ${checked} (e,term) pairs, ${bad} depends-only-on-(e1,e2) violations, ${badExplicit} explicit-CRT violations;`);
    console.log(`     max_e,a |Theta_e(a)| * e / 2^nu(e) = ${maxTe.toExponential(3)} at ${argmax}   [${el()}]`);
  }
}

// --- S4: ladders ----------------------------------------------------------
const ROWCACHE = new Map();
function row(z,u,s){ const k=z+'|'+u+'|'+s; if(!ROWCACHE.has(k)) ROWCACHE.set(k, rowCompute(z,u,s)); return ROWCACHE.get(k); }
function rowCompute(z,u,s){
  const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s));
  const t=buildTerms(z,D), r=meanSquare(t,H), HM=H*t.M, rms=Math.sqrt(r.ms);
  let lnW=0; for(const p of primesBelow(z)) lnW+=Math.log(p);
  // gamma in the pilot's convention: deviation = budget^gamma, budget the
  // absolute-value term count. 1.0 = no cancellation, 0.5 = square root.
  const budget=Math.pow(t.np+t.nm,2), rmsP=Math.sqrt(r.plateau), lnz=Math.log(z);
  return { z,u,s,H,D,N:t.n,np:t.np,nm:t.nm,M:t.M,HM,ms:r.ms,rms,
           diag:r.diag, gcd:r.gcdBound, sharp:r.sharpBound, lnW, budget,
           plateau:r.plateau, rmsP, Hstar:rmsP/t.M, HstarOverLn2:(rmsP/t.M)/(lnz*lnz),
           gRms:Math.log(rms)/Math.log(budget),
           gPlat:Math.log(rmsP)/Math.log(budget),
           gProv:Math.log(Math.sqrt(r.gcdBound))/Math.log(budget),
           ratio:rms/HM, msOverH:r.ms/H, gcdRatio:Math.sqrt(r.gcdBound)/HM };
}
function printRow(r){
  console.log(`  z=${String(r.z).padStart(3)} u=${r.u.toFixed(1)} s=${r.s.toFixed(1)} H=${String(r.H).padStart(8)} D=${String(r.D).padStart(7)} N=${String(r.N).padStart(7)}` +
    `  H*M=${r.HM.toFixed(2).padStart(10)}  <R^2>=${r.ms.toFixed(4).padStart(11)}  rms=${r.rms.toFixed(4).padStart(9)}  rms/H*M=${r.ratio.toFixed(6)}`);
  console.log(`        plateau 2<rho^2>=${r.plateau.toFixed(4).padStart(10)}  sqrt=${r.rmsP.toFixed(4).padStart(8)}  H* = sqrt(plateau)/M = ${r.Hstar.toFixed(1).padStart(9)} = ${r.HstarOverLn2.toFixed(3)} ln^2 z` +
    `  gamma_rms=${r.gRms.toFixed(3)}  gamma_plateau=${r.gPlat.toFixed(3)}  gamma_prov=${r.gProv.toFixed(3)}  sqrt(gcdBd)/H*M=${r.gcdRatio.toFixed(3)}   [${el()}]`);
}
function ladders(zsA, zsB, uScan){
  console.log('S4a Z-LADDER at (u,s) = (2.8, 2.6)   [s below 1+sqrt(e): main term positive only by finite-size]');
  for(const z of zsA) printRow(row(z,2.8,2.6));
  console.log('S4b Z-LADDER at (u,s) = (3.2, 3.0)   [s > 1+sqrt(e) = 2.6487: main term asymptotically positive]');
  for(const z of zsB) printRow(row(z,3.2,3.0));
  console.log('S4c U-SCAN at z = 29, s = 2.6   [how <R^2> depends on the window length H]');
  for(const u of uScan){ const r=row(29,u,2.6);
    console.log(`  u=${u.toFixed(2)} H=${String(r.H).padStart(8)}  <R^2>=${r.ms.toFixed(5).padStart(11)}  <R^2>/plateau=${(r.ms/r.plateau).toFixed(4)}  <R^2>/H=${r.msOverH.toExponential(4)}  H*M=${r.HM.toFixed(2).padStart(9)}  rms/H*M=${r.ratio.toFixed(6)}   [${el()}]`); }
  console.log(`  plateau 2<rho^2> at z=29, s=2.6 is ${row(29,2.8,2.6).plateau.toFixed(5)} (H-free)`);
}

// --- S5: sup norm against rms, the extreme-value bridge -------------------
function supBridge(){
  console.log('S5 SUP/RMS --- how far the worst position sits above the mean square');
  const ROWS=[[13,2.8,2.6],[17,2.8,2.6],[19,2.8,2.6],[20,2.8,2.6],[20,2.2,2.6],[19,3.2,3.0],[20,3.2,3.0]];
  console.log('  moments over the FULL period; Gaussian reference <R^4>/<R^2>^2 = 3, <R^6>/<R^2>^3 = 15, <R^8>/<R^2>^4 = 105');
  for(const [z,u,s] of ROWS){
    const fp=fullPeriodArray(z,u,s), rms=Math.sqrt(fp.ms);
    console.log(`  z=${z} u=${u} s=${s} W=${fp.W}: rms=${rms.toFixed(4)}  sup|R|=${fp.sup.toFixed(4)}  sup/rms=${(fp.sup/rms).toFixed(3)}  sqrt(2 lnW)=${Math.sqrt(2*fp.lnW).toFixed(3)}  H*M=${fp.HM.toFixed(2)}  sup|R|/H*M=${(fp.sup/fp.HM).toFixed(4)}  minT=${fp.minT}`);
    console.log(`        moments: m4=${fp.k4.toFixed(3)}  m6=${fp.k6.toFixed(2)}  m8=${fp.k8.toFixed(1)}   [${el()}]`);
  }
  console.log('  sampled sup over 8e6 consecutive positions (period far larger; LOWER bound on the true sup):');
  for(const [z,u,s] of [[29,2.8,2.6],[41,2.8,2.6],[50,2.8,2.6],[100,2.8,2.6],[100,3.2,3.0]]){
    const H=Math.round(Math.pow(z,u)), D=Math.round(Math.pow(z,s)), L=8_000_000;
    const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
    const Lp=buildLam(L,sp), Lm=buildLam(L,sm);
    const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
    let T=0; for(let r=1;r<=H;r++) T+=cc(r);
    const nPos=L-H-3; let sum=0,sum2=0,minT=T,sup=0;
    for(let x=0;x<nPos;x++){ if(x>0) T+=cc(x+H)-cc(x); sum+=T; sum2+=T*T; if(T<minT)minT=T; }
    const mean=sum/nPos, sd=Math.sqrt(Math.max(0,sum2/nPos-mean*mean));
    // second pass for sup deviation
    T=0; for(let r=1;r<=H;r++) T+=cc(r);
    for(let x=0;x<nPos;x++){ if(x>0) T+=cc(x+H)-cc(x); const d=Math.abs(T-mean); if(d>sup) sup=d; }
    let lnW=0; for(const p of primesBelow(z)) lnW+=Math.log(p);
    console.log(`  z=${z} u=${u} s=${s} H=${H}: sampled sd=${sd.toFixed(3)}  sampled sup dev=${sup.toFixed(1)}  sup/sd=${(sup/sd).toFixed(3)}  sqrt(2 ln W)=${Math.sqrt(2*lnW).toFixed(3)}  minT=${minT}  meanT=${mean.toFixed(1)}   [${el()}]`);
  }
}

// --- the elementary control: exact position-variance of the twin-candidate
// count in a window of length H, by the two-class pair correlation
//   J(d) = prod_{p<z} rho_p(d)/p,  rho_p(d) = p - #{0,-2,-d,-d-2 mod p},
// Var_x = sum_{|d|<H} (H-|d|) (J(d) - delta^2),  E = delta H.
// Chebyshev then bounds the density of EMPTY windows by Var/E^2. Same J5-style
// CRT apparatus as research/natal5-variance.js, applied to the two-class comb.
// !!! WRONG. DO NOT TRUST THIS FUNCTION OR ANY S6 COLUMN DERIVED FROM IT. !!!
// Flagged 2026-08-16 by the parent session, on the run of 2026-08-15 evening.
// The Var it returns is too large by roughly three orders, and the tell is in
// its own output: Var/E^2 came out 0.500, 0.500, 0.500, 0.5002, 0.5006 across
// seven (z,H) pairs spanning a decade in H and z. A real arithmetic quantity
// does not sit on 1/2 to four digits across that range.
//
// Brute force over ALL window positions of the period gives the truth:
//   z=13 (sift p<=11, P=2310),   H=1315 : Var =  3.4751, Var/E = 0.0452,
//                                         Var/E^2 = 5.884e-4  [claimed 5.006e-1]
//   z=19 (sift p<=17, P=510510), H=3806 : Var =  6.5212, Var/E = 0.0393,
//                                         Var/E^2 = 2.365e-4  [claimed 5.002e-1]
//   z=19,                        H=12360: Var =  9.4586, Var/E = 0.0175,
//                                         Var/E^2 = 3.252e-5  [claimed 5.000e-1]
// (delta is right in every case; only the variance is wrong. The independent
// check agrees with paper/variance-note.md, which measures this count as
// strictly SUB-Poisson, Var/E well below 1, against the 38 to 982 printed here.)
//
// THE CONCLUSION REVERSES. With the true elementary bound, the sieve mean
// square does NOT beat the elementary second moment; it LOSES by about 1.4x
// at every point checkable by brute force:
//   z=13 u=2.8: sieve 8.249e-4 against elementary 5.884e-4
//   z=19 u=2.8: sieve 3.722e-4 against elementary 2.365e-4
//   z=19 u=3.2: sieve 4.658e-5 against elementary 3.252e-5
// The sieve does scale better in H (about H^-2.0 against H^-1.7), so it
// overtakes eventually, near H ~ 4e4 at z=19 on the measured trend. The
// printed "sieve/elem = 0.002 ... 0.000" and every "elementary needs H > ..."
// line in S6 are artifacts and must not be quoted.
//
// UNAFFECTED: the plateau, the identity and mean-square checks (S1 to S3), the
// z-ladders, the sup data, and the conditional all-positions exponent, none of
// which call this function.
function elementaryVariance(z,H){
  const ps=primesBelow(z);
  let delta=1; for(const p of ps) delta *= (p===2?1:(p-2))/p;
  let S=0;
  for(let d=1;d<H;d++){
    if(d & 1) continue;                       // odd d: rho_2 = 0
    let J=1;
    for(const p of ps){
      const set=new Set([0, ((-2)%p+p)%p, ((-d)%p+p)%p, ((-d-2)%p+p)%p]);
      J *= (p-set.size)/p;
      if(J===0) break;
    }
    S += 2*(H-d)*(J-delta*delta);
  }
  const Var = H*(delta-delta*delta) + S;      // d = 0 term is H*(J(0)-delta^2), J(0)=delta
  return { delta, E:delta*H, Var, cheb:Var/(delta*H*delta*H) };
}

// --- S6: what almost-all is worth ----------------------------------------
function almostAll(){
  console.log('S6 ALMOST-ALL --- sieve mean square against the elementary second moment');
  console.log('  sieve bound      = <R^2>/(H*M)^2   : Chebyshev density of positions where the certificate can fail');
  console.log('  elementary bound = Var/E^2         : Chebyshev density of EMPTY windows, exact two-class pair correlation');
  for(const [z,u,s] of [[13,2.8,2.6],[19,2.8,2.6],[29,2.8,2.6],[41,2.8,2.6],[19,3.2,3.0],[29,3.2,3.0],[31,3.2,3.0]]){
    const r=row(z,u,s), ev=elementaryVariance(z,r.H);
    const sieve=r.ms/(r.HM*r.HM);
    console.log(`  z=${String(z).padStart(3)} u=${u} s=${s} H=${String(r.H).padStart(8)}  delta=${ev.delta.toExponential(3)}  E=${ev.E.toFixed(1).padStart(9)}  Var/E=${(ev.Var/ev.E).toFixed(4)}` +
      `  sieve=${sieve.toExponential(3)}  elementary=${ev.cheb.toExponential(3)}  sieve/elem=${(sieve/ev.cheb).toFixed(3)}`);
  }
  console.log('  crossover: the window length at which each bound first becomes nontrivial (bound = 1).');
  console.log('  Both scale as 1/H, so the comparison is a comparison of two constants, not of two exponents.');
  for(const [z,u,s] of [[19,3.2,3.0],[29,3.2,3.0],[31,3.2,3.0],[41,2.8,2.6],[47,2.8,2.6]]){
    const r=row(z,u,s), lnz=Math.log(z);
    const ev=elementaryVariance(z,r.H), fano=ev.Var/ev.E;
    const hSieve=r.Hstar, hElem=fano/ev.delta;
    console.log(`  z=${String(z).padStart(3)} s=${s}: sqrt(plateau)=${r.rmsP.toFixed(4)}  M=${r.M.toExponential(4)}  Var/E=${fano.toFixed(4)}  delta=${ev.delta.toExponential(4)}`);
    console.log(`        sieve needs      H > sqrt(2<rho^2>)/M = ${hSieve.toFixed(1).padStart(9)} = ${(hSieve/(lnz*lnz)).toFixed(3)} * ln^2 z`);
    console.log(`        elementary needs H > (Var/E)/delta    = ${hElem.toFixed(1).padStart(9)} = ${(hElem/(lnz*lnz)).toFixed(3)} * ln^2 z`);
  }
  console.log('  CONDITIONAL, on an unproven Gaussian maximal law sup_y |rho(y)| <= sqrt(<rho^2>) * sqrt(2 ln W):');
  console.log('    ALL-positions positivity would need H > 2*sqrt(2 lnW * <rho^2>)/M. lnW = theta(z) ~ z.');
  for(const [z,u,s] of [[19,3.2,3.0],[23,3.2,3.0],[29,3.2,3.0],[31,3.2,3.0],[41,2.8,2.6],[47,2.8,2.6]]){
    const r=row(z,u,s), lnz=Math.log(z);
    const need=2*Math.sqrt(2*r.lnW*r.plateau/2)/r.M;
    console.log(`    z=${String(z).padStart(3)} s=${s}: sqrt(<rho^2>)=${Math.sqrt(r.plateau/2).toFixed(4)} lnW=${r.lnW.toFixed(2)} M=${r.M.toExponential(3)}` +
      `  ->  H > ${need.toFixed(1).padStart(10)} = ${(need/(z*lnz*lnz)).toFixed(4)} * z ln^2 z = ${(Math.log(need)/lnz).toFixed(4)} in exponent of z`);
  }
}

function main(){
  custody();
  identityCheck();
  meanSquareCheck();
  spectralCheck();
  ladders([13,17,19,20,23,29,31,37,41,43,47],[13,17,19,20,23,29,31],[1.8,2.2,2.6,2.8,3.2,3.6,4.0,4.4]);
  supBridge();
  almostAll();
  console.log('DONE '+el());
}
if(require.main===module) main();
// exported so the theta-ladder extension can drive row() without re-running main
// fullPeriodArray added to the exports 2026-08-17 (research/theta-ladder.md §5)
// so the exact full-period sup|R| can be measured against the Gaussian maximal
// law the theta column assumes. The function itself is UNCHANGED.
module.exports={row,rowCompute,buildTerms,meanSquare,ladders,fullPeriodArray};

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/sift-limit-lemmaV.js
//   invocation:  node research/sift-limit-lemmaV.js
//   code-sha256: 3e1133a1e5f3fe611927def0ef0c3c1a542f0b9c4f12c20b5c1201106b091bab
//   out-sha256:  98a53407f985db7ec865efc2da6033327fdaf6196402a90bf761981cfb31055a
//   body-lines:  148
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     184.9 s
// ============================================================================
// S0 CUSTODY --- pilot rows re-derived (pilot slide) and corrected (true window)
//   z=13 u=2.8 s=2.6 H=1315 D=788 |D+|=14 |D-|=16 N=372
//     pilot : minT=50  T<=0: 0/2317  meanT=52.9  sdT=1.5  minS=73
//     true  : minT=50  meanT=52.941558  H*M=52.941558  sup|R|=5.058441558441324  offset c(1)-c(H+1)=0   [0.0s]
//   z=17 u=2.8 s=2.6 H=2788 D=1582 |D+|=26 |D-|=28 N=980
//     pilot : minT=103  T<=0: 0/30037  meanT=109.0  sdT=2.1  minS=133
//     true  : minT=104  meanT=110.015984  H*M=110.015984  sup|R|=6.984015984014604  offset c(1)-c(H+1)=-1   [0.0s]
//   z=19 u=2.8 s=2.6 H=3806 D=2112 |D+|=28 |D-|=36 N=1284
//     pilot : minT=112  T<=0: 0/510517  meanT=119.9  sdT=2.3  minS=158
//     true  : minT=112  meanT=119.948158  H*M=119.948158  sup|R|=7.94815772462843  offset c(1)-c(H+1)=0   [0.1s]
//   z=20 u=2.8 s=2.6 H=4394 D=2414 |D+|=40 |D-|=48 N=2652
//     pilot : minT=107  T<=0: 0/9699697  meanT=119.7  sdT=2.7  minS=160
//     true  : minT=107  meanT=119.673282  H*M=119.673282  sup|R|=12.673282135823882  offset c(1)-c(H+1)=0   [0.3s]
//   z=20 u=2.2 s=2.6 H=728 D=2414 |D+|=40 |D-|=48 N=2652
//     pilot : minT=8  T<=0: 0/9699697  meanT=19.8  sdT=2.5  minS=20
//     true  : minT=8  meanT=19.827526  H*M=19.827526  sup|R|=11.827526034337684  offset c(1)-c(H+1)=0   [0.5s]
// S1 IDENTITY --- T(x) - H*M - R(x) over full periods
//   z=13 u=2.8: positions=2310 (FULL PERIOD)  N=372  max|T-(H*M+R)| = 2.416e-13   [0.6s]
//   z=17 u=2.8: positions=30030 (FULL PERIOD)  N=980  max|T-(H*M+R)| = 1.393e-12   [1.3s]
//   z=19 u=2.8: positions=200000 (sampled prefix)  N=1284  max|T-(H*M+R)| = 1.563e-13   [8.6s]
//   z=20 u=2.8: positions=200000 (sampled prefix)  N=2652  max|T-(H*M+R)| = 3.084e-12   [24.7s]
//   z=20 u=2.2: positions=200000 (sampled prefix)  N=2652  max|T-(H*M+R)| = 5.613e-13   [39.7s]
// S2 MEAN SQUARE --- closed form against brute force over the FULL period
//   (a) brute force by re-summing the divisor-pair terms at every x, independent of the pilot arrays:
//     z=13 u=2.8 s=2.6 N=372 W=2310: closed=2.312169000  brute=2.312169000  rel=7.87e-15  max|Psi|/(h(g-h))=1.000000   [39.8s]
//     z=17 u=2.8 s=2.6 N=980 W=30030: closed=4.314096826  brute=4.314096826  rel=1.01e-13  max|Psi|/(h(g-h))=1.000000   [40.5s]
//     z=19 u=2.8 s=2.6 N=1284 W=510510: closed=5.354335747  brute=5.354335747  rel=1.74e-12  max|Psi|/(h(g-h))=1.000000   [61.3s]
//     z=17 u=3.2 s=3 N=2236 W=30030: closed=4.786499388  brute=4.786499388  rel=2.60e-15  max|Psi|/(h(g-h))=1.000000   [62.7s]
//   (b) brute force by walking the pilot arrays, R = T - H*M:
//     z=20 u=2.8 s=2.6 N=2652 W=9699690: closed=7.433496208  brute=7.433496208  rel=1.20e-11  max|Psi|/(h(g-h))=1.000000   [63.0s]
//     z=20 u=2.2 s=2.6 N=2652 W=9699690: closed=6.434469629  brute=6.434469629  rel=2.56e-11  max|Psi|/(h(g-h))=1.000000   [63.3s]
//     z=19 u=3.2 s=3 N=4764 W=510510: closed=11.158524293  brute=11.158524293  rel=5.64e-14  max|Psi|/(h(g-h))=1.000000   [63.8s]
// S3 SPECTRAL --- <R^2> as a sum over moduli e | P(z), and the phase factorisation
//   z=13 u=2.8 s=2.6: spectral=2.312169000  closed=2.312169000  rel=4.96e-14
//      phase factorisation: 2785 (e,term) pairs, 0 depends-only-on-(e1,e2) violations, 0 explicit-CRT violations;
//      max_e,a |Theta_e(a)| * e / 2^nu(e) = 1.635e-1 at e=21,a=16   [63.8s]
//   z=13 u=3.2 s=3: spectral=3.697734300  closed=3.697734300  rel=1.82e-13
//      phase factorisation: 9753 (e,term) pairs, 0 depends-only-on-(e1,e2) violations, 0 explicit-CRT violations;
//      max_e,a |Theta_e(a)| * e / 2^nu(e) = 1.663e-1 at e=330,a=257   [63.9s]
//   z=17 u=2.8 s=2.6: spectral=4.314096826  closed=4.314096826  rel=3.84e-13
//      phase factorisation: 11389 (e,term) pairs, 0 depends-only-on-(e1,e2) violations, 0 explicit-CRT violations;
//      max_e,a |Theta_e(a)| * e / 2^nu(e) = 1.611e-1 at e=105,a=88   [64.0s]
// S4a Z-LADDER at (u,s) = (2.8, 2.6)   [s below 1+sqrt(e): main term positive only by finite-size]
//   z= 13 u=2.8 s=2.6 H=    1315 D=    788 N=    372  H*M=     52.94  <R^2>=     2.3122  rms=   1.5206  rms/H*M=0.028722
//         plateau 2<rho^2>=    2.1424  sqrt=  1.4637  H* = sqrt(plateau)/M =      36.4 = 5.526 ln^2 z  gamma_rms=0.062  gamma_plateau=0.056  gamma_prov=0.623  sqrt(gcdBd)/H*M=1.311   [64.0s]
//   z= 17 u=2.8 s=2.6 H=    2788 D=   1582 N=    980  H*M=    110.02  <R^2>=     4.3141  rms=   2.0770  rms/H*M=0.018879
//         plateau 2<rho^2>=    4.3086  sqrt=  2.0757  H* = sqrt(plateau)/M =      52.6 = 6.553 ln^2 z  gamma_rms=0.092  gamma_plateau=0.092  gamma_prov=0.625  sqrt(gcdBd)/H*M=1.333   [64.0s]
//   z= 19 u=2.8 s=2.6 H=    3806 D=   2112 N=   1284  H*M=    119.95  <R^2>=     5.3543  rms=   2.3139  rms/H*M=0.019291
//         plateau 2<rho^2>=    5.1294  sqrt=  2.2648  H* = sqrt(plateau)/M =      71.9 = 8.289 ln^2 z  gamma_rms=0.101  gamma_plateau=0.098  gamma_prov=0.612  sqrt(gcdBd)/H*M=1.358   [64.1s]
//   z= 20 u=2.8 s=2.6 H=    4394 D=   2414 N=   2652  H*M=    119.67  <R^2>=     7.4335  rms=   2.7264  rms/H*M=0.022782
//         plateau 2<rho^2>=    9.8271  sqrt=  3.1348  H* = sqrt(plateau)/M =     115.1 = 12.825 ln^2 z  gamma_rms=0.112  gamma_plateau=0.128  gamma_prov=0.616  sqrt(gcdBd)/H*M=2.073   [64.2s]
//   z= 23 u=2.8 s=2.6 H=    6499 D=   3471 N=   2748  H*M=    179.13  <R^2>=     7.7203  rms=   2.7785  rms/H*M=0.015512
//         plateau 2<rho^2>=    9.1395  sqrt=  3.0232  H* = sqrt(plateau)/M =     109.7 = 11.157 ln^2 z  gamma_rms=0.114  gamma_plateau=0.123  gamma_prov=0.617  sqrt(gcdBd)/H*M=1.437   [64.3s]
//   z= 29 u=2.8 s=2.6 H=   12437 D=   6342 N=   6060  H*M=    326.05  <R^2>=    20.5028  rms=   4.5280  rms/H*M=0.013887
//         plateau 2<rho^2>=   19.7617  sqrt=  4.4454  H* = sqrt(plateau)/M =     169.6 = 14.955 ln^2 z  gamma_rms=0.153  gamma_plateau=0.151  gamma_prov=0.620  sqrt(gcdBd)/H*M=1.382   [65.2s]
//   z= 31 u=2.8 s=2.6 H=   14990 D=   7543 N=  10660  H*M=    343.60  <R^2>=    33.7370  rms=   5.8084  rms/H*M=0.016904
//         plateau 2<rho^2>=   36.1148  sqrt=  6.0096  H* = sqrt(plateau)/M =     262.2 = 22.233 ln^2 z  gamma_rms=0.171  gamma_plateau=0.174  gamma_prov=0.622  sqrt(gcdBd)/H*M=1.779   [67.8s]
//   z= 37 u=2.8 s=2.6 H=   24602 D=  11949 N=  14196  H*M=    521.37  <R^2>=    41.1899  rms=   6.4179  rms/H*M=0.012310
//         plateau 2<rho^2>=   55.1282  sqrt=  7.4248  H* = sqrt(plateau)/M =     350.4 = 26.871 ln^2 z  gamma_rms=0.174  gamma_plateau=0.187  gamma_prov=0.611  sqrt(gcdBd)/H*M=1.340   [72.7s]
//   z= 41 u=2.8 s=2.6 H=   32794 D=  15604 N=  23292  H*M=    631.99  <R^2>=    63.0813  rms=   7.9424  rms/H*M=0.012567
//         plateau 2<rho^2>=   87.1354  sqrt=  9.3346  H* = sqrt(plateau)/M =     484.4 = 35.124 ln^2 z  gamma_rms=0.186  gamma_plateau=0.201  gamma_prov=0.614  sqrt(gcdBd)/H*M=1.456   [86.2s]
//   z= 43 u=2.8 s=2.6 H=   37472 D=  17661 N=  26724  H*M=    645.54  <R^2>=    78.1611  rms=   8.8409  rms/H*M=0.013695
//         plateau 2<rho^2>=  103.4821  sqrt= 10.1726  H* = sqrt(plateau)/M =     590.5 = 41.741 ln^2 z  gamma_rms=0.192  gamma_plateau=0.205  gamma_prov=0.609  sqrt(gcdBd)/H*M=1.539   [104.1s]
//   z= 47 u=2.8 s=2.6 H=   48070 D=  22256 N=  30316  H*M=    757.10  <R^2>=   100.0660  rms=  10.0033  rms/H*M=0.013213
//         plateau 2<rho^2>=  116.2470  sqrt= 10.7818  H* = sqrt(plateau)/M =     684.6 = 46.180 ln^2 z  gamma_rms=0.200  gamma_plateau=0.207  gamma_prov=0.606  sqrt(gcdBd)/H*M=1.414   [127.4s]
// S4b Z-LADDER at (u,s) = (3.2, 3.0)   [s > 1+sqrt(e) = 2.6487: main term asymptotically positive]
//   z= 13 u=3.2 s=3.0 H=    3670 D=   2197 N=    852  H*M=    204.95  <R^2>=     3.6977  rms=   1.9229  rms/H*M=0.009383
//         plateau 2<rho^2>=    2.1901  sqrt=  1.4799  H* = sqrt(plateau)/M =      26.5 = 4.028 ln^2 z  gamma_rms=0.083  gamma_plateau=0.050  gamma_prov=0.634  sqrt(gcdBd)/H*M=0.729   [127.5s]
//   z= 17 u=3.2 s=3.0 H=    8658 D=   4913 N=   2236  H*M=    406.81  <R^2>=     4.7865  rms=   2.1878  rms/H*M=0.005378
//         plateau 2<rho^2>=    4.9931  sqrt=  2.2345  H* = sqrt(plateau)/M =      47.6 = 5.925 ln^2 z  gamma_rms=0.087  gamma_plateau=0.090  gamma_prov=0.632  sqrt(gcdBd)/H*M=0.703   [127.6s]
//   z= 19 u=3.2 s=3.0 H=   12360 D=   6859 N=   4764  H*M=    489.43  <R^2>=    11.1585  rms=   3.3404  rms/H*M=0.006825
//         plateau 2<rho^2>=    9.9047  sqrt=  3.1472  H* = sqrt(plateau)/M =      79.5 = 9.167 ln^2 z  gamma_rms=0.126  gamma_plateau=0.119  gamma_prov=0.632  sqrt(gcdBd)/H*M=0.889   [128.1s]
//   z= 20 u=3.2 s=3.0 H=   14565 D=   8000 N=   8868  H*M=    486.83  <R^2>=    18.8294  rms=   4.3393  rms/H*M=0.008913
//         plateau 2<rho^2>=   18.9653  sqrt=  4.3549  H* = sqrt(plateau)/M =     130.3 = 14.518 ln^2 z  gamma_rms=0.145  gamma_plateau=0.145  gamma_prov=0.631  sqrt(gcdBd)/H*M=1.226   [129.9s]
//   z= 23 u=3.2 s=3.0 H=   22779 D=  12167 N=   9636  H*M=    778.34  <R^2>=    12.4549  rms=   3.5291  rms/H*M=0.004534
//         plateau 2<rho^2>=   15.9650  sqrt=  3.9956  H* = sqrt(plateau)/M =     116.9 = 11.894 ln^2 z  gamma_rms=0.123  gamma_plateau=0.135  gamma_prov=0.631  sqrt(gcdBd)/H*M=0.839   [132.2s]
//   z= 29 u=3.2 s=3.0 H=   47827 D=  24389 N=  20700  H*M=   1522.94  <R^2>=    27.8098  rms=   5.2735  rms/H*M=0.003463
//         plateau 2<rho^2>=   27.1919  sqrt=  5.2146  H* = sqrt(plateau)/M =     163.8 = 14.443 ln^2 z  gamma_rms=0.150  gamma_plateau=0.149  gamma_prov=0.627  sqrt(gcdBd)/H*M=0.696   [143.3s]
//   z= 31 u=3.2 s=3.0 H=   59205 D=  29791 N=  35868  H*M=   1731.90  <R^2>=    38.6931  rms=   6.2204  rms/H*M=0.003592
//         plateau 2<rho^2>=   49.4770  sqrt=  7.0340  H* = sqrt(plateau)/M =     240.5 = 20.391 ln^2 z  gamma_rms=0.157  gamma_plateau=0.168  gamma_prov=0.625  sqrt(gcdBd)/H*M=0.816   [177.4s]
// S4c U-SCAN at z = 29, s = 2.6   [how <R^2> depends on the window length H]
//   u=1.80 H=     429  <R^2>=    6.52667  <R^2>/plateau=0.3303  <R^2>/H=1.5214e-2  H*M=    11.25  rms/H*M=0.227152   [178.1s]
//   u=2.20 H=    1649  <R^2>=   13.85597  <R^2>/plateau=0.7012  <R^2>/H=8.4027e-3  H*M=    43.23  rms/H*M=0.086104   [178.9s]
//   u=2.60 H=    6342  <R^2>=   16.68025  <R^2>/plateau=0.8441  <R^2>/H=2.6301e-3  H*M=   166.26  rms/H*M=0.024564   [179.7s]
//   u=2.80 H=   12437  <R^2>=   20.50283  <R^2>/plateau=1.0375  <R^2>/H=1.6485e-3  H*M=   326.05  rms/H*M=0.013887   [179.7s]
//   u=3.20 H=   47827  <R^2>=   21.45944  <R^2>/plateau=1.0859  <R^2>/H=4.4869e-4  H*M=  1253.85  rms/H*M=0.003695   [180.6s]
//   u=3.60 H=  183922  <R^2>=   21.52157  <R^2>/plateau=1.0891  <R^2>/H=1.1701e-4  H*M=  4821.76  rms/H*M=0.000962   [181.5s]
//   u=4.00 H=  707281  <R^2>=   18.27890  <R^2>/plateau=0.9250  <R^2>/H=2.5844e-5  H*M= 18542.32  rms/H*M=0.000231   [182.3s]
//   u=4.40 H= 2719889  <R^2>=   22.51302  <R^2>/plateau=1.1392  <R^2>/H=8.2772e-6  H*M= 71305.54  rms/H*M=0.000067   [183.3s]
//   plateau 2<rho^2> at z=29, s=2.6 is 19.76171 (H-free)
// S5 SUP/RMS --- how far the worst position sits above the mean square
//   moments over the FULL period; Gaussian reference <R^4>/<R^2>^2 = 3, <R^6>/<R^2>^3 = 15, <R^8>/<R^2>^4 = 105
//   z=13 u=2.8 s=2.6 W=2310: rms=1.5206  sup|R|=5.0584  sup/rms=3.327  sqrt(2 lnW)=3.936  H*M=52.94  sup|R|/H*M=0.0955  minT=50
//         moments: m4=3.125  m6=16.59  m8=122.7   [183.3s]
//   z=17 u=2.8 s=2.6 W=30030: rms=2.0770  sup|R|=6.9840  sup/rms=3.362  sqrt(2 lnW)=4.541  H*M=110.02  sup|R|/H*M=0.0635  minT=104
//         moments: m4=2.592  m6=10.19  m8=51.6   [183.3s]
//   z=19 u=2.8 s=2.6 W=510510: rms=2.3139  sup|R|=7.9482  sup/rms=3.435  sqrt(2 lnW)=5.127  H*M=119.95  sup|R|/H*M=0.0663  minT=112
//         moments: m4=2.726  m6=11.27  m8=59.8   [183.3s]
//   z=20 u=2.8 s=2.6 W=9699690: rms=2.7264  sup|R|=12.6733  sup/rms=4.648  sqrt(2 lnW)=5.672  H*M=119.67  sup|R|/H*M=0.1059  minT=107
//         moments: m4=2.943  m6=14.31  m8=97.1   [183.4s]
//   z=20 u=2.2 s=2.6 W=9699690: rms=2.5366  sup|R|=11.8275  sup/rms=4.663  sqrt(2 lnW)=5.672  H*M=19.83  sup|R|/H*M=0.5965  minT=8
//         moments: m4=2.877  m6=13.37  m8=85.2   [183.6s]
//   z=19 u=3.2 s=3 W=510510: rms=3.3404  sup|R|=12.4270  sup/rms=3.720  sqrt(2 lnW)=5.127  H*M=489.43  sup|R|/H*M=0.0254  minT=477
//         moments: m4=2.719  m6=11.47  m8=63.7   [183.6s]
//   z=20 u=3.2 s=3 W=9699690: rms=4.3393  sup|R|=18.8274  sup/rms=4.339  sqrt(2 lnW)=5.672  H*M=486.83  sup|R|/H*M=0.0387  minT=468
//         moments: m4=2.906  m6=13.70  m8=88.5   [183.7s]
//   sampled sup over 8e6 consecutive positions (period far larger; LOWER bound on the true sup):
//   z=29 u=2.8 s=2.6 H=12437: sampled sd=4.529  sampled sup dev=21.1  sup/sd=4.649  sqrt(2 ln W)=6.200  minT=305  meanT=326.1   [183.9s]
//   z=41 u=2.8 s=2.6 H=32794: sampled sd=7.733  sampled sup dev=37.1  sup/sd=4.792  sqrt(2 ln W)=7.699  minT=602  meanT=631.9   [184.2s]
//   z=50 u=2.8 s=2.6 H=57163: sampled sd=11.463  sampled sup dev=46.7  sup/sd=4.070  sqrt(2 ln W)=9.051  minT=785  meanT=831.7   [184.4s]
//   z=100 u=2.8 s=2.6 H=398107: sampled sd=31.960  sampled sup dev=124.1  sup/sd=3.884  sqrt(2 ln W)=12.941  minT=4326  meanT=4430.9   [184.6s]
//   z=100 u=3.2 s=3 H=2511886: sampled sd=28.003  sampled sup dev=96.2  sup/sd=3.435  sqrt(2 ln W)=12.941  minT=40440  meanT=40512.8   [184.7s]
// S6 ALMOST-ALL --- sieve mean square against the elementary second moment
//   sieve bound      = <R^2>/(H*M)^2   : Chebyshev density of positions where the certificate can fail
//   elementary bound = Var/E^2         : Chebyshev density of EMPTY windows, exact two-class pair correlation
//   z= 13 u=2.8 s=2.6 H=    1315  delta=5.844e-2  E=     76.9  Var/E=38.4705  sieve=8.249e-4  elementary=5.006e-1  sieve/elem=0.002
//   z= 19 u=2.8 s=2.6 H=    3806  delta=4.363e-2  E=    166.1  Var/E=83.0726  sieve=3.722e-4  elementary=5.002e-1  sieve/elem=0.001
//   z= 29 u=2.8 s=2.6 H=   12437  delta=3.565e-2  E=    443.3  Var/E=221.7005  sieve=1.929e-4  elementary=5.001e-1  sieve/elem=0.000
//   z= 41 u=2.8 s=2.6 H=   32794  delta=2.937e-2  E=    963.1  Var/E=481.5994  sieve=1.579e-4  elementary=5.001e-1  sieve/elem=0.000
//   z= 19 u=3.2 s=3 H=   12360  delta=4.363e-2  E=    539.3  Var/E=269.6685  sieve=4.658e-5  elementary=5.000e-1  sieve/elem=0.000
//   z= 29 u=3.2 s=3 H=   47827  delta=3.565e-2  E=   1704.8  Var/E=852.4191  sieve=1.199e-5  elementary=5.000e-1  sieve/elem=0.000
//   z= 31 u=3.2 s=3 H=   59205  delta=3.319e-2  E=   1964.8  Var/E=982.4398  sieve=1.290e-5  elementary=5.000e-1  sieve/elem=0.000
//   crossover: the window length at which each bound first becomes nontrivial (bound = 1).
//   Both scale as 1/H, so the comparison is a comparison of two constants, not of two exponents.
//   z= 19 s=3: sqrt(plateau)=3.1472  M=3.9598e-2  Var/E=269.6685  delta=4.3633e-2
//         sieve needs      H > sqrt(2<rho^2>)/M =      79.5 = 9.167 * ln^2 z
//         elementary needs H > (Var/E)/delta    =    6180.4 = 712.872 * ln^2 z
//   z= 29 s=3: sqrt(plateau)=5.2146  M=3.1843e-2  Var/E=852.4191  delta=3.5645e-2
//         sieve needs      H > sqrt(2<rho^2>)/M =     163.8 = 14.443 * ln^2 z
//         elementary needs H > (Var/E)/delta    =   23914.0 = 2109.067 * ln^2 z
//   z= 31 s=3: sqrt(plateau)=7.0340  M=2.9253e-2  Var/E=982.4398  delta=3.3187e-2
//         sieve needs      H > sqrt(2<rho^2>)/M =     240.5 = 20.391 * ln^2 z
//         elementary needs H > (Var/E)/delta    =   29603.3 = 2510.398 * ln^2 z
//   z= 41 s=2.6: sqrt(plateau)=9.3346  M=1.9271e-2  Var/E=481.5994  delta=2.9368e-2
//         sieve needs      H > sqrt(2<rho^2>)/M =     484.4 = 35.124 * ln^2 z
//         elementary needs H > (Var/E)/delta    =   16399.0 = 1189.142 * ln^2 z
//   z= 47 s=2.6: sqrt(plateau)=10.7818  M=1.5750e-2  Var/E=640.2584  delta=2.6636e-2
//         sieve needs      H > sqrt(2<rho^2>)/M =     684.6 = 46.180 * ln^2 z
//         elementary needs H > (Var/E)/delta    =   24037.6 = 1621.570 * ln^2 z
//   CONDITIONAL, on an unproven Gaussian maximal law sup_y |rho(y)| <= sqrt(<rho^2>) * sqrt(2 ln W):
//     ALL-positions positivity would need H > 2*sqrt(2 lnW * <rho^2>)/M. lnW = theta(z) ~ z.
//     z= 19 s=3: sqrt(<rho^2>)=2.2254 lnW=13.14 M=3.960e-2  ->  H >      576.3 = 3.4984 * z ln^2 z = 2.1588 in exponent of z
//     z= 23 s=3: sqrt(<rho^2>)=2.8253 lnW=16.09 M=3.417e-2  ->  H >      938.0 = 4.1484 * z ln^2 z = 2.1827 in exponent of z
//     z= 29 s=3: sqrt(<rho^2>)=3.6873 lnW=19.22 M=3.184e-2  ->  H >     1436.0 = 4.3671 * z ln^2 z = 2.1589 in exponent of z
//     z= 31 s=3: sqrt(<rho^2>)=4.9738 lnW=22.59 M=2.925e-2  ->  H >     2285.8 = 6.2527 * z ln^2 z = 2.2523 in exponent of z
//     z= 41 s=2.6: sqrt(<rho^2>)=6.6006 lnW=29.64 M=1.927e-2  ->  H >     5273.7 = 9.3272 * z ln^2 z = 2.3079 in exponent of z
//     z= 47 s=2.6: sqrt(<rho^2>)=7.6239 lnW=37.11 M=1.575e-2  ->  H >     8340.4 = 11.9712 * z ln^2 z = 2.3451 in exponent of z
// DONE 184.9s
// ============================================================================
// READINGS
// ============================================================================
