import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, Library, FileText } from "lucide-react";
import { CLASSICS_CONTENT } from "../data/classicsContent";

export function ClassicsView() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    const mainContent = document.querySelector('main > div');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [activeTopic]);

  const activeContent = activeTopic ? CLASSICS_CONTENT.find(c => c.id === activeTopic) : null;

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
                <Library className="w-8 h-8 text-indigo-600 mr-3" />
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">经典原文</h1>
              </div>
              <p className="text-zinc-500">阅读改变 AI 历史的经典论文与科技领袖的深度思考。</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {CLASSICS_CONTENT.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className="flex flex-col md:flex-row md:items-center text-left p-5 md:p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
                >
                  <div className="p-4 bg-amber-50 text-amber-600 rounded-xl mb-4 md:mb-0 md:mr-6 shrink-0 w-fit">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm font-medium text-indigo-600 mb-2">
                      {topic.author}
                    </p>
                    <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                      {topic.description}
                    </p>
                  </div>
                </button>
              ))}
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
              返回文献列表
            </button>

            <div className="markdown-body max-w-none">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {activeContent?.content || ""}
              </Markdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
