#!/bin/bash
cd "$(dirname "$0")"
V=$1; B=$2; T=$3; WT=$4; STEP=$5; LO=$6; NTILE=$7; OUT=$8; NTH=${9:-10}; BUD=${10:-1024}
echo "DRIVER v=$V b=$B THRESH=$T WT=$WT step=$STEP tiles [$LO,$NTILE) threads=$NTH budget=$BUD" > "$OUT"
date >> "$OUT"
lo=$LO
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
