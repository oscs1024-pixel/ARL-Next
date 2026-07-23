<div align="center">

  # ARL-Next
  **AI 原生自动化资产侦察与漏洞监控平台**

  <p>
    <a href="https://hub.docker.com/"><img src="https://img.shields.io/badge/docker-ready-blue.svg?style=flat-square&logo=docker" alt="Docker"></a>
    <img src="https://img.shields.io/badge/python-3.8%2B-blue?style=flat-square&logo=python" alt="Python">
    <img src="https://img.shields.io/badge/vue-3.x-4fc08d?style=flat-square&logo=vuedotjs" alt="Vue">
    <img src="https://img.shields.io/badge/MCP-Ready-purple?style=flat-square" alt="MCP">
  </p>
</div>

<br/>

---

## 💡 什么是 ARL-Next？

**ARL-Next** 是 ARL (资产侦察灯塔) 的现代化重构版本，现已全面进化为 **AI 原生自动化资产侦察与漏洞监控平台**。核心亮点包括：

* **🤖 AI 原生架构 (新!)**：原生集成 MCP，赋能 AI Agent 直接接管调度与检索，开启“对话式安全运营”。（👉 [**探索 MCP 玩法与配置指南**](./mcp-server/README.md)）
* **🚀 引擎代际更替**：彻底淘汰 PhantomJS，全面升级为 Chromium 动态爬虫与最新 Nuclei 扫描引擎。
* **🌐 多维资产闭环**：深度集成 ICP 与天眼查，全自动深挖企业网站、APP、小程序等多维度资产。
* **🛡️ 持续威胁监控**：内置 GitHub 最新 CVE 漏洞追踪与代码泄露实时监控，实现威胁情报前置。
* **⚡ 极致部署运维**：支持一键式生产部署、平滑热更新与 Basic Auth 强制防御；开发环境支持极速热重载。

---

## 📸 界面预览

* **全局仪表盘**：实时展示系统资源消耗、后台任务状态、多维风险统计及最新日志流。
  <br><img src="./img/dashboard.png" alt="仪表盘" width="800"><br>

* **OSINT 资产侦察**：支持 ICP 备案与天眼查等开源情报关联检索，一键同步企业资产（网站/APP/小程序/公众号等）并无缝下发任务。
  <br><img src="./img/enterprise-asset-search1.png" alt="资产侦察" width="800"><br>

* **任务与指纹管理**：支持扫描任务全生命周期追踪、自定义 PoC 插件组合，以及全局细粒度的资产指纹检索。
  <br><img src="./img/task-new1.png" alt="任务新建" width="800"><br>
  <br><img src="./img/task-management.png" alt="任务管理" width="800"><br>

* **威胁情报雷达**：支持最新 CVE 漏洞追踪与 **GitHub** 代码泄露实时监控。
  <br><img src="./img/threat-intel-radar1.png" alt="威胁情报雷达" width="800"><br>

* **系统设置**：集成 Fofa/天眼查热配置、字典云端管理、轻重任务队列并发热扩缩容，及六大告警通道（钉钉/飞书/企微/Telegram/邮件/Webhook）一键测试。
  <br><img src="./img/system-settings1.png" alt="系统设置" width="800"><br>

---

## 🏗️ 架构设计

ARL-Next 采用前后端解耦的微服务架构，核心模块如下：

1. 🖥️ **展示层 (Frontend)**：基于 **Vue 3.5** + **Vite 5.4** 构建，生产环境由 **Nginx** 托管，提供 HTTPS 安全网关与 **Basic Auth 前置防御**。
2. ⚙️ **业务 API 层 (Backend)**：基于 **Python 3.8+** 与 **Flask**，处理核心业务逻辑、JWT 鉴权及本地化备案微服务。
3. 🤖 **AI 扩展层 (MCP Server)**：*(新!)* 独立集成 **Model Context Protocol** 服务，赋能外部 AI 大模型/Agent 直接接入并调度底层检索工具。
4. ⚡ **消息与执行层 (Broker & Workers)**：采用 **RabbitMQ** + **Celery** 分布式集群，高效解耦调度 **Nuclei** 扫描与威胁监控等高并发任务。
5. 🗄️ **数据存储 (Database)**：基于 **MongoDB**，承载千万级大宽表资产数据与漏洞结果落地。

---

## 🚀 部署指南

### 生产部署 (公网单VPS一键部署) ⭐ 推荐

**适用场景**：国内云服务器、企业内网。
**基准耗时**：裸机从零部署约 **13 分钟**；自带 Docker 环境仅需 **2 分钟**。

