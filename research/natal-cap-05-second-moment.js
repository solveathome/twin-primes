// ============================================================================
// NATAL-CAP 05 — SECOND MOMENT OVER THE SCOUR
// (a finite, two-class Barban–Davenport–Halberstam analog for the Grain)
// (2026-08-14, attack 5 of the natal-cap series)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation). This file is the
// origin of the strike-variance "anchored calm" sighting. Its later history:
//   - CONFIRMED and sharpened against the exact full-rotation control:
//     natal-cap-13-anchored-calm.js reading 2(a) — anchored VR rank 2 of
//     510,510 at @17. This is the ONE calm sighting of four that survived.
//   - MECHANISM PROVEN: natal-cap-19-calm-lemma.md (the anchor's two strike
//     windows are mirror-adjacent and FUSE into one cyclic window), with the
//     exact −1/2 anticorrelation constant in natal-cap-26-minus-half.md.
//   - INTUITION REFUTED: natal-cap-31-calm-vs-kill.md — calm does NOT
//     concentrate survivors (corr(VR,S) ≈ 0). The survivor fluctuation is
//     97% overlap-credit X, a channel VR cannot see. Read reading 1 below
//     as a statement about strike variance only, never about survival.
// ============================================================================
// SETTING. Tile @x, width W = x#. Natal@5 set N_x = { r ∈ [0,W) : r ≡ 11 or
// 17 (mod 30), r mod p ∉ {0, p−2} for every prime 7 ≤ p ≤ x }.  |N_x| = N =
// 90, 990, 14850 at x = 11, 13, 17. Scour primes q ∈ (x, √W]. Prime q strikes
// r ≡ 0 or −2 (mod q);  gross(q) = # natal slots struck (with multiplicity
// across q's, i.e. NOT the fresh-march count).
//
// BASELINE (exact, not a heuristic). Rotate the strike classes: for a mod q
// let G_a = #{ r ∈ N_x : r ≡ a or a−2 (mod q) }. Every r lies in exactly two
// rotations (a = r and a = r+2 mod q), so
//         Σ_{a mod q} G_a = 2N          EXACTLY, for every q coprime to W.
// Hence the rotation-ensemble mean is E₀(q) = 2N/q exactly — no floor fudge:
// the floor corrections cancel over the ensemble. We define
//         dev(q) = gross(q) − 2N/q = G₀ − 2N/q.
// (The floor-corrected alternative δ·|T_q|, δ = N/W, |T_q| = # strike
//  positions in [0,W), differs from 2N/q by < 2δ ≈ 0.06 — reported below.)
//
// WHY A DEVIATION EXISTS AT ALL. Over the FULL joint period [0, qW) the count
// is exactly 2N by CRT (q is coprime to every pattern modulus) — zero
// deviation, identically. dev(q) is purely an INCOMPLETENESS phenomenon: the
// window [0,W) is a 1/q-slice of the joint period, and q ∤ W. This is the
// precise finite analog of the variance of primes in progressions.
//
// THE EXACT SECOND-MOMENT IDENTITY (two-class BDH, finite form — provable).
// Let n_c = #{r ∈ N_x : r ≡ c mod q} and C(d) = #{(r,r') ∈ N_x² : r'−r = d}
// (the linear pair-correlation of the natal set; C(0) = N, C symmetric).
// Expanding G_a = n_a + n_{a−2} and counting which rotations strike a pair:
//   Σ_a (G_a − 2N/q)²  =  2·Σ_{d≡0 (q)} C(d)  +  2·Σ_{d≡2 (q)} C(d)  −  4N²/q
// (sums over ALL integers d, |d| < W; d ≡ 2 (q) covers ±2 by symmetry).
// This is a finite counting identity — rigorous, and verified below to fp
// precision at every level. It is the analog of Montgomery's opening move in
// the Barban–Davenport–Halberstam asymptotic: variance over classes = sum of
// correlations at lags ≡ 0 (and here ±2) mod q.
//   Classical mirror: Barban (1964), Davenport–Halberstam (1966):
//   Σ_{q≤Q} Σ_a (ψ(x;q,a) − x/φ(q))² ≪ Qx log x;  Montgomery (1970) and
//   Hooley (1975) made it an asymptotic ~ Qx log Q. Montgomery–Soundararajan
//   (2004) is the short-interval/singular-series version. All of those are
//   about the primes (unconditioned or on GRH); OURS is over a finite
//   deterministic CRT pattern, so the class-averaged identity is EXACT.
//
// THE ONE HEURISTIC STEP. The cyclic correlation factors by CRT, exactly:
//   C_cyc(d) := C(d) + C(W−d) = W·j(d),   j(d) = (ρ₃₀(d)/30)·∏_{7≤p≤x} ρ_p(d)/p,
//   ρ₃₀ = 2, 1, 1, 0 for d ≡ 0, 6, 24, else (mod 30);
//   ρ_p  = p−2 if p|d;  p−3 if d ≡ ±2 (p);  p−4 otherwise.
// But the identity needs the LINEAR C(d), and lags d = kq do not close under
// the wrap d ↔ W−d (W−kq ≢ 0 mod q since q ∤ W — this is the precise spot
// where exactness stops). We predict C(d) ≈ (1 − |d|/W)·W·j(d)
// (stationarity across the window) and measure the damage.
//
// WHAT THIS SCRIPT DOES, per level x = 11, 13, 17:
//   1. gross(q), dev(q) for every scour prime; the empirical law q·dev²/N.
//   2. V = Σ_q dev(q)² vs Vrot = Σ_q VarRot(q) (exact ensemble variance, from
//      residue buckets) vs Vcrt = Σ_q VarCRT(q) (the j-product prediction).
//      Identity check: bucket VarRot == pair-correlation form (via the full
//      difference histogram of N_x) — must match exactly.
//   3. Typicality of OUR rotation (a = 0): z²(q) = dev²/VarRot statistics.
//   4. COROLLARY hunting: to kill every natal slot the Scour needs
//      Σ_q gross(q) ≥ N (union bound), i.e. Σ dev(q) ≥ R := N·(1 − 2Σ 1/q).
//      Cauchy–Schwarz caps Σ dev ≤ √(#q · V). Tabulate R vs the cap vs the
//      direct sums, √V vs max|dev|, the Δ-overshoot counts V/Δ², and the
//      survivor ledger (expected N·∏(1−2/q) vs actual fresh-march).
//
// HONEST QUESTION. Is the second moment of the Scour small enough, and
// provable enough, to CERTIFY survivors — and at which levels does that
// budget argument structurally die?
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const fmt=(v,d=2)=>v.toFixed(d);

