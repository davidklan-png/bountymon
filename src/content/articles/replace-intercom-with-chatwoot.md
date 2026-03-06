---
title: Replace Intercom with Chatwoot - A Complete Migration Guide
slug: replace-intercom-with-chatwoot
description: How to migrate from Intercom's $13K/seat pricing to self-hosted Chatwoot in a weekend. Complete deployment guide with Docker, data migration, and feature comparison.
author: Bountymon
date: "2026-03-06"
category: guide
tags:
  - intercom
  - chatwoot
  - live-chat
  - customer-support
  - migration
featured: false
read_time: 12
---

# Replace Intercom with Chatwoot - A Complete Migration Guide

Intercom charges $74-$999 per seat per month for live chat and customer support. That's **$888-$11,988 per agent per year**. A 10-person support team on Intercom's Grow plan pays **$132,000 annually**—just to talk to customers.

Chatwoot offers the same multi-channel inbox, live chat widget, and automation features for **$0/year** in licensing. Host it on a $10/month VPS, and your total cost for 10 agents is $120/year.

This guide shows you how to migrate from Intercom to Chatwoot in a weekend.

## Why Chatwoot Over Intercom

| Feature | Intercom | Chatwoot |
|---------|----------|----------|
| **Cost per seat** | $74-$999/month | $0/month |
| **Data ownership** | Stored on Intercom's servers | Stored on your server |
| **Multi-channel** | Email, chat, social | Email, chat, WhatsApp, Facebook, Twitter, Telegram, Line |
| **Automation** | Bot workflows | Bot workflows + assignment rules |
| **Self-hosting** | ❌ Not available | ✅ Full control |
| **Open source** | ❌ Proprietary | ✅ MIT licensed |

**The critical difference:** Intercom uses your customer conversation data to train their AI. Chatwoot runs on your infrastructure—you own every message.

## Prerequisites

Before you start, you'll need:

