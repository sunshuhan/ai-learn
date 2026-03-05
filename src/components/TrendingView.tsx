import { motion } from "motion/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { STATIC_TRENDING_CONTENT } from "../data/staticContent";
import { Mermaid } from "./Mermaid";

export function TrendingView() {
  return (
    <div className="w-full space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">热门资讯</h1>
          <p className="text-zinc-500">每日实时收集整理，掌握 AI 领域最新动态。</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 md:p-8 min-h-[400px]">
        <div className="markdown-body">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => (
                <img {...props} referrerPolicy="no-referrer" className="rounded-xl my-6 w-full h-[320px] object-cover shadow-sm" />
              ),
              code(props) {
                const {children, className, node, ...rest} = props;
                const match = /language-(\w+)/.exec(className || '');
                if (match && match[1] === 'mermaid') {
                  return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                }
                return <code {...rest} className={className}>{children}</code>;
              }
            }}
          >
            {STATIC_TRENDING_CONTENT}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
