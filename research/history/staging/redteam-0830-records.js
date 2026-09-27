'use strict';
// ============================================================================
// RED TEAM 2026-08-30 — the two record/D* notes of 2026-08-29 evening and
// 2026-08-30, attacked on independent code.
//
//   (a) research/history/staging/attack-0829n-parity-dstar.md   (CLOSED, HELD)
//   (b) research/history/staging/attack-0830-record-mechanism.md (PARTIAL, HELD)
//
// Nothing here re-uses either producer's engine.  What is re-used, and named
// where it is used, is (i) the two notes' own definitions, (ii) the ladder
// research/a113274-gap-records.js, (iii) the pseudo-random generator SPEC of
// the parity producer's N-thin null and of the record producer's null, because
// a per-anchor / per-replicate comparison is impossible without the same draws.
// Every solver, sieve, fit and statistic below is written here from the stated
// definitions.
//
// The load-bearing difference from note (a): its m*(D) is a floating-point
// simplex with a presolve and periodic rebuilds.  Section 2 recomputes m* in
// EXACT BigInt rational arithmetic with a two-phase simplex written here, at
// every anchor of both ranges and both arms, and compares D* exactly.
//
// The load-bearing difference from note (b): its gap law at height comes from
// its own sieve to 1e11.  Section 5 sieves again, on a different wheel and a
// different segmentation, and Sections 6-7 rebuild the record null with a
// different generator.
//
// Run:  node research/history/staging/redteam-0830-records.js
//       node research/history/staging/redteam-0830-records.js --quick   (smoke)
// Embed: node research/qc/embed.js --timeout 2400 research/history/staging/redteam-0830-records.js
// No wall-clock on stdout; progress goes to stderr.
// ============================================================================

const fs = require('fs'), path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const QUICK = process.argv.includes('--quick');
const T0 = Date.now();
const prog = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(0) + 's] ' + s + '\n');
const log = (s) => console.log(s);
const F = (x, d) => (Number.isFinite(x) ? x.toFixed(d) : String(x));
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) * (x - m), 0) / a.length); };
const med = (a) => { const b = a.slice().sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
let FAILS = 0;
const check = (tag, ok) => { if (!ok) { FAILS++; log('  CHECK FAIL: ' + tag); } return ok; };

// ---------------------------------------------------------------- exact Q ---
function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
function R(n, d) { if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d) || 1n; return { n: n / g, d: d / g }; }
const rq = (n, d = 1n) => R(BigInt(n), BigInt(d));
const RZ = rq(0), R1 = rq(1);
const isz = (x) => x.n === 0n;
const radd = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d);
const rsub = (a, b) => R(a.n * b.d - b.n * a.d, a.d * b.d);
const rmul = (a, b) => R(a.n * b.n, a.d * b.d);
const rdiv = (a, b) => R(a.n * b.d, a.d * b.n);
const rcmp = (a, b) => { const l = a.n * b.d, r = b.n * a.d; return l < r ? -1 : l > r ? 1 : 0; };
const rnum = (a) => Number(a.n) / Number(a.d);
const rstr = (a) => a.d === 1n ? String(a.n) : (a.n + '/' + a.d);

// Exact two-phase simplex.  maximise sum_j x_j  s.t.  A x = b, x >= 0.
// A given as row -> list of column indices (all coefficients 1); b integers > 0.
// Dense rational tableau, Dantzig entering with a Bland restart, Bland tie-break
// on the ratio test (anti-cycling).  Returns {status, value} with value exact.
function exactSimplex(A, b, n, lim) {
  const m = A.length, NT = n + m;
  const T = [];
  for (let i = 0; i < m; i++) { const r = new Array(NT + 1).fill(RZ); for (const c of A[i]) r[c] = R1; r[n + i] = R1; r[NT] = rq(b[i]); T.push(r); }
  const basis = new Int32Array(m); for (let i = 0; i < m; i++) basis[i] = n + i;
  let iters = 0;
  function phase(cost, bland, allow) {
    const zr = new Array(NT + 1).fill(RZ);
    for (let i = 0; i < m; i++) { const cb = cost[basis[i]]; if (isz(cb)) continue; for (let j = 0; j <= NT; j++) if (!isz(T[i][j])) zr[j] = radd(zr[j], rmul(cb, T[i][j])); }
    for (let j = 0; j < NT; j++) zr[j] = rsub(zr[j], cost[j]);
    while (true) {
      if (++iters > lim) return 'limit';
      let e = -1;
      if (bland) { for (let j = 0; j < NT; j++) if (allow[j] && rcmp(zr[j], RZ) > 0) { e = j; break; } }
      else { let best = RZ; for (let j = 0; j < NT; j++) if (allow[j] && rcmp(zr[j], best) > 0) { best = zr[j]; e = j; } }
      if (e === -1) return 'opt';
      let pr = -1, br = null;
      for (let i = 0; i < m; i++) { const a = T[i][e]; if (rcmp(a, RZ) <= 0) continue; const r = rdiv(T[i][NT], a);
        if (pr === -1 || rcmp(r, br) < 0 || (rcmp(r, br) === 0 && basis[i] < basis[pr])) { pr = i; br = r; } }
      if (pr === -1) return 'unbounded';
      const p = T[pr][e], rw = T[pr];
      if (!(p.n === 1n && p.d === 1n)) for (let j = 0; j <= NT; j++) if (!isz(rw[j])) rw[j] = rdiv(rw[j], p);
      for (let i = 0; i < m; i++) { if (i === pr) continue; const f = T[i][e]; if (isz(f)) continue; const ri = T[i];
        for (let j = 0; j <= NT; j++) { if (isz(rw[j])) continue; ri[j] = rsub(ri[j], rmul(f, rw[j])); } }
      const f = zr[e]; if (!isz(f)) for (let j = 0; j <= NT; j++) { if (isz(rw[j])) continue; zr[j] = rsub(zr[j], rmul(f, rw[j])); }
      basis[pr] = e;
    }
  }
  const cI = new Array(NT).fill(RZ); for (let j = n; j < NT; j++) cI[j] = R1;
  const allA = new Array(NT).fill(true);
  let st = phase(cI, false, allA); if (st === 'limit') { iters = 0; st = phase(cI, true, allA); }
  if (st !== 'opt') return { status: 'phase1-' + st };
  let inf = RZ; for (let i = 0; i < m; i++) if (basis[i] >= n) inf = radd(inf, T[i][NT]);
  if (!isz(inf)) return { status: 'infeasible' };
  for (let i = 0; i < m; i++) if (basis[i] >= n) {
    let e = -1; for (let j = 0; j < n; j++) if (!isz(T[i][j])) { e = j; break; }
    if (e === -1) continue;
    const p = T[i][e], rw = T[i]; for (let j = 0; j <= NT; j++) if (!isz(rw[j])) rw[j] = rdiv(rw[j], p);
    for (let k = 0; k < m; k++) { if (k === i) continue; const f = T[k][e]; if (isz(f)) continue; const rk = T[k];
      for (let j = 0; j <= NT; j++) { if (isz(rw[j])) continue; rk[j] = rsub(rk[j], rmul(f, rw[j])); } }
    basis[i] = e;
  }
  const cII = new Array(NT).fill(RZ); for (let j = 0; j < n; j++) cII[j] = rq(-1);
  const allB = new Array(NT).fill(true); for (let j = n; j < NT; j++) allB[j] = false;
  iters = 0;
  st = phase(cII, false, allB); if (st === 'limit') { iters = 0; st = phase(cII, true, allB); }
  if (st === 'unbounded') return { status: 'unbounded' };
  if (st !== 'opt') return { status: 'phase2-' + st };
  let v = RZ; for (let i = 0; i < m; i++) if (basis[i] < n) v = radd(v, T[i][NT]);
  return { status: 'opt', value: v };
}

// ------------------------------------------------- the stretch, rebuilt ------
const PLIM = 21000;
const cflag = new Uint8Array(PLIM + 1); cflag[0] = cflag[1] = 1;
for (let i = 2; i * i <= PLIM; i++) if (!cflag[i]) for (let j = i * i; j <= PLIM; j += i) cflag[j] = 1;
const PRIMES = []; for (let k = 2; k <= PLIM; k++) if (!cflag[k]) PRIMES.push(k);
const ACT = PRIMES.filter(p => p >= 7);
const IDXOF = new Map(); ACT.forEach((p, i) => IDXOF.set(p, i));
const open30 = (c) => c === 11 || c === 17 || c === 29;
// the parity producer's generator, reproduced from its source so that null
// anchors are comparable at all; the LP below is this file's own.
function xorRng(seed) { let s = seed >>> 0; if (s === 0) s = 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s + 0.5) / 4294967296; }; }

// signature classes.  TRUE mode by trial division of a and a+2 (the producer
// strides multiples instead); NULL mode by the N-thin spec.
function anchor(Q, mode, seed) {
  const Qi = IDXOF.get(Q), Qp = ACT[Qi + 1], lo = Q * Q, hi = Qp * Qp;
  const sm = ACT.slice(0, Qi + 1);
  const cls = new Map(); let T = 0, C = 0;
  if (mode === 'true') {
    for (let a = lo; a + 2 < hi; a++) {
      if (!open30(a % 30)) continue; C++;
      const s = []; for (const p of sm) if (a % p === 0 || (a + 2) % p === 0) s.push(p);
      if (!s.length) { T++; continue; }
      const k = s.join(','); const e = cls.get(k); if (e) e.n++; else cls.set(k, { primes: s, n: 1 });
    }
  } else {
    const pos = []; for (let a = lo; a + 2 < hi; a++) if (open30(a % 30)) pos.push(a);
    C = pos.length; const rng = xorRng(seed);
    for (let k = 0; k < C; k++) {
      const s = []; for (const p of sm) if (rng() < 2 / p) s.push(p);
      if (!s.length) { T++; continue; }
      const key = s.join(','); const e = cls.get(key); if (e) e.n++; else cls.set(key, { primes: s, n: 1 });
    }
  }
  return { Q, Qp, lo, hi, width: hi - lo, C, T, cls: [...cls.values()] };
}
// d -> {cols, rhs} for every squarefree d | P(Q), 1 < d <= Dmax, |A_d| > 0
function modRows(B, Dmax) {
  const m = new Map();
  B.cls.forEach((c, ci) => { const pr = c.primes, K = pr.length;
    const rec = (j, d) => { if (j === K) { if (d > 1) { let e = m.get(d); if (!e) { e = { cols: [], rhs: 0 }; m.set(d, e); } e.cols.push(ci); e.rhs += c.n; } return; }
      rec(j + 1, d); const d2 = d * pr[j]; if (d2 <= Dmax) rec(j + 1, d2); };
    rec(0, 1); });
  return m;
}
// exact m*(D) = max(0, C - max{sum nu over non-twin classes : rows d <= D}).
// The presolve (a row whose unknowns are forced, a row with residual 0) is exact
// implication over nonnegative variables, not a heuristic; it is asserted here.
function mstarExact(B, rows, D, lim, maxM) {
  const nC = B.cls.length, fixed = new Array(nC).fill(null), seen = new Map(), act = [];
  for (const [d, e] of rows) { if (d > D) continue; const k = e.cols.join(',');
    if (seen.has(k)) { if (seen.get(k) !== e.rhs) throw new Error('equal support, unequal |A_d|'); continue; }
    seen.set(k, e.rhs); act.push({ cols: e.cols, rhs: e.rhs, done: false }); }
  let ch = true;
  while (ch) { ch = false;
    for (const r of act) { if (r.done) continue; const uc = []; let s = 0;
      for (const c of r.cols) { if (fixed[c] !== null) s += fixed[c]; else uc.push(c); }
      const res = r.rhs - s;
      if (uc.length === 0) { if (res !== 0) return { status: 'inconsistent' }; r.done = true; ch = true; continue; }
      if (res === 0) { for (const c of uc) fixed[c] = 0; r.done = true; ch = true; continue; }
      if (uc.length === 1) { fixed[uc[0]] = res; r.done = true; ch = true; continue; }
      r.uc = uc; r.res = res; } }
  let base = 0; for (let i = 0; i < nC; i++) if (fixed[i] !== null) base += fixed[i];
  const idx = new Int32Array(nC).fill(-1); let nf = 0;
  for (let i = 0; i < nC; i++) if (fixed[i] === null) idx[i] = nf++;
  const live = act.filter(r => !r.done);
  if (nf === 0) return { status: 'opt', ms: rq(B.C - base), m: 0, n: 0 };
  if (live.length === 0) return { status: 'unbounded', ms: RZ, m: 0, n: nf };
  if (maxM && (live.length > maxM || nf > 2 * maxM)) return { status: 'toolarge', ms: null, m: live.length, n: nf };
  const Amat = live.map(r => r.uc.map(c => idx[c])), bb = live.map(r => r.res);
  const S = exactSimplex(Amat, bb, nf, lim || 400000);
  if (S.status === 'unbounded') return { status: 'unbounded', ms: RZ, m: live.length, n: nf };
  if (S.status !== 'opt') return { status: S.status, ms: null, m: live.length, n: nf };
  const raw = rsub(rq(B.C), radd(S.value, rq(base)));
  return { status: 'opt', ms: rcmp(raw, RZ) < 0 ? RZ : raw, raw, m: live.length, n: nf };
}

log('REDTEAM-0830-RECORDS — independent attack on attack-0829n-parity-dstar.md and');
log('  attack-0830-record-mechanism.md.  Exact rational LP for D*, an independent');
log('  twin sieve for the gap law at height, an independent record null.');
log('');

