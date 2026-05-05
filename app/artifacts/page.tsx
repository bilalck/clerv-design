import { ScreenHead } from "@/components/screen-head"

const ARTIFACTS = [
  { kind: "React", title: "Research Dashboard", meta: "Claude · Today · v3", badge: "Prototype", badgeClass: "" },
  {
    kind: "Doc",
    title: "AI Activity Product Plan",
    meta: "ChatGPT · Yesterday · v1",
    badge: "Draft",
    badgeClass: "warn",
  },
  {
    kind: "Flow",
    title: "Inbox Triage Flow",
    meta: "Manual Upload · This week",
    badge: "Reviewed",
    badgeClass: "success",
  },
  {
    kind: "Code",
    title: "Schema Migration v2",
    meta: "Claude · 3 days ago · v2",
    badge: "Draft",
    badgeClass: "warn",
  },
  {
    kind: "Image",
    title: "Dashboard IA sketch",
    meta: "Manual Upload · This week",
    badge: "New",
    badgeClass: "",
  },
  {
    kind: "Slides",
    title: "MVP Pitch Deck",
    meta: "ChatGPT · Last week · v4",
    badge: "Reviewed",
    badgeClass: "success",
  },
]

export default function ArtifactsPage() {
  return (
    <section className="screen">
      <ScreenHead kicker="03 / Artifacts" number="3" title="Generated output lifecycle manager.">
        Artifacts are treated as first-class outputs, not attachments buried inside chats.
      </ScreenHead>

      <div className="artifact-grid">
        {ARTIFACTS.map((a) => (
          <article key={a.title} className="artifact">
            <div className="thumb">{a.kind}</div>
            <div className="artifact-body">
              <span className={`badge ${a.badgeClass}`}>{a.badge}</span>
              <h3>{a.title}</h3>
              <p>{a.meta}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid" style={{ marginTop: 24 }}>
        <article className="panel wide">
          <span className="tag">Artifact detail preview</span>
          <h3>AI Activity Dashboard Product Plan</h3>
          <div className="table-wrap">
            <table className="table">
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>Document</td>
                </tr>
                <tr>
                  <td>Source</td>
                  <td>ChatGPT conversation · May 4, 2026</td>
                </tr>
                <tr>
                  <td>Project</td>
                  <td>Personal AI Dashboard</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <span className="badge warn">Draft</span>
                  </td>
                </tr>
                <tr>
                  <td>Tags</td>
                  <td>dashboard, IA, MVP, planning</td>
                </tr>
                <tr>
                  <td>Versions</td>
                  <td>v1 (current) · v0 (archived)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="btn-row">
            <button className="btn primary">Open</button>
            <button className="btn quiet">Rename</button>
            <button className="btn quiet">Add tags</button>
            <button className="btn quiet">Export</button>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Source view</span>
          <p>Linked back to source chat, timeline event, extracted tasks and related artifacts.</p>
          <div className="flow">
            <div className="node">Chat</div>
            <div className="edge" aria-hidden="true" />
            <div className="node">Artifact</div>
            <div className="edge" aria-hidden="true" />
            <div className="node">Task</div>
          </div>
        </article>
      </div>
    </section>
  )
}
