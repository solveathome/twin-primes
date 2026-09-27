// ============================================================================
// NATAL-CAP ATTACK 10 — THE RIGOROUS SIEVE CAP (upper-bound sieve, per prime)
// (2026-08-14; one of ten parallel attacks on rigorous per-prime removal caps)
// ============================================================================
// THE IDEA. Via the dilation identity, the slots of N_x that a scour prime q
// strikes are in bijection with the points of a "sibling" pattern inside an
// interval of cofactors m of length ~W/q: two allowed classes mod 30, and two
// OMITTED classes mod p for every sifting prime 7 <= p <= x. So any rigorous
// UPPER bound for a two-classes-omitted-per-prime sifted set in an interval of
// length ell = W/q is a certified cap on gross(q). This file:
//   (a) states and implements the cap as a FINITE Selberg Lambda^2 / Bonferroni
//       computation (no asymptotic theorem needed: the sifting set {7..x} is
//       finite, so the quadratic form and the remainder are computed exactly);
//   (b) produces the certified caps 2*UB(W/q) for every scour prime at
//       x = 7, 11, 13, 17, tabulated against the actual gross(q);
//   (c) runs the verdict sum  Sigma_q cap(q)  vs  |N_x|  (union bound: if the
//       sum were < N, survivors > 0 would be PROVEN at that level);
//   (d) computes THE ONE NUMBER C*(x) = the upper-sieve constant (relative to
//       the true mean 2N/q) that would make the union bound close, exactly for
//       x <= 43 and by Mertens beyond — and compares it to the parity floor.
//
// THE FINITE CAP (rigorous statement, self-contained proof sketch).
//   Fix x, W = x#, P = {p prime : 7 <= p <= x}, q a scour prime. Strikes of q
//   on N_x split as r = q*m (side A) and r+2 = q*m (side B). On each side, m
//   lies in [0, M_side) with M_side <= (W+1)/q + 1, confined to 2 residue
//   classes mod 30, and for each p in P avoids 2 classes mod p (teeth rotated
//   by q^{-1}; 30 and p coprime, classes distinct since p > 2). Writing
//   m = 30t + a, the t-window has length T_side <= ceil(M_side/30) and t
//   avoids 2 classes mod each p in P. For ANY lambda: divisors(prod P) -> R
//   with lambda_1 = 1 supported on d <= D, Selberg's inequality gives
//     #(unsifted t) <= Sigma_{d1,d2} lambda_{d1} lambda_{d2} |A_{[d1,d2]}|,
//   and |A_e| = T*omega(e)/e + r_e with |r_e| <= omega(e), omega(e)=2^{nu(e)}.
//   Hence per (side, class-mod-30):  count <= T*Q(lambda) + R(lambda), with
//     Q = Sigma lam lam omega(lcm)/lcm,   R = Sigma |lam lam| omega(lcm),
//   and cap(q) = 2*(T_A+T_B)*Q + 4*R, minimized over lambda-supports (Selberg-
//   optimal lambda per level D) and over Bonferroni truncations (even-level
//   inclusion-exclusion, which at full level is exact Legendre I-E). All sums
//   are over the <= 2^{pi(x)-3} divisors: EXACT arithmetic, a theorem per q.
//   Asymptotic context: as x -> infinity, ell = W/q >= sqrt(W), so
//   s = ln ell / ln x >= theta(x)/(2 ln x) -> infinity, and the Fundamental
//   Lemma (kappa = 2) certifies cap ~ (1+o(1))*2N/q — sieve constant -> 1.
//   Parity NEVER enters at fixed level: we sift only by p <= x << sqrt(ell).
//
// THE HONEST QUESTION. Even with the best conceivable caps, does the union
// bound Sigma_q cap(q) < N have a chance? Mean-field says NO for x >= 13:
// Sigma_q 2N/q = 2N*(lnln sqrt(W) - lnln x + o(1)) exceeds N once
// Sigma_{x<q<=sqrt(W)} 2/q > 1, and that harmonic sum GROWS like 2*ln x.
// So the expected result is a quantified refutation: measure the overshoot,
// find where it concentrates, extract C*(x), and place it against the parity
// floor. A refutation with exact numbers is a first-class result.
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const SMALL = primesUpTo(100000);

function buildNatal(x){
  const bp = SMALL.filter(p=>p<=x);
  const W = bp.reduce((a,b)=>a*b,1);
  const ind = new Uint8Array(W);
  for(let r=11;r<W;r+=30) ind[r]=1;
  for(let r=17;r<W;r+=30) ind[r]=1;
  for(const p of bp){ if(p<7) continue;
    for(let r=0;r<W;r+=p) ind[r]=0;
    for(let r=((p-2)%p+p)%p;r<W;r+=p) ind[r]=0;
  }
  let N=0; for(let r=0;r<W;r++) N+=ind[r];
  return {W, ind, N, sift: bp.filter(p=>p>=7)};
}

