# Attestation: proof of existence

This directory proves the primeoire body of work existed on the dates claimed.

## What's here

- `primeoire-2026-08-14.tar` — full snapshot of the repo at tag
  `body-of-work-2026-08-14` (commit 2069bc1), SHA-256
  `dd9928d30464721bf6ef6a76af41daf7a2469891426f787452701c448a0d4deb`.
- `commit-log-2026-08-14.txt` — the complete commit history with author dates.
- `*.ots` — OpenTimestamps proofs for both files: the SHA-256 digests were
  submitted to four independent calendar servers on 2026-08-14 and are
  aggregated into a Bitcoin block (typically within hours). Once anchored,
  anyone can verify — without trusting us or any single server — that these
  exact bytes existed on this date:

      ots verify primeoire-2026-08-14.tar.ots

  (After anchoring, run `ots upgrade *.ots` once to embed the Bitcoin proof,
  then commit the upgraded proofs.)

## Why this works

The .ots file commits the archive's hash into the Bitcoin blockchain's
timestamped history. Forging it would require rewriting the blockchain.
This is proof of EXISTENCE at a date — it proves the work existed, not who
wrote it; the commit log, the repo's provenance, and the layered record
(OEIS submissions, arXiv postings when made) establish authorship.

## The layers of priority protection

1. **OpenTimestamps** (this directory) — cryptographic, trustless, done.
2. **Public hosting** (GitHub push) — third-party server timestamps + visibility.
3. **OEIS submissions** — dated public scientific record (drafts ready).
4. **arXiv** — the academic priority stamp for the papers (pending decisions).

Re-attest after major milestones: archive → sha256 → ots stamp → commit.

## Ritual fix (2026-08-14, v5 postmortem)

The v1–v5 archives were made with plain `git archive HEAD`, which includes
attestation/ itself — so each snapshot swallowed all previous snapshots
(v3 = 52MB, v4 = 113MB, v5 = 240MB; snowballing). All proofs remain valid.
**From v6 on, archive the WORK only:**

    git archive HEAD ':(exclude)attestation' -o attestation/primeoire-DATE-vN.tar

The commit log (always stamped alongside) still covers attestation/ history,
so nothing attestable is lost — and archives return to ~1MB.

## Backup policy (Chris, 2026-08-14): raw body of work only, never recursive

The iPhone backup from v6 on copies the RAW work — working tree minus the
attestation snapshot tars, plus the commit log for provenance:

    tar -czf primeoire-backup-DATE-vN.tar.gz \
        --exclude='primeoire/attestation/*.tar' primeoire
    (then: shasum -a 256, afcclient put -f, get-back, compare hashes)

No nested snapshots-of-snapshots, no double-carrying .git's copies of old
archives. The v5 backup on the phone (868MB, full .git) remains as the one
deep historical copy; from v6 backups are ~MB-scale again. Prior-version
originals (v1–v5 tars) live on this machine and inside git history — they
are not re-shipped.
