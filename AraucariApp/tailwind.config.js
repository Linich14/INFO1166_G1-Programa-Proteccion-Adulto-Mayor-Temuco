/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        muni: {
          50: "#0071CE",
        },
        fondo: {
          100: "#F2F2F2",
        },
      },
    },
  },
  plugins: [],
};
