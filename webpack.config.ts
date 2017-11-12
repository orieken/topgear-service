const path = require('path');
const fs = require('fs');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const config: any = {};

config.entry = './app.ts';
config.target = 'node';

config.externals = fs.readdirSync('node_modules')
    .reduce(function (acc, mod) {
      if (mod === '.bin') {
        return acc
      }

      acc[mod] = 'commonjs ' + mod;
      return acc
    }, {});

config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false,
};

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js',
};

config.resolve = {
  extensions: [
    '.json',
    '.tsx',
    '.ts',
    '.js'
  ],
};

config.plugins = [
  new NyanProgressPlugin()
];

config.module = {};
config.module.rules = [
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  },
  {
    test: /\.ts$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      typeCheck: true
    }
  }
];

module.exports = config;
