import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, error, className = "", id, ...props }, ref) => {
    const inputId = useMemo(
      () => id || `input-${Math.random().toString(36).slice(2, 9)}`,
      [id],
    );

    return (
      <div className="flex flex-col space-y-1">
        <label
          suppressHydrationWarning
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            suppressHydrationWarning
            id={inputId}
            className={clsx(
              "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              "disabled:opacity-50",
              "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
              {
                "border-red-500 focus:ring-red-500 focus:border-red-500": error,
              },
              className,
            )}
            {...props}
          />
          {unit && (
            <span className="absolute right-3 top-2 text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          )}
        </div>
        {error && (
          <span className="text-sm text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
