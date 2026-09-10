// ============================================================================
// NATAL@5 VARIANCE — exact CRT pair-correlation for the comb {11,17 mod 30}
// (2026-08-14, the variance avenue, step 1)
// ============================================================================
// The Natal@5 survivor pattern at scour depth y is the CRT set
//   A(r) = 1  iff  r ≡ 11 or 17 (mod 30)  and  r mod p ∉ {0, p−2} ∀ 7 ≤ p ≤ y.
// Density: δ(y) = (2/30)·∏_{7≤p≤y}(p−2)/p.
// Pair correlation (EXACT, factors by CRT):
//   J₅(d) = (ρ₃₀(d)/30) · ∏_{7≤p≤y} ρ_p(d)/p
//   ρ₃₀(d) = 2 if d≡0, 1 if d≡±6, 0 otherwise (mod 30)   ← the comb's teeth
//   ρ_p(d) = p−2 if p|d;  p−3 if d≡±2 (mod p);  p−4 otherwise.
// Two natal slots can only sit at gaps ≡ 0, ±6 (mod 30).
//
// Over a uniformly random rotation t of a length-L window in the deep tile
// (period ∏_{p≤y} p):   E[N] = δL,   Var[N] = Σ_{|d|<L}(L−|d|)(J₅(d)−δ²).
// Chebyshev: fraction of rotations with N=0 is ≤ Var/E².
//
// THE SETTING WE CARE ABOUT: L = W = x# (one whole X-tile window), scour
// depth y = largest prime ≤ √W. Then the survivors in the ANCHORED window
// [0,W) are exactly the tile's real natal twins (3099 at @17). This script:
//   A. exact formula table @7,@11,@13,@17,@19: E, Var, Var/E, σ, E/σ,
//      Chebyshev empty-rotation bound  (the almost-all statement)
//   B. FULL brute-force verification @7 (deep period 30030, all rotations)
//   C. the ANCHORED window's actual count at each level + its z-score
//      (how atypical is OUR tile within the rotation ensemble — the
//       anchored-escape measured, not just named)
//   D. Monte-Carlo rotation sampling @11 (300k) and @13 (20k) as a mid-level
//      check of the formula where full scans are impossible.
// Output appends live to research/natal5-variance.txt.
// ============================================================================
const fs = require('fs');
const OUT = '~/Files/Git/primeoire/research/natal5-variance.txt';
fs.writeFileSync(OUT, '');
function log(s){ fs.appendFileSync(OUT, s + '\n'); console.log(s); }

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function midPrimes(y){ return primesUpTo(y).filter(p=>p>=7); }
function largestPrimeLE(n){ const ps=primesUpTo(n); return ps[ps.length-1]; }

function delta(ps){ let d=2/30; for(const p of ps) d*=(p-2)/p; return d; }

function J5(d, ps){
  const m30=((d%30)+30)%30;
  let f;
  if(m30===0) f=2/30; else if(m30===6||m30===24) f=1/30; else return 0;
  for(const p of ps){
    const m=((d%p)+p)%p;
    if(m===0) f*=(p-2)/p;
    else if(m===2||m===p-2) f*=(p-3)/p;
    else f*=(p-4)/p;
  }
  return f;
}

// Var over rotations, window length L, scour depth y. J symmetric in d.
function varianceFormula(y, L){
  const ps=midPrimes(y), del=delta(ps);
  let S = L * J5(0, ps);
  for(const start of [6,24,30]){
    for(let d=start; d<L; d+=30) S += 2*(L-d)*J5(d, ps);
  }
  return { E: del*L, Var: S - del*del*L*L, delta: del };
}

// anchored actual: natal@5 survivors of the scour to y in [0, W)
function anchoredCount(W, y){
  const A=new Uint8Array(W);
  for(let r=11;r<W;r+=30)A[r]=1;
  for(let r=17;r<W;r+=30)A[r]=1;
  for(const p of midPrimes(y)){
    for(let j=0;j<W;j+=p)A[j]=0;
    for(let j=p-2;j<W;j+=p)A[j]=0;
  }
  let c=0; for(let r=0;r<W;r++)c+=A[r];
  return c;
}

const LEVELS=[7,11,13,17,19];
const WIDTHS={7:210, 11:2310, 13:30030, 17:510510, 19:9699690};

log('='.repeat(78));
log('  NATAL@5 VARIANCE — exact J5 pair-correlation, run of 2026-08-14');
log('='.repeat(78));

