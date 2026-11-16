import React from "react";
import { CategoryKey } from "src/config/site";

/**
 * Architectural line drawings (elevations and a plot plan). Vector, so they
 * stay razor sharp at any size, and they stand in where a listing has no
 * photograph yet instead of a stock image. Colour follows currentColor; the
 * crimson accent is the door / dimension mark.
 */

const base = {
    viewBox: "0 0 400 300",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    "aria-hidden": true,
    focusable: false,
};

export const TowerArt = ({ className = "" }: { className?: string }) => (
    <svg {...base} className={className}>
        <path d="M16 270H384" />
        <rect x="128" y="44" width="144" height="226" />
        <rect x="84" y="128" width="44" height="142" />
        <rect x="272" y="158" width="52" height="112" />
        <path d="M200 22v22M186 22h28" />
        {[72, 96, 120, 144, 168, 192, 216, 240].map((y) => (
            <path key={y} d={`M128 ${y}H272`} opacity=".55" />
        ))}
        {[164, 200, 236].map((x) => (
            <path key={x} d={`M${x} 44V270`} opacity=".55" />
        ))}
        {[148, 176, 204, 232].map((y) => (
            <path key={y} d={`M84 ${y}h44M272 ${y + 10}h52`} opacity=".55" />
        ))}
        <rect
            x="188"
            y="232"
            width="24"
            height="38"
            fill="#B4131E"
            stroke="#B4131E"
        />
    </svg>
);

export const WarehouseArt = ({ className = "" }: { className?: string }) => (
    <svg {...base} className={className}>
        <path d="M16 270H384" />
        <path d="M44 270V138L200 72L356 138V270" />
        <path d="M44 138H356" opacity=".55" />
        <rect x="140" y="170" width="120" height="100" />
        {[184, 198, 212, 226, 240, 254].map((y) => (
            <path key={y} d={`M140 ${y}H260`} opacity=".55" />
        ))}
        <rect x="62" y="196" width="46" height="74" />
        <rect x="292" y="196" width="46" height="74" />
        <path d="M200 72V54M188 54h24" />
        <rect
            x="140"
            y="164"
            width="120"
            height="6"
            fill="#B4131E"
            stroke="#B4131E"
        />
    </svg>
);

export const ApartmentArt = ({ className = "" }: { className?: string }) => (
    <svg {...base} className={className}>
        <path d="M16 270H384" />
        <rect x="104" y="60" width="104" height="210" />
        <rect x="208" y="104" width="88" height="166" />
        {[96, 132, 168, 204, 240].map((y) => (
            <g key={y}>
                <path d={`M96 ${y}h112`} />
                <path d={`M208 ${y + 8}h96`} opacity={y > 230 ? 0 : 1} />
            </g>
        ))}
        {[128, 156, 184].map((x) => (
            <path key={x} d={`M${x} 60V270`} opacity=".45" />
        ))}
        {[236, 264].map((x) => (
            <path key={x} d={`M${x} 104V270`} opacity=".45" />
        ))}
        <rect
            x="140"
            y="236"
            width="22"
            height="34"
            fill="#B4131E"
            stroke="#B4131E"
        />
    </svg>
);

export const PlotArt = ({ className = "" }: { className?: string }) => (
    <svg {...base} className={className}>
        <path d="M70 70L330 58L344 232L56 244Z" />
        <path
            d="M70 70L330 58M56 244L344 232"
            strokeDasharray="0"
            opacity="0"
        />
        <path d="M200 64V238" strokeDasharray="6 8" opacity=".55" />
        <path d="M63 157H337" strokeDasharray="6 8" opacity=".55" />
        {/* dimension lines */}
        <path d="M70 40H330M70 34v12M330 34v12" stroke="#B4131E" />
        <path d="M368 58V232M362 58h12M362 232h12" stroke="#B4131E" />
        {/* north arrow */}
        <path d="M34 120l10-28 10 28-10-8z" fill="currentColor" />
        <path d="M44 128v28" opacity=".55" />
        <rect
            x="150"
            y="100"
            width="100"
            height="58"
            opacity=".55"
            strokeDasharray="4 6"
        />
    </svg>
);

export const ArtFor = ({
    category,
    className = "",
}: {
    category: CategoryKey;
    className?: string;
}) => {
    switch (category) {
        case "warehouse":
            return <WarehouseArt className={className} />;
        case "residential":
            return <ApartmentArt className={className} />;
        case "land":
            return <PlotArt className={className} />;
        default:
            return <TowerArt className={className} />;
    }
};
