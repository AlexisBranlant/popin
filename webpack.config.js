module.exports = {
  entry: {
    lib: ['./lib/popin.es6.js'],
    demo: './demo/app.js'
  },
  output: {
    path: __dirname,
    filename: '[name]/popin2.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,  exclude: /(node_modules|bower_components)/, loader: 'babel'}
    ]
  }
};