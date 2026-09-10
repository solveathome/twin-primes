// ============================================================================
// ZONEGAP 02 — THE Z2 REDUCTION, VERIFIED: THE CERTIFICATION IDENTITY, THE
// CHAIN'S ARITHMETIC, THE HEAD-MACHINERY TRANSFERS, AND THE DEEP-END ONSET
// SPARSITY LEMMA — ALL AT SMALL LEVELS, EXACT
// ============================================================================
// THE QUESTION (the Z2 reduction pass, 2026-08-21). The companion note
// research/history/staging/zonegap-02-reduction.md states the formal proof
// target the programme aims at: (a) the Zone Restriction Lemma — Z2(p) IS
// the tile's gap object restricted to the head window; (b) the reduction
// chain Z2 + head + tail vs width; (c) the inventory of what the proven head
// machinery gives the zone; (d) the deep-end onset-sparsity lemma. This
// producer verifies every identity claimed there at small levels, exactly,
// aborting on any mismatch. Nothing here is asymptotic evidence; everything
// is an exact finite count (the square-window lesson, ZONE-POSTULATE.md §5a).
//
// CONVENTIONS — zonegap-01's govern, restated once (research/zonegap-01.js
// header; research/history/staging/zonegap-01.md §0):
//   pair       (a, a+2), both prime, named by OPENER a.
//   in zone p  p < a and a+2 < p'^2 (strict).
//   gap        consecutive in-zone opener difference (A113274 convention).
//   Z2(p)      max of those gaps; defined when the zone holds >= 2 pairs.
//   head       a_first - p;  tail = p'^2 - a_last. Never inside Z2.
//   slot       residue r of T_p = [0, W), W = p#, with gcd(r(r+2), W) = 1
//              (twin-slot opener; G2-STATE.md §1a). Cyclic for G2.
// WIDTH AUDIT: everything here is < 23# = 223092870 < 2^31; p'^2 <= 10201.
// All integers exact in doubles; no BigInt needed.
//
// PRIOR ART ON DISK (cited, extended, not re-derived):
//   - research/zonegap-01.js — the measured object; its conventions and its
//     small-level Z2 values are the calibration anchors here.
//   - research/ZONE-POSTULATE.md §1-§3 — certification, weak<=>TPC, the Gap
//     Reformulation (G2(p#) < p'^2 - 2 implies the postulate at p).
//   - research/G2-STATE.md §2 — exact G2 ladder; anchors 30/42/66/108/150/204
//     at p = 7..23 (custody there; recomputed for p <= 17 here, cited at
//     19, 23 per the standing compute rule).
//   - paper/staircase-note.md — Lemma 1 (Cofactor Rigidity), Lemma 2, Thm 3
//     regimes; the in-zone degeneration is verified in SEC C3 here.
//   - research/history/staging/attack-0c-holesweep.md §4 — Mirror-Sweep;
//     the zone-image derivation is SEC C2.
//   - research/natal-onset-01.js — q^2 first-fresh-kill staircase; the
//     deep-end lemma (SEC D) is its extremal form at the frontier.
// ============================================================================
'use strict';

// ---------- small toolbox (exact, elementary) ----------
function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function isPrime(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return false;
  return true;
}
function nextPrime(n) { let m = n + 1; while (!isPrime(m)) m++; return m; }
function lpf(n) { // least prime factor; n for primes; assumes n >= 2
  if (n % 2 === 0) return 2;
  for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return d;
  return n;
}
function primorial(p) { let W = 1; for (let q = 2; q <= p; q++) if (isPrime(q)) W *= q; return W; }
function primesUpTo(n) { const out = []; for (let q = 2; q <= n; q++) if (isPrime(q)) out.push(q); return out; }
function pi(t) { let c = 0; for (let m = 2; m <= t; m++) if (isPrime(m)) c++; return c; } // fine at these sizes
// Phi*(t, q) = #{2 <= m <= t : P^-(m) >= q}  (staircase-note §1)
function phiStar(t, q) {
  let c = 0;
  for (let m = 2; m <= t; m++) if (lpf(m) >= q) c++;
  return c;
}
let failures = 0;
function assertEq(tag, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); }
  return ok;
}
function assertTrue(tag, cond) {
  if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); }
  return cond;
}

