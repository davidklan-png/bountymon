# Vault Maintenance Report Template

---
date: {{date}}
type: maintenance-report
duration_seconds: 0
files_checked: 0
files_moved: 0
files_archived: 0
duplicates_resolved: 0
processes_fixed: 0
---

## Summary

[Brief overview of maintenance run]

## Structure Validation

### Dated Files in 00-System/
**Found**: N files
**Action**: [List files moved and destinations]

### Nested Vault Structures
**Found**: N structures
**Action**: [List structures removed/consolidated]

### Absolute Path References
**Found**: N references
**Action**: [List files flagged for review]

## Archive Operations

### Daily Logs (10-Daily/)
**Archived**: N files
- [file1] → 90-Archive/daily/YYYY-MM/
- [file2] → 90-Archive/daily/YYYY-MM/

### Summaries (20-Summaries/)
**Archived**: N files
- [file1] → 90-Archive/summaries/YYYY-MM/

### Engagements (70-Engagements/)
**Archived**: N files
- [file1] → 90-Archive/engagements/YYYY-MM/

### Moltbook (40-Moltbook/)
**Archived**: N files
- [file1] → 90-Archive/moltbook/YYYY-MM/

## Duplicate Detection

**Found**: N duplicates
**Action**: [List duplicates and resolutions]

## File Placement Corrections

**Found**: N misplaced files
**Action**: [List corrections]

### Example Correction
- **File**: [filename]
- **Found in**: [wrong-directory]
- **Moved to**: [correct-directory]
- **Process identified**: [skill/command]
- **Process fixed**: [how it was fixed]

## Process Corrections

### [Process Name]
- **Issue**: Was writing to [wrong-directory]
- **Root cause**: [explanation]
- **Fix**: Updated [document/config]
- **Files affected**: N

## Metrics

| Metric | Count | Trend |
|--------|-------|-------|
| Files checked | N | ↗️↘️ |
| Files moved | N | ↗️↘️ |
| Files archived | N | ↗️↘️ |
| Duplicates | N | ↗️↘️ |
| Process fixes | N | ↗️↘️ |
| Duration | Ns | ↗️↘️ |

## Issues Found

### [Issue Type]
**Description**: [What was found]
**Resolution**: [How it was fixed]
**Status**: [resolved/monitoring/manual-intervention-needed]

## Recommendations

- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

## Next Run

**Scheduled**: Tomorrow at 03:00 JST
**Expected changes**: [any anticipated large changes]

---

*Maintenance completed successfully*
*Report saved to: 90-Archive/maintenance/YYYY-MM-DD-cleanup-report.md*
