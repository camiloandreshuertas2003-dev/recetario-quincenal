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
          50: "#EAF4EE",
          100: "#d2ebd9",
          200: "#a5d7b5",
          500: "#1e8560",
          600: "#176B4D",
          700: "#12543C",
          800: "#0E3E2C",
          900: "#08251A",
        },
        corn: {
          50: "#fef9e8",
          100: "#fdf2c7",
          500: "#E9B949",
          600: "#d39f32",
          700: "#ab7c20",
        },
        terracotta: {
          50: "#fdf3f0",
          100: "#fbe4df",
          500: "#C95D45",
          600: "#af4831",
          700: "#8e3420",
        },
        charcoal: {
          DEFAULT: "#263238",
          800: "#1e272c",
          900: "#151b1f",
        },
        sage: {
          DEFAULT: "#6E7F78",
          100: "#e9edea",
          500: "#6E7F78",
        },
        cream: {
          DEFAULT: "#FFFDF9",
          100: "#FFF8EE",
        },
        warm: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        }
      },
    },
  },
  plugins: [],
};
export default config;
