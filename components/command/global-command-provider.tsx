"use client";

import * as React from "react";
import { CommandDialog } from "@/components/command/command-dialog";
import { useCommandShortcut } from "@/components/command/use-command-shortcut";

export function GlobalCommandProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  useCommandShortcut(setOpen);

  return (
    <>
      {children}
      <CommandDialog open={open} setOpen={setOpen} />
    </>
  );
}
