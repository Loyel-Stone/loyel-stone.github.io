# Loyel Stone — local portfolio draft

Loyel Stone 的英文个人作品集，职业定位为 Independent Software & Product Developer，面向香港硕士申请、技术岗位与软件作品展示。导航及第一人称自述可简称 Loyel；GitHub 账号 Loyel-Stone、本地目录 loyel-portfolio 不变。SayRight 是当前唯一获准展示的项目。使用 Sites 的本地静态开发流程；未注册 Site、未部署、未公开发布。

## 本地预览

在项目根目录 `./` 运行：

```sh
npm run dev
```

浏览器打开 <http://127.0.0.1:4173>。不需要 `npm install`。停止时按 `Ctrl+C`。若端口占用，运行 `PORT=4174 npm run dev`。

也可直接打开 `dist/index.html`，普通导航和内容不依赖 JavaScript。HTTP 预览更适合检查字体与浏览器行为。

## 文件结构

```text
dist/                      可预览的静态网站，不是自动生成的构建产物
  index.html               Home
  about.html               About
  sayright.html            8 个部分的英文 Case Study
  skills.html              工作领域与待确认技术
  contact.html             待确认联系方式
  assets/styles.css        既有视觉、项目卡片反馈、响应式与打印样式
  assets/main.js           移动导航与案例目录高亮
  assets/favicon.svg       原创几何标记
  assets/fonts/            本地字体及原始 OFL 许可证
preview.mjs                仅监听 127.0.0.1，仅提供 dist 文件
scripts/check.mjs          静态链接、结构与资产完整性检查
docs/CONTENT.md            已知事实、占位内容与案例补充指南
docs/DESIGN.md             信息架构与视觉约定
docs/VERIFICATION.md       本次实际执行的检查与验证边界
```

## 修改内容

直接编辑 `dist/*.html`，这里是源文件，不需要执行构建。五个核心页面保留独立语义化 HTML，便于阅读和无 JavaScript 访问。共享头尾当前有少量重复；修改导航时同步核心页与后续案例页即可，不需要引入模板框架。

检查命令：

```sh
npm run check
```

这个检查不等于完整可访问性认证，也不证明 SayRight 本身的测试或产品质量。

## 增加第二个真实项目

1. 在 `dist/index.html` 的 `.project-list` 内复制现有完整 `<article class="featured-project">`。SayRight 保留第一张，下一张放在后面，不需要改布局或 JavaScript。
2. 修改 `data-project`、标题 `id` 和 `aria-labelledby`，确保每张卡片身份唯一。填写真实名称、状态、简介、`.project-topics` 技术／主题标签，并更新概念图或获准使用的资产说明。
3. 每张卡片只保留一个 `.project-case-link`，指向独立案例页，例如 `project-name.html`；链接通过 CSS 覆盖整张卡片。不要在卡片内放第二个链接、按钮或可编辑控件。外部仓库和演示链接放到对应案例页。
4. 在 `dist/` 新建案例 HTML，可沿用现有页面壳、字体、导航和章节样式，但必须重写项目叙述，不能复制 SayRight 的测试指标或成果。设置包含 Loyel Stone 的独立标题与简介，`og:site_name` 和页脚统一为 Loyel Stone；案例页导航的 Projects 使用 `aria-current="true"` 表示当前作品分类。
5. 运行 `npm run check`。检查保留五个核心页面，同时自动发现其他 HTML 并核对链接、身份和项目卡片字段；新增案例无需修改页面数量断言。新增外部地址仍需明确批准后加入检查脚本白名单。

卡片保留单列阅读顺序与原有内部比例。原生链接支持鼠标、触摸、Tab、Enter 和浏览器打开新标签页；无需 JavaScript，关闭脚本仍可浏览。反馈只改变边框和链接颜色，不移动卡片；尊重 `prefers-reduced-motion`。目前不创建其他项目、Coming Soon 卡片或筛选系统。

## 公开前需要完成

1. 补齐仍待确认的联系方式、CV、个人经历及具体代码贡献说明。正式品牌为 Loyel Stone，可简称 Loyel，不要求法定姓名；教育仅展示已确认的学位和毕业时间，不展示院校。
2. 审核所有标有 draft / proposed 的第一人称表述。
3. 按 `docs/CONTENT.md` 补充 SayRight 公开证据；不要从私人项目自动取材。
4. 检查截图、CV、示例和链接中是否含个人数据或秘密。
5. 确认发布后，再选择托管方式、设置真实域名与分享元信息，并决定移除 `noindex`。`noindex` 不是访问控制。

页面无远程字体、分析脚本、表单、追踪或外部运行时请求。Newsreader 和 DM Sans 原始字体来自 Google Fonts 官方仓库，许可证保留在 `dist/assets/fonts/`。来源见 `docs/DESIGN.md`。
