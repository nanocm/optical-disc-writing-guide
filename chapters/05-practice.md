## 五、刻录与读回校验

以下用 `G:` 代表光驱，用 `D:\归档\ARCHIVE_001` 代表源文件夹，操作时换成实际路径。有资料的盘先只读检查，必要时把文件复制到硬盘，再考虑写入、格式化或擦除。

### 5.1 从空盘到首次校验

普通文件备份可先在硬盘整理完整快照，再一次写到空白盘，读回校验并保存清单。每张盘给唯一编号，如 `ARCHIVE_001`，写在盒脊、盘面可写区域和电子索引里。完整 ISO 用 5.3 节；分批追加用 5.4 或 5.6 节；需反复修改则用可擦写盘，按 5.7 节测试。制作 DVD-Video／BD-Video 要用相应编排软件。[S10]

<figure class="guide-diagram"><img src="assets/diagrams/archive-workflow.svg" alt="从整理源文件、生成哈希清单、刻录 Verify，到弹出重插、哈希复查和保存第二份副本的流程" loading="lazy"><figcaption>写盘后弹出重插，再核对哈希并保存第二份副本。</figcaption></figure>

### 5.2 用 ImgBurn 刻录普通文件

1. 在硬盘建立 `D:\归档\ARCHIVE_001\DATA`，放入待备份文件，刻录开始后不再修改。大量压缩包应附目录说明；重要资料按用途分包，保留原文件索引，以免一个包损坏牵连全部。
2. 在 `ARCHIVE_001` 根目录写 `README.txt`，记录盘号、日期、来源、目录、工具和写速。按 5.8 节生成逐文件 `SHA256.csv`，硬盘另存一份。清单放在 `DATA` 外，避免计算自身哈希。
3. 检查容量：4.7 GB DVD 在 Windows 约为 4.38 GiB，25 GB BD 约为 23.3 GiB；还要留文件系统和管理空间。新批次别填满。
4. 放入空白盘，关闭 Windows 格式化提示。ImgBurn Disc Information 应显示正确的 `Current Profile`、`Status: Empty`、层数、容量、MID 和速度；若已有会话，先查明盘片。

~~~text
D:\归档\ARCHIVE_001\
├─ README.txt
├─ SHA256.csv
└─ DATA\
   ├─ Photos\
   ├─ Documents\
   └─ Project_A.zip
~~~

5. 在 ImgBurn 选 `Write files/folders to disc`（Build），将整个 `ARCHIVE_001` 文件夹加入 Source。若只见 `Show Disc Layout Editor`，打开它排目录，或在 `Input` 菜单切到 `Standard`。预览盘根：加入整个文件夹后应是 `G:\ARCHIVE_001\...`；只加入内部文件则会改变根目录。
6. 在 Options 选目标设备支持的 UDF 或桥接文件系统；Labels 填 `ARCHIVE_001`。Device 选刻录机和双方支持的写速，新批次先试中档。勾选 Verify，核对文件数、容量和目的光驱，再写盘。[S6]
7. 写完且 Verify 通过后，弹出重插，核对文件数和大小，从盘上打开不同位置的文件，并比对重要文件或全部文件的 SHA-256。
8. 在硬盘索引中记录盘号、盘片型号／MID、光驱与固件、写速、Verify 和哈希结果。独立入盒，避开热源、日晒和潮湿；不可替代的资料另存异地或不同介质副本，隔几个月或一年抽检。

<div class="walkthrough-steps">
<figure><img src="assets/screenshots/imgburn-home-snipaste.png" alt="ImgBurn 主界面，左上角为 Write image file to disc，右上角为 Write files/folders to disc" loading="lazy"><figcaption>ImgBurn 主界面：普通文件选右上角的 <code>Write files/folders to disc</code>；已有 ISO 选左上角的 <code>Write image file to disc</code>。</figcaption></figure>
<figure><img src="assets/screenshots/imgburn-build-options-snipaste.png" alt="ImgBurn Build 模式的 Options 页，File System 为 ISO9660 加 UDF，UDF Revision 为 1.50，Verify 已勾选；Source 尚为空" loading="lazy"><figcaption><code>Options</code>：设置文件系统与 UDF 版本。截图中尚未加入源文件，DVD-RW 也提示需擦除。</figcaption></figure>
<figure><img src="assets/screenshots/imgburn-build-labels-snipaste.png" alt="ImgBurn Build 模式的 Labels 页，ISO9660 和 UDF 卷标均填写 IMG_BUILD_DEMO" loading="lazy"><figcaption><code>Labels</code>：桥接盘须检查 ISO 9660 与 UDF 两处卷标；截图仍未加入源文件。</figcaption></figure>
</div>

