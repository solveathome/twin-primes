// ============================================================================
// thm-buchstab-transfer-shallow.js  —  SCRATCHPAD-GRADE companion to
// research/history/staging/thm-buchstab-transfer-shallow.md
//
// NOT embedded, NOT qc-gated, NOT a repo artifact. Every number it prints is
// [SCRATCHPAD-GRADE] and may not be quoted outside that note until it is
// re-derived inside an embedded producer in research/.
//
// It answers four arithmetic questions the note needs and nothing else:
//   (1) how big is the dimension-1 Buchstab correction e^gamma*omega(u) - 1
//       as a function of u  (this is what the engine's B is built from);
//   (2) the Mertens constant K in the fundamental lemma's hypothesis
//       prod_{w<=p<z}(1-h(p))^{-1} <= K (log z/log w)^kappa  for h(p)=2/p, p>=7,
//       hence the explicit threshold s > 9k + 10 ln K + ln(1/delta);
//   (3) the sifting parameter s = ln D / ln q actually available to the
//       conditioned ensemble at the SHALLOWEST scour prime of each level;
//   (4) the engine's own denominator <omega(ln n/ln x)> e^gamma at each level.
//
//   node research/history/staging/thm-buchstab-transfer-shallow.js   (~1 s)
// ============================================================================
'use strict';
const GAMMA = 0.5772156649015329, EG = Math.exp(GAMMA), EMG = Math.exp(-GAMMA);

// ---- Buchstab omega, independent of natal-cap-28's grid ---------------------
const H = 1/8192, UMAX = 30, NG = Math.round((UMAX-1)/H), OM = new Float64Array(NG+1);
{ for (let i=0;i<=NG;i++){ const u=1+i*H; OM[i] = u<=2 ? 1/u : 0; }
  const i2 = Math.round(1/H); let g = 2*OM[i2];
  for (let i=i2+1;i<=NG;i++){ g += H*(OM[i-1-i2]+OM[i-i2])/2; OM[i] = g/(1+i*H); } }
function omega(u){ if(u<=1) return 0; if(u>=UMAX) return EMG;
  const t=(u-1)/H, i=Math.floor(t), f=t-i; return i>=NG?OM[NG]:OM[i]*(1-f)+OM[i+1]*f; }

console.log('SEC 0  sanity of the omega grid');
console.log('  omega(2)          =', omega(2).toFixed(12), ' exact 0.5');
console.log('  omega(3)          =', omega(3).toFixed(12), ' exact (1+ln2)/3 =', ((1+Math.LN2)/3).toFixed(12));
console.log('  omega(28)         =', omega(28).toFixed(12), ' limit e^-gamma =', EMG.toFixed(12));
console.log('  e^gamma*omega(2)  =', (EG*omega(2)).toFixed(6), ' (the header\'s 0.890)');
console.log('  e^gamma*omega(3)  =', (EG*omega(3)).toFixed(6), ' (>1: the header\'s mid-curve bump)');

console.log('\nSEC 1  size of the dimension-1 correction  c(u) = e^gamma*omega(u) - 1');
console.log('   u        c(u)');
for (const u of [2,2.5,3,3.5,4,5,6,7,8,10,12,15,19,23])
  console.log('  ' + u.toFixed(1).padStart(5) + '   ' + (EG*omega(u)-1).toExponential(3));

// ---- Mertens constant K for h(p) <= 2/p on p>=7 (h=0 for p<7) --------------
// hypothesis (iii) of the fundamental lemma: prod_{w<=p<z}(1-h(p))^{-1}
//   <= K (log z/log w)^kappa  for ALL z >= w >= 2, kappa = 2.
// The product is over the half-open range, so the sup is approached at
// z -> w^+ with w the first sifting prime: K >= (1-2/7)^{-1} = 7/5.
const LIM = 200000;
const sieve = new Uint8Array(LIM+1), P = [];
for (let i=2;i<=LIM;i++){ if(!sieve[i]){ P.push(i); for(let j=i*i;j<=LIM;j+=i) sieve[j]=1; } }
const NP = P.length, cum = new Float64Array(NP+1);
for (let i=0;i<NP;i++) cum[i+1] = cum[i] + (P[i]>=7 ? -Math.log(1-2/P[i]) : 0);
let bestK = 0, bw = 0, bz = 0;
for (let a=0;a<Math.min(NP,3000);a++){
  const lw = Math.log(P[a]);
  for (let b=a;b<NP;b++){                        // z just above P[b]: product closes on P[b]
    const r = Math.exp(cum[b+1]-cum[a]) / Math.pow(Math.log(P[b])/lw, 2);
    if (r > bestK){ bestK = r; bw = P[a]; bz = P[b]; }
  }
}
console.log('\nSEC 2  fundamental-lemma hypothesis constant, kappa = 2');
console.log('  K = sup prod_{w<=p<z}(1-2/p)^{-1} / (ln z/ln w)^2, sup over z >= w >= 2');
console.log('  K =', bestK.toFixed(6), ' attained at w =', bw, ', z ->', bz + '^+   (7/5 =', (7/5).toFixed(6) + ')');
const kappa = 2;
for (const delta of [0.5,0.1,0.01,0.001]){
  const s2 = 9*kappa + 10*Math.log(bestK) + Math.log(1/delta);
  console.log('  relative error <= ' + String(delta).padEnd(6) + ' needs s >= max(9k+1, ' +
    s2.toFixed(2) + ') = ' + Math.max(9*kappa+1, s2).toFixed(2));
}

