// ============================================================================
// ATTACK 4 — FOURIER BUDGET: which frequencies could carry a conspiracy?
// ============================================================================
// ⚠ CORRECTION (2026-08-14, natal-cap-02): the local factor below indexes at
// a mod p, but the correct CRT index is a·(P/p)^{-1} mod p — this file's
// "certified" bound column paired moduli with WRONG kernel values (pointwise
// |F| off by up to N/2 at x=11) and was NOT a valid certificate. The
// qualitative class-level readings (smooth conspiracies dead; big
// coefficients at highly-divisible frequencies) survive. Valid certificates:
// research/natal-cap-02-fourier-budget.js. Kept unedited below per house rule
// (refutations stay visible).
// ============================================================================
// The twin-slot indicator over Z_P factors by CRT, so its Fourier transform
// factors too: |F(a)| = prod_p |f_p(a mod p)| with, for odd p,
//   f_p(0) = (p-2)/p (the density), and for k != 0:
//   f_p(k) = -(1 + e(2*pi*i*k*2/p))/p  =>  |f_p(k)| = 2|cos(2*pi*k/p)|/p <= 2/p
// (sum over the full residue set vanishes; the two killed classes 0,-2 leave
// a two-term exponential). For p=2: f_2(0)=1/2, |f_2(1)|=1/2.
//
// Consequences to test numerically:
//  * SMALL frequencies have astronomically small coefficients (every prime
//    contributes ~2/p): smooth long-range conspiracies are impossible.
//  * The BIG coefficients sit at highly-divisible frequencies a (a ≡ 0 mod
//    many primes — structured "wheel-within-wheel" oscillations).
//  * Total certified window-discrepancy bound sum_a |F(a)|*|K_L(a)| — how far
//    is it from the TRUE max discrepancy (enumerated)? This measures exactly
//    how much the Fourier method loses to parity.
// ============================================================================

const ALL = [2,3,5,7,11,13,17,19];

