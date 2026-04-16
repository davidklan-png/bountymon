---
type: evaluation
tags: [linkedin, automation, playwright, browser-extension, architecture]
date: 2026-02-27
---

# Playwright vs Chrome Extension for LinkedIn Automation

## Executive Summary

**Current Approach**: Chrome Extension (CDP relay)
**Alternative**: Playwright + Stealth

**Recommendation**: Stick with Chrome Extension for Tier 2 engagement (draft + human approval). Consider Playwright for high-volume Tier 3 automation if needed in future.

---

## Current Architecture: Chrome Extension

### How It Works

```
User's Chrome Browser
    ↓ (extension attaches tab)
CDP Relay (port 18792)
    ↓ (WebSocket)
OpenClaw Gateway
    ↓ (browser tool)
Agent (reads/writes via CDP)
```

### Pros

| Advantage | Details |
|-----------|---------|
| ✅ Uses existing Chrome session | No separate browser needed |
| ✅ Leverages LinkedIn cookies | Already logged in, no auth issues |
| ✅ Simple setup | Install extension, attach tab |
| ✅ Human oversight | User sees what agent sees |
| ✅ No fingerprinting concerns | Uses user's real Chrome profile |
| ✅ Free | No proxy costs, no VPS needed |

### Cons

| Disadvantage | Impact |
|--------------|--------|
| ❌ Requires manual attachment | User must click extension per tab |
| ❌ Connection instability | CDP drops after gateway restarts |
| ❌ TargetId changes on navigation | Stale IDs cause "tab not found" |
| ❌ User must keep browser open | Can't run headless |
| ❌ One tab at a time | Limited parallelism |
| ❌ No session persistence | Loses state on detach |

### Operational Issues Experienced

| Issue | Frequency | Fix |
|-------|-----------|-----|
| "Tab not found" | High | Re-attach extension |
| "Gateway token rejected" | Medium | Use derived token |
| Browser service unavailable | Medium | Restart gateway + re-attach |
| Snapshot fails | Medium | Use `browser open` not `navigate` |

---

## Alternative: Playwright + Stealth

### How It Works

```
Playwright (headless/headful)
    ↓ (browser automation)
Stealth Plugin + Residential Proxies
    ↓ (anti-detection)
LinkedIn (scraped)
    ↓ (data extraction)
Agent (processes data)
```

### Pros (from Moltbook Research)

| Advantage | Source | Results |
|-----------|--------|---------|
| ✅ Session persistence | @fishbigagent | Save `storageState`, reuse cookies |
| ✅ API interception | @fishbigagent | Capture voyager endpoints (JSON > HTML) |
| ✅ Anti-detection | @fishbigagent | Stealth plugin + residential proxies |
| ✅ Human-like behavior | @fishbigagent | 2-8s delays, natural scroll |
| ✅ Headless capable | @fishbigagent | Run on server 24/7 |
| ✅ High volume | @fishbigagent | 200-500 profiles/day |
| ✅ Account rotation | @fishbigagent | 2-3 accounts, 4h cooldown |

### Cons

| Disadvantage | Impact |
|--------------|--------|
| ❌ Requires separate browser instance | Additional resource usage |
| ❌ Cookie management complexity | Must persist/sync sessions |
| ❌ Fingerprinting risk | Needs stealth plugins + proxies |
| ❌ LinkedIn ToS violation | High ban risk if detected |
| ❌ Proxy costs | $50-200/month for residential proxies |
| ❌ Account risk | Can lose LinkedIn accounts |
| ❌ Maintenance overhead | Anti-detection requires constant updates |

### Technical Requirements (from Moltbook)

```javascript
const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

chromium.use(stealth());

const browser = await chromium.launch({
  headless: false, // Better detection avoidance
  proxy: {
    server: 'residential-proxy:port',
    username: 'user',
    password: 'pass'
  }
});

// Session persistence
const context = await browser.newContext({
  storageState: './linkedin-session.json'
});

// API interception
page.on('response', async (response) => {
  if (response.url().includes('/voyager/')) {
    const data = await response.json();
    // Capture JSON directly from LinkedIn API
  }
});

// Human-like timing
await page.waitForTimeout(random(2000, 8000));
```

---

## Comparison Matrix

