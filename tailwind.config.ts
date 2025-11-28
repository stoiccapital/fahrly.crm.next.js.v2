import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: "rgb(100 116 139)", // slate-500
          foreground: "rgb(100 116 139)", // slate-500
        },
      },
    },
  },
  plugins: [],
};

export default config;
