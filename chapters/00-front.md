本文基于 Bedcore《数据光盘刻录理论入门》V1.0.2 改写，按 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.zh-hans) 分享。[Bedcore 的视频](https://www.bilibili.com/video/BV1itur6qExK/)是基础版本的获取入口。产品、固件与软件资料核查于 2026-10-06。

备好文件后，可直接从第五章的刻录步骤读起；遇到盘型、光驱或兼容性问题，再查前四章。

| 要做什么 | 介质与写入方式 | 写完怎样确认 |
| --- | --- | --- |
| 备份已整理好的一批文件 | DVD±R／BD-R；用 ImgBurn `Write files/folders to disc` 一次写入 | Verify、弹出重插、逐文件哈希 |
| 制作 Linux 安装盘或恢复盘 | 容量足够的空白盘；用 `Write image file to disc` 按原镜像写入 | 核对下载哈希、刻后校验，并在目标电脑试启动 |
| 分几周陆续添加文件 | Windows Live 或已验证可导入旧会话的刻录软件 | 每次重插后同时打开旧文件与新文件 |
| 经常修改、删除和复用 | DVD±RW／BD-RE；先测试所选 UDF 写入模式 | 保存、弹出、重插、读回，再测试擦除 |
| 长期保存不可替代的资料 | 固定快照与校验清单，至少两份放在不同地点或介质上 | 定期重读，并在设备或介质老化前迁移 |

将 `movie.mkv` 复制到 DVD，只会得到数据盘；DVD-Video 需要另做编排。安装镜像也要按镜像写盘，直接复制 `linux.iso` 不会做出启动盘。[S5][S6]
