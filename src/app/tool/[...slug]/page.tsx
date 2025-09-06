"use client";

import { useParams, useRouter } from "next/navigation";
import { CameraAngleOfViewCalculator } from "@/components/tools/camera/AngleOfView";
import { tools } from "@/lib/tools";

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();

  // URLパラメータからツールIDを構築
  const selectedTool = Array.isArray(params.slug)
    ? params.slug.join("/")
    : params.slug || "";

  // 選択されたツールが存在しない場合はリダイレクト
  if (!selectedTool || !tools[selectedTool]) {
    router.push("/");
    return null;
  }

  const renderTool = () => {
    switch (selectedTool) {
      case "camera/angle-of-view":
        return <CameraAngleOfViewCalculator />;
      default:
        return null;
    }
  };

  return renderTool();
}
