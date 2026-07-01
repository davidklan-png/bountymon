# Vault Maintenance Guide

**Last updated:** 2026-05-13
**Frequency:** Nightly (cron scheduled at 03:00 JST)
**Purpose:** Keep vault clean, organized, and performant

## Process Overview

1. **Structure validation** — detect and fix misplaced files
2. **Archive old files** — move dated content to 90-Archive/
3. **Duplicate detection** — find and merge/rename duplicates
4. **Process tracking** — identify and fix root causes
5. **Generate report** — summary to #monitoring + detailed report

## Directory Structure

```
vault/
├── 00-System/          # NEVER archive (AGENTS.md, SOUL.md, USER.md, etc.)
├── 10-Daily/           # Daily tasks and notes
├── 20-Summaries/       # Summary files
├── 30-Biz-Ideas/       # Business ideas and projects
├── 40-Moltbook/        # Moltbook content
├── 50-Monitoring/      # Monitoring logs and reports
├── 60-Skills/          # Skill definitions (NEVER archive)
├── 70-Engagements/     # LinkedIn and other engagement files
├── 80-Kenkoumon/       # Kenkoumon workspace
├── 90-Archive/         # Archived content (by type/YYYY-MM/)
│   ├── biz-ideas/
│   ├── daily/
│   ├── engagements/
│   ├── errors/
│   ├── kenkoumon/
│   ├── maintenance/
│   ├── moltbook/
│   ├── monitoring/
│   └── summaries/
├── bountymon/          # Bountymon workspace
├── memory/             # Daily logs (YYYY-MM-DD.md format)
├── state/              # State and cache files
└── workspace/          # Workspace project files
```

## 1. Structure Validation

### Check for dated files in 00-System/
Files with `date: YYYY-MM-DD` frontmatter should NOT be in `00-System/`. They belong in:
- `memory/` — if daily log format
- `90-Archive/daily/YYYY-MM/` — if old daily log
- `90-Archive/summaries/YYYY-MM/` — if summary
- `90-Archive/engagements/YYYY-MM/` — if engagement
- `90-Archive/moltbook/YYYY-MM/` — if Moltbook content

### Check for nested vault structures
Should NEVER have:
- `00-System/vault/`
- `00-System/40-Moltbook/`
- `00-System/50-JTES/`
- Any other nested directory from parent

### Check for absolute path references
Search for:
- `/home/teabagger/` in frontmatter or links
- Hardcoded paths that break on other machines

## 2. Archive Old Files

### Archive Rules

| Type | Source | Destination | Age Threshold |
|------|--------|-------------|---------------|
| Daily logs | `memory/` | `90-Archive/daily/YYYY-MM/` | > 2 months |
| Summaries | `20-Summaries/` | `90-Archive/summaries/YYYY-MM/` | > 90 days |
| Engagements | `70-Engagements/` | `90-Archive/engagements/YYYY-MM/` | > 90 days |
| Moltbook | `40-Moltbook/` | `90-Archive/moltbook/YYYY-MM/` | > 90 days |
| Kenkoumon dev logs | `80-Kenkoumon/` | `90-Archive/kenkoumon/YYYY-MM/` | > 180 days |
| Biz ideas | `30-Biz-Ideas/` | `90-Archive/biz-ideas/YYYY-MM/` | > 180 days |
| Monitoring | `50-Monitoring/` | `90-Archive/monitoring/YYYY-MM/` | > 180 days |

### NEVER Archive
- `00-System/` — core system files
- `60-Skills/` — skill definitions
- Files modified in last 24 hours
- Files without clear date frontmatter

### Archive Command Template
```bash
# Create destination directory
mkdir -p /home/teabagger/.openclaw/vault/90-Archive/<type>/$(date +%Y-%m)

# Move old files
find /home/teabagger/.openclaw/vault/<source> \
  -type f -name "*.md" \
  -mtime +<days> \
  -exec mv {} /home/teabagger/.openclaw/vault/90-Archive/<type>/$(date +%Y-%m)/ \;
```

## 3. Duplicate Detection

### Find duplicate filenames
```bash
find /home/teabagger/.openclaw/vault -name "*.md" -type f -printf "%f\n" | sort | uniq -d
```

### Compare content
For each duplicate filename:
- If content identical → keep newest, remove older
- If content different → rename with suffix (e.g., `file-v2.md`)
- If nested duplicate directory → consolidate

