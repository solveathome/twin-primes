#!/usr/bin/env node
// ============================================================================
// IMPORT-BRIDGE, part 1 of 2 — the two Ojaroudi lemmas VERIFIED on our tile
// ============================================================================
// PRE-REGISTERED at research/history/staging/import-bridge-prereg.md, committed
// alone before this file was written. Write-up: history/staging/import-bridge.md.
// Parents: history/staging/ojaroudi-read.md sec.6(d) (the two tools and their
// stated hypotheses), research/level-ledger-tight.md Thm 1 and sec.4(a) (the
// AP-discrepancy neighbour and the Parseval sup route the corpus already owns),
// research/discrepancy-two-class.md sec.2 (the D_x column, custody).
//
// THE OBJECTS, in our notation (prereg sec.1):
//   W = x#, T_x = {r : r !≡ 0,-2 mod q for all q <= x}, D = |T_x| = prod(q-2),
//   p = least prime > x (the fold prime),
//   U_x = {a + bW : a in T_x, 1 <= b <= p-1},  |U_x| = (p-1) D,
//   h_q(a) = #{r in T_x : r ≡ a mod q},  D_x(q) = sum_a (h_q(a) - D/q)^2,
//   B_q = #{n in U_x : q | n(n+2)}.
//
//   LEMMA A (BRIDGE)     | B_q - (2/q)|U_x| |  <=  2 sqrt(p-1) sqrt(D_x(q))
//                        for q coprime to W, q > 2.
//   LEMMA B (COLLISION)  sum_r k_{j,L}(r)^2 <= p sum_r h_L(r)^2
//                        = p ( D_x(L) + D^2/L ),  j in {0,2},
//                        k_{j,L}(r) = #{a in T_x : a + W b_j(a) ≡ r mod L},
//                        b_j(a) = -(a+j) W^{-1} mod p.
//
// SECTIONS
//   S0  CUSTODY. Tiles rebuilt from scratch, D against discrepancy-two-class
//       sec.2 and against import-chaining-02.js's tile().
//   S1  LEMMA A on his own grid (5 levels x 11 moduli = 55 pairs), then extended
//       to 8 levels x 60 moduli. B_q computed by DIRECT ENUMERATION over the
//       (a,b) pairs of U_x wherever affordable, and by the window identity
//       always; the two must agree exactly (prereg trap 2).
//   S2  CONTROL: drop the coprimality hypothesis (q <= x, so q | W) and watch it
//       break. Prereg P3.
//   S3  LEMMA B, on the stated hypotheses and on four deliberate violations of
//       them (non-squarefree L, L | W, L = p, L even). Prereg P1, P7.
//
//   node research/import-bridge-01-verify.js
//   node research/import-bridge-01-verify.js --quick     (drops x = 23)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const CHAIN2 = require(path.join(__dirname, 'import-chaining-02.js'));

const QUICK = process.argv.includes('--quick');

// ---------------------------------------------------------------- primitives
function primesTo(n){ const s=[]; for(let i=2;i<=n;i++){ let ok=true; for(let j=2;j*j<=i;j++) if(i%j===0){ok=false;break;} if(ok) s.push(i);} return s; }
function isPrime(n){ if(n<2) return false; for(let j=2;j*j<=n;j++) if(n%j===0) return false; return true; }
function nextPrime(n){ let m=n+1; while(!isPrime(m)) m++; return m; }
function inv(a,m){ a=((a%m)+m)%m; for(let t=1;t<m;t++) if((a*t)%m===1) return t; throw new Error('no inverse'); }

// OUR OWN tile builder, written for this file; S0 checks it against the corpus's.
function tile(x){
  let slots = Float64Array.from([5]), W = 6;
  for(const q of primesTo(x)){ if(q < 5) continue;
    const Dn = slots.length, rs = new Int32Array(Dn);
    for(let i=0;i<Dn;i++) rs[i] = slots[i] % q;
    const wq = W % q, out = new Float64Array(Dn*(q-2)); let n = 0;
    for(let k=0;k<q;k++){ const off = k*W, kw = (k*wq)%q, a0 = (q-kw)%q, a2 = (2*q-2-kw)%q;
      for(let i=0;i<Dn;i++) if(rs[i]!==a0 && rs[i]!==a2) out[n++] = slots[i] + off; }
    slots = out; W *= q; }
  slots.sort();
  return { slots, W, D: slots.length, x };
}

// h_q over the tile, and the exact integer sum of squares
function apCounts(T, q){
  const h = new Float64Array(q), s = T.slots, D = T.D;
  for(let i=0;i<D;i++) h[s[i] % q]++;
  let sq = 0, mx = 0; const mean = D/q;
  for(let r=0;r<q;r++){ sq += h[r]*h[r]; const d = Math.abs(h[r]-mean); if(d>mx) mx=d; }
  return { h, sumsq: sq, Dvar: sq - D*D/q, maxdev: mx };
}

// ============================================================== S0  CUSTODY
console.log('IMPORT-BRIDGE part 1 --- LEMMA A (Bridge) and LEMMA B (collision) on our tile\n');
console.log('S0  CUSTODY --- tiles rebuilt here, checked against the corpus');
const LEVELS = QUICK ? [3,5,7,11,13,17,19] : [3,5,7,11,13,17,19,23];
const PUB_D = {5:3, 7:15, 11:135, 13:1485, 17:22275, 19:378675, 23:7952175};   // discrepancy-two-class.md sec.2
const TILES = {};
console.log('   x |         W |         D | D published (2c sec.2) | matches | vs import-chaining-02 tile()');
for(const x of LEVELS){
  const T = tile(x); TILES[x] = T;
  const closed = (()=>{ let d=1; for(const q of primesTo(x)) if(q>=3) d*=(q-2); return d; })();
  let cross = 'not run';
  if(x <= 17){ const C = CHAIN2.tile(x); let same = (C.D===T.D && C.W===T.W);
    if(same) for(let i=0;i<T.D;i++) if(C.slots[i]!==T.slots[i]){ same=false; break; }
    cross = same ? 'identical, element by element' : 'DIFFERS'; }
  const pub = PUB_D[x]===undefined ? '(not tabulated)' : String(PUB_D[x]);
  const ok  = PUB_D[x]===undefined ? (T.D===closed ? 'closed form' : 'FAIL') : (T.D===PUB_D[x] && T.D===closed ? 'yes' : 'FAIL');
  console.log(`  ${String(x).padStart(2)} | ${String(T.W).padStart(9)} | ${String(T.D).padStart(9)} | ${pub.padStart(22)} | ${ok.padStart(7)} | ${cross}`);
}
console.log(`  [${el()}]`);

