const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');

// At _least_ these tokens need to be preserved in order for chevrotain to
// work correctly after minification. See here: https://sap.github.io/chevrotain/docs/FAQ.html#MINIFIED.
// The ones that are commented out may be needed at some point, so may as
// well leave them there for people who look here in the future.
const reserved = [
  'BaseSparqlParser',
  'W3SpecSparqlParser',
  'StardogSparqlParser',
  'SrsParser',
  'SmsParser',
  'TurtleParser',
  'Parser',
  // 'srsTokenTypes',
  // 'srsTokenMap',
  // 'multiModeLexerDefinition',
  // 'turtleTokenTypes',
  // 'turtleTokenMap',
  // 'smsTokenTypes',
  // 'smsTokenMap',
  // 'sparqlTokenTypes',
  // 'pathTokens',
  // 'baseTokens',
  // 'sparqlTokenMap',
  // 'terminals',
  // 'keywords',
  // 'sparqlKeywords',
  // 'sparqlTerminals',
];

module.exports = {
  mode: 'production',
  entry: path.join(SRC_DIR, 'index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'millan.js',
    library: 'millan',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this", // https://github.com/webpack/webpack/issues/6525
  },
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
