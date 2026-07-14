---
type: maintenance
tags: [correction, vault, structure]
date: 2026-07-14
---

# Vault Correction Log — 2026-07-14

## Misplaced Files

### 1. Nested Vault Structure (CRITICAL)

- **Issue**: Nested `vault/` directory found inside main vault
- **Location**: `/home/teabagger/.openclaw/vault/vault/40-Moltbook/2026-07-12-checkin.md`
- **File**: `2026-07-12-checkin.md` (Moltbook check-in)
- **Correct Location**: `/home/teabagger/.openclaw/vault/40-Moltbook/`

## Root Cause

- **Process**: Unknown (possibly manual file placement or script error)
- **Date Created**: July 12, 2026 (based on mtime)
- **Pattern**: Nested vault structure (`vault/vault/`) should never exist

## Fix Applied

1. Moved file to correct location:
   - From: `/home/teabagger/.openclaw/vault/vault/40-Moltbook/2026-07-12-checkin.md`
   - To: `/home/teabagger/.openclaw/vault/40-Moltbook/2026-07-12-checkin.md`

2. Removed nested directories:
   - Removed: `/home/teabagger/.openclaw/vault/vault/40-Moltbook/`
   - Removed: `/home/teabagger/.openclaw/vault/vault/`

## Prevention

- Need to identify which process created this nested structure
- Add validation to scripts that create Moltbook files to ensure they write to `40-Moltbook/` not `vault/40-Moltbook/`
- Consider adding pre-commit hook to check for nested vault structures

## Recommendation

Search for the pattern that created this:
- Check Moltbook check-in scripts
- Check any manual file operations
- Verify working directory in cron jobs and skills

---

*This correction was logged during nightly vault maintenance on 2026-07-14*