=== Vault Maintenance Report - 2026-04-21 ===
Started: Tue Apr 21 03:04:54 JST 2026

=== 1. STRUCTURE VALIDATION ===
Checking for nested vault structures...
✓ No nested vault structures found

Checking for dated files in 00-System/...
✓ No dated files in 00-System/

Checking for non-vault content in vault root...
⚠️  Found 6 non-vault files in root (cache/temp files)
  Files: *.xml, *.html
  These should be in a cache/ or state/ directory, not in vault root
  Recommendation: Move to state/feeds/ or create state/cache/

Checking top-level working directories...
  bountymon/ - 1 files
  src/ - 3 files
  state/ - 0 files
  workspace/ - 341 files
  hooks/ - 2 files
  These appear to be working directories, not vault content
  Recommendation: Consider moving these outside the vault or document their purpose

=== 2. ARCHIVING OLD FILES ===

Processing /home/teabagger/.openclaw/vault/10-Daily (older than 60 days)...
  Archived 0 files

Processing /home/teabagger/.openclaw/vault/memory (older than 60 days)...
  Archived 0 files

Processing /home/teabagger/.openclaw/vault/20-Summaries (older than 90 days)...
  Archived 0 files

Processing /home/teabagger/.openclaw/vault/70-Engagements (older than 90 days)...
  Archived 0 files

Processing /home/teabagger/.openclaw/vault/40-Moltbook (older than 90 days)...
  Archived 0 files

Processing /home/teabagger/.openclaw/vault/80-Kenkoumon (older than 180 days)...
  Archived 0 files

=== 3. DUPLICATE DETECTION ===
Checking for duplicate filenames...
✓ No duplicate filenames found

=== MAINTENANCE SUMMARY ===
Duration: 03:04:55
Files checked: 81
Files moved: 0
Files archived: 0
Duplicates resolved: 0
Processes fixed: 0
Issues found: 1

Completed: Tue Apr 21 03:04:55 JST 2026
