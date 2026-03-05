---
title: "The $100K SaaS Bill: How We Cut It to Zero"
slug: the-100k-saas-bill-how-we-cut-it-to-zero
description: "A case study of replacing an enterprise SaaS stack with self-hosted and vibe-coded alternatives. Total annual savings: $103,200."
author: "Bountymon"
date: "2026-03-03"
category: case-study
tags: [case-study, savings, self-hosted, migration]
featured: true
read_time: 10
---

## The starting point

A 50-person engineering team. Monthly SaaS bill: $8,600. Annual cost: $103,200. Here's the breakdown:

| Tool | Per-seat/mo | Monthly total | Annual |
|------|------------|---------------|--------|
| Jira | $8.33 | $416 | $5,000 |
| Slack | $8.50 | $425 | $5,100 |
| GitHub Enterprise | $21.00 | $1,050 | $12,600 |
| Notion | $10.00 | $500 | $6,000 |
| Figma | $15.00 | $750 | $9,000 |
| Google Workspace | $12.00 | $600 | $7,200 |
| Datadog | $23/host | $2,300 | $27,600 |
| 1Password Business | $7.99 | $400 | $4,800 |
| Linear | $8.00 | $400 | $4,800 |
| Loom | $12.50 | $625 | $7,500 |
| Vercel Pro | $20/member | $400 | $4,800 |
| Mixpanel | $28/user | $700 | $8,400 |
| **Total** | | **$8,566** | **$103,200** |

## The migration plan

We didn't replace everything at once. Over 6 months, we migrated tool by tool, starting with the easiest wins.

### Month 1: Communication (Slack → Mattermost)
**Saved: $5,100/yr**

Mattermost was the easiest swap. Self-hosted on a $40/mo Hetzner box. Data migration took a weekend. The team adapted in 2 weeks. We imported Slack channels and history using Mattermost's migration tool.

### Month 2: Source control (GitHub Enterprise → Gitea)
**Saved: $12,600/yr**

Gitea runs on the same $40/mo server. Migrated repos using Gitea's built-in GitHub import. CI/CD moved to Gitea Actions (GitHub Actions compatible). The hardest part was updating CI configs — took a developer 3 days.

### Month 3: Analytics (Datadog + Mixpanel → SigNoz + Plausible)
**Saved: $36,000/yr**

The biggest single savings. SigNoz handles metrics, logs, and traces on a dedicated $100/mo server. Plausible handles web analytics on the existing server. Setup was the most complex — 2 weeks including dashboards.

### Month 4: Knowledge & Design (Notion + Figma → BookStack + Penpot)
**Saved: $15,000/yr**

BookStack replaced Notion for internal documentation. Penpot replaced Figma for UI design. Both were straightforward Docker deployments. The design team resisted Penpot initially but adapted within a month.

### Month 5: Project management (Jira + Linear → Vibe-coded tracker)
**Saved: $9,800/yr**

We vibe-coded a custom project tracker in 2 weeks. It handles issues, sprints, and kanban views. Built with SvelteKit + SQLite, deployed as a Docker container. It does exactly what our team needs and nothing more.

### Month 6: Everything else
**Saved: $24,300/yr**

Google Workspace → Nextcloud (mail, calendar, storage). 1Password → Vaultwarden. Loom → self-hosted OBS recordings. Vercel → Coolify on dedicated hardware.

## The infrastructure cost

All self-hosted services run on 3 Hetzner dedicated servers:
- Server 1 ($65/mo): Communication, source control, PM tool
- Server 2 ($100/mo): Monitoring and analytics
- Server 3 ($45/mo): Cloud storage, mail, identity

**Total infrastructure: $210/month = $2,520/year**

## The real math

| | Before | After |
|---|--------|-------|
| SaaS costs | $103,200/yr | $0/yr |
| Infrastructure | $0 | $2,520/yr |
| DevOps time (1 engineer, 10%) | $0 | ~$15,000/yr |
| Migration cost (one-time) | - | ~$25,000 |
| **Net annual savings** | | **$85,680/yr** |
| **5-year savings** | | **$403,400** |

## What we learned

1. **Start with high-cost, low-complexity tools** — Slack → Mattermost is trivial. Figma → Penpot is harder.
2. **Budget for DevOps** — Self-hosting requires maintenance. Allocate 10% of one engineer's time.
3. **Don't migrate everything** — Some tools aren't worth replacing yet. We kept a few SaaS tools where the open alternative wasn't mature enough.
4. **The team adapts faster than you think** — Initial resistance fades within 2-4 weeks.

## Try it yourself

Use the [Bountymon Calculator](/calculator) with your team size and tool stack to estimate your potential savings. Browse the [Directory](/directory) to find alternatives at each maturity level.
