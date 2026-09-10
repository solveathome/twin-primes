// ============================================================================
// ATTACK 7 — TRAJECTORY CONCENTRATION: the Scour march as a near-martingale
// (natal-cap series, 2026-08-14)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation).
//   - CORRECTED: the ensemble variance used here was superseded by the exact
//     conditional law Var[fresh | past] = (2/q)(D² + R₂), proven in
//     natal-cap-14-discrepancy-lemma.md Lemma 1. Use cap-14's figure.
//   - The e^−311 Freedman ceiling computed here is CONDITIONAL on discrepancy
//     control that is still unproven; it is not a theorem. Reading 6 (the
//     theorem-valid martingale bounds lose to endpoint Chebyshev by 1 to 3
//     orders) stands and is quoted in paper/anchored-note.md §2.
//   - Readings 3 and 4 (the anchored trajectory is 100% drift, not noise)
//     stand, and the drift has since been LOCATED: natal-cap-31-calm-vs-kill.md
//     puts it in the overlap-credit channel X, not in the strike statistics
//     (corr(X,S) = 0.99, corr(VR,S) ≈ 0), and shows it lives in multiplicity
//     m ≥ 3, which pair-based instruments track poorly.
//   - Sighting (d), "smooth drift", was never re-tested against the exact
//     full-rotation control of natal-cap-13-anchored-calm.js.
// ============================================================================
// THE IDEA. The Natal@5 march at level x removes fresh(q) members per scour
// prime q, and fresh(q) hugs (2/q)·alive_before at every step (verified,
// natal5-17tile-scour.txt). Treat the march as a stochastic process: over the
// ROTATION ENSEMBLE — one independent uniform strike class c_q ∈ Z/q per
// scour prime, which by CRT is exactly a uniform rotation of the tile — the
// conditional mean is EXACT:
//        E[ fresh(q) | past ]  =  (2/q) · alive_before,
// because the alive set is fixed by the past and a uniform c_q hits each
// residue-class PAIR {c, c−2} with its exact share. So
//        D_k  =  fresh(q_k) − (2/q_k)·alive_{k−1}
// are genuine martingale increments (Doob decomposition of the alive count),
// and the anchored tile is the single ensemble member c_q ≡ 0 for all q.
//
// QUESTIONS ATTACKED HERE.
//  (1) Recompute the march exactly at x = 11, 13, 17; extract e_q = fresh −
//      (2/q)·alive and two normalizations: z_bin = e/√(binomial var) and
//      z_true = e/√(v_q), where v_q = Var over c of the alive set's
//      pair-class counts mod q — the TRUE ensemble conditional variance.
//  (2) Statistics of {e_q}: drift vs fluctuation, autocorrelation, shape.
//  (3) Envelopes: does the running Σe stay inside ±c·√(Σ cond.var)? Max
//      exceedance c*. Monte-Carlo the ensemble's own c* for comparison.
//  (4) The correct concentration statement and its arithmetic: does the
//      martingale/trajectory view give a BETTER ensemble bound on
//      P(survivors = 0) than the endpoint Chebyshev Var/E²? Compute the
//      theorem-valid McDiarmid and Freedman exponents (worst-case increment
//      bounds d_q = max_c pair-count of the FULL natal set mod q, valid for
//      every ensemble path since alive ⊆ natal) and the "empirical Freedman"
//      ceiling (anchored-path conditional variances — NOT a theorem, an
//      upper bound on what increment control could ever buy).
//  (5) Say plainly what none of this gives for the ANCHORED tile.
//
// HONEST FRAME. The anchored march is DETERMINISTIC. Every probabilistic
// statement below is over the rotation ensemble; anchored numbers are
// measurements of one fixed member, reported as z-scores against ensemble
// moments — descriptive, not probabilistic. Endpoint moments E, Var are the
// exact rotation-ensemble values from natal5-variance.txt (same ensemble).
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const sd=a=>{const m=mean(a);return Math.sqrt(a.reduce((s,v)=>s+(v-m)*(v-m),0)/a.length)};
const skew=a=>{const m=mean(a),s=sd(a);return mean(a.map(v=>((v-m)/s)**3))};
const exkurt=a=>{const m=mean(a),s=sd(a);return mean(a.map(v=>((v-m)/s)**4))-3};
function autocorr(a,lag){const m=mean(a);let num=0,den=0;
  for(let i=0;i<a.length;i++){den+=(a[i]-m)**2;if(i+lag<a.length)num+=(a[i]-m)*(a[i+lag]-m)}
  return num/den;}
function mulberry32(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296}}

// Exact rotation-ensemble endpoint moments (natal5-variance.txt, 2026-08-14):
const EXACT={11:{E:39.27,V:10.06},13:{E:304.28,V:91.13},17:{E:3245.51,V:1060.54}};

function natalSet(x){
  const base=primesUpTo(x), W=base.reduce((a,b)=>a*b,1);
  const bad=new Uint8Array(W);
  for(const q of base){for(let j=0;j<W;j+=q)bad[j]=1;const r2=((q-2)%q+q)%q;for(let j=r2;j<W;j+=q)bad[j]=1;}
  const natal=[];for(let r=0;r<W;r++)if(!bad[r]&&(r%30===11||r%30===17))natal.push(r);
  return {W,natal};
}

