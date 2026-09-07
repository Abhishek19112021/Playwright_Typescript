const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

async function run(resultsFile) {
  if (!process.env.GITHUB_TOKEN) {
    console.log('GITHUB_TOKEN not set; skipping flaky issue creation.');
    return;
  }
  const repo = process.env.GITHUB_REPOSITORY; // owner/repo
  if (!repo) {
    console.log('GITHUB_REPOSITORY not set; skipping.');
    return;
  }
  const [owner, repoName] = repo.split('/');
  if (!fs.existsSync(resultsFile)) {
    console.log('Results file not found:', resultsFile);
    return;
  }
  const data = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // collect flaky tests
  const flaky = [];
  function walk(node) {
    if (!node) return;
    if (node.tests) {
      node.tests.forEach(t => {
        if (t.retries && t.retries.length > 0) {
          flaky.push({ title: t.title, location: t.location, retries: t.retries.length, file: t.location && t.location.file });
        }
      });
    }
    if (node.suites) node.suites.forEach(walk);
  }
  walk(data);

  if (!flaky.length) {
    console.log('No flaky tests found.');
    return;
  }

  for (const f of flaky) {
    const issueTitle = `[Flaky Test] ${f.title}`;
    // search existing open issues with same title
    const existing = await octokit.search.issuesAndPullRequests({ q: `repo:${owner}/${repoName} ${issueTitle} in:title state:open` });
    if (existing.data.total_count > 0) {
      console.log('Issue already exists for', issueTitle);
      continue;
    }
    const body = `Detected flaky test in CI:\n\n- Test: ${f.title}\n- File: ${f.file || 'unknown'}\n- Retries: ${f.retries}\n\nPlease investigate and mark as stable or add skip.`;
    // determine owner from mapping in repo config if available
    let assignees = [];
    try {
      const cfg = require('../tests/config').config;
      if (cfg && cfg.flakyOwners && f.file) {
        const basename = path.basename(f.file);
        const ownerUser = cfg.flakyOwners[basename];
        if (ownerUser) assignees.push(ownerUser);
      }
    } catch (e) {
      // ignore if config not available
    }

    try {
      const res = await octokit.issues.create({ owner, repo: repoName, title: issueTitle, body, assignees });
      console.log('Created issue', res.data.html_url);
      // add labels
      try { await octokit.issues.addLabels({ owner, repo: repoName, issue_number: res.data.number, labels: ['flaky', 'needs-investigation'] }); } catch(e){}
    } catch (e) {
      console.warn('Failed to create issue for', f.title, e.message);
    }
  }
}

if (require.main === module) {
  const file = process.argv[2] || path.join(process.cwd(), 'test-results', 'results.json');
  run(file).catch(err => { console.error(err); process.exit(1); });
}
