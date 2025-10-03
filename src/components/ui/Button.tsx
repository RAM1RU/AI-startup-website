import clsx from "clsx";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
};

export function Button({
                           className,
                           variant = "primary",
                           size = "md",
                           loading = false,
                           disabled,
                           children,
                           ...rest
                       }: Props) {
    const base =
        "inline-flex items-center justify-center rounded-xl font-medium transition will-change-transform " +
        "focus:outline-none focus:ring-2 focus:ring-brand/50 " +
        "hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand text-white hover:bg-brand-600 shadow-glow",
        ghost: "bg-transparent border border-white/10 hover:bg-white/5",
        outline: "bg-transparent outline-glow hover:bg-brand/10",
    }[variant];

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
    }[size];

    return (
        <button
            className={clsx(base, variants, sizes, className)}
            disabled={disabled || loading}
            {...rest}
        >
            {loading && (
                <span className="mr-2 inline-block size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            )}
            {children}
        </button>
    );
}