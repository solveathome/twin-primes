# Width sweep — the big-level enumeration/census family

<!-- ledger
id: Q-width-sweep
status: ANSWERED
todo: none
question: Which big-level enumeration and census scripts carry a fixed-width container that is safe at every level run and aliases silently above a threshold?
verdict: Three instances: two CORRUPT (the one-word residue mask that corrupted the census from x = 37 up, and a Uint16 index into the scour-prime array in the @37 census, both since fixed) and one that threw rather than aliased; every internal identity in the corrupted producer is a COUNT identity and stayed PASS throughout, because the alias corrupts which prime, not how many.
-->

Diagnosis pass, 2026-08-21. No script and no corpus document was edited by this
pass. Partition: `xchan-*`, `natal-cap-*`, `scanstat*`, `verify-ladder-big.js`,
`exact-g2-ladder.js`, `two-class-lower-bounds.js`, `maxgap-law.js`, `fdecay*`,
`grain-census.js`, `a3-*`, `y2-*`, `var41-*`, `import-stein-02-strikes.js`,
`uframe-repro-*`, `genealogy.js`, `fossil-shadows.js`.

## What is being hunted

A fixed-width container that is safe at every level ever run and aliases
silently above a threshold. Three instances so far:

1. `1 << r` with `r` a residue mod q: JS takes the shift count mod 32, so a
   one-word residue mask aliases for q > 32. Corrupted `a3-03-f-from-census.js`
   from x = 37 up (record `research/history/staging/fdecay-deep.md`).
2. `xchan-at37-01-census.js`: the per-slot divisor lists `la`/`lb` held an
   INDEX into the scour-prime array in a `Uint16Array` (cap 65535). K = 1739
   at @23, 37534 at @31, 198274 at @37. Fixed 2026-08-21 at 605ce83.
3. Same file: hardcoded per-slot capacity `LC = 7`; seven scour primes fit
   under 37#. Threw rather than aliased. Fixed at 2e95563.

Every internal identity in (2) is a COUNT identity and all stayed PASS through
the corruption, because the alias corrupts WHICH PRIME, not HOW MANY.

Three container behaviours matter here and only one of them is loud:

- **32-bit coercion.** `<< >> | & ~` all coerce to int32 first, and a shift
  count is taken mod 32. Silent.
- **Typed-array element width.** Storing 6469693229 in an `Int32Array` yields
  −2120241363. Silent. Verified in this pass.
- **Typed-array index past the end.** `new Float64Array(200)[500] = 1` is a
  no-op and the read back is `undefined`. Silent. Verified in this pass.

Verified scour-prime counts K(x) = #{q : x < q, q² ≤ x#}, which is the value
that broke (2):

| x | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|---|
| K | 10 | 34 | 120 | 435 | 1739 | 7863 | 37534 | 198274 | 1117909 |

And the exact-arithmetic ceiling on the level itself: 41# = 3.04e14 = 0.034 ×
2^53, but **43# = 1.31e16 = 1.45 × 2^53**, so a primorial held as a `Number`
stops being exact at x = 43. `natal-cap-37-at41-march.js` already asserts this.

## The table

Container caps: `Uint8Array` 255, `Int16Array` 32767, `Uint16Array` 65535,
`Int32Array` 2^31−1 = 2.147e9, `Uint32Array` 2^32−1, `Number` exact to 2^53.

