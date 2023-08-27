/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'oat': '#d9dad7',
      'terra': '#c24d2c',
      'alpine': '#3e4a61',
      'midnight': '#1a2639',
      'nero': '#292929',
    },
    extend: {},
  },
  plugins: [],
}

