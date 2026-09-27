// ============================================================================
// FOLD LEDGER — FORCED (scratchpad-grade). Which properties of the ledger's
// columns are THEOREMS (hold at every fold, no probabilistic content) rather
// than expectations. Reads research/fold-ledger-01.csv; recomputes the
// window structure the CSV does not carry (destroyer split, prime members,
// small-prime unions) and asserts row-identity with the committed table.
// Companion to research/history/staging/fold-ledger-forced.md.
// NOT an embedded artifact. Run: node research/history/staging/fold-ledger-forced.js
// ============================================================================
'use strict';
const T0 = Date.now();
const fs = require('fs');
let fail = 0;
const AEQ = (t, g, w) => { if (g !== w) { fail++; console.log(`  FAIL [${t}]: got ${g} want ${w}`); } };
const ATR = (t, c) => { if (!c) { fail++; console.log(`  FAIL [${t}]`); } };

// ---- the committed table -----------------------------------------------
const L = fs.readFileSync('research/fold-ledger-01.csv', 'utf8').trim().split('\n');
const H = L[0].split(',');
const ix = n => { const i = H.indexOf(n); if (i < 0) throw new Error('missing col ' + n); return i; };
const CI = { q: ix('q'), qn: ix('q_next'), lo: ix('stretch_lo'), w: ix('width'),
  add: ix('added_pairs'), rem: ix('removed_total'), bn: ix('removed_by_new_prime'),
  bo: ix('removed_by_old_moire'), net: ix('net_new_twins'), cc: ix('both_composite_pairs'),
  ca: ix('cum_added'), cr: ix('cum_removed'), ct: ix('cum_twins') };
const ROWS = L.slice(1).map(l => { const f = l.split(','); const o = {}; for (const k in CI) o[k] = Number(f[CI[k]]); return o; });
console.log(`fold-ledger-forced — ${ROWS.length} rows read from research/fold-ledger-01.csv`);

// ---- primes -------------------------------------------------------------
const PLIM = 10100;
const fl = new Uint8Array(PLIM + 1); fl[0] = fl[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!fl[p]) for (let m = p * p; m <= PLIM; m += p) fl[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!fl[n]) PRIMES.push(n);
const PI = new Int32Array(PLIM + 1); { let c = 0; for (let n = 0; n <= PLIM; n++) { if (!fl[n]) c++; PI[n] = c; } }
const ACT = PRIMES.filter(p => p >= 7 && p <= 9973);
const QTOP = 10007;
const CH = [11, 17, 29];                       // channel openers mod 30
const MEMCL = new Set([1, 11, 13, 17, 19, 29]); // residues mod 30 that sit in a channel slot

// closed-form count of a in [A,B] with a % 30 in CH
const cntCh = (A, B) => { let s = 0; for (const c of CH) { const lo0 = A + (((c - A) % 30) + 30) % 30; if (lo0 > B) continue; s += Math.floor((B - lo0) / 30) + 1; } return s; };

// ============================================================================
console.log('\nSEC 1 — DEFINITIONAL IDENTITIES (F1-F6): exact at every row?');
// ============================================================================
{
  let ca = 0, cr = 0, ct = 0, w24 = 0, sq30 = 0, ccle = 0, netpos = 0;
  for (const r of ROWS) {
    AEQ('F2 removed = by_new + by_old', r.rem, r.bn + r.bo);
    AEQ('F3 net = added - removed', r.net, r.add - r.rem);
    if (r.cc <= r.rem) ccle++;
    ATR(`F4b cc <= by_old at q=${r.q}`, r.cc <= r.bo);
    if (r.net >= 0) netpos++;
    AEQ('F1 added = closed form', r.add, cntCh(r.lo, r.lo + r.w - 3));
    AEQ('width = qn^2 - q^2', r.w, r.qn * r.qn - r.q * r.q);
    if (r.w % 24 === 0) w24++;
    if (r.lo % 30 === 1 || r.lo % 30 === 19) sq30++;
    ca += r.add; cr += r.rem; ct += r.net;
    AEQ(`F5 cum_added at q=${r.q}`, r.ca, ca);
    AEQ(`F5 cum_removed at q=${r.q}`, r.cr, cr);
    AEQ(`F5 cum_twins at q=${r.q}`, r.ct, ct);
  }
  AEQ('F4 cc <= removed at all rows', ccle, ROWS.length);
  AEQ('net >= 0 at all rows', netpos, ROWS.length);
  AEQ('F6 width = 0 mod 24 at all rows', w24, ROWS.length);
  AEQ('F6 q^2 = 1 or 19 mod 30 at all rows', sq30, ROWS.length);
  AEQ('F5 telescope cum_added - cum_removed = cum_twins', ca - cr, ct);
  console.log(`  F1-F6 all asserted row-by-row; cum_added ${ca}, cum_removed ${cr}, cum_twins ${ct}`);
}

