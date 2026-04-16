# Complete Workflow Specifications

## Manual Update Workflow

**Trigger**: User request with URL and instructions

**Example**: "Update the about page to add information about my new role"

### Step 1: Policy Gate

```yaml
trigger: manual
requirements:
  - require_explicit_user_instructions: true
```

**Checks**:
- User provided specific instructions
- Instructions are actionable
- URL is valid Bio_HP page

**On failure**: Ask user for clarification

---

### Step 2: Architect Plan

**Agent**: architect

**Task**: `plan_update`

**Inputs**:
- `url`: Target page URL
- `instructions`: User's specific instructions

**Process**:
1. Map URL → repo path(s)
2. Analyze current content
3. Define update scope
4. Create acceptance criteria
5. Identify risks and dependencies
6. Create verification checklist

**Outputs**:
- `plan_ref`: Reference to structured plan
- `acceptance_criteria`: Checklist
- `change_scope`: File list
- `risk_level`: "low" | "medium" | "high"

---

### Step 3: Developer Implement

**Agent**: developer

**Task**: `implement_with_tdd`

**Inputs**:
- `plan_ref`: From architect

**Process**:
1. Read current file content
2. Implement changes per plan
3. Run local quality gates:
   - `python3 scripts/tdd_guard.py --against origin/main`
   - Unit tests / linters (if code touched)
   - `jekyll build` (if configured)
4. Commit changes with descriptive message
5. Create PR against main branch

**Outputs**:
- `build_ref`: Reference to implementation
- `pr_url`: Link to pull request
- `test_results`: Summary
- `modified_files`: Changed file list

---

### Step 4: Verifier Check

**Agent**: verifier

**Task**: `verify_against_plan`

**Inputs**:
- `plan_ref`: From architect
- `build_ref`: From developer

**Process**:
1. Compare output to plan
2. Check policy compliance
3. Verify file hashes
4. Generate diff summary
5. Create verification report

**Outputs**:
- `verification_report`: Structured report
- `recommendation`: "approve" | "reject" | "needs_review"

---

### Step 5: Finalize

**Process**:
1. Post summary to #kinokoholic:
   - PR URL
   - Change summary
   - Verification status
   - Risk level
2. Log to OpenClaw session
3. Update governance audit trail

**Output**: User can review and merge PR

---

## Scheduled Update Workflow (Kinokomon Only)

**Trigger**: Cron schedule (20:00 JST daily)

**Example**: Nightly update to Kinokomon "Projects & Engagements" section

### Step 1: Policy Gate

```yaml
trigger: scheduled
requirements:
  - url_must_equal: "https://kinokoholic.com/kinokomon/"
  - repo_paths_must_be_subset_of:
    - "kinokomon.md"
    - "kinokomon/**"
```

**Checks**:
- URL is exactly Kinokomon page
- All paths in allowlist

**On failure**: Abort immediately, post warning to #kinokoholic

---

### Step 2: Architect Plan

**Agent**: architect

**Task**: `plan_kinokomon_nightly_update`

**Inputs**:
- `url`: `https://kinokoholic.com/kinokomon/`

**Process**:
1. Read `shared/profile.json` projects list
2. Identify new/updated projects since last run
3. Plan "Projects & Engagements" section update
4. Define content contract:
   - 6–12 bullets
   - Public-safe info only
   - Links from evidence URLs
   - Stable ordering and wording
5. Create verification checklist

**Outputs**:
- `plan_ref`: Reference to plan
- `content_contract`: Rules for generation
- `change_scope`: `kinokomon.md` only

---

### Step 3: Developer Implement

**Agent**: developer

**Task**: `implement_with_tdd`

**Inputs**:
- `plan_ref`: From architect

**Process**:
1. Read current `kinokomon.md`
2. Locate markers:
   - `<!-- AUTOGEN:KINOKOMON_PROJECTS_ENGAGEMENTS:START -->`
   - `<!-- AUTOGEN:KINOKOMON_PROJECTS_ENGAGEMENTS:END -->`
3. Generate new content from `shared/profile.json`
4. Replace content between markers
5. Run quality gates
6. Direct-push to main (or create PR with auto-merge)

**Outputs**:
- `build_ref`: Reference to implementation
- `commit_sha`: Commit hash
- `modified_files`: `kinokomon.md` only

---

### Step 4: Verifier Check

**Agent**: verifier

**Task**: `verify_against_plan`

**Inputs**:
- `plan_ref`: From architect
- `build_ref`: From developer

**Process**:
1. Verify only `kinokomon.md` modified
2. Verify content between markers matches contract
3. Verify markers intact
4. Check content idempotency (same inputs = same output)
5. Generate verification report

**Outputs**:
- `verification_report`: Structured report
- `recommendation`: "approve" (scheduled runs auto-approve)

---

### Step 5: Finalize

**Process**:
1. Post summary to #kinokoholic:
   - Commit URL
   - Changelog (projects added/updated)
   - Verification status
2. Log to OpenClaw session
3. Update governance audit trail

**Output**: Changes live on https://kinokoholic.com/kinokomon/

---

## Error Handling

### Agent Failure

If any agent fails:

1. **Log error** with full context
2. **Post error** to #kinokoholic:
   ```
   ❌ Bio_HP Update Failed
   
   Agent: [architect|developer|verifier]
   Error: [error message]
   Context: [relevant details]
   
   Manual intervention required.
   ```
3. **Do NOT proceed** to next agent
4. **Await user** intervention

### Policy Violation

If policy gate fails:

1. **Abort immediately**
2. **Post warning** to #kinokoholic:
   ```
   ⚠️ Policy Violation Detected
   
   Attempted to modify: [URL/path]
   Allowed: [allowlist]
   
   Action blocked. Manual review required.
   ```
3. **Log to audit trail**
4. **Notify user** if manual run

### Quality Gate Failure

If quality gates fail:

1. **Do not commit/push**
2. **Post error** to #kinokoholic:
   ```
   ❌ Quality Gates Failed
   
   Failed checks:
   - [check 1]
   - [check 2]
   
   Changes not applied. Fix required.
   ```
3. **Developer agent** reviews and fixes
4. **Re-run** quality gates
5. **Proceed** only if all pass
