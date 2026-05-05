"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileText, FolderKanban, MessageSquare } from "lucide-react";
import Link from "next/link";

type Platform = "Claude" | "ChatGPT" | "Gemini";

interface Chat {
  id: string;
  platform: Platform;
  title: string;
  preview: string;
  project: string;
  messages: number;
  artifacts: number;
  date: string;
  tags: string[];
}

const chats: Chat[] = [
  {
    id: "chat_001",
    platform: "ChatGPT",
    title: "AI Activity Hub Planning",
    preview: "Product planning conversation covering Timeline, Inbox, Artifacts, and Chats as core structure.",
    project: "Personal AI Dashboard",
    messages: 42,
    artifacts: 3,
    date: "Today",
    tags: ["Planning", "Product"],
  },
  {
    id: "chat_002",
    platform: "Claude",
    title: "Research Dashboard Prototype",
    preview: "Generated an interactive React prototype for a research insight dashboard.",
    project: "UX Research",
    messages: 28,
    artifacts: 2,
    date: "Today",
    tags: ["Prototype", "React"],
  },
  {
    id: "chat_003",
    platform: "Claude",
    title: "Design System Token Discussion",
    preview: "Explored color palette options and typography scales for the BMW Editorial design system.",
    project: "Design Systems",
    messages: 35,
    artifacts: 1,
    date: "Yesterday",
    tags: ["Design", "Tokens"],
  },
  {
    id: "chat_004",
    platform: "Gemini",
    title: "Competitor Analysis",
    preview: "Completed competitive analysis of 5 AI dashboard products with feature comparison.",
    project: "Research",
    messages: 18,
    artifacts: 2,
    date: "Yesterday",
    tags: ["Research", "Competition"],
  },
  {
    id: "chat_005",
    platform: "ChatGPT",
    title: "Export Parser Development",
    preview: "Built a parser utility for processing ChatGPT and Claude export files.",
    project: "Data Import",
    messages: 56,
    artifacts: 4,
    date: "Jan 12",
    tags: ["Code", "Parser"],
  },
];

const platformFilters = ["All", "Claude", "ChatGPT", "Gemini"];
const tabs = ["ALL", "WITH ARTIFACTS", "UNASSIGNED"];

export default function ChatsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);

  const filteredChats = chats.filter((c) => {
    if (platformFilter !== "All" && c.platform !== platformFilter) return false;
    if (activeTab === "WITH ARTIFACTS" && c.artifacts === 0) return false;
    return true;
  });

  const getPlatformColor = (platform: Platform) => {
    switch (platform) {
      case "Claude": return "bg-[#CC785C]/10 text-[#CC785C]";
      case "ChatGPT": return "bg-[#10A37F]/10 text-[#10A37F]";
      case "Gemini": return "bg-[#4285F4]/10 text-[#4285F4]";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">08 — SOURCE ARCHIVE</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">CHATS</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Full source archive of AI conversations. Browse, search, and extract value from your chat history.
        </p>
      </section>

      {/* Tabs + Filters */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-[var(--radius-2)] px-3 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                  activeTab === tab
                    ? "bg-ink text-paper-0"
                    : "text-[var(--grey-600)] hover:bg-paper-100 hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="appearance-none rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-2 pl-3 pr-8 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] focus:border-line-medium focus:outline-none"
              >
                {platformFilters.map((p) => (
                  <option key={p} value={p}>PLATFORM: {p}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--grey-500)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          {/* Chat List */}
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full rounded-[var(--radius-2)] border p-5 text-left transition-all ${
                  selectedChat?.id === chat.id
                    ? "border-ink shadow-line"
                    : "border-line-hair hover:border-line-medium"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-[var(--radius-2)] ${getPlatformColor(chat.platform)}`}>
                      <MessageSquare className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="platform-badge">{chat.platform}</span>
                        <span className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                          {chat.messages} messages
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg uppercase tracking-tight">{chat.title}</h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    {chat.date}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">{chat.preview}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {chat.tags.map((tag) => (
                      <span key={tag} className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {chat.artifacts > 0 && (
                    <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      <FileText className="h-3 w-3" /> {chat.artifacts} artifacts
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <aside className="hidden xl:block">
            {selectedChat ? (
              <div className="sticky top-24 space-y-4">
                <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                  <span className="editorial-tag">CHAT DETAILS</span>
                  <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">{selectedChat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{selectedChat.preview}</p>

                  <div className="mt-6 border-t border-line-hair pt-4">
                    <p className="tech-label mb-2">PROJECT</p>
                    <Link
                      href={`/projects/${selectedChat.project.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-2 text-sm text-[var(--grey-700)] underline underline-offset-4 hover:text-ink"
                    >
                      <FolderKanban className="h-4 w-4" />
                      {selectedChat.project}
                    </Link>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line-hair pt-4">
                    <div>
                      <p className="tech-label mb-1">MESSAGES</p>
                      <p className="font-serif text-2xl">{selectedChat.messages}</p>
                    </div>
                    <div>
                      <p className="tech-label mb-1">ARTIFACTS</p>
                      <p className="font-serif text-2xl">{selectedChat.artifacts}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Link
                      href={`/chats/${selectedChat.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-2)] bg-ink px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80"
                    >
                      VIEW FULL CHAT
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                    <button className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                      EXTRACT INSIGHTS
                    </button>
                  </div>
                </div>

                <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                  <span className="editorial-tag">ARCHIVE STATS</span>
                  <p className="mt-4 stat-numeral">{chats.length}</p>
                  <p className="mt-2 tech-label">TOTAL CONVERSATIONS</p>
                </div>
              </div>
            ) : (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-8 text-center dot-grid">
                <p className="tech-label">SELECT A CHAT</p>
                <p className="mt-2 text-sm text-[var(--grey-600)]">Choose a conversation to view details</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
