/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
      },
      boxShadow: {
        '3xl-personalized': '0px 0px 24px rgba(0, 0, 0, 0.16)',
        defaultShadow: '0px 0px 4px rgba(13, 16, 35, 0.32)',
      },
      colors: {
        grey: '#E5E5E5',
        darkGrey: '#8A8A8A',
        blue: '#003366',
        darkBlue: '#003346',
        purple: '#5D5DBF',
        white10: '#FDFDFD',
        white50: '#F1F1F1',
        lightBlack: '#515656',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
