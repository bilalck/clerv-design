import Link from "next/link"
import { ScreenHead } from "@/components/screen-head"

export default function HomePage() {
  return (
    <section className="screen">
      <ScreenHead kicker="00 / Home Dashboard" number="0" title="What did I do with AI recently?" large>
        A calm daily overview showing recent AI activity, inbox pressure, generated artifacts, extracted tasks and
        active projects.
      </ScreenHead>

      <div className="grid">
        <article className="panel">
          <span className="tag">Today</span>
          <div className="stat">6</div>
          <div className="stat-label">New chats</div>
        </article>
        <article className="panel">
          <span className="tag">Artifacts</span>
          <div className="stat">3</div>
          <div className="stat-label">Created today</div>
        </article>
        <article className="panel">
          <span className="tag">Inbox</span>
          <div className="stat">14</div>
          <div className="stat-label">Need review</div>
        </article>

        <article className="panel wide">
          <span className="tag">Inbox preview</span>
          <h3>Unreviewed AI work</h3>
          <div className="list">
            <div className="item">
              <span className="iconbox">C</span>
              <p>Claude artifact: Research dashboard prototype</p>
              <span className="badge warn">Review</span>
            </div>
            <div className="item">
              <span className="iconbox">G</span>
              <p>ChatGPT chat: AI platform activity dashboard plan</p>
              <span className="badge">New</span>
            </div>
            <div className="item">
              <span className="iconbox">M</span>
              <p>Manual upload: Dashboard IA sketch</p>
              <span className="badge success">File</span>
            </div>
          </div>
          <div className="btn-row">
            <Link href="/inbox" className="btn primary">
              Review Inbox
            </Link>
            <button className="btn quiet">Archive noise</button>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Recent artifact</span>
          <div className="artifact" style={{ marginTop: 4 }}>
            <div className="thumb">Doc</div>
            <div className="artifact-body">
              <h4>Dashboard IA Plan</h4>
              <p>Generated from ChatGPT planning session.</p>
            </div>
          </div>
        </article>

        <article className="panel half">
          <span className="tag">Active projects</span>
          <div className="list">
            <div className="item">
              <span className="iconbox">01</span>
              <p>Personal AI Dashboard</p>
              <span className="badge">42 events</span>
            </div>
            <div className="item">
              <span className="iconbox">02</span>
              <p>Design Systems</p>
              <span className="badge">18 events</span>
            </div>
            <div className="item">
              <span className="iconbox">03</span>
              <p>Client UX Research</p>
              <span className="badge">9 events</span>
            </div>
          </div>
          <div className="btn-row">
            <Link href="/projects" className="btn quiet">
              Open project
            </Link>
          </div>
        </article>

        <article className="panel half">
          <span className="tag">Open tasks</span>
          <div className="list">
            <div className="item">
              <span className="iconbox">✓</span>
              <p>Design Timeline empty state</p>
              <span className="badge warn">Todo</span>
            </div>
            <div className="item">
              <span className="iconbox">✓</span>
              <p>Create import confirmation flow</p>
              <span className="badge warn">Todo</span>
            </div>
            <div className="item">
              <span className="iconbox">✓</span>
              <p>Define artifact metadata</p>
              <span className="badge success">Doing</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
