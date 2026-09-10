# primeoire benchbox

One-command benchmark of the corpus's three real kernel classes, for pricing
a candidate compute box against the laptop. SCRIPT-ONLY protocol: copy this
directory to the box, run, send `results.txt` back. No git, nothing else.

    scp -r benchbox/ box:~/ && ssh box 'cd benchbox && chmod +x bench.sh && ./bench.sh'

Needs: node >= 18, gcc or clang, bc. Total ~10-30 min. Everything runs
nice-able and uses < 8 GB.

## Laptop reference (Apple M-series, 10 threads, quiet)

| kernel | workload | laptop wall |
|---|---|---|
| tilegap2 (C, cache-bound) | 41# wheel 19, 1-table | 59.74 s |
| tilegap2 2-table (21 MB set) | same | LOST to 1-table (12 MB L2) |
| census.js (Node, 1 thread) | levels 23+29 | ~14.5 s |
| advmin.js (Node, B&B) | cal + at11 | ~220 s |

## What to look at

1. tilegap2 thread scaling 1/8/16/32 — the throughput conversion rate.
2. **The 2-table row**: if it BEATS 1-table on the box (32 MB CCD L3 vs the
   laptop's 12 MB L2), the 47# price sheet reopens and the enumeration
   frontier moves.
3. census + advmin walls — the Node single-core conversion rate, which
   prices every census/ensemble/fleet run.
