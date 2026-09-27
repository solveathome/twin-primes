#!/usr/bin/env node
'use strict';
// ============================================================================
// QC / UNITS — the confusable quantities, computed with their units attached
// ============================================================================
// Run it:  node research/qc/units.js
//
// WHY THIS EXISTS, and it is not a style tool.
//
// On 2026-08-18 the adjudicator made eight errors in one session. Every one was
// a unit, scale, quantifier or configuration slip. NOT ONE was arithmetic. None
// was caught by re-reading; all eight were caught by an agent re-deriving, by
// the gate, or by recomputing from scratch.
//
// The decisive fact is WHERE they lived:
//
//   #  error                              layer                 gate could see it?
//   1  log(v^2#) ~ 2v                     agent brief           no
//   2  "capacity vacuous by 10x"          agent brief           no
//   3  "exponent 2 is TPC-equivalent"     chat + brief          partly
//   4  "anchored 3-4 orders below global" chat                  no
//   5  counting bound 120                 chat                  no
//   6  two broken relative paths          TODO.md               YES, caught in seconds
//   7  K-K "fixed pair for every p"       covering-dive.md      semantic, no
//   8  localized-04 default-vs-recorded   shell + chat          no
//
// SIX OF EIGHT NEVER ENTERED THE CORPUS. The gate is not the weak point; the
// corpus is well defended. What is undefended is the layer where briefs and
// arguments are written, and the two errors that did the most damage (1 and 2)
// were prose in a brief that ten agents read simultaneously.
//
// So this file is not a check. It is the thing you RUN BEFORE WRITING A BRIEF,
// so that the numbers in the brief are quoted from output instead of composed
// from memory. Every quantity below is computed from first principles here, and
// each one that has actually caused an error carries the wrong value beside the
// right one, the way audit-numbers.js carries retired values.
//
// THE STANDING RULE THIS FILE SERVES:
//   A number in an agent brief carries the same custody as a number in the
//   corpus. Cite a script, cite a file:line, or compute it in the same turn.
//   Prose from memory is not custody, and it propagates to every agent at once.
// ============================================================================