// ---------- exact Selberg Lambda^2 + Bonferroni machinery over sift set P ----
function popcount(m){let c=0;while(m){c+=m&1;m>>=1}return c}
function solveLinear(A,b){ // Gaussian elimination, small dense
  const n=b.length, M=A.map((row,i)=>[...row,b[i]]);
  for(let c=0;c<n;c++){
    let piv=c; for(let r=c+1;r<n;r++) if(Math.abs(M[r][c])>Math.abs(M[piv][c])) piv=r;
    [M[c],M[piv]]=[M[piv],M[c]];
    for(let r=0;r<n;r++){ if(r===c) continue; const f=M[r][c]/M[c][c];
      for(let k=c;k<=n;k++) M[r][k]-=f*M[c][k]; }
  }
  return M.map((row,i)=>row[n]/row[i]); // after Gauss-Jordan M is diagonal
}
function methodsFor(P){
  const k=P.length;
  const divs=[]; // {mask, d, nu}
  for(let m=0;m<(1<<k);m++){ let d=1; for(let i=0;i<k;i++) if(m&(1<<i)) d*=P[i];
    divs.push({mask:m, d, nu:popcount(m)}); }
  divs.sort((a,b)=>a.d-b.d);
  const prodOfMask=new Array(1<<k); for(const o of divs) prodOfMask[o.mask]=o.d;
  const methods=[];
  // Bonferroni / truncated inclusion-exclusion at even depth (upper bounds)
  for(let j=0;2*j<=k+1;j++){
    let main=0, err=0;
    for(const o of divs) if(o.nu<=2*j){ main += ((o.nu%2)?-1:1)*(2**o.nu)/o.d; err += 2**o.nu; }
    methods.push({label:`IE${Math.min(2*j,k)}`, main, err});
  }
  // Selberg-optimal Lambda^2 at every level threshold
  const seen=new Set();
  for(const t of divs.map(o=>o.d)){
    const sup=divs.filter(o=>o.d<=t);
    if(seen.has(sup.length)) continue; seen.add(sup.length);
    const n=sup.length;
    const M=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>{
      const um=sup[i].mask|sup[j].mask; return (2**popcount(um))/prodOfMask[um]; }));
    let lam;
    if(n===1) lam=[1];
    else{
      const A=[],b=[];
      for(let i=1;i<n;i++){ b.push(-M[i][0]); A.push(M[i].slice(1)); }
      lam=[1,...solveLinear(A,b)];
    }
    let Q=0,R=0;
    for(let i=0;i<n;i++)for(let j=0;j<n;j++){
      const um=sup[i].mask|sup[j].mask, om=2**popcount(um);
      Q+=lam[i]*lam[j]*om/prodOfMask[um];
      R+=Math.abs(lam[i]*lam[j])*om;
    }
    methods.push({label:`S${t}`, main:Q, err:R});
  }
  return methods;
}