// ---- F1b: added vs width/10, and the boundary drop ----------------------
{
  let mx = -Infinity, mn = Infinity; const byres = {}, wres = {};
  for (const r of ROWS) { const d = r.add - (r.w - 2) / 10; if (d > mx) mx = d; if (d < mn) mn = d;
    const wm = r.w % 30; (byres[wm] = byres[wm] || new Set()).add(d.toFixed(2)); wres[wm] = (wres[wm] || 0) + 1; }
  console.log(`  F1b  added - (width-2)/10 over 1226 rows: min ${mn.toFixed(2)}, max ${mx.toFixed(2)}`);
  for (const k of Object.keys(byres).sort((a,b)=>a-b))
    console.log(`       width = ${k} mod 30 (${wres[k]} folds): added - (width-2)/10 takes exactly {${[...byres[k]].join(', ')}}`);
  // boundary drop: openers a = hi-2 belong to no stretch's ledger
  const globalCh = cntCh(49, QTOP * QTOP - 3);
  const dropped = ROWS.filter(r => r.lo + r.w - 2 <= QTOP * QTOP - 3).length;
  console.log(`  F7   channel openers in [49, ${QTOP}^2-3] = ${globalCh}; cum_added = ${ROWS[ROWS.length - 1].ca}; difference ${globalCh - ROWS[ROWS.length - 1].ca}`);
  console.log(`       predicted drop (one opener q_next^2-2 per stretch, inside the global range) = ${dropped}`);
  AEQ('F7 boundary drop = one channel opener per stretch', globalCh - ROWS[ROWS.length - 1].ca, dropped);
  let ndrop = 0; for (const r of ROWS) { const hi = r.lo + r.w; if (CH.includes((hi - 2) % 30)) ndrop++; }
  AEQ('F7 hi-2 is a channel opener at every stretch', ndrop, ROWS.length);
}

// ============================================================================
console.log('\nSEC 2 — by_new: THE FORCED UPPER BOUND (F8) AND ITS LOCALIZATION (F9)');
// ============================================================================
const BN = [];
for (const r of ROWS) {
  const hi = r.lo + r.w, q = r.q, qn = r.qn;
  const Kmax = Math.floor((hi - 1) / q);
  // B1: primes k in (q, Kmax]
  const B1 = PI[Math.min(Kmax, PLIM)] - PI[q];
  // B2: + the mod-30 class filter (q*k must sit in a channel slot)
  // B3: + slot containment at the top edge
  let B2 = 0, B3 = 0;
  for (let i = PI[q]; i < PRIMES.length; i++) {
    const k = PRIMES[i]; if (k > Kmax) break; if (k <= q) continue;
    const m = q * k, c = m % 30;
    if (!MEMCL.has(c)) continue;
    B2++;
    const a = CH.includes(c) ? m : m - 2;   // the slot's opener
    if (a >= r.lo && a + 2 <= hi - 1) B3++;
  }
  // Bg: the gap-only bound (drops all primality of k above q_next)
  let Bg = 1; for (let n = qn + 1; n <= Kmax; n++) { if (n % 2 && n % 3 && n % 5) Bg++; }
  BN.push({ q, qn, g: qn - q, Kmax, B1, B2, B3, Bg, bn: r.bn, win: Kmax - q });
  ATR(`F8 by_new <= B3 at q=${q}`, r.bn <= B3);
  ATR(`F8 B3 <= B2 <= B1 <= Bg at q=${q}`, B3 <= B2 && B2 <= B1 && B1 <= Bg);
}
{
  const s = a => a.reduce((x, y) => x + y, 0);
  const mx = k => Math.max(...BN.map(o => o[k])), mean = k => s(BN.map(o => o[k])) / BN.length;
  console.log('  bound        mean    max   (measured by_new: mean ' + mean('bn').toFixed(3) + ', max ' + mx('bn') + ')');
  for (const k of ['B3', 'B2', 'B1', 'Bg'])
    console.log(`  ${k.padEnd(11)}${mean(k).toFixed(3).padStart(6)}${String(mx(k)).padStart(7)}`);
  const slack = BN.map(o => o.B3 - o.bn);
  const hist = {}; for (const v of slack) hist[v] = (hist[v] || 0) + 1;
  console.log('  slack B3 - by_new:', Object.keys(hist).sort((a, b) => a - b).map(k => `${k}:${hist[k]}`).join(' '));
  const tight = slack.filter(v => v === 0).length;
  console.log(`  B3 tight (slack 0) at ${tight} of ${BN.length} folds (${(100 * tight / BN.length).toFixed(1)}%)`);
  console.log(`  the forced window: Kmax - q, mean ${mean('win').toFixed(1)}, max ${mx('win')}; prime gap g mean ${mean('g').toFixed(1)}, max ${mx('g')}`);
  const zeroM = BN.filter(o => o.bn === 0).length, zeroB = BN.filter(o => o.B3 === 0).length;
  console.log(`  measured by_new = 0 at ${zeroM} of ${BN.length} folds; B3 = 0 (by_new FORCED to 0) at ${zeroB} folds`);
  const worst = BN.slice().sort((a, b) => b.B3 - a.B3)[0];
  console.log(`  worst forced bound: q=${worst.q} g=${worst.g} B3=${worst.B3} (measured by_new ${worst.bn})`);
}

