---
type: security-implementation
tags: [security, discord, multi-account, guardrails, operational]
updated: 2026-03-09 22:15
status: ACTIVE
---

# Multi-Account Security Implementation Guide

**Purpose**: Operational guide for maintaining security and isolation between Kinokomon and Bountymon agents in multi-account Discord setup.

**Status**: ✅ ACTIVE - Both agents fully operational as of 2026-03-09

---

## Architecture Overview

### Current Deployment (Single Gateway, Multi-Account)

```
┌─────────────────────────────────────────────────────────────────┐
│                    SINGLE OPENCLAW INSTANCE                      │
│                      Port 18789 (Kinokomon)                      │
│                                                                  │
│  ┌────────────────────┐         ┌────────────────────┐         │
│  │  Kinokomon Agent   │         │  Bountymon Agent   │         │
│  │  ID: main          │         │  ID: bountymon     │         │
│  │  Model: GLM-5      │         │  Model: GLM-4.7    │         │
│  │                    │         │                    │         │
│  │  Workspace:        │         │  Workspace:        │         │
│  │  ~/.openclaw/vault │         │  ~/dev/projects/   │         │
│  │                    │         │  bountymon/vault   │         │
│  └────────────────────┘         └────────────────────┘         │
│           │                              │                      │
└───────────┼──────────────────────────────┼──────────────────────┘
            │                              │
            │ accountId: kinokomon         │ accountId: bountymon
            │                              │
┌───────────▼──────────────┐   ┌───────────▼──────────────┐
│  Kinokomon Bot           │   │  Bountymon Bot           │
│  1475109888353898709     │   │  1480187322577195059     │
│  (@Kinokomon)            │   │  (@Bountymon)            │
└──────────────────────────┘   └──────────────────────────┘
            │                              │
            │                              │
┌───────────▼──────────────┐   ┌───────────▼──────────────┐
│  Kinokomon Server        │   │  Bountymon Server        │
│  1475119306885828870     │   │  1480183575407231091     │
│                          │   │                          │
│  #general                │   │  #welcome                │
│  #summaries              │   │  #bountymon-general      │
│  #moltbook               │   │  #bountymon-hunts        │
│  #biz_ideas              │   │  #bountymon-reports      │
│  #monitoring             │   │  #bountymon-savings      │
│  #briefing               │   │  #bountymon-news         │
│  #kinokoholic            │   │  #bountymon-announce     │
│  #linkedin               │   │                          │
│  #kenkoumon              │   │                          │
└──────────────────────────┘   └──────────────────────────┘
```

---

## Security Configuration

### 1. Discord Multi-Account Setup