| script | store | holds | max value at levels run | cap | verdict | fires at |
|---|---|---|---|---|---|---|
| `xchan-at37-01-census.js` | `la`,`lb` (was `Uint16Array`) | index into `qs` | 198273 @37 | 65535 | **CORRUPT** (embedded block) | @37, already fired |
| `xchan-at37-01-census.js` | `LC` (was 7) | divisors per slot | 7 @37 | 7 | LOUD, fired | @37 |
| `xchan-at29-01-segmented.js` | `la`,`lb` `Uint16Array(LC·MS)` | index into `qs` | 37533 @31 | 65535 | CLEAN, **close (57%)** | @37 → masked by the `LC=7` throw |
| `xchan-at29-01-segmented.js` | `LC=7`, `if(av>=LC) throw` | divisors per slot | 6 @31 | 7 | LOUD | @37 |
| `xchan-at*` | `C3(n)=n(n−1)(n−2)/6` | C(K,3) | intermediate 7.79e15 @37 | 2^53 = 9.01e15 | CLEAN, **close (87%)** | K ≈ 2.1e5, i.e. just past @37 |
| `a3-03-f-from-census.js` | `1 << (r mod q)`, `Int32Array masks` | avoided-residue set | q ≤ 199 | 32 residues | **CORRUPT**, known + documented in-file | x = 37 |
| `a3-06-origin-vs-max.js` | `fold()` `out` `Int32Array` | absolute slot position | 223092869 (fold to 23) | 2.147e9 | CLEAN, **close (10%)** | fold to 29 → 6.47e9, wraps to −2120241363, `n===out.length` still passes |
| `maxgap-law.js` | `hist` `Int32Array(HCAP+1)` | gap-size counts | ≤ D = 1.02e9 @x=29 mode 1 | 2.147e9 | CLEAN, **close (2.1×)** | x = 31 (D = 3.07e10) |
| `natal-cap-39-triple-census.js` | `a`,`b` `Uint16Array(W)` | # scour primes dividing r; `a[0]=K` | 1739 @23 | 65535 | CLEAN | @37 (K = 198274); memory bites first |
| `natal-cap-13-anchored-calm.js` | `splitcnt`,`gt4` `Int16Array(W)` | # scour primes per rotation | 120 @17 | 32767 | CLEAN | @31 (K = 37534) |
| `natal-cap-19 / -13 / -31 / -38` | `W>>1`, `W>>2` | half/quarter period | W = 9699690 @19 | int32 | CLEAN | @29: W = 6.47e9 coerces to −2120241362 |
| `natal-cap-21-beyond-chebyshev.js` | `lo`/`hi` two-word residue mask | avoided residues | q ≤ 47 @11 | 64 residues | LOUD (`assert(q<=64)`) | @13 (q to 173) |
| `natal-cap-34-wrap-precision.js` | `lo`/`hi` `Uint32Array` pair-mask | scour-prime index | K = 34 @13 | 64 | LOUD (`assert(K<=64)`) | @17 (K = 120) |
| `natal-cap-37-at41-march.js` | whole engine | — | y² = 3.04e14 @41 | 2^53 | CLEAN, self-audited | @43, `assert(W<2**53)` |
| `natal-cap-18-at29.js` | `pos` `Float64Array(N+PAD)` | absolute position | 6.47e9 @29 | 2^53 | CLEAN | — |
| `natal-cap-18` / `-11` / `-25` | `new Uint8Array(W)` in `marchLevel` | natal flags | W = 2.23e8 @23 | 2^32 elements | CLEAN (comment, not guard, says x ≤ 23) | @29 = 6.47 GB |
| `natal-cap-12-overlap-sign.js` | `SR` `Int32Array`, `table` `Int32Array` | residue < W; pair counts | 2.23e8; S2 = 1.1e7 @23 | 2.147e9 | CLEAN | @29 |
| `natal-cap-16` / `-33` / `var41-price.js` | `ptr` `Float64Array(3np)` | segment cursor j | 2.47e11 @37 | 2^53 | CLEAN | @43 (W not exact) |
| `grain-census.js` | one-word avoided mask | residues mod q | q ≤ 23 | 32 | LOUD (`throw` for q > 31) | q = 37 |
| `scanstat-t37-01-engine.js` | `sm`,`s2` `Float64Array` | Σv, Σv² over D₃₇ = 2.18e11 | Σv² ≈ 1.0e18 | 2^53 | CLEAN — BigInt flush at 4e15, load-bearing | — |
| `scanstat-t37-01` / `scanstat2-01` | `j & MASK`, `i & xm` | ring index, j > 2^31 | j ≤ 2.18e11 | — | CLEAN — masks are 2^k−1 and 2^k \| 2^32, so ToInt32 preserves j mod 2^k | 2^53 |
| `scanstat2-01-t31.js` | `hX/hA/hB/hK` `Float64Array(HB)` | window-sum histogram | v < HB | HB | LOUD (`throw 'histogram overflow'`) | v ≥ HB |
| `verify-ladder-big.js` | `arr[(…)/30 \| 0]` | segment index | < 1e7 | 2^31 | CLEAN | SEG > 6.4e10 |
| `exact-g2-ladder.js` | BigInt certificates; `maxsumTable` at v ∈ {19,23} | positions | 8.3e14 (BigInt) | — | CLEAN | — |
| `import-stein-02-strikes.js` | `keys[k]=h1·2^21+(h2>>>11)` | 53-bit signature | 2^53 − 1 | 2^53 | CLEAN **by exact saturation** (100%) | any widening of `SH` |
| `import-stein-02-strikes.js` | `idx`,`nat` `Int32Array(W)` | residue < W | 2.23e8 @23 | 2.147e9 | CLEAN (10%) | @29 |
| `fdecay-deep-00-core.js` | `key` `Uint16Array(SEG)` | smallest striking prime | 907 | 65535 | CLEAN | level x > 65535 |
| `fdecay-deep-00-core.js` | `survTab` `Uint8Array(xmax+1)` | # levels survived | 42 | 255 | CLEAN | > 255 levels in one call |
| `fdecay-deep-00-core.js` | `Nslot`,`prevN` `Float64Array` | positions to X = 1e11 | 1e11 | 2^53 | CLEAN | X > 9e15 |
| `a3-01-misalignment-ledger.js` | `gaps` `Uint16Array` | gap value | 348 (fold 31) | 65535 | CLEAN | gap > 65535 |
| `a3-01-misalignment-ledger.js` | `ng` `Uint16Array(Dn)` | gap value | D₂₉ = 2.15e8 elements | 2^32 elem | CLEAN (`ng` is null on the last fold) | fold list extended past 31 |
| `a3-02-diagonal-f.js` | `m29`,`m31`,`m37` `Uint8Array` | residue mod q | 36 | 255 | CLEAN | fold q ≥ 257 |
| `a3-02-diagonal-f.js` | `h` `Float64Array(HB=8192)` | gap/6 histogram | 58 (T31) | 8191 | CLEAN, **no guard — silent drop** | gap > 49146 |
| `a3-05-bound-L.js` | `hist` `Int32Array(8192)` | gap/6 histogram | 58 | 8191 | CLEAN, explicit `if (g/6 < 8192)` (silent drop) | gap > 49146 |
| `a3-04-maxsum-recursion.js` | `maxKillRun` `CAP = 64` | kill-run length L | 4–5 | 64 | CLEAN, **silent truncation** | L ≥ 64 |
| `a3-09-histogram-operator.js` | `g8`,`out` `Uint8Array` | gap/6 | 58 (T31) | 255 | CLEAN | G2 > 1530, i.e. x ≈ 71 |
| `a3-09-histogram-operator.js` | `t` `Uint8Array(D)` | position mod q | 30 | 255 | CLEAN | fold q ≥ 257 |
| `a3-10-lower-tightness.js` | `R29`,`R31`,`R37` `Uint8Array(D23)` | residue mod q | 36 | 255 | CLEAN | fold q ≥ 257 |
| `uframe-repro-01-fold-ladder.js` | `out` `Uint8Array(count)` | gap/6 | 88 (T37) | 255 | CLEAN (2.9×) | G2 > 1530 |
| `uframe-repro-02-maxgap-forensics.js` | `hist*` `Float64Array(200)` | gap/6 histogram | 88 (T37) | 199 | CLEAN, **close (2.3×), no guard — silent drop** | G2 > 1194, x ≈ 61–67 |
| `two-class-lower-bounds.js`, `y2-ladder-recompute.js` | window-sized `Uint8Array`/`Int32Array` | flags, window indices | ≤ 4001² = 1.6e7 | 2^31 | CLEAN | — |
| `genealogy.js`, `fossil-shadows.js` | `Uint8Array(N)`, `Uint8Array(P=9699690)` | flags | — | — | CLEAN | — |

