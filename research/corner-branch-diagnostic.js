#!/usr/bin/env node
'use strict';
// ============================================================================
// Question: can the exact coefficients C(n) and C'(n-2) be enumerated branch by
// branch -- proper prime powers r=p^e with e>=2, cofactors s>1, non-squarefree
// inputs and both integer parities -- without any of them being silently
// dropped, and does the expanded prime-power form agree exactly with the direct
// divisor form on retained finite inputs?
//
// Scope: exact finite algebra of a stated identity on finite inputs, plus
// floating logarithmic sums that are MEASURED, not derived. Nothing here is an
// arithmetic estimate. No sign trend, asymptotic saving, cancellation rate or
// twin margin follows from any number this script prints. The twin-prime margin
// is OPEN and this file does not touch it. This is tool preparation.
//
// The identity implemented, for one side, with Dlo = max(U, D1):
//
//   C(n) = sum_{r|n, r>V, r a prime power} Lambda(r)
//            * sum_{s|(n/r), Dlo < n/(r*s) <= D0} mu(n/(r*s)),
//
// against the direct form
//
//   C(n) = sum_{d|n, Dlo<d<=D0} mu(d) beta_V(n/d),
//   beta_V(k) = sum_{r|k, r>V, r a prime power} Lambda(r).
//
// Repeated powers of one base (r=p, p^2, ...) are separate terms of beta, so
// they are separate terms here. The equality is checked on integer vectors of
// prime-log coefficients, so it is exact; the float value is reported apart.
//
// The right side uses Y, Z, E1, E0 and the argument n-2. The full corner is
// sum_n C(n) C'(n-2); multiplying the two coefficients keeps both compatible
// gcd branches in the total; the reported n-parity split is not a per-term
// CRT-modulus or cofactor-gcd partition. The prime-r, s=s'=1 piece is one of nine.
//
// Cutoffs (RESEARCH-HANDOFF.md section 3, corner-correlation.md section 0):
//   x=2^j, J_x=(x/2,x], U=V=floor(x^(6/25)), Y=Z=floor(x^(1/20)),
//   D0=floor(x/(V+1)), E0=floor((x-2)/(Z+1)),
//   D1=floor(x^(19/25-2*eta0)), E1=floor(x^(19/20-2*eta0)), 0<eta0<1/400.
//
// Usage:
//   node research/corner-branch-diagnostic.js --fixture
//   node research/corner-branch-diagnostic.js --window=9973 --profile=handoff
//   node research/corner-branch-diagnostic.js --window=997 --profile=corner --eta0=0.002
//   ... --from=A --to=B --V=.. --Dlo=.. --D0=.. --Z=.. --Elo=.. --E0=..
// Explicit cutoff flags override the profile. --probe-corner adds a corner-cut
// support probe alongside the requested run.
// ============================================================================

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const t0 = Date.now();
const argv = process.argv.slice(2);
const flag = (n) => argv.includes('--' + n);
const opt = (n, d) => {
  const p = argv.find((a) => a.startsWith('--' + n + '='));
  return p === undefined ? d : p.slice(n.length + 3);
};
const num = (n, d) => { const v = opt(n, null); return v === null ? d : Number(v); };