// ============================================================================
console.log('\nSEC 3 — RECOMPUTE THE WINDOW: destroyer split, prime members, small-prime unions');
// ============================================================================
const maxW = Math.max(...ROWS.map(r => r.w));
const arr = new Uint8Array(maxW + 4);
const PREFIX = PRIMES.filter(p => p >= 7 && p <= 97);
const OUT = [];
for (let i = 0; i < ROWS.length; i++) {
  const r = ROWS[i], lo = r.lo, hi = lo + r.w, q = r.q, w = r.w;
  arr.fill(0, 0, w + 3);
  for (let j = 0; j < ACT.length; j++) {
    const p = ACT[j]; if (p > q) break;
    const bit = (p === q) ? 2 : (p <= 97 ? 5 : 1);   // 1 = old, 2 = q, 4 = prefix(<=97)
    for (let v = Math.ceil(lo / p) * p; v < hi; v += p) arr[v - lo] |= bit;
  }
  let added = 0, byOld = 0, byNew = 0, twins = 0, cc = 0, primeMem = 0, uniPre = 0, minBN = Infinity;
  for (const cch of CH) {
    let a = lo + (((cch - lo) % 30) + 30) % 30;
    for (; a <= hi - 3; a += 30) {
      const A = arr[a - lo], B = arr[a + 2 - lo];
      added++;
      const cA = (A & 3) !== 0, cB = (B & 3) !== 0;
      if (!cA) primeMem++; if (!cB) primeMem++;
      if ((A & 4) || (B & 4)) uniPre++;
      if (!cA && !cB) { twins++; continue; }
      if (cA && cB) cc++;
      if ((A & 1) || (B & 1)) byOld++; else { byNew++; if (a < minBN) minBN = a; }
    }
  }
  AEQ(`row-identity added q=${q}`, added, r.add);
  AEQ(`row-identity by_old q=${q}`, byOld, r.bo);
  AEQ(`row-identity by_new q=${q}`, byNew, r.bn);
  AEQ(`row-identity net q=${q}`, twins, r.net);
  AEQ(`row-identity cc q=${q}`, cc, r.cc);
  // F10 the hidden prime-member identity: primeMem = 2*net + removed - cc
  AEQ(`F10 prime members q=${q}`, primeMem, 2 * r.net + r.rem - r.cc);
  // F9 localization of by_new
  if (byNew > 0) ATR(`F9 by_new opener >= q*q_next - 2 at q=${q}`, minBN >= q * r.qn - 2);
  OUT.push({ q, uniPre, bo: r.bo, add: r.add, net: r.net, w });
}
console.log(`  1226 rows recomputed and asserted row-identical to the CSV (added, by_old, by_new, net, cc)`);
console.log(`  F10 prime-member identity #{prime members in contained slots} = 2*net + removed - cc asserted at every row`);
console.log(`  F9  every by_new kill's opener >= q*q_next - 2 asserted at every row with by_new > 0`);