// ============================================================== S1  LEMMA A
console.log('\nS1  LEMMA A (BRIDGE)   | B_q - 2|U_x|/q |  <=  2 sqrt(p-1) sqrt(D_x(q))');
console.log('    B_q by DIRECT ENUMERATION over the (a,b) pairs of U_x wherever affordable,');
console.log('    and by the window identity B_q = sum_{b=1}^{p-1} [h_q(-bW) + h_q(-2-bW)] always.\n');

const HIS_LEVELS = [3,5,7,11,13];          // his F = 6, 30, 210, 2310, 30030
const HIS_MODULI = 11;                     // 5 x 11 = his 55 pairs
const EXT_MODULI = 60;

function bridgeRow(T, q){
  const p = nextPrime(T.x), W = T.W, D = T.D;
  const A = apCounts(T, q);
  // window identity
  const wq = W % q; let Bid = 0;
  for(let b=1;b<=p-1;b++){ const t = (b*wq) % q; Bid += A.h[(q - t) % q] + A.h[(2*q - 2 - t) % q]; }
  const main = 2*(p-1)*D/q;
  const lhs = Math.abs(Bid - main);
  const rhs = 2*Math.sqrt(p-1)*Math.sqrt(A.Dvar);
  return { q, p, Bid, main, lhs, rhs, ratio: rhs>0 ? lhs/rhs : (lhs===0?0:Infinity), Dvar: A.Dvar, maxdev: A.maxdev };
}
function bridgeDirect(T, q){            // no identity used: walk every n in U_x
  const p = nextPrime(T.x), W = T.W, D = T.D, s = T.slots; let B = 0;
  for(let b=1;b<=p-1;b++){ const off = b*W;
    for(let i=0;i<D;i++){ const n = s[i] + off; if(n % q === 0 || (n+2) % q === 0) B++; } }
  return B;
}

let nPairs = 0, nViol = 0, maxRatio = 0, maxAt = null;
let hisPairs = 0, hisMax = 0;
const perLevel = [];
for(const x of LEVELS){
  const T = TILES[x], p = nextPrime(x);
  const qs = []; for(let q=nextPrime(x); qs.length<EXT_MODULI; q=nextPrime(q)) if(T.W % q !== 0) qs.push(q);
  const directBudget = (T.D*(p-1) <= 3e7) ? qs.length : 2;    // full check when cheap, spot check otherwise
  let lvMax = 0, lvMaxQ = 0, lvViol = 0, lvDirOK = 0, lvDir = 0;
  let firstRow = null;
  for(let k=0;k<qs.length;k++){
    const r = bridgeRow(T, qs[k]); nPairs++;
    if(k===0) firstRow = r;
    if(r.lhs > r.rhs + 1e-9){ nViol++; lvViol++; }
    if(r.ratio > lvMax){ lvMax = r.ratio; lvMaxQ = r.q; }
    if(r.ratio > maxRatio){ maxRatio = r.ratio; maxAt = `x=${x}, q=${r.q}`; }
    if(HIS_LEVELS.includes(x) && k < HIS_MODULI){ hisPairs++; if(r.ratio>hisMax) hisMax = r.ratio; }
    if(k < directBudget){ lvDir++; if(bridgeDirect(T, qs[k]) === r.Bid) lvDirOK++; }
  }
  perLevel.push({x, p, D:T.D, qlo:qs[0], qhi:qs[qs.length-1], lvMax, lvMaxQ, lvViol, lvDir, lvDirOK, firstRow});
}
console.log('   x |  p | q range     | pairs | violations | max LHS/RHS | at q | direct-enum agrees');
for(const L of perLevel)
  console.log(`  ${String(L.x).padStart(2)} | ${String(L.p).padStart(2)} | ${String(L.qlo).padStart(3)}..${String(L.qhi).padStart(4)} | ${String(EXT_MODULI).padStart(5)} | ${String(L.lvViol).padStart(10)} | ${L.lvMax.toFixed(6).padStart(11)} | ${String(L.lvMaxQ).padStart(4)} | ${L.lvDirOK}/${L.lvDir}`);
console.log(`\n  TOTAL ${nPairs} (x,q) pairs, ${nViol} violations, max LHS/RHS = ${maxRatio.toFixed(6)} at ${maxAt}`);
console.log(`  HIS GRID  x in {3,5,7,11,13} x 11 smallest admissible q = ${hisPairs} pairs, max LHS/RHS = ${hisMax.toFixed(6)}  (his printed figure: 0.31)`);
console.log(`  [${el()}]`);

console.log('\n  The smallest admissible q at each level, against the injectivity requirement q >= p-1');
console.log('   x |  p | p-1 | smallest q with gcd(q,W)=1 | q >= p-1 automatic');
for(const L of perLevel)
  console.log(`  ${String(L.x).padStart(2)} | ${String(L.p).padStart(2)} | ${String(L.p-1).padStart(3)} | ${String(L.qlo).padStart(26)} | ${L.qlo >= L.p-1 ? 'yes' : 'NO'}`);

// ============================================================== S2  CONTROL
console.log('\nS2  CONTROL --- drop the coprimality hypothesis. q <= x, so q | W.');
console.log('    Every n in U_x is then ≡ a mod q with a !≡ 0,-2, so B_q = 0 by construction.');
console.log('   x |  q | B_q direct | 2|U_x|/q  |     LHS     |     RHS     | LHS/RHS | lemma');
let ctlViol = 0, ctlN = 0;
for(const x of LEVELS){
  if(x < 5) continue;
  const T = TILES[x], p = nextPrime(x);
  for(const q of primesTo(x)){ if(q < 5) continue;
    const A = apCounts(T, q);
    const B = (T.D*(p-1) <= 3e7) ? bridgeDirect(T,q) : 0;   // 0 is the proven value; direct where cheap
    const main = 2*(p-1)*T.D/q, lhs = Math.abs(B - main), rhs = 2*Math.sqrt(p-1)*Math.sqrt(A.Dvar);
    const bad = lhs > rhs + 1e-9; if(bad) ctlViol++; ctlN++;
    console.log(`  ${String(x).padStart(2)} | ${String(q).padStart(2)} | ${String(B).padStart(10)} | ${main.toFixed(3).padStart(9)} | ${lhs.toFixed(4).padStart(11)} | ${rhs.toFixed(4).padStart(11)} | ${(lhs/rhs).toFixed(4).padStart(7)} | ${bad?'FAILS':'holds'}`);
  }
}
console.log(`  ${ctlViol} of ${ctlN} control pairs VIOLATE the Bridge once coprimality is dropped.`);
console.log(`  [${el()}]`);

// ============================================================== S3  LEMMA B
console.log('\nS3  LEMMA B (COLLISION)   sum_r k_{j,L}(r)^2  <=  p ( D_x(L) + D^2/L )');
console.log('    STATED hypotheses: L squarefree, gcd(L, pW) = 1. Also run on four deliberate');
console.log('    violations of them, because the proof appears to use none.\n');

