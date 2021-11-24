const { screens } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      blue: colors.sky,
      gray: colors.blueGray,
      orange: colors.orange,
      pink: colors.pink,
    },
    screens: {
      'xs': '500px',
      ...screens,
    },
    extend: {
      minHeight: {
        'tap': '48px',
      },
      minWidth: {
        'tap': '48px',
      },
      padding: {
        // for layout on mobile
        // when a large font is used on root, 1rem becomes too big for padding
        '8px': '8px',
        '16px': '16px',
        '32px': '32px',
      },
      gridTemplateColumns: {
        'stats': 'repeat(2, max-content)',
      },
    },
  },
  variants: {},
  plugins: [],
}