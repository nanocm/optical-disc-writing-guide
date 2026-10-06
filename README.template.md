# 数据光盘刻录指南

[网页版](https://nanocm.github.io/optical-disc-writing-guide/) · [写入行为记录（Markdown）](experiment-notes.md) · [授权与图片来源](LICENSE.md)

{{GUIDE}}

---

## 仓库维护

README 和网页由 `chapters/*.md` 生成。修改正文后运行：

```bash
npm ci
npm run build
npm run check
```

`build.cjs` 生成 `content.md`、`README.md`、两张 HTML 页面和图示。网页资源位于 `assets/`，GitHub Pages 从 `main` 分支根目录发布。`qa/` 和 Bedcore 的原版 PDF、HTML 不纳入仓库。

[站点地图](https://nanocm.github.io/optical-disc-writing-guide/sitemap.xml)包含主页和写入行为记录页。需要查看 Google 收录情况时，可在 Search Console 添加网址前缀属性 `https://nanocm.github.io/optical-disc-writing-guide/`，验证后提交站点地图。
