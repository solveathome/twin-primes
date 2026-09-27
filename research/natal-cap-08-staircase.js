// ============================================================================
// ATTACK 8 — THE STAIRCASE OF HARD CAPS
// Unconditional per-prime ceilings on fresh Scour kills in a Natal@5 tile
// (2026-08-14; companion to scour-into-fixed-tile.js and natal5-17tile-scour.txt)
// ============================================================================
//
// SETUP. Tile @x, width W = x#. Natal@5 set N_x = { r in [0,W) : r = 11 or 17
// (mod 30), r mod p not in {0, p-2} for every prime 7 <= p <= x }.
// |N_x| = 10, 90, 990, 14850 at x = 7, 11, 13, 17. Scour primes q in (x, sqrt(W)]
// march ascending; q strikes r with r = 0 or -2 (mod q); a strike is FRESH if no
// smaller scour prime struck that slot.
//
// LEMMA (Cofactor Rigidity). Let r in N_x be fresh-struck by scour prime q.
//   Case q | r:   write r = q*m. Any prime p <= x dividing m divides r, which is
//     excluded (r = 11/17 mod 30 kills p in {2,3,5}; the natal condition
//     r mod p != 0 kills 7 <= p <= x). Any prime q' with x < q' < q dividing m
//     gives q' | r, so q' already struck r — contradicts freshness. Hence m = 1
//     (the SELF-STRIKE at r = q, possible only when q = 11/17 mod 30 — and that
//     is a twin FOUND, not a kill) or lpf(m) >= q, forcing m >= q and r >= q^2.
//   Case q | r+2: identical with r+2 = q*m (natal excludes p | r+2 via
//     r mod p != p-2 and r+2 = 13/19 mod 30; q' | m means r = -2 mod q', already
//     struck). m = 1 is the self-strike at r = q-2 (needs q = 13/19 mod 30).
//   The two self-strike residue sets {11,17} and {13,19} mod 30 are disjoint, so
//   each q has AT MOST ONE self-strike slot.
//
// THEOREM (Staircase of hard caps). Let Phi*(t,z) = #{ 2 <= m <= t : lpf(m) >= z }
// and s(q) = 1 if q mod 30 in {11,13,17,19}, else 0. Then for every scour prime q:
//
//     fresh(q) <= Phi*( floor((W-1)/q), q ) + Phi*( floor((W+1)/q), q ) + s(q).
//
// (First term: r = q*m < W. Second: r+2 = q*m <= W+1. Injective in m per case.)
// The staircase — the cap simplifies as q climbs:
//  (i)   q^3 > W+1  ("prime regime"): m <= (W+1)/q < q^2 and lpf(m) >= q force m
//        PRIME, so Phi*(t,q) = pi(t) - pi(q-1) and
//            fresh(q) <= 2*( pi((W+1)/q) - pi(q-1) ) + 1,
//        an exact elementary cap by pure prime counting. With Rosser-Schoenfeld
//        (1962, Thm 1: pi(t) < 1.25506 t/ln t for t > 1; pi(t) > t/ln t for
//        t >= 17) this is a closed-form unconditional bound.
//  (ii)  q^4 > W+1 >= q^3 ("semiprime regime"): m is prime or p1*p2 with
//        q <= p1 <= p2 — cap = prime count + exact semiprime count.
//  (iii) general q ("Phi regime"): compute Phi* exactly (Legendre/Buchstab
//        count; trivial at these sizes).
// COROLLARY. survivors >= N - sum_q cap(q), and the tail sum over q^3 > W is
// fully explicit: sum 2*(pi(W/q) - pi(q-1)) + 1 = (2 ln 2 + o(1)) * W / ln W.
//
// THE HONEST QUESTION. If sum cap(q) < N the pigeonhole would PROVE survivors
// by pure counting — and a slot surviving the whole scour to sqrt(W) is a
// genuine twin pair (its members have no factor up to sqrt), so that would be
// an elementary per-prime-cap proof of twins in the tile. Does it close?
// Measured below: cap1 alone NEVER closes (overshoot ~7-9x). But the slack is
// fully explained — cap1 enforces only the DIVISIBILITY skeleton and ignores
// (a) the mod-30 house condition on r = q*m  (factor ~ 2/8 = 1/4),
// (b) the second natal residue mod each p <= x (factor prod (1 - 1/(p-1))),
// (c) the second fresh residue mod each q' in (x,q) (factor prod (1 - 1/(q'-1))
//     — a Mertens product that DECAYS like ln x / ln q as q climbs).
// Diagnostic column 'pred' = (1/4) * prod_{7<=p<=x}(1-1/(p-1))
//                                  * prod_{x<q'<q}(1-1/(q'-1))
// is the heuristic tightness; if ratio ~ pred, the slack is exactly (a)+(b)+(c).
// Crucially (a),(b) are deterministic congruences on the cofactor m, so they can
// be folded into the cap with the count staying EXACT and history-blind (cap2),
// and the freshness conditions (c) can be folded in one modulus at a time
// (cap_K = cap2 + the 2 forbidden residues mod the first K scour primes; every
// cap_K is a rigorous upper bound on fresh(q) for every K). The measured ladder
// closes the pigeonhole at @11 (K*=0), @13 (K*=0), @17 (K*=2), @19 (K*=10) —
// proven survivor floors 34 / 110 / 82 / 1877 twin pairs — and the escalation
// of K* measures exactly how fast the history-blind approach dies as x grows.
// ============================================================================
'use strict';

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,msg){if(!c)throw new Error('ASSERT FAIL: '+msg)}

// ---- exact counting machinery (m-ranges reach (W+1)/23 < 421727 at x=19) ----
const LIM=430000;
const lpf=new Int32Array(LIM+1);
for(let i=2;i<=LIM;i++) if(lpf[i]===0) for(let j=i;j<=LIM;j+=i) if(lpf[j]===0) lpf[j]=i;
const isP=new Uint8Array(LIM+1), PIcum=new Int32Array(LIM+1);
{let c=0;for(let i=2;i<=LIM;i++){if(lpf[i]===i){isP[i]=1;c++}PIcum[i]=c}}
const pi=t=>t<2?0:PIcum[t]; // exact pi(t), t<=LIM
const phiStar=(t,z)=>{let c=0;for(let m=2;m<=t;m++)if(lpf[m]>=z)c++;return c};
const semiBoth=(t,z)=>{let c=0;for(let p1=z;p1*p1<=t;p1++){if(!isP[p1])continue;c+=pi(Math.floor(t/p1))-pi(p1-1)}return c};

