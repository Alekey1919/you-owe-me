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
        accent: "var(--accent)",
        background: "var(--background)",
        "muted-accent": "var(--muted-accent)",
        "muted-background": "var(--muted-background)",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
        touch: { raw: "(pointer: coarse)" },
        mouse: { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [],
};
export default config;
