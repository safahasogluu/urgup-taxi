import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color - warm terracotta
        primary: {
          50: "#fef7ed",
          100: "#fdedd3",
          200: "#fbd8a5",
          300: "#f8be6d",
          400: "#f59e33",
          500: "#e07a2f",
          600: "#c65d1a",
          700: "#a34815",
          800: "#853a14",
          900: "#6d3114",
        },
        // Cappadocia palette
        sand: {
          50: "#fdfcfa",
          100: "#faf8f3",
          200: "#f5f1e8",
          300: "#ebe4d6",
          400: "#d4c4a8",
          500: "#c4b08a",
          600: "#a8926a",
          700: "#8b7654",
          800: "#6e5d44",
          900: "#5a4d3a",
        },
        terracotta: {
          50: "#fef6f3",
          100: "#fdeae4",
          200: "#fcd5c9",
          300: "#f9b5a0",
          400: "#f48c6a",
          500: "#eb6b45",
          600: "#d84f2a",
          700: "#b53f20",
          800: "#95361f",
          900: "#7a301f",
        },
        sage: {
          50: "#f6f7f4",
          100: "#e8ebe3",
          200: "#d3d9c9",
          300: "#b5c0a4",
          400: "#97a67e",
          500: "#7a8b60",
          600: "#5f6e4b",
          700: "#4b573d",
          800: "#3e4734",
          900: "#353d2e",
        },
        basalt: {
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#2d2d2d",
        },
        // Legacy warm colors (keep for compatibility)
        warm: {
          sand: "#f5f1e8",
          cream: "#faf8f3",
          sandstone: "#d4c4a8",
          sky: "#e8f4f8",
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(180deg, #faf8f3 0%, #f5f1e8 50%, #ebe4d6 100%)',
        'hero-gradient': 'linear-gradient(180deg, #fdfcfa 0%, #faf8f3 40%, #f5f1e8 100%)',
        'sky-gradient': 'linear-gradient(180deg, #e8f4f8 0%, #d4e8f0 100%)',
        'terracotta-gradient': 'linear-gradient(180deg, #a34815 0%, #853a14 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(139, 118, 84, 0.08), 0 2px 8px -2px rgba(139, 118, 84, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(139, 118, 84, 0.12), 0 4px 12px -2px rgba(139, 118, 84, 0.06)',
        'button': '0 2px 8px -1px rgba(163, 72, 21, 0.3)',
        'button-hover': '0 4px 16px -2px rgba(163, 72, 21, 0.4)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
