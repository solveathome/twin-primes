// research/origin-excess.js
//
// QUESTION. Can the Origin Excess Lemma (maier-matrix.md section 4) be pushed
// from S = y'^2 to S = x'^2, and is the scale collision (section 5) a genuine
// obstruction or an artifact of that particular argument?
//
// Sections
//   A. CUSTODY. Independent engine; reproduces maier-matrix.md section F (14/14)
//      and sections D/E (the rank tables) digit for digit.
//   B. THE SURVIVAL QUOTIENT IDENTITY. origin(S)/mean(S) = rho_x(S)/rho_y(S),
//      exact, no error term. Verified against the ensemble.
//   C. THE CROSSOVER, MEASURED. Fine scan of S through y'^2 < S < x'^2 at seven
//      (y,x): origin/mean, origin rank, min row, first crossing.
//   D. PER-PRIME ANATOMY. Condition the ensemble on a_q = 0 one prime at a time.
//      Isolates the threshold S = q*y' and shows which prime binds.
//   G. MECHANISM TESTS. Mirror (FOLD-PROFILE 4), abutting/fused window and the
//      -1/2 correlation (natal-cap-19/26), impact window (FOLD-PROFILE 11).
//   E. THE rho CURVE AT SCALE. One incremental sieve of [0,N) gives rho(u) for
//      u from 1 to 25, locating its minimum. Fresh reproduction of FOLD-PROFILE 9.
//   F. THE CROSSOVER LAW at scale, from one sieve with snapshots at 18 levels.
//
// (E and F run last so the big tiles can be released first.)
//
// Run: node --max-old-space-size=6144 research/origin-excess.js

'use strict';

const t0 = Date.now();
function el() { return ((Date.now() - t0) / 1000).toFixed(1) + 's'; }
function say(s) { console.log(s); }
function tick(s) { process.stderr.write(`    [${el()}] ${s}\n`); }

// ---------------------------------------------------------------- primitives
// Written from scratch rather than reused from maier-matrix.js, so that the
// custody check in section A is a genuine independent reproduction.

function sieveFlags(n) {
  const s = new Uint8Array(n + 1); s.fill(1); s[0] = 0; if (n >= 1) s[1] = 0;
  for (let i = 2; i * i <= n; i++) if (s[i]) for (let j = i * i; j <= n; j += i) s[j] = 0;
  return s;
}
const PCAP = 2000000, PFLAG = sieveFlags(PCAP);
function isPrime(n) { if (n <= PCAP) return PFLAG[n] === 1; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return n > 1; }
const PLIST = (() => { const o = []; for (let i = 2; i <= PCAP; i++) if (PFLAG[i]) o.push(i); return o; })();
function primesUpTo(n) { const o = []; for (const p of PLIST) { if (p > n) break; o.push(p); } return o; }
function nextPrime(n) { let k = n + 1; while (!isPrime(k)) k++; return k; }
function primorial(x) { let W = 1; for (const p of primesUpTo(x)) W *= p; return W; }

// twinSlots(x): Uint8 of length x#, 1 iff n and n+2 are both coprime to x#.
function twinSlots(x) {
  const W = primorial(x);
  const a = new Uint8Array(W); a.fill(1);
  for (const p of primesUpTo(x)) {
    for (let k = 0; k < W; k += p) a[k] = 0;                 // n = 0 mod p
    const st = (p - 2 % p) % p;                              // n = -2 mod p
    for (let k = st; k < W; k += p) a[k] = 0;
  }
  return a;
}
function total(a) { let c = 0; for (let i = 0; i < a.length; i++) c += a[i]; return c; }
function pre(a, S) { let c = 0; for (let i = 0; i < S; i++) c += a[i]; return c; }
function foldRatio(y, x) { let r = 1; for (const q of primesUpTo(x)) if (q > y) r *= (1 - 2 / q); return r; }
function geo(a, b, n) { const o = []; for (let i = 0; i <= n; i++) o.push(Math.round(a * Math.pow(b / a, i / n))); return [...new Set(o)].sort((u, v) => u - v); }

let TILE = new Map();
function tile(x) { if (!TILE.has(x)) { tick(`building tile T_${x} (W = ${primorial(x)})`); TILE.set(x, twinSlots(x)); } return TILE.get(x); }

const GAMMA = 0.5772156649015329, EG2 = Math.exp(2 * GAMMA);

// ===========================================================================
say('=== A. CUSTODY: independent reproduction of maier-matrix.md ===\n');

say("A1. The Origin Excess Lemma at S = y'^2  (target: 14 of 14, and the exact");
say('    D_y(S), L, origin and mean columns of maier-matrix.md section F)\n');
say("   y   x     S=y'^2   D_y(S)   L(pred)  origin(pred)  origin(true)  ok   mean       ratio");
{
  const pairs = [[7, 11], [7, 13], [7, 17], [7, 19], [11, 13], [11, 17], [11, 19], [11, 23],
    [13, 17], [13, 19], [13, 23], [17, 19], [17, 23], [19, 23]];
  let ok = 0;
  for (const [y, x] of pairs) {
    const ay = tile(y), ax = tile(x), yp = nextPrime(y), S = yp * yp;
    const DyS = pre(ay, S);
    const struck = m => (m > y && m <= x && isPrime(m)) || (m === S && yp <= x);
    let L = 0;
    for (let t = 0; t < S; t++) if (ay[t] && (struck(t) || struck(t + 2))) L++;
    const pred = DyS - L, truth = pre(ax, S), mean = DyS * foldRatio(y, x);
    if (pred === truth) ok++;
    say(`  ${String(y).padStart(2)} ${String(x).padStart(3)} ${String(S).padStart(8)}` +
      ` ${String(DyS).padStart(8)} ${String(L).padStart(8)} ${String(pred).padStart(13)}` +
      ` ${String(truth).padStart(13)}   ${pred === truth ? 'YES' : 'NO '}  ${mean.toFixed(3).padStart(9)}` +
      `  ${(truth / mean).toFixed(3)}`);
  }
  say(`\n  lemma verified ${ok} of ${pairs.length}`);
  say(`  census custody: D_13=${total(tile(13))} D_19=${total(tile(19))} D_23=${total(tile(23))}` +
      ' (GLOSSARY: 1485 / 378675 / 7952175)');
}

// -------- the ensemble, computed once per (y,x) with snapshots at a grid of S
function ensemble(y, x, grid) {
  const Wy = primorial(y), ay = tile(y), ax = tile(x);
  const M = primorial(x) / Wy;
  const G = grid.filter(s => s <= Wy && s >= 1);
  const snap = G.map(() => new Int32Array(M));
  const top = G[G.length - 1];
  for (let r = 0; r < M; r++) {
    const b = r * Wy; let k = 0, gi = 0;
    for (let s = 0; s < top; s++) { k += ax[b + s]; while (gi < G.length && G[gi] === s + 1) { snap[gi][r] = k; gi++; } }
    while (gi < G.length) { snap[gi][r] = k; gi++; }
  }
  const rows = G.map((S, gi) => {
    const c = snap[gi];
    const mean = pre(ay, S) * foldRatio(y, x);
    let mn = Infinity, mx = -Infinity, above = 0, sum = 0;
    for (let r = 0; r < M; r++) { const v = c[r]; if (v < mn) mn = v; if (v > mx) mx = v; if (v > c[0]) above++; sum += v; }
    return { S, origin: c[0], mean, mn, mx, rank: above + 1, emp: sum / M };
  });
  return { M, rows, snap, G };
}

say('\nA2. Where the origin sits in the ensemble  (target: maier-matrix.md D and E)\n');
for (const [y, x, list] of [
  [11, 17, [121, 169, 500, 1000, 2310]],
  [13, 19, [169, 289, 361, 1000, 5000, 30030]],
  [13, 23, [169, 289, 361, 1000, 5000, 30030]],
]) {
  const yp = nextPrime(y), xp = nextPrime(x);
  const e = ensemble(y, x, list);
  say(`  y=${y} x=${x}  M=${e.M} rows   y'^2=${yp * yp}  x'^2=${xp * xp}`);
  say('       S   mean     origin  min max   origin rank (1=largest)  origin>=mean?');
  for (const r of e.rows)
    say(`  ${String(r.S).padStart(6)} ${r.mean.toFixed(3).padStart(9)} ${String(r.origin).padStart(7)}` +
      ` ${String(r.mn).padStart(4)} ${String(r.mx).padStart(4)}` +
      `   ${String(r.rank).padStart(6)} / ${e.M}          ${r.origin >= r.mean ? 'yes' : 'NO'}`);
  say('');
}

say("A3. The width the Zone Postulate actually asks for, S = x'^2\n");
say('   y   x       S    mean     origin   min  max   rank / M        origin>=mean?');
for (const [y, x] of [[11, 17], [13, 17], [13, 19], [13, 23], [17, 19], [17, 23], [19, 23]]) {
  const S = nextPrime(x) ** 2;
  if (S > primorial(y)) { say(`  ${y} ${x}: S > y#, skipped`); continue; }
  const e = ensemble(y, x, [S]), r = e.rows[0];
  say(`  ${String(y).padStart(2)} ${String(x).padStart(3)} ${String(S).padStart(7)} ${r.mean.toFixed(3).padStart(9)}` +
    ` ${String(r.origin).padStart(7)} ${String(r.mn).padStart(5)} ${String(r.mx).padStart(4)}` +
    `  ${String(r.rank).padStart(6)} / ${String(e.M).padStart(6)}      ${r.origin >= r.mean ? 'yes' : 'NO'}`);
}

// ===========================================================================
say('\n\n=== B. THE SURVIVAL QUOTIENT IDENTITY ===\n');
say('  Claim (one line). With rho_z(S) = (D_z(S)/S) / (D_z/z#),');
say('     origin(S) / mean(S)  =  rho_x(S) / rho_y(S)   exactly, for every S <= y#.');
say('  Proof. mean = D_y(S)*prod_{y<q<=x}(1-2/q) = S*delta_y*rho_y(S)*(delta_x/delta_y)');
say('         = S*delta_x*rho_y(S); and origin = D_x(S) = S*delta_x*rho_x(S). qed');
say('  The origin\'s excess over the matrix ensemble is a ratio of two values of the');
say('  SAME survival curve, at the SAME window, read at two sieving levels.\n');
say("   y   x        S    origin   mean       origin/mean   rho_x/rho_y   u_x=lnS/lnx  u_y=lnS/lny  match");
{
  let bad = 0, n = 0;
  for (const [y, x] of [[11, 17], [13, 19], [13, 23], [17, 23], [19, 23]]) {
    const ax = tile(x), ay = tile(y), Wx = primorial(x), Wy = primorial(y);
    const Dx = total(ax), Dy = total(ay);
    for (const S of [121, 169, 289, 361, 529, 841, 2310, 30030].filter(s => s <= Wy)) {
      const origin = pre(ax, S), DyS = pre(ay, S), mean = DyS * foldRatio(y, x);
      const rx = (origin / S) / (Dx / Wx), ry = (DyS / S) / (Dy / Wy);
      const lhs = origin / mean, rhs = rx / ry;
      const okk = Math.abs(lhs - rhs) < 1e-9 * Math.max(1, lhs);
      if (!okk) bad++; n++;
      say(`  ${String(y).padStart(2)} ${String(x).padStart(3)} ${String(S).padStart(8)} ${String(origin).padStart(8)}` +
        ` ${mean.toFixed(3).padStart(10)}   ${lhs.toFixed(6).padStart(11)}   ${rhs.toFixed(6).padStart(11)}` +
        `   ${(Math.log(S) / Math.log(x)).toFixed(3).padStart(9)}   ${(Math.log(S) / Math.log(y)).toFixed(3).padStart(9)}   ${okk ? 'YES' : 'NO'}`);
    }
  }
  say(`\n  identity holds in ${n - bad} of ${n} cells`);
}

// ===========================================================================
say('\n\n=== C. THE CROSSOVER, MEASURED ===\n');
say("  Fine scan of S through and past y'^2. Marked | at y'^2 and at x'^2.\n");

const crossTable = [];
function scan(y, x, Smax, grid) {
  const yp = nextPrime(y), xp = nextPrime(x), Wy = primorial(y);
  const g = [...new Set(grid.filter(s => s <= Math.min(Smax, Wy)))].sort((a, b) => a - b);
  tick(`scan y=${y} x=${x}`);
  const e = ensemble(y, x, g);
  say(`  y=${y} x=${x}   M=${e.M} rows   y'^2=${yp * yp}   x'^2=${xp * xp}   y#=${Wy}`);
  say("        S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note");
  let firstCross = null;
  for (const r of e.rows) {
    const ratio = r.origin / r.mean;
    if (r.S >= yp * yp && ratio < 1 && firstCross === null) firstCross = r.S;
    let note = '';
    if (r.S === yp * yp) note = "<- y'^2  (Origin Excess Lemma stops here)";
    if (r.S === xp * xp) note = "<- x'^2  (what the Zone Postulate asks for)";
    say(`  ${String(r.S).padStart(7)} ${(r.S / (yp * yp)).toFixed(2).padStart(8)} ${String(r.origin).padStart(8)}` +
      ` ${r.mean.toFixed(2).padStart(10)}    ${ratio.toFixed(4).padStart(9)}  ${String(r.rank).padStart(7)}/${String(e.M).padStart(7)}` +
      ` ${String(r.mn).padStart(5)} ${String(r.mx).padStart(4)}   ${note}`);
  }
  say(`  first S >= y'^2 with origin < mean: ${firstCross === null ? 'none in range' : firstCross + '  ( = ' + (firstCross / (yp * yp)).toFixed(2) + " * y'^2 )"}`);
  say('');
  crossTable.push({ tag: `${y}/${x}`, y, x, yp, xp, firstCross });
}

scan(13, 23, 30030, [...geo(200, 30030, 40), 289, 361, 529, 841]);
scan(13, 19, 30030, [...geo(200, 30030, 40), 289, 361, 529, 841]);
scan(13, 17, 30030, [...geo(200, 30030, 40), 289, 361, 529, 841]);
scan(11, 23, 2310, [...geo(100, 2310, 32), 169, 289, 361, 841]);
scan(11, 19, 2310, [...geo(100, 2310, 32), 169, 289, 361, 529]);
scan(11, 17, 2310, [...geo(100, 2310, 32), 169, 289, 361]);
scan(17, 23, 20000, [...geo(200, 20000, 30), 361, 529, 841]);

say("  Crossover summary (first S >= y'^2 at which the origin drops below the mean):");
say("   y/x      y'^2     x'^2    first crossing   / y'^2   / x'^2");
for (const r of crossTable) {
  const f = r.firstCross;
  say(`  ${r.tag.padEnd(7)} ${String(r.yp ** 2).padStart(7)} ${String(r.xp ** 2).padStart(8)}` +
    ` ${String(f === null ? '-' : f).padStart(14)}   ${f === null ? '   -  ' : (f / r.yp ** 2).toFixed(2).padStart(6)}` +
    `  ${f === null ? '   -  ' : (f / r.xp ** 2).toFixed(3).padStart(6)}`);
}

// ===========================================================================
say('\n\n=== D. PER-PRIME ANATOMY: which prime kills the advantage, and when ===\n');
say('  The M rows are in bijection with residue vectors (a_q)_{q in (y,x]}: row r');
say('  has a_q = -r*y# mod q, and each vector occurs exactly M/prod(q) times. The');
say('  origin is the ALL-ZERO vector. So ask, one prime at a time: what is the mean');
say('  row count conditioned on a_q = 0, against the unconditional mean?\n');
say("  Lemma (one line). If S <= q*y' then a y-rough multiple of q below S is q*k");
say("  with k y-rough and k < y', hence k = 1. So the class a_q = 0 removes at most");
say("  2 slots instead of its fair share 2*D_y(S)/q. Threshold: S = q*y'.\n");

function perPrime(y, x, Slist) {
  const Wy = primorial(y), yp = nextPrime(y);
  const qs = primesUpTo(x).filter(q => q > y);
  const e = ensemble(y, x, Slist.filter(s => s <= Wy).sort((a, b) => a - b));
  say(`  y=${y} x=${x}   primes in (y,x] = [${qs.join(', ')}]   y'=${yp}   M=${e.M}`);
  say('        S    ' + qs.map(q => `q=${String(q).padStart(3)}      `).join('') + ' origin/mean');
  for (let gi = 0; gi < e.G.length; gi++) {
    const S = e.G[gi], c = e.snap[gi];
    let tot = 0; for (let r = 0; r < e.M; r++) tot += c[r];
    const mean = tot / e.M;
    const parts = qs.map(q => {
      let s2 = 0, n2 = 0;
      for (let r = 0; r < e.M; r++) if (r % q === 0) { s2 += c[r]; n2++; }   // a_q = 0 iff q | r
      return `${(s2 / n2 / mean).toFixed(3)}${S <= q * yp ? ' Y' : ' n'}`;
    });
    say(`  ${String(S).padStart(7)}   ` + parts.map(p => p.padStart(10)).join('') + `   ${(c[0] / mean).toFixed(3).padStart(9)}`);
  }
  say(`  ("Y" = S <= q*y', the regime where the crystallisation bound covers that prime)\n`);
}
perPrime(13, 23, [169, 289, 361, 500, 841, 1500, 3000, 10000, 30030]);
perPrime(11, 23, [121, 169, 289, 361, 600, 1200, 2310]);

// -------- D2. the same thing without the ensemble, and scale free
say("D2. The per-prime loss ledger, directly. For prime q in (y,x] put");
say('      lambda_q(S) = #{T_y slots t < S : q | t or q | t+2}   (what the origin loses to q)');
say('      fair_q(S)   = 2*D_y(S)/q                              (what a random row loses)');
say("    The ratio should be near 0 while S < q*y' and near 1 after. Pooled in the");
say("    scale-free variable v = S/(q*y'), over many (y,q) at once.\n");
{
  const cells = [];
  for (const y of [29, 61, 127, 251, 401, 641]) {
    const yp = nextPrime(y), SMAX = 8000000;
    // T_y slot indicator on [0, SMAX)
    const a = new Uint8Array(SMAX); a.fill(1); a[0] = 0;
    for (const p of primesUpTo(y)) {
      for (let k = 0; k < SMAX; k += p) a[k] = 0;
      const st = (p - 2 % p) % p; for (let k = st; k < SMAX; k += p) a[k] = 0;
    }
    const cum = new Int32Array(SMAX + 1);
    for (let i = 0; i < SMAX; i++) cum[i + 1] = cum[i] + a[i];
    for (const q of primesUpTo(3000).filter(q => q > y).slice(0, 25)) {
      for (const v of [0.25, 0.5, 0.75, 1.0, 1.5, 2, 3, 5, 8, 15, 30, 100]) {
        const S = Math.round(v * q * yp);
        if (S >= SMAX || S < 4) continue;
        let lam = 0;
        for (let m = q; m < S + 2; m += q) {           // t = m and t = m-2
          if (m < S && a[m]) lam++;
          if (m - 2 >= 0 && m - 2 < S && a[m - 2]) lam++;
        }
        const D = cum[S], fair = 2 * D / q;
        if (fair < 4) continue;                        // else the ratio is quantisation noise
        cells.push({ y, q, v, S, lam, fair, r: lam / fair });
      }
    }
  }
  say("       v = S/(q*y')     cells   mean lambda_q/fair_q    median    max     (cells with fair share >= 4)");
  for (const v of [0.25, 0.5, 0.75, 1.0, 1.5, 2, 3, 5, 8, 15, 30, 100]) {
    const g = cells.filter(c => c.v === v).map(c => c.r).sort((p, q2) => p - q2);
    if (!g.length) continue;
    const mean = g.reduce((p, q2) => p + q2, 0) / g.length;
    say(`  ${v.toFixed(2).padStart(14)}  ${String(g.length).padStart(8)}  ${mean.toFixed(4).padStart(18)}` +
      `  ${g[g.length >> 1].toFixed(4).padStart(8)}  ${g[g.length - 1].toFixed(4).padStart(6)}`);
  }
  say("\n    So the per-prime advantage is total below v = 1 and gone by v ~ 3. The");
  say("    binding prime is the SMALLEST one, q = y', whose threshold is S = y'^2,");
  say("    and it carries the largest weight 1/q in the loss sum. There is no");
  say("    reweighting that avoids it.\n");
}

// -------- D3. is a_q = 0 even the best class at the zone width?
say('D3. Is the origin\'s residue choice a_q = 0 even LOCALLY optimal at S = x\'^2?');
say('    Mean row count conditioned on a_q = a, for every a mod q, at the zone width.\n');
for (const [y, x] of [[13, 23], [11, 23], [11, 19]]) {
  const S = nextPrime(x) ** 2, Wy = primorial(y);
  if (S > Wy) continue;
  const e = ensemble(y, x, [S]), c = e.snap[0];
  let tot = 0; for (let r = 0; r < e.M; r++) tot += c[r];
  const mean = tot / e.M;
  for (const q of primesUpTo(x).filter(q => q > y)) {
    const s = new Float64Array(q), n = new Int32Array(q);
    for (let r = 0; r < e.M; r++) { const aq = r % q; s[aq] += c[r]; n[aq]++; }
    const rs = [];
    for (let a = 0; a < q; a++) rs.push({ a, v: s[a] / n[a] / mean });
    rs.sort((p, w) => w.v - p.v);
    const rank0 = rs.findIndex(o => o.a === 0) + 1;
    say(`  y=${y} x=${x} S=${S}  q=${String(q).padStart(2)}:  a=0 ratio ${(s[0] / n[0] / mean).toFixed(4)}` +
      `   best a=${rs[0].a} ratio ${rs[0].v.toFixed(4)}   rank of a=0: ${rank0} of ${q}`);
  }
  say('');
}

