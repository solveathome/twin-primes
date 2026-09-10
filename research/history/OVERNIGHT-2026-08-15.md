# Overnight run, 2026-08-15 evening

Three tracks, launched detached so they survive any session ending. Nothing
here needs supervision. Read this file first in the morning.

## Track 1: the @41 march (TODO item 1)

- Started 21:19, 8 shards plus driver, ETA about 6 to 7 hours.
- Log: `~/Files/primeoire-runs/at41/at41-run2.log`
- Shard JSON: `~/Files/primeoire-runs/at41/nc37-x41-of8-*.json`

Custody already passed live before the march began, on the wheel-optimised
code path: GATE 0 at @7 through @29 digit-for-digit, and GATE 1 with
S(31) = 283,449,187 exactly through the sharded path. GATE 2 (@37) was running
at the time of writing. If any gate had failed the job would have aborted, so
a completed log means the engine reproduced the whole record before extending.

**The forecasts are frozen and on record. Do not adjust them after reading
the answer.** β(41): classical-raw 0.8449, classical plus persisted residual
0.8459, free-linear 0.8443, pinned-linear 0.8488.

What a result means. The zero-knob classical curve has now had its residual
collapse four consecutive times (+0.0046, +0.0026, +0.0016, +0.0010 at @23,
@29, @31, @37). A fifth collapse at W = 3.04e14 would leave no rival
description of the drift. A miss would be the most interesting result of the
campaign, and it should be reported as loudly as a hit.

## Track 2: Lemma V, the full run (TODO item 0)

- Started 21:21, single core, tens of minutes.
- Log: `~/Files/primeoire-runs/lemmaV/lemmaV-full.log`

This settles the fork left open when the agent died. The file turned out to
be further along than the wave-7 writeup credited: the plateau rewrite was
finished, and `almostAll()` now compares the sieve mean square against the
elementary second moment as two CONSTANTS rather than two exponents, since
both scale as 1/H. It also computes, conditional on an unproven Gaussian
maximal law, the window length needed for ALL-positions positivity, expressed
as an exponent of z. That exponent is the quantity the Gap Reformulation
cares about.

Early rows already visible in the log: the plateau 2<rho²> is confirmed
H-free, and the measured cancellation exponent is gamma ≈ 0.15 to 0.21
against a provable 0.61. H* = sqrt(plateau)/M is rising as a multiple of
ln²z (14.955 at z=29, 22.233 at z=31, 35.124 at z=41, 41.741 at z=43), so
the ln²z normalisation is not yet the right one and the growth in that
coefficient is the thing to read in the morning.

## Track 3: the artifact chain (house-format debt)

- Driver: `~/Files/primeoire-runs/overnight-chain.sh`, waits for track 2 to
  clear, then runs one job at a time on one core.
- Progress: `~/Files/primeoire-runs/chain/chain.log`
- Outputs: `~/Files/primeoire-runs/chain/*.log`

Order: natal-cap-36 default levels, natal-cap-35 default levels,
natal-cap-36 `--at29` for the sixth certified skeleton level, then
natal-cap-34 in verify mode with two workers. Each of these artifacts
currently has code but no pasted OUTPUT block, which is why nothing in
WAVE7-RESULTS is house-grade yet.

## Morning checklist

1. Read this file, then `at41-run2.log` from the bottom. Check that all three
   gates passed, then read β(41) against the four frozen forecasts above.
2. Read `lemmaV-full.log` sections S4c and S6. The question to answer: does
   the sieve mean square beat the elementary second moment, and by what
   constant; and what is the all-positions exponent of z.
3. Read `chain.log` for completion, then fold each captured OUTPUT into its
   artifact with numbered READINGS, which retires the provenance warning at
   the top of `WAVE7-RESULTS-2026-08-15.md`.
4. Update the drift table in `paper/anchored-note.md` §3 and §10 only after
   the @41 custody gates are confirmed in the log, never from the shard files
   alone.

## Not launched, and why

The wrap engine at @17 (TODO item 6) is the obvious fourth job and it was
left out deliberately. The @13 exact decomposition took 1,857 seconds on ten
workers, @17 is very much larger, and nobody has measured its cost. Launching
an unmeasured job of that size blind would have risked the night for no
guaranteed result. Measure the @17 cost first, then schedule it.
