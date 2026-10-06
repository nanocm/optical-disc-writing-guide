## 二、光驱的读写能力

### 2.1 机芯尺寸与连接方式

光驱按机芯可分为 5.25 英寸厚机和约 9／12 mm 的薄机；外置 USB 产品则可能装着其中任一种。厚机通常更适合连续刻录和多层盘。薄机写单层盘也够用，实际表现还看供电、散热、固件和盘片。

<div class="figure-grid figure-grid-photos" aria-label="厚薄机和内外置光驱照片"><figure><img src="assets/figures/pdf-00.png" alt="台式厚机与笔记本薄型内置机芯" loading="lazy"><figcaption>两种内置机芯</figcaption></figure><figure><img src="assets/figures/pdf-01.png" alt="厚机外置盒与薄型 USB 外置光驱" loading="lazy"><figcaption>两种外置形态</figcaption></figure></div>

### 2.2 面板标志与实际 Profile

“蓝光刻录机”有时只能写 25／50 GB BD，有些还能写 BDXL。查看完整型号、硬件修订、固件、连接方式和设备的 `Profiles`，分别确认 DVD±R／DL／RAM、BD-R DL 及各层 BDXL 的写入能力。ImgBurn 报告 `Found 1 BD-RE XL` 只说明发现相关 Profile，不能推及所有 XL 盘型。读取 UHD 电影盘、商业软件的 AACS 2.x 播放链，以及质量扫描所需的厂商命令，也各要单独验证。[S3]

外置盒增加一道 USB 桥接。若软件认出内部 `ASUS BW-16D1HT`，却报告 USB 2.0，应查 Windows 设备树的协商速度、盒体规格和连续读取曲线。只换电脑接口未必改变桥接方式，USB 2.0 也可能限制高倍速 BD 读写。

面板上的 `CD-RW`、`DVD Multi Recorder`、`BD-RE` 通常提示写入能力；`DVD-ROM`、`DVD Multi Player`、`BD-ROM` 提示读取能力。`BD Combo` 通常刻 CD／DVD、只读 BD，刷固件也无法增添 BD 写入硬件。方框式 `RW` 是 DVD 加号格式标志；CD-RW 的 High Speed／Ultra Speed 表示速度类别。面板可能被替换，仍须核对 Profile。

<div class="figure-grid" aria-label=" CD 与 DVD 面板标志"><figure><img src="assets/figures/pdf-02.png" alt="Compact Disc 标志" loading="lazy"><figcaption>CD</figcaption></figure><figure><img src="assets/figures/pdf-03.png" alt="CD ReWritable 标志" loading="lazy"><figcaption>CD-RW</figcaption></figure><figure><img src="assets/figures/pdf-04.png" alt="CD-RW Ultra Speed Plus 标志" loading="lazy"><figcaption>CD-RW Ultra Speed+</figcaption></figure><figure><img src="assets/figures/pdf-05.png" alt="DVD-ROM 标志" loading="lazy"><figcaption>DVD-ROM</figcaption></figure><figure><img src="assets/figures/pdf-06.png" alt="DVD Multi Recorder 标志" loading="lazy"><figcaption>DVD Multi Recorder</figcaption></figure><figure><img src="assets/figures/pdf-07.png" alt="DVD Multi Player 标志" loading="lazy"><figcaption>DVD Multi Player</figcaption></figure><figure><img src="assets/figures/pdf-08.png" alt="DVD 加号格式联盟标志" loading="lazy"><figcaption>DVD+R DL</figcaption></figure><figure><img src="assets/figures/pdf-09.png" alt="DVD 加号可擦写格式标志" loading="lazy"><figcaption>DVD+RW</figcaption></figure></div>

DVD M-DISC 标志提示光驱为原始 DVD M-DISC 准备了写入策略。HD DVD 曾与 BD 竞争，如今介质和设备都少见。`Blu-ray Disc` 表示蓝光家族，`BDXL` 对应三层或四层的大容量盘，`Ultra HD Blu-ray` 则涉及电影播放规范。选购时应分别核对 BDXL 的读写 Profile，以及商业 UHD 播放所需的软件和 AACS 条件。[S3]