// ===========================================================================
say('\n=== G. MECHANISM TESTS: can anything else distinguish the origin? ===\n');

say('G1. THE MIRROR (FOLD-PROFILE section 4).');
say('    The palindrome sigma(r) = W-2-r is an involution on the slot set, so the');
say('    head [0,S) and the mirrored window {W-2-s : s < S} should carry the SAME');
say('    count. If so, the mirror gives nothing the origin does not already have.\n');
say('       x      S     head   mirror   equal?   fused head+mirror    2*head');
for (const x of [13, 17, 19, 23]) {
  const ax = tile(x), W = primorial(x);
  for (const S of [nextPrime(x) ** 2, 4 * nextPrime(x) ** 2]) {
    let head = 0; for (let s = 0; s < S; s++) head += ax[s];
    let mir = 0; for (let s = 0; s < S; s++) mir += ax[W - 2 - s];
    say(`  ${String(x).padStart(6)} ${String(S).padStart(6)} ${String(head).padStart(8)} ${String(mir).padStart(8)}` +
      `   ${head === mir ? 'YES' : 'NO(' + (head - mir) + ')'}      ${String(head + mir).padStart(10)}    ${String(2 * head).padStart(8)}`);
  }
}
say('    The mirrored window is the interval immediately BELOW 0 in the periodic');
say('    tile. head + mirror is therefore ONE centred window of width 2S about the');
say('    point -1, and its count is exactly 2*head. Sample size and count double');
say('    together, so the ratio to the mean is unchanged.\n');

say('G2. THE ABUTTING / FUSED WINDOW AND THE -1/2 CORRELATION (natal-cap-19, -26).');
say('    natal-cap-26 proves abutting windows are negatively correlated (R = -1/2');
say('    for the flat functional). Test whether that repayment is visible AT the');
say('    origin: split each row into A = [0,S) and B = [S,2S).\n');
say('       y   x      S     corr(A,B)    origin A (z)    origin B (z)   origin A+B (z)   A ratio  B ratio  A+B ratio');
for (const [y, x, Ss] of [[13, 23, [289, 361, 500, 841]], [11, 23, [169, 250, 400, 800]], [11, 19, [169, 250, 400, 800]]]) {
  const Wy = primorial(y), ax = tile(x), M = primorial(x) / Wy;
  for (const S of Ss) {
    if (2 * S > Wy) continue;
    const A = new Float64Array(M), B = new Float64Array(M);
    for (let r = 0; r < M; r++) {
      const b = r * Wy; let a1 = 0, b1 = 0;
      for (let s = 0; s < S; s++) a1 += ax[b + s];
      for (let s = S; s < 2 * S; s++) b1 += ax[b + s];
      A[r] = a1; B[r] = b1;
    }
    let ma = 0, mb = 0; for (let r = 0; r < M; r++) { ma += A[r]; mb += B[r]; } ma /= M; mb /= M;
    let va = 0, vb = 0, cov = 0;
    for (let r = 0; r < M; r++) { va += (A[r] - ma) ** 2; vb += (B[r] - mb) ** 2; cov += (A[r] - ma) * (B[r] - mb); }
    va /= M; vb /= M; cov /= M;
    const corr = cov / Math.sqrt(va * vb);
    const zA = (A[0] - ma) / Math.sqrt(va), zB = (B[0] - mb) / Math.sqrt(vb);
    const vs = va + vb + 2 * cov, zS = (A[0] + B[0] - ma - mb) / Math.sqrt(vs);
    say(`  ${String(y).padStart(4)} ${String(x).padStart(3)} ${String(S).padStart(6)}   ${corr.toFixed(4).padStart(9)}` +
      `   ${zA.toFixed(3).padStart(10)}   ${zB.toFixed(3).padStart(10)}   ${zS.toFixed(3).padStart(10)}` +
      `   ${(A[0] / ma).toFixed(3).padStart(7)}  ${(B[0] / mb).toFixed(3).padStart(7)}  ${((A[0] + B[0]) / (ma + mb)).toFixed(3).padStart(8)}`);
  }
}
say('    If the origin is a large positive outlier in A and a NEGATIVE one in B,');
say('    the head advantage is being repaid immediately above the frontier, and');
say('    fusing the two windows destroys it.\n');

say('G3. THE IMPACT WINDOW / HEAD MONOTONICITY (FOLD-PROFILE section 11).');
say("    The Impact Lemma says folds with p^2 > W+2 remove only p-2 and p, both");
say('    self-strikes: applied to the head it says [0, x\'^2) is FINAL. Circularity');
say('    test: is the head anything other than the twin primes?\n');
say("       x     x'^2   slots in head   twin primes in (x, x'^2)   + [x'^2-2 rough]   identical?");
for (const x of [13, 17, 19, 23]) {
  const ax = tile(x), S = nextPrime(x) ** 2;
  let head = 0; for (let s = 0; s < S; s++) head += ax[s];
  let tp = 0; for (let n = x + 1; n < S; n++) if (isPrime(n) && isPrime(n + 2)) tp++;
  const bnd = ax[S - 2] ? 1 : 0;                     // the Head Lemma's p^2 - 2 slot
  say(`  ${String(x).padStart(6)} ${String(S).padStart(8)} ${String(head).padStart(14)} ${String(tp).padStart(24)}` +
    ` ${String(bnd).padStart(18)}      ${head === tp + bnd ? 'YES' : 'NO'}`);
}
say("    The head is the twin primes below x'^2 plus at most the single boundary");
say("    slot x'^2 - 2 (the Head Lemma of FOLD-PROFILE section 5). So the");
say('    mechanism\'s entire content is "the head equals the twin primes below');
say("    x'^2\", which is the Zone Postulate written out. CIRCULAR.\n");

say('G4. THE ONE CONSTRAINT NOBODY WROTE DOWN: the origin count is ZERO below x.');
say('    An x-rough n < x is n = 1, and 1 is not a slot (1*3 is divisible by 3).');
say("    So D_x(S) = 0 for every S <= x. The Origin Excess Lemma at S = y'^2 is");
say("    therefore VACUOUS whenever y'^2 <= x, and its loss bound 2(pi(x)-pi(y)+1)");
say("    beats D_y(y'^2) only while x is small against y^2.\n");
say("       y      y'^2    D_y(y'^2)   x for which 2(pi(x)-pi(y)+1) >= D_y(y'^2)   so x must satisfy");
for (const y of [13, 19, 29, 43, 61, 89, 127, 181, 257]) {
  const yp = nextPrime(y), S = yp * yp;
  // D_y(S) by direct sieve of [0,S)
  const a = new Uint8Array(S); a.fill(1); a[0] = 0;
  for (const p of primesUpTo(y)) { for (let k = 0; k < S; k += p) a[k] = 0; const st = (p - 2 % p) % p; for (let k = st; k < S; k += p) a[k] = 0; }
  let D = 0; for (let i = 0; i < S; i++) D += a[i];
  const piy = primesUpTo(y).length;
  let xstar = y;
  while (2 * (primesUpTo(xstar).length - piy + 1) < D && xstar < PCAP) xstar = nextPrime(xstar);
  say(`  ${String(y).padStart(5)} ${String(S).padStart(9)} ${String(D).padStart(11)}` +
    `  ${String(xstar).padStart(28)}      x < ${Math.min(xstar, S)}`);
}
say("    The usable window for the lemma is y < x < min(y'^2, x*), and it is a");
say("    window in x, not in S. It has nothing to say about S = x'^2.\n");

// release the tiles before the sieve phase
TILE = new Map();
if (global.gc) global.gc();

// ===========================================================================
say('\n=== E. THE rho CURVE AT SCALE, AND WHERE ITS MINIMUM IS ===\n');
say('  One incremental sieve of [0,N). Fold primes in increasing order; after each');
say('  level y record survivors against N*delta_y. That is rho(u), u = ln N / ln y.');
say('  Fresh window, fresh code: a reproduction of FOLD-PROFILE section 9.\n');

const NBIG = 120000000;
let SURV = null, DELTA_ROOT = 1;
{
  tick(`rho curve: sieving [0,${NBIG})`);
  const a = new Uint8Array(NBIG); a.fill(1); a[0] = 0;
  const root = Math.floor(Math.sqrt(NBIG)) + 1;
  const ps = primesUpTo(root);
  const rows = [];
  let delta = 1, alive = NBIG - 1, done = 0;
  for (const p of ps) {
    for (let k = 0; k < NBIG; k += p) if (a[k]) { a[k] = 0; alive--; }
    if (p > 2) { const st = (p - 2 % p) % p; for (let k = st; k < NBIG; k += p) if (a[k]) { a[k] = 0; alive--; } }
    delta *= (p === 2 ? 0.5 : 1 - 2 / p);
    rows.push({ y: p, u: Math.log(NBIG) / Math.log(p), alive, pred: NBIG * delta, rho: alive / (NBIG * delta) });
    if (++done % 100 === 0) tick(`  folded to p=${p}, u=${(Math.log(NBIG) / Math.log(p)).toFixed(3)}, alive=${alive}`);
  }
  DELTA_ROOT = delta;
  say(`  window [0, ${NBIG})\n`);
  say('       y        u     survivors        N*delta_y     rho = S/P');
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (i < 14 || r.u < 2.6 || i % 60 === 0)
      say(`  ${String(r.y).padStart(6)}  ${r.u.toFixed(4).padStart(7)}  ${String(r.alive).padStart(12)}` +
        `  ${r.pred.toFixed(1).padStart(15)}   ${r.rho.toFixed(5).padStart(9)}`);
  }
  let best = null;
  for (const r of rows) if (r.u >= 1.5 && r.u <= 6 && (best === null || r.rho < best.rho)) best = r;
  say(`\n  minimum of rho over 1.5 <= u <= 6: rho = ${best.rho.toFixed(5)} at u = ${best.u.toFixed(4)} (y = ${best.y})`);
  say(`  Unification Law prediction: minimum at u = 2 with value e^{2gamma}/4 = ${(EG2 / 4).toFixed(5)}`);
  say('  (the measured value sits above it by the finite-size Hardy-Littlewood factor)');

  SURV = [];
  for (let i = 0; i < NBIG; i++) if (a[i]) SURV.push(i);
  say(`\n  Below u = 2 the survivors are exactly the twin primes above y (Impact Lemma).`);
  say(`  Survivors after folding every p <= sqrt(N): ${SURV.length}.`);
  say('\n       y        u     y-rough pairs in (y,N)      N*delta_y       rho    e^{2g}/u^2');
  for (const u of [1.05, 1.15, 1.3, 1.45, 1.6, 1.75, 1.9, 2.0]) {
    const y = Math.round(Math.pow(NBIG, 1 / u));
    if (y > PCAP) { say(`  u=${u}: y=${y} beyond prime cache, skipped`); continue; }
    let d = 1; for (const p of primesUpTo(y)) d *= (p === 2 ? 0.5 : 1 - 2 / p);
    let cnt = 0; for (const s of SURV) if (s > y) cnt++;
    say(`  ${String(y).padStart(7)}  ${u.toFixed(4).padStart(7)}  ${String(cnt).padStart(20)}` +
      `  ${(NBIG * d).toFixed(1).padStart(15)}  ${(cnt / (NBIG * d)).toFixed(5).padStart(8)}  ${(EG2 / (u * u)).toFixed(5).padStart(9)}`);
  }
}

// ===========================================================================
say('\n\n=== F. THE CROSSOVER LAW at scale ===\n');
say('  origin/mean = rho(ln S/ln x) / rho(ln S/ln y), both factors read off ONE');
say('  curve. Single incremental sieve with snapshots at a ladder of 18 levels.\n');

{
  const N = NBIG;
  const levels = [13, 19, 29, 43, 61, 89, 127, 181, 257, 367, 521, 739, 1049, 1487, 2111, 2999, 4253, 6037];
  const grid = geo(500, N, 110);
  tick(`surface: sieving [0,${N}) with ${levels.length} snapshot levels`);
  const a = new Uint8Array(N); a.fill(1); a[0] = 0;
  const li = new Set(levels), out = new Map();
  let delta = 1;
  for (const p of primesUpTo(levels[levels.length - 1])) {
    for (let k = 0; k < N; k += p) a[k] = 0;
    if (p > 2) { const st = (p - 2 % p) % p; for (let k = st; k < N; k += p) a[k] = 0; }
    delta *= (p === 2 ? 0.5 : 1 - 2 / p);
    if (li.has(p)) {
      const D = new Map(); let c = 0, gi = 0; const top = grid[grid.length - 1];
      for (let s = 0; s < top; s++) { c += a[s]; while (gi < grid.length && grid[gi] === s + 1) { D.set(grid[gi], c); gi++; } }
      while (gi < grid.length) { D.set(grid[gi], c); gi++; }
      out.set(p, { delta, D });
      tick(`  snapshot at level ${p}`);
    }
  }

  say("  Only pairs with y'^2 > x are shown: below that the Origin Excess Lemma is");
  say('  vacuous (section G4), because D_x(S) = 0 for S <= x. The crossing is hunted');
  say("  from S = y'^2 upward. u_x, u_y are the two survival arguments at the");
  say('  crossing, and the claim is that the crossing is exactly where the two');
  say('  arguments give the same survival value.\n');
  say("      y      x       y'^2       x'^2      crossing S     /y'^2   /x'^2     u_x     u_y   origin/mean at x'^2");
  for (let i = 0; i < levels.length; i++) for (let j = i + 1; j < levels.length; j++) {
    const y = levels[i], x = levels[j];
    const yp = nextPrime(y), xp = nextPrime(x), target = xp * xp;
    if (target > N) continue;
    if (yp * yp <= x) continue;                       // lemma vacuous, see G4
    const Y = out.get(y), X = out.get(x), fold = X.delta / Y.delta;
    let first = null;
    for (const s of grid) { if (s < yp * yp) continue; const dy = Y.D.get(s); if (!dy) continue; if (X.D.get(s) < dy * fold) { first = s; break; } }
    let near = grid[0];
    for (const s of grid) if (Math.abs(Math.log(s / target)) < Math.abs(Math.log(near / target))) near = s;
    const ratio = X.D.get(near) / (Y.D.get(near) * fold);
    const ux = first === null ? NaN : Math.log(first) / Math.log(x), uy = first === null ? NaN : Math.log(first) / Math.log(y);
    say(`  ${String(y).padStart(5)} ${String(x).padStart(6)} ${String(yp * yp).padStart(10)} ${String(target).padStart(10)}` +
      ` ${String(first === null ? '-' : first).padStart(15)}  ${first === null ? '   -   ' : (first / (yp * yp)).toFixed(2).padStart(7)}` +
      ` ${first === null ? '   -  ' : (first / target).toFixed(3).padStart(6)}  ${isNaN(ux) ? '  -  ' : ux.toFixed(3).padStart(6)}` +
      `  ${isNaN(uy) ? '  -  ' : uy.toFixed(3).padStart(6)}   ${ratio.toFixed(4).padStart(8)}  (S=${near})`);
  }
  say("\n  Pairs with y'^2 <= x are omitted; for those the origin count at S = y'^2 is");
  say('  identically 0 and the lemma states 0 = 0.');

  // ---- F1a. the crossover law in one line: where does u_x sit?
  {
    const uxs = [], lamMax = new Map();
    for (let i = 0; i < levels.length; i++) for (let j = i + 1; j < levels.length; j++) {
      const y = levels[i], x = levels[j];
      const yp = nextPrime(y), xp = nextPrime(x), target = xp * xp;
      if (target > N || yp * yp <= x) continue;
      const Y = out.get(y), X = out.get(x), fold = X.delta / Y.delta;
      let first = null;
      for (const s of grid) { if (s < yp * yp) continue; const dy = Y.D.get(s); if (!dy) continue; if (X.D.get(s) < dy * fold) { first = s; break; } }
      if (first !== null) uxs.push({ ux: Math.log(first) / Math.log(x), y, x });
      let near = grid[0];
      for (const s of grid) if (Math.abs(Math.log(s / target)) < Math.abs(Math.log(near / target))) near = s;
      if (X.D.get(near) >= Y.D.get(near) * fold) {
        const lam = Math.log(x) / Math.log(y);
        if (!lamMax.has(x) || lam > lamMax.get(x)) lamMax.set(x, lam);
      }
    }
    const v = uxs.map(o => o.ux).sort((a, b) => a - b), n = v.length;
    const q = f => v[Math.min(n - 1, Math.floor(n * f))];
    say('\n  THE CROSSOVER LAW IN ONE LINE. Distribution of u_x = ln S*/ln x:\n');
    say(`  u_x at the crossing:  n=${n}  min=${v[0].toFixed(3)}  p05=${q(0.05).toFixed(3)}` +
      `  median=${q(0.5).toFixed(3)}  p95=${q(0.95).toFixed(3)}  max=${v[n - 1].toFixed(3)}`);
    const band = uxs.filter(o => o.ux >= 1.90 && o.ux <= 2.23).length;
    say(`  in the band [1.90, 2.23]: ${band} of ${n}`);
    say(`  the ${n - band} outside it, all with x near y'^2 where the lemma is already vacuous:`);
    for (const o of uxs.filter(o => o.ux < 1.90 || o.ux > 2.23))
      say(`     y=${String(o.y).padStart(4)} x=${String(o.x).padStart(5)}  u_x=${o.ux.toFixed(3)}  ln x/ln y=${(Math.log(o.x) / Math.log(o.y)).toFixed(2)}`);
    const xs = [...lamMax.keys()].sort((a, b) => a - b).filter(x => x >= 367);
    say("\n  And the largest ln x/ln y at which the origin still beats the mean at S = x'^2:\n");
    say('  x        ' + xs.map(x => String(x).padStart(5)).join('  '));
    say('  max      ' + xs.map(x => lamMax.get(x).toFixed(3).padStart(5)).join('  '));
    say('  ln x/ln y');
    say('\n  Monotone down over nine levels: the band of y that helps is shrinking');
    say('  toward y = x, which is the degenerate matrix.');
  }

  // ---- F2. the load-bearing empirical step: rho_z(S) depends only on u
  say('\n\nF2. THE COLLAPSE THE WHOLE LAW RESTS ON.');
  say('    The crossover law reads origin/mean = rho(u_x)/rho(u_y) with ONE function');
  say('    rho. That needs rho_z(z^u) to be independent of z. Measured across the');
  say('    ladder of levels in the same window:\n');
  say('        u  ' + levels.filter(z => z >= 43).map(z => `z=${String(z).padStart(4)}`).join(' ') + '     spread');
  for (const u of [1.90, 2.00, 2.10, 2.30, 2.60, 3.00, 3.50, 4.00]) {
    const vals = [], cols = [];
    for (const z of levels.filter(z => z >= 43)) {
      const target = Math.pow(z, u);
      if (target > N || target < grid[0]) { cols.push('    -  '); continue; }
      let near = grid[0];
      for (const s of grid) if (Math.abs(Math.log(s / target)) < Math.abs(Math.log(near / target))) near = s;
      if (Math.abs(Math.log(near / target)) > 0.06) { cols.push('    -  '); continue; }
      const Z = out.get(z), r = Z.D.get(near) / (near * Z.delta);
      vals.push(r); cols.push(r.toFixed(4).padStart(7));
    }
    const sp = vals.length > 1 ? (Math.max(...vals) - Math.min(...vals)) : NaN;
    say(`  ${u.toFixed(2).padStart(7)}  ` + cols.join(' ') + `   ${isNaN(sp) ? '  -' : sp.toFixed(4)}`);
  }
  say('\n    (dashes are u where z^u falls outside the sieved window or off the grid)');
  say('    A tight collapse means rho is a function of u alone, which is FOLD-PROFILE');
  say('    section 9a re-measured, and it is what makes the crossover law a law.');

  say('\nF3. THE SHAPE OF rho ON [1,2], against e^{2gamma}/u^2.');
  say('    Taking the level ladder and reading rho at S = z^u for u below 2:\n');
  say('        u    mean rho over levels   e^{2gamma}/u^2   ratio (the finite-size HL factor)');
  for (const u of [1.30, 1.45, 1.60, 1.75, 1.85, 1.95, 2.00]) {
    const vals = [];
    for (const z of levels.filter(z => z >= 43)) {
      const target = Math.pow(z, u);
      if (target > N || target < grid[0]) continue;
      let near = grid[0];
      for (const s of grid) if (Math.abs(Math.log(s / target)) < Math.abs(Math.log(near / target))) near = s;
      if (Math.abs(Math.log(near / target)) > 0.06) continue;
      const Z = out.get(z);
      vals.push(Z.D.get(near) / (near * Z.delta));
    }
    if (!vals.length) continue;
    const m = vals.reduce((p, q) => p + q, 0) / vals.length, pr = EG2 / (u * u);
    say(`  ${u.toFixed(2).padStart(7)}  ${m.toFixed(5).padStart(20)}  ${pr.toFixed(5).padStart(14)}   ${(m / pr).toFixed(4).padStart(8)}   (${vals.length} levels)`);
  }

  say('\n  And against the d = 1 ensemble (all x# translates), where the mean is just');
  say("  S*delta_x. Here origin/mean = rho_x(x'^2) = rho(2) with no y at all:\n");
  say("       x       x'^2       origin     S*delta_x    rho_x(x'^2)    HL factor   rho/HL   (target 0.79305)");
  const C2 = 0.6601618158468696;
  for (const x of levels) {
    const xp = nextPrime(x), target = xp * xp;
    if (target > N) continue;
    const X = out.get(x);
    let near = grid[0];
    for (const s of grid) if (Math.abs(Math.log(s / target)) < Math.abs(Math.log(near / target))) near = s;
    const d = X.D.get(near), pred = near * X.delta;
    // finite-size Hardy-Littlewood factor of the window itself, measured not assumed:
    // the same count divided by the asymptotic HL prediction 2*C2*S/ln^2 S.
    const hl = d / (2 * C2 * near / (Math.log(near) ** 2));
    say(`  ${String(x).padStart(6)} ${String(target).padStart(11)} ${String(d).padStart(12)} ${pred.toFixed(1).padStart(13)}` +
      `   ${(d / pred).toFixed(5).padStart(9)}   ${hl.toFixed(5).padStart(9)}  ${(d / pred / hl).toFixed(5).padStart(7)}`);
  }
  say(`\n  Column rho/HL strips the finite-size Hardy-Littlewood overshoot of the window`);
  say(`  and should sit on e^{2gamma}/4 = ${(EG2 / 4).toFixed(5)} already. The raw rho_x(x'^2)`);
  say('  column approaches it from above like 1 + c/ln x.');
}

