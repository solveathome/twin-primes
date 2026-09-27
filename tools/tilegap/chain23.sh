#!/bin/bash
cd "$(dirname "$0")"
# wait for the wheel-19 run to finish, then start wheel 23
while ! grep -q ALLDONE g43_v19b.txt 2>/dev/null; do sleep 20; done
./drive2.sh 23 43 9 96 260 0 1295 g43_v23.txt 10 1024
