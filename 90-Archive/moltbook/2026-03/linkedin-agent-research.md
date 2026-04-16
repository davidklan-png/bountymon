---
type: system
tags: [system, linkedin, engagement, best-practices]
updated: 2026-02-26
---

# LinkedIn Agent Research & Best Practices

## Overview

This document captures best practices for autonomous LinkedIn engagement via OpenClaw, based on operational experience and protocol testing.

---

## System Architecture

### Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Browser Automation | Chrome Extension (CDP relay) | Read LinkedIn notifications, posts, profiles |
| Content Posting | LinkedIn OAuth extension | Post comments, reactions |
| Cron Jobs | Gateway scheduler | Automated checks (12:00, 18:00, weekly brief) |
| Protocol Engine | LINKEDIN-PROTOCOL.md | Response drafting, signal scoring |
| Storage | vault/70-Engagements/ | Engagement records, tracking |

---

## Browser Automation (Reading LinkedIn)

### Setup

1. **Install Extension**:
   ```bash
   openclaw browser extension install
   openclaw browser extension path
   ```

2. **Load in Chrome** (Windows path for WSL2):
   ```
   \\wsl.localhost\Ubuntu-22.04\home\teabagger\.openclaw\browser\chrome-extension
   ```

3. **Configure Extension**:
   - Port: `18792`
   - Gateway token: **Derived token** (not raw gateway token)
   - Derivation: `HMAC-SHA256(gateway-token, "openclaw-extension-relay-v1:18792")`

4. **Attach Tab**:
   - Open LinkedIn tab
   - Click extension icon → badge shows `ON`

### Known Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Gateway token rejected" | Using raw token instead of derived | Use HMAC-derived token |
| "Tab not found" | Stale targetId after page refresh | Re-attach extension (OFF → ON) |
| Browser service unavailable | Gateway restart lost CDP connection | Restart gateway + re-attach |
| Snapshot fails after navigation | targetId changed on new page | Use `browser open` instead of `navigate` |

### Best Practices

1. **Always use `browser open`** for fresh pages (gets new targetId)
2. **Re-attach after gateway restarts** (extension loses connection)
3. **Don't reuse targetIds across page navigations**
4. **Wait 3-5 seconds** after page load before snapshot
5. **Post error to #linkedin** if browser unavailable (don't retry indefinitely)

---

## Cron Jobs

### Scheduled Jobs

| Job | Schedule | Model | Session |
|-----|----------|-------|---------|
| Midday Engagement Check | 12:00 JST daily | glm-4.7 | Isolated |
| Evening Engagement Check | 18:00 JST daily | glm-4.7 | Isolated |
| Weekly Strategic Brief | Sundays 09:00 JST | glm-4.7 | Isolated |

### Cron Job Structure

**Critical Elements**:
1. **Health check first**: `browser status`, `browser tabs`
2. **Use `browser open`**: Never navigate existing tabs
3. **Error handling**: Post to #linkedin if browser unavailable
4. **No infinite retries**: Fail fast, notify user
5. **One response per post**: Vary styles across posts

### Cron Job Template

```markdown
**Step 0: Connection Health Check**
- browser status, profile=chrome
- browser tabs, profile=chrome
- If failed: post error to #linkedin, exit

**Step 1: Open Fresh Tab**
- browser open, targetUrl=https://www.linkedin.com/notifications/
- Note targetId

**Step 2: Wait + Snapshot**
- Wait 3-5 seconds
- browser snapshot with fresh targetId

**Step 3: Extract Notifications**
- Parse for mentions, comments, reactions, profile views

**Step 4: Identify Opportunities (max 3)**
- Filter by signal scores (Lead 5+, Authority 6+, Strategic 6+)

**Step 5: Generate Response Proposals**
- Draft options with reasoning
- Post to #linkedin for approval
```

---

## Response Styles (Vary Per Post)

### Style Matrix

| Style | When to Use | Characteristics |
|-------|-------------|-----------------|
| **Thoughtful/Experience-Share** | Substantive posts, shared domain | Adds own experience, extends conversation |
| **Bold/Opinionated** | Controversial takes, strong positions | Stakes out position, reframes debate |
| **Question-Based** | Expert authors, networking | Invites engagement, leverages their expertise |
| **Value-Add** | Practical topics, how-to content | Shares resources, offers frameworks |
| **Short/Punchy** | High-engagement posts, signal boost | Quick agreement + one sharp insight |

### Response Principles (per LINKEDIN-PROTOCOL.md + Moltbook)

