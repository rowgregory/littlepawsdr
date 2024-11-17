/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'Matter-Light': ['Matter-Light'],
      'Matter-Regular': ['Matter-Regular'],
      'Matter-SemiBold': ['Matter-SemiBold'],
      'Matter-Medium': ['Matter-Medium'],
      'Matter-Bold': ['Matter-Bold'],
      Rust: ['Rust'],
      'Museo-Slab-1000': ['Museo-Slab-1000'],
      'Museo-Slab-700': ['Museo-Slab-700'],
      Montserrat: [`Montserrat, sans-serif`],
      QBold: ['Quicksand_Bold'],
      QLight: ['Quicksand_Light'],
      QBook: ['Quicksand_Book'],
    },
    extend: {
      screens: {
        xs: '480px',
      },
      boxShadow: {
        'right-side': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        charcoal: '#454647',
      },
      fontSize: {
        17: '1.0625rem',
      },
      backgroundImage: {
        'g-indigo': 'linear-gradient(263deg, rgba(79, 70, 229, 1) 18%, rgba(70, 229, 92, 1) 100%)',
        'g-lime': 'linear-gradient(263deg, rgba(163, 230, 53, 1) 18%, rgba(53, 229, 229, 1) 100%)',
        'g-cyan': 'linear-gradient(263deg, rgba(3, 182, 212, 1) 18%, rgba(77, 3, 212, 1) 100%)',
        'g-blue': 'linear-gradient(263deg, rgba(29, 78, 216, 1) 18%, rgba(216, 1, 198, 1) 100%)',
        'g-teal': 'linear-gradient(263deg, rgba(79, 173, 202, 1) 18%, rgba(202, 79, 79, 1) 100%)',
        'g-green': 'linear-gradient(263deg, rgba(21, 163, 74, 1) 18%, rgba(163, 21, 105, 1) 100%)',
        'g-yellow':
          'linear-gradient(263deg, rgba(250, 204, 20, 1) 18%, rgba(179, 20, 212, 1) 100%)',
        'g-orange':
          'linear-gradient(263deg, rgba(249, 115, 21, 1) 18%, rgba(249, 21, 108, 1) 100%)',
        'g-red': 'linear-gradient(263deg, rgba(220, 39, 38, 1) 18%, rgba(38, 165, 220, 1) 100%)',
        'g-pink': 'linear-gradient(263deg, rgba(219, 39, 119, 1) 18%, rgba(39, 219, 39, 1) 100%)',
        'g-purple':
          'linear-gradient(263deg, rgba(147, 51, 234, 1) 18%, rgba(51, 147, 234, 1) 100%)',
        'g-slate':
          'linear-gradient(263deg, rgba(148, 163, 184, 1) 18%, rgba(148, 184, 148, 1) 100%)',
        'g-gray': 'linear-gradient(263deg, rgba(75, 86, 99, 1) 18%, rgba(75, 78, 99, 1) 100%)',
        'g-zinc': 'linear-gradient(263deg, rgba(24, 24, 27, 1) 18%, rgba(103, 151, 196, 1) 100%)',
        'blue-to-purple': `linear-gradient(263deg, rgba(157,253,255,1) 18%, rgba(233,198,253,1) 100%)`,
        'orange-to-red': `linear-gradient(129deg, rgba(167, 216, 47, 1) 66%, rgba(237, 216, 48, 1) 100%)`,
        'yellow-to-green': `linear-gradient(229deg, rgba(116, 209, 69, 1) 66%, rgba(163, 216, 47, 1) 100%)`,
        'green-to-yellow': `linear-gradient(86deg, rgba(183, 217, 43, 1) 66%, rgba(183, 214, 49, 1) 100%)`,
        'g-receipt': `linear-gradient(to bottom, #22c2b7 0%,#22c2b7 30%, #fff 30%, #fff 100%)`,
        'select-input-arrow': `url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
      },
      animation: {
        fadeIn: 'fadeIn 500ms ease-in-out',
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  safelist: [
    'text-2xl',
    'text-3xl',
    'text-sm',
    'hover:text-pink-700',
    'hover:bg-pink-700',
    'hover:bg-blue-700',
    {
      pattern:
        /(text|bg|border)-(red|orange|yellow|green|lime|blue|cyan|teal|purple|indigo|gray|zinc|slate)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
  ],
  plugins: [],
};
