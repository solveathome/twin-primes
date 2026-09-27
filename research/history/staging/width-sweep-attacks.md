# Width sweep, the attack/analysis family: no live corruption, one hazard that is the census bug waiting at @37

<!-- ledger
id: Q-width-sweep-attacks
status: ANSWERED
todo: none
question: Does the attack and analysis script family carry the fixed-width-container defect class that corrupted the @37 census?
verdict: No live corruption across 123 scripts, every stored value derived at the level actually invoked and fitting its container; one hazard is serious, attack-x-offset-02-profile.js storing an index into the scour-prime array in a Uint16Array, the identical mechanism in the identical role as the census defect fixed at 605ce83, and it fires at @37.
-->

**Verdict, before anything else. 123 scripts in the attack/analysis partition
were swept for the defect class "a fixed-width container that is safe at every
level ever run and aliases silently above a threshold". Nothing in the partition
is CORRUPT at its embedded run level: every stored value was derived as a
function of the level actually invoked and every one fits its container. One
finding is serious. `attack-x-offset-02-profile.js` stores the INDEX into the
scour-prime array `qs` in a `Uint16Array` — the identical mechanism, in the
identical role, as the `xchan-at37-01-census.js` defect fixed at `605ce83`. At
the deepest embedded level @31 the index runs to 37533 against a cap of 65535,
a margin of 1.75x. At @37 that index is 198273 and the array would alias mod
65536. The file's own conclusions name @37 as the next separation, so this is a
loaded trap rather than a theoretical one. It is presently masked by an
unrelated LOUD guard that throws first at @37; remove or relax that guard and
the silent alias is immediately behind it.**

*2026-08-21. Diagnostic pass only. No script and no corpus document was edited.
Method per script: (a) enumerate every fixed-width store, (b) derive the maximum
of what it holds as a function of level or range, (c) read the embedded
invocation and OUTPUT tail for the level ACTUALLY run, (d) verdict. The
invocation line of all 123 files was extracted mechanically. 111 carry an
embedded OUTPUT banner; 100 of those invoke with no argument at all, so the
file's own constants ARE the run level, and the other 11 pass a level or a mode
(`attack-0c-holesweep-01.js 37`, `attack-0c0e-01-deleted-family.js 29`,
`attack-0c0e-02-level-selection.js 3e7`, `attack-foldL-03-transport.js 23`,
`import-maxplus-01-mapping.js 23`, `import-suen-01-transfer.js 11,...,31`,
`theta-ladder-sup.js 23 --fixed-point --band=80`,
`attack-beta2-05-covering-prune.js --full`, `attack-frontier37-01-word.js full`,
`attack-frontier37-02-transport.js full`, `BIG=1 ... import-bfree-01-toeplitz.js`),
each of which was read. Legend: **CLEAN** (arithmetic shown), **CORRUPT**, **LOUD**
(a guard throws, therefore benign), **HAZARD** (safe now, aliases at a named
level X).*

---

## 1. The one that matters: `attack-x-offset-02-profile.js`

The store is `la` and `lb`, `new Uint16Array(LC*MS)` at line 158, written at
line 209:

```
if(A[idx]){const c=a[idx]++;if(c<LC)la[LC*idx+c]=m;if(isNatal)nL[m]++;}
```

`m` is the loop index over `qs`, the scour primes with x < q <= sqrt(W). It is
an index into a prime array, not a count and not a residue, which is exactly
what the census stored and exactly why the census's count identities stayed
PASS through the corruption. The value read back at line 224 (`ia[i]=la[base+i]`)
is then used to look up `qv[ia[i]]`, so an aliased index silently reads the
WRONG PRIME while every tally of how many primes there were stays correct.

| level | W = x# | K = qs.length | max index stored | cap | margin |
|---|---|---|---|---|---|
| @19 | 9699690 | 435 | 434 | 65535 | 151x |
| @23 | 223092870 | 1739 | 1738 | 65535 | 38x |
| @29 | 6469693230 | 7863 | 7862 | 65535 | 8.3x |
| @31 | 200560490130 | 37534 | **37533** | 65535 | **1.75x** |
| @37 | 7420738134810 | 198274 | 198273 | 65535 | **ALIASES** |

