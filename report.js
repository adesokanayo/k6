const reporter = require('k6-html-reporter');

const options = {
  jsonFile: 'report.json',
    output: './html',
    };

reporter.generateSummaryReport(options);

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}


export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  return {
      'report.json': JSON.stringify(data),
  }
}