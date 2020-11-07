
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
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