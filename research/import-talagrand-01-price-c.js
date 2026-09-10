// ============================================================================
// import-talagrand-01-price-c.js  —  THE PRICE OF `c`, AND THE SCORING OF THE
// FIVE SEALED PREDICTIONS OF IMPORT-MAP ROW 7 (concentration on product spaces)
// ============================================================================
// The confirmation experiment pre-registered IN FULL by
// research/history/staging/row7-recon.md §9. That recon closed row 7 on a
// SCRATCHPAD check, said so in §4 ("this is a scratchpad check run during this
// recon, not an embedded corpus artifact"), and forbade any body document from
// citing its table until a committed producer existed. This is that producer.
//
// WHAT IS COMPUTED, exactly, over the window-count ensemble of
// paper/anchored-note.md §1 — the one ensemble of recon §3 that is a genuine
// product space, one independent uniform residue class per scour prime:
//
//   N_x   = { r in [0,W) : r = 11 or 17 (mod 30), r mod p not in {0,p-2}
//             for every prime 7 <= p <= x },   W = x#,  N = |N_x|
//   y     = the largest prime <= sqrt(W); scour primes are x < q <= y
//   d(q)  = max_a #{ r in N_x : r = a or a-2 (mod q) }   EXACT, by enumerating
//           the comb's residue histogram mod q, for EVERY scour prime q
//   Pi    = prod_{x<q<=y} (1 - 2/q)
//   E[S]  = N*Pi      (survivors)      E[K] = N - E[S]   (struck slots)
//   c*    = the largest per-coordinate effect Bruhn-Joos Theorem 8 tolerates
//           before its ADDITIVE slack alone eats the mean, at rate l = 1:
//           60*c*sqrt(l*E[K]) = E[S]  =>  c* = E[S]/(60*sqrt(E[K]))
//   mu_q  = (2N/q)*prod_{q' != q}(1-2/q'), the slots struck by q alone
//   the Lemma-9 best-case exponent  E[S]^2 / (8*mu_{q1}*E[K]), i.e. t^2/(4c^2 s)
//           at t = E[S], s = E[K], c^2 = 2*mu_{q1} — the fluctuation-scale
//           per-coordinate effect an ideal exceptional set Omega* would buy.
//
// THE FIVE SEALED PREDICTIONS are not typed in here. They are PARSED back out
// of the committed pre-registration at run time (part 0) and the run aborts if
// the record does not carry them, so the scorecard cannot drift from the claim
// it scores. Prediction (i) is the calibration: its failure invalidates the run
// and the script exits non-zero before scoring anything else.
//
// THE PUBLISHED E[S] DIGITS ARE CITED, NOT RE-DERIVED. Part 1 parses the E[S]
// column of paper/anchored-note.md §2 out of that file and compares.
//
// THE KILL CRITERION runs AGAINST the closure, as §9 wrote it: the closure is
// WRONG if the Lemma-9 exponent exceeds 1 at any level, or is non-decreasing
// across the five levels. Part 6 states the verdict either way.
//
// COST. The d(q) sweep is |N_x| * pi(y) exact residue reductions: 9.2e9 at @23
// and 1.1e12 at @29, so the sweep is sharded across worker threads over a
// shared gap array. @29 is the "if it fits the hour" level of §9; it fits.
// Levels 31 and 37 carry the closed-form quantities only (no comb of 4.2e9 and
// 1.5e11 slots is built), which is enough for the exponent series and is
// labelled as such wherever it is printed.
//
//   node --max-old-space-size=8192 research/import-talagrand-01-price-c.js
// ============================================================================
'use strict';

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// ---------------------------------------------------------------------------
// The worker half: given the shared comb-gap array and a list of scour primes,
// return d(q) for each. Kept above the main() guard so `new Worker(__filename)`
// re-enters here and nothing else.
// ---------------------------------------------------------------------------
function sweep(gaps, N, primes) {
  const out = new Float64Array(primes.length);
  for (let t = 0; t < primes.length; t++) {
    const q = primes[t];
    const h = new Int32Array(q);
    let v = 0;
    for (let i = 0; i < N; i++) { v += gaps[i]; if (v >= q) v %= q; h[v]++; }
    let d = 0;
    for (let a = 0; a < q; a++) { const b = a < 2 ? a - 2 + q : a - 2; const s = h[a] + h[b]; if (s > d) d = s; }
    out[t] = d;
  }
  return out;
}

