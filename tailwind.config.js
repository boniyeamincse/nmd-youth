/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ndm: {
          green: "#0D6938",
          "green-dark": "#084a27",
          "green-light": "#158548",
          red: "#E5242B",
          "red-dark": "#b9151c",
          "red-light": "#f87171",
          gold: "#D97706",
          dark: "#0F172A",
          surface: "#F8FAFC",
        },
      },
      fontFamily: {
        bangla: ["'Hind Siliguri'", "system-ui", "sans-serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
