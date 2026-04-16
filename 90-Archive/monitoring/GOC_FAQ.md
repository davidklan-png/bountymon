---
type: system
tags: [system, monitoring, faq, goc, guild-operations]
updated: 2026-03-04
---

# GOC Monitoring FAQ

Guild Operations Center (GOC) Monitoring — Frequently Asked Questions

## Overview

GOC Monitoring tracks system health, cron job status, and automated task execution for the Discord guild.

---

## General Questions

### What is GOC Monitoring?

GOC (Guild Operations Center) Monitoring is the automated system that:
- Tracks cron job execution (success/failure)
- Monitors gateway health
- Reports system alerts to #monitoring channel
- Logs maintenance activities
- Tracks vault cleanup operations

### Where are monitoring reports posted?

**Primary channel**: #monitoring (1475119307477356617)

**Report types**:
- Cron job completion notices
- Gateway restart alerts
- Vault maintenance summaries
- System health checks
- Error notifications

### How often does monitoring run?

**Automated checks**:
- **Morning Briefing**: 08:00 JST daily
- **Vault Maintenance**: 03:00 JST daily
- **Kinokomon Update**: 20:00 JST daily
- **Moltbook Engagement**: 07:00 JST daily
- **LinkedIn Checks**: 12:00 and 18:00 JST

---

## Cron Jobs

### What cron jobs are currently active?

| Job Name | Schedule | Channel | Status |
|----------|----------|---------|--------|
| Morning Briefing | 08:00 JST | #briefing | ✅ Active |
| Vault Maintenance | 03:00 JST | #monitoring | ✅ Active |
| Kinokomon Nightly | 20:00 JST | #kinokoholic | ⚠️ Issues |
| Moltbook Engagement | 07:00 JST | #moltbook | ✅ Active |
| LinkedIn Engagement | 12:00, 18:00 JST | #linkedin | ✅ Active |

### How do I check cron job status?

**Via Discord**:
```
/cron-status
```

**Via CLI**:
```bash
openclaw cron list
```

**Via API**:
```bash
curl http://127.0.0.1:18789/cron/list
```

### What happens when a cron job fails?

1. **Error logged** to session
2. **Alert posted** to #monitoring channel
3. **Consecutive error counter** incremented
4. **If 3+ consecutive errors**: Warning posted to #general

### How do I restart a failed cron job?

**Manual trigger**:
```bash
openclaw cron run <job-id>
```

**Or via Discord**:
```
/cron-run <job-name>
```

---

## System Health

### What health metrics are tracked?

**Gateway**:
- Process running (PID check)
- Port binding (18789)
- Loopback connectivity
- Discord WebSocket status

**Memory**:
- QMD backend status
- Embedding model loaded
- Index freshness

**Storage**:
- Vault size
- Archive size
- Disk space available

### How do I check system health?

**Quick check**:
```bash
openclaw status
```

**Detailed check**:
```bash
openclaw doctor
```

**Health endpoint**:
```bash
curl http://127.0.0.1:18789/health
```

### What if the gateway is down?

**Restart gateway**:
```bash
openclaw gateway restart
```

**Check logs**:
```bash
tail -f ~/.openclaw/logs/gateway.log
```

---

## Vault Monitoring

### What is vault maintenance?

Automated nightly cleanup that:
- Validates file structure (no misplaced files)
- Archives old content (30-90 days)
- Detects and removes duplicates
- Fixes processes that write to wrong locations
- Generates cleanup report

**Schedule**: 03:00 JST daily
**Report**: Posted to #monitoring

### How do I check vault health?

**Manual check**:
```bash
/vault-cleanup --dry-run
```

**View maintenance reports**:
- `vault/90-Archive/maintenance/YYYY-MM-DD-cleanup-report.md`

### What files are never archived?

**Permanent files**:
- `00-System/*.md` — System configuration
- `60-Skills/**/*.md` — Agent skills
- `README.md` — Repository readme
- `.obsidian/**` — Obsidian config

---

## Alerts & Notifications

### What types of alerts exist?

**Info** (ℹ️):
- Cron job completed successfully
- Vault maintenance completed
- Gateway restarted

**Warning** (⚠️):
- Cron job failed (recoverable)
- Token expiring soon (<7 days)
- File write failed

**Error** (❌):
- Gateway down
- Multiple consecutive failures
- Critical system error

**Critical** (🚨):
- Database corruption
- Security breach detected
- System unresponsive

### How do I subscribe to alerts?

**All alerts** → #monitoring channel (auto-subscribed)

**Critical alerts only** → Configure in `openclaw.json`:
```json
{
  "alerts": {
    "levels": ["error", "critical"],
    "channels": ["1475119307477356617"]
  }
}
```

### Can I mute alerts temporarily?

**Via Discord**:
```
/alerts mute 1h
```

**Via config**:
```json
{
  "alerts": {
    "muted": true,
    "mutedUntil": "2026-03-04T15:00:00Z"
  }
}
```

---

## Troubleshooting

### Cron job keeps failing

**Steps**:
1. Check error message in #monitoring
2. Review session logs: `~/.openclaw/agents/main/sessions/`
3. Check timeout settings (may need increase)
4. Verify model availability
5. Test manual run: `openclaw cron run <job-id>`

### Gateway won't start

**Steps**:
1. Check port 18789 is free: `lsof -i :18789`
2. Check config validity: `cat openclaw.json | jq .`
3. Check file permissions: `ls -la openclaw.json`
4. Review error logs: `tail -f ~/.openclaw/logs/gateway.log`
5. Reset to defaults: `openclaw wizard --reset`

