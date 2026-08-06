import skillsCatalog from './skills-catalog.json';

export const repoUrl = 'https://github.com/dimdimah/project-ai-skills-skill';

export const skills = skillsCatalog;

export const topicOrder = ['planning', 'build', 'verify', 'security', 'team', 'docs'];

export const topics = topicOrder.map((id) => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1) }));
