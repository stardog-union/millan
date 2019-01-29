const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');

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
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
    }),
  ],
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          // Chevrotain does not cooperate with webpack mangling. We could
          // eventually do better than this by using the `reserved` property of
          // `mangle`, but because not all of our tokens' `tokenName`
          // properties match our variable names, we can't quite do it in the
          // recommended way (see here: https://sap.github.io/chevrotain/docs/FAQ.html#MINIFIED).
          // For now, this is good enough.
          mangle: false,
        },
      }),
    ],
  },
};
