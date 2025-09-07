import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{
    category: string;
    tool: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, tool } = await params;
  const toolId = `${category}/${tool}`;

  return generateToolMetadata(toolId, "summary");
}

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
