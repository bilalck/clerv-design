import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

export const metadata: Metadata = {
  title: "AI Activity Hub",
  description:
    "A calm, local-first dashboard for everything you do with AI — chats, artifacts, decisions, tasks, and projects.",
}

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Sidebar />
          <main className="main">
            <Topbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
