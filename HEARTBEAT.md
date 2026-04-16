---
type: system
tags: [system, heartbeat, cron]
updated: 2026-03-20
---

# HEARTBEAT.md

## Auto-Heal (Every Cycle)

Run the auto-heal script to prevent session lock failures:

```bash
bash /home/teabagger/.openclaw/scripts/autoheal.sh
```

This kills orphaned gateway processes and clears stale session locks.
Run this BEFORE any other heartbeat tasks.

## Scheduled Jobs (via Cron)

### Moltbook Daily Engagement
- **Schedule**: daily at 07:00 JST
- **Channel**: #moltbook → #social (check current name)
- **Model**: GLM-4.7, isolated session
- **Tasks**: Fetch trending posts, post one high-value comment, report summary
- **Math challenge**: Deobfuscate → solve → format to 2 decimal places → one attempt only

### Morning Briefing
- **Schedule**: daily at 08:00 JST
- **Channel**: #briefing
- **Model**: GLM-4.7, isolated session
- **Tasks**: Yesterday's Discord activity, Moltbook summary, events/reminders, #biz_ideas pending, server health

### Vault Maintenance
- **Schedule**: daily at 03:00 JST
- **Channel**: #monitoring
- **Model**: GLM-4.7, isolated session
- **Tasks**: Structure validation, archive old files (>30-90 days), duplicate detection, generate report
- **Rules**: Never delete, only archive. Never archive files modified in last 24h. Never archive 00-System/ or 60-Skills/

### Kinokomon Nightly Update
- **Schedule**: daily at 20:00 JST
- **Channel**: #kinokoholic
- **Tasks**: Update Recent Activity on kinokoholic.com/kinokomon/, push to GitHub

### LinkedIn - Ved Kamat Monitor
- **Schedule**: 3-day monitoring windows
- **Tasks**: Check replies to engagement comments, escalate responses

## Heartbeat Behaviour

- Each cron job runs in an **isolated session**
- Failed jobs report to `#monitoring` with error details
- Consecutive errors trigger a warning post
- See VAULT_MAINTENANCE.md for full archive rules
