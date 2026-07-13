module.exports = {
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: {
          module: 'CommonJS',
          moduleResolution: 'Node10',
        },
      },
    ],
  },
  testRegex: '/__tests__/.*\\.(test|spec)\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['src', 'node_modules'],
};
