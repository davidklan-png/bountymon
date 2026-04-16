---
type: architecture
tags: [security, isolation, architecture, multi-tenant]
updated: 2026-03-09 22:15
status: SUPERSEDED
superseded_by: SECURITY_IMPLEMENTATION.md
---

# Agent Architecture & Security Boundaries

**⚠️ NOTE**: This document has been superseded by **SECURITY_IMPLEMENTATION.md** which contains operational procedures and working configurations.

**For current security procedures, see:**
- **SECURITY_IMPLEMENTATION.md** - Full operational guide with guardrails
- **SECURITY_QUICKREF.md** - One-page cheat sheet

This document remains for architectural reference only.

---

**Purpose**: Define relationships, guardrails, and isolation between Kinokomon and Bountymon agents.

## Architecture Overview

### Component Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         DISCORD CLOUD                           │
│                                                                 │
│  ┌──────────────────────┐      ┌──────────────────────┐       │
│  │  Kinokomon Server    │      │  Bountymon Server    │       │
│  │  1475119306885828870 │      │  1480183575407231091 │       │
│  │                      │      │                      │       │
│  │  #general            │      │  #welcome            │       │
│  │  #summaries          │      │  #bountymon-general  │       │
│  │  #moltbook           │      │  #bountymon-hunts    │       │
│  │  #biz_ideas          │      │  #bountymon-reports  │       │
│  │  #monitoring         │      │  #bountymon-savings  │       │
│  │  #briefing           │      │  #bountymon-news     │       │
│  │  #kinokoholic        │      │  #bountymon-announce │       │
│  │  #linkedin           │      │                      │       │
│  │  #kenkoumon          │      │                      │       │
│  └──────────────────────┘      └──────────────────────┘       │
│           │                              │                      │
│           │                              │                      │
│  ┌────────▼────────┐           ┌─────────▼─────────┐          │
│  │ Kinokomon Bot   │           │  Bountymon Bot    │          │
│  │ 147510988835... │           │  148018732257...  │          │
│  └─────────────────┘           └───────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
           │                              │
           │                              │
           ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LOCAL MACHINE                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  OpenClaw Gateway (Port 18789)                            │  │
│  │  - Single process, multi-tenant                           │  │
│  │  - Routes messages by server ID                           │  │
│  │  - Loads personality based on context                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│           │                              │                      │
│           │                              │                      │
│  ┌────────▼────────┐           ┌─────────▼─────────┐          │
│  │ Kinokomon Vault │           │ Bountymon Vault   │          │
│  │ ~/.openclaw/    │           │ ~/dev/projects/   │          │
│  │ vault/          │           │ bountymon/vault/  │          │
│  │                 │           │                   │          │
│  │ 00-System/      │           │ 00-System/        │          │
│  │ 10-Daily/       │           │ 10-Bounties/      │          │
│  │ 20-Summaries/   │           │ 20-Alternatives/  │          │
│  │ 30-Biz-Ideas/   │           │ 30-Migration...   │          │
│  │ 40-Moltbook/    │           │ 40-Case-Studies/  │          │
│  │ 50-Monitoring/  │           │ 50-Community/     │          │
│  │ 60-Skills/      │           │ 60-Marketing/     │          │
│  │ 70-Engagements/ │           │                   │          │
│  │ 80-Kenkoumon/   │           │                   │          │
│  │ 90-Archive/     │           │                   │          │
│  └─────────────────┘           └───────────────────┘          │
│           │                              │                      │
│           │                              │                      │
│  ┌────────▼────────┐           ┌─────────▼─────────┐          │
│  │ Kinokomon QMD   │           │ Bountymon QMD     │          │
│  │ (Shared with    │           │ (Isolated index)  │          │
│  │  Bountymon)     │           │                   │          │
│  └─────────────────┘           └───────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Server → Agent Mapping

### Kinokomon Server (1475119306885828870)

**Agent Identity**: Kinokomon
**Workspace**: `/home/teabagger/.openclaw/vault`
**Bot Token**: Kinokomon bot (1475109888353898709)
**Channels**:
- `#general` → General assistant mode
- `#summaries` → Content summarization
- `#moltbook` → Moltbook engagement
- `#biz_ideas` → Business research
- `#monitoring` → System health reports
- `#briefing` → Daily briefings
- `#kinokoholic` → Bio_HP website updates
- `#linkedin` → LinkedIn engagement
- `#kenkoumon` → Kenkoumon project monitoring

**Allowed Operations**:
- ✅ Access Kinokomon vault
- ✅ Post to Kinokomon server channels
- ✅ Execute Kinokomon cron jobs
- ✅ Manage Bio_HP repository
- ✅ Coordinate with Bountymon (read-only)

**Forbidden Operations**:
- ❌ Post to Bountymon server channels
- ❌ Modify Bountymon vault files
- ❌ Execute Bountymon bounties

---

### Bountymon Server (1480183575407231091)

