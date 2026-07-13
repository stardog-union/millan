import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'docs/', '.yarn/'],
  },
  {
    rules: {
      // This codebase predates strict typing (noImplicitAny is off) and
      // freely uses `any` at parser boundaries.
      '@typescript-eslint/no-explicit-any': 'off',
      // Token modules must be imported with require(); see
      // https://github.com/SAP/chevrotain/issues/345
      '@typescript-eslint/no-require-imports': 'off',
      // tsc enforces noUnusedLocals/noUnusedParameters already; the eslint
      // equivalent double-reports and disagrees about leading underscores.
      '@typescript-eslint/no-unused-vars': 'off',
      // Lexer terminal regexes intentionally include control characters
      // (e.g. \x00 ranges from the SPARQL/Turtle specs) and spec-transcribed
      // escapes inside character classes.
      'no-control-regex': 'off',
      'no-useless-escape': 'off',
      // Pre-existing suppressions and loose types from the pre-TS5 codebase;
      // relaxing these keeps this migration free of parser-internal churn.
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  }
);
