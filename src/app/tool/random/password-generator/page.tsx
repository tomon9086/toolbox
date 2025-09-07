"use client";

import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/Card";
import { copyToClipboard } from "@/utils/clipboard";

const CHARSET_KEY = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  numbers: "numbers",
  symbols: "symbols",
  hiragana: "hiragana",
  katakana: "katakana",
} as const;

type CharsetKey = (typeof CHARSET_KEY)[keyof typeof CHARSET_KEY];

const CHARSET = {
  [CHARSET_KEY.uppercase]: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  [CHARSET_KEY.lowercase]: "abcdefghijklmnopqrstuvwxyz",
  [CHARSET_KEY.numbers]: "0123456789",
  [CHARSET_KEY.symbols]: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  [CHARSET_KEY.hiragana]:
    "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ",
  [CHARSET_KEY.katakana]:
    "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ",
} as const;

const CHARSET_NAME = {
  [CHARSET_KEY.uppercase]: "英大文字",
  [CHARSET_KEY.lowercase]: "英小文字",
  [CHARSET_KEY.numbers]: "数字",
  [CHARSET_KEY.symbols]: "記号",
  [CHARSET_KEY.hiragana]: "ひらがな",
  [CHARSET_KEY.katakana]: "カタカナ",
} as const;

const PRESET_KEY = {
  password: "password",
  simplePassword: "simplePassword",
  secretQuestion: "secretQuestion",
  custom: "custom",
} as const;

type PresetKey = (typeof PRESET_KEY)[keyof typeof PRESET_KEY];

type PresetOption = {
  name: string;
  charsets: (typeof CHARSET_KEY)[keyof typeof CHARSET_KEY][];
  length: number;
};

const PRESET_OPTIONS: Record<PresetKey, PresetOption> = {
  [PRESET_KEY.password]: {
    name: "パスワード（英数記号）",
    charsets: [
      CHARSET_KEY.uppercase,
      CHARSET_KEY.lowercase,
      CHARSET_KEY.numbers,
      CHARSET_KEY.symbols,
    ],
    length: 16,
  },
  [PRESET_KEY.simplePassword]: {
    name: "シンプルなパスワード（英数）",
    charsets: [
      CHARSET_KEY.uppercase,
      CHARSET_KEY.lowercase,
      CHARSET_KEY.numbers,
    ],
    length: 12,
  },
  [PRESET_KEY.secretQuestion]: {
    name: "秘密の質問（かな）",
    charsets: [CHARSET_KEY.hiragana],
    length: 20,
  },
  [PRESET_KEY.custom]: {
    name: "カスタム",
    charsets: [],
    length: 16,
  },
} as const;

