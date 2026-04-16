---
type: quick-reference
tags: [security, discord, cheat-sheet]
updated: 2026-03-09
---

# Security Quick Reference Card

**One-page guide for secure multi-agent operations**

---

## Message Tool - ALWAYS Specify accountId

### Posting to Kinokomon Server
```json
{
  "action": "send",
  "channel": "discord",
  "accountId": "kinokomon",
  "target": "1475119307477356619",
  "message": "..."
}
```

### Posting to Bountymon Server
```json
{
  "action": "send",
  "channel": "discord",
  "accountId": "bountymon",
  "target": "1480184206108659832",
  "message": "..."
}
```

---

## Workspace Boundaries

| Agent | Workspace | Can Write To |
|-------|-----------|--------------|
| Kinokomon (main) | `~/.openclaw/vault` | ✅ Own vault, ⚠️ Other dirs (workspaceOnly: false) |
| Bountymon | `~/dev/projects/bountymon/vault` | ✅ Own vault ONLY (workspaceOnly: true) |

**Rule**: Never write to other agent's workspace

---

## Server & Channel Quick Reference

### Kinokomon Server (1475119306885828870)
- `accountId`: `kinokomon`
- Bot: 1475109888353898709 (@Kinokomon)
- Main channel: #general (1475119307477356619)
- Bio_HP updates: #kinokoholic (1475800859278315592)

### Bountymon Server (1480183575407231091)
- `accountId`: `bountymon`
- Bot: 1480187322577195059 (@Bountymon)
- Welcome: #welcome (1480184206108659832)
- Bounties: #bountymon-hunts (1480184276858437744)
- General: #bountymon-general (1480183576296161394)

---

## Forbidden Actions ❌

```
❌ Post Kinokomon content to Bountymon channels
❌ Post Bountymon content to Kinokomon channels
❌ Write to other agent's workspace
❌ Use message tool without accountId
❌ Share session files between agents
```

---

## Emergency Commands

### Restart Gateway
```bash
systemctl --user restart openclaw
```

### Check Connections
```bash
tail -50 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | grep "logged in"
```

### View Errors
```bash
tail -100 /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | grep -i error
```

---

## Security Checklist (Pre-Action)

Before sending Discord message:
- [ ] Correct `accountId` specified?
- [ ] Channel belongs to correct server?
- [ ] Message content matches agent identity?

Before file operation:
- [ ] Operating in correct workspace?
- [ ] Not writing to other agent's vault?
- [ ] Workspace boundary respected?

---

## Bot Token Verification

| Bot | First 10 Chars | Server |
|-----|----------------|--------|
| Kinokomon | `MTQ3NTEwOTg4` | 1475119306885828870 |
| Bountymon | `MTQ4MDE4NzMy` | 1480183575407231091 |

**Never paste full tokens in public channels!**

---

**Quick Test**: Send test message with accountId, verify correct bot responds.

**If in doubt**: Check `SECURITY_IMPLEMENTATION.md` for full details.