// ============================================================================
// S1.  CUSTODY OF THE CUSTODY GATE (note a, section 1)
// ============================================================================
prog('S1');
const PDS = fs.readFileSync(path.join(REPO, 'research/history/staging/attack-0829n-parity-dstar.js'), 'utf8');
const OLDSRC = fs.readFileSync(path.join(REPO, 'research/attack-parity-adversary-01.js'), 'utf8');
// (i) the 43-anchor table as the OLD producer's own embedded OUTPUT prints it
const oldOut = [];
for (const ln of OLDSRC.split('\n')) {
  const m = ln.match(/^\/\/\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\|\s+(\d+)\s+(\d+)\s+(\d+)\s+\|\s+[\d.]+\s+[\d.]+\s+[\d.]+\s+\|\s+(\d+)\s+([\d.]+)\s+([\d.]+)/);
  if (m) oldOut.push([+m[1], +m[5], +m[6], +m[7], +m[8], +m[2], +m[3], +m[4]]);
}
// (ii) the OLD table as note (a)'s producer hard-codes it
const hc = PDS.match(/const OLD = \[([\s\S]*?)\]\];/)[1] + ']';
const hcRows = [...hc.matchAll(/\[(\d+), (\d+), (\d+), (\d+), (\d+)\]/g)].map(m => m.slice(1).map(Number));
{
  log('S1. CUSTODY OF THE CUSTODY GATE.  Note (a) licenses a float engine on 172');
  log('  integer figures of research/attack-parity-adversary-01.js, but it compares');
  log('  against a table hand-copied into its own source.  That copy is checked here');
  log('  against the old producer\'s embedded OUTPUT block, parsed independently.');
  log('    old OUTPUT anchors parsed: ' + oldOut.length + '; hard-coded OLD rows: ' + hcRows.length);
  let bad = 0, cmpd = 0;
  for (let i = 0; i < Math.min(oldOut.length, hcRows.length); i++)
    for (let j = 0; j < 5; j++) { cmpd++; if (oldOut[i][j] !== hcRows[i][j]) { bad++; log('      MISMATCH at Q=' + oldOut[i][0] + ' col ' + j + ': OUTPUT ' + oldOut[i][j] + ' vs OLD ' + hcRows[i][j]); } }
  log('    figures compared: ' + cmpd + '; mismatches: ' + bad);
  check('S1 transcription', bad === 0 && oldOut.length === 43 && hcRows.length === 43);
}
log('');

// ============================================================================
// S2.  D* RE-DERIVED IN EXACT RATIONAL ARITHMETIC (note a, sections 1 and 3)
// ============================================================================
prog('S2 exact LP');
// the per-anchor table of note (a)'s OUTPUT, parsed
const NEWTAB = [];
for (const ln of PDS.split('\n')) {
  const m = ln.match(/^\/\/\s+([TN])([12])\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+\|\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+\|\s+([\d.]+)\s+([\d.]+)\s+\|\s+(\d+)/);
  if (m) NEWTAB.push({ mode: m[1] === 'T' ? 'true' : 'null', dec: +m[2], Q: +m[3], gap: +m[4], width: +m[5], C: +m[6], T: +m[7],
                       Dstar: +m[8], dw: +m[9], lnr: +m[10], mAt: +m[11], mBelow: +m[12], lps: +m[13] });
}
const VER = [];          // verified rows, this file's own D*
{
  log('S2. D* RE-DERIVED EXACTLY.  For every anchor of note (a)\'s new range, and for');
  log('  the 43 anchors of the old range, this file rebuilds the signature classes by');
  log('  trial division, enumerates the moduli, applies the (exact) presolve and');
  log('  solves the LP in BigInt rational arithmetic.  m* is monotone in D, so');
  log('  m*(D*) >= 1 together with m*(d_prev) < 1 at the modulus immediately below');
  log('  settles D* completely; both are solved.  Float m* is not consulted.');
  log('    tag  arm    Q      D*(note)   D*(exact)  m*(D*) exact   m*(below) exact   LP size   verdict');
  const jobs = [];
  for (const r of NEWTAB) jobs.push(r);
  const SAMPLE = QUICK ? jobs.filter(r => r.C <= 200).slice(0, 12) : jobs;
  let agree = 0, disagree = 0, unres = 0, shown = 0, big = 0;
  const MAXM = QUICK ? 200 : 420;
  const mAtBad = [], mBelBad = [];
  let ndone = 0;
  for (const r of SAMPLE) {
    if (++ndone % 25 === 0) prog('  S2 ' + ndone + '/' + SAMPLE.length + ' (confirmed ' + agree + ', too large ' + big + ')');
    let B, rows, ds, i, prev, at, below;
    try {
      B = anchor(r.Q, r.mode, 20260829 + r.Q);
      if (B.C !== r.C || B.T !== r.T || B.width !== r.width) { log('      BUILD MISMATCH ' + r.mode + ' Q=' + r.Q + ': C ' + B.C + '/' + r.C + ' T ' + B.T + '/' + r.T + ' w ' + B.width + '/' + r.width); disagree++; continue; }
      rows = modRows(B, r.Dstar);
      ds = [...rows.keys()].sort((a, b) => a - b);
      i = ds.indexOf(r.Dstar);
      if (i < 0) { log('      D* NOT A MODULUS at ' + r.mode + ' Q=' + r.Q + ': ' + r.Dstar); disagree++; continue; }
      prev = i > 0 ? ds[i - 1] : null;
      at = mstarExact(B, rows, r.Dstar, 400000, MAXM);
      below = prev === null ? null : mstarExact(B, rows, prev, 400000, MAXM);
    } catch (e) { log('      SOLVER ' + e.message + ' at ' + r.mode + ' Q=' + r.Q); unres++; continue; }
    if (at.status === 'toolarge' || (below && below.status === 'toolarge')) { big++; continue; }
    if (at.status !== 'opt' || (below && below.status !== 'opt' && below.status !== 'unbounded')) { unres++; continue; }
    const ok1 = rcmp(at.ms, R1) >= 0;
    const okB = below === null ? true : rcmp(below.ms, R1) < 0;
    const good = ok1 && okB;
    if (good) agree++; else disagree++;
    // the printed margins: exact m*(D*) against the printed one; m*(below) is an
    // upper bound in note (a) (its simplex stops early), so only < 1 is required.
    if (Math.abs(rnum(at.ms) - r.mAt) > 5e-4) mAtBad.push([r.mode, r.Q, r.mAt, rstr(at.ms)]);
    if (below && rnum(below.ms) - r.mBelow > 5e-4) mBelBad.push([r.mode, r.Q, r.mBelow, rstr(below.ms)]);
    VER.push({ mode: r.mode, dec: r.dec, Q: r.Q, width: r.width, C: r.C, T: r.T, gap: r.gap, Dstar: r.Dstar, exactOK: good,
               mAt: rnum(at.ms), mBelow: below ? rnum(below.ms) : null });
    if (!good || shown < 14) { shown++;
      log('    ' + (r.mode === 'true' ? 'T' : 'N') + r.dec + '  ' + r.mode.padEnd(5) + String(r.Q).padStart(6) + '  ' + String(r.Dstar).padStart(9) + '  ' +
          String(r.Dstar).padStart(9) + '  ' + rstr(at.ms).padStart(12) + '  ' + (below ? rstr(below.ms) : 'none').padStart(15) + '  ' +
          (at.m + 'x' + at.n).padStart(9) + '  ' + (good ? 'D* CONFIRMED' : 'D* WRONG')); }
  }
  log('    (first 14 anchors shown, plus every failure; all ' + SAMPLE.length + ' are scored)');
  log('  RESULT: ' + agree + ' of ' + SAMPLE.length + ' anchors have their D* confirmed exactly, ' + disagree +
      ' contradicted, ' + unres + ' unresolved, ' + big + ' not attempted (live LP above the exact solver\'s size cap,');
  log('    ' + MAXM + ' rows: the widest stretches, where a rational tableau is out of budget).');
  log('    exact m*(D*) differs from the printed float m*(D*) at ' + mAtBad.length + ' anchors' +
      (mAtBad.length ? ': ' + mAtBad.slice(0, 6).map(x => x[0] + ' Q=' + x[1] + ' printed ' + x[2] + ' exact ' + x[3]).join('; ') : ''));
  log('    exact m*(below) EXCEEDS the printed value at ' + mBelBad.length + ' anchors' +
      ' (the printed one is an upper bound: note (a)\'s simplex stops early below D*)');
  const gaps = VER.filter(v => v.mBelow !== null).map(v => 1 - v.mBelow);
  log('    exact threshold gap 1 - m*(below): min ' + F(Math.min(...gaps), 4) + ', over ' + gaps.length + ' anchors' +
      ' (note (a) claims a gap of at least 0.25 from its float upper bounds)');
  check('S2 all D* confirmed', disagree === 0);
}
log('');
// ---- S2b.  the 172-figure gate itself, re-derived rather than reproduced -----
prog('S2b old range');
const OLDVER = [];
{
  log('S2b. THE 172-FIGURE GATE, RE-DERIVED.  Note (a)\'s gate reproduces four integer');
  log('  columns of the old producer at 43 anchors with its own float engine.  Here the');
  log('  same four columns are computed from scratch in exact rational arithmetic, so');
  log('  the old producer is under test as well as the new one.');
  log('       Q  m*(Q) exact/pub  m*(w) exact/pub  m*(Q^2) exact/pub   D* exact/pub');
  let cmp = 0, bad = 0, shown = 0, skipped = 0;
  const rowsOld = QUICK ? oldOut.slice(0, 8) : oldOut;
  for (const [Q, mQ, mW, mQ2, Ds, width, C, T] of rowsOld) {
    prog('  S2b Q=' + Q);
    let B, rows, ds;
    try {
      B = anchor(Q, 'true', 0);
      if (B.C !== C || B.T !== T || B.width !== width) { log('      BUILD MISMATCH Q=' + Q); bad += 4; continue; }
      rows = modRows(B, Q * Q);
      ds = [...rows.keys()].sort((a, b) => a - b);
      const eQ = mstarExact(B, rows, Q, 400000, 900), eW = mstarExact(B, rows, width, 400000, 900), eQ2 = mstarExact(B, rows, Q * Q, 400000, 900);
      if ([eQ, eW, eQ2].some(x => x.status !== 'opt' && x.status !== 'unbounded')) { skipped++; continue; }
      // D*: least modulus with m* >= 1, found by exact bisection on the sorted list
      let lo = -1, hi = ds.length - 1;
      if (rcmp(mstarExact(B, rows, ds[hi], 400000, 900).ms, R1) < 0) { skipped++; continue; }
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; const s = mstarExact(B, rows, ds[mid], 400000, 900); if (s.status === 'toolarge') { skipped++; hi = -1; break; } if (rcmp(s.ms, R1) >= 0) hi = mid; else lo = mid; }
      if (hi < 0) continue;
      const Dex = ds[hi];
      const got = [rnum(eQ.ms), rnum(eW.ms), rnum(eQ2.ms), Dex], want = [mQ, mW, mQ2, Ds];
      for (let j = 0; j < 4; j++) { cmp++; if (Math.abs(got[j] - want[j]) > 1e-9) { bad++; log('      DISAGREE Q=' + Q + ' col ' + j + ': exact ' + got[j] + ' vs published ' + want[j]); } }
      OLDVER.push({ Q, width, C, T, Dstar: Dex });
      if (shown < 6) { shown++;
        log('    ' + String(Q).padStart(6) + '  ' + (rstr(eQ.ms) + '/' + mQ).padStart(15) + '  ' + (rstr(eW.ms) + '/' + mW).padStart(15) +
            '  ' + (rstr(eQ2.ms) + '/' + mQ2).padStart(17) + '  ' + (Dex + '/' + Ds).padStart(14)); }
    } catch (e) { log('      SOLVER ' + e.message + ' at Q=' + Q); skipped++; }
  }
  log('    (first 6 anchors shown, plus every disagreement)');
  log('  RESULT: ' + cmp + ' figures re-derived exactly at ' + OLDVER.length + ' anchors, ' + bad + ' disagreements, ' + skipped + ' anchors skipped.');
  check('S2b 172-figure gate', bad === 0);
}
log('');

