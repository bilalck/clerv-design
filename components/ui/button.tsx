import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-2)] border px-5 py-3 text-[11px] uppercase tracking-[0.14em] transition duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "border-ink bg-ink text-paper-0 hover:opacity-75",
        secondary: "border-ink bg-transparent text-ink hover:opacity-75",
        ghost: "border-line-medium bg-transparent text-[var(--grey-700)] hover:text-ink",
        danger: "border-[var(--accent-danger)] text-[var(--accent-danger)] hover:opacity-75",
      },
      size: {
        sm: "min-h-9 px-4 text-[10px]",
        md: "min-h-11 px-5 text-[11px]",
        lg: "min-h-13 px-6 text-[12px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  if (asChild) {
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), loading && "relative text-transparent", className)}
        aria-busy={loading || undefined}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), loading && "relative text-transparent", className)}
      aria-busy={loading || undefined}
      disabled={props.disabled || loading}
      {...props}
    >
      {children}
      {loading ? (
        <span
          aria-hidden="true"
          className="absolute h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-inherit"
        />
      ) : null}
    </button>
  );
}

export { buttonVariants };