const generatePassword = (charset: string, passwordLength: number) => {
  let result = "";
  const array = new Uint32Array(passwordLength);
  crypto.getRandomValues(array);

  for (let i = 0; i < passwordLength; i++) {
    result += charset.charAt(array[i] % charset.length);
  }

  return result;
};

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [selectedPresetKey, setSelectedPresetKey] = useState<PresetKey>(
    PRESET_KEY.password,
  );
  const [length, setLength] = useState(
    PRESET_OPTIONS[selectedPresetKey].length,
  );
  const [selectedCharsets, setSelectedCharsets] = useState<
    Record<CharsetKey, boolean>
  >({
    [CHARSET_KEY.uppercase]: PRESET_OPTIONS[
      selectedPresetKey
    ].charsets.includes(CHARSET_KEY.uppercase),
    [CHARSET_KEY.lowercase]: PRESET_OPTIONS[
      selectedPresetKey
    ].charsets.includes(CHARSET_KEY.lowercase),
    [CHARSET_KEY.numbers]: PRESET_OPTIONS[selectedPresetKey].charsets.includes(
      CHARSET_KEY.numbers,
    ),
    [CHARSET_KEY.symbols]: PRESET_OPTIONS[selectedPresetKey].charsets.includes(
      CHARSET_KEY.symbols,
    ),
    [CHARSET_KEY.hiragana]: PRESET_OPTIONS[selectedPresetKey].charsets.includes(
      CHARSET_KEY.hiragana,
    ),
    [CHARSET_KEY.katakana]: PRESET_OPTIONS[selectedPresetKey].charsets.includes(
      CHARSET_KEY.katakana,
    ),
  });

  const onPresetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setSelectedPresetKey(value as PresetKey);

      const option = PRESET_OPTIONS[value as PresetKey];
      setLength(option.length);
      setSelectedCharsets({
        [CHARSET_KEY.uppercase]: option.charsets.includes(
          CHARSET_KEY.uppercase,
        ),
        [CHARSET_KEY.lowercase]: option.charsets.includes(
          CHARSET_KEY.lowercase,
        ),
        [CHARSET_KEY.numbers]: option.charsets.includes(CHARSET_KEY.numbers),
        [CHARSET_KEY.symbols]: option.charsets.includes(CHARSET_KEY.symbols),
        [CHARSET_KEY.hiragana]: option.charsets.includes(CHARSET_KEY.hiragana),
        [CHARSET_KEY.katakana]: option.charsets.includes(CHARSET_KEY.katakana),
      });
    },
    [],
  );

  const onSelectedCharsetChange = useCallback(
    (key: CharsetKey, checked: boolean) => {
      setSelectedCharsets((prev) => ({
        ...prev,
        [key]: checked,
      }));
      setSelectedPresetKey(PRESET_KEY.custom);
    },
    [],
  );

  const onCopyButtonClick = useCallback(async () => {
    const result = await copyToClipboard(password);
    if (result) {
      toast.success("パスワードをコピーしました");
    } else {
      toast.error("コピーに失敗しました");
    }
  }, [password]);

  const onGeneratePasswordButtonClick = useCallback(() => {
    let charset = "";
    if (selectedCharsets[CHARSET_KEY.uppercase])
      charset += CHARSET[CHARSET_KEY.uppercase];
    if (selectedCharsets[CHARSET_KEY.lowercase])
      charset += CHARSET[CHARSET_KEY.lowercase];
    if (selectedCharsets[CHARSET_KEY.numbers])
      charset += CHARSET[CHARSET_KEY.numbers];
    if (selectedCharsets[CHARSET_KEY.symbols])
      charset += CHARSET[CHARSET_KEY.symbols];
    if (selectedCharsets[CHARSET_KEY.hiragana])
      charset += CHARSET[CHARSET_KEY.hiragana];
    if (selectedCharsets[CHARSET_KEY.katakana])
      charset += CHARSET[CHARSET_KEY.katakana];

    if (charset.length === 0) {
      setPassword("");
      return;
    }

    const newPassword = generatePassword(charset, length);
    setPassword(newPassword);
  }, [length, selectedCharsets]);

  useEffect(() => {
    onGeneratePasswordButtonClick();
  }, [onGeneratePasswordButtonClick]);

  return (
    <div className="container mx-auto p-6 max-w-md">
      <Card>
        <div>
          <label htmlFor="preset" className="block text-sm font-medium mb-2">
            プリセット:
          </label>
          <div className="space-x-2 mb-4">
            <select
              id="preset"
              value={selectedPresetKey}
              onChange={onPresetChange}
              className="border rounded p-2"
            >
              {Object.entries(PRESET_OPTIONS).map(([key, option]) => (
                <option key={key} value={key}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="length" className="block text-sm font-medium mb-2">
              文字列長: {length}
            </label>
            <input
              id="length"
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            {Object.values(CHARSET_KEY).map((key) => (
              <label className="flex items-center" key={key}>
                <input
                  type="checkbox"
                  checked={selectedCharsets[key]}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onSelectedCharsetChange(key, checked);
                  }}
                  className="mr-2"
                />
                {CHARSET_NAME[key]}
              </label>
            ))}
          </div>

          {password && (
            <div className="mt-4">
              <div className="flex">
                <div className="flex-1 p-2 border rounded-l font-mono select-all">
                  {password}
                </div>
                <button
                  type="button"
                  onClick={onCopyButtonClick}
                  className="bg-gray-500 text-white px-4 rounded-r hover:bg-gray-600 cursor-pointer"
                >
                  コピー
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={onGeneratePasswordButtonClick}
                  type="button"
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
                  title="再生成"
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                  再生成
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