// Anchored march with full per-step diagnostics.
function detailMarch(natal,scour){
  let alive=natal.slice();const steps=[];let selfStrikes=0;
  for(const q of scour){
    const hist=new Int32Array(q);
    for(const r of alive)hist[r%q]++;
    const before=alive.length,m=2*before/q;
    let vtrue=0,pmax=0,pmin=Infinity;                 // pair-class count stats over c
    for(let a=0;a<q;a++){
      const pc=hist[a]+hist[(a+q-2)%q];
      vtrue+=(pc-m)*(pc-m);
      if(pc>pmax)pmax=pc;if(pc<pmin)pmin=pc;
    }
    vtrue/=q;
    const fresh=hist[0]+hist[q-2];
    const next=[];
    for(const r of alive){
      if(r%q===0||(r+2)%q===0){if(r===q||r===q-2)selfStrikes++;}
      else next.push(r);
    }
    alive=next;
    steps.push({q,before,fresh,e:fresh-m,vbin:before*(2/q)*(1-2/q),vtrue,
                range:Math.max(pmax-m,m-pmin)});
    if(alive.length!==before-fresh)throw new Error('march bookkeeping');
  }
  return {steps,final:alive.length,selfStrikes};
}

// Monte-Carlo one random-rotation march; returns endpoint and envelope stat.
function mcMarch(natal,scour,rng){
  let alive=natal,cume=0,cumv=0,cstar=0;
  for(const q of scour){
    const a=Math.floor(rng()*q),b=(a+q-2)%q,before=alive.length,next=[];
    let fresh=0;
    for(const r of alive){const m=r%q;if(m===a||m===b)fresh++;else next.push(r);}
    alive=next;
    cume+=fresh-2*before/q;cumv+=before*(2/q)*(1-2/q);
    const c=Math.abs(cume)/Math.sqrt(cumv);if(c>cstar)cstar=c;
  }
  return {S:alive.length,cstar};
}

const pct=(arr,p)=>arr[Math.min(arr.length-1,Math.floor(p*arr.length))];
const f2=v=>v.toFixed(2),f3=v=>v.toFixed(3),f4=v=>v.toFixed(4);

