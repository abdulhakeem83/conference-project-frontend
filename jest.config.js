module.exports = {
    preset:"ts-jest",
    transform: { "^.+\\.tsx?$": "ts-jest" },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss|png|jpg|svg)$': '<rootDir>/mock_function.js'},
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testPathIgnorePatterns: ["/lib/", "node_modules/(?!axios)"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ["node_modules", "src"],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
    coverageDirectory: 'coverage',
    clearMocks:true,
  };