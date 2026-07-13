module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: {
          module: 'CommonJS',
          moduleResolution: 'Node10',
          allowJs: true,
        },
      },
    ],
  },
  // chevrotain 11 and its dependencies are ESM-only; they must be transformed
  // to CommonJS for jest's runtime.
  transformIgnorePatterns: [
    '/node_modules/(?!(chevrotain|@chevrotain|lodash-es)/)',
  ],
  // @chevrotain/* subpackages only publish an "import" export condition, so
  // jest's default require-oriented resolution can't find them; point it
  // straight at the files (which the transform above compiles to CJS).
  moduleNameMapper: {
    '^@chevrotain/(utils|gast|regexp-to-ast|cst-dts-gen)$':
      '<rootDir>/node_modules/@chevrotain/$1/lib/src/api.js',
  },
  testRegex: '/__tests__/.*\\.(test|spec)\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['src', 'node_modules'],
};