// ---------------------------------------------------------------------------
// exact helpers
// ---------------------------------------------------------------------------
function trialFactor(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    if (m % p) continue;
    let a = 0;
    while (m % p === 0) { m /= p; a++; }
    out.push([p, a]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}
function divisorsOf(f) {
  let ds = [1];
  for (const [p, a] of f) {
    const cur = ds; ds = [];
    let pe = 1;
    for (let e = 0; e <= a; e++) { for (const d of cur) ds.push(d * pe); pe *= p; }
  }
  return ds;
}
function muOf(f) {
  for (const [, a] of f) if (a > 1) return 0;
  return f.length % 2 ? -1 : 1;
}
// d divides n, so every prime of d is a prime of n. Loud on any violation.
function factorDivisor(d, nf) {
  const out = []; let m = d;
  for (const [p] of nf) {
    let a = 0;
    while (m % p === 0) { m /= p; a++; }
    if (a) out.push([p, a]);
  }
  if (m !== 1) throw new Error('factorDivisor: ' + d + ' is not built from the factors of the input');
  return out;
}
function reconstruct(f) { let v = 1; for (const [p, a] of f) v *= Math.pow(p, a); return v; }
const addVec = (m, p, v) => { if (v) m.set(p, (m.get(p) || 0) + v); };
const normVec = (m) => [...m].filter(([, v]) => v !== 0).sort((a, b) => a[0] - b[0]);
const vecKey = (m) => JSON.stringify(normVec(m));
const vecAdd = (...ms) => { const o = new Map(); for (const m of ms) for (const [p, v] of m) addVec(o, p, v); return o; };
const vecFloat = (m) => { let s = 0; for (const [p, v] of normVec(m)) s += v * Math.log(p); return s; };
const isSquarefree = (f) => f.every(([, a]) => a === 1);

// Neumaier compensated accumulation. The totals below are MEASURED floats.
class KSum {
  constructor() { this.s = 0; this.c = 0; }
  add(x) {
    const t = this.s + x;
    this.c += Math.abs(this.s) >= Math.abs(x) ? (this.s - t) + x : (x - t) + this.s;
    this.s = t;
  }
  get v() { return this.s + this.c; }
}

// ---------------------------------------------------------------------------
// the two independent computations of one side's coefficient
// ---------------------------------------------------------------------------
// (i) direct divisor formula: outer loop over divisors d, inner beta_W(n/d).
function directSide(n, nf, W, lo, hi) {
  const vec = new Map();
  for (const d of divisorsOf(nf)) {
    if (!(d > lo && d <= hi)) continue;
    const k = n / d;
    if (k <= W) continue;                       // beta_W(k)=0 identically
    const m = muOf(factorDivisor(d, nf));
    if (m === 0) continue;                      // zero coefficient, zero term
    for (const [p, a] of factorDivisor(k, nf)) {
      let pe = 1, c = 0;
      for (let e = 1; e <= a; e++) { pe *= p; if (pe > W) c++; }
      addVec(vec, p, m * c);
    }
  }
  return vec;
}
// (ii) expanded prime-power formula: outer loop over prime powers r|n with r>W,
// inner loop over s|(n/r). Different loop order and different divisor
// generation, so agreement is a real cross-check, not a restatement.
// Categories: P = (r prime, s=1), S = (r prime, s>1), Q = (r=p^e, e>=2, any s).
function expandedSide(n, nf, W, lo, hi) {
  const byCat = { P: new Map(), S: new Map(), Q: new Map() };
  const absByCat = { P: 0, S: 0, Q: 0 };
  const cntByCat = { P: 0, S: 0, Q: 0 };
  const powersUsed = new Map();                 // base p -> Set of exponents e
  for (const [p, a] of nf) {
    let r = 1;
    for (let e = 1; e <= a; e++) {
      r *= p;
      if (r <= W) continue;                     // Lambda(r) is kept only for r>W
      const rf = nf.map(([q, b]) => (q === p ? [q, b - e] : [q, b])).filter(([, b]) => b > 0);
      for (const s of divisorsOf(rf)) {
        const d = n / (r * s);
        if (!(d > lo && d <= hi)) continue;
        const cat = e >= 2 ? 'Q' : (s === 1 ? 'P' : 'S');
        cntByCat[cat]++;
        if (!powersUsed.has(p)) powersUsed.set(p, new Set());
        powersUsed.get(p).add(e);
        const m = muOf(factorDivisor(d, nf));
        if (m === 0) continue;
        addVec(byCat[cat], p, m);               // Lambda(p^e)=log p, one unit of p
        absByCat[cat] += Math.log(p);
      }
    }
  }
  let repeatedBases = 0;
  for (const [, es] of powersUsed) if (es.size >= 2) repeatedBases++;
  return { byCat, absByCat, cntByCat, repeatedBases, powersUsed };
}

// ---------------------------------------------------------------------------
// inputs
// ---------------------------------------------------------------------------
const FIXTURE = flag('fixture');
const out = [];
const say = (s) => out.push(s);
const f6 = (v) => (Object.is(v, -0) ? 0 : v).toFixed(6);

let artefact = null, artefactSha = null, win = null, factorAt = null, factorBlockSha = null;
let A, B, X, label;

if (!FIXTURE) {
  const raw = fs.readFileSync(path.resolve(__dirname, 'data-reuse/factor-windows.json'), 'utf8');
  artefactSha = crypto.createHash('sha256').update(raw).digest('hex');
  artefact = JSON.parse(raw);
  const q = num('window', 9973);
  win = artefact.windows.find((w) => w.q === q);
  if (!win) { console.error('no archived window q=' + q + '; have ' + artefact.windows.map((w) => w.q).join(',')); process.exit(2); }
  factorBlockSha = crypto.createHash('sha256').update(JSON.stringify(win.primePowerFactors)).digest('hex');
  const start = win.factorStart, count = win.primePowerFactors.length;
  factorAt = (n) => {
    const i = n - start;
    if (i < 0 || i >= count) throw new Error('factor request outside the retained window: ' + n);
    return win.primePowerFactors[i];
  };
  A = num('from', win.lo); B = num('to', win.hi); X = win.x;
  label = 'factor-reuse';
  // Refuse rather than proxy: n-2 must be retained too.
  if (A - 2 < start || B > start + count - 1) {
    console.log('REFUSED: requested n in [' + A + ',' + B + '] needs factors for [' + (A - 2) + ',' + B + ']');
    console.log('         the retained window q=' + q + ' covers [' + start + ',' + (start + count - 1) + '] only.');
    console.log('         No proxy interval is substituted. Nothing was computed.');
    process.exit(1);
  }
} else {
  // Disclosed toy fixture. These cuts are chosen so that all nine matrix cells,
  // both integer parities and all four squarefree classes are populated. They are
  // NOT the campaign cutoffs and carry no arithmetic meaning whatsoever.
  A = num('from', 300); B = num('to', 1200); X = null;
  label = 'fixture (finite algebra only)';
  factorAt = (n) => trialFactor(n);
}

// ---------------------------------------------------------------------------
// cutoffs
// ---------------------------------------------------------------------------
const profile = opt('profile', FIXTURE ? 'fixture' : 'handoff');
const eta0 = num('eta0', 1 / 500);
let V, Dlo, D0, Z, Elo, E0, U, Y, D1 = null, E1 = null;
if (FIXTURE) {
  V = num('V', 2); Dlo = num('Dlo', 3); D0 = num('D0', 60);
  Z = num('Z', 2); Elo = num('Elo', 3); E0 = num('E0', 60);
  U = Dlo; Y = Elo;
} else {
  if (!(eta0 > 0 && eta0 < 1 / 400)) { console.error('eta0 must satisfy 0<eta0<1/400'); process.exit(2); }
  U = V = Math.floor(Math.pow(X, 6 / 25));
  Y = Z = Math.floor(Math.pow(X, 1 / 20));
  D0 = Math.floor(X / (V + 1));
  E0 = Math.floor((X - 2) / (Z + 1));
  D1 = Math.floor(Math.pow(X, 19 / 25 - 2 * eta0));
  E1 = Math.floor(Math.pow(X, 19 / 20 - 2 * eta0));
  if (profile === 'corner') { Dlo = Math.max(U, D1); Elo = Math.max(Y, E1); }
  else if (profile === 'handoff') { Dlo = U; Elo = Y; }
  else { console.error('profile must be handoff or corner'); process.exit(2); }
  V = num('V', V); Dlo = num('Dlo', Dlo); D0 = num('D0', D0);
  Z = num('Z', Z); Elo = num('Elo', Elo); E0 = num('E0', E0);
}

// ---------------------------------------------------------------------------
// the pass
// ---------------------------------------------------------------------------
const CATS = ['P', 'S', 'Q'];
const cell = {};
for (const a of CATS) for (const b of CATS) cell[a + b] = { signed: new KSum(), absterm: new KSum(), grouped: new KSum(), support: 0 };
const mk = () => ({ signed: new KSum(), absterm: new KSum(), grouped: new KSum(), support: 0, count: 0 });
const overall = mk();
const branch = { g1: mk(), g2: mk() };
const sqclass = { both: mk(), nOnly: mk(), n2Only: mk(), neither: mk() };
const leftCnt = { P: 0, S: 0, Q: 0 }, rightCnt = { P: 0, S: 0, Q: 0 };
let identityChecked = 0, identityMismatch = 0, firstMismatch = null;
let reconChecked = 0, reconMismatch = 0;
let ctlDelS = 0, ctlDelQ = 0, repeatedLeft = 0, repeatedRight = 0, repeatedExample = null;

const bump = (acc, sv, av) => {
  acc.signed.add(sv); acc.absterm.add(av); acc.grouped.add(Math.abs(sv));
  acc.count++;
  if (sv !== 0) acc.support++;
};

function sideOf(n, W, lo, hi) {
  const nf = factorAt(n);
  reconChecked++;
  if (reconstruct(nf) !== n) { reconMismatch++; throw new Error('factor reconstruction failed for ' + n); }
  const dir = directSide(n, nf, W, lo, hi);
  const exp = expandedSide(n, nf, W, lo, hi);
  const all = vecAdd(exp.byCat.P, exp.byCat.S, exp.byCat.Q);
  identityChecked++;
  const ok = vecKey(dir) === vecKey(all);
  if (!ok) {
    identityMismatch++;
    if (!firstMismatch) firstMismatch = { n, direct: normVec(dir), expanded: normVec(all) };
  }
  const noS = vecKey(vecAdd(exp.byCat.P, exp.byCat.Q)) !== vecKey(dir);
  const noQ = vecKey(vecAdd(exp.byCat.P, exp.byCat.S)) !== vecKey(dir);
  return { nf, exp, ok, noS, noQ, sf: isSquarefree(nf), val: { P: vecFloat(exp.byCat.P), S: vecFloat(exp.byCat.S), Q: vecFloat(exp.byCat.Q) } };
}

let hardFail = null;
try {
  for (let n = A; n <= B; n++) {
    const L = sideOf(n, V, Dlo, D0);
    const R = sideOf(n - 2, Z, Elo, E0);
    if (identityMismatch) { hardFail = 'identity mismatch at n=' + n; break; }
    for (const c of CATS) { leftCnt[c] += L.exp.cntByCat[c]; rightCnt[c] += R.exp.cntByCat[c]; }
    if (L.noS || R.noS) ctlDelS++;
    if (L.noQ || R.noQ) ctlDelQ++;
    if (L.exp.repeatedBases) { repeatedLeft++; if (!repeatedExample) repeatedExample = 'left n=' + n; }
    if (R.exp.repeatedBases) { repeatedRight++; if (!repeatedExample) repeatedExample = 'right n-2=' + (n - 2); }

    let Ltot = 0, Rtot = 0, ALtot = 0, ARtot = 0;
    for (const a of CATS) { Ltot += L.val[a]; ALtot += L.exp.absByCat[a]; }
    for (const b of CATS) { Rtot += R.val[b]; ARtot += R.exp.absByCat[b]; }
    for (const a of CATS) for (const b of CATS) {
      const sv = L.val[a] * R.val[b], av = L.exp.absByCat[a] * R.exp.absByCat[b];
      const c = cell[a + b];
      c.signed.add(sv); c.absterm.add(av); c.grouped.add(Math.abs(sv));
      if (sv !== 0) c.support++;
    }
    const sv = Ltot * Rtot, av = ALtot * ARtot;
    bump(overall, sv, av);
    bump(n % 2 ? branch.g1 : branch.g2, sv, av);
    const key = L.sf && R.sf ? 'both' : (L.sf ? 'nOnly' : (R.sf ? 'n2Only' : 'neither'));
    bump(sqclass[key], sv, av);
  }
} catch (e) {
  hardFail = e.message;
}

// ---------------------------------------------------------------------------
// corner-cut probe (optional): does the fixed-eta corner have any support here?
// ---------------------------------------------------------------------------
let probe = null;
if (!FIXTURE && flag('probe-corner')) {
  const cDlo = Math.max(U, D1), cElo = Math.max(Y, E1);
  let sup = 0, terms = 0;
  for (let n = A; n <= B; n++) {
    const nf = factorAt(n), mf = factorAt(n - 2);
    const l = expandedSide(n, nf, V, cDlo, D0), r = expandedSide(n - 2, mf, Z, cElo, E0);
    const lt = l.cntByCat.P + l.cntByCat.S + l.cntByCat.Q, rt = r.cntByCat.P + r.cntByCat.S + r.cntByCat.Q;
    terms += lt + rt;
    if (lt && rt) sup++;
  }
  probe = { cDlo, cElo, sup, terms };
}

// ---------------------------------------------------------------------------
// report
// ---------------------------------------------------------------------------
say('scope: exact finite algebra of the stated identity on finite inputs; float sums are MEASURED');
say('       no arithmetic estimate, sign trend, asymptotic saving or twin margin is inferred');
say('mode: ' + label + '  profile=' + profile);
if (!FIXTURE) {
  say('artefact: research/data-reuse/factor-windows.json schema=' + artefact.schema + ' sha256=' + artefactSha);
  say('artefact-producer: ' + artefact.producer);
  say('source-binding: ' + artefact.source + ' sha256=' + artefact.sourceSha256);
  say('window: q=' + win.q + ' factorStart=' + win.factorStart + ' retained=' + win.primePowerFactors.length
    + ' factor-block-sha256=' + factorBlockSha);
  say('dyadic: x=' + X + ' J_x=(' + (X / 2) + ',' + X + '] |J_x|=' + (X / 2)
    + '  eta0=' + eta0 + ' D1=' + D1 + ' E1=' + E1);
  say('scanned: n in [' + A + ',' + B + '] count=' + (B - A + 1)
    + ' = ' + ((B - A + 1) / (X / 2)).toExponential(3) + ' of J_x  -- PREFIX, not the interval');
  say('         cutoffs are derived from the full x, never from the prefix; a prefix is not the corner');
} else {
  say('fixture cuts are disclosed toy values with no arithmetic meaning: n in [' + A + ',' + B + ']');
}
say('cutoffs left : V=' + V + ' Dlo=' + Dlo + ' D0=' + D0 + '   (U=' + U + ')');
say('cutoffs right: Z=' + Z + ' Elo=' + Elo + ' E0=' + E0 + '   (Y=' + Y + ')');
say('reconstruction control: integers checked=' + reconChecked + ' mismatches=' + reconMismatch);
say('identity control: sides checked=' + identityChecked + ' mismatches=' + identityMismatch
  + (firstMismatch ? ' FIRST n=' + firstMismatch.n : '') + (hardFail ? '  HARD-STOP: ' + hardFail : ''));
say('category population left : P=' + leftCnt.P + ' S=' + leftCnt.S + ' Q=' + leftCnt.Q);
say('category population right: P=' + rightCnt.P + ' S=' + rightCnt.S + ' Q=' + rightCnt.Q);
for (const [side, c] of [['left', leftCnt], ['right', rightCnt]]) for (const k of CATS) {
  if (!c[k]) say('REJECTED as a test of ' + side + ' category ' + k + ': empty at these parameters');
}
say('matrix (rows left P,S,Q x cols right P,S,Q): signed | abs-term | grouped-abs | support');
for (const a of CATS) for (const b of CATS) {
  const c = cell[a + b];
  say('  ' + a + "x" + b + "'  signed=" + f6(c.signed.v) + ' absterm=' + f6(c.absterm.v)
    + ' groupedabs=' + f6(c.grouped.v) + ' support=' + c.support);
}
const line = (nm, a) => '  ' + nm + ' n-count=' + a.count + ' support=' + a.support + ' signed=' + f6(a.signed.v)
  + ' absterm=' + f6(a.absterm.v) + ' groupedabs=' + f6(a.grouped.v);
say('overall (full C(n)C\'(n-2), all nine cells):');
say(line('all      ', overall));
say('integer parity (gcd(n,n-2)); not the per-term CRT or cofactor gcd partition:');
say(line('odd      ', branch.g1));
say(line('even     ', branch.g2));
say('squarefree classes of the pair (n, n-2):');
say(line('both     ', sqclass.both));
say(line('n only   ', sqclass.nOnly));
say(line('n-2 only ', sqclass.n2Only));
say(line('neither  ', sqclass.neither));
for (const [k, a] of Object.entries(branch)) if (!a.count) say('REJECTED as a test of integer parity ' + k + ': no n in this class at these parameters');
for (const [k, a] of Object.entries(sqclass)) if (!a.count) say('REJECTED as a test of squarefree class ' + k + ': no n in this class at these parameters');
say('controls:');
say('  C1 delete category S: ' + (ctlDelS ? 'ACTIVE' : 'INACTIVE') + ' (' + ctlDelS + ' n where the identity then fails)');
say('  C2 delete category Q: ' + (ctlDelQ ? 'ACTIVE' : 'INACTIVE') + ' (' + ctlDelQ + ' n where the identity then fails)');
say('  C3 repeated powers of one base kept as separate r: ' + ((repeatedLeft + repeatedRight) ? 'ACTIVE' : 'INACTIVE')
  + ' (left n=' + repeatedLeft + ' right n=' + repeatedRight + (repeatedExample ? ' first ' + repeatedExample : '') + ')');
say('  C4 every input integer reconstructs from its factors: ' + (reconChecked && !reconMismatch ? 'ACTIVE' : 'INACTIVE')
  + ' (' + reconChecked + ' checked)');
say('  C5 P+S+Q equals the direct divisor formula per n: ' + (identityChecked && !identityMismatch ? 'ACTIVE' : 'INACTIVE')
  + ' (' + identityChecked + ' checked)');
if (probe) {
  say('corner probe: fixed-eta corner cuts Dlo=' + probe.cDlo + ' Elo=' + probe.cElo
    + ' -> n with both sides nonempty=' + probe.sup + ' total terms=' + probe.terms);
  say('  a term needs Dlo<d and n/d>V, hence n>V*Dlo; this prefix is a proxy window, not the asymptotic corner');
}
say('runtime: ' + ((Date.now() - t0) / 1000).toFixed(2) + ' s');
console.log(out.join('\n'));
if (hardFail) process.exitCode = 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 1 research/corner-branch-diagnostic.js -- --fixture
//   invocation:  node research/corner-branch-diagnostic.js --fixture
//   code-sha256: 50f53bd2986789974e294e074e046a8ac7226b5e76e8a58fd1c2bcb2f74092c2
//   out-sha256:  45aa36d34dc98c2964d22ee3c4f9cd716823b80a97c50fad6e1c29a2388f637b
//   body-lines:  37
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// scope: exact finite algebra of the stated identity on finite inputs; float sums are MEASURED
//        no arithmetic estimate, sign trend, asymptotic saving or twin margin is inferred
// mode: fixture (finite algebra only)  profile=fixture
// fixture cuts are disclosed toy values with no arithmetic meaning: n in [300,1200]
// cutoffs left : V=2 Dlo=3 D0=60   (U=3)
// cutoffs right: Z=2 Elo=3 E0=60   (Y=3)
// reconstruction control: integers checked=1802 mismatches=0
// identity control: sides checked=1802 mismatches=0
// category population left : P=613 S=2653 Q=1784
// category population right: P=614 S=2630 Q=1756
// matrix (rows left P,S,Q x cols right P,S,Q): signed | abs-term | grouped-abs | support
//   PxP'  signed=-170.599228 absterm=1392.393754 groupedabs=1392.393754 support=63
//   PxS'  signed=1289.065714 absterm=4019.353752 groupedabs=1634.822296 support=81
//   PxQ'  signed=-12.627226 absterm=1541.285196 groupedabs=604.430755 support=97
//   SxP'  signed=1342.533597 absterm=3805.909162 groupedabs=1780.383049 support=79
//   SxS'  signed=-525.652716 absterm=8030.838091 groupedabs=1691.666215 support=95
//   SxQ'  signed=73.123083 absterm=3269.675760 groupedabs=648.705660 support=83
//   QxP'  signed=100.298506 absterm=1478.537964 groupedabs=592.616993 support=86
//   QxS'  signed=-90.194218 absterm=2762.316675 groupedabs=578.074463 support=74
//   QxQ'  signed=-23.905539 absterm=525.378242 groupedabs=68.528299 support=28
// overall (full C(n)C'(n-2), all nine cells):
//   all       n-count=901 support=254 signed=1982.041974 absterm=26825.688596 groupedabs=3684.558805
// integer parity (gcd(n,n-2)); not the per-term CRT or cofactor gcd partition:
//   odd       n-count=450 support=121 signed=2643.840644 absterm=6703.304323 groupedabs=2701.550712
//   even      n-count=451 support=133 signed=-661.798670 absterm=20122.384273 groupedabs=983.008093
// squarefree classes of the pair (n, n-2):
//   both      n-count=289 support=56 signed=1453.033876 absterm=3213.241532 groupedabs=1482.166860
//   n only    n-count=258 support=82 signed=225.054609 absterm=9325.531259 groupedabs=862.641781
//   n-2 only  n-count=259 support=75 signed=342.284666 absterm=8275.716158 groupedabs=964.918380
//   neither   n-count=95 support=41 signed=-38.331177 absterm=6011.199647 groupedabs=374.831784
// controls:
//   C1 delete category S: ACTIVE (504 n where the identity then fails)
//   C2 delete category Q: ACTIVE (409 n where the identity then fails)
//   C3 repeated powers of one base kept as separate r: ACTIVE (left n=213 right n=212 first left n=300)
//   C4 every input integer reconstructs from its factors: ACTIVE (1802 checked)
//   C5 P+S+Q equals the direct divisor formula per n: ACTIVE (1802 checked)
// runtime: 0.02 s
// ============================================================================
// READINGS
// 1. Tail 1 is the fixture. Its cuts V=2, Dlo=3, D0=60, Z=2, Elo=3, E0=60 on
//    n in [300,1200] are disclosed toy values. This is finite algebra only and
//    carries no arithmetic content.
// 2. The two computations of each side agree on all 1802 sides: sides
//    checked=1802 mismatches=0, as integer vectors of prime-log coefficients.
//    An independent naive third construction (a full d=1..n loop with no
//    factorisation reuse, run outside the repository) reproduced the fixture's
//    overall signed total 1982.041974.
// 3. All five controls are ACTIVE at these cuts. Deleting category S breaks the
//    identity on 504 of the n, deleting Q on 409, so neither category is a
//    silent zero here. C3 shows repeated powers of one base entered as separate
//    r on 213 left and 212 right sides.
// 4. All nine matrix cells are populated (smallest support 28 at QxQ'), both
//    gcd branches are populated (450 odd, 451 even), and all four squarefree
//    classes are populated (289, 258, 259, 95). Nothing is REJECTED here, so
//    the fixture is a test of every branch.
// 5. Sums here are floating logarithmic values and are MEASURED. No sign,
//    ratio or trend in this block supports any arithmetic statement.

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 2 research/corner-branch-diagnostic.js -- --window=9973 --profile=handoff --probe-corner
//   invocation:  node research/corner-branch-diagnostic.js --window=9973 --profile=handoff --probe-corner
//   code-sha256: 50f53bd2986789974e294e074e046a8ac7226b5e76e8a58fd1c2bcb2f74092c2
//   out-sha256:  0b1ce7025ee51297824f784b139f95946f3c4d51b85b458417a6a8aa5344cfc8
//   body-lines:  45
//   inputs:      research/data-reuse/factor-windows.json@fa30e65431c2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// scope: exact finite algebra of the stated identity on finite inputs; float sums are MEASURED
//        no arithmetic estimate, sign trend, asymptotic saving or twin margin is inferred
// mode: factor-reuse  profile=handoff
// artefact: research/data-reuse/factor-windows.json schema=1 sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b
// artefact-producer: research/singleton-fiber-validation.js
// source-binding: research/fold-ledger-01.csv sha256=ed5364404c9b84d16709a800e3eb5d7077788879dc1f2f5df4433fb55823461d
// window: q=9973 factorStart=99460729 retained=4098 factor-block-sha256=f8b82a24d1dbbb5da5fba85cc58259fdc38b3458d6b9452c6be23aa87fc47df0
// dyadic: x=134217728 J_x=(67108864,134217728] |J_x|=67108864  eta0=0.002 D1=1395160 E1=48854902
// scanned: n in [99460731,99464826] count=4096 = 6.104e-5 of J_x  -- PREFIX, not the interval
//          cutoffs are derived from the full x, never from the prefix; a prefix is not the corner
// cutoffs left : V=89 Dlo=89 D0=1491308   (U=89)
// cutoffs right: Z=2 Elo=2 E0=44739242   (Y=2)
// reconstruction control: integers checked=8192 mismatches=0
// identity control: sides checked=8192 mismatches=0
// category population left : P=4511 S=22847 Q=2367
// category population right: P=10747 S=117551 Q=48472
// matrix (rows left P,S,Q x cols right P,S,Q): signed | abs-term | grouped-abs | support
//   PxP'  signed=-10224.787384 absterm=208437.866261 groupedabs=208437.866261 support=883
//   PxS'  signed=23748.375839 absterm=1597557.476258 groupedabs=205324.507455 support=485
//   PxQ'  signed=-234.743765 absterm=178432.410197 groupedabs=12145.537327 support=742
//   SxP'  signed=15479.156779 absterm=808529.017117 groupedabs=202173.064940 support=800
//   SxS'  signed=-18654.271774 absterm=7078139.598873 groupedabs=190544.498383 support=498
//   SxQ'  signed=1073.250630 absterm=740713.258609 groupedabs=11326.936516 support=658
//   QxP'  signed=169.648435 absterm=23485.595870 groupedabs=2358.806149 support=61
//   QxS'  signed=142.582972 absterm=176749.384249 groupedabs=2644.702668 support=47
//   QxQ'  signed=16.108514 absterm=17318.632907 groupedabs=79.557736 support=25
// overall (full C(n)C'(n-2), all nine cells):
//   all       n-count=4096 support=932 signed=11515.320247 absterm=10829363.240341 groupedabs=185675.209326
// integer parity (gcd(n,n-2)); not the per-term CRT or cofactor gcd partition:
//   odd       n-count=2048 support=700 signed=11723.673800 absterm=2771049.008241 groupedabs=183760.406074
//   even      n-count=2048 support=232 signed=-208.353553 absterm=8058314.232100 groupedabs=1914.803253
// squarefree classes of the pair (n, n-2):
//   both      n-count=1331 support=448 signed=14232.144096 absterm=1662078.971669 groupedabs=126984.036219
//   n only    n-count=1158 support=292 signed=9083.715723 absterm=4528920.429065 groupedabs=37692.430725
//   n-2 only  n-count=1158 support=101 signed=-8597.878505 absterm=2725816.585310 groupedabs=16491.388742
//   neither   n-count=449 support=91 signed=-3202.661066 absterm=1912547.254297 groupedabs=4507.353641
// controls:
//   C1 delete category S: ACTIVE (2816 n where the identity then fails)
//   C2 delete category Q: ACTIVE (1473 n where the identity then fails)
//   C3 repeated powers of one base kept as separate r: ACTIVE (left n=42 right n=1194 first right n-2=99460736)
//   C4 every input integer reconstructs from its factors: ACTIVE (8192 checked)
//   C5 P+S+Q equals the direct divisor formula per n: ACTIVE (8192 checked)
// corner probe: fixed-eta corner cuts Dlo=1395160 Elo=48854902 -> n with both sides nonempty=0 total terms=0
//   a term needs Dlo<d and n/d>V, hence n>V*Dlo; this prefix is a proxy window, not the asymptotic corner
// runtime: 0.12 s
// ============================================================================
// READINGS
// 1. Tail 2 is the bounded factor-reuse run. Factors come from the archived
//    artefact at sha256 fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b,
//    whose recorded source binding research/fold-ledger-01.csv at sha256
//    ed5364404c9b84d16709a800e3eb5d7077788879dc1f2f5df4433fb55823461d is printed
//    unchanged. The artefact was read, never written.
// 2. The scanned n interval [99460731,99464826] is 6.104e-5 of J_x. It is a
//    PREFIX of the interval, not the interval, and not the corner. Cutoffs come
//    from x=134217728.
// 3. The corner probe is the load-bearing negative: at the fixed-eta cuts
//    Dlo=1395160, Elo=48854902 the number of n with both sides nonempty is 0
//    and total terms=0. The fixed-eta corner is empty on this retained prefix.
//    The reported matrix therefore uses the handoff cuts Dlo=89, Elo=2, which
//    are a proxy window and are not the asymptotic corner.
// 4. Identity: sides checked=8192 mismatches=0. Reconstruction: integers
//    checked=8192 mismatches=0. All five controls ACTIVE, C1 on 2816 n and C2
//    on 1473 n.
// 5. Every one of the nine cells, both integer parities and all four squarefree
//    classes are populated at these cuts; the smallest cell support is 25 at
//    QxQ'. No listed category is REJECTED. No per-term CRT gcd partition is tested.
// 6. The signed and absolute totals are MEASURED floating sums on 4096 values
//    of n at one set of non-asymptotic cuts. They are not an estimate. No sign
//    trend, cancellation rate, saving or twin margin follows from them, and
//    none is claimed. The twin-prime margin is OPEN.
