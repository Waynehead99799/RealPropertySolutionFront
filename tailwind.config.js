/** Real Property Solution design tokens: "hoarding" identity.
 *  Brand crimson is used as large flat fields and on tags/CTAs; everything
 *  else is white, concrete grey and ink. Type: Big Shoulders Display + Hind. */
module.exports = {
    content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    theme: {
        screens: {
            xs: "420px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#ffffff",
            black: "#000000",
            ink: {
                DEFAULT: "#111214",
                800: "#1B1D21",
                700: "#2A2D33",
                600: "#464A52",
            },
            crimson: {
                DEFAULT: "#B4131E",
                dark: "#8C0E17",
                soft: "#F9E4E5",
            },
            navy: {
                DEFAULT: "#22345A",
                dark: "#172440",
            },
            concrete: {
                DEFAULT: "#EDECE9",
                50: "#F7F6F4",
                100: "#EDECE9",
                200: "#DEDCD7",
                300: "#C6C3BC",
                400: "#9B978E",
            },
            slate: {
                400: "#8A8E96",
                500: "#6B7079",
                600: "#4B4F57",
                700: "#34373D",
            },
            whatsapp: { DEFAULT: "#1FA855", dark: "#168A44" },
            success: "#1E7B4F",
            danger: "#C0262F",
        },
        extend: {
            fontFamily: {
                sans: [
                    "Hind",
                    "system-ui",
                    "-apple-system",
                    "Segoe UI",
                    "Roboto",
                    "sans-serif",
                ],
                display: [
                    "'Big Shoulders Display'",
                    "'Arial Narrow'",
                    "Impact",
                    "sans-serif",
                ],
            },
            maxWidth: {
                shell: "1360px",
                prose: "62ch",
            },
            boxShadow: {
                lift: "0 24px 50px -24px rgba(17,18,20,0.45)",
                plate: "0 2px 0 rgba(17,18,20,0.9)",
                soft: "0 1px 2px rgba(17,18,20,0.06), 0 10px 28px -14px rgba(17,18,20,0.18)",
            },
            transitionTimingFunction: {
                out: "cubic-bezier(.22,1,.36,1)",
            },
        },
    },
    plugins: [],
};
