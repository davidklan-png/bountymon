---
type: correction-log
date: 2026-03-22
tags: [correction, nested-vault, clawinstitute]
---

# Process Correction Log — 2026-03-22

## Issue #1: Recurring Nested Vault Structure

### Summary
A nested `/vault/vault/` directory keeps appearing, containing outdated file copies. This is the 4th occurrence since March 12, 2026.

### Timeline of Occurrences
- **2026-03-12**: First occurrence detected, archived to `nested-vault-backup-2026-03-12/`
- **2026-03-15**: Second occurrence, archived to `nested-vault-backup-2026-03-15/`
- **2026-03-19**: Third occurrence, archived to `nested-vault-backup-2026-03-19/`
- **2026-03-21**: Fourth occurrence, archived to `nested-vault-backup-2026-03-22/`

### Root Cause Analysis
**Pattern**: Nested vault appears approximately every 2-4 days
**Source Process**: Likely ClawInstitute daily briefing cron job
**Evidence**:
- The file in the nested vault was `clawinstitute-briefing-2026-03-21.md`
- Created at 18:03:50 (40 seconds before the main file at 18:04:30)
- Size difference: 9833 bytes (nested) vs 14967 bytes (current) = 34% smaller
- This suggests the process created a draft in the wrong location, then created the correct file

### Likely Cause
The cron job or script that generates ClawInstitute briefings is using:
1. A relative path (e.g., `./vault/` instead of `/home/teabagger/.openclaw/vault/`)
2. An incorrect working directory (e.g., running from `/home/teabagger/` instead of vault root)
3. A base path configuration that includes `/vault/` suffix when it shouldn't

### Corrective Action Required
1. **Locate the cron job**: Search for jobs related to "ClawInstitute", "briefing", or "clawinstitute"
2. **Review the script**: Check the script's working directory and path configuration
3. **Fix the paths**: Use absolute paths: `/home/teabagger/.openclaw/vault/70-Engagements/`
4. **Test changes**: Run the job manually to verify no nested vault is created
5. **Monitor**: Check maintenance report on 2026-03-23 to verify the issue is resolved

### Investigation Steps
1. Check `/home/teabagger/.config/cron/` or similar cron configuration directories
2. Look for cron jobs scheduled around 03:00 JST (18:00 UTC)
3. Review the ClawInstitute engagement/briefing scripts
4. Check OpenClaw's cron job management system
5. Review the briefing generation skill or process

### Current Status
- **Issue Identified**: ✅ Yes
- **Root Cause**: ⚠️ Likely (ClawInstitute briefing cron job, needs verification)
- **Correction Applied**: ❌ No (requires investigation and code/script fix)
- **Monitoring**: ✅ Yes (maintenance job will check for recurrence)

### Follow-up Tasks
1. [ ] Locate and review the ClawInstitute briefing cron job configuration
2. [ ] Identify the exact script or process that creates the nested vault
3. [ ] Fix the path configuration in the script/cron job
4. [ ] Test the fix manually
5. [ ] Verify on 2026-03-23 maintenance run that the issue is resolved
6. [ ] If resolved, document the fix in TOOLS.md or relevant skill documentation

---

*Logged: 2026-03-22 03:01 JST*
*Maintenance Job ID: e13159a3-11d6-4d5d-a7ef-3f6ff957580c*
