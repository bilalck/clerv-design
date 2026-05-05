import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/ui/app-shell";

export const metadata: Metadata = {
  title: "AI Activity Hub",
  description: "Editorial-grade AI Activity Hub for tracking conversations, artifacts, and extracted intelligence across ChatGPT, Claude, Gemini, and manual imports.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
