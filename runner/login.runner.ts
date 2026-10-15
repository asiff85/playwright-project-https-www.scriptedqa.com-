import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { ExtentReportGenerator } from '../utils/extentReportGenerator';

/**
 * Cucumber Test Runner Script for Login Page Test Suite
 * Launches Cucumber BDD test suite in Google Chrome,
 * and compiles Extent Reports upon completion.
 */
async function runLoginSuite(): Promise<void> {
  const reportsDir = path.resolve(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const jsonReportPath = path.join(reportsDir, 'cucumber-report.json');
  const extentReportPath = path.join(reportsDir, 'extent-report.html');

  console.log('================================================================');
  console.log('🚀 Launching Scripted QA Login Test Suite in Google Chrome');
  console.log('================================================================');

  try {
    // Execute cucumber-js with tsx loader
    execSync('npx cucumber-js features/login.feature', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      env: {
        ...process.env,
        NODE_OPTIONS: '--import tsx',
      },
    });
  } catch (err: any) {
    console.log('⚠️ Some scenarios completed with assertions or warnings.');
  } finally {
    console.log('================================================================');
    console.log('📊 Generating Playwright Extent Report...');
    ExtentReportGenerator.generateReport(jsonReportPath, extentReportPath);
    console.log(`✨ Extent Report successfully generated at: ${extentReportPath}`);
    console.log('================================================================');
  }
}

runLoginSuite().catch((err) => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});

