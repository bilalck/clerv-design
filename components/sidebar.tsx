"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV = [
  { num: "00", label: "Home Dashboard", href: "/" },
  { num: "01", label: "Timeline", href: "/timeline" },
  { num: "02", label: "Inbox Triage", href: "/inbox" },
  { num: "03", label: "Artifacts", href: "/artifacts" },
  { num: "04", label: "Chat Detail", href: "/chats" },
  { num: "05", label: "Project Detail", href: "/projects" },
  { num: "06", label: "Import Flow", href: "/import" },
  { num: "07", label: "Search Results", href: "/search" },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <Link href="/" className="brand">
        AI Activity Hub
      </Link>
      <div className="nav-title">First UI screens</div>
      <nav className="nav">
        {NAV.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.href} href={item.href} className={isActive ? "active" : undefined}>
              <span>{item.num}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-meta">
        <div className="row">
          <span>Storage</span>
          <strong>Local</strong>
        </div>
        <div className="row">
          <span>Last import</span>
          <strong>Yesterday</strong>
        </div>
        <div className="row">
          <span>Privacy</span>
          <strong>Encrypted</strong>
        </div>
      </div>
    </aside>
  )
}