## CORRUPT

**1. `research/xchan-at37-01-census.js`, the embedded OUTPUT block, level @37.**
The code above the banner is the repaired code (`LC = 10`, `la`/`lb` widened to
`Uint32Array` at 605ce83 and 2e95563). The OUTPUT block below it is still the
run that was produced under `Uint16Array`, and it is void at @37 only. The @23
and @31 rows in the same block are sound: K = 1739 and K = 37534 both fit.

Named figures in that block that are void, all from the `===== @37` section and
the summary row `37 | 29.635 | …`:

- `MIXED obs = 50213010189`, and its two orientation halves 25106446768 and
  25106563421.
- `SUB-W … obs = 430105256595   aligned 115284005267 | mixed 314821251328`.
- `J = 0.814181`, `1−J = 0.185819`, and the summary row's `0.814181 / 0.185819`.
- `ALIGNED obs = 0  [P1 predicts exactly 0: PASS]` at @37 — the count is not
  wrong, but the test is vacuous under the alias, because P1 is a statement
  about WHICH primes coincide and the alias randomises exactly that.

Direction and size: the mixed super-W count is ~18% below its CRT prediction
(50213010189 vs 61673023269.22), against −0.4% at @29 and −0.5% at @31. Every
index m ≥ 65536 — two thirds of K = 198274 — reads back as m mod 65536, i.e. as
a *different and always smaller* scour prime, so the products ∏Q that decide
sub-W versus super-W are systematically too small and mass moves from super-W
into sub-W. The sign is right for that, but the sub-W/triples ratio alone does
not prove it: 1.22, 1.65, 2.17, 2.89 at @23, @29, @31, @37 is a smooth rise, so
the @37 term is not visibly out of line on that statistic. The 18% break in J
against −0.4%/−0.5% is the anomaly, and it is what the re-run settles.

