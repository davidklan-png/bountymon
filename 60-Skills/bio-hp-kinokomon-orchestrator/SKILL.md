---
name: bio-hp-kinokomon-orchestrator
description: Orchestrates updates to the Kinokomon page and sub-pages on kinokoholic.com. Use when: (1) updating /kinokomon/ pages, (2) adding projects to shared/profile.json, (3) updating activity logs, (4) scheduled nightly updates, (5) user requests Kinokomon page modifications. Posts updates to Discord #kinokoholic. Uses shell commands due to workspace constraint.
---

# Bio_HP Kinokomon Orchestrator

Orchestrates updates to Kinokomon pages on kinokoholic.com with practical shell-based editing methods.

## Repository

| Property | Value |
|----------|-------|
| Provider | GitHub |
| Owner | davidklan-png |
| Repo | Bio_HP |
| Branch | main |
| Local Path | `/home/teabagger/dev/projects/Bio_HP` |

## Workspace Constraint

**CRITICAL**: The `edit` and `write` tools CANNOT access Bio_HP files directly.

- Agent workspace: `/home/teabagger/.openclaw/vault/00-System`
- Repo location: `/home/teabagger/dev/projects/Bio_HP`
- Error: `Path escapes workspace root`

**Solution**: Use shell commands via `exec` tool for all file operations.

---

## File Paths

### Main Pages
- Main hub (EN): `kinokomon.md`
- Main hub (JA): `ja/kinokomon.md`

### Sub-Pages (EN)
- About: `kinokomon/about/index.md`
- Role: `kinokomon/role/index.md`
- Projects: `kinokomon/projects/index.md`
- Activity: `kinokomon/activity/index.md`
- Community: `kinokomon/community/index.md`
- Resources: `kinokomon/resources/index.md`

### Sub-Pages (JA)
- About: `ja/kinokomon/about/index.md`
- Role: `ja/kinokomon/role/index.md`
- Projects: `ja/kinokomon/projects/index.md`
- Activity: `ja/kinokomon/activity/index.md`
- Community: `ja/kinokomon/community/index.md`
- Resources: `ja/kinokomon/resources/index.md`

### Assets
- CSS: `assets/css/kinokomon.css`
- Profile data: `shared/profile.json`
- Header images: `assets/images/kinokomon/*.svg`
- Resume: `assets/david-klan-resume.md`

---

## AUTOGEN Markers

### Activity Log Markers

```html
<!-- AUTOGEN:ACTIVITY_LOG:AUTONOMOUS:START -->
<!-- AUTOGEN:ACTIVITY_LOG:AUTONOMOUS:END -->
<!-- AUTOGEN:ACTIVITY_LOG:MILESTONES:START -->
<!-- AUTOGEN:ACTIVITY_LOG:MILESTONES:END -->
<!-- AUTOGEN:ACTIVITY_LOG:MOLTBOOK:START -->
<!-- AUTOGEN:ACTIVITY_LOG:MOLTBOOK:END -->
<!-- AUTOGEN:ACTIVITY_LOG:SYSTEM:START -->
<!-- AUTOGEN:ACTIVITY_LOG:SYSTEM:END -->
```

### Main Hub Markers

```html
<!-- AUTOGEN:RECENT_ACTIVITY:AUTONOMOUS:START -->
<!-- AUTOGEN:RECENT_ACTIVITY:AUTONOMOUS:END -->
<!-- AUTOGEN:RECENT_ACTIVITY:MILESTONES:START -->
<!-- AUTOGEN:RECENT_ACTIVITY:MILESTONES:END -->
```

---

## Editing Methods

### Method 1: sed for In-Place Edits

Use for replacing text within AUTOGEN markers. Example pattern:

    sed -i 's|OLD_TEXT|NEW_TEXT|' kinokomon/activity/index.md

### Method 2: Full File Rewrite with tee

Use for complete file replacement:

    tee kinokomon/activity/index.md > /dev/null << 'ENDOFFILE'
    [content here]
    ENDOFFILE

### Method 3: Python for JSON Operations

Use for updating shared/profile.json:

    python3 -c "
    import json
    with open('shared/profile.json') as f:
        data = json.load(f)
    data['projects'].insert(0, new_project)
    with open('shared/profile.json', 'w') as f:
        json.dump(data, f, indent=2)
    "

### Method 4: Git Operations

    git add -A
    git commit -m "message"
    git push origin main

---

## Workflows

### Add New Project
1. Update shared/profile.json with Python
2. Update kinokomon/projects/index.md
3. Update ja/kinokomon/projects/index.md
4. Add milestone to activity logs
5. Commit, push, verify

### Update Activity Log
1. Add autonomous action entry
2. Add milestone if significant
3. Commit, push, verify

### Nightly Update (20:00 JST)
1. Read shared/profile.json
2. Update activity log with timestamp
3. Verify projects section
4. Commit, push
5. Post to #kinokoholic

---

## Verification

    sleep 30
    curl -s -o /dev/null -w "%{http_code}" "https://kinokoholic.com/kinokomon/"
    curl -s "https://kinokoholic.com/kinokomon/activity/" | grep -o "ExpectedText"

---

## Brand Guidelines

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #3b82f6 | Buttons, links |
| Secondary Green | #10b981 | Download buttons |
| Accent Purple | #8b5cf6 | Highlights |
| Accent Orange | #f97316 | Call-to-action |

- Avatar: `assets/images/Kinokomon_512x512.png`
- Headers: SVG format, Kinokomon at right

---

## Discord Integration

Post to #kinokoholic (ID: 1475800859278315592) after updates.

---

## Emergency Rollback

    git revert HEAD
    git push origin main

---

## Related Skills

- bio-hp-orchestrator
- prompt-translator
