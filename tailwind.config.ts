/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["light"],
  },
  colorMode: {
    preference: 'light', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
  },
  content: [],
  theme: {
    extend: {
      keyframes: {
        'skeleton-loading': {
          '0%': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        skeleton: 'skeleton-loading 2.0s ease-in-out infinite',
      },
      backgroundImage: (theme: any) => ({
        'skeleton-gradient': `linear-gradient(45deg, ${theme('colors.base-100')}, ${theme('colors.base-200')}, ${theme('colors.base-300')}, ${theme('colors.base-200')}, ${theme('colors.base-100')})`,
      }),
      backgroundSize: {
        '400': '400% 100%',
      },
    },
    boxShadow: {
      '3xl': '0 20px 60px 0px rgba(0, 0, 0, 0.3)',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}