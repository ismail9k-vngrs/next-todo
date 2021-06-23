/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  projects: [
    {
      displayName: 'client',
      testMatch: ['**/tests/client/**/*.spec.[jt]s?(x)'],
      preset: '@vue/cli-plugin-unit-jest/presets/typescript',
      transform: {
        '^.+\\.vue$': 'vue-jest',
      },
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    },
    {
      displayName: 'server',
      testMatch: ['**/tests/server/**/*.spec.[jt]s?(x)'],
      moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
      transformIgnorePatterns: ['/node_modules/'],
      transform: {
        '^.+\\.tsx?$': require.resolve('ts-jest'),
      },
      testEnvironment: 'node',
      // https://github.com/facebook/jest/issues/6766
      testURL: 'http://localhost/',
      watchPlugins: [
        require.resolve('jest-watch-typeahead/filename'),
        require.resolve('jest-watch-typeahead/testname'),
      ],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    },
  ],
};
