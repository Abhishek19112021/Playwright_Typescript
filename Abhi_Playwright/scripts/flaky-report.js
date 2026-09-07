const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(process.cwd(), 'test-results', 'results.json');
if (!fs.existsSync(file)) {
  console.error('Results file not found:', file);
  process.exit(2);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
let total = 0, passed = 0, failed = 0, flaky = 0;
const failedTests = [];

function walk(node) {
  if (!node) return;
  if (node.tests) {
    node.tests.forEach(t => {
      total++;
      if (t.status === 'passed') passed++;
      else if (t.status === 'failed') {
        failed++;
        failedTests.push({ title: t.title, location: t.location, errors: t.errors });
      }
      if (t.retries && t.retries.length > 0) flaky++;
    });
  }
  if (node.suites) node.suites.forEach(walk);
}

walk(data);

console.log('Total tests:', total);
console.log('Passed:', passed);
console.log('Failed:', failed);
console.log('Flaky (had retries):', flaky);
if (failedTests.length) {
  console.log('\nFailed test list:');
  failedTests.forEach((f, i) => {
    console.log(i + 1 + ')', f.title, f.location || '');
  });
}
