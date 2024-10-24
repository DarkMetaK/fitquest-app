import type { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',
  bail: true,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  testPathIgnorePatterns: ['./test'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}', '!./src/**/styles.ts'],
  coveragePathIgnorePatterns: [
    './src/@types',
    './src/styles',
    './src/libs/dayjs',
  ],
  coverageDirectory: './coverage',
  testTimeout: 10000,
}

export default config
