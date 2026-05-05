"use client";

import { useState } from "react";
import { BarChart3, Calendar, Clock, MessageSquare, TrendingUp, Zap } from "lucide-react";

interface UsageData {
  platform: string;
  tokens: number;
  messages: number;
  cost: number;
  color: string;
}

interface DailyUsage {
  date: string;
  tokens: number;
  messages: number;
}

const usageByPlatform: UsageData[] = [
  { platform: "Claude", tokens: 245000, messages: 428, cost: 12.50, color: "#CC785C" },
  { platform: "ChatGPT", tokens: 189000, messages: 312, cost: 9.80, color: "#10A37F" },
  { platform: "Gemini", tokens: 67000, messages: 98, cost: 3.20, color: "#4285F4" },
];

const dailyUsage: DailyUsage[] = [
  { date: "Mon", tokens: 42000, messages: 68 },
  { date: "Tue", tokens: 38000, messages: 52 },
  { date: "Wed", tokens: 55000, messages: 84 },
  { date: "Thu", tokens: 31000, messages: 41 },
  { date: "Fri", tokens: 48000, messages: 72 },
  { date: "Sat", tokens: 22000, messages: 28 },
  { date: "Sun", tokens: 18000, messages: 24 },
];

const timeRanges = ["7 DAYS", "30 DAYS", "90 DAYS", "ALL TIME"];

export default function UsagePage() {
  const [timeRange, setTimeRange] = useState("7 DAYS");
  
  const totalTokens = usageByPlatform.reduce((a, b) => a + b.tokens, 0);
  const totalMessages = usageByPlatform.reduce((a, b) => a + b.messages, 0);
  const totalCost = usageByPlatform.reduce((a, b) => a + b.cost, 0);
  const maxDailyTokens = Math.max(...dailyUsage.map(d => d.tokens));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">09 — RESOURCE INTELLIGENCE</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">USAGE</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Resource usage metrics and cost tracking across AI platforms.
        </p>
      </section>

      {/* Time Range */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-wrap gap-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-[var(--radius-2)] px-3 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                timeRange === range
                  ? "bg-ink text-paper-0"
                  : "text-[var(--grey-600)] hover:bg-paper-100 hover:text-ink"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100">
                <Zap className="h-5 w-5 text-[var(--grey-600)]" />
              </div>
              <span className="editorial-tag">TOKENS</span>
            </div>
            <p className="mt-4 stat-numeral">{(totalTokens / 1000).toFixed(0)}K</p>
            <p className="mt-2 tech-label">TOTAL TOKENS USED</p>
          </div>

          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100">
                <MessageSquare className="h-5 w-5 text-[var(--grey-600)]" />
              </div>
              <span className="editorial-tag">MESSAGES</span>
            </div>
            <p className="mt-4 stat-numeral">{totalMessages}</p>
            <p className="mt-2 tech-label">TOTAL MESSAGES</p>
          </div>

          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100">
                <TrendingUp className="h-5 w-5 text-[var(--grey-600)]" />
              </div>
              <span className="editorial-tag">COST</span>
            </div>
            <p className="mt-4 stat-numeral">${totalCost.toFixed(2)}</p>
            <p className="mt-2 tech-label">ESTIMATED COST</p>
          </div>

          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100">
                <Clock className="h-5 w-5 text-[var(--grey-600)]" />
              </div>
              <span className="editorial-tag">DAILY AVG</span>
            </div>
            <p className="mt-4 stat-numeral">{Math.round(totalTokens / 7 / 1000)}K</p>
            <p className="mt-2 tech-label">TOKENS / DAY</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Main Charts */}
          <div className="space-y-6">
            {/* Daily Usage Chart */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
              <div className="flex items-center justify-between">
                <span className="editorial-tag">DAILY BREAKDOWN</span>
                <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  <Calendar className="h-3 w-3" />
                  LAST 7 DAYS
                </span>
              </div>
              <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">TOKEN USAGE</h3>

              {/* Bar Chart */}
              <div className="mt-6 flex items-end gap-2 h-48">
                {dailyUsage.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full">
                      <div
                        className="w-full rounded-t-[var(--radius-1)] bg-ink transition-all hover:bg-[var(--grey-800)]"
                        style={{ height: `${(day.tokens / maxDailyTokens) * 160}px` }}
                      />
                    </div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      {day.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
              <span className="editorial-tag">PLATFORM DISTRIBUTION</span>
              <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">BY SOURCE</h3>

              {/* Stacked Bar */}
              <div className="mt-6">
                <div className="flex h-8 overflow-hidden rounded-[var(--radius-2)]">
                  {usageByPlatform.map((platform, index) => (
                    <div
                      key={index}
                      className="h-full transition-all first:rounded-l-[var(--radius-2)] last:rounded-r-[var(--radius-2)]"
                      style={{
                        width: `${(platform.tokens / totalTokens) * 100}%`,
                        backgroundColor: platform.color,
                      }}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {usageByPlatform.map((platform, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="text-[11px] text-[var(--grey-700)]">{platform.platform}</span>
                      <span className="text-[11px] text-[var(--grey-500)]">
                        ({Math.round((platform.tokens / totalTokens) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Table */}
              <div className="mt-6 border-t border-line-hair pt-4">
                <div className="grid grid-cols-4 gap-4 border-b border-line-hair pb-2">
                  <span className="tech-label">PLATFORM</span>
                  <span className="tech-label text-right">TOKENS</span>
                  <span className="tech-label text-right">MESSAGES</span>
                  <span className="tech-label text-right">COST</span>
                </div>
                {usageByPlatform.map((platform, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 border-b border-line-hair py-3 last:border-b-0">
                    <span className="flex items-center gap-2 text-sm">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                      {platform.platform}
                    </span>
                    <span className="text-right text-sm text-[var(--grey-700)]">{(platform.tokens / 1000).toFixed(0)}K</span>
                    <span className="text-right text-sm text-[var(--grey-700)]">{platform.messages}</span>
                    <span className="text-right text-sm text-[var(--grey-700)]">${platform.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">TOP MODEL</span>
              <p className="mt-4 font-serif text-2xl uppercase tracking-tight">Claude 3.5</p>
              <p className="mt-2 tech-label">MOST USED THIS PERIOD</p>
              <div className="mt-4 h-2 w-full rounded-full bg-paper-200">
                <div className="h-2 rounded-full bg-[#CC785C]" style={{ width: "68%" }} />
              </div>
              <p className="mt-2 text-[11px] text-[var(--grey-500)]">68% of total usage</p>
            </div>

            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">PEAK ACTIVITY</span>
              <p className="mt-4 font-serif text-2xl uppercase tracking-tight">Wednesday</p>
              <p className="mt-2 tech-label">HIGHEST USAGE DAY</p>
              <p className="mt-4 text-sm text-[var(--grey-700)]">55K tokens across 84 messages</p>
            </div>

            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">BUDGET</span>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-serif text-2xl">${totalCost.toFixed(2)}</span>
                <span className="text-sm text-[var(--grey-500)]">/ $50.00</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-paper-200">
                <div
                  className="h-2 rounded-full bg-ink"
                  style={{ width: `${(totalCost / 50) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-[var(--grey-500)]">{Math.round((totalCost / 50) * 100)}% of monthly budget</p>
            </div>

            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-5 dot-grid">
              <span className="editorial-tag">EXPORT</span>
              <p className="mt-4 text-sm text-[var(--grey-700)]">Download usage data as CSV for accounting or analysis.</p>
              <button className="mt-4 w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                EXPORT CSV
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
