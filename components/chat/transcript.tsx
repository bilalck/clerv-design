import { Card, Tag } from "@/components/ui/card";

type Message = {
  role: "User" | "Assistant";
  time: string;
  content: string;
};

const messages: Message[] = [
  {
    role: "User",
    time: "9:18 AM",
    content:
      "Can you verify this PRD for AI Activity Hub and suggest what to build first?",
  },
  {
    role: "Assistant",
    time: "9:19 AM",
    content:
      "The PRD is strong, but the MVP should be tightened around Timeline and Inbox. Start with import, normalized events, basic inbox status, and manual tagging.",
  },
  {
    role: "User",
    time: "9:31 AM",
    content:
      "Design first UI screens.",
  },
  {
    role: "Assistant",
    time: "9:32 AM",
    content:
      "Created the first UI screens covering Home, Timeline, Inbox, Artifacts, Chat Detail, Project Detail, Import Flow, and Search Results.",
  },
];

export function Transcript() {
  return (
    <Card>
      <Tag>Transcript</Tag>
      <h2 className="mt-5 font-serif text-3xl uppercase">Source conversation</h2>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {messages.map((message, index) => (
          <article key={index} className="grid gap-4 py-5 md:grid-cols-[160px_minmax(0,1fr)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{message.role}</p>
              <p className="mt-2 text-xs text-[var(--grey-500)]">{message.time}</p>
            </div>
            <p className="text-sm leading-7 text-[var(--grey-700)]">{message.content}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
