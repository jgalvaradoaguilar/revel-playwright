const path = require('path');

module.exports = {
  default: {
    require: [
      path.join(__dirname, 'src/test/steps/*.ts'),
      path.join(__dirname, 'src/test/support/hooks.ts'),
    ],
    requireModule: ['ts-node/register'],
    format: [
      '@cucumber/pretty-formatter',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    paths: [path.join(__dirname, 'src/test/features/*.feature')],
    timeout: 30000
  }
};