// ---------- per-level zone objects, computed BOTH ways ----------
// prime side: in-zone twin-prime openers.  slot side: in-zone tile openers.
function zoneFromPrimes(p) {
  const pp = nextPrime(p), top = pp * pp, openers = [];
  for (let a = p + 1; a + 2 < top; a++) if (isPrime(a) && isPrime(a + 2)) openers.push(a);
  return { p, pp, top, openers };
}
function zoneFromTile(p) {
  const W = primorial(p), pp = nextPrime(p), top = pp * pp, openers = [];
  for (let a = p + 1; a + 2 < top; a++) if (gcd(a, W) === 1 && gcd(a + 2, W) === 1) openers.push(a);
  return { p, pp, top, W, openers };
}
function gapStats(z) {
  const os = z.openers;
  if (os.length === 0) return null;
  const gaps = []; for (let i = 1; i < os.length; i++) gaps.push(os[i] - os[i - 1]);
  return {
    count: os.length,
    head: os[0] - z.p,
    tail: z.top - os[os.length - 1],
    Z2: gaps.length ? Math.max(...gaps) : null,
    sumGaps: gaps.reduce((s, g) => s + g, 0),
    width: z.top - z.p,
    gaps,
  };
}
// full-tile cyclic G2 for small p (openers over [0, W), wrap gap included)
function tileG2(p) {
  const W = primorial(p), os = [];
  for (let r = 0; r < W; r++) if (gcd(r, W) === 1 && gcd((r + 2) % W, W) === 1) os.push(r);
  let g2 = 0;
  for (let i = 1; i < os.length; i++) g2 = Math.max(g2, os[i] - os[i - 1]);
  g2 = Math.max(g2, os[0] + W - os[os.length - 1]); // wrap
  return { W, openers: os, G2: g2 };
}

const LEVELS = [7, 11, 13, 17, 23];          // identity + chain levels
const TILE_LEVELS = [7, 11, 13, 17];         // full-tile scans (W <= 510510)
const G2_LADDER = { 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204 }; // G2-STATE.md §2

// ============================================================================
// CALIBRATION — abort unless the custody anchors reproduce
// ============================================================================
console.log('CALIBRATION (abort on mismatch)');
for (const p of TILE_LEVELS) {
  const t = tileG2(p);
  assertEq(`G2(${p}#) == G2-STATE ladder`, t.G2, G2_LADDER[p]);
  console.log(`  G2(${p}#) = ${t.G2}  (ladder: ${G2_LADDER[p]})  OK`);
}
{ // Z2(11) = 30 = G2(11#)/1.40 per zonegap-01 §5; Z2(13) = 30 (66/2.20)
  const s11 = gapStats(zoneFromPrimes(11)), s13 = gapStats(zoneFromPrimes(13));
  assertEq('Z2(11) == 30 (zonegap-01 §5, G2/Z2 = 1.40)', s11.Z2, 30);
  assertEq('Z2(13) == 30 (zonegap-01 §5, G2/Z2 = 2.20)', s13.Z2, 30);
  console.log(`  Z2(11) = ${s11.Z2}, Z2(13) = ${s13.Z2}  (zonegap-01 ratios 1.40, 2.20)  OK`);
}
console.log('');

// ============================================================================
// SEC A — THE ZONE RESTRICTION LEMMA (Lemma A of the note), verified
//   in-zone tile openers == in-zone twin-prime openers, as SETS; hence
//   Z2/head/tail/gap-multiset computed either way are IDENTICAL. Also the
//   two supporting clauses: (i) holes of T_p in (1, p'] are exactly {p'};
//   (ii) every hole in the zone is prime.
// ============================================================================
console.log('SEC A — ZONE RESTRICTION LEMMA (slot set == prime set, per level)');
for (const p of LEVELS) {
  const zp = zoneFromPrimes(p), zt = zoneFromTile(p);
  const same = assertEq(`openers@${p}`, zt.openers, zp.openers);
  const sp = gapStats(zp), st = gapStats(zt);
  assertEq(`stats@${p}`, { Z2: st.Z2, head: st.head, tail: st.tail }, { Z2: sp.Z2, head: sp.head, tail: sp.tail });
  // clause (i): holes in (1, p'] are exactly {p'}
  const holes = [];
  for (let n = 2; n <= zt.pp; n++) if (gcd(n, zt.W) === 1) holes.push(n);
  assertEq(`first-hole@${p}`, holes, [zt.pp]);
  // clause (ii): every hole in (p, p'^2) is prime
  let allPrime = true;
  for (let n = p + 1; n < zt.top; n++) if (gcd(n, zt.W) === 1 && !isPrime(n)) allPrime = false;
  assertTrue(`holes-prime@${p}`, allPrime);
  console.log(`  p=${p}: ${zp.openers.length} in-zone pairs, sets EQUAL=${same}, ` +
    `Z2=${sp.Z2} head=${sp.head} tail=${sp.tail}, first hole above 1 is p'=${zt.pp}, all zone holes prime`);
}
console.log('');

