const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const guide = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const article = fs.readFileSync(path.join(root, 'content.md'), 'utf8');
const errors = [];

const sourceVideo = 'https://www.bilibili.com/video/BV1itur6qExK/';
if (!guide.includes(sourceVideo)) errors.push('Missing Bedcore video attribution');
if (fs.existsSync(path.join(root, 'assets', 'bedcore-v102.pdf'))) errors.push('Original PDF is still inside the publication directory');
for (const name of ['README.md', 'LICENSE.md', 'content.md', 'index.html']) {
  if (fs.readFileSync(path.join(root, name), 'utf8').includes('assets/bedcore-v102.pdf')) {
    errors.push(`${name}: link to an unpublished PDF`);
  }
}

for (const word of ['原稿', '本地', '融合核对']) {
  if (article.includes(word)) errors.push(`Reader-facing article still contains: ${word}`);
}
if (/原文(?!件)/.test(article)) errors.push('Reader-facing article still contrasts with the source text');

for (const pageName of ['index.html', 'experiment-notes.html']) {
  const html = fs.readFileSync(path.join(root, pageName), 'utf8');
  for (const [, ref] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (ref.startsWith('#') || /^(https?:|mailto:|data:)/i.test(ref)) continue;
    const local = ref.split(/[?#]/, 1)[0];
    if (!local) continue;
    const target = path.resolve(root, local);
    if (!target.startsWith(root + path.sep) || !fs.existsSync(target)) {
      errors.push(`${pageName}: missing or non-portable link ${ref}`);
    }
  }
}

const diagramRefs = [...guide.matchAll(/<img src="(assets\/diagrams\/[^"]+\.svg)"/g)].map(match => match[1]);
const figureRefs = [...guide.matchAll(/<img src="(assets\/figures\/[^"]+)"/g)].map(match => match[1]);
for (const image of guide.match(/<img\b[^>]*>/g) || []) {
  if (!/\balt="[^"]+"/.test(image)) errors.push(`Image without alt text: ${image.slice(0, 80)}`);
}
if (diagramRefs.length !== 14 || new Set(diagramRefs).size !== 14) errors.push(`Expected 14 distinct diagrams, found ${diagramRefs.length}`);
if (figureRefs.length !== 20) errors.push(`Expected 20 disc/drive photographs and marks, found ${figureRefs.length}`);
for (const ref of diagramRefs) {
  const svg = fs.readFileSync(path.join(root, ref), 'utf8');
  if (!svg.includes('<title') || !svg.includes('<desc') || !svg.endsWith('</svg>')) errors.push(`${ref}: missing SVG description or closing tag`);
}

const sourceIds = new Set([...guide.matchAll(/id="(source-s\d+)"/g)].map(match => match[1]));
const sourceRefs = [...guide.matchAll(/class="source-ref" href="#(source-s\d+)"/g)].map(match => match[1]);
for (const ref of sourceRefs) if (!sourceIds.has(ref)) errors.push(`Unresolved source reference: ${ref}`);
if (sourceIds.size !== 18) errors.push(`Expected 18 source entries, found ${sourceIds.size}`);

const report = {
  pages: 2,
  sections: (guide.match(/<h[2-4] id="section-/g) || []).length,
  diagrams: diagramRefs.length,
  photographsAndMarks: figureRefs.length,
  sourceReferences: sourceRefs.length,
  errors,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
