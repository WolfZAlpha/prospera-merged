/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // Assuming your components are in a src directory
    theme: {
      extend: {
        colors: {
          'pros-green': '#01ff02',
        },
        fontFamily: {
          'orbitron': ['PlusJakartaSans', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  