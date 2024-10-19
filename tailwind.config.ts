import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "evento-white": "#fff",
        "evento-black": "#202124",
      },
      borderColor: {
        "evento-border-white": "#d4d4d8",
        "evento-border-black": "#3C3D37",
      },
      backgroundColor: {
        "evento-white": "#fff",
        "evento-black": "#202124",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'evento-shadow': '0 6px 20px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
