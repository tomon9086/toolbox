"use client";

import { useState } from "react";
import { CameraAngleOfViewCalculator } from "@/components/tools/camera/AngleOfView";
import { Sidebar } from "@/components/ui/Sidebar";
import type { Tool } from "@/types/tools";

const tools: Record<string, Tool> = {
  "camera/angle-of-view": {
    id: "camera/angle-of-view",
    name: "カメラレンズの画角",
    description: "焦点距離とセンサーサイズから画角を計算",
    icon: "📷",
  },
};

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTool = () => {
    switch (selectedTool) {
      case "camera/angle-of-view":
        return <CameraAngleOfViewCalculator />;
      default:
        return (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center px-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                ツールを選択してください
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <span className="hidden md:inline">左のサイドバー</span>
                <span className="md:hidden">メニュー</span>
                から使用したいツールを選択してください。
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar
        tools={Object.values(tools)}
        selectedTool={selectedTool}
        onToolSelect={(toolId) => {
          setSelectedTool(toolId);
          setSidebarOpen(false); // モバイルでツール選択時にサイドバーを閉じる
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">
        {/* モバイル用ヘッダー */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedTool ? tools[selectedTool].name : "Toolbox"}
            </h1>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="メニューを開く"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">{renderTool()}</div>
      </main>
    </div>
  );
}
