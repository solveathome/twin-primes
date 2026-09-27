# The bench

Instruments for playing with the tile. Local only, not deployed, not part of
the publication moratorium: nothing here leaves the machine.

Open `index.html` by double-clicking it. No server, no build step, no
dependencies. Everything is a classic script so `file://` works.

```
kernel.js        the tile engine — fold, strike, slots, grain, census, seams, birth folds
test-kernel.js   test vectors from the repo — run: node web/bench/test-kernel.js
index.html       instrument 1: the grain census
main.js          its views, controls, exports
numberline.html  the number line: one column per integer, strikes stacked
numberline.js    its views and controls
dimensions.html  instrument 3: the dimension of a hole
dimensions.js    its views and controls
uniquebox.html   instrument 4: the unique box (the stricter reading)
uniquebox.js     its views and controls
```

## The dimension of a hole

A number is k-dimensional when it can be built as a box of k factors each at
least 2, which happens exactly when Ω(n) ≥ k. Primes are one-dimensional. This
colours the tile's holes by dimension instead of by whether they are slots.
See `research/OBSERVATIONS.md` entry 5 for the mapping to the standard names:
the k-dimensional primes are the almost-primes P_{k−1}.

Two facts the instrument is built around, both PROVEN in a line and both visible
immediately in the picture:

- Every hole of the tile has all its prime factors above p, so **the first hole
  of dimension k sits at exactly p_next^k**. Those are the ignition points, and
  the k = 2 one is the crystallization frontier: below it every hole is a prime.
- The left chart counts only the tile's holes, the right one counts every
  integer over the same range. **The difference between the two is what the
  sieve did**, drawn rather than argued.

Reach: up to T19 (width 9.7M, 1.66M holes, about 150 ms). T23 needs 223 million
Ω values and is out of browser range.

## The unique box

Instrument 4 is instrument 3 under the stricter definition
(`OBSERVATIONS.md` entry 5a): n is a k-box number when exactly *one* unordered
set of k factors multiplies to n, which is `{Ω(n) = k} ∪ {p^(k+1)}`.

The only difference between the two readings is that thin exceptional family,
so this instrument makes it the subject. Prime-power holes box uniquely at both
k and k−1, because identical factors leave no choice about grouping. They are
drawn as a white rim on their band, marked in the strip, counted per class in
the table, and listed individually in their own panel.

Measured at T13: 39 of 5,760 holes, 0.677%, all of them q^e for a prime q above
13 (34 squares and 5 cubes). The disagreement between the two definitions is
real but vanishing.

## The number line

One column per integer. Every stacked prime strikes its multiples and adds a
block, so a column's height is how many stacked primes divide that number, and
height zero is a hole. Two holes two apart get a bar underneath, coloured by
the fold that gave birth to that slot.

The same colour always means the same prime, whether it is striking or giving
birth. A slot's bar is filled below the frontier p², where a hole is a
certified prime and the slot is a real twin prime pair, and hollow past it.

Worth doing once: stack 2, 3, 5, 7, 11, 13, then press "tile edge p#" and step
along with the buttons. The slots born at fold 11 appear only near multiples of
210, which is the Seam Lemma made visible: the natal set is born at the seam.

## The kernel

One engine, plain arrays, no rendering assumptions. Everything else is a view
of it, and the scroll page's exhibits will be too.

`buildSlots(levelIndex, d)` folds from the 2-tile up, one prime at a time:
lay p copies end to end, strike the residues that would put r or r+d on a
multiple of p, keep the rest. That is the Copying Theorem run as an algorithm,
so the slot list is generated the way the framework says the family grows,
rather than by sieving positions and checking them afterwards.

Reach: direct hole rendering to T19 (width 9,699,690), slot lists to T23
(7,952,175 slots, about half a second end to end). T29 needs 215 million slots
and is out of browser range.

## Verification

`node web/bench/test-kernel.js` checks the engine against numbers already
committed elsewhere in the repo, not against itself:

- widths and censuses, including T31's 6,226,553,025
- the three houses: the slots of T5 are exactly 11, 17, 29
- T7's grain, verbatim against GLOSSARY.md
- T11's grain census, verbatim against GLOSSARY.md
- the G2 ladder T2..T29 against the twin Jacobsthal list
- the d ↦ G_d split: G8 = 198 against G2 = 150 at 19#, from README.md
- every T13 slot sits on a hole with its partner on a hole
- gaps sum to the width at every level tested

The page reruns three of these in the browser on load and says so in the
header. It also checks, live at whatever level is on screen, the two laws
proved in `research/grain-census.js`: count(6) = ∏(q−4), the forced ratio
8·count(6) = 3·count(12), and the word rule that "6,6" never occurs.

## What instrument 1 turned up

Nothing new, which is worth recording plainly. Playing with the per-fold
multiplier column reproduces, from the folding side, exactly what
`research/grain-census.js` had already derived from the CRT side on
2026-08-14: gap sizes 6 and 12 multiply by exactly p−4 at every fold from p=11
up, with the p=7 exception explained by 14 ≡ 0 mod 7 collapsing four forbidden
residues to three; larger sizes exceed p−4 because folds also fuse smaller
gaps, which 6 and 12 are immune to since the minimum gap is 6 and two 6s are
never adjacent.

Two things came out of that anyway. The agreement is a real cross-check: two
independent implementations, one folding and one inclusion-exclusion, produce
the same censuses digit for digit. And GLOSSARY.md still said the grain census
"awaits a law", which was true when written and stale by the time of the grain
session; that line now points at the file that settled it.

The consequence for the bench: instrument 1's research target is closed, so
**instrument 2 (where the monster gaps live) is the top of the queue.** The
groundwork is already here — `topGaps`, the seam overlay, and the deviation
view that shows positional structure once a pixel holds more than eight slots.

## Notes on the views

**The tile.** Below about eight slots per pixel this plots density. Above it,
density saturates to a solid block and hides everything, so it switches to
deviation from the mean and says so. The deviation view is the one worth
staring at: at T19 the whole tile fluctuates inside ±3.4%.

**The grain census.** Ghost bars are the previous level's shares, so a fold's
effect on the distribution is visible in one picture. Green bars are gap sizes
that did not exist one level down.

**The table.** The `×` column is count at this level divided by count one
level down. The reference value is the fold multiplier p−2 shown in the
readouts.

**Export.** Every picture dumps as numbers, to the textarea and the clipboard.
Every knob is in the URL, so an interesting configuration is a link.
