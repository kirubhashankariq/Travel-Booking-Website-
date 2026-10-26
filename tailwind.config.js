/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF2',
          100: '#FAF6DE',
          200: '#F4EBB8',
          300: '#EEDF8E',
          400: '#E5CE5C',
          500: '#D4AF37', // signature luxury gold
          600: '#B89223',
          700: '#8E6E16',
          800: '#674D10',
          900: '#433109',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