Not void, because they are computed above the divisor lists: `W`, `N̄(formula)
= 145286237250` and its counted match, `K = 198274 (41..2724079)`, the work
counts, `4S₂`, `F`, `MISSING MASS 0.070749`, `C(K,3) = 1299090727729024`,
`B_3 = 480318266784` and its four-way split, and `max |D_a| = 7`.

This block is being replaced: a re-run of the repaired producer is in flight
(the ~5 h census on one core). Nothing downstream should quote the @37 row
until that lands. The count identities `sub+sup = B_3`, `N̄ counted = formula`,
`e₃ = miss + sub`, `C(K,3)` and the reference GATE all printed PASS through the
corruption, which is the whole point of this sweep.

**2. `research/a3-03-f-from-census.js`, x ≥ 37.** Known, documented in the file
at lines 602–606, superseded by the alias-free recomputation embedded in
`research/fdecay-deep-01-census-defect.js`. Ratio alias-free/published lies in
[0.62474, 1.04904]. Listed here only so the class census is complete; it is not
a new finding and needs no new repair. Note that `a3-03`'s `bitsOf` still
carries the raw `1 << (r mod q)` with no guard — the file is marked, the code
is not. `grain-census.js` and `natal-cap-21` took the other route and now throw.

## The close calls — what breaks next

In descending order of how soon it bites.

1. **`maxgap-law.js` `hist` `Int32Array`, 2.1× of cap at the level already
   run.** At x = 29 mode 1 the tile has D = 1,021,870,080 gaps, so no histogram
   bucket can exceed 1.02e9 against a cap of 2.147e9 — safe only because the
   *total* is under the cap. At x = 31, D = 3.07e10 and the modal bucket goes
   negative silently; `tail[g] = acc/T.D` then reads a negative count and the
   whole tail-share table is wrong with nothing printed. `--big` already runs
   x = 29; x = 31 is the obvious next row.
