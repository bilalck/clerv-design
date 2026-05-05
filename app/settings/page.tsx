"use client";

import { useState } from "react";
import { Bell, Cloud, Key, Moon, Palette, Shield, Upload, User } from "lucide-react";

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sections: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
  { id: "appearance", label: "Appearance", icon: <Palette className="h-4 w-4" /> },
  { id: "integrations", label: "Integrations", icon: <Cloud className="h-4 w-4" /> },
  { id: "privacy", label: "Privacy", icon: <Shield className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { id: "api", label: "API Keys", icon: <Key className="h-4 w-4" /> },
];

const integrations = [
  { id: "chatgpt", name: "ChatGPT", status: "connected", lastSync: "2h ago" },
  { id: "claude", name: "Claude", status: "connected", lastSync: "4h ago" },
  { id: "gemini", name: "Gemini", status: "disconnected", lastSync: "Never" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoExtract, setAutoExtract] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">10 — CONFIGURATION</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">SETTINGS</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Configure integrations, appearance, privacy controls, and system preferences.
        </p>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Section Nav */}
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-center gap-3 rounded-[var(--radius-2)] px-4 py-3 text-left text-[11px] font-sans uppercase tracking-[0.12em] transition-colors ${
                  activeSection === section.id
                    ? "bg-ink text-paper-0"
                    : "text-[var(--grey-600)] hover:bg-paper-100 hover:text-ink"
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </nav>

          {/* Section Content */}
          <div className="space-y-6">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                <span className="editorial-tag">PROFILE</span>
                <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">USER INFORMATION</h3>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="tech-label mb-2 block">DISPLAY NAME</label>
                    <input
                      type="text"
                      defaultValue="Designer"
                      className="w-full max-w-md rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-3 text-sm focus:border-line-medium focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="tech-label mb-2 block">EMAIL</label>
                    <input
                      type="email"
                      defaultValue="designer@example.com"
                      className="w-full max-w-md rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-3 text-sm focus:border-line-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Section */}
            {activeSection === "appearance" && (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                <span className="editorial-tag">APPEARANCE</span>
                <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">VISUAL PREFERENCES</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-[var(--radius-2)] border border-line-hair p-4">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-[var(--grey-600)]" />
                      <div>
                        <p className="text-sm">Dark Mode</p>
                        <p className="text-[11px] text-[var(--grey-500)]">Switch to dark theme</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${darkMode ? "bg-ink" : "bg-paper-200"}`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-paper-0 transition-transform ${darkMode ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </div>

                  <div className="rounded-[var(--radius-2)] border border-line-hair p-4">
                    <p className="text-sm">Typography Scale</p>
                    <p className="text-[11px] text-[var(--grey-500)]">Adjust base font size</p>
                    <div className="mt-3 flex gap-2">
                      {["S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          className={`grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border transition-colors ${
                            size === "M" ? "border-ink bg-ink text-paper-0" : "border-line-hair hover:bg-paper-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Section */}
            {activeSection === "integrations" && (
              <div className="space-y-6">
                <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                  <span className="editorial-tag">INTEGRATIONS</span>
                  <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">CONNECTED PLATFORMS</h3>

                  <div className="mt-6 space-y-3">
                    {integrations.map((integration) => (
                      <div
                        key={integration.id}
                        className="flex items-center justify-between rounded-[var(--radius-2)] border border-line-hair p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100 text-[10px] font-sans uppercase">
                            {integration.name[0]}
                          </div>
                          <div>
                            <p className="text-sm">{integration.name}</p>
                            <p className="text-[11px] text-[var(--grey-500)]">Last sync: {integration.lastSync}</p>
                          </div>
                        </div>
                        <span
                          className={`rounded-[var(--radius-1)] px-2 py-1 text-[9px] font-sans uppercase tracking-[0.1em] ${
                            integration.status === "connected"
                              ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]"
                              : "bg-paper-200 text-[var(--grey-500)]"
                          }`}
                        >
                          {integration.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                  <span className="editorial-tag">IMPORT</span>
                  <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">MANUAL IMPORT</h3>
                  <p className="mt-2 text-sm text-[var(--grey-700)]">
                    Upload ChatGPT or Claude export files to import conversation history.
                  </p>

                  <div className="mt-6 rounded-[var(--radius-2)] border-2 border-dashed border-line-hair bg-paper-50 p-8 text-center dot-grid">
                    <Upload className="mx-auto h-8 w-8 text-[var(--grey-400)]" />
                    <p className="mt-4 text-sm text-[var(--grey-600)]">Drop files here or click to upload</p>
                    <p className="mt-1 text-[11px] text-[var(--grey-500)]">Supports .json export files</p>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeSection === "privacy" && (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                <span className="editorial-tag">PRIVACY</span>
                <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">DATA CONTROLS</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-[var(--radius-2)] border border-line-hair p-4">
                    <div>
                      <p className="text-sm">Auto-extract intelligence</p>
                      <p className="text-[11px] text-[var(--grey-500)]">Automatically detect tasks, decisions, and artifacts</p>
                    </div>
                    <button
                      onClick={() => setAutoExtract(!autoExtract)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${autoExtract ? "bg-ink" : "bg-paper-200"}`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-paper-0 transition-transform ${autoExtract ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </div>

                  <div className="rounded-[var(--radius-2)] border border-line-hair p-4">
                    <p className="text-sm">Default sensitivity</p>
                    <p className="text-[11px] text-[var(--grey-500)]">Set default privacy level for new imports</p>
                    <div className="mt-3 flex gap-2">
                      {["Public", "Private", "Sensitive"].map((level) => (
                        <button
                          key={level}
                          className={`rounded-[var(--radius-2)] border px-3 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                            level === "Private" ? "border-ink bg-ink text-paper-0" : "border-line-hair hover:bg-paper-100"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                <span className="editorial-tag">NOTIFICATIONS</span>
                <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">ALERT PREFERENCES</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-[var(--radius-2)] border border-line-hair p-4">
                    <div>
                      <p className="text-sm">Email notifications</p>
                      <p className="text-[11px] text-[var(--grey-500)]">Receive weekly summary emails</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${emailNotifications ? "bg-ink" : "bg-paper-200"}`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-paper-0 transition-transform ${emailNotifications ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API Keys Section */}
            {activeSection === "api" && (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
                <span className="editorial-tag">API KEYS</span>
                <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">ACCESS TOKENS</h3>
                <p className="mt-2 text-sm text-[var(--grey-700)]">
                  Generate API keys for programmatic access to your data.
                </p>

                <div className="mt-6">
                  <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-4">
                    <p className="tech-label mb-2">PRODUCTION KEY</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded-[var(--radius-2)] bg-paper-100 px-3 py-2 text-sm font-mono">
                        sk_live_••••••••••••••••
                      </code>
                      <button className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-3 py-2 text-[10px] font-sans uppercase tracking-[0.12em] hover:bg-paper-100">
                        COPY
                      </button>
                    </div>
                    <p className="mt-2 text-[11px] text-[var(--grey-500)]">Created Jan 5, 2024</p>
                  </div>
                </div>

                <button className="mt-4 rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                  GENERATE NEW KEY
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
