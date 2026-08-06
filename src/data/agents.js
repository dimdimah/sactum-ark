export const repoUrl = 'https://github.com/dimdimah/project-ai-skills-skill';

export const installSource = repoUrl;

export const installAllCommand = (slug) => `npx skills add ${installSource} --all -a ${slug}`;

export const installSkillCommand = (slug, skill) =>
  `npx skills add ${installSource} --skill ${skill} -a ${slug}`;

export const autoDetectCommand = `npx skills add ${installSource} --all`;

export const agents = [
  {
    slug: 'claude-code',
    name: 'Claude Code',
    tagline: 'Anthropic',
    path: '.claude/skills/',
    globalPath: '~/.claude/skills/',
    note: 'Mendeteksi skill dari folder skills dan memuatnya otomatis saat deskripsi skill cocok dengan task.',
    docs: 'https://code.claude.com/docs/en/skills',
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    tagline: 'Anysphere',
    path: '.agents/skills/',
    globalPath: '~/.cursor/skills/',
    note: 'Skill di direktori project dimuat otomatis sebagai agent skills.',
    docs: 'https://cursor.com/docs/context/skills',
  },
  {
    slug: 'windsurf',
    name: 'Windsurf',
    tagline: 'Codeium',
    path: '.windsurf/skills/',
    globalPath: '~/.codeium/windsurf/skills/',
    note: 'Skill di direktori project di-discovery otomatis dan dimuat saat dibutuhkan.',
    docs: null,
  },
  {
    slug: 'gemini-cli',
    name: 'Gemini CLI',
    tagline: 'Google',
    path: '.agents/skills/',
    globalPath: '~/.gemini/skills/',
    note: 'Memuat skill dari direktori skills setiap sesi dimulai.',
    docs: 'https://geminicli.com/docs/cli/skills/',
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'GitHub',
    path: '.agents/skills/',
    globalPath: '~/.copilot/skills/',
    note: 'Agent skills dimuat dari direktori project sebagai instruksi yang berlaku di repo.',
    docs: 'https://docs.github.com/en/copilot/concepts/agents/about-agent-skills',
  },
  {
    slug: 'openclaw',
    name: 'OpenClaw',
    tagline: 'Personal AI',
    path: 'skills/',
    globalPath: '~/.openclaw/skills/',
    note: 'Skill di direktori project dimuat otomatis oleh tools skill bawaan OpenClaw.',
    docs: 'https://docs.openclaw.ai/tools/skills',
  },
];
