/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EF",
        paper: "#F5F0E6",
        ink: "#1B1815",
        "ink-soft": "#4A443C",
        hairline: "#E4DDD0",
        accent: {
          DEFAULT: "#AE4B2D",
          soft: "#C8724F",
          dark: "#8A3A22",
        },
        dark: {
          bg: "#15130F",
          surface: "#1D1A15",
          ink: "#EDE7DB",
          hairline: "#332E26",
          accent: "#D9714B",
        },
        sepia: {
          bg: "#F1E7D0",
          ink: "#3A2E1E",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "42rem",
        editorial: "72rem",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        toastIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease forwards",
        toastIn: "toastIn 0.25s ease forwards",
      },
    },
  },
  plugins: [],
};
