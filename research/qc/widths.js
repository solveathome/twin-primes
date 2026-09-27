// ============================================================================
// QC / WIDTHS — the two-line runtime guard for fixed-width containers
// ============================================================================
// A script that stores a value in a container narrower than the value can be
// does not fail. It succeeds, quietly, with a different number. This module is
// the cheap way to make that failure LOUD, and loudness is the whole point:
//
//   2026-08-19  a residue bitmask built with `1 << r` aliased for q > 32,
//               because JS `<<` wraps the shift count mod 32. SILENT.
//               Corrupted a3-03's census from x = 37 up.
//   2026-08-21  la/lb were Uint16Array holding INDICES into a scour-prime list
//               of size K. K = 37,534 at @31 (fits), 198,274 at @37 (does not).
//               Two thirds of the primes read back wrong, the measured
//               quantity came out 18% low, and it read as a clean refutation
//               of a pre-registered law. SILENT. Cost: five hours and a false
//               refutation.
//   2026-08-21  the divisor-list capacity LC = 7, exceeded at @37. THREW.
//               Cost: one dead run, fixed in minutes.
//
// Same class, same day, orders of magnitude apart in cost, and the only
// difference between the second and the third is that one truncated and the
// other threw. So: prefer a loud throw to a silent truncation.
//
// USAGE — two lines, at the top of the routine that fills the store:
//
//   const W = require('./qc/widths');
//   W.assertFits('la/lb scour index', K, Uint32Array, `@${x}`);
//
// and for a hand-rolled capacity rather than a typed array:
//
//   W.assertCapacity('divisor list per side', maxDivisors, LC, `@${x}`);
//
// AUDIT THE LEVEL YOU ARE ABOUT TO RUN, NOT THE LEVEL YOU LAST RAN. Both silent
// incidents were containers that were correct at @31 and wrong at @37. The
// guard takes the level as an argument for exactly that reason: the message a
// reader gets has to name the run that broke it.
// ============================================================================

'use strict';

// Inclusive maxima. A store of `cap` is fine; `cap + 1` is the aliasing case.
const CAPS = new Map([
  [Uint8Array, 0xFF], [Uint8ClampedArray, 0xFF], [Int8Array, 0x7F],
  [Uint16Array, 0xFFFF], [Int16Array, 0x7FFF],
  [Uint32Array, 0xFFFFFFFF], [Int32Array, 0x7FFFFFFF],
  // Float64Array holds every integer below 2^53 exactly and no integer above it.
  [Float64Array, Number.MAX_SAFE_INTEGER], [Float32Array, 0xFFFFFF],
]);

/** Inclusive maximum an element of `Ctor` can hold without aliasing. */
function capOf(Ctor) {
  const c = CAPS.get(Ctor);
  if (c === undefined) throw new Error(`widths: no capacity known for ${Ctor && Ctor.name}`);
  return c;
}

/**
 * The guard. `maxValue` is the LARGEST value this store will be asked to hold
 * at this level -- an array length, a prime, a count -- not a sample of it.
 * Throws naming the level, because a container that was right at the last level
 * is not evidence about this one.
 */
function assertFits(what, maxValue, Ctor, level) {
  const cap = capOf(Ctor);
  if (!Number.isFinite(maxValue) || maxValue < 0 || maxValue > cap)
    throw new Error(
      `widths: ${what} reaches ${maxValue} at ${level}, and ${Ctor.name} holds at most ${cap}. `
      + `Widen the container; storing it here would alias silently and every COUNT identity `
      + `in this script would still pass.`);
  return maxValue;
}

/** The same guard for a hardcoded capacity used as an array stride (the LC = 7 shape). */
function assertCapacity(what, observed, capacity, level) {
  if (!(observed <= capacity))
    throw new Error(
      `widths: ${what} reaches ${observed} at ${level}, and the hardcoded capacity is ${capacity}. `
      + `Raise the capacity; truncating here loses entries without changing any count.`);
  return observed;
}

/**
 * A bit position must be 0..30 for `1 << b` to mean what it reads as: JS takes
 * the shift count mod 32 and works in int32, so `1 << 37` is `1 << 5` and
 * `1 << 31` is negative. This is the 2026-08-19 shape.
 */
function assertBitIndex(what, bit, level) {
  if (!Number.isInteger(bit) || bit < 0 || bit > 30)
    throw new Error(
      `widths: ${what} is bit ${bit} at ${level}, and JS shifts take the count mod 32 in int32. `
      + `Use a Uint8Array/BigInt mask; \`1 << ${bit}\` silently means \`1 << ${((bit % 32) + 32) % 32}\`.`);
  return bit;
}

/** Integer arithmetic above 2^53 stops being exact without saying so. */
function assertExactInteger(what, value, level) {
  if (!Number.isSafeInteger(value))
    throw new Error(
      `widths: ${what} is ${value} at ${level}, past 2^53, where Number arithmetic stops being exact. `
      + `Use BigInt, or carry the logarithm.`);
  return value;
}

module.exports = { CAPS, capOf, assertFits, assertCapacity, assertBitIndex, assertExactInteger };