// ============================================================================
// SEC B — THE CHAIN'S ARITHMETIC, exact at every level
//   width = head + sum(gaps) + tail;  Z2 = max gap <= sum(gaps);
//   occupancy <=> head defined;  >= 2 pairs at every level here.
// ============================================================================
console.log('SEC B — CHAIN ARITHMETIC (width = head + sum gaps + tail, exact)');
for (const p of LEVELS) {
  const s = gapStats(zoneFromPrimes(p));
  assertEq(`partition@${p}`, s.head + s.sumGaps + s.tail, s.width);
  assertTrue(`Z2<=sum@${p}`, s.Z2 <= s.sumGaps);
  assertTrue(`>=2pairs@${p}`, s.count >= 2);
  console.log(`  p=${p}: width ${s.width} = head ${s.head} + sumGaps ${s.sumGaps} + tail ${s.tail};` +
    ` Z2 ${s.Z2} (pairs ${s.count}); head+Z2+tail = ${s.head + s.Z2 + s.tail} ${s.head + s.Z2 + s.tail <= s.width ? '<=' : '>'} width`);
}
console.log('');

// ============================================================================
// SEC C1 — EUCLID-IN-MOIRE AND THE HEAD: the cyclic anchor at opener -1
//   (pair (W-1, W+1), both coprime to W), the head bound
//   head(p) <= G2(p#) - p - 1, and both sides printed.
// ============================================================================
console.log('SEC C1 — EUCLID ANCHOR AND THE HEAD BOUND head <= G2(p#) - p - 1');
for (const p of TILE_LEVELS) {
  const W = primorial(p);
  assertTrue(`edge@${p}`, gcd(W - 1, W) === 1 && gcd(W + 1, W) === 1);
  const s = gapStats(zoneFromPrimes(p));
  const g2 = G2_LADDER[p];
  // cyclic gap from opener -1 (= W-1) to first opener a1 is a1 + 1 = p + head + 1 <= G2
  assertTrue(`headbound@${p}`, s.head + p + 1 <= g2);
  console.log(`  p=${p}: a1 = ${p + s.head}, anchor gap a1+1 = ${s.head + p + 1} <= G2 = ${g2}` +
    `  (head ${s.head} <= G2 - p - 1 = ${g2 - p - 1})`);
}
console.log('');

