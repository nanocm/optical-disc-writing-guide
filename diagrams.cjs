const fs = require('node:fs');
const path = require('node:path');

const out = path.join(__dirname, 'assets', 'diagrams');
fs.mkdirSync(out, { recursive: true });

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const ink = '#17364a';
const muted = '#4c6474';
const blue = '#0e7195';
const teal = '#157d76';
const orange = '#b55e2d';

function txt(x, y, lines, { size = 18, weight = 400, color = ink, anchor = 'start', leading = 27 } = {}) {
  return lines.map((line, i) => `<text x="${x}" y="${y + i * leading}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(line)}</text>`).join('');
}
function rect(x, y, w, h, fill = '#fff', stroke = '#c8dce5', radius = 16) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}
function box(x, y, w, h, title, body, fill = '#fff', color = blue) {
  return rect(x, y, w, h, fill) + txt(x + 20, y + 37, [title], { size: 22, weight: 750, color }) + txt(x + 20, y + 69, body, { size: 17, color: muted, leading: 26 });
}
function arrow(x1, y1, x2, y2, color = blue) {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3" marker-end="url(#arrow)"/>`;
}
function svg(name, title, desc, height, body) {
  const source = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10 z" fill="${blue}"/></marker></defs><rect width="960" height="${height}" fill="#f6fafc"/><g font-family="Noto Sans CJK SC, Microsoft YaHei, PingFang SC, sans-serif">${body}</g></svg>`;
  fs.writeFileSync(path.join(out, `${name}.svg`), source, 'utf8');
}

svg('disc-families', '常见数据光盘容量', 'CD、DVD、BD 的常见容量以及一次写入和可擦写类型。', 345,
  txt(30, 48, ['CD、DVD 与 BD 的常见容量'], { size: 27, weight: 800 }) +
  box(30, 75, 280, 190, 'CD', ['700 MB：最常见', 'CD-R：一次写入', 'CD-RW：可擦写'], '#e7f5fb') +
  box(340, 75, 280, 190, 'DVD', ['4.7 GB：单面单层', '8.5 GB：单面双层', '±R 一次写；±RW 可擦写'], '#e9f7f5', teal) +
  box(650, 75, 280, 190, 'BD / BDXL', ['25 / 50 GB：一层 / 两层', '100 / 128 GB：三层 / 四层', 'BD-R 一次写；BD-RE 可擦写'], '#fff3e8', orange) +
  rect(30, 286, 900, 42, '#fff', '#c8dce5', 9) +
  txt(480, 313, ['50 GB 的 BD-R DL 和 BD-RE DL 容量相同，前者一次写入，后者可以擦写。'], { size: 17, anchor: 'middle' })
);

svg('write-behavior', '一次写入与可擦写盘的更新方式', '一次写入盘在新的区域记录同名新版；可擦写盘可在相应区域重写。', 410,
  txt(30, 46, ['同名文件再次保存'], { size: 27, weight: 800 }) +
  txt(35, 103, ['一次写入盘'], { size: 20, weight: 750, color: blue }) +
  rect(205, 73, 190, 72, '#d7eaf4') + txt(300, 116, ['旧版 A'], { size: 20, weight: 700, anchor: 'middle' }) +
  rect(400, 73, 95, 72, '#fff') + txt(447, 116, ['其他数据'], { size: 15, anchor: 'middle' }) +
  rect(500, 73, 190, 72, '#bde5e4') + txt(595, 116, ['新版 A'], { size: 20, weight: 700, anchor: 'middle' }) +
  rect(695, 73, 190, 72, '#e2f3d9') + txt(790, 116, ['目录改指新版'], { size: 16, weight: 700, anchor: 'middle' }) +
  txt(205, 176, ['旧版仍占空间；删除文件也不会腾出已写入的扇区。'], { size: 18, color: muted }) +
  txt(35, 257, ['可擦写盘'], { size: 20, weight: 750, color: teal }) +
  rect(205, 226, 210, 72, '#d7eaf4') + txt(310, 269, ['旧版 A'], { size: 20, weight: 700, anchor: 'middle' }) +
  arrow(440, 262, 555, 262) +
  rect(575, 226, 310, 72, '#bde5e4') + txt(730, 269, ['写成新版 A'], { size: 20, weight: 700, anchor: 'middle' }) +
  txt(205, 330, ['编辑器能否直接保存，取决于写入模式、文件系统和软件。'], { size: 18, color: muted }) +
  rect(30, 353, 900, 42, '#fff', '#c8dce5', 9) +
  txt(480, 380, ['打开光盘时，资源管理器显示当前目录引用的文件。'], { size: 17, anchor: 'middle' })
);

svg('mid-evidence', '盘片批次记录', '记录商品号、包装声明、MID、内圈码及写入后的读回结果。', 325,
  txt(30, 47, ['购买和刻录时需要留下的盘片信息'], { size: 27, weight: 800 }) +
  box(30, 76, 207, 132, '商品号', ['确定销售系列', '如 Verbatim #43714'], '#e7f5fb') +
  box(261, 76, 207, 132, '包装声明', ['品牌、产地、制造商', '留存包装照片'], '#e9f7f5', teal) +
  box(492, 76, 207, 132, 'MID / 极性', ['供固件选择写入策略', '确认 HTL / LTH'], '#fff3e8', orange) +
  box(723, 76, 207, 132, '内圈码', ['帮助追溯批次', '拍摄盘片内圈'], '#f1edfa', '#71529a') +
  arrow(480, 214, 480, 244) +
  rect(150, 249, 660, 58, '#fff', '#97bdcb', 12) +
  txt(480, 285, ['刻录记录：光驱、固件、写速、校验和复查日期'], { size: 19, weight: 700, anchor: 'middle' })
);

svg('buying-routes', '按用途选择可录光盘', '可擦写盘用于频繁修改；旧设备读取应测试 DVD 格式；较大的固定备份可使用 BD-R。', 330,
  txt(30, 47, ['常见用途与盘片选择'], { size: 27, weight: 800 }) +
  box(30, 80, 280, 158, '反复修改文件', ['DVD±RW / BD-RE', '可擦除并重新使用', '适合临时更新'], '#e7f5fb') +
  box(340, 80, 280, 158, '交给旧设备读取', ['DVD±R 4.7 / 8.5 GB', '实测盘型与文件系统', '播放器另查视频格式'], '#e9f7f5', teal) +
  box(650, 80, 280, 158, '保存较大文件', ['BD-R 25 / 50 GB', '超过 50 GB 可看 BDXL', '核对光驱写入 Profile'], '#fff3e8', orange) +
  rect(30, 264, 900, 48, '#fff', '#c8dce5', 9) +
  txt(480, 294, ['新批次先试刻一张，完成 Verify 和重插读回。重要资料再留一份副本。'], { size: 17, anchor: 'middle' })
);

svg('compatibility-gates', '读取光盘的四个条件', '光驱识别盘型，系统找到会话并挂载文件系统，应用程序再打开文件内容。', 300,
  txt(30, 48, ['光盘无法读取时，依次检查'], { size: 27, weight: 800 }) +
  box(30, 90, 200, 125, '① 物理盘型', ['光驱 Profile', '层数与读写能力'], '#e7f5fb') + arrow(237, 153, 262, 153) +
  box(270, 90, 200, 125, '② 会话', ['找到记录区', '选择可访问的目录'], '#e9f7f5', teal) + arrow(477, 153, 502, 153) +
  box(510, 90, 200, 125, '③ 文件系统', ['ISO 9660 / UDF', '版本与扩展支持'], '#fff3e8', orange) + arrow(717, 153, 742, 153) +
  box(750, 90, 180, 125, '④ 应用内容', ['MKV、DVD-Video', '启动或加密要求'], '#f1edfa', '#71529a') +
  rect(30, 238, 900, 44, '#fff', '#c8dce5', 9) +
  txt(480, 266, ['BDXL 数据可读，不代表设备能解码或播放商业 UHD 影片。'], { size: 17, anchor: 'middle' })
);

svg('udf-history', 'UDF 修订版和典型用途', 'UDF 1.02 用于 DVD-Video；1.50 引入 VAT；2.50 用于 BD-Video；2.60 引入 BD-R 伪覆写。', 340,
  txt(30, 46, ['UDF 修订版'], { size: 27, weight: 800 }) +
  `<path d="M95 244 L865 244" stroke="${blue}" stroke-width="4"/>` +
  [[30,'1.02','1996','DVD-Video'],[215,'1.50','1997','VAT／缺陷管理'],[400,'2.01','2000','数据盘常见'],[585,'2.50','2003','BD-Video／元数据'],[770,'2.60','2005','BD-R 伪覆写']].map(([x,v,year,use]) =>
    rect(x, 90, 160, 122, '#fff', '#c8dce5', 11) + txt(x+80, 126, [v], {size:24,weight:800,color:blue,anchor:'middle'}) + txt(x+80, 153, [year], {size:16,color:muted,anchor:'middle'}) + txt(x+80, 185, [use], {size:16,weight:650,anchor:'middle'}) + `<circle cx="${x+80}" cy="244" r="8" fill="${blue}"/>`
  ).join('') +
  rect(30, 278, 900, 44, '#fff', '#c8dce5', 9) +
  txt(480, 306, ['选择版本时还要核对目标系统支持的盘型和写入布局。'], { size: 17, anchor: 'middle' })
);

svg('image-vs-build', 'ImgBurn 镜像写入与数据盘构建', 'Write image 使用镜像中的文件系统；Build 根据普通文件新建文件系统。', 390,
  txt(30, 47, ['ImgBurn 的两种写入方式'], { size: 27, weight: 800 }) +
  txt(30, 110, ['已有镜像'], { size: 19, weight: 750, color: blue }) +
  box(170, 75, 210, 115, '已有 .iso', ['文件系统与启动结构', '已经排在镜像里'], '#e7f5fb') + arrow(385, 132, 420, 132) +
  box(430, 75, 210, 115, 'Write image file', ['按镜像结构写入', '不重选 UDF'], '#e9f7f5', teal) + arrow(645, 132, 680, 132) +
  box(690, 75, 240, 115, '得到镜像光盘', ['可继续测试启动', '及目标设备读取'], '#fff3e8', orange) +
  txt(30, 270, ['普通文件'], { size: 19, weight: 750, color: teal }) +
  box(170, 235, 210, 115, '普通文件夹', ['照片、文档、压缩包', '或一个 .iso 文件'], '#e7f5fb') + arrow(385, 292, 420, 292) +
  box(430, 235, 210, 115, 'Build 数据盘', ['Write files/folders', '选择文件系统与卷标'], '#e9f7f5', teal) + arrow(645, 292, 680, 292) +
  box(690, 235, 240, 115, '得到数据光盘', ['若源仅是 .iso 文件', '盘上也只见该文件'], '#fff3e8', orange)
);

svg('windows-modes', 'Windows Live 与 Mastered', 'Live 在复制时逐步写盘；Mastered 先列入待刻录文件，点击刻录后才写盘。', 390,
  txt(30, 47, ['Windows 的两种数据盘写入方式'], { size: 27, weight: 800 }) +
  txt(30, 110, ['像 U 盘一样使用'], { size: 18, weight: 750, color: blue }) +
  box(220, 75, 195, 118, '初始化 UDF', ['可能占用少量空间', '不是整盘清零'], '#e7f5fb') + arrow(420, 132, 450, 132) +
  box(460, 75, 195, 118, '复制时写入', ['逐步追加或更新', '盘型影响保存行为'], '#e9f7f5', teal) + arrow(660, 132, 690, 132) +
  box(700, 75, 230, 118, '弹出后重插', ['验证新旧文件', '可用哈希复查'], '#fff3e8', orange) +
  txt(30, 254, ['与 CD/DVD 播放器', '一起使用'], { size: 17, weight: 750, color: teal, leading: 24 }) +
  box(220, 235, 195, 118, '文件先排队', ['准备好写入', '尚未刻到盘上'], '#e7f5fb') + arrow(420, 292, 450, 292) +
  box(460, 235, 195, 118, '执行刻录', ['写入一批文件', '再添加前查会话'], '#e9f7f5', teal) + arrow(660, 292, 690, 292) +
  box(700, 235, 230, 118, '弹出后重插', ['检查文件与会话', '再判断是否追加'], '#fff3e8', orange)
);

svg('multisession', '两次写入后的盘面与文件目录', '第二会话导入旧目录后可显示 A 和 B；未导入时当前目录可能只显示 B。', 430,
  txt(30, 46, ['第二次刻录后的目录'], { size: 27, weight: 800 }) +
  txt(30, 110, ['盘上顺序'], { size: 20, weight: 750, color: blue }) +
  rect(180, 75, 235, 83, '#d7eaf4') + txt(297, 109, ['会话 1'], { size: 19, weight: 800, anchor: 'middle' }) + txt(297, 139, ['A.txt + 目录 A'], { size: 17, anchor: 'middle' }) +
  rect(420, 75, 65, 83, '#fff') + txt(452, 123, ['间隔'], { size: 15, anchor: 'middle' }) +
  rect(490, 75, 255, 83, '#bde5e4') + txt(617, 109, ['会话 2'], { size: 19, weight: 800, anchor: 'middle' }) + txt(617, 139, ['B.txt + 新目录'], { size: 17, anchor: 'middle' }) +
  rect(750, 75, 180, 83, '#f1f5f7') + txt(840, 123, ['剩余空白'], { size: 17, anchor: 'middle' }) +
  arrow(610, 166, 610, 216) +
  box(30, 232, 425, 126, '导入旧目录', ['新目录引用 A.txt 和 B.txt', '当前目录显示两份文件'], '#e9f7f5', teal) +
  box(505, 232, 425, 126, '没有导入旧目录', ['新目录只列出 B.txt', 'A 的扇区仍在，但可能不可见'], '#fff3e8', orange) +
  txt(480, 397, ['续写前，确认待刻录项目包含旧文件。'], { size: 18, weight: 700, anchor: 'middle' })
);

svg('archive-workflow', '数据光盘备份流程', '整理文件并生成校验清单，刻录后重插读回，登记盘片并保存另一副本。', 325,
  txt(30, 47, ['从整理文件到读回校验'], { size: 27, weight: 800 }) +
  box(30, 90, 160, 142, '① 整理源文件', ['固定目录', '不再改动源'], '#e7f5fb') + arrow(194, 160, 214, 160) +
  box(220, 90, 160, 142, '② 生成清单', ['逐文件 SHA-256', '硬盘留副本'], '#e9f7f5', teal) + arrow(384, 160, 404, 160) +
  box(410, 90, 160, 142, '③ 刻录', ['核对 Profile', '写入 + Verify'], '#fff3e8', orange) + arrow(574, 160, 594, 160) +
  box(600, 90, 160, 142, '④ 重插读回', ['比较文件哈希', '必要时异机读'], '#e7f5fb') + arrow(764, 160, 784, 160) +
  box(790, 90, 140, 142, '⑤ 登记保存', ['盒装编号', '再留一副本'], '#e9f7f5', teal) +
  rect(30, 259, 900, 48, '#fff', '#c8dce5', 9) +
  txt(480, 289, ['刻录当天的校验无法代替日后的抽检与资料迁移。'], { size: 17, anchor: 'middle' })
);

console.log('Updated core diagrams.');
