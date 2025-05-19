/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00ffff',
        neonPink: '#ff00ff',
        neonGreen: '#39ff14',
        backgroundDark: '#0a0a0a',
      },
      fontFamily: {
        futuristic: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
