# 数据光盘刻录指南

可[在线阅读](https://nanocm.github.io/optical-disc-writing-guide/)，也可打开 [index.html](index.html) 离线阅读。文章涵盖盘片、光驱、文件系统、会话、续写和逐文件校验；[写入行为记录](experiment-notes.html)另列 DVD-R 与 DVD-RW 的三盘实验。网页所需的图示和截图位于 `assets/`。

GitHub Pages 从 `main` 分支的仓库根目录发布；入口为 `index.html`。网页资源使用相对路径。发布时保留 `index.html`、`experiment-notes.html`、`assets/` 和 `.nojekyll`；`qa/` 与原版 PDF 不纳入仓库。

编辑文章时修改 `chapters/*.md`，再执行：

```bash
npm ci
npm run build
npm run check
```

`build.cjs` 生成合并的 `content.md`、两张 HTML 页面和图示；`check.cjs` 检查资源路径、来源锚点和图片数量。构建需要 Node.js，浏览页面不需要。图示源文件是 `diagrams.cjs`；页面样式和交互分别在 `style.css`、`app.js`。

本指南基于 Bedcore《数据光盘刻录理论入门》V1.0.2 改写。基础版本见 [Bedcore 的 Bilibili 视频](https://www.bilibili.com/video/BV1itur6qExK/)；本仓库不镜像其 PDF 或 HTML。改写作品按 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans) 分享，具体图像来源见[授权说明](LICENSE.md)。价格、型号及社区固件信息请按当前实物和资料核对。

站点地图位于 [sitemap.xml](sitemap.xml)。若要在 Google Search Console 查看收录情况，请添加网址前缀属性 `https://nanocm.github.io/optical-disc-writing-guide/`，按提示验证所有权，再提交该站点地图。网址检查工具可分别请求收录主页和写入行为记录页；提交后仍需等待 Google 抓取和判断是否收录。
