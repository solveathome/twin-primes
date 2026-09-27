"""Independently check Wang's 2024 OEIS A144311 interval, reproduced in return 1632.

Uses only the OEIS A144311 definition, not the search engine or compressed
certificate convention. This establishes a lower bound, not maximality.
"""

import json
from math import isqrt, prod


def primes_through(limit):
    return [
        n for n in range(2, limit + 1)
        if all(n % d for d in range(2, isqrt(n) + 1))
    ]


primes = primes_through(83)
start = 162791254787456816384305457582341
length = 1859


def covered(n):
    return any(n % p in (1, p - 1) for p in primes)


missing = [k for k in range(length) if not covered(start + k)]
left_covered = covered(start - 1)
right_covered = covered(start + length)
shifted_interval_passes = all(covered(start + 1 + k) for k in range(length))

if len(primes) != 23 or missing or left_covered or right_covered:
    raise SystemExit("FAIL: interval or boundary check")
if shifted_interval_passes:
    raise SystemExit("FAIL: shifted-interval negative control")

print(json.dumps({
    "status": "PASS",
    "source": "https://oeis.org/history?seq=A144311",
    "source_locator": "Jinyuan Wang, revision 18 discussion, 2024-11-26 10:42 EST",
    "project_reproduction": "https://solveathome.org/projects/twin-primes/return/1632",
    "new_discovery_claimed": False,
    "prime_count": len(primes),
    "largest_prime": primes[-1],
    "primorial": str(prod(primes)),
    "start": str(start),
    "end": str(start + length - 1),
    "covered_length": length,
    "uncovered_offsets": missing,
    "both_neighbors_uncovered": not left_covered and not right_covered,
    "shift_one_negative_control_rejected": not shifted_interval_passes,
    "A144311_23_lower_bound": length,
    "G2_83_primorial_lower_bound": length + 1,
    "global_maximality_established": False,
}, indent=2))