**Config Location**: `~/.openclaw/openclaw.json`

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "streaming": "partial",
      "accounts": {
        "kinokomon": {
          "token": "KINOKOMON_BOT_TOKEN_1475109888353898709",
          "guilds": {
            "1475119306885828870": {
              "requireMention": false,
              "users": ["1428166086867816529"]
            }
          }
        },
        "bountymon": {
          "token": "BOUNTYMON_BOT_TOKEN_1480187322577195059",
          "guilds": {
            "1480183575407231091": {
              "requireMention": false,
              "users": ["1428166086867816529"]
            }
          }
        }
      }
    }
  }
}
```

**Security Guarantees:**
- ✅ Each bot token is scoped to its designated guild
- ✅ Bot cannot authenticate to wrong server (Discord-side enforcement)
- ✅ Token isolation prevents cross-account access

---

### 2. Agent Bindings

**Purpose**: Route messages to correct agent based on Discord account

```json
{
  "bindings": [
    {
      "agentId": "main",
      "match": {
        "channel": "discord",
        "accountId": "kinokomon",
        "guildId": "1475119306885828870"
      }
    },
    {
      "agentId": "bountymon",
      "match": {
        "channel": "discord",
        "accountId": "bountymon",
        "guildId": "1480183575407231091"
      }
    }
  ]
}
```

**Routing Logic:**
1. Message arrives from Discord
2. System identifies `accountId` (kinokomon or bountymon)
3. Binding matches `accountId` → `agentId`
4. Message routed to appropriate agent
5. Agent processes with its own workspace/identity

**Security Guarantees:**
- ✅ Automatic routing prevents cross-agent contamination
- ✅ Each agent has isolated session
- ✅ Workspace access controlled at agent level

---

### 3. Agent Definitions

**Kinokomon Agent** (main):
```json
{
  "id": "main",
  "workspace": "/home/teabagger/.openclaw/vault",
  "tools": {
    "fs": {
      "workspaceOnly": false
    }
  }
}
```

**Bountymon Agent**:
```json
{
  "id": "bountymon",
  "workspace": "/home/teabagger/dev/projects/bountymon/vault",
  "model": "zai/glm-4.7",
  "identity": {
    "name": "Bountymon",
    "theme": "bounty marketplace",
    "emoji": "🎯"
  },
  "tools": {
    "fs": {
      "workspaceOnly": true
    }
  }
}
```

**Security Guarantees:**
- ✅ Separate workspace directories
- ✅ Bountymon restricted to workspaceOnly
- ✅ Independent model selection
- ✅ Separate identity/personality

---

## Operational Security Rules

### Rule 1: Message Tool Usage - ALWAYS Specify accountId

**❌ WRONG - Ambiguous (will use default/main agent):**
```json
{
  "action": "send",
  "channel": "discord",
  "target": "1480184206108659832",
  "message": "Hello from Bountymon"
}
```

**✅ CORRECT - Explicit accountId for Bountymon:**
```json
{
  "action": "send",
  "channel": "discord",
  "accountId": "bountymon",
  "target": "1480184206108659832",
  "message": "Hello from Bountymon"
}
```

**✅ CORRECT - Explicit accountId for Kinokomon:**
```json
{
  "action": "send",
  "channel": "discord",
  "accountId": "kinokomon",
  "target": "1475119307477356619",
  "message": "Hello from Kinokomon"
}
```

**Rationale:**
- Prevents accidental cross-server posting
- Makes routing explicit and auditable
- Provides defense-in-depth alongside bindings

---

### Rule 2: File System Access - Respect Workspace Boundaries

**Kinokomon (main agent):**
- ✅ CAN access: `/home/teabagger/.openclaw/vault/`
- ✅ CAN access: `/tmp/`, `/home/teabagger/dev/` (with workspaceOnly: false)
- ❌ SHOULD NOT access: `/home/teabagger/dev/projects/bountymon/vault/` (unless coordination needed)

**Bountymon Agent:**
- ✅ CAN access: `/home/teabagger/dev/projects/bountymon/vault/`
- ✅ CAN access: `/tmp/` (workspaceOnly: true allows temp access)
- ❌ CANNOT access: `/home/teabagger/.openclaw/vault/` (blocked by workspaceOnly)

**Guardrail Implementation:**
```markdown
## In BOOTSTRAP.md for each agent

### Workspace Guard

Before file operations:
1. Check current workspace path
2. Verify operation is within allowed workspace
3. IF cross-workspace access needed:
   - Log the access
   - Use read-only mode
   - Never write to other agent's workspace
```

---

### Rule 3: Discord Channel Mapping

**Kinokomon Channels** (Server: 1475119306885828870):

| Channel | ID | Purpose | accountId |
|---------|-------|---------|-----------|
| #general | 1475119307477356619 | General assistant | kinokomon |
| #summaries | - | Content summarization | kinokomon |
| #moltbook | - | Moltbook engagement | kinokomon |
| #biz_ideas | - | Business research | kinokomon |
| #monitoring | - | System health | kinokomon |
| #briefing | - | Daily briefings | kinokomon |
| #kinokoholic | 1475800859278315592 | Bio_HP updates | kinokomon |
| #linkedin | - | LinkedIn engagement | kinokomon |
| #kenkoumon | - | Kenkoumon project | kinokomon |

**Bountymon Channels** (Server: 1480183575407231091):

| Channel | ID | Purpose | accountId |
|---------|-------|---------|-----------|
| #welcome | 1480184206108659832 | Introduction | bountymon |
| #bountymon-general | 1480183576296161394 | Discussion | bountymon |
| #bountymon-hunts | 1480184276858437744 | Bounty postings | bountymon |
| #bountymon-reports | 1480184406802169987 | Completion reports | bountymon |
| #bountymon-savings | 1480184450074542234 | Savings calc | bountymon |
| #bountymon-news | 1480184499362074777 | Newsjacking | bountymon |
| #bountymon-announcements | 1480184546157662298 | Admin posts | bountymon |

**Guardrail:**
- Always verify channel ID belongs to correct server
- Never post Kinokomon content to Bountymon channels
- Never post Bountymon content to Kinokomon channels

---

### Rule 4: Memory Isolation

**Current Setup:**
- Shared QMD instance at `~/.openclaw/agents/main/qmd/`
- Both agents share memory index (not ideal)

**Target Setup** (to be implemented):
```bash
# Kinokomon QMD
export XDG_CONFIG_HOME="/home/teabagger/.openclaw/agents/main/qmd/xdg-config"
export XDG_CACHE_HOME="/home/teabagger/.openclaw/agents/main/qmd/xdg-cache"
qmd collection add /home/teabagger/.openclaw/vault --name kinokomon

