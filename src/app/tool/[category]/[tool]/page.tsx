import { notFound } from "next/navigation";
import CameraAngleOfViewTool from "@/components/tools/camera/AngleOfView";
import RandomPasswordGeneratorTool from "@/components/tools/random/PasswordGenerator";

interface Props {
  params: Promise<{
    category: string;
    tool: string;
  }>;
}

export default async function ToolPage({ params }: Props) {
  const { category, tool } = await params;
  const toolId = `${category}/${tool}`;

  // ツールIDに基づいて適切なコンポーネントを返す
  switch (toolId) {
    case "camera/angle-of-view":
      return <CameraAngleOfViewTool />;
    case "random/password-generator":
      return <RandomPasswordGeneratorTool />;
    default:
      // 該当するツールが見つからない場合は404を返す
      notFound();
  }
}
