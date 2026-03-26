/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cinema-950': '#0b0b10',
        'cinema-900': '#12121a',
        'cinema-800': '#1f1f2a',
        'cinema-700': '#343446',
        'cinema-muted': '#a1a1aa',
        'cinema-accent': '#f97316',
      },
      fontFamily: {
        display: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
