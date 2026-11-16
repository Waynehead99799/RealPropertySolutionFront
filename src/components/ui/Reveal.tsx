import React, { useEffect, useRef, useState } from "react";

/** Fires once when the element reaches ~20% visibility, then disconnects. */
export const useInView = <T extends HTMLElement>(threshold = 0.2) => {
    const ref = useRef<T>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || seen) return;
        if (typeof IntersectionObserver === "undefined") {
            setSeen(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { threshold, rootMargin: "0px 0px -6% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [seen, threshold]);

    return [ref, seen] as const;
};

interface RevealProps {
    children: React.ReactNode;
    /** Stagger step (each = 70ms). */
    delay?: number;
    className?: string;
    as?: "div" | "li" | "section" | "article";
}

/** Fade-up on entering the viewport. Once only. No replay on scroll back. */
export const Reveal = ({
    children,
    delay = 0,
    className = "",
    as = "div",
}: RevealProps) => {
    const [ref, seen] = useInView<HTMLElement>();
    const Tag = as as React.ElementType;
    return (
        <Tag
            ref={ref}
            className={`reveal ${seen ? "is-in" : ""} ${className}`}
            style={{ ["--d" as string]: delay }}
        >
            {children}
        </Tag>
    );
};

interface CountUpProps {
    to: number;
    /** ms */
    duration?: number;
    suffix?: string;
    className?: string;
}

/** Counts once (1.5s ease-out), Indian digit grouping, lands on the true figure. */
export const CountUp = ({
    to,
    duration = 1500,
    suffix = "",
    className,
}: CountUpProps) => {
    const [ref, seen] = useInView<HTMLSpanElement>(0.4);
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!seen) return;
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || to <= 1) {
            setVal(to);
            return;
        }
        let raf = 0;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [seen, to, duration]);

    return (
        <span ref={ref} className={`tnum ${className || ""}`}>
            {new Intl.NumberFormat("en-IN").format(seen ? val : to)}
            {suffix}
        </span>
    );
};
