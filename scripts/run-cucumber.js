const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const reportDirectory = path.join(projectRoot, 'target', 'cucumber-reports');
const htmlReportDirectory = path.join(
  projectRoot,
  'target',
  'cucumber-html-reports'
);
const jsonReport = path.join(reportDirectory, 'cucumber.json');
const reportJson = path.join(reportDirectory, 'cucumber-report.json');
const cucumberCli = path.join(
  projectRoot,
  'node_modules',
  '@cucumber',
  'cucumber',
  'bin',
  'cucumber.js'
);

fs.mkdirSync(reportDirectory, { recursive: true });
fs.rmSync(jsonReport, { force: true });
fs.rmSync(htmlReportDirectory, { recursive: true, force: true });

const cucumberResult = spawnSync(
  process.execPath,
  [cucumberCli, ...process.argv.slice(2)],
  {
    cwd: projectRoot,
    stdio: 'inherit',
  }
);

if (cucumberResult.error) {
  throw cucumberResult.error;
}

const testExitCode = cucumberResult.status ?? 1;

if (!fs.existsSync(jsonReport)) {
  console.error(
    `Cucumber did not create ${path.relative(projectRoot, jsonReport)}; the HTML report cannot be generated.`
  );
  process.exitCode = testExitCode || 1;
  return;
}

const cucumberFeatures = JSON.parse(fs.readFileSync(jsonReport, 'utf8'));
for (const feature of cucumberFeatures) {
  for (const scenario of feature.elements ?? []) {
    scenario.steps = scenario.steps.filter((step) => !step.hidden);
  }
}
fs.writeFileSync(reportJson, JSON.stringify(cucumberFeatures, null, 2));

const isWindows = process.platform === 'win32';
const mavenCommand = isWindows ? process.env.ComSpec || 'cmd.exe' : 'mvn';
const mavenArguments = isWindows
  ? ['/d', '/s', '/c', 'mvn.cmd -B verify']
  : ['-B', 'verify'];
const reportResult = spawnSync(mavenCommand, mavenArguments, {
  cwd: projectRoot,
  stdio: 'inherit',
});

if (reportResult.error) {
  throw reportResult.error;
}

const reportExitCode = reportResult.status === null ? 1 : reportResult.status;
process.exitCode = testExitCode === 0 ? reportExitCode : testExitCode;
