---
type: maintenance-correction
tags: [system, vault, correction, log]
date: 2026-03-06
---

# Vault Maintenance Corrections — 2026-03-06

## Issues Found and Corrected

### Issue 1: Nested Vault Structure (CRITICAL - ONGOING)
**Severity**: High
**Structure Found**: `/home/teabagger/.openclaw/vault/vault/40-Moltbook/`
- **Directory Created**: 2026-03-03 16:03:54 JST
- **Last Modified**: 2026-03-06 00:07:14 JST (ACTIVE - TODAY)
- **Files**: 8 engagement files
  - 2026-03-03-engagement.md (5.6K, older/different version of main vault file 8.3K)
  - 2026-03-04-engagement.md (3.3K, shorter version)
  - 2026-03-04-engagement-2.md (4.0K, redundant run report)
  - 2026-03-04-engagement-3.md (4.0K, redundant run report)
  - 2026-03-05-engagement.md (8.5K, different version from main 5.5K)
  - 2026-03-05-engagement-2.md (11K, NOT in main vault - unique file)
  - 2026-03-06-engagement.md (16K, NOT in main vault - unique file)
  - moltbook-math-challenges.md (1.9K, duplicate)

**Action Required**: Identify and fix the process writing to `vault/vault/40-Moltbook/` instead of `40-Moltbook/`

**Analysis**:
- This nested structure is ACTIVE - new files created today (2026-03-06)
- Some files are duplicates of main vault files but older/shorter
- Some files are UNIQUE and NOT in main vault (2026-03-05-engagement-2.md, 2026-03-06-engagement.md)
- Pattern suggests a cron job or skill using incorrect base path
- The process is likely using absolute path: `/home/teabagger/.openclaw/vault/vault/40-Moltbook/`
  or relative path from wrong directory

**Root Cause**: UNKNOWN - Process actively writing to wrong location

**Process Fix Required**:
1. Identify which skill/command creates Moltbook engagement files
2. Check for absolute paths in skill configuration
3. Check cron job configurations for Moltbook tasks
4. Verify all paths are relative from workspace root
5. Test fix: ensure files write to `40-Moltbook/` not `vault/vault/40-Moltbook/`

**Immediate Action Needed**:
- The unique files in nested vault (2026-03-05-engagement-2.md, 2026-03-06-engagement.md) should be moved to main `40-Moltbook/`
- Process must be identified and fixed immediately to prevent continued duplication

### Issue 2: Duplicate System Files in Vault Root (MEDIUM)
**Severity**: Medium
**Files Found** (duplicates of 00-System/ files):
- AGENTS.md (7.9K, created 2026-03-03 12:03)
- SOUL.md (1.7K, created 2026-03-03 12:03)
- USER.md (477B, created 2026-03-03 12:03)
- IDENTITY.md (636B, created 2026-03-03 12:03)
- TOOLS.md (860B, created 2026-03-03 12:03)
- HEARTBEAT.md (168B, created 2026-03-03 12:03)
- README.md (1.7K, created 2025-02-22 - legitimate, keep)

**Action**: Move duplicates to archive or remove (00-System/ has authoritative versions)

**Root Cause**: Unknown - process created these on 2026-03-03 12:03

**Analysis**:
- All duplicate files created at same time: 2026-03-03 12:03:54 JST
- Likely same process that created nested vault structure (2026-03-03 16:03:54)
- Pattern suggests initialization or configuration script running incorrectly

**Process Fix Required**:
- Identify what process creates these system file copies
- Likely a bootstrap or initialization script
- Fix to write only to 00-System/ or skip copying to root

### Issue 3: No Files Ready for Archiving (INFO)
**Status**: ✅ PASS - No files meet age criteria
**Analysis**:
- Daily files (10-Daily/2026/02/): Created February 2026 (~40 days ago)
  - Requirement: Archive older than 60 days (2 months)
  - Result: Too recent, keep in place
- Summaries, Engagements, Moltbook: All files from February/March 2026
  - Requirement: Archive older than 90 days
  - Result: Too recent, keep in place
