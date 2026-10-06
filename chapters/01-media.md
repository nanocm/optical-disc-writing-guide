## 一、盘片容量、记录层与保存条件

### 1.1 盘片容量与记录层

CD、DVD、BD 分别用近红外、红光、蓝紫光读写。`R` 通常表示一次写入，`RW`、`RE`、`RAM` 表示可重写；`DL`、`TL`、`QL` 是双层、三层、四层。50 GB BD-R DL 是双层盘，100 GB 三层和 128 GB 四层盘属于 BDXL。光驱对 BD-R DL、BDXL 和 UHD 电影的支持需要分别确认。[S3]

<figure class="guide-diagram"><img src="assets/diagrams/disc-families.svg" alt="CD、DVD 和 BD 常见容量、层数与一次写入或可擦写类型的对照" loading="lazy"><figcaption>容量、层数和可擦写性是三个不同的属性。图中列出常见规格，完整容量见下表。</figcaption></figure>

单层盘有一个记录层位，双层盘在同一读盘面下有两个，光头改变焦点深度来选层。只读盘的数据是模压凹坑；一次写入盘和可擦写盘在记录材料中形成标记。下面的剖面从印刷面画到读盘面，双面 DVD 两面都可读。薄膜已放大，色块高度不代表实际厚度。[S14][S15]

“数据面”通常指朝向光头的读盘面；数据并不直接露在表面。CD 的记录区贴近印刷面，DVD 在盘体中间，BD 则靠近读盘面。[S14][S15]

#### CD：记录区靠近印刷面

<figure class="guide-diagram"><img src="assets/diagrams/cd-disc-stack.svg" alt="CD-ROM、CD-R、CD-RW 从印刷面到读盘面的完整剖面：薄漆与反射层靠近顶面，下面是厚基板" loading="lazy"><figcaption>CD-ROM 的凹坑模压在基板上；CD-R 用有机染料，CD-RW 用相变膜。三者都从基板一侧读盘。印刷面下的漆层较薄，顶面深划伤可能伤及反射层。[S14]</figcaption></figure>

CD-RW 的相变膜通常夹在介电层之间；CD-R 的染料和金属反射层分开。印刷层可有可无，不能代替保护记录区的薄漆。[S14]

#### DVD：记录区在两片基板之间

<figure class="guide-diagram"><img src="assets/diagrams/dvd-disc-stack.svg" alt="六种 DVD 剖面：单层只读、一次写入、可擦写、DVD+R 双层、只读双层与双面单层" loading="lazy"><figcaption>单面 DVD 的两片基板在中心胶合，读盘光线从下方进入。双层盘的近端层须半透明，光头才能聚焦更深一层；双面盘两面都有读盘面，通常只能在内圈贴小标签。[S14][S17]</figcaption></figure>

单层 DVD±R 通常用有机染料，DVD±RW 与 DVD-RAM 用相变材料，只读 DVD 使用模压凹坑。图中的 DVD+R DL 是早期威宝／三菱结构：靠近读盘面的 L0 有半透反射层，激光穿过它聚焦到 L1。双层 DVD-ROM 也有其他层序。双层盘从同一面读取两层；双面盘则要翻面，两种结构可以组合。[S14][S17]

#### BD：记录区靠近读盘面

<figure class="guide-diagram"><img src="assets/diagrams/bd-disc-stack.svg" alt="BD-ROM、BD-R HTL、BD-R LTH、BD-RE 从印刷面到读盘面的完整剖面，记录区位于薄覆盖层后" loading="lazy"><figcaption>BD 的读写光线从约 0.1 mm 透明覆盖层一侧进入；外面的硬涂层是表面防护，不是记录层。图中的 BD-R 薄膜层序只是技术白皮书所示例子，各厂家材料和层数可能不同。[S15][S16][S18]</figcaption></figure>

BD-ROM 使用模压凹坑；BD-R HTL 常用无机材料，LTH 用有机染料，BD-RE 用相变材料。BD 的厚基板在印刷侧，光线从约 0.1 mm 的覆盖层进入，故读盘面上的灰尘和划伤更值得留意。“Hard Coat”是表面硬涂层，不是数据层；HTL／LTH 也不说明反射层用了什么金属。[S15][S16][S18]

#### BD 双层与 BDXL

<figure class="guide-diagram"><img src="assets/diagrams/recording-layers.svg" alt="BD-R 单层、BD-R DL 双层、BDXL 三层与四层的完整盘体剖面：印刷面、基板、多个记录层、间隔层、覆盖层及读盘面" loading="lazy"><figcaption>四种盘都从同一面读盘。光头穿过近端的半透层和透明间隔层，聚焦更深的层；图把近读盘面的薄结构放大。[S15][S16][S18]</figcaption></figure>