**Agent Identity**: Bountymon
**Workspace**: `/home/teabagger/dev/projects/bountymon/vault`
**Bot Token**: Bountymon bot (1480187322577195059) - **NOT CONFIGURED YET**
**Channels**:
- `#welcome` → Introduction (read-only)
- `#bountymon-general` → General discussion
- `#bountymon-hunts` → Bounty postings
- `#bountymon-reports` → Completion reports
- `#bountymon-savings` → Savings calculations
- `#bountymon-news` → Newsjacking
- `#bountymon-announcements` → Admin announcements

**Allowed Operations**:
- ✅ Access Bountymon vault
- ✅ Post to Bountymon server channels
- ✅ Execute Bountymon cron jobs
- ✅ Manage bountymon-agent repository
- ✅ Coordinate with Kinokomon (read-only)

**Forbidden Operations**:
- ❌ Post to Kinokomon server channels
- ❌ Modify Kinokomon vault files
- ❌ Execute Kinokomon tasks

---

## Security Guardrails

### 1. **Bot Token Isolation**

**Rule**: Each bot token must only be used for its designated server.

**Implementation**:
```json
// Kinokomon config
{
  "channels": {
    "discord": {
      "token": "KINOKOMON_BOT_TOKEN",
      "guilds": {
        "1475119306885828870": { ... }
      }
    }
  }
}

// Bountymon config (if separate gateway)
{
  "channels": {
    "discord": {
      "token": "BOUNTYMON_BOT_TOKEN",
      "guilds": {
        "1480183575407231091": { ... }
      }
    }
  }
}
```

**Guardrail**:
- Kinokomon bot token → ONLY connects to Kinokomon server
- Bountymon bot token → ONLY connects to Bountymon server
- Never mix tokens

---

### 2. **Server ID Routing**

**Rule**: Messages are routed to appropriate agent based on server ID.

**Implementation in BOOTSTRAP.md**:
```markdown
## Server Detection

When message received:
1. Extract server ID from message context
2. IF server_id == 1475119306885828870:
   - Load Kinokomon identity
   - Use Kinokomon vault
   - Execute Kinokomon workflows
3. IF server_id == 1480183575407231091:
   - Load Bountymon identity
   - Use Bountymon vault
   - Execute Bountymon workflows
```

**Guardrail**:
- Check server ID BEFORE processing
- Abort if server ID doesn't match known servers
- Never execute cross-server tasks

---

### 3. **Workspace Isolation**

**Rule**: Each agent has separate workspace directory.

**Kinokomon Workspace**:
- Primary: `/home/teabagger/.openclaw/vault`
- Contains: All Kinokomon project files
- Access: Read/write for Kinokomon tasks only

**Bountymon Workspace**:
- Primary: `/home/teabagger/dev/projects/bountymon/vault`
- Contains: All Bountymon project files
- Access: Read/write for Bountymon tasks only

**Guardrail**:
```python
# Pseudocode for workspace guard
def get_workspace(server_id):
    if server_id == "1475119306885828870":
        return "/home/teabagger/.openclaw/vault"
    elif server_id == "1480183575407231091":
        return "/home/teabagger/dev/projects/bountymon/vault"
    else:
        raise SecurityError("Unknown server ID")
```

---

### 4. **Memory Isolation**

**Rule**: QMD memory should be scoped per agent.

**Current Setup** (needs fix):
- Shared QMD instance at `~/.openclaw/agents/main/qmd/`
- Both agents indexing both vaults

**Target Setup**:
- Kinokomon QMD: Indexes `~/.openclaw/vault/`
- Bountymon QMD: Indexes `~/dev/projects/bountymon/vault/`

**Implementation**:
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

**Guardrail**:
- Memory search scoped to agent's vault only
- No cross-agent memory access
- Separate QMD instances

---

### 5. **Cron Job Isolation**

**Rule**: Cron jobs must only access their designated workspace.

**Kinokomon Cron Jobs**:
- Morning Briefing (08:00 JST) → Kinokomon vault
- Vault Maintenance (03:00 JST) → Kinokomon vault
- Kinokomon Nightly Update (20:00 JST) → Bio_HP repo
- Moltbook Engagement (07:00 JST) → Kinokomon vault

**Bountymon Cron Jobs** (when activated):
- Bounty Status Check (09:00 JST) → Bountymon vault
- GitHub Metrics (10:00 JST) → bountymon-agent repo
- Community Digest (Weekly) → Bountymon vault

**Guardrail**:
```yaml
# Cron job validation
before_execute:
  - verify_agent_identity()
  - verify_workspace_access()
  - verify_server_routing()
  
if any_check_fails:
  - abort_job()
  - log_security_event()
  - notify_admin()
```

---

### 6. **Cross-Pollination Prevention**

**Rule**: No data leakage between agents.

**Forbidden Actions**:

