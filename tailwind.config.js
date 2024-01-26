/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    // screens:{
    //   'xs': '426px',
    //   // => @media (min-width: 425px) { ... }
    //   'sm': '769px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '1025px',
    //   // => @media (min-width: 768px) { ... }

    // },  
    extend: {
      boxShadow: {
        'Sred': '5px 5px 10px 5px transparent',
      }
    },
  },
  plugins: [],
}
