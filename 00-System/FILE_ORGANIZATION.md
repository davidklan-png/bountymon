---
type: system
tags: [system, vault, organization, rules]
updated: 2026-03-01
---

# File Organization Rules

This document defines where files should be saved in the vault structure.

## Directory Structure

```
vault/
├── 00-System/          # System configuration (NOT dated files)
│   ├── AGENTS.md       # Agent definitions
│   ├── BOOTSTRAP.md    # Channel bootstrap instructions
│   ├── HEARTBEAT.md    # Scheduled jobs
│   ├── IDENTITY.md     # Agent identity
│   ├── LINKEDIN_SETUP.md
│   ├── MEMORY.md       # Memory architecture
│   ├── SOUL.md         # Personality/tone
│   ├── TOOLS.md        # Tool usage notes
│   └── USER.md         # User profile
│
├── 10-Daily/           # Daily briefings and logs
│   ├── 2026/
│   │   ├── 02/
│   │   │   ├── 2026-02-23-briefing.md
│   │   │   └── 2026-02-23-afternoon-update.md
│   │   └── 03/
│
├── 20-Summaries/       # Content summaries
│   ├── web/            # Web page summaries
│   └── video/          # Video summaries
│
├── 30-Biz-Ideas/       # Business research
│   ├── discovery/      # Initial research
│   └── plans/          # Full plans
│
├── 40-Moltbook/        # Moltbook activity
│   ├── 2026-02-24-engagement.md
│   └── moltgov-experiment-tracker.md
│
├── 50-Monitoring/      # System monitoring logs
│
├── 60-Skills/          # Agent skills
│   └── bio-hp-orchestrator/
│
├── 70-Engagements/     # Engagement tracking
│   ├── INDEX.md
│   └── TEMPLATE.md
│
└── 80-Kenkoumon/       # Kenkoumon project
    ├── INDEX.md
    ├── development/
    ├── deployments/
    └── issues/
```

## Rules

### Rule 1: No Dated Files in 00-System/
- **WRONG**: `00-System/2026-02-28-engagement.md`
- **RIGHT**: `40-Moltbook/2026-02-28-engagement.md`

00-System/ is ONLY for system configuration files (AGENTS.md, BOOTSTRAP.md, etc.)

### Rule 2: No Nested Vault Structures
- **WRONG**: `00-System/40-Moltbook/`
- **RIGHT**: `40-Moltbook/`

Never nest vault directories inside other vault directories.

### Rule 3: Dated Files Go to Appropriate Directory
- **Briefings**: `10-Daily/YYYY/MM/YYYY-MM-DD-briefing.md`
- **Engagements**: `40-Moltbook/YYYY-MM-DD-engagement.md`
- **Summaries**: `20-Summaries/web/YYYY-MM-DD-slug.md`
- **Business ideas**: `30-Biz-Ideas/discovery/YYYY-MM-DD-idea.md`

### Rule 4: Use Relative Paths
When writing files, use relative paths from workspace root:
- **WRONG**: `/home/teabagger/.openclaw/vault/40-Moltbook/file.md`
- **RIGHT**: `40-Moltbook/file.md`

### Rule 5: Check for Existing Directories
Before creating new directory structure, check if sibling directory exists:
```bash
ls /home/teabagger/.openclaw/vault/
```

## Channel → Directory Mapping

| Channel | Directory | Purpose |
|---------|-----------|---------|
| `#general` | 00-System/ | System config |
| `#summaries` | 20-Summaries/ | Content summaries |
| `#moltbook` | 40-Moltbook/ | Moltbook activity |
| `#biz_ideas` | 30-Biz-Ideas/ | Business research |
| `#monitoring` | 50-Monitoring/ | System logs |
| `#briefing` | 10-Daily/ | Daily briefings |
| `#kinokoholic` | (website repo) | Bio_HP updates |
| `#linkedin` | 70-Engagements/ | Engagement tracking |
| `#kenkoumon` | 80-Kenkoumon/ | Kenkoumon project |

## Quick Reference

**System files** → `00-System/`
- Agent config, bootstrap, heartbeat, identity, memory, soul, tools, user

**Daily logs** → `10-Daily/YYYY/MM/`
- Briefings, daily summaries, afternoon updates

**Content summaries** → `20-Summaries/web/` or `20-Summaries/video/`
- Web page summaries, video summaries

**Business research** → `30-Biz-Ideas/discovery/` then `30-Biz-Ideas/plans/`
- Discovery phase, full plans

**Moltbook activity** → `40-Moltbook/`
- Engagement reports, experiments, ghost hunts

**System monitoring** → `50-Monitoring/`
- Health checks, cron job logs, alerts

**Agent skills** → `60-Skills/<skill-name>/`
- SKILL.md, references/, scripts/, assets/

**Engagement tracking** → `70-Engagements/`
- Platform engagements, response proposals

**Kenkoumon project** → `80-Kenkoumon/`
- Development logs, deployments, issues

## Common Mistakes

❌ **Nesting vault in vault**: `00-System/vault/40-Moltbook/`
✅ **Flat structure**: `40-Moltbook/`

❌ **Absolute paths**: `/home/teabagger/.openclaw/vault/...`
✅ **Relative paths**: `40-Moltbook/file.md`

❌ **Dated files in System**: `00-System/2026-02-28-briefing.md`
✅ **Dated files in proper dir**: `10-Daily/2026/02/2026-02-28-briefing.md`

❌ **Creating new top-level dirs without checking**
✅ **Use existing sibling directories**

---

*Last updated: 2026-03-01*
*Purpose: Prevent file organization failures in future*
