import nextJest from "next/jest.js";

// next/jest tự load next.config + .env và transform TS/JSX qua SWC (không cần ts-node)
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}", "**/*.test.{ts,tsx}"],
  collectCoverageFrom: [
    "src/utils/**/*.ts",
    "src/hooks/**/*.ts",
    "!src/**/*.d.ts",
  ],
};

export default createJestConfig(config);
