/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('../src/images/background.png')",
      },
    },
  },
  variants: {},
  plugins: [],
}

