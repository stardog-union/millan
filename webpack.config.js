const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');

// At _least_ these tokens need to be preserved in order for chevrotain to
// work correctly after minification. See here: https://sap.github.io/chevrotain/docs/FAQ.html#MINIFIED.
// NOTE: new parsers should be added here when they are created.
const reserved = [
  'BaseSparqlParser',
  'W3SpecSparqlParser',
  'StardogSparqlParser',
  'SrsParser',
  'SmsParser',
  'TurtleParser',
  'BaseGraphQlParser',
  'StandardGraphQlParser',
  'StardogGraphQlParser',
  'Parser',
];

const individualEntryData = [
  'graphql',
  'shacl',
  'sms',
  'sparql',
  'srs',
  'turtle',
].reduce(
  (entries, languageId) => ({
    ...entries,
    [languageId]: path.join(SRC_DIR, languageId, 'index.ts'),
  }),
  {}
);

const coreWebpackConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // Use ts-loader only for transpilation; type checking is handled
              // by ForkTsCheckerWebpackPlugin
              transpileOnly: true,
            },
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    modules: [SRC_DIR, 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      watch: SRC_DIR,
    }),
  ],
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          // Chevrotain does not cooperate with webpack mangling (see here: https://sap.github.io/chevrotain/docs/FAQ.html#MINIFIED).
          mangle: {
            reserved,
          },
        },
      }),
    ],
  },
};

const nonBrowserWebpackConfig = {
  ...coreWebpackConfig,
  entry: {
    // full bundle:
    millan: path.join(SRC_DIR, 'index.ts'),
    // individual bundles for importing when desired:
    ...individualEntryData,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: (chunkData) =>
      chunkData.chunk.name === 'millan'
        ? 'millan.js'
        : path.join('standalone', 'millan.[name].js'),
    library: 'millan',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "(typeof self !== 'undefined' ? self : this)", // https://github.com/webpack/webpack/issues/6525
  },
};

const browserWebpackConfig = {
  ...coreWebpackConfig,
  entry: individualEntryData, // main bundle generated by non-browser build is aleady setup for browser since it's UMD -- no need to generate twice
  output: {
    path: path.join(__dirname, 'dist', 'browser'), // output everything to `browser` directory
    filename: (chunkData) =>
      chunkData.chunk.name === 'millan' ? 'millan.js' : 'millan.[name].js',
    chunkFilename: 'millan.[name].js',
    // Array `library` ensures that separate bundles are propertly namespaced; see example: https://github.com/webpack/webpack/tree/master/examples/multi-part-library
    library: ['millan', '[name]'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "(typeof self !== 'undefined' ? self : this)", // https://github.com/webpack/webpack/issues/6525
  },
  optimization: {
    ...coreWebpackConfig.optimization,
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = [nonBrowserWebpackConfig, browserWebpackConfig];
