# Contributing to Bountymon

Bountymon is a community-driven directory and bounty marketplace for replacing moat-driven enterprise software with open alternatives. Contributions are welcome.

## Ways to Contribute

### Add an Alternative

Create a markdown file in `src/content/alternatives/` with this frontmatter:

```yaml
---
name: Your Tool Name
slug: your-tool-name
replaces: [Enterprise Tool 1, Enterprise Tool 2]
category: cloud-storage  # must match a category slug
annual_cost_replaced: 120
status: live  # live | in-progress | planned
maturity: stable  # early | growing | stable | mature
deployment_difficulty: moderate  # easy | moderate | advanced
project_url: https://github.com/org/repo
documentation_url: https://docs.example.com
vibe_coded: false
bounty_value: 240
years_tracked: 2
start_date: "2024-01-01"
tags: [storage, self-hosted]
featured: false
---

Description of the tool and why it's a good replacement.

## Why it works
- Feature 1
- Feature 2

## What you lose
- Trade-off 1
```

### Post a Bounty

Create a markdown file in `src/content/bounties/`:

```yaml
---
title: "Replace [Enterprise Tool] with an open alternative"
slug: replace-tool-name
description: "One-line description of what you need."
category: project-management
replaces: Enterprise Tool Name
annual_cost: 1200
reward: 5000
status: open
posted_by: your-github-username
posted_date: "2026-03-01"
seats: 10
requirements:
  - Requirement 1
  - Requirement 2
---

Longer description of why this tool needs replacing and what you're looking for.
```

### Claim a Bounty

1. Find an open bounty in `src/content/bounties/`
2. Update the bounty file:
   - Set `status: claimed`
   - Add `claimed_by: your-github-username`
   - Add `hunter_url: https://github.com/your/project`
3. Submit a PR with your changes

### Write an Article

Create a markdown file in `src/content/articles/`:

```yaml
---
title: "Your Article Title"
slug: your-article-slug
description: "Brief description for previews and SEO."
author: "Your Name"
date: "2026-03-01"
category: guide  # guide | case-study | opinion | tutorial | news
tags: [relevant, tags]
featured: false
read_time: 5
---

Your article content in markdown.
```

### Add a Category

Create a YAML file in `src/content/categories/`:

```yaml
name: Category Name
slug: category-slug
description: Brief description
icon: "\U0001F4CB"  # Unicode emoji
enterprise_examples:
  - name: Enterprise Tool
    annual_cost_per_seat: 100
```

## Development

```bash
npm install
npm run dev     # Start dev server on localhost:4321
npm run build   # Build static site to dist/
npm run preview # Preview production build
```

## Guidelines

- Keep PRs focused on a single change
- Test your changes locally before submitting
- Follow existing code patterns and naming conventions
- Ensure `npm run build` passes without errors
- Content should be factual — no unsubstantiated claims about enterprise pricing
