#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const SKILL_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

function scaffoldDebugLog(issue) {
  const templatePath = path.join(SKILL_DIR, 'templates', 'debug-log.md');
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace(/\{\{feature\}\}/g, issue);
  template = template.replace(/\{\{debug_id\}\}/g, `dbg-${Date.now()}`);
  template = template.replace(/\{\{date\}\}/g, new Date().toISOString());
  template = template.replace(/\{\{error_output\}\}/g, 'Paste error here');
  template = template.replace(/\{\{environment\}\}/g, 'development');
  template = template.replace(/\{\{severity\}\}/g, 'medium');

  const outputPath = path.join(process.cwd(), `.debug-log-${Date.now()}.md`);
  fs.writeFileSync(outputPath, template);
  console.log(`Debug log scaffold created: ${outputPath}`);
  return outputPath;
}

function validateDebugLog(filepath) {
  if (!fs.existsSync(filepath)) {
    console.error(`File not found: ${filepath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(filepath, 'utf-8');
  const data = JSON.parse(content);
  const required = ['debug_id', 'issue'];
  const missing = required.filter(k => !(k in data));
  if (missing.length > 0) {
    console.error(`Missing fields: ${missing.join(', ')}`);
    process.exit(1);
  }
  console.log('Debug log is valid.');
}

const args = process.argv.slice(2);
const command = args[0];

if (command === 'scaffold') {
  scaffoldDebugLog(args[1]);
} else if (command === 'validate') {
  validateDebugLog(args[1]);
} else {
  console.log('Usage: debug-track.js <scaffold|validate> [args]');
  console.log('  scaffold <issue-description>');
  console.log('  validate <filepath>');
}
