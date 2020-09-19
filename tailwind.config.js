module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html'
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'search-plus': "url('../icons/search-plus.svg')",
        'search-plus-gradient': "url('../icons/search-plus-gradient.svg')"
      }),
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  variants: {},
  plugins: []
}
