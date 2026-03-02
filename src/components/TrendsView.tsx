import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateAIContent } from "../services/gemini";
import { Loader2, Telescope, RefreshCw } from "lucide-react";

export function TrendsView() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchTrends = async (force = false) => {
    const today = new Date().toISOString().split("T")[0];
    
    if (!force) {
      const cachedDate = localStorage.getItem("ai_learning_trends_date");
      const cachedContent = localStorage.getItem("ai_learning_trends_data");
      
      if (cachedDate === today && cachedContent) {
        setContent(cachedContent);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const prompt = `请结合最新的行业报告和技术突破，深度分析未来1-3年内人工智能领域的 Top 10 核心发展趋势。
要求：
1. 必须提供整整 10 个趋势。
2. 趋势分析要有深度，不仅说明“是什么”，还要解释“为什么”以及“潜在影响”。
3. 涵盖技术层面（如模型架构演进、多模态等）和应用层面（如具身智能、AI Agent等）。
4. **关键：**请在每个趋势的开头，使用 Markdown 格式插入一张配图。配图链接请使用 \`https://picsum.photos/seed/{与趋势相关的英文关键词}/800/400\`，例如 \`![Robotics](https://picsum.photos/seed/robotics/800/400)\`。
5. 结构清晰，使用 Markdown 格式输出。`;
      
      // Use pro model with search grounding for deep analysis
      const result = await generateAIContent(prompt, { useSearch: true, model: "gemini-3.1-pro-preview" });
      
      // Cache the result
      localStorage.setItem("ai_learning_trends_date", today);
      localStorage.setItem("ai_learning_trends_data", result);
      
      setContent(result);
    } catch (error) {
      setContent("获取趋势分析失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">未来趋势</h1>
            <p className="text-zinc-500">深度解析 AI 技术演进方向与行业变革。</p>
          </div>
          <button
            onClick={() => fetchTrends(true)}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </button>
        </div>

        <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative p-6 md:p-10">
            <div className="flex items-center mb-8 pb-6 border-b border-zinc-800">
              <div className="p-3 bg-zinc-800 rounded-xl mr-4">
                <Telescope className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">AI 行业前沿洞察</h2>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-400" />
                <p>正在生成深度趋势分析报告...</p>
              </div>
            ) : (
              <div className="markdown-body prose-invert">
                <Markdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({node, ...props}) => (
                      <img {...props} referrerPolicy="no-referrer" className="rounded-xl my-6 w-full h-[320px] object-cover shadow-md border border-zinc-800" />
                    )
                  }}
                >
                  {content}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
