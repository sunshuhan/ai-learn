import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateAIContent } from "../services/gemini";
import { Loader2, RefreshCw } from "lucide-react";

export function TrendingView() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchTrending = async (force = false) => {
    const today = new Date().toISOString().split("T")[0];
    
    if (!force) {
      const cachedDate = localStorage.getItem("ai_learning_trending_date");
      const cachedContent = localStorage.getItem("ai_learning_trending_data");
      
      if (cachedDate === today && cachedContent) {
        setContent(cachedContent);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    try {
      const prompt = `请搜索并总结过去24-48小时内全球人工智能领域最重要、最热门的 Top 10 条新闻或发布会信息。
要求：
1. 必须提供整整 10 条新闻。
2. 每条新闻包含一个吸引人的标题（加粗）。
3. 提供一段精炼的摘要说明其重要性。
4. 必须包含信息来源和相关链接。
5. **关键：**请在每条新闻的开头，使用 Markdown 格式插入一张配图。配图链接请使用 \`https://picsum.photos/seed/{与新闻相关的英文关键词}/800/400\`，例如 \`![AI Chip](https://picsum.photos/seed/semiconductor/800/400)\`。
6. 使用 Markdown 格式输出。`;
      
      // Use pro model with search grounding for real-time news
      const result = await generateAIContent(prompt, { useSearch: true, model: "gemini-3.1-pro-preview" });
      
      // Cache the result
      localStorage.setItem("ai_learning_trending_date", today);
      localStorage.setItem("ai_learning_trending_data", result);
      
      setContent(result);
    } catch (error) {
      setContent("获取热门资讯失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
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
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">热门资讯</h1>
            <p className="text-zinc-500">每日实时收集整理，掌握 AI 领域最新动态。</p>
          </div>
          <button
            onClick={() => fetchTrending(true)}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 md:p-8 min-h-[400px]">
          {loading ? (
            <div className="h-full py-20 flex flex-col items-center justify-center text-zinc-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-600" />
              <p>正在全网搜索最新的 AI 资讯...</p>
            </div>
          ) : (
            <div className="markdown-body">
              <Markdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({node, ...props}) => (
                    <img {...props} referrerPolicy="no-referrer" className="rounded-xl my-6 w-full h-[320px] object-cover shadow-sm" />
                  )
                }}
              >
                {content}
              </Markdown>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
