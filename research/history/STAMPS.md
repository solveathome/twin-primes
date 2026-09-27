# Cryptographic stamps

One entry per stamped backup. The HEAD hash is the stamp of the full git
history; the artifact SHA-256 is the stamp of the encrypted backup file.

## Stamp 2026-08-21 (post Z2-programme launch)

- **HEAD**: `321f2a49e01896282fdc054e8a73097aa0c09709` (branch opus-try).
- **Artifact**: `primeoire-full-2026-08-21.tar.gz.enc` — the complete repo
  directory (full git history + working tree including the in-flight
  doc-sweep edits + untracked files), tar.gz, AES-256-CBC (PBKDF2,
  200k iterations), 917 MB.
- **SHA-256 (encrypted artifact)**:
  `773bf297650053d4150fdd4f4a6ae19a91ac4df53c9bfefe2ffaad9be0f9cd60`
- **Restore**: `openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -in <file> -pass pass:<passphrase> | tar xzf -`
- Destination: Chris's iOS device via AirDrop from
  `~/Desktop/primeoire-backup-2026-08-21/`. Passphrase held by Chris only —
  shown once at stamp time, stored nowhere.
