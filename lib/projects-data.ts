import type { Project } from "@/components/projects/project-card";

export const projects: Project[] = [
  {
    id: "personal-ai-dashboard",
    name: "Personal AI Dashboard",
    description:
      "A local-first dashboard that imports AI history and organizes it into Timeline, Inbox, Artifacts, Chats, Tasks and Decisions.",
    status: "Active",
    privacy: "Personal",
    events: 124,
    artifacts: 36,
    chats: 42,
    tasks: 22,
    decisions: 11,
    lastActivity: "Today · 10:42 AM",
    tags: ["AI workflow", "Dashboard", "Local-first"],
  },
  {
    id: "design-systems",
    name: "Design Systems",
    description:
      "A workspace for BMW editorial design system components, tokens, governance and implementation planning.",
    status: "Review",
    privacy: "Work",
    events: 64,
    artifacts: 18,
    chats: 21,
    tasks: 13,
    decisions: 7,
    lastActivity: "Yesterday · 6:04 PM",
    tags: ["Components", "Tokens", "Governance"],
  },
  {
    id: "client-ux-research",
    name: "Client UX Research",
    description:
      "Research outputs, prototypes, insight summaries and generated UX artifacts for client-facing workstreams.",
    status: "Active",
    privacy: "Confidential",
    events: 38,
    artifacts: 9,
    chats: 12,
    tasks: 8,
    decisions: 4,
    lastActivity: "This week",
    tags: ["UX", "Research", "Client"],
  },
];
