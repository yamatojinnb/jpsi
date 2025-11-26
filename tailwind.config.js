/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "waseda-crimson": "#8B0C19",
        "waseda-gold": "#FFD700",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
      },
      transitionDelay: {
        0: "0ms",
        200: "200ms",
        400: "400ms",
      },
    },
  },
  plugins: [],
};
