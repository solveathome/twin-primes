// tv.c -- the T_v tile: D_v, G2(v#), and the maxsum table
//   maxsum_m(T_v) = max over i of (s[i+m] - s[i])  (cyclic), s = T_v slot positions.
// This is the SAFETY TABLE for a run-threshold filter: a run of L dead T_v slots
// between two survivors spans L+1 consecutive T_v gaps, so a filter that only
// looks at runs with L >= THRESH can only miss gaps of size <= maxsum_THRESH(T_v).
// Usage: tv v MAXM
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

int main(int argc, char **argv) {
  int v = atoi(argv[1]);
  int MM = argc > 2 ? atoi(argv[2]) : 40;
  int P[64], np = 0;
  for (int n = 2; n <= v; n++) { int ok = 1; for (int d = 2; d * d <= n; d++) if (n % d == 0) { ok = 0; break; } if (ok) P[np++] = n; }
  uint64_t Pv = 1; for (int i = 0; i < np; i++) Pv *= (uint64_t)P[i];
  uint64_t Dv = 1; for (int i = 0; i < np; i++) if (P[i] >= 3) Dv *= (uint64_t)(P[i] - 2);

  const uint64_t SEG = 1u << 22;            // segment length in integers
  uint8_t *seg = malloc(SEG);
  uint64_t *ring = malloc((size_t)(MM + 2) * 8);   // last MM+1 slot positions
  uint64_t *bestm = calloc(MM + 2, 8);
  uint64_t *bestat = calloc(MM + 2, 8);
  int nring = 0; uint64_t head = 0;
  uint64_t cnt = 0, firstSlots[64]; int nfirst = 0;
  uint64_t prev = ~0ULL, bestgap = 0, bestgapat = 0, lastSlot = 0, firstSlot = 0;

  for (uint64_t base = 0; base < Pv; base += SEG) {
    uint64_t len = (base + SEG <= Pv) ? SEG : (Pv - base);
    memset(seg, 0, len);
    for (int i = 0; i < np; i++) {
      uint64_t p = (uint64_t)P[i];
      uint64_t st = (p - base % p) % p;
      for (uint64_t r = st; r < len; r += p) seg[r] = 1;
      uint64_t s2 = ((p - 2) % p + p) % p;
      uint64_t st2 = (s2 + p - base % p) % p;
      for (uint64_t r = st2; r < len; r += p) seg[r] = 1;
    }
    for (uint64_t r = 0; r < len; r++) {
      if (seg[r]) continue;
      uint64_t pos = base + r;
      if (cnt == 0) firstSlot = pos;
      if (nfirst < MM + 1) firstSlots[nfirst++] = pos;
      if (prev != ~0ULL) { uint64_t g = pos - prev; if (g > bestgap) { bestgap = g; bestgapat = prev; } }
      prev = pos; lastSlot = pos; cnt++;
      // ring of the last MM+1 positions
      ring[head] = pos; head = (head + 1) % (uint64_t)(MM + 1);
      if (nring < MM + 1) nring++;
      for (int m = 1; m <= MM && m < nring; m++) {
        uint64_t old = ring[(head + (MM + 1) - 1 - m) % (uint64_t)(MM + 1)];
        uint64_t d = pos - old;
        if (d > bestm[m]) { bestm[m] = d; bestat[m] = old; }
      }
    }
  }
  // cyclic wrap: continue with firstSlots + Pv
  for (int k = 0; k < nfirst; k++) {
    uint64_t pos = firstSlots[k] + Pv;
    if (prev != ~0ULL) { uint64_t g = pos - prev; if (g > bestgap) { bestgap = g; bestgapat = prev; } }
    prev = pos;
    ring[head] = pos; head = (head + 1) % (uint64_t)(MM + 1);
    if (nring < MM + 1) nring++;
    for (int m = 1; m <= MM && m < nring; m++) {
      uint64_t old = ring[(head + (MM + 1) - 1 - m) % (uint64_t)(MM + 1)];
      uint64_t d = pos - old;
      if (d > bestm[m]) { bestm[m] = d; bestat[m] = old; }
    }
  }
  printf("v=%d  v#=%llu  D_v=%llu  mbar=%.6f  G2(v#)=%llu\n", v,
         (unsigned long long)Pv, (unsigned long long)cnt, (double)Pv / (double)cnt,
         (unsigned long long)bestgap);
  printf("D_v predicted=%llu  match=%s\n", (unsigned long long)Dv, cnt == Dv ? "YES" : "NO");
  printf("m  maxsum_m(T_v)   at\n");
  for (int m = 1; m <= MM; m++)
    printf("%2d  %10llu   %llu\n", m, (unsigned long long)bestm[m], (unsigned long long)bestat[m]);
  (void)firstSlot; (void)lastSlot;
  return 0;
}