// ============================================================================
// S3.  THE FITS, REFITTED ON THIS FILE'S OWN EXACT D* (note a, sections 4-5)
// ============================================================================
prog('S3 fits');
function ols(xs, ys) {
  const n = xs.length, mx = mean(xs), my = mean(ys);
  let sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) * (xs[i] - mx); sxy += (xs[i] - mx) * (ys[i] - my); }
  const b = sxy / sxx, a = my - b * mx;
  const res = ys.map((y, i) => y - a - b * xs[i]);
  const rss = res.reduce((s, r) => s + r * r, 0);
  const s2 = rss / (n - 2), se = Math.sqrt(s2 / sxx);
  // HC1 heteroscedasticity-consistent standard error
  let hc = 0; for (let i = 0; i < n; i++) hc += (xs[i] - mx) * (xs[i] - mx) * res[i] * res[i];
  const seHC = Math.sqrt(hc * n / (n - 2)) / sxx;
  return { n, a, b, se, seHC, rmse: Math.sqrt(rss / n), res };
}
function popStats(rs) {
  if (!rs.length) return null;
  const lq = rs.map(r => Math.log(r.Q)), lw = rs.map(r => Math.log(r.width)), lt = rs.map(r => Math.log(r.T)), ld = rs.map(r => Math.log(r.Dstar));
  return { n: rs.length, c0: mean(rs.map(r => Math.log(r.Dstar) / Math.log(r.Q))),
           fQ: ols(lq, ld), fW: ols(lw, ld), fT: ols(lt, ld),
           dw: mean(rs.map(r => r.Dstar / r.width)), dwMed: med(rs.map(r => r.Dstar / r.width)) };
}
const VT1 = VER.filter(v => v.mode === 'true' && v.dec === 1), VT2 = VER.filter(v => v.mode === 'true' && v.dec === 2);
const VN1 = VER.filter(v => v.mode === 'null' && v.dec === 1), VN2 = VER.filter(v => v.mode === 'null' && v.dec === 2);
const VOLD = OLDVER.filter(v => v.Q >= 31);
{
  log('S3. THE FITS, ON EXACTLY VERIFIED D* ONLY.  Same estimators as note (a)\'s');
  log('  section 5, computed here from this file\'s own D*, with an HC1 (White)');
  log('  standard error beside the textbook one.');
  log('    population            n     c0      c1 (lnQ)        c_w (ln width)    c_T (ln T)      D*/w mean');
  const rows = [['old range Q>=31', VOLD], ['decade 1 true', VT1], ['decade 2 true', VT2], ['decade 1 null', VN1], ['decade 2 null', VN2],
                ['both decades true', VT1.concat(VT2)]];
  const P = {};
  for (const [nm, rs] of rows) { const s = popStats(rs); P[nm] = s; if (!s) continue;
    log('    ' + nm.padEnd(20) + String(s.n).padStart(4) + '  ' + F(s.c0, 3) + '  ' +
        (F(s.fQ.b, 3) + ' +-' + F(s.fQ.se, 3) + '/' + F(s.fQ.seHC, 3)).padStart(20) + '  ' +
        (F(s.fW.b, 3) + ' +-' + F(s.fW.se, 3) + '/' + F(s.fW.seHC, 3)).padStart(20) + '  ' +
        (F(s.fT.b, 3) + ' +-' + F(s.fT.se, 3)).padStart(14) + '  ' + F(s.dw, 3).padStart(8)); }
  log('  (c1 +- textbook SE / HC1 SE.  Note (a) quotes only the textbook SE.)');
  const d1 = P['decade 1 true'];
  if (d1) {
    log('  Width law, decade 1: slope ' + F(d1.fW.b, 4) + ' +- ' + F(d1.fW.se, 4) + ' (HC1 ' + F(d1.fW.seHC, 4) + '), rmse ' + F(d1.fW.rmse, 4) +
        '; distance from 1 is ' + F((d1.fW.b - 1) / d1.fW.se, 2) + ' textbook SE, ' + F((d1.fW.b - 1) / d1.fW.seHC, 2) + ' HC1 SE.');
    // pairs bootstrap on the width fit
    let s = 12345; const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
    const bs = []; const xs = VT1.map(v => Math.log(v.width)), ys = VT1.map(v => Math.log(v.Dstar));
    for (let b = 0; b < 2000; b++) { const X = [], Y = []; for (let i = 0; i < xs.length; i++) { const k = Math.floor(rnd() * xs.length); X.push(xs[k]); Y.push(ys[k]); } bs.push(ols(X, Y).b); }
    bs.sort((a, b) => a - b);
    log('    pairs bootstrap (2000): slope 2.5% ' + F(bs[50], 4) + ', 97.5% ' + F(bs[1949], 4) + ' — 1 is ' + (bs[50] <= 1 && 1 <= bs[1949] ? 'INSIDE' : 'outside') + ' the interval.');
    // is a single exponent distinguishable from proportionality with a log factor?
    const n = VT1.length;
    const y = VT1.map(v => Math.log(v.Dstar) - Math.log(v.width));      // ln(D*/width)
    const x2 = VT1.map(v => Math.log(Math.log(v.width)));
    const f2 = ols(x2, y), f1 = ols(VT1.map(v => Math.log(v.width)), y);
    const rss1 = f1.rmse * f1.rmse * n, rss2 = f2.rmse * f2.rmse * n;
    log('    ln(D*/width) on ln width: slope ' + F(f1.b, 4) + ' +- ' + F(f1.se, 4) + ', rmse ' + F(f1.rmse, 4));
    log('    ln(D*/width) on ln ln width: slope ' + F(f2.b, 4) + ' +- ' + F(f2.se, 4) + ', rmse ' + F(f2.rmse, 4) +
        '   (rss ratio log-model/power-model ' + F(rss2 / rss1, 4) + ')');
    log('    So over the decade of width this range spans (ln width from ' + F(Math.min(...xs), 2) + ' to ' + F(Math.max(...xs), 2) +
        ') the data do not separate D* ~ width^' + F(d1.fW.b, 2) + ' from D* ~ width (ln width)^k:');
    log('    the two one-parameter fits differ in residual sum of squares by ' + F(100 * (rss2 / rss1 - 1), 2) + ' per cent.');
    // the estimator control X3 = round(0.35 width), and its width fit
    const X3 = VT1.map(v => ({ Q: v.Q, width: v.width, T: v.T, Dstar: Math.round(0.35 * v.width) }));
    const s3 = popStats(X3);
    log('    control X3 = round(0.35 width) on the same anchors: c0 ' + F(s3.c0, 3) + ', c1 ' + F(s3.fQ.b, 3) + ' +- ' + F(s3.fQ.se, 3) +
        ' (rmse ' + F(s3.fQ.rmse, 3) + '), c_w ' + F(s3.fW.b, 4) + ' +- ' + F(s3.fW.se, 4) + ' (rmse ' + F(s3.fW.rmse, 4) + ')');
    log('    The same control that discounts kill clause (a) reproduces the Q-fit; it does');
    log('    NOT reproduce the width fit (c_w ' + F(s3.fW.b, 4) + ', rmse ' + F(s3.fW.rmse, 4) + '), so reading 2\'s');
    log('    content is the residual scatter ' + F(d1.fW.rmse, 3) + ' and the excess ' + F(d1.fW.b - 1, 3) + ' over proportionality, nothing else.');
  }
  // the same estimators on note (a)'s FULL populations, from its own per-anchor D*
  log('  The subset above is size-truncated: the exact solver skips the widest stretches, so');
  log('  its width fit is not comparable to note (a)\'s.  The same estimators are therefore run');
  log('  again on note (a)\'s complete per-anchor table (custody-bound output, ' + VER.length +
      ' of whose 376 D* are confirmed exactly above), with this file\'s own regression code:');
  const full = (dec, mode) => NEWTAB.filter(r => r.dec === dec && r.mode === mode).map(r => ({ Q: r.Q, width: r.width, T: r.T, Dstar: r.Dstar }));
  for (const [nm, rs] of [['decade 1 true', full(1, 'true')], ['decade 2 true', full(2, 'true')],
                          ['decade 1 null', full(1, 'null')], ['decade 2 null', full(2, 'null')],
                          ['both decades true', full(1, 'true').concat(full(2, 'true'))]]) {
    const st = popStats(rs);
    log('    ' + nm.padEnd(20) + String(st.n).padStart(4) + '  c0 ' + F(st.c0, 3) + '  c1 ' + F(st.fQ.b, 3) + ' +- ' + F(st.fQ.se, 3) +
        ' (HC1 ' + F(st.fQ.seHC, 3) + ', rmse ' + F(st.fQ.rmse, 3) + ')  c_w ' + F(st.fW.b, 3) + ' +- ' + F(st.fW.se, 3) +
        ' (HC1 ' + F(st.fW.seHC, 3) + ', rmse ' + F(st.fW.rmse, 3) + ')  D*/w ' + F(st.dw, 3));
  }
  log('    Published: decade 1 c0 1.257, c1 1.204 +- 0.069 rmse 0.647, c_w 1.097 +- 0.012 rmse 0.164,');
  log('    D*/w 0.526; decade 2 c0 1.164, c1 0.575 +- 0.134, c_w 1.028 +- 0.061.');
  {
    const d1f = popStats(full(1, 'true'));
    log('    HC1 against textbook on the published decade-1 width fit: ' + F(d1f.fW.se, 4) + ' textbook, ' +
        F(d1f.fW.seHC, 4) + ' HC1; the slope sits ' + F((d1f.fW.b - 1) / d1f.fW.seHC, 1) + ' HC1 SE above proportionality.');
    const yy = full(1, 'true').map(r => Math.log(r.Dstar) - Math.log(r.width));
    const f1 = ols(full(1, 'true').map(r => Math.log(r.width)), yy), f2 = ols(full(1, 'true').map(r => Math.log(Math.log(r.width))), yy);
    log('    ln(D*/width) on ln width: ' + F(f1.b, 4) + ' +- ' + F(f1.se, 4) + ', rmse ' + F(f1.rmse, 4) +
        '; on ln ln width: ' + F(f2.b, 4) + ' +- ' + F(f2.se, 4) + ', rmse ' + F(f2.rmse, 4) +
        ' (rss ratio ' + F((f2.rmse / f1.rmse) ** 2, 4) + ')');
    const bq = new Map(full(1, 'null').map(r => [r.Q, r]));
    const pr = full(1, 'true').filter(r => bq.has(r.Q));
    const lq = pr.map(r => Math.log(r.Q));
    const dt = ols(lq, pr.map(r => Math.log(r.Dstar) - Math.log(bq.get(r.Q).Dstar)));
    const wt2 = ols(pr.map(r => Math.log(r.width)), pr.map(r => Math.log(r.Dstar)));
    const wn2 = ols(pr.map(r => Math.log(r.width)), pr.map(r => Math.log(bq.get(r.Q).Dstar)));
    log('    matched decade 1, n = ' + pr.length + ': paired ln Q slope difference ' + F(dt.b, 4) + ' +- ' + F(dt.se, 4) +
        ', 95% [' + F(dt.b - 1.96 * dt.se, 3) + ', ' + F(dt.b + 1.96 * dt.se, 3) + ']; WIDTH slope true ' + F(wt2.b, 4) +
        ' +- ' + F(wt2.se, 4) + ', null ' + F(wn2.b, 4) + ' +- ' + F(wn2.se, 4) + ', difference ' + F(wt2.b - wn2.b, 4));
    log('    (Note (a)\'s P4 line reports |c1 null - c1 true| = 0.025 on this set.  The paired');
    log('    standard error of that difference is ' + F(dt.se, 4) + ', so the test resolves differences of about ' +
        F(1.96 * dt.se, 2) + '.)');
  }
  // matched null-vs-true on decade 1, paired, with a standard error for P4
  const byQ = new Map(VN1.map(v => [v.Q, v]));
  const pairs = VT1.filter(v => byQ.has(v.Q)).map(v => ({ t: v, u: byQ.get(v.Q) }));
  if (pairs.length >= 10) {
    const tq = pairs.map(p => Math.log(p.t.Q)), td = pairs.map(p => Math.log(p.t.Dstar)), nd = pairs.map(p => Math.log(p.u.Dstar));
    const ft = ols(tq, td), fn = ols(tq, nd);
    const fd = ols(tq, td.map((v, i) => v - nd[i]));           // the paired difference regression: slope = c1(true) - c1(null)
    log('  P4, the null-agreement clause, re-run on ' + pairs.length + ' matched decade-1 anchors:');
    log('    c1 true ' + F(ft.b, 4) + ' +- ' + F(ft.se, 4) + ', c1 null ' + F(fn.b, 4) + ' +- ' + F(fn.se, 4) + ', difference ' + F(ft.b - fn.b, 4));
    log('    PAIRED standard error of that difference (regression of ln D*true - ln D*null on ln Q): ' + F(fd.se, 4) +
        ', 95% interval [' + F(fd.b - 1.96 * fd.se, 3) + ', ' + F(fd.b + 1.96 * fd.se, 3) + ']');
    log('    The registered band was |difference| <= 0.15.  The interval\'s half-width is ' + F(1.96 * fd.se, 3) +
        ', i.e. ' + F(1.96 * fd.se / 0.15, 2) + ' times the band, so P4 could not have failed unless the');
    log('    two arms differed by more than about ' + F(Math.max(0.15, 1.96 * fd.se), 2) + ' in slope.');
    const wt = ols(pairs.map(p => Math.log(p.t.width)), td), wn = ols(pairs.map(p => Math.log(p.u.width)), nd);
    log('    On the WIDTH coordinate, matched: c_w true ' + F(wt.b, 4) + ' +- ' + F(wt.se, 4) + ', null ' + F(wn.b, 4) + ' +- ' + F(wn.se, 4) +
        ', difference ' + F(wt.b - wn.b, 4));
    log('    Note (a)\'s section 6, its ledger verdict, TODO item Z5 and REFUTED row 95 all');
    log('    read "the null reproduces the WIDTH law within 0.025 in slope".  0.025 is the');
    log('    difference in the ln Q slope.  The width-law difference is ' + F(Math.abs(wt.b - wn.b), 4) + ' here.');
    const rt = mean(pairs.map(p => p.t.Dstar / p.t.width)), rn = mean(pairs.map(p => p.u.Dstar / p.u.width));
    const lt2 = pairs.map(p => Math.log(p.u.Dstar / p.t.Dstar));
    log('    D*/width mean true ' + F(rt, 4) + ', null ' + F(rn, 4) + ', ratio ' + F(rn / rt, 4) +
        '; mean ln(D*null/D*true) ' + F(mean(lt2), 4) + ' +- ' + F(sd(lt2) / Math.sqrt(lt2.length), 4) +
        ', null below true at ' + lt2.filter(v => v < 0).length + ' of ' + lt2.length);
    log('    T_null/T on matched anchors: ' + F(mean(pairs.map(p => p.u.T / p.t.T)), 4) + '; 4 e^{-2 gamma} = ' +
        F(4 * Math.exp(-2 * 0.5772156649015329), 4) + ' (note (a) attributes the excess to the Mertens discrepancy).');
  }
  // P6 without decade 2
  if (P['old range Q>=31'] && d1 && P['decade 2 true']) {
    const d2 = P['decade 2 true'];
    const m1 = Math.abs(d1.c0 - P['old range Q>=31'].c0), m2 = Math.abs(d2.c0 - d1.c0), m3 = Math.abs(d2.fQ.b - d1.fQ.b);
    log('  P6 ("c moves by more than SE(c1) on decade 1 = ' + F(d1.fQ.se, 3) + '"): old->dec1 ' + F(m1, 3) +
        ', dec1->dec2 ' + F(m2, 3) + ', c1 dec1->dec2 ' + F(m3, 3) + '.');
    log('    Only the decade-2 clauses clear the bar (' + (m1 > d1.fQ.se ? 'the old->dec1 move does too' : 'the old->dec1 move does not') +
        '), and note (a) section 5 attributes that same decade-2 collapse to the gap-selected');
    log('    sampler when it discounts kill clause (a).  P6 and the discount cannot both stand on it.');
  }
}
log('');
// ============================================================================
// S4.  THE SEAL, THE CONTAMINATION AND THE BANDS (note a, sections 0, 2, 4)
// ============================================================================
prog('S4 prereg audit');
{
  log('S4. HOW BLIND THE SEALED SHEET WAS.  Arithmetic on note (a)\'s own disclosure and');
  log('  on the SEEN set its producer hard-codes.');
  const seenSet = [...PDS.matchAll(/const SEEN = new Set\(\[([^\]]*)\]\)/g)].map(m => m[1].split(',').map(s => +s.trim()))[0];
  const dec1Q = NEWTAB.filter(r => r.mode === 'true' && r.dec === 1).map(r => r.Q);
  const dec2Q = NEWTAB.filter(r => r.mode === 'true' && r.dec === 2).map(r => r.Q);
  const dev = dec1Q.filter((_, i) => i % 12 === 0);           // the development pass, every 12th decade-1 anchor
  const dev18 = dev.slice(0, 18);                              // note (a): 18 true anchors before it was killed
  const disclosed = [211, 401, 601, 809, 1009, 2003, 1499, 5003, 5227, 6967, 10007];
  const seenD1 = new Set([...dev18, ...disclosed.filter(q => dec1Q.includes(q))]);
  const seenD2 = new Set(disclosed.filter(q => dec2Q.includes(q)));
  log('    disclosed as seen in the note: ' + disclosed.length + ' anchors (' + disclosed.join(', ') + ')');
  log('    excluded from the "minus SEEN" fits by the producer: ' + seenSet.length + ' (' + seenSet.join(', ') + ')');
  log('    seen but NOT excluded: ' + disclosed.filter(q => !seenSet.includes(q)).join(', ') + ', plus the ' + dev18.length +
      '-anchor development pass (every 12th decade-1 anchor: ' + dev18.slice(0, 6).join(', ') + ', ...)');
  log('    decade 1: ' + dec1Q.length + ' anchors, ' + seenD1.size + ' seen -> blind on ' + (dec1Q.length - seenD1.size) +
      ' (' + F(100 * (1 - seenD1.size / dec1Q.length), 1) + ' per cent); the note says "roughly 230 of 250".');
  log('    decade 2: ' + dec2Q.length + ' anchors, ' + seenD2.size + ' seen -> blind on ' + (dec2Q.length - seenD2.size) +
      ' (' + F(100 * (1 - seenD2.size / dec2Q.length), 1) + ' per cent); the note says "16 of 21".');
  log('  The post-seal edit.  The sealed sampling rule was "every prime" for decade 1 and');
  log('  C <= 8000 for decade 2; after the seal, with 11 anchors seen, it became C <= 6000');
  log('  for BOTH.  That edit selects the decade-2 population itself.  Decade-2 anchors');
  log('  with C between 6000 and 8000 that the sealed rule would have admitted are excluded');
  log('  by the edit, and decade 1 loses the 7 widest anchors the sealed rule would have kept.  Every');
  log('  decade-2 reading (P5, the decade-2 half of P6, kill clause (a)) therefore sits on a');
  log('  population fixed after the seal, ' + F(100 * seenD2.size / dec2Q.length, 0) + ' per cent of it already seen.');
  log('  Effective band widths under the note\'s own scoring rule:');
  const d1 = popStats(VER.filter(v => v.mode === 'true' && v.dec === 1));
  if (d1) log('    P1 scores HIT if c1 +- 1 SE overlaps [1.20, 1.60]; with SE ' + F(d1.fQ.se, 3) +
      ' that is any c1 in [' + F(1.20 - d1.fQ.se, 3) + ', ' + F(1.60 + d1.fQ.se, 3) + '], a window of width ' + F(0.40 + 2 * d1.fQ.se, 3) + '.');
  log('    P4 scores HIT if |c1 null - c1 true| <= 0.15; section 3 above prices the paired');
  log('    standard error of that difference, which is the honest resolution of the test.');
  log('    P6 scores HIT if any of three moves exceeds one SE of c1; three chances, one bar.');
  log('  Kill clause (b) is P4.  Note (a) itself puts the probability of the surviving');
  log('  alternative at about 20 per cent, so the sealed sheet closed the item on a clause');
  log('  it expected to fire four times in five.  That is disclosed, and it is still a weak');
  log('  test: a pre-registration whose predicted branch has prior 0.8 carries about 0.32');
  log('  bits.  The closure is sound as a MEASUREMENT; it is not a surprise that survived.');
}
log('');

