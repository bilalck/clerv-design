import Link from "next/link"
import { ScreenHead } from "@/components/screen-head"

const FILTERS = ["All", "ChatGPT", "Claude", "Artifacts", "Inbox", "This week"]

const EVENTS = [
  {
    time: "Today · 10:42 AM · Claude · Artifact created",
    title: "Research Dashboard Prototype",
    body: "Generated an interactive React prototype for a research insight dashboard.",
    actions: [
      { label: "Open", primary: true },
      { label: "Add to project" },
      { label: "Convert to task" },
      { label: "Archive" },
    ],
  },
  {
    time: "Today · 9:18 AM · ChatGPT · Conversation",
    title: "AI Activity Hub Planning",
    body: "Discussed Timeline, Inbox, Artifacts, Chats, data model and MVP build order.",
    actions: [
      { label: "Open Chat", primary: true, href: "/chats" },
      { label: "Extract Tasks" },
      { label: "Tag" },
    ],
  },
  {
    time: "Yesterday · 6:04 PM · ChatGPT · Import",
    title: "ChatGPT export.zip imported",
    body: "Imported 428 conversations, 2,941 messages and 87 inbox items.",
    actions: [
      { label: "View Import", primary: true, href: "/import" },
      { label: "Review Inbox", href: "/inbox" },
    ],
  },
  {
    time: "Yesterday · 2:11 PM · Manual · Upload",
    title: "Dashboard IA sketch",
    body: "Uploaded a hand-drawn information architecture sketch for the unified dashboard.",
    actions: [
      { label: "Open", primary: true, href: "/artifacts" },
      { label: "Tag" },
    ],
  },
  {
    time: "2 days ago · 11:30 AM · Claude · Decision",
    title: "Use import-first architecture",
    body: "Captured the decision to default to local file imports over live API integrations for MVP.",
    actions: [
      { label: "Open", primary: true },
      { label: "Link to project" },
    ],
  },
]

export default function TimelinePage() {
  return (
    <section className="screen">
      <ScreenHead kicker="01 / Timeline" number="1" title="Chronological stream of meaningful AI work.">
        Timeline is powered by activity_events, not raw chat lists. Every entry is a meaningful unit of work — a chat,
        an artifact, a decision, an import.
      </ScreenHead>

      <div className="grid">
        <article className="panel full">
          <span className="tag">Filters</span>
          <div className="btn-row">
            {FILTERS.map((f, i) => (
              <button key={f} className={`btn ${i === 0 ? "primary" : "quiet"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="timeline">
            {EVENTS.map((e) => (
              <div key={e.title} className="event">
                <div className="event-time">{e.time}</div>
                <h3>{e.title}</h3>
                <p style={{ marginTop: 12 }}>{e.body}</p>
                <div className="btn-row">
                  {e.actions.map((a) =>
                    a.href ? (
                      <Link key={a.label} href={a.href} className={`btn ${a.primary ? "primary" : "quiet"}`}>
                        {a.label}
                      </Link>
                    ) : (
                      <button key={a.label} className={`btn ${a.primary ? "primary" : "quiet"}`}>
                        {a.label}
                      </button>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
