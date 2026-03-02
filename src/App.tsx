import { useState } from "react";
import { Layout } from "./components/Layout";
import { BasicsView } from "./components/BasicsView";
import { TrendingView } from "./components/TrendingView";
import { TrendsView } from "./components/TrendsView";
import { DevPracticesView } from "./components/DevPracticesView";
import { ClassicsView } from "./components/ClassicsView";

type Tab = "basics" | "trending" | "trends" | "dev-practices" | "classics";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("basics");

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "basics" && <BasicsView />}
      {activeTab === "trending" && <TrendingView />}
      {activeTab === "trends" && <TrendsView />}
      {activeTab === "dev-practices" && <DevPracticesView />}
      {activeTab === "classics" && <ClassicsView />}
    </Layout>
  );
}
