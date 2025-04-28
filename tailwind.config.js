/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#3D365C',
        secondary: '#7C4585',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB' 
        }
      }
    },
  },
  plugins: [],
}