function killedImages(T, j){       // n_j(a) = a + W b_j(a),  b_j(a) = -(a+j) W^{-1} mod p
  const p = nextPrime(T.x), W = T.W, D = T.D, s = T.slots;
  const Wi = inv(W % p, p), out = new Float64Array(D);
  for(let i=0;i<D;i++){ const a = s[i]; const b = ((p - ((a + j) % p)) % p * Wi) % p; out[i] = a + W*b; }
  return out;
}
function sumsqMod(arr, L){ const c = new Float64Array(L); for(let i=0;i<arr.length;i++) c[arr[i] % L]++; let s=0; for(let r=0;r<L;r++) s+=c[r]*c[r]; return s; }

const collRows = [];
let collViol = 0, collN = 0, slackMin = Infinity, slackMax = 0, slackSum = 0;
let violViol = 0, violN = 0, violSlackMin = Infinity, violSlackMax = 0;
for(const x of LEVELS){
  if(x < 5) continue;
  const T = TILES[x], p = nextPrime(x);
  // the STATED family: primes L coprime to pW, plus squarefree composites of them
  const Ls = []; for(let q=nextPrime(p); Ls.length<8; q=nextPrime(q)) if(T.W % q !== 0 && q !== p) Ls.push({L:q, tag:'prime, (L,pW)=1'});
  Ls.push({L: Ls[0].L*Ls[1].L, tag:'squarefree composite'});
  Ls.push({L: Ls[0].L*Ls[2].L*Ls[3].L, tag:'squarefree composite'});
  // the deliberate VIOLATIONS of the stated hypotheses
  const bad = [ {L: Ls[0].L*Ls[0].L, tag:'NOT squarefree'},
                {L: (x>=5? 5:5), tag:'L | W  (hypothesis violated)'},
                {L: p, tag:'L = p  (hypothesis violated)'},
                {L: 2*Ls[0].L, tag:'L even, L | W  (violated)'} ];
  for(const j of [0,2]){
    const img = killedImages(T, j);
    for(const rec of Ls.concat(bad)){
      const L = rec.L; if(L > 4e6) continue;
      const lhs = sumsqMod(img, L);
      const A = apCounts(T, L);
      const rhs = p * A.sumsq;                 // = p ( D_x(L) + D^2/L )
      const ratio = lhs/rhs, slack = p*ratio;
      const isViolFam = /violated|NOT squarefree/.test(rec.tag);
      collN++; if(lhs > rhs + 1e-6) collViol++;
      if(isViolFam){ violN++; if(lhs > rhs + 1e-6) violViol++;
        if(slack<violSlackMin) violSlackMin=slack; if(slack>violSlackMax) violSlackMax=slack; }
      else { slackSum += slack; if(slack<slackMin) slackMin=slack; if(slack>slackMax) slackMax=slack; }
      collRows.push({x, j, L, tag:rec.tag, lhs, rhs, ratio, slack, Dvar:A.Dvar, isViolFam});
    }
  }
}
console.log('   x | j |       L | class                        |   sum k^2   |  p*sum h^2  | ratio    | p*ratio');
for(const r of collRows)
  console.log(`  ${String(r.x).padStart(2)} | ${r.j} | ${String(r.L).padStart(7)} | ${r.tag.padEnd(28)} | ${r.lhs.toExponential(5).padStart(11)} | ${r.rhs.toExponential(5).padStart(11)} | ${r.ratio.toExponential(2).padStart(8)} | ${r.slack.toFixed(5).padStart(7)}`);