// ============================================================================
console.log('\nSEC 4 — by_old: THE FORCED LOWER BOUNDS (F11 single prime, F12 prefix-CRT, F13 exact prefix)');
// ============================================================================
// F11: max over old p of the exact class count A_p (closed form, CRT mod 30p)
const INV30 = new Int32Array(PLIM + 1);
for (const p of ACT) { for (let t = 1; t < p; t++) if ((30 * t) % p === 1) { INV30[p] = t; break; } }
function classCount(A, B, c30, dp, p) { // a in [A,B], a=c30 (30), a=dp (p)
  const M = 30 * p;
  // solve x = c30 + 30t = dp (mod p) -> 30t = dp - c30 (mod p)
  const inv = INV30[p];
  let t0 = ((((dp - c30) % p) + p) % p) * inv % p;
  let x = c30 + 30 * t0; x = ((x % M) + M) % M;
  const lo0 = A + (((x - A) % M) + M) % M;
  return lo0 > B ? 0 : Math.floor((B - lo0) / M) + 1;
}
const F11 = [], F12 = [], F13 = [];
for (let i = 0; i < ROWS.length; i++) {
  const r = ROWS[i], A = r.lo, B = r.lo + r.w - 3;
  let best = 0;
  for (const p of ACT) { if (p >= r.q) break;
    let s = 0; for (const c of CH) { s += classCount(A, B, c, 0, p); s += classCount(A, B, c, ((-2 % p) + p) % p, p); }
    if (s > best) best = s;
  }
  F11.push(best);
  ATR(`F11 by_old >= max_p A_p at q=${r.q}`, r.bo >= best);
  // F12: prefix-CRT floor  U_P * floor((width-2)/M)
  let bestF = 0;
  let prod = 1, prodm2 = 1;
  for (const p of ACT) { if (p >= r.q) break;
    prod *= p; prodm2 *= (p - 2);
    const M = 30 * prod; if (M > r.w) break;
    const U = 3 * (prod - prodm2);
    const f = U * Math.floor((r.w - 2) / M);
    if (f > bestF) bestF = f;
  }
  F12.push(bestF);
  ATR(`F12 by_old >= prefix-CRT floor at q=${r.q}`, r.bo >= bestF);
  F13.push(OUT[i].uniPre);
  ATR(`F13 by_old >= exact prefix union at q=${r.q}`, r.bo >= OUT[i].uniPre);
}
{
  const bands = [[7, 31], [37, 97], [101, 313], [317, 997], [1009, 3163], [3167, 9973]];
  console.log('  band            folds     by_old   F11 max_p A_p   F12 prefix-CRT   F13 exact union p<=97   F11/by_old  F12/by_old  F13/by_old');
  for (const [a, b] of bands) {
    let n = 0, bo = 0, f11 = 0, f12 = 0, f13 = 0;
    for (let i = 0; i < ROWS.length; i++) if (ROWS[i].q >= a && ROWS[i].q <= b) { n++; bo += ROWS[i].bo; f11 += F11[i]; f12 += F12[i]; f13 += F13[i]; }
    console.log(`  ${(a + '-' + b).padEnd(14)}${String(n).padStart(5)}${String(bo).padStart(11)}${String(f11).padStart(15)}${String(f12).padStart(17)}${String(f13).padStart(24)}${(bo ? f11 / bo : 0).toFixed(4).padStart(13)}${(bo ? f12 / bo : 0).toFixed(4).padStart(12)}${(bo ? f13 / bo : 0).toFixed(4).padStart(12)}`);
  }
  const s = a => a.reduce((x, y) => x + y, 0);
  const BO = ROWS.map(r => r.bo);
  console.log(`  totals: by_old ${s(BO)}; F11 ${s(F11)} (${(100 * s(F11) / s(BO)).toFixed(2)}%), F12 ${s(F12)} (${(100 * s(F12) / s(BO)).toFixed(2)}%), F13 ${s(F13)} (${(100 * s(F13) / s(BO)).toFixed(2)}%)`);
  // Bonferroni-1: is sum_p A_p already past the added column (so any truncated
  // inclusion-exclusion lower bound over all p < q is vacuous)?
  let over = 0, lastUnder = 0, worstRatio = 0;
  for (let i = 0; i < ROWS.length; i++) {
    const r = ROWS[i], A = r.lo, B = r.lo + r.w - 3; let S1 = 0;
    for (const p of ACT) { if (p >= r.q) break;
      for (const c of CH) { S1 += classCount(A, B, c, 0, p); S1 += classCount(A, B, c, ((-2 % p) + p) % p, p); } }
    if (S1 > r.add) over++; else lastUnder = r.q;
    if (r.add && S1 / r.add > worstRatio) worstRatio = S1 / r.add;
  }
  console.log(`  Bonferroni-1 over all p < q: sum_p A_p exceeds added at ${over} of ${ROWS.length} folds (largest q where it does not: ${lastUnder}); max sum_p A_p / added = ${worstRatio.toFixed(2)}`);
  // the density crossing for a prefix P: sum_{p in P} 2/p > 1
  { let acc = 0, cross = 0; for (const p of ACT) { acc += 2 / p; if (acc > 1) { cross = p; break; } }
    console.log(`  prefix density crossing: sum_{7<=p<=y} 2/p first exceeds 1 at y = ${cross} (beyond it a Bonferroni-2 density floor is vacuous)`); }
}

