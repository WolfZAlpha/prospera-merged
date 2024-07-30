module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Ignore the color-adjust deprecation warning
      ignoreWarnings: [{ rule: 'color-adjust' }],
    },
    'postcss-replace': {
      pattern: /color-adjust/g,
      data: { replace: 'print-color-adjust' }
    },
  },
}