import { writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = join(__dirname, '..', 'src', 'data', 'stats.json');
const tmpRoot = join(process.env.RUNNER_TEMP || process.env.TMPDIR || process.env.TEMP || '/tmp', 'sactum-stats');
const repo = 'https://github.com/dimdimah/project-ai-skills-skill';

const repoDir = join(tmpRoot, 'skillrepo-v2');

async function readJson(p) {
  const mod = await import('node:fs');
  return JSON.parse(mod.readFileSync(p, 'utf8'));
}

function run(cmd, cwd, env = {}) {
  return execSync(cmd, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, ...env },
  });
}

async function main() {
  // Bersihkan & clone repo skill segar (pastikan pakai LF, bukan CRLF checkout).
  rmSync(tmpRoot, { recursive: true, force: true });
  mkdirSync(tmpRoot, { recursive: true });
  run(`git -c core.autocrlf=false clone --depth 1 ${repo} "${repoDir}"`);

  // Jalankan harness nyata -> laporan JSON berisi angka total/passed/failed.
  const harnessReportPath = join(tmpRoot, 'harness-report.json');
  try {
    run(`node harness/run-tests.js --report "${harnessReportPath}"`, repoDir);
  } catch (e) {
    // runner exit non-zero bila ada suite gagal; report tetap ditulis. Tidak dianggap fatal.
  }
  const harness = await readJson(harnessReportPath);

  // Jalankan eval nyata -> skor trigger benchmark.
  const evalReportPath = join(tmpRoot, 'eval-report.json');
  try {
    run(`node evals/run-evals.js`, repoDir, { EVAL_OUTPUT: evalReportPath });
  } catch (e) {
    // eval exit non-zero bila di bawah threshold; report tetap ditulis.
  }
  const evalData = await readJson(evalReportPath);

  const version = run(`node -p "require('./package.json').version"`, repoDir).trim();
  const name = run(`node -p "require('./package.json').name"`, repoDir).trim();
  const lastCommit = run(`git log -1 --format=%cI`, repoDir).trim();
  const commitSha = run(`git rev-parse HEAD`, repoDir).trim().slice(0, 7);
  const commitMsg = run(`git log -1 --format=%s`, repoDir).trim();
  const skillDirs = run(`ls skills`, repoDir)
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);

  const stats = {
    source: 'dimdimah/project-ai-skills-skill',
    sourceUrl: 'https://github.com/dimdimah/project-ai-skills-skill',
    generatedAt: new Date().toISOString(),
    repo: {
      name,
      version,
      skills: skillDirs.length,
      lastCommit: {
        sha: commitSha,
        iso: lastCommit,
        dateLabel: lastCommit.slice(0, 10),
        message: commitMsg,
      },
    },
    tests: {
      node: harness.total.node,
      python: harness.total.python,
      ok: harness.ok,
    },
    eval: {
      score: typeof evalData.score === 'number' ? evalData.score : null,
      queriesMatched: evalData.totals?.passed ?? null,
      queriesTotal: evalData.totals?.queries ?? null,
      structuralPassed: evalData.totals?.structuralPass ?? null,
      structuralTotal: evalData.totals?.structural ?? null,
      ok: !!evalData.totals && evalData.totals.failed === 0 && (evalData.score ?? 0) >= (evalData.threshold ?? 80),
    },
  };

  writeFileSync(output, JSON.stringify(stats, null, 2) + '\n', 'utf8');
  console.log(`Stats ditulis -> ${output}`);

  rmSync(tmpRoot, { recursive: true, force: true });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});