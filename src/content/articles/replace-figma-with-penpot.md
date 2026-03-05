---
title: "Replace Figma with Penpot: A Complete Migration Guide"
slug: replace-figma-with-penpot
description: "Figma charges 540 dollars per seat per year. Penpot is free and self-hosted. Here is how to migrate your design workflow without losing a beat."
author: "Bountymon"
date: "2026-03-06"
category: guide
tags: [guide, design, figma, penpot, migration]
featured: true
read_time: 8
---

Figma Enterprise costs $45/month per editor. For a 10-person design team, that's $5,400/year flowing to Adobe. Meanwhile, Penpot does 80% of what Figma does — and it's open source, self-hosted, and free forever.

Here's how to make the switch.

## Why Penpot works

Penpot isn't a watered-down Figma clone. It's a fundamentally different approach to design tooling:

**SVG-native.** Every design element is real SVG. No proprietary format, no vendor lock-in. Export any file, open it in any vector editor, migrate whenever you want.

**Self-hosted.** Your design assets live on your infrastructure. No worrying about Figma outages or Adobe changing their ToS.

**Real-time collaboration.** Multiplayer editing that matches Figma's experience. Multiple designers can work on the same file simultaneously.

**Open-source.** No feature gets removed because it doesn't fit the pricing tier. No forced migrations to new versions. The community controls the roadmap.

## What you'll miss

Be honest about the tradeoffs:

- **Plugin ecosystem.** Figma has hundreds of plugins for icon libraries, accessibility checks, design-to-code. Penpot has a growing plugin system but fewer options.

- **Dev Mode.** Figma's developer handoff features are polished. Penpot has code inspection but it's less refined.

- **Native mobile apps.** Penpot is web-only for now. No iPad app for sketching on the go.

- **Advanced prototyping.** Complex interactions, smart animate, variable states — Figma still leads here.

For most teams, these are edge cases. The core design workflow — creating components, building layouts, collaborating in real-time — works just as well in Penpot.

## Migration steps

### 1. Deploy Penpot (30 minutes)

The official Docker deployment is straightforward:

```bash
# Clone the deployment repo
git clone https://github.com/penpot/penpot-deploy
cd penpot-deploy/docker

# Configure your domain
echo "PENPOT_PUBLIC_URI=https://design.yourcompany.com" >> config.env

# Start the stack
docker compose up -d
```

You'll need a server with 2GB RAM minimum. A $6/mo DigitalOcean droplet handles a 20-person design team easily.

### 2. Export from Figma

Figma doesn't have a bulk export, but you can:

1. Select all frames in a file → Export as SVG
2. Use the Figma API to script bulk exports
3. For complex files, share with the Penpot community — volunteers help with migrations

The most important exports:
- Design system / component library
- Active project files
- Brand assets (logos, icons, colors)

### 3. Import to Penpot

Create a new file in Penpot, then drag-and-drop your SVG exports. Component imports work well for simple cases.

For design systems, you'll need to recreate:
- Color tokens (Penpot has a token system now)
- Typography styles
- Grid and layout settings
- Component variants

Plan 2-4 hours for a complete design system migration.

### 4. Update team workflows

The UI differences are minor. Key changes:

- **Left sidebar:** Layers and assets, same as Figma
- **Right sidebar:** Properties panel, nearly identical
- **Top bar:** Tools are in different positions but all the same concepts
- **Keyboard shortcuts:** Most match Figma (Cmd+D for duplicate, Cmd+G for group, etc.)

Share the Penpot docs with your team: https://help.penpot.app

### 5. Establish the new normal

Update your design file links in:
- Notion/Confluence documentation
- GitHub README files
- Slack channel descriptions
- Onboarding docs for new designers

## The savings math

| Cost category | Figma | Penpot |
|---------------|-------|--------|
| Software (10 seats) | $5,400/yr | $0 |
| Server hosting | $0 | $72/yr |
| Migration time | — | ~8 hours |
| **Year 1 total** | $5,400 | $72 |
| **Year 2+ total** | $5,400/yr | $72/yr |

**Break-even point:** Immediately. The migration pays for itself in month one.

For a 50-person design org: Figma costs $27,000/year. Penpot costs $72/year for the same server. That's $26,928 annually reclaimed.

## When to stick with Figma

Penpot isn't for everyone yet. Stay on Figma if:

- You rely heavily on Figma plugins daily
- Dev Mode is critical for your engineering handoff
- Your team uses Figma on iPad
- You need advanced prototyping with complex animations

But if your workflow is primarily component-based UI design with standard collaboration needs, Penpot is ready.

## Next steps

1. **Try Penpot Cloud first.** Use the hosted version at penpot.app to validate the workflow before self-hosting.

2. **Migrate one project.** Don't try to move everything at once. Pick a single active project and migrate it end-to-end.

3. **Join the community.** The Penpot Discord and forum are active. Help is available.

The moat is cracking. Design tools don't need to cost thousands per year. Penpot proves it.
