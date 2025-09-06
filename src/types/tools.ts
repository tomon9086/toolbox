export interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface CameraInput {
  focalLength: number; // 焦点距離 (mm)
  sensorWidth: number; // センサー幅 (mm)
  sensorHeight: number; // センサー高さ (mm)
  distance: number; // 被写体までの距離 (m)
}

export interface CameraOutput {
  horizontalAngle: number; // 水平画角 (度)
  verticalAngle: number; // 垂直画角 (度)
  diagonalAngle: number; // 対角画角 (度)
  horizontalRange: number; // 水平撮影範囲 (m)
  verticalRange: number; // 垂直撮影範囲 (m)
  diagonalRange: number; // 対角撮影範囲 (m)
}
