/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#ffffff',
        'bg-dark': '#0f172a',
        'surface-light': '#f9fafb',
        'surface-dark': '#1e293b',
        'border-light': 'rgba(0, 0, 0, 0.1)',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
        'text-light': '#1f2937',
        'text-dark': '#f3f4f6',
      },
    },
  },
  plugins: [],
}