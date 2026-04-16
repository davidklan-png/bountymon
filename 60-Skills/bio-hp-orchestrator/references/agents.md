# Agent Roles and Responsibilities

## Architect Agent

**Role**: Architecture & Planning

**Responsibilities**:
1. Map requested URL → repo path(s)
2. Define update plan with:
   - Acceptance criteria
   - Change-scope constraints
   - Risk assessment
3. Specify content contract for Kinokomon "Projects & Engagements" section
4. Specify test plan for any non-content code changes
5. Define verification checklist for verifier agent

**Outputs**:
- `plan_ref`: Reference to structured update plan
- `acceptance_criteria`: Checklist of requirements
- `change_scope`: List of files to be modified
- `content_contract`: Rules for content generation (if applicable)

**Constraints**:
- Must validate URL/path against governance allowlist
- Must identify dependencies and potential side effects
- Must estimate complexity and risk level

---

## Developer Agent

**Role**: Implementation (TDD)

**Responsibilities**:
1. Implement plan via tests-first where code changes required
2. Generate "Projects & Engagements" summary from approved sources (Kinokomon only)
3. Update markdown deterministically and safely
4. Run repo gates:
   - `tdd_guard` script
   - CI-equivalent checks locally
   - Unit tests / linters
5. Create PR for manual requests
6. Direct-push for scheduled allowlisted updates (configurable)

**Outputs**:
- `build_ref`: Reference to implementation artifacts
- `test_results`: Summary of test execution
- `modified_files`: List of changed files with hashes
- `pr_url` or `commit_sha`: Link to changes

**Constraints**:
- Must follow TDD for code changes
- Must preserve content idempotency
- Must not modify files outside change scope
- Must pass all quality gates before finalizing

---

## Verifier Agent

**Role**: Verification & QA

**Responsibilities**:
1. Ensure output matches architect plan exactly
2. Ensure scheduled runs modify only allowlisted repo paths
3. Ensure summary meets content contract (Kinokomon only)
4. Ensure checks pass and publish action is consistent with repo rules
5. Produce verification report with:
   - File diffs
   - File hashes
   - Test results
   - Policy compliance check

**Outputs**:
- `verification_report`: Structured report with:
  - `plan_match`: Boolean (does output match plan?)
  - `policy_compliance`: Boolean (were allowlists respected?)
  - `content_contract`: Boolean (does content meet requirements?)
  - `checks_passed`: Boolean (did all quality gates pass?)
  - `file_diffs`: Diff summary for each modified file
  - `file_hashes`: SHA-256 hash for each file (before/after)
  - `recommendation`: "approve" | "reject" | "needs_review"

**Constraints**:
- Must fail verification if any policy violated
- Must fail verification if plan not matched
- Must provide clear rejection reasons
- Must be independent (cannot also be architect or developer)

---

## Image Agent (GLM-Image)

**Role**: Themed Image Generation

**Responsibilities**:
1. Generate themed header images for sub-pages
2. Create character art featuring Kinokomon
3. Produce background graphics matching site aesthetic
4. Ensure brand consistency (colors, style, mood)

**Model**: `zai/glm-image`

**Outputs**:
- `image_ref`: Path to generated image (SVG or PNG)
- `style_notes`: Description of applied style elements
- `brand_alignment`: Confirmation of color/theme matching

**Constraints**:
- Must reference Kinokomon character asset when applicable
- Must match kinokoholic.com color palette:
  - Primary: #3b82f6 (blue)
  - Secondary: #10b981 (green)
  - Accent: #8b5cf6 (purple), #f97316 (orange)
- Must produce SVG for web headers (scalability)
- Must avoid text in graphics (accessibility)
- Must maintain professional, clean aesthetic

**Style Guide**:
- Geometric patterns
- Network/brain motifs for "About"
- Gears/circuits for "Role"
- Rocket/trajectory for "Projects"
- Charts/dashboard for "Activity"
- Globe/connections for "Community"

---

## Agent Orchestration

### Spawn Pattern

```javascript
// Architect spawns first
orchestrator.spawn(agent="architect", task="plan_update", args={url, instructions})

// Developer spawns with plan reference
orchestrator.spawn(agent="developer", task="implement_with_tdd", args={plan_ref: architect.plan_ref})

// Verifier spawns with plan and build references
orchestrator.spawn(agent="verifier", task="verify_against_plan", args={
  plan_ref: architect.plan_ref,
  build_ref: developer.build_ref
})
```

### Communication

Agents communicate through shared references:
- `plan_ref` — Immutable plan created by architect
- `build_ref` — Implementation artifacts from developer
- `verification_report` — Final verdict from verifier

### Isolation

Each agent runs in isolated context:
- Cannot modify another agent's outputs
- Cannot bypass policy gates
- Cannot skip verification steps

### Fallback

If any agent fails:
1. Log error with context
2. Post error to #kinokoholic
3. Do NOT proceed to next agent
4. Await user intervention
