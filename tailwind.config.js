/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "rgb(139 69 19)", // Coffee brown
        secondary: "rgb(245 222 179)", // Wheat/cream
        accent: "rgb(205 127 50)", // Bronze
        dark: "rgb(54 30 15)", // Dark chocolate
      },
      fontSize: {
        xsm: "clamp(0.6rem, 0.09vi + 0.56rem, 0.69rem)",
        sm: "clamp(0.8rem, 0.17vi + 0.76rem, 0.89rem)",
        base: "clamp(1rem, 0.34vi + 0.91rem, 1.19rem)",
        lg: "clamp(1.25rem, 0.61vi + 1.1rem, 1.58rem)",
        xl: "clamp(1.56rem, 1vi + 1.31rem, 2.11rem)",
        "2xl": "clamp(1.95rem, 1.56vi + 1.56rem, 2.81rem)",
        "3xl": "clamp(2.44rem, 2.38vi + 1.85rem, 3.75rem)",
      },
      lineHeight: {
        sm: "clamp(1rem, 0.17vi + 0.76rem + 0.3rem, 1.1rem)",
        base: "clamp(1.4rem, 0.34vi + 0.91rem + 0.4rem, 1.55rem)",
        lg: "clamp(1.7rem, 0.61vi + 1.1rem + 0.45rem, 1.85rem)",
        xl: "clamp(1.85rem, 1vi + 1.31rem + 0.3rem, 2.2rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
