---
title: "Claude Code Costs $200/Month. Goose Does the Same Thing for Free."
slug: goose-free-claude-code-alternative
description: Block's open-source AI coding agent gives you Claude Code's power without the subscription, rate limits, or cloud dependency.
author: Bountymon
date: "2026-03-09"
category: news
tags: [ai-coding, open-source, subscription-alternatives, cost-savings]
featured: false
read_time: 5
---

Anthropic wants $200 a month for Claude Code Max. Block built the same thing and gave it away.

**Goose** is an open-source AI coding agent that runs entirely on your machine. No subscription. No cloud dependency. No rate limits that reset every five hours. Your code never leaves your computer.

This isn't a watered-down demo. Goose can build entire projects, debug failures, orchestrate workflows across multiple files, and interact with external APIs — just like Claude Code. The project has over 26,000 GitHub stars and 362 contributors. It's real, it's actively maintained, and it costs exactly zero dollars.

## The Claude Code pricing problem

Here's what Anthropic charges for Claude Code:

- **Pro ($20/month)**: 10-40 prompts every 5 hours. You'll burn through this in minutes.
- **Max ($100/month)**: 50-200 prompts, still rate-limited.
- **Max ($200/month)**: 200-800 prompts, plus access to Opus 4.5. But even this tier has weekly caps that power users hit within 30 minutes.

Anthropic defends the limits by saying they affect "fewer than 5% of users." But that statistic doesn't distinguish between 5% of Max subscribers (who are your heavy users by definition) and 5% of all users. When you're paying $200/month and hitting walls, the math doesn't feel right.

The kicker: those "hours" in the rate limits aren't actual hours. They're token-based calculations that vary wildly based on codebase size, conversation length, and task complexity. It's deliberately opaque.

## How Goose works

Goose takes a fundamentally different approach. Instead of routing everything through Anthropic's servers, it's model-agnostic:

- Use Anthropic's Claude via API (pay per token, not per subscription)
- Use OpenAI's GPT, Google's Gemini, or Groq
- **Run it entirely locally** with Ollama and open-source models like Qwen, Llama, or DeepSeek

That last option is where it gets interesting. With a local setup:

- **Zero subscription fees**
- **No usage caps**
- **Works offline** (yes, on airplanes)
- **Your code never leaves your machine**

Block built Goose as an "on-machine AI agent." It uses tool-calling to actually execute operations — creating files, running tests, checking GitHub PRs — not just generate text about what should happen.

## The trade-offs (and why they matter less than you think)

Let's be honest about the gaps:

**Model quality**: Claude 4.5 Opus is still the best coding model. But open-source models are closing fast. Kimi K2 and GLM 4.5 now benchmark near Claude Sonnet 4 levels — and they're free.

**Context window**: Claude offers 1 million tokens. Local models default to 4-8K. But many can be configured for longer contexts if you have the RAM.

**Speed**: Cloud models run on optimized infrastructure. Local models on consumer hardware are slower. But for iterative work, the lack of rate limits often makes this a wash.

**Setup complexity**: Goose requires more technical configuration than a SaaS product. If you want the "just works" experience, you pay for it.

## Why this matters for software buyers

The AI coding market is splitting into two camps:

1. **Premium cloud services** charging $20-200/month with rate limits and opaque pricing
2. **Open-source alternatives** that trade some polish for zero cost and full control

This is the same pattern we've seen everywhere else in software. The question isn't whether open-source catches up — it's whether you're paying for convenience or capability.

If you're already paying $200/month for Claude Code and hitting limits, Goose with a local model is worth exploring. The hardware requirements aren't trivial (32GB RAM is a solid baseline), but the ROI calculation is simple: a single month of Claude Max pays for a significant RAM upgrade.

## How to get started

1. Install **Ollama** from ollama.com
2. Pull a coding model: `ollama run qwen2.5`
3. Install **Goose** from github.com/block/goose
4. Configure Goose to use Ollama as the provider

That's it. You now have a capable AI coding agent running on your hardware, with no subscription, no rate limits, and complete privacy.

## The bottom line

Claude Code is excellent. But $200/month with rate limits is a hard sell when a free alternative exists. The open-source AI ecosystem is maturing faster than the subscription pricing models built to extract value from it.

Goose isn't perfect. But for a growing community of developers, those imperfections are acceptable trade-offs for something increasingly rare: a tool that actually belongs to you.

---

*Goose is available at [github.com/block/goose](https://github.com/block/goose). Ollama is available at [ollama.com](https://ollama.com). Both are free and open source.*
