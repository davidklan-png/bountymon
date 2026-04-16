---
name: kinokomon-debug-snapshot
description: "Capture compact Kinokomon debug snapshots for bootstrap, commands, and message flow"
metadata:
  {
    "openclaw":
      {
        "emoji": "🧭",
        "events":
          ["agent:bootstrap", "command", "message:preprocessed", "message:sent"],
      },
  }
---

# Kinokomon Debug Snapshot

Writes compact JSONL snapshots for the Kinokomon agent so autonomy, hooks, and
message processing can be debugged without turning on verbose logging for every
session.

## Output

- Relative log path is controlled by `hooks.internal.entries.kinokomon-debug-snapshot.logFile`
- Current default: `.openclaw/debug/kinokomon-agent-events.jsonl`

## Purpose

- Record what bootstrap files were injected
- Trace command and message lifecycle at a high level
- Keep a lightweight audit trail for troubleshooting autonomy changes