2. **`xchan-at29-01-segmented.js` `la`/`lb`, 57% of cap.** Identical code to
   the defect just repaired in the @37 sibling, and it takes a level list on
   the command line (`-- 37` is one word away). It is protected at @37 only by
   the `LC = 7` throw — that is, by a guard on a *different* quantity, and the
   at-37 history shows that guard being raised is exactly what unmasks the
   alias. Widening `la`/`lb` to `Uint32Array` there costs 29 MB.
3. **`C3(n) = n(n−1)(n−2)/6` at 87% of 2^53.** At K = 198274 the intermediate
   product is 7.79e15 against 2^53 = 9.01e15. The identity that checks it,
   `C(K,3) = … vs …`, computes both sides the same way, so it is a tautology
   and would not notice. Breaks at K ≈ 2.1e5, barely past @37.
4. **`a3-06-origin-vs-max.js` `fold()` at 10% of `Int32Array`.** Verified in
   this pass: folding to 29 would store 6469693229 as −2120241363, and the only
   check in the function, `if (n !== out.length) throw`, is a COUNT identity
   and still passes. The script currently sidesteps this by streaming the 29
   fold; materialising it is a one-line change.
5. **`uframe-repro-02-maxgap-forensics.js` `Float64Array(200)` gap/6
   histograms at 2.3×.** Out-of-range writes are silently dropped, so pushing
   the fold ladder past T₃₇ loses the tail of the histogram with no error.
6. **`import-stein-02-strikes.js` keys at exactly 2^53 − 1.** Correct by
   design and exactly saturated. Any widening of the tag width or of `SH` makes
   two distinct signatures collide, and the class-count identity would not see
   it. Worth a comment at the line if not a guard.

## NOT REACHED

- `natal-cap-02, -03, -05, -07, -09, -10, -14, -15, -20, -23, -26, -27, -28,
  -29, -30, -32, -36`: scanned for fixed-width stores and none held a value
  that scales with the level (flags, per-prime residue arrays of length q,
  small histograms). Not traced line by line.
- `natal-cap-04-packing-cap.js`, `-08-staircase.js`, `-17-cheap-laws.js`,
  `-22-at31-drift.js`, `-24-boundK-curve.js`, `-25-excess-law.js`,
  `-31-calm-vs-kill.js`, `-33-overnight.js`, `-35-x-multiplicity.js`,
  `-38-loudness-driver.js`: level lists and array widths checked; arithmetic
  paths inside the estimators not audited.
- `a3-07-pane-overlap.js`, `a3-08-adjacent-pairs.js`: containers checked, the
  DP recurrences not.
- `scanstat-t37-02/03/04`, `scanstat2-02-crossover.js`: these consume shard
  files and embedded tables rather than enumerating; the shard *combine*
  arithmetic was not audited.
- `fdecay-band-01.js`, `fdecay-deep-02/03/04`: they call
  `fdecay-deep-00-core.js`, which was audited; their own fitting code was not.
- `verify-ladder.js`, `a144311-full-ladder.js`, `a060256-seam-ladder.js`,
  `external-ladders-01.js`, `killrun.js`, `birth-cohorts.js`,
  `scour-into-fixed-tile.js`, `gen-natal5-17tile-scour.js`: outside the stated
  partition, though several are census-shaped and run at ≥ 29.
- Floating-point *accuracy* (as opposed to exactness) was not audited. Kahan
  compensation is used in `var41-price.js`, `natal-cap-16/33`,
  `natal-cap-21/34` and `scanstat*`; whether the compensation is placed
  correctly is a different question from the one this sweep asks.
- The `.md` corpus was not swept for figures descended from the two CORRUPT
  producers beyond the @37 block named above.
