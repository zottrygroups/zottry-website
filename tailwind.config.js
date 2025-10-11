/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2C46A6",
          red: "#EF1D52",
          light: "#F5F6FA",
          dark: "#1A1A1A",
          gray: "#E3E6ED"
        }
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        'brand-card': "0 18px 30px -20px rgba(44, 70, 166, 0.45)"
      }
    }
  },
  plugins: []
};
