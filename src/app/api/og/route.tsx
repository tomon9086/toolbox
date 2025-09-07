import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Toolbox";
    const description = searchParams.get("description") || "便利なツール集";
    const icon = searchParams.get("icon") || "🔧";
    const format = searchParams.get("format") || "large"; // large または square

    // 文字列の長さに応じてフォントサイズとレイアウトを調整
    const isSquare = format === "square";
    const titleLength = title.length;
    const descriptionLength = description.length;

    // タイトルの処理（2行まで表示、それ以上は省略）
    const displayTitle = title; // 省略せず、CSSで制御

    // 説明文の処理（長い場合は省略）
    const displayDescription =
      descriptionLength > 40
        ? description.substring(0, 37) + "..."
        : description;

    // フォントサイズの動的調整（2行表示を考慮）
    const titleFontSize = isSquare
      ? titleLength > 25
        ? "28px"
        : titleLength > 15
          ? "32px"
          : "36px"
      : titleLength > 35
        ? "44px"
        : titleLength > 25
          ? "52px"
          : "60px";

    const descriptionFontSize = isSquare
      ? descriptionLength > 30
        ? "18px"
        : "20px"
      : descriptionLength > 50
        ? "24px"
        : descriptionLength > 35
          ? "28px"
          : "32px";

    const iconSize = isSquare ? "60px" : "120px";
    const containerSize = isSquare ? "400px" : "1000px";
    const padding = isSquare ? "40px" : "60px";
    const margin = isSquare ? "20px" : "40px";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: isSquare ? "16px" : "20px",
            padding: padding,
            margin: margin,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            width: containerSize,
            height: containerSize,
            maxWidth: containerSize,
            maxHeight: containerSize,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: iconSize,
                marginBottom: isSquare ? "16px" : "30px",
                lineHeight: 1,
              }}
            >
              {icon}
            </div>
            <div
              style={{
                fontSize: titleFontSize,
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: isSquare ? "12px" : "20px",
                textAlign: "center",
                lineHeight: 1.1,
                width: "100%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {displayTitle}
            </div>
            <div
              style={{
                fontSize: descriptionFontSize,
                color: "#666666",
                textAlign: "center",
                lineHeight: 1.2,
                width: "100%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: isSquare ? 2 : 3,
                marginBottom: isSquare ? "12px" : "20px",
              }}
            >
              {displayDescription}
            </div>
            <div
              style={{
                fontSize: isSquare ? "16px" : "24px",
                color: "#999999",
                fontWeight: "500",
              }}
            >
              Toolbox
            </div>
          </div>
        </div>
      </div>,
      {
        width: isSquare ? 600 : 1200,
        height: isSquare ? 600 : 630,
      },
    );
  } catch (e) {
    console.log(`Error generating OG image: ${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
