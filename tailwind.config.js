/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#b226e3',
        second: '#a5f3fc',
        third: '#16405b',
        fifth: '#ecfeff',
      },
    },
    fontFamily: {
      kaushan: '"Kaushan Script", cursive',
    },
  },
};
