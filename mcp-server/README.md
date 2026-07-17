# 🤖 ARL-Next MCP Server

> 为 AI 助手量身定制的 ARL 资产侦察灯塔系统接口，让大模型（如 Cursor, Claude, Antigravity）无缝接管安全运营。

---

## ⚡ 极速接入

本服务已全面容器化，无需配置 Node.js 依赖。推荐使用一键复制功能：

💡 **快捷方式**：登录 ARL-Next 首页，点击右上角 **「AI 助手接入 (MCP)」** 复制您的专属配置。

**手动配置示例** (添加至您的 AI 客户端 `mcpServers` 节点)：

```json
"ARL-Next": {
  "command": "docker",
  "args": [
    "run", "-i", "--rm",
    "-e", "ARL_HOST",
    "-e", "ARL_TOKEN",
    "arl-next-mcp:latest"
  ],
  "env": {
    "ARL_HOST": "https://[您的服务器IP或域名]:5000",
    "ARL_TOKEN": "您的_API_TOKEN"
  }
}
```
*注：初次使用需先拉取本项目代码，并在终端进入 `mcp-server` 目录后执行 `docker build -t arl-next-mcp:latest .` 以构建本地镜像。*

**💡 常见 AI 客户端配置路径：**

| 客户端 | 配置入口 / 文件路径 |
| :--- | :--- |
| **Claude Desktop** | **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`<br>**Win**: `%APPDATA%\Claude\claude_desktop_config.json` |
| **Cursor** | 面板：`Settings` -> `Features` -> `MCP` -> `+ Add new MCP server` |
| **Antigravity** | **全局**: `~/.gemini/config/mcp.json`<br>**项目**: `.gemini/mcp.json` |
| **Codex** | **全局**: `~/.codex/config.toml` (在 `[mcp_servers.arl-next]` 节点添加) |

---

## 🛠️ 核心能力矩阵 (Tools)

AI 助手已自动掌握以下 6 大核心技能，支持智能化分页与纠错：

### 🔍 资产与漏洞分析
- **`search_assets`** 资产检索：全方位搜寻站点、IP、域名、证书及服务指纹。 *(例: "查一下开了 nginx 的站点")*
- **`search_vulns`** 漏洞查询：精准检索安全漏洞，支持按严重级别过滤。 *(例: "最近有哪些高危漏洞？")*
- **`get_tasks`** 任务监控：实时跟进扫描任务的进度与状态。 *(例: "看看有没有失败的任务")*
- **`get_dashboard_summary`** 运行概览：一键生成全盘资产、任务与漏洞统计大盘。 *(例: "给我一份今日战报")*

### 🏢 商业/备案情报 (ICP)
- **`search_icp_tasks`** ICP 任务追踪：查询企业备案拉取任务进度。 *(例: "某某公司的ICP查完没？")*
- **`search_icp_assets`** 子资产挖掘：深挖小程序、公众号、快应用等扩展资产。 *(例: "列出那个任务查到的所有公众号")*

---

## 📚 API 参考

开发者需要直接对接后端 API？
ARL-Next 提供开箱即用的 OpenAPI (Swagger) 交互式文档：
👉 访问地址：`https://[您的服务器IP或域名]:5173/api/doc`
