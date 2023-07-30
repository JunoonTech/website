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
        lighest: "#f6f7fa",
      },
    },
  },
  plugins: [],
};
