module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: "#6E00E9"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
