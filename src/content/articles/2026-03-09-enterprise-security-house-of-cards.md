---
title: "Enterprise Security Is a House of Cards"
slug: enterprise-security-house-of-cards
description: Google's latest report reveals half of all zero-days targeted buggy enterprise tech. The very tools meant to protect you—firewalls, VPNs—are your biggest vulnerabilities.
author: Bountymon
date: "2026-03-09"
category: news
tags: [security, enterprise, zero-day, self-hosting]
featured: false
read_time: 5
---

Here's a fun paradox: the security tools you pay thousands for each month are probably your biggest security risk.

Google's Threat Analysis Group just dropped their 2025 zero-day review, and the findings should make every IT director sweat. **48% of all tracked zero-day exploits last year targeted enterprise technology.** Not consumer apps. Not mobile devices. The stuff corporations spend fortunes on—firewalls, VPNs, virtualization platforms.

And here's the kicker: **about half of those exploited the very devices designed to protect enterprise networks.**

## The Guard Dogs Are the Problem

Cisco firewalls. Fortinet appliances. Ivanti VPNs. VMware platforms. These aren't obscure tools—they're the backbone of corporate security infrastructure. And according to Google's researchers, hackers exploited "common flaws, like input validation and incomplete authorization processes" to walk right through them.

This isn't sophisticated nation-state wizardry. These are basic programming errors in products costing tens of thousands of dollars annually. The kind of bugs that competent code review should catch. The kind that open-source projects with public scrutiny tend to find and fix faster.

The Clop ransomware gang exploited Oracle E-Business Suite vulnerabilities to steal HR data from Harvard, American Airlines, The Washington Post, and dozens of other organizations. Your employee data, sitting in enterprise software you paid premium prices for, extracted because someone didn't validate an input field properly.

## The Surveillance Vendor Pipeline

Google's report also notes a disturbing shift: more zero-days are now attributed to surveillance vendors—spyware makers working on behalf of governments—than to traditional state-backed espionage groups.

These vendors need vulnerabilities in enterprise infrastructure because that's where the targets are. Your firewall isn't just a firewall anymore. It's an attack surface that foreign governments and mercenary hackers are actively probing.

## Why Your Expensive Stack Is a Liability

The enterprise software model creates perverse incentives:

**Vendor lock-in means you can't leave.** When your entire infrastructure depends on proprietary firewalls and VPNs, you're stuck waiting for patches that may take weeks or months. In the meantime, you're exposed.

**Closed-source means no scrutiny.** When only the vendor's engineers can see the code, bugs fester. Open-source projects with thousands of eyes on the codebase tend to find vulnerabilities faster—and fix them faster.

**Complexity is the enemy.** Enterprise security suites have grown into bloated monsters with more features than anyone needs. Each feature is another potential vulnerability. Each integration is another attack vector.

**Pricing incentives are misaligned.** Vendors make money from seat licenses and support contracts, not from shipping bug-free software. There's no financial penalty for shipping insecure code—until a breach makes headlines.

## What Actually Works

This is where the self-hosting argument gets real. When you run your own infrastructure:

- **You control the update cycle.** No waiting for a vendor's quarterly patch cycle while your data leaks.
- **You can audit the code.** Open-source firewalls like pfSense and OPNsense let you see exactly what's running.
- **You reduce attack surface.** Simple, well-understood tools with minimal features have fewer bugs than "enterprise platforms" with 47 modules nobody uses.
- **You're not a lucrative target.** Surveillance vendors target popular enterprise products because one exploit yields thousands of victims. Your custom stack isn't worth their time.

## The Hard Truth

Google's report is a wake-up call that the industry won't want to hear. The enterprise security market is built on a foundation of closed-source, overcomplicated, poorly audited software that's actively being exploited by everyone from ransomware gangs to government spyware vendors.

Your firewall subscription isn't protecting you. Your VPN appliance isn't protecting you. Your "enterprise-grade" security stack is a target painted on your network.

The real security comes from control. From understanding what you're running. From the ability to patch immediately, audit thoroughly, and simplify ruthlessly.

That's not something you can buy from a vendor. That's something you have to build.

---

The full Google Threat Intelligence report is [available here](https://cloud.google.com/blog/topics/threat-intelligence/2025-zero-day-review). Spoiler: it doesn't get better the more you read.
