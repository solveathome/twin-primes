// brute.c -- independent brute-force G2(x#): sieve every integer in [0,x#).
// No wheel, no masks, no cleverness. Used as the known positive for the fast tool.
// Usage: brute x
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

int main(int argc, char **argv) {
  int x = atoi(argv[1]);
  int P[64], np = 0;
  for (int n = 2; n <= x; n++) { int ok = 1; for (int d = 2; d * d <= n; d++) if (n % d == 0) { ok = 0; break; } if (ok) P[np++] = n; }
  uint64_t M = 1; for (int i = 0; i < np; i++) M *= (uint64_t)P[i];
  uint64_t Dx = 1; for (int i = 0; i < np; i++) if (P[i] >= 3) Dx *= (uint64_t)(P[i] - 2);
  fprintf(stderr, "brute x=%d  x#=%llu  D_x(pred)=%llu\n", x, (unsigned long long)M, (unsigned long long)Dx);
  uint64_t nw = (M + 63) / 64;
  uint64_t *dead = calloc(nw, 8);
  if (!dead) { fprintf(stderr, "oom\n"); return 1; }
  for (int i = 0; i < np; i++) {
    uint64_t p = (uint64_t)P[i];
    for (uint64_t r = 0; r < M; r += p) dead[r >> 6] |= 1ULL << (r & 63);
    uint64_t s = (p - 2) % p;
    for (uint64_t r = s; r < M; r += p) dead[r >> 6] |= 1ULL << (r & 63);
  }
  // walk survivors
  uint64_t surv = 0, first = ~0ULL, last = 0, best = 0, bestAt = 0, prev = ~0ULL;
  for (uint64_t r = 0; r < M; r++) {
    if ((dead[r >> 6] >> (r & 63)) & 1ULL) continue;
    surv++;
    if (first == ~0ULL) first = r;
    if (prev != ~0ULL) { uint64_t g = r - prev; if (g > best) { best = g; bestAt = prev; } }
    prev = r; last = r;
  }
  uint64_t wrap = first + M - last;                 // cyclic closing gap
  if (wrap > best) { best = wrap; bestAt = last; }
  // second pass: how many positions attain the maximum, and the least of them
  uint64_t cnt = 0, least = ~0ULL;
  prev = ~0ULL;
  for (uint64_t r = 0; r < M; r++) {
    if ((dead[r >> 6] >> (r & 63)) & 1ULL) continue;
    if (prev != ~0ULL && r - prev == best) { cnt++; if (prev < least) least = prev; }
    prev = r;
  }
  if (wrap == best) { cnt++; if (last < least) least = last; }
  printf("maxima: count=%llu  least position=%llu\n", (unsigned long long)cnt, (unsigned long long)least);
  printf("x=%d  x#=%llu\n", x, (unsigned long long)M);
  printf("survivors=%llu  D_x=%llu  match=%s\n", (unsigned long long)surv,
         (unsigned long long)Dx, surv == Dx ? "YES" : "NO");
  printf("G2(x#)=%llu  at pos %llu\n", (unsigned long long)best, (unsigned long long)bestAt);
  free(dead);
  return 0;
}