- Kenkoumon: All files recent
  - Requirement: Archive older than 180 days
  - Result: Too recent, keep in place

### Issue 4: Absolute Path References Found (LOW PRIORITY)
**Severity**: Low (informational)
**Files with absolute paths**:
- 00-System/FILE_ORGANIZATION.md (3 occurrences - documentation examples, OK)
- 00-System/VAULT_MAINTENANCE.md (1 occurrence - documentation examples, OK)
- 10-Daily/2026/03/2026-03-01-briefing.md (2 occurrences - error logs)
- 10-Daily/2026/03/2026-03-02-briefing.md (1 occurrence - error logs)
- 40-Moltbook/2026-02-24-governance-experiment-proposal.md (1 occurrence)
- 60-Skills/bio-hp-kinokomon-orchestrator/SKILL.md (1 occurrence - documentation, OK)
- 90-Archive/daily/2026-03/2026-03-01-briefing.md (2 occurrences - archived error logs)
- 90-Archive/maintenance/2026-03-04-cleanup-report.md (4 occurrences - report examples)
- 90-Archive/maintenance/2026-03-05-cleanup-report.md (2 occurrences - report examples)
- 90-Archive/maintenance/corrections/2026-03-04-corrections.md (1 occurrence)
- 90-Archive/maintenance/corrections/2026-03-05-corrections.md (1 occurrence)

**Analysis**:
- Most absolute paths are in documentation/examples (FILE_ORGANIZATION.md, VAULT_MAINTENANCE.md)
- Some are in error logs from previous issues (can stay as historical record)
- One in governance-experiment-proposal.md should be checked

**Action**: Review governance-experiment-proposal.md absolute path reference for correctness

### Issue 5: Duplicate Filenames Across Directories (EXPECTED)
**Status**: ✅ ACCEPTABLE - These are intentional duplicates
**Duplicate filenames found**:
- AGENTS.md: 00-System/ (authoritative), vault root (duplicate - Issue 2)
- SOUL.md: 00-System/ (authoritative), vault root (duplicate - Issue 2)
- USER.md: 00-System/ (authoritative), vault root (duplicate - Issue 2)
- SKILL.md: 60-Skills/bio-hp-kinokomon-orchestrator/, 60-Skills/bio-hp-orchestrator/ (different skills, OK)
- IDENTITY.md: 00-System/ (authoritative), vault root (duplicate - Issue 2)
- TOOLS.md: 00-System/ (authoritative), vault root (duplicate - Issue 2)
- HEARTBEAT.md: 00-System/ (authoritative), vault root (duplicate - Issue 2)
- 2026-03-01-briefing.md: 10-Daily/2026/03/ (main), 90-Archive/daily/2026-03/ (archive, OK)
- moltbook-math-challenges.md: 40-Moltbook/ (main), vault/vault/40-Moltbook/ (nested duplicate)
- 2026-03-03-engagement.md: 40-Moltbook/ (main, 8.3K), vault/vault/40-Moltbook/ (nested, 5.6K, older)
- 2026-03-04-engagement.md: 40-Moltbook/ (main, 7.9K), vault/vault/40-Moltbook/ (nested, 3.3K, older)
- 2026-03-05-engagement.md: 40-Moltbook/ (main, 5.5K), vault/vault/40-Moltbook/ (nested, 8.5K, DIFFERENT)

**Analysis**:
- System file duplicates in vault root are already tracked in Issue 2
- Briefing duplicate in archive is expected (archived copy)
- SKILL.md duplicates are different skills, which is correct
- Moltbook engagement duplicates in nested vault are tracked in Issue 1

---

## Issues Monitored (From Previous Runs)

### Issue: Morning Briefing Misplaced (Previously Recurring)
**Status**: ✅ RESOLVED - No dated briefing files found in 00-System/ today
**Last Seen**: 2026-03-04
**Expected**: Briefings now in 10-Daily/2026/03/

