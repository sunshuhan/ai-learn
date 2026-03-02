import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Code2, Terminal, Leaf } from "lucide-react";
import { DEV_PRACTICES_CONTENT } from "../data/devContent";
import { Mermaid } from "./Mermaid";

const ICONS: Record<string, any> = {
  "openclaw-assistant": Terminal,
  "claude-code": Code2,
  "ai-hardware-plants": Leaf,
};

export function DevPracticesView() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const activeContent = activeTopic ? DEV_PRACTICES_CONTENT.find(c => c.id === activeTopic) : null;

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
              <div className="flex items-center mb-2">
                <Code2 className="w-8 h-8 text-indigo-600 mr-3" />
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">开发实践案例</h1>
              </div>
              <p className="text-zinc-500">面向开发者的硬核技术解析，从架构设计到代码落地。</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {DEV_PRACTICES_CONTENT.map((topic) => {
                const Icon = ICONS[topic.id] || Code2;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic.id)}
                    className="flex flex-col md:flex-row md:items-start text-left p-5 md:p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
                  >
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl mb-4 md:mb-0 md:mr-6 shrink-0 w-fit">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-zinc-500 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="article"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 md:p-12"
          >
            <button
              onClick={() => setActiveTopic(null)}
              className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回案例列表
            </button>

            <div className="markdown-body max-w-none">
              <Markdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!inline && match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\\n$/, '')} />;
                    }
                    return <code className={className} {...props}>{children}</code>;
                  }
                }}
              >
                {activeContent?.content || ""}
              </Markdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
