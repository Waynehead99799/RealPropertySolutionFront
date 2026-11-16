import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Scroll-in animation for anything marked data-fx="up | left | zoom".
 * One IntersectionObserver for the whole page: it adds `is-in` the first time
 * an element comes into view (never replays). Content stays visible without
 * JS, and with reduced motion the CSS only fades.
 */
export const useScrollFx = () => {
    const { asPath } = useRouter();
    useEffect(() => {
        const nodes = () =>
            Array.from(
                document.querySelectorAll<HTMLElement>("[data-fx]:not(.is-in)"),
            );
        if (typeof IntersectionObserver === "undefined") {
            nodes().forEach((el) => el.classList.add("is-in"));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-in");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
        );
        const seen = new WeakSet<Element>();
        const scan = () =>
            nodes().forEach((el) => {
                if (seen.has(el)) return;
                seen.add(el);
                io.observe(el);
            });
        scan();
        const mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => {
            io.disconnect();
            mo.disconnect();
        };
    }, [asPath]);
};
