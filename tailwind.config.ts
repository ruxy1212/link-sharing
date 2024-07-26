/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dl-purple': '#633bff',
        'dl-mid-purple': '#beadff',
        'dl-light-purple': '#efebff',
        'dl-black-gray': '#333333',
        'dl-dark-gray': '#737373',
        'dl-light-gray': '#d9d9d9',
        'dl-white-gray': '#fafafa',
        'dl-white': '#ffffff',
        'dl-red': '#ff3939',
        'dl-github': '#1A1A1A',
        'dl-frontendmentor': '#FFFFFF',
        'dl-twitter': '#43B7E9',
        'dl-linkedin': '#2D68FF',
        'dl-youtube': '#EE3939',
        'dl-facebook': '#2442AC',
        'dl-twitch': '#EE3FC8',
        'dl-devto': '#333333',
        'dl-codewars': '#8A1A50',
        'dl-codepen': '#1E1F26',
        'dl-freecodecamp': '#302267',
        'dl-gitlab': '#EB4925',
        'dl-hashnode': '#0330D1',
        'dl-stackoverflow': '#EC7100',
      },
      spacing: {},
      fontFamily: {
        instrument: "'Instrument Sans'",
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
}
