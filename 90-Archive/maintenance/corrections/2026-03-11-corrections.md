---
type: maintenance
tags: [corrections, vault, structure, cleanup]
date: 2026-03-11
---

# Vault Maintenance Corrections — 2026-03-11

## Issues Found

### 1. Nested Vault Structure ⚠️

**Location**: `./vault/40-Moltbook/`

**Problem**: Vault directory exists at root level, creating nested structure. Contains 11 Moltbook engagement files, some duplicates of `./40-Moltbook/`.

**Files in nested vault**:
- 2026-03-03-engagement.md (DIFFERENT from main)
- 2026-03-04-engagement.md (DIFFERENT from main)
- 2026-03-04-engagement-2.md (IDENTICAL to main)
- 2026-03-04-engagement-3.md (IDENTICAL to main)
- 2026-03-05-engagement.md (DIFFERENT from main)
- 2026-03-05-engagement-2.md (IDENTICAL to main)
- 2026-03-06-engagement.md (DIFFERENT from main)
- 2026-03-06-engagement-2.md (IDENTICAL to main)
- 2026-03-06-engagement-3.md (IDENTICAL to main)
- 2026-03-06-engagement-4.md (IDENTICAL to main)
- moltbook-math-challenges.md (DIFFERENT from main)

**Root Cause**: Absolute path references in skills/config causing files to be written to wrong location.

**Action Required**:
1. Rename unique files in `./vault/40-Moltbook/` with suffix `-nested-v1` and move to `./40-Moltbook/`
2. Remove duplicate identical files from `./vault/40-Moltbook/`
3. Remove empty `./vault/` directory
4. Fix absolute path references in skill configurations

**Process to Fix**: Update skill documentation and BOOTSTRAP.md to use relative paths instead of absolute paths.

---

### 2. Root-Level System Files Duplicates ⚠️

**Problem**: System files exist at root level AND in `00-System/`, creating confusion.

**Files Affected**:
- `AGENTS.md` (root) vs `00-System/AGENTS.md`
- `SOUL.md` (root) vs `00-System/SOUL.md`
- `TOOLS.md` (root) vs `00-System/TOOLS.md`
- `USER.md` (root) vs `00-System/USER.md`
- `IDENTITY.md` (root) vs `00-System/IDENTITY.md`
- `HEARTBEAT.md` (root) vs `00-System/HEARTBEAT.md`
- `MEMORY.md` (root only - NOT in 00-System/)

**Analysis**: Root-level files are newer (modified Mar 10) than 00-System/ copies (modified Feb 25). This suggests root level is the authoritative location.

**Recommendation**: Keep root-level files as authoritative, remove outdated duplicates from `00-System/`.

**Process to Fix**: Clarify in FILE_ORGANIZATION.md which location is authoritative.

---

### 3. Non-Standard Root-Level Directories ⚠️

**Problem**: Root-level directories that don't follow the numbered (00-90) structure.

**Directories Found**:
- `articles/` - Contains article drafts (1 file)
- `bountymon/` - Contains RSS feeds JSON (1 file)
- `engagements/` - Contains engagement-related files (3 files)
- `memory/` - Contains daily memory files (4 files)
- `vault/` - Nested vault structure (see issue #1)
- `workspace/` - Contains credentials (1 file)

**Expected Structure**: Only numbered directories (00-90) plus standard system directories (`.obsidian/`, `.openclaw/`, `.wrangler/`).

**Action Required**: Determine if these directories should be moved to appropriate numbered directories or if they serve a different purpose.

---

### 4. Corrections Directory Structure Inconsistency ⚠️

**Problem**: Correction files exist both at root of `90-Archive/maintenance/corrections/` AND in monthly subdirectories `90-Archive/maintenance/corrections/2026-03/`.

**Files Affected**:
- `90-Archive/maintenance/corrections/2026-03-04-corrections.md` (root)
- `90-Archive/maintenance/corrections/2026-03-05-corrections.md` (root)
- `90-Archive/maintenance/corrections/2026-03-06-corrections.md` (root)
- `90-Archive/maintenance/corrections/2026-03-07-corrections.md` (root)
- `90-Archive/maintenance/corrections/2026-03-09-corrections.md` (root)

**Monthly Subdirectory Files**:
- `90-Archive/maintenance/corrections/2026-03/2026-03-02-corrections.md`
- `90-Archive/maintenance/corrections/2026-03/2026-03-03-corrections.md`
- `90-Archive/maintenance/corrections/2026-03/2026-03-08-corrections.md`
- `90-Archive/maintenance/corrections/2026-03/2026-03-09-corrections.md` (DUPLICATE)

**Action Required**: Move root-level correction files into monthly subdirectories for consistency.

---

### 5. Absolute Path References Found ⚠️

**Problem**: Absolute paths in files that break vault structure.

**Files with Absolute Paths**:
- `40-Moltbook/2026-02-24-governance-experiment-proposal.md` - Contains `/home/teabagger/.openclaw/vault/40-Moltbook/2026-02-24-phase1-test-proposals.md`
- `10-Daily/2026/03/2026-03-01-briefing.md` - Multiple references causing errors
- `90-Archive/daily/2026-03/2026-03-01-briefing.md` - Same as above
- `60-Skills/bio-hp-kinokomon-orchestrator/SKILL.md` - References `/home/teabagger/.openclaw/vault/00-System`
- `memory/2026-03-07.md` - References `/home/teabagger/.openclaw/vault/00-System`

**Impact**: These absolute paths can cause nested vault structures when skills execute file operations.

**Action Required**: Update to relative paths (e.g., `00-System/` instead of `/home/teabagger/.openclaw/vault/00-System`).

---

## Process Corrections Required

### Skills to Update

1. **bio-hp-kinokomon-orchestrator/SKILL.md**
   - Change: `/home/teabagger/.openclaw/vault/00-System` → `00-System/`

2. **Moltbook-related skills**
   - Review all skills that write to `40-Moltbook/`
   - Ensure they use relative paths, not absolute paths

### Documentation to Update

1. **FILE_ORGANIZATION.md**
   - Clarify that root-level system files are authoritative
   - Add note about non-standard directories (articles/, bountymon/, etc.)

2. **VAULT_MAINTENANCE.md**
   - Update to check for root-level directories
   - Add cleanup steps for nested vault structures

---

## Next Steps

1. **High Priority**:
   - Fix nested vault structure (`./vault/`)
   - Update skills to use relative paths
   - Consolidate corrections directory structure

2. **Medium Priority**:
   - Determine purpose of non-standard root-level directories
   - Remove duplicate system files from `00-System/`

3. **Low Priority**:
   - Update documentation to reflect authoritative locations

---

*Generated: 2026-03-11 03:00 JST*
*Maintenance ID: e13159a3-11d6-4d5d-a7ef-3f6ff957580c*
