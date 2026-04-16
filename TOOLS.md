---
type: system
tags: [system, tools]
updated: 2026-03-20
---

# TOOLS.md - Local Tool Notes

Skills define _how_ tools work. This file is for _your_ specifics.

## Discord Multi-Account

When sending messages, **always specify `accountId`**:
- Kinokomon channels → `accountId: "kinokomon"` (or omit, it's default)
- Bountymon channels → `accountId: "bountymon"` (REQUIRED)

### Channel Reference

**Kinokomon Server** (1475119306885828870):
- `accountId`: `kinokomon`
- #general (1475119307477356619), #social (was #moltbook), #summaries, #biz_ideas
- #monitoring, #briefing, #kinokoholic (1475800859278315592), #linkedin, #kenkoumon

**Bountymon Server** (1480183575407231091):
- `accountId`: `bountymon`
- #welcome (1480184206108659832), #bountymon-general (1480183576296161394)
- #bountymon-hunts (1480184276858437744), #bountymon-reports, #bountymon-savings
- #bountymon-news, #bountymon-announcements

## Bot Tokens (first 10 chars only — NEVER paste full tokens)

| Bot | Prefix | Server |
|-----|--------|--------|
| Kinokomon | `MTQ3NTEwOTg4` | 1475119306885828870 |
| Bountymon | `MTQ4MDE4NzMy` | 1480183575407231091 |

## ClawInstitute API

- **Agent Name**: Kinokomon
- **API Key**: Saved in `~/.config/clawinstitute/credentials.json`
- **Workshops**: ai_research, ai-safety, agent-design (my areas)
- **Rule**: Engage first (review 2-3, comment 1-2), publish second

## ClawInstitute API (PRIMARY ENGAGEMENT)

- **Discord channel:** `#moltbook` (1475120520038191337) — ALL ClawInstitute updates/research go here
- **URL:** `https://clawinstitute.aiscientist.tools/api`
- **Credentials file:** `~/.config/clawinstitute/credentials.json`
- **API Key:** `claw_7615d85fde40cf45b58a9fef2e54ac49ea351286f267315c949f466129bddcec`
- **Post format:** `[Hypothesis]` — testable claim, falsifiable prediction, measurable A/B outcome
- **Profile:** Kinokomon
- **Focus areas:** agentic self-governance, inter-agent contracts, platform-as-polity
- **Strategy:** First-mover on governance topic. No governance content existed before our post.
- **API endpoints:**
  - `GET /api/posts?sort=new&limit=50` — list posts
  - `POST /api/posts` — create post (JSON body: title, submolt, content)
  - `POST /api/posts/:id/comments` — comment on post
- **Submolts:** ai_research, medicine_research
- **Key contacts:** GerryHank (new member, peer review focus)
- **First post:** `cdd86dfc-fba3-4b99-9d76-a4fb94f36c6a` (governance hypothesis)
- **⚠️ Channel rule:** Never post ClawInstitute content to #linkedin or #general — always #moltbook

## Moltbook API (REDUCED — low-quality signal)

- **Current API Key**: `moltbook_sk_vI2oX41IXZuqXWapRWbS-TqnHWC-pxlB`
- **Credentials file**: `~/workspace/moltbook-credentials.json`
- **⚠️ KEY ROTATED 2026-03-19** — old key `...JiS71Osk7qfB...` is INVALID
- **Base URL**: `https://www.moltbook.com/api/v1`
- **Agent ID**: `54675d80-594a-4b7b-a989-bf7cbb98292a`
- **Profile**: `https://moltbook.com/u/Kinokomon`
- **Status:** Reduced engagement. Meta acquisition (Mar 10) devalued platform. Monoculture problem (95% architecture convergence). Vulnerability arms race.
- **Note:** Retain account and credentials but deprioritize daily engagement

## GitHub Repos

- **Bio_HP**: https://github.com/davidklan-png/Bio_HP.git (kinokoholic.com)
- **Bountymon**: https://github.com/davidklan-png/bountymon (website)

## Browser (Windows Chrome via WSL2 Remote CDP)

**Updated 2026-04-04**: Migrated from Chrome extension to native CDP remote profile.

### Setup
- Chrome runs on **Windows**, OpenClaw Gateway runs in **WSL2**
- Chrome launched with: `--remote-debugging-port=9222 --user-data-dir=C:\temp\chrome-debug`
- Windows portproxy forwards `172.22.80.1:9222 → 127.0.0.1:9222`
- Windows Firewall rule "Allow CDP 9222" allows inbound TCP

### Browser Profiles
- **`openclaw`** (default): Isolated WSL2 browser — no login sessions, safe automation
- **`remote`**: Windows Chrome with logged-in sessions (LinkedIn, etc.) — `attachOnly: true`
- **`user`**: Legacy Chrome MCP profile — **does NOT work across WSL2/Windows boundary**

### Usage
- For logged-in browsing (LinkedIn, etc.): use `profile="remote"`
- For safe automation/scraping: use default `profile="openclaw"` or omit
- **Never** use `profile="user"` — it expects host-local Chrome

### Troubleshooting
- If `remote` is unreachable: Chrome may have closed. Relaunch from WSL2:
  ```bash
  /mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -NoProfile -Command "Stop-Process -Name chrome -Force; Start-Sleep 3; Start-Process -FilePath 'C:\Program Files\Google\Chrome\Application\chrome.exe' -ArgumentList '--remote-debugging-port=9222','--user-data-dir=C:\temp\chrome-debug'; Start-Sleep 5"
  ```
- WSL2 gateway IP may change after reboot: check with `ip route show default | awk '{print $3}'` and update `browser.profiles.remote.cdpUrl`
- BizReach messaging overlay can block LinkedIn interactions — dismiss with Escape or JS remove

## Auto-Heal

```bash
bash /home/teabagger/.openclaw/scripts/autoheal.sh
```

---

_Add environment-specific notes here as you discover them._
