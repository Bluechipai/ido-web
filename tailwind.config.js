/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {

      },
      backgroundSize: {

      },
      backgroundPosition: {

      },
      backgroundColor: {
        button: 'rgba(0, 0, 0, 0.20)'
      },
      boxShadow: {

      },
      fontSize: {},
      colors: {
        baseColor: '#fff'
      },
      width: {
        'content-width': '1200px',
      },
      borderRadius: {
        box: '8px',
      },
      zIndex: {
        modal: 500,
      },
    },
    screens: {
      '2xl': {max: '1535px'},
      // => @media (max-width: 1535px) { ... }

      xl: {max: '1279px'},
      // => @media (max-width: 1279px) { ... }

      lg: {max: '1023px'},
      // => @media (max-width: 1023px) { ... }

      md: {max: '767px'},
      // => @media (max-width: 767px) { ... }

      sm: {max: '639px'},
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [
    function ({addVariant}) {
      addVariant('child', '& > *')
      addVariant('child-svg', '& > svg')
      addVariant('child-svg-path', '& > svg > path')
      addVariant('child-hover', '& > *:hover')
      addVariant('child-n-l', '& > :not(:last-child)')
    },
  ],
}