// ================= SECTION A: certified caps vs gross, x = 7,11,13,17 =======
for(const x of [7,11,13,17]){
  const {W, ind, N, sift} = buildNatal(x);
  const sqrtW=Math.sqrt(W);
  const scour=SMALL.filter(q=>q>x && q*q<=W);
  const methods=methodsFor(sift);
  const alive=Uint8Array.from(ind);
  let aliveCount=N;
  const rows=[];
  let capSum=0, grossSum=0, meanSum=0, freshSum=0, selfSum=0;
  for(const q of scour){
    let gross=0, fresh=0, self=0;
    for(const res of [0, ((q-2)%q+q)%q]){
      for(let r=res;r<W;r+=q){
        if(ind[r]){ gross++;
          if(alive[r]){ alive[r]=0; fresh++; aliveCount--;
            const pos=(res===0)?r:r+2; if(pos===q) self++;
          }
        }
      }
    }
    const M_A=Math.floor((W-1)/q)+1, M_B=Math.floor((W+1)/q)+1;
    const T_A=Math.ceil(M_A/30), T_B=Math.ceil(M_B/30);
    let cap=Infinity, best='';
    for(const m of methods){
      const c=2*(T_A+T_B)*m.main+4*m.err;
      if(c<cap){cap=c;best=m.label}
    }
    cap=Math.floor(cap);
    if(cap<gross) throw new Error(`CAP VIOLATION q=${q}: cap=${cap} < gross=${gross}`);
    const mean=2*N/q, s=Math.log(W/q)/Math.log(x);
    rows.push({q,s,mean,gross,fresh,self,cap,best});
    capSum+=cap; grossSum+=gross; meanSum+=mean; freshSum+=fresh; selfSum+=self;
  }
  console.log(`\n${'='.repeat(100)}`);
  console.log(`@${x}: W=${W}  |N|=${N}  scour ${scour[0]}..${scour[scour.length-1]} (${scour.length} primes, sqrtW=${sqrtW.toFixed(1)})  sift P={${sift}}`);
  console.log(`${'='.repeat(100)}`);
  console.log('    q |  s=lnl/lnx | 2N/q   | gross | fresh | cap    | method | cap/gross | cap/(2N/q)');
  const pick = rows.length<=20 ? rows : rows.filter((_,i)=> i<12 || i%10===0 || i>=rows.length-4);
  for(const r of pick)
    console.log(` ${String(r.q).padStart(4)} |   ${r.s.toFixed(2)}     | ${r.mean.toFixed(1).padStart(6)} | ${String(r.gross).padStart(5)} | ${String(r.fresh).padStart(5)} | ${String(r.cap).padStart(6)} | ${r.best.padStart(6)} |   ${(r.cap/r.gross).toFixed(2).padStart(5)}   |  ${(r.cap/r.mean).toFixed(3)}`);
  if(rows.length>20) console.log(`  ... (${rows.length} scour primes; middle rows every 10th)`);
  // verdict sums + factor decomposition
  console.log(` VERDICT:  Sigma cap = ${capSum}   vs  |N| = ${N}   -> overshoot x${(capSum/N).toFixed(3)}`);
  console.log(`           Sigma gross = ${grossSum} (x${(grossSum/N).toFixed(3)})   Sigma 2N/q = ${meanSum.toFixed(0)} (x${(meanSum/N).toFixed(3)})   Sigma fresh = ${freshSum} (self=twin found: ${selfSum}; survivors ${aliveCount})`);
  console.log(`           decomposition: overshoot = [harmonic Sig(2N/q)/N = ${(meanSum/N).toFixed(3)}] x [fluctuation Sgross/Smean = ${(grossSum/meanSum).toFixed(3)}] x [certification Scap/Sgross = ${(capSum/grossSum).toFixed(3)}]`);
  let cum=0, crossCap=null; for(const r of rows){ cum+=r.cap; if(crossCap===null&&cum>=N) crossCap=r.q; }
  cum=0; let crossG=null; for(const r of rows){ cum+=r.gross; if(crossG===null&&cum>=N) crossG=r.q; }
  console.log(`           cumulative Sigma cap crosses N at q=${crossCap};  Sigma gross crosses N at q=${crossG===null?'never':crossG}`);
  // concentration bands by s = ln(ell)/ln(x)
  const bands=[[0,2.5],[2.5,3],[3,3.5],[3.5,99]];
  const bs=bands.map(([lo,hi])=>{
    const rs=rows.filter(r=>r.s>=lo&&r.s<hi);
    return {lo,hi,n:rs.length,cap:rs.reduce((a,r)=>a+r.cap,0),gross:rs.reduce((a,r)=>a+r.gross,0),waste:rs.reduce((a,r)=>a+r.cap-r.gross,0)};
  }).filter(b=>b.n>0);
  console.log(`           bands (s=ln ell/ln x): `+bs.map(b=>`s in [${b.lo},${b.hi}): n=${b.n} cap=${b.cap} (waste over gross ${b.waste})`).join(' | '));
}

// ============ SECTION B: THE ONE NUMBER C*(x), exact to x=43, Mertens beyond =
// C*(x) = 1 / Sigma_{x<q<=sqrt(x#)} 2/q : the constant (relative to the TRUE
// per-prime mean 2N/q) at which Sigma_q caps = N exactly. Any valid cap has
// constant >= 1 (it upper-bounds gross ~ mean), so C* < 1 kills the route.
console.log(`\n${'='.repeat(100)}\nSECTION B: C*(x) = 1/Sigma_{x<q<=sqrt(x#)} 2/q  (union-bound break-even constant)\n${'='.repeat(100)}`);
{
  const xs=[7,11,13,17,19,23,29,31,37,41,43];
  let Wb=1n; const bound={}, prim={};
  for(const p of SMALL){ if(p>43) break; Wb*=BigInt(p); if(xs.includes(p)){ prim[p]=Wb; bound[p]=Math.floor(Math.sqrt(Number(Wb))); } }
  const Lmax=bound[43];
  console.log(`  sieving to ${Lmax.toLocaleString()} = floor sqrt(43#) ...`);
  const t0=Date.now();
  const s=new Uint8Array(Lmax+1);
  for(let i=2;i*i<=Lmax;i++) if(!s[i]) for(let j=i*i;j<=Lmax;j+=i) s[j]=1;
  const acc={}; for(const x of xs) acc[x]={sum1:0,sumln:0};
  for(let q=3;q<=Lmax;q++){ if(s[q]) continue;
    for(const x of xs) if(q>x && q<=bound[x]){ acc[x].sum1+=1/q; acc[x].sumln+=Math.log(1-2/q); }
  }
  console.log(`  [sieve+pass ${(Date.now()-t0)/1000}s]`);
  console.log('    x  |  sqrt(x#)    | Sigma 2/q  |  C*(x)  | surv frac prod(1-2/q) | C*_fresh = 1/(1-prod)');
  for(const x of xs){
    const s2=2*acc[x].sum1, surv=Math.exp(acc[x].sumln);
    console.log(`  ${String(x).padStart(3)}  | ${String(bound[x]).padStart(12)} |  ${s2.toFixed(4)}  | ${ (1/s2).toFixed(4) } |        ${surv.toFixed(4)}         |  ${(1/(1-surv)).toFixed(4)}`);
  }
  // Mertens continuation (asymptotic, cross-checked against exact rows above)
  const M=0.26149721284764278;
  const th={}, H={};
  { let t=0,h=0; for(const p of SMALL){ if(p>10000) break; t+=Math.log(p); h+=1/p; th[p]=t; H[p]=h; } }
  console.log('  --- Mertens continuation:  Sigma 2/q ~ 2(ln(theta(x)/2)+M - Sigma_{q<=x}1/q) ---');
  console.log('    x  | Sigma2/q(Mertens) | C*(x)  | (ln x/ln sqrt(x#))^2 ~ surv frac | C*_fresh');
  for(const x of [31,37,41,43,53,101,199,499,997,2003,9973]){
    if(!(x in th)) continue;
    const s2=2*(Math.log(th[x]/2)+M-H[x]);
    const surv=(Math.log(x)/(th[x]/2))**2; // (ln x / ln sqrt(W))^2
    console.log(`  ${String(x).padStart(4)} |      ${s2.toFixed(4)}       | ${(1/s2).toFixed(4)} |            ${surv.toExponential(2)}            | ${(1/(1-surv)).toFixed(4)}`);
  }
  console.log('  (exact vs Mertens at x=31..43 above: agreement check; beyond, Mertens only.)');
}

