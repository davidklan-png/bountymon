---
type: system
tags: [system, discord, config, setup]
updated: 2026-02-23
---

# DISCORD_CONFIG

Complete setup guide for Discord integration with OpenClaw. Use this document to configure Discord from scratch with new tokens, keys, and IDs.

## Overview

OpenClaw connects to Discord as a bot user, enabling:
- Two-way messaging in designated channels
- Channel-specific workflows (briefings, summaries, monitoring)
- Autonomous cron job posting
- Mention-based activation

## Prerequisites

- Discord account with server management permissions
- OpenClaw installed and configured (`openclaw.json`)
- Gateway running (loopback or public)

---

## Part 1: Discord Developer Portal Setup

### Step 1: Create Discord Application

1. Navigate to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Name your application (e.g., "Kinokomon" or "OpenClaw Bot")
4. Note the **Application ID** (save this for later)

### Step 2: Create Bot User

1. In your application, navigate to **"Bot"** in left sidebar
2. Click **"Add Bot"**
3. Configure bot settings:
   - **Username**: Choose a display name
   - **Icon**: Upload bot avatar (optional)
   - **Public Bot**: OFF (unless you want others to invite it)
   - **Require OAuth2 Code Grant**: OFF
   - **Privileged Gateway Intents**: Enable all three:
     - ✅ PRESENCE INTENT
     - ✅ SERVER MEMBERS INTENT
     - ✅ MESSAGE CONTENT INTENT

### Step 3: Generate Bot Token

1. Under **"Build-A-Bot"** section, click **"Reset Token"**
2. Enter 2FA code if prompted
3. **Copy and save the token immediately** (you won't see it again)
4. Store securely (this goes in `openclaw.json`)

**Token Format**: `YOUR_BOT_TOKEN_HERE`

---

## Part 2: Discord Server Setup

### Step 1: Create Server (if needed)

1. Open Discord client
2. Click **"+"** button in server list
3. Choose **"Create My Own"** or select a template
4. Name your server (e.g., "Kinokomon Workspace")
5. Note the **Server ID** (enable Developer Mode: User Settings → Advanced → Developer Mode, then right-click server → "Copy ID")

### Step 2: Create Required Channels

Create channels for different workflows:

| Channel Name | Purpose | Channel ID |
|---|---|---|
| `#general` | General assistant tasks | Get via right-click → Copy ID |
| `#summaries` | Content summarization | |
| `#moltbook` | Moltbook monitoring | |
| `#biz-ideas` | Business research | |
| `#monitoring` | Server health reports | |
| `#briefing` | Daily briefings | |

**To get Channel IDs**:
1. Enable Developer Mode (User Settings → Advanced → Developer Mode)
2. Right-click each channel → "Copy ID"
3. Save these for OpenClaw configuration

### Step 3: Create Bot Role (Optional)

1. Go to Server Settings → Roles
2. Click **"Create Role"**
3. Configure:
   - **Name**: "OpenClaw" or "Kinokomon"
   - **Color**: Choose a distinct color
   - **Permissions**: 
     - ✅ View Channels
     - ✅ Send Messages
     - ✅ Manage Messages (optional)
     - ✅ Embed Links
     - ✅ Attach Files
     - ✅ Read Message History
     - ✅ Mention @everyone, @here, and All Roles

---

## Part 3: Invite Bot to Server

### Step 1: Generate Invite URL

1. In Developer Portal, go to **"OAuth2" → "URL Generator"**
2. Select **Scopes**:
   - ✅ `bot`
   - ✅ `applications.commands` (for slash commands)
3. Select **Bot Permissions**:
   - ✅ View Channels
   - ✅ Send Messages
   - ✅ Manage Messages (optional)
   - ✅ Embed Links
   - ✅ Attach Files
   - ✅ Read Message History
   - ✅ Mention @everyone, @here, and All Roles
4. Copy generated URL at bottom

### Step 2: Authorize Bot

1. Paste invite URL in browser
2. Select your server from dropdown
3. Click **"Continue"** → **"Authorize"**
4. Complete CAPTCHA
5. Bot should now appear in your server member list

---

## Part 4: OpenClaw Configuration

### Step 1: Configure `openclaw.json`

Add Discord configuration to your OpenClaw config file at `/home/teabagger/.openclaw/openclaw.json`:

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN_HERE",
      "groupPolicy": "open",
      "streaming": "partial",
      "guilds": {
        "YOUR_SERVER_ID": {
          "requireMention": false,
          "users": [
            "YOUR_DISCORD_USER_ID"
          ]
        }
      }
    }
  }
}
```

**Configuration Fields**:
- `enabled`: Set to `true` to activate Discord integration
- `token`: Bot token from Step 3 of Part 1
- `groupPolicy`: 
  - `"open"`: Bot responds in all channels
  - `"allowlist"`: Only respond in specified channels
- `streaming`: 
  - `"off"`: No streaming
  - `"partial"`: Stream responses (recommended)
  - `"full"`: Full streaming mode
- `guilds`: Map of server configurations
  - Key: Server ID (from Part 2, Step 1)
  - `requireMention`: 
    - `false`: Bot responds to all messages
    - `true`: Bot only responds when mentioned
  - `users`: Array of authorized Discord user IDs

### Step 2: Get Your Discord User ID

1. Enable Developer Mode (User Settings → Advanced → Developer Mode)
2. Right-click your username in Discord
3. Select **"Copy User ID"**
4. Add to `users` array in config

### Step 3: Restart Gateway

After updating configuration:

```bash
# Restart OpenClaw gateway
openclaw gateway restart