BD 单层记录区距读盘面约 100 µm。双层盘的 L0 约 100 µm、L1 约 75 µm；BD-RE 三层示例中的 L2 约 57 µm。三层、四层盘仍把各层置于读盘面附近，以透明材料间隔，具体尺寸随规格变化。层数增加也提高了聚焦和层间串扰的要求。[S15][S16][S18]

标准 12 cm 盘的常见容量如下。容量相同的 R 与 RW／RE 仍是不同盘型。

| 标称容量 | 常见盘型 | Windows 约显示 |
| --- | --- | ---: |
| 700 MB | CD-R、CD-RW | 667 MiB |
| 4.7 GB | DVD±R、DVD±RW、DVD-RAM、DVD M-DISC | 4.38 GiB |
| 8.5 GB | DVD±R DL；双层可擦写盘少见 | 7.92 GiB |
| 25 GB | BD-R、BD-RE | 23.3 GiB |
| 50 GB | BD-R DL、BD-RE DL | 46.6 GiB |
| 100 GB | BD-R TL、BD-RE TL | 93.1 GiB |
| 128 GB | 主要是 BD-R QL；BD-RE QL 须查具体产品 | 119.2 GiB |

小尺寸和双面盘也曾使用：Mini CD 约 215～310 MB；Mini DVD 单面可为 1.46 GB 或 2.66 GB；Mini BD-R 约 7.8 GB。标准直径的双面单层 DVD 为 9.4 GB，双面双层约 17 GB；部分 DVD-RAM 需要翻面。旧款 CD 还常见 650 MB。小盘须确认光驱托盘能固定 8 cm 介质，双面盘须分清每一面的容量。企业级双面 BD 有约 200 GB 和更高容量方案，不能拿来推断消费级 BDXL 光驱的能力。

GB 按十进制计算（10⁹ 字节），GiB 按二进制计算（2³⁰ 字节）。文件系统、备用区和会话也占空间。写盘前用 ImgBurn Disc Information 核对 Profile、容量、层数、速度和 MID；光驱须支持对应的 `+`／`-`、RAM、双层或 BDXL 写入能力。

不同盘型的倍率不能直接比较。4× 的数据率约为 CD 0.6 MB/s、DVD 5.54 MB/s、BD 18 MB/s。DVD M-DISC 需要光驱提供相应写入策略；BD M-DISC 通常按对应容量的 BD-R 写入，但仍应核对光驱的可写 Profile 和兼容表。常见 BD-RE 零售盘多为 2× 写入，具体速度以实盘和光驱报告为准。

### 1.2 续写、覆写和重写

DVD-R、DVD+R、BD-R 的已写区域无法擦除。有剩余空间时，可以追加文件或将同名新版写在新位置，但旧版仍占空间。DVD±RW、BD-RE 可擦除和覆写；编辑器能否直接保存，还要看记录模式、UDF 布局、系统和软件。[S4][S10]

<figure class="guide-diagram"><img src="assets/diagrams/write-behavior.svg" alt="一次写入盘在新位置写同名新版并保留旧扇区；可擦写盘可在相应区域重新写入" loading="lazy"><figcaption>“文件名被替换”描述的是当前目录，不代表旧数据在物理盘面上被抹掉。</figcaption></figure>

BD-RE、DVD-RW 往往比对应的 `R` 盘慢。它们的相变记录层需要在晶态和非晶态之间反复切换，写入功率与脉冲也要兼顾多次使用。一次写入盘只需形成稳定的记录标记，因此厂商可以采用不同的高速写入策略。慢速盘的质量仍要靠写后读回来判断。

盘片主要用聚碳酸酯作基板；记录层、反射层、涂层、胶合和制造公差也影响可读性。BD 有更强的纠错设计，但不能弥补所有制造或写入缺陷。

`DVD-R` 是 Pioneer 主导的 DVD Forum 路线，`DVD+R` 由 Sony、Philips 等推动的联盟发展；早期固件和播放器对两者的支持有别。部分刻录机可把 `DVD+R/+RW` 的 `Book Type` 设为 `DVD-ROM`，供旧播放器识别，但盘片仍是加号格式。给老设备用盘，应按具体 MID 试刻、试读；双层 DVD 还要检查跨层位置。

### 1.3 染料、相变层、HTL／LTH、M-DISC

普通 CD-R、DVD±R 多用有机染料。酞菁、花青和偶氮（AZO）是不同染料；CD-R 的金、银或合金反射层又是另一层结构。三菱／威宝的 AZO 标识有助于辨认系列，却不说明完整配方或寿命。没有厂商材料说明，不能凭“金盘”名称、MID 或盘底颜色鉴定成分。

