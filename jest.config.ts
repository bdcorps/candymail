// module.exports = {
//   automock: false,
//   preset: 'ts-jest',
//   restoreMocks: true,
//   clearMocks: true,
//   resetMocks: true,
//   resetModules: true,
//   testEnvironment: 'node',
//   testPathIgnorePatterns: ['lib'],
// }

import type { Config } from '@jest/types'
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/lib'],
}
export default config