# Bountymon QMD (separate)
export XDG_CONFIG_HOME="/home/teabagger/.openclaw/agents/bountymon/qmd/xdg-config"
export XDG_CACHE_HOME="/home/teabagger/.openclaw/agents/bountymon/qmd/xdg-cache"
qmd collection add /home/teabagger/dev/projects/bountymon/vault --name bountymon
```

**Guardrail:**
- Each agent searches only its own memory collection
- No cross-agent memory access
- Separate embedding indices

---

### Rule 5: Cron Job Isolation

**Kinokomon Cron Jobs:**
- Morning Briefing (08:00 JST) → Uses `accountId: kinokomon`
- Vault Maintenance (03:00 JST) → Operates on `~/.openclaw/vault`
- Kinokomon Nightly Update (20:00 JST) → Pushes to Bio_HP repo
- Moltbook Engagement (07:00 JST) → Posts to Kinokomon channels

**Bountymon Cron Jobs** (when activated):
- Bounty Status Check (09:00 JST) → Uses `accountId: bountymon`
- GitHub Metrics (10:00 JST) → Operates on `~/dev/projects/bountymon/`
- Community Digest (Weekly) → Posts to Bountymon channels

**Guardrail:**
- Cron jobs MUST specify correct accountId
- File operations MUST target correct workspace
- Never mix accountId and workspace paths

---

### Rule 6: Cross-Pollination Prevention

**Forbidden Actions:**

1. **No Cross-Server Posting:**
   ```
   ❌ Kinokomon posting to Bountymon channels
   ❌ Bountymon posting to Kinokomon channels
   ```

2. **No Cross-Vault Writing:**
   ```
   ❌ Kinokomon writing to ~/dev/projects/bountymon/vault/
   ❌ Bountymon writing to ~/.openclaw/vault/
   ```

3. **No Cross-Agent State:**
   ```
   ❌ Sharing session files between agents
   ❌ Cross-agent memory index access (when implemented)
   ❌ Shared cron job execution contexts
   ```

**Allowed Coordination:**
- ✅ Read-only access across vaults (for context)
- ✅ Logging cross-agent observations
- ✅ Explicit coordination via message passing

---

### Rule 7: Audit Trail

**Logged Events:**
- Message sends (accountId, target, messageId)
- File operations (path, agent, operation)
- Cron job executions (jobId, agentId, status)
- Cross-vault reads (sourceAgent, targetVault, file)

**Log Locations:**
- Main log: `/tmp/openclaw/openclaw-YYYY-MM-DD.log`
- Agent-specific: `~/.openclaw/agents/{agentId}/sessions/*.log`

**Audit Queries:**
```bash
# Check all Bountymon messages
grep "accountId.*bountymon" /tmp/openclaw/*.log

# Check cross-vault access
grep "cross-vault" /tmp/openclaw/*.log

# Check agent routing
grep "bindings.*match" /tmp/openclaw/*.log
```

---

## Security Validation Checklist

### Daily Verification (Automated via Heartbeat)

- [ ] Both bots logged in (check logs for "logged in to discord")
- [ ] Both servers resolved (check logs for "channels resolved")
- [ ] No cross-posting errors (grep logs for "Missing Access")
- [ ] Workspace boundaries intact (no file permission errors)

### Weekly Verification (Manual)

- [ ] Review audit logs for cross-agent access
- [ ] Verify cron jobs using correct accountId
- [ ] Check QMD memory isolation (when implemented)
- [ ] Test guardrails (attempt cross-post, verify failure)

### Monthly Verification (Manual)

- [ ] Full security audit of ARCHITECTURE_SECURITY.md
- [ ] Test disaster recovery (simulate agent failure)
- [ ] Review and update guardrails as needed
- [ ] Backup configuration files

---

## Incident Response

### Scenario 1: Cross-Pollination Detected

**Symptoms:**
- Bountymon content appears in Kinokomon channel
- Kinokomon content appears in Bountymon channel
- File written to wrong vault

**Response:**
1. **Immediate**: Identify source (check logs for accountId)
2. **Investigation**: Review message/file history
3. **Containment**: Delete cross-posted content
4. **Root Cause**: Check if accountId was specified correctly
5. **Prevention**: Update BOOTSTRAP.md with guardrails
6. **Documentation**: Log incident in memory/YYYY-MM-DD.md

---

### Scenario 2: Bot Authentication Failure

**Symptoms:**
- "Missing Access" errors
- Bot not appearing in server
- Messages not delivering

**Response:**
1. Check bot is invited to server
2. Verify bot has correct permissions
3. Check token is valid (regenerate if needed)
4. Restart gateway: `systemctl --user restart openclaw`
5. Verify both bots logged in

---

### Scenario 3: Workspace Access Violation

**Symptoms:**
- Permission denied errors
- File not found in expected location
- Cross-vault file writes

**Response:**
1. Check `workspaceOnly` setting in agent config
2. Verify workspace path in agent definition
3. Check file operation uses correct path
4. Review BOOTSTRAP.md workspace guard logic
5. Add additional guardrails if needed

---

## Configuration Reference

### Bot Tokens

| Bot | Application ID | Token Location | Server |
|-----|---------------|----------------|--------|
| Kinokomon | 1475109888353898709 | `~/.openclaw/openclaw.json` | 1475119306885828870 |
| Bountymon | 1480187322577195059 | `~/.openclaw/openclaw.json` | 1480183575407231091 |

### Workspaces

| Agent | Workspace Path | Config File |
|-------|----------------|-------------|
| main (Kinokomon) | `/home/teabagger/.openclaw/vault` | `~/.openclaw/openclaw.json` |
| bountymon | `/home/teabagger/dev/projects/bountymon/vault` | `~/.openclaw/openclaw.json` |

### Key Files

| File | Purpose | Location |
|------|---------|----------|
| Main Config | Gateway + agents + channels | `~/.openclaw/openclaw.json` |
| Kinokomon Identity | Personality | `~/.openclaw/vault/IDENTITY.md` |
| Kinokomon Soul | Values/tone | `~/.openclaw/vault/SOUL.md` |
| Kinokomon Bootstrap | Workflows | `~/.openclaw/vault/AGENTS.md` |
| Bountymon Identity | Personality | `~/dev/projects/bountymon/IDENTITY.md` |
| Bountymon Soul | Values/tone | `~/dev/projects/bountymon/SOUL.md` |
| Bountymon Bootstrap | Workflows | `~/dev/projects/bountymon/BOOTSTRAP.md` |

---

## CLI Commands Reference

### Gateway Management

```bash
# Restart gateway (apply config changes)
systemctl --user restart openclaw

# Check gateway status
systemctl --user status openclaw

# View live logs
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

# Check Discord connections
tail -100 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | grep "logged in to discord"
```

### Discord Account Management

```bash
# Test Kinokomon posting
openclaw discord send --account kinokomon --channel 1475119307477356619 --message "Test"

# Test Bountymon posting
openclaw discord send --account bountymon --channel 1480184206108659832 --message "Test"

# Check account capabilities
openclaw channels capabilities --channel discord --account kinokomon
openclaw channels capabilities --channel discord --account bountymon
```

### Security Audits

```bash
# Check for cross-posting attempts
grep "Missing Access" /tmp/openclaw/*.log

# Verify accountId usage
grep -B5 -A5 "action.*send.*discord" /tmp/openclaw/*.log | grep accountId

# Check workspace access
grep "workspace" /tmp/openclaw/*.log | tail -50

# Audit message routing
grep "bindings.*match" /tmp/openclaw/*.log | tail -20
```

---

## Testing Procedures

### Test 1: Cross-Posting Prevention

**Objective**: Verify agents cannot post to wrong server

**Steps:**
1. Attempt to post Bountymon message without accountId
2. Verify error or routing to main agent
3. Attempt to post Kinokomon message to Bountymon channel with correct accountId
4. Verify "Missing Access" error (Kinokomon bot not in Bountymon server)

**Expected Result**: Cross-posting blocked

---

### Test 2: Workspace Isolation

**Objective**: Verify file system isolation

**Steps:**
1. As Kinokomon, attempt to read Bountymon vault file
2. Verify read succeeds (workspaceOnly: false allows reads)
3. As Kinokomon, attempt to write to Bountymon vault
4. Verify write fails or is logged
5. As Bountymon, attempt to read Kinokomon vault file
6. Verify read fails (workspaceOnly: true blocks access)

**Expected Result**: Write isolation enforced

---

### Test 3: Agent Routing

**Objective**: Verify bindings route messages correctly

**Steps:**
1. Send message to Kinokomon channel with accountId: kinokomon
2. Check logs for routing to main agent
3. Send message to Bountymon channel with accountId: bountymon
4. Check logs for routing to bountymon agent
5. Verify correct identity/personality in responses

**Expected Result**: Correct agent routing

---

## Maintenance Procedures

### Weekly Review

1. **Check Logs**:
   ```bash
   # Review past week's logs
   journalctl --user -u openclaw --since "1 week ago" | less
   ```

2. **Verify Backups**:
   ```bash
   ls -lh ~/.openclaw/openclaw.json.bak.*
   ```

3. **Update Documentation**:
   - Review ARCHITECTURE_SECURITY.md for accuracy
   - Update memory/YYYY-MM-DD.md with incidents
   - Refresh BOOTSTRAP.md with new guardrails

### Monthly Audit

1. **Security Scan**:
   - Run all 3 tests from Testing Procedures
   - Document results in memory/YYYY-MM-DD.md
   - Update guardrails if needed

2. **Configuration Backup**:
   ```bash
   cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak.$(date +%Y%m%d)
   ```

3. **Access Review**:
   - Review Discord bot permissions
   - Check user allowlists
   - Verify token expiration dates

---

## Best Practices

### DO ✅

- Always specify `accountId` when using message tool
- Use explicit channel IDs instead of names
- Log cross-agent coordination attempts
- Review audit logs weekly
- Test guardrails monthly
- Document all configuration changes
- Backup config before changes

### DON'T ❌

- Assume default agent routing
- Post to channels without accountId
- Write to other agent's workspace
- Share session files between agents
- Skip security validation steps
- Ignore "Missing Access" errors
- Modify bindings without testing

---

## Troubleshooting

### Issue: "Missing Access" Error

**Causes:**
1. Bot not invited to server
2. Bot lacks permissions
3. Wrong accountId specified
4. Channel ID doesn't exist

**Solution:**
```bash
# Check bot permissions
# 1. Verify bot is in server (check Discord UI)
# 2. Verify accountId matches channel's server
# 3. Check channel ID is correct
# 4. Regenerate invite URL if needed
```

---

### Issue: Wrong Agent Responding

**Causes:**
1. accountId not specified
2. Binding misconfigured
3. Agent workspace overlap

**Solution:**
```bash
# Check bindings
grep -A10 '"bindings"' ~/.openclaw/openclaw.json

# Verify accountId in message
# Always use: accountId: "bountymon" or "kinokomon"

# Restart gateway to reload config
systemctl --user restart openclaw
```

---

### Issue: File Permission Denied

**Causes:**
1. workspaceOnly restriction
2. Wrong workspace path
3. File system permissions

**Solution:**
```bash
# Check agent workspace config
grep -A5 '"bountymon"' ~/.openclaw/openclaw.json | grep workspace

# Verify file path is within workspace
# Bountymon: ~/dev/projects/bountymon/vault/
# Kinokomon: ~/.openclaw/vault/

# Check file permissions
ls -la /path/to/file
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-09 | Initial creation after multi-account setup |

---

**Last Updated**: 2026-03-09 22:15 JST
**Status**: ✅ ACTIVE
**Next Review**: 2026-03-16

---

*This document should be reviewed monthly and updated whenever configuration changes occur.*
