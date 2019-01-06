const path = require('path');
const FileSystem = require('fs');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const config: any = {};

config.entry = './app.ts';
config.target = 'node';

const getModules = (acc, mod) => {
  if (mod === '.bin') {
    return acc;
  }

  acc[mod] = 'commonjs ' + mod;
  return acc;
};

config.externals = FileSystem.readdirSync('node_modules')
                             .reduce(getModules, {});

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
