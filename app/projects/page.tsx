import { ScreenHead } from "@/components/screen-head"

export default function ProjectDetailPage() {
  return (
    <section className="screen">
      <ScreenHead kicker="05 / Project Detail" number="5" title="Organize AI work around outcomes, not platforms.">
        Projects bind chats, artifacts, decisions and tasks across platforms into a single workspace.
      </ScreenHead>

      <div className="grid">
        <article className="panel full">
          <span className="tag">Project</span>
          <h3>Personal AI Activity Hub</h3>
          <p style={{ marginTop: 16 }}>
            A dashboard to unify AI chats, artifacts, timelines, inbox items and generated outputs. Owned by Bilal,
            currently in MVP definition.
          </p>
          <div className="btn-row">
            <button className="btn primary">Open workspace</button>
            <button className="btn quiet">Edit</button>
            <button className="btn quiet">Archive</button>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Recent activity</span>
          <div className="list">
            <div className="item">
              <span className="iconbox">G</span>
              <p>Product architecture plan</p>
              <span className="badge">Chat</span>
            </div>
            <div className="item">
              <span className="iconbox">C</span>
              <p>React prototype</p>
              <span className="badge">Artifact</span>
            </div>
            <div className="item">
              <span className="iconbox">M</span>
              <p>IA sketch upload</p>
              <span className="badge">File</span>
            </div>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Artifacts</span>
          <div className="list">
            <div className="item">
              <span className="iconbox">D</span>
              <p>Product plan document</p>
              <span className="badge">Doc</span>
            </div>
            <div className="item">
              <span className="iconbox">W</span>
              <p>Timeline wireframe</p>
              <span className="badge">Design</span>
            </div>
            <div className="item">
              <span className="iconbox">R</span>
              <p>Research dashboard prototype</p>
              <span className="badge">React</span>
            </div>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Decisions</span>
          <div className="list">
            <div className="item">
              <span className="iconbox">01</span>
              <p>Start import-first</p>
              <span className="badge success">Accepted</span>
            </div>
            <div className="item">
              <span className="iconbox">02</span>
              <p>Avoid live integrations in MVP</p>
              <span className="badge success">Accepted</span>
            </div>
            <div className="item">
              <span className="iconbox">03</span>
              <p>Defer collaboration features</p>
              <span className="badge warn">Pending</span>
            </div>
          </div>
        </article>

        <article className="panel wide">
          <span className="tag">Task board</span>
          <div className="board">
            <div className="lane">
              <span className="badge">Todo</span>
              <div className="task">Design Timeline empty state</div>
              <div className="task">Create import confirmation flow</div>
              <div className="task">Spec Inbox keyboard shortcuts</div>
            </div>
            <div className="lane">
              <span className="badge warn">Doing</span>
              <div className="task">Define artifact metadata</div>
              <div className="task">Build Inbox triage cards</div>
            </div>
            <div className="lane">
              <span className="badge success">Done</span>
              <div className="task">Define schema</div>
              <div className="task">First Timeline pass</div>
            </div>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Activity</span>
          <div className="chart" aria-label="Activity bar chart for the past week">
            <span className="bar" style={{ height: "40%" }} />
            <span className="bar" style={{ height: "70%" }} />
            <span className="bar" style={{ height: "55%" }} />
            <span className="bar" style={{ height: "90%" }} />
            <span className="bar" style={{ height: "30%" }} />
            <span className="bar" style={{ height: "60%" }} />
            <span className="bar" style={{ height: "78%" }} />
          </div>
          <p style={{ marginTop: 14, fontSize: 12, color: "var(--g500)", letterSpacing: ".06em" }}>
            42 events this week · +18% vs last
          </p>
        </article>
      </div>
    </section>
  )
}
