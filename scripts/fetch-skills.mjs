import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repo = 'https://raw.githubusercontent.com/dimdimah/project-ai-skills-skill/main/skills';
const contentOutput = join(__dirname, '..', 'src', 'data', 'skills-content.json');
const catalogOutput = join(__dirname, '..', 'src', 'data', 'skills-catalog.json');

const skillPaths = [
  'project-orchestrator',
  'security-audit-skill',
  'session-handoff',
  'git-history-archaeologist',
  'tdd-workflow',
  'verification-loop',
  'webapp-testing',
  'domain-modeling',
  'planning-workflow',
  'strategic-compact',
  'systematic-debugging',
  'diagram-generator',
];

const metadata = {
  'project-orchestrator': { topic: 'build', icon: 'tree-structure', title: 'Project Orchestrator', tags: ['orchestrator', 'sdlc', 'master'], longDescription: 'Project Orchestrator adalah skill master yang mengatur seluruh alur Software Development Lifecycle (SDLC) dengan 13 tahap terstruktur. Ia tidak menulis kode, tetapi memastikan setiap task mengikuti urutan kerja yang benar: dari requirement analysis sampai completion report. Dengan quality gate dan retry policy yang ketat, skill ini mencegah AI melompati tahapan penting sebelum deployment.' },
  'security-audit': { topic: 'security', icon: 'shield-check', title: 'Security Audit', tags: ['security', 'audit', 'owasp'], longDescription: 'Security Audit menjalankan 5 modul audit secara otomatis: static analysis, dependency check, config audit, secrets audit, dan prompt-injection guard. Skill ini menghasilkan prioritized findings dan menegakkan security gate yang memblokir deploy jika ada finding critical atau high. Cocok untuk SOC scan, CSIRT investigation, dan pre-commit security validation.' },
  'session-handoff': { topic: 'team', icon: 'bookmark-simple', title: 'Session Handoff', tags: ['handoff', 'session', 'continuity'], longDescription: 'Session Handoff merangkum seluruh pekerjaan agent dalam satu sesi menjadi dokumen handoff yang mudah dibaca. Dokumen ini mencakup status pekerjaan, keputusan yang diambil, todo lanjutan, dan gotchas yang perlu diperhatikan. Sesi berikutnya atau manusia bisa melanjutkan tanpa harus membaca seluruh percakapan.' },
  'git-history-archaeologist': { topic: 'docs', icon: 'git-branch', title: 'Git History Archaeologist', tags: ['git', 'history', 'refactor'], longDescription: 'Git History Archaeologist menggali git history menggunakan blame, log, pickaxe, dan bisect untuk menjawab pertanyaan kenapa kode ini begini. Skill ini merangkum alasan historis di balik keputusan kode, yang sangat krusial sebelum refactor atau saat onboarding anggota tim baru.' },
  'tdd-workflow': { topic: 'verify', icon: 'flask', title: 'TDD Workflow', tags: ['tdd', 'testing', 'red-green-refactor'], longDescription: 'TDD Workflow memaksa siklus Test-Driven Development: RED (tulis test yang gagal), GREEN (implementasi minimum), REFACTOR (perbaiki kode tanpa merusak test). Skill ini dirancang khusus untuk logika bisnis, perhitungan, stok, dan transaksi, area yang butuh ketelitian tinggi dan perlindungan dari regression.' },
  'verification-loop': { topic: 'verify', icon: 'check-circle', title: 'Verification Loop', tags: ['verification', 'quality', 'deploy'], longDescription: 'Verification Loop berfungsi sebagai reviewer otomatis sebelum task dianggap selesai. Checklist meliputi syntax check, type check, test suite, lint, security scan, dan performa baseline. Skill ini mencegah deployment jika ada yang gagal, memastikan hanya kode yang lolos semua gate yang bisa masuk produksi.' },
  'webapp-testing': { topic: 'verify', icon: 'browser', title: 'Webapp Testing', tags: ['e2e', 'testing', 'playwright'], longDescription: 'Webapp Testing memberikan panduan lengkap untuk end-to-end testing aplikasi web. Skill ini fokus pada simulasi user behavior: klik, isi form, navigasi, dan verifikasi alur kerja. Role-based access testing memastikan setiap role bisa akses sesuai aturan dan tidak ada privilege escalation.' },
  'domain-modeling': { topic: 'planning', icon: 'database', title: 'Domain Modeling', tags: ['domain', 'erd', 'modeling'], longDescription: 'Domain Modeling adalah skill untuk memetakan entitas, atribut, relasi, dan aturan bisnis sebelum mulai ngoding. Skill ini menghasilkan model data yang konsisten dan validated, yang bisa langsung diimplementasikan ke schema database. Cocok dipakai sebelum project-orchestrator masuk ke tahap implementasi.' },
  'planning-workflow': { topic: 'planning', icon: 'clipboard-text', title: 'Planning Workflow', tags: ['planning', 'prd', 'requirements'], longDescription: 'Planning Workflow menggabungkan PRD generation dan implementation planning dalam satu alur: dari ide mentah, requirement gathering, PRD lengkap, sampai breakdown task, asumsi, dan risiko. Skill ini memastikan tidak ada yang ambigu sebelum coding dimulai.' },
  'strategic-compact': { topic: 'team', icon: 'archive', title: 'Strategic Compact', tags: ['compact', 'context', 'memory'], longDescription: 'Strategic Compact merangkum konteks penting selama sesi panjang kerja agent. Ringkasan ini mencakup keputusan yang diambil, constraint yang dihadapi, dan trade-off yang dilakukan. Sangat berguna untuk sesi berikutnya agar AI tidak lupa konteks penting tanpa harus membaca seluruh percakapan.' },
  'systematic-debugging': { topic: 'build', icon: 'bug', title: 'Systematic Debugging', tags: ['debugging', 'bug', 'investigation'], longDescription: 'Systematic Debugging mengajarkan pendekatan berbasis bukti: observe (pengamatan), reproduce (reproduksi bug), hypothesize (hipotesis), test (verifikasi hipotesis), fix (perbaikan), dan prevent (mencegah terulang). Skill ini mencegah AI melakukan trial-and-error yang membuang waktu.' },
  'diagram-generator': { topic: 'docs', icon: 'chart-line', title: 'Diagram Generator', tags: ['diagram', 'uml', 'mermaid'], longDescription: 'Diagram Generator menghasilkan diagram UML dalam sintaks Mermaid.js yang bisa langsung di-render di GitHub, Notion, atau VS Code. Mendukung ER Diagram, Use Case Diagram, Class Diagram, Sequence Diagram, dan Activity Diagram. Cocok untuk dokumentasi arsitektur dan komunikasi tim.' },
};

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { frontmatter: {}, content: raw.trim() };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      fm[key] = JSON.parse(value);
    } else {
      fm[key] = value;
    }
  }
  return { frontmatter: fm, content: m[2].trim() };
}

