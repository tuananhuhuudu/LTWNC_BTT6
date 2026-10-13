import type { Config } from 'jest';

// Cau hinh Jest cho du an React + TypeScript (Buoi 6)
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
  // Chi do coverage cho module gio hang / san pham da chon
  collectCoverageFrom: [
    'src/features/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.ts',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  // Nguong coverage theo yeu cau bai tap: >= 70%
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};

export default config;
