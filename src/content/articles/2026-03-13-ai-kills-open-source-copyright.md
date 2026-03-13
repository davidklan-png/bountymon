---
title: "AI Just Killed Open Source Copyright (And That's Either Terrifying or Liberation)"
slug: ai-kills-open-source-copyright
description: A new service uses AI to perform clean-room reverse engineering in minutes. The legal principle is ancient. The technology is new. Everything about software licensing is about to change.
author: Bountymon
date: "2026-03-13"
category: news
tags: [ai, open-source, copyright, sovereignty]
featured: false
read_time: 6
---

Here's something that's been brewing in the open source world, and it's either the most brilliant or most destructive thing to happen to software in decades.

A project called **Malus** just launched "Clean Room as a Service." The pitch is simple: give them any open source package, and their AI will legally clone it in under five minutes. Not by copying. By doing something that's been legal since 1879 but used to take months and entire engineering teams.

## The Legal Loophole That's Always Been There

In 1879, the Supreme Court ruled in *Baker v. Selden* that copyright protects expression, not ideas. You can own your specific code. You can't own what the code does.

This gave us "clean-room engineering": one engineer studies the original, writes a specification, hands it to a second engineer who has never seen the source, and they build it fresh. Phoenix Technologies used this in 1984 to clone IBM's BIOS. It took months. It was perfectly legal. It's why you can buy any motherboard today.

Malus compressed that process from months to minutes using AI.

They've already "liberated" `left-pad` (the 11-line package that broke the internet in 2016) in ten seconds. They did SPACEWAR! in five seconds. The legal framework hasn't changed. The technology has.

## Why This Matters for Software Buyers

Here's the uncomfortable truth: open source has always been built on a gentleman's agreement. Companies use billions of dollars worth of free software maintained by people they don't employ, don't pay, and don't even know. The entire thing runs on goodwill and copyright enforcement.

Malus just walked through the copyright enforcement part.

Their blog (which reads like dystopian corporate satire written by someone who's been hurt) lists every open source supply chain disaster: Log4Shell, left-pad, colors.js, node-ipc. The message is clear: you built your company on software maintained by strangers with no SLA. We can give you that same software, legally, with actual support.

Is it evil? Maybe. Is it legal? Apparently. Is it coming either way? Absolutely.

## The Sovereignty Angle

For companies tired of subscription fatigue and vendor lock-in, this is... complicated. On one hand, this could mean genuine alternatives to proprietary software created faster than ever. On the other hand, it could mean the end of the open source ecosystem as we know it.

If anyone can clone your MIT-licensed project and sell it as a proprietary product legally, why would anyone maintain open source?

The answer might be: they won't. Or the answer might be: they will, but under different terms. Bounties. Support contracts. Actual relationships instead of license files.

## What We're Watching

This is early, but the implications are massive. If AI can legally bypass copyright by doing what humans have done legally for over a century, just faster, then:

- **Copyleft licenses (GPL, AGPL) become less meaningful** — the "viral" nature depends on copyright, which clean-room engineering sidesteps
- **Proprietary software becomes more vulnerable** — the same technique works on closed-source behavior
- **The entire software licensing industry gets disrupted** — what's a license worth when the functionality can be legally cloned?

Malus might be satire. It might be real. It might be both. But the technical capability is real, and someone was going to do this eventually.

Welcome to the post-copyright software economy. It was nice knowing you, GPL.

---

*At Bountymon, we believe in actual ownership of your software stack. If the legal foundations of open source are cracking, maybe it's time to think about what "sovereignty" really means for your business.*
