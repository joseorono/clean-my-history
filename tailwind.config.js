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
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-main)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-main)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)'
        },
        background: {
          DEFAULT: 'var(--color-background-default)',
          paper: 'var(--color-background-paper)'
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)'
        }
      }
    }
  },
  plugins: []
};
