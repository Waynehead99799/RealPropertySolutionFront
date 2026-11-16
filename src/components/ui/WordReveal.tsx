import React, { useEffect, useRef } from "react";

interface Props {
    text: string;
    className?: string;
    as?: "p" | "h2" | "div";
}

/**
 * Statement text whose words light up as the block scrolls through the
 * viewport. Opacity only, driven by one passive scroll listener while the
 * block is near the screen. Fully visible without JS and under reduced motion.
 */
export const WordReveal = ({ text, className = "", as = "p" }: Props) => {
    const ref = useRef<HTMLElement>(null);
    const words = text.split(" ");
    const Tag = as as React.ElementType;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        const n = spans.length;
        let raf = 0;
        let near = false;

        const paint = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const p = Math.min(
                1,
                Math.max(0, (vh * 0.88 - r.top) / (r.height + vh * 0.25)),
            );
            spans.forEach((s, i) => {
                const k = Math.min(1, Math.max(0, p * (n + 2) - i));
                s.style.opacity = String(0.16 + 0.84 * k);
            });
        };
        const onScroll = () => {
            if (!near || raf) return;
            raf = requestAnimationFrame(paint);
        };
        const io = new IntersectionObserver(
            ([e]) => {
                near = e.isIntersecting;
                if (near) paint();
            },
            { rootMargin: "20% 0px 20% 0px" },
        );
        io.observe(el);
        paint();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <Tag ref={ref} className={className}>
            {words.map((w, i) => (
                <span
                    key={`${w}-${i}`}
                    data-w
                    style={{ transition: "opacity 120ms linear" }}
                >
                    {w}
                    {i < words.length - 1 ? " " : ""}
                </span>
            ))}
        </Tag>
    );
};
