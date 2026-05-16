/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ulme: {
          50:  "#f3f7f0",
          100: "#e3ecda",
          200: "#c8dab7",
          300: "#a4c089",
          400: "#7ea35e",
          500: "#5f8741",
          600: "#496b31",
          700: "#3a5429",
          800: "#304423",
          900: "#293a1f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "serif"],
      },
      maxWidth: { prose: "70ch" },
    },
  },
  plugins: [],
};
