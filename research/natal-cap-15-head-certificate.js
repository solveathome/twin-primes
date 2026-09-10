// ============================================================================
// ATTACK 15 — THE COMPOSED HEAD CERTIFICATE
// Head-exact inclusion–exclusion + staircase tail caps, with a full sweep of
// the head/tail boundary B.  (2026-08-14; composes natal-cap-06 (I-E ladder),
// natal-cap-08 (staircase caps / cap_K freshness ladder), natal-cap-12
// (Structured-Bias Theorem: pair terms are formula-priceable).)
// ============================================================================
// FORWARD POINTER (2026-08-15, night-run reconciliation). The negative verdict
// here (the composed head+tail certificate dies on the tail at every
// affordable boundary; head-exactness buys ≤ 0.1%; 99.9% of certified
// survivors come from ladder depth) STANDS, and has since been refined rather
// than reversed:
//   - natal-cap-24-boundK-curve.js reading 5: the ladder is the right
//     technology and is now priced in closed form, bound_pred(K)/N ≈
//     1 − (Σcap₂/N)·(ln x / ln q_K) by Mertens, accurate to 2.5–4.1% over
//     entire curves. Efficiency at fixed relative depth improves with level.
//   - natal-cap-28-analytic-certificate.js closed the analytic side: the
//     Legendre-comb head certificate is a theorem, and the deep-K deviation
//     is a Buchstab correction (the pair-resummation hypothesis was refuted;
//     the correlation is all-orders and exactly ω(u)), collapsing 3.4% → 0.2%.
// So "head-exactness is not where the value is" survives; "certificates lose
// efficiency with level" does not.
//
// THE CANDIDATE (the only scaling-certificate shape left on the board):
//
//   survivors >= N − |∪_{x<q<=B} A_q|  −  Σ_{B<q<=√W} cap(q)
//                     \__ head: EXACT __/    \__ tail: staircase caps __/
//
// A_q = {r ∈ N_x : r ≡ 0 or −2 (mod q)}; N_x the Natal@5 set of tile @x,
// W = x#, N = |N_x| = 90 / 990 / 14850 / 252450 at x = 11 / 13 / 17 / 19.
//
// VALIDITY (two lines). The scour marches ascending, so the slots removed by
// primes <= B are EXACTLY ∪_{q<=B} A_q — no truncation, no Bonferroni error;
// every later removal is a fresh kill of some q > B, and the cap-08 staircase
// caps bound fresh(q) history-blind (valid whatever marched first). Hence for
// EVERY boundary B:  survivors >= alive(B) − Σ_{q>B} cap(q),  with
// alive(B) = N − |head union| known exactly. Three proven tail ledgers:
//   cap1 = Φ*(⌊(W−1)/q⌋,q) + Φ*(⌊(W+1)/q⌋,q) + s(q)   (divisibility skeleton;
//          for q³ > W+1 this IS 2(π((W±1)/q) − π(q−1)) + s — pure prime count)
//   cap2 = cap1 with the natal residue system enforced on v = q·m  (cap-08)
//   capH = cap2 + the 2 forbidden freshness residues mod EVERY head prime —
//          cap_K with freshness moduli = the head itself, K = π(B)−π(x).
//          This is the natural companion of an exact head: the tail caps get
//          to SEE the whole head through congruences.  (the HYBRID)
//
// COST MODEL — why "head" was ever plausible. The head q <= W^(1/3) is tiny
// (0 / 5 / 15 / 39 primes at x = 11/13/17/19), and cap-12 proved its pair
// terms are PRICEABLE: cnt(q,q′) = 4N/Q + structured bias (exact, O(log Q)
// per pair) + O(1)-rms residual. So a head I-E certificate costs 2^h terms,
// h = π(B)−π(x) — not a scan of W. The tail is prime counting. The honest
// questions, answered below:
//  Q1  verify the certificate machinery exactly at x = 13, 17, 19 (truth
//      307 / 3099 / 38380 survivors), head union by direct scan AND by the
//      S_k identity I-E; price S₂ by the cap-12 formula and compare.
//  Q2  sweep B from W^(1/4) to W^(2/5): is the composed bound (cap1 tail)
//      EVER positive? where does it first turn positive if B runs on to √W,
//      and what does 2^h cost there?
//  Q3  is full head I-E ever cheaper per certified survivor than cap-08's
//      freshness ladder (floors 34 / 110 / 82 / 1877 at K* = 0/0/2/10)?
//  Q4  salvage: does the HYBRID (head exact + capH tail) beat those floors?
// ============================================================================
'use strict';

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
function assert(c,msg){if(!c)throw new Error('ASSERT FAIL: '+msg)}
function inv(a,m){let[or,r]=[((a%m)+m)%m,m],[os,s]=[1,0];while(r){const k=Math.floor(or/r);[or,r]=[r,or-k*r];[os,s]=[s,os-k*s]}assert(or===1,'not coprime');return((os%m)+m)%m}
const lg2=h=>(h*Math.LN2/Math.LN10); // log10(2^h)