// ---------------- Part A: the exact formula table ----------------
log('\n--- A. Exact variance over rotations (window L = W, scour to y = maxprime<=sqrt(W)) ---');
log('  x  |    W     |  y  |    E[N]   |   Var    | Var/E | sigma |  E/sigma | empty<= (Var/E^2)');
const results={};
for(const x of LEVELS){
  const W=WIDTHS[x], y=largestPrimeLE(Math.floor(Math.sqrt(W)));
  const t0=Date.now();
  const {E,Var}=varianceFormula(y,W);
  const sig=Math.sqrt(Var);
  results[x]={W,y,E,Var,sig};
  log(` ${String(x).padStart(2)} | ${String(W).padStart(8)} | ${String(y).padStart(3)} | ${E.toFixed(2).padStart(9)} | ${Var.toFixed(2).padStart(8)} | ${(Var/E).toFixed(3)} | ${sig.toFixed(2).padStart(5)} | ${(E/sig).toFixed(1).padStart(7)} | ${(Var/(E*E)).toExponential(2)}   [${((Date.now()-t0)/1000).toFixed(1)}s]`);
}

// ---------------- Part B: full brute force @7 ----------------
log('\n--- B. Brute force @7: ALL rotations of L=210 in the deep tile (period 30030, y=13) ---');
{
  const P=30030, L=210, y=13;
  const A=new Uint8Array(P);
  for(let r=11;r<P;r+=30)A[r]=1;
  for(let r=17;r<P;r+=30)A[r]=1;
  for(const p of [7,11,13]){
    for(let j=0;j<P;j+=p)A[j]=0;
    for(let j=p-2;j<P;j+=p)A[j]=0;
  }
  let N=0; for(let i=0;i<L;i++)N+=A[i%P];
  let sum=0,sumSq=0,empty=0,min=1e9,max=-1;
  for(let t=0;t<P;t++){
    sum+=N; sumSq+=N*N; if(N===0)empty++; if(N<min)min=N; if(N>max)max=N;
    N+=A[(t+L)%P]-A[t];
  }
  const mean=sum/P, varB=sumSq/P-mean*mean;
  const {E,Var}=varianceFormula(y,L);
  log(`  brute: mean=${mean.toFixed(6)}  var=${varB.toFixed(6)}  min=${min}  max=${max}  empty=${empty}/${P}`);
  log(`  formula: E=${E.toFixed(6)}  Var=${Var.toFixed(6)}  match=${Math.abs(mean-E)<1e-9 && Math.abs(varB-Var)<1e-6}`);
}

// ---------------- Part C: the anchored window (OUR tile) ----------------
log('\n--- C. Anchored window [0,W): actual count, ratio to E, z-score ---');
log('  x  | anchored actual |    E[N]   | actual/E | z = (act-E)/sigma');
for(const x of LEVELS){
  const {W,y,E,sig}=results[x];
  const act=anchoredCount(W,y);
  log(` ${String(x).padStart(2)} |     ${String(act).padStart(7)}     | ${E.toFixed(1).padStart(9)} |  ${(act/E).toFixed(4)}  |  ${((act-E)/sig).toFixed(2)}`);
}
log('  (x=17 anchored must equal 3099 = the march result — self-check.)');

// ---------------- Part D: Monte-Carlo rotations @11, @13 ----------------
log('\n--- D. Monte-Carlo random rotations (CRT residue sampling) ---');
function mc(x, nSamples, seed){
  const W=WIDTHS[x], y=largestPrimeLE(Math.floor(Math.sqrt(W)));
  const ps=midPrimes(y);
  let s=seed>>>0;
  const rnd=()=>{ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; };
  const combJ=[];
  for(let t30=0;t30<30;t30++){
    const l=[];
    for(let j=0;j<W;j++){ const m=(t30+j)%30; if(m===11||m===17)l.push(j); }
    combJ.push(l);
  }
  let sum=0,sumSq=0,empty=0,min=1e9;
  const tp=new Array(ps.length);
  for(let it=0; it<nSamples; it++){
    const t30=Math.floor(rnd()*30);
    for(let k=0;k<ps.length;k++) tp[k]=Math.floor(rnd()*ps[k]);
    let cnt=0;
    const list=combJ[t30];
    outer: for(let li=0; li<list.length; li++){
      const j=list[li];
      for(let k=0;k<ps.length;k++){
        const p=ps[k]; const m=(tp[k]+j)%p;
        if(m===0||m===p-2) continue outer;
      }
      cnt++;
    }
    sum+=cnt; sumSq+=cnt*cnt; if(cnt===0)empty++; if(cnt<min)min=cnt;
  }
  const mean=sum/nSamples, vari=sumSq/nSamples-mean*mean;
  return {mean, vari, empty, min, nSamples, y};
}
for(const [x,n] of [[11,300000],[13,20000]]){
  const t0=Date.now();
  const r=mc(x,n,0xC0FFEE+x);
  const {E,Var}=results[x];
  log(`  @${x} (y=${r.y}, n=${n}): MC mean=${r.mean.toFixed(3)} (formula ${E.toFixed(3)})  MC var=${r.vari.toFixed(3)} (formula ${Var.toFixed(3)})  min=${r.min}  empty=${r.empty}   [${((Date.now()-t0)/1000).toFixed(0)}s]`);
}

