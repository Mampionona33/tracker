 const { merge } = require('webpack-merge');

 const common = require('./webpack.common.js');


 module.exports = merge(common, {

   mode: 'development',

   devtool: 'inline-source-map',

   devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8000,
  },

 });