var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/react-drop.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-drop.js',
    sourceMapFilename: 'react-drop.sourcemap.js',
    library: 'Drop',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)/, loader: 'babel?stage=0'}
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react/lib/shallowCompare': 'shallowCompare'
  },
};

if(TARGET === 'minify') {
  config.output.filename = 'react-drop.min.js';
  config.output.sourceMapFilename = 'react-drop.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'ReactDOM', 'Drop']
    }
  }));
}

module.exports = config;