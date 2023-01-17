/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#074A74",
      },
      width: {
        0.3: "30%",
      },
    },
  },
  plugins: [],
};
