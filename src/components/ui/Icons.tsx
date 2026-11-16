import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): React.SVGProps<SVGSVGElement> => ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
});

const make =
    (paths: React.ReactNode) =>
    ({ size, ...rest }: IconProps) =>
        (
            <svg {...base(size)} {...rest}>
                {paths}
            </svg>
        );

export const PhoneIcon = make(
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
);
export const MailIcon = make(
    <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
    </>,
);
export const PinIcon = make(
    <>
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
    </>,
);
export const ArrowIcon = make(<path d="M5 12h14m-6-6 6 6-6 6" />);
export const ArrowUpRightIcon = make(<path d="M7 17 17 7M8 7h9v9" />);
export const ChevronIcon = make(<path d="m9 6 6 6-6 6" />);
export const ChevronLeftIcon = make(<path d="m15 6-6 6 6 6" />);
export const ChevronDownIcon = make(<path d="m6 9 6 6 6-6" />);
export const MenuIcon = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18" />);
export const SearchIcon = make(
    <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </>,
);
export const CheckIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const HeartIcon = make(
    <path d="M12 20.5s-7.5-4.6-9.2-9.6C1.7 7.600 3.800 4.500 7 4.500c2 0 3.500 1 5 3 1.500-2 3-3 5-3 3.200 0 5.300 3.100 4.200 6.400-1.700 5-9.200 9.600-9.200 9.600Z" />,
);
export const ShareIcon = make(
    <>
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="m8.200 10.800 7.600-4.600M8.200 13.200l7.600 4.600" />
    </>,
);
export const AreaIcon = make(
    <>
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </>,
);
export const BedIcon = make(
    <>
        <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
        <circle cx="7" cy="11" r="1.500" />
    </>,
);
export const BathIcon = make(
    <>
        <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 3.500-1.300M7 19l-1 2M17 19l1 2" />
    </>,
);
export const FloorsIcon = make(
    <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 13 9 5 9-5" />
    </>,
);
export const SofaIcon = make(
    <>
        <path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
        <path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4ZM6 18v2M18 18v2" />
    </>,
);
export const BuildingIcon = make(
    <>
        <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M15 9h3a1 1 0 0 1 1 1v11M3 21h18" />
        <path d="M9 7h2M9 11h2M9 15h2" />
    </>,
);
export const HomeIcon = make(
    <>
        <path d="m3 11 9-8 9 8M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
    </>,
);
export const PlotIcon = make(
    <>
        <path d="M3 7.500 12 3l9 4.500v9L12 21l-9-4.500v-9Z" />
        <path d="M12 12v9M3 7.500l9 4.500 9-4.500" />
    </>,
);
export const KeyIcon = make(
    <>
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 9-9M16 7l3 3M14 9l2 2" />
    </>,
);
export const TagIcon = make(
    <>
        <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
        <circle cx="8" cy="8" r="1.200" />
    </>,
);
export const ShieldIcon = make(
    <>
        <path d="M12 3 4 6v6c0 4.500 3.400 8 8 9 4.600-1 8-4.500 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
    </>,
);
export const CompassIcon = make(
    <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.500 8.500-2 5-5 2 2-5 5-2Z" />
    </>,
);
export const ClockIcon = make(
    <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </>,
);
export const ParkingIcon = make(
    <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 17V8h4a3 3 0 0 1 0 6H9" />
    </>,
);

/* Filled brand glyphs */
export const WhatsAppIcon = ({ size = 20, ...rest }: IconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        focusable={false}
        {...rest}
    >
        <path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.05-1.55A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3 .92.95-2.9-.2-.3a8.1 8.1 0 1 1 6.8 3.62Zm4.45-6.06c-.24-.12-1.43-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.1 3.64.58.24 1.02.4 1.38.5.58.18 1.1.16 1.52.1.46-.08 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
);
export const InstagramIcon = ({ size = 20, ...rest }: IconProps) => (
    <svg {...base(size)} {...rest}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
            cx="17.500"
            cy="6.500"
            r="0.900"
            fill="currentColor"
            stroke="none"
        />
    </svg>
);
export const FacebookIcon = ({ size = 20, ...rest }: IconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        focusable={false}
        {...rest}
    >
        <path d="M13.5 21v-7.500h2.600l.4-3h-3V8.600c0-.9.300-1.500 1.500-1.500H16.600V4.400c-.3 0-1.200-.1-2.300-.1-2.300 0-3.800 1.400-3.800 3.900v2.300H8v3h2.500V21h3Z" />
    </svg>
);
