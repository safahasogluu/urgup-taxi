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
        primary: {
          50: "#fef7ed",
          100: "#fdedd3",
          200: "#fbd8a5",
          300: "#f8be6d",
          400: "#f59e33",
          500: "#f2850e",
          600: "#e36a09",
          700: "#bc4f0a",
          800: "#963f10",
          900: "#783510",
        },
        warm: {
          sand: "#f5f1e8",
          cream: "#faf8f3",
          sandstone: "#d4c4a8",
          sky: "#e8f4f8",
        },
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(to bottom, #faf8f3 0%, #f5f1e8 100%)',
        'sky-gradient': 'linear-gradient(to bottom, #e8f4f8 0%, #d4e8f0 100%)',
      },
    },
  },
  plugins: [],
};
export default config;

