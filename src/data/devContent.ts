export const DEV_PRACTICES_CONTENT = [
  {
    id: "openclaw-assistant",
    title: "OpenClaw：从零打造你的全能 AI 个人助手",
    description: "解析如何利用 OpenClaw 框架，结合大模型与本地工具链，构建一个能帮你回邮件、整理文件、甚至点外卖的超级助理。",
    content: `
# OpenClaw：构建自主运行的 AI 个人助手

随着 AI Agent 技术的成熟，我们不再满足于在网页框里聊天。**OpenClaw**（以及类似的开源框架）致力于将大模型与本地操作系统深度结合，打造一个能真正“动手”的个人助理。

\`\`\`mermaid
graph TD
  User["用户 (自然语言指令)"] --> Brain["Agent 大脑 (LLM + 记忆)"]
  
  subgraph LocalEnv ["本地执行环境"]
    Brain -->|调用工具| ToolRegistry["工具注册表 (Tools)"]
    ToolRegistry --> T1["文件系统 (读写/整理)"]
    ToolRegistry --> T2["系统 API (发邮件/日历)"]
    ToolRegistry --> T3["浏览器自动化 (RPA)"]
  end
  
  T1 -->|返回结果| Brain
  T2 -->|返回结果| Brain
  T3 -->|返回结果| Brain
\`\`\`

## 1. 为什么需要 OpenClaw？
传统的 ChatGPT 无法访问你的本地文件，也无法帮你点击屏幕。OpenClaw 通过提供一个安全的**本地沙箱**和**丰富的工具集 (Toolkits)**，让大模型拥有了“手”和“眼”。

## 2. 核心架构设计
- **感知层 (Perception)**：读取屏幕截图、监听剪贴板、读取特定目录的文件。
- **决策层 (Planning)**：使用 ReAct (Reasoning and Acting) 框架。模型先思考“我需要做什么”，然后决定“调用哪个本地工具”。
- **执行层 (Action)**：执行 Python 脚本、Bash 命令或 AppleScript。

## 3. 开发实践：注册一个“整理桌面”的 Skill
在 OpenClaw 中，你可以轻松扩展它的能力。以下是一个自定义 Tool 的伪代码示例：

\`\`\`python
from openclaw.tools import BaseTool
import os, shutil

class OrganizeDesktopTool(BaseTool):
    name = "organize_desktop"
    description = "将桌面上的文件按类型（图片、文档、代码）自动分类到不同文件夹中。"
    
    def _run(self) -> str:
        desktop_path = os.path.expanduser("~/Desktop")
        # 具体的分类逻辑...
        return "桌面已成功整理，共移动了 15 个文件。"
\`\`\`
将这个 Tool 注册给 Agent 后，你只需要对它说：“我的桌面太乱了，帮我收拾一下”，它就会自主调用该代码完成任务。
    `
  },
  {
    id: "claude-code",
    title: "Claude Code + MCP：下一代 AI 终端编程体验",
    description: "探索 Anthropic 最新发布的 Claude Code，以及如何通过 MCP (Model Context Protocol) 为其扩展自定义 Skill。",
    content: `
# Claude Code + MCP：重塑终端编程体验

Anthropic 推出的 **Claude Code** 是一款直接运行在终端 (CLI) 的 AI 编程助手。它不仅能写代码，还能直接执行命令、运行测试。而让它变得无比强大的秘密武器，是 **MCP (Model Context Protocol)**。

\`\`\`mermaid
graph LR
  Claude["Claude Code (终端)"] <-->|标准化 JSON-RPC| MCPServer["MCP Server (本地/远程)"]
  
  subgraph Skills ["自定义 Skills / 数据源"]
    MCPServer <--> DB["本地数据库 (PostgreSQL)"]
    MCPServer <--> Git["Git 仓库"]
    MCPServer <--> Jira["Jira 任务看板"]
  end
\`\`\`

## 1. 什么是 MCP (Model Context Protocol)？
过去，要让 AI 访问外部数据，你需要为每个 AI 应用写特定的插件。**MCP 是一个开源的标准化协议**，它就像是 AI 时代的 USB 接口。
只要你写了一个 MCP Server（比如连接本地数据库），任何支持 MCP 的客户端（如 Claude Code, Cursor, AI Studio）都可以直接即插即用，读取你的数据库或调用你的内部 API。

## 2. Claude Code 的核心工作流
1. **理解上下文**：它会自动读取你当前目录的结构和 Git 历史。
2. **自主执行**：你输入 \`claude "帮我修一下那个登录报错"\`。
3. **调用 Skill**：它通过 MCP 调用 \`grep\` 搜索日志，调用 \`git diff\` 查看最近更改，甚至调用 \`npm test\` 验证修复结果。

## 3. 开发实践：编写一个 MCP Server (Skill)
假设我们想让 Claude Code 能够直接查询公司的内部员工目录。我们可以用 TypeScript 写一个极简的 MCP Server：

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "employee-dir", version: "1.0.0" }, {
  capabilities: { tools: {} }
});

// 注册一个 Tool (Skill)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_employee") {
    const name = request.params.arguments.name;
    // 模拟查询数据库
    const info = { name, department: "AI Lab", role: "Engineer" };
    return {
      content: [{ type: "text", text: JSON.stringify(info) }]
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`
启动这个 Server 后，Claude Code 就能理解并使用 \`get_employee\` 这个工具了！

## 4. 实战案例：全自动视频内容生成与剪辑

假设你是一个自媒体创作者，需要将一篇爆款文案快速制作成短视频。过去你需要打开剪辑软件，找素材、配音、对齐字幕。现在，我们可以通过 **Claude Code + MCP** 实现全自动流水线。

### 架构设计
我们编写一个名为 \`video-studio-mcp\` 的 Server，提供以下 Skills（工具）：
1. \`generate_tts\`: 调用大模型语音接口（如 ElevenLabs）生成配音。
2. \`search_stock_video\`: 搜索并下载免版权的空镜素材（如 Pexels API）。
3. \`ffmpeg_edit\`: 封装 FFmpeg 命令，用于视频拼接、添加背景音乐和烧录字幕。

### 终端实战演示
在终端中启动 Claude Code 并接入 MCP Server 后，你只需要输入一句话：

> **User**: "读取当前目录下的 \`script.txt\`，帮我制作一个 30 秒的科普短视频，主题是'黑洞是什么'。配音要深沉一点，配上星空的背景视频，最后输出 \`final_video.mp4\`。"

**Claude Code 的自主执行过程**：
1. **读取文件**：调用内置工具读取 \`script.txt\` 的文案。
2. **生成配音**：调用 MCP 提供的 \`generate_tts\`，传入文案和音色参数 \`voice="deep_male"\`，得到 \`audio.mp3\`。
3. **获取素材**：调用 \`search_stock_video\`，搜索关键词 "black hole, space, galaxy"，下载 3 段 10 秒的视频素材。
4. **视频剪辑**：调用 \`ffmpeg_edit\`，将 3 段视频拼接，混音 \`audio.mp3\`，并根据音频时长自动对齐画面。
5. **完成反馈**：在终端输出："视频已生成完毕，保存在 ./final_video.mp4，总时长 32 秒。"

通过 MCP，Claude Code 不再只是一个“聊天框里的程序员”，它变成了一个拥有完整音视频处理能力的**全自动数字导演**。
    `
  },
  {
    id: "ai-hardware-plants",
    title: "树莓派 + VLM：打造会“说话”的智能植物种植舱",
    description: "结合物联网硬件、传感器与视觉大模型 (VLM)，让你的植物不仅能自动浇水，还能通过微信告诉你它今天心情如何。",
    content: `
# 硬件改造 + AI：打造会“说话”的智能植物舱

物联网 (IoT) 结合生成式 AI，正在催生出极其有趣的化学反应。在这个案例中，我们将使用树莓派 (Raspberry Pi)、传感器和视觉大模型 (VLM)，把一盆普通的绿植变成一个有情绪的“电子宠物”。

\`\`\`mermaid
graph TD
  subgraph Hardware ["硬件层 (树莓派)"]
    Camera["摄像头 (定时拍照)"]
    Sensor["土壤湿度传感器"]
    Pump["微型水泵"]
  end
  
  subgraph AI_Layer ["AI 决策层 (VLM)"]
    Prompt["Prompt: 分析植物状态并决定是否浇水"]
    Gemini["Gemini Pro Vision"]
  end
  
  subgraph Action ["执行与反馈"]
    WeChat["微信/钉钉推送"]
    Control["GPIO 控制水泵"]
  end
  
  Camera -->|图片| Gemini
  Sensor -->|湿度数据| Gemini
  Prompt --> Gemini
  
  Gemini -->|JSON 决策| Control
  Gemini -->|拟人化文案| WeChat
\`\`\`

## 1. 系统设计思路
传统的自动浇水系统只是简单的“湿度低于 30% 就抽水”。
引入 AI 后，系统变成了：
1. 摄像头拍下植物当前的照片。
2. 传感器读取当前湿度（如 25%）。
3. 将**照片 + 湿度数据**一起发送给视觉大模型（如 Gemini 1.5 Pro）。
4. AI 不仅判断是否需要浇水，还会观察叶片是否发黄、是否有虫害，并生成一段拟人化的吐槽。

## 2. 核心 Prompt 设计
让 AI 扮演植物的灵魂，这是最有趣的部分：

> "你现在是一盆名叫'翠花'的薄荷。这是一张你现在的自拍照，以及你根部的土壤湿度（25%）。
> 请仔细观察照片中叶片的状态。
> 1. 决定是否需要启动水泵浇水（输出布尔值）。
> 2. 以第一人称写一段 50 字以内的微信消息发给主人，表达你现在的感受（比如渴了、太晒了、或者长得很好）。
> 请以严格的 JSON 格式返回。"

## 3. Python 核心代码实现

\`\`\`python
import RPi.GPIO as GPIO
import google.generativeai as genai
from PIL import Image

# 初始化 AI
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel('gemini-1.5-pro')

def evaluate_plant(image_path, moisture):
    img = Image.open(image_path)
    prompt = f"你是我的植物。当前土壤湿度是 {moisture}%。请根据图片和湿度，返回JSON: {{'needs_water': bool, 'message': str}}"
    
    response = model.generate_content([prompt, img])
    result = parse_json(response.text)
    
    if result['needs_water']:
        turn_on_pump() # 触发硬件 GPIO
        
    send_wechat_message(result['message']) # 发送通知
    print(f"植物说: {result['message']}")

# 运行
evaluate_plant("plant_now.jpg", 25)
\`\`\`

## 4. 扩展玩法
- **光照追踪**：增加舵机，让 AI 根据照片判断阳光方向，自动旋转花盆让植物均匀受光。
- **成长日记**：每天生成一条植物日记，年底用 AI 自动剪辑成一段延时摄影配音视频。
    `
  }
];
