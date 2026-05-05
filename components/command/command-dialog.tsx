"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commandActions } from "@/components/command/command-data";
import type { CommandAction, CommandCategory } from "@/components/command/command-types";
import { cn } from "@/lib/utils";

const categories: CommandCategory[] = ["Navigation", "Actions", "Search", "AI"];

export function CommandDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandActions;

    return commandActions.filter((action) => {
      const haystack = [
        action.title,
        action.description,
        action.category,
        ...(action.keywords || []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query]);

  const activeAction = filtered[activeIndex] ?? filtered[0];

  React.useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    setTimeout(() => inputRef.current?.focus(), 0);
    setQuery("");
    setActiveIndex(0);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (activeAction) execute(activeAction);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered.length, activeAction]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function closeDialog() {
    setOpen(false);
    setTimeout(() => previousFocusRef.current?.focus(), 0);
  }

  function execute(action: CommandAction) {
    if (action.href) {
      router.push(action.href);
    } else if (action.execute) {
      action.execute();
    }
    closeDialog();
  }

  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 bg-black/25 px-4 pt-[8vh] backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-dialog-title"
        aria-describedby="command-dialog-desc"
        className="mx-auto grid max-h-[84vh] w-[min(980px,100%)] overflow-hidden rounded-[var(--radius-3)] border border-line-hair bg-paper-0 shadow-float xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="min-w-0">
          <div className="border-b border-line-hair p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="editorial-kicker">Command Layer</p>
                <h2 id="command-dialog-title" className="mt-3 font-serif text-3xl uppercase">
                  Search or run command
                </h2>
                <p id="command-dialog-desc" className="mt-2 text-sm text-[var(--grey-700)]">
                  Use arrow keys to navigate, Enter to run, Escape to close.
                </p>
              </div>
              <Button variant="ghost" onClick={closeDialog}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-[20px_1fr_auto] items-center gap-3 border border-line-hair bg-paper-50 px-4">
              <Search aria-hidden="true" className="h-4 w-4 text-[var(--grey-500)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, actions, artifacts, decisions…"
                className="w-full border-0 bg-transparent py-4 text-lg outline-none"
              />
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">⌘K</span>
            </div>
          </div>

          <div className="max-h-[56vh] overflow-auto p-3" role="listbox" aria-label="Commands">
            {filtered.length === 0 ? (
              <CommandEmpty query={query} />
            ) : (
              categories.map((category) => {
                const items = filtered.filter((item) => item.category === category);
                if (items.length === 0) return null;

                return (
                  <CommandGroup key={category} title={category}>
                    {items.map((action) => {
                      const globalIndex = filtered.findIndex((item) => item.id === action.id);
                      return (
                        <CommandItem
                          key={action.id}
                          action={action}
                          active={globalIndex === activeIndex}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          onClick={() => execute(action)}
                        />
                      );
                    })}
                  </CommandGroup>
                );
              })
            )}
          </div>
        </div>

        <CommandPreview action={activeAction} />
      </div>
    </div>
  );
}

function CommandGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4">
      <p className="px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{title}</p>
      <div className="grid gap-1">{children}</div>
    </section>
  );
}

function CommandItem({
  action,
  active,
  onMouseEnter,
  onClick,
}: {
  action: CommandAction;
  active: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  const Icon = action.icon;

  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={cn(
        "grid w-full grid-cols-[36px_1fr_auto] items-center gap-3 rounded-[var(--radius-2)] px-3 py-3 text-left transition duration-150",
        active ? "bg-paper-100" : "hover:bg-paper-50"
      )}
    >
      <span className="grid h-9 w-9 place-items-center border border-line-medium bg-paper-0">
        {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
      </span>
      <span>
        <span className="block text-sm text-ink">{action.title}</span>
        <span className="mt-1 block text-xs text-[var(--grey-500)]">{action.description}</span>
      </span>
      {action.shortcut ? (
        <span className="editorial-tag">{action.shortcut}</span>
      ) : null}
    </button>
  );
}

function CommandPreview({ action }: { action?: CommandAction }) {
  return (
    <aside className="hidden border-l border-line-hair bg-paper-50 p-6 xl:block">
      <p className="editorial-kicker">Preview</p>
      {action ? (
        <div className="mt-8">
          <span className="editorial-tag">{action.category}</span>
          <h3 className="mt-5 font-serif text-3xl uppercase leading-tight">{action.previewTitle}</h3>
          <p className="mt-4 text-sm leading-6 text-[var(--grey-700)]">{action.previewBody}</p>
          <div className="mt-8 border-l border-line-strong pl-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">Command</p>
            <p className="mt-2 text-sm text-ink">{action.title}</p>
          </div>
        </div>
      ) : (
        <p className="mt-8 text-sm leading-6 text-[var(--grey-700)]">
          Type to search commands, actions, and source-linked records.
        </p>
      )}
    </aside>
  );
}

function CommandEmpty({ query }: { query: string }) {
  return (
    <div className="dot-field p-8">
      <div className="bg-paper-0/90 p-4">
        <p className="editorial-kicker">No command found</p>
        <h3 className="mt-5 font-serif text-3xl uppercase">Nothing matched.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          No command matched “{query}”. Try searching for a page, project, artifact, action, or AI operation.
        </p>
      </div>
    </div>
  );
}
