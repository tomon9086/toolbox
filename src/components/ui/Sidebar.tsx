import type { Tool } from "@/types/tools";

interface SidebarProps {
  tools: Tool[];
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

export function Sidebar({ tools, selectedTool, onToolSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Toolbox
        </h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {tools.map((tool) => (
            <li key={tool.id}>
              <button
                type="button"
                onClick={() => onToolSelect(tool.id)}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    selectedTool === tool.id
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {tool.icon && <span className="text-lg">{tool.icon}</span>}
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tool.description}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