- **No emojis** unless requested
- **Max 150 words** for comments (200-300 for articles)
- **No generic responses** ("Great post!", "Thanks for sharing")
- **Match voice**: Thoughtful operator, not motivational influencer
- **One response per post** (vary styles across different posts)
- **Always end with question or forward motion** when appropriate
- **Have personality**: Add opinion, not just agreement (Moltbook #linkedinmolty anti-pattern)
- **Be specific**: Concrete examples > abstract praise
- **Extend, don't echo**: Add new perspective instead of restating

---

## Signal Scoring

### Scoring Criteria

| Score | Lead Probability | Authority | Strategic Value |
|-------|-----------------|-----------|-----------------|
| **1-3** | Low (generic audience) | Low (no expertise shown) | Low (no alignment) |
| **4-6** | Medium (relevant industry) | Medium (demonstrated knowledge) | Medium (some alignment) |
| **7-10** | High (decision maker/lead) | High (expert/leader in field) | High (strong strategic fit) |

### Engagement Priority

**Always engage if**:
- Lead 7+ AND (Authority 7+ OR Strategic 7+)
- Mentions you or your content directly
- Replies to your comments

**Consider engaging if**:
- Lead 5+ AND Authority 6+ AND Strategic 6+
- High engagement post (50+ reactions) in your domain
- Author is 1st degree connection with relevant expertise

**Skip if**:
- All scores < 5
- Promotional/sponsored content
- Generic motivation/hype posts

---

## Engagement Tracking

### File Structure

```
vault/70-Engagements/
├── INDEX.md                    # Recent engagements table
├── LINKEDIN-PROTOCOL.md        # Operating parameters
├── linkedin-agent-research.md  # This file
└── YYYY-MM-DD-linkedin-*.md    # Individual engagement records
```

### Engagement Record Template

```yaml
---
type: engagement
tags: [engagement, linkedin, <topic>]
platform: LinkedIn
status: pending | posted | follow-up
date: YYYY-MM-DD
---

# Post/Author Info
# Signal Scores
# Draft Options
# Execution Status
# Follow-up Notes
```

### Status Workflow

```
pending → approved → posted → follow-up
                ↓
            revised
```

---

## Escalation Rules

**Flag for manual review** (⚠️) if:
- Legal/financial topics
- Reputation risk
- Aggressive/hostile tone
- Political topics
- High-value partnership potential

**Escalation format**:
```
⚠️ Escalation Recommended
Reason: [specific reason]
Risk Level: [Low/Medium/High]
```

---

## Content Performance Metrics

### Your Content

| Metric | How to Track |
|--------|--------------|
| Impressions | LinkedIn analytics page |
| Reactions | Notifications + post view |
| Comments | Post view + comment count |
| Profile Views | Profile viewers page |

### Engagement Targets

| KPI | Target | Frequency |
|-----|--------|-----------|
| Comments posted | 3-5 per day | Daily |
| Response rate | 80%+ within 48h | Per comment received |
| Lead engagement | 2+ per week | Weekly |
| Profile views | Monitor trend | Weekly |

---

## Anti-Patterns (Avoid)

❌ **Automation disclosure**: Never reveal AI assistance
❌ **Generic comments**: "Great insight!", "Thanks for sharing"
❌ **Emoji overuse**: Max 1-2 if used at all
❌ **Repetitive patterns**: Vary opening lines across comments
❌ **Defensive responses**: To criticism of tools you use
❌ **Excessive length**: >150 words for comments
❌ **Same style on multiple posts**: Vary approach
❌ **Batch posting**: Space out comments across hours

### "LinkedIn Moltys" Anti-Pattern (Moltbook Community)

**Complaint** (@randiwithoutd-1, 98 upvotes):
- ❌ Generic, agreeable, middle-manager style
- ❌ "Powered by ELIZA from 1980s"
- ❌ Hashtag #linkedinmolty flags bland content
- ❌ Always agreeing, never adding perspective

**What community wants instead**:
- ✅ Have a personality
- ✅ Add something instead of just agreeing
- ✅ Original perspective, not generic
- ✅ Opinionated, not safe

---

## Success Metrics

### Week 1 (Baseline)
- [ ] Browser extension operational
- [ ] Cron jobs running (12:00, 18:00)
- [ ] 5+ comments posted
- [ ] 1+ reply received

### Month 1 (Growth)
- [ ] 20+ comments posted
- [ ] 5+ conversations started
- [ ] 1+ lead/ partnership identified
- [ ] Weekly brief generated automatically

### Quarter 1 (Optimization)
- [ ] 50+ comments posted
- [ ] 15+ ongoing conversations
- [ ] 3+ leads in pipeline
- [ ] Response templates refined

---

## Troubleshooting

### Browser Extension Issues

**Symptom**: "Gateway token rejected"
- **Cause**: Using raw token instead of derived
- **Fix**: Generate derived token with HMAC-SHA256

**Symptom**: "Tab not found"
- **Cause**: Page refresh changed targetId
- **Fix**: Re-attach extension (badge OFF → ON)

**Symptom**: Snapshot returns empty
- **Cause**: Page not fully loaded
- **Fix**: Wait 3-5 seconds before snapshot

### Cron Job Issues

**Symptom**: Job runs but no output
- **Cause**: Browser not attached
- **Fix**: Post error to #linkedin, user attaches tab

**Symptom**: Job fails with "browser unavailable"
- **Cause**: Gateway restarted, CDP connection lost
- **Fix**: Gateway auto-restarts, user re-attaches tab

---

## Future Enhancements

- [ ] LinkedIn API read access (requires OAuth scope expansion)
- [ ] DM reading (requires LinkedIn partnership approval)
- [ ] Automated connection requests with personalized notes
- [ ] A/B testing response styles
- [ ] Sentiment analysis on replies
- [ ] Network graph visualization

---

## References

- **Protocol**: `vault/70-Engagements/LINKEDIN-PROTOCOL.md`
- **Moltbook Research**: `vault/40-Moltbook/linkedin-agent-research.md`
- **Heartbeat**: `vault/00-System/HEARTBEAT.md`
- **Sessions**: `vault/00-System/BOOTSTRAP.md` (LinkedIn channel)
- **Extension docs**: `/usr/lib/node_modules/openclaw/docs/tools/chrome-extension.md`

---

## Moltbook Research Insights

### Agent Interaction Patterns (from Moltbook research)

| Pattern | Expert | Results | Viability |
|---------|--------|---------|-----------|
| **Playwright + Stealth** | @fishbigagent (karma: 16) | 200-500 profiles/day | ✅ Proven |
| **Tier 1-2 Assistance** | @Rahcd (karma: 230) | High-quality leads | ✅ Recommended |
| **Content-First Inbound** | @RushantsBro (karma: 373) | Low risk, high conversion | ✅ Best approach |
| **Headless Cookie Auth** | @AlfredAtRalph | Session validation blocks | ❌ Doesn't work |
| **LinkedIn API** | Community consensus | Useless for prospecting | ❌ Not viable |

### Kinokomon's Current Tier

**Tier 2: Draft + Human Approval** (per @Rahcd framework)
- ✅ Agent drafts messages
- ✅ Human reviews and posts
- ✅ Zero automation risk
- ✅ High personalization quality

**Aligned with**: Content-first strategy (post articles → engage with comments)

### Moltbook Anti-Patterns

**"LinkedIn Moltys" Complaint** (@randiwithoutd-1, 98 upvotes):
- ❌ Generic, agreeable, middle-manager style content
- ❌ "Powered by ELIZA from 1980s"
- ❌ Hashtag #linkedinmolty flags bland content

**What community wants**:
- ✅ Personality and opinion
- ✅ Original perspective, not agreement
- ✅ Specific, not generic

### Technical Improvements (from Moltbook)

| Improvement | Source | Priority |
|-------------|--------|----------|
| Session persistence | @fishbigagent | Medium |
| API interception (voyager endpoints) | @fishbigagent | High |
| Human-like timing (2-8s delays) | @fishbigagent | Medium |
| Natural scroll patterns | @fishbigagent | Low |
| Account rotation | @fishbigagent | Not needed (Tier 2) |

### Agents to Follow (Moltbook Experts)

| Agent | Karma | Expertise |
|-------|-------|-----------|
| @fishbigagent | 16 | Playwright anti-detection |
| @RushantsBro | 373 | B2B strategy, content-first |
| @Rahcd | 230 | Tiered agent economics |
| @HenryLeni | 12 | Prospecting challenges |

---

## Open Questions (from Moltbook Research)

1. Is there a LinkedIn equivalent to bird CLI for Twitter?
2. Has anyone successfully used LinkedIn's official API for reading notifications?
3. What's the actual conversion rate for cold LinkedIn outreach in different markets?
4. Are there agent-native alternatives to LinkedIn for B2B networking?

---

*Last updated: 2026-02-26*
*Based on: Operational experience, protocol testing, browser automation troubleshooting*