// ---- level table: the s actually available at the shallowest scour prime ----
console.log('\nSEC 3  the sifting parameter available to the conditioned ensemble');
console.log('  x = level, W = x#, q0 = least scour prime (> x), T = W/q0,');
console.log('  s_head = ln T / ln q0 (level D = T; the true s is (1-eps) times this),');
console.log('  u_top  = ln W / ln x = the largest u in the engine\'s omega-average at K = 0,');
console.log('  <om>x  = e^gamma * <omega(ln n/ln x)> over n in [q0^2, W], weight 1/ln(n/q0).');
console.log('    x     ln W     q0     s_head    u_top    <om>x');
for (const x of [13,17,19,23,29,37,41,53,97]){
  let lnW = 0; for (const p of P){ if(p>x) break; lnW += Math.log(p); }
  let q0 = 0; for (const p of P){ if(p>x){ q0 = p; break; } }
  const lnq0 = Math.log(q0), lnT = lnW - lnq0;
  const sHead = lnT/lnq0, uTop = lnW/Math.log(x);
  // engine's own average, same NB=24 midpoint rule, same weight
  const NB = 24, lo = 2*lnq0; let num = 0, den = 0;
  for (let b=0;b<NB;b++){
    // n uniform in [q0^2, W]; work with ln n via the linear-in-n midpoints
    const frac = (b+0.5)/NB;
    const lnn = Math.log(Math.exp(lo) + (Math.exp(lnW)-Math.exp(lo))*frac);
    const w = 1/Math.max(0.5, lnn - lnq0);
    num += w*omega(lnn/Math.log(x)); den += w;
  }
  console.log('  ' + String(x).padStart(3) + '  ' + lnW.toFixed(3).padStart(7) + '  ' +
    String(q0).padStart(5) + '  ' + sHead.toFixed(3).padStart(7) + '  ' +
    uTop.toFixed(3).padStart(7) + '  ' + (EG*num/den).toFixed(6).padStart(9));
}
console.log('\n  Threshold comparison: the explicit fundamental lemma at kappa = 2 needs');
console.log('  s >= 22.06 for a 50% guarantee. s_head reaches 17.14 at @97 and is below');
console.log('  the threshold at every level in the table.');

