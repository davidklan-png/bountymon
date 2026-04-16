import fs from "node:fs/promises";
import path from "node:path";

const HOOK_NAME = "kinokomon-debug-snapshot";
const DEFAULT_LOG_FILE = ".openclaw/debug/kinokomon-agent-events.jsonl";
const DEFAULT_MAX_BODY_CHARS = 1200;

type HookEvent = {
  action: string;
  context?: Record<string, unknown>;
  sessionKey: string;
  timestamp: Date | string;
  type: string;
};

function getHookConfig(event: HookEvent): Record<string, unknown> {
  const cfg = event.context?.cfg as
    | { hooks?: { internal?: { entries?: Record<string, Record<string, unknown>> } } }
    | undefined;
  return cfg?.hooks?.internal?.entries?.[HOOK_NAME] ?? {};
}

function getWorkspaceDir(event: HookEvent): string | null {
  const workspaceDir = event.context?.workspaceDir;
  return typeof workspaceDir === "string" && workspaceDir.trim() ? workspaceDir : null;
}

function limitText(value: unknown, maxChars: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars)}...`;
}

function summarizeEvent(event: HookEvent, maxChars: number): Record<string, unknown> {
  const context = event.context ?? {};
  const timestamp =
    event.timestamp instanceof Date ? event.timestamp.toISOString() : String(event.timestamp);
  const summary: Record<string, unknown> = {
    timestamp,
    type: event.type,
    action: event.action,
    sessionKey: event.sessionKey,
  };

  if (typeof context.channelId === "string") summary.channelId = context.channelId;
  if (typeof context.accountId === "string") summary.accountId = context.accountId;
  if (typeof context.conversationId === "string") summary.conversationId = context.conversationId;
  if (typeof context.messageId === "string") summary.messageId = context.messageId;
  if (typeof context.senderId === "string") summary.senderId = context.senderId;
  if (typeof context.commandSource === "string") summary.commandSource = context.commandSource;
  if (typeof context.success === "boolean") summary.success = context.success;

  if (event.type === "agent" && event.action === "bootstrap") {
    const bootstrapFiles = Array.isArray(context.bootstrapFiles)
      ? context.bootstrapFiles
          .map((entry) => {
            if (!entry || typeof entry !== "object") return null;
            const filePath = (entry as { path?: unknown }).path;
            return typeof filePath === "string" ? filePath : null;
          })
          .filter(Boolean)
      : [];
    summary.bootstrapFiles = bootstrapFiles;
  }

  const preview =
    limitText(context.bodyForAgent, maxChars) ??
    limitText(context.content, maxChars) ??
    limitText(context.body, maxChars) ??
    limitText(context.transcript, maxChars);
  if (preview) summary.preview = preview;

  return summary;
}

export default async function kinokomonDebugSnapshot(event: HookEvent) {
  const hookConfig = getHookConfig(event);
  if (hookConfig.enabled === false) return;

  const workspaceDir = getWorkspaceDir(event);
  if (!workspaceDir) return;

  const logFile =
    typeof hookConfig.logFile === "string" && hookConfig.logFile.trim()
      ? hookConfig.logFile
      : DEFAULT_LOG_FILE;
  const maxChars =
    typeof hookConfig.maxBodyChars === "number" && hookConfig.maxBodyChars > 0
      ? hookConfig.maxBodyChars
      : DEFAULT_MAX_BODY_CHARS;

  const targetPath = path.isAbsolute(logFile) ? logFile : path.join(workspaceDir, logFile);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });

  const payload = summarizeEvent(event, maxChars);
  await fs.appendFile(targetPath, `${JSON.stringify(payload)}\n`, "utf8");
}
