import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Layout } from "./components/Layout";
import { BasicsView } from "./components/BasicsView";
import { TrendingView } from "./components/TrendingView";
import { ClassicsView } from "./components/ClassicsView";

type Tab = "basics" | "trending" | "classics";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("basics");

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {activeTab === "basics" && <BasicsView />}
          {activeTab === "trending" && <TrendingView />}
          {activeTab === "classics" && <ClassicsView />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
