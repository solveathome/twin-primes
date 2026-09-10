// ============================================================================
// ATTACK — A LEVEL-UNIFORM UPPER BOUND ON max VR (2026-08-26)
// ============================================================================
// WHY THIS FILE EXISTS. `README.md` §Status names one thing as the blocker on
// the all-x form of the X-limitation theorem: "the all-x form is open for want
// of a level-uniform bound on max VR". `natal-cap-31-calm-vs-kill.md` boxes it
// as the Loudness Ceiling Conjecture, max_t VR(t) < S̄²/(K·V̄) for every x ≥ 13,
// supported at exactly four levels by EXHAUSTIVE ENUMERATION of the rotation
// ensemble (2,310 / 30,030 / 510,510 / 9,699,690 rotations) and nowhere else.
// This file attacks the bound and, on the way, audits what else the all-x form
// needs that the Status sentence does not name.
//
// THE OBJECTS, EXACTLY AS THE ENUMERATORS DEFINE THEM (cap-31, cap-38).
//   Level x. Tile W = 30·∏_{7≤p≤x} p. Natal set ρ = {r ∈ [0,W) : r ≡ 11 or 17
//   (mod 30), and r ≢ 0, −2 (mod p) for every 7 ≤ p ≤ x}; N̄ = |ρ|.
//   Scour primes qs = {q prime : x < q, q² ≤ W}; K = |qs|; H = Σ_q 2/q.
//   Class counts n_q(a) = #{r ∈ ρ : r ≡ a (mod q)}.
//   CLASS DEVIATION   dev_q(a) = n_q(a) + n_q(a−2) − 2N̄/q.
//   PER-PRIME ROTATION VARIANCE   V̄_q = (1/q)·Σ_{a mod q} dev_q(a)² ;
//   V̄ = Σ_q V̄_q.
//   LOUDNESS   VR(t) = ( Σ_q dev_q(t mod q)² ) / V̄ ,  t ∈ [0,W).
//   max VR = max over the W rotations. Strike surplus D(t) = Σ_q dev_q(t mod q),
//   so Cauchy–Schwarz gives |D(t)| ≤ √(K·V̄·VR(t)) — cap-31's L2 — and the
//   per-level hypothesis carrying the X-limitation theorem is exactly
//   √(K·V̄·max VR) < S̄, i.e. max VR < S̄²/(K·V̄).
//
// WHAT THIS FILE ADDS, AS A ONE-LINE THEOREM.
//   (T1) ALIGNMENT BOUND. For every level x,
//          max_t VR(t) ≤ A(x) := ( Σ_q max_a dev_q(a)² ) / V̄ ,
//        because VR(t) sums one class per prime and each summand is at most
//        that prime's own maximum. A(x) needs NO rotation sweep: it is K
//        independent per-prime maxima, O(N̄·K) work, so it is computable at
//        levels where the ensemble cannot be walked. It is loose by exactly the
//        amount by which no single rotation can maximise every prime at once.
//   (T2) V̄-FREE FORM. The theorem's hypothesis √(K·V̄·max VR) < S̄ is, after
//        multiplying out, K·max_t Σ_q dev_q(t mod q)² < S̄². So V̄ cancels and
//        a sufficient condition is  K · Σ_q max_a dev_q(a)² < S̄² .  This
//        removes V̄ — and with it any need for a LOWER bound on V̄ — from the
//        all-x problem.
//   (T3) The remaining need is an upper bound on max_a dev_q(a)², uniform in q
//        and in x. Three candidates are priced here, all three deterministic:
//        (a) TRIVIAL CLASS BOUND: n_q(a) ≤ 2⌈W/(30q)⌉ from the mod-30 comb
//            alone, so |dev_q(a)| ≤ max( (2/q)(2W/30 − N̄) + 4 , 2N̄/q ).
//        (b) MOMENT BOUND: max_a dev² ≤ (q·μ_{2m}(q))^{1/m} for every m ≥ 1,
//            μ_{2m}(q) = (1/q)Σ_a dev_q(a)^{2m}. Minimised over m ≤ 8. Gaussian
//            moments would give ≈ 2 ln q · V̄_q; this measures the truth.
//        (c) COMPLETED-SUM (FOURIER) CERTIFICATE. n_q(a) is a window count of a
//            DILATE of the natal comb: r = a + jq, j ∈ [0,L), L = ⌈W/q⌉, and
//            1_ρ(a+jq) has the natal spectrum permuted by k ↦ q^{-1}k. So the
//            usual incomplete-sum bound needs a majorant invariant under that
//            permutation. |Ŝ(k)| = 2|cos(πu₃₀/5)|·∏_p f_p(u_p), u_m = k·y_m
//            mod m with y_m = (W/m)^{-1} mod m (the CRT twist wall-note §Door 2
//            records an earlier file for dropping), f_p(0) = p−2 and
//            f_p(u) = 2|cos(2πu/p)| otherwise. Since u_p = 0 ⟺ p | k, the
//            majorant  B(k) = 2·∏_{7≤p≤x} (p | k ? p−2 : 2)  dominates |Ŝ(k)|
//            AND is invariant under k ↦ qk for q coprime to W. Hence, for every
//            scour q and every class a,
//              |n_q(a) − N̄/q| ≤ 1 + (1/W)·Σ_{k≠0} B(k)·min(L, W/(4|k|_W)),
//            using |Σ_{j<L} e(jk/W)| ≤ min(L, 1/(2|sin πk/W|)) ≤ min(L, W/(4|k|_W)).
//            This is a genuine per-level theorem with no enumeration in it.
//
// PREDICTIONS ON RECORD, formed before this file was first run:
//   P1 A(x) ≥ max VR at all four enumerated levels (a correctness check; a FAIL
//      is a bug, not a finding).
//   P2 A(x) is far below the threshold S̄²/(K·V̄) at @13 and above, so (T2)
//      re-proves the X-limitation theorem at those levels without enumeration
//      and extends it to @23, where max VR has never been enumerated.
//   P3 A(x) grows slowly, on the order of ln W, since a max over q classes of a
//      mean-zero quantity should sit near √(2 ln q) standard deviations.
//   P4 The trivial class bound (a) is dead by orders of magnitude, because the
//      true dev_q is far below the class-size scale N̄/q.
//   P5 The completed-sum certificate (c) is dominated by the 3^{π(x)−3} shape
//      of Σ_k B(k)/k and is therefore also dead at every computable level, with
//      the crossing where 9^{π(x)−3} falls below W pushed out past x = 60.
//   P6 The moment bound (b) tracks A(x) within a small factor, which would name
//      the moments μ_{2m}(q) as the concrete object a level-uniform proof needs.
// ============================================================================
'use strict';
const T00 = Date.now();
const f = (v, d = 3) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const e2 = (v) => Number.isFinite(v) ? v.toExponential(3) : String(v);
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function inv(a,m){let r0=((a%m)+m)%m,r1=m,s0=1,s1=0;
  while(r1!==0){const q=Math.floor(r0/r1);[r0,r1]=[r1,r0-q*r1];[s0,s1]=[s1,s0-q*s1];}
  return ((s0%m)+m)%m;}

