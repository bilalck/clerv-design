// Real AI interaction records imported via the ai-interaction-importer skill.
// Schema: references/unified-schema.json (Unified AI Interaction Record).

export type Platform =
  | "claude.ai"
  | "claude_code"
  | "chatgpt"
  | "cursor"
  | "windsurf"
  | "v0"
  | "lovable"
  | "bolt"
  | "replit"
  | "base44"
  | "rocket"
  | "gemini"
  | "midjourney"
  | "antigravity"
  | "wonder"
  | "figma_make"
  | "google_stitch"
  | "amazon_q"
  | "other";

export interface InteractionRecord {
  id: string;
  platform: Platform;
  native_id: string;
  title: string;
  started_at: string;
  updated_at: string | null;
  duration_seconds: number | null;
  message_count: number | null;
  summary: string | null;
  url: string | null;
  project: string | null;
  tools_referenced: string[];
  tags: string[];
  raw_excerpt: string | null;
  linked_sessions: string[];
}

export interface TimelineMeta {
  generated_at: string;
  record_count: number;
  stats: {
    input_count: number;
    after_pass1: number;
    pass1_removed: number;
    cross_platform_links: number;
  };
}

export const timelineMeta: TimelineMeta = {
  generated_at: "2026-05-04T16:06:46.914498+00:00",
  record_count: 9,
  stats: {
    input_count: 9,
    after_pass1: 9,
    pass1_removed: 0,
    cross_platform_links: 1,
  },
};

export const records: InteractionRecord[] = [
  {
    id: "39e11741de25a573",
    platform: "replit",
    native_id: "manual:2026-05-02:Quick CSV processor for client data",
    title: "Quick CSV processor for client data",
    started_at: "2026-05-02T00:00:00+00:00",
    updated_at: "2026-05-02T00:00:00+00:00",
    duration_seconds: null,
    message_count: null,
    summary: "Python script to dedupe and normalize lead data",
    url: "https://replit.com/@bilalck/csv-processor",
    project: "DriveCentric",
    tools_referenced: [],
    tags: ["manual-entry"],
    raw_excerpt: "Python script to dedupe and normalize lead data",
    linked_sessions: [],
  },
  {
    id: "a842fcd64a34c5bd",
    platform: "midjourney",
    native_id: "manual:2026-05-01:Cover art for SimpSocial proposal",
    title: "Cover art for SimpSocial proposal",
    started_at: "2026-05-01T00:00:00+00:00",
    updated_at: "2026-05-01T00:00:00+00:00",
    duration_seconds: null,
    message_count: null,
    summary: "Generated 4 cover variations in editorial brochure style",
    url: null,
    project: "SimpSocial",
    tools_referenced: [],
    tags: ["manual-entry"],
    raw_excerpt: "Generated 4 cover variations in editorial brochure style",
    linked_sessions: [],
  },
  {
    id: "765dbba2c889de8d",
    platform: "bolt",
    native_id: "manual:2026-04-28:Dashboard wireframe pass",
    title: "Dashboard wireframe pass",
    started_at: "2026-04-28T00:00:00+00:00",
    updated_at: "2026-04-28T00:00:00+00:00",
    duration_seconds: null,
    message_count: null,
    summary: "Quick wireframe iteration for CRM dashboard",
    url: null,
    project: "SimpSocial",
    tools_referenced: ["figma"],
    tags: ["manual-entry"],
    raw_excerpt: "Quick wireframe iteration for CRM dashboard",
    linked_sessions: [],
  },
  {
    id: "2db9c52ab5595284",
    platform: "claude.ai",
    native_id: "test-claude-002",
    title: "Skills library audit",
    started_at: "2026-04-24T03:15:00+00:00",
    updated_at: "2026-04-24T04:08:00+00:00",
    duration_seconds: 120,
    message_count: 2,
    summary:
      "Audit my Stead Skills Library against SUSS v1.0 Reviewing 82 skills across 12 categories...",
    url: "https://claude.ai/chat/test-claude-002",
    project: "Stead Skills Library",
    tools_referenced: [],
    tags: [],
    raw_excerpt:
      "Audit my Stead Skills Library against SUSS v1.0 Reviewing 82 skills across 12 categories...",
    linked_sessions: [],
  },
  {
    id: "9e29a7aff926bde7",
    platform: "claude.ai",
    native_id: "test-claude-001",
    title: "Building Stead UI Pro component library",
    started_at: "2026-04-22T10:30:00+00:00",
    updated_at: "2026-04-22T11:45:00+00:00",
    duration_seconds: 4200,
    message_count: 3,
    summary:
      "Help me design a Table component for Stead UI Pro that works with shadcn/ui and supports Cursor's autocomplete patterns. I'll architect this with CVA for variants, using Tailwind for styling. Should work seamlessly when you wire it up via v0.dev or Figma. Perfect, also generate…",
    url: "https://claude.ai/chat/test-claude-001",
    project: "Stead UI Pro",
    tools_referenced: ["cursor", "v0"],
    tags: [],
    raw_excerpt:
      "Help me design a Table component for Stead UI Pro that works with shadcn/ui and supports Cursor's autocomplete patterns. I'll architect this with CVA for variants, using Tailwind for styling. Should work seamlessly when you wire it up via v0.dev or Figma. Perfect, also generate the MDX docs page",
    linked_sessions: ["94c7283452e43823"],
  },
  {
    id: "94c7283452e43823",
    platform: "chatgpt",
    native_id: "test-gpt-001",
    title: "Stead UI Pro Table component design",
    started_at: "2026-04-22T10:30:00+00:00",
    updated_at: "2026-04-22T11:45:00+00:00",
    duration_seconds: 200,
    message_count: 2,
    summary:
      "Help me design a Table component for Stead UI Pro using shadcn ui patterns. Will integrate with Cursor and v0 from Vercel for the autocomplete patterns. Sure here's an architecture using CVA for variants and Tailwind for the styling layer with shadcn primitives",
    url: "https://chat.openai.com/c/test-gpt-001",
    project: "Stead UI Pro",
    tools_referenced: ["cursor"],
    tags: [],
    raw_excerpt:
      "Help me design a Table component for Stead UI Pro using shadcn ui patterns. Will integrate with Cursor and v0 from Vercel for the autocomplete patterns. Sure here's an architecture using CVA for variants and Tailwind for the styling layer with shadcn primitives",
    linked_sessions: ["9e29a7aff926bde7"],
  },
  {
    id: "59ea1ae042462d21",
    platform: "lovable",
    native_id: "manual:2026-04-22:Auth flow prototype with OTP",
    title: "Auth flow prototype with OTP",
    started_at: "2026-04-22T00:00:00+00:00",
    updated_at: "2026-04-22T00:00:00+00:00",
    duration_seconds: null,
    message_count: null,
    summary: "Built signup with Supabase auth and email OTP",
    url: "https://lovable.dev/projects/xyz",
    project: "InternalTool",
    tools_referenced: ["supabase"],
    tags: ["manual-entry"],
    raw_excerpt: "Built signup with Supabase auth and email OTP",
    linked_sessions: [],
  },
  {
    id: "cf59078e9f95f494",
    platform: "v0",
    native_id: "manual:2026-04-15:SaaS landing hero with dark editorial vi",
    title: "SaaS landing hero with dark editorial vibe",
    started_at: "2026-04-15T00:00:00+00:00",
    updated_at: "2026-04-15T00:00:00+00:00",
    duration_seconds: null,
    message_count: null,
    summary:
      "Generated landing hero with shadcn cards and Instrument Serif headline",
    url: "https://v0.dev/chat/abc123",
    project: "Stead UI Pro",
    tools_referenced: ["figma_make", "vercel"],
    tags: ["manual-entry"],
    raw_excerpt:
      "Generated landing hero with shadcn cards and Instrument Serif headline",
    linked_sessions: [],
  },
  {
    id: "e9167ea06bafefed",
    platform: "chatgpt",
    native_id: "test-gpt-002",
    title: "Quick brainstorm on AI agent patterns",
    started_at: "2025-05-03T16:16:40+00:00",
    updated_at: "2025-05-03T16:33:20+00:00",
    duration_seconds: null,
    message_count: 1,
    summary: "What are the key patterns for AI agent design?",
    url: "https://chat.openai.com/c/test-gpt-002",
    project: null,
    tools_referenced: [],
    tags: [],
    raw_excerpt: "What are the key patterns for AI agent design?",
    linked_sessions: [],
  },
];

