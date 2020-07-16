/**
 * This is the main jest config.  It runs tests using the default
 * test environment: jest-environment-jsdom.
 */
const path = require("path");
const babelJest = require("babel-jest");

module.exports = {
    transform: {
        "^.+\\.jsx?$": "<rootDir>/jest.transform.js",
    },
    setupFilesAfterEnv: [
      "<rootDir>/jest.setup.js",
      "./node_modules/jest-enzyme/lib/index.js",
    ],
};