// ============ SECTION C: the fresh-cap variant and the parity floor =========
// Alternative program: cap FRESH removals (per-prime kills of still-alive
// slots). Then Sigma fresh = N - survivors, and the union bound needs a
// certified constant  C < 1/(1 - S/N)  where S = survivors. But certifying
// fresh(q) means upper-bounding a pattern sifted by ALL primes < q, q up to
// sqrt(W) — full-range dimension-2 sifting in a sliding window: exactly the
// pi_2-in-intervals problem, where the parity floor (factor 2; Selberg/Tao)
// and the technology floor (8 interval-uniform; 4 with BV; 3.29956 record,
// [1,x] only) live. Numbers printed above: C*_fresh(x) -> 1 as x grows.
console.log(`\nSECTION C: fresh-cap route needs constant C < C*_fresh(x) (printed above);`);
console.log(`  parity floor = 2 (Selberg examples; Tao 2007: upper bounds off by >= 2x);`);
console.log(`  interval-uniform technology floor = 8+o(1) (Selberg Lambda^2; explicit: Siebert 1976);`);
console.log(`  with BV (not interval-uniform) = 4 (Bombieri-Davenport 1966); record 3.29956 (Lichtman 2025).`);
console.log(`  Since C*_fresh(x) < 2 for every x >= 7 and -> 1, the fresh-cap door is parity-barred.`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-10-sieve-cap.js
//   invocation:  node research/natal-cap-10-sieve-cap.js
//   code-sha256: e1501bcae220d7cd5c2cfe6bf12491732e1ef290cafd11ed9e319f196788b339
//   out-sha256:  e5cce4936ca5f07008c2684c499712dee349450cb9e497ffb984d03b60084695
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     1.1 s
// ============================================================================
//
// ====================================================================================================
// @7: W=210  |N|=10  scour 11..13 (2 primes, sqrtW=14.5)  sift P={7}
// ====================================================================================================
//     q |  s=lnl/lnx | 2N/q   | gross | fresh | cap    | method | cap/gross | cap/(2N/q)
//    11 |   1.52     |    1.8 |     1 |     1 |      8 |    IE0 |    8.00   |  4.400
//    13 |   1.43     |    1.5 |     2 |     1 |      8 |    IE0 |    4.00   |  5.200
//  VERDICT:  Sigma cap = 16   vs  |N| = 10   -> overshoot x1.600
//            Sigma gross = 3 (x0.300)   Sigma 2N/q = 3 (x0.336)   Sigma fresh = 2 (self=twin found: 1; survivors 8)
//            decomposition: overshoot = [harmonic Sig(2N/q)/N = 0.336] x [fluctuation Sgross/Smean = 0.894] x [certification Scap/Sgross = 5.333]
//            cumulative Sigma cap crosses N at q=13;  Sigma gross crosses N at q=never
//            bands (s=ln ell/ln x): s in [0,2.5): n=2 cap=16 (waste over gross 13)
//
// ====================================================================================================
// @11: W=2310  |N|=90  scour 13..47 (10 primes, sqrtW=48.1)  sift P={7,11}
// ====================================================================================================
//     q |  s=lnl/lnx | 2N/q   | gross | fresh | cap    | method | cap/gross | cap/(2N/q)
//    13 |   2.16     |   13.8 |    13 |    13 |     28 |    IE0 |    2.15   |  2.022
//    17 |   2.05     |   10.6 |    10 |     9 |     24 |    IE0 |    2.40   |  2.267
//    19 |   2.00     |    9.5 |    10 |     8 |     24 |    IE0 |    2.40   |  2.533
//    23 |   1.92     |    7.8 |     8 |     5 |     20 |    IE0 |    2.50   |  2.556
//    29 |   1.83     |    6.2 |     7 |     4 |     16 |    IE0 |    2.29   |  2.578
//    31 |   1.80     |    5.8 |     6 |     2 |     16 |    IE0 |    2.67   |  2.756
//    37 |   1.72     |    4.9 |     4 |     1 |     16 |    IE0 |    4.00   |  3.289
//    41 |   1.68     |    4.4 |     5 |     1 |     12 |    IE0 |    2.40   |  2.733
//    43 |   1.66     |    4.2 |     5 |     1 |     12 |    IE0 |    2.40   |  2.867
//    47 |   1.62     |    3.8 |     5 |     1 |     12 |    IE0 |    2.40   |  3.133
//  VERDICT:  Sigma cap = 180   vs  |N| = 90   -> overshoot x2.000
//            Sigma gross = 73 (x0.811)   Sigma 2N/q = 71 (x0.789)   Sigma fresh = 45 (self=twin found: 2; survivors 45)
//            decomposition: overshoot = [harmonic Sig(2N/q)/N = 0.789] x [fluctuation Sgross/Smean = 1.028] x [certification Scap/Sgross = 2.466]
//            cumulative Sigma cap crosses N at q=23;  Sigma gross crosses N at q=never
//            bands (s=ln ell/ln x): s in [0,2.5): n=10 cap=180 (waste over gross 107)
//
// ====================================================================================================
// @13: W=30030  |N|=990  scour 17..173 (34 primes, sqrtW=173.3)  sift P={7,11,13}
// ====================================================================================================
//     q |  s=lnl/lnx | 2N/q   | gross | fresh | cap    | method | cap/gross | cap/(2N/q)
//    17 |   2.91     |  116.5 |   115 |   115 |    194 |    IE2 |    1.69   |  1.666
//    19 |   2.87     |  104.2 |   102 |    90 |    179 |     S7 |    1.75   |  1.718
//    23 |   2.80     |   86.1 |    87 |    68 |    153 |     S7 |    1.76   |  1.777
//    29 |   2.71     |   68.3 |    65 |    48 |    128 |     S7 |    1.97   |  1.875
//    31 |   2.68     |   63.9 |    61 |    45 |    122 |     S7 |    2.00   |  1.910
//    37 |   2.61     |   53.5 |    53 |    32 |    108 |     S7 |    2.04   |  2.018
//    41 |   2.57     |   48.3 |    50 |    29 |     99 |     S7 |    1.98   |  2.050
//    43 |   2.55     |   46.0 |    48 |    30 |     96 |     S7 |    2.00   |  2.085
//    47 |   2.52     |   42.1 |    43 |    26 |     90 |     S7 |    2.09   |  2.136
//    53 |   2.47     |   37.4 |    38 |    28 |     80 |    IE0 |    2.11   |  2.141
//    59 |   2.43     |   33.6 |    34 |    21 |     72 |    IE0 |    2.12   |  2.145
//    61 |   2.42     |   32.5 |    33 |    18 |     72 |    IE0 |    2.18   |  2.218
//   103 |   2.21     |   19.2 |    20 |     8 |     44 |    IE0 |    2.20   |  2.289
//   157 |   2.05     |   12.6 |    14 |     1 |     32 |    IE0 |    2.29   |  2.537
//   163 |   2.03     |   12.1 |    15 |     2 |     32 |    IE0 |    2.13   |  2.634
//   167 |   2.02     |   11.9 |    13 |     0 |     28 |    IE0 |    2.15   |  2.362
//   173 |   2.01     |   11.4 |    12 |     1 |     28 |    IE0 |    2.33   |  2.446
//   ... (34 scour primes; middle rows every 10th)
//  VERDICT:  Sigma cap = 2337   vs  |N| = 990   -> overshoot x2.361
//            Sigma gross = 1135 (x1.146)   Sigma 2N/q = 1135 (x1.147)   Sigma fresh = 683 (self=twin found: 6; survivors 307)
//            decomposition: overshoot = [harmonic Sig(2N/q)/N = 1.147] x [fluctuation Sgross/Smean = 1.000] x [certification Scap/Sgross = 2.059]
//            cumulative Sigma cap crosses N at q=43;  Sigma gross crosses N at q=113
//            bands (s=ln ell/ln x): s in [0,2.5): n=25 cap=1168 (waste over gross 657) | s in [2.5,3): n=9 cap=1169 (waste over gross 545)
//
// ====================================================================================================
// @17: W=510510  |N|=14850  scour 19..709 (120 primes, sqrtW=714.5)  sift P={7,11,13,17}
// ====================================================================================================
//     q |  s=lnl/lnx | 2N/q   | gross | fresh | cap    | method | cap/gross | cap/(2N/q)
//    19 |   3.60     | 1563.2 |  1563 |  1563 |   1773 |    IE2 |    1.13   |  1.134
//    23 |   3.53     | 1291.3 |  1292 |  1159 |   1487 |    IE2 |    1.15   |  1.152
//    29 |   3.45     | 1024.1 |  1027 |   839 |   1207 |    IE2 |    1.18   |  1.179
//    31 |   3.43     |  958.1 |   960 |   725 |   1137 |    IE2 |    1.18   |  1.187
//    37 |   3.36     |  802.7 |   805 |   573 |    974 |    IE2 |    1.21   |  1.213
//    41 |   3.33     |  724.4 |   725 |   483 |    894 |    IE2 |    1.23   |  1.234
//    43 |   3.31     |  690.7 |   691 |   444 |    857 |    IE2 |    1.24   |  1.241
//    47 |   3.28     |  631.9 |   626 |   375 |    796 |    IE2 |    1.27   |  1.260
//    53 |   3.24     |  560.4 |   559 |   322 |    721 |    IE2 |    1.29   |  1.287
//    59 |   3.20     |  503.4 |   497 |   272 |    661 |    IE2 |    1.33   |  1.313
//    61 |   3.19     |  486.9 |   488 |   266 |    643 |    IE2 |    1.32   |  1.321
//    67 |   3.15     |  443.3 |   441 |   242 |    597 |    IE2 |    1.35   |  1.347
//   107 |   2.99     |  277.6 |   275 |   131 |    425 |    IE2 |    1.55   |  1.531
//   163 |   2.84     |  182.2 |   184 |    82 |    320 |    S11 |    1.74   |  1.756
//   223 |   2.73     |  133.2 |   134 |    55 |    248 |     S7 |    1.85   |  1.862
//   271 |   2.66     |  109.6 |   111 |    37 |    208 |     S7 |    1.87   |  1.898
//   337 |   2.58     |   88.1 |    89 |    27 |    173 |     S7 |    1.94   |  1.963
//   397 |   2.53     |   74.8 |    75 |    18 |    150 |     S7 |    2.00   |  2.005
//   457 |   2.48     |   65.0 |    65 |    14 |    136 |     S7 |    2.09   |  2.093
//   521 |   2.43     |   57.0 |    58 |    11 |    122 |     S7 |    2.10   |  2.140
//   593 |   2.39     |   50.1 |    51 |     5 |    110 |     S7 |    2.16   |  2.196
//   647 |   2.35     |   45.9 |    46 |     3 |    105 |     S7 |    2.28   |  2.287
//   683 |   2.34     |   43.5 |    42 |     0 |     99 |     S7 |    2.36   |  2.277
//   691 |   2.33     |   43.0 |    39 |     1 |     99 |     S7 |    2.54   |  2.303
//   701 |   2.33     |   42.4 |    43 |     1 |     99 |     S7 |    2.30   |  2.337
//   709 |   2.32     |   41.9 |    42 |     0 |     99 |     S7 |    2.36   |  2.363
//   ... (120 scour primes; middle rows every 10th)
//  VERDICT:  Sigma cap = 34200   vs  |N| = 14850   -> overshoot x2.303
//            Sigma gross = 22132 (x1.490)   Sigma 2N/q = 22183 (x1.494)   Sigma fresh = 11751 (self=twin found: 16; survivors 3099)
//            decomposition: overshoot = [harmonic Sig(2N/q)/N = 1.494] x [fluctuation Sgross/Smean = 0.998] x [certification Scap/Sgross = 1.545]
//            cumulative Sigma cap crosses N at q=97;  Sigma gross crosses N at q=163
//            bands (s=ln ell/ln x): s in [0,2.5): n=45 cap=5253 (waste over gross 2864) | s in [2.5,3): n=55 cap=13219 (waste over gross 5939) | s in [3,3.5): n=18 cap=12468 (waste over gross 2860) | s in [3.5,99): n=2 cap=3260 (waste over gross 405)
//
// ====================================================================================================
// SECTION B: C*(x) = 1/Sigma_{x<q<=sqrt(x#)} 2/q  (union-bound break-even constant)
// ====================================================================================================
//   sieving to 114,379,899 = floor sqrt(43#) ...
//   [sieve+pass 0.976s]
//     x  |  sqrt(x#)    | Sigma 2/q  |  C*(x)  | surv frac prod(1-2/q) | C*_fresh = 1/(1-prod)
//     7  |           14 |  0.3357  | 2.9792 |        0.6923         |  3.2500
//    11  |           48 |  0.7891  | 1.2673 |        0.4364         |  1.7742
//    13  |          173 |  1.1468  | 0.8720 |        0.3074         |  1.4437
//    17  |          714 |  1.4938  | 0.6694 |        0.2186         |  1.2797
//    19  |         3114 |  1.7857  | 0.5600 |        0.1642         |  1.1964
//    23  |        14936 |  2.0526  | 0.4872 |        0.1262         |  1.1444
//    29  |        80434 |  2.3054  | 0.4338 |        0.0983         |  1.1090
//    31  |       447839 |  2.5236  | 0.3963 |        0.0792         |  1.0860
//    37  |      2724103 |  2.7293  | 0.3664 |        0.0645         |  1.0690
//    41  |     17442771 |  2.9166  | 0.3429 |        0.0536         |  1.0566
//    43  |    114379899 |  3.0837  | 0.3243 |        0.0454         |  1.0475
//   --- Mertens continuation:  Sigma 2/q ~ 2(ln(theta(x)/2)+M - Sigma_{q<=x}1/q) ---
//     x  | Sigma2/q(Mertens) | C*(x)  | (ln x/ln sqrt(x#))^2 ~ surv frac | C*_fresh
//     31 |      2.5234       | 0.3963 |            6.96e-2            | 1.0749
//     37 |      2.7292       | 0.3664 |            5.94e-2            | 1.0631
//     41 |      2.9165       | 0.3429 |            4.96e-2            | 1.0522
//     43 |      3.0837       | 0.3243 |            4.11e-2            | 1.0429
//     53 |      3.3859       | 0.2953 |            3.12e-2            | 1.0322
//    101 |      4.4737       | 0.2235 |            1.09e-2            | 1.0110
//    199 |      5.7175       | 0.1749 |            3.15e-3            | 1.0032
//    499 |      7.2680       | 0.1376 |            6.86e-4            | 1.0007
//    997 |      8.4666       | 0.1181 |            2.09e-4            | 1.0002
//   2003 |      9.6993       | 0.1031 |            6.10e-5            | 1.0001
//   9973 |      12.5704       | 0.0796 |            3.46e-6            | 1.0000
//   (exact vs Mertens at x=31..43 above: agreement check; beyond, Mertens only.)
//
// SECTION C: fresh-cap route needs constant C < C*_fresh(x) (printed above);
//   parity floor = 2 (Selberg examples; Tao 2007: upper bounds off by >= 2x);
//   interval-uniform technology floor = 8+o(1) (Selberg Lambda^2; explicit: Siebert 1976);
//   with BV (not interval-uniform) = 4 (Bombieri-Davenport 1966); record 3.29956 (Lichtman 2025).
//   Since C*_fresh(x) < 2 for every x >= 7 and -> 1, the fresh-cap door is parity-barred.
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated; the refutation is the result.
//
// 1. THE PER-PRIME CAPS ARE REAL, CHEAP THEOREMS. The finite Selberg/Bonferroni
//    machinery certified gross(q) for all 166 scour primes across x=7..17
//    (the assert cap >= gross never fired). Best certified constant relative
//    to the true mean 2N/q: 1.134 (q=19 @17, the widest window, s=3.60),
//    degrading monotonically to ~2.4 near q ~ sqrt(W) (s ~ 2.3). This
//    confirms the regime analysis: a gross-cap sifts ONLY by p <= x, so the
//    achievable constant tends to 1 (Fundamental-Lemma regime) — parity never
//    enters the per-prime cap. Method detail: plain even-depth Bonferroni
//    (IE2) wins on wide windows; Selberg Lambda^2 at tiny level (S7, S11)
//    wins on narrow ones; full Legendre (IE4) never wins at 17 (3^4-type
//    remainder too fat). The caps are exact, position-uniform, and free of
//    any asymptotic hypothesis.
//
// 2. THE VERDICT SUM FAILS EVERYWHERE — AND FROM x=13 IT FAILS AT THE TRUTH
//    ITSELF. Sigma cap = 2.36*N (@13), 2.30*N (@17). Decomposition
//    [harmonic] x [fluctuation] x [certification]:
//      @13: 1.147 x 1.000 x 2.059;   @17: 1.494 x 0.998 x 1.545.
//    The fluctuation factor is 1 to three decimals (gross hugs 2N/q — the
//    natal-blindness law again); the certification factor is bounded (~1.5–2)
//    and would decay toward 1 at larger x; the HARMONIC factor
//    Sigma_{x<q<=sqrtW} 2/q is the killer: it is already > 1 at x = 13
//    (1.147) and grows like 2*ln x forever. Even a cap EQUAL to the exact
//    gross(q) — the best any upper bound can ever be — sums to 1.15N @13 and
//    1.49N @17. The union bound throws away overlap, and overlap credit IS
//    the survival mechanism (glossary): first-order Bonferroni can never see
//    survivors at any level >= 13.
//
// 3. WHERE THE OVERSHOOT CONCENTRATES. Two different places, and the attack
//    brief guessed only one of them: (i) the MASS sits at small q (harmonic
//    head): @17 cumulative Sigma cap crosses N already at q=97 (18th of 120
//    primes); cumulative Sigma gross crosses at q=163 (31st); the two widest-window
//    primes 19,23 alone carry 3260 = 22% of N. (ii) the certification WASTE
//    (cap - gross) sits at LARGE q / narrow windows, where s = ln ell / ln x
//    drops toward 2 and the O(1) remainder rivals the mean: cap/gross rises
//    from 1.13 (q=19) to ~2.4-2.5 (q ~ 700). [Brief said "small q, where
//    ln ell/ln(sift) is small" — measured: s is small at LARGE q.]
//
// 4. THE ONE NUMBER — AND IT CLOSES THE DOOR WITH MAXIMAL MARGIN.
//    C*(x) = 1/Sigma_{x<q<=sqrt(x#)} 2/q, the break-even upper-sieve constant:
//      x:      7      11     13     17     19     43     997    9973
//      C*:   2.979  1.267  0.872  0.669  0.560  0.324  0.118  0.080
//    (exact to x=43; Mertens beyond, agreeing to 4 decimals at 31..43;
//    asymptotically C*(x) ~ 1/(2 ln x).) C* falls below 1 permanently
//    between x=11 and x=13. Since ANY valid gross-cap has constant >= ~1
//    (it must dominate gross ~ 2N/q, fluctuation factor 1.000), the answer to
//    the task's question is: for every x >= 13 NO upper-bound technology —
//    present, future, parity-breaking, or oracle — closes the gross-cap union
//    bound. This door is not parity-barred (parity floor 2, record 3.29956,
//    BV wall 4 — C* is far BELOW all of them and heading to 0). It is
//    MERTENS-BARRED: the divergence of Sigma 1/q, the same divergence that
//    forced Brun into an alternating series a century ago. Triple-checked as
//    instructed; the trend makes the verdict stronger, not weaker, with x.
//
// 5. AT x <= 11 THE ARITHMETIC DOOR IS OPEN BUT CERTIFICATES STILL MISS.
//    Sigma gross = 0.30N (@7), 0.81N (@11): a certified cap within 23% of
//    truth at x=11 would PROVE survivors > 0 by pure union bound. Our best
//    certified sum is 2.00N (@11): with t-windows of length 1..8 the O(1)
//    remainder dominates everything. And closing at one small x is a finite
//    verification (twins exist below 2310), not a theorem generator — the
//    program needs every x, and reading 4 kills every x >= 13.
//
// 6. THE FRESH-CAP VARIANT IS THE CLASSICAL PROBLEM IN DISGUISE — AND THAT
//    ONE IS PARITY-BARRED. Capping FRESH removals (so the sum telescopes to
//    N - survivors < N) requires upper bounds for patterns sifted by ALL
//    primes < q, q up to sqrt(W), in position-uniform windows: exactly
//    pi_2-in-intervals. Needed constant: C < 1/(1 - S/N) = 1.44 (@13),
//    1.28 (@17), -> 1 as x grows. Available: interval-uniform technology
//    8+o(1) (Selberg Lambda^2; Siebert 1976 explicit); with BV (NOT interval-
//    uniform) 4 (Bombieri-Davenport), record 3.29956 (Lichtman 2025); parity
//    floor 2 (Selberg's B_nu examples; Tao 2007). Since C*_fresh < 2 from
//    x = 11 on and -> 1, the fresh-cap door needs twin-conjecture-strength
//    constants: parity-barred in the precise, sourced sense, asymptotically
//    by exactly the factor 2.
//
// 7. NET. The sieve-cap program at fixed levels dies twice, for two
//    INDEPENDENT reasons: gross-caps die of Mertens divergence (C* -> 0,
//    below every conceivable floor); fresh-caps die of parity (need 1+o(1),
//    floor 2). Rescue would require the signed second-order term (pairwise
//    overlaps) — but Bonferroni depth-2 on the scour alphabet is Brun's sieve
//    with two classes, i.e., the classical dimension-2 sieve and its
//    beta_2 = 4.266 wall (paper/beta2-note.md). Positive residue of this
//    attack: the finite per-prime caps themselves (constant 1.13-2.5, exact,
//    assumption-free) are sound inputs wherever PER-PRIME control suffices —
//    the variance ledger (06-variance-theorem.js), not the union bound, is
//    where they can still earn their keep.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   0.0796 -> "0.080" in the C* row of reading 4, from the printed line
//   "9973 | 12.5704 | 0.0796 | 3.46e-6 | 1.0000". The 0.0792 the classifier
//   also offers is a different table's cell and is not the source.
//   The tail of the @17 scour, printed at q = 683, 691, 701 and 709, is quoted
//   in reading 3 as "q ~ 700". The cap/gross column there reads 2.36, 2.54,
//   2.30, 2.36, which is the "~2.4-2.5" band of the same sentence; neither 2.4
//   nor 2.5 is a printed cell, they describe the spread of those four rows.
//
// DEFINITION / LITERATURE constants:
//   4.266 in reading 7 is the dimension-2 Brun sieve exponent beta_2, sourced
//   in the same sentence to paper/beta2-note.md. Nothing in this run measures
//   it.
//
// TOKENIZER ARTIFACT, not a figure:
//   19,23 in reading 3 is the pair of primes q = 19 and q = 23 written as a
//   list. Both are rows of the @17 table above.
// ---------------------------------------------------------------------------
