import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Activity Hub — Home",
  description: "BMW Editorial-style AI Activity Hub home screen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