- A Linux server (VPS) with 2GB RAM minimum
- Docker and Docker Compose installed
- A domain name pointing to your server
- SSL certificate (Let's Encrypt is free)
- 4-8 hours for initial setup

**Total cost:** $10-20/month for a basic VPS from DigitalOcean, Linode, or Hetzner.

## Step 1: Deploy Chatwoot with Docker

Chatwoot provides an official Docker Compose setup that handles PostgreSQL, Redis, Rails, and the web server.

```bash
# Clone the Chatwoot repository
git clone https://github.com/chatwoot/chatwoot.git
cd chatwoot

# Copy the example environment file
cp .env.example .env

# Edit the environment file
nano .env
```

**Required environment variables:**

```bash
# Your domain
FRONTEND_URL=https://chat.yourcompany.com

# Secret keys (generate with: rake secret)
SECRET_KEY_BASE=your-secret-key-here
RAILS_ENCRYPTION_KEY=your-encryption-key-here

# Database (handled by Docker Compose)
POSTGRES_HOST=postgres
POSTGRES_USERNAME=chatwoot
POSTGRES_PASSWORD=secure-password-here
REDIS_HOST=redis
REDIS_PASSWORD=another-secure-password

# Email (for notifications)
MAILER_SENDER_EMAIL=support@yourcompany.com
SMTP_ADDRESS=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**Deploy with Docker Compose:**

```bash
# Build and start all services
docker-compose up -d

# Run database migrations
docker-compose run --rm rails bundle exec rake db:create
docker-compose run --rm rails bundle exec rake db:migrate

# Create an admin user
docker-compose run --rm rails bundle exec rake admin:create
```

Your Chatwoot instance is now running at `http://your-server-ip:3000`.

## Step 2: Set Up SSL with Let's Encrypt

Never run a production service without HTTPS. Use Certbot to get a free SSL certificate:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate (make sure your domain points to this server)
sudo certbot --nginx -d chat.yourcompany.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

Update your `.env` file:

```bash
FRONTEND_URL=https://chat.yourcompany.com
ACTION_CABLE_URL=wss://chat.yourcompany.com/cable
```

Restart Chatwoot:

```bash
docker-compose restart
```

## Step 3: Configure the Website Widget

Chatwoot's website widget replaces Intercom's messenger. Add this snippet to your site:

```html
<script>
  window.chatwootSettings = {"position":"right","type":"expanded_bar","launcherTitle":"Chat with us"};
  (function(d,t) {
    var BASE_URL="https://chat.yourcompany.com";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: 'YOUR_WEBSITE_TOKEN',
        baseUrl: BASE_URL
      })
    }
  })(document,"script");
</script>
```

Get your website token from **Settings → Inboxes → Website → Configuration** in Chatwoot.

## Step 4: Migrate Data from Intercom

Intercom doesn't provide an export API for conversation history, but you can migrate:

**What you can export:**
- User/contact lists
- Company/account data
- Conversation metadata (not full transcripts)

**What you can't export:**
- Full conversation history
- Attachments
- Notes and internal comments

**Migration steps:**

1. **Export contacts from Intercom:**
   - Go to **Settings → Data → Export**
   - Export all contacts as CSV

2. **Import into Chatwoot:**
   - Go to **Settings → Contacts → Import**
   - Upload the CSV
   - Map fields (email, name, company)

3. **Keep Intercom read-only during transition:**
   - Set Intercom to "away" mode
   - Route new conversations to Chatwoot
   - Reference old Intercom conversations via URL in Chatwoot notes

**Pro tip:** Don't try to migrate 3 years of chat history. Start fresh with Chatwoot and use Intercom as an archive for the first 90 days.

## Step 5: Configure Channels

Chatwoot supports multiple channels out of the box:

**Email:**
- Connect any IMAP/SMTP inbox
- Support@, help@, billing@ all route to the same team inbox

**WhatsApp:**
- Requires WhatsApp Business API account
- Connect via Twilio or direct API

**Facebook Messenger:**
- Connect your Facebook Page
- Auto-reply with Facebook's guidelines

**Twitter/X:**
- Connect your Twitter account
- DMs become conversations

**Telegram:**
- Create a bot via @BotFather
- Paste the bot token into Chatwoot

## Step 6: Set Up Automation

Chatwoot's automation replaces Intercom's bots and workflows:

**Assignment rules:**
- Route conversations by keyword, language, or availability
- "Billing" → Billing team
- "Spanish" → Spanish-speaking agents

**Canned responses:**
- Create macros for common replies
- Type `/` to insert canned responses

**Chatbots:**
- Visual bot builder for qualification
- Trigger on specific pages or keywords
- No-code workflow editor

## Step 7: Train Your Team

Migration isn't just technical—it's cultural. Your support team needs to adapt:

**What's the same:**
- Multi-channel inbox
- Team collaboration
- Canned responses
- Analytics

**What's different:**
- Self-hosted means **you** handle updates
- No Intercom AI suggestions (yet)
- Interface is similar but not identical

**Training plan:**
1. Deploy Chatwoot on a staging domain
2. Run parallel for 2 weeks (Intercom + Chatwoot)
3. Switch production traffic to Chatwoot
4. Keep Intercom read-only for 90 days
5. Cancel Intercom subscription

## The ROI Math

**Intercom costs for 10 agents:**
- Grow plan: $13,200/seat/year × 10 = $132,000/year
- Plus: 7% annual price increase = $141,240/year 2

**Chatwoot costs:**
- Licensing: $0
- VPS hosting: $20/month × 12 = $240/year
- Setup time: 8 hours × $100/hour = $800 (one-time)
- **Total Year 1: $1,040**
- **Total Year 2+: $240/year**

**Break-even:** 2.9 days

**5-year savings:** $700,000+ (accounting for Intercom price increases)

## Common Issues and Fixes

**Problem:** WebSocket errors in production  
**Fix:** Ensure `ACTION_CABLE_URL` uses `wss://` not `ws://`

**Problem:** Email not sending  
**Fix:** Verify SMTP credentials and check `MAILER_SENDER_EMAIL` matches your domain

**Problem:** Slow performance with 50+ concurrent conversations  
**Fix:** Increase Redis memory allocation and enable Sidekiq workers

**Problem:** Widget not loading  
**Fix:** Check CORS settings and verify `FRONTEND_URL` matches your domain exactly

## When Chatwoot Isn't the Right Choice

Chatwoot is powerful, but it's not for everyone:

**Stick with Intercom if:**
- You're a 2-person team on the free tier
- You rely on AI-powered response suggestions
- You need product tours and onboarding flows
- You can't dedicate 8 hours to deployment

**Consider Zendesk or Freshdesk if:**
- You need enterprise SLAs and 24/7 support
- You want a managed cloud solution with zero ops
- You're willing to pay 40% of Intercom's pricing

## The Bottom Line

Intercom built a $1.3B business on a simple premise: "pay us forever to talk to your customers." Chatwoot breaks that model by offering the same inbox, chat, and automation features as open-source software.

You don't need Intercom's permission to talk to your customers. You don't need to let them mine your conversation data for AI training. You don't need to pay $132,000/year for 10 agents.

Deploy Chatwoot this weekend. Reclaim your customer conversations. Keep the $131,760.

---

**Next steps:**
- [Chatwoot documentation](https://www.chatwoot.com/docs)
- [Chatwoot Docker setup](https://www.chatwoot.com/docs/self-hosted/docker)
- [Intercom export guide](https://www.intercom.com/help/en/articles/2486-export-your-data)
