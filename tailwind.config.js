const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        display:["Lobster", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

