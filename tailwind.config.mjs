/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        heading: 'var(--font-heading)',
      },
    },
  },
  plugins: {
    // Example: enable official Tailwind plugins if needed
    // forms: require("@tailwindcss/forms"),
    // typography: require("@tailwindcss/typography"),
  },
};

export default config;
