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
      'oat': '#ffffff',
      'terra': '#1a6533',
      'alpine': '#4b7c69',
      'midnight': '#152315',
      'asphalt': '#000000',
      'nero': '#152315',
      // 'oat': '#d9dad7',
      // 'terra': '#c24d2c',
      // 'alpine': '#3e4a61',
      // 'midnight': '#1a2639',
      // 'nero': '#292929',
    },
    extend: {},
  },
  plugins: [],
}

