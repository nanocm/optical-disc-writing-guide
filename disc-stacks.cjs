const fs = require('node:fs');
const path = require('node:path');

const out = path.join(__dirname, 'assets', 'diagrams');
fs.mkdirSync(out, { recursive: true });

const color = {
  ink: '#17364a', muted: '#486476', border: '#bfd5df', paper: '#ffffff',
  print: '#eac5a7', lacquer: '#91c8d8', reflector: '#9eafbb',
  dye: '#e9a565', inorganic: '#c77762', phase: '#a981c9', dielectric: '#d4bfe4',
  pc: '#d5e8f4', glue: '#b9dbc5', cover: '#9dd9e4',
  hard: '#58b6ca', pit: '#627f96', spacer: '#d6e9d0',
};

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
function rect(x, y, w, h, fill, stroke = 'none', radius = 0, extra = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
}
function tx(x, y, lines, size = 16, opts = {}) {
  const items = Array.isArray(lines) ? lines : [lines];
  const anchor = opts.anchor || 'start';
  const fill = opts.fill || color.ink;
  const weight = opts.weight || 400;
  const leading = opts.leading || size * 1.3;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}">` +
    items.map((line, i) => `<tspan x="${x}" dy="${i ? leading : 0}">${esc(line)}</tspan>`).join('') +
    '</text>';
}
function line(x1, y1, x2, y2, stroke = color.ink, width = 2, extra = '') {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${stroke}" stroke-width="${width}" fill="none" ${extra}/>`;
}
function svg(name, title, desc, height, body) {
  const source = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc">` +
    `<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>` +
    `<defs><marker id="beam-up" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#0f7d99"/></marker><marker id="beam-down" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#0f7d99"/></marker></defs>` +
    rect(0, 0, 960, height, '#f6fafc') +
    `<g font-family="Noto Sans CJK SC, Microsoft YaHei, PingFang SC, sans-serif">${body}</g></svg>`;
  fs.writeFileSync(path.join(out, `${name}.svg`), source, 'utf8');
}

function legend(x, y, rows, step, font = 15) {
  return rows.map((row, i) => {
    const yy = y + i * step;
    const words = Array.isArray(row.label) ? row.label : [row.label];
    return rect(x, yy - 12, 14, 14, row.fill, '#7896a8', 2) +
      tx(x + 23, yy, words, font, { leading: font * 1.15 });
  }).join('');
}

function panel({ x, y, w, h, title, subtitle, bands, rows, stackH, stackW = 120, legendStep = 30, legendFont = 15, bothSides = false }) {
  const sx = x + 20;
  const sy = y + 79;
  const actualH = bands.reduce((sum, band) => sum + band.h, 0);
  if (actualH !== stackH) throw new Error(`${title}: bands total ${actualH}, expected ${stackH}`);
  let cursor = sy;
  let body = rect(x, y, w, h, color.paper, color.border, 16, 'stroke-width="2"') +
    tx(x + 20, y + 34, title, 20, { weight: 760 }) +
    tx(x + 20, y + 59, subtitle, 15, { fill: color.muted });
  for (const band of bands) {
    body += rect(sx, cursor, stackW, band.h, band.fill, '#7998aa', 0, 'stroke-width="1"');
    if (band.mark === 'pits') {
      for (let k = 0; k < 5; k++) body += rect(sx + 9 + k * 23, cursor + band.h - 6, 9, 5, color.paper);
    }
    cursor += band.h;
  }
  body += rect(sx, sy, stackW, stackH, 'none', '#597c90', 1, 'stroke-width="1.5"');
  body += legend(x + 158, y + 96, rows, legendStep, legendFont);
  body += line(sx + stackW / 2, sy + stackH + 30, sx + stackW / 2, sy + stackH + 4,
    '#0f7d99', 2.5, 'marker-end="url(#beam-up)"');
  body += tx(sx + stackW / 2 + 16, sy + stackH + 25, bothSides ? '下表面也可读' : '光从下方入射', 14, { fill: '#0d728e' });
  if (bothSides) {
    body += line(sx + stackW / 2, sy - 22, sx + stackW / 2, sy - 2,
      '#0f7d99', 2.5, 'marker-end="url(#beam-down)"');
  }
  return body;
}

const L = (name, fill) => ({ label: name, fill });
const B = (h, fill, mark) => ({ h, fill, mark });