function runLevel(x){
  const t0=Date.now();
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);

  // build Natal@5 set
  const A=new Uint8Array(W);
  for(let r=11;r<W;r+=30)A[r]=1;
  for(let r=17;r<W;r+=30)A[r]=1;
  for(const p of basePs){
    for(let j=0;j<W;j+=p)A[j]=0;
    for(let j=p-2;j<W;j+=p)A[j]=0;
  }
  const rho=[]; for(let r=0;r<W;r++) if(A[r]) rho.push(r);
  const N=rho.length, delta=N/W;

  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x && q*q<=W);
  console.log(`\n===== @${x}: W=${W}  N=${N}  scour q in (${x}, ${Math.floor(Math.sqrt(W))}]: ${qs.length} primes (${qs[0]}..${qs[qs.length-1]}) =====`);

  // exact CRT cyclic correlation density j(d)
  const j=(d)=>{
    const m30=((d%30)+30)%30;
    let f = m30===0 ? 2/30 : (m30===6||m30===24) ? 1/30 : 0;
    if(f===0) return 0;
    for(const p of basePs){
      const m=((d%p)+p)%p;
      f *= m===0 ? (p-2)/p : (m===2||m===p-2) ? (p-3)/p : (p-4)/p;
    }
    return f;
  };

  // full linear difference histogram: H[d] = C(d) for d>0 (C(0)=N)
  const H=new Int32Array(W);
  for(let i=0;i<N;i++){const ri=rho[i];for(let k=i+1;k<N;k++)H[rho[k]-ri]++;}

  // CRT sanity: C(d)+C(W−d) == W·j(d), sampled lags (a rigorous theorem — must hold exactly)
  let crtOK=true;
  for(const d of [6,12,24,30,36,90,210,2310,8,100].filter(d=>d<W)){
    const lhs=H[d]+H[W-d], rhs=W*j(d);
    if(Math.abs(lhs-rhs)>1e-6){crtOK=false;console.log(`  CRT CHECK FAIL d=${d}: C(d)+C(W-d)=${lhs} vs W*j(d)=${rhs}`);}
  }
  console.log(`  cyclic CRT check C(d)+C(W-d)=W*j(d) (10 sampled lags): ${crtOK?'PASS (exact)':'FAIL'}`);

  console.log('   q  | gross |  E0=2N/q | dev     | q*dev^2/N | VarRot  | VarCRT  | z^2=dev^2/VarRot');
  let V=0,Vrot=0,Vcrt=0,sumDev=0,sumGross=0,sumInvQ=0,maxAbsDev=0,maxIdErr=0,maxBaseDiff=0;
  let sumZ2=0,maxZ2=0,cntZ2gt4=0,meanIdOK=true,lawRotSum=0,lawCrtSum=0;
  const devs=[];
  for(const q of qs){
    // residue buckets
    const n=new Int32Array(q);
    for(let i=0;i<N;i++)n[rho[i]%q]++;
    const mu=2*N/q;
    const G0=n[0]+n[q-2];
    const dev=G0-mu;
    // exact ensemble: mean identity + rotation variance
    let sumG=0,ss=0;
    for(let a=0;a<q;a++){const Ga=n[a]+n[(a+q-2)%q];sumG+=Ga;const e=Ga-mu;ss+=e*e;}
    if(sumG!==2*N){meanIdOK=false;console.log(`  MEAN IDENTITY FAIL q=${q}: sum_a G_a=${sumG} != 2N`);}
    const varRot=ss/q;
    // pair-correlation form of the same variance (the exact identity)
    let S0=N,S2=0;
    for(let d=q;d<W;d+=q)S0+=2*H[d];
    for(let d=2;d<W;d+=q)S2+=H[d];
    for(let d=q-2;d<W;d+=q)S2+=H[d];
    const varPair=(2*S0+2*S2)/q-mu*mu;
    maxIdErr=Math.max(maxIdErr,Math.abs(varPair-varRot));
    // CRT prediction: C(d) ≈ (1−|d|/W)·W·j(d)
    let S0c=N,S2c=0;
    for(let d=q;d<W;d+=q)S0c+=2*(W-d)*j(d);
    for(let d=2;d<W;d+=q)S2c+=(W-d)*j(d);
    for(let d=q-2;d<W;d+=q)S2c+=(W-d)*j(d);
    const varCRT=(2*S0c+2*S2c)/q-mu*mu;
    // floor-corrected alt baseline (difference is negligible; verified)
    const M0=Math.floor((W-1)/q)+1, M2=Math.floor((W-1-(q-2))/q)+1;
    maxBaseDiff=Math.max(maxBaseDiff,Math.abs(delta*(M0+M2)-mu));

    const z2=dev*dev/varRot;
    V+=dev*dev;Vrot+=varRot;Vcrt+=varCRT;sumDev+=dev;sumGross+=G0;sumInvQ+=1/q;
    maxAbsDev=Math.max(maxAbsDev,Math.abs(dev));
    sumZ2+=z2;maxZ2=Math.max(maxZ2,z2);if(z2>4)cntZ2gt4++;
    lawRotSum+=q*varRot/N;lawCrtSum+=q*varCRT/N;
    devs.push({q,dev});
    console.log(` ${String(q).padStart(4)} | ${String(G0).padStart(5)} | ${fmt(mu,3).padStart(8)} | ${(dev>=0?'+':'')+fmt(dev,3)} | ${fmt(q*dev*dev/N,3).padStart(9)} | ${fmt(varRot,3).padStart(7)} | ${fmt(varCRT,3).padStart(7)} | ${fmt(z2,2)}`);
  }
  const nq=qs.length;
  console.log(`  identities: mean Σ_a G_a = 2N for all q: ${meanIdOK?'PASS (exact integers)':'FAIL'};  pair-form == bucket VarRot: max|err| = ${maxIdErr.toExponential(1)}`);
  console.log(`  baseline: max_q |δ·|T_q| − 2N/q| = ${maxBaseDiff.toExponential(2)}  (floor-corrected vs rotation-mean: negligible, as claimed)`);
  console.log(`  SECOND MOMENT: V = Σ dev² = ${fmt(V,2)}   Vrot = Σ VarRot = ${fmt(Vrot,2)}   Vcrt = Σ VarCRT = ${fmt(Vcrt,2)}`);
  console.log(`     ratios: V/Vrot = ${fmt(V/Vrot,3)}  (chi²-type fluctuation, ${nq} dof → ±${fmt(Math.sqrt(2/nq),2)});   Vrot/Vcrt = ${fmt(Vrot/Vcrt,4)}`);
  const lawEmp=devs.reduce((a,o)=>a+o.q*o.dev*o.dev/N,0)/nq;
  console.log(`  LAW: mean q·dev²/N = ${fmt(lawEmp,3)}   mean q·VarRot/N = ${fmt(lawRotSum/nq,3)}   mean q·VarCRT/N = ${fmt(lawCrtSum/nq,3)}`);
  console.log(`  z² of the anchored rotation (a=0): mean = ${fmt(sumZ2/nq,2)}   max = ${fmt(maxZ2,2)}   #{z²>4} = ${cntZ2gt4}/${nq}`);

  // ---- corollary block ----
  const H2=2*sumInvQ, R=N*(1-H2), CS=Math.sqrt(nq*V);
  let prodSurv=1; for(const q of qs)prodSurv*=(1-2/q);
  // fresh march for the actual survivor count
  const alive=new Set(rho);
  for(const q of qs){for(const r of [...alive])if(r%q===0||(r+2)%q===0)alive.delete(r);}
  console.log(`  COROLLARY (gross strike budget):`);
  console.log(`     Σ1/q = ${fmt(sumInvQ,4)}   H = 2Σ1/q = ${fmt(H2,4)}   ΣE0 = 2N·Σ1/q = ${fmt(2*N*sumInvQ,1)}   N = ${N}`);
  console.log(`     Σ gross = ${sumGross}   Σ dev = ${(sumDev>=0?'+':'')}${fmt(sumDev,2)}`);
  console.log(`     required overshoot R = N(1−H) = ${fmt(R,1)}   Cauchy–Schwarz cap √(#q·V) = ${fmt(CS,1)}   ${R>0?(CS<R?'CAP < R: SURVIVAL CERTIFIED BY V ALONE':'cap ≥ R: V alone does not certify (but see Σ gross directly)'):'R ≤ 0: UNION BOUND VACUOUS at this level'}`);
  console.log(`     direct: Σ gross ${sumGross<N?'<':'≥'} N  →  ${sumGross<N?`unconditional survival certificate: ≥ ${N-sumGross} natal slots CANNOT be struck at all`:'no certificate from gross counting'}`);
  console.log(`     single-prime cap √V = ${fmt(Math.sqrt(V),2)}   max|dev| observed = ${fmt(maxAbsDev,2)}`);
  for(const D of [3,5,10]) console.log(`     #{q: |dev|≥${D}} ≤ V/Δ² = ${fmt(V/(D*D),1)};  actual = ${devs.filter(o=>Math.abs(o.dev)>=D).length}`);
  console.log(`     survivors: expected N·∏(1−2/q) = ${fmt(N*prodSurv,1)}   actual fresh-march = ${alive.size}`);
  console.log(`  [level time ${(Date.now()-t0)/1000}s]  law(empirical mean q·dev²/N) = ${fmt(lawEmp,3)}`);
  return {x,W,N,nq,V,Vrot,Vcrt,lawEmp,H2,R,CS,sumGross,sumDev,surv:alive.size,exp:N*prodSurv};
}

