// ============================================================================
// Supporting numerics for paper/variance-note.md
// Fano factor Var/E of twin-candidate window counts via the exact formula
// (Theorems 1-2 of the note). Modes: check | limit | ucurve
// ============================================================================
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const ALLP = primesUpTo(3000);

function fano(y, L){
  const P = ALLP.filter(p=>p<=y);
  let delta = 0.5;
  for (const p of P) if (p>2) delta *= (p-2)/p;
  let corr = 0;
  for (let d = 6; d < L; d += 6){          // J(d)=0 unless 6|d
    let J = 0.5;
    for (const p of P){
      if (p === 2) continue;
      const m = d % p;
      if (m === 0) J *= (p-2)/p;
      else if (m === 2 || m === p-2) J *= (p-3)/p;
      else J *= (p-4)/p;
    }
    corr += (L - d) * J;
  }
  const Var = L*delta + 2*corr - delta*delta*L*L;
  return { E: delta*L, Var, fano: Var/(delta*L) };
}

const mode = process.argv[2] || 'ucurve';
if (mode === 'check'){
  const r = fano(97, 101*101);
  console.log(`check p=97 L=10201: E=${r.E.toFixed(1)} Var=${r.Var.toFixed(1)} fano=${r.fano.toFixed(3)} (research/06: 195.3/48.1/0.246)`);
} else if (mode === 'limit'){
  for (const y of [97, 199, 401, 797, 1009, 1499, 2003]){
    const r = fano(y, y*y);
    console.log(`u=2  y=${y}  E=${r.E.toFixed(1)}  fano=${r.fano.toFixed(4)}`);
  }
} else {
  for (const y of [199, 401]){
    for (const u of [0.6, 0.8, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0]){
      const L = Math.round(Math.pow(y, u));
      if (L < 12) continue;
      const r = fano(y, L);
      console.log(`y=${y}  u=${u}  L=${L}  E=${r.E.toFixed(1)}  fano=${r.fano.toFixed(4)}`);
    }
  }
}

// ============================================================================
// OUTPUT (2026-08-13):
// check p=97 L=10201: E=195.3 Var=48.1 fano=0.246  ✓ matches research/06
//
// limit (u=2, L=y^2):
//   y=97:0.2507  199:0.2814  401:0.2900  797:0.3031  1009:0.3074
//   y=1499:0.3167  2003:0.3206          <- still rising, NOT converged
//
// ucurve (y=401): u=0.6:0.845  0.8:0.778  1:0.685  1.25:0.581  1.5:0.477
//   1.75:0.380  2:0.290  2.25:0.215  2.5:0.157  2.75:0.110  3:0.076
//   (y=199 within ~0.02 of these at every u)
// Empirical shape: ln Fano ≈ -(0.24 u^2 + 0.13 u) at y=401 — F(0)=1 exact,
// Gaussian-in-u decay; coefficients drift slowly with y. See the note §6.
// ============================================================================