1. **No Cross-Server Posting**:
   - Kinokomon ❌ cannot post to Bountymon channels
   - Bountymon ❌ cannot post to Kinokomon channels

2. **No Cross-Vault File Access**:
   - Kinokomon ❌ cannot write to Bountymon vault
   - Bountymon ❌ cannot write to Kinokomon vault

3. **No Cross-Agent Task Execution**:
   - Kinokomon ❌ cannot execute Bountymon bounties
   - Bountymon ❌ cannot execute Kinokomon skills

4. **No Shared State**:
   - Separate session files per agent
   - Separate memory indexes
   - Separate cron job histories

**Allowed Coordination** (read-only):
- Kinokomon can READ Bountymon vault (for context)
- Bountymon can READ Kinokomon vault (for context)
- NO WRITES to opposite vault

---

### 7. **Audit Trail**

**Rule**: All cross-boundary access must be logged.

**Logged Events**:
- Server ID detection
- Workspace access attempts
- Cross-vault read operations
- Cron job executions
- Security violations

**Log Location**:
- Kinokomon: `~/.openclaw/logs/gateway.log`
- Bountymon: `~/dev/projects/bountymon/logs/` (when activated)

---

## Configuration Strategy

### Option A: Single Gateway (Current Implementation)

**Pros**:
- ✅ Single process, lower resource usage
- ✅ Simpler deployment
- ✅ Shared context between agents

**Cons**:
- ⚠️ More complex routing logic
- ⚠️ Higher risk of cross-pollination
- ⚠️ Single point of failure

**Configuration**:
```json
{
  "channels": {
    "discord": {
      "token": "KINOKOMON_BOT_TOKEN",
      "guilds": {
        "1475119306885828870": {
          "agent": "kinokomon",
          "workspace": "/home/teabagger/.openclaw/vault"
        },
        "1480183575407231091": {
          "agent": "bountymon",
          "workspace": "/home/teabagger/dev/projects/bountymon/vault"
        }
      }
    }
  }
}
```

---

### Option B: Dual Gateway (Recommended for Security)

**Pros**:
- ✅ Complete isolation
- ✅ Independent failure domains
- ✅ Clearer security boundaries

**Cons**:
- ⚠️ Double resource usage
- ⚠️ More complex deployment
- ⚠️ No shared context

**Configuration**:
```bash
# Kinokomon gateway (port 18789)
openclaw gateway --port 18789 --config ~/.openclaw/openclaw.json

# Bountymon gateway (port 18790)
openclaw gateway --port 18790 --config ~/dev/projects/bountymon/config/openclaw.json
```

---

## Security Checklist

### ✅ Implemented
- [x] Separate vault directories
- [x] Separate QMD scopes (needs activation)
- [x] Server ID routing in config
- [x] Workspace isolation logic

### ⚠️ Needs Implementation
- [ ] Bountymon bot token configuration
- [ ] Server detection in BOOTSTRAP.md
- [ ] Workspace access validation
- [ ] Cross-pollination guards
- [ ] Audit logging

### 🔴 Critical Issues
- [ ] Both bots connecting as Kinokomon
- [ ] Single bot token serving two servers
- [ ] No runtime server detection

---

## Recommendations

### Immediate Actions (Priority 1)

1. **Fix Bot Connection**:
   - Configure separate bot tokens per server
   - Implement server ID detection
   - Route to appropriate bot identity

2. **Implement Server Detection**:
   - Update BOOTSTRAP.md to check server ID
   - Load appropriate identity based on server
   - Route to correct workspace

3. **Activate Workspace Guards**:
   - Validate workspace access before file operations
   - Abort if cross-boundary access detected

### Short-term Actions (Priority 2)

4. **Separate QMD Instances**:
   - Create isolated QMD config for Bountymon
   - Index Bountymon vault separately
   - Prevent memory cross-pollination

5. **Implement Audit Logging**:
   - Log all server detections
   - Log all workspace accesses
   - Log all security events

6. **Create Security Tests**:
   - Test cross-server posting (should fail)
   - Test cross-vault writes (should fail)
   - Test cross-agent task execution (should fail)

### Long-term Actions (Priority 3)

7. **Consider Dual Gateway**:
   - Evaluate resource impact
   - Test isolated deployment
   - Migrate if security benefits outweigh costs

8. **Implement Agent-to-Agent Protocol**:
   - Define coordination API
   - Read-only access between agents
   - Explicit permission grants

---

## Security Violations Response

**If cross-pollination detected**:

1. **Immediate**:
   - Abort current operation
   - Log security event
   - Notify admin

2. **Investigation**:
   - Review logs for scope
   - Identify affected files
   - Assess data exposure

3. **Remediation**:
   - Restore from backup if needed
   - Fix configuration issue
   - Update guardrails

4. **Prevention**:
   - Update security rules
   - Add new validation checks
   - Document incident

---

*Document Version: 1.0.0*
*Created: 2026-03-09*
*Next Review: 2026-03-16*