### 5.3 用 ImgBurn 写入 ISO 镜像

从发布方取得 ISO 和 SHA-256，核对下载文件与盘片容量。放入空白盘，关闭 Windows 的写盘提示；在 ImgBurn 选 `Write image file to disc`，Source 指向 ISO，Destination 选光驱，设支持的速度并勾选 Verify。写后弹出重插；安装盘还须在目标电脑试启动。镜像已有文件系统，不必另选 UDF；若盘上只有一个 `.iso` 文件，就是误用了普通文件刻录。[S6]

<div class="walkthrough-steps"><figure><img src="assets/screenshots/imgburn-write-image-snipaste.png" alt="ImgBurn Write image 模式，Source 选中 Linux Mint ISO，Destination 是 ASUS 光驱，Verify 已勾选；盘片状态提示需要擦除" loading="lazy"><figcaption>Source 选 ISO，Destination 选光驱并勾选 Verify。图中 DVD-RW 已有数据（<code>Disc Needs Erasing</code>）；光驱列出 4×，选择框却显示 12×，正式写入前须核对。</figcaption></figure></div>

### 5.4 用 Windows Live 分批写入

1. 放入空白盘，输入卷标，选“像 U 盘一样使用”，等 Windows 初始化。DVD-RW 若刚切换写法，先擦除并重插；已有文件需要保留时取消操作。
2. 从硬盘复制可丢弃的 `S01_test.txt`。若文件进入“准备好写入到光盘中的文件”，当前仍是待刻录流程，先停下。若直接写入，弹出重插并核对内容。
3. 后续批次放进 `S02_日期` 等目录。每批都重插，同时打开第一批与新增文件。
4. 要直接修改盘上文件，再用 `edit_test.txt` 试验：编辑器保存后重插，比对 SHA-256，别只看时间戳。DVD-R、DVD-RW、BD-RE 的结果可能不同。

选 Live 并完成初始化后，通常无须再点“格式化”。若文件仍进待刻录区，先停下；确认介质允许重新格式化、旧数据无需保留，再重新初始化，并用测试文件验证。

<div class="walkthrough-steps"><figure><img src="assets/screenshots/windows-udf-format-snipaste.png" alt="Windows 格式化光驱对话框，容量为 4.38 GB，文件系统默认为 UDF 2.01，快速格式化已勾选" loading="lazy"><figcaption>4.38 GB 可擦写盘的 UDF 格式化窗口。标题中的“BD-RE 驱动器”是光驱名称，不代表盘型；有资料要保留时不要点击“开始”。</figcaption></figure></div>

