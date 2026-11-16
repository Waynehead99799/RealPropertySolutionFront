import React from "react";

/**
 * Surveyor-style plot layout drawn over a real photograph of land: a road,
 * two rows of numbered plots and corner pegs. Purely illustrative (it carries
 * no real plot sizes or numbers), so it is hidden from assistive tech and
 * pointer events. Only opacity animates, and only when motion is allowed.
 */
const ROWS = [
    { y: 34, h: 108 },
    { y: 178, h: 108 },
];

const Layout = ({
    w,
    h,
    cols,
    banner = false,
}: {
    w: number;
    h: number;
    cols: number;
    banner?: boolean;
}) => {
    const gap = 6;
    const left = 22;
    const cw = (w - left * 2 - gap * (cols - 1)) / cols;
    const roadY = 142;
    const roadH = 36;
    let k = 0;
    return (
        <svg
            aria-hidden
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="xMidYMid slice"
            className={`plotlayout${
                banner ? " plotlayout--banner" : ""
            } pointer-events-none absolute inset-0 h-full w-full`}
        >
            {/* road */}
            <rect
                x={0}
                y={roadY}
                width={w}
                height={roadH}
                fill="rgba(17,18,20,0.5)"
            />
            <line
                x1={0}
                x2={w}
                y1={roadY}
                y2={roadY}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
            />
            <line
                x1={0}
                x2={w}
                y1={roadY + roadH}
                y2={roadY + roadH}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
            />
            <line
                x1={0}
                x2={w}
                y1={roadY + roadH / 2}
                y2={roadY + roadH / 2}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={2}
                strokeDasharray="14 10"
                vectorEffect="non-scaling-stroke"
            />
            {ROWS.map((row, ri) =>
                Array.from({ length: cols }).map((_, ci) => {
                    const i = k++;
                    const x = left + ci * (cw + gap);
                    const hi = ri === 0 && ci === 2;
                    const label = ri === 0 ? ci + 1 : cols * 2 - ci;
                    return (
                        <g
                            key={`${ri}-${ci}`}
                            className="plot"
                            style={{ ["--i" as string]: i }}
                        >
                            <rect
                                x={x}
                                y={row.y}
                                width={cw}
                                height={row.h}
                                fill={
                                    hi
                                        ? "rgba(180,19,30,0.55)"
                                        : "rgba(255,255,255,0.06)"
                                }
                                stroke="rgba(255,255,255,0.92)"
                                strokeWidth={2}
                                strokeDasharray="8 6"
                                vectorEffect="non-scaling-stroke"
                            />
                            {[
                                [x, row.y],
                                [x + cw, row.y],
                                [x, row.y + row.h],
                                [x + cw, row.y + row.h],
                            ].map(([px, py], pi) => (
                                <rect
                                    key={pi}
                                    x={px - 3}
                                    y={py - 3}
                                    width={6}
                                    height={6}
                                    fill="#b4131e"
                                    stroke="#fff"
                                    strokeWidth={1}
                                    vectorEffect="non-scaling-stroke"
                                />
                            ))}
                            <text
                                x={x + cw / 2}
                                y={row.y + row.h / 2 + 9}
                                textAnchor="middle"
                                className="font-display"
                                fontSize={26}
                                fontWeight={800}
                                fill="#fff"
                                style={{
                                    paintOrder: "stroke",
                                    stroke: "rgba(17,18,20,0.55)",
                                    strokeWidth: 3,
                                }}
                            >
                                {label}
                            </text>
                        </g>
                    );
                }),
            )}
        </svg>
    );
};

export const PlotLayout = ({ variant }: { variant: "tile" | "banner" }) =>
    variant === "tile" ? (
        <Layout w={400} h={320} cols={4} />
    ) : (
        <Layout w={1200} h={320} cols={10} banner />
    );
