/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'green-rgba': 'rgba(29,201,183,0.08)',
        'gray-rgba': 'rgba(114,114,114,0.12)'
      },
    },
  },
  plugins: [],
}