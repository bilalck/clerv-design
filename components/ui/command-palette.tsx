"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { CommandDialog } from "@/components/command/command-dialog";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid min-h-11 w-full max-w-xl grid-cols-[20px_1fr_auto] items-center gap-3 border border-line-hair bg-paper-50 px-4 text-left text-sm text-[var(--grey-600)] transition duration-150 hover:border-line-medium"
        aria-haspopup="dialog"
      >
        <Search aria-hidden="true" className="h-4 w-4" />
        <span>Search or run command…</span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">⌘K</span>
      </button>
      <CommandDialog open={open} setOpen={setOpen} />
    </>
  );
}
