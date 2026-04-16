---
type: system
tags: [system, agent, autonomy]
updated: 2026-03-17
---

# Agent Autonomy

Kinokomon now runs with an explicit autonomy profile inspired by the VS Code
1.111 agent controls.

## Default Profile

- **Mode**: balanced
- **Thinking**: medium
- **Verbose**: off
- **Elevated exec**: off by default, owner can opt in per session
- **Loop safety**: enabled

## Session Modes

### Supervised

Use when the task has hidden risk, public side effects, or unclear intent.

- Ask before repo writes outside the vault
- Ask before posting externally or pushing commits
- Ask before changing credentials, routing, or agent identity

### Balanced

Default working mode.

- Research, summarize, draft, and edit vault/system files autonomously
- Continue across multiple steps when the goal is clear
- Pause at destructive or externally visible boundaries

### Autopilot

Use when the task is well-bounded and already authorized.

- Iterate until the task is complete instead of waiting for step-by-step input
- Best fit for `#monitoring`, `#briefing`, diagnostics, vault maintenance, and
  scheduled Kinokomon page updates
- Stop and escalate if the task crosses security, identity, or irreversible
  external-change boundaries

## Permission Knobs

- `/model` changes the session model
- `/thinking` raises or lowers reasoning depth
- `/verbose` enables extra trace output when debugging
- `/elevated on|ask|full` changes host-exec permissions for the current session
  and is owner-gated

## Hard Stops

- Never act as Bountymon
- Never post Kinokomon content into Bountymon channels
- Never make irreversible external changes without explicit authorization unless
  the task is already an approved scheduled Kinokomon maintenance flow
- Never expose secrets, tokens, or private notes in public output
