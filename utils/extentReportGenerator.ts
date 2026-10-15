import * as fs from 'fs';
import * as path from 'path';

export interface ExtentScenarioResult {
  name: string;
  featureName: string;
  status: 'passed' | 'failed' | 'skipped';
  durationMs: number;
  steps: {
    name: string;
    keyword: string;
    status: 'passed' | 'failed' | 'skipped';
    durationMs: number;
    errorMessage?: string;
  }[];
}

/**
 * ExtentReportGenerator generates an interactive Extent-styled HTML report
 * in the reports directory based on test execution results.
 */
export class ExtentReportGenerator {
  static generateReport(jsonReportPath: string, outputHtmlPath: string): void {
    const reportDir = path.dirname(outputHtmlPath);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    let scenarios: ExtentScenarioResult[] = [];
    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;
    let totalDurationMs = 0;

    if (fs.existsSync(jsonReportPath)) {
      try {
        const raw = fs.readFileSync(jsonReportPath, 'utf8');
        const features = JSON.parse(raw);

        for (const feature of features) {
          const featureName = feature.name || 'Feature';
          for (const element of feature.elements || []) {
            totalScenarios++;
            let scenarioPassed = true;
            let scenarioDuration = 0;
            const steps: ExtentScenarioResult['steps'] = [];

            for (const step of element.steps || []) {
              const status = step.result?.status || 'skipped';
              const durationMs = Math.round((step.result?.duration || 0) / 1000000);
              scenarioDuration += durationMs;

              if (status !== 'passed') {
                scenarioPassed = false;
              }

              steps.push({
                keyword: step.keyword || '',
                name: step.name || '',
                status: status,
                durationMs: durationMs,
                errorMessage: step.result?.error_message
              });
            }

            if (scenarioPassed) {
              passedScenarios++;
            } else {
              failedScenarios++;
            }

            totalDurationMs += scenarioDuration;

            scenarios.push({
              name: element.name || 'Scenario',
              featureName: featureName,
              status: scenarioPassed ? 'passed' : 'failed',
              durationMs: scenarioDuration,
              steps: steps
            });
          }
        }
      } catch (err) {
        console.warn('Could not parse Cucumber JSON for Extent Report:', err);
      }
    }

    const passRate = totalScenarios > 0 ? Math.round((passedScenarios / totalScenarios) * 100) : 100;
    const now = new Date().toLocaleString();

    const scenarioRows = scenarios.map((sc, i) => {
      const statusBadge = sc.status === 'passed' 
        ? '<span class="badge badge-pass">PASSED</span>'
        : '<span class="badge badge-fail">FAILED</span>';

      const stepList = sc.steps.map(st => {
        const stepStatusIcon = st.status === 'passed' ? '✅' : (st.status === 'failed' ? '❌' : '⚠️');
        return `
          <div class="step-item ${st.status}">
            <span class="step-icon">${stepStatusIcon}</span>
            <span class="step-keyword"><b>${st.keyword}</b></span>
            <span class="step-name">${st.name}</span>
            <span class="step-time">${st.durationMs}ms</span>
            ${st.errorMessage ? `<pre class="error-stack">${st.errorMessage}</pre>` : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="test-card ${sc.status}">
          <div class="card-header" onclick="toggleDetails(${i})">
            <div class="header-left">
              ${statusBadge}
              <span class="test-title">${sc.name}</span>
            </div>
            <div class="header-right">
              <span class="duration">${(sc.durationMs / 1000).toFixed(2)}s</span>
              <span class="toggle-icon" id="toggle-${i}">▼</span>
            </div>
          </div>
          <div class="card-body" id="body-${i}" style="display: none;">
            <div class="steps-container">
              ${stepList}
            </div>
          </div>
        </div>
      `;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Extent Report - Scripted QA Automation</title>
  <style>
    :root {
      --bg: #1e1e2f;
      --card-bg: #27293d;
      --text: #ffffff;
      --text-muted: #9a9a9a;
      --pass: #00bf9a;
      --fail: #fd5d93;
      --border: #383a59;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: var(--bg); color: var(--text); padding: 24px; }
    .header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
    .header h1 { font-size: 24px; color: #fff; }
    .header .timestamp { color: var(--text-muted); font-size: 14px; }
    .dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: var(--card-bg); padding: 20px; border-radius: 8px; border: 1px solid var(--border); }
    .stat-card .label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-card .value { font-size: 28px; font-weight: bold; margin-top: 8px; }
    .stat-card.pass .value { color: var(--pass); }
    .stat-card.fail .value { color: var(--fail); }
    .test-list { display: flex; flex-direction: column; gap: 12px; }
    .test-card { background: var(--card-bg); border-radius: 8px; border: 1px solid var(--border); overflow: hidden; }
    .card-header { padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; }
    .card-header:hover { background: rgba(255, 255, 255, 0.03); }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .header-right { display: flex; align-items: center; gap: 16px; color: var(--text-muted); font-size: 14px; }
    .badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
    .badge-pass { background: rgba(0, 191, 154, 0.15); color: var(--pass); border: 1px solid var(--pass); }
    .badge-fail { background: rgba(253, 93, 147, 0.15); color: var(--fail); border: 1px solid var(--fail); }
    .test-title { font-size: 15px; font-weight: 600; }
    .card-body { padding: 0 20px 20px 20px; border-top: 1px solid var(--border); }
    .steps-container { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
    .step-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 4px; background: rgba(0,0,0,0.2); font-size: 14px; }
    .step-time { margin-left: auto; color: var(--text-muted); font-size: 12px; }
    .error-stack { margin-top: 8px; padding: 12px; background: #1a1a24; color: #ff79c6; border-radius: 4px; font-size: 12px; overflow-x: auto; width: 100%; }
  </style>
  <script>
    function toggleDetails(id) {
      const body = document.getElementById('body-' + id);
      const icon = document.getElementById('toggle-' + id);
      if (body.style.display === 'none') {
        body.style.display = 'block';
        icon.innerText = '▲';
      } else {
        body.style.display = 'none';
        icon.innerText = '▼';
      }
    }
  </script>
</head>
<body>
  <div class="header">
    <div>
      <h1>Extent Automation Execution Report</h1>
      <div class="timestamp">Platform: Google Chrome (Desktop) | Suite: Login Page BDD Hybrid Framework</div>
    </div>
    <div class="timestamp">Generated on: ${now}</div>
  </div>

  <div class="dashboard">
    <div class="stat-card">
      <div class="label">Total Scenarios</div>
      <div class="value">${totalScenarios}</div>
    </div>
    <div class="stat-card pass">
      <div class="label">Passed Scenarios</div>
      <div class="value">${passedScenarios}</div>
    </div>
    <div class="stat-card fail">
      <div class="label">Failed Scenarios</div>
      <div class="value">${failedScenarios}</div>
    </div>
    <div class="stat-card">
      <div class="label">Pass Rate</div>
      <div class="value">${passRate}%</div>
    </div>
    <div class="stat-card">
      <div class="label">Total Execution Time</div>
      <div class="value">${(totalDurationMs / 1000).toFixed(2)}s</div>
    </div>
  </div>

  <div class="test-list">
    ${scenarioRows || '<div class="stat-card">No execution results found.</div>'}
  </div>
</body>
</html>`;

    fs.writeFileSync(outputHtmlPath, html, 'utf8');
    console.log(`✅ Extent Report generated at: ${outputHtmlPath}`);
  }
}

