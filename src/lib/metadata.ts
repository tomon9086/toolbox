import type { Metadata } from "next";
import { BASE_HOST_URL } from "@/constants/host";
import { tools } from "@/lib/tools";

export function generateToolMetadata(
  toolId: string,
  twitterCardType: "summary_large_image" | "summary" = "summary_large_image",
): Metadata {
  const tool = tools[toolId];

  if (!tool) {
    return {
      title: "ツールが見つかりません - Toolbox",
      description: "指定されたツールが見つかりませんでした。",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || BASE_HOST_URL;
  const ogImageLargeUrl = `${baseUrl}/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}&icon=${encodeURIComponent(tool.icon || "🔧")}&format=large`;
  const ogImageSquareUrl = `${baseUrl}/api/og?title=${encodeURIComponent(tool.name)}&description=${encodeURIComponent(tool.description)}&icon=${encodeURIComponent(tool.icon || "🔧")}&format=square`;

  const twitterImageUrl =
    twitterCardType === "summary" ? ogImageSquareUrl : ogImageLargeUrl;

  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - Toolbox`,
      description: tool.description,
      type: "website",
      locale: "ja_JP",
      siteName: "Toolbox",
      images: [
        {
          url: ogImageLargeUrl,
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${tool.description}`,
        },
        {
          url: ogImageSquareUrl,
          width: 600,
          height: 600,
          alt: `${tool.name} - ${tool.description}`,
        },
      ],
    },
    twitter: {
      card: twitterCardType,
      title: `${tool.name} - Toolbox`,
      description: tool.description,
      images: [twitterImageUrl],
    },
  };
}
