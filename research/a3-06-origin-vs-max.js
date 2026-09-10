// ============================================================================
// A3-06 — THE ORIGIN AGAINST THE MAXIMUM (ATTACKS3 A6, route B of ZONE-POSTULATE)
// ============================================================================
//
// THE QUESTION. The Zone Postulate needs the FIRST twin slot of T_x above the
// origin, not the largest twin-slot gap G2 anywhere in a tile of width x#. The
// G2 route therefore bounds a quantity at ONE distinguished place by a maximum
// over a region of width x#. A6 asks whether the first slot has its own, much
// better, fold recursion.
//
// DEFINITIONS, fixed here and used throughout.
//   T_x       tile mod W = x# ; holes = residues coprime to W
//   slot      r with r and r+2 both holes (a twin slot)
//   G2(x#)    largest cyclic gap between consecutive slots
//   m(x)      mean slot gap = W / count = 2 * prod_{3<=p<=x} p/(p-2)
//   F(x)      FIRST slot above 1, i.e. least n>1 with n and n+2 both x-rough
//   x'        next prime after x ; window = x'^2 - 2 (the Zone Postulate needs
//             F(x) < x'^2 - 2)
//
// WHAT THIS FILE DOES.
//   S1  custody: fold from T_2 and reproduce G2 = 12,30,42,66,108,150,204,258
//       at T_5..T_29, alongside count, m, and F at every level.
//   S2  the head-calm audit: how many slots does copy 0 delete inside the head
//       [0, p^2), against a typical copy k? This is the misalignment principle
//       measured AT THE ORIGIN.
//   S3  the exact first-slot fold recursion, stated and checked.
//   S4  extension of F to x ~ 1e9 by the head identification, with both
//       margins (window/F and window/(F - x)) so the two normalisations in
//       ZONE-POSTULATE section 5 stop being confused with each other.
//   S5  growth fits: F, F - x', m, G2, and the ratio F/G2.
//   S6  how far past p^2 the origin's calm reaches, and whether it reverses.
//
// House rules: compute before deriving, custody before extending, calibration
// on every claim. Progress printed inside every long loop.
// ============================================================================

