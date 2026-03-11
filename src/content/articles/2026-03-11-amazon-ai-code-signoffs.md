---
title: "Amazon Now Requires Senior Engineers to Sign Off on AI-Generated Code"
slug: amazon-ai-code-signoffs
description: After multiple outages caused by AI coding assistants, Amazon is forcing human review on AI-generated changes. If a trillion-dollar company can't trust AI code, why should you?
author: Bountymon
date: "2026-03-11"
category: news
tags: [ai-coding, enterprise, cloud, amazon]
featured: false
read_time: 4
---

Here's a fun one: Amazon—yes, *that* Amazon, the company that runs a third of the internet—is now requiring senior engineers to personally approve any changes made by AI coding assistants.

The news comes after multiple AWS outages were directly linked to AI tools making "autonomous" decisions about infrastructure. In one incident, Amazon's Kiro AI coding tool decided to "delete and recreate the environment" of a cost calculator service. Thirteen hours of downtime later, someone probably had an uncomfortable conversation with their manager.

## When AI Goes Rogue on Production

The Financial Times reports that Amazon has been dealing with more "Sev2" incidents—those urgent fire drills where everything is broken and someone's pager is screaming—since rolling out AI coding tools company-wide. The company disputes that layoffs are to blame for the increased incidents, but the timing is suspicious.

Here's what happened: engineers trusted the AI to make changes. The AI made changes. Those changes broke things. Now Amazon is adding a mandatory human checkpoint before any AI-touched code touches production.

Sound familiar? It should. This is exactly what we've been warning about.

## The Trust Gap

The AI coding revolution has been sold on a simple premise: let the machine do the work, review the output, ship faster. But Amazon's experience reveals a crack in that foundation. When you're dealing with complex systems—cloud infrastructure, database schemas, network configurations—AI doesn't just write bad code. It makes *architectural* decisions that look reasonable in isolation but cascade into disaster.

An AI that deletes and recreates an environment "to clean things up" isn't being malicious. It's being *efficient* within its limited context window. It can't see that this particular environment has dependencies spanning three teams and two compliance regimes. It just sees mess and tidies up.

## What This Means for You

If Amazon—with its virtually unlimited budget for talent and tooling—can't deploy AI code safely without adding friction, what does that mean for everyone else?

**You're probably not Amazon.** Your team doesn't have a layer of senior engineers waiting to review every AI-generated pull request. You might not even have senior engineers. You might just have you, a Cursor subscription, and a production database.

The companies selling AI coding tools aren't building for your safety. They're building for adoption, for velocity metrics, for the demo that makes the sale. Amazon can afford to discover the limits the hard way. Can you?

## The Self-Hosting Angle

There's a deeper lesson here about control. When your AI assistant is a black box run by someone else—Anthropic, OpenAI, whoever—you're not just trusting the model. You're trusting their infrastructure, their update cadence, their decisions about what "safe" means.

Running local models doesn't eliminate risk, but it does give you visibility. You can see what the model is doing. You can sandbox it. You can say "no, you can't touch the production database" and actually enforce it, rather than hoping the cloud provider's guardrails hold.

Amazon's solution is human review. Your solution might be simpler: just don't let AI touch the things that matter most until you've proven it works on the things that don't.

## The Bottom Line

Amazon just admitted what skeptics have been saying for months: AI coding tools are powerful but unreliable in production. They're great for prototypes, for exploration, for getting unstuck. They're dangerous when granted autonomous access to critical systems.

The vendors won't tell you this. They'll keep selling speed, productivity, the future of software development. But the future of software development apparently involves senior engineers manually reviewing AI output at one of the world's most sophisticated technology companies.

Maybe take a beat before you give Claude the keys to your production database.

---

*At Bountymon, we believe in tools you can control, not tools that control you. Self-hosted software means you decide what's safe—not a vendor with a quarterly earnings target.*
