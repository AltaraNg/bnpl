/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                primary: "#074A74",
                sky: colors.sky,
                teal: colors.teal,
            },
            width: {
                0.3: "30%",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
