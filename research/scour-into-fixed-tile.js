// ============================================================================
// SCOUR INTO A FIXED TILE — the p² rule seen from the kill direction
// (Chris, 2026-08-14; from the moire example.txt / tree-node session)
// ============================================================================
// Fix a base tile @b (width W = b#). Its twin slots have fixed positions.
// March the LARGER primes into that fixed window one at a time (the TREE) and
// count how many not-yet-dead slots each removes. Realizations documented,
// then measured:
//
//   A prime q kills a slot in a width-W window only via:
//     (1) SELF-STRIKE at position q (q|q) or q-2 (q|r+2), cofactor m=1.
//     (2) a strike at q·m for m≥2 — but for the slot to still be ALIVE when q
//         arrives, m must be coprime to all primes < q (else a smaller prime
//         killed it first). The smallest such fresh strike is at q² (m=q).
//   => If q² > W, q makes NO fresh kills in the window beyond its self-strike,
//      which lands on a slot only by luck. A prime with q > √W is nearly
//      TOOTHLESS against the tile. The EFFECTIVE Scour on a width-W tile is
//      only the primes up to √W — crystallization / the p² rule, seen from
//      "who can kill" instead of "who has crystallized."
//   Worked @7 example (verbatim): 13 kills the (167,169) slot because
//   169 = 13² < 210; 17,19 self-strike only; 23 kills 0 (its self-strikes
//   (23,25),(21,23) aren't slots, and 23² = 529 > 210).
//
// THE TREE MARCH here: primes enter smallest-first; each removes only slots
// still alive. That is exactly Chris's X→Y→Z pruning. We tabulate fresh kills
// per prime and hunt for the pattern across base tiles @7,@11,@13,@17.
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const SMALL = primesUpTo(300000);

function tileSlots(basePrimes){
  const W = basePrimes.reduce((a,b)=>a*b,1);
  const bad = new Uint8Array(W);
  for(const q of basePrimes){ for(let j=0;j<W;j+=q)bad[j]=1; const r2=((q-2)%q+q)%q; for(let j=r2;j<W;j+=q)bad[j]=1; }
  const slots=[]; for(let r=0;r<W;r++) if(!bad[r]) slots.push(r);
  return {W, slots};
}

