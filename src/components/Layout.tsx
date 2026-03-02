import React from "react";
import { BookOpen, Flame, LineChart, Cpu, Code2, Library } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = "basics" | "trending" | "classics";

interface LayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}

export function Layout({ activeTab, onTabChange, children }: LayoutProps) {
  const tabs = [
    { id: "basics", label: "基础学习", icon: BookOpen },
    { id: "trending", label: "热门资讯", icon: Flame },
    { id: "classics", label: "经典原文", icon: Library },
  ] as const;

  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center h-14 px-4 bg-white border-b border-zinc-200 shrink-0 z-10">
        <Cpu className="w-5 h-5 text-indigo-600 mr-2" />
        <span className="font-semibold text-base tracking-tight">AI Insight</span>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-zinc-200 bg-white flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-zinc-100">
          <Cpu className="w-6 h-6 text-indigo-600 mr-3" />
          <span className="font-semibold text-lg tracking-tight">AI Insight</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-indigo-600" : "text-zinc-400")} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-100">
          <div className="text-xs text-zinc-400 font-mono text-center">
            Powered by Gemini
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-around items-center h-16 px-1 z-50 pb-safe">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-zinc-400")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
