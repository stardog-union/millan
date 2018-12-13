const path = require('path');
const rollup = require('rollup');
const chalk = require('chalk');
const del = require('del');
const chevrotain = require('chevrotain');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

const repoRoot = path.resolve(__dirname, '..', '..');
const pkg = require(`${repoRoot}/package.json`);

const name = 'millan';
const commonPlugins = [
  resolve(),
  commonjs({
    namedExports: {
      // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
      'node_modules/chevrotain/lib/src/api.js': [
        'Parser',
        'Lexer',
        'createToken',
      ],
    },
  }),
  typescript({
    typescript: require('typescript'), // use local typescript
  }),
];
const inputOptions = {
  input: `${repoRoot}/src/index.ts`,
  // NOTE: chevrotain has circular dependencies that prevent it from being
  // bundled with rollup, so consumers of `millan` will need to ensure that
  // `chevrotain` is available for consumption. This is mainly an issue for use
  // in the browser.
  external: ['chevrotain', ...Object.keys(pkg.peerDependencies || {})],
  plugins: commonPlugins,
};
const outputConfigs = [
  {
    file: path.join(repoRoot, pkg.browser),
    format: 'umd',
    globals: {
      chevrotain: 'chevrotain',
    },
  },
  {
    file: path.join(repoRoot, pkg.main),
    format: 'cjs',
  },
  {
    file: path.join(repoRoot, pkg.module),
    format: 'es',
  },
];

const build = ({ minify, reserved = [] }) =>
  Promise.all(
    outputConfigs.map(async (config) => {
      const file = minify
        ? config.file.replace(/\.(\w+)$/, '.min.$1')
        : config.file;
      console.log(chalk.yellow(`Building ${file}...`));
      const bundle = await rollup.rollup(
        minify
          ? {
              ...inputOptions,
              plugins: [
                ...inputOptions.plugins,
                terser({
                  mangle: {
                    reserved,
                  },
                }),
              ],
            }
          : inputOptions
      );
      console.log(chalk.green(`${file} successfully rolled up.`));
      console.log(chalk.yellow(`Writing ${file}...`));
      await bundle.write({
        ...config,
        name,
        file,
      });
      console.log(chalk.green(`${file} successfully written.`));
    })
  );

const buildUnminified = () => build({ minify: false });

const buildMinified = () => {
  // Song and dance to make `chevrotain` still work after minification; see
  // here: https://github.com/SAP/chevrotain/tree/master/examples/parser/minification
  const millan = require(path.join(repoRoot, pkg.main));
  const allTokens = [
    ...millan.sparqlTokens.sparqlTokenTypes,
    ...millan.turtleTokens.turtleTokenTypes,
    ...millan.smsTokens.smsTokenTypes,
  ];
  const tokenNames = allTokens.map((token) => chevrotain.tokenName(token));

  return build({
    minify: true,
    reserved: tokenNames,
  });
};

del(`${repoRoot}/dist/*`)
  .then(buildUnminified)
  .then(buildMinified)
  .then(() =>
    console.log(chalk.bgBlack.greenBright('All builds completed successfully!'))
  )
  .catch((err) => console.log(chalk.bgBlack.red(err)));