K at @19..@31 is read straight off the embedded OUTPUT header lines 355, 414,
475, 536; the default `LEVELS` at line 274 is `[19,23,29,31]`. K = 198274 at @37
is the same figure recorded for the census defect.

**Verdict: HAZARD, fires at @37.** Currently masked: line 105 carries
`if(W*2**(NQ-1)>=2**53)throw`, and with `NQ = 12` at @37 that test is
7.42e12 * 2^11 = 1.52e16 >= 9.007e15, so the run dies loudly before reaching
the sieve. The masking is accidental, not designed. Anyone who lowers `NQ` to
get @37 to run, or who raises `NQ` without touching `la`, gets the census bug
back with no error and no failing identity.

Two other stores in the same file, both CLEAN and worth recording because they
show the file's author was thinking about this class:

- `LC = 7` at line 152, the per-slot divisor-list capacity — the same name and
  the same value as census defect #3. Here it is **LOUD**: line 220 throws
  ``divisor list capacity ${LC} exceeded`` whenever `av >= LC || bv >= LC`. It
  did not fire in the embedded run.
- `a`, `b` = `Uint8Array(MS)` at line 157, incremented at line 209. These hold
  the per-slot count of scour primes, which the LC guard caps at 7 long before
  the byte could wrap at 256. CLEAN, 36x below the guard.
- `binOf` = `Uint8Array(K)` holding a bin index clamped to `NB - 1` with
  `NB = 8`. CLEAN, 32x.

---

## 2. The other hazards, with the level each fires at

| script | store | holds | max at run level | cap | verdict | fires at |
|---|---|---|---|---|---|---|
| `attack-x-offset-02-profile.js` | `la,lb` `Uint16Array` | index into `qs` | 37533 @31 | 65535 | **HAZARD** | **@37 (K = 198274)** |
| `attack-beta2-04-loss-budget.js` | `1 << n`, n = pi(x) | subset mask bound | n = 22 (x = 79) | shift < 32 | HAZARD | x >= 127 (pi = 31) |
| `attack-advmin-1113.js` | `keys[m]=(c<<12)\|a` | pack of coverage + class | c <= 990, a <= 172 | a < 4096 | HAZARD | @23 (max scour q = 14929) |
| `attack-foldL-04-genealogy.js` | `nbirth` `Uint8Array` | the fold PRIME p | 29 | 255 | HAZARD | fold prime p >= 257 |
| `attack-foldL-04-localized.js` | `nxt,prv` `Int32Array(M)` | slot index | M = 3.33e8 (WIN 2e9) | 2^31 | HAZARD | WIN ~ 1.29e10 |
| `attack-foldL-04-localized.js` | `key,birth` `Uint16Array` | the fold prime q | 1499 (QMAX env) | 65535 | HAZARD | QMAX >= 65536 |
| `attack-foldL-01-census.js` | `hist` `Int32Array(4096)` | index g/6 | 285 (G2 = 1710 @79) | 4095 | HAZARD | G2 > 24570 |
| `attack2-rankin2d.js` | `cover` `Int8Array(m+2)` | overlap count | <= 22 (11 primes) | 127 signed | CLEAN | > 63 primes |

Notes on the four that are not self-explanatory.

**`attack-beta2-04-loss-budget.js`.** `divisorProfile` (line 348) and
`levelOptimum` (line 692) both build a full subset mask with `const total =
1 << n`, n = `primesTo(x).length`. `ALLP` (line 54) stops at x = 79, so n <= 22
and `1 << 22` = 4194304 is an ordinary positive int32. At pi(x) = 31 the
expression is -2147483648, the loop `mask < total` never executes, `bins` comes
back all zero and nothing throws. The first x that does it is 127. This is a
real trap for anyone extending the ladder past 79, which is exactly what the
A144311 note contemplates. `Int16Array(PP)` at line 497 is CLEAN by a different
argument: `m[r]` accumulates one +/-1 per divisor in `use` and `|use| <= 256`
for x <= 19, against a cap of 32767, so 128x.

