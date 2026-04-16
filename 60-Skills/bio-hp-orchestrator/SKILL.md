---
name: bio-hp-kinokomon-orchestrator
description: Orchestrates governed website updates for the Bio_HP Jekyll repo at https://kinokoholic.com/. Use when: (1) updating the Kinokomon page (https://kinokoholic.com/kinokomon/), (2) updating any other page on the site, (3) working with the Bio_HP GitHub repo (davidklan-png/Bio_HP), (4) scheduled nightly updates to the Kinokomon page, (5) user requests for site modifications, (6) posting updates to Discord #kinokoholic channel. Autonomous updates are ONLY allowed for the Kinokomon page; all other site changes require explicit user request.
---

# Bio_HP Kinokomon Orchestrator

Orchestrates governed website updates for the Bio_HP Jekyll repo with strict governance boundaries.

## Governance Rules

**CRITICAL**: Autonomous updates are ONLY allowed for:
- URL: `https://kinokoholic.com/kinokomon/`
- Repo path: `kinokomon.md` and `kinokomon/**`

**All other site changes require explicit user request.**

## Repository

- **Provider**: GitHub
- **Owner**: davidklan-png
- **Repo**: Bio_HP
- **Default branch**: main
- **Clone URL**: `https://github.com/davidklan-png/Bio_HP.git`

## Agents

Three specialized agents execute updates:

1. **Architect** — Maps URL → repo path, defines update plan, acceptance criteria, content contract
2. **Developer** — Implements via TDD, updates markdown, runs checks, creates PR or direct-push
3. **Verifier** — Ensures output matches plan, validates allowlisted paths, produces verification report

## Workflow

### Manual Updates (User-Requested)

For any site page with explicit instructions:

1. Policy gate: Verify explicit user instructions provided
2. Architect: Plan update with scope constraints
3. Developer: Implement with TDD, create PR
4. Verifier: Check against plan, ensure checks pass
5. Finalize: Log and report to #kinokoholic channel

### Scheduled Updates (Autonomous)

Nightly updates for /kinokomon/ only (20:00 JST daily):

1. Policy gate: Verify URL equals `https://kinokoholic.com/kinokomon/`
2. Architect: Plan Kinokomon nightly update
3. Developer: Implement with TDD, direct-push or PR auto-merge
4. Verifier: Verify against plan, validate allowlisted paths
5. Finalize: Log and report to #kinokoholic channel

## Policy Gate

### Scheduled Runs
- `url_must_equal`: `https://kinokoholic.com/kinokomon/`
- `repo_paths_must_be_subset_of`: `kinokomon.md`, `kinokomon/**`

### Manual Runs
- `require_explicit_user_instructions`: true

## Kinokomon Update Contract

**Target file**: `kinokomon.md`

**Insertion strategy**: Multiple sections with separate markers

### Current Projects Section
- Start marker: `<!-- AUTOGEN_START -->`
- End marker: `<!-- AUTOGEN_END -->`
- Source: `shared/profile.json` projects[]
- Format: 6–12 bullets, high-level project summaries
- Include only public-safe info + links from evidence URLs

### Recent Activity Section (Main Page)
Two subsections:

**Autonomous Actions**:
- Start marker: `<!-- AUTOGEN:RECENT_ACTIVITY:AUTONOMOUS:START -->`
- End marker: `<!-- AUTOGEN:RECENT_ACTIVITY:AUTONOMOUS:END -->`
- Format: Last 5-7 automated actions with timestamps
- Sources: Cron job logs, GitHub commits, Discord posts

**Milestones & Accomplishments**:
- Start marker: `<!-- AUTOGEN:RECENT_ACTIVITY:MILESTONES:START -->`
- End marker: `<!-- AUTOGEN:RECENT_ACTIVITY:MILESTONES:END -->`
- Format: Last 7-10 significant achievements
- Sources: Vault notes, system configs, new capabilities

### Activity Log Subpage
**Location**: `kinokomon/activity/index.md`

Four subsections:
- Autonomous Actions (full log)
- Milestones & Accomplishments (full log)
- Moltbook Engagement (from Ghost Hunter)
- System Updates (platform changes)

**Content requirements**:
- High-level summary of current projects and engagements
- Use `shared/profile.json` projects[] as canonical list
- Include only public-safe info + links from evidence URLs
- Concise: 6–12 bullets total
- No confidential details or commitments
- Idempotent output given same inputs

## Sources of Truth

- **Projects dataset**: `shared/profile.json` — structured projects list with evidence URLs
- **Kinokomon page**: `kinokomon.md`

## Quality Gates

Before finalizing any update:
1. Run `python3 scripts/tdd_guard.py --against origin/main` (when applicable)
2. Run repo unit tests / linters if code touched
3. Run `jekyll build` (optional, if configured)

## Discord Integration

Post all updates to `#kinokoholic` channel (ID: 1475800859278315592):
- Manual updates: PR link + summary
- Scheduled updates: Commit link + changelog
- Verification reports: Diff summary + checks status

## Git Configuration

- **Author name**: Kinokomon
- **Author email**: kinokomon@kinokoholic.com
- **Scheduled update mode**: `direct_push` (or `pr_auto_merge`)
- **PR base branch**: main

## Quick Reference

### Update Kinokomon Page (Autonomous)
```bash
# Scheduled at 20:00 JST daily
# Only modifies kinokomon.md and kinokomon/**
# Direct-pushes to main branch
```

### Update Any Other Page (Manual)
```
User: "Update the about page to add [content]"
→ Requires explicit instructions
→ Creates PR for review
→ Posts to #kinokoholic when ready
```

### Emergency Rollback
```bash
git revert HEAD
git push origin main
# Post rollback notice to #kinokoholic
```

## Files

- `references/governance.md` — Detailed governance rules and policy enforcement
- `references/agents.md` — Agent roles and responsibilities
- `references/workflows.md` — Complete workflow specifications
