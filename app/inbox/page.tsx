import { ScreenHead } from "@/components/screen-head"

const TABS = ["All", "Tasks", "Decisions", "Artifacts", "Sensitive", "Unassigned"]

const ITEMS = [
  {
    tag: "ChatGPT · Planning · Yesterday",
    title: "AI Activity Dashboard Method",
    body: "Explored Timeline, Inbox, Artifacts, and Chats as the primary structure for a unified AI activity dashboard.",
    callout: { title: "Detected", body: "2 decisions · 3 tasks · 1 artifact idea" },
    actions: ["Accept Project", "Extract Tasks", "Save Artifact", "Archive"],
  },
  {
    tag: "Claude · Artifact · Today",
    title: "Research Dashboard Prototype",
    body: "Likely belongs to Personal AI Dashboard. Contains a React component and flow diagram.",
    callout: { title: "Suggested project", body: "Personal AI Dashboard" },
    actions: ["Assign", "Preview", "Mark Reviewed"],
  },
  {
    tag: "Gemini · Research · 2 days ago",
    title: "Competitor Mapping Notes",
    body: "Detected three product mentions and one likely action item: contact research participant.",
    callout: { title: "Detected", body: "3 mentions · 1 task" },
    actions: ["Extract Tasks", "Save", "Archive"],
  },
  {
    tag: "Manual · Upload · This week",
    title: "Dashboard IA sketch",
    body: "Hand-drawn information architecture sketch — no metadata yet. Suggested tagging: dashboard, IA, MVP.",
    callout: { title: "Sensitive", body: "Contains personal handwriting" },
    actions: ["Tag", "Assign", "Archive"],
  },
]

export default function InboxPage() {
  return (
    <section className="screen">
      <ScreenHead kicker="02 / Inbox Triage" number="2" title="Fast review loop for unprocessed AI outputs.">
        Inbox turns passive AI history into a daily workflow: tag, assign, extract, save, archive.
      </ScreenHead>

      <div className="grid">
        <article className="panel full">
          <span className="tag">Tabs</span>
          <div className="btn-row">
            {TABS.map((t, i) => (
              <button key={t} className={`btn ${i === 0 ? "primary" : "quiet"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid" style={{ marginTop: 24 }}>
            {ITEMS.map((it) => (
              <article key={it.title} className="panel half surface">
                <span className="tag">{it.tag}</span>
                <h3>{it.title}</h3>
                <p style={{ marginTop: 14 }}>{it.body}</p>
                <div className="callout">
                  <strong>{it.callout.title}</strong>
                  <p>{it.callout.body}</p>
                </div>
                <div className="btn-row">
                  {it.actions.map((a, i) => (
                    <button key={a} className={`btn ${i === 0 ? "primary" : "quiet"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
