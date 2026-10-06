## 三、文件系统与写入方式

光驱认识 `BD-R` 或 `DVD-R`，只表示它能读扇区。资源管理器还要找到会话和文件系统，才能列出文件。因此，已占容量的盘仍可能看不到文件；资源管理器显示的目录，也可能与旧会话中的目录不同。[S4][S5][S10]

### 3.1 物理盘片、会话与文件目录

<div class="layers" role="img" aria-label="从下到上依次是盘片物理类型、记录模式、会话和轨道、文件系统、用户文件或影片规范">
  <div><b>⑤ 用户内容</b><span>文件、启动结构、DVD-Video／BD-Video</span></div>
  <div><b>④ 文件系统</b><span>ISO 9660、Joliet、Rock Ridge、UDF</span></div>
  <div><b>③ 会话与轨道</b><span>目录在第几批写入、是否导入先前内容</span></div>
  <div><b>② 记录模式</b><span>顺序写入、受限覆写、BD-R 伪覆写等</span></div>
  <div><b>① 物理介质</b><span>DVD-R、DVD-RW、BD-R、BD-RE；单层或多层</span></div>
</div>

例如，Windows Live 先在 DVD-R 上建立 UDF。随后复制或修改 `hello.txt`，系统可写入新数据和目录，让当前文件名指向新版；旧扇区仍留在盘上。[S4][S10]

### 3.2 ISO 9660、Joliet 与 UDF

文件系统记录文件名、目录与扇区位置。ISO 9660 于 1988 年面向 CD-ROM 发布；保守的 Level 1 常见 8.3 文件名和浅目录。Joliet 扩展 Windows 的 Unicode 文件名，Rock Ridge 保存 Unix 权限、符号链接等信息。同一盘可有多套目录视图，旧设备可能只认基础 ISO 名称。El Torito 规定 BIOS／部分 UEFI 如何找到启动映像，但有 El Torito 目录也不保证镜像可启动。ISO 13490 于 1990 年代中期补充可记录、多会话盘的卷结构；ISO 9660 本身并不禁止多会话。[S5][S11]

不少 ISO 9660／Joliet 组合对单文件有约 4 GiB 限制。ISO 9660 Level 3 的多段文件可越过限制，前提是刻录和读取软件都支持。大文件数据盘通常选目标设备认识的 UDF；`.iso` 后缀本身不决定大小上限。[S5]

UDF（Universal Disk Format）也在 1990 年代中期出现，面向更大的文件和可记录介质。主要修订如下：[S11][S12]

| 修订版 | 增加的能力与常见用途 |
| --- | --- |
| 1.02（1996） | DVD-Video 的基础版本；也用于保守的数据盘 |
| 1.50（1997） | VAT 为一次写入盘提供更新后的目录视图；备用表用于缺陷管理 |
| 2.00（1998）／2.01（2000） | 流、访问控制及实时记录结构；2.01 澄清修订 |
| 2.50（2003） | 元数据分区及镜像；BD-Video 常用 |
| 2.60（2005） | 支持适用于 BD-R 的伪覆写 |

UDF 版本不决定能否直接改文件，也不保证长期保存。一次写入盘的旧扇区不会因 VAT 或伪覆写而空出来。跨软件续写还取决于会话导入、记录模式和驱动器；Windows 使用的 UDF 版本也随系统、盘型及写法变化。

<figure class="guide-diagram"><img src="assets/diagrams/udf-history.svg" alt="UDF 1.02、1.50、2.01、2.50 与 2.60 的时间顺序和典型用途" loading="lazy"><figcaption>常见 UDF 修订版的发布时间与用途。</figcaption></figure>

刻录软件可把 ISO 9660、Joliet、UDF 写在同一盘上。各目录对长文件名、大文件、特殊字符的处理可能不同，需在目标设备核对。现代 Windows、Linux、macOS 通常能读 UDF 数据盘；旧车机、播放器和系统须查具体版本。DVD-Video、BD-Video 则遵守各自的制作规范。[S5][S11][S12]

