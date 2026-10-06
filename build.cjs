const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');

require('./diagrams.cjs');
require('./disc-stacks.cjs');

const dir = __dirname;
const chapterDir = path.join(dir, 'chapters');
const chapters = fs.readdirSync(chapterDir).filter(name => /^\d\d-.*\.md$/.test(name)).sort();
if (chapters.length !== 7) throw new Error(`Expected 7 chapters, found ${chapters.length}`);
const source = chapters.map(name => fs.readFileSync(path.join(chapterDir, name), 'utf8').trim()).join('\n\n') + '\n';
fs.writeFileSync(path.join(dir, 'content.md'), source, 'utf8');

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
let html = marked.parse(source, { gfm: true });
const headings = [];
let sequence = 0;
html = html.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, (_, depth, inner) => {
  const id = `section-${++sequence}`;
  const label = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
  headings.push({ depth: Number(depth), id, label });
  return `<h${depth} id="${id}">${inner}<a class="heading-anchor" href="#${id}" aria-label="本节链接">#</a></h${depth}>`;
});
html = html.replace(/<table>[\s\S]*?<\/table>/g, table => `<div class="table-scroll">${table}</div>`);
html = html.replace(/\[S(\d+)\]/g, (_, number) => `<a class="source-ref" href="#source-s${number}" aria-label="资料 S${number}">[S${number}]</a>`);

const toc = headings.filter(item => item.depth >= 2).map(item =>
  `<a data-depth="${item.depth}" href="#${item.id}">${esc(item.label)}</a>`
).join('\n');
const extraStyle = `
  .document-body .layers { display: grid; gap: .55rem; margin: 1.4rem 0 1.8rem; }
  .document-body .layers > div { display: flex; gap: 1.1rem; align-items: baseline;
    padding: .7rem 1rem; border: 1px solid var(--line, #d9e1e9); border-radius: 9px;
    background: var(--panel, #f4f8fb); }
  .document-body .layers b { min-width: 8.5rem; color: var(--accent, #246c9c); }
  .document-body .layers span { flex: 1; }
  .document-body .source-ref { white-space: nowrap; font-size: .82em; font-weight: 700; }
  .document-body .figure-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
    gap: .7rem; margin: 1.1rem 0 1.8rem; }
  .document-body .figure-grid-photos { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .document-body .figure-grid figure { min-width: 0; margin: 0; padding: .7rem;
    background: var(--panel, #f4f8fb); border: 1px solid var(--line, #d9e1e9); border-radius: 9px;
    display: flex; flex-direction: column; justify-content: space-between; gap: .45rem; }
  .document-body .figure-grid img { display: block; width: 100%; height: 85px; object-fit: contain; }
  .document-body .figure-grid-photos img { height: 160px; }
  .document-body .figure-grid figcaption { text-align: center; line-height: 1.3;
    font-size: .78rem; color: var(--muted, #5a6672); }
  .document-body :target { scroll-margin-top: 1.5rem; }
  @media (max-width: 560px) { .document-body .layers > div { display: block; }
    .document-body .layers b { display: block; margin-bottom: .25rem; }
    .document-body .figure-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .document-body .figure-grid-photos { grid-template-columns: 1fr; } }
`;
const stylesheet = fs.readFileSync(path.join(dir, 'style.css'), 'utf8') + extraStyle;
const template = fs.readFileSync(path.join(dir, 'template.html'), 'utf8');
const page = template
  .replace('{{STYLE}}', stylesheet)
  .replace('{{SCRIPT}}', fs.readFileSync(path.join(dir, 'app.js'), 'utf8'))
  .replace('{{TOC}}', toc)
  .replace('{{CONTENT}}', html);
fs.writeFileSync(path.join(dir, 'index.html'), page, 'utf8');

const notes = marked.parse(fs.readFileSync(path.join(dir, 'experiment-notes.md'), 'utf8'), { gfm: true })
  .replace(/^<h1>[\s\S]*?<\/h1>\s*/, '')
  .replace(/<table>[\s\S]*?<\/table>/g, table => `<div class="table-scroll">${table}</div>`);
const notePage = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>写入行为记录 · 数据光盘刻录</title><style>${stylesheet}</style></head><body><header class="hero"><div class="hero-inner"><div class="eyebrow">数据光盘刻录 · 实验附录</div><h1>写入行为记录</h1><p class="hero-subtitle">DVD-R 与 DVD-RW 的三盘实验</p></div></header><div class="main-stack" style="max-width:960px;margin:30px auto;padding:0 16px 60px"><p><a href="index.html">← 返回主指南</a></p><main class="paper"><article class="document-body">${notes}</article></main></div></body></html>`;
fs.writeFileSync(path.join(dir, 'experiment-notes.html'), notePage, 'utf8');
console.log(`Built guide: ${chapters.length} chapters, ${headings.length} headings, ${source.length} Markdown characters.`);