// ============================================================================
console.log('\nSEC 5 — net: THE FORCED UPPER BOUND (F14), AND WHAT IS NOT FORCED');
// ============================================================================
{
  const bands = [[7, 31], [37, 97], [101, 313], [317, 997], [1009, 3163], [3167, 9973]];
  console.log('  band            folds        net   F14 = added-max(F11,F12,F13)  ratio  |  F14c = added-max(F11,F12) (closed form)  ratio');
  for (const [a, b] of bands) {
    let n = 0, nt = 0, ub = 0, ubc = 0;
    for (let i = 0; i < ROWS.length; i++) if (ROWS[i].q >= a && ROWS[i].q <= b) { n++; nt += ROWS[i].net; ub += ROWS[i].add - Math.max(F11[i], F12[i], F13[i]); ubc += ROWS[i].add - Math.max(F11[i], F12[i]); }
    console.log(`  ${(a + '-' + b).padEnd(14)}${String(n).padStart(5)}${String(nt).padStart(11)}${String(ub).padStart(31)}${(nt ? ub / nt : 0).toFixed(3).padStart(7)}  |${String(ubc).padStart(38)}${(nt ? ubc / nt : 0).toFixed(3).padStart(8)}`);
  }
  let viol = 0;
  for (let i = 0; i < ROWS.length; i++) if (!(ROWS[i].net <= ROWS[i].add - Math.max(F11[i], F12[i], F13[i]))) viol++;
  AEQ('F14 net <= added - forced by_old floor, violations', viol, 0);
  const minNet = Math.min(...ROWS.map(r => r.net));
  console.log(`  min net over 1226 folds: ${minNet} (MEASURED; net >= 1 is the occupancy assertion, NOT forced)`);
}

