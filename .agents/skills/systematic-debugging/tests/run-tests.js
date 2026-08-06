import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try { fn(); passed++; console.log(`  PASS: ${name}`); }
  catch (err) { failed++; failures.push({ name, error: err.message }); console.log(`  FAIL: ${name} — ${err.message}`); }
}

function assert(condition, message) { if (!condition) throw new Error(message || "Assertion failed"); }

function readMarkdown(filePath) { return fs.readFileSync(filePath, "utf-8"); }
function readJson(filePath) { return JSON.parse(fs.readFileSync(filePath, "utf-8")); }

console.log("\n=== Systematic Debugging Skill Tests ===\n");

console.log("SKILL.md Tests:");
const skillMdContent = readMarkdown(path.join(SKILL_DIR, "SKILL.md"));

test("SKILL.md contains all required sections", () => {
  for (const section of ["Tujuan", "Kapan Skill Ini Aktif", "Cara Kerja", "Checklist Sebelum Mengaktifkan Skill Ini", "Prinsip Utama"]) {
    assert(skillMdContent.includes(`## ${section}`), `Missing section: ${section}`);
  }
});

test("SKILL.md describes debugging phases", () => {
  for (const phase of ["Observe", "Reproduce", "Hypothesize", "Test", "Fix", "Prevent"]) {
    assert(skillMdContent.includes(phase), `Missing phase: ${phase}`);
  }
});

test("SKILL.md mentions root cause", () => {
  assert(skillMdContent.toLowerCase().includes("root cause") || skillMdContent.toLowerCase().includes("akar"), "Missing root cause mention");
});

console.log("\nREADME Tests:");
const readmeContent = readMarkdown(path.join(SKILL_DIR, "README.md"));

test("README.md exists and has content", () => {
  assert(readmeContent.length > 100, "README is too short");
});

test("README.md has installation instructions", () => {
  assert(readmeContent.includes("npx skills add"), "README should have install command");
});

test("README.md mentions debugging", () => {
  assert(readmeContent.toLowerCase().includes("debug"), "README should mention debugging");
});

console.log("\nRules Tests:");
const rulesDir = path.join(SKILL_DIR, "rules");
test("rules directory exists", () => {
  assert(fs.existsSync(rulesDir), "Missing rules directory");
});

const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith(".md"));
test("rules directory has at least one markdown file", () => {
  assert(ruleFiles.length > 0, "No rule files found");
});

const requiredRuleSections = [
  "Tujuan", "Kapan Digunakan", "Input", "Output", "Checklist",
  "Best Practice", "Quality Gate", "Failure Condition", "Retry Instruction", "Completion Criteria",
];

for (const ruleFile of ruleFiles) {
  const ruleContent = readMarkdown(path.join(rulesDir, ruleFile));
  test(`${ruleFile} has frontmatter with title`, () => {
    assert(ruleContent.startsWith("---"), "Missing frontmatter");
    assert(ruleContent.includes("title:"), "Missing title");
  });
  test(`${ruleFile} contains all required sections`, () => {
    for (const section of requiredRuleSections) {
      assert(ruleContent.includes(`## ${section}`), `Missing section: ${section}`);
    }
  });
}

console.log("\nTemplate Tests:");
const templatesDir = path.join(SKILL_DIR, "templates");
test("templates directory exists", () => {
  assert(fs.existsSync(templatesDir), "Missing templates directory");
});

const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith(".md"));
test("templates directory has at least one markdown file", () => {
  assert(templateFiles.length > 0, "No template files found");
});

const templateContent = readMarkdown(path.join(templatesDir, templateFiles[0]));
test("template has frontmatter with title", () => {
  assert(templateContent.startsWith("---"), "Missing frontmatter");
  assert(templateContent.includes("title:"), "Missing title");
});

test("template includes debug phases", () => {
  for (const section of ["Observe", "Reproduce", "Hypothesize", "Fix"]) {
    assert(templateContent.includes(section), `Missing section: ${section}`);
  }
});

console.log("\nSchema Tests:");
const schemaDir = path.join(SKILL_DIR, "schemas");
test("schemas directory exists", () => {
  assert(fs.existsSync(schemaDir), "Missing schemas directory");
});

const schemaFiles = fs.readdirSync(schemaDir).filter(f => f.endsWith(".schema.json"));
test("schemas directory has at least one schema file", () => {
  assert(schemaFiles.length > 0, "No schema files found");
});

for (const schemaFile of schemaFiles) {
  test(`${schemaFile} is valid JSON schema`, () => {
    const schema = readJson(path.join(schemaDir, schemaFile));
    assert(schema.$schema, "Missing $schema");
    assert(schema.type === "object", "Root should be object");
  });
}

console.log("\nScript Tests:");
const scriptsDir = path.join(SKILL_DIR, "scripts");
test("scripts directory exists", () => {
  assert(fs.existsSync(scriptsDir), "Missing scripts directory");
});

const scriptFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith(".js"));
test("scripts directory has at least one JS file", () => {
  assert(scriptFiles.length > 0, "No script files found");
});

for (const scriptFile of scriptFiles) {
  const scriptContent = readMarkdown(path.join(scriptsDir, scriptFile));
  test(`${scriptFile} has shebang`, () => {
    assert(scriptContent.includes("#!/usr/bin/env node"), `Missing shebang in ${scriptFile}`);
  });
}

console.log("\nTests Directory Tests:");
test("tests/package.json exists", () => {
  assert(fs.existsSync(path.join(SKILL_DIR, "tests", "package.json")), "Missing tests/package.json");
});

test("tests/run-tests.js exists", () => {
  assert(fs.existsSync(path.join(SKILL_DIR, "tests", "run-tests.js")), "Missing tests/run-tests.js");
});

console.log("\nExample Tests:");
const examplesDir = path.join(SKILL_DIR, "examples");
test("examples directory exists", () => {
  assert(fs.existsSync(examplesDir), "Missing examples directory");
});

const exampleFiles = fs.readdirSync(examplesDir).filter(f => f.endsWith(".md"));
test("examples directory has at least one markdown file", () => {
  assert(exampleFiles.length > 0, "No example files found");
});

for (const exampleFile of exampleFiles) {
  const exampleContent = readMarkdown(path.join(examplesDir, exampleFile));
  test(`${exampleFile} has frontmatter`, () => {
    assert(exampleContent.startsWith("---"), "Missing frontmatter");
  });
}

console.log("\n=== Test Summary ===");
console.log(`Total:  ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failures.length > 0) {
  console.log("\nFailures:");
  for (const failure of failures) { console.log(`  - ${failure.name}: ${failure.error}`); }
}

if (failed > 0) { console.log("\nTests FAILED\n"); process.exit(1); }
else { console.log("\nAll tests PASSED\n"); process.exit(0); }
