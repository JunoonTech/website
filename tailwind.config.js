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