async function main() {
  const contentEntries = [];
  const catalogEntries = [];

  for (const path of skillPaths) {
    const url = `${repo}/${path}/SKILL.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Gagal fetch ${url} -> ${res.status}`);
    const raw = await res.text();
    const { frontmatter, content } = parseFrontmatter(raw);
    const key = frontmatter.name || path.split('/').pop();
    const meta = metadata[key] || {};

    contentEntries.push({
      key,
      path,
      description: frontmatter.description || '',
      content,
    });

    catalogEntries.push({
      name: key,
      topic: meta.topic || 'other',
      icon: meta.icon || 'cube',
      title: meta.title || key,
      description: frontmatter.description || '',
      tags: meta.tags || [],
      install: `npx skills add https://github.com/dimdimah/project-ai-skills-skill --skill ${key}`,
      longDescription: meta.longDescription || frontmatter.description || '',
    });
  }

  const contentData = Object.fromEntries(
    contentEntries.map((e) => [e.key, { path: e.path, description: e.description, content: e.content }])
  );
  writeFileSync(contentOutput, JSON.stringify(contentData, null, 2) + '\n', 'utf8');
  console.log(`Ditulis ${Object.keys(contentData).length} skill -> ${contentOutput}`);

  const catalogData = catalogEntries;
  writeFileSync(catalogOutput, JSON.stringify(catalogData, null, 2) + '\n', 'utf8');
  console.log(`Ditulis ${Object.keys(catalogData).length} skill -> ${catalogOutput}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