svg('cd-disc-stack', 'CD-ROM、CD-R 与 CD-RW 的盘体剖面',
  '从上方印刷面到下方读盘面展示 CD-ROM、CD-R、CD-RW。三者都从约 1.2 毫米聚碳酸酯基板一侧读取；记录区与反射层靠近顶面，薄层放大绘制。', 575,
  tx(30, 45, 'CD：记录区靠近印刷面', 28, { weight: 800 }) +
  tx(30, 72, '由上往下看；彩色薄层刻意放大，不能用图上高度推算厚度。', 16, { fill: color.muted }) +
  panel({ x: 25, y: 91, w: 290, h: 431, title: 'CD-ROM', subtitle: '模压凹坑；无独立染料层', stackH: 276,
    bands: [B(18,color.print),B(16,color.lacquer),B(14,color.reflector,'pits'),B(228,color.pc)],
    rows: [L(['印刷／标签','（可选）'],color.print),L('薄漆保护层',color.lacquer),L(['模压凹坑','＋金属反射层'],color.reflector),L(['约 1.2 mm','基板'],color.pc)], legendStep: 53, legendFont: 13 }) +
  panel({ x: 335, y: 91, w: 290, h: 431, title: 'CD-R', subtitle: '一次写入；有机染料', stackH: 276,
    bands: [B(18,color.print),B(16,color.lacquer),B(14,color.reflector),B(15,color.dye),B(213,color.pc)],
    rows: [L(['印刷／标签','（可选）'],color.print),L('薄漆保护层',color.lacquer),L('金属反射层',color.reflector),L(['有机染料','记录层'],color.dye),L(['约 1.2 mm','基板'],color.pc)], legendStep: 48, legendFont: 13 }) +
  panel({ x: 645, y: 91, w: 290, h: 431, title: 'CD-RW', subtitle: '可擦写；相变记录膜', stackH: 276,
    bands: [B(18,color.print),B(16,color.lacquer),B(14,color.reflector),B(7,color.dielectric),B(12,color.phase),B(7,color.dielectric),B(202,color.pc)],
    rows: [L(['印刷／标签','（可选）'],color.print),L('薄漆保护层',color.lacquer),L('金属反射层',color.reflector),L(['相变膜＋','两侧介电层'],color.phase),L(['约 1.2 mm','基板'],color.pc)], legendStep: 48, legendFont: 13 }) +
  tx(30, 552, 'CD 顶面只有较薄的漆层护住反射层；深划伤可能直接损坏数据。', 17, { fill: color.muted })
);