// ============================================================================
// S5.  AN INDEPENDENT TWIN SIEVE (note b, section 3b)
// ============================================================================
prog('S5 sieve');
const C2HL = 0.6601618158468696, EULER = 0.5772156649015329;
const abar = (x) => Math.log(x) * Math.log(x) / (2 * C2HL);
const trend = (x) => abar(x) * Math.log(x / abar(x));
const HB = 0.01, HMAX = 80, HN = Math.round(HMAX / HB);
const XS = QUICK ? 1e8 : 1e11, DLO = 4, DTOP = QUICK ? 7 : 10;
const W30 = [1, 7, 11, 13, 17, 19, 23, 29];
const RIDX = new Int8Array(30).fill(-1); W30.forEach((r, i) => RIDX[r] = i);
function twinSieve(X) {
  const hist = {}, cnt = {}, mx = {}, rmAt = {};
  for (let d = 0; d < 14; d++) { hist[d] = new Float64Array(HN + 1); cnt[d] = 0; mx[d] = 0; }
  const lim = Math.floor(Math.sqrt(X)) + 1, sm = new Uint8Array(lim + 1), bp = [];
  for (let i = 2; i <= lim; i++) { if (!sm[i]) { bp.push(i); for (let j = i * i; j <= lim; j += i) sm[j] = 1; } }
  const BP = bp.filter(p => p > 5);
  // for each base prime, the multiplier residues that land on each wheel spoke
  const MRES = BP.map(p => { const inv = []; for (let j = 0; j < 8; j++) { let m = 0; while ((p * m) % 30 !== W30[j]) m++; inv.push(m); } return inv; });
  const NW = 1 << 21, SEGW = 30 * NW;             // 62.9M integers per segment
  const seg = new Uint8Array(NW * 8);
  const DTH = []; for (let d = 0; d < 14; d++) DTH.push(Math.pow(10, d));
  let prev = -1, lastT = -1, rm = 0, tick = Date.now();
  for (let lo = 0; lo < X; lo += SEGW) {
    const hi = Math.min(lo + SEGW, X), nw = Math.ceil((hi - lo) / 30);
    seg.fill(0, 0, nw * 8);
    for (let pi = 0; pi < BP.length; pi++) { const p = BP[pi]; if (p * p >= hi) break;
      const mlo = Math.max(p, Math.ceil(lo / p)), inv = MRES[pi];
      for (let j = 0; j < 8; j++) {
        let m = mlo + ((inv[j] - mlo) % 30 + 30) % 30;
        let v = p * m; while (v < p * p) { m += 30; v = p * m; }
        for (let w = (v - lo) / 30 | 0; w < nw; w += p) seg[w * 8 + j] = 1;
      }
    }
    for (let w = 0; w < nw; w++) { const base = lo + w * 30, o = w * 8;
      for (let k = 0; k < 8; k++) { if (seg[o + k]) continue; const v = base + W30[k]; if (v < 2 || v >= hi) continue;
        if (v - prev === 2) { if (lastT > 0) { const g = prev - lastT; if (g > rm) rm = g;
              let d = 0; while (d < 13 && lastT >= DTH[d + 1]) d++;
              if (d >= DLO) { const lg = Math.log(lastT), u = g * (2 * C2HL) / (lg * lg), b = u < HMAX ? (u / HB) | 0 : HN;
                hist[d][b]++; cnt[d]++; if (g > mx[d]) mx[d] = g; }
              let dn = 0; while (dn < 13 && prev >= DTH[dn + 1]) dn++;
              if (dn !== d) rmAt[d] = rm; }
            lastT = prev; }
        prev = v; } }
    if (Date.now() - tick > 60000) { prog('  sieve ' + hi.toExponential(2)); tick = Date.now(); }
  }
  let dl = 0; while (dl < 13 && lastT >= DTH[dl + 1]) dl++;
  rmAt[dl] = rm;
  return { hist, cnt, mx, rmAt };
}
// -ln S table, moments, far-tail OLS slope on a stated window
function lawFrom(h, n, lo4, hi4) {
  let s1 = 0, s2 = 0;
  for (let k = 0; k <= HN; k++) { const c = (k + 0.5) * HB; s1 += h[k] * c; s2 += h[k] * c * c; }
  const mu = s1 / n, cv2 = (s2 / n - mu * mu) / (mu * mu);
  const tail = new Float64Array(HN + 2);
  for (let k = HN; k >= 0; k--) tail[k] = tail[k + 1] + h[k];
  const pts = [];
  for (let k = 5; k <= HN; k += 5) { if (tail[k] < 30) break; pts.push({ u: k * HB, w: -Math.log(tail[k] / n), c: tail[k] }); }
  const sel = pts.filter(p => p.u >= lo4 && p.u <= hi4);
  const f = ols(sel.map(p => p.u), sel.map(p => p.w));
  return { mu, cv2, pts, slope: f.b, se: f.se, npts: sel.length, tail, n,
           ulast: pts.length ? pts[pts.length - 1].u : 0,
           S: (u) => tail[Math.round(u / HB)] / n };
}
const SIEVE = twinSieve(XS);
const LAWH = {};
let WINSPREAD = 0, DECSPREAD = 0;
{
  log('S5. THE TWIN-PRIME GAP LAW AT HEIGHT, SIEVED AGAIN.  Independent segmented sieve');
  log('  on the 30-wheel (note (b) uses an odd-only sieve), same gap convention, same');
  log('  0.01 bins in u = g/abar(p).  pi_2(10^k) is the published twin-prime count.');
  const PI2 = { 4: 205, 5: 1224, 6: 8169, 7: 58980, 8: 440312, 9: 3424506, 10: 27412679, 11: 224376048 };
  const noteTab = {};
  for (const ln of fs.readFileSync(path.join(REPO, 'research/history/staging/attack-0830-record-mechanism.js'), 'utf8').split('\n')) {
    const m = ln.match(/^\/\/\s+\[1e(\d+),1e\d+\)\s+(\d+)\s+[\d.]+\s+[\d.]+\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+([\d.a-zA-Z]+)\s+(\d+)\s+([\d.]+)/);
    if (m) noteTab[+m[1]] = { gaps: +m[2], maxg: +m[3], mu: +m[6], cv2: +m[7], slope: m[8], ulast: +m[10] };
  }
  log('    decade        gaps here    note (b)   pi2 diff   mean u    CV^2 here / note (b)   slope[4,12] here +- se / note');
  let bad = 0;
  for (let d = DLO; d <= DTOP; d++) {
    if (!SIEVE.cnt[d]) continue;
    LAWH[d] = lawFrom(SIEVE.hist[d], SIEVE.cnt[d], 4, 12);
    const expct = (PI2[d + 1] !== undefined && PI2[d] !== undefined) ? PI2[d + 1] - PI2[d] : null;
    const nb = noteTab[d];
    if (nb && nb.gaps !== SIEVE.cnt[d] && !(d === DTOP && Math.abs(nb.gaps - SIEVE.cnt[d]) <= 1)) bad++;
    log('    [1e' + d + ',1e' + (d + 1) + ')  ' + String(SIEVE.cnt[d]).padStart(11) + '  ' + String(nb ? nb.gaps : '-').padStart(10) + '  ' +
        String(expct === null ? '-' : expct - SIEVE.cnt[d]).padStart(9) + '   ' + F(LAWH[d].mu, 4) + '   ' +
        (F(LAWH[d].cv2, 4) + ' / ' + (nb ? F(nb.cv2, 4) : '-')).padStart(18) + '   ' +
        (F(LAWH[d].slope, 4) + ' +- ' + F(LAWH[d].se, 4) + ' / ' + (nb ? nb.slope : '-')).padStart(28));
  }
  log('  gap counts identical to note (b) at ' + (DTOP - DLO + 1 - bad) + ' of ' + (DTOP - DLO + 1) + ' decades' +
      '; the pi2 difference column is 1 at the top decade because the sieve stops at 1e' + (DTOP + 1) + ' and');
  log('  the last gap there is not closed, and 0 elsewhere: an external custody check note (b) does not run.');
  check('S5 counts match', bad === 0);
  const top = LAWH[DTOP], reg = LAWH[DTOP - 1];
  log('  The far-tail slope is a FITTED number, and note (b) prints it without a standard');
  log('  error.  Its OLS se on nested tail points understates the truth (the points are');
  log('  cumulative), so a subsample check is added: slope over [4,12] = ' + F(reg.slope, 4) + ', over');
  const alt = [[4, 8], [6, 12], [8, 12], [4, 10], [5, 11]];
  log('    ' + alt.map(([a, b]) => '[' + a + ',' + b + '] ' + F(lawFrom(SIEVE.hist[DTOP - 1], SIEVE.cnt[DTOP - 1], a, b).slope, 4)).join(', ') + ' on the registered decade,');
  log('    ' + alt.map(([a, b]) => '[' + a + ',' + b + '] ' + F(lawFrom(SIEVE.hist[DTOP], SIEVE.cnt[DTOP], a, b).slope, 4)).join(', ') + ' on the extension decade.');
  const spread = alt.map(([a, b]) => lawFrom(SIEVE.hist[DTOP], SIEVE.cnt[DTOP], a, b).slope).concat([LAWH[DTOP].slope]);
  WINSPREAD = Math.max(...spread) - Math.min(...spread);
  const across = []; for (let d = DLO + 1; d <= DTOP; d++) if (LAWH[d]) across.push(LAWH[d].slope);
  DECSPREAD = Math.max(...across) - Math.min(...across);
  log('  Spread of the extension decade\'s slope over six stated windows: ' + F(Math.min(...spread), 4) + ' to ' + F(Math.max(...spread), 4) +
      ', a range of ' + F(WINSPREAD, 4) + '; across the six decades that resolve one, ' + F(DECSPREAD, 4) + '.');
}
log('');
// ============================================================================
// S6.  WHAT THE HEIGHT LAW ACTUALLY IS IN THE RECORD REGIME (note b, 2d, 3c, 7)
// ============================================================================
prog('S6 law anatomy');
// piecewise-linear inverse of -ln S, with a stated far-tail slope beyond the
// last resolved point; the object note (b) feeds to its null.
function tableU(pts, slope) {
  const n = pts.length, last = pts[n - 1];
  return (v) => { if (v <= 0) return 0;
    if (v >= last.w) return last.u + (v - last.w) / slope;
    let i = 0; while (pts[i].w < v) i++;
    const p = i === 0 ? { u: 0, w: 0 } : pts[i - 1], q = pts[i];
    return p.u + (v - p.w) * (q.u - p.u) / (q.w - p.w); };
}
function meanOfLaw(U) {   // E[U(V)], V ~ Exp(1), by quadrature in v
  let s = 0; const h = 0.0005;
  for (let v = h / 2; v < 60; v += h) s += U(v) * Math.exp(-v) * h;
  const tail = 60; s += U(tail + 1) * Math.exp(-tail);     // crude, the weight is 9e-27
  return s;
}
let HEIGHTU = null, HEIGHT2U = null, LSMEAN = 0;
{
  log('S6. THE HEIGHT LAW IN THE RECORD REGIME.  Records sit at u of 15 to 35; the');
  log('  measured law stops at u_last.  Everything above u_last is one extrapolation with');
  log('  one number in it, the far-tail slope, so the claim "no parameter" is examined here.');
  const reg = LAWH[DTOP - 1], ext = LAWH[DTOP];
  for (const [nm, L] of [['registered [1e' + (DTOP - 1) + ',1e' + DTOP + ')', reg], ['extension  [1e' + DTOP + ',1e' + (DTOP + 1) + ')', ext]]) {
    const U = tableU(L.pts, L.slope), Un = (v) => U(v) / L.mu;
    log('    ' + nm + ': u_last ' + F(L.ulast, 2) + ', tail count there ' + L.tail[Math.round(L.ulast / HB)] +
        ', slope ' + F(L.slope, 4) + ', raw mean u ' + F(L.mu, 4));
    log('      mean of the law as fed to the null, E[U(V)]/mu = ' + F(meanOfLaw(Un), 6) +
        ' (1.000000 is exact mean-matching; a departure d shifts d b_z by about -d x mean L)');
    log('      u at survival e^{-17} (a typical record): measured-and-extrapolated ' + F(Un(17), 3) +
        ', exponential 17.000, so the record falls by ' + F(17 - Un(17), 3) + ' abar at that height');
    log('      fraction of that fall contributed by the extrapolated part (v > ' + F(L.pts[L.pts.length - 1].w, 2) + '): ' +
        F(100 * ((17 - Un(17)) - (L.pts[L.pts.length - 1].w - Un(L.pts[L.pts.length - 1].w))) / (17 - Un(17)), 1) + ' per cent');
    if (nm[0] === 'r') HEIGHTU = Un; else HEIGHT2U = Un;
  }
  log('  First-order reading: beyond u_last the law is exactly u = u_last + (v - w_last)/slope,');
  log('  so d b_z is (1 - 1/slope) L + const to first order in the record regime.  With');
  log('  slope ' + F(ext.slope, 4) + ' that is ' + F(1 - 1 / ext.slope, 5) + ' per unit of L.');
  log('  That is an UPPER bound on the sensitivity, not the sensitivity: d(d b_z)/d(slope) would be');
  log('  -L/slope^2 = ' + F(-17 / (ext.slope * ext.slope), 2) + ' at L = 17 if the whole record regime were extrapolated, but w_last is ' +
      F(ext.pts[ext.pts.length - 1].w, 2) + ',');
  log('  so most of a typical record sits in the RESOLVED range and only the excess is extrapolated.');
  log('  Section 7 measures the true sensitivity by re-running the null with the slope moved.');
  log('  Section 5 measured the slope moving by ' + F(WINSPREAD, 4) + ' across six stated fit windows on the');
  log('  extension decade and by ' + F(DECSPREAD, 4) + ' across the six decades that resolve one.  The +- 0.0014');
  log('  note (b) quotes on d b_z is the Monte Carlo pairing error of one fixed law and excludes');
  log('  the law\'s own uncertainty entirely.');
}
log('');