// ============================================================================
// SEC C2 — MIRROR-SWEEP AND THE ZONE: sigma(a) = W-2-a maps in-zone openers
//   bijectively onto tile openers in (W-p'^2, W-p-2), gap multiset REVERSED
//   (Z2 invariant), the edge W-1 is sigma-fixed with two-sided isolation
//   exactly a1+1 — and certification BREAKS in the image: the image window
//   contains slots with composite members at every level checked.
// ============================================================================
console.log('SEC C2 — MIRROR IMAGE OF THE ZONE (structure transfers, certification breaks)');
for (const p of TILE_LEVELS) {
  const W = primorial(p);
  const z = zoneFromTile(p);
  // image openers, in increasing order
  const img = z.openers.map(a => W - 2 - a).reverse();
  // each image element is a tile opener
  let allOpeners = true;
  for (const b of img) if (!(gcd(b, W) === 1 && gcd(b + 2, W) === 1)) allOpeners = false;
  assertTrue(`img-openers@${p}`, allOpeners);
  // the image is EXACTLY the set of openers in (W - p'^2, W - p - 2)
  const direct = [];
  for (let b = W - z.top + 1; b + 2 < W - p; b++) if (gcd(b, W) === 1 && gcd(b + 2, W) === 1) direct.push(b);
  assertEq(`img-exact@${p}`, direct, img);
  // gap multiset reversed, Z2 invariant
  const gapsZ = [], gapsI = [];
  for (let i = 1; i < z.openers.length; i++) gapsZ.push(z.openers[i] - z.openers[i - 1]);
  for (let i = 1; i < img.length; i++) gapsI.push(img[i] - img[i - 1]);
  assertEq(`img-gaps@${p}`, gapsI, gapsZ.slice().reverse());
  // edge isolation: nearest opener below W-1 is W-2-a1; nearest above (next
  // period) is W + a1; both gaps = a1 + 1
  const a1 = z.openers[0];
  let below = W - 2; while (!(gcd(below, W) === 1 && gcd(below + 2, W) === 1)) below--;
  assertEq(`edge-below@${p}`, below, W - 2 - a1);
  // certification break: composite member in the image window
  let composites = 0, members = 0;
  for (const b of img) {
    for (const m of [b, b + 2]) { members++; if (!isPrime(m)) composites++; }
  }
  assertTrue(`img-composite@${p}`, composites >= 1);
  console.log(`  p=${p}: image window (${W - z.top}, ${W - p - 2}), ${img.length} openers, ` +
    `gaps reversed OK, edge gap both sides ${a1 + 1}; image members composite: ${composites}/${members}`);
}
console.log('');

// ============================================================================
// SEC C3 — THE CAP MACHINERY DEGENERATES IN-ZONE: every strike by a prime
//   q > p on an in-zone slot is a SELF-strike (q in {a, a+2}). So the
//   staircase/unified-cap ledger, restricted to the zone, is the tautology
//   "the zone's slots are its twins" — Cofactor Rigidity's protection
//   radius seen at level p, where it equals the zone frontier.
// ============================================================================
console.log('SEC C3 — SCOUR STRIKES IN-ZONE ARE SELF-STRIKES ONLY (per level)');
for (const p of LEVELS) {
  const z = zoneFromTile(p);
  let strikes = 0, selfStrikes = 0;
  for (let q = p + 1; q < z.top; q++) {
    if (!isPrime(q)) continue;
    for (const a of z.openers) {
      if (a % q === 0 || (a + 2) % q === 0) {
        strikes++;
        if (a === q || a + 2 === q) selfStrikes++;
      }
    }
  }
  assertEq(`self-only@${p}`, strikes, selfStrikes);
  console.log(`  p=${p}: strikes by primes q in (p, p'^2) on in-zone slots: ${strikes}, all self-strikes: ${strikes === selfStrikes}`);
}
console.log('');

// ============================================================================
// SEC C4 — THE ONSET SHELL'S EXACT PER-PRIME FRESH-KILL COUNT IN THE ZONE
//   For q <= p (integer-line frame, natal-onset-01): fresh kills of q in
//   (p, p'^2) are the n = q*m, m >= 2, P^-(m) >= q, i.e.
//     freshZone(q) = Phi*(floor((p'^2 - 1)/q), q) - Phi*(floor(p/q), q),
//   with the PRIME REGIME simplification when q^3 > p'^2 - 1:
//     freshZone(q) = pi(floor((p'^2 - 1)/q)) - pi(q - 1).
//   Verified by brute force at every prime q <= p, three levels.
// ============================================================================
console.log('SEC C4 — PER-PRIME FRESH KILLS IN THE ZONE: formula == brute force');
for (const p of [7, 11, 13]) {
  const z = zoneFromPrimes(p);
  const rows = [];
  for (const q of primesUpTo(p)) {
    // brute force: composite n in zone with lpf(n) = q
    let brute = 0;
    for (let n = p + 1; n < z.top; n++) if (!isPrime(n) && lpf(n) === q) brute++;
    const formula = phiStar(Math.floor((z.top - 1) / q), q) - phiStar(Math.floor(p / q), q);
    assertEq(`fresh@${p},q=${q}`, brute, formula);
    let regime = '';
    if (q * q * q > z.top - 1) { // prime regime
      const pr = pi(Math.floor((z.top - 1) / q)) - pi(q - 1);
      assertEq(`prime-regime@${p},q=${q}`, formula, pr);
      regime = ' [prime regime: q x prime only]';
    }
    rows.push(`q=${q}: ${formula}${regime}`);
  }
  console.log(`  p=${p} zone (${p}, ${z.top}): ${rows.join('; ')}`);
}
console.log('');

