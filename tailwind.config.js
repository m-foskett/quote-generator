/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Color Palette
      colors: {
        primary: {...colors.teal, DEFAULT: colors.sky[600]},
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      'animation': {
        'gradient-x':'gradient-x 6s ease infinite',
        'gradient-y':'gradient-y 6s ease infinite',
        'gradient-xy':'gradient-xy 6s ease infinite',
      },
      'keyframes': {
        'gradient-y': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'center top'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
              'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [
    // Neon Box Shadows
    plugin(({theme, addUtilities}) => {
      const neonUtilities = {};
      const colors = theme('colors');
      // Loop through all colors
      for (const color in colors) {
        // Check if the color is an object or single string
        if (typeof colors[color] === 'object'){
          const color1 = colors[color]['100'];
          const color2 = colors[color]['700'];
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`
          };
        };
      };
      // Add the neon utilities to Tailwind
      addUtilities(neonUtilities);
    })
  ],
}