<div class="figure-grid" aria-label="其他介质标志"><figure><img src="assets/figures/pdf-10.png" alt="纵向 M-DISC 标志" loading="lazy"><figcaption>M-DISC 纵向</figcaption></figure><figure><img src="assets/figures/pdf-11.png" alt="横向 M-DISC 标志" loading="lazy"><figcaption>M-DISC 横向</figcaption></figure><figure><img src="assets/figures/pdf-12.png" alt="HD DVD 标志" loading="lazy"><figcaption>HD DVD</figcaption></figure><figure><img src="assets/figures/pdf-13.png" alt="Blu-ray Disc 标志" loading="lazy"><figcaption>Blu-ray Disc</figcaption></figure><figure><img src="assets/figures/pdf-14.jpg" alt="BDXL 标志" loading="lazy"><figcaption>BDXL</figcaption></figure><figure><img src="assets/figures/pdf-15.png" alt="Ultra HD Blu-ray 标志" loading="lazy"><figcaption>Ultra HD Blu-ray</figcaption></figure></div>

华硕 E-GREEN 涉及电源／静音管理，明基 SolidBurn 尝试为未知盘片优化写入策略。LightScribe 和 LabelFlash 曾用激光在特定盘面上刻印标签。这些标志与数据面的纠错能力或保存年限无关。

<div class="figure-grid" aria-label="厂商功能标志"><figure><img src="assets/figures/pdf-16.png" alt="ASUS E-GREEN 标志" loading="lazy"><figcaption>E-GREEN</figcaption></figure><figure><img src="assets/figures/pdf-17.png" alt="BenQ SolidBurn 标志" loading="lazy"><figcaption>SolidBurn</figcaption></figure><figure><img src="assets/figures/pdf-18.png" alt="LightScribe 标志" loading="lazy"><figcaption>LightScribe</figcaption></figure><figure><img src="assets/figures/pdf-19.png" alt="LabelFlash 标志" loading="lazy"><figcaption>LabelFlash</figcaption></figure></div>

### 2.3 光驱类型与可写盘型

`CD-ROM`、`DVD-ROM` 是只读机；`CD-RW` 可写 CD，`DVD-RW／DVD±RW` 通常可写 CD 和 DVD。`BD-ROM` 以只读 BD 为主，通常不刻 CD／DVD；`BD Combo` 通常读 BD、刻 CD／DVD；`BD-RE` 刻录机还能写 BD。

标称 BDXL 的 Combo 机可能只读 XL，BD 刻录机也未必能写每种 XL 盘。DVD±R DL、DVD-RAM、BD-RE TL 等细项都要查各自的读写 Profile。

某些刻录机支持将 `DVD+R/+RW` 的 `Book Type` 设为 `DVD-ROM`，改善旧播放器识别；盘仍是加号格式。播放还取决于文件系统和 DVD-Video 结构。

### 2.4 历代代表机型

从 CD 到 BD 的代表型号包括：CD 时代的 Plextor Premium、Yamaha CRW-F1；DVD 时代的 Plextor PX-716A／PX-760A、BenQ DW1620／DW1640／DW1650、Pioneer DVR-111、Sony Optiarc AD-7280S／TEAC DV-W5500S；BD 时代的 Pioneer BDR-S13J-X／BDR-213JBK、Lite-On iHBS112／212／312、HLDS WH16NS60。今天购买 CD／DVD 时代老机时，激光器、皮带、主轴和电容的状态比旧日口碑更重要。OEM 机芯、产线和主控也可能随硬件修订改变。

### 2.5 光驱寿命与写入速度

消费光驱通常没有可靠的“最多刻多少张”额定值。激光器、机械件、积尘、散热和供电都会影响寿命。可记录同一 MID、同一速度下的失败率、Verify 及读取曲线：只有一张旧盘难读，先查盘；多种良盘均出错，再查光驱。

固件只为部分盘片和速度组合准备写入策略。现代 16× DVD 强制降到极低速度可能更差。新批次先选双方支持的中档速度试刻，保留日志，Verify、重插读回。比较写速时，扫描机和扫描速度要固定。[S8]

### 2.6 UHD Friendly、官方 UHD、LibreDrive 与刷机

