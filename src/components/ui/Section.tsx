import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = {
    children: ReactNode;
    className?: string;
    id?: string;
} & HTMLAttributes<HTMLElement>;

export default function Section({ children, className = "", id, ...rest }: Props) {
    return (
        <section id={id} className={clsx("py-20 md:py-28", className)} {...rest}>
            <div className="container">{children}</div>
        </section>
    );
}