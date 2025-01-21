import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(168, 124, 124)", // lightest shade for primary actions
          muted: "rgb(126, 99, 99)", // muted version for secondary elements
        },
        secondary: {
          DEFAULT: "rgb(80, 60, 60)", // darker shade for contrast
          deep: "rgb(62, 50, 50)", // deepest shade for backgrounds
        },
        accent: {
          light: "rgb(180, 140, 140)", // slightly lighter than primary for highlights
          dark: "rgb(100, 80, 80)", // balanced middle tone
        },
      },
      backgroundImage: {
        "gradient-main":
          "linear-gradient(to right, rgb(62, 50, 50), rgb(80, 60, 60))",
        "gradient-accent":
          "linear-gradient(to right, rgb(126, 99, 99), rgb(168, 124, 124))",
        "gradient-diagonal":
          "linear-gradient(to bottom right, rgb(62, 50, 50), rgb(168, 124, 124))",
      },
    },
  },
  plugins: [],
} satisfies Config;
