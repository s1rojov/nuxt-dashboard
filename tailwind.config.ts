import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/components/**/*.{vue,ts,tsx}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
} satisfies Config;
