## 六、资料来源

网络资料核查于 2026-10-06。标准与软件用语以规范、作者说明为准；论坛扫描和盘片目录只记录具体样本。

<a id="source-s1"></a>**[S1] Bedcore《数据光盘刻录理论入门》V1.0.2。** [Bilibili 视频](https://www.bilibili.com/video/BV1itur6qExK/)，基础文档标注 2026-08-15，19 页，CC BY-SA 3.0。本指南改写了文字、章节和图示；第二章的 20 幅机芯照片及标志图取自基础文档。商标归各权利人。

<a id="source-s2"></a>**[S2] 蓝光协会 MID 名录。** [Disc Manufacturer ID & Media Type ID Licensee List](https://blu-raydisc.info/licensee-list/discmanuid-licenseelist.php)。按盘型、层数列出授权 MID、速度和 HTL／LTH；`VERBAT IMe` 同列于 CMC 与 Mitsubishi Chemical Media 名下。

<a id="source-s3"></a>**[S3] MakeMKV 社区指南。** [Ultimate UHD Drives Flashing Guide Updated 2026](https://forum.makemkv.com/forum/viewtopic.php?f=16&t=19634)，首帖的驱动器、固件、*sleep bug* 与跨刷章节。社区路线须按实机平台、服务码和当前帖文核对。

<a id="source-s4"></a>**[S4] Microsoft 多会话说明。** [Microsoft：Creating a Multisession Disc](https://learn.microsoft.com/en-us/windows/win32/imapi/creating-a-multisession-disc)。说明如何导入上一会话文件系统，以及会话与关闭状态的关系。

<a id="source-s5"></a>**[S5] Microsoft 格式概览。** [Microsoft：Disc Formats](https://learn.microsoft.com/en-us/windows/win32/imapi/disc-formats)。概述 ISO 9660、Joliet、UDF 与桥接盘。

<a id="source-s6"></a>**[S6] ImgBurn 功能。** [ImgBurn 官方 Features](https://www.imgburn.com/index.php?act=features)。列出 Read、Build、Write、Verify、Discovery 的用途。

<a id="source-s7"></a>**[S7] ImgBurn 作者答复。** [ImgBurn Forum：NOT finalizing the CD when in build mode?](https://forum.imgburn.com/topic/3859-not-finalizing-the-cd-when-in-build-mode/)，2007-04-13。作者说明 ImgBurn 没有 Build 后继续添加普通文件的多会话流程。

<a id="source-s8"></a>**[S8] ez647 盘片资料库。** [介质总目录](https://ez647.sk/media.html)、[Verbatim `VERBAT-IMe-000`](https://ez647.sk/mitsubishi_kagaku/verbatime000bdr.html)、[RITEK BR2](https://ez647.sk/ritek/ritekbr2000_bdr.html)、[JVC 记录](https://ez647.sk/jvc.html)。单盘页提供包装、内圈码和复测日期。

<a id="source-s9"></a>**[S9] Juri 单盘记录。** [BD-R 索引](http://juri.su/bdr.htm)、[LDC／BIS 汇总](http://juri.su/bdrtest.htm)、[LTH／HTL 户外对照](http://juri.su/lthhtl.htm)、[CD-R](http://juri.su/cdr.htm)、[DVD](http://juri.su/dvdr.htm)、[M-DISC](http://juri.su/mdisc.htm)。汇总表的 `Data` 日期未拆成刻录日与扫描日；户外对照则明确给出写入和最终测试日。

<a id="source-s10"></a>**[S10] 写入行为记录。** [DVD-R 与 DVD-RW 的三盘实验](experiment-notes.html)：介质、软件版本、步骤及重插读回结果。

<a id="source-s11"></a>**[S11] 卷与文件结构标准。** [Ecma International：ECMA-167](https://ecma-international.org/publications-and-standards/standards/ecma-167/)。提供光介质卷和文件结构的标准背景。

<a id="source-s12"></a>**[S12] UDF 实现文档。** [udftools：mkudffs(8)](https://man7.org/linux/man-pages/man8/mkudffs.8.html)，列有各 UDF 修订版与介质选项。

<a id="source-s13"></a>**[S13] 加拿大文物保护研究所保存指南。** [CCI Notes 19/1：Longevity of Recordable CDs and DVDs](https://www.canada.ca/en/conservation-institute/services/conservation-preservation-publications/canadian-conservation-institute-notes/longevity-recordable-cds-dvds.html)，表 2 及保存建议；表中排名未计入污染物，建议温湿度不是统一测试条件。

<a id="source-s14"></a>**[S14] CD 与 DVD 盘体结构。** Fred R. Byers，[《Care and Handling of CDs and DVDs》](https://www.clir.org/wp-content/uploads/sites/6/pub121.pdf)，Council on Library and Information Resources／NIST，2003，第 3 章及图 1～11。说明 CD 顶面的薄漆和反射层、DVD 的双基板、只读盘凹坑、有机染料和相变膜。书中尚未涉及后来的可刻录双层 DVD。

<a id="source-s15"></a>**[S15] BD-ROM 物理结构。** Blu-ray Disc Association，[《White Paper Blu-ray Disc Format, 1C: Physical Format Specifications for BD-ROM》](https://web.archive.org/web/20110928104732id_/https://www.blu-raydisc.com/Assets/Downloadablefile/BD-ROMwhitepaper20070308-15270.pdf)，第 1、4 章：约 1.1 mm 基板、约 0.1 mm 覆盖层，双层盘约 0.025 mm 透明间隔层；硬涂层可选。

<a id="source-s16"></a>**[S16] BD-R 物理结构。** Blu-ray Disc Association，[《White Paper Blu-ray Disc Format: BD-R Physical Format, 3rd Edition》镜像](https://blog.ligos.net/images/The-Reliability-Of-Optical-Disks/BD-R_Physical_3rd_edition_0602f1-13322.pdf)，第 2.2 节及图 2.2.2、2.6.3。列出有机与无机记录材料示例，单层记录区距读盘面约 100 µm，双层 L1／L0 分别约 75／100 µm。

<a id="source-s17"></a>**[S17] 可刻录双层 DVD。** Verbatim／Mitsubishi Kagaku Media，[《DVD+R DL White Paper》](https://www.cdrom2go.com/dvd-plus-r-dl-white-paper)，Double Layer Disc Structure 与各层说明。以该厂家早期 DVD+R DL 为例，说明半透 L0、透明间隔层、L1 染料与反射层。不同厂商及 DVD-R DL 不应照此认定具体薄膜配方。

<a id="source-s18"></a>**[S18] BD-RE 与三层 BDXL。** Blu-ray Disc Association，[《White Paper Blu-ray Disc Format, 1A: Physical Format Specifications for BD-RE》](https://web.archive.org/web/20200411111052id_/http://www.blu-raydisc.com/Assets/Downloadablefile/White_Paper_BD-RE_5th_20180216.pdf)，第 2～4 章。说明相变记录、100／75 µm 的单层与双层层位，以及 BD-RE 三层 100／75／57 µm 的示例。
