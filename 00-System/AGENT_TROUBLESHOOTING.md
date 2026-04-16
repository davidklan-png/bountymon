---
type: system
tags: [system, agent, troubleshooting]
updated: 2026-03-17
---

# Agent Troubleshooting

Use this file when Kinokomon's behavior feels off after autonomy, hook, or
model changes.

## Debug Snapshot Sources

- Hook snapshots: `/home/teabagger/.openclaw/vault/.openclaw/debug/kinokomon-agent-events.jsonl`
- Command audit: `/home/teabagger/.openclaw/logs/commands.log`
- Session transcripts: `/home/teabagger/.openclaw/agents/main/sessions/`

## What The Snapshot Hook Captures

- `agent:bootstrap`: which bootstrap files were injected
- `command`: reset/new/stop and other command traffic
- `message:preprocessed`: what the agent actually saw after enrichment
- `message:sent`: outbound delivery summary

## Fast Checks

```bash
openclaw hooks list
openclaw hooks info kinokomon-debug-snapshot
openclaw sandbox explain --agent main
```

## Common Failure Modes

### Too much autonomy

- Lower autonomy back to supervised behavior
- Keep `elevated` off
- Inspect recent snapshot previews for prompt drift or bad task framing

### Agent feels stuck

- Check loop detection settings in `openclaw.json`
- Review the last few snapshot events for repeated preprocessed bodies or
  repeated sends

### Wrong bootstrap context

- Inspect the latest `agent:bootstrap` snapshot
- Verify `AGENT_AUTONOMY.md` and `AGENT_TROUBLESHOOTING.md` are being injected

### Side effects went somewhere unexpected

- Review `commands.log`
- Confirm Discord binding/account routing in `openclaw.json`
- Confirm the session transcript under `agents/main/sessions/`