一般数据盘可参考：CD 用 Joliet 或 UDF 1.50，DVD 用 UDF 1.50／2.01，BD 用 UDF 2.50；DVD-Video 用 1.02，BD-Video 用 2.50，BD-R 伪覆写才涉及 2.60。给旧设备用时，以该设备的实际支持为准。直接改文件还要求合适的盘型和写入模式。

检查兼容性要过四关：光驱认识盘型和层数；系统找到会话；系统挂载文件系统；应用程序理解内容。数据 DVD 上的 `movie.mkv` 可在电脑浏览，旧 DVD 播放机却可能无法播放。VLC 选择“打开蓝光光盘”会按播放列表寻找影片，普通“打开文件”可能选错主片；商业 UHD 还涉及加密和导航。[S5]

<figure class="guide-diagram"><img src="assets/diagrams/compatibility-gates.svg" alt="从光驱识别盘型，到读取会话、挂载文件系统、应用软件理解内容的四道兼容性检查" loading="lazy"><figcaption>四步分别对应介质、会话、文件系统和应用格式。</figcaption></figure>

### 3.3 ISO 镜像与普通文件

ISO 镜像保存已排好的盘面，可能包含 ISO 9660、UDF、El Torito 启动信息等结构；ISO 9660 本身是文件系统规范。ImgBurn 的 `Write image file to disc` 原样写镜像，`Write files/folders to disc` 则从文件新建盘面。把 `linuxmint.iso` 拖进数据盘只会得到一个文件；解压后再 Build 也可能丢失启动结构。[S6]

<figure class="guide-diagram"><img src="assets/diagrams/image-vs-build.svg" alt="ImgBurn 写入已有 ISO 镜像和从普通文件构建数据光盘的两条不同流程" loading="lazy"><figcaption>制作安装盘选上方的镜像路线；归档普通文件选下方的文件路线。</figcaption></figure>

`BIN/CUE`、`IMG` 可能保存原始扇区或特殊轨道布局。普通 ISO 常为 `MODE1/2048`，原始映像可为 `MODE1/2352`；扩展名无法确定扇区长度，应看 CUE 和软件识别结果。复制普通数据盘无需把物理纠错字节另当文件写入。[S5]

### 3.4 扇区布局与纠错

CD 扇区主通道为 2352 字节，各模式留给应用的数据量不同：

| 结构 | 应用数据／扇区 | 用途 |
| --- | ---: | --- |
| CD-DA | 2352 字节音频采样 | 音频轨道和索引；有 CIRC 纠错及错误隐藏 |
| CD-ROM Mode 1 | 2048 字节 | 普通数据 CD，另有 EDC／ECC |
| CD-ROM Mode 2 | 可留更多主通道空间 | 基本模式；后续 XA 分为 Form 1／2 |
| XA Mode 2 Form 1 | 2048 字节 | 重视纠错的计算机文件 |
| XA Mode 2 Form 2 | 2324 字节 | VCD 视频流，以较少纠错冗余换容量 |

VCD 的目录和导航仍用 ISO 9660；Form 2 视频流也并非没有错误检测。CD-DA 按轨道而非文件目录组织音频。DVD、BD 通常每扇区有 2048 字节用户数据；DVD 的 ECC 块为 16 扇区、32 KiB，BD 相应单元为 32 扇区、64 KiB，采用 LDC／BIS 机制。扫描曲线还受光驱、速度和盘况影响。[S9]

### 3.5 Windows 的 Live 与 Mastered

Windows 的“像 U 盘一样使用”（Live File System）先建立 UDF，复制文件时逐步写盘。DVD-R 上保存同名新版，系统可能在新位置追加数据和目录，旧扇区仍占空间。DVD-R 没有 BD-R 的 Pseudo Overwrite（伪覆写）；BD-R 的这项机制需要介质、光驱和 UDF 2.60 布局配合，也不会回收旧扇区。DVD-RW 的 restricted overwrite 等模式则可重写相应区域。[S10][S11][S12]