const f = (v, d = 4) => Number.isFinite(v) ? v.toFixed(d) : String(v);
let bad = 0;
function assert(label, got, want, tol) {
  const ok = typeof want === 'number' ? Math.abs(got - want) <= (tol ?? 1e-9)
                                      : String(got) === String(want);
  if (!ok) bad++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${label}\n          got ${got}   want ${want}`);
}
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}

console.log('='.repeat(76));
console.log('1. LOG OF A PRIMORIAL.  theta(x) = log(x#) ~ x.  NOT ln x, NOT 2*theta(v).');
console.log('='.repeat(76));
console.log('  v   theta(v)   theta(v^2)=log(v^2#)   "2v" (WRONG)   error factor');
for (const v of [5, 11, 31, 101, 331, 997]) {
  let tv = 0, tv2 = 0;
  for (const p of primesUpTo(v * v)) { tv2 += Math.log(p); if (p <= v) tv += Math.log(p); }
  console.log(`  ${String(v).padStart(4)}  ${f(tv, 2).padStart(8)}  ${f(tv2, 1).padStart(20)}  ${String(2 * v).padStart(12)}  ${f(tv2 / (2 * v), 1).padStart(11)}x`);
}
console.log('\n  RETIRED 2026-08-18: a brief read by ten agents said log(v^2#) ~ 2v.');
console.log('  v^2# is the primorial of v^2, so its log is theta(v^2) ~ v^2. The slip was');
console.log('  reading v^2# as (v#)^2. Error grows without bound: 498x by v = 997.');

console.log('\n' + '='.repeat(76));
console.log('2. SLOTS vs INTEGERS.  The single most expensive confusion in this corpus.');
console.log('='.repeat(76));
console.log('  A twin slot occurs once per mbar integers, so a count of INTEGERS and a');
console.log('  count of SLOTS differ by the factor mbar and are never comparable raw.');
console.log('  x    D_x              mbar = x#/D_x    2.4026*ln^2 x   slots per 1000 int');
let W = 1n, D = 1n;
for (const p of primesUpTo(41)) {
  W *= BigInt(p); if (p >= 3) D *= BigInt(p - 2);
  if (![5, 11, 23, 41].includes(p)) continue;
  const mbar = Number(W) / Number(D);
  console.log(`  ${String(p).padStart(2)}   ${String(D).padStart(15)}  ${f(mbar, 3).padStart(14)}  ${f(2.402607 * Math.log(p) ** 2, 3).padStart(13)}  ${f(1000 / mbar, 1).padStart(18)}`);
}
{
  // The actual error, reconstructed. Block v=5: primes 7..23 over T_5, span 180.
  const P = [7, 11, 13, 17, 19, 23], span = 180, mbar5 = 10;
  let capInt = 0; for (const p of P) capInt += 2 * (span / p + 1);
  const capSlot = capInt / mbar5;
  console.log(`\n  Block v=5, run of 19 slots spanning ${span} integers:`);
  console.log(`    capacity in INTEGERS ......... ${f(capInt, 1)}   <- what the brief quoted`);
  console.log(`    capacity in SLOTS (correct) .. ${f(capSlot, 2)}   against 19 slots needed`);
  console.log('    The brief said "capacity exceeds need by 10x, so counting is vacuous".');
  console.log('    In matched units capacity is BELOW the need: counting is BINDING.');
  console.log('    Three separate agents found this independently.');
  console.log('    Correct bound: L <= 62, recomputed 2026-08-18 (block-L-first-dead.js).');
  console.log('    This line read "L <= 111" until then. 111 is the LAST-ALIVE l; the');
  console.log('    bound is FIRST-DEAD minus one, because coverability is downward');
  console.log('    closed -- restrict a cover of [1,L\'] to [1,L] and it still covers.');
  console.log('    What IS non-monotone is the greedy SEARCH, not feasibility, and');
  console.log('    conflating the two is what put 111 here. 111 is true and 1.79x weak.');
  assert('slots/integers conversion at T_5 is mbar = 10', mbar5, 10);
}

console.log('\n' + '='.repeat(76));
console.log('3. WINDOW CONVENTION.  x^2 and x\'^2 are different denominators.');
console.log('='.repeat(76));
console.log('  x    x^2      next prime x\'   x\'^2     ratio x\'^2/x^2');
for (const x of [11, 23, 37, 41]) {
  const xp = primesUpTo(4 * x).find(q => q > x);
  console.log(`  ${String(x).padStart(2)}   ${String(x * x).padStart(6)}   ${String(xp).padStart(12)}   ${String(xp * xp).padStart(7)}   ${f(xp * xp / (x * x), 4).padStart(14)}`);
}
console.log('\n  Measured 2026-08-18: swapping x^2 for x\'^2 in the falling-ratio fit FLIPS');
console.log('  THE SIGN of the slope, +0.130 against -0.069. The artifact is exactly');
console.log('  2(1-0.9004) = 0.199, which is 1.7x the honest band. Never mix them.');

console.log('\n' + '='.repeat(76));
console.log('4. THE FOUR GAP OBJECTS.  G2, g, h2 and Y2 are not interchangeable.');
console.log('='.repeat(76));
console.log('  g(x#)   one class {a_p} per prime .......... Jacobsthal, OEIS A048670');
console.log('  G2(x#)  classes {a_p, a_p-2} ............... ours, NOT in OEIS');
console.log('  h2(x#)  worst case over ALL even offsets ... Ziller-Morack, A288815');
console.log('  Y2(x)   best CONSTRUCTION found ............ a LOWER bound on G2-1');
console.log('  Ordering, all proven pointwise:  Y2 <= G2-1 < G2 <= h2,  and  G2 >= g.');
console.log('\n  A LOWER BOUND CAN NEVER ESTABLISH A FALLING RATIO. Pooling the four Y2');
console.log('  levels with the exact G2 terms moves the fitted slope by 0.428 = 5.7 se,');
console.log('  manufacturing a spurious "14.7 sigma FALLS". The adjudicator did exactly');
console.log('  that on 2026-08-18 when quoting the Y2 curve as evidence.');

console.log('\n' + '='.repeat(76));
console.log('5. THE TWO FORMULATIONS OF {0, -2}.  Same symbols, opposite freedom.');
console.log('='.repeat(76));
console.log('  SIEVE form:    p kills n = 0 or -2 (mod p). The pair is FIXED for every p.');
console.log('  COVERING form: choose {a_p, a_p-2} per prime. The pair is a FREE TRANSLATE;');
console.log('                 CRT makes (a_p)_p run over all of prod Z/pZ.');
console.log('                 PROVEN at two-class-lower-bounds.md section 1.');
console.log('\n  These describe the same object in opposite roles, and using one to reason');
console.log('  about the other produced error 7: a published construction was dismissed');
console.log('  on the grounds that "our pair is fixed", which is true of the sieve form');
console.log('  and false of the covering form the construction lives in.');

console.log('\n' + '='.repeat(76));
console.log('6. STRENGTH QUALIFIERS.  o() and O() are different claims.');
console.log('='.repeat(76));
console.log('  G2 = o((log q)^2)  ==> TPC.  FORBIDDEN as a target.');
console.log('  G2 = O((log q)^2)  with a constant above threshold: LEGAL and OPEN.');
console.log('  covering-dive.md says "with the right constant"; a brief dropped those');
console.log('  four words and turned a legal target into a forbidden one (error 3).');

console.log('\n' + '='.repeat(76));
console.log('7. INVOCATION.  An argument-driven script has no single "the output".');
console.log('='.repeat(76));
console.log('  localized-04-maxsum.js records TWO specific invocations. A bare run uses');
console.log('  defaults and matches neither. Comparing a default run against a recorded');
console.log('  explicit run made 213 of 224 lines "not found" and looked like a total');
console.log('  reproduction failure; matched invocation reproduces every digit (error 8).');
console.log('  RULE: when comparing a run to a record, state the invocation on both sides.');

console.log('\n' + '='.repeat(76));
console.log(bad === 0 ? 'self-assertions: all passed.' : `self-assertions: ${bad} FAILED.`);
console.log('='.repeat(76));
process.exit(bad ? 1 : 0);
