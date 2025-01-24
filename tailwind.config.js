/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2abbe8',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  themes: ["light", "dark", "cupcake"],
}

