/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ['light']
  },
  colorMode: {
    preference: 'light', // default theme
    dataValue: 'theme' // activate data-theme in <html> tag
  },
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        nuxa: {
          DEFAULT: '#F42272',
          50: '#FDD1E2',
          100: '#FCBDD5',
          200: '#FA97BC',
          300: '#F870A4',
          400: '#F6498B',
          500: '#F42272',
          600: '#D30B57',
          700: '#9E0841',
          800: '#68052B',
          900: '#330315',
          950: '#18010A'
        }
      },
      keyframes: {
        'skeleton-loading': {
          '0%': { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        skeleton: 'skeleton-loading 2.0s ease-in-out infinite'
      },
      backgroundImage: (theme: any) => ({
        'skeleton-gradient': `linear-gradient(45deg, ${theme('colors.base-100')}, ${theme('colors.base-200')}, ${theme('colors.base-300')}, ${theme('colors.base-200')}, ${theme('colors.base-100')})`
      }),
      backgroundSize: {
        400: '400% 100%'
      }
    },
    boxShadow: {
      '3xl': '0 20px 60px 0px rgba(0, 0, 0, 0.3)'
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ]
}
