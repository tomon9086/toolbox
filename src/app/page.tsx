export default function Home() {
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
