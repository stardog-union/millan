import tsRollup from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default {
  input: './src/parse.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    tsRollup({
      typescript,
    }),
  ],
  external: ['chevrotain'],
};