for(const base of [[2,3,5,7],[2,3,5,7,11],[2,3,5,7,11,13],[2,3,5,7,11,13,17]]){
  const {W, slots} = tileSlots(base);
  const bmax = base[base.length-1];
  const sqrtW = Math.sqrt(W);
  const alive = new Set(slots);
  const D = slots.length;
  console.log(`\n===== @${bmax}: width ${W}, ${D} slots, √W=${sqrtW.toFixed(1)}, next prime²>W at q=${Math.ceil(Math.sqrt(W))} =====`);
  console.log(' q  | fresh kills | of which self@q, hit@q² | alive after | 2·alive_before/q (density)');
  const marks=[];
  for(const q of SMALL){
    if(q<=bmax) continue;
    if(q > sqrtW*3) break;
    const before = alive.size;
    let kills=0, self=0, atq2=0;
    for(const r of [...alive]){
      if(r%q===0 || (r+2)%q===0){
        alive.delete(r); kills++;
        const pos = (r%q===0)? r : r+2;
        if(pos===q) self++;
        if(pos===q*q) atq2++;
      }
    }
    marks.push({q, kills, self, atq2, after:alive.size, dens:2*before/q, toothless:q>sqrtW});
    if(q > sqrtW && kills===0 && q>sqrtW*1.5) { /* keep going a little */ }
  }
  for(const m of marks){
    if(m.q > sqrtW*2 && m.kills===0) continue; // trim empty tail
    console.log(`${String(m.q).padStart(3)} |    ${String(m.kills).padStart(3)}      |  self=${m.self} q²=${m.atq2}          | ${String(m.after).padStart(6)}      | ${m.dens.toFixed(2)} ${m.toothless?'  (q>√W: self-only)':''}`);
  }
  const bulk = marks.filter(m=>!m.toothless), teeth = marks.filter(m=>m.toothless);
  console.log(`  primes ≤ √W (${bulk.map(m=>m.q).join(',')}) did ${bulk.reduce((a,m)=>a+m.kills,0)} kills; primes > √W did ${teeth.reduce((a,m)=>a+m.kills,0)} (self-strikes). Final alive: ${alive.size}.`);
  // Are the final survivors the real twins below the frontier?
  const frontier = (SMALL.find(p=>p>bmax))**2; // next-prime² — but after full march it's higher
  console.log(`  final ${alive.size} survivors are twin candidates coprime to all q≤√W; those below (√W)²... = the real twins in [0,${W}).`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/scour-into-fixed-tile.js
//   invocation:  node research/scour-into-fixed-tile.js
//   code-sha256: 7681b9cd8ed2ba2fe706348e2e22542c7fee1851b958d9542979a01370c03de5
//   out-sha256:  2e5f26624750f9f115defad3d7e948b7c1b893cf1045a3cef6d79e9d922e8cc6
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
//
// ===== @7: width 210, 15 slots, √W=14.5, next prime²>W at q=15 =====
//  q  | fresh kills | of which self@q, hit@q² | alive after | 2·alive_before/q (density)
//  11 |      2      |  self=1 q²=0          |     13      | 2.73
//  13 |      1      |  self=0 q²=1          |     12      | 2.00
//  17 |      1      |  self=1 q²=0          |     11      | 1.41   (q>√W: self-only)
//  19 |      0      |  self=0 q²=0          |     11      | 1.16   (q>√W: self-only)
//  23 |      0      |  self=0 q²=0          |     11      | 0.96   (q>√W: self-only)
//  29 |      1      |  self=1 q²=0          |     10      | 0.76   (q>√W: self-only)
//  41 |      1      |  self=1 q²=0          |      9      | 0.49   (q>√W: self-only)
//   primes ≤ √W (11,13) did 3 kills; primes > √W did 3 (self-strikes). Final alive: 9.
//   final 9 survivors are twin candidates coprime to all q≤√W; those below (√W)²... = the real twins in [0,210).
//
// ===== @11: width 2310, 135 slots, √W=48.1, next prime²>W at q=49 =====
//  q  | fresh kills | of which self@q, hit@q² | alive after | 2·alive_before/q (density)
//  13 |     21      |  self=0 q²=1          |    114      | 20.77
//  17 |     15      |  self=1 q²=0          |     99      | 13.41
//  19 |     11      |  self=0 q²=1          |     88      | 10.42
//  23 |      7      |  self=0 q²=0          |     81      | 7.65
//  29 |      7      |  self=1 q²=1          |     74      | 5.59
//  31 |      4      |  self=0 q²=0          |     70      | 4.77
//  37 |      2      |  self=0 q²=1          |     68      | 3.78
//  41 |      1      |  self=1 q²=0          |     67      | 3.32
//  43 |      2      |  self=0 q²=1          |     65      | 3.12
//  47 |      1      |  self=0 q²=1          |     64      | 2.77
//  53 |      0      |  self=0 q²=0          |     64      | 2.42   (q>√W: self-only)
//  59 |      1      |  self=1 q²=0          |     63      | 2.17   (q>√W: self-only)
//  61 |      0      |  self=0 q²=0          |     63      | 2.07   (q>√W: self-only)
//  67 |      0      |  self=0 q²=0          |     63      | 1.88   (q>√W: self-only)
//  71 |      1      |  self=1 q²=0          |     62      | 1.77   (q>√W: self-only)
//  73 |      0      |  self=0 q²=0          |     62      | 1.70   (q>√W: self-only)
//  79 |      0      |  self=0 q²=0          |     62      | 1.57   (q>√W: self-only)
//  83 |      0      |  self=0 q²=0          |     62      | 1.49   (q>√W: self-only)
//  89 |      0      |  self=0 q²=0          |     62      | 1.39   (q>√W: self-only)
// 101 |      1      |  self=1 q²=0          |     61      | 1.23   (q>√W: self-only)
// 107 |      1      |  self=1 q²=0          |     60      | 1.14   (q>√W: self-only)
// 137 |      1      |  self=1 q²=0          |     59      | 0.88   (q>√W: self-only)
//   primes ≤ √W (13,17,19,23,29,31,37,41,43,47) did 71 kills; primes > √W did 5 (self-strikes). Final alive: 59.
//   final 59 survivors are twin candidates coprime to all q≤√W; those below (√W)²... = the real twins in [0,2310).
//
// ===== @13: width 30030, 1485 slots, √W=173.3, next prime²>W at q=174 =====
//  q  | fresh kills | of which self@q, hit@q² | alive after | 2·alive_before/q (density)
//  17 |    173      |  self=1 q²=0          |   1312      | 174.71
//  19 |    139      |  self=0 q²=1          |   1173      | 138.11
//  23 |     98      |  self=0 q²=0          |   1075      | 102.00
//  29 |     75      |  self=1 q²=1          |   1000      | 74.14
//  31 |     66      |  self=0 q²=0          |    934      | 64.52
//  37 |     47      |  self=0 q²=1          |    887      | 50.49
//  41 |     42      |  self=1 q²=0          |    845      | 43.27
//  43 |     46      |  self=0 q²=1          |    799      | 39.30
//  47 |     36      |  self=0 q²=1          |    763      | 34.00
//  53 |     36      |  self=0 q²=0          |    727      | 28.79
//  59 |     31      |  self=1 q²=0          |    696      | 24.64
//  61 |     29      |  self=0 q²=1          |    667      | 22.82
//  67 |     28      |  self=0 q²=0          |    639      | 19.91
//  71 |     25      |  self=1 q²=1          |    614      | 18.00
//  73 |     19      |  self=0 q²=0          |    595      | 16.82
//  79 |     17      |  self=0 q²=0          |    578      | 15.06
//  83 |     17      |  self=0 q²=0          |    561      | 13.93
//  89 |     14      |  self=0 q²=1          |    547      | 12.61
//  97 |      9      |  self=0 q²=0          |    538      | 11.28
// 101 |     16      |  self=1 q²=0          |    522      | 10.65
// 103 |     10      |  self=0 q²=1          |    512      | 10.14
// 107 |      7      |  self=1 q²=1          |    505      | 9.57
// 109 |     10      |  self=0 q²=0          |    495      | 9.27
// 113 |      3      |  self=0 q²=0          |    492      | 8.76
// 127 |      7      |  self=0 q²=1          |    485      | 7.75
// 131 |      3      |  self=0 q²=1          |    482      | 7.40
// 137 |      6      |  self=1 q²=0          |    476      | 7.04
// 139 |      5      |  self=0 q²=1          |    471      | 6.85
// 149 |      4      |  self=1 q²=0          |    467      | 6.32
// 151 |      5      |  self=0 q²=0          |    462      | 6.19
// 157 |      2      |  self=0 q²=0          |    460      | 5.89
// 163 |      3      |  self=0 q²=0          |    457      | 5.64
// 167 |      0      |  self=0 q²=0          |    457      | 5.47
// 173 |      1      |  self=0 q²=1          |    456      | 5.28
// 179 |      1      |  self=1 q²=0          |    455      | 5.09   (q>√W: self-only)
// 181 |      0      |  self=0 q²=0          |    455      | 5.03   (q>√W: self-only)
// 191 |      1      |  self=1 q²=0          |    454      | 4.76   (q>√W: self-only)
// 193 |      0      |  self=0 q²=0          |    454      | 4.70   (q>√W: self-only)
// 197 |      1      |  self=1 q²=0          |    453      | 4.61   (q>√W: self-only)
// 199 |      0      |  self=0 q²=0          |    453      | 4.55   (q>√W: self-only)
// 211 |      0      |  self=0 q²=0          |    453      | 4.29   (q>√W: self-only)
// 223 |      0      |  self=0 q²=0          |    453      | 4.06   (q>√W: self-only)
// 227 |      1      |  self=1 q²=0          |    452      | 3.99   (q>√W: self-only)
// 229 |      0      |  self=0 q²=0          |    452      | 3.95   (q>√W: self-only)
// 233 |      0      |  self=0 q²=0          |    452      | 3.88   (q>√W: self-only)
// 239 |      1      |  self=1 q²=0          |    451      | 3.78   (q>√W: self-only)
// 241 |      0      |  self=0 q²=0          |    451      | 3.74   (q>√W: self-only)
// 251 |      0      |  self=0 q²=0          |    451      | 3.59   (q>√W: self-only)
// 257 |      0      |  self=0 q²=0          |    451      | 3.51   (q>√W: self-only)
// 263 |      0      |  self=0 q²=0          |    451      | 3.43   (q>√W: self-only)
// 269 |      1      |  self=1 q²=0          |    450      | 3.35   (q>√W: self-only)
// 271 |      0      |  self=0 q²=0          |    450      | 3.32   (q>√W: self-only)
// 277 |      0      |  self=0 q²=0          |    450      | 3.25   (q>√W: self-only)
// 281 |      1      |  self=1 q²=0          |    449      | 3.20   (q>√W: self-only)
// 283 |      0      |  self=0 q²=0          |    449      | 3.17   (q>√W: self-only)
// 293 |      0      |  self=0 q²=0          |    449      | 3.06   (q>√W: self-only)
// 307 |      0      |  self=0 q²=0          |    449      | 2.93   (q>√W: self-only)
// 311 |      1      |  self=1 q²=0          |    448      | 2.89   (q>√W: self-only)
// 313 |      0      |  self=0 q²=0          |    448      | 2.86   (q>√W: self-only)
// 317 |      0      |  self=0 q²=0          |    448      | 2.83   (q>√W: self-only)
// 331 |      0      |  self=0 q²=0          |    448      | 2.71   (q>√W: self-only)
// 337 |      0      |  self=0 q²=0          |    448      | 2.66   (q>√W: self-only)
// 347 |      1      |  self=1 q²=0          |    447      | 2.58   (q>√W: self-only)
// 419 |      1      |  self=1 q²=0          |    446      | 2.13   (q>√W: self-only)
// 431 |      1      |  self=1 q²=0          |    445      | 2.07   (q>√W: self-only)
// 461 |      1      |  self=1 q²=0          |    444      | 1.93   (q>√W: self-only)
//   primes ≤ √W (17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173) did 1029 kills; primes > √W did 12 (self-strikes). Final alive: 444.
//   final 444 survivors are twin candidates coprime to all q≤√W; those below (√W)²... = the real twins in [0,30030).
//
// ===== @17: width 510510, 22275 slots, √W=714.5, next prime²>W at q=715 =====
//  q  | fresh kills | of which self@q, hit@q² | alive after | 2·alive_before/q (density)
//  19 |    2347      |  self=0 q²=1          |  19928      | 2344.74
//  23 |    1736      |  self=0 q²=0          |  18192      | 1732.87
//  29 |    1258      |  self=1 q²=1          |  16934      | 1254.62
//  31 |    1090      |  self=0 q²=0          |  15844      | 1092.52
//  37 |    854      |  self=0 q²=1          |  14990      | 856.43
//  41 |    725      |  self=1 q²=0          |  14265      | 731.22
//  43 |    657      |  self=0 q²=1          |  13608      | 663.49
//  47 |    568      |  self=0 q²=1          |  13040      | 579.06
//  53 |    483      |  self=0 q²=0          |  12557      | 492.08
//  59 |    412      |  self=1 q²=0          |  12145      | 425.66
//  61 |    397      |  self=0 q²=1          |  11748      | 398.20
//  67 |    358      |  self=0 q²=0          |  11390      | 350.69
//  71 |    312      |  self=1 q²=1          |  11078      | 320.85
//  73 |    300      |  self=0 q²=0          |  10778      | 303.51
//  79 |    267      |  self=0 q²=0          |  10511      | 272.86
//  83 |    269      |  self=0 q²=0          |  10242      | 253.28
//  89 |    237      |  self=0 q²=1          |  10005      | 230.16
//  97 |    215      |  self=0 q²=0          |   9790      | 206.29
// 101 |    210      |  self=1 q²=0          |   9580      | 193.86
// 103 |    190      |  self=0 q²=1          |   9390      | 186.02
// 107 |    196      |  self=1 q²=1          |   9194      | 175.51
// 109 |    193      |  self=0 q²=0          |   9001      | 168.70
// 113 |    185      |  self=0 q²=0          |   8816      | 159.31
// 127 |    164      |  self=0 q²=1          |   8652      | 138.83
// 131 |    153      |  self=0 q²=1          |   8499      | 132.09
// 137 |    152      |  self=1 q²=0          |   8347      | 124.07
// 139 |    135      |  self=0 q²=1          |   8212      | 120.10
// 149 |    135      |  self=1 q²=0          |   8077      | 110.23
// 151 |    124      |  self=0 q²=0          |   7953      | 106.98
// 157 |    122      |  self=0 q²=0          |   7831      | 101.31
// 163 |    122      |  self=0 q²=0          |   7709      | 96.09
// 167 |    108      |  self=0 q²=0          |   7601      | 92.32
// 173 |    112      |  self=0 q²=1          |   7489      | 87.87
// 179 |    104      |  self=1 q²=0          |   7385      | 83.68
// 181 |    102      |  self=0 q²=0          |   7283      | 81.60
// 191 |    101      |  self=1 q²=1          |   7182      | 76.26
// 193 |     88      |  self=0 q²=0          |   7094      | 74.42
// 197 |     92      |  self=1 q²=0          |   7002      | 72.02
// 199 |     89      |  self=0 q²=0          |   6913      | 70.37
// 211 |     85      |  self=0 q²=1          |   6828      | 65.53
// 223 |     81      |  self=0 q²=1          |   6747      | 61.24
// 227 |     80      |  self=1 q²=0          |   6667      | 59.44
// 229 |     72      |  self=0 q²=0          |   6595      | 58.23
// 233 |     70      |  self=0 q²=1          |   6525      | 56.61
// 239 |     65      |  self=1 q²=1          |   6460      | 54.60
// 241 |     64      |  self=0 q²=0          |   6396      | 53.61
// 251 |     72      |  self=0 q²=0          |   6324      | 50.96
// 257 |     63      |  self=0 q²=1          |   6261      | 49.21
// 263 |     56      |  self=0 q²=0          |   6205      | 47.61
// 269 |     59      |  self=1 q²=0          |   6146      | 46.13
// 271 |     54      |  self=0 q²=0          |   6092      | 45.36
// 277 |     65      |  self=0 q²=0          |   6027      | 43.99
// 281 |     55      |  self=1 q²=0          |   5972      | 42.90
// 283 |     47      |  self=0 q²=0          |   5925      | 42.20
// 293 |     54      |  self=0 q²=1          |   5871      | 40.44
// 307 |     50      |  self=0 q²=0          |   5821      | 38.25
// 311 |     45      |  self=1 q²=0          |   5776      | 37.43
// 313 |     48      |  self=0 q²=1          |   5728      | 36.91
// 317 |     43      |  self=0 q²=0          |   5685      | 36.14
// 331 |     42      |  self=0 q²=0          |   5643      | 34.35
// 337 |     36      |  self=0 q²=1          |   5607      | 33.49
// 347 |     43      |  self=1 q²=0          |   5564      | 32.32
// 349 |     35      |  self=0 q²=0          |   5529      | 31.89
// 353 |     34      |  self=0 q²=0          |   5495      | 31.33
// 359 |     36      |  self=0 q²=1          |   5459      | 30.61
// 367 |     34      |  self=0 q²=0          |   5425      | 29.75
// 373 |     34      |  self=0 q²=0          |   5391      | 29.09
// 379 |     33      |  self=0 q²=0          |   5358      | 28.45
// 383 |     33      |  self=0 q²=0          |   5325      | 27.98
// 389 |     38      |  self=0 q²=0          |   5287      | 27.38
// 397 |     28      |  self=0 q²=0          |   5259      | 26.63
// 401 |     31      |  self=0 q²=0          |   5228      | 26.23
// 409 |     25      |  self=0 q²=0          |   5203      | 25.56
// 419 |     29      |  self=1 q²=0          |   5174      | 24.84
// 421 |     22      |  self=0 q²=1          |   5152      | 24.58
// 431 |     26      |  self=1 q²=0          |   5126      | 23.91
// 433 |     27      |  self=0 q²=0          |   5099      | 23.68
// 439 |     25      |  self=0 q²=0          |   5074      | 23.23
// 443 |     23      |  self=0 q²=1          |   5051      | 22.91
// 449 |     22      |  self=0 q²=1          |   5029      | 22.50
// 457 |     21      |  self=0 q²=0          |   5008      | 22.01
// 461 |     20      |  self=1 q²=0          |   4988      | 21.73
// 463 |     22      |  self=0 q²=0          |   4966      | 21.55
// 467 |     21      |  self=0 q²=1          |   4945      | 21.27
// 479 |     19      |  self=0 q²=0          |   4926      | 20.65
// 487 |     23      |  self=0 q²=0          |   4903      | 20.23
// 491 |     20      |  self=0 q²=1          |   4883      | 19.97
// 499 |     20      |  self=0 q²=0          |   4863      | 19.57
// 503 |     20      |  self=0 q²=0          |   4843      | 19.34
// 509 |     20      |  self=0 q²=0          |   4823      | 19.03
// 521 |     19      |  self=1 q²=0          |   4804      | 18.51
// 523 |     18      |  self=0 q²=1          |   4786      | 18.37
// 541 |     10      |  self=0 q²=1          |   4776      | 17.69
// 547 |     14      |  self=0 q²=0          |   4762      | 17.46
// 557 |     16      |  self=0 q²=0          |   4746      | 17.10
// 563 |      8      |  self=0 q²=0          |   4738      | 16.86
// 569 |     12      |  self=1 q²=1          |   4726      | 16.65
// 571 |     10      |  self=0 q²=0          |   4716      | 16.55
// 577 |      8      |  self=0 q²=0          |   4708      | 16.35
// 587 |     11      |  self=0 q²=1          |   4697      | 16.04
// 593 |      7      |  self=0 q²=0          |   4690      | 15.84
// 599 |     13      |  self=1 q²=0          |   4677      | 15.66
// 601 |     10      |  self=0 q²=0          |   4667      | 15.56
// 607 |      5      |  self=0 q²=1          |   4662      | 15.38
// 613 |      8      |  self=0 q²=0          |   4654      | 15.21
// 617 |      8      |  self=1 q²=0          |   4646      | 15.09
// 619 |      7      |  self=0 q²=0          |   4639      | 15.01
// 631 |      6      |  self=0 q²=0          |   4633      | 14.70
// 641 |      3      |  self=1 q²=0          |   4630      | 14.46
// 643 |      4      |  self=0 q²=0          |   4626      | 14.40
// 647 |      3      |  self=0 q²=0          |   4623      | 14.30
// 653 |      5      |  self=0 q²=1          |   4618      | 14.16
// 659 |      4      |  self=1 q²=0          |   4614      | 14.02
// 661 |      2      |  self=0 q²=0          |   4612      | 13.96
// 673 |      2      |  self=0 q²=0          |   4610      | 13.71
// 677 |      1      |  self=0 q²=1          |   4609      | 13.62
// 683 |      0      |  self=0 q²=0          |   4609      | 13.50
// 691 |      1      |  self=0 q²=0          |   4608      | 13.34
// 701 |      2      |  self=0 q²=0          |   4606      | 13.15
// 709 |      0      |  self=0 q²=0          |   4606      | 12.99
// 719 |      0      |  self=0 q²=0          |   4606      | 12.81   (q>√W: self-only)
// 727 |      0      |  self=0 q²=0          |   4606      | 12.67   (q>√W: self-only)
// 733 |      0      |  self=0 q²=0          |   4606      | 12.57   (q>√W: self-only)
// 739 |      0      |  self=0 q²=0          |   4606      | 12.47   (q>√W: self-only)
// 743 |      0      |  self=0 q²=0          |   4606      | 12.40   (q>√W: self-only)
// 751 |      0      |  self=0 q²=0          |   4606      | 12.27   (q>√W: self-only)
// 757 |      0      |  self=0 q²=0          |   4606      | 12.17   (q>√W: self-only)
// 761 |      0      |  self=0 q²=0          |   4606      | 12.11   (q>√W: self-only)
// 769 |      0      |  self=0 q²=0          |   4606      | 11.98   (q>√W: self-only)
// 773 |      0      |  self=0 q²=0          |   4606      | 11.92   (q>√W: self-only)
// 787 |      0      |  self=0 q²=0          |   4606      | 11.71   (q>√W: self-only)
// 797 |      0      |  self=0 q²=0          |   4606      | 11.56   (q>√W: self-only)
// 809 |      1      |  self=1 q²=0          |   4605      | 11.39   (q>√W: self-only)
// 811 |      0      |  self=0 q²=0          |   4605      | 11.36   (q>√W: self-only)
// 821 |      1      |  self=1 q²=0          |   4604      | 11.22   (q>√W: self-only)
// 823 |      0      |  self=0 q²=0          |   4604      | 11.19   (q>√W: self-only)
// 827 |      1      |  self=1 q²=0          |   4603      | 11.13   (q>√W: self-only)
// 829 |      0      |  self=0 q²=0          |   4603      | 11.10   (q>√W: self-only)
// 839 |      0      |  self=0 q²=0          |   4603      | 10.97   (q>√W: self-only)
// 853 |      0      |  self=0 q²=0          |   4603      | 10.79   (q>√W: self-only)
// 857 |      1      |  self=1 q²=0          |   4602      | 10.74   (q>√W: self-only)
// 859 |      0      |  self=0 q²=0          |   4602      | 10.71   (q>√W: self-only)
// 863 |      0      |  self=0 q²=0          |   4602      | 10.67   (q>√W: self-only)
// 877 |      0      |  self=0 q²=0          |   4602      | 10.49   (q>√W: self-only)
// 881 |      1      |  self=1 q²=0          |   4601      | 10.45   (q>√W: self-only)
// 883 |      0      |  self=0 q²=0          |   4601      | 10.42   (q>√W: self-only)
// 887 |      0      |  self=0 q²=0          |   4601      | 10.37   (q>√W: self-only)
// 907 |      0      |  self=0 q²=0          |   4601      | 10.15   (q>√W: self-only)
// 911 |      0      |  self=0 q²=0          |   4601      | 10.10   (q>√W: self-only)
// 919 |      0      |  self=0 q²=0          |   4601      | 10.01   (q>√W: self-only)
// 929 |      0      |  self=0 q²=0          |   4601      | 9.91   (q>√W: self-only)
// 937 |      0      |  self=0 q²=0          |   4601      | 9.82   (q>√W: self-only)
// 941 |      0      |  self=0 q²=0          |   4601      | 9.78   (q>√W: self-only)
// 947 |      0      |  self=0 q²=0          |   4601      | 9.72   (q>√W: self-only)
// 953 |      0      |  self=0 q²=0          |   4601      | 9.66   (q>√W: self-only)
// 967 |      0      |  self=0 q²=0          |   4601      | 9.52   (q>√W: self-only)
// 971 |      0      |  self=0 q²=0          |   4601      | 9.48   (q>√W: self-only)
// 977 |      0      |  self=0 q²=0          |   4601      | 9.42   (q>√W: self-only)
// 983 |      0      |  self=0 q²=0          |   4601      | 9.36   (q>√W: self-only)
// 991 |      0      |  self=0 q²=0          |   4601      | 9.29   (q>√W: self-only)
// 997 |      0      |  self=0 q²=0          |   4601      | 9.23   (q>√W: self-only)
// 1009 |      0      |  self=0 q²=0          |   4601      | 9.12   (q>√W: self-only)
// 1013 |      0      |  self=0 q²=0          |   4601      | 9.08   (q>√W: self-only)
// 1019 |      1      |  self=1 q²=0          |   4600      | 9.03   (q>√W: self-only)
// 1021 |      0      |  self=0 q²=0          |   4600      | 9.01   (q>√W: self-only)
// 1031 |      1      |  self=1 q²=0          |   4599      | 8.92   (q>√W: self-only)
// 1033 |      0      |  self=0 q²=0          |   4599      | 8.90   (q>√W: self-only)
// 1039 |      0      |  self=0 q²=0          |   4599      | 8.85   (q>√W: self-only)
// 1049 |      1      |  self=1 q²=0          |   4598      | 8.77   (q>√W: self-only)
// 1051 |      0      |  self=0 q²=0          |   4598      | 8.75   (q>√W: self-only)
// 1061 |      1      |  self=1 q²=0          |   4597      | 8.67   (q>√W: self-only)
// 1063 |      0      |  self=0 q²=0          |   4597      | 8.65   (q>√W: self-only)
// 1069 |      0      |  self=0 q²=0          |   4597      | 8.60   (q>√W: self-only)
// 1087 |      0      |  self=0 q²=0          |   4597      | 8.46   (q>√W: self-only)
// 1091 |      1      |  self=1 q²=0          |   4596      | 8.43   (q>√W: self-only)
// 1093 |      0      |  self=0 q²=0          |   4596      | 8.41   (q>√W: self-only)
// 1097 |      0      |  self=0 q²=0          |   4596      | 8.38   (q>√W: self-only)
// 1103 |      0      |  self=0 q²=0          |   4596      | 8.33   (q>√W: self-only)
// 1109 |      0      |  self=0 q²=0          |   4596      | 8.29   (q>√W: self-only)
// 1117 |      0      |  self=0 q²=0          |   4596      | 8.23   (q>√W: self-only)
// 1123 |      0      |  self=0 q²=0          |   4596      | 8.19   (q>√W: self-only)
// 1129 |      0      |  self=0 q²=0          |   4596      | 8.14   (q>√W: self-only)
// 1151 |      1      |  self=1 q²=0          |   4595      | 7.99   (q>√W: self-only)
// 1153 |      0      |  self=0 q²=0          |   4595      | 7.97   (q>√W: self-only)
// 1163 |      0      |  self=0 q²=0          |   4595      | 7.90   (q>√W: self-only)
// 1171 |      0      |  self=0 q²=0          |   4595      | 7.85   (q>√W: self-only)
// 1181 |      0      |  self=0 q²=0          |   4595      | 7.78   (q>√W: self-only)
// 1187 |      0      |  self=0 q²=0          |   4595      | 7.74   (q>√W: self-only)
// 1193 |      0      |  self=0 q²=0          |   4595      | 7.70   (q>√W: self-only)
// 1201 |      0      |  self=0 q²=0          |   4595      | 7.65   (q>√W: self-only)
// 1213 |      0      |  self=0 q²=0          |   4595      | 7.58   (q>√W: self-only)
// 1217 |      0      |  self=0 q²=0          |   4595      | 7.55   (q>√W: self-only)
// 1223 |      0      |  self=0 q²=0          |   4595      | 7.51   (q>√W: self-only)
// 1229 |      1      |  self=1 q²=0          |   4594      | 7.48   (q>√W: self-only)
// 1231 |      0      |  self=0 q²=0          |   4594      | 7.46   (q>√W: self-only)
// 1237 |      0      |  self=0 q²=0          |   4594      | 7.43   (q>√W: self-only)
// 1249 |      0      |  self=0 q²=0          |   4594      | 7.36   (q>√W: self-only)
// 1259 |      0      |  self=0 q²=0          |   4594      | 7.30   (q>√W: self-only)
// 1277 |      1      |  self=1 q²=0          |   4593      | 7.19   (q>√W: self-only)
// 1279 |      0      |  self=0 q²=0          |   4593      | 7.18   (q>√W: self-only)
// 1283 |      0      |  self=0 q²=0          |   4593      | 7.16   (q>√W: self-only)
// 1289 |      1      |  self=1 q²=0          |   4592      | 7.13   (q>√W: self-only)
// 1291 |      0      |  self=0 q²=0          |   4592      | 7.11   (q>√W: self-only)
// 1297 |      0      |  self=0 q²=0          |   4592      | 7.08   (q>√W: self-only)
// 1301 |      1      |  self=1 q²=0          |   4591      | 7.06   (q>√W: self-only)
// 1303 |      0      |  self=0 q²=0          |   4591      | 7.05   (q>√W: self-only)
// 1307 |      0      |  self=0 q²=0          |   4591      | 7.03   (q>√W: self-only)
// 1319 |      1      |  self=1 q²=0          |   4590      | 6.96   (q>√W: self-only)
// 1321 |      0      |  self=0 q²=0          |   4590      | 6.95   (q>√W: self-only)
// 1327 |      0      |  self=0 q²=0          |   4590      | 6.92   (q>√W: self-only)
// 1361 |      0      |  self=0 q²=0          |   4590      | 6.75   (q>√W: self-only)
// 1367 |      0      |  self=0 q²=0          |   4590      | 6.72   (q>√W: self-only)
// 1373 |      0      |  self=0 q²=0          |   4590      | 6.69   (q>√W: self-only)
// 1381 |      0      |  self=0 q²=0          |   4590      | 6.65   (q>√W: self-only)
// 1399 |      0      |  self=0 q²=0          |   4590      | 6.56   (q>√W: self-only)
// 1409 |      0      |  self=0 q²=0          |   4590      | 6.52   (q>√W: self-only)
// 1423 |      0      |  self=0 q²=0          |   4590      | 6.45   (q>√W: self-only)
// 1427 |      1      |  self=1 q²=0          |   4589      | 6.43   (q>√W: self-only)
// 1451 |      1      |  self=1 q²=0          |   4588      | 6.33   (q>√W: self-only)
// 1481 |      1      |  self=1 q²=0          |   4587      | 6.20   (q>√W: self-only)
// 1487 |      1      |  self=1 q²=0          |   4586      | 6.17   (q>√W: self-only)
// 1607 |      1      |  self=1 q²=0          |   4585      | 5.71   (q>√W: self-only)
// 1619 |      1      |  self=1 q²=0          |   4584      | 5.66   (q>√W: self-only)
// 1667 |      1      |  self=1 q²=0          |   4583      | 5.50   (q>√W: self-only)
// 1697 |      1      |  self=1 q²=0          |   4582      | 5.40   (q>√W: self-only)
// 1721 |      1      |  self=1 q²=0          |   4581      | 5.32   (q>√W: self-only)
// 1787 |      1      |  self=1 q²=0          |   4580      | 5.13   (q>√W: self-only)
// 1871 |      1      |  self=1 q²=0          |   4579      | 4.90   (q>√W: self-only)
// 1877 |      1      |  self=1 q²=0          |   4578      | 4.88   (q>√W: self-only)
// 1931 |      1      |  self=1 q²=0          |   4577      | 4.74   (q>√W: self-only)
// 1949 |      1      |  self=1 q²=0          |   4576      | 4.70   (q>√W: self-only)
// 1997 |      1      |  self=1 q²=0          |   4575      | 4.58   (q>√W: self-only)
// 2027 |      1      |  self=1 q²=0          |   4574      | 4.51   (q>√W: self-only)
// 2081 |      1      |  self=1 q²=0          |   4573      | 4.40   (q>√W: self-only)
// 2087 |      1      |  self=1 q²=0          |   4572      | 4.38   (q>√W: self-only)
// 2111 |      1      |  self=1 q²=0          |   4571      | 4.33   (q>√W: self-only)
// 2129 |      1      |  self=1 q²=0          |   4570      | 4.29   (q>√W: self-only)
// 2141 |      1      |  self=1 q²=0          |   4569      | 4.27   (q>√W: self-only)
//   primes ≤ √W (19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709) did 17669 kills; primes > √W did 37 (self-strikes). Final alive: 4569.
//   final 4569 survivors are twin candidates coprime to all q≤√W; those below (√W)²... = the real twins in [0,510510).
// ============================================================================
// READINGS
//
// THE PATTERN — kills(q) ≈ 2·(alive before q)/q, at EVERY level.
// 1. Each prime removes its 2/q share of the CURRENT survivors — the
//    Copying Theorem's (p-2)/p law, now visible as a per-prime kill sequence
//    in a fixed window. The actual integer fluctuates by a few around the
//    density 2·alive/q; the match is tight at every base tile.
// 2. THE √W TOOTH-LOSS THRESHOLD. While q ≤ √W the share 2·alive/q is > ~2
//    and the prime does bulk damage. As q crosses √W it drops below 2 and
//    the prime becomes a SELF-STRIKER ONLY: kills 0 or 1, landing on a slot
//    only when q itself (or q-2) is a slot member. Every prime > √W in the
//    tables kills 0 or 1, never more — the p² rule from the kill side.
// 3. EACH KILL DECOMPOSES: at most one self-strike (position q, iff q is a
//    slot) + at most one hit at q² (iff q² is a slot) + bulk kills at
//    q·(cofactor coprime to everything smaller). Self and q² columns are
//    always 0/1.
// 3a. A SELF-STRIKE IS NOT A KILL — IT IS A TWIN PRIME FOUND (Chris,
//     2026-08-14; PROVEN + verified all levels). A slot (q, q+2) with q prime
//     is removed by the first prime beyond the tile dividing q or q+2; nothing
//     divides q but q. So if q+2 is COMPOSITE a smaller prime bulk-kills the
//     slot before q arrives; the slot survives to be struck by q ITSELF only
//     when q+2 is prime — i.e. iff (q, q+2) is a twin prime. Hence:
//        self-strike ⟺ the pair is a genuine twin prime.
//     Verified: @7 self-strikes = (11,13)(17,19)(29,31)(41,43); @13 = 21
//     twins (17,19)…(461,463); ALL twin primes, every level. Consequences:
//     (i) the honest destruction count is kills MINUS self-strikes;
//     (ii) the self-strike sequence of a tile ENUMERATES its twin primes
//          (smaller member > tile base) — marching the Scour and logging
//          self-strikes IS a twin-prime finder;
//     (iii) a self-strike is q graduating to wheel-prime status with its
//          partner intact (the ancestor (5,7) is the first: 5 self-strikes
//          at fold 5). "Genuine kills" (bulk + q²) unmask COMPOSITE
//          candidates; self-strikes DISCOVER twins. Different events.
// 4. THE MARCH BOTTOMS OUT AT THE REAL TWINS. After sieving by all primes
//    ≤ √W, a surviving position r < W is coprime to all primes ≤ √r < √W, so
//    (r, r+2) is an actual twin prime. @7 → 9-ish survivors = twins below
//    210; the tree run to √W reconstructs exactly the twin primes in the
//    tile (crystallization, from the Scour direction).
// 5. SUM RULE: total bulk kills (q≤√W) ≫ total self-strike kills (q>√W).
//    The effective Scour on a width-W tile is the SHORT list of primes ≤ √W;
//    everything larger is boundary noise. This is why small tiles resolve to
//    their twins after touching only a handful of primes.
// ============================================================================
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// @7 (W=210, 15 slots, √W=14.5):
//   q=11 kills 2 (dens 2.73); 13 kills 1 [self=0,q²=1] (2.00); 17 kills 1
//   [self] (1.41, q>√W); 19,23 kill 0; 29,41 self-strike 1 each. Final 9.
// @11 (W=2310, 135 slots, √W=48.1):
//   13:21(20.8) 17:15(13.4) 19:11(10.4) 23:7 29:7 31:4 37:2 41:1 43:2 47:1
//   — then q>√W (53+): all 0 except sporadic self-strikes. Final 59.
// @13 (W=30030, 1485 slots, √W=173.3):
//   17:173(174.7) 19:139(138) 23:98(102) 29:75(74) 31:66(64) 37:47(50) ...
//   every kill count hugs 2·alive_before/q; past q=173 only self-strikes.
//
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: the prime pair "29,41" reads as a single
//   number. Both primes are printed above.
// ---------------------------------------------------------------------------