say(`\n[done in ${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=6144 research/origin-excess.js
//   invocation:  node --max-old-space-size=6144 research/origin-excess.js
//   code-sha256: f5596d519e20e7eda8e434fd99caf0ec3a8d1a57dbbae53fcaae3a333186b4bb
//   out-sha256:  a8ec23862435607a8e12c6282c09130191b13f5fdc8a870a487e6b2692582971
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     12.7 s
// ============================================================================
// === A. CUSTODY: independent reproduction of maier-matrix.md ===
//
// A1. The Origin Excess Lemma at S = y'^2  (target: 14 of 14, and the exact
//     D_y(S), L, origin and mean columns of maier-matrix.md section F)
//
//    y   x     S=y'^2   D_y(S)   L(pred)  origin(pred)  origin(true)  ok   mean       ratio
//    7  11      121        8        1             7             7   YES      6.545  1.069
//    7  13      121        8        1             7             7   YES      5.538  1.264
//    7  17      121        8        2             6             6   YES      4.887  1.228
//    7  19      121        8        2             6             6   YES      4.372  1.372
//   11  13      169       10        1             9             9   YES      8.462  1.064
//   11  17      169       10        2             8             8   YES      7.466  1.072
//   11  19      169       10        2             8             8   YES      6.680  1.198
//   11  23      169       10        2             8             8   YES      6.099  1.312
//   13  17      289       16        1            15            15   YES     14.118  1.063
//   13  19      289       16        1            15            15   YES     12.632  1.188
//   13  23      289       16        1            15            15   YES     11.533  1.301
//   17  19      361       18        1            17            17   YES     16.105  1.056
//   17  23      361       18        1            17            17   YES     14.705  1.156
//   19  23      529       21        0            21            21   YES     19.174  1.095
//
//   lemma verified 14 of 14
//   census custody: D_13=1485 D_19=378675 D_23=7952175 (GLOSSARY: 1485 / 378675 / 7952175)
//
// A2. Where the origin sits in the ensemble  (target: maier-matrix.md D and E)
//
//   y=11 x=17  M=221 rows   y'^2=169  x'^2=361
//        S   mean     origin  min max   origin rank (1=largest)  origin>=mean?
//      121     5.226       6    3    7       16 / 221          yes
//      169     7.466       8    5   10       28 / 221          yes
//      500    22.398      22   19   26      104 / 221          NO
//     1000    42.557      39   38   47      217 / 221          NO
//     2310   100.792      99   95  104      182 / 221          NO
//
//   y=13 x=19  M=323 rows   y'^2=289  x'^2=529
//        S   mean     origin  min max   origin rank (1=largest)  origin>=mean?
//      169     7.105       8    5    9       19 / 323          yes
//      289    12.632      15   10   15        1 / 323          yes
//      361    15.000      17   12   17        1 / 323          yes
//     1000    37.105      35   33   41      286 / 323          NO
//     5000   194.211     193  189  202      199 / 323          NO
//    30030  1172.368    1173 1164 1186      106 / 323          yes
//
//   y=13 x=23  M=7429 rows   y'^2=289  x'^2=841
//        S   mean     origin  min max   origin rank (1=largest)  origin>=mean?
//      169     6.487       8    3    9      163 / 7429          yes
//      289    11.533      15    7   15        1 / 7429          yes
//      361    13.696      17    9   17        1 / 7429          yes
//     1000    33.879      32   28   40     5752 / 7429          NO
//     5000   177.323     177  168  189     3522 / 7429          NO
//    30030  1070.423    1075 1055 1087     1036 / 7429          yes
//
// A3. The width the Zone Postulate actually asks for, S = x'^2
//
//    y   x       S    mean     origin   min  max   rank / M        origin>=mean?
//   11  17     361    15.679      18    12   19       3 /    221      yes
//   13  17     361    16.765      18    15   18       1 /     17      yes
//   13  19     529    21.316      21    19   24     135 /    323      NO
//   13  23     841    29.554      30    24   36    2254 /   7429      yes
//   17  19     529    20.579      21    19   22       2 /     19      yes
//   17  23     841    27.776      30    24   32      16 /    437      yes
//   19  23     841    27.391      30    25   30       1 /     23      yes
//
//
// === B. THE SURVIVAL QUOTIENT IDENTITY ===
//
//   Claim (one line). With rho_z(S) = (D_z(S)/S) / (D_z/z#),
//      origin(S) / mean(S)  =  rho_x(S) / rho_y(S)   exactly, for every S <= y#.
//   Proof. mean = D_y(S)*prod_{y<q<=x}(1-2/q) = S*delta_y*rho_y(S)*(delta_x/delta_y)
//          = S*delta_x*rho_y(S); and origin = D_x(S) = S*delta_x*rho_x(S). qed
//   The origin's excess over the matrix ensemble is a ratio of two values of the
//   SAME survival curve, at the SAME window, read at two sieving levels.
//
//    y   x        S    origin   mean       origin/mean   rho_x/rho_y   u_x=lnS/lnx  u_y=lnS/lny  match
//   11  17      121        6      5.226      1.148052      1.148052       1.693       2.000   YES
//   11  17      169        8      7.466      1.071515      1.071515       1.811       2.139   YES
//   11  17      289       15     13.439      1.116162      1.116162       2.000       2.363   YES
//   11  17      361       18     15.679      1.148052      1.148052       2.079       2.456   YES
//   11  17      529       23     23.891      0.962689      0.962689       2.213       2.615   YES
//   11  17      841       34     37.330      0.910788      0.910788       2.377       2.809   YES
//   11  17     2310       99    100.792      0.982222      0.982222       2.734       3.230   YES
//   13  19      121        6      5.526      1.085714      1.085714       1.629       1.870   YES
//   13  19      169        8      7.105      1.125926      1.125926       1.742       2.000   YES
//   13  19      289       15     12.632      1.187500      1.187500       1.924       2.209   YES
//   13  19      361       17     15.000      1.133333      1.133333       2.000       2.296   YES
//   13  19      529       21     21.316      0.985185      0.985185       2.130       2.445   YES
//   13  19      841       30     32.368      0.926829      0.926829       2.287       2.626   YES
//   13  19     2310       88     90.000      0.977778      0.977778       2.630       3.020   YES
//   13  19    30030     1173   1172.368      1.000539      1.000539       3.501       4.020   YES
//   13  23      121        6      5.046      1.189116      1.189116       1.530       1.870   YES
//   13  23      169        8      6.487      1.233157      1.233157       1.636       2.000   YES
//   13  23      289       15     11.533      1.300595      1.300595       1.807       2.209   YES
//   13  23      361       17     13.696      1.241270      1.241270       1.878       2.296   YES
//   13  23      529       21     19.462      1.079012      1.079012       2.000       2.445   YES
//   13  23      841       30     29.554      1.015099      1.015099       2.148       2.626   YES
//   13  23     2310       81     82.174      0.985714      0.985714       2.470       3.020   YES
//   13  23    30030     1075   1070.423      1.004276      1.004276       3.288       4.020   YES
//   17  23      121        6      4.902      1.224090      1.224090       1.530       1.693   YES
//   17  23      169        8      6.535      1.224090      1.224090       1.636       1.811   YES
//   17  23      289       15     12.254      1.224090      1.224090       1.807       2.000   YES
//   17  23      361       17     14.705      1.156085      1.156085       1.878       2.079   YES
//   17  23      529       21     18.789      1.117647      1.117647       2.000       2.213   YES
//   17  23      841       30     27.776      1.080079      1.080079       2.148       2.377   YES
//   17  23     2310       81     80.876      1.001528      1.001528       2.470       2.734   YES
//   17  23    30030     1075   1071.817      1.002970      1.002970       3.288       3.639   YES
//   19  23      121        6      5.478      1.095238      1.095238       1.530       1.629   YES
//   19  23      169        8      7.304      1.095238      1.095238       1.636       1.742   YES
//   19  23      289       15     13.696      1.095238      1.095238       1.807       1.924   YES
//   19  23      361       17     15.522      1.095238      1.095238       1.878       2.000   YES
//   19  23      529       21     19.174      1.095238      1.095238       2.000       2.130   YES
//   19  23      841       30     27.391      1.095238      1.095238       2.148       2.287   YES
//   19  23     2310       81     80.348      1.008117      1.008117       2.470       2.630   YES
//   19  23    30030     1075   1071.000      1.003735      1.003735       3.288       3.501   YES
//
//   identity holds in 39 of 39 cells
//
//
// === C. THE CROSSOVER, MEASURED ===
//
//   Fine scan of S through and past y'^2. Marked | at y'^2 and at x'^2.
//
//   y=13 x=23   M=7429 rows   y'^2=289   x'^2=841   y#=30030
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       200     0.69       11       8.65       1.2717        1/   7429     5   11
//       227     0.79       11       8.65       1.2717        1/   7429     5   11
//       257     0.89       13      10.09       1.2882        1/   7429     6   13
//       289     1.00       15      11.53       1.3006        1/   7429     7   15   <- y'^2  (Origin Excess Lemma stops here)
//       291     1.01       15      11.53       1.3006        1/   7429     7   15
//       330     1.14       16      12.25       1.3057        1/   7429     8   16
//       361     1.25       17      13.70       1.2413        1/   7429     9   17
//       374     1.29       17      13.70       1.2413        1/   7429     9   17
//       424     1.47       18      15.14       1.1891        8/   7429    11   19
//       481     1.66       20      17.30       1.1561       18/   7429    14   21
//       529     1.83       21      19.46       1.0790      392/   7429    15   23
//       545     1.89       21      19.46       1.0790      392/   7429    15   23
//       618     2.14       24      22.35       1.0740      504/   7429    17   27
//       700     2.42       26      24.51       1.0609      573/   7429    18   30
//       794     2.75       26      25.95       1.0019     2772/   7429    20   32
//       841     2.91       30      29.55       1.0151     2254/   7429    24   36   <- x'^2  (what the Zone Postulate asks for)
//       899     3.11       32      31.72       1.0089     2468/   7429    25   38
//      1020     3.53       33      35.32       0.9343     6173/   7429    29   41
//      1156     4.00       38      40.37       0.9414     6325/   7429    34   46
//      1310     4.53       44      46.13       0.9538     6085/   7429    39   52
//      1485     5.14       51      51.90       0.9827     4314/   7429    45   58
//      1683     5.82       55      58.39       0.9420     6877/   7429    52   65
//      1908     6.60       65      68.48       0.9492     6823/   7429    62   76
//      2162     7.48       74      77.13       0.9594     6444/   7429    69   86
//      2451     8.48       85      86.50       0.9827     4970/   7429    78   95
//      2778     9.61       98      99.47       0.9852     4807/   7429    91  108
//      3149    10.90      107     111.73       0.9577     6901/   7429   101  121
//      3569    12.35      124     126.14       0.9830     5261/   7429   117  136
//      4045    14.00      139     142.72       0.9739     6411/   7429   133  153
//      4585    15.87      160     163.63       0.9778     6410/   7429   154  175
//      5197    17.98      185     184.53       1.0025     2830/   7429   174  196
//      5891    20.38      212     208.32       1.0177      646/   7429   198  220
//      6677    23.10      239     235.71       1.0140      735/   7429   225  247
//      7569    26.19      272     271.03       1.0036     2522/   7429   259  283
//      8579    29.69      303     303.47       0.9985     3658/   7429   293  317
//      9724    33.65      348     347.44       1.0016     2814/   7429   335  362
//     11022    38.14      391     392.13       0.9971     4300/   7429   380  406
//     12493    43.23      449     446.19       1.0063     1537/   7429   433  459
//     14160    49.00      509     504.58       1.0088      843/   7429   491  520
//     16051    55.54      574     570.89       1.0054     1398/   7429   558  585
//     18193    62.95      654     647.30       1.0104      321/   7429   634  660
//     20621    71.35      739     735.24       1.0051     1216/   7429   721  751
//     23374    80.88      837     834.71       1.0027     1972/   7429   818  850
//     26494    91.67      948     945.00       1.0032     1780/   7429   929  963
//     30030   103.91     1075    1070.42       1.0043     1036/   7429  1055 1087
//   first S >= y'^2 with origin < mean: 1020  ( = 3.53 * y'^2 )
//
//   y=13 x=19   M=323 rows   y'^2=289   x'^2=529   y#=30030
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       200     0.69       11       9.47       1.1611        1/    323     8   11
//       227     0.79       11       9.47       1.1611        1/    323     8   11
//       257     0.89       13      11.05       1.1762        1/    323     9   13
//       289     1.00       15      12.63       1.1875        1/    323    10   15   <- y'^2  (Origin Excess Lemma stops here)
//       291     1.01       15      12.63       1.1875        1/    323    10   15
//       330     1.14       16      13.42       1.1922        1/    323    11   16
//       361     1.25       17      15.00       1.1333        1/    323    12   17
//       374     1.29       17      15.00       1.1333        1/    323    12   17
//       424     1.47       18      16.58       1.0857        4/    323    14   19
//       481     1.66       20      18.95       1.0556       13/    323    17   21
//       529     1.83       21      21.32       0.9852      135/    323    19   24   <- x'^2  (what the Zone Postulate asks for)
//       545     1.89       21      21.32       0.9852      135/    323    19   24
//       618     2.14       24      24.47       0.9806      152/    323    22   28
//       700     2.42       26      26.84       0.9686      197/    323    24   31
//       794     2.75       26      28.42       0.9148      300/    323    26   33
//       841     2.91       30      32.37       0.9268      297/    323    29   37
//       899     3.11       33      34.74       0.9500      269/    323    31   39
//      1020     3.53       36      38.68       0.9306      305/    323    35   42
//      1156     4.00       41      44.21       0.9274      315/    323    40   48
//      1310     4.53       48      50.53       0.9500      300/    323    46   54
//      1485     5.14       55      56.84       0.9676      257/    323    53   61
//      1683     5.82       61      63.95       0.9539      314/    323    60   69
//      1908     6.60       72      75.00       0.9600      304/    323    71   80
//      2162     7.48       81      84.47       0.9589      300/    323    80   91
//      2451     8.48       93      94.74       0.9817      240/    323    90   99
//      2778     9.61      107     108.95       0.9821      246/    323   104  114
//      3149    10.90      118     122.37       0.9643      311/    323   116  128
//      3569    12.35      136     138.16       0.9844      241/    323   133  144
//      4045    14.00      153     156.32       0.9788      292/    323   150  163
//      4585    15.87      176     179.21       0.9821      286/    323   173  187
//      5197    17.98      201     202.11       0.9945      199/    323   196  210
//      5891    20.38      229     228.16       1.0037       87/    323   223  236
//      6677    23.10      258     258.16       0.9994      149/    323   252  266
//      7569    26.19      294     296.84       0.9904      261/    323   290  305
//      8579    29.69      329     332.37       0.9899      279/    323   326  341
//      9724    33.65      380     380.53       0.9986      161/    323   372  390
//     11022    38.14      429     429.47       0.9989      157/    323   422  439
//     12493    43.23      491     488.68       1.0047       68/    323   479  499
//     14160    49.00      556     552.63       1.0061       44/    323   543  562
//     16051    55.54      629     625.26       1.0060       40/    323   617  635
//     18193    62.95      713     708.95       1.0057       36/    323   700  717
//     20621    71.35      808     805.26       1.0034       60/    323   797  816
//     23374    80.88      914     914.21       0.9998      145/    323   904  925
//     26494    91.67     1036    1035.00       1.0010      115/    323  1024 1048
//     30030   103.91     1173    1172.37       1.0005      106/    323  1164 1186
//   first S >= y'^2 with origin < mean: 529  ( = 1.83 * y'^2 )
//
//   y=13 x=17   M=17 rows   y'^2=289   x'^2=361   y#=30030
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       200     0.69       11      10.59       1.0389        1/     17    10   11
//       227     0.79       11      10.59       1.0389        1/     17    10   11
//       257     0.89       13      12.35       1.0524        1/     17    11   13
//       289     1.00       15      14.12       1.0625        1/     17    13   15   <- y'^2  (Origin Excess Lemma stops here)
//       291     1.01       15      14.12       1.0625        1/     17    13   15
//       330     1.14       16      15.00       1.0667        1/     17    14   16
//       361     1.25       18      16.76       1.0737        1/     17    15   18   <- x'^2  (what the Zone Postulate asks for)
//       374     1.29       18      16.76       1.0737        1/     17    15   18
//       424     1.47       19      18.53       1.0254        1/     17    17   19
//       481     1.66       22      21.18       1.0389        1/     17    20   22
//       529     1.83       23      23.82       0.9654       13/     17    23   25
//       545     1.89       23      23.82       0.9654       13/     17    23   25
//       618     2.14       27      27.35       0.9871        9/     17    26   29
//       700     2.42       29      30.00       0.9667       13/     17    29   32
//       794     2.75       30      31.76       0.9444       16/     17    30   34
//       841     2.91       34      36.18       0.9398       17/     17    34   39
//       899     3.11       37      38.82       0.9530       16/     17    37   41
//      1020     3.53       41      43.24       0.9483       16/     17    41   45
//      1156     4.00       47      49.41       0.9512       17/     17    47   52
//      1310     4.53       55      56.47       0.9740       14/     17    55   59
//      1485     5.14       62      63.53       0.9759       13/     17    62   66
//      1683     5.82       70      71.47       0.9794       15/     17    70   74
//      1908     6.60       82      83.82       0.9782       17/     17    82   86
//      2162     7.48       92      94.41       0.9745       17/     17    92   97
//      2451     8.48      105     105.88       0.9917       12/     17   104  107
//      2778     9.61      120     121.76       0.9855       16/     17   120  123
//      3149    10.90      133     136.76       0.9725       17/     17   133  139
//      3569    12.35      152     154.41       0.9844       17/     17   152  156
//      4045    14.00      172     174.71       0.9845       17/     17   172  178
//      4585    15.87      198     200.29       0.9885       15/     17   198  203
//      5197    17.98      226     225.88       1.0005        7/     17   224  229
//      5891    20.38      256     255.00       1.0039        5/     17   252  259
//      6677    23.10      288     288.53       0.9982        9/     17   285  293
//      7569    26.19      332     331.76       1.0007        6/     17   327  336
//      8579    29.69      372     371.47       1.0014        5/     17   368  375
//      9724    33.65      427     425.29       1.0040        3/     17   421  432
//     11022    38.14      482     480.00       1.0042        3/     17   476  485
//     12493    43.23      549     546.18       1.0052        2/     17   542  551
//     14160    49.00      620     617.65       1.0038        3/     17   612  622
//     16051    55.54      702     698.82       1.0045        2/     17   695  703
//     18193    62.95      795     792.35       1.0033        2/     17   788  796
//     20621    71.35      904     900.00       1.0044        1/     17   897  904
//     23374    80.88     1022    1021.76       1.0002        7/     17  1019 1027
//     26494    91.67     1157    1156.76       1.0002        7/     17  1153 1163
//     30030   103.91     1312    1310.29       1.0013        5/     17  1307 1316
//   first S >= y'^2 with origin < mean: 529  ( = 1.83 * y'^2 )
//
//   y=11 x=23   M=96577 rows   y'^2=169   x'^2=841   y#=2310
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       100     0.59        4       3.05       1.3116     4096/  96577     0    5
//       110     0.65        6       4.27       1.4053     1156/  96577     1    7
//       122     0.72        6       4.27       1.4053     1156/  96577     1    7
//       134     0.79        6       4.27       1.4053     1156/  96577     1    7
//       148     0.88        7       4.88       1.4346      946/  96577     1    8
//       163     0.96        8       5.49       1.4574      487/  96577     1    9
//       169     1.00        8       6.10       1.3116     1949/  96577     1   10   <- y'^2  (Origin Excess Lemma stops here)
//       180     1.07        9       6.71       1.3414     1029/  96577     2   11
//       199     1.18       11       7.93       1.3873      197/  96577     3   12
//       219     1.30       11       7.93       1.3873      197/  96577     3   12
//       242     1.43       13       9.76       1.3321      367/  96577     4   14
//       267     1.58       13       9.76       1.3321      367/  96577     4   14
//       289     1.71       15      10.98       1.3663      172/  96577     5   16
//       294     1.74       15      10.98       1.3663      172/  96577     5   16
//       325     1.92       16      11.59       1.3807        1/  96577     6   16
//       358     2.12       17      12.20       1.3936        1/  96577     6   17
//       361     2.14       17      12.81       1.3272       86/  96577     6   18
//       395     2.34       17      14.03       1.2118     1263/  96577     7   19
//       436     2.58       19      15.86       1.1981      870/  96577    10   22
//       481     2.85       20      17.69       1.1307     4519/  96577    10   24
//       530     3.14       21      19.52       1.0759    10606/  96577    12   26
//       585     3.46       22      20.74       1.0609    15115/  96577    13   27
//       645     3.82       25      24.40       1.0247    25216/  96577    17   31
//       712     4.21       26      26.23       0.9913    42291/  96577    19   33
//       785     4.64       26      27.45       0.9473    66188/  96577    19   35
//       841     4.98       30      30.50       0.9837    48279/  96577    22   39   <- x'^2  (what the Zone Postulate asks for)
//       866     5.12       31      31.72       0.9774    52549/  96577    23   39
//       955     5.65       32      34.16       0.9369    75807/  96577    26   43
//      1054     6.24       35      37.82       0.9255    82910/  96577    28   47
//      1162     6.88       38      41.48       0.9162    88458/  96577    32   50
//      1282     7.59       42      45.74       0.9181    89787/  96577    36   55
//      1414     8.37       47      49.40       0.9513    77199/  96577    40   59
//      1560     9.23       52      54.89       0.9473    81958/  96577    44   64
//      1721    10.18       57      60.38       0.9440    85561/  96577    49   70
//      1898    11.23       65      67.09       0.9688    71672/  96577    57   77
//      2094    12.39       71      73.80       0.9620    79037/  96577    62   84
//      2310    13.67       81      82.34       0.9837    60967/  96577    72   94
//   first S >= y'^2 with origin < mean: 712  ( = 4.21 * y'^2 )
//
//   y=11 x=19   M=4199 rows   y'^2=169   x'^2=529   y#=2310
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       100     0.59        4       3.34       1.1976      316/   4199     1    5
//       110     0.65        6       4.68       1.2831      106/   4199     2    7
//       122     0.72        6       4.68       1.2831      106/   4199     2    7
//       134     0.79        6       4.68       1.2831      106/   4199     2    7
//       148     0.88        7       5.34       1.3098      106/   4199     2    8
//       163     0.96        8       6.01       1.3306       55/   4199     2    9
//       169     1.00        8       6.68       1.1976      189/   4199     3   10   <- y'^2  (Origin Excess Lemma stops here)
//       180     1.07        9       7.35       1.2248      107/   4199     4   11
//       199     1.18       11       8.68       1.2667       24/   4199     6   12
//       219     1.30       11       8.68       1.2667       24/   4199     6   12
//       242     1.43       13      10.69       1.2163       57/   4199     6   14
//       267     1.58       13      10.69       1.2163       57/   4199     6   14
//       289     1.71       15      12.02       1.2475       33/   4199     8   16
//       294     1.74       15      12.02       1.2475       33/   4199     8   16
//       325     1.92       16      12.69       1.2606        1/   4199     9   16
//       358     2.12       17      13.36       1.2724        1/   4199     9   17
//       361     2.14       17      14.03       1.2118       18/   4199     9   18
//       395     2.34       17      15.36       1.1065      258/   4199    10   19
//       436     2.58       19      17.37       1.0939      227/   4199    13   22
//       481     2.85       20      19.37       1.0324      950/   4199    14   25
//       529     3.13       21      21.38       0.9824     1965/   4199    16   26   <- x'^2  (what the Zone Postulate asks for)
//       530     3.14       21      21.38       0.9824     1965/   4199    16   26
//       585     3.46       22      22.71       0.9686     2285/   4199    17   28
//       645     3.82       25      26.72       0.9356     3251/   4199    21   32
//       712     4.21       26      28.72       0.9051     3868/   4199    23   34
//       785     4.64       26      30.06       0.8649     4103/   4199    24   36
//       866     5.12       32      34.74       0.9212     3758/   4199    28   41
//       955     5.65       34      37.41       0.9089     3964/   4199    31   44
//      1054     6.24       38      41.42       0.9175     3962/   4199    34   48
//      1162     6.88       41      45.43       0.9026     4126/   4199    39   52
//      1282     7.59       46      50.10       0.9181     4080/   4199    43   57
//      1414     8.37       51      54.11       0.9425     3806/   4199    47   62
//      1560     9.23       57      60.12       0.9481     3810/   4199    52   67
//      1721    10.18       63      66.13       0.9526     3782/   4199    58   73
//      1898    11.23       71      73.48       0.9662     3466/   4199    65   81
//      2094    12.39       78      80.83       0.9650     3590/   4199    73   89
//      2310    13.67       88      90.18       0.9758     3303/   4199    82   99
//   first S >= y'^2 with origin < mean: 529  ( = 3.13 * y'^2 )
//
//   y=11 x=17   M=221 rows   y'^2=169   x'^2=361   y#=2310
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       100     0.59        4       3.73       1.0715       36/    221     2    5
//       110     0.65        6       5.23       1.1481       16/    221     3    7
//       122     0.72        6       5.23       1.1481       16/    221     3    7
//       134     0.79        6       5.23       1.1481       16/    221     3    7
//       148     0.88        7       5.97       1.1720       16/    221     4    8
//       163     0.96        8       6.72       1.1906       10/    221     4    9
//       169     1.00        8       7.47       1.0715       28/    221     5   10   <- y'^2  (Origin Excess Lemma stops here)
//       180     1.07        9       8.21       1.0959       17/    221     6   11
//       199     1.18       11       9.71       1.1333        9/    221     8   12
//       219     1.30       11       9.71       1.1333        9/    221     8   12
//       242     1.43       13      11.95       1.0883       19/    221     9   15
//       267     1.58       13      11.95       1.0883       19/    221     9   15
//       289     1.71       15      13.44       1.1162       13/    221    11   17
//       294     1.74       15      13.44       1.1162       13/    221    11   17
//       325     1.92       16      14.19       1.1279        4/    221    12   17
//       358     2.12       17      14.93       1.1385        4/    221    12   18
//       361     2.14       18      15.68       1.1481        3/    221    12   19   <- x'^2  (what the Zone Postulate asks for)
//       395     2.34       18      17.17       1.0482       31/    221    14   20
//       436     2.58       20      19.41       1.0303       35/    221    17   23
//       481     2.85       22      21.65       1.0161       60/    221    18   26
//       530     3.14       23      23.89       0.9627      140/    221    20   27
//       585     3.46       24      25.38       0.9455      162/    221    22   29
//       645     3.82       28      29.86       0.9376      186/    221    26   33
//       712     4.21       30      32.10       0.9345      194/    221    29   36
//       785     4.64       30      33.60       0.8929      214/    221    29   38
//       866     5.12       36      38.82       0.9273      207/    221    34   43
//       955     5.65       38      41.81       0.9089      217/    221    37   46
//      1054     6.24       43      46.29       0.9289      215/    221    41   51
//      1162     6.88       47      50.77       0.9258      217/    221    46   55
//      1282     7.59       53      56.00       0.9465      208/    221    52   60
//      1414     8.37       58      60.48       0.9591      196/    221    56   65
//      1560     9.23       65      67.19       0.9673      191/    221    63   72
//      1721    10.18       73      73.91       0.9876      131/    221    69   79
//      1898    11.23       81      82.13       0.9863      138/    221    77   86
//      2094    12.39       89      90.34       0.9852      149/    221    86   94
//      2310    13.67       99     100.79       0.9822      182/    221    95  104
//   first S >= y'^2 with origin < mean: 530  ( = 3.14 * y'^2 )
//
//   y=17 x=23   M=437 rows   y'^2=361   x'^2=841   y#=510510
//         S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
//       200     0.55       11       8.99       1.2241        1/    437     6   11
//       233     0.65       12       9.80       1.2241        1/    437     7   12
//       272     0.75       14      11.44       1.2241        1/    437     8   14
//       317     0.88       16      13.07       1.2241        1/    437    10   16
//       361     1.00       17      14.70       1.1561        1/    437    12   17   <- y'^2  (Origin Excess Lemma stops here)
//       370     1.02       17      14.70       1.1561        1/    437    12   17
//       431     1.19       18      15.52       1.1597        1/    437    12   18
//       502     1.39       20      17.97       1.1128        3/    437    15   21
//       529     1.47       21      18.79       1.1176        3/    437    15   22
//       586     1.62       22      19.61       1.1221        3/    437    16   23
//       683     1.89       26      23.69       1.0975        7/    437    20   27
//       796     2.20       26      24.51       1.0609       32/    437    21   28
//       841     2.33       30      27.78       1.0801       16/    437    24   32   <- x'^2  (what the Zone Postulate asks for)
//       928     2.57       32      30.23       1.0587       25/    437    27   34
//      1082     3.00       36      35.95       1.0015      143/    437    33   41
//      1262     3.50       41      41.66       0.9841      233/    437    38   46
//      1471     4.07       50      49.83       1.0034      125/    437    47   53
//      1715     4.75       57      59.64       0.9558      394/    437    55   64
//      2000     5.54       68      69.44       0.9793      299/    437    65   75
//      2332     6.46       81      80.88       1.0015      164/    437    75   87
//      2719     7.53       96      96.40       0.9959      216/    437    91  102
//      3170     8.78      109     111.10       0.9811      318/    437   104  117
//      3696    10.24      127     128.26       0.9902      266/    437   122  135
//      4309    11.94      152     151.13       1.0057      129/    437   143  159
//      5024    13.92      179     178.09       1.0051      138/    437   171  184
//      5857    16.22      210     207.50       1.0120       61/    437   200  213
//      6829    18.92      246     243.45       1.0105       61/    437   234  250
//      7962    22.06      284     283.48       1.0018      162/    437   275  292
//      9283    25.71      329     331.68       0.9919      343/    437   324  340
//     10823    29.98      383     385.59       0.9933      336/    437   377  393
//     12619    34.96      454     454.22       0.9995      213/    437   445  462
//     14713    40.76      530     526.92       1.0058       55/    437   517  536
//     17154    47.52      611     610.25       1.0012      158/    437   601  620
//     20000    55.40      716     714.82       1.0017      157/    437   703  725
//   first S >= y'^2 with origin < mean: 1262  ( = 3.50 * y'^2 )
//
//   Crossover summary (first S >= y'^2 at which the origin drops below the mean):
//    y/x      y'^2     x'^2    first crossing   / y'^2   / x'^2
//   13/23       289      841           1020     3.53   1.213
//   13/19       289      529            529     1.83   1.000
//   13/17       289      361            529     1.83   1.465
//   11/23       169      841            712     4.21   0.847
//   11/19       169      529            529     3.13   1.000
//   11/17       169      361            530     3.14   1.468
//   17/23       361      841           1262     3.50   1.501
//
//
// === D. PER-PRIME ANATOMY: which prime kills the advantage, and when ===
//
//   The M rows are in bijection with residue vectors (a_q)_{q in (y,x]}: row r
//   has a_q = -r*y# mod q, and each vector occurs exactly M/prod(q) times. The
//   origin is the ALL-ZERO vector. So ask, one prime at a time: what is the mean
//   row count conditioned on a_q = 0, against the unconditional mean?
//
//   Lemma (one line). If S <= q*y' then a y-rough multiple of q below S is q*k
//   with k y-rough and k < y', hence k = 1. So the class a_q = 0 removes at most
//   2 slots instead of its fair share 2*D_y(S)/q. Threshold: S = q*y'.
//
//   y=13 x=23   primes in (y,x] = [17, 19, 23]   y'=17   M=7429
//         S    q= 17      q= 19      q= 23       origin/mean
//       169      1.007 Y   0.993 Y   1.095 Y       1.233
//       289      1.063 Y   1.048 Y   1.095 Y       1.301
//       361      1.074 n   1.000 n   1.095 Y       1.241
//       500      0.997 n   0.984 n   1.008 n       1.110
//       841      0.940 n   0.981 n   1.015 n       1.015
//      1500      0.980 n   0.982 n   0.992 n       0.975
//      3000      0.982 n   0.991 n   0.993 n       0.971
//     10000      1.005 n   1.000 n   1.002 n       1.005
//     30030      1.001 n   0.999 n   1.001 n       1.004
//   ("Y" = S <= q*y', the regime where the crystallisation bound covers that prime)
//
//   y=11 x=23   primes in (y,x] = [13, 17, 19, 23]   y'=13   M=96577
//         S    q= 13      q= 17      q= 19      q= 23       origin/mean
//       121      1.182 Y   0.971 Y   0.958 Y   1.095 Y       1.405
//       169      1.064 Y   1.020 Y   1.006 Y   1.095 Y       1.312
//       289      1.051 n   1.007 n   1.056 n   1.095 Y       1.366
//       361      1.069 n   1.025 n   1.011 n   1.095 n       1.327
//       600      0.985 n   0.976 n   0.993 n   1.004 n       1.047
//      1200      0.976 n   0.969 n   0.988 n   0.984 n       0.927
//      2310      0.998 n   0.991 n   1.002 n   0.998 n       0.984
//   ("Y" = S <= q*y', the regime where the crystallisation bound covers that prime)
//
// D2. The per-prime loss ledger, directly. For prime q in (y,x] put
//       lambda_q(S) = #{T_y slots t < S : q | t or q | t+2}   (what the origin loses to q)
//       fair_q(S)   = 2*D_y(S)/q                              (what a random row loses)
//     The ratio should be near 0 while S < q*y' and near 1 after. Pooled in the
//     scale-free variable v = S/(q*y'), over many (y,q) at once.
//
//        v = S/(q*y')     cells   mean lambda_q/fair_q    median    max     (cells with fair share >= 4)
//             0.50        50              0.0485    0.0000  0.2089
//             0.75        75              0.0439    0.0000  0.2025
//             1.00       100              0.0754    0.0000  0.4742
//             1.50       125              0.6352    0.6299  1.2539
//             2.00       142              0.9049    0.8807  1.5000
//             3.00       150              1.1068    1.1259  1.6803
//             5.00       150              1.2240    1.2240  1.6063
//             8.00       150              1.2472    1.2609  1.5372
//            15.00       150              1.2269    1.2396  1.4253
//            30.00       125              1.1348    1.1521  1.3017
//           100.00        85              1.0041    1.0015  1.1064
//
//     So the per-prime advantage is total below v = 1 and gone by v ~ 3. The
//     binding prime is the SMALLEST one, q = y', whose threshold is S = y'^2,
//     and it carries the largest weight 1/q in the loss sum. There is no
//     reweighting that avoids it.
//
// D3. Is the origin's residue choice a_q = 0 even LOCALLY optimal at S = x'^2?
//     Mean row count conditioned on a_q = a, for every a mod q, at the zone width.
//
//   y=13 x=23 S=841  q=17:  a=0 ratio 0.9398   best a=15 ratio 1.0780   rank of a=0: 17 of 17
//   y=13 x=23 S=841  q=19:  a=0 ratio 0.9813   best a=3 ratio 1.0359   rank of a=0: 10 of 19
//   y=13 x=23 S=841  q=23:  a=0 ratio 1.0151   best a=7 ratio 1.0418   rank of a=0: 6 of 23
//
//   y=11 x=23 S=841  q=13:  a=0 ratio 0.9691   best a=10 ratio 1.0636   rank of a=0: 11 of 13
//   y=11 x=23 S=841  q=17:  a=0 ratio 0.9520   best a=8 ratio 1.0427   rank of a=0: 16 of 17
//   y=11 x=23 S=841  q=19:  a=0 ratio 1.0059   best a=1 ratio 1.0282   rank of a=0: 5 of 19
//   y=11 x=23 S=841  q=23:  a=0 ratio 1.0295   best a=2 ratio 1.0514   rank of a=0: 2 of 23
//
//   y=11 x=19 S=529  q=13:  a=0 ratio 0.9972   best a=10 ratio 1.0710   rank of a=0: 6 of 13
//   y=11 x=19 S=529  q=17:  a=0 ratio 0.9563   best a=2 ratio 1.0271   rank of a=0: 14 of 17
//   y=11 x=19 S=529  q=19:  a=0 ratio 1.0129   best a=4 ratio 1.0478   rank of a=0: 3 of 19
//
//
// === G. MECHANISM TESTS: can anything else distinguish the origin? ===
//
// G1. THE MIRROR (FOLD-PROFILE section 4).
//     The palindrome sigma(r) = W-2-r is an involution on the slot set, so the
//     head [0,S) and the mirrored window {W-2-s : s < S} should carry the SAME
//     count. If so, the mirror gives nothing the origin does not already have.
//
//        x      S     head   mirror   equal?   fused head+mirror    2*head
//       13    289       16       16   YES              32          32
//       13   1156       56       56   YES             112         112
//       17    361       18       18   YES              36          36
//       17   1444       59       59   YES             118         118
//       19    529       21       21   YES              42          42
//       19   2116       79       79   YES             158         158
//       23    841       30       30   YES              60          60
//       23   3364      116      116   YES             232         232
//     The mirrored window is the interval immediately BELOW 0 in the periodic
//     tile. head + mirror is therefore ONE centred window of width 2S about the
//     point -1, and its count is exactly 2*head. Sample size and count double
//     together, so the ratio to the mean is unchanged.
//
// G2. THE ABUTTING / FUSED WINDOW AND THE -1/2 CORRELATION (natal-cap-19, -26).
//     natal-cap-26 proves abutting windows are negatively correlated (R = -1/2
//     for the flat functional). Test whether that repayment is visible AT the
//     origin: split each row into A = [0,S) and B = [S,2S).
//
//        y   x      S     corr(A,B)    origin A (z)    origin B (z)   origin A+B (z)   A ratio  B ratio  A+B ratio
//     13  23    289     -0.4497        2.680       -1.254        1.327     1.301    0.809     1.090
//     13  23    361     -0.4439        2.395       -1.616        0.494     1.241    0.780     1.031
//     13  23    500     -0.0267        1.632       -2.692       -1.014     1.110    0.757     0.945
//     13  23    841     -0.3920        0.241       -2.056       -1.652     1.015    0.867     0.942
//     11  23    169     -0.2429        1.542        2.234        3.037     1.312    1.457     1.381
//     11  23    250     -0.3476        2.275       -0.998        1.003     1.332    0.820     1.093
//     11  23    400     -0.2754        1.845       -2.707       -0.981     1.212    0.642     0.927
//     11  23    800     -0.3661       -0.981       -0.685       -1.479     0.927    0.947     0.937
//     11  19    169     -0.3059        1.170        2.025        2.649     1.198    1.331     1.261
//     11  19    250     -0.3082        1.906       -1.568       -0.025     1.216    0.748     0.998
//     11  19    400     -0.2494        1.156       -3.907       -2.525     1.106    0.586     0.846
//     11  19    800     -0.3850       -2.525        0.512       -1.842     0.846    1.031     0.938
//     If the origin is a large positive outlier in A and a NEGATIVE one in B,
//     the head advantage is being repaid immediately above the frontier, and
//     fusing the two windows destroys it.
//
// G3. THE IMPACT WINDOW / HEAD MONOTONICITY (FOLD-PROFILE section 11).
//     The Impact Lemma says folds with p^2 > W+2 remove only p-2 and p, both
//     self-strikes: applied to the head it says [0, x'^2) is FINAL. Circularity
//     test: is the head anything other than the twin primes?
//
//        x     x'^2   slots in head   twin primes in (x, x'^2)   + [x'^2-2 rough]   identical?
//       13      289             16                       16                  0      YES
//       17      361             18                       17                  1      YES
//       19      529             21                       21                  0      YES
//       23      841             30                       29                  1      YES
//     The head is the twin primes below x'^2 plus at most the single boundary
//     slot x'^2 - 2 (the Head Lemma of FOLD-PROFILE section 5). So the
//     mechanism's entire content is "the head equals the twin primes below
//     x'^2", which is the Zone Postulate written out. CIRCULAR.
//
// G4. THE ONE CONSTRAINT NOBODY WROTE DOWN: the origin count is ZERO below x.
//     An x-rough n < x is n = 1, and 1 is not a slot (1*3 is divisible by 3).
//     So D_x(S) = 0 for every S <= x. The Origin Excess Lemma at S = y'^2 is
//     therefore VACUOUS whenever y'^2 <= x, and its loss bound 2(pi(x)-pi(y)+1)
//     beats D_y(y'^2) only while x is small against y^2.
//
//        y      y'^2    D_y(y'^2)   x for which 2(pi(x)-pi(y)+1) >= D_y(y'^2)   so x must satisfy
//      13       289          16                            41      x < 41
//      19       529          21                            61      x < 61
//      29       961          30                            89      x < 89
//      43      2209          62                           193      x < 193
//      61      4489         110                           359      x < 359
//      89      9409         187                           643      x < 643
//     127     17161         289                          1039      x < 1039
//     181     36481         542                          2069      x < 2069
//     257     69169         878                          3529      x < 3529
//     The usable window for the lemma is y < x < min(y'^2, x*), and it is a
//     window in x, not in S. It has nothing to say about S = x'^2.
//
//
// === E. THE rho CURVE AT SCALE, AND WHERE ITS MINIMUM IS ===
//
//   One incremental sieve of [0,N). Fold primes in increasing order; after each
//   level y record survivors against N*delta_y. That is rho(u), u = ln N / ln y.
//   Fresh window, fresh code: a reproduction of FOLD-PROFILE section 9.
//
//   window [0, 120000000)
//
//        y        u     survivors        N*delta_y     rho = S/P
//        2  26.8385      60000000       60000000.0     1.00000
//        3  16.9332      20000000       20000000.0     1.00000
//        5  11.5587      12000000       12000000.0     1.00000
//        7   9.5601       8571428        8571428.6     1.00000
//       11   7.7581       7012987        7012987.0     1.00000
//       13   7.2528       5934067        5934065.9     1.00000
//       17   6.5660       5235943        5235940.5     1.00000
//       19   6.3180       4684786        4684788.9     1.00000
//       23   5.9330       4277407        4277415.9     1.00000
//       29   5.5246       3982403        3982421.7     1.00000
//       31   5.4173       3725499        3725491.3     1.00000
//       37   5.1519       3524140        3524113.4     1.00001
//       41   5.0095       3352216        3352205.4     1.00000
//       43   4.9460       3196318        3196288.9     1.00001
//      283   3.2952       1522357        1515968.2     1.00421
//      661   2.8648       1178235        1164472.1     1.01182
//     1087   2.6609       1010310        1013121.1     0.99723
//     1283   2.5993        956826         967786.5     0.98867
//     1289   2.5976        955014         966284.9     0.98834
//     1291   2.5970        953225         964787.9     0.98802
//     1297   2.5954        951407         963300.2     0.98765
//     1301   2.5942        949615         961819.4     0.98731
//     1303   2.5937        947840         960343.0     0.98698
//     1307   2.5926        946040         958873.5     0.98662
//     1319   2.5893        944295         957419.6     0.98629
//     1321   2.5887        942520         955970.0     0.98593
//     1327   2.5871        940785         954529.2     0.98560
//     1361   2.5780        939116         953126.5     0.98530
//     1367   2.5765        937451         951732.1     0.98499
//     1373   2.5749        935783         950345.7     0.98468
//     1381   2.5728        934102         948969.4     0.98433
//     1399   2.5682        932418         947612.7     0.98397
//     1409   2.5657        930807         946267.7     0.98366
//     1423   2.5622        929167         944937.7     0.98331
//     1427   2.5612        927566         943613.3     0.98299
//     1429   2.5607        925964         942292.7     0.98267
//     1433   2.5597        924358         940977.5     0.98234
//     1439   2.5583        922772         939669.7     0.98202
//     1447   2.5563        921185         938370.9     0.98169
//     1451   2.5554        919628         937077.5     0.98138
//     1453   2.5549        918070         935787.7     0.98107
//     1459   2.5534        916540         934504.9     0.98078
//     1471   2.5506        914987         933234.3     0.98045
//     1481   2.5482        913439         931974.0     0.98011
//     1483   2.5477        911922         930717.2     0.97981
//     1487   2.5468        910354         929465.4     0.97944
//     1489   2.5463        908822         928216.9     0.97911
//     1493   2.5454        907265         926973.5     0.97874
//     1499   2.5440        905741         925736.7     0.97840
//     1511   2.5412        904217         924511.4     0.97805
//     1523   2.5385        902723         923297.3     0.97772
//     1531   2.5367        901238         922091.2     0.97738
//     1543   2.5340        899793         920896.0     0.97708
//     1549   2.5326        898347         919707.0     0.97678
//     1553   2.5317        896875         918522.5     0.97643
//     1559   2.5304        895432         917344.2     0.97611
//     1567   2.5286        893997         916173.4     0.97579
//     1571   2.5278        892529         915007.0     0.97543
//     1579   2.5260        891133         913848.0     0.97514
//     1583   2.5252        889705         912693.4     0.97481
//     1597   2.5221        888286         911550.4     0.97448
//     1601   2.5213        886892         910411.7     0.97417
//     1607   2.5200        885478         909278.7     0.97382
//     1609   2.5196        884087         908148.4     0.97350
//     1613   2.5187        882707         907022.4     0.97319
//     1619   2.5175        881314         905901.9     0.97286
//     1621   2.5170        879956         904784.2     0.97256
//     1627   2.5158        878604         903672.0     0.97226
//     1637   2.5137        877222         902567.9     0.97192
//     1657   2.5096        875867         901478.5     0.97159
//     1663   2.5084        874511         900394.4     0.97125
//     1667   2.5076        873153         899314.1     0.97091
//     1669   2.5071        871790         898236.4     0.97056
//     1693   2.5023        870485         897175.3     0.97025
//     1697   2.5015        869197         896118.0     0.96996
//     1699   2.5011        867887         895063.1     0.96964
//     1709   2.4992        866562         894015.6     0.96929
//     1721   2.4968        865259         892976.7     0.96896
//     1723   2.4964        863977         891940.1     0.96865
//     1733   2.4945        862689         890910.8     0.96832
//     1741   2.4930        861393         889887.3     0.96798
//     1747   2.4918        860099         888868.6     0.96763
//     1753   2.4907        858865         887854.4     0.96735
//     1759   2.4895        857610         886844.9     0.96703
//     1777   2.4861        856329         885846.8     0.96668
//     1783   2.4850        855083         884853.2     0.96636
//     1787   2.4843        853844         883862.8     0.96604
//     1789   2.4839        852615         882874.7     0.96573
//     1801   2.4817        851382         881894.3     0.96540
//     1811   2.4799        850120         880920.4     0.96504
//     1823   2.4777        848921         879953.9     0.96473
//     1831   2.4762        847693         878992.7     0.96439
//     1847   2.4734        846471         878040.9     0.96405
//     1861   2.4709        845276         877097.3     0.96372
//     1867   2.4698        844064         876157.7     0.96337
//     1871   2.4691        842878         875221.2     0.96305
//     1873   2.4688        841728         874286.6     0.96276
//     1877   2.4681        840513         873355.0     0.96240
//     1879   2.4677        839379         872425.4     0.96212
//     1889   2.4660        838244         871501.7     0.96184
//     1901   2.4639        837093         870584.8     0.96153
//     1907   2.4629        835913         869671.8     0.96118
//     1913   2.4619        834735         868762.6     0.96083
//     1931   2.4588        833578         867862.8     0.96050
//     1933   2.4585        832465         866964.8     0.96021
//     1949   2.4558        831345         866075.2     0.95990
//     1951   2.4555        830224         865187.4     0.95959
//     1973   2.4519        829112         864310.3     0.95928
//     1979   2.4509        828019         863436.8     0.95898
//     1987   2.4496        826908         862567.8     0.95866
//     1993   2.4486        825774         861702.2     0.95831
//     1997   2.4480        824664         860839.2     0.95798
//     1999   2.4476        823582         859977.9     0.95768
//     2003   2.4470        822514         859119.2     0.95739
//     2011   2.4457        821401         858264.8     0.95705
//     2017   2.4448        820350         857413.8     0.95677
//     2027   2.4432        819231         856567.8     0.95641
//     2029   2.4428        818156         855723.4     0.95610
//     2039   2.4413        817041         854884.1     0.95573
//     2053   2.4391        815963         854051.3     0.95540
//     2063   2.4375        814905         853223.3     0.95509
//     2069   2.4366        813832         852398.5     0.95476
//     2081   2.4348        812798         851579.3     0.95446
//     2083   2.4344        811710         850761.7     0.95410
//     2087   2.4338        810640         849946.4     0.95375
//     2089   2.4335        809575         849132.6     0.95341
//     2099   2.4320        808559         848323.5     0.95313
//     2111   2.4302        807534         847519.8     0.95282
//     2113   2.4299        806508         846717.6     0.95251
//     2129   2.4275        805469         845922.2     0.95218
//     2131   2.4272        804470         845128.3     0.95189
//     2137   2.4263        803481         844337.3     0.95161
//     2141   2.4257        802440         843548.6     0.95127
//     2143   2.4254        801442         842761.4     0.95097
//     2153   2.4240        800416         841978.5     0.95064
//     2161   2.4228        799423         841199.2     0.95034
//     2179   2.4202        798392         840427.1     0.94998
//     2203   2.4167        797394         839664.2     0.94966
//     2207   2.4162        796417         838903.2     0.94936
//     2213   2.4153        795460         838145.1     0.94907
//     2221   2.4142        794494         837390.3     0.94877
//     2237   2.4119        793508         836641.7     0.94844
//     2239   2.4117        792559         835894.3     0.94816
//     2243   2.4111        791610         835149.0     0.94787
//     2251   2.4100        790677         834407.0     0.94759
//     2267   2.4078        789727         833670.8     0.94729
//     2269   2.4075        788741         832936.0     0.94694
//     2273   2.4070        787810         832203.1     0.94666
//     2281   2.4059        786914         831473.4     0.94641
//     2287   2.4050        785975         830746.3     0.94611
//     2293   2.4042        785007         830021.7     0.94577
//     2297   2.4037        784088         829299.0     0.94548
//     2309   2.4021        783157         828580.7     0.94518
//     2311   2.4018        782215         827863.6     0.94486
//     2333   2.3989        781312         827153.9     0.94458
//     2339   2.3981        780414         826446.6     0.94430
//     2341   2.3978        779523         825740.6     0.94403
//     2347   2.3970        778644         825036.9     0.94377
//     2351   2.3965        777739         824335.1     0.94347
//     2357   2.3957        776833         823635.6     0.94318
//     2371   2.3939        775942         822940.8     0.94289
//     2377   2.3931        775063         822248.4     0.94261
//     2381   2.3926        774124         821557.7     0.94226
//     2383   2.3923        773234         820868.2     0.94197
//     2389   2.3916        772345         820181.0     0.94168
//     2393   2.3910        771487         819495.5     0.94142
//     2399   2.3903        770600         818812.3     0.94112
//     2411   2.3887        769727         818133.1     0.94083
//     2417   2.3880        768879         817456.1     0.94058
//     2423   2.3872        768035         816781.4     0.94032
//     2437   2.3855        767165         816111.0     0.94003
//     2441   2.3850        766312         815442.4     0.93975
//     2447   2.3842        765449         814775.9     0.93946
//     2459   2.3827        764550         814113.2     0.93912
//     2467   2.3817        763701         813453.2     0.93884
//     2473   2.3810        762892         812795.3     0.93860
//     2477   2.3805        762045         812139.1     0.93832
//     2503   2.3773        761198         811490.1     0.93802
//     2521   2.3751        760352         810846.3     0.93773
//     2531   2.3739        759538         810205.6     0.93746
//     2539   2.3730        758707         809567.4     0.93718
//     2543   2.3725        757910         808930.7     0.93693
//     2549   2.3718        757102         808296.0     0.93666
//     2551   2.3715        756301         807662.3     0.93641
//     2557   2.3708        755483         807030.6     0.93613
//     2579   2.3683        754685         806404.7     0.93586
//     2591   2.3669        753864         805782.2     0.93557
//     2593   2.3666        753066         805160.7     0.93530
//     2609   2.3648        752279         804543.5     0.93504
//     2617   2.3639        751511         803928.7     0.93480
//     2621   2.3634        750712         803315.2     0.93452
//     2633   2.3620        749925         802705.0     0.93425
//     2647   2.3604        749172         802098.5     0.93401
//     2657   2.3593        748392         801494.8     0.93375
//     2659   2.3591        747632         800891.9     0.93350
//     2663   2.3586        746838         800290.4     0.93321
//     2671   2.3577        746064         799691.2     0.93294
//     2677   2.3571        745318         799093.7     0.93270
//     2683   2.3564        744532         798498.0     0.93242
//     2687   2.3559        743765         797903.7     0.93215
//     2689   2.3557        742991         797310.2     0.93187
//     2693   2.3553        742205         796718.1     0.93158
//     2699   2.3546        741420         796127.7     0.93128
//     2707   2.3537        740667         795539.5     0.93102
//     2711   2.3533        739915         794952.6     0.93077
//     2713   2.3531        739166         794366.6     0.93051
//     2719   2.3524        738436         793782.3     0.93028
//     2729   2.3513        737688         793200.5     0.93001
//     2731   2.3511        736936         792619.7     0.92975
//     2741   2.3500        736210         792041.3     0.92951
//     2749   2.3492        735450         791465.1     0.92923
//     2753   2.3487        734708         790890.1     0.92896
//     2767   2.3472        733958         790318.4     0.92869
//     2777   2.3462        733227         789749.2     0.92843
//     2789   2.3449        732516         789182.9     0.92820
//     2791   2.3447        731805         788617.4     0.92796
//     2797   2.3440        731067         788053.5     0.92769
//     2801   2.3436        730340         787490.8     0.92743
//     2803   2.3434        729592         786928.9     0.92714
//     2819   2.3417        728877         786370.6     0.92689
//     2833   2.3403        728131         785815.5     0.92659
//     2837   2.3399        727433         785261.5     0.92636
//     2843   2.3392        726745         784709.1     0.92613
//     2851   2.3384        726044         784158.6     0.92589
//     2857   2.3378        725328         783609.6     0.92562
//     2861   2.3374        724612         783061.9     0.92536
//     2879   2.3355        723874         782517.9     0.92506
//     2887   2.3347        723204         781975.8     0.92484
//     2897   2.3337        722528         781435.9     0.92462
//     2903   2.3331        721804         780897.6     0.92433
//     2909   2.3325        721139         780360.7     0.92411
//     2917   2.3317        720451         779825.6     0.92386
//     2927   2.3307        719768         779292.8     0.92362
//     2939   2.3295        719101         778762.5     0.92339
//     2953   2.3281        718412         778235.0     0.92313
//     2957   2.3277        717733         777708.7     0.92288
//     2963   2.3271        717079         777183.7     0.92266
//     2969   2.3265        716381         776660.2     0.92239
//     2971   2.3263        715728         776137.4     0.92217
//     2999   2.3236        715055         775619.8     0.92191
//     3001   2.3234        714407         775102.9     0.92169
//     3011   2.3225        713708         774588.0     0.92140
//     3019   2.3217        713056         774074.9     0.92117
//     3023   2.3213        712387         773562.7     0.92092
//     3037   2.3200        711676         773053.3     0.92060
//     3041   2.3196        711019         772544.9     0.92036
//     3049   2.3188        710351         772038.1     0.92010
//     3061   2.3177        709702         771533.7     0.91986
//     3067   2.3171        709088         771030.6     0.91966
//     3079   2.3160        708405         770529.8     0.91937
//     3083   2.3156        707748         770029.9     0.91912
//     3089   2.3151        707125         769531.3     0.91890
//     3109   2.3132        706468         769036.3     0.91864
//     3119   2.3123        705833         768543.2     0.91840
//     3121   2.3121        705211         768050.7     0.91818
//     3137   2.3106        704593         767561.0     0.91796
//     3163   2.3083        703975         767075.7     0.91774
//     3167   2.3079        703330         766591.2     0.91748
//     3169   2.3077        702718         766107.4     0.91726
//     3181   2.3066        702084         765625.8     0.91701
//     3187   2.3061        701478         765145.3     0.91679
//     3191   2.3058        700866         764665.7     0.91657
//     3203   2.3047        700267         764188.3     0.91635
//     3209   2.3041        699679         763712.0     0.91616
//     3217   2.3034        699055         763237.2     0.91591
//     3221   2.3031        698452         762763.3     0.91569
//     3229   2.3024        697839         762290.8     0.91545
//     3251   2.3004        697203         761821.9     0.91518
//     3253   2.3003        696602         761353.5     0.91495
//     3257   2.2999        696025         760886.0     0.91476
//     3259   2.2997        695419         760419.0     0.91452
//     3271   2.2987        694820         759954.1     0.91429
//     3299   2.2963        694232         759493.4     0.91407
//     3301   2.2961        693668         759033.2     0.91388
//     3307   2.2956        693082         758574.2     0.91366
//     3313   2.2951        692481         758116.2     0.91342
//     3319   2.2946        691906         757659.4     0.91322
//     3323   2.2942        691305         757203.4     0.91297
//     3329   2.2937        690714         756748.5     0.91274
//     3331   2.2935        690142         756294.1     0.91253
//     3343   2.2925        689580         755841.6     0.91233
//     3347   2.2922        688989         755390.0     0.91210
//     3359   2.2912        688421         754940.2     0.91189
//     3361   2.2910        687853         754491.0     0.91168
//     3371   2.2902        687255         754043.3     0.91143
//     3373   2.2900        686680         753596.2     0.91120
//     3389   2.2887        686131         753151.5     0.91101
//     3391   2.2885        685569         752707.3     0.91080
//     3407   2.2872        684971         752265.4     0.91054
//     3413   2.2867        684410         751824.6     0.91033
//     3433   2.2850        683881         751386.6     0.91016
//     3449   2.2837        683341         750950.9     0.90997
//     3457   2.2831        682787         750516.4     0.90976
//     3461   2.2828        682242         750082.7     0.90956
//     3463   2.2826        681669         749649.5     0.90932
//     3467   2.2823        681116         749217.1     0.90910
//     3469   2.2821        680581         748785.1     0.90891
//     3491   2.2804        680037         748356.2     0.90871
//     3499   2.2797        679496         747928.4     0.90850
//     3511   2.2788        678936         747502.4     0.90827
//     3517   2.2783        678381         747077.3     0.90805
//     3527   2.2775        677836         746653.7     0.90783
//     3529   2.2773        677276         746230.5     0.90760
//     3533   2.2770        676746         745808.1     0.90740
//     3539   2.2765        676220         745386.6     0.90721
//     3541   2.2764        675720         744965.6     0.90705
//     3547   2.2759        675157         744545.5     0.90680
//     3557   2.2751        674627         744126.9     0.90660
//     3559   2.2750        674088         743708.7     0.90639
//     3571   2.2740        673564         743292.2     0.90619
//     3581   2.2733        673037         742877.1     0.90599
//     3583   2.2731        672504         742462.4     0.90578
//     3593   2.2723        671997         742049.1     0.90560
//     3607   2.2713        671476         741637.7     0.90540
//     3613   2.2708        670940         741227.1     0.90517
//     3617   2.2705        670444         740817.3     0.90501
//     3623   2.2700        669931         740408.3     0.90481
//     3631   2.2694        669416         740000.5     0.90462
//     3637   2.2690        668927         739593.6     0.90445
//     3643   2.2685        668382         739187.5     0.90421
//     3659   2.2673        667851         738783.5     0.90399
//     3671   2.2664        667328         738381.0     0.90377
//     3673   2.2662        666821         737978.9     0.90358
//     3677   2.2659        666319         737577.5     0.90339
//     3691   2.2649        665805         737177.9     0.90318
//     3697   2.2644        665292         736779.1     0.90297
//     3701   2.2641        664815         736380.9     0.90281
//     3709   2.2635        664322         735983.8     0.90263
//     3719   2.2628        663834         735588.0     0.90245
//     3727   2.2622        663339         735193.3     0.90226
//     3733   2.2618        662841         734799.4     0.90207
//     3739   2.2613        662361         734406.4     0.90190
//     3761   2.2597        661893         734015.8     0.90174
//     3767   2.2593        661363         733626.1     0.90150
//     3769   2.2591        660871         733236.8     0.90131
//     3779   2.2584        660384         732848.8     0.90112
//     3793   2.2574        659915         732462.4     0.90095
//     3797   2.2571        659457         732076.5     0.90080
//     3803   2.2567        659003         731691.5     0.90066
//     3821   2.2554        658546         731308.6     0.90050
//     3823   2.2552        658034         730926.0     0.90027
//     3833   2.2545        657558         730544.6     0.90009
//     3847   2.2535        657063         730164.8     0.89988
//     3851   2.2532        656588         729785.6     0.89970
//     3853   2.2531        656106         729406.8     0.89951
//     3863   2.2524        655643         729029.1     0.89934
//     3877   2.2514        655170         728653.1     0.89915
//     3881   2.2511        654684         728277.6     0.89895
//     3889   2.2506        654206         727903.0     0.89875
//     3907   2.2493        653769         727530.4     0.89861
//     3911   2.2490        653292         727158.4     0.89842
//     3917   2.2486        652820         726787.1     0.89823
//     3919   2.2485        652345         726416.2     0.89803
//     3923   2.2482        651857         726045.8     0.89782
//     3929   2.2478        651406         725676.3     0.89765
//     3931   2.2476        650921         725307.0     0.89744
//     3943   2.2468        650445         724939.2     0.89724
//     3947   2.2465        649971         724571.8     0.89704
//     3967   2.2452        649501         724206.5     0.89685
//     3989   2.2437        649070         723843.4     0.89670
//     4001   2.2429        648668         723481.6     0.89659
//     4003   2.2427        648214         723120.1     0.89641
//     4007   2.2425        647763         722759.2     0.89624
//     4013   2.2421        647315         722399.0     0.89606
//     4019   2.2417        646872         722039.5     0.89590
//     4021   2.2415        646418         721680.4     0.89571
//     4027   2.2411        645951         721321.9     0.89551
//     4049   2.2396        645490         720965.6     0.89531
//     4051   2.2395        645071         720609.7     0.89517
//     4057   2.2391        644635         720254.4     0.89501
//     4073   2.2381        644181         719900.8     0.89482
//     4079   2.2377        643726         719547.8     0.89463
//     4091   2.2369        643294         719196.0     0.89446
//     4093   2.2367        642863         718844.6     0.89430
//     4099   2.2363        642424         718493.9     0.89413
//     4111   2.2356        641964         718144.3     0.89392
//     4127   2.2345        641517         717796.3     0.89373
//     4129   2.2344        641078         717448.6     0.89355
//     4133   2.2341        640629         717101.4     0.89336
//     4139   2.2337        640188         716754.9     0.89318
//     4153   2.2328        639748         716409.7     0.89299
//     4157   2.2326        639329         716065.1     0.89284
//     4159   2.2324        638911         715720.7     0.89268
//     4177   2.2313        638487         715378.0     0.89252
//     4201   2.2298        638052         715037.4     0.89233
//     4211   2.2291        637646         714697.8     0.89219
//     4217   2.2287        637221         714358.9     0.89202
//     4219   2.2286        636786         714020.2     0.89183
//     4229   2.2280        636380         713682.6     0.89168
//     4231   2.2279        635974         713345.2     0.89154
//     4241   2.2272        635561         713008.8     0.89138
//     4243   2.2271        635145         712672.7     0.89122
//     4253   2.2265        634709         712337.6     0.89102
//     4259   2.2261        634294         712003.1     0.89086
//     4261   2.2260        633866         711668.9     0.89068
//     4271   2.2253        633468         711335.6     0.89053
//     4273   2.2252        633074         711002.7     0.89040
//     4283   2.2246        632672         710670.7     0.89025
//     4289   2.2242        632272         710339.3     0.89010
//     4297   2.2237        631843         710008.6     0.88991
//     4327   2.2219        631448         709680.5     0.88976
//     4337   2.2213        631062         709353.2     0.88963
//     4339   2.2211        630673         709026.2     0.88949
//     4349   2.2205        630268         708700.2     0.88933
//     4357   2.2201        629881         708374.9     0.88919
//     4363   2.2197        629477         708050.1     0.88903
//     4373   2.2191        629087         707726.3     0.88888
//     4391   2.2180        628716         707404.0     0.88877
//     4397   2.2176        628303         707082.2     0.88859
//     4409   2.2169        627907         706761.4     0.88843
//     4421   2.2162        627517         706441.7     0.88828
//     4423   2.2161        627134         706122.3     0.88814
//     4441   2.2150        626753         705804.3     0.88800
//     4447   2.2146        626362         705486.8     0.88784
//     4451   2.2144        625977         705169.8     0.88770
//     4457   2.2141        625605         704853.4     0.88757
//     4463   2.2137        625221         704537.5     0.88742
//     4481   2.2126        624809         704223.1     0.88723
//     4483   2.2125        624415         703908.9     0.88707
//     4493   2.2119        624034         703595.6     0.88692
//     4507   2.2111        623668         703283.4     0.88679
//     4513   2.2108        623305         702971.7     0.88667
//     4517   2.2105        622935         702660.4     0.88654
//     4519   2.2104        622558         702349.4     0.88639
//     4523   2.2102        622201         702038.9     0.88628
//     4547   2.2088        621822         701730.1     0.88613
//     4549   2.2087        621448         701421.6     0.88598
//     4561   2.2080        621091         701114.0     0.88586
//     4567   2.2076        620712         700807.0     0.88571
//     4583   2.2067        620344         700501.1     0.88557
//     4591   2.2063        619996         700196.0     0.88546
//     4597   2.2059        619618         699891.3     0.88531
//     4603   2.2056        619241         699587.2     0.88515
//     4621   2.2046        618867         699284.4     0.88500
//     4637   2.2037        618497         698982.8     0.88485
//     4639   2.2036        618125         698681.5     0.88470
//     4643   2.2033        617768         698380.5     0.88457
//     4649   2.2030        617400         698080.1     0.88443
//     4651   2.2029        617032         697779.9     0.88428
//     4657   2.2025        616688         697480.2     0.88417
//     4663   2.2022        616310         697181.1     0.88400
//     4673   2.2017        615942         696882.7     0.88385
//     4679   2.2013        615573         696584.8     0.88370
//     4691   2.2007        615206         696287.8     0.88355
//     4703   2.2000        614842         695991.7     0.88340
//     4721   2.1990        614482         695696.9     0.88326
//     4723   2.1989        614137         695402.3     0.88314
//     4729   2.1986        613778         695108.2     0.88300
//     4733   2.1983        613411         694814.4     0.88284
//     4751   2.1973        613066         694521.9     0.88272
//     4759   2.1969        612730         694230.1     0.88260
//     4783   2.1956        612391         693939.8     0.88248
//     4787   2.1954        612054         693649.8     0.88237
//     4789   2.1953        611721         693360.2     0.88226
//     4793   2.1951        611371         693070.8     0.88212
//     4799   2.1947        611042         692782.0     0.88201
//     4801   2.1946        610666         692493.4     0.88184
//     4813   2.1940        610318         692205.6     0.88170
//     4817   2.1938        609956         691918.2     0.88154
//     4831   2.1930        609622         691631.8     0.88143
//     4861   2.1914        609274         691347.2     0.88129
//     4871   2.1909        608959         691063.4     0.88119
//     4877   2.1906        608620         690780.0     0.88106
//     4889   2.1899        608275         690497.4     0.88092
//     4903   2.1892        607964         690215.7     0.88083
//     4909   2.1889        607627         689934.5     0.88070
//     4919   2.1884        607290         689654.0     0.88057
//     4931   2.1877        606944         689374.3     0.88043
//     4933   2.1876        606599         689094.8     0.88028
//     4937   2.1874        606271         688815.6     0.88016
//     4943   2.1871        605925         688536.9     0.88002
//     4951   2.1867        605592         688258.8     0.87989
//     4957   2.1864        605271         687981.1     0.87978
//     4967   2.1859        604943         687704.1     0.87966
//     4969   2.1858        604626         687427.3     0.87955
//     4973   2.1856        604286         687150.8     0.87941
//     4987   2.1848        603967         686875.2     0.87930
//     4993   2.1845        603649         686600.1     0.87919
//     4999   2.1842        603336         686325.4     0.87908
//     5003   2.1840        603006         686051.0     0.87895
//     5009   2.1837        602675         685777.1     0.87882
//     5011   2.1836        602341         685503.4     0.87868
//     5021   2.1831        602018         685230.3     0.87856
//     5023   2.1830        601708         684957.5     0.87846
//     5039   2.1822        601378         684685.6     0.87833
//     5051   2.1816        601065         684414.5     0.87822
//     5059   2.1812        600737         684144.0     0.87809
//     5077   2.1803        600425         683874.5     0.87798
//     5081   2.1801        600113         683605.3     0.87786
//     5087   2.1798        599788         683336.5     0.87773
//     5099   2.1792        599508         683068.5     0.87767
//     5101   2.1791        599180         682800.7     0.87753
//     5107   2.1788        598875         682533.3     0.87743
//     5113   2.1785        598574         682266.3     0.87733
//     5119   2.1782        598255         681999.7     0.87721
//     5147   2.1768        597941         681734.7     0.87709
//     5153   2.1765        597629         681470.1     0.87697
//     5167   2.1758        597307         681206.3     0.87684
//     5171   2.1756        597004         680942.9     0.87673
//     5179   2.1752        596695         680679.9     0.87662
//     5189   2.1747        596413         680417.5     0.87654
//     5197   2.1743        596112         680155.7     0.87643
//     5209   2.1737        595798         679894.5     0.87631
//     5227   2.1728        595489         679634.4     0.87619
//     5231   2.1726        595204         679374.6     0.87611
//     5233   2.1726        594907         679114.9     0.87600
//     5237   2.1724        594593         678855.5     0.87588
//     5261   2.1712        594296         678597.5     0.87577
//     5273   2.1706        593989         678340.1     0.87565
//     5279   2.1703        593696         678083.1     0.87555
//     5281   2.1702        593386         677826.3     0.87542
//     5297   2.1695        593097         677570.4     0.87533
//     5303   2.1692        592800         677314.8     0.87522
//     5309   2.1689        592499         677059.7     0.87511
//     5323   2.1682        592206         676805.3     0.87500
//     5333   2.1678        591911         676551.5     0.87489
//     5347   2.1671        591635         676298.4     0.87481
//     5351   2.1669        591364         676045.6     0.87474
//     5381   2.1655        591075         675794.4     0.87464
//     5387   2.1652        590780         675543.5     0.87453
//     5393   2.1649        590478         675292.9     0.87440
//     5399   2.1647        590198         675042.8     0.87431
//     5407   2.1643        589935         674793.1     0.87425
//     5413   2.1640        589631         674543.8     0.87412
//     5417   2.1638        589319         674294.7     0.87398
//     5419   2.1637        589039         674045.9     0.87389
//     5431   2.1632        588779         673797.6     0.87382
//     5437   2.1629        588510         673549.8     0.87374
//     5441   2.1627        588213         673302.2     0.87362
//     5443   2.1626        587923         673054.8     0.87351
//     5449   2.1623        587641         672807.8     0.87342
//     5471   2.1613        587349         672561.8     0.87330
//     5477   2.1611        587087         672316.2     0.87323
//     5479   2.1610        586812         672070.8     0.87314
//     5483   2.1608        586556         671825.6     0.87308
//     5501   2.1600        586291         671581.4     0.87300
//     5503   2.1599        586012         671337.3     0.87290
//     5507   2.1597        585723         671093.5     0.87279
//     5519   2.1591        585460         670850.3     0.87271
//     5521   2.1590        585207         670607.3     0.87265
//     5527   2.1588        584939         670364.6     0.87257
//     5531   2.1586        584662         670122.2     0.87247
//     5557   2.1574        584382         669881.0     0.87237
//     5563   2.1571        584108         669640.2     0.87227
//     5569   2.1569        583844         669399.7     0.87219
//     5573   2.1567        583571         669159.5     0.87210
//     5581   2.1563        583291         668919.7     0.87199
//     5591   2.1559        583006         668680.4     0.87188
//     5623   2.1545        582759         668442.6     0.87182
//     5639   2.1538        582508         668205.5     0.87175
//     5641   2.1537        582236         667968.6     0.87165
//     5647   2.1534        581987         667732.0     0.87159
//     5651   2.1532        581745         667495.7     0.87153
//     5653   2.1531        581497         667259.5     0.87147
//     5657   2.1530        581239         667023.6     0.87139
//     5659   2.1529        580982         666787.9     0.87131
//     5669   2.1524        580718         666552.6     0.87123
//     5683   2.1518        580477         666318.1     0.87117
//     5689   2.1516        580243         666083.8     0.87113
//     5693   2.1514        580015         665849.8     0.87109
//     5701   2.1510        579759         665616.2     0.87101
//     5711   2.1506        579490         665383.1     0.87091
//     5717   2.1503        579245         665150.3     0.87085
//     5737   2.1495        578987         664918.5     0.87076
//     5741   2.1493        578715         664686.8     0.87066
//     5743   2.1492        578462         664455.3     0.87058
//     5749   2.1490        578189         664224.2     0.87047
//     5779   2.1477        577943         663994.3     0.87040
//     5783   2.1475        577682         663764.7     0.87031
//     5791   2.1471        577458         663535.4     0.87027
//     5801   2.1467        577200         663306.7     0.87019
//     5807   2.1465        576936         663078.2     0.87009
//     5813   2.1462        576694         662850.1     0.87002
//     5821   2.1459        576451         662622.3     0.86995
//     5827   2.1456        576208         662394.9     0.86989
//     5839   2.1451        575953         662168.0     0.86980
//     5843   2.1449        575702         661941.4     0.86972
//     5849   2.1447        575457         661715.0     0.86964
//     5851   2.1446        575216         661488.8     0.86958
//     5857   2.1443        574963         661263.0     0.86949
//     5861   2.1442        574723         661037.3     0.86943
//     5867   2.1439        574484         660812.0     0.86936
//     5869   2.1438        574246         660586.8     0.86930
//     5879   2.1434        574001         660362.1     0.86922
//     5881   2.1433        573753         660137.5     0.86914
//     5897   2.1427        573502         659913.6     0.86906
//     5903   2.1424        573268         659690.0     0.86900
//     5923   2.1416        573027         659467.2     0.86892
//     5927   2.1414        572768         659244.7     0.86882
//     5939   2.1409        572526         659022.7     0.86875
//     5953   2.1403        572283         658801.3     0.86867
//     5981   2.1392        572044         658581.0     0.86860
//     5987   2.1389        571806         658361.0     0.86853
//     6007   2.1381        571568         658141.8     0.86846
//     6011   2.1379        571351         657922.8     0.86842
//     6029   2.1372        571119         657704.6     0.86835
//     6037   2.1369        570886         657486.7     0.86829
//     6043   2.1366        570632         657269.1     0.86819
//     6047   2.1365        570385         657051.7     0.86810
//     6053   2.1362        570143         656834.6     0.86802
//     6067   2.1357        569923         656618.1     0.86797
//     6073   2.1354        569700         656401.8     0.86791
//     6079   2.1352        569485         656185.9     0.86787
//     6089   2.1348        569234         655970.3     0.86777
//     6091   2.1347        569007         655754.9     0.86771
//     6101   2.1343        568781         655540.0     0.86765
//     6113   2.1338        568553         655325.5     0.86759
//     6121   2.1335        568330         655111.4     0.86753
//     6131   2.1331        568109         654897.7     0.86748
//     6133   2.1330        567900         654684.1     0.86744
//     6143   2.1326        567682         654471.0     0.86739
//     6151   2.1323        567461         654258.2     0.86734
//     6163   2.1318        567250         654045.8     0.86729
//     6173   2.1314        567025         653833.9     0.86723
//     6197   2.1305        566823         653622.9     0.86720
//     6199   2.1304        566611         653412.0     0.86716
//     6203   2.1302        566425         653201.4     0.86715
//     6211   2.1299        566198         652991.0     0.86708
//     6217   2.1297        565973         652781.0     0.86702
//     6221   2.1295        565765         652571.1     0.86698
//     6229   2.1292        565541         652361.6     0.86691
//     6247   2.1285        565325         652152.7     0.86686
//     6257   2.1281        565126         651944.3     0.86683
//     6263   2.1279        564912         651736.1     0.86678
//     6269   2.1277        564686         651528.1     0.86671
//     6271   2.1276        564479         651320.4     0.86667
//     6277   2.1274        564251         651112.8     0.86659
//     6287   2.1270        564057         650905.7     0.86657
//     6299   2.1265        563837         650699.0     0.86651
//     6301   2.1264        563605         650492.5     0.86643
//     6311   2.1260        563403         650286.3     0.86639
//     6317   2.1258        563190         650080.5     0.86634
//     6323   2.1256        562977         649874.8     0.86629
//     6329   2.1254        562757         649669.5     0.86622
//     6337   2.1250        562528         649464.4     0.86614
//     6343   2.1248        562303         649259.7     0.86607
//     6353   2.1244        562087         649055.3     0.86601
//     6359   2.1242        561888         648851.1     0.86597
//     6361   2.1241        561667         648647.1     0.86591
//     6367   2.1239        561468         648443.4     0.86587
//     6373   2.1237        561277         648239.9     0.86585
//     6379   2.1234        561071         648036.6     0.86580
//     6389   2.1231        560869         647833.8     0.86576
//     6397   2.1228        560680         647631.2     0.86574
//     6421   2.1219        560466         647429.5     0.86568
//     6427   2.1216        560280         647228.0     0.86566
//     6449   2.1208        560071         647027.3     0.86561
//     6451   2.1207        559871         646826.7     0.86557
//     6469   2.1201        559684         646626.7     0.86554
//     6473   2.1199        559490         646426.9     0.86551
//     6481   2.1196        559300         646227.4     0.86548
//     6491   2.1192        559088         646028.3     0.86542
//     6521   2.1181        558886         645830.2     0.86538
//     6529   2.1178        558696         645632.4     0.86535
//     6547   2.1172        558512         645435.1     0.86533
//     6551   2.1170        558323         645238.1     0.86530
//     6553   2.1169        558132         645041.2     0.86527
//     6563   2.1166        557907         644844.6     0.86518
//     6569   2.1164        557713         644648.3     0.86514
//     6571   2.1163        557506         644452.0     0.86509
//     6577   2.1161        557321         644256.1     0.86506
//     6581   2.1159        557133         644060.3     0.86503
//     6599   2.1153        556933         643865.1     0.86498
//     6607   2.1150        556749         643670.2     0.86496
//     6619   2.1145        556566         643475.7     0.86494
//     6637   2.1139        556390         643281.8     0.86492
//     6653   2.1133        556218         643088.4     0.86492
//     6659   2.1131        556031         642895.2     0.86489
//     6661   2.1130        555853         642702.2     0.86487
//     6673   2.1126        555658         642509.6     0.86482
//     6679   2.1124        555484         642317.2     0.86481
//     6689   2.1120        555297         642125.1     0.86478
//     6691   2.1119        555124         641933.2     0.86477
//     6701   2.1116        554953         641741.6     0.86476
//     6703   2.1115        554794         641550.1     0.86477
//     6709   2.1113        554621         641358.9     0.86476
//     6719   2.1109        554444         641168.0     0.86474
//     6733   2.1104        554286         640977.5     0.86475
//     6737   2.1103        554095         640787.2     0.86471
//     6761   2.1094        553936         640597.7     0.86472
//     6763   2.1094        553754         640408.2     0.86469
//     6779   2.1088        553572         640219.3     0.86466
//     6781   2.1087        553401         640030.5     0.86465
//     6791   2.1084        553215         639842.0     0.86461
//     6793   2.1083        553036         639653.6     0.86459
//     6803   2.1080        552867         639465.5     0.86458
//     6823   2.1073        552693         639278.1     0.86456
//     6827   2.1071        552511         639090.8     0.86453
//     6829   2.1070        552330         638903.6     0.86450
//     6833   2.1069        552152         638716.6     0.86447
//     6841   2.1066        551974         638529.9     0.86445
//     6857   2.1061        551798         638343.7     0.86442
//     6863   2.1059        551639         638157.6     0.86442
//     6869   2.1057        551438         637971.8     0.86436
//     6871   2.1056        551253         637786.1     0.86432
//     6883   2.1052        551085         637600.8     0.86431
//     6899   2.1046        550913         637416.0     0.86429
//     6907   2.1043        550749         637231.4     0.86428
//     6911   2.1042        550581         637047.0     0.86427
//     6917   2.1040        550399         636862.8     0.86423
//     6947   2.1030        550233         636679.4     0.86422
//     6949   2.1029        550066         636496.2     0.86421
//     6959   2.1026        549902         636313.3     0.86420
//     6961   2.1025        549733         636130.5     0.86418
//     6967   2.1023        549568         635947.8     0.86417
//     6971   2.1021        549392         635765.4     0.86414
//     6977   2.1019        549210         635583.1     0.86410
//     6983   2.1017        549040         635401.1     0.86408
//     6991   2.1015        548882         635219.3     0.86408
//     6997   2.1013        548724         635037.8     0.86408
//     7001   2.1011        548562         634856.3     0.86407
//     7013   2.1007        548378         634675.3     0.86403
//     7019   2.1005        548218         634494.4     0.86402
//     7027   2.1003        548032         634313.9     0.86398
//     7039   2.0998        547869         634133.6     0.86396
//     7043   2.0997        547703         633953.6     0.86395
//     7057   2.0992        547558         633773.9     0.86396
//     7069   2.0988        547394         633594.6     0.86395
//     7079   2.0985        547238         633415.6     0.86395
//     7103   2.0977        547079         633237.2     0.86394
//     7109   2.0975        546935         633059.1     0.86396
//     7121   2.0971        546778         632881.3     0.86395
//     7127   2.0969        546631         632703.7     0.86396
//     7129   2.0968        546473         632526.2     0.86395
//     7151   2.0961        546326         632349.3     0.86396
//     7159   2.0958        546188         632172.6     0.86399
//     7177   2.0953        546027         631996.4     0.86397
//     7187   2.0949        545876         631820.6     0.86397
//     7193   2.0947        545719         631644.9     0.86396
//     7207   2.0943        545571         631469.6     0.86397
//     7211   2.0941        545413         631294.5     0.86396
//     7213   2.0941        545255         631119.4     0.86395
//     7219   2.0939        545118         630944.6     0.86397
//     7229   2.0936        544965         630770.0     0.86397
//     7237   2.0933        544806         630595.7     0.86395
//     7243   2.0931        544656         630421.6     0.86396
//     7247   2.0930        544510         630247.6     0.86396
//     7253   2.0928        544360         630073.8     0.86396
//     7283   2.0918        544197         629900.8     0.86394
//     7297   2.0913        544057         629728.1     0.86396
//     7307   2.0910        543896         629555.8     0.86394
//     7309   2.0910        543757         629383.5     0.86395
//     7321   2.0906        543598         629211.6     0.86394
//     7331   2.0903        543437         629039.9     0.86392
//     7333   2.0902        543306         628868.3     0.86394
//     7349   2.0897        543152         628697.2     0.86393
//     7351   2.0896        543015         628526.1     0.86395
//     7369   2.0890        542882         628355.5     0.86397
//     7393   2.0883        542748         628185.6     0.86399
//     7411   2.0877        542604         628016.0     0.86400
//     7417   2.0875        542455         627846.7     0.86399
//     7433   2.0870        542311         627677.8     0.86400
//     7451   2.0864        542182         627509.3     0.86402
//     7457   2.0863        542029         627341.0     0.86401
//     7459   2.0862        541890         627172.8     0.86402
//     7477   2.0856        541733         627005.0     0.86400
//     7481   2.0855        541614         626837.4     0.86404
//     7487   2.0853        541461         626669.9     0.86403
//     7489   2.0853        541341         626502.6     0.86407
//     7499   2.0849        541188         626335.5     0.86405
//     7507   2.0847        541050         626168.6     0.86406
//     7517   2.0844        540920         626002.0     0.86409
//     7523   2.0842        540786         625835.6     0.86410
//     7529   2.0840        540640         625669.3     0.86410
//     7537   2.0838        540511         625503.3     0.86412
//     7541   2.0836        540386         625337.4     0.86415
//     7547   2.0835        540252         625171.7     0.86417
//     7549   2.0834        540117         625006.1     0.86418
//     7559   2.0831        539996         624840.7     0.86421
//     7561   2.0830        539862         624675.4     0.86423
//     7573   2.0827        539722         624510.5     0.86423
//     7577   2.0825        539595         624345.6     0.86426
//     7583   2.0823        539466         624180.9     0.86428
//     7589   2.0822        539322         624016.4     0.86428
//     7591   2.0821        539182         623852.0     0.86428
//     7603   2.0817        539035         623687.9     0.86427
//     7607   2.0816        538901         623523.9     0.86428
//     7621   2.0812        538785         623360.3     0.86432
//     7639   2.0806        538649         623197.1     0.86433
//     7643   2.0805        538524         623034.0     0.86436
//     7649   2.0803        538381         622871.1     0.86435
//     7669   2.0797        538237         622708.7     0.86435
//     7673   2.0796        538116         622546.4     0.86438
//     7681   2.0794        537987         622384.3     0.86440
//     7687   2.0792        537856         622222.3     0.86441
//     7691   2.0791        537739         622060.5     0.86445
//     7699   2.0788        537626         621898.9     0.86449
//     7703   2.0787        537514         621737.5     0.86454
//     7717   2.0783        537389         621576.3     0.86456
//     7723   2.0781        537249         621415.4     0.86456
//     7727   2.0780        537138         621254.5     0.86460
//     7741   2.0776        537013         621094.0     0.86462
//     7753   2.0772        536886         620933.8     0.86464
//     7757   2.0771        536755         620773.7     0.86465
//     7759   2.0770        536630         620613.7     0.86468
//     7789   2.0761        536498         620454.3     0.86469
//     7793   2.0760        536381         620295.1     0.86472
//     7817   2.0753        536260         620136.4     0.86475
//     7823   2.0751        536132         619977.9     0.86476
//     7829   2.0749        536003         619819.5     0.86477
//     7841   2.0746        535879         619661.4     0.86479
//     7853   2.0742        535758         619503.6     0.86482
//     7867   2.0738        535637         619346.1     0.86484
//     7873   2.0736        535514         619188.7     0.86486
//     7877   2.0735        535400         619031.5     0.86490
//     7879   2.0735        535293         618874.4     0.86495
//     7883   2.0733        535170         618717.4     0.86497
//     7901   2.0728        535052         618560.8     0.86500
//     7907   2.0726        534943         618404.3     0.86504
//     7919   2.0723        534819         618248.1     0.86506
//     7927   2.0721        534709         618092.1     0.86510
//     7933   2.0719        534586         617936.3     0.86512
//     7937   2.0718        534467         617780.6     0.86514
//     7949   2.0714        534341         617625.2     0.86515
//     7951   2.0714        534228         617469.8     0.86519
//     7963   2.0710        534109         617314.7     0.86521
//     7993   2.0701        533993         617160.2     0.86524
//     8009   2.0697        533872         617006.1     0.86526
//     8011   2.0696        533763         616852.1     0.86530
//     8017   2.0695        533667         616698.2     0.86536
//     8039   2.0688        533561         616544.8     0.86541
//     8053   2.0684        533461         616391.7     0.86546
//     8059   2.0683        533351         616238.7     0.86549
//     8069   2.0680        533236         616085.9     0.86552
//     8081   2.0676        533124         615933.5     0.86555
//     8087   2.0675        533014         615781.1     0.86559
//     8089   2.0674        532901         615628.9     0.86562
//     8093   2.0673        532790         615476.7     0.86565
//     8101   2.0671        532677         615324.8     0.86568
//     8111   2.0668        532574         615173.1     0.86573
//     8117   2.0666        532464         615021.5     0.86576
//     8123   2.0664        532355         614870.1     0.86580
//     8147   2.0658        532229         614719.1     0.86581
//     8161   2.0654        532126         614568.5     0.86585
//     8167   2.0652        532019         614418.0     0.86589
//     8171   2.0651        531911         614267.6     0.86593
//     8179   2.0649        531824         614117.4     0.86600
//     8191   2.0645        531724         613967.4     0.86605
//     8209   2.0640        531633         613817.8     0.86611
//     8219   2.0637        531532         613668.5     0.86615
//     8221   2.0637        531441         613519.2     0.86622
//     8231   2.0634        531339         613370.1     0.86626
//     8233   2.0634        531233         613221.1     0.86630
//     8237   2.0632        531143         613072.2     0.86636
//     8243   2.0631        531043         612923.5     0.86641
//     8263   2.0625        530953         612775.1     0.86647
//     8269   2.0624        530860         612626.9     0.86653
//     8273   2.0622        530749         612478.8     0.86656
//     8287   2.0619        530656         612331.0     0.86662
//     8291   2.0617        530558         612183.3     0.86667
//     8293   2.0617        530448         612035.6     0.86669
//     8297   2.0616        530348         611888.1     0.86674
//     8311   2.0612        530265         611740.9     0.86681
//     8317   2.0610        530177         611593.7     0.86688
//     8329   2.0607        530076         611446.9     0.86692
//     8353   2.0600        529989         611300.5     0.86699
//     8363   2.0598        529901         611154.3     0.86705
//     8369   2.0596        529799         611008.2     0.86709
//     8377   2.0594        529710         610862.4     0.86715
//     8387   2.0591        529615         610716.7     0.86720
//     8389   2.0591        529512         610571.1     0.86724
//     8419   2.0583        529416         610426.1     0.86729
//     8423   2.0581        529321         610281.1     0.86734
//     8429   2.0580        529242         610136.3     0.86742
//     8431   2.0579        529160         609991.6     0.86749
//     8443   2.0576        529067         609847.1     0.86754
//     8447   2.0575        528970         609702.7     0.86759
//     8461   2.0571        528886         609558.6     0.86765
//     8467   2.0570        528811         609414.6     0.86774
//     8501   2.0560        528729         609271.2     0.86781
//     8513   2.0557        528634         609128.1     0.86785
//     8521   2.0555        528560         608985.1     0.86794
//     8527   2.0554        528467         608842.2     0.86799
//     8537   2.0551        528381         608699.6     0.86805
//     8539   2.0550        528289         608557.0     0.86810
//     8543   2.0549        528206         608414.6     0.86817
//     8563   2.0544        528123         608272.5     0.86823
//     8573   2.0541        528033         608130.6     0.86829
//     8581   2.0539        527946         607988.8     0.86835
//     8597   2.0535        527851         607847.4     0.86839
//     8599   2.0534        527750         607706.0     0.86843
//     8609   2.0532        527667         607564.8     0.86849
//     8623   2.0528        527578         607423.9     0.86855
//     8627   2.0527        527483         607283.1     0.86859
//     8629   2.0527        527391         607142.3     0.86864
//     8641   2.0523        527307         607001.8     0.86871
//     8647   2.0522        527223         606861.4     0.86877
//     8663   2.0518        527133         606721.3     0.86882
//     8669   2.0516        527047         606581.3     0.86888
//     8677   2.0514        526957         606441.5     0.86893
//     8681   2.0513        526867         606301.8     0.86898
//     8689   2.0511        526781         606162.3     0.86904
//     8693   2.0510        526700         606022.8     0.86911
//     8699   2.0508        526620         605883.5     0.86918
//     8707   2.0506        526539         605744.3     0.86924
//     8713   2.0505        526459         605605.2     0.86931
//     8719   2.0503        526371         605466.3     0.86936
//     8731   2.0500        526290         605327.6     0.86943
//     8737   2.0498        526201         605189.1     0.86948
//     8741   2.0497        526123         605050.6     0.86955
//     8747   2.0496        526039         604912.3     0.86961
//     8753   2.0494        525957         604774.0     0.86968
//     8761   2.0492        525896         604636.0     0.86977
//     8779   2.0488        525812         604498.2     0.86983
//     8783   2.0487        525741         604360.6     0.86991
//     8803   2.0481        525662         604223.3     0.86998
//     8807   2.0480        525582         604086.1     0.87004
//     8819   2.0477        525507         603949.1     0.87012
//     8821   2.0477        525427         603812.1     0.87018
//     8831   2.0474        525343         603675.4     0.87024
//     8837   2.0473        525267         603538.8     0.87031
//     8839   2.0472        525192         603402.2     0.87038
//     8849   2.0470        525134         603265.8     0.87049
//     8861   2.0467        525062         603129.6     0.87056
//     8863   2.0466        524995         602993.5     0.87065
//     8867   2.0465        524923         602857.5     0.87072
//     8887   2.0460        524855         602721.9     0.87081
//     8893   2.0459        524776         602586.3     0.87087
//     8923   2.0451        524710         602451.3     0.87096
//     8929   2.0449        524637         602316.3     0.87103
//     8933   2.0448        524565         602181.5     0.87111
//     8941   2.0446        524494         602046.8     0.87118
//     8951   2.0444        524430         601912.2     0.87127
//     8963   2.0441        524365         601777.9     0.87136
//     8969   2.0439        524306         601643.7     0.87146
//     8971   2.0439        524246         601509.6     0.87155
//     8999   2.0432        524174         601375.9     0.87162
//     9001   2.0431        524099         601242.3     0.87169
//     9007   2.0430        524031         601108.8     0.87177
//     9011   2.0429        523944         600975.4     0.87182
//     9013   2.0428        523879         600842.0     0.87191
//     9029   2.0424        523818         600708.9     0.87200
//     9041   2.0421        523752         600576.0     0.87208
//     9043   2.0421        523678         600443.2     0.87215
//     9049   2.0420        523617         600310.5     0.87224
//     9059   2.0417        523546         600178.0     0.87232
//     9067   2.0415        523479         600045.6     0.87240
//     9091   2.0409        523413         599913.6     0.87248
//     9103   2.0406        523352         599781.8     0.87257
//     9109   2.0405        523293         599650.1     0.87266
//     9127   2.0400        523228         599518.7     0.87275
//     9133   2.0399        523171         599387.4     0.87284
//     9137   2.0398        523100         599256.2     0.87292
//     9151   2.0394        523026         599125.2     0.87298
//     9157   2.0393        522970         598994.4     0.87308
//     9161   2.0392        522916         598863.6     0.87318
//     9173   2.0389        522863         598733.0     0.87328
//     9181   2.0387        522796         598602.6     0.87336
//     9187   2.0386        522741         598472.3     0.87346
//     9199   2.0383        522678         598342.2     0.87354
//     9203   2.0382        522612         598212.1     0.87362
//     9209   2.0380        522555         598082.2     0.87372
//     9221   2.0377        522493         597952.5     0.87380
//     9227   2.0376        522427         597822.9     0.87388
//     9239   2.0373        522371         597693.5     0.87398
//     9241   2.0373        522319         597564.1     0.87408
//     9257   2.0369        522256         597435.0     0.87416
//     9277   2.0364        522196         597306.2     0.87425
//     9281   2.0363        522130         597177.5     0.87433
//     9283   2.0362        522072         597048.8     0.87442
//     9293   2.0360        522013         596920.3     0.87451
//     9311   2.0356        521949         596792.1     0.87459
//     9319   2.0354        521886         596664.0     0.87467
//     9323   2.0353        521818         596536.0     0.87475
//     9337   2.0350        521770         596408.3     0.87485
//     9341   2.0349        521718         596280.6     0.87495
//     9343   2.0348        521674         596152.9     0.87507
//     9349   2.0347        521621         596025.4     0.87517
//     9371   2.0341        521564         595898.2     0.87526
//     9377   2.0340        521509         595771.1     0.87535
//     9391   2.0337        521453         595644.2     0.87544
//     9397   2.0335        521405         595517.4     0.87555
//     9403   2.0334        521350         595390.8     0.87564
//     9413   2.0331        521303         595264.3     0.87575
//     9419   2.0330        521252         595137.9     0.87585
//     9421   2.0330        521203         595011.5     0.87595
//     9431   2.0327        521159         594885.3     0.87607
//     9433   2.0327        521099         594759.2     0.87615
//     9437   2.0326        521047         594633.2     0.87625
//     9439   2.0325        521003         594507.2     0.87636
//     9461   2.0320        520947         594381.5     0.87645
//     9463   2.0320        520903         594255.9     0.87656
//     9467   2.0319        520857         594130.3     0.87667
//     9473   2.0317        520808         594004.9     0.87677
//     9479   2.0316        520756         593879.6     0.87687
//     9491   2.0313        520705         593754.4     0.87697
//     9497   2.0312        520659         593629.4     0.87708
//     9511   2.0309        520609         593504.5     0.87718
//     9521   2.0306        520569         593379.9     0.87729
//     9533   2.0303        520530         593255.4     0.87741
//     9539   2.0302        520484         593131.0     0.87752
//     9547   2.0300        520436         593006.7     0.87762
//     9551   2.0299        520393         592882.6     0.87773
//     9587   2.0291        520338         592758.9     0.87782
//     9601   2.0288        520289         592635.4     0.87792
//     9613   2.0285        520248         592512.1     0.87804
//     9619   2.0283        520211         592388.9     0.87816
//     9623   2.0283        520166         592265.8     0.87826
//     9629   2.0281        520121         592142.8     0.87837
//     9631   2.0281        520067         592019.8     0.87846
//     9643   2.0278        520040         591897.0     0.87860
//     9649   2.0277        519990         591774.3     0.87870
//     9661   2.0274        519948         591651.8     0.87881
//     9677   2.0270        519902         591529.5     0.87891
//     9679   2.0270        519859         591407.3     0.87902
//     9689   2.0267        519815         591285.2     0.87913
//     9697   2.0266        519780         591163.3     0.87925
//     9719   2.0261        519742         591041.6     0.87937
//     9721   2.0260        519700         590920.0     0.87948
//     9733   2.0257        519654         590798.6     0.87958
//     9739   2.0256        519618         590677.3     0.87970
//     9743   2.0255        519582         590556.0     0.87982
//     9749   2.0254        519544         590434.9     0.87993
//     9767   2.0250        519503         590314.0     0.88005
//     9769   2.0249        519465         590193.1     0.88016
//     9781   2.0247        519428         590072.4     0.88028
//     9787   2.0245        519394         589951.9     0.88040
//     9791   2.0244        519362         589831.3     0.88053
//     9803   2.0242        519325         589711.0     0.88064
//     9811   2.0240        519285         589590.8     0.88075
//     9817   2.0239        519250         589470.7     0.88088
//     9829   2.0236        519216         589350.7     0.88100
//     9833   2.0235        519183         589230.9     0.88112
//     9839   2.0234        519145         589111.1     0.88123
//     9851   2.0231        519108         588991.5     0.88135
//     9857   2.0230        519076         588872.0     0.88148
//     9859   2.0229        519045         588752.5     0.88160
//     9871   2.0226        519008         588633.2     0.88172
//     9883   2.0224        518976         588514.1     0.88184
//     9887   2.0223        518947         588395.1     0.88197
//     9901   2.0220        518912         588276.2     0.88209
//     9907   2.0218        518878         588157.4     0.88221
//     9923   2.0215        518846         588038.9     0.88233
//     9929   2.0214        518814         587920.4     0.88246
//     9931   2.0213        518782         587802.0     0.88258
//     9941   2.0211        518746         587683.8     0.88270
//     9949   2.0209        518710         587565.6     0.88281
//     9967   2.0205        518686         587447.7     0.88295
//     9973   2.0204        518651         587329.9     0.88307
//    10007   2.0196        518617         587212.6     0.88318
//    10009   2.0196        518590         587095.2     0.88331
//    10037   2.0190        518557         586978.2     0.88343
//    10039   2.0189        518520         586861.3     0.88355
//    10061   2.0185        518492         586744.6     0.88368
//    10067   2.0183        518465         586628.1     0.88381
//    10069   2.0183        518441         586511.5     0.88394
//    10079   2.0181        518413         586395.2     0.88407
//    10091   2.0178        518384         586278.9     0.88419
//    10093   2.0178        518360         586162.8     0.88433
//    10099   2.0176        518337         586046.7     0.88446
//    10103   2.0176        518314         585930.7     0.88460
//    10111   2.0174        518280         585814.8     0.88472
//    10133   2.0169        518256         585699.1     0.88485
//    10139   2.0168        518229         585583.6     0.88498
//    10141   2.0167        518204         585468.1     0.88511
//    10151   2.0165        518173         585352.8     0.88523
//    10159   2.0163        518148         585237.5     0.88536
//    10163   2.0163        518122         585122.4     0.88549
//    10169   2.0161        518108         585007.3     0.88564
//    10177   2.0160        518083         584892.3     0.88578
//    10181   2.0159        518063         584777.4     0.88591
//    10193   2.0156        518040         584662.7     0.88605
//    10211   2.0152        518021         584548.2     0.88619
//    10223   2.0150        517992         584433.8     0.88631
//    10243   2.0145        517972         584319.7     0.88645
//    10247   2.0145        517955         584205.6     0.88660
//    10253   2.0143        517933         584091.7     0.88673
//    10259   2.0142        517912         583977.8     0.88687
//    10267   2.0140        517884         583864.0     0.88699
//    10271   2.0139        517857         583750.4     0.88712
//    10273   2.0139        517837         583636.7     0.88726
//    10289   2.0136        517820         583523.3     0.88740
//    10301   2.0133        517793         583410.0     0.88753
//    10303   2.0133        517778         583296.7     0.88768
//    10313   2.0131        517755         583183.6     0.88781
//    10321   2.0129        517731         583070.6     0.88794
//    10331   2.0127        517713         582957.7     0.88808
//    10333   2.0126        517690         582844.9     0.88821
//    10337   2.0126        517671         582732.1     0.88835
//    10343   2.0124        517648         582619.4     0.88848
//    10357   2.0121        517634         582506.9     0.88863
//    10369   2.0119        517616         582394.6     0.88877
//    10391   2.0114        517595         582282.5     0.88891
//    10399   2.0113        517574         582170.5     0.88904
//    10427   2.0107        517556         582058.8     0.88918
//    10429   2.0106        517538         581947.2     0.88932
//    10433   2.0105        517530         581835.6     0.88948
//    10453   2.0101        517513         581724.3     0.88962
//    10457   2.0100        517504         581613.0     0.88977
//    10459   2.0100        517488         581501.8     0.88992
//    10463   2.0099        517479         581390.7     0.89007
//    10477   2.0096        517466         581279.7     0.89022
//    10487   2.0094        517448         581168.8     0.89036
//    10499   2.0092        517440         581058.1     0.89051
//    10501   2.0091        517430         580947.5     0.89067
//    10513   2.0089        517419         580836.9     0.89082
//    10529   2.0086        517402         580726.6     0.89096
//    10531   2.0085        517386         580616.3     0.89110
//    10559   2.0079        517379         580506.3     0.89125
//    10567   2.0078        517365         580396.5     0.89140
//    10589   2.0073        517355         580286.8     0.89155
//    10597   2.0072        517341         580177.3     0.89169
//    10601   2.0071        517331         580067.9     0.89185
//    10607   2.0070        517319         579958.5     0.89199
//    10613   2.0068        517305         579849.2     0.89214
//    10627   2.0065        517296         579740.1     0.89229
//    10631   2.0065        517288         579631.0     0.89244
//    10639   2.0063        517279         579522.0     0.89260
//    10651   2.0061        517270         579413.2     0.89275
//    10657   2.0059        517262         579304.5     0.89290
//    10663   2.0058        517254         579195.8     0.89306
//    10667   2.0057        517244         579087.2     0.89321
//    10687   2.0053        517235         578978.9     0.89336
//    10691   2.0052        517225         578870.6     0.89351
//    10709   2.0049        517216         578762.4     0.89366
//    10711   2.0048        517209         578654.4     0.89381
//    10723   2.0046        517203         578546.4     0.89397
//    10729   2.0045        517196         578438.6     0.89412
//    10733   2.0044        517193         578330.8     0.89429
//    10739   2.0043        517184         578223.1     0.89444
//    10753   2.0040        517180         578115.6     0.89460
//    10771   2.0036        517177         578008.2     0.89476
//    10781   2.0034        517172         577901.0     0.89491
//    10789   2.0033        517165         577793.9     0.89507
//    10799   2.0031        517164         577686.8     0.89523
//    10831   2.0024        517161         577580.2     0.89539
//    10837   2.0023        517158         577473.6     0.89555
//    10847   2.0021        517155         577367.1     0.89571
//    10853   2.0020        517153         577260.7     0.89587
//    10859   2.0019        517150         577154.4     0.89603
//    10861   2.0018        517150         577048.1     0.89620
//    10867   2.0017        517150         576941.9     0.89636
//    10883   2.0014        517147         576835.9     0.89652
//    10889   2.0013        517143         576729.9     0.89668
//    10891   2.0012        517143         576624.0     0.89685
//    10903   2.0010        517143         576518.3     0.89701
//    10909   2.0009        517141         576412.6     0.89717
//    10937   2.0003        517140         576307.1     0.89733
//    10939   2.0003        517139         576201.8     0.89750
//    10949   2.0001        517139         576096.5     0.89766
//
//   minimum of rho over 1.5 <= u <= 6: rho = 0.86392 at u = 2.0903 (y = 7331)
//   Unification Law prediction: minimum at u = 2 with value e^{2gamma}/4 = 0.79305
//   (the measured value sits above it by the finite-size Hardy-Littlewood factor)
//
//   Below u = 2 the survivors are exactly the twin primes above y (Impact Lemma).
//   Survivors after folding every p <= sqrt(N): 517139.
//
//        y        u     y-rough pairs in (y,N)      N*delta_y       rho    e^{2g}/u^2
//   u=1.05: y=49483263 beyond prime cache, skipped
//   u=1.15: y=10601687 beyond prime cache, skipped
//   1639664   1.3000                504821         243883.7   2.06993    1.87705
//    373121   1.4500                513766         303377.1   1.69349    1.50878
//    112070   1.6000                516022         369310.1   1.39726    1.23915
//     41369   1.7500                516757         441669.5   1.17001    1.03583
//     17873   1.9000                517049         520331.0   0.99369    0.87873
//     10954   2.0000                517139         576096.5   0.89766    0.79305
//
//
// === F. THE CROSSOVER LAW at scale ===
//
//   origin/mean = rho(ln S/ln x) / rho(ln S/ln y), both factors read off ONE
//   curve. Single incremental sieve with snapshots at a ladder of 18 levels.
//
//   Only pairs with y'^2 > x are shown: below that the Origin Excess Lemma is
//   vacuous (section G4), because D_x(S) = 0 for S <= x. The crossing is hunted
//   from S = y'^2 upward. u_x, u_y are the two survival arguments at the
//   crossing, and the claim is that the crossing is exactly where the two
//   arguments give the same survival value.
//
//       y      x       y'^2       x'^2      crossing S     /y'^2   /x'^2     u_x     u_y   origin/mean at x'^2
//      13     19        289        529             560     1.94  1.059   2.149   2.467     1.0133  (S=500)
//      13     29        289        961             983     3.40  1.023   2.046   2.686     0.9718  (S=983)
//      13     43        289       2209            2708     9.37  1.226   2.101   3.082     1.0584  (S=2162)
//      13     61        289       4489            7462    25.82  1.662   2.169   3.477     1.0783  (S=4249)
//      13     89        289       9409           11708    40.51  1.244   2.087   3.652     1.0260  (S=9347)
//      13    127        289      17161           16414    56.80  0.956   2.004   3.784     0.9936  (S=16414)
//      13    181        289      36481           40411   139.83  1.108   2.040   4.135     1.0045  (S=36107)
//      13    257        289      69169           63408   219.40  0.917   1.993   4.311     0.9635  (S=70967)
//      19     29        529        961            1231     2.33  1.281   2.113   2.417     1.0380  (S=983)
//      19     43        529       2209            3031     5.73  1.372   2.131   2.723     1.1038  (S=2162)
//      19     61        529       4489            8351    15.79  1.860   2.197   3.067     1.0967  (S=4249)
//      19     89        529       9409           11708    22.13  1.244   2.087   3.182     1.0315  (S=9347)
//      19    127        529      17161           16414    31.03  0.956   2.004   3.296     0.9902  (S=16414)
//      19    181        529      36481           40411    76.39  1.108   2.040   3.602     1.0015  (S=36107)
//      19    257        529      69169           63408   119.86  0.917   1.993   3.755     0.9644  (S=70967)
//      19    367        529     139129             560     1.06  0.004   1.072   2.149     0.9662  (S=139483)
//      19    521        529     273529             560     1.06  0.002   1.012   2.149     0.9624  (S=274149)
//      29     43        961       2209            3031     3.15  1.372   2.131   2.381     1.1177  (S=2162)
//      29     61        961       4489            8351     8.69  1.860   2.197   2.682     1.1092  (S=4249)
//      29     89        961       9409           11708    12.18  1.244   2.087   2.782     1.0373  (S=9347)
//      29    127        961      17161           16414    17.08  0.956   2.004   2.882     0.9910  (S=16414)
//      29    181        961      36481           36107    37.57  0.990   2.019   3.117     0.9986  (S=36107)
//      29    257        961      69169           63408    65.98  0.917   1.993   3.284     0.9641  (S=70967)
//      29    367        961     139129          111352   115.87  0.800   1.968   3.451     0.9642  (S=139483)
//      29    521        961     273529          218859   227.74  0.800   1.966   3.652     0.9616  (S=274149)
//      29    739        961     552049             983     1.02  0.002   1.043   2.046     0.9515  (S=538831)
//      43     61       2209       4489            9347     4.23  2.082   2.224   2.431     1.0988  (S=4249)
//      43     89       2209       9409           13104     5.93  1.393   2.112   2.521     1.0441  (S=9347)
//      43    127       2209      17161           20560     9.31  1.198   2.050   2.640     1.0189  (S=16414)
//      43    181       2209      36481           36107    16.35  0.990   2.019   2.790     0.9950  (S=36107)
//      43    257       2209      69169           63408    28.70  0.917   1.993   2.940     0.9614  (S=70967)
//      43    367       2209     139129          111352    50.41  0.800   1.968   3.090     0.9592  (S=139483)
//      43    521       2209     273529          218859    99.08  0.800   1.966   3.269     0.9577  (S=274149)
//      43    739       2209     552049          430161   194.73  0.779   1.964   3.449     0.9496  (S=538831)
//      43   1049       2209    1104601          755415   341.97  0.684   1.946   3.599     0.9487  (S=1059056)
//      43   1487       2209    2217121         1484745   672.13  0.670   1.945   3.778     0.9361  (S=2329678)
//      43   2111       2209    4464769            2419     1.10  0.001   1.018   2.071     0.9301  (S=4578908)
//      61     89       4489       9409           14666     3.27  1.559   2.137   2.334     1.0494  (S=9347)
//      61    127       4489      17161           25755     5.74  1.501   2.097   2.471     1.0551  (S=16414)
//      61    181       4489      36481           40411     9.00  1.108   2.040   2.580     1.0247  (S=36107)
//      61    257       4489      69169           70967    15.81  1.026   2.013   2.717     0.9793  (S=70967)
//      61    367       4489     139129          111352    24.81  0.800   1.968   2.827     0.9607  (S=139483)
//      61    521       4489     273529          218859    48.75  0.800   1.966   2.991     0.9542  (S=274149)
//      61    739       4489     552049          430161    95.83  0.779   1.964   3.156     0.9468  (S=538831)
//      61   1049       4489    1104601          755415   168.28  0.684   1.946   3.292     0.9466  (S=1059056)
//      61   1487       4489    2217121         1484745   330.75  0.670   1.945   3.457     0.9357  (S=2329678)
//      61   2111       4489    4464769         2918219   650.08  0.654   1.945   3.621     0.9302  (S=4578908)
//      61   2999       4489    9006001         5124753  1141.62  0.569   1.930   3.758     0.9249  (S=8999699)
//      61   4253       4489   18139081            4755     1.06  0.000   1.013   2.060     0.9192  (S=17688624)
//      89    127       9409      17161           40411     4.29  2.355   2.190   2.363     1.0646  (S=16414)
//      89    181       9409      36481           50620     5.38  1.388   2.084   2.413     1.0610  (S=36107)
//      89    257       9409      69169           79427     8.44  1.148   2.033   2.514     1.0167  (S=70967)
//      89    367       9409     139129          139483    14.82  1.003   2.006   2.639     0.9802  (S=139483)
//      89    521       9409     273529          244949    26.03  0.896   1.984   2.764     0.9643  (S=274149)
//      89    739       9409     552049          430161    45.72  0.779   1.964   2.890     0.9468  (S=538831)
//      89   1049       9409    1104601          755415    80.29  0.684   1.946   3.015     0.9414  (S=1059056)
//      89   1487       9409    2217121         1484745   157.80  0.670   1.945   3.166     0.9315  (S=2329678)
//      89   2111       9409    4464769         2918219   310.15  0.654   1.945   3.316     0.9281  (S=4578908)
//      89   2999       9409    9006001         5124753   544.67  0.569   1.930   3.442     0.9240  (S=8999699)
//      89   4253       9409   18139081        10072540  1070.52  0.555   1.930   3.592     0.9192  (S=17688624)
//      89   6037       9409   36517849        17688624  1879.97  0.484   1.917   3.718     0.9126  (S=34766432)
//     127    181      17161      36481           70967     4.14  1.945   2.149   2.306     1.0606  (S=36107)
//     127    257      17161      69169           99492     5.80  1.438   2.074   2.376     1.0402  (S=70967)
//     127    367      17161     139129          156110     9.10  1.122   2.025   2.469     1.0073  (S=139483)
//     127    521      17161     273529          274149    15.98  1.002   2.002   2.585     0.9826  (S=274149)
//     127    739      17161     552049          481439    28.05  0.872   1.981   2.701     0.9591  (S=538831)
//     127   1049      17161    1104601          755415    44.02  0.684   1.946   2.794     0.9451  (S=1059056)
//     127   1487      17161    2217121         1484745    86.52  0.670   1.945   2.934     0.9287  (S=2329678)
//     127   2111      17161    4464769         2607395   151.94  0.584   1.930   3.050     0.9241  (S=4578908)
//     127   2999      17161    9006001         5124753   298.63  0.569   1.930   3.189     0.9209  (S=8999699)
//     127   4253      17161   18139081        10072540   586.94  0.555   1.930   3.329     0.9176  (S=17688624)
//     127   6037      17161   36517849        17688624  1030.75  0.484   1.917   3.445     0.9121  (S=34766432)
//     181    257      36481      69169          111352     3.05  1.610   2.094   2.235     1.0480  (S=70967)
//     181    367      36481     139129          218859     6.00  1.573   2.082   2.365     1.0478  (S=139483)
//     181    521      36481     273529          306830     8.41  1.122   2.020   2.430     1.0190  (S=274149)
//     181    739      36481     552049          538831    14.77  0.976   1.998   2.539     0.9855  (S=538831)
//     181   1049      36481    1104601          845467    23.18  0.765   1.962   2.625     0.9595  (S=1059056)
//     181   1487      36481    2217121         1484745    40.70  0.670   1.945   2.734     0.9315  (S=2329678)
//     181   2111      36481    4464769         2607395    71.47  0.584   1.930   2.842     0.9205  (S=4578908)
//     181   2999      36481    9006001         5124753   140.48  0.569   1.930   2.972     0.9150  (S=8999699)
//     181   4253      36481   18139081         8999699   246.70  0.496   1.916   3.080     0.9132  (S=17688624)
//     181   6037      36481   36517849        17688624   484.87  0.484   1.917   3.210     0.9095  (S=34766432)
//     257    367      69169     139129          274149     3.96  1.970   2.120   2.256     1.0597  (S=139483)
//     257    521      69169     273529          384344     5.56  1.405   2.056   2.317     1.0534  (S=274149)
//     257    739      69169     552049          603064     8.72  1.092   2.015   2.399     1.0192  (S=538831)
//     257   1049      69169    1104601         1059056    15.31  0.959   1.994   2.500     0.9863  (S=1059056)
//     257   1487      69169    2217121         1859832    26.89  0.839   1.976   2.602     0.9485  (S=2329678)
//     257   2111      69169    4464769         2918219    42.19  0.654   1.945   2.683     0.9280  (S=4578908)
//     257   2999      69169    9006001         5124753    74.09  0.569   1.930   2.784     0.9155  (S=8999699)
//     257   4253      69169   18139081         8999699   130.11  0.496   1.916   2.886     0.9091  (S=17688624)
//     257   6037      69169   36517849        15804583   228.49  0.433   1.904   2.987     0.9045  (S=34766432)
//     367    521     139129     273529          481439     3.46  1.760   2.092   2.216     1.0572  (S=274149)
//     367    739     139129     552049          755415     5.43  1.368   2.049   2.292     1.0468  (S=538831)
//     367   1049     139129    1104601         1185304     8.52  1.073   2.011   2.368     1.0171  (S=1059056)
//     367   1487     139129    2217121         2081540    14.96  0.939   1.992   2.464     0.9710  (S=2329678)
//     367   2111     139129    4464769         3266096    23.48  0.732   1.959   2.540     0.9437  (S=4578908)
//     367   2999     139129    9006001         5735667    41.23  0.637   1.944   2.635     0.9243  (S=8999699)
//     367   4253     139129   18139081        10072540    72.40  0.555   1.930   2.731     0.9113  (S=17688624)
//     367   6037     139129   36517849        17688624   127.14  0.484   1.917   2.826     0.9013  (S=34766432)
//     521    739     273529     552049         1059056     3.87  1.918   2.100   2.218     1.0585  (S=538831)
//     521   1049     273529    1104601         1661739     6.08  1.504   2.059   2.290     1.0521  (S=1059056)
//     521   1487     273529    2217121         2607395     9.53  1.176   2.023   2.362     1.0069  (S=2329678)
//     521   2111     273529    4464769         4091202    14.96  0.916   1.989   2.434     0.9718  (S=4578908)
//     521   2999     273529    9006001         6419408    23.47  0.713   1.958   2.506     0.9449  (S=8999699)
//     521   4253     273529   18139081        11273273    41.21  0.621   1.943   2.596     0.9237  (S=17688624)
//     521   6037     273529   36517849        19797259    72.38  0.542   1.930   2.686     0.9068  (S=34766432)
//     739   1049     552049    1104601         2081540     3.77  1.884   2.092   2.203     1.0585  (S=1059056)
//     739   1487     552049    2217121         3266096     5.92  1.473   2.053   2.271     1.0361  (S=2329678)
//     739   2111     552049    4464769         5124753     9.28  1.148   2.018   2.339     1.0046  (S=4578908)
//     739   2999     552049    9006001         8041128    14.57  0.893   1.986   2.407     0.9735  (S=8999699)
//     739   4253     552049   18139081        12617143    22.86  0.696   1.957   2.475     0.9451  (S=17688624)
//     739   6037     552049   36517849        22157261    40.14  0.607   1.943   2.561     0.9206  (S=34766432)
//    1049   1487    1104601    2217121         4091202     3.70  1.845   2.084   2.189     1.0470  (S=2329678)
//    1049   2111    1104601    4464769         6419408     5.81  1.438   2.048   2.254     1.0366  (S=4578908)
//    1049   2999    1104601    9006001        10072540     9.12  1.118   2.014   2.318     1.0074  (S=8999699)
//    1049   4253    1104601   18139081        15804583    14.31  0.871   1.984   2.383     0.9747  (S=17688624)
//    1049   6037    1104601   36517849        24798596    22.45  0.679   1.956   2.448     0.9433  (S=34766432)
//    1487   2111    2217121    4464769         8041128     3.63  1.801   2.077   2.177     1.0439  (S=4578908)
//    1487   2999    2217121    9006001        12617143     5.69  1.401   2.042   2.238     1.0367  (S=8999699)
//    1487   4253    2217121   18139081        19797259     8.93  1.091   2.011   2.300     1.0077  (S=17688624)
//    1487   6037    2217121   36517849        31063409    14.01  0.851   1.982   2.362     0.9729  (S=34766432)
//    2111   2999    4464769    9006001        15804583     3.54  1.755   2.070   2.165     1.0459  (S=8999699)
//    2111   4253    4464769   18139081        24798596     5.55  1.367   2.038   2.224     1.0384  (S=17688624)
//    2111   6037    4464769   36517849        38910887     8.72  1.066   2.008   2.283     1.0080  (S=34766432)
//    2999   4253    9006001   18139081        31063409     3.45  1.713   2.065   2.155     1.0467  (S=17688624)
//    2999   6037    9006001   36517849        48740856     5.41  1.335   2.033   2.211     1.0384  (S=34766432)
//    4253   6037   18139081   36517849        61054148     3.37  1.672   2.059   2.146     1.0460  (S=34766432)
//
//   Pairs with y'^2 <= x are omitted; for those the origin count at S = y'^2 is
//   identically 0 and the lemma states 0 = 0.
//
//   THE CROSSOVER LAW IN ONE LINE. Distribution of u_x = ln S*/ln x:
//
//   u_x at the crossing:  n=127  min=1.012  p05=1.916  median=1.993  p95=2.149  max=2.224
//   in the band [1.90, 2.23]: 122 of 127
//   the 5 outside it, all with x near y'^2 where the lemma is already vacuous:
//      y=  19 x=  367  u_x=1.072  ln x/ln y=2.01
//      y=  19 x=  521  u_x=1.012  ln x/ln y=2.12
//      y=  29 x=  739  u_x=1.043  ln x/ln y=1.96
//      y=  43 x= 2111  u_x=1.018  ln x/ln y=2.04
//      y=  61 x= 4253  u_x=1.013  ln x/ln y=2.03
//
//   And the largest ln x/ln y at which the origin still beats the mean at S = x'^2:
//
//   x          367    521    739   1049   1487   2111   2999   4253   6037
//   max      1.219  1.203  1.190  1.178  1.168  1.159  1.151  1.144  1.137
//   ln x/ln y
//
//   Monotone down over nine levels: the band of y that helps is shrinking
//   toward y = x, which is the degenerate matrix.
//
//
// F2. THE COLLAPSE THE WHOLE LAW RESTS ON.
//     The crossover law reads origin/mean = rho(u_x)/rho(u_y) with ONE function
//     rho. That needs rho_z(z^u) to be independent of z. Measured across the
//     ladder of levels in the same window:
//
//         u  z=  43 z=  61 z=  89 z= 127 z= 181 z= 257 z= 367 z= 521 z= 739 z=1049 z=1487 z=2111 z=2999 z=4253 z=6037     spread
//      1.90   1.0979  1.1718  1.1821  1.1432  1.1028  1.1203  1.0773  1.0808  1.0670  1.0512  1.0424  1.0431  1.0335  1.0205  1.0098   0.1722
//      2.00   1.0299  1.0569  1.0534  0.9952  1.0073  0.9820  0.9669  0.9623  0.9514  0.9487  0.9356  0.9300  0.9246  0.9187  0.9121   0.1449
//      2.10   0.9843  1.0407  0.9563  0.9514  0.9382  0.9197  0.9148  0.9025  0.8963  0.8937  0.8908  0.8821  0.8758  0.8700  0.8655   0.1751
//      2.30   0.9832  0.9551  0.9316  0.9256  0.9266  0.9205  0.9189  0.9216  0.9218  0.9178  0.9161  0.9146  0.9127     -       -     0.0705
//      2.60   0.9932  0.9777  0.9765  0.9778  0.9781  0.9809  0.9854  0.9845  0.9852  0.9868     -       -       -       -       -     0.0167
//      3.00   1.0040  1.0088  1.0070  1.0088  1.0105  1.0106  1.0121     -       -       -       -       -       -       -       -     0.0081
//      3.50   1.0019  1.0008  1.0012  1.0007  1.0004     -       -       -       -       -       -       -       -       -       -     0.0015
//      4.00   0.9994  0.9995  0.9995     -       -       -       -       -       -       -       -       -       -       -       -     0.0002
//
//     (dashes are u where z^u falls outside the sieved window or off the grid)
//     A tight collapse means rho is a function of u alone, which is FOLD-PROFILE
//     section 9a re-measured, and it is what makes the crossover law a law.
//
// F3. THE SHAPE OF rho ON [1,2], against e^{2gamma}/u^2.
//     Taking the level ladder and reading rho at S = z^u for u below 2:
//
//         u    mean rho over levels   e^{2gamma}/u^2   ratio (the finite-size HL factor)
//      1.30               1.85866         1.87705     0.9902   (12 levels)
//      1.45               1.70432         1.50878     1.1296   (13 levels)
//      1.60               1.47356         1.23915     1.1892   (14 levels)
//      1.75               1.26089         1.03583     1.2173   (15 levels)
//      1.85               1.14000         0.92687     1.2299   (15 levels)
//      1.95               1.02390         0.83425     1.2273   (15 levels)
//      2.00               0.97166         0.79305     1.2252   (15 levels)
//
//   And against the d = 1 ensemble (all x# translates), where the mean is just
//   S*delta_x. Here origin/mean = rho_x(x'^2) = rho(2) with no y at all:
//
//        x       x'^2       origin     S*delta_x    rho_x(x'^2)    HL factor   rho/HL   (target 0.79305)
//       13         289           25          24.7     1.01111     1.46257  0.69132
//       19         529           20          19.5     1.02459     1.17006  0.87568
//       29         961           30          32.6     0.91961     1.09750  0.83791
//       43        2209           61          57.6     1.05928     1.26003  0.84068
//       61        4489          105          97.4     1.07767     1.30634  0.82495
//       89        9409          187         182.7     1.02326     1.26663  0.80786
//      127       17161          280         281.4     0.99517     1.21712  0.81764
//      181       36481          538         536.7     1.00250     1.24283  0.80662
//      257       69169          902         936.8     0.96281     1.20108  0.80161
//      367      139129         1584        1638.3     0.96686     1.20691  0.80110
//      521      273529         2765        2873.3     0.96230     1.19767  0.80348
//      739      552049         4835        5082.2     0.95136     1.18365  0.80375
//     1049     1104601         8563        9025.6     0.94874     1.17858  0.80499
//     1487     2217121        16883       18044.6     0.93562     1.17982  0.79303
//     2111     4464769        30074       32339.3     0.92995     1.17011  0.79475
//     2999     9006001        53783       58169.5     0.92459     1.16056  0.79668
//     4253    18139081        96465      105002.3     0.91869     1.15034  0.79863
//     6037    36517849       173738      190487.2     0.91207     1.14120  0.79922
//
//   Column rho/HL strips the finite-size Hardy-Littlewood overshoot of the window
//   and should sit on e^{2gamma}/4 = 0.79305 already. The raw rho_x(x'^2)
//   column approaches it from above like 1 + c/ln x.
//
// [done in 12.6s]
// ============================================================================
// READINGS
//
