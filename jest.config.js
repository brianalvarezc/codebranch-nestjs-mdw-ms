/**
 * Jest configuration for the project.
 * Kept in JS so VS Code extensions can auto-detect it.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@interceptor/(.*)$': '<rootDir>/src/interceptor/$1',
    '^@src/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.spec.{js,ts}',
    '!src/main.ts',
    '!src/app.module.ts'
  ],
  coverageDirectory: 'coverage'
};
