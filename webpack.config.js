const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  target: 'web',
  context: __dirname,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'index.min.js',
  },
};