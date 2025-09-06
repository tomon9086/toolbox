"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  calculateCameraAngles,
  sensorPresets,
} from "@/lib/calculations/camera";
import type { CameraInput, CameraOutput } from "@/types/tools";

export function CameraAngleOfViewCalculator() {
  const [input, setInput] = useState<CameraInput>({
    focalLength: 50,
    sensorWidth: 36,
    sensorHeight: 24,
    distance: 10,
  });

  const [output, setOutput] = useState<CameraOutput | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>("フルフレーム");

  // 計算を実行
  useEffect(() => {
    try {
      if (
        input.focalLength > 0 &&
        input.sensorWidth > 0 &&
        input.sensorHeight > 0 &&
        input.distance > 0
      ) {
        const result = calculateCameraAngles(input);
        setOutput(result);
      } else {
        setOutput(null);
      }
    } catch (error) {
      console.error("計算エラー:", error);
      setOutput(null);
    }
  }, [input]);

  // プリセット変更時の処理
  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    if (preset in sensorPresets) {
      const { width, height } =
        sensorPresets[preset as keyof typeof sensorPresets];
      setInput((prev) => ({
        ...prev,
        sensorWidth: width,
        sensorHeight: height,
      }));
    }
  };

  // 入力値の更新
  const updateInput = (field: keyof CameraInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInput((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  // 画角のみの計算（距離を除く）
  const angleOnlyOutput =
    input.focalLength > 0 && input.sensorWidth > 0 && input.sensorHeight > 0
      ? calculateCameraAngles({ ...input, distance: 1 }) // 距離1mで計算
      : null;

  return (
    <div className="space-y-6">
      {/* センサーサイズ・焦点距離入力 */}
      <Card title="センサーサイズ・焦点距離">
        <div className="space-y-4">
          {/* センサーサイズプリセット */}
          <div>
            <label
              htmlFor="sensor-preset"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              センサーサイズプリセット
            </label>
            <select
              id="sensor-preset"
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {Object.keys(sensorPresets).map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
              <option value="custom">カスタム</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 焦点距離 */}
            <Input
              label="焦点距離"
              unit="mm"
              type="number"
              value={input.focalLength}
              onChange={(e) => updateInput("focalLength", e.target.value)}
              min="1"
              step="0.1"
            />

            {/* センサー幅 */}
            <Input
              label="センサー幅"
              unit="mm"
              type="number"
              value={input.sensorWidth}
              onChange={(e) => updateInput("sensorWidth", e.target.value)}
              min="0.1"
              step="0.1"
            />

            {/* センサー高さ */}
            <Input
              label="センサー高さ"
              unit="mm"
              type="number"
              value={input.sensorHeight}
              onChange={(e) => updateInput("sensorHeight", e.target.value)}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      </Card>

      {/* 画角の計算結果 */}
      {angleOnlyOutput && (
        <Card title="画角">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {angleOnlyOutput.horizontalAngle}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                水平画角
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {angleOnlyOutput.verticalAngle}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                垂直画角
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {angleOnlyOutput.diagonalAngle}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                対角画角
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 被写体までの距離の入力 */}
      <Card title="被写体までの距離">
        <div className="max-w-md">
          <Input
            label="被写体までの距離"
            unit="m"
            type="number"
            value={input.distance}
            onChange={(e) => updateInput("distance", e.target.value)}
            min="0.1"
            step="0.1"
          />
        </div>
      </Card>

      {/* 撮影範囲の計算結果 */}
      {output && (
        <Card title="撮影範囲">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {output.horizontalRange} m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                水平撮影範囲
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {output.verticalRange} m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                垂直撮影範囲
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {output.diagonalRange} m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                対角撮影範囲
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
