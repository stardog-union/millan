import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const onwarn = (warning) => {
  // Silence overly noisy circular dependency warnings for node_modules
  if (
    warning.code === 'CIRCULAR_DEPENDENCY' &&
    warning.importer.indexOf('node_modules') === 0
  ) {
    return;
  }

  console.warn(`(!) ${warning.message}`);
};

const commonBuildConfig = {
  input: 'src/index.ts',
  onwarn,
  output: {
    name: 'millan',
  },
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
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
    resolve(),
    typescript({
      typescript: require('typescript'), // use local typescript
    }),
  ],
  treeshake: true,
};

export default [
  { file: pkg.browser, format: 'umd' },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
].reduce(
  (fullConfigs, partialConfig) => [
    ...fullConfigs,
    {
      ...commonBuildConfig,
      output: {
        ...commonBuildConfig.output,
        ...partialConfig,
      },
    },
    {
      ...commonBuildConfig,
      output: {
        ...commonBuildConfig.output,
        ...partialConfig,
        file: partialConfig.file.replace(/\.(\w+)$/, '.min.$1'),
      },
      plugins: [...commonBuildConfig.plugins, terser()],
    },
  ],
  []
);
