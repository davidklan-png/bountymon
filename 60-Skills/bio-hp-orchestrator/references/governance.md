# Governance Rules

## Autonomous Allowlist

The following URL and repo paths can be modified WITHOUT user request:

**URLs**:
- `https://kinokoholic.com/kinokomon/`

**Repo paths**:
- `kinokomon.md` — Main Kinokomon page
- `kinokomon/**` — Subpages under /kinokomon/

## Restricted Areas

All other URLs and repo paths require EXPLICIT user request:

- `/` — Homepage
- `/about/` — About page
- `/projects/` — Projects page
- `/contact/` — Contact page
- Any other page not in autonomous allowlist

## Policy Enforcement

### Scheduled Runs (Autonomous)

Policy gate checks:
1. `url_must_equal`: Verify URL is exactly `https://kinokoholic.com/kinokomon/`
2. `repo_paths_must_be_subset_of`: Verify all modified files match `kinokomon.md` or `kinokomon/**`

**If policy fails**: Abort immediately, log error, post warning to #kinokoholic

### Manual Runs (User-Requested)

Policy gate checks:
1. `require_explicit_user_instructions`: Verify user provided specific instructions

**If policy fails**: Ask user for clarification before proceeding

## Change Scope Constraints

### Kinokomon Page (Autonomous)

- Can update "Projects & Engagements" section using markers
- Can add/modify subpages under `/kinokomon/`
- Can update metadata, tags, layout
- CANNOT modify site-wide configuration
- CANNOT modify other pages
- CANNOT add new top-level pages

### Other Pages (Manual Only)

- Any changes allowed with explicit user instructions
- Must create PR for review
- Must pass all quality gates before merge

## Audit Trail

All changes logged to:
- Git commit history
- Verification reports in #kinokoholic
- OpenClaw session logs

## Emergency Procedures

### Rollback Autonomous Change

If autonomous update causes issues:

```bash
git revert HEAD
git push origin main
# Post rollback notice to #kinokoholic with reason
```

### Disable Scheduled Updates

If systemic issues detected:

1. Disable cron job in OpenClaw
2. Post notice to #kinokoholic
3. Investigate root cause
4. Re-enable only after fix verified