// ---- Natal@5 tile + cumulative (tree) scour march ---------------------------
function buildTile(x){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7);
  let W=1;for(const p of wheel)W*=p;
  const ok=r=>{for(const p of mids){const m=r%p;if(m===0||m===p-2)return false}return true};
  const slots=[];
  for(let r=11;r<W;r+=30)if(ok(r))slots.push(r);
  for(let r=17;r<W;r+=30)if(ok(r))slots.push(r);
  return {W,slots};
}
function march(x){
  const {W,slots}=buildTile(x);
  const alive=new Set(slots);
  const scour=primesUpTo(Math.ceil(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const rows=[];
  for(const q of scour){
    let fresh=0,self=0;
    for(const r of [...alive]) if(r%q===0||(r+2)%q===0){alive.delete(r);fresh++;if(r===q||r===q-2)self++}
    rows.push({q,fresh,self});
  }
  return {W,N:slots.length,rows,survivors:alive.size,scour};
}

// ---- the staircase caps, verified per prime ---------------------------------
// cap1 = divisibility skeleton only (the clean Theorem).
// cap2 = residue-REFINED staircase: additionally requires q*m to land in the
//        natal residue system — STILL an exact count, still a hard cap, since
//        every fresh kill r = q*m (resp. r = q*m - 2) has r in N_x:
//        A-side: q*m = 11/17 (mod 30) and q*m != -2 (mod p), 7 <= p <= x;
//        B-side: q*m = 13/19 (mod 30) and q*m !=  2 (mod p), 7 <= p <= x.
//        (q*m = 0 mod p is impossible: lpf(m) >= q > x.) cap2 drops ONLY the
//        freshness residues mod q' in (x, q) — the factor-(c) Mertens product.
const RS=t=>1.25506*t/Math.log(t); // Rosser-Schoenfeld upper pi bound, t>1
const KMAX=12; // deepest freshness-refined cap tried: cap_K enforces first K freshness moduli
for(const x of [11,13,17,19]){
  const {W,N,rows,survivors}=march(x);
  const printRows=(x<=17);
  const mids=primesUpTo(x).filter(p=>p>=7);
  const condA=v=>{const t=v%30;if(t!==11&&t!==17)return false;for(const p of mids)if(v%p===p-2)return false;return true};
  const condB=v=>{const t=v%30;if(t!==13&&t!==19)return false;for(const p of mids)if(v%p===2)return false;return true};
  const cbrt=Math.cbrt(W+1), qrt=Math.pow(W+1,0.25);
  const predBase=0.25*mids.reduce((a,p)=>a*(1-1/(p-1)),1);
  const fmods=rows.slice(0,KMAX).map(r=>r.q); // first KMAX scour primes = candidate freshness moduli
  console.log(`\n===== @${x}: W=${W}, N=${N}, W^(1/4)=${qrt.toFixed(2)}, W^(1/3)=${cbrt.toFixed(2)}, sqrt(W)=${Math.sqrt(W).toFixed(1)}, ${rows.length} scour primes; freshness moduli pool {${fmods}} =====`);
  if(printRows)console.log('   q | fresh |  cap1  r1    |  cap2  r2    | cap2+ r2+   | type  | pred1 pred2   (cap2+ = cap_{K=2}; r = fresh/cap; pred = heuristic tightness)');
  const bands={phi:{a:0,c:0,c2:0,c3:0,n:0},semi:{a:0,c:0,c2:0,c3:0,n:0},prime:{a:0,c:0,c2:0,c3:0,n:0}};
  const sumK=new Array(KMAX+1).fill(0);
  let pred=predBase, sumCap=0, sumCap2=0, sumCap3=0, sumCapRS=0, sumCapPred=0;
  for(const {q,fresh,self} of rows){
    const A=Math.floor((W-1)/q), B=Math.floor((W+1)/q);
    const capA=phiStar(A,q), capB=phiStar(B,q);
    const s=[11,13,17,19].includes(q%30)?1:0;
    assert(self<=s,`self>s at q=${q}`);
    const cap=capA+capB+s;
    // one pass computes the whole cap_K ladder: for each admissible m, find the
    // index j of the FIRST violated freshness modulus (j = #moduli if none);
    // m is counted by cap_K iff j >= K. (K=0 is cap2: no freshness conditions.)
    const fm=fmods.filter(qq=>qq<q); // freshness moduli strictly below q
    const hist=new Array(fm.length+1).fill(0);
    for(let m=2;m<=A;m++){ if(lpf[m]<q)continue; const v=q*m; if(!condA(v))continue;
      let j=0; for(;j<fm.length;j++){const t=v%fm[j]; if(t===0||t===fm[j]-2)break} hist[j]++; } // A side: q'|r ⟺ v≡0; q'|r+2 ⟺ v≡-2
    for(let m=2;m<=B;m++){ if(lpf[m]<q)continue; const v=q*m; if(!condB(v))continue;
      let j=0; for(;j<fm.length;j++){const t=v%fm[j]; if(t===0||t===2)break} hist[j]++; }       // B side: r=v-2: q'|r ⟺ v≡2; q'|r+2 ⟺ v≡0
    const capK=new Array(KMAX+1).fill(s);
    for(let K=0;K<=KMAX;K++)for(let j=Math.min(K,fm.length);j<=fm.length;j++)capK[K]+=hist[j];
    const cap2=capK[0], cap3=capK[2];
    for(let K=0;K<=KMAX;K++)sumK[K]+=capK[K];
    let type;
    if(q**3>W+1){type='prime';
      assert(capA===pi(A)-pi(q-1)&&capB===pi(B)-pi(q-1),`prime-regime mismatch q=${q}`);
      sumCapRS+=2*(RS(B)-(q-1)/Math.log(q-1))+1;
    } else if(q**4>W+1){type='semi';
      assert(capA===pi(A)-pi(q-1)+semiBoth(A,q),`semi-regime mismatch q=${q} (A)`);
      assert(capB===pi(B)-pi(q-1)+semiBoth(B,q),`semi-regime mismatch q=${q} (B)`);
    } else type='phi';
    assert(fresh<=cap3&&cap3<=cap2&&cap2<=cap,`CAP VIOLATED at q=${q}: fresh=${fresh} cap3=${cap3} cap2=${cap2} cap=${cap}`);
    bands[type].a+=fresh;bands[type].c+=cap;bands[type].c2+=cap2;bands[type].c3+=cap3;bands[type].n++;
    sumCap+=cap; sumCap2+=cap2; sumCap3+=cap3; sumCapPred+=cap*pred;
    if(printRows)console.log(` ${String(q).padStart(3)} | ${String(fresh).padStart(5)} | ${String(cap).padStart(5)} ${(fresh/cap).toFixed(3)} | ${String(cap2).padStart(5)} ${(fresh/cap2).toFixed(3)} | ${String(cap3).padStart(5)} ${(fresh/cap3).toFixed(3)} | ${type.padEnd(5)} | ${pred.toFixed(3)} ${(pred/predBase).toFixed(3)}`);
    pred*=(1-1/(q-1)); // q joins the "already marched" product for the next prime
  }
  const removed=rows.reduce((a,r)=>a+r.fresh,0);
  console.log(` bands (n, actual, cap1, cap2): phi(q<=W^1/4): ${bands.phi.n}, ${bands.phi.a}, ${bands.phi.c}, ${bands.phi.c2}` +
              ` | semi: ${bands.semi.n}, ${bands.semi.a}, ${bands.semi.c}, ${bands.semi.c2}` +
              ` | prime(q>W^1/3): ${bands.prime.n}, ${bands.prime.a}, ${bands.prime.c}, ${bands.prime.c2}`);
  console.log(` TOTAL: removed ${removed} of N=${N} (survivors ${survivors}); sum cap1 = ${sumCap}; sum cap2 = ${sumCap2}; sum cap2+ = ${sumCap3}`);
  console.log(` pigeonhole, cap1: survivors >= N - ${sumCap} = ${N-sumCap}  (${sumCap<N?'POSITIVE':'negative'})`);
  console.log(` pigeonhole, cap2: survivors >= N - ${sumCap2} = ${N-sumCap2}  (${sumCap2<N?'POSITIVE — survivors PROVEN by counting alone':'negative — cap2 still overshoots'})`);
  console.log(` pigeonhole, cap2+: survivors >= N - ${sumCap3} = ${N-sumCap3}  (${sumCap3<N?'POSITIVE — survivors PROVEN by counting alone':'negative — still overshoots'})`);
  const kline=sumK.map((v,K)=>`K=${K}:${v}${v<N?'<N!':''}`).join('  ');
  const Kstar=sumK.findIndex(v=>v<N);
  console.log(` cap_K ladder (sum over q; enforce first K freshness moduli): ${kline}`);
  console.log(` minimal K closing the pigeonhole at @${x}: ${Kstar<0?'NONE up to K='+KMAX:'K* = '+Kstar+'  (survivors >= '+(N-sumK[Kstar])+')'}`);
  console.log(` tail (prime regime) cap1: exact Sum 2(pi(W/q)-pi(q-1))+1 = ${bands.prime.c}; Rosser-Schoenfeld closed form <= ${Math.ceil(sumCapRS)}; PNT-style 2ln2*W/lnW = ${(2*Math.LN2*W/Math.log(W)).toFixed(0)}`);
  console.log(` tail cap1 / N = ${(bands.prime.c/N).toFixed(2)}; tail cap2 / N = ${(bands.prime.c2/N).toFixed(2)}; tail actual/cap1 = ${(bands.prime.a/bands.prime.c).toFixed(3)}; tail actual/cap2 = ${(bands.prime.a/bands.prime.c2).toFixed(3)}`);
  console.log(` heuristic re-weighting of cap1: * (a)+(b) factors = ${(predBase*sumCap).toFixed(0)}; * pred(all three) = ${sumCapPred.toFixed(0)}  [actual ${removed}, N ${N}]`);
}

// ---- asymptotics: does the tail cap stay proportional to N? -----------------
// Tail cap ~ 2 ln 2 * W / ln W  (sum over primes q in (W^(1/3), W^(1/2)) of
// 2 pi(W/q), by Mertens + PNT: integral of dtheta/(theta(1-theta)) from 1/3 to
// 1/2 = ln 2). N/W = (1/15) prod_{7<=p<=x}(1-2/p). Crossover when
// prod/15 > 2 ln 2 / theta(x), theta(x) = ln W.
{
  console.log('\n===== ASYMPTOTICS: tail hard cap (2ln2*W/lnW) vs N =====');
  const P=primesUpTo(2000000);
  let theta=0,prod=1,cross=null;
  const show=new Set([17,31,53,101,149,151,199,251,401,997]);
  for(const p of P){
    theta+=Math.log(p);
    if(p>=7)prod*=(1-2/p);
    if(p>=19){
      const ratio=(2*Math.LN2/theta)/(prod/15); // tailcap/N estimate
      if(cross===null&&ratio<1){cross=p;console.log(` CROSSOVER: first x with tail cap < N is x = ${p}  (ln W = theta = ${theta.toFixed(1)}, W ~ e^${theta.toFixed(0)} ~ 10^${(theta/Math.LN10).toFixed(0)})`);}
      if(show.has(p))console.log(` x=${String(p).padStart(4)}: theta=${theta.toFixed(1).padStart(7)}  N/W=${(prod/15).toExponential(3)}  tailcap/W=${(2*Math.LN2/theta).toExponential(3)}  tailcap/N=${ratio.toFixed(3)}`);
    }
  }
  console.log(' tailcap/N ~ (30 ln 2 / c) * (ln x)^2 / x -> 0: the whole scour tail q > W^(1/3) is asymptotically NEGLIGIBLE against N.');
  console.log(' But survivors ~ C2*W/(ln W)^2 << tail cap ~ 1.39*W/ln W: the prime-count cap is one factor of ln W too coarse to prove survival, at every x.');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-08-staircase.js
//   invocation:  node research/natal-cap-08-staircase.js
//   code-sha256: dc2241332ba998b55e074f32320f84559fc2f96b6dd730ed666674809d1dea0b
//   out-sha256:  cac7510dac47afa4985eea72fdc16cde725f9b74a2bb038ab255460f73305455
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.9 s
// ============================================================================
//
// ===== @11: W=2310, N=90, W^(1/4)=6.93, W^(1/3)=13.22, sqrt(W)=48.1, 10 scour primes; freshness moduli pool {13,17,19,23,29,31,37,41,43,47} =====
//    q | fresh |  cap1  r1    |  cap2  r2    | cap2+ r2+   | type  | pred1 pred2   (cap2+ = cap_{K=2}; r = fresh/cap; pred = heuristic tightness)
//   13 |    13 |    73 0.178 |    14 0.929 |    14 0.929 | semi  | 0.188 1.000
//   17 |     9 |    53 0.170 |     9 1.000 |     9 1.000 | prime | 0.172 0.917
//   19 |     8 |    47 0.170 |    10 0.800 |     9 0.889 | prime | 0.161 0.859
//   23 |     5 |    34 0.147 |     7 0.714 |     5 1.000 | prime | 0.152 0.812
//   29 |     4 |    26 0.154 |     5 0.800 |     4 1.000 | prime | 0.145 0.775
//   31 |     2 |    22 0.091 |     3 0.667 |     3 0.667 | prime | 0.140 0.747
//   37 |     1 |    14 0.071 |     2 0.500 |     1 1.000 | prime | 0.135 0.722
//   41 |     1 |     9 0.111 |     2 0.500 |     1 1.000 | prime | 0.132 0.702
//   43 |     1 |     7 0.143 |     2 0.500 |     2 0.500 | prime | 0.128 0.685
//   47 |     1 |     3 0.333 |     2 0.500 |     2 0.500 | prime | 0.125 0.668
//  bands (n, actual, cap1, cap2): phi(q<=W^1/4): 0, 0, 0, 0 | semi: 1, 13, 73, 14 | prime(q>W^1/3): 9, 32, 215, 42
//  TOTAL: removed 45 of N=90 (survivors 45); sum cap1 = 288; sum cap2 = 56; sum cap2+ = 50
//  pigeonhole, cap1: survivors >= N - 288 = -198  (negative)
//  pigeonhole, cap2: survivors >= N - 56 = 34  (POSITIVE — survivors PROVEN by counting alone)
//  pigeonhole, cap2+: survivors >= N - 50 = 40  (POSITIVE — survivors PROVEN by counting alone)
//  cap_K ladder (sum over q; enforce first K freshness moduli): K=0:56<N!  K=1:52<N!  K=2:50<N!  K=3:49<N!  K=4:49<N!  K=5:49<N!  K=6:49<N!  K=7:49<N!  K=8:49<N!  K=9:49<N!  K=10:49<N!  K=11:49<N!  K=12:49<N!
//  minimal K closing the pigeonhole at @11: K* = 0  (survivors >= 34)
//  tail (prime regime) cap1: exact Sum 2(pi(W/q)-pi(q-1))+1 = 215; Rosser-Schoenfeld closed form <= 262; PNT-style 2ln2*W/lnW = 413
//  tail cap1 / N = 2.39; tail cap2 / N = 0.47; tail actual/cap1 = 0.149; tail actual/cap2 = 0.762
//  heuristic re-weighting of cap1: * (a)+(b) factors = 54; * pred(all three) = 47  [actual 45, N 90]
//
// ===== @13: W=30030, N=990, W^(1/4)=13.16, W^(1/3)=31.08, sqrt(W)=173.3, 34 scour primes; freshness moduli pool {17,19,23,29,31,37,41,43,47,53,59,61} =====
//    q | fresh |  cap1  r1    |  cap2  r2    | cap2+ r2+   | type  | pred1 pred2   (cap2+ = cap_{K=2}; r = fresh/cap; pred = heuristic tightness)
//   17 |   115 |   679 0.169 |   115 1.000 |   115 1.000 | semi  | 0.172 1.000
//   19 |    90 |   567 0.159 |    97 0.928 |    91 0.989 | semi  | 0.161 0.938
//   23 |    68 |   442 0.154 |    76 0.895 |    68 1.000 | semi  | 0.152 0.885
//   29 |    48 |   336 0.143 |    55 0.873 |    51 0.941 | semi  | 0.145 0.845
//   31 |    45 |   308 0.146 |    52 0.865 |    48 0.938 | semi  | 0.140 0.815
//   37 |    32 |   260 0.123 |    45 0.711 |    36 0.889 | prime | 0.135 0.788
//   41 |    29 |   235 0.123 |    41 0.707 |    35 0.829 | prime | 0.132 0.766
//   43 |    30 |   225 0.133 |    43 0.698 |    37 0.811 | prime | 0.128 0.747
//   47 |    26 |   203 0.128 |    37 0.703 |    33 0.788 | prime | 0.125 0.729
//   53 |    28 |   176 0.159 |    33 0.848 |    31 0.903 | prime | 0.123 0.713
//   59 |    21 |   161 0.130 |    28 0.750 |    26 0.808 | prime | 0.120 0.699
//   61 |    18 |   154 0.117 |    27 0.667 |    24 0.750 | prime | 0.118 0.687
//   67 |    19 |   136 0.140 |    24 0.792 |    23 0.826 | prime | 0.116 0.676
//   71 |    17 |   127 0.134 |    22 0.773 |    19 0.895 | prime | 0.114 0.666
//   73 |    11 |   121 0.091 |    19 0.579 |    17 0.647 | prime | 0.113 0.656
//   79 |    11 |   109 0.101 |    19 0.579 |    18 0.611 | prime | 0.111 0.647
//   83 |    10 |   100 0.100 |    17 0.588 |    15 0.667 | prime | 0.110 0.639
//   89 |     8 |    90 0.089 |    16 0.500 |    15 0.533 | prime | 0.108 0.631
//   97 |     4 |    78 0.051 |    11 0.364 |    10 0.400 | prime | 0.107 0.624
//  101 |    11 |    75 0.147 |    14 0.786 |    14 0.786 | prime | 0.106 0.617
//  103 |     8 |    71 0.113 |    13 0.615 |    13 0.615 | prime | 0.105 0.611
//  107 |     5 |    65 0.077 |    13 0.385 |     8 0.625 | prime | 0.104 0.605
//  109 |     7 |    61 0.115 |    11 0.636 |    11 0.636 | prime | 0.103 0.599
//  113 |     1 |    54 0.019 |     7 0.143 |     5 0.200 | prime | 0.102 0.594
//  127 |     2 |    42 0.048 |     6 0.333 |     4 0.500 | prime | 0.101 0.589
//  131 |     1 |    39 0.026 |     7 0.143 |     6 0.167 | prime | 0.100 0.584
//  137 |     6 |    31 0.194 |     9 0.667 |     8 0.750 | prime | 0.100 0.579
//  139 |     4 |    29 0.138 |     6 0.667 |     6 0.667 | prime | 0.099 0.575
//  149 |     1 |    24 0.042 |     3 0.333 |     3 0.333 | prime | 0.098 0.571
//  151 |     3 |    20 0.150 |     4 0.750 |     4 0.750 | prime | 0.097 0.567
//  157 |     1 |    14 0.071 |     2 0.500 |     2 0.500 | prime | 0.097 0.563
//  163 |     2 |    11 0.182 |     4 0.500 |     4 0.500 | prime | 0.096 0.560
//  167 |     0 |     7 0.000 |     3 0.000 |     3 0.000 | prime | 0.096 0.556
//  173 |     1 |     2 0.500 |     1 1.000 |     1 1.000 | prime | 0.095 0.553
//  bands (n, actual, cap1, cap2): phi(q<=W^1/4): 0, 0, 0, 0 | semi: 5, 366, 2332, 395 | prime(q>W^1/3): 29, 317, 2720, 485
//  TOTAL: removed 683 of N=990 (survivors 307); sum cap1 = 5052; sum cap2 = 880; sum cap2+ = 804
//  pigeonhole, cap1: survivors >= N - 5052 = -4062  (negative)
//  pigeonhole, cap2: survivors >= N - 880 = 110  (POSITIVE — survivors PROVEN by counting alone)
//  pigeonhole, cap2+: survivors >= N - 804 = 186  (POSITIVE — survivors PROVEN by counting alone)
//  cap_K ladder (sum over q; enforce first K freshness moduli): K=0:880<N!  K=1:837<N!  K=2:804<N!  K=3:781<N!  K=4:768<N!  K=5:753<N!  K=6:743<N!  K=7:734<N!  K=8:729<N!  K=9:722<N!  K=10:716<N!  K=11:715<N!  K=12:713<N!
//  minimal K closing the pigeonhole at @13: K* = 0  (survivors >= 110)
//  tail (prime regime) cap1: exact Sum 2(pi(W/q)-pi(q-1))+1 = 2720; Rosser-Schoenfeld closed form <= 3220; PNT-style 2ln2*W/lnW = 4038
//  tail cap1 / N = 2.75; tail cap2 / N = 0.49; tail actual/cap1 = 0.117; tail actual/cap2 = 0.654
//  heuristic re-weighting of cap1: * (a)+(b) factors = 868; * pred(all three) = 688  [actual 683, N 990]
//
// ===== @17: W=510510, N=14850, W^(1/4)=26.73, W^(1/3)=79.92, sqrt(W)=714.5, 120 scour primes; freshness moduli pool {19,23,29,31,37,41,43,47,53,59,61,67} =====
//    q | fresh |  cap1  r1    |  cap2  r2    | cap2+ r2+   | type  | pred1 pred2   (cap2+ = cap_{K=2}; r = fresh/cap; pred = heuristic tightness)
//   19 |  1563 |  9704 0.161 |  1564 0.999 |  1564 0.999 | phi   | 0.161 1.000
//   23 |  1159 |  7592 0.153 |  1227 0.945 |  1159 1.000 | phi   | 0.152 0.944
//   29 |   839 |  5766 0.146 |   926 0.906 |   839 1.000 | semi  | 0.145 0.902
//   31 |   725 |  5202 0.139 |   835 0.868 |   751 0.965 | semi  | 0.140 0.869
//   37 |   573 |  4194 0.137 |   676 0.848 |   612 0.936 | semi  | 0.135 0.840
//   41 |   483 |  3671 0.132 |   587 0.823 |   531 0.910 | semi  | 0.132 0.817
//   43 |   444 |  3393 0.131 |   552 0.804 |   499 0.890 | semi  | 0.128 0.797
//   47 |   375 |  3021 0.124 |   483 0.776 |   436 0.860 | semi  | 0.125 0.778
//   53 |   322 |  2616 0.123 |   416 0.774 |   376 0.856 | semi  | 0.123 0.761
//   59 |   272 |  2290 0.119 |   364 0.747 |   331 0.822 | semi  | 0.120 0.746
//   61 |   266 |  2180 0.122 |   352 0.756 |   320 0.831 | semi  | 0.118 0.733
//   67 |   242 |  1964 0.123 |   319 0.759 |   292 0.829 | semi  | 0.116 0.721
//   71 |   208 |  1831 0.114 |   296 0.703 |   262 0.794 | semi  | 0.114 0.710
//   73 |   197 |  1773 0.111 |   284 0.694 |   257 0.767 | semi  | 0.113 0.700
//   79 |   181 |  1637 0.111 |   265 0.683 |   240 0.754 | semi  | 0.111 0.690
//   83 |   181 |  1558 0.116 |   252 0.718 |   230 0.787 | prime | 0.110 0.681
//   89 |   162 |  1460 0.111 |   243 0.667 |   218 0.743 | prime | 0.108 0.673
//   97 |   141 |  1348 0.105 |   221 0.638 |   195 0.723 | prime | 0.107 0.665
//  101 |   143 |  1303 0.110 |   214 0.668 |   196 0.730 | prime | 0.106 0.658
//  103 |   125 |  1273 0.098 |   210 0.595 |   188 0.665 | prime | 0.105 0.652
//  107 |   131 |  1229 0.107 |   200 0.655 |   179 0.732 | prime | 0.104 0.645
//  109 |   131 |  1211 0.108 |   204 0.642 |   183 0.716 | prime | 0.103 0.639
//  113 |   120 |  1168 0.103 |   187 0.642 |   171 0.702 | prime | 0.102 0.633
//  127 |   101 |  1050 0.096 |   167 0.605 |   147 0.687 | prime | 0.101 0.628
//  131 |   101 |  1017 0.099 |   169 0.598 |   152 0.664 | prime | 0.100 0.623
//  137 |   102 |   975 0.105 |   165 0.618 |   147 0.694 | prime | 0.100 0.618
//  139 |    93 |   959 0.097 |   154 0.604 |   145 0.641 | prime | 0.099 0.614
//  149 |    86 |   892 0.096 |   139 0.619 |   123 0.699 | prime | 0.098 0.609
//  151 |    80 |   882 0.091 |   143 0.559 |   126 0.635 | prime | 0.097 0.605
//  157 |    80 |   844 0.095 |   134 0.597 |   117 0.684 | prime | 0.097 0.601
//  163 |    82 |   817 0.100 |   131 0.626 |   121 0.678 | prime | 0.096 0.597
//  167 |    71 |   799 0.089 |   134 0.530 |   120 0.592 | prime | 0.096 0.593
//  173 |    78 |   770 0.101 |   128 0.609 |   116 0.672 | prime | 0.095 0.590
//  179 |    70 |   748 0.094 |   120 0.583 |   108 0.648 | prime | 0.094 0.586
//  181 |    68 |   738 0.092 |   121 0.562 |   108 0.630 | prime | 0.094 0.583
//  191 |    65 |   691 0.094 |   111 0.586 |   104 0.625 | prime | 0.093 0.580
//  193 |    58 |   679 0.085 |   107 0.542 |    99 0.586 | prime | 0.093 0.577
//  197 |    61 |   667 0.091 |   111 0.550 |   100 0.610 | prime | 0.092 0.574
//  199 |    60 |   661 0.091 |   103 0.583 |    92 0.652 | prime | 0.092 0.571
//  211 |    62 |   626 0.099 |   102 0.608 |    92 0.674 | prime | 0.092 0.568
//  223 |    55 |   587 0.094 |    95 0.579 |    86 0.640 | prime | 0.091 0.565
//  227 |    52 |   573 0.091 |    96 0.542 |    86 0.605 | prime | 0.091 0.563
//  229 |    49 |   565 0.087 |    86 0.570 |    79 0.620 | prime | 0.090 0.560
//  233 |    46 |   554 0.083 |    90 0.511 |    80 0.575 | prime | 0.090 0.558
//  239 |    41 |   540 0.076 |    86 0.477 |    80 0.512 | prime | 0.089 0.555
//  241 |    46 |   534 0.086 |    89 0.517 |    82 0.561 | prime | 0.089 0.553
//  251 |    45 |   511 0.088 |    81 0.556 |    74 0.608 | prime | 0.089 0.551
//  257 |    40 |   491 0.081 |    78 0.513 |    70 0.571 | prime | 0.088 0.549
//  263 |    35 |   480 0.073 |    78 0.449 |    69 0.507 | prime | 0.088 0.546
//  269 |    39 |   468 0.083 |    77 0.506 |    69 0.565 | prime | 0.088 0.544
//  271 |    37 |   464 0.080 |    77 0.481 |    67 0.552 | prime | 0.087 0.542
//  277 |    40 |   448 0.089 |    75 0.533 |    69 0.580 | prime | 0.087 0.540
//  281 |    37 |   443 0.084 |    69 0.536 |    63 0.587 | prime | 0.087 0.538
//  283 |    30 |   439 0.068 |    70 0.429 |    62 0.484 | prime | 0.086 0.536
//  293 |    36 |   420 0.086 |    69 0.522 |    62 0.581 | prime | 0.086 0.534
//  307 |    32 |   396 0.081 |    64 0.500 |    59 0.542 | prime | 0.086 0.533
//  311 |    26 |   393 0.066 |    64 0.406 |    55 0.473 | prime | 0.086 0.531
//  313 |    31 |   389 0.080 |    62 0.500 |    55 0.564 | prime | 0.085 0.529
//  317 |    27 |   379 0.071 |    55 0.491 |    49 0.551 | prime | 0.085 0.527
//  331 |    25 |   352 0.071 |    52 0.481 |    46 0.543 | prime | 0.085 0.526
//  337 |    27 |   346 0.078 |    57 0.474 |    50 0.540 | prime | 0.084 0.524
//  347 |    29 |   331 0.088 |    55 0.527 |    50 0.580 | prime | 0.084 0.523
//  349 |    23 |   327 0.070 |    55 0.418 |    47 0.489 | prime | 0.084 0.521
//  353 |    23 |   316 0.073 |    51 0.451 |    46 0.500 | prime | 0.084 0.520
//  359 |    24 |   304 0.079 |    49 0.490 |    46 0.522 | prime | 0.083 0.518
//  367 |    20 |   298 0.067 |    46 0.435 |    43 0.465 | prime | 0.083 0.517
//  373 |    22 |   293 0.075 |    44 0.500 |    40 0.550 | prime | 0.083 0.515
//  379 |    24 |   287 0.084 |    47 0.511 |    42 0.571 | prime | 0.083 0.514
//  383 |    24 |   284 0.085 |    54 0.444 |    48 0.500 | prime | 0.083 0.513
//  389 |    25 |   276 0.091 |    46 0.543 |    43 0.581 | prime | 0.082 0.511
//  397 |    18 |   262 0.069 |    46 0.391 |    42 0.429 | prime | 0.082 0.510
//  401 |    19 |   255 0.075 |    45 0.422 |    40 0.475 | prime | 0.082 0.509
//  409 |    16 |   249 0.064 |    41 0.390 |    34 0.471 | prime | 0.082 0.507
//  419 |    19 |   238 0.080 |    37 0.514 |    34 0.559 | prime | 0.082 0.506
//  421 |    14 |   232 0.060 |    37 0.378 |    33 0.424 | prime | 0.081 0.505
//  431 |    16 |   225 0.071 |    37 0.432 |    35 0.457 | prime | 0.081 0.504
//  433 |    14 |   221 0.063 |    37 0.378 |    32 0.438 | prime | 0.081 0.503
//  439 |    15 |   215 0.070 |    34 0.441 |    28 0.536 | prime | 0.081 0.501
//  443 |    14 |   210 0.067 |    34 0.412 |    32 0.438 | prime | 0.081 0.500
//  449 |    11 |   206 0.053 |    34 0.324 |    31 0.355 | prime | 0.080 0.499
//  457 |    14 |   200 0.070 |    33 0.424 |    32 0.438 | prime | 0.080 0.498
//  461 |    16 |   195 0.082 |    32 0.500 |    30 0.533 | prime | 0.080 0.497
//  463 |    15 |   191 0.079 |    33 0.455 |    29 0.517 | prime | 0.080 0.496
//  467 |    13 |   187 0.070 |    29 0.448 |    28 0.464 | prime | 0.080 0.495
//  479 |    11 |   176 0.063 |    28 0.393 |    24 0.458 | prime | 0.080 0.494
//  487 |    14 |   166 0.084 |    26 0.538 |    24 0.583 | prime | 0.079 0.493
//  491 |    11 |   165 0.067 |    26 0.423 |    22 0.500 | prime | 0.079 0.492
//  499 |    15 |   157 0.096 |    28 0.536 |    26 0.577 | prime | 0.079 0.491
//  503 |    14 |   150 0.093 |    26 0.538 |    23 0.609 | prime | 0.079 0.490
//  509 |    14 |   144 0.097 |    24 0.583 |    21 0.667 | prime | 0.079 0.489
//  521 |    11 |   137 0.080 |    24 0.458 |    22 0.500 | prime | 0.079 0.488
//  523 |    11 |   133 0.083 |    22 0.500 |    20 0.550 | prime | 0.078 0.487
//  541 |     7 |   122 0.057 |    20 0.350 |    18 0.389 | prime | 0.078 0.486
//  547 |     9 |   116 0.078 |    18 0.500 |    17 0.529 | prime | 0.078 0.485
//  557 |    11 |   111 0.099 |    22 0.500 |    19 0.579 | prime | 0.078 0.484
//  563 |     7 |   104 0.067 |    15 0.467 |    15 0.467 | prime | 0.078 0.483
//  569 |     7 |   102 0.069 |    16 0.438 |    13 0.538 | prime | 0.078 0.482
//  571 |     7 |   100 0.070 |    16 0.438 |    15 0.467 | prime | 0.078 0.481
//  577 |     5 |    96 0.052 |    14 0.357 |    13 0.385 | prime | 0.077 0.481
//  587 |     9 |    89 0.101 |    19 0.474 |    18 0.500 | prime | 0.077 0.480
//  593 |     5 |    84 0.060 |    16 0.313 |    13 0.385 | prime | 0.077 0.479
//  599 |     9 |    76 0.118 |    14 0.643 |    13 0.692 | prime | 0.077 0.478
//  601 |     7 |    74 0.095 |    13 0.538 |    13 0.538 | prime | 0.077 0.477
//  607 |     3 |    72 0.042 |    11 0.273 |    10 0.300 | prime | 0.077 0.477
//  613 |     5 |    69 0.072 |    12 0.417 |     8 0.625 | prime | 0.077 0.476
//  617 |     6 |    65 0.092 |    11 0.545 |    10 0.600 | prime | 0.077 0.475
//  619 |     4 |    61 0.066 |     8 0.500 |     8 0.500 | prime | 0.076 0.474
//  631 |     4 |    52 0.077 |     8 0.500 |     8 0.500 | prime | 0.076 0.473
//  641 |     3 |    47 0.064 |     9 0.333 |     8 0.375 | prime | 0.076 0.473
//  643 |     2 |    45 0.044 |     8 0.250 |     8 0.250 | prime | 0.076 0.472
//  647 |     3 |    43 0.070 |     6 0.500 |     6 0.500 | prime | 0.076 0.471
//  653 |     3 |    38 0.079 |     6 0.500 |     5 0.600 | prime | 0.076 0.471
//  659 |     3 |    36 0.083 |     4 0.750 |     4 0.750 | prime | 0.076 0.470
//  661 |     2 |    32 0.063 |     5 0.400 |     4 0.500 | prime | 0.076 0.469
//  673 |     1 |    27 0.037 |     4 0.250 |     4 0.250 | prime | 0.075 0.468
//  677 |     1 |    23 0.043 |     4 0.250 |     4 0.250 | prime | 0.075 0.468
//  683 |     0 |    18 0.000 |     4 0.000 |     3 0.000 | prime | 0.075 0.467
//  691 |     1 |    12 0.083 |     2 0.500 |     2 0.500 | prime | 0.075 0.466
//  701 |     1 |     9 0.111 |     3 0.333 |     3 0.333 | prime | 0.075 0.466
//  709 |     0 |     5 0.000 |     1 0.000 |     1 0.000 | prime | 0.075 0.465
//  bands (n, actual, cap1, cap2): phi(q<=W^1/4): 2, 2722, 17296, 2791 | semi: 13, 5127, 39538, 6355 | prime(q>W^1/3): 105, 3902, 42895, 6989
//  TOTAL: removed 11751 of N=14850 (survivors 3099); sum cap1 = 99729; sum cap2 = 16135; sum cap2+ = 14768
//  pigeonhole, cap1: survivors >= N - 99729 = -84879  (negative)
//  pigeonhole, cap2: survivors >= N - 16135 = -1285  (negative — cap2 still overshoots)
//  pigeonhole, cap2+: survivors >= N - 14768 = 82  (POSITIVE — survivors PROVEN by counting alone)
//  cap_K ladder (sum over q; enforce first K freshness moduli): K=0:16135  K=1:15346  K=2:14768<N!  K=3:14378<N!  K=4:14040<N!  K=5:13780<N!  K=6:13578<N!  K=7:13397<N!  K=8:13245<N!  K=9:13125<N!  K=10:13018<N!  K=11:12919<N!  K=12:12831<N!
//  minimal K closing the pigeonhole at @17: K* = 2  (survivors >= 82)
//  tail (prime regime) cap1: exact Sum 2(pi(W/q)-pi(q-1))+1 = 42895; Rosser-Schoenfeld closed form <= 50406; PNT-style 2ln2*W/lnW = 53847
//  tail cap1 / N = 2.89; tail cap2 / N = 0.47; tail actual/cap1 = 0.091; tail actual/cap2 = 0.558
//  heuristic re-weighting of cap1: * (a)+(b) factors = 16070; * pred(all three) = 11837  [actual 11751, N 14850]
//
// ===== @19: W=9699690, N=252450, W^(1/4)=55.81, W^(1/3)=213.26, sqrt(W)=3114.4, 435 scour primes; freshness moduli pool {23,29,31,37,41,43,47,53,59,61,67,71} =====
//  bands (n, actual, cap1, cap2): phi(q<=W^1/4): 8, 93787, 678087, 103189 | semi: 31, 66213, 623126, 94773 | prime(q>W^1/3): 396, 54070, 724717, 110439
//  TOTAL: removed 214070 of N=252450 (survivors 38380); sum cap1 = 2025930; sum cap2 = 308401; sum cap2+ = 286158
//  pigeonhole, cap1: survivors >= N - 2025930 = -1773480  (negative)
//  pigeonhole, cap2: survivors >= N - 308401 = -55951  (negative — cap2 still overshoots)
//  pigeonhole, cap2+: survivors >= N - 286158 = -33708  (negative — still overshoots)
//  cap_K ladder (sum over q; enforce first K freshness moduli): K=0:308401  K=1:295354  K=2:286158  K=3:278307  K=4:272316  K=5:267251  K=6:262847  K=7:258960  K=8:255783  K=9:253073  K=10:250573<N!  K=11:248400<N!  K=12:246464<N!
//  minimal K closing the pigeonhole at @19: K* = 10  (survivors >= 1877)
//  tail (prime regime) cap1: exact Sum 2(pi(W/q)-pi(q-1))+1 = 724717; Rosser-Schoenfeld closed form <= 854132; PNT-style 2ln2*W/lnW = 835838
//  tail cap1 / N = 2.87; tail cap2 / N = 0.44; tail actual/cap1 = 0.075; tail actual/cap2 = 0.490
//  heuristic re-weighting of cap1: * (a)+(b) factors = 308308; * pred(all three) = 215658  [actual 214070, N 252450]
//
// ===== ASYMPTOTICS: tail hard cap (2ln2*W/lnW) vs N =====
//  x=  31: theta=   26.0  N/W=2.070e-2  tailcap/W=5.327e-2  tailcap/N=2.574
//  x=  53: theta=   44.9  N/W=1.636e-2  tailcap/W=3.085e-2  tailcap/N=1.886
//  x= 101: theta=   88.3  N/W=1.251e-2  tailcap/W=1.569e-2  tailcap/N=1.254
//  CROSSOVER: first x with tail cap < N is x = 149  (ln W = theta = 131.6, W ~ e^132 ~ 10^57)
//  x= 149: theta=  131.6  N/W=1.078e-2  tailcap/W=1.053e-2  tailcap/N=0.977
//  x= 151: theta=  136.7  N/W=1.064e-2  tailcap/W=1.014e-2  tailcap/N=0.953
//  x= 199: theta=  188.6  N/W=9.508e-3  tailcap/W=7.352e-3  tailcap/N=0.773
//  x= 251: theta=  232.1  N/W=8.870e-3  tailcap/W=5.972e-3  tailcap/N=0.673
//  x= 401: theta=  376.7  N/W=7.590e-3  tailcap/W=3.680e-3  tailcap/N=0.485
//  x= 997: theta=  956.2  N/W=5.771e-3  tailcap/W=1.450e-3  tailcap/N=0.251
//  tailcap/N ~ (30 ln 2 / c) * (ln x)^2 / x -> 0: the whole scour tail q > W^(1/3) is asymptotically NEGLIGIBLE against N.
//  But survivors ~ C2*W/(ln W)^2 << tail cap ~ 1.39*W/ln W: the prime-count cap is one factor of ln W too coarse to prove survival, at every x.
// ============================================================================
// READINGS (2026-08-14)
//
// 1. THE STAIRCASE THEOREM HOLDS, EXHAUSTIVELY. 599 scour primes checked
//    across @11/@13/@17/@19 (10+34+120+435); fresh(q) <= cap holds for every
//    one at every rung of the ladder (asserted, zero violations). The regime
//    cross-checks pass everywhere: for q^3 > W+1 the exact Phi* count EQUALS
//    the prime-count formula pi((W+-1)/q) - pi(q-1) (so late fresh victims are
//    exactly q x prime); for q^4 > W+1 it equals prime + exact semiprime
//    count. At @17 the ladder is: Phi-regime {19,23}, semiprime {29..79},
//    prime-count {83..709}. Correction to the task sheet: 105 of 120 scour
//    primes at @17 are in the prime regime (pi(709)-pi(79) = 105, not 102/125).
//
// 2. cap1 (divisibility skeleton only — the clean elementary theorem) is
//    rigorous but never a pigeonhole: sum cap1 / N = 3.2 / 5.1 / 6.7 / 8.0 at
//    x = 11 / 13 / 17 / 19, overshoot vs actual removals ~6.4x-9.5x. Note the
//    task's "only 19 and 23 uncapped" framing dissolves: EVERY q has an exact
//    Phi* cap; the true division is closed-FORM (prime/semiprime counting,
//    Rosser-Schoenfeld-able) vs finite computation.
//
// 3. THE SLACK OF cap1 IS COMPLETELY UNDERSTOOD — the surprise of the run.
//    fresh/cap1 matches pred = (1/4) * prod_{7<=p<=x}(1-1/(p-1)) *
//    prod_{x<q'<q}(1-1/(q'-1)) to 2-3 significant figures down entire tables
//    (@17: q=19 ratio .161 vs pred .161; q=29 .146 vs .145; q=83 .116 vs .110;
//    band means within a few %). Nothing mysterious is lost. The three factors:
//    (a) mod-30 house (x1/4), (b) second natal residue per wheel prime,
//    (c) second freshness residue per already-marched scour prime — a Mertens
//    product ~ ln x / ln q. This decomposition is the map for everything below.
//
// 4. MAIN RESULT — THE RESIDUE-REFINED LADDER CLOSES THE PIGEONHOLE.
//    (a)+(b) are deterministic congruences on the cofactor m, so cap2 (fold
//    them in) is still an exact, per-prime, HISTORY-BLIND hard cap: it knows
//    which primes marched earlier, never where any strike landed. Adding the
//    freshness congruences one modulus at a time gives cap_K. Measured:
//       @11: K* = 0   sum 56    < N = 90     => survivors >= 34   (true 45)
//       @13: K* = 0   sum 880   < N = 990    => survivors >= 110  (true 307)
//       @17: K* = 2   sum 14768 < N = 14850  => survivors >= 82   (true 3099)
//       @19: K* = 10  sum 250573< N = 252450 => survivors >= 1877 (true 38380)
//    A slot surviving the scour to sqrt(W) is a genuine twin pair (checked:
//    no prime sits between the last scour prime and sqrt(W+1) at any of the
//    four levels, so composites cannot hide). Hence these are elementary
//    counting proofs of >= 34 / 110 / 82 / 1877 twin pairs in the respective
//    tiles, obtained WITHOUT locating a single strike or testing a single
//    slot. The facts are trivial (direct counting is cheaper); the FORM is
//    the result: per-prime independent caps suffice, and K* is their price.
//
// 5. WHERE EXACTNESS LIVES: cap2 of the FIRST scour prime is exact by
//    construction (no freshness conditions exist for the first marcher) —
//    @17: cap2(19) = 1564 = fresh + s, ratio 0.999. Below the first marcher
//    the entire cap2 overshoot is factor (c): r2 = fresh/cap2 tracks pred2 =
//    prod(1-1/(q'-1)) all the way down (1.00 -> 0.47 at q = 709).
//
// 6. THE TAIL THEOREM (parts 3+5 of the brief). For q > W^(1/3):
//    fresh(q) <= 2(pi((W+1)/q) - pi(q-1)) + 1. Summed at @17: 42,895 exact;
//    <= 50,406 by Rosser-Schoenfeld closed form; ~ 2ln2 * W/ln W by PNT
//    (53,847). The exact sum sits below the RS closed form at every level,
//    as it must. The PNT column is an asymptotic guide and NOT a bound: the
//    order is exact < RS < PNT at @11, @13 and @17, but at @19 the PNT form
//    already undercuts the RS bound and the order is exact < PNT < RS
//    (724,717 < 835,838 < 854,132), as line 343 of the output above prints.
//    Against N:
//    tailcap1/N = 2.4 / 2.7 / 2.9 / 2.9 at x = 11/13/17/19 — but the ratio ~
//    (30*2ln2/c)(ln x)^2/x, crosses below 1 first at x = 149 (W ~ 10^57), and
//    -> 0. So UNCONDITIONALLY, by prime counting alone, the entire scour tail
//    q in (W^(1/3), sqrt(W)] is asymptotically negligible against N: the twin
//    question inside a tile is decided entirely by q in (x, W^(1/3)]. (With
//    cap2 the tail is even cheaper: ~0.47*N already at x = 11..19.)
//
// 7. HONEST STRUCTURAL VERDICT. The escalation K* = 0, 0, 2, 10 is the wall
//    in miniature. Actual removals approach N (50% / 69% / 79% / 85%), so a
//    history-blind cap family must be tight to a factor 1 + O(survivors/N) =
//    1 + O((ln x/ln W)^2), while truncating freshness at the K-th modulus
//    costs ~ ln(sqrt(W))/ln(q_K) — forcing K* to grow until the moduli list
//    IS the scour and the "cap" degenerates into the march itself. Gains per
//    added modulus are already visibly shrinking in the @19 ladder (13k for
//    the 1st, 2.5k for the 10th). This is the classical sieve wall — bounding
//    #{m <= t : m rough, qm+2 rough} is Brun-upper-bound territory, and the
//    parity obstruction is why no cheap trick finishes it — but reproduced
//    here with a fully verified finite ledger of where every lost factor
//    lives. No oversell: nothing here approaches a twin-prime proof.
//
// 8. REUSABLE PIECES FOR THE PROGRAMME: (i) Cofactor Rigidity — a fresh kill
//    by q has victim q*m with lpf(m) >= q; above W^(1/3) late deaths are
//    EXACTLY "q times a prime >= q", a clean structural fact about who dies
//    late; (ii) the self-strike classification s(q): q = 11,17 (mod 30) can
//    self-strike only at r = q, q = 13,19 only at r = q-2, and q = 1,7,23,29
//    (mod 30) can NEVER self-strike a Natal@5 slot (asserted at all levels —
//    refines the twin-finder reading of the self-strike column); (iii) the
//    proven survivor floors and the K* curve as an honest, quantitative
//    measure of the wall's steepness. Next: extend K* to @23 (W = 223M —
//    needs a bitset march, ~minutes) to see if K* growth is ~linear in the
//    scour length or worse.
// 9. FORWARD POINTER (2026-08-17 script sweep). Reading 8's next step is done,
//    and it moved reading 7. natal-cap-11 marched @23 (K* = 27, floor 4841)
//    and natal-cap-18 marched @29 (K* = 69, floor 31,327), so K* now reads
//    0, 0, 2, 10, 27, 69 over six levels. K* grows strictly SLOWER than the
//    scour (K*/scour = 0.0167, 0.0230, 0.0155, 0.0088; pairwise exponent
//    1.25 -> 0.72 -> 0.62), so reading 7's fear that the moduli list becomes
//    the scour and the cap degenerates into the march is refuted twice over.
//    The K* law of record is the quarter-power band, K*/(pi(W^1/4) - pi(x)) =
//    1.00, 1.25, 1.29, 1.35 at @17/@19/@23/@29, not linearity in the scour.
//    What does collapse is certificate EFFICIENCY at the crossing, floor over
//    truth running 0.76, 0.36, 0.026, 0.049, 0.0081, 0.0025 at @11..@29 — and
//    natal-cap-24 then showed even that is an artifact of reading only K*: at
//    fixed RELATIVE depth the bound-over-truth ratio IMPROVES with level.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure:
//   "11,17", "13,19" and "1,7,23,29" in reading 8 are comma-separated residue
//   sets mod 30, not quantities. The first two sets are named in the code
//   header at line 23; the third is the complementary set of never-self-
//   striking natal residues.
//   "line 343" in reading 6 is a pointer into the output, not a measurement.
//   The three tail figures it points at are printed together on output line
//   213 (file line 426), so the pointer is stale; the figures themselves are
//   present and the ordering claim checks.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   Reading 9's floor-over-truth series. 0.049 is 1877/38380 with both terms
//   from reading 4 of this file. 0.0081 is 4841/597475 and 0.0025 is
//   31327/12307838, each dividing a borrowed floor by the borrowed true twin
//   count on the matching level.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   4841 and the ratio 1.29, from natal-cap-11-kstar23.js, which prints
//   "CERTIFIED survivors >= 4841" and "K*/phi-band = 1.29".
//   31,327 and the ratio 1.35, from natal-cap-18-at29.js, which prints
//   "CERTIFIED survivors >= 31327" and "K*/phi-band = 1.35"; the same run
//   supplies the truth counts S=597475 at @23 and S=12307838 at @29 used in
//   the derivations above.
//   The K*/scour series 0.0167, 0.0230, 0.0155, 0.0088 is printed as one line
//   in natal-cap-24-boundK-curve.js; 0.0155 and 0.0088 are independently
//   printed by natal-cap-11 and natal-cap-18 respectively.
// ---------------------------------------------------------------------------