log('\nDONE. READINGS are in the header-companion block at the end of natal5-variance.js.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal5-variance.js
//   invocation:  node research/natal5-variance.js
//   code-sha256: 59180c2bb65c84ac9d4a2fb2e0e6ca33e35c657e130e63759d1698712511471a
//   out-sha256:  3f8f961c2b525afce5b58bd613a60137c97b5f5395c03cd8e4f54af92fcdb997
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     3.3 s
// ============================================================================
// ==============================================================================
//   NATAL@5 VARIANCE — exact J5 pair-correlation, run of 2026-08-14
// ==============================================================================
//
// --- A. Exact variance over rotations (window L = W, scour to y = maxprime<=sqrt(W)) ---
//   x  |    W     |  y  |    E[N]   |   Var    | Var/E | sigma |  E/sigma | empty<= (Var/E^2)
//   7 |      210 |  13 |      6.92 |     1.05 | 0.152 |  1.03 |     6.7 | 2.20e-2   [0.0s]
//  11 |     2310 |  47 |     39.27 |    10.06 | 0.256 |  3.17 |    12.4 | 6.53e-3   [0.0s]
//  13 |    30030 | 173 |    304.28 |    91.13 | 0.299 |  9.55 |    31.9 | 9.84e-4   [0.0s]
//  17 |   510510 | 709 |   3245.51 |  1060.54 | 0.327 | 32.57 |    99.7 | 1.01e-4   [0.0s]
//  19 |  9699690 | 3109 |  41441.19 | 14392.59 | 0.347 | 119.97 |   345.4 | 8.38e-6   [1.2s]
//
// --- B. Brute force @7: ALL rotations of L=210 in the deep tile (period 30030, y=13) ---
//   brute: mean=6.923077  var=1.052824  min=4  max=10  empty=0/30030
//   formula: E=6.923077  Var=1.052824  match=true
//
// --- C. Anchored window [0,W): actual count, ratio to E, z-score ---
//   x  | anchored actual |    E[N]   | actual/E | z = (act-E)/sigma
//   7 |           8     |       6.9 |  1.1556  |  1.05
//  11 |          45     |      39.3 |  1.1458  |  1.81
//  13 |         307     |     304.3 |  1.0089  |  0.28
//  17 |        3099     |    3245.5 |  0.9549  |  -4.50
//  19 |       38380     |   41441.2 |  0.9261  |  -25.52
//   (x=17 anchored must equal 3099 = the march result — self-check.)
//
// --- D. Monte-Carlo random rotations (CRT residue sampling) ---
//   @11 (y=47, n=300000): MC mean=39.268 (formula 39.274)  MC var=10.058 (formula 10.065)  min=24  empty=0   [1s]
//   @13 (y=173, n=20000): MC mean=304.402 (formula 304.282)  MC var=91.610 (formula 91.132)  min=264  empty=0   [1s]
//
// DONE. READINGS are in the header-companion block at the end of natal5-variance.js.
// READINGS.
// 1. THE FORMULA IS EXACT. Brute force @7 matches mean AND variance to 1e-6
//    over all 30,030 rotations; Monte-Carlo @11/@13 matches within sampling
//    error. The comb factor rho_30(d) = 2/1/0 (d = 0 / ±6 / other, mod 30) is
//    verified machinery: two natal slots can only sit at gaps = 0, ±6 mod 30.
// 2. SUB-POISSON, DRIFTING: Var/E = 0.152 -> 0.347 (x = 7 -> 19). The natal
//    pattern is ~3x more uniform than random, but the ratio DRIFTS with level
//    (same phenomenon as the 06-variance drift; not a universal constant).
// 3. THE ALMOST-ALL THEOREM (per level, verifiable computation): the fraction
//    of rotations of a width-W window (in the depth-y tile) with ZERO Natal@5
//    survivors is <= Var/E^2 = 1.0e-4 at @17, 8.4e-6 at @19, falling steadily.
//    No empty window has EVER been observed (full scan @7, 320k samples
//    @11/@13; minima 24 vs E=39 and 264 vs E=304). In words: the Scour
//    annihilates Natal@5 in at most a vanishing sliver of rotations.
// 4. DISTANCE TO ZERO: E/sigma = 100 sigma (@17), 345 sigma (@19), growing
//    like sqrt(3E). Zeroing a random rotation is a >=100-sigma event; the
//    Chebyshev certificate (1e-4) is astronomically weaker than the truth.
// 5. THE ANCHORED ESCAPE, NOW MEASURED (the honest centerpiece). Our actual
//    tile is the rotation anchored at 0. Its z-score marches
//        +1.05, +1.81, +0.28, -4.50, -25.52   (x = 7, 11, 13, 17, 19)
//    ratio to ensemble mean: 1.156, 1.146, 1.009, 0.955, 0.926.
//    The anchored window is NOT a typical ensemble member: it carries a
//    deterministic PROPORTIONAL bias (the anchored/Mertens drift — the
//    Unification-Law integral over u in (0,2]), while sigma/E shrinks like
//    1/sqrt(E). Hence z -> -infinity. PREDICTION (Unification Law): the
//    anchored ratio converges to e^{2gamma}/4 = 0.79305... — testable at @23
//    (anchored sieve is feasible; the variance sum needs a faster method).
// 6. WHERE THE WALL STANDS, EXACTLY. (a) The theorem in (3) is measure-
//    theoretic; the anchored tile is one point, and (5) shows it is a
//    diverging-z OUTLIER of the very ensemble the theorem governs — so no
//    almost-all bound, however sharp, can ever reach it by measure alone.
//    (b) The saving structure: the anchored bias is bounded-RATIO, not
//    bounded-count — 0.926 x 345 sigma ~ 320 sigma above zero at @19; the
//    anchored margin still explodes. (c) But "the anchored ratio stays
//    bounded away from 0 forever" is exactly Hardy-Littlewood-strength input
//    — the parity wall in variance clothing. The variance program proves
//    everything about the ensemble and, by measuring the anchored drift,
//    proves it can say nothing final about the anchor. The per-prime cap
//    program (natal-cap-01..10) attacks the anchored tile directly instead.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   the empty-window Chebyshev bounds 1.01e-4 at @17 and 8.38e-6 at @19,
//   quoted in reading 3 as 1.0e-4 and 8.4e-6.
//   E/sigma 99.7 at @17, quoted in reading 4 as 100.
//   the anchored actual/E column 1.1556, 1.1458, 1.0089 and 0.9549, quoted in
//   reading 5 as 1.156, 1.146, 1.009 and 0.955; the fifth entry 0.926 is the
//   printed 0.9261.
// DERIVED IN THIS READING by arithmetic over printed values:
//   "320k samples @11/@13" in reading 3 is the two printed Monte-Carlo run
//   sizes added, n=300000 at @11 plus n=20000 at @13.
//   "~320 sigma above zero at @19" in reading 6(b) is the printed anchored
//   ratio 0.9261 times the printed E/sigma 345.4. The two 320s are unrelated.
// DEFINITION / LITERATURE constants:
//   CORRECTED 2026-08-20 (mismatch adjudication #25): reading 5's
//   e^{2gamma}/4 read "0.7932..." and now reads "0.79305...". The constant is
//   0.7930547395, recomputed here 2026-08-20, and
//   `research/natal-cap-22-at31-drift.js` prints 0.793055 in its embedded
//   block. The trailing ellipsis is what made the old form a defect rather
//   than a rounding: it presents 0.7932 as a TRUNCATION of the true decimal,
//   which it is not -- the constant is wrong in the fourth place there.
//   `research/natal-cap-11-kstar23.js` records a near-identical "0.79325" as a
//   known rounding slip of the same family, and
//   `research/attack2-03-09-depth-formula.js` carried "0.7935" at two sites
//   until the same pass. Old -> new: 0.7932... -> 0.79305....
// ---------------------------------------------------------------------------