for(const x of [11,13,17]){
  const {W,natal}=natalSet(x);
  const sqrtW=Math.sqrt(W);
  const scour=primesUpTo(Math.floor(sqrtW)).filter(q=>q>x);
  const N=natal.length;
  console.log('\n'+'='.repeat(78));
  console.log(`@${x}: W=${W}  |Natal@5|=${N}  scour ${scour[0]}..${scour[scour.length-1]} (${scour.length} primes, √W=${sqrtW.toFixed(1)})`);

  // worst-case increment bounds d_q over the WHOLE ensemble (alive ⊆ natal):
  const dN=scour.map(q=>{
    const hist=new Int32Array(q);for(const r of natal)hist[r%q]++;
    let mx=0;for(let a=0;a<q;a++){const pc=hist[a]+hist[(a+q-2)%q];if(pc>mx)mx=pc;}
    return mx;});

  const {steps,final,selfStrikes}=detailMarch(natal,scour);
  const K=steps.length;
  // future survival factors f_k = ∏_{j>k}(1−2/q_j)
  const f=new Array(K);let acc=1;
  for(let k=K-1;k>=0;k--){f[k]=acc;acc*=(1-2/steps[k].q);}
  const Eprod=N*acc; // = N·∏(1−2/q) over all scour primes

  // per-step table (condensed at 17)
  console.log('   q  | before | fresh |    e    | z_bin | z_true | vt/vb | cumZ');
  let ce=0,cv=0,cstar=0,cstarK=0;
  const zbin=[],ztrue=[],evals=[];
  steps.forEach((s,k)=>{
    ce+=s.e;cv+=s.vbin;
    const cz=ce/Math.sqrt(cv);
    if(Math.abs(cz)>cstar){cstar=Math.abs(cz);cstarK=s.q;}
    const zb=s.e/Math.sqrt(s.vbin),zt=s.vtrue>0?s.e/Math.sqrt(s.vtrue):0;
    zbin.push(zb);ztrue.push(zt);evals.push(s.e);
    const show=(x<17)||k<12||k%10===0||k>=K-2;
    if(show)console.log(`  ${String(s.q).padStart(3)} | ${String(s.before).padStart(6)} | ${String(s.fresh).padStart(5)} | ${s.e>=0?'+':''}${s.e.toFixed(2).padStart(6)} | ${zb>=0?'+':''}${f2(zb)} | ${zt>=0?'+':''}${f2(zt)}  | ${f2(s.vtrue/s.vbin)}  | ${cz>=0?'+':''}${f2(cz)}`);
    else if(k===12&&x===17)console.log('  ... (every 10th shown) ...');
  });

  console.log(`  final alive = ${final}   E_prod = N·∏(1−2/q) = ${f2(Eprod)}   self-strikes(twins found) = ${selfStrikes}`);
  const ex=EXACT[x];
  console.log(`  exact ensemble endpoint (natal5-variance.txt): E=${ex.E} Var=${ex.V} σ=${f2(Math.sqrt(ex.V))}  → anchored endpoint z = ${f2((final-ex.E)/Math.sqrt(ex.V))}`);

  // (2) statistics of the increments
  console.log(`  -- increment statistics (K=${K} steps) --`);
  console.log(`  Σe = ${f2(evals.length?evals.reduce((a,b)=>a+b,0):0)}   mean e = ${f3(mean(evals))}   Σe_k·f_k = ${f2(steps.reduce((a,s,k)=>a+s.e*f[k],0))}  vs  E_prod − final = ${f2(Eprod-final)}  (exact identity: A_K = N∏(1−2/q) − Σe_k·f_k)`);
  console.log(`  z_bin : mean=${f3(mean(zbin))} sd=${f3(sd(zbin))} skew=${f3(skew(zbin))} exkurt=${f3(exkurt(zbin))} max|z|=${f2(Math.max(...zbin.map(Math.abs)))} #|z|>2=${zbin.filter(z=>Math.abs(z)>2).length} (Gauss exp ${(0.0455*K).toFixed(1)}) #|z|>3=${zbin.filter(z=>Math.abs(z)>3).length}`);
  console.log(`  z_true: mean=${f3(mean(ztrue))} sd=${f3(sd(ztrue))} skew=${f3(skew(ztrue))} exkurt=${f3(exkurt(ztrue))}`);
  console.log(`  z_bin autocorr lag1=${f3(autocorr(zbin,1))} lag2=${f3(autocorr(zbin,2))} lag3=${f3(autocorr(zbin,3))}`);
  // detrended autocorr: subtract a centered moving average (window 9) so that a
  // smooth drift curve does not masquerade as fluctuation memory
  const wdw=4,resid=zbin.map((z,k)=>{const lo=Math.max(0,k-wdw),hi=Math.min(K-1,k+wdw);
    let s=0;for(let j=lo;j<=hi;j++)s+=zbin[j];return z-s/(hi-lo+1);});
  console.log(`  z_bin DETRENDED (moving-avg window 9) autocorr lag1=${f3(autocorr(resid,1))} lag2=${f3(autocorr(resid,2))}`);
  const h1=zbin.slice(0,K>>1),h2=zbin.slice(K>>1);
  console.log(`  drift split: mean z (first half)=${f3(mean(h1))}  (second half)=${f3(mean(h2))}`);
  console.log(`  v_true/v_bin ratio: mean=${f3(mean(steps.map(s=>s.vtrue/s.vbin)))} min=${f3(Math.min(...steps.map(s=>s.vtrue/s.vbin)))} max=${f3(Math.max(...steps.map(s=>s.vtrue/s.vbin)))}`);

  // (3) envelope
  console.log(`  -- envelope --  c* = max_k |Σe|/√(Σv_bin) = ${f3(cstar)}  (attained at q=${cstarK});  endpoint Σe/√(Σv_bin) = ${f3(ce/Math.sqrt(cv))}`);

  // endpoint-variance reconstruction from trajectory conditional variances:
  const Vrecon=steps.reduce((a,s,k)=>a+s.vtrue*f[k]*f[k],0);
  console.log(`  Σ v_true,k·f_k² = ${f2(Vrecon)}   vs exact endpoint Var = ${ex.V}   (near-uncorrelated-increments check)`);
  const zDoob=steps.reduce((a,s,k)=>a+s.e*f[k],0)/Math.sqrt(Vrecon);
  console.log(`  Doob-scaled endpoint deviation: Σe_k·f_k/√(Σv_true·f²) = ${f2(zDoob)}   (should ≈ −(anchored endpoint z) = ${f2(-(final-ex.E)/Math.sqrt(ex.V))})`);

  // (4) ensemble tail bounds on P(survivors = 0)
  const E=Eprod;
  const cheb=ex.V/(ex.E*ex.E);
  const sumd2=dN.reduce((a,d)=>a+d*d,0);
  const mcd=2*E*E/sumd2;
  const M=Math.max(...dN);
  const Vmax=dN.reduce((a,d,k)=>a+Math.min(d*d/4,d*2*N/scour[k]),0);
  const fred=E*E/(2*(Vmax+M*E/3));
  const Memp=Math.max(...steps.map((s,k)=>s.range*f[k]));
  const Vemp=Vrecon;
  const fredEmp=E*E/(2*(Vemp+Memp*E/3));
  console.log(`  -- ensemble bounds on P(S=0) --`);
  console.log(`  Chebyshev endpoint:            Var/E² = ${cheb.toExponential(2)}`);
  console.log(`  McDiarmid (valid): d_q=max pair-count of natal mod q; Σd² = ${sumd2.toExponential(3)}; exponent 2E²/Σd² = ${f3(mcd)} → bound e^−${f3(mcd)} = ${Math.exp(-mcd).toExponential(2)}`);
  console.log(`  Freedman (valid worst-case):   M=${M}, V≤${f2(Vmax)}; exponent = ${f3(fred)} → bound ${Math.exp(-fred).toExponential(2)}`);
  console.log(`  Freedman (EMPIRICAL ceiling, anchored-path v_q — NOT a theorem):`);
  console.log(`      V_emp=${f2(Vemp)}, M_emp=${f2(Memp)}; exponent = ${f2(fredEmp)} → e^−${f2(fredEmp)}${fredEmp>50?'  (astronomically small)':''}`);

  // Monte-Carlo the ensemble's own trajectories (x ≤ 13 only; @17 covered by theory numbers)
  if(x<=13){
    const n=x===11?200000:4000,rng=mulberry32(20260814+x);
    let minS=Infinity,zeros=0;const cstars=[];let sumS=0;
    for(let i=0;i<n;i++){const r=mcMarch(natal,scour,rng);sumS+=r.S;if(r.S<minS)minS=r.S;if(r.S===0)zeros++;cstars.push(r.cstar);}
    cstars.sort((a,b)=>a-b);
    const below=cstars.filter(c=>c<cstar).length;
    console.log(`  -- MC over ${n} random rotations --  mean S=${f2(sumS/n)} min S=${minS} #(S=0)=${zeros}`);
    console.log(`      ensemble c*: p50=${f3(pct(cstars,0.50))} p95=${f3(pct(cstars,0.95))} p99=${f3(pct(cstars,0.99))} max=${f3(cstars[n-1])};  anchored c*=${f3(cstar)} sits at percentile ${(100*below/n).toFixed(1)}`);
  }
}
console.log('\nDONE.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-07-trajectory.js
//   invocation:  node research/natal-cap-07-trajectory.js
//   code-sha256: 607fcceb16e94f0234fad238ff5b690efc92d9a2042f90ccb47e6c19156c104a
//   out-sha256:  2fbf9e70ab6ba3e180d0dd341934701c86685cc94d41652a96f5c0a2e7c87cdd
//   body-lines:  144
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     1.0 s
// ============================================================================
//
// ==============================================================================
// @11: W=2310  |Natal@5|=90  scour 13..47 (10 primes, √W=48.1)
//    q  | before | fresh |    e    | z_bin | z_true | vt/vb | cumZ
//    13 |     90 |    13 |  -0.85 | -0.25 | -0.69  | 0.13  | -0.25
//    17 |     77 |     9 |  -0.06 | -0.02 | -0.06  | 0.14  | -0.20
//    19 |     68 |     8 | +  0.84 | +0.33 | +0.58  | 0.33  | -0.01
//    23 |     60 |     5 |  -0.22 | -0.10 | -0.20  | 0.24  | -0.05
//    29 |     55 |     4 | +  0.21 | +0.11 | +0.17  | 0.42  | -0.01
//    31 |     51 |     2 |  -1.29 | -0.74 | -0.94  | 0.61  | -0.22
//    37 |     49 |     1 |  -1.65 | -1.04 | -1.38  | 0.57  | -0.48
//    41 |     48 |     1 |  -1.34 | -0.90 | -1.45  | 0.39  | -0.67
//    43 |     47 |     1 |  -1.19 | -0.82 | -0.94  | 0.76  | -0.83
//    47 |     46 |     1 |  -0.96 | -0.70 | -0.80  | 0.77  | -0.96
//   final alive = 45   E_prod = N·∏(1−2/q) = 39.27   self-strikes(twins found) = 2
//   exact ensemble endpoint (natal5-variance.txt): E=39.27 Var=10.06 σ=3.17  → anchored endpoint z = 1.81
//   -- increment statistics (K=10 steps) --
//   Σe = -6.50   mean e = -0.650   Σe_k·f_k = -5.73  vs  E_prod − final = -5.73  (exact identity: A_K = N∏(1−2/q) − Σe_k·f_k)
//   z_bin : mean=-0.412 sd=0.458 skew=0.167 exkurt=-1.460 max|z|=1.04 #|z|>2=0 (Gauss exp 0.5) #|z|>3=0
//   z_true: mean=-0.571 sd=0.635 skew=0.304 exkurt=-1.037
//   z_bin autocorr lag1=0.674 lag2=0.363 lag3=-0.059
//   z_bin DETRENDED (moving-avg window 9) autocorr lag1=0.389 lag2=-0.051
//   drift split: mean z (first half)=0.015  (second half)=-0.839
//   v_true/v_bin ratio: mean=0.435 min=0.129 max=0.771
//   -- envelope --  c* = max_k |Σe|/√(Σv_bin) = 0.956  (attained at q=47);  endpoint Σe/√(Σv_bin) = -0.956
//   Σ v_true,k·f_k² = 9.10   vs exact endpoint Var = 10.06   (near-uncorrelated-increments check)
//   Doob-scaled endpoint deviation: Σe_k·f_k/√(Σv_true·f²) = -1.90   (should ≈ −(anchored endpoint z) = -1.81)
//   -- ensemble bounds on P(S=0) --
//   Chebyshev endpoint:            Var/E² = 6.52e-3
//   McDiarmid (valid): d_q=max pair-count of natal mod q; Σd² = 9.230e+2; exponent 2E²/Σd² = 3.342 → bound e^−3.342 = 3.54e-2
//   Freedman (valid worst-case):   M=16, V≤230.75; exponent = 1.752 → bound 1.73e-1
//   Freedman (EMPIRICAL ceiling, anchored-path v_q — NOT a theorem):
//       V_emp=9.10, M_emp=3.05; exponent = 15.74 → e^−15.74
//   -- MC over 200000 random rotations --  mean S=39.27 min S=25 #(S=0)=0
//       ensemble c*: p50=0.648 p95=1.299 p99=1.635 max=2.796;  anchored c*=0.956 sits at percentile 80.2
//
// ==============================================================================
// @13: W=30030  |Natal@5|=990  scour 17..173 (34 primes, √W=173.3)
//    q  | before | fresh |    e    | z_bin | z_true | vt/vb | cumZ
//    17 |    990 |   115 |  -1.47 | -0.15 | -0.55  | 0.07  | -0.15
//    19 |    875 |    90 |  -2.11 | -0.23 | -0.45  | 0.27  | -0.26
//    23 |    785 |    68 |  -0.26 | -0.03 | -0.12  | 0.08  | -0.24
//    29 |    717 |    48 |  -1.45 | -0.21 | -0.50  | 0.18  | -0.31
//    31 |    669 |    45 | +  1.84 | +0.29 | +0.65  | 0.20  | -0.19
//    37 |    624 |    32 |  -1.73 | -0.31 | -0.62  | 0.25  | -0.27
//    41 |    592 |    29 | +  0.12 | +0.02 | +0.05  | 0.21  | -0.25
//    43 |    563 |    30 | +  3.81 | +0.76 | +1.07  | 0.51  | -0.06
//    47 |    533 |    26 | +  3.32 | +0.71 | +1.18  | 0.36  | +0.10
//    53 |    507 |    28 | +  8.87 | +2.07 | +3.07  | 0.45  | +0.51
//    59 |    479 |    21 | +  4.76 | +1.20 | +1.81  | 0.44  | +0.72
//    61 |    458 |    18 | +  2.98 | +0.78 | +1.15  | 0.46  | +0.85
//    67 |    440 |    19 | +  5.87 | +1.64 | +2.37  | 0.48  | +1.10
//    71 |    421 |    17 | +  5.14 | +1.51 | +2.02  | 0.56  | +1.31
//    73 |    404 |    11 |  -0.07 | -0.02 | -0.03  | 0.61  | +1.29
//    79 |    393 |    11 | +  1.05 | +0.34 | +0.48  | 0.50  | +1.33
//    83 |    382 |    10 | +  0.80 | +0.27 | +0.35  | 0.59  | +1.35
//    89 |    372 |     8 |  -0.36 | -0.13 | -0.17  | 0.55  | +1.33
//    97 |    364 |     4 |  -3.51 | -1.29 | -1.76  | 0.54  | +1.17
//   101 |    360 |    11 | +  3.87 | +1.46 | +1.72  | 0.72  | +1.32
//   103 |    349 |     8 | +  1.22 | +0.47 | +0.55  | 0.73  | +1.37
//   107 |    341 |     5 |  -1.37 | -0.55 | -0.83  | 0.44  | +1.30
//   109 |    336 |     7 | +  0.83 | +0.34 | +0.43  | 0.64  | +1.33
//   113 |    329 |     1 |  -4.82 | -2.02 | -2.53  | 0.64  | +1.13
//   127 |    328 |     2 |  -3.17 | -1.40 | -1.68  | 0.70  | +0.99
//   131 |    326 |     1 |  -3.98 | -1.80 | -1.98  | 0.82  | +0.83
//   137 |    325 |     6 | +  1.26 | +0.58 | +0.80  | 0.52  | +0.87
//   139 |    319 |     4 |  -0.59 | -0.28 | -0.34  | 0.68  | +0.85
//   149 |    315 |     1 |  -3.23 | -1.58 | -1.95  | 0.66  | +0.71
//   151 |    314 |     3 |  -1.16 | -0.57 | -0.68  | 0.70  | +0.66
//   157 |    311 |     1 |  -2.96 | -1.50 | -1.76  | 0.73  | +0.54
//   163 |    310 |     2 |  -1.80 | -0.93 | -1.11  | 0.70  | +0.47
//   167 |    308 |     0 |  -3.69 | -1.93 | -2.15  | 0.81  | +0.32
//   173 |    308 |     1 |  -2.56 | -1.36 | -1.77  | 0.59  | +0.22
//   final alive = 307   E_prod = N·∏(1−2/q) = 304.28   self-strikes(twins found) = 6
//   exact ensemble endpoint (natal5-variance.txt): E=304.28 Var=91.13 σ=9.55  → anchored endpoint z = 0.28
//   -- increment statistics (K=34 steps) --
//   Σe = 5.47   mean e = 0.161   Σe_k·f_k = -2.72  vs  E_prod − final = -2.72  (exact identity: A_K = N∏(1−2/q) − Σe_k·f_k)
//   z_bin : mean=-0.113 sd=1.059 skew=-0.024 exkurt=-0.697 max|z|=2.07 #|z|>2=2 (Gauss exp 1.5) #|z|>3=0
//   z_true: mean=-0.096 sd=1.387 skew=0.227 exkurt=-0.628
//   z_bin autocorr lag1=0.495 lag2=0.418 lag3=0.387
//   z_bin DETRENDED (moving-avg window 9) autocorr lag1=-0.059 lag2=-0.087
//   drift split: mean z (first half)=0.509  (second half)=-0.734
//   v_true/v_bin ratio: mean=0.511 min=0.070 max=0.824
//   -- envelope --  c* = max_k |Σe|/√(Σv_bin) = 1.368  (attained at q=103);  endpoint Σe/√(Σv_bin) = 0.217
//   Σ v_true,k·f_k² = 88.99   vs exact endpoint Var = 91.13   (near-uncorrelated-increments check)
//   Doob-scaled endpoint deviation: Σe_k·f_k/√(Σv_true·f²) = -0.29   (should ≈ −(anchored endpoint z) = -0.28)
//   -- ensemble bounds on P(S=0) --
//   Chebyshev endpoint:            Var/E² = 9.84e-4
//   McDiarmid (valid): d_q=max pair-count of natal mod q; Σd² = 7.051e+4; exponent 2E²/Σd² = 2.626 → bound e^−2.626 = 7.23e-2
//   Freedman (valid worst-case):   M=120, V≤17626.50; exponent = 1.554 → bound 2.11e-1
//   Freedman (EMPIRICAL ceiling, anchored-path v_q — NOT a theorem):
//       V_emp=88.99, M_emp=5.92; exponent = 67.11 → e^−67.11  (astronomically small)
//   -- MC over 4000 random rotations --  mean S=304.29 min S=267 #(S=0)=0
//       ensemble c*: p50=0.652 p95=1.250 p99=1.563 max=2.070;  anchored c*=1.368 sits at percentile 97.3
//
// ==============================================================================
// @17: W=510510  |Natal@5|=14850  scour 19..709 (120 primes, √W=714.5)
//    q  | before | fresh |    e    | z_bin | z_true | vt/vb | cumZ
//    19 |  14850 |  1563 |  -0.16 | -0.00 | -0.02  | 0.03  | -0.00
//    23 |  13287 |  1159 | +  3.61 | +0.11 | +0.86  | 0.02  | +0.07
//    29 |  12128 |   839 | +  2.59 | +0.09 | +0.46  | 0.04  | +0.11
//    31 |  11289 |   725 |  -3.32 | -0.13 | -0.73  | 0.03  | +0.04
//    37 |  10564 |   573 | +  1.97 | +0.08 | +0.30  | 0.08  | +0.07
//    41 |   9991 |   483 |  -4.37 | -0.20 | -0.60  | 0.11  | +0.00
//    43 |   9508 |   444 | +  1.77 | +0.09 | +0.23  | 0.13  | +0.03
//    47 |   9064 |   375 | -10.70 | -0.56 | -1.40  | 0.16  | -0.11
//    53 |   8689 |   322 |  -5.89 | -0.33 | -0.85  | 0.15  | -0.19
//    59 |   8367 |   272 | -11.63 | -0.70 | -1.50  | 0.22  | -0.33
//    61 |   8095 |   266 | +  0.59 | +0.04 | +0.08  | 0.22  | -0.32
//    67 |   7829 |   242 | +  8.30 | +0.55 | +1.09  | 0.25  | -0.21
//   ... (every 10th shown) ...
//   107 |   6249 |   131 | + 14.20 | +1.33 | +2.23  | 0.35  | +0.28
//   163 |   5224 |    82 | + 17.90 | +2.25 | +2.99  | 0.57  | +1.72
//   223 |   4549 |    55 | + 14.20 | +2.23 | +2.93  | 0.58  | +3.09
//   271 |   4101 |    37 | +  6.73 | +1.23 | +1.56  | 0.62  | +3.86
//   337 |   3780 |    27 | +  4.57 | +0.97 | +1.24  | 0.60  | +4.34
//   397 |   3539 |    18 | +  0.17 | +0.04 | +0.05  | 0.73  | +4.64
//   457 |   3383 |    14 |  -0.81 | -0.21 | -0.26  | 0.66  | +4.52
//   521 |   3246 |    11 |  -1.46 | -0.41 | -0.50  | 0.69  | +4.47
//   593 |   3162 |     5 |  -5.66 | -1.74 | -2.06  | 0.71  | +4.10
//   647 |   3114 |     3 |  -6.63 | -2.14 | -2.39  | 0.80  | +3.55
//   701 |   3100 |     1 |  -7.84 | -2.64 | -2.88  | 0.84  | +2.95
//   709 |   3099 |     0 |  -8.74 | -2.96 | -3.47  | 0.73  | +2.87
//   final alive = 3099   E_prod = N·∏(1−2/q) = 3245.51   self-strikes(twins found) = 16
//   exact ensemble endpoint (natal5-variance.txt): E=3245.51 Var=1060.54 σ=32.57  → anchored endpoint z = -4.50
//   -- increment statistics (K=120 steps) --
//   Σe = 299.16   mean e = 2.493   Σe_k·f_k = 146.51  vs  E_prod − final = 146.51  (exact identity: A_K = N∏(1−2/q) − Σe_k·f_k)
//   z_bin : mean=0.131 sd=1.379 skew=-0.444 exkurt=-0.540 max|z|=3.02 #|z|>2=18 (Gauss exp 5.5) #|z|>3=1
//   z_true: mean=0.266 sd=1.745 skew=-0.237 exkurt=-0.804
//   z_bin autocorr lag1=0.864 lag2=0.837 lag3=0.815
//   z_bin DETRENDED (moving-avg window 9) autocorr lag1=-0.090 lag2=-0.186
//   drift split: mean z (first half)=1.018  (second half)=-0.756
//   v_true/v_bin ratio: mean=0.573 min=0.017 max=0.853
//   -- envelope --  c* = max_k |Σe|/√(Σv_bin) = 4.651  (attained at q=419);  endpoint Σe/√(Σv_bin) = 2.866
//   Σ v_true,k·f_k² = 1047.89   vs exact endpoint Var = 1060.54   (near-uncorrelated-increments check)
//   Doob-scaled endpoint deviation: Σe_k·f_k/√(Σv_true·f²) = 4.53   (should ≈ −(anchored endpoint z) = 4.50)
//   -- ensemble bounds on P(S=0) --
//   Chebyshev endpoint:            Var/E² = 1.01e-4
//   McDiarmid (valid): d_q=max pair-count of natal mod q; Σd² = 1.171e+7; exponent 2E²/Σd² = 1.800 → bound e^−1.800 = 1.65e-1
//   Freedman (valid worst-case):   M=1573, V≤2926298.75; exponent = 1.138 → bound 3.20e-1
//   Freedman (EMPIRICAL ceiling, anchored-path v_q — NOT a theorem):
//       V_emp=1047.89, M_emp=14.67; exponent = 311.37 → e^−311.37  (astronomically small)
//
// DONE.
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. THE MARTINGALE IS REAL, AND THE NORMALIZATION IS EXACT. Over a uniform
//    rotation of the tile (by CRT: one independent uniform strike class c_q
//    per scour prime), E[fresh(q) | past] = (2/q)·alive_before EXACTLY — so
//    e_q = fresh − (2/q)·alive are genuine Doob martingale increments, and
//    the whole march obeys the exact algebraic identity
//        final = N·∏(1−2/q) − Σ e_k·f_k,   f_k = ∏_{j>k}(1−2/q_j),
//    verified to the last digit at all three levels (−5.73, −2.72, +146.51).
//    The "expected survivors" curve is not a heuristic inside the ensemble;
//    ONLY the anchored increments e_k carry information.
//
// 2. THE MARCH IS QUIETER THAN BINOMIAL, AND THE NOISE BUDGET CLOSES. The
//    true conditional variance v_q (variance over c of the alive set's
//    pair-class counts mod q) is far BELOW the binomial (2/q)(1−2/q)·alive:
//    ratio 0.02–0.03 at the head of @17, rising to ~0.85 at the tail (mean
//    0.57). The young alive set is CRT-smooth mod each upcoming q, so whole-
//    class removal has little variance. And the trajectory variances fully
//    account for the endpoint: Σ v_q·f_k² = 9.10 / 88.99 / 1047.89 against
//    exact endpoint Var = 10.06 / 91.13 / 1060.54 (99% at @17) — increments
//    are near-uncorrelated over the ensemble, and the Doob-scaled endpoint
//    deviation reproduces the exact-σ z (4.53 vs 4.50 at @17). The
//    near-martingale picture is quantitatively self-consistent, not a slogan.
//
// 3. FLUCTUATION: GAUSSIAN-ISH AND MEMORYLESS ONCE THE DRIFT IS REMOVED.
//    z-values show no heavy tails (max |z| = 3.02 in 164 steps across all
//    levels; z_bin sd 0.46 at @11 and 1.06, 1.38 at @13/@17; |skew| ≤ 0.45;
//    excess kurtosis negative at every level). The raw
//    autocorrelation looks dramatic (lag-1 = 0.86 at @17) but it is DRIFT in
//    disguise: subtracting a 9-step moving average collapses it to −0.09.
//    The @17 z-sd of 1.38 (>1) is likewise drift-inflated, not tail-driven.
//
// 4. DRIFT: REAL, STRUCTURED, AND LIVING AT BOTH ENDS OF THE MARCH. Mean z
//    flips from +1.02 (first half) to −0.76 (second half) at @17: an over-
//    killing hump through q ≈ 100–340 (z up to +3), then a DETERMINISTIC
//    under-killing tail (q ≥ 450: z marches monotonically to −3.0 at 709).
//    The tail deficit is structural, not noise: a fresh kill by q needs
//    r = q·m (or q·m−2) with m free of smaller primes, and near √W the
//    anchored strike classes {0, q−2} are nearly empty of survivors — the
//    p² rule seen as a drift term. Net endpoint drift flips sign with x:
//    actual/E = 1.146 (@11), 1.009 (@13), 0.955 (@17), 0.926 (@19, from
//    natal5-variance.txt) — descending toward the Mertens constant
//    (2e^−γ)⁻² ≈ 0.793. In ensemble-σ units this drift GROWS: +1.8, +0.3,
//    −4.5, −25.5. Drift and fluctuation are cleanly separable, and the
//    dangerous component is 100% drift.
//
// 5. ENVELOPES: THE ENSEMBLE IS AZUMA-TAME; THE ANCHORED PATH IS A DRIFTER.
//    Monte-Carlo over rotations: envelope exceedance c* has p99 ≈ 1.6 and
//    max 2.8 over 200k runs (@11), 2.07 over 4k runs (@13); no random
//    trajectory came near zero (min S = 25 of E≈39; 267 of E≈304). The
//    anchored c* climbs through the ensemble: 0.96 (80th pct @11), 1.37
//    (97.3rd pct @13), 4.65 (@17 — outside anything MC produced at 13).
//    Random rotations concentrate; the anchored member walks out of the band
//    at exactly the rate the Mertens drift predicts.
//
// 6. THE BOUND CONTEST — REFUTATION FIRST: the theorem-valid martingale
//    bounds LOSE to endpoint Chebyshev, and lose worse as x grows.
//        McDiarmid exponent 2E²/Σd²:  3.34 / 2.63 / 1.80  (x = 11/13/17)
//        → bounds 3.5e−2 / 7.2e−2 / 1.7e−1
//        vs Chebyshev Var/E²:        6.5e−3 / 9.8e−4 / 1.0e−4.
//    Chebyshev wins by 1, 2, 3 orders of magnitude and the gap widens.
//    Freedman with worst-case increment/variance bounds is worse still
//    (exponent 1.14 at @17). The reason is structural: the valid per-step
//    increment bound d_q ≈ 2N/q at the first scour prime is the same order
//    as the entire mean E ≈ N·(2 ln x/x)², so Σd² ≫ E²; asymptotically the
//    exponent 2E²/Σd² ≍ ln⁵x/x³ → 0 and the "exponential" bound tends to 1.
//    The naive hope "martingale ⇒ exponential ⇒ better than Chebyshev" is
//    REFUTED at every accessible level and asymptotically.
//
// 7. …BUT THE CEILING IS ASTRONOMICAL, AND IT NAMES THE MISSING LEMMA. If
//    the increment control observed along the anchored path held over the
//    whole ensemble (V ≈ Var(S), per-step deviation ranges M ≈ 3 / 6 / 15),
//    Freedman would give e^−15.7 / e^−67 / e^−311 for P(S = 0) — against
//    Chebyshev's 1e−4. The entire factor between e^−1.8 and e^−311 hangs on
//    ONE unproven statement, a self-bounding discrepancy lemma: "along every
//    ensemble path, the alive set stays equidistributed enough mod each
//    upcoming q that pair-class counts deviate from 2·alive/q by only
//    O(√(alive/q))-scale." Empirically true at every step we can see. That
//    lemma — not more concentration machinery — is where the work is.
//
// 8. WHAT NONE OF THIS GIVES (said plainly). Every probability above is over
//    the rotation ensemble. The anchored tile is ONE FIXED member, and a
//    measurably ATYPICAL one: it sits at −4.5σ (@17), −25.5σ (@19), and by
//    the Mertens drift it leaves the typical set entirely as x grows. An
//    ensemble bound of e^−311 on P(S = 0) — even if proven — says NOTHING
//    about the anchored member; the anchored member's own drift is a live
//    demonstration that ensemble typicality is the wrong tool for the
//    anchored escape. What the trajectory view DOES buy for the anchored
//    problem: (a) the drift is toward 0.793·E, not toward 0 — the enemy is a
//    bounded multiplicative bias, not a wandering bridge; (b) the anchored
//    fluctuation AROUND its drift curve is ensemble-typical (reading 3), so
//    the open problem cleanly reduces to pinning the deterministic drift —
//    which is the Mertens/2C₂ wall again. The trajectory view relocates the
//    problem with precision; it does not solve it.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   1.059 -> 1.06, the @13 z_bin sd, reading 3.
//   1.018 -> 1.02, the @17 drift-split mean z over the first half, reading 4.
//   2.626 -> 2.63, the @13 McDiarmid exponent, reading 6.
//   1.138 -> 1.14, the @17 Freedman valid worst-case exponent, reading 6.
//   The two q boundaries of reading 4, "q = 100-340" and "q >= 450", are hand
//   rounded off the printed @17 per-step table, whose q column jumps 337, 397,
//   457 because only every tenth step is displayed. Both carry an approximation
//   marker in the reading. The exact primes where z_true changes sign are not
//   in the output, so the boundaries are indicative, not measured.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   164 in reading 3 is the total step count, 10 + 34 + 120, from the three
//   "increment statistics (K = ... steps)" headers.
//   The actual/E series of reading 4 divides final alive by E_prod at each
//   level: 45/39.27 = 1.146, 307/304.28 = 1.009, 3099/3245.51 = 0.955. The
//   0.955 is this division, not the printed envelope c* = 0.956.
//   The first three ensemble-sigma drifts of reading 4, +1.8, +0.3 and -4.5,
//   are the printed anchored endpoint z values 1.81, 0.28 and -4.50.
//
// BORROWED, verified present in the named producer:
//   0.926 and 25.5, the @19 entries of reading 4 and reading 8. Line 23 of
//   research/natal5-variance.txt reads 19 | 38380 | 41441.2 | 0.9261 | -25.52,
//   which is the source the reading names and both figures round it.
//
// DEFINITION / LITERATURE constants:
//   0.793 in reading 4 is (2 e^-gamma)^-2 evaluated, the Mertens constant the
//   reading is comparing against, not a measurement of this march.
// ---------------------------------------------------------------------------