**核心优势**：
* **⚡ 国内满速**：直连阿里云公开镜像，无惧 GitHub 网络阻断。
* **📦 极简轻量**：免环境配置、免 `docker login`，剔除冗余编译链，镜像减重超 700MB。
* **🛡️ 极致防护**：自动签发 SSL 并强制生成 **Basic Auth 前置拦截**，核心组件全内网隔离。
* **🔄 平滑热更**：支持从 Web 端一键平滑重启升级，彻底免去 SSH 登录。

#### 🚀 部署方式选择

你可以根据服务器的网络情况，选择以下任意一种方式进行部署：

**方法一：防阻断一键部署（⭐ 推荐，适用于国内服务器）**

无需科学上网，只需一台干净的 Ubuntu/Debian 服务器（需 `root` 权限），直接复制并执行下方命令。系统将自动完成 Docker 安装、配置文件提取并启动服务。

```bash
apt-get update && apt-get install -y docker.io docker-compose-v2 && \
mkdir -p ~/ARL-Next && cd ~/ARL-Next && \
docker pull crpi-laul1izptqrf0tkf.cn-beijing.personal.cr.aliyuncs.com/owl234-arl-prod/arl-web:latest && \
docker rm -f arl-temp 2>/dev/null || true && \
docker create --name arl-temp crpi-laul1izptqrf0tkf.cn-beijing.personal.cr.aliyuncs.com/owl234-arl-prod/arl-web:latest && \
docker cp arl-temp:/code/start-prod.sh ./ && \
docker cp arl-temp:/code/docker-compose.prod.yml ./ && \
docker cp arl-temp:/code/updater ./ && \
docker cp arl-temp:/code/version.txt ./ && \
docker rm arl-temp && \
chmod +x start-prod.sh && \
bash start-prod.sh
```

**方法二：常规 Github 浅克隆部署（适用于海外服务器或需保留源码）**

如果你的网络环境允许直连 Github，且希望在服务器上保留项目源码，可采用常规浅拉取方式（注：需自行确保已安装 Docker 环境）：

```bash
git clone --depth 1 https://github.com/owl234/ARL-Next.git && cd ARL-Next
chmod +x start-prod.sh
bash start-prod.sh
```

访问 `https://<你的服务器IP>:5173` 即可登录。


> 🛡️ **安全登录必读**：
> 1. **首层防御弹窗 (Basic Auth)**：输入账号 `admin` / 密码 `arl_next`
> 2. **系统登录面板**：输入账号 `admin` / 密码 `arlpass`
> *(首次自签名证书请忽略浏览器不安全提示)*

> ⚙️ **商业证书替换 (可选)**：将证书重命名为 `arl.crt` 和 `arl.key` 放至 `ssl-certs/` 目录，重新执行 `start-prod.sh` 即可。
---

### 开发环境部署 (前端本地 + Docker后端)