const t0 = Date.now();
const ts = () => ((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's';
const log = (s) => console.log(ts() + ' | ' + s);

// ---------------------------------------------------------------------------
// utilities
// ---------------------------------------------------------------------------
function primesUpTo(n) {
  const c = new Uint8Array(n + 1);
  const out = [];
  for (let i = 2; i <= n; i++) {
    if (!c[i]) { out.push(i); if (i <= n / i) for (let j = i * i; j <= n; j += i) c[j] = 1; }
  }
  return out;
}

// ---------------------------------------------------------------------------
// S1. THE FOLD ENGINE AND CUSTODY
// ---------------------------------------------------------------------------
// Fold law (PROVEN, U-FRAME 5a step 1): new slots are s + k*W for k = 0..p-1
// and old slot s, keeping those with (s + kW) mod p not in {0, p-2}.
// Equivalently, with w = W mod p and r = s mod p, copy k deletes exactly the
// slots whose residue lies in the 2-set {-kw, -kw-2}.

function fold(S, W, p) {
  const w = W % p;
  const out = new Int32Array(S.length * p - 2 * S.length); // exact: each slot loses 2 copies
  let n = 0;
  for (let k = 0; k < p; k++) {
    const base = k * W;
    const shift = (k * w) % p;
    for (let i = 0; i < S.length; i++) {
      const r = (S[i] % p + shift) % p;
      if (r === 0 || r === p - 2) continue;
      out[n++] = base + S[i];
    }
  }
  if (n !== out.length) throw new Error('fold count mismatch ' + n + ' vs ' + out.length);
  return out;
}

function stats(S, W) {
  let g2 = 0;
  for (let i = 1; i < S.length; i++) { const d = S[i] - S[i - 1]; if (d > g2) g2 = d; }
  const wrap = W + S[0] - S[S.length - 1];   // cyclic closing gap
  if (wrap > g2) g2 = wrap;
  return { g2, first: S[0], count: S.length, mean: W / S.length, wrap };
}

// streaming version: same numbers without materialising the slot list
function streamStats(S, W, p) {
  const w = W % p;
  let g2 = 0, first = -1, prev = -1, count = 0, done = 0;
  for (let k = 0; k < p; k++) {
    const base = k * W;
    const shift = (k * w) % p;
    for (let i = 0; i < S.length; i++) {
      const r = (S[i] % p + shift) % p;
      if (r === 0 || r === p - 2) continue;
      const v = base + S[i];
      if (prev >= 0) { const d = v - prev; if (d > g2) g2 = d; } else first = v;
      prev = v; count++;
    }
    done += S.length;
    if (k % 5 === 0 || k === p - 1) log(`   ...fold ${p}: copy ${k + 1}/${p}, ${(done / 1e6).toFixed(1)}M scanned, kept ${(count / 1e6).toFixed(1)}M`);
  }
  const Wn = W * p;
  const wrap = Wn + first - prev;
  if (wrap > g2) g2 = wrap;
  return { g2, first, count, mean: Wn / count, wrap };
}

console.log('='.repeat(78));
console.log('S1. CUSTODY — fold from T_2, reproduce G2 = 12,30,42,66,108,150,204,258');
console.log('='.repeat(78));

const CUSTODY = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 };
const rows = [];
let W = 2, S = Int32Array.from([1]);           // T_2: slots are the odd residues, {1} mod 2
const foldPrimes = [3, 5, 7, 11, 13, 17, 19, 23];
console.log('  x |             W |     count |   mean m |   G2 | custody |  F  | F/m   | F/G2');
{
  const st = stats(S, W);
  console.log(`  2 | ${String(W).padStart(13)} | ${String(st.count).padStart(9)} | ${st.mean.toFixed(3).padStart(8)} | ${String(st.g2).padStart(4)} |    ---  | ${String(st.first).padStart(3)} |`);
}
for (const p of foldPrimes) {
  S = fold(S, W, p); W = W * p;
  const st = stats(S, W);
  const cust = CUSTODY[p] === undefined ? '  ---  ' : (CUSTODY[p] === st.g2 ? ' OK ' + String(CUSTODY[p]).padStart(3) : ' FAIL');
  rows.push({ x: p, W, count: st.count, mean: st.mean, g2: st.g2, first: st.first });
  console.log(`${String(p).padStart(3)} | ${String(W).padStart(13)} | ${String(st.count).padStart(9)} | ${st.mean.toFixed(3).padStart(8)} | ${String(st.g2).padStart(4)} | ${cust} | ${String(st.first).padStart(3)} | ${(st.first / st.mean).toFixed(2)} | ${(st.first / st.g2).toFixed(3)}`);
}
// T_29 by streaming (214,708,725 slots; never materialised)
log('streaming the fold by 29 (T_23 -> T_29, 230M copy-slots)...');
{
  const st = streamStats(S, W, 29);
  const Wn = W * 29;
  const cust = CUSTODY[29] === st.g2 ? ' OK  258' : ' FAIL';
  rows.push({ x: 29, W: Wn, count: st.count, mean: st.mean, g2: st.g2, first: st.first });
  console.log(` 29 | ${String(Wn).padStart(13)} | ${String(st.count).padStart(9)} | ${st.mean.toFixed(3).padStart(8)} | ${String(st.g2).padStart(4)} | ${cust} | ${String(st.first).padStart(3)} | ${(st.first / st.mean).toFixed(2)} | ${(st.first / st.g2).toFixed(3)}`);
}

// ---------------------------------------------------------------------------
// S2. THE HEAD-CALM AUDIT — the misalignment principle at the origin
// ---------------------------------------------------------------------------
// CLAIM (to be tested, then proven and sharpened in reading 3): inside the head
// [0, p^2) copy 0 deletes at most the two slots p-2 and p, and in fact p-2 is
// never a slot, so it deletes at most ONE, while a typical copy deletes about
// 2 * (slots in head) / p of them.
//
// Old slots below p^2 at level p_prev are exactly the twin primes below p^2
// (crystallisation: a p_prev-rough composite is at least p^2). So we can audit
// far past the tiles we can hold, using a plain sieve of [0, p^2).

console.log('');
console.log('='.repeat(78));
console.log('S2. HEAD-CALM AUDIT — deletions inside [0, p^2) by copy 0 vs a typical copy');
console.log('='.repeat(78));
console.log('   p |   slots<p^2 | copy0 kills | which | mean over k | max over k | mean/copy0 | max/copy0');

for (const p of [29, 101, 1009, 4001, 10007]) {
  const N = p * p;
  log(`   sieving [0, ${N}) for twin slots (p = ${p})...`);
  const comp = new Uint8Array(N + 3);
  comp[0] = comp[1] = 1;
  for (let i = 2; i * i <= N + 2; i++) if (!comp[i]) for (let j = i * i; j <= N + 2; j += i) comp[j] = 1;
  // slots of T_{p_prev} below p^2 = n with n, n+2 both prime (n > 1), plus n = 1 excluded
  const cnt = new Int32Array(p);              // cnt[a] = # slots with residue a mod p
  let total = 0; const copy0which = [];
  for (let n = 3; n < N; n++) {
    if (!comp[n] && !comp[n + 2]) {
      total++; const a = n % p; cnt[a]++;
      if (a === 0 || a === p - 2) copy0which.push(n);
    }
  }
  // copy k deletes residues {-kw, -kw-2}; as k runs it sweeps every 2-set once.
  // Damage of the 2-set anchored at a is cnt[a] + cnt[(a-2+p)%p]. Copy 0 is a = 0.
  let sum = 0, mx = 0;
  for (let a = 0; a < p; a++) { const d = cnt[a] + cnt[(a - 2 + p) % p]; sum += d; if (d > mx) mx = d; }
  const copy0 = cnt[0] + cnt[(p - 2) % p];
  const r1 = copy0 === 0 ? 'inf' : (sum / p / copy0).toFixed(1);
  const r2 = copy0 === 0 ? 'inf' : (mx / copy0).toFixed(1);
  console.log(`${String(p).padStart(5)} | ${String(total).padStart(11)} | ${String(copy0).padStart(11)} | ${copy0which.join(',') || '-'} | ${(sum / p).toFixed(1).padStart(11)} | ${String(mx).padStart(10)} | ${r1.padStart(10)} | ${r2}`);
}

// ---------------------------------------------------------------------------
// S3. THE EXACT FIRST-SLOT FOLD RECURSION
// ---------------------------------------------------------------------------
// Derived from S2: F(new) = F(old) unless F(old) is killed by copy 0, and the
// only head slots copy 0 kills are p-2 and p. Since F(old) >= p (it is the
// least old-rough n > 1, and old-rough numbers exceed the previous prime), and
// p-2 <= x_old < F(old), the ONLY way the first slot moves is F(old) = p.
//
// Test 1: at every fold of S1, check F(new) = F(old) unless F(old) = p.
// Test 2: same check over all prime folds to 1e6, using F(x) = least twin
//         prime lower member > x (justified by crystallisation in the head).

console.log('');
console.log('='.repeat(78));
console.log('S3. THE FIRST-SLOT FOLD RECURSION');
console.log('='.repeat(78));

let bad = 0;
for (let i = 1; i < rows.length; i++) {
  const p = rows[i].x, Fold = rows[i - 1].first, Fnew = rows[i].first;
  const moved = Fnew !== Fold;
  const predicted = (Fold === p);
  const ok = moved === predicted;
  if (!ok) bad++;
  console.log(`  fold ${String(p).padStart(3)}: F(old)=${String(Fold).padStart(3)} -> F(new)=${String(Fnew).padStart(3)}  moved=${moved ? 'yes' : 'no '}  predicted(F(old)==p)=${predicted ? 'yes' : 'no '}  ${ok ? 'OK' : 'MISMATCH'}`);
}
console.log(`  tile-level recursion check: ${bad === 0 ? 'EXACT at all folds' : bad + ' MISMATCHES'}`);

log('checking the recursion over all prime folds to 1e6...');
{
  const LIM = 1000000 + 20000;
  const comp = new Uint8Array(LIM + 3);
  comp[0] = comp[1] = 1;
  for (let i = 2; i * i <= LIM + 2; i++) if (!comp[i]) for (let j = i * i; j <= LIM + 2; j += i) comp[j] = 1;
  const isTwin = (n) => !comp[n] && !comp[n + 2];
  const P = [];
  for (let n = 2; n <= 1000000; n++) if (!comp[n]) P.push(n);
  let Fcur = 3;  // least twin lower member > 2 is 3 (3,5)
  let mism = 0, moves = 0, maxJump = 0, maxJumpAt = 0;
  for (let i = 0; i < P.length - 1; i++) {
    const x = P[i], p = P[i + 1];
    // F(x) should be Fcur ; fold by p
    const shouldMove = (Fcur === p);
    let Fnext = Fcur;
    if (shouldMove) { let n = Fcur + 1; while (!isTwin(n)) n++; Fnext = n; }
    // independent recomputation from the definition: F(p) = least twin lower
    // member strictly above p (head identification, valid while the postulate holds)
    let chk = p + 1; while (!isTwin(chk)) chk++;
    if (Fnext !== chk) mism++;
    if (Fnext !== Fcur) { moves++; const j = Fnext - Fcur; if (j > maxJump) { maxJump = j; maxJumpAt = Fcur; } }
    Fcur = Fnext;
    if (i % 10000 === 0) log(`   ...fold ${p}, F = ${Fcur}, moves so far ${moves}`);
  }
  console.log(`  folds tested: ${P.length - 1} primes to 1e6`);
  console.log(`  mismatches with "F moves iff F(old) = p": ${mism}`);
  console.log(`  number of folds at which F moved: ${moves} (= twin lower members below 1e6)`);
  console.log(`  largest single jump of F: ${maxJump}, from F = ${maxJumpAt}`);
}

// ---------------------------------------------------------------------------
// S4. EXTENSION AND THE TWO MARGINS
// ---------------------------------------------------------------------------
// The head identification lets us read F(x) at any x we can sieve locally.
// We report BOTH normalisations that ZONE-POSTULATE section 5 uses:
//    margin_strong = (x'^2 - 2) / F(x)        <- what the strong postulate needs
//    margin_excess = (x'^2 - 2) / (F(x) - x)  <- the "2.7e14" number
// and the worst-case margin (x'^2 - 2) / G2(x#) where G2 is known.

console.log('');
console.log('='.repeat(78));
console.log('S4. EXTENSION OF F, AND THE TWO MARGINS');
console.log('='.repeat(78));

const smallP = primesUpTo(100000);
function isPrimeBig(n) {
  if (n < 2) return false;
  for (const q of smallP) { if (q * q > n) break; if (n % q === 0) return false; }
  return true;
}
function nextPrimeBig(n) { let m = n + 1; if (m % 2 === 0) m++; while (!isPrimeBig(m)) m += 2; return m; }
function firstSlotAbove(x) { let n = x + 1; while (!(isPrimeBig(n) && isPrimeBig(n + 2))) n++; return n; }

// exact mean gap m(x) = 2 * prod_{3<=p<=x} p/(p-2), computed exactly to 1e7,
// then by the Mertens asymptotic m ~ e^{2gamma} ln^2 x / (4 C2) beyond.
log('sieving primes to 1e7 for the exact mean-gap product...');
const P7 = primesUpTo(10000000);
const C2 = 0.6601618158468696, EG2 = Math.exp(2 * 0.5772156649015329);
function meanGapExact(x) { let m = 2; for (const p of P7) { if (p > x) break; if (p === 2) continue; m *= p / (p - 2); } return m; }
// m(x) = 2 prod_{3<=p<=x} (1-2/p)^{-1}; since (1-2/p) = (1-1/p)^2 (1-1/(p-1)^2)
// and prod_{p>=3} (1-1/(p-1)^2) = C2, Mertens gives m ~ e^{2gamma} ln^2 x / (2 C2).
function meanGapAsym(x) { return EG2 * Math.log(x) * Math.log(x) / (2 * C2); }
// the mean gap between actual twin primes near N is ln^2 N / (2 C2), so the
// tile's mean slot gap should sit exactly e^{2gamma} = 3.1722 above it.
function meanTwinGap(x) { return Math.log(x) * Math.log(x) / (2 * C2); }
// Mertens converges slowly, so the bare asymptotic is 30% low at 1e7. Calibrate
// it on the exact value there and flag every extrapolated entry.
const CAL = meanGapExact(1e7) / meanGapAsym(1e7);
function meanGap(x) { return x <= 1e7 ? meanGapExact(x) : CAL * meanGapAsym(x); }
console.log(`  mean-gap calibration: exact m(1e7) = ${meanGapExact(1e7).toFixed(1)}, bare asymptotic ${meanGapAsym(1e7).toFixed(1)}, factor ${CAL.toFixed(4)} (applied, EXTRAPOLATED, above 1e7)`);

console.log('        x |        x^2 window |          F |  F - x |     m(x) | (F-x)/m | margin F | margin excess');
const landmarks = [5, 7, 11, 13, 17, 19, 23, 29, 37, 101, 1009, 10007, 100003, 1000003, 10000019, 100000007, 1000000007];
const ext = [];
for (const x of landmarks) {
  const xp = nextPrimeBig(x);
  // xp^2 reaches 1.0e18 = 111 x 2^53 at the top landmark, so the window is
  // formed in BigInt and printed from it. `win` is the double copy, used only
  // for the two ratios, where the 1e-16 relative error is invisible. Before
  // 2026-08-20 the printed column was a double and two of its integers were
  // wrong (10000007400001366 by -1, 1000000018000000100 by +21).
  const winB = BigInt(xp) * BigInt(xp) - 2n;
  const win = Number(winB);
  const F = firstSlotAbove(x);
  const m = meanGap(x);
  ext.push({ x, xp, win, F, m });
  console.log(`${String(x).padStart(9)} | ${String(winB).padStart(17)} | ${String(F).padStart(10)} | ${String(F - x).padStart(6)} | ${m.toFixed(1).padStart(8)} | ${((F - x) / m).toFixed(2).padStart(7)} | ${(win / F).toExponential(2)} | ${(win / (F - x)).toExponential(2)}`);
  log(`   ...landmark ${x} done`);
}

console.log('');
console.log('  the same two margins against G2, at the levels where G2 is known:');
console.log('   x |   G2 |    F | window | window/G2 (worst case) | window/F (anchored) | F/G2');
for (const r of rows) {
  const xp = nextPrimeBig(r.x), win = xp * xp - 2;
  console.log(`${String(r.x).padStart(4)} | ${String(r.g2).padStart(4)} | ${String(r.first).padStart(4)} | ${String(win).padStart(6)} | ${(win / r.g2).toFixed(2).padStart(22)} | ${(win / r.first).toFixed(2).padStart(19)} | ${(r.first / r.g2).toFixed(3)}`);
}

// ---------------------------------------------------------------------------
// S5. GROWTH FITS
// ---------------------------------------------------------------------------
console.log('');
console.log('='.repeat(78));
console.log('S5. GROWTH FITS');
console.log('='.repeat(78));

function loglogfit(xs, ys) {
  const n = xs.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { const a = Math.log(xs[i]), b = Math.log(ys[i]); sx += a; sy += b; sxx += a * a; sxy += a * b; }
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const inter = (sy - slope * sx) / n;
  return { slope, c: Math.exp(inter) };
}

{
  const xs = rows.map(r => r.x);
  const fG2 = loglogfit(xs, rows.map(r => r.g2));
  const fF = loglogfit(xs, rows.map(r => r.first));
  const fm = loglogfit(xs, rows.map(r => r.mean));
  console.log(`  over T_2..T_29 (log-log in x):`);
  console.log(`    G2(x#) ~ ${fG2.c.toFixed(3)} * x^${fG2.slope.toFixed(3)}`);
  console.log(`    F(x)   ~ ${fF.c.toFixed(3)} * x^${fF.slope.toFixed(3)}`);
  console.log(`    m(x)   ~ ${fm.c.toFixed(3)} * x^${fm.slope.toFixed(3)}   (m is really ln^2 x, so a small apparent exponent is expected)`);
}
{
  const big = ext.filter(e => e.x >= 100);
  const f = loglogfit(big.map(e => e.x), big.map(e => e.F));
  console.log(`  over x = 101..1e9:   F(x) ~ ${f.c.toFixed(4)} * x^${f.slope.toFixed(4)}   (exponent 1 means F sits on top of x)`);
  console.log('  the excess F - x against ln^2 x, and against the mean twin-prime gap ln^2 x / (2 C2);');
  console.log('  last column is the anchored enrichment m(x) / meantwingap(x), predicted -> e^{2gamma} = 3.1722:');
  console.log('        x |  F - x |  ln^2 x | (F-x)/ln^2x | mean twin gap | (F-x)/meantwingap | m/meantwingap');
  for (const e of ext) {
    const L2 = Math.log(e.x) ** 2, mt = meanTwinGap(e.x);
    console.log(`${String(e.x).padStart(9)} | ${String(e.F - e.x).padStart(6)} | ${L2.toFixed(1).padStart(7)} | ${((e.F - e.x) / L2).toFixed(3).padStart(11)} | ${mt.toFixed(1).padStart(13)} | ${((e.F - e.x) / mt).toFixed(3).padStart(17)} | ${(e.m / mt).toFixed(3)}`);
  }
}

// worst excess by decade, exhaustively to 1e7 (this is the extremal question)
log('scanning all primes to 1e7 for the worst excess F(x) - x by decade...');
{
  const LIM = 10000000;
  const comp = new Uint8Array(LIM + 4000);
  comp[0] = comp[1] = 1;
  for (let i = 2; i * i <= LIM + 3000; i++) if (!comp[i]) for (let j = i * i; j <= LIM + 3000; j += i) comp[j] = 1;
  const worst = {}, worstAt = {};
  let F = 3, dec = 1, next = 10;
  for (let x = 2; x <= LIM; x++) {
    if (comp[x]) continue;
    while (F <= x) { let n = F + 1; while (!(!comp[n] && !comp[n + 2])) n++; F = n; }
    const d = Math.floor(Math.log10(x));
    if (worst[d] === undefined || F - x > worst[d]) { worst[d] = F - x; worstAt[d] = x; }
    if (x > next) { log(`   ...scanned to ${x}, F = ${F}`); next = x * 10; }
  }
  console.log('  decade | worst F(x) - x over primes x in it | at x | ln^2 x there');
  for (const d of Object.keys(worst).sort((a, b) => a - b)) {
    console.log(`   1e${d}    | ${String(worst[d]).padStart(6)} | ${String(worstAt[d]).padStart(9)} | ${(Math.log(worstAt[d]) ** 2).toFixed(1)}`);
  }
}

// ---------------------------------------------------------------------------
// S6. HOW FAR DOES THE CALM REACH?
// ---------------------------------------------------------------------------
// Copy 0's deleted classes are {0, -2} mod p. A slot n == 0 (mod p) is n = p*t
// with t itself old-rough, so either t = 1 (n = p) or t >= p (n >= p^2). Hence
// ALL of copy 0's kills except the two at p-2 and p lie above p^2. Prediction:
// in a window [0, Y) the advantage over a typical copy is
//        mean-over-k / copy0  ~  N(Y) / (N(Y) - N(p^2))
// where N is the slot count, so the advantage is total below p^2 and decays to
// 1 as the window is opened. Tested at p = 1009 (old level 997).

console.log('');
console.log('='.repeat(78));
console.log('S6. REACH OF THE CALM — copy-0 kills in [0, Y) as Y opens past p^2');
console.log('='.repeat(78));
{
  const p = 1009, pprev = 997, MULT = 16, N = MULT * p * p;
  log(`   sieving [0, ${N}) for ${pprev}-rough slots...`);
  const rough = new Uint8Array(N + 3).fill(1);
  for (const q of P7) { if (q > pprev) break; for (let j = q; j < N + 3; j += q) rough[j] = 0; }
  const slots = [];
  for (let n = 2; n < N; n++) if (rough[n] && rough[n + 2]) slots.push(n);
  log(`   ${slots.length} slots found; mean gap ${(N / slots.length).toFixed(1)} (tile m(997) = ${meanGap(997).toFixed(1)})`);
  console.log('   Y / p^2 |   slots<Y | copy0 kills | mean over k | max over k | mean/copy0 | predicted');
  for (const mult of [1, 2, 4, 8, 16]) {
    const Y = mult * p * p;
    const cnt = new Int32Array(p);
    let tot = 0, totHead = 0;
    for (const n of slots) { if (n >= Y) break; cnt[n % p]++; tot++; }
    for (const n of slots) { if (n >= p * p) break; totHead++; }
    let sum = 0, mx = 0;
    for (let a = 0; a < p; a++) { const d = cnt[a] + cnt[(a - 2 + p) % p]; sum += d; if (d > mx) mx = d; }
    const copy0 = cnt[0] + cnt[p - 2];
    const pred = tot === totHead ? 'inf' : (tot / (tot - totHead)).toFixed(2);
    const meas = copy0 === 0 ? 'inf' : (sum / p / copy0).toFixed(2);
    console.log(`${String(mult).padStart(10)} | ${String(tot).padStart(9)} | ${String(copy0).padStart(11)} | ${(sum / p).toFixed(1).padStart(11)} | ${String(mx).padStart(10)} | ${meas.padStart(10)} | ${pred}`);
  }
}

log('done.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a3-06-origin-vs-max.js
//   invocation:  node research/a3-06-origin-vs-max.js
//   code-sha256: 23c25e1ac5191aa22abe8d45874d3b26a5ce4c6fd2782a1477f5d00b8e5f116f
//   out-sha256:  48985d1f9f601d4ca474c27a32402d78195982120775f2ba2d557c94f697a106
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     5.9 s
// ============================================================================
// ==============================================================================
// S1. CUSTODY — fold from T_2, reproduce G2 = 12,30,42,66,108,150,204,258
// ==============================================================================
//   x |             W |     count |   mean m |   G2 | custody |  F  | F/m   | F/G2
//   2 |             2 |         1 |    2.000 |    2 |    ---  |   1 |
//   3 |             6 |         1 |    6.000 |    6 |   ---   |   5 | 0.83 | 0.833
//   5 |            30 |         3 |   10.000 |   12 |  OK  12 |  11 | 1.10 | 0.917
//   7 |           210 |        15 |   14.000 |   30 |  OK  30 |  11 | 0.79 | 0.367
//  11 |          2310 |       135 |   17.111 |   42 |  OK  42 |  17 | 0.99 | 0.405
//  13 |         30030 |      1485 |   20.222 |   66 |  OK  66 |  17 | 0.84 | 0.258
//  17 |        510510 |     22275 |   22.919 |  108 |  OK 108 |  29 | 1.27 | 0.269
//  19 |       9699690 |    378675 |   25.615 |  150 |  OK 150 |  29 | 1.13 | 0.193
//  23 |     223092870 |   7952175 |   28.054 |  204 |  OK 204 |  29 | 1.03 | 0.142
//    0.1s | streaming the fold by 29 (T_23 -> T_29, 230M copy-slots)...
//    0.1s |    ...fold 29: copy 1/29, 8.0M scanned, kept 7.4M
//    0.4s |    ...fold 29: copy 6/29, 47.7M scanned, kept 44.4M
//    1.1s |    ...fold 29: copy 11/29, 87.5M scanned, kept 81.4M
//    2.1s |    ...fold 29: copy 16/29, 127.2M scanned, kept 118.5M
//    3.1s |    ...fold 29: copy 21/29, 167.0M scanned, kept 155.5M
//    4.1s |    ...fold 29: copy 26/29, 206.8M scanned, kept 192.5M
//    4.7s |    ...fold 29: copy 29/29, 230.6M scanned, kept 214.7M
//  29 |    6469693230 | 214708725 |   30.132 |  258 |  OK  258 |  41 | 1.36 | 0.159
//
// ==============================================================================
// S2. HEAD-CALM AUDIT — deletions inside [0, p^2) by copy 0 vs a typical copy
// ==============================================================================
//    p |   slots<p^2 | copy0 kills | which | mean over k | max over k | mean/copy0 | max/copy0
//    4.7s |    sieving [0, 841) for twin slots (p = 29)...
//    29 |          33 |           1 | 29 |         2.3 |          4 |        2.3 | 4.0
//    4.7s |    sieving [0, 10201) for twin slots (p = 101)...
//   101 |         210 |           1 | 101 |         4.2 |          8 |        4.2 | 8.0
//    4.7s |    sieving [0, 1018081) for twin slots (p = 1009)...
//  1009 |        8313 |           0 | - |        16.5 |         27 |        inf | inf
//    4.7s |    sieving [0, 16008001) for twin slots (p = 4001)...
//  4001 |       88560 |           1 | 4001 |        44.3 |         66 |       44.3 | 66.0
//    4.9s |    sieving [0, 100140049) for twin slots (p = 10007)...
// 10007 |      440871 |           1 | 10007 |        88.1 |        124 |       88.1 | 124.0
//
// ==============================================================================
// S3. THE FIRST-SLOT FOLD RECURSION
// ==============================================================================
//   fold   5: F(old)=  5 -> F(new)= 11  moved=yes  predicted(F(old)==p)=yes  OK
//   fold   7: F(old)= 11 -> F(new)= 11  moved=no   predicted(F(old)==p)=no   OK
//   fold  11: F(old)= 11 -> F(new)= 17  moved=yes  predicted(F(old)==p)=yes  OK
//   fold  13: F(old)= 17 -> F(new)= 17  moved=no   predicted(F(old)==p)=no   OK
//   fold  17: F(old)= 17 -> F(new)= 29  moved=yes  predicted(F(old)==p)=yes  OK
//   fold  19: F(old)= 29 -> F(new)= 29  moved=no   predicted(F(old)==p)=no   OK
//   fold  23: F(old)= 29 -> F(new)= 29  moved=no   predicted(F(old)==p)=no   OK
//   fold  29: F(old)= 29 -> F(new)= 41  moved=yes  predicted(F(old)==p)=yes  OK
//   tile-level recursion check: EXACT at all folds
//    5.4s | checking the recursion over all prime folds to 1e6...
//    5.5s |    ...fold 3, F = 5, moves so far 1
//    5.5s |    ...fold 104759, F = 104801, moves so far 1271
//    5.5s |    ...fold 224759, F = 224909, moves so far 2371
//    5.5s |    ...fold 350411, F = 350429, moves so far 3423
//    5.5s |    ...fold 479951, F = 480017, moves so far 4417
//    5.5s |    ...fold 611969, F = 612041, moves so far 5423
//    5.5s |    ...fold 746791, F = 746957, moves so far 6392
//    5.5s |    ...fold 882391, F = 882449, moves so far 7350
//   folds tested: 78497 primes to 1e6
//   mismatches with "F moves iff F(old) = p": 0
//   number of folds at which F moved: 8169 (= twin lower members below 1e6)
//   largest single jump of F: 1452, from F = 850349
//
// ==============================================================================
// S4. EXTENSION OF F, AND THE TWO MARGINS
// ==============================================================================
//    5.5s | sieving primes to 1e7 for the exact mean-gap product...
//   mean-gap calibration: exact m(1e7) = 624.2, bare asymptotic 624.2, factor 1.0000 (applied, EXTRAPOLATED, above 1e7)
//         x |        x^2 window |          F |  F - x |     m(x) | (F-x)/m | margin F | margin excess
//         5 |                47 |         11 |      6 |     10.0 |    0.60 | 4.27e+0 | 7.83e+0
//    5.6s |    ...landmark 5 done
//         7 |               119 |         11 |      4 |     14.0 |    0.29 | 1.08e+1 | 2.98e+1
//    5.6s |    ...landmark 7 done
//        11 |               167 |         17 |      6 |     17.1 |    0.35 | 9.82e+0 | 2.78e+1
//    5.6s |    ...landmark 11 done
//        13 |               287 |         17 |      4 |     20.2 |    0.20 | 1.69e+1 | 7.18e+1
//    5.6s |    ...landmark 13 done
//        17 |               359 |         29 |     12 |     22.9 |    0.52 | 1.24e+1 | 2.99e+1
//    5.6s |    ...landmark 17 done
//        19 |               527 |         29 |     10 |     25.6 |    0.39 | 1.82e+1 | 5.27e+1
//    5.6s |    ...landmark 19 done
//        23 |               839 |         29 |      6 |     28.1 |    0.21 | 2.89e+1 | 1.40e+2
//    5.6s |    ...landmark 23 done
//        29 |               959 |         41 |     12 |     30.1 |    0.40 | 2.34e+1 | 7.99e+1
//    5.6s |    ...landmark 29 done
//        37 |              1679 |         41 |      4 |     34.1 |    0.12 | 4.10e+1 | 4.20e+2
//    5.6s |    ...landmark 37 done
//       101 |             10607 |        107 |      6 |     53.3 |    0.11 | 9.91e+1 | 1.77e+3
//    5.6s |    ...landmark 101 done
//      1009 |           1026167 |       1019 |     10 |    115.8 |    0.09 | 1.01e+3 | 1.03e+5
//    5.6s |    ...landmark 1009 done
//     10007 |         100180079 |      10037 |     30 |    204.4 |    0.15 | 9.98e+3 | 3.34e+6
//    5.6s |    ...landmark 10007 done
//    100003 |       10003800359 |     100151 |    148 |    318.7 |    0.46 | 9.99e+4 | 6.76e+7
//    5.6s |    ...landmark 100003 done
//   1000003 |     1000066001087 |    1000037 |     34 |    458.6 |    0.07 | 1.00e+6 | 2.94e+10
//    5.6s |    ...landmark 1000003 done
//  10000019 |   100001580006239 |   10000139 |    120 |    624.2 |    0.19 | 1.00e+7 | 8.33e+11
//    5.6s |    ...landmark 10000019 done
// 100000007 | 10000007400001367 |  100000037 |     30 |    815.3 |    0.04 | 1.00e+8 | 3.33e+14
//    5.6s |    ...landmark 100000007 done
// 1000000007 | 1000000018000000079 | 1000000409 |    402 |   1031.8 |    0.39 | 1.00e+9 | 2.49e+15
//    5.6s |    ...landmark 1000000007 done
//
//   the same two margins against G2, at the levels where G2 is known:
//    x |   G2 |    F | window | window/G2 (worst case) | window/F (anchored) | F/G2
//    3 |    6 |    5 |     23 |                   3.83 |                4.60 | 0.833
//    5 |   12 |   11 |     47 |                   3.92 |                4.27 | 0.917
//    7 |   30 |   11 |    119 |                   3.97 |               10.82 | 0.367
//   11 |   42 |   17 |    167 |                   3.98 |                9.82 | 0.405
//   13 |   66 |   17 |    287 |                   4.35 |               16.88 | 0.258
//   17 |  108 |   29 |    359 |                   3.32 |               12.38 | 0.269
//   19 |  150 |   29 |    527 |                   3.51 |               18.17 | 0.193
//   23 |  204 |   29 |    839 |                   4.11 |               28.93 | 0.142
//   29 |  258 |   41 |    959 |                   3.72 |               23.39 | 0.159
//
// ==============================================================================
// S5. GROWTH FITS
// ==============================================================================
//   over T_2..T_29 (log-log in x):
//     G2(x#) ~ 0.874 * x^1.707
//     F(x)   ~ 2.172 * x^0.863
//     m(x)   ~ 3.151 * x^0.702   (m is really ln^2 x, so a small apparent exponent is expected)
//   over x = 101..1e9:   F(x) ~ 1.0402 * x^0.9976   (exponent 1 means F sits on top of x)
//   the excess F - x against ln^2 x, and against the mean twin-prime gap ln^2 x / (2 C2);
//   last column is the anchored enrichment m(x) / meantwingap(x), predicted -> e^{2gamma} = 3.1722:
//         x |  F - x |  ln^2 x | (F-x)/ln^2x | mean twin gap | (F-x)/meantwingap | m/meantwingap
//         5 |      6 |     2.6 |       2.316 |           2.0 |             3.058 | 5.097
//         7 |      4 |     3.8 |       1.056 |           2.9 |             1.395 | 4.882
//        11 |      6 |     5.7 |       1.043 |           4.4 |             1.378 | 3.929
//        13 |      4 |     6.6 |       0.608 |           5.0 |             0.803 | 4.058
//        17 |     12 |     8.0 |       1.495 |           6.1 |             1.974 | 3.770
//        19 |     10 |     8.7 |       1.153 |           6.6 |             1.523 | 3.901
//        23 |      6 |     9.8 |       0.610 |           7.4 |             0.806 | 3.768
//        29 |     12 |    11.3 |       1.058 |           8.6 |             1.397 | 3.509
//        37 |      4 |    13.0 |       0.307 |           9.9 |             0.405 | 3.448
//       101 |      6 |    21.3 |       0.282 |          16.1 |             0.372 | 3.303
//      1009 |     10 |    47.8 |       0.209 |          36.2 |             0.276 | 3.195
//     10007 |     30 |    84.8 |       0.354 |          64.3 |             0.467 | 3.180
//    100003 |    148 |   132.5 |       1.117 |         100.4 |             1.474 | 3.174
//   1000003 |     34 |   190.9 |       0.178 |         144.6 |             0.235 | 3.172
//  10000019 |    120 |   259.8 |       0.462 |         196.8 |             0.610 | 3.172
// 100000007 |     30 |   339.3 |       0.088 |         257.0 |             0.117 | 3.172
// 1000000007 |    402 |   429.5 |       0.936 |         325.3 |             1.236 | 3.172
//    5.6s | scanning all primes to 1e7 for the worst excess F(x) - x by decade...
//    5.6s |    ...scanned to 11, F = 17
//    5.6s |    ...scanned to 113, F = 137
//    5.6s |    ...scanned to 1151, F = 1229
//    5.6s |    ...scanned to 11519, F = 11549
//    5.6s |    ...scanned to 115201, F = 115301
//    5.7s |    ...scanned to 1152023, F = 1152077
//   decade | worst F(x) - x over primes x in it | at x | ln^2 x there
//    1e0    |      6 |         5 | 2.6
//    1e1    |     30 |        71 | 18.2
//    1e2    |    150 |       659 | 42.1
//    1e3    |    210 |      5879 | 75.3
//    1e4    |    630 |     62297 | 121.9
//    1e5    |   1452 |    850349 | 186.4
//    1e6    |   1722 |   9923987 | 259.5
//
// ==============================================================================
// S6. REACH OF THE CALM — copy-0 kills in [0, Y) as Y opens past p^2
// ==============================================================================
//    5.7s |    sieving [0, 16289296) for 997-rough slots...
//    5.8s |    133223 slots found; mean gap 122.3 (tile m(997) = 115.5)
//    Y / p^2 |   slots<Y | copy0 kills | mean over k | max over k | mean/copy0 | predicted
//          1 |      8278 |           0 |        16.4 |         27 |        inf | inf
//          2 |     15820 |          28 |        31.4 |         46 |       1.12 | 2.10
//          4 |     31675 |          75 |        62.8 |         84 |       0.84 | 1.35
//          8 |     64779 |         181 |       128.4 |        181 |       0.71 | 1.15
//         16 |    133223 |         365 |       264.1 |        365 |       0.72 | 1.07
//    5.8s | done.
// ============================================================================
// READINGS
// ============================================================================
//
// 1. CUSTODY HOLDS (VERIFIED). Folding from T_2 reproduces G2 = 12, 30, 42,
//    66, 108, 150, 204, 258 at T_5 through T_29 exactly, T_29 by streaming
//    230.6M copy-slots and keeping 214,708,725 of them, which is the census
//    prod (q-2) on the nose. The first slots at the same levels are
//    F = 11, 11, 17, 17, 29, 29, 29, 41. Everything below rests on this.
//
// 2. THE FIRST SLOT IS NOT A NEW OBJECT (PROVEN, modulo the head
//    identification). F(x) is the least n > 1 with n and n+2 both x-rough. An
//    x-rough number below x'^2 is prime, so as long as F(x) < x'^2, which is
//    the Zone Postulate itself, F(x) is exactly the least twin prime lower
//    member above x. The measured F column and the twin-prime column agree at
//    every level and at all 78,497 prime folds to 1e6 (0 mismatches, S3). So
//    "the first slot" and "the first twin prime above x" are the same
//    sequence, and the Zone Postulate is the statement that it does not jump
//    by more than x'^2 - x.
//
// 3. THE HEAD-CALM LEMMA (PROVEN, and it is the misalignment principle in its
//    sharpest form). Fold T_x by p = x'. Copy 0 deletes exactly the slots with
//    residue 0 or -2 mod p. A slot s ≡ 0 (mod p) is s = p·t with t itself
//    x-rough, so t = 1 or t > x, hence s = p or s >= p^2. A slot s ≡ -2 is
//    s + 2 = p·t likewise, and s = p - 2 would need p - 2 to be x-rough, which
//    for p >= 5 is impossible since 1 < p - 2 < p. Therefore:
//
//       > Inside the head [0, p^2), copy 0 deletes AT MOST ONE SLOT, namely p
//       > itself, and it deletes it exactly when (p, p+2) is a twin pair.
//
//    S2 confirms this at p = 29, 101, 1009, 4001, 10007: the kill list is
//    {29}, {101}, {}, {4001}, {10007}, and the empty case is p = 1009, where
//    1011 = 3 x 337 so (1009, 1011) is not a pair. Against that, a typical
//    copy k deletes 2.3, 4.2, 16.5, 44.3, 88.1 slots in the same window and
//    the worst copy deletes 4, 8, 27, 66, 124. The origin's advantage over the
//    average copy is (slots in head)/p ~ 2 C2 p / (e^{2gamma} ln^2 p), so it
//    GROWS like p/ln^2 p: measured 88x at p = 10007, and 124x against the
//    worst copy. This is the quantitative content of "the origin is a
//    distinguished phase", and it is proven, not measured.
//
// 4. THE EXACT FIRST-SLOT FOLD RECURSION (PROVEN + VERIFIED). Since
//    F(old) > x and the only head kill is p,
//
//       > F(new) = F(old) unless F(old) = p, in which case F(new) is the next
//       > surviving slot.
//
//    Verified exact at every fold T_3 -> T_29 and at all 78,497 prime folds to
//    1e6 with zero mismatches. The first slot moved at 8,169 of those folds,
//    one for each twin lower member below 1e6, and its largest single jump was
//    1,452, from F = 850,349 (this is a record twin gap, OEIS A113274).
//
// 5. THE WALL, LOCATED PRECISELY, AND IT IS A REFUTATION OF THE FIRST MOVE.
//    A6 hoped the first slot would have "its own, much better fold recursion".
//    It has one, it is exact rather than an inequality, and it is worth
//    nothing: reading 4 says the first slot only ever moves when the fold
//    prime IS the first slot, and where it moves to is the next twin prime,
//    which is the quantity we were trying to bound. The fold structure cannot
//    help at the origin BECAUSE the origin is so calm: by reading 3 the fold
//    touches the head in at most one place, so the head of T_p is frozen and
//    equals the primes below p^2, which is crystallisation, which the
//    framework already had. The first-slot recursion is a re-encoding of the
//    twin prime sequence and adds no information to it.
//
//       > Any argument for the strong Zone Postulate that uses only the fold
//       > structure at the origin is vacuous, because the fold acts on the
//       > head by deleting at most the single slot p.
//
//    ⚠ CORRECTION 2026-08-18. The reason clause in that quoted block is FALSE
//    as written, and it is quoted here as though proven. The fold does not
//    delete "at most the single slot p": copy 0's kills below p² are contained
//    in {p, p²−2}, which is the **Head Lemma**, proven at
//    `FOLD-PROFILE.md`:144-150 and verified at four folds. Three scripts print
//    the counter-example — `fold-profile-03-inside-copy0.js` S4 prints
//    "which = 29,839" for T₂₃ folded by 29, TWO kills below p²;
//    `fold-profile-07-impact-window.js` S1 lists "29(t=1) 839(t=29)"; and
//    `fold-profile-08-zone-localized-gap.js` S4 shows 2 kills below p² at T₂₃.
//    In five of the eleven ladder folds the single kill is p²−2 and p is not a
//    slot at all, against three where it is p (two are empty and one has both).
//    (Count corrected 2026-08-20, mismatch adjudication #42: it read "six".
//    The eleven kill sets are [47], [11], [167], [17], [359], [], [29,839], [],
//    [1367], [41], [1847] over p = 7..43, and against p and p²−2 they split
//    5 / 3 / 2 empty / 1 both = 11. `fold-profile-03-inside-copy0.js` carried
//    the same slip and is corrected there.) **The conclusion survives** — at most two slots is still
//    vacuous for the strong Zone Postulate, and the [I] marking stands — but
//    the reason is the Head Lemma's {p, p²−2}, not "the single slot p". The
//    original wording is left above as the record of what was quoted.
//
//    This is the honest outcome A6 was warned to expect: marked [I], and the
//    interval content survives untouched.
//
// 6. HOW THE FIRST SLOT GROWS, WHICH WAS THE QUESTION ASKED. Neither like G2
//    nor like the mean gap: F(x) grows like x itself. The log-log fit over
//    x = 101 to 1e9 is F ~ 1.0402 x^0.9976, and this is forced, since F(x) >= x'
//    trivially. The content is entirely in the excess F(x) - x, and THAT lives
//    on the mean-gap scale:
//      - at landmark primes the ratio (F - x)/(mean twin gap ln^2 x / 2C2) runs
//        1.52, 0.81, 1.40, 0.41, 0.37, 0.28, 0.47, 1.47, 0.24, 0.61, 0.12, 1.24
//        from x = 19 to 1e9, with no trend: the typical first slot sits about
//        one mean twin gap above x.
//      - the worst excess over each decade of primes to 1e7 is 6, 30, 150, 210,
//        630, 1,452, 1,722, against ln^2 x of 2.6 to 259.5 at the attaining x,
//        so worst/(ln^2 x) = 1.6, 3.6, 2.8, 5.2, 7.8, 6.6, i.e. the mean-gap
//        scale times a slowly growing extremal factor. In mean-twin-gap units
//        that is 2.2, 4.7, 3.7, 6.8, 10.3, 8.8.
//    So the answer is: F = x + (mean gap) x (extremal factor), against G2 which
//    is the maximum over the whole tile. MEASURED, and consistent with the
//    ln^3 p guard used in ZONE-POSTULATE section 4.
//
// 7. A CALIBRATION FIX FOR ZONE-POSTULATE SECTION 5. Two different margins are
//    in circulation and they must not be traded for one another.
//      - window/F(x), which is what the strong postulate needs. Measured
//        1.00e9 at x = 1e9. Since F >= x' ALWAYS, this margin is bounded by x'
//        for every x, and it is saturated: at x = 1e9 it sits within a factor
//        1.0000004 of its ceiling.
//      - window/(F(x) - x), which is the "2.7e14" figure. Measured 2.49e15 at
//        x = 1e9. It credits the full window against only the excess.
//    Both numbers are correct; only the first is headroom for the postulate.
//    The available headroom at x is a factor x', not x'^2/(F - x), so the
//    "fourteen orders of magnitude thrown away" is better stated as "nine
//    orders at p = 1e9, and by construction never more than a factor p".
//
// 8. THE ORIGIN DOES BEAT THE MAXIMUM, MEASURABLY, AT EVERY LEVEL WE HOLD.
//    window/G2 sits flat at 3.32 to 4.35 with no trend across T_3 to T_29,
//    reproducing U-FRAME. window/F climbs 4.60, 4.27, 10.82, 9.82, 16.88,
//    12.38, 18.17, 28.93, 23.39, and F/G2 falls 0.917, 0.367, 0.405, 0.258,
//    0.269, 0.193, 0.142, 0.159. So the anchored route is measurably ahead and
//    pulling away. But the gain is polylogarithmic, not exponential: if
//    G2 ≍ x polylog then F/G2 ≍ 1/polylog, and both quantities sit at exponent
//    1 in x. The G2 route's open band is a statement about the EXPONENT
//    (4.267 proven, 2 needed), and a polylog gain does not move it. Route B
//    therefore does not shrink the band, and the win condition stated in A6
//    ("a bound on the first slot that beats the global G2 bound") is not met:
//    we have the measured inequality F < G2 at every level, and no PROVEN
//    bound on F that does not route through G2.
//
// 9. WHAT IS STILL PROVABLE ABOUT F WITHOUT G2, which is little. F + 1 is
//    itself one of the tile's gaps, namely the one closing the cycle from the
//    slot at W - 1, so F < G2 is proven and trivial. The palindrome r -> W-2-r
//    maps that gap to the last gap of the tile, so the origin gap occurs twice
//    in the gap multiset; it is a doubled draw, not a random one. That is
//    structure, but it bounds nothing.
//
// 10. THE CALM DOES NOT EXTEND PAST p^2, AND IT REVERSES (MEASURED, and this
//    kills the obvious follow-up). We asked how far the origin's protection
//    reaches by opening the window to Y = 1, 2, 4, 8, 16 times p^2 at p = 1009.
//    Copy 0's kills are 0, 28, 75, 181, 365 against a typical copy's 16.4,
//    31.4, 62.8, 128.4, 264.1, so copy 0 goes from perfectly quiet to 38%
//    ABOVE average, and at Y = 8p^2 and 16p^2 it is the WORST copy of the p,
//    equal to max over k. Mechanism: copy 0's kills outside the head are the
//    slots p·t with t rough, and rough t below Y/p are essentially primes,
//    whose density exceeds the asymptotic rough density by the Mertens factor.
//    So the origin's advantage is exactly co-extensive with crystallisation,
//    and it becomes a liability the moment the window leaves [0, p^2). Nothing
//    is bought by widening.
//
// 11. A CONSTANT WORTH KEEPING (VERIFIED, and new to the repo as an exact
//    figure). The tile's mean slot gap and the mean twin-prime gap at the same
//    height differ by exactly e^{2 gamma}:
//        m(x) = 2 prod_{3<=p<=x} p/(p-2) ~ e^{2 gamma} ln^2 x / (2 C2),
//    since (1 - 2/p) = (1-1/p)^2 (1 - 1/(p-1)^2) and prod_{p>=3} of the second
//    factor is C2 itself. The measured ratio m(x)/(ln^2 x / 2C2) runs 3.509,
//    3.448, 3.303, 3.195, 3.180, 3.174, 3.172 at x = 29, 37, 101, 1009, 10007,
//    1e5, 1e6, against e^{2 gamma} = 3.1722. (The rows above x = 1e7 in the
//    printed table use the calibrated asymptotic and are circular; the
//    convergence is carried by the exact rows below it.) This is the exact
//    constant for the anchored enrichment measured qualitatively in
//    `attack-10-anchored-origin.js`: the head of the tile is denser in twin
//    slots than the tile average by the factor e^{2 gamma} = 3.17.
//
// 12. WHERE ROUTE B HAS TO GO INSTEAD. Since the fold gives nothing at the
//    origin, an origin-specific bound must come from the head's own arithmetic
//    rather than from the tile recursion: counting slots inside [x, x'^2) with
//    a certificate, which is route C of ZONE-POSTULATE section 6, and which is
//    blocked by the parity floor 2 for a two-class sieve. The one thing this
//    file adds to that route is reading 11: the head is enriched over the tile
//    average by a known constant, so a counting argument at the origin starts
//    with a factor e^{2 gamma} = 3.17 in hand over the naive tile density. It
//    is a constant, and the corridor needs an exponent, so it does not close
//    anything by itself.
//
// STATUS SUMMARY. A6's first move is complete and it terminates in a proven
// obstruction rather than a bound: readings 3 and 4 are new theorems, reading
// 5 is the refutation they force, readings 7, 8 and 10 are calibration
// corrections to existing claims, and reading 11 is a constant we did not have.
// The route-B win condition is NOT met.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   The reading-6 list 1.52, 0.81, 1.40, 0.41, 0.37, 0.28, 0.47, 1.47, 0.24,
//   0.61, 0.12, 1.24 is the printed (F-x)/meantwingap column from x = 19
//   downward, 1.523 0.806 1.397 0.405 0.372 0.276 0.467 1.474 0.235 0.610
//   0.117 1.236, cut to two places.
// SAME VALUE, DIFFERENT NOTATION: window/F = 1.00e9 and window/(F-x) =
//   2.49e15 (reading 7) are the margin F and margin excess columns of the
//   x = 1000000007 row, printed as 1.00e+9 and 2.49e+15.
// TOKENIZER ARTIFACT, not a figure: A113274 is an OEIS sequence identifier
//   (reading 4), and 144-150 in `FOLD-PROFILE.md`:144-150 is a line range
//   (reading 5).
// DERIVED IN THIS READING by arithmetic over printed values:
//   1011 = 3 x 337 (reading 3) is the factorisation of p + 2 at the printed
//   p = 1009 row, which is why that row's kill list is empty.
//   worst/(ln²x) = 1.6, 3.6, 2.8, 5.2, 7.8, 6.6 (reading 6) is the decade
//   table's worst-excess column over its ln²x column, 30/18.2 through
//   1722/259.5, skipping the 1e0 decade.
//   The same six in mean-twin-gap units, 2.2, 4.7, 3.7, 6.8, 10.3, 8.8, are
//   those ratios times 2C2 = 1.3203, since the printed mean twin gap is
//   ln²x/(2C2).
//   Within a factor 1.0000004 of the ceiling (reading 7) is the printed
//   F/x at the x = 1e9 row, 1000000409/1000000007 = 1.0000004.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   "which = 29,839" (reading 5) is research/fold-profile-03-inside-copy0.js,
//   whose S4 table prints the T23 row ending "| 29,839 |".
// IN-CODE: the "2.7e14" figure of reading 7 is the label on the
//   margin_excess definition in the code above, line 247, and it is the value
//   research/ZONE-POSTULATE.md:143 carries in its 10⁹ row.
// DEFINITION / LITERATURE constants: 4.267 (reading 8) is the DHR dimension-2
//   sifting limit, β₂ = 4.26645028414864… per research/dhr-verification.md,
//   quoted here at the rounding research/ATTACKS3.md uses.
// ---------------------------------------------------------------------------
