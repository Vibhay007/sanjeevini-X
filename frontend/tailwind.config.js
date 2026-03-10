/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#0ea5e9",   /* sky-500 - accent for text, borders, focus */
        "primary-dark": "#0284c7", /* sky-600 */
        "accent": "#14b8a6",   /* teal-500 */
        "dark-bg": "#0c0c0f",
        "dark-surface": "#16161a",
        "dark-card": "#1c1c22",
        "dark-border": "#2a2a32",
        "dark-muted": "#71717a",
        "dark-text": "#fafafa",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #0284c7, #14b8a6)",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
