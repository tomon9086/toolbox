"use client";

import { useState } from "react";
import { CameraCalculator } from "@/components/tools/CameraCalculator";
import { Sidebar } from "@/components/ui/Sidebar";
import type { Tool } from "@/types/tools";

const tools: Tool[] = [
  {
    id: "camera/angle-of-view",
    name: "カメラレンズの画角",
    description: "焦点距離とセンサーサイズから画角を計算",
    icon: "📷",
  },
];

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string | null>(
    "camera/angle-of-view",
  );

  const renderTool = () => {
    switch (selectedTool) {
      case "camera/angle-of-view":
        return <CameraCalculator />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                ツールを選択してください
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                左のサイドバーから使用したいツールを選択してください。
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar
        tools={tools}
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderTool()}</div>
      </main>
    </div>
  );
}
