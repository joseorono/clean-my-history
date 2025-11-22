/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./*.tsx",
    "./components/**/*.{tsx,ts}",
    "./views/**/*.{tsx,ts}",
    "./static/**/*.html"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
