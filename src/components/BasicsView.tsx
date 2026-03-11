import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, BookOpen, Brain, Sparkles, Code, Lightbulb, Image, Globe, Bot, Wand2, Database } from "lucide-react";
import { BASICS_CONTENT } from "../data/basicsContent";
import { Mermaid } from "./Mermaid";

const TOPICS = [
  {
    id: "understanding-ai",
    title: "对 AI 的理解",
    description: "什么是人工智能？它能做什么，不能做什么？建立对 AI 的正确认知。",
    icon: Lightbulb,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "ml-basics",
    title: "机器学习基础",
    description: "深入拆解监督学习、无监督学习与强化学习三大范式及其与 LLM 的进化关系。",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "neural-networks",
    title: "神经网络与深度学习",
    description: "探索大脑启发的计算模型，理解前向传播与反向传播。",
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "llm",
    title: "大语言模型 (LLM)",
    description: "揭秘 ChatGPT、Gemini 背后的 Transformer 架构与工作原理。",
    icon: Sparkles,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "vlm",
    title: "VLM 与多模态大模型",
    description: "让 AI 睁开眼睛：解析视觉语言模型与 CLIP/ViT 架构。",
    icon: Image,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: "spatial-models",
    title: "空间智能与世界模型",
    description: "Sora 背后的技术：AI 如何理解物理法则与三维空间。",
    icon: Globe,
    color: "bg-teal-50 text-teal-600",
  },
  {
    id: "ai-agents",
    title: "AI Agent 智能体",
    description: "从大脑到数字员工：解析 Agent 的四大组件与 ReAct 运行机制。",
    icon: Bot,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "vector-db",
    title: "向量数据库",
    description: "AI 的长期记忆：解析嵌入模型、相似性检索与 RAG 架构。",
    icon: Database,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "llm-creativity",
    title: "成语接龙 vs 创造性",
    description: "探讨如何让大模型打破“成语接龙”的局限，具备真正的创造性。",
    icon: Wand2,
    color: "bg-violet-50 text-violet-600",
  },
];

export function BasicsView() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    const mainContent = document.querySelector('main > div');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [activeTopic]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!activeTopic ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">基础学习</h1>
              <p className="text-zinc-500">从零开始，掌握人工智能的核心概念与技术原理。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic.id)}
                    className="flex flex-col text-left p-5 md:p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
                  >
                    <div className={`p-3 rounded-xl w-fit mb-4 ${topic.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {topic.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="article"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-zinc-200 shadow-sm"
          >
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm pt-4 pb-4 px-5 md:px-8 border-b border-zinc-100 rounded-t-2xl">
              <button
                onClick={() => setActiveTopic(null)}
                className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回课程列表
              </button>
            </div>

            <div className="p-5 md:p-8 pt-6 md:pt-8 markdown-body max-w-none">
              <Markdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!inline && match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return <code className={className} {...props}>{children}</code>;
                  }
                }}
              >
                {BASICS_CONTENT[activeTopic]}
              </Markdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
