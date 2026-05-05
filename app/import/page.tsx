import Link from "next/link"
import { ScreenHead } from "@/components/screen-head"

export default function ImportPage() {
  return (
    <section className="screen">
      <ScreenHead kicker="06 / Import Flow" number="6" title="Upload exports, normalize activity and create timeline events.">
        Drop a ChatGPT or Claude export ZIP — or upload manual files. Everything is parsed locally first, then surfaced
        for review in the Inbox.
      </ScreenHead>

      <div className="grid">
        <article className="panel wide">
          <span className="tag">Import source</span>
          <div className="grid">
            <div className="panel surface">
              <span className="tag">ChatGPT</span>
              <h3>Export ZIP</h3>
              <p style={{ marginTop: 12 }}>Import conversations and shared links.</p>
              <div className="btn-row">
                <button className="btn primary">Upload</button>
              </div>
            </div>
            <div className="panel surface">
              <span className="tag">Claude</span>
              <h3>Export ZIP</h3>
              <p style={{ marginTop: 12 }}>Import chats and artifact references.</p>
              <div className="btn-row">
                <button className="btn">Upload</button>
              </div>
            </div>
            <div className="panel surface">
              <span className="tag">Manual</span>
              <h3>Artifacts</h3>
              <p style={{ marginTop: 12 }}>Upload docs, code, images, diagrams.</p>
              <div className="btn-row">
                <button className="btn">Upload</button>
              </div>
            </div>
          </div>
        </article>

        <article className="panel">
          <span className="tag">Import complete</span>
          <div className="stat">428</div>
          <div className="stat-label">Conversations</div>
          <div className="list">
            <div className="item">
              <span className="iconbox">M</span>
              <p>2,941 messages</p>
              <span className="badge">Parsed</span>
            </div>
            <div className="item">
              <span className="iconbox">I</span>
              <p>87 inbox items</p>
              <span className="badge warn">Review</span>
            </div>
            <div className="item">
              <span className="iconbox">A</span>
              <p>14 artifacts detected</p>
              <span className="badge success">OK</span>
            </div>
          </div>
          <div className="btn-row">
            <Link href="/inbox" className="btn primary">
              Review Inbox
            </Link>
          </div>
        </article>

        <article className="panel full">
          <span className="tag">Pipeline</span>
          <div className="flow">
            <div className="node">Upload</div>
            <div className="edge" aria-hidden="true" />
            <div className="node">Parse</div>
            <div className="edge" aria-hidden="true" />
            <div className="node">Normalize</div>
            <div className="edge" aria-hidden="true" />
            <div className="node">Detect</div>
            <div className="edge" aria-hidden="true" />
            <div className="node">Inbox</div>
          </div>
          <div className="alert">
            <strong>Privacy</strong>
            <p style={{ marginTop: 6 }}>
              Raw exports are kept untouched on disk. Parsing happens locally; nothing is uploaded to a third party
              until you explicitly choose to.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
