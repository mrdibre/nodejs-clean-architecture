// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./jest.config");

config.testWatch = ["**/*.spec.ts"];

module.exports = config;
