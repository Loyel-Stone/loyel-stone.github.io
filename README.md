# Loyel Stone — personal portfolio

Loyel Stone 的长期英文个人作品集，职业定位为 Independent Software & Product Developer。网站记录真实软件项目、产品决策和工程实践，不绑定某次申请或求职阶段。导航及第一人称自述可简称 Loyel；SayRight 是当前唯一获准展示的项目。

正式网站：[loyel-stone.github.io](https://loyel-stone.github.io/)；Public 源码仓库：[Loyel-Stone/loyel-stone.github.io](https://github.com/Loyel-Stone/loyel-stone.github.io)。GitHub Pages 已于 **2026 年 10 月 29 日**上线，首次部署提交为 `a018a7550ef4dc6479ee0c24e9da5ae602fc8754`，[Actions Run 40810073671](https://github.com/Loyel-Stone/loyel-stone.github.io/actions/runs/40810073671) 成功，五页已由 Owner 实际访问验收。

GitHub Pages 使用手动部署，**push 只更新源码，不更新线上网站**。ChatGPT Sites 是独立的托管平台，本项目尚未在该平台创建或发布。允许搜索引擎索引，实际收录尚未验证；不声明流量、用户量或学习效果。

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
  skills.html              有证据支持的项目技术与工作方法
  contact.html             GitHub 公开主页、Public Demo 与案例入口
  robots.txt               允许抓取，并声明正式 sitemap 地址
  sitemap.xml              仅列出五个正式页面的 canonical URL
  assets/styles.css        既有视觉、项目卡片反馈、响应式与打印样式
  assets/main.js           移动导航与案例目录高亮
  assets/favicon.svg       原创几何标记
  assets/fonts/            本地字体及原始 OFL 许可证
preview.mjs                仅监听 127.0.0.1，仅提供 dist 文件
scripts/check.mjs          静态链接、结构与资产完整性检查
scripts/check-pages.mjs    离线检查 dist 发布边界及根域名相对路径
.github/workflows/pages.yml 已使用的手动 GitHub Pages 部署配置
docs/CONTENT.md            已知事实、公开内容边界与案例补充指南
docs/DESIGN.md             信息架构与视觉约定
docs/VERIFICATION.md       历次实际执行的检查与验证边界
docs/DEPLOYMENT.md         Pages 配置、验证方法及 Owner 后续发布步骤
docs/SITES-COMPATIBILITY.md ChatGPT Sites 静态兼容性调查与待确认事项
```

## 修改内容

直接编辑 `dist/*.html`，这里是源文件，不需要执行构建。五个核心页面保留独立语义化 HTML，便于阅读和无 JavaScript 访问。共享头尾当前有少量重复；修改导航时同步核心页与后续案例页即可，不需要引入模板框架。

检查命令：

```sh
npm run check
node scripts/check-pages.mjs
git diff --check
```

这个检查不等于完整可访问性认证，也不证明 SayRight 本身的测试或产品质量。

## GitHub Pages 部署与更新

`.github/workflows/pages.yml` 只支持手动 `workflow_dispatch`，限制此仓库的 `main`，只上传 `dist/`；不使用 push 自动发布、不安装依赖。修改并检查通过后正常提交、推送，再由 Owner 在 Actions → Deploy portfolio to GitHub Pages → Run workflow 选择 `main`，核对目标提交并手动运行。成功后核对运行 SHA 和线上实际页面。未执行这一步时，线上继续提供上一部署版本。

正式网址为 `https://loyel-stone.github.io/`，不使用自定义域名，不添加分析或追踪服务。五页各有唯一 canonical 与文字 Open Graph 信息；首页 canonical 为根网址。`robots.txt` 允许抓取，`sitemap.xml` 仅包含五个正式页面。没有批准的分享图片，因此不添加 `og:image`。这些配置不保证收录时间或分享平台展示效果。

后续部署和保留历史的回滚方法见 [部署说明](docs/DEPLOYMENT.md)。不需要重复切换仓库可见性或重新启用 Pages。GitHub Pages 与 ChatGPT Sites 的版本、权限和发布流程相互独立。

## 增加第二个真实项目

1. 在 `dist/index.html` 的 `.project-list` 内复制现有完整 `<article class="featured-project">`。SayRight 保留第一张，下一张放在后面，不需要改布局或 JavaScript。
2. 修改 `data-project`、标题 `id` 和 `aria-labelledby`，确保每张卡片身份唯一。填写真实名称、状态、简介、`.project-topics` 技术／主题标签，并更新概念图或获准使用的资产说明。
3. 每张卡片只保留一个 `.project-case-link`，指向独立案例页，例如 `project-name.html`；链接通过 CSS 覆盖整张卡片。不要在卡片内放第二个链接、按钮或可编辑控件。外部仓库和演示链接放到对应案例页。
4. 在 `dist/` 新建案例 HTML，可沿用现有页面壳、字体、导航和章节样式，但必须重写项目叙述，不能复制 SayRight 的测试指标或成果。设置包含 Loyel Stone 的独立标题与简介，`og:site_name` 和页脚统一为 Loyel Stone；案例页导航的 Projects 使用 `aria-current="true"` 表示当前作品分类。
5. 同步新增页面的 canonical / Open Graph 和 sitemap；经批准后更新检查脚本中当前“五个正式 URL”的预期及必要的资源／外链白名单。运行 `npm run check` 和 `node scripts/check-pages.mjs`，检查链接、身份和卡片字段。源码推送后，仍需另行批准并手动部署。

卡片保留单列阅读顺序与原有内部比例。原生链接支持鼠标、触摸、Tab、Enter 和浏览器打开新标签页；无需 JavaScript，关闭脚本仍可浏览。反馈只改变边框和链接颜色，不移动卡片；尊重 `prefers-reduced-motion`。目前不创建其他项目、Coming Soon 卡片或筛选系统。

## 内容维护边界

页面已移除六处未确认占位、未经确认的兴趣／理念表述及访客可见的内部编辑提示。Contact 仅展示已确认的 GitHub 主页、SayRight Public Demo 和案例入口。没有公开邮箱、LinkedIn 或 CV；这些内容无需为了发布而补齐。正式品牌为 Loyel Stone，可简称 Loyel；教育仅展示已确认的学位和毕业时间，不展示院校或法定姓名。

1. 新增个人经历、联系方式、技术熟练度或具体代码贡献说明时，先取得可靠材料和公开授权，再按 `docs/CONTENT.md` 更新。不要从私人项目自动取材。
2. SayRight 仍使用注明日期的审计摘要；新增截图或状态更新需 Owner 提供脱敏材料，不推断发布状态或学习效果。
3. 新增内容和后续部署分别取得授权；SEO 配置不提供访问控制。搜索引擎实际收录、分享展示和站点流量须有真实证据才可记录。

页面无远程字体、分析脚本、表单、追踪或外部运行时请求。Newsreader 和 DM Sans 原始字体来自 Google Fonts 官方仓库，许可证保留在 `dist/assets/fonts/`。来源见 `docs/DESIGN.md`。
