const path = require('path');
const featurePath = process.env.CUCUMBER_FEATURE;
const scenarioTag = process.env.CUCUMBER_TAG;

module.exports = {
  default: {
    require: [
      path.join(__dirname, 'src/test/steps/*.ts'),
      path.join(__dirname, 'src/test/support/hooks.ts'),
    ],
    requireModule: ['ts-node/register'],
    format: [
      '@cucumber/pretty-formatter',
      'json:target/cucumber-reports/cucumber.json',
    ],
    paths: [
      featurePath
        ? path.resolve(__dirname, featurePath)
        : path.join(__dirname, 'src/test/features/*.feature'),
    ],
    ...(scenarioTag ? { tags: scenarioTag } : {}),
    timeout: 30000
  }
};