# Or if running as service
sudo systemctl restart openclaw-gateway
```

---

## Part 5: Verification & Testing

### Step 1: Check Gateway Status

```bash
# Check if gateway is running
openclaw gateway status

# Should show:
# ✅ Gateway running on http://127.0.0.1:18789
# ✅ Discord plugin: enabled
```

### Step 2: Test Bot Connection

1. Open your Discord server
2. Navigate to `#general` channel
3. Send a test message: `@YourBotName test`
4. Bot should respond with acknowledgment

### Step 3: Test Two-Way Messaging

1. Send a command: `@YourBotName what time is it?`
2. Bot should respond with current time
3. Test in different channels to verify channel routing

### Step 4: Verify Channel IDs

Check that OpenClaw recognizes your channels:

```bash
# List active sessions (should show Discord channel sessions)
openclaw sessions list
```

---

## Part 6: Troubleshooting

### Bot Not Responding

**Symptoms**: Bot appears online but doesn't respond to messages

**Solutions**:
1. Check bot token is correct in `openclaw.json`
2. Verify `MESSAGE CONTENT INTENT` is enabled in Developer Portal
3. Check `requireMention` setting:
   - If `true`, you must @mention the bot
   - If `false`, bot responds to all messages
4. Restart gateway: `openclaw gateway restart`

### Bot Not Appearing Online

**Symptoms**: Bot shows as offline in Discord

**Solutions**:
1. Check gateway is running: `openclaw gateway status`
2. Check bot token is valid (regenerate if needed)
3. Check network connectivity
4. Review gateway logs: `/home/teabagger/.openclaw/logs/`

### Permission Errors

**Symptoms**: Bot can see channels but can't send messages

**Solutions**:
1. Check bot role has "Send Messages" permission
2. Check channel-specific permissions for bot role
3. Verify bot was invited with correct permissions (re-invite if needed)

### Streaming Issues

**Symptoms**: Messages appear slowly or not at all

**Solutions**:
1. Change `streaming` mode in config:
   - `"partial"`: Recommended for most setups
   - `"off"`: Disable streaming if unstable
2. Check gateway logs for WebSocket errors
3. Restart Discord client

### Gateway Not Starting

**Symptoms**: `openclaw gateway start` fails

**Solutions**:
1. Check port 18789 is not in use: `lsof -i :18789`
2. Check `openclaw.json` is valid JSON: `cat openclaw.json | jq .`
3. Check file permissions: `ls -la openclaw.json`
4. Review error logs: `/home/teabagger/.openclaw/logs/`

---

## Part 7: Security Best Practices

### Token Security

⚠️ **CRITICAL**: Never commit bot tokens to version control