const dvdPanels = [
  { x:25,y:91,w:445,h:310,title:'DVD-ROM · 单面单层',subtitle:'模压凹坑位于两片基板之间',stackH:190,
    bands:[B(14,color.print),B(75,color.pc),B(12,color.glue),B(14,color.reflector,'pits'),B(75,color.pc)],
    rows:[L('印刷（可选）',color.print),L('上基板约 0.6 mm',color.pc),L('胶合层',color.glue),L('凹坑＋反射层',color.reflector),L('下基板约 0.6 mm',color.pc)] },
  { x:490,y:91,w:445,h:310,title:'DVD±R · 单面单层',subtitle:'有机染料记录层',stackH:190,
    bands:[B(14,color.print),B(70,color.pc),B(10,color.glue),B(12,color.reflector),B(14,color.dye),B(70,color.pc)],
    rows:[L('印刷（可选）',color.print),L('上基板约 0.6 mm',color.pc),L('胶合层',color.glue),L('金属反射层',color.reflector),L('有机染料',color.dye),L('下基板约 0.6 mm',color.pc)] },
  { x:25,y:418,w:445,h:310,title:'DVD±RW／DVD-RAM',subtitle:'单面示例；相变材料可重写',stackH:190,
    bands:[B(14,color.print),B(65,color.pc),B(10,color.glue),B(12,color.reflector),B(7,color.dielectric),B(10,color.phase),B(7,color.dielectric),B(65,color.pc)],
    rows:[L('印刷（可选）',color.print),L('上基板约 0.6 mm',color.pc),L('胶合层',color.glue),L('反射层',color.reflector),L('介电层＋相变膜',color.phase),L('下基板约 0.6 mm',color.pc)] },
  { x:490,y:418,w:445,h:310,title:'DVD+R DL · 单面双层',subtitle:'以威宝早期 +R DL 结构为例',stackH:190,
    bands:[B(14,color.print),B(52,color.pc),B(12,color.reflector),B(12,color.dye),B(18,color.spacer),B(12,color.reflector),B(12,color.dye),B(58,color.pc)],
    rows:[L('可选印刷＋上基板',color.pc),L('L1 染料＋主反射层',color.dye),L('透明间隔层',color.spacer),L('L0 染料＋半透反射层',color.reflector),L('下基板／读盘侧',color.pc)] },
  { x:25,y:745,w:445,h:310,title:'DVD-ROM · 单面双层',subtitle:'同一面聚焦读取 L0 与 L1',stackH:190,
    bands:[B(14,color.print),B(62,color.pc),B(14,color.reflector,'pits'),B(16,color.spacer),B(14,color.reflector,'pits'),B(70,color.pc)],
    rows:[L('可选印刷＋上基板',color.pc),L('远端全反射数据层',color.reflector),L('透明胶／间隔层',color.spacer),L('近端半透数据层',color.reflector),L('下基板／读盘侧',color.pc)] },
  { x:490,y:745,w:445,h:310,title:'双面 DVD · 每面单层',subtitle:'两面都读盘；标签只宜在内圈',stackH:190,bothSides:true,
    bands:[B(65,color.pc),B(15,color.reflector,'pits'),B(30,color.glue),B(15,color.reflector,'pits'),B(65,color.pc)],
    rows:[L('上表面基板',color.pc),L('上面记录／反射层',color.reflector),L('中心胶合层',color.glue),L('下面记录／反射层',color.reflector),L('下表面基板',color.pc)] },
];
svg('dvd-disc-stack', 'DVD 只读、一次写入、可擦写、双层及双面盘剖面',
  '六种 DVD 示例均展示完整盘体。单面盘由两片约 0.6 毫米基板胶合，记录层在中部；双面盘两面都要读取。', 1110,
  tx(30, 45, 'DVD：记录区夹在两片基板之间', 28, { weight: 800 }) +
  tx(30, 72, '单面盘从下表面读取；双层与双面是不同概念。', 16, { fill: color.muted }) +
  dvdPanels.map(p => panel({ ...p, stackW:125, legendStep:28, legendFont:15 })).join('') +
  tx(30, 1088, 'DVD 双层的具体薄膜和胶层次序可能因盘型与厂家而异；图中结构不按比例。', 17, { fill: color.muted })
);

const bdPanels = [
  { x:25,y:91,w:445,h:310,title:'BD-ROM · 单层',subtitle:'模压凹坑，无可写记录膜',stackH:190,
    bands:[B(14,color.print),B(122,color.pc),B(14,color.reflector,'pits'),B(32,color.cover),B(8,color.hard)],
    rows:[L('印刷（可选）',color.print),L('约 1.1 mm 基板',color.pc),L('凹坑＋反射层',color.reflector),L('透明覆盖层',color.cover),L('硬涂层（可选）',color.hard)] },
  { x:490,y:91,w:445,h:310,title:'BD-R HTL · 单层',subtitle:'无机记录材料的典型结构',stackH:190,
    bands:[B(14,color.print),B(106,color.pc),B(11,color.reflector),B(7,color.dielectric),B(14,color.inorganic),B(7,color.dielectric),B(23,color.cover),B(8,color.hard)],
    rows:[L('可选印刷＋约 1.1 mm 基板',color.pc),L('反射层',color.reflector),L('无机记录膜＋保护层',color.inorganic),L('透明覆盖层',color.cover),L('硬涂层（可选）',color.hard)] },
  { x:25,y:418,w:445,h:310,title:'BD-R LTH · 单层',subtitle:'有机染料结构示例',stackH:190,
    bands:[B(14,color.print),B(111,color.pc),B(12,color.reflector),B(14,color.dye),B(8,color.glue),B(23,color.cover),B(8,color.hard)],
    rows:[L('可选印刷＋约 1.1 mm 基板',color.pc),L('反射层',color.reflector),L('有机染料记录层',color.dye),L('接合／保护层',color.glue),L('覆盖层＋可选硬涂层',color.cover)] },
  { x:490,y:418,w:445,h:310,title:'BD-RE · 单层',subtitle:'相变记录材料；可擦写',stackH:190,
    bands:[B(14,color.print),B(109,color.pc),B(11,color.reflector),B(8,color.dielectric),B(12,color.phase),B(8,color.dielectric),B(20,color.cover),B(8,color.hard)],
    rows:[L('可选印刷＋约 1.1 mm 基板',color.pc),L('反射层',color.reflector),L('保护层＋相变膜',color.phase),L('透明覆盖层',color.cover),L('硬涂层（可选）',color.hard)] },
];
svg('bd-disc-stack', 'BD-ROM、BD-R HTL、BD-R LTH 与 BD-RE 盘体剖面',
  'BD 从覆盖层与表面硬涂层一侧读写。约 1.1 毫米基板位于印刷面与记录区之间；记录层材料随 BD-ROM、HTL、LTH、BD-RE 而异。', 785,
  tx(30, 45, 'BD：记录区靠近读盘面', 28, { weight: 800 }) +
  tx(30, 72, '硬涂层位于覆盖层外侧，是否采用及具体材料依产品而定；图中薄膜放大。', 16, { fill: color.muted }) +
  bdPanels.map(p => panel({ ...p, stackW:125, legendStep:29, legendFont:15 })).join('') +
  tx(30, 763, 'BD-R 的 HTL／LTH 指写入前后反射率变化方向，不代表反射层金属的种类。', 17, { fill: color.muted })
);