// ─── Display helpers ───────────────────────────────────────────────────────

export const PLATFORM_LABEL: Record<Platform, string> = {
  "claude.ai": "Claude",
  claude_code: "Claude Code",
  chatgpt: "ChatGPT",
  cursor: "Cursor",
  windsurf: "Windsurf",
  v0: "v0",
  lovable: "Lovable",
  bolt: "Bolt",
  replit: "Replit",
  base44: "Base44",
  rocket: "Rocket",
  gemini: "Gemini",
  midjourney: "Midjourney",
  antigravity: "Antigravity",
  wonder: "Wonder",
  figma_make: "Figma Make",
  google_stitch: "Stitch",
  amazon_q: "Amazon Q",
  other: "Other",
};

export function platformLabel(p: Platform): string {
  return PLATFORM_LABEL[p] ?? p;
}

export function platformInitial(p: Platform): string {
  const label = platformLabel(p);
  return label[0]?.toUpperCase() ?? "?";
}

export function projectSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function recordType(r: InteractionRecord): "chat" | "artifact" | "task" {
  // Heuristic: manual entries with no message_count → artifact.
  // Records with message_count → chat. Anything else → task.
  if (r.tags.includes("manual-entry") && r.message_count == null) return "artifact";
  if (r.message_count != null) return "chat";
  return "task";
}

