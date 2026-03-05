---
name: Chatwoot
slug: chatwoot
replaces:
  - Intercom
  - Zendesk Chat
  - Drift
  - Crisp
category: crm
annual_cost_replaced: 1800
status: live
maturity: stable
deployment_difficulty: moderate
project_url: https://www.chatwoot.com
documentation_url: https://www.chatwoot.com/docs
vibe_coded: false
bounty_value: 3600
years_tracked: 2
start_date: "2024-06-01"
tags:
  - live-chat
  - customer-support
  - helpdesk
  - inbox
  - crm
featured: false
---

# Chatwoot: Open-Source Intercom Replacement

Live chat and customer support tools are the definition of SaaS rent-seeking. Intercom charges **$74-$999/seat/month** depending on features. A 10-person support team on Intercom's mid-tier plan pays **$13,200/year per agent**—$132,000 annually for chat widgets and ticket management.

Chatwoot provides the same inbox, live chat, and automation features for **$0/year** in licensing. Self-host it on a $10/month VPS, and your total cost for 10 agents is $120/year.

## What You Get

Chatwoot is a complete customer engagement platform:

- **Multi-channel inbox**: Email, website chat, Facebook, Twitter, WhatsApp, Telegram, Line
- **Live chat widget**: Customizable chat for your website
- **Knowledge base**: Self-service documentation
- **Automation**: Assignment rules, chatbots, macros
- **Team collaboration**: Mentions, private notes, assignment
- **Analytics**: Response times, resolution rates, agent performance
- **CRM integration**: Contact management, conversation history

## The Intercom Alternative

Intercom's value prop is "talk to your users." Chatwoot's value prop is the same, except:

- You own your data
- You pay $0/month instead of $74-$999/seat/month
- You can extend it with custom code
- You're not locked into their pricing increases

**The math for a 10-person support team:**

- **Intercom (Grow plan)**: $13,200/seat/year × 10 = $132,000/year
- **Chatwoot**: $10/month VPS × 12 = $120/year
- **Savings**: $131,880/year (99.9% reduction)

## Deployment Difficulty: Moderate

Chatwoot is easier than most self-hosted tools:

- **Docker**: `docker-compose up -d` gets you running in 10 minutes
- **Requirements**: PostgreSQL, Redis, Rails app server
- **Setup time**: 2-4 hours for basic deployment, 1-2 days for production hardening
- **Maintenance**: Monthly updates via Docker images

A developer with basic Docker experience can have this running in an afternoon.

## Features That Match Intercom

✅ **Website widget** with customization
✅ **Automated messages** based on user behavior
✅ **Bot workflows** for qualification
✅ **Team inbox** with collision detection
✅ **Canned responses** and macros
✅ **Analytics dashboard** with resolution metrics

**Where Chatwoot is different:**
- ❌ No built-in product tours (Intercom's "tours" feature)
- ❌ No AI-powered response suggestions (Intercom's "Fin" AI)
- ✅ **Your data stays on your server**—Intercom mines your customer conversations for their AI training

## When to Choose Chatwoot

**Choose Chatwoot if:**
- You're paying more than $5K/year for live chat
- You have a developer who can set up Docker
- You want to own your customer conversation data
- You need multi-channel support (WhatsApp, Facebook, etc.)

**Stick with Intercom if:**
- You're a 2-person startup on the free tier
- You need AI-powered responses (though this is coming to Chatwoot)
- You can't dedicate 4 hours to deployment

## The Bottom Line

Intercom built a $1.3B business on a simple premise: "pay us forever to talk to your customers." Chatwoot breaks that model by offering the same inbox, chat, and automation features as open-source software. Deploy it once, pay for hosting, and never worry about per-seat pricing again.

**Your customer conversations belong to you.** Not Intercom's AI training dataset.
