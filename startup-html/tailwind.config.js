/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'notification': 'slideIn 0.5s ease-in-out, slideOut 0.5s 4s ease-in-out forwards',
      },

      keyframes: {
        slideOut: {
          '0%': { left: '0px', opacity: '100' },
          '100%': { left: '-50px', opacity: '0', hidden: true },
        },
        slideIn: {
          '0%': { left: '-50px', opacity: '0' },
          '100%': { left: '0px', opacity: '100' }
        }
      }

    },
  },
  plugins: [],
}

