"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BarChart3,
  Command,
  FolderKanban,
  Home,
  Inbox,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "DASHBOARD", href: "/", icon: Home },
  { label: "TIMELINE", href: "/timeline", icon: Sparkles },
  { label: "INBOX", href: "/inbox", icon: Inbox },
  { label: "ARTIFACTS", href: "/artifacts", icon: Archive },
  { label: "PROJECTS", href: "/projects", icon: FolderKanban },
  { label: "SEARCH", href: "/search", icon: Search },
  { label: "RESOURCES", href: "/resources", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <div className="min-h-screen bg-paper-100">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-line-hair bg-paper-0/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair transition-colors hover:bg-paper-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[var(--grey-700)]">
          AI ACTIVITY HUB
        </span>
        <button
          onClick={toggleDarkMode}
          className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair transition-colors hover:bg-paper-100"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="absolute left-0 top-0 h-full w-72 border-r border-line-hair bg-paper-0 p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[11px] font-sans uppercase tracking-[0.18em]">NAVIGATION</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-[var(--radius-2)] transition-colors hover:bg-paper-100"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1">
              {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--radius-2)] px-3 py-2.5 text-[11px] font-sans uppercase tracking-[0.15em] transition-colors",
                      isActive
                        ? "bg-ink text-paper-0"
                        : "text-[var(--grey-700)] hover:bg-paper-100 hover:text-ink"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[264px_minmax(0,1fr)]">
        {/* Desktop Sidebar */}
        <aside className="hidden h-screen border-r border-line-hair bg-paper-0 lg:sticky lg:top-0 lg:flex lg:flex-col">
          {/* Logo */}
          <div className="border-b border-line-hair px-6 py-5">
            <div className="text-[11px] font-sans uppercase tracking-[0.18em]">AI ACTIVITY HUB</div>
            <div className="mt-1 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
              EDITORIAL INTERFACE
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
            <div className="mb-4 px-2">
              <span className="tech-label">NAVIGATION</span>
            </div>
            <div className="space-y-0.5">
              {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--radius-2)] px-3 py-2.5 text-[11px] font-sans uppercase tracking-[0.15em] transition-all duration-150",
                      isActive
                        ? "bg-ink text-paper-0 font-medium"
                        : "text-[var(--grey-700)] hover:bg-paper-100 hover:text-ink hover:translate-x-0.5"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-line-hair p-4">
            <button
              onClick={toggleDarkMode}
              className="flex w-full items-center gap-3 rounded-[var(--radius-2)] px-3 py-2.5 text-[11px] font-sans uppercase tracking-[0.15em] text-[var(--grey-700)] transition-colors hover:bg-paper-100 hover:text-ink"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? "LIGHT MODE" : "DARK MODE"}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0">
          {/* Desktop Top Bar */}
          <header className="sticky top-0 z-40 hidden border-b border-line-hair bg-paper-0/95 backdrop-blur lg:block">
            <div className="flex items-center justify-between px-8 py-4">
              {/* Global Search */}
              <div className="flex items-center gap-3 rounded-[var(--radius-2)] border border-line-hair bg-paper-50 px-4 py-2.5">
                <Search className="h-4 w-4 text-[var(--grey-500)]" />
                <input
                  type="text"
                  placeholder="Search across all AI activity..."
                  className="w-80 bg-transparent text-sm placeholder:text-[var(--grey-500)] focus:outline-none"
                />
                <kbd className="rounded border border-line-medium bg-paper-100 px-1.5 py-0.5 text-[10px] font-sans uppercase tracking-wider text-[var(--grey-500)]">
                  /
                </kbd>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-3 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100 hover:text-ink">
                  <Command className="h-3.5 w-3.5" />
                  COMMAND
                  <kbd className="rounded border border-line-medium bg-paper-100 px-1 py-0.5 text-[9px]">
                    K
                  </kbd>
                </button>
                <button className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
                  + NEW PROJECT
                </button>
              </div>
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
