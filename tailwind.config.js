/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    colors: {
      chambray: "#79A3C3",
      espresso: "#3A2119",  // dark brown
      glacier: "#D2E2EC",
      bisque: "#EBCDB7",
      clay: "#957662",
      navbar: "#3A2119",    // same as espresso
      heroBox: "#EBCDB7",   // light box color
    },
  },
},
plugins: [],
}

