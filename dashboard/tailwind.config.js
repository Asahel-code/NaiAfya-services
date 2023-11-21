/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary_color: "#8E7CFB",
        primary_color_faded: "#A79AF5",
        secondary_color: "#161433",
        primary_red: "#F86969",
        primary_color_light: "#CDD7DE",
        primary_green: "#29FF7B",
      }
    },
  },
  plugins: [],
}

