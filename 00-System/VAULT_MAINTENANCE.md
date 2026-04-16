---
type: maintenance
tags: [system, vault, maintenance, cleanup, cron]
updated: 2026-03-01
---

# Vault Maintenance Task

## Purpose

Nightly automated maintenance of the vault structure to ensure:
1. Files are in correct directories
2. Old files are archived
3. No duplicate structures
4. No misplaced files
5. Process corrections tracked

## Maintenance Schedule

**Cron**: Daily at 03:00 JST (low-activity time)
**Duration**: ~2-5 minutes
**Report to**: #monitoring channel

## Tasks

### 1. Structure Validation

**Check for dated files in 00-System/**:
```bash
find vault/00-System -type f -name "[0-9][0-9][0-9][0-9]-*.md"
```
- **Action**: Move to appropriate directory based on tags/content
- **Log**: File path, destination, reason

**Check for nested vault structures**:
```bash
find vault/00-System -type d -name "[0-9][0-9]-*"
```
- **Action**: Move contents to sibling directory, remove empty nested dir
- **Log**: Nested path, files moved, removed structure

**Check for absolute path references**:
```bash
grep -r "/home/teabagger/.openclaw/vault/" vault/ --include="*.md" | head -10
```
- **Action**: Flag for manual review (might break references)
- **Log**: File, line number, context

### 2. File Age Management

**Archive files older than 30 days**:

**Daily logs** (`10-Daily/`):
- Keep: Current month + previous month
- Archive: Older than 2 months → `90-Archive/daily/YYYY-MM/`

**Summaries** (`20-Summaries/`):
- Keep: Last 90 days
- Archive: Older than 90 days → `90-Archive/summaries/YYYY-MM/`

**Engagements** (`70-Engagements/`):
- Keep: Last 90 days
- Archive: Older than 90 days → `90-Archive/engagements/YYYY-MM/`

**Moltbook** (`40-Moltbook/`):
- Keep: Last 90 days
- Archive: Older than 90 days → `90-Archive/moltbook/YYYY-MM/`

**System config** (`00-System/`):
- NEVER archive (permanent files)

**Skills** (`60-Skills/`):
- NEVER archive (permanent files)

**Kenkoumon** (`80-Kenkoumon/`):
- Keep development logs: Last 180 days
- Archive: Older than 180 days → `90-Archive/kenkoumon/YYYY-MM/`

### 3. Duplicate Detection

**Find duplicate filenames**:
```bash
find vault -type f -name "*.md" -exec basename {} \; | sort | uniq -d
```
- **Action**: Compare content, merge if identical, rename if different
- **Log**: Duplicate files, action taken

**Find duplicate directories**:
- Check for nested directories with same names
- Check for `00-System/vault/` vs `vault/`
- **Action**: Consolidate, remove duplicates

### 4. File Placement Validation

**Check tags match directory**:

| File Location | Expected Tags |
|---------------|---------------|
| `10-Daily/` | `daily`, `briefing`, `log` |
| `20-Summaries/` | `summary`, `web`, `video` |
| `30-Biz-Ideas/` | `biz-ideas`, `business`, `discovery` |
| `40-Moltbook/` | `moltbook`, `engagement`, `ghost-hunt` |
| `50-Monitoring/` | `monitoring`, `health`, `alert` |
| `70-Engagements/` | `engagement`, `linkedin`, `moltbook` |
| `80-Kenkoumon/` | `kenkoumon`, `health`, `transcription` |

**Misplaced files**:
- **Action**: Move to correct directory, update process
- **Log**: File, old location, new location, process identified

### 5. Process Tracking

When misplaced file found:

1. **Identify source**:
   - Check file frontmatter for `date`, `tags`, `source`
   - Check recent session logs in `agents/main/sessions/`
   - Check cron job execution logs

2. **Identify process**:
   - Which skill/command created this file?
   - Which channel triggered it?
   - Was it manual or automated?

3. **Fix process**:
   - Update skill documentation
   - Update BOOTSTRAP.md channel instructions
   - Update cron job configuration

4. **Log correction**:
   ```
   vault/90-Archive/maintenance/corrections/YYYY-MM-DD-corrections.md
   ```

## Archive Structure

```
vault/90-Archive/
├── daily/
│   ├── 2025-12/
│   └── 2026-01/
├── summaries/
│   ├── 2025-11/
│   └── 2025-12/
├── engagements/
│   └── 2025-11/
├── moltbook/
│   └── 2025-11/
├── kenkoumon/
│   └── 2026-01/
└── maintenance/
    ├── YYYY-MM-DD-cleanup-report.md
    └── corrections/
        └── YYYY-MM-DD-corrections.md
```

## Report Format

**Posted to #monitoring**:

```markdown
## 🧹 Vault Maintenance — [DATE]

**Duration**: X seconds
**Files checked**: N
**Files moved**: N
**Files archived**: N
**Duplicates resolved**: N
**Processes fixed**: N

### Actions Taken
- Moved: [file] → [destination] (reason)
- Archived: [file] → [archive-path] (age: N days)
- Fixed: [process-name] was writing to wrong directory

### Issues Found
- [Issue description and resolution]

### Process Corrections
- [Process] updated to write to [correct-directory]

---
*Next cleanup: Tomorrow 03:00 JST*
```

## Manual Override

**Force cleanup now**:
```bash
/vault-cleanup
```

**Dry run** (show what would happen):
```bash
/vault-cleanup --dry-run
```

**Skip archiving** (only reorganize):
```bash
/vault-cleanup --no-archive
```

## Exclusions

**Never move or archive**:
- `00-System/*.md` — System configuration
- `60-Skills/**/*.md` — Agent skills
- `README.md` — Repository readme
- `.obsidian/**` — Obsidian config
- Files modified in last 24 hours

## Error Handling

**If maintenance fails**:
1. Log error to `90-Archive/maintenance/errors/`
2. Post alert to #monitoring
3. Do NOT partially complete (rollback if needed)
4. Manual intervention required

**Safe defaults**:
- When in doubt, don't move
- Always preserve file content
- Never delete, only archive
- Keep audit trail

## Metrics Tracked

- Files by directory (trend over time)
- Archive size (should grow slowly)
- Misplaced files found (should decrease over time)
- Process corrections (should decrease over time)
- Maintenance duration (should be <5 minutes)

## Initial Setup

**Create archive structure**:
```bash
mkdir -p vault/90-Archive/{daily,summaries,engagements,moltbook,kenkoumon,maintenance/corrections,errors}
```

**Create maintenance log**:
```bash
touch vault/90-Archive/maintenance/YYYY-MM-DD-cleanup-report.md
```

---

*Created: 2026-03-01*
*Next run: 2026-03-02 03:00 JST*