// ============================================================================
// S7.  THE RECORD NULL, REBUILT (note b, sections 1, 3c, 3d, 5)
// ============================================================================
prog('S7 record null');
const LSRC = fs.readFileSync(path.join(REPO, 'research/a113274-gap-records.js'), 'utf8');
function arrOf(name) { const m = LSRC.match(new RegExp(name + String.raw` = \[([\s\S]*?)\];`)); return m[1].match(/\d+/g).map(BigInt); }
const GAP = arrOf('GAP'), START = arrOf('START');
const EE = START.map((s, i) => s + GAP[i] + 2n), EMAX = Number(EE[81]);
const L82 = GAP.map((g, k) => ({ e: Number(EE[k]), g: Number(g) }));
const WLO = 1e4;
function bOf(recs, lo, hi) {
  const w = recs.filter(r => r.e >= lo && r.e <= hi); if (w.length < 2) return null;
  const z = w.map(r => (r.g - trend(r.e)) / abar(r.e));
  const Lk = w.map(r => Math.log(r.e / abar(r.e)));
  let sw = 0, swz = 0; for (let i = 0; i < w.length; i++) { sw += 1 / Lk[i]; swz += -z[i] / Lk[i]; }
  const zm = mean(z), zs = sd(z);
  return { n: w.length, bZ: -zm, bA: swz / sw, bMed: -med(z), zSd: zs, zSkew: mean(z.map(v => ((v - zm) / zs) ** 3)),
           D: zm - med(z), meanInvL: sw / w.length, w, z };
}
// an independent generator (sfc32), not note (b)'s mulberry32
function sfc32(a, b, c, d) { return function () { a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
  let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); d = (d + 1) | 0;
  t = (t + d) | 0; c = (c + t) | 0; return (t >>> 0) / 4294967296; }; }
const XEXACT = 1e7, DLN = 0.005;
function simulate(r1, r2, U) {
  const recs = []; let x = 100, rm = 0;
  while (x < XEXACT) { const s0 = abar(x); let u = r1(); if (u > 1 - 1e-12) u = 1 - 1e-12;
    const g = s0 * U(-Math.log(1 - u)); x += g; if (g > rm) { rm = g; recs.push({ e: x, g }); } }
  for (let L = Math.log(XEXACT); L < Math.log(EMAX); L += DLN) {
    const xl = Math.exp(L), xh = Math.exp(L + DLN), xm = Math.exp(L + DLN / 2), sc = abar(xm);
    const N = (xh - xl) / sc; let u = r2(); if (u < 1e-12) u = 1e-12; if (u > 1 - 1e-12) u = 1 - 1e-12;
    const v = -Math.log(-Math.expm1(Math.log(u) / N)), m = sc * U(v);
    if (m > rm) { rm = m; recs.push({ e: xm, g: m }); } }
  return recs;
}
// gamma quantile in mean-normalised units, own series/continued fraction
function lnGam(z) { const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = z, tmp = z + 5.5; tmp -= (z + 0.5) * Math.log(tmp); let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y; return -tmp + Math.log(2.5066282746310005 * ser / z); }
function lnQup(a, x) { if (x <= 0) return 0;
  if (x < a + 1) { let ap = a, sum = 1 / a, del = sum;
    for (let k = 0; k < 800; k++) { ap += 1; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-17) break; }
    return Math.log1p(-sum * Math.exp(-x + a * Math.log(x) - lnGam(a))); }
  let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
  for (let i = 1; i < 2000; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-16) break; }
  return -x + a * Math.log(x) - lnGam(a) + Math.log(h); }
function gammaU(cv2) { const a = 1 / cv2, NV = 4000, DV = 0.02, tb = new Float64Array(NV + 1);
  for (let i = 0; i <= NV; i++) { const v = i * DV; let lo = 0, hi = 2 * v + 80;
    for (let it = 0; it < 80; it++) { const mid = (lo + hi) / 2; if (lnQup(a, mid) > -v) lo = mid; else hi = mid; } tb[i] = (lo + hi) / 2; }
  return (v) => { if (v >= NV * DV) return (tb[NV] + (v - NV * DV) * (tb[NV] - tb[NV - 1]) / DV) / a;
    const t = v / DV, i = Math.floor(t), f = t - i; return (tb[i] * (1 - f) + tb[i + 1] * f) / a; }; }