“与 CD/DVD 播放器一起使用”（Mastered）先把文件放进“准备好写入光盘中的文件”，点击“刻录到光盘”才写入。待刻录区的 `desktop.ini` 多半是文件夹视图元数据。已刻文件不能直接在编辑器保存；追加新批次还要看会话和整盘状态。[S4][S10]

“光盘标题”通常是卷标（volume label）；默认日期只是名称，不改变 MID 或续写状态。归档可用 `ARCHIVE_001` 等盘号，与盒子和索引对应。后续会话也可能另有卷标。

<figure class="guide-diagram"><img src="assets/diagrams/windows-modes.svg" alt="Windows Live 在复制时逐步写盘；Mastered 先排队，再按刻录按钮一次写入" loading="lazy"><figcaption>两个选项都能制作数据盘，区别首先在写入时机和后续修改方式。</figcaption></figure>

选择窗口通常只在空白或擦除后的盘上出现。DVD-RW 擦除、重新初始化后可改用另一种方式。实际流程看测试文件：进入“准备好写入”就是 Mastered，须点“完成刻录”；复制后弹出重插即可读出，则是 Live。资源管理器可能残留旧的待刻录列表，因此要看新文件落在哪个区域。[S10]

换软件续写前，用测试盘确认它会导入旧目录，写后重插仍能读到两批文件。Windows、CDBurnerXP、ImgBurn 的布局和会话流程可能不同；两个程序也不要同时控制一台光驱。[S10]

<a id="windows-live-compatibility"></a>
#### 3.5.1 Windows Live 盘的读取兼容性

Windows Live 使用 UDF，但不固定为 2.60；盘型和初始化选项会影响版本与布局。读盘还要同时满足盘型／层数、会话状态及 UDF 驱动对 VAT、缺陷管理或伪覆写结构的支持。能读取文件也不等于能继续写入。[S5][S10][S11][S12]

在制作盘的 Windows 电脑上，先弹出重插，检查新旧文件。换到另一台 Windows 电脑，先看光驱支持的盘型和层数，再打开样本文件；旧版 Windows 还可能不认识新版 UDF 或开放会话，可试另一台光驱。Linux、macOS 通常能读 UDF，但具体修订版、VAT 和开放会话仍需实盘测试，写入能力也要另测。家用播放器、车机则要按说明书核对数据盘文件系统、文件类型；DVD-Video／BD-Video 还须有规定的目录结构。

要交给别人读取，可在测试盘分两批写入小文件，在目标设备重插、读回并核对哈希。若读不到，改用设备支持的 UDF 版本，或制作封闭的 ISO 9660／Joliet／UDF 桥接盘。遇到格式化提示应取消，回制作盘的电脑导出数据。[S5][S10]

<a id="erase-and-format"></a>
### 3.6 格式化、擦除与 zeroing

空白 DVD-R／BD-R 可直接用 ImgBurn 制作数据盘或写镜像，无须先 zeroing 或格式化。Windows Live 所说的“格式化”是在准备 UDF 和介质管理结构，不会使 R 盘变成可擦写盘。DVD-RW／BD-RE 则可擦除后重新使用；快速擦除可能只重置管理信息，Windows 的待刻录列表也未必随之清空。[S10][S11]

“刻录光盘”窗口选的是 Windows 接下来的写入流程；资源管理器里的“格式化”则按选定 UDF 版本重新准备介质，通常形成直接复制的布局。因此，在选 Mastered 后又格式化，不能再按之前的选择判断当前写法。擦除本身也不决定使用 Live 还是 Mastered。

