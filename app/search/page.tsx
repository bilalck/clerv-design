import { ScreenHead } from "@/components/screen-head"

const RESULTS = [
  { kind: "Chat", icon: "C", title: "AI Activity Hub Planning", badge: "ChatGPT", badgeClass: "" },
  { kind: "Artifact", icon: "A", title: "AI Activity Dashboard Product Plan", badge: "Doc", badgeClass: "" },
  { kind: "Decision", icon: "D", title: "Use import-first architecture", badge: "Decision", badgeClass: "success" },
  { kind: "Task", icon: "T", title: "Design Inbox triage flow", badge: "Task", badgeClass: "warn" },
  { kind: "Project", icon: "P", title: "Personal AI Dashboard", badge: "Project", badgeClass: "" },
  { kind: "Chat", icon: "C", title: "Schema migration walkthrough", badge: "Claude", badgeClass: "" },
  { kind: "Artifact", icon: "F", title: "Inbox Triage Flow diagram", badge: "Flow", badgeClass: "success" },
]

type SP = Promise<{ q?: string }>

export default async function SearchPage({ searchParams }: { searchParams: SP }) {
  const { q } = await searchParams
  const query = q?.trim() || "AI dashboard inbox timeline artifact plan"

  return (
    <section className="screen">
      <ScreenHead kicker="07 / Search Results" number="7" title="Find chats, artifacts, decisions, tasks and events.">
        Unified search across every stream. Use modifiers like <code>type:artifact</code> or{" "}
        <code>project:&quot;Personal AI Dashboard&quot;</code> to scope.
      </ScreenHead>

      <div className="grid">
        <article className="panel full">
          <div className="command">
            <div className="command-input">{query}</div>
          </div>
          <div className="btn-row">
            <button className="btn primary">All ({RESULTS.length})</button>
            <button className="btn quiet">Chats</button>
            <button className="btn quiet">Artifacts</button>
            <button className="btn quiet">Decisions</button>
            <button className="btn quiet">Tasks</button>
            <button className="btn quiet">Projects</button>
          </div>
          <div className="list">
            {RESULTS.map((r) => (
              <div key={`${r.kind}-${r.title}`} className="item">
                <span className="iconbox">{r.icon}</span>
                <p>
                  <strong style={{ color: "var(--ink)", marginRight: 8 }}>{r.kind}:</strong>
                  {r.title}
                </p>
                <span className={`badge ${r.badgeClass}`}>{r.badge}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
