import type { CameraInput, CameraOutput } from "@/types/tools";

/**
 * 角度をラジアンから度に変換
 */
function radToDeg(rad: number): number {
  return rad * (180 / Math.PI);
}

/**
 * カメラの画角と撮影範囲を計算
 */
export function calculateCameraAngles(input: CameraInput): CameraOutput {
  const { focalLength, sensorWidth, sensorHeight, distance } = input;

  // 画角計算（ラジアン）
  const horizontalAngleRad = 2 * Math.atan(sensorWidth / (2 * focalLength));
  const verticalAngleRad = 2 * Math.atan(sensorHeight / (2 * focalLength));

  // 対角センサーサイズ
  const diagonalSensor = Math.sqrt(
    sensorWidth * sensorWidth + sensorHeight * sensorHeight,
  );
  const diagonalAngleRad = 2 * Math.atan(diagonalSensor / (2 * focalLength));

  // 画角を度に変換
  const horizontalAngle = radToDeg(horizontalAngleRad);
  const verticalAngle = radToDeg(verticalAngleRad);
  const diagonalAngle = radToDeg(diagonalAngleRad);

  // 撮影範囲計算
  const horizontalRange = 2 * distance * Math.tan(horizontalAngleRad / 2);
  const verticalRange = 2 * distance * Math.tan(verticalAngleRad / 2);
  const diagonalRange = 2 * distance * Math.tan(diagonalAngleRad / 2);

  return {
    horizontalAngle: Number(horizontalAngle.toFixed(2)),
    verticalAngle: Number(verticalAngle.toFixed(2)),
    diagonalAngle: Number(diagonalAngle.toFixed(2)),
    horizontalRange: Number(horizontalRange.toFixed(3)),
    verticalRange: Number(verticalRange.toFixed(3)),
    diagonalRange: Number(diagonalRange.toFixed(3)),
  };
}

/**
 * 一般的なセンサーサイズのプリセット
 */
export const sensorPresets = {
  フルフレーム: { width: 36, height: 24 },
  "APS-C (Canon)": { width: 22.3, height: 14.9 },
  "APS-C (Nikon/Sony)": { width: 23.5, height: 15.6 },
  マイクロフォーサーズ: { width: 17.3, height: 13 },
  "1インチ": { width: 13.2, height: 8.8 },
  "1/1.7インチ": { width: 7.6, height: 5.7 },
} as const;