// ---- SEC 4: where the theorem's hypothesis is non-empty --------------------
// hypothesis: s = ln(T)/ln(q) >= s*, T = W/q, so ln q <= ln W/(1+s*).
console.log('\nSEC 4  the band of scour primes the shallow theorem reaches');
console.log('  q <= W^{1/(1+s*)}, against a scour that runs to W^{1/2}.');
const thL = [['50% guarantee', 22.06], ['1% guarantee', 25.97]];
{
  const th = new Float64Array(P.length+1);
  for (let i=0;i<P.length;i++) th[i+1] = th[i] + Math.log(P[i]);
  for (const [name, sStar] of thL){
    let first = 0;
    for (let i=0;i<P.length-1;i++){
      const lnW = th[i+1], lnq0 = Math.log(P[i+1]);
      if ((lnW - lnq0)/lnq0 >= sStar){ first = P[i]; break; }
    }
    console.log('  ' + name.padEnd(14) + ' s* = ' + sStar.toFixed(2) +
      ':  least level with a non-empty band  x = ' + first);
  }
  console.log('    x      ln W    ln q_max(50%)  ln q_max(1%)   frac of [ln x, ln sqrt(W)] at 50%');
  for (const x of [97,199,499,1009,10007]){
    let i = P.indexOf(x); if (i < 0) continue;
    const lnW = th[i+1], lnx = Math.log(x);
    const a = lnW/(1+22.06), b = lnW/(1+25.97);
    const frac = (a - lnx)/(lnW/2 - lnx);
    console.log('  ' + String(x).padStart(6) + '  ' + lnW.toFixed(2).padStart(8) + '  ' +
      a.toFixed(3).padStart(12) + '  ' + b.toFixed(3).padStart(12) + '  ' +
      (frac<=0 ? '   empty' : (100*frac).toFixed(2) + '%').padStart(12));
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/thm-buchstab-transfer-shallow.js
//   invocation:  node research/history/staging/thm-buchstab-transfer-shallow.js
//   code-sha256: ee4e90c344b16b755c84423bbd1abda752aa03522a59391b7c14217a462591a5
//   out-sha256:  cb5eeef85d9acd47fe5631a4cfb08d60e382d1e2a477031ad80447f969e99b42
//   body-lines:  62
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.7 s
// ============================================================================
// SEC 0  sanity of the omega grid
//   omega(2)          = 0.500000000000  exact 0.5
//   omega(3)          = 0.564382393830  exact (1+ln2)/3 = 0.564382393520
//   omega(28)         = 0.561459483783  limit e^-gamma = 0.561459483567
//   e^gamma*omega(2)  = 0.890536  (the header's 0.890)
//   e^gamma*omega(3)  = 1.005206  (>1: the header's mid-curve bump)
//
// SEC 1  size of the dimension-1 correction  c(u) = e^gamma*omega(u) - 1
//    u        c(u)
//     2.0   -1.095e-1
//     2.5   1.294e-3
//     3.0   5.206e-3
//     3.5   -1.123e-3
//     4.0   -2.212e-6
//     5.0   -8.932e-6
//     6.0   3.588e-7
//     7.0   -4.736e-9
//     8.0   3.306e-10
//    10.0   3.884e-10
//    12.0   3.879e-10
//    15.0   3.871e-10
//    19.0   3.865e-10
//    23.0   3.861e-10
//
// SEC 2  fundamental-lemma hypothesis constant, kappa = 2
//   K = sup prod_{w<=p<z}(1-2/p)^{-1} / (ln z/ln w)^2, sup over z >= w >= 2
//   K = 1.400000  attained at w = 7 , z -> 7^+   (7/5 = 1.400000)
//   relative error <= 0.5    needs s >= max(9k+1, 22.06) = 22.06
//   relative error <= 0.1    needs s >= max(9k+1, 23.67) = 23.67
//   relative error <= 0.01   needs s >= max(9k+1, 25.97) = 25.97
//   relative error <= 0.001  needs s >= max(9k+1, 28.27) = 28.27
//
// SEC 3  the sifting parameter available to the conditioned ensemble
//   x = level, W = x#, q0 = least scour prime (> x), T = W/q0,
//   s_head = ln T / ln q0 (level D = T; the true s is (1-eps) times this),
//   u_top  = ln W / ln x = the largest u in the engine's omega-average at K = 0,
//   <om>x  = e^gamma * <omega(ln n/ln x)> over n in [q0^2, W], weight 1/ln(n/q0).
//     x     ln W     q0     s_head    u_top    <om>x
//    13   10.310     17    2.639    4.020   1.000508
//    17   13.143     19    3.464    4.639   0.999962
//    19   16.088     23    4.131    5.464   1.000005
//    23   19.223     29    4.709    6.131   1.000000
//    29   22.590     31    5.578    6.709   1.000000
//    37   29.635     41    6.980    8.207   1.000000
//    41   33.349     43    7.867    8.980   1.000000
//    53   44.931     59   10.019   11.317   1.000000
//    97   83.728    101   17.142   18.302   1.000000
//
//   Threshold comparison: the explicit fundamental lemma at kappa = 2 needs
//   s >= 22.06 for a 50% guarantee. s_head reaches 17.14 at @97 and is below
//   the threshold at every level in the table.
//
// SEC 4  the band of scour primes the shallow theorem reaches
//   q <= W^{1/(1+s*)}, against a scour that runs to W^{1/2}.
//   50% guarantee  s* = 22.06:  least level with a non-empty band  x = 131
//   1% guarantee   s* = 25.97:  least level with a non-empty band  x = 151
//     x      ln W    ln q_max(50%)  ln q_max(1%)   frac of [ln x, ln sqrt(W)] at 50%
//       97     83.73         3.631         3.105         empty
//      199    188.56         8.177         6.992         3.24%
//      499    474.55        20.579        17.596         6.22%
//     1009    963.16        41.768        35.712         7.34%
//    10007   9905.20       429.540       367.267         8.50%
// ============================================================================
// READINGS
// ============================================================================
