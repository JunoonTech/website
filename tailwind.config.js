/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito"],
        eslLegend: ["ESL Legend"],
      },
      colors: {
        dark: "#282828",
        darker: "#1b1b1b",
        darkest: "#161616",
        "neon-green": "#9ccd7e",
        light: "#808080",
        lightest: "#f6f7fa",
      },
      dropShadow: {
        "3xl": ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.8)"],
      },
      animation: {
        "fade-in-down": "fade-in-down 1s ease-out infinite",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: 0,
          },
          "30%": {
            opacity: 1,
          },
          "60%": {
            opacity: 1,
          },
          "100%": {
            top: "90%",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