const res=[];
for(const x of [11,13,17]) res.push(runLevel(x));

console.log('\n===== CROSS-LEVEL SUMMARY =====');
console.log('  x  |  N    | #q  |    V     |   Vrot   |   Vcrt   | V/Vrot | Vrot/Vcrt | law c | H=2Σ1/q |   R    | CS cap | Σgross | N');
for(const r of res)
  console.log(` ${String(r.x).padStart(2)} | ${String(r.N).padStart(5)} | ${String(r.nq).padStart(3)} | ${fmt(r.V,1).padStart(8)} | ${fmt(r.Vrot,1).padStart(8)} | ${fmt(r.Vcrt,1).padStart(8)} | ${fmt(r.V/r.Vrot,2).padStart(5)}  | ${fmt(r.Vrot/r.Vcrt,4).padStart(8)}  | ${fmt(r.lawEmp,2)} | ${fmt(r.H2,3).padStart(6)}  | ${fmt(r.R,0).padStart(5)}  | ${fmt(r.CS,0).padStart(5)}  | ${String(r.sumGross).padStart(6)} | ${r.N}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-05-second-moment.js
//   invocation:  node research/natal-cap-05-second-moment.js
//   code-sha256: 18024a52edbde3f2222b022d44cac57a70c016ce529ebf3f74fcda22421a70c1
//   out-sha256:  f00837399743fd939a7e37198575689033539341f23c7ccc86a86eb4cc8f7639
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.3 s
// ============================================================================
//
// ===== @11: W=2310  N=90  scour q in (11, 48]: 10 primes (13..47) =====
//   cyclic CRT check C(d)+C(W-d)=W*j(d) (10 sampled lags): PASS (exact)
//    q  | gross |  E0=2N/q | dev     | q*dev^2/N | VarRot  | VarCRT  | z^2=dev^2/VarRot
//    13 |    13 |   13.846 | -0.846 |     0.103 |   1.515 |   1.783 | 0.47
//    17 |    10 |   10.588 | -0.588 |     0.065 |   0.713 |   1.128 | 0.49
//    19 |    10 |    9.474 | +0.526 |     0.058 |   2.670 |   3.461 | 0.10
//    23 |     8 |    7.826 | +0.174 |     0.008 |   0.578 |   1.134 | 0.05
//    29 |     7 |    6.207 | +0.793 |     0.203 |   1.337 |   1.295 | 0.47
//    31 |     6 |    5.806 | +0.194 |     0.013 |   1.382 |   1.520 | 0.03
//    37 |     4 |    4.865 | -0.865 |     0.308 |   1.144 |   0.869 | 0.65
//    41 |     5 |    4.390 | +0.610 |     0.169 |   1.848 |   2.056 | 0.20
//    43 |     5 |    4.186 | +0.814 |     0.317 |   2.291 |   2.252 | 0.29
//    47 |     5 |    3.830 | +1.170 |     0.715 |   1.588 |   1.362 | 0.86
//   identities: mean Σ_a G_a = 2N for all q: PASS (exact integers);  pair-form == bucket VarRot: max|err| = 2.1e-14
//   baseline: max_q |δ·|T_q| − 2N/q| = 2.98e-2  (floor-corrected vs rotation-mean: negligible, as claimed)
//   SECOND MOMENT: V = Σ dev² = 5.19   Vrot = Σ VarRot = 15.07   Vcrt = Σ VarCRT = 16.86
//      ratios: V/Vrot = 0.344  (chi²-type fluctuation, 10 dof → ±0.45);   Vrot/Vcrt = 0.8935
//   LAW: mean q·dev²/N = 0.196   mean q·VarRot/N = 0.521   mean q·VarCRT/N = 0.551
//   z² of the anchored rotation (a=0): mean = 0.36   max = 0.86   #{z²>4} = 0/10
//   COROLLARY (gross strike budget):
//      Σ1/q = 0.3945   H = 2Σ1/q = 0.7891   ΣE0 = 2N·Σ1/q = 71.0   N = 90
//      Σ gross = 73   Σ dev = +1.98
//      required overshoot R = N(1−H) = 19.0   Cauchy–Schwarz cap √(#q·V) = 7.2   CAP < R: SURVIVAL CERTIFIED BY V ALONE
//      direct: Σ gross < N  →  unconditional survival certificate: ≥ 17 natal slots CANNOT be struck at all
//      single-prime cap √V = 2.28   max|dev| observed = 1.17
//      #{q: |dev|≥3} ≤ V/Δ² = 0.6;  actual = 0
//      #{q: |dev|≥5} ≤ V/Δ² = 0.2;  actual = 0
//      #{q: |dev|≥10} ≤ V/Δ² = 0.1;  actual = 0
//      survivors: expected N·∏(1−2/q) = 39.3   actual fresh-march = 45
//   [level time 0.004s]  law(empirical mean q·dev²/N) = 0.196
//
// ===== @13: W=30030  N=990  scour q in (13, 173]: 34 primes (17..173) =====
//   cyclic CRT check C(d)+C(W-d)=W*j(d) (10 sampled lags): PASS (exact)
//    q  | gross |  E0=2N/q | dev     | q*dev^2/N | VarRot  | VarCRT  | z^2=dev^2/VarRot
//    17 |   115 |  116.471 | -1.471 |     0.037 |   7.190 |   5.678 | 0.30
//    19 |   102 |  104.211 | -2.211 |     0.094 |   5.850 |   5.231 | 0.84
//    23 |    87 |   86.087 | +0.913 |     0.019 |   3.123 |   6.381 | 0.27
//    29 |    65 |   68.276 | -3.276 |     0.314 |   4.338 |   5.534 | 2.47
//    31 |    61 |   63.871 | -2.871 |     0.258 |   4.499 |   4.031 | 1.83
//    37 |    53 |   53.514 | -0.514 |     0.010 |   2.953 |   2.418 | 0.09
//    41 |    50 |   48.293 | +1.707 |     0.121 |   4.158 |   4.750 | 0.70
//    43 |    48 |   46.047 | +1.953 |     0.166 |   6.230 |   7.244 | 0.61
//    47 |    43 |   42.128 | +0.872 |     0.036 |   6.069 |   7.797 | 0.13
//    53 |    38 |   37.358 | +0.642 |     0.022 |   5.022 |   4.316 | 0.08
//    59 |    34 |   33.559 | +0.441 |     0.012 |   6.518 |   7.400 | 0.03
//    61 |    33 |   32.459 | +0.541 |     0.018 |   2.871 |   2.754 | 0.10
//    67 |    30 |   29.552 | +0.448 |     0.014 |   1.949 |   2.491 | 0.10
//    71 |    29 |   27.887 | +1.113 |     0.089 |   2.156 |   2.012 | 0.57
//    73 |    24 |   27.123 | -3.123 |     0.719 |   2.656 |   2.398 | 3.67
//    79 |    26 |   25.063 | +0.937 |     0.070 |   1.781 |   3.863 | 0.49
//    83 |    23 |   23.855 | -0.855 |     0.061 |   2.027 |   2.325 | 0.36
//    89 |    22 |   22.247 | -0.247 |     0.005 |   1.916 |   2.853 | 0.03
//    97 |    19 |   20.412 | -1.412 |     0.195 |   5.789 |   5.683 | 0.34
//   101 |    20 |   19.604 | +0.396 |     0.016 |   4.081 |   3.168 | 0.04
//   103 |    20 |   19.223 | +0.777 |     0.063 |   3.688 |   3.111 | 0.16
//   107 |    20 |   18.505 | +1.495 |     0.242 |   1.820 |   2.315 | 1.23
//   109 |    17 |   18.165 | -1.165 |     0.149 |   1.789 |   1.903 | 0.76
//   113 |    15 |   17.522 | -2.522 |     0.726 |   3.966 |   4.453 | 1.60
//   127 |    16 |   15.591 | +0.409 |     0.022 |   2.462 |   3.075 | 0.07
//   131 |    15 |   15.115 | -0.115 |     0.002 |   3.002 |   2.645 | 0.00
//   137 |    14 |   14.453 | -0.453 |     0.028 |   3.401 |   3.285 | 0.06
//   139 |    14 |   14.245 | -0.245 |     0.008 |   3.091 |   3.298 | 0.02
//   149 |    14 |   13.289 | +0.711 |     0.076 |   2.702 |   2.553 | 0.19
//   151 |    14 |   13.113 | +0.887 |     0.120 |   3.001 |   2.447 | 0.26
//   157 |    14 |   12.611 | +1.389 |     0.306 |   1.766 |   1.737 | 1.09
//   163 |    15 |   12.147 | +2.853 |     1.340 |   2.481 |   2.775 | 3.28
//   167 |    13 |   11.856 | +1.144 |     0.221 |   3.512 |   3.658 | 0.37
//   173 |    12 |   11.445 | +0.555 |     0.054 |   1.715 |   1.817 | 0.18
//   identities: mean Σ_a G_a = 2N for all q: PASS (exact integers);  pair-form == bucket VarRot: max|err| = 2.5e-12
//   baseline: max_q |δ·|T_q| − 2N/q| = 3.02e-2  (floor-corrected vs rotation-mean: negligible, as claimed)
//   SECOND MOMENT: V = Σ dev² = 74.51   Vrot = Σ VarRot = 119.58   Vcrt = Σ VarCRT = 127.40
//      ratios: V/Vrot = 0.623  (chi²-type fluctuation, 34 dof → ±0.24);   Vrot/Vcrt = 0.9386
//   LAW: mean q·dev²/N = 0.166   mean q·VarRot/N = 0.279   mean q·VarCRT/N = 0.293
//   z² of the anchored rotation (a=0): mean = 0.66   max = 3.67   #{z²>4} = 0/34
//   COROLLARY (gross strike budget):
//      Σ1/q = 0.5734   H = 2Σ1/q = 1.1468   ΣE0 = 2N·Σ1/q = 1135.3   N = 990
//      Σ gross = 1135   Σ dev = -0.30
//      required overshoot R = N(1−H) = -145.3   Cauchy–Schwarz cap √(#q·V) = 50.3   R ≤ 0: UNION BOUND VACUOUS at this level
//      direct: Σ gross ≥ N  →  no certificate from gross counting
//      single-prime cap √V = 8.63   max|dev| observed = 3.28
//      #{q: |dev|≥3} ≤ V/Δ² = 8.3;  actual = 2
//      #{q: |dev|≥5} ≤ V/Δ² = 3.0;  actual = 0
//      #{q: |dev|≥10} ≤ V/Δ² = 0.7;  actual = 0
//      survivors: expected N·∏(1−2/q) = 304.3   actual fresh-march = 307
//   [level time 0.015s]  law(empirical mean q·dev²/N) = 0.166
//
// ===== @17: W=510510  N=14850  scour q in (17, 714]: 120 primes (19..709) =====
//   cyclic CRT check C(d)+C(W-d)=W*j(d) (10 sampled lags): PASS (exact)
//    q  | gross |  E0=2N/q | dev     | q*dev^2/N | VarRot  | VarCRT  | z^2=dev^2/VarRot
//    19 |  1563 | 1563.158 | -0.158 |     0.000 |  41.712 |  22.029 | 0.00
//    23 |  1292 | 1291.304 | +0.696 |     0.001 |   6.125 |   8.786 | 0.08
//    29 |  1027 | 1024.138 | +2.862 |     0.016 |  25.843 |  19.198 | 0.32
//    31 |   960 |  958.065 | +1.935 |     0.008 |   5.351 |   6.042 | 0.70
//    37 |   805 |  802.703 | +2.297 |     0.013 |   5.776 |   6.434 | 0.91
//    41 |   725 |  724.390 | +0.610 |     0.001 |   8.482 |  11.291 | 0.04
//    43 |   691 |  690.698 | +0.302 |     0.000 |  11.141 |  11.723 | 0.01
//    47 |   626 |  631.915 | -5.915 |     0.111 |  23.737 |  13.898 | 1.47
//    53 |   559 |  560.377 | -1.377 |     0.007 |  13.254 |  10.351 | 0.14
//    59 |   497 |  503.390 | -6.390 |     0.162 |  38.984 |  36.108 | 1.05
//    61 |   488 |  486.885 | +1.115 |     0.005 |   8.266 |  10.315 | 0.15
//    67 |   441 |  443.284 | -2.284 |     0.024 |   5.039 |   6.620 | 1.03
//    71 |   418 |  418.310 | -0.310 |     0.000 |   9.003 |  10.208 | 0.01
//    73 |   410 |  406.849 | +3.151 |     0.049 |  17.635 |  16.074 | 0.56
//    79 |   378 |  375.949 | +2.051 |     0.022 |  10.630 |  11.340 | 0.40
//    83 |   362 |  357.831 | +4.169 |     0.097 |   6.743 |   8.597 | 2.58
//    89 |   331 |  333.708 | -2.708 |     0.044 |  12.364 |  11.917 | 0.59
//    97 |   307 |  306.186 | +0.814 |     0.004 |   7.203 |   7.817 | 0.09
//   101 |   296 |  294.059 | +1.941 |     0.026 |  14.907 |  13.990 | 0.25
//   103 |   287 |  288.350 | -1.350 |     0.013 |   8.693 |   8.333 | 0.21
//   107 |   275 |  277.570 | -2.570 |     0.048 |   9.572 |  10.966 | 0.69
//   109 |   275 |  272.477 | +2.523 |     0.047 |   8.305 |   8.181 | 0.77
//   113 |   263 |  262.832 | +0.168 |     0.000 |  15.609 |  16.283 | 0.00
//   127 |   233 |  233.858 | -0.858 |     0.006 |   9.413 |   8.898 | 0.08
//   131 |   225 |  226.718 | -1.718 |     0.026 |   6.187 |   6.278 | 0.48
//   137 |   216 |  216.788 | -0.788 |     0.006 |  11.276 |   9.645 | 0.06
//   139 |   213 |  213.669 | -0.669 |     0.004 |   7.516 |   6.730 | 0.06
//   149 |   198 |  199.329 | -1.329 |     0.018 |   7.778 |   8.192 | 0.23
//   151 |   196 |  196.689 | -0.689 |     0.005 |   6.572 |   9.120 | 0.07
//   157 |   187 |  189.172 | -2.172 |     0.050 |  10.639 |  10.933 | 0.44
//   163 |   184 |  182.209 | +1.791 |     0.035 |  15.417 |  16.355 | 0.21
//   167 |   183 |  177.844 | +5.156 |     0.299 |  14.084 |  12.381 | 1.89
//   173 |   172 |  171.676 | +0.324 |     0.001 |   9.259 |   8.556 | 0.01
//   179 |   166 |  165.922 | +0.078 |     0.000 |   4.742 |   4.048 | 0.00
//   181 |   166 |  164.088 | +1.912 |     0.045 |   7.826 |   7.647 | 0.47
//   191 |   156 |  155.497 | +0.503 |     0.003 |   8.480 |   7.324 | 0.03
//   193 |   150 |  153.886 | -3.886 |     0.196 |  13.925 |  13.070 | 1.08
//   197 |   153 |  150.761 | +2.239 |     0.066 |   6.060 |   5.828 | 0.83
//   199 |   145 |  149.246 | -4.246 |     0.242 |   6.226 |   5.504 | 2.90
//   211 |   142 |  140.758 | +1.242 |     0.022 |   9.359 |   7.118 | 0.16
//   223 |   134 |  133.184 | +0.816 |     0.010 |   7.711 |   8.159 | 0.09
//   227 |   130 |  130.837 | -0.837 |     0.011 |   6.639 |   6.182 | 0.11
//   229 |   128 |  129.694 | -1.694 |     0.044 |  14.029 |  13.779 | 0.20
//   233 |   129 |  127.468 | +1.532 |     0.037 |  14.541 |  15.040 | 0.16
//   239 |   126 |  124.268 | +1.732 |     0.048 |  11.970 |  11.353 | 0.25
//   241 |   124 |  123.237 | +0.763 |     0.009 |   6.761 |   7.876 | 0.09
//   251 |   119 |  118.327 | +0.673 |     0.008 |   6.204 |   5.486 | 0.07
//   257 |   113 |  115.564 | -2.564 |     0.114 |  17.833 |  17.032 | 0.37
//   263 |   112 |  112.928 | -0.928 |     0.015 |   6.143 |   6.812 | 0.14
//   269 |   111 |  110.409 | +0.591 |     0.006 |   9.245 |   9.962 | 0.04
//   271 |   111 |  109.594 | +1.406 |     0.036 |   9.127 |   9.206 | 0.22
//   277 |   105 |  107.220 | -2.220 |     0.092 |   7.753 |   7.850 | 0.64
//   281 |   103 |  105.694 | -2.694 |     0.137 |   8.518 |   9.077 | 0.85
//   283 |   103 |  104.947 | -1.947 |     0.072 |  11.089 |   9.859 | 0.34
//   293 |    99 |  101.365 | -2.365 |     0.110 |   6.389 |   8.169 | 0.88
//   307 |    97 |   96.743 | +0.257 |     0.001 |   6.856 |   6.232 | 0.01
//   311 |    93 |   95.498 | -2.498 |     0.131 |   9.684 |  10.722 | 0.64
//   313 |    92 |   94.888 | -2.888 |     0.176 |  15.505 |  14.825 | 0.54
//   317 |    89 |   93.691 | -4.691 |     0.470 |  13.923 |  14.284 | 1.58
//   331 |    89 |   89.728 | -0.728 |     0.012 |  11.032 |  11.160 | 0.05
//   337 |    89 |   88.131 | +0.869 |     0.017 |   4.214 |   4.967 | 0.18
//   347 |    82 |   85.591 | -3.591 |     0.301 |  11.642 |  11.594 | 1.11
//   349 |    82 |   85.100 | -3.100 |     0.226 |   7.294 |   8.138 | 1.32
//   353 |    82 |   84.136 | -2.136 |     0.108 |   4.304 |   4.327 | 1.06
//   359 |    82 |   82.730 | -0.730 |     0.013 |  15.462 |  16.587 | 0.03
//   367 |    83 |   80.926 | +2.074 |     0.106 |  12.777 |  11.621 | 0.34
//   373 |    77 |   79.625 | -2.625 |     0.173 |   7.929 |   8.151 | 0.87
//   379 |    79 |   78.364 | +0.636 |     0.010 |   6.812 |   6.429 | 0.06
//   383 |    81 |   77.546 | +3.454 |     0.308 |  17.245 |  17.289 | 0.69
//   389 |    77 |   76.350 | +0.650 |     0.011 |   4.490 |   4.730 | 0.09
//   397 |    75 |   74.811 | +0.189 |     0.001 |  15.861 |  15.454 | 0.00
//   401 |    76 |   74.065 | +1.935 |     0.101 |   7.228 |   6.616 | 0.52
//   409 |    71 |   72.616 | -1.616 |     0.072 |   6.804 |   6.552 | 0.38
//   419 |    70 |   70.883 | -0.883 |     0.022 |   8.304 |   8.812 | 0.09
//   421 |    69 |   70.546 | -1.546 |     0.068 |   6.728 |   6.216 | 0.36
//   431 |    70 |   68.910 | +1.090 |     0.035 |   4.950 |   5.280 | 0.24
//   433 |    65 |   68.591 | -3.591 |     0.376 |   9.517 |   9.065 | 1.36
//   439 |    72 |   67.654 | +4.346 |     0.558 |  11.429 |  11.212 | 1.65
//   443 |    67 |   67.043 | -0.043 |     0.000 |  10.163 |  10.289 | 0.00
//   449 |    63 |   66.147 | -3.147 |     0.299 |  14.802 |  14.604 | 0.67
//   457 |    65 |   64.989 | +0.011 |     0.000 |   6.041 |   6.601 | 0.00
//   461 |    65 |   64.425 | +0.575 |     0.010 |  10.986 |  11.268 | 0.03
//   463 |    65 |   64.147 | +0.853 |     0.023 |   9.045 |   9.171 | 0.08
//   467 |    59 |   63.597 | -4.597 |     0.665 |   6.155 |   6.378 | 3.43
//   479 |    60 |   62.004 | -2.004 |     0.130 |   4.864 |   5.174 | 0.83
//   487 |    59 |   60.986 | -1.986 |     0.129 |   7.957 |   7.799 | 0.50
//   491 |    61 |   60.489 | +0.511 |     0.009 |  11.728 |  11.205 | 0.02
//   499 |    64 |   59.519 | +4.481 |     0.675 |   5.640 |   5.282 | 3.56
//   503 |    60 |   59.046 | +0.954 |     0.031 |   5.857 |   6.019 | 0.16
//   509 |    59 |   58.350 | +0.650 |     0.014 |   8.455 |   8.925 | 0.05
//   521 |    58 |   57.006 | +0.994 |     0.035 |   8.724 |   8.681 | 0.11
//   523 |    54 |   56.788 | -2.788 |     0.274 |   9.678 |   9.096 | 0.80
//   541 |    56 |   54.898 | +1.102 |     0.044 |   6.934 |   6.629 | 0.18
//   547 |    53 |   54.296 | -1.296 |     0.062 |   5.196 |   5.344 | 0.32
//   557 |    54 |   53.321 | +0.679 |     0.017 |   5.206 |   5.602 | 0.09
//   563 |    53 |   52.753 | +0.247 |     0.002 |   5.159 |   4.806 | 0.01
//   569 |    51 |   52.197 | -1.197 |     0.055 |   5.793 |   6.385 | 0.25
//   571 |    52 |   52.014 | -0.014 |     0.000 |   6.623 |   6.410 | 0.00
//   577 |    52 |   51.473 | +0.527 |     0.011 |   5.837 |   5.512 | 0.05
//   587 |    53 |   50.596 | +2.404 |     0.228 |   5.106 |   4.913 | 1.13
//   593 |    51 |   50.084 | +0.916 |     0.033 |  10.354 |  10.205 | 0.08
//   599 |    46 |   49.583 | -3.583 |     0.518 |   5.879 |   6.306 | 2.18
//   601 |    46 |   49.418 | -3.418 |     0.473 |   9.105 |   9.298 | 1.28
//   607 |    47 |   48.929 | -1.929 |     0.152 |  13.558 |  13.595 | 0.27
//   613 |    47 |   48.450 | -1.450 |     0.087 |   4.708 |   4.630 | 0.45
//   617 |    47 |   48.136 | -1.136 |     0.054 |   5.469 |   5.423 | 0.24
//   619 |    47 |   47.981 | -0.981 |     0.040 |   5.786 |   5.460 | 0.17
//   631 |    40 |   47.068 | -7.068 |     2.123 |  13.414 |  12.984 | 3.72
//   641 |    46 |   46.334 | -0.334 |     0.005 |   6.718 |   6.413 | 0.02
//   643 |    46 |   46.190 | -0.190 |     0.002 |   6.409 |   6.656 | 0.01
//   647 |    46 |   45.904 | +0.096 |     0.000 |   5.509 |   5.417 | 0.00
//   653 |    49 |   45.482 | +3.518 |     0.544 |   4.850 |   4.826 | 2.55
//   659 |    41 |   45.068 | -4.068 |     0.734 |  10.756 |  10.495 | 1.54
//   661 |    45 |   44.932 | +0.068 |     0.000 |   4.106 |   4.266 | 0.00
//   673 |    45 |   44.131 | +0.869 |     0.034 |   9.139 |   9.002 | 0.08
//   677 |    44 |   43.870 | +0.130 |     0.001 |   4.973 |   4.826 | 0.00
//   683 |    42 |   43.485 | -1.485 |     0.101 |   7.986 |   8.565 | 0.28
//   691 |    39 |   42.981 | -3.981 |     0.738 |   8.615 |   8.547 | 1.84
//   701 |    43 |   42.368 | +0.632 |     0.019 |   3.807 |   3.960 | 0.10
//   709 |    42 |   41.890 | +0.110 |     0.001 |   4.239 |   4.264 | 0.00
//   identities: mean Σ_a G_a = 2N for all q: PASS (exact integers);  pair-form == bucket VarRot: max|err| = 1.3e-10
//   baseline: max_q |δ·|T_q| − 2N/q| = 2.87e-2  (floor-corrected vs rotation-mean: negligible, as claimed)
//   SECOND MOMENT: V = Σ dev² = 632.84   Vrot = Σ VarRot = 1144.40   Vcrt = Σ VarCRT = 1111.47
//      ratios: V/Vrot = 0.553  (chi²-type fluctuation, 120 dof → ±0.13);   Vrot/Vcrt = 1.0296
//   LAW: mean q·dev²/N = 0.118   mean q·VarRot/N = 0.191   mean q·VarCRT/N = 0.190
//   z² of the anchored rotation (a=0): mean = 0.55   max = 3.72   #{z²>4} = 0/120
//   COROLLARY (gross strike budget):
//      Σ1/q = 0.7469   H = 2Σ1/q = 1.4938   ΣE0 = 2N·Σ1/q = 22182.8   N = 14850
//      Σ gross = 22132   Σ dev = -50.76
//      required overshoot R = N(1−H) = -7332.8   Cauchy–Schwarz cap √(#q·V) = 275.6   R ≤ 0: UNION BOUND VACUOUS at this level
//      direct: Σ gross ≥ N  →  no certificate from gross counting
//      single-prime cap √V = 25.16   max|dev| observed = 7.07
//      #{q: |dev|≥3} ≤ V/Δ² = 70.3;  actual = 22
//      #{q: |dev|≥5} ≤ V/Δ² = 25.3;  actual = 4
//      #{q: |dev|≥10} ≤ V/Δ² = 6.3;  actual = 0
//      survivors: expected N·∏(1−2/q) = 3245.5   actual fresh-march = 3099
//   [level time 0.247s]  law(empirical mean q·dev²/N) = 0.118
//
// ===== CROSS-LEVEL SUMMARY =====
//   x  |  N    | #q  |    V     |   Vrot   |   Vcrt   | V/Vrot | Vrot/Vcrt | law c | H=2Σ1/q |   R    | CS cap | Σgross | N
//  11 |    90 |  10 |      5.2 |     15.1 |     16.9 |  0.34  |   0.8935  | 0.20 |  0.789  |    19  |     7  |     73 | 90
//  13 |   990 |  34 |     74.5 |    119.6 |    127.4 |  0.62  |   0.9386  | 0.17 |  1.147  |  -145  |    50  |   1135 | 990
//  17 | 14850 | 120 |    632.8 |   1144.4 |   1111.5 |  0.55  |   1.0296  | 0.12 |  1.494  | -7333  |   276  |  22132 | 14850
// ============================================================================
// READINGS.
// 1. THE BASELINE IS A THEOREM, NOT A CHOICE. Σ_{a mod q} G_a = 2N held as
//    exact integers for all 164 scour primes across the three levels (each
//    natal slot lies in exactly two rotations). So E₀(q) = 2N/q is the EXACT
//    mean of the q-rotation ensemble — the floor corrections cancel over the
//    ensemble (and the floor-corrected alternative never differs by more than
//    0.03). dev(q) is deviation from an exact mean, no "-ish" left in it.
// 2. THE FINITE TWO-CLASS BDH IDENTITY HOLDS EXACTLY (verified to 1e-9 at
//    every level): q·VarRot(q) + 4N²/q = 2Σ_{d≡0(q)} C(d) + 2Σ_{d≡2(q)} C(d).
//    Honest calibration: the PROOF is elementary double counting (which
//    rotations strike a given pair) — the value is not depth but EXACTNESS.
//    The classical mirrors are asymptotic and hard-won: Barban (1964) and
//    Davenport–Halberstam (1966) bound Σ_{q≤Q} Σ_a (ψ(x;q,a) − x/φ(q))², and
//    Montgomery (1970), Hooley (1975) turn it into ~ Qx·log Q; Montgomery–
//    Soundararajan (2004) is the short-interval twin. Over our finite
//    deterministic CRT pattern the class-averaged second moment is an exact
//    finite identity — a clean "theorem candidate" statement for the
//    two-class (twin-strike) case, but it should be sold as a finite analog,
//    not as new machinery.
// 3. WHERE RIGOR STOPS — measured. The only non-rigorous step in evaluating
//    the identity in closed form is linear-vs-cyclic: C(d) ≈ (1−|d|/W)·W·j(d),
//    needed because lags kq do not close under the wrap d ↔ W−d (q ∤ W —
//    that is the exact spot the CRT product argument breaks). Damage report:
//    summed over the scour it is small and shrinking — Vrot/Vcrt = 0.894,
//    0.939, 1.030 at @11, @13, @17. Per single prime it can miss by ~2x at
//    the small-q end (q=19 @17: VarRot 41.7 vs VarCRT 22.0). So: exact
//    identity + a ≤3%-error closed-form evaluation at @17, error concentrated
//    in the few smallest q.
// 4. THE EMPIRICAL LAW: dev² and VarRot both scale as N/q, but the constant
//    FALLS with level: q·VarRot/N ≈ 0.52 / 0.28 / 0.19 (and q·dev²/N = 0.20 /
//    0.17 / 0.12) at x = 11 / 13 / 17. In Fano form VarRot/E₀ ≈ 0.26 / 0.14 /
//    0.10: the Scour's strike counts are 4–10x SUB-POISSON, deepening with x
//    — same suppression family as the window variance in 06-variance-theorem
//    (0.17–0.25) — because each added pattern prime multiplies generic pair
//    weight by (p−4)p/(p−2)² < 1. Refutation of the naive guess: there is no
//    level-independent constant c with Σ dev² ≈ c·N·Σ1/q; c(x) decays, and 3
//    levels are too few to pin its law. Open item.
// 5. ANCHORED QUIETNESS (unexpected, real, unexplained). The actual Scour
//    (rotation a=0) is consistently CALMER than its own ensemble: V/Vrot =
//    0.34, 0.62, 0.55; mean z² = 0.36, 0.66, 0.55; and NO prime out of 164
//    reaches z² > 4 (Gaussian devs would give ~7). If devs were Gaussian
//    draws from the ensemble, V/Vrot = 0.55 at 120 dof sits ≈ 3.4σ low.
//    The anchored window hugs 2N/q even tighter than the exact variance
//    theorem requires — anchored head-bias in a new guise (cf.
//    attack-02-head-bias.js: the origin is the enriched, safest place).
//    Measured, not explained; discreteness may eat part of the 3.4σ.
// 6. COROLLARY — THE BUDGET ARGUMENT LIVES AT @11 AND DIES AT @13, FOR A
//    STRUCTURAL REASON. At @11: required overshoot R = N(1 − 2Σ1/q) = 19.0,
//    and even the theory-only cap √(#q·Vcrt) = 13.0 < 19 (a-priori, modulo
//    reading-3's heuristic), the actual cap √(#q·V) = 7.2, and directly
//    Σ gross = 73 < 90: at least 17 natal slots are never struck at all — a
//    rigorous (finite computation) survival certificate for the 11-tile.
//    At @13 already H = 2Σ_{x<q≤√W} 1/q = 1.147 > 1 (and 1.494 at @17): the
//    baseline budget ΣE₀ EXCEEDS N, the union bound is vacuous, and indeed
//    Σ gross = 22132 > 14850 at @17. The route dies not because deviations
//    grow — they stay tiny (max|dev| = 7.1 against √V = 25.2; Σ dev = −50.8,
//    a 0.23% net deficit) — but because H ~ 2·ln(ln W/(2 ln x)) → ∞. Beyond
//    @11 the Scour has strictly more strikes than slots; survivors exist
//    because strikes OVERLAP (at @17: 22132 − (14850−3099) = 10381 strikes,
//    47%, land on already-dead slots). First and second moments of gross are
//    blind to overlap; overlap is inclusion–exclusion — the parity wall,
//    met again from the budget side. The second moment certifies REGULARITY
//    (the Scour cannot conspire: ≤ V/Δ² primes overshoot by Δ, verified with
//    room to spare at all levels), but it structurally cannot certify
//    survival past @11.
// 7. NEXT STEP. The object whose second moment actually controls survival is
//    the FRESH-removal cascade fresh(q) ≈ (2/q)·alive(q⁻) — a multiplicative
//    martingale, not a sum; its concentration (variance of ∏(1−2/q̂) along
//    the march) is the honest continuation. Independently, reading 5
//    (anchored quietness) deserves its own attack: is dev(a=0) provably
//    suppressed by the head structure of the tile?
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.8935 -> the 0.894 of reading 3, the @11 Vrot/Vcrt.
//   0.9386 -> the 0.939 of reading 3, the @13 Vrot/Vcrt. The third value in
//     that list, 1.030, is the printed @17 ratio 1.0296.
//   25.16 -> the 25.2 of reading 6, the @17 single-prime cap sqrt(V).
//   -50.76 -> the -50.8 of reading 6, the @17 Sigma dev.
//
// CORRECTED 2026-08-20 (mismatch adjudication #43): reading 2's "verified to
//   1e-10 at every level" is now 1e-9. The three printed pair-form vs bucket
//   VarRot identity errors are 2.1e-14 at @11, 2.5e-12 at @13 and 1.3e-10 at
//   @17, so the old figure was the largest of the three rounded DOWN, and the
//   @17 level sat above the threshold the reading claimed for every level.
//   1e-9 is the uniform statement the block supports. Old -> new: 1e-10 ->
//   1e-9. The identity is exact double counting; these are float residuals, so
//   nothing about the claim moves -- only what "verified to" is allowed to say.
//
// DERIVED IN THIS READING by arithmetic over printed values: 10381 in reading
//   6 is the overlap count, and the reading shows the subtraction. The printed
//   Sigma gross at @17 is 22132, N is 14850 and survivors are 3099, so
//   22132 - 11751 is 10381, and 10381/22132 is the 47 percent that follows.
// ---------------------------------------------------------------------------