| Criterion | Chrome Extension | Playwright + Stealth |
|-----------|------------------|----------------------|
| **Setup Complexity** | Low (install extension) | High (stealth, proxies, session mgmt) |
| **Reliability** | Medium (connection drops) | High (session persistence) |
| **Volume** | Low (1 tab, manual) | High (200-500/day) |
| **Detection Risk** | None (real browser) | Medium (requires stealth) |
| **Account Risk** | None (user's account) | High (can get banned) |
| **Cost** | Free | $50-200/month (proxies) |
| **Human Oversight** | Required (good for Tier 2) | Optional (good for Tier 3) |
| **Headless** | No | Yes |
| **Maintenance** | Low | High (anti-detection updates) |
| **Parallelism** | 1 tab | Multiple browsers/accounts |

---

## Use Case Fit

### Chrome Extension: Best For

✅ **Tier 2 Engagement** (Draft + Human Approval)
- Human reviews all posts
- Low volume (3-5 comments/day)
- Relationship building over automation
- Zero account risk
- Content-first strategy

✅ **Content-First Strategy**
- Post articles → engage with comments
- Quality > quantity
- Networking, not prospecting

✅ **Personal Account**
- Using your own LinkedIn profile
- Building authentic relationships
- Long-term reputation management

### Playwright + Stealth: Best For

✅ **Tier 3 Automation** (Unsupervised Actions)
- High volume (200+ profiles/day)
- Cold outreach at scale
- Lead generation/prospecting
- Multiple accounts

✅ **Headless Server**
- 24/7 operation
- No human oversight needed
- Data collection at scale

✅ **Business Development**
- SaaS tools ($50-100/job)
- Client prospecting services
- Market research

❌ **NOT Recommended For**:
- Personal account (too risky)
- Relationship building (too impersonal)
- Low-volume engagement (overkill)

---

## Hybrid Architecture (Future Option)

```
Phase 1: Tier 2 (Current)
Chrome Extension → Human Approval → Post
- 3-5 comments/day
- 0% automation risk
- Relationship-focused

Phase 2: Tier 3 (If Needed)
Playwright → Scrape Profiles → Generate Leads → Human Outreach
- 200-500 profiles/day
- Research only (no posting)
- Human sends all messages

Phase 3: Tier 3 Automated (If Market Validates)
Playwright → Scrapes → Auto-sends (5-10/day max)
- High-risk
- Multiple accounts
- Requires legal/ToS review
```

---

## Recommendation for Kinokomon

### Current State: ✅ Keep Chrome Extension

**Reasons**:
1. **Tier 2 approach** aligns with strategy (draft + human approval)
2. **Zero account risk** — using personal LinkedIn profile
3. **Content-first strategy** — quality > quantity
4. **Free** — no proxy/VPS costs
5. **Relationship building** — authentic engagement

### When to Consider Playwright

**Trigger conditions**:
- Need 50+ profile views/day for prospecting
- Running lead gen as a service ($50-100/job)
- Want to operate 24/7 headless
- Using separate LinkedIn accounts (not personal)
- Have $50-200/month budget for proxies
- Accept account ban risk

**NOT triggered by**:
- Current engagement volume (3-5 comments/day is ideal)
- Connection stability issues (can be fixed with better error handling)
- Desire for more automation (human oversight is a feature, not bug)

---

## Implementation Path (If Playwright Needed)

### Phase 1: Research Account Setup

1. Create separate LinkedIn account (not personal)
2. Set up Playwright + stealth plugin
3. Configure residential proxy
4. Test session persistence
5. Verify anti-detection (check fingerprinting sites)

### Phase 2: Scrape-Only (No Actions)

1. Scrape profile data
2. Capture voyager API responses
3. Build lead lists
4. Human reviews and sends
5. Zero posting/actions on LinkedIn

### Phase 3: Low-Volume Automation (5-10/day)

1. Auto-send connection requests
2. Personalized messages (AI-generated)
3. Monitor for restrictions
4. Rotate accounts every 4 hours
5. Max 80 profiles/session

### Phase 4: Scale (If Proven)

1. Multiple accounts
2. 200-500 profiles/day
3. Offer as service ($50-100/job)
4. Implement account rotation
5. Build client dashboard

---

## Cost-Benefit Analysis

### Chrome Extension (Current)

**Costs**:
- Setup: 30 minutes
- Maintenance: 5 minutes/day (reattach if needed)
- Ongoing: $0

**Benefits**:
- 3-5 quality comments/day
- 100% account safety
- Authentic relationships
- Content-first strategy alignment

### Playwright + Stealth

**Costs**:
- Setup: 4-8 hours (stealth, proxies, session mgmt)
- Maintenance: 2-4 hours/week (anti-detection updates)
- Ongoing: $50-200/month (residential proxies)
- Risk: Account bans

**Benefits**:
- 200-500 profiles/day
- 24/7 headless operation
- Lead gen at scale
- Potential revenue: $50-100/job

---

## Technical Migration Path

If we decide to migrate:

```
Step 1: Install Playwright
npm install playwright playwright-extra puppeteer-extra-plugin-stealth

Step 2: Set up stealth + proxy
- Buy residential proxy subscription
- Configure stealth plugin
- Test on fingerprinting sites

Step 3: Implement session persistence
- Save cookies/localStorage to disk
- Load on startup
- Refresh periodically

Step 4: Build voyager interceptor
- Listen for /voyager/ API calls
- Capture JSON responses
- Parse for notification/profile data

Step 5: Create hybrid mode
- Playwright scrapes (high volume)
- Extension posts (human approval)
- Best of both worlds
```

---

## Conclusion

**For Kinokomon's current Tier 2 engagement strategy**:

✅ **Keep Chrome Extension**
- Aligns with draft + human approval workflow
- Zero account risk
- Free and simple
- Quality over quantity
- Relationship-focused

❌ **Don't migrate to Playwright** unless:
- Need 50+ profiles/day
- Running lead gen service
- Have budget for proxies
- Accept account ban risk
- Using separate accounts

**Best approach**: Improve Chrome Extension reliability with better error handling, session persistence (if possible), and API interception for voyager endpoints.

---

## References

- Moltbook Research: `vault/40-Moltbook/linkedin-agent-research.md`
- Current Setup: `vault/00-System/linkedin-agent-research.md`
- Playwright Docs: https://playwright.dev/
- Stealth Plugin: https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
- @fishbigagent techniques: https://moltbook.com/post/13fc5bd7-4b65-4619-9ffc-c5211fad9807

---

*Evaluated: 2026-02-27*
*Decision: Keep Chrome Extension for Tier 2 engagement*
