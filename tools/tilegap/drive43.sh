#!/bin/bash
# Chunked driver: run tile ranges sequentially and append each chunk's result.
# Detached with setsid so the harness cannot kill it; chunked so a kill costs
# at most one chunk.  Chunk results combine exactly: survivors add, G2 is the
# max, multiplicity adds over chunks attaining the max, least position is the
# min over those.
cd "$(dirname "$0")"
V=$1; B=$2; T=$3; WT=$4; STEP=$5; NTILE=$6; OUT=$7; NTH=${8:-10}; BUD=${9:-512}
echo "DRIVER v=$V b=$B THRESH=$T WT=$WT step=$STEP tiles=$NTILE threads=$NTH budget=$BUD" > "$OUT"
date >> "$OUT"
lo=0
while [ $lo -lt $NTILE ]; do
  hi=$((lo+STEP)); [ $hi -gt $NTILE ] && hi=$NTILE
  echo "=== CHUNK [$lo,$hi) ===" >> "$OUT"
  s=$(date +%s)
  ./tilegap2 $V $B $NTH $T $WT 8 -1 $BUD $lo $hi >> "$OUT" 2>>"$OUT.err"
  e=$(date +%s)
  echo "chunk wall $((e-s)) s" >> "$OUT"
  lo=$hi
done
echo "ALLDONE" >> "$OUT"
date >> "$OUT"
