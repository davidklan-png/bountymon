---
title: "Your Platform Just Went Down Again. Still Trusting It With Everything?"
slug: vendor-dependency-lives-matter
description: "GitHub outage, Sora shutdown, Apple Business launch — one day, three reminders that vendor lock-in is a feature, not a bug. Time to take your stack back."
author: Bountymon
date: "2026-03-25"
category: news
tags: [github, openai, sora, apple, vendor-lock-in, self-hosting, sovereignty]
featured: false
read_time: 5
---

Yesterday was a masterclass in why putting your entire operation on someone else's platform is a bet you keep losing.

## GitHub Went Down. Again.

For the second time in recent weeks, GitHub suffered a major outage affecting Actions, Pull Requests, Issues, Webhooks, Codespaces, and even login. Not a partial hiccup — a full-service degradation that had teams staring at broken CI/CD pipelines, stalled code reviews, and zero ability to ship.

On Hacker News, the thread hit 314 points with 159 comments. The sentiment was familiar: resignation mixed with anger. Because what are you going to do? GitHub is where the code lives. GitHub Actions is how you deploy. GitHub is the air your team breathes.

That's the problem. When one company owns your entire development workflow, "down" doesn't mean inconvenience — it means paralysis. Your sprint board stops. Your deploys stop. Your team goes to get coffee and waits for a status page update from a company that may or may not post a root cause analysis "soon."

Self-hosted alternatives like Gitea, Forgejo, and Woodpecker CI exist. They're mature. They work. They don't go down because a Microsoft subsidiary had a bad Tuesday.

## Sora Is Dead After Months

On the same day, OpenAI announced it's shutting down Sora — its standalone AI video app — barely months after launch. The app that shocked Hollywood, that had Disney signing a $1 billion deal to integrate its characters, that was supposed to be OpenAI's creative crown jewel. Gone.

"We're saying goodbye to Sora," the company wrote. "We'll share more soon, including timelines for the app and API and details on preserving your work."

Translation: we built something, hyped it, got a billion-dollar partnership, and now we're pivoting. Hope you didn't build your workflow around it.

Disney is already out. Their spokesperson confirmed they're exiting the deal. If a $1B partner can't trust the platform's longevity, what chance does a freelance creative or a small studio have?

This is the subscription trap in its purest form: you pay monthly for access to something the vendor can kill on a whim. No migration path. No guarantee your data survives. No accountability beyond a "thank you for being part of the journey" tweet.

## Apple Business Wants to Be Your Everything

Not to be outdone, Apple announced Apple Business — an "all-in-one platform for businesses of all sizes" launching April 14. Because what the world was missing was another walled garden masquerading as a solution.

Apple Maps is getting ads this summer. Your business tools, your payment processing, your customer interactions — all wrapped up in Apple's ecosystem, with Apple's rules, Apple's fees, and Apple's priorities (which, history shows, change whenever Tim Cook has a quarterly call).

The HN thread hit 481 points. The top comments aren't excitement — they're wariness. Because developers and business owners have seen this movie before. A big tech company launches a "for business" suite, undercuts competitors with deep pockets, grows market share, then slowly tightens the screws. pricing, lock-in, data access — the squeeze always comes.

## The Pattern Is the Story

Look at these three events together:

- **GitHub**: your code, their infrastructure, their outage
- **Sora**: your creative work, their roadmap, their shutdown
- **Apple Business**: your business operations, their ecosystem, their rules

The common thread isn't technology — it's control. Every time you choose a vendor platform over a self-hosted alternative, you're trading sovereignty for convenience. And the bill always comes due.

Sometimes it's a two-hour outage during a critical deploy. Sometimes it's your entire creative tool getting sunset. Sometimes it's getting nickeled and dimed inside a walled garden you can't leave.

## The Alternative Exists

Self-hosting isn't 2010 anymore. Gitea gives you GitHub without the outages. ComfyUI and local Stable Diffusion give you AI video without the subscription. Nextcloud gives you file sharing without the data harvesting. The tools are good. The communities are active. The cost is a VPS and the willingness to own your stack.

At Bountymon, we believe software sovereignty isn't a luxury — it's a hygiene requirement. You wouldn't store your company's cash in someone else's wallet and hope they don't lose the combination. Why do it with your code, your data, and your creative tools?

The next time GitHub goes down — and it will — ask yourself: what would it take to run this yourself?

The answer, increasingly, is: less than you think.