**`attack-advmin-1113.js`.** Everything at @11/@13 is CLEAN with arithmetic. The
bitsets are the correct idiom throughout: `words = (n+31) >> 5` and
`b[a*words + (s>>5)] |= (1 << (s & 31))` mask the shift count explicitly, so no
mod-32 exposure at any n. `Int32Array(n*2*P)` with n = 990, P = 34 is 67320
entries. The node counters are Numbers with a LOUD guard at line 392,
`if (nodes >= 9e15) throw new Error('node counter nearing 2^53')`, and the
largest recorded run is 1.6e9. The one hardcoded width is the 12-bit `a` field
in `keys[m++] = (c << 12) | a` at line 435, recovered as `key & 4095`. The
comment says `c<=990, a<173: exact pack` and it is; the field would first
overflow at @23, where the largest scour prime is 14929, four times the field.
Nothing in the paper goes there, but the constant is not derived from the level.

**`attack-foldL-04-genealogy.js`.** `nbirth[out] = p` puts a prime in a byte,
and `nari[out] = cnt` puts a merge arity in a byte. Both are CLEAN at the
levels run: `FOLDS` ends at 29, and the embedded tail's own table gives
`Lphys = 2` at fold 29 with a maximum of 3 over the whole ladder, so the arity
never exceeds 4 against a cap of 255. `ngap` is `Uint16Array` holding the merged
gap, whose maximum is G2(29#) = 258 against 65535, a 254x margin, and the tail
confirms G2 = 258. `nsrc` is `Uint32Array` holding a slot index; at fold 29
N = 214708725, 20x under 2^32. Fold 31 would need 6.23e9 and would alias, but
line 165 says explicitly that fold 31 is statistics-only and no tile is built,
and READING 8 confirms it. The exposure is the byte holding a prime: this ladder
cannot be pushed past p = 251 without silently rewriting every birth record.

**`attack-foldL-01-census.js`.** `hist = new Int32Array(4096)` is indexed
`hist[g/6]` where g is a gap. An index at or above 4096 is an out-of-bounds
typed-array write, which JavaScript DISCARDS silently rather than throwing, so
the failure mode is a histogram that quietly loses its own tail. It needs
g >= 24576. The largest G2 anywhere in the corpus is 1710 at x = 79, index 285.
Wide margin, but the container is a bare literal with no relation to the data.

---

## 3. LOUD guards found, and one that should be the house pattern

These throw. They are benign by definition, and they are the reason several
files in this partition are safe by design rather than by luck.

| script | guard | what it protects |
|---|---|---|
| `attack-theta-margin.js:200` | `if(ps.length>64) throw` | the two-word smooth-number mask |
| `attack-x-offset-02-profile.js:220` | `divisor list capacity ${LC} exceeded` | `LC = 7` per-slot list |
| `attack-x-offset-02-profile.js:105` | `if(W*2**(NQ-1)>=2**53) throw` | the octave table |
| `attack-x-offset-01-terms.js` | `2**53` check | same family |
| `attack-0c-holesweep-01.js:483` | `if (W31 >= 2 ** 53) throw` | streamed 29/31/37 window |
| `attack-tau-repricing.js` | `2**53` check | modulus products |
| `attack-advmin-1113.js:392` | `if (nodes >= 9e15) throw` | the node counter |
| `import-talagrand-01-price-c.js:123` | ``comb gap ${g} exceeds Uint16 at x=${x}`` | `gaps = Uint16Array(sab)` |
| `attack-foldL-06-scaling.js:106` | `if (A % 6 !== 0) throw` | anchor residue class |
| `sift-limit-attack.js:88` | pointwise sandwich throw | the Selberg minorant |
| `attack-advmin-1113.js:631` | head bound exceeding the exact optimum | instrument defect |

`attack-theta-margin.js` is the one to copy. Line 195 onwards:

```
// Executable, not prose. The smooth-number mask below is a two-word (l, h)
// pair, so it is faithful to 64 primes and no further. z = 307 uses 61 odd
// primes; the next natural row of this roughly geometric ladder, z = 331,
// uses 65 and would alias silently. natal-cap-34-wrap-precision.js:164 is the
// pattern. (2026-08-20.)
if(ps.length>64) throw new Error(`z=${z} needs ${ps.length} odd primes; ...`);
```

The mask itself is split correctly, `j<32?(l|(1<<j)):l, j>=32?(h|(1<<(j-32))):h`,
the comment names the defect class, cites a prior instance by file and line,
names the exact next ladder row that would break it, and the guard makes the
break loud. That is the whole remedy for this defect class in five lines. Every
HAZARD in section 2 is a place where that pattern is missing.

## 4. CLEAN, with the arithmetic

The bulk of the partition. The recurring idioms and why each is safe:

- **`comp`/`s`/`c` = `Uint8Array(n+1)` sieve flags.** Every file has one. Values
  are 0 or 1. CLEAN unconditionally, and for a large majority of the partition
  it is the only fixed-width store in the file.
- **`key = new Uint16Array(csize)` holding the fold prime q.** Nine files share
  this: `attack-foldL-06-scaling`, `attack-mp-derive-02-anchor`,
  `attack-l1-residue-01-middleband` (twice), `attack-perfold-02-blindwindow`,
  `import-stein-01-multikill`, `import-thinning-01-nullmodel`,
  `import-thinning-03-deepfolds`, `attack-foldL-04-localized`. Every one caps at
  `QMAX = 1499` or `1500`, hardcoded except in `attack-foldL-04-localized` where
  it is an env override defaulting to 1500. q <= 1499 against 65535 is a 44x
  margin. CLEAN. `import-thinning-01-nullmodel.js:371` uses 65535 itself as the
  "survives every fold" sentinel, which is sound only while QMAX < 65535.
- **The fold-tile chain, `Float64Array` slots.** `attack-0c-holesweep-01`,
  `attack-0c0e-01`, `import-bridge-01/02`, `attack-foldL-02/03/05`,
  `import-maxplus-01/02`, `import-chaining-01/02`. Slots hold integers below
  W = x#. The deepest in-memory tile anywhere in the partition is T_23,
  W = 223092870, and the deepest streamed window is W31 = 40112098026. Both are
  exact in Float64 (2^53 = 9.007e15) with margins of 4e7x and 2.2e5x. The
  streamed 29/31/37 levels in `attack-0c-holesweep-01` are guarded at 2^53
  explicitly. `import-bridge-01/02` stop at LEVELS = 23; the "exact integer sum
  of squares" in `apCounts` is at most D^2/q = 1.26e13 at q = 5, 700x under
  2^53. CLEAN.
- **Gap stores in `Uint16Array`.** `import-thinning-01/02` `out[o++] = acc`
  where acc is a merged gap; the maximum gap in T_x is G2(x#), which is 258 at
  the deepest ORDER entry 29 and 1710 at the ladder's end x = 79. Against 65535
  that is 254x and 38x. CLEAN.
- **Bitset word arithmetic.** `attack-ab-coupling-01/02`
  (`M[u*W + (i>>>5)] |= (1 << (i & 31))`), `attack-advmin-1113`,
  `localized-04-maxsum` (`W[j>>>5] &= ~(1 << (j & 31))`),
  `attack-frontier37-01` (`ring[n & 255]`), `attack-0c-holesweep-01`
  (`buf[cnt & MASK]`, MASK a power of two minus one). All mask the shift count
  or the index explicitly. Power-of-two masks under ToInt32 are exact for any
  operand below 2^53, so the ring buffers are correct at any counter value.
  CLEAN unconditionally.
- **Subset-mask enumerations `1 << n`.** Resolved n for every site:
  `adversary-wave2-03-shearer` n <= 8; `import-shearer-01-region` n <= 8 for the
  complete graph and 16 for the two-class graph; `attack-ab-coupling-01/02`
  n = |BLOCK1| = 6; `attack-L-subadditivity` n = |POOL| = 9; `attack-hm-basis`
  n = omega(q) <= 9; `attack-tau-repricing` n = omega(e); `attack-beta2-A-B-bounded`
  n = omega(m). All two orders below 32. CLEAN. `attack-tau-repricing:614` uses
  `Math.pow(2, maxOmega(M))` rather than a shift precisely where the exponent
  can exceed 31, which is the right call.
- **`Int8Array` overlap counters.** `attack2-rankin2d` `cover[pos]++` with at
  most 2 classes per prime and at most 11 primes (n <= 13 with `--deep`), so
  <= 22 against a signed cap of 127. CLEAN, 5.8x. The heuristic path uses
  `Int16Array` for the same role, an asymmetry worth noticing but not a defect.
- **`Int8Array` Mobius.** `import-bridge-02-experiment:218` holds values in
  {-1,0,1}. CLEAN.
- **Sign-sum accumulators.** `sift-limit-attack` and `sift-limit-lemmaV`
  `Int16Array(L)`, `attack-tail-maximal` `Int32Array(Lz)`: `A[n] += sg` sums one
  term per divisor of n in the support, bounded by d(n) <= 240 for n < 8e6.
  CLEAN, 136x on the Int16.
- **`Uint32Array` position and count stores.** `attack-theta-margin` `w[n]=tot`
  with tot <= DP*DM = 70400; `attack2-05-07-integral-ladder` `spf[i]=p`;
  `attack-lower-bound` `spf`. All far below 2^32. CLEAN.

---

## 5. Coverage

**123 of 123 files in the assigned partition were reached**, that is every
`research/attack-*.js`, `research/0*.js`, `research/rho-maxlaw-*.js`,
`research/theta-ladder*.js`, `research/sift-limit-*.js`,
`research/localized-*.js`, `research/h2-*.js`, `research/attack2-*.js`,
`research/adversary-wave2-*.js`, `research/import-*.js` except
`import-stein-02-strikes.js` (a sibling auditor's), plus
`external-ladders-01.js`, `a144311-full-ladder.js`, `a060256-seam-ladder.js`
and `a113274-gap-records.js`.

Every file was put through four mechanical sweeps, each of which enumerates
sites and extracts the surrounding write statements rather than merely counting
occurrences:

1. **Narrow containers.** Every `new Uint8Array` / `Int8Array` / `Uint16Array` /
   `Int16Array` binding, paired with every indexed write to that name. 80 of
   the 123 files have at least one. After discarding pure 0/1 sieve and coverage
   flags, 22 files carry a narrow store holding a residue, a prime, a gap, a
   depth, a count or an index; those 35 stores were each resolved by hand.
2. **32-bit containers.** The same extraction for `Int32Array` / `Uint32Array`;
   52 files have one. Resolved by hand wherever the stored quantity was a
   position, an index or a product in a range at or above 2e9.
3. **Bit operators.** Every `<<`, `>>`, `>>>`, `&`, `~` in code (comment and
   embedded-OUTPUT lines stripped, since the OUTPUT blocks are full of markdown
   table pipes that defeat a naive grep). Every `1 << var` site had its maximum
   shift count resolved from the calling constants.
4. **The 2^53 line.** Every numeric literal at or above 1e13 appearing on a code
   line, plus every `2**53` / `MAX_SAFE_INTEGER` guard.

Prioritisation was by embedded run scale, as instructed: files whose tails show
ranges at or above 1e8, primorial levels at or above 29, or large prime counts
were done first. That set is `attack-x-offset-02-profile` (@31, K = 37534),
`attack-foldL-04-genealogy` (fold 29, N = 2.1e8), `attack-foldL-04-localized`
(WIN 2e9, M = 3.3e8), `attack-foldL-06-scaling` and
`attack-mp-derive-02-anchor` and `attack-perfold-02-blindwindow` and
`import-stein-01-multikill` (BIGY 2e10), `import-thinning-01/02/03`
(WINY 2e9, ORDER to 29), `attack-0c-holesweep-01` (@37 streamed),
`attack-frontier37-01/02` (@37), `attack-l1-residue-01-middleband` (BIGY 2e10),
`attack-theta-margin` (N = 2e7, z = 307), `import-bridge-01/02` (@23),
`attack-beta2-04-loss-budget` (x = 79). All were reached.

The special-attention set was done in full and all of it is CLEAN at its run
level: `attack-advmin-1113` (@11/@13, arithmetic in section 2),
`attack-anchored-01-unify` (`cover = Uint16Array(N11)` counts scour primes
covering a slot, at most 10 at @11 against 65535, 6500x),
`attack-hsub-01` (no typed array, no bit operator, no literal above 2^53 on any
code line), `attack-mp-derive-01` and `attack-perfold-01-error-model` (both
carry only a 32-bit xorshift PRNG, where the int32 coercion is the intended
semantics), `attack-mp-derive-02-anchor` and `attack-perfold-02-blindwindow`
(the QMAX = 1500 key idiom), `attack-0c-holesweep-01` (2^53 guard, section 3),
`rho-maxlaw-01-sufficiency` (`B = 1 << 22` a constant, `Float64Array(B)`).

## 6. NOT reached

Two things were deliberately left, and one thing was out of reach.

**Left: the 12 files with no OUTPUT banner.** These have never been formally
embedded, so there is no authoritative run level to check a container against
and no figure of theirs is in the corpus by the embed route. They were swept
mechanically (sweeps 1 to 4 above) and none showed a narrow container holding
anything but a flag or a residue, but no per-store arithmetic was derived
against a level, because there is no level on record. They are:
`attack-beta2-02-theta-total.js`, `attack-beta2-03-exact-strata.js`,
`h2-lower-ladder.js`, `h2-prototype.js`, `h2-randomised.js`,
`localized-01-ladder.js`, `localized-02-fixed-window.js`,
`localized-03-merge-lemma.js`, `localized-04-maxsum.js`,
`localized-single-alignment.js`, `sift-limit-lemmaV.js`,
`theta-ladder-row.js`. If any of them is load-bearing, it needs an embed first
and then a re-check.

**Left: `Float64Array` stores holding reals.** Roughly 200 of them across the
partition (probabilities, log sums, moments, LP costs). A Float64 holding a real
cannot alias in this defect's sense; it can only lose precision, which is a
different audit. Only Float64 stores holding INTEGERS were derived against 2^53,
and those are listed in section 4.

**Out of reach: dynamic confirmation.** Per the standing compute rule, nothing
was re-run. Every level and every K, N, M, D, W and G2 figure above is read off
the embedded OUTPUT tail or derived from the file's own constants. Two figures
are derived rather than observed and should be treated as such: K = 198274 at
@37 for `attack-x-offset-02-profile` (taken from the census defect's record of
the same quantity, and consistent with pi(sqrt(37#)) - pi(37)), and
N = 6.23e9 for fold 31 in `attack-foldL-04-genealogy` (29 x 214708725, and the
file's own line 165 states 6.2e9).

## 7. Recommended repairs, for the orchestrator

Ordered by exposure. None is applied here.

1. `attack-x-offset-02-profile.js`: widen `la`/`lb` to `Uint32Array`, or add a
   guard `if (K > 65535) throw` next to the existing 2^53 guard at line 105.
   The guard is one line and makes the trap loud; the widening costs 29 MB at
   the current SEGK and removes it. Do this before any @37 run of this file.
2. `attack-beta2-04-loss-budget.js`: replace `1 << n` at lines 348 and 692 with
   `2 ** n` and guard `if (n > 26) throw`, or assert `ps.length <= 22` where
   `ALLP` is defined. The failure at pi(x) >= 31 is silent and produces an
   all-zero profile.
3. `attack-foldL-04-genealogy.js`: `nbirth` should be `Uint16Array`, or the
   fold list should carry `if (p > 255) throw`. A prime in a byte is the census
   bug's shape.
4. `attack-advmin-1113.js:435`: derive the pack width from the instance rather
   than hardcoding 12, or assert `MAXQ < 4096` where `MAXQ` is computed at
   line 384.
5. `attack-foldL-01-census.js:181`: size `hist` from the observed maximum gap
   rather than the literal 4096, or bounds-check the index. Out-of-bounds
   typed-array writes are silent in JavaScript.
6. `attack-foldL-04-localized.js`: the env-settable `QMAX` needs
   `if (QMAX > 65535) throw` next to the `Uint16Array` allocations, since
   `key` and `birth` hold the fold prime itself.
