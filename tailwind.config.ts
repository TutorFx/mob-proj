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
    extend: {},
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