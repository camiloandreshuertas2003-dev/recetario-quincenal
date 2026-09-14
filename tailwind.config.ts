import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E8F7EE",
          100: "#C7EED4",
          200: "#98E0AF",
          500: "#0B9F52",
          600: "#0B9F52",
          700: "#126B3A",
          800: "#0d522c",
          900: "#08371d",
        },
        surface: "#F7F9F8",
        cream: {
          DEFAULT: "#FFF9ED",
          100: "#FFF4DD",
        },
        corn: {
          50: "#FFFDF0",
          100: "#FFF4CC",
          500: "#E9B949",
          600: "#B27B00",
        },
        meal: {
          breakfastBg: "#FFF4CC",
          breakfastText: "#8F6100",
          lunchBg: "#E8F7EE",
          lunchText: "#126B3A",
          dinnerBg: "#FFECE8",
          dinnerText: "#D9381E",
          infoBg: "#EEF5FF",
          infoText: "#1D61D2",
        },
        terracotta: {
          50: "#FFECE8",
          100: "#FCD6CF",
          500: "#D9381E",
          600: "#B92D16",
        },
        charcoal: {
          DEFAULT: "#1F2937",
          800: "#111827",
          900: "#030712",
        }
      },
    },
  },
  plugins: [],
};
export default config;