// ============================================================================
// SEC D — THE DEEP END, exact. Three statements, sharper than "sparse":
//   (D1) TREAD-FREE TAIL: for every delta <= p'^2 - p^2 - 1, NO prime q has
//        its onset tread q^2 inside the open stretch (p'^2 - delta, p'^2).
//        The last p'^2 - p^2 - 1 (>= 4p + 3) of the zone contains no onset:
//        the deep end sits inside p's own onset shell, influencer set frozen
//        at {q <= p} (GLOSSARY "Onset shell").
//   (D2) STRIDE LEMMA at the frontier tread: the one tread AT the frontier
//        is p'^2 (closed-top convention). For delta <= p' - 3, the primes q
//        with q^2 in the CLOSED stretch (p'^2 - delta, p'^2] are exactly
//        {p'}, and p' strikes exactly {p'^2 - 2, p'^2} there — of which only
//        p'^2 - 2 lies in the zone (open top). So just-onset strikes in the
//        zone's last delta: exactly ONE integer, p'^2 - 2, the B-side natal
//        strike (q^2 mod 30 in {1, 19}, natal-onset-01 §1).
//   (D3) YOUNGEST-ACTIVE COUNT: the youngest active prime, q = p, makes
//        exactly pi(floor((p'^2-1)/p)) - pi(p-1) fresh kills in the WHOLE
//        zone (prime regime, p^3 > p'^2 for p >= 3) — the count of primes in
//        [p, p'^2/p], an interval of length p'^2/p - p ~ 4 + O(1/p) times
//        p/p ... i.e. of length ~(p'^2 - p^2)/p ~ 4: a HANDFUL, measured
//        2..4 at every level to 97.
//   And the binding-gap containment: Z2(p) < p'^2 - p^2 at all five levels
//   here — the measured binding gap FITS inside the tread-free tail.
// ============================================================================
console.log('SEC D — DEEP-END ONSET SPARSITY (every p <= 97)');
{
  let d1 = 0, d2 = 0;
  for (const p of primesUpTo(97)) {
    if (p < 3) continue;
    const pp = nextPrime(p), top = pp * pp;
    // (D1) open-top tread-free tail at maximal depth
    const deltaMax = top - p * p - 1;
    let treads = 0;
    for (let q = 2; q <= pp; q++) if (isPrime(q) && q * q > top - deltaMax && q * q < top) treads++;
    assertEq(`D1-treadfree@p=${p}`, treads, 0);
    assertTrue(`D1-depth@p=${p}`, deltaMax >= 4 * p + 3);
    d1++;
    // (D2) closed-top: every delta <= p' - 3
    for (let delta = 1; delta <= pp - 3; delta++) {
      const lo = top - delta; // closed stretch (lo, top]
      const qs = [];
      for (let q = 2; q <= pp; q++) if (isPrime(q) && q * q > lo && q * q <= top) qs.push(q);
      assertEq(`D2-unique@p=${p},d=${delta}`, qs, [pp]);
      assertTrue(`D2-countbound@p=${p},d=${delta}`, qs.length <= delta / (2 * Math.sqrt(lo)) + 1);
      const struck = [];
      for (let n = lo + 1; n <= top; n++) if (n % pp === 0 || (n + 2) % pp === 0) struck.push(n);
      const expect = [top - 2, top].filter(n => n > lo);
      assertEq(`D2-strikes@p=${p},d=${delta}`, struck, expect);
      d2++;
    }
  }
  console.log(`  (D1) tread-free tail verified at ${d1} levels: no onset in the zone's last p'^2-p^2-1 (>= 4p+3);`);
  console.log(`  (D2) ${d2} (p, delta) cells: just-onset primes in the closed last-delta stretch = {p'} exactly,`);
  console.log('       striking exactly {p\'^2 - 2, p\'^2}; only p\'^2 - 2 is in the zone (open top): ONE integer.');
}
// (D3) youngest-active zone-wide fresh-kill count, exact formula + values
{
  const rows = [];
  for (const p of primesUpTo(97)) {
    if (p < 3) continue;
    const pp = nextPrime(p), top = pp * pp;
    let brute = 0;
    for (let n = p + 1; n < top; n++) if (!isPrime(n) && lpf(n) === p) brute++;
    assertTrue(`D3-primeregime@p=${p}`, p * p * p > top - 1);
    const formula = pi(Math.floor((top - 1) / p)) - pi(p - 1);
    assertEq(`D3-count@p=${p}`, brute, formula);
    rows.push(`${p}:${formula}`);
  }
  console.log(`  (D3) fresh kills of the youngest active prime p over its WHOLE zone (p:count): ${rows.join(' ')}`);
}
// binding-gap containment at the five exact levels
for (const p of LEVELS) {
  const s = gapStats(zoneFromPrimes(p)), pp = nextPrime(p);
  assertTrue(`Z2-in-tail@${p}`, s.Z2 < pp * pp - p * p);
  console.log(`  Z2(${p}) = ${s.Z2} < p'^2 - p^2 = ${pp * pp - p * p}: the binding gap fits inside the tread-free tail`);
}
// the natal-pair channel fact (natal-onset-01 §1) re-asserted for the qs seen:
// q^2 mod 30 in {1, 19} for every scour prime q coprime to 30
{
  let ok = true;
  for (const q of primesUpTo(101)) if (q > 5 && ![1, 19].includes((q * q) % 30)) ok = false;
  assertTrue('D-channel q^2 mod 30 in {1,19}', ok);
  console.log('  and q^2 mod 30 in {1, 19} (closer classes, B-side) for every q <= 101 coprime to 30.');
}
console.log('');

