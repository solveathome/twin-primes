# The tilegap enumeration suite

The C instruments behind the exact G2 ladder's big levels (41#/43#) and the
47# pricing (`research/history/staging/phase1-T2b-exact-ladder.md` §5, which
carries the measured prices, the two-wheel recipe, and the tuning results).
Rescued from a session scratchpad 2026-08-22 so a reboot cannot lose them.

- `tilegap2.c` — the chunkable production enumerator (args: v b threads
  THRESH WT OV NPAIR budgetKB tileLo tileHi). `tilegap.c` is the plainer
  original, checked against brute force first. `brute.c` full-period brute.
- `tv.c` — maxsum threshold-safety tables. `dprobe.c` — the 2^53
  double-hazard probe. `drive2.sh` / `drive43.sh` / `chain23.sh` — chunk
  drivers; the 43# reproduction is two commands per wheel (see the T2b §7
  record).
- 47# recipe: best config wheel 23 / WT 96 / 1 pair table, 35.8 h/run on the
  laptop; the 21 MB 2-table config LOST there (12 MB L2) and is the config
  to re-probe on any box with ≥32 MB L3 (see `bench/`).

The gate does not audit `tools/`; these are instruments, not producers —
their runs bind through `research/` artifacts as always.
