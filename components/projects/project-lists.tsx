import { Archive, CheckCircle2, FileText, GitBranch, ListTodo, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

const tasks = [
  ["Design Timeline empty state", "Todo"],
  ["Create import confirmation flow", "Doing"],
  ["Define artifact metadata", "Done"],
  ["Map source conversation links", "Todo"],
];

const decisions = [
  "Start with import-first architecture.",
  "Use Timeline, Inbox, Artifacts, Chats, and Projects as primary IA.",
  "Avoid browser extension and live sync in MVP.",
];

const chats = [
  ["AI Activity Hub Planning", "ChatGPT"],
  ["Research Dashboard Prototype", "Claude"],
  ["Export Parser Strategy", "ChatGPT"],
];

const artifacts = [
  ["AI Activity Product Plan", "Document"],
  ["Timeline Wireframe", "Diagram"],
  ["Inbox Triage Card", "Prototype"],
];

export function ProjectActivityList() {
  return (
    <Card>
      <Tag>Recent activity</Tag>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {[
          ["Claude", "Artifact created", "Research Dashboard Prototype"],
          ["ChatGPT", "Conversation", "AI Activity Hub Planning"],
          ["Manual", "File uploaded", "Dashboard IA Sketch"],
        ].map(([source, type, title]) => (
          <div key={title} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center border border-line-medium">
              <GitBranch aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm text-ink">{title}</p>
              <p className="mt-1 text-xs text-[var(--grey-500)]">{source} · {type}</p>
            </div>
            <span className="editorial-tag">Open</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProjectArtifactsList() {
  return (
    <Card>
      <Tag>Artifacts</Tag>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {artifacts.map(([title, type]) => (
          <div key={title} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center border border-line-medium">
              <Archive aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-sm text-[var(--grey-700)]">{title}</p>
            <span className="editorial-tag">{type}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProjectChatsList() {
  return (
    <Card>
      <Tag>Chats</Tag>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {chats.map(([title, platform]) => (
          <div key={title} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center border border-line-medium">
              <MessageSquare aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-sm text-[var(--grey-700)]">{title}</p>
            <span className="editorial-tag">{platform}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProjectTasksList() {
  return (
    <Card>
      <Tag>Tasks</Tag>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {tasks.map(([title, status]) => (
          <div key={title} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center border border-line-medium">
              <ListTodo aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-sm text-[var(--grey-700)]">{title}</p>
            <span className="editorial-tag">{status}</span>
          </div>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="mt-5">Create task</Button>
    </Card>
  );
}

export function ProjectDecisionsList() {
  return (
    <Card>
      <Tag>Decisions</Tag>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {decisions.map((decision) => (
          <div key={decision} className="grid grid-cols-[32px_1fr] gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center border border-line-medium">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-sm leading-6 text-[var(--grey-700)]">{decision}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProjectNotesPanel() {
  return (
    <Card>
      <Tag>Project note</Tag>
      <div className="mt-6 border-l border-line-strong pl-4">
        <p className="text-sm leading-6 text-[var(--grey-700)]">
          Every item here should preserve a source link back to the originating chat, artifact,
          import record, or timeline event.
        </p>
      </div>
    </Card>
  );
}