// least-prime-factor sieve: m ranges reach (W+1)/23 = 421,726 at x=19
const LIM=430000;
const lpf=new Int32Array(LIM+1);
for(let i=2;i<=LIM;i++)if(lpf[i]===0)for(let j=i;j<=LIM;j+=i)if(lpf[j]===0)lpf[j]=i;

const EXPECT={11:45,13:307,17:3099,19:38380};
const FLOOR8={11:34,13:110,17:82,19:1877}, KSTAR={11:0,13:0,17:2,19:10};

function buildTile(x){
  const wheel=primesUpTo(x), mids=wheel.filter(p=>p>=7);
  let W=1;for(const p of wheel)W*=p;
  const ok=r=>{for(const p of mids){const m=r%p;if(m===0||m===p-2)return false}return true};
  const slots=[];
  for(let r=11;r<W;r+=30)if(ok(r))slots.push(r);
  for(let r=17;r<W;r+=30)if(ok(r))slots.push(r);
  slots.sort((a,b)=>a-b);
  return {W,slots,mids};
}

for(const x of [11,13,17,19]){
  const {W,slots,mids}=buildTile(x), N=slots.length, sqrtW=Math.sqrt(W);
  const B14=Math.pow(W,0.25), B13=Math.cbrt(W), B25=Math.pow(W,0.4);
  const scour=primesUpTo(Math.floor(sqrtW)+1).filter(q=>q>x&&q*q<=W);
  // ---- ground truth: the ascending march (exact fresh(q) per prime) --------
  const alive=new Set(slots), rows=[];
  for(const q of scour){let f=0;for(const r of [...alive])if(r%q===0||(r+2)%q===0){alive.delete(r);f++}rows.push({q,fresh:f})}
  const survivors=alive.size;
  assert(survivors===EXPECT[x],`survivors @${x}: ${survivors} != ${EXPECT[x]}`);
  const prefix=[0];for(const r of rows)prefix.push(prefix[prefix.length-1]+r.fresh);
  console.log(`\n===== @${x}: W=${W}, N=${N}, survivors=${survivors} (verified), scour=${scour.length} primes; W^(1/4)=${B14.toFixed(1)}, W^(1/3)=${B13.toFixed(1)}, W^(2/5)=${B25.toFixed(1)} =====`);

  // ---- Q1: head at the canonical boundary B = W^(1/3) ----------------------
  const head=scour.filter(q=>q<=B13), h=head.length;
  const pairExact=new Map(); let unionScan=0, maxh=0;
  const hcnt=[];
  for(const r of slots){
    const hits=[];for(const q of head)if(r%q===0||(r+2)%q===0)hits.push(q);
    const k=hits.length; if(k){unionScan++;if(k>maxh)maxh=k}
    hcnt.push(k);
    for(let i=0;i<k;i++)for(let j=i+1;j<k;j++){const key=hits[i]*1e6+hits[j];pairExact.set(key,(pairExact.get(key)||0)+1)}
  }
  const S=new Array(maxh+1).fill(0); // S_k = Σ_r C(h_r,k), the cap-06 identity
  for(const k of hcnt)for(let j=1,c=k;j<=k;j++){S[j]+=c;c=c*(k-j)/(j+1)}
  let IE=0;for(let k=1;k<=maxh;k++)IE+=(k%2?1:-1)*S[k];
  assert(IE===unionScan,'I-E identity != direct union scan');
  assert(unionScan===prefix[h],'head union != march prefix');
  console.log(`head (x,W^(1/3)]: ${h} primes {${head.join(',')}}; EXACT union = ${unionScan} (direct scan = I-E via S_k identity = march prefix, all equal)`);
  console.log(`  S_k head: [${S.slice(1).join(', ')}]; alive(W^(1/3)) = ${N-unionScan}; full I-E cost 2^${h} = 10^${lg2(h).toFixed(1)} terms`);

  // ---- Q1b: price S₂ by the cap-12 Structured-Bias formula -----------------
  if(h>=2){
    let sE=0,sC=0,sP=0,ss=0,mx=0,nP=0;
    for(let i=0;i<h;i++)for(let j=i+1;j<h;j++){
      const q=head[i],qp=head[j],Q=q*qp,rho=W%Q;
      const exact=pairExact.get(q*1e6+qp)||0;
      const c1=q*(((qp-2)*inv(q,qp))%qp), c2=Q-2-c1;
      assert(c1%q===0&&c1%qp===qp-2&&c2%qp===0,'CRT combo classes');
      let len=0;for(const c of [0,Q-2,c1,c2])len+=((c<rho?Q:0)-rho)*N/(Q*W);
      const priced=4*N/Q+len-(N/W)*(1+((W-2)%Q===0?1:0));
      const res=exact-priced;
      sE+=exact;sC+=4*N/Q;sP+=priced;ss+=res*res;if(Math.abs(res)>mx)mx=Math.abs(res);nP++;
    }
    assert(Math.abs(sE-S[2])<1e-9,'pair map != S2 identity');
    console.log(`  S₂ priced (cap-12): exact ${sE} vs CRT ${sC.toFixed(1)} vs priced ${sP.toFixed(1)} | Σresid ${(sE-sP).toFixed(1)}, rms/pair ${Math.sqrt(ss/nP).toFixed(2)}, max ${mx.toFixed(2)} (${nP} pairs)`);
  }

  // ---- per-prime caps: cap1 / cap2 / capH histogram (one m-pass per q) -----
  // freshness-moduli pool = scour primes <= W^(2/5) (largest boundary swept)
  const fmods=scour.filter(q=>q<=B25);
  const condA=v=>{const t=v%30;if(t!==11&&t!==17)return false;for(const p of mids)if(v%p===p-2)return false;return true};
  const condB=v=>{const t=v%30;if(t!==13&&t!==19)return false;for(const p of mids)if(v%p===2)return false;return true};
  const caps=[];
  for(const {q,fresh} of rows){
    const A=Math.floor((W-1)/q),Bm=Math.floor((W+1)/q);
    const fm=fmods.filter(qq=>qq<q);
    const hist=new Array(fm.length+1).fill(0);
    let cap1=0;
    for(let m=2;m<=A;m++){if(lpf[m]<q)continue;cap1++;const v=q*m;if(!condA(v))continue;
      let j=0;for(;j<fm.length;j++){const t=v%fm[j];if(t===0||t===fm[j]-2)break}hist[j]++}
    for(let m=2;m<=Bm;m++){if(lpf[m]<q)continue;cap1++;const v=q*m;if(!condB(v))continue;
      let j=0;for(;j<fm.length;j++){const t=v%fm[j];if(t===0||t===2)break}hist[j]++}
    const s=[11,13,17,19].includes(q%30)?1:0; cap1+=s;
    const suf=new Array(fm.length+1).fill(0); // suf[K] = #admissible m with first-violation index >= K
    let acc=0;for(let j=fm.length;j>=0;j--){acc+=hist[j];suf[j]=acc}
    const capOf=K=>s+suf[Math.min(K,fm.length)];
    assert(fresh<=capOf(fm.length)&&capOf(fm.length)<=capOf(0)&&capOf(0)<=cap1,`cap chain violated at q=${q} @${x}`);
    caps.push({q,fresh,cap1,capOf});
  }

  // ---- Q2/Q4: sweep the boundary B over every scour-prime position ---------
  // i = #head primes; B = scour[i-1]; alive(B) = N − prefix[i] (EXACT);
  // bound = alive(B) − Σ_{tail} cap;  capH enforces the first i moduli.
  // lad = the EXTENDED cap-08 ladder at depth K=i (cap_K on ALL primes, head
  // capped too, no exact union) — isolates what head-exactness buys: bH − lad.
  const sweep=[];
  for(let i=0;i<=scour.length;i++){
    const B=i===0?x:scour[i-1];
    let t1=0,t2=0,tH=0,lad=0;
    for(let j=0;j<caps.length;j++){lad+=caps[j].capOf(i);
      if(j>=i){t1+=caps[j].cap1;t2+=caps[j].capOf(0);tH+=caps[j].capOf(i)}}
    const aliveB=N-prefix[i];
    sweep.push({i,B,aliveB,t1,t2,tH,b1:aliveB-t1,b2:aliveB-t2,bH:aliveB-tH,lad:N-lad});
  }
  assert(sweep[Math.min(KSTAR[x],scour.length)].lad>=FLOOR8[x],'extended ladder below cap-08 floor at K*');
  // print: ~10 boundaries spanning [W^(1/4), W^(2/5)], + the canonical W^(1/3)
  const inRange=sweep.filter(r=>r.B>=B14&&r.B<=B25&&r.i>0);
  const picks=new Set();
  if(inRange.length){const st=Math.max(1,Math.floor(inRange.length/9));
    for(let k=0;k<inRange.length;k+=st)picks.add(inRange[k].i);picks.add(inRange[inRange.length-1].i)}
  picks.add(h); // canonical boundary
  console.log(`sweep (B in [W^(1/4), W^(2/5)]): i=#head | B | 10^cost | alive(B) | tailCap1 -> bound1 | bound2 | tailCapH -> boundH | ladder_i`);
  for(const r of sweep){if(!picks.has(r.i))continue;
    const tag=r.i===h?' <- W^(1/3)':'';
    console.log(` ${String(r.i).padStart(3)} | ${String(r.B).padStart(4)} | 10^${lg2(r.i).toFixed(1).padStart(5)} | ${String(r.aliveB).padStart(6)} | ${String(r.t1).padStart(7)} -> ${String(r.b1).padStart(8)} | ${String(r.b2).padStart(7)} | ${String(r.tH).padStart(6)} -> ${String(r.bH).padStart(7)}${r.bH>0?' POS':''} | ${String(r.lad).padStart(7)}${tag}`);
  }
  // first positive boundary for each ledger, over the WHOLE range to √W
  const firstPos=key=>sweep.find(r=>r[key]>0);
  for(const [key,name] of [['b1','cap1 (composed, pure staircase tail)'],['b2','cap2 tail'],['bH','capH tail (HYBRID)']]){
    const f=firstPos(key);
    console.log(` first B>0 for ${name}: ${f?`B=${f.B} (i=${f.i}, cost 2^${f.i}=10^${lg2(f.i).toFixed(1)}, bound ${f[key]})`:'NEVER (<=0 all the way to √W)'}`);
  }
  // best hybrid bound within the affordable window B <= W^(1/3) and <= W^(2/5)
  const best=(key,lim)=>sweep.filter(r=>r.B<=lim).reduce((a,r)=>r[key]>a[key]?r:a);
  const bh3=best('bH',B13), bh5=best('bH',B25), b13=best('b1',B25);
  console.log(` best composed (cap1 tail) in sweep: bound ${b13.b1} at B=${b13.B} — ${b13.b1>0?'POSITIVE':'never positive in [W^(1/4),W^(2/5)]'}`);
  console.log(` best HYBRID: B<=W^(1/3): bound ${bh3.bH} at B=${bh3.B} (i=${bh3.i}) | B<=W^(2/5): bound ${bh5.bH} at B=${bh5.B} (i=${bh5.i})`);
  console.log(` vs cap-08 ladder floor: ${FLOOR8[x]} (K*=${KSTAR[x]}) | truth ${survivors} | hybrid/floor = ${(bh3.bH/FLOOR8[x]).toFixed(1)}x, hybrid/truth = ${(bh3.bH/survivors).toFixed(3)}`);
  const iK=Math.min(KSTAR[x],scour.length), rc=sweep[h], rk=sweep[iK];
  console.log(` head-exactness premium (bH − extended ladder at same depth): i=K*=${iK}: ${rk.bH-rk.lad} (${rk.bH} vs ${rk.lad}) | i=${h} (W^(1/3)): ${rc.bH-rc.lad} (${rc.bH} vs ${rc.lad})`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-15-head-certificate.js
//   invocation:  node research/natal-cap-15-head-certificate.js
//   code-sha256: 620ed1ee165affa80dd8d4979aafbe7135fd01bbcc8ce63f2c3175bc7a8b0ca6
//   out-sha256:  61a129e2d0b4c95a433e5eaa7315fd4f94636d958a8e1bbfe5bf71ca473ed404
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.7 s
// ============================================================================
//
// ===== @11: W=2310, N=90, survivors=45 (verified), scour=10 primes; W^(1/4)=6.9, W^(1/3)=13.2, W^(2/5)=22.2 =====
// head (x,W^(1/3)]: 1 primes {13}; EXACT union = 13 (direct scan = I-E via S_k identity = march prefix, all equal)
//   S_k head: [13]; alive(W^(1/3)) = 77; full I-E cost 2^1 = 10^0.3 terms
// sweep (B in [W^(1/4), W^(2/5)]): i=#head | B | 10^cost | alive(B) | tailCap1 -> bound1 | bound2 | tailCapH -> boundH | ladder_i
//    1 |   13 | 10^  0.3 |     77 |     215 ->     -138 |      35 |     38 ->      39 POS |      38 <- W^(1/3)
//    2 |   17 | 10^  0.6 |     68 |     162 ->      -94 |      35 |     27 ->      41 POS |      40
//    3 |   19 | 10^  0.9 |     60 |     115 ->      -55 |      37 |     17 ->      43 POS |      41
//  first B>0 for cap1 (composed, pure staircase tail): B=31 (i=6, cost 2^6=10^1.8, bound 16)
//  first B>0 for cap2 tail: B=11 (i=0, cost 2^0=10^0.0, bound 34)
//  first B>0 for capH tail (HYBRID): B=11 (i=0, cost 2^0=10^0.0, bound 34)
//  best composed (cap1 tail) in sweep: bound -55 at B=19 — never positive in [W^(1/4),W^(2/5)]
//  best HYBRID: B<=W^(1/3): bound 39 at B=13 (i=1) | B<=W^(2/5): bound 43 at B=19 (i=3)
//  vs cap-08 ladder floor: 34 (K*=0) | truth 45 | hybrid/floor = 1.1x, hybrid/truth = 0.867
//  head-exactness premium (bH − extended ladder at same depth): i=K*=0: 0 (34 vs 34) | i=1 (W^(1/3)): 1 (39 vs 38)
//
// ===== @13: W=30030, N=990, survivors=307 (verified), scour=34 primes; W^(1/4)=13.2, W^(1/3)=31.1, W^(2/5)=61.8 =====
// head (x,W^(1/3)]: 5 primes {17,19,23,29,31}; EXACT union = 366 (direct scan = I-E via S_k identity = march prefix, all equal)
//   S_k head: [430, 73, 10, 1]; alive(W^(1/3)) = 624; full I-E cost 2^5 = 10^1.5 terms
//   S₂ priced (cap-12): exact 73 vs CRT 76.8 vs priced 76.4 | Σresid -3.4, rms/pair 1.16, max 2.38 (10 pairs)
// sweep (B in [W^(1/4), W^(2/5)]): i=#head | B | 10^cost | alive(B) | tailCap1 -> bound1 | bound2 | tailCapH -> boundH | ladder_i
//    1 |   17 | 10^  0.3 |    875 |    4373 ->    -3498 |     110 |    722 ->     153 POS |     153
//    2 |   19 | 10^  0.6 |    785 |    3806 ->    -3021 |     117 |    598 ->     187 POS |     186
//    3 |   23 | 10^  0.9 |    717 |    3364 ->    -2647 |     125 |    507 ->     210 POS |     209
//    4 |   29 | 10^  1.2 |    669 |    3028 ->    -2359 |     132 |    446 ->     223 POS |     222
//    5 |   31 | 10^  1.5 |    624 |    2720 ->    -2096 |     139 |    386 ->     238 POS |     237 <- W^(1/3)
//    6 |   37 | 10^  1.8 |    592 |    2460 ->    -1868 |     152 |    344 ->     248 POS |     247
//    7 |   41 | 10^  2.1 |    563 |    2225 ->    -1662 |     164 |    306 ->     257 POS |     256
//    8 |   43 | 10^  2.4 |    533 |    2000 ->    -1467 |     177 |    270 ->     263 POS |     261
//    9 |   47 | 10^  2.7 |    507 |    1797 ->    -1290 |     188 |    236 ->     271 POS |     268
//   10 |   53 | 10^  3.0 |    479 |    1621 ->    -1142 |     193 |    202 ->     277 POS |     274
//   11 |   59 | 10^  3.3 |    458 |    1460 ->    -1002 |     200 |    180 ->     278 POS |     275
//   12 |   61 | 10^  3.6 |    440 |    1306 ->     -866 |     209 |    160 ->     280 POS |     277
//  first B>0 for cap1 (composed, pure staircase tail): B=107 (i=22, cost 2^22=10^6.6, bound 2)
//  first B>0 for cap2 tail: B=13 (i=0, cost 2^0=10^0.0, bound 110)
//  first B>0 for capH tail (HYBRID): B=13 (i=0, cost 2^0=10^0.0, bound 110)
//  best composed (cap1 tail) in sweep: bound -866 at B=61 — never positive in [W^(1/4),W^(2/5)]
//  best HYBRID: B<=W^(1/3): bound 238 at B=31 (i=5) | B<=W^(2/5): bound 280 at B=61 (i=12)
//  vs cap-08 ladder floor: 110 (K*=0) | truth 307 | hybrid/floor = 2.2x, hybrid/truth = 0.775
//  head-exactness premium (bH − extended ladder at same depth): i=K*=0: 0 (110 vs 110) | i=5 (W^(1/3)): 1 (238 vs 237)
//
// ===== @17: W=510510, N=14850, survivors=3099 (verified), scour=120 primes; W^(1/4)=26.7, W^(1/3)=79.9, W^(2/5)=192.0 =====
// head (x,W^(1/3)]: 15 primes {19,23,29,31,37,41,43,47,53,59,61,67,71,73,79}; EXACT union = 7849 (direct scan = I-E via S_k identity = march prefix, all equal)
//   S_k head: [10880, 3711, 769, 97, 9, 1]; alive(W^(1/3)) = 7001; full I-E cost 2^15 = 10^4.5 terms
//   S₂ priced (cap-12): exact 3711 vs CRT 3663.3 vs priced 3660.2 | Σresid 50.8, rms/pair 1.88, max 7.04 (105 pairs)
// sweep (B in [W^(1/4), W^(2/5)]): i=#head | B | 10^cost | alive(B) | tailCap1 -> bound1 | bound2 | tailCapH -> boundH | ladder_i
//    3 |   29 | 10^  0.9 |  11289 |   76667 ->   -65378 |   -1129 |  10816 ->     473 POS |     472
//    6 |   41 | 10^  1.8 |   9508 |   63600 ->   -54092 |    -812 |   8235 ->    1273 POS |    1272
//    9 |   53 | 10^  2.7 |   8367 |   54570 ->   -46203 |    -502 |   6639 ->    1728 POS |    1725
//   12 |   67 | 10^  3.6 |   7587 |   48136 ->   -40549 |    -247 |   5565 ->    2022 POS |    2019
//   15 |   79 | 10^  4.5 |   7001 |   42895 ->   -35894 |      12 |   4774 ->    2227 POS |    2222 <- W^(1/3)
//   18 |   97 | 10^  5.4 |   6517 |   38529 ->   -32012 |     244 |   4137 ->    2380 POS |    2375
//   21 |  107 | 10^  6.3 |   6118 |   34724 ->   -28606 |     469 |   3610 ->    2508 POS |    2502
//   24 |  127 | 10^  7.2 |   5766 |   31295 ->   -25529 |     675 |   3164 ->    2602 POS |    2595
//   27 |  139 | 10^  8.1 |   5470 |   28344 ->   -22874 |     867 |   2793 ->    2677 POS |    2668
//   30 |  157 | 10^  9.0 |   5224 |   25726 ->   -20502 |    1037 |   2490 ->    2734 POS |    2725
//   33 |  173 | 10^  9.9 |   4993 |   23340 ->   -18347 |    1199 |   2201 ->    2792 POS |    2781
//   36 |  191 | 10^ 10.8 |   4790 |   21163 ->   -16373 |    1348 |   1950 ->    2840 POS |    2829
//  first B>0 for cap1 (composed, pure staircase tail): B=461 (i=82, cost 2^82=10^24.7, bound 19)
//  first B>0 for cap2 tail: B=79 (i=15, cost 2^15=10^4.5, bound 12)
//  first B>0 for capH tail (HYBRID): B=23 (i=2, cost 2^2=10^0.6, bound 83)
//  best composed (cap1 tail) in sweep: bound -16373 at B=191 — never positive in [W^(1/4),W^(2/5)]
//  best HYBRID: B<=W^(1/3): bound 2227 at B=79 (i=15) | B<=W^(2/5): bound 2840 at B=191 (i=36)
//  vs cap-08 ladder floor: 82 (K*=2) | truth 3099 | hybrid/floor = 27.2x, hybrid/truth = 0.719
//  head-exactness premium (bH − extended ladder at same depth): i=K*=2: 1 (83 vs 82) | i=15 (W^(1/3)): 5 (2227 vs 2222)
//
// ===== @19: W=9699690, N=252450, survivors=38380 (verified), scour=435 primes; W^(1/4)=55.8, W^(1/3)=213.3, W^(2/5)=623.3 =====
// head (x,W^(1/3)]: 39 primes {23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211}; EXACT union = 160000 (direct scan = I-E via S_k identity = march prefix, all equal)
//   S_k head: [251582, 120444, 35202, 7319, 1088, 110, 1]; alive(W^(1/3)) = 92450; full I-E cost 2^39 = 10^11.7 terms
//   S₂ priced (cap-12): exact 120444 vs CRT 120523.5 vs priced 120504.0 | Σresid -60.0, rms/pair 3.58, max 13.36 (741 pairs)
// sweep (B in [W^(1/4), W^(2/5)]): i=#head | B | 10^cost | alive(B) | tailCap1 -> bound1 | bound2 | tailCapH -> boundH | ladder_i
//    9 |   59 | 10^  2.7 | 153262 | 1302983 -> -1149721 |  -45133 | 153883 ->    -621 |    -623
//   19 |  103 | 10^  5.7 | 119216 |  998194 ->  -878978 |  -32792 | 103788 ->   15428 POS |   15423
//   29 |  157 | 10^  8.7 | 102644 |  833411 ->  -730767 |  -24298 |  80408 ->   22236 POS |   22228
//   39 |  211 | 10^ 11.7 |  92450 |  724717 ->  -632267 |  -17989 |  66472 ->   25978 POS |   25966 <- W^(1/3)
//   49 |  269 | 10^ 14.8 |  84936 |  641608 ->  -556672 |  -12820 |  56377 ->   28559 POS |   28543
//   59 |  331 | 10^ 17.8 |  79042 |  572801 ->  -493759 |   -8238 |  48584 ->   30458 POS |   30439
//   69 |  389 | 10^ 20.8 |  74301 |  515604 ->  -441303 |   -4274 |  42467 ->   31834 POS |   31812
//   79 |  449 | 10^ 23.8 |  70271 |  466075 ->  -395804 |    -752 |  37321 ->   32950 POS |   32924
//   89 |  509 | 10^ 26.8 |  66861 |  422346 ->  -355485 |    2500 |  33035 ->   33826 POS |   33796
//   99 |  587 | 10^ 29.8 |  63910 |  384160 ->  -320250 |    5381 |  29366 ->   34544 POS |   34511
//  106 |  619 | 10^ 31.9 |  62082 |  359649 ->  -297567 |    7296 |  27116 ->   34966 POS |   34931
//  first B>0 for cap1 (composed, pure staircase tail): B=2063 (i=303, cost 2^303=10^91.2, bound 476)
//  first B>0 for cap2 tail: B=463 (i=82, cost 2^82=10^24.7, bound 272)
//  first B>0 for capH tail (HYBRID): B=61 (i=10, cost 2^10=10^3.0, bound 1879)
//  best composed (cap1 tail) in sweep: bound -297567 at B=619 — never positive in [W^(1/4),W^(2/5)]
//  best HYBRID: B<=W^(1/3): bound 25978 at B=211 (i=39) | B<=W^(2/5): bound 34966 at B=619 (i=106)
//  vs cap-08 ladder floor: 1877 (K*=10) | truth 38380 | hybrid/floor = 13.8x, hybrid/truth = 0.677
//  head-exactness premium (bH − extended ladder at same depth): i=K*=10: 2 (1879 vs 1877) | i=39 (W^(1/3)): 12 (25978 vs 25966)
// ============================================================================
// READINGS (2026-08-14)
//
// 1. MACHINERY VERIFIED EXACTLY, ALL FOUR LEVELS. Survivors 45/307/3099/38380
//    reproduced by the march; head union by direct scan = I-E via the S_k hit
//    identity = march prefix (366 @13, 7849 @17, 160000 @19, asserted equal);
//    every cap chain fresh <= capH <= cap2 <= cap1 asserted for all 599 scour
//    primes (= 10+34+120+435 from the section headers); the extended ladder at K = K* lands exactly on cap-08's floors
//    34/110/82/1877 — full cross-validation of both files' machinery.
//
// 2. THE COMPOSED CERTIFICATE (exact head + pure staircase tail) IS NEGATIVE
//    AT EVERY AFFORDABLE BOUNDARY, x >= 13. Quantified: at B = W^(1/3) the
//    bound is alive − tailCap1 = 624−2720 = −2096 @13, 7001−42895 = −35894
//    @17, 92450−724717 = −632267 @19. The tail's prime-count cap is ~2.4-2.9N (= tailCap1/N at W^(1/3))
//    while alive(B) < N: no contest anywhere in [W^(1/4), W^(2/5)]. First
//    positive B (extending the sweep to √W): 31 / 107 / 461 / 2063, i.e.
//    W^0.44 / W^0.45 / W^0.47 / W^0.47 (= log B / log W) — creeping toward √W — at I-E cost
//    2^6 / 2^22 / 2^82 / 2^303 = 10^1.8 / 10^6.6 / 10^24.7 / 10^91.2 terms.
//    THE BINDING CONSTRAINT IS THE TAIL, NOT THE HEAD COST: cap1 is a factor
//    ~ln W too coarse (cap-08 reading 6: 1.39·W/ln W vs survivors W/ln²W), so
//    B must climb nearly to √W before the tail shuts up, and by then 2^h has
//    detonated. The composed architecture as briefed is dead on arrival.
//
// 3. THE HYBRID SALVAGE WORKS — NEW BEST ELEMENTARY FLOORS AT EVERY LEVEL.
//    survivors >= alive(B) − Σ_tail capH(q), capH = cap2 + freshness residues
//    mod every head prime. At the canonical B = W^(1/3):
//      @11: >= 39   @13: >= 238   @17: >= 2227   @19: >= 25978
//    vs cap-08's 34 / 110 / 82 / 1877 — improvements 1.1x / 2.2x / 27.2x / 13.8x,
//    reaching 87% / 78% / 72% / 68% of truth (hybrid/truth = 0.867 / 0.775 /
//    0.719 / 0.677). At B = W^(2/5): 43 / 280 /
//    2840 / 34966 (@19 = 91% of truth = 34,966/38,380). Still pure counting: one exact union
//    plus history-blind per-prime caps. These are the strongest elementary
//    certified twin floors in the campaign.
//
// 4. BUT THE DECOMPOSITION KILLS THE HEADLINE — head-exactness buys almost
//    nothing. The extended cap-08 ladder at the same modulus depth (cap_K,
//    K = i, applied to ALL primes, head capped too, no union computed)
//    matches the hybrid to within +1 / +1 / +5 / +12 at B = W^(1/3). The
//    hybrid's gain over cap-08's floors is >= 99.9% deeper freshness moduli
//    (cap-08 stopped at KMAX = 12; pushing K to 39 @19 is what buys
//    1877 -> 25966) and <= 0.1% the exact union. Q3 answered: full head I-E
//    costs 2^39 = 10^11.7 terms @19 to buy +12 survivors that ~10^7 m-loop
//    operations of ladder-deepening don't; per certified survivor it loses by
//    ~10 orders of magnitude, and the gap widens with x. Full I-E is never
//    the right way to spend a certificate budget in this family.
//
// 5. WHY the union is worth so little: the ladder's head caps are already
//    near-exact — the first marcher's cap2 is exact (cap-08 reading 5), and
//    each later head prime's cap sees every earlier head modulus, leaving
//    only the O(1)-per-prime anchored residual that cap-12 measured. The
//    union's information beyond congruences is a handful of slots per level.
//
// 6. S₂ PRICING (cap-12 Structured-Bias Theorem) CONFIRMED on the head
//    blocks: priced vs exact rms/pair 1.16 / 1.88 / 3.58 counts at
//    13/17/19; Σresid −3.4 / +50.8 / −60.0 over 10 / 105 / 741 pairs (CRT
//    alone misses by up to +48 @17 = 3711 − 3663.3; the structured term moves it the right
//    way; the remainder alternates in sign, as cap-12 proved). The pricing
//    technology works — but reading 4 removes its motive HERE: it prices a
//    term (the head I-E) that is not worth its exponent. Where it still
//    matters: a certified per-pair cap |resid| <= c(x) (campaign open lead 3)
//    upgrades depth-2 Bonferroni, not the full union.
//
// 7. FEEDS THE PAPER'S CERTIFICATE-TECHNOLOGY SECTION: the honest scaling
//    object is the LADDER-DEPTH CURVE bound(K), not any head/tail I-E split —
//    @19: 1877 (K=10) -> 25966 (K=39) -> 34931 (K=106), concave, diminishing
//    ~ per-modulus returns; generalize K*(x) to K_ε(x) = depth needed for
//    bound >= εN. Next measurements: (i) K_ε and the hybrid at @23 (W = 223M,
//    bitset march, ~minutes) — boundH/truth drifts 0.867/0.775/0.719/0.677 here,
//    ~5 pts/level, and whether it keeps sliding is the wall's fingerprint on
//    this technology; (ii) whether bound(K) concavity is Mertens-predictable
//    (each modulus q' multiplies tail slack by ~(1−1/(q'−1))), which would
//    make the whole ladder priceable in closed form.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   599 in reading 1 is the four levels' scour sizes added, and the reading
//     shows the addition. The section headers print scour=10, 34, 120 and 435
//     primes, which total 599.
//   0.44, 0.45, 0.47 and 0.47 in reading 2 are log B / log W for the printed
//     first-positive boundaries 31, 107, 461 and 2063 against the printed
//     widths 2310, 30030, 510510 and 9699690. The quotients are 0.4434,
//     0.4532, 0.4667 and 0.4744.
//   99.9 and its complement 0.1 in reading 4 are the split of the @19 gain.
//     The hybrid floor 25978 over cap-08's 1877 is a gain of 24101, of which
//     the exact union contributes the +12 the same reading names, which is
//     0.05 percent. The same split is stated in this file's header comment.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   1.39 in reading 2 is from research/natal-cap-08-staircase.js, whose
//   embedded OUTPUT carries the line "tail cap ~ 1.39*W/ln W: the prime-count
//   cap is one factor of ln W too coarse".
// ---------------------------------------------------------------------------