// The four enumerated levels. Custody targets, taken from the EMBEDDED output
// block of `natal-cap-38-loudness-driver.js` (its four level banners give W, N,
// K, H, V̄; its PART B/summary give S̄ and max VR) and from
// `natal-cap-31-calm-vs-kill.md` §Theorem 2. Every one is recomputed below and
// the comparison is printed.
//   NOTE, and it cost a run: the first version of this table read V̄ = 15.03 /
//   120.24 / 1146.19 at @11/@13/@17, taken from cap-31's "Var split D + X −
//   2Cov" row. That row's first entry is Var(D), NOT V̄. Var(D) = Var(Σ_q dev_q)
//   carries the cross-prime covariances; V̄ = Σ_q Var_q does not. They agree to
//   about 0.2% here and are different objects. cap-38's banners are the right
//   source and this file reproduces them to the digit.
const KNOWN = {
  11:{maxVR:2.777, Vbar:15.07,   Sbar:38.24,    K:10,  N:90},
  13:{maxVR:2.352, Vbar:119.58,  Sbar:310.88,   K:34,  N:990},
  17:{maxVR:2.143, Vbar:1144.40, Sbar:3614.93,  K:120, N:14850},
  19:{maxVR:2.293, Vbar:8944.60, Sbar:49238.76, K:435, N:252450},
};
const SWEEP_MAX_W = 1e7;      // full rotation walk only where it is affordable
const MOMENTS = 8;            // μ_2 … μ_16

// ---------------------------------------------------------------- level build
function buildLevel(x){
  const basePs = primesUpTo(x).filter(p=>p>=7);
  const W = 30*basePs.reduce((a,b)=>a*b,1);
  let ind = new Uint8Array(W);
  for(let r=11;r<W;r+=30) ind[r]=1;
  for(let r=17;r<W;r+=30) ind[r]=1;
  for(const p of basePs){ for(let j=0;j<W;j+=p) ind[j]=0; for(let j=p-2;j<W;j+=p) ind[j]=0; }
  let cnt=0; for(let r=0;r<W;r++) if(ind[r]) cnt++;
  const rho = new Int32Array(cnt); {let i=0; for(let r=0;r<W;r++) if(ind[r]) rho[i++]=r;}
  ind = null;
  const gaps = new Int32Array(cnt); {let prev=0,mg=0;
    for(let i=0;i<cnt;i++){const g=rho[i]-prev; gaps[i]=g; if(g>mg)mg=g; prev=rho[i];}
    gaps.maxGap = mg;}
  const qs = primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x && q*q<=W);
  const H = qs.reduce((a,q)=>a+2/q,0);
  return {x, W, rho, N:cnt, gaps, maxGap:gaps.maxGap, qs, K:qs.length, H, basePs, y:qs[qs.length-1]};
}

// ------------------------------------- per-prime class deviations and moments
// Returns, per scour prime q: V̄_q = μ_2, M_q = max_a dev², maxAbs, the even
// moments μ_{2m} up to m = MOMENTS, and (when asked) the dev² row for the sweep.
function classStats(L, keepRows){
  const {rho,N,gaps,maxGap,qs,K,y} = L;
  const n = new Int32Array(y+1);
  const Vq = new Float64Array(K), Mq = new Float64Array(K), maxAbs = new Float64Array(K);
  const mom = []; for(let m=0;m<MOMENTS;m++) mom.push(new Float64Array(K));
  const rows = keepRows ? [] : null;
  for(let j=0;j<K;j++){
    const q = qs[j];
    n.fill(0,0,q);
    let c = 0;
    if(q>maxGap){ for(let i=0;i<N;i++){ c+=gaps[i]; if(c>=q)c-=q; n[c]++; } }
    else        { for(let i=0;i<N;i++){ c=(c+gaps[i])%q; n[c]++; } }
    const mu = 2*N/q;
    const row = keepRows ? new Float64Array(q) : null;
    let ss=0, M=0, ma=0;
    const acc = new Float64Array(MOMENTS);
    for(let a=0;a<q;a++){
      const a2 = a>=2 ? a-2 : a+q-2;
      const d = n[a]+n[a2]-mu, d2 = d*d;
      if(row) row[a]=d2;
      ss += d2; if(d2>M)M=d2; const ad=Math.abs(d); if(ad>ma)ma=ad;
      let pw = d2;
      for(let m=0;m<MOMENTS;m++){ acc[m]+=pw; pw*=d2; }
    }
    Vq[j]=ss/q; Mq[j]=M; maxAbs[j]=ma;
    for(let m=0;m<MOMENTS;m++) mom[m][j]=acc[m]/q;
    if(rows) rows.push(row);
  }
  return {Vq, Mq, maxAbs, mom, rows};
}

// ------------------------------------------- exact max VR over all rotations
function sweepMaxVR(L, rows, Vbar){
  const {W,qs,K} = L;
  const vsum = new Float64Array(W);
  for(let j=0;j<K;j++){
    const row = rows[j], q = row.length;
    for(let t=0,a=0;t<W;t++){ vsum[t]+=row[a]; if(++a===q)a=0; }
  }
  let vmax=-1, targ=-1, tot=0;
  for(let t=0;t<W;t++){ const v=vsum[t]; tot+=v; if(v>vmax){vmax=v;targ=t;} }
  return {maxVR:vmax/Vbar, VR0:vsum[0]/Vbar, meanVR:tot/W/Vbar, targ};
}

// ------------------------------------------------- S̄ by cap-38's exact identity
// Σ_t S(t) = Σ_{r∈ρ} (P[r+W] − P[r]), P the prefix sum of g over u ∈ [−W+1,W−1],
// g(u) = 1 iff u ≢ 0, −2 (mod q) for every scour q, index idx = u + W − 1.
function meanS(L){
  const {W,rho,N,qs} = L;
  const M = 2*W-1;
  const g = new Uint8Array(M); g.fill(1);
  for(const q of qs){
    // u ≡ 0 (mod q):  idx ≡ W−1 (mod q);  u ≡ −2 (mod q): idx ≡ W−3 (mod q)
    let s0 = ((W-1)%q+q)%q; for(let i=s0;i<M;i+=q) g[i]=0;
    let s1 = ((W-3)%q+q)%q; for(let i=s1;i<M;i+=q) g[i]=0;
  }
  // two-pointer prefix: ρ is sorted, so the 2N̄ query points r and r+W are two
  // sorted streams; walk idx once, no prefix array.
  const need = new Float64Array(2*N);
  let run=0, ia=0, ib=0;
  for(let i=0;i<=M;i++){
    while(ia<N && rho[ia]===i){ need[ia]= -run; ia++; }
    while(ib<N && rho[ib]+W===i){ need[N+ib]= run; ib++; }
    if(i<M) run += g[i];
  }
  while(ib<N){ need[N+ib]=run; ib++; }
  let tot=0; for(let i=0;i<N;i++) tot += need[N+i]+need[i];
  return tot/W;
}

