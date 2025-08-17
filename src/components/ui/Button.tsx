import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "outline";
    size?: "md" | "lg";
};

export function Button({ className, variant="primary", size="md", ...rest }: Props) {
    const base =
        "inline-flex items-center justify-center rounded-xl font-medium transition will-change-transform focus:outline-none focus:ring-2 focus:ring-brand/50 hover:-translate-y-0.5 active:translate-y-0";
    const variants = {
        primary: "bg-brand text-white hover:bg-brand-600 shadow-glow",
        ghost: "bg-transparent border border-white/10 hover:bg-white/5",
        outline: "bg-transparent outline-glow hover:bg-brand/10",
    }[variant];
    const sizes = { md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" }[size];

    return <button className={clsx(base, variants, sizes, className)} {...rest} />;
}