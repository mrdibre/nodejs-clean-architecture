module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!**/protocols/**",
    "!**/main/**",
    "!**/test/**",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  preset: "@shelf/jest-mongodb",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
