# 数据光盘刻录指南

打开 [index.html](index.html) 即可离线阅读。文章涵盖盘片、光驱、文件系统、会话、续写和逐文件校验；[写入行为记录](experiment-notes.html)另列 DVD-R 与 DVD-RW 的三盘实验。网页所需的图示和截图位于 `assets/`。

可将本目录作为 GitHub 仓库根目录。推送后在 **Settings → Pages → Build and deployment** 选择 **Deploy from a branch**、`main`、`/ (root)`；入口为 `index.html`。网页只使用相对路径，仓库名可用 `optical-disc-writing-guide`，站点地址将是 `https://<用户名>.github.io/optical-disc-writing-guide/`。发布时保留 `index.html`、`experiment-notes.html`、`assets/` 和 `.nojekyll`；`qa/` 与原版 PDF 不纳入仓库。

编辑文章时修改 `chapters/*.md`，再执行：

```bash
npm ci
npm run build
npm run check
```

`build.cjs` 生成合并的 `content.md`、两张 HTML 页面和图示；`check.cjs` 检查资源路径、来源锚点和图片数量。构建需要 Node.js，浏览页面不需要。图示源文件是 `diagrams.cjs`；页面样式和交互分别在 `style.css`、`app.js`。

本指南基于 Bedcore《数据光盘刻录理论入门》V1.0.2 改写。基础版本见 [Bedcore 的 Bilibili 视频](https://www.bilibili.com/video/BV1itur6qExK/)；本仓库不镜像其 PDF 或 HTML。改写作品按 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans) 分享，具体图像来源见[授权说明](LICENSE.md)。价格、型号及社区固件信息请按当前实物和资料核对。
