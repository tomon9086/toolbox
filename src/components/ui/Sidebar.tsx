import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { useCallback } from "react";
import type { Tool } from "@/types/tools";

interface SidebarProps {
  tools: Tool[];
  selectedTool?: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({
  tools,
  selectedTool,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  return (
    <>
      {/* オーバーレイ（モバイル用） */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-label="サイドバーを閉じる"
        />
      )}

      {/* サイドバー */}
      <div
        className={`
          fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          w-64 bg-gray-50 dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-700 h-full
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Toolbox
            </Link>
            {/* モバイル用クローズボタン */}
            <button
              type="button"
              onClick={closeSidebar}
              className="md:hidden p-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="メニューを閉じる"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav className="p-2 flex-1">
          <ul className="space-y-1">
            {tools.map((tool) => (
              <li key={tool.id}>
                <Link href={`/tool/${tool.id}`} onClick={closeSidebar}>
                  <button
                    type="button"
                    className={clsx(
                      "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                      selectedTool === tool.id
                        ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      {tool.icon && (
                        <span className="text-lg">{tool.icon}</span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{tool.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {tool.description}
                        </div>
                      </div>
                    </div>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* フッタ */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <a
            href="https://github.com/tomon9086/toolbox"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}
