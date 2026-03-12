---
title: "Railway Raises $100M to Kill AWS — And They Built Their Own Data Centers to Do It"
slug: railway-100m-aws-challenger
description: "A 30-person startup raised $100M to challenge Amazon and Google by abandoning cloud providers entirely and building their own infrastructure from scratch."
author: Bountymon
date: "2026-03-12"
category: news
tags: [cloud, aws, infrastructure, cost-savings, ai-coding]
featured: false
read_time: 5
---

While everyone else is racing to rent more capacity from Amazon, a 30-person startup called Railway just raised $100 million to do the exact opposite: build their own data centers and stop paying the hyperscaler tax entirely.

The result? Customers are reporting **87% cost reductions** and infrastructure bills dropping from $15,000/month to $1,000/month.

## The Problem: You're Paying for Empty VMs

Here's the dirty secret of cloud computing that AWS, Google, and Microsoft don't want you to think about: **you're probably using 10% of what you're paying for.**

The traditional cloud model charges you for provisioned capacity whether you use it or not. Spin up a VM, pay for it 24/7/365. Most teams over-provision "just in case" and end up with massive bills for idle compute.

Railway's founder Jake Cooper put it bluntly: "The big guys have this mammoth pool of cash coming from people who provision a VM, use maybe 10 percent of it, and still pay for the whole thing."

## The Unthinkable Solution: Build Your Own Data Centers

In 2024, Railway made a decision that most cloud startups would consider suicidal: **they abandoned Google Cloud entirely and built their own data centers from scratch.**

The logic was simple. If you want to compete on price and performance, you can't rent from your competitors and mark it up. You need to own the stack.

"When you're charging for VMs that usually sit idle in the cloud, and we've purpose-built everything to fit much more density on these machines, you have a big opportunity," Cooper explained.

The bet paid off. When widespread outages hit major cloud providers recently, Railway stayed online. They own the network, compute, and storage layers — no dependencies on someone else's infrastructure.

## The Pricing Model That Should Terrify AWS

Railway charges by the second for actual usage:

- **$0.00000386** per gigabyte-second of memory
- **$0.00000772** per vCPU-second
- **$0.00000006** per gigabyte-second of storage

No charges for idle capacity. No paying for empty VMs. Just actual compute used.

The numbers speak for themselves. Daniel Lobaton, CTO at G2X (a platform serving 100,000 federal contractors), saw his infrastructure bill drop from $15,000/month to $1,000/month after migrating. Deployment speeds improved 7x.

"The work that used to take me a week on our previous infrastructure, I can do in Railway in like a day," Lobaton said. "If I want to spin up a new service and test different architectures, it would take so long on our old setup. In Railway I can launch six services in two minutes."

## Why AI Coding Makes This Matter Now

The timing isn't coincidental. AI coding assistants like Claude Code, Cursor, and GitHub Copilot are generating code faster than ever. That code needs somewhere to run.

"When godly intelligence is on tap and can solve any problem in three seconds, those amalgamations of systems become bottlenecks," Cooper said. "What was really cool for humans to deploy in 10 seconds or less is now table stakes for agents."

Traditional deployment pipelines take 2-3 minutes. Railway claims under one second. When AI agents are iterating rapidly, that difference compounds quickly.

## The 30-Person Team Generating Tens of Millions

Here's the part that should really concern AWS shareholders: Railway achieved all this with **30 employees** generating "tens of millions" in annual revenue.

They hired their first salesperson last year. They have two solutions engineers. Two million users found them through word of mouth — no marketing spend.

"We basically did the standard engineering thing: if you build it, they will come," Cooper said. "And to some degree, they came."

Now 31% of Fortune 500 companies use Railway in some capacity. Not because a sales team convinced them — because developers tried it, saved money, and told their colleagues.

## What This Means for You

If you're paying AWS or GCP bills that make you wince, you have options:

1. **Audit your idle capacity.** How many VMs are sitting mostly empty?
2. **Consider second-tier clouds.** Railway, Fly.io, Render — they're hungry for your business and priced to win it.
3. **Think about owned infrastructure for stable workloads.** If you know you'll need X compute for Y years, owning might beat renting.

The hyperscalers have had a great run convincing everyone that renting is the only sane choice. But a 30-person startup just proved that sometimes the best way to escape vendor lock-in is to stop being a vendor's customer entirely.

---

The real question isn't whether Railway will succeed — with $100M in the bank and 15% month-over-month growth, they're already succeeding. The question is how long AWS and Google can keep charging for empty capacity before the exodus becomes impossible to ignore.
