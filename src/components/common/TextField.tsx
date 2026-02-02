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
    <div className={clsx(className)}>
      <label htmlFor={inputId} className="typo-16-m mb-2.5 inline-block">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={clsx(
          `w-full rounded-xl border px-5 py-3.5 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]
          transition-colors disabled:opacity-60`,
          error
            ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
            : "border-gray-100 focus:ring-1 focus:ring-blue-500 focus:outline-none",
        )}
        {...registration}
        {...props}
      />
      {error && <p className="typo-12-m mt-1.5 pl-2 text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;