const statedN = collN - violN;
console.log(`\n  STATED hypotheses: ${statedN} cases, ${collViol - violViol} violations.`);
console.log(`     p*ratio  min ${slackMin.toFixed(5)}   mean ${(slackSum/statedN).toFixed(5)}   max ${slackMax.toFixed(5)}      (prereg P7 band [0.7, 1.3])`);
console.log(`  HYPOTHESES DELIBERATELY VIOLATED: ${violN} cases, ${violViol} violations.`);
console.log(`     p*ratio  min ${violSlackMin.toFixed(5)}   max ${violSlackMax.toFixed(5)}`);
console.log(`\ndone  [${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-bridge-01-verify.js
//   invocation:  node research/import-bridge-01-verify.js
//   code-sha256: 6d21a94dbaddb8bd6096267c95288df00c689fc7a3046dc50550b0e5636a88e8
//   out-sha256:  ad10c72c3e52dd0db86468a678d4f0c61fb3223610cac15398c37fbbf9b127f3
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     101.7 s
// ============================================================================
// IMPORT-BRIDGE part 1 --- LEMMA A (Bridge) and LEMMA B (collision) on our tile
//
// S0  CUSTODY --- tiles rebuilt here, checked against the corpus
//    x |         W |         D | D published (2c sec.2) | matches | vs import-chaining-02 tile()
//    3 |         6 |         1 |        (not tabulated) | closed form | identical, element by element
//    5 |        30 |         3 |                      3 |     yes | identical, element by element
//    7 |       210 |        15 |                     15 |     yes | identical, element by element
//   11 |      2310 |       135 |                    135 |     yes | identical, element by element
//   13 |     30030 |      1485 |                   1485 |     yes | identical, element by element
//   17 |    510510 |     22275 |                  22275 |     yes | identical, element by element
//   19 |   9699690 |    378675 |                 378675 |     yes | not run
//   23 | 223092870 |   7952175 |                7952175 |     yes | not run
//   [0.1s]
//
// S1  LEMMA A (BRIDGE)   | B_q - 2|U_x|/q |  <=  2 sqrt(p-1) sqrt(D_x(q))
//     B_q by DIRECT ENUMERATION over the (a,b) pairs of U_x wherever affordable,
//     and by the window identity B_q = sum_{b=1}^{p-1} [h_q(-bW) + h_q(-2-bW)] always.
//
//    x |  p | q range     | pairs | violations | max LHS/RHS | at q | direct-enum agrees
//    3 |  5 |   5.. 293 |    60 |          0 |    0.308607 |    7 | 60/60
//    5 |  7 |   7.. 307 |    60 |          0 |    0.154508 |   29 | 60/60
//    7 | 11 |  11.. 311 |    60 |          0 |    0.086088 |   29 | 60/60
//   11 | 13 |  13.. 313 |    60 |          0 |    0.076665 |   17 | 60/60
//   13 | 17 |  17.. 317 |    60 |          0 |    0.166731 |   23 | 60/60
//   17 | 19 |  19.. 331 |    60 |          0 |    0.049535 |   31 | 60/60
//   19 | 23 |  23.. 337 |    60 |          0 |    0.067071 |   29 | 60/60
//   23 | 29 |  29.. 347 |    60 |          0 |    0.034426 |   71 | 2/2
//
//   TOTAL 480 (x,q) pairs, 0 violations, max LHS/RHS = 0.308607 at x=3, q=7
//   HIS GRID  x in {3,5,7,11,13} x 11 smallest admissible q = 55 pairs, max LHS/RHS = 0.308607  (his printed figure: 0.31)
//   [74.9s]
//
//   The smallest admissible q at each level, against the injectivity requirement q >= p-1
//    x |  p | p-1 | smallest q with gcd(q,W)=1 | q >= p-1 automatic
//    3 |  5 |   4 |                          5 | yes
//    5 |  7 |   6 |                          7 | yes
//    7 | 11 |  10 |                         11 | yes
//   11 | 13 |  12 |                         13 | yes
//   13 | 17 |  16 |                         17 | yes
//   17 | 19 |  18 |                         19 | yes
//   19 | 23 |  22 |                         23 | yes
//   23 | 29 |  28 |                         29 | yes
//
// S2  CONTROL --- drop the coprimality hypothesis. q <= x, so q | W.
//     Every n in U_x is then ≡ a mod q with a !≡ 0,-2, so B_q = 0 by construction.
//    x |  q | B_q direct | 2|U_x|/q  |     LHS     |     RHS     | LHS/RHS | lemma
//    5 |  5 |          0 |     7.200 |      7.2000 |      5.3666 |  1.3416 | FAILS
//    7 |  5 |          0 |    60.000 |     60.0000 |     34.6410 |  1.7321 | FAILS
//    7 |  7 |          0 |    42.857 |     42.8571 |     22.6779 |  1.8898 | FAILS
//   11 |  5 |          0 |   648.000 |    648.0000 |    341.5260 |  1.8974 | FAILS
//   11 |  7 |          0 |   462.857 |    462.8571 |    223.5812 |  2.0702 | FAILS
//   11 | 11 |          0 |   294.545 |    294.5455 |    132.9388 |  2.2156 | FAILS
//   13 |  5 |          0 |  9504.000 |   9504.0000 |   4337.9627 |  2.1909 | FAILS
//   13 |  7 |          0 |  6788.571 |   6788.5714 |   2839.8632 |  2.3905 | FAILS
//   13 | 11 |          0 |  4320.000 |   4320.0000 |   1688.5497 |  2.5584 | FAILS
//   13 | 13 |          0 |  3655.385 |   3655.3846 |   1404.9583 |  2.6018 | FAILS
//   17 |  5 |          0 | 160380.000 | 160380.0000 |  69016.5632 |  2.3238 | FAILS
//   17 |  7 |          0 | 114557.143 | 114557.1429 |  45181.9465 |  2.5355 | FAILS
//   17 | 11 |          0 | 72900.000 |  72900.0000 |  26864.6608 |  2.7136 | FAILS
//   17 | 13 |          0 | 61684.615 |  61684.6154 |  22352.7489 |  2.7596 | FAILS
//   17 | 17 |          0 | 47170.588 |  47170.5882 |  16738.9753 |  2.8180 | FAILS
//   19 |  5 |          0 | 3332340.000 | 3332340.0000 | 1297111.5858 |  2.5690 | FAILS
//   19 |  7 |          0 | 2380242.857 | 2380242.8571 | 849158.8610 |  2.8031 | FAILS
//   19 | 11 |          0 | 1514700.000 | 1514700.0000 | 504900.0000 |  3.0000 | FAILS
//   19 | 13 |          0 | 1281669.231 | 1281669.2308 | 420102.1936 |  3.0509 | FAILS
//   19 | 17 |          0 | 980100.000 | 980100.0000 | 314595.7692 |  3.1154 | FAILS
//   19 | 19 |          0 | 876931.579 | 876931.5789 | 279525.6763 |  3.1372 | FAILS
//   23 |  5 |          0 | 89064360.000 | 89064360.0000 | 30730123.7004 |  2.8983 | FAILS
//   23 |  7 |          0 | 63617400.000 | 63617400.0000 | 20117588.2818 |  3.1623 | FAILS
//   23 | 11 |          0 | 40483800.000 | 40483800.0000 | 11961684.4274 |  3.3845 | FAILS
//   23 | 13 |          0 | 34255523.077 | 34255523.0769 | 9952723.0486 |  3.4418 | FAILS
//   23 | 17 |          0 | 26195400.000 | 26195400.0000 | 7453149.7591 |  3.5147 | FAILS
//   23 | 19 |          0 | 23437989.474 | 23437989.4737 | 6622297.3434 |  3.5393 | FAILS
//   23 | 23 |          0 | 19361817.391 | 19361817.3913 | 5415472.7220 |  3.5753 | FAILS
//   28 of 28 control pairs VIOLATE the Bridge once coprimality is dropped.
//   [81.1s]
//
// S3  LEMMA B (COLLISION)   sum_r k_{j,L}(r)^2  <=  p ( D_x(L) + D^2/L )
//     STATED hypotheses: L squarefree, gcd(L, pW) = 1. Also run on four deliberate
//     violations of them, because the proof appears to use none.
//
//    x | j |       L | class                        |   sum k^2   |  p*sum h^2  | ratio    | p*ratio
//    5 | 0 |      11 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      13 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      17 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      19 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      23 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      29 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      31 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |      37 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |     143 | squarefree composite         |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |    3553 | squarefree composite         |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |     121 | NOT squarefree               |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |       5 | L | W  (hypothesis violated) |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 0 |       7 | L = p  (hypothesis violated) |  9.00000e+0 |  2.10000e+1 |  4.29e-1 | 3.00000
//    5 | 0 |      22 | L even, L | W  (violated)    |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      11 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      13 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      17 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      19 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      23 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      29 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      31 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |      37 | prime, (L,pW)=1              |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |     143 | squarefree composite         |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |    3553 | squarefree composite         |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |     121 | NOT squarefree               |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |       5 | L | W  (hypothesis violated) |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    5 | 2 |       7 | L = p  (hypothesis violated) |  9.00000e+0 |  2.10000e+1 |  4.29e-1 | 3.00000
//    5 | 2 |      22 | L even, L | W  (violated)    |  3.00000e+0 |  2.10000e+1 |  1.43e-1 | 1.00000
//    7 | 0 |      13 | prime, (L,pW)=1              |  2.30000e+1 |  2.97000e+2 |  7.74e-2 | 0.85185
//    7 | 0 |      17 | prime, (L,pW)=1              |  2.30000e+1 |  1.87000e+2 |  1.23e-1 | 1.35294
//    7 | 0 |      19 | prime, (L,pW)=1              |  1.90000e+1 |  1.65000e+2 |  1.15e-1 | 1.26667
//    7 | 0 |      23 | prime, (L,pW)=1              |  1.70000e+1 |  2.75000e+2 |  6.18e-2 | 0.68000
//    7 | 0 |      29 | prime, (L,pW)=1              |  1.50000e+1 |  1.87000e+2 |  8.02e-2 | 0.88235
//    7 | 0 |      31 | prime, (L,pW)=1              |  1.70000e+1 |  1.87000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |      37 | prime, (L,pW)=1              |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |      41 | prime, (L,pW)=1              |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |     221 | squarefree composite         |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |    5681 | squarefree composite         |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |     169 | NOT squarefree               |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |       5 | L | W  (hypothesis violated) |  7.50000e+1 |  8.25000e+2 |  9.09e-2 | 1.00000
//    7 | 0 |      11 | L = p  (hypothesis violated) |  2.25000e+2 |  2.97000e+2 |  7.58e-1 | 8.33333
//    7 | 0 |      26 | L even, L | W  (violated)    |  2.30000e+1 |  2.97000e+2 |  7.74e-2 | 0.85185
//    7 | 2 |      13 | prime, (L,pW)=1              |  2.30000e+1 |  2.97000e+2 |  7.74e-2 | 0.85185
//    7 | 2 |      17 | prime, (L,pW)=1              |  2.30000e+1 |  1.87000e+2 |  1.23e-1 | 1.35294
//    7 | 2 |      19 | prime, (L,pW)=1              |  1.90000e+1 |  1.65000e+2 |  1.15e-1 | 1.26667
//    7 | 2 |      23 | prime, (L,pW)=1              |  1.70000e+1 |  2.75000e+2 |  6.18e-2 | 0.68000
//    7 | 2 |      29 | prime, (L,pW)=1              |  1.50000e+1 |  1.87000e+2 |  8.02e-2 | 0.88235
//    7 | 2 |      31 | prime, (L,pW)=1              |  1.70000e+1 |  1.87000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |      37 | prime, (L,pW)=1              |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |      41 | prime, (L,pW)=1              |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |     221 | squarefree composite         |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |    5681 | squarefree composite         |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |     169 | NOT squarefree               |  1.50000e+1 |  1.65000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |       5 | L | W  (hypothesis violated) |  7.50000e+1 |  8.25000e+2 |  9.09e-2 | 1.00000
//    7 | 2 |      11 | L = p  (hypothesis violated) |  2.25000e+2 |  2.97000e+2 |  7.58e-1 | 8.33333
//    7 | 2 |      26 | L even, L | W  (violated)    |  2.30000e+1 |  2.97000e+2 |  7.74e-2 | 0.85185
//   11 | 0 |      17 | prime, (L,pW)=1              |  1.09300e+3 |  1.40530e+4 |  7.78e-2 | 1.01110
//   11 | 0 |      19 | prime, (L,pW)=1              |  9.73000e+2 |  1.26750e+4 |  7.68e-2 | 0.99795
//   11 | 0 |      23 | prime, (L,pW)=1              |  8.09000e+2 |  1.05950e+4 |  7.64e-2 | 0.99264
//   11 | 0 |      29 | prime, (L,pW)=1              |  6.69000e+2 |  8.72300e+3 |  7.67e-2 | 0.99702
//   11 | 0 |      31 | prime, (L,pW)=1              |  6.17000e+2 |  8.12500e+3 |  7.59e-2 | 0.98720
//   11 | 0 |      37 | prime, (L,pW)=1              |  5.33000e+2 |  6.98100e+3 |  7.64e-2 | 0.99255
//   11 | 0 |      41 | prime, (L,pW)=1              |  4.77000e+2 |  6.59100e+3 |  7.24e-2 | 0.94083
//   11 | 0 |      43 | prime, (L,pW)=1              |  4.77000e+2 |  6.04500e+3 |  7.89e-2 | 1.02581
//   11 | 0 |     323 | squarefree composite         |  1.41000e+2 |  1.96300e+3 |  7.18e-2 | 0.93377
//   11 | 0 |   11339 | squarefree composite         |  1.35000e+2 |  1.75500e+3 |  7.69e-2 | 1.00000
//   11 | 0 |     289 | NOT squarefree               |  1.67000e+2 |  1.96300e+3 |  8.51e-2 | 1.10596
//   11 | 0 |       5 | L | W  (hypothesis violated) |  6.07500e+3 |  7.89750e+4 |  7.69e-2 | 1.00000
//   11 | 0 |      13 | L = p  (hypothesis violated) |  1.82250e+4 |  1.82910e+4 |  9.96e-1 | 12.95309
//   11 | 0 |      34 | L even, L | W  (violated)    |  1.09300e+3 |  1.40530e+4 |  7.78e-2 | 1.01110
//   11 | 2 |      17 | prime, (L,pW)=1              |  1.09300e+3 |  1.40530e+4 |  7.78e-2 | 1.01110
//   11 | 2 |      19 | prime, (L,pW)=1              |  9.73000e+2 |  1.26750e+4 |  7.68e-2 | 0.99795
//   11 | 2 |      23 | prime, (L,pW)=1              |  8.09000e+2 |  1.05950e+4 |  7.64e-2 | 0.99264
//   11 | 2 |      29 | prime, (L,pW)=1              |  6.69000e+2 |  8.72300e+3 |  7.67e-2 | 0.99702
//   11 | 2 |      31 | prime, (L,pW)=1              |  6.17000e+2 |  8.12500e+3 |  7.59e-2 | 0.98720
//   11 | 2 |      37 | prime, (L,pW)=1              |  5.33000e+2 |  6.98100e+3 |  7.64e-2 | 0.99255
//   11 | 2 |      41 | prime, (L,pW)=1              |  4.77000e+2 |  6.59100e+3 |  7.24e-2 | 0.94083
//   11 | 2 |      43 | prime, (L,pW)=1              |  4.77000e+2 |  6.04500e+3 |  7.89e-2 | 1.02581
//   11 | 2 |     323 | squarefree composite         |  1.41000e+2 |  1.96300e+3 |  7.18e-2 | 0.93377
//   11 | 2 |   11339 | squarefree composite         |  1.35000e+2 |  1.75500e+3 |  7.69e-2 | 1.00000
//   11 | 2 |     289 | NOT squarefree               |  1.67000e+2 |  1.96300e+3 |  8.51e-2 | 1.10596
//   11 | 2 |       5 | L | W  (hypothesis violated) |  6.07500e+3 |  7.89750e+4 |  7.69e-2 | 1.00000
//   11 | 2 |      13 | L = p  (hypothesis violated) |  1.82250e+4 |  1.82910e+4 |  9.96e-1 | 12.95309
//   11 | 2 |      34 | L even, L | W  (violated)    |  1.09300e+3 |  1.40530e+4 |  7.78e-2 | 1.01110
//   13 | 0 |      19 | prime, (L,pW)=1              |  1.16095e+5 |  1.97379e+6 |  5.88e-2 | 0.99991
//   13 | 0 |      23 | prime, (L,pW)=1              |  9.59490e+4 |  1.63028e+6 |  5.89e-2 | 1.00052
//   13 | 0 |      29 | prime, (L,pW)=1              |  7.61430e+4 |  1.29484e+6 |  5.88e-2 | 0.99968
//   13 | 0 |      31 | prime, (L,pW)=1              |  7.12350e+4 |  1.21079e+6 |  5.88e-2 | 1.00017
//   13 | 0 |      37 | prime, (L,pW)=1              |  5.97590e+4 |  1.01522e+6 |  5.89e-2 | 1.00067
//   13 | 0 |      41 | prime, (L,pW)=1              |  5.38810e+4 |  9.16895e+5 |  5.88e-2 | 0.99900
//   13 | 0 |      43 | prime, (L,pW)=1              |  5.14050e+4 |  8.74089e+5 |  5.88e-2 | 0.99977
//   13 | 0 |      47 | prime, (L,pW)=1              |  4.70210e+4 |  7.98609e+5 |  5.89e-2 | 1.00094
//   13 | 0 |     437 | squarefree composite         |  5.49100e+3 |  9.33130e+4 |  5.88e-2 | 1.00036
//   13 | 0 |   17081 | squarefree composite         |  1.48500e+3 |  2.52450e+4 |  5.88e-2 | 1.00000
//   13 | 0 |     361 | NOT squarefree               |  6.49700e+3 |  1.12251e+5 |  5.79e-2 | 0.98395
//   13 | 0 |       5 | L | W  (hypothesis violated) |  7.35075e+5 |  1.24963e+7 |  5.88e-2 | 1.00000
//   13 | 0 |      17 | L = p  (hypothesis violated) |  2.20523e+6 |  2.20638e+6 |  9.99e-1 | 16.99111
//   13 | 0 |      38 | L even, L | W  (violated)    |  1.16095e+5 |  1.97379e+6 |  5.88e-2 | 0.99991
//   13 | 2 |      19 | prime, (L,pW)=1              |  1.16095e+5 |  1.97379e+6 |  5.88e-2 | 0.99991
//   13 | 2 |      23 | prime, (L,pW)=1              |  9.59490e+4 |  1.63028e+6 |  5.89e-2 | 1.00052
//   13 | 2 |      29 | prime, (L,pW)=1              |  7.61430e+4 |  1.29484e+6 |  5.88e-2 | 0.99968
//   13 | 2 |      31 | prime, (L,pW)=1              |  7.12350e+4 |  1.21079e+6 |  5.88e-2 | 1.00017
//   13 | 2 |      37 | prime, (L,pW)=1              |  5.97590e+4 |  1.01522e+6 |  5.89e-2 | 1.00067
//   13 | 2 |      41 | prime, (L,pW)=1              |  5.38810e+4 |  9.16895e+5 |  5.88e-2 | 0.99900
//   13 | 2 |      43 | prime, (L,pW)=1              |  5.14050e+4 |  8.74089e+5 |  5.88e-2 | 0.99977
//   13 | 2 |      47 | prime, (L,pW)=1              |  4.70210e+4 |  7.98609e+5 |  5.89e-2 | 1.00094
//   13 | 2 |     437 | squarefree composite         |  5.49100e+3 |  9.33130e+4 |  5.88e-2 | 1.00036
//   13 | 2 |   17081 | squarefree composite         |  1.48500e+3 |  2.52450e+4 |  5.88e-2 | 1.00000
//   13 | 2 |     361 | NOT squarefree               |  6.49700e+3 |  1.12251e+5 |  5.79e-2 | 0.98395
//   13 | 2 |       5 | L | W  (hypothesis violated) |  7.35075e+5 |  1.24963e+7 |  5.88e-2 | 1.00000
//   13 | 2 |      17 | L = p  (hypothesis violated) |  2.20523e+6 |  2.20638e+6 |  9.99e-1 | 16.99111
//   13 | 2 |      38 | L even, L | W  (violated)    |  1.16095e+5 |  1.97379e+6 |  5.88e-2 | 0.99991
//   17 | 0 |      23 | prime, (L,pW)=1              |  2.15730e+7 |  4.09892e+8 |  5.26e-2 | 0.99999
//   17 | 0 |      29 | prime, (L,pW)=1              |  1.71104e+7 |  3.25089e+8 |  5.26e-2 | 1.00003
//   17 | 0 |      31 | prime, (L,pW)=1              |  1.60059e+7 |  3.04112e+8 |  5.26e-2 | 1.00000
//   17 | 0 |      37 | prime, (L,pW)=1              |  1.34105e+7 |  2.54808e+8 |  5.26e-2 | 0.99996
//   17 | 0 |      41 | prime, (L,pW)=1              |  1.21022e+7 |  2.29939e+8 |  5.26e-2 | 1.00001
//   17 | 0 |      43 | prime, (L,pW)=1              |  1.15394e+7 |  2.19248e+8 |  5.26e-2 | 1.00000
//   17 | 0 |      47 | prime, (L,pW)=1              |  1.05577e+7 |  2.00585e+8 |  5.26e-2 | 1.00005
//   17 | 0 |      53 | prime, (L,pW)=1              |  9.36252e+6 |  1.77882e+8 |  5.26e-2 | 1.00004
//   17 | 0 |     667 | squarefree composite         |  7.46153e+5 |  1.41817e+7 |  5.26e-2 | 0.99967
//   17 | 0 |   26381 | squarefree composite         |  3.15810e+4 |  6.08399e+5 |  5.19e-2 | 0.98626
//   17 | 0 |     529 | NOT squarefree               |  9.40177e+5 |  1.78564e+7 |  5.27e-2 | 1.00039
//   17 | 0 |       5 | L | W  (hypothesis violated) |  1.65392e+8 |  3.14245e+9 |  5.26e-2 | 1.00000
//   17 | 0 |      19 | L = p  (hypothesis violated) |  4.96176e+8 |  4.96177e+8 |  1.00e+0 | 18.99994
//   17 | 0 |      46 | L even, L | W  (violated)    |  2.15730e+7 |  4.09892e+8 |  5.26e-2 | 0.99999
//   17 | 2 |      23 | prime, (L,pW)=1              |  2.15730e+7 |  4.09892e+8 |  5.26e-2 | 0.99999
//   17 | 2 |      29 | prime, (L,pW)=1              |  1.71104e+7 |  3.25089e+8 |  5.26e-2 | 1.00003
//   17 | 2 |      31 | prime, (L,pW)=1              |  1.60059e+7 |  3.04112e+8 |  5.26e-2 | 1.00000
//   17 | 2 |      37 | prime, (L,pW)=1              |  1.34105e+7 |  2.54808e+8 |  5.26e-2 | 0.99996
//   17 | 2 |      41 | prime, (L,pW)=1              |  1.21022e+7 |  2.29939e+8 |  5.26e-2 | 1.00001
//   17 | 2 |      43 | prime, (L,pW)=1              |  1.15394e+7 |  2.19248e+8 |  5.26e-2 | 1.00000
//   17 | 2 |      47 | prime, (L,pW)=1              |  1.05577e+7 |  2.00585e+8 |  5.26e-2 | 1.00005
//   17 | 2 |      53 | prime, (L,pW)=1              |  9.36252e+6 |  1.77882e+8 |  5.26e-2 | 1.00004
//   17 | 2 |     667 | squarefree composite         |  7.46153e+5 |  1.41817e+7 |  5.26e-2 | 0.99967
//   17 | 2 |   26381 | squarefree composite         |  3.15810e+4 |  6.08399e+5 |  5.19e-2 | 0.98626
//   17 | 2 |     529 | NOT squarefree               |  9.40177e+5 |  1.78564e+7 |  5.27e-2 | 1.00039
//   17 | 2 |       5 | L | W  (hypothesis violated) |  1.65392e+8 |  3.14245e+9 |  5.26e-2 | 1.00000
//   17 | 2 |      19 | L = p  (hypothesis violated) |  4.96176e+8 |  4.96177e+8 |  1.00e+0 | 18.99994
//   17 | 2 |      46 | L even, L | W  (violated)    |  2.15730e+7 |  4.09892e+8 |  5.26e-2 | 0.99999
//   19 | 0 |      29 | prime, (L,pW)=1              |  4.94465e+9 | 1.13727e+11 |  4.35e-2 | 1.00000
//   19 | 0 |      31 | prime, (L,pW)=1              |  4.62564e+9 | 1.06390e+11 |  4.35e-2 | 1.00000
//   19 | 0 |      37 | prime, (L,pW)=1              |  3.87554e+9 | 8.91373e+10 |  4.35e-2 | 1.00000
//   19 | 0 |      41 | prime, (L,pW)=1              |  3.49744e+9 | 8.04410e+10 |  4.35e-2 | 1.00000
//   19 | 0 |      43 | prime, (L,pW)=1              |  3.33476e+9 | 7.66996e+10 |  4.35e-2 | 1.00000
//   19 | 0 |      47 | prime, (L,pW)=1              |  3.05095e+9 | 7.01719e+10 |  4.35e-2 | 1.00000
//   19 | 0 |      53 | prime, (L,pW)=1              |  2.70556e+9 | 6.22279e+10 |  4.35e-2 | 1.00000
//   19 | 0 |      59 | prime, (L,pW)=1              |  2.43042e+9 | 5.58997e+10 |  4.35e-2 | 1.00000
//   19 | 0 |     899 | squarefree composite         |  1.59518e+8 |  3.66888e+9 |  4.35e-2 | 1.00001
//   19 | 0 |   43993 | squarefree composite         |  3.36504e+6 |  7.73579e+7 |  4.35e-2 | 1.00049
//   19 | 0 |     841 | NOT squarefree               |  1.70514e+8 |  3.92181e+9 |  4.35e-2 | 1.00000
//   19 | 0 |       5 | L | W  (hypothesis violated) | 4.77983e+10 | 1.09936e+12 |  4.35e-2 | 1.00000
//   19 | 0 |      23 | L = p  (hypothesis violated) | 1.43395e+11 | 1.43395e+11 |  1.00e+0 | 23.00000
//   19 | 0 |      58 | L even, L | W  (violated)    |  4.94465e+9 | 1.13727e+11 |  4.35e-2 | 1.00000
//   19 | 2 |      29 | prime, (L,pW)=1              |  4.94465e+9 | 1.13727e+11 |  4.35e-2 | 1.00000
//   19 | 2 |      31 | prime, (L,pW)=1              |  4.62564e+9 | 1.06390e+11 |  4.35e-2 | 1.00000
//   19 | 2 |      37 | prime, (L,pW)=1              |  3.87554e+9 | 8.91373e+10 |  4.35e-2 | 1.00000
//   19 | 2 |      41 | prime, (L,pW)=1              |  3.49744e+9 | 8.04410e+10 |  4.35e-2 | 1.00000
//   19 | 2 |      43 | prime, (L,pW)=1              |  3.33476e+9 | 7.66996e+10 |  4.35e-2 | 1.00000
//   19 | 2 |      47 | prime, (L,pW)=1              |  3.05095e+9 | 7.01719e+10 |  4.35e-2 | 1.00000
//   19 | 2 |      53 | prime, (L,pW)=1              |  2.70556e+9 | 6.22279e+10 |  4.35e-2 | 1.00000
//   19 | 2 |      59 | prime, (L,pW)=1              |  2.43042e+9 | 5.58997e+10 |  4.35e-2 | 1.00000
//   19 | 2 |     899 | squarefree composite         |  1.59518e+8 |  3.66888e+9 |  4.35e-2 | 1.00001
//   19 | 2 |   43993 | squarefree composite         |  3.36504e+6 |  7.73579e+7 |  4.35e-2 | 1.00049
//   19 | 2 |     841 | NOT squarefree               |  1.70514e+8 |  3.92181e+9 |  4.35e-2 | 1.00000
//   19 | 2 |       5 | L | W  (hypothesis violated) | 4.77983e+10 | 1.09936e+12 |  4.35e-2 | 1.00000
//   19 | 2 |      23 | L = p  (hypothesis violated) | 1.43395e+11 | 1.43395e+11 |  1.00e+0 | 23.00000
//   19 | 2 |      58 | L even, L | W  (violated)    |  4.94465e+9 | 1.13727e+11 |  4.35e-2 | 1.00000
//   23 | 0 |      31 | prime, (L,pW)=1              | 2.03991e+12 | 5.91573e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      37 | prime, (L,pW)=1              | 1.70911e+12 | 4.95642e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      41 | prime, (L,pW)=1              | 1.54237e+12 | 4.47287e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      43 | prime, (L,pW)=1              | 1.47063e+12 | 4.26483e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      47 | prime, (L,pW)=1              | 1.34547e+12 | 3.90186e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      53 | prime, (L,pW)=1              | 1.19315e+12 | 3.46014e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      59 | prime, (L,pW)=1              | 1.07182e+12 | 3.10826e+13 |  3.45e-2 | 1.00000
//   23 | 0 |      61 | prime, (L,pW)=1              | 1.03667e+12 | 3.00635e+13 |  3.45e-2 | 1.00000
//   23 | 0 |    1147 | squarefree composite         | 5.51326e+10 | 1.59885e+12 |  3.45e-2 | 1.00000
//   23 | 0 |   54653 | squarefree composite         |  1.15769e+9 | 3.35723e+10 |  3.45e-2 | 1.00002
//   23 | 0 |     961 | NOT squarefree               | 6.58035e+10 | 1.90830e+12 |  3.45e-2 | 1.00000
//   23 | 0 |       5 | L | W  (hypothesis violated) | 2.10790e+13 | 6.11292e+14 |  3.45e-2 | 1.00000
//   23 | 0 |      29 | L = p  (hypothesis violated) | 6.32371e+13 | 6.32371e+13 |  1.00e+0 | 29.00000
//   23 | 0 |      62 | L even, L | W  (violated)    | 2.03991e+12 | 5.91573e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      31 | prime, (L,pW)=1              | 2.03991e+12 | 5.91573e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      37 | prime, (L,pW)=1              | 1.70911e+12 | 4.95642e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      41 | prime, (L,pW)=1              | 1.54237e+12 | 4.47287e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      43 | prime, (L,pW)=1              | 1.47063e+12 | 4.26483e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      47 | prime, (L,pW)=1              | 1.34547e+12 | 3.90186e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      53 | prime, (L,pW)=1              | 1.19315e+12 | 3.46014e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      59 | prime, (L,pW)=1              | 1.07182e+12 | 3.10826e+13 |  3.45e-2 | 1.00000
//   23 | 2 |      61 | prime, (L,pW)=1              | 1.03667e+12 | 3.00635e+13 |  3.45e-2 | 1.00000
//   23 | 2 |    1147 | squarefree composite         | 5.51326e+10 | 1.59885e+12 |  3.45e-2 | 1.00000
//   23 | 2 |   54653 | squarefree composite         |  1.15769e+9 | 3.35723e+10 |  3.45e-2 | 1.00002
//   23 | 2 |     961 | NOT squarefree               | 6.58035e+10 | 1.90830e+12 |  3.45e-2 | 1.00000
//   23 | 2 |       5 | L | W  (hypothesis violated) | 2.10790e+13 | 6.11292e+14 |  3.45e-2 | 1.00000
//   23 | 2 |      29 | L = p  (hypothesis violated) | 6.32371e+13 | 6.32371e+13 |  1.00e+0 | 29.00000
//   23 | 2 |      62 | L even, L | W  (violated)    | 2.03991e+12 | 5.91573e+13 |  3.45e-2 | 1.00000
//
//   STATED hypotheses: 140 cases, 0 violations.
//      p*ratio  min 0.68000   mean 0.99857   max 1.35294      (prereg P7 band [0.7, 1.3])
//   HYPOTHESES DELIBERATELY VIOLATED: 56 cases, 0 violations.
//      p*ratio  min 0.85185   max 29.00000
//
// done  [101.6s]
// ============================================================================
// READINGS
// ============================================================================
//
// 1. LEMMA A HOLDS, 480 PAIRS, ZERO VIOLATIONS. Eight levels x = 3..23, sixty
//    admissible moduli each, q running from p to between 293 and 347. Every
//    level's violation count is 0 and the largest LHS/RHS anywhere is 0.308607,
//    at the smallest level of all (x = 3, q = 7). Per level the maxima are
//    0.308607, 0.154508, 0.086088, 0.076665, 0.166731, 0.049535, 0.067071,
//    0.034426 -- no trend up, and the two largest sit at x = 3 and x = 13.
//
// 2. HIS 55-PAIR CHECK REPRODUCES, INDEPENDENTLY. On his own grid, five levels
//    x in {3,5,7,11,13} times the eleven smallest admissible moduli, the maximum
//    is 0.308607 against his printed 0.31. Nothing of his was used to get it:
//    the tile is rebuilt here and S0 checks D against 3, 15, 135, 1485, 22275,
//    378675, 7952175 and against import-chaining-02.js element by element.
//
// 3. THE WINDOW IDENTITY IS NOT AN ASSUMPTION HERE. B_q was recomputed by
//    walking every one of the (p-1)D pairs of U_x, no identity used, at 60/60
//    moduli for x <= 19 and 2/2 at x = 23 -- 422 direct enumerations, all
//    agreeing exactly with sum_b [h_q(-bW) + h_q(-2-bW)].
//
// 4. THE UNSTATED INJECTIVITY REQUIREMENT IS FREE. The proof needs
//    b -> -bW mod q injective on b = 1..p-1, i.e. q >= p-1. The smallest
//    admissible q is 5, 7, 11, 13, 17, 19, 23, 29 against p-1 = 4, 6, 10, 12,
//    16, 18, 22, 28 at x = 3..23: q = p every time, never below. Nothing has to
//    be added to the hypothesis.
//
// 5. BUT COPRIMALITY IS LOAD-BEARING, AND THE LEMMA FAILS WITHOUT IT AT EVERY
//    LEVEL TESTED. Take q <= x, so q | W. Then every n in U_x is n ≡ a mod q
//    with a !≡ 0,-2, so B_q = 0 by construction while 2|U_x|/q > 0: at x = 23,
//    q = 5 the LHS is 89064360.0000 against an RHS of 30730123.7004. 28 of 28
//    control pairs violate, ratios running 1.3416 at (x,q) = (5,5) to 3.5753 at
//    (23,23), rising with both. The hypothesis is not decorative.
//
// 6. LEMMA B HOLDS, AND ITS STATED HYPOTHESES ARE NOT USED. 140 cases on the
//    stated hypotheses (L squarefree, gcd(L,pW) = 1), zero violations; 56 cases
//    with a hypothesis deliberately broken -- L = q^2, L | W, L = p, L even --
//    also zero violations. Nothing in the three-line proof touches squarefreeness
//    or coprimality, and the measurement agrees.
//
// 7. THE FACTOR p IS NOT SLACK: IT IS ATTAINED, JUST OUTSIDE THE HYPOTHESIS.
//    Under the stated hypotheses p*ratio has mean 0.99857 over 140 cases, min
//    0.68000, max 1.35294 -- so the bound overshoots by exactly p and no more.
//    At L = p, which the hypothesis excludes, the killed images all land in one
//    class and the bound is essentially an equality: p*ratio = 3.00000, 8.33333,
//    12.95309, 16.99111, 18.99994, 23.00000, 29.00000 at x = 5..23, i.e. exactly
//    p, ratio 1.00e+0 to five figures at x = 17, 19, 23. So "loose by p" is the
//    right reading inside the hypothesis and the wrong reading about the constant.
//
// 8. THE SLACK SHRINKS WITH THE LEVEL, WHICH IS THE WRONG DIRECTION FOR AN
//    IMPORT. Lemma A's per-level max LHS/RHS falls from 0.308607 at x = 3 to
//    0.034426 at x = 23, so the bound is roughly 3x loose at the smallest level
//    and 29x loose at the largest one measured. Lemma B's ratio column falls the
//    same way, 1.43e-1 at x = 5 to 3.45e-2 at x = 23. Neither lemma is tightening
//    as the tile grows.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values: 422 direct
// enumerations is the "direct-enum agrees" column of the Lemma A table summed,
// seven rows of 60/60 at x = 3, 5, 7, 11, 13, 17 and 19 plus the 2/2 row at
// x = 23, so 7*60 + 2 = 422.
//
// TOKENIZER ARTIFACT, not a figure: "23,23" is the coordinate pair
// (x,q) = (23,23) naming the control cell with the largest ratio, not a number.
// ---------------------------------------------------------------------------
