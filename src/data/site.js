export const phases = [
  { title: 'Plan', detail: 'Requirement gathering, PRD, dan domain modeling. Dikerjakan planning-workflow, domain-modeling, dan strategic-compact sebelum kode ditulis.' },
  { title: 'Build', detail: 'Kode ditulis dengan quality gate per tahap. project-orchestrator mengatur urutan, systematic-debugging menangani bug saat muncul.' },
  { title: 'Verify', detail: 'tdd-workflow, webapp-testing, dan verification-loop memastikan setiap tahap lulus test, review, dan security scan.' },
  { title: 'Deploy', detail: 'Persiapan rilis, migration plan, dan rollback strategy lewat verification-loop dan security-audit agar rilis aman.' },
  { title: 'Handoff', detail: 'session-handoff menangkap keputusan dan gotcha. Sesi berikutnya lanjut tanpa mengulang konteks dari nol.' },
];

export const agents = [
  { name: 'Claude Code', slug: 'claudecode' },
  { name: 'Cursor', slug: 'cursor' },
  { name: 'Windsurf', slug: 'windsurf' },
  { name: 'Gemini CLI', slug: 'googlegemini' },
  { name: 'GitHub Copilot', slug: 'github' },
  { name: 'OpenCode', slug: 'opencode' },
];

export const installOptions = [
  { id: 'cli', label: 'CLI', command: 'npx skills add https://github.com/dimdimah/project-ai-skills-skill --all' },
  { id: 'npm', label: 'npm', command: 'npm install project-ai-skills-skill' },
  { id: 'npx', label: 'npx', command: 'npx project-ai-skills-skill install' },
  { id: 'plugin', label: 'Plugin', command: 'claude plugin install project-ai-skills-skill' },
];

export const footerSkills = [
  { title: 'Project Orchestrator', href: '/skills/project-orchestrator' },
  { title: 'Security Audit', href: '/skills/security-audit' },
  { title: 'TDD Workflow', href: '/skills/tdd-workflow' },
  { title: 'Verification Loop', href: '/skills/verification-loop' },
];
