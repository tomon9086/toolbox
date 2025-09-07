import type { Tool } from "@/types/tools";

export const tools: Record<string, Tool> = {
  "camera/angle-of-view": {
    id: "camera/angle-of-view",
    name: "カメラレンズの画角",
    description: "焦点距離とセンサーサイズから画角を計算",
    icon: "📷",
  },
  "random/password-generator": {
    id: "random/password-generator",
    name: "パスワード生成器",
    description: "かんたんに安全なパスワードを生成",
    icon: "🔒",
  },
};