function multiCard(x, title, capacity, layers, accent) {
  const y = 90, w = 210, h = 488;
  const sx = x + 34, sw = 118;
  let body = rect(x, y, w, h, color.paper, color.border, 16, 'stroke-width="2"') +
    tx(x + 16, y + 35, title, 19, { weight: 750, fill: accent }) +
    tx(x + 16, y + 62, capacity, 16, { fill: color.muted });
  body += rect(sx, y + 91, sw, 17, color.print, '#7998aa');
  body += rect(sx, y + 108, sw, 272, color.pc, '#7998aa');
  body += tx(sx + sw/2, y + 180, ['约 1.1 mm', '基板'], 17, { anchor:'middle', fill: color.muted, leading:24 });
  const layerYs = ({
    1: [380], 2: [380, 398], 3: [380, 398, 413], 4: [380, 395, 410, 425],
  })[layers].map(offset => y + offset);
  for (let i = 0; i < layerYs.length; i++) {
    body += rect(sx, layerYs[i] - 5, sw, 10, accent, '#5c7792', 0, 'stroke-width="1"');
    if (i < layerYs.length - 1) body += rect(sx, layerYs[i] + 5, sw, layerYs[i+1] - layerYs[i] - 10, color.spacer, 'none');
  }
  const farthest = layerYs[layerYs.length - 1];
  body += rect(sx, farthest + 5, sw, y + 453 - (farthest + 5), color.cover, '#7998aa');
  body += rect(sx, y + 453, sw, 10, color.hard, '#7998aa');
  body += tx(sx + sw/2, (farthest + 5 + y + 453)/2 + 5, '覆盖层', 13, { anchor:'middle', fill: color.ink });
  body += line(sx + sw/2, y + 483, sx + sw/2, y + 467, '#0f7d99', 2.5, 'marker-end="url(#beam-up)"');
  body += tx(x + 160, y + 481, '光头', 13, { fill: '#0d728e' });
  body += tx(x + 160, y + 399, `${layers} 层`, 13, { weight: 650, fill: accent });
  return body;
}
svg('recording-layers', 'BD 单层至四层的完整盘体与层位',
  '四个盘体从上方印刷面、约 1.1 毫米基板、记录层与透明间隔层、覆盖层、表面硬涂层到下方读盘面。BDXL 多层记录区在同一面，由光头改变焦点读取。', 620,
  tx(30, 45, 'BD：单层、双层、三层、四层', 28, { weight: 800 }) +
  tx(30, 72, '印刷面在上，读盘面在下；绿色表示记录层之间的透明材料。', 16, { fill: color.muted }) +
  multiCard(25, 'BD-R', '25 GB · 单层', 1, '#0e7195') +
  multiCard(260, 'BD-R DL', '50 GB · 双层', 2, '#137c78') +
  multiCard(495, 'BDXL TL', '100 GB · 三层', 3, '#b55e2d') +
  multiCard(730, 'BDXL QL', '128 GB · 四层', 4, '#75539c') +
  tx(30, 605, '底部细蓝条示意可选硬涂层；多层记录区与覆盖层放大绘制，实际集中在近读盘面约 100 µm 内。', 16, { fill: color.muted })
);

console.log('Wrote four disc cross-section diagrams.');