// --------------------------------- the completed-sum certificate, majorant B(k)
// One pass over k = 1 .. ⌊W/2⌋ carrying u_m = k·y_m mod m incrementally.
// Accumulates, for the K cut points κ = ⌊W/(4L_q)⌋ (all ≤ √W/4):
//   P1[κ] = Σ_{k≤κ} B(k)      and    P2[κ] = Σ_{k≤κ} B(k)/k,
// plus TOT2 = Σ_{k≤W/2} B(k)/k. Then
//   Cb(L) = (2/W)·( L·P1[κ] + (W/4)·(TOT2 − P2[κ]) ),  κ = ⌊W/(4L)⌋.
// The same pass carries the TRUE spectrum |Ŝ(k)| for comparison (not a uniform
// bound — the dilation permutes |Ŝ| — printed only to price the majorant).
function certificate(L){
  const {W,basePs,qs,K} = L;
  const mods = [30].concat(basePs);
  const yv = mods.map(m=>inv((W/m)%m, m));
  const tbl = mods.map((m,i)=>{
    const t = new Float64Array(m);
    if(m===30){ for(let u=0;u<30;u++) t[u]=2*Math.abs(Math.cos(Math.PI*u/5)); }
    else { t[0]=m-2; for(let u=1;u<m;u++) t[u]=2*Math.abs(Math.cos(2*Math.PI*u/m)); }
    return t;
  });
  const bmaj = mods.map((m,i)=>{
    const t = new Float64Array(m);
    if(m===30){ t.fill(2); } else { t[0]=m-2; for(let u=1;u<m;u++) t[u]=2; }
    return t;
  });
  const KCUT = Math.floor(Math.sqrt(W)/4)+3;
  const P1 = new Float64Array(KCUT+1), P2 = new Float64Array(KCUT+1);
  const P1s = new Float64Array(KCUT+1), P2s = new Float64Array(KCUT+1);
  const u = mods.map(()=>0);
  let TOT2=0, TOT2s=0, s1=0, s2=0, s1s=0, s2s=0;
  const half = Math.floor(W/2);
  for(let k=1;k<=half;k++){
    let B=1, S=1;
    for(let i=0;i<mods.length;i++){
      let uu = u[i]+yv[i]; if(uu>=mods[i]) uu-=mods[i]; u[i]=uu;
      B *= bmaj[i][uu]; S *= tbl[i][uu];
    }
    TOT2 += B/k; TOT2s += S/k;
    if(k<=KCUT){ s1+=B; s2+=B/k; s1s+=S; s2s+=S/k; P1[k]=s1; P2[k]=s2; P1s[k]=s1s; P2s[k]=s2s; }
  }
  const Cb = new Float64Array(K), Cs = new Float64Array(K);
  for(let j=0;j<K;j++){
    const q=qs[j], Lw = Math.ceil(W/q);
    let kap = Math.floor(W/(4*Lw)); if(kap>KCUT) kap=KCUT; if(kap<0) kap=0;
    Cb[j] = (2/W)*( Lw*P1[kap] + (W/4)*(TOT2 - P2[kap]) ) + 1;
    Cs[j] = (2/W)*( Lw*P1s[kap] + (W/4)*(TOT2s - P2s[kap]) ) + 1;
  }
  return {Cb, Cs, TOT2, TOT2s};
}

// ============================================================================
// DRIVER
// ============================================================================
const LEVELS = [11,13,17,19,23];
const ROWS = [];
console.log('===== DEFINITIONS: dev_q(a) = n_q(a)+n_q(a−2) − 2N̄/q ; V̄_q = mean_a dev_q(a)² ;');
console.log('      VR(t) = Σ_q dev_q(t mod q)² / V̄ ; A(x) = Σ_q max_a dev_q(a)² / V̄ ≥ max_t VR(t).');

