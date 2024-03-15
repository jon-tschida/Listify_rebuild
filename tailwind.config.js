/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm-phone': '250px',
      // => @media (min-width: 640px) { ... }

      'phone': '350px',
      // => @media (min-width: 768px) { ... }

      'tablet': '900px',
      // => @media (min-width: 1024px) { ... }

      'laptop': '1200px',
      // => @media (min-width: 1280px) { ... }

      'monitor': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
        mealsAndListBg: "#A4B494",
        mealsBg: "#564E58"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
