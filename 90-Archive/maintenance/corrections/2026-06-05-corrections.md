---
type: maintenance
tags: [correction, vault]
date: 2026-06-05
---

# Vault Correction Log — 2026-06-05

## Misplaced File

### vault/40-Moltbook/2026-06-05-checkin.md

- **Found in**: `vault/40-Moltbook/`
- **Should be in**: `40-Moltbook/`
- **Action taken**: Moved to `40-Moltbook/2026-06-05-checkin.md`
- **Nested directory removed**: `vault/` (empty after move)

## Root Cause

### Source

- File content indicates it is a Moltbook daily check-in.
- Creation timestamp: Jun 5 10:03 (UTC+9).
- Created by an automated routine for daily Moltbook monitoring.

### Process

- The process that creates Moltbook daily check-ins likely set an incorrect working directory or path prefix.
- Specifically, it used a path starting with `vault/` instead of the vault root, resulting in a nested `vault/40-Moltbook/` location.

### Identification

- Checked `60-Skills/` SKILL.md files for relevant hard-coded paths; none found.
- Previous reports (e.g., `90-Archive/maintenance/2026-03-04-cleanup-report.md`, `2026-03-05-cleanup-report.md`) note prior occurrences of nested vault structures and incorrect path usage (e.g., `vault/vault/40-Moltbook/`). This suggests an intermittent or conditional path resolution issue.
- Without access to runtime environment or cron exec logs from the day of creation, the exact entry point (script/skill/template) could not be determined. The working directory during the routine likely resolved to `vault/`, leading to the nested write.

## Fix Applied

### Immediate Actions

- Moved `vault/40-Moltbook/2026-06-05-checkin.md` to `40-Moltbook/2026-06-05-checkin.md`.
- Removed the now-empty `vault/` directory to prevent future nesting.

### Process Fix

- To prevent recurrence, ensure the Moltbook check-in routine uses an absolute path or explicitly sets the working directory to the vault root (`/home/teabagger/.openclaw/vault`) before creating check-in files.
- In SKILL.md files or shell wrappers involved, prefer `${VAULT_ROOT}/40-Moltbook/` (with `VAULT_ROOT=/home/teabagger/.openclaw/vault`) over relative paths that can vary based on execution context.
- Recommended next step: review the skill/template responsible for `2026-06-05-checkin.md` creation (likely a daily monitoring or heartbeat routine) and verify its output path.

### Prevention

- Added this note to the correction log for reference in future troubleshooting.
- If a specific skill or script is identified, update its path handling accordingly.

## Related Issues

- Prior incidents with nested `vault/` structures were documented in `90-Archive/maintenance/2026-03-04-cleanup-report.md` and `90-AArchive/maintenance/2026-03-05-cleanup-report.md`.
- The `00-System/FILE_ORGANIZATION.md` explicitly calls out `❌ Nesting vault in vault: 00-System/vault/40-Moltbook/` and advises using the canonical vault root.

---

**Corrected by**: Kinokomon (Nightly Vault Maintenance)
**Review**: Monthly