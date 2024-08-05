/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../backend/**/templates/**/**/**/*.html",
    "../backend/**/templates/admin/forms/**/*.html",

    "./src/index.js",
    "./src/react/**/*.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

