import { Archive, Command, Home, Inbox, Search, Sparkles, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home, count: null },
  { label: "Timeline", href: "/timeline", icon: Sparkles, count: "24" },
  { label: "Inbox", href: "/inbox", icon: Inbox, count: "14" },
  { label: "Artifacts", href: "/artifacts", icon: Archive, count: "36" },
  { label: "Projects", href: "/projects", icon: Tags, count: "5" },
  { label: "Search", href: "/search", icon: Search, count: null },
  { label: "Command", href: "/command", icon: Command, count: "⌘K" },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen border-r border-line-hair bg-paper-0 p-8 lg:sticky lg:top-0 lg:block">
      <div className="mb-12 text-xs uppercase tracking-[0.18em]">AI Activity Hub</div>
      <p className="editorial-kicker">Navigation</p>
      <nav aria-label="Main navigation" className="mt-4 grid gap-1">
        {items.map(({ label, href, icon: Icon, count }, index) => (
          <a
            key={label}
            href={href}
            className={cn(
              "grid grid-cols-[24px_1fr_auto] items-center gap-3 py-2 text-sm text-[var(--grey-700)] transition duration-150 hover:translate-x-0.5 hover:text-ink",
              index === 0 && "text-ink"
            )}
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            <span>{label}</span>
            {count ? <span className="text-[11px] text-[var(--grey-500)]">{count}</span> : null}
          </a>
        ))}
      </nav>
    </aside>
  );
}