一次 DVD-RW 测试中，擦除后选 Live，文件却进了待刻录区；再次格式化后才能直接复制。另一次选 Mastered 后执行 UDF 格式化，也变成直接复制。仅凭界面无法确定前一次异常的具体原因。UDF 2.01 只标识版本，Mastered 数据盘也可能用 UDF；用可丢弃的小文件试写、弹出重插，才能确认实际流程。[S10]

切换 DVD-RW／BD-RE 的写法前，先备份、擦除并重插。选 Mastered 后直接加入测试文件，确认它进待刻录区，再“完成刻录”，中途不要格式化。选 Live 后等待初始化，确认测试文件直接写盘。若与预期不同，检查盘片状态和待刻录列表，从空盘重来。

R 盘不能通过格式化清除旧数据，RW／RE 的快速擦除也不保证无法恢复。Windows 若要求格式化有资料的盘，应取消，换回原光驱查盘型、会话和 UDF，并先复制可读文件。

DVD-R／BD-R 第一批数据和文件系统都已占用扇区。后续会话可写另一套目录，但若未导入旧文件，它们会从新目录视图消失。DVD-RW／BD-RE 若要更换布局，先备份，再擦除和初始化。

### 3.7 多会话与旧目录导入

Session（会话）是一批记录，可含一条或多条 Track（轨道）。下一批从后续可写地址开始，加入管理信息、数据和目录。新目录导入旧文件，两批便都可见；若只收录新文件，旧扇区还在，却不出现在当前目录。Microsoft 的 IMAPI 说明要求续写前导入上一会话的文件系统。[S4]

<figure class="guide-diagram"><img src="assets/diagrams/multisession.svg" alt="两个会话按顺序占据盘面；第二会话导入旧目录时能看到 A 和 B，未导入时可能只看到 B" loading="lazy"><figcaption>第二会话的目录决定当前文件视图。旧会话未被导入时，旧扇区通常仍在盘上。</figcaption></figure>

“允许以后添加文件”只留下续写机会。CDBurnerXP 选“继续光盘／导入区段”后，须在下方待刻录项目看到旧文件；上方浏览窗显示 `G:` 还不够。若项目仍是 0 个文件，不要写第二批。一个 UDF 1.50 DVD-R 的失败例子见[写入行为记录](experiment-notes.html)。[S4][S10]

ImgBurn Disc Information 的 `Status` 指整盘，`State of Last Session` 指最后会话。预留的下一会话可能显示 `Incomplete`，第一会话却仍可读；`Complete` 也要结合 R 盘或 restricted overwrite 模式解释。应合看 `Sessions`、Track、`Next Writable Address`、可擦写标记和重插读回。[S10]

资源管理器通常只显示当前挂载的文件目录，不提供逐个会话浏览；CDBurnerXP 的数据项目窗口也不是旧会话恢复器。要找第一会话，先停止写盘，用能列出会话起点的工具检查盘面。Linux 的开源 `xorriso` 可以查看和提取 ISO 9660 会话；盘若只有 UDF 目录，或会话本身不完整，它未必能还原文件。IsoBuster 可用于检查多会话，但部分恢复功能收费。先只读复制能找到的文件，别为了找旧目录再次格式化或追加。[S10]

### 3.8 关闭轨道、会话与整盘

Close Track 结束一条轨道，Close Session 完成当前会话，Finalize／Close Disc 则关闭整张一次写入盘的追加状态。软件的中文界面可能把几种操作都叫“封盘”；看原英文和写后的 Disc Information 更可靠。会话关闭后仍可能继续下一批，整盘最终化后通常无法再添加文件。ImgBurn 作者确认，Build 模式没有日后继续追加普通文件的多会话流程。[S4][S6][S7]

重要备份可先在硬盘集齐文件，一次刻录后做 Verify、重插和哈希核验。确实要分批时，每批用 `S01_日期`、`S02_日期` 等独立目录和各自的校验表。频繁写入几 KB 的小会话会占用管理空间，日后也更难分辨哪一版文件有效。
