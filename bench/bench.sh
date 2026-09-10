#!/bin/bash
# ============================================================================
# primeoire compute-box benchmark — one command, ~10-30 min total.
# Runs the three real kernel classes on fixed workloads and writes results.txt.
# Compare against the LAPTOP REFERENCE table in README.md.
# Usage:  ./bench.sh            (needs: node >= 18, gcc or clang)
# ============================================================================
set -u
cd "$(dirname "$0")"
OUT=results.txt
: > "$OUT"
log(){ echo "$@" | tee -a "$OUT"; }

log "primeoire benchbox  $(date -u +%Y-%m-%dT%H:%MZ)"
log "host: $(uname -sm)  cores: $(nproc 2>/dev/null || sysctl -n hw.ncpu)"
log "node: $(node --version 2>/dev/null || echo MISSING)"
CC=$(command -v gcc || command -v clang || echo MISSING)
log "cc:   $CC"
log "cpu:  $(grep -m1 'model name' /proc/cpuinfo 2>/dev/null | cut -d: -f2 || sysctl -n machdep.cpu.brand_string 2>/dev/null)"
log ""

# ---- 1. tilegap2: the L2/L3-bound enumeration kernel ------------------------
# Fixed workload: 41#, wheel 19, THRESH 10, WT 128 — laptop ref: 59.74 s on
# 10 threads (1.99e11 T19-slots/s). Thread-scaling sweep included: the
# interesting number on the 5950X is whether the 2-pair-table config (21 MB
# working set, budget 21504 KB) BEATS the 1-table config — it lost on the
# laptop's 12 MB L2 and should fit a 32 MB CCD.
log "== tilegap2 (C, cache-bound enumeration) =="
$CC -O3 -march=native -o tilegap2 tilegap2.c -lpthread 2>>"$OUT" || { log "BUILD FAILED"; exit 1; }
for NT in 1 8 16 32; do
  S=$(date +%s.%N)
  ./tilegap2 19 41 $NT 10 128 8 1 1024 0 999999 > tg_$NT.log 2>&1
  E=$(date +%s.%N)
  log "  41# wheel19 1-table  threads=$NT   wall $(echo "$E-$S" | bc) s   (laptop ref: 59.74 s @ 10 threads)"
done
S=$(date +%s.%N)
./tilegap2 19 41 16 10 128 8 2 21504 0 999999 > tg_2tab.log 2>&1
E=$(date +%s.%N)
log "  41# wheel19 2-table  threads=16  wall $(echo "$E-$S" | bc) s   (the config that LOST on the laptop)"
grep -h "G2\|maxsum\|survivors" tg_16.log 2>/dev/null | head -3 | sed 's/^/    /' | tee -a "$OUT"
log ""

# ---- 2. census.js: the single-thread Node sieve kernel ----------------------
# Fixed workload: levels 23 + 29 — laptop ref: @29 census leg ~13.1 s
# (single thread, quiet machine). Node BigInt + typed-array heavy.
log "== census (Node, single-thread sieve) =="
S=$(date +%s.%N)
node census.js 23 29 > census.log 2>&1
E=$(date +%s.%N)
log "  levels 23+29   wall $(echo "$E-$S" | bc) s   (laptop ref: ~14.5 s combined)"
grep -h "level time" census.log | sed 's/^/    /' | tee -a "$OUT"
log ""

# ---- 3. advmin: the branch-and-bound kernel (per-core integer rate) ---------
# Fixed workload: calibration + the exact @11 search — laptop ref: ~1.7e5
# nodes/s/core; the cal+at11 phase measured ~220 s under embed on the laptop.
log "== advmin (Node, branch-and-bound) =="
S=$(date +%s.%N)
node advmin.js --phase=cal > advmin.log 2>&1
E=$(date +%s.%N)
log "  phase=cal   wall $(echo "$E-$S" | bc) s"
S=$(date +%s.%N)
node advmin.js --phase=at11 >> advmin.log 2>&1
E=$(date +%s.%N)
log "  phase=at11  wall $(echo "$E-$S" | bc) s   (laptop ref for cal+at11 ~220 s)"
grep -hE "advmin|nodes" advmin.log | tail -3 | sed 's/^/    /' | tee -a "$OUT"
log ""
log "DONE. Send results.txt back."