BD-R 的 HTL（High to Low）与 LTH（Low to High）表示刻后反射率的变化方向。HTL 常用无机材料，LTH 通常用有机染料；这与 UDF 版本、可擦写性无关。威宝的 `VERBAT IMe` 与 `VERBAT IMu` 同为 25 GB、1～6×，却分别是 HTL、LTH。可在 ImgBurn 中查看 `Recorded Mark Polarity`，并用 MID 名录核对。[S2]

Juri 的[户外对照](http://juri.su/lthhtl.htm)比较了威宝 `43751 / VERBAT IMu`（LTH，盘片标为 2011 年）与 `43742 / VERBAT IMe`（HTL，标为 2016 年）。两盘于 **2021 年 3 月 31 日**由 Pioneer BDR-211UBK 以 2× 写入，放在朝西南的室外窗台；之后每月用 LG BH16NS40 以 7× 扫描。189 天后的 10 月 6 日，两盘退化速度相近且都通过读取测试。[S9] 标注年份不是刻录年份，空白盘存放时间也不同。这项双盘实验无法给 HTL、LTH 排寿命；普通备份可优先考虑 HTL，并检验到手批次。

DVD M-DISC 主打耐久的无机记录层，需要刻录机提供相应写入策略。BD-R 本来就有无机 HTL 盘，BD M-DISC 是其中的品牌系列，材料和寿命宣传不能直接沿用 DVD 版。Juri 的[样本目录](http://juri.su/mdisc.htm)列有 RITEK `MDDVD47 / MILLENIA 001`、2014 年 RITEK `MDBD25 / MILLEN MR1`，以及 2016 年威宝 `DBR50RMDPV1 / VERBAT IMf`、`DBR100YMDPV1 / VERBAT IMk`。[S9] 同一商标涵盖不同容量和 MID，代码也不证明记录层相同；“只有三四家厂生产”缺少逐型号依据。

### 1.4 保存寿命、材料标识与存放条件

加拿大文物保护研究所（CCI）的参考寿命表按材料和特定温湿度研究给出范围，**未计入空气污染物**；非金反射层在污染环境中可能更早失效。年数不能直接套到某个品牌或批次。[S13]

| 参考年限 | CCI 表中的介质及材料 |
| --- | --- |
| 超过 100 年 | 酞菁染料＋金反射层 CD-R |
| 50～100 年 | 酞菁染料＋银合金反射层 CD-R；金反射层 DVD-R；只读 CD |
| 20～50 年 | CD-RW；BD-RE；银合金反射层 DVD+R；花青或偶氮染料＋银合金反射层 CD-R；DVD+RW |
| 10～20 年 | 无染料＋金反射层 BD-R；银合金反射层 DVD-R；只读 DVD／BD |
| 5～10 年 | 染料或无染料、单层或双层 BD-R；DVD-RW；DVD+R DL |

CCI 建议存放于相对湿度 20%～50%、温度 −10～23°C，避免超过 32°C；这是保存建议，**不是表中统一的测试条件**。家中应避开日晒、暖气、潮湿和灰尘，独立入盒，定期读盘。[S13]

BD-R 在表中落入不同范围，取决于记录层、反射层等材料。纠错和缺陷管理也影响可读性，多层、可擦写盘还对读盘设备有额外要求。短期扫描或单盘暴露试验无法给所有 HTL、LTH 或产地排出寿命顺序。[S9][S13]

“Archival”“Gold”“Medical”“M-DISC”“Hard Coat”可能指材料、涂层或产品系列，须查厂商说明。ISO/IEC 16963 加速老化测试比较设定条件下的样本失效趋势，不能保证单张盘的可读年数。可按公开的染料、反射层和测试条件比较专业盘；普通零售盘若缺少材料声明，就记录商品号与批次，读回校验并留第二副本。

外观可留下批次线索，不能用来鉴定材料。BD-R 和 BD-RE 的记录层与堆叠结构不同，盘底可能分别呈金棕色、黑紫色等颜色。标准 12 cm CD／DVD／BD 的名义厚度都在约 1.2 mm 量级。边缘、标签和公差会影响手感，凭厚薄不能判定工厂或寿命。

桶装盘沿中心轴叠放，取盘时避免让一张盘的记录面在另一张盘面上滑动。已刻好的归档盘可放进独立珍宝盒，详细信息写在盒子上。若要在盘面标记，只在厂商允许的区域使用合适的软头笔；厚标签可能影响转动平衡。

### 1.5 MID 与盘片批次

MID 是介质控制信息中的制造商／类型代码，光驱固件据此选择写入策略。它不等于商标、工厂、材料或批次质量。追溯盘片时，应连同商品号、包装上的产地与厂商声明、内圈码、卖家、购买日期及刻录日志一起记录。[S2][S8]

蓝光协会的[MID 名录](https://blu-raydisc.info/licensee-list/discmanuid-licenseelist.php)按 BD-R 层数、BD-RE 等盘型列出授权代码和标称速度，供辨认代码，不评价零售盘质量。[S2]

| MID 前段 | 名录中的盘型与速度 |
| --- | --- |
| `VERBAT-IMe`／`VERBAT-IMu` | 25 GB BD-R，1～6×；分别为 HTL、LTH |
| `VERBAT-IMf`／`VERBAT-IMk` | 50 GB BD-R DL、100 GB BD-R TL；均为 HTL |
| `RITEK-BR2`／`RITEK-BR3` | 25 GB BD-R HTL；分别为 1～4×、1～6× |
| `RITEK-BO1`／`RITEK-BO2` | 25 GB BD-R LTH；分别为 1～4×、1～6× |
| `RITEK-DR3`／`CMCMAG-CN2` | 50 GB BD-R DL HTL；25 GB BD-RE 2× |

这些数字标识盘型或速度代际，不是质量等级；BD-R 与 BD-RE 的误码或寿命也不能直接对比。

名录把 `VERBAT IMe` 同时列在 CMC Magnetics 和 Mitsubishi Chemical Media 名下。[ez647 的 2011 年 Verbatim 43714 样本](https://ez647.sk/mitsubishi_kagaku/verbatime000bdr.html)读到 `VERBAT-IMe-000`，内圈码为 `ZE4635-MK-BX6A031`，并标为台湾 CMC 制造。手中 `43714` 若有同样内圈码，比共用的 MID 更能指向该生产线；包装上的三菱商标声明仅说明商标权属。精确批次仍可向厂商核实。[S2][S8]

<figure class="guide-diagram"><img src="assets/diagrams/mid-evidence.svg" alt="辨认盘片批次应合并商品号、包装声明、MID 极性与内圈码，再记录刻录和读回结果" loading="lazy"><figcaption>MID 是识别线索之一。要追溯到手的盘，还需保存包装和批次资料。</figcaption></figure>

BD 扫描常看 LDC（长距离码错误）和 BIS（Burst Indicator 子码错误）；DVD 常看 PI Errors、PIF（PI Failure）和 jitter（时基抖动）。扫描曲线可以找出错误突然升高的区域，但同一张盘换光驱、固件或扫描速度，数值都可能变化。要确认备份当前可用，还应完整读回、比较文件哈希，并在一段时间后复查。[S8][S9]

### 1.6 质量扫描的时间与设备条件

Juri 的 [BD-R 测试表](http://juri.su/bdrtest.htm)列有照片、扫描图、平均／最大 LDC 与 BIS、抖动、写速和 `Data` 日期。其中三张 `CMCMAG BA5` 25 GB 盘的数据是：[S9]

| 样本及盘片年份 | `Data` 栏日期 | 表中写速 | 平均 LDC | 平均 BIS |
| --- | --- | ---: | ---: | ---: |
| Verbatim `43840`，盘片标为 2016 年 | 2020-02-29 | 3× | 10.47 | 0.15 |
| Verbatim `43804`，盘片标为 2016 年 | 2018-01-27 | 6× | 21.86 | 0.36 |
| CMC `BDR25`，盘片标为 2016 年 | 2019-02-17 | 6× | 74.20 | 1.02 |

同一 MID 的三张盘数值差距明显，但写速、批次不同，`Data` 也未区分刻录日和扫描日，不能由“2016 年盘片”推算写后存放年数。原页所列刻录机为 Pioneer BDR-S09XLT；2017 年 5 月后主要用刷 WH16NS58 固件的 LG BH16NS40(NS51) 测试，更早还用过 ASUS BC-08B1ST。自行比较时要固定扫描机、固件及扫描速度，观察曲线在哪个盘面位置升高；低误码只表示当次读回余量较好，不能换算寿命。恢复资料仍以完整读回和文件校验为准。[S9]

ez647 的 [Imation `RITEK-BR2` 样本](https://ez647.sk/ritek/ritekbr2000_bdr.html)于 2011-04-24 刻录并通过首次读取，2012-05-13 复测已无法读文件，间隔 **385 天**。[Verbatim `43714 / VERBAT IMe`](https://ez647.sk/mitsubishi_kagaku/verbatime000bdr.html)标注 2011-04-23 刻录、当日测试及 2012-05-13 复测，但未列出更久后的状态。[S8] 讨论写后变化，须分清盘片年份、刻录日和复测日；单次扫描只说明当时的状况。