某些 DVD-R 组合允许保存同名新版，但旧扇区不会回收。经常改文件可选 DVD-RW／BD-RE，或在硬盘改好再刻新快照。交给另一台电脑前，按[Windows Live 兼容性检查](#windows-live-compatibility)测试读回；若对方要求格式化，应取消并回原电脑导出。[S5][S10][S12]

### 5.5 用 Windows Mastered 刻录文件

1. 放入空白盘，选“与 CD/DVD 播放器一起使用”，填写卷标。复用 DVD-RW／BD-RE 时，先保存旧资料、擦除、重插。选 Mastered 后不要再点“格式化”。
2. 将文件拖入光驱窗口，确认它进入“准备好写入到光盘中的文件”；若直接写盘，按[格式化与擦除](#erase-and-format)检查状态。
3. 核对待刻录列表的文件名、数量，移出不需要的 `desktop.ini`。
4. 在 Windows 11 的“更多选项”中点“完成刻录”，确认卷标和速度，点“下一页”开始写盘。
5. 成功后弹出重插，从盘上打开文件并比对哈希。

这仍是数据盘；目标播放器须支持盘上的文件类型。若要续写，先查会话和整盘状态，再确认软件能导入旧目录。[S4][S5][S10]

### 5.6 用 CDBurnerXP 续写会话

第一次在 CDBurnerXP 数据盘项目中加入 `S01_日期`，结尾选“保留以后追加”。Verify、弹出重插，打开第一批文件。第二次选“继续光盘／导入区段”，确认**下方待刻录项目**已有 `S01`，再加 `S02_日期`。上方浏览区能看到旧盘，不代表项目已导入；若下方仍为 0 个文件，停止刻录，检查软件与文件系统兼容性或换新盘。[S4][S10]

第二批写完，再 Verify、重插并校验两批文件。此后每批重复。确定不再续写或目标设备要求时，先核对所有批次都在目录中，再选 Finalize／Close Disc。几 KB 的小会话会浪费管理空间，可按周或主题凑批。

### 5.7 擦写 DVD-RW 与 BD-RE

先把旧数据复制到硬盘并验证。选 Windows Live UDF 或经测试的可读写方式，依次试写、重插、编辑、再重插，并删除另一个测试文件，查看目录和可用空间。需要重来时执行“擦除此光盘”、初始化并重插。快速擦除不等于安全抹除。[S10]

DVD-RW 的受限覆写模式可修改和删除文件；能否直接在编辑器保存，须按软件测试。[S10]

### 5.8 生成并核对 SHA-256 清单

SHA-256 清单逐文件记录相对路径与哈希；分批盘可为第二批单独建 `SHA256_S02.csv`。以下脚本只计算 `DATA`，把清单写在外层，避免算入自身：

```powershell
$dataRoot = 'D:\归档\ARCHIVE_001\DATA'
$prefix = (Resolve-Path -LiteralPath $dataRoot).Path.TrimEnd('\') + '\'
Get-ChildItem -LiteralPath $dataRoot -File -Recurse |
  Sort-Object FullName |
  ForEach-Object {
    [pscustomobject]@{
      Path = $_.FullName.Substring($prefix.Length)
      SHA256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
    }
  } |
  Export-Csv -LiteralPath 'D:\归档\ARCHIVE_001\SHA256.csv' -NoTypeInformation -Encoding UTF8
```

写盘、重插后，从 `G:\ARCHIVE_001\DATA` 逐文件重算哈希。匹配说明此次读出的字节与写前一致；Verify 是刻录软件的读回检查。若失败，保留硬盘原件和日志，检查目录与盘况，再决定是否重刻。[S10]

```powershell
$discData = 'G:\ARCHIVE_001\DATA'
$bad = foreach ($row in Import-Csv -LiteralPath 'G:\ARCHIVE_001\SHA256.csv') {
  $file = Join-Path $discData $row.Path
  if (-not (Test-Path -LiteralPath $file) -or
      (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash -ne $row.SHA256) {
    $row.Path
  }
}
if ($bad) { $bad } else { '全部文件的 SHA-256 均匹配' }
```

### 5.9 质量扫描与常见故障

ImgBurn Discovery 会写测试数据，消耗空白盘，不接受待归档文件。质量扫描只覆盖已写区域；要看外圈或跨层区，就要写到相应位置并完整读取。档案盘可做非破坏性扫描；`No suitable disc inserted` 也可能只是光驱不支持 BD 扫描命令。备份的可用性优先看 Verify、文件哈希、连续读取及异机读盘。[S6][S8][S9]

| 看到的现象 | 先做的只读检查 |
| --- | --- |
| 空白盘在资源管理器打不开 | ImgBurn 查 `Current Profile`、`Status: Empty`；空白盘尚无目录 |
| 出现 `desktop.ini` 和“准备好写入” | 检查是否还没点“刻录到光盘” |
| 已占空间却看不到文件 | 查会话、最后目录与文件系统，暂不格式化 |
| 最后会话 `Incomplete` | 查第一会话、轨道和读回；可能只是预留的空白会话 |
| DVD-R 能新增却不能保存旧文件 | 在硬盘改好新版，换新文件名追加 |
| 新会话后旧目录消失 | 停止写入，用会话工具只读检查旧目录是否导入 |
| `Verify` 失败或哈希不一致 | 保留源文件与日志，另用一张盘重刻 |
| 另一电脑要求格式化 | 取消，回原电脑导出；查盘型、UDF 版本和光驱 |
