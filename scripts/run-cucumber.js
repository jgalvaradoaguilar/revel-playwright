const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const reportDirectory = path.join(projectRoot, 'target', 'cucumber-reports');
  const htmlReportDirectory = path.join(
    projectRoot,
    'target',
    'cucumber-html-reports'
  );
  const jsonReport = path.join(reportDirectory, 'cucumber.json');
  const obsoleteReportJson = path.join(
    reportDirectory,
    'cucumber-report.json'
  );
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
  fs.rmSync(obsoleteReportJson, { force: true });
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
    throw new Error(
      `Cucumber did not create ${path.relative(projectRoot, jsonReport)}; the HTML report cannot be generated.`
    );
  }

  const { generate } = await import('multiple-cucumber-html-reporter');
  await generate({
    jsonDir: reportDirectory,
    reportPath: htmlReportDirectory,
    pageTitle: 'Revel Playwright - Cucumber Report',
    reportName: 'Revel Playwright',
    displayDuration: true,
    humanReadableDuration: true,
    displayReportTime: true,
  });

  console.log(
    `Cucumber HTML report: ${path.relative(projectRoot, path.join(htmlReportDirectory, 'index.html'))}`
  );
  process.exitCode = testExitCode;
}

main().catch((error) => {
  console.error('Failed to generate Cucumber HTML report:', error);
  process.exitCode = 1;
});
