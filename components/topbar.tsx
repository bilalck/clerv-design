"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function Topbar() {
  const router = useRouter()
  const [q, setQ] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`)
    } else {
      router.push("/search")
    }
  }

  return (
    <header className="topbar">
      <span className="kicker u">Local-first / import-first / privacy-aware</span>
      <form onSubmit={onSubmit} role="search" style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <input
          type="search"
          className="search"
          placeholder="Search all AI work…"
          aria-label="Search all AI work"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
    </header>
  )
}