### Remove nested duplicate directories
```bash
find /home/teabagger/.openclaw/vault -type d -name "vault" -o -name "40-Moltbook" | while read dir; do
  # Check if nested inside another vault directory
  parent=$(dirname "$dir")
  if [[ "$parent" == *"vault"* ]]; then
    echo "NESTED: $dir inside $parent"
  fi
done
```

## 4. Process Tracking

When misplaced file found:

### a. Identify source
- Check frontmatter for `type`, `tags`, `created`, `updated`
- Check session logs for file creation
- Check cron logs for automation outputs

### b. Identify process
- Which skill created it?
- Which command/script generated it?
- Which Discord channel triggered it?

### c. Fix process
- Update skill docs with correct output path
- Update BOOTSTRAP.md with correct structure
- Update cron config with correct working directory
- Add validation to prevent future issues

### d. Log correction
Create: `90-Archive/maintenance/corrections/YYYY-MM-DD-corrections.md`
```markdown
---
type: maintenance
tags: [correction, vault]
date: YYYY-MM-DD
---

# Vault Correction Log

## Misplaced File
- **File**: path/to/file.md
- **Found in**: wrong/directory/
- **Should be in**: correct/directory/

## Root Cause
- **Process**: skill/command/cron
- **Source**: channel/script
- **Reason**: why it happened

## Fix Applied
- Moved file to: correct/directory/
- Updated: file/doc/config
- Prevention: what changed
```

## 5. Generate Report

### Summary to #monitoring
```
🧹 Vault Maintenance Complete
⏱️ Duration: X min
📁 Files checked: N
📦 Files archived: N
🔄 Files moved: N
👯 Duplicates resolved: N
🔧 Processes fixed: N

Full report: 90-Archive/maintenance/YYYY-MM-DD-cleanup-report.md
```

### Detailed Report
Save to: `90-Archive/maintenance/YYYY-MM-DD-cleanup-report.md`

Include:
- Start/end time
- All checks performed
- Every file moved/archived (with reason)
- All duplicates found/resolved
- All processes fixed
- Recommendations for future

## Safety Rules

1. **Never delete files** — only archive or move
2. **Never archive recent files** — skip if modified < 24h
3. **Never archive core directories** — protect 00-System/, 60-Skills/
4. **When in doubt, don't move** — ask or document in report
5. **Keep audit trail** — log every change

## Common Issues

### Issue: Daily logs accumulating
**Symptom:** Too many `memory/YYYY-MM-DD.md` files
**Fix:** Archive to `90-Archive/daily/YYYY-MM/` (keep 2 months in memory/)

### Issue: Nested vault structure
**Symptom:** Files in `00-System/vault/` or similar
**Fix:** Move to correct location, update process that created it

### Issue: Non-standard archive directory
**Symptom:** `memory/archive/` or similar directories created by ad-hoc processes
**Fix:** Move files to `90-Archive/daily/YYYY-MM/`, remove non-standard directory, update process
**Example:** 2026-05-13 - Found `memory/archive/` with 9 March logs, moved to proper location

### Issue: Duplicate summaries
**Symptom:** Multiple files with same name in different directories
**Fix:** Compare content, merge if identical, rename if different

### Issue: Absolute paths
**Symptom:** Hardcoded `/home/teabagger/` in files
**Fix:** Replace with relative paths or `~/.openclaw/` references

## Cron Job

```cron
# Vault maintenance - daily at 03:00 JST
0 3 * * * cd /home/teabagger/.openclaw/vault && openclaw agents trigger kinokomon "Run nightly vault maintenance"
```

## Related Documentation

- `AGENTS.md` — Agent roles and session rules
- `SOUL.md` — Agent identity and behavior
- `USER.md` — User preferences and context
- `MEMORY.md` — Long-term memories (main session only)
- `memory/YYYY-MM-DD.md` — Daily logs
- `90-Archive/maintenance/corrections/YYYY-MM-DD-corrections.md` — Correction logs
- `90-Archive/maintenance/YYYY-MM-DD-cleanup-report.md` — Maintenance reports

---

**Version:** 1.1
**Maintainer:** Kinokomon
**Review:** Monthly

## Changelog

### v1.1 (2026-05-13)
- Updated directory structure to match actual vault layout
- Added business ideas, monitoring, and engagements to archive rules
- Added issue documentation for non-standard archive directories
- Added references to correction logs and maintenance reports

### v1.0 (2026-05-13)
- Initial documentation
- Defined structure validation, archival, duplicate detection, and process tracking
- Established safety rules and compliance checklist
