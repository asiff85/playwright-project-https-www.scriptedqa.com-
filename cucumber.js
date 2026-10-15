module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    import: [
      'step-definitions/**/*.ts',
      'hooks/**/*.ts'
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    forceExit: true,
    parallel: 1
  }
};