export function inferArtifactKind(
  r: InteractionRecord,
): "PDF" | "SVG" | "Code" | "Image" | "Doc" {
  const text = `${r.title} ${r.summary ?? ""}`.toLowerCase();
  if (r.platform === "midjourney") return "Image";
  if (/\b(component|tsx|react|script|code)\b/.test(text)) return "Code";
  if (/\b(svg|wireframe|sketch|diagram)\b/.test(text)) return "SVG";
  if (/\b(pdf|cover|proposal)\b/.test(text)) return "PDF";
  return "Doc";
}

// ─── Time helpers ──────────────────────────────────────────────────────────

const REFERENCE_NOW = new Date("2026-05-04T16:06:46Z").getTime();

export function relativeTime(iso: string, now: number = REFERENCE_NOW): string {
  const t = new Date(iso).getTime();
  const diff = Math.max(0, now - t);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "yesterday";
  if (day < 7) return `${day}d ago`;
  if (day < 30) return `${Math.floor(day / 7)}w ago`;
  if (day < 365) return `${Math.floor(day / 30)}mo ago`;
  return `${Math.floor(day / 365)}y ago`;
}

export function formatDuration(seconds: number | null): string | null {
  if (seconds == null) return null;
  if (seconds < 60) return `${seconds}s`;
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem ? `${h}h ${rem}m` : `${h}h`;
}

export function formatTimeOfDay(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
    .toUpperCase();
}

export function dayKey(iso: string): string {
  return iso.slice(0, 10); // YYYY-MM-DD
}

export function dayLabel(key: string, now: number = REFERENCE_NOW): string {
  const today = new Date(now).toISOString().slice(0, 10);
  const yesterday = new Date(now - 86_400_000).toISOString().slice(0, 10);
  if (key === today) return "TODAY";
  if (key === yesterday) return "YESTERDAY";
  const d = new Date(key + "T00:00:00Z");
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
  return `${month} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

// ─── Aggregation helpers ───────────────────────────────────────────────────

export interface DayGroup {
  key: string;
  label: string;
  events: InteractionRecord[];
}

export function getRecordsSorted(): InteractionRecord[] {
  return [...records].sort(
    (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
  );
}

export function groupByDay(rs: InteractionRecord[] = getRecordsSorted()): DayGroup[] {
  const map = new Map<string, InteractionRecord[]>();
  for (const r of rs) {
    const key = dayKey(r.started_at);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  return [...map.entries()]
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([key, events]) => ({ key, label: dayLabel(key), events }));
}

export function getRecord(id: string): InteractionRecord | undefined {
  return records.find((r) => r.id === id);
}

export function linkedRecords(r: InteractionRecord): InteractionRecord[] {
  return r.linked_sessions
    .map((id) => getRecord(id))
    .filter((x): x is InteractionRecord => Boolean(x));
}

// ─── Project derivation ────────────────────────────────────────────────────

export interface ProjectAggregate {
  id: string;
  name: string;
  recordIds: string[];
  recordCount: number;
  chatCount: number;
  artifactCount: number;
  taskCount: number;
  platforms: Platform[];
  tools: string[];
  tags: string[];
  lastActivity: string; // ISO
  firstActivity: string; // ISO
}

export function getProjectAggregates(): ProjectAggregate[] {
  const by = new Map<string, InteractionRecord[]>();
  for (const r of records) {
    const key = r.project ?? "Unfiled";
    if (!by.has(key)) by.set(key, []);
    by.get(key)!.push(r);
  }
  return [...by.entries()]
    .map(([name, rs]) => {
      const sorted = [...rs].sort(
        (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
      );
      const platforms = Array.from(new Set(rs.map((r) => r.platform)));
      const tools = Array.from(new Set(rs.flatMap((r) => r.tools_referenced)));
      const tags = Array.from(new Set(rs.flatMap((r) => r.tags)));
      const counts = rs.reduce(
        (acc, r) => {
          const t = recordType(r);
          acc[t] += 1;
          return acc;
        },
        { chat: 0, artifact: 0, task: 0 } as Record<"chat" | "artifact" | "task", number>,
      );
      return {
        id: projectSlug(name),
        name,
        recordIds: sorted.map((r) => r.id),
        recordCount: rs.length,
        chatCount: counts.chat,
        artifactCount: counts.artifact,
        taskCount: counts.task,
        platforms,
        tools,
        tags,
        lastActivity: sorted[0].started_at,
        firstActivity: sorted[sorted.length - 1].started_at,
      };
    })
    .sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1));
}

export function getProjectAggregate(id: string): ProjectAggregate | undefined {
  return getProjectAggregates().find((p) => p.id === id);
}

export function getProjectRecords(projectId: string): InteractionRecord[] {
  const p = getProjectAggregate(projectId);
  if (!p) return [];
  return p.recordIds
    .map((id) => getRecord(id))
    .filter((r): r is InteractionRecord => Boolean(r));
}

// ─── Search ────────────────────────────────────────────────────────────────

export function searchRecords(query: string): InteractionRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return records.filter((r) => {
    const hay = [
      r.title,
      r.summary ?? "",
      r.raw_excerpt ?? "",
      r.project ?? "",
      r.platform,
      ...r.tools_referenced,
      ...r.tags,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