* 👥 **适用群体**：二开人员与安全研究者。
* ⚡ **核心优势**：前后端彻底解耦；后端全栈容器化配合代码卷热更新，前端 Vite 极速重载。
* ⚙️ **前置条件**：已安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)、[Node.js](https://nodejs.org/)，并全局安装 `pnpm` (`npm i -g pnpm`)。

#### 🚀 一键启动

```bash
git clone https://github.com/owl234/ARL-Next && cd ARL-Next
bash start-dev.sh # 自动拉起后端、安装前端依赖并启动服务
```
访问 `http://localhost:5173` 开始开发（默认凭据：`admin` / `arlpass`）。

> 💡 **开发备注**：
> * **双端热重载**：后端修改本地代码即时生效，前端 Vite 实时热更。
> * **API与安全**：后端接口暴露于 `5001` 端口；若需 HTTPS，将证书放至 `certs/` 目录。

#### 🛠️ 常用命令

```bash
# 查看状态 / 实时日志 / 停止开发环境
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs -f arl-web arl-worker
docker compose -f docker-compose.dev.yml down
```

---

## 🗄️ 数据库直连 (仅限开发环境)

为保证安全，生产环境默认切断了底层端口映射。开发调试期间，可使用以下配置直连排查数据：

**🍃 MongoDB 核心数据库**
* **直连 URI**: `mongodb://admin:admin@127.0.0.1:27018/arl?authSource=admin`
* **拆解参数**: 端口 `27018` | 账号/密码 `admin`/`admin` | 业务库 `arl` | 认证库 `admin`

**🐇 RabbitMQ 消息队列**
* **AMQP 端口**: `5673`
* **Web 后台**: `http://127.0.0.1:15673` (账号/密码：`admin` / `admin`)

---

## 📜 版本更新历史

<details open>
<summary><b>v1.1.5 (当前版本)</b></summary><br/>

* **架构**：重构 `icp_query` 为独立 `osint_service` 微服务，引入纯异步调度，降低主节点负载。
* **调度**：实现轻重任务队列分离 (FOFA 等轻查询独立)，并在系统设置中支持精细化并发数配置。
* **部署**：自动分配与挂载 2G Swap 下沉至一键部署脚本，彻底解决高并发 OOM 崩溃；Dockerfile 改用多阶段构建以缩减镜像体积。
* **安全**：热更新服务 (`updater.py`) 增设内网白名单拦截机制，阻断公网调用；修复 Nginx 与 SSE 跨域限制。
* **功能**：任务列表新增“模糊/精确/数值”条件过滤及组合导出；核心任务层增加站点防重复插入机制。
</details>

<details>
<summary><b>v1.1.4</b></summary><br/>

* **修复**：补齐策略中缺失的 Host 碰撞配置，确保后台任务能正常联动与下发。
* **修复**：修复全局背景样式，解决长页面滚动时底部可能出现的白边与背景闪烁问题。
* **部署**：全方位重构一键部署与热更新底层健壮性。新增并发防冲突锁、配置文件原子级写入、网络断连自动重试机制；自动清理遗留幽灵容器与磁盘废弃镜像；增加平滑停机时间（60秒）以防产生扫描脏数据；并修复了多项可能导致部署瘫痪的边缘隐患。
* **构建**：升级 GitHub Actions 构建依赖版本。
</details>

<details>
<summary><b>v1.1.3</b></summary><br/>

* **AI原生**：首次引入 MCP (Model Context Protocol) Server，赋能外部 AI 大模型无缝接管资产调度与检索。
* **UI重构**：前端样式系统全面解耦重构，新增动态主题色与自定义背景，打造极客专属工作台。
* **安全**：生产环境 Nginx 全面启用 Basic Auth 强制前置拦截，容器启动自动生成强密码凭证，实现极致防护。
* **功能**：新增全局资产指纹细粒度检索功能，支持在全系统中穿透式定位目标站点。
</details>

<details>
<summary><b>v1.1.2</b></summary><br/>

* **核心**：新增系统一键升级机制，支持平滑热更新。
* **组件**：Nuclei 扫描引擎升级至 v3.11.0。
* **前端**：极致性能优化，修复 Auth 拦截器等验证问题。
</details>

<details>
<summary><b>v1.1.1</b></summary><br/>

* **资产**：资产范围 (Scope) 扩充，全面支持并严格区分 Domain 与 IP 类型的目标校验与调度。
* **功能**：新增自定义 PoC 源码在线读取、编辑与全可视化创建管理，增强了级联删除逻辑。
* **功能**：新增字典配置模块，提供弱口令字典查询、预览及可视化读写管理。
* **优化**：360 搜索引擎采集逻辑新增反爬熔断保护，追加高价值关键字深度挖掘；生产环境 Nginx 开启 Gzip 压缩。
* **修复**：修复前端详情页高级搜索表单及组件数据联动异常。
</details>

<details>
<summary><b>v1.1.0</b></summary><br/>

* **新增**：全新引入 GitHub 威胁情报雷达（支持 CVE 漏洞雷达、安全武器库及黑客动态监测）。
* **新增**：完善告警生态，支持 Telegram 机器人推送告警。
* **重构**：前端系统设置与 Github 管理页面结构重构，全面启用 HTTP/2 多路复用，大幅降低前端并发加载延迟。
* **修复**：修复 HTTP 存活检测与站点截图组件在 Docker 下的超时和崩溃 Bug，及仪表盘漏洞趋势无数据的 Bug。
</details>

<details>
<summary><b>v1.0.9</b></summary><br/>

* **重构**：分离后端 ARL 内部漏洞与 Nuclei 引擎扫描结果的统计逻辑。
* **交互**：Dashboard 漏洞统计卡片 UI 极简重构，支持按漏洞类型与危害等级点击下钻（Drill-down）。
* **交互**：资产查询页面支持接收仪表盘的联动请求，实现页面跳转与高级筛选项的自动填充。
</details>

<details>
<summary><b>v1.0.8</b></summary><br/>

* **功能**：完善 POC 导入机制，支持批量拖拽上传验证脚本，并提供标准 Python POC 模板下载。
* **架构**：引入 Celery 任务并发热扩缩容机制，修改并发数配置后即时生效，无需重启服务。
* **重构**：重构仪表盘底层查询逻辑，统一基于站点表单库进行海量数据的高效查询。
* **部署**：深度分离开发与生产环境启动脚本，增加 POC 独立数据卷挂载。
* **优化**：优化前端站点截图预览样式防变形，并持续迭代系统内置指纹库。
</details>

---

## 🤝 致谢

本项目站在巨人的肩膀上，特此鸣谢以下项目与团队：

* **核心架构**：基于原版 [ARL 灯塔](https://github.com/TophantTechnology/ARL) 重构，并参考了 [Aabyss-Team/ARL](https://github.com/Aabyss-Team/ARL) 与 [adysec/ARL](https://github.com/adysec/ARL) 等优秀衍生版。
* **指纹引擎**：感谢 **威零安全团队** (<img src="img/weiling.jpg" width="18" height="18" align="absmiddle" /> 公众号) 提供的万级高质量指纹数据支撑。
* **功能模块**：企业资产查询深度借鉴了 [ICP_Query](https://github.com/HG-ha/ICP_Query)，威胁监控模块汲取了 [github-cve-monitor](https://github.com/yhy0/github-cve-monitor) 的设计思路。

ARL-Next 将秉持开源互助的初心，持续为信息安全社区贡献力量！

---

## 💖 赞助与投喂

感谢以下开源支持者对本项目的金钱支持与投喂，你们的支持是项目持续维护与更新的动力！

<a href="https://github.com/robotfish001">
  <img src="https://github.com/robotfish001.png" width="50" height="50" style="border-radius: 50%;" alt="robotfish-001" title="robotfish-001"/>
</a>

---

## ⚠️ 声明与免责

本工具仅面向合法授权的企业安全建设、SRC 漏洞挖掘及学术研究。使用本工具时，请务必遵守当地法律法规（如《中华人民共和国网络安全法》）及目标平台的测试规范。**未经授权的探测属非法行为。**

使用者因使用本工具造成的任何直接或间接的法律责任，由使用者自行承担，项目作者及贡献者不负任何连带责任。

---

## 💬 问题反馈与交流

- **反馈建议**：如遇 Bug 或有功能建议，欢迎提交 GitHub Issues。
- **技术交流**：欢迎添加个人微信或加入 QQ 群，探讨安全开发与红蓝对抗技术。
- **获取动态**：关注微信公众号【owl安全】，不定期获取安全干货与项目更新提醒！

<table align="center">
  <tr>
    <td align="center" style="padding: 0 40px;"><b>个人微信</b></td>
    <td align="center" style="padding: 0 40px;"><b>微信公众号 (owl安全)</b></td>
    <td align="center" style="padding: 0 40px;"><b>QQ交流群</b></td>
  </tr>
  <tr>
    <td align="center" style="padding: 0 40px;"><img src="./img/wechat.png" alt="个人微信" width="250" /></td>
    <td align="center" style="padding: 0 40px;"><img src="./img/wechat_public.jpg" alt="微信公众号 owl安全" width="250" /></td>
    <td align="center" style="padding: 0 40px;"><img src="./img/qq_group.jpg" alt="QQ交流群" width="250" /></td>
  </tr>
</table>


---

## 🌟 Star History

**⭐ 如果本项目为你的安全工作带来了便利，不妨点个 Star 支持一下！**

<div align="center">

<a href="https://www.star-history.com/?repos=owl234%2Farl-next&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=owl234/arl-next&type=date&theme=dark&legend=top-left&sealed_token=vNF3XBBUYjnOkZ1XfTODaJEURB73qlNr1zXyCH6HOUbJGKju3QmIb7pVDyjCK67Ra-ukzG7dgZ3B3HDpCKJ3raveN9bOCec7r6gDILhjGrYbcVEV2Gy5Ew" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=owl234/arl-next&type=date&legend=top-left&sealed_token=vNF3XBBUYjnOkZ1XfTODaJEURB73qlNr1zXyCH6HOUbJGKju3QmIb7pVDyjCK67Ra-ukzG7dgZ3B3HDpCKJ3raveN9bOCec7r6gDILhjGrYbcVEV2Gy5Ew" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=owl234/arl-next&type=date&legend=top-left&sealed_token=vNF3XBBUYjnOkZ1XfTODaJEURB73qlNr1zXyCH6HOUbJGKju3QmIb7pVDyjCK67Ra-ukzG7dgZ3B3HDpCKJ3raveN9bOCec7r6gDILhjGrYbcVEV2Gy5Ew" />
 </picture>
</a>

</div>


