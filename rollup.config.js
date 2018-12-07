import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const typescriptConfig = {
  typescript: require('typescript'),
  tsconfigOverride: {
    compilerOptions: {
      // Don't have rollup generate declarations -- the plugin doesn't do
      // it right, seemingly because there are multiple compilations.
      // Possibly related issue: https://github.com/ezolenko/rollup-plugin-typescript2/issues/72
      declaration: false,
    },
  },
};

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'millan',
      file: pkg.browser,
      format: 'umd',
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [typescript(typescriptConfig), commonjs(), resolve()],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [typescript(typescriptConfig)],
  },
];