function runLevel(upto, pNext){
  const PR = ALL.slice(0, ALL.indexOf(upto)+1);
  const P = PR.reduce((a,b)=>a*b,1);
  const L = pNext*pNext;
  const absF = (a) => {
    let m = 1;
    for (const p of PR){
      const k = a % p;
      if (p === 2) m *= 1/2;
      else if (k === 0) m *= (p-2)/p;
      else m *= Math.abs(2*Math.cos(2*Math.PI*k/p))/p;
    }
    return m;
  };
  const absK = (a) => {
    const x = Math.PI*a/P, s = Math.sin(x);
    return Math.abs(s) < 1e-12 ? L : Math.abs(Math.sin(x*L)/s);
  };
  let certified = 0; const top = [];
  for (let a = 1; a < P; a++){
    certified += absF(a)*absK(a);
    const f = absF(a);
    if (top.length < 6 || f > top[top.length-1].f){
      top.push({a, f}); top.sort((x,y)=>y.f-x.f); if (top.length > 6) top.pop();
    }
  }
  const A = new Uint8Array(P); A.fill(1);
  for (const p of PR){ for (let j=0;j<P;j+=p) A[j]=0; for (let j=((p-2)%p+p)%p;j<P;j+=p) A[j]=0; }
  let N=0; for (let i=0;i<L;i++) N += A[i%P];
  let D=1; for (const p of PR) if (p>2) D *= p-2;
  const mu = D*L/P; let maxDev = 0;
  for (let t=0;t<P;t++){ maxDev = Math.max(maxDev, Math.abs(N-mu)); N += A[(t+L)%P]-A[t]; }
  console.log(`p=${upto}  P=${P}  L=${L}  mu=${mu.toFixed(2)}  trueMaxDev=${maxDev.toFixed(2)}  certified=${certified.toFixed(1)}  certified/mu=${(certified/mu).toFixed(2)}  loss=${(certified/maxDev).toFixed(1)}x  |F(1)|=${absF(1).toExponential(1)}`);
  console.log('  top |F| freqs: ' + top.map(({a,f}) => {
    const divs = PR.filter(p=>a%p===0);
    return `a=${a}[÷${divs.join(',')||'-'}]=${f.toExponential(1)}`;
  }).join('  '));
}
runLevel(11, 13);
runLevel(13, 17);
runLevel(17, 19);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-04-fourier-budget.js
//   invocation:  node research/attack-04-fourier-budget.js
//   code-sha256: 456785279af8730f3009e3b3fa5eee83fda82b9c88624b11960ac6493afb9a24
//   out-sha256:  f78e7186393b83df5c02e6a2f4d79eb4cdba08f6ce2c8922bbacb19b5512fa0b
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.4 s
// ============================================================================
// p=11  P=2310  L=169  mu=9.88  trueMaxDev=2.88  certified=11.7  certified/mu=1.19  loss=4.1x  |F(1)|=5.6e-4
//   top |F| freqs: a=770[÷2,5,7,11]=5.8e-2  a=1925[÷5,7,11]=5.8e-2  a=1155[÷3,5,7,11]=5.8e-2  a=385[÷5,7,11]=5.8e-2  a=1540[÷2,5,7,11]=5.8e-2  a=308[÷2,7,11]=3.2e-2
// p=13  P=30030  L=289  mu=14.29  trueMaxDev=4.71  certified=27.3  certified/mu=1.91  loss=5.8x  |F(1)|=7.6e-5
//   top |F| freqs: a=10010[÷2,5,7,11,13]=4.9e-2  a=25025[÷5,7,11,13]=4.9e-2  a=15015[÷3,5,7,11,13]=4.9e-2  a=5005[÷5,7,11,13]=4.9e-2  a=20020[÷2,5,7,11,13]=4.9e-2  a=13013[÷7,11,13]=2.7e-2
// p=17  P=510510  L=361  mu=15.75  trueMaxDev=6.75  certified=61.6  certified/mu=3.91  loss=9.1x  |F(1)|=8.4e-6
//   top |F| freqs: a=85085[÷5,7,11,13,17]=4.4e-2  a=340340[÷2,5,7,11,13,17]=4.4e-2  a=255255[÷3,5,7,11,13,17]=4.4e-2  a=170170[÷2,5,7,11,13,17]=4.4e-2  a=425425[÷5,7,11,13,17]=4.4e-2  a=238238[÷2,7,11,13,17]=2.4e-2
// READINGS.
// 1. SMOOTH CONSPIRACIES ARE DEAD: |F(1)| ~ 2^n/P — any slow, long-wavelength
//    depletion of a region is impossible; every prime attenuates it by ~2/p.
//    A conspiracy must be built from HIGH-frequency, wheel-structured modes.
// 2. THE DOMINANT MODES ARE THE RIGID PART: twin slots are perfectly periodic
//    mod 6 (r ≡ 5 mod 6), so the mod-2/mod-3 combs carry density-sized
//    amplitude — but they are DETERMINISTIC, known exactly, harmless. The
//    "random" part (p >= 5) has exponentially small individual modes.
// 3. ⚠ THIS READING IS THE INVALIDATED COLUMN. Every figure in it comes from
//    the "certified" column the banner at the top of this file disowns, so the
//    growth rate and the near-miss percentage below are both void. The
//    corrected artifact natal-cap-02-fourier-budget.js reverses the
//    conclusion: at x = 11 even an exact per-prime oracle fails (cap 117.3
//    against a census of 90), the per-prime union bound is structurally dead
//    from there on, and the nearest approach is 15% at x = 7, which is moot.
//    Kept unedited below.
//    THE FOURIER WALL GROWS LIKE ~2^n, NOT 3^n: certified/mu = 1.19, 1.91,
//    3.91 (~x2 per prime). Better bookkeeping than Legendre inclusion-
//    exclusion by (3/2)^n — and at p=11 the bound came within 18% of
//    certifying the zone non-empty (11.7 vs mu 9.88). Parity still wins
//    asymptotically, but the L^infinity route is measurably the tighter one.
//    Open follow-up: smarter kernels (Selberg/Beurling instead of the sharp
//    window) shrink the budget further — how many more levels can be
//    certified outright?
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// BORROWED, verified present in the named producer's embedded OUTPUT: the cap
//   117.3 at x = 11 is research/natal-cap-02-fourier-budget.js's, and the
//   reading quotes it as that file's result.
// ---------------------------------------------------------------------------
