/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        xxs: "0.5rem",
      },
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
      colors: {
        pri: {
          light: "#EAEAE9",
          DEFAULT: "#EAEAE9",
          dark: "#2D2D2D",
        },
        sec: {
          light: "#F8F8F8",
          DEFAULT: "#F8F8F8",
          dark: "#A3A3A3",
        },
        fontPri: {
          light: "#605959",
          DEFAULT: "#605959",
          dark: "#F7F7F7",
        },

        orange: "#BD7146",
        logoGray: "#909090",
      },
      fontFamily: {
        pri: ["pri"],
        sec: ["sec"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
