import React from "react";

interface MarqueeProps {
    items: string[];
    className?: string;
    /** Tailwind classes for each word. */
    itemClassName?: string;
    /** Separator colour class. */
    dotClassName?: string;
    label?: string;
}

/** Endless ribbon. Two identical halves; the track slides exactly -50%. */
export const Marquee = ({
    items,
    className = "",
    itemClassName = "",
    dotClassName = "bg-current",
    label,
}: MarqueeProps) => {
    const half = (
        <ul className="flex min-w-[50%] shrink-0 items-center justify-around">
            {items.map((t, i) => (
                <li key={`${t}-${i}`} className="flex items-center">
                    <span className={itemClassName}>{t}</span>
                    <span
                        aria-hidden
                        className={`mx-6 inline-block h-2.5 w-2.5 sm:mx-10 ${dotClassName}`}
                    />
                </li>
            ))}
        </ul>
    );
    return (
        <div
            className={`marquee ${className}`}
            role="marquee"
            aria-label={label || items.join(", ")}
        >
            <div className="marquee-track" aria-hidden>
                {half}
                {half}
            </div>
        </div>
    );
};