if (!isMainThread) {
  const { sab, N, primes } = workerData;
  parentPort.postMessage(sweep(new Uint16Array(sab), N, primes), []);
} else {

const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const REPO = path.resolve(__dirname, '..');
const JOBS = 8;

// ---- elementary machinery --------------------------------------------------
function primesTo(n) {
  const s = [], c = new Uint8Array(n + 1);
  for (let i = 2; i <= n; i++) if (!c[i]) { s.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; }
  return s;
}
function levelClosedForm(x) {
  const wheel = primesTo(x);
  let W = 1, N = 2;
  for (const p of wheel) { W *= p; if (p >= 7) N *= (p - 2); }
  const ps = primesTo(Math.floor(Math.sqrt(W)));
  const y = ps[ps.length - 1];
  const scour = ps.filter(q => q > x);
  let Pi = 1;
  for (const q of scour) Pi *= (1 - 2 / q);
  const q1 = scour[0];
  const ES = N * Pi, EK = N - ES;
  const cstar = ES / (60 * Math.sqrt(EK));
  const mu1 = (2 * N / q1) * Pi / (1 - 2 / q1);
  const expo = (ES * ES) / (8 * mu1 * EK);
  return { x, W, N, y, nq: scour.length, scour, Pi, q1, ES, EK, cstar, mu1, expo };
}
// The comb as ascending gaps, in a SharedArrayBuffer so every worker reads one
// copy. Uint16 is asserted, not assumed: the widest comb gap measured here is
// 426 at @29 and the array would silently wrap if a level ever exceeded 65535.
function combGaps(x, N, W) {
  const wheel = Int32Array.from(primesTo(x).filter(p => p >= 7));
  const nw = wheel.length;
  const sab = new SharedArrayBuffer(2 * N);
  const gaps = new Uint16Array(sab);
  let prev = 0, k = 0, maxgap = 0;
  for (let base = 0; base < W; base += 30) {
    for (let bi = 0; bi < 2; bi++) {
      const r = base + (bi ? 17 : 11);
      let ok = true;
      for (let j = 0; j < nw; j++) { const p = wheel[j]; const m = r % p; if (m === 0 || m === p - 2) { ok = false; break; } }
      if (ok) { const g = r - prev; if (g > 65535) throw new Error(`comb gap ${g} exceeds Uint16 at x=${x}`); if (g > maxgap) maxgap = g; gaps[k++] = g; prev = r; }
    }
  }
  if (k !== N) throw new Error(`comb count ${k} != 2*prod(p-2) = ${N} at x=${x}`);
  return { sab, gaps, maxgap };
}
function dSweep(sab, N, scour) {
  const shards = [];
  for (let j = 0; j < JOBS; j++) shards.push([]);
  scour.forEach((q, i) => shards[i % JOBS].push(q));
  return Promise.all(shards.map(primes => new Promise((res, rej) => {
    if (!primes.length) return res([]);
    const w = new Worker(__filename, { workerData: { sab, N, primes } });
    w.on('message', m => res(Array.from(m)));
    w.on('error', rej);
  }))).then(parts => {
    const d = new Map();
    shards.forEach((primes, j) => primes.forEach((q, i) => d.set(q, parts[j][i])));
    return d;
  });
}
const fmt = (v, n) => v.toLocaleString('en-US', { minimumFractionDigits: n, maximumFractionDigits: n });
const pad = (s, n) => String(s).padStart(n);

// ---------------------------------------------------------------------------
async function main() {
console.log('IMPORT-MAP row 7 --- the price of c, scored against the sealed predictions of');
console.log('research/history/staging/row7-recon.md §9.  Producer: import-talagrand-01-price-c.js\n');

// ---- (0) CUSTODY: read the sealed predictions back out of the record -------
const PRE = path.join(REPO, 'research', 'history', 'staging', 'row7-recon.md');
const pre = fs.readFileSync(PRE, 'utf8').replace(/\s+/g, ' ');
const grab = (re, what) => { const m = pre.match(re); if (!m) throw new Error(`pre-registration does not carry ${what}`); return m; };
const nums = s => s.split('/').map(t => Number(t.replace(/,/g, '').trim()));
const band = grab(/`d\(q₁\)\/\(2N\/q₁\) ∈ \[([\d.]+), ([\d.]+)\]` at every level/, 'the (ii) band');
const SEAL = {
  band: [Number(band[1]), Number(band[2])],
  argmax: grab(/`d` is maximised at `q = q₁` at every level/, 'the (iii) claim')[0],
  ratio: nums(grab(/within 5% of ([\d,. \/]+) and is monotone increasing/, 'the (iv) sequence')[1]),
  expo: nums(grab(/lies within 5% of ([\d,. \/]+) and is monotone \*\*decreasing\*\*/, 'the (v) sequence')[1]),
  form: grab(/𝔼\[S\]²\/\(8μ_\{q₁\}𝔼\[K\]\)/, 'the (v) formula')[0],
  kill: grab(/the Lemma-9 exponent exceeds 1 at any level, or it is non-decreasing across the five levels/, 'the kill criterion')[0],
  calib: grab(/this is the calibration and its failure invalidates the run/, 'the (i) calibration clause')[0],
};
const SEALED_LEVELS = [11, 13, 17, 19, 23];
console.log('(0) CUSTODY: the sealed predictions, parsed back out of the committed record');
console.log(`    (i)   calibration clause present: "${SEAL.calib}"`);
console.log(`    (ii)  band          [${SEAL.band[0].toFixed(2)}, ${SEAL.band[1].toFixed(2)}]`);
console.log(`    (iii) claim         ${SEAL.argmax}`);
console.log(`    (iv)  d(q1)/c*      ${SEAL.ratio.join(' / ')}   monotone increasing`);
console.log(`    (v)   exponent      ${SEAL.expo.join(' / ')}   monotone decreasing,  ${SEAL.form}`);
console.log(`    KILL  ${SEAL.kill}`);
if (SEAL.ratio.length !== 5 || SEAL.expo.length !== 5) throw new Error('sealed sequences are not five long');
console.log(`    all five predictions and the kill criterion reproduce from the record.  [${el()}]`);

// ---- (1) PREDICTION (i): the calibration ----------------------------------
// The published digits are READ OUT of paper/anchored-note.md §2. They are
// cited, never recomputed by a second route: the whole point of a calibration
// is that this producer's E[S] must land on somebody else's published number.
const NOTE = path.join(REPO, 'paper', 'anchored-note.md');
const noteText = fs.readFileSync(NOTE, 'utf8');
// §2's table only. anchored-note.md carries several tables whose first column
// is also a small integer, and a parser that swept the whole file would happily
// calibrate against the wrong one.
const secStart = noteText.indexOf('## 2. The ensemble layer');
if (secStart === -1) throw new Error('paper/anchored-note.md §2 heading not found');
const secEnd = noteText.indexOf('\n## ', secStart + 1);
const section2 = noteText.slice(secStart, secEnd === -1 ? undefined : secEnd);
const published = new Map();
for (const ln of section2.split('\n')) {
  const m = ln.match(/^\|\s*(\d+)\s*\|\s*([\d,]+)\s*\|\s*([\d,.]+)\s*\|/);
  if (m) published.set(Number(m[1]), { W: Number(m[2].replace(/,/g, '')), ES: m[3], digits: (m[3].split('.')[1] || '').length });
}
if (!SEALED_LEVELS.every(x => published.has(x))) throw new Error('anchored-note §2 table did not parse at the five sealed levels');

const ALL = [7, 11, 13, 17, 19, 23, 29, 31, 37];
const L = new Map(ALL.map(x => [x, levelClosedForm(x)]));
console.log('\n(1) PREDICTION (i) --- CALIBRATION.  E[S] = N*Pi against the published column of');
console.log('    paper/anchored-note.md §2.  A failure here invalidates the whole run.');
console.log('     x |               N |         y |    Pi     |     E[S] = N*Pi |       published |  rel. diff | sealed');
let calibFail = 0;
const calibExtra = [];
for (const x of ALL) {
  const r = L.get(x), p = published.get(x);
  if (r.W !== p.W) throw new Error(`W mismatch at x=${x}: ${r.W} vs published ${p.W}`);
  const shown = fmt(r.ES, p.digits);
  const agree = shown === p.ES;
  const rel = (r.ES - Number(p.ES.replace(/,/g, ''))) / Number(p.ES.replace(/,/g, ''));
  const sealed = SEALED_LEVELS.includes(x);
  if (sealed && !agree) calibFail++; else if (!sealed && agree) calibExtra.push(x);
  console.log(`  ${pad(x, 4)} | ${pad(fmt(r.N, 0), 15)} | ${pad(r.y, 9)} | ${r.Pi.toFixed(6)}  | ${pad(shown, 15)} | ${pad(p.ES, 15)} |  ${rel.toExponential(1).padStart(9)} | ${sealed ? (agree ? 'SEALED, hit' : 'SEALED, MISS') : '  --'}`);
}
if (calibFail) {
  console.log(`\n    (i) FAILS at ${calibFail} of the five sealed levels. §9: "its failure invalidates the run".`);
  console.log('    Nothing further is scored.');
  process.exitCode = 1;
  return;
}
console.log(`    (i) PASSES at all ${SEALED_LEVELS.length} sealed levels, to every published digit, and at the`);
console.log(`    ${calibExtra.length} unsealed level(s) besides (${calibExtra.map(v => '@' + v).join(' ')}).  [${el()}]`);

// ---- (2) the exact per-coordinate effect ----------------------------------
const D_LEVELS = [11, 13, 17, 19, 23, 29];
console.log('\n(2) THE EXACT PER-COORDINATE EFFECT.  d(q) = max_a #{r in N_x : r = a or a-2 (mod q)},');
console.log('    computed exactly for EVERY scour prime, not only for q1.');
console.log('     x |  q1 | scour primes |     d(q1) |     2N/q1 |  ratio  | argmax_q d(q) |   max_q d(q) | (iii)');
const dres = new Map();
for (const x of D_LEVELS) {
  const r = L.get(x);
  const { sab, maxgap } = combGaps(x, r.N, r.W);
  const d = await dSweep(sab, r.N, r.scour);
  let best = -1, arg = -1;
  for (const q of r.scour) { const v = d.get(q); if (v > best) { best = v; arg = q; } }
  const dq1 = d.get(r.q1), mean = 2 * r.N / r.q1;
  dres.set(x, { d, dq1, best, arg, maxgap });
  console.log(`  ${pad(x, 4)} | ${pad(r.q1, 3)} | ${pad(fmt(r.nq, 0), 12)} | ${pad(fmt(dq1, 0), 9)} | ${pad(mean.toFixed(1), 9)} | ${(dq1 / mean).toFixed(4)}  | ${pad(arg, 13)} | ${pad(fmt(best, 0), 12)} | ${arg === r.q1 ? 'hit' : 'MISS'}   [${el()}]`);
}
console.log(`    comb integrity: the enumeration returned exactly 2*prod_{7<=p<=x}(p-2) slots at`);
console.log(`    every level, and the widest comb gap seen was ${Math.max(...D_LEVELS.map(x => dres.get(x).maxgap))}, so the Uint16 gap array never wrapped.`);

// ---- (3) failure mode 1: the worst-case c against what Theorem 8 tolerates -
console.log('\n(3) FAILURE MODE 1 --- the price of c.  c* = E[S]/(60*sqrt(E[K])) is the largest');
console.log('    per-coordinate effect whose ADDITIVE slack alone, 60c*sqrt(l*E[K]) at l = 1,');
console.log('    still leaves the mean standing.  Any c > c* is vacuous before the exponential.');
console.log('     x |            E[S] |            E[K] |      c* |   d(q1)/c* | sealed (iv) |  miss');
const ratios = [];
for (const x of D_LEVELS) {
  const r = L.get(x), dq1 = dres.get(x).dq1;
  const ratio = dq1 / r.cstar;
  ratios.push(ratio);
  const i = SEALED_LEVELS.indexOf(x);
  const s = i === -1 ? null : SEAL.ratio[i];
  const miss = s === null ? '' : `${(Math.abs(ratio - s) / s * 100).toFixed(2)}%`;
  console.log(`  ${pad(x, 4)} | ${pad(fmt(r.ES, 2), 15)} | ${pad(fmt(r.EK, 2), 15)} | ${pad(r.cstar.toFixed(4), 7)} | ${pad(fmt(ratio, 0), 10)} | ${pad(s === null ? '--' : fmt(s, 0), 11)} | ${pad(miss, 6)}`);
}

// ---- (4) failure mode 2: Lemma 9's best case ------------------------------
console.log('\n(4) FAILURE MODE 2 --- Bruhn-Joos Lemma 9 at its best case.  Give an ideal Omega*');
console.log('    everything: per-coordinate effect at the FLUCTUATION scale c^2 = 2*mu_{q1},');
console.log('    s = E[K], t = E[S].  Exponent = E[S]^2/(8*mu_{q1}*E[K]).  Levels 31 and 37 are');
console.log('    closed form only (no comb built); every column there is exact all the same.');
console.log('     x |  q1 |        mu_{q1} | exponent | sealed (v) |  miss  | q1*Pi/16 | comb');
const expos = [];
for (const x of ALL.filter(v => v >= 11)) {
  const r = L.get(x);
  expos.push({ x, e: r.expo });
  const i = SEALED_LEVELS.indexOf(x);
  const s = i === -1 ? null : SEAL.expo[i];
  const miss = s === null ? '' : `${(Math.abs(r.expo - s) / s * 100).toFixed(2)}%`;
  console.log(`  ${pad(x, 4)} | ${pad(r.q1, 3)} | ${pad(fmt(r.mu1, 2), 14)} | ${pad(r.expo.toFixed(4), 8)} | ${pad(s === null ? '--' : s.toFixed(3), 10)} | ${pad(miss, 6)} | ${pad((r.q1 * r.Pi / 16).toFixed(4), 8)} | ${D_LEVELS.includes(x) ? 'exact' : 'n/a'}`);
}

// ---- (5) the scorecard ----------------------------------------------------
console.log('\n(5) SCORECARD OF THE FIVE SEALED PREDICTIONS');
const card = [];
card.push(['(i)   E[S] = N*Pi reproduces anchored-note §2 to the published digits', 'PASS',
  `exact at all ${SEALED_LEVELS.length} sealed levels, and at ${calibExtra.map(v => '@' + v).join(' ')} besides`]);

const bandRows = SEALED_LEVELS.map(x => { const r = L.get(x); return { x, v: dres.get(x).dq1 / (2 * r.N / r.q1) }; });
const bandBad = bandRows.filter(r => r.v < SEAL.band[0] || r.v > SEAL.band[1]);
card.push([`(ii)  d(q1)/(2N/q1) in [${SEAL.band[0].toFixed(2)}, ${SEAL.band[1].toFixed(2)}] at every level`,
  bandBad.length ? 'FAIL' : 'PASS',
  bandBad.length ? `out of band at ${bandBad.map(r => `@${r.x} (${r.v.toFixed(4)})`).join(', ')}; in band at the other ${bandRows.length - bandBad.length}`
                 : `measured ${bandRows.map(r => r.v.toFixed(4)).join(' ')}`]);

const argBad = D_LEVELS.filter(x => dres.get(x).arg !== L.get(x).q1);
card.push(['(iii) d is maximised at q = q1 at every level', argBad.length ? 'FAIL' : 'PASS',
  argBad.length ? `maximised elsewhere at ${argBad.map(x => '@' + x).join(', ')}`
                : `argmax = q1 at all ${D_LEVELS.length} computed levels, over ${fmt(D_LEVELS.reduce((a, x) => a + L.get(x).nq, 0), 0)} scour primes in total`]);

const rSealed = ratios.slice(0, 5);
const rMiss = rSealed.map((v, i) => Math.abs(v - SEAL.ratio[i]) / SEAL.ratio[i]);
const rMono = rSealed.every((v, i) => i === 0 || v > rSealed[i - 1]);
const rOk = rMiss.every(m => m <= 0.05) && rMono;
card.push(['(iv)  d(q1)/c* within 5% of the sealed sequence, monotone increasing', rOk ? 'PASS' : 'FAIL',
  `worst miss ${(Math.max(...rMiss) * 100).toFixed(2)}%, monotone increasing ${rMono ? 'yes' : 'NO'}`]);

const eSealed = SEALED_LEVELS.map(x => L.get(x).expo);
const eMiss = eSealed.map((v, i) => Math.abs(v - SEAL.expo[i]) / SEAL.expo[i]);
const eMono = eSealed.every((v, i) => i === 0 || v < eSealed[i - 1]);
const eOk = eMiss.every(m => m <= 0.05) && eMono;
card.push(['(v)   Lemma-9 exponent within 5% of the sealed sequence, monotone decreasing', eOk ? 'PASS' : 'FAIL',
  `worst miss ${(Math.max(...eMiss) * 100).toFixed(2)}%, monotone decreasing ${eMono ? 'yes' : 'NO'}`]);

for (const [what, verdict, detail] of card) console.log(`  ${verdict.padEnd(5)} ${what}\n           ${detail}`);
console.log(`  ${card.filter(c => c[1] === 'PASS').length} of 5 confirmed, ${card.filter(c => c[1] === 'FAIL').length} refuted.`);

// ---- (6) the kill criterion, run against the closure ----------------------
console.log('\n(6) THE KILL CRITERION, AGAINST THE CLOSURE.  §9: the closure is WRONG if the');
console.log('    Lemma-9 exponent exceeds 1 at any level, or is non-decreasing across the five.');
const overOne = expos.filter(r => r.e > 1);
const fiveDesc = eSealed.every((v, i) => i === 0 || v < eSealed[i - 1]);
const nineDesc = expos.every((r, i) => i === 0 || r.e < expos[i - 1].e);
const eTop = expos.reduce((a, b) => (b.e > a.e ? b : a));
console.log(`    exponent > 1 anywhere            : ${overOne.length ? 'YES at ' + overOne.map(r => '@' + r.x).join(', ') : 'no  (largest is ' + eTop.e.toFixed(4) + ' at @' + eTop.x + ')'}`);
console.log(`    non-decreasing across the five   : ${fiveDesc ? 'no  (strictly decreasing, ' + eSealed.map(v => v.toFixed(3)).join(' > ') + ')' : 'YES'}`);
console.log(`    (unsealed extension to ${expos.length} levels : ${nineDesc ? 'still strictly decreasing, down to ' + expos[expos.length - 1].e.toFixed(4) + ' at @' + expos[expos.length - 1].x : 'NOT monotone'})`);
const reopen = overOne.length > 0 || !fiveDesc;
console.log(`    VERDICT: ${reopen ? 'ROW 7 REOPENS. The next step is Bruhn-Joos Lemma 9 with an explicitly\n             constructed Omega*, plus Lemma 11 P[Omega*] << N^-2.' : 'the kill criterion does NOT fire. ROW 7 STAYS CLOSED WITH MECHANISM,\n             and the closure now rests on this artifact rather than on a scratchpad check.'}`);
console.log('    What this cannot do, per §9: reopen the TARGET. An ensemble bound of any');
console.log('    strength is inert on the anchored member, and §6 stands independently.');
console.log(`\n[${el()}] done`);
}

main().catch(e => { console.error(e); process.exitCode = 1; });

}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8192 research/import-talagrand-01-price-c.js
//   invocation:  node --max-old-space-size=8192 research/import-talagrand-01-price-c.js
//   code-sha256: 78cf15ab5cf80a48449c0f04df0b431868be31aa8d10f149ad50b738f9d98fb9
//   out-sha256:  0d4d1245a2da4ac8250139402d1bfb55ccc4ea10663f151357b9281f6abababe
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     401.2 s
// ============================================================================
// IMPORT-MAP row 7 --- the price of c, scored against the sealed predictions of
// research/history/staging/row7-recon.md §9.  Producer: import-talagrand-01-price-c.js
//
// (0) CUSTODY: the sealed predictions, parsed back out of the committed record
//     (i)   calibration clause present: "this is the calibration and its failure invalidates the run"
//     (ii)  band          [1.00, 1.10]
//     (iii) claim         `d` is maximised at `q = q₁` at every level
//     (iv)  d(q1)/c*      174 / 619 / 3133 / 14608 / 70576   monotone increasing
//     (v)   exponent      0.532 / 0.416 / 0.297 / 0.258 / 0.244   monotone decreasing,  𝔼[S]²/(8μ_{q₁}𝔼[K])
//     KILL  the Lemma-9 exponent exceeds 1 at any level, or it is non-decreasing across the five levels
//     all five predictions and the kill criterion reproduce from the record.  [0.0s]
//
// (1) PREDICTION (i) --- CALIBRATION.  E[S] = N*Pi against the published column of
//     paper/anchored-note.md §2.  A failure here invalidates the whole run.
//      x |               N |         y |    Pi     |     E[S] = N*Pi |       published |  rel. diff | sealed
//      7 |              10 |        13 | 0.692308  |            6.92 |            6.92 |     4.4e-4 |   --
//     11 |              90 |        47 | 0.436373  |           39.27 |           39.27 |     9.0e-5 | SEALED, hit
//     13 |             990 |       173 | 0.307356  |          304.28 |          304.28 |     7.0e-6 | SEALED, hit
//     17 |          14,850 |       709 | 0.218553  |        3,245.51 |        3,245.51 |     8.1e-7 | SEALED, hit
//     19 |         252,450 |      3109 | 0.164156  |       41,441.19 |       41,441.19 |    -6.5e-8 | SEALED, hit
//     23 |       5,301,450 |     14929 | 0.126197  |      669,028.80 |      669,028.80 |    -1.9e-9 | SEALED, hit
//     29 |     143,139,150 |     80429 | 0.098251  |   14,063,617.40 |   14,063,617.40 |    3.9e-11 |   --
//     31 |   4,151,035,350 |    447829 | 0.079161  |  328,601,798.62 |  328,601,798.62 |   -6.1e-12 |   --
//     37 | 145,286,237,250 |   2724079 | 0.064543  | 9,377,228,928.8 | 9,377,228,928.8 |   -3.9e-12 |   --
//     (i) PASSES at all 5 sealed levels, to every published digit, and at the
//     4 unsealed level(s) besides (@7 @29 @31 @37).  [0.1s]
//
// (2) THE EXACT PER-COORDINATE EFFECT.  d(q) = max_a #{r in N_x : r = a or a-2 (mod q)},
//     computed exactly for EVERY scour prime, not only for q1.
//      x |  q1 | scour primes |     d(q1) |     2N/q1 |  ratio  | argmax_q d(q) |   max_q d(q) | (iii)
//     11 |  13 |           10 |        16 |      13.8 | 1.1556  |            13 |           16 | hit   [0.2s]
//     13 |  17 |           34 |       120 |     116.5 | 1.0303  |            17 |          120 | hit   [0.2s]
//     17 |  19 |          120 |     1,573 |    1563.2 | 1.0063  |            19 |        1,573 | hit   [0.3s]
//     19 |  23 |          435 |    21,965 |   21952.2 | 1.0006  |            23 |       21,965 | hit   [0.3s]
//     23 |  29 |        1,739 |   365,630 |  365617.2 | 1.0000  |            29 |      365,630 | hit   [3.0s]
//     29 |  31 |        7,863 | 9,234,811 | 9234783.9 | 1.0000  |            31 |    9,234,811 | hit   [401.1s]
//     comb integrity: the enumeration returned exactly 2*prod_{7<=p<=x}(p-2) slots at
//     every level, and the widest comb gap seen was 426, so the Uint16 gap array never wrapped.
//
// (3) FAILURE MODE 1 --- the price of c.  c* = E[S]/(60*sqrt(E[K])) is the largest
//     per-coordinate effect whose ADDITIVE slack alone, 60c*sqrt(l*E[K]) at l = 1,
//     still leaves the mean standing.  Any c > c* is vacuous before the exponential.
//      x |            E[S] |            E[K] |      c* |   d(q1)/c* | sealed (iv) |  miss
//     11 |           39.27 |           50.73 |  0.0919 |        174 |         174 |  0.06%
//     13 |          304.28 |          685.72 |  0.1937 |        620 |         619 |  0.10%
//     17 |        3,245.51 |       11,604.49 |  0.5021 |      3,133 |       3,133 |  0.01%
//     19 |       41,441.19 |      211,008.81 |  1.5036 |     14,608 |      14,608 |  0.00%
//     23 |      669,028.80 |    4,632,421.20 |  5.1807 |     70,575 |      70,576 |  0.00%
//     29 |   14,063,617.40 |  129,075,532.60 | 20.6312 |    447,615 |          -- |
//
// (4) FAILURE MODE 2 --- Bruhn-Joos Lemma 9 at its best case.  Give an ideal Omega*
//     everything: per-coordinate effect at the FLUCTUATION scale c^2 = 2*mu_{q1},
//     s = E[K], t = E[S].  Exponent = E[S]^2/(8*mu_{q1}*E[K]).  Levels 31 and 37 are
//     closed form only (no comb built); every column there is exact all the same.
//      x |  q1 |        mu_{q1} | exponent | sealed (v) |  miss  | q1*Pi/16 | comb
//     11 |  13 |           7.14 |   0.5323 |      0.532 |  0.05% |   0.3546 | exact
//     13 |  17 |          40.57 |   0.4160 |      0.416 |  0.00% |   0.3266 | exact
//     17 |  19 |         381.83 |   0.2972 |      0.297 |  0.05% |   0.2595 | exact
//     19 |  23 |       3,946.78 |   0.2578 |      0.258 |  0.09% |   0.2360 | exact
//     23 |  29 |      49,557.69 |   0.2437 |      0.244 |  0.12% |   0.2287 | exact
//     29 |  31 |     969,904.65 |   0.1975 |         -- |        |   0.1904 | exact
//     31 |  37 |  18,777,245.64 |   0.1881 |         -- |        |   0.1831 | n/a
//     37 |  41 | 480,883,534.81 |   0.1682 |         -- |        |   0.1654 | n/a
//
// (5) SCORECARD OF THE FIVE SEALED PREDICTIONS
//   PASS  (i)   E[S] = N*Pi reproduces anchored-note §2 to the published digits
//            exact at all 5 sealed levels, and at @7 @29 @31 @37 besides
//   FAIL  (ii)  d(q1)/(2N/q1) in [1.00, 1.10] at every level
//            out of band at @11 (1.1556); in band at the other 4
//   PASS  (iii) d is maximised at q = q1 at every level
//            argmax = q1 at all 6 computed levels, over 10,201 scour primes in total
//   PASS  (iv)  d(q1)/c* within 5% of the sealed sequence, monotone increasing
//            worst miss 0.10%, monotone increasing yes
//   PASS  (v)   Lemma-9 exponent within 5% of the sealed sequence, monotone decreasing
//            worst miss 0.12%, monotone decreasing yes
//   4 of 5 confirmed, 1 refuted.
//
// (6) THE KILL CRITERION, AGAINST THE CLOSURE.  §9: the closure is WRONG if the
//     Lemma-9 exponent exceeds 1 at any level, or is non-decreasing across the five.
//     exponent > 1 anywhere            : no  (largest is 0.5323 at @11)
//     non-decreasing across the five   : no  (strictly decreasing, 0.532 > 0.416 > 0.297 > 0.258 > 0.244)
//     (unsealed extension to 8 levels : still strictly decreasing, down to 0.1682 at @37)
//     VERDICT: the kill criterion does NOT fire. ROW 7 STAYS CLOSED WITH MECHANISM,
//              and the closure now rests on this artifact rather than on a scratchpad check.
//     What this cannot do, per §9: reopen the TARGET. An ensemble bound of any
//     strength is inert on the anchored member, and §6 stands independently.
//
// [401.1s] done
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE CALIBRATION HOLDS, AND WIDER THAN IT WAS SEALED. [VERIFIED] E[S] = N*Pi
//    reproduces the published E[S] column of paper/anchored-note.md §2 to every
//    published digit at all five sealed levels, and at @7, @29, @31 and @37
//    besides: nine levels, with relative differences running from 4.4e-4 at @7
//    down to -3.9e-12 at @37, every one of them the published rounding and not
//    a disagreement. §9 made this the licence for everything after it, and the
//    licence is granted. Nothing below would have been printed had it failed.
//
// 2. PREDICTION (ii) IS THE ONE THAT FAILS, AND IT FAILS AT THE SHALLOWEST
//    LEVEL ONLY. [MEASURED] d(q1)/(2N/q1) = 1.1556 at @11, outside the sealed
//    band [1.00, 1.10]. At the other four sealed levels it is 1.0303, 1.0063,
//    1.0006, 1.0000, and 1.0000 again at the unsealed @29. The cause is
//    granularity rather than structure: at @11 the whole comb is 90 slots and
//    q1 = 13 sorts them into thirteen classes, so a single surplus slot in each
//    of the two classes q1 pairs lifts d(q1) to 16 against a mean 2N/q1 of
//    13.8. The band was read off the deep levels and then asserted "at every
//    level", and the shallowest level does not obey it. Scored as written: FAIL.
//
// 3. THE FAILURE OF (ii) CUTS AGAINST THE ROUTE, NOT FOR IT. [DERIVED, one
//    line] The miss is upward. The measured 1.1556 sits ABOVE the band's own
//    ceiling of 1.10, so the worst-case coordinate effect at @11 is further out
//    of Theorem 8's reach than the sealed band claimed, not nearer. A
//    prediction that misses in the direction that strengthens the conclusion it
//    was registered to test is worth saying out loud rather than burying.
//
// 4. PREDICTION (iii) HOLDS EXHAUSTIVELY, OVER 10,201 SCOUR PRIMES. [MEASURED]
//    d(q) is maximised at q = q1 at all six computed levels, and d was computed
//    for EVERY scour prime at each of them, not sampled. This is the reading the
//    scratchpad check behind recon §4 could not deliver: that §4 asserted the
//    maximum "is attained at the smallest one" as a structural remark, and the
//    remark is now checked rather than argued, up to 7,863 scour primes at @29.
//
// 5. FAILURE MODE 1 CONFIRMS TO 0.10%. [MEASURED] d(q1)/c* = 174, 620, 3,133,
//    14,608, 70,575 against the sealed 174 / 619 / 3,133 / 14,608 / 70,576;
//    worst miss 0.10%, monotone increasing, prediction (iv) PASS. The two
//    apparent discrepancies, 620 against 619 and 70,575 against 70,576, are the
//    scratchpad's rounding of the same quantity and are inside the sealed 5%
//    by three orders of magnitude. The unsealed @29 continues the divergence to
//    447,615, a further factor above @23 larger than any step before it, which
//    is what a ratio growing like sqrt(N) against a decaying Pi should do.
//
// 6. FAILURE MODE 2 CONFIRMS TO 0.12%, AND THE CLOSED FORM CATCHES UP.
//    [MEASURED] The Lemma-9 best-case exponent is 0.5323, 0.4160, 0.2972,
//    0.2578, 0.2437 against the sealed 0.532 / 0.416 / 0.297 / 0.258 / 0.244;
//    worst miss 0.12%, monotone decreasing, prediction (v) PASS. Recon §4's
//    closed form q1*Pi/16 sits at 0.3546 against an exact 0.5323 at @11 and at
//    0.1654 against an exact 0.1682 at @37: it is a third low at the shallow end
//    and within two percent at the deep end. §4 flagged its own asymptotic as
//    "an asymptotic reading of five measured points, and five points are not a
//    series". There are eight points now, the sequence is still falling, and the
//    closed form converges onto it from below rather than diverging from it.
//
// 7. THE KILL CRITERION DID NOT FIRE, AND IT WAS GIVEN EVERY CHANCE. [MEASURED]
//    §9 put the closure at risk on two conditions: an exponent above 1 anywhere,
//    or a non-decreasing exponent across the five levels. The largest exponent
//    anywhere is 0.5323, at the shallowest level, and the sequence is strictly
//    decreasing across the five sealed levels and across all eight computed.
//    ROW 7 STAYS CLOSED WITH MECHANISM. The difference this run makes is
//    custody, not verdict: recon §4's table was a scratchpad check that §10 item
//    11 said "has no home" and that no body document was permitted to cite, and
//    it is now an embedded artifact with 4 of 5 sealed predictions confirmed.
//
// 8. WHAT THIS STILL DOES NOT ESTABLISH. Three limits, all of them §9's own.
//    (a) The target is untouched. An ensemble bound of any strength is inert on
//    the anchored member, so no outcome here could have reopened row 7's second
//    named target, and recon §6 carries that argument alone. (b) The exponent is
//    measured, not proven asymptotic: eight decreasing points and a converging
//    closed form are evidence for ln^2(x)/x, not a proof that the sequence never
//    levels off past @37. (c) Everything here is priced at the certificate rate
//    l = 1, the smallest rate Theorem 8 admits and the one recon §2 derived for
//    the struck-slot count. A larger l only makes both failure modes worse, so
//    l = 1 is the route's best case and the right place to have killed it.
