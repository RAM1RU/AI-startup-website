type Props = {
    /** Текст внутри плашки */
    children?: React.ReactNode;
    /** Опциональная ссылка “cta” справа (например “Read more →”) */
    ctaHref?: string;
    ctaLabel?: string;
    /** Выравнивание контейнера */
    align?: "left" | "center";
    /** Показать пульс-точку слева */
    pulse?: boolean;
    className?: string;
};

export default function Announcement({
                                         children = "Latest integration just arrived",
                                         ctaHref,
                                         ctaLabel,
                                         align = "center",
                                         pulse = true,
                                         className = "",
                                     }: Props) {
    return (
        <div className={align === "center" ? "flex justify-center" : ""}>
      <span
          className={`inline-flex items-center gap-2 rounded-full border border-brand/30 
        bg-brand/15 px-3 py-1 text-xs text-brand-300 ${className}`}
      >
        {pulse && <span className="h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" />}
          <span className="whitespace-nowrap">{children}</span>

          {ctaHref && ctaLabel && (
              <a
                  href={ctaHref}
                  className="ml-1 rounded-full px-2 py-0.5 text-[11px] text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                  {ctaLabel}
              </a>
          )}
      </span>
        </div>
    );
}