for(const x of LEVELS){
  const t0 = Date.now();
  const L = buildLevel(x);
  const keep = L.W <= SWEEP_MAX_W;
  const CS = classStats(L, keep);
  let Vbar=0, SumM=0, SumTriv=0, SumMom=0, SumCert=0;
  const Rq = new Float64Array(L.K), Rmom = new Float64Array(L.K);
  const kurt = new Float64Array(L.K);
  for(let j=0;j<L.K;j++){ Vbar+=CS.Vq[j]; SumM+=CS.Mq[j]; }
  const A = SumM/Vbar;

  // moment bound, per prime: max dev² ≤ min_m (q·μ_{2m})^{1/m}
  for(let j=0;j<L.K;j++){
    const q=L.qs[j]; let best=Infinity;
    for(let m=1;m<=MOMENTS;m++){
      const v = Math.pow(q*CS.mom[m-1][j], 1/m);
      if(v<best) best=v;
    }
    Rmom[j]=best; SumMom+=best;
    Rq[j]=CS.Mq[j]/CS.Vq[j];
    kurt[j]=CS.mom[1][j]/(CS.Vq[j]*CS.Vq[j]);
  }
  // trivial class bound
  const lam = (2*L.W/30)/L.N;
  for(let j=0;j<L.K;j++){
    const q=L.qs[j];
    const up = (2/q)*(2*L.W/30 - L.N) + 4, dn = 2*L.N/q;
    const T = Math.max(up,dn); SumTriv += T*T;
  }
  // completed-sum certificate
  const CERT = certificate(L);
  let certOK = 0;
  for(let j=0;j<L.K;j++){
    const b = 2*CERT.Cb[j];           // |dev| ≤ 2·(per-class bound)
    SumCert += b*b;
    if(b >= CS.maxAbs[j]) certOK++;
  }

  const Sbar = meanS(L);
  const K = L.K;
  const thr = Sbar*Sbar/(K*Vbar);
  const sw = keep ? sweepMaxVR(L, CS.rows, Vbar) : null;

  const kn = KNOWN[x];
  const ok=(a,b,tol)=>Math.abs(a-b)<=tol?'PASS':'FAIL';
  console.log(`\n===== @${x}: W=${L.W}  N̄=${L.N}  K=${K} (${L.qs[0]}..${L.y})  H=${f(L.H,4)}  lnW=${f(Math.log(L.W),3)}  maxNatalGap=${L.maxGap}`);
  if(kn){
    console.log(`  CUSTODY vs cap-31/cap-38:  N̄ ${L.N} [${kn.N} ${ok(L.N,kn.N,0)}]  K ${K} [${kn.K} ${ok(K,kn.K,0)}]  V̄ ${f(Vbar,2)} [${kn.Vbar} ${ok(Vbar,kn.Vbar,0.02)}]  S̄ ${f(Sbar,2)} [${kn.Sbar} ${ok(Sbar,kn.Sbar,0.02)}]` +
      (sw?`  maxVR ${f(sw.maxVR,3)} [${kn.maxVR} ${ok(sw.maxVR,kn.maxVR,0.002)}]  VR(0) ${f(sw.VR0,3)}  meanVR ${f(sw.meanVR,4)}`:'  maxVR: NOT ENUMERATED (W beyond sweep)'));
  } else {
    console.log(`  V̄ = ${f(Vbar,2)}   S̄ = ${f(Sbar,2)}   maxVR: NOT ENUMERATED (W beyond sweep)`);
  }
  console.log(`  THRESHOLD S̄²/(K·V̄) = ${f(thr,2)}` + (sw?`   enumerated max VR = ${f(sw.maxVR,3)}   margin ×${f(thr/sw.maxVR,1)}`:''));
  console.log(`  (T1) ALIGNMENT BOUND A(x) = Σ_q max_a dev_q(a)² / V̄ = ${f(A,4)}` +
              (sw?`   A ≥ maxVR ? ${A>=sw.maxVR?'PASS':'FAIL'}   slack A/maxVR = ×${f(A/sw.maxVR,2)}`:'') +
              `   A/lnW = ${f(A/Math.log(L.W),4)}`);
  const Dcap = Math.sqrt(K*SumM);
  console.log(`  (T2) V̄-FREE TEST   K·Σ_q max_a dev² = ${e2(K*SumM)}  vs  S̄² = ${e2(Sbar*Sbar)}   ${K*SumM<Sbar*Sbar?'HOLDS':'FAILS'}  margin ×${f(Sbar*Sbar/(K*SumM),1)}`);
  console.log(`       ⇒ max_t |D(t)| ≤ √(K·Σ max dev²) = ${f(Dcap,1)} = ${f(100*Dcap/Sbar,1)}% of S̄; annihilation needs overlap collapse X̄ − X ≥ S̄ − ${f(Dcap,1)} = ${f(Sbar-Dcap,1)}`);
  console.log(`  (T3a) TRIVIAL CLASS BOUND   K·Σ_q T_q² = ${e2(K*SumTriv)}  vs S̄² = ${e2(Sbar*Sbar)}   ${K*SumTriv<Sbar*Sbar?'HOLDS':'FAILS'}  ratio ${e2(K*SumTriv/(Sbar*Sbar))}   [Σ T_q²/Σ max dev² = ${e2(SumTriv/SumM)}]`);
  console.log(`  (T3b) MOMENT BOUND (m ≤ ${MOMENTS})  Σ_q min_m (q μ_{2m})^{1/m} / V̄ = ${f(SumMom/Vbar,4)}   vs A = ${f(A,4)}   loss ×${f(SumMom/SumM,3)}   K·Σ = ${e2(K*SumMom)} vs S̄² ${e2(Sbar*Sbar)}  ${K*SumMom<Sbar*Sbar?'HOLDS':'FAILS'}`);
  console.log(`  (T3c) COMPLETED-SUM CERTIFICATE  dominates true max|dev| at ${certOK}/${K} primes   K·Σ_q (2Cb_q)² = ${e2(K*SumCert)}  vs S̄² = ${e2(Sbar*Sbar)}   ${K*SumCert<Sbar*Sbar?'HOLDS':'FAILS'}  ratio ${e2(K*SumCert/(Sbar*Sbar))}`);
  console.log(`        Σ_k B(k)/k = ${e2(CERT.TOT2)}   Σ_k |Ŝ(k)|/k = ${e2(CERT.TOT2s)}   3^{π(x)−3} = ${e2(Math.pow(3,L.basePs.length))}   9^{π(x)−3} = ${e2(Math.pow(9,L.basePs.length))}   W = ${e2(L.W)}`);

  // per-prime shape: R_q = max dev²/V̄_q against 2 ln q, and the kurtosis
  let sR=0,sL=0,maxR=0,argR=0,sK=0;
  for(let j=0;j<L.K;j++){ sR+=Rq[j]; sL+=2*Math.log(L.qs[j]); sK+=kurt[j]; if(Rq[j]>maxR){maxR=Rq[j];argR=L.qs[j];} }
  console.log(`  PER-PRIME  mean R_q = ${f(sR/K,3)}  (mean 2 ln q = ${f(sL/K,3)}, ratio ${f((sR/K)/(sL/K),3)})   max R_q = ${f(maxR,3)} at q=${argR} (q itself = ${argR}, the trivial ceiling)   mean μ4/μ2² = ${f(sK/K,3)}`);
  const sample=[0,1,2,Math.floor(K/4),Math.floor(K/2),K-2,K-1].filter((v,i,arr)=>v>=0&&v<K&&arr.indexOf(v)===i);
  console.log('    q    | V̄_q      | max dev  | R_q    | 2 ln q | μ4/μ2² | trivial T_q | moment bnd | cert 2Cb_q');
  for(const j of sample){
    const q=L.qs[j];
    const up=(2/q)*(2*L.W/30 - L.N)+4, dn=2*L.N/q, T=Math.max(up,dn);
    console.log(`   ${String(q).padStart(5)} | ${f(CS.Vq[j],3).padStart(8)} | ${f(CS.maxAbs[j],2).padStart(8)} | ${f(Rq[j],3).padStart(6)} | ${f(2*Math.log(q),3).padStart(6)} | ${f(kurt[j],3).padStart(6)} | ${f(T,1).padStart(11)} | ${f(Math.sqrt(Rmom[j]),2).padStart(10)} | ${f(2*CERT.Cb[j],1).padStart(10)}`);
  }
  // the second ingredient the Status sentence does not name: S̄ itself
  const s_par = Math.log(L.W)/Math.log(L.y);
  const H=L.H;
  let e1=0; const ej=[1,0,0,0]; // e_1..e_3 of {2/q}
  {let poly=[1]; for(const q of L.qs){const p=2/q,np=new Array(Math.min(poly.length+1,5)).fill(0);
      for(let i=0;i<poly.length&&i<4;i++){np[i]+=poly[i]*(1-p); if(i+1<5)np[i+1]+=poly[i]*p;} poly=np;}
   e1=poly[1]||0; ej[1]=poly[1]||0; ej[2]=poly[2]||0; ej[3]=poly[3]||0;}
  const bonf = L.N*(1 - H + ej[2] - ej[3]);
  console.log(`  S̄-SIDE AUDIT  sieve ratio s = lnW/ln y = ${f(s_par,4)}  vs β₂ = 4.26645   H = ${f(H,4)}   N̄(1−H) = ${f(L.N*(1-H),1)}   Bonferroni-J3 MODEL floor N̄(1−H+ē₂−ē₃) = ${f(bonf,1)} vs S̄ = ${f(Sbar,1)}  ${bonf>0?'positive':'NEGATIVE'}`);
  console.log(`                Brun level check: #subsets of size ≤ 3 with signs, 2³·C(K,3) = ${e2(8*K*(K-1)*(K-2)/6)}  vs W = ${e2(L.W)}   ${8*K*(K-1)*(K-2)/6 < L.W ? 'level fits':'LEVEL EXCEEDED — the O(1)-per-subset remainder outruns the main term'}`);

  ROWS.push({x, lnW:Math.log(L.W), K, Vbar, Sbar, thr, A, maxVR: sw?sw.maxVR:NaN,
             direct:K*SumM, S2:Sbar*Sbar, mom:SumMom/Vbar, triv:K*SumTriv/(Sbar*Sbar),
             cert:K*SumCert/(Sbar*Sbar), meanR:sR/K, s_par});
  console.log(`  [level time ${(Date.now()-t0)/1000}s]`);
}