### Issue: Moltbook Engagement Misplaced (Previously Recurring)
**Status**: ✅ RESOLVED - No engagement files found in 00-System/ today
**Last Seen**: 2026-03-04
**Expected**: Engagements now in 40-Moltbook/

### Issue: Biz-Idea File in Vault Root
**Status**: ✅ RESOLVED - No new biz-idea files in vault root since 2026-03-05 correction
**Last Seen**: 2026-03-05

---

## Critical Process Issues

### Issue: Nested Vault Structure Actively Being Written To
**First Seen**: 2026-03-05 (directory created 2026-03-03)
**Status**: 🚨 ACTIVE - New file created TODAY (2026-03-06 00:07:14)
**Pattern**: Nested `vault/` directory at vault root with `40-Moltbook/` inside
**Impact**:
  - Creates duplicate files and confusion
  - Some files are UNIQUE and exist ONLY in nested structure
  - Some files in main vault are OLDER/SHORTER than nested versions
  - Breaks organizational structure defined in FILE_ORGANIZATION.md

**Unique Files in Nested Vault** (NOT in main 40-Moltbook/):
- 2026-03-05-engagement-2.md (11K) - Additional engagement session
- 2026-03-06-engagement.md (16K) - Today's engagement session

**Files Where Nested Version is NEWER/LARGER**:
- 2026-03-05-engagement.md: nested 8.5K vs main 5.5K (nested has more content)

**Process Investigation Required**:
1. Check all Moltbook-related skills for path configurations
2. Review cron jobs that might create engagement files
3. Check for scripts using absolute paths or wrong working directory
4. Search for "vault/40-Moltbook" or "vault/vault" in skill configurations
5. Review BOOTSTRAP.md for any path instructions
6. Check Discord channel configurations for #moltbook

**Suspected Sources**:
- Moltbook engagement skill/agent
- Nightly cron job for Moltbook
- Discord bot configuration for #moltbook channel
- Manual engagement process with incorrect default path

**Immediate Action Required**:
1. Move unique files from nested vault to main 40-Moltbook/:
   - 2026-03-05-engagement-2.md → 40-Moltbook/
   - 2026-03-06-engagement.md → 40-Moltbook/
2. Compare 2026-03-05-engagement.md versions and merge if needed
3. Identify and fix the process creating nested structure
4. Remove entire nested vault directory after process is fixed

---

## Files to Monitor

### Next Maintenance Check (2026-03-07)
Watch for:
- New files in nested `vault/vault/40-Moltbook/` directory 🚨
- New files in vault root (except system files)
- New dated files in 00-System/
- Biz-ideas files appearing in wrong locations
- Any new nested directory structures

### Success Criteria
- ✅ No new files in nested vault structure
- ✅ Process identified and fixed to write to 40-Moltbook/
- ✅ Nested vault directory removed or emptied
- ✅ All system file copies removed from vault root
- ✅ All Moltbook engagement files in main 40-Moltbook/

---

## Recommendations

### Priority 1: Fix Moltbook Engagement Process
1. Search all skill files for "vault/40-Moltbook" or absolute paths
2. Check Discord channel configs for #moltbot path settings
3. Review cron jobs that might trigger engagement sessions
4. Test engagement process to verify it writes to correct location
5. Document correct path in SKILL.md and FILE_ORGANIZATION.md

### Priority 2: Move Unique Files
1. Move 2026-03-05-engagement-2.md from nested vault to main 40-Moltbook/
2. Move 2026-03-06-engagement.md from nested vault to main 40-Moltbook/
3. Compare 2026-03-05-engagement.md versions and merge content if nested has more

### Priority 3: Clean Up Duplicate System Files
1. Remove duplicate system files from vault root (keep 00-System/ versions)
2. Investigate what process created them on 2026-03-03 12:03

### Priority 4: Review Absolute Path References
1. Check governance-experiment-proposal.md absolute path
2. Update any non-documentation absolute paths to relative paths

---

*Correction log created: 2026-03-06 03:00 JST*
*Next review: 2026-03-07 03:00 JST*