// ============================================================================
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/zonegap-02-reduction.js
//   invocation:  node research/zonegap-02-reduction.js
//   code-sha256: ed74bb89306e24fa61e57a9c6292610e565c12ae4bc3f371f3b6b4125e5462ce
//   out-sha256:  a278320d8bd935c43180a988d714a6eba5eb4b51606037fcc874d10e9a946c39
//   body-lines:  58
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.1 s
// ============================================================================
// CALIBRATION (abort on mismatch)
//   G2(7#) = 30  (ladder: 30)  OK
//   G2(11#) = 42  (ladder: 42)  OK
//   G2(13#) = 66  (ladder: 66)  OK
//   G2(17#) = 108  (ladder: 108)  OK
//   Z2(11) = 30, Z2(13) = 30  (zonegap-01 ratios 1.40, 2.20)  OK
//
// SEC A — ZONE RESTRICTION LEMMA (slot set == prime set, per level)
//   p=7: 8 in-zone pairs, sets EQUAL=true, Z2=30 head=4 tail=14, first hole above 1 is p'=11, all zone holes prime
//   p=11: 9 in-zone pairs, sets EQUAL=true, Z2=30 head=6 tail=20, first hole above 1 is p'=13, all zone holes prime
//   p=13: 16 in-zone pairs, sets EQUAL=true, Z2=30 head=4 tail=8, first hole above 1 is p'=17, all zone holes prime
//   p=17: 17 in-zone pairs, sets EQUAL=true, Z2=36 head=12 tail=14, first hole above 1 is p'=19, all zone holes prime
//   p=23: 29 in-zone pairs, sets EQUAL=true, Z2=150 head=6 tail=14, first hole above 1 is p'=29, all zone holes prime
//
// SEC B — CHAIN ARITHMETIC (width = head + sum gaps + tail, exact)
//   p=7: width 114 = head 4 + sumGaps 96 + tail 14; Z2 30 (pairs 8); head+Z2+tail = 48 <= width
//   p=11: width 158 = head 6 + sumGaps 132 + tail 20; Z2 30 (pairs 9); head+Z2+tail = 56 <= width
//   p=13: width 276 = head 4 + sumGaps 264 + tail 8; Z2 30 (pairs 16); head+Z2+tail = 42 <= width
//   p=17: width 344 = head 12 + sumGaps 318 + tail 14; Z2 36 (pairs 17); head+Z2+tail = 62 <= width
//   p=23: width 818 = head 6 + sumGaps 798 + tail 14; Z2 150 (pairs 29); head+Z2+tail = 170 <= width
//
// SEC C1 — EUCLID ANCHOR AND THE HEAD BOUND head <= G2(p#) - p - 1
//   p=7: a1 = 11, anchor gap a1+1 = 12 <= G2 = 30  (head 4 <= G2 - p - 1 = 22)
//   p=11: a1 = 17, anchor gap a1+1 = 18 <= G2 = 42  (head 6 <= G2 - p - 1 = 30)
//   p=13: a1 = 17, anchor gap a1+1 = 18 <= G2 = 66  (head 4 <= G2 - p - 1 = 52)
//   p=17: a1 = 29, anchor gap a1+1 = 30 <= G2 = 108  (head 12 <= G2 - p - 1 = 90)
//
// SEC C2 — MIRROR IMAGE OF THE ZONE (structure transfers, certification breaks)
//   p=7: image window (89, 201), 8 openers, gaps reversed OK, edge gap both sides 12; image members composite: 1/16
//   p=11: image window (2141, 2297), 9 openers, gaps reversed OK, edge gap both sides 18; image members composite: 8/18
//   p=13: image window (29741, 30015), 16 openers, gaps reversed OK, edge gap both sides 18; image members composite: 17/32
//   p=17: image window (510149, 510491), 17 openers, gaps reversed OK, edge gap both sides 30; image members composite: 21/34
//
// SEC C3 — SCOUR STRIKES IN-ZONE ARE SELF-STRIKES ONLY (per level)
//   p=7: strikes by primes q in (p, p'^2) on in-zone slots: 16, all self-strikes: true
//   p=11: strikes by primes q in (p, p'^2) on in-zone slots: 18, all self-strikes: true
//   p=13: strikes by primes q in (p, p'^2) on in-zone slots: 32, all self-strikes: true
//   p=17: strikes by primes q in (p, p'^2) on in-zone slots: 34, all self-strikes: true
//   p=23: strikes by primes q in (p, p'^2) on in-zone slots: 58, all self-strikes: true
//
// SEC C4 — PER-PRIME FRESH KILLS IN THE ZONE: formula == brute force
//   p=7 zone (7, 121): q=2: 57; q=3: 19; q=5: 7 [prime regime: q x prime only]; q=7: 4 [prime regime: q x prime only]
//   p=11 zone (11, 169): q=2: 79; q=3: 26; q=5: 10; q=7: 6 [prime regime: q x prime only]; q=11: 2 [prime regime: q x prime only]
//   p=13 zone (13, 289): q=2: 138; q=3: 46; q=5: 18; q=7: 10 [prime regime: q x prime only]; q=11: 5 [prime regime: q x prime only]; q=13: 3 [prime regime: q x prime only]
//
// SEC D — DEEP-END ONSET SPARSITY (every p <= 97)
//   (D1) tread-free tail verified at 24 levels: no onset in the zone's last p'^2-p^2-1 (>= 4p+3);
//   (D2) 1084 (p, delta) cells: just-onset primes in the closed last-delta stretch = {p'} exactly,
//        striking exactly {p'^2 - 2, p'^2}; only p'^2 - 2 is in the zone (open top): ONE integer.
//   (D3) fresh kills of the youngest active prime p over its WHOLE zone (p:count): 3:3 5:2 7:4 11:2 13:3 17:2 19:2 23:3 29:2 31:4 37:3 41:2 43:2 47:3 53:3 59:2 61:4 67:3 71:2 73:3 79:2 83:2 89:4 97:3
//   Z2(7) = 30 < p'^2 - p^2 = 72: the binding gap fits inside the tread-free tail
//   Z2(11) = 30 < p'^2 - p^2 = 48: the binding gap fits inside the tread-free tail
//   Z2(13) = 30 < p'^2 - p^2 = 120: the binding gap fits inside the tread-free tail
//   Z2(17) = 36 < p'^2 - p^2 = 72: the binding gap fits inside the tread-free tail
//   Z2(23) = 150 < p'^2 - p^2 = 312: the binding gap fits inside the tread-free tail
//   and q^2 mod 30 in {1, 19} (closer classes, B-side) for every q <= 101 coprime to 30.
//
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// 1. THE ZONE RESTRICTION LEMMA HOLDS EXACTLY (SEC A, five levels): the
//    in-zone twin-slot openers of T_p and the in-zone twin-prime openers are
//    the SAME SET, so Z2/head/tail computed prime-side and slot-side are
//    identical by set equality, under zonegap-01's boundary conventions.
//    Supporting clauses proven and checked: the first hole of T_p above 1 is
//    exactly p', and every hole in (p, p'^2) is prime.
// 2. THE CHAIN'S ARITHMETIC IS AN IDENTITY, NOT AN ESTIMATE (SEC B):
//    width = head + sum(gaps) + tail exactly, Z2 <= sum(gaps), and
//    head + Z2 + tail <= width at every level — the three-term inequality
//    is occupancy-with-two-pairs in gap form, nothing more and nothing
//    less. TPC-strength when quantified over p; the value is that the three
//    pieces have separately measured polylog scales against width ~ p^2.
// 3. EUCLID'S ANCHOR CONVERTS ANY G2 BOUND INTO A HEAD BOUND (SEC C1):
//    the cyclic anchor gap from opener -1 to the first in-zone opener is
//    p + head + 1 <= G2(p#), so head <= G2(p#) - p - 1 — the Gap
//    Reformulation localized to the head slack. Checked at 7..17 with
//    ladder G2; the shortfall of the proven G2 exponent (4.2665 vs 2) is
//    exactly this bound's shortfall.
// 4. THE MIRROR MOVES THE ZONE TO THE CO-EDGE WINDOW AND LOSES
//    CERTIFICATION (SEC C2): sigma(a) = W-2-a maps the zone's openers
//    bijectively, gaps reversed, Z2 invariant, onto the openers of
//    (W-p'^2, W-p-2); the edge W-1 is sigma-fixed with two-sided isolation
//    exactly a1+1; and the image window carries composite-membered slots at
//    every level (1/16 at p=7 rising to 21/34 at p=17): slot structure
//    transfers, primality does not. The mirror is bookkeeping for the zone,
//    not a transfer channel.
// 5. THE CAP MACHINERY IS EMPTY INSIDE THE ZONE (SEC C3): every strike by
//    a prime q > p on an in-zone slot is a self-strike (2 per pair, from
//    the pair's own members) — Cofactor Rigidity's protection radius q1^2-2
//    IS the zone frontier at level p, so the staircase/unified-cap ledger
//    restricted to the zone degenerates to "the zone's slots are its
//    twins", the certification identity again. The floors (36/115/108/1987)
//    certify tile-wide counts with no location and transfer nothing local.
// 6. THE ONSET SHELL'S PER-PRIME ZONE LOAD IS AN EXACT PHI* COUNT (SEC C4):
//    freshZone(q) = Phi*(floor((p'^2-1)/q), q) - Phi*(floor(p/q), q),
//    verified against brute force at every q <= p at three levels, with the
//    prime-regime form pi(floor((p'^2-1)/q)) - pi(q-1) whenever
//    q^3 > p'^2 - 1. The load falls from ~2(p'^2-p)/q-scale for mature q to
//    2..4 fresh kills for q = p itself.
// 7. THE DEEP END IS AN ONSET DESERT, NOT AN ONSET FRONT (SEC D): the
//    zone's last p'^2 - p^2 - 1 >= 4p + 3 contains NO tread (D1, 24
//    levels); the only just-onset activity in the closed last-delta stretch
//    is p' itself striking exactly {p'^2-2, p'^2}, of which ONE integer
//    (p'^2-2) is in the zone (D2, 1084 cells); and the youngest active
//    prime p makes only 2..4 fresh kills in its WHOLE zone (D3, exact
//    formula, 24 levels). The measured deep-end loading of Z2 (zonegap-01
//    §3) is therefore NOT carved by fresh onsets — sparsity is proven, the
//    deep end's gap-friendliness is scale (ln^2 of height) times length
//    share. Z2 < p'^2 - p^2 at all five exact levels: the binding gap fits
//    inside the tread-free tail.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE. Two READINGS figures are CITED, not produced here:
// "4.2665" is the proven two-class exponent (paper/beta2-note.md, quoted via
// ZONE-POSTULATE.md §3); "115" is the @13 unified floor at K = 0
// (research/history/staging/attack-anchored-01.md HEADLINE table). Both
// appear only in the transfer-inventory readings (3, 5), which are about
// those artifacts' statements; nothing in this producer recomputes them
// (standing compute rule).
// ---------------------------------------------------------------------------