1. Store tokens in environment variables (optional):
   ```bash
   export DISCORD_BOT_TOKEN="your_token_here"
   ```

2. Use `.gitignore` to exclude sensitive files:
   ```
   openclaw.json
   .env
   credentials/
   ```

3. Regenerate token immediately if exposed:
   - Developer Portal → Bot → Reset Token

### Access Control

1. **Limit authorized users**: Only add trusted user IDs to `users` array
2. **Use `requireMention: true`**: Prevents accidental triggers
3. **Channel restrictions**: Use `groupPolicy: "allowlist"` for production
4. **Role-based access**: Create dedicated bot role with minimal permissions

### Network Security

1. **Loopback mode** (default): Gateway only accessible locally
   ```json
   "gateway": {
     "bind": "loopback",
     "port": 18789
   }
   ```

2. **Tailscale mode** (optional): Secure remote access
   ```json
   "gateway": {
     "bind": "tailscale",
     "tailscale": {
       "mode": "on"
     }
   }
   ```

---

## Part 8: Advanced Configuration

### Multi-Server Setup

To connect bot to multiple Discord servers:

```json
"guilds": {
  "SERVER_ID_1": {
    "requireMention": false,
    "users": ["USER_ID_1", "USER_ID_2"]
  },
  "SERVER_ID_2": {
    "requireMention": true,
    "users": ["USER_ID_3"]
  }
}
```

### Channel-Specific Behaviors

Configure different behaviors per channel (edit `BOOTSTRAP.md` and `TOOLS.md`):

- `#general`: General assistant mode
- `#summaries`: Content processing (auto-summarize URLs)
- `#briefing`: Post-only mode (cron-driven briefings)
- `#monitoring`: Post-only mode (system alerts)

### Custom Gateway Port

If default port (18789) is in use:

```json
"gateway": {
  "port": 18790,
  "mode": "local",
  "bind": "loopback"
}
```

### Disable Discord Temporarily

```json
"channels": {
  "discord": {
    "enabled": false
  }
}
```

Then restart gateway: `openclaw gateway restart`

---

## Configuration Checklist

Before going live, verify:

- [ ] Bot created in Discord Developer Portal
- [ ] Bot token generated and saved securely
- [ ] All three Privileged Gateway Intents enabled
- [ ] Bot invited to server with correct permissions
- [ ] Server ID added to `openclaw.json`
- [ ] Channel IDs noted for workflow channels
- [ ] Your User ID added to `users` array
- [ ] `requireMention` configured appropriately
- [ ] `streaming` mode set (recommend `"partial"`)
- [ ] Gateway restarted after config changes
- [ ] Test message successful in `#general`
- [ ] Two-way messaging confirmed working
- [ ] Tokens excluded from version control

---

## Quick Reference

### Current Configuration (2026-02-23)

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN_HERE",
      "groupPolicy": "open",
      "streaming": "partial",
      "guilds": {
        "1475119306885828870": {
          "requireMention": false,
          "users": ["1428166086867816529"]
        }
      }
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "dev-token"
    }
  }
}
```

### Key IDs

- **Server ID**: `1475119306885828870`
- **Bot Application ID**: `1475109888353898709`
- **Authorized User**: `1428166086867816529`
- **Gateway Port**: `18789`
- **Gateway Auth Token**: `dev-token`

### Channel IDs

| Channel | ID | Purpose |
|---|---|---|
| `#general` | `1475119307477356619` | General tasks |
| `#briefing` | `1475120694936473782` | Daily briefings |
| `#summaries` | TBD | Content summarization |
| `#moltbook` | TBD | Moltbook monitoring |
| `#biz-ideas` | TBD | Business research |
| `#monitoring` | TBD | System alerts |

---

## Support & Resources

- **OpenClaw Docs**: `/usr/lib/node_modules/openclaw/docs` or https://docs.openclaw.ai
- **Discord Developer Docs**: https://discord.com/developers/docs
- **Community**: https://discord.com/invite/clawd
- **GitHub Issues**: https://github.com/openclaw/openclaw/issues

---

*Last Updated: 2026-02-23*
*Configuration tested and verified on OpenClaw 2026.2.22-2*