const shiftU = (cv2) => { const cv = Math.sqrt(cv2); return (v) => (1 - cv) + cv * v; };
const NREP = QUICK ? 30 : 600;
const BANDS = [[1e4, 1e8], [1e8, 1e11], [1e11, 1e14], [1e14, 8e16]];
{
  const dataB = bOf(L82, WLO, EMAX), dCut = bOf(L82, 0, 1e15);
  log('S7. THE RECORD NULL, REBUILT.  Same design as note (b) (exact regime below 1e7,');
  log('  block regime above at dln = 0.005), a different generator (sfc32, not mulberry32),');
  log('  ' + NREP + ' replicates per law, every law paired index by index with the exponential.');
  log('    data: n = ' + dataB.n + ', b_z = ' + F(dataB.bZ, 4) + ', b_A = ' + F(dataB.bA, 4) + ', b_med = ' + F(dataB.bMed, 4) +
      ', mean(1/L) = ' + F(dataB.meanInvL, 5) + ', b_med at cut 1e15 (n = ' + dCut.n + ') = ' + F(dCut.bMed, 4));
  log('    note (b) S1 publishes 72 / 1.2981 / 1.1251 / 1.3159 / 0.06269 / 71 / 1.2597');
  check('S7 data b', Math.abs(dataB.bZ - 1.2981) < 5e-5 && Math.abs(dataB.bA - 1.1251) < 5e-5 && Math.abs(dataB.bMed - 1.3159) < 5e-5 && dCut.n === 71);
  const ext = LAWH[DTOP], reg = LAWH[DTOP - 1];
  const slopeAlt = (L, s) => { const U = tableU(L.pts, s); return (v) => U(v) / L.mu; };
  const LAWS = [
    ['EXP     exponential (the N0e baseline)', (v) => v],
    ['GAM93   gamma, CV^2 = 0.93', gammaU(0.93)],
    ['SE93    shifted exponential, CV^2 = 0.93', shiftU(0.93)],
    ['HEIGHT  sieve law, registered decade', HEIGHTU],
    ['HEIGHT2 sieve law, extension decade', HEIGHT2U],
    ['H2-lo   extension, far-tail slope - 0.02', slopeAlt(ext, ext.slope - 0.02)],
    ['H2-hi   extension, far-tail slope + 0.02', slopeAlt(ext, ext.slope + 0.02)],
    ['H2-w812 extension, slope refit on u in [8,12]', slopeAlt(ext, lawFrom(SIEVE.hist[DTOP], SIEVE.cnt[DTOP], 8, 12).slope)],
    ['H2-exp  extension, tail continued at slope 1 (exponential above u_last)', slopeAlt(ext, 1)],
  ];
  const OUT = {};
  for (const [nm, U] of LAWS) {
    const bz = [], ba = [], bm = [], nn = [], DD = [], zsd = [], zsk = [], band = BANDS.map(() => []);
    for (let r = 0; r < NREP; r++) {
      const recs = simulate(sfc32(0x9E3779B9 ^ r, 0x243F6A88 + r, 0xB7E15162 + r * 7, 0x1F83D9AB + r * 13),
                            sfc32(0x85EBCA6B + r, 0xC2B2AE35 + r * 3, 0x27D4EB2F + r * 11, 0x165667B1 + r * 17), U);
      const o = bOf(recs, WLO, EMAX); if (!o) continue;
      bz.push(o.bZ); ba.push(o.bA); bm.push(o.bMed); nn.push(o.n); DD.push(o.D); zsd.push(o.zSd); zsk.push(o.zSkew);
      BANDS.forEach(([a, b], i) => { const q = bOf(recs, a, b); if (q) band[i].push(q.bZ); });
    }
    OUT[nm] = { bz, ba, bm, nn, DD, zsd, zsk, band };
  }
  const base = OUT[LAWS[0][0]];
  const resid = dataB.bZ - mean(base.bz);
  log('    baseline: this file\'s exponential null gives b_z = ' + F(mean(base.bz), 4) + ' +- ' + F(sd(base.bz), 4) +
      ' (ensemble sd), N = ' + F(mean(base.nn), 1) + '; note (b) has 0.2147 +- 0.2350, N = 68.4.');
  log('    residual attacked here: ' + F(resid, 4) + ' (note (b): 1.0833)');
  log('    law                                                          b_z          d b_z vs EXP   s.e.    share of residual');
  for (const [nm] of LAWS) { const R = OUT[nm];
    const d = R.bz.map((v, i) => v - base.bz[i]);
    log('    ' + nm.padEnd(58) + F(mean(R.bz), 4).padStart(8) + '   ' + F(mean(d), 4).padStart(12) + '  ' +
        F(sd(d) / Math.sqrt(d.length), 4).padStart(6) + '   ' + F(100 * mean(d) / resid, 1).padStart(6) + ' per cent'); }
  log('  Note (b) publishes d b_z = 1.0370 (registered decade) and 1.0806 +- 0.0014 (extension).');
  const h2 = OUT['HEIGHT2 sieve law, extension decade'], lo = OUT['H2-lo   extension, far-tail slope - 0.02'], hi = OUT['H2-hi   extension, far-tail slope + 0.02'];
  const dd = (R) => mean(R.bz.map((v, i) => v - base.bz[i]));
  log('  The extrapolation bracket: moving the far-tail slope by +- 0.02 (against a spread of ' + F(WINSPREAD, 4));
  log('  across the six fit windows of section 5 and ' + F(DECSPREAD, 4) + ' across decades) moves d b_z from ' +
      F(dd(lo), 4) + ' to ' + F(dd(hi), 4) + ',');
  log('  i.e. from ' + F(100 * dd(lo) / resid, 0) + ' to ' + F(100 * dd(hi) / resid, 0) + ' per cent of the residual against the published 99.8 per cent;');
  log('  measured sensitivity ' + F((dd(hi) - dd(lo)) / 0.04, 2) + ' in d b_z per unit of slope, against the ' +
      F(17 / (LAWH[DTOP].slope ** 2), 1) + ' the first-order formula gives.');
  const hexp = OUT['H2-exp  extension, tail continued at slope 1 (exponential above u_last)'];
  log('  The RESOLVED range alone: continuing the law at slope 1 above u_last (no lightness at all');
  log('  beyond the last measured point) still gives d b_z = ' + F(dd(hexp), 4) + ', ' + F(100 * dd(hexp) / resid, 0) +
      ' per cent of the residual, so about');
  log('  ' + F(100 * (1 - dd(hexp) / dd(h2)), 0) + ' per cent of the published effect comes from the extrapolation and the rest is measured.');
  log('');
  log('  PER-BAND b_z WITH ITS SIGMA (note (b) section 3d prints means only and calls the');
  log('  sigma owed).  Ensemble mean +- ensemble sd of the band\'s own b_z, ' + NREP + ' replicates.');
  log('    law                                     ' + BANDS.map(([a, b]) => ('[' + a.toExponential(0) + ',' + b.toExponential(0) + ')').padStart(18)).join(''));
  const dataBand = BANDS.map(([a, b]) => bOf(L82, a, b));
  log('    ' + 'DATA (n per band)'.padEnd(40) + dataBand.map(o => (F(o.bZ, 3) + ' (n=' + o.n + ')').padStart(18)).join(''));
  for (const [nm] of LAWS) { const R = OUT[nm];
    log('    ' + nm.slice(0, 39).padEnd(40) + R.band.map(a => (a.length ? F(mean(a), 3) + '+-' + F(sd(a), 3) : '-').padStart(18)).join('')); }
  log('    z of the data against each law, band by band (data minus law, over the law\'s own sd):');
  for (const [nm] of LAWS) { const R = OUT[nm];
    log('    ' + nm.slice(0, 39).padEnd(40) + R.band.map((a, i) => (a.length ? F((dataBand[i].bZ - mean(a)) / sd(a), 2) : '-').padStart(18)).join('')); }
  log('  Note (b) guesses the top band\'s sigma by scaling 0.2336 by sqrt(72/17) = 0.48.  The');
  log('  measured band sigmas above replace that guess.');
  log('');
  log('  SHAPE (note (b) section 5).  D = mean(z) - median(z); data ' + F(dataB.D, 4) + ', sd(z) ' + F(dataB.zSd, 4) +
      ', skew ' + F(dataB.zSkew, 4) + '.');
  for (const [nm] of LAWS) { const R = OUT[nm];
    log('    ' + nm.slice(0, 39).padEnd(40) + ' D ' + (F(mean(R.DD), 4) + ' +- ' + F(sd(R.DD), 4)).padStart(16) +
        '  z_D ' + F((dataB.D - mean(R.DD)) / sd(R.DD), 2).padStart(6) + '  sd(z) ' + F(mean(R.zsd), 4) + '  skew ' + F(mean(R.zsk), 4)); }
}
log('');
// ============================================================================
// S8.  WERE THE BANDS FALSIFIABLE, AND THE REMAINING ARITHMETIC (note b, 2f, 3-4)
// ============================================================================
prog('S8 arithmetic');
{
  const dataB = bOf(L82, WLO, EMAX);
  const bz = dataB.bZ, n0 = 0.2147, res = bz - n0;
  log('S8. THE BANDS AND THE KILL RULE.  Note (b) section 2f: the item\'s coordinate becomes');
  log('  "b has no mechanism in any model this corpus can build" if the candidates with a');
  log('  derivation together leave MORE THAN HALF of b unexplained.  Arithmetic on that:');
  log('    b_z(data) = ' + F(bz, 4) + '; half of it is ' + F(bz / 2, 4) + '; the published null already carries ' + n0 + ',');
  log('    so the kill fires only if the best candidate\'s d b_z is below ' + F(bz / 2 - n0, 4) + '.');
  const regBands = [['gamma tile CV^2=0.5285', 4, 10], ['gamma height CV^2=0.93', 0.6, 1.4], ['shifted exp CV^2=0.93', 0.4, 0.8],
                    ['gamma tail-field CV^2=0.986', 0.05, 0.35], ['gamma a_c/abar', 0.9, 1.6], ['tile @31 law', 4, 10],
                    ['HEIGHT registered decade', 0.5, 1.5]];
  log('    registered band                       band        width/point   floor above the kill threshold?');
  for (const [nm, lo, hi] of regBands)
    log('    ' + nm.padEnd(36) + ('[' + lo + ', ' + hi + ']').padEnd(12) + F((hi - lo) / ((hi + lo) / 2), 2).padStart(6) + '        ' +
        (lo > bz / 2 - n0 ? 'YES — an in-band result cannot kill' : 'no'));
  log('    The flagship candidate\'s registered band is [0.5, 1.5].  Its floor 0.5 is above the');
  log('    kill threshold ' + F(bz / 2 - n0, 4) + ', so once that band was written the kill rule could not fire');
  log('    on any in-band outcome.  A HIT was compatible with the mechanism carrying ' +
      F(100 * 0.5 / res, 0) + ' to ' + F(100 * 1.5 / res, 0) + ' per cent');
  log('    of the residual.  The band separates "carries about half" from "carries all" not at all.');
  log('    Note (b) says so itself ("That every band held is a criticism of the bands\' width").');
  log('  Ansatz tracking, recomputed on this file\'s sieve: CV^2 measured minus a_c/abar at the');
  log('  decade midpoint, and the 6Z geometric CV^2 = 1 - 6/abar:');
  const LI_LO = Math.log(2), LI_HI = Math.log(1e18), LI_N = 400000, LI_H = (LI_HI - LI_LO) / LI_N;
  const LIT = new Float64Array(LI_N + 1);
  for (let i = 1; i <= LI_N; i++) { const v0 = LI_LO + (i - 1) * LI_H, v1 = v0 + LI_H, vm = (v0 + v1) / 2;
    const f = (v) => Math.exp(v) / (v * v); LIT[i] = LIT[i - 1] + LI_H * (f(v0) + 4 * f(vm) + f(v1)) / 6; }
  const Li2 = (x) => { const t = (Math.log(x) - LI_LO) / LI_H, i = Math.min(LI_N - 1, Math.max(0, Math.floor(t))), f = t - i; return LIT[i] * (1 - f) + LIT[i + 1] * f; };
  const acOf = (x) => x / (2 * C2HL * Li2(x));
  log('    decade      CV^2       a_c/abar    difference    1 - 6/abar');
  for (let d = DLO; d <= DTOP; d++) { if (!LAWH[d]) continue; const xm = Math.pow(10, d + 0.5);
    log('    [1e' + d + ',1e' + (d + 1) + ')  ' + F(LAWH[d].cv2, 4) + '     ' + F(acOf(xm) / abar(xm), 4) + '      ' +
        F(LAWH[d].cv2 - acOf(xm) / abar(xm), 4).padStart(8) + '      ' + F(1 - 6 / abar(xm), 4)); }
  const top = LAWH[DTOP];
  log('    top decade: 1/CV^2 = ' + F(1 / top.cv2, 4) + ' against the far-tail slope ' + F(top.slope, 4) + ', difference ' + F(1 / top.cv2 - top.slope, 4));
  log('  Monotonicity of S(u) e^{u} above u = 2 on the registered decade:');
  const reg = LAWH[DTOP - 1]; const rat = []; for (let u = 1; u <= Math.floor(reg.ulast); u++) rat.push(reg.S(u) / Math.exp(-u));
  log('    ' + rat.map((r, i) => (i + 1) + ':' + F(r, 5)).join(' '));
  let mono = true; for (let i = 2; i < rat.length; i++) if (rat[i] > rat[i - 1]) mono = false;
  log('    monotone decreasing from u = 2: ' + (mono ? 'yes' : 'NO'));
  log('  Circularity: the registered decade\'s own record gap is ' + Number(GAP.filter((g, i) => START[i] < BigInt(Math.round(Math.pow(10, DTOP)))).slice(-1)[0]) +
      '; at abar(1e' + (DTOP - 0.5) + ') = ' + F(abar(Math.pow(10, DTOP - 0.5)), 1) + ' that is u = ' +
      F(Number(GAP.filter((g, i) => START[i] < BigInt(Math.round(Math.pow(10, DTOP)))).slice(-1)[0]) / abar(Math.pow(10, DTOP - 0.5)), 2) +
      ', beyond u_last = ' + F(reg.ulast, 2) + ': the record is outside the law\'s resolved range, as note (b) says.');
  log('  Mertens check for note (a): 4 e^{-2 gamma} = ' + F(4 * Math.exp(-2 * EULER), 4) + '; note (a) reads T_null/T = 1.259.');
}
log('');
log('SUMMARY OF MACHINE CHECKS: ' + (FAILS === 0 ? 'all passed' : FAILS + ' failed'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-records.js
//   invocation:  node research/history/staging/redteam-0830-records.js
//   code-sha256: 0f0828869ed65660345c9766df18a0f2c2a6fc271f7b78275aedd054d8ef583a
//   out-sha256:  6a8fe5f8bfee5f45e836771d8434ce91dd797f4f2e61da1af90530609693a0c1
//   body-lines:  271
//   inputs:      research/history/staging/attack-0829n-parity-dstar.js@9ff9f0f4a713 research/attack-parity-adversary-01.js@2fb33b3a8499 research/history/staging/attack-0830-record-mechanism.js@8a3dd45fe2db research/a113274-gap-records.js@b64796044e4b
//   forced:      2026-08-30, 0 of 552 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     238.5 s
// ============================================================================
// REDTEAM-0830-RECORDS — independent attack on attack-0829n-parity-dstar.md and
//   attack-0830-record-mechanism.md.  Exact rational LP for D*, an independent
//   twin sieve for the gap law at height, an independent record null.
//
// S1. CUSTODY OF THE CUSTODY GATE.  Note (a) licenses a float engine on 172
//   integer figures of research/attack-parity-adversary-01.js, but it compares
//   against a table hand-copied into its own source.  That copy is checked here
//   against the old producer's embedded OUTPUT block, parsed independently.
//     old OUTPUT anchors parsed: 43; hard-coded OLD rows: 43
//     figures compared: 215; mismatches: 0
//
// S2. D* RE-DERIVED EXACTLY.  For every anchor of note (a)'s new range, and for
//   the 43 anchors of the old range, this file rebuilds the signature classes by
//   trial division, enumerates the moduli, applies the (exact) presolve and
//   solves the LP in BigInt rational arithmetic.  m* is monotone in D, so
//   m*(D*) >= 1 together with m*(d_prev) < 1 at the modulus immediately below
//   settles D* completely; both are solved.  Float m* is not consulted.
//     tag  arm    Q      D*(note)   D*(exact)  m*(D*) exact   m*(below) exact   LP size   verdict
//     T1  true    211       1921       1921             2                0    128x200  D* CONFIRMED
//     N1  null    211       1937       1937             3                0    146x230  D* CONFIRMED
//     T1  true    223        697        697             2                0      43x68  D* CONFIRMED
//     T1  true    227        209        209             1                0      31x48  D* CONFIRMED
//     T1  true    229       1007       1007             2                0      44x60  D* CONFIRMED
//     N1  null    229        473        473             1              1/2     61x105  D* CONFIRMED
//     T1  true    233       1079       1079             1                0     85x123  D* CONFIRMED
//     T1  true    239        259        259             1                0      27x38  D* CONFIRMED
//     T1  true    241       2041       2041           7/2                0    120x176  D* CONFIRMED
//     N1  null    241       1691       1691          13/6              1/6    147x234  D* CONFIRMED
//     T1  true    251       1529       1529             1                0     84x121  D* CONFIRMED
//     T1  true    257       1339       1339             1                0     78x116  D* CONFIRMED
//     T1  true    263       1469       1469           3/2              1/2     79x123  D* CONFIRMED
//     N1  null    263       1961       1961             1                0      63x94  D* CONFIRMED
//     (first 14 anchors shown, plus every failure; all 376 are scored)
//   RESULT: 299 of 376 anchors have their D* confirmed exactly, 0 contradicted, 0 unresolved, 77 not attempted (live LP above the exact solver's size cap,
//     420 rows: the widest stretches, where a rational tableau is out of budget).
//     exact m*(D*) differs from the printed float m*(D*) at 0 anchors
//     exact m*(below) EXCEEDS the printed value at 0 anchors (the printed one is an upper bound: note (a)'s simplex stops early below D*)
//     exact threshold gap 1 - m*(below): min 0.1212, over 299 anchors (note (a) claims a gap of at least 0.25 from its float upper bounds)
//
// S2b. THE 172-FIGURE GATE, RE-DERIVED.  Note (a)'s gate reproduces four integer
//   columns of the old producer at 43 anchors with its own float engine.  Here the
//   same four columns are computed from scratch in exact rational arithmetic, so
//   the old producer is under test as well as the new one.
//        Q  m*(Q) exact/pub  m*(w) exact/pub  m*(Q^2) exact/pub   D* exact/pub
//          7              4/4              4/4                4/4             7/7
//         11              2/2              2/2                2/2             7/7
//         13              7/7              7/7                7/7           13/13
//         17              1/1              1/1                2/2           11/11
//         19              4/4              4/4                4/4           19/19
//         23              3/3              8/8                8/8           19/19
//     (first 6 anchors shown, plus every disagreement)
//   RESULT: 172 figures re-derived exactly at 43 anchors, 0 disagreements, 0 anchors skipped.
//
// S3. THE FITS, ON EXACTLY VERIFIED D* ONLY.  Same estimators as note (a)'s
//   section 5, computed here from this file's own D*, with an HC1 (White)
//   standard error beside the textbook one.
//     population            n     c0      c1 (lnQ)        c_w (ln width)    c_T (ln T)      D*/w mean
//     old range Q>=31       36  1.229   1.446 +-0.214/0.201   1.182 +-0.085/0.101   1.071 +-0.172     0.359
//     decade 1 true        218  1.243   1.048 +-0.069/0.073   1.140 +-0.015/0.019   1.194 +-0.037     0.526
//     decade 2 true         11  1.148   0.507 +-0.156/0.121   0.927 +-0.099/0.094   0.918 +-0.209     0.705
//     decade 1 null         66  1.220   0.798 +-0.121/0.118   1.138 +-0.033/0.038   1.081 +-0.073     0.504
//     decade 2 null          4  1.093   1.461 +-0.581/0.391   1.461 +-0.581/0.391   0.764 +-1.195     0.541
//     both decades true    229  1.238   0.959 +-0.058/0.060   1.150 +-0.014/0.018   1.226 +-0.039     0.535
//   (c1 +- textbook SE / HC1 SE.  Note (a) quotes only the textbook SE.)
//   Width law, decade 1: slope 1.1396 +- 0.0148 (HC1 0.0194), rmse 0.1637; distance from 1 is 9.44 textbook SE, 7.18 HC1 SE.
//     pairs bootstrap (2000): slope 2.5% 1.0922, 97.5% 1.1822 — 1 is outside the interval.
//     ln(D*/width) on ln width: slope 0.1396 +- 0.0148, rmse 0.1637
//     ln(D*/width) on ln ln width: slope 1.2388 +- 0.1277, rmse 0.1624   (rss ratio log-model/power-model 0.9837)
//     So over the decade of width this range spans (ln width from 6.82 to 10.29) the data do not separate D* ~ width^1.14 from D* ~ width (ln width)^k:
//     the two one-parameter fits differ in residual sum of squares by -1.63 per cent.
//     control X3 = round(0.35 width) on the same anchors: c0 1.186, c1 0.846 +- 0.063 (rmse 0.558), c_w 1.0000 +- 0.0000 (rmse 0.0001)
//     The same control that discounts kill clause (a) reproduces the Q-fit; it does
//     NOT reproduce the width fit (c_w 1.0000, rmse 0.0001), so reading 2's
//     content is the residual scatter 0.164 and the excess 0.140 over proportionality, nothing else.
//   The subset above is size-truncated: the exact solver skips the widest stretches, so
//   its width fit is not comparable to note (a)'s.  The same estimators are therefore run
//   again on note (a)'s complete per-anchor table (custody-bound output, 299 of whose 376 D* are confirmed exactly above), with this file's own regression code:
//     decade 1 true        250  c0 1.257  c1 1.204 +- 0.069 (HC1 0.072, rmse 0.644)  c_w 1.097 +- 0.012 (HC1 0.016, rmse 0.163)  D*/w 0.526
//     decade 2 true         21  c0 1.164  c1 0.575 +- 0.134 (HC1 0.095, rmse 0.340)  c_w 1.028 +- 0.061 (HC1 0.071, rmse 0.120)  D*/w 0.707
//     decade 1 null         84  c0 1.242  c1 1.088 +- 0.122 (HC1 0.119, rmse 0.664)  c_w 1.107 +- 0.021 (HC1 0.026, rmse 0.161)  D*/w 0.514
//     decade 2 null         21  c0 1.144  c1 0.590 +- 0.150 (HC1 0.125, rmse 0.382)  c_w 1.132 +- 0.039 (HC1 0.038, rmse 0.076)  D*/w 0.592
//     both decades true    271  c0 1.250  c1 1.017 +- 0.052 (HC1 0.055, rmse 0.648)  c_w 1.115 +- 0.012 (HC1 0.015, rmse 0.168)  D*/w 0.540
//     Published: decade 1 c0 1.257, c1 1.204 +- 0.069 rmse 0.647, c_w 1.097 +- 0.012 rmse 0.164,
//     D*/w 0.526; decade 2 c0 1.164, c1 0.575 +- 0.134, c_w 1.028 +- 0.061.
//     HC1 against textbook on the published decade-1 width fit: 0.0120 textbook, 0.0161 HC1; the slope sits 6.0 HC1 SE above proportionality.
//     ln(D*/width) on ln width: 0.0968 +- 0.0120, rmse 0.1634; on ln ln width: 0.9063 +- 0.1062, rmse 0.1615 (rss ratio 0.9762)
//     matched decade 1, n = 84: paired ln Q slope difference -0.0251 +- 0.0401, 95% [-0.104, 0.053]; WIDTH slope true 1.0765 +- 0.0207, null 1.1075 +- 0.0214, difference -0.0310
//     (Note (a)'s P4 line reports |c1 null - c1 true| = 0.025 on this set.  The paired
//     standard error of that difference is 0.0401, so the test resolves differences of about 0.08.)
//   P4, the null-agreement clause, re-run on 66 matched decade-1 anchors:
//     c1 true 0.7825 +- 0.1169, c1 null 0.7978 +- 0.1215, difference -0.0153
//     PAIRED standard error of that difference (regression of ln D*true - ln D*null on ln Q): 0.0492, 95% interval [-0.112, 0.081]
//     The registered band was |difference| <= 0.15.  The interval's half-width is 0.096, i.e. 0.64 times the band, so P4 could not have failed unless the
//     two arms differed by more than about 0.15 in slope.
//     On the WIDTH coordinate, matched: c_w true 1.1018 +- 0.0323, null 1.1376 +- 0.0326, difference -0.0358
//     Note (a)'s section 6, its ledger verdict, TODO item Z5 and REFUTED row 95 all
//     read "the null reproduces the WIDTH law within 0.025 in slope".  0.025 is the
//     difference in the ln Q slope.  The width-law difference is 0.0358 here.
//     D*/width mean true 0.5171, null 0.5036, ratio 0.9738; mean ln(D*null/D*true) -0.0280 +- 0.0293, null below true at 36 of 66
//     T_null/T on matched anchors: 1.2527; 4 e^{-2 gamma} = 1.2609 (note (a) attributes the excess to the Mertens discrepancy).
//   P6 ("c moves by more than SE(c1) on decade 1 = 0.069"): old->dec1 0.013, dec1->dec2 0.095, c1 dec1->dec2 0.541.
//     Only the decade-2 clauses clear the bar (the old->dec1 move does not), and note (a) section 5 attributes that same decade-2 collapse to the gap-selected
//     sampler when it discounts kill clause (a).  P6 and the discount cannot both stand on it.
//
// S4. HOW BLIND THE SEALED SHEET WAS.  Arithmetic on note (a)'s own disclosure and
//   on the SEEN set its producer hard-codes.
//     disclosed as seen in the note: 11 anchors (211, 401, 601, 809, 1009, 2003, 1499, 5003, 5227, 6967, 10007)
//     excluded from the "minus SEEN" fits by the producer: 9 (211, 401, 601, 809, 1009, 1499, 2003, 5003, 10007)
//     seen but NOT excluded: 5227, 6967, plus the 18-anchor development pass (every 12th decade-1 anchor: 211, 277, 353, 431, 499, 587, ...)
//     decade 1: 250 anchors, 23 seen -> blind on 227 (90.8 per cent); the note says "roughly 230 of 250".
//     decade 2: 21 anchors, 3 seen -> blind on 18 (85.7 per cent); the note says "16 of 21".
//   The post-seal edit.  The sealed sampling rule was "every prime" for decade 1 and
//   C <= 8000 for decade 2; after the seal, with 11 anchors seen, it became C <= 6000
//   for BOTH.  That edit selects the decade-2 population itself.  Decade-2 anchors
//   with C between 6000 and 8000 that the sealed rule would have admitted are excluded
//   by the edit, and decade 1 loses the 7 widest anchors the sealed rule would have kept.  Every
//   decade-2 reading (P5, the decade-2 half of P6, kill clause (a)) therefore sits on a
//   population fixed after the seal, 14 per cent of it already seen.
//   Effective band widths under the note's own scoring rule:
//     P1 scores HIT if c1 +- 1 SE overlaps [1.20, 1.60]; with SE 0.069 that is any c1 in [1.131, 1.669], a window of width 0.538.
//     P4 scores HIT if |c1 null - c1 true| <= 0.15; section 3 above prices the paired
//     standard error of that difference, which is the honest resolution of the test.
//     P6 scores HIT if any of three moves exceeds one SE of c1; three chances, one bar.
//   Kill clause (b) is P4.  Note (a) itself puts the probability of the surviving
//   alternative at about 20 per cent, so the sealed sheet closed the item on a clause
//   it expected to fire four times in five.  That is disclosed, and it is still a weak
//   test: a pre-registration whose predicted branch has prior 0.8 carries about 0.32
//   bits.  The closure is sound as a MEASUREMENT; it is not a surprise that survived.
//
// S5. THE TWIN-PRIME GAP LAW AT HEIGHT, SIEVED AGAIN.  Independent segmented sieve
//   on the 30-wheel (note (b) uses an odd-only sieve), same gap convention, same
//   0.01 bins in u = g/abar(p).  pi_2(10^k) is the published twin-prime count.
//     decade        gaps here    note (b)   pi2 diff   mean u    CV^2 here / note (b)   slope[4,12] here +- se / note
//     [1e4,1e5)         1019        1019          0   1.0170      0.7276 / 0.7276               NaN +- NaN / NaN
//     [1e5,1e6)         6945        6945          0   1.0077      0.8091 / 0.8091      1.0829 +- 0.0412 / 1.0829
//     [1e6,1e7)        50811       50811          0   0.9940      0.8381 / 0.8381      1.1834 +- 0.0047 / 1.1834
//     [1e7,1e8)       381332      381332          0   1.0007      0.8852 / 0.8852      1.0935 +- 0.0031 / 1.0935
//     [1e8,1e9)      2984194     2984194          0   1.0002      0.9037 / 0.9037      1.0661 +- 0.0018 / 1.0661
//     [1e9,1e10)     23988173    23988173          0   0.9999      0.9173 / 0.9173      1.0649 +- 0.0006 / 1.0649
//     [1e10,1e11)    196963368   196963368          1   1.0000      0.9295 / 0.9295      1.0638 +- 0.0004 / 1.0638
//   gap counts identical to note (b) at 7 of 7 decades; the pi2 difference column is 1 at the top decade because the sieve stops at 1e11 and
//   the last gap there is not closed, and 0 elsewhere: an external custody check note (b) does not run.
//   The far-tail slope is a FITTED number, and note (b) prints it without a standard
//   error.  Its OLS se on nested tail points understates the truth (the points are
//   cumulative), so a subsample check is added: slope over [4,12] = 1.0649, over
//     [4,8] 1.0677, [6,12] 1.0621, [8,12] 1.0535, [4,10] 1.0707, [5,11] 1.0667 on the registered decade,
//     [4,8] 1.0560, [6,12] 1.0680, [8,12] 1.0733, [4,10] 1.0595, [5,11] 1.0634 on the extension decade.
//   Spread of the extension decade's slope over six stated windows: 1.0560 to 1.0733, a range of 0.0174; across the six decades that resolve one, 0.1196.
//
// S6. THE HEIGHT LAW IN THE RECORD REGIME.  Records sit at u of 15 to 35; the
//   measured law stops at u_last.  Everything above u_last is one extrapolation with
//   one number in it, the far-tail slope, so the claim "no parameter" is examined here.
//     registered [1e9,1e10): u_last 12.85, tail count there 30, slope 1.0649, raw mean u 0.9999
//       mean of the law as fed to the null, E[U(V)]/mu = 0.999837 (1.000000 is exact mean-matching; a departure d shifts d b_z by about -d x mean L)
//       u at survival e^{-17} (a typical record): measured-and-extrapolated 16.051, exponential 17.000, so the record falls by 0.949 abar at that height
//       fraction of that fall contributed by the extrapolated part (v > 13.59): 21.9 per cent
//     extension  [1e10,1e11): u_last 14.70, tail count there 31, slope 1.0638, raw mean u 1.0000
//       mean of the law as fed to the null, E[U(V)]/mu = 0.999746 (1.000000 is exact mean-matching; a departure d shifts d b_z by about -d x mean L)
//       u at survival e^{-17} (a typical record): measured-and-extrapolated 15.956, exponential 17.000, so the record falls by 1.044 abar at that height
//       fraction of that fall contributed by the extrapolated part (v > 15.66): 7.7 per cent
//   First-order reading: beyond u_last the law is exactly u = u_last + (v - w_last)/slope,
//   so d b_z is (1 - 1/slope) L + const to first order in the record regime.  With
//   slope 1.0638 that is 0.06001 per unit of L.
//   That is an UPPER bound on the sensitivity, not the sensitivity: d(d b_z)/d(slope) would be
//   -L/slope^2 = -15.02 at L = 17 if the whole record regime were extrapolated, but w_last is 15.66,
//   so most of a typical record sits in the RESOLVED range and only the excess is extrapolated.
//   Section 7 measures the true sensitivity by re-running the null with the slope moved.
//   Section 5 measured the slope moving by 0.0174 across six stated fit windows on the
//   extension decade and by 0.1196 across the six decades that resolve one.  The +- 0.0014
//   note (b) quotes on d b_z is the Monte Carlo pairing error of one fixed law and excludes
//   the law's own uncertainty entirely.
//
// S7. THE RECORD NULL, REBUILT.  Same design as note (b) (exact regime below 1e7,
//   block regime above at dln = 0.005), a different generator (sfc32, not mulberry32),
//   600 replicates per law, every law paired index by index with the exponential.
//     data: n = 72, b_z = 1.2981, b_A = 1.1251, b_med = 1.3159, mean(1/L) = 0.06269, b_med at cut 1e15 (n = 71) = 1.2597
//     note (b) S1 publishes 72 / 1.2981 / 1.1251 / 1.3159 / 0.06269 / 71 / 1.2597
//     baseline: this file's exponential null gives b_z = 0.2241 +- 0.2401 (ensemble sd), N = 68.3; note (b) has 0.2147 +- 0.2350, N = 68.4.
//     residual attacked here: 1.0739 (note (b): 1.0833)
//     law                                                          b_z          d b_z vs EXP   s.e.    share of residual
//     EXP     exponential (the N0e baseline)                      0.2241         0.0000  0.0000      0.0 per cent
//     GAM93   gamma, CV^2 = 0.93                                  1.2826         1.0585  0.0025     98.6 per cent
//     SE93    shifted exponential, CV^2 = 0.93                    0.8468         0.6226  0.0013     58.0 per cent
//     HEIGHT  sieve law, registered decade                        1.2616         1.0375  0.0022     96.6 per cent
//     HEIGHT2 sieve law, extension decade                         1.3060         1.0818  0.0025    100.7 per cent
//     H2-lo   extension, far-tail slope - 0.02                    1.2129         0.9888  0.0022     92.1 per cent
//     H2-hi   extension, far-tail slope + 0.02                    1.3962         1.1720  0.0029    109.1 per cent
//     H2-w812 extension, slope refit on u in [8,12]               1.3490         1.1249  0.0027    104.7 per cent
//     H2-exp  extension, tail continued at slope 1 (exponential above u_last)  0.9994         0.7752  0.0018     72.2 per cent
//   Note (b) publishes d b_z = 1.0370 (registered decade) and 1.0806 +- 0.0014 (extension).
//   The extrapolation bracket: moving the far-tail slope by +- 0.02 (against a spread of 0.0174
//   across the six fit windows of section 5 and 0.1196 across decades) moves d b_z from 0.9888 to 1.1720,
//   i.e. from 92 to 109 per cent of the residual against the published 99.8 per cent;
//   measured sensitivity 4.58 in d b_z per unit of slope, against the 15.0 the first-order formula gives.
//   The RESOLVED range alone: continuing the law at slope 1 above u_last (no lightness at all
//   beyond the last measured point) still gives d b_z = 0.7752, 72 per cent of the residual, so about
//   28 per cent of the published effect comes from the extrapolation and the rest is measured.
//
//   PER-BAND b_z WITH ITS SIGMA (note (b) section 3d prints means only and calls the
//   sigma owed).  Ensemble mean +- ensemble sd of the band's own b_z, 600 replicates.
//     law                                            [1e+4,1e+8)      [1e+8,1e+11)     [1e+11,1e+14)     [1e+14,8e+16)
//     DATA (n per band)                             0.713 (n=16)      1.816 (n=15)      1.620 (n=24)      0.937 (n=17)
//     EXP     exponential (the N0e baseline)        0.049+-0.476      0.133+-0.567      0.225+-0.482      0.238+-0.508
//     GAM93   gamma, CV^2 = 0.93                    0.487+-0.450      1.020+-0.534      1.525+-0.454      1.961+-0.478
//     SE93    shifted exponential, CV^2 = 0.9       0.333+-0.463      0.666+-0.549      0.979+-0.467      1.217+-0.492
//     HEIGHT  sieve law, registered decade          0.506+-0.453      1.021+-0.537      1.489+-0.457      1.886+-0.481
//     HEIGHT2 sieve law, extension decade           0.461+-0.448      1.097+-0.528      1.577+-0.458      1.968+-0.481
//     H2-lo   extension, far-tail slope - 0.0       0.461+-0.448      1.074+-0.534      1.454+-0.465      1.729+-0.493
//     H2-hi   extension, far-tail slope + 0.0       0.461+-0.448      1.121+-0.521      1.697+-0.450      2.197+-0.473
//     H2-w812 extension, slope refit on u in        0.461+-0.448      1.109+-0.523      1.634+-0.455      2.078+-0.477
//     H2-exp  extension, tail continued at sl       0.460+-0.449      1.019+-0.560      1.163+-0.487      1.177+-0.517
//     z of the data against each law, band by band (data minus law, over the law's own sd):
//     EXP     exponential (the N0e baseline)                1.40              2.97              2.89              1.38
//     GAM93   gamma, CV^2 = 0.93                            0.50              1.49              0.21             -2.14
//     SE93    shifted exponential, CV^2 = 0.9               0.82              2.09              1.37             -0.57
//     HEIGHT  sieve law, registered decade                  0.46              1.48              0.29             -1.97
//     HEIGHT2 sieve law, extension decade                   0.56              1.36              0.09             -2.14
//     H2-lo   extension, far-tail slope - 0.0               0.56              1.39              0.36             -1.61
//     H2-hi   extension, far-tail slope + 0.0               0.56              1.33             -0.17             -2.67
//     H2-w812 extension, slope refit on u in                0.56              1.35             -0.03             -2.39
//     H2-exp  extension, tail continued at sl               0.56              1.42              0.94             -0.46
//   Note (b) guesses the top band's sigma by scaling 0.2336 by sqrt(72/17) = 0.48.  The
//   measured band sigmas above replace that guess.
//
//   SHAPE (note (b) section 5).  D = mean(z) - median(z); data 0.0179, sd(z) 1.0213, skew 0.5446.
//     EXP     exponential (the N0e baseline)   D 0.2086 +- 0.1281  z_D  -1.49  sd(z) 1.2581  skew 1.0051
//     GAM93   gamma, CV^2 = 0.93               D 0.1540 +- 0.1384  z_D  -0.98  sd(z) 1.3064  skew 0.7475
//     SE93    shifted exponential, CV^2 = 0.9  D 0.1815 +- 0.1324  z_D  -1.24  sd(z) 1.2603  skew 0.8988
//     HEIGHT  sieve law, registered decade     D 0.1572 +- 0.1364  z_D  -1.02  sd(z) 1.2961  skew 0.7717
//     HEIGHT2 sieve law, extension decade      D 0.1545 +- 0.1396  z_D  -0.98  sd(z) 1.3121  skew 0.7390
//     H2-lo   extension, far-tail slope - 0.0  D 0.1642 +- 0.1364  z_D  -1.07  sd(z) 1.2897  skew 0.7951
//     H2-hi   extension, far-tail slope + 0.0  D 0.1383 +- 0.1413  z_D  -0.85  sd(z) 1.3401  skew 0.6798
//     H2-w812 extension, slope refit on u in   D 0.1482 +- 0.1405  z_D  -0.93  sd(z) 1.3250  skew 0.7103
//     H2-exp  extension, tail continued at sl  D 0.1832 +- 0.1364  z_D  -1.21  sd(z) 1.2649  skew 0.8956
//
// S8. THE BANDS AND THE KILL RULE.  Note (b) section 2f: the item's coordinate becomes
//   "b has no mechanism in any model this corpus can build" if the candidates with a
//   derivation together leave MORE THAN HALF of b unexplained.  Arithmetic on that:
//     b_z(data) = 1.2981; half of it is 0.6490; the published null already carries 0.2147,
//     so the kill fires only if the best candidate's d b_z is below 0.4343.
//     registered band                       band        width/point   floor above the kill threshold?
//     gamma tile CV^2=0.5285              [4, 10]       0.86        YES — an in-band result cannot kill
//     gamma height CV^2=0.93              [0.6, 1.4]    0.80        YES — an in-band result cannot kill
//     shifted exp CV^2=0.93               [0.4, 0.8]    0.67        no
//     gamma tail-field CV^2=0.986         [0.05, 0.35]  1.50        no
//     gamma a_c/abar                      [0.9, 1.6]    0.56        YES — an in-band result cannot kill
//     tile @31 law                        [4, 10]       0.86        YES — an in-band result cannot kill
//     HEIGHT registered decade            [0.5, 1.5]    1.00        YES — an in-band result cannot kill
//     The flagship candidate's registered band is [0.5, 1.5].  Its floor 0.5 is above the
//     kill threshold 0.4343, so once that band was written the kill rule could not fire
//     on any in-band outcome.  A HIT was compatible with the mechanism carrying 46 to 138 per cent
//     of the residual.  The band separates "carries about half" from "carries all" not at all.
//     Note (b) says so itself ("That every band held is a criticism of the bands' width").
//   Ansatz tracking, recomputed on this file's sieve: CV^2 measured minus a_c/abar at the
//   decade midpoint, and the 6Z geometric CV^2 = 1 - 6/abar:
//     decade      CV^2       a_c/abar    difference    1 - 6/abar
//     [1e4,1e5)  0.7276     0.7674       -0.0398      0.9262
//     [1e5,1e6)  0.8091     0.8207       -0.0116      0.9506
//     [1e6,1e7)  0.8381     0.8531       -0.0150      0.9646
//     [1e7,1e8)  0.8852     0.8750        0.0102      0.9734
//     [1e8,1e9)  0.9037     0.8910        0.0126      0.9793
//     [1e9,1e10)  0.9173     0.9033        0.0140      0.9834
//     [1e10,1e11)  0.9295     0.9131        0.0164      0.9864
//     top decade: 1/CV^2 = 1.0758 against the far-tail slope 1.0638, difference 0.0120
//   Monotonicity of S(u) e^{u} above u = 2 on the registered decade:
//     1:1.01429 2:0.96541 3:0.91437 4:0.85749 5:0.80306 6:0.74733 7:0.69657 8:0.65887 9:0.59215 10:0.57297 11:0.56160 12:0.49529
//     monotone decreasing from u = 2: yes
//   Circularity: the registered decade's own record gap is 6030; at abar(1e9.5) = 362.4 that is u = 16.64, beyond u_last = 12.85: the record is outside the law's resolved range, as note (b) says.
//   Mertens check for note (a): 4 e^{-2 gamma} = 1.2609; note (a) reads T_null/T = 1.259.
//
// SUMMARY OF MACHINE CHECKS: all passed
// ============================================================================
// READINGS
//
