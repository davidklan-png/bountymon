---
type: engagement
tags: [linkedin, ai-tools, networking, automation]
status: posted
platform: LinkedIn
created: 2026-03-03
updated: 2026-03-03
follow_up: 2026-03-06
---

# Ved Kamat — Gemini Gem for Business Card Outreach

## Source

- **Platform**: LinkedIn
- **Author**: Ved Kamat (AI-First PM/PdM Consultant, Japan)
- **URL**: https://www.linkedin.com/posts/vedkamat_use-a-gem-to-automate-outreach-emails-activity-7434138870885048320-mBaM
- **Posted**: 2026-03-02 (~17 hours old when engaged)

## Original Post Summary

Ved shared a workflow for automating business card follow-up emails using Gemini Gems:
1. Create a Gem to extract contact info from business card photos
2. Give it research instructions (company website, LinkedIn, industry challenges)
3. Add your own business context files
4. Generate personalized outreach emails

Key point: "Don't forget to actually edit the draft and be a human being about it!"

## My Response

**Approach**: Value-add extension with practical prompt

**Comment**:
> Solid approach. One tweak that's helped me: I add a "recent touchpoint" field to the Gem's prompt so it doesn't feel quite so templated, especially when I'm following up on 20+ cards from the same event.
>
> Rough prompt I use:
>
> ```
> CONTEXT: I met this person at [event]. We discussed [topic].
>
> TASK: Draft a follow-up email that:
> - References our conversation naturally (don't say "as we discussed")
> - Connects their industry challenges to something specific I noticed about their company
> - Proposes a single, low-friction next step
>
> CONSTRAINT: If I can't remember what we talked about, write a fallback opener that acknowledges that honestly instead of faking it.
> ```
>
> That last bit is the key — it stops the AI from forcing a fake "remember when we talked about...?" moment, which people can smell a mile off. The research step you mentioned is the real gold though. That's what separates actual outreach from AI-spam-in-disguise.

**Why this works**:
- Specific, actionable prompt (not just "add context")
- Honesty constraint prevents forced personalization
- Demonstrates deep thinking about human side
- Shares credit by circling back to Ved's original point

## Monitoring

- **Cron Job**: `95bd014d-f104-430c-b397-d568dc063489`
- **Schedule**: Daily check for 3 days
- **Next Run**: 2026-03-04 10:21 JST
- **End Date**: 2026-03-06

## Follow-up Notes

<!-- Add any responses or outcomes below -->

---

## Next Steps

- [ ] Monitor for replies (automated via cron)
- [ ] If Ved responds, engage in conversation
- [ ] If no response by 2026-03-06, consider connection request
