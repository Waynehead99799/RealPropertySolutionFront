import { useCallback, useEffect, useState } from "react";

/** A saved listing, kept whole so the shortlist works without refetching. */
export interface SavedItem {
    id: string;
    ref: string;
    name: string;
    path: string;
    priceLabel: string;
    priceSuffix: string;
    locality: string;
    dealLabel: string;
    cover: string | null;
}

const KEY = "rps-shortlist-v2";
export const OPEN_EVENT = "rps-open-shortlist";

const read = (): SavedItem[] => {
    try {
        const v = JSON.parse(window.localStorage.getItem(KEY) || "[]");
        return Array.isArray(v) ? v : [];
    } catch {
        return [];
    }
};

const write = (items: SavedItem[]): void => {
    try {
        window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
        /* storage blocked: the in-memory copy still works for this visit */
    }
    window.dispatchEvent(new Event("rps-shortlist"));
};

export const openShortlist = (): void => {
    window.dispatchEvent(new Event(OPEN_EVENT));
};

/** Shortlist shared across the whole site (header count, cards, drawer). */
export const useShortlist = () => {
    const [items, setItems] = useState<SavedItem[]>([]);

    useEffect(() => {
        setItems(read());
        const sync = () => setItems(read());
        window.addEventListener("rps-shortlist", sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener("rps-shortlist", sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    const has = useCallback(
        (id: string) => items.some((i) => i.id === id),
        [items],
    );

    const toggle = useCallback((item: SavedItem) => {
        const cur = read();
        write(
            cur.some((i) => i.id === item.id)
                ? cur.filter((i) => i.id !== item.id)
                : [...cur, item],
        );
    }, []);

    const remove = useCallback((id: string) => {
        write(read().filter((i) => i.id !== id));
    }, []);

    const clear = useCallback(() => write([]), []);

    return { items, has, toggle, remove, clear };
};