console.log(`\n${fail === 0 ? 'ALL ASSERTIONS PASS' : fail + ' ASSERTION FAILURES'} — elapsed ${((Date.now() - T0) / 1000).toFixed(1)}s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/fold-ledger-forced.js
//   invocation:  node research/history/staging/fold-ledger-forced.js
//   code-sha256: 48689856bfa7fae146619c44d697327fa285ff622630988ef76ae04750815b5b
//   out-sha256:  bf7ed9187ca896d1f8a8d9182abc1935dcfd56883dfe27339b40d45ddc2fba43
//   body-lines:  51
//   inputs:      research/fold-ledger-01.csv@ed5364404c9b
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.2 s
// ============================================================================
// fold-ledger-forced — 1226 rows read from research/fold-ledger-01.csv
//
// SEC 1 — DEFINITIONAL IDENTITIES (F1-F6): exact at every row?
//   F1-F6 all asserted row-by-row; cum_added 10012774, cum_removed 9571909, cum_twins 440865
//   F1b  added - (width-2)/10 over 1226 rows: min -1.00, max -0.60
//        width = 0 mod 30 (494 folds): added - (width-2)/10 takes exactly {-0.80}
//        width = 12 mod 30 (366 folds): added - (width-2)/10 takes exactly {-1.00}
//        width = 18 mod 30 (366 folds): added - (width-2)/10 takes exactly {-0.60}
//   F7   channel openers in [49, 10007^2-3] = 10013999; cum_added = 10012774; difference 1225
//        predicted drop (one opener q_next^2-2 per stretch, inside the global range) = 1225
//
// SEC 2 — by_new: THE FORCED UPPER BOUND (F8) AND ITS LOCALIZATION (F9)
//   bound        mean    max   (measured by_new: mean 0.267, max 3)
//   B3          1.271      5
//   B2          1.272      5
//   B1          1.825      7
//   Bg          2.852     11
//   slack B3 - by_new: 0:417 1:478 2:252 3:67 4:12
//   B3 tight (slack 0) at 417 of 1226 folds (34.0%)
//   the forced window: Kmax - q, mean 16.3, max 72; prime gap g mean 8.2, max 36
//   measured by_new = 0 at 933 of 1226 folds; B3 = 0 (by_new FORCED to 0) at 297 folds
//   worst forced bound: q=6173 g=24 B3=5 (measured by_new 1)
//
// SEC 3 — RECOMPUTE THE WINDOW: destroyer split, prime members, small-prime unions
//   1226 rows recomputed and asserted row-identical to the CSV (added, by_old, by_new, net, cc)
//   F10 prime-member identity #{prime members in contained slots} = 2*net + removed - cc asserted at every row
//   F9  every by_new kill's opener >= q*q_next - 2 asserted at every row with by_new > 0
//
// SEC 4 — by_old: THE FORCED LOWER BOUNDS (F11 single prime, F12 prefix-CRT, F13 exact prefix)
//   band            folds     by_old   F11 max_p A_p   F12 prefix-CRT   F13 exact union p<=97   F11/by_old  F12/by_old  F13/by_old
//   7-31              8         80             34               12                      80       0.4250      0.1500      1.0000
//   37-97            14        702            248              210                     702       0.3533      0.2991      1.0000
//   101-313          40       7954           2565             2814                    7347       0.3225      0.3538      0.9237
//   317-997         103      84541          26184            33630                   73896       0.3097      0.3978      0.8741
//   1009-3163       279     850004         257389           376266                  728448       0.3028      0.4427      0.8570
//   3167-9973       782    8628301        2574311          4095312                 7286076       0.2984      0.4746      0.8444
//   totals: by_old 9571582; F11 2860731 (29.89%), F12 4508244 (47.10%), F13 8096549 (84.59%)
//   Bonferroni-1 over all p < q: sum_p A_p exceeds added at 1219 of 1226 folds (largest q where it does not: 29); max sum_p A_p / added = 2.90
//   prefix density crossing: sum_{7<=p<=y} 2/p first exceeds 1 at y = 29 (beyond it a Bonferroni-2 density floor is vacuous)
//
// SEC 5 — net: THE FORCED UPPER BOUND (F14), AND WHAT IS NOT FORCED
//   band            folds        net   F14 = added-max(F11,F12,F13)  ratio  |  F14c = added-max(F11,F12) (closed form)  ratio
//   7-31              8         40                             44  1.100  |                                    90   2.250
//   37-97            14        164                            167  1.018  |                                   621   3.787
//   101-313          40       1017                           1642  1.615  |                                  6099   5.997
//   317-997         103       7086                          17760  2.506  |                                 57955   8.179
//   1009-3163       279      50827                         172454  3.393  |                                524604  10.321
//   3167-9973       782     381731                        1724158  4.517  |                               4914922  12.875
//   min net over 1226 folds: 2 (MEASURED; net >= 1 is the occupancy assertion, NOT forced)
//
// ALL ASSERTIONS PASS — elapsed 1.1s
// ============================================================================
// READINGS
// ============================================================
// 1. F1-F6, F10 and the row-identity recomputation are ASSERTIONS, not
//    reports: every one of them holds at all 1226 folds or the run fails.
//    The run passes. What the assertions establish is that the recomputed
//    window agrees with the committed CSV column for column, so the proofs
//    in fold-ledger-forced.md are checked against the table Chris holds,
//    not against a second model of it.
// 2. added is a function of width ALONE, exactly: three values of
//    added - (width-2)/10, one per residue class of width mod 30, with zero
//    spread inside each class over 1226 folds. Sharper than the +/-3 that
//    generic three-class floor counting gives, because q^2 = 1 or 19 mod 30
//    pins both endpoints.
// 3. The forced upper bound on by_new (B3) has max 5 against the column's
//    measured max 3; its mean is 1.271 against 0.267. It is tight (slack 0)
//    at 34.0% of folds and forces by_new = 0 outright at 297 folds. The
//    bound's own driver is the prime gap: the counting window (q, Kmax] has
//    mean length 16.3 and max 72 over this range.
// 4. No closed-form forced lower bound on by_old reaches the column. The
//    best single-prime floor holds 29.89% of it; the best closed-form
//    prefix-CRT floor holds 47.10%; an exact (non-closed-form) union count
//    over p <= 97 holds 84.59%, and it is decreasing band over band.
// 5. The consequence for net: the forced upper bound is 4.517x the measured
//    net in the top band using the exact-union floor, 12.875x using only
//    closed forms, and BOTH ratios grow monotonically band over band. The
//    forced ceiling on net diverges from net. Nothing here floors net.
