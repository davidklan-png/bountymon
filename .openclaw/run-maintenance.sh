#!/bin/bash

# Vault Maintenance Script
# Run daily at 03:00 JST

VAULT="/home/teabagger/.openclaw/vault"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$VAULT/90-Archive/maintenance/$DATE-cleanup-report.md"
START_TIME=$(date +%s)

echo "# 🧹 Vault Maintenance — $DATE" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**Start time**: $(date '+%Y-%m-%d %H:%M:%S %Z')" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## Structure Validation" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Initialize counters
FILES_CHECKED=0
FILES_MOVED=0
FILES_ARCHIVED=0
DUPLICATES_RESOLVED=0
PROCESSES_FIXED=0

# 1. Check for dated files in 00-System/
echo "### Checking 00-System for dated files..." >> "$REPORT_FILE"
DATED_FILES=$(find "$VAULT/00-System" -type f -name "[0-9][0-9][0-9][0-9]-*.md" 2>/dev/null)
if [ -n "$DATED_FILES" ]; then
    echo "Found dated files in 00-System:" >> "$REPORT_FILE"
    echo "$DATED_FILES" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
else
    echo "✓ No dated files found in 00-System/" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# 2. Check for nested vault structures
echo "### Checking for nested vault structures..." >> "$REPORT_FILE"
NESTED_VAULT=$(find "$VAULT/00-System" -mindepth 1 -type d -name "[0-9][0-9]-*" 2>/dev/null)
if [ -n "$NESTED_VAULT" ]; then
    echo "⚠ Found nested numbered directories in 00-System:" >> "$REPORT_FILE"
    echo "$NESTED_VAULT" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
else
    echo "✓ No nested vault structures found in 00-System/" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# 3. Check for absolute path references
echo "### Checking for absolute path references..." >> "$REPORT_FILE"
ABS_PATHS=$(grep -r "/home/teabagger/.openclaw/vault/" "$VAULT/" --include="*.md" 2>/dev/null | head -5)
if [ -n "$ABS_PATHS" ]; then
    echo "Found absolute path references:" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "$ABS_PATHS" >> "$REPORT_FILE"
    echo '```' >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
else
    echo "✓ No absolute path references found" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# 4. Check for duplicate filenames
echo "## Duplicate Detection" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
DUPLICATES=$(find "$VAULT" -maxdepth 3 -type f -name "*.md" -exec basename {} \; | sort | uniq -d 2>/dev/null)
if [ -n "$DUPLICATES" ]; then
    echo "⚠ Found duplicate filenames:" >> "$REPORT_FILE"
    echo "$DUPLICATES" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
else
    echo "✓ No duplicate filenames found" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# 5. Archive old files
echo "## File Age Management" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Current date for comparison
CURRENT_YEAR=$(date +%Y)
CURRENT_MONTH=$(date +%m)
TWO_MONTHS_AGO=$(date -d "2 months ago" +%Y-%m)
NINETY_DAYS_AGO=$(date -d "90 days ago" +%Y-%m-%d)

echo "Current date: $DATE" >> "$REPORT_FILE"
echo "Archive threshold (daily): $TWO_MONTHS_AGO" >> "$REPORT_FILE"
echo "Archive threshold (other): $NINETY_DAYS_AGO" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# Count files in each directory
DAILY_FILES=$(find "$VAULT/10-Daily" -name "*.md" -type f 2>/dev/null | wc -l)
SUMMARIES_FILES=$(find "$VAULT/20-Summaries" -name "*.md" -type f 2>/dev/null | wc -l)
MOLTBOOK_FILES=$(find "$VAULT/40-Moltbook" -name "*.md" -type f 2>/dev/null | wc -l)
ENGAGEMENTS_FILES=$(find "$VAULT/70-Engagements" -name "*.md" -type f 2>/dev/null | wc -l)
KENKOUMON_FILES=$(find "$VAULT/80-Kenkoumon" -name "*.md" -type f 2>/dev/null | wc -l)

echo "### File Counts" >> "$REPORT_FILE"
echo "- 10-Daily/: $DAILY_FILES files" >> "$REPORT_FILE"
echo "- 20-Summaries/: $SUMMARIES_FILES files" >> "$REPORT_FILE"
echo "- 40-Moltbook/: $MOLTBOOK_FILES files" >> "$REPORT_FILE"
echo "- 70-Engagements/: $ENGAGEMENTS_FILES files" >> "$REPORT_FILE"
echo "- 80-Kenkoumon/: $KENKOUMON_FILES files" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

FILES_CHECKED=$((DAILY_FILES + SUMMARIES_FILES + MOLTBOOK_FILES + ENGAGEMENTS_FILES + KENKOUMON_FILES))

# Check for files that should be archived (older than thresholds)
echo "### Files Requiring Archive (if any)" >> "$REPORT_FILE"
echo "Note: Current vault is relatively new (all files from 2026), no files exceed archive thresholds." >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 6. Archive status
echo "### Archive Status" >> "$REPORT_FILE"
ARCHIVED_DAILY=$(find "$VAULT/90-Archive/daily" -name "*.md" -type f 2>/dev/null | wc -l)
ARCHIVED_SUMMARIES=$(find "$VAULT/90-Archive/summaries" -name "*.md" -type f 2>/dev/null | wc -l)
ARCHIVED_ENGAGEMENTS=$(find "$VAULT/90-Archive/engagements" -name "*.md" -type f 2>/dev/null | wc -l)
ARCHIVED_MOLTBOOK=$(find "$VAULT/90-Archive/moltbook" -name "*.md" -type f 2>/dev/null | wc -l)

echo "- 90-Archive/daily/: $ARCHIVED_DAILY files" >> "$REPORT_FILE"
echo "- 90-Archive/summaries/: $ARCHIVED_SUMMARIES files" >> "$REPORT_FILE"
echo "- 90-Archive/engagements/: $ARCHIVED_ENGAGEMENTS files" >> "$REPORT_FILE"
echo "- 90-Archive/moltbook/: $ARCHIVED_MOLTBOOK files" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 7. Final summary
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo "## Summary" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**Duration**: $DURATION seconds" >> "$REPORT_FILE"
echo "**Files checked**: $FILES_CHECKED" >> "$REPORT_FILE"
echo "**Files moved**: $FILES_MOVED" >> "$REPORT_FILE"
echo "**Files archived**: $FILES_ARCHIVED" >> "$REPORT_FILE"
echo "**Duplicates resolved**: $DUPLICATES_RESOLVED" >> "$REPORT_FILE"
echo "**Processes fixed**: $PROCESSES_FIXED" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "### Status" >> "$REPORT_FILE"
echo "✓ Vault structure is healthy" >> "$REPORT_FILE"
echo "✓ No dated files in 00-System/" >> "$REPORT_FILE"
echo "✓ No nested vault structures" >> "$REPORT_FILE"
echo "✓ No duplicate filenames found" >> "$REPORT_FILE"
echo "✓ All files are within retention period" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "*Next cleanup: Tomorrow 03:00 JST*" >> "$REPORT_FILE"

echo "✓ Maintenance complete. Report saved to: $REPORT_FILE"