### Memory search returns empty results

**Steps**:
1. Verify QMD is running: `qmd collection list`
2. Check index exists: `ls ~/.openclaw/agents/main/qmd/xdg-cache/qmd/`
3. Rebuild index: `qmd update && qmd embed`
4. Check config: `cat openclaw.json | grep -A 10 memory`

### Files being written to wrong location

**Steps**:
1. Check VAULT_MAINTENANCE.md for process
2. Run vault cleanup: `/vault-cleanup`
3. Review corrections log: `90-Archive/maintenance/corrections/`
4. Update BOOTSTRAP.md or skill documentation

---

## Performance

### How long should cron jobs take?

| Job | Expected Duration |
|-----|-------------------|
| Morning Briefing | 1-3 minutes |
| Vault Maintenance | 2-5 minutes |
| Kinokomon Update | 3-6 minutes |
| Moltbook Engagement | 2-4 minutes |
| LinkedIn Checks | 1-3 minutes |

**Timeout**: 300 seconds (5 minutes)

### What if a job takes too long?

**Increase timeout** in cron config:
```json
{
  "payload": {
    "timeoutSeconds": 600
  }
}
```

### How do I optimize performance?

1. **Use faster model** for routine tasks (GLM-4.7 vs GLM-5)
2. **Increase timeout** for complex jobs
3. **Reduce context** by archiving old files
4. **Split large jobs** into smaller tasks
5. **Run during low-activity hours** (03:00-06:00 JST)

---

## Configuration

### Where is monitoring config stored?

**File**: `~/.openclaw/openclaw.json`

**Section**: `cron`, `alerts`, `monitoring`

### How do I add a new monitoring job?

1. **Create job definition**:
```bash
openclaw cron add --name "My Job" --schedule "0 10 * * *" --message "Do task X"
```

2. **Or via config**:
```json
{
  "cron": {
    "jobs": [{
      "name": "My Job",
      "schedule": {"kind": "cron", "expr": "0 10 * * *"},
      "sessionTarget": "isolated",
      "payload": {
        "kind": "agentTurn",
        "message": "Do task X"
      }
    }]
  }
}
```

### How do I disable a job temporarily?

```bash
openclaw cron update <job-id> --disable
```

**Re-enable**:
```bash
openclaw cron update <job-id> --enable
```

---

## Logs & History

### Where are logs stored?

**Location**: `~/.openclaw/logs/`

**Types**:
- `gateway.log` — Gateway process logs
- `config-audit.jsonl` — Config changes
- Session logs: `~/.openclaw/agents/main/sessions/`

### How long are logs kept?

**Default retention**:
- Session logs: 30 days
- Gateway logs: 7 days
- Audit logs: 90 days

**Configure retention**:
```json
{
  "logging": {
    "retentionDays": {
      "sessions": 30,
      "gateway": 7,
      "audit": 90
    }
  }
}
```

### How do I view historical alerts?

**Via vault**:
- `vault/50-Monitoring/YYYY-MM-DD-alerts.md`

**Via Discord**:
- Search #monitoring channel history

---

## Security

### Who can access monitoring data?

**By default**:
- Only authenticated users in `users` array
- Token-based API access required
- Discord channels require guild membership

### Are monitoring logs encrypted?

**Vault files**: No (Markdown plaintext)
**Credentials**: Yes (`~/.openclaw/credentials/` with 0o600 permissions)
**API tokens**: Yes (stored in `openclaw.json` with restricted access)

### How do I secure monitoring endpoints?

**Loopback mode** (default):
```json
{
  "gateway": {
    "bind": "loopback",
    "auth": {"mode": "token", "token": "your-secret-token"}
  }
}
```

**Tailscale mode** (for remote access):
```json
{
  "gateway": {
    "bind": "tailscale",
    "tailscale": {"mode": "on"}
  }
}
```

---

## Getting Help

### Where can I find documentation?

**Local docs**: `/usr/lib/node_modules/openclaw/docs/`
**Online docs**: https://docs.openclaw.ai
**Community**: https://discord.com/invite/clawd

### How do I report a monitoring issue?

1. **Check #monitoring** for recent alerts
2. **Search logs** for error details
3. **Run diagnostics**: `openclaw doctor`
4. **Post to #general** with:
   - Error message
   - Steps to reproduce
   - Relevant log excerpts

### What information should I include in bug reports?

- OpenClaw version: `openclaw --version`
- Gateway status: `openclaw gateway status`
- Cron job ID: `openclaw cron list`
- Error message (full text)
- Session logs (last 20 lines)
- Steps to reproduce

---

## Quick Reference

### Common Commands

```bash
# Check status
openclaw status

# List cron jobs
openclaw cron list

# Run job manually
openclaw cron run <job-id>

# Restart gateway
openclaw gateway restart

# View logs
tail -f ~/.openclaw/logs/gateway.log

# Health check
curl http://127.0.0.1:18789/health
```

### Useful Endpoints

- **Health**: `GET /health`
- **Cron list**: `GET /cron/list`
- **Cron status**: `GET /cron/status`
- **Gateway info**: `GET /gateway/info`

### Important Files

- **Config**: `~/.openclaw/openclaw.json`
- **Credentials**: `~/.openclaw/credentials/`
- **Vault**: `~/.openclaw/vault/`
- **Logs**: `~/.openclaw/logs/`
- **Sessions**: `~/.openclaw/agents/main/sessions/`

---

*Last Updated: 2026-03-04*
*Maintained by: Kinokomon GOC System*
*Channel: #monitoring (1475119307477356617)*