MakeMKV 社区把能借助相应固件读取 UHD 光盘原始数据、但不属于官方 UHD 播放链的部分机型称为 **UHD Friendly**；`WH16NS60`、`BU40N` 等被列在 **Official** 路线。**LibreDrive** 是 MakeMKV 显示的原始访问能力状态，不是机型标志。即使刷入 Official 路线固件，PowerDVD 等商业播放器所需的 AACS 2.x 资格也不会自动出现。[S3]

[MakeMKV 社区指南](https://forum.makemkv.com/forum/viewtopic.php?f=16&t=19634)列出的部分机芯如下。目标固件是社区读取方案，并非厂商升级建议。[S3]

| 机芯 | 类别 | 指南所列固件及条件 |
| --- | --- | --- |
| ASUS `BW-16D1HT`／`BW-16D1HT Pro`，5.25 英寸 | Friendly | `BW-16D1HT 3.10MK`；外置 `BW-16D1H-U` 须先查内部机芯 |
| LG `WH14NS40`、`WH16NS40`、`BH16NS55`，5.25 英寸 | Friendly | 符合平台、服务码条件者：`WH16NS60 1.02MK`；跨型号须核对硬件 |
| LG `WH16NS60`，5.25 英寸 | Official | `WH16NS60 1.02MK` |
| LG `BU40N`，9.5 mm 薄机 | Official | `BU40N 1.03MK`；不可用台式机固件 |
| LG `BP60NB10`、`BP50NB40`，USB 薄机 | Official／“Officialish” | `BP60NB10 1.02MK`；`BP50NB40` 限指定 `NB50/52`，`NB72` 不支持该方案 |
| Pioneer `BDR-XD08UMB-S`、`BDR-S12UHT`、`BDR-S13UBK` 等 | 社区可用机型 | 新固件可能阻止跨刷；须核对型号及当前版本 |

LG／ASUS MediaTek 机芯须看机身生产时期（通常 2016 年之后）、MakeMKV 的 `Drive Platform: MT1959`，以及 LG 的 `SVC NS50` 或更新服务码；薄机核对 `NB50` 或更新。ASUS `BW-16D1HT 3.11`、LG `WH16NS40-NS50 1.05` 等较新 OEM 固件可能加密，降级检查不同于早期固件。USB 桥接器也可能不传递刷写命令。[S3]

部分 Friendly 机芯有 *sleep bug*：UHD 盘闲置约两分钟后可能停读，需弹出再关入。兼容的 Official 路线固件可规避此问题，但台式机与薄机不可互刷；某些 ASUS／LG 跨家族固件还会使光驱失去刻录能力。刷机也不会取得商业软件所需的 AACS 2 资格。[S3]

`BW-16D1HT` 若报告 `MT1959`、`LibreDrive 已启用`、`BD 原始数据读取：是`，MakeMKV 的原始读取路径已可用。要判断 `3.10` 是否为 `3.10MK`，还要看“固件类型”的补丁说明。功能已经满足需求，就无须再跨刷。

准备刷写前，保存自己的 Drive Information、固件版本和能由工具读出的固件备份，记录 SHA-256，再确认目标文件与硬件平台、机芯厚薄和固件家族对应。从网上下载同版本 `.bin` 不等于读出了自己光驱的身份或校准数据；能备份哪些区域由机芯和工具决定。刷完先读一张已知良盘；还要刻一张可牺牲盘并 Verify，确认写入能力没有受影响。社区指南目前提到 SDF GUI 及加密固件检测，但工具的防错检查不能代替逐项核对。[S3]

### 2.7 Disc Information 与质量扫描

ImgBurn 的 Disc Information 显示盘的空白／完整状态、会话、MID、可用速度、BD 层数与记录极性；Verify 则读回刚写的数据。Opti Drive Control 的 Disc Quality 还要求光驱支持相应厂商扫描命令。遇到 `No suitable disc inserted`，先看盘上是否已有数据，再查介质、驱动器与插件是否受支持。选择“ASUS 插件”或刷入补丁，并不会给光驱增加原本没有的扫描能力。`Create Test Disc` 会写入测试数据，只适合可牺牲的空白盘。已写好的档案盘可做非破坏性读取或扫描，最终仍须逐文件校验。