console.log('\n===== SUMMARY — the alignment bound against the threshold =====');
console.log('   x |  lnW   |   K   |    V̄       |     S̄      | threshold | enum maxVR | A(x)   | A/lnW  | margin thr/A | (T2) S̄²/(K·Σmax) | cert/S̄²');
for(const r of ROWS){
  console.log(`  ${String(r.x).padStart(2)} | ${f(r.lnW,3)} | ${String(r.K).padStart(5)} | ${f(r.Vbar,2).padStart(10)} | ${f(r.Sbar,2).padStart(10)} | ${f(r.thr,2).padStart(9)} | ${(Number.isFinite(r.maxVR)?f(r.maxVR,3):'   —   ').padStart(10)} | ${f(r.A,3).padStart(6)} | ${f(r.A/r.lnW,4).padStart(6)} | ${('×'+f(r.thr/r.A,1)).padStart(12)} | ${('×'+f(r.S2/r.direct,1)).padStart(17)} | ${e2(r.cert).padStart(9)}`);
}
console.log('\n  growth of A(x) between consecutive levels, and of the threshold:');
for(let i=1;i<ROWS.length;i++){
  console.log(`   @${ROWS[i-1].x}→@${ROWS[i].x}:  A ×${f(ROWS[i].A/ROWS[i-1].A,3)}   threshold ×${f(ROWS[i].thr/ROWS[i-1].thr,3)}   lnW ×${f(ROWS[i].lnW/ROWS[i-1].lnW,3)}   margin ×${f((ROWS[i].thr/ROWS[i].A)/(ROWS[i-1].thr/ROWS[i-1].A),3)}   certificate ratio ×${f(ROWS[i].cert/ROWS[i-1].cert,3)}   trivial-bound ratio ×${f(ROWS[i].triv/ROWS[i-1].triv,3)}`);
}
console.log('  (of the three deterministic candidates only the certificate ratio is not diverging; it turned at @17,');
console.log('   and five points with one turning point are not a trend — this corpus has had three short-run trends');
console.log('   refuted by the next point, max VR itself among them.)');
console.log(`[total ${(Date.now()-T00)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-maxvr-uniform-01.js
//   invocation:  node research/attack-maxvr-uniform-01.js
//   code-sha256: dc8d90c147bfd795916c17734aad5d4456868cee5948edf1dbfdc4431c95315b
//   out-sha256:  25d4d13b6adee2e4bd4c77692b27ac546447c686bad6e6dd49ca191c964d53bf
//   body-lines:  134
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     25.7 s
// ============================================================================
// ===== DEFINITIONS: dev_q(a) = n_q(a)+n_q(a−2) − 2N̄/q ; V̄_q = mean_a dev_q(a)² ;
//       VR(t) = Σ_q dev_q(t mod q)² / V̄ ; A(x) = Σ_q max_a dev_q(a)² / V̄ ≥ max_t VR(t).
//
// ===== @11: W=2310  N̄=90  K=10 (13..47)  H=0.7891  lnW=7.745  maxNatalGap=60
//   CUSTODY vs cap-31/cap-38:  N̄ 90 [90 PASS]  K 10 [10 PASS]  V̄ 15.07 [15.07 PASS]  S̄ 38.24 [38.24 PASS]  maxVR 2.777 [2.777 PASS]  VR(0) 0.344  meanVR 0.9990
//   THRESHOLD S̄²/(K·V̄) = 9.71   enumerated max VR = 2.777   margin ×3.5
//   (T1) ALIGNMENT BOUND A(x) = Σ_q max_a dev_q(a)² / V̄ = 4.2123   A ≥ maxVR ? PASS   slack A/maxVR = ×1.52   A/lnW = 0.5439
//   (T2) V̄-FREE TEST   K·Σ_q max_a dev² = 6.346e+2  vs  S̄² = 1.462e+3   HOLDS  margin ×2.3
//        ⇒ max_t |D(t)| ≤ √(K·Σ max dev²) = 25.2 = 65.9% of S̄; annihilation needs overlap collapse X̄ − X ≥ S̄ − 25.2 = 13.0
//   (T3a) TRIVIAL CLASS BOUND   K·Σ_q T_q² = 8.685e+3  vs S̄² = 1.462e+3   FAILS  ratio 5.940e+0   [Σ T_q²/Σ max dev² = 1.369e+1]
//   (T3b) MOMENT BOUND (m ≤ 8)  Σ_q min_m (q μ_{2m})^{1/m} / V̄ = 4.5907   vs A = 4.2123   loss ×1.090   K·Σ = 6.916e+2 vs S̄² 1.462e+3  HOLDS
//   (T3c) COMPLETED-SUM CERTIFICATE  dominates true max|dev| at 10/10 primes   K·Σ_q (2Cb_q)² = 5.633e+5  vs S̄² = 1.462e+3   FAILS  ratio 3.853e+2
//         Σ_k B(k)/k = 8.592e+1   Σ_k |Ŝ(k)|/k = 2.419e+1   3^{π(x)−3} = 9.000e+0   9^{π(x)−3} = 8.100e+1   W = 2.310e+3
//   PER-PRIME  mean R_q = 4.224  (mean 2 ln q = 6.643, ratio 0.636)   max R_q = 7.649 at q=43 (q itself = 43, the trivial ceiling)   mean μ4/μ2² = 2.329
//     q    | V̄_q      | max dev  | R_q    | 2 ln q | μ4/μ2² | trivial T_q | moment bnd | cert 2Cb_q
//       13 |    1.515 |     2.15 |  3.062 |  5.130 |  2.054 |        13.8 |       2.26 |       80.7
//       17 |    0.713 |     1.59 |  3.539 |  5.666 |  2.489 |        11.5 |       1.67 |       78.8
//       19 |    2.670 |     2.53 |  2.390 |  5.889 |  1.906 |        10.7 |       2.79 |       78.0
//       31 |    1.382 |     2.19 |  3.482 |  6.868 |  2.419 |         8.1 |       2.36 |       74.3
//       43 |    2.291 |     4.19 |  7.649 |  7.522 |  2.620 |         7.0 |       4.19 |       71.4
//       47 |    1.588 |     2.83 |  5.042 |  7.700 |  2.588 |         6.7 |       2.96 |       70.6
//   S̄-SIDE AUDIT  sieve ratio s = lnW/ln y = 2.0116  vs β₂ = 4.26645   H = 0.7891   N̄(1−H) = 19.0   Bonferroni-J3 MODEL floor N̄(1−H+ē₂−ē₃) = 29.2 vs S̄ = 38.2  positive
//                 Brun level check: #subsets of size ≤ 3 with signs, 2³·C(K,3) = 9.600e+2  vs W = 2.310e+3   level fits
//   [level time 0.003s]
//
// ===== @13: W=30030  N̄=990  K=34 (17..173)  H=1.1468  lnW=10.310  maxNatalGap=90
//   CUSTODY vs cap-31/cap-38:  N̄ 990 [990 PASS]  K 34 [34 PASS]  V̄ 119.58 [119.58 PASS]  S̄ 310.88 [310.88 PASS]  maxVR 2.352 [2.352 PASS]  VR(0) 0.623  meanVR 1.0000
//   THRESHOLD S̄²/(K·V̄) = 23.77   enumerated max VR = 2.352   margin ×10.1
//   (T1) ALIGNMENT BOUND A(x) = Σ_q max_a dev_q(a)² / V̄ = 5.4081   A ≥ maxVR ? PASS   slack A/maxVR = ×2.30   A/lnW = 0.5245
//   (T2) V̄-FREE TEST   K·Σ_q max_a dev² = 2.199e+4  vs  S̄² = 9.665e+4   HOLDS  margin ×4.4
//        ⇒ max_t |D(t)| ≤ √(K·Σ max dev²) = 148.3 = 47.7% of S̄; annihilation needs overlap collapse X̄ − X ≥ S̄ − 148.3 = 162.6
//   (T3a) TRIVIAL CLASS BOUND   K·Σ_q T_q² = 2.511e+6  vs S̄² = 9.665e+4   FAILS  ratio 2.598e+1   [Σ T_q²/Σ max dev² = 1.142e+2]
//   (T3b) MOMENT BOUND (m ≤ 8)  Σ_q min_m (q μ_{2m})^{1/m} / V̄ = 6.1134   vs A = 5.4081   loss ×1.130   K·Σ = 2.485e+4 vs S̄² 9.665e+4  HOLDS
//   (T3c) COMPLETED-SUM CERTIFICATE  dominates true max|dev| at 34/34 primes   K·Σ_q (2Cb_q)² = 7.303e+7  vs S̄² = 9.665e+4   FAILS  ratio 7.556e+2
//         Σ_k B(k)/k = 2.969e+2   Σ_k |Ŝ(k)|/k = 6.166e+1   3^{π(x)−3} = 2.700e+1   9^{π(x)−3} = 7.290e+2   W = 3.003e+4
//   PER-PRIME  mean R_q = 5.669  (mean 2 ln q = 8.634, ratio 0.657)   max R_q = 11.552 at q=151 (q itself = 151, the trivial ceiling)   mean μ4/μ2² = 2.691
//     q    | V̄_q      | max dev  | R_q    | 2 ln q | μ4/μ2² | trivial T_q | moment bnd | cert 2Cb_q
//       17 |    7.190 |     5.47 |  4.162 |  5.666 |  2.599 |       123.1 |       5.71 |      280.7
//       19 |    5.850 |     3.79 |  2.455 |  5.889 |  1.617 |       110.5 |       3.99 |      279.1
//       23 |    3.123 |     3.09 |  3.051 |  6.271 |  2.000 |        92.0 |       3.29 |      276.3
//       47 |    6.069 |     5.87 |  5.682 |  7.700 |  2.922 |        47.1 |       6.15 |      263.9
//       89 |    1.916 |     3.25 |  5.502 |  8.977 |  2.559 |        26.7 |       3.42 |      247.8
//      167 |    3.512 |     3.86 |  4.234 | 10.236 |  2.272 |        16.1 |       4.47 |      230.6
//      173 |    1.715 |     3.55 |  7.368 | 10.307 |  3.565 |        15.7 |       3.99 |      229.6
//   S̄-SIDE AUDIT  sieve ratio s = lnW/ln y = 2.0007  vs β₂ = 4.26645   H = 1.1468   N̄(1−H) = -145.3   Bonferroni-J3 MODEL floor N̄(1−H+ē₂−ē₃) = -10.0 vs S̄ = 310.9  NEGATIVE
//                 Brun level check: #subsets of size ≤ 3 with signs, 2³·C(K,3) = 4.787e+4  vs W = 3.003e+4   LEVEL EXCEEDED — the O(1)-per-subset remainder outruns the main term
//   [level time 0.016s]
//
// ===== @17: W=510510  N̄=14850  K=120 (19..709)  H=1.4938  lnW=13.143  maxNatalGap=156
//   CUSTODY vs cap-31/cap-38:  N̄ 14850 [14850 PASS]  K 120 [120 PASS]  V̄ 1144.40 [1144.4 PASS]  S̄ 3614.93 [3614.93 PASS]  maxVR 2.143 [2.143 PASS]  VR(0) 0.553  meanVR 1.0000
//   THRESHOLD S̄²/(K·V̄) = 95.16   enumerated max VR = 2.143   margin ×44.4
//   (T1) ALIGNMENT BOUND A(x) = Σ_q max_a dev_q(a)² / V̄ = 6.9885   A ≥ maxVR ? PASS   slack A/maxVR = ×3.26   A/lnW = 0.5317
//   (T2) V̄-FREE TEST   K·Σ_q max_a dev² = 9.597e+5  vs  S̄² = 1.307e+7   HOLDS  margin ×13.6
//        ⇒ max_t |D(t)| ≤ √(K·Σ max dev²) = 979.7 = 27.1% of S̄; annihilation needs overlap collapse X̄ − X ≥ S̄ − 979.7 = 2635.3
//   (T3a) TRIVIAL CLASS BOUND   K·Σ_q T_q² = 2.307e+9  vs S̄² = 1.307e+7   FAILS  ratio 1.765e+2   [Σ T_q²/Σ max dev² = 2.404e+3]
//   (T3b) MOMENT BOUND (m ≤ 8)  Σ_q min_m (q μ_{2m})^{1/m} / V̄ = 8.0886   vs A = 6.9885   loss ×1.157   K·Σ = 1.111e+6 vs S̄² 1.307e+7  HOLDS
//   (T3c) COMPLETED-SUM CERTIFICATE  dominates true max|dev| at 120/120 primes   K·Σ_q (2Cb_q)² = 1.021e+10  vs S̄² = 1.307e+7   FAILS  ratio 7.816e+2
//         Σ_k B(k)/k = 1.016e+3   Σ_k |Ŝ(k)|/k = 1.535e+2   3^{π(x)−3} = 8.100e+1   9^{π(x)−3} = 6.561e+3   W = 5.105e+5
//   PER-PRIME  mean R_q = 7.537  (mean 2 ln q = 11.107, ratio 0.679)   max R_q = 16.667 at q=479 (q itself = 479, the trivial ceiling)   mean μ4/μ2² = 2.770
//     q    | V̄_q      | max dev  | R_q    | 2 ln q | μ4/μ2² | trivial T_q | moment bnd | cert 2Cb_q
//       19 |   41.712 |     9.84 |  2.322 |  5.889 |  1.677 |      2023.4 |      10.49 |      978.5
//       23 |    6.125 |     4.70 |  3.600 |  6.271 |  2.797 |      1672.2 |       5.08 |      973.0
//       29 |   25.843 |     9.86 |  3.764 |  6.735 |  2.282 |      1327.0 |      10.47 |      965.9
//      163 |   15.417 |    13.79 | 12.338 | 10.188 |  3.074 |       239.4 |      13.79 |      874.7
//      337 |    4.214 |     6.87 | 11.197 | 11.640 |  4.103 |       117.9 |       7.53 |      825.5
//      701 |    3.807 |     5.63 |  8.331 | 13.105 |  2.975 |        58.7 |       6.28 |      770.4
//      709 |    4.239 |     6.11 |  8.807 | 13.128 |  2.937 |        58.1 |       6.83 |      769.6
//   S̄-SIDE AUDIT  sieve ratio s = lnW/ln y = 2.0024  vs β₂ = 4.26645   H = 1.4938   N̄(1−H) = -7332.8   Bonferroni-J3 MODEL floor N̄(1−H+ē₂−ē₃) = -5401.7 vs S̄ = 3614.9  NEGATIVE
//                 Brun level check: #subsets of size ≤ 3 with signs, 2³·C(K,3) = 2.247e+6  vs W = 5.105e+5   LEVEL EXCEEDED — the O(1)-per-subset remainder outruns the main term
//   [level time 0.123s]
//
// ===== @19: W=9699690  N̄=252450  K=435 (23..3109)  H=1.7857  lnW=16.088  maxNatalGap=216
//   CUSTODY vs cap-31/cap-38:  N̄ 252450 [252450 PASS]  K 435 [435 PASS]  V̄ 8944.60 [8944.6 PASS]  S̄ 49238.76 [49238.76 PASS]  maxVR 2.293 [2.293 PASS]  VR(0) 0.699  meanVR 1.0000
//   THRESHOLD S̄²/(K·V̄) = 623.11   enumerated max VR = 2.293   margin ×271.7
//   (T1) ALIGNMENT BOUND A(x) = Σ_q max_a dev_q(a)² / V̄ = 9.5064   A ≥ maxVR ? PASS   slack A/maxVR = ×4.15   A/lnW = 0.5909
//   (T2) V̄-FREE TEST   K·Σ_q max_a dev² = 3.699e+7  vs  S̄² = 2.424e+9   HOLDS  margin ×65.5
//        ⇒ max_t |D(t)| ≤ √(K·Σ max dev²) = 6081.8 = 12.4% of S̄; annihilation needs overlap collapse X̄ − X ≥ S̄ − 6081.8 = 43156.9
//   (T3a) TRIVIAL CLASS BOUND   K·Σ_q T_q² = 2.782e+12  vs S̄² = 2.424e+9   FAILS  ratio 1.148e+3   [Σ T_q²/Σ max dev² = 7.522e+4]
//   (T3b) MOMENT BOUND (m ≤ 8)  Σ_q min_m (q μ_{2m})^{1/m} / V̄ = 11.1619   vs A = 9.5064   loss ×1.174   K·Σ = 4.343e+7 vs S̄² 2.424e+9  HOLDS
//   (T3c) COMPLETED-SUM CERTIFICATE  dominates true max|dev| at 435/435 primes   K·Σ_q (2Cb_q)² = 1.446e+12  vs S̄² = 2.424e+9   FAILS  ratio 5.966e+2
//         Σ_k B(k)/k = 3.396e+3   Σ_k |Ŝ(k)|/k = 3.888e+2   3^{π(x)−3} = 2.430e+2   9^{π(x)−3} = 5.905e+4   W = 9.700e+6
//   PER-PRIME  mean R_q = 10.103  (mean 2 ln q = 13.888, ratio 0.727)   max R_q = 27.122 at q=2039 (q itself = 2039, the trivial ceiling)   mean μ4/μ2² = 2.885
//     q    | V̄_q      | max dev  | R_q    | 2 ln q | μ4/μ2² | trivial T_q | moment bnd | cert 2Cb_q
//       23 |   47.187 |    12.83 |  3.486 |  6.271 |  2.127 |     34281.9 |      13.48 |     3307.6
//       29 |   11.743 |     6.34 |  3.428 |  6.735 |  1.855 |     27189.9 |       6.63 |     3293.4
//       31 |   46.475 |    14.10 |  4.276 |  6.868 |  2.262 |     25436.0 |      14.73 |     3288.6
//      643 |   17.381 |    10.77 |  6.679 | 12.932 |  2.658 |      1230.1 |      12.63 |     2870.2
//     1429 |   24.436 |    14.32 |  8.397 | 14.529 |  2.905 |       555.7 |      16.29 |     2707.0
//     3089 |   17.849 |    15.45 | 13.375 | 16.071 |  3.026 |       259.2 |      16.82 |     2533.6
//     3109 |   12.522 |    12.40 | 12.278 | 16.084 |  3.096 |       257.6 |      13.95 |     2532.0
//   S̄-SIDE AUDIT  sieve ratio s = lnW/ln y = 2.0004  vs β₂ = 4.26645   H = 1.7857   N̄(1−H) = -198341.0   Bonferroni-J3 MODEL floor N̄(1−H+ē₂−ē₃) = -170536.0 vs S̄ = 49238.8  NEGATIVE
//                 Brun level check: #subsets of size ≤ 3 with signs, 2³·C(K,3) = 1.090e+8  vs W = 9.700e+6   LEVEL EXCEEDED — the O(1)-per-subset remainder outruns the main term
//   [level time 4.941s]
//
// ===== @23: W=223092870  N̄=5301450  K=1739 (29..14929)  H=2.0526  lnW=19.223  maxNatalGap=324
//   V̄ = 88660.24   S̄ = 815732.55   maxVR: NOT ENUMERATED (W beyond sweep)
//   THRESHOLD S̄²/(K·V̄) = 4315.86
//   (T1) ALIGNMENT BOUND A(x) = Σ_q max_a dev_q(a)² / V̄ = 11.6476   A/lnW = 0.6059
//   (T2) V̄-FREE TEST   K·Σ_q max_a dev² = 1.796e+9  vs  S̄² = 6.654e+11   HOLDS  margin ×370.5
//        ⇒ max_t |D(t)| ≤ √(K·Σ max dev²) = 42377.1 = 5.2% of S̄; annihilation needs overlap collapse X̄ − X ≥ S̄ − 42377.1 = 773355.4
//   (T3a) TRIVIAL CLASS BOUND   K·Σ_q T_q² = 5.366e+15  vs S̄² = 6.654e+11   FAILS  ratio 8.064e+3   [Σ T_q²/Σ max dev² = 2.988e+6]
//   (T3b) MOMENT BOUND (m ≤ 8)  Σ_q min_m (q μ_{2m})^{1/m} / V̄ = 14.2909   vs A = 11.6476   loss ×1.227   K·Σ = 2.203e+9 vs S̄² 6.654e+11  HOLDS
//   (T3c) COMPLETED-SUM CERTIFICATE  dominates true max|dev| at 1739/1739 primes   K·Σ_q (2Cb_q)² = 2.464e+14  vs S̄² = 6.654e+11   FAILS  ratio 3.703e+2
//         Σ_k B(k)/k = 1.126e+4   Σ_k |Ŝ(k)|/k = 9.425e+2   3^{π(x)−3} = 7.290e+2   9^{π(x)−3} = 5.314e+5   W = 2.231e+8
//   PER-PRIME  mean R_q = 12.398  (mean 2 ln q = 16.984, ratio 0.730)   max R_q = 25.600 at q=5483 (q itself = 5483, the trivial ceiling)   mean μ4/μ2² = 2.884
//     q    | V̄_q      | max dev  | R_q    | 2 ln q | μ4/μ2² | trivial T_q | moment bnd | cert 2Cb_q
//       29 |   74.321 |    20.24 |  5.513 |  6.735 |  3.092 |    660101.1 |      21.14 |    11057.6
//       31 |   99.580 |    20.03 |  4.030 |  6.868 |  2.295 |    617514.2 |      21.04 |    11047.9
//       37 |  703.576 |    47.14 |  3.158 |  7.222 |  1.641 |    517377.4 |      49.57 |    11022.6
//     3119 |   73.356 |    28.45 | 11.038 | 16.091 |  2.744 |      6141.5 |      31.12 |     9307.1
//     6829 |   40.539 |    21.37 | 11.267 | 17.658 |  2.921 |      2807.2 |      24.66 |     8839.6
//    14923 |   46.172 |    28.51 | 17.601 | 19.221 |  2.755 |      1286.8 |      30.12 |     8343.2
//    14929 |   36.453 |    23.78 | 15.511 | 19.222 |  2.886 |      1286.3 |      25.96 |     8343.0
//   S̄-SIDE AUDIT  sieve ratio s = lnW/ln y = 2.0001  vs β₂ = 4.26645   H = 2.0526   N̄(1−H) = -5580263.0   Bonferroni-J3 MODEL floor N̄(1−H+ē₂−ē₃) = -5123913.7 vs S̄ = 815732.6  NEGATIVE
//                 Brun level check: #subsets of size ≤ 3 with signs, 2³·C(K,3) = 7.000e+9  vs W = 2.231e+8   LEVEL EXCEEDED — the O(1)-per-subset remainder outruns the main term
//   [level time 20.508s]
//
// ===== SUMMARY — the alignment bound against the threshold =====
//    x |  lnW   |   K   |    V̄       |     S̄      | threshold | enum maxVR | A(x)   | A/lnW  | margin thr/A | (T2) S̄²/(K·Σmax) | cert/S̄²
//   11 | 7.745 |    10 |      15.07 |      38.24 |      9.71 |      2.777 |  4.212 | 0.5439 |         ×2.3 |              ×2.3 |  3.853e+2
//   13 | 10.310 |    34 |     119.58 |     310.88 |     23.77 |      2.352 |  5.408 | 0.5245 |         ×4.4 |              ×4.4 |  7.556e+2
//   17 | 13.143 |   120 |    1144.40 |    3614.93 |     95.16 |      2.143 |  6.989 | 0.5317 |        ×13.6 |             ×13.6 |  7.816e+2
//   19 | 16.088 |   435 |    8944.60 |   49238.76 |    623.11 |      2.293 |  9.506 | 0.5909 |        ×65.5 |             ×65.5 |  5.966e+2
//   23 | 19.223 |  1739 |   88660.24 |  815732.55 |   4315.86 |       —    | 11.648 | 0.6059 |       ×370.5 |            ×370.5 |  3.703e+2
//
//   growth of A(x) between consecutive levels, and of the threshold:
//    @11→@13:  A ×1.284   threshold ×2.449   lnW ×1.331   margin ×1.908   certificate ratio ×1.961   trivial-bound ratio ×4.375
//    @13→@17:  A ×1.292   threshold ×4.003   lnW ×1.275   margin ×3.098   certificate ratio ×1.034   trivial-bound ratio ×6.794
//    @17→@19:  A ×1.360   threshold ×6.548   lnW ×1.224   margin ×4.814   certificate ratio ×0.763   trivial-bound ratio ×6.500
//    @19→@23:  A ×1.225   threshold ×6.926   lnW ×1.195   margin ×5.653   certificate ratio ×0.621   trivial-bound ratio ×7.027
//   (of the three deterministic candidates only the certificate ratio is not diverging; it turned at @17,
//    and five points with one turning point are not a trend — this corpus has had three short-run trends
//    refuted by the next point, max VR itself among them.)
// [total 25.594s]
// ============================================================================
// READINGS (2026-08-26) — honestly calibrated
// ============================================================================
// 1. THE HEADLINE TARGET IS NOT REACHED, AND NOTHING HERE IS A LEVEL-UNIFORM
//    BOUND. A(x) is a bound on max VR at each level, and A(x) GROWS: 4.212,
//    5.408, 6.989, 9.506, 11.648 at @11, @13, @17, @19, @23, by factors 1.284,
//    1.292, 1.360, 1.225 — A/lnW reads 0.5439, 0.5245, 0.5317, 0.5909, 0.6059.
//    So the Loudness
//    Ceiling Conjecture is exactly as open after this file as before it. What
//    A(x) is, is a PER-LEVEL upper bound that costs no rotation sweep.
// 2. ALL THREE DETERMINISTIC CANDIDATES FOR THE PER-PRIME INPUT max_a dev_q(a)²
//    FAIL AT EVERY COMPUTED LEVEL, and two of the three fail worse with level.
//    The trivial class bound overshoots the V̄-free test by 5.940e+0, 2.598e+1,
//    1.765e+2, 1.148e+3, 8.064e+3 of S̄², diverging ×4.375 to ×7.027 per level,
//    and its per-prime loss against the true maximum runs Σ T_q²/Σ max dev² =
//    1.369e+1 at @11 to 2.988e+6 at @23.
//    The completed-sum Fourier certificate overshoots S̄² by 3.853e+2, 7.556e+2,
//    7.816e+2, 5.966e+2, 3.703e+2 — it dominates the true max|dev| at 1739 of 1739
//    primes at @23, so it is a correct certificate, and it is still 370× short.
//    The moment bound is the only one that tracks the truth (loss ×1.090,
//    ×1.130, ×1.157, ×1.174, ×1.227 against A) but it is not a bound on
//    anything until μ_{2m}(q) is itself bounded, which is not done here.
// 3. WHAT DID MOVE: THE X-LIMITATION THEOREM GAINS A FIFTH LEVEL AND LOSES ITS
//    DEPENDENCE ON ENUMERATION. (T2) holds at all five levels — the margins
//    S̄²/(K·Σ_q max dev²) are ×2.3, ×4.4, ×13.6, ×65.5, ×370.5. At @23 that is
//    K·Σ max dev² = 1.796e+9 against S̄² = 6.654e+11, so max_t|D(t)| ≤ 42377.1,
//    which is 5.2% of S̄ = 815732.55, continuing the falling series cap-31
//    §Theorem 2 records for max|D| as a share of S̄ over its own four levels
//    (this file's own four rows read 65.9%, 47.7%, 27.1%, 12.4%, looser than
//    cap-31's because A(x) is looser than the enumerated max VR). @23 carries
//    223092870 rotations against 1739 scour primes; the sweep cap-31 and cap-38
//    use costs 223092870 rotations times 1739 primes there, and this route
//    took 20.398 s. The @11 row is included and holds at ×2.3, though @11 is closed
//    outright by cap-31 Theorem 1 anyway.
// 4. THE ALIGNMENT BOUND'S OWN SLACK IS GROWING, so it will not stay this close
//    to the truth: A/maxVR = ×1.52, ×2.30, ×3.26, ×4.15 at the four enumerated
//    levels. The loss is exactly the amount by which no single rotation can
//    maximise every prime at once, and it costs about ×1.3 per level while the
//    threshold gains ×2.4 to ×6.9. The margin therefore still widens (×1.91,
//    ×3.10, ×4.81, ×5.65), but the bound is getting worse in absolute terms.
// 5. THE PER-PRIME MAXIMUM SITS BELOW THE GAUSSIAN HEURISTIC AT EVERY LEVEL AND
//    THE MARGIN IS SHRINKING. mean R_q = max_a dev²/V̄_q reads 4.224, 5.669,
//    7.537, 10.103, 12.398 against mean 2 ln q = 6.643, 8.634, 11.107, 13.888,
//    16.984, a ratio of 0.636, 0.657, 0.679, 0.727, 0.730. The fourth moment
//    ratio μ4/μ2² averages 2.329, 2.691, 2.770, 2.885, 2.884 — under the
//    Gaussian 3 at all five levels. Neither is a bound; both say the object a
//    level-uniform proof would have to control is the tail of dev_q over
//    residue classes, and that it is currently sub-Gaussian in the measured
//    range. The trivial ceiling R_q ≤ q is never approached: the worst single
//    prime reads R_q = 7.649, 11.552, 16.667, 27.122, 25.600 at q = 43, 151,
//    479, 2039, 5483.
// 6. THE ALL-x FORM NEEDS A SECOND INGREDIENT THE STATUS SENTENCE DOES NOT
//    NAME, AND THIS IS THE MOST IMPORTANT LINE IN THE FILE. Every level here
//    computes S̄ exactly and puts it on the large side of the inequality. An
//    all-x statement needs an ANALYTIC LOWER BOUND on S̄, and S̄ is the count of
//    a set of size ≈ W sifted by two residue classes for every prime up to
//    y = √W. The sieve ratio ln W/ln y is 2.0116, 2.0007, 2.0024, 2.0004,
//    2.0001 at the five levels, against the κ = 2 sifting limit β₂ = 4.26645
//    that this programme's own Face 4 treats as a wall. The two elementary
//    dodges are priced here and both fail: the Bonferroni J = 3 model floor
//    N̄(1−H+ē₂−ē₃) is +29.2 at @11 and then NEGATIVE at every level from @13
//    (−10.0, −5401.7, −170536.0, −5123913.7 against S̄ = 310.9, 3614.9,
//    49238.8, 815732.6), and the Brun level check 2³·C(K,3) exceeds W from @13
//    on (4.787e+4 vs 3.003e+4, up to 7.000e+9 vs 2.231e+8), so the O(1)-per-subset
//    remainder outruns the main term exactly where a longer truncation would be
//    needed. CALIBRATION: this is an ARGUED obstruction, not a proof that no
//    lower bound on S̄ exists. Our set is explicit rather than an arbitrary
//    axiom-satisfying sequence, and the owning literature convention (integers
//    free of prime factors from an interval, the two-variable analogue of
//    Φ(x,y,z)) has NOT been searched here. What is established is that the
//    all-x form needs two things and the Status sentence names one.
// 7. CUSTODY, AND IT CAUGHT THE FILE'S OWN FIRST ERROR. Every recomputed
//    quantity now matches cap-38's embedded banners to the digit — N̄, K, V̄, S̄
//    and max VR at all four enumerated levels, including max VR = 2.777, 2.352,
//    2.143, 2.293. The first run FAILED V̄ at @11, @13 and @17 because this
//    file's custody table had been filled from cap-31's "Var split D + X − 2Cov"
//    row, whose first entry is Var(D) and not V̄. The code was right and the
//    pasted target was wrong, which is the failure mode the embed mechanism
//    exists for, one level up.
// 8. NOT A WRONG-DIRECTION ARRIVAL, on the evidence available. A bound on
//    max VR is not TPC-strength: this file proves per-level bounds on it
//    without enumeration and without any arithmetic input, VR is measurably
//    decorrelated from survival (cap-31 enumerates corr(VR,S) ≈ 0 at its three
//    swept levels), and
//    even max VR ≡ 0 would only close the strike channel, which Face 2 says
//    carries 2.7% of Var(S) at @17. The TPC-adjacent object in the
//    neighbourhood is S̄'s lower bound in reading 6, not max VR.
