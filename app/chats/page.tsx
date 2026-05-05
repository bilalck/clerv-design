import { ScreenHead } from "@/components/screen-head"

export default function ChatDetailPage() {
  return (
    <section className="screen">
      <ScreenHead kicker="04 / Chat Detail" number="4" title="Full source archive with extracted knowledge.">
        Every conversation is preserved verbatim, with structured extractions surfaced alongside.
      </ScreenHead>

      <div className="grid">
        <article className="panel wide">
          <span className="tag">ChatGPT · Planning · Yesterday</span>
          <h3>AI Activity Hub Planning</h3>
          <p style={{ marginTop: 16 }}>
            A structured planning conversation about a local-first AI work dashboard with Timeline, Inbox, Artifacts,
            Chats and Projects.
          </p>

          <div className="callout">
            <strong>AI Summary</strong>
            <p>
              Defined product concept, import-first architecture, core data model and MVP build plan. Identified
              Timeline + Inbox as the leading screens to ship first.
            </p>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Extracted</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tasks</td>
                  <td>Create schema · Design inbox triage · Define artifact metadata</td>
                </tr>
                <tr>
                  <td>Decisions</td>
                  <td>Use import-first model · Start with Timeline + Inbox</td>
                </tr>
                <tr>
                  <td>Artifacts</td>
                  <td>Product plan document · Dashboard IA sketch</td>
                </tr>
                <tr>
                  <td>People</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Sensitive</td>
                  <td>None detected</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="btn-row">
            <button className="btn primary">Open transcript</button>
            <button className="btn quiet">Re-extract</button>
            <button className="btn quiet">Export</button>
            <button className="btn quiet">Tag</button>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Related work</span>
          <div className="list">
            <div className="item">
              <span className="iconbox">A</span>
              <p>AI Activity Product Plan</p>
              <span className="badge">Doc</span>
            </div>
            <div className="item">
              <span className="iconbox">T</span>
              <p>Timeline Wireframe</p>
              <span className="badge">Flow</span>
            </div>
            <div className="item">
              <span className="iconbox">P</span>
              <p>Personal AI Dashboard</p>
              <span className="badge">Project</span>
            </div>
            <div className="item">
              <span className="iconbox">D</span>
              <p>Use import-first architecture</p>
              <span className="badge success">Decision</span>
            </div>
          </div>
        </article>

        <article className="panel full">
          <span className="tag">Transcript</span>
          <div className="timeline">
            <div className="event">
              <div className="event-time">You · 9:18 AM</div>
              <p style={{ marginTop: 4 }}>
                I want to design a unified AI activity dashboard. Can we start by mapping the structure?
              </p>
            </div>
            <div className="event">
              <div className="event-time">ChatGPT · 9:18 AM</div>
              <p style={{ marginTop: 4 }}>
                Sure. The cleanest mental model is four parallel streams — chats, artifacts, decisions and tasks — all
                joined by a unifying activity timeline. Let&apos;s sketch each.
              </p>
            </div>
            <div className="event">
              <div className="event-time">You · 9:21 AM</div>
              <p style={{ marginTop: 4 }}>
                What&apos;s the right MVP? I can&apos;t ship all four at once.
              </p>
            </div>
            <div className="event">
              <div className="event-time">ChatGPT · 9:22 AM</div>
              <p style={{ marginTop: 4 }}>
                Timeline + Inbox. Timeline gives the &quot;what did I do recently&quot; view. Inbox gives the daily
                triage loop. Everything else can be progressively layered.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
