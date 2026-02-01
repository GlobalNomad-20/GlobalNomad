"use client";

import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

const TextField = ({ label, error, registration, className, ...props }: TextFieldProps) => {
  const inputId = registration.name;

  return (
    <div className={`${className ?? ""}`}>
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={clsx(
          "w-full rounded-xl border px-5 py-3.5 transition-colors disabled:opacity-60",
          error
            ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none",
        )}
        {...registration}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextField;
