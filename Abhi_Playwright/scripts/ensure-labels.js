const { Octokit } = require('@octokit/rest');

async function ensureLabels() {
  if (!process.env.GITHUB_TOKEN) {
    console.log('GITHUB_TOKEN not set; skipping label ensure');
    return;
  }
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo) {
    console.log('GITHUB_REPOSITORY not set; skipping');
    return;
  }
  const [owner, repoName] = repo.split('/');
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const needed = [
    { name: 'flaky', color: 'fbca04', description: 'Tests that fail intermittently' },
    { name: 'needs-investigation', color: 'd93f0b', description: 'Requires triage' },
  ];

  for (const label of needed) {
    try {
      await octokit.issues.getLabel({ owner, repo: repoName, name: label.name });
      console.log('Label exists:', label.name);
    } catch (e) {
      try {
        await octokit.issues.createLabel({ owner, repo: repoName, name: label.name, color: label.color, description: label.description });
        console.log('Created label:', label.name);
      } catch (err) {
        console.warn('Failed to create label', label.name, err.message);
      }
    }
  }
}

if (require.main === module) {
  ensureLabels().catch(err => { console.error(err); process.exit(1); });
}
