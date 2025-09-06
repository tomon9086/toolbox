"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { tools } from "@/lib/tools";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 現在のパスからツールIDを取得
  const getCurrentTool = () => {
    const toolMatch = pathname.match(/^\/tool\/(.+)$/);
    return toolMatch ? toolMatch[1] : undefined;
  };

  const selectedTool = getCurrentTool();

  const handleToolSelect = (toolId: string) => {
    router.push(`/tool/${toolId}`);
    setSidebarOpen(false);
  };

  // 現在のページタイトルを取得
  const getPageTitle = () => {
    if (selectedTool && tools[selectedTool]) {
      return tools[selectedTool].name;
    }
    return "Toolbox";
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar
        tools={Object.values(tools)}
        selectedTool={selectedTool}
        onToolSelect={handleToolSelect}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">
        {/* モバイル用ヘッダー */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {getPageTitle()}
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
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
